import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a magnetic pickup sensor with a multimeter: coil resistance, insulation to ground and AC output on two-wire crank, cam, ABS and speed sensors.";

export const metadata = buildMetadata({
  title: "Test a Magnetic Pickup Sensor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-magnetic-pickup-sensor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToTestAMagneticPickupSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Magnetic Pickup Sensor With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-magnetic-pickup-sensor-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A magnetic pickup, also called a variable reluctance or VR sensor, is a permanent magnet wrapped in
          a coil of fine wire. When the teeth of a steel wheel pass its tip, the changing magnetic field
          induces a small AC voltage in the coil, with no power supply needed. That makes it straightforward
          to test a magnetic pickup sensor with a multimeter: check the coil&apos;s resistance, check that it
          isn&apos;t leaking to ground, then watch for AC millivolts while the wheel turns.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter",
        caption: (
          <>
            A resistance range and an AC volts range are all these checks use. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a VR sensor makes a signal" },
        { id: "vr-vs-hall", label: "Two-wire VR vs three-wire Hall" },
        { id: "coil-resistance", label: "1. Measure coil resistance" },
        { id: "insulation", label: "2. Check insulation to ground" },
        { id: "ac-output", label: "3. Read AC output while turning" },
        { id: "air-gap", label: "4. Inspect the air gap and tip" },
        { id: "diagnosis", label: "Reading the results" },
      ]}
      faq={[
        {
          q: "What resistance should a crankshaft position sensor have?",
          a: "For two-wire magnetic crank sensors, coil resistance commonly falls somewhere between a few hundred ohms and around 1,500 ohms, but the figure varies a lot between manufacturers and models. Use the value in the vehicle's service information. Three-wire Hall-effect crank sensors don't have a meaningful coil resistance to measure at all.",
        },
        {
          q: "Why does my VR sensor read correct resistance but the engine won't start?",
          a: "Resistance proves only that the coil is intact. The sensor can still produce too little signal if the tip is covered in metal debris, the air gap is too large, the magnet has weakened, or the toothed wheel is damaged. The wiring and connector between sensor and ECU are also common failure points, so repeat the tests at the ECU end of the harness.",
        },
        {
          q: "Does the AC voltage from a magnetic pickup depend on speed?",
          a: "Yes. The induced voltage rises with how fast the teeth pass the tip, so output at cranking speed is much lower than at road speed. That's also why a VR sensor's signal can be too weak to read at very low speed, and why some controllers struggle to see it when the battery is weak and cranking is slow.",
        },
        {
          q: "Does polarity matter when reconnecting a two-wire VR sensor?",
          a: "It can. Reversing the two wires inverts the waveform, and some engine and ABS controllers trigger on a particular edge, which shifts the detected timing or causes errors. Keep the original connector orientation and, if the wiring has been repaired, check it against the wiring diagram.",
        },
        {
          q: "Can I test a guitar pickup the same way?",
          a: "The principle is the same: a magnet and a coil, with the strings changing the field instead of a toothed wheel. A DC resistance check across the output shows whether the coil is intact, and typical single-coil and humbucker pickups measure in the kilohm range. An open reading usually means a broken coil wire or a bad solder joint.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "Find bad grounds and connectors in the same harness.",
        },
        {
          href: "/multimeters/best-multimeter-for-automotive",
          title: "Best Multimeter for Automotive",
          desc: "Meters suited to sensor, charging and battery work.",
        },
      ]}
    >
      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a VR sensor makes a signal</h2>
        <p className="text-muted leading-7 mb-4">
          You will find passive magnetic pickups as crankshaft and camshaft position sensors on many engines,
          as wheel speed sensors on older ABS systems, on transmission input and output shafts, and as speed
          pickups on industrial machinery. Each tooth that approaches the tip concentrates the magnetic flux
          through the coil, and each gap lets it relax. The coil turns that change into a voltage swing, positive
          as a tooth approaches and negative as it leaves.
        </p>
        <Figure
          caption={
            <>
              A tooth passing the sensor tip changes the flux through the coil and induces an AC voltage. A
              missing tooth, used as a reference mark on many crank wheels, creates a longer gap in the waveform.
            </>
          }
        >
          <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label="Cross-section of a variable reluctance sensor with magnet and coil above a toothed reluctor wheel, with the resulting AC waveform">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="60" y="14" width="40" height="58" rx="3" />
              <rect x="70" y="20" width="20" height="46" className="fill-accent/30 stroke-accent" />
              <path d="M60 30 H52 M60 40 H52 M60 50 H52 M60 60 H52 M100 30 H108 M100 40 H108 M100 50 H108 M100 60 H108" />
              <path d="M70 14 V4 M90 14 V4" />
              <path d="M10 104 H30 V88 H50 V104 H70 V88 H90 V104 H110 V88 H130 V104 H170" />
              <path d="M190 100 q8 -40 16 0 q8 40 16 0 q8 -40 16 0 q8 40 16 0 q8 -40 16 0 q8 40 16 0" className="stroke-accent" />
              <line x1="185" y1="100" x2="310" y2="100" className="stroke-muted" strokeDasharray="3 3" />
            </g>
            <text x="80" y="84" fontSize="9" textAnchor="middle" className="fill-muted">air gap</text>
            <text x="118" y="44" fontSize="9" className="fill-foreground">coil</text>
            <text x="80" y="128" fontSize="10" textAnchor="middle" className="fill-foreground">toothed wheel</text>
            <text x="148" y="98" fontSize="9" textAnchor="middle" className="fill-muted">gap</text>
            <text x="250" y="140" fontSize="10" textAnchor="middle" className="fill-accent">AC output</text>
            <text x="250" y="155" fontSize="9" textAnchor="middle" className="fill-muted">grows with speed</text>
            <text x="80" y="160" fontSize="9" textAnchor="middle" className="fill-muted">two wires, no supply</text>
          </svg>
        </Figure>
      </section>

      <section id="vr-vs-hall">
        <KeyIdea title="Two-wire VR vs three-wire Hall-effect sensors">
          Before testing, confirm which kind you have. A passive VR sensor usually has two wires (sometimes a
          third for a cable shield) and makes its own AC signal. A Hall-effect sensor has three wires, a
          supply, a ground and a signal, contains electronics, and switches between two DC levels as teeth
          pass. Measuring resistance across a Hall sensor&apos;s pins tells you nothing useful and the tests
          below don&apos;t apply to it. Some newer ABS wheel sensors are active two-wire designs that signal by
          changing their current draw; the service information will say which type a vehicle uses.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="coil-resistance">Measure coil resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Ignition off, unplug the sensor connector, and measure across the two sensor pins with the meter on
          resistance. Compare the result with the specification for that exact part. Readings are temperature
          sensitive, since copper resistance rises as it warms, so a hot engine reads a little higher than a
          cold one; manuals often quote a value at room temperature.
        </p>
        <BarChart
          items={[
            { label: "Many crank/cam VR sensors", value: 900, display: "~200–1,500 Ω", highlight: true },
            { label: "Many passive ABS sensors", value: 1300, display: "~800–2,000 Ω" },
            { label: "Typical guitar pickup", value: 8000, display: "~5–16 kΩ" },
          ]}
          log
        />
        <p className="text-muted leading-7 mt-4">
          These ranges are typical spreads seen across common parts, not a pass mark for any specific sensor.
          OL means the coil or its lead is broken. A reading far below the specified value suggests shorted
          turns inside the coil.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="insulation">Check insulation to ground</StepHeading>
        <p className="text-muted leading-7">
          Keep one probe on a sensor pin and touch the other to the sensor body or a clean engine ground. Repeat
          for the second pin. Both should read OL. Any finite resistance means the coil insulation has broken
          down or water has got into the sensor, and the signal will be loaded down or noisy. If the sensor
          passes on its own but faults return when plugged in, do the same continuity and ground checks on the
          harness, back to the ECU or ABS module connector.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="ac-output">Read AC output while the wheel turns</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to AC volts on its lowest range, or AC millivolts if it has one, and connect across the
          two sensor pins. For a crank or cam sensor, back-probe the connector with it plugged in, or connect
          to the unplugged sensor, disable fuel or ignition per the service manual so the engine can&apos;t
          start, and have a helper crank it. For an ABS sensor, lift the wheel and spin it by hand. You are
          looking for a steady AC reading while the wheel moves and zero when it stops.
        </p>
        <Figure
          caption={
            <>
              A crank sensor producing about 0.68 VAC while cranking. Typical cranking output is in the
              hundreds of millivolts to a few volts; the service manual gives the minimum for your engine.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.68" unit="VAC" mode="V~  crank sensor, cranking" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A multimeter shows only an averaged AC figure and its AC range has limited frequency response, so it
          can tell you a signal is present but not whether every tooth is there. To see a damaged tooth, a
          missing-tooth reference or a waveform that drops out intermittently, an oscilloscope is the right
          tool.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="air-gap">Inspect the air gap and the sensor tip</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A sensor that measures perfectly but makes a weak signal is often fine electrically. Pull it and look
          at the tip: the magnet attracts steel particles and brake dust, which bridge the gap and smear the
          signal. Wipe it clean. Check the tip for rubbing marks, which mean the gap has closed, and inspect the
          tone ring or reluctor for cracked, rusty or missing teeth.
        </p>
        <Figure
          caption={
            <>
              Signal amplitude falls quickly as the air gap grows. Fixed-position sensors set the gap by their
              mounting; adjustable ones are set with a non-magnetic feeler gauge to the manual&apos;s figure.
            </>
          }
        >
          <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="Comparison of a VR sensor with a correct small air gap giving a large signal and a sensor with an excessive air gap giving a small signal">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="50" y="20" width="30" height="40" rx="3" />
              <path d="M20 74 H40 V64 H90 V74 H110" />
              <rect x="210" y="10" width="30" height="40" rx="3" />
              <path d="M180 74 H200 V64 H250 V74 H270" />
              <path d="M30 115 q10 -30 20 0 q10 30 20 0 q10 -30 20 0" className="stroke-accent" strokeWidth="2" />
              <path d="M195 115 q10 -10 20 0 q10 10 20 0 q10 -10 20 0" className="stroke-accent" strokeWidth="2" />
            </g>
            <text x="65" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">correct gap</text>
            <text x="225" y="140" fontSize="10" textAnchor="middle" className="fill-foreground">gap too wide</text>
            <text x="100" y="62" fontSize="9" className="fill-muted">small</text>
            <text x="252" y="58" fontSize="9" className="fill-muted">large</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["What you find", "Likely cause"]}
          rows={[
            ["Resistance in spec, OL to ground, AC output when turning", "Sensor healthy; check harness, connector and ECU input"],
            ["OL across the two pins", "Broken coil winding or lead; replace the sensor"],
            ["Resistance well below spec", "Shorted turns in the coil"],
            ["Any reading from a pin to the body", "Insulation breakdown or water ingress"],
            ["Good resistance, little or no AC output", "Debris on the tip, excessive gap, weak magnet or damaged wheel"],
            ["Output fine on the sensor, missing at the ECU", "Open, shorted or chafed wiring between them"],
            ["Three wires, no meaningful resistance", "Hall-effect sensor; needs a powered test instead"],
          ]}
        />
        <Callout title="Stay clear of moving parts while cranking">
          Keep hands, hair, loose clothing and meter leads away from belts, pulleys and the cooling fan, which
          can start without warning on some cars. Route the leads before cranking, and disable fuel or ignition
          as the manual describes so the engine can&apos;t start while you are leaning over it. For wiring
          faults between the sensor and the controller, our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            OL explainer
          </Link>{" "}
          helps interpret open readings along the harness.
        </Callout>
      </section>
    </HowToShell>
  );
}
