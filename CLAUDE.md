# OhmSavvy: rules for Claude sessions

Read `PROJECT-STATUS.md`, `AGENTS.md` and `automation/CONTENT_STANDARDS.md` first. The rules below are the owner's standing instructions and override defaults.

## Products and facts
- **Only write about products that are buyable on Amazon.com right now** (a buy box or "See All Buying Options" offers on the exact ASIN). "Currently unavailable" means don't write it, don't add it as a Pick and don't build a comparison around it. Discontinued-by-maker is fine only if Amazon still sells it, and the page must say it's discontinued.
- Check availability with a real browser: WebFetch and curl can't see Amazon's buy box. Use Playwright with installed Chrome (`channel: "chrome"`), set the delivery ZIP to 10001 first (Amazon otherwise shows "cannot be shipped" to the UAE), then read `#availability`, `#add-to-cart-button` and `#buybox`.
- When an existing Pick goes unavailable, don't delete or rename it (pages look it up by name). Set `unavailable: { note, alternative }` on the Pick: the roundup drops it from the ranking, review and comparison pages show a notice and send buy buttons to the alternative, and how-to product cards hide the buy button. Then swap it for the alternative wherever it's recommended. Examples: Hakko FX888D → FX-888DX, Southwire 14070T → Fluke 179 (2026-10-23).
- Every product fact must come from the maker's own site/datasheet/manual or the official Amazon listing. Never reviews, forums, retailer copy or memory. If sources conflict, say so on the page; if a fact isn't published, write "Not stated".
- Add a `// Specs per <source>` comment above any Pick you add or correct. Never rename a Pick or change its `image`: many pages look Picks up by exact name.
- Photos: download and look at every new image and read the model printed on the device before using it. Amazon listing main photos are allowed only for the exact ASIN in `ctaHref`.
- Every `ctaHref` carries `tag=ohmsavvy-20`.

## Ratings
- `rating` is OhmSavvy's editorial score, not Amazon's star average.
- **4.8 is reserved for products the owner has bought and hands-on tested** (`handsOnTested: true`). Tested as of 2026-10-24: Fluke 117, Fluke 115, Fluke 87V, Hakko FX888D, Rigol DS1054Z, Siglent SDS1104X-E, Rigol DHO804. Rate everything else 4.7 or lower until the owner confirms testing. Never invent test results.

## Pages and SEO
- URL slug, H1 and metadata title follow the target keyword. The title field is at most 49 characters and the description 120–160 characters.
- In `buildMetadata` write the path as a string literal (`path: "/category/slug"`); `check-seo.mjs` doesn't recognise the `path,` shorthand.
- Comparison pages use `ProductComparison` with `path`, `published`, `extraSpecs` and `sections` (charts from `@/components/HowTo`); model page: `src/app/multimeters/fluke-115-vs-klein-mm400/page.tsx`.
- Before pushing: `npm run lint` on changed files, `check-roster`, `check-seo`, `check-uniqueness`, `check-internal-links`, an isolated `next build` (a `zz-*` copy) plus `check-h1`, and screenshots at 390px and 1280px with no horizontal overflow.

## Informational content (how-to, "why", explainer, troubleshooting) — owner's standard, 2026-10-25
Every informational article must fully solve the reader's problem, not just describe it:
- **Answer first.** The first two sentences answer the title's question directly.
- **Pain points → solutions.** Name the reader's actual problem(s) and give a concrete fix for each: a causes table (symptom / likely cause / how to check / fix or who to call) plus numbered step-by-step instructions (`StepHeading`).
- **Facts and figures.** Use real numbers wherever they help: typical values, ranges, thresholds, worked examples with the arithmetic shown. Standard engineering values must be standard and hedged; product numbers only from Picks or the maker; label illustrative readings as illustrative. Never invent data or test results.
- **Charts.** At least one chart (`BarChart`, `DataTable`, comparison table) built on the numbers in the article.
- **Diagrams.** At least one inline-SVG diagram in a `Figure` (circuit, flow, signal, wiring, timeline) that explains the mechanism, plus `MeterReadout`/`ScopeScreen`/`FlowDiagram` where they fit.
- **Images.** Product photos only from verified Picks (exact-ASIN Amazon photo or maker photo); everything else is an SVG diagram. Every image and diagram gets descriptive alt text / `aria-label`.
- **Everything else on every page:** `KeyIdea`, a safety `Callout` where mains, high voltage, batteries or heat are involved (escalate to an electrician/installer/911 as appropriate), 5+ FAQs (40–80 words, real search questions), links to related pages on disk, and a `ProductStrip` of suitable Picks with Amazon links (`tag=ohmsavvy-20`).
- **Depth and uniqueness.** At least 1,100 words of page-specific prose; check neighbors on disk and give the page a distinct angle (link, don't repeat); `check-uniqueness` must pass. US spelling.

## Working alongside other sessions
- Several sessions edit this repo at once. Announce edits to shared files (`src/lib/content.ts`, `automation/content-queue.json`, the three `best-*` roundup pages, `src/components/*`) before making them.
- Commit only your own files: `git commit -- <paths>`, or a temporary index built from HEAD. A temp-index commit leaves the shared working tree and index behind HEAD, so afterwards sync your touched files (`git add`, or `git checkout HEAD -- <file>` if it has no uncommitted work) so nobody's next commit silently reverts yours.
- Don't leave `content.ts` or `content-queue.json` dirty for long: the 06:00 daily auto-writer waits for them and discards its article if they stay dirty.
