# Content Standards — OhmSavvy Automation

This is the operating standard the n8n content pipeline (and anyone writing content
by hand) must follow. It exists because this site's only real differentiator is
"100% spec-verified, no fabrication" — breaking that is worse than publishing nothing.

## 1. Content writing criteria

- Voice: direct, specific, no filler ("game-changer," "must-have," "revolutionary").
  Match the existing `bottomLine`/`verdict` copy style already in the picks arrays.
- Never imply hands-on bench testing for a product that hasn't been tested. Most
  picks are desk-based research (cross-checked specs + patterns in verified-purchase
  reviews); only picks with `handsOnTested: true` were bought and tested by the
  site owner, and only those may be described as tested.
- **4.8-rated picks are hands-on tested (owner's standing rule, 2026-10-19).** The
  owner buys and tests every product rated 4.8. Currently tested: Fluke 117,
  Fluke 87V, Hakko FX888D, Rigol DS1054Z. When a new 4.8-rated pick is added,
  confirm with the owner that its testing is complete, then set
  `handsOnTested: true` on its Pick (the badge, review status and research notes
  update automatically). Don't set it before testing is done. Even for tested
  picks, never invent test results or measurements; only the owner's actual
  findings may be published.
- Every sentence that states a product-specific fact (a spec, a feature, a
  compatibility claim) must be traceable to one of exactly two sources, with no
  exceptions:
  1. **The brand's own official website** (e.g. fluke.com, kleintools.com,
     rigolna.com — the manufacturer's own datasheet or official product page), or
  2. **The product's official Amazon listing** (the manufacturer-owned or
     manufacturer-authorized listing itself, not a third-party seller's
     description layered on top of it).
  Never a reseller/retailer's own marketing copy, a competitor review site, a
  forum post, a YouTube review, or an AI model's unverified prior knowledge —
  even when those sources happen to state the same fact correctly, they aren't
  the source of record and can silently carry someone else's error.
  An existing verified `Pick` object already in the codebase counts as already
  satisfying this rule (it was sourced this way when first researched) — reuse
  it rather than re-deriving the same fact from scratch.
- If a spec is ambiguous or conflicts across sources, say so in the text rather
  than silently picking one (established pattern — see the Extech EX330 "Auto-
  ranging (not True RMS)" framing and the Hantek DSO2000 memory-depth discrepancy
  noted during research).
- `educational` content (how-to, concept explainers, troubleshooting) may use
  well-established, non-disputed engineering facts without per-instance citation
  (e.g. IEC 61010 CAT ratings, the True RMS definition, the 3-5x bandwidth rule
  of thumb) — these aren't proprietary or contested claims.
- Never fabricate review counts, testimonials, star-rating sources, "as seen in,"
  or award badges.
- Review structure template for every picks-based page: open with the specific
  problem the product/category solves and who it's for; answer the reader's core
  question directly ("is this worth it for someone in my situation?"); state
  limitations and who a pick is a poor fit for (specific fit signals beat generic
  praise); give comparison context against the realistic alternatives; close with
  a recommendation tied to a defined buyer profile. Avoid thin reviews that only
  list features with no judgment attached.
- Author byline stays "OhmSavvy Research Team," not a fabricated individual bio —
  this is a deliberate trade-off against typical E-E-A-T advice (a named author
  with credentials usually helps). The site's standing policy (`/about`) is to
  never publish a credential that isn't genuinely true, and no individual author
  is actually behind this content, so a fabricated byline would violate the
  no-fabrication rule this entire standard exists to enforce.

## 2. Product data and figures

- `remix`-type pages pull 100% of product facts from the existing `Pick` objects
  exported by the category's main article — no new numbers get introduced.
- `new-product`-type keywords are never auto-drafted. They're routed to a human
  research queue. A product only enters `automation/content-queue.json`'s
  `verifiedRoster` (and only then becomes eligible for `remix` content) after a
  human has checked its specs against a manufacturer source — enforced
  mechanically by `automation/check-roster.mjs` in CI.
- Price-tier keywords ("best X under $50") never state a hard dollar figure in
  prose — prices fluctuate on Amazon; frame qualitatively ("budget tier") and let
  the live Amazon link show the actual current price.

## 3. Product images

- `remix` pages reuse the `image` field already on the verified `Pick` — never
  re-source an image for a product that already has one.
