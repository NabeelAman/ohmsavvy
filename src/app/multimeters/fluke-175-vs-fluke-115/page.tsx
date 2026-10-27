// Specs per Fluke, checked 2026-10-28:
// - Fluke 175 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-175
//   True RMS AC V and A; DC V ±(0.15% + 2); AC V ±(1.0% + 3); DC A ±(1.0% + 3); AC A ±(1.5% + 3); 0.01 mA resolution;
//   10 A; 50 MΩ; 1 nF to 10,000 µF ±(1.2% + 2); 100 kHz ±(0.1% + 1); Hold, Auto Hold, Min/Max-average;
//   CAT III 1000 V / CAT IV 600 V; 9 V, about 200 h; 43 x 90 x 185 mm; 420 g; lifetime warranty.
// - Fluke 170 Series Detailed Specifications (Fluke Corporation, Pub_ID 10824-eng, 06/05, hosted by Farnell):
//   https://www.farnell.com/datasheets/2631819.pdf  Model differences: backlight on 177 and 179 only; basic DC V 0.15%
//   (175), 0.09% (177, 179); all other specs the same. 6,000 counts at 4/s; 33-segment bar graph at 40/s; continuity
//   beeper on below 25 Ω, off above 250 Ω, detects opens or shorts of 250 µs or longer; current ranges 60.00 mA
//   (0.01 mA), 400.0 mA (0.1 mA), 6.000 A, 10.00 A (20 A for 30 s); AC A 45 Hz to 1 kHz; ohms 600.0 Ω to 50.00 MΩ;
//   diode 2.400 V; mA fuse 440 mA 1000 V, A fuse 11 A 1000 V; operating -10 to +50 °C; 8 kV surge protection.
// - Fluke 114/115/116/117 Detailed Specifications (2793260b, 08/2020):
//   https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   115: CAT III 600 V; 6,000 counts at 4/s, 33-segment bar graph at 32/s; DC V 600.0 mV to 600.0 V ±(0.5% + 2);
//   AC V True RMS ±(1.0% + 3) 45 to 500 Hz; current 6.000 A and 10.00 A only (20 A for 30 s), DC ±(1.0% + 3),
//   AC ±(1.5% + 3) 45 to 500 Hz; ohms to 40.00 MΩ ±(0.9% + 1); continuity beeper on below 20 Ω, detects opens or
//   shorts of 500 µs or longer; diode 2.000 V; capacitance to 9,999 µF ±(1.9% + 2); frequency to 50.00 kHz
//   ±(0.1% + 2); fuse for A input only; IP42; -10 to +50 °C; 9 V, 400 h typical without backlight.
// - Fluke 115 page and our 115 review (src/app/multimeters/fluke-115-review/page.tsx): backlight; Min/Max/Avg with
//   elapsed time; 167 x 84 x 46 mm; 550 g; 3-year warranty.
// Picks: Fluke 115 (4.8, hands-on tested) in best-multimeters; Fluke 175 (4.5, not tested by us) in
// src/lib/multimeter-catalog.ts. Readings in worked examples are illustrative.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-175-vs-fluke-115";

