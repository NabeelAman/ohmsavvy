import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const description =
  "How to test an ABS wheel speed sensor with a multimeter: passive sensor ohms and AC output, active sensor supply and current, and comparing all four wheels.";

export const metadata = buildMetadata({
  title: "How to Test an ABS Sensor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-abs-sensor-with-a-multimeter",
  image: fluke179.image,
});

const link = "text-accent hover:underline";

/** Passive and active wheel speed sensors over a tone ring, with the signal each one produces. */
function AbsSensorDiagram() {
  const teeth = Array.from({ length: 11 }, (_, i) => 30 + i * 14);
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Two kinds of ABS wheel speed sensor above a toothed tone ring. The passive sensor, a magnet and coil, produces an AC sine-like voltage whose size and frequency rise with wheel speed. The active sensor, a Hall or magnetoresistive chip powered by the ABS module, produces a square current signal that switches between a low and a high level at any speed, even very slow."
    >
      {/* tone ring */}
      <rect x="22" y="160" width="160" height="14" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      {teeth.map((x) => (
        <rect key={x} x={x} y="150" width="8" height="10" className="fill-foreground" />
      ))}
      <text x="102" y="190" fontSize="8" textAnchor="middle" className="fill-muted">tone ring (turns with the wheel)</text>
      {/* passive sensor */}
      <rect x="40" y="96" width="24" height="44" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="52" y="88" fontSize="8" textAnchor="middle" className="fill-foreground">passive</text>
      <path d="M44 106 H60 M44 114 H60 M44 122 H60 M44 130 H60" className="stroke-accent" strokeWidth="1" />
      {/* active sensor */}
      <rect x="132" y="96" width="24" height="44" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="144" y="88" fontSize="8" textAnchor="middle" className="fill-foreground">active</text>
      <rect x="138" y="124" width="12" height="10" className="fill-accent" opacity="0.6" />
      <text x="102" y="112" fontSize="8" textAnchor="middle" className="fill-muted">air gap</text>
      {/* passive signal */}
      <text x="200" y="28" fontSize="9" fontWeight="700" className="fill-foreground">Passive: AC voltage</text>
      <path d="M200 60 C210 36 220 36 230 60 S250 84 260 60 S280 36 290 60 S310 84 320 60 S340 36 350 60" className="stroke-accent" strokeWidth="1.8" fill="none" />
      <text x="200" y="92" fontSize="8" className="fill-muted">bigger and faster as speed rises</text>
      {/* active signal */}
      <text x="200" y="122" fontSize="9" fontWeight="700" className="fill-foreground">Active: current steps</text>
      <path d="M200 166 H220 V140 H240 V166 H260 V140 H280 V166 H300 V140 H320 V166 H340" className="stroke-accent" strokeWidth="1.8" fill="none" />
      <text x="344" y="144" fontSize="8" textAnchor="end" className="fill-muted">high</text>
      <text x="200" y="182" fontSize="8" className="fill-muted">low/high levels set by the sensor, at any speed</text>
    </svg>
  );
}

