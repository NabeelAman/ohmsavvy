// Specs per Fluke, checked 2026-10-27:
// - Fluke 88V facts per the Fluke "Model 88 V Automotive Multimeter Users Manual" (PN 2166623, Rev. 1, 1/06),
//   https://media.fluke.com/a335b692-d3cf-4f18-86fa-b10800c2bce3_original%20file.pdf : average responding AC;
//   6,000 counts, 19,999 HiRes; 33-segment bar graph 40/s; DC V 6.000 V to 1000 V ±(0.1% + 1); 600.0 µA (0.1 µA),
//   6000 µA, 60.00 mA (0.01 mA), 400.0 mA, 6.000 A, 10.00 A (20 A for 30 s); burden 100 µV/µA, 1.8 mV/mA, 0.03 V/A;
//   frequency 0.5 Hz to 200 kHz; duty cycle 0.0-99.9%; pulse width 0.002-1999.9 ms ±(0.002 ms + 3); RPM 30-9,000 and
//   60-12,000 ±2 RPM with the RPM80 probe; temperature -200 to 1090 °C; Min/Max response 100 ms (DC), Peak 250 µs
//   (1 ms for single events); input 10 MΩ; 1000 V CAT III / 600 V CAT IV; 9V, 400 h; 355 g (624 g in holster);
//   lifetime limited warranty. Manual calls the thermocouple included; the 88V Pick says Fluke now lists the
//   inductive pickup and temperature probe as optional for the bare 88V (stated on the page).
// - Fluke 117 facts per our Fluke 115 vs 117 page, which cites the fluke.com 117 spec tab, the 114/115/116/117
//   datasheet (2793260b) and the 110 Series users manual: True RMS; CAT III 600V; 600.0 V max; 6,000 counts with
//   33-segment bar graph; DC V ±(0.5% + 2); 6.000 A and 10.00 A (20 A for 30 s), 1 mA best resolution, no mA/µA range;
//   resistance to 40.00 MΩ; capacitance to 9,999 µF; frequency to 50.00 kHz; Min/Max/Avg; continuity catches
//   500 µs opens/shorts; VoltAlert NCV; AutoVolt LoZ about 3 kΩ; no temperature (116 only); 550 g; 9V, 400 h;
//   3-year warranty. Duty cycle, pulse width, RPM and peak capture are not listed for the 117.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-88v-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 88V vs 117 for Automotive Diagnostics",
  description:
    "Fluke 88V vs Fluke 117 for car and hybrid diagnostics: injector pulse width, RPM, 250 µs peak capture and CAT IV 600V against the 117's electrician features.",
  path: "/multimeters/fluke-88v-vs-fluke-117",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * Illustrative only: battery voltage while cranking. A brief dip at starter engagement lasts a few milliseconds;
 * the 88V's 250 µs Peak Min/Max holds it, while a 100 ms-class Min/Max records a smoothed value. Values are shape only.
 */
