import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using OhmSavvy's content and affiliate links.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>LEGAL</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Terms of Service</h1>
      <p className="mt-5 text-muted leading-7">Last updated: 2026.</p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">The content on this site</h2>
          <p className="text-muted leading-7">
            OhmSavvy publishes comparison articles and buying guides for electronics test
            equipment. Content is provided for general informational purposes — it&apos;s our
            honest assessment based on published specifications and patterns in verified buyer
            feedback, not a professional recommendation specific to your situation. Always verify a
            product&apos;s specifications and suitability for your use case (especially electrical
            safety ratings like CAT classifications) before purchase and use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Affiliate relationship</h2>
          <p className="text-muted leading-7">
            OhmSavvy is a participant in the Amazon Services LLC Associates Program, an affiliate
            advertising program designed to provide a means for sites to earn advertising fees by
            advertising and linking to Amazon.com. This doesn&apos;t change the price you pay.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">No warranty</h2>
          <p className="text-muted leading-7">
            This site is provided &quot;as is&quot; without warranties of any kind. We make a
            genuine effort to keep specs and prices accurate, but manufacturers change products and
            retailers change prices without notice — confirm current details on the retailer&apos;s
            page before buying.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Limitation of liability</h2>
          <p className="text-muted leading-7">
            OhmSavvy is not liable for any damages arising from the use of this site or reliance on
            its content, including purchase decisions made based on our comparisons.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Intellectual property</h2>
          <p className="text-muted leading-7">
            Text and original graphics on this site are owned by OhmSavvy unless otherwise noted.
            Product names, images, and trademarks belong to their respective manufacturers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes</h2>
          <p className="text-muted leading-7">
            These terms may be updated as the site changes. Continued use of the site after an
            update means you accept the revised terms.
          </p>
        </section>
      </div>
    </article>
  );
}
