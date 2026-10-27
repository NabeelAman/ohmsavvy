// Specs per Fluke and the official Amazon listing, checked 2026-10-27:
// - Fluke 114 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-114
//   (True RMS AC V and AC mV; DC V and DC mV ±(0.5% + 2); AC V ±(1.0% + 3) 45-500 Hz, ±(2.0% + 3) 500 Hz-1 kHz;
//   Auto V LoZ 600.0 V ±(2.0% + 3) DC and 45-500 Hz, ±(4.0% + 3) 500 Hz-1 kHz, automatic AC/DC selection;
//   resistance 600.0 Ω to 6.000 MΩ ±(0.9% + 1), 40.00 MΩ ±(5% + 2); continuity beeps <20 Ω, off >250 Ω; 6,000 counts,
//   33-segment bar graph at 32/s; white LED backlight; Min/Max/Average with elapsed time; CAT III 600 V; 9 V, 400 h
//   without backlight; 167 × 84 × 46 mm, 550 g; 3-year warranty. Conflicts: the overview says "voltage and current"
//   but the spec table lists no current ranges; a temperature footnote appears with no temperature function listed.)
// - Amazon listing B000IZ9FD0 ("Fluke 114 Electrician's Multimeter"): https://www.amazon.com/dp/B000IZ9FD0
//   (weight 0.51 kg, against Fluke's 550 g; listing photo shows only COM and + jacks and "AUTO-V LoZ").
// - Fluke 115 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (115: 6.000 A / 10.00 A AC and DC, AC ±(1.5% + 3), 20 A for 30 s; capacitance 1 nF to 9,999 µF ±(1.9% + 2);
//   frequency to 50.00 kHz ±(0.1% + 2); diode 2.000 V ±(0.9% + 2); no AutoVolt/LoZ; normal V input >10 MΩ DC, >5 MΩ AC).
// - Fluke 110/113/114/115/117 Users Manual (March 2020): https://media.fluke.com/5e1db354-3a6e-49cf-9edd-b10800c0e608_original%20file.pdf
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-114-vs-fluke-115";

