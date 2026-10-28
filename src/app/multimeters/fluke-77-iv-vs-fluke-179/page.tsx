// Specs per Fluke, checked 2026-10-28:
// - Fluke 77 IV product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-77-iv
//   "Average responding AC measurements"; 6000 counts, 33-segment bar graph; backlight; Min/Max; auto/manual ranging;
//   DC V 6.000 V to 1000 V ±(0.3% + 1); AC V 600.0 mV to 1000 V ±(2.0% + 2); DC A 60.00 mA to 10 A ±(1.5% + 2),
//   AC A ±(2.5% + 2), 0.01 mA resolution, 10 A continuous (20 A for 30 s); 50 MΩ ±(0.5% + 1); 1 nF to 9,999 µF
//   ±(1.2% + 2); 99.99 kHz ±(0.1% + 1); CAT III 1000V / CAT IV 600V; 9 V, 400 h typical; 420 g. Warranty, IP rating and
//   temperature function: not stated. Amazon listing B000U8WQ4U is titled "Fluke 77-4 Automotive Digital Multimeter".
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   and the 170 Series datasheet, as cited on /multimeters/fluke-117-vs-fluke-179 and /multimeters/fluke-289-vs-fluke-179:
//   True RMS; 6,000 counts, analog bar graph, backlight; DC V ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3); 10 A,
//   0.01 mA best resolution; 50 MΩ; 10,000 µF (one Fluke table says 9,999 µF); 100 kHz ±(0.1% + 1); temperature -40 °C
//   to 400 °C ±(1.0% + 10) with the included 80BK probe; Auto Hold and Min/Max-Average; no low-pass filter or LoZ listed;
//   one 9 V, about 200 h; 420 g; CAT III 1000V / CAT IV 600V; lifetime warranty.
// Standard engineering values (hedged on the page): a drive's DC bus sits near 1.35 × the line-to-line RMS voltage;
// NEMA defines voltage unbalance as the largest deviation from the average divided by the average.
// Neither meter is hands-on tested by OhmSavvy; this page is desk research against Fluke's published specifications.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-77-iv-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 77 IV vs Fluke 179 for Maintenance",
  description:
    "Fluke 77 IV vs 179 comparison for electrical maintenance: same CAT IV 600V rating, but the 179 adds True RMS, temperature and tighter accuracy. Which to carry.",
  image: all.find((p) => p.name === "Fluke 77 IV")!.image,
  path: "/multimeters/fluke-77-iv-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Three test points on a drive-fed motor circuit and which meter each one suits. */
