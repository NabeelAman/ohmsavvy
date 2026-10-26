import Link from "next/link";
import {
  BarChart,
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
  "How to measure a voltage reference with a multimeter: meter accuracy versus reference tolerance, input loading, warm-up, the right ground point and ripple.";

export const metadata = buildMetadata({
  title: "How to Measure a Voltage Reference With a DMM",
  description,
  path: "/multimeters/how-to-measure-a-voltage-reference-with-a-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function HowToMeasureAVoltageReferenceWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure a Voltage Reference With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-a-voltage-reference-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure a voltage reference with a multimeter, set DC volts, put the black probe on the
          reference&apos;s own ground pin and the red probe on its output, let the circuit warm up, and read.
          The hard part is not the connection but the arithmetic: a reference is often specified tighter than
          a handheld meter can measure, so before you call a part out of tolerance you need to compare the
          meter&apos;s accuracy with the reference&apos;s. This guide works through that comparison, plus input
          loading, warm-up, ground drops and ripple.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V industrial digital multimeter, front view",
        caption: (
          <>
            The Fluke 87V (True RMS, CAT III 1000V / CAT IV 600V) adds a 19,999-count high-resolution mode,
            useful when you need more digits on a reference. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-a-voltage-reference", label: "What a voltage reference is" },
        { id: "accuracy-vs-tolerance", label: "Meter accuracy vs reference tolerance" },
        { id: "connect-the-meter", label: "Connect at the right ground point" },
        { id: "input-loading", label: "Meter input impedance and loading" },
        { id: "warm-up", label: "Warm up and keep the temperature steady" },
        { id: "ripple-and-noise", label: "Check ripple and noise" },
        { id: "better-meter", label: "When you need a better meter" },
      ]}
      faq={[
        {
          q: "Why does my 2.5 V reference read 2.48 V?",
          a: "Check the error budget before blaming the part. A 6,000-count meter with a ±(0.5% + 2 counts) spec can be about 14.5 mV out at 2.5 V on its own. Then look for loading by the meter on a high-impedance node, a ground drop between the meter and the reference ground pin, and too little bias current through a shunt reference.",
        },
        {
          q: "Can I use a voltage reference to check my multimeter?",
          a: "Yes, as a sanity check, if the reference is known to be more accurate than the meter. A precision reference with a tight initial tolerance, powered correctly and allowed to settle, gives a known voltage to compare against. It is not a calibration, which needs traceable equipment and covers every range, but it can show a meter that has drifted badly.",
        },
        {
          q: "What is the difference between a series and a shunt voltage reference?",
          a: "A series reference sits between the supply and the load like a small regulator and drives its output directly. A shunt reference, such as the TL431 family, sits across the output like a Zener diode and needs a series resistor from the supply to set its current. Shunt references depend on that resistor and their minimum operating current to regulate properly.",
        },
        {
          q: "Should I measure a voltage reference on the auto or manual range?",
          a: "Either works once the reading is stable, but a manual range avoids the meter hunting between ranges and lets you pick the lowest range that still contains the voltage, which gives the best resolution. On a 6,000-count meter, 2.5 V and 4.096 V both fit the 6 V range with a resolution of 0.001 V.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-accuracy-for-electronics-repair",
          title: "Multimeter Accuracy for Electronics Repair",
          desc: "How ±(% + counts) specs work, resolution versus accuracy, and when accuracy really matters.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "DC volts, ranges and probe placement, step by step for beginners.",
        },
      ]}
    >
      <section>
        <h2 id="what-is-a-voltage-reference" className="text-xl font-semibold mb-3">What a voltage reference is</h2>
        <p className="text-muted leading-7 mb-4">
          A voltage reference is a part that produces a precise, stable DC voltage for other circuits to
          measure against: the full-scale point of an analog-to-digital converter, the setpoint of a power
          supply&apos;s feedback loop, or the threshold of a comparator. Common output values include 1.25 V,
          2.048 V, 2.5 V, 3.0 V, 4.096 V and 5.0 V; values like 2.048 V and 4.096 V are chosen so that a binary
          converter divides them into round millivolt steps.
        </p>
        <p className="text-muted leading-7 mb-4">
          There are two main kinds. A <strong className="text-foreground">series reference</strong> sits
          between the supply and the circuit like a small, very accurate regulator. A{" "}
          <strong className="text-foreground">shunt reference</strong> sits across the output like a Zener
          diode and needs a series resistor to set its current. The TL431 family is the best-known adjustable
          shunt reference: with its reference pin tied to its cathode it regulates at its internal reference
          voltage, about 2.5 V (2.495 V typical on many datasheets), and with a resistor divider it can be set
          higher. A plain Zener diode does a similar shunt job with a much looser tolerance; testing one is
          covered in{" "}
          <Link href="/multimeters/how-to-test-a-zener-diode-with-a-digital-multimeter" className={link}>
            how to test a Zener diode
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Every reference datasheet lists an <em>initial accuracy</em> (the tolerance at 25 °C, often sold in
          grades such as ±0.05%, ±0.1%, ±0.5% or ±1%), a temperature coefficient in parts per million per °C,
          and the operating conditions, including minimum current for shunt types. Those numbers decide what
          your meter needs to be able to see.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="accuracy-vs-tolerance">Compare meter accuracy with the reference tolerance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Meter DC voltage accuracy is specified as ±(% of reading + counts). The percentage scales with the
          voltage; each count is one step of the last digit on the range in use. On a 6,000-count meter&apos;s
          6 V range, one count is 0.001 V. Add both terms to get the band the true value could be in. The specs
          below are illustrative; your manual gives the real figures for each range.
        </p>
        <DataTable
          head={["Meter and range (illustrative spec)", "Reading", "% term", "Counts term", "Total uncertainty"]}
          rows={[
            ["6,000-count, 6 V range, ±(0.5% + 2)", "2.500 V", "12.5 mV", "2 mV", "±14.5 mV (±0.58%)"],
            ["6,000-count, 6 V range, ±(0.5% + 2)", "4.096 V", "20.5 mV", "2 mV", "±22.5 mV (±0.55%)"],
            ["6,000-count, 6 V range, ±(0.1% + 2)", "2.500 V", "2.5 mV", "2 mV", "±4.5 mV (±0.18%)"],
            ["50,000-count, 5 V range, ±(0.025% + 2)", "2.5000 V", "0.625 mV", "0.2 mV", "±0.825 mV (±0.033%)"],
          ]}
          mono={[1, 2, 3, 4]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Now set that against the reference. A 2.5 V reference with ±0.1% initial accuracy may be anywhere
          from 2.4975 V to 2.5025 V, a band of ±2.5 mV. The first meter&apos;s own band is almost six times
          wider than that, so it can only tell you the reference is roughly right. It cannot pass or fail the
          part against its tolerance.
        </p>
        <Figure
          caption={
            <>
              Uncertainty at 2.5 V from the table above, against a ±0.1% reference (±2.5 mV). Only the
              ±0.825 mV meter is tighter than the part, and even it is about 3 times tighter, not 4.
            </>
          }
        >
          <BarChart
            items={[
              { label: "±0.1% reference tolerance", value: 2.5, display: "±2.5 mV", highlight: true },
              { label: "6,000-count, ±(0.5% + 2)", value: 14.5, display: "±14.5 mV" },
              { label: "6,000-count, ±(0.1% + 2)", value: 4.5, display: "±4.5 mV" },
              { label: "50,000-count, ±(0.025% + 2)", value: 0.825, display: "±0.825 mV" },
            ]}
          />
        </Figure>
        <KeyIdea title="Rule of thumb">
          For a meaningful pass/fail check, a common guideline is for the measuring instrument to be around
          four times more accurate than the tolerance being checked. If your meter is not, treat the reading as
          a fault-finding check (is it roughly 2.5 V, or is it 1.8 V?), not a verification. The{" "}
          <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={link}>
            multimeter accuracy guide
          </Link>{" "}
          explains the spec format in more depth.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={2} id="connect-the-meter">Connect at the reference&apos;s own ground pin</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set DC volts and choose the lowest range that holds the voltage. Put the black probe on the
          reference&apos;s ground pin, or the ground pad right next to it, and the red probe on the output pin.
          The meter goes across the reference, in parallel, exactly like any voltage measurement.
        </p>
        <p className="text-muted leading-7 mb-4">
          Make the contact steady. Small SMD references have pins only a fraction of a millimeter apart, so
          a slipping probe can short the output to ground or to the supply pin next to it. Fine-tip probes,
          sprung hook clips or short wires soldered to test pads let you take your hands away and watch the
          reading settle. Lead resistance does not matter here, because the meter draws almost no current
          on DC volts, but a dirty or oxidised pad can make the last digit jump; touch the probe firmly and
          check the reading repeats when you lift it and touch again.
        </p>
        <Figure
          caption={
            <>
              The meter connects directly across the reference, from its output pin to its own ground pin, not
              to a ground somewhere else on the board.
            </>
          }
        >
          <CircuitDiagram
            mode="parallel"
            meter="V"
            source="5 V supply"
            load="2.5 V ref"
            note="Black probe on the reference ground pin, red on its output"
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Why the exact ground point matters: board ground is copper with resistance, and supply current
          flowing through it creates small voltage drops. As an example, 100 mA through a ground path of
          0.05 Ω drops 5 mV, which is twice the whole tolerance of a ±0.1% 2.5 V reference. Measuring from
          the power connector&apos;s ground instead of the reference&apos;s ground pin can add that error to
          your reading. Circuits that use the reference usually connect it to a dedicated analog ground for
          the same reason; measure relative to that.
        </p>
        <Figure
          caption={
            <>
              A 2.5 V reference read on a 6,000-count meter&apos;s 6 V range: 2.498 V. That is inside a ±0.1%
              band (2.4975 V to 2.5025 V), but with ±14.5 mV of meter uncertainty the meter cannot confirm it.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="2.498" unit="V DC" mode="DC V  6 V range" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="input-loading">Check for meter input impedance and loading</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A digital multimeter on DC volts typically has an input impedance of around 10 MΩ; some meters
          differ on certain ranges, so check your manual. On a reference output, which is driven by the
          part, that is harmless: 2.5 V across 10 MΩ draws 0.25 µA. Loading only becomes a problem when you
          measure through a resistance, such as a reference followed by an RC filter, a high-value divider, or
          the REF input of a TL431 fed from a divider.
        </p>
        <DataTable
          head={["Source resistance in front of the meter", "Divider with 10 MΩ", "Reading of a true 2.500 V", "Error"]}
          rows={[
            ["Reference output directly (well under 1 Ω)", "≈ 1", "2.500 V", "Negligible"],
            ["10 kΩ filter resistor", "10 ÷ 10.01", "2.4975 V", "−2.5 mV (−0.1%)"],
            ["100 kΩ filter resistor", "10 ÷ 10.1", "2.4752 V", "−24.8 mV (−0.99%)"],
            ["1 MΩ divider node", "10 ÷ 11", "2.2727 V", "−227 mV (−9.1%)"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          The fix is to measure at a low-impedance point: the reference&apos;s output pin before any filter, or
          the output of the buffer amplifier that often follows it. If you must measure a high-impedance node,
          calculate the loading as above, or use a meter with a high-impedance DC mode if your manual lists one.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="warm-up">Warm up and keep the temperature steady</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Both the reference and the meter drift with temperature. Power the circuit and let it run for a few
          minutes before you take the reading that matters, and give the meter time to settle too if it has
          just come from a cold van or a warm pocket; precision meters often specify a warm-up period. Do not
          hold the board or breathe on the reference while you read.
        </p>
        <p className="text-muted leading-7">
          To see why, multiply out a temperature coefficient: a reference rated 50 ppm/°C at 2.5 V moves
          2.5 V × 50 ÷ 1,000,000 = 125 µV per °C, so a 10 °C change shifts it by 1.25 mV, half the tolerance
          band of a ±0.1% part. A shunt reference adds one more condition: it only regulates above its
          minimum cathode current, often around 1 mA for TL431-style parts (check the datasheet). If the
          series resistor is too large for the supply, the output sags and the reading is low for reasons
          that have nothing to do with the part itself.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="ripple-and-noise">Check ripple and noise</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A meter on DC volts averages over its measurement time, so it shows a steady figure even if the
          reference is noisy or oscillating. Two signs in the DC reading are worth noticing: last digits that
          wander more than usual, and a value that changes when you touch the probe to a slightly different
          spot. Our page on{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>{" "}
          covers the general causes.
        </p>
        <p className="text-muted leading-7">
          For a better look, switch to AC volts on the same points. Many meters have an AC millivolt range
          that shows ripple riding on the DC, though its accuracy and frequency range are limited, so treat it
          as an indicator. Some references need a specific output capacitor to stay stable, and the wrong one
          can make them oscillate, which only an oscilloscope will show properly. See{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage with an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            how to measure the noise floor with an oscilloscope
          </Link>{" "}
          for that step.
        </p>
      </section>

      <section>
        <h2 id="better-meter" className="text-xl font-semibold mb-3">When you need a better meter</h2>
        <p className="text-muted leading-7 mb-4">
          A typical handheld meter is fine for fault-finding: confirming a reference is alive, roughly at its
          marked value and not shorted or collapsed. You need more when you have to verify a part against a
          tight tolerance, trim an adjustable reference to a precise value, or compare boards against each
          other in production. Look at the DC volts accuracy for the range you will use, the display count
          (more counts give a finer last digit) and the calibration status of the meter, since an old,
          uncalibrated meter&apos;s spec is not guaranteed.
        </p>
        <p className="text-muted leading-7 mb-6">
          The meters below are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup. Check each one&apos;s published DC volts accuracy against the table above before relying
          on it for tolerance checks.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "True RMS, CAT III 1000V / CAT IV 600V. The step-up pick for high-resolution readings daily.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V, for field technicians and general electronics work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
