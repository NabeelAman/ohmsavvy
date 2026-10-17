import Link from "next/link";

const featured = [
  {
    href: "/multimeters/best-multimeters",
    category: "Multimeters",
    title: "Best Multimeters in 2026",
    excerpt:
      "We compared accuracy ratings, CAT safety ratings, and auto-ranging across 14 models to find the right meter for every budget.",
    picks: 5,
  },
  {
    href: "/soldering-irons/best-soldering-irons",
    category: "Soldering Irons",
    title: "Best Soldering Irons for Electronics",
    excerpt:
      "From the pocket-sized Pinecil to bench stations like the Hakko FX888D — which one actually fits your workbench.",
    picks: 6,
  },
  {
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    category: "Oscilloscopes",
    title: "Best Oscilloscopes for Beginners",
    excerpt:
      "Bandwidth, sample rate, and channel count explained simply, with picks that won't overwhelm a first-time buyer.",
    picks: 4,
  },
];

const trustPoints = [
  { label: "Specs verified", value: "Every spec cross-checked against manufacturer datasheets" },
  { label: "No pay-for-placement", value: "Rankings are never influenced by affiliate commission rates" },
  { label: "Updated regularly", value: "Reviews revisited as new models and prices change" },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-display text-sm text-accent mb-4 tracking-wide">
            ELECTRONICS TEST EQUIPMENT, COMPARED HONESTLY
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight max-w-2xl text-balance">
            Find the right tool for your workbench, not the one with the biggest ad budget.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted leading-7">
            OhmSavvy breaks down multimeters, soldering irons, and test equipment by the specs
            that actually matter — CAT ratings, accuracy, thermal recovery — so you can buy with
            confidence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold mb-8">Latest comparisons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-border bg-surface p-6 flex flex-col transition-colors hover:border-accent"
            >
              <span className="font-display text-xs text-accent uppercase tracking-wide">
                {item.category}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-2 text-sm text-muted leading-6 flex-1">{item.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted">{item.picks} models compared</span>
                <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                  Read review →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16 grid sm:grid-cols-3 gap-8">
          {trustPoints.map((t) => (
            <div key={t.label}>
              <div className="font-display text-sm text-signal mb-2">{t.label}</div>
              <p className="text-sm text-muted leading-6">{t.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
