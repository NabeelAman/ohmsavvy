import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-101-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 101 vs Fluke T5-600",
  description:
    "Fluke 101 vs Fluke T5-600: the 101 can't measure current at all, the T5-600 reads up to 100A AC. Signals, size and safety compared, plus a verdict.",
  path: "/multimeters/fluke-101-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 101 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 101 vs Fluke T5-600 is the simplest current question in the Fluke range: only one of them measures current at all. The 101 is Fluke's smallest meter, with voltage, resistance, capacitance, frequency and diode test but no current jack. The T5-600 reads AC current up to 100A through its open jaw, and gives up the 101's signal and component functions to do it.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 basic multimeter, front view",
    chooseIf: [
      "You need frequency, duty cycle, capacitance or a diode test",
      "You want the lightest possible Fluke, at 160 g",
      "Resistance checks above 1,000 Ω matter to you",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester with OpenJaw",
    chooseIf: [
      "You need to know how much current a circuit draws",
      "You want a two-year warranty and a model sold on Fluke's US site",
      "You want a tester rated for a 3 m drop",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Basic digital multimeter", b: "Electrical tester" },
    { label: "Current", a: "None", b: "To 100A AC via open jaw" },
    { label: "Voltage", a: "To 600V AC/DC", b: "To 600V AC/DC, automatic AC/DC" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "Yes (Fluke lists 100 µF and 1,000 µF in different documents)", b: "No" },
    { label: "Frequency / duty cycle", a: "To 100 kHz; 1–99%", b: "No" },
    { label: "Diode test", a: "Yes", b: "Not listed" },
    { label: "Weight", a: "160 g", b: "300 g" },
    { label: "Warranty", a: "1 year", b: "2 years" },
    { label: "US availability", a: "Import listings only", b: "Sold on fluke.com US" },
  ],
  differences: [
    "The T5-600 measures AC current up to 100A; the 101 has no current function.",
    "The 101 adds frequency to 100 kHz, duty cycle, capacitance and diode test, which the T5-600 lacks.",
    "Resistance runs to 40 MΩ on the 101 but only 1,000 Ω on the T5-600.",
    "The 101 weighs 160 g, 140 g less than the T5-600, and is much shorter at 130 mm against 203 mm.",
    "Fluke warrants the T5-600 for two years and the 101 for one; the 101 isn't sold on Fluke's US site.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one measures</h2>
        <InfoCards
          items={[
            { label: "Fluke 101", desc: "Voltage, resistance to 40 MΩ, capacitance, frequency, duty cycle, diode, continuity." },
            { label: "Fluke T5-600", desc: "Voltage with auto AC/DC, resistance to 1,000 Ω, continuity, AC current to 100A." },
            { label: "Neither", desc: "DC current or temperature; and Fluke describes neither as True RMS." },
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Weight and warranty</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight in grams from Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
                { label: "Fluke T5-600", value: 300, display: "300 g" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fluke warranty in years.</>}>
            <BarChart
              items={[
                { label: "Fluke 101", value: 1, display: "1 year" },
                { label: "Fluke T5-600", value: 2, display: "2 years", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="If you need both current and signals">
            Neither tool covers everything. A pocket meter such as the Fluke 107 adds current to the 101&apos;s
            signal functions; compare them in{" "}
            <Link href="/multimeters/fluke-107-vs-fluke-101" className={link}>
              Fluke 107 vs Fluke 101
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the T5-600 if you ever need to know how much current something draws; the 101 simply can't tell you. Choose the 101 only for light electronics and signal work, where frequency, duty cycle, diode test and a 160 g body matter, and current never does.",
  faqs: [
    {
      question: "Does the Fluke 101 measure amps?",
      answer: "No. It has two input jacks and no current function. The T5-600 reads AC current up to 100A.",
    },
    {
      question: "Can the T5-600 measure frequency?",
      answer: "No. Frequency and duty cycle are on the 101, which reads frequency to 100 kHz.",
    },
    {
      question: "Which has the wider resistance range?",
      answer: "The 101, to 40 MΩ. The T5-600 reads resistance up to 1,000 Ω, enough for continuity and heater elements.",
    },
    {
      question: "Are both CAT III 600V?",
      answer: "Yes. Fluke rates both the 101 and the T5-600 CAT III 600V.",
    },
    {
      question: "Why is the Fluke 101 hard to find in the US?",
      answer:
        "Fluke sells it in markets such as India and Malaysia but not on its US site, so US listings come from importers, and it carries a one-year warranty.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "What does OL mean on a multimeter?", href: "/multimeters/what-does-ol-mean-on-a-multimeter" },
  ],
};

export default function Fluke101VsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
