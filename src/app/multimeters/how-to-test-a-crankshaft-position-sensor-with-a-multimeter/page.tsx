import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a crankshaft position sensor with a multimeter: resistance and AC output for 2-wire inductive types, reference, ground and signal for Hall types.";

export const metadata = buildMetadata({
  title: "Test a Crankshaft Position Sensor",
  description,
  path: "/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function HowToTestACrankshaftPositionSensorPage() {
  return (
    <HowToShell
      title="How to Test a Crankshaft Position Sensor with a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          The engine computer uses the crankshaft position sensor to know when each piston is coming up,
          so it can time spark and fuel. When that signal disappears, the engine usually won&apos;t start
          or cuts out without warning. To test a crankshaft position sensor with a multimeter, you first
          identify whether it is a two-wire inductive sensor or a three-wire Hall-effect sensor, because
          the checks are different. This guide covers both, plus what a meter can and cannot tell you.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter, front view",
        caption: (
          <>
            The Craftsman CMMT14171 is the automotive pick in our multimeter roundup. These checks use
            ohms, DC volts and AC volts. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "symptoms", label: "Symptoms that point to the sensor" },
        { id: "sensor-types", label: "Inductive or Hall-effect?" },
        { id: "inductive-resistance", label: "Inductive: resistance test" },
        { id: "inductive-ac-output", label: "Inductive: AC output while cranking" },
        { id: "hall-checks", label: "Hall-effect: reference, ground, signal" },
        { id: "meter-limits", label: "What a meter can't show" },
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
          a: "It depends entirely on the engine. Many sensors are fixed in a machined bore with no adjustment, while some older designs use a shim or set gap. Use the figure in the service manual, and check that the reluctor teeth are clean, undamaged and free of metal debris stuck to the sensor tip.",
        },
        {
          q: "Should I replace the camshaft sensor at the same time?",
          a: "Not by default. The camshaft and crankshaft sensors do different jobs and fail independently. Read the stored codes, test the sensor the codes point to, and check the wiring to it before replacing anything. Some engines will start on the crank signal alone, but few will run without it.",
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
        cooling fan, set the parking brake and select Park or neutral. Resistance, voltage and air-gap
        figures vary widely between engines, so take every specification from the service manual for
        your exact vehicle; this guide gives the method, not the numbers.
      </Callout>

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
          the sensor itself and the wiring that connects it to the engine computer.
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
          <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Comparison of an inductive crank sensor sine-like output and a Hall-effect crank sensor square-wave output">
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
        <p className="text-muted leading-7">
          With the ignition off, unplug the sensor and set the meter to ohms. Measure across the two
          sensor terminals and compare with the service manual range. An open reading (OL) means a broken
          coil; a reading near zero suggests shorted windings. Then measure from each terminal to the
          sensor body or engine ground: there should be no continuity. Wiggle the sensor lead while
          watching the display, because a cracked internal joint can show up only when the cable moves.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inductive-ac-output">Inductive sensor: AC voltage while cranking</StepHeading>
        <p className="text-muted leading-7">
          Set the meter to AC volts and connect across the two sensor terminals (unplugged, or
          back-probed at the connector if your manual allows). Have a helper crank the engine. A working
          sensor produces a small AC voltage that rises with speed; the manual may quote a minimum at
          cranking speed. No reading at all, with a good resistance result, suggests an excessive air
          gap, a damaged reluctor or debris on the sensor tip. Repeat the test at the engine computer
          connector to prove the harness carries the signal all the way.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="hall-checks">Hall-effect sensor: reference, ground and signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A Hall sensor can&apos;t be judged with an ohmmeter, so test it powered. Identify the three wires
          from the wiring diagram, plug the sensor in, and back-probe at the connector with the key on:
        </p>
        <DataTable
          head={["Wire", "Meter setting", "Condition", "What a healthy circuit shows"]}
          rows={[
            ["Reference (supply)", "DC volts to ground", "Key on", "The supply voltage given in the manual (often 5 V or battery voltage)"],
            ["Ground", "DC volts to battery negative", "Key on", "Close to 0 V; a higher reading means a poor ground"],
            ["Signal", "DC volts to ground", "Turn engine slowly by hand", "Switches between a low and a high level as each tooth passes"],
            ["Signal", "DC volts or frequency", "Cranking", "A changing average voltage, or a frequency that rises with speed"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the reference or ground is missing, the fault is in the wiring or the computer, not the
          sensor. If both are correct but the signal never switches, the sensor is the likely culprit.
          Turning the crankshaft by hand with a breaker bar on the pulley bolt, ignition on and the engine
          unable to start, is the clearest way to see individual transitions on a meter.
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
    </HowToShell>
  );
}
