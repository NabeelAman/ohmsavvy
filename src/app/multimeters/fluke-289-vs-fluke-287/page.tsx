// Specs per the Fluke "287/289 True-rms Digital Multimeters Users Manual" (June 2007, Rev. 2, 3/09), Fluke's own
// document as hosted by RS Components: https://docs.rs-online.com/91c2/A700000015027554.pdf (fluke.com product pages
// returned HTTP 403 to our fetcher; the 287 and 289 Picks in src/lib/multimeter-catalog.ts cite fluke.com and agree).
// Checked 2026-10-27. Both models: True RMS AC (ac-coupled); 50,000-count ranges (50.000 mV ... 1000.0 V);
// DC V ±(0.025% + 2) on 500 mV to 50 V, ±(0.03% + 2) on 500 V and 1000 V, 50 mV ±(0.05% + 20); AC V 45-65 Hz
// ±(0.3% + 25), specified to 100 kHz on low ranges; 500 µA range at 0.01 µA, DC ±(0.075% + 20); 5000 µA at 0.1 µA;
// 50 mA at 0.001 mA; 400 mA; 5 A; 10 A; burden 102 µV/µA, 1.8 mV/mA, 0.04 V/A; resistance 500 Ω (0.01 Ω,
// ±(0.05% + 10)) to 500 MΩ; conductance 50 nS; capacitance 1 nF to 100 mF, ±(1% + 5) (100 mF ±(2% + 20));
// diode 3.1 V; frequency 0.5 Hz to 999.99 kHz ±(0.005% + 5); duty cycle 1.00-99.00% at 0.01%; pulse width
// 0.1000 ms to 1999.9 ms; temperature -200 to +1350 °C ±(1% + 10) excluding probe; Peak 250 µs; MIN MAX response
// 200 ms DC / 350 ms AC; recording memory up to 10,000 sample intervals, events up to 15,000 minus intervals;
// IR link to FlukeView Forms; real-time clock; 6 AA batteries, 100 h minimum, 200 h in logging mode;
// 22.2 x 10.2 x 6.0 cm; 871 g; 1000 V CAT III / 600 V CAT IV; lifetime limited warranty (280 Series).
// Model 289 only (manual: "Model 289 only"): low ohms 50 Ω range at 0.001 Ω, ±(0.15% + 20), sourcing up to 10 mA
// at an open-circuit voltage up to 20 V, REL/REL% only; LoZ AC volts, input 3.2 kΩ in the spec table (caution text:
// about 3 kΩ), fixed 1000 V manual range; AC low-pass filter that blocks above 1 kHz, manual ranging only.
// Logging-vs-snapshot for professional electricians is covered by /multimeters/fluke-87v-vs-fluke-289 (another page);
// this page compares the two 280 Series models and their electronics-repair use.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-289-vs-fluke-287";

