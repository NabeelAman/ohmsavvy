import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, InfoCards, KeyIdea, ScopeScreen, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "How to Trigger an Oscilloscope",
  description:
    "How to trigger an oscilloscope: set edge trigger level and slope, choose Auto, Normal or Single mode, use holdoff, and stop a rolling, unstable waveform.",
  path: "/oscilloscopes/how-to-trigger-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

export default function HowToTriggerAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Trigger an Oscilloscope"
      path="/oscilloscopes/how-to-trigger-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Learning how to trigger an oscilloscope is what turns a smeared, drifting trace into a
          waveform that sits still long enough to measure. The trigger tells the scope exactly
          where in the signal each capture should line up. This guide covers edge triggering,
          level and slope, the Auto, Normal and Single modes, holdoff, and a quick fix list for
          the most common &quot;my waveform won&apos;t stop moving&quot; problems.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front panel",
        caption: (
          <>
            Trigger controls look much the same on most digital scopes, including the 50MHz
            four-channel Rigol DS1054Z in our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency",
          desc: "Once the trace is stable, read the period from the grid and convert it with f = 1/T.",
        },
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate a Probe",
          desc: "A miscompensated 10x probe distorts edges, which can upset edge triggering and measurements.",
        },
      ]}
    >
      <Callout title="Safety before you clip on">
        <p>
          Triggering is a front-panel task, but you can only practise it on a live signal, so set
          up safely first. On a bench scope the probe&apos;s ground clip is normally tied to mains
          earth through the power cord. Clipping it to a point that isn&apos;t at earth potential,
          such as anywhere on a mains-connected, non-isolated circuit, creates a short through the
          ground lead that can cause damage, fire or injury. Never remove or defeat the
          scope&apos;s earth to work around this; use an isolation transformer on the device under
          test, a differential probe, or an isolated-channel or handheld scope rated for the job.
          Stay within the CAT rating and maximum input printed on your probe and scope. Standard
          1x/10x probes are not for mains work unless their rating explicitly covers it. For
          practice, the scope&apos;s own probe-compensation output or a function generator is ideal.
        </p>
      </Callout>

      <section>
        <h2 className="text-xl font-semibold mb-3">Why an untriggered waveform rolls</h2>
        <p className="text-muted leading-7">
          A scope doesn&apos;t draw a signal once; it captures it over and over and redraws the
          screen each time. If each capture starts at an arbitrary point in the signal, every
          redraw shows the waveform shifted by a different amount. Your eye sees that as a trace
          drifting sideways, a blur of overlapping copies, or a picture that never settles. The
          trigger fixes this by waiting for one specific, repeatable event, for example &quot;the
          signal rising through 1 V&quot;, and lining up every capture on that event. Because the
          event happens at the same place in every cycle of a repeating signal, every redraw lands
          on top of the last one and the waveform appears to stand still.
        </p>
        <div className="mt-5">
          <KeyIdea title="The one-sentence version">
            An edge trigger says: &quot;line up each capture at the moment this channel crosses
            this voltage, going in this direction.&quot; Source, level and slope are the three
            answers you have to give it.
          </KeyIdea>
        </div>
      </section>

      <Figure
        caption={
          <>
            A triggered sine wave. The dashed T line is the trigger level (here at 0 V, the centre
            line). The scope aligns each capture on a rising crossing of that line, which on many
            digital scopes is placed at the horizontal centre of the screen by default.
          </>
        }
      >
        <ScopeScreen wave="sine" cycles={2} amplitude={3} triggerLevel={0} labels={{ left: "CH1 1 V/div", right: "1 ms/div" }} />
      </Figure>

      <section>
        <h2 className="text-xl font-semibold mb-3">The trigger controls, in plain terms</h2>
        <p className="text-muted leading-7 mb-5">
          Names and menu layouts vary between brands, but almost every digital scope gives you the
          same core set. On most bench scopes there&apos;s a dedicated Trigger section on the front
          panel with a level knob and a menu button.
        </p>
        <InfoCards
          items={[
            { label: "Source", desc: "Which channel (or external input) the trigger watches. Usually the channel showing your signal." },
            { label: "Type", desc: "What kind of event to look for. Edge is the default and covers most everyday work." },
            { label: "Level", desc: "The voltage the signal must cross. Shown as a marker or dashed line on screen." },
            { label: "Slope", desc: "Rising, falling, or on some scopes either edge. Picks which crossing direction counts." },
            { label: "Mode", desc: "Auto, Normal or Single: what the scope does while it waits for a trigger." },
            { label: "Holdoff", desc: "A minimum wait after each trigger before the scope will accept the next one." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1}>Pick the trigger source</StepHeading>
        <p className="text-muted leading-7">
          Set the source to the channel carrying the signal you want to hold steady, usually CH1
          when you&apos;re starting out. A very common beginner mistake is probing on CH2 while the
          trigger is still watching an empty CH1: the scope never sees a crossing, so nothing
          locks. If you&apos;re viewing two related signals, trigger on the cleaner or more
          regular of the two and the other will be shown in the correct time relationship to it.
        </p>
      </section>

      <section>
        <StepHeading n={2}>Use an edge trigger and choose the slope</StepHeading>
        <p className="text-muted leading-7">
          Leave the trigger type on Edge. Then choose the slope: rising means the event happens
          when the signal crosses the level going upward, falling means going downward. For a
          simple repeating wave either will give a stable picture; they just line up the capture
          on opposite halves of the cycle. When you care about a specific transition, such as the
          moment a logic line goes high, pick the slope that matches it so that edge sits at the
          trigger point.
        </p>
      </section>

      <section>
        <StepHeading n={3}>Set the trigger level inside the signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The level must sit somewhere the signal actually crosses. A good starting point is
          roughly halfway between the waveform&apos;s lowest and highest points, where the edges
          are steepest and least affected by noise. Many scopes have a button or knob-press that
          sets the level to the middle of the signal automatically (often labelled 50% or similar;
          check your manual). If the level is above the top of the signal or below the bottom,
          there is no crossing to find and the trigger cannot lock.
        </p>
        <Figure
          caption={
            <>
              A square wave triggered on its rising edge with the level (T) set 1 division above
              centre. Each cycle is 5 divisions long, and the rising edge at the centre graticule
              line is the trigger point.
            </>
          }
        >
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={2.5}
            triggerLevel={1}
            marks={[{ x1: 0, y1: 0.8, x2: 5, y2: 0.8, text: "1 cycle = 5 div" }]}
            labels={{ left: "CH1 1 V/div", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4}>Choose Auto, Normal or Single mode</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The mode decides what the scope does while no trigger event is happening. Most scopes
          default to Auto, which is the right choice while you&apos;re still finding the signal.
          Switch to Normal or Single once you know what you&apos;re looking for.
        </p>
        <DataTable
          head={["Mode", "What it does", "Use it when"]}
          rows={[
            [
              "Auto",
              "Triggers on the event if it happens; if nothing triggers for a short time, it captures anyway so you always see a trace.",
              "Finding a signal, checking DC levels, or when you are not sure what is there yet.",
            ],
            [
              "Normal",
              "Only updates the screen when a valid trigger occurs. Between events the last capture stays on screen.",
              "Infrequent or irregular signals, where Auto would keep drawing untriggered junk.",
            ],
            [
              "Single",
              "Arms, waits for one trigger, captures it, then stops.",
              "One-off events: power-up behaviour, a switch or button bouncing, an occasional glitch.",
            ],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Two things catch beginners out here. In Auto mode a trace that rolls or jitters usually
          means the scope is not actually triggering and is free-running instead. In Normal mode a
          screen that stops updating usually means the level or source is wrong, not that the
          signal disappeared. Many scopes show a status indicator (for example Trig&apos;d, Auto or
          Wait) that tells you which situation you are in.
        </p>
      </section>

      <Figure
        caption={
          <>
            The trigger level (T) set above the top of the signal. There is no crossing to find, so
            in Auto the scope free-runs and the trace drifts, and in Normal the screen simply stops
            updating. Bring the level back inside the waveform to fix either.
          </>
        }
      >
        <ScopeScreen wave="sine" cycles={2} amplitude={2.5} triggerLevel={3.2} labels={{ left: "CH1 1 V/div", right: "1 ms/div" }} />
      </Figure>

      <section>
        <StepHeading n={5}>Use holdoff for complex repeating signals</StepHeading>
        <p className="text-muted leading-7">
          Some signals cross the trigger level several times in one repeating pattern, such as a
          burst of pulses followed by a gap, or a data stream. An edge trigger may then lock on a
          different crossing each time, giving a picture that jumps between two or three
          alignments or looks like several waveforms overlaid. Holdoff tells the scope to ignore
          any trigger events for a set time after each one it accepts. Increase it gradually until
          it is a little longer than the burst itself but shorter than the full repeat period, and
          the scope will lock on the first edge of every burst. For simple sine and square waves
          you can leave holdoff at its minimum.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Fixing a rolling or unstable waveform</h2>
        <p className="text-muted leading-7 mb-4">
          Work down this list in order; the first two fixes solve most cases.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Trace drifts sideways in Auto", "Level is outside the signal, so the scope free-runs", "Move the level to mid-signal, or use the set-to-50% function if your scope has one"],
            ["Nothing locks at all", "Trigger source is a different channel from the one you are probing", "Set the source to the active channel"],
            ["Screen frozen in Normal", "No valid trigger events are happening", "Check level and source, or switch to Auto to find the signal first"],
            ["Two or more overlapping copies", "Several crossings per repeating pattern", "Increase holdoff, or trigger on a different slope or level"],
            ["Edges jitter left and right", "Noise on the signal near the trigger level", "Move the level to the steepest part of the edge; many scopes also offer noise-reject or HF-reject trigger coupling"],
            ["Stable but not the edge you want", "Wrong slope selected", "Switch between rising and falling"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Beyond edge triggering</h2>
        <p className="text-muted leading-7">
          Edge is enough for most hobby and repair work, but many digital scopes add more specific
          trigger types, such as triggering on a pulse that is wider or narrower than a set time,
          on a video signal&apos;s sync, or on a pattern across several channels. Some models can
          also trigger on serial bus data. Which types are available varies a lot by model and
          sometimes by installed options, so check your scope&apos;s datasheet rather than
          assuming. If advanced triggers matter to you, our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          covers what to look for, and the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          list compares models such as the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">How triggering fits into a measurement</h2>
        <p className="text-muted leading-7">
          A stable trigger is the step that makes everything else possible. Once the waveform
          holds still, you can{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            read the screen
          </Link>{" "}
          division by division,{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            measure voltage
          </Link>{" "}
          with cursors, and{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            measure frequency
          </Link>{" "}
          from the period. If you&apos;re brand new to scopes, start with{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>{" "}
          and the first-session walkthrough in{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>
          . And if the signal you&apos;re chasing is a steady DC level rather than something that
          changes over time, you may not need a trigger at all: see{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
