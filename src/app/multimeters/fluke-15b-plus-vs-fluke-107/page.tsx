// Specs per Fluke, checked 2026-10-26:
// - Fluke 15B+ product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus
//   DC/AC V 4.000 / 40.00 / 400.0 / 1000 V, DC ±(0.5% + 3), AC (40-500 Hz) ±(1.0% + 3); 400.0 mV ranges; current 400.0 µA,
//   4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3), AC 40-400 Hz; resistance 400.0 Ω to 40.00 MΩ;
//   capacitance 40.00 nF to 1000 µF; diode 2.000 V ±10%; 4000 counts, 3 updates/s; white backlight; data hold;
//   2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; fuses 440 mA and 11 A, 1000 V; IP 40; CAT III 600 V; 1000 V maximum
//   between any terminal and earth. The page gives no drop rating, warranty or True RMS claim. CAT II 1000V and "no
//   frequency or duty cycle" per the Pick note (Fluke 15B+/17B+ datasheet and users manual).
// - Fluke 107 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107
//   DC/AC V 6.000 / 60.00 / 600.0 V, DC ±(0.5% + 3), AC ±(1.0% + 3); current 4.000 A / 10.00 A ±(1.5% + 3), AC 40-200 Hz;
//   capacitance 50.00 nF to 1000 µF; frequency 10 Hz to 100 kHz ±(0.1% + 3); duty cycle 1-99%; 6000 counts; backlit;
//   2 × AAA, 200 h minimum; 142 × 69 × 28 mm; 200 g; 11 A fuse; IP 40; 1 m drop; CAT III 600 V; 2-year warranty;
//   "not a true-RMS" (page FAQ).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 107",
  description:
    "Fluke 15B+ vs Fluke 107: the full-size meter has µA and mA ranges and a 1000V reading, the pocket 107 adds frequency and duty cycle. Specs and verdict.",
  path: "/multimeters/fluke-15b-plus-vs-fluke-107",
});

const link = "text-accent hover:underline";

