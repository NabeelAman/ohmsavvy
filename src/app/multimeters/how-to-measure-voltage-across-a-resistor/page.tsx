import Link from "next/link";
import {
  Callout,
  BarChart,
  CircuitDiagram,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to measure voltage across a resistor with a multimeter, in-circuit — and how that voltage drop lets you calculate current using Ohm's law.";

export const metadata = buildMetadata({
  title: "How to Measure Voltage Across a Resistor",
  description,
  path: "/multimeters/how-to-measure-voltage-across-a-resistor",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToMeasureVoltageAcrossAResistorPage() {
  return (
    <HowToShell
      title="How to Measure Voltage Across a Resistor"
      description={description}
      path="/multimeters/how-to-measure-voltage-across-a-resistor"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          To measure voltage across a resistor, set the multimeter to DC volts, power the circuit, and touch
          the red probe to the resistor&apos;s more positive lead and the black probe to the other lead:
          the display shows the voltage dropped across it. Nothing has to be desoldered, because voltage
          is read between two points and the meter barely loads the circuit. Divide that reading by the
          resistance and you also have the current through the resistor, without breaking the circuit.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            Any multimeter&apos;s DC voltage mode works for this. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-voltage-is-different", label: "Why voltage measurement doesn't need isolation" },
        { id: "step-by-step", label: "Measuring voltage across a resistor" },
        { id: "polarity", label: "Probe polarity and what a negative reading means" },
        { id: "using-ohms-law", label: "Using the reading to calculate current" },
        { id: "series-example", label: "Worked example: three resistors in series" },
        { id: "meter-loading", label: "When the meter itself changes the reading" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Do I need to disconnect anything to measure voltage across a resistor?",
          a: "No — this is the key difference from resistance measurement. A multimeter's voltage input has very high impedance, so touching the probes across a component while the circuit is powered doesn't meaningfully disturb the circuit or require isolating the resistor from anything in parallel with it.",
        },
        {
          q: "What does it mean if I read 0V across a resistor that should have current flowing through it?",
          a: "By Ohm's law (V = I × R), zero voltage across a resistor with a non-zero resistance means essentially zero current is flowing through it — which usually points to an open circuit somewhere else in that path, not a problem with the resistor itself.",
        },
        {
          q: "Can I use this method on an AC circuit too?",
          a: "Yes, as long as you switch the multimeter to AC voltage mode rather than DC. The same principle (Ohm's law relating voltage, current, and resistance) applies, though AC circuits with reactive components (capacitors, inductors) need additional care since voltage and current aren't always simply in phase.",
        },
        {
          q: "Why does my reading fluctuate instead of settling on one number?",
          a: "This usually reflects something genuinely changing in the circuit, such as a varying load, a PWM-controlled signal, or a loose connection at the resistor's leads — not an inaccurate meter. If the fluctuation is rapid and regular, it may actually be a signal you'd be better off viewing on an oscilloscope rather than reading as a single multimeter value.",
        },
        {
          q: "Do the voltages across several resistors in series add up to anything useful?",
          a: "Yes — in a series chain, the individual voltage drops across each resistor always add up to the total supply voltage across the whole chain. Measuring each drop and checking that they sum correctly is a quick way to confirm you haven't missed a component or misread one of the values.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "Why resistance measurement, unlike voltage, needs the component isolated first.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every multimeter mode, from the beginning.",
        },
      ]}
    >
      <section>
        <h2 id="why-voltage-is-different" className="text-xl font-semibold mb-3">Why voltage measurement doesn&apos;t need isolation</h2>
        <p className="text-muted leading-7">
          Voltage is inherently a measurement between two points, not a property of one isolated
          component — and a multimeter&apos;s voltage input is built with very high internal resistance,
          so almost no current flows through the meter itself during the measurement. That means
          connecting the probes across a resistor, even one sitting among other parallel components,
          doesn&apos;t meaningfully change the circuit&apos;s behavior. This is the opposite situation
          from{" "}
          <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
            resistance measurement in a parallel circuit
          </Link>
          , where the meter&apos;s own test current does flow through every available path.
        </p>
        <Figure
          caption={
            <>
              Connected in parallel across the resistor, the meter reads the voltage dropped across
              it directly, with the circuit powered and unmodified — no isolation needed, unlike a
              resistance measurement.
            </>
          }
        >
          <CircuitDiagram mode="parallel" meter="V" source="circuit" load="R" />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Set the meter to volts</StepHeading>
        <p className="text-muted leading-7">
          Set the dial to DC voltage (or AC voltage for an AC circuit) on a range comfortably above
          what you expect to read, or use auto-ranging if available. Confirm the red lead is in the V
          jack, not an amps jack; that one check prevents the most expensive mistake on this page.
        </p>
      </section>

      <section>
        <StepHeading n={2}>Note the resistor&apos;s value before you power up</StepHeading>
        <p className="text-muted leading-7">
          Read the color bands or the printed code, or take it from the schematic. You&apos;ll need the
          resistance later to turn the voltage into a current, and knowing whether it&apos;s 47Ω or 4.7MΩ
          also tells you whether the meter&apos;s own loading will matter (see below).
        </p>
      </section>

      <section>
        <StepHeading n={3}>Probe both leads with the circuit powered</StepHeading>
        <p className="text-muted leading-7">
          With the circuit powered, touch one probe to each lead of the resistor directly, not to other
          points further along the circuit, and read the display. On a crowded board, touch the
          resistor&apos;s solder pads rather than the traces leading away from them, so you know exactly
          which component you&apos;re reading across.
        </p>
      </section>

      <section>
        <StepHeading n={4}>Sanity-check the number</StepHeading>
        <p className="text-muted leading-7">
          Compare it with what the circuit should do. A drop larger than the supply is impossible and means
          you&apos;re probing the wrong points; exactly 0V with power present means no current is flowing
          through that path; and a value that drifts may be a changing signal rather than a fault.
        </p>
      </section>

      <section>
        <h2 id="polarity" className="text-xl font-semibold mb-3">Probe polarity and what a negative reading means</h2>
        <p className="text-muted leading-7">
          On DC voltage, a negative reading simply means the probes are reversed relative to actual
          current flow direction — the red probe is on the less positive side. This doesn&apos;t damage
          the meter; it just means swapping the probes gives the same magnitude with a positive sign.
          Note which lead is more positive when it matters for your diagnosis.
        </p>
      </section>

      <section>
        <h2 id="using-ohms-law" className="text-xl font-semibold mb-3">Using the reading to calculate current</h2>
        <p className="text-muted leading-7 mb-4">
          This measurement is genuinely useful beyond just confirming a voltage: once you know the
          voltage dropped across a resistor of known value, Ohm&apos;s law gives you the current flowing
          through it — without ever breaking the circuit open the way a direct in-series current
          measurement requires.
        </p>
        <KeyIdea title="I = V / R">
          Example: 2.5V measured across a 100Ω resistor means 2.5 / 100 = 0.025A (25mA) is flowing
          through that resistor — and since it&apos;s a single series path, that&apos;s the current
          flowing through everything else in series with it too.
        </KeyIdea>
      </section>

      <section id="series-example">
        <h2 className="text-xl font-semibold mb-3">Worked example: three resistors in series</h2>
        <p className="text-muted leading-7 mb-4">
          The same technique extends naturally to a chain of several resistors in series: measure
          across each one individually, and the drops should add up to the supply voltage across the
          whole chain.
        </p>
        <Figure
          caption={
            <>
              A 12V supply across three series resistors (100Ω, 220Ω, 330Ω). Each resistor drops a
              share of the 12V proportional to its own resistance, and the three drops sum to the full
              12V.
            </>
          }
        >
          <svg viewBox="0 0 320 110" className="w-full h-auto" role="img" aria-label="Diagram of three resistors in series with a 12V supply, showing individual voltage drops">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="55" x2="60" y2="55" />
              <rect x="60" y="47" width="50" height="16" />
              <line x1="110" y1="55" x2="140" y2="55" />
              <rect x="140" y="47" width="50" height="16" />
              <line x1="190" y1="55" x2="220" y2="55" />
              <rect x="220" y="47" width="50" height="16" />
              <line x1="270" y1="55" x2="300" y2="55" />
            </g>
            <text x="85" y="40" fontSize="10" textAnchor="middle" className="fill-foreground">100Ω</text>
            <text x="165" y="40" fontSize="10" textAnchor="middle" className="fill-foreground">220Ω</text>
            <text x="245" y="40" fontSize="10" textAnchor="middle" className="fill-foreground">330Ω</text>
            <text x="85" y="85" fontSize="10" textAnchor="middle" className="fill-accent">1.85V</text>
            <text x="165" y="85" fontSize="10" textAnchor="middle" className="fill-accent">4.06V</text>
            <text x="245" y="85" fontSize="10" textAnchor="middle" className="fill-accent">6.09V</text>
            <text x="160" y="100" fontSize="9" textAnchor="middle" className="fill-muted">drops sum to 12V across the full chain</text>
          </svg>
        </Figure>
        <DataTable
          head={["Resistor", "Voltage drop", "Share of total"]}
          rows={[
            ["100Ω", "1.85V", "15%"],
            ["220Ω", "4.06V", "34%"],
            ["330Ω", "6.09V", "51%"],
            ["Total (650Ω, 12V supply)", "1.85 + 4.06 + 6.09 = 12.00V", "100%"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Each resistor&apos;s share of the total voltage is proportional to its own resistance relative
          to the chain&apos;s combined resistance (650Ω here) — this is the voltage-divider relationship
          that series resistor chains follow, and it&apos;s the same current (12V ÷ 650Ω ≈ 18.5mA) flowing
          through all three, since they share one series path.
        </p>
      </section>

      <section>
        <h2 id="meter-loading" className="text-xl font-semibold mb-3">When the meter itself changes the reading</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Very high impedance&quot; isn&apos;t infinite. Most digital multimeters present roughly 10MΩ
          on their DC volts range (check your meter&apos;s manual for its exact figure). When you probe
          across a resistor, that 10MΩ sits in parallel with it. Against a 1kΩ resistor the effect is far
          too small to see, but against resistors in the megohm range the meter steals a noticeable share
          of the current and the reading drops.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: two equal resistors divide 10V, so each should show 5V. With 1MΩ resistors,
          the meter&apos;s 10MΩ in parallel with the lower one makes about 0.909MΩ, and the reading
          becomes 10 × 0.909 / (1 + 0.909) ≈ 4.76V, almost 5% low. The chart repeats that arithmetic
          for other resistor values, assuming a 10MΩ meter.
        </p>
        <BarChart
          items={[
            { label: "10kΩ + 10kΩ divider", value: 0.05, display: "4.998V (−0.05%)" },
            { label: "100kΩ + 100kΩ divider", value: 0.5, display: "4.975V (−0.5%)" },
            { label: "1MΩ + 1MΩ divider", value: 4.8, display: "4.762V (−4.8%)", highlight: true },
            { label: "10MΩ + 10MΩ divider", value: 33.3, display: "3.333V (−33%)" },
          ]}
          log
        />
        <p className="text-muted leading-7 mt-4">
          Bar length shows the reading error. If you&apos;re working on high-value parts such as sensor
          bias networks or a CMOS input&apos;s pull-up, expect the meter to read low and treat the number
          as a lower bound. Our{" "}
          <Link href="/multimeters/how-to-check-a-voltage-divider-circuit-with-a-multimeter" className={link}>
            voltage divider guide
          </Link>{" "}
          covers how to correct for it.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common mistakes</h2>
        <DataTable
          head={["Mistake", "Result"]}
          rows={[
            ["Measuring across the wrong two points", "Reading reflects a different part of the circuit than intended"],
            ["Using current mode instead of voltage mode", "Risk of a short circuit through the meter and a blown fuse"],
            ["Ignoring a 0V reading where current was expected", "Missing an open circuit elsewhere in that current path"],
            ["Reading a rapidly fluctuating signal as one static value", "A changing or PWM signal is better suited to an oscilloscope"],
          ]}
        />
      </section>

      <Callout title="Never use current mode across a component like this">
        Current mode on a multimeter behaves like a near-zero-resistance connection (a shunt), meant to
        be placed in series within the circuit path. Connecting it in parallel across a resistor, the
        way you connect for voltage, creates a short circuit through the meter and will typically blow
        its internal fuse. If the resistor sits in a mains-powered circuit, the same mistake can cause an
        arc flash, so on anything above about 50V use a CAT-rated meter, keep one hand away from the
        board, and leave unfamiliar mains equipment to a qualified technician.
      </Callout>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Every multimeter can read voltage across a resistor. Extra display counts help when you&apos;re
          comparing small drops, such as the millivolts across a current-sense resistor; see{" "}
          <Link href="/multimeters/how-to-test-a-shunt-resistor-with-a-multimeter" className={link}>
            how to test a shunt resistor
          </Link>{" "}
          for that case.
        </p>
        <ProductStrip
          title="Meters from our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, auto-ranging, CAT III 600V.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on tested. 19,999-count high-resolution mode for small voltage drops.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR 6,000-count digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget 6,000-count True RMS for low-voltage electronics; no CAT rating stated.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
