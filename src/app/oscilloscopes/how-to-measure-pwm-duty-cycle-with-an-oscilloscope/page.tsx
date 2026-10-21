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
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure PWM duty cycle with an oscilloscope: trigger on the rising edge, read high time and period in divisions, use cursors and auto measurements.";

export const metadata = buildMetadata({
  title: "Measure PWM Duty Cycle With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

export default function HowToMeasurePwmDutyCycleWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure PWM Duty Cycle With an Oscilloscope"
      description={description}
      published="2026-10-21"
      path="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure PWM duty cycle with an oscilloscope, you capture a stable view of the pulse train,
          measure how long each pulse stays high and how long one full cycle takes, and divide the
          first by the second. A pulse that is high for 200 µs out of every 1 ms has a 20% duty cycle.
          This guide covers the setup, triggering on the rising edge, reading the times from
          divisions, cursors and automatic measurements, and how duty cycle turns into average voltage.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 compact two-channel digital oscilloscope with built-in waveform generator",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) pairs an oscilloscope with a waveform
            generator in one compact unit. Any digital scope can measure duty cycle with the steps
            below; see our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-duty-cycle-is", label: "What duty cycle means" },
        { id: "connect-and-scale", label: "Connect and scale the signal" },
        { id: "trigger-rising-edge", label: "Trigger on the rising edge" },
        { id: "measure-with-divisions", label: "Measure with divisions" },
        { id: "cursors-and-auto", label: "Cursors and auto measurements" },
        { id: "worked-examples", label: "Worked examples" },
        { id: "average-voltage", label: "Duty cycle and average voltage" },
        { id: "microcontroller-example", label: "A microcontroller PWM example" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can a multimeter measure PWM duty cycle?",
          a: "Some can. Many digital multimeters have a duty cycle or percent function on the frequency range, which works on clean, ground-referenced signals within the meter's frequency limit. Check your meter's manual. A meter only gives a number, though; a scope also shows the pulse shape, slow edges, ringing and glitches that can make that number misleading.",
        },
        {
          q: "What is the difference between positive and negative duty cycle?",
          a: "Positive duty cycle is the high time divided by the period, and negative duty cycle is the low time divided by the period, so the two always add up to 100%. Which one matters depends on the circuit: if a driver turns the load on when its input is low, the negative duty cycle is the on-time.",
        },
        {
          q: "Does PWM frequency affect the duty cycle reading?",
          a: "Not in principle, because duty cycle is a ratio. In practice it matters when the pulses get short compared with the edges. If the rise and fall times are a noticeable fraction of the high time, where you measure on the edge changes the answer, so measure at the 50% level and use enough bandwidth and sample rate.",
        },
        {
          q: "Why does my scope show no duty cycle reading at 0% or 100%?",
          a: "At 0% the output stays low and at 100% it stays high, so there are no edges. With no edges, the scope cannot find a period or a pulse width, and most scopes show the measurement as invalid or blank. The flat line itself is the answer: confirm its level against the ground marker.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "Period from divisions, f = 1/T, and the accuracy tips that also apply to PWM timing.",
        },
        {
          href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
          title: "Best Oscilloscope for Arduino Projects",
          desc: "Scopes suited to microcontroller signals such as PWM, I2C, SPI and UART.",
        },
      ]}
    >
      <Callout title="Safety first: know where the ground clip goes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe ground clip is connected to mains earth. Clip it
            only to the circuit&apos;s ground, such as a microcontroller board&apos;s GND pin. Clipping it
            to a point at another voltage shorts that point to earth.
          </li>
          <li>
            PWM that drives motors, heaters or lamps can switch high currents, and a high-side switch
            node is not referenced to ground. Probe the low-voltage control signal where you can, or
            use a differential probe. Never float the scope by removing its earth connection.
          </li>
          <li>
            If the PWM controller is on the mains side of a power supply, use an isolation transformer
            on the device under test or a rated differential probe.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-duty-cycle-is" className="text-xl font-semibold mb-3">What duty cycle means</h2>
        <p className="text-muted leading-7 mb-4">
          Pulse-width modulation (PWM) switches a signal between two levels at a fixed frequency and
          varies how long it stays high in each cycle. Duty cycle is that high time as a fraction of
          the whole period.
        </p>
        <KeyIdea title="The formula">
          Duty cycle = high time ÷ period × 100%. The period is the time from one rising edge to the
          next, and the frequency is 1 ÷ period. A signal that is high for 200 µs in every 1 ms is at
          200 ÷ 1000 = 20% duty and 1 ÷ 1 ms = 1kHz.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="connect-and-scale">Connect the probe and scale the signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Clip the probe ground to the circuit ground and touch the tip to the PWM output. Set the
          probe switch and the channel&apos;s probe ratio to match (10x is normal). Then:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Use DC coupling.</strong> AC coupling removes the DC
            level, so the trace floats around the centre line and the true 0 V and high levels are lost.
            On a PWM signal whose average changes with duty, the trace even shifts as the duty changes.
          </li>
          <li>
            <strong className="text-foreground">Set V/div</strong> so the full swing fills several
            divisions: 2 V/div puts a 0-5 V signal at 2.5 divisions, 1 V/div suits 3.3 V logic.
          </li>
          <li>
            <strong className="text-foreground">Set the timebase</strong> for two or three full cycles
            on screen. Too slow and each pulse is a thin sliver you can&apos;t time accurately.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If the screen controls are new to you, the{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            first-session guide to using an oscilloscope
          </Link>{" "}
          covers them, and{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope screen
          </Link>{" "}
          explains the grid.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="trigger-rising-edge">Trigger on the rising edge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set an edge trigger on the PWM channel, slope rising, with the level at about half the high
          voltage: 2.5 V for 5 V logic, around 1.65 V for 3.3 V. Each capture now starts on a rising
          edge, so every pulse lines up in the same place and the trace stands still. With the trigger
          point at the centre of the screen, a rising edge sits on the centre line and the high time
          extends to its right.
        </p>
        <Figure
          caption={
            <>
              A 0-5 V PWM signal at 2 V/div and 200 µs/div, triggered on the rising edge at 2.5 V (T).
              The pulse is high for 1 division (200 µs) out of a 5-division period (1 ms): 1 ÷ 5 = 20%
              duty at 1kHz.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={2}
            amplitude={1.25}
            offset={1.25}
            triggerLevel={1.25}
            labels={{ left: "CH1 2 V/div  DC", right: "200 µs/div" }}
            marks={[
              { x1: 5, y1: 1, x2: 6, y2: 1, text: "1 div = 200 µs" },
              { x1: 0, y1: 5, x2: 5, y2: 5, text: "5 div = 1 ms" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If the trace still drifts, the trigger level is probably outside the signal or the mode is
          wrong; the{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            trigger guide
          </Link>{" "}
          has a fix list. If the duty cycle is changing as you watch, as it does on a fading LED or a
          speed-controlled motor, press Single or Stop to freeze one capture.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure-with-divisions">Measure high time and period with divisions</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Measure both times at the 50% level, halfway up each edge, so slow edges don&apos;t bias the
          result. Count the horizontal divisions for the high part of one pulse, then for one full
          period from rising edge to rising edge, and multiply each by the time/div setting.
        </p>
        <p className="text-muted leading-7">
          Worked example from the screen above: high time = 1 div × 200 µs/div = 200 µs. Period = 5 div ×
          200 µs/div = 1 ms. Duty cycle = 200 µs ÷ 1 ms = 20%, and frequency = 1 ÷ 1 ms = 1kHz. You
          don&apos;t even need the time/div setting for the duty cycle alone: it is simply 1 division
          out of 5. You do need it for frequency, which is covered in more depth in{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="cursors-and-auto">Use cursors and automatic measurements</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Division counting is limited to about a fifth of a division. For better resolution, place
          the two vertical time cursors on the 50% points of the rising and falling edges to read the
          high time as Δt, then move the second cursor to the next rising edge to read the period.
          Most digital scopes also measure duty cycle directly. Names vary between brands, so check
          your manual, but these are common:
        </p>
        <DataTable
          head={["Measurement", "What it reports"]}
          rows={[
            ["+Duty (positive duty)", "High time ÷ period, as a percentage"],
            ["-Duty (negative duty)", "Low time ÷ period; +Duty and -Duty add to 100%"],
            ["+Width (positive pulse width)", "Time the signal stays above the middle level"],
            ["Period / Freq", "Time between matching edges, and 1 ÷ that time"],
            ["Rise / Fall time", "Edge speed, usually 10% to 90%; useful when pulses are short"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Automatic measurements work best with at least one full cycle on screen, and preferably
          several. If the result jumps around, add cycles to the screen or enable measurement
          statistics where your scope offers them.
        </p>
      </section>

      <section>
        <h2 id="worked-examples" className="text-xl font-semibold mb-3">Worked examples</h2>
        <p className="text-muted leading-7 mb-4">
          The same method at different timebases and logic levels. The average voltage column assumes
          an ideal PWM signal, explained in the next section.
        </p>
        <DataTable
          head={["Time/div", "Period", "High time", "Frequency", "Duty", "Average (ideal)"]}
          rows={[
            ["200 µs/div", "5 div = 1 ms", "1 div = 200 µs", "1kHz", "20%", "0.20 × 5 V = 1 V"],
            ["50 µs/div", "4 div = 200 µs", "3 div = 150 µs", "5kHz", "75%", "0.75 × 3.3 V ≈ 2.48 V"],
            ["10 µs/div", "5 div = 50 µs", "2 div = 20 µs", "20kHz", "40%", "0.40 × 12 V = 4.8 V"],
            ["0.5 ms/div", "4 div = 2 ms", "0.5 div = 250 µs", "500Hz", "12.5%", "0.125 × 5 V = 0.625 V"],
          ]}
          mono={[4, 5]}
        />
      </section>

      <section>
        <h2 id="average-voltage" className="text-xl font-semibold mb-3">Duty cycle and average voltage</h2>
        <p className="text-muted leading-7 mb-4">
          For an ideal PWM signal that switches between 0 V and a high level, the average voltage is
          duty cycle × high level. The 20% signal above averages 0.2 × 5 V = 1 V. This is why PWM can
          dim an LED or slow a motor: the load responds to the average. Real signals are close but not
          exact, because the low level may sit slightly above 0 V, the high level may sag under load
          and the edges take time.
        </p>
        <Figure
          caption={
            <>
              Left: the 20% duty, 0-5 V signal from step 2. Right: the 1 V average a multimeter on its DC
              voltage range would ideally show for it (0.2 × 5 V). The meter sees only the average; the
              scope shows how it is made up.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="pulse"
              cycles={2}
              amplitude={1.25}
              offset={1.25}
              labels={{ left: "CH1 2 V/div  DC", right: "200 µs/div" }}
              marks={[{ x1: 5, y1: 1, x2: 6, y2: 1, text: "20% high" }]}
            />
            <MeterReadout value="1.00" unit="V DC" mode="DC V" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-5 mb-5">
          Many meters read close to this average on a fast PWM signal, though some are confused by the
          edges, so treat the meter reading as a cross-check. The scope&apos;s own mean or average
          measurement, taken over whole cycles, does the same job. Across the duty range, a 0-5 V
          signal averages:
        </p>
        <Figure
          caption={
            <>
              Ideal average voltage of a 0-5 V PWM signal at each duty cycle: duty × 5 V. The highlighted
              20% bar matches the example above (1 V).
            </>
          }
        >
          <BarChart
            items={[
              { label: "10% duty", value: 0.5, display: "0.5 V" },
              { label: "20% duty", value: 1, display: "1 V", highlight: true },
              { label: "25% duty", value: 1.25, display: "1.25 V" },
              { label: "50% duty", value: 2.5, display: "2.5 V" },
              { label: "75% duty", value: 3.75, display: "3.75 V" },
              { label: "100% duty", value: 5, display: "5 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="microcontroller-example" className="text-xl font-semibold mb-3">A microcontroller PWM example</h2>
        <p className="text-muted leading-7 mb-4">
          Many microcontroller boards set PWM with an 8-bit value, where 0 means always off and 255
          means always on, and the duty cycle is the value ÷ 255. Check your platform&apos;s
          documentation, because resolution and the default PWM frequency vary between boards and
          pins. On a 5 V board:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            A value of 64 gives 64 ÷ 255 ≈ 25.1% duty, which averages about 0.251 × 5 V ≈ 1.25 V. On the
            scope, the pulse is high for about a quarter of each period.
          </li>
          <li>
            A value of 191 gives 191 ÷ 255 ≈ 74.9%, about 3.75 V average.
          </li>
          <li>
            Values of 0 and 255 produce a flat line at 0 V or 5 V with no edges, so automatic duty and
            frequency measurements have nothing to measure.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If the measured duty doesn&apos;t match what the code asks for, look for an inverted output,
          a timer shared with another function, or a pin that doesn&apos;t support hardware PWM. A
          second channel on the scope helps here: trigger on one PWM output and compare it with another.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for PWM measurements</h2>
        <p className="text-muted leading-7">
          PWM frequencies on hobby boards are usually low by scope standards, so almost any scope can
          measure duty cycle. The pocket{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz bandwidth, 1 channel) is enough for basic checks on low-frequency PWM. Bench scopes
          such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz, 4 channels) and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>{" "}
          (100MHz, 2 channels) add the channels to compare several PWM outputs, or PWM against the
          signal it drives, and the bandwidth to see edges on faster switching. For power converters
          that use PWM, see{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className={link}>
            oscilloscope bandwidth for switching power supplies
          </Link>
          . Compare all the picks in{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>
          .
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Scopes for PWM work in our reviews"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s. Four channels at this price is rare.",
              },
              {
                name: "Hantek DSO2D10",
                image: hantek.image,
                alt: "Hantek DSO2D10 compact two-channel oscilloscope with waveform generator",
                href: "/oscilloscopes/hantek-dso2d10-review",
                note: "100MHz, 2 channels, 1 GSa/s, plus a built-in waveform generator in a compact footprint.",
              },
              {
                name: "FNIRSI DSO152",
                image: fnirsi.image,
                alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
                href: "/oscilloscopes/fnirsi-dso152-review",
                note: "200kHz, 1 channel, 2.5 MSa/s, pocket-sized: for basic diagnostics, not a bench replacement.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
