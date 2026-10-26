// Fluke 17B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus (checked
// 2026-10-26): 4,000 counts, backlit; DC V 4.000/40.00/400.0/1000 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3); current
// 400.0 µA to 10.00 A in six ranges, ±(1.5% + 3), AC 40-400 Hz; resistance to 40.00 MΩ; capacitance 40.00 nF to 1000 µF;
// frequency 10 Hz-100 kHz; duty cycle 1-99%; temperature -55 °C to 400 °C; diode 2.000 V; input >10 MΩ; fuses 440 mA and
// 11 A, 1000 V; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40; CAT III 600V (CAT II 1000V per the datasheet,
// as on the Pick). Users manual (copy at https://techno.my/cdn/shop/files/15B__17B__18B.pdf): MIN MAX and relative are
// 17B+ only; warranty 1 year.
// Fluke T5-600 per https://www.fluke.com/en-us/product/electrical-testing/basic-testers/fluke-t5-600 (as cited on
// /multimeters/fluke-107-vs-fluke-t5-600, checked 2026-10-26): AC V to 600 V, 1 V resolution, ±(1.5% + 2); DC V to
// 600 V ±(1% + 1); automatic AC/DC; AC current to 100.0 A, 0.1 A resolution, ±(3% + 3), 50/60 Hz; no DC current;
// resistance to 1000 Ω ±(1% + 2); continuity beeps below 25 Ω; averaging AC response; CAT III 600V; 2 × AA, 400 h
// alkaline; 30.5 × 51 × 203 mm; 300 g; 3 m drop; jaw opening 12.9 mm, max 1/0 THHN; low input impedance; not for
// multi-conductor cords; 2-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
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

const link = "text-accent hover:underline";

// Number line for the resolution diagram: 11.5 V to 13.5 V.
const nx = (v: number) => 30 + (v - 11.5) * 140;

