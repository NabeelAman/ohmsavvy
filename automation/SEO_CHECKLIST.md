# OhmSavvy On-Page SEO Checklist (2026), run for EVERY article

Owner's checklist for every page: reviews, comparisons, buying guides, use-case guides and informational articles.
Tick every box before publishing. **(auto)** means one of our scripts checks it. Run them all before pushing:
`npx eslint <files>`, `node automation/check-roster.mjs`, `check-seo.mjs`, `check-uniqueness.mjs`,
`check-internal-links.mjs`, an isolated `next build` + `check-h1.mjs`, then screenshots at 390 px and 1280 px.

Where this checklist and `CLAUDE.md` differ, **CLAUDE.md wins**. That includes the owner's informational standard:
answer first, at least 1,100 unique words, at least 5 FAQs, at least one chart and at least one SVG diagram.

---

## A. Every article (all page types)

### 1. Title and meta
- [ ] The title tag contains the primary keyword naturally, near the start, and matches the search intent.
- [ ] The title is unique across the site and **≤ 49 characters** (the site appends " | OhmSavvy"). **(auto: check-seo)**
- [ ] The meta description is unique, **120–160 characters**, accurate, and gives a reason to click. **(auto: check-seo)**
- [ ] The title and description describe what the page actually contains.

### 2. URL and canonical
- [ ] The slug is short, lowercase, hyphenated and follows the keyword, e.g. `/multimeters/fluke-87v-review`.
- [ ] `buildMetadata({ path: "/category/slug" })` uses the path as a **string literal**, so the canonical is correct. **(auto: check-seo)**
- [ ] The page has one URL with no duplicate or parameter variants. **Never change an established URL** to add keywords. If a URL truly has to change, add a redirect.

### 3. Headings
- [ ] Exactly **one H1**, which states the page topic and matches the title's intent. **(auto: check-h1, after build)**
- [ ] The H2/H3 headings are logical and descriptive, scan well, and aren't keyword-stuffed or generic.
- [ ] Use only the sections that add value. Don't force a template onto every page.

### 4. Content quality and search intent
- [ ] It answers the searcher's question or need. For informational pages, the answer comes in the first two sentences.
- [ ] It is useful and decision-oriented, with original analysis beyond competing pages. It isn't generic text reused from other pages. **(auto: check-uniqueness, under 15% shared 8-word phrases)**
- [ ] It covers the topic completely without padding or filler, and ends with a clear conclusion and next step.
- [ ] **Accuracy:** product facts come only from the maker's site, datasheet or manual, or the official Amazon listing. Conflicts are stated. Unpublished figures are marked "Not stated".
- [ ] **No invented testing, ratings or data.** Say "Hands-on Tested" only for `handsOnTested` Picks (4.8). Label example readings as illustrative.
- [ ] Verified specs, manufacturer claims, our analysis and real hands-on findings are clearly distinguished.
- [ ] US spelling, clean grammar, short paragraphs.

### 5. Keywords and semantic relevance
- [ ] The primary keyword appears naturally in the title, H1, intro, a few headings and alt text where it fits. There's no target density.
- [ ] It covers related entities (brands, model numbers, components, technical concepts) and long-tail questions.
- [ ] Model names and numbers are exact.
- [ ] **No cannibalization:** check `src/app/<category>/` for pages with the same intent. Give this page a distinct angle and link to its neighbors rather than repeating them.

### 6. Internal linking
- [ ] Contextual links to genuinely related pages, using descriptive anchor text and standard `next/link`.
- [ ] Category guide → reviews → comparisons → reviews: reviews link to their comparisons, and comparisons link back to both reviews.
- [ ] The page is registered in `src/lib/content.ts`, which puts it in the sitemap and ContentLinks, so it isn't orphaned. **(auto: check-internal-links)**
- [ ] No broken links. Every href exists on disk. **(auto: check-internal-links)**
- [ ] Links are there to help readers, not to hit a count.

### 7. Images
- [ ] Product photos come only from verified Picks: the maker's photo or the **exact-ASIN** Amazon listing photo. Never a photo showing a different model.
- [ ] Every image and SVG has accurate, descriptive alt text or `aria-label`, not the same keyword string on every image. **(auto: check-seo for `<img>` alt)**
- [ ] Captions are added where they add context. An Open Graph image is set (`image:` in `buildMetadata`) when the page has a product photo.
- [ ] Images go through `next/image`. Amazon images use `productImageSrc()` sizing via the existing components, and nothing is re-hosted.

### 8. Speed and Core Web Vitals (targets at the 75th percentile: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1)
- [ ] No new client components or heavy scripts without a reason. Pages are server components by default.
- [ ] No layout shift: images keep their dimensions, and charts and figures have a fixed aspect.
- [ ] No pop-ups or intrusive interruptions.
- [ ] After adding many pages or new components, spot-check Lighthouse (mobile) on a sample page.

