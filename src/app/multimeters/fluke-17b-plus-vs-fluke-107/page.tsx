import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 107",
  description:
    "Fluke 17B+ vs Fluke 107: both read frequency and duty cycle, but the 17B+ adds temperature and MIN MAX while the 107 is half the size. A side-by-side guide.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-107",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 107",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 17B+ vs Fluke 107 is closer than it looks: unlike most pocket meters, the 107 reads frequency, duty cycle, capacitance and diodes, so it covers much of what the 17B+ does. What the bigger meter adds is temperature, MIN MAX, relative mode and a higher voltage ceiling, while the 107 counts to 6,000 in a 200 g case.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You want temperature readings with a probe included",
      "You log fluctuating readings with MIN MAX or need relative mode",
      "You occasionally measure above 600V on CAT II equipment",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want frequency and duty cycle in something that fits a pocket",
      "You value a 6,000-count display over extra functions",
      "You want a meter Fluke rates for a 1 m drop",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Safety rating detail", a: "CAT III 600V and CAT II 1000V", b: "CAT III 600V" },
    { label: "Current", a: "400 µA to 10A AC/DC", b: "Up to 10A AC/DC" },
    { label: "Frequency / duty cycle", a: "Yes / Yes", b: "Yes / Yes" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "MIN MAX / relative", a: "Yes / Yes", b: "Not stated / Not stated" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA", b: "2 × AAA, installed" },
  ],
  differences: [
    "Both measure frequency, duty cycle, capacitance, diodes and continuity, so the 107 loses less than most pocket meters.",
    "The 17B+ adds a temperature function with a Type K probe, plus MIN MAX recording and relative mode.",
    "The 107's display reaches 6,000 counts; the 17B+ stops at 4,000.",
    "The 17B+ reads up to 1000V with a CAT II 1000V rating; the 107 is limited to 600V, CAT III.",
    "The 107 is 142 × 69 × 28 mm and 200 g, less than half the 17B+'s 455 g, and Fluke rates it for a 1 m drop.",
    "Neither is True RMS: Fluke states the 107 is not, and makes no True RMS claim for the 17B+.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feature overlap at a glance</h2>
        <DataTable
          head={["Function", "Fluke 17B+", "Fluke 107"]}
          rows={[
            ["AC/DC voltage and current", "✓", "✓"],
            ["Resistance and continuity", "✓", "✓"],
            ["Capacitance", "✓", "✓"],
            ["Diode test", "✓", "✓"],
            ["Frequency and duty cycle", "✓", "✓"],
            ["Temperature", "✓", "—"],
            ["MIN MAX and relative", "✓", "Not stated"],
            ["Data hold and backlight", "✓", "✓"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Six of the eight rows match. If temperature and logging aren&apos;t on your list, the 107 delivers most of
          the 17B+&apos;s measurements at well under half the weight.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">How much bigger is the 17B+?</h2>
        <Figure caption={<>Body length and thickness in millimeters, from Fluke&apos;s specifications.</>}>
          <BarChart
            items={[
              { label: "17B+ length", value: 183, display: "183 mm" },
              { label: "107 length", value: 142, display: "142 mm", highlight: true },
              { label: "17B+ thickness", value: 49.5, display: "49.5 mm" },
              { label: "107 thickness", value: 28, display: "28 mm", highlight: true },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="A note on True RMS">
            Neither meter is True RMS, so both read clean sine-wave mains correctly but can misread the chopped
            waveforms of dimmers, drives and switch-mode supplies. If that is your work, step up to a True RMS meter
            such as the Fluke 117 or 115.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Pick the 107 if you want frequency and duty cycle in a pocket-size meter with a finer display; it covers most everyday electronics checks. Pick the 17B+ if temperature, MIN MAX logging or readings above 600V matter, and you don't mind a full-size meter.",
  faqs: [
    {
      question: "Does the Fluke 107 measure frequency like the 17B+?",
      answer:
        "Yes. Fluke lists frequency and duty cycle for the 107 (its sibling, the 106, lacks them). The 17B+ reads frequency up to 100 kHz.",
    },
    {
      question: "Is the Fluke 107 True RMS?",
      answer:
        "No. Fluke states the 107 is not a True RMS meter. Fluke makes no True RMS claim for the 17B+ either.",
    },
    {
      question: "Which is lighter, the 17B+ or the 107?",
      answer:
        "The 107, at 200 g against 455 g. It measures 142 × 69 × 28 mm, against the 17B+'s 183 × 91 × 49.5 mm.",
    },
    {
      question: "Can the Fluke 107 measure temperature?",
      answer:
        "No. Temperature is a 17B+ feature here, using its included Type K probe across −55 °C to 400 °C.",
    },
    {
      question: "Which has more resolution?",
      answer:
        "The 107, with a 6,000-count display against the 17B+'s 4,000 counts. That matters when you want to see small changes in a reading without the meter switching ranges.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 106", href: "/multimeters/fluke-17b-plus-vs-fluke-106" },
  ],
};

export default function Fluke17BPlusVsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
