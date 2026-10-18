import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecValue } from "@/components/ui/SpecValue";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-beginner-oscilloscopes/page";

const a = picks.find((p) => p.name === "Rigol DS1054Z")!;
const b = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata: Metadata = {
  title: "Rigol DS1054Z vs Siglent SDS1104X-E",
  description:
    "A spec-by-spec comparison of the Rigol DS1054Z and Siglent SDS1104X-E oscilloscopes — bandwidth, sample rate, and which fits your projects.",
  alternates: { canonical: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
};

export default function RigolVsSiglentPage() {
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
      <h1 className="text-3xl sm:text-4xl leading-tight">Rigol DS1054Z vs Siglent SDS1104X-E</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        Both are 4-channel, 1 GSa/s scopes aimed at the same general audience — the real
        difference is bandwidth headroom and price, and whether you&apos;ll actually use the
        extra 50MHz the Siglent offers.
      </p>

      <div className="mt-10 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-raised border-b border-border text-left">
              <th className="py-3 px-4 font-display text-xs text-muted uppercase"></th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Rigol DS1054Z</th>
              <th className="py-3 px-4 font-display text-xs text-muted uppercase">Siglent SDS1104X-E</th>
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
          <h2 className="text-xl font-semibold mb-3">Choose the Rigol DS1054Z if...</h2>
          <p className="text-muted leading-7">
            You want the lower-cost entry point into 4-channel scopes, 50MHz covers your actual
            signal work (general electronics, microcontrollers, audio-range), and you value the
            DS1054Z&apos;s large community and documentation base. {a.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Choose the Siglent SDS1104X-E if...</h2>
          <p className="text-muted leading-7">
            You expect your projects to get more demanding over time and want the bandwidth
            headroom now rather than upgrading later, or you prefer Siglent&apos;s interface.{" "}
            {b.bottomLine}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">The bottom line</h2>
          <p className="text-muted leading-7">
            Channel count and sample rate are identical between these two — the decision really
            comes down to the 50MHz vs. 100MHz bandwidth gap and whether that headroom is worth
            the Siglent&apos;s higher price for your actual signal work. For pure beginners doing
            general electronics, the DS1054Z remains the more practical first scope.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Read the full review</h2>
          <p className="text-muted leading-7">
            See the{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className="text-accent hover:underline">
              full Rigol DS1054Z review
            </Link>{" "}
            or browse the{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="text-accent hover:underline">
              complete oscilloscope comparison
            </Link>{" "}
            for more options.
          </p>
        </section>
      </div>
    </article>
  );
}
