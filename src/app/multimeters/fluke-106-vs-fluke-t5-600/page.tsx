import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 106 vs Fluke T5-600",
  description:
    "Fluke 106 vs Fluke T5-600: both read current, one through test leads to 10A, the other through an open jaw to 100A. Steps, specs and the right pick.",
  path: "/multimeters/fluke-106-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 106 vs Fluke T5-600 is unusual among Fluke match-ups because both tools read current, just in completely different ways. The palm-sized 106 measures up to 10A, AC or DC, with its leads wired into the circuit. The T5-600 measures up to 100A AC by sliding its open jaw around a conductor. Which approach suits you matters more than any other spec here.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 pocket multimeter, front view",
    chooseIf: [
      "You need DC current, for batteries, solar or automotive circuits",
      "You want capacitance and resistance to 40 MΩ in a 200 g meter",
      "Your currents stay at or below 10A",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 tester with open jaw",
    chooseIf: [
      "You need AC current readings above 10A",
      "You can't or don't want to break the circuit to measure",
      "You want voltage that switches between AC and DC by itself",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Current method", a: "Leads in series with the load", b: "Open jaw around one conductor" },
    { label: "Current range", a: "4A and 10A ranges, AC and DC", b: "To 100A, AC only" },
    { label: "Voltage", a: "To 600V AC/DC", b: "To 600V AC/DC, auto AC/DC" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "No" },
    { label: "Display", a: "6,000 counts", b: "Digital LCD (count not stated)" },
    { label: "Weight", a: "200 g", b: "300 g" },
    { label: "Battery", a: "2 × AAA, 200 hours minimum", b: "2 × AA, about 400 hours alkaline" },
    { label: "Warranty", a: "2 years", b: "2 years" },
  ],
  differences: [
    "The 106 reads current through its leads, so the circuit must be opened; the T5-600 reads through its jaw with the circuit intact.",
    "The 106 measures DC current as well as AC; the T5-600 reads AC current only.",
    "The T5-600's current range reaches 100A against the 106's 10A.",
    "Only the 106 measures capacitance, and its resistance range runs to 40 MΩ instead of 1,000 Ω.",
    "The 106 is the lighter tool at 200 g; the T5-600 weighs 300 g but is rated for a 3 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Measuring the same load, step by step</h2>
        <p className="text-muted leading-7 mb-4">
          Suppose you want the current drawn by a heater. Here is what each tool asks of you.
        </p>
        <div className="space-y-4">
          <Figure caption={<>Fluke 106: the meter has to become part of the circuit.</>}>
            <FlowDiagram
              steps={[
                { label: "Switch off", sub: "Isolate the circuit" },
                { label: "Open it", sub: "Disconnect one wire" },
                { label: "Wire in leads", sub: "10A jack and COM" },
                { label: "Power up, read", sub: "Up to 10A" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fluke T5-600: the circuit stays as it is.</>}>
            <FlowDiagram
              steps={[
                { label: "Set to current", sub: "Select amps" },
                { label: "Slide the jaw", sub: "Round one conductor" },
                { label: "Read", sub: "Up to 100A AC" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which current jobs suit which tool</h2>
        <DataTable
          head={["Current to check", "Fluke 106", "Fluke T5-600"]}
          rows={[
            ["Car or leisure battery drain (DC)", "Coarsely: lowest range is 4A", "No (AC only)"],
            ["Solar panel output (DC)", "Yes, to 10A", "No"],
            ["Kettle or heater on a 13A or 15A circuit", "Only to 10A", "Yes"],
            ["Air-conditioner or pump motor", "Only if it draws 10A or less", "Yes, to 100A"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Open-jaw safety">
            Measuring through a jaw keeps you from handling disconnected live conductors. For the technique on a
            clamp meter, see{" "}
            <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
              how to measure AC current with a clamp meter
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Pick the Fluke 106 if you need DC current or capacitance, or want the smallest tool that reads amps. Pick the T5-600 if your current checks are AC, often above 10A, and you'd rather not open circuits to make them. The 106 suits batteries and vehicles; the T5-600 suits panels and motors.",
  faqs: [
    {
      question: "Can the Fluke T5-600 measure DC current?",
      answer: "No. Its open jaw reads AC current only, up to 100A. The Fluke 106 reads AC and DC current up to 10A.",
    },
    {
      question: "Do I need to break the circuit to measure current with the Fluke 106?",
      answer:
        "Yes. Like any multimeter current range, its leads go in series with the load. The T5-600 avoids this by reading through its open jaw.",
    },
    {
      question: "What is the largest wire the T5-600's jaw takes?",
      answer: "Fluke gives a 12.9 mm (0.5 in) jaw opening, enough for wire up to 1/0 THHN.",
    },
    {
      question: "Do the 106 and T5-600 have the same warranty?",
      answer: "Yes, Fluke lists two years for both.",
    },
    {
      question: "Are either of these True RMS?",
      answer:
        "No. Fluke positions the 106 for work where True RMS isn't needed and lists the T5-600 as average-responding.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
  ],
};

export default function Fluke106VsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
