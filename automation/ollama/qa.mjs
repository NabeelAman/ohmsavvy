// QA cross-checks 2-4 for drafted articles (checkpoint 1 is validate() in
// article.mjs; checkpoint 5 is the site build checks). Each returns
// { name, status: "pass" | "fail" | "skipped", errors: string[], notes: string[] }.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const norm = (t) => t.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
const sentences = (t) => t.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 3);

export function draftProse(d) {
  return [d.heroDescription, d.howWeChose, ...d.fitNotes.map((f) => f.note), ...d.advice.flatMap((a) => [a.heading, a.body]),
    ...d.faqs.flatMap((f) => [f.question, f.answer])].join("\n");
}

// ---------- 2. AI claim audit ----------
// A second, independent model pass with an auditor's prompt: list every factual
// claim about a product and mark whether the product data supports it.
const AUDIT_SCHEMA = {
  type: "object",
  properties: {
    claims: {
      type: "array",
      items: {
        type: "object",
        properties: { claim: { type: "string" }, product: { type: "string" }, supported: { type: "boolean" }, reason: { type: "string" } },
        required: ["claim", "product", "supported", "reason"],
      },
    },
  },
  required: ["claims"],
};

export async function claimAudit({ d, picks, chat }) {
  const data = picks.map((p) => ({ name: p.name, award: p.badge, specs: p.specs, strengths: p.pros, limitations: p.cons, verdict: p.verdict }));
  const raw = await chat([
    {
      role: "system",
      content: `You are a strict fact-checking auditor for an electronics review site. You are given PRODUCT DATA and a DRAFT.
List every statement in the DRAFT that says something specific about one of the products (a feature, spec, rating, capability, suitability, or limitation), including statements that imply ALL products share a feature.
For each, set supported=true ONLY if the PRODUCT DATA clearly states or directly implies it for that product. If the draft implies a feature applies to a product whose data does not list it, that is unsupported. General electronics explanations not tied to a product are not claims; skip them.
Return JSON only.`,
    },
    { role: "user", content: `PRODUCT DATA:\n${JSON.stringify(data, null, 2)}\n\nDRAFT:\n${draftProse(d)}` },
  ], AUDIT_SCHEMA);
  let parsed;
  try { parsed = JSON.parse(raw); } catch { return { name: "2. AI claim audit", status: "fail", errors: ["The audit pass returned invalid JSON; re-run."], notes: [] }; }
  const bad = parsed.claims.filter((c) => !c.supported);
  return {
    name: "2. AI claim audit",
    status: bad.length ? "fail" : "pass",
    errors: bad.map((c) => `Unsupported claim about ${c.product}: "${c.claim}" (${c.reason}). Remove it or rephrase it so it matches the product data.`),
    notes: [`${parsed.claims.length} product claims checked, ${parsed.claims.length - bad.length} supported by the data.`],
  };
}

// ---------- 2b. Independent Gemini editorial audit (free tier) ----------
// A different vendor's model re-checks the draft against the same data and the
// CONTENT_STANDARDS §5 editorial QA rules. Skipped (not failed) without a key.
export async function geminiAudit({ d, picks, keyword }) {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const name = "2b. Gemini independent audit";
  if (!key) return { name, status: "skipped", errors: [], notes: ["Not run: set GEMINI_API_KEY (free key from Google AI Studio) to enable."] };
  const data = picks.map((p) => ({ name: p.name, award: p.badge, specs: p.specs, strengths: p.pros, limitations: p.cons, verdict: p.verdict }));
  const prompt = `You are the editorial QA reviewer for OhmSavvy, an electronics review site whose promise is "100% spec-verified, no fabrication".
Review the DRAFT for the keyword "${keyword}" against the PRODUCT DATA. Report a problem for each of these you find:
- any statement about a product (feature, spec, capability, suitability) not supported by that product's data, including implying all products share a feature;
- any claim or implication of hands-on testing or first-hand use;
- any price, deal, or reference to Amazon/customer reviews or star ratings;
- hype or unqualified superlatives ("the best", "#1", "guaranteed", "must-have");
- keyword stuffing, generic filler that says nothing specific, or a sentence that is misleading or unsafe electrical advice.
Do NOT report style preferences. If there are no problems, return an empty list.

PRODUCT DATA:
${JSON.stringify(data, null, 2)}

DRAFT:
${draftProse(d)}`;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { problems: { type: "ARRAY", items: { type: "OBJECT", properties: { quote: { type: "STRING" }, issue: { type: "STRING" } }, required: ["quote", "issue"] } } },
          required: ["problems"],
        },
      },
    }),
  });
  if (!res.ok) {
    // An outage or quota limit shouldn't silently pass the draft, but it also isn't the draft's fault.
    return { name, status: "skipped", errors: [], notes: [`Gemini unavailable (HTTP ${res.status}): ${(await res.text()).slice(0, 160)}`] };
  }
  const j = await res.json();
  let problems = [];
  try { problems = JSON.parse(j.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}").problems ?? []; } catch {
    return { name, status: "skipped", errors: [], notes: ["Gemini returned an unreadable response."] };
  }
  return {
    name,
    status: problems.length ? "fail" : "pass",
    errors: problems.map((p) => `Gemini flagged: "${p.quote}" (${p.issue}).`),
    notes: [`Model ${model}: ${problems.length} problem(s).`],
  };
}

