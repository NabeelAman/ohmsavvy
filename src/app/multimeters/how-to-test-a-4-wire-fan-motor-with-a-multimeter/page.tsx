import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a 4 wire fan motor with a multimeter: identify ground, 12V, tach and PWM pins, check the supply, read the tach signal and the PWM control line.";

export const metadata = buildMetadata({
  title: "How to Test a 4 Wire Fan Motor With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function HowToTestA4WireFanMotorWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a 4 Wire Fan Motor With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a 4 wire fan motor with a multimeter, you check each of its four connections in turn: that
          the 12 V supply arrives between the power and ground pins, that the tach (sense) wire produces a
          pulsing signal while the blades turn, and that the PWM control wire carries a sensible voltage. On a
          brushless DC fan the windings sit behind a driver chip inside the hub, so a resistance check tells
          you far less than these powered tests. This guide covers the pin functions, each measurement and
          the readings to expect.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter, front view with rotary dial and display",
        caption: (
          <>
            The Fluke 115 (True RMS, auto-ranging, CAT III 600V) includes frequency measurement, which lets
            you read a fan&apos;s tach signal directly. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "pin-functions", label: "The four wires and what they do" },
        { id: "check-the-supply", label: "Check the 12 V supply" },
        { id: "check-the-tach", label: "Check the tach (sense) output" },
        { id: "tach-to-rpm", label: "Convert tach frequency to rpm" },
        { id: "check-the-pwm-line", label: "Check the PWM control line" },
        { id: "resistance-tests", label: "Why resistance tests are limited" },
        { id: "fault-finding", label: "Fault-finding table" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can I run a 4 wire fan without the PWM wire connected?",
          a: "Usually yes. Most 4 wire PC-style fans are designed to run at full speed when the PWM input is left unconnected, because the fan pulls that line high internally. That makes an unconnected PWM wire a useful bench test, but check the fan datasheet, because a few designs behave differently and some stop instead.",
        },
        {
          q: "Can a 4 wire fan plug into a 3 pin header?",
          a: "The standard 4 pin connector is keyed so it fits a 3 pin header, leaving the PWM pin unused. The fan then runs at full speed unless the header lowers its supply voltage to slow it down. Speed control still works on many boards in that voltage mode, though the usable range is narrower than with PWM.",
        },
        {
          q: "Why does my motherboard report 0 rpm while the fan is spinning?",
          a: "The board is not seeing tach pulses. Check the sense wire for a break or a poor crimp in the connector, confirm the fan is plugged into the header the software is reading, and measure the tach pin while the fan runs. A steady 0 V or a steady pull-up voltage with no pulsing points to the fan or the wire.",
        },
        {
          q: "How many pulses per revolution does a PC fan tach give?",
          a: "Two pulses per revolution is the common convention for PC-style fans, and it is the figure motherboards normally assume when they display rpm. Some industrial and special-purpose fans use a different count, so check the datasheet before converting a measured frequency into a speed.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter",
          title: "How to Check a Motor Winding for a Short With a Multimeter",
          desc: "Winding resistance and winding-to-frame tests on motors whose windings you can actually reach.",
        },
        {
          href: "/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope",
          title: "How to Measure PWM Duty Cycle With an Oscilloscope",
          desc: "See the fan's control signal properly, with period, pulse width and duty cycle.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Keep fingers, probe leads and loose wires clear of the blades while a fan is powered. Even small
            fans can nick skin, and larger ones can pull a lead into the blades.
          </li>
          <li>
            This page covers low-voltage DC fans of the kind used in computers, chargers and electronics. Some
            mains AC fan motors also have four wires (speed taps or capacitor leads); they are tested
            differently and with the power isolated (see{" "}
            <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className="text-accent hover:underline">
              how to test a fan motor capacitor
            </Link>
            ). Do not open a computer power supply to test its internal
            fan: its capacitors can hold a dangerous charge after unplugging.
          </li>
          <li>
            When probing a live header, never let a probe bridge two pins. Shorting +12 V onto the tach or PWM
            pin can damage the motherboard or fan controller.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="pin-functions" className="text-xl font-semibold mb-3">The four wires and what they do</h2>
        <p className="text-muted leading-7 mb-4">
          A 4 wire fan is a brushless DC motor with its own driver electronics in the hub. The driver switches
          current through the stator coils, senses the rotor position, reports the speed on one wire and
          accepts a speed command on another. On the common PC-style connector the pin order is ground, +12
          V, tach and PWM, with pin 4 the extra pin that a 3 pin header leaves unused. Wire colours are a convention, not a rule:
          many fans use black, yellow, green and blue, but others differ, so confirm the pinout from the
          fan&apos;s label or datasheet before probing.
        </p>
        <DataTable
          head={["Pin", "Function", "Common colour", "Typical reading (fan running)"]}
          rows={[
            ["1", "Ground", "Black", "0 V reference for every other measurement"],
            ["2", "+12 V supply", "Yellow (or red)", "About 12 V DC to ground"],
            ["3", "Tach / sense output", "Green (or yellow)", "Pulses; DC meter shows roughly half the pull-up voltage"],
            ["4", "PWM control input", "Blue", "Fast pulses, often around 25 kHz; DC meter shows an average"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          Readings in the table are typical for PC-style fans; the fan&apos;s datasheet and the host
          board&apos;s documentation are the authority for any particular unit. Set the meter to DC volts and
          clip the black lead to pin 1 for every powered test that follows. If you are new to the meter
          itself, start with{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="check-the-supply">Check the 12 V supply at the fan</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Leave the fan plugged in and back-probe the connector: slide a thin probe tip into the back of the
          housing alongside the wire until it touches the metal terminal. Red on pin 2, black on pin 1. A
          computer supply&apos;s 12 V rail is specified to stay within about 5 percent, roughly 11.4 to 12.6
          V, and a fan header normally passes that through when set to full speed or PWM mode.
        </p>
        <Figure
          caption={
            <>
              12.04 V between pin 2 and pin 1 with the fan connected and running: the supply is reaching the
              fan. Measure with the fan plugged in, because a header can read correctly unloaded and still sag
              under the fan&apos;s current.
            </>
          }
        >
          <div className="max-w-xs mx-auto">
            <MeterReadout value="12.04" unit="V DC" mode="DC V, pin 2 to pin 1" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          No voltage means the problem is upstream of the fan: the header, a blown fuse or polyfuse, the
          power supply or a header set to a low voltage mode in the board&apos;s settings. To rule the board
          out, power the fan from a bench supply or a 12 V adapter, ideally one with a current limit, using
          only pins 1 and 2. A healthy fan should spin up at full speed. A{" "}
          <Link href="/multimeters/how-to-check-a-12v-power-supply-under-load" className={link}>
            12 V supply check under load
          </Link>{" "}
          confirms the adapter itself is sound.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-the-tach">Check the tach (sense) output while it spins</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The tach output is usually an open-collector transistor in the fan that pulls the line to ground
          twice per revolution. The pull-up resistor that creates the high level is on the motherboard or
          controller, not in the fan, so a fan powered on the bench with nothing on pin 3 shows no signal.
          For a bench test, add a pull-up of a few kilohms from pin 3 to a 5 V supply that shares the
          fan&apos;s ground, or test with the fan on its normal header.
        </p>
        <p className="text-muted leading-7 mb-4">
          On DC volts a spinning fan&apos;s tach pin reads a steady average, often about half the pull-up
          voltage because the pulses are roughly half high and half low; the exact figure varies by fan. Stop
          the blades gently with a non-conductive object and the reading should jump to either near 0 V or
          the full pull-up voltage, depending on where the rotor stops. A reading that never changes points
          to a broken sense wire or a failed tach circuit.
        </p>
        <Figure
          caption={
            <>
              Tach signal with a 5 V pull-up at 2 V/div and 5 ms/div, 0 V on the centre line. The high level
              is 2.5 div × 2 V = 5 V. One period is 4 div × 5 ms = 20 ms, so the frequency is 50 Hz: 1,500
              rpm at two pulses per revolution. A meter on DC volts would show the average, about 2.5 V.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2.5}
            amplitude={1.25}
            offset={1.25}
            labels={{ left: "CH1 2 V/div  DC", right: "5 ms/div" }}
            marks={[
              { x1: 4, y1: 1, x2: 8, y2: 1, text: "4 div = 20 ms" },
              { x1: 1, y1: 4, x2: 1, y2: 1.5, text: "5 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="tach-to-rpm" className="text-xl font-semibold mb-3">Convert tach frequency to rpm</h2>
        <p className="text-muted leading-7 mb-4">
          If your meter has a frequency (Hz) function, put it on the tach pin instead of DC volts and you get
          the speed almost directly. With the usual two pulses per revolution, rpm = frequency × 60 ÷ 2, or
          simply frequency × 30. Not every meter has a Hz range, and those that do have their own minimum
          signal level and frequency limits, so check your manual. Some fans use a different number of
          pulses; the datasheet says.
        </p>
        <DataTable
          head={["Measured tach frequency", "Calculation (2 pulses/rev)", "Fan speed"]}
          rows={[
            ["20 Hz", "20 × 60 ÷ 2", "600 rpm"],
            ["40 Hz", "40 × 60 ÷ 2", "1,200 rpm"],
            ["50 Hz", "50 × 60 ÷ 2", "1,500 rpm"],
            ["66.7 Hz", "66.7 × 60 ÷ 2", "2,000 rpm"],
            ["100 Hz", "100 × 60 ÷ 2", "3,000 rpm"],
          ]}
          mono={[1, 2]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Tach frequency rises in step with speed: 20 Hz at 600 rpm, 40 Hz at 1,200 rpm, 50 Hz at 1,500
                rpm, 66.7 Hz at 2,000 rpm and 100 Hz at 3,000 rpm. Compare your reading with the speed on the
                fan&apos;s label or datasheet.
              </>
            }
          >
            <BarChart
              items={[
                { label: "600 rpm", value: 20, display: "20 Hz" },
                { label: "1,200 rpm", value: 40, display: "40 Hz" },
                { label: "1,500 rpm", value: 50, display: "50 Hz", highlight: true },
                { label: "2,000 rpm", value: 66.7, display: "66.7 Hz" },
                { label: "3,000 rpm", value: 100, display: "100 Hz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A frequency well below the rated speed at full power, or one that wanders, suggests a worn bearing
          dragging the rotor. If you have an oscilloscope, the tach waveform also shows missing or uneven
          pulses that a meter averages away; see{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-the-pwm-line">Check the PWM control line</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The fourth wire carries a fast square wave, commonly around 25 kHz for PC fans, whose duty cycle
          sets the speed: more on-time, faster fan. On most PC-style fans the high level comes from a pull-up
          inside the fan and is around 5 V or less, while the board&apos;s output pulls the line low. That is
          why a bare header pin, with the fan unplugged, may read close to 0 V even when it is working; measure
          with the fan connected, by back-probing pin 4.
        </p>
        <p className="text-muted leading-7 mb-4">
          A DC voltmeter cannot follow 25 kHz, so it shows the average: roughly the duty cycle times the high
          level. With a 5 V high level, 40 percent duty reads about 2 V and 100 percent reads about 5 V. Change
          the fan speed setting in the board&apos;s firmware or the controller and the reading should move
          with it. If it stays fixed while the fan speed changes, the board may be controlling the fan by
          supply voltage instead (watch pin 2 change), or the header may be set to DC mode.
        </p>
        <KeyIdea title="Quick bench check">
          Power the fan from 12 V on pins 1 and 2 only, with pin 4 left unconnected. Most 4 wire fans then run
          at full speed. Briefly tie pin 4 to ground through a 1 kΩ resistor and many will slow to their
          minimum speed or stop, depending on the design. A fan that ignores both has a faulty control input.
          Check the datasheet before relying on either behaviour.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Some meters offer a duty-cycle function, which reads the percentage directly if the meter can handle
          the frequency; check its specified range. For the full picture of period, pulse width and duty, use{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            an oscilloscope on the PWM line
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="resistance-tests" className="text-xl font-semibold mb-3">Why resistance tests are limited on a brushless fan</h2>
        <p className="text-muted leading-7 mb-4">
          On a brushed motor or an AC motor you can measure the windings directly, as covered in{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            how to check a motor winding for a short
          </Link>
          . A 4 wire DC fan is different: the coils connect only to the driver chip, so the meter across pins
          1 and 2 sees the driver&apos;s input circuit, not a winding. The reading varies widely between fans
          and between meters, and may even show OL on the ohms range.
        </p>
        <p className="text-muted leading-7">
          What a resistance check can still catch, with the fan unplugged, is a dead short: a reading near 0 Ω
          between pins 1 and 2 means the driver or a protection part has failed, and that fan will pull its
          header down or blow a fuse. Also spin the blades by hand. They should turn freely and coast; grinding,
          wobble or stiffness is a bearing fault no meter can measure.
        </p>
      </section>

      <section>
        <h2 id="fault-finding" className="text-xl font-semibold mb-3">Fault-finding table</h2>
        <DataTable
          head={["Symptom", "What the meter shows", "Likely cause"]}
          rows={[
            ["Fan does not spin", "0 V on pin 2", "Header, fuse, supply or header voltage setting"],
            ["Fan does not spin", "About 12 V on pin 2", "Seized bearing or failed driver inside the fan"],
            ["Spins, board reads 0 rpm", "Tach pin stuck at 0 V or at the full pull-up voltage", "Broken sense wire, bad crimp or failed tach output"],
            ["Always full speed", "PWM pin steady near its high level", "PWM pin not driven, header in DC mode, or open wire"],
            ["Slow at full power", "12 V present, tach frequency low", "Worn bearing, dust build-up or blocked airflow"],
            ["Header shuts down when connected", "Near 0 Ω between pins 1 and 2 (unplugged)", "Shorted driver or protection component"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use for fan testing</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with DC volts handles the supply, tach and PWM averages. A frequency function makes the
          tach test quicker and a duty-cycle function helps on the PWM line, so check the manual for both
          before you rely on them. The Fluke 115 lists frequency measurement and the Craftsman CMMT14171 lists
          duty-cycle measurement in our review data. More options are in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, auto-ranging, CAT III 600V. The same Fluke reliability as the 117, with capacitance and frequency measurement.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, auto-ranging. Our pick for microcontroller and electronics projects.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, auto-ranging, CAT III 600V. Built specifically for diagnosing cars, not just household wiring.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
