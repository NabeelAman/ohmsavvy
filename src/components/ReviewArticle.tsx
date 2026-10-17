import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { ProsCons } from "./ui/ProsCons";
import { RankBadge } from "./ui/RankBadge";
import { SpecList, type Spec } from "./ui/SpecList";
import { SpecValue } from "./ui/SpecValue";
import { Stars } from "./ui/Stars";

export type Pick = {
  badge: string;
  name: string;
  /** Amazon SiteStripe product image URL. Optional until sourced. */
  image?: string;
  rating: number;
  /** One punchy sentence — the verdict in a single line, shown before the full prose. */
  bottomLine: string;
  verdict: string;
  specs: Spec[];
  pros: string[];
  cons: string[];
  ctaHref: string;
};

export type Faq = { question: string; answer: string };

export function ReviewArticle({
  picks,
  faqs,
}: {
  picks: Pick[];
  faqs: Faq[];
}) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Card padding="p-5">
        <p className="font-display text-xs text-muted uppercase tracking-wide mb-3">Jump to a pick</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {picks.map((p, i) => (
            <li key={p.name}>
              <a href={`#${p.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-accent hover:underline">
                #{i + 1} {p.badge}: {p.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 pt-3 border-t border-border text-xs text-muted">
          Specs verified against manufacturer datasheets. We don&apos;t accept payment for placement.
        </p>
      </Card>

      <div className="mt-14 space-y-14">
        {picks.map((p, i) => (
          <section key={p.name} id={p.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row gap-6">
              {p.image && (
                <div className="shrink-0 w-full sm:w-64 rounded-lg border border-border bg-surface shadow-sm overflow-hidden">
                  <div className="h-1.5 bg-accent" />
                  <div className="h-64 flex items-center justify-center bg-gradient-to-b from-surface-raised to-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain scale-125"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <RankBadge rank={i + 1} />
                  <Badge variant="signal">{p.badge}</Badge>
                  <Stars rating={p.rating} />
                </div>
                <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold">{p.name}</h2>
                  <Button href={p.ctaHref}>Check price on Amazon →</Button>
                </div>
                <p className="mt-3 font-medium leading-6 max-w-2xl">{p.bottomLine}</p>
                <p className="mt-2 text-muted leading-7 max-w-2xl">{p.verdict}</p>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <SpecList specs={p.specs} />
              <ProsCons pros={p.pros} cons={p.cons} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={p.ctaHref}>Check price on Amazon →</Button>
              <span className="text-xs text-muted">Price shown at retailer — may fluctuate.</span>
            </div>
          </section>
        ))}
      </div>

      <section id="full-comparison" className="mt-16 rounded-lg border border-border bg-surface-raised p-6 scroll-mt-24">
        <h2 className="text-xl font-semibold mb-4">Full comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">#</th>
                <th className="py-2 pr-4"></th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Model</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Award</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Rating</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">{picks[0]?.specs[0]?.label}</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">{picks[0]?.specs[1]?.label}</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Best For</th>
                <th className="py-2 font-display text-xs text-muted uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {picks.map((p, i) => (
                <tr key={p.name} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 text-muted font-display">{i + 1}</td>
                  <td className="py-3 pr-4">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="w-10 h-10 object-contain rounded border border-border bg-surface" />
                    ) : (
                      <div className="w-10 h-10 rounded border border-border bg-surface" />
                    )}
                  </td>
                  <td className="py-3 pr-4 font-medium">
                    <a href={`#${p.name.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-accent">
                      {p.name}
                    </a>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="signal">{p.badge}</Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Stars rating={p.rating} />
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    <SpecValue value={p.specs[0]?.value ?? ""} />
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    <SpecValue value={p.specs[1]?.value ?? ""} />
                  </td>
                  <td className="py-3 pr-4 text-muted">{p.specs[p.specs.length - 1]?.value}</td>
                  <td className="py-3">
                    <a
                      href={p.ctaHref}
                      className="inline-block rounded-md bg-accent text-accent-foreground px-3 py-1.5 text-xs font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
                    >
                      Check price
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold mb-5">Frequently asked questions</h2>
        <div className="space-y-5">
          {faqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-medium">{f.question}</h3>
              <p className="mt-1.5 text-sm text-muted leading-6">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 pt-6 border-t border-border text-sm text-muted leading-6">
        <p>
          This comparison is based on published manufacturer specifications, safety
          certifications, and patterns in verified buyer feedback. We do not accept payment for
          placement or ranking.
        </p>
      </footer>
    </article>
  );
}
