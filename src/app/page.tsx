import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stars } from "@/components/ui/Stars";

const featured = [
  {
    href: "/multimeters/best-multimeters",
    category: "Multimeters",
    title: "Best Multimeters in 2026",
    excerpt:
      "We compared accuracy ratings, CAT safety ratings, and auto-ranging across 14 models to find the right meter for every budget.",
    picks: 5,
    topPick: "Fluke 117",
    rating: 4.8,
  },
  {
    href: "/soldering-irons/best-soldering-irons",
    category: "Soldering Irons",
    title: "Best Soldering Irons for Electronics",
    excerpt:
      "From the pocket-sized Pinecil to bench stations like the Hakko FX888D — which one actually fits your workbench.",
    picks: 6,
    topPick: "Hakko FX888D",
    rating: 4.7,
  },
  {
    href: "/oscilloscopes/best-beginner-oscilloscopes",
    category: "Oscilloscopes",
    title: "Best Oscilloscopes for Beginners",
    excerpt:
      "Bandwidth, sample rate, and channel count explained simply, with picks that won't overwhelm a first-time buyer.",
    picks: 4,
    topPick: "Rigol DS1054Z",
    rating: 4.6,
  },
];

const methodology = [
  {
    step: "01",
    title: "We verify specs, not marketing copy",
    desc: "Every accuracy, safety, and performance claim is cross-checked against the manufacturer's actual datasheet — not the ad copy on the product page.",
  },
  {
    step: "02",
    title: "We cross-reference real owner feedback",
    desc: "Patterns across thousands of verified purchase reviews reveal reliability issues that spec sheets alone never show.",
  },
  {
    step: "03",
    title: "Rankings are never for sale",
    desc: "Our picks are never influenced by which brand pays the highest affiliate commission. A $12 meter can outrank a $120 one if the numbers say so.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>ELECTRONICS TEST EQUIPMENT, COMPARED HONESTLY</Eyebrow>
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
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold">Latest comparisons</h2>
          <span className="text-sm text-muted">{featured.length} categories reviewed</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <Card className="h-full flex flex-col transition-colors group-hover:border-accent">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs text-accent uppercase tracking-wide">
                    {item.category}
                  </span>
                  <Stars rating={item.rating} />
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-6 flex-1">{item.excerpt}</p>
                <div className="mt-4 rounded-md bg-signal-bg px-3 py-2 text-xs">
                  <span className="text-signal font-medium">Top pick: </span>
                  <span className="text-foreground">{item.topPick}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted">{item.picks} models compared</span>
                  <span className="text-accent group-hover:translate-x-0.5 transition-transform">
                    Read review →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Eyebrow>HOW WE REVIEW</Eyebrow>
          <h2 className="font-display text-2xl font-semibold max-w-xl text-balance">
            A simple process, applied consistently to every product.
          </h2>
          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            {methodology.map((m) => (
              <div key={m.step}>
                <div className="font-display text-3xl text-border mb-3">{m.step}</div>
                <h3 className="font-medium mb-2">{m.title}</h3>
                <p className="text-sm text-muted leading-6">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
