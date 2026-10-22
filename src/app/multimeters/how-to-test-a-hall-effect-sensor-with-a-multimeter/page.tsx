import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a Hall effect sensor with a multimeter: power it, read the signal as a magnet passes, add a pull-up for open-collector types, and back-probe safely.";

export const metadata = buildMetadata({
  title: "How to Test a Hall Effect Sensor With a Meter",
  description,
  path: "/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Bench wiring for a 3-wire open-collector Hall sensor with a pull-up resistor and a meter on DC volts. */
function PullUpWiring() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring diagram: a 5 volt bench supply feeds the Hall sensor supply pin, a 10 kilohm pull-up resistor connects the signal pin to the supply, and a multimeter on DC volts reads between signal and ground"
    >
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        {/* supply rail */}
        <line x1="40" y1="30" x2="260" y2="30" />
        {/* ground rail */}
        <line x1="40" y1="170" x2="260" y2="170" />
        {/* bench supply */}
        <line x1="40" y1="30" x2="40" y2="80" />
        <line x1="40" y1="120" x2="40" y2="170" />
        {/* sensor body */}
        <rect x="120" y="85" width="60" height="50" rx="4" className="fill-surface stroke-foreground" />
        {/* sensor supply pin */}
        <line x1="135" y1="30" x2="135" y2="85" />
        {/* sensor ground pin */}
        <line x1="150" y1="135" x2="150" y2="170" />
        {/* signal pin out to the right */}
        <line x1="180" y1="110" x2="220" y2="110" />
        {/* pull-up from supply to signal */}
        <line x1="220" y1="30" x2="220" y2="48" />
        <line x1="220" y1="82" x2="220" y2="110" />
        {/* meter leads */}
        <path d="M220 110 H275 V125" className="stroke-accent" strokeDasharray="4 3" />
        <path d="M275 155 V170 H260" className="stroke-accent" strokeDasharray="4 3" />
      </g>
      {/* bench supply symbol */}
      <circle cx="40" cy="100" r="20" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="40" y="98" fontSize="9" textAnchor="middle" className="fill-foreground">5 V</text>
      <text x="40" y="109" fontSize="9" textAnchor="middle" className="fill-muted">supply</text>
      {/* resistor */}
      <rect x="213" y="48" width="14" height="34" rx="2" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="233" y="69" fontSize="9" className="fill-muted">10 kΩ</text>
      {/* sensor labels */}
      <text x="150" y="107" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Hall</text>
      <text x="150" y="120" fontSize="9" textAnchor="middle" className="fill-muted">sensor</text>
      <text x="139" y="62" fontSize="9" className="fill-muted">V+</text>
      <text x="154" y="155" fontSize="9" className="fill-muted">GND</text>
      <text x="186" y="104" fontSize="9" className="fill-muted">OUT</text>
      {/* meter */}
      <circle cx="275" cy="140" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="275" y="144" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">V⎓</text>
      {/* magnet */}
      <rect x="125" y="140" width="22" height="12" rx="2" className="fill-accent" />
      <text x="105" y="150" fontSize="9" textAnchor="end" className="fill-muted">magnet</text>
      <text x="160" y="192" fontSize="9" textAnchor="middle" className="fill-muted">black lead on GND, red lead on OUT</text>
    </svg>
  );
}

