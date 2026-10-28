// Specs per Fluke, checked 2026-10-28:
// - Fluke 27 II product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-27-ii
//   DC V 0.1 mV to 1000 V, 0.1% + 1; AC V 0.1 mV to 1000 V, 0.5% + 3; AC bandwidth 40 Hz to 30 kHz; DC A 0.2% + 4 and
//   AC A 1.5% + 2, 0.1 µA to 10 A (20 A for 30 s); resistance 0.1 Ω to 50 MΩ, capacitance 1 nF to 9999 µF, frequency
//   0.5 Hz to 199.99 kHz (accuracy not listed for these three); 6000 counts; bar graph; backlight; hold; relative;
//   Min/Max/Avg; continuity and diode; IP67; 3 m (10 ft) drop; MSHA approved; -15 to +55 °C, -40 °C for up to 20 min;
//   95% humidity; 3 x AA, 800 h; 6.35 x 10.0 x 19.81 cm and 698.5 g with holster; limited lifetime warranty; includes
//   holster, test leads, alligator clips. The page links the model as "27II AVG Multimeter" and doesn't state RMS type,
//   temperature, low-pass filter, peak capture or a hi-res mode.
// - Official Amazon listing B002X9IPB2 ("Fluke 27II AVG Multimeter", bullet "AVG multimeter"): average responding.
// - Fluke 28 II product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-28-ii
//   True RMS AC V and A; DC V 0.05% + 1; AC V 0.7% + 4; AC bandwidth 15 Hz to 20 kHz; DC A 0.2% + 4; AC A 1.0% + 2,
//   0.1 µA to 10 A; resistance, capacitance and frequency ranges as the 27 II (accuracy not listed); 6000 counts with a
//   20,000-count high-resolution mode; low-pass filter for variable speed drives; 250 µs peak capture; temperature
//   -200 to +1090 °C with 80BK-A type-K probe included; two-level backlight and backlit keypad; IP67; 3 m drop with
//   holster; MSHA approved; same operating temperature, battery, size, weight and warranty as the 27 II; withstands
//   8,000 V spikes; includes TL75 leads, AC175 clips, 80BK-A. Its related-products block labels the 27 II "AVG
//   Multimeter" and the 28 II "True-rms". LoZ not listed for either.
// Average-responding scaling (rectified average x 1.111, the sine form factor) and the square, triangle and pulse
// results below are standard textbook arithmetic on idealized waveforms, hedged on the page as illustrative.
// Picks: Fluke 27 II (4.4) and Fluke 28 II (4.6) in src/lib/multimeter-catalog.ts; neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-27-ii-vs-fluke-28-ii";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 27 II vs 28 II: Differences Explained",
  description:
    "Fluke 27 II vs 28 II differences: one IP67, MSHA-approved body, but only the 28 II adds True RMS, a VFD filter, temperature and peak capture. Specs and verdict.",
  image: all.find((p) => p.name === "Fluke 28 II")!.image,
  path: "/multimeters/fluke-27-ii-vs-fluke-28-ii",
});

const link = "text-accent hover:underline";

/**
 * Three idealized waveforms with the same true RMS value, and what an average-responding meter
 * (rectified average x 1.111) would display for each.
 */
