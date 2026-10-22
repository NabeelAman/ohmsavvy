import Link from "next/link";
import {
  BarChart,
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
  "How to measure propagation delay using an oscilloscope: probe input and output, trigger on the input edge, time the 50% points, and deskew your probes.";

export const metadata = buildMetadata({
  title: "How to Measure Propagation Delay Using a Scope",
  description,
  path: "/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToMeasurePropagationDelayPage() {
  return (
    <HowToShell
      title="How to Measure Propagation Delay Using an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Propagation delay is the time a signal takes to get from a circuit&apos;s input to its output:
          through a logic gate, a buffer, an optocoupler or a whole firmware response. To measure it with an
          oscilloscope, you put the input on CH1 and the output on CH2, trigger on the input edge, and read
          the time between the two edges at their 50% points. This guide walks through the setup, the
          cursor and automatic methods, probe skew, and worked examples with real numbers.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            Delay measurements need at least two channels. The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s)
            is one of the bench scopes in our reviews. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-propagation-delay-is", label: "What propagation delay is" },
        { id: "connect-two-channels", label: "Connect input and output" },
        { id: "trigger-on-the-input", label: "Trigger on the input edge" },
        { id: "set-the-timebase", label: "Set the timebase" },
        { id: "measure-at-50-percent", label: "Measure between 50% points" },
        { id: "cursors-and-auto-delay", label: "Cursors and auto delay" },
        { id: "probe-skew-and-deskew", label: "Probe skew and deskew" },
        { id: "worked-examples", label: "Worked examples" },
        { id: "bandwidth-limits", label: "Bandwidth and resolution limits" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can you measure propagation delay with a single-channel oscilloscope?",
          a: "Not directly. You need to see the input and output edges on the same time axis, which takes two channels. A workaround is to trigger the single channel from an external trigger input driven by the input signal, if the scope has one, then probe the output, but trigger-path delay adds an error. A two-channel scope is the practical choice.",
        },
        {
          q: "What is the difference between propagation delay and rise time?",
          a: "Rise time describes how fast one edge moves, usually from 10% to 90% of its swing. Propagation delay is the time between two different signals, measured from the input edge to the output edge, usually at their 50% points. A slow output edge increases the measured delay, but the two are separate measurements with separate definitions.",
        },
        {
          q: "Why is my measured delay longer than the datasheet value?",
          a: "Datasheet figures are measured under stated conditions: supply voltage, temperature, load capacitance and reference levels. Your probe adds capacitance to the output, your supply may differ, and your edges may be slower. Uncorrected probe skew and a scope that is too slow for the edges can also add time. Match the test conditions before comparing.",
        },
        {
          q: "Should I measure propagation delay at 50% or at the logic threshold?",
          a: "Use whatever reference level the datasheet you are comparing against uses. Many specify 50% of the supply swing, while some logic families specify a fixed voltage. For your own comparisons, 50% of each signal's swing is the usual default, and the important thing is to use the same rule every time.",
        },
        {
          q: "Do longer probe cables change the delay measurement?",
          a: "Yes, if the two probes differ. A signal takes time to travel along a cable, roughly 5 ns per metre in typical coax, so two probes with different cable lengths or designs show a fixed timing offset. Use matched probes and measure the skew by probing one edge with both, then correct for it.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge source, level, slope and Single mode: the trigger skills this measurement relies on.",
        },
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "Why a scope's own rise time limits how short a delay you can trust.",
        },
      ]}
    >
      <Callout title="Safety first: both ground clips go to circuit ground">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every probe&apos;s ground clip is connected to mains earth
            through the power cord. For a two-probe delay measurement, clip both grounds to the same
            circuit ground. Clipping either one to a point that isn&apos;t at earth potential shorts that
            point to earth, which can damage the circuit, probe or scope, or injure you.
          </li>
          <li>
            Never float the scope by removing or defeating its earth connection. For circuits that
            aren&apos;t earth-referenced, such as anything on the mains side of a non-isolated supply, use an
            isolation transformer on the device under test, differential probes, or an isolated-channel
            scope rated for the job, and stay within the voltage and CAT ratings on your probes.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-propagation-delay-is" className="text-xl font-semibold mb-3">What propagation delay is</h2>
        <p className="text-muted leading-7 mb-4">
          Every real circuit takes time to respond. When a gate&apos;s input switches, its output follows a
          few nanoseconds later; an optocoupler or a relay driver can take microseconds; a microcontroller
          reacting to an interrupt adds its own firmware latency. Propagation delay puts a number on that
          lag. Because edges are not perfectly vertical, the convention is to time it between the point
          where the input crosses 50% of its swing and the point where the output crosses 50% of its swing.
        </p>
        <DataTable
          head={["Term", "Meaning"]}
          rows={[
            ["tPLH", "Delay to an output that goes low to high"],
            ["tPHL", "Delay to an output that goes high to low"],
            ["tpd", "Often quoted as the average: (tPLH + tPHL) ÷ 2, or the worse of the two; check the datasheet"],
            ["Rise / fall time", "How fast one edge moves (usually 10% to 90%), not a delay between signals"],
            ["Skew", "A timing offset between two channels or probes that isn't part of the circuit"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The two output directions often have different delays, so measure both edges. If you are
          checking a part against its datasheet, note the test conditions it lists, such as supply voltage,
          load capacitance and reference levels, because delay changes with all of them.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="connect-two-channels">Connect the input to CH1 and the output to CH2</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Probe the input signal with CH1 and the output with CH2. Using CH1 for the input is a habit worth
          keeping: it becomes the trigger source and the time reference, so every reading is &quot;how long
          after the input&quot;.
        </p>
        <InfoCards
          items={[
            { label: "Matched probes", desc: "Use two probes of the same model and cable length, both on 10x, so their delays cancel." },
            { label: "Compensate both", desc: "A miscompensated probe rounds the edge and shifts its 50% point. Adjust each one first." },
            { label: "Short grounds", desc: "Long ground leads add ringing to fast edges. Use ground springs where you can." },
            { label: "Same ground", desc: "Both ground clips go to the circuit's ground, close to the part you are timing." },
            { label: "Probe ratio set", desc: "Each channel's probe setting must match its probe so the 50% levels are read correctly." },
            { label: "DC coupling", desc: "Keep both channels DC coupled so the logic levels sit where they really are." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If compensation is new to you, our guide to{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensating an oscilloscope probe
          </Link>{" "}
          takes a couple of minutes per probe. A probe also adds capacitance to the node it touches (the
          figure is in the probe&apos;s specifications), which can slow a weakly driven output slightly.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="trigger-on-the-input">Trigger on the input edge</StepHeading>
        <p className="text-muted leading-7">
          Set the trigger source to CH1, type Edge, and choose the slope that matches the input transition
          you want to time: rising for one direction, falling for the other. Put the trigger level at the
          middle of the input swing, so for a 0 to 5 V signal, about 2.5 V. The output then appears at a
          fixed position after the trigger point on every sweep. If the input only switches occasionally,
          use Normal or Single mode so the scope waits for the real edge. Our guide on{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          covers level, slope and modes in detail. To compare the two signals&apos; gain and shape rather than
          their timing, see{" "}
          <Link href="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope" className={link}>
            how to compare input and output signals on an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="set-the-timebase">Set the timebase so the delay spans several divisions</StepHeading>
        <p className="text-muted leading-7">
          Move the horizontal position so the trigger point sits near the left of the screen, then turn
          the time/div down until the gap between the input and output edges covers at least one or two
          divisions. A delay that is a fraction of a division is hard to read accurately by eye and gives
          the scope fewer samples to work with. Set each channel&apos;s V/div so its signal fills a good
          part of its half of the screen, and use the vertical position controls to stack CH1 above CH2.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="measure-at-50-percent">Measure between the 50% points</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find where the input edge crosses its 50% level, then where the output edge crosses its own 50%
          level, and count the divisions between them. Multiply by time/div. The 50% level is measured on
          each signal separately: if the input swings 0 to 5 V and the output 0 to 3.3 V, the reference
          points are 2.5 V and 1.65 V.
        </p>
        <Figure
          caption={
            <>
              A buffer at 10 ns/div, edges drawn idealised. The input (CH1, green, triggered at its 50% level
              T) rises 2 divisions from the left; the output (CH2, blue) rises 1.5 divisions later: 1.5 × 10
              ns = 15 ns. Both signals are 0 to 5 V, shown at 2 V/div.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={1}
            amplitude={1.25}
            offset={2}
            shift={2}
            triggerLevel={2}
            second={{ wave: "square", cycles: 1, amplitude: 1.25, offset: -2, shift: 3.5, label: "CH2 output" }}
            marks={[{ x1: 2, y1: 4, x2: 3.5, y2: 4, text: "1.5 div = 15 ns" }]}
            labels={{ left: "CH1 in, CH2 out: 2 V/div", right: "10 ns/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Real edges have a slope, so where you measure on them matters. Timing from the very start of the
          input edge to the very top of the output edge would add part of both rise times to the result.
          The 50% convention removes most of that and makes your number comparable with datasheets that use
          the same definition.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="cursors-and-auto-delay">Use cursors or an automatic delay measurement</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Counting divisions is the method to understand, but cursors are more precise. Turn on the time
          (vertical, often labelled X) cursors, put the first on the input&apos;s 50% crossing and the second
          on the output&apos;s 50% crossing, and read Δt. Zoom in horizontally first so each edge is spread
          across the screen.
        </p>
        <p className="text-muted leading-7 mb-4">
          Many digital scopes also offer an automatic delay measurement between two channels, under names
          such as Delay, Rise-Rise, Fall-Fall or Phase. Check your manual for which edges it uses, whether
          the reference level is 50% or adjustable, and which channel counts as the source. For an
          inverting part, measure from a rising input edge to a falling output edge.
        </p>
        <Figure
          caption={
            <>
              An inverter at 5 ns/div. The input (green) rises 2 divisions from the left and the output (blue)
              falls 2 divisions later: tPHL = 2 × 5 ns = 10 ns. The input falls at 7 divisions and the output
              rises at 9: tPLH = 10 ns too. Real parts often differ between the two.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={1}
            amplitude={1.25}
            offset={2}
            shift={2}
            second={{ wave: "square", cycles: 1, amplitude: 1.25, offset: -2, shift: -1, label: "CH2 output" }}
            marks={[
              { x1: 2, y1: 4, x2: 4, y2: 4, text: "tPHL 10 ns" },
              { x1: 7, y1: 4, x2: 9, y2: 4, text: "tPLH 10 ns" },
            ]}
            labels={{ left: "CH1 in, CH2 out: 2 V/div", right: "5 ns/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Averaging helps with jittery edges: many scopes can show the mean and spread of a measurement
          over many captures. Repeat the measurement on the other edge, and if you are characterising a
          part, at the supply voltage and load the datasheet specifies.
        </p>
      </section>

      <section>
        <h2 id="probe-skew-and-deskew" className="text-xl font-semibold mb-3">Probe skew and deskew</h2>
        <p className="text-muted leading-7 mb-4">
          Each probe and cable adds its own delay, and signals travel along typical coax at roughly 5 ns per
          metre. Two identical probes mostly cancel out, but different models or cable lengths can show a
          fixed offset between channels that looks like circuit delay. When you are measuring nanoseconds,
          check for it:
        </p>
        <FlowDiagram
          steps={[
            { label: "Probe one edge", sub: "Both probe tips on the same fast signal" },
            { label: "Read the offset", sub: "Δt between the two 50% points" },
            { label: "Deskew or note it", sub: "Enter it in the channel menu, if offered" },
            { label: "Re-check", sub: "Same edge now lines up on both" },
          ]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                Both probes on the same edge at 2 ns/div. CH2 (blue) appears 1 division late: 1 × 2 ns = 2 ns
                of skew. Any delay measured with this pair reads 2 ns too long until it is corrected.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={0.5}
              amplitude={1.25}
              offset={2}
              shift={4}
              second={{ wave: "square", cycles: 0.5, amplitude: 1.25, offset: -2, shift: 5, label: "CH2 same edge" }}
              marks={[{ x1: 4, y1: 4, x2: 5, y2: 4, text: "2 ns skew" }]}
              labels={{ left: "CH1, CH2: 2 V/div", right: "2 ns/div" }}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Many scopes have a per-channel deskew or delay setting that shifts one trace to remove the offset;
          check your manual for whether yours has one and its range. If it doesn&apos;t, subtract the skew
          by hand: a measured 15 ns with 2 ns of CH2 skew is a 13 ns delay. For delays of microseconds,
          such as optocouplers, skew of this size rarely matters.
        </p>
      </section>

      <section>
        <h2 id="worked-examples" className="text-xl font-semibold mb-3">Worked examples</h2>
        <p className="text-muted leading-7 mb-4">
          The arithmetic is always divisions × time/div, then any skew correction. These examples show how
          the timebase scales with the kind of circuit you are timing:
        </p>
        <DataTable
          head={["Circuit", "Time/div", "Divisions", "Delay"]}
          rows={[
            ["Buffer, rising edge", "10 ns/div", "1.5", "1.5 × 10 ns = 15 ns"],
            ["Same buffer, 2 ns CH2 skew removed", "10 ns/div", "1.5", "15 ns − 2 ns = 13 ns"],
            ["Inverter, tPHL", "5 ns/div", "2", "2 × 5 ns = 10 ns"],
            ["Optocoupler output", "2 µs/div", "2.4", "2.4 × 2 µs = 4.8 µs"],
            ["Microcontroller pin responding to an input", "1 µs/div", "3.2", "3.2 × 1 µs = 3.2 µs"],
            ["Average of tPLH 12 ns and tPHL 8 ns", "-", "-", "(12 + 8) ÷ 2 = 10 ns"],
          ]}
          mono={[3]}
        />
        <p className="text-muted leading-7 mt-4">
          The microcontroller case isn&apos;t a gate delay but is measured the same way, and it is a useful
          check on interrupt latency. For a slow signal like that, triggering in Single mode and reading
          cursors on one capture is often clearer than a live display.
        </p>
      </section>

      <section>
        <h2 id="bandwidth-limits" className="text-xl font-semibold mb-3">Bandwidth and resolution limits</h2>
        <p className="text-muted leading-7 mb-4">
          A scope has its own rise time, roughly 0.35 ÷ bandwidth. Edges faster than that are displayed
          slower than they really are. Because both channels are slowed in a similar way, a 50%-to-50% delay
          is affected less than a rise-time reading, but once the delay you are measuring is close to the
          scope&apos;s own rise time, treat the result as approximate.
        </p>
        <Figure
          caption={
            <>
              Scope rise time from 0.35 ÷ bandwidth: 50 MHz gives about 7 ns and 100 MHz about 3.5 ns. The 15 ns
              buffer delay from the first example is comfortably longer than both.
            </>
          }
        >
          <BarChart
            items={[
              { label: "50 MHz scope rise time", value: 7, display: "≈ 7 ns" },
              { label: "100 MHz scope rise time", value: 3.5, display: "≈ 3.5 ns" },
              { label: "Buffer delay (example)", value: 15, display: "15 ns", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Sample rate sets how finely the edge is resolved in time, and many scopes divide it between
          channels when several are on, so check your manual. Our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          covers the 0.35 rule and the 3 to 5 times margin, and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          covers sample rate.
        </p>
        <div className="mt-5">
          <KeyIdea title="Delay vs phase">
            For repeating sine waves the same time difference is often expressed as a phase angle instead:
            phase = (Δt ÷ period) × 360°. If that is what you need, see{" "}
            <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
              how to measure phase difference
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for delay measurements</h2>
        <p className="text-muted leading-7 mb-6">
          The one hard requirement is two channels. A single-channel pocket scope like the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>{" "}
          (1 channel, 200kHz) can&apos;t show input and output together. For nanosecond logic delays, the
          more bandwidth the better; for optocouplers and firmware latency, any of the bench scopes below
          is plenty. Compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, or start with{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>{" "}
          if the controls are new.
        </p>
        <ProductStrip
          title="Two-channel-and-up scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. The default beginner oscilloscope recommendation for years.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with more bandwidth and a better UI than the Rigol.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel digital oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s, with a built-in waveform generator.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
