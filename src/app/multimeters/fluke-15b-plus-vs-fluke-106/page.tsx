import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-106";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 106",
  description:
    "Fluke 15B+ vs Fluke 106: full µA-to-10A current ranges and a 1000V reading in a full-size case, or a 200 g pocket meter with a 6,000-count display. Compared.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-106",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 106",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 15B+ vs Fluke 106 is a choice between two budget Flukes built for different pockets. The 15B+ is a full-size basic meter with microamp, milliamp and amp current ranges and a 1000V reading; the 106 is a palm-size meter with a finer 6,000-count display but only 4A and 10A current ranges. Both skip frequency and temperature.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You need to read small currents in µA or mA",
      "You want a diode test as well as continuity",
      "You prefer a full-size meter with AA batteries",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want the meter small enough for a pocket or glovebox",
      "You value a 6,000-count display",
      "Your current checks, if any, are in whole amps",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Safety rating detail", a: "CAT III 600V and CAT II 1000V", b: "CAT III 600V" },
    { label: "Current ranges", a: "µA, mA and A to 10A AC/DC", b: "4A and 10A AC/DC" },
    { label: "Diode test", a: "Yes", b: "No" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 1,000 µF" },
    { label: "Frequency / temperature", a: "No / No", b: "No / No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "2 years", b: "2 years" },
  ],
  differences: [
    "The 15B+ measures from microamps up to 10A; the 106 starts at a 4A range, so small currents are out of reach.",
    "The 106's display counts to 6,000 against the 15B+'s 4,000.",
    "The 15B+ reads up to 1000V and adds CAT II 1000V; the 106 is a 600V, CAT III meter.",
    "Only the 15B+ has a diode test; Fluke lists diode as a 107-only function in the 106/107 family.",
    "The 106 is 200 g and 28 mm thick; the 15B+ is 455 g and 49.5 mm thick.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Current ranges side by side</h2>
        <p className="text-muted leading-7 mb-4">
          On paper these are both basic meters, but the current inputs separate them sharply. The 15B+ has the
          fused µA/mA input most full-size meters carry; the 106 keeps only amp ranges to stay small.
        </p>
        <DataTable
          head={["Range", "Fluke 15B+", "Fluke 106"]}
          rows={[
            ["Microamps", "Yes", "No"],
            ["Milliamps", "Yes", "No"],
            ["Up to 4A", "Yes", "Yes"],
            ["Up to 10A", "Yes", "Yes, for under 7 minutes at a time"],
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Resolution, voltage ceiling and battery</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts: the 106 resolves 50% more steps per range.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 4000, display: "4,000" },
                { label: "Fluke 106", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Minimum battery life Fluke quotes, in hours.</>}>
            <BarChart
              items={[
                { label: "15B+ (2 × AA)", value: 500, display: "500 h", highlight: true },
                { label: "106 (2 × AAA)", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Neither is True RMS">
            Fluke doesn&apos;t describe the 15B+ as True RMS and positions the 106 for work where True RMS isn&apos;t
            needed. For ordinary mains, batteries and resistors that&apos;s fine; on drives and electronic lighting,
            both can misread AC.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the 15B+ if you need milliamp or microamp readings, a diode test or the longer AA battery life; it's the more capable basic meter. Choose the 106 if size matters most and your checks are voltage, continuity and the occasional amp reading.",
  faqs: [
    {
      question: "Does the Fluke 15B+ measure milliamps?",
      answer:
        "Yes. It has µA, mA and A ranges up to 10A AC and DC. The 106's smallest current range is 4A.",
    },
    {
      question: "Which has more counts, the 15B+ or the 106?",
      answer:
        "The 106, with 6,000 counts against the 15B+'s 4,000.",
    },
    {
      question: "Can the Fluke 106 test diodes?",
      answer:
        "No. Fluke's 106/107 manual marks diode test as a 107 feature. The 15B+ includes a diode test on its 2V range.",
    },
    {
      question: "Do either of them read frequency or temperature?",
      answer:
        "No. Fluke's datasheet lists frequency and temperature as unavailable on the 15B+, and the 106 has neither. The 17B+ and 107 add frequency; the 17B+ adds temperature.",
    },
    {
      question: "Which is better for a beginner?",
      answer:
        "The 15B+, for its fuller current ranges and diode test, unless you specifically want a pocket meter. Both use simple controls.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
  ],
};

export default function Fluke15BPlusVsFluke106Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
