import Link from "@/components/AppLink";
import { ContactForm } from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with OhmSavvy: report a spec error, suggest a product to review, or ask about one of our multimeter, soldering iron or oscilloscope guides.",
  path: "/contact",
});

const REASONS = [
  { title: "Spotted an error?", desc: "Tell us the page and the spec. We check it against the manufacturer's data and correct the page if we got it wrong." },
  { title: "Want a product covered?", desc: "Suggest a multimeter, soldering iron or oscilloscope you'd like us to review or compare." },
  { title: "Brands and PR", desc: "You're welcome to send product information, but we don't sell reviews, placements or ratings." },
];

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>CONTACT</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Contact OhmSavvy</h1>
      <p className="mt-5 text-muted leading-7">
        Questions, corrections and suggestions all reach the OhmSavvy team through the form below. We can&apos;t give
        one-to-one electrical safety advice for a specific installation. For that, please consult a licensed
        electrician.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {REASONS.map((r) => (
          <li key={r.title} className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="text-sm font-semibold">{r.title}</h2>
            <p className="mt-2 text-sm text-muted leading-6">{r.desc}</p>
          </li>
        ))}
      </ul>

      <section className="mt-10 space-y-4 text-muted leading-7">
        <h2 className="text-xl font-semibold text-foreground">Getting the most from your message</h2>
        <p>
          For a correction, include the page address, the spec or statement you think is wrong and, if you have it, a link to
          the manufacturer&apos;s datasheet, manual or product page. Every spec on OhmSavvy is meant to come from the maker or
          the official Amazon listing, so a source from either lets us check and fix the page quickly. Our{" "}
          <Link href="/about" className="text-accent hover:underline">
            about page
          </Link>{" "}
          explains how we review, what the Hands-on Tested badge means and how we rate products.
        </p>
        <p>
          When suggesting a product, give the exact model name, ideally with its Amazon link. We only cover tools that are
          currently sold on Amazon.com, so a suggestion may wait until a model is back in stock.
        </p>
        <p>
          We don&apos;t sell products ourselves. For orders, delivery, returns or warranty claims on something you bought
          through one of our links, please contact Amazon or the seller, or the manufacturer for warranty repairs.
        </p>
      </section>

      <ContactForm />

      <p className="mt-10 text-sm text-muted leading-6">
        Your name, email and message are sent to us through Formspree and used only to reply to you. See our{" "}
        <Link href="/privacy-policy" className="text-accent hover:underline">
          privacy policy
        </Link>{" "}
        for details.
      </p>
    </article>
  );
}
