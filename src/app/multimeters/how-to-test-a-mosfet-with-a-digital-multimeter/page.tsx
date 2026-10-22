import Link from "next/link";
import {
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
  "How to test a MOSFET with a digital multimeter: find gate, drain and source, check the body diode in diode mode, then switch it on with gate charge.";

export const metadata = buildMetadata({
  title: "How to Test a MOSFET With a Digital Multimeter",
  description,
  path: "/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToTestAMosfetWithADigitalMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a MOSFET With a Digital Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter"
      category="multimeters"
      intro={
        <>
          To test a MOSFET with a digital multimeter, you use the meter&apos;s diode mode twice: once to
          check the built-in body diode between source and drain, and once to switch the transistor on
          by charging its gate from the meter&apos;s own test voltage. Together those two checks catch
          the common failures, a drain-source short, a damaged gate and an open device, in about a
          minute and with no power supply.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR digital multimeter with test leads, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, CAT III 600V) is the electronics-hobby pick in our
            roundup. Diode-mode test voltages differ between meters, so check your manual. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "n-channel-vs-p-channel", label: "N-channel vs P-channel" },
        { id: "esd-and-discharge", label: "Handle it safely and discharge the gate" },
        { id: "body-diode-check", label: "Check the body diode" },
        { id: "gate-charge-turn-on", label: "Switch it on with gate charge" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "in-circuit-limits", label: "Testing in circuit" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What reading should a good MOSFET show in diode mode?",
          a: "With the probes across the body diode in its forward direction, a healthy power MOSFET usually shows a few tenths of a volt, often somewhere around 0.4 to 0.8 V. In the reverse direction, with the gate discharged, it should read OL. The gate should read OL to both the drain and the source in both directions.",
        },
        {
          q: "Why does my MOSFET read shorted between drain and source?",
          a: "First short the gate to the source and test again, because a charged gate can leave the channel switched on. If the low reading persists out of circuit, the device is shorted, which is the most common way power MOSFETs fail. In circuit, a parallel part such as another MOSFET, a diode or a winding may be the real cause.",
        },
        {
          q: "Can static electricity damage a MOSFET?",
          a: "Yes. The gate is insulated from the channel by a very thin oxide layer, and a static discharge you cannot even feel can puncture it. Damage is not always total; it can leave a gate that leaks or a threshold that has shifted. Touch a grounded metal object first, hold the part by its body and store it in antistatic packaging.",
        },
        {
          q: "Why won't my MOSFET turn on during the multimeter test?",
          a: "The most likely reason is that your meter's diode-mode voltage is lower than the MOSFET's gate threshold, which is common with standard-threshold power parts. Logic-level MOSFETs switch on more easily. It can also mean the gate charge leaked away, you charged the gate with the wrong polarity, or the gate is damaged. Treat a no-turn-on result as inconclusive, not a failure.",
        },
        {
          q: "Can a MOSFET fail open?",
          a: "It can, though shorts are more common. An open MOSFET reads OL across the body diode in both directions and never switches on, often because a bond wire inside the package has burned through after an overload. Physical damage such as a cracked package or a lifted lead gives the same reading, so check the leads and solder joints too.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "How diode mode works, the forward voltages to expect, and how to spot shorted and open diodes.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "The dial, the jacks and every basic measurement, from DC voltage to continuity.",
        },
      ]}
    >
      <Callout title="Before you start: power off, discharge, and mind static">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            MOSFETs are often found in power supplies, motor drivers and inverters. Unplug the equipment
            and make sure large capacitors on the board are discharged before you touch anything. Our{" "}
            <Link href="/multimeters/how-to-test-a-capacitor-with-a-multimeter" className={link}>
              capacitor testing guide
            </Link>{" "}
            explains how to discharge one safely and confirm 0 V.
          </li>
          <li>
            Never take diode or resistance readings on a powered circuit. The meter supplies its own small
            test voltage; an external voltage gives false readings and can damage the meter.
          </li>
          <li>
            The gate is sensitive to static. Touch a grounded metal object before handling a loose
            MOSFET and keep spares in their antistatic packaging.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="n-channel-vs-p-channel" className="text-xl font-semibold mb-3">N-channel vs P-channel, and which pin is which</h2>
        <p className="text-muted leading-7 mb-4">
          This guide covers ordinary enhancement-mode power MOSFETs, the kind used as switches in most
          hobby and repair work. They come in two polarities. An N-channel MOSFET turns on when the gate
          is driven positive relative to the source; a P-channel turns on when the gate is driven
          negative relative to the source. Both have three terminals:
        </p>
        <InfoCards
          items={[
            { label: "Gate (G)", desc: "The control terminal. Insulated from the other two, so it behaves like a tiny capacitor rather than a conductor." },
            { label: "Drain (D)", desc: "One end of the switched channel. On many TO-220 and similar packages the metal tab is also the drain." },
            { label: "Source (S)", desc: "The other end of the channel, and the reference the gate voltage is measured against." },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Pin order is not standardized. Many TO-220 power MOSFETs are gate, drain, source from left to
          right when viewed from the printed side, but plenty are not, so look up the part number on the
          body and check the datasheet before you test. Every power MOSFET also contains a body diode
          between source and drain, a by-product of how it is built. Its direction depends on the
          polarity, and it is the basis of the first test.
        </p>
        <DataTable
          head={["", "N-channel", "P-channel"]}
          rows={[
            ["Turns on when the gate is", "Positive relative to source", "Negative relative to source"],
            ["Body diode points", "From source (anode) to drain (cathode)", "From drain (anode) to source (cathode)"],
            ["Body diode reads forward with", "Red on S, black on D", "Red on D, black on S"],
            ["To charge the gate on", "Black on S, touch red to G", "Red on S, touch black to G"],
            ["To check it switched on", "Red on D, black on S", "Red on S, black on D"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="esd-and-discharge">Handle it safely and discharge the gate</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The gate is separated from the channel by an extremely thin layer of oxide. That insulation is
          what lets a MOSFET switch with almost no gate current, and it is also why a static spark can
          ruin one. Ground yourself, pick the part up by its body, and avoid touching the gate pin with
          a dry fingertip.
        </p>
        <p className="text-muted leading-7">
          Because the gate is insulated, it can hold a charge, and a charged gate may leave the channel
          partly or fully on. That makes a good part look shorted. Before any measurement, briefly
          connect the gate to the source with a probe tip, a pair of metal tweezers or a short wire. Do
          the same between every test step below; it takes a second and removes the most common source
          of confusing readings.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="body-diode-check">Check the body diode in diode mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the dial to diode test, the position marked with the diode symbol, usually shared with
          continuity. If diode mode itself is new to you, our guide to{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            testing a diode with a multimeter
          </Link>{" "}
          explains what the number means. For an N-channel part, put the red probe on the source and the
          black probe on the drain. The body diode is now forward biased and the meter shows its forward
          voltage, typically a few tenths of a volt, often around 0.4 to 0.8 V depending on the part and
          the meter&apos;s test current. Swap the probes and a healthy, discharged MOSFET reads OL.
          For a P-channel part, reverse both probe positions.
        </p>
        <Figure
          caption={
            <>
              An example N-channel result. Left: red on source, black on drain, the body diode reads 0.52 V,
              a typical forward drop. Right: probes swapped with the gate discharged, the channel is off
              and the meter reads OL.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.52" unit="V" mode="Diode: S to D" />
            <MeterReadout value="OL" unit="V" mode="Diode: D to S" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Then check the gate. Gate to source and gate to drain should both read OL in both directions,
          because the gate is insulated from everything else. Any voltage reading or beep involving the
          gate means the oxide has broken down. Some MOSFETs have protection diodes built in between gate
          and source, which do give a diode reading; the datasheet&apos;s internal diagram shows whether
          yours does.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="gate-charge-turn-on">Switch it on with gate charge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The body-diode check proves the junction is intact, but not that the transistor switches. For
          that, use the meter&apos;s diode-mode voltage to charge the gate. For an N-channel MOSFET, put
          the black probe on the source and touch the red probe to the gate for a moment. The gate now
          holds a positive charge relative to the source. Without touching the gate, move the red probe
          to the drain: a working MOSFET now reads close to zero, or beeps, in the direction that read OL
          a minute ago. Short gate to source and it should return to OL.
        </p>
        <Figure
          caption={
            <>
              The gate-charge test for an N-channel part. The drain-to-source reading only changes from OL
              to near zero because of the charge placed on the gate in step 3, and discharging the gate in
              step 5 turns it off again.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Short G to S", sub: "Remove any stored gate charge" },
              { label: "Red D, black S", sub: "Channel off: reads OL" },
              { label: "Black S, red to G", sub: "Charges the gate positive" },
              { label: "Red D, black S", sub: "Channel on: near zero or beep" },
              { label: "Short G to S", sub: "Channel off: OL again" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          For a P-channel MOSFET, reverse the polarities: red probe on the source, touch the black probe to
          the gate to charge it negative, then measure with red on the source and black on the drain.
        </p>
        <Figure
          caption={
            <>
              Example drain-to-source readings on the same N-channel part. Left: before the gate is charged,
              OL. Right: after charging it, 0.005 V, close to zero. The exact on-state figure depends on the
              part and on how fully the meter&apos;s voltage switches it on.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="V" mode="Diode: D to S, gate off" />
            <MeterReadout value="0.005" unit="V" mode="Diode: D to S, gate on" />
          </div>
        </Figure>
        <div className="mt-5">
          <KeyIdea title="This test depends on your meter">
            It only works if the meter&apos;s diode-mode open-circuit voltage is higher than the MOSFET&apos;s
            gate threshold. That voltage is only a few volts and varies widely between meters, and the
            manual usually lists it. Standard power MOSFETs often have thresholds of a few volts, so some
            meters only switch them on partly, giving a reading somewhere between zero and OL. Logic-level
            MOSFETs, designed to switch from microcontroller pins, turn on more readily. If a part passes
            the body-diode check but will not switch, the result is inconclusive; test it in a simple
            circuit with a known gate voltage before you condemn it.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results: shorted, open or healthy</h2>
        <p className="text-muted leading-7 mb-4">
          Power MOSFETs most often fail short, usually between drain and source, after overheating or a
          voltage spike. Gate damage comes next, frequently from static or from a gate driven past its
          rated voltage. The table assumes an N-channel part with the gate discharged before each check;
          swap the probe colours for P-channel.
        </p>
        <DataTable
          head={["What you see", "Likely condition", "Next step"]}
          rows={[
            ["Body diode forward reading, OL reversed, gate OL to D and S, switches on and off", "Healthy", "Look elsewhere for the fault"],
            ["Near zero or beep D to S in both directions, even after shorting G to S", "Shorted drain-source", "Replace; also check what drove it"],
            ["Any reading between gate and drain or gate and source (no built-in gate diode)", "Gate oxide damaged", "Replace"],
            ["OL D to S in both directions and it never switches on", "Open", "Replace; inspect leads and joints first"],
            ["Body diode fine but it will not switch on", "Inconclusive: threshold may be above the meter's voltage", "Retest with a known gate voltage"],
            ["Switches on but stays on after G is shorted to S", "Leaky or damaged channel", "Replace"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A shorted MOSFET is rarely the whole story. Gate driver chips, gate resistors and the load
          itself often fail with it, so check those before fitting a new part and switching on.
        </p>
        <p className="text-muted leading-7 mt-4">
          Know the limits of a pass, too. The meter&apos;s test current is typically around a milliamp, so it says
          nothing about how the part behaves at the amps it carries in service. It cannot measure the
          on-resistance (RDS(on)) at full gate drive, the voltage rating, or how the MOSFET switches at
          speed. A part that passes every check here is very probably sound, but a weakened MOSFET that
          only misbehaves when hot or under full load needs testing in its circuit, or simply replacing
          with the same part number.
        </p>
      </section>

      <section>
        <h2 id="in-circuit-limits" className="text-xl font-semibold mb-3">Testing a MOSFET while it is still in circuit</h2>
        <p className="text-muted leading-7 mb-4">
          A quick in-circuit check can find a dead short, but it cannot pass a part. Three things get in
          the way:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Parallel paths.</strong> Other MOSFETs, diodes, windings
            and resistors connected across drain and source change the readings, the same problem covered
            in{" "}
            <Link href="/multimeters/how-to-measure-resistance-in-a-parallel-circuit" className={link}>
              measuring resistance in a parallel circuit
            </Link>
            . A near-zero reading on one MOSFET in a bridge may be its neighbour.
          </li>
          <li>
            <strong className="text-foreground">Gate pull-down resistors.</strong> Most circuits fit a
            resistor from gate to source so the MOSFET stays off when undriven. It drains the charge
            from the meter almost immediately, so the gate-charge test fails on good parts.
          </li>
          <li>
            <strong className="text-foreground">Gate drivers and capacitance.</strong> A driver chip or
            capacitors on the gate line make the gate readings meaningless.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If an in-circuit drain-source reading is suspiciously low, desolder the MOSFET, or at least lift
          its drain or source, and repeat the full test on the bench. A short that remains with the part
          out of circuit is conclusive. If you see OL where you expected a reading, our page on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers the other causes.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for MOSFET testing</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital multimeter with a diode-test mode can run both checks; the main difference between
          models for this job is the diode-mode test voltage, which decides whether the gate-charge test
          can switch a standard power MOSFET on. Check the manual for that figure. The meters below are
          from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup, and the{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>{" "}
          explains display counts, True RMS and CAT ratings.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging, CAT III 600V. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and auto-ranging with a 6,000-count display and a CAT III 600V rating, at a budget price.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V. Fluke reliability in a smaller body, for field and electronics work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
