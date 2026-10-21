# Local article writer (Ollama + n8n)

Drafts a new **use-case buying guide** on your laptop with a local AI model (Ollama), using only the site's verified
product data. Every draft goes through 5 QA checkpoints, then you review a preview and choose Publish or Discard.

## Daily automatic article (no review)

Windows Task Scheduler runs **"OhmSavvy daily article"** at 6:00 every morning (it wakes the laptop; a missed run
starts when the laptop is next on). It runs `automation/ollama/daily-article.ps1`, which starts Ollama if needed and
runs `node automation/ollama/article.mjs --next --auto`:

- Every checkpoint passes → published straight away (git push, live in ~2 minutes), before the 9:00 Facebook slot.
- Any checkpoint fails → the draft is discarded and nothing is published. A keyword that fails twice is skipped
  (counts in `automation/ollama/.tmp-auto-failures.json`; delete an entry to retry it).
- A manual draft waiting for your review is never touched; that day's run just skips.
- If another session has uncommitted edits in `src/lib/content.ts` or the queue, publishing waits (checks every 10 minutes for up to 2 hours) instead of discarding. Pushes from other sessions in the meantime are pulled in safely.
- Log: `automation/ollama/.tmp-daily.log`. Pause: disable the task in Task Scheduler.

This skips the human review step (owner's decision, 2026-10-21), so the checks are the only gate. It only writes
`remix` buying guides from verified products. Reviews of new products and how-to guides aren't auto-drafted.

## The easy way: the n8n form

1. Make sure **Docker Desktop** and the **Ollama** app are running.
2. Start the writer service in a terminal (leave it open): `npm run article:service`
3. Open **http://localhost:5678/form/ohmsavvy-write-article**, type a keyword (or leave it blank for the next one in
   the queue), and click **Write article**.
4. Keep the tab open. After about 10–25 minutes it shows the **review page**: a preview link, the QA report, and a
   Publish / Discard choice.

The n8n editor is at http://localhost:5678. The first time, it asks you to create an owner account (local only).
The workflow is **"OhmSavvy: write an article (local Ollama)"**. Its source is
`automation/n8n/build-writer-workflow.mjs`.

## QA checkpoints (every draft, automatically)

| # | Checkpoint | Fails the draft when… |
|---|---|---|
| 1 | Fact-check | Any number or model isn't in the verified data; any price, testing claim, hype word, or Amazon-review mention; text copied from product copy; lengths are off |
| 2 | AI claim audit (Ollama, separate auditor pass) | Any product claim isn't supported by that product's data, including implying all products share a feature |
| 2b | Gemini independent audit (free tier) | Gemini, a different vendor's model, flags unsupported claims, testing language, prices, hype, stuffing or unsafe advice. Set `GEMINI_API_KEY` (free key from aistudio.google.com) or it shows "skipped" |
| 3 | Originality & plagiarism | Over 5% overlap with existing site pages, repeated sentences, too much filler. **Web plagiarism** runs via Copyscape when `COPYSCAPE_USER` + `COPYSCAPE_KEY` are set (fails above 15% match with any source) |
| 4 | SEO & readability | Keyword missing from the title, H1, opening or meta description; keyword stuffing (over 2.5%); Flesch reading ease under 40; long sentences |
| 5 | Site build checks | Roster, SEO, links, lint, types, exactly one H1, and at least 800 words on the rendered page |
| ✋ | You | Read the preview and the QA report, then publish or discard |

A draft failing checkpoints 1–4 goes back to Ollama with the exact problems (up to 5 attempts). Nothing is written to
the site until it passes all of them.

To set the optional keys, run these before `npm run article:service` (PowerShell):
```
$env:GEMINI_API_KEY = "..."
$env:COPYSCAPE_USER = "..."; $env:COPYSCAPE_KEY = "..."
```

## Terminal commands (same tool, without n8n)

1. Make sure the **Ollama** app is running, with the model installed (`ollama pull qwen2.5:14b`, done once).
2. Open a terminal in `C:\Users\user\ohmsavvy` and run one of these:

| Command | What it does |
|---|---|
| `npm run article:list` | Shows the keywords ready to write (each with its verified products already chosen) |
| `npm run article -- --next` | Writes the next keyword in the queue |
| `npm run article -- "best multimeter for HVAC technicians"` | Writes a specific keyword from the queue |
| `npm run article:publish` | Pushes the waiting draft live (Vercel deploys in ~2 minutes) |
| `npm run article:discard` | Deletes the waiting draft and puts the keyword back in the queue |

Drafting takes about **10–20 minutes** on this laptop (CPU only), and can take longer if the fact-checker sends a
draft back for fixes. When it finishes, it prints a **preview link**. Read the article, then type `publish` or
`discard` at the prompt (or run the commands above later).

A keyword that isn't in the queue needs its category and verified products:

```
npm run article -- "best multimeter for boats" --category multimeters --picks "Southwire 14070T,Fluke 117"
```

## What it guarantees, and what it doesn't

**Checked automatically.** A draft that fails any of these is sent back to the model with the errors, up to 4 times,
and nothing is written if it never passes:

- Products come only from the verified roster, and no other product, brand or model number is mentioned.
- Every number must exist in the verified product data (or the keyword).
- No prices, no "Amazon/customer reviews", no hype words.
- No testing or first-hand claims ("we tested", "hands-on", "we found"…). The Hands-on Tested badge comes from the
  data, never from AI-written text.
- No 10-word runs copied from existing product copy (duplicate content).
- Lengths, 4 unique FAQs, one "why it fits" note per product, and a title and description not already used by another
  page.
- Then the normal site checks: roster, SEO, internal links, lint, types, and exactly one H1.

**Not caught by any check, which is why you read the preview:** generic or repetitive wording, advice that is
technically true but too vague, and overstatements such as implying every product has a feature only one of them
has. If anything reads wrong, discard and run it again, or fix the text in the page file before publishing.

**Never automated:** keywords that need a *new* product (`new-product` in the queue). Those need real research
first: specs from the manufacturer, a verified photo, and the ASIN.

## After publishing

The page is added to the content registry, so it appears automatically in the sitemap, the menus, the category
pages, `feed.json`, and the Facebook autoposter's queue.

## Settings

- `OLLAMA_MODEL`: which model to use (default `qwen2.5:14b`), e.g. `set OLLAMA_MODEL=llama3.1:8b` before running.
- `OLLAMA_URL`: default `http://localhost:11434`.
