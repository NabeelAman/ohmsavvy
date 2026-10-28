// Specs per Fluke, checked 2026-10-28:
// - Fluke 283 FC/PV product page and spec tab:
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/283-fcpv-solar-digital-multimeter
//   6000 counts; DC V to 1500 V, ±(0.09% + 3) on 6-600 V, ±(0.15% + 2) on 1500 V; AC V to 1000 V ±(1.0% + 3) at
//   45-500 Hz; current only via the a283 FC wireless clamp: 60 A AC/DC, 0.01 A resolution, ±(1.5% + 0.15 A), 34 mm
//   jaw, can be left closed in an enclosure and read remotely; resistance to 50 MΩ; capacitance to 9999 µF;
//   frequency to 99.99 kHz; calculated AC/DC VA; Min/Max/Avg; polarity alerts; user limit gauge; readiness
//   self-check; logging with a real-time clock, user-set duration and interval (memory size NOT stated); Fluke
//   Connect: live trending on phone/tablet, cloud upload, shareable reports, ShareLive video calls; CAT III 1500V /
//   CAT IV 1000V; IP52; 2 m drop; operating -10 to 60 °C; meter 3 x AA, >150 h without backlight, >100 h linked to
//   the clamp; clamp 2 x AAA >80 h; meter 0.7 kg; meter limited lifetime warranty, clamp 1 year. No current jacks on
//   the meter (COM and VΩ only, per the Amazon kit photo). LoZ, low-pass filter, temperature not listed.
// - Amazon listing B0DGBYD8ZK (Fluke 283FC/PV Kit): no bare 283 FC listed on Amazon.com; the kit is the Pick.
// - Fluke 289 per the Fluke 289 Pick (src/lib/multimeter-catalog.ts, specs per fluke.com, the 289 datasheet and the
//   287/289 Users Manual) and the Fluke "287/289 True-rms Digital Multimeters Users Manual" (Rev. 2, 3/09), as cited
//   in /multimeters/fluke-289-vs-fluke-287: 50,000 counts; DC V ±(0.025% + 2) on 500 mV-50 V, ±(0.03% + 2) on 500 V
//   and 1000 V; AC V ±(0.3% + 25) at 45-65 Hz; 500 µA range at 0.01 µA; 10 A; 50 Ω low-ohm range at 0.001 Ω;
//   resistance to 500 MΩ; capacitance to 100 mF; frequency to 999.99 kHz; temperature -200 to 1350 °C; Peak 250 µs;
//   recording memory up to 10,000 intervals, events up to 15,000 minus intervals; TrendCapture graphs on the meter;
//   IR link to FlukeView Forms; real-time clock; LoZ; low-pass filter; 6 AA, 100 h minimum, 200 h in logging mode;
//   871 g; CAT III 1000V / CAT IV 600V; lifetime limited warranty. No wireless/Fluke Connect.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-283-fc-vs-fluke-289";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 283 FC vs 289: Wireless or Data Logging?",
  description:
    "Fluke 283 FC vs 289 comparison: a wireless 1500 V solar kit with a 60 A DC clamp and phone trending against a 50,000-count logger with on-screen graphs.",
  image: all.find((p) => p.name === "Fluke 283 FC/PV")!.image,
  path: "/multimeters/fluke-283-fc-vs-fluke-289",
});

const link = "text-accent hover:underline";

/**
 * Where the data goes. 283 FC: clamp → radio → meter → Fluke Connect app → cloud report.
 * 289: probes → meter memory → TrendCapture graph on screen → IR cable → FlukeView Forms on a PC.
 */
