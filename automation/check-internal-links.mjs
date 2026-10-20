// Builds the internal link graph from every page.tsx's <Link href="..."> / href="..."
// usages and fails if any route listed in sitemap.ts has zero inbound internal links.
// A page with real content but no inbound link is effectively invisible to both
// users and crawlers — this is a proper SEO bug, not a style nit.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function findPageFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findPageFiles(full, out);
    } else if (entry === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

function routeFromFile(file) {
  // Normalize path separators FIRST — path.join produces backslashes on Windows,
  // and the regexes below assume forward slashes. Getting this order wrong means
  // the "src/app" prefix strip silently no-ops on Windows and every route comes
  // out malformed (which is exactly what happened before this fix: the route set
  // never matched real routes, so the orphan check always passed regardless of
  // actual inbound-link state).
  const route = file
    .replace(/\\/g, "/")
    .replace(/^src\/app/, "")
    .replace(/\/page\.tsx$/, "");
  return route === "" ? "/" : route;
}

// Pilot i18n locales (src/app/[locale]/...) — kept in sync with
// src/lib/i18n.ts's LOCALES by hand, since this script reads .ts files as
// plain text rather than importing them. Expand the literal "[locale]"
// dynamic-segment route into one concrete route per real locale, the same
// way Next.js's generateStaticParams does at build time.
const LOCALES = ["de", "fr", "it", "es"];
function expandLocaleRoute(route) {
  if (!route.includes("[locale]")) return [route];
  return LOCALES.map((locale) => route.replace("[locale]", locale));
}

const pageFiles = findPageFiles("src/app");
const routes = new Set(pageFiles.flatMap((f) => expandLocaleRoute(routeFromFile(f))));
const registryContent = readFileSync("src/lib/content.ts", "utf8");

const hrefPattern = /href=\{?["'`](\/[a-zA-Z0-9\-/#]*)["'`]\}?/g;
const inbound = new Map([...routes].map((r) => [r, new Set()]));

// src/lib/content.ts registry entries, so <ContentLinks category="x"> (a dynamic
// component — its hrefs come from this data, not literal strings in its own
// source) can be resolved to the real links it renders at runtime.
const registryEntries = [...registryContent.matchAll(/category:\s*"([^"]+)"[^}]*?href:\s*"([^"]+)"/gs)]
  .map(([, category, href]) => ({ category, href }));

for (const file of pageFiles) {
  const fromRoute = routeFromFile(file);
  const content = readFileSync(file, "utf8");

  const contentLinksMatch = content.match(/<ContentLinks\s+category="([^"]+)"/);
  if (contentLinksMatch) {
    const category = contentLinksMatch[1];
    for (const entry of registryEntries) {
      if (entry.category === category && routes.has(entry.href)) {
        inbound.get(entry.href).add(fromRoute);
      }
    }
  }

  for (const match of content.matchAll(hrefPattern)) {
    const target = match[1].split("#")[0] || "/";
    if (routes.has(target) && target !== fromRoute) {
      inbound.get(target).add(fromRoute);
    }
  }
}

// The [locale] pages' language-switcher links are built with template-literal
// hrefs (`/${l}${path}`), which hrefPattern can't match as a literal string.
// Model the switcher directly instead: every locale variant of a pilot page
// links to every other locale variant of that same page (and separately,
// a plain-string literal href already credits the English original).
for (const route of routes) {
  const match = route.match(/^\/(de|fr|it|es)(\/.*)?$/);
  if (!match) continue;
  const [, locale, rest = ""] = match;
  for (const other of LOCALES) {
    if (other === locale) continue;
    const sibling = `/${other}${rest}`;
    if (routes.has(sibling)) inbound.get(route).add(sibling);
  }
}

// Also count links from shared components rendered on every page (nav + the
// root layout's footer, which is actually where most routes get their link —
// Nav.tsx alone misses privacy-policy, terms-of-service, and "/" via the logo).
for (const file of ["src/components/Nav.tsx", "src/app/layout.tsx"]) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  for (const match of content.matchAll(hrefPattern)) {
    const target = match[1].split("#")[0] || "/";
    if (routes.has(target)) inbound.get(target).add("(global nav)");
  }
}

// sitemap.ts now generates most routes from src/lib/content.ts's registry rather
// than listing them as literal strings itself — read both files so this check
// still sees every real route instead of only the handful still hardcoded.
const sitemapContent = readFileSync("src/app/sitemap.ts", "utf8");
const sitemapRoutes = [...(sitemapContent + registryContent).matchAll(/"(\/[a-zA-Z0-9\-/]*)"/g)]
  .map((m) => m[1])
  .filter((r) => r !== "");
sitemapRoutes.push("/"); // the "" entry maps to root

// sitemap.ts builds the pilot locale routes with a template literal
// (`/${locale}${p}`), not literal strings, so the regex above can't see them —
// mirror its TRANSLATED_PAGES list here and expand it the same way.
const TRANSLATED_PAGES = ["", "/multimeters/fluke-117-review"];
for (const locale of LOCALES) {
  for (const p of TRANSLATED_PAGES) sitemapRoutes.push(`/${locale}${p}`);
}

const sitemapRouteSet = new Set(sitemapRoutes);
const missingFromSitemap = [...routes].filter(
  (r) => !sitemapRouteSet.has(r) && !r.startsWith("/_") // skip Next.js internals like /_not-found
);

const orphans = [];
for (const route of new Set(sitemapRoutes)) {
  const fromFile = routes.has(route);
  if (!fromFile) continue; // sitemap route with no matching page.tsx is a separate problem
  const links = inbound.get(route) ?? new Set();
  if (links.size === 0) orphans.push(route);
}

if (missingFromSitemap.length > 0 || orphans.length > 0) {
  if (missingFromSitemap.length > 0) {
    console.error("The following pages exist but are NOT in src/app/sitemap.ts at all " +
      "(a page can only be checked for inbound links once it's in the sitemap, and search " +
      "engines won't reliably discover it either without that entry):\n");
    for (const route of missingFromSitemap) console.error(`  ${route}`);
    console.error("");
  }
  if (orphans.length > 0) {
    console.error("The following pages are in the sitemap but have NO inbound internal link " +
      "from any other page or the nav — they're effectively invisible to crawlers and users:\n");
    for (const route of orphans) console.error(`  ${route}`);
    console.error("\nAdd a link to each from its parent article's cross-link section, the " +
      "homepage's 'More guides' section, or a related guide page before merging.");
  }
  process.exit(1);
}

console.log(`All ${pageFiles.length} pages are in the sitemap, and all ${sitemapRoutes.length} ` +
  `sitemap routes have at least one inbound internal link.`);
