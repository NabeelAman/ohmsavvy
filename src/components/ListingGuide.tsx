import Link from "@/components/AppLink";
import { FaqAccordion } from "./FaqAccordion";
import { Eyebrow } from "./ui/Eyebrow";

// Guide content under a /<category>/reviews or /<category>/comparisons card grid:
// what to look for, how OhmSavvy reviews, related reading and a short FAQ.
// The prose lives in each page.tsx (so check-uniqueness and the link checker
// see it); this component only lays it out.

export function ListingGuide({
  chooseTitle,
  chooseIntro,
  criteria,
  processTitle,
  process,
  related,
  faqs,
}: {
  chooseTitle: string;
  chooseIntro: React.ReactNode;
  criteria: { title: string; body: React.ReactNode }[];
  processTitle: string;
  process: React.ReactNode[];
  related: { href: string; label: string; note: string }[];
  faqs: { q: string; a: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 space-y-16">
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}

      <section aria-labelledby="how-to-choose">
        <Eyebrow>HOW TO CHOOSE</Eyebrow>
        <h2 id="how-to-choose" className="text-2xl sm:text-3xl font-semibold leading-tight">
          {chooseTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-muted leading-7">{chooseIntro}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted leading-6">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-we-review" className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div>
          <Eyebrow>OUR PROCESS</Eyebrow>
          <h2 id="how-we-review" className="text-2xl sm:text-3xl font-semibold leading-tight">
            {processTitle}
          </h2>
          <div className="mt-4 space-y-4 text-muted leading-7">
            {process.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm self-start">
          <h3 className="font-semibold">Read next</h3>
          <ul className="mt-3 divide-y divide-border">
            {related.map((r) => (
              <li key={r.href} className="py-3">
                <Link href={r.href} className="font-medium text-accent hover:underline">
                  {r.label}
                </Link>
                <p className="mt-1 text-sm text-muted leading-6">{r.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="faq">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq" className="mb-6 text-2xl sm:text-3xl font-semibold leading-tight">
            Common questions
          </h2>
          <FaqAccordion items={faqs} />
        </section>
      )}
    </div>
  );
}
