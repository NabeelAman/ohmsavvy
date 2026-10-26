import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
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
  "How to stop an oscilloscope waveform from drifting: fix the trigger source, level, mode and slope, then try holdoff, noise reject, line trigger or roll mode.";

export const metadata = buildMetadata({
  title: "How to Stop a Scope Waveform from Drifting",
  description,
  path: "/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting",
});

const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

/** A slow, noisy rising edge crossing a trigger level several times, with a noise-reject hysteresis band. */
function NoisyEdgeTrigger() {
  const level = 88;
  const band = 12;
  const pts: { x: number; y: number }[] = [];
  for (let x = 20; x <= 300; x += 2) {
    pts.push({ x, y: 140 - ((x - 20) * 100) / 280 + 7 * Math.sin(x * 0.42) });
  }
  const crossings = pts.filter((p, i) => i > 0 && pts[i - 1].y > level && p.y <= level);
  const firstAboveBand = pts.find((p) => p.y <= level - band);
  return (
    <svg
      viewBox="0 0 320 180"
      className="w-full h-auto"
      role="img"
      aria-label="A slow rising edge with noise on it crossing the trigger level several times, each crossing marked as a possible trigger point, and a shaded noise-reject band that allows only one trigger"
    >
      <rect x="10" y="10" width="300" height="150" rx="4" fill="#0f1a14" />
      <rect x="10" y={level - band} width="300" height={band} fill="#f0b429" opacity="0.15" />
      <line x1="10" y1={level} x2="310" y2={level} stroke="#f0b429" strokeWidth="1" strokeDasharray="5 4" />
      <line x1="10" y1={level - band} x2="310" y2={level - band} stroke="#f0b429" strokeWidth="0.8" strokeDasharray="2 3" />
      <polyline points={pts.map((p) => `${p.x},${p.y.toFixed(1)}`).join(" ")} fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
      {crossings.map((c) => (
        <circle key={c.x} cx={c.x} cy={level} r="4" fill="none" stroke="#ffd56b" strokeWidth="1.4" />
      ))}
      {firstAboveBand && <circle cx={firstAboveBand.x} cy={level - band} r="4" fill="#ffd56b" />}
      <text x="16" y={level + 14} fontSize="10" fill="#f0b429">trigger level</text>
      <text x="16" y={level - band - 5} fontSize="10" fill="#f0b429">noise reject band</text>
      <text x="16" y="26" fontSize="10" fill="#ffd56b">○ possible triggers without noise reject</text>
      <text x="16" y="40" fontSize="10" fill="#ffd56b">● single trigger with it</text>
      <text x="160" y="176" fontSize="10" textAnchor="middle" className="fill-muted">
        Each extra crossing starts the sweep at a slightly different time
      </text>
    </svg>
  );
}

