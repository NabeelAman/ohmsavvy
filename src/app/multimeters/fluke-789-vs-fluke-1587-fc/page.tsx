// Specs per Fluke, as recorded on this repo's Picks and existing pages (checked 2026-10-24 to 2026-10-28):
// - Fluke 789: Pick in src/lib/multimeter-catalog.ts (Amazon B000R8ETKW, third-party seller) and the "Specs per" notes
//   on /multimeters/fluke-787b-vs-fluke-789 and /multimeters/fluke-789-vs-fluke-87v, from the 787B/789 ProcessMeter
//   data sheet (https://media.fluke.com/2e561b8d-bd2c-4efe-92ca-b1060068ee0e_original%20file.pdf), the 789 product page
//   (https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-789) and the 789 Users Manual
//   (https://assets.fluke.com/manuals/789_____umeng0300.pdf): DC mA measure 30.000 mA, 0.001 mA, 0.05% + 2; source
//   and simulate 0-20 or 4-20 mA, over-range to 24 mA, 0.05% of span; source drive 24 V compliance or 1,200 Ω at
//   20 mA (manual: 28 V compliance with battery above about 4.5 V; conflict stated on page); simulate with an
//   external 15-48 V supply; built-in 24 V loop supply; selectable 250 Ω HART resistor; % of span with mA; SpanCheck,
//   step and ramp; DC V 400.0 mV to 1000 V, 0.1% + 1; AC V True RMS 0.7% + 2 (50-60 Hz); current 1.000 A AC/DC
//   (0.440 A continuous); resistance to 40 MΩ, 0.2% + 1; frequency to 20 kHz; continuity beeps below about 100 Ω;
//   dual display, two backlight levels; Min/Max/Average/Hold/Relative; Fluke Connect only with the optional IR3000FC;
//   CAT IV 600 V / CAT III 1000 V; 1 m drop; -20 to 55 °C; 50 x 100 x 203 mm; 600 g (data sheet) or 610 g (product
//   page); 4 x AA, 140 h measuring, 10 h sourcing (12 mA per data sheet, 20 mA per product page); 3-year warranty.
//   Capacitance, temperature, low-pass filter, IP rating and insulation testing are not listed.
// - Fluke 1587 FC: Pick in src/lib/multimeter-catalog.ts (Amazon B017OVC2UI, bare meter) and the "Specs per" notes on
//   /multimeters/fluke-1587-fc-vs-fluke-87v and /multimeters/fluke-1577-vs-fluke-1587-fc, from the 1587 FC product
//   page (https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1587-fc) and the 1587 FC/1577
//   data sheet (https://media.fluke.com/ad0b1bcb-5f5e-431c-9a0f-b10600757414_original%20file.pdf): insulation test
//   50/100/250/500/1000 V (+20%/-0%), 0.01 MΩ to 2 GΩ, 1 mA nominal test current; inhibits the test above 30 V on the
//   terminals; auto discharge <0.5 s for 1 µF or less; PI/DAR with TrendIt graphs, memory and temperature compensation
//   over Fluke Connect (2.4 GHz); 6000-count backlit display; DC V ±(0.09% + 2); AC V ±(1% + 3) at 50-60 Hz; low-pass
//   filter; current 60 mA and 400 mA AC/DC only, DC ±(0.2% + 2), 0.44 A fuse, no 10 A input; resistance to 50 MΩ;
//   capacitance to 9999 µF; frequency to 99.99 kHz; temperature -40 to 537 °C (K-type included); continuity below
//   about 25 Ω; CAT IV 600V / CAT III 1000V; IP40 (non-operating); -20 to 55 °C; 5.0 x 10.0 x 20.3 cm; 550 g (Amazon:
//   1645 g, conflict stated); 4 x AA, 1000 h meter use and at least 1000 insulation tests; 3-year warranty. Drop rating
//   not stated. Case listed as both soft and hard by Fluke (stated). No mA source, simulate or loop supply.
// - Fluke 87V and Fluke 117 (general meters, both hands-on tested): Picks in best-multimeters and the notes on
//   /multimeters/fluke-789-vs-fluke-87v and /multimeters/fluke-1587-fc-vs-fluke-87v (87V: 10 A, 20 A for 30 s, no
//   insulation test, no mA source, lifetime warranty; 117: True RMS, NCV, CAT III 600V).
// The 12 mA error arithmetic is ours. The 1587 FC's 0.01 mA step on its 60 mA range is our inference from the
// 6000-count display (Fluke's resolution figure is not in the sources above) and is labeled as such on the page.
// Picks: Fluke 789 (4.7) and Fluke 1587 FC (4.6); neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-789-vs-fluke-1587-fc";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 789 vs 1587 FC: Process or Insulation?",
  description:
    "Fluke 789 vs 1587 FC comparison: a 4–20 mA source with 24 V loop power against a 50–1000 V insulation tester. Who needs which, and who needs neither.",
  image: all.find((p) => p.name === "Fluke 789")!.image,
  path: "/multimeters/fluke-789-vs-fluke-1587-fc",
});

