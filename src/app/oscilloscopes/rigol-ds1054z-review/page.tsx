import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProsCons } from "@/components/ui/ProsCons";
import { SpecList } from "@/components/ui/SpecList";
import { Stars } from "@/components/ui/Stars";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const pick = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Rigol DS1054Z Review",
  description: "A detailed look at the Rigol DS1054Z's bandwidth, 4-channel design, and sample rate, and who it's actually worth buying for.",
  path: "/oscilloscopes/rigol-ds1054z-review",
});

export default function RigolDs1054zReviewPage() {
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
        <h1 className="text-3xl sm:text-4xl leading-tight">Rigol DS1054Z Review</h1>
        <Stars rating={pick.rating} />
      </div>
      <p className="mt-5 text-lg text-muted leading-7">{pick.bottomLine}</p>

      {pick.image && (
        <div className="mt-8 rounded-lg border border-border bg-surface-raised p-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pick.image} alt="Rigol DS1054Z oscilloscope" className="max-h-64 object-contain" />
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
            The DS1054Z fits hobbyists, students, and general electronics work where 4 channels
            and 50MHz of bandwidth cover the overwhelming majority of what you&apos;ll actually
            measure — microcontroller signals, audio-range work, general digital debugging.
          </p>
          <p className="mt-3 text-muted leading-7">
            It&apos;s a weaker fit for RF work or anything needing bandwidth well beyond 50MHz —
            for that, step up to a higher-bandwidth instrument rather than expecting this one to
            stretch past its rated range.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How it compares</h2>
          <p className="text-muted leading-7">
            If you&apos;re deciding between the DS1054Z and Siglent&apos;s step-up option, see{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className="text-accent hover:underline">
              Rigol DS1054Z vs Siglent SDS1104X-E
            </Link>{" "}
            for a direct comparison.
          </p>
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
          <Button href={pick.ctaHref}>Check price on Amazon →</Button>
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="text-sm font-medium text-accent hover:underline">
            See the full comparison
          </Link>
        </div>
      </div>
    </article>
  );
}
