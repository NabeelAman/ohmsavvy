import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, InfoCards } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 101",
  description:
    "Fluke 17B+ vs Fluke 101: one measures current, temperature and logs MIN MAX; the other is a 160 g voltage-only Fluke with no current at all. See which fits.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-101",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 17B+ vs Fluke 101 is less a contest than a question of scope. The 101 has only two input jacks and cannot measure current at all, so it is a voltage, resistance and frequency checker; the 17B+ is a full meter that adds current from microamps to 10A, temperature and MIN MAX. Fluke calls neither True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You will ever need to measure current, from microamps to 10A",
      "You want temperature with the included Type K probe",
      "You want a two-year warranty and a US Fluke listing",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact digital multimeter, front view",
    chooseIf: [
      "You only ever check voltage, continuity, resistance and frequency",
      "You want the smallest, lightest Fluke: 160 g",
      "You accept a one-year warranty and a third-party import listing",
    ],
  },
  extraSpecs: [
    { label: "Input jacks", a: "Current inputs fused at 440 mA and 11 A", b: "Two: COM and one shared input" },
    { label: "Current", a: "400 µA to 10A AC/DC", b: "None" },
    { label: "Display", a: "4,000 counts", b: "6,000 counts" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Fluke sources conflict: 100 µF or 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 100 kHz / 1–99%", b: "To 100 kHz / 1–99%" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "130 × 65 × 27 mm, 160 g" },
    { label: "Warranty", a: "2 years", b: "1 year" },
    { label: "US availability", a: "Sold on fluke.com US", b: "Not on fluke.com US; Amazon listing is a third-party import" },
  ],
  differences: [
    "The 101 can't measure current: it has only two jacks, so any job involving amps needs the 17B+.",
    "The 17B+ adds temperature, MIN MAX, relative mode and a 30V hazardous-voltage LED.",
    "Both read frequency to 100 kHz and duty cycle; the 101 does it in a body roughly a third of the 17B+'s weight.",
    "The 101 has a 6,000-count display against the 17B+'s 4,000 counts.",
    "The 17B+ carries a two-year warranty and is sold by Fluke US; the 101 has a one-year warranty and reaches the US as an import.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 101 leaves out</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke built the 101 as a minimal tester. Its two-jack layout is the giveaway: there is nowhere to plug a
          lead for current. These are the 17B+ functions it doesn&apos;t have.
        </p>
        <InfoCards
          items={[
            { label: "Current", desc: "No amps, milliamps or microamps on the 101." },
            { label: "Temperature", desc: "The 17B+ includes a Type K probe." },
            { label: "MIN MAX", desc: "The 17B+ records highs and lows." },
            { label: "Relative", desc: "The 17B+ can zero a reference reading." },
            { label: "1000V range", desc: "The 101 stops at 600V." },
            { label: "Warning LED", desc: "The 17B+ lights at 30V or more." },
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight and job fit</h2>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure caption={<>Weight in grams. The 101 is the lightest Fluke on our list.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 455, display: "455 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <DataTable
            head={["Job", "Better fit"]}
            rows={[
              ["Outlet and battery voltage", "Either"],
              ["Wire and fuse continuity", "Either"],
              ["Parasitic battery drain", "17B+"],
              ["Appliance current draw", "17B+"],
              ["Fan PWM duty cycle", "Either"],
              ["Pipe or heatsink temperature", "17B+"],
            ]}
          />
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For almost everyone the 17B+ is the right buy: it does everything the 101 does except fit in the smallest pocket, and adds current, temperature and logging. The 101 only makes sense as a deliberately simple voltage and continuity tester, and its US listing is an import with a one-year warranty.",
  faqs: [
    {
      question: "Can the Fluke 101 measure amps?",
      answer:
        "No. The 101 has only a COM jack and one shared input, and Fluke's datasheet lists no current function. Use the 17B+, which measures from 400 µA to 10A AC and DC.",
    },
    {
      question: "Is the Fluke 101 sold in the US?",
      answer:
        "Not by Fluke US: its product page isn't on fluke.com US, and the model is listed on Fluke's India and Malaysia sites. The Amazon listing is fulfilled by Amazon but sold by a third-party importer.",
    },
    {
      question: "What capacitance can the Fluke 101 measure?",
      answer:
        "Fluke's own documents disagree: the datasheet gives a 100 µF maximum and the users manual 1,000 µF. The 17B+ is consistently listed at 1,000 µF.",
    },
    {
      question: "Do both meters read frequency?",
      answer:
        "Yes. Both read frequency up to 100 kHz and duty cycle from 1% to 99%, so for PWM checks the 101 keeps up with the 17B+.",
    },
    {
      question: "Which has the longer warranty?",
      answer:
        "The 17B+, with two years per its users manual. The 101's manual and datasheet give one year.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function Fluke17BPlusVsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
