// Specs per Fluke, checked 2026-10-28:
// - Fluke 789 ProcessMeter product page and spec table:
//   https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-789
//   DC mA measure 0-30 mA, 0.001 mA, 0.05% + 2 LSD; mA source 0-20 or 4-20 mA, 0.001 mA, 0.05% of span; drive
//   capability "24 V compliance or 1200 Ω @ 20 mA"; current 0-1 A AC/DC, 1 mA resolution, DC 0.2% + 2, AC 1% + 2
//   (25 Hz to 2 kHz); voltage 0-1000 V AC (true-rms) or DC, DC 0.1% + 1; resistance to 40 MΩ, 0.2% + 1; frequency to
//   20 kHz; built-in 24 V loop supply; selectable 250 Ω HART resistor; % of span shown with mA; SpanCheck 0%/100%
//   buttons; manual step, 100%, 25%, coarse, fine, auto step and auto ramp; Min/Max, average, hold, relative; dual
//   display, two backlight levels; 4 AA, 140 h measuring, 10 h sourcing 20 mA; -20 to 55 °C; 1 m drop;
//   50 x 100 x 203 mm; 610 g; CAT IV 600 V / CAT III 1000 V; 3-year warranty; TL71 leads, AC175 clips; Fluke Connect
//   logging only with the optional IR3000FC. Capacitance, temperature, peak capture, low-pass filter and IP rating are
//   not listed.
// - Fluke 789 ProcessMeter Users Manual (Rev. 3, 3/13): https://assets.fluke.com/manuals/789_____umeng0300.pdf
//   Source mode supplies current into a passive loop; simulate mode regulates current with an external 15 to 48 V
//   supply (24 V nominal), compliance 21 V at 24 V, burden < 3 V; loop power mode supplies a nominal 24 V and measures
//   the current a transmitter draws; internal 250 Ω series resistor for HART switched with the blue button; output span
//   4-20 mA (default) or 0-20 mA, overrange to 24 mA; source compliance 28 V with battery > ~4.5 V (conflicts with the
//   web page's 24 V; stated on page); accuracy 0.05% of span; mA input 440 mA continuous, 1 A for 30 s, 440 mA
//   1000 V fuse; DC V ranges 4.000 / 40.00 / 400.0 / 1000 V at 0.1% + 1; 400.0 mV DC 0.1% + 2; AC V True RMS
//   0.7% + 2 at 50-60 Hz (400 mV 0.7% + 4), 1.2% + 4 at 45-200 Hz, 7.0% + 4 at 200-500 Hz; frequency counter to
//   19.999 kHz, 0.005% + 1; ohms 400.0 Ω to 40.00 MΩ; MIN MAX beeps on a new min or max, average stops updating after
//   40 h; AutoHold; battery life table: 140 h measuring or simulating, 10 h sourcing 12 mA into 500 Ω; 3-year warranty.
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   DC V ±(0.05% + 1); AC V ±(0.7% + 2), 20 kHz, low-pass filter; DC A ±(0.2% + 2) basic, max 10 A (20 A for 30 s),
//   0.01 µA DC resolution; resistance ±(0.2% + 1) to 50 MΩ; capacitance to 9,999 µF ±(1% + 2); frequency to 200 kHz
//   ±(0.005% + 1); temperature -200 to 1090 °C with 80BK probe; 6000 counts, 19,999 hi-res, 32-segment bar graph;
//   250 µs peak capture; Input Alert; 9 V, ~400 h; 355 g (624 g holstered); CAT IV 600 V / CAT III 1000 V; lifetime.
// - Fluke 83V and 87V Detailed Specifications (Fluke Corporation, hosted by Farnell):
//   https://www.farnell.com/datasheets/2830418.pdf  87V DC current 60.00 mA range, 0.01 mA resolution, ±(0.2% + 4);
//   400.0 mA range ±(0.2% + 2); burden 1.8 mV/mA.
// Picks: Fluke 789 (4.7, not tested by us) in src/lib/multimeter-catalog.ts; Fluke 87V (4.8, hands-on tested) in
// best-multimeters. 4-20 mA arithmetic on the page is ours, from these specs.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-789-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 789 vs 87V: ProcessMeter or Multimeter?",
  description:
    "Fluke 789 vs 87V comparison: the 789 sources, simulates and powers 4-20 mA loops with a 250 Ω HART resistor; the 87V measures more, to 10 A and 20 kHz.",
  path: "/multimeters/fluke-789-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** One mini loop sketch per mode: who supplies the power, who sets the current, where the meter sits. */