export default function HowToStopAnOscilloscopeWaveformFromDriftingPage() {
  return (
    <HowToShell
      title="How to Stop an Oscilloscope Waveform from Drifting"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-stop-an-oscilloscope-waveform-from-drifting"
      category="oscilloscopes"
      intro={
        <>
          To stop an oscilloscope waveform from drifting sideways, make the trigger find the same point on
          every capture: set the trigger source to the channel you are probing, move the level inside the
          signal, and switch from Auto to Normal mode if the scope keeps free-running. If the trace still
          jitters, holdoff, noise reject or the line trigger usually finish the job. A slow scroll at long
          timebases is roll mode, which is expected, and a few signals drift because their frequency really
          is changing.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is one of the scopes in our reviews,
            noted for a well-regarded UI. Trigger menus differ between brands but offer the same core
            settings. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "drift-is-a-trigger-problem", label: "Why sideways drift is a trigger problem" },
        { id: "trigger-source", label: "Trigger source on the wrong channel" },
        { id: "trigger-level", label: "Level outside the signal" },
        { id: "auto-vs-normal", label: "Auto vs Normal mode" },
        { id: "slope", label: "Slope and either-edge triggering" },
        { id: "holdoff", label: "Holdoff for complex signals" },
        { id: "noise-reject", label: "Noise reject and HF reject" },
        { id: "line-trigger", label: "Line trigger for mains-related signals" },
        { id: "roll-mode", label: "Roll mode on slow timebases" },
        { id: "real-frequency-change", label: "When the frequency really varies" },
        { id: "quick-fix-table", label: "Quick fix table" },
        { id: "which-scope", label: "Scopes in our reviews" },
      ]}
      faq={[
        {
          q: "Why does my oscilloscope waveform keep moving left and right?",
          a: "Each capture is starting at a different point in the signal, so the sweeps land in different places. Usually the trigger has not locked: the source is on the wrong channel, the level is outside the signal, or Auto mode is free-running. Fix those three in that order.",
        },
        {
          q: "What does the Trig'd or Auto indicator on the screen mean?",
          a: "It shows whether the scope found a valid trigger. Trig'd means captures are aligned on the trigger event. Auto, or a flashing status, means nothing met the conditions in time and the scope captured anyway, so the trace drifts. Wait in Normal mode means it is still looking.",
        },
        {
          q: "Why is my waveform stable at fast timebases but scrolling at slow ones?",
          a: "Most digital scopes switch into roll mode once the timebase is slow enough, drawing data as it arrives and scrolling it like a chart recorder. That is expected, not a trigger fault. Turn roll mode off, pick a faster timebase, or use Single to freeze a capture.",
        },
        {
          q: "Does HF reject change the waveform I see?",
          a: "No. HF reject, LF reject and noise reject only filter the copy of the signal feeding the trigger circuit. The displayed trace keeps its full bandwidth and noise, so they are safe to try: if the trace locks, you fixed the trigger without hiding anything.",
        },
        {
          q: "Can I just press Auto or AutoSet to stop the drift?",
          a: "Often, yes. AutoSet picks a source, level and timebase for the strongest signal it finds, which locks simple waveforms. On complex or multi-channel signals it can pick the wrong channel or edge, and it may reset other settings, so learn the manual fixes too.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "The full walkthrough of source, level, slope, mode and holdoff, from a blank screen.",
        },
        {
          href: "/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically",
          title: "Why Does an Oscilloscope Waveform Shift Vertically?",
          desc: "Up-and-down movement: position, coupling, probe ratio and ground, not the trigger.",
        },
      ]}
    >
      <Callout title="Safety: use the line trigger, not a probe on the mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            To sync to the mains, select the Line trigger source. Never clip a standard probe onto mains wiring for a trigger.
          </li>
          <li>
            A bench scope&apos;s probe ground clips connect to mains earth. Only clip them to a point at earth
            potential; for non-isolated circuits use a rated differential probe or an isolation transformer.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="drift-is-a-trigger-problem" className="text-xl font-semibold mb-3">Why sideways drift is a trigger problem</h2>
        <p className="text-muted leading-7 mb-4">
          A digital scope redraws the signal capture after capture, and the trigger decides where each capture is aligned. When it locks, every sweep starts at the same point in the cycle and the waveform holds still. When it doesn&apos;t, the trace slides, rolls or blurs into overlapping copies.
        </p>
        <Figure
          caption={
            <>
              Left: an untriggered sine, with two successive sweeps (green and blue) starting at different
              points in the cycle, so the trace appears to slide. Right: the same sine triggered on a rising
              crossing of the dashed level; every sweep overlays the last.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.5}
              second={{ wave: "sine", cycles: 2, amplitude: 2.5, shift: 1.4, label: "next sweep" }}
              labels={{ left: "Auto, not triggered", right: "1 ms/div" }}
            />
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.5}
              triggerLevel={0}
              labels={{ left: "Trig'd, rising edge", right: "1 ms/div" }}
            />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          This page is about horizontal movement. If the trace moves up and down instead, the cause is on
          the vertical side: see{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically" className={link}>
            why a waveform shifts vertically
          </Link>
          . For trigger basics from scratch, start with{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="trigger-source">The trigger source is on the wrong channel</StepHeading>
        <p className="text-muted leading-7">
          The trigger watches one input. If your probe is on CH2 and the source is still CH1, the scope is
          waiting for an event on a channel with nothing connected, and in Auto mode it free-runs. Check the
          source readout, usually in a corner of the screen, and set it to the channel you are looking at.
          With two related signals, trigger on the cleaner, more regular one.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="trigger-level">The trigger level sits outside the signal</StepHeading>
        <p className="text-muted leading-7">
          The level must be a voltage the waveform passes through. Change V/div, offset or coupling, or probe a smaller signal, and the old level can end up above the peaks or below the troughs. Move it to roughly mid-height, where edges are steepest; many scopes have a 50% function for this.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="auto-vs-normal">Auto vs Normal mode</StepHeading>
        <p className="text-muted leading-7">
          In Auto mode the scope captures anyway if no trigger arrives within a short timeout, which disguises a bad trigger as a drifting picture. Normal mode only redraws on a valid trigger. If the trace freezes or vanishes in Normal, the source or level is wrong; if it holds steady, the lock is real. Very slow signals can also drift in Auto because the timeout is shorter than their period.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="slope">Slope and either-edge triggering</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Rising or falling slope both lock a simple wave. Trouble starts with the either-edge (or both) setting: some sweeps align on rising edges and some on falling ones, so a square wave shows two copies half a cycle apart. Choose a single direction, as described in{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge" className={link}>
            triggering on a falling edge
          </Link>
          .
        </p>
        <Figure caption={<>Either-edge triggering on a square wave: sweeps aligned on rising edges (green) overlap sweeps aligned on falling edges (blue), shifted by half a cycle. A single slope gives one clean trace.</>}>
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={2}
            second={{ wave: "square", cycles: 2, amplitude: 2, shift: 2.5 }}
            labels={{ left: "Slope: either", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="holdoff">Holdoff for complex signals</StepHeading>
        <p className="text-muted leading-7">
          Bursts of pulses, serial data frames and a motor&apos;s commutation pattern all cross the level
          several times per repeat. An edge trigger may lock on a different crossing each time, so the
          picture jumps between two or three positions. Holdoff makes the scope ignore new triggers for a
          set time after each accepted one. Set it a little longer than the burst and shorter than the full
          repeat, and every sweep starts on the burst&apos;s first edge.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="noise-reject">Noise reject and HF reject</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Noise on a slow edge can cross the level several times in a row. Each crossing is a valid trigger, so the trace jitters left and right. The trigger coupling menu offers filters that act only on the trigger path:
        </p>
        <Figure caption={<>Noise on a slow edge produces several level crossings (open circles). Noise reject adds hysteresis, so the signal must climb through the whole band before the trigger fires once (filled circle).</>}>
          <NoisyEdgeTrigger />
        </Figure>
        <div className="mt-5">
          <InfoCards
            items={[
              { label: "Noise reject", desc: "Adds hysteresis or lowers trigger sensitivity, so small wiggles near the level are ignored." },
              { label: "HF reject", desc: "Low-pass filters the trigger signal. Good for low-frequency signals with fast noise on them." },
              { label: "LF reject", desc: "High-pass filters the trigger signal, removing slow hum or baseline wander that moves the crossing." },
              
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Filter cutoffs vary by model, so check the manual. If noise is the main problem rather than a side
          effect, see{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            measuring the noise floor
          </Link>{" "}
          to judge how much is the scope and how much is the circuit.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="line-trigger">Line trigger for mains-related signals</StepHeading>
        <p className="text-muted leading-7">
          Hum on an audio output, ripple from a linear supply and a lamp dimmer&apos;s chopped waveform are all locked to the mains. Select Line as the trigger source and the scope triggers from its own power input at 50 or 60 Hz, so those features stand still. It doubles as a test: a disturbance that freezes under the line trigger comes from the mains.
        </p>
      </section>

      <section>
        <h2 id="roll-mode" className="text-xl font-semibold mb-3">Roll mode on slow timebases</h2>
        <p className="text-muted leading-7">
          At slow timebases, typically from tens to hundreds of milliseconds per division depending on the model, many scopes switch to roll mode. They draw samples as they arrive and scroll the trace from right to left, and the trigger has no effect on it. For a still picture, press Run/Stop or Single, turn roll mode off, or use a faster timebase.
        </p>
      </section>

      <section>
        <h2 id="real-frequency-change" className="text-xl font-semibold mb-3">When the signal&apos;s frequency really varies</h2>
        <p className="text-muted leading-7 mb-4">
          A free-running RC oscillator, a VCO or a motor speeding up changes period from cycle to cycle. The trigger still locks the edge at the trigger point, but later edges land in different places, so the trace smears further from that point. No setting stops this; the scope is showing the truth.
        </p>
        <Figure caption={<>Two sweeps of a signal whose frequency changes slightly between them. Both are triggered at the left edge, where they agree; by the right side the cycles have spread apart.</>}>
          <ScopeScreen
            wave="sine"
            cycles={3}
            amplitude={2.5}
            second={{ wave: "sine", cycles: 3.4, amplitude: 2.5 }}
            labels={{ left: "Trig'd, frequency changing", right: "1 ms/div" }}
          />
        </Figure>
        <KeyIdea title="Prove it is the signal">
          Watch the scope&apos;s frequency readout. If it wanders while the trigger shows a solid lock, the drift is in the circuit.{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            Persistence display
          </Link>{" "}
          is a good way to see how far the edges spread.
        </KeyIdea>
      </section>

      <section>
        <h2 id="quick-fix-table" className="text-xl font-semibold mb-3">Quick fix table: how to stop an oscilloscope waveform from drifting</h2>
        <Figure caption={<>Check in this order. Most drifting traces are fixed by the first three steps.</>}>
          <FlowDiagram
            steps={[
              { label: "Source", sub: "Same channel as the probe" },
              { label: "Level", sub: "Mid-height of the signal" },
              { label: "Mode", sub: "Normal to confirm a lock" },
              { label: "Slope / holdoff", sub: "One edge, one start point" },
              { label: "Filters / line", sub: "Noise reject, HF reject, Line" },
            ]}
          />
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["What you see", "Likely cause", "Fix"]}
            rows={[
              ["Trace slides steadily sideways", "Source on another channel, or level outside the signal", "Set source and center the level"],
              
              
              ["Jumps between a few positions", "Complex signal, several crossings per repeat", "Increase holdoff"],
              ["Fine sideways jitter", "Noise near the trigger level", "Noise reject or HF reject"],
              ["Hum or ripple won't hold still", "Signal locked to mains", "Line trigger source"],
              ["Continuous right-to-left scroll", "Roll mode at a slow timebase", "Single, Stop, or roll mode off"],
              ["Edges smear further from the trigger", "Frequency really varies", "Measure it; use persistence"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Scopes in our reviews</h2>
        <p className="text-muted leading-7 mb-4">
          Like any bench scope, each one below has the edge-trigger source, level, slope and Auto/Normal
          controls this page relies on, so a drifting trace on any of them is a settings problem, not a
          reason to upgrade. Where they differ
          is channel count, bandwidth and screen, which matter more for the signals you probe than for
          trigger stability. Compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes for stable triggering"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "Hands-on tested. 100MHz, 4 channels, 1 GSa/s, with a well-regarded user interface.",
            },
            {
              name: "Rigol DHO804",
              image: dho804.image,
              alt: "Rigol DHO804 four-channel 12-bit oscilloscope with touchscreen",
              href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
              note: "Hands-on tested. 70MHz, 4 channels, 12-bit, and a 7-inch touchscreen for quick menu changes.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "Hands-on tested. 50MHz, 4 channels, 1 GSa/s, with strong community documentation.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