function DriveTestPointsDiagram() {
  const blocks = [
    { x: 12, label: "480 V supply", sub: "line side" },
    { x: 128, label: "VFD", sub: "rectifier, DC bus, inverter" },
    { x: 244, label: "Motor", sub: "PWM output" },
  ];
  const points = [
    { x: 100, n: "1", title: "Line current", v1: "Pulsed draw", v2: "179: True RMS", v3: "77 IV: reads low" },
    { x: 186, n: "2", title: "DC bus", v1: "Roughly 650 V DC", v2: "Both: DC volts", v3: "1000 V range" },
    { x: 290, n: "3", title: "Motor leads", v1: "PWM chopped", v2: "Neither lists", v3: "a low-pass filter" },
  ];
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a drive-fed motor with three test points: line-side current, where the True RMS Fluke 179 reads correctly and the average-responding Fluke 77 IV reads low; the DC bus at roughly 650 volts, where both meters' DC volts and 1000 V range work; and the motor leads, where neither meter lists the low-pass filter that PWM output needs."
    >
      {blocks.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="24" width="84" height="44" rx="8" className="fill-surface stroke-border" strokeWidth="1.3" />
          <text x={b.x + 42} y="43" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {b.label}
          </text>
          <text x={b.x + 42} y="58" fontSize="8" textAnchor="middle" className="fill-muted">
            {b.sub}
          </text>
        </g>
      ))}
      <line x1="96" y1="46" x2="128" y2="46" className="stroke-accent" strokeWidth="2.5" />
      <line x1="212" y1="46" x2="244" y2="46" className="stroke-accent" strokeWidth="2.5" />
      {points.map((p) => (
        <g key={p.n}>
          <line x1={p.x - 2} y1="70" x2={p.x - 2} y2="96" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={p.x - 2} cy="106" r="10" className="fill-accent" />
          <text x={p.x - 2} y="110" fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff">
            {p.n}
          </text>
          <text x={p.x - 2} y="134" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
            {p.title}
          </text>
          <text x={p.x - 2} y="148" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {p.v1}
          </text>
          <text x={p.x - 2} y="162" fontSize="8.5" textAnchor="middle" className="fill-accent">
            {p.v2}
          </text>
          <text x={p.x - 2} y="176" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {p.v3}
          </text>
        </g>
      ))}
      <text x="170" y="202" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Bus voltage is a typical value for a 480 V drive, not a spec of either meter.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 77 IV vs Fluke 179: Differences for Electrical Maintenance",
  path,
  published: "2026-10-28",
  intro:
    "For electrical maintenance the Fluke 179 is the stronger meter: it is True RMS, it measures temperature with the supplied 80BK probe, and its DC and AC voltage accuracy is tighter. The Fluke 77 IV matches it on safety (CAT IV 600V / CAT III 1000V), the 10 A input and 0.01 mA resolution, and it runs about twice as long on a 9 V battery, but its AC readings are average responding. On a plant floor full of drives, LED fixtures and electronic controls, that difference decides it.",
  a: {
    pick: all.find((p) => p.name === "Fluke 77 IV")!,
    imageAlt: "Fluke 77 IV general-purpose digital multimeter, front view with fused current jacks",
    chooseIf: [
      "Your maintenance rounds are mostly voltage, continuity and resistance checks on sine-wave equipment",
      "You want about 400 hours from a 9 V battery rather than about 200",
      "You already carry a separate thermometer and a clamp meter for current",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter with backlit display and analog bar graph, front view",
    chooseIf: [
      "You maintain drives, LED lighting, UPS systems or other nonlinear loads",
      "You check motor, bearing or termination temperatures and want the probe in the same case",
      "You log readings against limits and want tighter voltage accuracy and a lifetime warranty",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Average responding", b: "True RMS" },
    { label: "DC volts accuracy", a: "±(0.3% + 1)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(2.0% + 2)", b: "±(1.0% + 3)" },
    { label: "DC amps accuracy", a: "±(1.5% + 2)", b: "±(1.0% + 3)" },
    { label: "Current", a: "To 10 A; 0.01 mA resolution", b: "To 10 A; 0.01 mA resolution" },
    { label: "Temperature", a: "No", b: "-40 °C to 400 °C, 80BK probe included" },
    { label: "Resistance", a: "To 50 MΩ", b: "To 50 MΩ" },
    { label: "Capacitance", a: "To 9,999 µF", b: "To 10,000 µF (one Fluke table: 9,999 µF)" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 100 kHz" },
    { label: "Recording", a: "Min/Max", b: "Min/Max-Average, Auto Hold" },
    { label: "Weight", a: "420 g", b: "420 g" },
    { label: "Battery", a: "9 V, 400 h typical", b: "9 V, about 200 h" },
    { label: "Warranty", a: "Not stated on fluke.com", b: "Lifetime" },
  ],
  differences: [
    "Waveforms: the 179 is True RMS. The 77 IV is average responding, so AC current on drives, LED drivers and switch-mode supplies reads low.",
    "Temperature: only the 179 reads a K-type thermocouple, -40 °C to 400 °C, with the 80BK probe in the box.",
    "Voltage accuracy: the 179's DC volts are ±(0.09% + 2) against ±(0.3% + 1), and its AC volts ±(1.0% + 3) against ±(2.0% + 2).",
    "Battery: the 77 IV is rated about 400 hours on a 9 V, roughly twice the 179's 200 hours.",
    "Warranty: Fluke gives the 179 a lifetime warranty; the 77 IV's term isn't stated on fluke.com.",
    "Shared: CAT IV 600V / CAT III 1000V, 6,000 counts with a bar graph, 10 A with 0.01 mA resolution, 50 MΩ, Min/Max, a backlight and the same 420 g weight. Neither lists LoZ, non-contact voltage or a low-pass filter.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What maintenance work asks of a meter</h2>
        <InfoCards
          items={[
            { label: "Distorted current", desc: "Drives, LED lighting and UPS units draw pulsed current. Only the 179 reads it as True RMS." },
            { label: "Heat checks", desc: "Hot lugs and bearings show trouble early. Only the 179 measures temperature." },
            { label: "Trend against limits", desc: "Tighter accuracy makes small drifts visible. The 179 leads on volts." },
            { label: "Rated for the switchgear", desc: "Both are CAT IV 600V / CAT III 1000V, so both belong at the MCC." },
            { label: "Long shifts", desc: "The 77 IV's 400 h battery outlasts the 179's 200 h." },
            { label: "Ownership", desc: "Lifetime warranty on the 179; not stated for the 77 IV." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Neither meter has been tested by OhmSavvy. Everything here is desk research against Fluke&apos;s product
          pages and the 170 Series datasheet. One naming note: Amazon sells the 77 IV as the &quot;77-4
          Automotive&quot; meter, while Fluke describes it as a general-purpose meter that replaces the original 77.
          Its specification has no automotive functions, so treat it as a general electrical meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 77 IV vs 179 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper these two are the same size class: both weigh 420 g, both read 6,000 counts with a bar graph, both
          carry the same category rating and both resolve current to 0.01 mA on a 10 A meter. The rows that differ are
          the ones a maintenance technician feels: how the meter treats a distorted waveform, whether it reads
          temperature, how tight its voltage readings are, and how long the battery and warranty last.
        </p>
        <DataTable
          head={["Spec", "Fluke 77 IV", "Fluke 179", "Edge"]}
          rows={[
            ["AC response", "Average responding", "True RMS", "179"],
            ["Category rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["DC volts", "To 1000 V, ±(0.3% + 1)", "To 1000 V, ±(0.09% + 2)", "179"],
            ["AC volts", "To 1000 V, ±(2.0% + 2)", "To 1000 V, ±(1.0% + 3)", "179"],
            ["DC amps", "To 10 A, ±(1.5% + 2)", "To 10 A, ±(1.0% + 3)", "179"],
            ["Current resolution", "0.01 mA", "0.01 mA", "Same"],
            ["Resistance", "To 50 MΩ", "To 50 MΩ", "Same"],
            ["Capacitance", "To 9,999 µF", "To 10,000 µF", "Same in practice"],
            ["Frequency", "To 99.99 kHz, ±(0.1% + 1)", "To 100 kHz, ±(0.1% + 1)", "Same"],
            ["Temperature", "None", "-40 °C to 400 °C, ±(1.0% + 10)", "179"],
            ["Hold and recording", "Min/Max; HOLD key on the meter", "Min/Max-Average, Auto Hold", "179"],
            ["LoZ, NCV, low-pass filter", "None listed", "None listed", "Same"],
            ["Battery", "9 V, 400 h typical", "9 V, about 200 h", "77 IV"],
            ["Weight", "420 g", "420 g", "Same"],
            ["Warranty", "Not stated on fluke.com", "Lifetime", "179"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC and AC volts accuracy, ±% of reading. Lower is better; the 179 is tighter on both.</>}>
            <BarChart
              items={[
                { label: "DC V, Fluke 179", value: 0.09, display: "0.09% + 2", highlight: true },
                { label: "DC V, Fluke 77 IV", value: 0.3, display: "0.3% + 1" },
                { label: "AC V, Fluke 179", value: 1.0, display: "1.0% + 3", highlight: true },
                { label: "AC V, Fluke 77 IV", value: 2.0, display: "2.0% + 2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery life on one 9 V cell. The 77 IV runs roughly twice as long between changes.</>}>
            <BarChart
              items={[
                { label: "Fluke 77 IV", value: 400, display: "400 h typical", highlight: true },
                { label: "Fluke 179", value: 200, display: "About 200 h" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Drives and nonlinear loads: why True RMS matters here</h2>
        <p className="text-muted leading-7 mb-4">
          A variable-frequency drive rectifies its three-phase supply into a DC bus, then switches that bus to build
          a variable-frequency output. The rectifier draws current from the line in short pulses near each voltage
          peak, not as a smooth sine. An average-responding meter like the 77 IV assumes a sine and multiplies the
          average by 1.11, so on that pulsed current it shows less than is really flowing. The 179 computes True RMS
          and follows the actual waveform.
        </p>
        <Figure caption={<>Three places you measure on a drive-fed motor, and which meter suits each. Neither has a filter for the motor side.</>}>
          <DriveTestPointsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Point 2 is fair to both meters: the DC bus of a 480 V drive sits at roughly 1.35 × 480 ≈ 650 V DC, inside
          either meter&apos;s 1000 V range and CAT III 1000V rating. Point 3 is fair to neither. A drive&apos;s output
          is pulse-width modulated, and Fluke lists no low-pass filter on the 77 IV or the 179, so motor-side voltage
          readings can be erratic on both. If drive output work is a regular task, the Fluke 87V and 289 list a
          low-pass filter; see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-179" className={link}>
            Fluke 289 vs Fluke 179
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mt-4">
          The same logic covers the rest of a modern facility. LED high-bays, electronic ballasts, computer loads and
          UPS inputs all draw nonlinear current. On a maintenance meter that will read those circuits weekly, True RMS
          is the line between a number you can act on and one you have to second-guess.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Accuracy in maintenance terms: a 480 V unbalance check</h2>
        <p className="text-muted leading-7 mb-4">
          Spec sheet percentages are easier to judge as volts. A common maintenance check is three-phase voltage
          unbalance on a motor feed, using the NEMA definition: the largest deviation from the average of the three
          line voltages, divided by that average. A 1% unbalance on a 480 V system is a 4.8 V deviation on one leg.
        </p>
        <FlowDiagram
          steps={[
            { label: "Read A-B, B-C, C-A", sub: "Same meter, same range" },
            { label: "Average the three", sub: "For example 480 V" },
            { label: "Largest deviation", sub: "For example 4.8 V" },
            { label: "Divide by average", sub: "4.8 ÷ 480 = 1.0%" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Now the meter&apos;s allowance on each reading, assuming the 600.0 V range with 0.1 V resolution. The 179
          allows 1.0% of 480 (4.8 V) plus 3 counts (0.3 V), so ±5.1 V. The 77 IV allows 2.0% of 480 (9.6 V) plus 2
          counts (0.2 V), so ±9.8 V. That worst-case band is about twice the 4.8 V deviation you are trying to see.
          In practice the same meter on the same range tends to err similarly on all three legs, which helps, but the
          spec doesn&apos;t promise it.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Worst-case allowance on one 480 V AC reading, per each meter&apos;s spec line. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 179 at 480 V", value: 5.1, display: "±5.1 V", highlight: true },
                { label: "Fluke 77 IV at 480 V", value: 9.8, display: "±9.8 V" },
                { label: "1% unbalance", value: 4.8, display: "4.8 V" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowance on a 24 V DC control supply, assuming the 60.00 V range (0.01 V steps). Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 179 at 24 V DC", value: 0.042, display: "±0.04 V", highlight: true },
                { label: "Fluke 77 IV at 24 V DC", value: 0.082, display: "±0.08 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 24 V DC row is worked the same way: 0.09% of 24 V plus 2 counts gives ±0.04 V on the 179, and 0.3% plus 1
          count gives ±0.08 V on the 77 IV. Both are fine for a go/no-go check on a control power supply. The gap
          matters when you write readings into a PM log and compare them month to month.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature on the 179: what it adds to a PM route</h2>
        <p className="text-muted leading-7 mb-4">
          The 179 reads a K-type thermocouple from -40 °C to 400 °C, rated ±(1.0% + 10 counts), and Fluke ships the
          80BK bead probe in the box. On a maintenance round that means one meter for the electrical check and the
          heat check: a lug that runs hotter than its neighbors on the same breaker, a motor frame or bearing housing
          that has crept up since last quarter, or supply and return air on an air handler. The 77 IV has no
          temperature function at all, so the same route needs a second instrument.
        </p>
        <DataTable
          head={["PM task", "Fluke 77 IV", "Fluke 179"]}
          rows={[
            ["Motor feed voltage and unbalance", "Yes, ±(2.0% + 2) per leg", "Yes, ±(1.0% + 3) per leg"],
            ["Running current through a drive or LED driver", "Reads low (average responding)", "True RMS"],
            ["Lug, bearing or frame temperature", "Separate thermometer", "80BK probe, -40 to 400 °C"],
            ["4–20 mA loop signal", "0.01 mA resolution", "0.01 mA resolution"],
            ["Run capacitor on a fan or compressor", "To 9,999 µF", "To 10,000 µF"],
            ["Control transformer secondary, 24 V AC", "Yes", "Yes"],
            ["Unattended watch for a dip", "Min/Max", "Min/Max-Average"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A thermocouple on a surface reads that point only; for a whole panel, a thermal imager is quicker, but the
          179&apos;s probe is a good confirmation tool. For HVAC-heavy maintenance, our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide covers meters with microamp ranges for flame sensors, which neither of these has.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your maintenance role", "Better fit", "Why"]}
          rows={[
            ["Plant electrician with drives on site", "Fluke 179", "True RMS on drive input current; same CAT IV rating"],
            ["Facilities tech with LED lighting and UPS", "Fluke 179", "Nonlinear current reads correctly; temperature for hot spots"],
            ["HVAC and building maintenance", "Fluke 179", "Temperature probe and capacitance in one meter"],
            ["Instrument tech on 4–20 mA loops", "Either", "Both resolve 0.01 mA; the 179 is tighter on DC volts"],
            ["Spare meter for voltage-only rounds", "Fluke 77 IV", "Same safety rating, twice the battery life"],
            ["Electrician who wants LoZ and NCV", "Neither", "Look at the Fluke 117 for building wiring"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For electricians weighing the 77 IV against a wiring-focused meter instead, read{" "}
          <Link href="/multimeters/fluke-77-iv-vs-fluke-117" className={link}>
            Fluke 77 IV vs Fluke 117
          </Link>
          . To see the 179 against its smaller siblings, read{" "}
          <Link href="/multimeters/fluke-177-vs-fluke-179" className={link}>
            Fluke 177 vs Fluke 179
          </Link>
          , and for the wider field, our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <div className="mt-4">
          <KeyIdea title="Same armor, different instruments">
            The 77 IV and 179 share a safety rating, a weight and a 10 A input, so it is tempting to call them
            equivalent. They aren&apos;t. The 179 reads distorted current correctly, measures heat and holds tighter
            voltage limits, which are the three things a maintenance log depends on. The 77 IV&apos;s advantage is
            battery life.
          </KeyIdea>
        </div>
      </section>

      <Callout title="Safety on maintenance rounds">
        Both meters are rated CAT IV 600V / CAT III 1000V, but that protects you only with matching leads and within
        your training. De-energize and lock out before touching conductors, prove the meter on a known live source
        before and after testing, and keep probes off the motor side of a running drive unless you know its output
        voltage. A drive&apos;s DC bus stays charged after power is removed; wait the time on its label and verify with
        the meter. Arc-flash labeled equipment needs the PPE and permit your site requires.
      </Callout>
    </>
  ),
  bottomLine:
    "For electrical maintenance, buy the Fluke 179. It shares the 77 IV's CAT IV 600V / CAT III 1000V rating, 10 A input and 0.01 mA resolution, then adds True RMS for drives and LED loads, a temperature probe for hot spots, tighter voltage accuracy and a lifetime warranty. The 77 IV makes sense only as a voltage-and-continuity meter on clean sine-wave equipment, where its roughly 400-hour battery life is its real advantage.",
  faqs: [
    {
      question: "Is the Fluke 179 True RMS and the 77 IV not?",
      answer:
        "Yes. Fluke lists the 179 as True RMS, and it describes the 77 IV's AC function as average responding. On sine-wave loads both agree. On pulsed current from drives, LED drivers and switch-mode supplies, the 77 IV reads low because it assumes a sine wave. For maintenance on modern facilities, that is the main reason to choose the 179.",
    },
    {
      question: "Can the Fluke 77 IV measure temperature?",
      answer:
        "No. Fluke's 77 IV specification lists no temperature function. The Fluke 179 reads a K-type thermocouple from -40 °C to 400 °C at ±(1.0% + 10) and ships with the 80BK bead probe. If you check lug, motor or bearing temperatures on PM rounds, the 179 saves carrying a separate thermometer.",
    },
    {
      question: "Do the Fluke 77 IV and 179 have the same safety rating?",
      answer:
        "Yes. Both are rated CAT IV 600V and CAT III 1000V, so both can be used at service equipment, motor control centers and 480 V panels within those limits. Use leads rated to match, and remember the rating doesn't cover the PWM output of a drive, where neither meter lists a low-pass filter.",
    },
    {
      question: "Which has better battery life, the Fluke 77 IV or 179?",
      answer:
        "The 77 IV. Fluke rates it at about 400 hours typical on a 9 V alkaline battery, against about 200 hours for the 179. Both use a single 9 V cell. If the meter lives in a truck and gets used a few minutes at a time, either lasts a long while; on long logging sessions with Min/Max, the 77 IV goes further.",
    },
    {
      question: "Is the Fluke 179 accurate enough for voltage unbalance checks?",
      answer:
        "It is better than the 77 IV for it. On a 480 V reading, the 179's spec allows about ±5.1 V against ±9.8 V for the 77 IV. A 1% unbalance is a 4.8 V deviation, so the worst-case band of either meter is close to or larger than the effect. Use one meter on one range for all three legs and record trends.",
    },
    {
      question: "Can either meter read a VFD's output voltage?",
      answer:
        "Not reliably. A drive's output is pulse-width modulated, and Fluke lists no low-pass filter on the 77 IV or the 179, so motor-side voltage can read high or erratic on both. On the drive's input side the 179's True RMS helps with current, and both read the DC bus. For output measurements, the Fluke 87V and 289 have a filter.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 77 IV vs Fluke 117", href: "/multimeters/fluke-77-iv-vs-fluke-117" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke77IvVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
