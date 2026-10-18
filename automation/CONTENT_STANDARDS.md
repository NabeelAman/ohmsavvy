# Content Standards — OhmSavvy Automation

This is the operating standard the n8n content pipeline (and anyone writing content
by hand) must follow. It exists because this site's only real differentiator is
"100% spec-verified, no fabrication" — breaking that is worse than publishing nothing.

## 1. Content writing criteria

- Voice: direct, specific, no filler ("game-changer," "must-have," "revolutionary").
  Match the existing `bottomLine`/`verdict` copy style already in the picks arrays.
- Never imply hands-on bench testing. The site is explicit (see `/about`) that this
  is desk-based research — cross-checked specs + patterns in verified-purchase
  reviews, not physical testing. Content must stay consistent with that disclosure.
- Every sentence that states a product-specific fact (a spec, a feature, a
  compatibility claim) must be traceable to one of:
  1. An existing verified `Pick` object already in the codebase (reuse, don't
     re-derive), or
  2. For a genuinely new product: the manufacturer's own datasheet/official site,
     or the product's official Amazon listing — never a competitor article, a
     reseller's marketing blurb, or an AI model's unverified prior knowledge.
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

Enforced by `automation/check-seo.mjs` where mechanically checkable, otherwise
a manual item for the human review step:

- [x] Unique `<title>`, ideally 40-60 characters, primary keyword near the front.
- [x] Unique meta description, 120-160 characters, includes the primary keyword.
- [x] Exactly one H1 per page, matching the page's search intent.
- [x] Primary keyword appears in: title, first ~100 words of body copy, and at
      least one H2/H3.
- [x] URL slug is lowercase, hyphenated, matches the keyword pattern already in
      use (`/category/best-x-for-y`).
- [x] Every `<img>` has descriptive, non-empty `alt` text (not just the bare
      product name where more context helps — e.g. "Fluke 117 digital
      multimeter" reads better than just "Fluke 117").
- [ ] Explicit canonical tag per page (`alternates.canonical` in the metadata
      export) — **currently missing site-wide**, should be added as part of
      this automation work rather than left as a gap.
- [ ] JSON-LD `Product`/`Review`/`AggregateRating` structured data on every
      review page — **currently missing site-wide**. This is the single
      highest-value addition available: it's what enables star ratings to show
      directly in Google search results for an affiliate review site, and none
      of the existing pages have it yet.
- [x] Page included in `sitemap.ts`.
- [x] `robots.txt` allows crawling (already in place).
- [x] No duplicate title/description across pages — real risk once many similar
      "best X for Y" pages exist; checked mechanically.
- [ ] No broken internal or outbound links — not yet automated, recommend adding
      once the page count grows past what's manually checkable.

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
