import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke T5-600",
  description:
    "Fluke 117 vs Fluke T5-600: True RMS, LoZ and NCV in an electrician's multimeter against a rugged tester reading 100A through an open jaw. Which fits?",
  path: "/multimeters/fluke-117-vs-fluke-t5-600",
});

const link = "text-accent hover:underline";

/** Two ways to read current: the meter in series with the load, or a fork around one conductor. */
function CurrentMethodDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Fluke 117 measures current with its leads in series with the load; the T5-600 slides its open jaw around one wire">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none" strokeLinecap="round">
        {/* left: series */}
        <path d="M20 40 H70 M100 40 H150 V110 H20 V40" />
        <rect x="132" y="60" width="36" height="30" rx="3" className="fill-surface" />
        {/* right: open jaw */}
        <path d="M190 40 H320 V110 H190 V40" />
        <rect x="292" y="60" width="36" height="30" rx="3" className="fill-surface" />
      </g>
      <circle cx="85" cy="40" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="85" y="44" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">A</text>
      <path d="M238 22 V58 M262 22 V58 M238 22 H262" className="stroke-accent" strokeWidth="2.5" fill="none" />
      <g fontSize="10" textAnchor="middle" className="fill-muted">
        <text x="150" y="80">Load</text>
        <text x="310" y="80">Load</text>
        <text x="85" y="132" className="fill-foreground">Fluke 117</text>
        <text x="85" y="146">Circuit opened, meter in series</text>
        <text x="85" y="159">up to 10A, AC or DC</text>
        <text x="255" y="132" className="fill-foreground">Fluke T5-600</text>
        <text x="255" y="146">Fork slides round one wire</text>
        <text x="255" y="159">up to 100A, AC only</text>
      </g>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke T5-600 is the question many electricians ask before buying their first Fluke. The 117 is a True RMS multimeter with VoltAlert non-contact detection, AutoVolt and a low-impedance mode for ghost voltages. The T5-600 is a tester: it can't match the 117's measurements, but it reads AC current up to 100A without opening the circuit and is built to survive a 3 m drop.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter",
    chooseIf: [
      "You work on variable-speed drives, LED lighting or electronic controls where True RMS matters",
      "You want LoZ to rule out ghost voltages before you touch a conductor",
      "You need capacitance, frequency or resistance above 1,000 Ω",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke T5-600")!,
    imageAlt: "Fluke T5-600 electrical tester with open-jaw current fork",
    chooseIf: [
      "You check motor and appliance current above 10A",
      "You want current readings without breaking the circuit",
      "You want a tester that stores its probes in the back and shrugs off falls",
    ],
  },
  extraSpecs: [
    { label: "Instrument type", a: "Digital multimeter", b: "Electrical tester" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "Digital LCD (count not stated)" },
    { label: "Voltage", a: "To 600V AC/DC, AutoVolt", b: "To 600V AC/DC, automatic AC/DC selection" },
    { label: "Current", a: "6A and 10A ranges, AC/DC, leads in series", b: "To 100A AC, open jaw" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "To 9,999 µF", b: "No" },
    { label: "Frequency", a: "To 50 kHz", b: "No" },
    { label: "Ghost-voltage tools", a: "LoZ mode and VoltAlert NCV", b: "Neither listed" },
    { label: "Weight", a: "550 g", b: "300 g" },
    { label: "Warranty", a: "3 years", b: "2 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke lists the T5-600's AC response as averaging.",
    "The 117 has LoZ, AutoVolt and VoltAlert non-contact detection; the T5-600 has automatic AC/DC selection but no LoZ or NCV.",
    "The T5-600 reads up to 100A AC through its open jaw without breaking the circuit; the 117 reads up to 10A with its leads in series, but on DC as well.",
    "The 117 measures capacitance to 9,999 µF, frequency to 50 kHz and resistance to 40 MΩ; the T5-600 stops at 1,000 Ω and has neither of the others.",
    "The T5-600 is lighter at 300 g against 550 g and is rated for a 3 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two ways to read current</h2>
        <p className="text-muted leading-7 mb-4">
          This is the biggest practical difference. To read amps the 117 must become part of the circuit, so
          you switch off, open the circuit and connect the leads in series. The T5-600 slides its fork around a
          single live conductor and reads the AC current flowing through it.
        </p>
        <Figure caption={<>Series measurement on the 117 against the T5-600&apos;s open jaw.</>}>
          <CurrentMethodDiagram />
        </Figure>
        <div className="mt-4">
          <Figure caption={<>Maximum current on each tool.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 10, display: "10A AC/DC" },
                { label: "Fluke T5-600", value: 100, display: "100A AC", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which to reach for first</h2>
        <Figure caption={<>A typical service call, and which tool each step suits.</>}>
          <FlowDiagram
            steps={[
              { label: "Is it live?", sub: "Either; 117 adds VoltAlert" },
              { label: "Ghost voltage?", sub: "117 LoZ mode" },
              { label: "Load current", sub: "T5-600 open jaw" },
              { label: "Capacitor or frequency", sub: "117 only" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Why True RMS matters on modern loads">
            Drives, dimmers and switch-mode supplies distort the current waveform, and an average-responding
            tool can read them low or high. The 117 measures the true heating value. Read more in our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "If you can own only one, the Fluke 117 is the more complete electrician's instrument: True RMS, LoZ, NCV and full multimeter functions. The T5-600 wins on current, up to 100A without opening the circuit, and on toughness, which is why it makes an excellent second tool beside a 117 rather than a replacement for it.",
  faqs: [
    {
      question: "Is the Fluke T5-600 True RMS?",
      answer:
        "No. Fluke lists its AC response as averaging, calibrated to the RMS value of a sine wave. The Fluke 117 is True RMS.",
    },
    {
      question: "Can the Fluke 117 measure 100 amps?",
      answer:
        "No. Its current ranges stop at 10A (20A for 30 seconds). For higher currents use a clamp meter or the T5-600's open jaw, which reads up to 100A AC.",
    },
    {
      question: "Does the T5-600 have a low-impedance mode?",
      answer:
        "Fluke doesn't list one. The 117's LoZ mode is the feature to use when you suspect ghost voltage on a disconnected wire.",
    },
    {
      question: "Which is better for checking motor current?",
      answer:
        "The T5-600: it reads AC current through its fork without opening the circuit and goes to 100A. The 117 would need the circuit broken and tops out at 10A.",
    },
    {
      question: "What warranty do they carry?",
      answer: "Fluke gives the 117 three years and the T5-600 two years.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "How to measure AC current with a clamp meter", href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsFlukeT5600Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
