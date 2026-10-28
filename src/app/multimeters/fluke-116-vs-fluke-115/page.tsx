// Specs per Fluke, checked 2026-10-27:
// - Fluke 116 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-116
//   (600.0 µA AC/DC at 0.1 µA: DC ±(1.0% + 2), AC ±(1.5% + 3) at 45-500 Hz; no mA or A ranges; Type K temperature
//   -40 to 400 °C at 0.1 °C ±(1% + 10) and -40 to 752 °F at 0.2 °F ±(1% + 18), probe error excluded; Auto V/LoZ
//   600.0 V ±(2.0% + 3); DC mV 600.0 mV ±(0.5% + 2); capacitance 1,000 nF to 9,999 µF ±(1.9% + 2); CAT III 600V;
//   80BK temperature probe in the box; features list "built-in thermometer and microamp measurement for testing
//   flame sensors" and "low input impedance").
// - Fluke 115 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
//   (6.000 A and 10.00 A AC/DC, AC ±(1.5% + 3), DC ±(1.0% + 3), 20 A for 30 s; DC mV 600.0 mV ±(0.5% + 2);
//   capacitance same as the 116; no µA, LoZ or VoltAlert; the page's comparison table lists a temperature range for
//   the 115, which the datasheet and manual do not).
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (temperature and µA on the 116 only; AutoVolt LoZ about 3 kΩ on the 114, 116, 117; normal V input >10 MΩ DC, >5 MΩ AC).
// Flame-signal, pilot-thermocouple, anticipator and delta-T figures are common field rules of thumb, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-116-vs-fluke-115";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 116 vs Fluke 115 for HVAC Troubleshooting",
  description:
    "Fluke 116 vs Fluke 115 for HVAC and general use: flame-rod microamps, thermocouple temperature and LoZ on the 116, 10 A ranges on the 115. Which Fluke fits.",
  image: all.find((p) => p.name === "Fluke 116")!.image,
  path: "/multimeters/fluke-116-vs-fluke-115",
});

const link = "text-accent hover:underline";

