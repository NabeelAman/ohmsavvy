import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure the settling time of a signal with an oscilloscope: pick an error band, zoom in with offset, average out noise, and time it with cursors.";

export const metadata = buildMetadata({
  title: "Measure Settling Time of a Signal on a Scope",
  description,
  path: "/oscilloscopes/how-to-measure-the-settling-time-of-a-signal-with-an-oscilloscope",
});

const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

// Illustrative underdamped step response: output starts moving at x = 66 and
// rings toward a final level at y = 50. The settle point is computed as the
// last x where the trace is still outside the ±4 px error band.
const FINAL = 50;
const BAND = 4;
const response = (x: number) => {
  const t = x - 66;
  if (t < 0) return 140;
  return FINAL + 90 * Math.exp(-t / 14) * Math.cos((2 * Math.PI * t) / 34);
};
const xs = Array.from({ length: 161 }, (_, i) => i * 2);
const responsePts = xs.map((x) => `${x},${response(x).toFixed(1)}`).join(" ");
const settleX = Math.max(...xs.filter((x) => Math.abs(response(x) - FINAL) > BAND)) + 2;

// The same response magnified 6x around the final value, as it looks with
// offset applied and a sensitive V/div: the step itself is far off screen.
const zoomPts = xs
  .map((x) => {
    const y = 75 + (response(x) - FINAL) * 6;
    return `${x},${Math.min(146, Math.max(4, y)).toFixed(1)}`;
  })
  .join(" ");

