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
  "How to test an ebike controller with a multimeter: battery input, the 5 V throttle and hall supply, throttle signal voltage and a diode-mode MOSFET check.";

export const metadata = buildMetadata({
  title: "How to Test an Ebike Controller With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-ebike-controller-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke17b = picks.find((p) => p.name === "Fluke 17B+")!;

const link = "text-accent hover:underline";

/** Ebike controller connections: inputs on the left, motor phases on the right, with typical voltages at each. */
function ControllerDiagram() {
  const left = [
    { y: 34, name: "Battery in", wires: "B+ / B−", v: "36–58.8 V" },
    { y: 66, name: "Key / ignition", wires: "thin wire", v: "battery V" },
    { y: 98, name: "Throttle", wires: "red / black / signal", v: "5 V, 0.8–4.2 V" },
    { y: 130, name: "Hall sensors", wires: "5 V, GND, 3 signals", v: "0 V or 5 V" },
    { y: 162, name: "Brake cutoff", wires: "switch pair", v: "open = run" },
  ];
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Ebike controller wiring for testing with a multimeter: battery input, key wire, three-wire throttle with a 5 volt supply and a 0.8 to 4.2 volt signal, five-wire hall harness, and brake cutoff on the input side; three thick phase wires to the hub motor on the output side."
    >
      <rect x="140" y="20" width="90" height="160" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="185" y="95" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">controller</text>
      <text x="185" y="110" fontSize="8" textAnchor="middle" className="fill-muted">MOSFET bridge</text>
      {left.map((c) => (
        <g key={c.name}>
          <line x1="88" y1={c.y} x2="140" y2={c.y} strokeWidth="1.6" className="stroke-foreground" />
          <circle cx="88" cy={c.y} r="3" className="fill-accent" />
          <text x="82" y={c.y - 3} fontSize="8.5" fontWeight="700" textAnchor="end" className="fill-foreground">{c.name}</text>
          <text x="82" y={c.y + 8} fontSize="7" textAnchor="end" className="fill-muted">{c.wires}</text>
          <text x="145" y={c.y + 3} fontSize="7" className="fill-accent">{c.v}</text>
        </g>
      ))}
      {[
        { y: 70, n: "U (yellow)" },
        { y: 100, n: "V (green)" },
        { y: 130, n: "W (blue)" },
      ].map((p) => (
        <g key={p.n}>
          <line x1="230" y1={p.y} x2="285" y2={p.y} strokeWidth="3" className="stroke-foreground" />
          <text x="290" y={p.y + 3} fontSize="8" className="fill-foreground">{p.n}</text>
        </g>
      ))}
      <text x="285" y="155" fontSize="8" textAnchor="middle" className="fill-muted">phases to motor</text>
      <text x="285" y="52" fontSize="8" textAnchor="middle" className="fill-muted">output side</text>
    </svg>
  );
}

export default function HowToTestAnEbikeControllerWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an Ebike Controller With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-an-ebike-controller-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an ebike controller, confirm battery voltage reaches its input, check the 5 V supply it
          sends to the throttle and hall sensors, watch the throttle signal rise from about 0.8 V to about
          4.2 V, and then use diode mode on the three phase wires to look for a shorted MOSFET. If the inputs
          are all correct and the motor still won&apos;t run, the controller is the likely fault. Each check
          takes a DC volts or diode reading at the connectors, so you rarely need to open the case.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 is True RMS with a 6,000-count display, which helps when comparing the three phase
            outputs. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-it-does", label: "What the controller does" },
        { id: "battery-input", label: "Battery input and key wire" },
        { id: "five-volt-supply", label: "5 V throttle and hall supply" },
        { id: "throttle-signal", label: "Throttle signal voltage" },
        { id: "brake-cutoff", label: "Brake cutoff switches" },
        { id: "hall-inputs", label: "Hall signals at the controller" },
        { id: "mosfet-check", label: "Phase output and MOSFET check" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What are the signs of a bad ebike controller?",
          a: "The display lights but the motor never turns, the motor stutters or cogs even with good hall readings, the controller gets very hot or smells burnt, or power cuts in and out with a healthy battery. A burned-in smell plus a diode-mode reading near 0 V on a phase wire almost always means a failed MOSFET and a replacement controller.",
        },
        {
          q: "What voltage should an ebike throttle read?",
          a: "Most hall-effect thumb and twist throttles get a 5 V supply from the controller and return a signal of roughly 0.8 V at rest, rising to about 4.2 V at full throttle. The exact figures vary by make. Many controllers ignore anything under about 1 V and will not start the motor if they see the throttle open when the system powers up.",
        },
        {
          q: "Can a bad throttle make an ebike run on its own?",
          a: "Yes. If the throttle ground wire breaks or its connector works loose, the signal line can float up toward the supply voltage, and the controller reads that as full throttle. Lift the wheel, switch off, and check continuity on the throttle ground before riding again. A controller with a shorted MOSFET can also lurch, though it more often locks or drags the motor.",
        },
        {
          q: "Can I test an ebike controller without the motor?",
          a: "Partly. With the battery connected and the motor unplugged you can still measure battery input, the 5 V supply, the throttle signal and the brake cutoff. With the battery disconnected, the diode-mode check on the three phase wires finds shorted output transistors. What you cannot see without a motor is whether the controller drives all three phases correctly under load.",
        },
        {
          q: "Will a universal controller work on my ebike?",
          a: "Often, on hub-motor kits with standard throttle and hall connectors, if the voltage rating covers your battery and the current limit suits the motor. Integrated mid-drive systems from brands such as Bosch, Shimano and Yamaha use proprietary electronics and dealer software, so a multimeter can do little beyond checking battery and charger voltage. Those go back to the dealer.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-ebike-hub-motor-with-a-multimeter",
          title: "How to Test an Electric Bike Hub Motor",
          desc: "Phase resistance balance, phase-to-shell shorts, hall toggling and the spin test.",
        },
        {
          href: "/multimeters/how-to-test-an-ebike-battery-with-a-multimeter",
          title: "How to Test an Ebike Battery With a Multimeter",
          desc: "Full and empty voltages for 36, 48 and 52 V packs, plus a voltage sag load test.",
        },
        {
          href: "/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter",
          title: "How to Test a Hall Effect Sensor",
          desc: "Digital and linear Hall sensors on the bench, with a magnet and DC volts.",
        },
      ]}
    >
      <Callout title="Before you probe the controller">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Put the bike on a stand with the driven wheel off the ground for every powered test. A controller
            fault or a stuck throttle can spin the motor without warning.
          </li>
          <li>
            The battery side of the controller sits at full pack voltage, up to about 58.8 V on a 52 V system,
            and the pack can supply hundreds of amps into a short. Use shrouded probes and never let a probe
            bridge two pins.
          </li>
          <li>
            The controller&apos;s input capacitors stay charged for a while after the battery is unplugged.
            Wait, then confirm under 1 V DC across B+ and B− before any diode or resistance test.
          </li>
          <li>
            A controller that smells burnt, has melted connectors or got too hot to touch should not be powered
            again. Replace it, and check the motor before fitting the new one.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-it-does" className="text-xl font-semibold mb-3">What an ebike controller does</h2>
        <p className="text-muted leading-7 mb-4">
          A hub-motor controller is a three-phase motor drive. It takes battery DC, reads the throttle (and the
          pedal sensor and brake switches), reads the three hall sensors in the motor to know where the rotor
          is, and switches six MOSFETs to push current through the motor&apos;s three phase windings in the
          right order. When something stops the motor, the fault is in one of four places: the power coming
          in, the signals coming in, the transistors inside, or the motor itself. A multimeter can separate
          those in about twenty minutes.
        </p>
        <Figure caption={<>Typical controller connections and the readings to expect. Wire colors vary by maker, so confirm against your wiring diagram.</>}>
          <ControllerDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="battery-input">Check battery voltage at the controller input and key wire</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the pack switched on, set the meter to DC volts and back-probe the thick red and black wires at
          the controller&apos;s battery connector. You should see the same voltage you measure at the pack
          terminals, within a few tenths of a volt. A difference of a volt or more at rest points to a bad
          connector, a corroded Anderson plug or a fuse holder heating up. Zero means a blown fuse, a pack
          switched off or a BMS cutoff; our guide to{" "}
          <Link href="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter" className={link}>
            testing an ebike battery
          </Link>{" "}
          covers that side.
        </p>
        <p className="text-muted leading-7">
          Many controllers also have a thin key or ignition wire that must see battery voltage before the
          controller wakes up. Measure it from that wire to B− with the display or key switched on. No voltage
          here gives you a dead bike with a perfectly good controller, and the fault is in the display, key
          switch or harness. A fused key line is common, so{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            test the fuse
          </Link>{" "}
          before blaming anything else.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="five-volt-supply">Measure the 5 V throttle and hall supply</StepHeading>
        <p className="text-muted leading-7">
          The controller makes a regulated low-voltage rail, usually 5 V, for the throttle and the hall
          sensors. Back-probe the throttle connector between the red (supply) and black (ground) wires with
          the system on. Expect roughly 4.3 to 5.0 V. Do the same on the red and black of the hall connector.
          If both read zero, the controller&apos;s regulator has failed or a shorted sensor is pulling the rail
          down. Unplug the throttle and hall connectors one at a time: if the 5 V comes back when one is
          unplugged, that device is shorted, not the controller.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="throttle-signal">Watch the throttle signal voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Keep the black probe on throttle ground and move the red to the signal wire (often green or white).
          With the wheel off the ground, roll the throttle slowly from closed to fully open. A hall-effect
          throttle typically reads about 0.8 V closed and climbs smoothly to about 4.2 V fully open. The
          numbers vary by maker, so the smoothness matters as much as the end points. A reading that jumps,
          sticks or drops to zero partway through the travel means a worn throttle or a broken wire in the bar
          cable.
        </p>
        <Figure caption={<>Typical hall throttle signal against the 5 V supply. Values are typical, not a specification for any one product.</>}>
          <BarChart
            items={[
              { label: "Closed (idle)", value: 0.8, display: "≈0.8 V" },
              { label: "Half open", value: 2.5, display: "≈2.5 V" },
              { label: "Fully open", value: 4.2, display: "≈4.2 V", highlight: true },
              { label: "Supply rail", value: 5, display: "≈5.0 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          If the signal sweeps correctly but the motor never moves, the throttle is fine and the problem is
          downstream. If it sits at 4 V or more with the throttle closed, the controller may refuse to start
          as a safety measure, and some controllers show a throttle error code on the display.
        </p>
        <Figure caption={<>Illustrative throttle signal readings: closed, then fully open.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.84" unit="V DC" mode="THROTTLE  closed" />
            <MeterReadout value="4.17" unit="V DC" mode="THROTTLE  full" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="brake-cutoff">Test the brake cutoff switches</StepHeading>
        <p className="text-muted leading-7">
          Most controllers kill motor power when a brake lever sensor closes. A sticky lever, a misadjusted
          magnet sensor or a pinched cable can hold the cutoff on permanently, and the result looks exactly
          like a dead controller. Unplug each brake sensor and try the throttle. If the motor runs with the
          sensors unplugged, a sensor is the fault. Mechanical switch types can be checked with{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            continuity mode
          </Link>
          : open with the lever released, closed with it pulled.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="hall-inputs">Check the hall signals at the controller</StepHeading>
        <p className="text-muted leading-7">
          Leave the hall connector plugged in and back-probe each of the three signal wires against hall
          ground with the system on. Turn the wheel slowly by hand. Each signal should switch cleanly between
          close to 0 V and close to 5 V several times per wheel turn. If all three toggle, the motor&apos;s
          sensors and the controller&apos;s hall inputs are both working. One that stays stuck is a motor-side
          problem in most cases, covered step by step in{" "}
          <Link href="/multimeters/how-to-test-an-ebike-hub-motor-with-a-multimeter" className={link}>
            how to test an electric bike hub motor
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="mosfet-check">Check the phase outputs and MOSFETs in diode mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the test that condemns a controller. Unplug the battery, wait, and confirm under 1 V across
          B+ and B−. Unplug the three phase wires from the motor. Set the meter to diode mode. Each phase is
          driven by two MOSFETs, one to B+ and one to B−, and each MOSFET has a built-in body diode you can
          read like any{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            ordinary diode
          </Link>
          .
        </p>
        <DataTable
          head={["Red probe", "Black probe", "Good controller", "Failed MOSFET"]}
          rows={[
            ["B− (battery negative)", "Each phase", "≈0.3–0.6 V, all three similar", "≈0 V (shorted) or OL on one phase"],
            ["Each phase", "B+ (battery positive)", "≈0.3–0.6 V, all three similar", "≈0 V (shorted) or OL on one phase"],
            ["Each phase", "B−", "OL, or slowly rising as caps charge", "Low fixed reading"],
            ["Phase to phase", "Phase to phase", "OL or slowly rising", "≈0 V between two phases"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          The exact forward reading depends on the MOSFETs, so compare phases with each other rather than
          chasing a number. A phase that reads near 0 V in both directions has a shorted transistor. A shorted
          MOSFET also makes the motor hard to turn when it is connected, even with the power off, because it
          shorts two windings together.
        </p>
        <p className="text-muted leading-7 mb-4">
          A powered output check is possible but less conclusive. With the motor connected and the wheel in
          the air, each phase wire switches with PWM, so a DC volts reading against B− is an average that
          depends on the meter. Compare the three phases with each other at the same throttle: they should
          read alike. One stuck at 0 V or at full battery voltage while the other two vary confirms a dead
          output stage.
        </p>
        <Figure caption={<>The order of tests that isolates a controller fault.</>}>
          <FlowDiagram
            steps={[
              { label: "Battery in", sub: "Pack V at B+ / B−" },
              { label: "Key wire", sub: "Battery V when on" },
              { label: "5 V rail", sub: "Throttle and hall" },
              { label: "Signals", sub: "Throttle, brakes, halls" },
              { label: "MOSFETs", sub: "Diode mode, power off" },
            ]}
          />
        </Figure>
        <KeyIdea title="Rule out the cheap parts first">
          A controller is guilty only once its inputs are proven good. Brake sensors, a throttle with a broken
          ground and a key wire with a blown fuse cause more &quot;dead controller&quot; calls than failed
          MOSFETs do, and each costs a fraction of a new controller.
        </KeyIdea>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Ebike controller symptoms, causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Display dead, no power", "Battery off, fuse, key wire", "Battery V at input; key wire V", "Replace fuse, repair harness or display"],
            ["Display on, motor never runs", "Brake cutoff stuck, throttle fault", "Unplug brake sensors; sweep throttle signal", "Replace sensor or throttle"],
            ["Motor stutters or cogs", "Hall sensor or a phase connection", "Hall toggle test; phase diode check", "Repair plug or wiring; see motor guide"],
            ["Motor hard to turn by hand, power off", "Shorted MOSFET", "Diode mode near 0 V on a phase", "Replace controller"],
            ["Runs by itself", "Throttle ground broken, signal floating", "Throttle signal high when closed", "Stop riding; repair throttle wiring"],
            ["Cuts out on hills", "Battery sag hits low-voltage cutoff", "MIN volts at input under load", "Battery test; pack may be worn"],
            ["Integrated mid-drive fault code", "Proprietary system", "Read the code on the display", "Brand dealer with diagnostic software"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on an ebike controller</h2>
        <p className="text-muted leading-7 mb-4">
          You need DC volts to 60 V, a diode mode and continuity, which every meter below has. True RMS helps
          a little when comparing PWM phase outputs, and frequency or duty-cycle modes let you read the hall
          switching rate. A thin set of back-probe pins matters more than the meter, because the controller
          connectors are small and tightly packed. If you are also chasing faults on a motorcycle or scooter
          harness, our{" "}
          <Link href="/multimeters/best-multimeters-for-motorcycle-electrical-problems" className={link}>
            best multimeters for motorcycle electrical problems
          </Link>{" "}
          guide covers similar work.
        </p>
        <ProductStrip
          title="Meters for controller diagnosis"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display, with capacitance and frequency.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget True RMS with a 6,000-count display and auto or manual ranging.",
            },
            {
              name: "Fluke 17B+",
              image: fluke17b.image,
              alt: "Fluke 17B+ digital multimeter",
              href: "/multimeters/fluke-17b-plus-review",
              note: "Frequency to 100 kHz and duty cycle for hall signals, plus MIN MAX. Not True RMS.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
