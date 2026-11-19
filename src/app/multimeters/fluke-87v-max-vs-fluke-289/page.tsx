// Specs per Fluke, checked 2026-11-19:
// - Fluke 87V MAX product page + spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
//   CAT IV 600V / CAT III 1000V (IEC 61010-2-033, Pollution Degree 2); 6,000-count display (4 updates/s),
//   19,999-count high-resolution mode, 32-segment analog bar graph; DC V 0.1 mV-1000 V, ±(0.05% + 1), 0.1 mV
//   resolution; True RMS AC V 0.1 mV-1000 V, ±(0.7% + 4), 20 kHz bandwidth with a low-pass filter; DC A 0.1 µA-10 A
//   (20 A for 30 s), ±(0.2% + 2), 0.1 µA resolution; True RMS AC A 0.1 µA-10 A, ±(1.0% + 2); resistance 0.1 Ω-50 MΩ,
//   ±(0.2% + 1); capacitance 0.01 nF-9,999 µF, ±(1% + 2); frequency 0.5 Hz-199.99 kHz, ±(0.005% + 1); temperature
//   -200.0 to 1090 °C excluding probe, -40 to 260 °C with the included 80BK-A probe; Min/Max/Avg recording and
//   250 µs Peak Min/Max capture (no on-screen logging or trend graph is listed); three AA batteries, about 800 h
//   typical without backlight; 698.5 g with holster; IP67 (IEC 60529); drop-tested to 4 m (13 ft); limited lifetime
//   warranty. Fluke 87V MAX Pick in src/lib/multimeter-catalog.ts cites the official Amazon listing B07YQSBJSB,
//   Amazon-buyable as of 2026-10-27.
// - Fluke 289 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-289
//   50,000-count, 1/4 VGA dot-matrix display with white backlight; DC V 50.000 mV-1000.0 V, 0.025% basic accuracy;
//   True RMS AC V 50.000 mV-1000.0 V, 0.4% basic accuracy, 100 kHz bandwidth; DC A 500.00 µA-10.000 A, 0.05% basic
//   (max 10 A, 20 A for 30 s); True RMS AC A 500.00 µA-10.000 A, 0.6% basic; resistance 50.000 Ω-500.0 MΩ, 0.05%
//   basic, plus a two-terminal 50.000 Ω low-ohm range at 1 mΩ resolution with a 10 mA source current (relative mode
//   removes lead resistance); capacitance 1.000 nF-100 mF, 1.0% basic; frequency 99.999 Hz-999.99 kHz, 0.005% basic;
//   temperature -200.0 to 1350.0 °C excluding probe, 1.0% basic; TrendCapture graphs a logged session on the meter
//   with up to 14x zoom, Min/Max/Avg, 250 µs Peak capture, a real-time clock for timestamps, and logging memory the
//   page states inconsistently as "up to 15,000 readings" in the specifications and "up to 10,000 recorded events"
//   in the features copy (both figures are Fluke's own, not reconciled here); six AA alkaline batteries, 100 h
//   minimum or 200 h in logging mode; 870.9 g; limited lifetime warranty. This page's fetch of fluke.com did not
//   restate a CAT rating; CAT IV 600V / CAT III 1000V is per the Fluke "287/289 True-rms Digital Multimeters Users
//   Manual" (Rev. 2, 3/09) hosted by RS Components (https://docs.rs-online.com/91c2/A700000015027554.pdf) and the
//   Fluke 289 Pick in src/lib/multimeter-catalog.ts, which cites fluke.com, the 289 datasheet and that manual and
//   notes the official Amazon listing B0012B51HI, Amazon-buyable as of 2026-10-24.
// Amazon ASIN check: fetching amazon.com/dp/B07YQSBJSB and amazon.com/dp/B0012B51HI directly returned HTTP 503
// (Amazon blocks this fetcher). A web search for each ASIN found no amazon.com result in the index, but turned up
// third-party retailers and a UPC (095969354103 for the 289) matching these exact models, and both ASINs already
// carry this site's own "Amazon-buyable" verification in src/lib/multimeter-catalog.ts, dated 2026-10-27 (87V MAX)
// and 2026-10-24 (289) - about three to four weeks before this page was written, so we rely on that record rather
// than re-asserting a fresh direct check we couldn't complete.
// Neither meter is hands-on tested by OhmSavvy (no handsOnTested field on either Pick); both are desk research
// against the sources above.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-max-vs-fluke-289";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 87V MAX vs Fluke 289: Real-Time or Logging Meter?",
  description:
    "Fluke 87V MAX vs Fluke 289: the MAX is Fluke's toughest real-time field meter (IP67, 4 m drop); the 289 adds 50,000 counts and on-screen TrendCapture logging.",
  image: all.find((p) => p.name === "Fluke 87V MAX")!.image,
  path,
});