const link = "text-accent hover:underline";

/**
 * Where each tool is used: the 789 sits in series with a powered 4-20 mA loop that keeps running; the 1587 FC is
 * clipped onto a motor winding and frame only after the feeder breaker is off, locked and proven dead.
 */
function LiveVsDeadDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="Two sketches. Left: the Fluke 789 connected in series with a transmitter and a PLC analog input in a 4 to 20 milliamp loop that stays powered at 24 volts DC while you work. Right: the Fluke 1587 FC connected between a motor winding and the motor frame, with the feeder breaker switched off, locked out and proven dead, while the meter applies up to 1000 volts DC."
    >
      <text x="88" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">
        Fluke 789: loop stays live
      </text>
      <text x="272" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 1587 FC: circuit made dead
      </text>
      <line x1="180" x2="180" y1="8" y2="222" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />

      {/* Left: series loop */}
      <path d="M44 70 H134 V176 H44 Z" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="12" y="52" width="64" height="36" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="44" y="68" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">PLC input</text>
      <text x="44" y="80" fontSize="7.5" textAnchor="middle" className="fill-muted">24 V DC supply</text>
      <rect x="104" y="104" width="60" height="40" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.4" />
      <text x="134" y="122" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">789</text>
      <text x="134" y="135" fontSize="7.5" textAnchor="middle" className="fill-muted">in series</text>
      <rect x="12" y="158" width="64" height="36" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="44" y="174" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Transmitter</text>
      <text x="44" y="186" fontSize="7.5" textAnchor="middle" className="fill-muted">4–20 mA out</text>
      <text x="90" y="212" fontSize="8" textAnchor="middle" className="fill-muted">Reads 4.000–20.000 mA and % of span</text>

      {/* Right: lockout + insulation test */}
      <rect x="196" y="36" width="70" height="44" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="231" y="54" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Breaker OFF</text>
      <text x="231" y="67" fontSize="7.5" textAnchor="middle" className="fill-muted">locked + tagged</text>
      <rect x="282" y="42" width="30" height="24" rx="3" className="fill-none stroke-accent" strokeWidth="1.4" />
      <path d="M288 42 V34 a9 9 0 0 1 18 0 V42" className="fill-none stroke-accent" strokeWidth="1.4" />
      <line x1="231" x2="231" y1="80" y2="112" className="stroke-border" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="238" y="100" fontSize="7.5" className="fill-muted">feeder open</text>
      <circle cx="231" cy="146" r="30" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="231" y="144" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">Motor</text>
      <text x="231" y="156" fontSize="7.5" textAnchor="middle" className="fill-muted">winding</text>
      <rect x="292" y="126" width="60" height="40" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.4" />
      <text x="322" y="144" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-accent">1587 FC</text>
      <text x="322" y="157" fontSize="7.5" textAnchor="middle" className="fill-muted">up to 1000 V</text>
      <path d="M261 140 H292" className="fill-none stroke-accent" strokeWidth="1.6" />
      <path d="M231 176 V196 H322 V166" className="fill-none stroke-accent" strokeWidth="1.6" />
      <text x="276" y="212" fontSize="8" textAnchor="middle" className="fill-muted">Winding to frame, after proving it dead</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 789 vs Fluke 1587 FC: Process Calibration or Insulation Testing?",
  path,
  published: "2026-10-29",
  intro:
    "Pick the Fluke 789 if your work is 4–20 mA instrument loops, and the Fluke 1587 FC if your work is proving that motors, cables and windings are still insulated. They aren't rivals so much as two specialist tools that happen to share a body size, a CAT IV 600V / CAT III 1000V rating and a 3-year warranty. The 789 sources, simulates and powers loop current at 0.05% of span; the 1587 FC applies 50 to 1000 V DC and reads insulation up to 2 GΩ. If you do neither job, a general multimeter with a 10 A input will serve you better than either.",
  a: {
    pick: all.find((p) => p.name === "Fluke 789")!,
    imageAlt: "Fluke 789 ProcessMeter with mA output keys and dual display, front view",
    chooseIf: [
      "You calibrate or troubleshoot transmitters, PLC analog inputs, I/P converters and valve positioners",
      "You need to power a 2-wire transmitter on the bench, or talk to it over HART with the internal 250 Ω resistor",
      "You want mA and % of span on one display, with SpanCheck, step and ramp outputs",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with its insulation test button and 1000 V CAT III marking, front view",
    chooseIf: [
      "You test motor windings, feeders, cables or switchgear for insulation breakdown",
      "Your maintenance program records PI or DAR results and wants them trended by asset",
      "You also want temperature, capacitance and a low-pass filter for drive outputs in the same meter",
    ],
  },
  extraSpecs: [
    { label: "Main specialist function", a: "mA source, simulate and 24 V loop power", b: "Insulation test, 50/100/250/500/1000 V" },
    { label: "Highest output voltage", a: "24 V compliance (manual: 28 V)", b: "1000 V DC, tolerance +20% / −0%" },
    { label: "mA measuring", a: "30.000 mA, 0.05% + 2", b: "60 mA and 400 mA, DC ±(0.2% + 2)" },
    { label: "mA output", a: "0–20 or 4–20 mA, to 24 mA, 0.05% of span", b: "None" },
    { label: "Insulation resistance", a: "None (ohms to 40 MΩ only)", b: "0.01 MΩ to 2 GΩ, PI/DAR" },
    { label: "Highest current input", a: "1 A (0.44 A continuous)", b: "400 mA" },
    { label: "DC volts accuracy", a: "0.1% + 1", b: "±(0.09% + 2)" },
    { label: "AC volts, 50–60 Hz", a: "0.7% + 2, True RMS", b: "±(1% + 3), True RMS, low-pass filter" },
    { label: "Capacitance / temperature", a: "Not listed / not listed", b: "To 9999 µF / −40 to 537 °C" },
    { label: "Frequency", a: "To 20 kHz", b: "To 99.99 kHz" },
    { label: "Fluke Connect", a: "Only with optional IR3000FC", b: "Built in (2.4 GHz)" },
    { label: "Battery", a: "4 × AA; 140 h measuring, 10 h sourcing", b: "4 × AA; 1000 h meter use, ≥1000 tests" },
    { label: "Size / weight", a: "50 × 100 × 203 mm; 600 or 610 g", b: "50 × 100 × 203 mm; 550 g" },
    { label: "Enclosure / drop", a: "IP not listed / 1 m", b: "IP40 (non-operating) / not stated" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Purpose: the 789 is a loop calibrator built into a multimeter; the 1587 FC is an insulation tester built into a multimeter. Neither can do the other's specialist job.",
    "Output: the 789 drives up to 24 mA at 24 V compliance into a loop; the 1587 FC drives about 1 mA at 50 to 1000 V DC into insulation.",
    "mA reading: the 789 resolves 0.001 mA at 0.05% + 2 and shows % of span; the 1587 FC reads mA at ±(0.2% + 2) with no span display.",
    "Meter extras: only the 1587 FC lists capacitance, temperature, a low-pass filter and built-in Fluke Connect.",
    "Shared: CAT IV 600V / CAT III 1000V, True RMS AC, four AA cells, the same 50 × 100 × 203 mm footprint, no 10 A input and a 3-year warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A loop on one side, a winding on the other</h2>
        <p className="text-muted leading-7 mb-4">
          It helps to picture where each meter gets clipped on. An instrument technician puts the 789 in series with a
          running loop, or on the terminals of a transmitter sitting on a workbench, and the circuit stays energized
          the whole time because the 24 V loop is the thing being checked. An electrician uses the 1587 FC the other way
          around: the feeder gets switched off, locked and proven dead, and only then does the meter put its own high
          voltage onto the winding or cable. One tool works with the power on; the insulation function only works with
          it off.
        </p>
        <Figure caption={<>Typical hookups. The 789 joins a powered loop; the 1587 FC tests a de-energized winding against its frame.</>}>
          <LiveVsDeadDiagram />
        </Figure>
        <InfoCards
          items={[
            { label: "789 job", desc: "Prove a transmitter, input card or valve responds correctly across 4–20 mA." },
            { label: "1587 FC job", desc: "Prove a conductor isn't leaking to ground before it is re-energized." },
            { label: "789 output", desc: "Up to 24 mA, regulated to 0.05% of span." },
            { label: "1587 FC output", desc: "50 to 1000 V DC, about 1 mA into a short." },
            { label: "Both", desc: "True RMS voltmeter to 1000 V, CAT IV 600V / CAT III 1000V." },
            { label: "Neither", desc: "A 10 A input for motor or heater current." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We haven&apos;t hands-on tested either tool. The 789 carries a 4.7 and the 1587 FC a 4.6 from desk research,
          and every number here comes from Fluke&apos;s data sheets, product pages and 789 manual, or the official Amazon
          listings, as recorded in our existing Fluke 789 and 1587 FC comparisons.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each tool puts out</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters push current into something, which is exactly why they can&apos;t stand in for each other. The
          789 is a precise current source with a modest voltage behind it. The 1587 FC is a high-voltage source with
          a deliberately small current limit. Plotted together, the voltage gap is about forty to one.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest voltage each meter applies to the circuit, log scale. 789: source compliance; 1587 FC: top insulation test setting.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 789", value: 24, display: "24 V" },
                { label: "Fluke 1587 FC", value: 1000, display: "1000 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each meter drives out of its terminals. 789: over-range source; 1587 FC: nominal test current.</>}>
            <BarChart
              items={[
                { label: "Fluke 789", value: 24, display: "24 mA", highlight: true },
                { label: "Fluke 1587 FC", value: 1, display: "≈1 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Two details are worth knowing. The 1587 FC&apos;s test voltage tolerance is +20% / −0%, so the 1000 V setting
          is allowed to land anywhere from 1000 V up to 1200 V, never below. And the 789&apos;s compliance figure depends
          on which Fluke document you read: the data sheet and product page say 24 V, while the 789 manual says 28 V
          with a healthy battery. Either is enough for typical loop loads; Fluke rates the source at 1,200 Ω at 20 mA.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Can the 1587 FC check a 4–20 mA loop?</h2>
        <p className="text-muted leading-7 mb-4">
          Partly. Its 60 mA range will read loop current if you break the loop and wire it in series, so it can tell
          you a transmitter is outputting roughly 12 mA. What it can&apos;t do is generate a signal, so there&apos;s no
          way to drive a PLC input to 4, 12 and 20 mA and watch the scaling, stroke a valve, or power a transmitter
          that has no supply. Precision differs too. Here is the worst-case error on a 12 mA reading, from each
          meter&apos;s published accuracy:
        </p>
        <DataTable
          head={["Meter", "Accuracy spec", "Working at 12 mA", "Error", "% of 16 mA span"]}
          rows={[
            ["Fluke 789", "0.05% + 2 counts (0.001 mA)", "0.006 + 0.002", "±0.008 mA", "0.05%"],
            ["Fluke 1587 FC", "0.2% + 2 counts (0.01 mA, our inference)", "0.024 + 0.020", "±0.044 mA", "≈0.28%"],
          ]}
        />
        <div className="mt-4">
          <Figure caption={<>Worst-case error on a 12 mA reading, in mA. Lower is better. 1587 FC count size inferred from its 6000-count display.</>}>
            <BarChart
              items={[
                { label: "Fluke 789", value: 0.008, display: "±0.008 mA", highlight: true },
                { label: "Fluke 1587 FC", value: 0.044, display: "±0.044 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          For troubleshooting, ±0.044 mA is still plenty to tell a dead transmitter from a working one. For calibration
          against a tolerance of a few tenths of a percent, it isn&apos;t. Fluke doesn&apos;t publish the 1587 FC&apos;s
          resolution in the sources we used, so the 0.01 mA count is our reading of a 6000-count display on a 60 mA
          range. Our{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            guide to measuring milliamps
          </Link>{" "}
          shows the series connection either meter needs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Can the 789 tell you a motor is safe to restart?</h2>
        <p className="text-muted leading-7 mb-4">
          No. Its resistance function tops out at 40 MΩ and uses the meter&apos;s own small test voltage, which can show
          a dead short between a winding and the frame but says little about insulation that only breaks down under
          stress. A proper insulation test applies hundreds of volts precisely because weak insulation often looks
          perfect at a few volts. The 1587 FC does that at five settings, reads up to 2 GΩ, and runs timed PI and DAR
          tests whose results land in the Fluke Connect app with temperature compensation.
        </p>
        <p className="text-muted leading-7">
          The 789 also lacks the motor-side extras Fluke lists for the 1587 FC: capacitance for run capacitors,
          temperature with the included K-type probe, and a low-pass filter for reading a drive&apos;s output. For the
          winding-test procedure itself, see{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            how to check a motor winding for a short
          </Link>
          , and for how the 1587 FC compares with Fluke&apos;s simpler insulation model, read{" "}
          <Link href="/multimeters/fluke-1577-vs-fluke-1587-fc" className={link}>
            Fluke 1577 vs Fluke 1587 FC
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy neither</h2>
        <p className="text-muted leading-7 mb-4">
          Most people who search for these two model numbers don&apos;t need either one. If your day is outlets,
          breakers, lighting, HVAC controls or motor running current, both specialists come up short in the same place:
          the 789 tops out at 1 A (0.44 A continuous) and the 1587 FC at 400 mA, with no 10 A jack on either. You would
          be paying for a calibrator or a megohmmeter you never switch on, and still need a clamp for load current.
        </p>
        <DataTable
          head={["Your work", "Better choice", "Why"]}
          rows={[
            ["Residential and light commercial wiring", "Fluke 117", "True RMS, non-contact voltage, CAT III 600V"],
            ["Industrial troubleshooting, drives, motors", "Fluke 87V", "10 A input (20 A for 30 s), low-pass filter"],
            ["Motor running current", "A clamp meter", "Neither specialist has a 10 A input"],
            ["Loop checks a few times a year", "Fluke 87V", "Reads mA in series; borrow a calibrator for full calibrations"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 and 87V are the two general meters on this list that we have hands-on tested; see the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>
          . Each specialist is also compared head to head with the 87V in{" "}
          <Link href="/multimeters/fluke-789-vs-fluke-87v" className={link}>
            Fluke 789 vs Fluke 87V
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs Fluke 87V
          </Link>
          , and our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          covers current measurement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 789 vs 1587 FC: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Instrument or calibration technician", "Fluke 789", "Source, simulate and loop power at 0.05% of span"],
            ["Controls tech commissioning PLC analog I/O", "Fluke 789", "Drives inputs to 4, 12 and 20 mA on demand"],
            ["Motor shop or rewinder", "Fluke 1587 FC", "50–1000 V tests, PI/DAR, readings to 2 GΩ"],
            ["Electrician testing new feeders before energizing", "Fluke 1587 FC", "Insulation test plus a full meter"],
            ["Plant maintenance tech covering instruments and motors", "Both", "No overlap in their specialist functions"],
            ["Electrician or HVAC tech with no loop or megger work", "Neither", "A general meter with 10 A, such as the 87V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you need both functions, carrying both is the honest answer: they share a footprint and battery type, and
          nothing Fluke publishes for either one covers the other&apos;s core task. If you&apos;re still weighing loop
          tools, the{" "}
          <Link href="/multimeters/fluke-787b-vs-fluke-789" className={link}>
            Fluke 787B vs Fluke 789
          </Link>{" "}
          page covers the cheaper ProcessMeter without loop power, and our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            best multimeters for 4–20 mA loop testing
          </Link>{" "}
          adds clamp-on options. For electrical shortlists, start with the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="Where the sources disagree">
            Fluke gives the 789&apos;s weight as 600 g in the data sheet and 610 g on the product page, and its sourcing
            battery life as 10 hours at 12 mA in one and at 20 mA in the other. The 789 manual lists 28 V source
            compliance against 24 V elsewhere. For the 1587 FC, Amazon lists an item weight of 1645 g against
            Fluke&apos;s 550 g, and Fluke&apos;s page calls the included case both soft and hard. Fluke doesn&apos;t state a
            drop rating for the 1587 FC or an IP rating for the 789. Amazon stock of the 789 came from a third-party
            seller when we checked.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: insulation testing means up to 1200 V on your leads">
        The 1587 FC deliberately generates up to 1000 V DC, and its tolerance lets that reach 1200 V. Run an insulation test
        only on equipment that is switched off, locked out, tagged and proven dead with a voltmeter you have checked on a known
        live source. The meter&apos;s 30 V lockout refuses to start on a live circuit, but it is a backstop, not a
        substitute for lockout. Disconnect drives, PLC cards, transmitters, surge suppressors and anything electronic,
        because a test voltage meant for a winding can destroy them; never run an insulation test on a 4–20 mA loop
        with instruments still connected. Keep clear of probe tips and conductors during the test, warn people
        nearby, and let the meter discharge long cables and large motors before you touch them. Work on the
        789&apos;s loops can also put you in cabinets with 120 V or higher control power, so get permission and put
        loops in manual first. Both meters are rated CAT IV 600V / CAT III 1000V and no higher. If you aren&apos;t
        trained and authorized for this work, call a qualified electrician or instrument technician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 789 for 4–20 mA work: it measures loop current at 0.001 mA, sources and simulates at 0.05% of span, and powers transmitters with its own 24 V supply and HART resistor. Buy the Fluke 1587 FC for insulation work: 50 to 1000 V tests to 2 GΩ, PI and DAR through Fluke Connect, plus temperature and capacitance. Plant technicians who cover both instruments and motors need both tools. Everyone else is better served by a general multimeter with a 10 A input, such as the Fluke 87V.",
  chooseNeitherIf:
    "Your work isn't specifically loop-current/HART or insulation testing — both of these are specialist instruments; a general multimeter with a 10 A input, such as the Fluke 87V, serves everyday electrical work better.",
  faqs: [
    {
      question: "Is the Fluke 789 or the 1587 FC better for an industrial maintenance technician?",
      answer:
        "It depends on which assets you look after. Instrument loops, transmitters and analog inputs call for the 789; motors, cables and switchgear call for the 1587 FC. A technician covering both usually carries both, since neither does the other's specialist job. If you mostly troubleshoot live equipment, a Fluke 87V with a clamp may cover more of your day.",
    },
    {
      question: "Can the Fluke 1587 FC source 4–20 mA?",
      answer:
        "No. Fluke lists no current output, simulate mode or loop supply for the 1587 FC. It can measure loop current on its 60 mA range if you wire it in series, at ±(0.2% + 2), but it can't drive a PLC input, stroke a valve or power a 2-wire transmitter. Those jobs need a loop calibrator such as the 789.",
    },
    {
      question: "Can the Fluke 789 do an insulation resistance test?",
      answer:
        "No. The 789's resistance range reaches 40 MΩ using a low internal test voltage, which finds hard shorts but not insulation that fails under stress. Insulation testing needs hundreds of volts and readings into the gigohms, which the 1587 FC provides with 50, 100, 250, 500 and 1000 V settings and a 2 GΩ ceiling.",
    },
    {
      question: "Do the Fluke 789 and 1587 FC have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT IV 600V / CAT III 1000V, so either can measure voltage at a service entrance up to 600 V or on 1000 V-class circuits inside a building. The rating covers their voltmeter inputs; it doesn't make insulation testing on live circuits acceptable, which the 1587 FC blocks above 30 V anyway.",
    },
    {
      question: "Can either meter measure motor running current?",
      answer:
        "Not at typical motor loads. The 789's current input is rated 1 A, with 0.44 A continuous, and the 1587 FC stops at 400 mA. Neither has a 10 A jack. Use a clamp meter for running and inrush current; Fluke sells 1587 FC kits that include its i400 clamp, but the bare meter on Amazon doesn't.",
    },
    {
      question: "Which one connects to the Fluke Connect app?",
      answer:
        "The 1587 FC has Fluke Connect built in over a 2.4 GHz radio, and uses it to graph PI and DAR tests, store readings and apply temperature compensation. Fluke lists Fluke Connect logging for the 789 only through the optional IR3000FC infrared adapter, so out of the box the 789 has no wireless link.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 787B vs Fluke 789", href: "/multimeters/fluke-787b-vs-fluke-789" },
    { label: "Fluke 789 vs Fluke 87V", href: "/multimeters/fluke-789-vs-fluke-87v" },
    { label: "Fluke 1577 vs Fluke 1587 FC", href: "/multimeters/fluke-1577-vs-fluke-1587-fc" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 1587 FC vs Fluke 87V MAX", href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
  ],
};

export default function Fluke789VsFluke1587FcPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
