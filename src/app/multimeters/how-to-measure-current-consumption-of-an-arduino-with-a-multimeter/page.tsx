import Link from "next/link";
import {
  BarChart,
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
  "How to measure current consumption of an Arduino with a multimeter: where to break the supply, which range to use, sleep modes and a battery-life estimate.";

export const metadata = buildMetadata({
  title: "How to Measure Arduino Current Consumption",
  description,
  path: "/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter",
});

const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToMeasureCurrentConsumptionOfAnArduinoWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Measure Current Consumption of an Arduino With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To measure the current consumption of an Arduino with a multimeter, you power the board from a
          battery or bench supply instead of USB, break the positive supply lead, and connect the meter in
          series on its milliamp range. The reading tells you how long a battery will run the project, and
          it often reveals that the board itself, not your sketch, is using most of the power. This guide
          covers where to break the circuit, range choice, what the board draws on its own, sleep modes and a
          worked battery-life table.
        </>
      }
      aside={{
        image: astro.image,
        alt: "AstroAI DM6000AR digital multimeter with test leads, front view",
        caption: (
          <>
            The AstroAI DM6000AR (True RMS, 6,000-count, auto-ranging) is the pick for Arduino and Raspberry
            Pi tinkering in our roundup. Current ranges vary between meters, so check your manual. See our{" "}
            <Link href="/multimeters/astroai-dm6000ar-review" className={link}>
              DM6000AR review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "where-to-break", label: "Where to break the circuit" },
        { id: "connect-the-meter", label: "Connect the meter in series" },
        { id: "choose-the-range", label: "Choose the mA or µA range" },
        { id: "what-the-board-draws", label: "What the board itself draws" },
        { id: "sleep-modes", label: "Measure in sleep mode" },
        { id: "usb-inline-meters", label: "USB inline meters" },
        { id: "battery-life", label: "Estimate battery life" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How much current does an Arduino Uno draw?",
          a: "Typically tens of milliamps with a simple sketch running, but the figure depends on the board revision, the supply voltage, whether it is powered through VIN or USB, and what the sketch does. LEDs, sensors and modules add their own current on top. The only reliable number for your project is the one you measure with everything connected.",
        },
        {
          q: "Can I measure Arduino current through the USB cable?",
          a: "Not by cutting into the cable with a multimeter, because breaking the data lines stops the board from talking to the computer. Use a USB inline power meter between the port and the cable, or a breakout that brings out only the 5 V power line. For the most accurate low-current readings, power the board from a battery or bench supply instead.",
        },
        {
          q: "Why does my Arduino reset when I connect the multimeter in series?",
          a: "The meter's internal shunt drops a small voltage, the burden voltage, which grows with current and is larger on low ranges. When the board starts up and draws a burst of current, that drop can pull its supply low enough to reset it. Use the mA range for start-up, or bypass the meter with a jumper until the board settles.",
        },
        {
          q: "Do servos and motors count in an Arduino current measurement?",
          a: "Only if they are powered through the same lead the meter is in. Servos and motors draw large, brief current peaks that can blow a meter's mA fuse and reset the board. Measure them separately on the meter's A range, and power them from their own supply rather than the Arduino's 5 V pin where possible.",
        },
        {
          q: "Can I use a USB power meter instead of a multimeter?",
          a: "For a quick look, yes. An inline USB power meter shows voltage and current on the cable, but its reading includes the USB-serial chip, regulator and power LED, and many units resolve only whole milliamps, which hides sleep currents entirely. A multimeter in series with the supply rail on the right range is still needed for microamp sleep figures and battery-powered designs.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-standby-current-in-an-electronic-device",
          title: "How to Measure Standby Current in an Electronic Device",
          desc: "Burden voltage, wake-up bursts and the shunt-and-scope method for very low sleep currents.",
        },
        {
          href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
          title: "Best Oscilloscope for Arduino Projects",
          desc: "Scopes suited to microcontroller signals, and to seeing current pulses a meter cannot follow.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            In a current range the meter is close to a short circuit. Never touch the probes across a battery
            or the board&apos;s supply pins; it will blow the meter&apos;s fuse and can overheat a lithium
            cell.
          </li>
          <li>
            Make and change every connection with the power off, and use clip leads rather than hand-held
            probes so nothing slips between pins.
          </li>
          <li>
            Feeding the 5V pin directly bypasses the board&apos;s regulator and its protection. Use only a
            regulated 5 V supply there, and never connect USB and an external 5 V supply at the same time.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="where-to-break">Decide where to break the circuit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Current is measured in series, so the meter must replace a piece of the wire that feeds the board.
          Where you break it decides what you measure. Pick a point that carries all of the current you care
          about and nothing else, and remove every other power path, including the USB cable.
        </p>
        <DataTable
          head={["Break point", "What it measures", "Notes"]}
          rows={[
            ["Battery positive into VIN or the barrel jack", "Whole board including its regulator", "Closest to real battery operation"],
            ["Regulated 5 V supply into the 5V pin", "Board without the onboard regulator", "Regulated 5 V only; never with USB connected"],
            ["Battery lead of a 3.3 V or LiPo board", "Whole board from its battery connector", "Typical for small low-power boards"],
            ["Supply lead to one module or sensor", "That module only", "Useful for finding the hungry part"],
            ["USB cable", "Not with a multimeter", "Use a USB inline meter instead"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="connect-the-meter">Connect the meter in series</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With everything off, plug the black lead into COM and the red lead into the meter&apos;s mA jack
          (some meters label it µA/mA). Clip the red lead to the battery positive and the black lead to the
          wire that goes to VIN. The negative lead goes straight from the battery to the board&apos;s GND as
          normal. Turn the meter to DC mA, then switch on. The jacks, fuses and series hookup are covered in
          more depth in{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              The meter sits in the positive lead between the 9 V battery and the board&apos;s VIN pin, so the
              whole board&apos;s current, regulator included, flows through it. Ground goes directly from the
              battery to GND.
            </>
          }
        >
          <CircuitDiagram
            mode="series"
            meter="mA"
            source="9 V battery"
            load="Arduino"
            note="Red lead to battery +, black lead to VIN; GND wired directly"
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="choose-the-range">Choose the mA or µA range</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A running board with no sleep code usually draws milliamps, so start on the mA range. If the
          project drives motors, servos, relays or a strip of LEDs from the same supply, start on the A range
          instead and move down only once you know the peak is safely below the mA range&apos;s maximum,
          which your manual lists. Only switch to a µA range, if your meter has one, after the board is
          asleep and drawing well under a milliamp.
        </p>
        <p className="text-muted leading-7">
          Lower ranges have higher burden voltage, the small drop across the meter&apos;s internal shunt.
          At start-up the board can draw enough current for that drop to reset it, which is why sleep
          measurements often need a bypass jumper. The full explanation and the jumper trick are in our
          guides to{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            measuring microamps
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="what-the-board-draws" className="text-xl font-semibold mb-3">What the board itself draws</h2>
        <p className="text-muted leading-7 mb-4">
          A development board is built for convenience, not battery life. Even with an empty sketch, several
          parts use power whether your code needs them or not. How much each one takes depends on the board
          and its revision, so the table describes where current goes rather than giving fixed numbers;
          check the schematic for your board and the datasheet for each part.
        </p>
        <DataTable
          head={["Part on the board", "Why it draws current", "What you can do"]}
          rows={[
            ["Power LED", "Lit whenever the board has power, typically a few mA", "Remove it or its resistor on battery builds"],
            ["Linear voltage regulator", "Its own quiescent current, plus the voltage it burns as heat", "Choose a low-quiescent regulator or feed the board directly"],
            ["USB-to-serial chip", "Powered on many boards even with no USB cable", "Use a board without one for battery projects"],
            ["Microcontroller (awake)", "Runs continuously at full clock speed", "Use sleep modes between tasks"],
            ["Your modules and sensors", "Often powered all the time", "Switch them off, or power them from a pin when allowed"],
          ]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                An example reading for a full-size board running a simple sketch from a 9 V battery through VIN:
                45.2 mA. Your figure will differ with the board, supply voltage and sketch, which is exactly why
                it is worth measuring.
              </>
            }
          >
            <div className="max-w-xs mx-auto">
              <MeterReadout value="45.2" unit="mA DC" mode="DC mA, running" />
            </div>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A reading like this mostly reflects the board, not the microcontroller. That is why small boards with
          no USB chip and a removable power LED are popular for battery projects: the chip can sleep at a tiny
          fraction of a milliamp, according to its datasheet, but only if the rest of the board lets it.
        </p>
        <p className="text-muted leading-7 mt-4">
          The supply voltage changes the picture less than you might expect. A linear regulator passes roughly
          the same current in as the board takes out, and turns the extra voltage into heat. A board fed 9 V
          through VIN therefore draws about the same milliamps as it would from 7 V, but wastes more power doing
          it. That is why the battery-life estimate below works in milliamps and milliamp-hours: what matters is
          the current leaving the battery, at whatever voltage the battery supplies.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="sleep-modes">Measure the board in sleep mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          To measure sleep current, upload a sketch that puts the microcontroller to sleep, for example using
          the power-down mode available on AVR-based boards through the avr/sleep.h library, or a low-power
          library for your board. Disconnect USB, start the board through the mA range, and wait until the
          reading drops and stays down. Then move to the µA range if needed, using the bypass jumper so the
          board does not reset.
        </p>
        <KeyIdea title="Read the floor, not the jumps">
          If the sketch wakes on a timer to read a sensor, the display will jump each time it wakes. The steady
          low value between jumps is the sleep current. A meter cannot properly average short wake-up bursts;
          to measure those, use a small shunt resistor and an oscilloscope, as described in the{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            standby current guide
          </Link>
          .
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          If sleep current is far higher than the microcontroller datasheet suggests, the board&apos;s
          regulator, LED, USB chip or a powered module is the usual reason. Remove or disconnect them one at a
          time and watch the reading fall.
        </p>
      </section>

      <section>
        <h2 id="usb-inline-meters" className="text-xl font-semibold mb-3">USB inline meters as an alternative</h2>
        <p className="text-muted leading-7">
          For a quick figure while the board is plugged into a computer, a USB inline power meter plugs between
          the USB port and the cable and displays voltage and current without breaking anything. It is the
          easy way to see how much a running board takes from USB. Most read in steps of a milliamp or more and
          update slowly, so they are not suited to sleep currents measured in microamps; check the resolution
          on yours. They also measure the USB 5 V path, which bypasses the regulator a battery-powered build
          would use, so the figure can differ from battery operation.
        </p>
      </section>

      <section>
        <h2 id="battery-life" className="text-xl font-semibold mb-3">Estimate battery life from your reading</h2>
        <p className="text-muted leading-7 mb-4">
          Battery life in hours is the battery capacity in milliamp-hours divided by the average current in
          milliamps. The rows below use a 2,000 mAh battery and illustrative currents; substitute your own
          measured values.
        </p>
        <DataTable
          head={["Board state (illustrative)", "Average current", "Calculation", "Estimated life"]}
          rows={[
            ["Full-size board, running", "45 mA", "2,000 ÷ 45", "≈ 44 h"],
            ["Small board, running", "15 mA", "2,000 ÷ 15", "≈ 133 h ≈ 5.6 days"],
            ["Small board, sleeping, LED on", "2 mA", "2,000 ÷ 2", "1,000 h ≈ 42 days"],
            ["Small board, sleeping, LED removed", "0.1 mA (100 µA)", "2,000 ÷ 0.1", "20,000 h ≈ 2.3 years"],
          ]}
          mono={[1, 2, 3]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                The same 2,000 mAh battery at four average currents: about 44 h at 45 mA, 133 h at 15 mA, 1,000 h
                at 2 mA and 20,000 h at 0.1 mA. Sleep modes and removing always-on parts make the biggest
                difference.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "45 mA, full-size running", value: 44, display: "≈ 44 h" },
                { label: "15 mA, small board", value: 133, display: "≈ 133 h" },
                { label: "2 mA, asleep, LED on", value: 1000, display: "1,000 h" },
                { label: "0.1 mA, asleep, LED off", value: 20000, display: "20,000 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Treat the result as an upper limit. Usable capacity falls in the cold and at high currents, the board
          may stop working before the battery is fully drained, and wake-ups raise the average above the sleep
          floor. Batteries also lose charge on their own over long periods; the battery datasheet gives the
          conditions behind its rated capacity.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common mistakes that skew the reading</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">A second power path.</strong> A USB cable, a USB-serial adapter
            or a programmer left connected can feed the board through its own pins, so the meter sees only part
            of the current, or none.
          </li>
          <li>
            <strong className="text-foreground">A reading of zero.</strong> Usually a blown mA fuse in the meter,
            the red lead still in the V/Ω jack, or the dial on volts. Check the fuse before blaming the board;
            our guide to{" "}
            <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
              measuring milliamps
            </Link>{" "}
            shows how.
          </li>
          <li>
            <strong className="text-foreground">Too coarse a range.</strong> On the A range a 45 mA board may show
            as 0.04 or 0.05 A, and a sleeping board as 0.00. Move down a range once you know the peak is safe.
          </li>
          <li>
            <strong className="text-foreground">Forgetting the peripherals.</strong> A display backlight, a radio
            module or a sensor heater can draw more than the board. Note what was connected with each reading.
          </li>
          <li>
            <strong className="text-foreground">Reading once.</strong> Current changes with what the sketch is
            doing. Note the figure in each state, such as idle, sensing, transmitting and sleeping, and how long
            the board spends in each.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for Arduino current</h2>
        <p className="text-muted leading-7 mb-6">
          For Arduino work, the deciding features are the current ranges: a mA range for running boards, ideally
          a µA range for sleep, and fuses on both. Check the manual&apos;s current specifications rather than the
          headline features. The meters below are from our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup. If you also want to see current pulses on a screen, our{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
            oscilloscope picks for Arduino projects
          </Link>{" "}
          cover that side.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. The go-to recommendation for Arduino and Raspberry Pi tinkering.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS and auto-ranging with a 6,000-count display and a CAT III 600V rating, at a budget price.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS and auto-ranging, CAT II 600V. Best for home use and beginners: the sensible first meter.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
