import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { GuideCard } from "@/components/GuideCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";
import { content, type Category } from "@/lib/content";
import { picks as multimeterPicks } from "./multimeters/best-multimeters/page";
import { picks as solderingIronPicks } from "./soldering-irons/best-soldering-irons/page";
import { picks as oscilloscopePicks } from "./oscilloscopes/best-beginner-oscilloscopes/page";

const featured = [
  {
    href: "/multimeters/best-multimeters",
    category: "Multimeters",
    title: "Best Multimeters in 2026",
    excerpt: `We compared accuracy, CAT safety ratings, and auto-ranging across ${multimeterPicks.length} models to find the right meter for every budget.`,
    picks: multimeterPicks,
    text: "text-cat-multimeters",
    border: "border-cat-multimeters",
  },
  {
    href: "/soldering-irons/best-soldering-irons",
    category: "Soldering Irons",
    title: "Best Soldering Irons for Electronics",
    excerpt: `From pocket-sized portables to full bench stations — ${solderingIronPicks.length} irons compared on heat-up time and temperature stability.`,
    picks: solderingIronPicks,
    text: "text-cat-soldering",
    border: "border-cat-soldering",
  },
  {
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    category: "Oscilloscopes",
    title: "Best Oscilloscopes for Beginners",
    excerpt: `Bandwidth, sample rate, and channel count explained simply, across ${oscilloscopePicks.length} beginner-friendly picks.`,
    picks: oscilloscopePicks,
    text: "text-cat-oscilloscopes",
    border: "border-cat-oscilloscopes",
  },
];

const totalProducts = featured.reduce((sum, f) => sum + f.picks.length, 0);

const trustStats = [
  { value: `${totalProducts}`, label: "Products Compared" },
  { value: "100%", label: "Spec-Verified vs. Manufacturer Data" },
  { value: "$0", label: "Paid Placements" },
];

