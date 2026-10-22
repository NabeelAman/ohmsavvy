import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-15b-plus";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 15B+",
  description:
    "Fluke 117 vs Fluke 15B+: an electrician's True RMS meter with NCV and LoZ against Fluke's plainest volts-amps-ohms meter. Specs, charts and verdict.",
  path: "/multimeters/fluke-117-vs-fluke-15b-plus",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 15B+",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke 15B+ is the gap between Fluke's specialist and its basic meter. The 15B+ keeps things simple: volts, amps from µA to 10A, ohms, capacitance, diode and continuity on a 4,000-count display, with only HOLD and RANGE buttons. The 117 adds True RMS, VoltAlert non-contact detection, AutoVolt, a low-impedance mode, frequency and Min/Max/Average on a 6,000-count display.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS multimeter for electricians, front view",
    chooseIf: [
      "You test live building wiring and want NCV, AutoVolt and LoZ",
      "You need True RMS for drives, dimmers and LED drivers",
      "You want frequency readings and Min/Max/Average recording",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ basic digital multimeter, front view",
    chooseIf: [
      "You want a straightforward Fluke for voltage, current, resistance and continuity",
      "You need µA and mA ranges for electronics or sensor loops",
      "You prefer a meter with almost nothing to learn",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "4,000 counts, backlit" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V AC/DC" },
    { label: "Safety rating detail", a: "CAT III 600V", b: "CAT III 600V and CAT II 1000V" },
    { label: "Current ranges", a: "6A and 10A AC/DC", b: "µA, mA and 10A AC/DC" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Up to 1,000 µF" },
    { label: "Frequency", a: "Up to 50 kHz", b: "No" },
    { label: "Min/Max recording", a: "Min/Max/Average", b: "No (Data Hold only)" },
    { label: "NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "None listed" },
    { label: "Weight", a: "550 g", b: "455 g" },
    { label: "Battery", a: "One 9V, about 400 hours", b: "2 × AA, 500 hours minimum" },
    { label: "Warranty", a: "3 years", b: "2 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke doesn't describe the 15B+ as True RMS.",
    "The 117 adds VoltAlert non-contact detection, AutoVolt and a low-impedance mode; the 15B+ has none of them.",
    "The 117 reads frequency to 50 kHz and records Min/Max/Average; the 15B+ has neither, only Data Hold.",
    "The 15B+ has µA and mA current ranges and a 1000V voltage range; the 117 starts at a 6A range and tops out at 600V.",
    "The 117's 6,000-count display and bar graph read finer than the 15B+'s 4,000 counts.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resolution and capacitance range</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts per range.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 6000, display: "6,000 counts", highlight: true },
                { label: "Fluke 15B+", value: 4000, display: "4,000 counts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum capacitance on a log scale: about ten times more range on the 117.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 9999, display: "9,999 µF", highlight: true },
                { label: "Fluke 15B+", value: 1000, display: "1,000 µF" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Choosing in three questions</h2>
        <Figure caption={<>A quick way to decide: any &quot;yes&quot; points to the 117; three &quot;no&quot; answers point to the 15B+.</>}>
          <FlowDiagram
            steps={[
              { label: "Live wiring?", sub: "Need NCV or LoZ: 117" },
              { label: "Electronic loads?", sub: "Need True RMS: 117" },
              { label: "Signals?", sub: "Need frequency: 117" },
              { label: "None of these", sub: "15B+ covers it" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Where the 15B+ wins">
            Its µA and mA ranges make it the better choice for sensor loops and small electronics current, and its
            1000V range and CAT II 1000V rating help on higher-voltage appliance and equipment circuits.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the right buy for electricians and anyone measuring modern electronic loads: True RMS, NCV, AutoVolt and LoZ. The Fluke 15B+ suits students, hobbyists and technicians who want a simple, durable Fluke with µA and mA ranges and don't need those extras.",
  faqs: [
    {
      question: "Is the Fluke 15B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 15B+. The 117 is True RMS, which matters on variable-speed drives, dimmers and LED drivers.",
    },
    {
      question: "Can the Fluke 15B+ measure frequency?",
      answer:
        "No. Fluke's datasheet lists frequency and duty cycle as not available on the 15B+; they are 17B+ features. The 117 reads frequency to 50 kHz.",
    },
    {
      question: "Which is better for measuring small currents?",
      answer:
        "The 15B+, which has µA and mA ranges. The 117's current ranges are 6A and 10A, with a best resolution of 1 mA.",
    },
    {
      question: "Do the Fluke 117 and 15B+ share a safety rating?",
      answer:
        "Both are CAT III 600V. The 15B+ is also rated CAT II 1000V and measures up to 1000V; the 117 measures up to 600V.",
    },
    {
      question: "What is the difference between the 15B+ and 17B+?",
      answer:
        "Same body and rating, but the 17B+ adds frequency, duty cycle, temperature, MIN MAX and relative mode. See our 17B+ vs 15B+ comparison for details.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
  ],
};

export default function Fluke117VsFluke15BPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
