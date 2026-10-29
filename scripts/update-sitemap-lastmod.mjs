// Regenerates src/lib/sitemap-lastmod.json from each page's own git history.
// Run this after a content change you want reflected in the sitemap's
// <lastmod> dates, then commit the updated JSON alongside your change.
//
// Baked in as static data (not computed live in sitemap.ts) because Vercel's
// build environment isn't guaranteed to have full git history available at
// build time, while this machine does.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const STATIC_PAGES = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/multimeters/best-multimeters",
  "/soldering-irons/best-soldering-irons",
  "/oscilloscopes/best-beginner-oscilloscopes",
  "/multimeters/reviews",
  "/multimeters/comparisons",
  "/soldering-irons/reviews",
  "/soldering-irons/comparisons",
  "/oscilloscopes/reviews",
  "/oscilloscopes/comparisons",
  "/multimeters/guides",
  "/soldering-irons/guides",
  "/oscilloscopes/guides",
];

const contentSrc = fs.readFileSync("src/lib/content.ts", "utf8");
const contentRoutes = [...contentSrc.matchAll(/href:\s*"([^"]*)"/g)].map((m) => m[1]);

const routes = [...new Set([...STATIC_PAGES, ...contentRoutes])];

const result = {};
let missing = 0;
for (const route of routes) {
  const filePath = route === "" ? "src/app/page.tsx" : `src/app${route}/page.tsx`;
  if (!fs.existsSync(filePath)) {
    missing++;
    continue;
  }
  const iso = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: "utf8" }).trim();
  result[route === "" ? "/" : route] = iso || new Date().toISOString();
}

fs.writeFileSync("src/lib/sitemap-lastmod.json", JSON.stringify(result, null, 1) + "\n");
console.log(`Wrote ${Object.keys(result).length} entries to src/lib/sitemap-lastmod.json (${missing} routes had no matching page.tsx, skipped)`);
