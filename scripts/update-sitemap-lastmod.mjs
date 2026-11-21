// Regenerates src/lib/sitemap-lastmod.json from each page's own git history.
// automation/deploy-pages.mjs runs this inside its build worktree before every
// build, so the live sitemap is always current; run it by hand (and commit the
// JSON) only if you want local builds to match.
//
// Every sitemap route must get a real date here: sitemap.ts leaves <lastmod>
// out for a route with no entry rather than stamping it with the build time,
// because a date that changes on every deploy teaches Google to ignore lastmod.
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
  "/multimeters",
  "/soldering-irons",
  "/oscilloscopes",
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

// Translated pages (see TRANSLATED_PAGES in src/app/sitemap.ts): /de, /de/multimeters/fluke-117-review, ...
const i18nSrc = fs.readFileSync("src/lib/i18n.ts", "utf8");
const locales = JSON.parse((i18nSrc.match(/LOCALES\s*=\s*(\[[^\]]*\])/) || [, "[]"])[1].replace(/'/g, '"'));
const translated = fs.existsSync("src/app/[locale]/multimeters/fluke-117-review/page.tsx") ? ["", "/multimeters/fluke-117-review"] : [""];
const localeRoutes = locales.flatMap((l) => translated.map((p) => ({ route: `/${l}${p}`, file: `src/app/[locale]${p}/page.tsx` })));

const routes = [
  ...[...new Set([...STATIC_PAGES, ...contentRoutes])].map((route) => ({ route, file: route === "" ? "src/app/page.tsx" : `src/app${route}/page.tsx` })),
  ...localeRoutes,
];

// One pass over the history instead of one `git log` per page: the first time a
// file appears (newest commit first) is its last change.
const lastChange = new Map();
let date = "";
for (const line of execSync('git log --format=@%cI --name-only -- src/app', { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 }).split("\n")) {
  if (line.startsWith("@")) date = line.slice(1);
  else if (line && !lastChange.has(line)) lastChange.set(line, date);
}

const result = {};
const skipped = [];
for (const { route, file } of routes) {
  const iso = lastChange.get(file);
  if (fs.existsSync(file) && iso) result[route === "" ? "/" : route] = iso;
  else skipped.push(route || "/");
}

fs.writeFileSync("src/lib/sitemap-lastmod.json", JSON.stringify(result, null, 1) + "\n");
console.log(`Wrote ${Object.keys(result).length} entries to src/lib/sitemap-lastmod.json${skipped.length ? ` (no committed page.tsx, skipped: ${skipped.join(", ")})` : ""}`);