/** What 0.01 V steps and 1 V steps mean when you read a 12 V battery. */
function ResolutionRulerDiagram() {
  const fine = Array.from({ length: 21 }, (_, i) => 11.5 + i * 0.1);
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Number line from 11.5 to 13.5 volts. The Fluke 17B+ on its 40 volt range steps in hundredths of a volt, so 12.2 and 12.7 volts look clearly different. The Fluke T5-600 steps in whole volts, so both of those batteries fall between the same two display values of 12 and 13 volts."
    >
      <text x="170" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Reading a 12 V battery</text>
      <line x1={nx(11.5)} x2={nx(13.5)} y1="70" y2="70" className="stroke-foreground" strokeWidth="1.4" />
      {fine.map((v) => (
        <line key={v.toFixed(1)} x1={nx(v)} x2={nx(v)} y1="64" y2="76" className="stroke-accent" strokeWidth="0.8" />
      ))}
      <text x="30" y="52" fontSize="9" className="fill-accent">17B+: 0.01 V steps (only every tenth tick drawn)</text>
      {[12, 13].map((v) => (
        <g key={v}>
          <line x1={nx(v)} x2={nx(v)} y1="70" y2="110" className="stroke-foreground" strokeWidth="2.2" />
          <text x={nx(v)} y="124" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {v} V
          </text>
        </g>
      ))}
      <text x="30" y="142" fontSize="9" className="fill-foreground">T5-600: 1 V steps</text>
      {[
        { v: 12.2, t: "12.2 V battery" },
        { v: 12.7, t: "12.7 V battery" },
      ].map(({ v, t }) => (
        <g key={t}>
          <circle cx={nx(v)} cy="88" r="4" className="fill-accent" />
          <text x={nx(v)} y="102" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {t}
          </text>
        </g>
      ))}
      <text x="170" y="166" fontSize="9" textAnchor="middle" className="fill-muted">Both batteries sit between the same two T5-600 display values;</text>
      <text x="170" y="179" fontSize="9" textAnchor="middle" className="fill-muted">the 17B+ separates them by 50 counts.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke T5-600",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
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
    { label: "Display", a: "4,000 counts, backlit", b: "Digital LCD (count not stated), 1 V steps on volts" },
    { label: "Voltage", a: "To 1000V AC/DC", b: "To 600V AC/DC, automatic AC/DC selection" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(1% + 1)" },
    { label: "Current", a: "400 µA to 10A AC/DC via leads, ±(1.5% + 3)", b: "To 100A AC via open jaw, ±(3% + 3)" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 1,000 Ω" },
    { label: "Capacitance", a: "To 1,000 µF", b: "No" },
    { label: "Frequency / duty", a: "10 Hz to 100 kHz; 1–99%", b: "No" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "Recording", a: "MIN MAX, relative, hold", b: "Display hold" },
    { label: "Input impedance", a: ">10 MΩ", b: "Low (Fluke: shouldn't show ghost voltage)" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AA, 400 h alkaline" },
    { label: "Weight", a: "455 g", b: "300 g" },
    { label: "Drop rating", a: "Not stated", b: "3 m (10 ft)" },
    { label: "Warranty", a: "1 year (Fluke manual)", b: "2 years" },
  ],
  differences: [
    "The 17B+ is a general-purpose multimeter; Fluke sells the T5-600 as an electrical tester.",
    "Only the 17B+ measures capacitance, frequency, duty cycle and temperature.",
    "The T5-600 reads AC current up to 100A through its open jaw; the 17B+ reads up to 10A, AC or DC, with the leads in series.",
    "Resistance tops out at 1,000 Ω on the T5-600 against 40 MΩ on the 17B+.",
    "The 17B+ resolves volts to 0.001 V on its 4 V range; the T5-600 reads volts in whole-volt steps.",
    "The T5-600 picks AC or DC voltage automatically and survives a 3 m drop; the 17B+ needs the dial set but offers MIN MAX and relative mode.",
    "Neither is True RMS: Fluke calls the T5-600 average-responding and makes no True RMS claim for the 17B+.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs T5-600 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The two overlap on voltage but diverge sharply elsewhere. These first two charts use a logarithmic scale because
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
          <Figure
            caption={
              <>
                Worst-case error on a 10 A AC load, from each maker spec: the 17B+ at ±(1.5% + 3 × 0.01 A), the T5-600 at
                ±(3% + 3 × 0.1 A). Lower is better.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Fluke 17B+, 10 A range", value: 0.18, display: "±0.18 A", highlight: true },
                { label: "Fluke T5-600, jaw", value: 0.6, display: "±0.60 A" },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case error reading 120 V DC: ±(0.5% + 3 × 0.1 V) on the 17B+&apos;s 400 V range, ±(1% + 1 V) on the T5-600.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 0.9, display: "±0.9 V", highlight: true },
                { label: "Fluke T5-600", value: 2.2, display: "±2.2 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Neither error matters for the T5-600&apos;s intended job. Knowing a motor draws 9.4 A rather than 10.0 A, or
          that a circuit carries 120 V rather than 118 V, is plenty to tell a healthy load from a dead or overloaded one.
          The 17B+&apos;s tighter figures pay off on electronics, where a reading of 4.85 V against 5.00 V on a logic
          supply is the difference between a working board and a fault.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resolution: what whole-volt steps hide</h2>
        <p className="text-muted leading-7 mb-4">
          The T5-600 shows voltage in 1 V steps. That is a deliberate choice for a tester meant to answer &quot;is it
          live, and is it about 120 V or 240 V?&quot; in a second. The 17B+ shows the same voltage to 0.01 V on its 40 V
          range and to 0.001 V on its 4 V range, which is what you need for batteries, sensors and logic rails.
        </p>
        <Figure caption={<>Display steps of each tool around 12 V. Battery voltages shown are examples, not measurements.</>}>
          <ResolutionRulerDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A resting 12 V lead-acid battery near 12.7 V is roughly full, and one near 12.2 V is roughly half discharged;
          those are typical rule-of-thumb values that vary with battery type and temperature. The 17B+ separates them
          easily. The T5-600 can&apos;t, which is why a pocket multimeter belongs beside it for any battery, automotive or
          electronics job. Our guide on{" "}
          <Link href="/multimeters/how-to-test-a-12v-battery-under-load" className={link}>
            testing a 12V battery under load
          </Link>{" "}
          goes further.
        </p>
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
            ["Checking a PWM fan or dimmer output", "17B+", "Frequency and duty cycle"],
            ["Tracing a dead circuit in old wiring", "T5-600", "Low input impedance sheds ghost voltage"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A note on the 17B+ listing">
            The Amazon listing for the 17B+ shows the newer 17B MAX in its main photo, so check which model it
            ships before ordering.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy which</h2>
        <p className="text-muted leading-7 mb-4">
          Buy the 17B+ if your work happens on a bench or inside appliances. Its µA and mA ranges cover standby draw and
          control loops, its thermocouple input covers ovens and HVAC air, and frequency to 100 kHz with duty cycle covers
          PWM circuits. It is also the only one of the pair that can log extremes with MIN MAX while you wait for an
          intermittent fault.
        </p>
        <p className="text-muted leading-7">
          Buy the T5-600 if your work happens at panels and motors. The open jaw takes a single conductor up to 1/0 THHN
          in its 12.9 mm opening, so you read a compressor or heater current without shutting anything down. The long,
          narrow body stores its probes in the back and is rated for a 3 m drop. Many electricians carry both kinds of
          tool; if you want one meter that does both jobs, compare the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-t5-600" className={link}>
            Fluke 117 and T5-600
          </Link>{" "}
          or read our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs T5-600: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electronics hobbyist or student", "Fluke 17B+", "Capacitance, frequency, µA ranges and 0.001 V resolution"],
            ["Appliance or HVAC service technician", "Fluke 17B+", "Temperature plus mA ranges for controls"],
            ["Residential electrician", "Fluke T5-600", "Fast live checks and 100A AC without opening circuits"],
            ["Maintenance tech on motors and heaters", "Fluke T5-600", "Load current above 10A through the jaw"],
            ["Car owner", "Fluke 17B+", "DC current and fine DC volts; the T5-600 can't read DC amps"],
            ["Buyer who drops tools from ladders", "Fluke T5-600", "Rated for a 3 m fall"],
          ]}
        />
      </section>

      <Callout title="Safety: current checks on live circuits">
        To read current, the 17B+ must be wired in series: switch off, open the circuit, connect the leads to the A or
        mA jack, then power up. Never leave the leads in a current jack and probe a voltage source, which puts a near short
        across it. The T5-600 avoids that by clamping one conductor, but Fluke warns it won&apos;t read a whole cord,
        because hot and neutral cancel. Both are CAT III 600V; for service-entrance work or a panel that is hot, buzzing or
        burnt, call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For electronics, choose the Fluke 17B+: capacitance, frequency, temperature and MIN MAX are things the T5-600 simply can't do. For electrical panels and motors, the T5-600 is the faster, tougher tool and reads far more current. Many electricians carry a tester like the T5 and a multimeter like the 17B+ side by side.",
  faqs: [
    {
      question: "Can the Fluke T5-600 replace a 17B+ multimeter?",
      answer:
        "Not for electronics. It has no capacitance, frequency, duty cycle or temperature function, resistance stops at 1,000 Ω, and voltage reads in whole-volt steps. It covers what an electrician checks most: AC and DC voltage, continuity and AC current to 100A. For circuit boards, batteries and sensors you still need a multimeter such as the 17B+.",
    },
    {
      question: "Which reads more current, the 17B+ or the T5-600?",
      answer:
        "The T5-600, up to 100A AC through its open jaw with 0.1 A resolution. The 17B+ reads up to 10A, but on both AC and DC and down to its 400.0 µA range at 0.1 µA resolution. So the T5-600 wins on big motor and heater loads, and the 17B+ wins on anything small or DC.",
    },
    {
      question: "Does the Fluke 17B+ measure temperature?",
      answer:
        "Yes, from -55 °C to 400 °C with the Type K thermocouple probe Fluke includes. Accuracy is ±2 °C from 0 to 50 °C and ±(2% + 1 °C) from 50 to 400 °C, which is fine for HVAC air, ovens and heatsinks. The T5-600 has no temperature function, so you would need a separate thermometer.",
    },
    {
      question: "Are the 17B+ and T5-600 the same safety rating?",
      answer:
        "Both are CAT III 600V, which covers distribution panels, feeders and branch circuits. Fluke's datasheet also gives the 17B+ a CAT II 1000V rating for lower-energy, plug-connected equipment, and it measures up to 1000V. Neither tool is rated CAT IV, so neither should be used at the service entrance or meter base.",
    },
    {
      question: "Is the Fluke T5-600 True RMS?",
      answer:
        "No. Fluke describes the T5-600's AC response as averaging, and it makes no True RMS claim for the 17B+ either. Both read clean 60 Hz sine waves correctly. On variable-speed drives, LED drivers and other distorted loads their AC readings can be off, so choose a True RMS meter such as the Fluke 117 for that work.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
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
