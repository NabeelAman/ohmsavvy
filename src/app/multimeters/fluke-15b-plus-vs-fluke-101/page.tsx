import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, FlowDiagram } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 101",
  description:
    "Fluke 15B+ vs Fluke 101: a basic full-size meter that measures current against a 160 g pocket tester that reads frequency but no amps. Which suits you?",
  path: "/multimeters/fluke-15b-plus-vs-fluke-101",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 15B+ vs Fluke 101 compares Fluke's two most basic meters, and each lacks something the other has. The 15B+ measures current from microamps to 10A but has no frequency range; the 101 reads frequency and duty cycle to 100 kHz but cannot measure current at all. Size, warranty and US availability split them further.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You need current readings of any size",
      "You want a meter sold by Fluke US with a two-year warranty",
      "You may measure above 600V on CAT II equipment",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You want frequency and duty cycle in the smallest possible Fluke",
      "You only check voltage, resistance and continuity, never current",
      "Low weight matters more than warranty length",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "µA, mA and A ranges to 10A AC/DC", b: "None" },
    { label: "Frequency / duty cycle", a: "No / No", b: "To 100 kHz / 1–99%" },
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Diode / continuity", a: "Yes / Yes", b: "Yes / Yes" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "2 years", b: "1 year" },
    { label: "Sold by Fluke US", a: "Yes", b: "No (third-party import on Amazon)" },
  ],
  differences: [
    "Current is the dividing line: the 15B+ covers µA to 10A, and the 101 has no current function at all.",
    "The 101 reads frequency to 100 kHz and duty cycle; the 15B+ reads neither.",
    "The 101 counts to 6,000, the 15B+ to 4,000.",
    "The 101 is 160 g against the 15B+'s 455 g, and is rated for a 1 m drop.",
    "The 15B+ has a two-year warranty and a Fluke US listing; the 101 has one year and is imported.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Pick by the measurement you can&apos;t do without</h2>
        <Figure caption={<>Each meter misses one common measurement, so start there.</>}>
          <FlowDiagram
            steps={[
              { label: "Need current?", sub: "Only the 15B+ measures amps" },
              { label: "Need frequency?", sub: "Only the 101 reads Hz" },
              { label: "Need both?", sub: "Look at the 17B+ or 107" },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight, battery and warranty</h2>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure caption={<>Weight in grams, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 455, display: "455 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <DataTable
            head={["", "15B+", "101"]}
            rows={[
              ["Batteries", "2 × AA", "2 × AAA"],
              ["Minimum life", "500 h", "200 h"],
              ["Warranty", "2 years", "1 year"],
              ["US source", "Fluke US", "Import"],
            ]}
          />
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For most people the 15B+ is the safer buy: it measures current, carries a two-year warranty and is sold by Fluke US. The 101 suits only someone who wants a very small voltage, continuity and frequency checker and will never need to measure amps.",
  faqs: [
    {
      question: "Which Fluke is cheaper to run, the 15B+ or 101?",
      answer:
        "Fluke quotes at least 500 hours from the 15B+'s two AA cells and at least 200 hours from the 101's two AAA cells, so the 15B+ goes longer between battery changes.",
    },
    {
      question: "Can the Fluke 101 measure current?",
      answer:
        "No. It has only two input jacks and no current function. The 15B+ measures from microamps up to 10A.",
    },
    {
      question: "Does the Fluke 15B+ read frequency?",
      answer:
        "No. Fluke's datasheet lists frequency and duty cycle as not available on the 15B+. The 101 reads both, up to 100 kHz.",
    },
    {
      question: "Which has the better display?",
      answer:
        "The 101 counts to 6,000 against the 15B+'s 4,000. The 15B+ is backlit; Fluke's 101 documents don't mention a backlight.",
    },
    {
      question: "Is either True RMS?",
      answer:
        "Fluke makes no True RMS claim for either meter, so keep both to ordinary sine-wave mains, batteries and components.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
  ],
};

export default function Fluke15BPlusVsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