function LoopModesDiagram() {
  const panels = [
    { x: 6, title: "789: Source", sub: "Meter powers and sets mA", dev: "Passive input (PLC AI, I/P)", supply: false, meterSets: true },
    { x: 186, title: "789: Simulate", sub: "Meter sets mA, loop powers it", dev: "Live loop, transmitter removed", supply: true, meterSets: true },
    { x: 6, y: 120, title: "789: Loop power", sub: "Meter powers, transmitter sets mA", dev: "Transmitter on the bench", supply: false, meterSets: false },
    { x: 186, y: 120, title: "87V: Measure", sub: "Loop powers, transmitter sets mA", dev: "Transmitter in the field", supply: true, meterSets: false },
  ];
  return (
    <svg
      viewBox="0 0 360 240"
      className="w-full h-auto"
      role="img"
      aria-label="Four 4 to 20 milliamp loop setups: in source mode the Fluke 789 powers a passive input and sets the current; in simulate mode it replaces the transmitter in a loop powered by the control system; in loop power mode it supplies 24 volts to a transmitter and reads the current the transmitter sets; the Fluke 87V can only sit in series and measure a loop that something else powers"
    >
      {panels.map((p) => {
        const y = p.y ?? 0;
        const accent = p.title.startsWith("789");
        return (
          <g key={p.title} transform={`translate(${p.x} ${y})`}>
            <rect x="0" y="4" width="168" height="110" rx="8" className={accent ? "fill-accent/10 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
            <text x="84" y="20" fontSize="10.5" fontWeight="700" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
              {p.title}
            </text>
            <text x="84" y="33" fontSize="8.5" textAnchor="middle" className="fill-muted">{p.sub}</text>
            {/* loop rectangle */}
            <rect x="22" y="44" width="124" height="46" rx="4" className="fill-none stroke-foreground" strokeWidth="1.3" />
            {/* meter */}
            <rect x="8" y="54" width="30" height="26" rx="4" className={accent ? "fill-accent" : "fill-[#f0b429]"} />
            <text x="23" y="71" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">{accent ? "789" : "87V"}</text>
            {/* device */}
            <rect x="122" y="54" width="36" height="26" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.2" />
            <text x="140" y="71" fontSize="8" textAnchor="middle" className="fill-foreground">{p.meterSets ? "IN" : "TX"}</text>
            {/* supply */}
            {p.supply ? (
              <g>
                <circle cx="84" cy="44" r="9" className="fill-surface stroke-foreground" strokeWidth="1.2" />
                <text x="84" y="47" fontSize="7.5" textAnchor="middle" className="fill-foreground">24V</text>
              </g>
            ) : null}
            <text x="84" y="104" fontSize="8" textAnchor="middle" className="fill-muted">{p.dev}</text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 789 vs Fluke 87V: ProcessMeter or Industrial Multimeter?",
  path,
  published: "2026-10-28",
  intro:
    "Buy the Fluke 789 if you work on 4–20 mA instrument loops: it measures milliamps to 0.001 mA at ±(0.05% + 2), and it can also source, simulate and power a loop, with a 24 V supply and a switchable 250 Ω HART resistor built in. Buy the Fluke 87V if your work is electrical rather than instrumentation: it handles up to 10 A (the 789 stops at 1 A), reads AC volts out to 20 kHz with a low-pass filter for drives, and adds temperature, capacitance and 250 µs peak capture. Both are CAT IV 600V / CAT III 1000V, 1000 V meters.",
  a: {
    pick: all.find((p) => p.name === "Fluke 789")!,
    imageAlt: "Fluke 789 ProcessMeter with mA output jacks and loop power selector, front view",
    chooseIf: [
      "You commission, calibrate or troubleshoot 4–20 mA transmitters, valves, positioners and PLC analog inputs",
      "You want to drive a loop at 4, 12 or 20 mA, step it in 25% jumps or ramp it, without a separate calibrator",
      "You'd rather leave the bench power supply and the loose 250 Ω resistor in the truck",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "Your day is motors, drives, heaters and control panels, where currents run past 1 A",
      "You need AC readings above a few hundred hertz, a low-pass filter on drive outputs, or a thermocouple input",
      "You want the meter we've tested hands-on, with a lifetime warranty and about 400 hours per battery",
    ],
  },
  extraSpecs: [
    { label: "mA measure", a: "0–30 mA, 0.001 mA, ±(0.05% + 2)", b: "60.00 mA range, 0.01 mA, ±(0.2% + 4)" },
    { label: "mA source / simulate", a: "0–20 or 4–20 mA (to 24 mA), 0.05% of span", b: "No" },
    { label: "Loop power", a: "24 V built in", b: "No" },
    { label: "HART resistor", a: "250 Ω, switchable", b: "No" },
    { label: "Maximum current", a: "1 A (440 mA continuous)", b: "10 A (20 A for 30 s)" },
    { label: "DC volts", a: "±(0.1% + 1), to 1000 V", b: "±(0.05% + 1), to 1000 V" },
    { label: "AC volts, True RMS", a: "±(0.7% + 2) at 50–60 Hz; 7.0% + 4 at 200–500 Hz", b: "±(0.7% + 2), 20 kHz bandwidth" },
    { label: "Low-pass filter / Peak", a: "Not listed / not listed", b: "Yes / 250 µs" },
    { label: "Temperature / capacitance", a: "Not listed", b: "−200 to 1090 °C / to 9,999 µF" },
    { label: "Battery", a: "4 × AA: 140 h measuring, about 10 h sourcing", b: "9 V, about 400 h" },
    { label: "Weight", a: "610 g", b: "355 g (624 g holstered)" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Loop output: the 789 sources 0–20 or 4–20 mA (overrange to 24 mA) at 0.05% of span, simulates a transmitter in a live loop, and powers a transmitter from a built-in 24 V supply. The 87V only measures.",
    "HART: the 789 can switch a 250 Ω series resistor into its loop-power circuit so a HART communicator can talk to the transmitter. The 87V has no equivalent.",
    "Milliamp precision: on a 12 mA reading the 789's spec allows about ±0.008 mA; the 87V's 60 mA range allows about ±0.064 mA, eight times wider.",
    "Current ceiling: the 789 tops out at 1 A (440 mA continuous). The 87V goes to 10 A, 20 A for 30 seconds.",
    "AC bandwidth: the 789's AC volts spec loosens to 7.0% + 4 between 200 and 500 Hz; the 87V is specified to 20 kHz and has a low-pass filter for drive outputs.",
    "Extras on the 87V only: temperature, capacitance, 250 µs peak capture, a 19,999-count mode and a lifetime warranty (the 789's is 3 years).",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A calibrator with a meter attached, or a meter with nothing attached</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke files the 789 under its mA loop calibrators and the 87V under digital multimeters, and that is the best
          one-line summary of the choice. The 789 is a 1000 V CAT IV multimeter wrapped around a loop calibrator. The
          87V is a deeper multimeter that cannot put a single milliamp into a circuit.
        </p>
        <InfoCards
          items={[
            { label: "789: output", desc: "Source, simulate, step and ramp 0–20 or 4–20 mA." },
            { label: "789: loop power", desc: "24 V supply plus a 250 Ω HART resistor." },
            { label: "789: mA precision", desc: "0.001 mA at ±(0.05% + 2) to 30 mA." },
            { label: "87V: 10 A", desc: "Ten times the 789's 1 A current ceiling." },
            { label: "87V: drives", desc: "20 kHz AC bandwidth and a low-pass filter." },
            { label: "87V: extras", desc: "Temperature, capacitance, 250 µs peak." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We have tested the 87V ourselves, and it holds our 4.8 rating. The 789 is rated 4.7 from Fluke&apos;s product
          page and users manual; we haven&apos;t used one. Every figure below comes from those Fluke documents, and the
          loop arithmetic is ours.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 789 vs 87V spec by spec</h2>
        <DataTable
          head={["Function", "Fluke 789", "Fluke 87V", "Edge"]}
          rows={[
            ["DC mA", "30.000 mA, 0.001 mA, ±(0.05% + 2)", "60.00 mA, 0.01 mA, ±(0.2% + 4)", "789"],
            ["mA output", "Source and simulate, 0.05% of span", "None", "789"],
            ["Output drive", "Web: 24 V or 1200 Ω at 20 mA; manual: 28 V source compliance", "None", "789"],
            ["Loop supply", "24 V, short-circuit protected", "None", "789"],
            ["% of span display", "Yes, beside the mA reading", "No", "789"],
            ["Highest current", "1 A (440 mA continuous)", "10 A (20 A for 30 s)", "87V"],
            ["DC volts", "±(0.1% + 1), 4.000 V to 1000 V", "±(0.05% + 1), to 1000 V", "87V"],
            ["AC volts", "±(0.7% + 2) at 50–60 Hz; 1.2% + 4 to 200 Hz; 7.0% + 4 to 500 Hz", "±(0.7% + 2), to 20 kHz", "87V"],
            ["Resistance", "To 40 MΩ, ±(0.2% + 1)", "To 50 MΩ, ±(0.2% + 1)", "87V"],
            ["Frequency", "To 19.999 kHz, ±(0.005% + 1)", "To 200 kHz, ±(0.005% + 1)", "87V"],
            ["Capacitance / temperature", "Not listed", "To 9,999 µF / −200 to 1090 °C", "87V"],
            ["Peak capture / low-pass filter", "Not listed", "250 µs / yes", "87V"],
            ["Min/Max/Avg, AutoHold, Rel", "Yes", "Yes", "Same"],
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["Battery", "4 × AA; 140 h measuring", "9 V; about 400 h", "87V"],
            ["Drop rating", "1 m", "1 m (spec tab) / 3 m (comparison table)", "Same or 87V"],
            ["Warranty", "3 years", "Lifetime", "87V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Allowed error on a 12.000 mA loop reading, from each meter&apos;s DC mA spec. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 789: 0.05% + 2 × 0.001 mA", value: 0.008, display: "±0.008 mA", highlight: true },
                { label: "Fluke 87V: 0.2% + 4 × 0.01 mA", value: 0.064, display: "±0.064 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each meter accepts continuously. Log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 789", value: 0.44, display: "440 mA" },
                { label: "Fluke 87V", value: 10, display: "10 A", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Typical alkaline battery life from Fluke&apos;s documents. Higher is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V, measuring", value: 400, display: "~400 h", highlight: true },
                { label: "Fluke 789, measuring or simulating", value: 140, display: "140 h" },
                { label: "Fluke 789, sourcing", value: 10, display: "~10 h" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The working for the first chart: 0.05% of 12.000 mA is 0.006 mA, and two counts of 0.001 mA add 0.002 mA, so
          the 789 allows ±0.008 mA. On the 87V, 0.2% of 12.00 mA is 0.024 mA and four counts of 0.01 mA add 0.04 mA, for
          ±0.064 mA. Across a 16 mA span that is 0.05% of span against 0.4%. When a transmitter&apos;s own tolerance is
          a few tenths of a percent, only the 789 is precise enough to judge it.
        </p>
        <p className="text-muted leading-7 mt-4">
          One conflict to flag: Fluke&apos;s 789 web page lists the source drive as 24 V compliance, or 1200 Ω at 20 mA,
          while the users manual specifies 28 V compliance with healthy batteries. Plan on the lower figure. Its battery
          table also quotes about 10 hours sourcing 12 mA into 500 Ω, where the web page says 10 hours sourcing 20 mA.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Source, simulate, loop power: what each 789 mode is for</h2>
        <p className="text-muted leading-7 mb-4">
          The 789 picks its mode partly from which jacks you use, so the wiring tells you what the meter is doing.
          Here&apos;s how its three output modes compare with the 87V&apos;s only option, measuring in series.
        </p>
        <Figure caption={<>Where the 24 V comes from and who sets the current in each setup. TX = transmitter, IN = passive input.</>}>
          <LoopModesDiagram />
        </Figure>
        <DataTable
          head={["Mode", "Who powers the loop", "Who sets the mA", "Typical job"]}
          rows={[
            ["789 source", "The 789", "The 789", "Feed a known 4, 12, 20 mA into a PLC analog input or an I/P converter and check the reading or valve stroke"],
            ["789 simulate", "The control system's supply (15 to 48 V)", "The 789", "Replace a removed transmitter so you can test the wiring, the input card and the alarms"],
            ["789 loop power", "The 789 (24 V)", "The transmitter", "Bench-check or configure a transmitter with no panel supply, HART resistor in if needed"],
            ["87V measure", "The control system", "The transmitter", "Read the loop current in series to see if the transmitter output looks right"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Fluke&apos;s manual points out that simulate draws less from the meter&apos;s batteries than source, because
          the loop supply does the work, and its battery table backs that up: about 140 hours simulating against about
          10 hours sourcing. On a long commissioning day, simulate wherever a loop supply is available.
        </p>
        <p className="text-muted leading-7 mt-4">
          The SpanCheck buttons jump straight to 0% and 100% (4 and 20 mA by default), %STEP moves in 25% jumps, and
          coarse and fine adjust in between. Auto step and auto ramp let you watch a valve or a trend display while the
          789 drives the signal for you. The display shows % of span next to the mA value, which saves converting
          12 mA to 50% in your head.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the HART resistor matters</h2>
        <p className="text-muted leading-7 mb-4">
          A HART communicator talks to a smart transmitter by riding a small signal on top of the 4–20 mA current, and
          it needs some series resistance in the loop to develop that signal. A panel loop usually has it in the input
          card. A transmitter on the bench, powered by a plain supply, does not, which is why technicians carry a loose
          250 Ω resistor. Fluke&apos;s manual says the 789 switches an internal 250 Ω series resistor into its loop
          power circuit with one button, and the display shows when it&apos;s in.
        </p>
        <p className="text-muted leading-7">
          The 87V has nothing like this, so with an 87V you need a separate supply and resistor before a HART
          communicator can talk to a bench transmitter. For more on milliamp loop work, including clamp-on alternatives,
          see our guide to the{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            best multimeters for 4–20 mA loop testing
          </Link>{" "}
          and the walkthrough on{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 87V pulls ahead</h2>
        <p className="text-muted leading-7 mb-4">
          Turn away from the instrument loops and the 789&apos;s limits show. Its current input is fused at 440 mA
          and allowed 1 A for only 30 seconds, so motor, heater and contactor coil currents above that need a clamp or a
          different meter. Its AC volts spec is written around 50 to 60 Hz and grows to 7.0% + 4 between 200 and 500 Hz,
          and Fluke lists no low-pass filter, so a drive&apos;s output is not a job for it.
        </p>
        <p className="text-muted leading-7">
          The 87V covers all of that: 10 A, AC volts specified to 20 kHz, a low-pass filter for drive outputs, a
          thermocouple input, capacitance and 250 µs peak capture. It is also the lighter meter (355 g bare) and runs
          about 400 hours on a 9 V cell. Our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          covers those functions in depth, and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs 87V
          </Link>{" "}
          explains the drive filter.
        </p>
        <KeyIdea title="Instrument tech or electrician?">
          If the job is proving that a 4–20 mA signal is right, the 789 does it alone: it powers, drives and reads the
          loop eight times more precisely than the 87V can. If the job is power, motors and drives, the 87V does more
          and the 789&apos;s loop tools sit unused. Many plants give instrument techs a 789 and electricians an 87V for
          exactly that reason.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 789 or 87V: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Instrumentation and controls technician", "Fluke 789", "Source, simulate, loop power and HART resistor in one meter"],
            ["PLC or DCS commissioning engineer", "Fluke 789", "Drive known mA into each analog input and check the scaling"],
            ["Valve and positioner technician", "Fluke 789", "Step and ramp a 4–20 mA command while watching the stroke"],
            ["Plant electrician (motors, drives, MCCs)", "Fluke 87V", "10 A, low-pass filter, temperature, 20 kHz AC"],
            ["HVAC controls technician", "Depends", "789 for analog sensor loops; 87V for compressors and temperature"],
            ["Occasional loop checks, mostly electrical", "Fluke 87V", "Its 0.01 mA reading is enough to see if a loop is alive"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Note the stock situation too: when we last checked, the 789 was sold on Amazon by a third-party seller with
          limited stock, and its warranty is three years against the 87V&apos;s lifetime. If you want a sealed version
          of the 87V for outdoor loops, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs 87V MAX
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: set the 789's dial before you touch a live loop">
        Fluke&apos;s 789 manual warns to select an mA output position before connecting to a current loop. Other dial
        positions can present a low impedance that lets up to 35 mA flow, which can trip interlocks or move a valve.
        Tell the control room before you break or drive a loop, since alarms and final elements may respond. Both meters
        are CAT IV 600V / CAT III 1000V, but loop wiring often shares a cabinet with mains; use rated leads, keep the
        red lead out of the current jack when measuring volts, and follow your site&apos;s lockout/tagout rules.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 789 is the right meter for 4–20 mA work: it measures milliamps to ±(0.05% + 2) at 0.001 mA, sources and simulates loop current at 0.05% of span, and powers transmitters from a 24 V supply with a switchable 250 Ω HART resistor. The Fluke 87V, our hands-on tested pick, is the right meter for electrical work, with 10 A current, 20 kHz AC bandwidth, a low-pass filter, temperature, capacitance and a lifetime warranty. Pick by the job, not by the badge.",
  faqs: [
    {
      question: "Can the Fluke 87V test a 4-20 mA loop?",
      answer:
        "It can measure one. Put it in series on the 60 mA range and it reads to 0.01 mA with ±(0.2% + 4) accuracy, enough to tell whether a transmitter is alive and roughly right. It can't source, simulate or power a loop, and it has no HART resistor, so you can't use it to drive an input or bench-test a transmitter on its own.",
    },
    {
      question: "What is the difference between source and simulate on the Fluke 789?",
      answer:
        "In source mode the 789 supplies both the power and the current, for passive devices such as a PLC input with no loop supply. In simulate mode it stands in for a transmitter in a loop that already has a 15 to 48 V supply, regulating the current while the loop provides the power. Simulate drains the 789's batteries far less.",
    },
    {
      question: "Does the Fluke 789 have a HART communicator built in?",
      answer:
        "No. It has a built-in, switchable 250 Ω series resistor that lets a separate HART communicator talk to a transmitter the 789 is powering. It doesn't read or configure HART devices itself. Fluke's page describes the resistor as removing the need to carry a separate one.",
    },
    {
      question: "Can the Fluke 789 measure 10 amps?",
      answer:
        "No. Its current input is rated 440 mA continuous and 1 A for up to 30 seconds, protected by a 440 mA, 1000 V fuse. For motor or heater currents, use a meter with a 10 A input such as the 87V, or a clamp meter, and keep the 789 for milliamp loops.",
    },
    {
      question: "Is the Fluke 789 True RMS?",
      answer:
        "Its AC volts and AC current are true-rms, per Fluke's manual, at ±(0.7% + 2) on 50 to 60 Hz voltage ranges. The specification loosens quickly with frequency: 1.2% + 4 up to 200 Hz and 7.0% + 4 from 200 to 500 Hz. The 87V is specified to 20 kHz, so it's the better choice for distorted or high-frequency waveforms.",
    },
    {
      question: "Which has the longer warranty, the Fluke 789 or 87V?",
      answer:
        "The 87V. Fluke lists a lifetime warranty for it, while the 789 manual gives three years from purchase. The 789 warranty excludes fuses, disposable batteries and damage from misuse. Fluke also recommends calibrating the 789 once a year, which matters if your loop checks go into a quality record.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 28 II vs Fluke 87V", href: "/multimeters/fluke-28-ii-vs-fluke-87v" },
  ],
};

export default function Fluke789VsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
