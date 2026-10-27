// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
// - Fluke 15B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus
// - 15B+/17B+/18B+ Users Manual: https://media.fluke.com/f8ca9de4-481a-4125-8a46-b2d9006f431f_original%20file.pdf
//   (one-year warranty; auto power off after 20 min; backlight off after 2 min; continuity beeps below 70 Ω;
//   relative mode "17B+ only", not available on frequency, resistance, continuity, duty cycle or diode;
//   MIN MAX "17B+ only", not available on resistance, capacitance, frequency, duty cycle or diode;
//   hazardous-voltage LED at 30 V or OL, 17B+ only; temperature 17B+ only)
// Fixed 2026-10-26: the old page said relative mode zeroes lead resistance, but the manual excludes resistance.
// Re-checked 2026-10-27 on the en-us 15B+ and 17B+ pages above: neither page states a warranty term (only "30-day
// Returns" in the purchase box), so the users manual's one-year warranty stands for BOTH meters. 17B+ temperature
// 0.1 °C resolution: -55-0 °C ±(9% + 2 °C), 0-50 °C ±2 °C, 50-400 °C ±(2% + 1 °C); Type-K probe included, model not
// named. Frequency ranges 50.00 Hz/500.0 Hz/5.000 kHz/50.00 kHz/100.0 kHz, ±(0.1% + 3). Duty cycle 1-99%, 0.1%
// resolution, 1% typical "at 50 or 60 Hz, 10% to 90% duty". AC current 40-400 Hz and AC volts 40-500 Hz on both.
// 15B+ in the box: TL75 leads, 2 AA. 17B+ in the box: TL75 leads, Type-K probe, 2 AA.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-15b-plus";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 15B+: Which Should You Buy?",
  description:
    "Fluke 15B+ vs Fluke 17B+ for budget buyers: same case, accuracy and one-year warranty; the 17B+ adds temperature, Hz, duty cycle and MIN MAX. Decision chart.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus",
});

const link = "text-accent hover:underline";

/** MIN MAX on the 17B+: a brief sag that a live display would miss is held as the MIN value. */
function MinMaxDiagram() {
  const pts: [number, number][] = [
    [30, 50], [70, 52], [110, 49], [140, 51], [150, 108], [158, 104], [168, 53], [210, 50], [250, 48], [290, 51], [320, 50],
  ];
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative supply voltage trace that holds near 12 volts but dips briefly to about 9.6 volts; the 17B+ MIN MAX mode stores that minimum, while a plain live reading on the 15B+ has already returned to 12 volts"
    >
      <line x1="30" x2="320" y1="130" y2="130" className="stroke-border" strokeWidth="1" />
      <text x="26" y="54" fontSize="9" textAnchor="end" className="fill-muted">12 V</text>
      <text x="26" y="111" fontSize="9" textAnchor="end" className="fill-muted">9.6 V</text>
      <line x1="30" x2="320" y1="108" y2="108" className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
      <path d={d} className="stroke-accent fill-none" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="150" cy="108" r="5" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <text x="160" y="124" fontSize="9" className="fill-foreground">MIN held: 9.6 V</text>
      <text x="320" y="40" fontSize="9" textAnchor="end" className="fill-muted">live reading now: 12.0 V</text>
      <text x="175" y="146" fontSize="9" textAnchor="middle" className="fill-muted">time (motor start, relay pull-in, etc.)</text>
      <text x="175" y="162" fontSize="9" textAnchor="middle" className="fill-accent">17B+ keeps the dip; the 15B+ shows only what is there now</text>
    </svg>
  );
}

