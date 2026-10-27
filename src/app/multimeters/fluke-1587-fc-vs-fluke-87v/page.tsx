// Specs per Fluke, checked 2026-10-27:
// - Fluke 1587 FC product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1587-fc
//   Insulation test 50/100/250/500/1000 V (+20%/-0%); ranges 0.01-50.0 MΩ (50 V), 0.01-100 MΩ (100 V),
//   0.1-250 MΩ (250 V), 0.1-500 MΩ (500 V), 0.1-600 MΩ plus 0.6-2.0 GΩ (1000 V); 1 mA test current at 50 kΩ, 100 kΩ,
//   250 kΩ, 500 kΩ and 1 MΩ respectively; accuracy ±(3% + 5) at 50/100 V, ±(1.5% + 5) at 250-1000 V,
//   ±(10% + 3) for 0.6-2.0 GΩ; short-circuit current 1 mA nominal; auto discharge <0.5 s for C = 1 µF or less;
//   max capacitive load 1 µF; "Inhibit test if terminal voltage > 30 V prior to initialization of test"; PI/DAR
//   timed ratio tests with TrendIt graphs over Fluke Connect, app memory and temperature compensation; remote probe.
//   Meter: DC V 6 V to 1000 V ±(0.09% + 2), 10 MΩ input; DC mV 600 mV ±(0.1% + 1); AC V ±(1% + 3) 50-60 Hz,
//   ±(2% + 3) to 5 kHz; low-pass filter; current 60 mA and 400 mA AC/DC only (DC ±(0.2% + 2), AC ±(1.5% + 2)),
//   600 mA for 2 min max overload, 0.44 A 1000 V fuse; resistance 600 Ω-6 MΩ ±(0.9% + 2), 50 MΩ ±(1.5% + 3);
//   capacitance to 9999 µF ±(1.2% + 2); frequency to 99.99 kHz ±(0.1% + 1); temperature -40 to 537 °C ±(1% + 10)
//   with K-type thermocouple included; continuity tone below about 25 Ω; CAT IV 600V / CAT III 1000V; IP40
//   (non-operating); 4 x AA, at least 1000 insulation tests; 550 g; 5.0 x 10.0 x 20.3 cm; operating -20 to 55 °C;
//   three-year warranty. Included-items list says soft case, feature text says hard case (conflict stated on page).
// - Fluke 1587 FC/1577 technical data (6000-count display):
//   https://media.fluke.com/ad0b1bcb-5f5e-431c-9a0f-b10600757414_original%20file.pdf
// - Amazon listing B017OVC2UI (bare 1587 FC): item weight 1645 g conflicts with Fluke's 550 g; we use Fluke.
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   DC V ±(0.05% + 1); AC V ±(0.7% + 2) True RMS, low-pass filter (3 dB at 1 kHz); 10 A (20 A for 30 s), DC A
//   ±(0.2% + 2), 0.01 µA DC resolution; resistance ±(0.2% + 1) to 50 MΩ; capacitance to 9,999 µF; frequency to
//   200 kHz ±(0.005% + 1); temperature -200 to 1090 °C excl. probe (80BK included); 6000 counts, 19,999 hi-res;
//   250 µs peak capture; CAT IV 600V / CAT III 1000V; IP30; 355 g (624 g with holster); 9V, ~400 h; lifetime
//   warranty. No insulation test function.
// PI (10-minute ÷ 1-minute reading) and DAR (60-second ÷ 30-second reading) definitions and the "PI of 2.0 or more"
// guideline (commonly cited from IEEE 43 for most motor insulation classes) are standard engineering values, hedged.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-1587-fc-vs-fluke-87v";

