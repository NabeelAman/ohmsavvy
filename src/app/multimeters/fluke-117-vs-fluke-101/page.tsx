import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, FlowDiagram } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 101",
  description:
    "Fluke 117 vs Fluke 101: a True RMS electrician's meter that measures current against a 160 g voltage tester with no amps at all. Which one you actually need.",
  path: "/multimeters/fluke-117-vs-fluke-101",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke 101 comes down to two questions: do you need to measure current, and do you need True RMS? The 117 answers yes to both and adds NCV, AutoVolt and LoZ for building wiring. The 101 is Fluke's most basic meter, with no current function at all, but it reads frequency to 100 kHz in a 160 g body.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS electrician's multimeter, front view",
    chooseIf: [
      "You need to measure current up to 10A",
      "You work on circuits with drives, LED drivers or other distorted waveforms",
      "You want VoltAlert, AutoVolt and LoZ for safer checks on building wiring",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You never need to measure current",
      "You want the smallest, lightest Fluke for voltage and continuity",
      "You're comfortable buying an import with a one-year warranty",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "6A and 10A AC/DC", b: "None (two input jacks only)" },
    { label: "True RMS", a: "Yes", b: "Not stated by Fluke" },
    { label: "VoltAlert NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "No / No / No" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Frequency", a: "Up to 50 kHz", b: "Up to 100 kHz, plus duty cycle" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Warranty / availability", a: "3 years; sold by Fluke US", b: "1 year; US listing is a third-party import" },
  ],
  differences: [
    "The 117 measures AC and DC current to 10A; the 101 has no current function and only two input jacks.",
    "The 117 is True RMS; Fluke makes no True RMS claim for the 101.",
    "VoltAlert non-contact detection, AutoVolt and the low-impedance mode are on the 117 only.",
    "The 101 reads frequency to 100 kHz, twice the 117's 50 kHz, and adds duty cycle.",
    "At 160 g the 101 weighs less than a third of the 117's 550 g.",
    "The 117 has a 3-year warranty and is sold by Fluke US; the 101 has 1 year and is imported.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Start with one question: do you measure current?</h2>
        <Figure caption={<>A two-step check. Answer yes to either question and the 101 is the wrong meter.</>}>
          <FlowDiagram
            steps={[
              { label: "Measure amps?", sub: "Yes: you need the 117" },
              { label: "Drives or LED loads?", sub: "Yes: True RMS, the 117" },
              { label: "Building wiring?", sub: "NCV + LoZ: the 117" },
              { label: "None of these", sub: "The 101 covers you" },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequency range and weight</h2>
        <p className="text-muted leading-7 mb-4">
          The 101 isn&apos;t outclassed everywhere. Its frequency range goes higher than the 117&apos;s, and it is far
          lighter, which is the whole point of a minimal meter.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum frequency, in kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 50, display: "50 kHz" },
                { label: "Fluke 101", value: 100, display: "100 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight, in grams.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <DataTable
            head={["Everyday check", "117", "101"]}
            rows={[
              ["Is this outlet live?", "Yes, with VoltAlert or leads", "Yes, with leads"],
              ["How many amps is this heater drawing?", "Yes", "No"],
              ["Is this fuse blown?", "Yes", "Yes"],
              ["What frequency is this signal?", "To 50 kHz", "To 100 kHz"],
            ]}
          />
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the meter to buy for electrical work: current, True RMS and its NCV, AutoVolt and LoZ features matter on real circuits. The Fluke 101 is only worth considering as an ultra-light voltage and continuity checker, and its US availability as an import with a one-year warranty counts against it.",
  faqs: [
    {
      question: "Why can't the Fluke 101 measure current?",
      answer:
        "Fluke designed it with only two input jacks, COM and one shared input, and its datasheet lists no current function. Measuring current needs a separate fused input, which the 117 has.",
    },
    {
      question: "Is the Fluke 101 True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 101 in its datasheet, manual or product pages. The 117 is True RMS.",
    },
    {
      question: "Which reads higher frequencies?",
      answer:
        "The 101, up to 100 kHz with duty cycle, against the 117's 50 kHz.",
    },
    {
      question: "Can I buy the Fluke 101 from Fluke in the US?",
      answer:
        "Fluke's US site doesn't list it; it appears on Fluke's India and Malaysia sites. On Amazon it is sold by a third-party importer, with Fluke's one-year warranty.",
    },
    {
      question: "Is the Fluke 117 overkill for home use?",
      answer:
        "Not if you work on your own wiring: NCV and LoZ help you confirm circuits are dead. For battery and fuse checks alone, a smaller meter such as the 101 or 107 is enough.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 106", href: "/multimeters/fluke-117-vs-fluke-106" },
    { label: "Fluke 17B+ vs Fluke 101", href: "/multimeters/fluke-17b-plus-vs-fluke-101" },
    { label: "Best multimeter for home use", href: "/multimeters/best-multimeter-for-home-use" },
  ],
};

export default function Fluke117VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
