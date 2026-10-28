// Specs per Fluke, checked 2026-10-27:
// - Fluke 88V facts per the Fluke "Model 88 V Automotive Multimeter Users Manual" (PN 2166623, August 2004, Rev. 1,
//   1/06), https://media.fluke.com/a335b692-d3cf-4f18-86fa-b10800c2bce3_original%20file.pdf (fluke.com product pages
//   returned HTTP 403 to our fetcher, so the 88V Pick's "Specs per fluke.com" comment covers the product page):
//   6,000 counts (4/s), 19,999 counts in HiRes mode; 33-segment bar graph at 40/s; "AC conversions are ac coupled and
//   are average responding, rms indicating"; AC V 50-60 Hz ±(0.5% + 2), 30 Hz-1 kHz ±(1.0% + 4), 1-5 kHz ±(2.0% + 4);
//   DC V ±(0.1% + 1) to 1000 V; DC mV ±(0.3% + 1); 600.0 µA and 6000 µA, 60.00 mA and 400.0 mA, 6.000 A and 10.00 A
//   (20 A for 30 s); burden 100 µV/µA, 1.8 mV/mA, 0.03 V/A; resistance to 50.00 MΩ; capacitance 10.00 nF to 9,999 µF
//   ±(1% + 2); frequency 0.5 Hz to 200 kHz ±(0.01% + 1); duty cycle 0.0 to 99.9%; pulse width 0.002 to 1999.9 ms,
//   ±(0.002 ms + 3); RPM 30-9,000 and 60-12,000, ±2 RPM, using the RPM80 probe; temperature -200 to 1090 °C, ±(1% + 10)
//   excluding probe; Peak Min/Max 250 µs; input 10 MΩ; 9V battery, 400 h typical; 355 g (624 g with holster);
//   1000 V CAT III / 600 V CAT IV; lifetime limited warranty (Fluke 80 Series). No low-pass filter is listed.
//   The manual calls the K-type thermocouple "included"; the 88V Pick (current fluke.com listing) says Fluke lists the
//   inductive pickup and temperature probe as optional for the bare 88V. We state both.
// - Fluke 87V facts per our 87V review's spec comment (fluke.com 87V spec tab, checked 2026-10-26): True RMS,
//   6,000 counts and 19,999-count HiRes; 32-segment bar graph at 40/s; CAT III 1000V / CAT IV 600V; DC V ±(0.05% + 1);
//   AC V ±(0.7% + 2); low-pass filter (3 dB at 1 kHz); 10 A (20 A for 30 s); 0.01 µA DC resolution; 50 MΩ; 9,999 µF;
//   200 kHz; duty cycle to 99.9%; temperature -200 to 1090 °C excluding probe, 80BK probe in the box; Peak Capture
//   250 µs; 355 g (624 g in holster); about 400 h battery; lifetime warranty.
// - 87V pulse width: the Fluke 80 Series V users manual ("Determining Pulse Width", p. 38) has you compute it as
//   (% duty cycle ÷ 100) ÷ frequency; it has no direct pulse-width or RPM function.
//   https://www.manualsdir.com/manuals/743810/fluke-80-series-v-85-v-83-v-87-v.html?page=38
// Waveform form-factor numbers (sine 1.111, square 1.000, triangle 1.155) are standard engineering values.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-88v-vs-fluke-87v";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 88V vs Fluke 87V: Which Is Better?",
  description:
    "Fluke 88V vs Fluke 87V for automotive vs industrial work: injector pulse width and RPM on the 88V, True RMS and a drive filter on the 87V. Specs and a verdict.",
  image: all.find((p) => p.name === "Fluke 88V")!.image,
  path: "/multimeters/fluke-88v-vs-fluke-87v",
});

const link = "text-accent hover:underline";

/**
 * Why average-responding meters drift on non-sine waves: the meter rectifies, averages and multiplies by the sine
 * form factor (1.111). Exact for a sine, wrong for anything else. Standard engineering values.
 */
