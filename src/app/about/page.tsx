import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "About OhmSavvy",
  description:
    "Why OhmSavvy exists, how we verify specs and pick products, and how we're funded through Amazon affiliate commissions.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>ABOUT</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">
        A single-niche site for electronics test equipment
      </h1>
      <p className="mt-5 text-lg text-muted leading-7">
        OhmSavvy covers multimeters, soldering irons, oscilloscopes, and the rest of the gear that
        sits on an electronics workbench — nothing else. We&apos;d rather go deep on one category than
        spread thin across unrelated products.
      </p>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">How we pick and verify products</h2>
          <p className="text-muted leading-7">
            Every spec in a comparison — CAT safety ratings, bandwidth, sample rate, True RMS
            support — is checked against the manufacturer&apos;s published datasheet or the product&apos;s
            official Amazon listing, not against marketing copy or a competitor&apos;s article. Where a
            spec is ambiguous or conflicting across sources, we say so rather than guess.
          </p>
          <p className="mt-3 text-muted leading-7">
            We also cross-reference patterns across real verified buyer reviews to catch reliability
            issues that spec sheets alone don&apos;t show. This is desk-based research and verification,
            not physical bench-testing of purchased units — we want to be upfront about that
            distinction rather than imply hands-on lab testing that isn&apos;t happening.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Who writes this</h2>
          <p className="text-muted leading-7">
            Content on OhmSavvy is produced and maintained by the OhmSavvy Research Team. We don&apos;t
            publish fabricated individual author bios or credentials — if a byline ever claims a
            specific professional qualification, it&apos;s because that&apos;s genuinely true.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How rankings work</h2>
          <p className="text-muted leading-7">
            Our picks are never influenced by which brand pays the highest affiliate commission. A
            cheaper product can outrank a more expensive one if the specs and owner feedback say so.
            We don&apos;t accept payment from manufacturers for placement or a favorable review.
          </p>
        </section>

        <section id="how-were-funded">
          <h2 className="text-xl font-semibold mb-3">How we&apos;re funded</h2>
          <p className="text-muted leading-7">
            OhmSavvy is reader-supported. When you buy through a link on this site, we may earn a
            commission from Amazon at no extra cost to you. This is the only way the site makes
            money — there&apos;s no advertising, no sponsored placements, and no paid reviews.
          </p>
        </section>
      </div>
    </article>
  );
}
