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
  "Test a 2-pin coolant temperature sensor with a multimeter: resistance vs temperature, the 5 V signal check, wiring faults and what P0117/P0118 mean.";

export const metadata = buildMetadata({
  title: "How to Test a Coolant Temperature Sensor",
  description,
  path: "/multimeters/how-to-test-a-coolant-temperature-sensor-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** ECM pull-up circuit: 5 V reference, internal resistor, signal node, NTC sensor to ground. */
function EctCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 380 230"
      className="w-full h-auto"
      role="img"
      aria-label="Coolant temperature sensor circuit. Inside the engine computer a 5 volt reference feeds a fixed pull-up resistor. The point between that resistor and the sensor is the signal the computer reads. The sensor is an NTC thermistor screwed into the coolant passage and its second pin returns to the computer's sensor ground. A multimeter in DC volts from the signal wire to ground reads a high voltage when the engine is cold and a low voltage when it is hot."
    >
      {/* ECM box */}
      <rect x="14" y="20" width="150" height="190" rx="8" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="89" y="40" fontSize="11" textAnchor="middle" className="fill-foreground" fontWeight="700">Engine computer</text>
      <text x="40" y="70" fontSize="10" className="fill-accent" fontWeight="700">5 V ref</text>
      <line x1="110" y1="66" x2="110" y2="84" className="stroke-foreground" strokeWidth="2" />
      {/* pull-up resistor zigzag */}
      <polyline points="110,84 102,90 118,98 102,106 118,114 102,122 110,128" fill="none" className="stroke-foreground" strokeWidth="2" />
      <text x="40" y="108" fontSize="9" className="fill-muted">pull-up</text>
      <text x="40" y="119" fontSize="9" className="fill-muted">resistor</text>
      <line x1="110" y1="128" x2="110" y2="146" className="stroke-foreground" strokeWidth="2" />
      <circle cx="110" cy="146" r="3.5" className="fill-accent" />
      <text x="40" y="150" fontSize="9" className="fill-muted">signal in</text>
      <text x="40" y="190" fontSize="9" className="fill-muted">sensor ground</text>
      {/* signal wire */}
      <line x1="110" y1="146" x2="270" y2="146" className="stroke-accent" strokeWidth="2.5" />
      {/* ground wire */}
      <line x1="110" y1="186" x2="270" y2="186" className="stroke-foreground" strokeWidth="2" />
      <line x1="110" y1="186" x2="110" y2="200" className="stroke-foreground" strokeWidth="2" />
      <line x1="100" y1="200" x2="120" y2="200" className="stroke-foreground" strokeWidth="2" />
      {/* sensor */}
      <rect x="270" y="132" width="70" height="66" rx="8" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="305" y="158" fontSize="10" textAnchor="middle" className="fill-accent" fontWeight="700">NTC</text>
      <text x="305" y="172" fontSize="9" textAnchor="middle" className="fill-muted">sensor in</text>
      <text x="305" y="184" fontSize="9" textAnchor="middle" className="fill-muted">coolant</text>
      {/* meter */}
      <rect x="196" y="40" width="88" height="54" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="240" y="62" fontSize="10" textAnchor="middle" className="fill-foreground" fontWeight="700">DC V</text>
      <text x="240" y="80" fontSize="9" textAnchor="middle" className="fill-muted">cold high, hot low</text>
      <line x1="220" y1="94" x2="220" y2="146" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="262" y1="94" x2="262" y2="186" className="stroke-foreground" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

export default function HowToTestACoolantTemperatureSensorPage() {
  return (
    <HowToShell
      title="How to Test a Coolant Temperature Sensor With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-a-coolant-temperature-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a coolant temperature sensor with a multimeter, unplug it and measure the resistance across its two
          pins cold, then again with the engine warm: the resistance should fall smoothly as the coolant heats, from
          thousands of ohms at room temperature to a couple of hundred ohms near operating temperature. Then plug it
          back in and back-probe the signal wire in DC volts, which should drop from near the top of the 0 to 5 V range
          toward under about 1 V as the engine warms. This guide covers the common two-pin engine coolant temperature
          (ECT) sensor that feeds the engine computer, the wiring faults behind P0117 and P0118, and how it differs from
          the single-wire gauge sender.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter for automotive sensor testing",
        caption: (
          <>
            A meter with a fast bar graph and min/max, such as the Fluke 87V, makes a warm-up sweep easy to watch. See
            our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How the sensor works" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "find-sensor", label: "1. Find the right sensor" },
        { id: "resistance-cold", label: "2. Resistance with the engine cold" },
        { id: "resistance-warm", label: "3. Resistance as it warms" },
        { id: "reference", label: "4. Check the 5 V reference and ground" },
        { id: "signal", label: "5. Back-probe the signal" },
        { id: "codes", label: "6. Match the reading to the code" },
        { id: "chart", label: "Resistance vs temperature chart" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a coolant temperature sensor read in ohms?",
          a: "It depends on the maker's chart, but most engine coolant sensors are NTC thermistors that read a few thousand ohms at room temperature and a couple of hundred ohms near 200 °F. A widely published GM chart lists about 3,520 Ω at 68 °F and 177 Ω at 212 °F. Use the service manual chart for your exact engine when you have it.",
        },
        {
          q: "Can I test a coolant temperature sensor without removing it?",
          a: "Yes. Unplug the connector and measure across the two sensor pins while the sensor stays in the engine, cold and then warm. For a live check, leave it plugged in and back-probe the signal wire in DC volts with the key on. Removing the sensor is only needed for a bench test in heated water against a thermometer.",
        },
        {
          q: "What voltage should a coolant temperature sensor have?",
          a: "Unplugged with the key on, the harness signal pin on most vehicles shows about 5 V, which is the computer's reference through its pull-up resistor. Plugged in, the signal sits high when the engine is cold and falls as it warms, typically to well under 1 V at full operating temperature. Check your service manual for exact figures.",
        },
        {
          q: "What are the symptoms of a bad coolant temperature sensor?",
          a: "Hard starting when warm, black smoke or a rich smell, poor fuel economy, a high idle that never settles, cooling fans running all the time or never, and a check engine light with codes P0115 to P0118 or P0128. A sensor stuck reading cold makes the computer add fuel; one stuck reading hot leans the mixture on a cold start.",
        },
        {
          q: "Is the coolant temperature sensor the same as the temperature gauge sender?",
          a: "Not always. Many older vehicles have a separate single-wire sender for the dashboard gauge and a two-wire sensor for the engine computer. Newer cars often use one ECT sensor and send the reading to the cluster over the data network. If the gauge works but the engine runs rich, test the two-wire computer sensor, not the gauge sender.",
        },
        {
          q: "Can a bad thermostat cause a coolant temperature sensor code?",
          a: "Yes. P0128 means the coolant took too long to reach the regulating temperature, which is usually a thermostat stuck open rather than a failed sensor. Before replacing the sensor, check whether the upper radiator hose gets hot early in the warm-up; if it does, the thermostat is opening too soon and the sensor is telling the truth.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor",
          desc: "NTC and PTC basics, resistance vs temperature and bench tests in water.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "Find high-resistance grounds and connectors that skew sensor readings.",
        },
      ]}
    >
      <Callout title="Hot coolant and a running engine">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never open the radiator or expansion tank cap on a hot engine. Pressurized coolant above its boiling point
            can spray out and scald you.
          </li>
          <li>
            When back-probing with the engine running, route the leads away from the belts, fan and exhaust manifold,
            and remember an electric cooling fan can start without warning even with the engine off.
          </li>
          <li>
            Back-probe from the rear of the connector with thin pins. Don&apos;t pierce the insulation, which lets water
            in and corrodes the wire over time.
          </li>
          <li>
            If the temperature gauge is in the red or the engine is boiling over, stop driving. That is an overheating
            problem first and a sensor question second.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How a coolant temperature sensor works</h2>
        <p className="text-muted leading-7 mb-4">
          The engine coolant temperature (ECT) sensor is a brass or plastic plug screwed into a coolant passage, usually
          near the thermostat housing or in the cylinder head. Inside is a negative temperature coefficient (NTC)
          thermistor: its resistance falls as it gets hotter. The engine computer feeds it a regulated 5 V reference
          through a fixed resistor inside the computer, and reads the voltage at the point between that resistor and
          the sensor. A cold sensor has high resistance, so the signal sits high; a hot one has low resistance and
          pulls the signal low.
        </p>
        <Figure caption={<>The computer reads the voltage divider formed by its internal pull-up resistor and the NTC sensor. Cold means high volts, hot means low volts.</>}>
          <EctCircuitDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The computer uses that number to decide fuel enrichment on a cold start, idle speed, ignition timing,
          when to run the cooling fans and, on automatic transmissions, when to allow torque-converter lockup. That
          is why a sensor that reads wrong can cause so many different symptoms, and why a multimeter test of both
          the sensor and its wiring is worth doing before buying parts. The thermistor theory is covered in more
          depth in{" "}
          <Link href="/multimeters/how-to-test-a-thermistor-with-a-multimeter" className={link}>
            how to test a thermistor
          </Link>
          ; this page sticks to the car.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Rich running, black smoke, hard warm start", "Sensor stuck reading cold (high Ω)", "Warm resistance (step 3)", "Replace the sensor"],
            ["P0118 (high input)", "Open sensor, broken wire or bad ground", "5 V and ground checks (step 4)", "Repair wiring or replace sensor"],
            ["P0117 (low input)", "Shorted sensor or signal shorted to ground", "Resistance cold; wire to ground", "Replace sensor or repair chafed wire"],
            ["P0128, slow warm-up", "Thermostat stuck open", "Upper hose warm early?", "Replace the thermostat"],
            ["Fans run all the time", "Sensor or circuit reading hot", "Signal volts vs actual temp", "Sensor, wiring or fan control"],
            ["Gauge reads wrong, engine fine", "Separate gauge sender or cluster", "Find the single-wire sender", "Test the sender or the cluster"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="find-sensor">Find the right sensor</StepHeading>
        <p className="text-muted leading-7">
          Look for a two-wire connector on a sensor threaded into the coolant path near the thermostat housing. On
          many engines a second, single-wire sender sits nearby for the dashboard gauge, and some engines carry two
          two-wire sensors, one for the computer and one for the gauge or a separate module. The service manual
          or a parts catalog diagram settles which is which. Note the wire colors at the connector before you start,
          because you will need the signal and ground positions for step 4.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resistance-cold">Measure resistance with the engine cold</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the engine off and fully cold, ideally overnight, unplug the connector. Set the meter to ohms and place
          the probes on the two sensor pins; polarity doesn&apos;t matter on a thermistor. Write down the reading and
          the air temperature. On the common GM-style chart, 68 °F corresponds to about 3,520 Ω. A reading of OL means
          the thermistor is open, and a reading near 0 Ω means it is shorted. Either one is a failed sensor.
        </p>
        <Figure caption={<>Illustrative cold reading at about 68 °F on a GM-style sensor. Your engine&apos;s chart may differ.</>}>
          <MeterReadout value="3.48" unit="kΩ" mode="Ω  engine cold" />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="resistance-warm">Watch the resistance as the engine warms</StepHeading>
        <p className="text-muted leading-7">
          A sensor can read correctly cold and still be wrong hot. Plug it back in, run the engine to operating
          temperature, switch off and unplug again, then measure quickly. Near 194 °F the GM chart gives about 241 Ω,
          and at 176 °F about 332 Ω. If you have an infrared thermometer, aim it at the thermostat housing so you
          compare like with like. What you&apos;re looking for is a smooth, steady fall in resistance with no sudden
          jumps to OL. On the bench, the same check works with the sensor tip in a pan of heated water and a cooking
          thermometer beside it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="reference">Check the 5 V reference and the sensor ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the connector still unplugged, turn the key on, engine off. Set the meter to DC volts and measure from the
          harness signal pin to a clean engine ground. Most systems show about 5 V here, the computer&apos;s
          reference through its pull-up resistor. Then measure from the signal pin to the harness ground pin; you
          should see the same 5 V. If the signal-to-engine reading is good but signal-to-harness-ground is low or zero,
          the sensor ground wire is open or high in resistance.
        </p>
        <p className="text-muted leading-7">
          No 5 V at all points to a broken signal wire, a chafed wire shorted to ground, or a computer problem. With
          the battery disconnected, a continuity check from the harness pin to the matching computer pin finds an
          open wire; see{" "}
          <Link href="/multimeters/how-to-find-a-broken-wire-with-a-multimeter" className={link}>
            how to find a broken wire with a multimeter
          </Link>
          . Corroded connector pins are common on older cars, so inspect them for green deposits before condemning
          anything else.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="signal">Back-probe the signal with the engine running</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reconnect the sensor and back-probe the signal wire with the black lead on the sensor ground. Start the engine
          from cold and watch the DC volts. On most vehicles the voltage starts high, often somewhere around 3 to 4 V
          on a cool morning, and falls steadily as the engine warms, typically ending well under 1 V once the
          thermostat opens. A meter with a bar graph or min/max recording makes it easy to catch a dropout, which
          shows as a sudden spike toward 5 V.
        </p>
        <Figure caption={<>Illustrative signal readings on a typical 5 V ECT circuit, cold start and fully warm. Exact values vary by maker.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="3.42" unit="V" mode="DC V  cold start" />
            <MeterReadout value="0.62" unit="V" mode="DC V  fully warm" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="codes">Match the reading to the trouble code</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The generic OBD-II codes (SAE J2012) tell you which direction the computer saw. P0117 is a low input, so the
          circuit looks too hot: a shorted sensor or a signal wire touching ground. P0118 is a high input, which looks
          too cold: an open sensor, a broken signal wire or a lost ground. P0116 is range or performance, where the
          reading is plausible but doesn&apos;t agree with other temperatures, and P0128 points to the thermostat.
        </p>
        <Figure caption={<>Coolant sensor test order: prove the sensor, then the wiring, then the live signal.</>}>
          <FlowDiagram
            steps={[
              { label: "Identify", sub: "2-wire ECT sensor" },
              { label: "Ohms cold", sub: "Compare to chart" },
              { label: "Ohms warm", sub: "Smooth fall" },
              { label: "Harness", sub: "5 V and ground" },
              { label: "Live signal", sub: "High cold, low hot" },
            ]}
          />
        </Figure>
        <KeyIdea title="High volts means cold, low volts means hot">
          The computer only sees a voltage. An open circuit reads like an engine at the North Pole and a short reads
          like one boiling over, so test the wiring before replacing a sensor that may be telling the truth.
        </KeyIdea>
      </section>

      <section>
        <h2 id="chart" className="text-xl font-semibold mb-3">Coolant sensor resistance vs temperature</h2>
        <p className="text-muted leading-7 mb-4">
          The chart below uses values from the widely published GM ECT and intake air temperature sensor table. Many
          other makers use similar curves, but not identical ones, so treat it as typical and check your manual for
          the exact figures. The scale is logarithmic, because resistance changes by roughly a factor of 20 between a
          cool morning and full operating temperature.
        </p>
        <Figure caption={<>Typical GM-style NTC coolant sensor resistance (log scale). Source: published GM ECT/IAT temperature-resistance chart.</>}>
          <BarChart
            log
            items={[
              { label: "32 °F (0 °C)", value: 9420, display: "9,420 Ω" },
              { label: "68 °F (20 °C)", value: 3520, display: "3,520 Ω" },
              { label: "104 °F (40 °C)", value: 1459, display: "1,459 Ω" },
              { label: "140 °F (60 °C)", value: 667, display: "667 Ω" },
              { label: "176 °F (80 °C)", value: 332, display: "332 Ω" },
              { label: "212 °F (100 °C)", value: 177, display: "177 Ω", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Because the curve is so steep, a few degrees of difference between your thermometer and the sensor tip moves
          the reading a lot at the cold end. Judge the shape, not a single number: a good sensor falls smoothly and
          lands in the right neighborhood at each temperature. If a high-resistance ground connection is suspected,
          the methods in{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            how to test a car ground wire
          </Link>{" "}
          apply here too.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on car sensors</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with ohms and DC volts can do the static tests. For the warm-up sweep, a responsive bar
          graph and min/max recording help you catch a brief dropout that a slow digital display would miss. Our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            automotive multimeter guide
          </Link>{" "}
          compares more options.
        </p>
        <ProductStrip
          title="Meters for coolant sensor testing"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Fast analog bar graph and min/max recording for catching signal dropouts during a warm-up, plus a temperature function with the supplied probe.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Reliable ohms and DC volts with a bar graph and min/max/avg, in a compact meter that suits a car toolbox.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "Budget auto-ranging meter that covers sensor resistance and the 5 V reference check for occasional DIY work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
