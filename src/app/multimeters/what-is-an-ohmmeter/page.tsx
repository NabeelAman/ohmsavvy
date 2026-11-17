import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "An ohmmeter measures resistance in ohms by passing a small current and reading the voltage. How it works, the types, and how to use one safely.";

export const metadata = buildMetadata({
  title: "What Is an Ohmmeter? How It Measures Resistance",
  description,
  path: "/multimeters/what-is-an-ohmmeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

/** How a digital ohmmeter works: an internal current source drives the part, a voltmeter reads the drop. */
function OhmmeterPrincipleDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="How a digital ohmmeter works: inside the meter a constant current source drives a small known current out of the red probe, through the unknown resistor and back into the black probe, while the meter's voltmeter reads the voltage across the probes and calculates resistance as voltage divided by current."
    >
      <rect x="20" y="30" width="170" height="140" rx="10" className="fill-surface stroke-foreground" strokeWidth="2" strokeDasharray="6 4" />
      <text x="105" y="22" fontSize="10" textAnchor="middle" className="fill-muted">inside the meter</text>
      {/* current source */}
      <circle cx="70" cy="100" r="22" className="fill-surface stroke-accent" strokeWidth="2" />
      <path d="M70 112 V88 M64 94 L70 88 L76 94" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="70" y="140" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">known I</text>
      {/* voltmeter */}
      <circle cx="140" cy="100" r="20" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="140" y="104" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">V</text>
      <text x="140" y="140" fontSize="9" textAnchor="middle" className="fill-muted">measures drop</text>
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M70 78 V50 H230" />
        <path d="M70 122 V155 H230" />
        <path d="M140 80 V50" />
        <path d="M140 120 V155" />
      </g>
      {/* probes */}
      <circle cx="230" cy="50" r="5" className="fill-accent" />
      <circle cx="230" cy="155" r="5" className="fill-foreground" />
      <path d="M235 50 H300 V80" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <path d="M235 155 H300 V125" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      {/* resistor */}
      <rect x="290" y="80" width="20" height="45" rx="3" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="320" y="106" fontSize="11" fontWeight="700" className="fill-foreground">R?</text>
      <text x="230" y="185" fontSize="10" textAnchor="middle" className="fill-accent" fontWeight="700">R = V ÷ I</text>
    </svg>
  );
}

