import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke T5-600",
  description:
    "Fluke 15B+ vs Fluke T5-600: microamps to 10A through leads against 100A AC through an open jaw. Ranges, safety ratings and who should buy which.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 15B+ vs Fluke T5-600 comes down to which end of the current scale you work at. The 15B+ is a basic multimeter whose current ranges start at microamps and stop at 10A, with capacitance and resistance to 40 MΩ. The T5-600 is an electrical tester that starts where the 15B+ stops, reading AC current to 100A through an open jaw, but it can't see small currents or test capacitors.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You measure small currents, from microamps upward, on electronics or batteries",
      "You need capacitance up to 1,000 µF",
      "You want a CAT II 1000V rating as well as CAT III 600V",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester, front view",
    chooseIf: [
      "Your current checks are on motors, heaters and circuits above 10A",
      "You don't want to open a circuit to read its current",
      "You want automatic AC/DC voltage without turning a dial",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Display", a: "4,000 counts, backlit", b: "Digital LCD (count not stated)" },
    { label: "Voltage", a: "To 1000V AC/DC", b: "To 600V AC/DC" },
    { label: "Current", a: "µA, mA and A ranges to 10A, AC/DC", b: "To 100A AC only" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "To 1,000 µF", b: "No" },
    { label: "Continuity", a: "Beeper below 70 Ω", b: "Beeper below 25 Ω" },
    { label: "Weight", a: "455 g", b: "300 g" },
    { label: "Battery", a: "2 × AA, 500 hours minimum", b: "2 × AA, about 400 hours alkaline" },
  ],
  differences: [
    "The 15B+ covers small currents from the microamp range up to 10A, AC and DC; the T5-600 reads only AC current, up to 100A.",
    "The T5-600 doesn't need the circuit opened to read current; the 15B+ does.",
    "Only the 15B+ measures capacitance, and its resistance range runs to 40 MΩ against 1,000 Ω.",
    "The 15B+ carries a CAT II 1000V rating in addition to CAT III 600V; the T5-600 is CAT III 600V.",
    "The T5-600 weighs 300 g, 155 g less than the 15B+, and is rated for a 3 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Where each reads current</h2>
        <p className="text-muted leading-7 mb-4">
          On a log scale the two current ranges barely overlap. The 15B+ resolves the tiny currents of
          electronics and standby loads; the T5-600 handles the heavy currents of motors and heating elements.
        </p>
        <Figure caption={<>Current coverage on a log scale: the 15B+&apos;s top range is the T5-600&apos;s starting point.</>}>
          <BarChart
            log
            items={[
              { label: "15B+ smallest range", value: 0.0004, display: "400 µA" },
              { label: "15B+ maximum", value: 10, display: "10A", highlight: true },
              { label: "T5-600 maximum", value: 100, display: "100A AC" },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each can and can&apos;t do</h2>
        <InfoCards
          items={[
            { label: "15B+ only", desc: "Capacitance, µA and mA current, DC current, resistance to 40 MΩ." },
            { label: "T5-600 only", desc: "AC current to 100A without breaking the circuit, automatic AC/DC voltage." },
            { label: "Both", desc: "AC/DC voltage, continuity, hold, CAT III 600V." },
          ]}
        />
        <div className="mt-4">
          <DataTable
            head={["Example", "Use"]}
            rows={[
              ["A phone charger's standby draw", "15B+ (needs mA or µA)"],
              ["An air-conditioner compressor", "T5-600 (above 10A)"],
              ["A motor-run capacitor", "15B+ (capacitance)"],
              ["A quick live/dead check at a panel", "T5-600"],
            ]}
          />
        </div>
        <div className="mt-4">
          <KeyIdea title="Small currents need small ranges">
            A 10A-only range can&apos;t resolve a few milliamps. See{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
              how to measure microamps with a multimeter
            </Link>{" "}
            for when those ranges matter.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Fluke 15B+ if your work involves electronics, batteries or capacitors: it reads currents the T5-600 can't see and has the wider resistance range. Choose the T5-600 for electrical service work, where currents run past 10A and opening a circuit to measure is a nuisance.",
  faqs: [
    {
      question: "Can the Fluke T5-600 measure milliamps?",
      answer:
        "Not usefully. It reads AC current through its open jaw with 0.1A resolution up to 100A, so small currents need a multimeter such as the 15B+.",
    },
    {
      question: "Does the Fluke 15B+ measure capacitance?",
      answer: "Yes, from 40 nF to 1,000 µF per Fluke's datasheet. The T5-600 has no capacitance function.",
    },
    {
      question: "Is the 15B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for it, and lists the T5-600 as average-responding, so neither suits distorted waveforms.",
    },
    {
      question: "Which has the higher voltage rating?",
      answer:
        "The 15B+ measures to 1000V and carries CAT II 1000V alongside CAT III 600V. The T5-600 measures to 600V and is CAT III 600V.",
    },
    {
      question: "Which is better for a home toolbox?",
      answer:
        "The 15B+, because household jobs such as battery, fuse and capacitor checks need its multimeter functions. The T5-600 suits electricians who mainly check panels and motors.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
  ],
};

export default function Fluke15bPlusVsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
