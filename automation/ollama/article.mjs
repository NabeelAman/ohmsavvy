// Local article writer: drafts a use-case guide with a local Ollama model, using
// ONLY the site's verified Pick data, fact-checks the draft mechanically, builds
// a preview, and publishes only when told to.
//
//   npm run article -- "best multimeter for HVAC technicians"   draft + preview
//   npm run article -- --next                                    next pending keyword
//   npm run article:list                                         show the queue
//   npm run article:publish                                      push the draft live
//   npm run article:discard                                      throw the draft away
//
// Custom keyword not in the queue:
//   npm run article -- "best multimeter for boats" --category multimeters --picks "Southwire 14070T,Fluke 117"
//
// Rules enforced (automation/CONTENT_STANDARDS.md): products only from the verified
// roster; no number, spec or model that isn't in their verified data; no prices; no
// testing claims (the "Hands-on Tested" badge is rendered from data, never written);
// no hype words. A draft that breaks any rule is sent back to the model with the
// errors, up to MAX_ATTEMPTS times.
import { execSync, spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import { join } from "node:path";
import { createServer } from "node:net";
import { claimAudit, geminiAudit, onPageSeo, originality, seoReadability } from "./qa.mjs";

const MODEL = process.env.OLLAMA_MODEL || "qwen2.5:14b";
const OLLAMA = process.env.OLLAMA_URL || "http://localhost:11434";
const MAX_ATTEMPTS = 5;
const STATE = "automation/ollama/.tmp-last-draft.json";
const QUEUE = "automation/content-queue.json";
const REGISTRY = "src/lib/content.ts";
const PREVIEW_DIR = "zz-article-preview";

const CATEGORIES = {
  multimeters: { roundup: "best-multimeters", hero: "multimeters", label: "Multimeters", noun: "multimeter", next: "\n  // Soldering irons" },
  "soldering-irons": { roundup: "best-soldering-irons", hero: "soldering", label: "Soldering Irons", noun: "soldering iron", next: "\n  // Oscilloscopes" },
  oscilloscopes: { roundup: "best-beginner-oscilloscopes", hero: "oscilloscopes", label: "Oscilloscopes", noun: "oscilloscope", next: "];\n\nexport function" },
};

const log = (...a) => console.log(...a);
const die = (msg) => { console.error(`\n✖ ${msg}`); process.exit(1); };
const run = (cmd, opts = {}) => execSync(cmd, { stdio: opts.quiet ? "pipe" : "inherit", encoding: "utf8", ...opts });

// ---------- verified data ----------

function loadPicks(category) {
  const src = readFileSync(`src/app/${category}/${CATEGORIES[category].roundup}/page.tsx`, "utf8");
  const m = src.match(/export const picks: Pick\[\] = (\[[\s\S]*?\n\]);/);
  if (!m) die(`Couldn't read the picks array for ${category}`);
  return new Function(`return ${m[1]}`)();
}

function existingMeta() {
  const titles = new Set();
  const descs = new Set();
  const walk = (d) => readdirSync(d).forEach((e) => {
    const f = join(d, e);
    if (statSync(f).isDirectory()) walk(f);
    else if (e === "page.tsx") {
      const s = readFileSync(f, "utf8");
      const t = s.match(/title:\s*"([^"]+)"/); if (t) titles.add(t[1].toLowerCase());
      const ds = s.match(/description:\s*\n?\s*"([^"]+)"/); if (ds) descs.add(ds[1].toLowerCase());
    }
  });
  walk("src/app");
  return { titles, descs };
}

const slugify = (s) => s.toLowerCase().replace(/\$/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---------- Ollama ----------

const SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    metaDescription: { type: "string" },
    heroHeading: { type: "string" },
    heroDescription: { type: "string" },
    registryTitle: { type: "string" },
    registryDescription: { type: "string" },
    howWeChose: { type: "string" },
    fitNotes: { type: "array", items: { type: "object", properties: { product: { type: "string" }, note: { type: "string" } }, required: ["product", "note"] } },
    advice: { type: "array", items: { type: "object", properties: { heading: { type: "string" }, body: { type: "string" } }, required: ["heading", "body"] } },
    faqs: { type: "array", items: { type: "object", properties: { question: { type: "string" }, answer: { type: "string" } }, required: ["question", "answer"] } },
  },
  required: ["title", "metaDescription", "heroHeading", "heroDescription", "registryTitle", "registryDescription", "howWeChose", "fitNotes", "advice", "faqs"],
};

