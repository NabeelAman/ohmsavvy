// Specs per Fluke, checked 2026-10-26:
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   (DC ±(0.09% + 2); AC ±(1.0% + 3); 10 A with 0.01 mA resolution; 50 MΩ; 10,000 µF; 100 kHz; −40 to 400 °C;
//   CAT III 1000 V / CAT IV 600 V; 420 g; one 9 V, about 200 h; lifetime warranty)
// - Fluke 117: 114/115/116/117 datasheet and 2020 users manual, as cited on /multimeters/fluke-115-vs-fluke-117
//   (DC ±(0.5% + 2); AC ±(1.0% + 3); 6 A / 10 A, no mA range; 40 MΩ; 9,999 µF; 50 kHz; VoltAlert; AutoVolt LoZ about 3 kΩ;
//   550 g; 9 V, 400 h typical; 3-year warranty)
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 179",
  description:
    "Fluke 117 vs Fluke 179: CAT IV 600V, NCV and LoZ compared, plus an HVAC technician breakdown and a temperature measurement comparison. Which suits you.",
  path: "/multimeters/fluke-117-vs-fluke-179",
});

const link = "text-accent hover:underline";

/** Measurement categories along a building's supply, and how far each meter's rating reaches. */
function CatZoneDiagram() {
  const zones = [
    { x: 10, w: 104, cat: "CAT IV", where: "Service drop, meter,", where2: "main disconnect" },
    { x: 118, w: 112, cat: "CAT III", where: "Panels, feeders,", where2: "fixed motors" },
    { x: 234, w: 96, cat: "CAT II", where: "Receptacles,", where2: "plug-in appliances" },
  ];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Measurement categories along a building supply: CAT IV at the service drop and meter, CAT III at panels and fixed equipment, CAT II at outlets. The Fluke 179's CAT IV 600V rating covers all three zones; the Fluke 117's CAT III 600V rating covers the panel and outlet zones but not the service entrance."
    >
      {zones.map((z, i) => (
        <g key={z.cat}>
          <rect x={z.x} y="20" width={z.w} height="78" rx="8" className={i === 0 ? "fill-accent/15 stroke-accent" : "fill-surface stroke-border"} strokeWidth="1.2" />
          <text x={z.x + z.w / 2} y="40" fontSize="12" fontWeight="700" textAnchor="middle" className={i === 0 ? "fill-accent" : "fill-foreground"}>
            {z.cat}
          </text>
          <text x={z.x + z.w / 2} y="62" fontSize="7.5" textAnchor="middle" className="fill-muted">{z.where}</text>
          <text x={z.x + z.w / 2} y="74" fontSize="7.5" textAnchor="middle" className="fill-muted">{z.where2}</text>
        </g>
      ))}
      <path d="M14 88 H326" className="stroke-foreground" strokeWidth="1.5" markerEnd="url(#catArrow)" />
      <defs>
        <marker id="catArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" className="fill-foreground" />
        </marker>
      </defs>
      <text x="170" y="112" fontSize="8.5" textAnchor="middle" className="fill-muted">Available fault energy falls away from the utility supply</text>
      <rect x="10" y="126" width="320" height="18" rx="9" className="fill-accent" />
      <text x="170" y="139" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#fff">Fluke 179: CAT IV 600V / CAT III 1000V</text>
      <rect x="118" y="152" width="212" height="18" rx="9" className="fill-foreground" opacity="0.75" />
      <text x="224" y="165" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#fff">Fluke 117: CAT III 600V</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 179",
  path,
  published: "2026-10-22",
  updated: "2026-10-27",
  intro:
    "Both are True RMS Fluke meters with a strong reputation among electricians, but they're built for different tiers of work. The 117 is tuned for residential and light commercial wiring, with VoltAlert non-contact voltage detection and a low-impedance AutoVolt input as its standout features. The 179 is the full-featured member of Fluke's 170 series: CAT IV 600V, temperature, frequency to 100 kHz, tighter DC accuracy and a lifetime warranty, aimed at industrial maintenance, HVAC and electronics as much as building wiring.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You're a residential or light commercial electrician working standard panels and branch circuits",
      "Non-contact voltage detection and a LoZ ghost-voltage check are features you'll use daily",
      "You don't need temperature measurement or frequency readings above 50 kHz",
      "You want longer battery life: Fluke quotes 400 hours against the 179's 200",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    reviewHref: undefined,
    imageAlt: "Fluke 179 True RMS digital multimeter",
    chooseIf: [
      "You need the CAT IV 600V rating for service-entrance or utility-adjacent work",
      "You regularly measure temperature as part of your troubleshooting",
      "You read small DC currents or need tighter DC voltage accuracy",
      "You want CAT III 1000V headroom and a lifetime warranty",
    ],
  },
  extraSpecs: [
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "6,000 counts with 33-segment bar graph", b: "6,000 counts with analog bar graph" },
    { label: "Basic DC volts accuracy", a: "±(0.5% + 2)", b: "±(0.09% + 2)" },
    { label: "Basic AC volts accuracy", a: "±(1.0% + 3)", b: "±(1.0% + 3)" },
    { label: "Current", a: "6A and 10A; 1 mA finest step", b: "Up to 10A; 0.01 mA finest step" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 50 MΩ" },
    { label: "Temperature", a: "No", b: "−40 °C to 400 °C, thermocouple supplied" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "Up to 10,000 µF" },
    { label: "Frequency", a: "99.99 Hz to 50.00 kHz", b: "Up to 100 kHz" },
    { label: "Non-contact voltage detection (NCV)", a: "Yes, VoltAlert", b: "No" },
    { label: "LoZ / AutoVolt input", a: "Yes, about 3 kΩ", b: "No" },
    { label: "Min/Max-Average recording", a: "Yes", b: "Yes" },
    { label: "Weight", a: "550 g", b: "420 g" },
    { label: "Battery life (9V)", a: "About 400 h typical", b: "About 200 h typical" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "The 179 adds a CAT IV 600V rating on top of CAT III 1000V, extending protection closer to a service entrance than the 117's CAT III 600V covers.",
    "The 179 measures temperature with its supplied thermocouple; the 117 doesn't measure temperature at all.",
    "The 179's basic DC accuracy is ±(0.09% + 2) against the 117's ±(0.5% + 2), and it resolves current to 0.01 mA where the 117 steps in 1 mA.",
    "The 179's frequency range reaches 100 kHz, double the 117's 50 kHz; capacitance is effectively the same (10,000 µF on the 179, 9,999 µF on the 117).",
    "The 117 has VoltAlert non-contact detection and a low-impedance AutoVolt input for ghost voltage; the 179 has neither.",
    "Both have Min/Max-Average recording and a 6,000-count display with a bar graph, and both are True RMS.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 179 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On capacitance and AC voltage the two are level: Fluke quotes ±(1.0% + 3) AC volts for both, and both
          handle motor-run and power-supply capacitors. The 179 pulls ahead on DC accuracy and frequency reach;
          the 117 answers with twice the quoted battery life.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, % of reading. Lower is better: the 179 is over five times tighter.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 0.5, display: "±0.5% + 2" },
                { label: "Fluke 179", value: 0.09, display: "±0.09% + 2", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum frequency: the 179 reads up to 100 kHz, twice the 117&apos;s 50 kHz.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 50, display: "50 kHz" },
                { label: "Fluke 179", value: 100, display: "100 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical 9V battery life Fluke quotes, backlight off. Here the 117 leads.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 400, display: "400 h", highlight: true },
                { label: "Fluke 179", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams per Fluke: the 179 is the lighter meter.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 179", value: 420, display: "420 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          What does the DC gap look like in volts? On a 24 V control supply, read on the 60.00 V range, the 117&apos;s
          spec allows ±(0.12 + 0.02) = ±0.14 V and the 179&apos;s allows ±(0.022 + 0.02) = ±0.042 V. That&apos;s
          arithmetic from Fluke&apos;s published figures, not a measurement. For checking that a 24 V supply is
          alive, either is plenty; for setting a sensor reference or comparing two readings a few tens of
          millivolts apart, the 179 is the better instrument.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAT III 600V vs CAT IV 600V: where it matters</h2>
        <p className="text-muted leading-7 mb-4">
          A measurement category describes how big a transient the meter is built to survive at a given point in
          the installation. Closer to the utility transformer, a fault or lightning-induced surge carries far more
          energy, so the IEC 61010 test levels rise. CAT IV covers the origin of the installation: the service
          drop, meter base and main disconnect. CAT III covers distribution panels, feeders and fixed equipment.
        </p>
        <Figure caption={<>Measurement categories along a building supply, and how far each meter&apos;s rating extends.</>}>
          <CatZoneDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For a residential electrician, almost all troubleshooting happens in the CAT III and CAT II zones, where
          the 117 is fully rated. The 179 earns its rating when you test at the meter base, on the line side of a
          main breaker, or on outdoor service conductors. Our{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>{" "}
          explains the categories in more depth.
        </p>
        <div className="mt-4">
          <Callout title="A rating is not permission">
            Line-side and service-entrance conductors can&apos;t be switched off by the main breaker. Even with a CAT
            IV meter, that work calls for arc-rated PPE and training. If you&apos;re a homeowner, leave the meter base
            and service conductors to a licensed electrician or your utility.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What the 117 does that the 179 can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          The 117&apos;s two electrician features are about telling real voltage from false alarms. VoltAlert, a
          sensor in the top of the meter, beeps and lights near an energized AC conductor with no probe contact,
          a quick first check before you touch anything. AutoVolt drops the input to about 3 kΩ, which drains the
          phantom voltage a disconnected wire picks up from live neighbors in the same conduit. A high-impedance
          meter like the 179 will happily display that phantom as a convincing reading. Our explainer on{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          shows how to unmask it without LoZ.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 179 for HVAC technicians</h2>
        <p className="text-muted leading-7 mb-4">
          An HVAC service call asks a meter for four things: capacitance for run and start capacitors, temperature,
          a clean voltage reading on long control runs, and microamps for the furnace flame sensor. The 117 and 179
          split those four between them, and neither covers all of them, which is the most useful thing to know
          before buying either for HVAC work.
        </p>
        <DataTable
          head={["HVAC check", "Fluke 117", "Fluke 179"]}
          rows={[
            ["Run or start capacitor", "1 nF to 9,999 µF, ±(1.9% + 2)", "To 10,000 µF, ±(1.2% + 2)"],
            ["Supply/return air or line temp", "No temperature", "−40 °C to 400 °C"],
            ["Ghost voltage on thermostat wire", "LoZ AutoVolt, about 3 kΩ", "No LoZ"],
            ["Flame-sensor microamps", "No: 1 mA steps", "No: 0.01 mA steps"],
            ["Cycling load or brownout", "Min/Max/Avg", "Min/Max-Average"],
            ["Condenser or RTU disconnect", "CAT III 600V", "CAT III 1000V / CAT IV 600V"],
            ["Live-wire check before work", "VoltAlert NCV", "Carry a pen tester"],
          ]}
        />
        <div className="mt-4">
          <Figure caption={<>Capacitance accuracy, percent-of-reading term. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 1.9, display: "±1.9% + 2" },
                { label: "Fluke 179", value: 1.2, display: "±1.2% + 2", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Capacitors first, since they are the most common failure on a no-cool call. Take a 45 µF run capacitor as
          an illustrative example. The percentage term alone allows about ±0.86 µF on the 117 and ±0.54 µF on the
          179, before the two-count term. Run capacitors are commonly printed with a ±5% or ±6% tolerance, roughly
          ±2.3 to ±2.7 µF on a 45 µF can, so both meters give a clear pass or fail. Capacitance is not a reason to
          choose one over the other.
        </p>
        <p className="text-muted leading-7 mt-4">
          Flame sensors are the trap. Flame-rectification current is typically a few microamps, and a useful reading
          needs a µA range with 0.1 µA resolution. The 117&apos;s finest step is 1 mA and the 179&apos;s is 0.01 mA,
          which is 10 µA, so on a sensor running at, say, 3 µA both meters would show zero. If you service furnaces,
          plan on a meter with a microamp range, such as the Fluke 116 or the Fluke 87V. Our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          ranking is built around exactly that requirement.
        </p>
        <p className="text-muted leading-7 mt-4">
          On safety ratings, both cover the work. Rooftop units, condensers and air handlers are fixed equipment fed
          from the building&apos;s distribution, which is CAT III territory, and both meters are rated there at 600 V
          or above, enough for 208, 240 and 480 V equipment. The 179&apos;s extra CAT IV rating matters to an HVAC tech
          only if they also probe the service entrance. Where the 117 earns its place is low-voltage controls: a
          24 V thermostat cable run beside line-voltage wiring can show a phantom reading on a high-impedance meter
          like the 179, and the 117&apos;s LoZ position collapses it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature measurement compared</h2>
        <p className="text-muted leading-7 mb-4">
          This comparison is one-sided: the Fluke 117 has no temperature function at all. Fluke&apos;s 110 Series
          datasheet gives the thermocouple input to the Fluke 116 only, so if you need temperature in that body,
          the 116 is the model to buy. The 179 measures temperature with a thermocouple supplied in the box.
        </p>
        <DataTable
          head={["Temperature spec", "Fluke 117", "Fluke 179"]}
          rows={[
            ["Temperature function", "No", "Yes"],
            ["Range (meter)", "Not applicable", "−40 °C to 400 °C (−40 °F to 752 °F)"],
            ["Probe in the box", "None", "Thermocouple supplied"],
            ["Probe type and rating", "Not applicable", "Not stated in our sources"],
            ["Temperature accuracy", "Not applicable", "Not stated in our sources"],
          ]}
        />
        <div className="mt-4">
          <Figure caption={<>Upper limit of the meter&apos;s temperature range, °C, per Fluke. The Fluke 117 has none.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 0, display: "None" },
                { label: "Fluke 116", value: 400, display: "400 °C" },
                { label: "Fluke 179", value: 400, display: "400 °C", highlight: true },
                { label: "Fluke 87V", value: 1090, display: "1090 °C" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          For HVAC, −40 °C to 400 °C on the 179 comfortably spans supply and return air, refrigerant line
          temperatures for superheat and subcooling, and heat-exchanger surfaces. Two caveats. First, the range above
          is the meter&apos;s; a thermocouple probe carries its own rating, and we haven&apos;t confirmed the rating
          of the probe Fluke ships with the 179, so check the probe before measuring anything hot. Second, with one
          input you take readings in sequence: for a temperature split across a coil (commonly targeted around 15 to
          20 °F on cooling), read return air, move the probe, then read supply air. If you need wider range, the{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs 179
          </Link>{" "}
          comparison covers the 87V&apos;s −200 °C to 1090 °C input.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which one for which electrician</h2>
        <DataTable
          head={["Work type", "Better fit", "Why"]}
          rows={[
            ["Standard residential/light commercial panels", "Fluke 117", "VoltAlert and LoZ suit building wiring"],
            ["Service entrances or utility-adjacent work", "Fluke 179", "CAT IV 600V rating extends protection further"],
            ["HVAC, motor, or appliance temperature checks", "Fluke 179", "Only the 179 measures temperature"],
            ["Motor-run or supply capacitor testing", "Either", "Both read capacitance up to about 10,000 µF"],
            ["Sensor loops and small DC currents", "Fluke 179", "0.01 mA resolution and ±(0.09% + 2) DC"],
            ["Remodels with shared conduits and dead legs", "Fluke 117", "LoZ collapses ghost voltage"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A residential electrician usually doesn't need the 179's extras">
            For most residential work, the 117&apos;s CAT III 600V rating, VoltAlert and LoZ cover the job; the
            179&apos;s CAT IV rating, temperature, finer DC accuracy and wider frequency range matter more for
            industrial, HVAC or electronics work. See our{" "}
            <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
              best multimeter for electricians
            </Link>{" "}
            guide for how this fits the wider lineup.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For most residential and light commercial electricians, the 117 is the more practical choice: its CAT III 600V rating covers standard panel work, VoltAlert and LoZ solve everyday false readings, and it runs twice as long on a battery. The 179 earns its higher price for work that needs CAT IV protection, temperature, tighter DC accuracy or a lifetime warranty: industrial maintenance, HVAC and electronics more than routine residential troubleshooting.",
  faqs: [
    {
      question: "Is the Fluke 179 simply a better version of the 117?",
      answer:
        "Not exactly. It trades VoltAlert and LoZ for a higher CAT rating, temperature, tighter DC accuracy and a wider frequency range. Both are True RMS with the same AC volts accuracy, and each has features the other lacks, so the choice depends on the work you do rather than which meter is newer or dearer.",
    },
    {
      question: "Do residential electricians actually need CAT IV 600V?",
      answer:
        "Usually not. CAT III 600V, the 117's rating, covers distribution panels, branch circuits and fixed equipment, which is most residential and light commercial work. CAT IV matters at the origin of the installation: the meter base, service drop and line side of the main disconnect.",
    },
    {
      question: "Why doesn't the 179 have non-contact voltage detection?",
      answer:
        "Fluke doesn't give a reason. It lists VoltAlert as a 117 feature and leaves it off the 170 series, which it positions as general troubleshooting meters. If you choose the 179, carry a separate non-contact voltage tester for quick checks, and use the meter's probes to confirm before touching anything.",
    },
    {
      question: "Can the 179 do everything the 117 can, plus more?",
      answer:
        "Almost, but not entirely. It lacks VoltAlert non-contact detection and the low-impedance AutoVolt input, so it can't drain a ghost voltage the way the 117 does. Beyond those, the 179 extends further in DC accuracy, current resolution, frequency and temperature, and adds CAT IV 600V.",
    },
    {
      question: "Which Fluke has the better warranty, the 117 or the 179?",
      answer:
        "The 179. Fluke lists a lifetime warranty for it against three years for the 117. Over a long career that's a real difference, though both are built for daily field use. Choosing the 117 for VoltAlert and LoZ means accepting the shorter term; choosing the 179 for CAT IV and temperature brings the longer one with it.",
    },
    {
      question: "Is the Fluke 117 or 179 better for HVAC work?",
      answer:
        "For most HVAC techs, the 179, because it measures temperature and reads capacitance slightly more accurately, ±(1.2% + 2) against ±(1.9% + 2). The 117 wins only on control wiring, where its LoZ position clears ghost voltage on long thermostat runs. Neither has a microamp range, so furnace flame-sensor checks need a third meter such as the Fluke 116 or 87V.",
    },
    {
      question: "Can the Fluke 179 test a furnace flame sensor?",
      answer:
        "Not usefully. Its finest current step is 0.01 mA, which is 10 µA, and Fluke lists no microamp range. Flame-sensor current is typically a few microamps, so the 179 would read zero or a single count. Use a meter with a µA range and 0.1 µA resolution, such as the Fluke 116 or Fluke 87V, in series with the flame rod lead.",
    },
    {
      question: "Does the Fluke 117 measure temperature?",
      answer:
        "No. Fluke's 110 Series datasheet gives the thermocouple input to the Fluke 116, not the 117. The 179 reads −40 °C to 400 °C with a thermocouple in the box. If you want a 110 Series body with LoZ plus temperature and microamps, the 116 is the HVAC model in that family.",
    },
    {
      question: "What temperature probe comes with the Fluke 179?",
      answer:
        "Fluke says the 179 ships with a thermocouple, and the meter reads −40 °C to 400 °C. We haven't confirmed the supplied probe's type or its own temperature rating from Fluke's specifications, so treat that as not stated. A probe can be rated lower than the meter, so check the marking on the probe before measuring hot surfaces or flue gas.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke117VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