function AverageVsRmsDiagram() {
  const sine: string[] = [];
  const tri: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const x = 10 + i * 1.375;
    sine.push(`${x.toFixed(1)},${(52 - 26 * Math.sin((i / 80) * 2 * Math.PI)).toFixed(1)}`);
    const ph = (i / 80) % 1;
    const t = ph < 0.25 ? ph * 4 : ph < 0.75 ? 2 - ph * 4 : ph * 4 - 4;
    tri.push(`${(250 + i * 1.375).toFixed(1)},${(52 - 26 * t).toFixed(1)}`);
  }
  return (
    <svg
      viewBox="0 0 380 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: three waveforms with the same peak. On a sine an average-responding meter reads correctly; on a square wave it reads about 11 percent high; on a triangle wave it reads about 4 percent low. A True RMS meter reads all three correctly."
    >
      {[10, 130, 250].map((x0) => (
        <line key={x0} x1={x0} x2={x0 + 110} y1="52" y2="52" className="stroke-border" strokeWidth="0.8" />
      ))}
      <polyline points={sine.join(" ")} className="fill-none stroke-accent" strokeWidth="2" />
      <polyline
        points="130,52 130,26 185,26 185,78 240,78 240,52"
        className="fill-none stroke-accent"
        strokeWidth="2"
      />
      <polyline points={tri.join(" ")} className="fill-none stroke-accent" strokeWidth="2" />
      <text x="65" y="100" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Sine</text>
      <text x="185" y="100" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Square</text>
      <text x="305" y="100" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Triangle</text>
      <text x="65" y="118" fontSize="9" textAnchor="middle" className="fill-muted">form factor 1.111</text>
      <text x="185" y="118" fontSize="9" textAnchor="middle" className="fill-muted">form factor 1.000</text>
      <text x="305" y="118" fontSize="9" textAnchor="middle" className="fill-muted">form factor 1.155</text>
      <text x="8" y="142" fontSize="9" className="fill-muted">88V (average, ×1.111):</text>
      <text x="65" y="156" fontSize="10" textAnchor="middle" className="fill-foreground">correct</text>
      <text x="185" y="156" fontSize="10" textAnchor="middle" className="fill-accent">≈ 11% high</text>
      <text x="305" y="156" fontSize="10" textAnchor="middle" className="fill-accent">≈ 4% low</text>
      <text x="8" y="176" fontSize="9" className="fill-muted">87V (True RMS):</text>
      <text x="65" y="186" fontSize="10" textAnchor="middle" className="fill-foreground">correct</text>
      <text x="185" y="186" fontSize="10" textAnchor="middle" className="fill-foreground">correct</text>
      <text x="305" y="186" fontSize="10" textAnchor="middle" className="fill-foreground">correct</text>
    </svg>
  );
}

