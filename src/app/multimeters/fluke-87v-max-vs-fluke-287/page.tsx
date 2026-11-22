// Specs per Fluke, checked 2026-11-19 (fluke.com spec tabs fetched directly):
// - Fluke 87V MAX product + spec page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
//   CAT IV 600V / CAT III 1000V (IEC 61010-2-033); 6,000 counts (4/s), 19,999 counts hi-res mode;
//   DC V ±(0.05% + 1); AC V ±(0.7% + 4) True RMS, 20 kHz bandwidth with low-pass filter (3 dB at 1 kHz);
//   DC A ±(0.2% + 2) / AC A ±(1.0% + 2), 0.1 µA to 10 A (20 A for 30 s); 32-segment analog bar graph at 40/s;
//   resistance 0.1 Ω to 50 MΩ; capacitance 0.01 nF to 9,999 µF; frequency 0.5 Hz to 199.99 kHz; duty cycle to
//   99.9%; conductance to 60.00 nS; Min/Max/Avg (no response time stated) and 250 µs Peak Min/Max — no data
//   logging or TrendCapture is listed anywhere on the page; temperature -200.0 to 1090 °C excluding probe,
//   80BK-A probe included; operating -15 to 55 °C (to -40 °C for 20 min from 20 °C); IP67 (IEC 60529); drop-tested
//   to 4 m (13 ft); three AA cells, 800 h typical without backlight; 6.0 x 10.1 x 21.5 cm and 698.5 g with
//   holster; TL175 TwistGuard leads and AC175 clips included; limited lifetime warranty. LoZ not listed.
// - Fluke 287 product + spec page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-287
//   50,000-count 1/4 VGA white-backlit display; max 1000 V between any terminal and earth ground on the spec page
//   (CAT IV 600V / CAT III 1000V per the shared 287/289 manual and this site's multimeter-catalog.ts, both cited
//   below — the live product page doesn't restate the CAT table); DC V 0.025% basic; AC V 0.4% basic True RMS;
//   DC A 0.05% basic / AC A 0.6% basic, 500.00 µA to 10.000 A (20 A for 30 s); 500.00 µA range resolves 0.01 µA,
//   5000.0 µA range 0.1 µA (resolution inferred from displayed digits, not a separate spec line); no analog bar
//   graph listed; resistance 500.00 Ω to 500.0 MΩ; capacitance 1.000 nF to 100 mF; frequency 99.999 Hz (table) /
//   0.5 Hz (overview, conflict as stated) to 999.99 kHz; duty cycle 0.01-99.99%; conductance 50.00 nS; temperature
//   -200.0 to 1350.0 °C excluding probe — no thermocouple probe is in the included-accessories list (TL71 leads,
//   AC175 clips, amp jack plugs, quick reference guide only); Min/Max/Avg and 250 µs Peak Min/Max; TrendCapture:
//   on-board graphing of logged data, interval/event recording, log to PC — spec table says "up to 10,000
//   readings," overview says "up to 15,000 recorded events" (conflict as stated on Fluke's own page); no LoZ, and
//   the page's "selectable AC filter" is a smoothing mode, not the true low-pass filter the manual reserves for
//   the 289; 6 AA cells, 100 h minimum / 200 h logging mode; 22.2 x 10.2 x 6.0 cm, 870.9 g; limited lifetime
//   warranty.
// - CAT rating + cross-check for the 287: src/lib/multimeter-catalog.ts ("Specs per fluke.com (Fluke 287 page),
//   the 287 datasheet and the 287/289 Users Manual... CAT IV 600V / CAT III 1000V") and the Fluke "287/289 True-rms
//   Digital Multimeters Users Manual" (June 2007, Rev. 2, 3/09) as hosted by RS Components:
//   https://docs.rs-online.com/91c2/A700000015027554.pdf ("1000 V CAT III / 600 V CAT IV"; TrendCapture graphing,
//   logging memory and real-time clock are shared by both 287 and 289 — only the 50 Ω low-ohm range, LoZ and the
//   AC low-pass filter are "Model 289 only"). Also cross-checked against src/app/multimeters/fluke-289-vs-fluke-287
//   and src/app/multimeters/fluke-287-vs-fluke-87v, both already on this site and citing the same manual.
// - Pricing context (not a Fluke spec; cited for the "which tier" framing only, hedged as third-party and
//   subject to change): Transcat lists the 87V MAX at a $654.99 list price (https://www.transcat.com/fluke-87v-max-true-rms-digital-multimeter);
//   ShopSavvy cites a Fluke 287 "original list price of $579.99" (https://shopsavvy.com/deals/167fc24c-0b03-41c4-8fc8-cecda99b1401).
// - ASIN confirmation: WebFetch of https://www.amazon.com/dp/B07YQSBJSB and https://www.amazon.com/dp/B0015PMU8E
//   returned HTTP 503 from Amazon's bot defenses, so buyability was confirmed by web search instead. Multiple
//   independent retailer/distributor pages (Transcat, Best Buy, govets, RS Online, valuetronics) identify
//   B07YQSBJSB as "FLUKE-87V-MAX" / UPC 095969926287; Slickdeals and ShopSavvy deal posts (dated within the last
//   ~3 months) show B0015PMU8E's Fluke 287 listing active on Amazon.com with a live price. Both ASINs also match
//   the Amazon main-image photos already verified for the Fluke 87V MAX and Fluke 287 Picks in
//   src/lib/multimeter-catalog.ts (verifiedAt 2026-10-24 and 2026-10-27, both "Amazon-buyable").
// - Picks catalog: both "Fluke 87V MAX" and "Fluke 287" are entries in multimeterCatalogPicks
//   (src/lib/multimeter-catalog.ts), not in the curated `picks` array exported by best-multimeters/page.tsx — so
//   this page imports getAllPicks("multimeters") from @/lib/catalog (the same pattern already used by
//   fluke-87v-vs-fluke-87v-max, fluke-289-vs-fluke-287 and fluke-287-vs-fluke-87v) rather than `picks` from
//   best-multimeters/page, which doesn't contain either product. Neither catalog entry sets handsOnTested, so
//   ProductComparison's own honesty line renders "Desk research, not bench testing" for this pairing — correct,
//   since OhmSavvy has not hands-on tested either meter.
// - Framing note: this page's angle is the 87V MAX's live 32-segment analog bar graph and IP67/4 m-drop field
//   case (and no logging at all) against the 287's 50,000-count TrendCapture logging memory and tighter bench
//   accuracy (and no bar graph, no IP/drop rating). That is the real, sourced split in Fluke's own spec pages.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-87v-max-vs-fluke-287";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 87V MAX vs Fluke 287: Bargraph or Logging?",
  description:
    "Fluke 87V MAX vs Fluke 287: rugged IP67 and a live 32-segment bar graph versus 50,000-count TrendCapture logging. Specs, charts and which to buy.",
  image: all.find((p) => p.name === "Fluke 87V MAX")!.image,
  path: "/multimeters/fluke-87v-max-vs-fluke-287",
});