/** Buyer decision flow: four yes/no questions; any "yes" points to the 17B+, four "no" answers end at the 15B+. */
function BuyerDecisionFlow() {
  const qs = [
    { y: 62, text: "Measure temperature?", why: "Type K probe" },
    { y: 122, text: "Read Hz or PWM duty?", why: "Hz / % mode" },
    { y: 182, text: "Chase sags or peaks?", why: "MIN MAX" },
    { y: 242, text: "Want a 30 V warning LED?", why: "Live-input alert" },
  ];
  return (
    <svg
      viewBox="0 0 340 330"
      className="w-full h-auto"
      role="img"
      aria-label="Decision flow for choosing between the Fluke 17B+ and 15B+. First, if you work on drives, dimmers or LED drivers, pick a True RMS meter such as the Fluke 115 or 117 instead. Otherwise answer four questions: do you measure temperature, read frequency or PWM duty cycle, chase voltage sags or peaks, or want a 30 volt warning light. A yes to any of them points to the 17B+; four noes lead to the 15B+."
    >
      <rect x="10" y="6" width="320" height="34" rx="6" className="fill-surface stroke-border" strokeWidth="1" strokeDasharray="4 3" />
      <text x="170" y="20" fontSize="9" textAnchor="middle" className="fill-foreground">Drives, dimmers or LED drivers? Neither: buy True RMS</text>
      <text x="170" y="33" fontSize="8.5" textAnchor="middle" className="fill-muted">(Fluke 115 or 117). Otherwise, start below.</text>
      {qs.map((q, i) => (
        <g key={q.text}>
          <path d={`M110 ${q.y - 16} V${q.y}`} className="stroke-muted fill-none" strokeWidth="1.4" />
          <path d={`M106 ${q.y - 5} L110 ${q.y} L114 ${q.y - 5}`} className="stroke-muted fill-none" strokeWidth="1.4" />
          {i > 0 && (
            <text x="116" y={q.y - 6} fontSize="8.5" className="fill-muted">No</text>
          )}
          <rect x="10" y={q.y} width="200" height="34" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.4" />
          <text x="110" y={q.y + 21} fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">{q.text}</text>
          <path d={`M210 ${q.y + 17} H246`} className="stroke-accent fill-none" strokeWidth="1.8" />
          <path d={`M241 ${q.y + 12} L246 ${q.y + 17} L241 ${q.y + 22}`} className="stroke-accent fill-none" strokeWidth="1.8" />
          <text x="228" y={q.y + 12} fontSize="8.5" textAnchor="middle" className="fill-accent">Yes</text>
          <rect x="248" y={q.y} width="82" height="34" rx="6" className="fill-[#f0b429]/20 stroke-foreground" strokeWidth="1.2" />
          <text x="289" y={q.y + 15} fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">17B+</text>
          <text x="289" y={q.y + 27} fontSize="8" textAnchor="middle" className="fill-muted">{q.why}</text>
        </g>
      ))}
      <path d="M110 276 V292" className="stroke-muted fill-none" strokeWidth="1.4" />
      <path d="M106 287 L110 292 L114 287" className="stroke-muted fill-none" strokeWidth="1.4" />
      <text x="116" y="286" fontSize="8.5" className="fill-muted">No to all four</text>
      <rect x="10" y="292" width="200" height="34" rx="6" className="fill-accent/15 stroke-foreground" strokeWidth="1.4" />
      <text x="110" y="307" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 15B+</text>
      <text x="110" y="320" fontSize="8" textAnchor="middle" className="fill-muted">same accuracy, µA to 10 A, fewer modes</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 15B+",
  path,
  published: "2026-10-22",
  updated: "2026-10-28",
  intro:
    "Fluke 17B+ vs Fluke 15B+ is a comparison of two meters built on one platform. They share the case, the CAT III 600V / CAT II 1000V rating, the 4,000-count backlit display and the µA-to-10A current ranges, so the decision rests entirely on the functions the 17B+ adds and the 15B+ leaves out: temperature, frequency, duty cycle, MIN MAX, relative mode and a hazardous-voltage LED.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You check appliance, HVAC or 3D-printer temperatures and want the Type K probe in the box",
      "You work on PWM, motor speed or supply circuits where frequency and duty cycle matter",
      "You want MIN MAX to catch a dipping supply and relative mode to null lead capacitance or an offset",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ digital multimeter, front view",
    chooseIf: [
      "You only measure volts, amps, ohms, continuity, diodes and capacitance",
      "You want the fewest buttons possible: just HOLD and RANGE",
      "You'd rather not pay for functions you won't use",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, backlit, 3 updates/s", b: "4,000 counts, backlit, 3 updates/s" },
    { label: "Max voltage", a: "1000V AC/DC", b: "1000V AC/DC" },
    { label: "Current ranges", a: "400.0 µA to 10.00 A AC/DC, ±(1.5% + 3)", b: "400.0 µA to 10.00 A AC/DC, ±(1.5% + 3)" },
    { label: "Capacitance", a: "40 nF to 1,000 µF", b: "40 nF to 1,000 µF" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz; 1% to 99%", b: "No" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe included", b: "No" },
    { label: "MIN MAX / relative", a: "Yes / Yes", b: "No / No" },
    { label: "Hazardous-voltage LED", a: "Lights at 30V or more", b: "No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "183 × 91 × 49.5 mm, 455 g" },
    { label: "Battery / warranty", a: "2 × AA, 500 h minimum; 1 year", b: "2 × AA, 500 h minimum; 1 year" },
    { label: "AC bandwidth (volts / amps)", a: "40–500 Hz / 40–400 Hz", b: "40–500 Hz / 40–400 Hz" },
    { label: "In the box", a: "TL75 leads, Type K probe, 2 × AA", b: "TL75 leads, 2 × AA" },
  ],
  differences: [
    "Only the 17B+ measures temperature; Fluke includes a Type K probe and specifies −55 °C to 400 °C.",
    "Only the 17B+ reads frequency (10 Hz to 100 kHz) and duty cycle; Fluke's manual marks both as 17B+ functions.",
    "MIN MAX recording and relative mode are 17B+ only, per Fluke's users manual.",
    "The 17B+ has a warning LED that lights at 30V or more, or on an overload; the 15B+ has no such indicator.",
    "Everything else matches: same 183 × 91 × 49.5 mm, 455 g case, same safety rating, same 4,000-count display, same current ranges and 1,000 µF capacitance range.",
    "Neither is described by Fluke as True RMS, so both are best kept to ordinary sine-wave mains and electronics work.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The functions only the 17B+ has</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two side by side and the dials tell the story: the 17B+ has extra positions and buttons, the
          15B+ stops at the basics. These are the additions, each confirmed in Fluke&apos;s 15B+/17B+/18B+ manual.
        </p>
        <InfoCards
          items={[
            { label: "Temperature", desc: "Type K probe included; −55 °C to 400 °C, °C or °F." },
            { label: "Frequency", desc: "10 Hz to 100 kHz in five ranges, ±(0.1% + 3)." },
            { label: "Duty cycle", desc: "1% to 99%, for PWM and switching signals." },
            { label: "MIN MAX", desc: "Holds the lowest and highest reading on volts, amps and temperature." },
            { label: "Relative", desc: "Zeroes a reference on volts, amps, capacitance or temperature." },
            { label: "30V warning LED", desc: "Lights when the input reaches 30 V or overloads." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 15B+ spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke publishes identical accuracy figures for every function the two meters share. That means the 15B+ is
          not a lower-grade meter; it is the same instrument with a shorter function list. The table puts the shared
          specs first and the 17B+ additions last.
        </p>
        <DataTable
          head={["Spec", "Fluke 17B+", "Fluke 15B+", "Same?"]}
          rows={[
            ["DC volts", "4.000 to 1000 V, ±(0.5% + 3)", "4.000 to 1000 V, ±(0.5% + 3)", "Same"],
            ["AC volts, 40 to 500 Hz", "4.000 to 1000 V, ±(1.0% + 3)", "4.000 to 1000 V, ±(1.0% + 3)", "Same"],
            ["DC millivolts", "400.0 mV, ±(1.0% + 10)", "400.0 mV, ±(1.0% + 10)", "Same"],
            ["Current", "µA, mA and A ranges to 10 A, ±(1.5% + 3)", "µA, mA and A ranges to 10 A, ±(1.5% + 3)", "Same"],
            ["Resistance", "400.0 Ω to 40.00 MΩ", "400.0 Ω to 40.00 MΩ", "Same"],
            ["Capacitance", "40 nF to 1,000 µF, ±(2% + 5) to ±(5% + 5)", "40 nF to 1,000 µF, ±(2% + 5) to ±(5% + 5)", "Same"],
            ["Diode test", "2.000 V, 10%", "2.000 V, 10%", "Same"],
            ["Continuity", "Beeps below 70 Ω", "Beeps below 70 Ω", "Same"],
            ["Volts input impedance", ">10 MΩ", ">10 MΩ", "Same"],
            ["Fuses", "440 mA and 11 A, both 1000 V", "440 mA and 11 A, both 1000 V", "Same"],
            ["Frequency", "10 Hz to 100 kHz, ±(0.1% + 3)", "Not available", "17B+ only"],
            ["Duty cycle", "1% to 99%, 1% typical", "Not available", "17B+ only"],
            ["Temperature", "−55 °C to 400 °C, Type K", "Not available", "17B+ only"],
            ["MIN MAX, relative", "Yes", "Not available", "17B+ only"],
            ["Hazardous-voltage LED", "At 30 V or OL", "Not available", "17B+ only"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Current ranges shared by both meters, on a log scale. Each step is ten times the last, from 400 µA up to 10 A.</>}>
            <BarChart
              log
              items={[
                { label: "400.0 µA (0.1 µA res.)", value: 0.0004, display: "400 µA" },
                { label: "4000 µA", value: 0.004, display: "4 mA" },
                { label: "40.00 mA", value: 0.04, display: "40 mA" },
                { label: "400.0 mA", value: 0.4, display: "400 mA" },
                { label: "4.000 A", value: 4, display: "4 A" },
                { label: "10.00 A", value: 10, display: "10 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>17B+ temperature tolerance at three example readings, worked from Fluke&apos;s spec (meter only, probe error extra).</>}>
            <BarChart
              items={[
                { label: "−20 °C (9% + 2 °C)", value: 3.8, display: "±3.8 °C" },
                { label: "25 °C (±2 °C)", value: 2, display: "±2.0 °C" },
                { label: "200 °C (2% + 1 °C)", value: 5, display: "±5.0 °C", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The temperature arithmetic: at 200 °C, 2% of the reading is 4 °C, plus 1 °C gives ±5 °C. At −20 °C, 9% of 20
          is 1.8 °C, plus 2 °C gives ±3.8 °C. That is plenty for checking an oven element, a heat-sink or a duct, but
          it is not lab-grade, and the supplied bead probe adds its own tolerance on top.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What MIN MAX catches that a live display misses</h2>
        <p className="text-muted leading-7 mb-4">
          A display that updates three times a second can miss a dip that lasts a fraction of a second, and even if it
          shows, you have to be looking at that moment. MIN MAX on the 17B+ keeps the lowest and highest values it
          sees while you watch the machine instead of the meter. Fluke allows it on voltage, current and temperature, not on
          resistance, capacitance, frequency, duty cycle or diode.
        </p>
        <Figure caption={<>Illustrative only: a 12 V supply that sags briefly when a motor starts. The numbers are an example, not a measurement.</>}>
          <MinMaxDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That is the classic intermittent fault: a control board that resets when a compressor kicks in, or a car
          accessory that drops out on crank. The 15B+ can only tell you the supply looks fine now. For more on chasing
          that kind of problem, see{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            how to find an intermittent electrical fault with a multimeter
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="Relative mode: what it can and can't zero">
            Relative mode stores the present reading and shows only the difference from it. The manual allows it on
            volts, amps, capacitance and temperature, so it is useful for nulling the stray capacitance of the leads (Fluke
            mentions a floor of up to 1.5 nF on the 40 nF range) before measuring a small capacitor. It is not available on resistance or continuity, so it
            won&apos;t subtract test-lead resistance on either meter; short the leads and subtract by hand instead.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases: where the extras pay off</h2>
        <p className="text-muted leading-7 mb-4">
          Appliance and HVAC repair is where the 17B+ earns its keep. A thermocouple on an oven cavity, a dryer
          exhaust or a supply-air register answers whether the heat source works before you start pulling panels,
          and the duty-cycle mode reads the PWM command to an EC blower motor. In hobby electronics, frequency and
          duty cycle cover 555 timers, fan headers and motor drivers.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 15B+ is the better buy when the job is plainly electrical: checking a breaker&apos;s output, a battery,
          a fuse or a motor&apos;s running current. It keeps the same µA range as the 17B+, so flame-rectification
          checks and standby-current tests still work. Fewer buttons also means fewer chances to leave the meter in an
          unexpected mode, which some trainers and shared-tool shops value.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buyer decision flow: 15B+ or 17B+ in four questions</h2>
        <p className="text-muted leading-7 mb-4">
          Because the shared functions are identical, the choice reduces to whether any one of the 17B+&apos;s extras
          would get used. Work down the chart. A single yes is enough, since there is no way to add temperature or a
          frequency counter to a 15B+ later; four noes mean the extras would sit idle.
        </p>
        <Figure caption={<>Decision flow built from the functions Fluke&apos;s manual marks 17B+ only. Start with the True RMS check at the top.</>}>
          <BuyerDecisionFlow />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The top box matters more than it looks. Fluke makes no True RMS claim for either meter, and their AC current
          is specified from 40 to 400 Hz and AC volts from 40 to 500 Hz. If a variable-speed drive or electronic
          dimmer is involved, both will misread its distorted output, and choosing between them misses the point.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature use cases, with the tolerance at each</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke splits the 17B+&apos;s temperature accuracy into three bands: ±(9% + 2 °C) from −55 to 0 °C, a flat
          ±2 °C from 0 to 50 °C, and ±(2% + 1 °C) from 50 to 400 °C, all at 0.1 °C resolution and for the meter alone.
          Applied to everyday targets, it looks like this. The targets are common reference values, not OhmSavvy
          measurements; check the appliance maker&apos;s own figure before acting on a reading.
        </p>
        <DataTable
          head={["Job", "Typical target", "17B+ band", "Meter tolerance"]}
          rows={[
            ["Freezer check", "−18 °C (0 °F)", "−55 to 0 °C", "±3.6 °C"],
            ["Refrigerator check", "4 °C (40 °F) or below", "0 to 50 °C", "±2.0 °C"],
            ["Water heater outlet", "about 49 °C (120 °F)", "0 to 50 °C", "±2.0 °C"],
            ["Oven calibration", "177 °C (350 °F)", "50 to 400 °C", "±4.5 °C"],
            ["3D-printer hot end (PLA)", "around 210 °C", "50 to 400 °C", "±5.2 °C"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>17B+ meter tolerance at each target above, °C, worked from Fluke&apos;s three temperature bands.</>}>
            <BarChart
              items={[
                { label: "Freezer −18 °C", value: 3.6, display: "±3.6 °C" },
                { label: "Fridge 4 °C", value: 2, display: "±2.0 °C" },
                { label: "Water heater 49 °C", value: 2, display: "±2.0 °C" },
                { label: "Oven 177 °C", value: 4.5, display: "±4.5 °C" },
                { label: "Hot end 210 °C", value: 5.2, display: "±5.2 °C", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>17B+ frequency tolerance at three common signals, Hz, worked from ±(0.1% + 3 counts) on the range each lands in.</>}>
            <BarChart
              items={[
                { label: "60 Hz line (500.0 Hz range)", value: 0.36, display: "±0.36 Hz" },
                { label: "1 kHz timer (5.000 kHz range)", value: 4, display: "±4 Hz" },
                { label: "25 kHz fan PWM (50.00 kHz range)", value: 55, display: "±55 Hz", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Two practical notes. On air-conditioning work, relative mode is allowed on temperature: rest the probe in the
          return air, press REL, then move it to a supply register and the display shows the drop directly, though
          each reading still carries its own tolerance. And the 400 °C ceiling belongs to the meter, not necessarily the
          probe. Fluke&apos;s page includes a Type K bead probe without naming its model or its maximum, so don&apos;t
          assume it is good to 400 °C; for a soldering tip or a kiln, use a probe whose own rating you have checked.
          Our guide on{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            checking a thermocouple with a multimeter
          </Link>{" "}
          covers the furnace-side version of this job, and the 15B+ can do that one too, since it measures the
          thermocouple&apos;s millivolts rather than its temperature.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequency and duty cycle use cases</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ counts from 10 Hz to 100 kHz across five ranges, and the range sets the step: 0.01 Hz on the
          50.00 Hz range up to 0.1 kHz on the top one. A US portable generator should hold close to 60 Hz; that lands
          on the 500.0 Hz range, where the tolerance is 0.1% × 60 + 3 × 0.1 = ±0.36 Hz, fine enough to spot a governor
          running fast or slow under load. If your generator cuts out when an appliance starts, read the frequency and
          voltage with the load applied, alongside our guide to{" "}
          <Link href="/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance" className={link}>
            a generator that shuts off under load
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Duty cycle carries a catch that Fluke states in small print: the 1% typical accuracy applies at 50 or 60 Hz
          with a duty between 10% and 90%. A PC or EC-motor fan PWM line usually runs far faster, often around 25 kHz,
          so a 17B+ reading there is a useful indication (is the controller commanding 30% or 90%?) rather than a
          specified measurement. The frequency figure itself remains specified at those speeds. The 15B+ has neither
          mode; on a PWM line its DC volts range shows only the average.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">For the budget buyer: value by features</h2>
        <p className="text-muted leading-7 mb-4">
          On a tight budget, the useful question is not which meter is better but what the cheaper one costs you in
          capability. With this pair the answer is precise, because the spec table above splits cleanly: ten shared
          rows with identical figures and five rows that exist only on the 17B+. Saving money on the 15B+ never means
          a less accurate volts, amps or ohms reading, a lower safety rating, a weaker fuse or a shorter warranty. It
          means doing without specific functions, and for each one the question is whether you have a workaround.
        </p>
        <DataTable
          head={["17B+ function you give up", "Workaround on a 15B+", "How good is the workaround?"]}
          rows={[
            ["Temperature with Type K probe", "A separate thermometer", "Fine, but one more tool to buy and carry"],
            ["Frequency, 10 Hz to 100 kHz", "None on the meter", "No substitute; DC volts shows only an average"],
            ["Duty cycle, 1% to 99%", "None on the meter", "No substitute for reading a PWM command"],
            ["MIN MAX on volts, amps, temperature", "Watch the display", "Misses short dips at 3 updates/s"],
            ["Relative mode", "Subtract by hand", "Workable for lead capacitance"],
            ["30 V hazardous-voltage LED", "Read the display before touching", "Workable with good habits"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Rows in the spec-by-spec table above: identical on both meters versus 17B+ only.</>}>
            <BarChart
              items={[
                { label: "Identical on both", value: 10, display: "10 rows", highlight: true },
                { label: "17B+ only", value: 5, display: "5 rows" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Three of the six have reasonable workarounds and three don&apos;t. If frequency, duty cycle or catching a
          brief sag is part of your work, a 15B+ can&apos;t do it at all, and the 17B+ is the better value even on a
          budget. If all you need are volts, amps, ohms, continuity and capacitance, the 15B+ delivers the same
          measurements and the extra spend would buy dial positions you never turn to. Neither meter is described by
          Fluke as True RMS, so a budget buyer who works near drives or LED drivers should stretch to a True RMS model
          instead; the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-15b-plus" className={link}>
            Fluke 117 vs Fluke 15B+
          </Link>{" "}
          comparison shows what that step adds.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ or 15B+: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Appliance or HVAC repair tech", "Fluke 17B+", "Type K temperature, duty cycle for EC motors, MIN MAX for sags"],
            ["Electronics student or hobbyist", "Fluke 17B+", "Frequency and duty cycle for timers, PWM and fan circuits"],
            ["3D-printer or reflow tinkerer", "Fluke 17B+", "Checks hot-end and bed temperatures against the firmware"],
            ["Homeowner with a basic toolkit", "Fluke 15B+", "Volts, amps, ohms and continuity, with the same accuracy"],
            ["Maintenance shop buying shared meters", "Fluke 15B+", "Fewer modes to misuse; identical safety rating and fuses"],
            ["Anyone working near variable-speed drives", "Neither", "No True RMS claim; look at the Fluke 115 or 117"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Comparing either one with a True RMS electrician&apos;s meter? Read{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-117" className={link}>
            Fluke 17B+ vs Fluke 117
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-15b-plus" className={link}>
            Fluke 117 vs Fluke 15B+
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: the 1000 V figure is CAT II, not CAT III">
        Both meters read up to 1000 V, but their CAT III rating stops at 600 V. On a distribution panel or feeder, stay
        within 600 V; the 1000 V figure applies only to CAT II circuits such as plug-in appliances. Replace blown fuses
        only with the 440 mA and 11 A 1000 V parts Fluke specifies, and if you&apos;re unsure what category a circuit
        falls in, ask a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the 17B+ unless you are sure you will never need temperature, frequency or MIN MAX; the extra functions make it the more useful meter for electronics and appliance work. The 15B+ suits anyone who wants a simple, tough Fluke for volts, amps and ohms, with the same accuracy. Either way, check the 17B+ listing, as its Amazon photo shows the newer 17B MAX.",
  faqs: [
    {
      question: "What is the difference between the Fluke 17B+ and 15B+?",
      answer:
        "The 17B+ adds temperature with a Type K probe, frequency to 100 kHz, duty cycle, MIN MAX recording, relative mode and a 30V hazardous-voltage LED. The case, safety rating, 4,000-count display, current ranges from 400 µA to 10 A, capacitance range, fuses, battery life and one-year warranty are the same, and so is every shared accuracy figure.",
    },
    {
      question: "Are the Fluke 17B+ and 15B+ True RMS?",
      answer:
        "Fluke doesn't describe either as True RMS in its datasheet, manual or product pages, so treat them as average-responding. On clean mains and batteries that is fine. For variable-speed drives, LED drivers and other distorted waveforms, a True RMS meter such as the Fluke 115 or 117 is the better tool.",
    },
    {
      question: "Do the 17B+ and 15B+ measure microamps?",
      answer:
        "Yes. Both have 400.0 µA and 4000 µA ranges with 0.1 µA resolution on the lowest, plus mA and A ranges up to 10A AC and DC, all at ±(1.5% + 3). The current inputs are protected by 440 mA and 11 A fuses rated at 1000V, which suits flame-sensor and standby-current checks.",
    },
    {
      question: "Can the Fluke 15B+ measure temperature?",
      answer:
        "No. Fluke's manual lists temperature as a 17B+-only function, and the 15B+ has no thermocouple position on its dial. If you need temperature from a 15B+, you'd carry a separate thermometer. The 17B+ ships with a Type K bead probe and reads from −55 °C to 400 °C in °C or °F.",
    },
    {
      question: "Is the Fluke 15B+ the better value for a budget buyer?",
      answer:
        "Yes, if your work is volts, amps, ohms, continuity and capacitance. Fluke gives it the same accuracy, current ranges, fuses, safety rating and one-year warranty as the 17B+. It is poorer value if you will ever need frequency, duty cycle or MIN MAX, because the 15B+ has no way to take those readings, while temperature can at least come from a separate thermometer.",
    },
    {
      question: "What warranty do the Fluke 15B+ and 17B+ have?",
      answer:
        "One year for both. Fluke's 15B+/17B+/18B+ users manual gives a one-year warranty, and the US product pages don't state a different term; they show only a 30-day return window in the purchase box. That's a shorter term than Fluke gives the pocket 106/107 or the 115/117, so keep your proof of purchase.",
    },
    {
      question: "Can the Fluke 17B+ check a generator's frequency?",
      answer:
        "Yes. Its frequency mode covers 10 Hz to 100 kHz, and a 60 Hz output reads on the 500.0 Hz range to about ±0.36 Hz, enough to see whether a governor holds speed under load. The 15B+ can read the generator's voltage but has no frequency function, so checking speed regulation would need a second tool.",
    },
    {
      question: "Why does the Amazon 17B+ listing show a 17B MAX?",
      answer:
        "The listing's main photo shows a meter printed 17B MAX, the newer model, so the listing may now ship the successor rather than the 17B+. Check the product details and the seller's notes before you order if you specifically want the 17B+, and compare the specs you receive against Fluke's own page.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" },
    { label: "How to measure microamps with a multimeter", href: "/multimeters/how-to-measure-microamps-with-a-multimeter" },
  ],
};

export default function Fluke17BPlusVsFluke15BPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