function buildPrompt(keyword, category, picks) {
  const products = picks.map((p) => ({
    name: p.name, award: p.badge, editorialRating: p.rating, oneLineVerdict: p.bottomLine, verdict: p.verdict,
    specs: Object.fromEntries(p.specs.map((s) => [s.label, s.value])), strengths: p.pros, limitations: p.cons,
  }));
  return [
    {
      role: "system",
      content: `You write buying guides for OhmSavvy, an electronics test-equipment review site whose promise is "100% spec-verified, no fabrication".

HARD RULES (a draft that breaks any of these is rejected automatically):
1. Every product fact must come from the PRODUCT DATA provided. Never add a spec, number, feature, measurement or model name that is not in that data.
2. Only mention the products provided. Do not mention or compare against any other product, brand or model.
3. Never mention prices, costs in money, discounts or deals. Say "budget", "mid-range" or "premium" instead.
4. Never claim or imply testing: no "we tested", "in our tests", "hands-on", "we found", "we noticed", "in our lab". Never describe how a product feels or performs in use.
5. No hype words: game-changer, must-have, revolutionary, unbeatable, guaranteed, best ever, #1, number one.
6. You MAY explain general, well-established electronics concepts (what a CAT safety rating means, why True RMS matters, auto-ranging, why bandwidth matters) without citing data, but do not attach new numbers to products.
7. Only attribute a feature to a product if that product's data lists it. In general advice, never imply every product has a feature (write "if your meter has non-contact voltage detection", not "use the meter's non-contact voltage detection").
8. Write fresh sentences; do not copy the verdict or strengths text word-for-word.
9. Be specific to the use case: name the actual tasks this buyer does and connect them to the specs. Avoid filler like "ensure accurate and reliable measurements".
10. Plain, direct, specific British-neutral English. Talk to the reader as "you". Each fit note must say concretely why that product suits THIS use case, citing its provided specs.

Lengths are checked automatically; drafts that are too short are rejected, so write the full target length.

Return ONLY JSON matching the schema.`,
    },
    {
      role: "user",
      content: `Keyword / topic: "${keyword}"
Category: ${CATEGORIES[category].label}

PRODUCT DATA (the only facts you may use):
${JSON.stringify(products, null, 2)}

Write these fields:
- title: page title, max 49 characters, contains the keyword's meaning, must NOT contain "OhmSavvy", no double-quote characters.
- metaDescription: aim for about 140 characters (must be 125-155), natural, includes the keyword's meaning, no double-quote characters.
- heroHeading: the H1, max 60 characters.
- heroDescription: 25-45 words introducing who this guide is for.
- registryTitle: very short card title starting with "For " or similar, max 30 characters (e.g. "For HVAC Technicians").
- registryDescription: max 60 characters, a short card subtitle.
- howWeChose: about 70 words (must be 50-90) on what mattered for THIS use case when choosing these products.
- fitNotes: exactly one entry per product (product = exact name), each note about 60 words (must be 45-80) explaining why it fits this use case, using its specs.
- advice: exactly 3 sections, each with a short heading and a body of about 115 words (must be 90-140) of practical buying advice for this use case.
- faqs: exactly 4 questions a buyer with this need would ask, each answer about 65 words (must be 45-90), all specific to this topic (no generic copy).`,
    },
  ];
}

