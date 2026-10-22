import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to use oscilloscope cursors to measure voltage difference: set Y1 and Y2, read ΔV, fix the probe ratio, use track mode and zoom in for a precise reading.";

export const metadata = buildMetadata({
  title: "How to Use Scope Cursors to Measure Voltage",
  description,
  path: "/oscilloscopes/how-to-use-oscilloscope-cursors-to-measure-voltage-difference",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

/** A load step on a supply rail with two horizontal voltage cursors and the ΔV between them. */
function LoadStepCursors() {
  return (
    <svg
      viewBox="0 0 320 190"
      className="w-full h-auto"
      role="img"
      aria-label="Scope screen showing a supply rail stepping down from 5.00 volts to 4.70 volts, with cursor Y1 on the upper level, cursor Y2 on the lower level and a delta V readout of 300 millivolts"
    >
      <defs>
        <marker id="cvArr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#ffd56b" />
        </marker>
      </defs>
      <rect x="10" y="10" width="300" height="160" rx="4" fill="#0f1a14" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={10 + i * 30} y1="10" x2={10 + i * 30} y2="170" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="10" y1={10 + i * 20} x2="310" y2={10 + i * 20} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      <path
        d="M10 60 L130 60 L134 128 Q140 136 148 124 Q156 116 164 120 L310 120"
        fill="none"
        stroke="#7CFC9A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="10" y1="60" x2="310" y2="60" stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 4" />
      <line x1="10" y1="120" x2="310" y2="120" stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 4" />
      <text x="16" y="54" fontSize="10" fill="#ffd56b">Y1 = 5.00 V</text>
      <text x="16" y="114" fontSize="10" fill="#ffd56b">Y2 = 4.70 V</text>
      <line x1="240" y1="62" x2="240" y2="118" stroke="#ffd56b" strokeWidth="1.4" markerStart="url(#cvArr)" markerEnd="url(#cvArr)" />
      <text x="246" y="94" fontSize="10" fill="#ffd56b">ΔV = 300 mV</text>
      <text x="16" y="164" fontSize="10" fill="#9fe3b4">CH1 100 mV/div  DC</text>
      <text x="304" y="164" fontSize="10" fill="#9fe3b4" textAnchor="end">load switched on</text>
      <text x="160" y="186" fontSize="10" textAnchor="middle" className="fill-muted">
        Cursors sit on the settled levels, not on the brief dip
      </text>
    </svg>
  );
}

export default function HowToUseOscilloscopeCursorsToMeasureVoltageDifferencePage() {
  return (
    <HowToShell
      title="How to Use Oscilloscope Cursors to Measure Voltage Difference"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-oscilloscope-cursors-to-measure-voltage-difference"
      category="oscilloscopes"
      intro={
        <>
          To use oscilloscope cursors to measure voltage difference, open the cursor menu, choose the
          voltage (horizontal, often called Y) cursor type, place cursor Y1 on one level and Y2 on the
          other, and read the ΔV value the scope prints beside them. That number is only right if the
          channel&apos;s probe setting matches the probe. For a precise result, increase the V/div so the
          two levels sit far apart on screen before you place the lines.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s, 7-inch display) is one of the scopes in our
            reviews. Cursor menus differ between brands, but the Y1, Y2 and ΔV readouts are near
            universal. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-voltage-cursors-are", label: "What voltage cursors are" },
        { id: "check-probe-ratio", label: "Check the probe ratio first" },
        { id: "turn-on-cursors", label: "Turn on the voltage cursors" },
        { id: "place-cursors", label: "Place Y1 and Y2, read ΔV" },
        { id: "worked-examples", label: "Worked examples" },
        { id: "track-mode", label: "Manual vs track mode" },
        { id: "cursor-resolution", label: "Resolution and V/div" },
        { id: "cursors-vs-automatic", label: "Cursors vs automatic measurements" },
        { id: "common-mistakes", label: "Common mistakes" },
      ]}
      faq={[
        {
          q: "What is the difference between X and Y cursors on an oscilloscope?",
          a: "Y cursors are horizontal lines that mark voltage levels, so the readout between them is ΔV. X cursors are vertical lines that mark moments in time, giving ΔT and often 1/ΔT as a frequency. Some scopes call them amplitude and time cursors instead.",
        },
        {
          q: "Why does my cursor ΔV reading look ten times too small?",
          a: "The channel is almost certainly set to 1x while you are using a 10x probe. The scope then scales every voltage, including cursor readouts, by the wrong factor. Open the channel menu and set the probe ratio to match the switch on the probe body, and the ΔV value corrects itself.",
        },
        {
          q: "Can I use cursors on a stopped waveform?",
          a: "Yes, and it is often easier. Press Run/Stop or take a single capture to freeze the trace, then place the cursors without the waveform moving under them. You can usually still zoom into a stopped capture, though its true resolution was fixed when it was taken.",
        },
        {
          q: "Do cursors measure RMS voltage?",
          a: "No. Voltage cursors only report the levels where you place the lines and the gap between them. For RMS, use the automatic Vrms measurement, which uses every sample in the record. On a pure sine, divide a cursor peak-to-peak reading by 2√2, about 2.83, to get RMS.",
        },
        {
          q: "Should I place cursors on the peaks or the flat levels of a square wave?",
          a: "It depends on the question. For the logic level or the amplitude the circuit settles to, place the lines on the flat tops and bottoms and ignore overshoot. To see the worst-case swing a part has to tolerate, place them on the very tips of the overshoot and undershoot instead.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors",
          title: "How to Measure Rise Time With Oscilloscope Cursors",
          desc: "The time-cursor companion to this guide: 10% and 90% levels and the ΔT between them.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Counting divisions, peak-to-peak vs RMS, and DC levels, the groundwork for cursor readings.",
        },
      ]}
    >
      <Callout title="Before you probe">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a bench scope the probe ground clip is tied to mains earth. Clip it only to a point that is
            at earth potential, such as the circuit&apos;s 0 V on a low-voltage, isolated supply.
          </li>
          <li>
            Don&apos;t probe mains-connected, non-isolated circuits with a standard probe. Use a rated
            differential probe or an isolation transformer on the device under test.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-voltage-cursors-are" className="text-xl font-semibold mb-3">What voltage cursors are</h2>
        <p className="text-muted leading-7 mb-4">
          Voltage cursors are two horizontal lines you drag up and down the screen. The scope reports the voltage at each line, measured from the channel&apos;s ground marker, plus the gap between them, so you measure exactly the feature you choose. Time cursors are the vertical pair used for
          periods and edges; our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            measuring rise time with cursors
          </Link>{" "}
          covers those, so this page sticks to voltage.
        </p>
        <InfoCards
          items={[
            { label: "Y1 (or AY)", desc: "The first horizontal line and its absolute voltage, read from ground." },
            { label: "Y2 (or BY)", desc: "The second line and its voltage. Either line can be the higher one." },
            { label: "ΔV", desc: "Y1 minus Y2 (or the reverse), the voltage difference you are after." },
            { label: "Source", desc: "The channel the cursors read. It must be the trace you are measuring." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="check-probe-ratio">Check the probe ratio before anything else</StepHeading>
        <p className="text-muted leading-7">
          Cursor readouts are calculated from the channel&apos;s V/div and its probe setting. If a 10x probe
          is plugged into a channel set to 1x, the screen still looks plausible but every cursor value is a
          tenth of the truth. Set the channel&apos;s probe ratio to match the switch on the probe, and
          check that the probe is compensated, because a miscompensated probe rounds or peaks the corners
          you are about to put a line on.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="turn-on-cursors">Turn on the voltage cursors</StepHeading>
        <p className="text-muted leading-7">
          Press the Cursor button, choose Manual mode, then select the voltage, amplitude or Y type, and set the source to your signal&apos;s channel. On many scopes, pressing the multi-function knob toggles between moving Y1, Y2, or both together. Get a stable trace first; cursors on a rolling waveform are guesswork.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="place-cursors">How to use oscilloscope cursors to read the voltage difference</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move Y1 onto the first level and Y2 onto the second, then read ΔV. On a sine wave that means the
          top of a crest and the bottom of a trough, which gives peak-to-peak voltage directly.
        </p>
        <Figure
          caption={
            <>
              A sine at 1 V/div with Y1 on the crest (3 divisions above ground, +3.00 V) and Y2 on the trough
              (−3.00 V). The scope reports ΔV = 6.00 V, the peak-to-peak value. For a clean sine, that is
              about 2.12 V RMS (6.00 ÷ 2.83).
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={3}
            labels={{ left: "CH1 1 V/div", right: "1 ms/div" }}
            marks={[
              { x1: 0, y1: 1, x2: 10, y2: 1, text: "Y1 +3.00 V" },
              { x1: 0, y1: 7, x2: 10, y2: 7, text: "Y2 −3.00 V" },
              { x1: 1.25, y1: 1, x2: 1.25, y2: 7, text: "ΔV 6.00 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="worked-examples" className="text-xl font-semibold mb-3">Worked examples: a step, ripple and a voltage drop</h2>
        <p className="text-muted leading-7 mb-4">
          <strong className="text-foreground">A step size.</strong> When a load switches on, a supply rail often settles slightly lower. Put Y1 on the flat section before the step and Y2 on the flat section after it.
        </p>
        <Figure caption={<>A rail dropping from 5.00 V to 4.70 V when a load turns on. The brief dip at the edge is a separate transient; leave it out unless the worst case is the question.</>}>
          <LoadStepCursors />
        </Figure>
        <p className="text-muted leading-7 mt-5 mb-4">
          <strong className="text-foreground">Ripple.</strong> Switch the channel to AC coupling, drop to a
          sensitive range such as 20 mV/div, and put the cursors on the highest and lowest points of the
          ripple. The method is covered in depth in{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage
          </Link>
          ; cursors let you ignore one isolated spike that an automatic Vpp would include.
        </p>
        <Figure caption={<>Ripple on a DC rail, AC coupled at 20 mV/div. The cursors sit 4 divisions apart, so ΔV = 4 × 20 mV = 80 mV peak to peak.</>}>
          <ScopeScreen
            wave="sine"
            cycles={4}
            amplitude={2}
            labels={{ left: "CH1 20 mV/div  AC", right: "10 µs/div" }}
            marks={[
              { x1: 0, y1: 2, x2: 10, y2: 2, text: "Y1 +40 mV" },
              { x1: 0, y1: 6, x2: 10, y2: 6, text: "Y2 −40 mV" },
              { x1: 0.6, y1: 2, x2: 0.6, y2: 6, text: "80 mV" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-5">
          <strong className="text-foreground">A drop across a component.</strong> If one end of the part is
          at ground, as with a low-side current-sense resistor, a single probe on the other end plus cursors
          gives the drop directly. If neither end is at ground, never move the ground clip onto the circuit.
          Probe both ends on two channels and subtract them with the scope&apos;s math function, as in{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-math-functions-to-subtract-two-signals" className={link}>
            subtracting two signals
          </Link>
          , then set the cursor source to the math trace.
        </p>
      </section>

      <section>
        <h2 id="track-mode" className="text-xl font-semibold mb-3">Manual mode vs track mode</h2>
        <p className="text-muted leading-7 mb-4">
          In manual mode, the lines stay where you put them. In track mode, the cursors are tied to the waveform: you move them in time and each reports the trace&apos;s voltage at that instant. ΔV is then the change between two moments, which suits a sloping pulse top or a capacitor charging.
        </p>
        <KeyIdea title="Track mode follows the noise too">
          A tracking cursor reads a single sample, so on a noisy trace its value jumps as the waveform
          updates. Turn on averaging for a repetitive signal, or freeze one capture, before reading it.
        </KeyIdea>
      </section>

      <section>
        <h2 id="cursor-resolution" className="text-xl font-semibold mb-3">Cursor resolution depends on V/div: zoom in for precision</h2>
        <p className="text-muted leading-7 mb-4">
          A cursor is only as precise as the data under it. Most entry-level scopes use an 8-bit converter: 256 levels across the vertical range. Spread over 8 divisions, that is 32 levels per division, so the smallest step is V/div ÷ 32. Cursors also move in screen steps, which can be coarser. Exact figures vary by model, but the lower the V/div, the finer the reading.
        </p>
        <Figure caption={<>Smallest voltage step for an 8-bit scope spreading 256 levels over 8 divisions (V/div ÷ 32). A 300 mV step reads to about ±31 mV at 1 V/div, but to about ±3 mV at 100 mV/div.</>}>
          <BarChart
            items={[
              { label: "2 V/div", value: 62.5, display: "≈ 62.5 mV" },
              { label: "1 V/div", value: 31.3, display: "≈ 31.3 mV" },
              { label: "500 mV/div", value: 15.6, display: "≈ 15.6 mV" },
              { label: "200 mV/div", value: 6.25, display: "≈ 6.25 mV" },
              { label: "100 mV/div", value: 3.13, display: "≈ 3.13 mV", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          So set V/div as low as you can while both levels still fit on screen, using the vertical offset
          to bring them into view. Counting divisions by eye, explained in{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope
          </Link>
          , is a good sanity check on the readout.
        </p>
      </section>

      <section>
        <h2 id="cursors-vs-automatic" className="text-xl font-semibold mb-3">Cursors vs automatic measurements</h2>
        <DataTable
          head={["", "Voltage cursors", "Automatic measurements"]}
          rows={[
            ["What is measured", "Exactly the two levels you choose", "A defined quantity such as Vpp, Vamp, Vavg or Vrms"],
            ["One feature among many", "Easy: put the lines on that step or spike", "Hard: results cover the whole screen or a gated region"],
            ["Noise and spikes", "You can place lines on the true level", "Vpp and Vmax include every spike"],
            ["Updates live", "Manual lines don't; track mode does", "Yes, every capture"],
            ["RMS and average", "Not available", "Calculated from all samples"],
            ["Best for", "Step sizes, single events, checking a reading", "Repeating signals and logging values"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          When the automatic value and the cursors disagree, the trace usually contains noise or overshoot that the automatic routine is counting.
        </p>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common cursor mistakes</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>Cursor source left on CH1 while the signal is on CH2, so the readout describes the wrong trace.</li>
          <li>Probe ratio mismatch, making every ΔV ten times too large or too small.</li>
          <li>Measuring at a high V/div where the two levels sit a fraction of a division apart.</li>
          <li>Putting a line on the thick, fuzzy part of a noisy trace instead of averaging first.</li>
          
          <li>Forgetting that AC coupling removes the DC level, so Y1 and Y2 are relative to the average.</li>
        </ul>
      </section>
    </HowToShell>
  );
}
