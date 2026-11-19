// Specs per Fluke, checked 2026-11-19:
// - Fluke 289 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-289
//   50,000-count, 1/4 VGA dot-matrix display with white backlight; DC V 50.000 mV-1000.0 V (6 ranges), 0.025% basic
//   accuracy; True RMS AC V 50.000 mV-1000.0 V (6 ranges), 0.4% basic, 100 kHz bandwidth; DC A 500.00 µA-10.000 A
//   (6 ranges), 0.05% basic, max 10 A (20 A for 30 s); True RMS AC A 500.00 µA-10.000 A, 0.6% basic; resistance
//   50.000 Ω-500.0 MΩ (8 ranges), 0.05% basic, plus a two-terminal 50.000 Ω low-ohm range at 1 mΩ resolution with a
//   10 mA source current and a relative mode to remove test-lead resistance; capacitance 1.000 nF-100 mF (8 ranges),
//   1.0% basic; frequency 99.999 Hz-999.99 kHz (5 ranges), 0.005% basic; temperature -200.0 to 1350.0 °C excluding
//   probe, 1.0% basic; TrendCapture graphs a logged session on the meter with up to 14x zoom and a real-time clock;
//   the page states its own logging memory two ways - "up to 10,000 recorded events" in the overview and "up to
//   15,000" in the features/spec table, not reconciled here; six AA alkaline batteries, at least 100 h typical or
//   200 h in logging mode; 870.9 g (28 oz); limited lifetime warranty. The current product page gives no CAT rating,
//   only "1000 V maximum between any terminal and earth ground" - CAT IV 600V / CAT III 1000V is per the Fluke
//   "287/289 True-rms Digital Multimeters Users Manual" (Rev. 2, 3/09), as already used for the 289 Pick in
//   src/lib/multimeter-catalog.ts (which also cites the 289 datasheet) and for the fluke-87v-max-vs-fluke-289 page.
//   That Pick cites Amazon ASIN B0012B51HI, Amazon-buyable as of 2026-10-24.
// - Fluke 789 ProcessMeter product page: https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-789
//   DC volts 0-1000 V, resolution 0.1 mV to 1.0 V, 0.1% of reading + 1 LSD; AC volts/current True RMS to 1000 V /
//   DC current 0-1 A (1 mA resolution, 0.2% + 2 LSD) and a separate 0-30 mA range (0.001 mA resolution, 0.05% + 2
//   LSD) used for loop work; AC current 0-1 A, 1 mA resolution, ±1% + 2 LSD (25 Hz-2 kHz); resistance to 40 MΩ,
//   0.2% + 1 LSD, continuity beeps below 100 Ω; mA source/simulate 0-20 mA or 4-20 mA, 0.001 mA resolution, 0.05%
//   of span, drive capability of 24 V compliance or 1200 Ω at 20 mA; a built-in 24 V loop power supply; a built-in,
//   selectable 250 Ω HART resistor; CAT IV 600V / CAT III 1000V (IEC 61010-2-033), 1000 V maximum; 4 AA alkaline
//   batteries, about 140 h typical measuring or about 10 h typical sourcing 20 mA; 610 g (1.6 lb); 3-year warranty.
//   The 789 Pick in src/lib/multimeter-catalog.ts cites the same product page and Amazon ASIN B000R8ETKW, noting
//   Amazon-buyable as of 2026-10-24 but "third-party seller, 1 left" (new stock) at that time.
// Amazon ASIN check: fetching amazon.com/dp/B0012B51HI and amazon.com/dp/B000R8ETKW directly returned HTTP 503
// both times (Amazon blocks this fetcher, the same result as every other Amazon URL tried in this session). A web
// search for each ASIN found no amazon.com result in the index, but turned up third-party retailers (Aztek
// Computers, matching both ASINs to these exact models) and no "discontinued" or "unavailable" signal for either.
// Both ASINs already carry this site's own "Amazon-buyable" verification in src/lib/multimeter-catalog.ts from
// 2026-10-24, and both are already used as live CTA links on several other published comparison pages on this site
// (e.g. fluke-789-vs-fluke-87v, fluke-789-vs-fluke-1587-fc, fluke-787b-vs-fluke-789 for the 789; fluke-289-review
// and six other comparison pages for the 289), so this page relies on that existing record rather than re-asserting
// a fresh direct check it could not complete. The 789's low-stock note from the catalog is carried into this page's
// cons/FAQ copy rather than hidden.
// Neither meter is hands-on tested by OhmSavvy (no handsOnTested field on either Pick in the catalog); both are
// desk research against the sources above.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-289-vs-fluke-789";

