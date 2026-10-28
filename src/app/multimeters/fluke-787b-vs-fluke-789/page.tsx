// Specs per Fluke, checked 2026-10-28:
// - Fluke 787B and 789 ProcessMeter technical data sheet (260784):
//   https://media.fluke.com/2e561b8d-bd2c-4efe-92ca-b1060068ee0e_original%20file.pdf
//   "Whether you only need to source and simulate mA, or need a 24 V loop power supply, Fluke has a ProcessMeter";
//   both based on the Fluke 87 DMM's measurement capability; "24 V loop power supply (789 only)"; "789 additional
//   features: 24 V Loop power supply; HART mode setting with loop power (adds 250 ohm resistor)". One shared spec
//   table: DC V 400.0 mV to 1000 V, 0.1% + 1; AC V True RMS, 0.7% + 2; mA DC 30.000 mA, 0.05% + 2; A DC/AC 1.000 A
//   (0.440 A continuous), 0.2% + 2 / 1% + 2; resistance 400.0 Ω to 40 MΩ, 0.2% + 1; frequency 0.5 Hz to 20 kHz,
//   0.005% + 1; diode 2.000 V, 2% + 1; continuity beeps below about 100 Ω. DC current output (internal battery)
//   0.000-20.000 or 4.000-20.000 mA, over-range to 24.000 mA, 24 V compliance or 1,200 Ω at 20 mA, 0.05% of span;
//   simulate (external 15 V to 48 V loop supply) same ranges, 1000 Ω at 20 mA, 0.05% of span; 24 V loop supply
//   (789 only) listed as minimum 24 V with 250 Ω at 20 mA. Manual Coarse, Fine, 25% and 100% steps; automatic Slow
//   Ramp, Fast Ramp, 25% step; simultaneous mA and % of scale; Min/Max/Average/Hold/Relative. General: -20 to 55 °C
//   operating; 1 m drop; CAT IV 600 V / CAT III 1000 V; 50 x 100 x 203 mm; 600 g; 4 x AA; 140 h typical
//   measurement, 10 h typical sourcing 12 mA; three-year warranty; TL71 leads, AC175 clips included.
// - Fluke 787B product page: https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-787b
//   Same spec table; "Easy-to-read backlit display"; key-feature bullet "Measure/Source/Simulate loop currents while
//   powering the loop" (conflicts with the data sheet's "789 only" loop supply; stated on page); HART not mentioned;
//   Fluke Connect not mentioned; 600 g; three-year warranty.
// - Fluke 789 product page: https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-789
//   "built-in 24-Volt loop supply"; "built-in, selectable 250-ohm HART resistor"; SpanCheck 0% and 100% buttons;
//   large dual display with two levels of backlighting; Fluke Connect logging with the optional IR3000FC module;
//   610 g (data sheet: 600 g); battery 10 h typical sourcing 20 mA (data sheet: 12 mA); 1 m drop; -20 to 55 °C.
// - Fluke 789 Users Manual (Rev. 3, 3/13): https://assets.fluke.com/manuals/789_____umeng0300.pdf
//   Loop power mode supplies a nominal 24 V and measures the current the transmitter draws; the internal 250 Ω
//   resistor is switched into the loop with a button for HART communication.
// - Official Amazon listings B071ZPSQ88 (787B, printed "0-24mA SOURCE / SIMULATE" and 0%/100% keys) and B000R8ETKW
//   (789). Both current offers are from third-party sellers.
// The loop voltage budget (Ohm's law: 250 Ω x 20 mA = 5 V) and the 0.05%-of-span arithmetic are ours; transmitter
// lift-off voltages vary by model and are hedged on the page. Picks: Fluke 787B (4.6) and Fluke 789 (4.7); neither
// is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-787b-vs-fluke-789";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 787B vs 789: Which ProcessMeter Is Better?",
  description:
    "Fluke 787B vs 789 comparison: identical meter and mA source specs, but only the 789 has a 24 V loop supply and 250 Ω HART resistor. Loop diagram and verdict.",
  image: all.find((p) => p.name === "Fluke 789")!.image,
  path: "/multimeters/fluke-787b-vs-fluke-789",
});

