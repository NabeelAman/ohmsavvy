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
  const route = file
    .replace(/^src\/app/, "")
    .replace(/[\\/]page\.tsx$/, "")
    .replace(/\\/g, "/");
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

// Also count links from shared components (Nav, footer) rendered on every page
for (const file of ["src/components/Nav.tsx"]) {
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

const orphans = [];
for (const route of new Set(sitemapRoutes)) {
  const fromFile = routes.has(route);
  if (!fromFile) continue; // sitemap route with no matching page.tsx is a separate problem
  const links = inbound.get(route) ?? new Set();
  if (links.size === 0) orphans.push(route);
}

if (orphans.length > 0) {
  console.error("The following pages are in the sitemap but have NO inbound internal link " +
    "from any other page or the nav — they're effectively invisible to crawlers and users:\n");
  for (const route of orphans) console.error(`  ${route}`);
  console.error("\nAdd a link to each from its parent article's cross-link section, the " +
    "homepage's 'More guides' section, or a related guide page before merging.");
  process.exit(1);
}

console.log(`All ${sitemapRoutes.length} sitemap routes have at least one inbound internal link.`);