async function ollamaChat(messages, schema = SCHEMA) {
  const res = await fetch(`${OLLAMA}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, messages, format: schema, stream: true, options: { temperature: 0.35, num_ctx: 8192, num_predict: 4096 } }),
  });
  if (!res.ok) die(`Ollama returned ${res.status}: ${await res.text()}`);
  let out = "", tokens = 0;
  const dec = new TextDecoder();
  let buf = "";
  for await (const chunk of res.body) {
    buf += dec.decode(chunk, { stream: true });
    let nl;
    while ((nl = buf.indexOf("\n")) >= 0) {
      const line = buf.slice(0, nl).trim(); buf = buf.slice(nl + 1);
      if (!line) continue;
      const j = JSON.parse(line);
      if (j.error) die(`Ollama error: ${j.error}`);
      out += j.message?.content ?? "";
      if (++tokens % 100 === 0) process.stdout.write(`\r  writing… ${tokens} tokens`);
    }
  }
  process.stdout.write(`\r  writing… ${tokens} tokens, done\n`);
  return out;
}

// ---------- fact-check ----------

const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

function validate(d, { keyword, picks, roster, meta }) {
  const errs = [];
  const need = (cond, msg) => { if (!cond) errs.push(msg); };
  const range = (label, text, lo, hi, unit = "words") => {
    const n = unit === "chars" ? text.length : words(text);
    need(n >= lo && n <= hi, `${label} is ${n} ${unit}; it must be ${lo}-${hi} ${unit}.`);
  };

  range("title", d.title, 15, 49, "chars");
  need(!/ohmsavvy/i.test(d.title), `title must not contain "OhmSavvy".`);
  range("metaDescription", d.metaDescription, 120, 160, "chars");
  need(!/"/.test(d.title + d.metaDescription), `title and metaDescription must not contain double quotes.`);
  need(!meta.titles.has(d.title.toLowerCase()), `title "${d.title}" is already used by another page; write a different one.`);
  need(!meta.descs.has(d.metaDescription.toLowerCase()), `metaDescription duplicates another page; write a different one.`);
  range("heroHeading", d.heroHeading, 10, 60, "chars");
  range("heroDescription", d.heroDescription, 20, 50);
  range("registryTitle", d.registryTitle, 4, 30, "chars");
  range("registryDescription", d.registryDescription, 10, 60, "chars");
  range("howWeChose", d.howWeChose, 40, 100);

  const names = picks.map((p) => p.name);
  const noteNames = (d.fitNotes || []).map((f) => f.product);
  need(names.every((n) => noteNames.includes(n)) && noteNames.length === names.length,
    `fitNotes must have exactly one entry for each of: ${names.join(", ")} (exact names).`);
  for (const f of d.fitNotes || []) range(`fitNote for ${f.product}`, f.note, 35, 95);
  need((d.advice || []).length === 3, `advice must have exactly 3 sections.`);
  for (const a of d.advice || []) range(`advice "${a.heading}"`, a.body, 70, 160);
  need((d.faqs || []).length === 4, `faqs must have exactly 4 entries.`);
  for (const f of d.faqs || []) range(`faq answer "${f.question}"`, f.answer, 35, 100);
  const qs = (d.faqs || []).map((f) => f.question.toLowerCase());
  need(new Set(qs).size === qs.length, `faqs contain a duplicate question.`);

  const prose = [d.title, d.metaDescription, d.heroHeading, d.heroDescription, d.registryTitle, d.registryDescription, d.howWeChose,
    ...(d.fitNotes || []).map((f) => f.note), ...(d.advice || []).flatMap((a) => [a.heading, a.body]),
    ...(d.faqs || []).flatMap((f) => [f.question, f.answer])].join("\n");
  const verified = [keyword, ...picks.flatMap((p) => [p.name, p.badge, p.bottomLine, p.verdict, ...p.pros, ...p.cons,
    ...p.specs.flatMap((s) => [s.label, s.value])])].join("\n");

  // Prices / money (allow a figure that is literally part of the keyword, e.g. "under $100").
  for (const m of prose.matchAll(/(\$|USD|AED|€|£)\s?\d[\d,.]*|\d[\d,.]*\s?(dollars|USD|AED)/gi)) {
    if (!keyword.includes(m[0].replace(/\s/g, ""))) errs.push(`Mentions a price ("${m[0]}"). Never mention prices.`);
  }
  // Testing / experience claims.
  const testing = prose.match(/\b(we|our team|our testing team|our lab|I)\b[^.\n]{0,40}\b(tested|test|measured|found|noticed|used|tried|handled|experienced)\b|hands-on|in our (lab|tests?|testing)|bench[- ]tested|in our experience/i);
  if (testing) errs.push(`Contains a testing/experience claim ("${testing[0]}"). Remove all testing and first-hand language.`);
  const hype = prose.match(/\b(game[- ]?changer|must[- ]have|revolutionary|unbeatable|guaranteed?|best[- ]ever|number one)\b|#1/i);
  if (hype) errs.push(`Contains a hype word ("${hype[0]}").`);
  const amazonRating = prose.match(/amazon (rating|reviews?|customers?|stars?)|customer reviews|star ratings?/i);
  if (amazonRating) errs.push(`Refers to Amazon/customer reviews or ratings ("${amazonRating[0]}"). Don't.`);

  // Other roster products must not be mentioned.
  for (const other of roster.filter((n) => !names.includes(n))) {
    if (prose.includes(other)) errs.push(`Mentions ${other}, which is not one of this page's products.`);
  }
  // Model-number-like tokens must exist in the verified data.
  for (const m of new Set(prose.match(/\b[A-Z]{1,6}-?\d{2,6}[A-Z]{0,4}\b/g) || [])) {
    if (!verified.includes(m)) errs.push(`"${m}" looks like a model number that isn't in the product data.`);
  }
  // Every number must come from the verified data (or the keyword); 1-10 and common
  // general-knowledge figures are allowed.
  const ALLOW = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "3-5", "3–5", "100", "50"]);
  for (const m of new Set(prose.match(/\d[\d,]*(?:\.\d+)?/g) || [])) {
    const n = m.replace(/,/g, "");
    if (ALLOW.has(n)) continue;
    if (!verified.includes(m) && !verified.includes(n)) errs.push(`The number "${m}" isn't in the product data. Remove it or use only figures from the data.`);
  }

  // No copying the existing product copy: any 10-word run lifted from it is duplicate content.
  const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
  const shingles = new Set();
  for (const t of picks.flatMap((p) => [p.bottomLine, p.verdict, ...p.pros, ...p.cons])) {
    const w = norm(t);
    for (let i = 0; i + 10 <= w.length; i++) shingles.add(w.slice(i, i + 10).join(" "));
  }
  const pw = norm(prose);
  for (let i = 0; i + 10 <= pw.length; i++) {
    const g = pw.slice(i, i + 10).join(" ");
    if (shingles.has(g)) { errs.push(`Copies existing product text word-for-word ("${g}…"). Write fresh sentences in your own words.`); break; }
  }

  const total = words(prose);
  need(total >= 550, `The draft has ${total} words of new text; it needs at least 550. Expand the advice and fit notes.`);
  return errs;
}