const link = "text-accent hover:underline";

/**
 * The two meters' real split: a live analog bar graph that refreshes 40 times a second and keeps nothing (87V MAX),
 * against a digital trend graph built from logged intervals you can scroll back through later (287). Neither meter
 * does both.
 */
function BargraphVsTrendDiagram() {
  return (
    <svg
      viewBox="0 0 380 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram comparing two displays. Left: the Fluke 87V MAX's 32-segment analog bar graph, refreshing 40 times a second, with a note that nothing it shows is stored once the needle moves on. Right: the Fluke 287's digital trend graph, built from logged readings over hours, with a note that it has no analog bar graph at all."
    >
      <rect x="10" y="10" width="170" height="210" rx="10" className="fill-surface-raised stroke-border" strokeWidth="1" />
      <text x="95" y="32" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 87V MAX
      </text>
      <text x="95" y="47" fontSize="8.5" textAnchor="middle" className="fill-muted">
        32-segment bar graph, 40/s
      </text>
      {Array.from({ length: 24 }).map((_, i) => {
        const lit = i < 17;
        const x = 24 + i * 6;
        return <rect key={i} x={x} y="110" width="4.4" height="26" rx="1" className={lit ? "fill-accent" : "fill-border"} />;
      })}
      <text x="95" y="158" fontSize="8.5" textAnchor="middle" className="fill-muted">
        segments move live with the signal
      </text>
      <path d="M30 185 q65 -22 130 0" className="fill-none stroke-accent" strokeWidth="1.6" strokeDasharray="2 3" />
      <text x="95" y="205" fontSize="8.5" textAnchor="middle" className="fill-foreground" fontWeight="600">
        No memory — this instant only
      </text>

      <rect x="200" y="10" width="170" height="210" rx="10" className="fill-surface-raised stroke-border" strokeWidth="1" />
      <text x="285" y="32" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 287
      </text>
      <text x="285" y="47" fontSize="8.5" textAnchor="middle" className="fill-muted">
        TrendCapture, up to 10,000 intervals
      </text>
      <line x1="220" y1="155" x2="350" y2="155" className="stroke-border" strokeWidth="1" />
      <line x1="220" y1="65" x2="220" y2="155" className="stroke-border" strokeWidth="1" />
      <path
        d="M220 120 L237 118 L254 95 L271 130 L288 108 L305 140 L322 100 L339 112 L350 102"
        className="fill-none stroke-accent"
        strokeWidth="2"
      />
      <text x="285" y="172" fontSize="8.5" textAnchor="middle" className="fill-muted">
        time, logged at a set interval
      </text>
      <text x="285" y="205" fontSize="8.5" textAnchor="middle" className="fill-foreground" fontWeight="600">
        No analog bar graph at all
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 87V MAX vs Fluke 287: Which Should You Buy?",
  path,
  published: "2026-11-19",
  intro:
    "These two Flukes sit in different corners of the same CAT IV 600V / CAT III 1000V safety class, and the choice between them comes down to one question: do you want to watch a signal change right now, or do you want a record of how it changed over hours or days? The Fluke 87V MAX answers the first question with a 32-segment analog bar graph that refreshes 40 times a second, an IP67 case drop-tested to 4 m, and a 0.05% DC core — but Fluke's own spec page lists no data logging or TrendCapture on it at all. The Fluke 287 answers the second with 50,000-count TrendCapture logging (up to 10,000 recorded intervals, graphed on the meter and exportable over IR to a PC) and a tighter 0.025% DC core — but no analog bar graph and no IP or drop rating. Neither meter has been hands-on tested by OhmSavvy; every number below comes from Fluke's spec pages and manual, cited above.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX rugged True RMS multimeter with analog bar graph, front view",
    chooseIf: [
      "You need to watch a reading settle or swing in real time, not just see a final number",
      "You work outdoors, on ladders or on a shop floor where IP67 sealing and a 4 m drop rating matter",
      "You want a thermocouple probe in the box and a low-pass filter for VFD work, with no logging to manage",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 287")!,
    imageAlt: "Fluke 287 True RMS electronics logging multimeter with TrendCapture, front view",
    chooseIf: [
      "You need a record of a reading over an afternoon, overnight or longer, not just a snapshot",
      "You work at a bench, not in the field, and don't need a sealed or drop-rated case",
      "0.01 µA resolution and 0.025% DC accuracy matter more to you than a live bar graph",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts (4/s); 19,999 hi-res mode", b: "50,000 counts, 1/4 VGA backlit" },
    { label: "Analog bar graph", a: "32 segments, 40 updates/s", b: "Not listed" },
    { label: "Data logging / TrendCapture", a: "Not listed — Min/Max/Avg and 250 µs Peak only", b: "Yes — up to 10,000 logged intervals (table) / 15,000 events (overview), on-screen graph, IR link to PC" },
    { label: "DC volts accuracy", a: "±(0.05% + 1)", b: "0.025% basic" },
    { label: "AC volts accuracy", a: "±(0.7% + 4) True RMS", b: "0.4% basic True RMS" },
    { label: "Current range", a: "0.1 µA to 10 A (20 A for 30 s)", b: "500 µA to 10 A (20 A for 30 s); 0.01 µA resolution on the 500 µA range" },
    { label: "Resistance", a: "0.1 Ω to 50 MΩ", b: "500.00 Ω to 500 MΩ" },
    { label: "Capacitance", a: "0.01 nF to 9,999 µF", b: "1 nF to 100 mF" },
    { label: "Frequency / duty cycle", a: "0.5 Hz to 199.99 kHz / to 99.9%", b: "To 999.99 kHz / 0.01–99.99%" },
    { label: "Temperature", a: "-200 to 1090 °C excl. probe; 80BK-A probe included", b: "-200 to 1350 °C excl. probe; no probe in the box" },
    { label: "Low-pass filter (VFD)", a: "Yes, 3 dB at 1 kHz", b: "No — a selectable smoothing mode, not a true filter" },
    { label: "LoZ", a: "Not listed", b: "Not listed (289 only, per the shared manual)" },
    { label: "Sealing / drop rating", a: "IP67; drop-tested to 4 m", b: "Not rated" },
    { label: "Battery", a: "3× AA, 800 h typical", b: "6× AA, 100 h minimum / 200 h logging" },
    { label: "Size / weight", a: "6.0 × 10.1 × 21.5 cm, 698.5 g (with holster)", b: "22.2 × 10.2 × 6.0 cm, 870.9 g" },
    { label: "Warranty", a: "Limited lifetime", b: "Limited lifetime" },
  ],
  differences: [
    "Logging: the 287 has TrendCapture — interval and event logging, an on-screen trend graph and an IR link to FlukeView Forms on a PC. Fluke's 87V MAX spec page lists no logging feature of any kind, only Min/Max/Avg and 250 µs Peak Capture.",
    "Analog bar graph: only the 87V MAX has one — 32 segments refreshing 40 times a second, useful for following a signal by eye. Fluke doesn't list a bar graph for the 287 at all.",
    "Ruggedness: the 87V MAX is IP67-sealed and drop-tested to 4 m. The 287 carries no IP or drop rating — it's built for a bench, not a job site.",
    "Precision and resolution: the 287's 0.025% basic DC accuracy and 50,000-count display are tighter than the 87V MAX's ±(0.05% + 1) and 6,000/19,999-count display, and its 500 µA range resolves 0.01 µA.",
    "Temperature probe: the 87V MAX ships with an 80BK-A thermocouple probe. The 287's box (TL71 leads, AC175 clips, amp jack plugs) has no probe, so its wider -200 to 1350 °C range needs one bought separately.",
    "Shared ground: both are CAT IV 600V / CAT III 1000V, both measure True RMS, both have 250 µs Peak Capture and Min/Max/Avg, both top out at 10 A (20 A for 30 s), and both carry a limited lifetime warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Same safety class, two different jobs</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters clear CAT IV 600V and CAT III 1000V, both read True RMS, and both share Fluke&apos;s 250 µs Peak
          Capture for catching a fast glitch. Past that, they diverge on purpose. The 87V MAX is a field and
          industrial meter: sealed to IP67, drop-tested to 4 m, backlit keypad, and an analog bar graph built to be
          read while you&apos;re also holding a probe and a flashlight. The 287 is a bench meter for electronics work:
          a 50,000-count screen, tighter accuracy, a 0.01 µA range, and TrendCapture to leave running on a desk while
          you do something else.
        </p>
        <p className="text-muted leading-7">
          Neither meter has been hands-on tested by OhmSavvy — we haven&apos;t bought and run either one on a bench or
          a job site, so every spec on this page comes from Fluke&apos;s own product pages and the shared 287/289
          manual, cited at the top of this file. Where Fluke&apos;s own pages disagree with each other (the 287&apos;s
          logging capacity is &quot;10,000 readings&quot; on one tab and &quot;15,000 recorded events&quot; on another), we
          say so rather than pick one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bar graph or trend graph: pick one</h2>
        <p className="text-muted leading-7 mb-4">
          This is the real split between these two meters, and it doesn&apos;t show up clearly on a spec sheet unless
          you read both pages closely. The 87V MAX&apos;s 32-segment bar graph updates 40 times a second so you can see
          a reading climb, settle or flicker in real time — but once a segment moves, that moment is gone; nothing is
          stored. The 287 has no bar graph for that at all. Instead, TrendCapture logs a reading at a set interval
          (Fluke&apos;s own numbers for the capacity disagree, at &quot;up to 10,000 readings&quot; or &quot;up to 15,000
          recorded events&quot;) and draws it as a graph you can scroll and zoom on the meter itself, or pull into
          FlukeView Forms over the infrared link.
        </p>
        <Figure caption={<>Fluke&apos;s own spec pages: the 87V MAX has a live bar graph and no logging; the 287 has logging and no bar graph. Neither has both.</>}>
          <BargraphVsTrendDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If what you actually need is a field-rugged meter that also logs, this family doesn&apos;t have one: the
          287&apos;s sibling, the Fluke 289, adds a 50 Ω low-ohm range, LoZ and a true low-pass filter per the shared
          manual, but it carries no IP or drop rating either. See our{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-287" className={link}>
            Fluke 289 vs Fluke 287
          </Link>{" "}
          comparison for that pair.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V MAX vs 287 in numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Display resolution, in counts. The 287&apos;s 50,000-count screen resolves far finer than the MAX&apos;s base 6,000 (19,999 in hi-res mode).</>}>
            <BarChart
              items={[
                { label: "87V MAX", value: 6000, display: "6,000" },
                { label: "Fluke 287", value: 50000, display: "50,000", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top resistance range, log scale. The 287 reaches ten times higher.</>}>
            <BarChart
              log
              items={[
                { label: "87V MAX", value: 50, display: "50 MΩ" },
                { label: "Fluke 287", value: 500, display: "500 MΩ", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Top capacitance range in µF, log scale (287&apos;s 100 mF = 100,000 µF). A ten-fold gap for bulk and supercapacitors.</>}>
            <BarChart
              log
              items={[
                { label: "87V MAX", value: 9999, display: "9,999 µF" },
                { label: "Fluke 287", value: 100000, display: "100 mF", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Guaranteed battery floor, in hours. The 87V MAX&apos;s 800 h is typical without backlight; the 287&apos;s 100 h is Fluke&apos;s stated minimum (200 h in logging mode).</>}>
            <BarChart
              items={[
                { label: "87V MAX", value: 800, display: "800 h", highlight: true },
                { label: "Fluke 287", value: 100, display: "100 h min" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The accuracy gap plays out the same way it does on other Fluke pairs: take a 12.60 V DC bus on the 87V
          MAX&apos;s 60.00 V range and its ±(0.05% + 1) works out to about ±0.016 V. The same reading on the 287&apos;s
          0.025% basic accuracy (its ranges run in 0.00001 V to 1000.0 V steps) comes out tighter still. Both are far
          more than enough for &quot;is it charged,&quot; and only the 287 is tight enough to matter on a calibration
          bench.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter can and can&apos;t do</h2>
        <InfoCards
          items={[
            { label: "87V MAX: can", desc: "Live 32-segment bar graph, IP67 sealing, 4 m drops, included temp probe, VFD low-pass filter." },
            { label: "87V MAX: can't", desc: "Log a reading over time. No TrendCapture, no interval memory, no PC export." },
            { label: "287: can", desc: "TrendCapture logging, on-screen trend graph, IR export to FlukeView Forms, 0.01 µA resolution." },
            { label: "287: can't", desc: "Show a live analog bar graph, survive a 4 m drop, or claim an IP rating." },
          ]}
        />
        <div className="mt-6">
          <DataTable
            head={["Capability", "Fluke 87V MAX", "Fluke 287"]}
            rows={[
              ["Analog bar graph", "Yes — 32 segments, 40/s", "No"],
              ["Data logging / TrendCapture", "No", "Yes — up to 10,000 intervals"],
              ["On-screen trend graph", "No", "Yes"],
              ["PC link for logged data", "No", "Yes, IR to FlukeView Forms"],
              ["IP rating", "IP67", "Not rated"],
              ["Drop rating", "4 m", "Not rated"],
              ["Low-pass filter (true 1 kHz)", "Yes", "No (smoothing mode only)"],
              ["Thermocouple probe included", "Yes, 80BK-A", "No"],
              ["Display counts", "6,000 (19,999 hi-res)", "50,000"],
            ]}
          />
        </div>
        <KeyIdea title="A bar graph and a trend graph solve different problems">
          A bar graph helps you tune something by hand — centering a pot, watching a voltage settle as you adjust a
          load — because it moves as fast as you do. A trend graph helps you catch something you can&apos;t watch,
          like a supply that sags for ten minutes once a day. Neither replaces the other, and this pair of meters
          doesn&apos;t let you have both at once.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 87V MAX or 287: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Field service, panels, outdoor and plant work", "Fluke 87V MAX", "IP67, 4 m drop rating, live bar graph"],
            ["Bench electronics, sleep-current and PCB work", "Fluke 287", "0.01 µA range, 50,000 counts, logging"],
            ["Tuning a circuit by hand, watching it settle", "Fluke 87V MAX", "Fast analog bar graph"],
            ["Catching an intermittent fault over hours", "Fluke 287", "TrendCapture with interval logging"],
            ["Motor, VFD or drive troubleshooting", "Fluke 87V MAX", "True low-pass filter and rugged case"],
            ["Calibration-adjacent bench work", "Fluke 287", "Tighter 0.025% basic DC accuracy"],
            ["Furnace or duct temperature checks today", "Fluke 87V MAX", "80BK-A probe is already in the box"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the standard (non-MAX) 87V against the 287, see{" "}
          <Link href="/multimeters/fluke-287-vs-fluke-87v" className={link}>
            Fluke 287 vs Fluke 87V
          </Link>
          ; for the 87V MAX against the standard 87V, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs Fluke 87V MAX
          </Link>
          . For electronics-bench alternatives at other prices, our{" "}
          <Link href="/multimeters/best-multimeters-for-electronics-repair" className={link}>
            best multimeters for electronics repair
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
            best multimeters for measuring microamps
          </Link>{" "}
          guides compare both against Brymen and UNI-T options.
        </p>
      </section>

      <Callout title="Neither meter here has been hands-on tested by OhmSavvy">
        We haven&apos;t bought and run either the 87V MAX or the 287 on a bench or in the field, so this page is desk
        research built from Fluke&apos;s own spec pages and manual, not a hands-on comparison. Where Fluke&apos;s pages
        disagree with themselves — the 287&apos;s logging capacity, or the frequency-range floor between its overview
        and spec table — we&apos;ve stated the conflict rather than guess at a single number. Treat ratings like CAT IV
        and IP67 as the manufacturer&apos;s own claim, and keep leads, probes and the case intact if safety depends on them.
      </Callout>
    </>
  ),
  chooseNeitherIf:
    "You want one meter that's both IP67/drop-rated for the field and fully logging with TrendCapture. Neither this pair nor the 287's sibling, the Fluke 289, covers that combination — the 289 adds a low-ohm range, LoZ and a true low-pass filter over the 287, but it carries no IP or drop rating either. You'd need two meters, or a lower bar on one requirement.",
  bottomLine:
    "Buy the Fluke 87V MAX if your work happens outdoors, on a ladder or on a plant floor, and you want to watch a reading move in real time on a rugged, sealed meter — it has no logging at all. Buy the Fluke 287 if your work happens at a bench, you want a record of a reading over hours or days, and you'll trade the live bar graph and the rugged case for a 50,000-count screen, 0.01 µA resolution and TrendCapture.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 87V MAX and the Fluke 287?",
      answer:
        "The 87V MAX is a rugged IP67, 4 m-drop-rated field meter with a live 32-segment analog bar graph and no data logging of any kind. The 287 is a 50,000-count bench meter with TrendCapture logging (up to 10,000 logged intervals per Fluke's spec table, graphed on-screen and exportable over infrared) but no analog bar graph and no IP or drop rating.",
    },
    {
      question: "Does the Fluke 287 have an analog bar graph?",
      answer:
        "No. Fluke's spec page for the 287 doesn't list a bar graph at all, unlike the 87V MAX's 32-segment graph that refreshes 40 times a second. The 287's display is built around its 50,000-count digital readout and TrendCapture's on-screen trend graph instead.",
    },
    {
      question: "Can the Fluke 87V MAX log readings over time?",
      answer:
        "No. Fluke's 87V MAX spec page lists Min/Max/Avg recording and 250 µs Peak Min/Max capture, but no TrendCapture, interval logging or PC export. For logged readings over hours or days, you need a 287 or 289.",
    },
    {
      question: "Are the Fluke 87V MAX and 287 both CAT IV rated?",
      answer:
        "Yes. The 87V MAX is CAT IV 600V / CAT III 1000V per its own spec page, and the 287 carries the same rating per the shared Fluke 287/289 manual and this site's own multimeter-catalog.ts citation (the live 287 product page states a 1000 V terminal-to-ground maximum without restating the full CAT table). Despite matching safety classes, the two meters are built for very different jobs.",
    },
    {
      question: "Which has better accuracy, the 87V MAX or the 287?",
      answer:
        "The 287, on paper: Fluke lists 0.025% basic DC volts accuracy against the 87V MAX's ±(0.05% + 1), and the 287's 50,000-count display resolves finer than the MAX's 6,000-count (19,999 hi-res) screen. The 287 also resolves 0.01 µA on its 500 µA range. The 87V MAX's advantage is its live 32-segment bar graph, which the 287 doesn't have.",
    },
    {
      question: "Does either meter include a temperature probe?",
      answer:
        "Only the 87V MAX. It ships with an 80BK-A thermocouple probe for its -200 to 1090 °C range. The 287's box (TL71 leads, AC175 clips, amp jack plugs, a quick reference guide) has no probe, so using its wider -200 to 1350 °C range means buying a compatible thermocouple probe separately.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 287 vs Fluke 87V", href: "/multimeters/fluke-287-vs-fluke-87v" },
    { label: "Fluke 28 II vs Fluke 87V MAX", href: "/multimeters/fluke-28-ii-vs-fluke-87v-max" },
    { label: "Best multimeters for electronics repair", href: "/multimeters/best-multimeters-for-electronics-repair" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" },
  ],
};

export default function Fluke87VMaxVsFluke287Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
