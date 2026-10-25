import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test a crankshaft position sensor with a multimeter: resistance and AC output for 2-wire inductive types, reference, ground and signal for Hall types.";

export const metadata = buildMetadata({
  title: "Test a Crankshaft Position Sensor",
  description,
  path: "/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter",
});

const all = getAllPicks("multimeters");
const craftsman = all.find((p) => p.name === "Craftsman CMMT14171")!;
const fluke88v = all.find((p) => p.name === "Fluke 88V")!;
const innova3340 = all.find((p) => p.name === "Innova 3340")!;

const link = "text-accent hover:underline";

/** Back-probing a 3-wire Hall crank sensor: reference, signal and ground to the ECU. */
function HallWiringDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring diagram of a three-wire Hall-effect crankshaft sensor connected to the engine computer by reference, signal and ground wires, with the meter's black lead on battery negative and the red lead back-probing each wire in turn"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="14" y="40" width="70" height="80" rx="4" />
        <rect x="236" y="40" width="70" height="80" rx="4" />
        <line x1="84" y1="58" x2="236" y2="58" />
        <line x1="84" y1="80" x2="236" y2="80" />
        <line x1="84" y1="102" x2="236" y2="102" />
      </g>
      <text x="49" y="76" fontSize="10" textAnchor="middle" className="fill-foreground">Hall</text>
      <text x="49" y="90" fontSize="10" textAnchor="middle" className="fill-foreground">sensor</text>
      <text x="271" y="84" fontSize="10" textAnchor="middle" className="fill-foreground">ECU</text>
      <text x="160" y="53" fontSize="9" textAnchor="middle" className="fill-muted">reference (5 V or 12 V)</text>
      <text x="160" y="75" fontSize="9" textAnchor="middle" className="fill-muted">signal (switches)</text>
      <text x="160" y="97" fontSize="9" textAnchor="middle" className="fill-muted">ground (near 0 V)</text>
      <circle cx="120" cy="58" r="3" className="fill-accent" />
      <circle cx="120" cy="80" r="3" className="fill-accent" />
      <circle cx="120" cy="102" r="3" className="fill-accent" />
      <line x1="120" y1="102" x2="120" y2="135" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 3" />
      <text x="120" y="148" fontSize="9" textAnchor="middle" className="fill-accent">red probe: back-probe each wire</text>
      <text x="160" y="164" fontSize="9" textAnchor="middle" className="fill-muted">black lead on battery negative throughout</text>
      <text x="160" y="20" fontSize="10" textAnchor="middle" className="fill-foreground">Connector plugged in, key on</text>
    </svg>
  );
}