// ---------- page generation ----------

const js = (v) => JSON.stringify(v);
const pascal = (s) => s.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase()).replace(/^(\d)/, "Page$1");

function pageSource({ category, path, d, picks }) {
  const c = CATEGORIES[category];
  const fit = Object.fromEntries(d.fitNotes.map((f) => [f.product, f.note]));
  return `import { CategoryHero } from "@/components/CategoryHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle } from "@/components/ReviewArticle";
import { guidePicks } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { picks as allPicks } from "../${c.roundup}/page";

// Drafted with a local model from verified Pick data only, fact-checked by
// automation/ollama/article.mjs, and reviewed in preview before publishing.
export const metadata = buildMetadata({
  title: ${js(d.title)},
  description: ${js(d.metaDescription)},
  path: ${js(path)},
});

const names = guidePicks(${js(path)});
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = ${JSON.stringify(d.faqs.map((f) => ({ question: f.question, answer: f.answer })), null, 2)};

const fitNotes: Record<string, string> = ${JSON.stringify(fit, null, 2)};

const advice = ${JSON.stringify(d.advice.map((a) => ({ heading: a.heading, body: a.body })), null, 2)};

export default function ${pascal(path.split("/").pop())}Page() {
  return (
    <>
      <CategoryHero
        category="${c.hero}"
        label=${js(`${c.label} · ${d.registryTitle}`)}
        heading=${js(d.heroHeading)}
        tagline="Compared honestly — no pay-for-placement."
        description=${js(d.heroDescription)}
        primaryCta={{ label: "See all ${c.noun} picks", href: "/${category}/${c.roundup}" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: \`\${picks.length}\`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose=${js(d.howWeChose)}
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="${category}" current=${js(path)} />
    </>
  );
}
`.replace(/^(\s*)"(question|answer|heading|body)":/gm, "$1$2:");
}

