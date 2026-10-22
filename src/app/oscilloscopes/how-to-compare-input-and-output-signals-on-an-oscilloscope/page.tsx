import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to compare input and output signals on an oscilloscope: probe both sides with a shared ground, match scales, then read gain in dB, inversion and clipping.";

export const metadata = buildMetadata({
  title: "Compare Input and Output Signals on a Scope",
  description,
  path: "/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope",
});

const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

// Amplifier output driven past its supply rails: an ideal sine clamped flat at the top and bottom.
const sine = (i: number) => 75 - 55 * Math.sin((i / 150) * 4 * Math.PI);
const ideal = Array.from({ length: 151 }, (_, i) => `${i * 2},${sine(i).toFixed(1)}`).join(" ");
const clipped = Array.from({ length: 151 }, (_, i) => `${i * 2},${Math.min(113, Math.max(37, sine(i))).toFixed(1)}`).join(" ");

export default function CompareInputAndOutputSignalsPage() {
  return (
    <HowToShell
      title="How to Compare Input and Output Signals on an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          The quickest way to find out what a circuit is doing to a signal is to compare input and
          output signals on an oscilloscope side by side: input on CH1, output on CH2, both locked to
          the same trigger. One glance shows whether a stage amplifies, attenuates, inverts or
          distorts, and a couple of readings turn that into a gain figure in decibels. Below is the
          setup, the settings that keep the comparison honest, and how to read each result.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel digital oscilloscope with built-in waveform generator",
        caption: (
          <>
            A two-channel scope with a built-in waveform generator, like the Hantek DSO2D10 in our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              full review
            </Link>
            , can supply the test input and measure both sides of the stage.
          </>
        ),
      }}
      toc={[
        { id: "connect-both", label: "Connect CH1 to the input, CH2 to the output" },
        { id: "match-channels", label: "Match probe and channel settings" },
        { id: "overlay-or-stack", label: "Overlay or stack the traces" },
        { id: "read-gain", label: "Read the gain and convert to dB" },
        { id: "inversion-distortion", label: "Spot inversion, clipping and attenuation" },
        { id: "gain-db-table", label: "Gain to dB reference" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "Why do I use 20 log and not 10 log for voltage gain?",
          a: "Decibels are defined from a power ratio as 10 × log10(P2/P1). Power in a given resistance goes with the square of voltage, so the voltage version becomes 20 × log10(Vout/Vin). Use 20 log when you are working from two voltage readings on the scope, which is almost always the case here.",
        },
        {
          q: "Should I compare peak-to-peak or RMS readings?",
          a: "Either works as long as you use the same measurement on both channels. Peak-to-peak is easiest to read off the grid, but it includes any noise spikes. RMS from the Measure menu tends to be steadier on a clean sine. Mixing the two, such as Vpp on CH1 and RMS on CH2, gives a ratio that is wrong by a fixed factor.",
        },
        {
          q: "Can I compare input and output with a one-channel scope?",
          a: "Only for steady, repeating signals and only for amplitude. Measure the input, move the probe to the output, and measure again without changing the source. You lose the shared time reference, so inversion and phase shift cannot be seen reliably. Two channels make the comparison far quicker and more trustworthy.",
        },
        {
          q: "My output is bigger than expected by exactly 10 times. What happened?",
          a: "Almost certainly a probe attenuation mismatch. One channel is set to 1x while a 10x probe is attached, or the other way round, so its reading is off by a factor of ten, which is 20 dB. Check the attenuation setting in each channel menu against the switch on each probe.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
          title: "How to Measure Phase Difference",
          desc: "Turn the time offset between input and output into degrees with cursors or XY mode.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage",
          desc: "Read peak-to-peak and amplitude accurately before you calculate any gain ratio.",
        },
      ]}
    >
      <section>
        <StepHeading n={1} id="connect-both">Connect CH1 to the input and CH2 to the output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Feed the circuit a known test signal, usually a sine from a function generator at a
          frequency inside the range the stage is meant to handle. Clip the CH1 probe tip to the
          input node and the CH2 probe tip to the output node. Both ground clips go to the circuit&apos;s
          ground, the same ground the generator returns to. Trigger on CH1, since the input is the
          reference that everything else is judged against.
        </p>
        <Figure
          caption={
            <>
              The basic hookup. CH1 watches the signal going into the stage and CH2 the signal coming
              out. Both probe grounds and the generator return land on one common ground.
            </>
          }
        >
          <svg viewBox="0 0 340 185" className="w-full h-auto" role="img" aria-label="Wiring diagram with a signal generator feeding a circuit, CH1 probe on the input, CH2 probe on the output and a shared ground rail">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="45" width="62" height="48" rx="4" className="fill-surface" />
              <rect x="140" y="38" width="72" height="62" rx="4" className="fill-surface" />
              <path d="M72 60 H140 M212 60 H325" />
              <path d="M40 93 V150 M176 100 V150 M30 150 H310" />
              <path d="M300 150 V160 M290 160 H310 M294 165 H306 M298 170 H302" />
            </g>
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="105" y1="60" x2="105" y2="18" />
              <line x1="268" y1="60" x2="268" y2="18" />
              <path d="M101 30 Q80 95 92 150" strokeDasharray="4 3" strokeWidth="1.4" />
              <path d="M264 30 Q243 95 255 150" strokeDasharray="4 3" strokeWidth="1.4" />
            </g>
            <circle cx="105" cy="60" r="4" className="fill-accent" />
            <circle cx="268" cy="60" r="4" className="fill-accent" />
            <circle cx="92" cy="150" r="2.5" className="fill-accent" />
            <circle cx="255" cy="150" r="2.5" className="fill-accent" />
            <g fontSize="10" textAnchor="middle" className="fill-foreground">
              <text x="41" y="66">Signal</text>
              <text x="41" y="78">generator</text>
              <text x="176" y="66">Circuit</text>
              <text x="176" y="78">under test</text>
              <text x="105" y="12" className="fill-accent">CH1 = input</text>
              <text x="268" y="12" className="fill-accent">CH2 = output</text>
              <text x="190" y="178" className="fill-muted">common ground for generator, circuit and both probe clips</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="match-channels">Match the probe and channel settings on both sides</StepHeading>
        <p className="text-muted leading-7">
          A comparison is only as good as its weakest channel setup. Use the same probe type on both
          sides, set each channel&apos;s attenuation to match its probe (10x probe, 10x channel), and
          compensate both probes against the scope&apos;s calibration output. Start with the same
          V/div on both channels so equal heights really mean equal voltages; you can change one
          later if the output is much larger, as long as you account for it. Keep both on DC
          coupling when you want to see clipping against a supply rail, and switch the output to AC
          coupling only if a DC bias pushes it off screen.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="overlay-or-stack">Overlay or stack the two traces</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With both channels centred on the same zero line, the traces sit on top of each other and
          any difference in height or timing is obvious. That overlay works well for gain. When the
          shapes get busy, use each channel&apos;s vertical position to stack them, input in the
          upper half and output in the lower half, so you can study each waveform without the other
          one in the way. Stacking is also kinder to inverted outputs, which otherwise cross the
          input trace twice every cycle.
        </p>
        <Figure
          caption={
            <>
              An inverting stage shown stacked: input (green) positioned 2 divisions up, output (blue) 2
              divisions down. The output peaks where the input dips, half a period apart, and is 1.5
              times taller.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={1}
            offset={2}
            second={{ wave: "sine", cycles: 2, amplitude: 1.5, offset: -2, shift: 2.5, label: "CH2 out (inverted)" }}
            labels={{ left: "CH1 & CH2 1 V/div", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="read-gain">Read the gain and convert it to decibels</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Measure the same quantity on both channels, peak-to-peak for example, then divide: gain =
          Vout ÷ Vin. In dB that becomes 20 × log10(Vout ÷ Vin). On the overlay below the input peaks at
          1 division and the output at 2, both at 1 V/div, so the input is 2 Vpp, the output is 4 Vpp,
          the gain is 2 and the stage provides about +6 dB.
        </p>
        <Figure
          caption={
            <>
              A non-inverting stage overlaid: input (green) 2 Vpp, output (blue) 4 Vpp at the same scale.
              The peaks line up in time, so there is no inversion and little phase shift.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={1}
            second={{ wave: "sine", cycles: 2, amplitude: 2, label: "CH2 out" }}
            marks={[
              { x1: 1.25, y1: 4, x2: 1.25, y2: 3, text: "Vin 1 div" },
              { x1: 6.25, y1: 4, x2: 6.25, y2: 2, text: "Vout 2 div" },
            ]}
            labels={{ left: "CH1 & CH2 1 V/div", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="inversion-distortion">Spot inversion, clipping and filter attenuation</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Inversion shows up as the output peaking while the input bottoms out, as in the stacked
          view above. Clipping appears when you push the input up and the output stops growing: its
          tops and bottoms flatten against the supply rails while the input stays a clean sine.
          Turn the input down until the flat tops disappear to find the largest undistorted swing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Clipping: the output (solid) is held flat at the rails; the faint dashed curve is the sine it should have been.</>}>
            <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Sine wave clipped flat at its top and bottom, with the unclipped shape shown faintly">
              <rect x="0" y="0" width="300" height="150" rx="4" className="fill-[#0f1a14]" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#2c4a3a" strokeWidth="1" />
              <line x1="0" y1="37" x2="300" y2="37" stroke="#f0b429" strokeWidth="0.7" strokeDasharray="3 3" />
              <line x1="0" y1="113" x2="300" y2="113" stroke="#f0b429" strokeWidth="0.7" strokeDasharray="3 3" />
              <polyline points={ideal} fill="none" stroke="#5BB3E8" strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="4 3" />
              <polyline points={clipped} fill="none" stroke="#5BB3E8" strokeWidth="2" />
              <text x="296" y="31" fontSize="9" textAnchor="end" fill="#f0b429">+rail</text>
              <text x="296" y="126" fontSize="9" textAnchor="end" fill="#f0b429">−rail</text>
            </svg>
          </Figure>
          <Figure caption={<>A low-pass filter at its cutoff: output about 0.707 of the input (−3 dB) and slightly delayed.</>}>
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.5}
              second={{ wave: "sine", cycles: 2, amplitude: 1.77, shift: 0.625, label: "CH2 out" }}
              labels={{ left: "CH1 & CH2 1 V/div", right: "1 ms/div" }}
            />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          With a filter, sweep the generator frequency and watch the output shrink relative to the
          input; the frequency where the ratio falls to about 0.707 is the −3 dB point. The output
          usually shifts in time as well, which you can turn into degrees with our{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            phase difference guide
          </Link>
          . For fast logic, the same two-channel setup also shows{" "}
          <Link href="/oscilloscopes/how-to-measure-propagation-delay-using-an-oscilloscope" className={link}>
            propagation delay
          </Link>
          , the time from an input edge to the matching output edge. Many scopes can also plot CH1 minus
          CH2 as a math trace, which shows the difference between two signals directly; see{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals" className={link}>
            how to subtract two signals with scope math
          </Link>
          .
        </p>
      </section>

      <section id="gain-db-table">
        <h2 className="text-xl font-semibold mb-3">Gain to dB reference</h2>
        <DataTable
          head={["Vout ÷ Vin", "Gain in dB", "What it usually means"]}
          mono={[0, 1]}
          rows={[
            ["0.1", "−20 dB", "Strong attenuation, such as a filter well into its stopband"],
            ["0.5", "−6.0 dB", "Output half the input, such as a 1:1 resistive divider"],
            ["0.707", "−3.0 dB", "The conventional cutoff point of a filter"],
            ["1", "0 dB", "Unity gain: a buffer or voltage follower"],
            ["2", "+6.0 dB", "Output twice the input"],
            ["10", "+20 dB", "A typical single gain stage"],
            ["100", "+40 dB", "High gain, often split across two stages"],
          ]}
        />
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting an input/output comparison</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Gain off by exactly 10x (20 dB)", "Probe attenuation and channel setting do not match", "Set each channel to the probe's 1x or 10x position"],
            ["Output trace drifts while input is stable", "Trigger set to CH2, or output frequency differs", "Trigger on CH1; check the stage is not oscillating"],
            ["Square-wave input shows overshoot or rounding", "Probe not compensated", "Compensate both probes on the calibration output"],
            ["Output sits off screen", "DC bias on the output", "Use the channel position control or AC coupling on CH2"],
            ["Large hum on one trace only", "That probe's ground clip is loose or on a different ground", "Return both clips to the same circuit ground point"],
          ]}
        />
      </section>

      <section id="ground-safety">
        <KeyIdea title="One ground, not two">
          On a bench scope, both probe grounds connect to each other and to mains earth inside the
          instrument. Clipping the CH2 ground to anything other than the circuit&apos;s ground shorts
          that point to earth through the scope.
        </KeyIdea>
        <div className="mt-5">
          <Callout title="Mains-powered circuits">
            Never clip a scope ground onto a non-isolated mains circuit. Use an isolation transformer
            on the device under test, a differential probe, or an isolated-input scope, and keep within
            the CAT and voltage ratings printed on the probes and the scope inputs.
          </Callout>
        </div>
      </section>
    </HowToShell>
  );
}
