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
  "How to use oscilloscope persistence to find intermittent glitches: infinite vs variable modes, colour grading, and glitch or runt triggers to isolate them.";

export const metadata = buildMetadata({
  title: "How to Use Oscilloscope Persistence for Glitches",
  description,
  path: "/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

// Small, fixed edge-timing offsets (px) so the overlaid sweeps look like a real persistence pile-up.
const JITTER = [0, -2, 1.5, -1, 2.5, -2.5, 1, -0.5, 3, -1.5, 0.5, 2];

function squarePath(j: number) {
  return `M0 150 H${40 + j} V50 H${90 + j} V150 H${140 + j} V50 H${190 + j} V150 H${240 + j} V50 H${290 + j} V150 H300`;
}

/** Infinite persistence with colour grading: many normal sweeps pile into a bright band; one runt stands out. */
function PersistenceScreen() {
  return (
    <svg
      viewBox="-6 -6 312 252"
      className="w-full h-auto"
      role="img"
      aria-label="Oscilloscope screen with infinite persistence: many overlaid square wave sweeps form a bright band, and one rare runt pulse appears as a faint blue outlier"
    >
      <defs>
        <linearGradient id="persist-grade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5BB3E8" />
          <stop offset="0.4" stopColor="#7CFC9A" />
          <stop offset="0.75" stopColor="#ffd56b" />
          <stop offset="1" stopColor="#ff7a59" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="300" height="240" rx="4" className="fill-[#0f1a14]" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="200" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 25} x2="300" y2={i * 25} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {/* the frequent, normal sweeps: hot colour where they pile up */}
      {JITTER.map((j) => (
        <path key={j} d={squarePath(j)} fill="none" stroke="#ffd56b" strokeOpacity="0.28" strokeWidth="2" />
      ))}
      <path d={squarePath(0)} fill="none" stroke="#ff7a59" strokeOpacity="0.55" strokeWidth="1.2" />
      {/* one rare sweep containing a runt */}
      <path
        d="M0 150 H40 V50 H90 V150 H140 V50 H190 V150 H205 L208 104 H219 L222 150 H240 V50 H290 V150 H300"
        fill="none"
        stroke="#5BB3E8"
        strokeWidth="1.4"
      />
      <circle cx="213" cy="104" r="13" fill="none" stroke="#5BB3E8" strokeWidth="1" strokeDasharray="3 2" />
      <text x="213" y="84" fontSize="10" textAnchor="middle" fill="#5BB3E8">rare runt</text>
      <text x="65" y="44" fontSize="10" textAnchor="middle" fill="#ffd56b">normal sweeps</text>
      {/* colour-grade legend */}
      <rect x="60" y="214" width="180" height="8" rx="2" fill="url(#persist-grade)" />
      <text x="54" y="221" fontSize="9" textAnchor="end" fill="#9fe3b4">rare</text>
      <text x="246" y="221" fontSize="9" fill="#9fe3b4">frequent</text>
      <text x="150" y="236" fontSize="9" textAnchor="middle" fill="#9fe3b4">infinite persistence, colour graded</text>
    </svg>
  );
}

export default function HowToUseOscilloscopePersistenceToFindIntermittentGlitchesPage() {
  return (
    <HowToShell
      title="How to Use Oscilloscope Persistence to Find Intermittent Glitches"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches"
      category="oscilloscopes"
      intro={
        <>
          To use oscilloscope persistence to find intermittent glitches, trigger on the signal&apos;s normal
          edge, switch the display to infinite persistence and leave the scope running. Every sweep stays on
          screen, so thousands of good cycles stack into one bright trace while a rare glitch leaves a faint
          line that does not belong. Once you know what the outlier looks like, switch to a glitch or runt
          trigger with single capture to freeze it on its own.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s) is our best overall beginner scope. Persistence
            and advanced trigger options vary by model, so check your manual; see our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-persistence-is", label: "What persistence is" },
        { id: "colour-grading", label: "Colour grading and intensity" },
        { id: "trigger-on-the-normal-edge", label: "Trigger on the normal edge" },
        { id: "turn-on-infinite-persistence", label: "Turn on infinite persistence" },
        { id: "leave-it-running", label: "Leave it running" },
        { id: "read-the-outliers", label: "Read the outliers" },
        { id: "isolate-with-a-glitch-trigger", label: "Isolate it with a glitch or runt trigger" },
        { id: "segmented-memory", label: "Add segmented memory" },
        { id: "persistence-limits", label: "What persistence cannot tell you" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "What is the difference between variable and infinite persistence?",
          a: "Variable persistence keeps each sweep on screen for a set time, such as one second, then lets it fade, so the display shows recent behaviour. Infinite persistence never fades: every sweep since you last cleared the display stays visible. Use variable persistence to watch jitter or drift in real time, and infinite persistence to hunt for a rare event over a long run.",
        },
        {
          q: "How long should I leave persistence running to find a glitch?",
          a: "As long as it takes the fault to happen several times. If the glitch shows up once a minute, a few minutes may do; if it is tied to a motor starting or a temperature change, run it through those conditions. A scope only captures part of the time between sweeps, so a very rare, very short event may need a long run.",
        },
        {
          q: "Why does my persistence display clear by itself?",
          a: "Most scopes erase the persistence buffer whenever you change a setting that alters the picture, such as V/div, time/div, trigger level or position. Some also clear it when you stop and restart acquisition. Set everything up first, then clear the display once and leave the controls alone while it collects.",
        },
        {
          q: "Is persistence the same as a digital phosphor display?",
          a: "They aim at the same thing. Digital phosphor is a marketing term some manufacturers use for a display that stacks many captures and shows how often each pixel was hit, mimicking the glow of an analogue tube. Persistence with colour grading or intensity grading on other digital scopes works on the same principle, though update rates differ between models.",
        },
        {
          q: "Can persistence find a glitch on a slow timebase?",
          a: "Only if the glitch is wide enough to be sampled. At slow time/div settings the scope's sample rate drops, and a glitch narrower than the gap between samples can vanish entirely or appear at the wrong height. Keep the timebase as fast as the view allows, or use a glitch trigger, which works from the trigger circuit rather than the stored samples.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge triggers, levels, holdoff and the Normal and Single modes you need to isolate a glitch.",
        },
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why Does an Oscilloscope Waveform Look Noisy?",
          desc: "Rule out probe and grounding noise before you blame the circuit for a fuzzy persistence band.",
        },
      ]}
    >
      <Callout title="Hunting glitches safely">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Long glitch hunts mean leaving probes attached for a long time. Clip the ground lead only to
            circuit ground and secure the probe so it cannot slip and short neighbouring pins.
          </li>
          <li>
            Glitches on mains-powered equipment are often caused by switching on the primary side. Do not
            probe there with a ground-referenced scope; use an isolation transformer on the device or a
            rated differential probe.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-persistence-is" className="text-xl font-semibold mb-3">What oscilloscope persistence is</h2>
        <p className="text-muted leading-7 mb-4">
          Normally a digital scope draws a sweep, wipes it and draws the next. A one-in-ten-thousand glitch
          is on screen for a single refresh, far too briefly to notice. Persistence changes the rule: old
          sweeps are kept and new ones are drawn on top, so anything that ever happened at a point on the
          screen leaves a mark there.
        </p>
        <InfoCards
          items={[
            { label: "Off", desc: "Each sweep replaces the last. Best for normal measurements." },
            { label: "Variable", desc: "Sweeps fade after a time you set. Shows jitter and recent drift." },
            { label: "Infinite", desc: "Nothing fades until you clear it. The tool for rare events." },
            { label: "Colour grading", desc: "Colour shows how often a pixel was hit: cool for rare, hot for frequent." },
            { label: "Intensity grading", desc: "Same idea using brightness: rare events are dim, common ones bright." },
            { label: "Clear", desc: "Wipes the stored sweeps. Press it once your setup is final." },
          ]}
        />
      </section>

      <section>
        <h2 id="colour-grading" className="text-xl font-semibold mb-3">Colour grading and intensity: reading the heat map</h2>
        <p className="text-muted leading-7 mb-4">
          With grading on, the display becomes a histogram drawn on the graticule. The path the signal takes
          on almost every cycle turns the hottest colour or brightest shade. Edges that wander slightly in
          time widen into a band. A glitch that happened once sits outside that band in the coolest colour,
          which is exactly what makes it easy to spot against a busy trace.
        </p>
        <Figure caption={<>Illustration of an infinite-persistence display. The normal sweeps pile up into a hot band with slightly smeared edges; the single sweep that contained a runt pulse shows as a faint, cool-coloured outlier.</>}>
          <PersistenceScreen />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="trigger-on-the-normal-edge">Trigger on the signal&apos;s normal edge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start with a plain, stable picture. Use an edge trigger on the signal you suspect, the slope that
          matches its regular transitions, and the level near mid-swing. Set V/div so the signal fills most
          of the screen and time/div so a few cycles are visible. Without persistence it should look clean;
          that is the point, since the fault is rare. Normal trigger mode is better than Auto here, because
          Auto&apos;s untriggered sweeps would paint random traces into the persistence buffer.
        </p>
        <Figure caption={<>The live view before persistence is switched on: the occasional glitch is on screen too briefly to see.</>}>
          <ScopeScreen wave="square" cycles={3} amplitude={2} triggerLevel={0} labels={{ left: "CH1 1 V/div", right: "Normal, rising edge" }} />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="turn-on-infinite-persistence">Turn on infinite persistence</StepHeading>
        <p className="text-muted leading-7">
          Persistence normally lives in the Display menu. Set it to Infinite, turn on colour or intensity
          grading if your scope offers it, then press Clear so you start from an empty buffer. From here on,
          avoid touching V/div, time/div or the trigger: on most scopes any of those clears the stored
          sweeps and you start again.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="leave-it-running">Leave it running through the fault conditions</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Now wait, and make the circuit work. If the fault appears when a relay clicks, a motor starts or
          the board warms up, put it through those conditions while the scope collects. No scope captures
          continuously: between sweeps there is dead time while it processes and draws, so every model
          misses some events. That is why rare glitches need a long run.
        </p>
        <KeyIdea title="Zoom in on where faults happen">
          If you suspect one particular edge, use a faster time/div centred on it: more samples land on
          the glitch, at the cost of missing faults elsewhere in the cycle.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="read-the-outliers">Read the outliers</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When you come back, look for anything outside the main band. Its shape usually points to a cause:
        </p>
        <DataTable
          head={["What persistence shows", "Likely name", "Common causes"]}
          rows={[
            ["Faint pulse that starts but never reaches the full level", "Runt", "Bus contention, marginal drive, a slow supply rail"],
            ["Thin extra spike between normal edges", "Glitch", "Crosstalk, ground bounce, a logic race"],
            ["Edges smeared into a wide band", "Jitter", "Noisy clock source, power supply noise, unstable PLL"],
            ["Overshoot and ringing after some edges only", "Ringing", "Long traces or wires, poor termination, load changes"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>A clean edge for reference: the band stays tight and square.</>}>
            <ScopeScreen wave="square" cycles={1} amplitude={2} labels={{ left: "200 ns/div", right: "reference" }} />
          </Figure>
          <Figure caption={<>Ringing after the edges is easy to spot once persistence has stacked a few hundred sweeps.</>}>
            <ScopeScreen wave="square-ring" cycles={1} amplitude={2} labels={{ left: "200 ns/div", right: "ringing" }} />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="isolate-with-a-glitch-trigger">Isolate it with a glitch or runt trigger and single capture</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Persistence tells you that something odd happens and roughly what it looks like. To measure it, you
          need it alone on screen. Turn persistence off and choose a trigger that fires only on the fault:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Glitch or pulse-width trigger:</strong> fire on pulses
            narrower than the shortest legitimate pulse. Set the limit a little below the normal width.
          </li>
          <li>
            <strong className="text-foreground">Runt trigger:</strong> set two levels and fire on a pulse
            that crosses the first but never reaches the second.
          </li>
        </ul>
        <p className="text-muted leading-7 mb-4">
          Put the scope in Single, arm it and wait. When it fires, the frozen capture contains the fault at
          the trigger point, ready for cursors. Names and options differ between models, and our{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            guide to triggering an oscilloscope
          </Link>{" "}
          covers the basics of Normal and Single mode that this relies on.
        </p>
        <Figure caption={<>The full glitch-hunting workflow: persistence to discover, a dedicated trigger to capture.</>}>
          <FlowDiagram
            steps={[
              { label: "Edge trigger", sub: "Stable view, Normal mode" },
              { label: "Infinite persistence", sub: "Clear, then hands off" },
              { label: "Run the fault", sub: "Minutes to hours" },
              { label: "Spot the outlier", sub: "Runt, glitch, jitter" },
              { label: "Glitch / runt trigger", sub: "Single capture, measure" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="segmented-memory" className="text-xl font-semibold mb-3">Combine it with segmented memory</h2>
        <p className="text-muted leading-7">
          Some scopes can split their acquisition memory into many short segments and store one triggered
          capture in each, with a timestamp. Pair that with the glitch trigger and the scope collects
          dozens or hundreds of occurrences instead of just one. Step through them to compare shapes, and read the
          timestamps: a regular interval often points at a timer, a switching regulator or a periodic
          firmware task. Not every scope has segmented memory, and segment counts depend on the model and
          memory settings, so check the datasheet.
        </p>
      </section>

      <section>
        <h2 id="persistence-limits" className="text-xl font-semibold mb-3">What persistence cannot tell you</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>When the glitch happened, or how often in absolute terms. Grading shows relative frequency only.</li>
          <li>Accurate measurements of the glitch itself. Measure the single capture instead.</li>
          <li>
            Whether the fuzz is real. A thick band can be probe pickup from a long ground lead; see{" "}
            <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
              why an oscilloscope waveform looks noisy
            </Link>{" "}
            before blaming the circuit.
          </li>
          <li>
            Events faster than the scope can resolve. A glitch shorter than the scope&apos;s rise time is
            smoothed and shrunk; see{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
              what oscilloscope bandwidth means
            </Link>
            .
          </li>
        </ul>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope you need for glitch hunting</h2>
        <p className="text-muted leading-7 mb-6">
          Glitches are short by nature, so bandwidth and sample rate matter more here than for steady
          signals, and channel count helps when you want to watch the glitch alongside the event that
          causes it. Check a model&apos;s manual for persistence modes, trigger types and segmented memory
          before you buy; the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup compares the scopes we cover.
        </p>
        <ProductStrip
          title="Four-channel scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s, strong community support and documentation.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, for projects that will get more demanding.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
