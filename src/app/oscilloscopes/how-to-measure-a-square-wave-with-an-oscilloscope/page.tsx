import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure a square wave with an oscilloscope: read high and low levels, amplitude, period, frequency, duty cycle and 10-90% rise time, step by step.";

export const metadata = buildMetadata({
  title: "How to Measure a Square Wave With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToMeasureASquareWaveWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure a Square Wave With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure a square wave with an oscilloscope, you read two levels and two times: the high
          and low voltages, the period between rising edges, and how fast each edge climbs from 10% to
          90%. Amplitude, frequency and duty cycle all follow from those. This guide works through each
          one on a 0–5 V, 1 kHz example, and shows why a square wave is also the quickest way to spot a
          badly set-up probe.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our reviews.
            The steps here apply to any digital scope. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-the-probe", label: "Check the probe on a square wave" },
        { id: "stable-trace", label: "Get a stable trace" },
        { id: "high-low-amplitude", label: "Read high, low and amplitude" },
        { id: "period-frequency", label: "Measure period and frequency" },
        { id: "duty-cycle", label: "Check the duty cycle" },
        { id: "rise-fall-time", label: "Measure rise and fall time" },
        { id: "auto-measurements", label: "Automatic measurements" },
        { id: "bandwidth-for-square-waves", label: "How much bandwidth you need" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Why does my square wave look rounded on the oscilloscope?",
          a: "The usual causes are an undercompensated 10x probe, a probe left on 1x (which has much less bandwidth), or a square wave too fast for the scope's bandwidth. Adjust the probe trimmer on the calibration output first. If the corners are still round, the circuit's edges may genuinely be slow, for example because of a heavy capacitive load.",
        },
        {
          q: "Should I use AC or DC coupling for a square wave?",
          a: "Use DC coupling. AC coupling passes the signal through a high-pass filter, so a low-frequency square wave shows sloping tops that droop towards the center, and the whole trace moves when the duty cycle changes. DC coupling shows the true high and low levels relative to ground, which is what you want to measure.",
        },
        {
          q: "What frequency square wave can a 50MHz oscilloscope display?",
          a: "It will trigger on and count much faster signals, but the shape suffers. A common rule of thumb is to keep the square wave below about one fifth of the bandwidth so the 3rd and 5th harmonics get through, which means roughly 10MHz on a 50MHz scope. For edge measurements, compare rise times instead: a 50MHz scope's own rise time is about 7 ns.",
        },
        {
          q: "What is the difference between Vpp and Vamp on a square wave?",
          a: "Vpp is the highest sample minus the lowest, so it includes any overshoot or spikes on the edges. Vamp, offered on many scopes, is the settled top level minus the settled base level, which ignores overshoot. On a clean square wave they are nearly equal; a big gap between them means the edges are overshooting or ringing.",
        },
        {
          q: "Can a multimeter measure a square wave?",
          a: "Only partly. On DC volts a meter shows roughly the average, which for a 0–5 V square wave at 50% duty is about 2.5 V. Its AC reading depends on whether it is True-RMS. Some meters also read frequency and duty cycle. None of them show the levels, edges or overshoot, which is what the scope is for.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Signal Overshoot and Ringing",
          desc: "Overshoot percentage, ringing frequency and settling time on the edges of a square wave.",
        },
        {
          href: "/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope",
          title: "How to Measure PWM Duty Cycle With an Oscilloscope",
          desc: "High time, period and the duty percentage, with worked microcontroller examples.",
        },
      ]}
    >
      <Callout title="Safety first: the ground clip connects to mains earth">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip is tied to mains earth through
            the power cord. Clip it only to the circuit&apos;s ground, such as a logic board&apos;s GND
            pin. Clipping it to a point at another voltage shorts that point to earth.
          </li>
          <li>
            Square waves inside switching power supplies and motor drives are often not referenced to
            earth, and on the primary side they sit at mains potential. Use a rated differential probe
            or an isolation transformer on the device under test. Never float the scope by defeating its
            earth connection.
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-the-probe">Check the probe on a known square wave first</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A square wave is the most demanding everyday signal for a probe, because each edge contains
          energy at many frequencies at once. A 10x passive probe has a small trimmer capacitor that
          must be matched to the scope input. If it isn&apos;t, low and high frequencies are attenuated
          by different amounts and the flat tops come out sloped, spiked or rounded, even though the
          real signal is fine. That is why scopes have a square-wave calibration output, and why you
          should clip onto it before measuring anything with sharp edges.
        </p>
        <Figure
          caption={
            <>
              The same 0–5 V square wave at 1 V/div. Left: an overcompensated probe adds a spike at each
              edge that decays smoothly without oscillating. Right: a correctly compensated probe shows
              flat tops. Only the right-hand trace gives trustworthy levels.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="square-over"
              cycles={2}
              amplitude={2.5}
              offset={0.5}
              shift={1}
              labels={{ left: "Overcompensated", right: "0.2 ms/div" }}
            />
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={2.5}
              offset={0.5}
              shift={1}
              labels={{ left: "Compensated", right: "0.2 ms/div" }}
            />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The full adjustment takes a couple of minutes and is covered in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          . While you are there, make sure the channel&apos;s probe setting matches the probe switch
          (1x or 10x) and that the channel is DC coupled. AC coupling makes the tops of a slow square
          wave droop and moves the trace when the duty cycle changes, as explained in{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically" className={link}>
            why an oscilloscope waveform shifts vertically
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="stable-trace">Get a stable trace with two or three cycles</StepHeading>
        <p className="text-muted leading-7">
          Set edge triggering on the rising edge and put the trigger level at roughly the middle of the
          swing, about 2.5 V for a 0–5 V signal. Then turn the time/div knob until two or three full
          cycles fill the screen, and the V/div knob until the swing uses most of the 8 vertical
          divisions. If the trace still rolls or doubles up, our guide to{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            triggering an oscilloscope
          </Link>{" "}
          covers the usual fixes. Two cycles on screen is the sweet spot: enough to see a whole period,
          but zoomed in far enough that each division is worth a small amount of time.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="high-low-amplitude">Read the high level, low level and amplitude</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With DC coupling, every level is read from the channel&apos;s ground marker, the small arrow at
          the left edge of the screen. In the example below the ground marker has been moved 2 divisions
          below the center line so the whole 5 V swing fits at 1 V/div. Count divisions from the marker
          to the flat bottom (the low level) and to the flat top (the high level), then multiply by
          V/div.
        </p>
        <Figure
          caption={
            <>
              A 0–5 V square wave at 1 V/div and 0.2 ms/div, ground marker 2 divisions below center. The
              low level sits on ground (0 V); the top is 5 divisions higher: 5 × 1 V = 5 V. Rising edges
              are 5 divisions apart: 5 × 0.2 ms = 1 ms. The dashed line is the trigger level at 2.5 V.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={2.5}
            offset={0.5}
            shift={1}
            triggerLevel={0.5}
            labels={{ left: "CH1 1 V/div  DC", right: "0.2 ms/div" }}
            marks={[
              { x1: 2.25, y1: 6, x2: 2.25, y2: 1, text: "5 div = 5 V" },
              { x1: 1, y1: 7, x2: 6, y2: 7, text: "5 div = 1 ms" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Amplitude is simply high minus low: 5 V − 0 V = 5 V. Read the levels on the flat parts of the
          waveform, not on the corners, because any overshoot at the edges is a separate feature with
          its own measurement (see{" "}
          <Link
            href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope"
            className={link}
          >
            how to measure overshoot and ringing
          </Link>
          ). A real logic signal rarely sits exactly at 0 V and its supply voltage; a high level a little
          below the rail under load is normal, and the exact output levels are in the driving
          chip&apos;s datasheet. For more on reading levels, see{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="period-frequency">Measure the period and frequency</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The period (T) is the time from one rising edge to the next. Measure it where the edges cross
          the 50% level, because that point is least affected by edge speed. In the figure above the
          rising edges sit 5 divisions apart at 0.2 ms/div, so T = 5 × 0.2 ms = 1 ms and the frequency
          is f = 1 ÷ T = 1 ÷ 1 ms = 1 kHz.
        </p>
        <DataTable
          head={["Measurement", "How to read it", "Example (figure above)"]}
          rows={[
            ["High level", "Ground marker to flat top × V/div", "5 div × 1 V = 5 V"],
            ["Low level", "Ground marker to flat bottom × V/div", "0 div = 0 V"],
            ["Amplitude", "High level − low level", "5 V − 0 V = 5 V"],
            ["Period (T)", "Rising edge to next rising edge × time/div", "5 div × 0.2 ms = 1 ms"],
            ["Frequency (f)", "1 ÷ T", "1 ÷ 1 ms = 1 kHz"],
            ["Duty cycle", "High time ÷ period × 100%", "2.5 div ÷ 5 div = 50%"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4">
          For a more precise number, spread several periods across the screen and divide, or use
          cursors. The full method is in{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="duty-cycle">Check the duty cycle</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A true square wave is high for exactly half of each period, 50% duty. Many signals that look
          square are not, and a clock or PWM output at the wrong duty is a common fault. Measure the
          high time at the 50% level and divide by the period.
        </p>
        <Figure
          caption={
            <>
              Same scales, but this signal is high for only 1 division of each 5-division period: 1 ÷ 5
              = 20% duty, at the same 1 ms period and 1 kHz.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={2}
            amplitude={2.5}
            offset={0.5}
            shift={1}
            labels={{ left: "CH1 1 V/div  DC", right: "0.2 ms/div" }}
            marks={[
              { x1: 1, y1: 0.5, x2: 2, y2: 0.5, text: "1 div" },
              { x1: 1, y1: 7, x2: 6, y2: 7, text: "period 5 div" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Duty cycle gets its own guide, with worked examples and the link to average voltage:{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            how to measure PWM duty cycle with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="rise-fall-time">Measure rise and fall time (10% to 90%)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          No real edge is vertical. Rise time is the time the edge takes to climb from 10% to 90% of the
          amplitude; fall time is the time from 90% back down to 10%. Using 10% and 90% instead of the
          very bottom and top keeps the slow-settling corners out of the number. For a 0–5 V signal the
          10% point is 0.5 V and the 90% point is 4.5 V.
        </p>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Trigger on the rising edge and turn the timebase down until the edge spans several divisions.</li>
          <li>Place one voltage cursor at 0.5 V and another at 4.5 V, or note where those levels fall on the grid.</li>
          <li>Read the time between the two crossings, using time cursors if your scope has them.</li>
        </ol>
        <p className="text-muted leading-7 mb-4">
          Worked example: at 10 ns/div, the edge crosses 0.5 V at 2.0 divisions and 4.5 V at 4.5
          divisions. That is 2.5 divisions × 10 ns = 25 ns rise time. Repeat on the falling edge for
          the fall time; the two are often different.
        </p>
        <KeyIdea title="The scope has a rise time too">
          A scope cannot show an edge faster than its own front end. A common approximation is that the
          scope&apos;s rise time is 0.35 ÷ bandwidth, and that the displayed rise time is roughly the
          square root of (real rise time² + scope rise time²). On a 50MHz scope (about 7 ns), the 25 ns
          reading above means a real edge of about √(25² − 7²) = √576 = 24 ns. Once the edge you are
          measuring approaches the scope&apos;s own rise time, the reading is mostly the scope.
        </KeyIdea>
        <div className="mt-5">
          <DataTable
            head={["Real edge", "Scope bandwidth (rise time)", "Displayed rise time (approx.)"]}
            rows={[
              ["24 ns", "50MHz (≈ 7 ns)", "√(24² + 7²) = 25 ns"],
              ["24 ns", "100MHz (≈ 3.5 ns)", "√(24² + 3.5²) ≈ 24.3 ns"],
              ["5 ns", "50MHz (≈ 7 ns)", "√(5² + 7²) ≈ 8.6 ns"],
              ["5 ns", "100MHz (≈ 3.5 ns)", "√(5² + 3.5²) ≈ 6.1 ns"],
            ]}
            mono={[2]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          The probe matters as much as the scope here: a probe on its 1x setting, or one rated below the
          scope&apos;s bandwidth, slows every edge. Keep the ground lead short, too, or it can add ringing
          that makes the 90% crossing hard to pin down.
        </p>
      </section>

      <section>
        <h2 id="auto-measurements" className="text-xl font-semibold mb-3">Let the scope do the counting</h2>
        <p className="text-muted leading-7 mb-4">
          Most digital scopes calculate all of these from the captured samples. The names and exact
          definitions differ between brands, so check your manual, but these are common:
        </p>
        <DataTable
          head={["Measurement", "What it reports on a square wave"]}
          rows={[
            ["Vmax / Vmin / Vpp", "Highest and lowest samples and their difference, including overshoot"],
            ["Vtop / Vbase / Vamp", "The settled high and low levels and their difference, ignoring overshoot (on many scopes)"],
            ["Period / Frequency", "Time between like edges and its reciprocal"],
            ["+Width / −Width", "High time and low time, usually at the 50% level"],
            ["+Duty", "High time ÷ period"],
            ["Rise / Fall time", "Edge time between 10% and 90%, often adjustable thresholds"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Auto measurements are only as good as the capture. With only part of a cycle on screen, or an
          edge just a few samples wide, the scope may report nothing or an unstable value. Check the
          numbers against the grid at least once, the same way you did above.
        </p>
      </section>

      <section>
        <h2 id="bandwidth-for-square-waves" className="text-xl font-semibold mb-3">How much bandwidth a square wave needs</h2>
        <p className="text-muted leading-7 mb-4">
          An ideal square wave is a sine at the fundamental frequency plus odd harmonics: the 3rd at a
          third of the amplitude, the 5th at a fifth, and so on. A scope that passes only the first few
          harmonics shows rounded corners. A common rule of thumb is a bandwidth of at least five times
          the square wave&apos;s frequency, but for edges the better comparison is rise time, using the
          0.35 ÷ bandwidth approximation explained in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              Fastest edge each scope can display, from rise time ≈ 0.35 ÷ bandwidth: 200kHz gives about
              1.75 µs, 50MHz about 7 ns and 100MHz about 3.5 ns. Log scale.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "FNIRSI DSO152 (200kHz)", value: 1750, display: "≈ 1.75 µs" },
              { label: "Rigol DS1054Z (50MHz)", value: 7, display: "≈ 7 ns" },
              { label: "100MHz scopes", value: 3.5, display: "≈ 3.5 ns", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In practice, a 1 kHz test signal looks square on almost anything, while a microcontroller pin
          with nanosecond edges needs a bench scope to show its real rise time.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for square waves</h2>
        <p className="text-muted leading-7 mb-4">
          For levels, period and duty cycle on slow signals, a pocket unit such as the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz, 1 channel) is enough. For logic and clock edges, look at a bench scope. Compare them
          all in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Suited to hobbyists, students and general electronics.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, for projects that will get more demanding.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