### 9. Mobile and UX
- [ ] Screenshots at **390 px and 1280 px** show no horizontal overflow, readable tables, tappable buttons and visible product images.
- [ ] Comparison and spec tables are readable on a phone, with `DataTable` scrolling horizontally inside its own box.
- [ ] Text contrast is sufficient, and the main heading, verdict and calls to action are easy to find.

### 10. Structured data (handled by components; don't hand-add duplicates)
- [ ] Reviews use `ProductReview` (a single editorial Review, **never** an AggregateRating). Roundups and guides use `ReviewArticle` (an ItemList). Comparisons use `ProductComparison`. Breadcrumbs come from the components.
- [ ] Schema matches the visible content. There are no fabricated ratings or customer reviews.

### 11. Technical and indexability
- [ ] The page returns 200, is indexable (no stray `noindex`), and its canonical equals its URL and its sitemap entry.
- [ ] Title, description, canonical, H1, main content and links are in the **server-rendered HTML**. Check with `curl` on the live URL after deploy.
- [ ] After deploy: confirm the live URL returns 200, then **request indexing in Google Search Console** for important pages.

### 12. Affiliate and trust
- [ ] Every Amazon link is `https://www.amazon.com/dp/<ASIN>?tag=ohmsavvy-20` and points to the exact product. **(auto: check-roster for Pick names)**
- [ ] The product is **buyable on Amazon.com right now** (buy box or "See All Buying Options"), checked with a real browser at ZIP 10001. Unavailable Picks carry `unavailable: { note, alternative }`.
- [ ] No prices on pages, because they change. Don't present a discontinued product as available without saying so.
- [ ] The affiliate disclosure renders through the standard components.
- [ ] Recommendations explain **why** and **for whom**, including who should skip the product.

### 13. Conversion and structure
- [ ] A quick verdict or summary near the top, a summary or spec table, clearly placed pros and cons, and a clear buying recommendation.
- [ ] Buy buttons appear where they help the reader, with accurate labels ("Check price on Amazon").
- [ ] FAQs answer real search questions the body doesn't already answer. The owner's standard is at least 5 on informational pages.

---

## B. Extra checks by page type

### Product review (`ProductReview`)
- [ ] Verified spec table plus what each spec means for the buyer.
- [ ] Product-specific strengths, weaknesses and limitations. No generic text.
- [ ] Who should buy it, who should skip it, and relevant alternatives (linked).
- [ ] Methodology is honest: say "desk research against maker specs" unless the product is owner-tested.
- [ ] Links to its comparisons and the category roundup.

### Product comparison (`ProductComparison`)
- [ ] `path`, `published`, `extraSpecs` and `sections` are set. The model page is `src/app/multimeters/fluke-115-vs-klein-mm400/page.tsx`.
- [ ] Equivalent specs side by side. Real differences are explained and identical specs are called identical.
- [ ] At least one chart (`BarChart`/`DataTable`) and a "Which should you buy?" scenario table.
- [ ] Links to both reviews (`reviewHref`), the roundup and related comparisons.

### Buying guide and use-case Top 10 (`CategoryHero` + `ReviewArticle`)
- [ ] Ranked for **this** use case. A `fitNotes` entry for every pick, plus `howWeChose`, `advice`, a quick-comparison table and charts.
- [ ] The picks list is registered in `content.ts` in ranked order, and the page renders the expected number of items.
- [ ] Every pick is Amazon-available. Price-limited guides use only picks under the limit when checked.

### Informational, how-to, "why" and troubleshooting (`HowToShell`)
- [ ] Answer first, a causes table (symptom / cause / check / fix), numbered `StepHeading` steps.
- [ ] Facts and figures with the arithmetic shown, at least one chart, and at least one inline-SVG diagram (plus `MeterReadout`/`FlowDiagram` where they fit).
- [ ] A safety `Callout` where mains, high voltage, batteries or heat are involved, with escalation (electrician, installer, 911).
- [ ] `KeyIdea`, at least 5 FAQs, related links and a `ProductStrip` of suitable Picks.

---

## C. After publishing
- [ ] The live URL returns 200, and the page appears in `/sitemap.xml`.
- [ ] Request indexing in Search Console for priority pages.
- [ ] Later, in Search Console: impressions, clicks, queries and indexing status. Improve pages based on real data.

## Myths to ignore
There is no magic keyword density or word count, beyond the owner's 1,100-word floor for informational pages. Don't put exact-match keywords in every heading or add schema types that don't apply. A perfect PageSpeed score isn't required. Don't refresh dates without real updates or add links just to pad the count. Don't mass-produce similar AI pages. E-E-A-T is a quality framework, not a score, and being indexed doesn't mean ranking.
