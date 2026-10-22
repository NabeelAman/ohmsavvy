import Link from "next/link";
import {
  Callout,
  CircuitDiagram,
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

const description =
  "How to test an optocoupler with a multimeter: check the LED in diode mode, check the output transistor, then drive the LED and watch the output switch.";

export const metadata = buildMetadata({
  title: "How to Test an Optocoupler With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-optocoupler-with-a-multimeter",
});

const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestAnOptocouplerWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an Optocoupler With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-an-optocoupler-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test an optocoupler with a multimeter, check its two halves separately and then together. The
          input side is an infrared LED, which you test in diode mode like any other diode. The output side is
          usually a phototransistor, which should block in both directions while the LED is dark. The decisive
          test is powered: drive the LED from a battery through a resistor and watch the output switch on. This
          guide uses the common PC817-type 4-pin part as the example and covers the resistor calculation and
          in-circuit limits.
        </>
      }
      aside={{
        image: unit.image,
        alt: "UNI-T UT139C digital multimeter, front view",
        caption: (
          <>
            The UNI-T UT139C (True RMS, 6,000-count, CAT III 600V) is the budget value pick in our roundup.
            Most meters have a diode mode, but check your manual for its test voltage. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How an optocoupler works" },
        { id: "find-the-pinout", label: "Find the pinout" },
        { id: "test-the-led", label: "Test the LED side in diode mode" },
        { id: "test-the-output", label: "Test the output transistor" },
        { id: "powered-test", label: "Powered test: drive the LED" },
        { id: "reading-the-results", label: "Reading the results" },
        { id: "in-circuit-limits", label: "In-circuit limits" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can a multimeter's diode mode light the optocoupler LED enough to switch the output?",
          a: "Sometimes, but not reliably. Diode mode pushes only a small test current, often around a milliamp, and the output transistor may conduct a little or not at all. Some people try it with a second meter on the output, but a battery and resistor give a known LED current and a far more trustworthy result.",
        },
        {
          q: "What is the current transfer ratio of an optocoupler?",
          a: "The current transfer ratio, or CTR, is the output transistor current divided by the LED current, given as a percentage. A part with a 100 percent CTR passes about 10 mA at the output for 10 mA into the LED under the datasheet test conditions. CTR falls as the LED ages, which is why old optocouplers can fail weakly rather than completely.",
        },
        {
          q: "Can I replace a PC817 with a different optocoupler?",
          a: "Only if the pinout, isolation voltage, CTR range, speed and output type are suitable for the circuit. Many 4-pin phototransistor parts share the PC817 pin arrangement, but CTR grades and ratings differ, and a mains power supply needs a part with the correct safety approvals. Compare both datasheets before swapping.",
        },
        {
          q: "Why does my optocoupler output read low resistance even with the LED off?",
          a: "Out of circuit, that points to a shorted or leaky output transistor, and the part should be replaced. In circuit, the meter is usually measuring through other components connected across the collector and emitter, such as a pull-up resistor or a transistor stage. Lift the part or at least its output pins to be sure.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-diode-with-a-multimeter",
          title: "How to Test a Diode With a Multimeter",
          desc: "Diode mode explained, including forward drop, reverse blocking and LEDs.",
        },
        {
          href: "/multimeters/how-to-measure-milliamps-with-a-multimeter",
          title: "How to Measure Milliamps With a Multimeter",
          desc: "Confirm the LED current in the powered test with the meter in series.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Optocouplers in switch-mode power supplies bridge the mains isolation barrier: one side sits at
            mains potential. Unplug the supply, let the large input capacitor discharge (and confirm it with
            the meter on DC volts) before you touch the board, and test the part out of circuit. Never probe
            a running mains supply&apos;s optocoupler with a hand-held meter.
          </li>
          <li>
            Never connect the LED straight across a battery. Always use a series resistor, or the LED current
            is limited only by the battery and the part will fail.
          </li>
          <li>
            Optocouplers can be damaged by static. Handle them by the body, and work on a bench rather than a
            carpet.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">How an optocoupler works</h2>
        <p className="text-muted leading-7">
          An optocoupler, or opto-isolator, passes a signal across a gap using light. Current through the
          input LED makes infrared light; the light falls on a phototransistor, which conducts between its
          collector and emitter. There is no electrical connection between the two halves, which is why they
          are used to isolate a microcontroller from mains circuits and to carry the feedback signal across a
          power supply&apos;s isolation barrier. Because the output depends on the input, a full test has to
          check each side alone and then the link between them.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="find-the-pinout">Find the pinout from the datasheet</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pin 1 is marked by a dot or notch on the package, and the pins are numbered anticlockwise viewed from
          the top. The datasheet for your exact part number is the authority; the table shows two common
          examples.
        </p>
        <DataTable
          head={["Pin", "PC817-type (4-pin)", "4N35-type (6-pin)"]}
          rows={[
            ["1", "LED anode", "LED anode"],
            ["2", "LED cathode", "LED cathode"],
            ["3", "Emitter", "No connection"],
            ["4", "Collector", "Emitter"],
            ["5", "—", "Collector"],
            ["6", "—", "Base"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          Other output types exist, including Darlington, triac and logic-gate outputs, and they test
          differently. Check the datasheet before assuming a phototransistor output.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="test-the-led">Test the LED side in diode mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Remove the part from the circuit, or lift its pins, and select diode mode. Put the red lead on the
          anode (pin 1) and the black lead on the cathode (pin 2). An infrared LED typically reads about 1.0 to
          1.3 V at the small test current a meter uses, lower than a visible LED. Reverse the leads and the
          meter should show OL. How diode mode works, and why the reading is a voltage, is covered in{" "}
          <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
            how to test a diode with a multimeter
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              A healthy PC817-type input LED in diode mode, red on pin 1 and black on pin 2: 1.12 V, inside the
              typical 1.0 to 1.3 V band. OL in this direction means an open LED; a reading near 0 V means a
              short.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="1.12" unit="V" mode="Diode, pin 1 to pin 2" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="test-the-output">Test the output transistor with the LED dark</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a 4-pin part, measure between collector and emitter in diode mode in both directions, then on the
          highest resistance range. With no light on it, the phototransistor should block both ways: OL, or a
          very high resistance. A low reading in either direction means the output transistor is leaky or
          shorted. Keep the part shaded from strong light while you do this, since the package is not always
          fully opaque to infrared.
        </p>
        <p className="text-muted leading-7">
          A 6-pin part with a base connection lets you check the transistor junctions directly: base to
          emitter and base to collector should each read like a silicon junction in diode mode, typically
          about 0.5 to 0.7 V one way and OL the other, with the red lead on the base for an NPN output. That
          check proves the transistor is intact, but not that the LED&apos;s light reaches it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="powered-test">Powered test: drive the LED and watch the output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Now test the whole coupler. Connect a battery to the LED through a resistor that sets a moderate
          current, typically 5 to 10 mA for a PC817-type part, well under its maximum rating. The resistor
          value follows from Ohm&apos;s law: I = (V − Vf) ÷ R, where Vf is the LED&apos;s forward voltage.
          With a 9 V battery, Vf of about 1.2 V and a 1 kΩ resistor, I = (9 − 1.2) ÷ 1,000 = 7.8 mA.
        </p>
        <DataTable
          head={["Supply", "Resistor", "Calculation (Vf ≈ 1.2 V)", "LED current"]}
          rows={[
            ["3.3 V", "220 Ω", "(3.3 − 1.2) ÷ 220", "≈ 9.5 mA"],
            ["5 V", "470 Ω", "(5 − 1.2) ÷ 470", "≈ 8.1 mA"],
            ["5 V", "330 Ω", "(5 − 1.2) ÷ 330", "≈ 11.5 mA"],
            ["9 V", "1 kΩ", "(9 − 1.2) ÷ 1,000", "7.8 mA"],
            ["12 V", "1.5 kΩ", "(12 − 1.2) ÷ 1,500", "7.2 mA"],
          ]}
          mono={[2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          The resistor&apos;s own power is small at these currents: 7.8 mA through 1 kΩ dissipates I² × R =
          0.0078² × 1,000 ≈ 0.06 W, so an ordinary quarter-watt resistor is fine. If you only have a different
          value to hand, rearrange the formula to check the current before connecting it: R = (V − Vf) ÷ I.
          Aim for the LED current the datasheet uses in its own test conditions where you can, because the
          transfer ratio it quotes applies at that current, and a much lower current may leave a healthy part
          looking weak.
        </p>
        <div className="mt-5">
          <Figure
            caption={
              <>
                To confirm the LED current, put the meter in series on its mA range: with 9 V and 1 kΩ it
                should read close to the calculated 7.8 mA. Near 0 mA means the LED is open or wired
                backwards.
              </>
            }
          >
            <CircuitDiagram
              mode="series"
              meter="mA"
              source="9 V battery"
              load="1 kΩ + LED"
              note="Resistor and opto LED (pin 1 to +, pin 2 to −) in series"
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4 mb-4">
          For the output, give the transistor a load to switch. Connect a second supply, such as 5 V, through a
          4.7 kΩ resistor to the collector, and the emitter to that supply&apos;s negative. Put the meter on DC
          volts across collector (red) and emitter (black). With the LED off it should read close to 5 V.
          Switch the LED on and the reading should fall to a low value, typically a few tenths of a volt or
          less. The collector current here is only about (5 − 0.2) ÷ 4,700 ≈ 1 mA; the PC817 datasheet lists a
          current transfer ratio range starting at 50 percent at 5 mA, so 7.8 mA in the LED is
          plenty to pull the output fully low.
        </p>
        <Figure
          caption={
            <>
              Collector to emitter with the LED driven at 7.8 mA: 0.15 V, against about 5 V with the LED off. A
              clean swing from near the supply to near 0 V is a working optocoupler.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="0.15" unit="V DC" mode="DC V, C to E, LED on" />
          </div>
        </Figure>
        <div className="mt-5">
          <KeyIdea title="Quicker, rougher version">
            Without a second supply, set the meter to ohms and put red on the collector, black on the emitter.
            The meter&apos;s own test current is tiny, but the reading should still drop sharply from OL or a
            very high value when the LED is lit. It shows the output switches, not how well.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="reading-the-results" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Test", "Healthy (typical)", "Fault"]}
          rows={[
            ["LED, diode mode, red on anode", "About 1.0 to 1.3 V", "OL: open LED. Near 0 V: shorted LED"],
            ["LED, diode mode, reversed", "OL", "Any reading: leaky or shorted LED"],
            ["Output C to E, LED off", "OL or very high resistance", "Low reading: leaky or shorted transistor"],
            ["Output with 5 V pull-up, LED off", "Close to 5 V", "Low: transistor shorted or leaky"],
            ["Output with 5 V pull-up, LED on", "A few tenths of a volt or less", "Stays high: dead coupler. Only partly low: weak CTR"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The last row catches the commonest ageing fault. LED output falls over years of use, so an old
          optocoupler can pass every diode-mode check and still pull its output only halfway down. In a power
          supply that can show up as a wrong or unstable output voltage.
        </p>
        <p className="text-muted leading-7 mt-4">
          To judge a weak part, compare it with a new one of the same type in the same test circuit and at the
          same LED current. If the new part pulls the collector to a tenth of a volt or so and the old one
          stops at a volt or two, the old one has lost much of its transfer ratio. Optocouplers are cheap, so
          when a fault has led you to one and it tests marginal, replacing it with the correct part number is
          usually the sensible step. In a power supply, use a part with the same safety approvals and
          isolation rating as the original.
        </p>
      </section>

      <section>
        <h2 id="in-circuit-limits" className="text-xl font-semibold mb-3">In-circuit limits</h2>
        <p className="text-muted leading-7 mb-4">
          In circuit, the meter sees everything connected in parallel with the pins. A resistor across the LED
          or a pull-up on the collector changes the diode-mode and resistance readings, so a low reading
          proves nothing until you lift the part or its pins. The same applies to any semiconductor; the{" "}
          <Link href="/multimeters/how-to-test-a-mosfet-with-a-digital-multimeter" className={link}>
            MOSFET testing guide
          </Link>{" "}
          has more on why, and{" "}
          <Link href="/multimeters/how-to-test-a-transistor-in-circuit-with-a-multimeter" className={link}>
            how to test a transistor in circuit
          </Link>{" "}
          covers the output transistor&apos;s junctions in detail.
        </p>
        <p className="text-muted leading-7">
          On a low-voltage circuit you can test it working instead. With the black lead on the input-side
          ground, the LED&apos;s forward voltage should read about 1.1 to 1.3 V when the circuit drives it and
          near 0 V when it does not. On the output side, with the black lead on the output-side ground, the
          collector should swing between high and low in step. The two halves have separate grounds, so
          always move the black lead to the correct side. Do not do this on the primary side of a mains power
          supply.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Diode mode, DC volts, ohms and a mA range cover every step on this page, and most digital meters have
          all four. A clear display and auto-ranging make the powered test quicker. The meters below come from
          our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup; for general technique see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, auto-ranging, CAT III 600V. True RMS and auto-ranging at a budget price.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, auto-ranging, CAT II 600V. Covers the fundamentals well: the sensible first meter.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
