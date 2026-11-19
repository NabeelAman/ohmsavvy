// Specs per Fluke, cross-checked 2026-11-19 against fluke.com and the sourced "Specs per" comments already in this
// repo (checked 2026-10-27/28 and 2026-11-08):
// - Fluke 1587 FC product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1587-fc
//   (re-fetched 2026-11-19, matches this repo's existing fluke-1587-fc-vs-fluke-87v and multimeter-catalog.ts notes)
//   Insulation test 50/100/250/500/1000 V (+20%/-0%); ranges 0.01-50.0 MΩ (50 V), 0.01-100 MΩ (100 V),
//   0.1-250 MΩ (250 V), 0.1-500 MΩ (500 V), 0.1-600 MΩ plus 0.6-2.0 GΩ (1000 V); 1 mA nominal test current;
//   accuracy ±(3% + 5) at 50/100 V, ±(1.5% + 5) at 250-1000 V up to 600 MΩ, ±(10% + 3) for 0.6-2.0 GΩ; inhibits the
//   test above 30 V on the terminals; auto discharge <0.5 s for 1 µF or less; max capacitive load 1 µF; PI/DAR timed
//   ratio tests with TrendIt graphs, app memory and temperature compensation over Fluke Connect (2.4 GHz ISM band).
//   Meter: True RMS, 6,000-count display; DC V 6-1000 V ±(0.09% + 2), 10 MΩ input; DC mV 600 mV ±(0.1% + 1); AC V
//   ±(1% + 3) at 50-60 Hz, ±(2% + 3) to 5 kHz; low-pass filter; current 60 mA and 400 mA AC/DC only (DC ±(0.2% + 2),
//   AC ±(1.5% + 2)), 600 mA for 2 min max overload, 0.44 A 1000 V fuse, no 10 A input; resistance 600 Ω-6 MΩ
//   ±(0.9% + 2), 50 MΩ ±(1.5% + 3); capacitance to 9,999 µF ±(1.2% + 2); frequency to 99.99 kHz ±(0.1% + 1);
//   temperature -40 to 537 °C ±(1% + 10), K-type thermocouple included; continuity tone below about 25 Ω; CAT IV
//   600V / CAT III 1000V; IP40 (non-operating); 4 x AA, at least 1000 insulation tests, about 1000 h meter use;
//   550 g (Amazon's B017OVC2UI item-weight field says 1645 g — conflict noted, we use Fluke); 5.0 x 10.0 x 20.3 cm;
//   operating -20 to 55 °C; 3-year warranty (extendable to 5 with registration within 45 days per the data sheet).
// - Fluke 179 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-179
//   (re-fetched 2026-11-19, matches this repo's Fluke 179 Pick in best-multimeters/page.tsx and the sourced notes on
//   /multimeters/fluke-179-review, /multimeters/fluke-289-vs-fluke-179 and /multimeters/fluke-179-vs-fluke-115,
//   170 Series datasheet Pub 10824-eng): True RMS; 6,000 counts, 33-segment analog bar graph, backlight; DC V
//   ±(0.09% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3), AC A ±(1.5% + 3), 10 A max, 0.01 mA best resolution, no µA
//   range or insulation-test function; resistance to 50 MΩ ±(0.9% + 1); capacitance 1 nF to 10,000 µF ±(1.2% + 2)
//   (Fluke's own comparison table says 9,999 µF — conflict noted, we use the spec table); frequency to 100 kHz
//   ±(0.1% + 1); temperature -40 to 400 °C ±(1.0% + 10), 80BK thermocouple probe included; Hold, Auto Hold,
//   Min/Max-Average; auto-ranging with manual override; CAT III 1000V / CAT IV 600V; one 9 V battery, about 200 h;
//   43 x 90 x 185 mm; 420 g; lifetime warranty. No LoZ, NCV, low-pass filter or insulation test listed. IP rating
//   and drop height not stated in our sources.
// - Amazon: Fluke 1587 FC is ASIN B017OVC2UI (bare meter; I400/62MAX+/MDT kits are separate ASINs), confirmed
//   Amazon-buyable 2026-10-27 per the "Specs per" note in src/lib/multimeter-catalog.ts. Fluke 179 is ASIN
//   B00012Z0V6, confirmed "Only 2 left in stock" with add-to-cart present (ZIP 10001) 2026-11-08 per the note on
//   /multimeters/fluke-179-vs-fluke-115. Both ASINs are the live ctaHref used for these products across this site.
//   On 2026-11-19 amazon.com/dp/<ASIN> returned HTTP 503 to this page's automated fetch for both ASINs (Amazon's
//   usual bot block), so today's buyability is carried forward from those two in-repo, human-style checks rather
//   than re-confirmed live; no price is stated on this page for that reason.
// PI (10-minute ÷ 1-minute reading) and DAR (60-second ÷ 30-second reading) definitions and the "PI of 2.0 or more"
// guideline (commonly cited from IEEE 43 for most motor insulation classes) are standard engineering values, hedged.
// Neither meter is hands-on tested by OhmSavvy (handsOnTested is unset for both Picks); this page is desk research
// against Fluke's published specifications.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1587-fc-vs-fluke-179";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 1587 FC vs Fluke 179: Insulation Tester or Field Meter?",
  description:
    "Fluke 1587 FC vs Fluke 179: a 50–1000 V insulation tester with PI/DAR against a standard CAT IV field multimeter with 10 A. Specs, charts and which to buy.",
  image: all.find((p) => p.name === "Fluke 1587 FC")!.image,
  path,
});

