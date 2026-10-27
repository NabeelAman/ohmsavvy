// Specs per Fluke, as already cited in this repo (no new sources added on this page):
// - Fluke 88V: the Fluke 88V Pick in src/lib/multimeter-catalog.ts ("Specs per fluke.com (Fluke 88V page + spec tab)
//   and the Fluke 88V Users Manual") and the spec comments on /multimeters/fluke-88v-vs-fluke-87v and
//   /multimeters/fluke-88v-vs-fluke-117, which cite the "Model 88 V Automotive Multimeter Users Manual" (PN 2166623,
//   Rev. 1, 1/06): average responding, rms indicating AC; 6,000 counts, 19,999 in HiRes; 33-segment bar graph 40/s;
//   DC V 6.000 V to 1000 V ±(0.1% + 1); DC mV ±(0.3% + 1); 600.0 µA (0.1 µA), 6000 µA, 60.00 mA (0.01 mA), 400.0 mA,
//   6.000 A, 10.00 A (20 A for 30 s); burden 100 µV/µA, 1.8 mV/mA, 0.03 V/A; 50 MΩ; 9,999 µF; frequency 0.5 Hz to
//   200 kHz ±(0.01% + 1); duty cycle 0.0-99.9%; pulse width 0.002-1999.9 ms ±(0.002 ms + 3); RPM 30-9,000 and
//   60-12,000 ±2 RPM with the RPM80 probe; temperature -200 to 1090 °C ±(1% + 10) excluding probe; Min/Max response
//   100 ms (DC), Peak Min/Max 250 µs (1 ms single events); input 10 MΩ; 1000 V CAT III / 600 V CAT IV; 9 V, 400 h;
//   355 g (624 g in holster); lifetime limited warranty. Probe conflict: the manual calls the K-type thermocouple
//   included; the 88V Pick says Fluke lists the inductive pickup and temperature probe as optional for the bare 88V.
//   A backlight is not stated in any 88V source in this repo, so the page says "not stated".
// - Fluke 179: the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx ("Specs per fluke.com (Fluke 179
//   product page) and the Fluke 170 Series datasheet") and the spec comment on /multimeters/fluke-177-vs-fluke-179
//   (fluke.com 179 page, checked 2026-10-27): True RMS AC V and AC A; DC V ±(0.09% + 2); AC V ±(1.0% + 3);
//   DC A ±(1.0% + 3); AC A ±(1.5% + 3); 0.01 mA best resolution (no µA range); 10 A; 50 MΩ; 10,000 µF (9,999 µF in
//   one Fluke table); 100 kHz ±(0.1% + 1); temperature −40 °C to 400 °C ±(1.0% + 10), 80BK probe included;
//   6,000-count backlit display with analog bar graph; Hold, Auto Hold, Min/Max-average; CAT III 1000 V /
//   CAT IV 600 V; 9 V, about 200 h without backlight; 420 g; lifetime warranty. Duty cycle, pulse width, RPM, peak
//   capture, input impedance and burden voltage are not listed for the 179.
// Worked tolerances use Fluke's "best accuracy" lines on 6,000-count ranges (6.000 V, 60.00 V, 60.00 mA), so they
// are best-case figures, not per-range guarantees. PWM timing numbers in the diagram are illustrative.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-88v-vs-fluke-179";

export const metadata = buildMetadata({
  title: "Fluke 88V vs Fluke 179 for Vehicle Diagnostics",
  description:
    "Fluke 88V vs Fluke 179 comparison for car work: RPM, duty cycle, injector pulse width and 250 µs peak capture against True RMS, a backlight and a probe.",
  path: "/multimeters/fluke-88v-vs-fluke-179",
});

const all = getAllPicks("multimeters");
const link = "text-accent hover:underline";

/**
 * A PWM solenoid signal at a fixed frequency: what each meter can report from it. Illustrative 100 Hz, 30% on-time,
 * so period = 1 / 100 Hz = 10 ms and on-time = 0.30 × 10 ms = 3 ms.
 */
