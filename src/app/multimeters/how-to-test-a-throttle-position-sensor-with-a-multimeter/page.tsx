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
  "Test a 3-wire throttle position sensor with a multimeter: 5 V reference, ground, a smooth signal sweep from idle to wide open, and the P0121 to P0123 codes.";

export const metadata = buildMetadata({
  title: "How to Test a Throttle Position Sensor",
  description,
  path: "/multimeters/how-to-test-a-throttle-position-sensor-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Potentiometer TPS: 5 V across the track, wiper on the throttle shaft gives the signal. */
function TpsDiagram() {
  return (
    <svg
      viewBox="0 0 380 220"
      className="w-full h-auto"
      role="img"
      aria-label="Three-wire throttle position sensor. The engine computer puts 5 volts across a resistive track inside the sensor, with the other end on sensor ground. A wiper attached to the throttle shaft slides along the track. At closed throttle the wiper sits near the ground end and the signal is low, under about 1 volt. At wide-open throttle it sits near the 5 volt end and the signal is high, around 4 to 4.5 volts."
    >
      {/* track */}
      <rect x="60" y="96" width="260" height="22" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="190" y="138" fontSize="9" textAnchor="middle" className="fill-muted">resistive track</text>
      {/* ends */}
      <line x1="60" y1="107" x2="30" y2="107" className="stroke-foreground" strokeWidth="2" />
      <line x1="30" y1="107" x2="30" y2="186" className="stroke-foreground" strokeWidth="2" />
      <line x1="20" y1="186" x2="40" y2="186" className="stroke-foreground" strokeWidth="2" />
      <text x="46" y="190" fontSize="10" className="fill-foreground" fontWeight="700">sensor ground</text>
      <line x1="320" y1="107" x2="350" y2="107" className="stroke-accent" strokeWidth="2" />
      <line x1="350" y1="107" x2="350" y2="186" className="stroke-accent" strokeWidth="2" />
      <text x="344" y="204" fontSize="10" textAnchor="end" className="fill-accent" fontWeight="700">5 V reference</text>
      {/* wiper */}
      <polygon points="110,92 102,74 118,74" className="fill-accent" />
      <line x1="110" y1="74" x2="110" y2="40" className="stroke-accent" strokeWidth="2.5" />
      <line x1="110" y1="40" x2="190" y2="40" className="stroke-accent" strokeWidth="2.5" />
      <text x="196" y="44" fontSize="10" className="fill-accent" fontWeight="700">signal to computer</text>
      <text x="110" y="64" fontSize="8" textAnchor="middle" className="fill-muted">wiper</text>
      {/* labels */}
      <text x="80" y="160" fontSize="9" className="fill-muted">closed throttle:</text>
      <text x="80" y="171" fontSize="9" className="fill-muted">low volts</text>
      <text x="240" y="160" fontSize="9" className="fill-muted">wide open:</text>
      <text x="240" y="171" fontSize="9" className="fill-muted">high volts</text>
      <path d="M140 84 L 290 84" className="stroke-muted" strokeWidth="1.2" strokeDasharray="4 3" />
      <polygon points="290,80 300,84 290,88" className="fill-muted" />
    </svg>
  );
}

export default function HowToTestAThrottlePositionSensorPage() {
  return (
    <HowToShell
      title="How to Test a Throttle Position Sensor With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-a-throttle-position-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a throttle position sensor (TPS) with a multimeter, confirm about 5 V on the reference wire and a
          clean ground with the key on, then back-probe the signal wire and slowly open the throttle: the voltage
          should rise smoothly from typically under 1 V at closed throttle to around 4 to 4.5 V at wide open, with no
          drops or jumps. A sweep with a dead spot is the classic sign of a worn sensor track. This guide covers the
          common three-wire potentiometer TPS on cable-throttle engines, with notes on the dual-sensor units in
          electronic throttle bodies, and what the readings mean for each trouble code.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter with analog bar graph",
        caption: (
          <>
            A fast analog bar graph, such as the Fluke 87V&apos;s, shows a TPS dropout the digits can miss. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a TPS works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "identify-wires", label: "1. Identify the three wires" },
        { id: "reference", label: "2. Check the 5 V reference" },
        { id: "ground", label: "3. Check the ground" },
        { id: "closed", label: "4. Read the closed-throttle signal" },
        { id: "sweep", label: "5. Sweep the throttle slowly" },
        { id: "resistance", label: "6. Optional resistance check" },
        { id: "chart", label: "Expected signal through the sweep" },
        { id: "electronic", label: "Electronic throttle bodies" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a throttle position sensor read?",
          a: "On most three-wire sensors, the reference wire carries about 5 V, the ground reads near 0 V, and the signal sits typically between about 0.5 and 1 V at closed throttle, rising smoothly to around 4 to 4.5 V at wide open. The exact closed-throttle figure varies by maker, so compare against the service manual for your vehicle.",
        },
        {
          q: "Can you test a throttle position sensor without a scan tool?",
          a: "Yes. A multimeter on DC volts, back-probed on the signal wire with the key on and engine off, shows the sensor's output directly. Open the throttle slowly by hand and watch for a smooth rise. A scan tool adds the computer's view of the percentage, which helps on electronic throttle bodies, but the meter alone finds most worn sensors.",
        },
        {
          q: "What are the symptoms of a bad throttle position sensor?",
          a: "Hesitation or stumbling when you press the pedal, surging at steady speed, a high or hunting idle, harsh or erratic automatic shifts, and a check engine light with codes in the P0120 to P0124 range. Electronic throttle cars may go into reduced-power limp mode. Many of these symptoms overlap with vacuum leaks, so test before replacing.",
        },
        {
          q: "Do you test a TPS with the engine running?",
          a: "No, the standard test is key on, engine off. That lets you open the throttle by hand through its full range safely, and the 5 V reference is live without the engine turning. On drive-by-wire throttle bodies, don't push the throttle plate open by hand; use the accelerator pedal with the key on, as the maker's procedure describes.",
        },
        {
          q: "Can a TPS read correctly at idle and still be bad?",
          a: "Yes, and it is the most common failure. The wiper wears a groove in the track at the positions it spends most time, just off idle and at cruise. The closed and wide-open readings can look perfect while the signal drops out over a small part of the sweep. That is why a slow sweep with a bar graph matters more than the endpoint numbers.",
        },
        {
          q: "Does a new throttle position sensor need to be adjusted?",
          a: "Some older sensors with slotted mounting holes must be set to a specified closed-throttle voltage before tightening the screws. Many later sensors are fixed, and the computer learns the closed position on its own. Electronic throttle bodies often need a relearn procedure. Check the service information for your vehicle before installing a replacement.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter",
          title: "How to Check a Potentiometer Wiper",
          desc: "The same track-and-wiper test, explained on a bench potentiometer.",
        },
        {
          href: "/multimeters/how-to-test-a-crankshaft-position-sensor-with-a-multimeter",
          title: "How to Test a Crankshaft Position Sensor",
          desc: "Magnetic and Hall-effect crank sensors, resistance and AC volts.",
        },
      ]}
    >
      <Callout title="Work safely around the throttle body">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Do the tests with the engine off and the key on. Keep fingers out of the throttle bore, and on electronic
            throttle bodies never hold the plate open by hand with the key on: the motor can snap it closed.
          </li>
          <li>
            Back-probe from the rear of the connector with thin pins, and don&apos;t pierce the wire insulation, which
            invites corrosion inside the harness.
          </li>
          <li>
            Never short the 5 V reference to ground with a probe. On many vehicles the same reference feeds several
            sensors, and a short can set multiple codes or affect how the engine runs.
          </li>
          <li>
            If the car goes into limp mode or the throttle sticks open while driving, get it safely off the road and
            have it towed rather than driving on.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a throttle position sensor works</h2>
        <p className="text-muted leading-7 mb-4">
          A conventional TPS is a rotary potentiometer bolted to the end of the throttle shaft. The engine computer puts
          a regulated 5 V across a resistive track, and a wiper attached to the shaft slides along it as the throttle
          opens. The wiper&apos;s voltage is the signal: low at closed throttle, high at wide open. Because the
          computer measures volts, not ohms, a crack, worn patch or bit of dirt on the track shows up as a dip or spike
          in an otherwise smooth line.
        </p>
        <Figure caption={<>A three-wire TPS is a voltage divider: 5 V across the track, signal from the wiper on the throttle shaft.</>}>
          <TpsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The computer uses the signal to add fuel on sudden acceleration, set idle, cut fuel on deceleration and, on
          many automatics, decide shift points and firmness. So a faulty TPS can feel like a fuel, ignition or
          transmission problem. The same track-and-wiper physics is explained on a bench part in{" "}
          <Link href="/multimeters/how-to-check-a-potentiometer-wiper-with-a-multimeter" className={link}>
            how to check a potentiometer wiper
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Stumble or hesitation off idle", "Worn spot on the track", "Slow sweep, watch for a dip (step 5)", "Replace the TPS"],
            ["P0122 (low input)", "Open reference, signal shorted to ground", "5 V reference (step 2)", "Repair wiring or replace TPS"],
            ["P0123 (high input)", "Open ground, signal shorted to 5 V", "Ground drop (step 3)", "Repair ground or wiring"],
            ["P0121 (range/performance)", "Signal disagrees with airflow or MAP", "Sweep plus scan data", "TPS, vacuum leak or airflow sensor"],
            ["High or hunting idle", "Closed-throttle reading off spec", "Closed reading (step 4)", "Adjust, relearn or replace"],
            ["Limp mode on drive-by-wire", "Sensor A/B disagreement (P2135)", "Both signals with scan tool", "Throttle body or wiring; shop if unsure"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="identify-wires">Identify the three wires</StepHeading>
        <p className="text-muted leading-7">
          Find the sensor on the side of the throttle body, opposite the throttle linkage. The service manual wiring
          diagram names the 5 V reference, the sensor ground (sometimes called low reference or signal return) and the
          signal. Without a diagram you can identify them by measurement: with the key on, the wire showing about 5 V
          is the reference, the one near 0 V is ground, and the one in between that changes when the throttle moves is
          the signal.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="reference">Check the 5 V reference</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. Key on, engine off, black lead on a clean engine or battery ground, and back-probe
          the reference wire. You should see close to 5 V; many manuals accept roughly 4.5 to 5.5 V. If the reference is
          missing, unplug the TPS and check again. If 5 V returns, the sensor itself was shorting it. If it stays at
          zero with the sensor unplugged, the wiring or another sensor sharing the same reference is pulling it down.
        </p>
        <Figure caption={<>Illustrative reference reading with the key on, engine off.</>}>
          <MeterReadout value="4.98" unit="V" mode="DC V  reference" />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="ground">Check the sensor ground</StepHeading>
        <p className="text-muted leading-7">
          A bad ground is easy to miss because the sensor still produces a signal, just shifted upward. Put the red lead
          on the TPS ground wire and the black lead on the battery negative post, key on. You are measuring voltage drop
          along the ground path, and it should be very small, typically under about 0.1 V. A few tenths of a volt means
          corrosion or a loose ground somewhere in the circuit. The method is the same one used in{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            how to check voltage drop on a car
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="closed">Read the closed-throttle signal</StepHeading>
        <p className="text-muted leading-7">
          Move the red lead to the signal wire and leave the throttle fully closed. Most sensors read typically between
          about 0.5 and 1 V here. Compare with the service manual figure if it gives one. A reading of exactly 0 V or 5
          V points to wiring rather than a worn sensor. On older adjustable sensors, this is the value you set before
          tightening the mounting screws.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="sweep">Sweep the throttle slowly</StepHeading>
        <p className="text-muted leading-7 mb-4">
          This is the real test. Open the throttle very slowly by hand at the linkage, taking several seconds to go from
          closed to wide open, then let it return just as slowly. The voltage should climb steadily with no pauses,
          dips or jumps, reaching around 4 to 4.5 V at wide open. A digital display updates only a few times a second,
          so watch the analog bar graph if your meter has one, or use min/max recording: a minimum that falls well
          below your closed-throttle reading during the sweep means the signal dropped out somewhere.
        </p>
        <p className="text-muted leading-7">
          Tap the sensor body lightly with a screwdriver handle while holding the throttle at a steady part-open
          position. A good sensor holds steady. A reading that jumps when tapped points to an intermittent track or a
          loose connector pin; see{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding intermittent electrical faults
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="resistance">Optional: check resistance with the sensor unplugged</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the connector unplugged, measure ohms between the sensor&apos;s reference and ground pins. That is the
          full track and should not change as the throttle moves. Then measure from the signal pin to ground and sweep
          slowly; the resistance should change smoothly. Makers rarely publish these resistance values today, and the
          voltage sweep is the better test, but an open track or a reading that jumps to OL mid-sweep confirms a bad
          sensor.
        </p>
        <Figure caption={<>TPS test order: supply first, then ground, then the signal through its full range.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "Ref, ground, signal" },
              { label: "Reference", sub: "About 5 V" },
              { label: "Ground", sub: "Under ~0.1 V drop" },
              { label: "Closed", sub: "Typically 0.5–1 V" },
              { label: "Sweep", sub: "Smooth to ~4.5 V" },
            ]}
          />
        </Figure>
        <KeyIdea title="The sweep matters more than the endpoints">
          A worn TPS usually reads fine at closed and wide-open throttle. The fault is a small dead spot in between,
          so open the throttle slowly and watch for the signal to stumble.
        </KeyIdea>
      </section>

      <section>
        <h2 id="chart" className="text-xl font-semibold mb-3">Expected signal through the sweep</h2>
        <p className="text-muted leading-7 mb-4">
          The chart shows an illustrative sensor with a 0.6 V closed-throttle reading and a 4.4 V wide-open reading.
          Between those points the voltage should rise roughly in step with throttle opening. Your sensor&apos;s
          endpoints will differ a little, but the shape should not.
        </p>
        <Figure caption={<>Illustrative TPS signal at five throttle positions on a 5 V reference. A good sensor rises steadily; a dip anywhere in the sweep is a fault.</>}>
          <BarChart
            items={[
              { label: "Closed", value: 0.6, display: "0.6 V" },
              { label: "25% open", value: 1.55, display: "1.55 V" },
              { label: "50% open", value: 2.5, display: "2.5 V" },
              { label: "75% open", value: 3.45, display: "3.45 V" },
              { label: "Wide open", value: 4.4, display: "4.4 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The arithmetic is simple: from 0.6 to 4.4 V is a 3.8 V span, so each 25% of throttle travel should add about
          0.95 V. Spot-check that by holding the throttle at roughly half open, where the signal should sit near the
          middle of your own sensor&apos;s span.
        </p>
      </section>

      <section>
        <h2 id="electronic" className="text-xl font-semibold mb-3">Electronic throttle bodies (drive-by-wire)</h2>
        <p className="text-muted leading-7">
          Most cars built in the last two decades use an electronic throttle body, where a motor opens the throttle plate
          and the accelerator pedal has its own position sensors. The throttle body usually carries two position
          signals, often called TPS A and TPS B, which the computer cross-checks. Depending on the maker they may both
          rise, rise at different rates, or one may rise while the other falls. A disagreement sets P2135 and usually
          limp mode. You can still back-probe each signal with a meter while an assistant presses the pedal with the
          key on, but you need the service manual&apos;s expected values, and a scan tool showing both percentages
          side by side is the easier way to see a mismatch.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for a TPS</h2>
        <p className="text-muted leading-7 mb-6">
          You need DC volts with good resolution near 5 V, which every meter here has. What separates them for this job
          is how quickly the display reacts during the sweep. Our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            automotive multimeter guide
          </Link>{" "}
          covers the rest of the car.
        </p>
        <ProductStrip
          title="Meters for throttle sensor testing"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Fast 32-segment analog bar graph and min/max recording, the best fit here for catching a brief dropout in a TPS sweep.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "6,000-count display with bar graph and min/max/avg in a compact body; handles the reference, ground and sweep checks well.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "Affordable 6,000-count meter with auto and manual ranging. Fine for reference and ground checks on a DIY budget.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
