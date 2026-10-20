# OhmSavvy — Project Status & Orientation

**Read this first if you're a new Claude Code session joining this repo.** Multiple sessions
often work here concurrently — see "Multi-session coordination" below before editing any
shared file.

## What this site is

OhmSavvy (ohmsavvy.com) is an Amazon-affiliate review/comparison site for electronics test
equipment: **multimeters, soldering irons, oscilloscopes**. Revenue is Amazon Associates
commissions (tag `ohmsavvy-20`). The entire editorial pitch is "honest, spec-verified
comparisons, no paid placements" — that promise is enforced mechanically, not just by
intention (see Content Standards below).

## Stack

- Next.js 16 (App Router, Turbopack), Tailwind v4, deployed to Vercel, GitHub repo
  `NabeelAman/ohmsavvy`, local path `C:\Users\user\ohmsavvy`, `main` branch auto-deploys.
- No database — all product data lives in `picks` arrays inside each category's roundup
  page (`src/app/{category}/best-*/page.tsx`), typed as `Pick[]` (see `ReviewArticle.tsx`).

## Content Standards (the non-negotiable part)

1. **No fabrication.** Every product spec must trace to the manufacturer's official site or
   the official Amazon listing — never a third-party review aggregator, forum, or YouTube
   review. `automation/check-roster.mjs` enforces that only products a human has verified
   (listed in `automation/content-queue.json`'s `verifiedRoster`) can appear in a picks array.
2. **No invented test results.** A product only gets `handsOnTested: true` once the owner has
   actually bought and tested it — and even then, copy may describe *that testing happened*,
   never specific measurements or sensory findings that weren't actually reported. Rule:
   **every 4.8-rated pick is hands-on tested by the owner** — confirm with the user before
   setting the flag on a new 4.8 pick.
3. **Product photos are visually verified, not filename-trusted.** Sibling models share
   chassis/photos (a real incident: Hantek DSO2D15 vs DSO2D10; a real near-miss: YIHUA
   862BD+ vs 862BD++, caught by downloading and reading the printed model number before use).
   Download and look at any new product image before adding it.
4. **Content must be unique, not templated.** `automation/check-uniqueness.mjs` compares every
   page's own editorial prose against every other page for copy-pasted phrasing (not just
   duplicate titles — reworded-but-structurally-identical FAQs count too, and have been caught
   and fixed before).
5. **Every page targets 800–1500 words**, verified by live rendered word count (not source
   literals — shared components like `ProductReview`/`ProductComparison` render text that
   isn't in the page's own source). FAQ/assessment text sits inside collapsed `<details>`,
   so use `textContent`, not `innerText`, when counting.
