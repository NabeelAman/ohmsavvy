import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  FrontPanel,
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
  "How to trigger an oscilloscope: set edge trigger level and slope, choose Auto, Normal or Single mode, use holdoff, and stop a rolling, unstable waveform.";

export const metadata = buildMetadata({
  title: "How to Trigger an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-trigger-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

export default function HowToTriggerAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Trigger an Oscilloscope"
      description={description}
      published="2026-10-20"
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
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope, front panel",
        caption: (
          <>
            Trigger controls look much the same on most digital scopes, including the 100MHz
            four-channel Siglent SDS1104X-E in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-waveform-rolls", label: "Why an untriggered waveform rolls" },
        { id: "trigger-controls", label: "The trigger controls" },
        { id: "trigger-source", label: "Pick the trigger source" },
        { id: "edge-and-slope", label: "Edge trigger and slope" },
        { id: "trigger-level", label: "Set the trigger level" },
        { id: "trigger-mode", label: "Auto, Normal or Single mode" },
        { id: "holdoff", label: "Use holdoff" },
        { id: "fix-unstable-waveform", label: "Fixing an unstable waveform" },
        { id: "beyond-edge", label: "Beyond edge triggering" },
        { id: "triggering-in-measurement", label: "How triggering fits in" },
      ]}
      faq={[
        {
          q: "Why does my oscilloscope show Auto instead of Trig'd?",
          a: "On scopes with a status indicator, a reading of Auto in Auto mode generally means no valid trigger event has been found, so the scope is capturing on its own timer and the trace is not locked. Check that the source is the channel you are probing and that the level sits between the top and bottom of the signal. Once it locks, the status should change to Trig'd or similar.",
        },
        {
          q: "How do you capture a one-time event on an oscilloscope?",
          a: "Use Single mode. Set the source to the channel carrying the event, choose the slope that matches it (rising for a line going high, falling for one going low) and put the level partway through the expected change. Pick a time/div slow enough to hold the whole event, then press Single. The scope arms, waits, captures one trigger and stops, leaving the result on screen to measure.",
        },
        {
          q: "Should I trigger on the rising or falling edge?",
          a: "For a simple repeating wave either gives a stable picture; the choice only moves which half of the cycle sits at the trigger point. It matters when you care about one transition, such as a reset line releasing or a logic signal going low. Pick the slope that matches that transition so the edge you want to study lands at the trigger point every time.",
        },
        {
          q: "Can you trigger on one channel and view another?",
          a: "Yes. The trigger source does not have to be the channel you are studying. A common approach is to trigger on a clean, regular signal, such as a clock or a control line, and view a noisier related signal on another channel. Both traces are then shown in their correct time relationship, which is how you check delays or the order in which signals change.",
        },
        {
          q: "Why does my waveform jitter even when it is triggered?",
          a: "Small left-right jitter usually comes from noise near the trigger level, which makes the exact crossing moment vary slightly from capture to capture. Move the level to the steepest part of the edge, where noise shifts the crossing time least. Many scopes also offer noise-reject or HF-reject trigger coupling. If the jitter stays, the signal itself may genuinely vary in timing.",
        },
      ]}
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
        <h2 id="why-waveform-rolls" className="text-xl font-semibold mb-3">Why an untriggered waveform rolls</h2>
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
        <h2 id="trigger-controls" className="text-xl font-semibold mb-3">The trigger controls, in plain terms</h2>
        <p className="text-muted leading-7 mb-5">
          Names and menu layouts vary between brands, but almost every digital scope gives you the
          same core set. On most bench scopes there&apos;s a dedicated Trigger section on the front
          panel with a level knob and a menu button.
        </p>
        <div className="mb-5">
          <Figure
            caption={
              <>
                A generic digital scope front panel. The trigger level knob usually sits in its own
                group beside the vertical (V/div) and horizontal (time/div) controls, with the Auto,
                Run/Stop and Single buttons nearby. Layouts vary by model, so check where your scope
                puts each control.
              </>
            }
          >
            <FrontPanel />
          </Figure>
        </div>
        <p className="text-muted leading-7 mb-5">
          On the panel above, the level knob is the one you will touch most; source, type, slope,
          mode and holdoff usually live in the menu that the trigger section&apos;s button opens.
          Here is what each of those settings does.
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
        <StepHeading n={1} id="trigger-source">Pick the trigger source</StepHeading>
        <p className="text-muted leading-7">
          Set the source to the channel carrying the signal you want to hold steady, usually CH1
          when you&apos;re starting out. A very common beginner mistake is probing on CH2 while the
          trigger is still watching an empty CH1: the scope never sees a crossing, so nothing
          locks. If you&apos;re viewing two related signals, trigger on the cleaner or more
          regular of the two and the other will be shown in the correct time relationship to it.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="edge-and-slope">Use an edge trigger and choose the slope</StepHeading>
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
        <StepHeading n={3} id="trigger-level">Set the trigger level inside the signal</StepHeading>
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
        <StepHeading n={4} id="trigger-mode">Choose Auto, Normal or Single mode</StepHeading>
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
        <StepHeading n={5} id="holdoff">Use holdoff for complex repeating signals</StepHeading>
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
        <h2 id="fix-unstable-waveform" className="text-xl font-semibold mb-3">Fixing a rolling or unstable waveform</h2>
        <p className="text-muted leading-7 mb-4">
          If you are not sure where to start, check the four core settings in the order below. Each
          one depends on the one before it: a perfect level is no use if the trigger is watching
          the wrong channel, and no mode can help if the level never meets the signal.
        </p>
        <div className="mb-5">
          <Figure
            caption={
              <>
                A quick trigger check, in order. Most rolling traces are fixed at the first or second
                box; slope and mode decide which edge you lock on and what the scope does between
                triggers.
              </>
            }
          >
            <FlowDiagram
              steps={[
                { label: "Source", sub: "Watching the channel you probe?" },
                { label: "Level", sub: "Inside the signal, near mid-height?" },
                { label: "Slope", sub: "Rising or falling, matching your edge?" },
                { label: "Mode", sub: "Auto to find it; Normal/Single to hold" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mb-4">
          If you would rather start from what you see on screen, work down this list in order; the
          first two fixes solve most cases.
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
        <h2 id="beyond-edge" className="text-xl font-semibold mb-3">Beyond edge triggering</h2>
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
        <div className="mt-5">
          <ProductStrip
            title="Bench scopes in our reviews"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s, with strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel 100MHz digital bench oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s.",
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="triggering-in-measurement" className="text-xl font-semibold mb-3">How triggering fits into a measurement</h2>
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
