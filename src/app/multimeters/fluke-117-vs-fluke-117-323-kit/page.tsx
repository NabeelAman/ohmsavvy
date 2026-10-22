import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-117-323-kit";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 117/323 Kit",
  description:
    "Fluke 117 vs the 117/323 kit: the same multimeter, with or without a bundled True RMS clamp meter. Whether the extra cost is worth it depends on one thing.",
  path: "/multimeters/fluke-117-vs-fluke-117-323-kit",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 117/323 Kit",
  path,
  published: "2026-10-22",
  intro:
    "This isn't a comparison between two different meters — the 117/323 kit literally includes the 117 itself, plus a 323 clamp meter, test leads, a TPAK hanger, and a carrying case. The only real question is whether you need the 323's clamp-current capability enough to justify the kit's higher price over buying the 117 on its own.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You don't regularly need to measure AC current on live circuits without disconnecting them",
      "You want the lowest-cost way to get Fluke's most popular general-purpose meter",
      "You already own a separate clamp meter, or don't need one",
      "You're buying your first multimeter and want to start simple",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117/323 Kit")!,
    reviewHref: undefined,
    imageAlt: "Fluke 117/323 multimeter and clamp meter combo kit",
    chooseIf: [
      "You want both a general multimeter and a clamp meter from day one, without separate purchases",
      "You regularly need no-disconnect AC current readings alongside standard multimeter work",
      "You want the included carrying case and TPAK hanger for keeping both tools organized",
      "Buying the bundle now costs less than buying the 117 and a 323 separately later",
    ],
  },
  extraSpecs: [
    { label: "Includes", a: "Fluke 117 multimeter only", b: "Fluke 117 + Fluke 323 clamp meter + leads + TPAK + case" },
    { label: "Clamp AC current capability", a: "No", b: "Yes, up to 400A AC (via the 323)" },
    { label: "Carrying case", a: "Not included", b: "Included soft case" },
    { label: "Core multimeter functions", a: "Full — voltage, resistance, continuity, diode test", b: "Same, via the included 117" },
  ],
  differences: [
    "The kit is literally the 117 plus a Fluke 323 True RMS clamp meter, test leads, a TPAK magnetic hanger, and a carrying case — not a different or upgraded multimeter.",
    "Buying the kit costs more upfront than the 117 alone, but typically less than buying the 117 and a 323 separately at full price.",
    "The 323 adds no-disconnect AC current measurement up to 400A, a capability the standalone 117 doesn't have at all.",
    "If you don't need clamp current measurement, the kit's extra cost buys you a tool you won't use.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What you actually get for the difference in price</h2>
        <p className="text-muted leading-7 mb-4">
          The decision comes down to one question: will you actually use a clamp meter? If yes, the kit is
          close to a straightforward bundle discount. If no, you&apos;re paying for a tool that sits in the
          case unused.
        </p>
        <Figure
          caption={
            <>
              The kit adds exactly one new capability over the standalone 117: clamp-based AC current
              measurement, via the included 323.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Fluke 117 alone — functions", value: 4, display: "Voltage, resistance, continuity, diode" },
              { label: "117/323 Kit — functions", value: 5, display: "Same 4, plus clamp AC current", highlight: true },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">When the kit is worth it</h2>
        <DataTable
          head={["Your situation", "Better choice", "Why"]}
          rows={[
            ["You'll use clamp current measurement regularly", "117/323 Kit", "Bundled price beats buying both tools separately later"],
            ["You only need general multimeter functions", "Fluke 117 alone", "No reason to pay for a clamp meter you won't use"],
            ["You already own a clamp meter from another brand", "Fluke 117 alone", "The kit's 323 would be redundant"],
            ["You're equipping a bench or toolkit from scratch", "117/323 Kit", "Covers both measurement types in one purchase, with a case to organize them"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Still deciding if you need a clamp meter at all?">
            See our{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
              Fluke 117 vs Fluke 323 comparison
            </Link>{" "}
            for a closer look at what the clamp meter specifically adds and gives up compared to a
            standard multimeter, and our{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>{" "}
            for the broader buying considerations.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "There's no meaningful downside to the 117 itself in either option — the kit simply adds a 323 clamp meter, leads, a TPAK hanger, and a case on top of it. Buy the kit if you have any real, regular need for clamp-based AC current measurement, since the bundled price typically beats buying both separately. Buy the 117 alone if you don't, rather than paying for a clamp meter you won't use.",
  faqs: [
    {
      question: "Is the Fluke 117 inside the kit a different or lesser version?",
      answer:
        "No — it's the same Fluke 117 multimeter sold on its own, just bundled alongside the 323 clamp meter and accessories rather than sold by itself.",
    },
    {
      question: "Does the kit save money compared to buying both tools separately?",
      answer:
        "Typically yes, though exact pricing varies over time — bundled kits are generally priced below the combined cost of buying the 117 and 323 as two separate purchases. Compare current prices on both listings before deciding, since promotions can shift this.",
    },
    {
      question: "Can I buy just the 323 clamp meter later if I start with the 117 alone?",
      answer:
        "Yes — the 323 is sold as its own standalone product, so starting with the 117 and adding a 323 later is a perfectly reasonable path if you're not sure yet whether you'll need clamp current measurement.",
    },
    {
      question: "What's the TPAK included in the kit?",
      answer:
        "It's Fluke's magnetic hanging accessory, letting you hang the meter on a metal surface (like an electrical panel) to keep both hands free while working — a small but genuinely useful accessory for field electrical work.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
    { label: "Fluke 15B+ vs Fluke 117/323 Kit", href: "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit" },
    { label: "Clamp Meter Buying Guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke117VsFluke117323KitPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