/** Current coverage on a log axis: where each meter's finest resolution starts, against typical currents. */
function CurrentLadderDiagram() {
  // log10(A): -7 (0.1 µA) to 1 (10 A) mapped onto x = 30..320
  const x = (exp: number) => 30 + ((exp + 7) / 8) * 290;
  const ticks = [
    { e: -7, t: "0.1 µA" },
    { e: -6, t: "1 µA" },
    { e: -5, t: "10 µA" },
    { e: -4, t: "100 µA" },
    { e: -3, t: "1 mA" },
    { e: -2, t: "10 mA" },
    { e: -1, t: "100 mA" },
    { e: 0, t: "1 A" },
    { e: 1, t: "10 A" },
  ];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram on a logarithmic current axis from 0.1 microamp to 10 amps: the Fluke 15B+ resolves from 0.1 microamp on its 400 microamp range up to 10 amps, while the Fluke 107 resolves only from 1 milliamp on its 4 amp range, so standby and sensor currents in the microamp range are invisible to the 107"
    >
      <text x="30" y="20" fontSize="9.5" fontWeight="700" className="fill-foreground">
        Fluke 15B+: 0.1 µA steps up to 10 A
      </text>
      <rect x={x(-7)} y="26" width={x(1) - x(-7)} height="16" rx="4" className="fill-accent" />
      <text x="30" y="64" fontSize="9.5" fontWeight="700" className="fill-foreground">
        Fluke 107: 1 mA steps up to 10 A
      </text>
      <rect x={x(-3)} y="70" width={x(1) - x(-3)} height="16" rx="4" className="fill-foreground/70" />
      <rect x={x(-7)} y="70" width={x(-3) - x(-7)} height="16" rx="4" className="fill-none stroke-border" strokeDasharray="3 3" />
      <text x={(x(-7) + x(-3)) / 2} y="82" fontSize="8.5" textAnchor="middle" className="fill-muted">
        reads 0.000 A here
      </text>
      <line x1="30" x2="320" y1="104" y2="104" className="stroke-border" />
      {ticks.map((k) => (
        <g key={k.e}>
          <line x1={x(k.e)} x2={x(k.e)} y1="101" y2="107" className="stroke-border" />
          <text x={x(k.e)} y="118" fontSize="7.5" textAnchor="middle" className="fill-muted">
            {k.t}
          </text>
        </g>
      ))}
      <text x="30" y="140" fontSize="8.5" className="fill-muted">Typical currents (approximate, vary by device):</text>
      <text x={x(-5)} y="156" fontSize="8.5" textAnchor="middle" className="fill-foreground">sleep current</text>
      <text x={x(-1.7)} y="156" fontSize="8.5" textAnchor="middle" className="fill-foreground">LED, small board</text>
      <text x={x(0.4)} y="156" fontSize="8.5" textAnchor="middle" className="fill-foreground">motors</text>
      <text x={x(-1.75)} y="172" fontSize="8.5" textAnchor="middle" className="fill-foreground">4–20 mA loops</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 107",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 15B+ vs Fluke 107 is an unusual trade: the smaller meter has the extra functions. The pocket 107 reads frequency and duty cycle, which the 15B+ can't, while the full-size 15B+ counters with microamp and milliamp current ranges and a reading up to 1000V. Neither is True RMS, and both carry CAT III 600V. Buy the 15B+ if small currents matter to you, and the 107 if signals and pocketability do.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "Small currents in µA or mA are part of your work",
      "You sometimes measure above 600V on CAT II equipment",
      "You want long battery life from AA cells: 500 hours minimum",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You need frequency or duty cycle, for example on PWM or motor signals",
      "You want a 6,000-count display",
      "You want a meter that fits in a pocket and survives a 1 m drop",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Current", a: "400.0 µA to 10.00 A in six ranges", b: "4.000 A and 10.00 A" },
    { label: "Best current resolution", a: "0.1 µA", b: "1 mA" },
    { label: "Frequency / duty cycle", a: "No / No", b: "Yes / Yes" },
    { label: "Capacitance", a: "40.00 nF to 1,000 µF", b: "50.00 nF to 1,000 µF" },
    { label: "Diode / continuity", a: "Yes / Yes", b: "Yes / Yes" },
    { label: "Current fuses", a: "440 mA and 11 A, 1000V", b: "11 A, 1000V" },
    { label: "Drop rating", a: "Not stated", b: "1 m" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
  ],
  differences: [
    "The 107 measures frequency and duty cycle; Fluke's datasheet lists both as unavailable on the 15B+.",
    "The 15B+ includes µA and mA current ranges; the 107 starts at a 4 A range with 1 mA steps.",
    "The 15B+ reads up to 1000V and is also rated CAT II 1000V; the 107 is a 600V meter.",
    "The 107's display reaches 6,000 counts, the 15B+'s 4,000.",
    "The 107 is less than half the weight (200 g against 455 g) and is rated for a 1 m drop.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one has that the other doesn&apos;t</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">Only on the 15B+</p>
            <InfoCards
              items={[
                { label: "µA / mA", desc: "Small-current ranges on a fused input." },
                { label: "1000V", desc: "Reads to 1000V; CAT II 1000V." },
              ]}
            />
          </div>
          <div>
            <p className="font-display text-xs uppercase tracking-wide text-accent mb-3">Only on the 107</p>
            <InfoCards
              items={[
                { label: "Frequency", desc: "For signals, motors and supplies." },
                { label: "Duty cycle", desc: "For PWM and switching outputs." },
              ]}
            />
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          OhmSavvy hasn&apos;t bought either meter; the figures on this page come from Fluke&apos;s product pages and its
          15B+/17B+ datasheet. Both share the same voltage and resistance accuracy class, so the choice comes down to
          which extra functions you&apos;ll use.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 107 spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 15B+", "Fluke 107"]}
          rows={[
            ["DC volts ranges", "4.000 / 40.00 / 400.0 / 1000 V", "6.000 / 60.00 / 600.0 V"],
            ["DC volts accuracy", "±(0.5% + 3)", "±(0.5% + 3)"],
            ["AC volts accuracy", "±(1.0% + 3), 40–500 Hz", "±(1.0% + 3), 40–500 Hz"],
            ["Current ranges", "400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A", "4.000 A, 10.00 A"],
            ["Current accuracy", "±(1.5% + 3)", "±(1.5% + 3)"],
            ["AC current bandwidth", "40–400 Hz", "40–200 Hz"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ"],
            ["Frequency", "No", "10 Hz to 100 kHz, ±(0.1% + 3)"],
            ["Duty cycle", "No", "1% to 99%"],
            ["Display", "4,000 counts, 3 updates/s", "6,000 counts, 3 updates/s"],
            ["Safety rating", "CAT III 600V, CAT II 1000V", "CAT III 600V"],
            ["Warranty", "1 year (users manual)", "2 years"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Finest current step, log scale. The 15B+ resolves 10,000 times smaller currents.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 15B+ (400 µA range)", value: 0.0000001, display: "0.1 µA", highlight: true },
                { label: "Fluke 107 (4 A range)", value: 0.001, display: "1 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per Fluke. The 107 is 255 g lighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 455, display: "455 g" },
                { label: "Fluke 107", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Minimum battery life in hours, per Fluke. AA cells give the 15B+ 2.5 times the runtime.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+ (2 × AA)", value: 500, display: "500 h", highlight: true },
                { label: "Fluke 107 (2 × AAA)", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Display counts. More counts keep an extra digit on readings just above a range boundary.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 4000, display: "4,000" },
                { label: "Fluke 107", value: 6000, display: "6,000", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where small-current ranges make the difference</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters quote the same ±(1.5% + 3) current accuracy, but the &quot;+ 3&quot; is counted in the last digit
          of whichever range you&apos;re on, so resolution decides what you can see. A device drawing 50 µA in standby
          reads 50.0 µA on the 15B+&apos;s 400 µA range, with a tolerance of 1.5% × 50 + 3 × 0.1 = ±1.05 µA. On the
          107&apos;s 4 A range, the same current is a twentieth of one 1 mA step, so the display shows 0.000 A.
        </p>
        <Figure caption={<>Current coverage on a log axis. The dashed region is below the 107&apos;s 1 mA resolution.</>}>
          <CurrentLadderDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That gap covers battery-powered sensors, remote controls in standby, a car module that should be asleep, and
          4–20 mA instrument loops, which read 4.00 to 20.00 mA on the 15B+&apos;s 40 mA range but only 0.004 to 0.020 A
          on the 107. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current
          </Link>{" "}
          walks through the hookup.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where frequency and duty cycle make the difference</h2>
        <p className="text-muted leading-7 mb-4">
          Going the other way, the 107 turns PWM questions into numbers. A 12 V PWM output switching at 25 kHz and 40% duty shows
          as about 4.8 V average on a voltmeter, which tells you little on its own. The 107 adds the frequency, read to
          ±(0.1% + 3), and the duty cycle, so you can confirm a controller is actually commanding 40%. The 15B+ shows
          only the average voltage. These figures are an illustrative example, not a measurement.
        </p>
        <p className="text-muted leading-7">
          Frequency also helps confirm 60 Hz from a generator or an inverter&apos;s output. For waveform shape, though,
          neither meter replaces a scope; our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            measuring PWM duty cycle with an oscilloscope
          </Link>{" "}
          shows what a meter can&apos;t.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 107: which should you buy?</h2>
        <DataTable
          head={["You are", "Better fit", "Reason"]}
          rows={[
            ["An electronics hobbyist debugging PWM", "107", "Frequency and duty cycle"],
            ["Checking device standby current", "15B+", "mA and µA ranges"],
            ["Keeping a meter in a car or bag", "107", "200 g, 1 m drop rating"],
            ["Testing CAT II equipment above 600V", "15B+", "Reads to 1000V"],
            ["Servicing 4–20 mA sensors", "15B+", "40.00 mA range with 0.01 mA steps"],
            ["Student on a lab bench", "15B+", "Full current ranges and AA battery life"],
            ["Electrician on mains wiring", "Neither ideal", "Not True RMS; see the Fluke 117"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="If you want both sets of features">
            The Fluke 17B+ combines the 15B+&apos;s current ranges with frequency, duty cycle, temperature and MIN
            MAX in the same full-size case, though still without True RMS. Compare it in{" "}
            <Link href="/multimeters/fluke-17b-plus-vs-fluke-107" className={link}>
              Fluke 17B+ vs Fluke 107
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: current ranges are fused for a reason">
        The 15B+ protects its µA/mA input with a 440 mA fuse and its A input with an 11 A fuse; the 107 has the 11 A
        fuse only. Never connect either current input across a voltage source, always start on the highest range when
        the current is unknown, and replace fuses only with Fluke&apos;s specified 1000V parts. Both meters are CAT III
        600V for building wiring; the 15B+&apos;s 1000V rating is CAT II only, for equipment, not panels.
      </Callout>
    </>
  ),
  bottomLine:
    "The 107 is the better pick for most electronics hobbyists: frequency, duty cycle and a 6,000-count display in a pocketable, drop-rated body. The 15B+ wins if you need small-current ranges or readings above 600V, and you're happy with a full-size meter.",
  faqs: [
    {
      question: "Does the Fluke 15B+ measure frequency?",
      answer:
        "No. Fluke's 15B+/17B+ datasheet lists frequency and duty cycle as not available on the 15B+, and its product page specifies only volts, current, resistance, capacitance, diode and continuity. The 107 reads frequency from 10 Hz to 100 kHz and duty cycle from 1 to 99%, and the full-size 17B+ has both as well.",
    },
    {
      question: "Can the Fluke 107 measure milliamps?",
      answer:
        "Only coarsely. Fluke lists 4.000 A and 10.00 A ranges for the 107, so the smallest step is 1 mA and a 25 mA load reads 0.025 A. There are no dedicated mA or µA ranges. The 15B+ has 400.0 µA, 4000 µA, 40.00 mA and 400.0 mA ranges for small currents.",
    },
    {
      question: "Which is more rugged, the 15B+ or the 107?",
      answer:
        "Fluke states a 1 m drop rating for the 107 and gives both meters an IP 40 rating. The 15B+ product page doesn't state a drop height, though it is a larger meter in a full-size case. Neither is sealed against water, so keep both out of rain and wet work.",
    },
    {
      question: "Are the Fluke 15B+ and 107 True RMS?",
      answer:
        "No. Fluke's 107 page says plainly that it is not a true-RMS meter, and Fluke makes no True RMS claim for the 15B+. Both read clean sine waves well, but on variable-speed drives, LED drivers and switch-mode supplies their AC readings can be wrong. The Fluke 115 or 117 are the True RMS step up.",
    },
    {
      question: "Why does the 15B+ read 1000V but carry a 600V CAT III rating?",
      answer:
        "The measurement range and the safety category are different things. The 15B+ can display up to 1000V and is rated CAT II 1000V for equipment plugged into outlets, but only CAT III 600V for building wiring such as panels and feeders. Never use it above 600V on fixed installation circuits.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
  ],
};

export default function Fluke15BPlusVsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
