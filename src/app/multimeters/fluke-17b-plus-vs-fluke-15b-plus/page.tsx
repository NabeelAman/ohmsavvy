// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
// - Fluke 15B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus
// - 15B+/17B+/18B+ Users Manual: https://media.fluke.com/f8ca9de4-481a-4125-8a46-b2d9006f431f_original%20file.pdf
//   (one-year warranty; auto power off after 20 min; backlight off after 2 min; continuity beeps below 70 Ω;
//   relative mode "17B+ only", not available on frequency, resistance, continuity, duty cycle or diode;
//   MIN MAX "17B+ only", not available on resistance, capacitance, frequency, duty cycle or diode;
//   hazardous-voltage LED at 30 V or OL, 17B+ only; temperature 17B+ only)
// Fixed 2026-10-26: the old page said relative mode zeroes lead resistance, but the manual excludes resistance.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-15b-plus";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 15B+",
  description:
    "Fluke 17B+ vs Fluke 15B+: the same body and CAT rating, but the 17B+ adds temperature, frequency, duty cycle, MIN MAX and relative mode. Which to buy.",
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

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 15B+",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
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
        <Figure caption={<>If none of the middle steps describes your work, the 15B+ does everything you need.</>}>
          <FlowDiagram
            steps={[
              { label: "Basic checks", sub: "Volts, amps, ohms, continuity" },
              { label: "Need temperature?", sub: "Yes: 17B+" },
              { label: "Need Hz or duty?", sub: "Yes: 17B+" },
              { label: "Logging dips?", sub: "MIN MAX: 17B+" },
              { label: "None of these", sub: "15B+ is enough" },
            ]}
          />
        </Figure>
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
