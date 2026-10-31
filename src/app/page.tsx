import Image from "next/image";
import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { GuideCard } from "@/components/GuideCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HeroSearch } from "@/components/HeroSearch";
import { HeroTrace } from "@/components/home/HeroTrace";
import { ProofBar } from "@/components/home/ProofBar";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { content, type Category, type ContentEntry } from "@/lib/content";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import { picks as multimeterPicks } from "./multimeters/best-multimeters/page";
import { picks as solderingIronPicks } from "./soldering-irons/best-soldering-irons/page";
import { picks as oscilloscopePicks } from "./oscilloscopes/best-beginner-oscilloscopes/page";
import { localeAlternates } from "@/lib/i18n";
import lastModJson from "@/lib/sitemap-lastmod.json";

// Return hreflang links to the translated homepages (they already point here); without them Google ignores the set.
export const metadata = { alternates: { canonical: "/", languages: localeAlternates("/") } };

type Tone = { text: string; bg: string; border: string; soft: string };

const CATEGORIES: {
  category: Category;
  label: string;
  noun: string;
  roundup: { href: string; title: string };
  blurb: string;
  picks: typeof multimeterPicks;
  /**
   * Pick shown as "Most popular" on the category card: the one with the most
   * "bought in past month" on its Amazon listing, then most reviews (owner's
   * request, 2026-10-26). Amazon's numbers aren't displayed: Associates rules
   * only allow live API data. Re-check monthly.
   */
  bestSeller: string;
  tone: Tone;
}[] = [
  {
    category: "multimeters",
    label: "Multimeters",
    noun: "multimeter",
    roundup: { href: "/multimeters/best-multimeters", title: "Best Multimeters" },
    blurb: "CAT safety ratings, True RMS and accuracy, from first meters to panel-rated electrician tools.",
    picks: multimeterPicks,
    // Owner wants a Fluke here (2026-10-27): the best-selling Fluke among our picks.
    // Amazon listing B0779621KZ, 2026-10-26: 2K+ bought in past month, 1,070 ratings
    // (next Flukes: 107 400+/2,537; 101 300+/4,402; 115 200+/3,082).
    bestSeller: "Fluke 17B+",
    tone: { text: "text-cat-multimeters", bg: "bg-cat-multimeters", border: "border-cat-multimeters", soft: "from-cat-multimeters/15" },
  },
  {
    category: "soldering-irons",
    label: "Soldering Irons",
    noun: "soldering iron",
    roundup: { href: "/soldering-irons/best-soldering-irons", title: "Best Soldering Irons" },
    blurb: "Heat-up time, temperature stability and tips, from portable pens to full bench stations.",
    picks: solderingIronPicks,
    // Amazon listing B08PZBPXLZ, 2026-10-26: 9K+ bought in past month, 5,320 ratings, #3 in Soldering Irons
    bestSeller: "Liouhoum 80W Soldering Iron Kit",
    tone: { text: "text-cat-soldering", bg: "bg-cat-soldering", border: "border-cat-soldering", soft: "from-cat-soldering/15" },
  },
  {
    category: "oscilloscopes",
    label: "Oscilloscopes",
    noun: "oscilloscope",
    roundup: { href: "/oscilloscopes/best-beginner-oscilloscopes", title: "Best Beginner Oscilloscopes" },
    blurb: "Bandwidth, sample rate and channels explained simply, from pocket scopes to four-channel benches.",
    picks: oscilloscopePicks,
    // Amazon listing B0D6VX6BFL, 2026-10-26: 1K+ bought in past month, 927 ratings, #1 in Lab Oscilloscopes
    bestSeller: "FNIRSI 2C53T",
    tone: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", border: "border-cat-oscilloscopes", soft: "from-cat-oscilloscopes/15" },
  },
];

const ofType = (category: Category, type: ContentEntry["type"]) =>
  content.filter((e) => e.category === category && e.type === type);