6. **Every article needs a real visual** — a verified product photo and/or an original
   diagram/chart/table. No page should be pure prose. Diagrams are hand-built inline SVG
   (the project doesn't use an icon library; see `ThemeToggle.tsx`/`Callout` patterns).

## QA scripts (run before every commit that touches content)

| Script | Checks |
|---|---|
| `check-roster.mjs` | Only verified products appear in picks arrays |
| `check-seo.mjs` | Title/description length & uniqueness, canonical tag, alt text (only scans files with literal `export const metadata` — **does not see** `generateMetadata`-based dynamic pages, e.g. the i18n pilot) |
| `check-internal-links.mjs` | No orphan pages, every page in the sitemap |
| `check-uniqueness.mjs` | No copy-pasted editorial prose between pages |
| `check-h1.mjs` | Exactly one `<h1>` per rendered page — **requires a build first** (`npm run build`) |
| `check-cannibalization.mjs` | Flags queued automation keywords targeting near-identical products |
| `check-images.mjs` | Image sanity checks |

**Isolated build pattern** (so you can verify your own work without colliding with a
concurrent session's build): copy the repo to a `zz-*`-prefixed directory (not `.tmp-*` —
that's gitignored and breaks Turbopack's `next/font` resolution), symlink `node_modules`,
build there.
```
mkdir -p zz-check && tar --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='.tmp-*' --exclude='zz-*' --exclude='package-lock.json' -cf - . | (cd zz-check && tar -xf -) && ln -s "$(pwd)/node_modules" zz-check/node_modules && cd zz-check && npx next build
```

## Site structure

- `src/lib/content.ts` — the registry. Every guide/review/comparison is one entry here
  (`category`, `type`, `title`, `description`, `href`). Drives `sitemap.ts` and the
  `<ContentLinks>` cross-link sections automatically — add an entry once, the page is linked
  from somewhere and in the sitemap, no manual wiring.
- `ContentType` values: `use-case-guide`, `buying-guide`, `how-to-guide`, `review`, `comparison`.
- Shared templates: `ReviewArticle.tsx` (category roundup), `ProductReview.tsx` (single
  product), `ProductComparison.tsx` (head-to-head), `CategoryListing.tsx` (reviews/comparisons
  index pages), `HowTo.tsx` (how-to guide shell — Callout/StepHeading/diagram primitives).
- `src/lib/catalog.ts` — resolves a registry entry to its actual verified `Pick[]`.
- `automation/content-queue.json` — the verified-product roster, plus a keyword queue for the
  local Ollama article-writer pipeline (`automation/ollama/`, `npm run article*`).

## Current inventory (check `node automation/check-internal-links.mjs` output for the live count)

- 3 categories × Top 10 roundup page each.
- 20 individual product reviews, 12 head-to-head comparisons, 9 use-case guides, 4 buying
  guides, 14 how-to/explainer guides (4 multimeter, 10 oscilloscope).
- 20 verified products across multimeters/soldering-irons/oscilloscopes.
- Pilot i18n: homepage + Fluke 117 review translated into German/French/Italian/Spanish at
  `/de`, `/fr`, `/it`, `/es` — the 4 languages where the existing Amazon tag already earns via
  OneLink "Earn Globally" with zero extra account setup. **Not a full-site translation** —
  the other ~70 pages are English-only so far. `src/lib/i18n.ts`'s `TRANSLATED_PATHS` lists
  which paths have a translation; the header's globe-icon `LanguageSwitcher` only shows on
  those paths.

## Recently shipped (chronological, most recent first)

- Globe-icon language switcher in the header (mirrors nabeelaman.com's UX, rebuilt with this
  project's own inline-SVG icon style instead of adding `lucide-react`).
- i18n pilot (above).
- Homepage redesign (`fa09df1`) + 10 new oscilloscope how-to/explainer guides with a shared
  `HowTo.tsx` shell.
- Dark/light theme toggle (`ThemeToggle.tsx`) — `globals.css` already had a complete
  light/dark/`prefers-color-scheme` token system with no UI control wired up to it.
- Bing IndexNow auto-submission on every production Vercel deploy (`automation/submit-indexnow.mjs`,
  wired as the npm `postbuild` script, gated to `VERCEL_ENV=production` only so it doesn't fire
  on every local/isolated verification build).
- Added YIHUA 862BD+ (2-in-1 soldering/hot-air station) as a verified pick + review + Weller
  comparison — caught a real sibling-model photo mixup (862BD+ vs 862BD++) before publishing.
- `check-uniqueness.mjs` added; found and fixed the only real violation on the site (6
  category-listing pages sharing a templated intro with just the category name swapped).
- All 28 original review/comparison pages expanded to 800+ words with unique content;
  diagrams/tables added to the 4 buying guides.
- Sitewide `WebSite`/`Organization` schema, trimmed homepage title/description.
- Local Ollama article-writer pipeline (`automation/ollama/`) with 6 automated QA checkpoints,
  now running and publishing new use-case guides on approval.

## Multi-session coordination (read before editing any shared file)

Shared/high-risk files: `src/lib/content.ts`, `automation/content-queue.json`,
`next.config.ts` (image host allowlist), `src/app/sitemap.ts`, `src/components/Nav.tsx`,
`src/components/SiteHeader.tsx`, any shared template component.

Protocol that's worked all session:
1. `git pull --ff-only` before starting, and again right before you actually write to a
   shared file.
2. Message other active sessions (`ListAgents` to find them) before touching a shared file —
   say what you're about to change and ask if they have uncommitted work there.
3. Stage **only the files you changed** — never `git add -A` — so a peer's uncommitted work
   never gets swept into your commit.
4. Verify (tsc, eslint, the relevant QA scripts, an isolated build) before committing.
5. Push promptly and ping whoever you coordinated with, so their own publish/commit isn't
   blocked waiting on your uncommitted changes.
6. If a peer flags a content-accuracy problem in something you published (has happened twice:
   an invented lab-testing claim, an unsourced third-party review claim) — fix it immediately,
   don't argue the standard, and verify the fix the same way as any other change.

## Known gaps / natural next steps

- i18n: only 2 pages translated. `check-seo.mjs` can't see `generateMetadata`-based pages
  (verify SEO properties manually for any new translated page until that script is extended).
- No separate Amazon Associates account exists yet for languages/markets outside the OneLink
  6 (Canada/UK/Spain/Germany/France/Italy) — don't translate into e.g. Arabic/Japanese
  expecting it to earn commission without that account first.
- Default theme is light (deliberately — Amazon itself has no dark mode, product photos are
  shot on white backgrounds); dark only activates via the visitor's own OS preference or the
  header toggle.