export const metadata = buildMetadata({
  title: "Fluke 1587 FC vs 87V: Which Tester Do You Need?",
  description:
    "Fluke 1587 FC vs Fluke 87V comparison: a 50–1000 V insulation tester with PI/DAR against a precision 10 A multimeter. Specs, charts, test setup and a verdict.",
  path: "/multimeters/fluke-1587-fc-vs-fluke-87v",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** Insulation resistance test on a de-energized, isolated three-phase motor: winding to frame. */
function InsulationTestDiagram() {
  return (
    <svg
      viewBox="0 0 380 210"
      className="w-full h-auto"
      role="img"
      aria-label="Insulation test setup: the motor is disconnected and locked out at its disconnect. The 1587 FC's positive lead goes to the motor's winding terminals, which are tied together, and the common lead goes to the bare metal motor frame. The meter applies a DC test voltage such as 500 V and reads the tiny leakage current through the winding insulation as megohms."
    >
      {/* Disconnect, open and locked */}
      <rect x="10" y="20" width="70" height="80" rx="6" className="fill-surface stroke-border" strokeWidth="1.3" />
      <text x="45" y="14" fontSize="9" textAnchor="middle" className="fill-muted">Disconnect</text>
      {[34, 45, 56].map((x) => (
        <g key={x} className="stroke-foreground" strokeWidth="1.5">
          <line x1={x} y1="30" x2={x} y2="50" />
          <line x1={x} y1="50" x2={x + 8} y2="62" />
          <line x1={x} y1="70" x2={x} y2="90" />
        </g>
      ))}
      <text x="45" y="114" fontSize="8.5" textAnchor="middle" className="fill-accent">OPEN + LOCKED</text>
      {/* Leads to motor (disconnected) */}
      {[34, 45, 56].map((x, i) => (
        <path key={x} d={`M${x} 90 V${130 + i * 6} H150`} className="stroke-muted fill-none" strokeWidth="1.2" strokeDasharray="3 3" />
      ))}
      <text x="96" y="158" fontSize="8.5" textAnchor="middle" className="fill-muted">feeder lifted</text>
      {/* Motor */}
      <rect x="150" y="96" width="110" height="74" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="205" y="186" fontSize="9" textAnchor="middle" className="fill-foreground">Motor frame (bare metal)</text>
      <circle cx="205" cy="133" r="24" className="fill-none stroke-accent" strokeWidth="1.4" />
      <text x="205" y="137" fontSize="9" textAnchor="middle" className="fill-accent">windings</text>
      {/* Terminal box with jumper */}
      <rect x="180" y="70" width="50" height="22" rx="3" className="fill-surface stroke-border" strokeWidth="1.2" />
      {[190, 205, 220].map((x) => (
        <circle key={x} cx={x} cy="81" r="3" className="fill-foreground" />
      ))}
      <line x1="190" y1="81" x2="220" y2="81" className="stroke-accent" strokeWidth="1.6" />
      <text x="205" y="64" fontSize="8.5" textAnchor="middle" className="fill-muted">T1–T2–T3 jumpered</text>
      {/* Meter */}
      <rect x="296" y="30" width="72" height="104" rx="10" className="fill-[#f0b429]" />
      <rect x="306" y="40" width="52" height="34" rx="3" fill="#c9d4b8" />
      <text x="332" y="56" fontSize="10" fontWeight="700" textAnchor="middle" fill="#1f2328">512 MΩ</text>
      <text x="332" y="68" fontSize="7.5" textAnchor="middle" fill="#1f2328">500 V test</text>
      <circle cx="332" cy="100" r="12" fill="#2a2d31" />
      <text x="332" y="148" fontSize="9" textAnchor="middle" className="fill-foreground">1587 FC</text>
      {/* Leads */}
      <path d="M318 134 V150 H250 V60 H220 V78" className="fill-none stroke-[#e5484d]" strokeWidth="1.8" />
      <text x="262" y="56" fontSize="8.5" className="fill-[#e5484d]">+ lead</text>
      <path d="M346 134 V200 H240 V170" className="fill-none stroke-foreground" strokeWidth="1.8" />
      <text x="300" y="196" fontSize="8.5" className="fill-muted">COM to frame</text>
      <text x="330" y="164" fontSize="7.5" textAnchor="middle" className="fill-muted">illustrative reading</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 1587 FC vs Fluke 87V: Which Tester Do You Need?",
  path,
  published: "2026-10-27",
  intro:
    "You need the Fluke 1587 FC if you test insulation: it applies 50 to 1000 V DC to a de-energized motor, cable or transformer winding, reads up to 2 GΩ, and runs PI and DAR ratio tests logged to your phone. You need the Fluke 87V if you want the more precise everyday multimeter: ±(0.05% + 1) DC volts against ±(0.09% + 2), True RMS AC, a 10 A current input, 200 kHz frequency and 250 µs peak capture. The 1587 FC has no 10 A input at all, and the 87V cannot test insulation. Many motor technicians end up carrying both.",
  a: {
    pick: all.find((p) => p.name === "Fluke 1587 FC")!,
    imageAlt: "Fluke 1587 FC insulation multimeter with its insulation test button and rotary dial, front view",
    chooseIf: [
      "You check motor windings, feeders or transformers for insulation breakdown before re-energizing",
      "You want polarization index (PI) and dielectric absorption ratio (DAR) tests with trend graphs in an app",
      "You want one tool for megohm testing plus everyday volts, ohms, capacitance and temperature",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "You measure load current in series up to 10 A, or microamps down to 0.01 µA DC resolution",
      "You want tighter DC accuracy, a 19,999-count hi-res mode and peak capture for intermittent faults",
      "Insulation testing is done by someone else, or you already own a dedicated megohmmeter",
    ],
  },
  extraSpecs: [
    { label: "Insulation test", a: "50, 100, 250, 500, 1000 V; 0.01 MΩ to 2 GΩ", b: "No" },
    { label: "PI / DAR", a: "Yes, timed ratio tests", b: "No" },
    { label: "Live-circuit protection on IR test", a: "Won't start if > 30 V on the terminals", b: "Not applicable" },
    { label: "Wireless logging", a: "Fluke Connect: app memory, TrendIt graphs", b: "None" },
    { label: "DC volts accuracy", a: "±(0.09% + 2), 6 V to 1000 V", b: "±(0.05% + 1)" },
    { label: "AC volts accuracy", a: "±(1% + 3) at 50–60 Hz", b: "±(0.7% + 2)" },
    { label: "Current", a: "60 mA and 400 mA only; no 10 A input", b: "To 10 A (20 A for 30 s); 0.01 µA DC resolution" },
    { label: "Resistance", a: "To 50 MΩ, ±(0.9% + 2) to 6 MΩ", b: "To 50 MΩ, ±(0.2% + 1)" },
    { label: "Frequency", a: "To 99.99 kHz", b: "To 200 kHz" },
    { label: "Temperature", a: "-40 to 537 °C (K-type included)", b: "-200 to 1090 °C, excl. probe (80BK included)" },
    { label: "Display", a: "6,000 counts", b: "6,000 counts; 19,999 hi-res" },
    { label: "IP rating", a: "IP40 (non-operating)", b: "IP30" },
    { label: "Weight", a: "550 g (Amazon lists 1645 g)", b: "355 g (624 g with holster)" },
    { label: "Battery", a: "4 × AA; at least 1000 insulation tests", b: "9V, ~400 h" },
    { label: "Case", a: "Fluke says both soft case and hard case", b: "Holster with tilt-leg" },
    { label: "Warranty", a: "3 years", b: "Lifetime" },
  ],
  differences: [
    "Insulation testing: only the 1587 FC applies a high DC test voltage (50 to 1000 V) and reads leakage resistance up to 2 GΩ. The 87V's ohms function uses a low test voltage and tops out at 50 MΩ, so it can't stress insulation.",
    "PI and DAR: the 1587 FC runs timed ratio tests and logs them to the Fluke Connect app with TrendIt graphs. The 87V has no logging.",
    "Current: the 1587 FC measures only to 400 mA through a 0.44 A fuse. The 87V reads to 10 A (20 A for 30 seconds) and resolves 0.01 µA DC.",
    "Precision: the 87V's DC volts are ±(0.05% + 1) against ±(0.09% + 2), and its AC volts ±(0.7% + 2) against ±(1% + 3) at 50–60 Hz. It also has a 19,999-count hi-res mode and 250 µs peak capture.",
    "Shared: CAT IV 600V / CAT III 1000V, a low-pass filter for drives, capacitance to 9,999 µF, resistance to 50 MΩ and a K-type temperature input.",
    "Ownership: the 87V carries a lifetime warranty, the 1587 FC three years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two different jobs</h2>
        <p className="text-muted leading-7 mb-4">
          These two Flukes rarely compete. A multimeter asks &quot;what is the circuit doing right now?&quot; with the
          power on. An insulation tester asks &quot;will this winding or cable hold up when the power comes back?&quot;
          with the power off. The 1587 FC answers the second question and keeps a capable meter on board; the 87V
          answers the first question more precisely and doesn&apos;t touch the second.
        </p>
        <InfoCards
          items={[
            { label: "1587 FC: megohms", desc: "50 to 1000 V DC test voltage, readings to 2 GΩ." },
            { label: "1587 FC: PI/DAR", desc: "Timed ratio tests, trended in the Fluke Connect app." },
            { label: "1587 FC: no 10 A", desc: "Current stops at 400 mA." },
            { label: "87V: precision", desc: "±(0.05% + 1) DC volts and a 19,999-count mode." },
            { label: "87V: 10 A and µA", desc: "10 A input plus 0.01 µA DC resolution." },
            { label: "Same CAT rating", desc: "CAT IV 600V / CAT III 1000V on both." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 87V is a meter we bought and tested, rated 4.8. The 1587 FC is rated 4.6 from Fluke&apos;s specs and its
          Amazon listing; we haven&apos;t tested it. For the 87V in depth, see our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1587 FC vs 87V spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 1587 FC", "Fluke 87V", "Edge"]}
          rows={[
            ["Insulation test voltages", "50 / 100 / 250 / 500 / 1000 V", "None", "1587 FC"],
            ["Insulation range", "0.01 MΩ to 2.0 GΩ", "None", "1587 FC"],
            ["IR accuracy, 250–1000 V", "±(1.5% + 5) to 600 MΩ", "None", "1587 FC"],
            ["Auto discharge", "< 0.5 s for 1 µF or less", "None", "1587 FC"],
            ["DC volts", "±(0.09% + 2), 6 V to 1000 V", "±(0.05% + 1), to 1000 V", "87V"],
            ["AC volts, 50–60 Hz", "±(1% + 3)", "±(0.7% + 2)", "87V"],
            ["Low-pass filter", "Yes", "Yes, 3 dB at 1 kHz", "Same"],
            ["Current", "60 mA / 400 mA, AC and DC", "To 10 A; 0.01 µA DC resolution", "87V"],
            ["Resistance", "±(0.9% + 2) to 6 MΩ; 50 MΩ", "±(0.2% + 1), to 50 MΩ", "87V"],
            ["Capacitance", "To 9,999 µF, ±(1.2% + 2)", "To 9,999 µF", "Same"],
            ["Frequency", "To 99.99 kHz, ±(0.1% + 1)", "To 200 kHz, ±(0.005% + 1)", "87V"],
            ["Temperature", "-40 to 537 °C", "-200 to 1090 °C (excl. probe)", "87V"],
            ["Peak capture", "Not listed", "250 µs", "87V"],
            ["Wireless / logging", "Fluke Connect, TrendIt", "None", "1587 FC"],
            ["Operating temperature", "-20 to 55 °C", "-20 to 55 °C", "Same"],
            ["Warranty", "3 years", "Lifetime", "87V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Top of the 1587 FC&apos;s insulation range at each test voltage (log scale). Higher voltages read higher resistance.</>}>
            <BarChart
              log
              items={[
                { label: "50 V", value: 50, display: "50 MΩ" },
                { label: "100 V", value: 100, display: "100 MΩ" },
                { label: "250 V", value: 250, display: "250 MΩ" },
                { label: "500 V", value: 500, display: "500 MΩ" },
                { label: "1000 V", value: 2000, display: "2 GΩ", highlight: true },
                { label: "87V ohms (for scale)", value: 50, display: "50 MΩ, low voltage" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest current each meter accepts (log scale). The 1587 FC can&apos;t read a motor&apos;s running amps in series.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 1587 FC", value: 0.4, display: "400 mA" },
                { label: "Fluke 87V", value: 10, display: "10 A", highlight: true },
                { label: "Fluke 87V, 30 s max", value: 20, display: "20 A" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Source conflicts we couldn't resolve">
            Fluke&apos;s 1587 FC page lists a soft case in its box contents but describes a hard case elsewhere on the
            same page, and sells the C101 hard case separately, so check the listing before you count on one. Amazon
            gives the bare 1587 FC an item weight of 1645 g; Fluke says 550 g, which we use.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How an insulation test works</h2>
        <p className="text-muted leading-7 mb-4">
          Good winding insulation still leaks a tiny current. Apply a known DC voltage between the copper and the frame,
          measure that leakage, and Ohm&apos;s law gives the insulation resistance. The 1587 FC sources 1 mA when the
          load is at the bottom of each range (for example 1 mA into 1 MΩ at 1000 V), and far less through healthy
          insulation. Moisture, carbon dust, oil and cracked varnish all give the current an easier path, so the
          megohm reading falls.
        </p>
        <Figure caption={<>A typical winding-to-frame test on a disconnected three-phase motor. The reading shown is illustrative.</>}>
          <InsulationTestDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Why can&apos;t the 87V do this? Its ohms function drives a small test current at a low voltage, chosen so it
          won&apos;t damage components. Insulation that reads &quot;OL&quot; at a few volts can still break down at
          the 480 V a motor sees in service, plus the spikes riding on it. Only a test at or above working voltage
          reveals that weakness, which is why the 1587 FC offers 500 V and 1000 V test levels.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PI and DAR: why the trend matters more than one number</h2>
        <p className="text-muted leading-7 mb-4">
          A single megohm reading moves with temperature and humidity, so it&apos;s hard to judge on its own. Ratio
          tests fix that. Clean, dry insulation keeps absorbing charge for minutes, so its resistance climbs over the
          test; wet or contaminated insulation leaks steadily, so the reading stays flat. Two common ratios capture
          the climb:
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
        <div className="mt-4">
          <DataTable
            head={["Illustrative example", "1 min", "10 min", "PI", "Reading"]}
            rows={[
              ["Dry, clean winding", "400 MΩ", "1,000 MΩ", "2.5", "Healthy by common guidance"],
              ["Damp or dirty winding", "40 MΩ", "48 MΩ", "1.2", "Investigate: dry and clean, retest"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          These figures are worked examples, not measurements. A PI of 2.0 or more is the guideline commonly cited from
          IEEE 43 for most modern motor insulation classes; follow the motor maker&apos;s or your plant&apos;s acceptance
          criteria where they exist. The 1587 FC times the test and computes the ratio for you, and Fluke Connect stores
          each result so the next test can be compared against it. Fluke also lists temperature compensation in the
          app, which helps when last year&apos;s test was taken on a hotter day. For lower-voltage winding checks with an
          ordinary meter, see our guide on{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            checking a motor winding for a short
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 1587 FC vs 87V: which tester do you need?</h2>
        <DataTable
          head={["Your work", "Tool", "Why"]}
          rows={[
            ["Motor rewind or repair shop", "Fluke 1587 FC", "Insulation, PI and DAR before and after every job"],
            ["Plant PM on motors and feeders", "Fluke 1587 FC", "Trend insulation over years in the app"],
            ["Troubleshooting drives and controls", "Fluke 87V", "Low-pass filter, peak capture, tighter accuracy"],
            ["Running-current checks up to 10 A", "Fluke 87V", "The 1587 FC stops at 400 mA"],
            ["Flame sensors and µA signals", "Fluke 87V", "0.01 µA DC resolution"],
            ["Commissioning new cable runs", "Fluke 1587 FC", "Insulation test before first energization"],
            ["Do both in one van", "Both", "Megohms from the 1587 FC, precision and amps from the 87V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The missing 10 A input is less painful than it sounds, because motor currents are usually read with a clamp
          anyway. Fluke sells the 1587 FC in kits with a clamp accessory (sold as separate listings). Our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          covers the options. If you only need a precise meter, compare the 87V with its siblings in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
            Fluke 87V vs Fluke 179
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: insulation testing puts high voltage on purpose">
        An insulation tester generates up to 1000 V DC on its own, so treat the leads as live the whole time the test
        runs. Before testing, de-energize the equipment, lock and tag it out, and prove it dead with a meter on a known
        live source before and after. Disconnect the motor or cable at both ends so the test voltage can&apos;t reach
        drives, capacitors, surge protectors or electronics, which it can destroy. Keep everyone clear of the far end of
        a cable under test. Afterward, let the 1587 FC discharge the circuit (Fluke quotes under 0.5 s for 1 µF or less;
        long cables can hold more) and confirm zero volts before touching conductors. The 30 V lockout is a backstop,
        not a substitute for lockout/tagout. If the equipment is part of a service or utility feed, call a qualified
        electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 1587 FC if you maintain motors, cables or transformers: its 50–1000 V insulation test, PI/DAR ratios and Fluke Connect trending answer questions no multimeter can, and it still covers everyday volts, ohms, capacitance and temperature. Buy the Fluke 87V, our hands-on tested pick, if you need a precision meter: tighter DC and AC accuracy, a 10 A input, microamp resolution, 200 kHz and peak capture. For motor work, the two complement each other well.",
  faqs: [
    {
      question: "Can the Fluke 87V test insulation resistance?",
      answer:
        "No. The 87V's resistance function tops out at 50 MΩ and uses a low test voltage, so it can't stress insulation the way a megohmmeter does. Weak insulation can read open at a few volts and still fail at 480 V. For winding and cable insulation tests you need a tester like the 1587 FC, which applies 50 to 1000 V DC.",
    },
    {
      question: "Can the Fluke 1587 FC measure amps?",
      answer:
        "Only small currents. Fluke lists 60 mA and 400 mA ranges, AC and DC, protected by a 0.44 A fuse, with a 600 mA overload allowed for two minutes. There is no 10 A input, so it can't read a motor's running current in series. Use a clamp meter for that, or carry an 87V, which reads to 10 A.",
    },
    {
      question: "What test voltage should I use on a 480 V motor?",
      answer:
        "Common practice, based on IEEE 43 guidance, is a 500 V DC test for motors rated up to about 1000 V, with 1000 V DC used for some higher-rated equipment. The 1587 FC offers 50, 100, 250, 500 and 1000 V. Always check the motor maker's instructions first, and never test with drives or electronics still connected.",
    },
    {
      question: "What is a good PI reading?",
      answer:
        "A polarization index of 2.0 or higher is the guideline commonly cited from IEEE 43 for most modern motor insulation, while readings near 1.0 suggest moisture or contamination. PI is the 10-minute reading divided by the 1-minute reading. Trends matter more than one result, which is why the 1587 FC's Fluke Connect logging is useful.",
    },
    {
      question: "Is the Fluke 1587 FC accurate enough as an everyday multimeter?",
      answer:
        "For most field work, yes. Fluke lists ±(0.09% + 2) on DC volts, ±(1% + 3) on AC volts at 50–60 Hz, a low-pass filter, capacitance to 9,999 µF and temperature to 537 °C. The 87V is tighter, at ±(0.05% + 1) DC and ±(0.7% + 2) AC, and adds a hi-res mode and 10 A input.",
    },
    {
      question: "Does the Fluke 1587 FC need Fluke Connect to work?",
      answer:
        "No. Insulation tests and meter functions run on the instrument itself. Fluke Connect adds phone features: saving readings in the app, TrendIt graphs of PI and DAR tests, temperature compensation and sharing results. Fluke lists asset history and trending as Fluke Connect Assets, sold separately, so check what your plan needs before relying on it.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 28 II vs Fluke 87V", href: "/multimeters/fluke-28-ii-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "How to check a motor winding for a short", href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" },
    { label: "Clamp meter buying guide", href: "/multimeters/clamp-meter-buying-guide" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke1587FcVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