function registryEntry({ category, path, d, picks }) {
  return `  {
    category: "${category}",
    type: "use-case-guide",
    title: ${js(d.registryTitle)},
    description: ${js(d.registryDescription)},
    href: "${path}",
    picks: ${JSON.stringify(picks.map((p) => p.name)).replace(/","/g, '", "')},
  },
`;
}

// ---------- preview server ----------

const freePort = () => new Promise((resolve) => {
  const tryPort = (p) => { const s = createServer(); s.once("error", () => tryPort(p + 1)); s.once("listening", () => s.close(() => resolve(p))); s.listen(p); };
  tryPort(4600);
});

function stopPreview(state) {
  if (state?.previewPid) { try { process.platform === "win32" ? execSync(`taskkill /PID ${state.previewPid} /T /F`, { stdio: "ignore" }) : process.kill(-state.previewPid); } catch {} }
  if (existsSync(PREVIEW_DIR)) { try { rmSync(PREVIEW_DIR, { recursive: true, force: true }); } catch {} }
}

async function preview(path) {
  log("\n▶ Building a preview (1–2 minutes)…");
  rmSync(PREVIEW_DIR, { recursive: true, force: true });
  mkdirSync(PREVIEW_DIR);
  // Copy the repo (minus heavy/irrelevant dirs) so the build never touches the real
  // .next folder other processes may serve from. No lockfile in the copy, so it
  // resolves the repo's node_modules.
  const SKIP = new Set(["node_modules", ".next", ".git", "package-lock.json", PREVIEW_DIR]);
  for (const e of readdirSync(".")) {
    if (SKIP.has(e) || e.startsWith(".tmp-") || e.startsWith("zz-")) continue;
    cpSync(e, join(PREVIEW_DIR, e), { recursive: true });
  }
  run("npx next build", { cwd: PREVIEW_DIR, quiet: true });
  run("node automation/check-h1.mjs", { cwd: PREVIEW_DIR, quiet: true });
  const html = readFileSync(join(PREVIEW_DIR, ".next/server/app", `${path}.html`), "utf8");
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ");
  const pageWords = words(main);
  const port = await freePort();
  const child = spawn(`npx next start -p ${port}`, { cwd: PREVIEW_DIR, detached: true, stdio: "ignore", shell: true });
  child.unref();
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`http://localhost:${port}${path}`)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  return { url: `http://localhost:${port}${path}`, pid: child.pid, pageWords, html };
}

// ---------- commands ----------

const readState = () => (existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : null);
const queue = () => JSON.parse(readFileSync(QUEUE, "utf8"));
const saveQueue = (q) => writeFileSync(QUEUE, JSON.stringify(q, null, 2) + "\n");

function list() {
  const q = queue();
  const live = readFileSync(REGISTRY, "utf8");
  const ready = q.keywords.filter((k) => k.type === "remix" && k.status === "pending" && k.targetPicks?.length);
  log(`\n${ready.length} keywords ready to draft (verified products already assigned):\n`);
  for (const k of ready) {
    const dupe = live.includes(`/${k.category}/${slugify(k.keyword)}"`) ? "  (already live)" : "";
    log(`  [${k.category}] ${k.keyword}  →  ${k.targetPicks.join(", ")}${dupe}`);
  }
  log(`\nDraft one:  npm run article -- "<keyword>"     or     npm run article -- --next`);
}