function PwmReadoutDiagram() {
  const pulses = [0, 1, 2];
  return (
    <svg
      viewBox="0 0 380 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a pulse-width-modulated solenoid signal repeating every 10 milliseconds with a 3 millisecond on-time. The Fluke 88V can report all three numbers, 100 hertz, 30 percent duty cycle and 3 milliseconds pulse width. The Fluke 179 reports only the 100 hertz frequency."
    >
      <path
        d={
          "M14 40 " +
          pulses.map((i) => `H${40 + i * 110} V96 H${73 + i * 110} V40`).join(" ") +
          " H366"
        }
        className="fill-none stroke-accent"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <text x="14" y="30" fontSize="9" className="fill-muted">supply level (off)</text>
      <text x="56" y="110" fontSize="9" textAnchor="middle" className="fill-muted">driver on</text>
      <path d="M150 108 H183 M150 104 V112 M183 104 V112" className="stroke-foreground" strokeWidth="1.2" />
      <text x="166" y="124" fontSize="9" textAnchor="middle" className="fill-foreground">3 ms on</text>
      <path d="M40 14 H150 M40 10 V18 M150 10 V18" className="stroke-muted" strokeWidth="1" />
      <text x="95" y="10" fontSize="9" textAnchor="middle" className="fill-muted">10 ms period</text>
      <rect x="14" y="140" width="170" height="50" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1.2" />
      <text x="24" y="158" fontSize="10" fontWeight="700" className="fill-accent">Fluke 88V shows</text>
      <text x="24" y="176" fontSize="9.5" className="fill-foreground">100 Hz · 30% · 3.000 ms</text>
      <rect x="196" y="140" width="170" height="50" rx="6" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="206" y="158" fontSize="10" fontWeight="700" className="fill-foreground">Fluke 179 shows</text>
      <text x="206" y="176" fontSize="9.5" className="fill-foreground">100 Hz only</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 88V vs Fluke 179: Which Is Better for Vehicle Diagnostics?",
  path,
  published: "2026-10-28",
  intro:
    "For vehicle diagnostics the Fluke 88V is the better meter: it reads RPM with an inductive pickup, injector pulse width in milliseconds, duty cycle and 250 µs peaks, none of which Fluke lists for the 179, and it adds microamp ranges for small currents. The Fluke 179 is a general-purpose meter that works well on cars without being built for them. It answers with True RMS AC, a backlit display Fluke states for it, and an 80BK temperature probe that is definitely in the box. Both are rated CAT III 1000V / CAT IV 600V with lifetime warranties, so the choice comes down to how much of your day is engine diagnosis.",
  a: {
    pick: all.find((p) => p.name === "Fluke 88V")!,
    imageAlt: "Fluke 88V automotive digital multimeter, front view of the dial and display",
    chooseIf: [
      "You chase driveability faults and want injector on-time, duty cycle and RPM read straight off the display",
      "You hunt intermittent dropouts and cranking dips, where 250 µs Peak Min/Max catches what an ordinary Min/Max misses",
      "You measure small module and key-off currents and want 0.1 µA resolution on the 600.0 µA range",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS multimeter, a general-purpose meter often used for vehicle wiring",
    chooseIf: [
      "Your car work is mostly batteries, charging, grounds and voltage drop, and the rest of your week is shop or building wiring",
      "You want True RMS on AC ripple, AC sensors and mains-powered shop equipment",
      "You want a backlit display under the dash and a temperature probe guaranteed in the box",
    ],
  },
  extraSpecs: [
    { label: "RPM", a: "30–12,000 RPM, ±2 RPM (RPM80 pickup)", b: "Not listed" },
    { label: "Pulse width", a: "0.002–1999.9 ms, ±(0.002 ms + 3)", b: "Not listed" },
    { label: "Duty cycle", a: "0.0–99.9%", b: "Not listed" },
    { label: "Frequency", a: "0.5 Hz–200 kHz, ±(0.01% + 1)", b: "To 100 kHz, ±(0.1% + 1)" },
    { label: "Fast capture", a: "250 µs Peak Min/Max", b: "Not listed; Min/Max-average" },
    { label: "AC conversion", a: "Average responding", b: "True RMS" },
    { label: "DC volts", a: "±(0.1% + 1), 1000 V", b: "±(0.09% + 2), 1000 V" },
    { label: "Display", a: "6,000; 19,999 in HiRes", b: "6,000, analog bar graph" },
    { label: "Backlight", a: "Not stated in our sources", b: "Yes" },
    { label: "Small current", a: "600.0 µA range, 0.1 µA steps", b: "0.01 mA best; no µA range" },
    { label: "Max current", a: "10 A; 20 A for 30 s", b: "10 A" },
    { label: "Temperature", a: "−200 to 1090 °C, ±(1% + 10)", b: "−40 to 400 °C, ±(1.0% + 10)" },
    { label: "Probes in the box", a: "Conflicting: manual says thermocouple included; listing says optional", b: "80BK temperature probe" },
    { label: "Input impedance", a: "10 MΩ", b: "Not stated" },
    { label: "Battery / weight", a: "9 V, 400 h / 355 g", b: "9 V, about 200 h / 420 g" },
    { label: "Warranty", a: "Lifetime limited", b: "Lifetime" },
  ],
  differences: [
    "Engine functions: the 88V reads RPM (with the RPM80 inductive pickup), duty cycle and injector pulse width directly. Fluke lists none of these for the 179, which reads frequency only.",
    "Intermittents: the 88V's Peak Min/Max records events as short as 250 µs. The 179 has Min/Max-average recording but Fluke lists no peak capture.",
    "Small currents: the 88V has 600.0 µA and 6000 µA ranges with 0.1 µA steps. The 179's finest current step is 0.01 mA and it has no µA range.",
    "AC: the 179 is True RMS; Fluke's 88V manual describes average-responding, rms-indicating AC. On a 12 V system most readings are DC, so this matters mainly for ripple, AC sensors and shop power.",
    "Display and probes: Fluke states a backlight for the 179 and includes the 80BK probe. Our 88V sources don't mention a backlight, and they conflict on whether the thermocouple and pickup are in the box.",
    "Shared: CAT III 1000V / CAT IV 600V, 1000 V maximum, 10 A, 50 MΩ, a 9 V cell and a lifetime warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 88V vs 179 comparison, job by job</h2>
        <p className="text-muted leading-7 mb-4">
          Spec sheets list functions; a technician thinks in jobs. This table maps the common vehicle checks to what each
          meter offers for them, using only functions Fluke publishes. &quot;Not listed&quot; means the function
          isn&apos;t in Fluke&apos;s 179 specifications, not that we tested it and it failed.
        </p>
        <DataTable
          head={["Vehicle job", "Fluke 88V", "Fluke 179"]}
          rows={[
            ["Battery rest and charging voltage", "Yes, ±(0.1% + 1)", "Yes, ±(0.09% + 2)"],
            ["Voltage drop on cables and grounds", "Yes", "Yes"],
            ["Cranking dip and dropouts", "250 µs Peak Min/Max", "Min/Max-average only"],
            ["Injector on-time", "Direct, in ms", "Not listed"],
            ["PWM solenoids, idle and fan control", "Duty cycle and Hz", "Hz only"],
            ["Engine speed", "RPM with RPM80 pickup", "Not listed"],
            ["Crank, cam and wheel-speed signals", "Hz to 200 kHz", "Hz to 100 kHz"],
            ["Key-off parasitic drain", "µA and mA ranges", "0.01 mA steps"],
            ["Alternator AC ripple", "Average responding", "True RMS"],
            ["Coolant, intake or A/C vent temperature", "Probe status varies", "80BK in the box"],
            ["Hybrid high-voltage DC (trained users)", "1000 V, CAT IV 600V", "1000 V, CAT IV 600V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Count the rows and the pattern is clear: the 179 matches the 88V on the basic electrical checks, and the 88V
          pulls ahead on everything that involves timing, speed or a fast event. That is why our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          ranking puts the 88V first and the 179 ninth. Neither meter has been hands-on tested by OhmSavvy; both carry a
          4.7 editorial score from desk research against Fluke&apos;s documents.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Duty cycle, pulse width and RPM</h2>
        <p className="text-muted leading-7 mb-4">
          Many engine actuators are switched on and off at a fixed rate, with the computer varying how long each pulse
          stays on: purge and idle-air valves, variable-cam solenoids, radiator-fan modules and fuel injectors. Three
          numbers describe such a signal, and the two meters see different amounts of it.
        </p>
        <Figure caption={<>Illustrative PWM signal: 100 Hz means a 10 ms period, and 30% of that is a 3 ms on-time.</>}>
          <PwmReadoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic in the diagram: period = 1 ÷ 100 Hz = 10 ms, and on-time = 0.30 × 10 ms = 3 ms. The 88V
          displays each of those directly, with pulse width from 0.002 ms to 1999.9 ms at ±(0.002 ms + 3 counts). The
          179 gives you the 100 Hz and stops there. With no duty-cycle function you can&apos;t even work the on-time
          out by hand, so on a rich-running injector or a solenoid that a scan tool says is commanded to 80%, the 179
          can confirm the signal is switching but not how long each pulse stays on.
        </p>
        <p className="text-muted leading-7 mt-4">
          RPM is the other 88V-only reading: two settings, 30 to 9,000 and 60 to 12,000 RPM, each ±2 RPM, through
          Fluke&apos;s RPM80 inductive pickup clipped over a plug or coil lead. The 88V Pick we track says Fluke now
          treats that pickup as optional for the bare meter, so budget for it if RPM matters. For step-by-step injector
          checks, see our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" className={link}>
            testing a fuel injector with a multimeter
          </Link>
          ; for crank sensors, see{" "}
          <Link href="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter" className={link}>
            testing a crankshaft position sensor
          </Link>
          .
        </p>
        <div className="mt-4">
          <Figure caption={<>Maximum frequency each meter reads. Both cover ordinary crank, cam and wheel-speed rates.</>}>
            <BarChart
              items={[
                { label: "Fluke 88V", value: 200, display: "200 kHz", highlight: true },
                { label: "Fluke 179", value: 100, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">DC volts on a 12 V system: closer than you&apos;d expect</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the 179&apos;s 0.09% looks tighter than the 88V&apos;s 0.1%, but the count terms differ: one count
          on the 88V, two on the 179. On 6,000-count ranges the 12 V and 14 V readings sit on the 60.00 V range, where a
          count is 0.01 V, and that extra count tips the balance toward the 88V at automotive voltages.
        </p>
        <DataTable
          head={["Reading", "88V: 0.1% + 1", "179: 0.09% + 2", "Tighter"]}
          rows={[
            ["5.000 V sensor reference", "±6.0 mV", "±6.5 mV", "88V, slightly"],
            ["12.60 V resting battery", "±22.6 mV", "±31.3 mV", "88V"],
            ["14.40 V charging", "±24.4 mV", "±33.0 mV", "88V"],
          ]}
        />
        <div className="mt-6">
          <Figure caption={<>Best-case allowance on a 12.60 V battery reading, percentage plus counts.</>}>
            <BarChart
              items={[
                { label: "Fluke 88V", value: 22.6, display: "±22.6 mV", highlight: true },
                { label: "Fluke 179", value: 31.3, display: "±31.3 mV" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Worked for 12.60 V: the 88V allows 0.1% × 12.60 = 12.6 mV plus one 10 mV count, ±22.6 mV; the 179 allows
          0.09% × 12.60 = 11.3 mV plus two counts, 20 mV, about ±31.3 mV. In practice both are far finer than the
          job. The gap between a charged and a part-discharged battery, or the drop across a corroded ground, is
          measured in tenths of a volt. The 88V&apos;s 19,999-count HiRes mode adds a digit for watching small changes,
          though our sources don&apos;t give a separate accuracy line for it. For the method, see{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            checking voltage drop on a car
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current: parasitic drain and small signals</h2>
        <p className="text-muted leading-7 mb-4">
          A key-off drain test puts the meter in series with the battery, and the 88V gives you more ranges to work
          with: 600.0 µA, 6000 µA, 60.00 mA, 400.0 mA, 6.000 A and 10.00 A, plus 20 A for up to 30 seconds. The
          179 resolves 0.01 mA at best and has no microamp range. For a drain in the tens of milliamps both meters
          resolve the same 0.01 mA step; the 88V&apos;s advantage is below about a milliamp, where the 179&apos;s 10 µA
          step gets coarse and a 50 µA current is just five counts.
        </p>
        <Figure caption={<>Finest current step, on a log scale: the 88V&apos;s µA range resolves 100 times finer.</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 88V", value: 0.1, display: "0.1 µA", highlight: true },
              { label: "Fluke 179", value: 10, display: "10 µA" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 88V manual also publishes burden voltage, the drop the meter itself adds in series: 1.8 mV per mA on the
          milliamp ranges, so a 30 mA drain costs about 54 mV across the meter. Fluke&apos;s 179 page in our sources
          doesn&apos;t state burden voltage. On the 179, a 30.00 mA reading carries a best-case allowance of 1.0% +
          3 counts, about ±0.33 mA. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>{" "}
          covers keeping modules asleep while you connect the meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 179 is the better car meter</h2>
        <ul className="space-y-3 text-muted leading-7">
          <li>
            <span className="text-foreground font-medium">AC that isn&apos;t a sine.</span> Alternator ripple from a
            failed diode and the output of a magnetic crank or wheel-speed sensor are rarely clean sines. The 179&apos;s
            True RMS converter reads them on their real shape; the 88V&apos;s average-responding converter assumes a sine.
            See{" "}
            <Link href="/multimeters/how-to-check-a-car-alternator-diode-with-a-multimeter" className={link}>
              checking an alternator diode
            </Link>
            .
          </li>
          <li>
            <span className="text-foreground font-medium">Dark footwells.</span> Fluke states a backlight for the 179.
            Our 88V sources don&apos;t mention one, so we can&apos;t promise it.
          </li>
          <li>
            <span className="text-foreground font-medium">A probe you know you&apos;ll get.</span> The 179 ships with
            the 80BK. For the 88V, the 2006 manual calls the thermocouple included while the current listing we track
            calls it optional, so check the box contents.
          </li>
          <li>
            <span className="text-foreground font-medium">Shop power.</span> If the same meter also checks the
            compressor circuit and lift motors, True RMS on mains-powered equipment favors the 179.
          </li>
        </ul>
        <div className="mt-4">
          <KeyIdea title="Temperature range is not the deciding factor">
            The 88V&apos;s −200 °C to 1090 °C span looks far wider than the 179&apos;s −40 °C to 400 °C, but both
            figures exclude the probe, and a probe&apos;s own rating usually sets the real limit. Coolant, intake air
            and A/C vent checks sit well inside both meters&apos; ranges. Choose on the diagnostic functions instead.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Intermittent faults: peak capture vs Min/Max</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters record minimum, maximum and average while you wiggle a harness or drive the car. The difference is
          speed. The 88V manual gives about 100 ms response for normal DC Min/Max and 250 µs in Peak Min/Max (1 ms for
          single events). Fluke doesn&apos;t publish a Min/Max response time for the 179 and lists no peak mode, so a
          dropout shorter than its sampling window can pass unrecorded. If your work is mostly no-starts, flickering
          dashboards and stalls that come and go, that one feature justifies the 88V. Our{" "}
          <Link href="/multimeters/fluke-88v-vs-fluke-117" className={link}>
            Fluke 88V vs 117
          </Link>{" "}
          comparison walks through a cranking-dip capture in detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Driveability or diagnostic technician", "Fluke 88V", "RPM, duty cycle, injector ms, 250 µs peaks"],
            ["General repair shop, mostly electrical", "Fluke 88V", "Peak capture for intermittents; µA drain ranges"],
            ["DIYer doing batteries, charging and grounds", "Fluke 179", "DC checks are equal; backlight and probe included"],
            ["Fleet tech who also maintains shop equipment", "Fluke 179", "True RMS on mains loads, CAT IV 600V"],
            ["HVAC-and-auto crossover work", "Fluke 179", "Temperature probe in the box, True RMS"],
            ["Hybrid service (trained, with PPE)", "Either; 88V for diagnosis", "Same 1000 V and CAT ratings"],
            ["Small-engine and motorcycle work", "Fluke 88V", "RPM through the inductive pickup"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you&apos;re weighing the 88V against an industrial meter instead, see{" "}
          <Link href="/multimeters/fluke-88v-vs-fluke-87v" className={link}>
            Fluke 88V vs 87V
          </Link>
          . If the 179 is your choice but you&apos;re unsure whether its temperature input is worth it, our{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-179" className={link}>
            Fluke 175 vs 179
          </Link>{" "}
          page covers what each 170-series step adds.
        </p>
      </section>

      <Callout title="Safety: high-voltage vehicles need more than a rated meter">
        Both meters carry CAT III 1000V and CAT IV 600V, which covers hybrid and EV battery voltages on paper. Only
        trained technicians should probe orange high-voltage cabling, after following the vehicle maker&apos;s disable
        procedure and wearing insulated gloves rated for the voltage. Use leads with a matching rating, keep the red lead
        out of the current jacks when measuring voltage, and never treat an RPM, frequency or duty-cycle reading as proof
        that a circuit is dead. If anyone receives a shock, call 911.
      </Callout>
    </>
  ),
  bottomLine:
    "For vehicle diagnostics, buy the Fluke 88V. RPM, duty cycle, direct injector pulse width, 250 µs peak capture and microamp ranges are the functions that find engine and intermittent faults, and Fluke lists none of them for the 179. Buy the Fluke 179 if your car work is mostly batteries, charging and wiring and the same meter also serves the shop or HVAC: it is True RMS, has a stated backlight and includes the 80BK probe, with the same CAT IV 600V rating and lifetime warranty.",
  faqs: [
    {
      question: "Is the Fluke 88V or 179 better for automotive work?",
      answer:
        "The 88V, for diagnosis. It adds RPM with an inductive pickup, duty cycle, injector pulse width in milliseconds, 250 µs Peak Min/Max and microamp ranges, none of which Fluke lists for the 179. The 179 handles battery, charging and voltage-drop checks just as well, so it suits owners who do occasional car work alongside other electrical jobs.",
    },
    {
      question: "Can the Fluke 179 measure duty cycle or RPM?",
      answer:
        "Fluke doesn't list either for the 179. It reads frequency up to 100 kHz, which confirms a PWM or sensor signal is switching but not its on-time. Without duty cycle you can't calculate injector pulse width from its readings. The 88V reads duty cycle from 0.0% to 99.9% and RPM with the RPM80 pickup.",
    },
    {
      question: "Is the Fluke 88V True RMS like the 179?",
      answer:
        "No. Fluke's 88V users manual says its AC conversion is average responding, rms indicating, while the 179 is True RMS on AC volts and AC current. Most vehicle measurements are DC, where this makes no difference. It matters for alternator ripple, magnetic sensors and mains-powered shop equipment, where non-sine waveforms read more accurately on the 179.",
    },
    {
      question: "Which is better for a parasitic draw test, the 88V or 179?",
      answer:
        "The 88V, for small draws. It has 600.0 µA and 6000 µA ranges with 0.1 µA steps, plus 60.00 mA and 400.0 mA ranges, and its manual publishes a 1.8 mV per mA burden. The 179 resolves 0.01 mA at best, which is fine for drains in the tens of milliamps but coarse below 1 mA: a 50 µA current is only five counts.",
    },
    {
      question: "Does the Fluke 88V come with a temperature probe and RPM pickup?",
      answer:
        "Sources disagree. Fluke's 88V users manual describes the K-type thermocouple as included, but the current listing we track says Fluke lists the inductive pickup and temperature probe as optional for the bare 88V. Check the box contents before buying. The 179 ships with the 80BK temperature probe; it has no RPM function.",
    },
    {
      question: "Which is more accurate on a car battery, the 88V or 179?",
      answer:
        "The 88V, by a small margin. At 12.60 V its ±(0.1% + 1) works out to about ±22.6 mV on a 6,000-count range, against about ±31.3 mV for the 179's ±(0.09% + 2), because the 179 adds two counts. Both are best-case figures and both are far finer than the few hundred millivolts that separate a healthy battery from a weak one.",
    },
  ],
  roundup: { label: "See the best multimeters for automotive", href: "/multimeters/best-multimeter-for-automotive" },
  related: [
    { label: "Fluke 88V vs Fluke 87V", href: "/multimeters/fluke-88v-vs-fluke-87v" },
    { label: "Fluke 88V vs Fluke 117 for automotive", href: "/multimeters/fluke-88v-vs-fluke-117" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 175 vs Fluke 179", href: "/multimeters/fluke-175-vs-fluke-179" },
    { label: "How to measure parasitic battery drain", href: "/multimeters/how-to-measure-parasitic-battery-drain" },
    { label: "How to test a fuel injector", href: "/multimeters/how-to-test-a-fuel-injector-with-a-multimeter" },
  ],
};

export default function Fluke88VVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