export default function HowToTestAnAbsSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an ABS Sensor With a Multimeter"
      description={description}
      published="2026-11-22"
      path="/multimeters/how-to-test-an-abs-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an ABS sensor with a multimeter, first find out whether it is passive or active. A passive two-wire
          sensor is a coil: unplug it, measure its resistance (commonly somewhere around 800 to 2,500 Ω, per the service
          manual), then spin the wheel by hand on the AC volts range and look for a voltage that rises with speed. An
          active sensor is electronic, so its resistance means nothing; instead you check for the supply voltage from
          the ABS module and, in series on the mA range, watch the current step between two levels as the wheel turns.
          In both cases the quickest verdict comes from comparing the suspect wheel with the same sensor on the other
          side of the car.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 multimeter for testing ABS wheel speed sensor resistance and output",
        caption: (
          <>
            ABS testing needs ohms, AC millivolts and a DC mA range. A backlit 6,000-count meter such as the Fluke 179
            covers all three. See our{" "}
            <Link href="/multimeters/fluke-179-review" className={link}>
              Fluke 179 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "types", label: "Passive vs active ABS sensors" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "identify", label: "1. Find the sensor and its type" },
        { id: "inspect", label: "2. Inspect sensor, wiring and ring" },
        { id: "passive-ohms", label: "3. Passive: measure resistance" },
        { id: "passive-ac", label: "4. Passive: spin and read AC" },
        { id: "active", label: "5. Active: supply and current" },
        { id: "compare", label: "6. Compare side to side" },
        { id: "spec-table", label: "ABS sensor test values" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should an ABS sensor read in ohms?",
          a: "Only passive two-wire sensors have a meaningful resistance. Many read somewhere between about 800 and 2,500 Ω, but values vary a lot between makes and between front and rear sensors on the same car, so the service manual figure is what counts. OL means an open coil or broken lead, and a reading near zero means a short. Active sensors don't give a useful ohms reading at all.",
        },
        {
          q: "How do I tell if my ABS sensor is active or passive?",
          a: "Check the service information for your vehicle first. As a rule of thumb, most cars from the mid-2000s onward use active sensors, and many active sensors have two wires just like passive ones, so wire count alone won't tell you. A key-on voltage on one harness pin, coming from the ABS module, points to an active sensor. A passive sensor's harness has no supply voltage.",
        },
        {
          q: "Can a bad ABS sensor cause the traction control light to come on?",
          a: "Yes. Traction and stability control use the same wheel speed signals as the ABS, so a faulty sensor, damaged wiring or a cracked tone ring usually turns on the ABS, traction and stability warning lights together, and may disable those systems. Some vehicles also use wheel speed for the speedometer, cruise control or transmission shifting, so those can misbehave too.",
        },
        {
          q: "Can I test an ABS sensor without removing it?",
          a: "Yes. All the meter tests here are done with the sensor installed, by unplugging its connector and measuring on the sensor side, or by back-probing the harness. Removing it is only needed to clean metal debris off the tip, inspect the tone ring, or replace it. Raise and support the car so the wheel can turn freely for the output tests.",
        },
        {
          q: "Why does my ABS sensor test good but the light stays on?",
          a: "The signal can fail between the sensor and the module. Check the harness for chafing where it flexes with the suspension, and test continuity from the sensor connector to the module connector. Also inspect the tone ring for cracks, rust swelling or missing teeth, and check wheel bearing play, since a loose bearing changes the air gap. A scan tool showing live wheel speeds pinpoints which wheel drops out.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-magnetic-pickup-sensor-with-a-multimeter",
          title: "How to Test a Magnetic Pickup Sensor",
          desc: "More depth on the coil-and-magnet sensors used for crank, cam and older wheel speed.",
        },
        {
          href: "/multimeters/how-to-test-a-hall-effect-sensor-with-a-multimeter",
          title: "How to Test a Hall Effect Sensor",
          desc: "The powered sensor principle behind many active wheel speed sensors.",
        },
      ]}
    >
      <Callout title="Lifting the car safely">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never work under a car held only by a jack. Use rated jack stands on solid ground, set the parking brake and
            chock the wheels that stay on the ground.
          </li>
          <li>
            Spin wheels by hand only, with the engine off. Running the engine in gear to turn a raised wheel is how
            people get hurt.
          </li>
          <li>
            The ABS hydraulic unit and module aren&apos;t DIY repairs. If the sensors and wiring test good and the
            warning light stays on, or the brake pedal feels wrong, have the brakes checked by a professional before
            driving.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="types" className="text-xl font-semibold mb-3">
          Passive vs active ABS wheel speed sensors
        </h2>
        <p className="text-muted leading-7 mb-4">
          Every wheel speed sensor reads a toothed tone ring, or a magnetic encoder ring built into the wheel bearing
          seal, that turns with the wheel. How the sensor turns that motion into a signal decides how you test it.
        </p>
        <p className="text-muted leading-7 mb-4">
          A <strong>passive</strong> sensor, also called variable reluctance or inductive, is a permanent magnet wrapped
          in a coil of fine wire. Each tooth passing the tip changes the magnetic field and induces an AC voltage in the
          coil. It needs no power, and its output grows with speed: a fraction of a volt when you turn the wheel by
          hand, several volts at road speed. At walking pace the signal can be too small to read, which is one reason
          carmakers moved away from them.
        </p>
        <p className="text-muted leading-7">
          An <strong>active</strong> sensor contains a Hall effect or magnetoresistive chip powered by the ABS module.
          Instead of generating a voltage, it switches its current draw between two fixed levels as each tooth or magnet
          pole passes. On many common designs those levels are roughly 7 mA and 14 mA, though your manual may list
          different figures. The square signal has the same height at any speed, so the module can see the wheel move
          at almost zero speed. Most modern cars use active sensors.
        </p>
        <Figure caption={<>Both sensor types read a tone ring; the passive one makes an AC voltage, the active one switches its current.</>}>
          <AbsSensorDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["ABS and traction lights on, one wheel code", "Failed sensor or broken lead", "Ohms (passive) or supply and current (active)", "Replace sensor or repair harness"],
            ["Light comes and goes over bumps", "Chafed harness, loose connector", "Wiggle test while watching the meter", "Repair wire, clean connector"],
            ["ABS activates at low speed when stopping", "Debris on sensor tip or cracked tone ring", "Inspect tip and ring (step 2)", "Clean tip; replace ring or hub"],
            ["Sensor tests good, signal weak", "Air gap too big, loose wheel bearing", "Compare AC output side to side", "Bearing or hub replacement"],
            ["All four wheel codes at once", "ABS module power, ground or fuse", "Module fuse and ground per manual", "Professional diagnosis"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="identify">Find the sensor and work out its type</StepHeading>
        <p className="text-muted leading-7">
          Read the fault code first if you can, since it tells you which wheel to test. Raise that corner and support it
          on a stand. The sensor is bolted to the knuckle or hub behind the brake rotor, with a cable running up to a
          connector in the wheel well or engine bay. Look up whether your vehicle uses passive or active sensors. If the
          information isn&apos;t handy, unplug the sensor, turn the key on (engine off), and measure DC volts between the
          two harness pins: a steady voltage from the module means active, nothing means passive. Turn the key off
          before going further.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inspect">Inspect the sensor, wiring and tone ring</StepHeading>
        <p className="text-muted leading-7">
          A quick look finds many ABS faults before the meter comes out. Follow the cable along its whole length; it
          flexes with every suspension movement and often chafes on brackets or gets cut during brake work. Check the
          connector for green corrosion or bent pins. Pull the sensor if it slides out easily and look at the tip:
          magnetized rust and brake dust stick to it and blur the signal, and a light clean often helps. With the wheel
          turning slowly, look for cracked, rusted or swollen teeth on the tone ring. A cracked ring causes a signal
          dropout once per revolution that no new sensor will fix.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="passive-ohms">Passive sensor: measure the coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the key off and the sensor unplugged, set the meter to ohms and measure across the two sensor pins. Compare
          the reading with the manual. Many passive sensors land somewhere around 800 to 2,500 Ω, and the matching sensor
          on the other side of the axle should read within a small margin of the suspect. Then measure from each pin to
          the sensor body or a clean chassis ground; that should read OL. Flex the cable near the sensor while watching
          the display, since broken strands often only open when the wire moves.
        </p>
        <Figure caption={<>Illustrative coil reading from a passive front sensor that is within its listed range.</>}>
          <MeterReadout value="1.18" unit="kΩ" mode="Ω  across sensor pins" />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="passive-ac">Passive sensor: spin the wheel and read AC volts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Good resistance proves the coil is intact, not that it produces a signal. Leave the sensor unplugged, set the
          meter to AC volts (mV if it has a separate range), and connect across the sensor pins. Spin the wheel by hand
          at a steady pace. A working sensor typically gives a few hundred millivolts AC at hand speed, and the reading
          should roughly double when you spin about twice as fast. Compare the same test on the opposite wheel; a sensor
          producing a fraction of its partner&apos;s output usually has debris on its tip, a too-large air gap or a
          weak magnet.
        </p>
        <Figure caption={<>Illustrative AC output from two passive front sensors at three hand-spin speeds. The weak sensor rises with speed but stays far below its partner.</>}>
          <BarChart
            items={[
              { label: "Good, slow spin", value: 0.18, display: "0.18 V AC" },
              { label: "Good, medium spin", value: 0.42, display: "0.42 V AC" },
              { label: "Good, fast spin", value: 0.85, display: "0.85 V AC" },
              { label: "Weak, slow spin", value: 0.04, display: "0.04 V AC", highlight: true },
              { label: "Weak, medium spin", value: 0.09, display: "0.09 V AC", highlight: true },
              { label: "Weak, fast spin", value: 0.17, display: "0.17 V AC", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The underlying physics is covered in our{" "}
          <Link href="/multimeters/how-to-test-a-magnetic-pickup-sensor-with-a-multimeter" className={link}>
            magnetic pickup sensor guide
          </Link>
          ; crank sensors on many engines use the same coil design and are tested the same way, as shown in{" "}
          <Link href="/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter" className={link}>
            how to test a crankshaft position sensor
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="active">Active sensor: check the supply, then the current</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Don&apos;t judge an active sensor with the ohms range; the reading depends on the chip inside and the meter&apos;s
          test voltage, and it proves nothing. Start with the supply: sensor unplugged, key on, measure DC volts across
          the two harness pins. It should be close to the value in the service manual, often near battery voltage or a
          regulated level from the module. No voltage means a wiring or module problem, not a sensor fault.
        </p>
        <p className="text-muted leading-7 mb-4">
          To see the signal, wire the meter in series. Key off, move the red lead to the mA jack, and connect the meter
          between the harness supply pin and the matching sensor pin (a pair of back-probe jumper leads makes this
          easier), with the other pin connected straight through. Turn the key on and rotate the wheel very slowly by
          hand. The current should step between a low and a high level, for example about 7 mA and 14 mA, as each tooth
          or pole passes. A current that sits fixed at one level while the wheel turns, or reads zero, points to a failed
          sensor, a damaged encoder ring or an air gap problem.
        </p>
        <KeyIdea title="Turn the wheel slowly">
          A digital display updates only a few times a second, so a fast spin averages the two current levels into one
          middle value. Turning the wheel a small amount at a time lets you watch it switch cleanly between low and
          high.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={6} id="compare">Compare side to side and confirm</StepHeading>
        <p className="text-muted leading-7">
          Wheel speed sensors come in pairs, so the best reference is the matching sensor on the same axle. Similar
          resistance and similar AC output (passive), or the same supply voltage and the same two current levels
          (active), on both sides mean the suspect sensor is fine and the fault is upstream. In that case test the
          harness for continuity from the sensor connector back to the ABS module connector, and check for shorts to
          ground, using the methods in{" "}
          <Link href="/multimeters/how-to-find-a-broken-wire-with-a-multimeter" className={link}>
            how to find a broken wire with a multimeter
          </Link>
          . After any repair, clear the codes and test-drive; many ABS systems only clear the warning light after
          they see all four wheels moving above a few miles per hour.
        </p>
      </section>

      <section>
        <h2 id="spec-table" className="text-xl font-semibold mb-3">
          ABS sensor test values at a glance
        </h2>
        <p className="text-muted leading-7 mb-4">
          Typical values for common passenger-car wheel speed sensors. They are general guidance; your vehicle&apos;s
          service information takes precedence, and comparing with the opposite wheel is often more useful than any
          printed number.
        </p>
        <DataTable
          head={["Test", "Passive (coil) sensor", "Active (Hall/MR) sensor"]}
          rows={[
            ["Resistance across pins", "About 800–2,500 Ω, varies by vehicle", "Not a valid test"],
            ["Pin to ground", "OL", "OL (harness side, key off)"],
            ["Supply, key on, unplugged", "None", "Voltage per manual, from module"],
            ["Output, wheel turned by hand", "AC mV, rising with speed", "Current steps, e.g. about 7 / 14 mA"],
            ["Works at very low speed", "Weak or no signal", "Yes, full-height signal"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for ABS sensor testing</h2>
        <p className="text-muted leading-7 mb-6">
          You need resistance into the kilohms, an AC voltage range that resolves tenths of a volt or better, and a DC mA
          range for active sensors. Back-probe pins and alligator-clip leads matter as much as the meter, since you&apos;ll
          be turning the wheel with one hand.
        </p>
        <ProductStrip
          title="Meters for ABS sensor testing"
          items={[
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "Backlit 6,000-count display with analog bar graph and Min/Max-Average recording; CAT IV 600V.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and 6,000 counts with auto or manual ranging, a good-value garage meter.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget auto-ranging True RMS meter for occasional sensor and wiring checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
