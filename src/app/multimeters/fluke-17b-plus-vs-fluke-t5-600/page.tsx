import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke T5-600",
  description:
    "Fluke 17B+ vs Fluke T5-600: a full electronics multimeter with temperature and frequency against a fast 100A open-jaw tester for panel work.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-t5-600",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 17B+ vs Fluke T5-600 is a bench-versus-panel choice. The 17B+ is a full multimeter built for electronics, with temperature, frequency, capacitance to 1,000 µF and MIN MAX recording. The T5-600 is an electrical tester that trades those functions for speed: automatic AC/DC voltage, quick continuity and up to 100A AC through an open jaw.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You repair electronics and need capacitance, frequency and duty cycle",
      "You want temperature readings with the included Type K probe",
      "You need resistance above 1,000 Ω, up to 40 MΩ",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester with OpenJaw current fork",
    chooseIf: [
      "You check panels, outlets and motors and want answers fast",
      "You need AC current above 10A without opening the circuit",
      "You drop tools: Fluke rates it for a 3 m fall",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Display", a: "4,000 counts, backlit", b: "Digital LCD (count not stated)" },
    { label: "Voltage", a: "To 1000V AC/DC", b: "To 600V AC/DC, automatic AC/DC selection" },
    { label: "Current", a: "400 µA to 10A AC/DC via leads", b: "To 100A AC via open jaw" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "To 1,000 µF", b: "No" },
    { label: "Frequency / duty", a: "To 100 kHz; 1–99%", b: "No" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "Recording", a: "MIN MAX, relative, hold", b: "Display hold" },
    { label: "Weight", a: "455 g", b: "300 g" },
    { label: "Drop rating", a: "Not stated", b: "3 m (10 ft)" },
  ],
  differences: [
    "The 17B+ is a general-purpose multimeter; Fluke sells the T5-600 as an electrical tester.",
    "Only the 17B+ measures capacitance, frequency, duty cycle and temperature.",
    "The T5-600 reads AC current up to 100A through its open jaw; the 17B+ reads up to 10A, AC or DC, with the leads in series.",
    "Resistance tops out at 1,000 Ω on the T5-600 against 40 MΩ on the 17B+.",
    "The T5-600 picks AC or DC voltage automatically and survives a 3 m drop; the 17B+ needs the dial set but offers MIN MAX and relative mode.",
    "Neither is True RMS: Fluke calls the T5-600 average-responding and makes no True RMS claim for the 17B+.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Range compared on a log scale</h2>
        <p className="text-muted leading-7 mb-4">
          The two overlap on voltage but diverge sharply elsewhere. These charts use a logarithmic scale because
          the ranges differ by orders of magnitude.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum resistance: 40 MΩ is 40,000 times the T5-600&apos;s 1,000 Ω.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 17B+", value: 40000000, display: "40 MΩ", highlight: true },
                { label: "Fluke T5-600", value: 1000, display: "1,000 Ω" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum current: the open jaw reaches ten times further, AC only.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 17B+", value: 10, display: "10A AC/DC" },
                { label: "Fluke T5-600", value: 100, display: "100A AC", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bench or panel: matching the job</h2>
        <DataTable
          head={["Job", "Better fit", "Reason"]}
          rows={[
            ["Checking a capacitor on a circuit board", "17B+", "T5-600 has no capacitance function"],
            ["Reading an oven or heatsink temperature", "17B+", "Type K probe included"],
            ["Confirming a breaker is live", "T5-600", "Automatic AC/DC voltage, no dial change"],
            ["Motor current on a 20A circuit", "T5-600", "17B+ stops at 10A"],
            ["Tracking an intermittent fault", "17B+", "MIN MAX recording"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A note on the 17B+ listing">
            The Amazon listing for the 17B+ shows the newer 17B MAX in its main photo, so check which model it
            ships before ordering.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For electronics, choose the Fluke 17B+: capacitance, frequency, temperature and MIN MAX are things the T5-600 simply can't do. For electrical panels and motors, the T5-600 is the faster, tougher tool and reads far more current. Many electricians carry a tester like the T5 and a multimeter like the 17B+ side by side.",
  faqs: [
    {
      question: "Can the Fluke T5-600 replace a 17B+ multimeter?",
      answer:
        "Not for electronics. It has no capacitance, frequency, duty cycle, temperature or diode function, and resistance stops at 1,000 Ω. It covers voltage, continuity and AC current.",
    },
    {
      question: "Which reads more current, the 17B+ or the T5-600?",
      answer:
        "The T5-600, up to 100A AC through its open jaw. The 17B+ reads up to 10A, but on both AC and DC and down to microamps.",
    },
    {
      question: "Does the Fluke 17B+ measure temperature?",
      answer: "Yes, from −55 °C to 400 °C with the Type K thermocouple probe Fluke includes.",
    },
    {
      question: "Are the 17B+ and T5-600 the same safety rating?",
      answer:
        "Both are CAT III 600V. Fluke's datasheet also gives the 17B+ a CAT II 1000V rating for lower-energy circuits.",
    },
    {
      question: "Which is lighter to carry?",
      answer: "The T5-600 at 300 g; the 17B+ weighs 455 g per Fluke.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke17bPlusVsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