const trustPillars = [
  {
    title: "Spec Verified",
    desc: "Every specification is cross-checked against the manufacturer's own datasheet or official listing — not marketing copy. If a number is ambiguous, we say so.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 3h7l3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 3v3h3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6.5 11.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Owner Feedback Cross-Referenced",
    desc: "We look for patterns across real verified-purchase reviews to catch reliability issues that spec sheets alone never show.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8l-3.5 3v-3H4a1 1 0 0 1-1-1V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 8h6M7 10.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "No Sponsored Picks",
    desc: "We earn through Amazon affiliate links at no extra cost to you — that's it. No brand deals, no paid placements, no manufacturer relationships that influence a verdict.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l6 2.2v4.8c0 4-2.6 6.9-6 8-3.4-1.1-6-4-6-8V4.7L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7.5 10l1.8 1.8L12.8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// Top pick (badge: "Best Overall") per category, for the homepage's
// product-first section — the part of the page that actually drives
// affiliate clicks, rather than just linking out to articles.
const topPicks = featured.map((f) => ({ ...f.picks[0], category: f.category, text: f.text, articleHref: f.href }));

const buyingBasics = [
  {
    term: "CAT Rating",
    desc: "Set by IEC 61010 — CAT II covers outlets and appliances, CAT III covers panels and fixed building wiring, CAT IV covers the service entrance. Higher ratings mean the meter can safely handle larger transient spikes.",
    href: "/multimeters/best-multimeters#faq",
  },
  {
    term: "True RMS",
    desc: "A True RMS meter calculates the actual root-mean-square value of a signal, so it reads correctly on the non-sinusoidal waveforms common with dimmers, VFDs, and most modern electronics. A non-True-RMS meter is only accurate on clean sine waves.",
    href: "/multimeters/best-multimeters#faq",
  },
  {
    term: "Oscilloscope Bandwidth",
    desc: "As a rule of thumb, your scope's bandwidth should be 3-5x the highest frequency you're measuring — below that, the scope starts attenuating and distorting the signal you're trying to see.",
    href: "/oscilloscopes/best-beginner-oscilloscopes#faq",
  },
];

const CATEGORY_ORDER: { category: Category; label: string; text: string }[] = [
  { category: "multimeters", label: "Multimeters", text: "text-cat-multimeters" },
  { category: "soldering-irons", label: "Soldering Irons", text: "text-cat-soldering" },
  { category: "oscilloscopes", label: "Oscilloscopes", text: "text-cat-oscilloscopes" },
];

// Use-case guides across all categories, straight from the content registry.
const useCaseGuides = CATEGORY_ORDER.flatMap((c) =>
  content.filter((e) => e.category === c.category && e.type === "use-case-guide"),
);

// Two reviews per category (skipping the top picks already featured above), and
// one comparison per category.
const topPickNames = new Set(featured.map((f) => f.picks[0].name));
const latestReviews = CATEGORY_ORDER.flatMap((c) =>
  content
    .filter((e) => e.category === c.category && e.type === "review")
    .filter((e) => ![...topPickNames].some((n) => e.title.startsWith(n)))
    .slice(0, 2),
);
const featuredComparisons = CATEGORY_ORDER.flatMap((c) =>
  content.filter((e) => e.category === c.category && e.type === "comparison").slice(0, 1),
);

const homeFaqs = [
  {
    question: "How does OhmSavvy make money?",
    answer:
      "Through Amazon affiliate commissions when you buy via a link on this site, at no extra cost to you. That's the only funding source — no advertising, no sponsored placements, no manufacturer payments for a favorable review.",
  },
  {
    question: "Do you physically test every product?",
    answer:
      "We're in the process of changing this. Every spec on this site is cross-checked against manufacturer datasheets and official listings, and we look for patterns across real verified-purchase reviews — that's always been true. We've now started buying and hands-on testing specific picks ourselves; as each one is verified, it carries a \"Hands-on Tested\" badge. A pick without that badge yet is still backed by the research process above, just not physically tested by us — we'll keep adding badges as testing completes rather than claim it's finished before it is.",
  },
  {
    question: "Why don't some products have photos?",
    answer:
      "We'd rather show no photo than a wrong one. If we can't find an image we can visually confirm matches the exact model — not a shared sibling-product photo — we leave the slot showing \"Photo pending manufacturer confirmation\" instead of guessing.",
  },
  {
    question: "How often are picks updated?",
    answer:
      "We revisit pricing, availability, and rankings periodically rather than on a fixed schedule. If a spec turns out to be wrong or a product is discontinued, we correct it as soon as we catch it.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
          <Eyebrow>ELECTRONICS TEST EQUIPMENT, COMPARED HONESTLY</Eyebrow>
          <h1 className="text-4xl sm:text-5xl leading-tight max-w-2xl">
            Find the right tool for your workbench, not the one with the biggest ad budget.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted leading-7">
            OhmSavvy breaks down multimeters, soldering irons, and test equipment by the specs
            that actually matter — CAT ratings, accuracy, thermal recovery — so you can buy with
            confidence.
          </p>
          <p className="mt-6 text-sm text-muted">
            Researched and maintained by the{" "}
            <Link href="/about" className="text-accent hover:underline font-medium">
              OhmSavvy Research Team
            </Link>
          </p>
        </div>
        <div className="border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-3 gap-6">
            {trustStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl sm:text-4xl font-semibold text-accent">{s.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>EDITORIAL PICKS</Eyebrow>
        <h2 className="text-2xl font-semibold">Our top pick in every category</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPicks.map((p) => (
            <Card key={p.name} className="flex flex-col">
              {p.image ? (
                <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
                  <div className={`h-1.5 bg-accent`} />
                  <div className="h-48 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain scale-125"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="h-48 rounded-lg border border-border bg-surface-raised flex flex-col items-center justify-center gap-2 text-muted">
                  <svg width="28" height="28" viewBox="0 0 32 18" fill="none">
                    <path
                      d="M1 9 C4 1,8 1,11 9 C14 17,18 17,21 9 L26 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="26" cy="9" r="1.9" fill="currentColor" />
                  </svg>
                  <span className="text-xs">Photo pending manufacturer confirmation</span>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className={`font-display text-xs uppercase tracking-wide ${p.text}`}>{p.category}</span>
                <Stars rating={p.rating} />
              </div>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted leading-6 flex-1">{p.bottomLine}</p>
              <div className="mt-4 flex items-center gap-3">
                <Button href={p.ctaHref}>Check price on Amazon →</Button>
                <Link
                  href={`${p.articleHref}#${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-sm font-medium ${p.text} hover:underline whitespace-nowrap`}
                >
                  Full review
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>WHY TRUST THIS SITE</Eyebrow>
          <h2 className="text-2xl font-semibold max-w-xl">
            A consistent standard, applied the same way to every product.
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {trustPillars.map((t) => (
              <div key={t.title}>
                <div className="w-10 h-10 rounded-lg bg-signal-bg flex items-center justify-center text-signal mb-3">
                  {t.icon}
                </div>
                <h3 className="font-medium mb-2">{t.title}</h3>
                <p className="text-sm text-muted leading-6">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-semibold">Browse by category</h2>
          <span className="text-sm text-muted">{featured.length} categories reviewed</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => {
            const topPick = item.picks[0];
            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className={`h-full flex flex-col transition-colors border-l-4 ${item.border}`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-display text-xs uppercase tracking-wide ${item.text}`}>
                      {item.category}
                    </span>
                    <Stars rating={topPick.rating} />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-6 flex-1">{item.excerpt}</p>
                  <div className="mt-4 rounded-md bg-signal-bg px-3 py-2 text-xs">
                    <span className="text-signal font-medium">Top pick: </span>
                    <span className="text-foreground">{topPick.name}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted">{item.picks.length} models compared</span>
                    <span className={`${item.text} group-hover:translate-x-0.5 transition-transform`}>
                      See all picks →
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>IN-DEPTH REVIEWS</Eyebrow>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold">Product reviews</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <Link href="/multimeters/reviews" className="text-accent hover:underline">All multimeter reviews →</Link>
              <Link href="/soldering-irons/reviews" className="text-accent hover:underline">Soldering irons →</Link>
              <Link href="/oscilloscopes/reviews" className="text-accent hover:underline">Oscilloscopes →</Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestReviews.map((e) => (
              <ContentCard key={e.href} entry={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>HEAD TO HEAD</Eyebrow>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold">Comparisons</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <Link href="/multimeters/comparisons" className="text-accent hover:underline">All multimeter comparisons →</Link>
              <Link href="/soldering-irons/comparisons" className="text-accent hover:underline">Soldering irons →</Link>
              <Link href="/oscilloscopes/comparisons" className="text-accent hover:underline">Oscilloscopes →</Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredComparisons.map((e) => (
              <ContentCard key={e.href} entry={e} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>BUYING BASICS</Eyebrow>
          <h2 className="text-2xl font-semibold max-w-xl">A few terms worth knowing before you buy</h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {buyingBasics.map((b) => (
              <div key={b.term}>
                <h3 className="font-medium mb-2">{b.term}</h3>
                <p className="text-sm text-muted leading-6">{b.desc}</p>
                <Link href={b.href} className="mt-2 inline-block text-sm font-medium text-accent hover:underline">
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <Eyebrow>MORE GUIDES</Eyebrow>
        <h2 className="text-2xl font-semibold">Shop by use case</h2>
        <p className="mt-2 text-muted max-w-2xl">
          Not sure which tool fits? Start from what you&apos;ll actually use it for.
        </p>
        {/* Mobile: swipeable row with a peek of the next card. sm+: grid. */}
        <div className="mt-8 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0">
          {useCaseGuides.map((g) => (
            <div key={g.href} className="snap-start shrink-0 w-[82%] sm:w-auto flex">
              <GuideCard entry={g} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-2xl font-semibold mb-8">Common questions about this site</h2>
          <div className="space-y-6">
            {homeFaqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-medium">{f.question}</h3>
                <p className="mt-1.5 text-sm text-muted leading-6">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
