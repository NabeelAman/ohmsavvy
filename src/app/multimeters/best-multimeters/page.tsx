import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Multimeters in 2026: Compared by Accuracy, Safety Rating, and Price",
  description:
    "An honest, specification-based comparison of the best digital multimeters in 2026 — covering accuracy, CAT safety ratings, and value across every budget.",
};

type Pick = {
  badge: string;
  name: string;
  rating: number;
  verdict: string;
  specs: { label: string; value: string }[];
  pros: string[];
  cons: string[];
  ctaHref: string;
};

const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Fluke 117",
    rating: 4.8,
    verdict:
      "The Fluke 117 is the meter most working electricians reach for. True RMS readings, non-contact voltage detection, and a CAT III 600V rating make it reliable in real electrical panels, not just hobby projects.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Electricians, serious hobbyists" },
    ],
    pros: ["Trusted, well-documented reliability", "Non-contact voltage (NCV) detection built in", "Durable enough for daily field use"],
    cons: ["Premium price for casual hobbyists", "No Bluetooth/app connectivity"],
    ctaHref: "/go/fluke-117",
  },
  {
    badge: "Best Budget",
    name: "KAIWEETS KM200s",
    rating: 4.5,
    verdict:
      "For under half the price of the Fluke, the KM200s covers the fundamentals well: auto-ranging, True RMS, and a non-contact voltage detector. A sensible first meter for home and hobby use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home use, beginners" },
    ],
    pros: ["Excellent value for the feature set", "Backlit display for low-light use", "Smart auto-ranging simplifies readings"],
    cons: ["Build quality isn't field-tool grade", "Included leads are basic"],
    ctaHref: "/go/kaiweets-km200s",
  },
  {
    badge: "Best for Electronics Hobbyists",
    name: "AstroAI DM6000AR",
    rating: 4.3,
    verdict:
      "This is the meter you'll see recommended most often for Arduino, Raspberry Pi, and general electronics tinkering — accurate enough for low-voltage work, and inexpensive enough not to worry about.",
    specs: [
      { label: "Accuracy", value: "2000-count resolution" },
      { label: "Safety rating", value: "CAT II 600V" },
      { label: "Auto-ranging", value: "Manual ranging" },
      { label: "Best for", value: "Microcontroller & electronics projects" },
    ],
    pros: ["Very affordable entry point", "Compact and lightweight", "Continuity buzzer is fast and reliable"],
    cons: ["Manual ranging has a learning curve", "Not rated for higher-voltage panel work"],
    ctaHref: "/go/astroai-dm6000ar",
  },
  {
    badge: "Best for Electrical Panels",
    name: "Klein Tools MM400",
    rating: 4.6,
    verdict:
      "Klein's MM400 splits the difference between the Fluke and budget options — auto-ranging, True RMS, and a CAT III rating, backed by Klein's reputation among tradespeople.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Tradespeople, home electrical work" },
    ],
    pros: ["Strong reputation for field durability", "Low-impedance mode avoids false readings", "Mid-range price for pro-level features"],
    cons: ["Bulkier than pocket-sized meters", "No app connectivity"],
    ctaHref: "/go/klein-mm400",
  },
];

export default function BestMultimetersPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-display text-sm text-accent mb-3">MULTIMETERS</p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-balance">
        Best Multimeters in 2026
      </h1>
      <p className="mt-5 text-lg text-muted leading-7 max-w-2xl">
        We compared accuracy specifications, CAT safety ratings, and feature sets across the
        multimeters most recommended by electricians, hobbyists, and verified buyer feedback —
        not which ones pay the highest commission.
      </p>

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
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Accuracy</th>
                <th className="py-2 pr-4 font-display text-xs text-muted uppercase">Safety Rating</th>
                <th className="py-2 font-display text-xs text-muted uppercase">Best For</th>
              </tr>
            </thead>
            <tbody>
              {picks.map((p) => (
                <tr key={p.name} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4 text-muted">{p.specs[0].value}</td>
                  <td className="py-3 pr-4 text-muted">{p.specs[1].value}</td>
                  <td className="py-3 text-muted">{p.specs[3].value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl font-semibold mb-5">Frequently asked questions</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-medium">What does a CAT rating mean?</h3>
            <p className="mt-1.5 text-sm text-muted leading-6">
              CAT (Category) ratings indicate how much transient voltage spike a meter is rated to
              safely withstand. CAT III 600V is the standard recommendation for home electrical
              panels and most residential wiring work.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Do I need True RMS?</h3>
            <p className="mt-1.5 text-sm text-muted leading-6">
              True RMS matters if you're measuring non-sinusoidal signals — common with modern
              electronics, variable-speed motors, and dimmer switches. For basic DC continuity
              checks, it's less critical.
            </p>
          </div>
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
