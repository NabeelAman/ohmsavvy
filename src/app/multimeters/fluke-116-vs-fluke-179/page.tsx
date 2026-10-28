// Specs per sources already cited in this repo (no new sources added on this page, checked 2026-10-29):
// - Fluke 116: the Fluke 116 Pick in src/lib/multimeter-catalog.ts ("Specs per fluke.com (Fluke 116 product page and
//   spec table)") and the spec comments on /multimeters/fluke-114-vs-fluke-116, fluke-116-vs-fluke-115 and
//   fluke-116-vs-fluke-117 (fluke.com 116 page and the 114/115/116/117 datasheet 2793260b): 600.0 µA AC/DC at 0.1 µA,
//   DC ±(1.0% + 2), AC ±(1.5% + 3); no mA or A ranges; Type K -40 to 400 °C at 0.1 °C, ±(1% + 10), probe error excluded,
//   80BK probe in the box; Auto V/LoZ (about 3 kΩ) 600.0 V ±(2.0% + 3); DC mV 600.0 mV ±(0.5% + 2); DC V ±(0.5% + 2);
//   AC V ±(1.0% + 3); capacitance 1 nF to 9,999 µF ±(1.9% + 2) (100.0 µF range, 0.1 µF steps); 40.00 MΩ; 50.00 kHz;
//   6,000 counts + 33-segment bar graph, backlit (per the Pick); Min/Max/Avg; CAT III 600 V; 9 V, 400 h;
//   167 × 84 × 46 mm; 550 g; 3-year warranty; auto-ranging not stated (the Pick notes a manual RANGE button).
// - Fluke 179: the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx ("Specs per fluke.com (Fluke 179
//   product page) and the Fluke 170 Series datasheet") and the spec comments on /multimeters/fluke-177-vs-fluke-179,
//   fluke-175-vs-fluke-179 and fluke-117-vs-fluke-179: DC V ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3), AC A
//   ±(1.5% + 3); ranges 60.00 mA (0.01 mA), 400.0 mA, 6.000 A, 10.00 A (20 A for 30 s); no µA range; 50 MΩ;
//   capacitance ±(1.2% + 2) to 10,000 µF; 100 kHz; temperature -40 to 400 °C, ±(1.0% + 10), 0.1 °C, 80BK probe in the
//   box; 6,000 counts + 33-segment bar graph, backlight (Fluke 170 Series detailed specifications, Pub 10824-eng);
//   no LoZ; Hold, Auto Hold, Min/Max-average; CAT III 1000 V / CAT IV 600 V; 9 V, about 200 h; 43 × 90 × 185 mm;
//   420 g; lifetime warranty. Conflict on Fluke's 179 page: its comparison table lists µA, 9,999 µF and "400 °F",
//   while its spec table gives 0.01 mA best current resolution, 10,000 µF and 400 °C. We follow the spec table.
// - Fluke 902 FC (mentioned as a pairing only): the Pick in src/lib/multimeter-catalog.ts (200 µA DC range, 0.1 µA).
// Flame-signal levels, the 45 µF capacitor and the 2.5 µA reading are illustrative, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-116-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 116 vs Fluke 179 for HVAC Troubleshooting",
  description:
    "Fluke 116 vs 179 comparison for HVAC work: the 116 reads flame-sensor microamps with LoZ; the 179 adds amps to 10 A, CAT IV 600V and a lifetime warranty.",
  image: all.find((p) => p.name === "Fluke 116")!.image,
  path: "/multimeters/fluke-116-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Log-scale map of what each meter's current input can resolve, from 0.1 µA to 10 A. Bands are illustrative. */
