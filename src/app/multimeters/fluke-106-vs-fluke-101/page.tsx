import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 106 vs Fluke 101",
  description:
    "Fluke 106 vs Fluke 101: the 106 reads current up to 10A, the smaller 101 can't read current but adds frequency and diode test. Specs, diagrams, verdict.",
  path: "/multimeters/fluke-106-vs-fluke-101",
});

const link = "text-accent hover:underline";

/** Input jacks seen from the front: the 106 has a separate 10A jack, the 101 only two. */
function JackDiagram() {
  const jack = (x: number, label: string, accent = false) => (
    <g key={label}>
      <circle cx={x} cy="40" r="13" className={accent ? "fill-accent/20 stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="1.6" />
      <circle cx={x} cy="40" r="4.5" className="fill-foreground" />
      <text x={x} y="72" fontSize="10" textAnchor="middle" className="fill-muted">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 340 120" className="w-full h-auto" role="img" aria-label="Input jacks: the Fluke 106 has three, including a 10 amp jack; the Fluke 101 has two">
      <text x="80" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">Fluke 106</text>
      {[jack(35, "10A", true), jack(80, "COM"), jack(125, "V Ω")]}
      <text x="255" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">Fluke 101</text>
      {[jack(225, "COM"), jack(285, "V Ω Hz")]}
      <line x1="170" y1="20" x2="170" y2="100" className="stroke-border" strokeDasharray="3 3" />
      <text x="170" y="114" fontSize="9" textAnchor="middle" className="fill-muted">No current jack on the 101, so no current measurement</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "The Fluke 106 vs Fluke 101 decision turns on one question: do you need to measure current? The 106 has 4A and 10A ranges; the 101 has only two input jacks and cannot read current at all. In return the 101 is smaller and lighter and adds frequency, duty cycle and a diode test that the 106 lacks. Both are CAT III 600V, 6,000-count meters that Fluke doesn't describe as True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 digital multimeter, front view",
    chooseIf: [
      "You need to measure a load's current up to 10A",
      "You want a two-year warranty and a model Fluke sells in the US",
      "You don't need diode or frequency readings",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 basic digital multimeter, front view",
    chooseIf: [
      "You only check voltage, resistance and continuity, never current",
      "You want frequency, duty cycle and a diode test in the smallest Fluke",
      "Every gram counts: it weighs 160 g",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "4A and 10A ranges, AC/DC", b: "None (two jacks only)" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 40 MΩ" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "Fluke's sources conflict: 100 µF or 1,000 µF" },
    { label: "Frequency / duty cycle", a: "No", b: "To 100 kHz; duty cycle 1–99%" },
    { label: "Diode test", a: "No", b: "Yes" },
    { label: "Size", a: "142 × 69 × 28 mm", b: "130 × 65 × 27 mm" },
    { label: "Weight", a: "200 g", b: "160 g" },
    { label: "Warranty", a: "2 years", b: "1 year" },
    { label: "US availability", a: "Sold on fluke.com US", b: "Not on fluke.com US; Amazon listing is an import" },
  ],
  differences: [
    "Only the 106 measures current; the 101 has a COM jack and a single input for everything else.",
    "The 101 adds frequency to 100 kHz, duty cycle and a diode test, none of which the 106 has.",
    "The 101 is 40 g lighter and a little smaller in every dimension.",
    "Fluke gives the 106 a two-year warranty and the 101 one year.",
    "Fluke's own 101 documents disagree on maximum capacitance (100 µF vs 1,000 µF); the 106 is listed to 1,000 µF.",
    "The 101 isn't sold on Fluke's US site, so US buyers get it through an import listing.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 101 can&apos;t read current</h2>
        <p className="text-muted leading-7 mb-4">
          Measuring current means routing it through the meter, which needs a dedicated, fused current jack.
          The 106 has a 10A jack beside COM; the 101 has none, so no setting on its dial can read amps.
        </p>
        <Figure caption={<>Input jacks on each meter. The 106&apos;s extra jack (highlighted) is what makes current readings possible.</>}>
          <JackDiagram />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Size, weight and warranty</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight from Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 200, display: "200 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty length in years, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 106", value: 2, display: "2 years", highlight: true },
                { label: "Fluke 101", value: 1, display: "1 year" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <DataTable
            head={["Task", "Fluke 106", "Fluke 101"]}
            rows={[
              ["Outlet or battery voltage", "Yes", "Yes"],
              ["Appliance current draw", "Yes", "No"],
              ["Continuity of a cable or fuse", "Yes", "Yes"],
              ["PWM or fan signal frequency", "No", "Yes"],
              ["Diode or LED check", "No", "Yes"],
            ]}
          />
        </div>
        <div className="mt-4">
          <KeyIdea title="Need current without a current jack?">
            A clamp meter reads AC current around a single conductor without breaking the circuit. See{" "}
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
    "Pick the Fluke 106 if you will ever measure current: it's the only one of the two that can, and it carries a longer warranty and US availability. Pick the Fluke 101 only as an ultra-light voltage, continuity and signal checker, where its frequency and diode functions matter more than amps.",
  faqs: [
    {
      question: "Can the Fluke 101 measure current?",
      answer:
        "No. The 101 has only two input jacks, COM and one input for voltage, resistance and the other functions, and Fluke's documents list no current function.",
    },
    {
      question: "Which is smaller, the Fluke 101 or 106?",
      answer: "The 101, at 130 × 65 × 27 mm and 160 g, against the 106's 142 × 69 × 28 mm and 200 g.",
    },
    {
      question: "Does the Fluke 106 measure frequency?",
      answer:
        "No. Fluke's 106/107 manual lists frequency and duty cycle as 107-only functions. The 101 measures frequency to 100 kHz and duty cycle.",
    },
    {
      question: "What warranty do the Fluke 101 and 106 have?",
      answer: "Fluke gives the 106 two years and the 101 one year, per their users manuals.",
    },
    {
      question: "Is the Fluke 101 sold in the US?",
      answer:
        "Fluke's US site doesn't offer it; it's listed on Fluke's Indian and Malaysian sites. US Amazon listings come from third-party importers.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 101 vs Fluke T5-600", href: "/multimeters/fluke-101-vs-fluke-t5-600" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
  ],
};

export default function Fluke106VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
