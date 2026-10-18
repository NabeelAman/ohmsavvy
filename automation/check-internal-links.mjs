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

const pageFiles = findPageFiles("src/app");
const routes = new Set(pageFiles.map(routeFromFile));

const hrefPattern = /href=\{?["'`](\/[a-zA-Z0-9\-/#]*)["'`]\}?/g;
const inbound = new Map([...routes].map((r) => [r, new Set()]));

for (const file of pageFiles) {
  const fromRoute = routeFromFile(file);
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(hrefPattern)) {
    const target = match[1].split("#")[0] || "/";
    if (routes.has(target) && target !== fromRoute) {
      inbound.get(target).add(fromRoute);
    }
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

const sitemapContent = readFileSync("src/app/sitemap.ts", "utf8");
const sitemapRoutes = [...sitemapContent.matchAll(/"(\/[a-zA-Z0-9\-/]*)"/g)]
  .map((m) => m[1])
  .filter((r) => r !== "");
sitemapRoutes.push("/"); // the "" entry maps to root

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
