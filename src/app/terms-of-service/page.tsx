import Link from "@/components/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms for using OhmSavvy: how you may use our guides and reviews, how our Amazon affiliate links work, and the limits of the advice we publish.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>LEGAL</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Terms of Service</h1>
      <p className="mt-5 text-muted leading-7">Last updated: November 2026.</p>

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
          <p className="mt-3 text-muted leading-7">
            As an Amazon Associate we earn from qualifying purchases. Commission never decides which products we cover, how
            we rate them or where they rank, and no brand can pay for a review, a placement or a rating. We may also show
            display ads from Google, which are labelled as ads and kept separate from our recommendations. Details of the
            cookies these links and ads use are in our{" "}
            <Link href="/privacy-policy" className="text-accent hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Purchases</h2>
          <p className="text-muted leading-7">
            OhmSavvy doesn&apos;t sell products. When you follow a link and buy, the sale is between you and Amazon or the
            seller, under their terms. Orders, delivery, returns and warranty claims are handled by them and by the
            manufacturer, not by us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Accuracy and corrections</h2>
          <p className="text-muted leading-7">
            Product specifications on this site are taken from the manufacturer&apos;s own documentation or the official
            Amazon listing. Where those sources disagree, or a figure isn&apos;t published, we say so on the page. Products
            marked Hands-on Tested have been used on our own bench; other reviews are based on published data and owner
            feedback, and say so. Prices and availability change often, so the price and stock shown on Amazon at the time of
            purchase is the one that applies. If you find an error, please tell us through our{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact page
            </Link>{" "}
            and we&apos;ll check it and correct the page. How we review is described on our{" "}
            <Link href="/about" className="text-accent hover:underline">
              about page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Safety</h2>
          <p className="text-muted leading-7">
            Guides on this site involve electricity, heat and sometimes mains or high voltage. Follow the manufacturer&apos;s
            instructions and ratings for your tools, use equipment rated for the circuit you are working on, and call a
            licensed electrician for work on building wiring or anything you aren&apos;t sure is safe.
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
