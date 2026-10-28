// Specs per Fluke, as already cited elsewhere in this repo (checked 2026-10-26):
// - Fluke 17B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus and the
//   15B+/17B+ datasheet: no True RMS claim; 4,000 counts, 3 updates/s, backlit; DC V 4/40/400/1000 V ±(0.5% + 3); AC V
//   ±(1.0% + 3); current 400.0 µA to 10.00 A in six ranges, all ±(1.5% + 3); resistance to 40.00 MΩ; capacitance to
//   1000 µF; frequency 10 Hz-100 kHz; duty cycle 1-99%; temperature -55 to 400 °C with Type K probe; 2 × AA, 500 h
//   minimum; 455 g; IP40; CAT III 600V / CAT II 1000V. Users manual: hazardous-voltage LED at 30 V or more; relative
//   mode not available on resistance or continuity; 1-year warranty.
// - Fluke 87V per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (spec tab):
//   True RMS; 6,000 counts (4/s), 19,999-count high-resolution mode; 32-segment bar graph at 40/s; CAT III 1000V /
//   CAT IV 600V; DC V ±(0.05% + 1); AC V ±(0.7% + 2); low-pass filter, 3 dB at 1 kHz; DC A 10 A (20 A for 30 s)
//   ±(0.2% + 2), 0.01 µA resolution; 50 MΩ; 9,999 µF; 200 kHz; duty cycle; -200 to 1090 °C excluding probe (80BK probe
//   in the box, -40 to 260 °C); Peak Capture 250 µs; 355 g (624 g in holster); about 400 h battery; lifetime warranty.
//   No LoZ or non-contact voltage listed.
// Worked accuracy figures below are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 87V for Professionals",
  description:
    "Fluke 17B+ vs Fluke 87V: which is better for professionals? CAT IV 600V, 0.05% DC accuracy and peak capture against a capable entry Fluke. Who needs which.",
  image: picks.find((p) => p.name === "Fluke 17B+")!.image,
  path: "/multimeters/fluke-17b-plus-vs-fluke-87v",
});

const link = "text-accent hover:underline";

/**
 * A 1 ms voltage spike inside one second. The 17B+'s digits refresh 3 times a second and land either side of it; the
 * 87V's Peak Capture records events as short as 250 µs. Timing of the spike is illustrative.
 */