const reviewHrefFor = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;
/** "Fluke 17B+" -> "fluke-17b-plus", matching the site's page slugs. */
const slugOf = (name: string) => name.toLowerCase().replace(/\+/g, "-plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** Where a pick's "Review" button should go: its review, else a comparison featuring it, else the roundup. */
const pickLinkFor = (name: string, category: Category, roundupHref: string) => {
  const review = reviewHrefFor(name);
  if (review) return { href: review, label: "Review" };
  const slug = slugOf(name);
  const comparison = content.find(
    (e) => e.category === category && e.type === "comparison" && e.href.split("/").pop()!.split("-vs-").includes(slug),
  );
  if (comparison) return { href: comparison.href, label: "Compare" };
  return { href: roundupHref, label: "See roundup" };
};

const totalProducts = CATEGORIES.reduce((sum, c) => sum + c.picks.length, 0);
const totalReviews = content.filter((e) => e.type === "review").length;
const totalGuides = content.filter((e) => e.type !== "review" && e.type !== "comparison").length;

// The hero leads with each category's editorial #1 (the hands-on-tested picks where we
// have them), so the first products a visitor sees are our strongest. The category's
// best seller (see `bestSeller`) stays visible as a "most popular" line when it differs.
const topPicks = CATEGORIES.map((c) => {
  const p = c.picks.find((x) => !x.unavailable) ?? c.picks[0];
  const link = pickLinkFor(p.name, c.category, c.roundup.href);
  const seller = c.picks.find((x) => x.name === c.bestSeller && !x.unavailable);
  const popular =
    seller && seller.name !== p.name ? { name: seller.name, href: pickLinkFor(seller.name, c.category, c.roundup.href).href } : null;
  return { ...p, category: c.category, label: c.label, tone: c.tone, reviewHref: link.href, linkLabel: link.label, popular };
});

const quickLinks = [
  { href: "/multimeters/best-multimeters", label: "Best multimeters" },
  { href: "/soldering-irons/best-soldering-irons", label: "Best soldering irons" },
  { href: "/oscilloscopes/best-beginner-oscilloscopes", label: "Beginner oscilloscopes" },
  { href: "/multimeters/how-to-use-a-multimeter", label: "How to use a multimeter" },
  { href: "/oscilloscopes/how-to-use-an-oscilloscope", label: "How to use an oscilloscope" },
];

const trustStrip = [
  { value: `${totalProducts}`, label: "products compared" },
  { value: `${totalReviews}`, label: "in-depth reviews" },
  { value: `${totalGuides}`, label: "buying & how-to guides" },
];

const CATEGORY_ORDER = CATEGORIES.map((c) => c.category);

// URL slugs of retired picks ("Hakko FX888D" -> "hakko-fx888d"), so the homepage
// never features a review or comparison built around a product Amazon no longer sells.
const retiredSlugs = CATEGORIES.flatMap((c) => c.picks.filter((p) => p.unavailable).map((p) => slugOf(p.name)));
const isRetired = (href: string) => retiredSlugs.some((s) => href.split("/").pop()!.split("-vs-").some((part) => part.startsWith(s)));

// Two reviews per category (skipping the hero top picks), two comparisons per category.
const topPickNames = new Set(topPicks.map((p) => p.name));
const latestReviews = CATEGORY_ORDER.flatMap((cat) =>
  ofType(cat, "review")
    .filter((e) => ![...topPickNames].some((n) => e.title.startsWith(n)) && !isRetired(e.href))
    .slice(0, 2),
);
const featuredComparisons = CATEGORY_ORDER.flatMap((cat) => ofType(cat, "comparison").filter((e) => !isRetired(e.href)).slice(0, 2));

// Reviews + comparisons merged into one tabbed section, grouped by category —
// each tab panel renders fully in the HTML (see CategoryTabs), so this is
// strictly a presentation change: same cards, same links, half the sections.
const researchByCategory = CATEGORY_ORDER.map((cat) => ({
  category: cat,
  items: [...latestReviews.filter((e) => e.category === cat), ...featuredComparisons.filter((e) => e.category === cat)],
}));

// Most recently updated pages (git dates from sitemap-lastmod.json), so new and
// refreshed articles get a link from the homepage while they're waiting to be crawled.
const lastMod = lastModJson as Record<string, string>;
const byRecent = (a: ContentEntry, b: ContentEntry) => (lastMod[b.href] ?? "").localeCompare(lastMod[a.href] ?? "");
// Taken in turn from each category, so one busy category doesn't fill the list.
const recentByCategory = CATEGORY_ORDER.map((cat) => content.filter((e) => e.category === cat && !isRetired(e.href)).sort(byRecent));
const recentlyUpdated = Array.from({ length: 3 }, (_, i) => recentByCategory.map((list) => list[i]))
  .flat()
  .filter((e): e is ContentEntry => !!e)
  .slice(0, 8);
const TYPE_LABEL: Record<ContentEntry["type"], string> = {
  review: "Review",
  comparison: "Comparison",
  "how-to-guide": "Guide",
  "buying-guide": "Buying guide",
  "use-case-guide": "Best for",
};

// "Why does my…" fault-finding pages, newest first, a few per category.
const isTroubleshooting = (e: ContentEntry) => e.type === "how-to-guide" && /^(why|.*\b(won't|not working|keeps?)\b)/i.test(e.title);
const troubleshooting = CATEGORY_ORDER.map((cat) => ({
  category: cat,
  entries: content.filter((e) => e.category === cat && isTroubleshooting(e)).sort(byRecent),
}));
// Two use-case guides per category as cards; the rest as compact links.
const useCaseGuides = CATEGORY_ORDER.flatMap((cat) => ofType(cat, "use-case-guide").slice(0, 2));
const moreUseCases = CATEGORY_ORDER.flatMap((cat) => ofType(cat, "use-case-guide").slice(2));

// Learning hub: the two "start here" how-tos featured, then every other
// how-to and buying guide as a compact list.
const FEATURED_HOWTO = [
  "/multimeters/how-to-use-a-multimeter",
  "/soldering-irons/how-to-use-a-soldering-iron",
  "/oscilloscopes/how-to-use-an-oscilloscope",
];
const featuredHowTos = FEATURED_HOWTO.map((h) => content.find((e) => e.href === h)).filter((e): e is ContentEntry => !!e);
const otherHowTos = content.filter((e) => e.type === "how-to-guide" && !FEATURED_HOWTO.includes(e.href) && !isTroubleshooting(e));
const buyingGuides = content.filter((e) => e.type === "buying-guide");
const TONE_BY_CATEGORY = Object.fromEntries(CATEGORIES.map((c) => [c.category, c])) as Record<Category, (typeof CATEGORIES)[number]>;

const reviewSteps = [
  {
    title: "Specs from the source",
    desc: "Every specification is checked against the manufacturer's datasheet or official listing, not marketing copy. If a number is ambiguous, we say so.",
    icon: "M5 3h7l3 3v11H5V3Zm7 0v3h3M7.5 11l2 2 3.5-4",
  },
  {
    title: "Compared on what matters",
    desc: "Each category is judged on the specs that decide real use: CAT ratings and True RMS, heat-up and stability, bandwidth and sample rate.",
    icon: "M3 16h14M5 16V9m5 7V5m5 11v-4",
  },
  {
    title: "Top picks tested on our bench",
    desc: "We buy every product we rate 4.8 and test it on our own bench. Those picks carry a Hands-on Tested badge; everything else is labeled as spec-verified research.",
    icon: "M7 3h6M8 3v5l-4 7a1.5 1.5 0 0 0 1.3 2h9.4a1.5 1.5 0 0 0 1.3-2l-4-7V3M6 12h8",
  },
  {
    title: "Kept honest and current",
    desc: "No sponsored picks or brand deals. When a spec turns out wrong or a product is discontinued, we correct the page as soon as we catch it.",
    icon: "M10 2.5l6 2.2v4.8c0 4-2.6 6.9-6 8-3.4-1.1-6-4-6-8V4.7L10 2.5Zm-2.5 7.5l1.8 1.8L12.8 8",
  },
];

const homeFaqs = [
  {
    question: "I'm new to electronics. Where should I start?",
    answer:
      "Start with our three beginner guides: How to Use a Multimeter, How to Use a Soldering Iron and How to Use an Oscilloscope. Each walks through a first session step by step, with the safety checks that matter. When you're ready to buy, every category roundup leads with our top pick and includes a budget option.",
  },
  {
    question: "How does OhmSavvy make money?",
    answer:
      "Mainly through Amazon affiliate commissions when you buy via a link on this site, at no extra cost to you. We may also show display ads from Google. Neither advertisers nor manufacturers can pay for a placement, a rating or a favorable review, and there are no sponsored picks.",
  },
  {
    question: "Do you physically test the products?",
    answer:
      "Our top picks, yes. We buy every product we rate 4.8 and test it on our own bench, and those products carry a \"Hands-on Tested\" badge. Every other review is desk research: every spec checked against the manufacturer's own data or the official Amazon listing, plus patterns in verified-purchase reviews. Each review says plainly which kind it is.",
  },
  {
    question: "Why don't some products have photos?",
    answer:
      "We'd rather show no photo than a wrong one. If we can't find an image we can visually confirm matches the exact model — not a shared sibling-product photo — we show a clearly labeled \"Photo coming soon\" illustration instead of guessing.",
  },
  {
    question: "How often are picks updated?",
    answer:
      "We revisit pricing, availability, and rankings periodically rather than on a fixed schedule. If a spec turns out to be wrong or a product is discontinued, we correct it as soon as we catch it.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

/** Mobile: swipeable row with a peek of the next card. sm+: grid. */
const CAROUSEL =
  "-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0";
const CAROUSEL_ITEM = "snap-start shrink-0 w-[82%] sm:w-auto flex [&>*]:w-full";

function SectionHead({
  eyebrow,
  title,
  intro,
  links,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  links?: { href: string; label: string }[];
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">{title}</h2>
        {intro && <p className="mt-2 text-muted leading-7">{intro}</p>}
      </div>
      {links && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          {links.map((l) => (
            <Link prefetch={false} key={l.href} href={l.href} className="py-1 text-accent hover:underline">
              {l.label} →
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface-raised">
        <HeroTrace />
        <div className="relative mx-auto max-w-6xl px-6 pt-8 sm:pt-20 pb-12 grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-center">
          <div>
            <Eyebrow>ELECTRONICS TEST EQUIPMENT, COMPARED HONESTLY</Eyebrow>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-2xl">
              Multimeter, Soldering Iron and Oscilloscope Reviews You Can Trust
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-muted leading-7">
              Find the right tool for your workbench, not the one with the biggest ad budget. Independent reviews, comparisons
              and how-to guides
              <span className="hidden sm:inline">, judged on the specs that actually matter so you can buy with confidence</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  prefetch={false}
                  key={c.category}
                  href={`/${c.category}`}
                  className={`inline-flex items-center gap-2 rounded-lg border ${c.tone.border} bg-surface px-4 py-2 text-sm font-medium ${c.tone.text} hover:bg-surface-raised transition-colors`}
                >
                  {c.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <HeroSearch />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted mr-1">Popular:</span>
              {quickLinks.map((q) => (
                <Link
                  prefetch={false}
                  key={q.href}
                  href={q.href}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {q.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-surface-raised">
              <p className="font-display text-xs uppercase tracking-wide text-accent">Our top picks right now</p>
              <Link prefetch={false} href="/about" className="py-1.5 text-xs text-muted hover:text-accent">How we pick →</Link>
            </div>
            <ul className="divide-y divide-border">
              {topPicks.map((p) => (
                <li key={p.name} className="flex gap-4 p-4">
                  <Link
                    prefetch={false}
                    href={p.reviewHref}
                    className="relative shrink-0 w-20 h-20 rounded-lg border border-border/60 bg-white overflow-hidden"
                  >
                    {p.image ? (
                      <Image src={productImageSrc(p.image, 80)} unoptimized={skipOptimizer(p.image)} alt={p.name} fill sizes="80px" priority className="object-contain p-1.5" />
                    ) : (
                      <PhotoPlaceholder category={p.category} size="xs" />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-display text-xs uppercase tracking-wide ${p.tone.text}`}>{p.label}</span>
                      <Stars rating={p.rating} />
                    </div>
                    <Link prefetch={false} href={p.reviewHref} className="block py-0.5 font-semibold leading-snug hover:text-accent transition-colors">
                      {p.name}
                    </Link>
                    {p.handsOnTested && (
                      <span className="mt-1 inline-block font-display text-xs uppercase tracking-wide text-accent">✓ Hands-on tested</span>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      <Button href={p.ctaHref} className="px-3! py-1.5! text-xs!">Check price on Amazon</Button>
                      <Link prefetch={false} href={p.reviewHref} className="py-1.5 text-xs font-medium text-muted hover:text-accent">{p.linkLabel}</Link>
                    </div>
                    {p.popular && (
                      <p className="mt-2 text-xs text-muted">
                        Most popular with buyers:{" "}
                        <Link prefetch={false} href={p.popular.href} className="text-foreground hover:text-accent">
                          {p.popular.name}
                        </Link>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ProofBar
          stats={trustStrip}
          badges={["No sponsored picks", "Hands-on tested where it counts", "Specs checked at the source"]}
        />
      </section>

      {/* Category hub */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          eyebrow="BROWSE BY CATEGORY"
          title="Start with the tool you need"
          intro="Each category has a ranked roundup, individual reviews, head-to-head comparisons and guides that explain the specs."
        />
        <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
          {CATEGORIES.map((c, i) => {
            const top = c.picks[0];
            // Fall back to the editorial pick if the best seller is renamed or retired
            const popular = c.picks.find((p) => p.name === c.bestSeller && !p.unavailable) ?? top;
            const reviews = ofType(c.category, "review").length;
            const comparisons = ofType(c.category, "comparison").length;
            const guides = content.filter((e) => e.category === c.category && e.type !== "review" && e.type !== "comparison").length;
            const buying = ofType(c.category, "buying-guide")[0];
            return (
              <Reveal key={c.category} delay={i * 80} className="flex snap-start shrink-0 w-[85%] md:w-auto">
                <div className="group w-full flex flex-col rounded-2xl border border-border bg-surface-raised shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <Link prefetch={false} href={c.roundup.href} className={`relative block h-44 bg-gradient-to-b ${c.tone.soft} to-transparent`}>
                    <div className={`absolute top-0 inset-x-0 h-1 ${c.tone.bg}`} />
                    {popular.image && (
                      <Image
                        src={productImageSrc(popular.image, 320)}
                        unoptimized={skipOptimizer(popular.image)}
                        alt={`${popular.name}, the most popular ${c.noun} in our picks`}
                        fill
                        sizes="(min-width: 768px) 360px, 100vw"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`font-display text-xs uppercase tracking-wide ${c.tone.text}`}>{c.label}</span>
                    <h3 className="mt-2 text-xl font-semibold leading-snug">
                      <Link prefetch={false} href={`/${c.category}`} className="hover:text-accent transition-colors">
                        {c.label}: reviews and guides
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-6">{c.blurb}</p>
                    <div className="mt-4 rounded-md bg-signal-bg px-3 py-2 text-xs">
                      <span className="text-signal font-medium">Most popular pick: </span>
                      <span className="text-foreground">{popular.name}</span>
                    </div>
                    {popular.name !== top.name && (
                      <p className="mt-2 px-3 text-xs text-muted">
                        Editor&apos;s pick: <span className="text-foreground">{top.name}</span>
                      </p>
                    )}
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      <li>
                        <Link prefetch={false} href={c.roundup.href} className="flex justify-between py-0.5 font-medium text-foreground hover:text-accent">
                          <span>{c.roundup.title}</span>
                          <span className="font-mono text-xs">{c.picks.length} picks</span>
                        </Link>
                      </li>
                      <li>
                        <Link prefetch={false} href={`/${c.category}/reviews`} className="flex justify-between py-0.5 text-muted hover:text-accent">
                          <span>Reviews</span>
                          <span className="font-mono text-xs">{reviews}</span>
                        </Link>
                      </li>
                      <li>
                        <Link prefetch={false} href={`/${c.category}/comparisons`} className="flex justify-between py-0.5 text-muted hover:text-accent">
                          <span>Comparisons</span>
                          <span className="font-mono text-xs">{comparisons}</span>
                        </Link>
                      </li>
                      <li>
                        <Link prefetch={false} href={`/${c.category}/guides`} className="flex justify-between py-0.5 text-muted hover:text-accent">
                          <span>Guides</span>
                          <span className="font-mono text-xs">{guides}</span>
                        </Link>
                      </li>
                      {buying && (
                        <li>
                          <Link prefetch={false} href={buying.href} className="flex justify-between py-0.5 text-muted hover:text-accent">
                            <span>{buying.title}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                    <Link
                      prefetch={false}
                      href={`/${c.category}`}
                      className={`mt-6 inline-flex items-center justify-between rounded-lg border ${c.tone.border} px-4 py-2.5 text-sm font-medium ${c.tone.text} hover:bg-surface transition-colors`}
                    >
                      Explore all {c.label.toLowerCase()}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Folded in from the former standalone "Recently updated" section:
            same links/anchor text, a slim strip instead of a full section. */}
        <div className="mt-10 border-t border-border pt-8">
          <p className="mb-4 font-display text-xs uppercase tracking-wide text-muted">Just updated</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {recentlyUpdated.map((e) => (
              <li key={e.href}>
                <Link prefetch={false} href={e.href} className="group inline-flex items-center gap-2 text-sm">
                  <span className={`shrink-0 font-display text-xs uppercase tracking-wide ${TONE_BY_CATEGORY[e.category].tone.text}`}>
                    {TYPE_LABEL[e.type]}
                  </span>
                  <span className="font-medium leading-snug group-hover:text-accent transition-colors">{e.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Research the exact model: reviews + comparisons merged into one
          tabbed section (was two separate full sections). */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHead
            eyebrow="RESEARCH THE EXACT MODEL"
            title="In-depth reviews and head-to-head comparisons"
            intro="Pick a category: individual product reviews first, then the close-call comparisons."
          />
          <CategoryTabs
            tabs={researchByCategory.map(({ category, items }) => ({
              key: category,
              label: TONE_BY_CATEGORY[category].label,
              tone: TONE_BY_CATEGORY[category].tone,
              panel: (
                <div className={CAROUSEL}>
                  {items.map((e) => (
                    <div key={e.href} className={CAROUSEL_ITEM}>
                      <ContentCard entry={e} />
                    </div>
                  ))}
                </div>
              ),
            }))}
          />
        </div>
      </section>

      {/* Find your path: use-case guides + troubleshooting merged side by
          side (was two separate full sections). */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead eyebrow="FIND YOUR PATH" title="Shop by job, or fix the problem in front of you" />
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr]">
          <div className="min-w-0">
            <h3 className="font-semibold">Pick by what you&apos;ll actually do with it</h3>
            <p className="mt-1.5 text-sm text-muted leading-6">
              Not sure which tool fits? Start from the job: panel work, car diagnostics, circuit boards or a first home lab.
            </p>
            <div className={`mt-5 ${CAROUSEL}`}>
              {useCaseGuides.map((g) => (
                <div key={g.href} className={CAROUSEL_ITEM}>
                  <GuideCard entry={g} />
                </div>
              ))}
            </div>
            {moreUseCases.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-1 font-display text-xs uppercase tracking-wide text-muted">More picks by job:</span>
                {moreUseCases.map((g) => (
                  <Link
                    prefetch={false}
                    key={g.href}
                    href={g.href}
                    className={`rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-accent hover:text-accent transition-colors`}
                  >
                    <span className={TONE_BY_CATEGORY[g.category].tone.text}>●</span> {TONE_BY_CATEGORY[g.category].label}: {g.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold">Fix the problem in front of you</h3>
            <p className="mt-1.5 text-sm text-muted leading-6">
              Reading doesn&apos;t make sense, solder won&apos;t flow or the trace won&apos;t sit still? Each guide lists the likely
              causes, how to check each one and the fix.
            </p>
            <div className="mt-5 space-y-5">
              {troubleshooting.map(({ category, entries }) => {
                const c = TONE_BY_CATEGORY[category];
                return (
                  <div key={category} className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm">
                    <h4 className={`font-display text-xs uppercase tracking-wide ${c.tone.text}`}>{c.label}</h4>
                    <ul className="mt-2 divide-y divide-border">
                      {entries.slice(0, 4).map((g) => (
                        <li key={g.href}>
                          <Link prefetch={false} href={g.href} className="group flex items-start justify-between gap-3 py-2.5 text-sm">
                            <span className="group-hover:text-accent transition-colors">{g.title}</span>
                            <span className="text-muted" aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link prefetch={false} href={`/${category}#guides`} className="mt-3 inline-block py-1 text-sm font-medium text-accent hover:underline">
                      More {c.noun} fixes →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Learn */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHead
            eyebrow="LEARN THE BASICS"
            title="Guides that explain the specs before you spend"
            intro="Plain-English how-to guides and buying guides, with diagrams, worked examples and safety notes."
          />
          <div className="grid lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c) => {
              const start = featuredHowTos.find((g) => g.category === c.category);
              const more = otherHowTos.filter((g) => g.category === c.category);
              const buying = buyingGuides.filter((g) => g.category === c.category);
              // Same count as the category card and the /guides page: every guide, incl. use-case picks.
              const total = content.filter((e) => e.category === c.category && e.type !== "review" && e.type !== "comparison").length;
              return (
                <div key={c.category} className="flex flex-col rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
                  <div className={`h-1 ${c.tone.bg}`} />
                  <div className="flex items-center justify-between px-5 pt-5">
                    <span className={`font-display text-xs uppercase tracking-wide ${c.tone.text}`}>{c.label}</span>
                    <span className="font-mono text-xs text-muted">{total} guides</span>
                  </div>
                  {start && (
                    <Link prefetch={false} href={start.href} className="group mx-5 mt-4 block rounded-xl bg-surface-raised p-4 hover:ring-1 hover:ring-accent transition">
                      <span className="font-display text-xs uppercase tracking-wide text-accent">Start here</span>
                      <span className="mt-1 block font-semibold group-hover:text-accent transition-colors">{start.title}</span>
                      <span className="mt-1 block text-xs text-muted leading-5">{start.description}</span>
                    </Link>
                  )}
                  <ul className="mt-3 flex-1 divide-y divide-border px-5">
                    {more.slice(0, 5).map((g) => (
                      <li key={g.href}>
                        <Link prefetch={false} href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">{g.title}</span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                    {buying.map((g) => (
                      <li key={g.href}>
                        <Link prefetch={false} href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">
                            <span className="mr-1.5 rounded bg-signal-bg px-1.5 py-0.5 font-display text-xs uppercase text-signal">Buying</span>
                            {g.title}
                          </span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    prefetch={false}
                    href={`/${c.category}/guides`}
                    className={`mx-5 mb-5 mt-4 inline-flex items-center justify-between rounded-lg border ${c.tone.border} px-4 py-2.5 text-sm font-medium ${c.tone.text} hover:bg-surface-raised transition-colors`}
                  >
                    All {total} {c.noun} guides
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we review, collapsed to a compact strip, directly above FAQ —
          was its own full section with four large animated cards. */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <SectionHead eyebrow="HOW WE REVIEW" title="One standard, applied the same way to every product" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviewSteps.map((s) => (
              <li key={s.title} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal-bg text-signal">
                  <Icon d={s.icon} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug">{s.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge variant="accent">Hands-on Tested</Badge>
            <span>marks a product we bought and tested ourselves. Every other review says plainly that it&apos;s spec-verified research.</span>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl border-t border-border px-6 pt-12 pb-16 sm:pb-20 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">Common questions about this site</h2>
            <p className="mt-3 text-muted leading-7">
              How we make money, how we test, and how to find your way around. Short, straight answers.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
              <p className="font-display text-xs uppercase tracking-wide text-accent">Want the detail?</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                <li>
                  <Link prefetch={false} href="/about" className="flex items-center justify-between gap-3 py-0.5 hover:text-accent transition-colors">
                    <span>How we test and review</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
                <li>
                  <Link prefetch={false} href="/about#how-were-funded" className="flex items-center justify-between gap-3 py-0.5 hover:text-accent transition-colors">
                    <span>How we&apos;re funded</span>
                    <span className="text-muted" aria-hidden="true">→</span>
                  </Link>
                </li>
                {featuredHowTos.map((g) => (
                  <li key={g.href}>
                    <Link prefetch={false} href={g.href} className="flex items-center justify-between gap-3 py-0.5 hover:text-accent transition-colors">
                      <span>{g.title}</span>
                      <span className="text-muted" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <FaqAccordion items={homeFaqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </div>
      </section>
    </div>
  );
}
