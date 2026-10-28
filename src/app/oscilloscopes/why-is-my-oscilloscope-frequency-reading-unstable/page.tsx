import Link from "next/link";
import {
  BarChart,
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
  "Oscilloscope frequency measurement unstable or showing ****? Fix the trigger, noise, cycles on screen, sample rate and coupling, and learn what drift is normal.";

export const metadata = buildMetadata({
  title: "Oscilloscope Frequency Reading Unstable? Fixes",
  description,
  path: "/oscilloscopes/why-is-my-oscilloscope-frequency-reading-unstable",
});

const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const edux = picks.find((p) => p.name === "Keysight EDUX1052G")!;
const cml = picks.find((p) => p.name === "Siglent SDS1102CML+")!;

const link = "text-accent hover:underline";

/**
 * A slow, noisy edge crossing the measurement threshold. Without hysteresis every
 * noise wiggle through the threshold is counted as an edge; with a hysteresis band
 * the counter only re-arms after the signal leaves the band, so it counts once.
 */
function ThresholdCrossingDiagram() {
  const W = 440;
  const x0 = 20;
  const x1 = 420;
  const n = 200;
  const thr = 110;
  const band = 16;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const v = Math.min(1, Math.max(0, (t - 0.15) / 0.7));
    const noise = 6 * Math.sin(i * 1.3) + 4 * Math.sin(i * 2.9 + 1);
    return { x: x0 + t * (x1 - x0), y: 180 - 140 * v + noise };
  });
  // Upward crossings of the bare threshold (smaller y = higher voltage).
  const crossings = pts.filter((p, i) => i > 0 && pts[i - 1].y > thr && p.y <= thr);
  // With hysteresis: arm below the band, count on the first rise above it.
  let armed = false;
  let counted: { x: number; y: number } | undefined;
  for (const p of pts) {
    if (p.y > thr + band) armed = true;
    if (armed && p.y < thr - band && !counted) counted = p;
  }
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  return (
    <svg
      viewBox={`0 0 ${W} 240`}
      className="w-full h-auto"
      role="img"
      aria-label={`Diagram of a slow, noisy rising edge passing through a frequency-measurement threshold. Without hysteresis the noise crosses the threshold ${crossings.length} times, so one edge is counted as several; with a hysteresis band around the threshold it is counted once`}
    >
      <rect x={x0} y={thr - band} width={x1 - x0} height={band * 2} className="fill-accent/15" />
      <line x1={x0} y1={thr} x2={x1} y2={thr} className="stroke-accent" strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1={x0} y1={thr - band} x2={x1} y2={thr - band} className="stroke-border" strokeWidth="0.8" />
      <line x1={x0} y1={thr + band} x2={x1} y2={thr + band} className="stroke-border" strokeWidth="0.8" />
      <path d={path} fill="none" className="stroke-foreground" strokeWidth="1.6" strokeLinejoin="round" />
      {crossings.map((c) => (
        <circle key={c.x} cx={c.x} cy={c.y} r="4" fill="#d9480f" />
      ))}
      {counted && (
        <g>
          <circle cx={counted.x} cy={counted.y} r="7" fill="none" className="stroke-accent" strokeWidth="2" />
          <text x={counted.x + 10} y={counted.y - 8} fontSize="10.5" className="fill-accent">
            1 count with hysteresis
          </text>
        </g>
      )}
      <text x={x0} y={thr - band - 6} fontSize="10" className="fill-muted">Hysteresis band</text>
      <text x={x1} y={thr + band + 14} fontSize="10" textAnchor="end" className="fill-accent">Threshold (50% level)</text>
      <circle cx={x0 + 6} cy="222" r="4" fill="#d9480f" />
      <text x={x0 + 16} y="226" fontSize="10.5" className="fill-foreground">
        {crossings.length} threshold crossings without hysteresis: one edge counted {crossings.length} times
      </text>
    </svg>
  );
}