/** One injector pulse train: the 88V reads the low-time width in ms directly; the 87V gives Hz and % to compute it. */
function PulseWidthDiagram() {
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a fuel injector control signal sits at battery voltage and is pulled low for each injection pulse. The 88V displays the pulse width in milliseconds directly; on the 87V you read frequency and duty cycle and calculate the width."
    >
      <path
        d="M14 40 H70 V110 H96 V40 H190 V110 H216 V40 H310 V110 H336 V40 H350"
        className="fill-none stroke-accent"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text x="14" y="30" fontSize="9" className="fill-muted">≈12 V (injector off)</text>
      <text x="100" y="124" fontSize="9" className="fill-muted">driver pulls low: injector open</text>
      <path d="M190 128 H216" className="stroke-foreground" strokeWidth="1.2" />
      <path d="M190 124 V132 M216 124 V132" className="stroke-foreground" strokeWidth="1.2" />
      <text x="203" y="144" fontSize="9.5" textAnchor="middle" className="fill-foreground">pulse width</text>
      <path d="M70 18 H190" className="stroke-muted" strokeWidth="1" />
      <path d="M70 14 V22 M190 14 V22" className="stroke-muted" strokeWidth="1" />
      <text x="130" y="12" fontSize="9" textAnchor="middle" className="fill-muted">one period (1 ÷ frequency)</text>
      <text x="14" y="162" fontSize="9.5" className="fill-accent">88V: reads ms directly</text>
      <text x="196" y="162" fontSize="9.5" className="fill-foreground">87V: (duty% ÷ 100) ÷ Hz</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 88V vs Fluke 87V: Which Multimeter Is Better?",
  path,
  published: "2026-10-27",
  updated: "2026-10-28",
  intro:
    "The Fluke 88V and Fluke 87V share a body, a 1000 V CAT III / 600 V CAT IV rating, a 19,999-count high-resolution mode, 250 µs peak capture and a lifetime warranty. They split on two things. The 88V adds car-specific readings: millisecond pulse width for fuel injectors and RPM through an inductive pickup. The 87V is True RMS with a low-pass filter for motor drives, while Fluke's own 88V manual says its AC conversion is average responding. So the better meter depends on whether your day is spent under a hood or in front of a drive cabinet.",
  a: {
    pick: all.find((p) => p.name === "Fluke 88V")!,
    imageAlt: "Fluke 88V automotive digital multimeter, front view",
    chooseIf: [
      "You diagnose engines and want injector pulse width shown in milliseconds, not worked out on paper",
      "You want RPM from an inductive pickup (Fluke's RPM80) on the same meter you use for sensors",
      "Your AC readings are mostly clean sine waves, or you rarely measure AC at all",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "You measure AC on drives, inverters, LED drivers or switch-mode supplies where waveforms aren't sine",
      "You want the low-pass filter for readings on the motor side of a variable-frequency drive",
      "You value tighter DC accuracy, ±(0.05% + 1) against the 88V's ±(0.1% + 1)",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Average responding, rms indicating", b: "True RMS" },
    { label: "Display", a: "6,000 counts; 19,999 in HiRes", b: "6,000 counts; 19,999 in HiRes" },
    { label: "Bar graph", a: "33 segments, 40 updates/s", b: "32 segments, 40 updates/s" },
    { label: "DC volts accuracy", a: "±(0.1% + 1)", b: "±(0.05% + 1)" },
    { label: "AC volts, 50/60 Hz", a: "±(0.5% + 2), sine only", b: "±(0.7% + 2), True RMS" },
    { label: "Low-pass (drive) filter", a: "Not listed", b: "Yes, 3 dB at 1 kHz" },
    { label: "Pulse width", a: "0.002 to 1999.9 ms, direct", b: "Calculated from Hz and duty %" },
    { label: "RPM", a: "30 to 12,000 RPM with RPM80 pickup", b: "Not listed" },
    { label: "Duty cycle / frequency", a: "0.0–99.9% / 200 kHz", b: "To 99.9% / 200 kHz" },
    { label: "Temperature", a: "-200 to 1090 °C (probe extra)", b: "-200 to 1090 °C (80BK in box)" },
    { label: "Peak capture", a: "250 µs Peak Min/Max", b: "250 µs Peak Capture" },
    { label: "Weight", a: "355 g (624 g in holster)", b: "355 g (624 g in holster)" },
    { label: "Warranty", a: "Lifetime limited", b: "Lifetime limited" },
  ],
  differences: [
    "AC method: Fluke's 88V manual states its AC conversions are average responding, rms indicating. The 87V is True RMS, so it stays accurate on distorted waveforms where the 88V drifts.",
    "Automotive functions: the 88V shows pulse width directly from 0.002 ms to 1999.9 ms and reads RPM with Fluke's RPM80 inductive pickup. The 87V has neither; Fluke's 80 Series V manual has you calculate pulse width from frequency and duty cycle.",
    "Drive work: only the 87V lists a low-pass filter (3 dB at 1 kHz) for readings on a variable-frequency drive's output.",
    "DC accuracy: the 87V's ±(0.05% + 1) is twice as tight as the 88V's ±(0.1% + 1). Both resolve fine steps in the 19,999-count HiRes mode.",
    "Shared: CAT III 1000V / CAT IV 600V, 10 A with 20 A for 30 seconds, 250 µs peak capture, temperature to 1090 °C, 50 MΩ, 9,999 µF, 200 kHz, same weight and a lifetime warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The short answer</h2>
        <InfoCards
          items={[
            { label: "Same chassis", desc: "Fluke 80 Series body, 355 g, 9V battery, lifetime warranty." },
            { label: "Same protection", desc: "1000 V CAT III and 600 V CAT IV on both." },
            { label: "88V adds", desc: "Direct ms pulse width and RPM with the RPM80 pickup." },
            { label: "87V adds", desc: "True RMS, a drive low-pass filter, and 0.05% DC accuracy." },
            { label: "Both have", desc: "HiRes 19,999 counts, 250 µs peak, duty cycle, temperature." },
            { label: "Verdict", desc: "Engine bay: 88V. Plant floor, drives, mixed AC: 87V." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two common assumptions about this pair are wrong. The 88V does have a high-resolution mode: its manual lists
          19,999 counts, the same as the 87V. And the 88V does measure temperature, over the same -200 °C to 1090 °C span.
          The real gaps are the AC conversion method and the dedicated car functions. The 87V carries our Hands-on Tested
          badge; the 88V does not, so everything we say about it comes from Fluke&apos;s documents, not our bench.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 88V vs 87V spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 88V", "Fluke 87V"]}
          rows={[
            ["AC conversion", "Average responding", "True RMS"],
            ["DC volts", "6 V to 1000 V, ±(0.1% + 1)", "To 1000 V, ±(0.05% + 1)"],
            ["DC millivolts", "600.0 mV, ±(0.3% + 1)", "10 µV best resolution"],
            ["AC volts", "±(0.5% + 2) at 50–60 Hz", "±(0.7% + 2)"],
            ["AC bandwidth listed", "To 5 kHz (1000 V: 2.5 kHz)", "Low-pass filter option at 1 kHz"],
            ["Microamps", "600.0 µA, 0.1 µA steps", "0.01 µA DC resolution"],
            ["Milliamps", "60.00 mA and 400.0 mA", "Not stated in our data"],
            ["Amps", "10 A; 20 A for 30 s", "10 A; 20 A for 30 s"],
            ["Resistance / capacitance", "50 MΩ / 9,999 µF", "50 MΩ / 9,999 µF"],
            ["Frequency, duty", "200 kHz, 0.0–99.9%", "200 kHz, to 99.9%"],
            ["Pulse width", "0.002–1999.9 ms, ±(0.002 ms + 3)", "No direct function"],
            ["RPM", "±2 RPM with RPM80 probe", "No"],
            ["Temperature", "-200 to 1090 °C, ±(1% + 10)", "-200 to 1090 °C"],
            ["Peak capture", "250 µs", "250 µs"],
            ["Input impedance", "10 MΩ", "Not stated in our data"],
            ["Battery", "9V, 400 h typical", "About 400 h"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Where a cell says &quot;Not stated in our data&quot; for the 87V, our verified spec notes don&apos;t carry
          that figure, so we don&apos;t guess one. Every 88V number comes from Fluke&apos;s 88V users
          manual tables.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, ±% of reading (plus 1 count). Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V", value: 0.05, display: "0.05% + 1", highlight: true },
                { label: "Fluke 88V", value: 0.1, display: "0.1% + 1" },
                { label: "88V DC mV", value: 0.3, display: "0.3% + 1" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Allowed error on a 120.0 V, 60 Hz sine (600.0 V range, 1 count = 0.1 V). On a clean sine the 88V&apos;s
                figure is actually tighter.
              </>
            }
          >
            <BarChart
              items={[
                { label: "88V, sine", value: 0.8, display: "±0.8 V", highlight: true },
                { label: "87V, sine", value: 1.04, display: "±1.0 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind the second chart: 0.5% of 120 V is 0.6 V, plus 2 counts of 0.1 V, gives ±0.8 V for the
          88V. The 87V&apos;s 0.7% of 120 V is 0.84 V, plus 0.2 V, gives about ±1.0 V. That&apos;s the catch with
          average-responding meters: their sine-wave spec looks great, and it only holds while the waveform really is a sine.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Average responding vs True RMS, in one picture</h2>
        <p className="text-muted leading-7 mb-4">
          An average-responding meter rectifies the AC signal, takes its average and multiplies by 1.111, the ratio
          between RMS and average for a pure sine. Fluke&apos;s wording for the 88V, &quot;average responding, rms
          indicating&quot;, describes exactly that. Feed it a waveform with a different shape and the fixed 1.111 factor is
          wrong. A True RMS meter like the 87V computes the heating-equivalent value of whatever shape arrives.
        </p>
        <Figure caption={<>Same peak, three shapes. Standard form-factor values; the percentages are the scaling error, before the meter&apos;s own accuracy spec.</>}>
          <AverageVsRmsDiagram />
        </Figure>
        <div className="mt-4">
          <Figure caption={<>Scaling error of an average-responding meter by waveform (standard values). True RMS: 0% on all three.</>}>
            <BarChart
              items={[
                { label: "Sine", value: 0.1, display: "0%" },
                { label: "Triangle", value: 3.8, display: "≈ -3.8%" },
                { label: "Square", value: 11.1, display: "≈ +11.1%", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          In a car this rarely bites, because most of what you measure is DC: battery, charging, reference voltages,
          sensor signals, voltage drop. It does bite on AC ripple from an alternator with a failed diode, on AC
          wheel-speed or crank sensors whose output isn&apos;t a clean sine, and anywhere you clamp into mains-powered
          shop equipment. In a plant it bites constantly: drives, inverters, LED drivers and switch-mode power supplies
          all distort voltage or current. That is the ground the 87V was built for, and the low-pass filter goes a step
          further by stripping a drive&apos;s switching edges out of the reading.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pulse width and RPM: what the 88V really adds</h2>
        <p className="text-muted leading-7 mb-4">
          A port fuel injector opens for a few milliseconds each time the engine control module grounds it. That
          on-time, the pulse width, is one of the first numbers a driveability tech checks when a car runs lean, rich or
          rough. The 88V reads it directly in milliseconds, from 0.002 ms up to 1999.9 ms, with a published accuracy of
          ±(0.002 ms + 3 counts). Fluke notes the usable span depends on the signal&apos;s frequency.
        </p>
        <Figure caption={<>Injector control signal: the 88V displays the low-time in ms; the 87V gives you the inputs to calculate it.</>}>
          <PulseWidthDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 87V can get there, just not directly. Fluke&apos;s 80 Series V manual tells you to read frequency, press
          the Hz button again for duty cycle, then calculate pulse width as duty cycle ÷ 100 ÷ frequency. Worked
          example, illustrative only: an injector firing at 20 Hz with a 6% duty cycle gives 0.06 ÷ 20 = 0.003 s, or
          3 ms. That&apos;s fine on a steady idle and tedious while you snap the throttle and watch the number move.
        </p>
        <p className="text-muted leading-7 mt-4">
          RPM is the other 88V-only function. The manual lists two RPM settings (30 to 9,000 RPM and 60 to 12,000 RPM,
          each ±2 RPM) using Fluke&apos;s RPM80 inductive probe clipped over a plug lead. Two cautions on the bundle:
          the 2006 manual describes the K-type thermocouple as included, while the current 88V listing we track says
          Fluke treats the inductive pickup and temperature probe as optional for the bare meter. Check what&apos;s in
          the box before you count on either. For a step-by-step injector check, see our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" className={link}>
            testing a fuel injector with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Automotive vs industrial: the job-by-job split</h2>
        <p className="text-muted leading-7 mb-4">
          Lay a typical week of car work next to a typical week of plant maintenance and the pattern is clear. The
          vehicle side is mostly DC and timing, where the 88V&apos;s extra functions save steps and its average-responding
          AC rarely matters. The plant side is AC from electronic sources, where the 87V&apos;s True RMS converter and
          filter decide whether the number on the screen can be trusted. The rows below use only functions and figures
          from the two Fluke documents cited on this page.
        </p>
        <DataTable
          head={["Job", "Setting", "Fluke 88V", "Fluke 87V", "Edge"]}
          rows={[
            ["Charging voltage, illustrative 14.40 V", "Automotive", "±0.024 V from ±(0.1% + 1)", "±0.017 V from ±(0.05% + 1)", "Tie in practice"],
            ["Starter or cranking voltage dip", "Automotive", "250 µs Peak Min/Max", "250 µs Peak Capture", "Tie"],
            ["Injector on-time", "Automotive", "Direct, 0.002–1999.9 ms", "Calculate from Hz and duty %", "88V"],
            ["Engine speed", "Automotive", "30–12,000 RPM with RPM80", "No RPM function", "88V"],
            ["Hybrid pack, orange cabling", "Automotive", "CAT IV 600V, 1000 V DC range", "CAT IV 600V, 1000 V DC range", "Tie"],
            ["Motor side of a VFD", "Industrial", "No filter listed", "Low-pass filter, 3 dB at 1 kHz", "87V"],
            ["Supply feeding LED drivers or SMPS", "Industrial", "Average responding", "True RMS", "87V"],
            ["Motor frame or bearing temperature", "Industrial", "−200 to 1090 °C, probe may be extra", "−200 to 1090 °C, 80BK in box", "Tie"],
            ["Contactor or relay transient", "Industrial", "250 µs peak", "250 µs peak", "Tie"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Rows in the table above each meter wins outright, by setting. Every other row is a tie.</>}>
            <BarChart
              items={[
                { label: "88V wins, automotive rows (of 5)", value: 2, display: "2 of 5", highlight: true },
                { label: "87V wins, automotive rows (of 5)", value: 0, display: "0 of 5" },
                { label: "88V wins, industrial rows (of 4)", value: 0, display: "0 of 4" },
                { label: "87V wins, industrial rows (of 4)", value: 2, display: "2 of 4", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Neither meter loses a row in its own setting, and each one&apos;s wins are rows the other can&apos;t fake. The
          87V can at least work out injector on-time with a calculator; the 88V has no way to filter a drive output or
          correct a distorted waveform. That asymmetry is why a technician who splits time between vehicles and a plant
          is usually better served by the 87V, while a full-time automotive tech gains real speed from the 88V. The
          charging-voltage row also shows the 87V&apos;s tighter DC spec is not a reason to pick it for cars: seven
          thousandths of a volt never decides a charging diagnosis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Independent auto technician", "Fluke 88V", "Direct injector ms and RPM; peak capture for cranking dips"],
            ["Hybrid and EV service", "Fluke 88V", "Same CAT IV 600V as the 87V plus the car functions"],
            ["Industrial maintenance", "Fluke 87V", "True RMS and the low-pass filter on drive outputs"],
            ["Solar and inverter work", "Fluke 87V", "Inverter waveforms aren't sine; average-responding drifts"],
            ["HVAC with VFD blowers", "Fluke 87V", "Drive filter plus temperature with the 80BK in the box"],
            ["Fleet shop doing both", "Fluke 87V, or both", "True RMS for shop power; the 88V on the vehicle side"],
            ["Electronics bench", "Fluke 87V", "Tighter DC accuracy and finer µA resolution"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you&apos;re choosing between several automotive meters rather than just these two, our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          ranking puts the 88V against budget engine analyzers. For a building electrician weighing the 87V, the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison is the closer match, and logging buyers should read{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where each one falls short</h2>
        <ul className="space-y-3 text-muted leading-7">
          <li>
            <span className="text-foreground font-medium">88V on distorted AC.</span> Square-ish and spiky waveforms read
            wrong by a margin bigger than any accuracy spec. On a plant floor that&apos;s a daily risk, not an edge case.
          </li>
          <li>
            <span className="text-foreground font-medium">88V on drive outputs.</span> No low-pass filter is listed, so the
            motor side of a VFD is outside what it&apos;s made for.
          </li>
          <li>
            <span className="text-foreground font-medium">87V on engine timing.</span> No RPM and no direct pulse width.
            You can compute injector on-time, but a tach reading needs another tool.
          </li>
          <li>
            <span className="text-foreground font-medium">Neither logs.</span> Both capture min, max, average and 250 µs
            peaks on screen, but neither stores readings over time. For that, look at the Fluke 289 in our{" "}
            <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
              Fluke 289 vs Fluke 287
            </Link>{" "}
            comparison.
          </li>
        </ul>
        <div className="mt-4">
          <KeyIdea title="Same peak capture, different targets">
            Both meters catch an event as short as 250 µs in peak mode, and their normal Min/Max response on DC is about
            100 ms per the 88V manual. On a car, peak mode catches a starter&apos;s voltage dip or an ignition spike on a
            supply line. On a drive or contactor circuit the same feature catches a switching transient. The capability
            is identical; what changes is how you interpret the AC numbers around it.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety: hybrid packs and drive cabinets are not 12 V work">
        Both meters are rated CAT III 1000V and CAT IV 600V, but a rating only protects you with matching leads and the
        right procedure. On hybrid and electric vehicles, follow the maker&apos;s high-voltage disable steps and wear
        rated gloves before probing orange cables. On drives, measure without the low-pass filter first: Fluke warns the
        filter can hide voltage that&apos;s really present. Never use RPM or pulse-width modes to decide whether a circuit
        is live. For low-voltage car checks, start with our guide to{" "}
        <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
          checking voltage drop on a car
        </Link>
        .
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 88V if most of your measurements happen on vehicles: direct millisecond pulse width and RPM save real time, and you keep the 87V's safety rating, HiRes mode, peak capture and lifetime warranty. Buy the Fluke 87V if you measure AC on drives, inverters or electronic loads, because its True RMS converter and low-pass filter stay accurate where the average-responding 88V drifts.",
  faqs: [
    {
      question: "Is the Fluke 88V True RMS?",
      answer:
        "No. Fluke's 88V users manual says its AC conversions are ac coupled and average responding, rms indicating. That means it reads a clean sine wave accurately but drifts on distorted waveforms, by about 11% high on a square wave. For automotive DC work this rarely matters. For drives, inverters and LED drivers, the True RMS Fluke 87V is the safer choice.",
    },
    {
      question: "Does the Fluke 87V measure injector pulse width?",
      answer:
        "Not directly. The 87V reads frequency and duty cycle, and Fluke's 80 Series V manual shows how to calculate pulse width from them: duty cycle divided by 100, divided by frequency. The 88V displays pulse width in milliseconds from 0.002 ms to 1999.9 ms, which is quicker when the value changes as you work the throttle.",
    },
    {
      question: "Does the Fluke 88V have a high-resolution mode like the 87V?",
      answer:
        "Yes. The 88V manual lists a 6,000-count display that switches to 19,999 counts in high-resolution mode, the same count as the 87V. The difference lies elsewhere: the 87V's DC accuracy is ±(0.05% + 1) against the 88V's ±(0.1% + 1), so the 87V's extra digits are backed by a tighter specification.",
    },
    {
      question: "Can the Fluke 88V measure temperature?",
      answer:
        "Yes, from -200 °C to 1090 °C with a K-type thermocouple, at ±(1% + 10) excluding the probe, per Fluke's manual. The manual calls the thermocouple included and rates it to 260 °C, but the current listing we track says Fluke treats the probe as optional for the bare 88V. Check the box contents when you buy.",
    },
    {
      question: "Is the Fluke 88V safe for hybrid vehicles?",
      answer:
        "Its rating is the same as the 87V's: 1000 V CAT III and 600 V CAT IV, with a 1000 V DC range. That covers hybrid high-voltage systems on paper. Safety still depends on rated leads, insulated gloves and the vehicle maker's disable procedure before you touch orange cabling. The meter's rating is only one layer of protection.",
    },
    {
      question: "Can the Fluke 88V be used for industrial work?",
      answer:
        "For DC controls, resistance, temperature and clean sine-wave mains, yes: it shares the 87V's CAT III 1000V / CAT IV 600V rating, 10 A input and 250 µs peak capture. It is a poor fit for drive outputs, inverters and electronic loads, because Fluke's manual says its AC is average responding and lists no low-pass filter. For that industrial work, the 87V is the right meter.",
    },
    {
      question: "Which is better for an all-round technician, the 88V or 87V?",
      answer:
        "For a technician who splits time between vehicles and building or plant equipment, the 87V is the safer all-rounder, because True RMS and the drive filter matter on shop power and the 87V still covers duty cycle, peak capture and temperature for cars. Choose the 88V if engine diagnosis is most of the job and RPM matters.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 88V vs Fluke 117 for automotive", href: "/multimeters/fluke-88v-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Best multimeter for automotive", href: "/multimeters/best-multimeter-for-automotive" },
    { label: "How to test a fuel injector", href: "/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" },
  ],
};

export default function Fluke88VVsFluke87VPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
