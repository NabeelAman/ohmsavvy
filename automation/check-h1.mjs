// Every page must have exactly one <h1> (CONTENT_STANDARDS §7, item 8). Counts
// the real rendered output rather than source files, because most H1s come
// from shared components (CategoryHero, ProductReview, ProductComparison,
// CategoryListing). Run after `npm run build`.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = ".next/server/app";
if (!existsSync(root)) {
  console.error(`${root} not found. Run \`npm run build\` first.`);
  process.exit(1);
}

function findHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findHtml(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

// Dynamic segments (e.g. src/app/[locale]/...) emit a literal "[locale].html"
// PPR shell artifact alongside the real per-param static files once
// cacheComponents/partialPrefetching is on — not a reachable route, just a
// build-time placeholder, so it's excluded the same way _not-found is.
const pages = findHtml(root).filter((f) => !/[\\/]_(not-found|global-error)/.test(f) && !/\[[^\]]+\]/.test(f));
const problems = [];
for (const file of pages) {
  const count = (readFileSync(file, "utf8").match(/<h1[\s>]/g) ?? []).length;
  if (count !== 1) {
    const route = file.replace(/\\/g, "/").replace(root, "").replace(/\.html$/, "").replace(/\/index$/, "") || "/";
    problems.push(`${route}: ${count} <h1> elements (expected exactly 1)`);
  }
}

if (problems.length) {
  console.error(`${problems.length} page(s) without exactly one H1:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`All ${pages.length} rendered pages have exactly one <h1>.`);
