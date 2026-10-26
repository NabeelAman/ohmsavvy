import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to compare two frequencies using an oscilloscope: period on each channel, the frequency ratio, Lissajous figures in XY mode, and reading beat drift.";

export const metadata = buildMetadata({
  title: "How to Compare Two Frequencies on an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-compare-two-frequencies-using-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToCompareTwoFrequenciesUsingAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Compare Two Frequencies Using an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-compare-two-frequencies-using-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Is the output exactly half the input? Is this oscillator running at the same rate as the
          reference? To compare two frequencies using an oscilloscope, put one signal on each channel and
          either measure both periods and divide, or switch to XY mode and read the ratio from the
          Lissajous figure. When the two frequencies are nearly equal, the way one trace drifts against the
          other tells you how far apart they are. This guide covers all three methods and their limits.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator, front view",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) combines a scope and a waveform generator,
            which is handy for comparing a signal against a known reference. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "three-methods", label: "Three ways to compare" },
        { id: "connect-both-signals", label: "Connect both signals" },
        { id: "measure-each-period", label: "Measure each period" },
        { id: "work-out-the-ratio", label: "Work out the ratio" },
        { id: "lissajous-xy-mode", label: "Read a Lissajous figure" },
        { id: "divider-example", label: "Worked example: a clock divider" },
        { id: "beat-and-drift", label: "Nearly equal frequencies" },
        { id: "accuracy-limits", label: "Accuracy limits" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can a single-channel oscilloscope compare two frequencies?",
          a: "Only one at a time. You can measure the first signal, write down its frequency, then move the probe and measure the second. That works for steady signals, but you cannot see their timing relationship, use XY mode, or watch one drift against the other. For those you need at least two channels.",
        },
        {
          q: "Why does my Lissajous figure keep rotating?",
          a: "Because the two frequencies are not in an exact whole-number ratio. The figure cycles through its shapes once for every cycle of difference between them, so for a near 1:1 pair, a pattern that repeats once a second means the frequencies differ by about 1 Hz. A slower roll means they are closer to the exact ratio.",
        },
        {
          q: "Which channel should I trigger on when comparing frequencies?",
          a: "Trigger on the signal you treat as the reference, usually the input or the known-good source. That trace stands still and the other one shows any difference as movement. If you trigger on the wrong one, the reference appears to drift instead, which can confuse which signal is changing.",
        },
        {
          q: "Can I compare a sine wave with a square wave?",
          a: "Yes. Period measurement does not care about wave shape, so measure each with edge triggering and cursors or the automatic frequency reading. Lissajous figures still show the ratio by their repeat count, but the shapes have sharp corners and flat sides instead of smooth loops, which makes them harder to read.",
        },
        {
          q: "Can I use the FFT function to compare two frequencies?",
          a: "Yes, and it helps when signals are noisy or contain several tones. The FFT shows each frequency as a peak along a horizontal frequency axis, so two signals appear as two peaks whose positions you can read with cursors. Its resolution depends on the sample rate and record length, so close frequencies can merge into one peak. For a precise ratio, period measurement is usually better.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "Divisions, time/div and f = 1 / T for a single signal, step by step.",
        },
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference Between Two Signals",
          desc: "Once the frequencies match, measure the time shift and phase angle between them.",
        },
      ]}
    >
      <Callout title="Safety: both ground clips go to the same ground">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every channel&apos;s probe ground clip is connected to mains
            earth, and to each other. Clip both to the same circuit ground. A ground clip on any other point
            shorts it to earth.
          </li>
          <li>
            Never probe mains directly with standard probes to compare a frequency against the supply. Use a
            rated differential probe or a low-voltage transformer, and see{" "}
            <Link href="/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope" className={link}>
              how to measure mains frequency
            </Link>{" "}
            for the safe setup.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="three-methods" className="text-xl font-semibold mb-3">Three ways to compare two frequencies</h2>
        <p className="text-muted leading-7 mb-4">
          Each method answers a slightly different question. Period measurement gives you two numbers you
          can write down. A Lissajous figure shows at a glance whether the ratio is an exact whole-number
          ratio like 1:2 or 2:3. Watching drift tells you how far apart two nearly identical frequencies are,
          often more finely than either period reading.
        </p>
        <KeyIdea title="The core formula">
          f = 1 ÷ T for each channel, then ratio = f2 ÷ f1. Because both readings use the same timebase, the
          ratio of the periods gives the same answer inverted: f2 ÷ f1 = T1 ÷ T2.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          All three need the signals on screen at the same time, which means a scope with at least two
          channels. They also assume each signal is steady enough to have a frequency. A signal that changes
          speed, such as a motor ramping up or a sweeping oscillator, gives a different answer every sweep;
          capture it in Single mode and measure the part you care about. If one signal is buried in noise,
          clean up the probing first, because a noisy edge makes both the trigger and the period reading
          jump around.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="connect-both-signals">Connect both signals and set each channel</StepHeading>
        <p className="text-muted leading-7">
          Put the reference signal on CH1 and the signal under test on CH2, both probes on 10x with the
          channel attenuation set to match. Use DC coupling unless one signal rides on a large DC level. Set
          V/div on each channel so the trace fills about a third of the screen, then use each channel&apos;s
          vertical position to stack them, CH1 in the top half and CH2 in the bottom, so neither hides the
          other. Trigger on CH1 with an edge trigger at the middle of its swing; if the trace will not settle,
          see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-each-period">Measure each period and convert to frequency</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the timebase so the slower signal shows at least two full cycles. Count the divisions in one
          period of each trace, or better, across several periods, then multiply by the time/div.
        </p>
        <Figure
          caption={
            <>
              Two signals at 0.5 ms/div. CH1 (green, top) completes one cycle in 5 divisions, T1 = 2.5 ms, so
              f1 = 400 Hz. CH2 (blue, bottom) completes one cycle in 2.5 divisions, T2 = 1.25 ms, so f2 = 800
              Hz: exactly twice CH1.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={1.4}
            offset={2}
            second={{ wave: "sine", cycles: 4, amplitude: 1.4, offset: -2, label: "CH2" }}
            labels={{ left: "CH1 / CH2", right: "0.5 ms/div" }}
            marks={[
              { x1: 0, y1: 3.8, x2: 5, y2: 3.8, text: "T1 = 2.5 ms" },
              { x1: 0, y1: 7.8, x2: 2.5, y2: 7.8, text: "T2 = 1.25 ms" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Most digital scopes can also show the frequency of each channel automatically in the measure menu.
          Use it, but check one reading by hand: an auto measurement can lock onto noise or ringing and report
          a multiple of the real frequency. The{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            frequency measurement guide
          </Link>{" "}
          covers that check in detail.
        </p>
        <DataTable
          head={["Time/div", "CH1 period", "f1", "CH2 period", "f2", "f2 ÷ f1"]}
          rows={[
            ["0.5 ms (figure)", "5 div = 2.5 ms", "400 Hz", "2.5 div = 1.25 ms", "800 Hz", "2"],
            ["10 µs", "4 div = 40 µs", "25 kHz", "6 div = 60 µs", "16.67 kHz", "≈ 0.667 (2:3)"],
            ["1 µs", "2 div = 2 µs", "500 kHz", "8 div = 8 µs", "125 kHz", "0.25 (1:4)"],
            ["5 ms", "4 div = 20 ms", "50 Hz", "3.3 div = 16.5 ms", "≈ 60.6 Hz", "≈ 1.21"],
          ]}
          mono={[2, 4, 5]}
        />
      </section>

      <section>
        <StepHeading n={3} id="work-out-the-ratio">Work out the ratio and what it means</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Divide one frequency by the other. A clean whole-number result usually means one signal is derived
          from the other: a divide-by-two counter stage, a PLL multiplier, or a clock divided down for a
          peripheral. A ratio that is close to, but not exactly, a simple fraction usually means two
          independent sources that only happen to be similar, such as two crystal oscillators of the same
          nominal frequency.
        </p>
        <p className="text-muted leading-7">
          A related check is whether the two signals stay locked. With CH1 triggered, a derived signal on CH2
          stands perfectly still. An independent one slowly slides, even if its period reading looks identical.
          That movement is often a faster answer than any calculation.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="lissajous-xy-mode">Read the ratio from a Lissajous figure</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most digital scopes offer an XY display mode, usually in the horizontal or display menu; check your
          manual for where yours keeps it. XY mode plots CH1 on the horizontal axis against CH2 on the vertical
          axis. Set both channels to similar V/div so the figure is roughly square and centred. With two sine
          waves in an exact ratio, the spot traces a closed, stationary figure whose shape gives the ratio.
        </p>
        <p className="text-muted leading-7 mb-4">
          The counting rule: count how many times the figure touches the top edge of its bounding box, and how
          many times it touches a side edge. Then f(CH2) ÷ f(CH1) = top touches ÷ side touches.
        </p>
        <DataTable
          head={["f(CH2) : f(CH1)", "Typical figure", "Top touches", "Side touches"]}
          rows={[
            ["1 : 1", "Line, ellipse or circle, depending on phase", "1", "1"],
            ["2 : 1", "Figure eight lying on its side, like ∞ (a single arc at some phases)", "2", "1"],
            ["1 : 2", "Figure eight standing upright (a sideways arc at some phases)", "1", "2"],
            ["3 : 2", "Pretzel-like figure with three upper loops", "3", "2"],
          ]}
          mono={[2, 3]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          For a 1:1 ratio, the shape tells you the phase rather than the frequency; our{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            phase difference guide
          </Link>{" "}
          shows those ellipses. Lissajous figures get hard to count above ratios of about 5:1, and they only
          stay still when the ratio is exact.
        </p>
        <Figure caption={<>The classic comparison against a known reference, such as a signal generator.</>}>
          <FlowDiagram
            steps={[
              { label: "Reference on CH1", sub: "Known frequency, e.g. a generator" },
              { label: "Unknown on CH2", sub: "Same ground, similar V/div" },
              { label: "XY mode", sub: "CH1 horizontal, CH2 vertical" },
              { label: "Adjust", sub: "Tune the reference until the figure stops" },
              { label: "Count", sub: "Top ÷ side touches = ratio" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="divider-example" className="text-xl font-semibold mb-3">Worked example: checking a clock divider</h2>
        <p className="text-muted leading-7 mb-4">
          Suppose a board has a 1 MHz oscillator feeding a counter chip, and the counter&apos;s output should
          be the input divided by 8. Put the oscillator on CH1 and the counter output on CH2, trigger on CH2
          rising, and set 1 µs/div so a whole output cycle fits on screen.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            CH1 shows one cycle per division: T1 = 1 µs, f1 = 1 MHz.
          </li>
          <li>
            CH2 shows one cycle in 8 divisions: T2 = 8 µs, f2 = 125 kHz.
          </li>
          <li>
            Ratio f1 ÷ f2 = 1 MHz ÷ 125 kHz = 8, so the divider is doing its job.
          </li>
        </ul>
        <p className="text-muted leading-7 mb-4">
          Now look at the timing as well as the count. In a working divider every CH2 edge sits a fixed, short
          delay after a CH1 edge, and both traces stand still together. If CH2 shows 7 or 9 input cycles in some
          periods, the counter is missing or gaining counts, often because of a noisy or slow input edge. If CH2
          drifts against CH1 instead of standing still, it is not being clocked by that oscillator at all.
        </p>
        <p className="text-muted leading-7">
          The same approach checks a PWM frequency against its timer clock, a UART baud clock against its
          crystal, or a microcontroller&apos;s clock output against the crystal driving it. For the edge-to-edge
          delay itself, see{" "}
          <Link href="/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope" className={link}>
            how to measure propagation delay
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="beat-and-drift" className="text-xl font-semibold mb-3">When the two frequencies are nearly equal</h2>
        <p className="text-muted leading-7 mb-4">
          Two frequencies a fraction of a percent apart give period readings that look the same. The difference
          shows up as drift instead. Trigger on CH1 and the CH2 trace slides along at the difference frequency:
          one full cycle of slip per 1 ÷ (f2 − f1) seconds. A 1000 Hz reference and a 1001 Hz signal slip one
          cycle per second; at 1000.1 Hz it takes ten seconds. Timing one complete slip with a stopwatch gives
          the difference directly.
        </p>
        <Figure
          caption={
            <>
              At 1 ms/div, CH1 (green) shows 5 cycles in 10 divisions, 500 Hz; CH2 (blue) shows 5.5 cycles,
              550 Hz. They start in step on the left and are half a cycle apart by the right edge, because a
              50 Hz difference slips one cycle every 20 ms. On a live screen, the untriggered CH2 trace would
              roll continuously.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={5}
            amplitude={1.4}
            offset={2}
            second={{ wave: "sine", cycles: 5.5, amplitude: 1.4, offset: -2, label: "CH2" }}
            labels={{ left: "CH1 / CH2", right: "1 ms/div" }}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same idea works in XY mode: a nearly 1:1 pair makes an ellipse that slowly collapses to a line,
          opens into a circle and back, completing the sequence once per cycle of difference. If you add both
          signals with a math function, the sum swells and shrinks at the difference frequency too; that is the
          beat you hear when two notes are slightly out of tune.
        </p>
      </section>

      <section>
        <h2 id="accuracy-limits" className="text-xl font-semibold mb-3">How accurate is the comparison?</h2>
        <p className="text-muted leading-7 mb-4">
          Reading divisions by eye is good to a few percent at best; cursors and auto measurements do better,
          and measuring across several cycles improves either. Because both channels share one timebase, a
          small timebase error affects both readings equally and largely cancels in the ratio, which is why
          a two-channel comparison is often more trustworthy than either absolute number. The scope&apos;s
          timebase accuracy is given on its datasheet, usually in parts per million.
        </p>
        <p className="text-muted leading-7">
          For absolute accuracy, a dedicated frequency counter is the better tool. Signals also need to sit well
          inside the scope&apos;s bandwidth to keep a clean shape; see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          . To compare timing and amplitude rather than frequency, see{" "}
          <Link href="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope" className={link}>
            how to compare input and output signals
          </Link>
          , and for checking a clock source itself, see{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator" className={link}>
            how to check a crystal oscillator
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need to compare frequencies</h2>
        <p className="text-muted leading-7 mb-4">
          You need at least two channels. A single-channel handheld can measure each frequency in turn but
          cannot show them together or use XY mode. Any two- or four-channel bench scope in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup will do the job; confirm XY mode in its manual if you plan to use Lissajous figures.
        </p>
        <ProductStrip
          title="Multi-channel scopes in our reviews"
          items={[
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; more bandwidth than the Rigol, for projects that will get more demanding.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
