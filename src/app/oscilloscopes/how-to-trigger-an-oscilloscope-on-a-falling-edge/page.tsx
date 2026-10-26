import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to trigger an oscilloscope on a falling edge: catch active-low lines, UART start bits and supply shutdowns with the right slope, level, mode and holdoff.";

export const metadata = buildMetadata({
  title: "How to Trigger an Oscilloscope on a Falling Edge",
  description,
  path: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

// Supply rail collapsing at shutdown, drawn so the falling crossing of the
// trigger level lands exactly on the center graticule line (x = 150).
const railPoints = Array.from({ length: 151 }, (_, i) => {
  const x = i * 2;
  const y = x < 137.5 ? 40 : 130 - 90 * Math.exp(-(x - 137.5) / 35);
  return `${x},${y.toFixed(1)}`;
}).join(" ");

export default function TriggerOnFallingEdgePage() {
  return (
    <HowToShell
      title="How to Trigger an Oscilloscope on a Falling Edge"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge"
      category="oscilloscopes"
      intro={
        <>
          Knowing how to trigger an oscilloscope on a falling edge matters whenever the interesting
          moment in a circuit is a line dropping rather than rising: a chip-select going active, a
          reset being asserted, a MOSFET switching off or a supply collapsing as the power is cut.
          Set the slope to falling and the scope lines every capture up on that high-to-low
          transition. This guide covers where to put the level, how to see what happened before
          the edge, and how to hold a one-off drop on screen.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital bench oscilloscope, front view",
        caption: (
          <>
            Slope selection sits in the trigger menu on most bench scopes, including the 50MHz,
            four-channel Rigol DS1054Z in our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "when-falling-edge", label: "When a falling edge is the event" },
        { id: "rising-vs-falling", label: "Rising vs falling on the same signal" },
        { id: "set-slope", label: "Set the slope to falling" },
        { id: "place-level", label: "Place the trigger level" },
        { id: "pre-trigger", label: "Look before the edge" },
        { id: "single-normal", label: "Single or Normal mode" },
        { id: "holdoff-start-bit", label: "Holdoff for serial frames" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "Does the falling-edge level need to be at exactly 50%?",
          a: "No. Mid-swing is a sensible default because the edge is steep there and noise moves the crossing time least, but you can put the level anywhere the signal genuinely passes through on its way down. For a supply rail you may want it just below the normal voltage to catch the very start of a sag, or near a brownout threshold to see when the rail reaches it.",
        },
        {
          q: "Why does my falling-edge trigger lock on the wrong edge of a serial byte?",
          a: "A byte of data contains several high-to-low transitions, and an edge trigger accepts any of them. Raise holdoff until it is a little longer than one complete frame so the scope ignores the data bits and re-arms during the idle time, which leaves the start bit as the first falling edge it sees.",
        },
        {
          q: "Can I trigger on a falling edge on CH1 and watch other channels?",
          a: "Yes, and it is one of the most useful setups. Put the active-low control line, such as a chip-select or reset, on the trigger channel and the related clock, data or supply on the others. Every channel is shown relative to the moment that control line dropped.",
        },
        {
          q: "What does an either-edge or alternating slope setting do?",
          a: "Some scopes offer a setting that triggers on both rising and falling crossings. It can help when you only want to know that a line changed, but because consecutive captures can align on opposite edges, the picture may look like two overlapping traces. For studying one specific drop, choose falling only.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "The full trigger basics: source, level, Auto, Normal and Single modes, and holdoff.",
        },
        {
          href: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors",
          title: "How to Measure Rise Time With Cursors",
          desc: "Once a transition is locked in place, time it with cursors; the same method works for fall time.",
        },
      ]}
    >
      <section>
        <h2 id="when-falling-edge" className="text-xl font-semibold mb-3">When a falling edge is the event you care about</h2>
        <p className="text-muted leading-7 mb-4">
          Plenty of signals sit high when idle and announce something by going low. If you trigger
          on the rising edge instead, the scope still locks, but the moment you wanted to study ends
          up somewhere off to the side, or off screen entirely on a fast timebase. These are the
          usual reasons to switch the slope. If you are new to triggers in general, start with{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          and come back here.
        </p>
        <DataTable
          head={["Signal", "Idle state", "What the falling edge means"]}
          rows={[
            ["SPI chip-select (CS)", "High", "The controller has selected the device and a transfer is starting"],
            ["Reset line (active-low)", "High", "The chip is being held in reset; the drop is the start of the reset pulse"],
            ["Interrupt request (open-drain)", "High via pull-up", "A peripheral is asking for attention"],
            ["UART TX/RX", "High", "The start bit of a new character"],
            ["MOSFET or relay drive", "High while on", "The switch is being turned off; watch for the inductive kick that follows"],
            ["Supply rail at shutdown", "At nominal voltage", "The rail starting to collapse once input power is removed"],
          ]}
        />
      </section>

      <section>
        <h2 id="rising-vs-falling" className="text-xl font-semibold mb-3">Rising vs falling on the same signal</h2>
        <p className="text-muted leading-7 mb-4">
          On a plain square wave either slope gives a stable trace; changing it simply swaps which
          transition sits on the center line. The two screens below show the same 5-division-period
          wave with the level (T) at 0 V. Notice that nothing about the signal changed, only where
          the scope anchors each capture.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Slope set to rising: the low-to-high transition lands at the center graticule line.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} triggerLevel={0} labels={{ left: "Rising", right: "500 µs/div" }} />
          </Figure>
          <Figure caption={<>Slope set to falling: the high-to-low transition now sits at the center instead.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} shift={2.5} triggerLevel={0} labels={{ left: "Falling", right: "500 µs/div" }} />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={1} id="set-slope">Set the source and change the slope to falling</StepHeading>
        <p className="text-muted leading-7">
          Open the trigger menu, confirm the type is Edge and the source is the channel carrying the
          active-low line, then change the slope from rising to falling. Scopes show this as a
          downward arrow or a small falling-step icon, and many repeat it in the status bar beside
          the trigger level readout, which makes it easy to confirm at a glance. If you trigger on
          one line and view others, the slope applies only to the trigger source; the remaining
          channels are simply displayed relative to that moment.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="place-level">Place the level where the signal actually falls through</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For logic, roughly half the supply is a safe choice: about 1.65 V on a 3.3 V line or 2.5 V
          on a 5 V line. That keeps the crossing on the steep part of the edge and away from any
          ringing at the top. A narrow active-low pulse, like the chip-select below, only spends a
          short time low, so a level that sits too close to the high state can be fooled by noise
          on the idle line, while one too close to ground may miss a pulse that never gets all the
          way down.
        </p>
        <Figure
          caption={
            <>
              An active-low chip-select, high for most of the period and low for 1 division. With the
              slope on falling and the level at mid-swing, the start of each select pulse sits at the
              screen center.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={2}
            amplitude={-2}
            triggerLevel={0}
            marks={[{ x1: 5, y1: 6.6, x2: 6, y2: 6.6, text: "CS low" }]}
            labels={{ left: "CH1 1 V/div", right: "10 µs/div" }}
          />
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Supply rails are different. To catch the instant a 12 V rail starts sagging, place the level
          slightly below its normal value; to see when it crosses a brownout or undervoltage
          threshold, put the level at that threshold voltage instead.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="pre-trigger">Use the trigger point to look before the edge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A digital scope keeps recording while it waits, so the trigger point does not have to be
          the left edge of the screen. By default many models put it at the horizontal center, which
          gives you equal time before and after the drop. Turn the horizontal position (sometimes
          called delay) to slide it: move the trigger point right to see more of what led up to the
          edge, or left to see more of the aftermath. That pre-trigger view is often the whole
          point, for example checking whether a rail dipped before a reset was asserted.
        </p>
        <Figure
          caption={
            <>
              A supply rail collapsing after power is removed. The falling crossing of the trigger
              level is pinned to the center line, so the left half shows the steady rail before the
              event and the right half shows the decay.
            </>
          }
        >
          <svg viewBox="0 0 300 170" className="w-full h-auto" role="img" aria-label="Diagram of a supply rail collapsing with the falling-edge trigger point at the screen center, splitting pre-trigger and post-trigger time">
            <rect x="0" y="10" width="300" height="140" rx="4" className="fill-[#0f1a14]" />
            <line x1="150" y1="10" x2="150" y2="150" stroke="#2c4a3a" strokeWidth="1.2" />
            <line x1="0" y1="130" x2="300" y2="130" stroke="#2c4a3a" strokeWidth="1" />
            <line x1="0" y1="67" x2="300" y2="67" stroke="#f0b429" strokeWidth="0.8" strokeDasharray="5 4" />
            <text x="294" y="63" fontSize="10" textAnchor="end" fill="#f0b429">T</text>
            <polyline points={railPoints} fill="none" stroke="#7CFC9A" strokeWidth="2" />
            <circle cx="150" cy="67" r="3.5" fill="#ffd56b" />
            <text x="72" y="30" fontSize="9" textAnchor="middle" fill="#9fe3b4">pre-trigger: rail steady</text>
            <text x="228" y="100" fontSize="9" textAnchor="middle" fill="#9fe3b4">post-trigger: decay</text>
            <text x="6" y="144" fontSize="9" fill="#9fe3b4">0 V</text>
            <text x="150" y="164" fontSize="9" textAnchor="middle" className="fill-muted">trigger point (falling crossing of T)</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="single-normal">Use Single for one-off drops, Normal for repeating ones</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A shutdown or a reset happens once, so Auto mode is the wrong tool: it will keep drawing
          untriggered sweeps and overwrite the event a moment later. Press Single, then cut the power
          or press the reset button. The scope arms, catches the first qualifying high-to-low
          crossing and freezes. For a chip-select that toggles every few milliseconds, Normal mode
          is better, since it refreshes only on valid falling edges and holds the last capture
          between bursts.
        </p>
        <Figure caption={<>A practical order for catching a one-time falling event.</>}>
          <FlowDiagram
            steps={[
              { label: "Find it in Auto", sub: "Check the idle-high level and scale" },
              { label: "Falling slope", sub: "Level partway down the expected drop" },
              { label: "Position", sub: "Slide trigger point for pre-trigger view" },
              { label: "Single", sub: "Arm, cause the event, read the frozen trace" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="holdoff-start-bit">Add holdoff so serial data locks on the start bit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A UART character starts with a falling start bit, but the data bits that follow can contain
          more high-to-low transitions, and an edge trigger cannot tell them apart. The display then
          hops between alignments. Holdoff solves it: set it a little longer than one frame and the
          scope ignores everything until the line has returned to idle. At 9600 baud each bit lasts
          about 104 µs, so a 10-bit frame (start, eight data, stop) is roughly 1.04 ms; a holdoff a
          bit above that works for back-to-back characters with a gap between them.
        </p>
        <KeyIdea title="Rule of thumb">
          Holdoff longer than the burst, shorter than the gap between bursts. The first falling edge
          after the gap is then the only one the trigger is allowed to accept.
        </KeyIdea>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting a falling-edge trigger</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Locks, but the drop is at the screen edge", "Slope still on rising", "Switch the slope to falling, or check it is not set to either edge"],
            ["Single never fires on power-down", "Level below where the rail stops, or source wrong", "Raise the level to just under nominal and confirm the trigger channel"],
            ["Trace jumps between positions on serial data", "Data bits also have falling edges", "Increase holdoff to just over one frame time"],
            ["Triggers on idle-line noise", "Level too close to the high state", "Move the level toward mid-swing, or try noise-reject trigger coupling if offered"],
            ["Nothing before the edge is visible", "Trigger point at the far left of the screen", "Adjust horizontal position to bring the trigger point back toward center"],
          ]}
        />
      </section>

      <section id="safety-when-switching-off">
        <Callout title="Switching circuits off safely">
          Capturing a shutdown means removing power while probes are connected. Keep the ground clip
          on circuit ground, stay within the voltage rating printed on the probe and scope input,
          and never clip a mains-earthed scope ground onto a non-isolated mains circuit. When a relay
          coil or inductive load turns off, the voltage spike can be far higher than the supply, so
          use a 10x probe and check its rating before you watch that edge.
        </Callout>
      </section>
    </HowToShell>
  );
}