function CurrentReachDiagram() {
  // x = 30 + (log10(amps) + 7) * 37.5 : 0.1 µA at 30, 10 A at 330
  const ticks: [number, string][] = [
    [30, "0.1µA"],
    [67.5, "1µA"],
    [105, "10µA"],
    [142.5, "100µA"],
    [180, "1mA"],
    [217.5, "10mA"],
    [255, "100mA"],
    [292.5, "1A"],
    [330, "10A"],
  ];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale chart of current from 0.1 microamp to 10 amps: the Fluke 116 covers 0.1 microamp to 600 microamps, which includes the flame-sensor band; the Fluke 179 covers 10 microamps to 10 amps, which includes control-circuit and small motor current but starts above most flame signals"
    >
      <text x="180" y="14" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">
        Where each meter&apos;s current input can see
      </text>
      <rect x="67.5" y="24" width="37.5" height="150" className="fill-accent" opacity="0.12" />
      <text x="86" y="36" fontSize="8" textAnchor="middle" className="fill-muted">flame</text>
      <rect x="255" y="24" width="37.5" height="150" className="fill-accent" opacity="0.08" />
      <text x="274" y="36" fontSize="8" textAnchor="middle" className="fill-muted">controls</text>
      <rect x="292.5" y="24" width="37.5" height="150" className="fill-accent" opacity="0.12" />
      <text x="311" y="36" fontSize="8" textAnchor="middle" className="fill-muted">motors</text>
      <rect x="30" y="56" width="141.7" height="18" rx="4" className="fill-accent" />
      <text x="34" y="52" fontSize="9" className="fill-foreground">Fluke 116: 0.1 µA steps, stops at 600 µA</text>
      <rect x="105" y="104" width="225" height="18" rx="4" className="fill-accent" opacity="0.55" />
      <text x="109" y="100" fontSize="9" className="fill-foreground">Fluke 179: 0.01 mA steps up to 10 A</text>
      <line x1="30" x2="330" y1="174" y2="174" className="stroke-border" strokeWidth="1" />
      {ticks.map(([x, l]) => (
        <g key={l}>
          <line x1={x} x2={x} y1="171" y2="177" className="stroke-border" strokeWidth="1" />
          <text x={x} y="190" fontSize="7.5" textAnchor="middle" className="fill-muted">
            {l}
          </text>
        </g>
      ))}
      <text x="180" y="150" fontSize="8" textAnchor="middle" className="fill-muted">
        Shaded bands are illustrative, not spec figures
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 116 vs Fluke 179: Which Is Better for HVAC Troubleshooting?",
  path,
  published: "2026-10-29",
  intro:
    "For furnace and boiler service the Fluke 116 is the better HVAC meter, because it is the only one of the two that can read a flame-rod signal: its 600.0 µA range steps in 0.1 µA, while the 179's smallest current step is 0.01 mA, a hundred times coarser. The Fluke 179 wins everywhere else a tech pushes current through the leads, up to 10 A, and it adds CAT IV 600V, tighter DC accuracy and a lifetime warranty. Both read Type K temperature with the same published accuracy. This Fluke 116 vs 179 comparison maps each spec to an HVAC task so you can see which gap matters for your calls.",
  a: {
    pick: all.find((p) => p.name === "Fluke 116")!,
    imageAlt: "Fluke 116 HVAC multimeter with microamp and temperature functions, front view",
    chooseIf: [
      "Most of your calls are gas furnaces and boilers with flame-rod or flame-rectification ignition",
      "You get confusing voltages on thermostat cable and want a LoZ input to drain them",
      "You already own a clamp meter for blower and compressor amps",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter with backlit display and bar graph, front view",
    chooseIf: [
      "You split your time between HVAC and general building or plant maintenance",
      "You want in-series current from 0.01 mA to 10 A for control circuits and small motors",
      "You work near service equipment where CAT IV 600V applies, or want a lifetime warranty",
    ],
  },
  extraSpecs: [
    { label: "Microamp range", a: "600.0 µA AC/DC, 0.1 µA steps", b: "None (finest step 0.01 mA)" },
    { label: "mA and A ranges", a: "None", b: "60 mA, 400 mA, 6 A, 10 A (20 A for 30 s)" },
    { label: "Temperature", a: "-40 to 400 °C, ±(1% + 10), Type K", b: "-40 to 400 °C, ±(1.0% + 10), Type K" },
    { label: "Probe in the box", a: "80BK", b: "80BK" },
    { label: "LoZ input", a: "Yes, AutoVolt, about 3 kΩ", b: "No" },
    { label: "Capacitance", a: "To 9,999 µF, ±(1.9% + 2)", b: "To 10,000 µF, ±(1.2% + 2)" },
    { label: "DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3)" },
    { label: "Resistance / frequency", a: "40 MΩ / 50 kHz", b: "50 MΩ / 100 kHz" },
    { label: "Display", a: "6,000 counts, 33-segment bar graph, backlight", b: "6,000 counts, 33-segment bar graph, backlight" },
    { label: "Auto-ranging", a: "Not stated by Fluke (manual RANGE button)", b: "Yes, with manual override" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Battery", a: "9 V, about 400 h", b: "9 V, about 200 h" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "43 × 90 × 185 mm, 420 g" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Current is split down the middle: the 116 covers 0.1 µA to 600 µA and nothing higher, while the 179 starts at 0.01 mA steps and runs to 10 A. Neither one spans both.",
    "Only the 116 has a low-impedance AutoVolt input, which bleeds off induced voltage on idle thermostat and control conductors.",
    "Temperature is a tie on paper: both list -40 to 400 °C at 0.1 °C with a ±(1% + 10) tolerance and ship with the 80BK bead probe.",
    "The 179 is rated CAT III 1000V and CAT IV 600V; the 116 stops at CAT III 600V.",
    "The 179 reads capacitance at ±(1.2% + 2) against the 116's ±(1.9% + 2), and DC volts at 0.09% against 0.5%.",
    "The 116 runs about twice as long per 9 V cell (400 h vs 200 h); the 179 is 130 g lighter and carries a lifetime warranty instead of three years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Six HVAC checks, two meters</h2>
        <p className="text-muted leading-7 mb-4">
          A no-heat or no-cool call tends to run through the same handful of measurements. Here is how each meter
          handles them, using only Fluke&apos;s published figures. This is desk research against maker specs; we
          have not run either meter on a furnace ourselves.
        </p>
        <InfoCards
          items={[
            { label: "Flame signal", desc: "116 reads it in 0.1 µA steps. 179 shows 0.00 mA on a typical signal." },
            { label: "Run capacitor", desc: "Both read it. 179's tolerance is a little tighter." },
            { label: "Supply / return air", desc: "Identical spec on both, 80BK probe included with each." },
            { label: "24 V control voltage", desc: "Same AC accuracy. 116 adds LoZ to sort ghost readings." },
            { label: "Inducer or blower amps", desc: "179 in series to 10 A. 116 can't; use a clamp." },
            { label: "Disconnect and panel", desc: "Both fine at CAT III. 179 also CAT IV 600V." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The current gap, drawn to scale</h2>
        <p className="text-muted leading-7 mb-4">
          The single biggest difference in this Fluke 116 vs 179 comparison is where each current input lives on
          the scale. Plot both on a logarithmic axis and they barely overlap: the 116 covers roughly four decades at
          the very bottom, and the 179 covers six decades starting just above it.
        </p>
        <Figure
          caption={
            <>
              The 116 resolves 0.1 µA but tops out at 600 µA. The 179 resolves 10 µA (0.01 mA) and reaches 10 A. The
              flame, control and motor bands are rough illustrative zones; your equipment&apos;s manual sets the real
              figures.
            </>
          }
        >
          <CurrentReachDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Flame-rectification signals are small. Furnace makers generally specify them in single-digit microamps, and
          the exact minimum is printed in the equipment manual. Take an illustrative 2.5 µA reading. On the 116&apos;s
          DC µA line, the tolerance is 1.0% of 2.5 µA (0.025 µA) plus 2 counts of 0.1 µA, about ±0.23 µA, so the
          display shows something close to 2.5 and you can compare it with the manual. On the 179&apos;s 60.00 mA
          range one count is 10 µA, so the same 2.5 µA is a quarter of a single digit and the display reads 0.00.
          That is not a matter of precision: the 179 simply cannot see the signal.
        </p>
        <p className="text-muted leading-7 mt-4">
          Turn the problem around and the 116 fails just as completely. A thermostat heat anticipator, a damper
          actuator or a gas valve coil draws current measured in tenths of an amp, and small inducer and blower
          motors draw amps. The 116&apos;s input ends at 600 µA, well under one milliamp, so none of that can go
          through its leads. The 179 handles it on its 400 mA, 6 A and 10 A ranges. Our{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            guide to measuring microamps
          </Link>{" "}
          covers the series hookup for flame rods.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitors and temperature: closer than you&apos;d think</h2>
        <p className="text-muted leading-7 mb-4">
          On run and start capacitors both meters do the job. Work it through on an illustrative 45 µF label value,
          which falls on each meter&apos;s 100.0 µF range with 0.1 µF steps. The 116 allows 1.9% of 45 (0.855 µF)
          plus 2 counts (0.2 µF), so about ±1.06 µF. The 179 allows 1.2% of 45 (0.54 µF) plus 0.2 µF, about ±0.74 µF.
          A typical ±6% capacitor tolerance on 45 µF is ±2.7 µF, so either meter can tell a good part from one that
          has drifted out of spec. The 179&apos;s edge only matters when a reading lands right at the tolerance line.
        </p>
        <Figure caption={<>Meter tolerance on an illustrative 45 µF run capacitor, compared with a ±6% part tolerance.</>}>
          <BarChart
            items={[
              { label: "Fluke 116", value: 1.06, display: "±1.06 µF" },
              { label: "Fluke 179", value: 0.74, display: "±0.74 µF", highlight: true },
              { label: "Part tolerance (±6%)", value: 2.7, display: "±2.7 µF" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Temperature is a genuine draw. Fluke publishes the same range, resolution and ±(1% + 10) tolerance for both,
          excluding probe error, and puts an 80BK bead probe in each box. Ten counts at 0.1 °C is 1.0 °C, so a 13 °C
          supply-air reading carries roughly ±1.1 °C on either meter. If you calculate temperature split, the probe
          and where you place it will move the result more than the choice between these two. See{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            how to check a thermocouple with a multimeter
          </Link>{" "}
          for the pilot-generator side of temperature work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Ghost voltage on control wiring</h2>
        <p className="text-muted leading-7 mb-4">
          Thermostat cable often runs alongside line-voltage conductors, and an unused or open conductor can pick up
          a few volts by capacitive coupling. A standard high-impedance input reports that voltage faithfully, which
          can send you chasing a fault that isn&apos;t there. The 116&apos;s AutoVolt position drops the input to
          about 3 kΩ, enough load to collapse a coupled reading while a real 24 V source holds steady. Fluke lists
          no LoZ mode for the 179, so on that meter you have to judge suspicious readings by context, for example by
          checking whether the voltage stays put when the thermostat calls. Our page on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          explains the mechanism.
        </p>
        <KeyIdea title="Same AC accuracy at 24 V">
          Both meters list True RMS AC volts at ±(1.0% + 3). On a 24.00 V control transformer reading that is 0.24 V
          plus 3 counts of 0.01 V, about ±0.27 V on either one. The LoZ input, not accuracy, is what separates them on
          control circuits.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Why"]}
          rows={[
            ["Residential gas heat, lots of no-heat calls", "Fluke 116", "Reads flame-rod µA directly"],
            ["Cooling-heavy work: condensers, heat pumps", "Fluke 179", "Amps to 10 A, tighter capacitance"],
            ["Commercial building or plant maintenance", "Fluke 179", "Broader electrical coverage, CAT IV"],
            ["Thermostat and zoning troubleshooting", "Fluke 116", "LoZ sorts induced voltage"],
            ["You already carry a µA-capable clamp", "Fluke 179", "The clamp covers flame signals"],
            ["You already carry an amp clamp", "Fluke 116", "The clamp covers motor current"],
            ["One meter for decades of use", "Fluke 179", "Lifetime warranty vs 3 years"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pairing rows matter most. Neither meter covers every HVAC current, so think in two-tool kits. A 116 plus
          any amp clamp covers flame signals, capacitors, temperature and motor draw. A 179 plus a clamp with a
          microamp function, such as the Fluke 902 FC with its 200 µA DC range, gets you to the same place with the
          179&apos;s CAT IV rating and lifetime warranty on the meter. Our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          pick up from here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should skip each one</h2>
        <p className="text-muted leading-7 mb-4">
          Skip the 116 if you rarely see gas ignition problems, or if you want one meter that also handles general
          electrical work: with no milliamp or amp ranges it can&apos;t check a fuse-protected control circuit&apos;s
          draw, a doorbell transformer load or a small motor. Its CAT III 600V rating also rules it out for work at
          the service entrance. Skip the 179 if flame-sensor checks are a weekly job and you don&apos;t want a second
          tool, or if battery life matters: Fluke quotes about 200 hours against the 116&apos;s 400.
        </p>
        <p className="text-muted leading-7">
          Already narrowing it down within one family? Compare the 116 with its siblings in{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-115" className={link}>
            Fluke 116 vs 115 for HVAC
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-117" className={link}>
            Fluke 116 vs 117
          </Link>
          , or see whether you need the 179 at all in{" "}
          <Link href="/multimeters/fluke-177-vs-fluke-179" className={link}>
            Fluke 177 vs 179
          </Link>
          , since the 177 drops only the thermometer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A conflict on Fluke&apos;s 179 page</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke&apos;s own 179 product page disagrees with itself. Its model comparison table names microamps as an
          extra function and gives 9,999 µF and &quot;400 °F&quot;, while the detailed spec table on the same page
          lists 0.01 mA as the best current resolution, 10,000 µF and an upper temperature of 400 °C. We follow the
          spec table, which matches the Fluke 170 Series datasheet. If microamps are why you are looking at the 179,
          treat that as unconfirmed and plan on the 116 or a µA clamp for flame work.
        </p>
        <Callout title="Live-circuit safety on HVAC equipment">
          Flame-rod checks are made with the appliance running, and the burner compartment has 120 V present even
          though the signal you read is tiny. Condensers and rooftop units may be fed at 208 to 480 V. Keep within
          each meter&apos;s rating (CAT III 600V for the 116), prove the meter on a known live source before and after
          a dead test, and never put test leads in the current jacks to read voltage. If you smell gas, leave the
          building and call the gas utility or 911 from outside.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Fluke 116 if gas heating calls are your bread and butter: it is the only one of the two that reads flame-sensor microamps, and its LoZ input helps on thermostat wiring, but plan on a clamp for motor amps. Choose the Fluke 179 if HVAC is part of a broader maintenance job: it measures current to 10 A, carries CAT IV 600V and a lifetime warranty, and reads temperature to the same spec, but it needs a µA clamp for flame rods.",
  faqs: [
    {
      question: "Can the Fluke 179 test a flame sensor?",
      answer:
        "Not usefully. Its finest current step is 0.01 mA on the 60.00 mA range, which equals 10 µA, while flame-rectification signals are typically a few microamps. A healthy signal would display as 0.00 mA. Fluke's 179 comparison table does mention µA, but the spec table on the same page does not, so we don't rely on it.",
    },
    {
      question: "Can the Fluke 116 measure blower motor amps?",
      answer:
        "No. The 116's only current input is the 600.0 µA range, and Fluke lists no milliamp or amp ranges for it. Putting a motor in series with that input is outside its rating. Measure blower, inducer and compressor current with a clamp meter instead, which also avoids breaking into the circuit.",
    },
    {
      question: "Do the Fluke 116 and 179 read temperature the same way?",
      answer:
        "On paper, yes. Fluke lists -40 to 400 °C at 0.1 °C resolution with a ±(1% + 10) tolerance for both, excluding probe error, and each ships with an 80BK Type K bead probe. Fluke's 179 page has one table that says 400 °F, which conflicts with its own spec table; we follow the spec table.",
    },
    {
      question: "Is CAT IV 600V on the Fluke 179 needed for HVAC work?",
      answer:
        "Not for most of it. Furnaces, air handlers and condenser disconnects are downstream of the panel, where CAT III applies, and the 116's CAT III 600V rating covers that. CAT IV matters at the service drop, meter base and outdoor service conductors, so it helps techs who also do service-entrance electrical work.",
    },
    {
      question: "Which has better battery life, the Fluke 116 or 179?",
      answer:
        "The 116. Fluke quotes about 400 hours on its 9 V battery, against about 200 hours for the 179. Both use a single 9 V cell. If you keep the 179's backlight on in attics and crawl spaces, expect to change batteries more often than on a 116 used in the same conditions.",
    },
    {
      question: "Is the Fluke 116 auto-ranging?",
      answer:
        "Fluke's spec table for the 116 doesn't state it, and the meter has a manual RANGE button, so we list auto-ranging as not stated rather than guess. The 179 is listed as auto-ranging with manual override. In daily HVAC use most functions on both meters pick a sensible range without intervention.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 116 vs Fluke 115 for HVAC", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Fluke 116 vs Fluke 117", href: "/multimeters/fluke-116-vs-fluke-117" },
    { label: "Fluke 114 vs Fluke 116", href: "/multimeters/fluke-114-vs-fluke-116" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 175 vs Fluke 179", href: "/multimeters/fluke-175-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke116VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
