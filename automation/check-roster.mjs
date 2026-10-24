// The only products allowed to appear in the site's three main picks arrays are
// ones a human has deliberately added to automation/content-queue.json's
// verifiedRoster — that file only grows when someone has actually checked specs
// against a manufacturer source and visually confirmed a real product photo.
// This script fails the build if a `name:` field shows up in a picks array that
// isn't in the roster yet, which is what stops an automated content run from
// quietly inventing a product (and its specs/image) that nobody ever verified.
import { readFileSync } from "node:fs";

const CATEGORY_FILES = [
  "src/app/multimeters/best-multimeters/page.tsx",
  "src/app/soldering-irons/best-soldering-irons/page.tsx",
  "src/app/oscilloscopes/best-beginner-oscilloscopes/page.tsx",
  "src/lib/multimeter-catalog.ts",
];

const queue = JSON.parse(readFileSync("automation/content-queue.json", "utf8"));
const roster = new Set(Object.values(queue.verifiedRoster).flat());

const nameFieldPattern = /^\s{4}name:\s*"([^"]+)"/gm;
const unverified = [];

for (const file of CATEGORY_FILES) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(nameFieldPattern)) {
    const name = match[1];
    if (!roster.has(name)) {
      unverified.push({ file, name });
    }
  }
}

if (unverified.length > 0) {
  console.error("The following products appear in a picks array but are NOT in " +
    "automation/content-queue.json's verifiedRoster:\n");
  for (const { file, name } of unverified) {
    console.error(`  "${name}" in ${file}`);
  }
  console.error("\nAdd the product to verifiedRoster only after a human has checked its " +
    "specs against a manufacturer source and visually confirmed the product photo matches " +
    "the exact model. Do not merge until that's done.");
  process.exit(1);
}

console.log(`All product names in picks arrays are in the verified roster (${roster.size} total).`);