const link = "text-accent hover:underline";

/**
 * Same winding-to-frame insulation test as our 1587 FC vs 87V page, but drawn to make the Fluke 179's gap explicit:
 * its ohms function can probe the same two points, but at a few volts it never stresses the insulation, so it has
 * nothing to show where the 1587 FC reports a megohm reading.
 */
function InsulationTestComparisonDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="A disconnected, locked-out motor with its winding terminals jumpered together and its frame bare. The Fluke 1587 FC's leads go from the jumpered terminals to the frame and the meter applies a 500 volt DC test, reading 180 megohms of insulation resistance. A Fluke 179 is shown below it with the same leads on the same two points, but its ohms function only applies a low test voltage, so it cannot verify the insulation at operating voltage and has no insulation-test mode to report a result."
    >
      {/* Disconnect, open and locked */}
      <rect x="8" y="18" width="64" height="76" rx="6" className="fill-surface stroke-border" strokeWidth="1.3" />
      <text x="40" y="12" fontSize="8.5" textAnchor="middle" className="fill-muted">Disconnect</text>
      {[26, 36, 46].map((x) => (
        <g key={x} className="stroke-foreground" strokeWidth="1.4">
          <line x1={x} y1="28" x2={x} y2="46" />
          <line x1={x} y1="46" x2={x + 7} y2="57" />
          <line x1={x} y1="64" x2={x} y2="82" />
        </g>
      ))}
      <text x="40" y="106" fontSize="8" textAnchor="middle" className="fill-accent">LOCKED OUT</text>
      {/* Motor */}
      <rect x="130" y="30" width="100" height="70" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <circle cx="180" cy="65" r="22" className="fill-none stroke-accent" strokeWidth="1.3" />
      <text x="180" y="69" fontSize="8.5" textAnchor="middle" className="fill-accent">windings</text>
      <text x="180" y="112" fontSize="8.5" textAnchor="middle" className="fill-foreground">Motor frame</text>
      <rect x="158" y="12" width="44" height="18" rx="3" className="fill-surface stroke-border" strokeWidth="1.1" />
      {[168, 180, 192].map((x) => (
        <circle key={x} cx={x} cy="21" r="2.6" className="fill-foreground" />
      ))}
      <line x1="168" y1="21" x2="192" y2="21" className="stroke-accent" strokeWidth="1.5" />
      <text x="180" y="7" fontSize="7.5" textAnchor="middle" className="fill-muted">T1–T2–T3 jumpered</text>

      {/* 1587 FC: does the test */}
      <rect x="276" y="10" width="110" height="68" rx="9" className="fill-[#f0b429]" />
      <rect x="286" y="18" width="90" height="28" rx="3" fill="#c9d4b8" />
      <text x="331" y="33" fontSize="10" fontWeight="700" textAnchor="middle" fill="#1f2328">180 MΩ</text>
      <text x="331" y="43" fontSize="7" textAnchor="middle" fill="#1f2328">500 V insulation test</text>
      <text x="331" y="68" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#1f2328">Fluke 1587 FC</text>
      <path d="M296 78 V90 H230 V60" className="fill-none stroke-[#e5484d]" strokeWidth="1.6" />
      <path d="M366 78 V98 H230 V96" className="fill-none stroke-foreground" strokeWidth="1.6" />

      {/* Fluke 179: can probe the same points, no insulation mode */}
      <rect x="276" y="150" width="110" height="68" rx="9" className="fill-surface stroke-border" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="286" y="158" width="90" height="28" rx="3" className="fill-surface-raised stroke-border" strokeWidth="1" />
      <text x="331" y="176" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-muted">OL</text>
      <text x="331" y="186" fontSize="6.8" textAnchor="middle" className="fill-muted">Ω range, low test voltage</text>
      <text x="331" y="208" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 179</text>
      <path d="M296 150 V130 H230 V110" className="fill-none stroke-[#e5484d]" strokeDasharray="3 2" strokeWidth="1.4" />
      <path d="M366 150 V140 H230 V130" className="fill-none stroke-muted" strokeDasharray="3 2" strokeWidth="1.4" />
      <text x="331" y="140" fontSize="7" textAnchor="middle" className="fill-muted">no insulation-test mode</text>

      <text x="200" y="222" fontSize="8" textAnchor="middle" className="fill-muted">
        Same two test points; the 179&apos;s ohms function never reaches a stress voltage the 1587 FC applies on purpose.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1587 FC vs Fluke 179: Insulation Tester or Field Meter?",
  path,
  published: "2026-11-19",
  intro:
    "This isn't two general-purpose multimeters competing for the same job. The Fluke 179 is a standard CAT IV field multimeter: True RMS, 10 A, temperature, a 6,000-count display. The Fluke 1587 FC is an insulation-resistance tester built around a nearly identical meter engine — same DC volts accuracy, same CAT IV 600V / CAT III 1000V rating — plus a 50 to 1000 V insulation test with PI and DAR ratio tests logged over Fluke Connect. Buy the 179 if you've never needed to megger a motor or cable. Buy the 1587 FC if you have, and don't mind giving up the 10 A input and lifetime warranty to get there.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with its insulation test button and rotary dial, front view",
    chooseIf: [
      "You test motor windings, cables, feeders or transformers for insulation breakdown before re-energizing",
      "You want timed PI and DAR ratio tests, trended over time in the Fluke Connect app",
      "You're fine with a 400 mA current ceiling because running amps get read with a separate clamp",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 179")!,
    imageAlt: "Fluke 179 True RMS digital multimeter with backlit display and rotary dial, front view",
    chooseIf: [
      "You've never needed to insulation-test a winding or cable, and don't want to pay for a feature that sits idle",
      "You regularly read load current in series up to 10 A, which the 1587 FC can't do at all",
      "You want a lifetime warranty and a lower price than a dedicated insulation tester",
    ],
  },
  extraSpecs: [
    { label: "Insulation test", a: "50, 100, 250, 500, 1000 V DC; 0.01 MΩ to 2 GΩ", b: "No insulation-test mode" },
    { label: "PI / DAR ratio tests", a: "Yes, timed, with Fluke Connect TrendIt graphs", b: "No" },
    { label: "Live-circuit lockout on IR test", a: "Won't start if > 30 V is present on the terminals", b: "Not applicable" },
    { label: "Wireless logging", a: "Fluke Connect, 2.4 GHz, app memory + temperature compensation", b: "None" },
    { label: "DC volts accuracy", a: "±(0.09% + 2), 6 V to 1000 V", b: "±(0.09% + 2), same accuracy spec" },
    { label: "AC volts accuracy", a: "±(1% + 3) at 50–60 Hz, True RMS", b: "±(1.0% + 3), True RMS" },
    { label: "Current", a: "60 mA and 400 mA only, no 10 A input, 0.44 A fuse", b: "10 A max, 0.01 mA best resolution, no µA" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.9% + 2) up to 6 MΩ", b: "To 50 MΩ, ±(0.9% + 1)" },
    { label: "Capacitance", a: "To 9,999 µF, ±(1.2% + 2)", b: "To 10,000 µF, ±(1.2% + 2) (Fluke's table also says 9,999 µF)" },
    { label: "Frequency", a: "To 99.99 kHz, ±(0.1% + 1)", b: "To 100 kHz, ±(0.1% + 1)" },
    { label: "Temperature", a: "-40 to 537 °C, K-type probe included", b: "-40 to 400 °C, 80BK probe included" },
    { label: "Display", a: "6,000 counts", b: "6,000 counts, 33-segment bar graph" },
    { label: "Safety rating", a: "CAT IV 600V / CAT III 1000V", b: "CAT IV 600V / CAT III 1000V — identical" },
    { label: "Battery", a: "4 x AA; ≥1,000 insulation tests, ~1,000 h meter use", b: "One 9 V; about 200 h" },
    { label: "Size / weight", a: "5.0 x 10.0 x 20.3 cm; 550 g", b: "43 x 90 x 185 mm; 420 g" },
    { label: "Warranty", a: "3 years (extendable to 5 with registration)", b: "Lifetime" },
  ],
  differences: [
    "Insulation testing exists only on the 1587 FC: a 50–1000 V DC source and readings to 2 GΩ. The 179's resistance function uses a low test voltage and tops out at 50 MΩ, so it can't stress insulation the way a megohmmeter does.",
    "PI and DAR ratio tests, trended and saved over Fluke Connect, are unique to the 1587 FC. The 179 has no wireless logging of any kind.",
    "Current is the 1587 FC's real weak point here: 60 mA and 400 mA ranges only, behind a 0.44 A fuse, against the 179's full 10 A input. Neither has a µA range.",
    "Outside insulation testing, the two meters are closer than most Fluke pairs: Fluke lists identical ±(0.09% + 2) DC volts accuracy, near-identical AC volts accuracy, matching 6,000-count displays and the same CAT IV 600V / CAT III 1000V rating on both.",
    "Temperature reaches higher on the 1587 FC (537 °C vs 400 °C), and both ship a thermocouple probe, though different types (K-type vs the 80BK).",
    "Ownership: the 179 carries a lifetime warranty at a lower price; the 1587 FC's 3-year warranty (extendable to 5) buys insulation/PI/DAR capability the 179 simply doesn't have.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A category question, not a spec-sheet question</h2>
        <p className="text-muted leading-7 mb-4">
          Most Fluke comparisons on this site pit two general-purpose multimeters against each other on accuracy and
          range. This one doesn&apos;t work that way. Strip the insulation tester out of the 1587 FC and what&apos;s
          left is a meter that reads almost identically to the 179 on paper — same DC volts accuracy, same safety
          rating, the same 6,000-count display. The real question is whether your work ever calls for applying a
          high DC test voltage to a de-energized winding or cable and reading the leakage in megohms. If it does,
          only one of these two tools can do it.
        </p>
        <InfoCards
          items={[
            { label: "1587 FC: megohms", desc: "50 to 1000 V DC test voltage, readings to 2 GΩ." },
            { label: "1587 FC: PI/DAR", desc: "Timed ratio tests, trended in the Fluke Connect app." },
            { label: "1587 FC: no 10 A", desc: "Current stops at 400 mA behind a 0.44 A fuse." },
            { label: "179: 10 A input", desc: "Full 10 A current range the 1587 FC lacks entirely." },
            { label: "179: lifetime warranty", desc: "Against the 1587 FC's 3-year (extendable to 5) warranty." },
            { label: "Same CAT rating", desc: "CAT IV 600V / CAT III 1000V on both meters." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Neither meter carries OhmSavvy&apos;s Hands-on Tested badge. Everything below comes from Fluke&apos;s own
          product pages, spec tabs and datasheets, cross-checked against the official Amazon listings for each ASIN.
          Where Fluke&apos;s own pages disagree with themselves — the 179&apos;s comparison table says 9,999 µF
          capacitance where its spec table says 10,000 µF — we follow the spec table and say so.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1587 FC vs 179 in numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Resistance a meter can measure, in MΩ (log scale). The 1587 FC&apos;s insulation ranges dwarf the 179&apos;s ordinary ohms function.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 179, ohms", value: 50, display: "50 MΩ" },
                { label: "1587 FC, 50 V ohms test", value: 50, display: "50 MΩ" },
                { label: "1587 FC, 1000 V insulation test", value: 2000, display: "2 GΩ", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each meter accepts, in mA (log scale). The 1587 FC can&apos;t read a motor&apos;s running current at all.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 1587 FC", value: 400, display: "400 mA" },
                { label: "Fluke 179", value: 10000, display: "10 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Upper temperature limit, in °C. Both ship a thermocouple probe; the 1587 FC reads further into motor and process heat.</>}>
            <BarChart
              items={[
                { label: "Fluke 179 (80BK probe)", value: 400, display: "400 °C" },
                { label: "Fluke 1587 FC (K-type probe)", value: 537, display: "537 °C", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life in hours. The 1587 FC&apos;s 4 AAs outlast the 179&apos;s single 9 V by a wide margin.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 179 (one 9 V)", value: 200, display: "~200 h" },
                { label: "Fluke 1587 FC (4 x AA)", value: 1000, display: "~1,000 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="The DC volts accuracy is the same number">
            Fluke publishes ±(0.09% + 2) for DC volts on both meters. Take a 24.00 V DC control signal: on the
            6,000-count display that works out to 0.0216 V plus two counts of 0.01 V, about ±0.042 V, on either
            meter. If all you need is an everyday precision multimeter, the 1587 FC doesn&apos;t cost you anything
            there — it costs you the 10 A input and a lifetime warranty.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 179 can&apos;t stand in for an insulation tester</h2>
        <p className="text-muted leading-7 mb-4">
          Good winding insulation still leaks a tiny current. Apply a known DC voltage between the copper and the
          frame, measure that leakage, and Ohm&apos;s law gives the insulation resistance. The 1587 FC sources about
          1 mA at the bottom of each insulation range (for example 1 mA into 1 MΩ at 1000 V) and reads far less
          through healthy insulation. The 179&apos;s ohms function does something different: it drives a small
          current at a low test voltage chosen not to damage components. Insulation that reads open at a few volts
          can still break down at the 480 V a motor sees in service, plus whatever spikes ride on top of it — only a
          test at or above working voltage reveals that weakness.
        </p>
        <Figure caption={<>A winding-to-frame test on a disconnected three-phase motor. The 179 can probe the same two points but has no voltage source for the job. Reading shown is illustrative.</>}>
          <InsulationTestComparisonDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For lower-voltage winding checks with an ordinary meter — confirming continuity or a dead short rather than
          insulation strength — see our guide on{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            checking a motor winding for a short
          </Link>
          . That&apos;s a job either meter here can do; a true insulation test is not.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PI and DAR: the 1587 FC&apos;s other advantage</h2>
        <p className="text-muted leading-7 mb-4">
          A single megohm reading moves with temperature and humidity, so it&apos;s hard to judge alone. Ratio tests
          fix that: clean, dry insulation keeps absorbing charge for minutes, so its resistance climbs over the test;
          wet or contaminated insulation leaks steadily, so the reading stays flat.
        </p>
        <FlowDiagram
          steps={[
            { label: "De-energize and isolate", sub: "Lock out, lift the feeder, prove dead" },
            { label: "Apply test voltage", sub: "e.g. 500 V for a 480 V motor (common practice)" },
            { label: "DAR", sub: "60-second reading ÷ 30-second reading" },
            { label: "PI", sub: "10-minute reading ÷ 1-minute reading" },
            { label: "Discharge and log", sub: "Auto discharge; save to Fluke Connect" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A PI of 2.0 or more is the guideline commonly cited from IEEE 43 for most modern motor insulation classes;
          follow your plant&apos;s or the motor maker&apos;s acceptance criteria where they exist. The 179 has no
          equivalent function — Min/Max-Average on the 179 tracks a changing reading over a session, but it doesn&apos;t
          time a ratio test or push a stress voltage through the insulation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t do</h2>
        <DataTable
          head={["Can it…", "Fluke 1587 FC", "Fluke 179"]}
          rows={[
            ["Insulation-test a motor or cable (50–1000 V)", "Yes, to 2 GΩ", "No"],
            ["Run PI/DAR ratio tests", "Yes", "No"],
            ["Log readings wirelessly", "Yes, Fluke Connect", "No"],
            ["Read load current in series to 10 A", "No — 400 mA max", "Yes"],
            ["Measure True RMS AC volts", "Yes", "Yes"],
            ["Measure temperature with an included probe", "Yes, to 537 °C", "Yes, to 400 °C"],
            ["Measure capacitance", "Yes, to 9,999 µF", "Yes, to 10,000 µF"],
            ["Survive CAT IV 600V service-entrance transients", "Yes", "Yes"],
            ["Carry a lifetime warranty", "No — 3 years (extendable to 5)", "Yes"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1587 FC or Fluke 179: which should you buy?</h2>
        <DataTable
          head={["Your work", "Better fit", "Why"]}
          rows={[
            ["Motor rewind or repair shop", "Fluke 1587 FC", "Insulation, PI and DAR before and after every job"],
            ["Plant PM on motors and feeders", "Fluke 1587 FC", "Trend insulation resistance over years in the app"],
            ["Commissioning new cable runs", "Fluke 1587 FC", "Insulation test before first energization"],
            ["General electrical maintenance, no insulation testing", "Fluke 179", "Same core accuracy, 10 A input, lifetime warranty"],
            ["Industrial electronics, HVAC controls", "Fluke 179", "10 A current and a lower price for everyday work"],
            ["Running-current checks up to 10 A", "Fluke 179", "The 1587 FC stops at 400 mA"],
            ["Do both in one van", "Both", "Megohms and PI/DAR from the 1587 FC, 10 A from the 179"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If insulation testing is occasional rather than routine, some shops rent or borrow a megohmmeter instead of
          buying the 1587 FC outright. If you want a precision meter rather than either of these, compare the 179
          against a tighter-tolerance Fluke in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          or{" "}
          <Link href="/multimeters/fluke-289-vs-fluke-179" className={link}>
            Fluke 289 vs Fluke 179
          </Link>
          . If you want to see how the 1587 FC stacks up against other precision multimeters rather than a basic
          field meter, see{" "}
          <Link href="/multimeters/fluke-1587-fc-vs-fluke-87v" className={link}>
            Fluke 1587 FC vs Fluke 87V
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: insulation testing puts high voltage on purpose">
        An insulation tester generates up to 1000 V DC on its own, so treat the leads as live the whole time the test
        runs. Before testing, de-energize the equipment, lock and tag it out, and prove it dead with a meter on a
        known live source before and after. Disconnect the motor or cable at both ends so the test voltage can&apos;t
        reach drives, capacitors, surge protectors or electronics, which it can destroy. Keep everyone clear of the
        far end of a cable under test. Afterward, let the 1587 FC discharge the circuit (Fluke quotes under 0.5 s for
        1 µF or less; long cables can hold more) and confirm zero volts before touching conductors. The 30 V lockout
        is a backstop, not a substitute for lockout/tagout. If the equipment is part of a service or utility feed,
        call a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 1587 FC if your work includes insulation-testing motors, cables or transformers: its 50–1000 V test, PI/DAR ratios and Fluke Connect trending do a job the 179 can't touch, and its everyday meter functions are nearly identical to the 179's. Buy the Fluke 179 if you've never needed a megohmmeter: you get the same core accuracy and CAT IV safety rating, plus a full 10 A current input and a lifetime warranty, for less money and with no idle features. Neither meter is hands-on tested by OhmSavvy; both verdicts rest on Fluke's published specifications.",
  chooseNeitherIf:
    "Skip both if you need a true clamp meter for routine current measurement above 10 A, or if your work never approaches CAT III/IV voltages and a simpler, cheaper CAT II meter from our best multimeters roundup would do the job without paying for either meter's extras.",
  faqs: [
    {
      question: "What is the main difference between the Fluke 1587 FC and the Fluke 179?",
      answer:
        "The 1587 FC is an insulation-resistance tester built on a multimeter: it applies 50 to 1000 V DC to de-energized windings or cables and reads leakage resistance up to 2 GΩ, with timed PI and DAR ratio tests logged over Fluke Connect. The 179 is a standard CAT IV field multimeter with no insulation-test function at all, but a full 10 A current input the 1587 FC lacks.",
    },
    {
      question: "Can the Fluke 179 test insulation resistance?",
      answer:
        "No. The 179's resistance function tops out at 50 MΩ using a low test voltage meant not to damage components, so it can't stress insulation the way a megohmmeter does. Insulation that reads open at a few volts can still fail at motor operating voltage. For that test you need a dedicated tester like the 1587 FC.",
    },
    {
      question: "Is the Fluke 1587 FC as accurate as the 179 for everyday readings?",
      answer:
        "Essentially yes. Fluke publishes identical ±(0.09% + 2) DC volts accuracy for both, near-identical AC volts accuracy, matching 6,000-count displays and the same CAT IV 600V / CAT III 1000V safety rating. The 1587 FC's everyday meter functions aren't a downgrade from the 179 — the real tradeoff is current range and warranty length, not precision.",
    },
    {
      question: "Can the Fluke 1587 FC measure 10 A like the 179 can?",
      answer:
        "No. Fluke lists only 60 mA and 400 mA current ranges on the 1587 FC, AC and DC, behind a 0.44 A fuse with a 600 mA overload allowed for two minutes. There is no 10 A input. If you need to read a motor's running current, use a clamp meter or carry a 179 or similar full-range multimeter alongside the 1587 FC.",
    },
    {
      question: "Do I need Fluke Connect to use the 1587 FC's insulation test?",
      answer:
        "No. Insulation tests, PI and DAR ratio tests all run on the instrument itself without a phone. Fluke Connect adds wireless extras: saving readings in the app, TrendIt graphs of PI/DAR results over time, temperature compensation and sharing results with others. Fluke lists asset history and trending as part of Fluke Connect Assets, sold separately, so check what your workflow needs before relying on it.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 1587 FC review", href: "/multimeters/fluke-1587-fc-review" },
    { label: "Fluke 179 review", href: "/multimeters/fluke-179-review" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "How to check a motor winding for a short", href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke1587FcVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
