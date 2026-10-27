// Specs per Fluke, checked 2026-10-28:
// - Fluke 287/289 True-rms Digital Multimeters Users Manual (June 2007, Rev. 2, 3/09), Fluke's document as hosted by
//   RS Components: https://docs.rs-online.com/91c2/A700000015027554.pdf
//   MIN MAX: captures min, average and max; beeps on a new value and stores the elapsed time since the session
//   started; manual text says 100 ms MIN MAX response, the spec table says "200 ms to 80% (dc function), 350 ms to 80%
//   (ac function)" (conflict stated on page); Peak record: 250 µs response, "For repetitive peaks; 2.5 ms for single
//   events", peak values time-stamped with elapsed time; Recording: interval and event records, each with min, max,
//   average and time stamps (record start, time of max, time of min, record end); event record starts when the value
//   changes more than the Event Threshold for recording (the manual's list uses 4%); event records flagged stable or
//   unstable (stable = within threshold for at least 1 s); sample interval 1 s to 99 min 59 s; session 1 min to
//   99 days 23 h 59 min; max 10,000 sample intervals, events up to 15,000 minus intervals; Menu and Setup are not
//   available while recording; session stops when memory is used, batteries expire, the dial is moved, or a probe is
//   inserted into or removed from the A or mA/A jacks; trend data viewable and zoomable on the meter; full records via
//   FlukeView Forms over the IR link; real-time clock; 6 AA, 100 h minimum, 200 h in logging mode; 871 g;
//   1000 V CAT III / 600 V CAT IV; 289 only: LoZ, low-pass filter, 50 Ω range.
// - Fluke 287 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-287
//   TrendCapture; "Store up to 15,000 recorded events" vs "Up to 10,000 readings" in the table; real-time clock for
//   time stamping; peak capture to 250 µs; 50,000-count 1/4 VGA display with backlight; 0.025% basic DC V; AC V
//   bandwidth to 100 kHz; 10 A (20 A for 30 s); limited lifetime warranty.
// - Fluke 87V product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   "Captures intermittents as fast as 250 µs"; 32-segment bar graph at 40 updates/s; low-pass filter; Input Alert;
//   9 V, ~400 h; 355 g; CAT IV 600 V / CAT III 1000 V; lifetime warranty; no data logging listed.
// - Fluke 83V and 87V Detailed Specifications (Fluke Corporation, hosted by Farnell):
//   https://www.farnell.com/datasheets/2830418.pdf  87V MIN MAX nominal response 100 ms to 80% (dc), 120 ms to 80% (ac);
//   250 µs (peak) "For repetitive peaks: 1 ms for single events".
// - Fluke 80 Series V Users Manual, MIN MAX Recording Mode section (Fluke's manual as hosted by ManualsDir):
//   https://www.manualsdir.com/manuals/743810/fluke-80-series-v-85-v-83-v-87-v.html?page=40  records min and max,
//   beeps on a new value, average of all readings; "Min Max records the signal extremes lasting longer than 100 ms";
//   "Peak records the signal extremes lasting longer than 250 µs"; no time stamps or elapsed time described.
// Picks: Fluke 287 (4.6, not tested by us) in src/lib/multimeter-catalog.ts; Fluke 87V (4.8, hands-on tested) in
// best-multimeters. Timeline values on the page are illustrative and labeled as such.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-287-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 287 vs 87V for Intermittent Faults",
  description:
    "Fluke 287 vs 87V for intermittent faults: the 287 time-stamps every sag and dropout over days; the 87V's Min/Max and 1 ms Peak catch depth, not timing.",
  path: "/multimeters/fluke-287-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * Illustrative overnight trace of a 120 V branch circuit with three faults, and what each meter reports afterward.
 * Values are made up for shape; capture behavior follows the Fluke specs cited above.
 */