function CrankingDipDiagram() {
  const yFor = (v: number) => 20 + (12.8 - v) * 22;
  const pts = [
    [20, 12.6],
    [80, 12.6],
    [84, 12.5],
    [88, 8.6],
    [92, 9.6],
    [100, 10.2],
    [130, 10.0],
    [160, 10.3],
    [190, 10.1],
    [220, 10.4],
    [250, 10.2],
    [262, 11.6],
    [280, 13.6],
    [330, 14.1],
  ]
    .map(([x, v]) => `${x},${yFor(v).toFixed(1)}`)
    .join(" ");
  return (
    <svg
      viewBox="0 0 350 200"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative diagram: battery voltage sits near 12.6 volts, dips sharply for a few milliseconds when the starter engages, holds near 10 volts while cranking, then rises to about 14 volts once the alternator charges. Peak capture holds the sharp dip; a slower Min/Max records a higher, smoothed minimum."
    >
      {[14, 12, 10, 8].map((v) => (
        <g key={v}>
          <line x1="20" x2="335" y1={yFor(v)} y2={yFor(v)} className="stroke-border" strokeWidth="0.6" strokeDasharray="3 3" />
          <text x="16" y={yFor(v) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">
            {v} V
          </text>
        </g>
      ))}
      <polyline points={pts} className="fill-none stroke-accent" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="88" cy={yFor(8.6)} r="4" className="fill-foreground" />
      <text x="96" y={yFor(8.6) + 4} fontSize="9" className="fill-foreground">
        engagement dip: 88V peak mode holds it
      </text>
      <text x="175" y={yFor(10.1) - 8} fontSize="9" textAnchor="middle" className="fill-muted">
        cranking plateau
      </text>
      <text x="300" y={yFor(14.1) - 8} fontSize="9" textAnchor="middle" className="fill-muted">
        charging
      </text>
      <text x="175" y="190" fontSize="9" textAnchor="middle" className="fill-muted">
        Illustrative shape, not a measurement. Time runs left to right over a few seconds.
      </text>
    </svg>
  );
}

/** Where each meter's voltage range and CAT rating stop, against the kinds of systems in a modern shop. */
function VoltageReachDiagram() {
  const xFor = (v: number) => 30 + (v / 1000) * 290;
  return (
    <svg
      viewBox="0 0 350 150"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a voltage scale from 0 to 1000 volts. The Fluke 117's range and CAT III rating stop at 600 volts. The Fluke 88V reads to 1000 volts and is rated CAT III 1000V and CAT IV 600V. A 12 or 24 volt car system sits at the far left; hybrid and EV traction packs run at several hundred volts DC."
    >
      <line x1="30" x2="320" y1="40" y2="40" className="stroke-foreground" strokeWidth="1.2" />
      {[0, 200, 400, 600, 800, 1000].map((v) => (
        <g key={v}>
          <line x1={xFor(v)} x2={xFor(v)} y1="36" y2="44" className="stroke-foreground" strokeWidth="1" />
          <text x={xFor(v)} y="30" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {v} V
          </text>
        </g>
      ))}
      <rect x={xFor(0)} y="56" width={xFor(600) - xFor(0)} height="20" rx="4" className="fill-border" />
      <text x={xFor(300)} y="70" fontSize="9.5" textAnchor="middle" className="fill-foreground">
        Fluke 117: 600 V max, CAT III 600V
      </text>
      <rect x={xFor(0)} y="84" width={xFor(1000) - xFor(0)} height="20" rx="4" className="fill-accent/30" />
      <text x={xFor(500)} y="98" fontSize="9.5" textAnchor="middle" className="fill-foreground">
        Fluke 88V: 1000 V, CAT III 1000V / CAT IV 600V
      </text>
      <rect x={xFor(0)} y="114" width="8" height="12" className="fill-accent" />
      <text x={xFor(0) + 12} y="124" fontSize="9" className="fill-muted">
        12/24 V vehicle
      </text>
      <rect x={xFor(200)} y="114" width={xFor(800) - xFor(200)} height="12" rx="3" className="fill-none stroke-accent" strokeDasharray="4 3" />
      <text x={xFor(500)} y="142" fontSize="9" textAnchor="middle" className="fill-muted">
        hybrid / EV traction systems: several hundred volts DC (varies by vehicle)
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 88V vs Fluke 117 for Automotive Diagnostics",
  path,
  published: "2026-10-27",
  intro:
    "For automotive diagnostics the Fluke 88V is the better meter, by a wide margin. It reads injector pulse width in milliseconds, duty cycle, RPM with an inductive pickup and temperature, holds 250 µs peaks during cranking, measures milliamps for parasitic drain, and is rated CAT III 1000V / CAT IV 600V for hybrid work. The Fluke 117 is an excellent electrician's meter, but on a car it lacks every one of those functions and stops at 600 V. Its strengths, VoltAlert and a LoZ input, are aimed at building wiring.",
  a: {
    pick: all.find((p) => p.name === "Fluke 88V")!,
    imageAlt: "Fluke 88V automotive digital multimeter, front view",
    chooseIf: [
      "You diagnose driveability: injector on-time, PWM duty cycle and engine speed on one meter",
      "You chase parasitic drain and want a 60 mA range that resolves 0.01 mA",
      "You service hybrids or EVs and want a 1000 V range with a CAT IV 600V rating",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS digital multimeter, front view",
    chooseIf: [
      "Your main work is building wiring and the car is an occasional 12 V battery or fuse check",
      "You want VoltAlert and a LoZ ghost-voltage check for shop outlets and fixtures",
      "You need True RMS for mains-powered shop equipment more than automotive functions",
    ],
  },
  extraSpecs: [
    { label: "Injector pulse width", a: "0.002 to 1999.9 ms, direct", b: "Not listed" },
    { label: "Duty cycle", a: "0.0 to 99.9%", b: "Not listed" },
    { label: "RPM", a: "30–12,000 RPM, ±2 RPM (RPM80 pickup)", b: "Not listed" },
    { label: "Peak capture", a: "250 µs Peak Min/Max", b: "Not listed; Min/Max/Avg" },
    { label: "Lowest current range", a: "600.0 µA (0.1 µA); 60.00 mA (0.01 mA)", b: "6.000 A (1 mA steps)" },
    { label: "Temperature", a: "-200 to 1090 °C (probe extra per listing)", b: "No (Fluke 116 only)" },
    { label: "Max voltage / rating", a: "1000 V; CAT III 1000V / CAT IV 600V", b: "600 V; CAT III 600V" },
    { label: "Frequency", a: "To 200 kHz", b: "To 50 kHz" },
    { label: "AC method", a: "Average responding", b: "True RMS" },
    { label: "Non-contact / LoZ", a: "No / No", b: "VoltAlert / LoZ about 3 kΩ" },
    { label: "Weight", a: "355 g (624 g in holster)", b: "550 g" },
    { label: "Warranty", a: "Lifetime limited", b: "3 years" },
  ],
  differences: [
    "Engine functions: the 88V reads injector pulse width in ms, duty cycle and RPM. Fluke lists none of the three for the 117.",
    "Peak capture: the 88V's 250 µs Peak Min/Max holds a starter-engagement dip or an ignition spike; the 117 has Min/Max/Avg but no peak mode.",
    "Small current: the 88V has µA and mA ranges for parasitic drain and sensor current; the 117's smallest step is 1 mA on its 6 A range.",
    "High voltage: the 88V reads to 1000 V and carries CAT IV 600V; the 117 stops at 600 V and CAT III 600V, a real limit on hybrid systems.",
    "The 117's advantages are True RMS, VoltAlert non-contact detection and a LoZ input, all aimed at mains wiring rather than vehicles.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance, for car work</h2>
        <InfoCards
          items={[
            { label: "Injectors", desc: "88V: ms pulse width and duty. 117: neither." },
            { label: "Cranking", desc: "88V: 250 µs peak. 117: Min/Max only." },
            { label: "Key-off drain", desc: "88V: 0.01 mA steps. 117: 1 mA steps." },
            { label: "Engine speed", desc: "88V: RPM with RPM80. 117: no RPM." },
            { label: "Hybrids", desc: "88V: 1000 V, CAT IV 600V. 117: 600 V, CAT III." },
            { label: "Shop wiring", desc: "117: VoltAlert, LoZ and True RMS." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 117 carries our Hands-on Tested badge from shop and building work; the 88V doesn&apos;t, so every 88V figure
          here is taken from Fluke&apos;s 88V users manual rather than our own bench. If you&apos;re still deciding
          between automotive meters in general, our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          ranking covers the full field.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 88V vs 117 spec by spec</h2>
        <DataTable
          head={["Diagnostic job", "Fluke 88V", "Fluke 117"]}
          rows={[
            ["Battery and charging volts", "DC V ±(0.1% + 1)", "DC V ±(0.5% + 2)"],
            ["Voltage drop on a ground", "600.0 mV range, ±(0.3% + 1)", "600.0 mV range"],
            ["Injector on-time", "Pulse width, ms", "Not available"],
            ["PWM solenoid, fan, EVAP valve", "Duty cycle 0.0–99.9%", "Not available"],
            ["Crank or wheel-speed sensor", "Frequency to 200 kHz", "Frequency to 50 kHz"],
            ["Engine speed", "RPM, ±2 RPM, RPM80 probe", "Not available"],
            ["Cranking dip, glitch", "250 µs Peak Min/Max", "Min/Max/Avg"],
            ["Parasitic drain", "60.00 mA, 0.01 mA steps", "6.000 A, 1 mA steps"],
            ["Sensor current (µA)", "600.0 µA, 0.1 µA", "Not available"],
            ["Starter or fan current", "10 A; 20 A for 30 s", "10 A; 20 A for 30 s"],
            ["Coolant, exhaust temperature", "-200 to 1090 °C", "Not available"],
            ["Hybrid pack volts", "1000 V range, CAT IV 600V", "600 V max, CAT III 600V"],
            ["Ignition coil windings", "Ω to 50 MΩ", "Ω to 40 MΩ"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Finest current step, on a log scale. Smaller is better for key-off drain and sensor current.</>}>
            <BarChart
              log
              items={[
                { label: "88V µA range", value: 0.0001, display: "0.1 µA", highlight: true },
                { label: "88V mA range", value: 0.01, display: "0.01 mA" },
                { label: "117 (6 A range)", value: 1, display: "1 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed error on a 12.60 V battery reading, 60.00 V range on both (1 count = 0.01 V). Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 88V", value: 0.0226, display: "±0.02 V", highlight: true },
                { label: "Fluke 117", value: 0.083, display: "±0.08 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The second chart&apos;s arithmetic: a 12.60 V reading sits on the 88V&apos;s 60.00 V range, where one count is
          0.01 V, so 0.1% of 12.60 V (0.0126 V) plus 1 count gives about ±0.02 V. The 117 reads the same battery on its 60.00 V range: 0.5% of 12.60 V is
          0.063 V, plus 2 counts (0.02 V), about ±0.08 V. Both are fine for &quot;is it charged?&quot;. The difference
          shows when you&apos;re judging a 0.05 V change across a connector.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Catching the cranking dip</h2>
        <p className="text-muted leading-7 mb-4">
          A no-crank or slow-crank complaint often turns on one number: how far battery voltage falls the instant the
          starter engages. That first dip lasts only milliseconds. Fluke&apos;s 88V manual gives its normal Min/Max a
          nominal response of about 100 ms on DC, which smooths a short dip into a higher number. Peak Min/Max responds in
          250 µs on repetitive events (1 ms for a single event), so the true low point is what you see.
        </p>
        <Figure caption={<>Illustrative cranking trace. The dot is the fast dip that peak capture is built to hold.</>}>
          <CrankingDipDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 117 records minimum, maximum and average too, and its continuity mode flags opens as short as 500 µs, which
          helps on a wiggle test. What Fluke doesn&apos;t list for it is a peak-capture mode, so on a cranking test
          you&apos;re reading the plateau, not the dip. Our guides to{" "}
          <Link href="/multimeters/car-no-crank-with-a-new-battery" className={link}>
            a no-crank with a new battery
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/why-does-my-car-starter-click-but-the-engine-wont-start" className={link}>
            a starter that clicks but won&apos;t crank
          </Link>{" "}
          walk through what that low point tells you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Injectors, PWM and RPM</h2>
        <p className="text-muted leading-7 mb-4">
          Modern engines control almost everything with pulses: injectors, idle-air and EVAP solenoids, variable-cam
          actuators and electric cooling fans. Diagnosing them means reading how long the pulse lasts or what share of
          each cycle it&apos;s on. The 88V reads pulse width from 0.002 ms to 1999.9 ms with a stated accuracy of
          ±(0.002 ms + 3 counts), and duty cycle from 0.0% to 99.9%. Fluke lists neither for the 117, which reads
          frequency to 50 kHz and stops there.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: 88V on an injector at warm idle, pulse-width mode.</>}>
            <MeterReadout value="2.85" unit="ms" mode="PULSE WIDTH  -" />
          </Figure>
          <Figure caption={<>Illustrative only: 88V on an engine-fan PWM signal, duty mode.</>}>
            <MeterReadout value="42.0" unit="%" mode="DUTY" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          RPM is read through Fluke&apos;s RPM80 inductive probe clipped around a plug lead or coil wire, in two
          settings: 30 to 9,000 RPM and 60 to 12,000 RPM, each ±2 RPM. One buying note: Fluke&apos;s 2006 manual
          describes the K-type thermocouple as included, while the current listing we track says Fluke treats the
          inductive pickup and temperature probe as optional for the bare 88V. Budget for them if the box doesn&apos;t
          have them. Step-by-step checks are in our guides to{" "}
          <Link href="/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" className={link}>
            testing a fuel injector
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter" className={link}>
            testing a crankshaft position sensor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Parasitic drain without guesswork</h2>
        <p className="text-muted leading-7 mb-4">
          A battery that goes flat overnight usually means something is drawing current with the key off. Once modules
          fall asleep, many vehicles settle to a few tens of milliamps; the exact acceptable figure varies by maker and
          model, so check the service data. Resolving that needs a milliamp range. The 88V has 60.00 mA at 0.01 mA steps
          and 400.0 mA at 0.1 mA, with a published burden of 1.8 mV per mA. The 117&apos;s only current ranges are
          6.000 A and 10.00 A, where 1 mA is the smallest step.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: a 35 mA draw on the 88V&apos;s 60 mA range reads to the hundredth of a milliamp and drops
          35 × 1.8 = 63 mV across the meter, small next to a 12.6 V battery. On the 117 the same draw shows as roughly
          0.035 A, close enough to spot a gross drain but too coarse to watch a module drop from 38 mA to 34 mA as it
          sleeps. A caution for both: a door opening or a module waking can draw amps, so start on the 10 A input and move
          down. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>{" "}
          covers the sequence.
        </p>
        <KeyIdea title="LoZ is a shop-wiring tool, not a car tool">
          The 117&apos;s AutoVolt position drops the input to about 3 kΩ to drain ghost voltage on building wiring. On a
          car, that load can pull down a sensor reference or signal line and make a good circuit read bad. Use the
          117&apos;s normal high-impedance V positions on vehicle electronics; the 88V&apos;s 10 MΩ input is what an ECU
          circuit expects.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hybrids and EVs: why the rating matters</h2>
        <p className="text-muted leading-7 mb-4">
          On a 12 V system the CAT rating is rarely the limiting factor. On a hybrid or EV, the traction battery,
          inverter and motor cables run at several hundred volts DC, and the figure varies by vehicle. The 117&apos;s
          highest range is 600.0 V and it&apos;s rated CAT III 600V. The 88V reads to 1000 V and is rated CAT III 1000V
          and CAT IV 600V, the same protection as Fluke&apos;s 87V.
        </p>
        <Figure caption={<>Voltage reach and CAT rating of each meter against the systems you&apos;ll meet.</>}>
          <VoltageReachDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A higher rating doesn&apos;t make high-voltage work safe on its own; it means the meter won&apos;t be the weak
          link when the procedure is followed. That procedure is the manufacturer&apos;s, and it includes disabling the
          system and verifying zero energy with rated gloves and leads.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Professional auto or diesel tech", "Fluke 88V", "Pulse width, duty, RPM, peak capture and mA ranges"],
            ["Hybrid and EV technician", "Fluke 88V", "1000 V range and CAT IV 600V; the 117 stops at 600 V"],
            ["DIY owner fixing their own car", "Fluke 88V", "mA drain and peak capture solve the common faults"],
            ["Electrician who sometimes checks a car battery", "Fluke 117", "DC volts and fuses work fine; NCV and LoZ earn their keep at work"],
            ["Mobile tech also fixing shop wiring", "Both, or 88V + NCV pen", "Each meter is strongest in its own world"],
            ["Motorcycle or small-engine tinkerer", "Fluke 88V", "RPM and duty cycle cover ignition and charging"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you also work on industrial AC and want True RMS alongside car work, see{" "}
          <Link href="/multimeters/fluke-88v-vs-fluke-87v" className={link}>
            Fluke 88V vs Fluke 87V
          </Link>
          . For a cheaper path, the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison explains what the 87V adds to a 117 for diagnostics, and our{" "}
          <Link href="/multimeters/best-multimeters-for-car-battery-testing" className={link}>
            car battery testing
          </Link>{" "}
          guide lists simpler meters for battery-only jobs.
        </p>
      </section>

      <Callout title="Safety: orange cables, fuses and the 10 A input">
        Hybrid and EV high-voltage systems can be lethal. Follow the maker&apos;s service-disconnect procedure, wear
        insulated gloves rated for the system, and use leads matching the meter&apos;s CAT rating; the 117 should not be
        used on systems above 600 V. On 12 V systems, never put either meter&apos;s A input across a battery: the A jack
        is a near short and will blow the meter&apos;s fuse or worse. Both allow 20 A for only 30 seconds, so measure
        starter current with a clamp, not in series.
      </Callout>
    </>
  ),
  bottomLine:
    "For automotive diagnostics, buy the Fluke 88V. It has the functions car work runs on: injector pulse width, duty cycle, RPM, 250 µs peak capture, milliamp ranges for drain testing and a CAT IV 600V rating with a 1000 V range for hybrids. Keep the Fluke 117 for building wiring, where VoltAlert, LoZ and True RMS make it one of the best electrician's meters; on a car it is limited to volts, ohms and 10 A current.",
  faqs: [
    {
      question: "Can the Fluke 117 be used for automotive work?",
      answer:
        "For basics, yes: battery voltage, fuse and continuity checks, resistance of coils and 10 A current. It can't read injector pulse width, duty cycle or RPM, has no peak capture and no milliamp range, so parasitic drain and most driveability work are beyond it. Use its high-impedance V positions on car electronics, not the 3 kΩ AutoVolt position.",
    },
    {
      question: "Does the Fluke 88V come with the RPM pickup?",
      answer:
        "Check the listing. The 88V reads RPM through Fluke's RPM80 inductive probe, and the current listing we track says Fluke treats the inductive pickup and temperature probe as optional for the bare 88V. Fluke's older 2006 manual describes the thermocouple as included. Kits vary, so confirm the box contents before relying on RPM or temperature.",
    },
    {
      question: "Is the Fluke 88V good for parasitic drain testing?",
      answer:
        "Yes. Its 60.00 mA range resolves 0.01 mA with a burden of 1.8 mV per mA, so a typical sleeping-vehicle draw reads cleanly without disturbing the circuit much. Start on the 10 A input in case something wakes and draws amps, then move to the mA jack once the reading settles below the range limit.",
    },
    {
      question: "Is the Fluke 117 safe on a hybrid vehicle?",
      answer:
        "It's rated CAT III 600V and its highest voltage range is 600.0 V, so it should not be used on any system that can exceed 600 V. Many hybrid and EV traction systems run at several hundred volts DC and some go higher. The 88V reads to 1000 V and carries CAT IV 600V, which is the better match.",
    },
    {
      question: "Why is the Fluke 88V not True RMS?",
      answer:
        "Fluke designed it around DC and pulse measurements, where True RMS adds nothing; its manual states the AC conversion is average responding, rms indicating. On cars that rarely matters. It does matter on non-sine AC such as alternator ripple from a failed diode or inverter outputs, where an average-responding reading can be off by several percent.",
    },
    {
      question: "Which Fluke is better for a mobile technician who also does electrical work?",
      answer:
        "If vehicles are the main income, the 88V, paired with a separate non-contact voltage pen for shop wiring. If building wiring dominates and cars are occasional, the 117. The 88V's CAT IV 600V rating also covers service-entrance work, but it lacks the 117's LoZ ghost-voltage check and True RMS for distorted building loads.",
    },
  ],
  roundup: { label: "See the best multimeters for automotive", href: "/multimeters/best-multimeter-for-automotive" },
  related: [
    { label: "Fluke 88V vs Fluke 87V", href: "/multimeters/fluke-88v-vs-fluke-87v" },
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
    { label: "How to test a fuel injector", href: "/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" },
    { label: "Best multimeters for car battery testing", href: "/multimeters/best-multimeters-for-car-battery-testing" },
  ],
};

export default function Fluke88VVsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
