// Fluke 287 facts per the Fluke 287 Pick in src/lib/multimeter-catalog.ts (specs per fluke.com, the 287 datasheet and
// the 287/289 Users Manual) and the spec comment on /multimeters/fluke-289-vs-fluke-287 (287/289 Users Manual, checked
// 2026-10-27): True RMS; 50,000 counts (50.000 mV ... 1000.0 V ranges); DC V ±(0.025% + 2) on 500 mV to 50 V;
// AC V 45-65 Hz ±(0.3% + 25); 500 µA range at 0.01 µA, DC ±(0.075% + 20), burden 102 µV/µA; 5000 µA at 0.1 µA;
// 50 mA at 0.001 mA; 400 mA; 10 A; resistance 500 Ω range at 0.01 Ω to 500 MΩ; conductance 50 nS; capacitance 1 nF to
// 100 mF ±(1% + 5); diode 3.1 V; frequency 0.5 Hz to 999.99 kHz ±(0.005% + 5); duty cycle 1-99%; pulse width;
// temperature -200 to +1350 °C excluding probe; Peak 250 µs; recording up to 10,000 intervals; real-time clock;
// IR link to FlukeView Forms; 6 AA, 100 h minimum, 200 h in logging mode; 22.2 x 10.2 x 6.0 cm; 871 g;
// CAT III 1000V / CAT IV 600V; lifetime limited warranty. No LoZ (289 only). Amazon listing's "Category I/II" wording
// conflicts with Fluke's rating; we use Fluke's.
// Fluke 179 facts per the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx (fluke.com 179 page and the
// 170 Series datasheet) and the spec comments on /multimeters/fluke-117-vs-fluke-179 and /multimeters/fluke-87v-vs-fluke-179
// (fluke.com 179 spec tab, checked 2026-10-26): True RMS; 6,000 counts with analog bar graph; DC V ±(0.09% + 2);
// AC V ±(1.0% + 3); 10 A with 0.01 mA finest resolution (no µA range); 50 MΩ; capacitance to 10,000 µF ±(1.2% + 2);
// frequency to 100 kHz ±(0.1% + 1); temperature -40 to 400 °C with thermocouple supplied; Min/Max-Average;
// CAT III 1000V / CAT IV 600V; 420 g; one 9 V, about 200 h; lifetime warranty.
// Not in our sources (written as "Not stated"): 179 duty cycle, 179 finest resistance step, 179 dimensions,
// 287 bundled temperature probe, 179 probe type and temperature accuracy.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-287-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 287 vs Fluke 179 for Electronics Work",
  description:
    "Fluke 287 vs Fluke 179 for electronics: 50,000 vs 6,000 counts, 0.01 µA vs 10 µA current steps, and logging vs Min/Max. Specs, charts and which to buy.",
  image: all.find((p) => p.name === "Fluke 287")!.image,
  path: "/multimeters/fluke-287-vs-fluke-179",
});

const link = "text-accent hover:underline";

/**
 * The same 3.300 V rail on each meter: step size and the error window allowed by Fluke's DC accuracy line.
 * Scale 3.290 V to 3.310 V across 300 px (15 px per mV). Arithmetic from published specs, not measurements.
 */
