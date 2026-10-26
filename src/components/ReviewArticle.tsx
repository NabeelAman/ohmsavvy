import Image from "next/image";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import Link from "next/link";
import { content } from "@/lib/content";
import { ArticleTocBar, ArticleTocSidebar, type TocItem } from "./ArticleToc";
import { ImageLightbox } from "./ImageLightbox";
import { ReadingProgress } from "./ReadingProgress";
import { Reveal } from "./Reveal";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { ProsCons } from "./ui/ProsCons";
import { RankBadge } from "./ui/RankBadge";
import { SpecList, type Spec } from "./ui/SpecList";
import { SpecValue } from "./ui/SpecValue";
import { Stars } from "./ui/Stars";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { categoryOfPick } from "@/lib/catalog";

export type Pick = {
  badge: string;
  name: string;
  /** Amazon SiteStripe product image URL. Optional until sourced. */
  image?: string;
  rating: number;
  /** One punchy sentence — the verdict in a single line, shown before the full prose. */
  bottomLine: string;
  verdict: string;
  specs: Spec[];
  pros: string[];
  cons: string[];
  ctaHref: string;
  /**
   * True only once this exact unit has actually been bought and hands-on
   * tested by OhmSavvy — not aspirational, not "testing in progress" for this
   * item specifically. Leave unset/false until a real result exists; the site
   * explicitly discloses the distinction (see /about), so this must stay honest.
   */
  handsOnTested?: boolean;
  /**
   * Set when Amazon no longer sells this exact product. The Pick stays (pages
   * look Picks up by name) but rankings skip it and buy buttons point at the
   * alternative's listing instead.
   */
  unavailable?: { note: string; alternative?: string };
};

export type Faq = { question: string; answer: string };

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");
const reviewHrefFor = (name: string) =>
  content.find((e) => e.type === "review" && e.title === `${name} Review`)?.href;
const bestFor = (p: Pick) => p.specs.find((s) => s.label === "Best for")?.value;

const METHOD = [
  {
    title: "Specs from the source",
    body: "Every spec is checked against the manufacturer's official product page or datasheet and the official Amazon listing. Where sources disagree, we say so.",
    icon: "M5 3h7l3 3v11H5V3Zm7 0v3h3M7.5 11l2 2 3.5-4",
  },
  {
    title: "Fit over feature count",
    body: "Each pick earns its place for a specific kind of buyer, and we name who should skip it, rather than ranking on spec-sheet length.",
    icon: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  },
  {
    title: "Owner feedback, cross-checked",
    body: "We look for patterns in verified-purchase reviews to catch reliability issues that spec sheets never show.",
    icon: "M4 5h12v8H8l-4 3V5Zm3 3h6M7 10.5h4",
  },
  {
    title: "No sponsored picks",
    body: "We earn mainly from Amazon affiliate commissions and may also show display ads from Google. No brand or advertiser can pay for a spot, a ranking or a badge, and ads never affect our picks.",
    icon: "M10 3 4 5.5V10c0 3.5 2.6 6.2 6 7 3.4-.8 6-3.5 6-7V5.5L10 3Z",
  },
];

// fill + sizes: every call site is a fixed-aspect box (CSS-driven height,
// overflow-hidden), not an intrinsic image size, so `fill` is the right next/image
// mode — the parent just needs `position: relative`, already true at every call
// site below. `eager` sets priority (the top-3 "Our top picks" row and the
// ProductReview hero are this site's actual LCP candidates now); priority and
// loading="lazy" are mutually exclusive on next/image, so only one is ever set.
function ProductImage({
  pick,
  className,
  eager,
  sizes = "200px",
  slotPx = 200,
}: {
  pick: Pick;
  className: string;
  eager?: boolean;
  sizes?: string;
  /** Longest side of the photo's box in CSS px; picks the Amazon rendition (see productImageSrc). */
  slotPx?: number;
}) {
  return pick.image ? (
    <Image
      src={productImageSrc(pick.image, slotPx)} unoptimized={skipOptimizer(pick.image)}
      alt={pick.name}
      fill
      sizes={sizes}
      className={className}
      priority={eager}
      loading={eager ? undefined : "lazy"}
    />
  ) : (
    <PhotoPlaceholder category={categoryOfPick(pick.name)} size={sizes === "40px" || sizes === "56px" ? "xs" : "sm"} />
  );
}

