// Fluke 117 per Fluke's 114/115/116/117 datasheet (2793260b, 08/2020,
// https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf) and the 117 product page
// (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117), as used on fluke-115-vs-fluke-117:
// True RMS; CAT III 600V; 6,000 counts + 33-segment bar graph; DC V +/-(0.5%+2); AC V 45-500 Hz +/-(1.0%+3); input >10 Mohm DC,
// >5 Mohm AC; AutoVolt LoZ about 3 kohm; VoltAlert NCV; 6.000 A and 10.00 A AC/DC (20 A for 30 s), 1 mA best resolution,
// no mA/uA range; resistance 600.0 ohm to 40.00 Mohm +/-(0.9%+1); capacitance 1 nF to 9,999 uF +/-(1.9%+2); frequency to
// 50 kHz; Min/Max/Avg; 167 x 84 x 46 mm; 550 g; one 9 V, 400 h typical; 3-year warranty.
// Fluke 15B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus (checked 2026-10-26):
// DC V 4/40/400/1000 V +/-(0.5%+3); AC V 40-500 Hz +/-(1.0%+3); current 400.0 uA (0.1 uA) to 10.00 A, +/-(1.5%+3);
// resistance 400.0 ohm to 40.00 Mohm, +/-(0.5%+2) on the middle ranges; capacitance 40 nF to 1000 uF, +/-(2%+5) to
// +/-(5%+5); input >10 Mohm; 4000 counts; backlight; 2 x AA, at least 500 h; fuses 440 mA and 11 A; 183 x 91 x 49.5 mm;
// 455 g; IP40; True RMS not claimed. CAT II 1000V and Data Hold only per the Pick.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-15b-plus";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 15B+",
  description:
    "Fluke 117 vs Fluke 15B+: an electrician's True RMS meter with NCV and LoZ against Fluke's plainest volts-amps-ohms meter. Specs, charts and verdict.",
  image: picks.find((p) => p.name === "Fluke 117")!.image,
  path: "/multimeters/fluke-117-vs-fluke-15b-plus",
});

const link = "text-accent hover:underline";