export const metadata = buildMetadata({
  title: "Fluke 175 vs Fluke 115 for Troubleshooting",
  description:
    "Fluke 175 vs 115 for everyday troubleshooting: the 175 adds milliamp ranges, 1000 V, CAT IV and 0.15% DC; the 115 adds a backlight and twice the battery life.",
  path: "/multimeters/fluke-175-vs-fluke-115",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** Illustrative: the same 14.37 mA signal on each meter's lowest current range. */
function MilliampReadoutDiagram() {
  const lcd = "#c9d4b8";
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative readouts for the same 14.37 milliamp current: the Fluke 175 on its 60 milliamp range shows 14.37 mA, while the Fluke 115, whose lowest current range is 6 amps with 1 milliamp steps, shows 0.014 A"
    >
      <text x="180" y="16" fontSize="10.5" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Illustrative: a 14.37 mA load on each meter
      </text>
      <g>
        <rect x="14" y="28" width="156" height="110" rx="14" className="fill-[#f0b429]" />
        <rect x="28" y="44" width="128" height="52" rx="5" fill={lcd} />
        <text x="146" y="80" fontSize="26" fontWeight="700" textAnchor="end" fill="#1d2b1d" fontFamily="monospace">14.37</text>
        <text x="148" y="91" fontSize="9" textAnchor="end" fill="#1d2b1d">mA DC</text>
        <text x="92" y="116" fontSize="10" fontWeight="700" textAnchor="middle" fill="#2a2d31">Fluke 175</text>
        <text x="92" y="130" fontSize="8.5" textAnchor="middle" fill="#2a2d31">60.00 mA range, 0.01 mA steps</text>
      </g>
      <g>
        <rect x="190" y="28" width="156" height="110" rx="14" className="fill-[#f0b429]" />
        <rect x="204" y="44" width="128" height="52" rx="5" fill={lcd} />
        <text x="322" y="80" fontSize="26" fontWeight="700" textAnchor="end" fill="#1d2b1d" fontFamily="monospace">0.014</text>
        <text x="324" y="91" fontSize="9" textAnchor="end" fill="#1d2b1d">A DC</text>
        <text x="268" y="116" fontSize="10" fontWeight="700" textAnchor="middle" fill="#2a2d31">Fluke 115</text>
        <text x="268" y="130" fontSize="8.5" textAnchor="middle" fill="#2a2d31">6.000 A range, 1 mA steps</text>
      </g>
      <text x="180" y="160" fontSize="9" textAnchor="middle" className="fill-muted">
        Below about 30 mA the 115&apos;s reading is mostly last-digit uncertainty
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 175 vs Fluke 115 for Everyday Electrical Troubleshooting",
  path,
  published: "2026-10-28",
  intro:
    "For everyday electrical troubleshooting that includes low-current or control work, the Fluke 175 is the more capable meter: it has 60 mA and 400 mA ranges that resolve 0.01 mA, reads to 1000 V, carries CAT IV 600V and specifies DC volts at ±(0.15% + 2) against the 115's ±(0.5% + 2). The Fluke 115 is the easier meter to live with: it has a backlight (Fluke lists none for the 175), about 400 hours per 9 V battery against about 200, and it's the one we have hands-on tested. Both are True RMS 6,000-count meters with 10 A inputs, capacitance, frequency and Min/Max/Avg.",
  a: {
    pick: all.find((p) => p.name === "Fluke 175")!,
    imageAlt: "Fluke 175 True RMS digital multimeter with test leads, front view",
    chooseIf: [
      "You check milliamp signals: thermostat and relay coil currents, sensor loops, small DC loads",
      "You work on service entrances or 1000 V DC systems such as solar strings, where CAT IV 600V and 1000 V matter",
      "You want a lifetime warranty and a lighter 420 g meter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service digital multimeter, front view",
    chooseIf: [
      "You often read the meter in dim panels, crawlspaces or under sinks and want a backlit display",
      "Your work stays below 600 V on branch circuits, appliances and equipment, where CAT III 600V covers you",
      "You want the longer 400-hour battery life and the meter we've tested ourselves",
    ],
  },
  extraSpecs: [
    { label: "Lowest current range", a: "60.00 mA, 0.01 mA resolution", b: "6.000 A, 0.001 A resolution" },
    { label: "Maximum voltage", a: "1000 V AC/DC", b: "600 V AC/DC" },
    { label: "Safety rating", a: "CAT IV 600V / CAT III 1000V", b: "CAT III 600V" },
    { label: "DC volts accuracy", a: "±(0.15% + 2)", b: "±(0.5% + 2)" },
    { label: "AC volts, True RMS", a: "±(1.0% + 3), 45 to 500 Hz", b: "±(1.0% + 3), 45 to 500 Hz" },
    { label: "Resistance", a: "To 50.00 MΩ", b: "To 40.00 MΩ, ±(0.9% + 1)" },
    { label: "Capacitance", a: "±(1.2% + 2), to 10,000 µF", b: "±(1.9% + 2), to 9,999 µF" },
    { label: "Frequency", a: "±(0.1% + 1), to 100 kHz", b: "±(0.1% + 2), to 50 kHz" },
    { label: "Continuity capture", a: "Opens or shorts of 250 µs or longer", b: "Opens or shorts of 500 µs or longer" },
    { label: "Backlight", a: "No (177 and 179 only, per Fluke's 170 Series datasheet)", b: "Yes" },
    { label: "Battery", a: "9 V, about 200 h", b: "9 V, 400 h typical" },
    { label: "Size / weight", a: "43 × 90 × 185 mm, 420 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "Lifetime", b: "3 years" },
  ],
  differences: [
    "Milliamps: the 175 has 60 mA and 400 mA ranges with 0.01 mA and 0.1 mA resolution. The 115's only current ranges are 6 A and 10 A, so its smallest step is 1 mA.",
    "Voltage and category: the 175 measures to 1000 V and is rated CAT IV 600V / CAT III 1000V. The 115 stops at 600 V and is rated CAT III 600V.",
    "DC accuracy: ±(0.15% + 2) on the 175 against ±(0.5% + 2) on the 115, so the 175's percentage term is a third the size.",
    "Backlight: the 115 has one. Fluke's 170 Series datasheet lists the backlight on the 177 and 179 only.",
    "Battery and warranty: about 400 hours and 3 years on the 115; about 200 hours and a lifetime warranty on the 175.",
    "Shared: True RMS AC volts at ±(1.0% + 3), DC amps at ±(1.0% + 3), AC amps at ±(1.5% + 3), 10 A inputs, 6,000 counts, a 33-segment bar graph, capacitance, frequency, diode test and Min/Max/Avg.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What &quot;everyday troubleshooting&quot; asks of a meter</h2>
        <p className="text-muted leading-7 mb-4">
          Most troubleshooting days are a string of small questions. Is the outlet live? Is the breaker feeding the
          right voltage? Is this element open? Is the capacitor in spec? Is the control circuit getting 24 V? Both
          meters answer every one of those. They split on three narrower questions: how much current is the thermostat
          or coil drawing, can I measure on the service side of the panel, and can I read the display in the dark?
        </p>
        <InfoCards
          items={[
            { label: "175: milliamps", desc: "60 mA and 400 mA ranges; the 115 has none." },
            { label: "175: CAT IV 600V", desc: "And 1000 V, against CAT III 600V." },
            { label: "175: DC accuracy", desc: "0.15% against 0.5% basic DC volts." },
            { label: "115: backlight", desc: "Lit display; the 175 has none." },
            { label: "115: battery", desc: "About 400 h against about 200 h." },
            { label: "Both", desc: "True RMS, 10 A, 6,000 counts, Min/Max/Avg." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We own and have tested the 115, which holds our 4.8 rating. The 175 is scored 4.5 from Fluke&apos;s product
          page, Fluke&apos;s 170 Series detailed specifications and its Amazon listing; we haven&apos;t used one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 175 vs 115 spec by spec</h2>
        <DataTable
          head={["Function", "Fluke 175", "Fluke 115", "Edge"]}
          rows={[
            ["DC volts", "±(0.15% + 2), 600.0 mV to 1000 V", "±(0.5% + 2), 600.0 mV to 600.0 V", "175"],
            ["AC volts, True RMS", "±(1.0% + 3) at 45 to 500 Hz, to 1000 V", "±(1.0% + 3) at 45 to 500 Hz, to 600 V", "175 (range)"],
            ["DC amps", "60 mA, 400 mA, 6 A, 10 A; ±(1.0% + 3)", "6 A, 10 A; ±(1.0% + 3)", "175"],
            ["AC amps, True RMS", "±(1.5% + 3), 45 Hz to 1 kHz", "±(1.5% + 3), 45 to 500 Hz", "175 (bandwidth)"],
            ["Resistance", "600.0 Ω to 50.00 MΩ", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "175 (range)"],
            ["Continuity", "On below 25 Ω; catches 250 µs opens/shorts", "On below 20 Ω; catches 500 µs opens/shorts", "175"],
            ["Diode test", "2.400 V", "2.000 V", "175"],
            ["Capacitance", "±(1.2% + 2), to 10,000 µF", "±(1.9% + 2), to 9,999 µF", "175"],
            ["Frequency", "±(0.1% + 1), to 100 kHz", "±(0.1% + 2), to 50 kHz", "175"],
            ["Display", "6,000 counts; 33-segment bar graph at 40/s", "6,000 counts; 33-segment bar graph at 32/s", "Same"],
            ["Backlight", "No", "Yes", "115"],
            ["Hold / Min/Max/Avg", "Hold, Auto Hold, Min/Max/Avg", "Hold, Min/Max/Avg", "Same"],
            ["Safety", "CAT IV 600V / CAT III 1000V", "CAT III 600V", "175"],
            ["Battery", "9 V, about 200 h", "9 V, 400 h typical", "115"],
            ["Weight", "420 g", "550 g", "175"],
            ["Warranty", "Lifetime", "3 years", "175"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Basic DC volts accuracy, as ±% of reading. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 175", value: 0.15, display: "±0.15% + 2", highlight: true },
                { label: "Fluke 115", value: 0.5, display: "±0.5% + 2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Battery life on one 9 V alkaline cell, without backlight. Higher is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 115", value: 400, display: "400 h", highlight: true },
                { label: "Fluke 175", value: 200, display: "~200 h" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Shortest open or short the continuity beeper is specified to catch. Shorter is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 175", value: 250, display: "250 µs", highlight: true },
                { label: "Fluke 115", value: 500, display: "500 µs" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Here is what the DC figures mean on a 24 V DC control supply that reads 24.00 V on the 60.00 V range: the 175 allows 0.15% of 24 V (0.036 V) plus two counts of 0.01 V, about
          ±0.056 V. The 115 allows 0.5% (0.12 V) plus 0.02 V, about ±0.14 V. Both are fine for &quot;is it there?&quot;;
          the 175 is the better judge of a supply that is drifting toward its tolerance limit.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The milliamp gap, drawn out</h2>
        <p className="text-muted leading-7 mb-4">
          This is the difference you&apos;ll notice first in everyday work. A thermostat&apos;s anticipator circuit, a
          relay coil, a small solenoid, an LED driver&apos;s output or a 4–20 mA sensor all draw tens of milliamps. The
          175 has a dedicated mA jack and ranges built for that. The 115 measures current only through its 10 A jack,
          on 6 A and 10 A ranges.
        </p>
        <Figure caption={<>Illustrative readings for the same current. The 115 can measure it, but only to the nearest milliamp.</>}>
          <MilliampReadoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On the 6 A range, the 115&apos;s ±(1.0% + 3) spec allows about ±0.003 A at 14 mA, roughly a fifth of the
          reading. On the 175&apos;s 60 mA range, ±(1.0% + 3) allows about ±0.17 mA. If your troubleshooting includes
          coil and control currents, the 175 is the meter that can actually answer the question. For the technique, see{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            how to measure milliamps with a multimeter
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mt-4">
          The 175&apos;s mA input is protected by a 440 mA, 1000 V fuse and its 10 A input by an 11 A, 1000 V fuse,
          per Fluke&apos;s 170 Series datasheet. Put the red lead in the mA jack on a circuit that can deliver more and
          you&apos;ll blow the small fuse, so start in the 10 A jack when the current is unknown.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Everyday jobs, side by side</h2>
        <DataTable
          head={["Job", "Fluke 175", "Fluke 115", "Notes"]}
          rows={[
            ["Dead outlet or tripped GFCI", "Yes", "Yes", "Either; the 115's backlight helps behind furniture"],
            ["Voltage at the main breaker or meter base", "Yes, CAT IV 600V", "No: CAT III 600V", "Service-side work needs CAT IV"],
            ["Heating element or igniter resistance", "Yes", "Yes", "Same ±(0.9% + 1) on common ranges"],
            ["Run capacitor in µF", "±(1.2% + 2)", "±(1.9% + 2)", "Both well inside a typical ±5% or ±6% part tolerance"],
            ["24 V control circuit voltage", "Yes", "Yes", "175 tighter on DC"],
            ["Thermostat, relay coil or solenoid current", "Yes, 0.01 mA", "Only to 1 mA", "175"],
            ["Motor or appliance amps, up to 10 A", "Yes", "Yes", "Same accuracy"],
            ["Solar string or battery bank over 600 V DC", "Yes, to 1000 V", "No", "175"],
            ["Wiggle-test a cord for a break", "250 µs capture", "500 µs capture", "175 catches shorter dropouts"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Notice what&apos;s missing from both. Neither has a LoZ input for ghost voltage, non-contact detection or a
          temperature input. If you work mostly on residential branch circuits and want LoZ and VoltAlert, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 117 vs 115
          </Link>{" "}
          comparison covers what the 117 adds. If you want the 175&apos;s ranges with a backlight, look at{" "}
          <Link href="/multimeters/fluke-175-vs-fluke-177" className={link}>
            Fluke 175 vs 177
          </Link>
          .
        </p>
        <KeyIdea title="Capability versus convenience">
          The 175 can measure more: milliamps, 1000 V, CAT IV locations and tighter DC. The 115 is nicer to use: a lit
          display and twice the battery life. Decide whether your everyday work ever touches milliamps or the service
          side of the panel. If it does, the 175 wins outright. If it never does, the 115&apos;s convenience is the better
          deal.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 175 or 115: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["HVAC or appliance technician", "Fluke 175", "Milliamp ranges for controls; tighter capacitance spec"],
            ["Residential electrician", "Fluke 175", "CAT IV 600V for meter bases and service equipment"],
            ["Maintenance tech in dim plant rooms", "Fluke 115", "Backlight; CAT III 600V covers branch and equipment work"],
            ["Homeowner or DIYer", "Fluke 115", "Backlit, long battery life, everything a home needs below 600 V"],
            ["Solar or off-grid installer", "Fluke 175", "Reads to 1000 V DC"],
            ["Electronics hobbyist", "Fluke 175", "mA ranges and 0.15% DC volts"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more on the 115, read our{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            hands-on Fluke 115 review
          </Link>
          . For other everyday options, see{" "}
          <Link href="/multimeters/fluke-107-vs-fluke-115" className={link}>
            Fluke 107 vs 115
          </Link>
          , our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide and the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <Callout title="Safety: the category rating decides where you may probe">
        The 115&apos;s CAT III 600V rating covers distribution panels, branch circuits and fixed equipment. It does not
        cover the service drop, meter base or service entrance, which call for CAT IV; the 175 is rated CAT IV 600V.
        Whatever meter you use, match the leads to the rating, check the meter on a known live source before and after
        testing, and never measure volts with the red lead in a current jack. Work on a service entrance belongs to a
        licensed electrician unless it&apos;s your trade.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 175 measures more: 0.01 mA current ranges, 1000 V, CAT IV 600V, ±(0.15% + 2) DC volts and a lifetime warranty, so it's the better everyday troubleshooter if your work touches control currents or service equipment. The Fluke 115, which we've tested hands-on, is the more comfortable meter for branch-circuit and equipment work under 600 V, with a backlit display and about 400 hours per battery. Neither has LoZ, non-contact voltage or temperature.",
  faqs: [
    {
      question: "Can the Fluke 115 measure milliamps?",
      answer:
        "Only coarsely. Its current ranges are 6 A and 10 A, so its finest step is 1 mA and a 14 mA reading shows as 0.014 A, with an error allowance of about 3 mA. For coil, thermostat or sensor currents you need mA ranges, which the Fluke 175 has at 60 mA (0.01 mA steps) and 400 mA.",
    },
    {
      question: "Does the Fluke 175 have a backlight?",
      answer:
        "No. Fluke's 170 Series detailed specifications list the backlight as a feature of the 177 and 179 only, and the 175's Amazon listing photo shows no backlight key. If you often read the meter in dark spaces, the backlit Fluke 115 or the 177 is a better fit.",
    },
    {
      question: "Is the Fluke 175 or 115 better for an electrician?",
      answer:
        "The 175, for most electricians, because its CAT IV 600V rating covers meter bases and service equipment and it reads to 1000 V. The 115's CAT III 600V rating covers panels and branch circuits only. Electricians who want ghost-voltage protection should also look at the Fluke 117, which adds LoZ and non-contact detection.",
    },
    {
      question: "Which has the longer battery life, the Fluke 175 or 115?",
      answer:
        "The 115. Fluke rates it at 400 hours typical on a 9 V alkaline cell without the backlight, while the 175 is rated at about 200 hours. In daily use that means the 175 needs a new battery roughly twice as often.",
    },
    {
      question: "Are the Fluke 175 and 115 both True RMS?",
      answer:
        "Yes. Both read AC volts and AC amps as True RMS, with the same ±(1.0% + 3) AC volts and ±(1.5% + 3) AC amps accuracy. The 175's AC amps spec runs to 1 kHz, the 115's to 500 Hz. That keeps either one accurate on LED drivers, variable-speed motors and other non-sinusoidal loads.",
    },
    {
      question: "Why is the Fluke 175's warranty longer than the 115's?",
      answer:
        "Fluke lists a lifetime warranty for the 175 and three years for the 115. The warranty covers defects, not damage from misuse, and fuses and batteries are consumables. If you expect to keep a meter for decades, the 175's lifetime cover is a real point in its favor.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 175 vs Fluke 177", href: "/multimeters/fluke-175-vs-fluke-177" },
    { label: "Fluke 117 vs Fluke 115", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 107 vs Fluke 115", href: "/multimeters/fluke-107-vs-fluke-115" },
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Best multimeter for home use", href: "/multimeters/best-multimeter-for-home-use" },
  ],
};

export default function Fluke175VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
