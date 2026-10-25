// Keeps the daily article writer's queue topped up, so it never runs dry.
//
//   node automation/refill-queue.mjs            refill, commit and push the queue
//   node automation/refill-queue.mjs --dry-run  show what it would change, touch nothing
//   --target N                                   keep N keywords ready (default 10)
//
// Each run:
//   1. Cleans the queue: pending buying-guide keywords that an existing page now
//      covers become skip-duplicate, and retired (unavailable) products are taken
//      out of targetPicks.
//   2. If fewer than TARGET keywords are ready to write, collects what people are
//      searching right now: Google and DuckDuckGo autocomplete for "best <product>
//      for ..." in each category, ranked by how high and how often a phrase shows up.
//   3. Drops any phrase the site already covers, or that is already queued (word
//      overlap against every live page and every queue entry, any status).
//   4. Asks the local Ollama model whether the site's verified, in-stock products
//      genuinely suit that use, and which 2-4 of them. Unsuitable uses are recorded
//      as skip-no-fit, so they aren't re-checked every day.
//   5. Commits only content-queue.json and pushes it, so article.mjs --next finds a
//      clean queue. It does nothing if another session has the queue uncommitted.
//
// Only "remix" buying guides are added: article.mjs drafts nothing else
// automatically, and those are built purely from verified Pick data.
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const QUEUE = "automation/content-queue.json";
const REGISTRY = "src/lib/content.ts";
const FAILS = "automation/ollama/.tmp-auto-failures.json";
const MODEL = process.env.OLLAMA_MODEL || "qwen2.5:14b";
const OLLAMA = process.env.OLLAMA_URL || "http://localhost:11434";
const arg = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? Number(process.argv[i + 1]) : undefined; };
const TARGET = arg("--target") ?? 10; // keep at least this many keywords ready to write
const MAX_ADD = 5; // new keywords per run
const MAX_CHECKS = 12; // Ollama fit checks per run (each takes a minute or so on CPU)
const DRY = process.argv.includes("--dry-run");

const CATEGORIES = {
  multimeters: { roundup: "best-multimeters", seeds: ["best multimeter for", "best clamp meter for"] },
  "soldering-irons": { roundup: "best-soldering-irons", seeds: ["best soldering iron for", "best soldering station for"] },
  oscilloscopes: { roundup: "best-beginner-oscilloscopes", seeds: ["best oscilloscope for"] },
};

const log = (...a) => console.log(...a);
const run = (cmd) => execSync(cmd, { stdio: "pipe", encoding: "utf8" });
const today = new Date().toISOString().slice(0, 10);

// ---------- data ----------

