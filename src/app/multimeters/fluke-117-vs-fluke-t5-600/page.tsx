// Specs per Fluke, checked 2026-10-26:
// - Fluke 117 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 114/115/116/117 datasheet: https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
// - Fluke T5-600 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600
//   (AC volts ±(1.5% + 2), DC volts ±(1% + 1), 1 V resolution; AC current to 100.0 A, 0.1 A resolution, ±(3% + 3);
//   resistance to 1000 Ω, ±(1% + 2); continuity beeper on below 25 Ω, off above 400 Ω; 12.9 mm jaw, 1/0 THHN max;
//   AC response averaging; 2 × AA, 400 h alkaline; 203 × 51 × 30.5 mm, 300 g; 3 m drop; volts LED at 30 V AC;
//   CAT III 600 V; 2-year warranty; no DC current)
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-t5-600";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke T5-600",
  description:
    "Fluke 117 vs Fluke T5-600: True RMS, LoZ and NCV in an electrician's multimeter against a rugged tester reading 100A through an open jaw. Which fits?",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
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

/** Why the OpenJaw needs one conductor: in a cord, the hot and neutral fields cancel. */
function OneConductorDiagram() {
  return (
    <svg
      viewBox="0 0 340 150"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: around a single conductor the magnetic field adds up and the T5-600 reads the load current; around a whole cord the equal and opposite currents in hot and neutral cancel and the reading is near zero"
    >
      <g>
        <path d="M60 28 V92 M100 28 V92 M60 28 H100" className="stroke-accent fill-none" strokeWidth="3" />
        <circle cx="80" cy="66" r="9" className="fill-surface stroke-foreground" strokeWidth="1.6" />
        <text x="80" y="70" fontSize="10" textAnchor="middle" className="fill-foreground">×</text>
        <circle cx="80" cy="66" r="18" className="fill-none stroke-accent" strokeWidth="1" strokeDasharray="3 3" />
        <text x="80" y="114" fontSize="10" textAnchor="middle" className="fill-foreground">One conductor</text>
        <text x="80" y="128" fontSize="9" textAnchor="middle" className="fill-accent">Reads the load current</text>
      </g>
      <g>
        <path d="M230 28 V92 M290 28 V92 M230 28 H290" className="stroke-muted fill-none" strokeWidth="3" />
        <circle cx="248" cy="66" r="9" className="fill-surface stroke-foreground" strokeWidth="1.6" />
        <text x="248" y="70" fontSize="10" textAnchor="middle" className="fill-foreground">×</text>
        <circle cx="272" cy="66" r="9" className="fill-surface stroke-foreground" strokeWidth="1.6" />
        <text x="272" y="70" fontSize="11" textAnchor="middle" className="fill-foreground">•</text>
        <text x="260" y="114" fontSize="10" textAnchor="middle" className="fill-foreground">Whole cord (hot + neutral)</text>
        <text x="260" y="128" fontSize="9" textAnchor="middle" className="fill-muted">Fields cancel: reads near 0 A</text>
      </g>
      <text x="170" y="145" fontSize="8.5" textAnchor="middle" className="fill-muted">× current flowing in, • current flowing out. Jaw opening 12.9 mm, up to 1/0 THHN.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke T5-600",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 117 vs Fluke T5-600 is the question many electricians ask before buying their first Fluke. The 117 is a True RMS multimeter with VoltAlert non-contact detection, AutoVolt and a low-impedance mode for ghost voltages. The T5-600 is a tester: it can't match the 117's measurements, but it reads AC current up to 100A without opening the circuit and is built to survive a 3 m drop.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter",
    chooseIf: [
      "You work on variable-speed drives, LED lighting or electronic controls where True RMS matters",
      "You want LoZ to rule out ghost voltages before you touch a conductor",
      "You need capacitance, frequency, DC current or resistance above 1,000 Ω",
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
    { label: "Voltage", a: "To 600V AC/DC, 0.1 V resolution on 600 V", b: "To 600V AC/DC, 1 V resolution, auto AC/DC" },
    { label: "Voltage accuracy", a: "DC ±(0.5% + 2), AC ±(1.0% + 3)", b: "DC ±(1% + 1), AC ±(1.5% + 2)" },
    { label: "Current", a: "6A and 10A ranges, AC/DC, leads in series", b: "To 100.0A AC, open jaw, ±(3% + 3)" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Continuity", a: "Beeps below 20 Ω", b: "On below 25 Ω, off above 400 Ω" },
    { label: "Capacitance", a: "To 9,999 µF", b: "No" },
    { label: "Frequency", a: "To 50 kHz", b: "No" },
    { label: "Ghost-voltage tools", a: "LoZ mode and VoltAlert NCV", b: "Neither listed" },
    { label: "Battery", a: "One 9V, 400 h typical", b: "2 × AA, 400 h alkaline" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "203 × 51 × 30.5 mm, 300 g" },
    { label: "Warranty", a: "3 years", b: "2 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke lists the T5-600's AC response as averaging.",
    "The 117 has LoZ, AutoVolt and VoltAlert non-contact detection; the T5-600 has automatic AC/DC selection but no LoZ or NCV.",
    "The T5-600 reads up to 100A AC through its open jaw without breaking the circuit; the 117 reads up to 10A with its leads in series, but on DC as well.",
    "The 117 measures capacitance to 9,999 µF, frequency to 50 kHz and resistance to 40 MΩ; the T5-600 stops at 1,000 Ω and has neither of the others.",
    "The 117 resolves 0.1 V on its 600 V range; the T5-600 shows whole volts.",
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
        <p className="text-muted leading-7 mt-4">
          The open jaw has two catches. It senses the magnetic field of the current, so it must surround one
          conductor, not a whole cord where the hot and neutral fields cancel. And Fluke caps it at a 12.9 mm opening,
          enough for conductors up to 1/0 THHN. A split-cord adapter or a single wire at a breaker or motor lead is the
          usual way in.
        </p>
        <div className="mt-4">
          <Figure caption={<>Why the fork must go round one wire. Same physics as any clamp meter.</>}>
            <OneConductorDiagram />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs T5-600 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Range is the T5-600&apos;s strength; precision is the 117&apos;s. The tester reads ten times more current,
          but in 0.1 A steps with a ±(3% + 3) tolerance. The multimeter reads less, in 1 mA steps at ±(1.5% + 3), and
          its voltage display resolves a tenth of a volt where the T5-600 shows whole volts.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum current on each tool. The 117 also takes 20 A for 30 seconds.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 10, display: "10A AC/DC" },
                { label: "Fluke T5-600", value: 100, display: "100A AC", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Worked from Fluke&apos;s specs: worst-case error reading a 120.0 V AC outlet.</>}>
            <BarChart
              items={[
                { label: "Fluke 117: 1.0% + 3 × 0.1 V", value: 1.5, display: "±1.5 V", highlight: true },
                { label: "T5-600: 1.5% + 2 × 1 V", value: 3.8, display: "±3.8 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest resistance each can read, on a log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 40_000_000, display: "40 MΩ", highlight: true },
                { label: "Fluke T5-600", value: 1000, display: "1,000 Ω" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke T5-600", value: 300, display: "300 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind the voltage chart: 1.0% of 120 V is 1.2 V, and 3 counts of 0.1 V add 0.3 V, so the
          117 is good to ±1.5 V. On the T5-600, 1.5% of 120 V is 1.8 V and 2 counts of 1 V add 2 V, giving ±3.8 V.
          Either answers &quot;is it live?&quot; The 117 also answers &quot;is it sagging?&quot; Current works the
          same way: at a 20.0 A reading the T5-600 is within about ±0.9 A, which is fine for spotting an overloaded
          motor but not for fine comparisons. Battery life is a tie at 400 hours typical on Fluke&apos;s figures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which to reach for first on a service call</h2>
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
        <p className="text-muted leading-7 mt-4">
          On a motor that trips its overload, the T5-600 gets you a running-current number in seconds without
          touching the wiring. Checking the run capacitor, a control transformer&apos;s secondary or a DC sensor
          supply needs the 117. On remodel work, where abandoned runs share boxes with live ones, the 117&apos;s LoZ
          position stops phantom readings from passing as live circuits. The T5-600&apos;s strengths are speed and
          survival: probes stored in the back and a 3 m drop rating suit a tool that rides in a pouch all day.
        </p>
        <div className="mt-4">
          <KeyIdea title="Why True RMS matters on modern loads">
            Drives, dimmers and switch-mode supplies distort the current waveform, and an average-responding
            tool can read them low or high. The 117 measures the true heating value; the T5-600 is calibrated for
            clean sine waves. Read more in our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 or T5-600: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician buying one tool", "Fluke 117", "True RMS, LoZ, NCV, capacitance and DC current cover more jobs"],
            ["Motor and pump service tech", "Fluke T5-600", "Running current to 100 A without opening the circuit"],
            ["HVAC technician", "Both, or a clamp meter", "117 for capacitors and controls; T5-600 for compressor amps"],
            ["Remodel or service electrician", "Fluke 117", "LoZ sorts ghost voltage on shared and abandoned runs"],
            ["Industrial maintenance on drives", "Fluke 117", "Averaging AC response misreads distorted waveforms"],
            ["Apprentice wanting a tough first tester", "Fluke T5-600", "3 m drop rating, simple controls, stored probes"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you want the 117&apos;s measurements plus a jaw that reads more than 100 A, a clamp meter is the usual
          partner; our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
            Fluke 117 vs Fluke 323
          </Link>{" "}
          cover that route.
        </p>
      </section>

      <Callout title="Safety: both stop at CAT III 600V">
        The 117 and the T5-600 are rated CAT III 600V: fine for panels, feeders and branch circuits, not for the
        service drop, meter base or outdoor service entrance where CAT IV applies. Neither tester&apos;s beep or LED
        proves a circuit is dead; confirm with the probes on a known live source before and after. Treat any
        unexpected reading at a panel as a reason to stop and call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "If you can own only one, the Fluke 117 is the more complete electrician's instrument: True RMS, LoZ, NCV and full multimeter functions with finer resolution. The T5-600 wins on current, up to 100A without opening the circuit, and on toughness, which is why it makes an excellent second tool beside a 117 rather than a replacement for it.",
  faqs: [
    {
      question: "Is the Fluke T5-600 True RMS?",
      answer:
        "No. Fluke lists its AC response as averaging, calibrated to the RMS value of a sine wave. On resistive loads and clean mains that is accurate enough, but on drives, LED drivers and switch-mode supplies it can read noticeably off. The Fluke 117 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Can the Fluke 117 measure 100 amps?",
      answer:
        "No. Its current ranges stop at 10A continuous, with 20A allowed for 30 seconds, and the circuit has to be opened so the meter sits in series. For higher currents use a clamp meter or the T5-600's open jaw, which reads up to 100A AC around a single conductor.",
    },
    {
      question: "Does the T5-600 have a low-impedance mode?",
      answer:
        "Fluke doesn't list one, and it has no non-contact voltage sensor either; its automatic AC/DC selection is a convenience, not a LoZ input. The 117's AutoVolt position drops the input to about 3 kΩ, which is the feature to use when you suspect ghost voltage on a disconnected wire.",
    },
    {
      question: "Can the Fluke T5-600 measure DC current?",
      answer:
        "No. Its OpenJaw sensor reads AC current only, from 0.1 A resolution up to 100.0 A, and Fluke's FAQ confirms it can't measure DC amps. For DC current on battery, solar or automotive circuits, the 117 reads up to 10 A DC with its leads in series.",
    },
    {
      question: "What warranty do the Fluke 117 and T5-600 carry?",
      answer:
        "Fluke gives the 117 three years and the T5-600 two years. Both are sold by Fluke in the US. The T5-600 is also built for rough handling: Fluke says it withstands a 3 m (10 ft) drop, a figure Fluke doesn't publish for the 117.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "Fluke 117 vs Fluke 323", href: "/multimeters/fluke-117-vs-fluke-323" },
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