async function draft(args) {
  if (readState()) die(`A draft is already waiting. Run "npm run article:publish" or "npm run article:discard" first.`);
  try { await fetch(`${OLLAMA}/api/tags`); } catch { die(`Ollama isn't running at ${OLLAMA}. Start the Ollama app and try again.`); }
  const tags = await (await fetch(`${OLLAMA}/api/tags`)).json();
  if (!tags.models.some((m) => m.name === MODEL || m.name === `${MODEL}:latest`)) die(`Model ${MODEL} isn't installed. Run: ollama pull ${MODEL}`);

  const q = queue();
  const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
  let keyword = args.find((a) => !a.startsWith("--") && a !== flag("--category") && a !== flag("--picks"));
  let entry;
  if (args.includes("--next")) {
    const live = readFileSync(REGISTRY, "utf8");
    entry = q.keywords.find((k) => k.type === "remix" && k.status === "pending" && k.targetPicks?.length && !live.includes(`/${k.category}/${slugify(k.keyword)}"`));
    if (!entry) die("No pending keywords left in the queue.");
    keyword = entry.keyword;
  } else if (keyword) {
    entry = q.keywords.find((k) => k.keyword.toLowerCase() === keyword.toLowerCase());
  } else die(`Give a keyword: npm run article -- "best multimeter for HVAC technicians"   (or --next, or run article:list)`);

  if (entry && entry.type !== "remix") die(`"${keyword}" is a ${entry.type} keyword. Only remix (verified-product) guides can be drafted automatically.`);
  if (entry && entry.status === "skip-duplicate") die(`"${keyword}" is marked skip-duplicate in the queue (too close to an existing page).`);
  const category = entry?.category ?? flag("--category");
  if (!CATEGORIES[category]) die(`Unknown category. Use --category multimeters | soldering-irons | oscilloscopes`);
  const pickNames = entry?.targetPicks ?? (flag("--picks") || "").split(",").map((s) => s.trim()).filter(Boolean);
  const all = loadPicks(category);
  const roster = Object.values(q.verifiedRoster).flat();
  const picks = pickNames.map((n) => all.find((p) => p.name === n) ?? die(`"${n}" isn't a verified ${category} product. Verified: ${all.map((p) => p.name).join(", ")}`));
  if (picks.length < 2) die("A guide needs at least 2 verified products (--picks \"A,B\").");

  const path = `/${category}/${slugify(keyword)}`;
  if (existsSync(`src/app${path}`) || readFileSync(REGISTRY, "utf8").includes(`href: "${path}"`)) die(`${path} already exists.`);
  log(`\n✎ Drafting "${keyword}"\n  category: ${category}\n  products: ${pickNames.join(", ")}\n  model:    ${MODEL} (this takes several minutes on CPU)`);

  const meta = existingMeta();
  const messages = buildPrompt(keyword, category, picks);
  let d, errs = [];
  let qa = [];
  const path0 = `/${category}/${slugify(keyword)}`;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    log(`\n▶ Attempt ${attempt}/${MAX_ATTEMPTS}`);
    const raw = await ollamaChat(messages);
    d = undefined;
    try { d = JSON.parse(raw); } catch { errs = ["Output was not valid JSON."]; }
    qa = [];
    if (d) {
      // Checkpoint 1: mechanical fact-check (cheap, so it gates the slower checks).
      errs = validate(d, { keyword, picks, roster, meta });
      qa.push({ name: "1. Fact-check", status: errs.length ? "fail" : "pass", errors: errs, notes: [] });
      if (!errs.length) {
        log("  ✔ 1. fact-check");
        // Checkpoints 2-4.
        log("  … 2. AI claim audit (local model)");
        qa.push(await claimAudit({ d, picks, chat: (m, schema) => ollamaChat(m, schema) }));
        log("  … 2b. Gemini independent audit");
        qa.push(await geminiAudit({ d, picks, keyword }));
        qa.push(await originality({ d, path: path0 }));
        qa.push(seoReadability({ d, keyword }));
        for (const c of qa.slice(1)) log(`  ${c.status === "pass" ? "✔" : c.status === "skipped" ? "–" : "✖"} ${c.name}${c.notes.length ? ` (${c.notes.join(" ")})` : ""}`);
        errs = qa.flatMap((c) => c.errors);
      }
    }
    if (!errs.length) { log("  ✔ all content checkpoints passed"); break; }
    log(`  ✖ ${errs.length} problem(s):\n    - ${errs.slice(0, 12).join("\n    - ")}`);
    messages.push({ role: "assistant", content: raw }, { role: "user", content: `Your draft broke these rules. Fix every one and return the full corrected JSON:\n- ${errs.join("\n- ")}` });
  }
  if (errs.length) die(`The draft still failed QA after ${MAX_ATTEMPTS} attempts, so nothing was written. Try again, or try another keyword.`);

  // Write the page + registry entry + queue status.
  mkdirSync(`src/app${path}`, { recursive: true });
  writeFileSync(`src/app${path}/page.tsx`, pageSource({ category, path, d, picks }));
  const reg = readFileSync(REGISTRY, "utf8");
  const marker = CATEGORIES[category].next;
  const at = reg.indexOf(marker);
  if (at < 0) die(`Couldn't find where to add the registry entry (${JSON.stringify(marker)}).`);
  const entryText = registryEntry({ category, path, d, picks });
  writeFileSync(REGISTRY, reg.slice(0, at) + entryText + reg.slice(at));
  const state = { keyword, category, path, entryText, queueKeyword: entry?.keyword ?? null, createdAt: new Date().toISOString() };
  writeFileSync(STATE, JSON.stringify(state, null, 2));
  if (entry) {
    // Re-read the queue: drafting takes a long time and other sessions may have
    // edited it (e.g. added to verifiedRoster) since we loaded it.
    const fresh = queue();
    const e = fresh.keywords.find((k) => k.keyword === entry.keyword);
    if (e) { e.status = "drafted"; e.notes = `draft at ${path}`; saveQueue(fresh); }
  }

  log("\n▶ Running site checks…");
  try {
    run("node automation/check-roster.mjs", { quiet: true });
    run("node automation/check-seo.mjs", { quiet: true });
    run("node automation/check-internal-links.mjs", { quiet: true });
    run(`npx eslint "src/app${path}/page.tsx" src/lib/content.ts`, { quiet: true });
    run("npx tsc --noEmit --incremental false -p .", { quiet: true });
  } catch (e) {
    log(String(e.stdout || e.message));
    die(`Site checks failed. The draft is still on disk; fix it or run "npm run article:discard".`);
  }
  log("  ✔ roster, SEO, links, lint, types");

  const p = await preview(path);
  // Checkpoint 5: on-page SEO audit of the rendered HTML.
  qa.push(onPageSeo({ html: p.html, path, keyword }));
  // Checkpoint 6: site build checks + rendered length.
  qa.push({
    name: "6. Site build checks",
    status: p.pageWords >= 800 ? "pass" : "fail",
    errors: p.pageWords >= 800 ? [] : [`Rendered page is ${p.pageWords} words (minimum 800).`],
    notes: [`Roster, SEO, links, lint, types and exactly-one-H1 passed; ${p.pageWords} words on the rendered page.`],
  });
  Object.assign(state, { previewPid: p.pid, previewUrl: p.url, pageWords: p.pageWords, qa });
  writeFileSync(STATE, JSON.stringify(state, null, 2));
  const icon = (s) => (s === "pass" ? "✔ PASS   " : s === "skipped" ? "– SKIPPED" : "✖ FAIL   ");
  log(`\n──────── QA report ────────`);
  for (const c of qa) log(`  ${icon(c.status)}  ${c.name}${c.notes.length ? `\n              ${c.notes.join("\n              ")}` : ""}`);
  log(`  ✋ PENDING   7. Your review of the preview`);
  const failed = qa.filter((c) => c.status === "fail");
  if (failed.length) {
    log(`\n  ⚠ ${failed.length} checkpoint(s) failed:\n    - ${failed.flatMap((c) => c.errors).join("\n    - ")}`);
    log("  Publishing is blocked until fixed (discard and re-run, or fix the page and use publish --force).");
  }
  log(`\n✔ Draft ready (${p.pageWords} words on the page)\n\n   Preview:  ${p.url}\n\n   Read it, then:\n     npm run article:publish   → push it live\n     npm run article:discard   → throw it away`);
  if (process.stdin.isTTY) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const ans = (await new Promise((r) => rl.question("\nType 'publish' to go live, 'discard' to delete, or Enter to decide later: ", r))).trim().toLowerCase();
    rl.close();
    if (ans === "publish") return publish();
    if (ans === "discard") return discard();
  }
}

