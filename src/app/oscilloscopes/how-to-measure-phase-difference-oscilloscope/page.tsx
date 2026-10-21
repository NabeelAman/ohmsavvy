import {
  Callout,
  Figure,
  HowToShell,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to measure phase difference between two signals: time the delay between matching points, then convert it to degrees using the signal's period.";

export const metadata = buildMetadata({
  title: "How to Measure Oscilloscope Phase Difference",
  description,
  path: "/oscilloscopes/how-to-measure-phase-difference-oscilloscope",
});

export default function HowToMeasurePhaseDifferenceOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Phase Difference Between Two Signals"
      description={description}
      path="/oscilloscopes/how-to-measure-phase-difference-oscilloscope"
      category="oscilloscopes"
      published="2026-10-21"
      intro={
        <>
          Phase difference describes how far apart in time two same-frequency signals are, expressed as
          an angle rather than a raw time value — useful for comparing a filter&apos;s input and output,
          or any two points in a circuit that should track each other with some known delay. A two-channel
          scope makes this a straightforward on-screen measurement once you know what to look for.
        </>
      }
      toc={[
        { id: "what-phase-difference-means", label: "What phase difference actually means" },
        { id: "setup", label: "Setting up both channels" },
        { id: "manual-method", label: "Method 1: Timing the delay manually" },
        { id: "automatic-method", label: "Method 2: Automatic phase measurement" },
        { id: "lissajous-method", label: "Method 3: Lissajous figure (XY mode)" },
        { id: "common-mistakes", label: "Common mistakes" },
      ]}
      faq={[
        {
          q: "Does phase difference measurement only work on sine waves?",
          a: "It's clearest and most commonly done on sine waves, but the same time-delay-to-angle principle applies to any two same-frequency repeating signals, measured between corresponding matching points (such as corresponding rising edges) rather than zero-crossings specifically.",
        },
        {
          q: "What if my two signals aren't exactly the same frequency?",
          a: "Phase difference is only a stable, meaningful number between signals of the same frequency. If the frequencies differ even slightly, the apparent phase relationship drifts continuously over time rather than settling on one value — check both channels' measured frequency matches before trusting a phase reading.",
        },
        {
          q: "Which channel should I trigger on for this measurement?",
          a: "Trigger on whichever channel you're treating as the reference (often the input to a circuit, with the other channel being its output). This keeps both traces stable and stationary relative to each other on screen, which is necessary to measure the delay between them accurately.",
        },
        {
          q: "Why does my Lissajous figure look like a tilted ellipse instead of a circle or a line?",
          a: "A tilted, non-circular ellipse indicates a phase difference somewhere between 0° and 90° (or between 90° and 180°), rather than one of those two clean extremes. The exact angle can be calculated from the ellipse's shape, though for most practical troubleshooting, recognizing \"somewhere in between\" is often enough without computing the precise figure.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "Confirming both signals share the same frequency, a prerequisite for a meaningful phase reading.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Getting a stable, triggered display on the reference channel.",
        },
      ]}
    >
      <section>
        <h2 id="what-phase-difference-means" className="text-xl font-semibold mb-3">What phase difference actually means</h2>
        <p className="text-muted leading-7 mb-4">
          Two signals of the same frequency that reach corresponding points (like a rising zero-crossing)
          at different times are &quot;out of phase&quot; by an amount expressed as an angle — 360°
          represents one full period of delay, 180° represents half a period (effectively inverted), and
          0° means perfectly aligned.
        </p>
        <Figure
          caption={
            <>
              Two same-frequency sine waves with a time offset (Δt) between their corresponding
              zero-crossings. Phase difference in degrees = (Δt ÷ Period) × 360°.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram of two sine waves offset in phase, with the time delay between them marked">
            <rect x="0" y="0" width="300" height="130" rx="4" className="fill-[#0f1a14]" />
            <line x1="0" y1="65" x2="300" y2="65" stroke="#2c4a3a" strokeWidth="1" />
            <polyline
              fill="none"
              stroke="#7CFC9A"
              strokeWidth="2"
              points={Array.from({ length: 121 }, (_, i) => `${(i * 2.5).toFixed(1)},${(65 - 40 * Math.sin((i / 120) * 4 * Math.PI)).toFixed(1)}`).join(" ")}
            />
            <polyline
              fill="none"
              stroke="#ffd56b"
              strokeWidth="2"
              points={Array.from({ length: 121 }, (_, i) => `${(i * 2.5).toFixed(1)},${(65 - 40 * Math.sin((i / 120) * 4 * Math.PI - 0.8)).toFixed(1)}`).join(" ")}
            />
            <line x1="75" y1="20" x2="104" y2="20" stroke="#ffd56b" strokeWidth="1.4" />
            <text x="90" y="14" fontSize="9" textAnchor="middle" fill="#ffd56b">Δt</text>
            <text x="10" y="118" fontSize="9" fill="#9fe3b4">CH1 (reference, green)</text>
            <text x="160" y="118" fontSize="9" fill="#ffd56b">CH2 (delayed, yellow)</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="setup" className="text-xl font-semibold mb-3">Setting up both channels</h2>
        <p className="text-muted leading-7">
          Connect one probe to the reference signal on CH1 and the other to the signal you&apos;re
          comparing on CH2. Set the trigger source to CH1 so both traces hold still relative to each
          other, and adjust each channel&apos;s vertical scale so both waveforms are clearly visible
          without needing to compare wildly different trace heights.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="manual-method">Method 1: Timing the delay manually</StepHeading>
        <p className="text-muted leading-7">
          Use the scope&apos;s cursors to measure the horizontal time (Δt) between a zero-crossing on
          CH1 and the corresponding zero-crossing on CH2, then measure the period (T) of one full cycle
          on either channel. Phase difference in degrees = (Δt ÷ T) × 360°. For example, a 1ms delay on
          a signal with a 4ms period gives (1 ÷ 4) × 360° = 90°.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="automatic-method">Method 2: Automatic phase measurement</StepHeading>
        <p className="text-muted leading-7">
          Many digital scopes include a built-in phase measurement in their Measure menu, calculating
          the same delay-to-angle relationship automatically once both channels are displayed. This is
          faster and avoids manual cursor placement error, though it&apos;s worth spot-checking an
          automatic reading against a quick manual measurement if the result looks unexpected.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="lissajous-method">Method 3: Lissajous figure (XY mode)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the scope to XY mode, which plots CH1 on the horizontal axis against CH2 on the
          vertical axis instead of both against time. For two same-frequency sine waves, the resulting
          shape directly reveals the phase relationship:
        </p>
        <Figure
          caption={
            <>
              Lissajous patterns for common phase differences between two same-frequency sine waves in
              XY mode. A diagonal line means in phase or fully inverted; a circle means a 90° difference;
              a tilted ellipse falls somewhere between.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Lissajous figures showing oscilloscope XY-mode patterns for different phase differences">
            <g transform="translate(40,60)">
              <line x1="-35" y1="35" x2="35" y2="-35" className="stroke-accent" strokeWidth="2.2" />
              <text x="0" y="55" fontSize="10" textAnchor="middle" className="fill-foreground">0° (or 180°)</text>
            </g>
            <g transform="translate(150,60)">
              <ellipse cx="0" cy="0" rx="20" ry="33" className="fill-none stroke-accent" strokeWidth="2.2" transform="rotate(30)" />
              <text x="0" y="55" fontSize="10" textAnchor="middle" className="fill-foreground">~45°</text>
            </g>
            <g transform="translate(260,60)">
              <circle cx="0" cy="0" r="28" className="fill-none stroke-accent" strokeWidth="2.2" />
              <text x="0" y="55" fontSize="10" textAnchor="middle" className="fill-foreground">90°</text>
            </g>
          </svg>
        </Figure>
        <p className="text-muted leading-7">
          This method gives a quick visual read on phase relationship without needing to calculate
          anything, though pulling an exact angle out of a tilted ellipse&apos;s shape takes a bit more
          work than reading a direct cursor-based time delay.
        </p>
      </section>

      <section id="common-mistakes">
        <Callout title="Common mistakes">
          <ul className="space-y-1 list-disc pl-5">
            <li>Measuring Δt between non-corresponding points on the two waveforms (a rising edge on one, a falling edge on the other).</li>
            <li>Comparing signals that are actually at slightly different frequencies, giving a constantly drifting result.</li>
            <li>Forgetting to check which channel is set as the trigger source, leaving one trace unstable.</li>
          </ul>
        </Callout>
      </section>
    </HowToShell>
  );
}
