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
  "How to test an IR sensor with a multimeter: diode-test the IR LED, power an IR receiver and watch its output dip, and check obstacle and PIR module outputs.";

export const metadata = buildMetadata({
  title: "How to Test an IR Sensor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ir-sensor-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;

const link = "text-accent hover:underline";

/** IR receiver module wired to a 5 V supply with the meter on OUT to GND, idle high, dipping during a remote burst. */
function IrReceiverTestDiagram() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="w-full h-auto"
      role="img"
      aria-label="Testing a three-pin IR receiver module with a multimeter. The receiver's VS pin connects to a 5 volt supply and its GND pin to the supply ground. The multimeter is set to DC volts with the black probe on GND and the red probe on the OUT pin. With no remote, the output idles high near the supply voltage. When a TV remote is pointed at the receiver and a button is pressed, the output pulses low in bursts, so the meter's average reading dips while the button is held."
    >
      {/* receiver */}
      <rect x="40" y="40" width="70" height="70" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <circle cx="75" cy="68" r="16" className="fill-foreground" opacity="0.75" />
      <text x="75" y="126" textAnchor="middle" fontSize="9" className="fill-muted">IR receiver</text>
      {/* pins */}
      <line x1="55" y1="110" x2="55" y2="150" className="stroke-foreground" strokeWidth="2" />
      <line x1="75" y1="110" x2="75" y2="150" className="stroke-foreground" strokeWidth="2" />
      <line x1="95" y1="110" x2="95" y2="150" className="stroke-foreground" strokeWidth="2" />
      <text x="55" y="164" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">OUT</text>
      <text x="75" y="164" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">GND</text>
      <text x="95" y="164" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">VS</text>
      {/* supply */}
      <line x1="95" y1="150" x2="95" y2="190" className="stroke-foreground" strokeWidth="1.4" />
      <line x1="95" y1="190" x2="160" y2="190" className="stroke-foreground" strokeWidth="1.4" />
      <rect x="160" y="176" width="44" height="28" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="182" y="194" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">+5 V</text>
      <line x1="75" y1="150" x2="75" y2="206" className="stroke-foreground" strokeWidth="1.4" />
      <line x1="75" y1="206" x2="214" y2="206" className="stroke-foreground" strokeWidth="1.4" />
      <line x1="214" y1="206" x2="214" y2="190" className="stroke-foreground" strokeWidth="1.4" />
      <line x1="204" y1="190" x2="214" y2="190" className="stroke-foreground" strokeWidth="1.4" />
      {/* meter */}
      <rect x="250" y="40" width="90" height="110" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <rect x="262" y="52" width="66" height="30" rx="3" className="fill-muted" opacity="0.25" />
      <text x="295" y="72" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-foreground">V DC</text>
      <circle cx="275" cy="130" r="6" className="fill-accent" />
      <circle cx="315" cy="130" r="6" className="fill-foreground" />
      {/* leads */}
      <path d="M275 136 C 270 175, 120 170, 55 150" fill="none" className="stroke-accent" strokeWidth="1.6" />
      <path d="M315 136 C 320 200, 140 160, 75 152" fill="none" className="stroke-foreground" strokeWidth="1.4" strokeDasharray="4 3" />
      {/* remote */}
      <rect x="150" y="30" width="34" height="60" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <circle cx="167" cy="42" r="3" className="fill-accent" />
      <path d="M148 44 Q 132 52 118 62 M148 52 Q 134 60 120 70" fill="none" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="167" y="104" textAnchor="middle" fontSize="9" className="fill-muted">remote</text>
      <text x="295" y="166" textAnchor="middle" fontSize="9" className="fill-muted">idle ≈ supply; dips</text>
      <text x="295" y="178" textAnchor="middle" fontSize="9" className="fill-muted">while button held</text>
    </svg>
  );
}