// ---------- 3. Originality: own site, repetition, web plagiarism ----------

function siteCorpus(excludePath) {
  const texts = [];
  const walk = (dir) => readdirSync(dir).forEach((e) => {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) return walk(f);
    if (!/\.(tsx|ts)$/.test(e)) return;
    if (excludePath && f.split("\\").join("/").includes(`src/app${excludePath}/`)) return;
    const s = readFileSync(f, "utf8");
    for (const m of s.matchAll(/"((?:[^"\\]|\\.){60,})"/g)) texts.push(m[1]);
    for (const m of s.matchAll(/>\s*([^<>{}]{80,})\s*</g)) texts.push(m[1]);
  });
  walk("src/app");
  walk("src/components");
  return texts;
}

const FILLER = [
  "accurate and reliable", "ensure accurate", "make sure you", "it is important to", "it's important to",
  "in today's", "look no further", "whether you're a", "take your", "to the next level", "in conclusion",
  "when it comes to", "a wide range of", "peace of mind",
];

async function webPlagiarism(text) {
  const user = process.env.COPYSCAPE_USER;
  const key = process.env.COPYSCAPE_KEY;
  if (!user || !key) return { status: "skipped", note: "Web plagiarism: not run (set COPYSCAPE_USER and COPYSCAPE_KEY to enable)." };
  const body = new URLSearchParams({ u: user, k: key, o: "csearch", e: "UTF-8", c: "3", t: text });
  const res = await fetch("https://www.copyscape.com/api/", { method: "POST", body });
  const xml = await res.text();
  const err = xml.match(/<error>([^<]+)<\/error>/);
  if (err) return { status: "fail", error: `Copyscape error: ${err[1]}` };
  const matches = [...xml.matchAll(/<result>[\s\S]*?<url>([^<]+)<\/url>[\s\S]*?(?:<percentmatched>(\d+)<\/percentmatched>)?[\s\S]*?<\/result>/g)]
    .map((m) => ({ url: m[1], pct: Number(m[2] || 0) }));
  const worst = matches.reduce((a, m) => (m.pct > a.pct ? m : a), { pct: 0, url: "" });
  // CONTENT_STANDARDS §4: fail if any single source matches more than 15%.
  if (worst.pct > 15) return { status: "fail", error: `Web plagiarism: ${worst.pct}% of the text matches ${worst.url} (limit 15%). Rewrite the overlapping passages.` };
  return { status: "pass", note: `Web plagiarism: ${matches.length} sources found, highest match ${worst.pct}% (limit 15%).` };
}

export async function originality({ d, path }) {
  const errors = [];
  const notes = [];
  const prose = draftProse(d);
  const words = norm(prose);

  // Overlap with existing site copy (duplicate content / cannibalisation).
  const grams = new Set();
  for (const t of siteCorpus(path)) {
    const w = norm(t);
    for (let i = 0; i + 8 <= w.length; i++) grams.add(w.slice(i, i + 8).join(" "));
  }
  let hits = 0;
  const examples = [];
  for (let i = 0; i + 8 <= words.length; i++) {
    const g = words.slice(i, i + 8).join(" ");
    if (grams.has(g)) { hits++; if (examples.length < 2) examples.push(g); }
  }
  const overlapPct = words.length ? (hits / Math.max(1, words.length - 7)) * 100 : 0;
  notes.push(`Overlap with existing site pages: ${overlapPct.toFixed(1)}% (limit 5%).`);
  if (overlapPct > 5) errors.push(`${overlapPct.toFixed(1)}% of the text repeats wording already on the site (e.g. "${examples[0]}…"). Rewrite in fresh words.`);

  // Repeated sentences inside the draft.
  const seen = new Map();
  for (const s of sentences(prose)) {
    const k = norm(s).join(" ");
    seen.set(k, (seen.get(k) || 0) + 1);
  }
  const repeated = [...seen].filter(([, n]) => n > 1).map(([k]) => k);
  if (repeated.length) errors.push(`Repeats the same sentence more than once: "${repeated[0].slice(0, 80)}…".`);

  // Filler phrases.
  const low = prose.toLowerCase();
  const filler = FILLER.map((f) => [f, low.split(f).length - 1]).filter(([, n]) => n > 0);
  const fillerTotal = filler.reduce((a, [, n]) => a + n, 0);
  notes.push(`Filler phrases: ${fillerTotal} (limit 2).`);
  if (fillerTotal > 2) errors.push(`Too much generic filler (${filler.map(([f, n]) => `"${f}" x${n}`).join(", ")}). Replace with specifics for this use case.`);

  // External web plagiarism (optional service).
  const web = await webPlagiarism(prose);
  if (web.status === "fail") errors.push(web.error);
  notes.push(web.note ?? web.error);

  return { name: "3. Originality & plagiarism", status: errors.length ? "fail" : "pass", errors, notes, web: web.status };
}

