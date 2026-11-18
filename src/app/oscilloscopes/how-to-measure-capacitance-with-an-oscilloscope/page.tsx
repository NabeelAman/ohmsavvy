import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure capacitance with an oscilloscope: drive a square wave through a known resistor, read the RC time constant at 63.2% and work out C = τ / R.";

export const metadata = buildMetadata({
  title: "How to Measure Capacitance With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-capacitance-with-an-oscilloscope",
});

const s1202 = picks.find((p) => p.name === "Siglent SDS1202X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI 2C53T")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

/** RC test circuit: square wave generator, series resistor, capacitor to ground, scope probe across the capacitor. */
function RcTestCircuit() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="RC test circuit for measuring capacitance with an oscilloscope. A square wave generator on the left feeds a known resistor R in series with the capacitor under test, whose other end goes to ground. Channel 1 of the oscilloscope watches the generator output and channel 2 watches the voltage across the capacitor. The capacitor charges along a curve and reaches 63.2 percent of the step after one time constant, tau equals R times C."
    >
      {/* generator */}
      <circle cx="50" cy="100" r="24" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <path d="M38 106 L38 94 L46 94 L46 106 L54 106 L54 94 L62 94" fill="none" className="stroke-accent" strokeWidth="1.6" />
      <text x="50" y="140" textAnchor="middle" fontSize="9" className="fill-muted">square wave</text>
      {/* top wire */}
      <line x1="50" y1="76" x2="50" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="50" y1="40" x2="120" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      {/* resistor */}
      <path d="M120 40 L128 32 L140 48 L152 32 L164 48 L176 32 L184 40" fill="none" className="stroke-foreground" strokeWidth="1.6" />
      <text x="152" y="24" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">R (known)</text>
      <line x1="184" y1="40" x2="250" y2="40" className="stroke-foreground" strokeWidth="1.6" />
      {/* capacitor */}
      <line x1="250" y1="40" x2="250" y2="88" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="232" y1="88" x2="268" y2="88" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="232" y1="100" x2="268" y2="100" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="250" y1="100" x2="250" y2="160" className="stroke-foreground" strokeWidth="1.6" />
      <text x="276" y="98" fontSize="10" fontWeight="700" className="fill-foreground">C (unknown)</text>
      {/* ground */}
      <line x1="50" y1="124" x2="50" y2="160" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="50" y1="160" x2="250" y2="160" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="140" y1="160" x2="140" y2="170" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="128" y1="170" x2="152" y2="170" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="133" y1="175" x2="147" y2="175" className="stroke-foreground" strokeWidth="1.6" />
      <line x1="138" y1="180" x2="142" y2="180" className="stroke-foreground" strokeWidth="1.6" />
      {/* probes */}
      <circle cx="90" cy="40" r="4" className="fill-accent" />
      <text x="90" y="62" textAnchor="middle" fontSize="9" className="fill-accent">CH1</text>
      <circle cx="250" cy="60" r="4" className="fill-accent" />
      <text x="232" y="64" textAnchor="end" fontSize="9" className="fill-accent">CH2</text>
      <text x="180" y="196" textAnchor="middle" fontSize="9" className="fill-muted">τ = R × C, so C = τ ÷ R</text>
    </svg>
  );
}

export default function HowToMeasureCapacitanceWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Capacitance With an Oscilloscope"
      description={description}
      published="2026-11-18"
      path="/oscilloscopes/how-to-measure-capacitance-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure capacitance with an oscilloscope, put a known resistor in series with the capacitor, drive the
          pair with a square wave and watch the voltage across the capacitor: the time it takes to climb to 63.2% of
          the step is the time constant τ, and the capacitance is C = τ ÷ R. With R = 10 kΩ and a measured τ of 1.0
          ms, the capacitor is 100 nF. This guide shows how to pick the resistor and frequency, set up the cursors,
          use the 10–90% rise time as a cross-check, and avoid the errors that come from the probe and the
          generator.
        </>
      }
      aside={{
        image: fnirsi.image,
        alt: "FNIRSI 2C53T handheld oscilloscope with built-in signal generator",
        caption: (
          <>
            A scope with a built-in generator, such as the FNIRSI 2C53T, can supply the square wave for an RC
            capacitance test. See how it compares in{" "}
            <Link href="/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" className={link}>
              OWON HDS272S vs FNIRSI 2C53T
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How the RC method works" },
        { id: "problems", label: "Problems and fixes" },
        { id: "discharge", label: "1. Discharge and isolate" },
        { id: "choose-r", label: "2. Choose R and frequency" },
        { id: "wire", label: "3. Wire the test circuit" },
        { id: "set-scope", label: "4. Set up the scope" },
        { id: "measure-tau", label: "5. Measure τ with cursors" },
        { id: "calculate", label: "6. Calculate and cross-check" },
        { id: "large-caps", label: "Large electrolytics" },
        { id: "tools", label: "Scopes to use" },
      ]}
      faq={[
        {
          q: "Can an oscilloscope measure capacitance directly?",
          a: "Most oscilloscopes have no capacitance mode, so you measure it indirectly. You charge the capacitor through a known resistor and time the curve, then calculate C = τ / R. Some scopes with built-in multimeters do offer a capacitance range, but that is the meter function, not the scope. The RC method works on any scope with cursors or a rise time measurement.",
        },
        {
          q: "What frequency should I use to measure capacitance?",
          a: "Choose a square wave slow enough that the capacitor fully charges before the next edge. Each half period should be at least five time constants, which means a frequency no higher than about 1 / (10 × R × C). For 10 kΩ and 100 nF that is 100 Hz. If the curve never flattens out at the top, lower the frequency.",
        },
        {
          q: "How do I measure ESR of a capacitor with an oscilloscope?",
          a: "Watch the very start of each edge with a low-value series resistor. An ideal capacitor starts charging from zero, but ESR adds an instant vertical step. Divide that step voltage by the current flowing at that moment, which is the generator step divided by the total series resistance. Small steps of a few millivolts need a fast timebase, short ground lead and careful probing.",
        },
        {
          q: "Why is my capacitance reading too high?",
          a: "The probe and scope input add capacitance in parallel, typically around 10 to 20 pF with a 10x probe, which matters on small parts. A generator with 50 Ω output impedance adds resistance to R. Long leads, a breadboard and a stray hand also add picofarads. Use a larger R, a compensated 10x probe and short wiring, and subtract a no-capacitor baseline.",
        },
        {
          q: "Is the oscilloscope method accurate enough to check a capacitor?",
          a: "It is usually good to a few percent if R is a 1% resistor and the cursors are placed carefully, which is far tighter than the ±10% or ±20% tolerance printed on most capacitors. Its weak spots are very small values under about 100 pF and large electrolytics that need a slow, single-shot capture. A dedicated LCR meter is faster for routine sorting.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors",
          title: "How to Measure Rise Time With Oscilloscope Cursors",
          desc: "Place cursors at 10% and 90% for the cross-check used here.",
        },
        {
          href: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
          title: "How to Test a Capacitor With a Multimeter",
          desc: "The quick meter check before or after a scope measurement.",
        },
      ]}
    >
      <Callout title="Discharge first and keep it off live circuits">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Capacitors can hold a dangerous charge long after power is removed, especially large electrolytics in
            power supplies, microwave ovens, flash units and inverters. Discharge through a suitable resistor and
            confirm near 0 V with a meter before touching the leads.
          </li>
          <li>
            Test the capacitor out of circuit, or at least with the board unpowered. Never run this test on mains
            equipment that is plugged in; a mains-powered scope&apos;s ground clip is tied to earth and can short a
            live circuit.
          </li>
          <li>
            Respect polarity on electrolytic and tantalum capacitors: keep the square wave from 0 V to a positive
            level below the rated voltage. Reverse voltage can make them overheat or vent.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How the RC method works</h2>
        <p className="text-muted leading-7 mb-4">
          A capacitor charging through a resistor follows a fixed curve. After one time constant, τ = R × C, it has
          reached 63.2% of the applied step; after five time constants it is above 99%. The shape is the same for
          every capacitor, only the time scale changes. So if you know R and can measure τ on the scope, you know C.
          The method needs only a square wave source, one resistor and a scope with cursors, which is why it is the
          standard way to measure capacitance with an oscilloscope.
        </p>
        <Figure caption={<>The RC test circuit: CH1 shows the square wave, CH2 shows the charging curve across the capacitor.</>}>
          <RcTestCircuit />
        </Figure>
        <Figure caption={<>Percentage of the final voltage reached after each time constant (standard exponential values, 1 − e<sup>−t/τ</sup>).</>}>
          <BarChart
            items={[
              { label: "1 τ", value: 63.2, display: "63.2%", highlight: true },
              { label: "2 τ", value: 86.5, display: "86.5%" },
              { label: "3 τ", value: 95.0, display: "95.0%" },
              { label: "4 τ", value: 98.2, display: "98.2%" },
              { label: "5 τ", value: 99.3, display: "99.3%" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two other points on the curve are useful. The 50% point arrives at 0.693 τ, and the 10–90% rise time is
          2.2 τ, because ln 9 ≈ 2.197. Most scopes measure rise time automatically, which gives you a second
          estimate of τ without moving a cursor.
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Curve never flattens at the top", "Frequency too high for the RC", "Count divisions per half period", "Lower the frequency to ≤ 1/(10RC)"],
            ["Result too high on small caps", "Probe and wiring capacitance", "Measure with no capacitor fitted", "Bigger R, short leads, subtract baseline"],
            ["Result off by a fixed few %", "Generator output impedance adds to R", "Check generator spec (often 50 Ω)", "Make R far larger than 50 Ω"],
            ["Sharp vertical step at each edge", "Capacitor ESR, or R too small", "Zoom into the edge", "Read ESR from the step, or raise R"],
            ["Curve sags or droops", "Leaky capacitor or scope set to AC coupling", "Switch to DC coupling", "DC coupling; replace a leaky part"],
            ["No curve, only the square wave", "Capacitor open or not connected", "Meter the capacitor", "Re-seat; replace an open part"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="discharge">Discharge the capacitor and isolate it</StepHeading>
        <p className="text-muted leading-7">
          Discharge the capacitor, then remove it or lift one leg. In circuit, other parts in parallel change both
          the resistance and the capacitance the scope sees, and the result is meaningless. Read the marking so you
          know roughly what to expect: 104 on a ceramic means 10 × 10⁴ pF, which is 100 nF. If you only want a quick
          pass/fail first, our guide to{" "}
          <Link href="/multimeters/how-to-check-a-ceramic-capacitor-with-a-multimeter" className={link}>
            checking a ceramic capacitor with a multimeter
          </Link>{" "}
          catches shorted and open parts before you set up the scope.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="choose-r">Choose the resistor and the square wave frequency</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick R so that τ lands in a comfortable range, from tens of microseconds to tens of milliseconds, and so
          that R is far larger than the generator&apos;s output impedance. Use a 1% metal film resistor and measure
          its actual value with a meter, because any error in R goes straight into C. Then set the frequency so each
          half of the square wave lasts at least 5 τ.
        </p>
        <DataTable
          head={["Expected C", "Suggested R", "τ = R × C", "Max square wave frequency"]}
          rows={[
            ["1 nF", "100 kΩ", "100 µs", "About 1 kHz"],
            ["100 nF", "10 kΩ", "1 ms", "About 100 Hz"],
            ["10 µF", "1 kΩ", "10 ms", "About 10 Hz"],
            ["1,000 µF", "100 Ω", "100 ms", "About 1 Hz (or single step)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The frequency column is 1 / (10 τ). Running slower than that is fine; you just see a longer flat top. On a
          1 nF part, a 10x probe adding around 10–15 pF (a typical figure; check your probe) shifts the result by
          about 1–1.5%. On a 100 pF part the same probe adds 10–15%, which is why the method struggles below about
          100 pF.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="wire">Wire the test circuit</StepHeading>
        <p className="text-muted leading-7">
          Connect the generator output to one end of R, the other end of R to the capacitor, and the capacitor&apos;s
          other leg (the negative leg on a polarized part) to the generator ground. Put CH1 on the generator output
          and CH2 across the capacitor, with both ground clips on the common ground. Keep wires short and away from
          your hands. Set the square wave to swing from 0 V to a positive level such as 5 V, using a DC offset if
          your generator centers the wave on zero. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            connecting an oscilloscope probe correctly
          </Link>{" "}
          covers ground clips and probe compensation.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="set-scope">Set up the scope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use DC coupling on both channels. Trigger on the rising edge of CH1. Set the timebase so one rising edge and
          its full charging curve fill most of the screen, about 1 τ per division is a good start. Set CH2&apos;s
          V/div so the step fills six to eight divisions vertically; the bigger the trace, the more precisely you can
          place a cursor at 63.2%. Turn on averaging if the trace is noisy.
        </p>
        <Figure caption={<>Illustrative CH2 trace: the capacitor charges along an exponential curve on each rising edge and discharges on each falling edge.</>}>
          <ScopeScreen
            wave="square-under"
            cycles={2}
            amplitude={3}
            labels={{ left: "CH2 1 V/div  DC", right: "1 ms/div" }}
            marks={[{ x1: 0.3, y1: 7, x2: 0.3, y2: 2.2, text: "63.2% at 1 τ" }]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="measure-tau">Measure τ with the cursors</StepHeading>
        <p className="text-muted leading-7">
          Measure the full step height on CH2, from the flat bottom to the flat top, and multiply by 0.632. For a 5.00
          V step that is 3.16 V. Place a horizontal cursor at the bottom and another 3.16 V above it. Then put one
          vertical time cursor on the moment CH2 starts to rise, and the second where the curve crosses the 63.2%
          line. The time between them is τ. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-cursors-to-measure-voltage-difference" className={link}>
            using oscilloscope cursors
          </Link>{" "}
          shows the cursor controls step by step.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="calculate">Calculate C and cross-check it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Divide τ by R. Worked example: the measured R is 9.97 kΩ and the cursors read τ = 0.98 ms. C = 0.98 ms ÷
          9.97 kΩ = 98.3 nF, which is within the ±10% of a 100 nF part. Cross-check with the scope&apos;s automatic
          rise time on CH2: divide it by 2.2 for a second estimate of τ. If the two disagree by more than a few
          percent, the curve is probably not reaching its flat top, or noise is moving the 10% and 90% points.
        </p>
        <DataTable
          head={["Reading", "Value (illustrative)", "Arithmetic"]}
          rows={[
            ["Measured R", "9.97 kΩ", "Meter reading of a 10 kΩ 1% resistor"],
            ["τ from cursors", "0.98 ms", "Time to 63.2% of the step"],
            ["C from τ", "98.3 nF", "0.98 ms ÷ 9.97 kΩ"],
            ["10–90% rise time", "2.16 ms", "Automatic measurement"],
            ["C from rise time", "98.5 nF", "(2.16 ms ÷ 2.2) ÷ 9.97 kΩ"],
          ]}
        />
        <Figure caption={<>The RC capacitance measurement from start to finish.</>}>
          <FlowDiagram
            steps={[
              { label: "Discharge", sub: "And isolate the part" },
              { label: "Choose R", sub: "And f ≤ 1/(10RC)" },
              { label: "Capture", sub: "DC coupled, 1 τ/div" },
              { label: "Measure τ", sub: "Cursor at 63.2%" },
              { label: "C = τ ÷ R", sub: "Cross-check with 2.2 τ" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="large-caps" className="text-xl font-semibold mb-3">Large electrolytics: use a single step</h2>
        <p className="text-muted leading-7 mb-4">
          A 1,000 µF capacitor with a 100 Ω resistor needs 50 mA at the start of a 5 V step, more than many function
          generators can supply. For large parts, use a bench power supply, a series resistor rated for the power,
          and a push button or switch. Set the scope to single-shot capture with a rising-edge trigger on the
          capacitor channel, press the button once, and measure τ on the frozen trace. Discharge the capacitor
          through a resistor between attempts. Expect a big electrolytic to read well away from its nominal value;
          ±20% is a common tolerance for aluminum electrolytics.
        </p>
        <p className="text-muted leading-7">
          The sharp step at the start of each edge is the ESR. A healthy low-ESR capacitor shows a step of a few
          millivolts; an aging electrolytic shows a much bigger one, a useful sign in power supply repairs. For
          ripple caused by tired capacitors, see{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>
          .
        </p>
        <KeyIdea title="Time the curve, then divide">
          A scope doesn&apos;t measure capacitance, it measures time. Put the unknown capacitor behind a known
          resistor, time how long it takes to reach 63.2%, and C = τ ÷ R does the rest.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Scopes to use for RC measurements</h2>
        <p className="text-muted leading-7 mb-6">
          Any scope with cursors and a rise time measurement can do this. A built-in generator saves wiring a separate
          source, and a larger screen makes cursor placement more precise. For more choices, see our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>
          .
        </p>
        <ProductStrip
          title="Oscilloscopes for capacitance tests"
          items={[
            {
              name: "Siglent SDS1202X-E",
              image: s1202.image,
              alt: "Siglent SDS1202X-E two-channel 200MHz benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e",
              note: "200MHz on two channels, 1 GSa/s on one channel and 100,000 waveforms per second (Siglent spec).",
            },
            {
              name: "FNIRSI 2C53T",
              image: fnirsi.image,
              alt: "FNIRSI 2C53T handheld oscilloscope, multimeter and signal generator",
              href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t",
              note: "50MHz, two channels, a 19,999-count True RMS meter and a basic generator to 50 kHz in one handheld.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s: more bandwidth headroom than entry-level scopes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