/** Flame rectification: the meter goes in series between the flame rod and its control-board terminal. */
function FlameRodHookupDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the furnace control board puts AC on the flame rod; the flame conducts mostly in one direction to the grounded burner, so a small DC current flows. A meter on its microamp range is placed in series between the flame rod and the board's flame-sense terminal."
    >
      <rect x="14" y="30" width="110" height="80" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="69" y="54" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Control board</text>
      <text x="69" y="70" fontSize="9" textAnchor="middle" className="fill-muted">AC on the</text>
      <text x="69" y="82" fontSize="9" textAnchor="middle" className="fill-muted">flame-sense terminal</text>
      <circle cx="124" cy="96" r="3" className="fill-accent" />
      <path d="M124 96 H160" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <circle cx="182" cy="96" r="20" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="182" y="100" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">µA</text>
      <text x="182" y="132" fontSize="9" textAnchor="middle" className="fill-muted">meter in series</text>
      <path d="M202 96 H262 V70" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <line x1="262" y1="70" x2="262" y2="40" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />
      <text x="272" y="44" fontSize="9" className="fill-foreground">flame rod</text>
      <path d="M244 40 q18 -28 36 0 q-6 18 -18 22 q-12 -4 -18 -22z" className="fill-accent/25 stroke-accent" strokeWidth="1.2" />
      <rect x="226" y="150" width="76" height="14" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="264" y="160" fontSize="8.5" textAnchor="middle" className="fill-foreground">burner (grounded)</text>
      <path d="M262 62 V150" className="stroke-accent" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="304" y="112" fontSize="8.5" className="fill-accent">flame conducts</text>
      <text x="304" y="123" fontSize="8.5" className="fill-accent">mostly one way</text>
      <path d="M264 164 V184 H69 V110" className="stroke-foreground fill-none" strokeWidth="1.4" />
      <path d="M150 184 v8 m-7 0 h14" className="stroke-foreground" strokeWidth="1.4" />
      <text x="96" y="202" fontSize="9" className="fill-muted">chassis ground back to the board</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 116 vs Fluke 115 for HVAC Troubleshooting",
  path,
  published: "2026-10-27",
  updated: "2026-10-28",
  intro:
    "For HVAC troubleshooting the Fluke 116 is the better meter: it reads flame-rod current on a 600.0 µA range with 0.1 µA resolution, takes Type K temperature with the included 80BK probe, and has a LoZ input for ghost voltage on 24 V control wiring. The Fluke 115 has none of those three. What the 115 keeps is 6 A and 10 A current ranges. On capacitors, line voltage and resistance, the two read identically.",
  a: {
    pick: all.find((p) => p.name === "Fluke 116")!,
    imageAlt: "Fluke 116 HVAC multimeter with microamp and temperature functions, front view",
    chooseIf: [
      "You service gas furnaces and boilers and need to read flame-sensor microamps",
      "You want supply and return air temperature from the meter on your belt",
      "You chase phantom voltages on thermostat and control cable runs",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 field service True RMS multimeter, front view",
    chooseIf: [
      "Your HVAC work is mostly cooling, heat pumps and electric heat with no flame sensors",
      "You want to read control-circuit or small-motor current in series up to 10 A",
      "You already carry an HVAC clamp with µA and temperature functions",
    ],
  },
  extraSpecs: [
    { label: "Microamps (flame sensor)", a: "600.0 µA AC/DC, 0.1 µA steps", b: "No" },
    { label: "Amps", a: "No", b: "6.000 A and 10.00 A AC/DC" },
    { label: "Temperature", a: "-40 to 400 °C / -40 to 752 °F, Type K", b: "No (see the note on Fluke's 115 page below)" },
    { label: "Temperature probe included", a: "Yes, 80BK", b: "No" },
    { label: "AutoVolt with LoZ input", a: "Yes, about 3 kΩ", b: "No" },
    { label: "DC millivolts", a: "600.0 mV, ±(0.5% + 2)", b: "600.0 mV, ±(0.5% + 2)" },
    { label: "Capacitance", a: "1 nF to 9,999 µF, ±(1.9% + 2)", b: "1 nF to 9,999 µF, ±(1.9% + 2)" },
    { label: "Resistance / continuity", a: "To 40.00 MΩ; beep below 20 Ω", b: "To 40.00 MΩ; beep below 20 Ω" },
    { label: "Safety rating", a: "CAT III 600V", b: "CAT III 600V" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Only the 116 reads microamps: 600.0 µA AC or DC at 0.1 µA resolution, the range Fluke built for flame sensors. The 115's finest current step is 1 mA on its 6.000 A range.",
    "Only the 116 measures temperature, with a Type K input from -40 to 400 °C and an 80BK probe in the box. Fluke's datasheet and manual list no temperature function on the 115.",
    "Only the 116 has AutoVolt with a low-impedance input of about 3 kΩ. Every volts position on the 115 stays high impedance, so it can show ghost voltage on idle control conductors.",
    "Only the 115 reads amps through the leads, on 6.000 A and 10.00 A ranges. The 116 has no amp or milliamp range.",
    "Capacitance, line voltage, millivolts, resistance, frequency, the case, battery and 3-year warranty are the same on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 116 vs 115 spec by spec for HVAC jobs</h2>
        <p className="text-muted leading-7 mb-4">
          Rather than list every range, the table below takes the functions an HVAC technician actually reaches for on
          a service call and reads each meter&apos;s line from Fluke&apos;s specification tab.
        </p>
        <DataTable
          head={["HVAC function", "Fluke 116", "Fluke 115"]}
          rows={[
            ["Flame-sensor current", "600.0 µA, DC ±(1.0% + 2)", "Not resolvable (1 mA steps)"],
            ["Air or pipe temperature", "Type K, ±(1% + 10) at 0.1 °C", "Not listed in the datasheet"],
            ["Pilot thermocouple millivolts", "600.0 mV DC, ±(0.5% + 2)", "600.0 mV DC, ±(0.5% + 2)"],
            ["Run or start capacitor", "To 9,999 µF, ±(1.9% + 2)", "To 9,999 µF, ±(1.9% + 2)"],
            ["24 V control voltage", "V AC or AutoVolt LoZ", "V AC (high impedance only)"],
            ["Line voltage, 120–480 V", "To 600.0 V, True RMS", "To 600.0 V, True RMS"],
            ["Motor winding, igniter ohms", "To 40.00 MΩ", "To 40.00 MΩ"],
            ["Control-circuit current", "Only to 600 µA", "6.000 A range, 1 mA steps"],
            ["Blower or compressor amps", "Clamp meter needed", "Clamp meter in practice"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Finest current step on each meter, in microamps, log scale. A flame signal of a few µA disappears below the 115&apos;s 1 mA step.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 116 (µA range)", value: 0.1, display: "0.1 µA", highlight: true },
                { label: "Fluke 115 (6 A range)", value: 1000, display: "1,000 µA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Volts input impedance, log scale. The 116&apos;s AutoVolt LoZ input loads idle conductors enough to drain coupled voltage.</>}>
            <BarChart
              log
              items={[
                { label: "115, V AC", value: 5_000_000, display: ">5 MΩ" },
                { label: "116, V AC", value: 5_000_000, display: ">5 MΩ" },
                { label: "116, AutoVolt LoZ", value: 3_000, display: "≈3 kΩ", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Fluke's 115 page lists temperature; its datasheet doesn't">
            The comparison table on Fluke&apos;s 115 product page shows a temperature range for the 115. The 110 Series
            datasheet, the users manual and the 115&apos;s own accuracy table list temperature for the 116 only, and the
            115 has no 80BK probe in its box. We follow the datasheet and manual: don&apos;t buy the 115 to read
            temperature.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Flame-rod microamps: the 116&apos;s reason to exist</h2>
        <p className="text-muted leading-7 mb-4">
          A gas furnace proves flame by flame rectification. The control board puts AC on the flame rod; the flame
          conducts better in one direction than the other, so a small DC current flows from rod to the grounded
          burner. If that current is too weak, the board shuts the gas valve a few seconds after ignition. The classic
          symptom is a burner that lights, runs briefly and drops out, then retries until lockout. The only way to
          measure the signal is a meter on a microamp range in series with the rod wire.
        </p>
        <Figure caption={<>Flame rectification and where the meter goes. Use the DC µA function; the current is tiny but the circuit is live.</>}>
          <FlameRodHookupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Flame signals are commonly a few microamps; the minimum each control accepts is set by its maker and is
          usually printed in the furnace manual. Work the arithmetic on an illustrative 3.0 µA reading. The 116&apos;s DC
          µA line allows 1.0% of 3.0 µA (0.03 µA) plus 2 counts of 0.1 µA, so about ±0.23 µA: easily good enough to
          tell a healthy signal from a marginal one. The 115 on its 6.000 A range shows 0.000 A for the same current,
          because 3 µA is a third of a percent of its smallest step.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative: the 116 in series with a flame rod.</>}>
            <MeterReadout value="3.0" unit="µA DC" mode="µA  (600.0 range)" />
          </Figure>
          <Figure caption={<>Illustrative: the 115 on the same circuit.</>}>
            <MeterReadout value="0.000" unit="A DC" mode="A  (6.000 range)" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A low reading usually points to an oxidized rod, a poor burner ground or a cracked insulator rather than the
          board. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps with a multimeter
          </Link>{" "}
          covers the series hookup in detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature and thermocouples</h2>
        <p className="text-muted leading-7 mb-4">
          Temperature comes up on almost every HVAC call: supply and return air for a temperature split, a line
          temperature for superheat or subcooling, a heat-exchanger outlet. The 116 does it with the bundled 80BK probe.
          Fluke&apos;s accuracy is ±(1% + 10) on the 0.1 °C scale, so 10 counts add 1.0 °C; at 13 °C supply air
          that is about ±1.1 °C, before probe error, which Fluke excludes from the figure. In Fahrenheit the line is
          ±(1% + 18) at 0.2 °F steps, about ±4.2 °F at 55 °F.
        </p>
        <p className="text-muted leading-7 mb-4">
          That is fine for a temperature-split check. A rule of thumb many technicians use for cooling is a split
          around 15 to 22 °F, but the equipment maker&apos;s chart wins. Taking both readings with the same probe and meter
          helps, because a fixed offset largely cancels when you subtract one reading from the other.
        </p>
        <p className="text-muted leading-7 mb-4">
          The pilot thermocouple on a standing-pilot appliance is a different measurement, and here the two meters tie.
          It is a millivolt reading, not a temperature reading, and both meters have the same 600.0 mV DC range at
          ±(0.5% + 2). Open-circuit values in the 20s of millivolts are commonly quoted for a healthy pilot
          thermocouple; check the valve maker&apos;s figure. On an illustrative 25.0 mV reading, either meter is good to
          about ±0.3 mV. Our guide to{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            checking a thermocouple with a multimeter
          </Link>{" "}
          walks through it.
        </p>
        <Figure caption={<>Allowed error, in °C, on the 116 at three temperatures from its ±(1% + 10) line. Probe error is extra.</>}>
          <BarChart
            items={[
              { label: "13 °C supply air", value: 1.13, display: "±1.1 °C" },
              { label: "24 °C return air", value: 1.24, display: "±1.2 °C" },
              { label: "60 °C heat outlet", value: 1.6, display: "±1.6 °C", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitors and LoZ on 24 V controls</h2>
        <p className="text-muted leading-7 mb-4">
          Run capacitors are the most common failed part on a condenser, and on this job the meters are equal: both
          read 1 nF to 9,999 µF at ±(1.9% + 2). On an illustrative 45 µF compressor section, read on the 100.0 µF range,
          the allowed error is 0.86 µF plus 0.2 µF, about ±1.1 µF. On a 5 µF fan section, read on the 10.00 µF range,
          it is about ±0.12 µF. Either is tight enough to compare against the tolerance printed on the can. See{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            how to test a fan motor capacitor
          </Link>{" "}
          for the procedure.
        </p>
        <p className="text-muted leading-7 mb-4">
          Control wiring is where LoZ pays off. Thermostat cable often has spare conductors, and long runs sit next to
          powered ones, so an unused or open wire can pick up a coupled voltage that a high-impedance input displays as
          a believable number. On the 115, every volts position stays above 5 MΩ, so you must load-test a suspicious
          reading yourself. The 116&apos;s AutoVolt position drops the input to about 3 kΩ, which drains coupling and
          leaves a real 24 V supply standing.
        </p>
        <FlowDiagram
          steps={[
            { label: "Odd voltage on a W or Y wire", sub: "Call for heat or cooling is off" },
            { label: "116: switch to AutoVolt", sub: "Input drops to about 3 kΩ" },
            { label: "Reading collapses?", sub: "Coupled ghost voltage, not a fault" },
            { label: "Reading holds?", sub: "Real voltage: check thermostat or wiring" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Our guides to{" "}
          <Link href="/multimeters/how-to-test-a-thermostat-with-a-multimeter" className={link}>
            testing a thermostat
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            checking a 24 V transformer
          </Link>{" "}
          cover the control circuit step by step.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 115 is the better HVAC meter</h2>
        <p className="text-muted leading-7 mb-4">
          The 115&apos;s amp ranges are not useless on HVAC work. Setting the heat anticipator on an older mechanical
          thermostat calls for the current in the heat circuit, which is a fraction of an amp; the 115 reads it in
          series on its 6.000 A range, and the 116&apos;s 600 µA ceiling can&apos;t. Small inducer or damper motors and
          24 V control loads can also be read in series. Blower, compressor and electric-heat amps are a different story:
          they are big, often above 10 A, and sit inside running equipment, so a clamp meter is the right tool with either
          Fluke.
        </p>
        <p className="text-muted leading-7">
          A technician who works mainly on heat pumps, mini-splits and electric heat, with no gas appliances, never
          needs a flame-sensor range. If that technician already owns an HVAC clamp with a temperature input, the 115
          covers the remaining multimeter jobs and adds amps. Our{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          is based on the owner&apos;s own unit; the 116 assessment here is desk research against Fluke&apos;s
          published specifications.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">HVAC specialist or general-purpose meter?</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke built the 116 as a specialist and the 115 as a field-service all-rounder, and the split shows the
          moment the meter leaves the mechanical room. Off an HVAC call, nobody needs flame-rod microamps, but plenty of
          jobs need amps: a parked car&apos;s battery drain, a bench appliance, a small motor. The 116 has no input for
          any of them, because its only current range tops out at 600.0 µA. Everything voltage-, resistance- and
          capacitance-based is identical, so the general-purpose gap is current and nothing else.
        </p>
        <DataTable
          head={["General job", "Fluke 116", "Fluke 115", "Worked tolerance"]}
          rows={[
            ["12.60 V car battery at rest", "60.00 V DC range", "60.00 V DC range", "±0.08 V on both, from ±(0.5% + 2)"],
            ["120 V receptacle", "True RMS, 600.0 V", "True RMS, 600.0 V", "±1.5 V on both, from ±(1.0% + 3)"],
            ["Parked-car drain, illustrative 50 mA", "Not possible (µA input only)", "6.000 A range, 1 mA steps", "115: ±3.5 mA, from ±(1.0% + 3)"],
            ["Appliance load, illustrative 5 A AC", "Not possible", "6.000 A range", "115: about ±0.08 A, from ±(1.5% + 3)"],
            ["Fuse, cord or switch continuity", "Beeps below 20 Ω", "Beeps below 20 Ω", "Same"],
            ["Electrolytic in a power supply", "To 9,999 µF", "To 9,999 µF", "Same ±(1.9% + 2)"],
            ["Idle conductor showing phantom volts", "AutoVolt LoZ", "High impedance only", "116 can tell coupling from a fault"],
            ["Oven or freezer temperature", "Type K, 80BK probe", "Not listed", "116 only"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rows in the HVAC table near the top of this page each meter handles itself (9 rows; clamp-only jobs count against both).</>}>
            <BarChart
              items={[
                { label: "Fluke 116", value: 7, display: "7 of 9", highlight: true },
                { label: "Fluke 115", value: 6, display: "6 of 9" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rows in the general-job table above each meter handles itself (8 rows).</>}>
            <BarChart
              items={[
                { label: "Fluke 116", value: 6, display: "6 of 8" },
                { label: "Fluke 115", value: 6, display: "6 of 8", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The tie in the second chart hides a difference in kind. The two rows the 116 loses are current, which comes up
          in car, appliance and electronics work every week. The two the 115 loses, LoZ and temperature, are handy but
          have workarounds: a load across the leads, or a separate thermometer. So a homeowner, a car hobbyist or a
          general maintenance tech who rarely sees a gas burner gets more from the 115, and our owner-tested{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          covers it as an everyday meter. The 116 only becomes the better general meter if you already own a clamp for
          amps. If you want both amps and LoZ in this body, look at the 117 instead; the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          page weighs that step.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 116 vs Fluke 115 for HVAC: which should you buy?</h2>
        <DataTable
          head={["Your HVAC work", "Better fit", "Why"]}
          rows={[
            ["Residential gas furnaces and boilers", "Fluke 116", "Flame-rod µA and temperature are routine on these calls"],
            ["Mixed heating and cooling service", "Fluke 116 + clamp", "The clamp covers amps; the 116 covers everything else"],
            ["Heat pumps and mini-splits only", "Fluke 115 or 116", "No flame sensors; the 116 still adds temperature and LoZ"],
            ["Older thermostats with anticipators", "Fluke 115", "Reads heat-circuit current in series; the 116 can't"],
            ["Refrigeration and superheat work", "Fluke 116", "Line temperature from the included probe"],
            ["Already own an HVAC clamp with µA", "Fluke 115", "Avoids paying twice for µA and temperature"],
            ["Apprentice building a first kit", "Fluke 116", "Covers more HVAC readings out of one box"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For HVAC clamps and other meters ranked for this trade, see our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide. If you are deciding between the 116 and the electrician&apos;s model, read{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-117" className={link}>
            Fluke 116 vs Fluke 117
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety on furnace and condenser work">
        Shut off power at the disconnect before you open a series path, and reconnect the meter before restoring
        power for a flame-rod reading; keep your hands clear of the burner and line terminals while the unit runs.
        Discharge run and start capacitors with a suitable resistor before you test them, because they can hold a
        dangerous charge after the power is off. Both meters are rated CAT III 600V with a 600 V maximum between any terminal
        and earth; neither belongs on the utility side of the service. If you smell gas, leave the building and call your gas utility or 911 from outside.
      </Callout>
    </>
  ),
  bottomLine:
    "For HVAC troubleshooting, buy the Fluke 116: flame-rod microamps, Type K temperature with a probe in the box and a LoZ input for control wiring are the readings that fill service calls. Pair it with a clamp meter for amps. The Fluke 115 suits technicians with no gas equipment who already own an HVAC clamp, or who want series current for anticipators and small loads.",
  faqs: [
    {
      question: "Can the Fluke 115 test a flame sensor?",
      answer:
        "Not in practice. Its finest current step is 1 mA on the 6.000 A range, and flame signals are typically a few microamps, so the display stays at zero. The Fluke 116 has a 600.0 µA range with 0.1 µA resolution designed for this check, and several HVAC clamp meters also include a µA range for flame rods.",
    },
    {
      question: "Does the Fluke 115 measure temperature?",
      answer:
        "Fluke's sources disagree. The comparison table on the 115 product page shows a temperature range, but the 110 Series datasheet, the users manual and the 115's accuracy table list temperature only for the 116, and no probe ships with the 115. We follow the datasheet and manual, so treat the 115 as having no temperature function.",
    },
    {
      question: "Is the Fluke 116 good for HVAC?",
      answer:
        "Yes, it is Fluke's dedicated HVAC model. It reads flame-sensor current to 0.1 µA, Type K temperature from -40 to 400 °C with the included 80BK probe, capacitance to 9,999 µF, and has a LoZ input against ghost voltage. Its gap is amps: there is no amp range, so carry a clamp meter for motors and compressors.",
    },
    {
      question: "Which Fluke is best for testing HVAC capacitors?",
      answer:
        "Either. The 116 and 115 share the same capacitance function, 1 nF to 9,999 µF with ±(1.9% + 2) accuracy, which covers run and start capacitors comfortably. A 45 µF reading carries about ±1.1 µF of allowed error. Always discharge the capacitor safely and isolate it from the circuit before you measure it.",
    },
    {
      question: "Why does my meter show voltage on a thermostat wire that should be off?",
      answer:
        "Often it is ghost voltage: an idle conductor beside powered ones in the same cable picks up a coupled voltage that a high-impedance meter displays. A low-impedance input such as the 116's AutoVolt position loads the wire enough to collapse it. The 115 has no LoZ mode, so add a load across the leads to check.",
    },
    {
      question: "Is the Fluke 116 a good general-purpose multimeter?",
      answer:
        "Only if you carry a clamp meter. Its volts, resistance, continuity and capacitance match the Fluke 115, and it adds LoZ and temperature, but its single current range stops at 600.0 µA. That rules out battery-drain, appliance and small-motor current through the leads. For all-round home, car and shop use, the 115 or 117 is the better fit.",
    },
    {
      question: "Can the Fluke 116 measure amps on a blower motor?",
      answer:
        "No. The 116's only current range is 600.0 µA, so it cannot read any motor current. Use a clamp meter around one conductor instead. The 115 can read up to 10 A in series, but breaking into a running blower circuit is awkward and many motors exceed that, so a clamp is the better tool there too.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 116 vs Fluke 117", href: "/multimeters/fluke-116-vs-fluke-117" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "How to check a thermocouple", href: "/multimeters/how-to-check-a-thermocouple-with-a-multimeter" },
  ],
};

export default function Fluke116VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