export function ReviewArticle({
  picks: allPicks,
  faqs,
  howWeChose,
  fitNotes,
  advice,
  hideByline = false,
}: {
  /** True when the page header already shows the byline (RoundupHero); the disclosure still renders. */
  hideByline?: boolean;
  picks: Pick[];
  faqs: Faq[];
  /** Optional page-specific methodology note shown above the standard criteria. */
  howWeChose?: string;
  /** Optional per-pick "why it fits this use case" note, keyed by Pick name. */
  fitNotes?: Record<string, string>;
  /** Optional buying-advice sections for this page's use case. */
  advice?: { heading: string; body: string }[];
}) {
  // Products Amazon no longer sells are left out of the ranking and listed separately.
  const picks = allPicks.filter((p) => !p.unavailable);
  const retired = allPicks.filter((p) => p.unavailable);

  // A Review per pick, not an AggregateRating — this is a single editorial rating,
  // not an aggregate of multiple independent reviews, and claiming otherwise would
  // misrepresent the data to search engines (and readers).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: picks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        ...(p.image ? { image: p.image } : {}),
        description: p.bottomLine,
        review: {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: p.rating, bestRating: "5" },
          author: { "@type": "Organization", name: "OhmSavvy" },
        },
      },
    })),
  };

  const featured = picks.slice(0, Math.min(3, picks.length));
  const testedCount = picks.filter((p) => p.handsOnTested).length;
  const alsoGreat = picks.slice(featured.length);

  const toc: TocItem[] = [
    { id: "top-picks", label: "Top picks" },
    { id: "full-comparison", label: "Compare" },
    { id: "picks", label: "Detailed reviews" },
    ...picks.map((p, i) => ({ id: slug(p.name), label: `${i + 1}. ${p.name}`, sub: true })),
    ...(advice?.length ? [{ id: "buying-advice", label: "Buying advice" }] : []),
    { id: "how-we-chose", label: "How we chose" },
    ...(faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 pt-10 pb-16">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <div className="min-w-0">
          {/* Byline + disclosure */}
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm ${hideByline ? "hidden" : ""}`}>
            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-display text-xs text-accent">
                OS
              </span>
              <span>
                By <span className="font-medium">OhmSavvy Research Team</span>
              </span>
            </span>
            <span className="text-muted">
              Specs verified against manufacturer data
              {testedCount > 0 ? ` · ${testedCount} of ${picks.length} hands-on tested` : " · desk research"}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted leading-5">
            Disclosure: OhmSavvy earns a commission from qualifying Amazon purchases made through the links below, at no
            extra cost to you.{" "}
            <Link prefetch={false} href="/about#how-were-funded" className="text-accent hover:underline">
              How we&apos;re funded
            </Link>
            .
          </p>

          {/* Direct child of the column so it can stick for the whole article. */}
          <ArticleTocBar items={toc} className="mt-6" />

          {/* 1. Top picks at a glance */}
          <section id="top-picks" className="mt-10 scroll-mt-36">
            <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">At a glance</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Our top picks</h2>
            <div className={`mt-6 grid gap-5 ${featured.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {featured.map((p, i) => (
                <Reveal key={p.name} delay={i * 90} className="flex">
                  <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    {i === 0 && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-signal" />}
                    <div className="relative m-3 mb-0 flex h-44 items-center justify-center rounded-xl bg-white border border-border/60 overflow-hidden">
                      <span className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-accent font-display text-xs font-semibold text-accent-foreground shadow">
                        {i + 1}
                      </span>
                      <ProductImage
                        pick={p}
                        eager
                        sizes="(min-width: 640px) 350px, 100vw"
                        slotPx={320}
                        className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="signal">{p.badge}</Badge>
                        <Stars rating={p.rating} />
                      </div>
                      {p.handsOnTested && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                          <span aria-hidden>✓</span> Hands-on Tested
                        </span>
                      )}
                      <h3 className="text-lg font-semibold leading-snug">{p.name}</h3>
                      <p className="flex-1 text-sm text-muted leading-6">{p.bottomLine}</p>
                      <Button href={p.ctaHref} className="mt-2 w-full whitespace-nowrap">
                        Check price on Amazon →
                      </Button>
                      <a href={`#${slug(p.name)}`} className="text-center text-xs font-medium text-accent hover:underline">
                        Why we picked it ↓
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {alsoGreat.length > 0 && (
              <Reveal className="mt-8">
                <h3 className="font-display text-xs text-muted uppercase tracking-[0.15em] mb-3">Also great</h3>
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                  {alsoGreat.map((p, j) => {
                    const rank = featured.length + j + 1;
                    return (
                      <li key={p.name} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 transition-colors hover:bg-surface-raised">
                        <span className="w-6 shrink-0 text-center font-display text-sm text-muted">{rank}</span>
                        <a
                          href={`#${slug(p.name)}`}
                          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white border border-border/60 overflow-hidden"
                        >
                          <ProductImage pick={p} sizes="56px" slotPx={56} className="object-contain p-1 transition-transform duration-300 group-hover:scale-110" />
                        </a>
                        <div className="min-w-0 flex-1">
                          <a href={`#${slug(p.name)}`} className="block font-semibold leading-snug hover:text-accent">
                            {p.name}
                          </a>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <Badge variant="signal">{p.badge}</Badge>
                            <span className="hidden sm:inline">
                              <Stars rating={p.rating} />
                            </span>
                          </div>
                        </div>
                        <Button href={p.ctaHref} className="shrink-0 px-3 py-2 text-xs whitespace-nowrap">
                          <span className="hidden sm:inline">Check price</span>
                          <span className="sm:hidden">Price</span> →
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            )}
          </section>

          {/* 2. Quick-shopping comparison table */}
          <section id="full-comparison" className="mt-16 scroll-mt-36">
            <Reveal>
              <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">Quick shopping</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Compare at a glance</h2>
              <p className="mt-2 text-sm text-muted">Swipe sideways on mobile to see every spec.</p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
                <table className="w-full min-w-[44rem] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-raised text-left">
                      <th className="sticky left-0 z-10 bg-surface-raised py-3 pl-4 pr-4 font-display text-xs text-muted uppercase">
                        Model
                      </th>
                      <th className="py-3 pr-4 font-display text-xs text-muted uppercase">Award</th>
                      <th className="py-3 pr-4 font-display text-xs text-muted uppercase">Rating</th>
                      {picks[0]?.specs
                        .filter((s) => s.label !== "Best for")
                        .map((s) => (
                          <th key={s.label} className="py-3 pr-4 font-display text-xs text-muted uppercase">
                            {s.label}
                          </th>
                        ))}
                      <th className="py-3 pr-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {picks.map((p, i) => (
                      <tr
                        key={p.name}
                        className={`border-b border-border last:border-0 transition-colors hover:bg-surface-raised ${i === 0 ? "bg-accent/5" : ""}`}
                      >
                        <td className={`sticky left-0 z-10 py-3 pl-4 pr-4 ${i === 0 ? "bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))]" : "bg-surface"}`}>
                          <a href={`#${slug(p.name)}`} className="flex items-center gap-3 font-medium hover:text-accent">
                            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white border border-border/60 overflow-hidden">
                              <ProductImage pick={p} sizes="40px" slotPx={40} className="object-contain p-0.5" />
                            </span>
                            <span className="leading-snug">
                              <span className="block text-[11px] font-display text-muted">#{i + 1}</span>
                              {p.name}
                              {p.handsOnTested && (
                                <span className="mt-0.5 block text-[10px] font-display uppercase tracking-wide text-accent">✓ Tested</span>
                              )}
                            </span>
                          </a>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="signal">{p.badge}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Stars rating={p.rating} />
                        </td>
                        {picks[0]?.specs
                          .filter((s) => s.label !== "Best for")
                          .map((s) => (
                            <td key={s.label} className="py-3 pr-4 text-muted">
                              <SpecValue value={p.specs.find((x) => x.label === s.label)?.value ?? "—"} />
                            </td>
                          ))}
                        <td className="py-3 pr-4">
                          <Button href={p.ctaHref} className="px-3.5 py-2 text-xs whitespace-nowrap">
                            Check price →
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          {/* 3. Detailed reviews */}
          <section id="picks" className="mt-16 scroll-mt-36">
            <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">In depth</p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Detailed reviews</h2>
            <div className="mt-8 space-y-12">
              {picks.map((p, i) => {
                const reviewHref = reviewHrefFor(p.name);
                const forWho = bestFor(p);
                return (
                  <Reveal key={p.name}>
                    {/* content-visibility: off-screen pick cards skip style, layout and paint
                        until they near the viewport. A roundup renders one per pick (30+), so
                        laying them all out up front was the bulk of its main-thread time.
                        The placeholder heights are the measured median card height per
                        breakpoint; close estimates keep deep links (#pick-name) landing on
                        the card when the page loads with a hash. */}
                    <section
                      id={slug(p.name)}
                      className="scroll-mt-36 rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm [content-visibility:auto] [contain-intrinsic-size:auto_1400px] sm:[contain-intrinsic-size:auto_950px] lg:[contain-intrinsic-size:auto_750px]"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {p.image && (
                          <div className="group shrink-0 w-full sm:w-60 rounded-xl border border-border bg-white overflow-hidden">
                            <div className="relative h-60 flex items-center justify-center overflow-hidden">
                              <ImageLightbox src={p.image} alt={p.name}>
                                <Image
                                  src={productImageSrc(p.image, 360)} unoptimized={skipOptimizer(p.image)}
                                  alt={p.name}
                                  fill
                                  sizes="(min-width: 640px) 240px, 100vw"
                                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                                  loading="lazy"
                                />
                              </ImageLightbox>
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <RankBadge rank={i + 1} />
                            <Badge variant="signal">{p.badge}</Badge>
                            <Stars rating={p.rating} />
                            {p.handsOnTested && <Badge variant="accent">Hands-on Tested</Badge>}
                          </div>
                          <h3 className="mt-3 text-2xl font-semibold">{p.name}</h3>
                          <p className="mt-2 font-medium leading-6">{p.bottomLine}</p>
                          {forWho && (
                            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-signal-bg px-3 py-1 text-xs">
                              <span className="font-medium text-signal">Best for:</span>
                              <span>{forWho}</span>
                            </p>
                          )}
                          <p className="mt-3 text-muted leading-7">{p.verdict}</p>
                          {fitNotes?.[p.name] && (
                            <p className="mt-3 rounded-lg border-l-2 border-accent bg-accent/5 px-4 py-3 text-sm leading-6">
                              <span className="font-medium text-accent">Why it fits: </span>
                              {fitNotes[p.name]}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 grid sm:grid-cols-2 gap-6">
                        <SpecList specs={p.specs} />
                        <ProsCons pros={p.pros} cons={p.cons} />
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
                        <Button href={p.ctaHref}>Check price on Amazon →</Button>
                        {reviewHref && (
                          <Link prefetch={false} href={reviewHref} className="text-sm font-medium text-accent hover:underline">
                            Read the full {p.name} review →
                          </Link>
                        )}
                        <span className="text-xs text-muted sm:ml-auto">Price shown at retailer, may fluctuate.</span>
                      </div>
                    </section>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Buying advice (optional, page-specific) */}
          {advice && advice.length > 0 && (
            <section id="buying-advice" className="mt-16 scroll-mt-36">
              <Reveal>
                <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">Before you buy</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Buying advice</h2>
                <div className="mt-6 space-y-6">
                  {advice.map((a) => (
                    <div key={a.heading}>
                      <h3 className="text-lg font-semibold">{a.heading}</h3>
                      <p className="mt-2 max-w-3xl text-muted leading-7">{a.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          {/* 4. How we chose */}
          {retired.length > 0 && (
            <section className="mt-16 rounded-lg border border-border bg-surface p-5">
              <h2 className="text-lg font-semibold">No longer sold on Amazon</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted leading-6">
                {retired.map((p) => (
                  <li key={p.name}>
                    <span className="font-medium text-foreground">{p.name}:</span> {p.unavailable!.note}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="how-we-chose" className="mt-16 scroll-mt-36">
            <Reveal>
              <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">Methodology</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">How we chose</h2>
              {howWeChose && <p className="mt-3 text-muted leading-7 max-w-3xl">{howWeChose}</p>}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {METHOD.map((m) => (
                  <div key={m.title} className="flex gap-4 rounded-2xl border border-border bg-surface p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-bg text-signal">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d={m.icon} />
                      </svg>
                    </span>
                    <span>
                      <span className="block font-medium">{m.title}</span>
                      <span className="mt-1 block text-sm text-muted leading-6">{m.body}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted leading-6">
                Picks marked &quot;Hands-on Tested&quot; have been bought and tested by us; the rest are desk research. A
                pick only carries that badge once we have actually bought and tested that unit.{" "}
                <Link prefetch={false} href="/about" className="text-accent hover:underline">
                  More on how we research
                </Link>
                .
              </p>
            </Reveal>
          </section>

          {/* 5. FAQ */}
          {faqs.length > 0 && (
            <section id="faq" className="mt-16 scroll-mt-36">
              <Reveal>
                <p className="font-display text-xs text-accent uppercase tracking-[0.15em]">Questions</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">Frequently asked questions</h2>
                <div className="mt-6 space-y-3">
                  {faqs.map((f) => (
                    <details key={f.question} className="group rounded-2xl border border-border bg-surface p-5 open:shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-transform duration-300 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted leading-6">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </Reveal>
            </section>
          )}
        </div>

        {/* Sticky sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <ArticleTocSidebar items={toc} />
            {picks[0] && (
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <p className="font-display text-[11px] text-accent uppercase tracking-[0.15em]">Our top pick</p>
                <div className="relative mt-3 flex h-28 items-center justify-center rounded-xl bg-white border border-border/60 overflow-hidden">
                  <ProductImage pick={picks[0]} sizes="200px" className="object-contain p-2" />
                </div>
                <p className="mt-3 font-semibold leading-snug">{picks[0].name}</p>
                <Stars rating={picks[0].rating} />
                <Button href={picks[0].ctaHref} className="mt-3 w-full px-3 text-xs whitespace-nowrap">
                  Check price on Amazon →
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
