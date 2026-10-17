export type Pick = {
  badge: string;
  name: string;
  rating: number;
  verdict: string;
  specs: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  ctaHref: string;
};

export type Faq = { question: string; answer: string };

export function ReviewArticle({
  category,
  title,
  intro,
  picks,
  faqs,
}: {
  category: string;
  title: string;
  intro: string;
  picks: Pick[];
  faqs: Faq[];
}) {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-display text-sm text-accent mb-3">{category.toUpperCase()}</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-balance">
        {title}
      </h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-2xl">{intro}</p>

      <nav className="mt-10 rounded-lg border border-border bg-surface p-5">
        <p className="font-display text-xs text-muted uppercase tracking-wide mb-3">Jump to a pick</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {picks.map((p) => (
            <li key={p.name}>
              <a href={`#${p.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-accent hover:underline">
                {p.badge}: {p.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-14 space-y-14">
        {picks.map((p) => (
          <section key={p.name} id={p.name.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-xs uppercase tracking-wide bg-signal-bg text-signal px-2.5 py-1 rounded">
                {p.badge}
              </span>
              <span className="font-display text-sm text-accent">{p.rating.toFixed(1)} / 5</span>
            </div>
            <h2 className="font-display text-2xl font-semibold mt-3">{p.name}</h2>
            <p className="mt-3 text-muted leading-7 max-w-2xl">{p.verdict}</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <dl className="rounded-lg border border-border bg-surface p-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm h-fit">
                {p.specs.map((s) => (
                  <div key={s.label} className="contents">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="font-medium text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-display text-xs text-signal uppercase tracking-wide mb-1.5">Reasons to buy</p>
                  <ul className="space-y-1.5">
                    {p.pros.map((pro) => (
                      <li key={pro} className="flex gap-2">
                        <span className="text-signal">+</span>
                        <span className="text-muted">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-display text-xs text-accent uppercase tracking-wide mb-1.5">Reasons to avoid</p>
                  <ul className="space-y-1.5">
                    {p.cons.map((con) => (
                      <li key={con} className="flex gap-2">
                        <span className="text-accent">−</span>
                        <span className="text-muted">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href={p.ctaHref}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Check price →
            </a>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-lg border border-border bg-surface-raised p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Full comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Model</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">{picks[0]?.specs[0]?.label}</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">{picks[0]?.specs[1]?.label}</th>
                <th className="py-2 font-display text-xs text-muted uppercase">Best For</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((p) => (
                <tr key={p.name} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-muted">{p.specs[0]?.value}</td>
                  <td className="py-3 pr-4 text-muted">{p.specs[1]?.value}</td>
                  <td className="py-3 text-muted">{p.specs[p.specs.length - 1]?.value}</td>
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
