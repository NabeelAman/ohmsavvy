import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecValue } from "@/components/ui/SpecValue";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-multimeters/page";

const a = picks.find((p) => p.name === "Fluke 117")!;
const b = picks.find((p) => p.name === "Fluke 87V")!;

export const metadata: Metadata = {
  title: "Fluke 117 vs Fluke 87V",
  description:
    "A spec-by-spec comparison of the Fluke 117 and Fluke 87V — CAT rating, resolution, and which one actually fits daily professional use.",
  alternates: { canonical: "/multimeters/fluke-117-vs-fluke-87v" },
};

export default function Fluke117VsFluke87VPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [a, b].map((p, i) => ({
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
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Eyebrow>COMPARISON</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Fluke 117 vs Fluke 87V</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        Both are True RMS, CAT III-rated Fluke meters — the difference is how much safety margin
        and resolution you actually need, and whether you&apos;ll use it enough to justify the
        87V&apos;s premium over the 117.
      </p>

      <div className="mt-10 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-raised border-b border-border text-left">
              <th className="py-3 px-4 font-display text-xs text-muted uppercase"></th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Fluke 117</th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Fluke 87V</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4 text-muted">Rating</td>
              <td className="py-3 px-4"><Stars rating={a.rating} /></td>
              <td className="py-3 px-4"><Stars rating={b.rating} /></td>
            </tr>
            {a.specs.map((spec, i) => (
              <tr key={spec.label} className="border-b border-border last:border-0">
                <td className="py-3 px-4 text-muted">{spec.label}</td>
                <td className="py-3 px-4 font-medium"><SpecValue value={spec.value} /></td>
                <td className="py-3 px-4 font-medium"><SpecValue value={b.specs[i]?.value ?? ""} /></td>
              </tr>
            ))}
            <tr>
              <td className="py-3 px-4"></td>
              <td className="py-3 px-4">
                <Button href={a.ctaHref}>Check price →</Button>
              </td>
              <td className="py-3 px-4">
                <Button href={b.ctaHref}>Check price →</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">Choose the Fluke 117 if...</h2>
          <p className="text-muted leading-7">
            You want Fluke&apos;s reliability and accuracy at a lower price point, you&apos;re
            primarily working CAT III 600V environments (standard panels and branch circuits),
            and you don&apos;t need the 87V&apos;s higher-resolution display mode or CAT IV
            rating. {a.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Choose the Fluke 87V if...</h2>
          <p className="text-muted leading-7">
            You need the CAT IV 600V rating for service-entrance or utility-adjacent work, you
            want the 19,999-count high-resolution mode for finer readings, or you&apos;re tracking
            fast-changing signals where the 87V&apos;s analog bar graph genuinely helps.{" "}
            {b.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The bottom line</h2>
          <p className="text-muted leading-7">
            Both meters share the same core True RMS accuracy and Fluke build quality — the 87V&apos;s
            extra cost buys a higher CAT rating and finer resolution, not a fundamentally different
            measurement experience. If your work genuinely touches CAT IV environments or you need
            that resolution, the 87V earns its price. Otherwise, the 117 is the more
            practical buy for the vast majority of electrical and electronics work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Read the full reviews</h2>
          <p className="text-muted leading-7">
            See the{" "}
            <Link href="/multimeters/fluke-117-review" className="text-accent hover:underline">
              full Fluke 117 review
            </Link>{" "}
            or browse the{" "}
            <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
              complete Top 10 multimeter comparison
            </Link>{" "}
            for more options.
          </p>
        </section>
      </div>
    </article>
  );
}
