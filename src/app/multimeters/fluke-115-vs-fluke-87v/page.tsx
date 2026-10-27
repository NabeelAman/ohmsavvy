// Specs per Fluke, as already used on this site's fluke-115-review, fluke-87v-review and fluke-115-vs-fluke-117 pages:
// - Fluke 115: product page + spec tab https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
//   and the 114/115/116/117 datasheet (2793260b, 08/2020) https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (True RMS, CAT III 600V, 6,000 counts + 33-segment bar graph, DC V ±(0.5% + 2), AC V ±(1.0% + 3) 45-500 Hz,
//   6 A / 10 A only with 1 mA best resolution, 40 MΩ, 1 nF to 9,999 µF, 50 kHz (2020 manual: 99.99 kHz),
//   Min/Max/Avg with elapsed time, backlight, no temperature (116 only), 167 × 84 × 46 mm, 550 g, 9 V 400 h, 3-year warranty)
// - Fluke 87V: product page + spec tab https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   (True RMS, CAT III 1000V / CAT IV 600V, 6,000 counts + 19,999 high-res, 32-segment bar graph at 40/s,
//   DC V ±(0.05% + 1), AC V ±(0.7% + 2), low-pass filter 3 dB at 1 kHz, 10 A (20 A for 30 s) plus mA and µA,
//   0.01 µA DC resolution, 50 MΩ, 9,999 µF, 200 kHz, duty cycle, -200 to 1090 °C excl. probe (80BK probe -40 to 260 °C),
//   250 µs Peak Capture, 355 g (624 g in holster), about 400 h battery, lifetime warranty; dimensions not stated in our data)
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 115 vs Fluke 87V: Which Should You Buy?",
  description:
    "Fluke 115 vs Fluke 87V differences: CAT III 600V vs CAT IV 600V, 0.5% vs 0.05% DC accuracy, amps-only vs µA ranges, temperature and a drive filter.",
  path: "/multimeters/fluke-115-vs-fluke-87v",
});

const link = "text-accent hover:underline";

/**
 * The current each meter can resolve, on a log ruler from 0.01 µA to 10 A. The 115's 6 A range bottoms out at
 * 1 mA resolution; the 87V's µA range resolves 0.01 µA. Typical-signal markers are labeled as typical.
 */