export default function HowToTestACrankshaftPositionSensorPage() {
  return (
    <HowToShell
      title="How to Test a Crankshaft Position Sensor with a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          To test a crankshaft position sensor with a multimeter, first work out whether it is a two-wire
          inductive sensor or a three-wire Hall-effect sensor. An inductive sensor is checked unplugged for
          coil resistance and then for AC voltage while the engine cranks; a Hall sensor is checked plugged
          in for its reference voltage, its ground and a signal that switches as the crank turns. The engine
          computer uses this sensor to time spark and fuel, so when its signal drops out the engine usually
          won&apos;t start or cuts out without warning. This guide covers both sensor types, the numbers to
          expect, and what a meter can and cannot tell you.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter, front view",
        caption: (
          <>
            The Craftsman CMMT14171 is the automotive pick in our multimeter roundup. These checks use
            ohms, DC volts, AC volts and frequency. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "symptoms", label: "Symptoms that point to the sensor" },
        { id: "sensor-types", label: "Inductive or Hall-effect?" },
        { id: "inductive-resistance", label: "Inductive: resistance test" },
        { id: "inductive-ac-output", label: "Inductive: AC output while cranking" },
        { id: "hall-checks", label: "Hall-effect: reference, ground, signal" },
        { id: "harness", label: "Prove the harness to the ECU" },
        { id: "frequency", label: "Signal frequency: the numbers" },
        { id: "meter-limits", label: "What a meter can't show" },
        { id: "meters", label: "Meters for this job" },
      ]}
      faq={[
        {
          q: "Can a bad crankshaft position sensor still pass a multimeter test?",
          a: "Yes. A sensor can measure the right resistance and still drop out when it gets hot, or produce a signal with missing or distorted pulses that a meter averages away. If the engine dies when warm and restarts after cooling, test again with the engine at operating temperature, and consider viewing the signal on an oscilloscope.",
        },
        {
          q: "Does the tachometer moving while cranking prove the crank sensor works?",
          a: "On many vehicles the tachometer reading is derived from the crank signal, so a tach needle that rises while cranking suggests the computer is seeing pulses. It is a useful quick clue, not proof, because some instrument clusters use other inputs. Your service manual or a scan tool reading engine speed while cranking is more reliable.",
        },
        {
          q: "What air gap should the crank sensor have?",
          a: "It depends entirely on the engine. Many sensors are fixed in a machined bore with no adjustment, while some older designs use a shim or set gap. Use the figure in the service manual, and check that the reluctor teeth are clean, undamaged and free of metal debris stuck to the sensor tip, since debris weakens the signal.",
        },
        {
          q: "Should I replace the camshaft sensor at the same time?",
          a: "Not by default. The camshaft and crankshaft sensors do different jobs and fail independently. Read the stored codes, test the sensor the codes point to, and check the wiring to it before replacing anything. Some engines will start on the crank signal alone if the cam signal is missing, but few will run without the crank signal.",
        },
        {
          q: "What resistance should a crankshaft position sensor have?",
          a: "Only two-wire inductive sensors have a meaningful resistance, and the service manual figure is the one to trust. Many fall somewhere between a few hundred and about 1,500 ohms, but some sit outside that. OL means an open coil and a reading near zero means shorted turns. Three-wire Hall sensors contain electronics, so an ohmmeter reading across their pins tells you very little.",
        },
        {
          q: "Will a bad crankshaft sensor throw a check engine light?",
          a: "Usually, but not always. Codes in the P0335 to P0339 range commonly relate to the crank sensor circuit and often set when the computer sees cam pulses but no crank pulses. An intermittent dropout can stall the engine before a code matures, though, so a no-start with no code does not clear the sensor. Test it directly with the steps on this page.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter",
          title: "How to Test a Hall Effect Sensor",
          desc: "The general three-wire Hall test, for any application rather than crank-specific diagnosis.",
        },
        {
          href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics",
          title: "Best Oscilloscopes for Automotive Diagnostics",
          desc: "When you need to see the crank waveform, not just an averaged number.",
        },
      ]}
    >
      <Callout title="Cranking tests and specifications">
        Some checks here need the engine cranking. Keep leads and hands clear of belts, pulleys and the
        cooling fan, set the parking brake and select Park or neutral. If you only need the engine to turn
        without starting, disable fuel or ignition the way the service manual describes, and never hold a
        spark plug lead or coil while cranking: ignition secondary voltage can be many thousands of volts.
        Resistance, voltage and air-gap figures vary between engines, so take every specification from the
        service manual for your exact vehicle; the numbers on this page are typical ranges, not specs.
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Cranks, no start, no RPM on tach or scan tool", "Dead sensor, open wire or missing supply", "Resistance (inductive) or reference and ground (Hall)", "Repair wiring or replace sensor"],
            ["Stalls when hot, restarts after cooling", "Heat-sensitive sensor failure", "Repeat the tests at operating temperature", "Replace sensor; confirm with a scope if unsure"],
            ["Coil reads OL or near 0 Ω", "Open or shorted inductive winding", "Ohms across the two sensor pins, unplugged", "Replace sensor"],
            ["Good resistance, no AC output", "Air gap, damaged reluctor or debris on the tip", "Remove sensor, inspect tip and teeth", "Clean, re-seat, or a mechanic for reluctor damage"],
            ["Hall reference or ground missing", "Wiring or ECU supply fault", "DC volts at the connector, key on", "Trace the wire; a shop for ECU faults"],
            ["Signal fine at sensor, missing at ECU", "Open or chafed harness, corroded pin", "Repeat the signal test at the ECU connector", "Repair the harness or connector"],
            ["Misfires or tach drops at speed only", "Intermittent pulses or noise", "Min/Max or frequency while driving; a scope", "Oscilloscope diagnosis or a specialist"],
          ]}
        />
      </section>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Symptoms that point to the crankshaft sensor</h2>
        <p className="text-muted leading-7 mb-4">
          A failing crank sensor commonly causes a crank-but-no-start, an engine that stalls and then
          restarts after cooling down, intermittent misfires, or a tachometer that drops to zero while
          the engine is still turning. A stored code in the P0335 to P0339 family commonly relates to
          the crankshaft position sensor circuit, but the exact meaning varies by manufacturer, and the
          code points to the circuit as a whole. A broken wire, a corroded connector or a damaged
          reluctor ring can set the same code as a dead sensor.
        </p>
        <p className="text-muted leading-7">
          That is why testing matters before buying a sensor: the meter lets you split the fault between
          the sensor itself and the wiring that connects it to the engine computer. A quick first clue on
          a no-start is engine speed while cranking. If a scan tool shows zero RPM while the starter is
          clearly turning the engine, the computer is not receiving crank pulses, and the sensor circuit
          moves to the top of the list.
        </p>
      </section>

      <section>
        <h2 id="sensor-types" className="text-xl font-semibold mb-3">Inductive or Hall-effect?</h2>
        <p className="text-muted leading-7 mb-4">
          Count the wires at the connector and check the wiring diagram. The two common designs behave
          very differently on a meter:
        </p>
        <InfoCards
          items={[
            { label: "Inductive (magnetic), usually 2 wires", desc: "A coil around a magnet. Generates its own AC voltage as teeth pass; no power supply needed. Some add a third shield wire." },
            { label: "Hall-effect, usually 3 wires", desc: "Powered by a reference voltage from the computer, with a ground and a signal wire that switches on and off as teeth pass." },
          ]}
        />
        <Figure
          caption={
            <>
              An inductive sensor makes an AC wave whose size rises with engine speed. A Hall-effect
              sensor switches its signal wire between two fixed levels, whatever the speed.
            </>
          }
        >
          <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Comparison of an inductive crank sensor sine-like AC output and a Hall-effect crank sensor square-wave on/off output">
            <text x="10" y="18" fontSize="10" className="fill-foreground">Inductive: AC output</text>
            <line x1="10" y1="50" x2="310" y2="50" className="stroke-muted" strokeWidth="0.8" strokeDasharray="3 3" />
            <path
              d="M10 50 Q25 26 40 50 T70 50 Q85 26 100 50 T130 50 Q145 26 160 50 T190 50 Q205 26 220 50 T250 50 Q265 26 280 50 T310 50"
              className="stroke-accent"
              strokeWidth="1.8"
              fill="none"
            />
            <text x="10" y="98" fontSize="10" className="fill-foreground">Hall-effect: on/off output</text>
            <path
              d="M10 140 L10 112 L40 112 L40 140 L70 140 L70 112 L100 112 L100 140 L130 140 L130 112 L160 112 L160 140 L190 140 L190 112 L220 112 L220 140 L250 140 L250 112 L280 112 L280 140 L310 140"
              className="stroke-foreground"
              strokeWidth="1.8"
              fill="none"
            />
            <text x="314" y="116" fontSize="9" textAnchor="end" className="fill-muted">high</text>
            <text x="314" y="155" fontSize="9" textAnchor="end" className="fill-muted">low</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For the general theory of each type outside the crank application, see{" "}
          <Link href="/multimeters/how-to-test-a-magnetic-pickup-sensor-with-a-multimeter" className={link}>
            testing a magnetic pickup sensor
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter" className={link}>
            testing a Hall effect sensor
          </Link>
          . The steps below focus on diagnosing the crank circuit on a car.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="inductive-resistance">Inductive sensor: check coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the ignition off, unplug the sensor and set the meter to ohms. Measure across the two
          sensor terminals and compare with the service manual range. Many inductive crank sensors fall
          somewhere between a few hundred and about 1,500 Ω, but the manual figure is the one that counts.
          An open reading (OL) means a broken coil; a reading near zero suggests shorted windings. Then
          measure from each terminal to the sensor body or engine ground: there should be no continuity.
          Wiggle the sensor lead while watching the display, because a cracked internal joint can show up
          only when the cable moves.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: a coil inside a typical range. Compare with your manual, not this number.</>}>
            <MeterReadout value="0.652" unit="kΩ" mode="Ω  pins 1–2, unplugged" />
          </Figure>
          <Figure caption={<>Illustrative reading: an open winding. Replace the sensor.</>}>
            <MeterReadout value="OL" unit="MΩ" mode="Ω  pins 1–2, unplugged" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Resistance changes with temperature. Copper rises by roughly 0.4% per °C, so a coil that reads
          650 Ω at 20 °C reads about 650 × (1 + 0.004 × 60) ≈ 806 Ω at 80 °C. A warm reading a little above
          the cold spec is normal; a reading that jumps to OL only when hot is the failure you are hunting.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inductive-ac-output">Inductive sensor: AC voltage while cranking</StepHeading>
        <p className="text-muted leading-7">
          Set the meter to AC volts and connect across the two sensor terminals (unplugged, or
          back-probed at the connector if your manual allows). Have a helper crank the engine. A working
          sensor produces a small AC voltage that rises with speed: often a few hundred millivolts at
          cranking speed and several volts at higher RPM, though the manual may quote its own minimum. No
          reading at all, with a good resistance result, suggests an excessive air gap, a damaged reluctor
          or debris on the sensor tip. A magnetic sensor tip attracts steel filings, so pull the sensor and
          wipe it before condemning it.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="hall-checks">Hall-effect sensor: reference, ground and signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A Hall sensor can&apos;t be judged with an ohmmeter, so test it powered. Identify the three wires
          from the wiring diagram, plug the sensor in, and back-probe at the connector with the key on:
        </p>
        <Figure caption={<>Back-probing a three-wire Hall crank sensor with the connector plugged in. Use a back-probe pin, not a piercing probe, so the seal stays intact.</>}>
          <HallWiringDiagram />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Wire", "Meter setting", "Condition", "What a healthy circuit shows"]}
            rows={[
              ["Reference (supply)", "DC volts to ground", "Key on", "The supply voltage given in the manual (often 5 V or battery voltage)"],
              ["Ground", "DC volts to battery negative", "Key on", "Close to 0 V, typically under about 0.1 V; higher means a poor ground"],
              ["Signal", "DC volts to ground", "Turn engine slowly by hand", "Switches between a low and a high level as each tooth passes"],
              ["Signal", "DC volts or frequency", "Cranking", "A steady in-between average on DC volts, or a frequency that rises with speed"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          If the reference or ground is missing, the fault is in the wiring or the computer, not the
          sensor. If both are correct but the signal never switches, the sensor is the likely culprit.
          Turning the crankshaft by hand with a breaker bar on the pulley bolt, ignition on and the engine
          unable to start, is the clearest way to see individual transitions on a meter. While cranking, a
          DC meter averages the square wave: a 5 V signal that is high half the time reads about
          5 × 0.5 = 2.5 V. A signal stuck at about 0 V or at the full reference voltage during cranking
          means it is not switching.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="harness">Prove the harness all the way to the ECU</StepHeading>
        <p className="text-muted leading-7">
          A good result at the sensor connector only proves the sensor end. Repeat the signal test at the
          engine computer connector, back-probing the crank signal pin from the wiring diagram. If the
          signal is present at the sensor but missing at the ECU, the harness between them is open or
          shorted. With the battery disconnected and both ends unplugged, a continuity check on each wire
          should read close to 0 Ω end to end and OL to ground and to its neighbors. Inductive sensors often
          use a shielded cable; a shield that is broken or grounded at the wrong end lets ignition noise
          onto the signal. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-continuity-on-a-long-electrical-wire" className={link}>
            measuring continuity on a long wire
          </Link>{" "}
          covers the method.
        </p>
      </section>

      <section>
        <h2 id="frequency" className="text-xl font-semibold mb-3">Signal frequency: why the meter struggles</h2>
        <p className="text-muted leading-7 mb-4">
          Many engines use a 60-2 trigger wheel: 60 tooth positions with two missing to mark a reference
          point, so 58 real teeth. The pulse rate is revolutions per second times teeth per revolution. At a
          cranking speed of about 200 RPM, that is (200 ÷ 60) × 58 ≈ 193 pulses per second. At an 800 RPM
          idle it is (800 ÷ 60) × 58 ≈ 773, and at 3,000 RPM it is 50 × 58 = 2,900. Other engines use
          different wheels, such as 36-1, so the exact figures change, but the scale does not.
        </p>
        <Figure caption={<>Worked example for a 60-2 wheel (58 teeth): pulses per second at cranking, idle and cruise. A meter display updating a few times a second cannot show individual pulses at these rates.</>}>
          <BarChart
            items={[
              { label: "Cranking, ~200 RPM", value: 193, display: "~193 Hz" },
              { label: "Idle, ~800 RPM", value: 773, display: "~773 Hz" },
              { label: "Cruise, ~3,000 RPM", value: 2900, display: "~2.9 kHz", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A meter with a frequency function can confirm the pulse rate is roughly what the arithmetic
          predicts and rises smoothly with engine speed, which is a stronger check than AC volts alone. A
          frequency reading far below the prediction, or one that jumps around at a steady speed, suggests
          missing pulses or noise. That is the point to move from a meter to a scope.
        </p>
      </section>

      <section id="meter-limits">
        <KeyIdea title="What a multimeter can't show you">
          A meter updates a few times a second and averages what it sees, so it can confirm that a signal
          exists, but not that every pulse is the right shape. A missing tooth, a dropout lasting a few
          milliseconds or noise from a damaged shield is invisible on a display. When the meter says the
          circuit is fine but the symptoms persist, an oscilloscope showing the actual crank waveform is
          the next step; see our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope guide
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for this job</h2>
        <p className="text-muted leading-7 mb-4">
          Ohms and volts are enough for the basic tests. A frequency function and fast Min/Max capture make
          crank-signal diagnosis much easier. These picks come from our verified{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            automotive multimeter list
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters with frequency and capture for sensor work"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, CAT III 600V, with RPM, dwell, duty cycle, frequency and temperature.",
            },
            {
              name: "Fluke 88V",
              image: fluke88v.image,
              alt: "Fluke 88V automotive multimeter",
              href: "/multimeters/best-multimeter-for-automotive#fluke-88v",
              note: "250 µs Peak Min/Max catches brief dropouts; duty cycle to 99.9%. Average-responding, not True RMS; RPM pickup sold separately.",
            },
            {
              name: "Innova 3340",
              image: innova3340.image,
              alt: "Innova 3340 automotive multimeter with inductive RPM pickup",
              href: "/multimeters/best-multimeter-for-automotive#innova-3340",
              note: "RPM 0 to 10,000 with the included inductive clamp, plus frequency, duty cycle, Min/Max and Hold. Marked CAT II 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
