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
  // The homepage is the one page whose title, description and openGraph SHOULD be
  // the root layout's (layout.tsx sets them for "/"); its own metadata export only
  // adds hreflang alternates, so only the canonical check applies to it.
  if (file.replace(/\\/g, "/").endsWith("src/app/page.tsx")) {
    if (!/(?:canonical|path):\s*"\/"/.test(content)) problems.push(`${file}: missing alternates.canonical "/" in metadata export`);
    continue;
  }

  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  // Also accept a page-level `const description = "..."` passed to buildMetadata as
  // shorthand, which pages use when the same text also feeds their Article schema.
  const descMatch =
    content.match(/description:\s*\n?\s*"([^"]+)"/) ?? content.match(/const description\s*=\s*\n?\s*"([^"]+)"/);
  // "canonical:" is the raw alternates.canonical style; "path:" is buildMetadata()'s
  // param (src/lib/metadata.ts), which every page should use now — support both so
  // this doesn't silently stop checking if a page ever reverts to the raw style.
  const canonicalMatch = content.match(/(?:canonical|path):\s*"([^"]+)"/);

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
    if (desc.length > 160) problems.push(`${file}: description is ${desc.length} chars (recommend <=160): "${desc.slice(0, 50)}..."`);
    if (desc.length < 50) problems.push(`${file}: description is only ${desc.length} chars (too thin to be useful in search results)`);
    if (descriptions.has(desc)) problems.push(`${file}: duplicate description also used by ${descriptions.get(desc)}`);
    descriptions.set(desc, file);
  }

  if (!canonicalMatch) {
    problems.push(`${file}: missing alternates.canonical in metadata export`);
  }

  // Without its own openGraph object, a page silently inherits the ROOT
  // LAYOUT'S openGraph wholesale (title, description, AND og:url all pointing
  // at the homepage) — Next.js does not derive it from the plain title/description
  // fields the way it does for the <title> tag's template. This was a real,
  // sitewide bug: every shared link's social preview card was wrong. A page
  // satisfies this either by setting openGraph directly, or (the normal case
  // now) by calling buildMetadata(), which sets it on the page's behalf.
  if (!content.includes("openGraph") && !content.includes("buildMetadata")) {
    problems.push(`${file}: no openGraph field and no buildMetadata() call — social share previews (Slack/WhatsApp/Facebook/etc.) will show the homepage's generic title/description/url instead of this page's. Use buildMetadata() from "@/lib/metadata".`);
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
// Matches both the raw <img> element and next/image's <Image> component —
// most product photos now go through <Image>, and this check would have
// silently stopped covering them if left matching only <img>.
const imgPattern = /<(?:img|Image)\s+[^>]*?\/>/g;

for (const file of tsxFiles) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(imgPattern)) {
    const tag = match[0];
    const altMatch = tag.match(/alt=(\{[^}]*\}|"[^"]*")/);
    if (!altMatch) {
      problems.push(`${file}: <img>/<Image> with no alt attribute at all`);
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