/** Current each meter can resolve, on a log axis from 0.1 µA to 10 A, with example loads marked (approximate values). */
function CurrentSpanDiagram() {
  const x0 = 20;
  const x1 = 320;
  // log10 from -7 (0.1 µA) to 1 (10 A)
  const X = (amps: number) => x0 + ((Math.log10(amps) + 7) / 8) * (x1 - x0);
  const ticks: [number, string][] = [
    [1e-7, "0.1 µA"],
    [1e-5, "10 µA"],
    [1e-3, "1 mA"],
    [1e-1, "100 mA"],
    [10, "10 A"],
  ];
  const loads: [number, string][] = [
    [2e-6, "Flame sensor, a few µA"],
    [0.02, "4–20 mA loop"],
    [0.83, "100 W lamp, 120 V"],
  ];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram on a logarithmic current axis: the Fluke 15B+ resolves current from 0.1 microamps up to 10 amps, while the Fluke 117 starts at 1 milliamp resolution and also reaches 10 amps, so only the 15B+ can read a flame-sensor current of a few microamps"
    >
      <line x1={x0} x2={x1} y1="120" y2="120" className="stroke-foreground" strokeWidth="1.2" />
      {ticks.map(([a, l]) => (
        <g key={l}>
          <line x1={X(a)} x2={X(a)} y1="116" y2="124" className="stroke-foreground" strokeWidth="1" />
          <text x={X(a)} y="137" fontSize="9" textAnchor="middle" className="fill-muted">
            {l}
          </text>
        </g>
      ))}
      <rect x={X(1e-7)} y="30" width={X(10) - X(1e-7)} height="16" rx="4" className="fill-accent/70" />
      <text x={X(1e-7) + 4} y="42" fontSize="9.5" fontWeight="600" className="fill-foreground">
        Fluke 15B+: 0.1 µA steps up to 10 A
      </text>
      <rect x={X(1e-3)} y="56" width={X(10) - X(1e-3)} height="16" rx="4" className="fill-muted" />
      <text x={X(1e-3) - 4} y="68" fontSize="9.5" fontWeight="600" textAnchor="end" className="fill-foreground">
        Fluke 117: 1 mA steps
      </text>
      {loads.map(([a, l], i) => (
        <g key={l}>
          <line x1={X(a)} x2={X(a)} y1="80" y2="120" className="stroke-accent" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={X(a)} cy="120" r="3.5" className="fill-accent" />
          <text x={X(a)} y={154 + (i % 2) * 14} fontSize="9" textAnchor="middle" className="fill-foreground">
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 15B+",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke 15B+ is the gap between Fluke's specialist and its basic meter. The 15B+ keeps things simple: volts, amps from µA to 10A, ohms, capacitance, diode and continuity on a 4,000-count display, with only HOLD and RANGE buttons. The 117 adds True RMS, VoltAlert non-contact detection, AutoVolt, a low-impedance mode, frequency and Min/Max/Average on a 6,000-count display.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS multimeter for electricians, front view",
    chooseIf: [
      "You test live building wiring and want NCV, AutoVolt and LoZ",
      "You need True RMS for drives, dimmers and LED drivers",
      "You want frequency readings and Min/Max/Average recording",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ basic digital multimeter, front view",
    chooseIf: [
      "You want a straightforward Fluke for voltage, current, resistance and continuity",
      "You need µA and mA ranges for electronics or sensor loops",
      "You prefer a meter with almost nothing to learn",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "4,000 counts, backlit" },
    { label: "Max voltage", a: "600V AC/DC", b: "1000V AC/DC" },
    { label: "Safety rating detail", a: "CAT III 600V", b: "CAT III 600V and CAT II 1000V" },
    { label: "Current ranges", a: "6A and 10A AC/DC", b: "µA, mA and 10A AC/DC" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Up to 1,000 µF" },
    { label: "Frequency", a: "Up to 50 kHz", b: "No" },
    { label: "Min/Max recording", a: "Min/Max/Average", b: "No (Data Hold only)" },
    { label: "NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "None listed" },
    { label: "Weight", a: "550 g", b: "455 g" },
    { label: "Battery", a: "One 9V, about 400 hours", b: "2 × AA, 500 hours minimum" },
    { label: "Warranty", a: "3 years", b: "1 year (users manual)" },
  ],
  differences: [
    "The 117 is True RMS; Fluke doesn't describe the 15B+ as True RMS.",
    "The 117 adds VoltAlert non-contact detection, AutoVolt and a low-impedance mode; the 15B+ has none of them.",
    "The 117 reads frequency to 50 kHz and records Min/Max/Average; the 15B+ has neither, only Data Hold.",
    "The 15B+ has µA and mA current ranges and a 1000V voltage range; the 117 starts at a 6A range and tops out at 600V.",
    "The 117's 6,000-count display and bar graph read finer than the 15B+'s 4,000 counts.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 15B+ spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two accuracy tables side by side and the basic measuring quality is close: both quote ±0.5% on
          DC volts and ±1.0% on AC volts, and the 15B+ is actually tighter on paper for mid-range resistance. What
          separates them is how each meter handles real-world signals and which ranges exist at all.
        </p>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 15B+"]}
          rows={[
            ["AC response", "True RMS", "Not stated as True RMS"],
            ["DC volts accuracy", "±(0.5% + 2)", "±(0.5% + 3)"],
            ["AC volts accuracy", "±(1.0% + 3), 45 to 500 Hz", "±(1.0% + 3), 40 to 500 Hz"],
            ["Volts input", ">10 MΩ DC, >5 MΩ AC; about 3 kΩ on AutoVolt", ">10 MΩ"],
            ["Lowest current range", "6.000 A (1 mA steps)", "400.0 µA (0.1 µA steps)"],
            ["Highest current", "10 A; 20 A for 30 s", "10.00 A"],
            ["Resistance", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "400.0 Ω to 40.00 MΩ, ±(0.5% + 2) mid ranges"],
            ["Capacitance accuracy", "±(1.9% + 2)", "±(2% + 5) to ±(5% + 5)"],
            ["Frequency", "To 50 kHz", "No"],
            ["Size", "167 × 84 × 46 mm", "183 × 91 × 49.5 mm"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts per range: 6,000 against 4,000.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 6000, display: "6,000 counts", highlight: true },
                { label: "Fluke 15B+", value: 4000, display: "4,000 counts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum capacitance on a log scale: about ten times more range on the 117.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 9999, display: "9,999 µF", highlight: true },
                { label: "Fluke 15B+", value: 1000, display: "1,000 µF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current step, in microamps, on a log scale (lower is finer): 10,000 times finer on the 15B+.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 1000, display: "1 mA" },
                { label: "Fluke 15B+", value: 0.1, display: "0.1 µA", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery life in hours: 9V typical on the 117, AA minimum on the 15B+.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 400, display: "400 h" },
                { label: "Fluke 15B+", value: 500, display: "500 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The current ranges point in opposite directions</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters stop at 10 A, but they start in very different places. The 117 has no milliamp or microamp
          input: its smallest range is 6.000 A, so the best it can show is a step of 1 mA. The 15B+ has a separate
          fused mA/µA jack with a 400.0 µA range, where each step is 0.1 µA. That is a 10,000-fold difference in
          how small a current each can see.
        </p>
        <Figure caption={<>Current coverage on a log axis. Load values are approximate examples, not measurements.</>}>
          <CurrentSpanDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The example loads show why it matters. A 100 W lamp at 120 V draws 100 ÷ 120 ≈ 0.83 A, easy for either
          meter. A 4–20 mA process loop is readable on the 117 only to the nearest milliamp, which is too coarse
          to tell 12.0 mA from 12.4 mA; the 15B+ shows it to 0.01 mA. A furnace flame sensor current of a few
          microamps is invisible to the 117 and well inside the 15B+&apos;s 400 µA range. For the technique, see
          our guides to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Choosing in three questions</h2>
        <Figure caption={<>A quick way to decide: any &quot;yes&quot; points to the 117; three &quot;no&quot; answers point to the 15B+.</>}>
          <FlowDiagram
            steps={[
              { label: "Live wiring?", sub: "Need NCV or LoZ: 117" },
              { label: "Electronic loads?", sub: "Need True RMS: 117" },
              { label: "Signals?", sub: "Need frequency: 117" },
              { label: "None of these", sub: "15B+ covers it" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Where the 15B+ wins">
            Its µA and mA ranges make it the better choice for sensor loops and small electronics current, and its
            1000V range and CAT II 1000V rating help on higher-voltage appliance and equipment circuits.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential or commercial electrician", "Fluke 117", "VoltAlert, AutoVolt and LoZ for building wiring"],
            ["Technician on drives, dimmers or LED lighting", "Fluke 117", "True RMS reads distorted waveforms correctly"],
            ["Electronics hobbyist or student", "Fluke 15B+", "µA and mA ranges for LEDs, microcontrollers and sensors"],
            ["Instrument tech checking 4–20 mA loops", "Fluke 15B+", "0.01 mA steps on the 40 mA range"],
            ["Logging a sagging supply over time", "Fluke 117", "Min/Max/Average; the 15B+ has Data Hold only"],
            ["Equipment work between 600 V and 1000 V", "Fluke 15B+", "Ranges to 1000 V with a CAT II 1000V rating"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 117 is the meter Fluke built for electricians, and its three extras matter only on live building
          wiring; the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          comparison explains them in depth, and the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          covers the meter as a whole. If you like the 15B+ but want frequency and temperature too, the{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+
          </Link>{" "}
          is the same body with those functions added.
        </p>
        <div className="mt-4">
          <Callout title="Safety: the 1000 V range isn't a CAT IV rating">
            The 15B+ measures to 1000 V, but only on CAT II equipment; on building wiring both meters are rated CAT
            III 600V, so neither belongs at the meter base or service drop. On either meter, never leave the red
            lead in a current jack when you go back to measuring voltage, and confirm a dead circuit with a
            live-dead-live check before touching it. Call a licensed electrician for service-entrance work.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the right buy for electricians and anyone measuring modern electronic loads: True RMS, NCV, AutoVolt and LoZ. The Fluke 15B+ suits students, hobbyists and technicians who want a simple, durable Fluke with µA and mA ranges and don't need those extras.",
  faqs: [
    {
      question: "Is the Fluke 15B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 15B+, so treat it as average-responding. That is fine on clean mains voltage, resistive heaters and batteries. The 117 is True RMS, which matters on variable-speed drives, dimmers and LED drivers, where an average-responding meter can misread distorted AC by a wide margin.",
    },
    {
      question: "Can the Fluke 15B+ measure frequency?",
      answer:
        "No. Fluke's datasheet lists frequency and duty cycle as not available on the 15B+; they are 17B+ features, along with temperature and MIN MAX. The 117 reads frequency up to 50 kHz, enough for generator output, motor drive settings and most control signals you'll meet in electrical work.",
    },
    {
      question: "Which is better for measuring small currents?",
      answer:
        "The 15B+. It has a fused mA/µA input with ranges down to 400.0 µA at 0.1 µA resolution, covering sensor loops, LED current and microcontroller draw. The 117's lowest current range is 6.000 A with a best resolution of 1 mA, so it can't resolve flame-sensor or standby currents at all.",
    },
    {
      question: "Do the Fluke 117 and 15B+ share a safety rating?",
      answer:
        "Both are CAT III 600V, which covers outlets, branch circuits and distribution panels. The 15B+ also carries a CAT II 1000V rating and measures up to 1000V, useful on some appliance and equipment circuits. The 117 measures up to 600V. Neither is rated CAT IV for service-entrance work.",
    },
    {
      question: "What is the difference between the 15B+ and 17B+?",
      answer:
        "They share the same body, display and safety rating, but the 17B+ adds frequency, duty cycle, temperature, MIN MAX and relative mode. If you like the 15B+'s µA and mA ranges but also want signal and temperature readings, the 17B+ is the step up. See our 17B+ vs 15B+ comparison for details.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 15B+ vs Fluke 101", href: "/multimeters/fluke-15b-plus-vs-fluke-101" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsFluke15BPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
