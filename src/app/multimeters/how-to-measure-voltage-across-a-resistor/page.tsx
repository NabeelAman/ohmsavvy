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
