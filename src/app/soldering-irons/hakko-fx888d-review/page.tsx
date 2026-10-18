import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProsCons } from "@/components/ui/ProsCons";
import { SpecList } from "@/components/ui/SpecList";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

const pick = picks.find((p) => p.name === "Hakko FX888D")!;

export const metadata = buildMetadata({
  title: "Hakko FX888D Review",
  description: "A detailed look at the Hakko FX888D's thermal recovery, temperature stability, and tip ecosystem, and who it's actually worth buying for.",
  path: "/soldering-irons/hakko-fx888d-review",
});

export default function HakkoFx888dReviewPage() {
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
        <h1 className="text-3xl sm:text-4xl leading-tight">Hakko FX888D Review</h1>
        <Stars rating={pick.rating} />
      </div>
      <p className="mt-5 text-lg text-muted leading-7">{pick.bottomLine}</p>

      {pick.image && (
        <div className="mt-8 rounded-lg border border-border bg-surface-raised p-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pick.image} alt="Hakko FX888D soldering station" className="max-h-64 object-contain" />
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
            The FX888D fits anyone doing regular electronics work who wants a dedicated bench
            station rather than a basic standalone iron — the fast thermal recovery matters most
            once you&apos;re working thicker joints or repeated repairs, not just the occasional
            single connection.
          </p>
          <p className="mt-3 text-muted leading-7">
            One real caveat worth repeating: counterfeit units exist on third-party marketplaces.
            Buy from Hakko&apos;s authorized sellers or a listing that clearly states it, since a
            counterfeit won&apos;t share the genuine unit&apos;s thermal performance even if it
            looks identical.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How it compares</h2>
          <p className="text-muted leading-7">
            If you&apos;re deciding between the FX888D and a Weller station, see{" "}
            <Link href="/soldering-irons/hakko-fx888d-vs-weller-we1010na" className="text-accent hover:underline">
              Hakko FX888D vs Weller WE1010NA
            </Link>{" "}
            for a direct comparison.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          <Button href={pick.ctaHref}>Check price on Amazon →</Button>
          <Link href="/soldering-irons/best-soldering-irons" className="text-sm font-medium text-accent hover:underline">
            See the full comparison
          </Link>
        </div>
      </div>
    </article>
  );
}
