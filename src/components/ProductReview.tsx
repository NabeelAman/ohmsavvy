import Link from "next/link";
import type { Category } from "@/lib/content";
import type { Faq, Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Eyebrow } from "./ui/Eyebrow";
import { ProsCons } from "./ui/ProsCons";
import { SpecList } from "./ui/SpecList";
import { Stars } from "./ui/Stars";

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
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Eyebrow>REVIEW · {CATEGORY_LABELS[review.category].toUpperCase()}</Eyebrow>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="shrink-0 w-full sm:w-72 rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
          <div className="h-1.5 bg-accent" />
          <div className="h-72 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface">
            {pick.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pick.image} alt={review.imageAlt} className="w-full h-full object-contain p-6" />
            ) : (
              <span className="px-6 text-center text-xs text-muted">Photo pending manufacturer confirmation</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="signal">{pick.badge}</Badge>
            <Stars rating={pick.rating} />
            {pick.handsOnTested && <Badge variant="accent">Hands-on Tested</Badge>}
          </div>
          <h1 className="mt-3 text-3xl sm:text-4xl leading-tight">{review.heading}</h1>
          <p className="mt-4 text-lg font-medium leading-7">{pick.bottomLine}</p>

          <Card padding="p-5" className="mt-6">
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted">Model</dt>
              <dd className="font-medium">{pick.name}</dd>
              <dt className="text-muted">Category</dt>
              <dd className="font-medium">{review.productType}</dd>
              <dt className="text-muted">Best for</dt>
              <dd className="font-medium">{review.intendedBuyer}</dd>
              <dt className="text-muted">Review status</dt>
              <dd className="font-medium">
                {pick.handsOnTested
                  ? "Hands-on tested by OhmSavvy"
                  : "Desk research: specs cross-checked, not bench-tested"}
              </dd>
            </dl>
          </Card>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href={pick.ctaHref}>Check price on Amazon →</Button>
          </div>
          <p className="mt-3 text-xs text-muted leading-5">
            Disclosure: OhmSavvy earns a commission from qualifying Amazon purchases made through these
            links, at no extra cost to you.{" "}
            <a href="/about#how-were-funded" className="text-accent hover:underline">
              How we&apos;re funded
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-14 space-y-14">
        <section>
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
              <a href="/about" className="text-accent hover:underline">
                How we research
              </a>
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
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button href={pick.ctaHref}>Check price on Amazon →</Button>
            <span className="text-xs text-muted">Affiliate link: we may earn a commission.</span>
          </div>
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
            <Link href={review.roundup.href} className="font-medium text-accent hover:underline">
              {review.roundup.label}
            </Link>
            {review.related.map((r) => (
              <Link key={r.href} href={r.href} className="text-accent hover:underline">
                {r.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