const link = "text-accent hover:underline";

/**
 * Two meter screens side by side. The 87V MAX's bar graph and digits show only the present instant - nothing is
 * stored once you look away, aside from a Min/Max/Avg hold or a 250 µs peak. The 289's TrendCapture screen plots a
 * logged session you can scroll and zoom after the fact. Illustrative shapes, not real captures.
 */
function LiveGlanceVsLoggedSessionDiagram() {
  const barCount = 20;
  const barsOn = 13;
  return (
    <svg
      viewBox="0 0 340 215"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram comparing the Fluke 87V MAX's live-only display, a numeric reading plus a bar graph that shows nothing once you look away, with the Fluke 289's TrendCapture screen, which graphs a logged session that can be scrolled and zoomed after the fact"
    >
      {/* Left: 87V MAX live readout */}
      <g>
        <rect x="8" y="8" width="150" height="112" rx="8" className="fill-surface stroke-border" strokeWidth="1.3" />
        <rect x="18" y="18" width="130" height="46" rx="4" className="fill-[#0f1a14]" />
        <text x="138" y="48" fontSize="17" textAnchor="end" fill="#7CFC9A" fontFamily="ui-monospace, monospace">
          120.4
        </text>
        <text x="138" y="59" fontSize="8" textAnchor="end" fill="#7CFC9A">
          V
        </text>
        {Array.from({ length: barCount }, (_, i) => (
          <rect
            key={i}
            x={22 + i * 5.6}
            y="72"
            width="3.8"
            height="13"
            rx="1"
            className={i < barsOn ? "fill-accent" : "fill-border"}
          />
        ))}
        <text x="83" y="99" fontSize="7.5" textAnchor="middle" className="fill-muted">
          32-segment bar graph
        </text>
        <text x="83" y="112" fontSize="7.5" textAnchor="middle" className="fill-muted">
          redraws live, stores nothing
        </text>
      </g>
      <text x="83" y="138" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 87V MAX
      </text>
      <text x="83" y="153" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Min/Max/Avg hold or a 250 µs
      </text>
      <text x="83" y="165" fontSize="8.5" textAnchor="middle" className="fill-muted">
        peak - no graph, no memory
      </text>

      {/* Right: 289 TrendCapture */}
      <g>
        <rect x="182" y="8" width="150" height="112" rx="8" className="fill-surface stroke-border" strokeWidth="1.3" />
        <rect x="192" y="18" width="130" height="80" rx="4" className="fill-[#0f1a14]" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={192 + (i + 1) * 26} x2={192 + (i + 1) * 26} y1="18" y2="98" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
        ))}
        <polyline
          points="194,80 207,78 220,60 233,52 246,70 259,74 272,40 285,36 298,58 311,50 318,55"
          fill="none"
          stroke="#7CFC9A"
          strokeWidth="1.8"
        />
        <text x="196" y="94" fontSize="7" fill="#9fe3b4">
          08:00
        </text>
        <text x="318" y="94" fontSize="7" textAnchor="end" fill="#9fe3b4">
          16:00
        </text>
        <circle cx="309" cy="24" r="6.5" className="fill-none stroke-accent" strokeWidth="1.3" />
        <line x1="313.5" y1="28.5" x2="318" y2="33" className="stroke-accent" strokeWidth="1.3" strokeLinecap="round" />
        <text x="257" y="108" fontSize="7.5" textAnchor="middle" className="fill-muted">
          logged session, zoom to 14x
        </text>
      </g>
      <text x="257" y="138" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 289
      </text>
      <text x="257" y="153" fontSize="8.5" textAnchor="middle" className="fill-muted">
        TrendCapture graphs what
      </text>
      <text x="257" y="165" fontSize="8.5" textAnchor="middle" className="fill-muted">
        happened while you were gone
      </text>

      <text x="170" y="195" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Illustrative shapes, not real captures. Both meters are True RMS and rated CAT IV 600V / CAT III 1000V.
      </text>
      <text x="170" y="207" fontSize="8.5" textAnchor="middle" className="fill-muted">
        The gap between them is what happens after the reading: nothing, or a graph you can review later.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V MAX vs Fluke 289: Real-Time Meter or Logging Flagship?",
  path,
  published: "2026-11-19",
  intro:
    "The question isn't which Fluke has the better spec sheet - on paper the 289 wins most rows. It's whether you need to see a logged, graphed trend on the meter's own screen, or whether a fast analog-style bar graph and an instant reading are what you actually use on site. The Fluke 87V MAX is Fluke's toughest real-time field meter: IP67 sealed, drop-tested to 4 m, 800 hours on three AA cells, with Min/Max/Avg and a 250 µs peak catch but no logging memory. The Fluke 289 is the logging flagship: 50,000 counts, a 50 Ω low-ohm range and TrendCapture, which graphs a session on the meter itself so you can scroll and zoom it later. Neither is hands-on tested by OhmSavvy; every figure below comes from Fluke's own documentation.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX IP67-sealed True RMS industrial multimeter, front view",
    chooseIf: [
      "You want the fastest glance-and-go reading on site: a 32-segment bar graph and digits, nothing to review later",
      "Your meter gets dropped, rained on or left in a dusty panel - IP67 and a 4 m drop rating matter more than extra counts",
      "You need a 250 µs peak catch for contact bounce or a brief glitch while you're watching, not an unattended log",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 289")!,
    imageAlt: "Fluke 289 True RMS logging multimeter with TrendCapture, front view",
    chooseIf: [
      "You need to leave the meter connected and come back to a graphed trend of what happened, not just a held number",
      "You check contact or busbar resistance where a 50 Ω range at 1 mΩ resolution helps",
      "You want 50,000 counts and 0.025% basic DC accuracy for calibration-adjacent work, not just field troubleshooting",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts (4/s); 19,999 hi-res mode; 32-segment bar graph", b: "50,000 counts, 1/4 VGA dot matrix with backlight" },
    { label: "DC volts accuracy", a: "±(0.05% + 1)", b: "0.025% basic" },
    { label: "AC volts accuracy (True RMS)", a: "±(0.7% + 4), 20 kHz bandwidth with low-pass filter", b: "0.4% basic, 100 kHz bandwidth" },
    { label: "DC current", a: "0.1 µA to 10 A (20 A for 30 s), ±(0.2% + 2)", b: "500.00 µA to 10.000 A, 0.05% basic" },
    { label: "AC current (True RMS)", a: "±(1.0% + 2)", b: "0.6% basic" },
    { label: "Resistance", a: "0.1 Ω to 50 MΩ, ±(0.2% + 1)", b: "50.000 Ω to 500.0 MΩ, 0.05% basic" },
    { label: "Dedicated low-ohm range", a: "None listed", b: "50.000 Ω, 1 mΩ resolution, 10 mA source current, with REL" },
    { label: "Capacitance", a: "0.01 nF to 9,999 µF, ±(1% + 2)", b: "1.000 nF to 100 mF, 1.0% basic" },
    { label: "Frequency", a: "0.5 Hz to 199.99 kHz", b: "99.999 Hz to 999.99 kHz" },
    { label: "Temperature (excl. probe)", a: "-200.0 to 1090 °C; 80BK-A probe included (-40 to 260 °C)", b: "-200.0 to 1350.0 °C, 1.0% basic" },
    { label: "On-meter logging / trending", a: "None listed - Min/Max/Avg and 250 µs Peak Min/Max only", b: "TrendCapture graphs a logged session, zoom to 14x, real-time clock" },
    { label: "Logging memory", a: "Not applicable", b: "Fluke's page gives two figures: up to 15,000 readings (specs) or up to 10,000 events (features)" },
    { label: "Sealing / drop rating", a: "IP67; drop-tested to 4 m (13 ft)", b: "Not stated by Fluke" },
    { label: "Battery", a: "3 AA, about 800 h typical", b: "6 AA alkaline, 100 h minimum, 200 h in logging mode" },
    { label: "Weight", a: "698.5 g with holster", b: "870.9 g" },
    { label: "Warranty", a: "Limited lifetime", b: "Limited lifetime" },
    { label: "OhmSavvy status", a: "Desk research against Fluke's specs", b: "Desk research against Fluke's specs" },
  ],
  differences: [
    "Logging is the real split: the 87V MAX has no on-screen trend graph or logging memory, only Min/Max/Avg and a 250 µs Peak Min/Max catch. The 289's TrendCapture logs a session and graphs it on the meter, with zoom to 14x.",
    "Both are True RMS, so accuracy on the distorted current of an LED driver or switch-mode supply is equal on either meter.",
    "Ruggedness runs the other way: the 87V MAX is IP67 sealed and drop-tested to 4 m; Fluke doesn't publish an IP or drop figure for the 289.",
    "Battery life favors the MAX too - about 800 hours on three AA cells against the 289's 100 to 200 hours on six AA cells.",
    "The 289 shows far more resolution, 50,000 counts against the MAX's 6,000 (19,999 in high-resolution mode), and about ten times tighter basic DC accuracy.",
    "Only the 289 has a dedicated low-ohm range (50 Ω at 1 mΩ) and a wider temperature span (to 1350 °C instead of 1090 °C).",
    "Fluke's own 289 product page states two different logging-memory figures - 15,000 readings in the specifications and 10,000 events in the features text - a discrepancy we flag rather than pick a side on.",
    "Both carry the same CAT IV 600V / CAT III 1000V rating, though the 289's current product page doesn't restate it - we took that figure from Fluke's 287/289 Users Manual instead.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A glance, or a graph: what each screen actually shows</h2>
        <p className="text-muted leading-7 mb-4">
          Every spec on this page matters less than one practical question: what does the display do after you take
          a reading? On the 87V MAX, the digits and its 32-segment bar graph track the present instant and nothing
          more. Min/Max/Avg holds the extremes of a session while you watch, and Peak Min/Max catches an event as
          brief as 250 µs if you&apos;re standing there to trigger it. Walk away, and none of that is retained as a
          graph you can scroll back through.
        </p>
        <Figure
          caption={
            <>
              The 87V MAX&apos;s bar graph redraws live and stores nothing; the 289&apos;s TrendCapture screen plots
              a logged session you can scroll and zoom after the fact. Shapes are illustrative, not real captures.
            </>
          }
        >
          <LiveGlanceVsLoggedSessionDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 289 answers the same question differently. Leave it clipped to a circuit for a shift, and TrendCapture
          draws the whole session as a line you can zoom into up to 14 times, with a real-time clock stamping when
          each dip or spike happened. That turns &quot;it tripped sometime this morning&quot; into a graph you can
          point to. Neither approach is strictly better - they answer different jobs, which is the entire reason to
          read past the spec table before buying either meter.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V MAX vs 289 in numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum display counts. The 289 runs at 50,000 all the time; the MAX needs its hi-res mode to reach 19,999.</>}>
            <BarChart
              items={[
                { label: "87V MAX (normal)", value: 6000, display: "6,000" },
                { label: "87V MAX (hi-res)", value: 19999, display: "19,999" },
                { label: "Fluke 289", value: 50000, display: "50,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>True RMS AC bandwidth with the low-pass filter engaged. The 289 reads five times higher.</>}>
            <BarChart
              items={[
                { label: "87V MAX", value: 20, display: "20 kHz" },
                { label: "Fluke 289", value: 100, display: "100 kHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life in hours. The MAX's figure assumes no logging; the 289's lower number is its logging-mode minimum.</>}>
            <BarChart
              items={[
                { label: "289 (logging)", value: 200, display: "200 h" },
                { label: "87V MAX", value: 800, display: "800 h", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Capacitance ceiling, log scale. The 289's 100 mF is roughly ten times the MAX's 9,999 µF.</>}>
            <BarChart
              log
              items={[
                { label: "87V MAX", value: 9999, display: "9,999 µF" },
                { label: "Fluke 289", value: 100000, display: "100 mF", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          None of these numbers describe logging directly - they describe resolution, bandwidth, endurance and
          range. The MAX wins battery life because it has nothing to log; the 289 wins almost every measurement
          ceiling because logging and documentation are its job. Read them as two different design briefs, not one
          meter winning and the other losing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter can and can&apos;t do</h2>
        <DataTable
          head={["Capability", "Fluke 87V MAX", "Fluke 289"]}
          rows={[
            ["Live numeric reading + fast bar graph", "Yes, 32-segment bar graph", "Yes, but the bar graph isn't the headline feature"],
            ["Hold a session's Min/Max/Avg", "Yes", "Yes"],
            ["Catch a sub-millisecond glitch while watching", "Yes, 250 µs Peak Min/Max", "Yes, 250 µs Peak capture"],
            ["Log an unattended session and graph it on-screen", "No - not listed by Fluke", "Yes, TrendCapture, zoom to 14x"],
            ["Timestamp readings with a real-time clock", "No - not listed by Fluke", "Yes"],
            ["Survive a 4 m drop or a dusty, wet site (IP67)", "Yes", "Not stated by Fluke"],
            ["Resolve milliohm-level resistance for contacts/busbars", "No dedicated low-ohm range", "Yes, 50 Ω range at 1 mΩ"],
            ["Run all day on common batteries without a logging drain", "Yes, about 800 h on 3 AA", "Yes for field use, but logging mode halves its already-shorter life"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Peak Capture and TrendCapture solve different problems">
            Peak Min/Max (on both meters) answers &quot;how big was that glitch I just saw?&quot; TrendCapture (289
            only) answers &quot;what happened while I wasn&apos;t looking?&quot; If your fault only shows up when
            you&apos;re standing at the panel, the MAX&apos;s speed and toughness matter more. If it shows up at 3
            a.m. or over a whole shift, only the 289&apos;s logging answers it.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Why"]}
          rows={[
            ["Daily panel and equipment troubleshooting", "Fluke 87V MAX", "Fast bar graph, instant reading, built to survive the day"],
            ["Intermittent fault with no fixed schedule", "Fluke 289", "TrendCapture logs and graphs the whole session"],
            ["Site is wet, dusty, or the meter gets dropped", "Fluke 87V MAX", "IP67 and a 4 m drop rating; the 289 states neither"],
            ["Proving a power-quality complaint to a customer", "Fluke 289", "An on-screen graph you can show, timestamped"],
            ["Bolted joint, breaker contact or shunt checks", "Fluke 289", "50 Ω range at 1 mΩ resolution"],
            ["Brief contact bounce or a glitch you want to catch live", "Either", "Both specify 250 µs peak capture"],
            ["Long day with limited battery access", "Fluke 87V MAX", "About 800 h on 3 AA vs the 289's 100-200 h on 6 AA"],
            ["Calibration-adjacent bench work needing tight DC accuracy", "Fluke 289", "0.025% basic DC vs ±(0.05% + 1)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 87V MAX if logging or documentation is actually your job - no setting turns on a trend graph it
          doesn&apos;t have. Skip the 289 if your meter needs to survive drops, dust and rain on site; Fluke
          publishes no IP or drop rating for it, and six AA cells with a logging-mode drain is a heavier, shorter-
          lived power budget than the MAX&apos;s three. For electronics-bench work rather than field troubleshooting,
          see our{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>
          , which ranks the 289 alongside its siblings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy or skip each meter</h2>
        <InfoCards
          items={[
            { label: "Buy the 87V MAX", desc: "Field techs and electricians who need a tough, fast meter and don't need it to log anything." },
            { label: "Skip the 87V MAX", desc: "If you need unattended logging or a graphed trend - it has neither." },
            { label: "Buy the 289", desc: "Maintenance and controls techs documenting trends, resistance checks or calibration-grade accuracy." },
            { label: "Skip the 289", desc: "If your site is rough on gear; Fluke states no IP or drop rating for it." },
            { label: "Residential only", desc: "Neither - a CAT III 600V meter like the Fluke 117 covers homes for far less." },
            { label: "Need both toughness and logging", desc: "No single Fluke under this price does both; see chooseNeitherIf below." },
          ]}
        />
      </section>

      <Callout title="Same rating, same precautions on either meter">
        CAT IV 600V / CAT III 1000V covers the service entrance and meter base on both meters, but a rating isn&apos;t
        a substitute for PPE, lockout/tagout, or proving a meter on a known live source before and after you check a
        circuit is dead. Logging the 289 unattended on an energized circuit doesn&apos;t remove the need to isolate
        and verify before you connect or disconnect leads.
      </Callout>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How we checked this</h2>
        <p className="text-muted leading-7 mb-4">
          Every figure above comes from Fluke&apos;s own product pages and, for the 289&apos;s CAT rating, its
          287/289 Users Manual, cited in the comment block at the top of this page&apos;s source file. OhmSavvy
          hasn&apos;t bought or bench-tested either meter, so neither carries our Hands-on Tested badge - both
          columns are desk research against the manufacturer&apos;s documentation, not a measurement we made
          ourselves.
        </p>
        <p className="text-muted leading-7">
          We also couldn&apos;t directly re-verify either Amazon listing today: fetching both product pages returned
          an HTTP error, and a web search for each ASIN surfaced third-party retailers and a matching UPC rather than
          an amazon.com result. Both ASINs already carry this site&apos;s own Amazon-buyable verification from the
          past month in our multimeter catalog, which is what this page relies on. If toughness without logging is
          the deciding factor, our{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v-max" className={link}>
            Fluke 28 II vs Fluke 87V MAX
          </Link>{" "}
          comparison looks at another sealed, drop-rated option.
        </p>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You need both IP67 ruggedness and on-screen session logging in the same handheld, and no current Fluke model under this price combines them - the sealed, drop-rated meters (87V MAX, 28 II) skip logging, and the loggers (289, 287, 1587 FC) don't publish an IP or drop rating. If you genuinely need both, plan on a rugged field meter for daily use plus a separate clamp-on logger or power-quality recorder for the sessions that need a graph.",
  bottomLine:
    "Buy the Fluke 87V MAX if your work is live, hands-on troubleshooting in rough conditions: the same CAT IV 600V protection, a fast analog-style bar graph, IP67 sealing, a 4 m drop rating and about 800 hours per set of batteries, with no logging to speak of. Buy the Fluke 289 if you need to record and graph what a circuit does while you're not watching, check milliohm-level contacts, or want 50,000 counts and tighter basic accuracy. It's the documentation and precision meter, not a tougher 87V.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 87V MAX and the Fluke 289?",
      answer:
        "Toughness versus logging. The 87V MAX is IP67 sealed, drop-tested to 4 m, and runs about 800 hours on three AA batteries, but its recording is limited to Min/Max/Avg and a 250 µs Peak Min/Max catch - Fluke lists no on-screen logging or trend graph for it. The 289 has no published IP or drop rating but adds TrendCapture, which graphs a logged session on the meter with up to 14x zoom, plus 50,000 counts and a dedicated low-ohm range.",
    },
    {
      question: "Does the Fluke 87V MAX have TrendCapture or any data logging?",
      answer:
        "Not according to Fluke's current 87V MAX product page, which lists Min/Max/Avg recording and 250 µs Peak Min/Max capture but no TrendCapture, logging memory, or real-time clock. If you need to leave a meter connected and review a graphed trend afterward, that is the Fluke 289's job, not the 87V MAX's.",
    },
    {
      question: "Is the Fluke 289 as rugged as the Fluke 87V MAX?",
      answer:
        "Not by the numbers Fluke publishes. The 87V MAX states IP67 sealing and a 4-meter drop rating; Fluke's 289 page states neither. That doesn't prove the 289 is fragile, but it means a buyer choosing for wet, dusty or drop-prone work has a published figure for the MAX and none for the 289.",
    },
    {
      question: "Which has better basic accuracy, the 87V MAX or the 289?",
      answer:
        "The 289 on paper: Fluke lists 0.025% basic DC accuracy for the 289 against ±(0.05% + 1) for the 87V MAX, and the 289 displays up to 50,000 counts against the MAX's 19,999 in high-resolution mode. For everyday troubleshooting both are far tighter than the job needs; the gap matters most for calibration-adjacent work or spotting slow drift.",
    },
    {
      question: "Can I get both the 87V MAX's ruggedness and the 289's logging in one meter?",
      answer:
        "Not from Fluke's current lineup, based on the specifications in this comparison. The sealed, drop-rated meters (87V MAX, 28 II) don't publish logging or trend-graph features, and the logging meters (289, 287, 1587 FC) don't publish an IP or drop rating. If you need both regularly, expect to carry a rugged field meter alongside a separate logger rather than one meter that does everything.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 289 review", href: "/multimeters/fluke-289-review" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke87VMaxVsFluke289Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
