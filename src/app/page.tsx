import Image from "next/image";
import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { GuideCard } from "@/components/GuideCard";
import { HeroSearch } from "@/components/HeroSearch";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { content, type Category, type ContentEntry } from "@/lib/content";
import { skipOptimizer } from "@/lib/images";
import { picks as multimeterPicks } from "./multimeters/best-multimeters/page";
import { picks as solderingIronPicks } from "./soldering-irons/best-soldering-irons/page";
import { picks as oscilloscopePicks } from "./oscilloscopes/best-beginner-oscilloscopes/page";

type Tone = { text: string; bg: string; border: string; soft: string };

const CATEGORIES: {
  category: Category;
  label: string;
  noun: string;
  roundup: { href: string; title: string };
  blurb: string;
  picks: typeof multimeterPicks;
  tone: Tone;
}[] = [
  {
    category: "multimeters",
    label: "Multimeters",
    noun: "multimeter",
    roundup: { href: "/multimeters/best-multimeters", title: "Best Multimeters" },
    blurb: "CAT safety ratings, True RMS and accuracy, from first meters to panel-rated electrician tools.",
    picks: multimeterPicks,
    tone: { text: "text-cat-multimeters", bg: "bg-cat-multimeters", border: "border-cat-multimeters", soft: "from-cat-multimeters/15" },
  },
  {
    category: "soldering-irons",
    label: "Soldering Irons",
    noun: "soldering iron",
    roundup: { href: "/soldering-irons/best-soldering-irons", title: "Best Soldering Irons" },
    blurb: "Heat-up time, temperature stability and tips, from portable pens to full bench stations.",
    picks: solderingIronPicks,
    tone: { text: "text-cat-soldering", bg: "bg-cat-soldering", border: "border-cat-soldering", soft: "from-cat-soldering/15" },
  },
  {
    category: "oscilloscopes",
    label: "Oscilloscopes",
    noun: "oscilloscope",
    roundup: { href: "/oscilloscopes/best-beginner-oscilloscopes", title: "Best Beginner Oscilloscopes" },
    blurb: "Bandwidth, sample rate and channels explained simply, from pocket scopes to four-channel benches.",
    picks: oscilloscopePicks,
    tone: { text: "text-cat-oscilloscopes", bg: "bg-cat-oscilloscopes", border: "border-cat-oscilloscopes", soft: "from-cat-oscilloscopes/15" },
  },
];

const ofType = (category: Category, type: ContentEntry["type"]) =>
  content.filter((e) => e.category === category && e.type === type);
const reviewHrefFor = (name: string) => content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;

const totalProducts = CATEGORIES.reduce((sum, c) => sum + c.picks.length, 0);
const totalReviews = content.filter((e) => e.type === "review").length;
const totalGuides = content.filter((e) => e.type !== "review" && e.type !== "comparison").length;

