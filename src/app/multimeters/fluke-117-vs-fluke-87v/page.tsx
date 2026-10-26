// Specs per Fluke, checked 2026-10-26:
// - Fluke 117 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
//   (6,000 counts, 33-segment bar graph at 32/s, CAT III 600V, DC V ±(0.5% + 2), AC V ±(1.0% + 3), 6 A / 10 A only,
//   40 MΩ, 9,999 µF, 50 kHz, 167 × 84 × 46 mm, 550 g, 400 h battery, 3-year warranty)
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   (6,000 counts / 19,999 high-res, 32-segment bar graph at 40/s, CAT III 1000V / CAT IV 600V, DC V ±(0.05% + 1),
//   AC V ±(0.7% + 2), 0.01 µA DC resolution, 50 MΩ, 9,999 µF, 200 kHz, duty cycle, -200 to 1090 °C, 250 µs peak capture,
//   low-pass filter, 355 g (624 g in holster), 400 h battery, lifetime warranty)
// Correction 2026-10-26: the old page said the 117 has no bar graph. Fluke lists a 33-segment bar graph on the 117.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 87V",
  description:
    "Fluke 117 vs Fluke 87V: CAT III 600V against CAT IV 600V / CAT III 1000V, 0.5% vs 0.05% DC accuracy, LoZ vs microamps. Who needs which Fluke.",
  path: "/multimeters/fluke-117-vs-fluke-87v",
});

const link = "text-accent hover:underline";

