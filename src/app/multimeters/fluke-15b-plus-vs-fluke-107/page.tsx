import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 107",
  description:
    "Fluke 15B+ vs Fluke 107: the full-size meter has µA and mA ranges and a 1000V reading, the pocket 107 adds frequency and duty cycle. Specs and verdict.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-107",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 107",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 15B+ vs Fluke 107 is an unusual trade: the smaller meter has the extra functions. The pocket 107 reads frequency and duty cycle, which the 15B+ can't, while the full-size 15B+ counters with microamp and milliamp current ranges and a reading up to 1000V. Neither is True RMS, and both carry CAT III 600V.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "Small currents in µA or mA are part of your work",
      "You sometimes measure above 600V on CAT II equipment",
      "You want long battery life from AA cells",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You need frequency or duty cycle, for example on PWM or motor signals",
      "You want a 6,000-count display",
      "You want a meter that fits in a pocket and survives a 1 m drop",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Current", a: "µA, mA and A ranges to 10A", b: "Up to 10A AC/DC" },
    { label: "Frequency / duty cycle", a: "No / No", b: "Yes / Yes" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Yes" },
    { label: "Diode / continuity", a: "Yes / Yes", b: "Yes / Yes" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, installed" },
  ],
  differences: [
    "The 107 measures frequency and duty cycle; Fluke's datasheet lists both as unavailable on the 15B+.",
    "The 15B+ includes µA and mA current ranges; Fluke's 107 sources only state current up to 10A.",
    "The 15B+ reads up to 1000V and is also rated CAT II 1000V; the 107 is a 600V meter.",
    "The 107's display reaches 6,000 counts, the 15B+'s 4,000.",
    "The 107 is less than half the weight (200 g against 455 g) and is rated for a 1 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one has that the other doesn&apos;t</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">Only on the 15B+</p>
            <InfoCards
              items={[
                { label: "µA / mA", desc: "Small-current ranges on a fused input." },
                { label: "1000V", desc: "Reads to 1000V; CAT II 1000V." },
              ]}
            />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">Only on the 107</p>
            <InfoCards
              items={[
                { label: "Frequency", desc: "For signals, motors and supplies." },
                { label: "Duty cycle", desc: "For PWM and switching outputs." },
              ]}
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy which</h2>
        <Figure caption={<>Match the meter to the work you do most often.</>}>
          <DataTable
            head={["You are", "Better fit", "Reason"]}
            rows={[
              ["An electronics hobbyist debugging PWM", "107", "Frequency and duty cycle"],
              ["Checking device standby current", "15B+", "mA and µA ranges"],
              ["Keeping a meter in a car or bag", "107", "200 g, 1 m drop rating"],
              ["Testing CAT II equipment above 600V", "15B+", "Reads to 1000V"],
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="If you want both sets of features">
            The Fluke 17B+ combines the 15B+&apos;s current ranges with frequency, duty cycle, temperature and MIN
            MAX in the same full-size case, though still without True RMS.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The 107 is the better pick for most electronics hobbyists: frequency, duty cycle and a 6,000-count display in a pocketable, drop-rated body. The 15B+ wins if you need small-current ranges or readings above 600V, and you're happy with a full-size meter.",
  faqs: [
    {
      question: "Does the Fluke 15B+ measure frequency?",
      answer:
        "No. Fluke's 15B+/17B+ datasheet lists frequency and duty cycle as not available on the 15B+. The 107 has both, as does the 17B+.",
    },
    {
      question: "Can the Fluke 107 measure milliamps?",
      answer:
        "Fluke's 107 information we checked only states current up to 10A AC and DC, without milliamp or microamp ranges. The 15B+ has µA, mA and A ranges.",
    },
    {
      question: "Which is more rugged?",
      answer:
        "Fluke states a 1 m drop rating for the 107. It doesn't state one for the 15B+ in the documents we checked.",
    },
    {
      question: "Are they True RMS?",
      answer:
        "No. Fluke says the 107 is not a True RMS meter, and makes no True RMS claim for the 15B+.",
    },
    {
      question: "What's the difference in size?",
      answer:
        "The 107 is 142 × 69 × 28 mm and 200 g. The 15B+ is 183 × 91 × 49.5 mm and 455 g.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
  ],
};

export default function Fluke15BPlusVsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