function publish(force = process.argv.includes("--force")) {
  const st = readState() ?? die("No draft waiting. Run: npm run article -- \"<keyword>\"");
  const failed = (st.qa || []).filter((c) => c.status === "fail");
  if (failed.length && !force) die(`Publishing blocked: ${failed.map((c) => c.name).join(", ")} failed. Discard and re-run, or fix the page and run "npm run article:publish -- --force".`);
  stopPreview(st);
  log(`\n▶ Publishing ${st.path}`);
  run("git pull --ff-only", { quiet: true });
  run("node automation/check-seo.mjs", { quiet: true });
  run("node automation/check-internal-links.mjs", { quiet: true });
  // Never sweep someone else's uncommitted edits into this commit: the registry may
  // differ from HEAD only by this draft's own entry.
  const head = execSync(`git show HEAD:${REGISTRY}`, { encoding: "utf8" }).replace(/\r\n/g, "\n");
  const working = readFileSync(REGISTRY, "utf8").replace(/\r\n/g, "\n");
  if (working.replace(st.entryText, "") !== head) {
    die(`${REGISTRY} has other uncommitted changes (another session's work?). Commit or stash those first, then run publish again. Your draft is untouched.`);
  }
  const q = queue();
  const e = st.queueKeyword && q.keywords.find((k) => k.keyword === st.queueKeyword);
  if (e) { e.status = "published"; e.notes = `live at ${st.path}`; saveQueue(q); }
  run(`git add "src/app${st.path}/page.tsx" ${REGISTRY} ${QUEUE}`, { quiet: true });
  const msg = `Add ${st.keyword} guide (drafted locally, fact-checked)\n\nDrafted by ${MODEL} via automation/ollama/article.mjs from verified Pick data only;\npassed the mechanical fact-check (no unverified numbers or models, no prices,\nno testing claims) and the site checks, then reviewed in preview.`;
  writeFileSync(".tmp-commit-msg.txt", msg);
  run("git commit -q -F .tmp-commit-msg.txt", { quiet: true });
  rmSync(".tmp-commit-msg.txt");
  run("git push -q", { quiet: true });
  rmSync(STATE);
  log(`\n✔ Pushed. Live in ~2 minutes at https://ohmsavvy.com${st.path}\n  It's in the sitemap and feed.json, so the Facebook autoposter will share it in its next slot.`);
}

function discard() {
  const st = readState() ?? die("No draft waiting.");
  stopPreview(st);
  rmSync(`src/app${st.path}`, { recursive: true, force: true });
  writeFileSync(REGISTRY, readFileSync(REGISTRY, "utf8").replace(st.entryText, ""));
  const q = queue();
  const e = st.queueKeyword && q.keywords.find((k) => k.keyword === st.queueKeyword);
  if (e) { e.status = "pending"; delete e.notes; saveQueue(q); }
  rmSync(STATE);
  log(`✔ Discarded the "${st.keyword}" draft. The keyword is back in the queue.`);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === "publish") publish();
else if (cmd === "discard") discard();
else if (cmd === "list") list();
else await draft([cmd, ...rest].filter((a) => a !== undefined));
