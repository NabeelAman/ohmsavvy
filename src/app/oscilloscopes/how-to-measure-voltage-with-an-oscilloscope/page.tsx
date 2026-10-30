import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure voltage with an oscilloscope: read peak-to-peak, peak, RMS and DC level, choose AC or DC coupling, and use cursors and auto measurements.";

export const metadata = buildMetadata({
  title: "How to Measure Voltage With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToMeasureVoltageWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Voltage With an Oscilloscope"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure voltage with an oscilloscope, you count how many vertical divisions the trace spans
          and multiply by the volts-per-division setting. That one idea gives you peak-to-peak voltage,
          peak amplitude, the DC level of a signal and, for a sine wave, its RMS value. This guide shows
          each one with a worked example, then covers coupling, cursors and the automatic measurements
          that do the counting for you.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our
            reviews; the division-counting method in this guide works the same on it as on any digital
            scope. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "set-up-the-channel", label: "Set up the channel" },
        { id: "read-peak-to-peak", label: "Read peak-to-peak voltage" },
        { id: "peak-and-rms", label: "Peak-to-peak to peak and RMS" },
        { id: "dc-level", label: "Measure a DC level" },
        { id: "ac-coupling-ripple", label: "AC coupling for ripple" },
        { id: "cursors-and-measurements", label: "Cursors and auto measurements" },
        { id: "accurate-readings", label: "Getting an accurate reading" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "How do you measure Vpp on an oscilloscope?",
          a: "Count the number of vertical divisions from the waveform's highest point to its lowest, then multiply by the volts-per-division setting: 6 divisions at 1 V/div is 6 V peak-to-peak (Vpp). Most digital scopes also read Vpp automatically from an auto-measurement menu, which is more precise than counting divisions by eye, especially on a noisy or fast signal.",
        },
        {
          q: "Can an oscilloscope measure AC voltage?",
          a: "Yes. An oscilloscope shows the AC waveform itself, so you can read its peak-to-peak and peak values straight from the grid. Most digital scopes also calculate RMS from the samples. For a clean sine you can work it out yourself: a 6 V peak-to-peak sine has a 3 V peak and an RMS of about 2.12 V.",
        },
        {
          q: "Why does my oscilloscope reading not match my multimeter?",
          a: "Usually they are reporting different things. A scope's grid gives peak-to-peak or peak voltage, while a multimeter's AC range reports RMS, so a 6 V peak-to-peak sine reads about 2.12 V on the meter. Meters that are not True-RMS also assume a sine wave and misread other shapes, and a scope's vertical accuracy is typically only a few percent.",
        },
        {
          q: "Can you measure mains voltage with an oscilloscope?",
          a: "Not with a standard bench scope and ordinary passive probe. The probe's ground clip is tied to mains earth, so clipping it to a mains circuit can short it out, and most 1x/10x probes are not rated for mains. It needs a differential probe, an isolation transformer on the device under test, or a suitably rated isolated scope. For a simple mains reading, use a rated multimeter.",
        },
        {
          q: "How does a 10x probe affect voltage readings?",
          a: "A 10x probe divides the signal by ten before it reaches the scope input, which lets the scope handle larger voltages and loads the circuit less. The scope must be told about it: set the channel's probe ratio to 10x and it multiplies the reading back. If the channel is left on 1x, every voltage reads ten times too low.",
        },
        {
          q: "How accurate is an oscilloscope for measuring voltage?",
          a: "Good enough for seeing levels, swings, ripple and spikes, but not a precision instrument. Vertical accuracy is typically specified as a few percent, and your model's datasheet gives the exact figure. Filling the screen vertically and staying well inside the scope's bandwidth help. For a precise DC value, such as checking a regulator output, a good multimeter is usually the better tool.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "The horizontal half of the job: period from divisions, f = 1/T, cursors and accuracy tips.",
        },
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "Why a scope reads amplitude low on signals near its bandwidth limit, and how much you need.",
        },
      ]}
    >
      <Callout title="Safety first: the ground clip is not a free-floating lead">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe&apos;s ground clip is normally connected to mains
            earth through the power cord. Clipping it to any point that isn&apos;t at earth potential,
            such as the inside of a mains-connected, non-isolated power supply, shorts that point to
            earth through the ground lead. That can destroy the probe, the scope or the circuit, start a
            fire or injure you.
          </li>
          <li>
            Never remove or defeat the scope&apos;s earth connection (&quot;floating&quot; the scope) to
            get around this. To measure voltages that aren&apos;t referenced to earth, use an isolation
            transformer on the device under test, a differential probe, or an isolated-channel or
            handheld scope rated for the job.
          </li>
          <li>
            Check the voltage and CAT ratings printed on the probe and the scope input before you
            connect. Standard 1x/10x passive probes are not for mains measurements unless their rating
            explicitly covers it. If you only need a mains voltage reading, a properly rated multimeter
            is the right tool (see{" "}
            <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
              how to use a multimeter
            </Link>
            ).
          </li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="set-up-the-channel">Set up the channel before you read anything</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most voltage-reading mistakes happen before the signal is even on screen. Three settings decide
          whether the numbers you read are correct:
        </p>
        <InfoCards
          items={[
            { label: "Probe attenuation", desc: "Set the channel to match the probe switch (1x or 10x). A 10x probe on a 1x channel setting reads 10 times too low." },
            { label: "Ground reference", desc: "Note where the channel's ground marker sits, usually an arrow at the left edge. All DC levels are read from that line." },
            { label: "Coupling", desc: "DC coupling shows the whole signal including its DC level. AC coupling removes the DC part. Start on DC." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you haven&apos;t checked your 10x probe yet, do that first: a badly compensated probe distorts
          square-wave tops and makes amplitude readings unreliable. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating an oscilloscope probe
          </Link>{" "}
          takes a couple of minutes. Then adjust the volts-per-division (V/div) knob until the waveform
          fills as much of the screen height as possible without running off the top or bottom.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="read-peak-to-peak">Read peak-to-peak voltage from the grid</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Peak-to-peak (Vpp) is the distance from the highest point of the waveform to the lowest. Count
          the vertical divisions between them and multiply by V/div. Most scope screens have 8 vertical
          divisions, each split into five minor ticks of 0.2 division, so you can usually read to the
          nearest fifth of a division. If the grid itself is new to you, start with{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope screen
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              A sine wave at 1 V/div. The trace runs from 3 divisions above center to 3 below: 6 divisions
              × 1 V/div = 6 V peak-to-peak, so the peak is 3 V and the RMS is about 2.12 V.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={3}
            labels={{ left: "CH1 1 V/div", right: "1 ms/div" }}
            marks={[{ x1: 1.25, y1: 1, x2: 1.25, y2: 7, text: "6 div = 6 V p-p" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Worked example: the trace above spans 6 divisions at 1 V/div, so Vpp = 6 × 1 V = 6 V. The same
          signal at 2 V/div would span only 3 divisions. The voltage hasn&apos;t changed, but the reading
          is coarser because each minor tick is now worth 0.4 V instead of 0.2 V. That is why you zoom in
          vertically as far as the screen allows.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="peak-and-rms">Turn peak-to-peak into peak and RMS</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For a waveform centred on 0 V, the peak (amplitude) is half the peak-to-peak value. For a pure
          sine wave only, the RMS value, which is what a multimeter&apos;s AC voltage range is trying to
          report, is the peak divided by √2 (about 1.414).
        </p>
        <DataTable
          head={["Value", "Formula (centred sine)", "Example (6 V p-p sine)"]}
          rows={[
            ["Peak-to-peak (Vpp)", "divisions × V/div", "6 div × 1 V/div = 6 V"],
            ["Peak (Vpk)", "Vpp ÷ 2", "6 V ÷ 2 = 3 V"],
            ["RMS (Vrms)", "Vpk ÷ √2 (≈ Vpk × 0.707)", "3 V × 0.707 ≈ 2.12 V"],
            ["Average (Vavg)", "0 for a sine centred on 0 V", "0 V"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-5 mb-5">
          Side by side, the three numbers for the same signal look very different. That is why a voltage
          value means little until you know which one it is: 6 V, 3 V and 2.12 V can all describe this one
          sine wave.
        </p>
        <Figure
          caption={
            <>
              One 6 V peak-to-peak sine, three ways: Vpp = 6 V, Vpk = 6 ÷ 2 = 3 V, Vrms = 3 × 0.707 ≈ 2.12
              V. RMS is always the smallest of the three for a sine.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Peak-to-peak (Vpp)", value: 6, display: "6 V" },
              { label: "Peak (Vpk)", value: 3, display: "3 V" },
              { label: "RMS (Vrms)", value: 2.12, display: "≈ 2.12 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-5 mb-5">
          This is also why a scope and a multimeter can disagree about the same signal without either
          being wrong. Below, the 6 V peak-to-peak sine from step 2 is shown at 2 V/div, where it spans 3
          divisions, next to what a True-RMS multimeter on its AC voltage range would report for it.
        </p>
        <Figure
          caption={
            <>
              Left: the same sine at 2 V/div spans 3 divisions, 3 × 2 V = 6 V peak-to-peak. Right: a
              True-RMS meter reports the RMS value of that sine, about 2.12 V AC, not the peak or
              peak-to-peak.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1.5}
              labels={{ left: "CH1 2 V/div", right: "1 ms/div" }}
              marks={[{ x1: 1.25, y1: 2.5, x2: 1.25, y2: 5.5, text: "3 div = 6 V p-p" }]}
            />
            <MeterReadout value="2.12" unit="V AC" mode="AC V" />
          </div>
        </Figure>
        <KeyIdea title="The √2 rule only works for sine waves">
          A square wave that swings evenly between +3 V and -3 V has an RMS of 3 V, not 2.12 V. Triangle
          waves, PWM and distorted waveforms each have a different ratio. For anything that isn&apos;t a
          clean sine, use the scope&apos;s own RMS measurement, which calculates RMS from the samples
          rather than assuming a shape.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="dc-level">Measure a DC level or a signal that sits above 0 V</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many real signals don&apos;t sit around 0 V. A logic output or PWM signal, for example, switches
          between 0 V and a supply voltage. With DC coupling, measure each level from the ground marker:
          count the divisions from the ground line up to the trace and multiply by V/div.
        </p>
        <Figure
          caption={
            <>
              A 0–5 V square wave at 2 V/div, with the ground marker on the center line. The low level sits
              on ground (0 V); the high level is 2.5 divisions above it: 2.5 × 2 V/div = 5 V.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2.5}
            amplitude={1.25}
            offset={1.25}
            labels={{ left: "CH1 2 V/div  DC", right: "0.5 ms/div" }}
            marks={[{ x1: 3, y1: 4, x2: 3, y2: 1.5, text: "2.5 div = 5 V" }]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Here Vmax = 5 V, Vmin = 0 V and Vpp = 5 V. A steady DC voltage, such as a battery or regulator
          output, shows up as a flat line, and you read it the same way: a line 1.5 divisions above ground
          at 2 V/div is 3 V. If the ground marker has been moved off the center line, always count from
          the marker, not from the center of the screen.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="ac-coupling-ripple">Use AC coupling to see small ripple on a DC rail</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Suppose you want to see the ripple on a 5 V supply. At 2 V/div, DC coupled, the rail sits 2.5
          divisions above ground and 200 mV of ripple is only a tenth of a division tall, which is
          invisible. Turning the V/div down far enough to see the ripple would push the 5 V level off the
          top of the screen.
        </p>
        <p className="text-muted leading-7 mb-4">
          AC coupling solves this by blocking the DC part of the signal, so only the variation is shown,
          centred on the ground line. Now you can turn the sensitivity right up:
        </p>
        <Figure
          caption={
            <>
              The same rail, AC coupled at 50 mV/div (shown simplified as a sine). The ripple spans 4
              divisions: 4 × 50 mV = 200 mV peak-to-peak. The 5 V DC level is no longer shown.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={2}
            labels={{ left: "CH1 50 mV/div  AC", right: "2 ms/div" }}
            marks={[{ x1: 2.5, y1: 2, x2: 2.5, y2: 6, text: "4 div = 200 mV p-p" }]}
          />
        </Figure>
        <DataTable
          head={["Coupling", "Shows", "Use it for"]}
          rows={[
            ["DC", "The full signal, including its DC level", "Most measurements: DC levels, logic signals, Vmax/Vmin"],
            ["AC", "Only the changing part; DC is blocked", "Small ripple or noise riding on a large DC voltage"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two cautions. AC coupling also attenuates very low-frequency signals, and the cutoff point varies
          by model, so don&apos;t use it to measure slow signals. And only DC coupling shows the true DC
          level, so switch back to DC when you&apos;re done. Some scopes also let you shift
          the trace with a large vertical offset while staying DC coupled; the available offset range
          depends on the model and V/div setting.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="cursors-and-measurements">Use cursors and automatic measurements</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Counting divisions is the skill to learn, but a digital scope can do it more precisely.
          Horizontal voltage cursors (often labeled Y or amplitude cursors) are two lines you place on
          the levels you care about; the scope displays each level and the difference between them, ΔV.
          Cursors are ideal when you want a specific feature, such as the height of one step or a single
          spike.
        </p>
        <p className="text-muted leading-7 mb-4">
          Automatic measurements go further and calculate values from the captured samples. Names and
          exact definitions vary between brands, so check your scope&apos;s manual, but these are common:
        </p>
        <DataTable
          head={["Measurement", "What it reports"]}
          rows={[
            ["Vpp", "Highest sample minus lowest sample, including spikes and overshoot"],
            ["Vmax / Vmin", "The highest and lowest sample values"],
            ["Vamp (on many scopes)", "Top level minus base level, ignoring overshoot; useful on square waves"],
            ["Vavg / Mean", "The average of the samples: the DC level of the signal"],
            ["Vrms", "The true RMS of the samples, valid for any wave shape"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Many scopes offer RMS and average over the whole screen or over a whole number of cycles. The
          whole-screen version can be slightly off if a partial cycle is on screen, so where both exist,
          prefer the per-cycle version for repeating signals.
        </p>
      </section>

      <section>
        <h2 id="accurate-readings" className="text-xl font-semibold mb-3">Getting an accurate voltage reading</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Fill the screen vertically.</strong> Both your eye and the
            scope&apos;s digitizer resolve finer steps when the waveform uses most of the 8 divisions.
          </li>
          <li>
            <strong className="text-foreground">Know that scopes aren&apos;t precision voltmeters.</strong>{" "}
            Vertical accuracy is typically specified as a few percent; the exact figure is on your
            model&apos;s datasheet. For a precise DC value, a good multimeter usually wins. Our{" "}
            <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
              oscilloscope vs multimeter
            </Link>{" "}
            guide covers when to use which.
          </li>
          <li>
            <strong className="text-foreground">Stay well inside the bandwidth.</strong> At the
            scope&apos;s rated bandwidth, a sine wave reads about 70.7% of its true amplitude, and
            the error starts earlier than that. See{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
              what oscilloscope bandwidth means
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Get a stable trace.</strong> A rolling waveform is hard to
            read; set the trigger as described in{" "}
            <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
              how to trigger an oscilloscope
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Keep the ground lead short.</strong> A long ground lead
            picks up noise and adds ringing to fast edges, which inflates Vpp and Vmax readings.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope do you need for voltage measurements?</h2>
        <p className="text-muted leading-7">
          Any working scope can measure voltage; the differences are in what signals it can keep up with.
          A pocket unit like the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (200kHz bandwidth, 1 channel) handles audio-range and slow signals. Bench scopes such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          (50MHz, 4 channels), the{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>{" "}
          (100MHz, 2 channels) and the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          (100MHz, 4 channels) cover microcontroller and most hobby work. Compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, or read the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          first. New to scopes altogether? Start with{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use one
          </Link>
          .
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Bench scopes in our reviews"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s, with a 7-inch display and strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