export default function WhyIsMyOscilloscopeFrequencyReadingUnstablePage() {
  return (
    <HowToShell
      title="Why Is My Oscilloscope Frequency Reading Unstable?"
      description={description}
      path="/oscilloscopes/why-is-my-oscilloscope-frequency-reading-unstable"
      category="oscilloscopes"
      published="2026-10-29"
      intro={
        <>
          An oscilloscope frequency reading is unstable, or shows &quot;?&quot; or &quot;****&quot;, when the scope
          cannot find clean, repeatable edges to time: the trigger is not locking, noise near the measurement
          threshold is being counted as extra edges, the screen holds less than one cycle or so many cycles that
          each one gets only a few samples, or the measurement is pointed at the wrong channel. Once those are
          fixed, a small, steady wobble in the last digit is normal, and anything larger is often the signal
          itself drifting or being modulated. This guide shows how to tell which, with the arithmetic to judge
          how much variation is acceptable.
        </>
      }
      aside={{
        image: edux.image,
        alt: "Keysight EDUX1052G two-channel oscilloscope with built-in generator",
        caption: (
          <>
            Some scopes add a dedicated frequency counter alongside waveform measurements. See how one compares
            in{" "}
            <Link href="/oscilloscopes/keysight-edux1052g-vs-rigol-ds1054z" className={link}>
              Keysight EDUX1052G vs Rigol DS1054Z
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-measured", label: "How the Freq readout works" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "step-trigger", label: "1. Get a stable trigger" },
        { id: "step-source", label: "2. Check the measurement source" },
        { id: "step-cycles", label: "3. Put the right number of cycles on screen" },
        { id: "step-noise", label: "4. Stop noise double-counting edges" },
        { id: "step-samplerate", label: "5. Check sample rate at slow timebases" },
        { id: "step-coupling", label: "6. Use DC coupling for slow signals" },
        { id: "step-average", label: "7. Average and use statistics" },
        { id: "normal-variation", label: "How much variation is normal?" },
        { id: "counter-vs-waveform", label: "Counter vs waveform measurement" },
      ]}
      faq={[
        {
          q: "What does **** or ? mean in an oscilloscope frequency measurement?",
          a: "It means the scope could not calculate a valid value from the current capture. The usual reasons are less than one full cycle on screen, a signal too small or too far off-screen to find the threshold crossings, or a measurement pointed at a channel with nothing on it. Set the timebase so two to ten cycles fit on screen, fit the signal vertically, and check the measurement source.",
        },
        {
          q: "Why does my oscilloscope show double the real frequency?",
          a: "It is usually counting each edge twice. On a slow or noisy signal, noise makes the trace wiggle back and forth through the measurement threshold, so the scope sees two or more crossings per real edge. Turn on noise reject or HF reject, use a bandwidth limit for slow signals, raise the signal to fill more of the screen, or add averaging so stray crossings stop corrupting the period.",
        },
        {
          q: "How accurate is an oscilloscope frequency measurement?",
          a: "It depends on the method. Readings computed from the captured waveform are limited by sample interval and how many cycles are measured, and on a clean signal with several cycles on screen they are often good to well under 1%. A dedicated hardware counter, where fitted, typically shows five or six digits and is limited mainly by the scope's timebase reference, often specified in tens of parts per million.",
        },
        {
          q: "Is it normal for the frequency reading to change in the last digit?",
          a: "Yes. A displayed value flickering between 1.0002 kHz and 0.9998 kHz is a swing of about ±0.02%, which is normal resolution flicker for a waveform-based measurement. Use the statistics or averaging function to see the mean and spread. Variation of several percent is not resolution noise; it points to a trigger, noise or setup problem, or a signal that genuinely varies.",
        },
        {
          q: "Should I use an oscilloscope or a frequency counter to measure frequency?",
          a: "For checking that a clock, PWM or oscillator is roughly right, the scope's measurement is fine and lets you see the waveform at the same time. For calibrating an oscillator, tuning a crystal to parts per million or logging slow drift, a dedicated counter or a scope's built-in hardware counter with a good timebase reference is the better tool, because it gates over many cycles.",
        },
        {
          q: "Why is my oscilloscope frequency reading unstable on mains or very low frequencies?",
          a: "Low-frequency signals are easily affected by AC coupling, which attenuates and shifts anything near its cutoff of a few hertz, and by slow timebases, where the scope samples slowly and updates rarely. Use DC coupling, enough time per division to fit at least two cycles, and averaging. For mains-derived signals, line triggering also steadies the display.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "The basic method: count divisions, find the period, take 1/T.",
        },
        {
          href: "/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting",
          title: "How to Stop a Scope Waveform From Drifting",
          desc: "Steady the trigger so the measurement has something to lock to.",
        },
        {
          href: "/oscilloscopes/how-to-compare-clock-jitter-using-an-oscilloscope",
          title: "Compare Clock Jitter Using an Oscilloscope",
          desc: "When the variation is real, quantify it edge by edge.",
        },
        {
          href: "/oscilloscopes/why-does-my-oscilloscope-waveform-look-distorted",
          title: "Why Does My Oscilloscope Waveform Look Distorted?",
          desc: "When the reading is steady but the shape looks wrong.",
        },
      ]}
    >
      <section id="how-measured">
        <h2 className="text-xl font-semibold mb-3">How the Freq readout works</h2>
        <p className="text-muted leading-7 mb-4">
          An automatic frequency measurement does not &quot;listen&quot; to the signal the way a radio does. In
          most scopes it takes the captured record, finds the points where the waveform crosses a reference
          level, usually 50% of the way between its top and base, measures the time between matching crossings
          to get the period T, and reports f = 1 ÷ T. Everything that makes those crossings unclear,
          inconsistent or too few makes the reading jump or turn into dashes. Some scopes also have a separate
          hardware counter that counts edges from the trigger circuit over a fixed gate time, which behaves a
          little differently and is covered at the end.
        </p>
        <FlowDiagram
          steps={[
            { label: "Capture", sub: "Trigger fires, record stored" },
            { label: "Find top and base", sub: "Sets the 50% threshold" },
            { label: "Find crossings", sub: "Rising edges at the threshold" },
            { label: "Time them", sub: "Period T between crossings" },
            { label: "f = 1 ÷ T", sub: "Shown, then the next capture" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Because the period is what is measured, it helps to think in periods. Frequency and period are
          reciprocals: f = 1 ÷ T and T = 1 ÷ f. A 16 MHz clock has T = 1 ÷ 16,000,000 = 62.5 ns. A small
          relative error in T becomes the same relative error in f, so a 1 ns misjudged edge on that clock is
          1 ÷ 62.5 = 1.6% of the period, and the reading moves from 16.0 MHz to 1 ÷ 61.5 ns ≈ 16.26 MHz. That is
          why fast signals at modest sample rates show the most jumpy readings.
        </p>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Reading jumps and the trace slides sideways", "Trigger not locking", "Is the trigger status Trig'd or Auto?", "Set source, level inside the signal, Normal mode"],
            ["Reading roughly double, or random high values", "Noise causing extra threshold crossings", "Zoom in on an edge and look for wiggles", "Noise or HF reject, BW limit, larger signal, averaging"],
            ["**** or ? instead of a number", "Less than one full cycle on screen", "Count cycles across the 10 divisions", "Slow the timebase until 2 to 10 cycles fit"],
            ["Erratic reading with hundreds of cycles on screen", "Too few samples per cycle in the measured record", "Divide displayed sample rate by signal frequency", "Faster timebase so fewer cycles fit"],
            ["Wrong or jumping value at slow time/div only", "Low sample rate, possible aliasing", "Read the sample rate on screen", "Faster timebase, deeper memory"],
            ["Low-frequency reading drifts or vanishes", "AC coupling near its cutoff", "Check channel coupling", "Use DC coupling"],
            ["Plausible but wrong number, or noise-like values", "Measurement on the wrong channel", "Check the measurement's source label", "Set the source to the probed channel"],
            ["Small, steady wander that tracks temperature or load", "The signal really varies", "Use statistics: mean, min, max, std dev", "Judge against the oscillator's tolerance"],
          ]}
        />
      </section>

      <section id="step-trigger">
        <StepHeading n={1}>Get a stable trigger first</StepHeading>
        <p className="text-muted leading-7">
          A trace that slides or flickers sideways gives every capture a different set of edges, and some
          captures catch partial or misaligned cycles. Fix the picture before trusting any number. Set the
          trigger source to the channel you are measuring, put the level about halfway up the signal, choose a
          rising edge, and use Normal mode once the level is right so the scope only draws captures that
          actually triggered. If the trace still will not settle, work through{" "}
          <Link href="/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting" className={link}>
            how to stop a waveform drifting
          </Link>
          , and if the scope never triggers at all, see{" "}
          <Link href="/oscilloscopes/why-is-my-oscilloscope-trigger-not-working" className={link}>
            why an oscilloscope trigger is not working
          </Link>
          .
        </p>
      </section>

      <section id="step-source">
        <StepHeading n={2}>Check the measurement is on the right source</StepHeading>
        <p className="text-muted leading-7">
          Automatic measurements are attached to a source channel that you pick when you add them, and it does
          not follow the probe. If you move the probe from CH1 to CH2, the Freq readout may still be timing
          CH1, which is now an unconnected input producing noise and random values. Look at the label beside
          the reading (often &quot;Freq(1)&quot; or a colored channel tag) and set it to the probed channel. If a
          channel shows nothing at all, check{" "}
          <Link href="/oscilloscopes/why-is-there-no-signal-on-one-oscilloscope-channel" className={link}>
            why there is no signal on one channel
          </Link>
          . If the measurement is on a math trace, make sure the math output actually crosses its threshold.
        </p>
      </section>

      <section id="step-cycles">
        <StepHeading n={3}>Put the right number of cycles on screen</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With less than one complete cycle visible, there are not two matching crossings to time, so the scope
          shows dashes or a question mark. Go too far the other way and the reading can become erratic too: if
          the screen holds hundreds of cycles, each cycle is covered by very few points, especially on scopes
          that compute measurements from a reduced display record rather than the full memory. As an example,
          if a measurement worked from about 1,000 points and the screen held 500 cycles, each cycle would get
          only 1,000 ÷ 500 = 2 points, too few to place an edge.
        </p>
        <Figure caption="Left: under one cycle across the screen gives no complete period to time. Center: about four cycles, the sweet spot. Right: so many cycles that each is a few pixels wide and edges cannot be placed accurately. Illustrative screens.">
          <div className="grid grid-cols-3 gap-3">
            <ScopeScreen wave="sine" cycles={0.6} amplitude={2.5} labels={{ left: "0.6 cycle", right: "Freq ****" }} />
            <ScopeScreen wave="sine" cycles={4} amplitude={2.5} labels={{ left: "4 cycles", right: "stable" }} />
            <ScopeScreen wave="sine" cycles={60} amplitude={2.5} labels={{ left: "60 cycles", right: "erratic" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Aim for roughly two to ten cycles across the ten divisions. For a signal of frequency f, time/div ≈
          cycles wanted ÷ (10 × f). For four cycles of a 25 kHz signal: 4 ÷ (10 × 25,000) = 16 µs/div, so the
          nearest standard setting of 10 µs/div (2.5 cycles) or 20 µs/div (5 cycles) both work.
        </p>
      </section>

      <section id="step-noise">
        <StepHeading n={4}>Stop noise from double-counting edges</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a fast, clean edge the signal passes through the threshold once. On a slow edge with noise riding
          on it, the trace can cross the threshold several times in quick succession, and a scope without
          enough hysteresis counts each crossing as a new edge. The measured period then becomes a fraction of
          the real one and the frequency reads double, triple or randomly high.
        </p>
        <Figure caption="A slow rising edge with noise. Every red dot is a separate crossing of the bare threshold; with a hysteresis band the measurement re-arms only after the signal leaves the band, so the edge is counted once. Illustrative.">
          <ThresholdCrossingDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          You can estimate how wide the danger zone is. The slope of a sine wave at its zero crossing is 2π × f
          × A, where A is its peak amplitude. A 1 kHz sine with A = 0.5 V rises at 2π × 1,000 × 0.5 ≈ 3,140 V/s,
          or 3.14 mV per microsecond. With 20 mV of peak-to-peak noise on it, the trace sits within the noise of
          the threshold for about 20 ÷ 3.14 ≈ 6.4 µs on every edge, plenty of time for several false crossings.
          Double the amplitude and that window halves; a square wave&apos;s fast edges barely have one at all.
        </p>
        <p className="text-muted leading-7">
          Fixes, roughly in order: make the signal fill more of the screen vertically so the scope&apos;s
          threshold logic has more resolution; turn on noise reject or HF reject in the trigger menu, which adds
          hysteresis or filtering to the trigger path; switch on the bandwidth limit if the signal is slow
          enough to pass through it; and add averaging. Shortening the probe ground and using a 10x probe also
          remove a lot of pickup, as explained in{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why an oscilloscope waveform looks noisy
          </Link>
          .
        </p>
      </section>

      <section id="step-samplerate">
        <StepHeading n={5}>Check the sample rate at slow timebases</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The time resolution of a waveform measurement is set by the interval between samples. At 1 GSa/s
          samples are 1 ns apart; at 250 MSa/s they are 4 ns apart. Without interpolation, one sample of error
          on a single 1 µs period is 1 ÷ 1,000 = 0.1% at 1 GSa/s but 4 ÷ 1,000 = 0.4% at 250 MSa/s. Most scopes
          interpolate between samples, so real results are usually better, but the principle holds: fewer
          samples per period means a coarser, jumpier reading.
        </p>
        <DataTable
          head={["Signal", "Period", "Sample interval", "Samples per period", "One-sample error"]}
          mono={[3, 4]}
          rows={[
            ["10 kHz", "100 µs", "1 ns (1 GSa/s)", "100,000", "0.001%"],
            ["1 MHz", "1 µs", "1 ns (1 GSa/s)", "1,000", "0.1%"],
            ["1 MHz", "1 µs", "4 ns (250 MSa/s)", "250", "0.4%"],
            ["16 MHz", "62.5 ns", "4 ns (250 MSa/s)", "15.6", "6.4%"],
            ["16 MHz", "62.5 ns", "1 ns (1 GSa/s)", "62.5", "1.6%"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Worst-case resolution for a single-period measurement with no interpolation; illustrative arithmetic,
          not any one scope&apos;s specification. Remember that at slow time/div settings a scope reduces its
          sample rate to fit the window into memory, and turning on more channels can divide the maximum rate
          on many models. If the reading only goes wrong at slow timebases, check the sample rate shown on
          screen; if it has fallen below about twice the signal frequency, the scope is measuring an alias.{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            What GSa/s means
          </Link>{" "}
          covers the memory and sample-rate trade-off in more depth.
        </p>
      </section>

      <section id="step-coupling">
        <StepHeading n={6}>Use DC coupling for low-frequency signals</StepHeading>
        <p className="text-muted leading-7">
          AC coupling puts a capacitor in the input path, forming a high-pass filter whose cutoff is typically a
          few hertz to around 10 Hz, depending on the scope. Signals near that cutoff are attenuated and phase
          shifted, so the waveform drifts up and down as its content changes and its crossings of the 50%
          threshold wander. Pulse trains are affected even at higher frequencies: AC coupling centers the
          average on zero, so when the duty cycle changes, the whole trace moves and the measured edges move
          with it. For anything below a few hundred hertz, and for pulses whose duty cycle varies, switch the
          channel to DC coupling.
        </p>
      </section>

      <section id="step-average">
        <StepHeading n={7}>Average the reading and use statistics</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the setup is right, use the measurement statistics view (mean, minimum, maximum and standard
          deviation) instead of staring at a single live number. Averaging independent readings shrinks the
          random part of the spread by the square root of the number averaged. If single readings of a 10 kHz
          signal scatter with a standard deviation of 40 Hz (0.4%), the mean of 16 readings has a standard
          deviation of about 40 ÷ √16 = 10 Hz (0.1%), and of 100 readings about 40 ÷ 10 = 4 Hz (0.04%).
        </p>
        <BarChart
          items={[
            { label: "1 reading", value: 40, display: "±40 Hz (0.4%)" },
            { label: "Mean of 4", value: 20, display: "40 ÷ √4 = ±20 Hz" },
            { label: "Mean of 16", value: 10, display: "40 ÷ √16 = ±10 Hz", highlight: true },
            { label: "Mean of 64", value: 5, display: "40 ÷ √64 = ±5 Hz", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Spread (one standard deviation) of a 10 kHz frequency reading as more readings are averaged, starting
          from an illustrative ±40 Hz. Measuring across several periods on one capture helps the same way: a
          1 ns timing error spread over ten 1 µs periods is 1 ÷ 10,000 = 0.01% instead of 0.1%. Averaging only
          removes random scatter, not a systematic error such as double-counting or a wrong source, so fix those
          first.
        </p>
      </section>

      <Callout title="Measuring frequency on mains-powered circuits">
        Frequency checks often lead people to the mains side of a power supply or motor controller. A bench
        scope&apos;s probe ground clip is connected to mains earth through its power cord, so clipping it to a
        mains-referenced or high-voltage point creates a short through the probe and the scope, which can
        destroy both and can hurt you. Never defeat the scope&apos;s earth to get around this. Use a rated
        differential probe or an isolated-input instrument, check the probe&apos;s voltage and CAT rating, and
        leave mains-side work to a qualified electrician if you are unsure. For checking the grid frequency
        itself, see{" "}
        <Link href="/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope" className={link}>
          how to measure mains frequency safely
        </Link>
        .
      </Callout>

      <section id="normal-variation">
        <h2 className="text-xl font-semibold mb-3">How much variation is normal?</h2>
        <p className="text-muted leading-7 mb-4">
          After the setup is fixed, some movement may be the signal itself. Oscillators are only as stable as
          their timing element, and some signals are deliberately varied. Compare the spread you see with the
          typical tolerance of the source; the figures below are typical published ranges and vary by part, so
          check the datasheet for the exact component in your circuit.
        </p>
        <BarChart
          log
          items={[
            { label: "Quartz crystal oscillator", value: 50, display: "±10–50 ppm (≤0.005%)" },
            { label: "Spread-spectrum clock", value: 5000, display: "often ~0.5% swept" },
            { label: "Ceramic resonator", value: 5000, display: "around ±0.5%" },
            { label: "MCU internal RC oscillator", value: 20000, display: "roughly ±1–2% or more" },
            { label: "555 or RC oscillator", value: 50000, display: "several %, drifts" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Typical frequency tolerance by oscillator type, in parts per million (log scale); upper end of each
          range shown. Worked examples: a 16 MHz crystal at ±50 ppm may sit anywhere within 16,000,000 × 50 ÷
          1,000,000 = ±800 Hz, so a reading of 16.0006 MHz is perfectly normal, while 16.3 MHz is not a crystal
          tolerance issue. A 16 MHz ceramic resonator at ±0.5% may be ±80 kHz off. A microcontroller&apos;s
          internal 8 MHz RC oscillator at ±2% may read anywhere from 7.84 to 8.16 MHz and drift as it warms up.
        </p>
        <DataTable
          head={["Signal type", "Variation you may see", "Normal?"]}
          rows={[
            ["Crystal-clocked MCU or logic clock", "Last one or two digits flicker", "Yes, resolution flicker"],
            ["Crystal clock reading off by several %", "Steady but wrong", "No: wrong harmonic, wrong source or double-counting"],
            ["Spread-spectrum clock (PCs, some SoCs)", "Reading wanders by a fraction of a percent", "Yes, the clock is swept on purpose"],
            ["RC oscillator, 555 timer, internal MCU clock", "Drift of a percent or more with temperature and supply", "Usually yes"],
            ["FM, FSK or PWM with dithering", "Large, regular jumps", "Yes, the signal is modulated"],
            ["Mains-derived signals", "Small slow wander around 50 or 60 Hz", "Yes, grid frequency moves slightly with load"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          To see real variation edge by edge rather than as a jumpy number, trigger on one edge and watch a
          later edge spread with persistence on, or use period statistics; the method is in{" "}
          <Link href="/oscilloscopes/how-to-compare-clock-jitter-using-an-oscilloscope" className={link}>
            how to compare clock jitter
          </Link>
          . For crystals specifically, see{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator" className={link}>
            how to check a crystal oscillator
          </Link>
          .
        </p>
      </section>

      <section id="counter-vs-waveform">
        <h2 className="text-xl font-semibold mb-3">Hardware counter vs waveform measurement</h2>
        <p className="text-muted leading-7 mb-4">
          A waveform-based Freq measurement times the crossings in one capture, so its resolution depends on the
          sample interval, the number of periods on screen and any interpolation. On a clean signal with several
          cycles visible it is commonly good to a fraction of a percent, which is plenty for checking that a
          PWM, a UART clock or an oscillator is in the right place.
        </p>
        <p className="text-muted leading-7 mb-4">
          Some scopes also include a hardware frequency counter that counts trigger events over a gate time,
          often displaying five or six digits. A counter that gates over 100,000 cycles of a 1 MHz signal sees a
          0.1 s window, and a one-count uncertainty over that window is 1 ÷ 100,000 = 0.001%, far finer than
          one capture can resolve. Its absolute accuracy is then limited by the scope&apos;s own timebase
          reference, which on general-purpose scopes is commonly specified in tens of parts per million; check
          your model&apos;s datasheet for the exact figure. Because the counter works from the trigger
          comparator, it still needs a clean, stable trigger, and noise causes the same double-counting.
        </p>
        <DataTable
          head={["", "Waveform Freq measurement", "Hardware counter"]}
          rows={[
            ["Works from", "Crossings in one captured record", "Trigger events over a gate time"],
            ["Typical resolution", "Fraction of a percent, better with more cycles", "Five or six digits on many scopes"],
            ["Main limit", "Sample interval, cycles on screen, noise", "Timebase reference accuracy, often tens of ppm"],
            ["Best for", "Quick checks while viewing the waveform", "Tuning, calibration, small drifts"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the hand method of reading frequency from the graticule and cross-checking the automatic value,
          see{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          Fix the trigger, confirm the source channel, and fit two to ten cycles on screen at a healthy sample
          rate with DC coupling. Then suppress noise near the 50% threshold and use statistics instead of the
          live digit. Remember Δf ÷ f ≈ ΔT ÷ T: a 1 ns timing error on a 62.5 ns period is 1.6%. Variation that
          remains and matches the oscillator&apos;s tolerance, such as ±50 ppm on a crystal, is the signal, not
          the scope.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Scopes with dedicated frequency counters or headroom for timing work"
        items={[
          { name: edux.name, image: edux.image, alt: "Keysight EDUX1052G oscilloscope", href: "/oscilloscopes/keysight-edux1052g-vs-rigol-ds1054z", note: "Two 50 MHz channels at 1 GSa/s on all channels, with a frequency counter and built-in 20 MHz generator." },
          { name: cml.name, image: cml.image, alt: "Siglent SDS1102CML+ oscilloscope", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus", note: "100 MHz, two channels, 1 GSa/s, with a 6-digit frequency counter; memory is shallow." },
          { name: ds1054z.name, image: ds1054z.image, alt: "Rigol DS1054Z oscilloscope", href: "/oscilloscopes/rigol-ds1054z-review", note: "Four channels, 50 MHz, 1 GSa/s on one channel (250 MSa/s with three or four on). Hands-on tested by OhmSavvy." },
        ]}
      />
    </HowToShell>
  );
}
