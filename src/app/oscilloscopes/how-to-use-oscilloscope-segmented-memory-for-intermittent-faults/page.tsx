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
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to use oscilloscope segmented memory for intermittent faults: set segment length and count, trigger on the fault, then use timestamps to find rare events.";

export const metadata = buildMetadata({
  title: "How to Use Oscilloscope Segmented Memory",
  description,
  path: "/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

/** Acquisition memory split into segments: each holds one short triggered capture, separated by idle time that is not recorded. */
function SegmentDiagram() {
  const segs = [
    { x: 10, ts: "0.000 s", odd: false },
    { x: 92, ts: "0.212 s", odd: false },
    { x: 174, ts: "0.431 s", odd: true },
    { x: 256, ts: "0.650 s", odd: false },
  ];
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of oscilloscope memory divided into four segments, each holding one short triggered capture with a timestamp, separated by gaps of unrecorded time, with the third segment holding an unusual waveform"
    >
      <text x="170" y="14" fontSize="10" textAnchor="middle" className="fill-foreground">
        Real time: long gaps between triggers are not stored
      </text>
      <line x1="10" x2="330" y1="30" y2="30" className="stroke-border" strokeWidth="1.5" />
      {segs.map((s) => (
        <rect key={`t${s.x}`} x={s.x + 28} y="24" width="16" height="12" className="fill-accent" />
      ))}
      <text x="170" y="50" fontSize="9" textAnchor="middle" className="fill-muted">
        each block = one trigger event, captured into its own segment
      </text>
      {segs.map((s, i) => (
        <g key={s.x}>
          <line x1={s.x + 36} y1="37" x2={s.x + 36} y2="62" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />
          <rect x={s.x} y="64" width="74" height="70" rx="3" className="fill-[#0f1a14]" />
          <polyline
            points={
              s.odd
                ? `${s.x + 4},112 ${s.x + 24},112 ${s.x + 26},84 ${s.x + 30},120 ${s.x + 34},90 ${s.x + 38},112 ${s.x + 70},112`
                : `${s.x + 4},112 ${s.x + 24},112 ${s.x + 26},84 ${s.x + 50},84 ${s.x + 52},112 ${s.x + 70},112`
            }
            fill="none"
            stroke={s.odd ? "#ffd56b" : "#7CFC9A"}
            strokeWidth="1.6"
          />
          <text x={s.x + 37} y="148" fontSize="10" textAnchor="middle" className="fill-foreground">
            Seg {i + 1}
          </text>
          <text x={s.x + 37} y="162" fontSize="9" textAnchor="middle" className="fill-muted">
            {s.ts}
          </text>
        </g>
      ))}
      <text x="211" y="180" fontSize="10" textAnchor="middle" className="fill-accent">
        the odd one out
      </text>
    </svg>
  );
}

export default function HowToUseOscilloscopeSegmentedMemoryForIntermittentFaultsPage() {
  return (
    <HowToShell
      title="How to Use Oscilloscope Segmented Memory for Intermittent Faults"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults"
      category="oscilloscopes"
      intro={
        <>
          To use oscilloscope segmented memory for intermittent faults, split the acquisition memory into many
          short segments, set a trigger that fires on the fault condition, and let the scope store one capture
          per trigger, each with its own timestamp. When the run ends, step through the segments, look for the
          one that differs, and use the timestamps to see when and how often the fault happened.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is our pick for growing into. Segmented memory
            features differ between models, so confirm them in the manual. Read the{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-segmented-memory-is", label: "What segmented memory is" },
        { id: "trigger-on-the-fault", label: "Trigger on the fault condition" },
        { id: "segment-length-vs-count", label: "Segment length vs segment count" },
        { id: "run-the-capture", label: "Run the capture" },
        { id: "review-segments-and-timestamps", label: "Review segments and timestamps" },
        { id: "worked-examples", label: "Examples: serial, reset, relay" },
        { id: "segmented-memory-vs-persistence", label: "Segmented memory vs persistence" },
        { id: "check-your-scope", label: "Check your scope supports it" },
      ]}
      faq={[
        {
          q: "What is segmented memory on an oscilloscope?",
          a: "It is an acquisition mode that divides the scope's record memory into many smaller blocks. Each trigger fills one block with a short capture and a timestamp, then the scope re-arms almost immediately for the next. You end up with a numbered set of separate captures of the same kind of event, which you can review one by one after the run.",
        },
        {
          q: "Is segmented memory the same as history mode?",
          a: "They are closely related, and names vary by manufacturer: segmented memory, sequence mode, history, waveform record and frame acquisition are all used. Some scopes keep a rolling history of recent normal acquisitions, while a dedicated sequence mode captures segments back to back with less dead time. The manual tells you which your scope offers and how many segments it can hold.",
        },
        {
          q: "How many segments do I need to catch an intermittent fault?",
          a: "Enough that the fault is likely to occur at least once before memory fills. If the fault appears roughly once per hundred normal events and your trigger cannot tell them apart, a few hundred segments gives a good chance. A trigger that fires only on the fault itself needs far fewer, because every segment is then a fault capture.",
        },
        {
          q: "Why do the timestamps on my segments matter?",
          a: "They show when each event happened relative to the first. Evenly spaced timestamps suggest a periodic cause, such as a timer, a firmware task or a switching cycle. Clusters suggest something external, like a motor starting or a relay switching nearby. Gaps tell you the fault stopped for a while, which can point to temperature or load dependence.",
        },
        {
          q: "Does segmented memory reduce the sample rate?",
          a: "Not necessarily. The total memory is shared among segments, so each segment is shorter, but the sample rate inside each one can stay high because every segment only covers a short time window. Asking for more segments or longer segments than the memory can hold is what forces a compromise, usually a lower maximum segment count.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches",
          title: "How to Use Oscilloscope Persistence for Glitches",
          desc: "Overlay thousands of captures to spot a rare shape, then isolate it with the right trigger.",
        },
        {
          href: "/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope",
          title: "How to Capture a Brief Voltage Spike",
          desc: "Probe setup, trigger level, peak detect and cursors for a short transient.",
        },
      ]}
    >
      <Callout title="Safety when hunting faults on live equipment">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Long unattended captures often run on powered equipment. Keep the probe ground clip on circuit
            ground only; on mains-referenced circuits use a differential probe or an isolated supply.
          </li>
          <li>
            Relay contacts may switch mains. Probe only the low-voltage side, or use a rated differential
            probe, and keep fingers clear while the equipment cycles.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-segmented-memory-is" className="text-xl font-semibold mb-3">What oscilloscope segmented memory is</h2>
        <p className="text-muted leading-7 mb-4">
          In normal mode a digital scope fills its whole record with one acquisition, processes and displays
          it, then re-arms. Events that arrive during that processing are missed, and the next trigger
          overwrites the last capture. Segmented memory (also called sequence or history, depending on the
          maker) changes the arrangement: the memory is divided into N segments, every trigger fills just one,
          and the scope re-arms with minimal dead time between them. Display updates are deferred until the
          run finishes, which is why re-arming can be so quick.
        </p>
        <Figure
          caption={
            <>
              Only the moments around each trigger are stored. The idle time between them costs no memory,
              so a few hundred short segments can span seconds, minutes or longer.
            </>
          }
        >
          <SegmentDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That makes it a good fit for intermittent faults: problems that appear in short bursts separated by
          long stretches of normal behaviour.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="trigger-on-the-fault">Trigger on the fault condition, not on everything</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every segment is spent on a trigger, so the trigger decides what you collect. Triggering on every
          clock edge fills memory with normal cycles in a fraction of a second. Narrow it to the condition
          that only the fault produces: a pulse narrower than normal, a runt that fails to reach full height,
          an edge on a line that should stay quiet, or a level crossing above the expected maximum. The basics
          of edge, level and holdoff are in{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          If you don&apos;t yet know what the fault looks like, trigger on the normal event that precedes it
          and collect many segments. The odd one becomes the template for a tighter trigger on the next run.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="segment-length-vs-count">Choose segment length vs segment count</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Segment length is the time each capture covers, set by the timebase: ten divisions times the time
          per division. Points per segment are that time multiplied by the sample rate. Total memory is
          fixed, so longer segments mean fewer of them. Scopes also cap the maximum segment count regardless
          of memory, so check both limits.
        </p>
        <DataTable
          head={["Setting", "Gives you", "Costs you"]}
          rows={[
            ["Short segments (fast timebase)", "Many segments, high sample rate per event", "Little context before and after the trigger"],
            ["Long segments (slow timebase)", "Context around each event", "Fewer segments, or a lower sample rate"],
            ["Trigger near the left of the screen", "More time after the event", "Less view of what led up to it"],
            ["Trigger near the centre", "Balanced pre- and post-trigger view", "Nothing extra, a sensible default"],
          ]}
        />
        <KeyIdea title="Worked example">
          At 1 GSa/s, a 2 µs window is 2,000 points per segment. A hypothetical scope with 1 million points
          available for segmenting could therefore hold about 500 such segments, if its segment-count limit
          allows. Double the window and the count halves.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={3} id="run-the-capture">Run the capture</StepHeading>
        <Figure caption={<>A typical segmented-memory session from setup to review.</>}>
          <FlowDiagram
            steps={[
              { label: "Set trigger", sub: "On the fault condition" },
              { label: "Set timebase", sub: "Segment length" },
              { label: "Set count", sub: "Within memory limits" },
              { label: "Run", sub: "Until full or stopped" },
              { label: "Review", sub: "Segments and timestamps" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Use Normal trigger mode, not Auto, so the scope never fills a segment with an untriggered sweep.
          Then start the sequence and leave it. Most scopes stop when the last segment fills; some can
          overwrite the oldest. For a fault that appears once an hour, a trigger that fires only on the
          fault makes even a modest segment count last all day.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="review-segments-and-timestamps">Review segments and timestamps to find the rare one</StepHeading>
        <p className="text-muted leading-7 mb-4">
          After the run, the scope offers a player or a list. Step through segments with the multipurpose
          knob, or play them back as an animation; a shape that jumps out of the sequence is your suspect.
          Many scopes can also overlay every segment at once, which shows the outlier as a stray line, then let
          you jump to that segment and run measurements or cursors on it alone.
        </p>
        <DataTable
          head={["Timestamp pattern", "What it often points to"]}
          rows={[
            ["Even spacing", "A periodic source: timer interrupt, firmware task, switching cycle"],
            ["Clusters", "An external event: motor start, relay switching, a radio transmitting"],
            ["Gaps that grow over time", "Temperature or load dependence"],
            ["Only at start of the run", "A warm-up or initialisation problem"],
          ]}
        />
      </section>

      <section>
        <h2 id="worked-examples" className="text-xl font-semibold mb-3">Examples: serial bursts, a sporadic reset pulse, relay bounce</h2>
        <InfoCards
          items={[
            {
              label: "Serial bursts",
              desc: "A UART or SPI link sends short packets between long idle periods. Trigger on the start of each burst, size segments to one packet, and every packet is stored without the idle time. Timestamps show packet spacing; a missing or late packet stands out at once.",
            },
            {
              label: "Sporadic reset pulse",
              desc: "A microcontroller resets now and then. Put CH1 on the reset line and trigger on its falling edge, with CH2 on the supply rail. Each segment then shows whether the rail sagged at the moment of reset, and timestamps reveal whether resets line up with a load switching on.",
            },
            {
              label: "Relay bounce",
              desc: "Trigger on the first edge of the contact signal and capture each actuation. After a hundred operations, compare segments: bounce that grows longer across the run, or one segment with far more bounces, points to worn or contaminated contacts.",
            },
          ]}
        />
      </section>

      <section>
        <h2 id="segmented-memory-vs-persistence" className="text-xl font-semibold mb-3">Segmented memory vs persistence for intermittent faults</h2>
        <p className="text-muted leading-7 mb-4">
          Both tools collect many events, but they keep different information. Persistence stacks captures on
          screen and keeps only the picture; segmented memory keeps every capture as data, with time.
        </p>
        <DataTable
          head={["", "Persistence", "Segmented memory"]}
          rows={[
            ["What is kept", "An overlaid image", "Each capture, separately"],
            ["Timing of each event", "Not recorded", "Timestamp per segment"],
            ["Measure the rare event", "No, only see it", "Yes, with cursors and automatic measurements"],
            ["Number of events", "Unlimited while running", "Limited to the segment count"],
            ["Best for", "Spotting that a rare shape exists", "Measuring it and finding when it occurs"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A sensible sequence is to start with{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            persistence to find intermittent glitches
          </Link>
          , then switch to segments once you know what to trigger on. If the fault is a fast transient, set
          up the probe and trigger level as described in{" "}
          <Link href="/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope" className={link}>
            how to capture a brief voltage spike
          </Link>{" "}
          before you start the sequence.
        </p>
      </section>

      <section>
        <h2 id="check-your-scope" className="text-xl font-semibold mb-3">Check your scope supports segmented memory</h2>
        <p className="text-muted leading-7 mb-6">
          Models vary a lot here. Some scopes have no segmented mode; others offer it with different maximum
          segment counts, timestamp resolution and dead time, and the feature can depend on firmware version
          or an option. Our product data does not list segmented memory for the scopes below, so treat the
          manual as the authority before relying on it. Compare channel counts and bandwidth in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup; extra channels help when you want the fault and its likely cause in the same segment.
        </p>
        <ProductStrip
          title="Four-channel scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Menus have a learning curve; community documentation is strong.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with more bandwidth headroom than entry-level scopes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