export const metadata = buildMetadata({
  title: "Fluke 289 vs Fluke 287: Which Logger Is Better?",
  description:
    "Fluke 289 vs Fluke 287: same 50,000-count logging core; the 289 adds a 50 Ω low-ohm range, LoZ and a low-pass filter. Electronics repair verdict, specs and charts.",
  path: "/multimeters/fluke-289-vs-fluke-287",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * Two-terminal low-ohm measurement on the 289's 50 Ω range: the meter sources up to 10 mA through the leads and the
 * part, and reads the voltage across both. REL subtracts the lead resistance measured with the probes shorted.
 */
function LowOhmDiagram() {
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on the Fluke 289's 50 ohm range the meter drives up to 10 milliamps through the red lead, the part under test and the black lead, and measures the total voltage. Lead and contact resistance add to the reading, so you short the probes first and press REL to subtract them."
    >
      <rect x="14" y="40" width="96" height="110" rx="12" className="fill-[#f0b429]" />
      <rect x="26" y="52" width="72" height="40" rx="4" fill="#c9d4b8" />
      <text x="62" y="78" fontSize="13" textAnchor="middle" fill="#1a1d21" fontFamily="ui-monospace, monospace">
        0.103 Ω
      </text>
      <text x="62" y="112" fontSize="9" textAnchor="middle" fill="#1a1d21">
        50 Ω range
      </text>
      <text x="62" y="126" fontSize="9" textAnchor="middle" fill="#1a1d21">
        sources ≤10 mA
      </text>
      <path d="M110 70 H170 V40 H200" className="fill-none stroke-[#e5484d]" strokeWidth="2.2" />
      <path d="M110 120 H170 V150 H200" className="fill-none stroke-foreground" strokeWidth="2.2" />
      <text x="140" y="62" fontSize="8.5" textAnchor="middle" className="fill-muted">
        lead + contact R
      </text>
      <text x="140" y="140" fontSize="8.5" textAnchor="middle" className="fill-muted">
        lead + contact R
      </text>
      <path d="M200 40 H260 V70" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <rect x="248" y="70" width="24" height="50" rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="282" y="92" fontSize="9.5" className="fill-foreground">
        part under test
      </text>
      <text x="282" y="105" fontSize="9" className="fill-muted">
        shunt, trace, contact
      </text>
      <path d="M260 120 V150 H200" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <path d="M232 30 l8 -6 l-1 8 Z" className="fill-accent" />
      <text x="188" y="20" fontSize="9" className="fill-accent">
        test current, up to 10 mA
      </text>
      <text x="180" y="180" fontSize="9" textAnchor="middle" className="fill-muted">
        Short the probes, press REL, then measure: the leads drop out of the reading.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 289 vs Fluke 287: Which Logging Multimeter Is Better?",
  path,
  published: "2026-10-27",
  intro:
    "The Fluke 289 and Fluke 287 are the same logging multimeter with three differences, all in the 289's favor: a 50 Ω low-ohm range that resolves 0.001 Ω, a LoZ input for ghost voltage, and an AC low-pass filter for inverters and drives. Everything else matches in Fluke's 287/289 manual, from the 50,000-count display and 0.025% DC accuracy to the 0.01 µA microamp range, TrendCapture logging memory and CAT IV 600V rating. For electronics repair, the 289 is better only if you measure resistances below about an ohm; otherwise the 287 does the same job for less.",
  a: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS industrial logging multimeter, front view",
    chooseIf: [
      "You check shunts, PCB traces, connector contacts or motor windings well below an ohm",
      "You also work on building wiring and want LoZ to expose ghost voltage",
      "You measure inverter or drive outputs and want the 1 kHz low-pass filter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 True RMS electronics logging multimeter, front view",
    chooseIf: [
      "Your work is bench electronics: sleep current, rails, sensors and logging a drifting supply",
      "0.01 Ω resolution on the 500 Ω range is fine for the resistances you meet",
      "You want the 280 Series logging and accuracy without paying for industrial extras",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "50,000 counts", b: "50,000 counts" },
    { label: "DC volts accuracy", a: "±(0.025% + 2)", b: "±(0.025% + 2)" },
    { label: "Lowest resistance range", a: "50 Ω, 0.001 Ω steps, ±(0.15% + 20)", b: "500 Ω, 0.01 Ω steps, ±(0.05% + 10)" },
    { label: "LoZ (ghost voltage)", a: "Yes, AC V, 3.2 kΩ input", b: "No" },
    { label: "Low-pass filter", a: "Yes, blocks above 1 kHz", b: "No" },
    { label: "Microamps", a: "500 µA range, 0.01 µA, 102 µV/µA", b: "500 µA range, 0.01 µA, 102 µV/µA" },
    { label: "Capacitance", a: "1 nF to 100 mF", b: "1 nF to 100 mF" },
    { label: "Frequency / duty", a: "To 999.99 kHz / 1–99%", b: "To 999.99 kHz / 1–99%" },
    { label: "Temperature", a: "-200 to 1350 °C (K-type)", b: "-200 to 1350 °C (K-type)" },
    { label: "Logging memory", a: "Up to 10,000 intervals", b: "Up to 10,000 intervals" },
    { label: "Battery", a: "6 AA; 100 h min, 200 h logging", b: "6 AA; 100 h min, 200 h logging" },
    { label: "Weight", a: "871 g", b: "871 g" },
    { label: "Warranty", a: "Lifetime limited", b: "Lifetime limited" },
  ],
  differences: [
    "Low ohms: only the 289 has the 50 Ω range, resolving 0.001 Ω with up to 10 mA of test current. The 287's finest step is 0.01 Ω on its 500 Ω range.",
    "LoZ: only the 289 has a low-impedance AC volts position (3.2 kΩ in Fluke's spec table) that drains capacitively coupled ghost voltage.",
    "Low-pass filter: only the 289 can filter AC readings above 1 kHz, which helps on inverter and variable-frequency drive outputs.",
    "Identical on both: 50,000 counts, DC ±(0.025% + 2), the 500 µA range at 0.01 µA, burden voltage, capacitance to 100 mF, frequency to 999.99 kHz, temperature, logging memory, IR PC link, battery, weight and CAT III 1000V / CAT IV 600V.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Three differences, one manual</h2>
        <InfoCards
          items={[
            { label: "Shared core", desc: "50,000 counts, True RMS, 0.025% DC, logging, CAT IV 600V." },
            { label: "289 only: 50 Ω", desc: "0.001 Ω resolution with REL to zero the leads." },
            { label: "289 only: LoZ", desc: "3.2 kΩ AC volts input that collapses ghost voltage." },
            { label: "289 only: filter", desc: "AC low-pass that blocks content above 1 kHz." },
            { label: "Same µA", desc: "500 µA range, 0.01 µA steps, 102 µV per µA burden." },
            { label: "Verdict", desc: "Low ohms or field work: 289. Bench electronics: 287." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Fluke publishes one users manual for both meters and marks the 289-only sections, which makes this comparison
          unusually clean. We haven&apos;t bench-tested either model, so the numbers below are Fluke&apos;s. If you&apos;re
          weighing the 289 against a non-logging meter instead, our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>{" "}
          comparison covers that choice for professional electricians.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 289 vs 287 spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 289", "Fluke 287", "Same?"]}
          rows={[
            ["DC volts, 500 mV–50 V", "±(0.025% + 2)", "±(0.025% + 2)", "Same"],
            ["AC volts, 45–65 Hz", "±(0.3% + 25), True RMS", "±(0.3% + 25), True RMS", "Same"],
            ["AC bandwidth", "Specified to 100 kHz (low ranges)", "Specified to 100 kHz (low ranges)", "Same"],
            ["50 Ω low-ohm range", "0.001 Ω, ±(0.15% + 20)", "Not available", "289 only"],
            ["500 Ω range", "0.01 Ω, ±(0.05% + 10)", "0.01 Ω, ±(0.05% + 10)", "Same"],
            ["Top resistance", "500 MΩ", "500 MΩ", "Same"],
            ["LoZ AC volts", "3.2 kΩ input, 1000 V range", "Not available", "289 only"],
            ["Low-pass filter", "Above 1 kHz blocked", "Not available", "289 only"],
            ["500 µA DC", "0.01 µA, ±(0.075% + 20)", "0.01 µA, ±(0.075% + 20)", "Same"],
            ["50 mA / 400 mA / 10 A", "0.001 mA / 0.01 mA / 0.001 A", "0.001 mA / 0.01 mA / 0.001 A", "Same"],
            ["Capacitance", "1 nF–100 mF, ±(1% + 5)", "1 nF–100 mF, ±(1% + 5)", "Same"],
            ["Frequency", "0.5 Hz–999.99 kHz", "0.5 Hz–999.99 kHz", "Same"],
            ["Duty / pulse width", "1–99% / 0.1–1999.9 ms", "1–99% / 0.1–1999.9 ms", "Same"],
            ["Temperature", "-200 to 1350 °C", "-200 to 1350 °C", "Same"],
            ["Peak capture", "250 µs", "250 µs", "Same"],
            ["Recording", "10,000 intervals + events", "10,000 intervals + events", "Same"],
            ["PC link", "IR, FlukeView Forms", "IR, FlukeView Forms", "Same"],
            ["Safety", "CAT III 1000V / CAT IV 600V", "CAT III 1000V / CAT IV 600V", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Finest resistance step, log scale. The 289&apos;s 50 Ω range is ten times finer.</>}>
            <BarChart
              log
              items={[
                { label: "289, 50 Ω range", value: 0.001, display: "0.001 Ω", highlight: true },
                { label: "287, 500 Ω range", value: 0.01, display: "0.01 Ω" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed error measuring a 0.100 Ω part after REL, from Fluke&apos;s accuracy lines. Lower is better.</>}>
            <BarChart
              items={[
                { label: "289, 50 Ω range", value: 0.02, display: "±0.020 Ω", highlight: true },
                { label: "287, 500 Ω range", value: 0.1, display: "±0.100 Ω" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The second chart is where the 289 earns its place. On the 287&apos;s 500 Ω range, the floor of 10 counts at
          0.01 Ω is ±0.10 Ω before the percentage term, so a 0.100 Ω part could read anywhere from 0.00 to 0.20 Ω. On
          the 289&apos;s 50 Ω range, 20 counts at 0.001 Ω is ±0.020 Ω, plus 0.15% of 0.1 Ω (0.00015 Ω): a reading
          between roughly 0.08 and 0.12 Ω. That&apos;s the gap between &quot;near zero&quot; and an actual number.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How the 289&apos;s low-ohm range works</h2>
        <p className="text-muted leading-7 mb-4">
          Per the manual, the 50 Ω function has a single range, sources up to 10 mA at an open-circuit voltage up to
          20 V, and allows only relative and relative-percent modes. More current through a small resistance gives a
          bigger voltage to measure, which is how it reaches 0.001 Ω steps. It&apos;s still a two-terminal measurement,
          not a four-wire Kelvin setup, so the leads and probe contacts sit in series with the part.
        </p>
        <Figure caption={<>Two-terminal low-ohm measurement. Lead and contact resistance are inside the loop, which is why REL matters.</>}>
          <LowOhmDiagram />
        </Figure>
        <FlowDiagram
          steps={[
            { label: "Dial to 50 Ω", sub: "289 only; single range" },
            { label: "Short the probes", sub: "Press firmly, as you will on the part" },
            { label: "Menu → REL", sub: "Lead resistance becomes zero" },
            { label: "Measure the part", sub: "Same pressure, clean contacts" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 20 V open-circuit figure is the caution. Fluke warns the function can damage the circuit under test, so
          use it on de-energized, isolated parts, not across semiconductor junctions on a powered-down board you
          don&apos;t want stressed. For method and alternatives, see{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            best multimeters for measuring low resistance
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter" className={link}>
            how to test a shunt resistor
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 287 vs 289 for electronics repair</h2>
        <p className="text-muted leading-7 mb-4">
          For board-level repair the two meters are closer than the price gap suggests. The functions a repair tech
          leans on every day are identical in Fluke&apos;s tables: the 500 µA range at 0.01 µA for sleep and standby
          current, capacitance from 1 nF to 100 mF, frequency to 999.99 kHz, duty cycle and pulse width for PWM lines,
          a 3.1 V diode test, 50 nS conductance for leakage, temperature for a hot regulator, and the same
          logging memory to catch a fault that only appears after an hour.
        </p>
        <DataTable
          head={["Repair task", "What it needs", "Fluke 289", "Fluke 287"]}
          rows={[
            ["Sleep current on a battery device", "µA range, low burden", "0.01 µA, 102 µV/µA", "0.01 µA, 102 µV/µA"],
            ["Find a shorted rail", "Low-ohm resolution", "0.001 Ω steps", "0.01 Ω steps"],
            ["Current-sense shunt check", "Sub-ohm accuracy", "±0.020 Ω at 0.1 Ω", "±0.10 Ω at 0.1 Ω"],
            ["Bulk and supercapacitors", "Capacitance range", "To 100 mF", "To 100 mF"],
            ["PWM or clock line", "Frequency, duty", "999.99 kHz, 1–99%", "999.99 kHz, 1–99%"],
            ["Intermittent dropout overnight", "Logging", "10,000 intervals", "10,000 intervals"],
            ["Logic or sensor rail", "High-impedance volts", "10 MΩ V input", "10 MΩ V input"],
            ["Mains-side ghost reading", "LoZ", "3.2 kΩ AC input", "Not available"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Microamp burden is the same on both, so here&apos;s what it means in practice. A device sleeping at 300 µA
          drops 300 × 102 µV ≈ 31 mV across the meter. On a 3.3 V rail that&apos;s under 1%, usually harmless; on a
          coin-cell circuit near its brown-out threshold, it can matter, and neither meter has an advantage there. Our
          guide to{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current
          </Link>{" "}
          covers ways to work around burden.
        </p>
        <p className="text-muted leading-7 mt-4">
          The 50 Ω range is the one 289 feature that changes repair outcomes. Hunting a shorted capacitor on a power
          rail means comparing tiny resistances from point to point: the closer you get to the short, the lower the
          number. With 0.001 Ω steps, a few milliohms of copper between test points show up as a gradient you can follow.
          With 0.01 Ω steps and a 10-count error floor, the 287 tends to read near zero across the whole rail. Our guide
          to{" "}
          <Link href="/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" className={link}>
            checking a PCB for a short circuit
          </Link>{" "}
          walks through the method.
        </p>
        <KeyIdea title="LoZ is not a bench feature">
          The 289&apos;s LoZ position puts about 3 kΩ across the leads, and Fluke cautions against using it on circuits
          that low impedance could damage. On a logic board it can load a signal and mislead you. For electronics, LoZ is
          a reason to pick the 289 only if the same meter also goes to mains wiring. On the bench, the 287 gives up
          nothing by lacking it.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The low-pass filter and LoZ outside the lab</h2>
        <p className="text-muted leading-7 mb-4">
          The 289&apos;s other two extras point at field work. The low-pass filter blocks AC content above 1 kHz, which
          Fluke says improves readings on the composite waveforms from inverters and variable-frequency drives; with it
          on, the meter switches to manual ranging. LoZ reads AC volts on a fixed 1000 V range through a 3.2 kΩ input,
          which collapses the phantom voltage a disconnected conductor picks up from live neighbors. Both are aimed at
          solar, motor-control and building work, not bench electronics.
        </p>
        <Figure caption={<>Volts input impedance on a log scale, per the 287/289 manual&apos;s input characteristics table.</>}>
          <BarChart
            log
            items={[
              { label: "V input (both)", value: 10_000_000, display: "10 MΩ" },
              { label: "LoZ input (289)", value: 3_200, display: "3.2 kΩ", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electronics repair tech, phones and laptops", "Fluke 289", "0.001 Ω steps help trace shorted rails"],
            ["Embedded developer logging sleep current", "Fluke 287", "Same µA range and logging; no need for extras"],
            ["Hobbyist with one high-end meter", "Fluke 287", "Everything a bench needs at a lower price"],
            ["Solar and inverter installer", "Fluke 289", "Low-pass filter and LoZ for field AC"],
            ["Industrial controls and drives", "Fluke 289", "Filter on drive outputs, LoZ on panel wiring"],
            ["Battery pack and BMS builder", "Fluke 289", "Measure busbar, weld and shunt resistance"],
            ["Lab or calibration bench", "Either", "Identical DC accuracy and resolution"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For alternatives at lower prices, our{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          guides compare both Flukes with Brymen and UNI-T options. Our explainer on{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>{" "}
          shows how to read accuracy lines like the ones above.
        </p>
      </section>

      <Callout title="Safety: discharge before ohms, and test live first">
        Both meters are rated CAT III 1000V and CAT IV 600V, but resistance and low-ohm modes are for de-energized
        circuits only: discharge capacitors before measuring, because the 289&apos;s 50 Ω range sources current and a
        charged capacitor can damage the meter or the board. On mains equipment, Fluke warns not to use the low-pass filter
        to check whether voltage is present, since it can hide some of it; measure unfiltered first. Never use LoZ on
        circuits that a 3 kΩ load could damage.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 289 if you measure resistances below an ohm, such as shunts, rails, busbars and windings, or if the meter also goes to solar, drive or building work where LoZ and the low-pass filter help. Buy the Fluke 287 for bench electronics and logging: it shares the 289's 50,000-count accuracy, 0.01 µA microamp range, capacitance, frequency and recording memory, and gives up only features that matter in the field.",
  faqs: [
    {
      question: "What is the difference between the Fluke 287 and 289?",
      answer:
        "Three functions, all on the 289: a 50 Ω low-ohm range with 0.001 Ω resolution, a LoZ AC volts position for ghost voltage, and an AC low-pass filter that blocks content above 1 kHz. Fluke's shared manual gives both meters the same 50,000-count display, accuracy, microamp range, capacitance, frequency, logging memory, battery, weight and CAT IV 600V rating.",
    },
    {
      question: "Is the Fluke 287 good enough for electronics repair?",
      answer:
        "Yes, for most of it. It resolves 0.01 µA on the 500 µA range, measures capacitance from 1 nF to 100 mF, reads frequency to 999.99 kHz and logs readings over time. Its weak spot is sub-ohm work: the 500 Ω range's 10-count error floor is ±0.10 Ω, too coarse for tracing a shorted rail or checking a current-sense shunt.",
    },
    {
      question: "Does the Fluke 287 have LoZ?",
      answer:
        "No. Fluke's 287/289 manual marks LoZ as a model 289 feature. On the 289 it reads AC volts through a 3.2 kΩ input on a fixed 1000 V range, which drains capacitively coupled ghost voltage. On a 287 you can still unmask a phantom reading by adding a suitable load across the leads, but there is no dial position for it.",
    },
    {
      question: "Is the Fluke 289's 50 Ω range a four-wire measurement?",
      answer:
        "No, it's two-terminal. The meter sources up to 10 mA through the same leads it measures with, so lead and contact resistance add to the reading. Short the probes and press REL to subtract them, then keep contact pressure consistent. For true four-wire Kelvin measurements you need a dedicated milliohm meter.",
    },
    {
      question: "Do the Fluke 287 and 289 log the same amount of data?",
      answer:
        "Yes. The shared manual gives both up to 10,000 recorded sample intervals, with events filling the rest of a 15,000-record budget. Both view logged data as a graph on the meter, have a real-time clock, and transfer to a PC through the infrared link with FlukeView Forms. Battery life is listed as 100 hours minimum, 200 hours in logging mode.",
    },
    {
      question: "Which has the better microamp range, the 287 or 289?",
      answer:
        "Neither: they're identical. Both have a 500 µA range resolving 0.01 µA with DC accuracy of ±(0.075% + 20) and a burden of 102 µV per µA, plus a 5,000 µA range at 0.1 µA. A 300 µA sleep current drops about 31 mV across either meter, which is usually harmless on a 3.3 V rail.",
    },
  ],
  roundup: { label: "See the best multimeters for electronics repair", href: "/multimeters/best-multimeters-for-electronics-repair" },
  related: [
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 88V vs Fluke 87V", href: "/multimeters/fluke-88v-vs-fluke-87v" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "How to check a PCB for a short circuit", href: "/multimeters/how-to-check-a-pcb-for-a-short-circuit-with-a-multimeter" },
    { label: "How to measure microamps", href: "/multimeters/how-to-measure-microamps-with-a-multimeter" },
  ],
};

export default function Fluke289VsFluke287Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
