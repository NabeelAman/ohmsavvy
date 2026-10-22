import Link from "next/link";
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
  "How to test a thermistor with a multimeter: NTC vs PTC, reading resistance against the rated value, the warming test, and spotting open or shorted parts.";

export const metadata = buildMetadata({
  title: "How to Test a Thermistor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
});

const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestAThermistorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Thermistor With a Multimeter"
      description={description}
      published="2026-10-21"
      path="/multimeters/how-to-test-a-thermistor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a thermistor with a multimeter, set the meter to resistance, measure the part at room
          temperature and compare the reading with its rated value, then warm it gently and watch the
          resistance move. A healthy NTC thermistor drops in resistance as it warms; a PTC rises. A reading
          of OL, near zero, or a value that refuses to change with heat means the part has failed. This guide
          walks through each step with typical readings for a common 10 kΩ NTC.
        </>
      }
      aside={{
        image: unit.image,
        alt: "UNI-T UT139C True RMS auto-ranging digital multimeter, front view",
        caption: (
          <>
            The UNI-T UT139C (True RMS, 6,000-count, auto-ranging) is one of the budget meters in our reviews;
            any working resistance range will test a thermistor. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "ntc-vs-ptc", label: "NTC vs PTC thermistors" },
        { id: "find-the-rated-value", label: "Find the rated value" },
        { id: "measure-at-room-temperature", label: "Measure at room temperature" },
        { id: "warming-test", label: "Do the warming test" },
        { id: "typical-readings", label: "Typical 10 kΩ NTC readings" },
        { id: "read-the-result", label: "Good, open, shorted or drifted" },
        { id: "testing-a-ptc", label: "Testing a PTC thermistor" },
        { id: "common-mistakes", label: "Common testing mistakes" },
        { id: "in-circuit-vs-out", label: "In-circuit vs out-of-circuit" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What does 103 mean on a thermistor?",
          a: "It is usually the standard three-digit resistance code: the first two digits are the value and the third is the number of zeros. So 103 means 10 followed by three zeros, or 10,000 Ω, which is 10 kΩ at the reference temperature, normally 25 °C. Confirm against the datasheet or the device service manual where you can.",
        },
        {
          q: "What is the B value of a thermistor?",
          a: "The B value (or beta) describes how steeply an NTC thermistor's resistance changes with temperature. Two parts can both be 10 kΩ at 25 °C but read differently at 0 °C or 50 °C if their B values differ. When replacing a thermistor, match both the resistance rating and the B value given in the datasheet.",
        },
        {
          q: "Why does my thermistor reading keep changing?",
          a: "Usually because the part is changing temperature. Holding the body or the probe tips with your fingers warms it, and air drafts cool it. Let the part sit untouched for a minute, hold the probes by their insulated handles, and read once the display settles. A reading that jumps erratically even when stable can point to a cracked part or poor contact.",
        },
        {
          q: "Can a bad thermistor stop a battery pack from charging?",
          a: "It can. Many battery packs and chargers use a thermistor to monitor cell temperature. If it fails open, the charger may read it as extremely cold; if shorted, as extremely hot. Either way, the protection circuit may refuse to charge. Check the thermistor between its pack terminals against the value the pack or charger documentation specifies.",
        },
        {
          q: "How much do I need to warm a thermistor to test it?",
          a: "Only a few degrees. Holding a small NTC between your fingers usually shifts its resistance by several percent within seconds, which is enough to show it responds. A hair dryer on a low setting gives a larger change. Avoid flames and direct contact with a soldering iron, which can exceed the part's temperature rating or crack it.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every mode explained, including how resistance mode works and why it needs an unpowered circuit.",
        },
        {
          href: "/multimeters/multimeter-accuracy-for-electronics-repair",
          title: "What Multimeter Accuracy Do You Need for Electronics Repair?",
          desc: "How to read ±(% + counts) specs and judge whether a resistance reading is conclusive.",
        },
      ]}
    >
      <Callout title="Power off and discharge before you probe">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Resistance mode only works on an unpowered circuit. Unplug the device or remove the battery before
            measuring, or the reading is meaningless and the meter can be damaged.
          </li>
          <li>
            Inrush-limiting NTC thermistors sit at the mains input of many power supplies, right next to large
            capacitors that can hold a dangerous charge after unplugging. Discharge them safely before touching
            anything, and let the thermistor cool: inrush limiters run hot in normal use.
          </li>
          <li>
            Warm parts with your fingers or a hair dryer on a low setting, not a flame or soldering iron.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="ntc-vs-ptc" className="text-xl font-semibold mb-3">NTC vs PTC thermistors</h2>
        <p className="text-muted leading-7 mb-4">
          A thermistor is a resistor whose value changes strongly with temperature. Which way it changes
          decides how you interpret the test:
        </p>
        <p className="text-muted leading-7 mt-4">
          Washing machines often mount an NTC sensor directly on the heating element; <Link href="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter" className="text-accent hover:underline">testing a washing machine heating element</Link> covers checking both.
        </p>
        <DataTable
          head={["Type", "As it warms", "Common uses", "Warming test should show"]}
          rows={[
            ["NTC (negative temperature coefficient)", "Resistance falls", "Temperature sensing, inrush current limiting", "Reading drops"],
            ["PTC (positive temperature coefficient)", "Resistance rises, often sharply above a switching temperature", "Resettable fuses, heaters, motor and degauss circuits", "Reading rises"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Sensing NTCs are the most common type in repair work: battery packs, 3D printer hotends and beds,
          appliance and HVAC sensors, and chargers all use them. The steps below focus on NTCs, with notes on
          PTCs where the test differs.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="find-the-rated-value">Find the rated value</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A thermistor&apos;s rating is its resistance at a reference temperature. For common NTCs that
          reference is 25 °C, so a &quot;10k&quot; NTC is 10 kΩ at 25 °C. You may also see it written as R25,
          or marked with a code such as 103. Other common values include 2.2k, 47k and 100k.
        </p>
        <InfoCards
          items={[
            { label: "R25", desc: "Resistance at 25 °C, the number you compare against. 10k means 10 kΩ at 25 °C." },
            { label: "B value", desc: "How steeply resistance changes with temperature. 3950 is a common figure for 10k NTCs." },
            { label: "Tolerance", desc: "How far R25 may be from nominal. 1%, 3% and 5% parts are all common: check the datasheet." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the part is unmarked, the service manual, the device&apos;s firmware settings (common for 3D
          printers) or the replacement part listing usually names it.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-at-room-temperature">Measure resistance at room temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to Ω. On an auto-ranging meter it will choose the range; on a manual meter pick the
          lowest range above the rated value, for example 20 kΩ for a 10k part. Let the thermistor sit
          untouched for a minute so it settles at room temperature, then touch one probe to each lead. Hold
          the probes by their insulated handles: your fingers on the tips warm the part and add your own body
          resistance in parallel.
        </p>
        <p className="text-muted leading-7 mb-4">
          Remember that room temperature is rarely exactly 25 °C. A 10k NTC in a 22 °C room will read
          higher than 10 kΩ, about 11.4 kΩ for a typical B3950 part. That is correct behaviour, not a fault.
        </p>
        <p className="text-muted leading-7 mb-4">
          Also allow for tolerance. A 5% 10k part may read anywhere from 9.5 kΩ to 10.5 kΩ at exactly 25 °C,
          before your meter&apos;s own accuracy is added. In practice, a room-temperature reading within about
          10% to 20% of the expected value for that temperature is a reasonable pass for a quick check; a
          reading several times too high or too low is not. The small test current a multimeter uses on
          resistance ranges normally causes negligible self-heating in a sensing thermistor, so the reading
          should settle and stay put.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="warming-test">Do the warming test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the probes still connected, warm the thermistor body by pinching it between your fingers or
          aiming a hair dryer at it from a safe distance. Watch the display. An NTC&apos;s resistance should
          fall smoothly and steadily; a PTC&apos;s should rise. Remove the heat and the reading should drift
          back toward the room-temperature value.
        </p>
        <Figure
          caption={
            <>
              A typical 10k B3950 NTC: 11.44 kΩ at a 22 °C room temperature (left), falling to 7.38 kΩ once
              warmed to about 32 °C between the fingers (right). The direction and smoothness of the change
              matter more than the exact numbers.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="11.44" unit="kΩ" mode="Ω  room, 22 °C" />
            <MeterReadout value="7.38" unit="kΩ" mode="Ω  warmed, 32 °C" />
          </div>
        </Figure>
        <Figure caption={<>The whole test in order. A healthy part passes every step; any OL, near-zero or frozen reading is a fail.</>}>
          <FlowDiagram
            steps={[
              { label: "Power off", sub: "Unplug, discharge, let it cool" },
              { label: "Find rating", sub: "e.g. 10 kΩ at 25 °C" },
              { label: "Room reading", sub: "Close to rating for the temperature" },
              { label: "Warm it", sub: "NTC falls, PTC rises" },
              { label: "Cool it", sub: "Reading returns" },
            ]}
          />
        </Figure>
        <KeyIdea title="Want a precise check?">
          Put the thermistor and a reference thermometer side by side in a cup of water at a known
          temperature (keep the leads and any joints dry), wait for it to settle, then compare the reading
          with the datasheet&apos;s resistance table for that temperature.
        </KeyIdea>
      </section>

      <section>
        <h2 id="typical-readings" className="text-xl font-semibold mb-3">Typical readings for a 10 kΩ NTC thermistor</h2>
        <p className="text-muted leading-7 mb-4">
          The values below are calculated for a typical 10 kΩ, B3950 NTC using the standard B-value equation.
          Real parts follow their own datasheet curve, which can differ by a few percent, especially far from
          25 °C, and part tolerance adds more. Treat them as a guide to the shape of the curve, not limits.
        </p>
        <DataTable
          head={["Temperature", "Typical resistance (10k, B3950)", "Compared with R25"]}
          rows={[
            ["0 °C", "≈ 33.6 kΩ", "About 3.4× higher"],
            ["10 °C", "≈ 20.2 kΩ", "About 2× higher"],
            ["20 °C", "≈ 12.5 kΩ", "Higher"],
            ["25 °C", "10.0 kΩ", "Rated value"],
            ["30 °C", "≈ 8.04 kΩ", "Lower"],
            ["37 °C", "≈ 5.99 kΩ", "About 0.6×"],
            ["50 °C", "≈ 3.59 kΩ", "About 0.36×"],
            ["100 °C", "≈ 0.70 kΩ (698 Ω)", "About 0.07×"],
          ]}
          mono={[1]}
        />
        <Figure
          caption={
            <>
              The same typical 10k B3950 values as a chart: 33.6 kΩ at 0 °C down to 3.59 kΩ at 50 °C. The steep
              change near room temperature is why a few degrees of finger warmth shows up clearly on the meter.
            </>
          }
        >
          <BarChart
            items={[
              { label: "0 °C", value: 33.6, display: "≈ 33.6 kΩ" },
              { label: "10 °C", value: 20.2, display: "≈ 20.2 kΩ" },
              { label: "20 °C", value: 12.5, display: "≈ 12.5 kΩ" },
              { label: "25 °C (rated)", value: 10, display: "10.0 kΩ", highlight: true },
              { label: "30 °C", value: 8.04, display: "≈ 8.04 kΩ" },
              { label: "37 °C", value: 5.99, display: "≈ 5.99 kΩ" },
              { label: "50 °C", value: 3.59, display: "≈ 3.59 kΩ" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="read-the-result" className="text-xl font-semibold mb-3">Good, open, shorted or drifted: reading the result</h2>
        <DataTable
          head={["What the meter shows", "What it usually means"]}
          rows={[
            ["Close to the expected value, changes smoothly with heat", "Good part"],
            ["OL or 1 (over range) on every range", "Open circuit: cracked body, broken lead or failed joint"],
            ["Near 0 Ω", "Shorted part, or a short elsewhere if measured in circuit"],
            ["Plausible value that does not change with heat", "Dead or drifted part; also check you are on Ω mode"],
            ["Far from the expected value at a known temperature", "Drifted out of tolerance, or the wrong part was fitted"],
            ["Jumps erratically when the part is still", "Intermittent crack or poor contact; flex the leads gently and watch"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          An open circuit is a frequent failure in sensing NTCs, particularly where leads flex, as on 3D printer
          hotends. Inrush limiters in power supplies can also crack and go open after a surge. If you suspect
          the wiring rather than the part, the continuity checks in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires
          </Link>{" "}
          will separate the two.
        </p>
      </section>

      <section>
        <h2 id="testing-a-ptc" className="text-xl font-semibold mb-3">Testing a PTC thermistor</h2>
        <p className="text-muted leading-7 mb-4">
          PTC parts are tested the same way, but the numbers look different. Polymer resettable fuses
          (often called polyfuses) typically read a very low resistance when cold, often well under an ohm to a
          few ohms depending on the rating, so zero the meter leads first by shorting them and noting the
          lead resistance. Ceramic PTCs used in heaters, motor start and degauss circuits usually read higher
          cold values; the datasheet or service manual gives the expected figure.
        </p>
        <p className="text-muted leading-7">
          The warming test is less dramatic below the switching temperature: many PTCs change only slightly
          until they reach it, then rise steeply. A gentle warming that barely moves the reading is not
          necessarily a fault. The clearer failure signs are the same as for an NTC: OL when cold means open,
          and a resettable fuse that stays at a high resistance long after it has cooled has not reset and
          should be replaced.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common thermistor testing mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Expecting exactly the rated value at room temperature. The rating applies at 25 °C only.</li>
          <li>Holding the probe tips or the part, which warms it and adds body resistance in parallel.</li>
          <li>Measuring with the device powered, which gives a false reading and can damage the meter.</li>
          <li>Condemning a part on a low in-circuit reading without lifting a leg or unplugging it.</li>
          <li>Replacing a thermistor with one that matches the resistance but not the B value or type.</li>
          <li>Reading the wrong range on a manual meter, so a cold NTC above 20 kΩ shows as over range.</li>
        </ul>
      </section>

      <section>
        <h2 id="in-circuit-vs-out" className="text-xl font-semibold mb-3">In-circuit vs out-of-circuit testing</h2>
        <p className="text-muted leading-7 mb-4">
          Measured on the board, the meter sees the thermistor in parallel with everything else connected
          between those two points, such as bias resistors or an input pin. That usually makes the reading
          lower than the part alone. A low in-circuit reading is therefore not proof of a fault.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Plug-in sensors</strong> (common in printers, appliances and
            battery packs): unplug the connector and measure across the sensor&apos;s pins. This is
            effectively out of circuit.
          </li>
          <li>
            <strong className="text-foreground">Soldered parts:</strong> lift one leg with a soldering iron and
            measure the part on its own. A good reading out of circuit points the fault elsewhere.
          </li>
          <li>
            <strong className="text-foreground">Quick in-circuit check:</strong> an in-circuit OL usually
            does mean the thermistor is open, since parallel paths can only lower the reading. An in-circuit
            reading that still falls with warming is a good sign.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          The same rules apply to any component check; our guide to{" "}
          <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
            testing a capacitor with a multimeter
          </Link>{" "}
          uses the same in-circuit caution.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need to test a thermistor</h2>
        <p className="text-muted leading-7 mb-6">
          Any working digital meter with a resistance range will do the basic test. A display with more counts
          shows small changes more finely, which helps when you are watching a reading move during the warming
          test, and auto-ranging saves stepping through ranges as a cold NTC climbs past 20 kΩ. If your meter
          has a temperature function with its own probe, it can stand in for the reference thermometer. For
          what accuracy you really need, see{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy for electronics repair
          </Link>
          , or compare meters in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Budget meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, CAT III 600V, auto-ranging. Aimed at microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, CAT III 600V and auto-ranging, for budget-conscious buyers who still want True RMS.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, CAT II 600V, auto-ranging. Our budget pick for home use and beginners.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