// ---------- 5. On-page SEO audit (rendered HTML, i.e. what Google sees) ----------
export function onPageSeo({ html, path, keyword }) {
  const errors = [];
  const notes = [];
  const STOP = new Set(["best", "for", "the", "a", "an", "of", "to", "and", "in", "on", "with", "under", "top"]);
  const core = norm(keyword).filter((w) => !STOP.has(w) && !/^\d+$/.test(w));
  const hasAll = (text) => core.every((w) => norm(text).some((x) => x === w || x === `${w}s` || `${x}s` === w));
  const attr = (re) => (html.match(re) || [])[1] ?? "";
  const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
  const check = (ok, pass, fail) => { if (ok) notes.push(`✓ ${pass}`); else errors.push(fail); };

  // Title + meta description.
  const title = decode(attr(/<title>([^<]*)<\/title>/));
  check(title.length > 0 && title.length <= 60, `Title ${title.length} chars`, `Title is ${title.length} characters (max 60): "${title}".`);
  check(hasAll(title), "Keyword in title", `Title "${title}" is missing keyword words: ${core.join(", ")}.`);
  const firstCore = core.map((w) => title.toLowerCase().indexOf(w)).filter((i) => i >= 0);
  check(firstCore.length && Math.min(...firstCore) <= 25, "Keyword near the front of the title", `The keyword should appear near the start of the title (first 25 characters).`);
  const desc = decode(attr(/<meta name="description" content="([^"]*)"/));
  check(desc.length >= 120 && desc.length <= 160, `Meta description ${desc.length} chars`, `Meta description is ${desc.length} characters (want 120-160).`);

  // Canonical + Open Graph.
  const canonical = attr(/<link rel="canonical" href="([^"]*)"/);
  check(canonical === `https://ohmsavvy.com${path}`, "Canonical tag correct", `Canonical is "${canonical}", expected https://ohmsavvy.com${path}.`);
  for (const p of ["og:title", "og:description", "og:url", "og:image"]) {
    check(new RegExp(`<meta property="${p}" content="[^"]+"`).test(html), `${p} present`, `Missing Open Graph tag ${p}.`);
  }

  // URL slug.
  check(/^\/[a-z0-9-]+\/[a-z0-9-]+$/.test(path) && core.every((w) => path.includes(w.replace(/s$/, ""))), "Clean slug with keyword", `URL ${path} should be lowercase-hyphenated and contain: ${core.join(", ")}.`);

  // Headings: one H1 with the keyword; no skipped levels.
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
  const headings = [...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ level: Number(m[1]), text: m[2].replace(/<[^>]+>/g, "") }));
  const h1s = headings.filter((h) => h.level === 1);
  check(h1s.length === 1, "Exactly one H1", `Found ${h1s.length} H1 headings (need exactly 1).`);
  check(h1s[0] && hasAll(decode(h1s[0].text)), "Keyword in H1", `The H1 "${h1s[0]?.text}" is missing keyword words.`);
  let skipped = null;
  for (let i = 1; i < headings.length; i++) if (headings[i].level > headings[i - 1].level + 1) { skipped = headings[i]; break; }
  check(!skipped, `Heading order valid (${headings.length} headings)`, `Heading level skipped before "${skipped?.text}" (e.g. H2 → H4).`);

  // Keyword in the first 100 words of visible copy.
  const text = decode(main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " "));
  check(hasAll(text.split(/\s+/).filter(Boolean).slice(0, 100).join(" ")), "Keyword in first 100 words", `The keyword's words don't all appear in the first 100 words of the page.`);

  // Images, links, structured data.
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\balt="[^"]+"/.test(t) && !/\balt=""/.test(t));
  check(noAlt.length === 0, `${imgs.length} images with alt text`, `${noAlt.length} image(s) have no alt attribute.`);
  const internal = new Set([...main.matchAll(/href="(\/[a-z0-9-/#]*)"/g)].map((m) => m[1].split("#")[0]).filter((h) => h && h !== path));
  check(internal.size >= 5, `${internal.size} internal links`, `Only ${internal.size} distinct internal links (want 5+).`);
  const amazon = [...main.matchAll(/<a\b[^>]*href="https:\/\/www\.amazon\.com[^"]*"[^>]*>/g)].map((m) => m[0]);
  const unsponsored = amazon.filter((t) => !/rel="[^"]*sponsored/.test(t));
  check(amazon.length > 0 && unsponsored.length === 0, `${amazon.length} Amazon links, all rel="sponsored"`, amazon.length ? `${unsponsored.length} Amazon link(s) missing rel="sponsored".` : "No Amazon links found.");
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let types = [];
  try {
    types = ld.flatMap((s) => {
      const j = JSON.parse(s.replace(/\\u003c/g, "<"));
      return j["@graph"] ? j["@graph"].map((g) => g["@type"]) : [j["@type"]];
    }).flat().filter(Boolean);
  } catch { errors.push("A JSON-LD block is not valid JSON."); }
  check(types.includes("ItemList"), `Structured data: ${types.join(", ") || "none"}`, `No ItemList structured data found (found: ${types.join(", ") || "none"}).`);

  return { name: "5. On-page SEO audit", status: errors.length ? "fail" : "pass", errors, notes: [`${notes.length} checks passed.`], details: notes };
}