function RailResolutionDiagram() {
  const x0 = 24;
  const pxPerMv = 15;
  const xAt = (mv: number) => x0 + (mv + 10) * pxPerMv; // mv relative to 3.300 V
  const fineTicks = Array.from({ length: 41 }, (_, i) => -2 + i * 0.1);
  const coarseTicks = Array.from({ length: 21 }, (_, i) => -10 + i);
  return (
    <svg
      viewBox="0 0 348 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: a 3.300 volt rail on a scale from 3.290 to 3.310 volts. The Fluke 287 on its 5 volt range steps in 0.1 millivolt and its DC spec allows about plus or minus 1.0 millivolt. The Fluke 179 on its 6 volt range steps in 1 millivolt and its spec allows about plus or minus 5.0 millivolts, a window five times wider."
    >
      <text x="174" y="14" fontSize="10" fontWeight="600" textAnchor="middle" className="fill-foreground">
        One 3.300 V rail, two meters (from Fluke&apos;s specs)
      </text>
      {/* 287 row */}
      <text x={x0} y="38" fontSize="9" className="fill-foreground">
        Fluke 287, 5 V range: 0.1 mV steps
      </text>
      <rect x={xAt(-1.025)} y="46" width={2.05 * pxPerMv} height="24" rx="3" className="fill-accent/25 stroke-accent" strokeWidth="1" />
      <line x1={x0} x2={xAt(10)} y1="70" y2="70" className="stroke-border" strokeWidth="1" />
      {fineTicks.map((t) => (
        <line key={`f${t.toFixed(1)}`} x1={xAt(t)} x2={xAt(t)} y1="64" y2="70" className="stroke-foreground" strokeWidth="0.5" />
      ))}
      <text x={xAt(0)} y="84" fontSize="8.5" textAnchor="middle" className="fill-accent">
        ±1.0 mV
      </text>
      {/* 179 row */}
      <text x={x0} y="106" fontSize="9" className="fill-foreground">
        Fluke 179, 6 V range: 1 mV steps
      </text>
      <rect x={xAt(-4.97)} y="114" width={9.94 * pxPerMv} height="24" rx="3" className="fill-foreground/10 stroke-foreground" strokeWidth="1" />
      <line x1={x0} x2={xAt(10)} y1="138" y2="138" className="stroke-border" strokeWidth="1" />
      {coarseTicks.map((t) => (
        <line key={`c${t}`} x1={xAt(t)} x2={xAt(t)} y1="130" y2="138" className="stroke-foreground" strokeWidth="0.8" />
      ))}
      <text x={xAt(0)} y="152" fontSize="8.5" textAnchor="middle" className="fill-foreground">
        ±5.0 mV
      </text>
      {/* axis labels */}
      <text x={xAt(-10)} y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">3.290 V</text>
      <text x={xAt(0)} y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">3.300 V</text>
      <text x={xAt(10)} y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">3.310 V</text>
      <text x="174" y="192" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Shaded band: where the true value may lie for a 3.300 V display
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 287 vs Fluke 179: Which Is Better for Electronics Work?",
  path,
  published: "2026-10-28",
  intro:
    "For electronics work the Fluke 287 is the better meter, by a wide margin on paper. It shows 50,000 counts against the 179's 6,000, resolves current down to 0.01 µA where the 179 stops at 0.01 mA, reads frequency to 999.99 kHz instead of 100 kHz, and records up to 10,000 timed readings that the 179 can only summarize as a minimum, maximum and average. The Fluke 179 still makes sense if your bench is one stop on a working day that also includes panels, HVAC units and motors: it's half the weight, runs on a 9V battery, and shares the 287's CAT IV 600V rating and lifetime warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 True RMS electronics logging multimeter, front view",
    chooseIf: [
      "You measure sleep or standby current on battery devices and need a real microamp range",
      "You want to log a drifting supply, sensor or battery overnight and review it as a graph",
      "You read PWM, clock or oscillator lines above 100 kHz",
      "You trim or verify reference voltages where a few millivolts matter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS digital multimeter, front view",
    chooseIf: [
      "Electronics is part of the job, alongside industrial maintenance or HVAC calls",
      "You want temperature with a thermocouple included in the box",
      "Your current readings are in milliamps and amps, not microamps",
      "You want a lighter meter (420 g) that runs on a single 9V battery",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "50,000 counts", b: "6,000 counts + analog bar graph" },
    { label: "Basic DC volts accuracy", a: "±(0.025% + 2)", b: "±(0.09% + 2)" },
    { label: "AC volts accuracy", a: "±(0.3% + 25), 45–65 Hz", b: "±(1.0% + 3)" },
    { label: "Finest current step", a: "0.01 µA (500 µA range)", b: "0.01 mA (no µA range)" },
    { label: "Burden voltage (µA)", a: "102 µV per µA", b: "Not applicable" },
    { label: "Resistance", a: "To 500 MΩ; 0.01 Ω steps on 500 Ω", b: "To 50 MΩ; finest step not stated" },
    { label: "Conductance", a: "50 nS range", b: "Not stated" },
    { label: "Capacitance", a: "1 nF to 100 mF, ±(1% + 5)", b: "To 10,000 µF, ±(1.2% + 2)" },
    { label: "Frequency", a: "0.5 Hz to 999.99 kHz, ±(0.005% + 5)", b: "To 100 kHz, ±(0.1% + 1)" },
    { label: "Duty cycle / pulse width", a: "1–99% / 0.1–1999.9 ms", b: "Not stated" },
    { label: "Temperature", a: "-200 to 1350 °C (probe not stated)", b: "-40 to 400 °C, thermocouple supplied" },
    { label: "Recording", a: "Up to 10,000 intervals, real-time clock", b: "Min/Max-Average only" },
    { label: "PC link", a: "IR, FlukeView Forms", b: "Not stated" },
    { label: "Peak capture", a: "250 µs", b: "Not stated" },
    { label: "Safety rating", a: "CAT III 1000V / CAT IV 600V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Power", a: "6 × AA; 100 h min, 200 h logging", b: "One 9V; about 200 h" },
    { label: "Weight", a: "871 g", b: "420 g" },
    { label: "Warranty", a: "Lifetime limited", b: "Lifetime" },
  ],
  differences: [
    "Resolution: the 287's 50,000-count ranges show one more digit than the 179's 6,000 counts, so a 3.3 V rail reads in 0.1 mV steps instead of 1 mV.",
    "DC accuracy: Fluke specifies ±(0.025% + 2) for the 287 and ±(0.09% + 2) for the 179, so the 287's error window on a 3.3 V rail is about five times narrower.",
    "Microamps: the 287 has a 500 µA range resolving 0.01 µA with a published 102 µV/µA burden. The 179 has no µA range; its finest step is 0.01 mA, which is 10 µA.",
    "Frequency and capacitance: the 287 reads to 999.99 kHz (the 179 to 100 kHz) and capacitance to 100 mF (the 179 to 10,000 µF, a tenth of that).",
    "Logging: the 287 stores up to 10,000 time-stamped intervals and graphs them on the meter. The 179's Min/Max-Average keeps the extremes and the average, not when they happened.",
    "Identical: True RMS, CAT III 1000V / CAT IV 600V, and a lifetime warranty. The 179 is lighter (420 g vs 871 g) and includes a thermocouple; neither has LoZ.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The short version for a bench</h2>
        <InfoCards
          items={[
            { label: "Counts", desc: "287: 50,000. 179: 6,000. One extra digit on every range." },
            { label: "Smallest current", desc: "287: 0.01 µA. 179: 10 µA. A thousandfold gap." },
            { label: "Frequency", desc: "287: to 999.99 kHz. 179: to 100 kHz." },
            { label: "Recording", desc: "287: 10,000 timed intervals. 179: min, max and average." },
            { label: "Shared", desc: "True RMS, CAT IV 600V, lifetime warranty." },
            { label: "179's edge", desc: "Half the weight, 9V battery, thermocouple in the box." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These are two different classes of meter that happen to share a brand, a safety rating and a warranty. The
          179 is a 170 Series troubleshooting meter that also handles electronics; the 287 is a 280 Series instrument
          designed around electronics and logging. We haven&apos;t tested either on our bench, so every figure here is
          Fluke&apos;s, and the worked numbers below are arithmetic on those figures.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resolution and DC accuracy on a logic rail</h2>
        <p className="text-muted leading-7 mb-4">
          Counts decide the smallest change a meter can show; the accuracy line decides how far the display can be from
          the truth. Put both meters on a 3.300 V rail. The 287 measures it on its 5 V range (50,000 counts, so 0.1 mV
          per count) and Fluke allows 0.025% of reading plus 2 counts: 0.825 mV + 0.2 mV ≈ ±1.0 mV. The 179 uses its
          6 V range (6,000 counts, 1 mV per count) with 0.09% plus 2 counts: 2.97 mV + 2 mV ≈ ±5.0 mV.
        </p>
        <Figure caption={<>Error windows on a 3.300 V rail, from Fluke&apos;s DC accuracy lines. Illustrative arithmetic, not a measurement.</>}>
          <RailResolutionDiagram />
        </Figure>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display counts per range. More counts means a finer step on the same range.</>}>
            <BarChart
              items={[
                { label: "Fluke 287", value: 50000, display: "50,000", highlight: true },
                { label: "Fluke 179", value: 6000, display: "6,000" },
              ]}
            />
          </Figure>
          <Figure caption={<>Allowed DC error on a 3.300 V rail, in millivolts. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 287", value: 1.0, display: "±1.0 mV", highlight: true },
                { label: "Fluke 179", value: 5.0, display: "±5.0 mV" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Does ±5 mV matter? For deciding whether a regulator is alive, no. It starts to matter when you compare two
          points on the same rail to find a voltage drop across a connector or trace, when you set a trimmer on a
          reference, or when you check an ADC input against its expected value. A 4 mV drop is inside the 179&apos;s
          window and well outside the 287&apos;s. Our explainer on{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>{" "}
          walks through reading these spec lines for other ranges.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Microamps: the gap that decides it</h2>
        <p className="text-muted leading-7 mb-4">
          Battery-powered electronics live and die by sleep current, and this is where the two meters stop being
          comparable. Take a sensor node that should sleep at 45 µA (an illustrative figure). On the 287&apos;s 500 µA
          range it reads to 0.01 µA, and Fluke&apos;s accuracy line allows 0.075% of reading plus 20 counts, about
          ±0.23 µA. The burden is 102 µV per µA, so the meter drops roughly 4.6 mV at 45 µA, which a 3 V coin-cell
          circuit tolerates.
        </p>
        <Figure caption={<>Finest current step on a log scale. The 287 resolves 1,000 times smaller changes.</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 287", value: 0.01, display: "0.01 µA", highlight: true },
              { label: "Fluke 179", value: 10, display: "10 µA" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 179 has no microamp range. Its finest current step is 0.01 mA, so the same 45 µA shows as 0.04 or
          0.05 mA. That can tell you the device is roughly asleep, but not whether firmware changes cut 45 µA to 38 µA,
          or whether a pull-up is leaking 3 µA. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current
          </Link>{" "}
          covers the method, and{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          ranks the meters that resolve it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitance, frequency and timing</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Top of the frequency range, kHz. The 287 reaches nearly ten times higher.</>}>
            <BarChart
              items={[
                { label: "Fluke 287", value: 999.99, display: "999.99 kHz", highlight: true },
                { label: "Fluke 179", value: 100, display: "100 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum capacitance, µF, log scale. 100 mF equals 100,000 µF.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 287", value: 100000, display: "100 mF", highlight: true },
                { label: "Fluke 179", value: 10000, display: "10,000 µF" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Frequency reach matters for switching regulators, many of which run in the hundreds of kilohertz: the 287
          can read them, the 179 runs out at 100 kHz. The 287 also lists duty cycle and pulse width, which help on PWM
          fan and LED lines; our sources don&apos;t list duty cycle for the 179, so treat it as not stated. On
          capacitance, both cover ordinary electrolytics and motor capacitors. The 287&apos;s 100 mF ceiling only pays
          off on supercapacitors and large bulk banks. For smaller parts, see{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            how to test a capacitor with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Logging versus Min/Max-Average</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can watch a signal while you&apos;re away, but they keep different records. The 179&apos;s
          Min/Max-Average holds three numbers: the lowest reading, the highest and the running average. If a 12 V
          supply sagged once overnight, you&apos;d learn how low it went and nothing about when or how often. The
          287 stores up to 10,000 sample intervals with a real-time clock, graphs them on its own screen, and moves
          them to a PC over its infrared link with FlukeView Forms. Fluke rates battery life at 100 hours minimum and
          200 hours in logging mode on six AA cells.
        </p>
        <DataTable
          head={["Bench question", "Fluke 287", "Fluke 179"]}
          rows={[
            ["How low did the rail dip?", "Yes, with time stamp", "Yes (Min)"],
            ["When did it dip, and how often?", "Yes, from the log", "No"],
            ["Did current rise as the board warmed?", "Graph of the run", "Only the average"],
            ["Can I keep the data?", "IR link to a PC", "Write it down"],
            ["Short glitch on a supply", "250 µs peak capture", "Not stated"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Logging changes how you find intermittent faults">
            A fault you can watch, you can fix with any meter. A fault that shows up once every few hours needs a
            record of when it happened, so you can match it to temperature, load or a firmware event. That record is
            the 287&apos;s main advantage over the 179, more than its extra digit.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 179 is the better buy</h2>
        <p className="text-muted leading-7 mb-4">
          The 287 is a bench instrument that weighs 871 g and runs on six AA cells. The 179 is 420 g on a single 9V
          battery and ships with a thermocouple, so it travels better and answers temperature questions without
          extra parts. Its -40 to 400 °C range covers heat sinks, regulators and HVAC air and line temperatures.
          The 287&apos;s meter range is far wider, -200 to 1350 °C excluding the probe, but our sources don&apos;t say
          which probe, if any, comes with it.
        </p>
        <p className="text-muted leading-7">
          If your electronics work is a few repairs a week between industrial or HVAC calls, the 179 covers volts,
          resistance, capacitance and frequency well enough, and its extra resolution would mostly sit unused on
          a 287. How the 179 stacks up for that field work is in{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
            Fluke 117 vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Embedded or IoT battery devices", "Fluke 287", "0.01 µA steps for sleep current"],
            ["Overnight supply or battery drift", "Fluke 287", "10,000 timed intervals, graph on screen"],
            ["Switching regulators and PWM", "Fluke 287", "Frequency to 999.99 kHz, duty cycle"],
            ["Setting references and trimmers", "Fluke 287", "±(0.025% + 2) DC, 0.1 mV steps at 3.3 V"],
            ["Electronics between field calls", "Fluke 179", "420 g, 9V battery, CAT IV 600V"],
            ["Heat sink and component temps", "Fluke 179", "Thermocouple supplied"],
            ["Motor and HVAC capacitors", "Either", "Both well past typical run-capacitor values"],
            ["Mains-side ghost voltage", "Neither", "No LoZ on either meter"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 287 if you mostly work on panels and motors, if you need a meter that rides in a pouch, or if you
          want LoZ (that&apos;s the 289; see{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>
          ). Skip the 179 if microamps or logging are part of your regular work. If you&apos;re weighing the 287
          against an electrician&apos;s meter instead, see{" "}
          <Link href="/multimeters/fluke-287-vs-fluke-117" className={link}>
            Fluke 287 vs Fluke 117
          </Link>
          . Cheaper bench alternatives are in our{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>{" "}
          guide.
        </p>
      </section>

      <Callout title="Buying the 287 on Amazon">
        The 287 we link to is sold by a third-party seller, and its Amazon listing describes the safety rating as
        Category I/II. Fluke rates the 287 CAT III 1000V / CAT IV 600V, and we use Fluke&apos;s figure. Check the
        seller and the model printed on the meter when it arrives. On any mains-connected board, discharge capacitors
        before switching to resistance, capacitance or diode test, and confirm the meter on a known live source before
        trusting a zero reading.
      </Callout>
    </>
  ),
  bottomLine:
    "For electronics work, buy the Fluke 287: 50,000 counts, ±(0.025% + 2) DC accuracy, a 500 µA range at 0.01 µA, frequency to 999.99 kHz and on-meter logging put it in a different class from the 179 at the bench. Buy the Fluke 179 if electronics is a side job to industrial or HVAC work and you want a lighter meter with a thermocouple, the same CAT IV 600V rating and the same lifetime warranty.",
  faqs: [
    {
      question: "Is the Fluke 287 better than the Fluke 179 for electronics?",
      answer:
        "Yes, on every bench spec we have. It shows 50,000 counts against 6,000, has tighter DC accuracy, ±(0.025% + 2) against ±(0.09% + 2), a real microamp range, frequency to 999.99 kHz and logging. The 179 wins on weight, battery format and a thermocouple in the box, which matter more in the field than at a bench.",
    },
    {
      question: "Can the Fluke 179 measure microamps?",
      answer:
        "Not in any useful way. Fluke lists 0.01 mA as its finest current resolution, which is 10 µA, and there is no µA range. A device sleeping at tens of microamps reads as a handful of counts. The Fluke 287's 500 µA range resolves 0.01 µA, a thousand times finer, with a published burden of 102 µV per µA.",
    },
    {
      question: "Does the Fluke 179 have data logging?",
      answer:
        "No. It has Min/Max-Average recording, which keeps the lowest, highest and average readings while it runs, but no time stamps or stored series. The Fluke 287 records up to 10,000 sample intervals with a real-time clock, shows them as a graph on the meter and transfers them to a PC through its infrared link and FlukeView Forms.",
    },
    {
      question: "Do the Fluke 287 and 179 have the same safety rating?",
      answer:
        "Yes. Fluke rates both CAT III 1000V and CAT IV 600V, so either can be used from the service entrance to the bench. Note that the 287's Amazon listing describes it as Category I/II, which conflicts with Fluke's own rating; we go by Fluke. Neither meter has a LoZ input, so neither drains ghost voltage on building wiring.",
    },
    {
      question: "Which is better for measuring temperature, the 287 or 179?",
      answer:
        "The 179 is ready out of the box, since Fluke supplies a thermocouple and it reads -40 to 400 °C. The 287's meter range is much wider, -200 to 1350 °C excluding the probe, but our sources don't confirm a probe in the box. For component and heat-sink temperatures either range is enough; check the probe's own rating before measuring anything hotter.",
    },
    {
      question: "Is the Fluke 287 too heavy for field work?",
      answer:
        "It's a bench-first meter. Fluke lists 871 g and 22.2 × 10.2 × 6.0 cm, powered by six AA cells, against 420 g and a single 9V battery for the 179. It's rated CAT IV 600V, so it can go on site for a logging job, but for all-day pouch carry the 179 is the easier meter to live with.",
    },
  ],
  roundup: { label: "See the best multimeters for electronics repair", href: "/multimeters/best-multimeters-for-electronics-repair" },
  related: [
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
    { label: "Full multimeter roundup", href: "/multimeters/best-multimeters" },
  ],
};

export default function Fluke287VsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
