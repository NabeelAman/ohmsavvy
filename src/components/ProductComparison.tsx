import Image from "next/image";
import { skipOptimizer } from "@/lib/images";
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
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { categoryOfPick, pickByName } from "@/lib/catalog";

export type ComparisonSide = {
  /** Verified Pick from the category's main article — the only source of product facts. */
  pick: Pick;
  /** Omit when the product has no review page yet; the card then links nowhere extra. */
  reviewHref?: string;
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
  /** Canonical path; enables visible breadcrumbs and BreadcrumbList schema. */
  path?: string;
  /** ISO dates (YYYY-MM-DD) for the byline and Article schema. */
  published?: string;
  updated?: string;
  /** Extra rows for the spec table, beyond the Pick's own specs. Each value must come from a verified source. */
  extraSpecs?: { label: string; a: string; b: string }[];
  /** Optional page-specific sections (charts, diagrams, prose) shown after the key differences. */
  sections?: React.ReactNode;
};

const SITE = "https://ohmsavvy.com";
const CATEGORY_HUB: Record<Category, string> = {
  multimeters: "/multimeters/best-multimeters",
  "soldering-irons": "/soldering-irons/best-soldering-irons",
  oscilloscopes: "/oscilloscopes/best-beginner-oscilloscopes",
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering Irons",
  oscilloscopes: "Oscilloscopes",
};

/** Buy link for a side: the pick's own listing, or its alternative's if Amazon no longer sells it. */
function buyLink(pick: Pick): { href?: string; label: string } {
  if (!pick.unavailable) return { href: pick.ctaHref, label: `${pick.name} on Amazon →` };
  const alt = pick.unavailable.alternative ? pickByName(pick.unavailable.alternative) : undefined;
  return { href: alt?.ctaHref, label: alt ? `${alt.name} on Amazon →` : "" };
}

function ProductCard({ side }: { side: ComparisonSide }) {
  const { pick } = side;
  const buy = buyLink(pick);
  return (
    <div className="rounded-lg border border-border bg-surface shadow-sm overflow-hidden flex flex-col">
      <div className="h-1.5 bg-accent" />
      <div className="relative h-52 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface">
        {pick.image ? (
          // These 2 cards are the comparison page's hero content, near the top —
          // same LCP treatment as ReviewArticle's top-3 picks.
          <Image
            src={pick.image} unoptimized={skipOptimizer(pick.image)}
            alt={side.imageAlt}
            fill
            sizes="(min-width: 640px) 350px, 100vw"
            priority
            className="object-contain p-6"
          />
        ) : (
          <PhotoPlaceholder category={categoryOfPick(pick.name)} size="md" />
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
        {pick.unavailable && (
          <p className="text-xs text-foreground leading-5">
            <span className="font-semibold">No longer sold on Amazon.</span> {pick.unavailable.note}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          {buy.href && <Button href={buy.href}>{pick.unavailable ? buy.label : "Check price →"}</Button>}
          {side.reviewHref && (
            <Link href={side.reviewHref} className="text-sm font-medium text-accent hover:underline">
              Full review
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductComparison({ comparison }: { comparison: ProductComparisonContent }) {
  const { a, b } = comparison;

  const itemList = {
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
  const url = comparison.path ? `${SITE}${comparison.path}` : undefined;
  const hub = CATEGORY_HUB[comparison.category];
  const graph: Record<string, unknown>[] = [itemList];
  if (url) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: CATEGORY_LABELS[comparison.category], item: `${SITE}${hub}` },
        { "@type": "ListItem", position: 3, name: comparison.heading, item: url },
      ],
    });
  }
  if (url && comparison.published) {
    graph.push({
      "@type": "Article",
      headline: comparison.heading,
      description: comparison.intro,
      url,
      mainEntityOfPage: url,
      ...(a.pick.image || b.pick.image ? { image: [a.pick.image, b.pick.image].filter(Boolean) } : {}),
      datePublished: comparison.published,
      dateModified: comparison.updated ?? comparison.published,
      author: { "@type": "Organization", name: "OhmSavvy Research Team", url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: "OhmSavvy", url: SITE },
    });
  }
  if (comparison.faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: comparison.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {url && (
        <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={hub} className="hover:text-accent transition-colors">{CATEGORY_LABELS[comparison.category]}</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-foreground">{comparison.heading}</li>
          </ol>
        </nav>
      )}
      <Eyebrow>COMPARISON · {CATEGORY_LABELS[comparison.category].toUpperCase()}</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">{comparison.heading}</h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-3xl">{comparison.intro}</p>
      {comparison.published && (
        <p className="mt-4 text-xs text-muted">
          By the <Link href="/about" className="underline underline-offset-2 hover:text-accent">OhmSavvy Research Team</Link>
          {" · "}
          <time dateTime={comparison.updated ?? comparison.published}>Updated {formatDate(comparison.updated ?? comparison.published)}</time>
        </p>
      )}
      <p className="mt-4 text-xs text-muted leading-5">
        Disclosure: OhmSavvy earns a commission from qualifying Amazon purchases made through these links,
        at no extra cost to you.{" "}
        <Link href="/about#how-were-funded" className="text-accent hover:underline">
          How we&apos;re funded
        </Link>
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
                {comparison.extraSpecs?.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-muted">{row.label}</td>
                    <td className="py-3 px-4 font-medium"><SpecValue value={row.a} /></td>
                    <td className="py-3 px-4 font-medium"><SpecValue value={row.b} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted leading-5">
            Specs checked against manufacturer documentation and official Amazon listings.{" "}
            {a.pick.handsOnTested && b.pick.handsOnTested
              ? "Both products hands-on tested by OhmSavvy."
              : a.pick.handsOnTested || b.pick.handsOnTested
                ? `${(a.pick.handsOnTested ? a : b).pick.name} is hands-on tested by OhmSavvy; the ${(a.pick.handsOnTested ? b : a).pick.name} assessment is desk research.`
                : "Desk research, not bench testing."}{" "}
            <Link href="/about" className="text-accent hover:underline">
              How we research
            </Link>
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

        {comparison.sections}

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
            {[a, b].map((side) => {
              const buy = buyLink(side.pick);
              return buy.href ? (
                <Button key={side.pick.name} href={buy.href}>
                  {buy.label}
                </Button>
              ) : null;
            })}
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