// The "Best Overall" pick of each category, shown in the hero so the page
// leads with a buying answer rather than only links to articles.
const topPicks = CATEGORIES.map((c) => {
  const p = c.picks[0];
  return { ...p, category: c.category, label: c.label, tone: c.tone, reviewHref: reviewHrefFor(p.name) ?? c.roundup.href };
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
  { value: "0", label: "paid placements" },
];

const CATEGORY_ORDER = CATEGORIES.map((c) => c.category);

// Two reviews per category (skipping the hero top picks), one comparison per category.
const topPickNames = new Set(topPicks.map((p) => p.name));
const latestReviews = CATEGORY_ORDER.flatMap((cat) =>
  ofType(cat, "review")
    .filter((e) => ![...topPickNames].some((n) => e.title.startsWith(n)))
    .slice(0, 2),
);
const featuredComparisons = CATEGORY_ORDER.flatMap((cat) => ofType(cat, "comparison").slice(0, 1));
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
const otherHowTos = content.filter((e) => e.type === "how-to-guide" && !FEATURED_HOWTO.includes(e.href));
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
    desc: "Our testing team buys every product we rate 4.8 and puts it to work in our lab. Those picks carry a Hands-on Tested badge; everything else is labelled as spec-verified research.",
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
    question: "How does OhmSavvy make money?",
    answer:
      "Through Amazon affiliate commissions when you buy via a link on this site, at no extra cost to you. That's the only funding source — no advertising, no sponsored placements, no manufacturer payments for a favorable review.",
  },
  {
    question: "Do you physically test the products?",
    answer:
      "Our top picks, yes. Our testing team buys every product we rate 4.8 and puts it to work in our lab, and those products carry a \"Hands-on Tested\" badge. Every other review is desk research: every spec checked against the manufacturer's own data or the official Amazon listing, plus patterns in verified-purchase reviews. Each review says plainly which kind it is.",
  },
  {
    question: "Why don't some products have photos?",
    answer:
      "We'd rather show no photo than a wrong one. If we can't find an image we can visually confirm matches the exact model — not a shared sibling-product photo — we show a clearly labelled \"Photo coming soon\" illustration instead of guessing.",
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
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-accent hover:underline">
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-14 sm:pt-20 pb-12 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
            <Eyebrow>ELECTRONICS TEST EQUIPMENT, COMPARED HONESTLY</Eyebrow>
            <h1 className="text-4xl sm:text-5xl leading-[1.1] max-w-2xl">
              Find the right tool for your workbench, not the one with the biggest ad budget.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted leading-7">
              Independent reviews, comparisons and how-to guides for multimeters, soldering irons and oscilloscopes,
              judged on the specs that actually matter so you can buy with confidence.
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted mr-1">Popular:</span>
              {quickLinks.map((q) => (
                <Link
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
              <p className="font-display text-xs uppercase tracking-wide text-accent">Top picks right now</p>
              <Link href="/about" className="text-[11px] text-muted hover:text-accent">How we pick →</Link>
            </div>
            <ul className="divide-y divide-border">
              {topPicks.map((p) => (
                <li key={p.name} className="flex gap-4 p-4">
                  <Link
                    href={p.reviewHref}
                    className="relative shrink-0 w-20 h-20 rounded-lg border border-border/60 bg-white overflow-hidden"
                  >
                    {p.image ? (
                      <Image src={p.image} unoptimized={skipOptimizer(p.image)} alt={p.name} fill sizes="80px" priority className="object-contain p-1.5" />
                    ) : (
                      <PhotoPlaceholder category={p.category} size="xs" />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-display text-[11px] uppercase tracking-wide ${p.tone.text}`}>{p.label}</span>
                      <Stars rating={p.rating} />
                    </div>
                    <Link href={p.reviewHref} className="mt-0.5 block font-semibold leading-snug hover:text-accent transition-colors">
                      {p.name}
                    </Link>
                    {p.handsOnTested && (
                      <span className="mt-1 inline-block font-display text-[10px] uppercase tracking-wide text-accent">✓ Hands-on tested</span>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      <Button href={p.ctaHref} className="px-3! py-1.5! text-xs!">Check price on Amazon</Button>
                      <Link href={p.reviewHref} className="text-xs font-medium text-muted hover:text-accent">Review</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-border bg-surface/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustStrip.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold text-accent">{s.value}</span>
                <span className="text-xs sm:text-sm text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
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
            const reviews = ofType(c.category, "review").length;
            const comparisons = ofType(c.category, "comparison").length;
            const guides = content.filter((e) => e.category === c.category && e.type !== "review" && e.type !== "comparison").length;
            const buying = ofType(c.category, "buying-guide")[0];
            return (
              <Reveal key={c.category} delay={i * 80} className="flex snap-start shrink-0 w-[85%] md:w-auto">
                <div className="group w-full flex flex-col rounded-2xl border border-border bg-surface-raised shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <Link href={c.roundup.href} className={`relative block h-44 bg-gradient-to-b ${c.tone.soft} to-transparent`}>
                    <div className={`absolute top-0 inset-x-0 h-1 ${c.tone.bg}`} />
                    {top.image && (
                      <Image
                        src={top.image}
                        unoptimized={skipOptimizer(top.image)}
                        alt={`${top.name}, our top ${c.label.toLowerCase()} pick`}
                        fill
                        sizes="(min-width: 768px) 360px, 100vw"
                        className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`font-display text-xs uppercase tracking-wide ${c.tone.text}`}>{c.label}</span>
                    <Link href={c.roundup.href} className="mt-2 text-xl font-semibold leading-snug hover:text-accent transition-colors">
                      {c.roundup.title}
                    </Link>
                    <p className="mt-2 text-sm text-muted leading-6">{c.blurb}</p>
                    <div className="mt-4 rounded-md bg-signal-bg px-3 py-2 text-xs">
                      <span className="text-signal font-medium">Top pick: </span>
                      <span className="text-foreground">{top.name}</span>
                    </div>
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      <li>
                        <Link href={`/${c.category}/reviews`} className="flex justify-between text-muted hover:text-accent">
                          <span>Reviews</span>
                          <span className="font-mono text-xs">{reviews}</span>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${c.category}/comparisons`} className="flex justify-between text-muted hover:text-accent">
                          <span>Comparisons</span>
                          <span className="font-mono text-xs">{comparisons}</span>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${c.category}/guides`} className="flex justify-between text-muted hover:text-accent">
                          <span>Guides</span>
                          <span className="font-mono text-xs">{guides}</span>
                        </Link>
                      </li>
                      {buying && (
                        <li>
                          <Link href={buying.href} className="flex justify-between text-muted hover:text-accent">
                            <span>{buying.title}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      )}
                    </ul>
                    <Link
                      href={c.roundup.href}
                      className={`mt-6 inline-flex items-center justify-between rounded-lg border ${c.tone.border} px-4 py-2.5 text-sm font-medium ${c.tone.text} hover:bg-surface transition-colors`}
                    >
                      See all {c.picks.length} picks · {guides} guides
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHead
            eyebrow="IN-DEPTH REVIEWS"
            title="In-depth product reviews"
            links={[
              { href: "/multimeters/reviews", label: "Multimeters" },
              { href: "/soldering-irons/reviews", label: "Soldering irons" },
              { href: "/oscilloscopes/reviews", label: "Oscilloscopes" },
            ]}
          />
          <div className={CAROUSEL}>
            {latestReviews.map((e) => (
              <div key={e.href} className={CAROUSEL_ITEM}>
                <ContentCard entry={e} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          eyebrow="SHOP BY USE CASE"
          title="Pick by what you'll actually do with it"
          intro="Not sure which tool fits? Start from the job: panel work, car diagnostics, circuit boards or a first home lab."
        />
        <div className={CAROUSEL}>
          {useCaseGuides.map((g) => (
            <div key={g.href} className={CAROUSEL_ITEM}>
              <GuideCard entry={g} />
            </div>
          ))}
        </div>
        {moreUseCases.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-display text-[11px] uppercase tracking-wide text-muted">More picks by job:</span>
            {moreUseCases.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className={`rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-accent hover:text-accent transition-colors`}
              >
                <span className={TONE_BY_CATEGORY[g.category].tone.text}>●</span> {TONE_BY_CATEGORY[g.category].label}: {g.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Comparisons */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHead
            eyebrow="HEAD TO HEAD"
            title="Comparisons for close calls"
            links={[
              { href: "/multimeters/comparisons", label: "Multimeters" },
              { href: "/soldering-irons/comparisons", label: "Soldering irons" },
              { href: "/oscilloscopes/comparisons", label: "Oscilloscopes" },
            ]}
          />
          <div className={CAROUSEL}>
            {featuredComparisons.map((e) => (
              <div key={e.href} className={CAROUSEL_ITEM}>
                <ContentCard entry={e} />
              </div>
            ))}
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
                    <Link href={start.href} className="group mx-5 mt-4 block rounded-xl bg-surface-raised p-4 hover:ring-1 hover:ring-accent transition">
                      <span className="font-display text-[10px] uppercase tracking-wide text-accent">Start here</span>
                      <span className="mt-1 block font-semibold group-hover:text-accent transition-colors">{start.title}</span>
                      <span className="mt-1 block text-xs text-muted leading-5">{start.description}</span>
                    </Link>
                  )}
                  <ul className="mt-3 flex-1 divide-y divide-border px-5">
                    {more.slice(0, 5).map((g) => (
                      <li key={g.href}>
                        <Link href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">{g.title}</span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                    {buying.map((g) => (
                      <li key={g.href}>
                        <Link href={g.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm">
                          <span className="group-hover:text-accent transition-colors">
                            <span className="mr-1.5 rounded bg-signal-bg px-1.5 py-0.5 font-display text-[10px] uppercase text-signal">Buying</span>
                            {g.title}
                          </span>
                          <span className="text-muted" aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
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

      {/* How we review */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionHead
          eyebrow="HOW WE REVIEW"
          title="One standard, applied the same way to every product"
          links={[
            { href: "/about", label: "About our team and lab" },
            { href: "/about#how-were-funded", label: "How we're funded" },
          ]}
        />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviewSteps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-surface-raised p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-signal-bg flex items-center justify-center text-signal">
                      <Icon d={s.icon} />
                    </div>
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-6">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <Badge variant="accent">Hands-on Tested</Badge>
          <span>marks a product our testing team has bought and used. Every other review says plainly that it&apos;s spec-verified research.</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <SectionHead eyebrow="FAQ" title="Common questions about this site" />
          <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
            {homeFaqs.map((f) => (
              <details key={f.question} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="font-medium">{f.question}</h3>
                  <span className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-6">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
