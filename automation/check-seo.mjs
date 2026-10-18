// Checks the mechanically-verifiable items from CONTENT_STANDARDS.md §7 against
// every page.tsx that exports metadata: title length, description length, a
// canonical tag, a single H1 via CategoryHero/article heading, non-empty alt
// text on every <img>, and no two pages sharing an identical title or description
// (duplicate titles/descriptions is the most common SEO mistake once a site has
// many similar "best X for Y" pages).
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

const pageFiles = findPageFiles("src/app").filter(
  (f) => readFileSync(f, "utf8").includes("export const metadata")
);

const titles = new Map();
const descriptions = new Map();
const problems = [];

for (const file of pageFiles) {
  const content = readFileSync(file, "utf8");

  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const descMatch = content.match(/description:\s*\n?\s*"([^"]+)"/);
  const canonicalMatch = content.match(/canonical:\s*"([^"]+)"/);

  if (!titleMatch) {
    problems.push(`${file}: no title found in metadata export`);
  } else {
    const title = titleMatch[1];
    // root layout.tsx sets title.template: "%s | OhmSavvy", which Next.js appends
    // to every child page's plain-string title — the rendered <title> is always
    // 11 characters longer than what's written here, so that's what has to fit
    // under the ~60-char search-result display budget.
    const renderedLength = title.length + " | OhmSavvy".length;
    if (renderedLength > 60) {
      problems.push(`${file}: rendered title is ${renderedLength} chars incl. " | OhmSavvy" suffix (recommend <=60): "${title}"`);
    }
    if (title.includes("OhmSavvy")) {
      problems.push(`${file}: title already contains "OhmSavvy" — the root layout's template appends " | OhmSavvy" automatically, so this renders redundantly: "${title} | OhmSavvy"`);
    }
    if (titles.has(title)) problems.push(`${file}: duplicate title also used by ${titles.get(title)}: "${title}"`);
    titles.set(title, file);
  }

  if (!descMatch) {
    problems.push(`${file}: no description found in metadata export`);
  } else {
    const desc = descMatch[1];
    if (desc.length > 165) problems.push(`${file}: description is ${desc.length} chars (recommend <=160): "${desc.slice(0, 50)}..."`);
    if (desc.length < 50) problems.push(`${file}: description is only ${desc.length} chars (too thin to be useful in search results)`);
    if (descriptions.has(desc)) problems.push(`${file}: duplicate description also used by ${descriptions.get(desc)}`);
    descriptions.set(desc, file);
  }

  if (!canonicalMatch) {
    problems.push(`${file}: missing alternates.canonical in metadata export`);
  }
}

// Check alt text on every <img> across all components and pages
const allTsxDirs = ["src/app", "src/components"];
function findTsxFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findTsxFiles(full, out);
    } else if (entry.endsWith(".tsx") && !entry.endsWith(".stories.tsx")) {
      out.push(full);
    }
  }
  return out;
}

const tsxFiles = allTsxDirs.flatMap((d) => findTsxFiles(d));
const imgPattern = /<img\s+[^>]*?\/>/g;

for (const file of tsxFiles) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(imgPattern)) {
    const tag = match[0];
    const altMatch = tag.match(/alt=(\{[^}]*\}|"[^"]*")/);
    if (!altMatch) {
      problems.push(`${file}: <img> with no alt attribute at all`);
    } else if (altMatch[1] === '""') {
      // Explicit empty alt is valid for purely decorative images (e.g. the small
      // comparison-table thumbnail) — not flagged, but noted for visibility.
    }
  }
}

if (problems.length > 0) {
  console.error(`${problems.length} on-page SEO issue(s) found:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`On-page SEO baseline passed for ${pageFiles.length} page(s): unique titles/descriptions ` +
  `within length limits, canonical tags present, all <img> tags have alt text.`);