export default function MeasureSettlingTimePage() {
  return (
    <HowToShell
      title="How to Measure the Settling Time of a Signal With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-the-settling-time-of-a-signal-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          A DAC that is asked for a new code, an op-amp hit with a step, or a regulator whose load just
          jumped: none of them arrive at the new value instantly. To measure the settling time of a
          signal with an oscilloscope you time how long the output takes to land inside a small window
          around its final value and stay there. The edge itself is easy to see; the hard part is the
          last few millivolts, which hide in noise and in the scope&apos;s own vertical resolution.
          This guide covers the definition, the setup, zooming in on the error band and reading the
          result.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
        caption: (
          <>
            A four-channel scope lets you keep the input step and the output on screen together; the
            Siglent SDS1104X-E in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              full review
            </Link>{" "}
            lists 100MHz bandwidth and 1 GSa/s.
          </>
        ),
      }}
      toc={[
        { id: "definition", label: "What settling time means" },
        { id: "error-bands", label: "Choosing the error band" },
        { id: "step-source", label: "Drive a clean, repeatable step" },
        { id: "probe-check", label: "Check the probe first" },
        { id: "trigger-step", label: "Trigger on the input step" },
        { id: "zoom-band", label: "Zoom in on the final value" },
        { id: "average", label: "Average out the noise" },
        { id: "cursors", label: "Read settling time with cursors" },
        { id: "resolution", label: "Vertical resolution limits" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "Is settling time measured from the input step or from the output edge?",
          a: "It depends on the convention, so always state it. Op-amp and DAC datasheets usually start the clock when the input step is applied, which means delay and slewing are included. Some control and logic contexts start from the output's 50% crossing instead. A two-channel capture, input on one channel and output on the other, lets you report either.",
        },
        {
          q: "Why is my settling time longer than the datasheet figure?",
          a: "Check the test conditions first: datasheet numbers assume a particular step size, load, gain and error band, and a larger step or heavier capacitive load usually settles more slowly. Then rule out the measurement itself. A miscompensated probe, a long ground lead or front-end overdrive recovery can all add a tail that is not in the circuit.",
        },
        {
          q: "Can I measure 0.01% settling with an ordinary 8-bit scope?",
          a: "Not directly on a large step. One converter step is roughly 1/256 of the full screen height, so even at high sensitivity you run into overdrive problems the moment the step itself goes off screen. Precision settling is normally measured with a clamped or false-summing-node arrangement that only passes the small error signal to the scope.",
        },
        {
          q: "Does averaging change the settling time I measure?",
          a: "Averaging reduces random noise without moving the waveform in time, provided the trigger is stable and the step repeats identically. If the trigger jitters, averaging smears the edge and the ringing, which can make settling look slightly different. Keep the trigger on the clean input step rather than on the noisy output.",
        },
        {
          q: "What is a sensible error band if the datasheet does not give one?",
          a: "Tie it to what the next stage can tolerate. For a DAC feeding an ADC, half an LSB of the converter resolution is a common choice. For a power rail, the regulation tolerance the load needs, such as a few percent, is more meaningful than a tight analog band.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope",
          title: "How to Measure Overshoot and Ringing",
          desc: "Quantify the overshoot percentage and ring frequency that come before the signal settles.",
        },
        {
          href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors",
          title: "How to Measure Rise Time With Cursors",
          desc: "Time the 10% to 90% part of the same edge, the fast portion before settling begins.",
        },
      ]}
    >
      <section id="definition">
        <h2 className="text-xl font-semibold mb-3">What settling time actually means</h2>
        <p className="text-muted leading-7 mb-4">
          Settling time is the interval from a reference moment, usually the instant the input step is
          applied, until the output enters an error band around its final value and never leaves it
          again. The band is a tolerance such as ±1% or ±0.1% of the final value, or of the step size.
          The phrase &quot;never leaves again&quot; matters: a ringing output may pass through the band
          several times before it finally stays inside, and only the last entry counts. Our{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            overshoot and ringing guide
          </Link>{" "}
          has a short section on reading settling from a normal-scale capture; this page goes further,
          into the small bands that need zooming.
        </p>
        <Figure
          caption={
            <>
              The input step (blue) and the output (green) it produces. The output is delayed, slews,
              overshoots and rings. Settling time runs from the input step to the last time the output
              crosses into the dashed error band.
            </>
          }
        >
          <svg viewBox="0 0 320 185" className="w-full h-auto" role="img" aria-label="Step response with input step, delayed ringing output, error band around the final value and the settling time interval marked">
            <rect x="0" y="0" width="320" height="185" rx="4" className="fill-[#0f1a14]" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line key={i} x1={i * 32} y1="0" x2={i * 32} y2="160" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
            ))}
            <rect x="0" y={FINAL - BAND} width="320" height={BAND * 2} fill="#ffd56b" fillOpacity="0.12" />
            <line x1="0" y1={FINAL - BAND} x2="320" y2={FINAL - BAND} stroke="#ffd56b" strokeWidth="0.8" strokeDasharray="4 3" />
            <line x1="0" y1={FINAL + BAND} x2="320" y2={FINAL + BAND} stroke="#ffd56b" strokeWidth="0.8" strokeDasharray="4 3" />
            <path d="M0 150 H60 V128 H320" fill="none" stroke="#5BB3E8" strokeWidth="1.8" />
            <polyline points={responsePts} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            <line x1="60" y1="96" x2="60" y2="170" stroke="#ffd56b" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={settleX} y1="40" x2={settleX} y2="170" stroke="#ffd56b" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="62" y1="168" x2={settleX - 2} y2="168" stroke="#ffd56b" strokeWidth="1.4" />
            <text x={(60 + settleX) / 2} y="181" fontSize="10" textAnchor="middle" fill="#ffd56b">settling time</text>
            <text x="316" y={FINAL - BAND - 4} fontSize="9" textAnchor="end" fill="#ffd56b">error band</text>
            <text x="6" y="145" fontSize="9" fill="#5BB3E8">input step</text>
            <text x="230" y="70" fontSize="9" fill="#9fe3b4">output</text>
          </svg>
        </Figure>
      </section>

      <section id="error-bands">
        <h2 className="text-xl font-semibold mb-3">Choosing the error band</h2>
        <p className="text-muted leading-7 mb-4">
          The band decides everything that follows, because it sets how small a voltage you must be able
          to see. Use the figure from the datasheet you are checking against, or work back from what the
          next stage needs. The table converts common bands into millivolts for two step sizes.
        </p>
        <DataTable
          head={["Error band", "5 V step", "1 V step", "Where it is used"]}
          mono={[0, 1, 2]}
          rows={[
            ["±1%", "±50 mV", "±10 mV", "Regulators, control loops, general analog stages"],
            ["±0.2% (½ LSB, 8-bit)", "±10 mV", "±2 mV", "Settling for an 8-bit DAC or ADC driver"],
            ["±0.1%", "±5 mV", "±1 mV", "Common op-amp datasheet condition"],
            ["±0.012% (½ LSB, 12-bit)", "±0.6 mV", "±0.12 mV", "12-bit data converters; needs special techniques"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-source">Drive a clean, repeatable step</StepHeading>
        <p className="text-muted leading-7">
          You need the same step over and over so the scope can trigger and average. For an amplifier,
          a function generator square wave at a low frequency works well: make the period long enough
          that the output fully settles before the next edge, with plenty of flat time to spare. For a
          DAC, have the firmware toggle between two codes in a loop and drive a spare GPIO high at the
          same moment as a trigger marker. For a regulator, switch a resistive load on and off with a
          MOSFET driven by the generator, and trigger on the gate signal. Check that the source&apos;s own edge settles faster than the thing you are measuring,
          otherwise you are timing the generator.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="probe-check">Check the probe before trusting a slow tail</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A passive 10x probe is a compensated divider. If its trimmer is off, every step gains a slow
          exponential error that decays over the probe&apos;s own time constant, which on a long
          timebase looks exactly like a circuit that takes ages to settle. Before anything else,{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensate the probe
          </Link>{" "}
          on the scope&apos;s calibrator output, and use the short ground spring at the measurement
          point so ground-lead ringing does not get added to the real ringing.
        </p>
        <Figure
          caption={
            <>
              Test hookup for an amplifier stage: the generator step goes in, CH2 watches the input and
              CH1 watches the output. Both probes use short ground connections to the stage&apos;s own
              ground.
            </>
          }
        >
          <svg viewBox="0 0 340 175" className="w-full h-auto" role="img" aria-label="Setup diagram with a function generator feeding an amplifier, CH2 probe on the input step, CH1 probe on the output, and a shared ground">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="40" width="66" height="50" rx="4" className="fill-surface" />
              <path d="M150 35 L150 95 L205 65 Z" className="fill-surface" />
              <path d="M76 55 H150 M205 65 H300" />
              <rect x="290" y="80" width="20" height="40" rx="2" className="fill-surface" />
              <path d="M300 65 V80 M300 120 V140" />
              <path d="M43 90 V140 M177 80 V140 M30 140 H315" />
            </g>
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="115" y1="55" x2="115" y2="18" />
              <line x1="255" y1="65" x2="255" y2="18" />
              <path d="M119 22 Q132 80 124 140" strokeDasharray="4 3" strokeWidth="1.3" />
              <path d="M259 22 Q272 80 264 140" strokeDasharray="4 3" strokeWidth="1.3" />
            </g>
            <circle cx="115" cy="55" r="4" className="fill-accent" />
            <circle cx="255" cy="65" r="4" className="fill-accent" />
            <g fontSize="10" textAnchor="middle" className="fill-foreground">
              <text x="43" y="62">Function</text>
              <text x="43" y="75">generator</text>
              <text x="168" y="69">Stage</text>
              <text x="115" y="12" className="fill-accent">CH2 = input</text>
              <text x="255" y="12" className="fill-accent">CH1 = output</text>
              <text x="300" y="104" fontSize="9">load</text>
              <text x="170" y="162" className="fill-muted">short ground springs to the stage ground, not long clip leads</text>
            </g>
          </svg>
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Bandwidth matters too. A scope and probe have their own step response, roughly a rise time of
          0.35 divided by the bandwidth, plus whatever small overshoot their front end adds. If the
          circuit settles in a time comparable to that, part of what you measure belongs to the
          instrument.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="trigger-step">Trigger on the input step, not the output</StepHeading>
        <p className="text-muted leading-7">
          Put the trigger source on CH2 (the input step or the GPIO marker) with a rising or falling
          edge to match the step you want to study, and use Normal mode. The input edge is clean and
          fast, so the trigger point stays put from one capture to the next; triggering on the slow,
          ringing output would wander. Move the trigger point toward the left side of the screen so most
          of the display shows what happens after the step, and choose a timebase where the whole
          settling process fits in roughly half the screen.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="zoom-band">Zoom in vertically on the final value</StepHeading>
        <p className="text-muted leading-7 mb-4">
          At a scale that fits the whole step, a ±0.1% band is thinner than the trace. You have to
          magnify the region around the final value. Set CH1 to DC coupling, then use the channel offset
          (vertical position in volts) to bring the final value to the centre line, and increase the
          sensitivity until the error band spans a few divisions. The step itself now goes off the top or
          bottom of the screen, and only the tail is visible.
        </p>
        <Figure
          caption={
            <>
              The same output magnified six times around its final value. The start of the step is
              clipped off screen, and the error band, now several divisions tall, makes the last entry
              into it easy to see.
            </>
          }
        >
          <svg viewBox="0 0 320 160" className="w-full h-auto" role="img" aria-label="Magnified view of a settling waveform with the step clipped off screen and the ringing tail entering a wide error band">
            <rect x="0" y="0" width="320" height="160" rx="4" className="fill-[#0f1a14]" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <line key={i} x1="0" y1={i * 18.75} x2="320" y2={i * 18.75} stroke="#2c4a3a" strokeWidth={i === 4 ? 1.2 : 0.6} strokeDasharray={i === 4 ? "" : "2 3"} />
            ))}
            <rect x="0" y={75 - BAND * 6} width="320" height={BAND * 12} fill="#ffd56b" fillOpacity="0.1" />
            <line x1="0" y1={75 - BAND * 6} x2="320" y2={75 - BAND * 6} stroke="#ffd56b" strokeWidth="0.8" strokeDasharray="4 3" />
            <line x1="0" y1={75 + BAND * 6} x2="320" y2={75 + BAND * 6} stroke="#ffd56b" strokeWidth="0.8" strokeDasharray="4 3" />
            <polyline points={zoomPts} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            <line x1={settleX} y1="10" x2={settleX} y2="150" stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3" />
            <text x={settleX + 4} y="20" fontSize="9" fill="#5BB3E8">last entry into band</text>
            <text x="6" y="155" fontSize="9" fill="#9fe3b4">CH1 offset = final value, high sensitivity</text>
          </svg>
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Watch for overdrive recovery">
            Driving a scope input many divisions off screen can saturate its front-end amplifier, and it
            needs time to recover once the signal comes back into range. That recovery can look like
            extra settling. Test it by repeating the measurement at a less sensitive setting: if the tail
            changes shape when the overdrive is reduced, the scope is contributing. Some datasheets
            quote an overdrive recovery time; for precision bands, a clamp or a circuit that passes only
            the error voltage keeps the scope out of saturation.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="average">Average out the noise</StepHeading>
        <p className="text-muted leading-7">
          At high sensitivity, random noise thickens the trace until the band edges are hard to judge.
          Switch the acquisition mode to Average with 16 to 64 sweeps. Because the step repeats exactly
          and the trigger is locked to the clean input edge, the real waveform adds up identically each
          time while random noise cancels, so the tail sharpens. A high-resolution acquisition mode, on
          scopes that have one, does a similar job by averaging adjacent samples within a single capture.
          Neither removes interference that is synchronous with the step, such as switching noise from
          the same clock.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="cursors">Read the settling time with cursors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Stop the acquisition. Set two horizontal voltage cursors at the top and bottom of the error
          band (final value plus and minus the tolerance) so the band is marked on screen. Then put the
          first vertical time cursor on your reference, either the input step or the output&apos;s 50%
          crossing, and slide the second to the point where the trace last enters the band. The Δt
          readout is the settling time. Note the band, the step size and the reference you used next to
          the number, because a settling time without them cannot be compared to anything.
        </p>
        <DataTable
          head={["Record", "Example entry", "Why it matters"]}
          rows={[
            ["Step size and direction", "0 V to 2 V, rising", "Rising and falling steps often settle differently"],
            ["Error band", "±0.1% of final value", "A tighter band always gives a longer time"],
            ["Reference point", "Input step edge", "Changes the result by the delay plus slew time"],
            ["Load", "2 kΩ with 100 pF", "Capacitive load usually lengthens ringing"],
            ["Scope settings", "Average 32, 20 MHz limit off", "Shows how noise and bandwidth were handled"],
          ]}
        />
      </section>

      <section id="resolution">
        <h2 className="text-xl font-semibold mb-3">Vertical resolution sets a floor</h2>
        <p className="text-muted leading-7 mb-4">
          An 8-bit converter, common on entry-level scopes, splits the screen height into about 256
          levels. With 8 vertical divisions that is roughly 32 levels per division, so the smallest step
          the scope can show is about the V/div setting divided by 32. Assuming the full range spans the
          graticule (some scopes keep a margin, which makes each step a little coarser), the chart shows
          why the zoom in step 4 is not optional.
        </p>
        <BarChart
          log
          items={[
            { label: "1 V/div", value: 31, display: "≈ 31 mV" },
            { label: "200 mV/div", value: 6.3, display: "≈ 6.3 mV" },
            { label: "50 mV/div", value: 1.6, display: "≈ 1.6 mV" },
            { label: "10 mV/div", value: 0.31, display: "≈ 0.31 mV", highlight: true },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          At 1 V/div a ±5 mV band is smaller than one converter step and cannot be resolved at all;
          at 10 mV/div with offset it spans a full division. Averaging can resolve detail a little finer
          than one step when there is some noise to dither the signal, but it cannot recover a band that
          is buried many times below the step size.
        </p>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting a settling-time measurement</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Long, slow tail that changes when you touch the probe trimmer", "Probe miscompensation", "Compensate on the calibrator and re-measure"],
            ["Tail shape changes with V/div setting", "Front-end overdrive recovery", "Reduce overdrive or use a clamp or error-amplifier method"],
            ["Band edges lost in a fuzzy trace", "Random noise at high sensitivity", "Use Average or high-resolution mode"],
            ["Averaged trace looks smeared", "Trigger on the noisy output", "Trigger on the clean input step or a GPIO marker"],
            ["Fast ringing that disappears with the ground spring", "Long ground lead resonance", "Keep the short ground connection"],
            ["Offset control will not reach the final value", "Offset range limited at that V/div", "Use a less sensitive setting or subtract a reference on another channel"],
          ]}
        />
      </section>

      <section id="safety">
        <Callout title="Mind the input limits when zooming">
          Pushing a large step far off screen is normal for this measurement, but the voltage at the
          input is still the full signal. Stay within the probe and scope input ratings, never connect a
          mains-earthed scope ground to a non-isolated mains circuit, and use a differential probe for
          anything not referenced to earth.
        </Callout>
      </section>
    </HowToShell>
  );
}