function WaveformErrorDiagram() {
  const panels = [
    { title: "Sine", d: "M0 30 C10 0, 20 0, 30 30 S50 60, 60 30 S80 0, 90 30 S110 60, 120 30", shown: "100 V", note: "matches" },
    { title: "Square", d: "M0 30 V8 H30 V52 H60 V8 H90 V52 H120 V30", shown: "111 V", note: "11% high" },
    { title: "Narrow pulses (25% on)", d: "M0 30 H11.25 V0 H18.75 V30 H41.25 V60 H48.75 V30 H71.25 V0 H78.75 V30 H101.25 V60 H108.75 V30 H120", shown: "56 V", note: "44% low" },
  ];
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Three waveforms that all have a true RMS value of 100 volts: on a sine an average-responding meter shows 100 V, on a square wave it shows 111 V, and on narrow pulses it shows about 56 V, while a True RMS meter shows 100 V on all three"
    >
      {panels.map((p, i) => {
        const x = 8 + i * 118;
        return (
          <g key={p.title}>
            <rect x={x} y="6" width="108" height="158" rx="8" className="fill-surface stroke-border" strokeWidth="1" />
            <text x={x + 54} y="22" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
              {p.title}
            </text>
            <line x1={x + 6} x2={x + 102} y1="62" y2="62" className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
            <g transform={`translate(${x + 6} 32) scale(0.8 1)`}>
              <path d={p.d} className="fill-none stroke-accent" strokeWidth="2" strokeLinejoin="round" />
            </g>
            <text x={x + 54} y="112" fontSize="9" textAnchor="middle" className="fill-muted">
              True RMS (28 II): 100 V
            </text>
            <text x={x + 54} y="130" fontSize="9" textAnchor="middle" className="fill-muted">
              Average resp. (27 II):
            </text>
            <text x={x + 54} y="148" fontSize="12" fontWeight="700" textAnchor="middle" className={i === 0 ? "fill-foreground" : "fill-accent"}>
              {p.shown}
            </text>
            <text x={x + 54} y="160" fontSize="8.5" textAnchor="middle" className="fill-muted">
              {p.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 27 II vs Fluke 28 II: Differences Explained",
  path,
  published: "2026-10-28",
  intro:
    "The Fluke 27 II and 28 II share one physical meter: the same IP67 case, 3 m drop rating, MSHA approval, −15 to +55 °C operating range, three AA cells for about 800 hours, 698.5 g holstered weight, CAT IV 600V / CAT III 1000V rating and limited lifetime warranty. The difference is inside. The 28 II measures AC as True RMS and adds a low-pass filter for motor drives, a −200 to +1090 °C temperature input with a probe in the box, 250 µs peak capture, a 20,000-count high-resolution mode and tighter DC volts. The 27 II is average responding, so it is only accurate on clean sine waves.",
  a: {
    pick: all.find((p) => p.name === "Fluke 28 II")!,
    imageAlt: "Fluke 28 II rugged IP67 True RMS multimeter in its rubber holster, front view",
    chooseIf: [
      "You measure anything fed by a drive, inverter, LED driver or switch-mode supply, where AC is not a clean sine",
      "You want temperature on the same meter, with the 80BK-A type-K probe included",
      "You want a high-resolution mode, peak capture or tighter DC volts for calibration-style checks",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 27 II")!,
    imageAlt: "Fluke 27 II rugged IP67 average-responding multimeter in its rubber holster, front view",
    chooseIf: [
      "Your AC work is utility-fed, linear loads: resistance heaters, incandescent lighting, induction motors run straight off line power",
      "Most of your readings are DC, resistance and continuity, where averaging doesn't apply",
      "You want the sealed, drop-rated, MSHA-approved body and have no use for temperature or a drive filter",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "True RMS", b: "Average responding (\"AVG\")" },
    { label: "DC volts accuracy", a: "0.05% + 1", b: "0.1% + 1" },
    { label: "AC volts accuracy", a: "0.7% + 4", b: "0.5% + 3" },
    { label: "AC bandwidth", a: "15 Hz to 20 kHz", b: "40 Hz to 30 kHz" },
    { label: "DC amps / AC amps", a: "0.2% + 4 / 1.0% + 2", b: "0.2% + 4 / 1.5% + 2" },
    { label: "Display", a: "6000 counts; 20,000-count hi-res mode", b: "6000 counts" },
    { label: "Low-pass (VFD) filter", a: "Yes", b: "Not listed" },
    { label: "Peak capture", a: "250 µs", b: "Not listed" },
    { label: "Temperature", a: "−200 to +1090 °C, 80BK-A probe included", b: "Not listed" },
    { label: "Backlit keypad", a: "Yes, plus two-level backlight", b: "Backlight listed; keypad not stated" },
    { label: "IP / drop / MSHA", a: "IP67 / 3 m / approved", b: "IP67 / 3 m / approved" },
    { label: "Battery", a: "3 × AA, 800 h", b: "3 × AA, 800 h" },
    { label: "Size / weight, holstered", a: "6.35 × 10.0 × 19.81 cm, 698.5 g", b: "6.35 × 10.0 × 19.81 cm, 698.5 g" },
    { label: "Warranty", a: "Limited lifetime", b: "Limited lifetime" },
  ],
  differences: [
    "AC conversion: the 28 II is True RMS on AC volts and amps. The 27 II is sold as the \"AVG\" model, an average-responding meter calibrated for sine waves.",
    "Drive work: only the 28 II lists a low-pass filter for variable speed drives and 250 µs peak capture.",
    "Temperature: the 28 II reads −200 to +1090 °C and ships with the 80BK-A probe. Fluke lists no temperature function for the 27 II.",
    "Resolution and DC accuracy: the 28 II adds a 20,000-count mode and halves the DC volts percentage, 0.05% against 0.1%.",
    "On a clean sine, the 27 II's published AC volts line is tighter, 0.5% + 3 against 0.7% + 4, and its bandwidth runs higher, to 30 kHz.",
    "Identical: case, IP67, 3 m drop, MSHA approval, cold rating, battery, weight, current span to 10 A, resistance, capacitance and frequency ranges, CAT ratings and warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">One body, two measuring engines</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke built these two as a pair. Its product pages print the same holstered dimensions, the same 698.5 g, the
          same IP67 seal and the same 10 ft drop test for both, and the 28 II page links its sibling as the &quot;AVG
          Multimeter&quot; next to its own &quot;True-rms&quot; label. So the buying decision isn&apos;t about toughness
          at all. It comes down to the kind of AC you measure and whether you want the 28 II&apos;s extra functions.
        </p>
        <InfoCards
          items={[
            { label: "Shared armor", desc: "IP67, 3 m drop, MSHA approval and the same cold rating on both." },
            { label: "28 II: True RMS", desc: "Correct AC readings on distorted waveforms from drives and electronics." },
            { label: "28 II: drive tools", desc: "Low-pass filter and 250 µs peak capture for VFD troubleshooting." },
            { label: "28 II: temperature", desc: "Type-K input to +1090 °C, with the 80BK-A probe in the box." },
            { label: "27 II: sine-wave AC", desc: "Average responding, so readings drift once the waveform distorts." },
            { label: "27 II: wider AC band", desc: "40 Hz to 30 kHz, against 15 Hz to 20 kHz on the 28 II." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We haven&apos;t hands-on tested either model. The scores on this page (4.6 for the 28 II, 4.4 for the 27 II)
          come from desk research, and every number below is taken from Fluke&apos;s two product pages or the official
          Amazon listings. When Fluke leaves a line blank, so do we.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 27 II vs 28 II spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 28 II", "Fluke 27 II", "Difference"]}
          rows={[
            ["AC conversion", "True RMS", "Average responding", "28 II"],
            ["DC volts", "0.1 mV to 1000 V, 0.05% + 1", "0.1 mV to 1000 V, 0.1% + 1", "28 II"],
            ["AC volts", "0.1 mV to 1000 V, 0.7% + 4", "0.1 mV to 1000 V, 0.5% + 3", "27 II on sine only"],
            ["AC bandwidth", "15 Hz to 20 kHz", "40 Hz to 30 kHz", "Depends on job"],
            ["DC amps", "0.1 µA to 10 A, 0.2% + 4", "0.1 µA to 10 A, 0.2% + 4", "Same"],
            ["AC amps", "1.0% + 2", "1.5% + 2", "28 II"],
            ["Overload", "20 A for 30 s", "20 A for 30 s", "Same"],
            ["Resistance range", "0.1 Ω to 50 MΩ", "0.1 Ω to 50 MΩ", "Same"],
            ["Capacitance range", "1 nF to 9999 µF", "1 nF to 9999 µF", "Same"],
            ["Frequency range", "0.5 Hz to 199.99 kHz", "0.5 Hz to 199.99 kHz", "Same"],
            ["Counts", "6000; 20,000 hi-res", "6000", "28 II"],
            ["Low-pass filter", "Yes", "Not listed", "28 II"],
            ["Peak capture", "250 µs", "Not listed", "28 II"],
            ["Temperature", "−200 to +1090 °C", "Not listed", "28 II"],
            ["Min/Max/Avg, hold, relative", "Yes", "Yes", "Same"],
            ["IP rating / drop", "IP67 / 3 m", "IP67 / 3 m", "Same"],
            ["MSHA", "Approved", "Approved", "Same"],
            ["Operating range", "−15 to +55 °C; −40 °C for 20 min", "−15 to +55 °C; −40 °C for 20 min", "Same"],
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["Battery", "3 × AA, 800 h", "3 × AA, 800 h", "Same"],
            ["In the box", "TL75 leads, AC175 clips, 80BK-A", "Holster, test leads, clips", "28 II adds probe"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>DC volts error band on a 24.00 V reading, worked from each meter&apos;s accuracy line. Smaller is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 28 II", value: 0.022, display: "±0.022 V", highlight: true },
                { label: "Fluke 27 II", value: 0.034, display: "±0.034 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>AC volts error band on a clean 120.0 V sine, from the same lines. Here the 27 II wins on paper.</>}>
            <BarChart
              items={[
                { label: "Fluke 27 II", value: 0.9, display: "±0.9 V", highlight: true },
                { label: "Fluke 28 II", value: 1.24, display: "±1.24 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind those bars assumes the ranges a 6000-count meter normally uses: a 60.00 V range for 24 V
          (one count is 0.01 V) and a 600.0 V range for 120 V (one count is 0.1 V). For 24 V DC, the 28 II allows 0.05%
          of 24 (0.012 V) plus one count, so about ±0.022 V; the 27 II allows 0.1% (0.024 V) plus one count, about
          ±0.034 V. For a 120 V sine, the 27 II allows 0.5% (0.6 V) plus three counts (0.3 V), about ±0.9 V, while the
          28 II allows 0.7% (0.84 V) plus four counts, about ±1.24 V. Fluke&apos;s pages don&apos;t print the range table
          or the frequency band each accuracy line applies to, so treat these as illustrative.
        </p>
        <div className="mt-4">
          <Figure caption={<>AC bandwidth as printed by Fluke. The 28 II reaches lower; the 27 II reaches higher.</>}>
            <BarChart
              log
              items={[
                { label: "28 II low end", value: 15, display: "15 Hz", highlight: true },
                { label: "27 II low end", value: 40, display: "40 Hz" },
                { label: "28 II high end", value: 20_000, display: "20 kHz", highlight: true },
                { label: "27 II high end", value: 30_000, display: "30 kHz" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why average responding goes wrong on distorted AC</h2>
        <p className="text-muted leading-7 mb-4">
          An average-responding meter rectifies the AC, takes the average, and multiplies by about 1.111, which is the
          ratio between RMS and average for a pure sine. That shortcut is exact on a sine and only on a sine. Feed it a
          different shape and the multiplier is wrong for that shape. A True RMS meter computes the heating-equivalent
          value directly, so it doesn&apos;t care what the waveform looks like, within its crest-factor and bandwidth
          limits.
        </p>
        <Figure caption={<>Illustrative, idealized waveforms, each with a true RMS value of 100 V. Textbook arithmetic, not a measurement.</>}>
          <WaveformErrorDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The numbers come from simple ratios. A square wave of 100 V peak has an RMS of 100 V and an average of 100 V,
          so the meter shows 100 × 1.111 = 111 V. A pulse train that is on for a quarter of the time, scaled to 100 V
          RMS, has an average one-half of its RMS (the square root of 0.25), so the meter shows 0.5 × 1.111 × 100, about
          56 V. The narrow-pulse case is the one that bites in the field: the current drawn by rectifier front ends in
          drives, computers and LED drivers arrives in short, tall peaks, so an average-responding meter tends to read
          that current low.
        </p>
        <DataTable
          head={["Circuit you are measuring", "Typical AC shape", "27 II", "28 II"]}
          rows={[
            ["Utility outlet or panel voltage", "Close to sine", "Fine", "Fine"],
            ["Resistive heater current", "Follows the voltage", "Fine", "Fine"],
            ["VFD output to a motor", "Switched pulses", "Unreliable", "Use low-pass filter"],
            ["Current into a drive, PC or LED driver", "Peaky pulses", "Likely reads low", "Correct within spec"],
            ["UPS or inverter output", "Varies by design", "Check with True RMS", "Correct within spec"],
            ["DC supplies, batteries, sensors", "DC", "Fine", "Fine"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a longer explainer and cheaper True RMS options, see our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The 28 II&apos;s extra tools, in practice</h2>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground font-medium">Low-pass filter.</span> On the output side of a variable speed
          drive, the voltage is a train of fast switched pulses. The filter strips the high-frequency switching content
          so the 28 II reads something close to the voltage the motor actually responds to. The 27 II lists no filter,
          and its higher 30 kHz bandwidth would let more of that switching noise into the reading.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground font-medium">Peak capture.</span> At 250 µs, the 28 II can hold short
          spikes and dips that a normal Min/Max would average away, which helps when a contactor or a motor start
          drags a supply down for a moment.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground font-medium">Temperature.</span> With the included 80BK-A bead probe, the 28
          II covers bearing, enclosure and pipe checks without a second tool. The meter&apos;s range is −200 to +1090 °C;
          the probe you plug in sets the practical limit.
        </p>
        <p className="text-muted leading-7">
          <span className="text-foreground font-medium">High resolution.</span> The 20,000-count mode adds a digit for
          slow-changing readings such as sensor voltages, and the backlit keypad helps in a dark vault or mine heading.
        </p>
        <div className="mt-4">
          <KeyIdea title="The only question that matters">
            Ask whether any AC you measure comes from, or feeds, power electronics. If the honest answer is &quot;yes,
            sometimes&quot;, the 28 II is the meter. If your AC is line-fed and linear and most of your work is DC,
            ohms and continuity, the 27 II gives you the identical sealed, MSHA-approved body without paying for
            functions you won&apos;t use.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 27 II vs 28 II: which should you buy?</h2>
        <DataTable
          head={["Your work", "Buy", "Reason"]}
          rows={[
            ["Mine electrician with conveyor drives", "Fluke 28 II", "MSHA on both, but drives need True RMS and the filter"],
            ["Mine or quarry mechanic, mostly DC and continuity", "Fluke 27 II", "Same sealed body; averaging doesn't affect DC"],
            ["Water or wastewater pump stations with VFDs", "Fluke 28 II", "Filter and True RMS on drive outputs"],
            ["Outdoor lighting and utility-fed heaters", "Either", "Close-to-sine AC; the 27 II's AC line is tighter"],
            ["HVAC or refrigeration in wet plant rooms", "Fluke 28 II", "Temperature input and probe included"],
            ["Agricultural or fleet equipment, 12/24 V DC", "Fluke 27 II", "DC work, IP67 body, lower model in the pair"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the sealed case matters but you also want the most complete published spec, compare the 28 II with its
          closest rival in{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v-max" className={link}>
            Fluke 28 II vs Fluke 87V MAX
          </Link>
          , or weigh the rugged average-responding model against an industrial True RMS meter in{" "}
          <Link href="/multimeters/fluke-27-ii-vs-fluke-87v-max" className={link}>
            Fluke 27 II vs Fluke 87V MAX
          </Link>
          . For dry plant floors, our{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v" className={link}>
            Fluke 28 II vs Fluke 87V
          </Link>{" "}
          page covers the meter we have tested ourselves.
        </p>
      </section>

      <Callout title="Safety: a wrong AC reading is a safety problem, not only an accuracy problem">
        An average-responding meter can understate current on a circuit feeding electronic loads, which can hide an
        overloaded conductor or neutral. When the load is a drive, UPS or bank of LED drivers, confirm current with a
        True RMS instrument before deciding a circuit is within its rating. Both meters are CAT IV 600V / CAT III
        1000V; use leads with a matching rating, verify the meter on a known live source before and after proving a
        circuit dead, and follow your site&apos;s lockout/tagout and arc-flash rules. IP67 keeps water out of the
        meter, not off your hands or probes. If the work is beyond your training, call a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 27 II and 28 II are the same rugged meter outside: IP67, a 3 m drop rating, MSHA approval, 800 hours on three AAs and a lifetime warranty. Buy the 28 II if any of your AC involves drives, inverters or electronic loads, or if you want temperature, peak capture and a hi-res mode. Buy the 27 II only if your AC is clean line power and most of your readings are DC, resistance and continuity.",
  faqs: [
    {
      question: "Is the Fluke 27 II True RMS?",
      answer:
        "No. Fluke's Amazon listing calls it the 27II AVG multimeter, and Fluke's own 28 II page labels the 27 II as the AVG model next to the True RMS 28 II. Average responding is accurate on clean sine waves but drifts on distorted waveforms such as drive outputs or the current drawn by electronic loads.",
    },
    {
      question: "Do the Fluke 27 II and 28 II have the same case?",
      answer:
        "Yes. Fluke lists both at 6.35 × 10.0 × 19.81 cm and 698.5 g with the holster, both IP67 and both tested for a 3 m (10 ft) drop. Both are MSHA approved, rated −15 to +55 °C with 20-minute excursions to −40 °C, and run about 800 hours on three AA cells.",
    },
    {
      question: "Can the Fluke 27 II measure temperature?",
      answer:
        "Fluke doesn't list a temperature function for the 27 II, and none of its included accessories is a probe. The 28 II reads −200 to +1090 °C and ships with the 80BK-A type-K bead probe, so if you need temperature in a sealed meter, the 28 II is the one to buy.",
    },
    {
      question: "Can I use the Fluke 27 II on a VFD?",
      answer:
        "Not for reliable output readings. A drive's output is a switched pulse train, and an average-responding meter without a low-pass filter can read it well off. The 28 II is True RMS and lists a low-pass filter for variable speed drives. On the drive's line-side voltage, a clean sine, the 27 II is fine.",
    },
    {
      question: "Why is the 27 II's AC volts accuracy better than the 28 II's?",
      answer:
        "On paper it is: 0.5% + 3 against 0.7% + 4. That figure only holds for a sine wave, because an average-responding meter is calibrated assuming that shape. On distorted AC its real error can be far larger than any published line, while the 28 II's True RMS reading stays within its spec.",
    },
    {
      question: "Are both the Fluke 27 II and 28 II MSHA approved?",
      answer:
        "Yes, Fluke lists MSHA approval on both product pages. Neither is intrinsically safe for explosive atmospheres; Fluke sells a separate 28 II EX for classified areas. Check with your mine's safety department which approvals your site's electrical program requires before you buy.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 27 II vs Fluke 87V MAX", href: "/multimeters/fluke-27-ii-vs-fluke-87v-max" },
    { label: "Fluke 28 II vs Fluke 87V MAX", href: "/multimeters/fluke-28-ii-vs-fluke-87v-max" },
    { label: "Fluke 28 II vs Fluke 87V", href: "/multimeters/fluke-28-ii-vs-fluke-87v" },
    { label: "Best budget True RMS multimeters", href: "/multimeters/best-true-rms-multimeters-under-100" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke27IiVsFluke28IiPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
