import Image from "next/image";
import { productImageSrc, skipOptimizer } from "@/lib/images";
import Link from "next/link";
import { comparisonsFor, type Category } from "@/lib/content";
import type { Faq, Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Eyebrow } from "./ui/Eyebrow";
import { ProsCons } from "./ui/ProsCons";
import { SpecList } from "./ui/SpecList";
import { SpecValue } from "./ui/SpecValue";
import { Stars } from "./ui/Stars";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { categoryOfPick, pickByName } from "@/lib/catalog";

export type ReviewLink = { label: string; href: string };
export type ReviewAlternative = { name: string; href: string; reason: string };

export type ProductReviewContent = {
  /** The verified Pick from the category's main article — the only source of product facts on the page. */
  pick: Pick;
  category: Category;
  heading: string;
  /** e.g. "Digital multimeter" — shown in the summary card. */
  productType: string;
  intendedBuyer: string;
  imageAlt: string;
  considerIf: string[];
  skipIf: string[];
  tradeOffs: string;
  assessment: { heading: string; body: string }[];
  alternatives: ReviewAlternative[];
  faqs: Faq[];
  roundup: ReviewLink;
  related: ReviewLink[];
};

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering Irons",
  oscilloscopes: "Oscilloscopes",
};

export function ProductReview({ review }: { review: ProductReviewContent }) {
  const { pick } = review;
  // If Amazon no longer sells this product, buy buttons go to the named alternative (or are hidden).
  const alternative = pick.unavailable?.alternative ? pickByName(pick.unavailable.alternative) : undefined;
  const buyHref = pick.unavailable ? alternative?.ctaHref : pick.ctaHref;
  const buyLabel = pick.unavailable && alternative ? `Check the ${alternative.name} on Amazon →` : "Check price on Amazon →";
  // Hand-picked links first, then every other registered comparison with this product.
  const linked = new Set(review.related.map((r) => r.href));
  const related = [
    ...review.related,
    ...comparisonsFor(pick.name)
      .filter((c) => !linked.has(c.href))
      .map((c) => ({ label: c.title, href: c.href })),
  ];

  // A single editorial Review, never an AggregateRating — same rule as ReviewArticle.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pick.name,
    ...(pick.image ? { image: pick.image } : {}),
    description: pick.bottomLine,
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: pick.rating, bestRating: "5" },
      author: { "@type": "Organization", name: "OhmSavvy" },
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-6 pt-16 pb-28 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Eyebrow>REVIEW · {CATEGORY_LABELS[review.category].toUpperCase()}</Eyebrow>

      <h1 className="text-3xl sm:text-4xl leading-tight">{review.heading}</h1>
      <p className="mt-4 text-lg text-muted leading-7 max-w-3xl">{pick.bottomLine}</p>

      {/* Product box: the at-a-glance summary and primary Amazon CTA, directly under the title. */}
      <div className="mt-8 rounded-xl border-2 border-accent/40 bg-surface shadow-md overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-accent/10 border-b border-border">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="signal">{pick.badge}</Badge>
            {pick.handsOnTested && <Badge variant="accent">Hands-on Tested</Badge>}
          </div>
          <Stars rating={pick.rating} />
        </div>

        <div className="grid md:grid-cols-[240px_1fr_250px]">
          <div className="h-56 md:h-auto min-h-56 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface border-b md:border-b-0 md:border-r border-border">
            {pick.image ? (
              // Fixed-height grid cell varies with its sibling columns (md:h-auto
              // matches whatever height the spec table ends up), so `fill` mode
              // (which needs a definitely-sized parent) doesn't fit here — intrinsic
              // width/height plus CSS sizing is next/image's documented approach for
              // exactly this case. This is the ProductReview hero — the LCP element
              // on individual review pages — hence `priority`, not lazy.
              <Image
                src={productImageSrc(pick.image, 400)} unoptimized={skipOptimizer(pick.image)}
                alt={review.imageAlt}
                width={480}
                height={480}
                priority
                className="w-full h-full max-h-64 object-contain p-3"
              />
            ) : (
              <span className="relative block h-64 w-full">
                <PhotoPlaceholder category={categoryOfPick(pick.name)} size="md" />
              </span>
            )}
          </div>

          <table className="w-full text-sm self-center">
            <caption className="sr-only">{pick.name} at a glance</caption>
            <tbody>
              <tr className="border-b border-border">
                <th scope="row" className="py-2.5 px-5 text-left font-normal text-muted">Model</th>
                <td className="py-2.5 px-5 font-semibold">{pick.name}</td>
              </tr>
              {pick.specs
                .filter((s) => s.label !== "Best for")
                .map((s) => (
                  <tr key={s.label} className="border-b border-border">
                    <th scope="row" className="py-2.5 px-5 text-left font-normal text-muted">{s.label}</th>
                    <td className="py-2.5 px-5 font-medium"><SpecValue value={s.value} /></td>
                  </tr>
                ))}
              <tr className="border-b border-border">
                <th scope="row" className="py-2.5 px-5 text-left font-normal text-muted">Best for</th>
                <td className="py-2.5 px-5 font-medium">{review.intendedBuyer}</td>
              </tr>
              <tr>
                <th scope="row" className="py-2.5 px-5 text-left font-normal text-muted">Review status</th>
                <td className="py-2.5 px-5 text-muted">
                  {pick.handsOnTested ? "Hands-on tested by OhmSavvy" : "Desk research, not bench-tested"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col justify-center gap-3 p-5 border-t md:border-t-0 md:border-l border-border bg-surface-raised">
            {pick.unavailable && (
              <p className="text-sm text-foreground leading-6">
                <span className="font-semibold">No longer sold on Amazon.</span> {pick.unavailable.note}
              </p>
            )}
            {buyHref && (
              <Button href={buyHref} className="w-full py-3 text-base shadow-sm">
                {buyLabel}
              </Button>
            )}
            <p className="text-xs text-muted text-center leading-5">Current price and availability shown on Amazon</p>
            <a href="#verdict" className="text-sm font-medium text-accent text-center hover:underline">
              Read our verdict ↓
            </a>
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted leading-5">
        Disclosure: OhmSavvy earns a commission from qualifying Amazon purchases made through these links,
        at no extra cost to you.{" "}
        <Link prefetch={false} href="/about#how-were-funded" className="text-accent hover:underline">
          How we&apos;re funded
        </Link>
        .
      </p>

      <div className="mt-14 space-y-14">
        <section id="verdict" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold mb-4">The verdict</h2>
          <p className="text-muted leading-7">{pick.verdict}</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Card padding="p-5">
              <p className="font-display text-xs text-signal uppercase tracking-wide mb-3">Consider it if</p>
              <ul className="space-y-2 text-sm">
                {review.considerIf.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-signal">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card padding="p-5">
              <p className="font-display text-xs text-accent uppercase tracking-wide mb-3">Skip it if</p>
              <ul className="space-y-2 text-sm">
                {review.skipIf.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">✕</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <p className="mt-6 text-muted leading-7">
            <span className="font-medium text-foreground">The trade-off: </span>
            {review.tradeOffs}
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key specifications</h2>
            <SpecList specs={pick.specs} />
            <p className="mt-3 text-xs text-muted leading-5">
              Checked against the manufacturer&apos;s official product page or datasheet and the official
              Amazon listing when this model was added to our guide.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Strengths and limitations</h2>
            <Card padding="p-5">
              <ProsCons pros={pick.pros} cons={pick.cons} />
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Performance assessment</h2>
          {!pick.handsOnTested && (
            <p className="mb-6 text-xs text-muted leading-5">
              We haven&apos;t bench-tested this unit. This assessment is based on its published
              specifications and on what those specifications mean in practice.{" "}
              <Link prefetch={false} href="/about" className="text-accent hover:underline">
                How we research
              </Link>
              .
            </p>
          )}
          <div className="space-y-6">
            {review.assessment.map((a) => (
              <div key={a.heading}>
                <h3 className="text-lg font-semibold mb-2">{a.heading}</h3>
                <p className="text-muted leading-7">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Alternatives to consider</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {review.alternatives.map((alt) => (
              <Link
                prefetch={false}
                key={alt.href}
                href={alt.href}
                className="rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium">{alt.name}</p>
                <p className="mt-1 text-sm text-muted leading-6">{alt.reason}</p>
              </Link>
            ))}
          </div>
        </section>

        <Card raised>
          <h2 className="text-xl font-semibold">Where to buy the {pick.name}</h2>
          <p className="mt-2 text-sm text-muted leading-6">
            We link to the official Amazon listing. Prices change often, so check the current price at
            the retailer before you buy.
          </p>
          {pick.unavailable && <p className="mt-2 text-sm text-muted leading-6">{pick.unavailable.note}</p>}
          {buyHref && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button href={buyHref}>{buyLabel}</Button>
            </div>
          )}
        </Card>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {review.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-lg border border-border bg-surface p-5">
                <summary className="cursor-pointer font-medium list-none flex justify-between gap-4">
                  {faq.question}
                  <span className="text-accent group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-6">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pt-8 border-t border-border">
          <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">Related</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link prefetch={false} href={review.roundup.href} className="font-medium text-accent hover:underline">
              {review.roundup.label}
            </Link>
            {related.map((r) => (
              <Link prefetch={false} key={r.href} href={r.href} className="text-accent hover:underline">
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
      {/* Mobile-only sticky CTA so the Amazon link stays in reach on long reviews. */}
      <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{pick.name}</p>
          <Stars rating={pick.rating} />
        </div>
        {buyHref && (
          <Button href={buyHref} className="shrink-0">
            {pick.unavailable ? "See alternative →" : "Check price →"}
          </Button>
        )}
      </div>
    </article>
  );
}
