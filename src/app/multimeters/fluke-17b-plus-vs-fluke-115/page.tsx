// Specs per Fluke, as already cited elsewhere in this repo (checked 2026-10-26):
// - Fluke 17B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus and the
//   15B+/17B+ datasheet: no True RMS claim; 4,000 counts, 3 updates/s, backlit; DC V 4/40/400/1000 V ±(0.5% + 3); AC V
//   40-500 Hz ±(1.0% + 3); current 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3); resistance to
//   40.00 MΩ; capacitance 40.00 nF to 1000 µF; frequency 10 Hz-100 kHz; duty cycle 1-99%; temperature -55 to 400 °C with
//   Type K probe; input >10 MΩ; fuses 440 mA and 11 A, 1000 V; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40;
//   CAT III 600V / CAT II 1000V. Users manual: continuity beeper below 70 Ω; hazardous-voltage LED at 30 V or more;
//   relative mode not available on resistance or continuity; 1-year warranty.
// - Fluke 115 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
//   114/115/116/117 datasheet (2793260b): True RMS; 6,000 counts at 4 updates/s, 33-segment bar graph at 32/s; DC V
//   600.0 mV-600.0 V ±(0.5% + 2); AC V ±(1.0% + 3); 6.000 A and 10.00 A only (DC ±(1.0% + 3), AC ±(1.5% + 3)); resistance
//   to 40.00 MΩ; capacitance to 9,999 µF; frequency to 50.00 kHz; continuity below about 20 Ω, catches opens/shorts of
//   500 µs or longer; Min/Max/Avg with elapsed time; no temperature (116 only); CAT III 600V; one 9 V, 400 h typical;
//   167 × 84 × 46 mm; 550 g; 3-year warranty.
// Worked accuracy figures below are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-115";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 115: Which Is Better Value?",
  description:
    "Fluke 17B+ vs Fluke 115 comparison: temperature, µA ranges and duty cycle against True RMS, 6,000 counts and a 3-year warranty. Which gives more value?",
  path: "/multimeters/fluke-17b-plus-vs-fluke-115",
});

const link = "text-accent hover:underline";

/**
 * One second of a fluctuating reading: the 17B+ refreshes its digits 3 times, the 115 refreshes digits 4 times and its
 * bar graph 32 times. Update rates per Fluke; the waveform is illustrative.
 */
