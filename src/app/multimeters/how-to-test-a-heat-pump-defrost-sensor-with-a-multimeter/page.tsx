import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a heat pump defrost sensor with a multimeter: read thermistor ohms against coil temperature, do the ice-water test and check the defrost board.";

export const metadata = buildMetadata({
  title: "How to Test a Heat Pump Defrost Sensor",
  description,
  path: "/multimeters/how-to-test-a-heat-pump-defrost-sensor-with-a-multimeter",
});

const kleinMM450 = picks.find((p) => p.name === "Klein Tools MM450")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const brymen = picks.find((p) => p.name === "Brymen BM235")!;

const link = "text-accent hover:underline";

/** Outdoor coil with the defrost sensor clipped to a tube, wired to the defrost board and its outputs. */
function DefrostCircuitDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="How to test a heat pump defrost sensor: the sensor is clipped to a small tube near the bottom of the outdoor coil and wired to the DFT or COIL terminals on the defrost board. The board reads its resistance and, when it decides to defrost, switches the reversing valve, stops the outdoor fan and brings on backup heat."
    >
      {/* outdoor coil */}
      <rect x="14" y="20" width="110" height="160" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <g className="stroke-border" strokeWidth="1">
        <line x1="24" y1="40" x2="114" y2="40" />
        <line x1="24" y1="60" x2="114" y2="60" />
        <line x1="24" y1="80" x2="114" y2="80" />
        <line x1="24" y1="100" x2="114" y2="100" />
        <line x1="24" y1="120" x2="114" y2="120" />
        <line x1="24" y1="140" x2="114" y2="140" />
      </g>
      <text x="69" y="34" fontSize="9" textAnchor="middle" className="fill-muted">outdoor coil</text>
      <path d="M30 168 H108" className="stroke-foreground" strokeWidth="3" fill="none" />
      <text x="69" y="196" fontSize="9" textAnchor="middle" className="fill-muted">bottom tube (coldest)</text>
      {/* sensor */}
      <rect x="58" y="158" width="22" height="18" rx="3" className="fill-accent" />
      <text x="69" y="152" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">sensor</text>
      {/* wires to board */}
      <g fill="none" strokeWidth="1.5" className="stroke-accent">
        <path d="M80 164 H150 V90 H170" />
        <path d="M80 170 H156 V104 H170" />
      </g>
      {/* board */}
      <rect x="170" y="50" width="90" height="120" rx="6" className="fill-muted stroke-foreground" strokeWidth="2" />
      <text x="215" y="68" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">defrost board</text>
      <text x="215" y="100" fontSize="9" textAnchor="middle" className="fill-foreground">DFT / COIL</text>
      <text x="215" y="114" fontSize="9" textAnchor="middle" className="fill-muted">reads ohms</text>
      <text x="215" y="140" fontSize="9" textAnchor="middle" className="fill-muted">timer: 30/60/90 min</text>
      {/* outputs */}
      <g fill="none" strokeWidth="1.5" className="stroke-foreground">
        <line x1="260" y1="78" x2="282" y2="78" />
        <line x1="260" y1="110" x2="282" y2="110" />
        <line x1="260" y1="142" x2="282" y2="142" />
      </g>
      <text x="286" y="74" fontSize="9" className="fill-foreground">O/B: valve</text>
      <text x="286" y="86" fontSize="9" className="fill-muted">to cooling</text>
      <text x="286" y="106" fontSize="9" className="fill-foreground">fan relay</text>
      <text x="286" y="118" fontSize="9" className="fill-muted">fan off</text>
      <text x="286" y="138" fontSize="9" className="fill-foreground">W2</text>
      <text x="286" y="150" fontSize="9" className="fill-muted">backup heat</text>
    </svg>
  );
}