const all = getAllPicks("multimeters");
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const fluke789 = all.find((p) => p.name === "Fluke 789")!;

export const metadata = buildMetadata({
  title: "Fluke 289 vs Fluke 789: DMM or Loop Calibrator?",
  description:
    "Fluke 289 vs Fluke 789: the 289 is a 50,000-count logging DMM that only measures; the 789 ProcessMeter also sources, simulates and powers a 4-20 mA loop.",
  image: fluke289.image,
  path,
});

const link = "text-accent hover:underline";

/**
 * A 4-20 mA transmitter loop feeding a controller input. The Fluke 789 can sit in that loop and do four things to
 * it - measure, source a simulated signal, power the loop itself, and insert a HART resistor. The Fluke 289 can
 * only do the first of those; it has no source, loop-power or HART function at all. Illustrative schematic, not a
 * real wiring diagram.
 */
function LoopDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a 4-20 milliamp transmitter loop feeding a controller input. The Fluke 789 ProcessMeter, inserted into the loop, can measure the loop current, source or simulate a 4-20 milliamp signal, power the loop itself with its built-in 24 volt supply, and insert a 250 ohm HART resistor. The Fluke 289, inserted the same way, can only measure the loop current - it has no source, loop-power, or HART function."
    >
      <rect x="8" y="10" width="384" height="95" rx="10" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="200" y="26" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 789 inserted in the loop
      </text>
      <rect x="20" y="42" width="60" height="38" rx="5" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="50" y="58" fontSize="8" textAnchor="middle" className="fill-foreground">Transmitter</text>
      <text x="50" y="69" fontSize="7.5" textAnchor="middle" className="fill-muted">or valve</text>
      <rect x="150" y="38" width="100" height="46" rx="6" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="200" y="54" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 789</text>
      <text x="166" y="67" fontSize="7" className="fill-muted">Measure</text>
      <text x="166" y="76" fontSize="7" className="fill-muted">Source / Sim</text>
      <text x="212" y="67" fontSize="7" className="fill-muted">24V loop power</text>
      <text x="212" y="76" fontSize="7" className="fill-muted">250Ω HART</text>
      <rect x="320" y="42" width="60" height="38" rx="5" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="350" y="58" fontSize="8" textAnchor="middle" className="fill-foreground">Controller</text>
      <text x="350" y="69" fontSize="7.5" textAnchor="middle" className="fill-muted">or PLC input</text>
      <path d="M80 61 H150" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M250 61 H320" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M160 92 q40 10 80 0" className="stroke-accent fill-none" strokeWidth="1.1" strokeDasharray="3 2" />
      <text x="200" y="100" fontSize="7" textAnchor="middle" className="fill-accent">4-20 mA, both directions</text>

      <rect x="8" y="125" width="384" height="95" rx="10" className="fill-surface stroke-border" strokeWidth="1.4" />
      <text x="200" y="141" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Fluke 289 inserted the same way
      </text>
      <rect x="20" y="157" width="60" height="38" rx="5" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="50" y="173" fontSize="8" textAnchor="middle" className="fill-foreground">Transmitter</text>
      <text x="50" y="184" fontSize="7.5" textAnchor="middle" className="fill-muted">or valve</text>
      <rect x="150" y="153" width="100" height="46" rx="6" className="fill-surface stroke-muted" strokeWidth="1.3" strokeDasharray="4 3" />
      <text x="200" y="171" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 289</text>
      <text x="200" y="185" fontSize="7.5" textAnchor="middle" className="fill-muted">Measure only</text>
      <text x="200" y="195" fontSize="6.8" textAnchor="middle" className="fill-muted">no source, no loop power, no HART</text>
      <rect x="320" y="157" width="60" height="38" rx="5" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <text x="350" y="173" fontSize="8" textAnchor="middle" className="fill-foreground">Controller</text>
      <text x="350" y="184" fontSize="7.5" textAnchor="middle" className="fill-muted">or PLC input</text>
      <path d="M80 176 H150" className="stroke-foreground fill-none" strokeWidth="1.4" />
      <path d="M250 176 H320" className="stroke-foreground fill-none" strokeWidth="1.4" />
      <path d="M280 164 l10 -8 M290 164 l-10 -8" className="stroke-muted" strokeWidth="1.3" strokeLinecap="round" />
      <text x="295" y="153" fontSize="6.8" className="fill-muted">one direction only</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 289 vs Fluke 789: Logging DMM or 4-20 mA Loop Calibrator?",
  path,
  published: "2026-11-19",
  intro:
    "These two Flukes share a price tier and not much else once you look past the model numbers. The Fluke 289 is a general-purpose True RMS logging multimeter: volts, amps, ohms, capacitance, frequency and temperature in one handheld, plus TrendCapture to graph a logged session on the meter itself and a dedicated 50 Ω low-ohm range for contacts and shunts. The Fluke 789 ProcessMeter is a narrower, instrumentation-focused tool - it measures too, but its real job is to source, simulate and power a 4-20 mA transmitter loop, with a built-in 24 V loop supply and a selectable 250 Ω HART resistor. Neither is hands-on tested by OhmSavvy; every figure below comes from Fluke's own current product pages, with one CAT-rating figure pulled from Fluke's Users Manual because the 289's current page omits it.",
  a: {
    pick: fluke289,
    imageAlt: "Fluke 289 True RMS logging multimeter with TrendCapture, front view",
    chooseIf: [
      "You need one meter that covers volts, amps, ohms, capacitance, frequency and temperature, not just a 4-20 mA loop",
      "You want TrendCapture to graph a logged session on the meter itself, with 14x zoom and a real-time clock",
      "You check bolted joints, contacts or shunts and want a dedicated 50 Ω range at 1 mΩ resolution",
      "You need the finest standard current resolution here - down to 0.01 µA on its 500 µA range",
    ],
  },
  b: {
    pick: fluke789,
    imageAlt: "Fluke 789 ProcessMeter multimeter and mA loop calibrator, front view",
    chooseIf: [
      "You work on 4-20 mA process loops and need to source or simulate a signal, not only measure one",
      "A transmitter's own power is down or being bench-tested, and you need the meter's built-in 24 V loop supply",
      "You routinely need a 250 Ω HART resistor and don't want to carry or wire in a separate one",
      "You want a lighter meter built around SpanCheck, step and ramp testing for valves and transmitters",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "50,000 counts, 1/4 VGA dot matrix with backlight", b: "Not stated in counts; resolution to 0.1 mV / 0.001 mA" },
    { label: "DC volts", a: "50.000 mV-1000.0 V, 0.025% basic", b: "0-1000 V, 0.1% of reading + 1 LSD" },
    { label: "AC volts (True RMS)", a: "50.000 mV-1000.0 V, 0.4% basic, 100 kHz bandwidth", b: "To 1000 V, True RMS (bandwidth not separately stated)" },
    { label: "DC current - general measuring", a: "500.00 µA-10.000 A, 0.05% basic (20 A for 30 s)", b: "0-1 A only, 1 mA resolution, 0.2% + 2 LSD" },
    { label: "DC current - mA loop range", a: "Shares the general 500 µA-10 A ranges above", b: "0-30 mA, 0.001 mA resolution, 0.05% + 2 LSD" },
    { label: "mA source / simulate", a: "None - measure only", b: "0-20 mA or 4-20 mA, 0.001 mA resolution, 0.05% of span" },
    { label: "Loop power supply", a: "None", b: "Built-in 24 V" },
    { label: "HART resistor", a: "None", b: "Built-in, selectable 250 Ω" },
    { label: "Resistance", a: "50.000 Ω-500.0 MΩ, 0.05% basic", b: "To 40 MΩ, 0.2% + 1 LSD; continuity below 100 Ω" },
    { label: "Dedicated low-ohm range", a: "50.000 Ω, 1 mΩ resolution, 10 mA source, with REL", b: "None listed" },
    { label: "Capacitance / frequency / temperature", a: "100 mF / 999.99 kHz / 1350 °C, all with published accuracy", b: "Not offered" },
    { label: "On-meter logging / trending", a: "TrendCapture, zoom to 14x, real-time clock", b: "None listed - built around SpanCheck, step, ramp instead" },
    { label: "CAT safety rating", a: "CAT IV 600V / CAT III 1000V (per Fluke's Users Manual; current page omits it)", b: "CAT IV 600V / CAT III 1000V (stated on the current product page)" },
    { label: "Battery", a: "6 AA alkaline, 100 h min. (200 h logging)", b: "4 AA alkaline, ~140 h measuring (~10 h sourcing 20 mA)" },
    { label: "Weight", a: "870.9 g", b: "610 g" },
    { label: "Warranty", a: "Limited lifetime", b: "3 years" },
    { label: "OhmSavvy status", a: "Desk research against Fluke's specs", b: "Desk research against Fluke's specs" },
  ],
  differences: [
    "Sourcing is the whole split: the 789 can source or simulate a 4-20 mA (or 0-20 mA) signal at 0.001 mA resolution; the 289 has no source or simulate function at all - it only measures.",
    "Only the 789 can power a loop itself (built-in 24 V supply) and insert a selectable 250 Ω HART resistor; the 289 does neither.",
    "The 289 covers far more ground as a general meter: capacitance, frequency and temperature up to 1350 °C, none of which the 789 offers.",
    "The 289 measures DC current up to 10 A (20 A for 30 s); the 789's general current range tops out at 1 A, with a separate 0-30 mA range for loop work.",
    "The 289 has a dedicated 50 Ω low-ohm range at 1 mΩ resolution with REL; the 789's resistance function goes only to 40 MΩ with no low-ohm range.",
    "Only the 289 logs and graphs a session on its own screen (TrendCapture); the 789's extra functions (SpanCheck, step, ramp) are calibration tools, not a trend recorder.",
    "The 789 is the lighter meter (610 g vs 870.9 g) and carries a 3-year warranty against the 289's limited lifetime warranty.",
    "The 789's current product page states its CAT IV 600V / CAT III 1000V rating outright; the 289's current page omits a CAT figure, so that rating for the 289 comes from Fluke's 287/289 Users Manual instead.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What actually sets these two apart</h2>
        <p className="text-muted leading-7 mb-4">
          Every row in the spec table matters less than one question: can the meter put a signal into the loop, or
          can it only read one that&apos;s already there? The Fluke 289 is a measure-only instrument - excellent at
          it, with 50,000 counts and 0.025% basic DC accuracy, but it cannot source a current, simulate a
          transmitter, power a loop, or add a HART resistor. The Fluke 789 does all four of those on top of
          measuring, which is why instrumentation techs call it a ProcessMeter rather than a multimeter.
        </p>
        <Figure
          caption={
            <>
              Both meters can sit in a 4-20 mA loop and measure it. Only the Fluke 789 can also source a simulated
              signal, power the loop itself, and insert a 250 Ω HART resistor. Illustrative schematic, not a wiring
              diagram.
            </>
          }
        >
          <LoopDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That gap decides the buying question more than any accuracy figure. If a transmitter is unpowered on the
          bench, or a PLC input card needs a known signal to prove it reads 4 mA, 12 mA and 20 mA correctly, a
          measure-only meter like the 289 cannot help - it has nothing to put into the loop. The 789 can source that
          exact signal, and its loop-power supply can run the transmitter at the same time if its usual 24 V feed
          isn&apos;t available.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 289 vs 789 in numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC voltage accuracy, lower is tighter. The 289 is four times tighter than the 789.</>}>
            <BarChart
              items={[
                { label: "Fluke 789", value: 0.1, display: "0.1%" },
                { label: "Fluke 289", value: 0.025, display: "0.025%", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Finest DC current resolution, log scale in µA. The 289&apos;s 500 µA range resolves 100x finer than the 789&apos;s mA ranges - but only the 789 can source a current back into the loop.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 789 (0-30 mA range)", value: 1, display: "0.001 mA = 1 µA" },
                { label: "Fluke 289 (500 µA range)", value: 0.01, display: "0.01 µA", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight as Fluke states it. The 789 is the lighter meter by about 260 g.</>}>
            <BarChart
              items={[
                { label: "Fluke 289", value: 870.9, display: "870.9 g" },
                { label: "Fluke 789", value: 610, display: "610 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life in hours. The 789&apos;s lower figure is while sourcing 20 mA continuously, a load the 289 never draws because it can&apos;t source at all.</>}>
            <BarChart
              items={[
                { label: "Fluke 789 (sourcing 20 mA)", value: 10, display: "10 h" },
                { label: "Fluke 789 (measuring)", value: 140, display: "140 h" },
                { label: "Fluke 289 (logging)", value: 200, display: "200 h" },
                { label: "Fluke 289 (normal)", value: 100, display: "100 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 289&apos;s current-resolution advantage is real but narrow in scope: it only applies to passive measuring.
          The 789&apos;s 0.001 mA resolution while sourcing or simulating a signal is a capability the 289 simply
          doesn&apos;t have at any resolution, which is why these numbers describe two different jobs rather than
          one meter winning outright.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter can and can&apos;t do</h2>
        <DataTable
          head={["Capability", "Fluke 289", "Fluke 789"]}
          rows={[
            ["Measure a 4-20 mA loop in series", "Yes, up to 10 A overall", "Yes, 0-30 mA range at 0.001 mA resolution"],
            ["Source or simulate a 4-20 mA signal", "No - not offered", "Yes, 0-20 mA or 4-20 mA at 0.001 mA resolution"],
            ["Power a transmitter's loop itself", "No - not offered", "Yes, built-in 24 V loop supply"],
            ["Insert a HART resistor", "No - not offered", "Yes, built-in, selectable 250 Ω"],
            ["Graph a logged session on the meter", "Yes, TrendCapture, zoom to 14x", "No - not offered"],
            ["Measure capacitance, frequency, temperature", "Yes, all three", "No - not offered"],
            ["Resolve milliohm-level resistance (contacts, shunts)", "Yes, 50 Ω range at 1 mΩ", "No dedicated low-ohm range"],
            ["Run a valve/transmitter span check, step or ramp test", "No - not offered", "Yes"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="The 289's finer resolution doesn't close the gap">
            It&apos;s tempting to read the 289&apos;s 0.01 µA current resolution as &quot;more precise&quot; overall.
            It is, for reading a signal that already exists. It has no bearing on the 789&apos;s separate job of
            creating that signal in the first place - a 50,000-count display can&apos;t source a current no matter
            how finely it can measure one.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Why"]}
          rows={[
            ["General electrical/electronics troubleshooting", "Fluke 289", "Covers volts, amps, ohms, capacitance, frequency and temperature"],
            ["Bench-testing a PLC analog input card", "Fluke 789", "Sources a known 4-20 mA signal; the 289 can't source anything"],
            ["Calibrating or SpanChecking a transmitter", "Fluke 789", "Built for that exact job, with step and ramp tests"],
            ["Powering a transmitter whose own supply is down", "Fluke 789", "Built-in 24 V loop power the 289 doesn't have"],
            ["Checking contact or busbar resistance", "Fluke 289", "50 Ω range at 1 mΩ resolution"],
            ["Logging an intermittent fault over a shift", "Fluke 289", "TrendCapture graphs the session on the meter"],
            ["HART-enabled transmitter work", "Fluke 789", "Built-in, selectable 250 Ω HART resistor"],
            ["General-purpose meter on a tight budget for this tier", "Fluke 289", "One meter instead of a DMM plus a separate loop calibrator"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Skip the 289 if your real job is sourcing or powering 4-20 mA loops - no mode on it creates a signal, no
          matter how it&apos;s set. Skip the 789 if you need general electrical measurements like capacitance, frequency
          or temperature, or a dedicated low-ohm range; it doesn&apos;t offer any of those. For loop work without the
          789&apos;s sourcing, our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            best multimeters for 4-20 mA loop testing
          </Link>{" "}
          covers measure-only options too.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who should buy or skip each meter</h2>
        <InfoCards
          items={[
            { label: "Buy the 289", desc: "Electricians and technicians who need one capable meter for general volts/amps/ohms work, plus logging." },
            { label: "Skip the 289", desc: "If you need to source, simulate or power a 4-20 mA signal - it has none of those functions." },
            { label: "Buy the 789", desc: "Instrumentation and process-control techs who calibrate, bench-test or power transmitters and loops." },
            { label: "Skip the 789", desc: "If you need capacitance, frequency, temperature, or a low-ohm range - none are offered." },
            { label: "Need both jobs regularly", desc: "Expect to carry both; no single Fluke meter at this tier combines general DMM functions with loop sourcing." },
            { label: "Just reading loop current without breaking the loop", desc: "Consider a clamp-style process meter instead - see chooseNeitherIf below." },
          ]}
        />
      </section>

      <Callout title="Same CAT headline, one sourced differently">
        Both meters carry a CAT IV 600V / CAT III 1000V rating, but only the 789&apos;s current Fluke product page states
        it outright. The 289&apos;s current page gives no CAT figure at all - just a 1000 V terminal-to-earth maximum -
        so that CAT rating for the 289 is taken from Fluke&apos;s 287/289 Users Manual instead. A CAT rating is not a
        substitute for lockout/tagout or proving a meter on a known live source before and after you connect or
        disconnect leads from an energized loop.
      </Callout>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How we checked this</h2>
        <p className="text-muted leading-7 mb-4">
          Every figure above comes from Fluke&apos;s own current product pages for the 289 and 789, fetched directly
          for this comparison, with the 289&apos;s CAT rating taken from its Users Manual as noted above and in this
          page&apos;s source file. OhmSavvy hasn&apos;t bought or bench-tested either meter, so neither carries our
          Hands-on Tested badge - both columns are desk research against the manufacturer&apos;s documentation, not a
          measurement we made ourselves.
        </p>
        <p className="text-muted leading-7">
          We also couldn&apos;t directly re-verify either Amazon listing today: fetching both product pages returned
          an HTTP error, and a web search for each ASIN surfaced third-party retailers rather than an amazon.com
          result. Both ASINs already carry this site&apos;s own Amazon-buyable verification from last month in our
          multimeter catalog, which is what this page relies on - including the catalog&apos;s note that the 789&apos;s
          new Amazon stock was down to one unit from a third-party seller at that time, so check current availability
          before you buy. For a tool built only to read loop current without sourcing or powering anything, our{" "}
          <Link href="/multimeters/fluke-789-vs-fluke-87v" className={link}>
            Fluke 789 vs Fluke 87V
          </Link>{" "}
          comparison looks at a general-purpose field meter against the same ProcessMeter.
        </p>
      </section>
    </>
  ),
  chooseNeitherIf:
    "You only need to read 4-20 mA loop current without breaking the loop to insert a meter, and don't need the 289's broader DMM functions or the 789's sourcing and loop-power features. A clamp-style process meter measures loop current through the wire's insulation instead, at a lower price than either meter here, though it can't source or simulate a signal any more than the 289 can.",
  bottomLine:
    "Buy the Fluke 289 if you need one capable, general-purpose True RMS meter that covers volts, amps, ohms, capacitance, frequency and temperature, with TrendCapture to log and graph a session on the meter itself. Buy the Fluke 789 ProcessMeter if your actual job is 4-20 mA loop work: sourcing or simulating a signal, powering a transmitter's loop, or using a built-in HART resistor - none of which the 289 can do at any setting.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 289 and the Fluke 789?",
      answer:
        "The 289 is a general-purpose True RMS logging multimeter that measures volts, amps, ohms, capacitance, frequency and temperature, and graphs a logged session on the meter (TrendCapture). The 789 ProcessMeter measures a narrower range of functions but also sources or simulates a 4-20 mA signal, powers a transmitter's loop with a built-in 24 V supply, and carries a selectable 250 Ω HART resistor - none of which the 289 offers.",
    },
    {
      question: "Can the Fluke 289 source or simulate a 4-20 mA signal?",
      answer:
        "No. Fluke's current 289 product page lists only measuring functions - DC and AC volts and amps, resistance, capacitance, frequency and temperature. There is no source, simulate, loop-power or HART function at any setting. That capability belongs to the 789 (and its ProcessMeter siblings), not the 289.",
    },
    {
      question: "Does the Fluke 789 have TrendCapture logging like the 289?",
      answer:
        "No. The 789's current product page lists SpanCheck, step and ramp testing for valves and transmitters, but no on-screen logging, trend graph, or real-time clock. If you need to leave a meter connected and review a logged session afterward, that's the 289's job.",
    },
    {
      question: "Which is better for HART transmitter work, the 289 or the 789?",
      answer:
        "The 789, because it has a built-in, selectable 250 Ω HART resistor and a 24 V loop power supply - both things a HART loop often needs during setup or troubleshooting. The 289 has neither feature, so using it on a HART loop means supplying and wiring in that resistor and power separately if your setup needs them.",
    },
    {
      question: "Is the Fluke 789 CAT rated as high as the Fluke 289?",
      answer:
        "On paper, yes - both are CAT IV 600V / CAT III 1000V. The difference is where that figure is published: the 789's current Fluke product page states it directly, while the 289's current page gives no CAT rating at all (only a 1000 V terminal-to-earth maximum), so the 289's CAT IV/III figure used here comes from Fluke's 287/289 Users Manual instead.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 289 review", href: "/multimeters/fluke-289-review" },
    { label: "Fluke 787B vs Fluke 789", href: "/multimeters/fluke-787b-vs-fluke-789" },
    { label: "Fluke 789 vs Fluke 1587 FC", href: "/multimeters/fluke-789-vs-fluke-1587-fc" },
    { label: "Fluke 789 vs Fluke 87V", href: "/multimeters/fluke-789-vs-fluke-87v" },
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
  ],
};

export default function Fluke289VsFluke789Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