const link = "text-accent hover:underline";

/** One box in the loop drawing. */
function Box({ x, y, w, h, label, sub, accent }: { x: number; y: number; w: number; h: number; label: string; sub?: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" strokeWidth="1.4" className={accent ? "fill-accent/15 stroke-accent" : "fill-surface stroke-foreground"} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 1 : h / 2 + 3.5)} fontSize="9.5" fontWeight="700" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} fontSize="8" textAnchor="middle" className="fill-muted">
          {sub}
        </text>
      )}
    </g>
  );
}

/**
 * Bench check of a 2-wire HART transmitter. Left: the 787B needs an external 24 V supply and a loose 250 Ω resistor,
 * with the 787B measuring mA in series. Right: the 789 powers the loop itself with its internal 250 Ω switched in.
 */
function BenchLoopDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Two wiring diagrams for checking a 2-wire HART transmitter on the bench. With the Fluke 787B, a separate 24 volt supply, a separate 250 ohm resistor and the 787B measuring milliamps are wired in series with the transmitter, and the HART communicator clips across the resistor. With the Fluke 789, the 789 alone powers the loop with 24 volts, its internal 250 ohm resistor is switched in, and the communicator clips across the 789's terminals."
    >
      <text x="88" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        With a 787B: three items
      </text>
      <text x="272" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">
        With a 789: one item
      </text>
      <line x1="180" x2="180" y1="8" y2="242" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />

      {/* Left loop: supply -> resistor -> 787B -> transmitter -> back */}
      <path d="M40 60 H136 V200 H40 Z" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <Box x={14} y={44} w={56} h={34} label="24 V DC" sub="external" />
      <Box x={108} y={44} w={56} h={34} label="250 Ω" sub="loose resistor" />
      <Box x={108} y={112} w={56} h={36} label="787B" sub="mA measure" accent />
      <Box x={14} y={182} w={60} h={36} label="Transmitter" sub="2-wire, HART" />
      <path d="M136 44 V37" className="fill-none stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x="88" y="33" fontSize="8" textAnchor="middle" className="fill-muted">
        HART communicator across 250 Ω
      </text>

      {/* Right loop: 789 -> transmitter */}
      <path d="M232 92 H330 V200 H232 Z" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <Box x={206} y={60} w={86} h={56} label="789" sub="24 V + 250 Ω inside" accent />
      <Box x={296} y={182} w={60} h={36} label="Transmitter" sub="2-wire, HART" />
      <path d="M292 72 H340 V40" className="fill-none stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x="264" y="36" fontSize="8" className="fill-muted">
        HART communicator
      </text>
      <text x="270" y="140" fontSize="8.5" textAnchor="middle" className="fill-muted">
        789 shows mA and % of span
      </text>

      <text x="180" y="240" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Arrangement per Fluke&apos;s data sheet and 789 manual; follow your transmitter&apos;s wiring guide.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 787B vs Fluke 789: Which ProcessMeter Is Better?",
  path,
  published: "2026-10-28",
  intro:
    "The Fluke 789 is the better ProcessMeter if you ever work on 2-wire transmitters away from a powered panel: Fluke's data sheet lists a 24 V loop power supply and a HART mode that adds a 250 Ω resistor as 789-only features. Everything else Fluke publishes is shared. Both are 1000 V True RMS multimeters with the same accuracy table, both source or simulate 0–20 or 4–20 mA at 0.05% of span with 1,200 Ω drive, and both share the step and ramp modes, CAT IV 600V / CAT III 1000V rating, battery life and 3-year warranty. If you only feed signals into PLC inputs and valves, the 787B does that job.",
  a: {
    pick: all.find((p) => p.name === "Fluke 789")!,
    imageAlt: "Fluke 789 ProcessMeter with dual display and mA output controls, front view",
    chooseIf: [
      "You bench-test, configure or commission 2-wire transmitters and want the meter to power them",
      "You use a HART communicator and don't want to carry a loose 250 Ω resistor and a separate supply",
      "You want the two-level backlight and the optional IR3000FC Fluke Connect logging Fluke lists for the 789",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 787B")!,
    imageAlt: "Fluke 787B ProcessMeter showing the 0-24 mA source and simulate output, front view",
    chooseIf: [
      "Your mA work is sourcing into PLC analog inputs, I/P converters and valve positioners",
      "You simulate transmitters inside live loops that already have a 15–48 V control-system supply",
      "You don't use HART, or you already carry a loop supply and resistor in your kit",
    ],
  },
  extraSpecs: [
    { label: "24 V loop power supply", a: "Yes", b: "No (data sheet: 789 only)" },
    { label: "HART 250 Ω resistor", a: "Yes, switched in with loop power", b: "Not listed" },
    { label: "mA source", a: "0–20 / 4–20 mA, to 24 mA; 0.05% of span", b: "0–20 / 4–20 mA, to 24 mA; 0.05% of span" },
    { label: "Source drive", a: "24 V compliance or 1,200 Ω at 20 mA", b: "24 V compliance or 1,200 Ω at 20 mA" },
    { label: "mA simulate", a: "External 15–48 V supply, 1000 Ω at 20 mA", b: "External 15–48 V supply, 1000 Ω at 20 mA" },
    { label: "mA measure", a: "30.000 mA, 0.05% + 2", b: "30.000 mA, 0.05% + 2" },
    { label: "Step / ramp", a: "Coarse, fine, 25%, 100%; auto step, slow and fast ramp", b: "Same" },
    { label: "DC volts / AC volts", a: "0.1% + 1 / 0.7% + 2 True RMS, to 1000 V", b: "0.1% + 1 / 0.7% + 2 True RMS, to 1000 V" },
    { label: "Current input", a: "1 A (0.44 A continuous)", b: "1 A (0.44 A continuous)" },
    { label: "Display", a: "Dual, two backlight levels", b: "Backlit (details not stated)" },
    { label: "Fluke Connect", a: "With optional IR3000FC module", b: "Not stated" },
    { label: "Battery life", a: "140 h measuring; 10 h sourcing", b: "140 h measuring; 10 h sourcing" },
    { label: "Weight", a: "610 g (product page) / 600 g (data sheet)", b: "600 g" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Loop power: Fluke's data sheet lists the 24 V loop power supply as 789 only, so the 789 can power a 2-wire transmitter by itself.",
    "HART: the 789 has a HART mode that adds a 250 Ω resistor in series with its loop supply; Fluke lists nothing similar for the 787B.",
    "Display and logging: Fluke's 789 page describes a dual display with two backlight levels and optional Fluke Connect logging through an IR3000FC module; the 787B page says only \"backlit display\".",
    "Identical in the shared spec table: every DMM range and accuracy, the 30 mA measure range, source and simulate accuracy and drive, step and ramp modes, battery life, size, drop rating and safety rating.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two ProcessMeters, one spec table</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke sells these as a pair and describes the split in one sentence of its data sheet: whether you only need
          to source and simulate mA, or need a 24 V loop power supply, there is a ProcessMeter for you. The data sheet
          then prints a single accuracy table for both models and a short list headed &quot;789 additional
          features&quot; with two entries, the loop supply and the HART resistor. That is the whole difference in
          measuring and output capability.
        </p>
        <InfoCards
          items={[
            { label: "789: powers the loop", desc: "Built-in 24 V supply runs a 2-wire transmitter with nothing else." },
            { label: "789: HART-ready", desc: "Selectable internal 250 Ω resistor for a HART communicator." },
            { label: "Both: source", desc: "0–20 or 4–20 mA at 0.05% of span, 1,200 Ω at 20 mA." },
            { label: "Both: simulate", desc: "Act as a transmitter in a loop powered by a 15–48 V supply." },
            { label: "Both: full DMM", desc: "1000 V True RMS, 30 mA range at 0.05% + 2, 1 A input." },
            { label: "Both: rating", desc: "CAT IV 600V / CAT III 1000V, 1 m drop, 3-year warranty." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We haven&apos;t hands-on tested either ProcessMeter. The 4.7 for the 789 and 4.6 for the 787B come from desk
          research, and every number on this page is from Fluke&apos;s data sheet, the two product pages, the 789 manual
          or the official Amazon listings. Both Amazon offers were from third-party sellers when we checked.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 787B vs 789 spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 789", "Fluke 787B", "Same?"]}
          rows={[
            ["24 V loop supply", "Yes", "No", "789 only"],
            ["HART 250 Ω resistor", "Yes", "Not listed", "789 only"],
            ["mA source range", "0–20 or 4–20 mA, to 24 mA", "0–20 or 4–20 mA, to 24 mA", "Same"],
            ["Source accuracy", "0.05% of span", "0.05% of span", "Same"],
            ["Source drive", "24 V compliance or 1,200 Ω at 20 mA", "24 V compliance or 1,200 Ω at 20 mA", "Same"],
            ["Simulate", "1000 Ω at 20 mA, external 15–48 V", "1000 Ω at 20 mA, external 15–48 V", "Same"],
            ["mA and % of span together", "Yes", "Yes", "Same"],
            ["Step / ramp", "Coarse, fine, 25%, 100%; auto step, slow and fast ramp", "Same set", "Same"],
            ["mA measure", "30.000 mA, 0.05% + 2", "30.000 mA, 0.05% + 2", "Same"],
            ["DC volts", "400.0 mV to 1000 V, 0.1% + 1", "400.0 mV to 1000 V, 0.1% + 1", "Same"],
            ["AC volts (True RMS)", "0.7% + 2", "0.7% + 2", "Same"],
            ["Amps", "1.000 A (0.440 A continuous)", "1.000 A (0.440 A continuous)", "Same"],
            ["Resistance", "400.0 Ω to 40 MΩ, 0.2% + 1", "400.0 Ω to 40 MΩ, 0.2% + 1", "Same"],
            ["Frequency", "0.5 Hz to 20 kHz, 0.005% + 1", "0.5 Hz to 20 kHz, 0.005% + 1", "Same"],
            ["Display", "Dual, two backlight levels", "Backlit", "789 more detailed"],
            ["Fluke Connect", "Optional IR3000FC", "Not stated", "789"],
            ["Battery", "4 × AA; 140 h measure; 10 h source", "4 × AA; 140 h measure; 10 h source", "Same"],
            ["Operating range / drop", "−20 to 55 °C / 1 m", "−20 to 55 °C / 1 m", "Same"],
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Pieces of equipment needed to power and talk to a bench HART transmitter, besides the communicator.</>}>
            <BarChart
              items={[
                { label: "Fluke 787B setup", value: 3, display: "3: meter, supply, resistor" },
                { label: "Fluke 789 setup", value: 1, display: "1: the 789", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life on four AA cells, per Fluke&apos;s data sheet. Identical for both models.</>}>
            <BarChart
              items={[
                { label: "Measuring", value: 140, display: "140 h", highlight: true },
                { label: "Sourcing 12 mA", value: 10, display: "10 h" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Fluke&apos;s 789 product page gives the sourcing figure at 20 mA instead of 12 mA, and its weight as 610 g
          instead of the data sheet&apos;s 600 g; neither changes the comparison. Source accuracy works out the same on
          both: 0.05% of a 16 mA span (4–20 mA) is ±0.008 mA, and on the 0–20 mA span it is ±0.010 mA.
        </p>
        <div className="mt-4">
          <KeyIdea title="One line on Fluke's 787B page to read carefully">
            The 787B product page has a feature bullet that says &quot;Measure/Source/Simulate loop currents while
            powering the loop&quot;. Its own spec table lists no loop supply, and Fluke&apos;s joint data sheet marks the
            24 V loop power supply as &quot;789 only&quot;. We follow the data sheet: the 787B can drive a passive input
            from its internal source, but it can&apos;t power a 2-wire transmitter.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Powering a transmitter on the bench</h2>
        <p className="text-muted leading-7 mb-4">
          A 2-wire transmitter takes its power from the same pair of wires that carries its 4–20 mA signal, so it needs
          a DC supply in the loop before it outputs anything. In a plant, that supply lives in the control system. On a
          bench, in a shop, or when a new instrument arrives before the panel is energized, it doesn&apos;t exist yet,
          and that is the moment the two ProcessMeters part ways.
        </p>
        <Figure caption={<>Bench check of a HART transmitter with each meter. The 789 replaces the supply and the resistor.</>}>
          <BenchLoopDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          With a 787B you wire a separate 24 V supply, a 250 Ω resistor and the 787B on its mA measure range in series
          with the transmitter, then clip the HART communicator across the resistor. With a 789 you connect the
          transmitter to the meter, select loop power, and switch in the internal 250 Ω resistor; the 789 supplies the
          loop and reads the current the transmitter draws, with % of span on the second line of the display.
        </p>
        <p className="text-muted leading-7 mt-4">
          The resistor costs voltage, so check the budget. At 20 mA, 250 Ω drops 250 × 0.020 = 5 V, leaving about 19 V
          of a 24 V supply for the transmitter and the test leads. At 4 mA the drop is only 1 V. Most 2-wire
          transmitters need somewhere around 10 to 12 V at their terminals to operate, but that figure varies by model,
          so confirm the minimum supply voltage in your transmitter&apos;s data sheet before relying on either setup.
        </p>
        <div className="mt-4">
          <Figure caption={<>Voltage budget at 20 mA on a 24 V loop with the 250 Ω HART resistor in. Worked arithmetic.</>}>
            <BarChart
              items={[
                { label: "Loop supply", value: 24, display: "24 V" },
                { label: "Across 250 Ω at 20 mA", value: 5, display: "5 V" },
                { label: "Left for transmitter", value: 19, display: "≈19 V", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Jobs where the 787B is all you need</h2>
        <p className="text-muted leading-7 mb-4">
          Much loop work never touches a transmitter&apos;s power. Sourcing 4, 12 and 20 mA into a PLC or DCS analog
          input to check scaling and alarms uses the internal source, which both meters drive into up to 1,200 Ω.
          Stroking a valve through an I/P converter or positioner is the same. Simulating a transmitter inside a live
          loop, so you can check the wiring and the input card with the field device disconnected, uses the plant&apos;s
          own 15–48 V supply, which both meters accept. Reading loop current in series, with % of span alongside, is
          also identical.
        </p>
        <DataTable
          head={["Task", "Fluke 787B", "Fluke 789"]}
          rows={[
            ["Source 4–20 mA into a PLC input", "Yes", "Yes"],
            ["Stroke a valve via I/P or positioner", "Yes", "Yes"],
            ["Simulate a transmitter in a powered loop", "Yes", "Yes"],
            ["Measure loop current, mA and %", "Yes", "Yes"],
            ["Power a 2-wire transmitter alone", "Needs external supply", "Yes, 24 V"],
            ["HART communication on the bench", "Needs supply and 250 Ω resistor", "Yes, internal resistor"],
            ["Check 120 V control power or a 24 V DC rail", "Yes, to 1000 V", "Yes, to 1000 V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a side-by-side of the 789 against a pure industrial multimeter, including its 440 mA current limit, see{" "}
          <Link href="/multimeters/fluke-789-vs-fluke-87v" className={link}>
            Fluke 789 vs Fluke 87V
          </Link>
          . For clamp-on loop testers and other options, see our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            best multimeters for 4–20 mA loop testing
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 787B vs 789: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Instrument tech commissioning new transmitters", "Fluke 789", "Powers and HART-connects them without extra kit"],
            ["Calibration shop with a bench supply and resistor", "Fluke 787B", "Same accuracy; bench already has the loop power"],
            ["PLC or controls technician checking analog inputs", "Fluke 787B", "Source and simulate are identical"],
            ["Valve and positioner technician", "Fluke 787B", "Sourcing into an I/P is the same on both"],
            ["Field tech covering remote skids and wellheads", "Fluke 789", "One tool can power a transmitter anywhere"],
            ["Team that logs results to Fluke Connect", "Fluke 789", "IR3000FC option listed only for the 789"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If your loop work is mostly troubleshooting live loops without breaking them, a mA clamp may suit you better
          than either; the 4–20 mA guide above compares those. For general electrical work the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup is the place to start, and our walkthrough on{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          covers series connections.
        </p>
      </section>

      <Callout title="Safety: loop wiring often shares a cabinet with mains">
        4–20 mA loops run at 24 V, but the terminal strips and marshalling cabinets they pass through often carry 120 V
        or higher control power. Both ProcessMeters are rated CAT IV 600V / CAT III 1000V; use leads rated to match, and
        choose the dial position and output mode before the leads touch anything, so the meter is never sourcing into a
        circuit you meant only to measure. Breaking a loop to measure in series can drive a valve or trip a shutdown, so get the operator&apos;s
        permission and put the loop in manual or bypass first. In hazardous (classified) areas, use only equipment and
        permits your site allows; neither meter is described by Fluke as intrinsically safe.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 789 if you work on 2-wire transmitters away from a powered control panel or use HART: its built-in 24 V loop supply and switchable 250 Ω resistor replace a separate supply and resistor. Buy the Fluke 787B if your mA work is sourcing into PLC inputs and valves or simulating transmitters in live loops; Fluke publishes identical measurement, source and simulate specs, safety rating, battery life and warranty for both.",
  faqs: [
    {
      question: "What is the difference between the Fluke 787B and 789?",
      answer:
        "Fluke's joint data sheet lists two 789-only features: a 24 V loop power supply and a HART mode that adds a 250 Ω resistor. Everything in the spec table is shared, including DMM accuracy, the 30 mA range, 0.05%-of-span source and simulate, 1,200 Ω drive, step and ramp modes, battery life and the CAT IV 600V / CAT III 1000V rating.",
    },
    {
      question: "Can the Fluke 787B power a 4-20 mA transmitter?",
      answer:
        "No. Fluke's data sheet marks the 24 V loop power supply as 789 only, even though one bullet on the 787B product page mentions powering the loop. The 787B can source current into passive inputs and simulate a transmitter in a loop that already has a 15–48 V supply, but a 2-wire transmitter on the bench needs an external supply.",
    },
    {
      question: "Does the Fluke 787B have a HART resistor?",
      answer:
        "Fluke doesn't list one. The HART mode, which switches a 250 Ω resistor in series with the loop supply, is listed only for the 789. With a 787B, carry a separate 250 Ω resistor and a supply when you need a HART communicator to talk to a transmitter that isn't in a powered loop.",
    },
    {
      question: "Are the Fluke 787B and 789 equally accurate?",
      answer:
        "Yes, according to Fluke's single spec table: DC volts 0.1% + 1, True RMS AC volts 0.7% + 2, the 30.000 mA range at 0.05% + 2, resistance 0.2% + 1, and source and simulate at 0.05% of span. On a 4–20 mA span, 0.05% works out to ±0.008 mA from either meter.",
    },
    {
      question: "How long do the batteries last on the 787B and 789?",
      answer:
        "Fluke's data sheet gives the same figures for both: about 140 hours measuring and about 10 hours sourcing 12 mA, on four AA cells. Fluke's 789 page quotes the 10 hours at 20 mA. Simulating draws on the loop's own supply, so on a long commissioning day, simulate rather than source wherever the plant supply is available.",
    },
    {
      question: "Can either ProcessMeter measure motor current?",
      answer:
        "Only small currents. Both have a 1.000 A range rated 0.440 A continuous and no 10 A input, so motor, heater and contactor currents need a clamp meter. Both still measure AC and DC volts to 1000 V as True RMS, which covers control power and supply checks inside a panel.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 789 vs Fluke 87V", href: "/multimeters/fluke-789-vs-fluke-87v" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke787bVsFluke789Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