function IntermittentTimelineDiagram() {
  // x: 0 to 8 h across 50..330 px (35 px per hour). y: 120 V at 60, 0 V at 110.
  const x = (h: number) => 50 + h * 35;
  const v = (volts: number) => 110 - (volts / 120) * 50;
  const trace = [
    `M${x(0)} ${v(120)}`,
    `H${x(2.2)}`,
    `V${v(0)}`,
    `H${x(2.24)}`,
    `V${v(120)}`,
    `H${x(4.6)}`,
    `V${v(150)}`,
    `V${v(120)}`,
    `H${x(6.2)}`,
    `V${v(106)}`,
    `H${x(6.45)}`,
    `V${v(120)}`,
    `H${x(8)}`,
  ].join(" ");
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative eight-hour timeline of a 120 volt circuit with a brief dropout at about 2:10, a short spike at about 4:35 and a sag to 106 volts at about 6:15. Below it, the Fluke 87V's Min Max shows only the lowest, highest and average values with no times, while the Fluke 287's recording lists each event with its time stamp"
    >
      <text x="50" y="16" fontSize="10.5" fontWeight="700" className="fill-foreground">Illustrative: one night on a 120 V circuit</text>
      <line x1={x(0)} x2={x(8)} y1={v(120)} y2={v(120)} className="stroke-border" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="44" y={v(120) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">120 V</text>
      <text x="44" y={v(0) + 3} fontSize="8.5" textAnchor="end" className="fill-muted">0 V</text>
      <path d={trace} className="fill-none stroke-accent" strokeWidth="1.6" />
      {[0, 2, 4, 6, 8].map((h) => (
        <text key={h} x={x(h)} y="124" fontSize="8.5" textAnchor="middle" className="fill-muted">
          {`${h}:00`}
        </text>
      ))}
      <text x={x(2.2)} y="38" fontSize="8.5" textAnchor="middle" className="fill-foreground">A: 40 ms dropout</text>
      <text x={x(4.6)} y="28" fontSize="8.5" textAnchor="middle" className="fill-foreground">B: 3 ms spike</text>
      <text x={x(6.3)} y="102" fontSize="8.5" textAnchor="middle" className="fill-foreground">C: 15 min sag</text>
      {/* 87V readout */}
      <rect x="10" y="136" width="164" height="104" rx="8" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="92" y="153" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">87V the next morning</text>
      <text x="20" y="171" fontSize="9" className="fill-foreground">Min/Max (100 ms): MIN ~106 V</text>
      <text x="20" y="185" fontSize="9" className="fill-muted">A and B too short to register fully</text>
      <text x="20" y="203" fontSize="9" className="fill-foreground">Peak mode: extremes of A and B</text>
      <text x="20" y="217" fontSize="9" className="fill-muted">No times: you know how bad,</text>
      <text x="20" y="230" fontSize="9" className="fill-muted">not when or how often</text>
      {/* 287 readout */}
      <rect x="186" y="136" width="164" height="104" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="268" y="153" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">287 the next morning</text>
      <text x="196" y="171" fontSize="9" className="fill-foreground">Recording: event 06:12, 15 min,</text>
      <text x="196" y="185" fontSize="9" className="fill-foreground">min ~106 V, start and end times</text>
      <text x="196" y="203" fontSize="9" className="fill-foreground">Peak session: A and B with</text>
      <text x="196" y="217" fontSize="9" className="fill-foreground">elapsed-time stamps</text>
      <text x="196" y="230" fontSize="9" className="fill-muted">One mode per session</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 287 vs Fluke 87V for Intermittent Electrical Faults",
  path,
  published: "2026-10-28",
  intro:
    "For an intermittent fault that comes and goes over hours or days, the Fluke 287 is the better tool, because it records every excursion with a time stamp: a recording session runs up to 99 days and logs event records whenever the reading moves past a threshold you set. The Fluke 87V catches how bad a fault gets, not when it happens. Its Min/Max holds the lowest and highest readings lasting 100 ms or more, and its Peak mode catches repetitive spikes as short as 250 µs and single events down to 1 ms, faster than the 287's 2.5 ms single-event peak. If you can stand next to the fault while it happens, the 87V is enough. If you have to leave the meter overnight, buy the 287.",
  a: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 True RMS logging multimeter with large graphic display, front view",
    chooseIf: [
      "The fault shows up once a night or once a week, and you need to know exactly when to match it to a load, a shift or the weather",
      "You want to hand a customer or a utility a timeline of sags and dropouts rather than a single minimum value",
      "You want to graph the session on the meter (TrendCapture) and export it to a PC",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "You can make the fault happen while you watch: wiggle a harness, cycle a contactor, crank an engine",
      "You need the shortest single-event peak capture of the two (1 ms against 2.5 ms)",
      "The intermittent lives on a drive output, where the 87V's low-pass filter matters and the 287 has none",
    ],
  },
  extraSpecs: [
    { label: "Time-stamped recording", a: "Yes: interval + event records, real-time clock", b: "No" },
    { label: "Recording session length", a: "1 min to 99 days 23 h 59 min", b: "No recording memory" },
    { label: "Stored records", a: "Up to 10,000 intervals; events up to 15,000 minus intervals", b: "Min, max and average only" },
    { label: "Min/Max response", a: "200 ms DC / 350 ms AC (spec table)", b: "100 ms DC / 120 ms AC" },
    { label: "Peak capture", a: "250 µs repetitive; 2.5 ms single events", b: "250 µs repetitive; 1 ms single events" },
    { label: "Time stamps on Min/Max and Peak", a: "Elapsed time for each new value", b: "None described in Fluke's manual" },
    { label: "On-meter graph", a: "TrendCapture, with zoom", b: "32-segment bar graph, 40 updates/s" },
    { label: "Low-pass filter", a: "No (Fluke 289 only)", b: "Yes" },
    { label: "Battery", a: "6 × AA: 100 h min, 200 h logging", b: "9 V, about 400 h" },
    { label: "Weight", a: "871 g", b: "355 g (624 g holstered)" },
  ],
  differences: [
    "Timing: the 287 records when each excursion started and ended and when its minimum and maximum occurred. The 87V tells you the extremes and the average, with no times.",
    "Unattended time: a 287 recording session can be set to run from a minute to just under 100 days, limited in practice by memory and the 200-hour logging battery life.",
    "Short single events: Fluke specifies the 87V's Peak mode at 1 ms for single events and the 287's at 2.5 ms. Both catch repetitive peaks down to 250 µs.",
    "Slow excursions: the 87V's Min/Max responds in 100 ms (DC) and 120 ms (AC); the 287's spec table gives 200 ms and 350 ms.",
    "Drive circuits: the 87V has a low-pass filter for VFD outputs. The 287 doesn't; that filter is on the Fluke 289.",
    "Shared: CAT IV 600V / CAT III 1000V, True RMS, 10 A (20 A for 30 s), a lifetime warranty, and Min/Max/Avg plus Peak on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The two questions an intermittent fault asks</h2>
        <p className="text-muted leading-7 mb-4">
          A fault that won&apos;t stay put leaves you two questions. How bad is it when it happens? And when does it
          happen? The 87V answers the first very well. Only the 287 answers the second, and the second is usually what
          solves the job: a sag that lines up with the compressor starting, a dropout every morning at 7:02, a trip that
          only happens on hot afternoons.
        </p>
        <InfoCards
          items={[
            { label: "287: when", desc: "Real-time clock and time-stamped records." },
            { label: "287: how long", desc: "Sessions up to 99 days, battery permitting." },
            { label: "287: how often", desc: "An event counter, even after memory fills." },
            { label: "87V: how deep", desc: "Min/Max from 100 ms; Peak from 250 µs." },
            { label: "87V: fastest single hit", desc: "1 ms single-event peak against 2.5 ms." },
            { label: "87V: drive outputs", desc: "Low-pass filter the 287 lacks." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We have tested the 87V ourselves; it holds our 4.8 rating. The 287 is rated 4.6 from Fluke&apos;s 287/289
          users manual and product page, not from our own use. Capture times and memory figures below are from those
          Fluke documents; the timeline is an illustration.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter shows you the next morning</h2>
        <p className="text-muted leading-7 mb-4">
          Picture a circuit that misbehaves overnight with three different faults: a 40 ms dropout from a loose
          connection, a 3 ms spike when something switches, and a 15-minute sag when a big load runs. Leave each meter
          on it and here is roughly what you come back to.
        </p>
        <Figure caption={<>Illustrative fault timeline. Readings are made up; what each meter can report follows Fluke&apos;s published capture specs.</>}>
          <IntermittentTimelineDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 87V&apos;s Min/Max only records a new extreme once the input has held it for about 100 ms, so a 40 ms
          dropout or a 3 ms spike won&apos;t register at its true depth. Switch it to Peak mode and it catches both, but
          you still get only the worst values. The 287 gives you a record for the sag with its start time, the time of
          the minimum and the end time, and a Peak session on the 287 stamps each new peak with the elapsed time since
          you started. One limitation to plan around: on the 287, Recording and Peak are separate sessions, because the
          menu that starts Peak is locked while recording. Choose by the fault you suspect.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 287 vs 87V spec by spec for catching faults</h2>
        <DataTable
          head={["Capture feature", "Fluke 287", "Fluke 87V", "Edge"]}
          rows={[
            ["Min/Max nominal response, DC", "200 ms to 80%", "100 ms to 80%", "87V"],
            ["Min/Max nominal response, AC", "350 ms to 80%", "120 ms to 80%", "87V"],
            ["Peak, repetitive", "250 µs", "250 µs", "Same"],
            ["Peak, single event", "2.5 ms", "1 ms", "87V"],
            ["Time stamps", "Elapsed time on Min/Max and Peak; clock time on records", "None described", "287"],
            ["Recording memory", "10,000 intervals; events to 15,000 minus intervals", "None", "287"],
            ["Sample interval", "1 s to 99 min 59 s", "Not applicable", "287"],
            ["Event detection", "Adjustable % threshold; stable/unstable flag", "Beeps on a new min or max", "287"],
            ["Review on the meter", "TrendCapture graph with zoom", "Min, max, average", "287"],
            ["PC export", "IR link to FlukeView Forms", "Not listed", "287"],
            ["Low-pass filter", "No", "Yes", "87V"],
            ["Battery", "100 h min; 200 h logging", "About 400 h", "87V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Shortest event each mode is specified to catch. Shorter is better; log scale.</>}>
            <BarChart
              log
              items={[
                { label: "87V Peak, single event", value: 1, display: "1 ms", highlight: true },
                { label: "287 Peak, single event", value: 2.5, display: "2.5 ms" },
                { label: "87V Min/Max, DC", value: 100, display: "100 ms" },
                { label: "287 Min/Max, DC", value: 200, display: "200 ms" },
              ]}
            />
          </Figure>
          <Figure caption={<>How long one set of batteries lasts. The 87V figure is for normal use; it has no logging mode.</>}>
            <BarChart
              items={[
                { label: "87V, 9 V cell", value: 400, display: "~400 h" },
                { label: "287 logging, 6 × AA", value: 200, display: "200 h", highlight: true },
                { label: "287 minimum, 6 × AA", value: 100, display: "100 h" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The battery chart sets a practical ceiling on the 287&apos;s 99-day session setting: 200 hours of logging is
          about 8 days on fresh cells. For a fault that appears once a week, that is enough; for anything rarer, plan to
          swap batteries, and remember that Fluke&apos;s manual says the session stops if the batteries run out or a
          lead is pushed into or pulled out of a current jack.
        </p>
        <p className="text-muted leading-7 mt-4">
          One source conflict: the body of the 287/289 manual says its Min/Max response is 100 ms, while its
          specification table gives 200 ms (DC) and 350 ms (AC). We use the specification table. Fluke&apos;s 287
          product page also mixes &quot;up to 15,000 recorded events&quot; with &quot;up to 10,000 readings&quot;; the
          manual reconciles them as up to 10,000 interval records, with event records filling the rest of a 15,000 total.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Matching the meter to the intermittent fault</h2>
        <DataTable
          head={["Symptom", "What to capture", "Better meter", "Why"]}
          rows={[
            ["Lights dim or flicker a few times a day", "Voltage sags with times", "Fluke 287", "Line the event times up with what was running"],
            ["Equipment resets, but you can't see a sag", "Brief dropouts or spikes", "Either, in Peak mode", "Both catch 250 µs repetitive peaks; the 87V is faster on single hits"],
            ["Breaker trips randomly", "Current peaks and when they occur", "Fluke 287", "Time-stamped current events within the 10 A input; use a clamp above that"],
            ["Car cranks slowly some mornings", "DC voltage dip while cranking", "Fluke 87V", "You're there when it cranks; 100 ms DC Min/Max shows the dip"],
            ["Wiggle a harness, hear a dropout", "Opens while you move the wire", "Fluke 87V", "Min/Max beeps on a new low while you work"],
            ["Sensor drops out once a shift", "4–20 mA or DC signal over hours", "Fluke 287", "Interval logging with event records"],
            ["Fault only when the drive runs", "Filtered motor-side voltage", "Fluke 87V", "Low-pass filter; the 287 has none"],
            ["Fault that appears once a month", "Long unattended log", "Neither alone", "Both are handheld; consider a dedicated recorder"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 287&apos;s event threshold does a lot of work here. Fluke&apos;s manual describes it as a percentage
          change from the value at the start of a record (its example uses 4%), and every excursion beyond it opens a new
          event record tagged stable or unstable, depending on whether it settled within the threshold for at least a
          second. Set it too tight on a noisy circuit and you fill the memory with nothing; once memory is full the
          287 stops saving events but keeps counting them, and shows a plus sign after the count.
        </p>
        <p className="text-muted leading-7 mt-4">
          For the method itself, our guide on{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            how to find an intermittent electrical fault with a multimeter
          </Link>{" "}
          walks through the steps, and{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            why lights flicker when the AC starts
          </Link>{" "}
          covers one of the most common culprits.
        </p>
        <KeyIdea title="Depth versus timing">
          The 87V tells you how deep the hole was; the 287 tells you when you fell in and how often. If the fault happens
          while you&apos;re holding the probes, the 87V&apos;s faster Min/Max and 1 ms single-event Peak are enough. If
          it happens when nobody is watching, only the 287&apos;s time-stamped records turn it into a pattern you can act
          on.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 287 or 87V: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Service electrician chasing customer complaints", "Fluke 287", "Leave it overnight and show a time-stamped log"],
            ["Industrial maintenance on drives and motors", "Fluke 87V", "Low-pass filter; faster Min/Max; lighter"],
            ["Automotive or mobile electrical technician", "Fluke 87V", "Faults are usually made to happen on demand"],
            ["Electronics engineer with a flaky prototype", "Fluke 287", "Logs supply rails and reset events over a weekend"],
            ["Controls technician with a dropping sensor", "Fluke 287", "Interval plus event records on mA or DC"],
            ["One meter for everything, rare intermittents", "Fluke 87V", "Covers daily work; Peak catches the short stuff"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you&apos;re choosing between logging meters, our{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs 287
          </Link>{" "}
          comparison covers what the 289 adds, including the low-pass filter and LoZ the 287 lacks. For a broader look
          at the 87V against a logger in everyday professional use, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          , and our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          has the full hands-on detail.
        </p>
      </section>

      <Callout title="Safety: an unattended meter on a live circuit">
        Leaving a meter connected to mains overnight means live test leads in a panel nobody is watching. Use leads and
        clips rated for the CAT IV 600V / CAT III 1000V category you&apos;re in, secure them so they can&apos;t pull
        loose or touch other conductors, close and label the enclosure where your site allows, and never leave a lead in
        a current jack while measuring volts. Both meters are rated CAT IV 600V / CAT III 1000V. For faults on a
        service entrance, or anything that smells of burning or arcing, stop and call a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 287 for intermittent faults you can't watch: it time-stamps every sag and dropout, records interval and event data for days, and graphs the session on screen. Buy the Fluke 87V, our hands-on tested pick, for faults you can make happen while you watch, or that live on drive outputs: its Min/Max responds faster (100 ms against 200 ms on DC), its Peak catches single events down to 1 ms, and it has the low-pass filter the 287 lacks.",
  faqs: [
    {
      question: "Can the Fluke 87V log data?",
      answer:
        "No. Fluke's 87V page lists no logging memory. Its Min/Max mode keeps the lowest, highest and average reading since you started and beeps on a new extreme, and Peak mode catches short spikes, but neither records when anything happened. For time-stamped logs you need a meter like the 287 or 289, or a separate recorder.",
    },
    {
      question: "How long can the Fluke 287 record unattended?",
      answer:
        "The session setting runs from one minute to 99 days, 23 hours and 59 minutes, with sample intervals from one second to just under 100 minutes. In practice, Fluke rates battery life at about 200 hours in logging mode, roughly eight days, and up to 10,000 interval records fit in memory, so plan longer sessions around fresh batteries.",
    },
    {
      question: "What is the difference between Min/Max and Peak on a Fluke meter?",
      answer:
        "Min/Max records the lowest and highest readings that last long enough to measure accurately, about 100 ms on the 87V and 200 ms (DC) on the 287. Peak records much shorter extremes, down to 250 µs for repetitive peaks, but with looser accuracy. Use Min/Max for sags and swells, Peak for spikes and very brief dropouts.",
    },
    {
      question: "Does the Fluke 287 time-stamp Min/Max readings?",
      answer:
        "Yes. Fluke's 287/289 manual says the meter stores the elapsed time since the session started whenever it records a new minimum or maximum, and Peak sessions work the same way. Its Recording mode goes further, saving the clock time of each record's start, minimum, maximum and end. The 87V's manual describes no time stamps.",
    },
    {
      question: "Will a Fluke 287 catch a loose neutral?",
      answer:
        "It's well suited to the symptom. A loose neutral typically makes voltage swing up on one leg and down on the other as loads change, and the 287's event records log each swing with its time. Comparing those times with what was switching on usually points to the cause. A loose neutral is dangerous, so get an electrician to repair it.",
    },
    {
      question: "Is the 87V's Peak mode faster than the 287's?",
      answer:
        "For single events, yes. Fluke specifies both at 250 µs for repetitive peaks, but for a one-off event the 87V's figure is 1 ms and the 287's is 2.5 ms. For a spike that happens once, the 87V is more likely to catch its full height; the 287 tells you when it happened.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "How to find an intermittent electrical fault", href: "/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" },
    { label: "How to check for voltage fluctuations in your home", href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" },
    { label: "Why does a circuit breaker keep tripping?", href: "/multimeters/why-does-a-circuit-breaker-keep-tripping" },
  ],
};

export default function Fluke287VsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