function loadPicks(category) {
  const src = readFileSync(`src/app/${category}/${CATEGORIES[category].roundup}/page.tsx`, "utf8");
  const m = src.match(/export const picks: Pick\[\] = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error(`Couldn't read the picks array for ${category}`);
  return new Function(`return ${m[1]}`)().filter((p) => !p.unavailable);
}

function livePaths() {
  const paths = new Set(readFileSync(REGISTRY, "utf8").match(/href: "\/[^"]+"/g).map((h) => h.slice(7, -1)));
  for (const c of Object.keys(CATEGORIES)) for (const d of readdirSync(`src/app/${c}`)) paths.add(`/${c}/${d}`);
  return [...paths];
}

const readJson = (f, fallback) => { try { return JSON.parse(readFileSync(f, "utf8")); } catch { return fallback; } };

// ---------- duplicate detection ----------

// Words that say nothing about the use case. Product nouns go too, so "best
// multimeter for car battery" and "best-multimeters-for-car-battery-testing" compare
// on {car, battery} vs {car, battery, test}.
const STOP = new Set(("best top good great cheap cheapest budget affordable the a an for and or of to with in on my your " +
  "multimeter multimeters meter meters clamp digital soldering solder iron irons station stations oscilloscope oscilloscopes " +
  "scope scopes usb vs versus guide review buy buying use using test testing tester which what how money 2024 2025 2026").split(" "));
const SYN = { auto: "automotive", car: "automotive", cars: "automotive", vehicle: "automotive", beginner: "beginner",
  beginners: "beginner", hobbyist: "hobby", hobbyists: "hobby", hobby: "hobby", electrician: "electrician",
  electricians: "electrician", electronic: "electronics", pcb: "circuit", board: "circuit", boards: "circuit" };

function tokens(text) {
  // "auto ranging" is a meter feature, not "auto" (automotive).
  return new Set(text.toLowerCase().replace(/auto[\s-]*rang\w*/g, "autorange").replace(/[^a-z0-9]+/g, " ").split(" ").filter(Boolean)
    .map((w) => SYN[w] ?? w.replace(/(ies)$/, "y").replace(/(?<!s)s$/, ""))
    .filter((w) => w.length > 1 && !STOP.has(w)));
}

// A candidate duplicates an existing topic when either word set contains the
// other, or they share at least half their words. Errs on the side of "duplicate":
// skipping a fine topic costs nothing, publishing a near-copy hurts the site.
function similar(a, b) {
  if (!a.size || !b.size) return false;
  const shared = [...a].filter((w) => b.has(w)).length;
  return shared === a.size || shared === b.size || shared / new Set([...a, ...b]).size >= 0.5;
}

function coveredBy(keyword, category, paths, queueEntries) {
  const t = tokens(keyword);
  for (const p of paths) if (p.startsWith(`/${category}/`) && similar(t, tokens(p.split("/").pop()))) return p;
  for (const e of queueEntries) if (e.category === category && similar(t, tokens(e.keyword))) return `queue: ${e.keyword}`;
  return null;
}

// ---------- trending searches ----------

async function suggestions(q) {
  const out = [];
  const get = async (url) => { try { const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(8000) }); return r.ok ? await r.json() : null; } catch { return null; } };
  const g = await get(`https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(q)}`);
  if (Array.isArray(g?.[1])) out.push(...g[1]);
  const d = await get(`https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}`);
  if (Array.isArray(d)) out.push(...d.map((x) => x.phrase));
  return out.map((s) => String(s).toLowerCase().trim());
}

// Phrases worth a buying guide: "<seed> <1-4 words>", US-market, no prices or years
// (prices aren't stated in prose; years go stale), no shopping-site noise.
const NOISE = /\b(reddit|amazon|walmart|home depot|lowes|harbor freight|near me|uk|australia|india|canada|philippines|nz|south africa|price|cheap)\b|\$|\d/;