export default function HowToTestAnIrSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an IR Sensor With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-an-ir-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an IR sensor with a multimeter, first work out which kind you have: test a bare IR LED or photodiode
          in diode mode like any diode, and test a powered module, such as a three-pin IR receiver or an obstacle
          sensor, by measuring its output pin in DC volts while you trigger it. A working IR receiver idles near its
          supply voltage and the reading dips while you press a remote button at it. This guide covers IR LEDs,
          receivers, photodiodes and phototransistors, obstacle modules and PIR motion sensors, with what a good and a
          bad reading look like for each.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR True RMS digital multimeter",
        caption: (
          <>
            A meter with diode test and DC volts, such as the AstroAI DM6000AR, covers every check here. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              AstroAI DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "which-sensor", label: "Which IR sensor do you have?" },
        { id: "problems", label: "Problems and fixes" },
        { id: "ir-led", label: "1. Test an IR LED" },
        { id: "photodiode", label: "2. Test a photodiode or phototransistor" },
        { id: "receiver", label: "3. Test an IR receiver" },
        { id: "obstacle", label: "4. Test an obstacle module" },
        { id: "pir", label: "5. Test a PIR motion sensor" },
        { id: "camera", label: "6. Confirm with a phone camera" },
        { id: "tools", label: "Meters to use" },
      ]}
      faq={[
        {
          q: "How do I know if my IR sensor is working?",
          a: "For a powered module, measure the output pin in DC volts and trigger the sensor. An IR receiver idles near its supply and dips while a remote is pressed at it; an obstacle module's output changes state when you put your hand in front of it, usually with an onboard LED. If the output never moves while supply and ground are correct, the sensor is likely faulty.",
        },
        {
          q: "What should an IR LED read on a multimeter?",
          a: "In diode mode, an infrared LED usually reads lower than a visible LED, because IR emitters have a lower forward voltage, typically around 1.2 to 1.5 V at their rated current in datasheets and often near 1 V at a meter's small test current. Reversed, it should read OL. A reading near zero both ways means it is shorted; OL both ways means it is open.",
        },
        {
          q: "Can I test an IR receiver without an oscilloscope?",
          a: "Yes. Power it within its rated supply range, put the meter on DC volts from OUT to GND and press any button on a TV remote aimed at it. The output pulses low in bursts too fast for the meter to follow, but the average falls, so the reading dips while the button is held and returns when released. An oscilloscope shows the actual pulses if you need them.",
        },
        {
          q: "Why does my IR receiver read 0 V at the output?",
          a: "Check the pinout first: many three-pin receivers are OUT, GND, VS from the left when facing the dome, but not all, and reversed supply can destroy them. Confirm the supply voltage at the VS pin. If supply is correct and the output stays at 0 V with no remote nearby, the receiver is likely damaged. Some modules also include an onboard LED that loads the output.",
        },
        {
          q: "How do I test a PIR motion sensor with a multimeter?",
          a: "Power the module, give it a minute to settle, and measure the output pin to ground in DC volts. Common HC-SR501 style modules output about 3.3 V when they detect motion and near 0 V when idle. Wave a hand across the lens and watch the reading rise, then fall after the delay set by the trim pot. No change at all suggests a faulty sensor or wrong mode jumper.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-photoelectric-sensor-with-a-multimeter",
          title: "How to Test a Photoelectric Sensor With a Multimeter",
          desc: "The industrial cousin: PNP and NPN outputs on 24 V sensors.",
        },
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "Diode mode explained, for IR LEDs and photodiodes.",
        },
      ]}
    >
      <Callout title="Low voltage, but easy to damage">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Most hobby IR sensors run from 3.3 V or 5 V. Check the datasheet&apos;s supply range before powering a
            sensor on the bench; reversed polarity or overvoltage can destroy a receiver instantly.
          </li>
          <li>
            Never power a bare IR LED straight from a supply without a current-limiting resistor. Use the meter&apos;s
            diode test, or a supply with a resistor sized for the LED&apos;s rated current.
          </li>
          <li>
            Don&apos;t stare into high-power IR emitters at close range. Infrared light is invisible, so you get no
            warning from brightness.
          </li>
          <li>
            IR sensors inside TVs, appliances and alarms sit on boards that may carry mains voltage. Unplug the
            appliance and let it discharge first, or leave live testing to a qualified technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="which-sensor" className="text-xl font-semibold mb-3">Which IR sensor do you have?</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;IR sensor&quot; covers several different parts, and each needs a different test. Two-leg parts are
          bare components you test with the circuit off. Three- and four-pin parts and small boards are powered
          modules you test by watching their output. Work out which you have before you start.
        </p>
        <DataTable
          head={["Sensor", "How it looks", "Meter test", "Good result"]}
          rows={[
            ["IR LED (emitter)", "Clear or blue-tinted 2-leg LED", "Diode mode", "Forward reading one way, OL the other"],
            ["Photodiode / phototransistor", "Dark or clear 2-leg part", "Diode or resistance mode, light vs dark", "Reading changes with IR light"],
            ["IR receiver (e.g. TSOP38238)", "3 pins, dark dome", "DC volts on OUT, powered", "High at idle, dips with a remote"],
            ["Obstacle module (IR pair + comparator)", "Small board, 2 LEDs, trim pot", "DC volts on DO, powered", "Output switches with a hand in front"],
            ["PIR motion sensor", "White dome on a board", "DC volts on OUT, powered", "Output goes high on motion"],
          ]}
        />
      </section>

      <section>
        <h2 id="problems" className="text-xl font-semibold mb-3">Problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Remote does nothing, receiver idles high", "Remote battery or IR LED dead", "Phone camera on the remote LED", "New batteries; test the IR LED"],
            ["Receiver output stuck at 0 V", "Wrong pinout or damaged receiver", "Supply at VS pin, pin order", "Correct wiring; replace receiver"],
            ["IR LED reads OL both ways", "Open LED or broken leg", "Diode mode both directions", "Replace the LED"],
            ["Obstacle module always triggered", "Sensitivity too high or reflective surface", "Turn trim pot, change background", "Adjust pot; shield the LEDs"],
            ["Obstacle module never triggers", "Sensitivity too low or dead emitter", "Phone camera on the IR LED", "Adjust pot; replace module"],
            ["Works indoors, fails in sunlight", "Sunlight swamps the IR", "Test in shade", "Shield the sensor or move it"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="ir-led">Test an IR LED in diode mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the circuit unpowered and the LED out of circuit or one leg lifted, set the meter to diode test. Put
          the red probe on the longer leg (anode) and black on the shorter (cathode). An IR LED should show a forward
          reading, and reversed, OL. IR emitters have a lower forward voltage than visible LEDs, so a lower reading than
          you&apos;d expect from a red LED is normal. The chart shows typical datasheet figures at rated current; your
          meter&apos;s small test current usually reads somewhat lower.
        </p>
        <Figure caption={<>Typical LED forward voltage by color at rated current (typical datasheet ranges, midpoints shown). Infrared emitters sit lowest.</>}>
          <BarChart
            items={[
              { label: "Infrared (850–940 nm)", value: 1.35, display: "about 1.2–1.5 V", highlight: true },
              { label: "Red", value: 1.9, display: "about 1.8–2.1 V" },
              { label: "Yellow", value: 2.0, display: "about 1.9–2.2 V" },
              { label: "Blue", value: 3.1, display: "about 2.8–3.4 V" },
              { label: "White", value: 3.1, display: "about 2.8–3.4 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          You can&apos;t see an IR LED glow during the test, but a phone camera often can (step 6). For how diode mode
          works and why it reads in volts, see{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            how to test a diode with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="photodiode">Test a photodiode or phototransistor</StepHeading>
        <p className="text-muted leading-7">
          A photodiode tests like a diode in diode mode, forward one way and OL the other. To prove it responds to
          light, switch to a high resistance range or measure its reverse leakage: cover it, note the reading, then
          shine a working IR remote or a bright lamp at it and watch the resistance fall. A two-leg phototransistor
          reads high resistance in both directions in the dark and drops sharply when IR hits it with the correct
          polarity. The principle is the same as a light-dependent resistor; our guide to{" "}
          <Link href="/multimeters/how-to-test-a-photoresistor-with-a-multimeter" className={link}>
            testing a photoresistor
          </Link>{" "}
          shows the light-versus-dark method.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="receiver">Test a three-pin IR receiver</StepHeading>
        <p className="text-muted leading-7 mb-4">
          IR receivers such as the Vishay TSOP38238 contain a photodiode, amplifier and demodulator, and are designed
          to respond to IR bursts modulated at a carrier frequency, commonly 38 kHz. Vishay specifies a supply of 2.5
          to 5.5 V for that family, and the output is active low. Check the pinout in your part&apos;s datasheet;
          many are OUT, GND, VS from left to right facing the dome. Power it from a 5 V or 3.3 V source, put the black
          probe on GND and the red on OUT, and set the meter to DC volts.
        </p>
        <Figure caption={<>Bench test for an IR receiver: supply on VS and GND, meter on OUT, remote aimed at the dome.</>}>
          <IrReceiverTestDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          With no remote, the output should sit near the supply voltage. Press and hold any button on a TV remote a
          short distance away. The output pulses low too quickly for the meter to follow, so you see the average
          fall, typically by several tenths of a volt or more depending on the remote&apos;s code, then recover when
          you let go. The readings below are illustrative.
        </p>
        <Figure caption={<>Illustrative readings on a 5 V-powered IR receiver: idle, and while a remote button is held.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="4.96" unit="V" mode="DC V  OUT to GND, idle" />
            <MeterReadout value="4.31" unit="V" mode="DC V  remote button held" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          No dip at all means the remote, the receiver or the carrier frequency is wrong: confirm the remote works
          with a phone camera first. To watch the actual pulse train, an oscilloscope set to trigger on a falling edge
          shows each burst; see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge" className={link}>
            how to trigger an oscilloscope on a falling edge
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="obstacle">Test an IR obstacle avoidance module</StepHeading>
        <p className="text-muted leading-7">
          Obstacle and line-follower modules pair an IR LED with a photodiode or phototransistor and a comparator,
          often an LM393, that switches a digital output. Power the module on VCC and GND, then measure DO to GND in
          DC volts. On most of these boards the output sits high with nothing in front and drops low, with an onboard
          LED lighting, when you hold your hand a few centimeters away; some are the other way round, so note the
          idle state first. If it never switches, turn the sensitivity trim pot slowly while holding your hand in
          place. A module that is always triggered is usually set too sensitive or facing a reflective surface. For
          board-level checks on microcontroller projects, our guide to{" "}
          <Link href="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter" className={link}>
            measuring an Arduino&apos;s current consumption
          </Link>{" "}
          helps confirm the sensor isn&apos;t overloading the supply.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="pir">Test a PIR motion sensor</StepHeading>
        <p className="text-muted leading-7">
          A PIR (passive infrared) sensor detects changes in body heat rather than reflected IR light, but people
          search for it as an IR sensor too. Power common HC-SR501 style modules within the supply range on their
          documentation, wait up to a minute for the sensor to settle, then measure OUT to GND. Per that common
          module&apos;s documentation, the output is about 3.3 V when motion is detected and near 0 V when idle. Wave a
          hand across the lens and watch the reading jump, then drop after the time-delay pot setting. A mode jumper
          selects single or repeat triggering, so check it if the output behaves unexpectedly.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="camera">Confirm the IR source with a phone camera</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many phone cameras pick up near-infrared light, often the front camera better than the rear one, which has a
          stronger IR filter. Point the remote or the module&apos;s IR LED at the camera and press a button: a working
          emitter shows as a flickering purple-white light on screen. It&apos;s the quickest way to tell whether the
          emitter or the receiver is at fault before you reach for the meter.
        </p>
        <Figure caption={<>Testing an IR sensor, in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "LED, receiver, module, PIR" },
              { label: "Bare part", sub: "Diode mode, power off" },
              { label: "Module", sub: "Power, DC V on output" },
              { label: "Trigger", sub: "Remote, hand or motion" },
              { label: "Confirm", sub: "Phone camera on emitter" },
            ]}
          />
        </Figure>
        <KeyIdea title="Bare parts in diode mode, modules on DC volts">
          A two-leg IR LED or photodiode is tested like any diode with the power off. A powered receiver or module is
          tested by watching its output voltage change when you trigger it. If the output moves, the sensor works.
        </KeyIdea>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Meters to use for IR sensor tests</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with diode test and a stable DC volts range handles these checks; a fast display update makes the
          receiver dip easier to see. See our{" "}
          <Link href="/multimeters/best-multimeters-for-arduino-and-circuit-board-testing" className={link}>
            best multimeters for Arduino and circuit board testing
          </Link>{" "}
          for more.
        </p>
        <ProductStrip
          title="Meters for hobby electronics and sensor checks"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget 6,000-count meter with diode test and continuity for bench and hobby sensor checks.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging, True RMS, backlit display for checking module outputs at a cluttered bench.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "Diode test, continuity beeper and a 400.0 mV range at 0.1 mV resolution for small voltage changes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
