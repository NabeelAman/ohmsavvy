import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, ScopeScreen, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Oscilloscope trigger not working? Find why it sits on Wait or Auto: level outside the signal, wrong source, type, holdoff, coupling or probe ratio, and fix it.";

export const metadata = buildMetadata({
  title: "Why Is My Oscilloscope Trigger Not Working?",
  description,
  path: "/oscilloscopes/why-is-my-oscilloscope-trigger-not-working",
});

const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

const link = "text-accent hover:underline";

/** The trigger path as a chain of six gates; each one can stop the scope from ever reporting a trigger. */
function TriggerPathDiagram() {
  const boxes = [
    { x: 6, y: 18, n: "1", title: "Source", sub: "CH1–CH4, EXT or Line", fault: "Wrong channel: no edges" },
    { x: 152, y: 18, n: "2", title: "Trigger coupling", sub: "DC, AC, LF/HF reject", fault: "LF reject erases slow edges" },
    { x: 298, y: 18, n: "3", title: "Level comparator", sub: "Threshold × probe ratio", fault: "Outside the swing: no edge" },
    { x: 6, y: 120, n: "4", title: "Type and conditions", sub: "Edge, pulse, video, runt", fault: "Wrong type never matches" },
    { x: 152, y: 120, n: "5", title: "Holdoff", sub: "Ignore time after a trigger", fault: "Too long: rare updates" },
    { x: 298, y: 120, n: "6", title: "Sweep mode", sub: "Auto, Normal or Single", fault: "Normal waits indefinitely" },
  ];
  return (
    <svg
      viewBox="0 0 440 226"
      className="w-full h-auto"
      role="img"
      aria-label="Block diagram of an oscilloscope trigger path: the source selector, trigger coupling, level comparator, trigger type and conditions, holdoff and sweep mode in a chain. Each block lists how it can stop the trigger from firing, from a wrong source channel to Normal mode waiting indefinitely."
    >
      <defs>
        <marker id="tp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-accent" />
        </marker>
      </defs>
      {boxes.map((b) => (
        <g key={b.n}>
          <rect x={b.x} y={b.y} width="136" height="64" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.2" />
          <circle cx={b.x + 13} cy={b.y + 14} r="8" className="fill-accent" />
          <text x={b.x + 13} y={b.y + 17.5} fontSize="10" fontWeight="700" textAnchor="middle" fill="#ffffff">{b.n}</text>
          <text x={b.x + 26} y={b.y + 18} fontSize="10.5" fontWeight="600" className="fill-foreground">{b.title}</text>
          <text x={b.x + 8} y={b.y + 36} fontSize="9" className="fill-muted">{b.sub}</text>
          <text x={b.x + 8} y={b.y + 54} fontSize="8.8" className="fill-accent">{b.fault}</text>
        </g>
      ))}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" markerEnd="url(#tp-arrow)">
        <line x1="142" y1="50" x2="151" y2="50" />
        <line x1="288" y1="50" x2="297" y2="50" />
        <path d="M366 82 V100 H74 V119" />
        <line x1="142" y1="152" x2="151" y2="152" />
        <line x1="288" y1="152" x2="297" y2="152" />
      </g>
      <text x="220" y="208" fontSize="10" textAnchor="middle" className="fill-foreground">
        Every gate must pass before the status reads Trig&apos;d
      </text>
      <text x="220" y="221" fontSize="9" textAnchor="middle" className="fill-muted">
        Find the first gate that blocks and the trigger starts working
      </text>
    </svg>
  );
}

export default function WhyIsMyOscilloscopeTriggerNotWorkingPage() {
  return (
    <HowToShell
      title="Why Is My Oscilloscope Trigger Not Working?"
      description={description}
      path="/oscilloscopes/why-is-my-oscilloscope-trigger-not-working"
      category="oscilloscopes"
      published="2026-10-29"
      intro={
        <>
          An oscilloscope trigger stops working when no part of the signal meets every condition you have set:
          the level sits above or below the waveform, the source is a different channel, or the trigger type,
          holdoff or coupling rules out the edges that are really there. Fix it by pressing Force Trigger to prove
          the scope captures at all, then resetting to a DC-coupled edge trigger on the right channel with the
          level at 50% of the swing. The sections below explain each cause with real numbers, so you can see which
          setting is blocking the trigger instead of guessing.
        </>
      }
      aside={{
        image: sds1104.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope with trigger controls on the front panel",
        caption: (
          <>
            Trigger menus differ by brand, but the six settings on this page exist on almost every digital scope,
            including the Siglent SDS1104X-E in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "symptoms", label: "What a dead trigger looks like" },
        { id: "trigger-chain", label: "The trigger is a chain of gates" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "step-force", label: "1. Force a capture" },
        { id: "step-source", label: "2. Confirm the source" },
        { id: "step-level", label: "3. Put the level inside the swing" },
        { id: "step-probe-ratio", label: "4. Match the probe ratio" },
        { id: "step-type", label: "5. Go back to an edge trigger" },
        { id: "step-holdoff", label: "6. Shorten the holdoff" },
        { id: "step-coupling", label: "7. Set trigger coupling to DC" },
        { id: "step-size", label: "8. Make the signal big enough" },
        { id: "step-external", label: "9. Check the external trigger input" },
        { id: "step-event", label: "10. Make sure the event happens" },
      ]}
      faq={[
        {
          q: "Why does my oscilloscope only show a trace in Auto mode?",
          a: "Auto mode draws a trace on a timer when no trigger arrives, so it hides a trigger that never fires. Normal mode waits for a real trigger and draws nothing until one comes. If the trace vanishes the moment you switch to Normal, the trigger was never working; check the source, put the level at mid-swing and reset the type to Edge, then try Normal again.",
        },
        {
          q: "What does the Force Trigger button do on an oscilloscope?",
          a: "Force Trigger makes the scope take one capture immediately, as if a trigger had occurred, whatever the trigger settings say. It is a quick diagnostic: if a waveform appears after pressing it, the probe, channel and acquisition all work and the fault is purely in the trigger conditions. If even a forced capture shows nothing, look at the channel and probe instead of the trigger.",
        },
        {
          q: "Why won't my scope trigger on a small signal?",
          a: "Digital scopes need the signal to cross the level by a minimum amount, usually specified as a fraction of a vertical division, so a signal that is tiny on screen gives the comparator too little to work with. A 30 mV ripple at 500 mV/div is only 0.06 divisions tall. Turn the volts/div down until the signal covers a few divisions and the trigger normally locks.",
        },
        {
          q: "Why is my oscilloscope external trigger input ignored?",
          a: "The trigger source must be set to EXT, or the scope keeps watching a channel instead. Beyond that, the external input usually has a narrower level range and less sensitivity than the main channels, so a large or offset sync signal may sit outside it and a tiny one may never register. Check the manual's external trigger range, and some four-channel scopes have no EXT input at all.",
        },
        {
          q: "Is my oscilloscope broken if it will not trigger at all?",
          a: "Almost never. Restore the default setup, probe the scope's own calibration output and press Auto or Autoset. A healthy scope triggers on that square wave straight away. If it does, the hardware is fine and a setting was blocking the trigger. If it still cannot trigger on its own calibration signal after a default setup, contact the maker or a repair service.",
        },
        {
          q: "Why does Single mode never capture anything?",
          a: "Single arms the scope once and waits for one event that meets every trigger condition. If the event happened before you pressed Single, never crosses the level, or moves in the opposite direction to the slope you set, the scope waits indefinitely. Arm it first, then cause the event, and check that a falling event such as a supply dropping out is paired with a falling slope.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "The full setup of source, level, slope, mode and holdoff from scratch.",
        },
        {
          href: "/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting",
          title: "How to Stop a Waveform from Drifting",
          desc: "When the trigger fires but the trace still slides or jitters sideways.",
        },
        {
          href: "/oscilloscopes/why-is-there-no-signal-on-one-oscilloscope-channel",
          title: "Why Is There No Signal on One Oscilloscope Channel?",
          desc: "When one input shows nothing while another works.",
        },
        {
          href: "/oscilloscopes/why-is-my-oscilloscope-frequency-reading-unstable",
          title: "Why Is My Oscilloscope Frequency Reading Unstable?",
          desc: "A jumping frequency readout often traces back to the trigger.",
        },
      ]}
    >
      <section id="symptoms">
        <h2 className="text-xl font-semibold mb-3">What a dead trigger looks like</h2>
        <p className="text-muted leading-7 mb-4">
          A trigger that is not working at all shows up in a handful of recognizable ways. The status readout,
          usually in a top corner of the screen, never says Trig&apos;d (some brands abbreviate it to T&apos;D) and
          instead shows Wait, Ready, Armed, Trig? or Auto. In Normal mode the screen goes blank or freezes on the
          last good capture. Pressing Single arms the scope and nothing ever happens. Or you have wired a sync signal
          to the EXT input and the scope behaves as if it isn&apos;t there.
        </p>
        <p className="text-muted leading-7">
          This page is about a trigger that never fires. If the trigger does fire but the trace slides, rolls or
          jitters sideways, that is a stability problem with different fixes, covered in{" "}
          <Link href="/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting" className={link}>
            how to stop an oscilloscope waveform from drifting
          </Link>
          . And if every channel shows a flat line whatever you do, start with{" "}
          <Link href="/oscilloscopes/why-does-my-oscilloscope-show-a-flat-line" className={link}>
            why an oscilloscope shows a flat line
          </Link>{" "}
          instead, because a missing signal can&apos;t trigger anything.
        </p>
      </section>

      <section id="trigger-chain">
        <h2 className="text-xl font-semibold mb-3">The trigger is a chain of gates</h2>
        <p className="text-muted leading-7 mb-4">
          It helps to picture the trigger as a series of gates the signal must pass, in order. The source selector
          picks which input feeds the trigger. Trigger coupling filters that copy of the signal. A comparator checks
          whether it crosses the level. The trigger type then asks whether the crossing matches the pattern you
          asked for, holdoff decides whether enough time has passed since the last trigger, and the sweep mode
          decides what to draw while waiting. One closed gate anywhere along the chain means no trigger, however
          perfect the other five settings are.
        </p>
        <Figure caption="The six settings a signal must satisfy, in order, before the scope reports a trigger. The bottom line in each block is the most common way it blocks.">
          <TriggerPathDiagram />
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Status stays on Wait or Auto", "Level above or below the waveform", "Find the T marker against the trace", "Press the 50% or set-level function"],
            ["Nothing triggers, trace looks fine", "Source is a different channel", "Read the source in the trigger readout", "Set the source to the probed channel"],
            ["Never triggers on a clean square wave", "Pulse, video, runt or pattern type left on", "Open the trigger type menu", "Select Edge"],
            ["Pulse trigger never fires", "Width condition the pulses can't meet", "Measure the real pulse width with cursors", "Set the condition around the measured width"],
            ["Screen updates once every few seconds", "Holdoff far longer than the signal period", "Read the holdoff value", "Reset holdoff to its minimum"],
            ["Slow signal won't trigger, fast one will", "AC or LF-reject trigger coupling", "Check the trigger coupling setting", "Use DC trigger coupling"],
            ["Level reads sensibly but never crosses", "Probe 10x, channel set to 1x", "Compare the probe switch with the channel menu", "Match the channel probe ratio to the probe"],
            ["Small ripple or noise won't trigger", "Signal under the trigger sensitivity", "Count how many divisions the signal spans", "Reduce volts/div until it fills several divisions"],
            ["EXT sync signal ignored", "Source not EXT, or signal outside the EXT range", "Check source and the manual's EXT specs", "Select EXT; scale or attenuate the sync signal"],
            ["Normal or Single sits armed forever", "The qualifying event never happens", "Switch to Auto and watch the signal", "Change slope or level, or arm before the event"],
          ]}
        />
      </section>

      <section id="step-force">
        <StepHeading n={1}>Force a capture to split the problem in half</StepHeading>
        <p className="text-muted leading-7">
          Most scopes have a Force Trigger button, sometimes labeled Force or Force Trig, and it takes a capture on
          demand. Press it once in Normal mode. A waveform appearing proves the probe, channel and acquisition all
          work and that the fault lies purely in the trigger settings. If even a forced capture is empty, the
          problem is upstream of the trigger: the signal isn&apos;t reaching the channel, so work through the flat
          line checks first. Switching the mode to Auto gives the same answer, because Auto draws on a timer when
          nothing triggers.
        </p>
      </section>

      <section id="step-source">
        <StepHeading n={2}>Confirm the trigger source</StepHeading>
        <p className="text-muted leading-7">
          The trigger watches one input, chosen in the trigger menu and normally printed in the trigger readout
          beside the level, for example &quot;CH1 ↑ 1.20 V&quot;. With the probe in CH3 and the source on CH1, the
          comparator sees an empty input and has nothing to cross. This is especially easy to miss after Autoset,
          which may choose a channel for you, or when you move a probe between inputs without touching the trigger
          menu. On a multichannel capture, the source should be the cleanest, most regular signal of the set;
          the others will be drawn in their true time relationship to it.
        </p>
      </section>

      <section id="step-level">
        <StepHeading n={3}>Put the level inside the signal swing</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The level is a voltage the waveform has to pass through. Suppose you last looked at 5 V logic with the
          level at 2.5 V, then probe a 3.3 V microcontroller pin with the level set to 5 V for some earlier job.
          The signal swings from 0 V to 3.3 V, so it never reaches 5 V and the comparator never flips. Lowering the
          level to the midpoint, 3.3 ÷ 2 = 1.65 V, gives it a crossing on every edge. The same trap appears with a
          DC-offset signal: a 200 mV ripple riding on a 12 V rail spans roughly 11.9 V to 12.1 V, so a level of
          11 V or 13 V sees no crossing at all, while 12.0 V sees two per cycle.
        </p>
        <Figure caption="A 0 to 3.3 V logic signal at 2 V/div. Left: the level (T) is at 5 V, above the top of the signal, so the scope waits. Right: the level at 1.65 V sits mid-swing and every rising edge triggers. Illustrative screens.">
          <div className="grid grid-cols-2 gap-4">
            <ScopeScreen wave="square" cycles={3} amplitude={0.825} offset={0.825} triggerLevel={2.5} labels={{ left: "Level 5 V", right: "Wait" }} />
            <ScopeScreen wave="square" cycles={3} amplitude={0.825} offset={0.825} triggerLevel={0.825} labels={{ left: "Level 1.65 V", right: "Trig'd" }} />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Most scopes have a shortcut that sets the level to the middle of the signal, often a 50% button or a
          press on the level knob. Use it whenever you change signals; it is the quickest single fix for a scope
          stuck on Wait.
        </p>
      </section>

      <section id="step-probe-ratio">
        <StepHeading n={4}>Match the probe ratio so the level means what you think</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The trigger level is expressed in the same scaled volts as the trace, so a probe ratio mismatch moves the
          real threshold by a factor of ten. With a 10x probe and the channel left on 1x, a 0 to 5 V signal is drawn
          as 0 to 0.5 V. Type in a level of 2.5 V because that is the midpoint of 5 V logic, and the threshold at
          the probe tip is really 25 V, which the circuit never reaches. Flip the mismatch the other way and the
          trigger does fire, but at the very foot of the edge where ringing and noise make it erratic.
        </p>
        <DataTable
          head={["Probe switch", "Channel setting", "0–5 V signal drawn as", "Level typed in", "Real threshold at the tip", "Result"]}
          mono={[4]}
          rows={[
            ["10x", "10x", "0 to 5 V", "2.5 V", "2.5 V", "Triggers mid-edge"],
            ["10x", "1x", "0 to 0.5 V", "2.5 V", "2.5 × 10 = 25 V", "Never triggers"],
            ["1x", "10x", "0 to 50 V", "2.5 V", "2.5 ÷ 10 = 0.25 V", "Triggers low on the edge"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Set the channel&apos;s probe menu to match the switch on the probe body. The full routine is in{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section id="step-type">
        <StepHeading n={5}>Go back to an edge trigger and check pulse conditions</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Scopes remember the last trigger type, so a pulse width, video, runt, slope or pattern trigger set up for
          an earlier job keeps waiting for an event your new signal never produces. A video trigger waits for
          composite sync pulses and ignores a plain clock. A runt trigger fires only on pulses that cross one
          threshold but not the other, so a healthy square wave never qualifies; that is exactly how it should
          behave, as{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" className={link}>
            triggering on a runt pulse
          </Link>{" "}
          explains. Select Edge in the type menu before anything else.
        </p>
        <p className="text-muted leading-7">
          If you do need a pulse width trigger, the condition must bracket a width that actually occurs. A 1 kHz PWM
          signal at 25% duty has a period of 1 ms and a high time of 0.25 × 1 ms = 250 µs. A condition of
          &quot;positive pulse wider than 300 µs&quot; never matches; &quot;wider than 200 µs&quot; matches every
          cycle. The polarity matters too, since a negative pulse width setting measures the low time, 750 µs
          here. Measure the real width with cursors first, using an edge trigger, then set the condition around
          that number.
        </p>
      </section>

      <section id="step-holdoff">
        <StepHeading n={6}>Shorten the holdoff</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Holdoff is the time after each trigger during which the scope refuses to trigger again. Its job is to
          stop a burst of pulses from producing several start points, but set too long, it makes the scope look
          dead. On a 1 kHz signal, a holdoff of 1.5 ms skips every other cycle and the picture is unaffected. A
          holdoff of 2 s means at most one new capture every 2 seconds, so in Normal mode the screen appears to
          freeze. Many scopes allow holdoff values of several seconds, which is easy to reach by spinning the
          multipurpose knob in the wrong menu. Return holdoff to its minimum unless you have a burst signal that
          needs it.
        </p>
        <DataTable
          head={["Holdoff (1 kHz signal)", "Arithmetic", "Captures per second, at most"]}
          mono={[2]}
          rows={[
            ["Minimum (ns range)", "Limited by the scope's update rate", "Every cycle is a candidate"],
            ["1.5 ms", "Next edge after 1.5 ms is at 2 ms", "500 (every second cycle)"],
            ["100 ms", "1 ÷ 0.1 s", "10"],
            ["2 s", "1 ÷ 2 s", "0.5 (looks frozen)"],
          ]}
        />
      </section>

      <section id="step-coupling">
        <StepHeading n={7}>Set the trigger coupling to DC</StepHeading>
        <p className="text-muted leading-7">
          Trigger coupling is separate from the channel&apos;s input coupling and only filters the copy of the signal
          the comparator sees. AC trigger coupling removes the DC level, so a level you set against the displayed
          DC trace no longer lines up with what the trigger receives. LF reject goes further and removes everything
          below a corner frequency that is often in the tens of kilohertz; check your manual for the exact figure.
          Take an illustrative 50 kHz corner and a 20 Hz, 1 V peak-to-peak sine: a first-order filter passes roughly
          20 ÷ 50,000 = 0.0004 of it, about 0.4 mV, far too little to cross any useful level. That is why a slow
          sensor signal or a button press won&apos;t trigger while a fast clock on the same scope triggers fine.
          Use DC trigger coupling as the default, and keep HF reject or noise reject for the drifting and jitter
          problems they were designed for.
        </p>
      </section>

      <section id="step-size">
        <StepHeading n={8}>Make the signal big enough to trigger on</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A digital scope&apos;s trigger works on the digitized trace, so its sensitivity is specified in divisions
          rather than volts. Datasheets commonly quote figures of around half a division to one division, often
          worse near the top of the bandwidth or with noise reject turned on; check your own model. A signal that
          is a sliver on screen gives the comparator nothing to work with. Take 30 mV of switching ripple: at
          500 mV/div it is 0.03 ÷ 0.5 = 0.06 divisions tall, which no trigger will reliably detect, while at
          10 mV/div it spans 3 divisions and triggers cleanly.
        </p>
        <BarChart
          items={[
            { label: "500 mV/div", value: 0.06, display: "0.06 div" },
            { label: "100 mV/div", value: 0.3, display: "0.3 div" },
            { label: "50 mV/div", value: 0.6, display: "0.6 div" },
            { label: "20 mV/div", value: 1.5, display: "1.5 div", highlight: true },
            { label: "10 mV/div", value: 3, display: "3 div", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The chart shows how tall the same 30 mV ripple is at each setting. The highlighted bars clear a typical
          one-division sensitivity with margin; the others sit at or below it. If the ripple rides on a DC rail,
          use AC input coupling or offset to bring it on screen at the small volts/div setting, then trigger on it.
        </p>
      </section>

      <section id="step-external">
        <StepHeading n={9}>Check the external trigger input</StepHeading>
        <p className="text-muted leading-7">
          An EXT trigger input lets a sync or gate signal trigger the scope without using up a channel, but it has
          three common traps. First, the source must be set to EXT; the input is otherwise ignored. Second, its
          level range is usually narrower than a channel&apos;s, often only a few volts either side of zero, and
          some scopes offer an EXT/5 setting to stretch it. A gate signal that swings between 9 V and 12 V needs a
          level near 10.5 V, which may simply be out of reach, so divide it down first or use the EXT/5 setting.
          Third, EXT inputs often need a larger signal than a channel does to trigger, so a 50 mV sync pulse may
          never register. The external input is also not drawn on screen, which makes it hard to see what it is
          receiving; feed the same signal to a spare channel to check it. Some four-channel bench scopes have no
          EXT input at all, so check the panel and the manual for your model.
        </p>
      </section>

      <section id="step-event">
        <StepHeading n={10}>Make sure the qualifying event really happens</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Normal and Single modes wait for a valid trigger and do nothing in the meantime, which is correct
          behavior when the event is rare. The scope can only catch it if it actually occurs after you arm. Common
          misses: pressing Single after the power-up you wanted to capture; a rising slope set to catch a supply
          that collapses, which is a falling edge; or a level set for a glitch that turns out to be smaller than
          you expected. Switch to Auto, look at the signal, set the slope and level against what you see, then
          return to Normal or Single and cause the event again. If you are hunting an intermittent fault, persistence
          and segmented memory help, as described in{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            using persistence to find intermittent glitches
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          When nothing on this list helps, save your setup if you need it, then restore the default setup and probe
          the calibration output. A scope that triggers on its own square wave from defaults is healthy. The full
          trigger walkthrough is in{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          , and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge" className={link}>
            falling-edge triggering
          </Link>{" "}
          covers events that go low.
        </p>
      </section>

      <Callout title="Safety: trigger problems are never a reason to probe mains directly">
        Chasing a trigger on a power circuit tempts people to clip on anywhere. On a bench scope, the probe ground
        clip is bonded to mains earth through the power cord, so clipping it to a mains-referenced point, such as
        the primary side of a non-isolated supply or a triac dimmer, makes a direct short through the probe and the
        scope. To sync to the mains, select the Line trigger source instead. For high-voltage or mains-referenced
        measurements, use a differential probe or isolated-channel scope rated for the voltage and CAT category,
        never defeat the scope&apos;s earth, and leave mains wiring to a licensed electrician if you are unsure.
      </Callout>

      <section>
        <KeyIdea title="In short">
          Press Force Trigger: if a trace appears, only the trigger settings are wrong. Then reset in this order:
          source on the probed channel, type Edge, level at 50% of the swing (1.65 V for 3.3 V logic), probe ratio
          matched, holdoff minimum, trigger coupling DC, and a volts/div that makes the signal several divisions
          tall. A default setup plus the calibration output proves the hardware.
        </KeyIdea>
      </section>

      <section>
        <p className="text-muted leading-7 mb-4">
          Any of these bench scopes has the Force, 50% level, holdoff and trigger coupling controls used above. A
          trigger that won&apos;t fire is a settings problem, not a reason to upgrade, but if you are choosing a
          scope, compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes with full trigger menus"
          items={[
            { name: sds1104.name, image: sds1104.image, alt: "Siglent SDS1104X-E four-channel 100MHz bench oscilloscope", href: "/oscilloscopes/siglent-sds1104x-e-review", note: "Hands-on tested. 100MHz, 4 channels, 1 GSa/s, with a well-regarded UI." },
            { name: ds1054z.name, image: ds1054z.image, alt: "Rigol DS1054Z four-channel 50MHz bench oscilloscope", href: "/oscilloscopes/rigol-ds1054z-review", note: "Hands-on tested. 50MHz, 4 channels, 1 GSa/s and a large 7-inch display." },
            { name: dho804.name, image: dho804.image, alt: "Rigol DHO804 four-channel 12-bit oscilloscope with touchscreen", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e", note: "Hands-on tested. 70MHz, 4 channels, 12-bit, with a 7-inch touchscreen." },
          ]}
        />
      </section>
    </HowToShell>
  );
}