function UpdateRateDiagram() {
  const x0 = 70;
  const w = 260;
  const signal = Array.from({ length: 101 }, (_, i) => {
    const t = i / 100;
    const v = 0.5 + 0.32 * Math.sin(2 * Math.PI * 2.5 * t) + 0.12 * Math.sin(2 * Math.PI * 9 * t);
    return `${(x0 + t * w).toFixed(1)},${(64 - v * 44).toFixed(1)}`;
  }).join(" ");
  const ticks = (n: number, y: number, h: number, cls: string) =>
    Array.from({ length: n }, (_, i) => {
      const x = x0 + ((i + 0.5) / n) * w;
      return <line key={`${y}-${i}`} x1={x} x2={x} y1={y} y2={y + h} className={cls} strokeWidth={n > 10 ? 1.4 : 3} />;
    });
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Timeline of one second of a fluctuating voltage. The Fluke 17B+ refreshes its digits three times in that second. The Fluke 115 refreshes its digits four times and its 33-segment bar graph 32 times, so the bar graph follows the swings that the digits skip over."
    >
      <text x="4" y="44" fontSize="9" className="fill-foreground">Signal</text>
      <line x1={x0} x2={x0 + w} y1="64" y2="64" className="stroke-border" strokeWidth="0.8" />
      <polyline points={signal} fill="none" className="stroke-foreground" strokeWidth="1.6" />
      <text x="4" y="94" fontSize="9" className="fill-foreground">17B+ digits</text>
      {ticks(3, 84, 14, "stroke-muted")}
      <text x="4" y="124" fontSize="9" className="fill-foreground">115 digits</text>
      {ticks(4, 114, 14, "stroke-accent")}
      <text x="4" y="154" fontSize="9" className="fill-foreground">115 bar graph</text>
      {ticks(32, 144, 14, "stroke-accent")}
      <line x1={x0} x2={x0 + w} y1="172" y2="172" className="stroke-border" strokeWidth="0.8" />
      <text x={x0} y="184" fontSize="8.5" className="fill-muted">0 s</text>
      <text x={x0 + w} y="184" fontSize="8.5" textAnchor="end" className="fill-muted">1 s</text>
      <text x={x0 + w / 2} y="184" fontSize="8.5" textAnchor="middle" className="fill-muted">each tick = one refresh</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 115: Which Offers Better Value?",
  path,
  published: "2026-10-27",
  intro:
    "In a Fluke 17B+ vs Fluke 115 comparison, value means what each meter gives you for its tier, and the two spend it differently. The 17B+ packs in functions: temperature with a supplied probe, six current ranges down to microamps, frequency to 100 kHz, duty cycle and relative mode. The 115 spends it on measurement quality: True RMS, a 6,000-count display with a fast bar graph, and three years of warranty instead of one.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter with temperature function, front view",
    chooseIf: [
      "You want the most measurement functions in one Fluke body, including temperature",
      "You read sensor loops, standby drain or other currents below 1 A",
      "You mostly measure DC, resistance and clean mains rather than drive or LED-driver outputs",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field-service multimeter, front view",
    chooseIf: [
      "You measure AC on electronic loads, where a True RMS reading is the trustworthy one",
      "You want a finer display and a bar graph that tracks drifting readings",
      "You'd rather have a three-year warranty than extra functions you rarely use",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Not described as True RMS by Fluke", b: "True RMS" },
    { label: "Display", a: "4,000 counts, 3 updates/s", b: "6,000 counts, 4 updates/s + 33-segment bar graph" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 600V" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3)" },
    { label: "Current ranges", a: "400.0 µA to 10.00 A, six ranges", b: "6.000 A and 10.00 A" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 40 MΩ" },
    { label: "Capacitance", a: "40 nF range up to 1,000 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency / duty cycle", a: "10 Hz to 100 kHz / 1-99%", b: "Up to 50 kHz / not listed" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe supplied", b: "No (Fluke 116 only)" },
    { label: "Recording", a: "MIN MAX, relative mode", b: "Min/Max/Avg with elapsed time" },
    { label: "Continuity beeper", a: "Below 70 Ω", b: "Below about 20 Ω" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "One 9V, 400 h typical" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "1 year", b: "3 years" },
  ],
  differences: [
    "The 115 is True RMS; Fluke doesn't describe the 17B+ that way, so its AC readings are dependable on sine waves only.",
    "The 17B+ has four sub-ampere current ranges, from 400.0 µA up; the 115's smallest current range is 6.000 A.",
    "Temperature, duty cycle and relative mode are 17B+ features; the 115 has none of them.",
    "The 115 shows 6,000 counts plus a 33-segment bar graph refreshed 32 times a second; the 17B+ shows 4,000 counts three times a second.",
    "The 115 reads capacitors up to 9,999 µF, about ten times the 17B+'s 1,000 µF ceiling.",
    "Warranty: three years on the 115 against one year on the 17B+, per Fluke's manuals.",
    "Identical where it counts for basic checks: both are CAT III 600V, read resistance to 40 MΩ and share ±(1.0% + 3) AC volts accuracy.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What &quot;better value&quot; means for these two Flukes</h2>
        <p className="text-muted leading-7 mb-4">
          We don&apos;t quote prices because they move every week. Value here is a question of what each model
          includes at its level of Fluke&apos;s range. Count the functions and the 17B+ wins easily: it measures
          temperature, duty cycle and four small-current ranges the 115 lacks, and adds relative mode and a
          hazardous-voltage warning LED. Weigh how good each measurement is, and the 115 pulls back: it is True RMS,
          its display resolves 50% more counts, and Fluke backs it for three times as long.
        </p>
        <DataTable
          head={["What you get", "Fluke 17B+", "Fluke 115"]}
          rows={[
            ["Functions beyond V, A, Ω, continuity, diode, capacitance, frequency", "Temperature, duty cycle, relative, µA/mA", "None extra"],
            ["Reading quality on distorted AC", "Not claimed", "True RMS"],
            ["Live trend display", "Digits only (no bar graph listed)", "33-segment bar graph"],
            ["Built-in accessory of note", "Type K bead probe", "Not stated"],
            ["Warranty", "1 year", "3 years"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Two kinds of value">
            The 17B+ is value by breadth: one meter covers more jobs. The 115 is value by depth: fewer jobs, but
            readings you can trust on the AC loads found in modern buildings. Decide which kind your work needs before
            comparing anything else.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy worked through on everyday readings</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters list ±0.5% of reading for DC volts and ±1.0% for AC volts. The difference lives in the counts
          term and in which range a reading lands on. A 4,000-count meter tops out at 3.999 V on its lowest DC range,
          so a 5 V rail has to move up to the 40.00 V range, where one count is 10 mV. The 115 keeps the same 5 V
          rail on its 6.000 V range, where one count is 1 mV. Here is the worst-case arithmetic from Fluke&apos;s
          published figures:
        </p>
        <DataTable
          head={["Reading", "17B+ worst case", "115 worst case"]}
          rows={[
            ["5.000 V USB or logic rail", "±(0.025 + 0.03) = ±0.055 V", "±(0.025 + 0.002) = ±0.027 V"],
            ["12.60 V car battery", "±(0.063 + 0.03) = ±0.093 V", "±(0.063 + 0.02) = ±0.083 V"],
            ["120.0 V AC receptacle (sine)", "±(1.2 + 0.3) = ±1.5 V", "±(1.2 + 0.3) = ±1.5 V"],
            ["2.000 A DC load", "±(0.030 + 0.003) = ±0.033 A", "±(0.020 + 0.003) = ±0.023 A"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Worst-case allowance on a 5 V rail, from the table. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 55, display: "±55 mV" },
                { label: "Fluke 115", value: 27, display: "±27 mV", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Largest capacitor each meter can read, on a log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 17B+", value: 1000, display: "1,000 µF" },
                { label: "Fluke 115", value: 9999, display: "9,999 µF", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          On a 120 V receptacle the two are identical on paper, as long as the waveform is a clean sine. On a car
          battery the gap is 10 mV, too small to change any diagnosis. The 5 V case is where the 115&apos;s extra
          counts show up: half the uncertainty, and a third decimal place on screen. These are spec limits, not
          readings from our bench; a calibrated meter normally sits well inside them.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Watching a reading move: bar graph vs digits</h2>
        <p className="text-muted leading-7 mb-4">
          Digits are slow by design so you can read them. Fluke lists 3 display updates a second for the 17B+ and 4
          for the 115, but the 115 also has a 33-segment analog bar graph that refreshes 32 times a second. That
          matters when a value won&apos;t sit still: a sagging battery under cranking load, a loose connection that
          flickers, or a capacitor charging on the resistance range.
        </p>
        <Figure caption={<>Illustrative: one second of a wandering signal and how often each display catches up with it.</>}>
          <UpdateRateDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 17B+ answers with recording instead of speed. MIN MAX holds the highest and lowest values seen, and
          relative mode zeroes the display against a reference, which helps when you subtract test-lead resistance
          from a capacitance reading or compare cells in a pack. Fluke&apos;s manual notes relative mode isn&apos;t
          available on the resistance or continuity functions. The 115 records too, adding an average and elapsed
          time to its Min/Max, and its continuity beeper catches opens or shorts as brief as 500 µs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Small currents and temperature: the 17B+&apos;s edge</h2>
        <p className="text-muted leading-7 mb-4">
          If any of your work happens below one amp, the 17B+ is the only option of the two. Its 400.0 µA range
          resolves 0.1 µA, and its 40.00 mA range reads a 4-20 mA transmitter loop to 0.01 mA. The 115&apos;s best
          resolution is 1 mA, so a 12 mA loop shows as 0.012 A and a parasitic drain of 30 mA is barely more than a
          rounding error. Our guides to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4-20 mA loop testing
          </Link>{" "}
          show why that resolution matters.
        </p>
        <p className="text-muted leading-7 mb-4">
          Temperature is the other gap. The 17B+ reads a Type K thermocouple from −55 °C to 400 °C with the bead probe
          in the box, enough for supply and return air, heatsinks and appliance elements. Fluke&apos;s datasheet puts
          thermocouple input on the 116, not the 115, so a 115 owner needs a separate thermometer.
        </p>
        <Figure caption={<>Current ranges each meter offers. The 17B+ covers four ranges below one amp; the 115 starts at 6 A.</>}>
          <BarChart
            items={[
              { label: "Fluke 17B+", value: 6, display: "6 ranges", highlight: true },
              { label: "Fluke 115", value: 2, display: "2 ranges" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Deciding factor"]}
          rows={[
            ["Appliance and HVAC diagnostics", "Fluke 17B+", "Temperature probe plus mA ranges"],
            ["Automotive drain and sensor checks", "Fluke 17B+", "µA and mA ranges with fine resolution"],
            ["Electronics hobby bench", "Fluke 17B+", "Duty cycle, 100 kHz frequency, relative mode"],
            ["LED lighting, drives and switch-mode loads", "Fluke 115", "True RMS AC volts and amps"],
            ["5 V and 3.3 V rail checks", "Fluke 115", "6,000 counts keep a third decimal place"],
            ["Large filter and motor capacitors", "Fluke 115", "Reads up to 9,999 µF"],
            ["One meter you'll keep for years", "Fluke 115", "Three-year warranty against one"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 17B+ if you work on variable-speed equipment or electronic lighting, where a non-True-RMS reading
          can mislead you. Skip the 115 if you need temperature or any current under an amp; in that case the 17B+,
          or a meter like the 87V, is the honest choice. The 115 is one of the meters our owner has bought and used
          (Hands-on Tested); the 17B+ verdict here is desk research against Fluke&apos;s specifications. Also note
          that the 17B+ Amazon listing photo shows the newer 17B MAX, so confirm which model ships.
        </p>
      </section>

      <Callout title="The 17B+'s 1000V range isn't a higher mains rating">
        The 17B+ can display up to 1000V, but on building wiring it carries the same CAT III 600V rating as the 115;
        its CAT II 1000V rating applies to plug-connected equipment. Neither meter is rated CAT IV, so neither belongs
        on a service drop or meter base. Verify the meter on a known live source before and after any dead test, and
        call a licensed electrician for panel or service work.
      </Callout>
    </>
  ),
  bottomLine:
    "For breadth, the Fluke 17B+ is the better value: temperature, microamp-to-milliamp current ranges, duty cycle and relative mode in one body. For measurement quality on AC, the Fluke 115 is the better value: True RMS, 6,000 counts, a fast bar graph and a three-year warranty. Electronics, appliance and automotive users should lean 17B+; anyone measuring modern AC loads should pick the 115.",
  faqs: [
    {
      question: "Is the Fluke 17B+ better than the Fluke 115?",
      answer:
        "Neither is better overall. The 17B+ does more things: temperature, duty cycle, relative mode and current ranges from 400 µA. The 115 does fewer things more reliably on AC, because it is True RMS with a 6,000-count display and bar graph. Choose by the job: electronics and appliances favor the 17B+, while LED lighting and motor-drive work favor the 115.",
    },
    {
      question: "Does the Fluke 115 measure milliamps?",
      answer:
        "Only coarsely. Fluke lists 6.000 A and 10.00 A ranges for the 115, so its smallest step is 1 mA and there is no microamp range. That is enough for checking a motor or heater current, but not for reading a 4-20 mA loop precisely or tracing a small parasitic drain. The 17B+ has dedicated 400.0 µA, 4000 µA, 40.00 mA and 400.0 mA ranges.",
    },
    {
      question: "Why does the Fluke 115 have a longer warranty than the 17B+?",
      answer:
        "Fluke simply assigns different terms to different ranges. Its 15B+/17B+/18B+ users manual gives one year from shipment, while the 110 Series, which includes the 115, carries three years. Fluke doesn't explain the reasoning. If long coverage is part of how you judge value, the 115 has a clear advantage here.",
    },
    {
      question: "Can the Fluke 17B+ test a capacitor as well as the 115?",
      answer:
        "For small and medium parts, yes. The 17B+ starts with a 40.00 nF range and reaches 1,000 µF, which covers HVAC run capacitors and most board-level electrolytics. The 115 reaches 9,999 µF, so it can also read the large filter capacitors found in amplifiers, inverters and power supplies. Always discharge a capacitor before you test it.",
    },
    {
      question: "Which is lighter to carry, the 17B+ or the 115?",
      answer:
        "The 17B+, at 455 g against 550 g, per Fluke. It is slightly larger, at 183 × 91 × 49.5 mm against 167 × 84 × 46 mm. Batteries differ too: the 17B+ runs on two AA cells for at least 500 hours, while the 115 uses one 9V battery rated for about 400 hours typical.",
    },
    {
      question: "Is the 17B+ accurate enough for household electrical checks?",
      answer:
        "On ordinary outlets and resistive loads, yes. Both meters share ±(1.0% + 3) AC volts accuracy and the same CAT III 600V rating, so a 120 V receptacle reads within the same ±1.5 V on either. The caution is distorted waveforms: dimmers, LED drivers and variable-speed motors can make a non-True-RMS meter read high or low.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
  ],
};

export default function Fluke17BPlusVsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