export default function WhatIsAnOhmmeterPage() {
  return (
    <HowToShell
      title="What Is an Ohmmeter?"
      description={description}
      published="2026-11-18"
      path="/multimeters/what-is-an-ohmmeter"
      category="multimeters"
      intro={
        <>
          An ohmmeter is an instrument that measures electrical resistance in ohms (Ω). It works by pushing a small,
          known current from its own battery through the part and measuring the voltage that develops, then
          calculating resistance with Ohm&apos;s law, R = V ÷ I. Today most people use the ohms (Ω) function of a
          digital multimeter rather than a standalone ohmmeter, but the principle, the limits and the safety rule
          (never on a live circuit) are the same. This page explains how ohmmeters work, the four main types from
          analog to megohmmeter, and what the readings mean.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter, whose ohms function is a digital ohmmeter",
        caption: (
          <>
            The Ω position on a meter like the Fluke 115 is a digital ohmmeter, reading from a 600.0 Ω range to
            40.00 MΩ. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How an ohmmeter works" },
        { id: "types", label: "Types of ohmmeter" },
        { id: "vs-multimeter", label: "Ohmmeter vs multimeter" },
        { id: "problems", label: "Reading problems and fixes" },
        { id: "power-off", label: "1. Power off and isolate" },
        { id: "select-ohms", label: "2. Select ohms" },
        { id: "zero", label: "3. Zero the leads" },
        { id: "measure", label: "4. Measure and read" },
        { id: "lead-resistance", label: "Why low ohms is hard" },
        { id: "which-meter", label: "Which ohmmeter to use" },
      ]}
      faq={[
        {
          q: "What is an ohmmeter used for?",
          a: "An ohmmeter measures resistance, so it is used to check resistors against their value, test fuses, wires and switches for continuity, measure heating elements, motor windings and sensors such as thermistors, and find shorts. A megohmmeter, a high-voltage type, checks the insulation on motors and cables. All of them are used with the circuit unpowered.",
        },
        {
          q: "What is the difference between an ohmmeter and a multimeter?",
          a: "An ohmmeter only measures resistance. A multimeter combines a voltmeter, an ammeter and an ohmmeter, plus extras like continuity, diode test and capacitance, behind one dial. When you turn a multimeter to Ω, it works as an ohmmeter. Standalone ohmmeters survive mainly as specialist tools: milliohm meters and insulation testers.",
        },
        {
          q: "Can you use an ohmmeter on a live circuit?",
          a: "No. The ohmmeter supplies its own small test current and assumes nothing else is driving the circuit. External voltage makes the reading meaningless and can damage the meter, although good meters have overload protection on the ohms input. Switch off, unplug, and discharge capacitors before measuring resistance.",
        },
        {
          q: "What does OL mean on an ohmmeter?",
          a: "OL means overload: the resistance is higher than the selected range can display. With the probes apart, OL is the normal reading for an open circuit. Across a part, it means the part is open, like a blown fuse or broken wire, or its resistance is above the meter's top range, which is 40 to 50 MΩ on typical handheld meters.",
        },
        {
          q: "Can you test a diode with an ohmmeter?",
          a: "Partly. A good diode reads a lower resistance one way and OL the other way, and a shorted diode reads near 0 Ω both ways. But many digital meters use too little test voltage on the ohms range to turn a silicon diode fully on, so the forward reading can look like OL too. Use the meter's diode-test mode, which reads the forward voltage drop instead.",
        },
        {
          q: "Why does an analog ohmmeter scale read backwards?",
          a: "An analog series ohmmeter drives current from its battery through the needle movement and the resistor. Zero ohms lets the most current flow, so the needle swings fully right, and infinite resistance lets none flow, leaving it at the left. The scale is also non-linear, crowded toward the high-resistance end, so you choose a range multiplier that puts the needle near the middle.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-with-a-multimeter",
          title: "How to Measure Resistance With a Multimeter",
          desc: "Step-by-step resistance checks on parts and circuits with a digital meter.",
        },
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "Diode mode, forward and reverse readings, and what a shorted or open diode shows.",
        },
        {
          href: "/multimeters/how-to-test-continuity-with-a-multimeter",
          title: "How to Test Continuity With a Multimeter",
          desc: "The beeper version of an ohmmeter for wires, fuses and switches.",
        },
      ]}
    >
      <Callout title="Ohmmeters are for dead circuits only">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch off and unplug the circuit, and confirm it is dead with the meter on volts before switching to Ω.
            Discharge large capacitors in power supplies and motor drives before measuring.
          </li>
          <li>
            A megohmmeter (insulation tester) applies up to 1000 V or more. Only use one on de-energized equipment,
            keep hands off the conductors during the test, and let it discharge the circuit afterward.
          </li>
          <li>
            For building wiring or service equipment insulation tests, use a qualified electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How an ohmmeter works</h2>
        <p className="text-muted leading-7 mb-4">
          Resistance can&apos;t be sensed passively; you have to push current through something to see how hard it
          resists. A digital ohmmeter does that with an internal constant-current source. It drives a known current
          out of the red probe, through the part, and back into the black probe, and its voltmeter measures the
          voltage across the probes. If the meter pushes 1 mA and reads 0.470 V, the part is 0.470 ÷ 0.001 = 470 Ω.
          Each resistance range uses a different test current, smaller for higher ranges, so the voltage stays within
          what the meter can read.
        </p>
        <Figure caption={<>A digital ohmmeter: a constant-current source and a voltmeter, with Ohm&apos;s law doing the rest.</>}>
          <OhmmeterPrincipleDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That is also why polarity matters on some parts. The red probe is positive on the Ω range, so a diode or a
          transistor junction reads differently one way round from the other, which the{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            diode testing guide
          </Link>{" "}
          makes use of. An analog ohmmeter works more simply: its battery, an adjustable resistor and the needle
          movement are in series with the part, so the current, and the needle, falls as resistance rises.
        </p>
      </section>

      <section>
        <h2 id="types" className="text-xl font-semibold mb-3">Types of ohmmeter</h2>
        <DataTable
          head={["Type", "How it measures", "Typical range", "Used for"]}
          rows={[
            ["Analog (series) ohmmeter", "Battery current through needle and part", "Ohms to megohms, reversed non-linear scale", "Older meters, quick checks"],
            ["Digital multimeter Ω", "Constant current, measure voltage", "0.1 Ω resolution to about 40–50 MΩ", "Everyday resistance and continuity"],
            ["Milliohm / micro-ohmmeter", "Four-wire Kelvin: separate current and sense leads", "Micro-ohms to ohms", "Busbars, joints, motor windings, shunts"],
            ["Megohmmeter (insulation tester)", "High DC test voltage, measure leakage current", "Megohms to gigohms", "Motor, cable and transformer insulation"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The megohmmeter sits at the far end. The Fluke 1587 FC, for example, tests insulation at 50, 100, 250, 500
          and 1000 V and reads from 0.01 MΩ to 2 GΩ, per Fluke&apos;s specifications. It needs high voltage because
          insulation resistance is so high that a small battery voltage would push too little current to measure, and
          because insulation has to be proven at a stress close to its working voltage.
        </p>
      </section>

      <section>
        <h2 id="vs-multimeter" className="text-xl font-semibold mb-3">Ohmmeter vs multimeter vs voltmeter</h2>
        <p className="text-muted leading-7">
          A voltmeter measures the voltage a circuit already has and connects across it with the power on. An ammeter
          measures current and goes in series. An ohmmeter measures resistance, supplies its own current and needs the
          power off. A multimeter is all three in one case, switched by the dial, which is why standalone ohmmeters
          are now rare outside specialist low-resistance and insulation testing. The biggest practical difference is
          the power rule: volts are measured live, ohms dead. Mixing them up, for example leaving the dial on Ω and
          probing an outlet, is one of the commonest ways to damage a meter. For more on the dial symbols, see{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols explained
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Ohmmeter reading problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["OL across a part", "Open part, or above the top range", "Short the probes: should read near 0", "Part is open, or use a higher range"],
            ["Reading lower than the part's value", "Parallel path through the circuit", "Lift one leg and retest", "Measure the part out of circuit"],
            ["Reading keeps climbing", "Capacitor charging from the test current", "Wait; it rises toward OL", "Normal for capacitors; discharge first"],
            ["0.2–0.5 Ω on a dead short", "Test lead and contact resistance", "Short the probes", "Subtract it or use REL"],
            ["Reading jumps or is wildly off", "Circuit still powered", "Measure volts first", "Switch off and discharge"],
            ["High value drifts with your fingers", "Your body resistance in parallel", "Hold only the probe handles", "Don't touch both tips"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-off">Power off and isolate the part</StepHeading>
        <p className="text-muted leading-7">
          Turn the circuit off, unplug it or open the breaker, and confirm zero volts with the meter on the volts
          range. Discharge capacitors in power supplies. For an accurate reading of one part, lift at least one of its
          leads from the circuit, because other parts in parallel give the current another path and the meter reads
          the combination, always lower than the part alone. Two 1 kΩ resistors in parallel read 500 Ω, for example.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="select-ohms">Select ohms and a range</StepHeading>
        <p className="text-muted leading-7">
          Turn the dial to Ω with the red lead in the V/Ω jack and the black in COM. On an autoranging meter that is
          all you need. On a manual meter, start on a range above the expected value: for a 4.7 kΩ resistor, the 20k
          position. On an analog meter, choose the multiplier (×1, ×10, ×1k) that puts the needle near mid-scale,
          where its non-linear scale is easiest to read.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="zero">Zero the leads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Touch the probe tips together. A digital meter typically shows a few tenths of an ohm, the resistance of the
          leads and contacts. Note it and subtract it from small readings, or press REL if the meter has it. An analog
          ohmmeter has a zero-adjust knob: short the probes and turn it until the needle sits exactly on 0 Ω, and
          repeat each time you change range. If it won&apos;t reach zero, its battery is low.
        </p>
        <Figure caption={<>Illustrative readings: 0.3 Ω with the probes shorted, then 4.703 kΩ across a 4.7 kΩ resistor.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="Ω  probes shorted" />
            <MeterReadout value="4.703" unit="kΩ" mode="Ω  resistor" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="measure">Measure and read the value</StepHeading>
        <p className="text-muted leading-7">
          Hold the probes on the part&apos;s leads without touching both tips with your fingers; at hundreds of
          kilohms, your body in parallel lowers the reading. Read the number with its prefix: 4.703 kΩ is 4,703 Ω.
          Compare with the expected value and its tolerance: a 4.7 kΩ ±5% resistor is good anywhere from 4,465 to
          4,935 Ω. A reading of OL means open, near 0 Ω on something that should have resistance means shorted. Our{" "}
          <Link href="/multimeters/how-to-measure-resistance-with-a-multimeter" className={link}>
            resistance measuring guide
          </Link>{" "}
          has more worked examples.
        </p>
        <Figure caption={<>Using an ohmmeter, start to finish.</>}>
          <FlowDiagram
            steps={[
              { label: "Power off", sub: "Prove 0 V, discharge" },
              { label: "Isolate", sub: "Lift one lead" },
              { label: "Ω range", sub: "Auto or above value" },
              { label: "Zero", sub: "Short probes, REL" },
              { label: "Read", sub: "Value × prefix" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="lead-resistance" className="text-xl font-semibold mb-3">Why low resistance is hard for an ohmmeter</h2>
        <p className="text-muted leading-7 mb-4">
          An ordinary two-wire ohmmeter measures the leads along with the part. Assume 0.2 Ω of lead and contact
          resistance, which is typical. On a 100 Ω part that adds 0.2%, which nobody notices. On a 1 Ω part it adds
          20%, and on a 0.1 Ω motor winding or shunt it triples the reading. Subtracting the shorted-probe value helps,
          but contact resistance changes every time you reposition the probes.
        </p>
        <Figure caption={<>Error from 0.2 Ω of lead and contact resistance on a two-wire ohmmeter, as a share of the true value.</>}>
          <BarChart
            items={[
              { label: "100 Ω part", value: 0.2, display: "+0.2%" },
              { label: "10 Ω part", value: 2, display: "+2%" },
              { label: "1 Ω part", value: 20, display: "+20%", highlight: true },
              { label: "0.5 Ω part", value: 40, display: "+40%" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A milliohm meter solves this with four-wire Kelvin connections: one pair of leads carries the test current,
          a separate pair measures the voltage right at the part, and almost no current flows in the sense leads, so
          their resistance drops out. If you need to measure below about 1 Ω regularly, see our{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-low-resistance" className={link}>
            meters for measuring low resistance
          </Link>
          .
        </p>
        <KeyIdea title="An ohmmeter brings its own current">
          Everything about using an ohmmeter follows from that one fact: the circuit must be dead, parallel paths
          change the answer, the leads are part of the measurement, and insulation needs a much higher test voltage.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which ohmmeter to use</h2>
        <p className="text-muted leading-7 mb-6">
          For resistors, fuses, wires, elements and sensors, the ohms range of a good digital multimeter is the right
          ohmmeter. For motor and cable insulation you need a dedicated megohmmeter instead. These three meters
          cover everyday resistance work, from hobby electronics to industrial maintenance.
        </p>
        <ProductStrip
          title="Meters with a capable ohms function"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Resistance from a 600.0 Ω range at 0.1 Ω resolution up to 40.00 MΩ, with a fast continuity beeper.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget 6,000-count meter with resistance, continuity and diode test, fine for electronics and hobby work.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "6,000-count display with manual range override, so a resistance reading can be held on one range, plus CAT IV 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