export default function HowToTestAHallEffectSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Hall Effect Sensor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a Hall effect sensor with a multimeter, power the sensor, set the meter to DC volts, and
          measure between its signal and ground wires while you move a magnet (or a steel target) past the
          tip. A working digital sensor snaps between two clear levels, near the supply and near zero; a linear
          sensor rests close to half its supply and swings up or down with the field. A signal that never
          moves points to the sensor, its supply or its wiring.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter, front view",
        caption: (
          <>
            The Craftsman CMMT14171 adds RPM, dwell and duty-cycle functions to standard True RMS ranges,
            which suits crank and cam sensor work. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-hall-sensors-work", label: "How a 3-wire Hall sensor works" },
        { id: "why-resistance-fails", label: "Why a resistance test tells you nothing" },
        { id: "identify-the-wires", label: "Identify supply, ground and signal" },
        { id: "power-the-sensor", label: "Power the sensor" },
        { id: "read-the-signal", label: "Read the signal with a magnet" },
        { id: "expected-readings", label: "Expected readings" },
        { id: "crank-and-cam-sensors", label: "Crank, cam and bike speed sensors" },
        { id: "two-wire-sensors", label: "2-wire current-output sensors" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I test a Hall effect sensor with an ohmmeter?",
          a: "Not in any useful way. A Hall sensor contains an integrated circuit, so the resistance between its pins depends on the meter's test voltage, the lead polarity and the internal chip design. No datasheet lists a value to compare against. Power it and check the output voltage instead.",
        },
        {
          q: "Why does my Hall sensor output read 0 V all the time?",
          a: "If it is an open-collector type, it needs a pull-up resistor to the supply before it can show a high level. Without one, the output floats. Fit a pull-up of around 10 kΩ, or test it connected to its own module, which normally supplies the pull-up.",
        },
        {
          q: "How do I tell a Hall crank sensor from an inductive one?",
          a: "A Hall crank or cam sensor normally has three wires: a reference supply, a ground and a signal. An inductive (variable reluctance) sensor usually has two wires, makes its own AC voltage, and does have a measurable coil resistance. The wiring diagram confirms which type is fitted.",
        },
        {
          q: "Does it matter which side of the magnet I use?",
          a: "Often, yes. Many digital Hall switches respond to only one pole, so if nothing happens, flip the magnet over and try again. Latching types release only on the opposite pole. Linear sensors respond to both, with the output rising for one pole and falling for the other.",
        },
        {
          q: "Can a multimeter catch an intermittent Hall sensor fault?",
          a: "Sometimes. Watch the reading while you flex the harness, tap the sensor gently or warm it with a hair dryer, since many failures appear only when hot. A meter averages fast signals, though, so a sensor that drops the occasional pulse at speed may look fine. An oscilloscope or scan tool live data shows that kind of fault far better.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "Check the relay that often feeds sensor and fuel-pump circuits, coil side and contact side.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "Find the bad ground or corroded connector that makes a good sensor look faulty.",
        },
      ]}
    >
      <Callout title="Work safely around engines and harnesses">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Keep hands, hair and leads clear of belts and fans whenever an engine may be cranked. If you turn
            the engine by hand with the ignition on, pull the fuel pump or injection fuse first so it cannot
            start, and keep the transmission in park or neutral.
          </li>
          <li>
            Never feed a bench supply into a sensor still plugged into the vehicle module.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-hall-sensors-work" className="text-xl font-semibold mb-3">How a 3-wire Hall effect sensor works</h2>
        <p className="text-muted leading-7 mb-4">
          A Hall effect sensor is a small chip whose sensing element produces a tiny voltage in a magnetic
          field, which on-board circuitry turns into a usable output. Because that circuitry needs power, most
          Hall sensors have three connections:
          a supply (often 5 V from a control module, sometimes 8 V or 12 V), a ground, and a signal output.
        </p>
        <p className="text-muted leading-7">
          Outputs come in two broad styles. A <strong className="text-foreground">digital</strong> sensor acts
          like a switch. Most are open-collector (or open-drain): they can only pull the signal low, so
          something else must pull it high. A <strong className="text-foreground">linear</strong> (analogue) sensor
          gives a voltage proportional to the field, resting around half the supply with no magnet present.
        </p>
      </section>

      <section>
        <h2 id="why-resistance-fails" className="text-xl font-semibold mb-3">Why a resistance test tells you nothing</h2>
        <p className="text-muted leading-7 mb-4">
          Measuring resistance across the pins works for inductive pickups, which are just a coil of wire, but
          not for a Hall device. Between any two pins of a Hall IC the meter is probing transistor junctions and
          protection diodes, so the number changes with lead polarity and from one meter to the next.
        </p>
        <KeyIdea title="Test the function, not the ohms">
          Give the sensor power and watch its output respond to a magnetic field.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="identify-the-wires">Identify supply, ground and signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a vehicle, with the connector plugged in and
          the ignition on, back-probe each wire against a good ground: the supply reads the reference voltage,
          the ground reads close to 0 V, and the signal reads whatever the sensor is currently outputting. If
          the reference supply is missing, the fault is upstream of the sensor. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            guide to using a multimeter
          </Link>{" "}
          covers DC volts setup if you need a refresher.
        </p>
        <p className="text-muted leading-7">
          To back-probe safely, slide a thin back-probe pin along the wire into the rear of the connector until
          it touches the terminal, keeping the weather seal intact. Never pierce the insulation, and take care
          not to bridge two terminals.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="power-the-sensor">Power the sensor from its circuit or a bench supply</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In place, the module supplies power and normally the pull-up resistor too. On the bench, connect a current-limited supply at the sensor&apos;s
          rated voltage. For an open-collector
          output, add a pull-up resistor from the signal pin to the supply. A value around 10 kΩ is a common
          choice at 5 V; anything from roughly 4.7 kΩ to 10 kΩ suits typical outputs.
        </p>
        <Figure
          caption={
            <>
              Bench test for an open-collector Hall switch: a 10 kΩ pull-up holds the output high, and the
              sensor pulls it low when the magnet is in place. A linear sensor needs no pull-up.
            </>
          }
        >
          <PullUpWiring />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="read-the-signal">Read the signal voltage while a magnet passes</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Put the black lead on ground and the red lead on the signal, with the meter on DC volts. Bring a
          small magnet up to the sensing face, then take it away, and repeat a few times. For gear-tooth
          sensors, which contain their own biasing magnet, pass a steel object such as a screwdriver blade or
          a spanner across the tip instead. The output should switch cleanly between two levels each time.
        </p>
        <Figure
          caption={
            <>
              Typical readings for an open-collector Hall switch on a 5 V supply with a 10 kΩ pull-up: near
              the supply with no magnet (left), near zero with the magnet in place (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.98" unit="V" mode="DC  no magnet" />
            <MeterReadout value="0.14" unit="V" mode="DC  magnet present" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="expected-readings" className="text-xl font-semibold mb-3">Expected Hall sensor readings on a multimeter</h2>
        <DataTable
          head={["Sensor type", "At rest", "Field present", "Likely fault if"]}
          rows={[
            ["Digital, open-collector (with pull-up)", "Near supply, e.g. ≈ 5 V", "Near 0 V, typically under 0.4 V", "Stuck high or stuck low"],
            ["Digital, push-pull output", "Near 0 V or near supply", "The opposite level", "Never changes state"],
            ["Linear / analogue", "About half supply, ≈ 2.5 V at 5 V", "Rises for one pole, falls for the other", "Stuck at a rail, or no change"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          These are typical values at a 5 V supply; exact levels vary by part. A reading stuck between the two
          digital levels usually means a missing pull-up, a poor ground, or the meter averaging a fast signal.
        </p>
      </section>

      <section>
        <h2 id="crank-and-cam-sensors" className="text-xl font-semibold mb-3">Testing crank, cam and bike speed Hall sensors</h2>
        <p className="text-muted leading-7 mb-4">
          Automotive crankshaft and camshaft position sensors are a common place to meet Hall devices. With
          the connector back-probed and the ignition on, turn the engine slowly by hand using a socket on the
          crank pulley bolt: the signal should step between high and low as each tooth or window passes. While
          cranking, DC volts shows an in-between average, which still proves the signal is moving; a
          duty-cycle or frequency function shows it more directly. A sensor that
          looks fine but still triggers a code may be fed by a bad ground, so a{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop test on the car
          </Link>{" "}
          is worth doing on the sensor ground and reference wires.
        </p>
        <Figure
          caption={
            <>
              A working crank or cam Hall sensor gives a clean square wave as teeth pass. A multimeter shows
              only its average.
            </>
          }
        >
          <ScopeScreen wave="square" cycles={4} amplitude={2} offset={0} labels={{ left: "2 V/div", right: "cranking" }} />
        </Figure>
        <p className="text-muted leading-7">
          On bicycles, many basic computer speed sensors are reed switches rather than Hall devices; those have
          two wires and test with continuity as the wheel magnet passes. E-bike speed and pedal sensors are
          often 3-wire Hall types fed with around 5 V from the controller and test as described above.
        </p>
      </section>

      <section>
        <h2 id="two-wire-sensors" className="text-xl font-semibold mb-3">2-wire current-output Hall sensors</h2>
        <p className="text-muted leading-7 mb-4">
          Some Hall sensors, including many active ABS wheel-speed sensors, have only two wires. Instead of
          switching a voltage, they switch between two current levels, commonly around 7 mA and 14 mA. Measure the
          current instead: put the meter on mA in series with the supply lead, or fit a small resistor in series (100 Ω turns those
          typical currents into about 0.7 V and 1.4 V) and read the voltage across it. Rotate the wheel slowly
          and the reading should alternate between the two levels.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for Hall sensor testing</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with DC volts and a mA range covers these tests; duty-cycle or RPM functions help
          on running engines. Compare options in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, CAT III 600V, with RPM, dwell and duty-cycle functions for automotive diagnostics.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto and manual ranging. Aimed at microcontroller and electronics projects.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