- A brand-new image is never auto-added by automation. The required process
  (demonstrated repeatedly this build: Hantek DSO2D15 mislabeled as DSO2D10,
  a Fluke lifestyle photo rejected for a studio shot, a Southwire line-art
  diagram caught and rejected) is: download the candidate, visually inspect it
  (confirm on-device model text/branding matches exactly, reject shared
  sibling-chassis photos that can't be told apart), then confirm it actually
  renders cross-origin in a real browser — not just via `curl` — before use.
- If no image can be verified this way, leave the `image` field absent. The
  existing "Photo pending manufacturer confirmation" placeholder is correct
  behavior, not a bug to work around.
- `automation/check-images.mjs` (wired into CI) is the mechanical backstop: it
  loads every image URL in a headless browser and fails the build if any image
  doesn't actually render — this is what would have caught the Rigol
  DS1054Z/Core Electronics cross-origin block before it ever shipped.

## 4. Plagiarism check

- Every drafted article body runs through Originality.ai before a PR opens.
- Fail threshold: reject (send back for rewrite, don't open the PR) if any
  single external source match exceeds 15%, or overall plagiarism score falls
  below 90% original.
- The report (score + flagged matches) gets attached to the PR description so
  the human reviewer sees it without re-running the check.

## 5. QA process

Two layers, both required before merge:

**Editorial QA (AI pass, before PR opens)** — a second model call re-reads the
draft against the source `Pick` data and flags:
- Any number, spec, or product name in the prose that doesn't match the
  underlying data exactly.
- Any unqualified superlative ("the best," "guaranteed," "#1") not backed by
  the comparison actually shown.
- Any implied hands-on testing language.
- Tone/style drift from the rest of the site.

**Technical QA (GitHub Actions, automatic on every PR)**:
1. `npm run build` — must succeed.
2. `npm run lint` — must pass clean.
3. `automation/check-images.mjs` — every image renders in a real browser.
4. `automation/check-roster.mjs` — no unverified product sneaks into a picks array.
5. `automation/check-internal-links.mjs` — no orphan pages (see §6).
6. `automation/check-seo.mjs` — on-page SEO baseline (see §7).

A human merges the PR only after all of the above are green — this repo's
branch should have required status checks turned on for `main` once the
`workflow`-scope push issue is resolved.

## 6. Internal linking

- Every new page must link back to its parent category's main article (the
  "See the Full Top 10" pattern already used on the 3 existing guide pages).
- Every new page must be added to `src/app/sitemap.ts`.
- Every new page must get at least one inbound link from somewhere already
  crawled — either the parent article's "Shop by use case" section, the
  homepage's "More guides" section, or another related guide page. A page with
  zero inbound internal links is effectively invisible to both users and
  crawlers, however good the content is.
- `automation/check-internal-links.mjs` builds the full internal link graph
  from every `page.tsx` + the sitemap and fails CI if any sitemap route has no
  inbound link from another page.

## 7. On-page SEO checklist

Every factor below, what the actual rule is, and exactly what enforces it —
a mechanical script (runs in CI, fails the build), the Gemini QA pass (runs
per-draft before a PR opens), or human review (not yet automatable).

| # | Factor | Rule | Enforced by |
|---|--------|------|-------------|
| 1 | Title tag length | The rendered `<title>` is the page's `title` field **plus 11 characters** (" \| OhmSavvy", from the root layout's template) — the field itself must be ≤49 chars so the rendered total stays ≤60. | `check-seo.mjs` (mechanical) + Gemini QA |
| 2 | Title redundancy | Title field must never contain the word "OhmSavvy" — the template already appends it; including it renders as "X OhmSavvy \| OhmSavvy". | `check-seo.mjs` (mechanical) |
| 3 | Title uniqueness | No two pages share an identical title. | `check-seo.mjs` (mechanical) |
| 4 | Title keyword placement | The primary keyword (or an exact-meaning variant) appears in the title, ideally near the front. | Gemini QA |
| 5 | Meta description length | 120-160 characters. | `check-seo.mjs` (mechanical: flags >165 or <50) + Gemini QA (flags the 120-160 sweet spot) |
| 6 | Meta description uniqueness | No two pages share an identical description. | `check-seo.mjs` (mechanical) |
| 7 | Meta description keyword | Primary keyword appears naturally in the description. | Gemini QA |
| 8 | Exactly one H1 | One heading per page, matching the page's search intent: never zero, never stacked H1s. | `check-h1.mjs` (mechanical: counts `<h1>` in every rendered page; run after `npm run build`. Added to the local content-qa.yml, which is gitignored until the repo has workflow-scope push) |
| 9 | Keyword in first ~100 words | Primary keyword or natural variant appears early in visible body copy (checked via the `CategoryHero` description prop). | Gemini QA |
| 10 | Content length / depth | Avoid thin pages — a `remix` guide page should carry genuine distinguishing content (the per-pick verdicts inherited from `ReviewArticle` already provide this; a near-empty custom page with just a product list and no framing is too thin). | Gemini QA (flags if the custom copy — `CategoryHero` description + FAQs — reads as a bare stub with no real framing) |
| 11 | Keyword stuffing | Keyword phrase must not be repeated unnaturally — flagged as actively harmful to rankings, not just wasteful. | Gemini QA |
| 12 | URL slug | Lowercase, hyphenated, matches the established pattern (`/category/best-x-for-y`). | Drafting prompt generates it this way; Gemini QA spot-checks |
| 13 | Image alt text | Every `<img>` has non-empty, descriptive `alt` text. | `check-seo.mjs` (mechanical) |
| 14 | Canonical tag | `alternates.canonical` present on every page, matching its real path. | `check-seo.mjs` (mechanical) — **fixed site-wide**, was previously missing on all 9 pages |
| 15 | Structured data | JSON-LD `Product` + `Review` per pick, on every review page — enables star ratings in search results. Uses a single editorial `Review`, never a fabricated `AggregateRating` (that would misrepresent one rating as an aggregate of many). | Built into `ReviewArticle.tsx` — **fixed site-wide**, was previously missing |
| 16 | Sitemap inclusion | Every page is listed in `sitemap.ts`. | `check-internal-links.mjs` (mechanical — also catches a page existing but never added to the sitemap at all) |
| 17 | Internal linking (no orphans) | Every page gets at least one inbound link from somewhere already crawled. | `check-internal-links.mjs` (mechanical) |
| 18 | `robots.txt` crawlability | Crawlers allowed, sitemap referenced. | Already in place, static |
| 19 | Keyword cannibalization | Two pages shouldn't target near-identical intent with near-identical product sets. | `check-cannibalization.mjs` (advisory, non-blocking — flags for human merge decision) |
| 20 | FAQ relevance | Exactly 2 FAQs per `remix` page, genuinely specific to that page's keyword/framing — not generic copy-paste FAQs that could sit on any page in the category. | Gemini QA |
| 21 | Affiliate disclosure | Present near the top of the article, next to where affiliate links start, not just in the site-wide footer. | Built into `ReviewArticle.tsx` — **fixed site-wide** |
| 22 | Broken links | No internal or outbound link returns an error. | Not yet automated — recommend adding once page count grows past what's manually spot-checkable |

