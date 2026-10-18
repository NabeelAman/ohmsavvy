import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProsCons } from "@/components/ui/ProsCons";
import { SpecList } from "@/components/ui/SpecList";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const pick = picks.find((p) => p.name === "Fluke 117")!;

export const metadata = buildMetadata({
  title: "Fluke 117 Review",
  description: "A detailed look at the Fluke 117's True RMS accuracy, CAT III 600V rating, and NCV detection, and who it's actually worth buying for.",
  path: "/multimeters/fluke-117-review",
});

export default function Fluke117ReviewPage() {
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
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Eyebrow>REVIEW</Eyebrow>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl sm:text-4xl leading-tight">Fluke 117 Review</h1>
        <Stars rating={pick.rating} />
      </div>
      <p className="mt-5 text-lg text-muted leading-7">{pick.bottomLine}</p>

      {pick.image && (
        <div className="mt-8 rounded-lg border border-border bg-surface-raised p-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pick.image} alt="Fluke 117 digital multimeter" className="max-h-64 object-contain" />
        </div>
      )}

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">The verdict</h2>
          <p className="text-muted leading-7">{pick.verdict}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Specifications</h2>
          <SpecList specs={pick.specs} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Reasons to buy and reasons to avoid</h2>
          <ProsCons pros={pick.pros} cons={pick.cons} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Who it&apos;s actually for</h2>
          <p className="text-muted leading-7">
            The Fluke 117&apos;s CAT III 600V rating and True RMS accuracy make it a realistic
            choice for electricians and serious hobbyists doing real electrical work, not just
            casual continuity checks. The built-in non-contact voltage detection adds a fast first
            check before probes even touch a circuit.
          </p>
          <p className="mt-3 text-muted leading-7">
            It&apos;s a harder sell for someone who only needs a meter a few times a year for
            basic home use — the price premium buys safety rating and durability that casual use
            doesn&apos;t fully exercise. For that buyer, see our{" "}
            <Link href="/multimeters/best-multimeter-for-home-use" className="text-accent hover:underline">
              Best Multimeter for Home Use & DIY
            </Link>{" "}
            picks instead.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How it compares</h2>
          <p className="text-muted leading-7">
            If you&apos;re deciding between the 117 and Fluke&apos;s higher-tier option, see{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-87v" className="text-accent hover:underline">
              Fluke 117 vs Fluke 87V
            </Link>{" "}
            for a direct, spec-by-spec comparison.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          <Button href={pick.ctaHref}>Check price on Amazon →</Button>
          <Link href="/multimeters/best-multimeters" className="text-sm font-medium text-accent hover:underline">
            See the full Top 10 comparison
          </Link>
        </div>
      </div>
    </article>
  );
}
