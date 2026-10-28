import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  SamplingChart,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Oscilloscope waveform looks distorted? Tell scope-made distortion (probe, bandwidth, sample rate, ground lead) from real circuit distortion, step by step.";

export const metadata = buildMetadata({
  title: "Why Does My Oscilloscope Waveform Look Distorted?",
  description,
  path: "/oscilloscopes/why-does-my-oscilloscope-waveform-look-distorted",
});

const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const sds1202 = picks.find((p) => p.name === "Siglent SDS1202X-E")!;

const link = "text-accent hover:underline";

/** The measurement chain from circuit to screen, with the distortion each stage can add. */
function DistortionChainDiagram() {
  const stages = [
    { name: "Circuit", a: "Real distortion: clipping, crossover,", b: "slew limiting. Present at the node itself." },
    { name: "Probe", a: "Trimmer off: rounded or peaked corners.", b: "1x loading, long ground lead: slow, ringing edges." },
    { name: "Front end", a: "Bandwidth or BW limit too low: square", b: "goes sine-ish. Overdrive: flat tops." },
    { name: "ADC", a: "Too few samples per cycle: jagged or", b: "aliased shape, worst at slow time/div." },
    { name: "Display", a: "sin(x)/x pre-ringing, averaging or", b: "high-res smoothing, math on the trace." },
  ];
  const rowH = 58;
  return (
    <svg
      viewBox="0 0 440 300"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of the oscilloscope measurement chain in five stages, circuit, probe, front end, analog-to-digital converter and display, with the kind of waveform distortion each stage can add: real circuit distortion, probe compensation and loading errors, bandwidth roll-off and overdrive, undersampling and aliasing, and display interpolation or processing artifacts"
    >
      {stages.map((s, i) => {
        const y = 10 + i * rowH;
        const isCircuit = i === 0;
        return (
          <g key={s.name}>
            <rect
              x="10"
              y={y}
              width="112"
              height="40"
              rx="6"
              className={isCircuit ? "fill-accent/15 stroke-accent" : "fill-surface stroke-foreground"}
              strokeWidth="1.4"
            />
            <text x="66" y={y + 25} fontSize="12" fontWeight="600" textAnchor="middle" className="fill-foreground">
              {s.name}
            </text>
            {i < stages.length - 1 && (
              <g>
                <line x1="66" y1={y + 40} x2="66" y2={y + rowH - 4} className="stroke-accent" strokeWidth="1.6" />
                <path d={`M61 ${y + rowH - 9} L66 ${y + rowH - 2} L71 ${y + rowH - 9}`} fill="none" className="stroke-accent" strokeWidth="1.6" />
              </g>
            )}
            <text x="136" y={y + 17} fontSize="10.5" className="fill-foreground">{s.a}</text>
            <text x="136" y={y + 32} fontSize="10.5" className="fill-muted">{s.b}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function WhyDoesMyOscilloscopeWaveformLookDistortedPage() {
  return (
    <HowToShell
      title="Why Does My Oscilloscope Waveform Look Distorted?"
      description={description}
      path="/oscilloscopes/why-does-my-oscilloscope-waveform-look-distorted"
      category="oscilloscopes"
      published="2026-10-29"
      intro={
        <>
          An oscilloscope waveform looks distorted either because the measurement chain is reshaping it (an
          uncompensated probe, too little bandwidth, too low a sample rate, a long ground lead, 1x loading, an
          overdriven input or a filter left on) or because the signal really is distorted. You tell the two apart
          by changing one thing in the measurement at a time: distortion that changes when you change the probe,
          timebase or settings belongs to the scope, and distortion that stays put belongs to your circuit. This
          guide is the diagnostic hub; each cause links to a deeper guide when you need one.
        </>
      }
      aside={{
        image: dho804.image,
        alt: "Rigol DHO804 four-channel 12-bit digital oscilloscope",
        caption: (
          <>
            Bandwidth and sample rate decide how faithfully a scope draws fast edges. Compare two popular
            benchtops in{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
              Rigol DHO804 vs Siglent SDS1104X-E
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "scope-or-circuit", label: "Scope-made or real? The one-change test" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "step-compensation", label: "1. Check probe compensation" },
        { id: "step-bandwidth", label: "2. Check bandwidth against the edge" },
        { id: "step-sampling", label: "3. Check sample rate and aliasing" },
        { id: "step-ground", label: "4. Shorten the ground lead" },
        { id: "step-loading", label: "5. Switch from 1x to 10x" },
        { id: "step-overdrive", label: "6. Bring the whole signal on screen" },
        { id: "step-filters", label: "7. Turn off BW limit and filters" },
        { id: "step-display", label: "8. Rule out display artifacts" },
        { id: "real-distortion", label: "When the distortion is real" },
      ]}
      faq={[
        {
          q: "Why does my square wave look like a sine wave on my oscilloscope?",
          a: "The scope or probe is not passing enough of the square wave's harmonics. A square wave is built from its fundamental plus odd harmonics at three, five and seven times the frequency. If those sit above the scope's bandwidth, a 20 MHz bandwidth limit or a 1x probe's few-megahertz bandwidth, only the fundamental survives and the trace rounds into a sine-like shape. Turn the limit off, use 10x, or use a faster scope.",
        },
        {
          q: "Why are the corners of my square wave rounded or spiky?",
          a: "Almost always probe compensation. A 10x probe has a small trimmer capacitor that must be matched to the scope input it is plugged into. Under-compensated, corners are rounded and the top slopes up slowly; over-compensated, each edge has a spike that decays back to the flat top. Clip the probe to the calibration output and turn the trimmer until the top is flat and the corners are square.",
        },
        {
          q: "Can the oscilloscope itself distort a signal?",
          a: "Yes, in several ways. Limited bandwidth rounds fast edges, a low sample rate makes jagged or completely false shapes, an overdriven input clips the peaks, and filters, averaging or high-resolution modes smooth detail away. The probe adds its own effects through compensation, loading and its ground lead. Any distortion that changes when you change a setting or the probe is coming from the measurement, not the circuit.",
        },
        {
          q: "What is aliasing on an oscilloscope?",
          a: "Aliasing happens when the scope samples a signal too slowly, fewer than two samples per cycle, so the dots it joins up describe a different, slower waveform that is not really there. It is most common at slow timebase settings, where the sample rate drops to fit the record into memory. If the trace changes shape or frequency when you change time/div, suspect aliasing and speed the timebase up.",
        },
        {
          q: "Why does my waveform look different with a 1x probe than with 10x?",
          a: "A 1x probe connects the scope's full input capacitance plus the cable's capacitance straight to your circuit, often somewhere around 50 to 100 pF or more, and many 1x probes are only rated for a few megahertz. That load slows edges on any node with appreciable source resistance. A 10x probe presents roughly 10 MΩ and around 10 to 15 pF, so it disturbs the circuit far less.",
        },
        {
          q: "How do I know if distortion is in my circuit or my scope?",
          a: "Change the measurement and watch the distortion. Try the calibration output, a second probe, a short ground spring, 10x, a faster timebase and full bandwidth. If the shape changes with any of these, the measurement is responsible. If it stays identical, compare the stage's input and output on two channels: distortion present at the output but not the input is created by that stage.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why Does an Oscilloscope Waveform Look Noisy?",
          desc: "Fuzz and hum on the trace rather than a changed shape.",
        },
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Overshoot and Ringing",
          desc: "Put numbers on edge ringing once you know it is real.",
        },
        {
          href: "/oscilloscopes/why-is-my-oscilloscope-frequency-reading-unstable",
          title: "Why Is My Oscilloscope Frequency Reading Unstable?",
          desc: "When the shape looks fine but the Freq readout jumps around.",
        },
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "The -3 dB definition and why edges need headroom.",
        },
      ]}
    >
      <section id="scope-or-circuit">
        <h2 className="text-xl font-semibold mb-3">Scope-made or real? The one-change test</h2>
        <p className="text-muted leading-7 mb-4">
          Every waveform you see has passed through five stages: the circuit node, the probe, the scope&apos;s
          analog front end, the analog-to-digital converter and the display processing. Each stage can bend
          the shape in its own recognizable way, and only the first one is the distortion you actually want to
          find. The fastest way to sort them is to change exactly one part of the measurement at a time and
          see whether the odd shape follows the change. Swap the probe, flip 1x to 10x, double the time/div,
          turn the bandwidth limit off: a real circuit defect ignores all of that, while a measurement
          artifact moves, shrinks or vanishes.
        </p>
        <Figure caption="Where distortion can enter between your circuit and the screen. Only the first stage is a fault in the circuit; the other four are the measurement reshaping the signal.">
          <DistortionChainDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Before you start, it helps to name the shape. Rounded corners, a sloping top, spikes on every edge,
          ringing that dies away, a sine where you expected a square, a jagged staircase, flat-topped peaks and
          a trace whose frequency changes as you turn the timebase knob each point to a different stage. The
          table below maps those shapes to causes; the numbered steps then work through the checks in the
          order that finds the common faults soonest.
        </p>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Rounded corners or spikes on every edge of a square wave", "Probe not compensated", "Probe the calibration output and look at the top", "Adjust the probe trimmer until the top is flat"],
            ["Square wave looks like a sine, edges slow", "Bandwidth too low for the edge rate", "Estimate rise time: 0.35 ÷ bandwidth", "Use full bandwidth, 10x, or a faster scope"],
            ["Jagged steps, wrong frequency, shape changes with time/div", "Sample rate too low, aliasing", "Check the displayed sample rate; change time/div", "Faster timebase, fewer channels on, deeper memory"],
            ["Ringing after each fast edge", "Long probe ground lead", "Swap the clip lead for a short ground spring", "Ground right at the test point"],
            ["Edges slower with 1x than with 10x", "Probe loading the circuit", "Compare 1x and 10x on the same node", "Use 10x for anything but small, slow signals"],
            ["Flat tops, slow recovery after a peak", "Input overdriven, part of the signal off-screen", "Increase V/div until the whole signal fits", "Keep the full waveform within the graticule"],
            ["Small, rounded, delayed version of the signal", "Bandwidth limit, filter or high-res mode on", "Look for a BW or filter indicator", "Turn limits and filters off for fast signals"],
            ["Wiggles before an edge, smeared edges", "sin(x)/x interpolation, averaging, math", "Switch to dots or linear, stop averaging", "Use full sample rate; view the raw channel"],
            ["Same shape on every probe, setting and time/div", "Signal really is distorted", "Compare the stage input and output", "Troubleshoot the circuit"],
          ]}
        />
      </section>

      <section id="step-compensation">
        <StepHeading n={1}>Check probe compensation on the calibration output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A 10x passive probe contains a resistive divider and a small adjustable capacitor that has to be
          matched to the capacitance of the scope input it is plugged into. When the match is wrong, the probe
          passes low and high frequencies at different ratios, and that bends the corners of every square
          edge. It is the single most common cause of a distorted square wave, and it takes half a minute to
          rule out: clip the probe to the scope&apos;s calibration output, usually a square wave of about 1 kHz,
          and look at the top of each pulse.
        </p>
        <Figure caption="The calibration square wave through a probe on three trimmer settings. Left: under-compensated, the top rises slowly into rounded corners. Center: correct, square corners and a flat top. Right: over-compensated, a spike on each edge. Illustrative screens.">
          <div className="grid grid-cols-3 gap-3">
            <ScopeScreen wave="square-under" cycles={2} amplitude={2.5} labels={{ left: "under" }} />
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} labels={{ left: "correct" }} />
            <ScopeScreen wave="square-over" cycles={2} amplitude={2.5} labels={{ left: "over" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A probe moved from one channel or one scope to another needs re-checking, because input capacitance
          differs slightly between inputs. The full adjustment routine, including which tool to use on the
          trimmer, is in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          . If the calibration square looks perfect but your circuit&apos;s does not, the probe is not the
          problem and you can move on.
        </p>
      </section>

      <section id="step-bandwidth">
        <StepHeading n={2}>Check bandwidth against the edge you are measuring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth is the frequency at which it shows a sine wave about 30% smaller than it
          really is (the -3 dB point), and above that frequency it rolls off further. A square wave is a
          fundamental plus odd harmonics at 3, 5, 7 and more times its frequency, so a scope that cannot pass
          those harmonics redraws the square as something close to its fundamental: a rounded, sine-like wave.
          A 20 MHz square wave on a 50 MHz scope is the classic case: the third harmonic at 60 MHz is already
          above the bandwidth, so almost nothing but the 20 MHz sine reaches the screen.
        </p>
        <p className="text-muted leading-7 mb-4">
          The rule of thumb for a typical scope is that its own rise time is about 0.35 ÷ bandwidth. A 50 MHz
          scope therefore has a rise time of roughly 0.35 ÷ 50 MHz = 7 ns, and a 100 MHz scope about 3.5 ns.
          What you see on screen is approximately the square root of the sum of the squares of the signal&apos;s
          and the scope&apos;s rise times. For a real 5 ns edge on a 50 MHz scope that is √(5² + 7²) = √74 ≈ 8.6
          ns: the edge looks over 70% slower than it is. The chart works the same arithmetic across common
          bandwidths.
        </p>
        <BarChart
          items={[
            { label: "20 MHz (BW limit on)", value: 18.2, display: "√(5² + 17.5²) ≈ 18.2 ns" },
            { label: "50 MHz scope", value: 8.6, display: "√(5² + 7²) ≈ 8.6 ns" },
            { label: "70 MHz scope", value: 7.1, display: "√(5² + 5²) ≈ 7.1 ns" },
            { label: "100 MHz scope", value: 6.1, display: "√(5² + 3.5²) ≈ 6.1 ns", highlight: true },
            { label: "200 MHz scope", value: 5.3, display: "√(5² + 1.75²) ≈ 5.3 ns", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Displayed rise time of a real 5 ns edge, using the 0.35 rule and root-sum-of-squares; probe rise time
          ignored. These are textbook estimates, and an individual scope&apos;s response varies. If you need the
          edge within about 10% of its true value, the scope&apos;s rise time should be roughly a third to a fifth
          of the edge or faster. The background on the -3 dB point and the 3-5x rule is in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what is oscilloscope bandwidth
          </Link>
          .
        </p>
      </section>

      <section id="step-sampling">
        <StepHeading n={3}>Check the sample rate and look for aliasing</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A digital scope only knows the signal at its sample points and draws the trace between them. With
          plenty of samples per cycle the result is smooth; with only a few it becomes a staircase or a
          triangle; below two samples per cycle the dots line up into a completely different, slower wave.
          That false wave, an alias, is the most misleading distortion of all because it can look clean and
          stable.
        </p>
        <Figure caption="The same sine sampled two ways. Left: about 20 samples per cycle, and the joined dots follow the real wave. Right: fewer than two samples per cycle, and the joined dots form a slow false wave that is not in the circuit.">
          <div className="grid grid-cols-2 gap-4">
            <SamplingChart cycles={2} samples={40} label="A sine wave sampled about twenty times per cycle, with the displayed trace closely following the real signal" />
            <SamplingChart cycles={9} samples={10} label="A sine wave sampled about once per cycle, with the displayed trace forming a slow false wave, an alias" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The trap is that sample rate is not fixed. A scope holds a fixed number of points per capture, so at
          slow timebases it has to sample more slowly to fit the whole window in memory: sample rate ≈ memory
          depth ÷ (10 divisions × time/div). With 1 Mpts at 1 ms/div the window is 10 ms, so 1,000,000 ÷ 0.01 s
          = 100 MSa/s. Turn to 100 ms/div and the window is one second, so the rate falls to 1 MSa/s, and any
          content above 500 kHz can now alias. Turning on more channels can also divide the maximum rate on
          many scopes. Most scopes show the current sample rate on screen. The tell-tale test is to change
          time/div by one step: a real waveform keeps its frequency, an alias jumps. More on the trade-off in{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section id="step-ground">
        <StepHeading n={4}>Shorten the ground lead</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The crocodile-clip ground lead on a standard probe is a loop of wire, and a loop has inductance. That
          inductance and the probe tip&apos;s capacitance form a resonant circuit that fast edges ring. As an
          order-of-magnitude estimate, a 15 cm (6 inch) lead is often around 150 nH, and with about 12 pF at the
          tip the resonance lands near f = 1 ÷ (2π × √(150 nH × 12 pF)) ≈ 120 MHz. Any edge fast enough to
          excite that frequency gets a burst of ringing that is entirely made by the probe. A short ground
          spring of perhaps 10 nH pushes the same resonance to around 460 MHz, out of reach of most hobby scopes.
        </p>
        <Figure caption="Ringing after each edge of a square wave, the shape a long ground lead adds to fast edges. Illustrative screen.">
          <div className="max-w-sm mx-auto">
            <ScopeScreen wave="square-ring" cycles={2} amplitude={2.5} labels={{ left: "15 cm ground clip", right: "ringing on each edge" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The check is simple: replace the clip lead with the spring that usually comes in the probe kit, or
          with a short wire wrapped around the probe barrel, and ground it right next to the test point. If the
          ringing shrinks or changes frequency, it was the probe. If it stays the same, measure it properly
          with{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            how to measure overshoot and ringing
          </Link>
          , because it is probably real.
        </p>
      </section>

      <section id="step-loading">
        <StepHeading n={5}>Switch from 1x to 10x to cut probe loading</StepHeading>
        <p className="text-muted leading-7">
          In 1x mode the probe connects the scope&apos;s input and the full cable capacitance straight to your
          node, often in the region of 50 to 100 pF or more, and many 1x probes are only rated to a few
          megahertz. Driven from a source with 1 kΩ of resistance, 100 pF gives a time constant of 1 kΩ × 100 pF
          = 100 ns and a 10-90% rise time of about 2.2 × 100 ns = 220 ns. The same node with a 10x probe at
          roughly 15 pF gives 2.2 × 1 kΩ × 15 pF ≈ 33 ns. So a crisp edge in the circuit can look like a slow
          ramp purely because of the probe setting. Compare the same node in 1x and 10x (remembering to change
          the channel&apos;s probe factor too). If the shape improves in 10x, loading was the cause. The full
          picture of resistive and capacitive loading is in{" "}
          <Link href="/oscilloscopes/why-does-connecting-an-oscilloscope-probe-change-the-signal" className={link}>
            why connecting a probe changes the signal
          </Link>
          .
        </p>
      </section>

      <section id="step-overdrive">
        <StepHeading n={6}>Bring the whole signal on screen</StepHeading>
        <p className="text-muted leading-7">
          A scope&apos;s converter digitizes only a little more than the visible graticule. If you zoom in
          vertically so a 10 V signal is drawn at 500 mV/div, the parts above and below the screen are beyond
          the converter&apos;s range: the stored data is flat at the limit, automatic measurements report wrong
          amplitudes or warn of clipping, and the input amplifier may take time to recover after each overload,
          bending the part of the trace you can see. Increase V/div until the entire waveform, peaks included,
          fits within the eight vertical divisions, and only then judge its shape. If the flat tops remain with
          the whole signal on screen, the circuit is clipping, and{" "}
          <Link href="/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope" className={link}>
            how to find signal clipping
          </Link>{" "}
          shows how to locate the stage responsible.
        </p>
      </section>

      <section id="step-filters">
        <StepHeading n={7}>Turn off bandwidth limit and filters</StepHeading>
        <p className="text-muted leading-7">
          A bandwidth limit is a deliberate low-pass filter, commonly around 20 MHz, that is handy for cleaning
          up slow signals and easy to forget once it is on. At 20 MHz the scope&apos;s effective rise time is
          about 0.35 ÷ 20 MHz = 17.5 ns, so every faster edge is drawn at roughly that speed, rounded and
          slightly delayed. Digital low-pass filters, high-resolution or ERES acquisition modes, and heavy
          averaging do similar things. Look for a BW, filter or acquisition indicator in the channel or status
          area and switch them all off before judging a fast waveform. Turn them back on later if you need them
          to tame noise, as described in{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            why a waveform looks noisy
          </Link>
          .
        </p>
      </section>

      <section id="step-display">
        <StepHeading n={8}>Rule out display, interpolation and math artifacts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most digital scopes join sample points with sin(x)/x interpolation, which reconstructs sine waves
          beautifully but can draw small wiggles before and after a very fast edge when the edge contains
          energy close to half the sample rate. These pre-shoot ripples appear before the edge, which a real
          circuit cannot do, and that is the giveaway. Switch the display to dots or linear interpolation, or
          raise the sample rate by turning off unused channels; a genuine waveform keeps its shape, an
          interpolation artifact changes.
        </p>
        <p className="text-muted leading-7">
          Averaging is the other common culprit. It combines many captures, so if the signal jitters even a
          little in time, the edges average into a slower, smeared slope. Persistence and peak-detect modes can
          also make a clean trace look thick or spiky. And if you are looking at a math trace, a filtered FFT
          view or a reference waveform rather than the live channel, you are seeing processed data. Return the
          acquisition to normal sampling and view the raw channel before deciding anything.
        </p>
      </section>

      <Callout title="Mains, high voltage and the probe ground clip">
        On a typical bench scope, the probe ground clip is bonded to mains earth through the power cord. Clipping
        it onto a mains-referenced point, such as the primary side of an off-line power supply or a motor
        drive, creates a short circuit through the probe and scope that can destroy both and is dangerous to
        you. Never remove the scope&apos;s earth connection to work around this. Use a properly rated
        differential probe, an isolation transformer on the circuit under test or a scope with isolated inputs
        rated for the job, and check the probe&apos;s voltage and CAT rating. If you are not sure a point is
        safe, leave it alone and have a qualified technician or electrician make the measurement.
      </Callout>

      <section id="real-distortion">
        <h2 className="text-xl font-semibold mb-3">When the distortion is real</h2>
        <p className="text-muted leading-7 mb-4">
          If the shape survives a compensated 10x probe with a short ground, full bandwidth, a fast timebase,
          the whole signal on screen and plain sampling with no averaging, believe it. The next move is to find
          the stage that creates it. Put channel 1 on the input of a stage and channel 2 on its output, set both
          to show the same size, and compare. Distortion on the output but not the input belongs to that stage;
          distortion on both started earlier, so move upstream. The method is laid out in{" "}
          <Link href="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope" className={link}>
            how to compare input and output signals
          </Link>
          .
        </p>
        <DataTable
          head={["Real distortion you might see", "Typical shape", "Common cause"]}
          rows={[
            ["Clipping", "Flat tops or bottoms", "Stage running out of supply headroom or gain set too high"],
            ["Crossover distortion", "Small kink where a sine crosses zero", "Class-B output stage without enough bias"],
            ["Slew-rate limiting", "Sine turns into a triangle at high level", "Op-amp too slow for the amplitude and frequency"],
            ["Overshoot and ringing at the node", "Ringing that does not change with probing", "Trace inductance, poor termination, fast drivers"],
            ["Sagging square-wave tops", "Top droops across each pulse", "AC coupling capacitor too small for the frequency"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          An FFT view helps with audio-band work: a pure sine shows one spike, and distortion adds harmonics at
          2, 3 and more times the fundamental, so you can watch them grow as you raise the level toward the
          point where the stage starts to struggle.
        </p>
      </section>

      <section>
        <KeyIdea title="In short">
          Change one part of the measurement at a time. Distortion that follows the probe, 1x/10x, ground lead,
          time/div, bandwidth limit or display mode is the scope&apos;s; distortion that ignores them is the
          circuit&apos;s. Start with compensation on the calibration output, then check that the scope&apos;s
          rise time (0.35 ÷ bandwidth) is several times faster than your edge and that you have well over two
          samples per cycle.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Scopes with the bandwidth and sample rate to draw fast edges faithfully"
        items={[
          { name: sds1104.name, image: sds1104.image, alt: "Siglent SDS1104X-E four-channel oscilloscope", href: "/oscilloscopes/siglent-sds1104x-e-review", note: "100 MHz, four channels, 1 GSa/s (500 MSa/s per channel with all on). Hands-on tested by OhmSavvy." },
          { name: dho804.name, image: dho804.image, alt: "Rigol DHO804 12-bit oscilloscope", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e", note: "70 MHz, 12-bit, up to 1.25 GSa/s with one channel on (312.5 MSa/s with all four). Hands-on tested by OhmSavvy." },
          { name: sds1202.name, image: sds1202.image, alt: "Siglent SDS1202X-E two-channel oscilloscope", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e", note: "200 MHz on two channels, 1 GSa/s with one channel on, for faster edges." },
        ]}
      />
    </HowToShell>
  );
}