Items 14, 15, and 21 were real, pre-existing gaps found and fixed during this
automation build (not something newly introduced) — see the git history for
the commit that added canonical tags, JSON-LD, and the disclosure line.

The two unchecked items (canonical tags, Review schema) are real, pre-existing
gaps on the live site, not something introduced by this automation — worth
fixing on the current pages too, not just new ones.

## 8. External guidance reviewed, and one open decision for you

Checked two external sources on affiliate-SEO practice, cross-referenced against
the actual site. (A third, a third-party blog, returned HTTP 403 and wasn't
retrievable; a fourth, a 2015 "99 ranking factors" Scribd listicle, returned no
usable content and would be unreliable even if it had — SEO ranking signals have
shifted substantially since 2015, so it wasn't treated as a source.)

Both retrievable sources (Digistore24, PostAffiliatePro) independently say the
same thing on the point that matters most here: **genuine hands-on product
testing is treated as both a ranking signal and a trust signal** — "use the
product yourself," "real experience," specific author credentials.

This site currently does the opposite on purpose: `/about` explicitly discloses
this is desk-based research, not hands-on testing, and that no individual author
bios are published unless genuinely true. That's not an oversight — it's the
accuracy standard this whole document exists to protect, and automated content
can't manufacture genuine hands-on experience without actually lying about it.

So this is a real strategic choice, not something to quietly resolve either
way: stay fully honest about desk-based research (current approach, accepts an
SEO/trust disadvantage against sites that do test hands-on) ​— or actually start
buying and testing a subset of top picks, which is a real operational cost
(money, time, storage) but would let future content honestly claim hands-on
experience. Flagging this rather than deciding it, since it's a business
decision, not a content-pipeline detail.

Two mechanically-fixable gaps surfaced along the way, independent of that
decision:
- No affiliate disclosure appears near the top of each review article or next
  to the affiliate links themselves — only in the site-wide footer and `/about`.
  Both sources flag prominent, near-the-link disclosure as a ranking-adjacent
  trust signal, and FTC Endorsement Guide practice favors disclosure that's
  "clear and conspicuous" at the point of the link, not just in a global
  footer. Recommend adding a one-line disclosure near the top of
  `ReviewArticle` itself.
- Keyword cannibalization risk: several of the 200 queued keywords target
  near-identical intent (e.g. "best multimeter for diy" / "for beginners" /
  "for home use"). Per both sources, one keyword should map to one primary
  page. `automation/content-queue.json` entries with overlapping `targetPicks`
  and near-duplicate framing should be merged into a single page rather than
  published as separate near-duplicates — worth a dedup pass on the queue
  before the pipeline starts publishing from it.
