import Link from "next/link";
import type { Category } from "@/lib/content";
import type { ReviewLink } from "./ProductReview";
import type { Faq, Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Eyebrow } from "./ui/Eyebrow";
import { SpecValue } from "./ui/SpecValue";
import { Stars } from "./ui/Stars";

export type ComparisonSide = {
  /** Verified Pick from the category's main article — the only source of product facts. */
  pick: Pick;
  reviewHref: string;
  imageAlt: string;
  chooseIf: string[];
};

export type ProductComparisonContent = {
  category: Category;
  heading: string;
  intro: string;
  a: ComparisonSide;
  b: ComparisonSide;
  differences: string[];
  bottomLine: string;
  faqs: Faq[];
  roundup: ReviewLink;
  related: ReviewLink[];
};

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering Irons",
  oscilloscopes: "Oscilloscopes",
};

function ProductCard({ side }: { side: ComparisonSide }) {
  const { pick } = side;
  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden flex flex-col">
      <div className="h-1.5 bg-accent" />
      <div className="h-52 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface">
        {pick.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pick.image} alt={side.imageAlt} className="w-full h-full object-contain p-6" />
        ) : (
          <span className="px-6 text-center text-xs text-muted">Photo pending manufacturer confirmation</span>
        )}
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">{pick.badge}</Badge>
          {pick.handsOnTested && <Badge variant="accent">Hands-on Tested</Badge>}
        </div>
        <p className="text-lg font-semibold">{pick.name}</p>
        <Stars rating={pick.rating} />
        <p className="text-sm text-muted leading-6 flex-1">{pick.bottomLine}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button href={pick.ctaHref}>Check price →</Button>
          <Link href={side.reviewHref} className="text-sm font-medium text-accent hover:underline">
            Full review
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProductComparison({ comparison }: { comparison: ProductComparisonContent }) {
  const { a, b } = comparison;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [a.pick, b.pick].map((p, i) => ({
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

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Eyebrow>COMPARISON · {CATEGORY_LABELS[comparison.category].toUpperCase()}</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">{comparison.heading}</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-3xl">{comparison.intro}</p>
      <p className="mt-4 text-xs text-muted leading-5">
        Disclosure: OhmSavvy earns a commission from qualifying Amazon purchases made through these links,
        at no extra cost to you.{" "}
        <a href="/about#how-were-funded" className="text-accent hover:underline">
          How we&apos;re funded
        </a>
        .
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <ProductCard side={a} />
        <ProductCard side={b} />
      </div>

      <div className="mt-14 space-y-14">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Specs side by side</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-raised border-b border-border text-left">
                  <th className="py-3 px-4 font-display text-xs text-muted uppercase"></th>
                  <th className="py-3 px-4 font-display text-xs text-muted uppercase">{a.pick.name}</th>
                  <th className="py-3 px-4 font-display text-xs text-muted uppercase">{b.pick.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4 text-muted">Rating</td>
                  <td className="py-3 px-4"><Stars rating={a.pick.rating} /></td>
                  <td className="py-3 px-4"><Stars rating={b.pick.rating} /></td>
                </tr>
                {a.pick.specs.map((spec, i) => (
                  <tr key={spec.label} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-muted">{spec.label}</td>
                    <td className="py-3 px-4 font-medium"><SpecValue value={spec.value} /></td>
                    <td className="py-3 px-4 font-medium"><SpecValue value={b.pick.specs[i]?.value ?? ""} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted leading-5">
            Specs checked against manufacturer documentation and official Amazon listings. Desk research,
            not bench testing.{" "}
            <a href="/about" className="text-accent hover:underline">
              How we research
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key differences</h2>
          <ul className="space-y-3">
            {comparison.differences.map((d) => (
              <li key={d} className="flex gap-3 text-muted leading-7">
                <span className="text-accent font-display">→</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          {[a, b].map((side) => (
            <Card key={side.pick.name} padding="p-5">
              <h2 className="text-lg font-semibold mb-3">Choose the {side.pick.name} if…</h2>
              <ul className="space-y-2 text-sm">
                {side.chooseIf.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-signal">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        <Card raised>
          <h2 className="text-xl font-semibold mb-3">The bottom line</h2>
          <p className="text-muted leading-7">{comparison.bottomLine}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href={a.pick.ctaHref}>{a.pick.name} on Amazon →</Button>
            <Button href={b.pick.ctaHref}>{b.pick.name} on Amazon →</Button>
          </div>
        </Card>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {comparison.faqs.map((faq) => (
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
            <Link href={comparison.roundup.href} className="font-medium text-accent hover:underline">
              {comparison.roundup.label}
            </Link>
            {comparison.related.map((r) => (
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