async function trending(category) {
  const score = new Map();
  for (const seed of CATEGORIES[category].seeds) {
    for (const suffix of ["", ..."abcdefghijklmnoprstuvw"]) {
      const list = await suggestions(`${seed} ${suffix}`.trim() + (suffix ? "" : " "));
      list.forEach((s, i) => {
        if (!s.startsWith(`${seed} `)) return;
        const rest = s.slice(seed.length).trim();
        const words = rest.split(/\s+/);
        if (words.length < 1 || words.length > 4 || NOISE.test(rest) || !tokens(rest).size) return; // "for the money": no use case
        score.set(s, (score.get(s) ?? 0) + (10 - Math.min(i, 9)));
      });
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  return [...score].sort((a, b) => b[1] - a[1]).map(([keyword, s]) => ({ keyword, score: s }));
}

// ---------- product fit (local model) ----------

async function fitCheck(keyword, category, picks) {
  const catalog = picks.map((p) => ({
    name: p.name,
    summary: p.bottomLine,
    specs: Object.fromEntries((p.specs || []).map((s) => [s.label, s.value])),
  }));
  const prompt = `A reader searched for "${keyword}". Below are the only products we may recommend, with their verified data.
Decide whether at least two of them are genuinely suitable for that specific use, judging only from the data shown.
Say "fit": false when the use needs something none of them offer (for example a tool type, size, power or feature they
lack), or when the search isn't really about buying one of these products. Otherwise choose the 2 to 4 best-suited
products by exact name and give a one-sentence reason grounded in the data.

Products:
${JSON.stringify(catalog, null, 1)}`;
  const res = await fetch(`${OLLAMA}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      // Streamed: a CPU model can take longer than fetch's 5-minute wait for the
      // first response bytes, and streaming starts sending at once.
      stream: true,
      options: { temperature: 0 },
      format: { type: "object", properties: { fit: { type: "boolean" }, picks: { type: "array", items: { type: "string" } }, reason: { type: "string" } }, required: ["fit", "picks", "reason"] },
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(15 * 60 * 1000),
  });
  if (!res.ok) throw new Error(`Ollama returned ${res.status}`);
  let text = "";
  for (const line of (await res.text()).split("\n")) if (line.trim()) text += JSON.parse(line).message?.content ?? "";
  const out = JSON.parse(text);
  const names = new Set(picks.map((p) => p.name));
  out.picks = [...new Set(out.picks)].filter((n) => names.has(n)).slice(0, 4);
  return out;
}

// ---------- git ----------

const queueClean = () => { try { run(`git diff --quiet HEAD -- ${QUEUE}`); return true; } catch { return false; } };

function commitAndPush(summary) {
  run(`git commit -q -m "Refill article queue: ${summary}" -m "Automated by automation/refill-queue.mjs (trending autocomplete topics, duplicate-checked, products chosen from verified in-stock Picks)." -- ${QUEUE}`);
  try { run("git push -q"); return true; } catch {
    // Someone pushed in the meantime: drop our commit (keeping their work) and let
    // the next run try again rather than rebasing a dirty shared working tree.
    run("git reset -q --keep HEAD~1");
    return false;
  }
}

// ---------- main ----------

async function main() {
  log(`\n▶ Queue refill ${today}${DRY ? " (dry run)" : ""}`);
  if (!DRY && !queueClean()) { log("  Another session has uncommitted edits in the queue; skipping today's refill."); return; }
  if (!DRY) { try { run("git pull --ff-only -q"); } catch { log("  Couldn't fast-forward to origin/main (local commits or conflicting edits); skipping today's refill."); return; } }

  const q = JSON.parse(readFileSync(QUEUE, "utf8"));
  const crlf = readFileSync(QUEUE, "utf8").includes("\r\n");
  const paths = livePaths();
  const fails = readJson(FAILS, {});
  const picks = Object.fromEntries(Object.keys(CATEGORIES).map((c) => [c, loadPicks(c)]));
  const changes = { cleaned: 0, repicked: 0, added: [] };

  // 1. Clean what's already queued.
  for (const e of q.keywords) {
    if (e.type !== "remix" || e.status !== "pending" || !CATEGORIES[e.category]) continue;
    const others = q.keywords.filter((o) => o !== e && o.status !== "pending" && o.status !== "skip-no-fit");
    const hit = coveredBy(e.keyword, e.category, paths, others);
    if (hit) { e.status = "skip-duplicate"; e.notes = `covered by ${hit} (refill ${today})`; changes.cleaned++; log(`  - ${e.keyword}: covered by ${hit}`); continue; }
    if (e.targetPicks) {
      const ok = e.targetPicks.filter((n) => picks[e.category].some((p) => p.name === n));
      if (ok.length !== e.targetPicks.length) { changes.cleaned++; log(`  - ${e.keyword}: dropped retired ${e.targetPicks.filter((n) => !ok.includes(n)).join(", ")}`); if (ok.length >= 2) e.targetPicks = ok; else delete e.targetPicks; }
    }
  }

  const ready = () => q.keywords.filter((k) => k.type === "remix" && k.status === "pending" && k.targetPicks?.length >= 2 && (fails[k.keyword] || 0) < 2).length;
  log(`  ${ready()} keywords ready to write (target ${TARGET}); ${changes.cleaned} stale entries cleaned.`);

  // 2-4. Top up with trending, uncovered topics, plus queued ones that lost their picks.
  let ollamaUp = true;
  try { await fetch(`${OLLAMA}/api/tags`, { signal: AbortSignal.timeout(5000) }); } catch { ollamaUp = false; }
  if (ready() < TARGET && !ollamaUp) log(`  Ollama isn't running at ${OLLAMA}; can't choose products, so no new keywords today.`);
  if (ready() < TARGET && ollamaUp) {
    // Price-tier keywords ("under $50") are left alone: the Pick data has no prices,
    // so nothing here can tell which products actually fit the budget.
    const candidates = q.keywords.filter((k) => k.type === "remix" && k.status === "pending" && !k.targetPicks && CATEGORIES[k.category] && !/\$|\bunder\b|\d/.test(k.keyword)).map((k) => ({ entry: k, keyword: k.keyword, category: k.category }));
    const perCat = [];
    for (const category of Object.keys(CATEGORIES)) {
      const list = (await trending(category))
        .filter(({ keyword }) => !coveredBy(keyword, category, paths, q.keywords))
        .map((t) => ({ ...t, category }));
      log(`  ${category}: ${list.length} new trending phrases not covered yet${list.length ? ` (top: ${list.slice(0, 3).map((t) => t.keyword).join("; ")})` : ""}`);
      perCat.push(list);
    }
    // Interleave categories so one category doesn't take every slot.
    for (let i = 0; perCat.some((l) => l[i]); i++) for (const l of perCat) if (l[i]) candidates.push(l[i]);

    let checks = 0;
    for (const c of candidates) {
      if (ready() >= TARGET || changes.added.length >= MAX_ADD || checks >= MAX_CHECKS) break;
      if (!c.entry && coveredBy(c.keyword, c.category, paths, q.keywords)) continue; // an earlier add this run covers it
      checks++;
      let verdict;
      try { verdict = await fitCheck(c.keyword, c.category, picks[c.category]); } catch (err) { log(`  Ollama fit check failed (${err.message}); stopping for today.`); break; }
      const good = verdict.fit && verdict.picks.length >= 2;
      log(`  ${good ? "✔" : "✖"} ${c.keyword}${good ? ` → ${verdict.picks.join(", ")}` : ` (${verdict.reason})`}`);
      if (c.entry) {
        if (good) { c.entry.targetPicks = verdict.picks; c.entry.notes = `picks chosen by refill ${today}: ${verdict.reason}`; changes.repicked++; }
        else { c.entry.status = "skip-no-fit"; c.entry.notes = `refill ${today}: ${verdict.reason}`; changes.cleaned++; }
        continue;
      }
      // Record misfits too, so the same phrase isn't re-checked every day.
      q.keywords.push(good
        ? { keyword: c.keyword, category: c.category, type: "remix", status: "pending", targetPicks: verdict.picks, notes: `trending ${today} (autocomplete score ${c.score}): ${verdict.reason}` }
        : { keyword: c.keyword, category: c.category, type: "remix", status: "skip-no-fit", notes: `trending ${today}: ${verdict.reason}` });
      if (good) changes.added.push(c.keyword);
    }
  }

  const summary = [changes.added.length && `${changes.added.length} new trending keywords`, changes.repicked && `${changes.repicked} re-picked`, changes.cleaned && `${changes.cleaned} stale cleaned`].filter(Boolean).join(", ");
  log(`  ${ready()} keywords ready after refill.`);
  if (!summary) { log("  Nothing to change."); return; }
  if (DRY) { log(`  Dry run: would commit "${summary}".`); return; }
  let text = JSON.stringify(q, null, 2) + "\n";
  if (crlf) text = text.replace(/\n/g, "\r\n");
  writeFileSync(QUEUE, text);
  log(commitAndPush(summary) ? `  ✔ Pushed: ${summary}` : "  Push was rejected (someone pushed meanwhile); the refill will retry next run.");
}

main().catch((err) => { console.error(`  Refill failed: ${err.stack || err}`); process.exitCode = 1; });