function PeakCaptureDiagram() {
  const x0 = 20;
  const w = 300;
  const base = 96;
  const spikeX = x0 + w * 0.42;
  const updates = [1 / 6, 3 / 6, 5 / 6];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative timeline of one second on a control circuit. A steady voltage carries one brief spike lasting about a millisecond. The Fluke 17B+ updates its display three times in that second, before and after the spike, so it never shows it. The Fluke 87V's Peak Capture records events as short as 250 microseconds, so it holds the spike's peak value."
    >
      <text x="170" y="16" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">One second on a control circuit</text>
      <line x1={x0} x2={x0 + w} y1={base} y2={base} className="stroke-border" strokeWidth="0.8" />
      <path
        d={`M${x0} 80 H${spikeX - 1.5} L${spikeX} 30 L${spikeX + 1.5} 80 H${x0 + w}`}
        className="fill-none stroke-foreground"
        strokeWidth="1.8"
      />
      <text x={spikeX + 8} y="36" fontSize="8.5" className="fill-accent">~1 ms spike</text>
      {updates.map((u) => (
        <g key={u}>
          <line x1={x0 + w * u} x2={x0 + w * u} y1="24" y2="118" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={x0 + w * u} cy="80" r="3.5" className="fill-muted" />
        </g>
      ))}
      <text x={x0} y="134" fontSize="9" className="fill-muted">Dashed lines: 17B+ display updates (3 per second)</text>
      <rect x={x0} y="146" width={w} height="40" rx="6" className="fill-surface stroke-border" strokeWidth="1" />
      <text x={x0 + 10} y="162" fontSize="9" className="fill-foreground">17B+: every update shows the steady level</text>
      <text x={x0 + 10} y="178" fontSize="9" className="fill-accent">87V Peak Capture (250 µs): holds the spike&apos;s peak</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 87V: Which Is Better for Professionals?",
  path,
  published: "2026-10-27",
  intro:
    "For professionals, the Fluke 87V is the better meter in the Fluke 17B+ vs Fluke 87V matchup, and the margin is wide. It carries a CAT IV 600V / CAT III 1000V rating, True RMS, DC accuracy ten times tighter, peak capture and a lifetime warranty. The 17B+ still has a place in a professional's kit: as an apprentice's first Fluke, a bench or appliance meter, or a backup with temperature and microamp ranges.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ entry-level digital multimeter, front view",
    chooseIf: [
      "You're an apprentice or student who wants a real Fluke before specializing",
      "Your work stays on plug-in equipment, appliances or low-voltage controls, not service entrances",
      "You want a second meter with temperature and microamp ranges for the van",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You measure at the service entrance, meter base or outdoor feeders, where CAT IV applies",
      "You troubleshoot motor drives, PLC inputs or other circuits where peak capture and filtering help",
      "You calibrate or trend readings where 0.05% DC accuracy and a 19,999-count mode pay off",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "AC measurement", a: "Not described as True RMS by Fluke", b: "True RMS, low-pass filter (3 dB at 1 kHz)" },
    { label: "Display", a: "4,000 counts, 3 updates/s", b: "6,000 counts (19,999 high-res) + 32-segment bar graph" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(0.7% + 2)" },
    { label: "Max voltage", a: "1000V AC/DC", b: "1000V AC/DC" },
    { label: "Current", a: "400.0 µA to 10 A, ±(1.5% + 3)", b: "Down to 0.01 µA resolution, 10 A (20 A for 30 s)" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 50 MΩ" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 9,999 µF" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz / yes", b: "Up to 200 kHz / yes" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe supplied", b: "−200 °C to 1090 °C (80BK probe: −40 to 260 °C)" },
    { label: "Peak capture", a: "Not listed", b: "250 µs" },
    { label: "NCV / LoZ", a: "Not listed", b: "Not listed" },
    { label: "Weight", a: "455 g", b: "355 g (624 g in holster)" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "About 400 h" },
    { label: "Warranty", a: "1 year", b: "Lifetime" },
  ],
  differences: [
    "The 87V is rated CAT IV 600V and CAT III 1000V; the 17B+ stops at CAT III 600V, with CAT II 1000V for plug-in equipment.",
    "Basic DC accuracy is ±(0.05% + 1) on the 87V against ±(0.5% + 3) on the 17B+, a tenfold difference in the percentage term.",
    "Only the 87V is True RMS, and it adds a low-pass filter for reading variable-frequency drive outputs.",
    "The 87V's Peak Capture records events as short as 250 µs and its high-resolution mode shows 19,999 counts.",
    "Fluke backs the 87V for life; the 17B+ manual gives one year.",
    "Shared ground: both read to 1000V, measure temperature, duty cycle and microamps, and neither lists NCV or a LoZ mode.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What professionals actually need from a meter</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Professional&quot; covers a lot of trades, but most of them judge a meter on the same five things:
          where it is safe to use, whether its AC readings hold up on modern loads, how precise it is, whether it can
          catch a fault that comes and goes, and how long the maker stands behind it. Score the two Flukes against
          that list and the gap is clear.
        </p>
        <DataTable
          head={["Professional requirement", "Fluke 17B+", "Fluke 87V"]}
          rows={[
            ["Rated for the service entrance (CAT IV)", "No", "CAT IV 600V"],
            ["Rated for 1000V distribution (CAT III 1000V)", "No (CAT III 600V)", "Yes"],
            ["True RMS on distorted AC", "Not claimed", "Yes, with drive filter"],
            ["Basic DC accuracy", "±(0.5% + 3)", "±(0.05% + 1)"],
            ["Catching brief transients", "Not listed", "Peak Capture, 250 µs"],
            ["High-resolution mode", "No (4,000 counts)", "19,999 counts"],
            ["Warranty", "1 year", "Lifetime"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Safety rating decides first">
            If your work includes the meter base, service drop or outdoor feeders, the 17B+ is out before accuracy
            enters the conversation: it isn&apos;t rated CAT IV. Our{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
              Fluke 117 vs Fluke 87V
            </Link>{" "}
            comparison maps where each category sits in a building.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The accuracy gap in volts and amps</h2>
        <p className="text-muted leading-7 mb-4">
          A tenfold difference in the percentage term sounds abstract until you apply it. The table uses each
          meter&apos;s published basic accuracy and the resolution of the range the reading falls on. The 17B+&apos;s
          4,000-count ranges are 4, 40, 400 and 1000 V; the 87V&apos;s 6,000-count ranges keep more readings on a finer
          scale. This is worst-case spec arithmetic, not bench data.
        </p>
        <DataTable
          head={["Reading", "17B+ worst case", "87V worst case"]}
          rows={[
            ["1.500 V reference cell", "±(0.0075 + 0.003) = ±0.011 V", "±(0.00075 + 0.001) = ±0.002 V"],
            ["48.0 V battery bank", "±(0.24 + 0.3) = ±0.54 V (400 V range)", "±(0.024 + 0.01) = ±0.034 V"],
            ["277 V AC lighting circuit", "±(2.77 + 0.3) = ±3.1 V", "±(1.94 + 0.2) = ±2.1 V"],
            ["5.00 A DC load", "±(0.075 + 0.03) = ±0.105 A", "±(0.010 + 0.02) = ±0.030 A"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Basic DC volts accuracy, % of reading, on a log scale. Lower is better.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 17B+", value: 0.5, display: "±0.5%" },
                { label: "Fluke 87V", value: 0.05, display: "±0.05%", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case allowance on a 48 V battery bank, in millivolts.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 540, display: "±540 mV" },
                { label: "Fluke 87V", value: 34, display: "±34 mV", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 48 V case shows the range penalty at its worst. The reading is just over the 17B+&apos;s 40 V range, so
          it jumps to 400 V and loses a decimal place; the 87V keeps it on its 60 V range. For telecom, solar storage
          and forklift batteries, where cell balance is judged in tens of millivolts, that is the difference between
          a useful reading and a rough one. On a 277 V lighting circuit the gap shrinks to about a volt, and the
          17B+&apos;s figure assumes a clean sine, since Fluke doesn&apos;t call it True RMS.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Catching faults that don&apos;t wait for the display</h2>
        <p className="text-muted leading-7 mb-4">
          Many service calls aren&apos;t about a steady wrong value. A controller resets, a contactor chatters or a
          drive trips, and the cause lasts a few milliseconds. A display that refreshes three times a second, as the
          17B+&apos;s does, almost always samples before or after such an event. The 87V&apos;s Peak Capture records
          events as short as 250 µs, and its 32-segment bar graph updates 40 times a second.
        </p>
        <Figure caption={<>Illustrative timing: a 1 ms spike falls between the 17B+&apos;s display updates but within the 87V&apos;s Peak Capture.</>}>
          <PeakCaptureDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 17B+ does have MIN MAX recording, which holds the extremes it sees over time, but Fluke doesn&apos;t
          publish a capture speed for it, so don&apos;t rely on it for millisecond events. For chasing these faults
          step by step, see{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            how to find an intermittent electrical fault with a multimeter
          </Link>
          . The 87V&apos;s low-pass filter is the other industrial tool: it strips a drive&apos;s switching carrier so
          the meter reads the voltage the motor responds to, as explained in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 17B+ holds its own</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ isn&apos;t a toy. It shares the 87V&apos;s 1000V display range, reads duty cycle and frequency to
          100 kHz, and has separate microamp and milliamp ranges behind a 440 mA fuse. Its temperature input reads
          −55 °C to 400 °C with the Type K bead probe in the box, and its hazardous-voltage LED lights at 30 V or
          more. It also runs on two AA cells for at least 500 hours, which are easy to find on a job site.
        </p>
        <p className="text-muted leading-7 mb-4">
          On temperature the 87V reads a far wider span, −200 °C to 1090 °C, but that figure excludes the probe; the
          80BK probe Fluke supplies is rated −40 °C to 260 °C. Furnace stacks or cryogenic lines need a different
          probe on either meter. For HVAC supply and return air, both cover the job.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum frequency each meter reads.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 100, display: "100 kHz" },
                { label: "Fluke 87V", value: 200, display: "200 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest display count: the 87V&apos;s high-resolution mode against the 17B+&apos;s fixed display.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 4000, display: "4,000" },
                { label: "Fluke 87V", value: 19999, display: "19,999", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Who you are", "Better fit", "Reason"]}
          rows={[
            ["Industrial electrician or maintenance tech", "Fluke 87V", "CAT IV 600V, True RMS and drive filter"],
            ["Controls and instrumentation tech", "Fluke 87V", "0.05% DC accuracy and 19,999-count mode"],
            ["Service-entrance and utility-side work", "Fluke 87V", "Only one of the two rated CAT IV"],
            ["Electrical apprentice or student", "Fluke 17B+", "Broad functions to learn on, plug-in and branch work"],
            ["Appliance or bench repair technician", "Fluke 17B+", "Temperature, µA ranges and duty cycle cover the job"],
            ["Professional wanting a backup meter", "Fluke 17B+", "Covers routine checks if the main meter is out"],
            ["Home user or hobbyist", "Fluke 17B+", "The 87V is more meter than casual work needs"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 17B+ as your only meter if you work on distribution equipment, drives or anything where an
          AC reading has to be right on a distorted waveform. Skip the 87V if your work never leaves plug-in
          equipment and low-voltage circuits: you&apos;d be paying for CAT IV protection and precision you won&apos;t
          use. Our owner has bought and used the 87V (Hands-on Tested); the 17B+ assessment is desk research against
          Fluke&apos;s published specifications. The 17B+ Amazon listing photo shows the newer 17B MAX, so confirm the
          model before ordering. For the full 87V picture, read our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>
          ; for meters ranked by trade, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>
          .
        </p>
      </section>

      <Callout title="Match the meter to the circuit, not the job title">
        A CAT rating covers both the voltage and the energy available at a point in the system. Using a CAT III 600V
        meter such as the 17B+ on a service entrance exposes you to fault energy it isn&apos;t rated for, whatever its
        display range. Wear the PPE your site requires, verify the meter on a known live source before and after
        testing, and follow lockout procedures before working on drives, whose DC bus can stay charged after power is
        removed.
      </Callout>
    </>
  ),
  bottomLine:
    "For professional electrical and industrial work, the Fluke 87V is the better choice: CAT IV 600V, True RMS with a drive filter, ±(0.05% + 1) DC accuracy, 250 µs peak capture and a lifetime warranty. The Fluke 17B+ suits apprentices, appliance and bench technicians, and professionals who want a capable backup with temperature and microamp ranges.",
  faqs: [
    {
      question: "Is the Fluke 17B+ good enough for a professional electrician?",
      answer:
        "For some tasks, not as a main meter. It is rated CAT III 600V, so it covers branch circuits and panels up to 600V but not the service entrance, and Fluke doesn't call it True RMS. Many electricians would rather carry a True RMS meter such as the 87V or 117 daily and keep the 17B+ for appliance or control work.",
    },
    {
      question: "How much more accurate is the Fluke 87V than the 17B+?",
      answer:
        "On DC volts, Fluke lists ±(0.05% + 1) for the 87V and ±(0.5% + 3) for the 17B+, so the percentage term is ten times tighter. On a 48 V battery bank that works out to about ±0.034 V against ±0.54 V worst case. On AC volts the gap is smaller: ±(0.7% + 2) against ±(1.0% + 3).",
    },
    {
      question: "Does the Fluke 87V measure temperature like the 17B+?",
      answer:
        "Yes, and over a wider span. Fluke lists −200 °C to 1090 °C for the 87V, excluding the probe, while the supplied 80BK probe is rated −40 °C to 260 °C. The 17B+ reads −55 °C to 400 °C and comes with a Type K bead probe. For HVAC air and pipe temperatures, either meter does the job.",
    },
    {
      question: "Do the Fluke 17B+ and 87V have non-contact voltage detection?",
      answer:
        "Neither lists it. Fluke publishes no non-contact voltage or low-impedance (LoZ) mode for the 87V or the 17B+. If you want those electrician conveniences, the Fluke 117 has both, though it is rated CAT III 600V rather than the 87V's CAT IV 600V. Many professionals carry a separate voltage pen alongside an 87V.",
    },
    {
      question: "Which Fluke has the better warranty, the 17B+ or the 87V?",
      answer:
        "The 87V by a wide margin. Fluke lists a lifetime warranty for it, while the 15B+/17B+/18B+ users manual gives the 17B+ one year from shipment. Read Fluke's warranty terms for what lifetime covers and keep your proof of purchase. For a meter used daily for years, that coverage is part of what separates the two.",
    },
    {
      question: "Can the Fluke 17B+ read variable-frequency drive outputs?",
      answer:
        "Not reliably. Drive outputs are trains of fast pulses, and Fluke makes no True RMS claim for the 17B+ and lists no low-pass filter. The 87V is True RMS and has a selectable low-pass filter, 3 dB down at 1 kHz, that removes the switching carrier so the reading reflects what the motor sees. Always follow lockout procedures around drives.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke17BPlusVsFluke87VPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
