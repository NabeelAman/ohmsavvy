// Site-wide duplicate-content audit: every page.tsx's own editorial prose
// (quoted strings and JSX text — NOT shared component boilerplate) compared
// pairwise against every other page's, looking for literal copy-pasted
// phrasing reused across different products/topics. Complements, but is
// distinct from, automation/ollama/qa.mjs's single-draft-vs-corpus check:
// this one audits everything already published, not just a new draft.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MIN_STRING_LEN = 50;
const GRAM_SIZE = 8;
const OVERLAP_THRESHOLD_PCT = 15;

function findPageFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) findPageFiles(full, out);
    else if (entry === "page.tsx") out.push(full);
  }
  return out;
}

function extractProse(file) {
  const src = readFileSync(file, "utf8");
  const texts = [];
  // Double-quoted string literals (handles \" and \' escapes).
  for (const m of src.matchAll(/"((?:[^"\\]|\\.){2,})"/g)) {
    if (m[1].length >= MIN_STRING_LEN) texts.push(m[1]);
  }
  // JSX text nodes between tags.
  for (const m of src.matchAll(/>\s*([^<>{}][^<>{}]{40,})\s*</g)) {
    texts.push(m[1]);
  }
  return texts.join(" ");
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/\\(["'n])/g, " ")
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function grams(words, n) {
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(" "));
  return set;
}

const files = findPageFiles("src/app");
const data = files
  .map((f) => {
    const words = normalize(extractProse(f));
    return { file: f, words, grams: grams(words, GRAM_SIZE) };
  })
  .filter((d) => d.grams.size > 0);

const flagged = [];
for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    const a = data[i];
    const b = data[j];
    const shared = [...a.grams].filter((g) => b.grams.has(g));
    if (shared.length === 0) continue;
    const pct = (shared.length / Math.min(a.grams.size, b.grams.size)) * 100;
    if (pct >= OVERLAP_THRESHOLD_PCT) {
      flagged.push({ a: a.file, b: b.file, pct: pct.toFixed(1), example: shared[0] });
    }
  }
}

if (flagged.length === 0) {
  console.log(`No pair of pages exceeds ${OVERLAP_THRESHOLD_PCT}% shared ${GRAM_SIZE}-word phrasing (${data.length} pages scanned).`);
  process.exit(0);
}

console.log(`${flagged.length} page pair(s) share ${OVERLAP_THRESHOLD_PCT}%+ of their editorial wording:\n`);
for (const f of flagged.sort((x, y) => y.pct - x.pct)) {
  console.log(`  ${f.pct}%  ${f.a}\n        ${f.b}\n        e.g. "${f.example}"\n`);
}
process.exit(1);