/** Where each measurement category sits in a building, and how far each meter's rating reaches. */
function CatZonesDiagram() {
  const zones = [
    { x: 10, label: "CAT IV", sub: "Service drop, meter base", sub2: "outdoor feeders" },
    { x: 120, label: "CAT III", sub: "Panels, feeders,", sub2: "branch circuits, motors" },
    { x: 230, label: "CAT II", sub: "Receptacle loads,", sub2: "plug-in appliances" },
  ];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of measurement categories from the utility service (CAT IV) through the panel (CAT III) to plug-in loads (CAT II). The Fluke 87V's rating covers all three at 600 V; the Fluke 117's CAT III 600V rating stops at the panel."
    >
      {zones.map((z, i) => (
        <g key={z.label}>
          <rect x={z.x} y="10" width="100" height="92" rx="8" className={i === 0 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
          <text x={z.x + 50} y="32" fontSize="13" fontWeight="700" textAnchor="middle" className={i === 0 ? "fill-accent" : "fill-foreground"}>
            {z.label}
          </text>
          <text x={z.x + 50} y="56" fontSize="9" textAnchor="middle" className="fill-muted">
            {z.sub}
          </text>
          <text x={z.x + 50} y="69" fontSize="9" textAnchor="middle" className="fill-muted">
            {z.sub2}
          </text>
        </g>
      ))}
      <path d="M110 56 h10 M220 56 h10" className="stroke-foreground" strokeWidth="2" />
      <text x="170" y="94" fontSize="8.5" textAnchor="middle" className="fill-muted">energy available in a fault falls →</text>
      <rect x="10" y="118" width="320" height="22" rx="6" className="fill-accent" />
      <text x="170" y="133" fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff">
        Fluke 87V: CAT IV 600V and CAT III 1000V
      </text>
      <rect x="120" y="150" width="210" height="22" rx="6" className="fill-accent/40" />
      <text x="225" y="165" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 117: CAT III 600V
      </text>
      <text x="65" y="165" fontSize="9" textAnchor="middle" className="fill-muted">not rated here</text>
      <text x="170" y="192" fontSize="8.5" textAnchor="middle" className="fill-muted">
        A higher category covers every category below it at the same voltage.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 87V",
  path,
  published: "2026-10-26",
  intro:
    "The Fluke 117 is the electrician's meter: CAT III 600V, VoltAlert non-contact detection and a LoZ AutoVolt position for ghost voltage. The Fluke 87V is the industrial troubleshooter: CAT IV 600V and CAT III 1000V, DC accuracy ten times tighter, microamp resolution, a 19,999-count mode, peak capture and a low-pass filter for motor drives. Buy the 117 for building wiring up to the panel; buy the 87V for service entrances, 1000V systems, drives and fine readings.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "Your work stops at the panel: branch circuits, receptacles, lighting and controls",
      "You want VoltAlert non-contact detection and a LoZ check for ghost voltage in one meter",
      "You don't need microamps, temperature, 1000V or a CAT IV rating",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V industrial True RMS multimeter, front view",
    chooseIf: [
      "You measure at the service entrance, meter base or outdoor feeders, where CAT IV applies",
      "You troubleshoot variable-frequency drives and want the low-pass filter and 250 µs peak capture",
      "You need microamps for flame sensors, temperature, or 19,999-count resolution on DC",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts", b: "6,000 counts; 19,999 in high-res mode" },
    { label: "Analog bar graph", a: "33 segments, 32 updates/s", b: "32 segments, 40 updates/s" },
    { label: "Max voltage", a: "600 V AC/DC", b: "1000 V AC/DC" },
    { label: "Basic DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 45 to 500 Hz", b: "±(0.7% + 2)" },
    { label: "Current", a: "6 A and 10 A; no mA or µA ranges", b: "10 A plus mA and µA (0.01 µA DC resolution)" },
    { label: "Resistance", a: "To 40 MΩ", b: "To 50 MΩ" },
    { label: "Frequency", a: "To 50 kHz", b: "To 200 kHz, plus duty cycle" },
    { label: "Temperature", a: "No", b: "-200 °C to 1090 °C (probe extra)" },
    { label: "Non-contact voltage", a: "VoltAlert, Lo/Hi", b: "No" },
    { label: "LoZ ghost-voltage input", a: "Yes (AutoVolt)", b: "Not listed by Fluke" },
    { label: "VFD low-pass filter / peak capture", a: "No / No", b: "Yes / 250 µs" },
    { label: "Weight", a: "550 g", b: "355 g (624 g in holster)" },
    { label: "Battery life", a: "400 h typical, no backlight", b: "About 400 h, alkaline, no backlight" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Safety: the 87V is rated CAT IV 600V and CAT III 1000V; the 117 is CAT III 600V, so it isn't rated for the service drop or meter base.",
    "Precision: Fluke lists the 87V's basic DC volts accuracy at ±(0.05% + 1) against ±(0.5% + 2) on the 117, and the 87V adds a 19,999-count high-resolution mode.",
    "Low current: the 87V resolves down to 0.01 µA DC. The 117 starts at a 6 A range with 1 mA resolution, too coarse for flame sensors or standby drain.",
    "Electrician extras: only the 117 has VoltAlert non-contact detection and a LoZ AutoVolt position for ghost voltage. Fluke lists neither on the 87V.",
    "Drive work: only the 87V has a low-pass filter for variable-frequency drive outputs, 250 µs peak capture, duty cycle and temperature.",
    "Both have an analog bar graph (33 segments on the 117, 32 on the 87V), True RMS, a 9V battery rated about 400 hours, and up to 9,999 µF capacitance.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Shared ground", desc: "True RMS, bar graph, 10 A current, capacitance, frequency, 400 h battery." },
            { label: "117 advantage", desc: "VoltAlert NCV and a LoZ AutoVolt position for ghost voltage on building wiring." },
            { label: "87V advantage", desc: "CAT IV 600V / CAT III 1000V and ten times tighter DC accuracy." },
            { label: "87V for drives", desc: "Low-pass filter, 250 µs peak capture, duty cycle and 200 kHz frequency." },
            { label: "87V for HVAC", desc: "Microamp resolution for flame sensors and a thermocouple input." },
            { label: "Verdict", desc: "Residential and commercial wiring: 117. Industrial, utility-side and drives: 87V." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          OhmSavvy owns and has used both meters, which is why both carry the Hands-on Tested badge. The numbers on
          this page still come from Fluke&apos;s own product pages and specification tabs, not from our bench. For the
          full single-meter write-ups, read the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 87V spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Unlike the 115 and 117, which share one accuracy table, these two come from different Fluke families, so
          almost every line differs. The charts pick out the four numbers that change what you can safely and usefully
          measure.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, ±% of reading. Lower is better: the 87V is ten times tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 0.5, display: "±(0.5% + 2)" },
                { label: "Fluke 87V", value: 0.05, display: "±(0.05% + 1)", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest display count. More counts means finer steps on the same range.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 6000, display: "6,000" },
                { label: "Fluke 87V (high-res)", value: 19999, display: "19,999", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum frequency reading, kHz. The 87V reaches four times higher.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 50, display: "50 kHz" },
                { label: "Fluke 87V", value: 200, display: "200 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest current step, on a log scale. The 117&apos;s 1 mA is 100,000 times coarser than the 87V&apos;s 0.01 µA.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117 (6 A range)", value: 1000, display: "1 mA" },
                { label: "Fluke 87V (DC µA)", value: 0.01, display: "0.01 µA", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          To put the accuracy gap in numbers, take a 24.00 V DC control supply. Using Fluke&apos;s figures, the
          117&apos;s ±(0.5% + 2) on its 60.00 V range allows 0.12 V plus 2 counts of 0.01 V, so ±0.14 V. The
          87V&apos;s ±(0.05% + 1) allows 0.012 V plus one count, roughly ±0.02 V in its standard 6,000-count mode. For
          checking that a supply is &quot;about 24 V&quot; the 117 is plenty; for calibrating a 4-20 mA transmitter or
          trimming a reference, the 87V&apos;s margin is the reason it exists.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a 24 V supply on the 117&apos;s 60.00 V range.</>}>
            <MeterReadout value="24.03" unit="V DC" mode="117  ±0.14 V" />
          </Figure>
          <Figure caption={<>Illustrative only: the same supply on the 87V&apos;s 60.00 V range. Same digits, a much smaller error band.</>}>
            <MeterReadout value="24.03" unit="V DC" mode="87V  ±0.02 V" />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="The bar graph isn't an 87V exclusive">
            Older write-ups, including an earlier version of this page, credit only the 87V with an analog bar graph.
            Fluke&apos;s 117 spec tab lists a 33-segment bar graph refreshing 32 times a second; the 87V&apos;s has 32
            segments and refreshes 40 times a second. Both let you watch a trend while you adjust something. What the
            87V adds for fast events is the separate 250 µs peak-capture mode, which records a spike the bar graph
            would only flash.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAT III 600V vs CAT IV 600V: where each meter is allowed</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement categories describe how much energy a transient can deliver at the point you probe. Close to
          the utility transformer, a lightning-induced surge or switching spike has very little wiring impedance to
          slow it down; at a receptacle on the far end of a branch circuit, it has a lot. The IEC 61010 impulse tables
          typically set a 6 kV test for CAT III 600V and 8 kV for CAT IV 600V and CAT III 1000V. Fluke says the 87V is
          designed to withstand spikes above 8,000 V.
        </p>
        <Figure caption={<>Measurement categories from the service entrance to the outlet, and how far each meter&apos;s rating reaches.</>}>
          <CatZonesDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In practice, a residential or commercial electrician working inside panels and on branch circuits stays in
          CAT III, where the 117 is rated. Readings at the meter socket, the service conductors, an outdoor feeder or a
          utility-side disconnect are CAT IV work, and so is anything above 600 V, such as some solar strings and 690 V
          industrial distribution. That is where the 87V&apos;s rating, not its accuracy, decides the purchase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why drive technicians pick the 87V</h2>
        <p className="text-muted leading-7 mb-4">
          A variable-frequency drive builds its output from fast PWM pulses. A True RMS meter reads all of that
          high-frequency content, so the voltage on the motor leads can look far higher than the fundamental the motor
          actually responds to. The 87V&apos;s low-pass filter, per Fluke, has its 3 dB point at 1 kHz, which strips
          the carrier and leaves a reading that tracks the drive&apos;s set frequency. The 117 has no filter, so its
          readings on drive outputs are hard to interpret. Add 200 kHz frequency, duty cycle and peak capture, and the
          87V covers most of what a drive commissioning check needs short of a scope.
        </p>
        <DataTable
          head={["Task", "Fluke 117", "Fluke 87V"]}
          rows={[
            ["Receptacle and branch-circuit voltage", "Yes, CAT III 600V", "Yes"],
            ["Ghost voltage on a shared conduit", "Yes, LoZ AutoVolt", "Load-test it yourself"],
            ["First check for a live cord", "VoltAlert NCV", "Separate NCV tester"],
            ["Meter base or service conductors", "Not rated", "Yes, CAT IV 600V"],
            ["VFD output voltage", "Unfiltered, hard to read", "Low-pass filter"],
            ["Furnace flame-sensor current", "No µA range", "Yes, µA resolution"],
            ["Thermocouple temperature", "No", "Yes, probe extra"],
            ["Catching a brief dropout", "Min/Max/Avg", "Min/Max plus 250 µs peak"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 87V: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Residential electrician", "Fluke 117", "CAT III covers panels and branch circuits; NCV and LoZ save time daily"],
            ["Commercial electrician on 480 V", "Fluke 117 or 87V", "Both rated to 600 V; 87V if you also probe service gear"],
            ["Industrial maintenance tech", "Fluke 87V", "CAT IV, 1000 V, drives, temperature and peak capture"],
            ["Solar installer above 600 V DC", "Fluke 87V", "The 117 stops at 600 V"],
            ["HVAC technician", "Fluke 87V", "Microamps and temperature; the 117 has neither"],
            ["Instrument or controls tech", "Fluke 87V", "0.05% DC accuracy and µA resolution for 4-20 mA loops"],
            ["Homeowner or apprentice", "Fluke 117", "Lighter learning curve, built-in NCV, lower cost"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you need CAT IV but not the 87V&apos;s precision, the{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          comparison covers the cheaper CAT IV option, and{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs Fluke 179
          </Link>{" "}
          sets it against the 117. If the 117&apos;s extras are more than you need, see{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: the rating covers the whole setup">
        A meter&apos;s CAT rating only holds if the test leads carry the same or higher rating and are in good
        condition. Using a CAT III 600V meter at a meter base, or any meter with cracked or unrated leads, removes the
        protection the rating describes. Verify on a known live source before and after testing a circuit you expect
        to be dead. Work on utility-side equipment belongs to qualified electricians; if you aren&apos;t one, call one.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if you wire and troubleshoot buildings up to the panel: VoltAlert and LoZ solve everyday electrician problems and CAT III 600V covers the job. Buy the Fluke 87V if you work at the service entrance, above 600 V, on drives, or on anything that needs microamps, temperature or 0.05% DC accuracy. Many industrial electricians end up carrying both.",
  faqs: [
    {
      question: "Is the Fluke 87V more accurate than the Fluke 117?",
      answer:
        "Yes, by a wide margin on DC. Fluke lists the 87V's basic DC volts accuracy at ±(0.05% + 1) and the 117's at ±(0.5% + 2), so the 87V is about ten times tighter. On AC volts the gap is smaller: ±(0.7% + 2) on the 87V against ±(1.0% + 3) on the 117 from 45 to 500 Hz.",
    },
    {
      question: "Can the Fluke 117 be used on a service entrance?",
      answer:
        "It isn't rated for it. The 117 is CAT III 600V, which covers distribution panels, feeders and branch circuits inside the building. The meter base, service drop and outdoor service conductors are CAT IV locations, where transients can carry more energy. For those, use a CAT IV 600V meter such as the Fluke 87V or Fluke 179.",
    },
    {
      question: "Does the Fluke 87V have non-contact voltage detection?",
      answer:
        "No. Fluke doesn't list VoltAlert or any non-contact sensor on the 87V; it is a feature of the 117 in the 110 Series. Most 87V owners carry a separate pen-style voltage detector for quick live checks, then confirm with the test leads before touching anything.",
    },
    {
      question: "Can the Fluke 117 measure flame sensor microamps?",
      answer:
        "No. Its lowest current range is 6.000 A with 1 mA resolution, and it has no mA or µA input. Furnace flame-sensor signals are usually a few microamps, so you need a meter with a µA range, such as the Fluke 87V, which resolves 0.01 µA DC, or the Fluke 116 in the same family as the 117.",
    },
    {
      question: "Why is the Fluke 87V so much more expensive than the 117?",
      answer:
        "It is a different class of instrument. You pay for the CAT IV 600V and CAT III 1000V rating, tenfold tighter DC accuracy, a 19,999-count mode, microamp and temperature ranges, a drive low-pass filter, peak capture and a lifetime warranty instead of three years. If none of that applies to your work, the 117 measures the rest just as reliably.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke117VsFluke87VPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
