import Link from "next/link";
import {
  Callout,
  CircuitDiagram,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
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
          Unlike resistance, voltage doesn&apos;t care whether a resistor sits in parallel with other
          components — a multimeter&apos;s voltage mode simply reads the difference in potential between
          the two points you touch, without needing to isolate anything first. That makes it one of the
          most useful in-circuit, powered-on measurements you can take.
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
        { id: "common-mistakes", label: "Common mistakes" },
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
          doesn&apos;t meaningfully change the circuit&apos;s behaviour. This is the opposite situation
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
        <StepHeading n={1} id="step-by-step">Measuring voltage across a resistor</StepHeading>
        <p className="text-muted leading-7">
          Set the dial to DC voltage (or AC voltage for an AC circuit) on a range comfortably above
          what you expect to read, or use auto-ranging if available. With the circuit powered, touch
          one probe to each lead of the resistor directly — not to other points further along the
          circuit — and read the display.
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
        its internal fuse.
      </Callout>
    </HowToShell>
  );
}
