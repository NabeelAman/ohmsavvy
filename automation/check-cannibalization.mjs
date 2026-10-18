// Reports (does not block) pending keywords within the same category whose
// targetPicks overlap heavily — a sign two queued keywords would produce
// near-duplicate pages targeting overlapping search intent, which splits
// ranking signal instead of concentrating it (per both affiliate-SEO sources
// reviewed: one keyword should map to one primary page). This is advisory,
// not a hard gate — overlapping targetPicks can be a legitimate editorial
// choice, but it should be a deliberate one, not an accident of running the
// full queue unattended.
import { readFileSync } from "node:fs";

const queue = JSON.parse(readFileSync("automation/content-queue.json", "utf8"));
const pending = queue.keywords.filter((k) => k.type === "remix" && k.status === "pending" && k.targetPicks);

function jaccard(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

const flagged = [];
for (let i = 0; i < pending.length; i++) {
  for (let j = i + 1; j < pending.length; j++) {
    const a = pending[i];
    const b = pending[j];
    if (a.category !== b.category) continue;
    const similarity = jaccard(a.targetPicks, b.targetPicks);
    if (similarity >= 0.66) {
      flagged.push({ a: a.keyword, b: b.keyword, similarity: Math.round(similarity * 100) });
    }
  }
}

if (flagged.length === 0) {
  console.log("No significant targetPicks overlap found among pending remix keywords.");
  process.exit(0);
}

console.log(`${flagged.length} pair(s) of pending keywords target near-identical products ` +
  `(>=66% overlap) — consider merging into one page rather than publishing both:\n`);
for (const f of flagged) {
  console.log(`  ${f.similarity}% overlap: "${f.a}"  <->  "${f.b}"`);
}
console.log("\nThis is advisory — not a CI failure. Resolve by merging the pair into a single " +
  "page/keyword, or confirm distinctly different framing justifies two separate pages.");
