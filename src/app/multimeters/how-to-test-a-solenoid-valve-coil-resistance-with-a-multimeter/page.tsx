import Link from "next/link";
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
  "How to test a solenoid valve coil resistance with a multimeter: isolate it, find the expected ohms from its rating, and check for open, short and body faults.";

export const metadata = buildMetadata({
  title: "How to Test a Solenoid Valve Coil Resistance",
  description,
  path: "/multimeters/how-to-test-a-solenoid-valve-coil-resistance-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const klein = picks.find((p) => p.name === "Klein Tools MM400")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

export default function HowToTestASolenoidValveCoilResistanceWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Solenoid Valve Coil Resistance With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-solenoid-valve-coil-resistance-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a solenoid valve coil resistance with a multimeter, you disconnect the coil from its supply,
          measure across its two terminals on the ohms range, and compare the reading with what the coil&apos;s
          voltage and power rating predicts. A second test, from each terminal to the valve body, catches
          insulation faults. This guide shows how to work out the expected figure, why AC coils read lower
          than the formula suggests, how temperature shifts the result, and what a good coil on a valve that
          still will not open means. For car starter solenoids and push/pull actuators, see{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-coil-with-a-multimeter" className={link}>
            how to test a solenoid coil with a multimeter
          </Link>
          .
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter, front view",
        caption: (
          <>
            The Fluke 117 (True RMS, CAT III 600V) is the best-overall pick in our roundup, built for
            electricians and serious hobbyists. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "isolate-the-coil", label: "Isolate and unplug the coil" },
        { id: "expected-resistance", label: "Work out the expected resistance" },
        { id: "measure-the-coil", label: "Measure across the terminals" },
        { id: "temperature", label: "Allow for temperature" },
        { id: "short-to-body", label: "Test for a short to the body" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "check-the-supply", label: "Check the voltage at the coil" },
        { id: "valve-examples", label: "Irrigation, appliance and industrial valves" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What resistance should a 24 V irrigation valve solenoid have?",
          a: "Many 24 V AC irrigation solenoids read in the tens of ohms, but the exact figure depends on the manufacturer and model, so look up the specification for yours. Because these are AC coils, the reading will be lower than the voltage squared divided by the VA rating. Compare a suspect valve with a known-good one of the same model if you can.",
        },
        {
          q: "Can a solenoid coil test good but still fail?",
          a: "Yes. A resistance test finds open windings and many shorts, but it cannot detect a few shorted turns that barely change the reading, or insulation that breaks down only at full voltage. If the coil reads correctly, also check that the supply voltage actually reaches the coil when the valve is told to open, and look for mechanical faults.",
        },
        {
          q: "Does a solenoid coil have polarity?",
          a: "A plain wound coil does not; it measures the same in either direction. Some DC coils and connectors include a suppression diode, an LED or a rectifier, and those do have polarity and can read differently when you swap the leads. Check the coil or connector markings and the manufacturer's wiring diagram before connecting power.",
        },
        {
          q: "Can I test a solenoid coil without removing it from the valve?",
          a: "Yes. The coil usually stays on the valve for a resistance test; you only need to disconnect its wires or unplug its connector so nothing else is in parallel. Removing the coil from its stem is useful for the body test on some designs, but never energise a coil while it is off the valve, because many coils can overheat that way.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "The same R = V² ÷ P method applied to elements, with cold versus hot resistance explained.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-in-ohms-with-a-digital-multimeter",
          title: "How to Measure Resistance in Ohms With a Digital Multimeter",
          desc: "Ranges, lead resistance and the habits that keep ohms readings trustworthy.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Many valves in appliances, heating and industrial plant have mains-voltage coils. Switch off and
            isolate the supply, lock it off where you can, and confirm with the meter on AC volts that the coil
            terminals are dead before you touch them.
          </li>
          <li>
            The valve may hold water, air, steam or hydraulic pressure. A resistance test does not require
            opening the valve; do not dismantle it until the line is isolated and depressurised.
          </li>
          <li>
            Gas valves and valves on safety systems, such as boiler or burner gas controls, should be tested
            and replaced only by a qualified engineer.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="isolate-the-coil">Isolate the valve and unplug the coil</StepHeading>
        <p className="text-muted leading-7">
          With the power off, unplug the coil&apos;s connector or disconnect its two wires and note where they
          went. Measuring with the coil still wired in leaves the controller, a relay contact or other valves
          in parallel, which can pull the reading down. On industrial coils with a DIN-style plug, remove the
          plug and measure on the coil&apos;s own pins: the plug can contain an LED, a suppression part or a
          rectifier that confuses the reading.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="expected-resistance">Work out the expected resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The coil&apos;s label or the manufacturer&apos;s data sheet usually gives its voltage and power. For a
          DC coil, current is limited only by the winding&apos;s resistance, so resistance follows closely from
          R = V² ÷ P: a 12 V, 10 W coil works out at 144 ÷ 10 = 14.4 Ω.
        </p>
        <p className="text-muted leading-7 mb-4">
          AC coils are different. Their inductance adds reactance, so the current is limited by impedance, not
          resistance alone, and the ohms you measure are lower than V² ÷ P suggests. AC coils are also often
          rated in VA, sometimes with separate inrush and holding figures. For an AC coil, treat V² ÷ VA as an
          upper limit rather than a target, and use the manufacturer&apos;s stated resistance where one is
          given.
        </p>
        <DataTable
          head={["Coil rating", "Calculation", "Expected reading"]}
          rows={[
            ["12 V DC, 10 W", "12² ÷ 10 = 144 ÷ 10", "≈ 14.4 Ω"],
            ["12 V DC, 5 W", "144 ÷ 5", "≈ 28.8 Ω"],
            ["24 V DC, 8 W", "576 ÷ 8", "≈ 72 Ω"],
            ["24 V DC, 20 W", "576 ÷ 20", "≈ 28.8 Ω"],
            ["24 V AC, 7 VA (holding)", "576 ÷ 7 ≈ 82.3", "Below ≈ 82 Ω (AC: lower)"],
            ["120 V AC, 10 VA", "14,400 ÷ 10", "Below ≈ 1,440 Ω (AC: lower)"],
            ["230 V AC, 8 VA", "52,900 ÷ 8 ≈ 6,612", "Below ≈ 6.6 kΩ (AC: lower)"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          The same method is used for heating elements, which are almost purely resistive; our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            measuring the resistance of a heating element
          </Link>{" "}
          works through more examples.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure-the-coil">Measure across the coil terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to ohms, touch the probes together and note the lead resistance, which matters on
          low-ohm DC coils. Then hold the probes firmly on the two coil terminals without touching the metal
          with your fingers, since your body resistance in parallel can skew high readings. On a manual-ranging
          meter, pick the range just above the expected value. Give the reading a moment to settle: the
          inductance of a large coil can make the display creep before it stops. Wiggle the coil&apos;s
          lead-outs gently while you watch, too, because a winding that is broken where the fine wire meets its
          terminal may read correctly one moment and OL the next. The basics are covered in{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              A 12 V, 10 W DC coil at room temperature reading 14.6 Ω, close to the 14.4 Ω predicted by V² ÷ P.
              The small difference is what a slightly warmer winding and lead resistance would add.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="14.6" unit="Ω" mode="Ω, coil terminals" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="temperature" className="text-xl font-semibold mb-3">Allow for coil temperature</h2>
        <p className="text-muted leading-7 mb-4">
          Solenoid windings are copper, and copper&apos;s resistance rises by roughly 0.39% for every degree
          Celsius. A coil that has been energised for a long time can be much warmer than the room, so measure
          it cold where possible, or expect a higher reading. Taking the 12 V, 10 W coil at 14.4 Ω at 20 °C:
        </p>
        <Figure
          caption={
            <>
              The same 14.4 Ω (at 20 °C) copper coil at four temperatures: about 15.5 Ω at 40 °C, 16.7 Ω at 60
              °C and 17.8 Ω at 80 °C. A hot coil reading around 20% high can be perfectly healthy.
            </>
          }
        >
          <BarChart
            items={[
              { label: "20 °C (room)", value: 14.4, display: "14.4 Ω", highlight: true },
              { label: "40 °C", value: 15.53, display: "≈ 15.5 Ω" },
              { label: "60 °C", value: 16.66, display: "≈ 16.7 Ω" },
              { label: "80 °C (hot coil)", value: 17.8, display: "≈ 17.8 Ω" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The reverse also matters: a coil that reads correctly cold but stops working once warm may have a
          winding or joint that opens with heat. If you suspect that, measure again straight after the valve
          has failed in use, with the power isolated.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="short-to-body">Test for a short to the valve body</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to its highest ohms range. Put one probe on a clean, unpainted part of the valve body or
          the earth terminal, and the other on each coil terminal in turn. Both should read OL. Any reading at
          all means the winding insulation has broken down to the metalwork, which on a mains coil can trip
          the RCD or GFCI, or make the valve body live if the earth is faulty. If OL is unfamiliar, see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              A healthy coil measured from a terminal to the valve body on the highest ohms range: OL, meaning
              the resistance is beyond the range. Repeat for the second terminal.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="OL" unit="MΩ" mode="Ω, terminal to body" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A multimeter tests at a low voltage, so it only finds hard faults. Insulation that breaks down only at
          mains voltage needs an insulation resistance tester, which is how electricians check mains coils and
          motors.
        </p>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Reading", "Likely meaning", "Next step"]}
          rows={[
            ["Close to the expected value, body OL", "Coil is probably good", "Check supply voltage and mechanics"],
            ["OL across the terminals", "Open winding or broken lead", "Replace the coil"],
            ["Near 0 Ω, or far below expected", "Shorted winding", "Replace the coil and check the controller output"],
            ["Somewhat low on a DC coil", "Possible shorted turns, or a cold coil", "Compare with a known-good coil"],
            ["Any value from terminal to body", "Insulation failure to metalwork", "Replace the coil; do not re-energise"],
            ["Different value each way round", "Diode or rectifier in the coil or plug", "Measure on the bare coil pins"],
          ]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                The full sequence. A coil that passes both resistance tests moves the search to the supply and
                the valve&apos;s mechanics.
              </>
            }
          >
            <FlowDiagram
              steps={[
                { label: "Isolate", sub: "Power off, prove dead" },
                { label: "Unplug coil", sub: "Nothing in parallel" },
                { label: "Expected Ω", sub: "V² ÷ P (DC)" },
                { label: "Measure coil", sub: "Open, short or OK" },
                { label: "Body test", sub: "Each terminal: OL" },
              ]}
            />
          </Figure>
        </div>
        <KeyIdea title="Good coil, valve still stuck?">
          Then the fault is usually the supply or the valve itself. Check that the rated voltage reaches the coil
          connector when the valve should open. If it does, look for debris, a torn diaphragm or a sticking
          plunger. Many pilot-operated valves also need a minimum pressure difference across them to open, so
          check the valve&apos;s specification if it misbehaves at low pressure. Replace a coil with one of the
          same voltage, AC or DC type, and power rating.
        </KeyIdea>
      </section>

      <section>
        <h2 id="check-the-supply" className="text-xl font-semibold mb-3">Check the voltage that reaches the coil</h2>
        <p className="text-muted leading-7 mb-4">
          A coil that passes the resistance tests cannot open the valve if its supply never arrives. On a
          low-voltage valve, reconnect the coil, set the meter to AC or DC volts to match the coil, and measure
          across the coil connector while the controller is calling for the valve to open. You should see close
          to the coil&apos;s rated voltage. Measure at the coil, not at the controller, so that a broken wire or
          corroded joint in between shows up as a missing voltage.
        </p>
        <p className="text-muted leading-7 mb-4">
          If the voltage is there and the coil is good, the problem is mechanical. If the voltage is missing,
          work back towards the controller: its output terminal, a relay or triac that drives the coil, a fuse,
          or the transformer feeding it. On mains-voltage valves, live voltage checks are work for someone
          trained and equipped for it; the meter must have a CAT rating suited to the circuit.
        </p>
        <p className="text-muted leading-7">
          Some technicians also hold a steel screwdriver near an energised low-voltage coil to feel its magnetic
          pull. That confirms the coil is producing a field, but it says nothing about how strong the field is,
          so treat it as a quick hint rather than a test, and never do it on a mains coil.
        </p>
      </section>

      <section>
        <h2 id="valve-examples" className="text-xl font-semibold mb-3">Irrigation, appliance and industrial valves</h2>
        <p className="text-muted leading-7 mb-4">
          <strong className="text-foreground">Garden irrigation valves</strong> commonly use 24 V AC coils driven by
          a controller. A handy trick is to measure at the controller between a zone&apos;s station terminal
          and the common terminal, with both wires disconnected from the controller: a reading close to the
          coil&apos;s value means the coil and field wiring are intact, while OL points to a break in the cable
          or a failed coil. If none of the zones work, check the controller&apos;s supply; our guide to{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            checking a 24 V transformer
          </Link>{" "}
          covers that.
        </p>
        <p className="text-muted leading-7 mb-4">
          <strong className="text-foreground">Appliance inlet valves</strong>, such as those on washing machines
          and dishwashers, typically have mains-voltage AC coils that read in the kilohm range, and some have
          two or more coils in one body for different water paths. Test each coil separately, and unplug the
          appliance first.
        </p>
        <p className="text-muted leading-7">
          <strong className="text-foreground">Industrial valves</strong> come with coils for many voltages, AC
          and DC, often with a rating plate on the coil. Some AC-supplied coils have a rectifier built in and
          are really DC coils, so they read like a diode in one direction; the manufacturer&apos;s data sheet
          says which type you have.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for solenoid coils</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with an ohms range can test a coil. Because many solenoid valves sit on mains
          circuits, choose a meter with a CAT rating suited to the installation for the voltage checks you
          make before and after. The meters below are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, auto-ranging, CAT III 600V. Best for electricians and serious hobbyists.",
            },
            {
              name: "Klein Tools MM400",
              image: klein.image,
              alt: "Klein Tools MM400 digital multimeter",
              href: "/multimeters/klein-mm400-review",
              note: "Auto-ranging, CAT III 600V. Best for tradespeople and home electrical work.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 digital multimeter",
              href: "/multimeters/fluke-87v-vs-fluke-179",
              note: "6,000-count display for coil ohms and True RMS for the AC supply to the coil. CAT III 1000V / CAT IV 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