export default function HowToTestAHeatPumpDefrostSensorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Heat Pump Defrost Sensor With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-test-a-heat-pump-defrost-sensor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a heat pump defrost sensor, unplug it from the defrost board, measure its resistance, and compare
          the reading with the manufacturer&apos;s resistance-versus-temperature chart at the coil temperature you
          measured. A thermistor sensor that reads OL, reads near 0 Ω, or sits far off the chart has failed; an
          older snap-disc defrost thermostat should read closed (near 0 Ω) when cold and open when warm. Below is
          how to test a heat pump defrost sensor of either type, what a typical 10k NTC reads around freezing, and
          how to tell a bad sensor from a bad board.
        </>
      }
      aside={{
        image: kleinMM450.image,
        alt: "Klein Tools MM450 True RMS multimeter with temperature function",
        caption: (
          <>
            A meter with a temperature function, like the Klein Tools MM450, lets you read the coil temperature and
            the sensor resistance with one tool. See our{" "}
            <Link href="/multimeters/klein-mm400-vs-klein-mm450" className={link}>
              MM400 vs MM450 comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-defrost-works", label: "How heat pump defrost works" },
        { id: "two-sensor-types", label: "Thermistor or snap-disc thermostat" },
        { id: "causes", label: "Symptoms, causes and fixes" },
        { id: "isolate", label: "1. Isolate the outdoor unit" },
        { id: "measure-coil-temperature", label: "2. Measure the coil temperature" },
        { id: "measure-resistance", label: "3. Measure the sensor resistance" },
        { id: "ice-water-test", label: "4. Do the ice-water test" },
        { id: "check-the-board", label: "5. Check the defrost board" },
        { id: "resistance-chart", label: "Typical 10k NTC values near freezing" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What are the signs of a bad defrost sensor on a heat pump?",
          a: "The outdoor coil turns into a solid block of ice and stays that way, or the unit drops into defrost far too often, including on mild dry days. Some boards also flash a sensor fault code. Heating capacity falls, the backup heat strips run more, and the electric bill climbs. Ice that clears after a defrost and returns later is normal.",
        },
        {
          q: "How often should a heat pump go into defrost?",
          a: "It depends on the weather and the board setting. Many time-temperature boards check every 30, 60 or 90 minutes of compressor runtime and only defrost if the coil sensor reads cold. A typical defrost lasts a few minutes and is capped at around 10 to 14 minutes on many boards. In humid weather near freezing, frequent cycles are normal.",
        },
        {
          q: "Can I bypass or jump a heat pump defrost sensor?",
          a: "Briefly, for testing only. On many boards with a snap-disc thermostat, jumping the sensor terminals tells the board the coil is cold, and with the test pins shorted the unit enters defrost so you can watch the outputs. Never leave a jumper in place. The unit would defrost every cycle, wasting energy and heating with backup strips instead of the compressor.",
        },
        {
          q: "Is the defrost sensor the same as the outdoor temperature sensor?",
          a: "No, though some units have both. The defrost or coil sensor clips onto a refrigerant tube and reports coil temperature. An outdoor ambient sensor sits in free air, often on the cabinet or board, and helps the board decide when defrost is needed and when to lock out the compressor. Check the wiring diagram on the panel to tell which leads go where.",
        },
        {
          q: "Where is the defrost sensor located on a heat pump?",
          a: "Usually low on the outdoor coil, clipped to one of the small tubes that feed the coil or to a return bend near the bottom, because that area frosts first. Follow the two wires from the DFT, COIL or SENSOR terminals on the defrost board. On some units the sensor sits under the coil's sheet-metal guard, so remove the top or side panel to reach it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "The general NTC and PTC method, including the B value and the room-temperature reading.",
        },
        {
          href: "/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather",
          title: "Why Does My Heat Pump Use Too Much Electricity in Cold Weather?",
          desc: "Defrost cycles, backup heat and thermostat settings that drive winter bills up.",
        },
      ]}
    >
      <Callout title="Outdoor unit safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The outdoor unit is fed at 208–240 VAC. Turn off the disconnect and the breaker and verify 0 V on the
            line terminals with your meter before reaching into the cabinet.
          </li>
          <li>
            The run capacitor can stay charged after power is off. Discharge it through a resistor and confirm 0 V.
          </li>
          <li>
            Coil fins are sharp, and the compressor and its discharge line can be hot enough to burn even in winter.
            Wear gloves. If the defrost board or refrigerant circuit is the problem, call an HVAC technician; anything
            involving refrigerant needs an EPA-certified tech in the US.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-defrost-works" className="text-xl font-semibold mb-3">How heat pump defrost works</h2>
        <p className="text-muted leading-7 mb-4">
          In heating mode the outdoor coil runs colder than the outdoor air, often below freezing, so moisture in
          the air freezes onto the fins. Frost blocks airflow and the unit loses capacity. The defrost board watches
          two things: how long the compressor has run and how cold the coil is. When both say frost is likely, the
          board flips the reversing valve to cooling mode, stops the outdoor fan so the coil heats up quickly, and
          brings on the backup heat strips so the house doesn&apos;t get a blast of cold air. When the sensor
          reports the coil has warmed up, or a maximum time runs out, the board ends defrost.
        </p>
        <p className="text-muted leading-7">
          The sensor is the board&apos;s only window onto the coil. If it lies, the board makes the wrong call in
          one of two directions: no defrost at all, or defrost every cycle. Both cost money, which is why defrost
          faults show up so often in{" "}
          <Link href="/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather" className={link}>
            high winter heat pump bills
          </Link>
          .
        </p>
        <Figure caption={<>The defrost sensor reports coil temperature to the board, which drives the reversing valve, outdoor fan relay and backup heat.</>}>
          <DefrostCircuitDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="two-sensor-types" className="text-xl font-semibold mb-3">Thermistor or snap-disc defrost thermostat</h2>
        <p className="text-muted leading-7 mb-4">
          Before you measure anything, find out which part you have, because they read in completely different
          ways. Check the wiring diagram inside the service panel; it usually names the part.
        </p>
        <InfoCards
          items={[
            { label: "NTC thermistor", desc: "A small bead or bullet in a clip. Resistance rises as it gets colder. Read it in ohms and compare with a chart." },
            { label: "Snap-disc thermostat", desc: "A round metal disc in a clip. A switch: closed when the coil is cold, open once it warms up." },
            { label: "Ambient sensor", desc: "A second thermistor in free air on some units. Same test, but it reads air temperature, not coil." },
          ]}
        />
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms, likely causes and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Coil iced solid, never defrosts", "Thermistor shorted (reads warm) or disc stuck open", "Ohms at room temp: near 0 Ω, or OL on a disc when iced", "Replace the sensor"],
            ["Coil iced, sensor tests good", "Sensor clip loose, reading air instead of tube", "Sensor not tight on the tube", "Reclip with full contact; insulate if the maker did"],
            ["Defrosts every cycle, even on dry days", "Thermistor open (reads very cold) or disc stuck closed", "OL on a thermistor, or 0 Ω on a disc when warm", "Replace the sensor"],
            ["Board flashes a sensor fault code", "Open or shorted sensor, or a broken lead", "Ohms at the board plug, then wiggle the leads", "Repair the lead or replace the sensor"],
            ["Sensor good, still no defrost", "Board relay or reversing valve fault", "Force defrost with test pins; check outputs", "Board or valve; call an HVAC tech if unsure"],
            ["Defrost runs but ice remains", "Ends on max time; low charge or weak valve", "Watch a full defrost cycle", "HVAC technician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="isolate">Isolate the outdoor unit</StepHeading>
        <p className="text-muted leading-7">
          Set the thermostat to off, pull the outdoor disconnect, switch off the breaker and remove the service
          panel. Confirm 0 V across the contactor line terminals with your meter. Photograph the defrost board
          and the sensor plug before unplugging anything.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-coil-temperature">Measure the coil temperature at the sensor</StepHeading>
        <p className="text-muted leading-7">
          A resistance reading means nothing until you know the sensor&apos;s temperature. If your meter has a Type K
          thermocouple input, tape the bead to the same tube right beside the sensor and give it a minute. Write the
          number down. Without a probe, a kitchen thermometer against the tube is a rough substitute. Our guide on{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            checking a thermocouple
          </Link>{" "}
          covers the probe itself.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure-resistance">Test the heat pump defrost sensor resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug the sensor from the board so the board&apos;s circuit isn&apos;t in parallel with it. Set the meter
          to ohms (auto-range, or the 200 kΩ range on a manual meter) and read across the two sensor leads at the
          plug. Then compare with the maker&apos;s chart, which is often printed in the service manual or on the
          panel diagram.
        </p>
        <p className="text-muted leading-7 mb-4">
          For a thermistor, the reading should sit close to the chart value for the temperature you measured,
          allowing a few percent for tolerance. Many brands use a 10k NTC, which reads about 10 kΩ at 77 °F (25 °C)
          and climbs to roughly 33 to 34 kΩ at 32 °F (0 °C). Not every maker uses 10k, so check before you condemn a
          sensor that reads 3 kΩ or 50 kΩ. For a snap-disc thermostat on a coil warmer than about 60 °F, expect OL
          (open); on a frosted coil, expect near 0 Ω (closed).
        </p>
        <Figure
          caption={
            <>
              Illustrative readings from a typical 10k NTC defrost sensor: 33.5 kΩ with the tube at 32 °F matches the
              curve (left); OL means the sensor or its lead is open (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="33.5" unit="kΩ" mode="Ω  tube at 32 °F" />
            <MeterReadout value="O.L" unit="MΩ" mode="Ω  open sensor" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="ice-water-test">Do the ice-water test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When the weather won&apos;t give you a known temperature, make one. Unclip the sensor, drop it into a cup
          of crushed ice and water, stir, and wait two to three minutes. Ice water sits at 32 °F (0 °C), so a 10k NTC
          should settle near 33 to 34 kΩ. Lift it out, hold it in your hand and the reading should fall smoothly as
          it warms. A reading that jumps, drops to OL when you flex the lead, or never moves is a bad sensor.
        </p>
        <p className="text-muted leading-7">
          A snap-disc thermostat needs a little more cold. Many close around freezing or slightly below, so add a
          spoonful of salt to the ice water to push it a few degrees lower, then listen for the click and watch the
          meter drop to near 0 Ω. Warm it in your hand and it should open again, though some only open once they pass
          roughly 55 to 70 °F, so a cup of warm tap water is a quicker check. For more on NTC behavior and the B
          value, see{" "}
          <Link href="/multimeters/how-to-test-a-thermistor-with-a-multimeter" className={link}>
            how to test a thermistor with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check-the-board">Check the defrost board</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the sensor passes and the unit still won&apos;t defrost, the board is next. Many boards have a pair of
          TEST pins that, when shorted briefly as the board label describes, speed up the timer and force a defrost,
          provided the sensor reports a cold coil. With power restored and the system in heat, short the pins and
          watch: the outdoor fan should stop, the reversing valve should shift with a whoosh, and W2 should send
          24 VAC to the backup heat. If the board gets a cold-coil signal and those outputs never change, the board
          is the likely fault. Its relays can be checked the same way as any relay in{" "}
          <Link href="/multimeters/how-to-test-a-relay-with-a-multimeter" className={link}>
            how to test a relay
          </Link>
          , and if the fan stops but the valve doesn&apos;t shift, test the{" "}
          <Link href="/multimeters/how-to-test-a-reversing-valve-solenoid-with-a-multimeter" className={link}>
            reversing valve solenoid
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          This step is live: 240 V is back on the contactor and the fan can restart without warning. Keep hands out
          of the fan guard and probes on the low-voltage terminals only. If you are not comfortable, hand this step
          to an HVAC technician.
        </p>
        <Figure caption={<>Diagnosing a heat pump that won&apos;t defrost, in order.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Disconnect off, 0 V" },
              { label: "Coil temp", sub: "Probe on the tube" },
              { label: "Sensor ohms", sub: "Compare with chart" },
              { label: "Ice water", sub: "32 °F reference" },
              { label: "Board test", sub: "Test pins, outputs" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="resistance-chart" className="text-xl font-semibold mb-3">Typical 10k NTC defrost sensor values near freezing</h2>
        <p className="text-muted leading-7 mb-4">
          These figures come from the standard beta equation, R = 10 kΩ × e<sup>B(1/T − 1/298.15)</sup> with B = 3950
          and T in kelvin. At 32 °F, T = 273.15 K, so the exponent is 3950 × (0.003661 − 0.003354) ≈ 1.21 and
          R ≈ 10 × e<sup>1.21</sup> ≈ 33.6 kΩ. They show the shape of a common curve. Your maker&apos;s chart may use
          a different B value or base resistance, and its numbers win.
        </p>
        <DataTable
          head={["Coil temperature", "Typical 10k B3950 NTC", "Snap-disc thermostat"]}
          rows={[
            ["−4 °F (−20 °C)", "≈ 105 kΩ", "Closed"],
            ["14 °F (−10 °C)", "≈ 58.2 kΩ", "Closed"],
            ["23 °F (−5 °C)", "≈ 44.0 kΩ", "Closed"],
            ["32 °F (0 °C)", "≈ 33.6 kΩ", "Around its closing point"],
            ["41 °F (5 °C)", "≈ 25.9 kΩ", "Usually still closed if already closed"],
            ["50 °F (10 °C)", "≈ 20.2 kΩ", "Depends on model"],
            ["77 °F (25 °C)", "10.0 kΩ", "Open"],
          ]}
          mono={[1]}
        />
        <div className="mt-6">
          <Figure caption={<>The same typical 10k B3950 values as a chart. Resistance roughly triples between 77 °F and 32 °F, which is why the board can read the coil so precisely around freezing.</>}>
            <BarChart
              items={[
                { label: "−4 °F", value: 105, display: "≈ 105 kΩ" },
                { label: "14 °F", value: 58.2, display: "≈ 58.2 kΩ" },
                { label: "23 °F", value: 44, display: "≈ 44.0 kΩ" },
                { label: "32 °F", value: 33.6, display: "≈ 33.6 kΩ", highlight: true },
                { label: "41 °F", value: 25.9, display: "≈ 25.9 kΩ" },
                { label: "50 °F", value: 20.2, display: "≈ 20.2 kΩ" },
                { label: "77 °F", value: 10, display: "10.0 kΩ" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-6">
          <KeyIdea title="Open reads cold, shorted reads hot">
            To the board, an open thermistor looks like an extremely cold coil and a shorted one looks like a hot
            coil. That is why an open sensor often causes constant defrosting and a shorted one causes a coil that
            never defrosts. Match the symptom to the reading and you know you have found the fault.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for defrost sensors</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a resistance range to 200 kΩ or more will read the sensor. The useful extra is a
          temperature input with a Type K probe, so you can read the tube temperature next to the sensor and compare
          the two numbers on the spot. Use a CAT III rated meter, because the same cabinet holds the 240 V supply.
          For a wider list, see our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Meters with a temperature function"
          items={[
            {
              name: "Klein Tools MM450",
              image: kleinMM450.image,
              alt: "Klein Tools MM450 True RMS digital multimeter",
              href: "/multimeters/klein-mm400-vs-klein-mm450",
              note: "True RMS, CAT III 600V, temperature from −40°F to 1832°F. Slim and drop-rated to 2 m.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "True RMS, CAT IV 600V, temperature with the supplied thermocouple and Min/Max recording.",
            },
            {
              name: "Brymen BM235",
              image: brymen.image,
              alt: "Brymen BM235 True RMS multimeter",
              href: "/multimeters/brymen-bm235-vs-fluke-117",
              note: "True RMS with Type-K temperature, AutoV LoZ and NCV. CAT III 600V and CAT IV 300V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
