import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecValue } from "@/components/ui/SpecValue";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const a = picks.find((p) => p.name === "Hakko FX888D")!;
const b = picks.find((p) => p.name === "Weller WE1010NA")!;

export const metadata = buildMetadata({
  title: "Hakko FX888D vs Weller WE1010NA",
  description: "A spec-by-spec comparison of the Hakko FX888D and Weller WE1010NA soldering stations — heat-up time, ESD safety, and which fits your bench.",
  path: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
});

export default function HakkoVsWellerPage() {
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
      <h1 className="text-3xl sm:text-4xl leading-tight">Hakko FX888D vs Weller WE1010NA</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        Both are 70W digital soldering stations with strong reputations — the real difference is
        heat-up speed versus ESD-safe construction, and which one matters more for your bench.
      </p>

      <div className="mt-10 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-raised border-b border-border text-left">
              <th className="py-3 px-4 font-display text-xs text-muted uppercase"></th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Hakko FX888D</th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Weller WE1010NA</th>
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
          <h2 className="text-xl font-semibold mb-3">Choose the Hakko FX888D if...</h2>
          <p className="text-muted leading-7">
            You want the fastest heat-up time of the two (~15 seconds vs. ~20), a station with an
            especially wide third-party tip ecosystem, and a price point aimed more at serious
            hobbyists than dedicated professional benches. {a.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Choose the Weller WE1010NA if...</h2>
          <p className="text-muted leading-7">
            You&apos;re working with static-sensitive components regularly and want ESD-safe
            construction built in, or you&apos;re setting up a dedicated professional workbench
            where the slightly longer heat-up time is a non-issue. {b.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The bottom line</h2>
          <p className="text-muted leading-7">
            Both stations deliver genuinely stable temperature control at the same 70W power
            level — this comes down to ESD safety needs and heat-up speed preference more than
            one being objectively better. If you don&apos;t specifically need ESD-safe
            construction, the FX888D&apos;s faster heat-up and wider tip availability make it the
            slightly easier day-to-day tool.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Read the full review</h2>
          <p className="text-muted leading-7">
            See the{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className="text-accent hover:underline">
              full Hakko FX888D review
            </Link>{" "}
            or browse the{" "}
            <Link href="/soldering-irons/best-soldering-irons" className="text-accent hover:underline">
              complete soldering iron comparison
            </Link>{" "}
            for more options.
          </p>
        </section>
      </div>
    </article>
  );
}