function CurrentReachDiagram() {
  // decades from 1e-8 A (0.01 µA) to 1e1 A (10 A): 9 decades across x = 30..310
  const x0 = 30;
  const x1 = 310;
  const decades = 9;
  const xAt = (amps: number) => x0 + ((Math.log10(amps) + 8) / decades) * (x1 - x0);
  const ticks: [number, string][] = [
    [1e-8, "0.01 µA"],
    [1e-6, "1 µA"],
    [1e-3, "1 mA"],
    [1, "1 A"],
    [10, "10 A"],
  ];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale ruler of current from 0.01 microamps to 10 amps. The Fluke 87V's bar spans the whole ruler; the Fluke 115's bar starts at 1 milliamp resolution, so flame-sensor microamps and the fine steps of a 4 to 20 milliamp loop fall outside its useful reach."
    >
      <line x1={x0} x2={x1} y1="40" y2="40" className="stroke-border" strokeWidth="1.2" />
      {ticks.map(([a, label]) => (
        <g key={label}>
          <line x1={xAt(a)} x2={xAt(a)} y1="34" y2="46" className="stroke-foreground" strokeWidth="1" />
          <text x={xAt(a)} y="26" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {label}
          </text>
        </g>
      ))}
      <rect x={xAt(1e-8)} y="62" width={xAt(10) - xAt(1e-8)} height="22" rx="5" className="fill-accent" />
      <text x={(xAt(1e-8) + xAt(10)) / 2} y="77" fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff">
        Fluke 87V: µA, mA and 10 A ranges
      </text>
      <rect x={xAt(1e-3)} y="94" width={xAt(10) - xAt(1e-3)} height="22" rx="5" className="fill-accent/40" />
      <text x={(xAt(1e-3) + xAt(10)) / 2} y="109" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 115: 1 mA steps
      </text>
      <text x={xAt(1e-3) - 6} y="109" fontSize="8.5" textAnchor="end" className="fill-muted">
        below its resolution
      </text>
      <line x1={xAt(3e-6)} x2={xAt(3e-6)} y1="124" y2="146" className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={xAt(3e-6)} y="158" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        flame sensor (typ. a few µA)
      </text>
      <line x1={xAt(1.2e-2)} x2={xAt(1.2e-2)} y1="124" y2="146" className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x={xAt(1.2e-2)} y="158" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        4-20 mA loop
      </text>
      <text x="170" y="182" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Log scale: equal distances mean equal ratios. Signal markers are typical values.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs Fluke 87V: Key Differences",
  path,
  published: "2026-10-27",
  intro:
    "The short answer: buy the Fluke 115 if you need a reliable True RMS meter for building wiring, appliances and general field service up to 600 V; buy the Fluke 87V if you probe service equipment, work above 600 V, tune instrument loops, chase flame-sensor microamps or troubleshoot motor drives. Both are True RMS Flukes we own and have used, but the 87V belongs to a different class: CAT IV rating, ten-times-tighter DC accuracy, low-current ranges, temperature, a drive filter and a lifetime warranty.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 field-service True RMS multimeter, front view",
    chooseIf: [
      "You measure receptacles, branch circuits, appliances and controls inside the building, all within CAT III 600V",
      "Amps for you means load current, where 1 mA steps on the 6 A range are fine",
      "You want Fluke's core True RMS meter without paying for industrial features you won't use",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter with 19,999-count mode, front view",
    chooseIf: [
      "You take readings at the meter base, service conductors or anything above 600 V",
      "You need mA or µA ranges for 4-20 mA loops or furnace flame sensors, or a thermocouple input",
      "You commission or repair variable-frequency drives and want the low-pass filter and 250 µs Peak Capture",
    ],
  },
  extraSpecs: [
    { label: "Max voltage", a: "600 V AC/DC", b: "1000 V AC/DC" },
    { label: "Display", a: "6,000 counts", b: "6,000 counts; 19,999 in high-res mode" },
    { label: "Analog bar graph", a: "33 segments", b: "32 segments, 40 updates/s" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45 to 500 Hz", b: "±(0.7% + 2)" },
    { label: "Current ranges", a: "6 A and 10 A only; 1 mA best resolution", b: "10 A (20 A for 30 s), mA and µA; 0.01 µA DC resolution" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 50 MΩ" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "To 9,999 µF" },
    { label: "Frequency / duty cycle", a: "To 50 kHz (2020 manual: 99.99 kHz) / Not stated", b: "To 200 kHz / yes" },
    { label: "Temperature", a: "No (Fluke 116 only)", b: "-200 °C to 1090 °C excl. probe; 80BK probe included" },
    { label: "Recording", a: "Min/Max/Avg with elapsed time", b: "Min/Max plus 250 µs Peak Capture" },
    { label: "Drive low-pass filter", a: "No", b: "Yes, 3 dB at 1 kHz" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "Size not stated; 355 g (624 g in holster)" },
    { label: "Battery", a: "One 9 V, about 400 h", b: "About 400 h" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Safety category: the 87V carries CAT IV 600V and CAT III 1000V; the 115 stops at CAT III 600V, which excludes the service entrance and anything over 600 V.",
    "DC precision: Fluke lists ±(0.05% + 1) for the 87V against ±(0.5% + 2) for the 115, and only the 87V offers a 19,999-count high-resolution mode.",
    "Low current: the 115 has no mA or µA input and resolves 1 mA at best. The 87V has dedicated mA and µA ranges down to 0.01 µA DC.",
    "Industrial extras exist only on the 87V: thermocouple temperature, duty cycle, 200 kHz frequency, a low-pass filter for drive outputs and 250 µs Peak Capture.",
    "Identical on paper: True RMS, capacitance to 9,999 µF, an analog bar graph, roughly 400 hours per battery, and no non-contact or LoZ function on either.",
    "The bare 87V is lighter (355 g against 550 g), and its warranty is lifetime rather than three years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the two meters share</h2>
        <p className="text-muted leading-7 mb-4">
          It helps to start with the overlap, because it is bigger than the gap in cost suggests. Both read AC volts
          and amps as True RMS, so neither is fooled by the distorted current of an LED driver or a switch-mode
          supply. Both auto-range, both have an analog bar graph that moves faster than the digits, both measure
          capacitance up to 9,999 µF for motor-run and supply capacitors, and both run around 400 hours on a battery.
          Neither has non-contact voltage detection or a low-impedance ghost-voltage input; for those, the Fluke 117 is
          the model to look at.
        </p>
        <p className="text-muted leading-7">
          OhmSavvy bought and used both meters, so each carries our Hands-on Tested badge. We haven&apos;t published
          bench measurements from that use, so every number on this page comes from Fluke&apos;s spec tabs and
          datasheet. Where Fluke&apos;s own documents disagree (the 115&apos;s top frequency is 50 kHz on the
          datasheet and 99.99 kHz in the 2020 manual), we say so.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 vs 87V differences in numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum rated voltage. The 87V covers 1000 V systems; the 115 stops at 600 V.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 600, display: "600 V" },
                { label: "Fluke 87V", value: 1000, display: "1000 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top frequency per Fluke&apos;s spec tabs. The 115&apos;s 2020 manual lists 99.99 kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 50, display: "50 kHz" },
                { label: "Fluke 87V", value: 200, display: "200 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest resistance range, in MΩ. A small gap that rarely decides a purchase.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 40, display: "40 MΩ" },
                { label: "Fluke 87V", value: 50, display: "50 MΩ", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without holster, in grams. The 87V is the lighter meter in the hand.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 550, display: "550 g" },
                { label: "Fluke 87V", value: 355, display: "355 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The accuracy gap is easiest to see on a real reading. Take a 12.60 V DC battery bus. On its 60.00 V range
          the 115&apos;s ±(0.5% + 2) works out to 0.063 V plus two counts of 0.01 V, about ±0.08 V. The 87V&apos;s
          ±(0.05% + 1) gives 0.0063 V plus one count, about ±0.016 V. Both are fine for &quot;is it charged?&quot;;
          only the 87V is tight enough to judge a few tens of millivolts of voltage drop across a connection or to
          check a reference against its tolerance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current: the gap most buyers miss</h2>
        <p className="text-muted leading-7 mb-4">
          On a spec sheet both meters &quot;measure 10 A&quot;, but the 115 has only 6 A and 10 A ranges. Its best
          resolution is 1 mA, and it has no separate mA or µA jack. The 87V adds both low-current ranges and resolves
          DC current to 0.01 µA, which is 100,000 times finer.
        </p>
        <Figure caption={<>Where each meter can resolve current, on a log scale. Signal markers show typical values, not limits.</>}>
          <CurrentReachDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two common jobs show why it matters. A 4-20 mA transmitter loop has a 16 mA span, so on the 115 each 1 mA
          step is 1 ÷ 16 = 6.25% of the span: you can see the loop is alive, but not whether it reads 50% or 53%.
          A furnace flame sensor usually runs a few microamps, which the 115 can&apos;t see at all. If either job is
          on your list, see our guides to{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            multimeters for 4-20 mA loop testing
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            measuring microamps
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature, recording and drive work</h2>
        <DataTable
          head={["Feature", "Fluke 115", "Fluke 87V"]}
          rows={[
            ["Thermocouple input", "None", "-200 to 1090 °C, 80BK probe (-40 to 260 °C) in the box"],
            ["Min/Max recording", "Min/Max/Avg with elapsed time", "Min/Max"],
            ["Fast-event capture", "No", "250 µs Peak Capture"],
            ["VFD output reading", "No filter; carrier inflates it", "Low-pass filter, 3 dB at 1 kHz"],
            ["Duty cycle", "Not stated", "Yes"],
            ["High-resolution mode", "No", "19,999 counts"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Min/Max isn't the same as Peak Capture">
            Both meters can hold the highest and lowest reading while a load cycles, which catches a slow sag during a
            compressor start. A contact bounce or a brief dropout can come and go faster than an ordinary Min/Max
            update. The 87V&apos;s Peak Capture is specified for events as short as 250 µs; the 115 has nothing
            equivalent, so a very short glitch can pass unrecorded.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 or 87V: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Home wiring, outlets, appliances", "Fluke 115", "CAT III 600V and True RMS cover it; the 87V's extras sit idle"],
            ["Field service on equipment under 600 V", "Fluke 115", "Volts, 10 A, capacitance and frequency in one meter"],
            ["Meter base, service drop, outdoor feeders", "Fluke 87V", "CAT IV 600V; the 115 isn't rated there"],
            ["Solar strings or 690 V plant", "Fluke 87V", "Rated to 1000 V"],
            ["Furnace flame sensors", "Fluke 87V", "µA range; the 115 resolves only 1 mA"],
            ["Instrument and 4-20 mA loops", "Fluke 87V", "mA range and 0.05% DC accuracy"],
            ["VFD and motor troubleshooting", "Fluke 87V", "Low-pass filter and Peak Capture"],
            ["Duct, pipe or bearing temperature", "Fluke 87V", "Thermocouple input with probe included"],
            ["Electronics bench, hobby repair", "Fluke 115", "Same capacitance range; µA work is better served by a bench meter or the 87V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 115 if any 87V row above describes your regular work: no setting or accessory adds CAT IV, µA or
          temperature to it later. Skip the 87V if you never leave CAT III, never need low current and never see a
          drive; you&apos;d be paying for a lifetime warranty on features you won&apos;t touch. If you want the 115&apos;s
          core plus non-contact detection and LoZ, read{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>
          ; for the cheaper route to CAT IV, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          .
        </p>
      </section>

      <Callout title="Match the rating to where you probe">
        A CAT III 600V meter like the 115 is built for transients inside the building, not for the higher-energy
        surges at the utility connection. Using it at a meter socket, or using either meter with damaged or lower-rated
        leads, gives up the protection the rating describes. Prove the meter on a known live source before and after a
        dead test, and leave utility-side work to a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For most electricians, technicians and serious DIYers working inside buildings, the Fluke 115 measures everything they need with True RMS accuracy and Fluke durability. The Fluke 87V earns its place when the job needs CAT IV or 1000 V, low-current ranges, temperature, 0.05% DC accuracy or drive-friendly filtering, and its lifetime warranty makes it a meter you buy once.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 115 and the Fluke 87V?",
      answer:
        "Scope. The 115 is a CAT III 600V field-service meter with True RMS, 10 A current and capacitance. The 87V is an industrial meter rated CAT IV 600V and CAT III 1000V, with about ten times tighter DC accuracy, mA and µA ranges, temperature, a 19,999-count mode, a drive low-pass filter, Peak Capture and a lifetime warranty.",
    },
    {
      question: "Can the Fluke 115 measure milliamps or microamps?",
      answer:
        "Not usefully. Its only current ranges are 6 A and 10 A, with 1 mA as the finest step, and there is no separate mA or µA input. Small currents such as a 4-20 mA loop show only in coarse 1 mA steps, and flame-sensor microamps don't register. The Fluke 87V has dedicated mA and µA ranges.",
    },
    {
      question: "Is the Fluke 87V lighter than the Fluke 115?",
      answer:
        "Yes, bare. Fluke lists the 87V at 355 g and the 115 at 550 g. Once the 87V is in its holster it weighs 624 g, so in everyday carry the two feel similar. Fluke gives the 115's size as 167 × 84 × 46 mm; the 87V's dimensions aren't in the specifications we used.",
    },
    {
      question: "Does either meter have non-contact voltage detection or LoZ?",
      answer:
        "No. The 115 lacks VoltAlert and the low-impedance AutoVolt input, which in the 110 Series belong to the Fluke 117. Fluke lists neither feature for the 87V. Owners of either meter typically carry a separate pen-style voltage detector and load-test suspicious readings on disconnected conductors.",
    },
    {
      question: "Is the Fluke 87V worth it over the 115 for a home electrician?",
      answer:
        "Usually not. Household circuits sit in CAT III, rarely exceed 240 V, and seldom need microamps, temperature or 0.05% accuracy, so the 115 covers the work. The 87V makes sense if you also service furnaces, work on drives or solar, or want one meter for life under Fluke's lifetime warranty.",
    },
    {
      question: "Do the Fluke 115 and 87V have the same battery life?",
      answer:
        "Close to it. Fluke rates the 115 at about 400 hours typical on one 9 V alkaline battery with the backlight off, and the 87V at about 400 hours as well. Running the backlight shortens the 115's figure, so keep a spare battery in the case for long service days.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke115VsFluke87VPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
