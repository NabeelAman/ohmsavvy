import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure frequency with an oscilloscope: read the period from the grid, use f = 1/T, check it with cursors and auto measurements, and avoid common errors.";

export const metadata = buildMetadata({
  title: "How to Measure Frequency With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

export default function HowToMeasureFrequencyWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Frequency With an Oscilloscope"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure frequency with an oscilloscope, you measure the time one cycle takes (the period, T)
          by counting horizontal divisions, then calculate frequency as f = 1/T. The scope can also do
          this for you with cursors or an automatic frequency readout. This guide walks through the manual
          method with worked examples, then shows how to check it with the scope&apos;s own tools and how
          to avoid the mistakes that produce wrong numbers.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            Any digital scope, including the 50MHz, 4-channel Rigol DS1054Z, can measure frequency by
            divisions, cursors or auto measurement. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "period-and-frequency", label: "Period and frequency: f = 1/T" },
        { id: "stable-trace", label: "Get a stable trace" },
        { id: "count-divisions", label: "Count divisions in one period" },
        { id: "calculate-frequency", label: "Multiply by time/div, then 1/T" },
        { id: "measure-several-periods", label: "Measure several periods" },
        { id: "cursors-and-auto", label: "Check with cursors and auto" },
        { id: "common-errors", label: "Common measurement errors" },
        { id: "accuracy", label: "How accurate is the reading?" },
        { id: "picking-a-scope", label: "Picking a scope for frequency work" },
      ]}
      faq={[
        {
          q: "Can an oscilloscope measure frequency automatically?",
          a: "Yes. Most digital scopes have a measure menu that calculates frequency and period from the captured waveform and updates the value live. It works best on a clean, steady signal with a stable trigger and at least one full cycle on screen, ideally two to five. It is still worth checking the number once by counting divisions, so you know the reading makes sense.",
        },
        {
          q: "How do you convert time per division to frequency?",
          a: "Multiply the number of horizontal divisions in one cycle by the time/div setting to get the period, then divide 1 by the period. For example, 2.5 divisions at 10 µs/div is a 25 µs period, and 1 / 25 µs = 40 kHz. Keep the units paired: a period in milliseconds gives kilohertz, and a period in microseconds gives megahertz.",
        },
        {
          q: "Why does my oscilloscope show double the real frequency?",
          a: "Usually edges were counted that are not one full cycle apart. Noise or ringing near the measurement level can register as extra edges, and measuring from a rising edge to the next falling edge gives only half a period on a square wave. Measure rising edge to rising edge, keep two to five clean cycles on screen and stabilise the trigger.",
        },
        {
          q: "Can a multimeter measure frequency instead of an oscilloscope?",
          a: "Many multimeters have a frequency (Hz) mode that gives a quick number on a clean, repeating signal. What a meter cannot show is the waveform, so it cannot tell you whether the signal is noisy, distorted or ringing, all of which can upset the count. Use the meter for a quick check and the scope when the shape matters or the reading looks wrong.",
        },
        {
          q: "What frequency can a 50MHz oscilloscope measure?",
          a: "Bandwidth is the frequency at which a sine wave is shown at about 70.7% of its true amplitude, so a 50MHz scope can still display a 50MHz signal, just attenuated and with rounded edges. For readings where shape and amplitude are trustworthy, the 3-5x rule of thumb puts the comfortable limit at roughly 10 to 17 MHz.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "The vertical half of the job: peak-to-peak, peak, RMS, DC level and AC vs DC coupling.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "A stable trace is the first step to a reliable frequency reading. Here is how to get one.",
        },
      ]}
    >
      <Callout title="Measuring mains frequency? Read this first">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Checking 50 Hz or 60 Hz mains is a common reason to reach for a scope, and the most dangerous.
            On a mains-powered bench scope, the probe&apos;s ground clip is normally tied to mains earth
            through the power cord. Clipping it to a point that isn&apos;t at earth potential, such as
            neutral, live or anything inside a non-isolated mains circuit, creates a short through the
            ground lead that can wreck the probe and scope, start a fire or injure you.
          </li>
          <li>
            Never remove or defeat the scope&apos;s earth connection (&quot;floating&quot; it) to get
            around this. Use an isolation transformer on the device under test, a differential probe, or an
            isolated-channel or handheld scope rated for mains work.
          </li>
          <li>
            Standard 1x/10x passive probes are not for mains unless their voltage and CAT rating explicitly
            cover it; check the ratings on both the probe and the scope input. For low-voltage practice,
            measure the scope&apos;s own calibration output or a microcontroller pin instead.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="period-and-frequency" className="text-xl font-semibold mb-3">Period and frequency: the one formula you need</h2>
        <p className="text-muted leading-7 mb-4">
          A repeating signal&apos;s period (T) is the time from one point on the waveform to the same
          point on the next cycle, for example rising edge to rising edge. Frequency is how many of those
          cycles happen per second, so the two are reciprocals.
        </p>
        <KeyIdea title="f = 1 / T">
          Period in seconds gives frequency in hertz. Period in milliseconds gives kilohertz, and period
          in microseconds gives megahertz. So a 2 ms period is 1/2 kHz = 500 Hz, and a 4 µs period is
          1/4 MHz = 250 kHz.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4 mb-4">
          The whole manual method comes down to three moves, shown below with the numbers from the square
          wave in step 2: count the divisions in one cycle, multiply by the time/div setting to get the
          period, then take the reciprocal.
        </p>
        <Figure
          caption={
            <>
              The manual method in three steps, using the 0.5 ms/div square wave from step 2. Keep the unit
              of the time/div setting attached to every number until the last step.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Count divisions", sub: "Rising edge to rising edge: 4 div" },
              { label: "× time/div = T", sub: "4 × 0.5 ms = 2 ms period" },
              { label: "f = 1 / T", sub: "1 ÷ 2 ms = 500 Hz" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="stable-trace">Get a stable trace with a few cycles on screen</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Connect the probe (10x, with the channel set to 10x), press Autoset if your scope has it, and set
          the trigger on a clean edge so the waveform stands still. If you are new to these controls, start
          with{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger one
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Then turn the time-per-division (time/div) knob until you can see roughly two to five complete
          cycles. Fewer than one full cycle and you can&apos;t measure a period at all; dozens of cycles
          and each one is too narrow to read accurately.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="count-divisions">Count the divisions in one period</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick two matching points one cycle apart. Edges that cross the centre line are the easiest to
          locate precisely, because the trace is steepest there. Count the horizontal divisions between
          them, using the minor ticks (each 0.2 division on most scopes) for the fractional part. The
          standard grid is 10 divisions wide; our guide to{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            reading an oscilloscope screen
          </Link>{" "}
          explains the graticule in detail.
        </p>
        <Figure
          caption={
            <>
              A square wave at 0.5 ms/div. Rising edges fall on the 4th and 8th divisions, so one period is
              4 divisions: 4 × 0.5 ms = 2 ms, and f = 1 / 2 ms = 500 Hz.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2.5}
            amplitude={2}
            triggerLevel={0}
            labels={{ left: "CH1 1 V/div", right: "0.5 ms/div" }}
            marks={[{ x1: 4, y1: 1.2, x2: 8, y2: 1.2, text: "4 div = 2 ms" }]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="calculate-frequency">Multiply by time/div, then take the reciprocal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Period = divisions × time/div. Frequency = 1 ÷ period. Watch the units: the time/div setting
          may be in seconds, milliseconds, microseconds or nanoseconds, and that is where most arithmetic
          slips happen.
        </p>
        <Figure
          caption={
            <>
              A sine wave at 0.2 ms/div. Upward zero crossings are 5 divisions apart: 5 × 0.2 ms = 1 ms, so
              f = 1 kHz. Two full cycles fill the 10-division screen.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={2.5}
            labels={{ left: "CH1 1 V/div", right: "0.2 ms/div" }}
            marks={[{ x1: 0, y1: 7.4, x2: 5, y2: 7.4, text: "5 div = 1 ms" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">More worked examples:</p>
        <DataTable
          head={["Time/div", "Divisions per period", "Period (T)", "Frequency (1/T)"]}
          rows={[
            ["1 ms/div", "4", "4 ms", "250 Hz"],
            ["0.5 ms/div", "4", "2 ms", "500 Hz"],
            ["0.2 ms/div", "5", "1 ms", "1 kHz"],
            ["10 µs/div", "2.5", "25 µs", "40 kHz"],
            ["1 µs/div", "3.2", "3.2 µs", "312.5 kHz"],
          ]}
          mono={[2, 3]}
        />
      </section>

      <section>
        <StepHeading n={4} id="measure-several-periods">Measure several periods for a better answer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reading the grid by eye, you can typically place an edge to within about one minor tick (0.2
          division). On a 4-division period that is a possible error of around 5%. Spread the same
          uncertainty over a longer span and it shrinks: measure the time across several complete cycles
          and divide by the number of cycles.
        </p>
        <p className="text-muted leading-7 mb-4">
          Worked example: at 0.5 ms/div you see 4 complete cycles spanning 8 divisions. That is 8 × 0.5
          ms = 4 ms for 4 cycles, so T = 4 ms ÷ 4 = 1 ms and f = 1 kHz. The 0.2-division reading
          uncertainty is now spread over 8 divisions instead of 2, so the error is about a quarter as
          large.
        </p>
        <Figure
          caption={
            <>
              A 1 kHz sine at 0.5 ms/div. Instead of measuring one 2-division cycle, measure from the first
              upward zero crossing to the fifth: 4 cycles in 8 divisions = 4 ms, so T = 1 ms and f = 1 kHz.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={5}
            amplitude={2.5}
            labels={{ left: "CH1 1 V/div", right: "0.5 ms/div" }}
            marks={[{ x1: 0, y1: 7.4, x2: 8, y2: 7.4, text: "4 cycles = 8 div = 4 ms" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Notice that the screen holds five full cycles, but the measurement uses only four of them. Pick
          a whole number of cycles whose start and end both land on clear crossings, and ignore any
          partial cycle at the edge of the screen.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="cursors-and-auto">Check it with cursors and auto measurements</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Digital scopes give you two faster and more precise ways to get the same number:
        </p>
        <InfoCards
          items={[
            { label: "Time cursors", desc: "Two vertical lines (often called X or time cursors) placed on matching edges. The scope shows ΔT, and many also show 1/ΔT as a frequency." },
            { label: "Auto frequency", desc: "The measurement menu calculates frequency and period from the captured waveform and updates it live." },
            { label: "Frequency counter", desc: "Some scopes include a separate counter readout. Whether yours has one varies by model; check the manual." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Cursors are best when you want the period of one specific part of a signal. Auto measurements
          are best for a steady, repeating signal. If the manual count, the cursors and the auto readout
          all roughly agree, you can trust the result. If they don&apos;t, one of the problems below is
          usually to blame.
        </p>
      </section>

      <section>
        <h2 id="common-errors" className="text-xl font-semibold mb-3">Common frequency measurement errors</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Auto frequency jumps around or shows nothing", "Noise causing false edges, or less than one full cycle on screen", "Show 2-5 cycles; stabilise the trigger; try the bandwidth limit if your scope has one"],
            ["Reading is about double the real value", "Noise or ringing counted as extra edges, or a period measured edge to opposite edge", "Measure rising edge to rising edge; check the trace for ringing"],
            ["Waveform looks slow and stable but the frequency is wrong", "Aliasing: the sample rate is too low for the signal at this time/div", "Use a faster time/div setting and check the result changes as expected"],
            ["Answer off by a factor of 1,000", "Unit slip between ms, µs and ns", "Write the time/div unit down before you calculate"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Aliasing deserves a closer look. A digital scope samples the signal, and if it samples fewer than
          two times per cycle (the Nyquist limit) it can show a convincing but false, lower frequency. On
          slow time/div settings some scopes reduce the sample rate, which makes this easier to trigger.
          Our explainer on{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          covers sample rate in detail.
        </p>
      </section>

      <section>
        <h2 id="accuracy" className="text-xl font-semibold mb-3">How accurate is an oscilloscope&apos;s frequency reading?</h2>
        <p className="text-muted leading-7 mb-4">
          The scope&apos;s internal timebase is usually far more accurate than its vertical (voltage)
          system; timebase accuracy is typically specified in parts per million on the datasheet. In
          practice, how well you place the edges, by eye or with cursors, limits a manual reading far more
          than the timebase does.
        </p>
        <p className="text-muted leading-7">
          Bandwidth also sets a ceiling. A scope can only display signals it can pass, and signals
          approaching its rated bandwidth are attenuated and lose their edge shape. As a rule of thumb, pick
          a scope with 3-5x the bandwidth of the highest frequency you care about. See{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          . Many multimeters also have a frequency (Hz) mode, which is handy for a quick number on a
          clean signal; our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          guide explains when that is enough and when you need to see the waveform.
        </p>
      </section>

      <section>
        <h2 id="picking-a-scope" className="text-xl font-semibold mb-3">Picking a scope for frequency work</h2>
        <p className="text-muted leading-7 mb-5">
          The FNIRSI DSO152 (200kHz bandwidth, 2.5 MSa/s) is suited to audio-range and slower signals; see
          the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            DSO152 review
          </Link>
          . For microcontroller clocks, PWM and serial signals, a bench scope such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz, 1 GSa/s),{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>{" "}
          (100MHz, 1 GSa/s) or{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          (100MHz, 1 GSa/s) gives far more headroom. Compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          list or the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          . If you&apos;re still deciding whether you need a scope at all, read{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>
          , and if you want to practise on a known signal, the Hantek DSO2D10&apos;s built-in waveform
          generator can supply one.
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s, with strong community documentation.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel 100MHz digital bench oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s.",
            },
            {
              name: "FNIRSI DSO152",
              image: fnirsi.image,
              alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
              href: "/oscilloscopes/fnirsi-dso152-review",
              note: "Pocket-sized, 200kHz, 1 channel, 2.5 MSa/s.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