// ---------- 4. SEO & readability ----------

const syllables = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  return Math.max(1, (w.match(/[aeiouy]{1,2}/g) || []).length);
};

export function seoReadability({ d, keyword }) {
  const errors = [];
  const notes = [];
  const STOP = new Set(["best", "for", "the", "a", "an", "of", "to", "and", "in", "on", "with", "under", "top"]);
  const core = norm(keyword).filter((w) => !STOP.has(w) && !/^\d+$/.test(w));
  const has = (text, w) => norm(text).some((x) => x === w || x === `${w}s` || `${x}s` === w);

  const missingTitle = core.filter((w) => !has(d.title, w));
  if (missingTitle.length) errors.push(`Title should contain the keyword's main words; missing: ${missingTitle.join(", ")}.`);
  const missingH1 = core.filter((w) => !has(d.heroHeading, w));
  if (missingH1.length) errors.push(`The H1 (heroHeading) should contain: ${missingH1.join(", ")}.`);
  const opening = `${d.heroDescription} ${d.howWeChose}`;
  const missingOpen = core.filter((w) => !has(opening, w));
  if (missingOpen.length) errors.push(`Use the keyword's main words early (heroDescription/howWeChose); missing: ${missingOpen.join(", ")}.`);
  const missingMeta = core.filter((w) => !has(d.metaDescription, w));
  if (missingMeta.length) errors.push(`metaDescription should mention: ${missingMeta.join(", ")}.`);

  // Keyword stuffing: exact keyword phrase density.
  const prose = draftProse(d);
  const total = norm(prose).length;
  const phrase = norm(keyword).join(" ");
  const count = (norm(prose).join(" ").match(new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")) || []).length;
  const density = total ? (count * norm(keyword).length * 100) / total : 0;
  notes.push(`Exact keyword uses: ${count} (density ${density.toFixed(1)}%, limit 2.5%).`);
  if (density > 2.5) errors.push(`The exact phrase "${keyword}" is overused (${count} times). Use natural variations.`);

  // Readability: Flesch Reading Ease and sentence length.
  const sents = sentences(prose);
  const ws = prose.split(/\s+/).filter((w) => /[a-z]/i.test(w));
  const syl = ws.reduce((a, w) => a + syllables(w), 0);
  const asl = ws.length / Math.max(1, sents.length);
  const flesch = 206.835 - 1.015 * asl - 84.6 * (syl / Math.max(1, ws.length));
  notes.push(`Readability: Flesch ${flesch.toFixed(0)} (minimum 40), average sentence ${asl.toFixed(1)} words (maximum 24).`);
  if (flesch < 40) errors.push(`Too hard to read (Flesch ${flesch.toFixed(0)}). Use shorter sentences and plainer words.`);
  if (asl > 24) errors.push(`Sentences are too long on average (${asl.toFixed(1)} words). Split long sentences.`);
  const longOnes = sents.filter((s) => s.split(/\s+/).length > 40);
  if (longOnes.length) errors.push(`${longOnes.length} sentence(s) are over 40 words, e.g. "${longOnes[0].slice(0, 70)}…". Split them.`);

  return { name: "4. SEO & readability", status: errors.length ? "fail" : "pass", errors, notes };
}