function DataPathDiagram() {
  const box = (x: number, y: number, w: number, title: string, sub: string, accent = false) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height="38"
        rx="6"
        className={accent ? "fill-surface stroke-accent" : "fill-surface stroke-border"}
        strokeWidth="1.4"
      />
      <text x={x + w / 2} y={y + 16} fontSize="9" fontWeight="600" textAnchor="middle" className="fill-foreground">
        {title}
      </text>
      <text x={x + w / 2} y={y + 29} fontSize="7.5" textAnchor="middle" className="fill-muted">
        {sub}
      </text>
    </g>
  );
  const arrow = (x1: number, x2: number, y: number, dashed = false) => (
    <g>
      <line x1={x1} y1={y} x2={x2 - 5} y2={y} className="stroke-accent" strokeWidth="1.4" strokeDasharray={dashed ? "4 3" : undefined} />
      <path d={`M${x2 - 6} ${y - 4} L${x2} ${y} L${x2 - 6} ${y + 4} Z`} className="fill-accent" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Data paths compared. Fluke 283 FC: the a283 FC clamp sends current over a wireless link to the meter, which logs time-stamped readings and passes them to the Fluke Connect app on a phone for live trending, then to the cloud for shared reports. Fluke 289: test leads feed the meter, which stores up to 10,000 recording intervals in its own memory and graphs them on screen with TrendCapture, then an optical IR cable transfers them to FlukeView Forms software on a PC."
    >
      <text x="10" y="18" fontSize="10" fontWeight="700" className="fill-foreground">Fluke 283 FC/PV kit: wireless</text>
      {box(10, 28, 80, "a283 FC clamp", "60 A AC/DC", true)}
      {arrow(90, 112, 47, true)}
      {box(112, 28, 82, "283 FC meter", "V + A + VA, RTC log", true)}
      {arrow(194, 216, 47, true)}
      {box(216, 28, 82, "Fluke Connect", "live trend on phone")}
      {arrow(298, 318, 47)}
      {box(318, 28, 74, "Cloud report", "share, ShareLive")}

      <text x="10" y="118" fontSize="10" fontWeight="700" className="fill-foreground">Fluke 289: stand-alone logger</text>
      {box(10, 128, 80, "Test leads", "V, A to 10 A, Ω")}
      {arrow(90, 112, 147)}
      {box(112, 128, 82, "289 memory", "up to 10,000 intervals")}
      {arrow(194, 216, 147)}
      {box(216, 128, 82, "TrendCapture", "graph on meter screen")}
      {arrow(298, 318, 147)}
      {box(318, 128, 74, "PC via IR cable", "FlukeView Forms")}
      <text x="200" y="192" fontSize="7.5" textAnchor="middle" className="fill-muted">
        Dashed arrows are radio links. The 283 FC&apos;s log memory size is not stated by Fluke.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 283 FC vs Fluke 289: Wireless Testing or Data Logging?",
  path,
  published: "2026-10-28",
  intro:
    "Pick the Fluke 283 FC if your work is PV commissioning and DC systems up to 1500 V: its a283 FC clamp radios up to 60 A AC/DC to the meter, and Fluke Connect pushes live trends and reports to your phone. Pick the Fluke 289 if you want a self-contained logger for industrial and bench work: 50,000 counts, a documented 10,000-interval memory with graphs on its own screen, microamps, milliohms and a 10 A input. Both log; the difference is where the data lives and what it measures. On Amazon the 283 FC is sold only as the 283 FC/PV kit (meter, a283 FC clamp, MC4 and TL175-HV leads).",
  a: {
    pick: all.find((p) => p.name === "Fluke 283 FC/PV")!,
    imageAlt: "Fluke 283 FC/PV kit with the 283 FC 1500 V multimeter, a283 FC wireless AC/DC clamp, MC4 solar leads and carrying case",
    chooseIf: [
      "You test PV strings, combiner boxes or other DC systems up to 1500 V",
      "You want to read current from a clamp left closed in a panel, away from the conductors",
      "Readings should land on a phone and in shareable reports, not a PC cable",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter with its large graphical display, front view",
    chooseIf: [
      "You record a drifting voltage or current overnight and want the graph on the meter itself",
      "You need 0.01 µA, a 50 Ω range at 0.001 Ω, LoZ or a low-pass filter",
      "Your circuits stay at or below 1000 V and you want a 10 A series input",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts", b: "50,000 counts" },
    { label: "Safety rating", a: "CAT III 1500V / CAT IV 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "DC volts", a: "To 1500 V; ±(0.09% + 3) to 600 V", b: "To 1000 V; ±(0.025% + 2) to 50 V" },
    { label: "AC volts", a: "±(1.0% + 3) at 45–500 Hz", b: "±(0.3% + 25) at 45–65 Hz" },
    { label: "Current", a: "Wireless a283 FC clamp, 60 A AC/DC; no jacks", b: "Jacks: 0.01 µA resolution up to 10 A" },
    { label: "Lowest resistance step", a: "600 Ω range (0.1 Ω)", b: "50 Ω range at 0.001 Ω" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 999.99 kHz" },
    { label: "Temperature", a: "Not listed", b: "-200 to 1350 °C (K-type)" },
    { label: "LoZ / low-pass filter", a: "Not listed", b: "Yes / yes" },
    { label: "Logging memory", a: "RTC logging; size not stated", b: "Up to 10,000 intervals; 15,000 events" },
    { label: "Trend view", a: "Fluke Connect app, live", b: "TrendCapture on the meter" },
    { label: "Data transfer", a: "Wireless to phone/tablet, cloud", b: "IR cable to FlukeView Forms (PC)" },
    { label: "Solar features", a: "Polarity alerts, limit gauge, VA, MC4 leads", b: "None" },
    { label: "Ruggedness", a: "IP52; 2 m drop", b: "Not stated" },
    { label: "Battery", a: "3 × AA, >150 h (>100 h with clamp)", b: "6 × AA, 100 h min, 200 h logging" },
    { label: "Weight", a: "Meter 0.7 kg; clamp 0.375 kg", b: "871 g" },
    { label: "Warranty", a: "Meter limited lifetime; clamp 1 year", b: "Lifetime limited" },
    { label: "Amazon listing", a: "283 FC/PV kit only", b: "Meter" },
  ],
  differences: [
    "Voltage: the 283 FC is ranged and rated for 1500 V DC (CAT III 1500V). The 289 stops at 1000 V (CAT III 1000V / CAT IV 600V).",
    "Current: the 283 FC reads 0–60 A AC/DC only through its wireless clamp and has no current jacks. The 289 measures in series from 0.01 µA resolution up to 10 A, with no clamp included.",
    "Logging: both log with a real-time clock. The 289 documents up to 10,000 intervals and graphs them on its own screen; the 283 FC streams to Fluke Connect for live trends and cloud reports, and Fluke does not state its memory size.",
    "Resolution: the 289 shows 50,000 counts with ±(0.025% + 2) DC volts, a 50 Ω range at 0.001 Ω and frequency to 999.99 kHz. The 283 FC shows 6,000 counts.",
    "Solar and field extras: only the 283 FC has polarity alerts, a limit gauge, a readiness self-check, MC4 leads, IP52 and a 2 m drop rating. Only the 289 has LoZ, a low-pass filter and temperature.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two meanings of &quot;connected&quot;</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters can record readings over time with a time stamp, so the real question is not &quot;which one
          logs?&quot; but &quot;where does the data need to go, and how fast?&quot; The 283 FC is built around radio
          links: the clamp talks to the meter, and the meter talks to a phone. That suits a solar crew moving from
          string to string, where a supervisor or remote engineer wants to see results the moment they are taken. The
          289 is built around its own memory and screen: it sits clipped to a panel or on a bench for hours, draws the
          trend itself, and gives the data up through an optical cable when you get back to a computer.
        </p>
        <Figure caption={<>Where each meter&apos;s readings travel. Dashed arrows are wireless links.</>}>
          <DataPathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Neither path is better in general. Wireless saves walking and lets you read a clamp closed inside an
          enclosure from a safe distance, which Fluke specifically calls out for the a283 FC. A stand-alone logger
          keeps working where there is no phone signal, no app login and no one watching, and the 289 tells you
          exactly how many intervals it can hold. For the general version of this trade-off between Fluke&apos;s
          wireless and logging meters, see{" "}
          <Link href="/multimeters/fluke-3000-fc-vs-fluke-289" className={link}>
            Fluke 3000 FC vs Fluke 289
          </Link>
          ; this page stays on PV commissioning against bench and industrial logging.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 283 FC vs 289 spec by spec</h2>
        <InfoCards
          items={[
            { label: "283 FC: 1500 V DC", desc: "CAT III 1500V on both meter and clamp." },
            { label: "283 FC: wireless 60 A", desc: "a283 FC clamp, AC and DC, 34 mm jaw." },
            { label: "283 FC: field-hardened", desc: "IP52, 2 m drop, -10 to 60 °C operating." },
            { label: "289: 50,000 counts", desc: "±(0.025% + 2) DC volts on the low ranges." },
            { label: "289: µA to 10 A", desc: "0.01 µA resolution and a 50 Ω range at 0.001 Ω." },
            { label: "289: on-meter graphs", desc: "TrendCapture over up to 10,000 intervals." },
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display resolution (log scale). More counts means finer steps on the same range.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 283 FC", value: 6000, display: "6,000 counts" },
                { label: "Fluke 289", value: 50000, display: "50,000 counts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest DC voltage each meter is ranged and CAT III rated for.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 1000, display: "1000 V" },
                { label: "Fluke 283 FC", value: 1500, display: "1500 V", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery life in hours (Fluke figures; the 283 FC numbers are typical minimums).</>}>
            <BarChart
              items={[
                { label: "283 FC linked to clamp", value: 100, display: ">100 h" },
                { label: "283 FC, no backlight", value: 150, display: ">150 h" },
                { label: "289, minimum", value: 100, display: "100 h" },
                { label: "289, logging mode", value: 200, display: "200 h", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Current measurement span (log scale): the 289 reaches far lower, the 283 FC&apos;s clamp far higher.</>}>
            <BarChart
              log
              items={[
                { label: "289 finest step", value: 0.00000001, display: "0.01 µA" },
                { label: "283 FC clamp step", value: 0.01, display: "0.01 A" },
                { label: "289 maximum", value: 10, display: "10 A in series" },
                { label: "283 FC clamp maximum", value: 60, display: "60 A, no break", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The two charts on current tell the story of each meter&apos;s customer. The 289 resolves a sleeping
          circuit&apos;s microamps or a contact&apos;s milliohms, which matters on a bench or in a control panel. The
          283 FC ignores that end of the scale and reads tens of amps of DC from a string conductor with no
          interruption, which matters on an array. One spec gap you should know about: Fluke states the 289&apos;s
          memory size but not the 283 FC&apos;s, so if you need a fixed number of hours of unattended recording at a
          fixed interval, only the 289 lets you plan that from the datasheet.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PV commissioning: where the 283 FC earns its place</h2>
        <p className="text-muted leading-7 mb-4">
          Commissioning a large array means repeating the same few checks on every string: polarity, open-circuit
          voltage, and current once the inverter is producing. The 283 FC/PV kit is shaped around that loop. The MC4
          leads plug into the string connectors, the polarity indicator sounds if a pair is reversed, and the user limit
          gauge flags any Voc outside the window you set for that string length, so a missing module jumps out. The
          a283 FC then reads string current at the combiner while the meter computes VA, and each reading is time-stamped
          for the turnover package. Sending results straight to the Fluke Connect app means the commissioning report can
          be assembled as you go, and ShareLive video calls let an engineer off site look at the same reading.
        </p>
        <p className="text-muted leading-7">
          The 289 cannot do this job on 1500 V systems at all, because its rating ends at 1000 V. On a residential
          array below 600 V it is safe to use, but every current reading needs the circuit opened, and it has no
          polarity alarm or pass/fail gauge. Our{" "}
          <Link href="/multimeters/fluke-283-fc-vs-fluke-87v" className={link}>
            Fluke 283 FC vs Fluke 87V
          </Link>{" "}
          comparison digs further into string voltage, cold-weather Voc and DC clamp technique.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bench and industrial logging: where the 289 wins</h2>
        <p className="text-muted leading-7 mb-4">
          Picture an intermittent nuisance trip on a 480 V control panel, or a battery-powered device that drains
          overnight. You want a meter that records unattended, catches the event and shows you when it happened. The
          289 does that on its own: set the interval, leave it, then scroll the TrendCapture graph on its screen to the
          dip or spike. Its 50,000-count display resolves small drifts the 283 FC&apos;s 6,000 counts would round
          away, its low-pass filter steadies readings on drive outputs, LoZ clears ghost voltage on long control runs,
          and its 500 µA range resolves 0.01 µA for sleep-current work. Frequency to 999.99 kHz and a thermocouple input
          round out a toolkit the 283 FC does not try to match.
        </p>
        <p className="text-muted leading-7">
          The 289&apos;s data path is older: an IR optical cable to FlukeView Forms on a PC rather than a phone app. For
          a maintenance tech who files reports from a desk, that is no hardship. For a deeper look at the 289 against
          its siblings, read{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          . Neither meter has been hands-on tested by us: the 289 is rated 4.7 and the 283 FC/PV kit 4.5, both from
          Fluke&apos;s published specs and their Amazon listings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 283 FC vs 289: which should you buy?</h2>
        <DataTable
          head={["Situation", "Choose", "Reason"]}
          rows={[
            ["Commissioning 1500 V utility or commercial strings", "Fluke 283 FC/PV kit", "Only one rated for 1500 V DC"],
            ["Sharing results live with a remote engineer", "Fluke 283 FC/PV kit", "Fluke Connect, cloud reports, ShareLive"],
            ["String current at a combiner box", "Fluke 283 FC/PV kit", "Wireless 60 A DC clamp, no circuit break"],
            ["Overnight recording of a fault, no phone nearby", "Fluke 289", "Documented 10,000-interval memory, on-screen graph"],
            ["Sleep current, shunts, PCB traces", "Fluke 289", "0.01 µA and 0.001 Ω resolution"],
            ["Drives, motors and control panels at 480 V", "Fluke 289", "LoZ, low-pass filter, 10 A input"],
            ["Solar service plus bench repair", "Both", "Neither covers the other's specialty"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Wireless solves distance; logging solves time">
            Choose the 283 FC when the problem is getting a reading from somewhere awkward or dangerous to stand, and
            getting it to someone else quickly. Choose the 289 when the problem is catching what a circuit does over
            hours while nobody watches. Remember that the 283 FC comes only as the 283 FC/PV kit on Amazon, and its
            clamp carries a one-year warranty while the meter and the 289 carry lifetime coverage.
          </KeyIdea>
        </div>
        <p className="text-muted leading-7 mt-4">
          For broader picks by job, see the{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            best multimeters for solar panel testing
          </Link>{" "}
          and our step-by-step guide on{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            testing a solar panel with a multimeter
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: match the meter to the system voltage, and never break live DC">
        Check the highest voltage the system can produce before you pick up either meter. The 289 is rated CAT III
        1000V / CAT IV 600V and must not be used on 1500 V PV strings; use the 283 FC with leads rated CAT III 1500V.
        PV modules produce voltage whenever light reaches them, so a string stays live in daylight even with the
        disconnect open. Never open an MC4 connector, fuse holder or conductor under load to insert a meter in series:
        a DC arc will not go out on its own. Read string current with a clamp. When you leave either meter logging
        inside an energized panel, route leads so the door closes without pinching them, keep the enclosure closed
        while it records, and follow your site&apos;s lockout and arc-flash rules. Call a qualified electrician or PV
        installer for anything damaged, scorched or tripping repeatedly.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 283 FC, which Amazon sells as the 283 FC/PV kit, if you commission or service solar and other DC systems: CAT III 1500V, a wireless 60 A AC/DC clamp, MC4 leads, polarity alerts and live trending in Fluke Connect. Buy the Fluke 289 if you need a stand-alone logger for industrial and bench work: 50,000 counts, a documented 10,000-interval memory with on-meter graphs, microamp and milliohm resolution, LoZ and a 10 A input, all up to 1000 V.",
  faqs: [
    {
      question: "Does the Fluke 283 FC log data like the Fluke 289?",
      answer:
        "Yes, but differently. Fluke says the 283 FC logs time- and date-stamped readings with a real-time clock and user-set duration and interval, and streams live trends to the Fluke Connect app. It does not state the memory size. The 289 documents up to 10,000 recording intervals and draws TrendCapture graphs on its own screen.",
    },
    {
      question: "Can the Fluke 289 be used on solar panels?",
      answer:
        "Only on systems that stay within its CAT III 1000V / CAT IV 600V rating, such as most residential arrays. It cannot be used on 1500 V strings. It also measures current only in series up to 10 A, so reading string current means opening the circuit, which is unsafe under load. A DC clamp is the safer method.",
    },
    {
      question: "Does the Fluke 289 have Fluke Connect or Bluetooth?",
      answer:
        "No. The 289 transfers stored data through an infrared optical cable to Fluke's FlukeView Forms software on a PC. The 283 FC uses Fluke Connect to send readings to a phone or tablet for live trending, cloud upload, shareable reports and ShareLive video calls, and its clamp links to the meter wirelessly too.",
    },
    {
      question: "Why is the Fluke 283 FC only sold as a kit on Amazon?",
      answer:
        "Amazon.com lists it only as the 283 FC/PV kit; we found no bare-meter listing. The kit makes sense because the 283 FC has no current jacks, so the included a283 FC clamp is its only way to read amps. The kit also adds Stäubli MC4 solar leads, TL175-HV leads, a case and a magnetic strap.",
    },
    {
      question: "Which is more accurate, the Fluke 283 FC or the 289?",
      answer:
        "The 289. It shows 50,000 counts and Fluke lists ±(0.025% + 2) DC volts on its lower ranges, against 6,000 counts and ±(0.09% + 3) on the 283 FC. The 289 also resolves 0.01 µA and 0.001 Ω. For PV string comparisons the 283 FC is precise enough; the 289's resolution matters for electronics and drift logging.",
    },
    {
      question: "Which meter is tougher for outdoor work?",
      answer:
        "Fluke rates the 283 FC meter and clamp IP52 with a 2 m drop rating and an operating range of -10 to 60 °C, which suits rooftops and solar fields. We did not find an IP or drop figure for the 289 in our Fluke sources. The 289 is better treated as a panel and bench logger than a field meter.",
    },
  ],
  roundup: { label: "See the best multimeters for solar panel testing", href: "/multimeters/best-multimeters-for-solar-panel-testing" },
  related: [
    { label: "Fluke 283 FC vs Fluke 87V", href: "/multimeters/fluke-283-fc-vs-fluke-87v" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "How to test a solar panel with a multimeter", href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter" },
    { label: "How to diagnose DC arc fault warnings in a solar inverter", href: "/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter" },
  ],
};

export default function Fluke283FcVsFluke289Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