export const metadata = buildMetadata({
  title: "Fluke 114 vs Fluke 115: Key Differences Explained",
  description:
    "Fluke 114 vs Fluke 115 differences: AutoVolt LoZ on the 114, current, capacitance and frequency on the 115. Same case, accuracy and CAT III 600V. Which to buy.",
  path: "/multimeters/fluke-114-vs-fluke-115",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/** Input jacks: the 114 has two, the 115 adds a fused A jack, which is why only the 115 can measure current. */
function JackLayoutDiagram() {
  const jack = (cx: number, label: string, sub: string, accent: boolean) => (
    <g key={`${cx}-${label}`}>
      <circle cx={cx} cy="120" r="15" className={accent ? "fill-accent/15 stroke-accent" : "fill-surface stroke-foreground"} strokeWidth="2" />
      <circle cx={cx} cy="120" r="5" className={accent ? "fill-accent" : "fill-foreground"} />
      <text x={cx} y="152" fontSize="10" fontWeight="700" textAnchor="middle" className={accent ? "fill-accent" : "fill-foreground"}>
        {label}
      </text>
      <text x={cx} y="165" fontSize="8.5" textAnchor="middle" className="fill-muted">
        {sub}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Input jack comparison: the Fluke 114 has two jacks, COM and V/ohms; the Fluke 115 has three, adding a fused A jack that lets current flow through the meter in series"
    >
      <rect x="8" y="70" width="160" height="110" rx="12" className="fill-surface stroke-border" strokeWidth="1.4" />
      <text x="88" y="92" fontSize="11.5" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 114</text>
      {jack(58, "COM", "common", false)}
      {jack(118, "V Ω", "volts, ohms", false)}
      <rect x="192" y="70" width="160" height="110" rx="12" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="272" y="92" fontSize="11.5" fontWeight="700" textAnchor="middle" className="fill-accent">Fluke 115</text>
      {jack(222, "A", "fused, 10 A", true)}
      {jack(272, "COM", "common", false)}
      {jack(322, "V Ω", "volts, ohms, F", false)}
      <path d="M40 30 H320" className="stroke-foreground" strokeWidth="2" />
      <text x="180" y="22" fontSize="9.5" textAnchor="middle" className="fill-muted">Load current must pass through the meter to be measured</text>
      <path d="M222 30 V104" className="stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M272 104 V48" className="stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <text x="228" y="56" fontSize="9" className="fill-accent">in series</text>
      <text x="88" y="196" fontSize="9" textAnchor="middle" className="fill-muted">no path for current</text>
      <text x="272" y="196" fontSize="9" textAnchor="middle" className="fill-muted">A to COM carries the load</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 114 vs Fluke 115: Key Differences Explained",
  path,
  published: "2026-10-27",
  intro:
    "The Fluke 114 and Fluke 115 share a case, display, battery, 3-year warranty and CAT III 600V rating, and their voltage and resistance accuracy is identical. The key differences run in opposite directions. The 114 adds AutoVolt, a low-impedance (LoZ) position that picks AC or DC by itself and suppresses ghost voltage, but it measures no current, capacitance or frequency. The 115 adds 6A and 10A current, capacitance, frequency and a diode test, but has no LoZ. Choose by what you test, not by model number.",
  a: {
    pick: all.find((p) => p.name === "Fluke 114")!,
    imageAlt: "Fluke 114 electrician's True RMS multimeter with AUTO-V LoZ dial position, front view",
    chooseIf: [
      "Your job is checking voltage on building wiring and proving circuits dead",
      "You want a LoZ input so phantom voltage on shared runs doesn't fool you",
      "You never measure amps or capacitors with a handheld meter",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service digital multimeter, front view",
    chooseIf: [
      "You need to measure current up to 10 A on motors, heaters or vehicle circuits",
      "You check motor run capacitors or need a frequency reading",
      "You work on electronics and controls where a high-impedance input is the right choice",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts + 33-segment bar graph" },
    { label: "DC / AC volts accuracy", a: "±(0.5% + 2) / ±(1.0% + 3)", b: "±(0.5% + 2) / ±(1.0% + 3)" },
    { label: "AutoVolt LoZ", a: "Yes, 600.0 V, ±(2.0% + 3)", b: "No" },
    { label: "Current", a: "None in Fluke's spec table (see note)", b: "6 A and 10 A AC/DC" },
    { label: "Capacitance", a: "Not listed", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "Not listed", b: "To 50 kHz" },
    { label: "Diode test", a: "Not listed", b: "2.000 V, ±(0.9% + 2)" },
    { label: "Resistance", a: "600 Ω to 40 MΩ", b: "600 Ω to 40 MΩ" },
    { label: "Min/Max/Avg", a: "Yes, with elapsed time", b: "Yes" },
    { label: "Weight", a: "550 g (Amazon: 0.51 kg)", b: "550 g" },
    { label: "Battery", a: "9 V, 400 h typical", b: "9 V, 400 h typical" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Only the 114 has AutoVolt: a 600 V position with a low input impedance that selects AC or DC automatically and drains capacitively coupled ghost voltage.",
    "Only the 115 measures current, on 6.000 A and 10.00 A ranges for AC and DC through a fused A jack. The 114 has just two jacks.",
    "Only the 115 lists capacitance (1 nF to 9,999 µF), frequency (to 50 kHz) and a diode test.",
    "Everything they share is specified identically: DC volts ±(0.5% + 2), True RMS AC volts ±(1.0% + 3), resistance to 40 MΩ, continuity, bar graph, backlight, battery life and warranty.",
    "Both are CAT III 600V; neither is rated CAT IV.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 114 vs 115 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke built the 110 Series on one platform, then gave each model a different set of dial positions. The 114
          and 115 sit on opposite sides of that split: one leans toward verifying power wiring, the other toward
          measuring loads and components. Where both have a function, the accuracy line is the same.
        </p>
        <DataTable
          head={["Function", "Fluke 114", "Fluke 115", "Difference"]}
          rows={[
            ["True RMS AC volts", "600 mV to 600 V, ±(1.0% + 3)", "600 mV to 600 V, ±(1.0% + 3)", "Same accuracy"],
            ["DC volts and mV", "600 mV to 600 V, ±(0.5% + 2)", "600 mV to 600 V, ±(0.5% + 2)", "Same"],
            ["AutoVolt LoZ", "600 V, ±(2.0% + 3)", "Not available", "114 only"],
            ["AC/DC current", "None listed", "6 A / 10 A; 20 A for 30 s", "115 only"],
            ["Resistance", "600 Ω to 40 MΩ", "600 Ω to 40 MΩ", "Same"],
            ["Continuity", "Beeps below 20 Ω", "Beeps below 20 Ω", "Same"],
            ["Capacitance", "Not listed", "1 nF to 9,999 µF, ±(1.9% + 2)", "115 only"],
            ["Frequency", "Not listed", "To 50 kHz, ±(0.1% + 2)", "115 only"],
            ["Diode test", "Not listed", "2.000 V", "115 only"],
            ["Bar graph", "33 segments, 32/s", "33 segments, 32/s", "Same"],
            ["Min/Max/Avg", "With elapsed time", "Yes", "Same"],
            ["Safety", "CAT III 600V", "CAT III 600V", "Same"],
            ["Size", "167 × 84 × 46 mm", "167 × 84 × 46 mm", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Dial functions each meter lists, counted from Fluke&apos;s spec tables. The 115 has four more.</>}>
            <BarChart
              items={[
                { label: "Fluke 114", value: 5, display: "5 functions" },
                { label: "Fluke 115", value: 8, display: "8 functions", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Volts input impedance on a log scale. Only the 114 offers the low setting, via AutoVolt.</>}>
            <BarChart
              log
              items={[
                { label: "V DC (both)", value: 10_000_000, display: ">10 MΩ" },
                { label: "V AC (both)", value: 5_000_000, display: ">5 MΩ" },
                { label: "AutoVolt (114)", value: 3_000, display: "≈3 kΩ", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The function count above treats AC volts, DC volts, AutoVolt, resistance and continuity as the 114&apos;s five,
          and AC volts, DC volts, current, resistance, continuity, capacitance, frequency and diode as the 115&apos;s
          eight. The point isn&apos;t the number but which ones: the 115&apos;s extra four are all about loads and
          components, the 114&apos;s one unique entry is about trusting a voltage reading.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why the 114 can&apos;t measure amps</h2>
        <p className="text-muted leading-7 mb-4">
          Measuring current with a multimeter means breaking the circuit and routing the load through the meter. That
          needs a dedicated, fused current input. The 115 has one, its A jack, plus 6.000 A and 10.00 A ranges for AC
          and DC. The 114&apos;s front panel has only COM and a volts/ohms jack, so there is physically nowhere for load
          current to go.
        </p>
        <Figure caption={<>Input jacks on each meter. The 115&apos;s fused A jack is what makes in-series current measurement possible.</>}>
          <JackLayoutDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That limit is easy to work around for an electrician who carries a clamp meter, which is the usual tool for
          branch-circuit current anyway. It is a real gap for anyone who wants one meter for a blower motor, a 12 V
          accessory or a small appliance. Remember that the 115&apos;s current input also has a ceiling: 10.00 A
          continuous, with 20 A allowed for 30 seconds, and no mA or µA range.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What AutoVolt gives the 114</h2>
        <p className="text-muted leading-7 mb-4">
          AutoVolt is one dial position that does two things at once. It drops the input to a low impedance, so a
          phantom voltage induced onto a dead conductor collapses instead of reading as tens of volts. And it decides AC
          or DC from whatever is on the leads, so you don&apos;t have to. Fluke&apos;s spec tab gives it a single 600.0 V
          range at ±(2.0% + 3) from DC to 500 Hz.
        </p>
        <FlowDiagram
          steps={[
            { label: "Turn to AUTO-V LoZ", sub: "No AC or DC choice to make" },
            { label: "Touch the conductor", sub: "Low impedance loads coupled charge" },
            { label: "Phantom drains away", sub: "Real supply holds its voltage" },
            { label: "Read the result", sub: "600 V range, ±(2.0% + 3)" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Worked from Fluke&apos;s figures, the convenience costs precision. On a 240 V reading, the 114&apos;s normal V
          AC position allows 1.0% of 240 (2.4 V) plus 3 counts of 0.1 V, about ±2.7 V. AutoVolt allows 2.0% of 240 (4.8
          V) plus 0.3 V, about ±5.1 V. That is fine for live-or-dead, and the 114 still has its normal positions for a
          reading you will write down. The 115 owner gets the tighter figure every time but has to rely on other methods,
          explained in our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit
          </Link>
          , to separate a ghost from a real feed.
        </p>
        <div className="mt-4">
          <Figure caption={<>Allowed error on a 240 V AC reading at 45 to 500 Hz, from Fluke&apos;s accuracy lines. Lower is better.</>}>
            <BarChart
              items={[
                { label: "V AC, 114 or 115", value: 2.7, display: "±2.7 V", highlight: true },
                { label: "AutoVolt, 114", value: 5.1, display: "±5.1 V" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitance, frequency and diodes on the 115</h2>
        <p className="text-muted leading-7 mb-4">
          The three remaining 115 functions matter more to service technicians than to installers. Capacitance from 1 nF
          to 9,999 µF covers motor run and start capacitors on air handlers, condensers, well pumps and ceiling fans;
          our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            testing a fan motor capacitor
          </Link>{" "}
          shows the method. Frequency up to 50 kHz confirms a generator&apos;s output or a drive&apos;s supply side. The
          diode test checks rectifiers and the diodes inside power supplies and alternators. None of the three appears in
          the 114&apos;s spec table.
        </p>
        <DataTable
          head={["Task", "Fluke 114", "Fluke 115"]}
          rows={[
            ["Is the receptacle live?", "Yes, AutoVolt or V AC", "Yes, V AC"],
            ["Ghost voltage on an abandoned run", "AutoVolt LoZ settles it", "Needs a separate load"],
            ["Breaker off, conductor dead?", "Yes, live-dead-live", "Yes, live-dead-live"],
            ["Element or fuse continuity", "Yes", "Yes"],
            ["Run capacitor µF", "No", "Yes"],
            ["Motor or heater amps", "No", "Yes, to 10 A"],
            ["Generator frequency", "No", "Yes"],
            ["Bridge rectifier diode", "No", "Yes"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician doing rough-in and trim-out", "Fluke 114", "Voltage, continuity and LoZ are the whole job"],
            ["Electrician who also troubleshoots motors", "Fluke 117", "LoZ of the 114 plus the 115's amps and capacitance"],
            ["Maintenance or field service technician", "Fluke 115", "Current, capacitance and frequency on equipment"],
            ["HVAC service", "Fluke 115, or 116", "Capacitors and amps; µA and temperature need the 116"],
            ["Electronics or automotive", "Fluke 115", "Diode test, current and no low-impedance loading"],
            ["Homeowner checking outlets only", "Fluke 114", "Simple dial; LoZ avoids false alarms"],
            ["Homeowner fixing appliances", "Fluke 115", "Capacitors, element continuity and amps"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you need both lists, the{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>{" "}
          comparison shows the meter that combines them, and our{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-117" className={link}>
            Fluke 114 vs Fluke 117
          </Link>{" "}
          page looks at the same choice from a residential electrician&apos;s side. For more options, see the{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where Fluke&apos;s 114 page contradicts itself</h2>
        <KeyIdea title={`The "current" wording on the 114`}>
          The overview on Fluke&apos;s 114 product page describes True RMS &quot;voltage and current&quot; readings, but
          the specification table on the same page lists no current ranges, and the meter in the Amazon listing photo has
          only two jacks. We treat the 114 as having no current function. The same page also carries a temperature
          footnote with no temperature function in the table, which looks like leftover text. Fluke lists the 114 at
          550 g; the Amazon listing says 0.51 kg.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          The Fluke 115 carries our Hands-on Tested badge; the 114 doesn&apos;t, so its details here come from Fluke and
          the official listing. Read the{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          for more on the general-purpose model.
        </p>
      </section>

      <Callout title="Safety: match the meter to the job">
        Neither meter is rated CAT IV, so keep both off service drops and meter bases. Never try to measure current on
        a 114 by putting its leads across a circuit: it has no current input. On a 115, set the dial and move the red
        lead to the A jack before connecting in series, and never put the leads across a voltage source while they are
        in the A jack. Prove dead with a live-dead-live test on a known source before touching a conductor. Panel work
        belongs with a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 114 if your handheld meter only ever checks voltage, continuity and resistance on building wiring: AutoVolt's low-impedance input makes those checks quicker and harder to fool. Buy the Fluke 115 if you also measure current, capacitors, frequency or diodes. If you need AutoVolt and the 115's extras together, look at the Fluke 117.",
  faqs: [
    {
      question: "Does the Fluke 114 measure current?",
      answer:
        "Not according to Fluke's own specification table, which lists no current ranges, and the meter has only COM and volts/ohms jacks. The overview text on Fluke's 114 page mentions voltage and current readings, which contradicts the table. We go by the table and the hardware. For current, the Fluke 115 offers 6 A and 10 A ranges for AC and DC.",
    },
    {
      question: "Does the Fluke 115 have LoZ or AutoVolt?",
      answer:
        "No. The 115's volts positions are all high impedance, over 10 MΩ for DC and over 5 MΩ for AC. AutoVolt with its low-impedance input is found on the 114, 116 and 117 in the 110 Series. To check a suspected ghost voltage with a 115, you need to load the conductor some other way.",
    },
    {
      question: "Are the Fluke 114 and 115 equally accurate?",
      answer:
        "Yes, wherever they share a function. Fluke specifies both at ±(0.5% + 2) for DC volts, ±(1.0% + 3) for True RMS AC volts from 45 to 500 Hz, and ±(0.9% + 1) for resistance up to 6 MΩ. The only extra accuracy line on the 114 is AutoVolt, which is looser at ±(2.0% + 3).",
    },
    {
      question: "Can the Fluke 114 test capacitors?",
      answer:
        "No. Capacitance isn't listed in the 114's specifications. If you test motor run or start capacitors on HVAC units, pumps or fans, the Fluke 115 measures from 1 nF to 9,999 µF at ±(1.9% + 2). The 114 can only check that a capacitor isn't shorted using resistance, which isn't a real capacitance test.",
    },
    {
      question: "Which is better for a homeowner, the Fluke 114 or 115?",
      answer:
        "It depends on the projects. For checking outlets, switches and whether a breaker killed a circuit, the 114's simple dial and LoZ input fit well. For appliance repair, where you test capacitors, heating elements and motor current, the 115 covers more. Both are CAT III 600V with the same case and 3-year warranty.",
    },
    {
      question: "Is the Fluke 114 True RMS?",
      answer:
        "Yes. Fluke specifies True RMS on the 114's AC volts and AC millivolts ranges, at ±(1.0% + 3) from 45 to 500 Hz. That keeps readings trustworthy on circuits with LED drivers, dimmers or other non-sinusoidal loads. The 115 is also True RMS, on AC volts and AC amps.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 114 vs Fluke 117", href: "/multimeters/fluke-114-vs-fluke-117" },
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 115", href: "/multimeters/fluke-116-vs-fluke-115" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke114VsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
