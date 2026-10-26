// Fluke 17B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus (checked
// 2026-10-26): 4,000 counts, 3 updates/s, backlit; DC V 4/40/400/1000 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3);
// 400.0 mV ranges; current 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3), AC 40-400 Hz;
// resistance 400.0 Ω to 40.00 MΩ ±(0.5% + 2) to ±(1.5% + 3); capacitance 40.00 nF to 1000 µF; frequency 10 Hz-100 kHz
// ±(0.1% + 3); duty cycle 1-99%; temperature -55 °C to 400 °C: ±(2% + 1 °C) from 50 to 400 °C, ±2 °C from 0 to 50 °C,
// ±(9% + 2 °C) below 0 °C; diode 2.000 V ±10%; input >10 MΩ, <100 pF; fuses 440 mA and 11 A, 1000 V; 2 × AA, 500 h
// minimum; 183 × 91 × 49.5 mm; 455 g; IP40; CAT III 600V, 1000 V maximum terminal to earth. CAT II 1000V per the
// 15B+/17B+ datasheet (as on the Pick).
// Fluke 15B+/17B+/18B+ users manual (copy at https://techno.my/cdn/shop/files/15B__17B__18B.pdf): continuity beeper below
// 70 Ω; hazardous voltage LED (17B+ only) at 30 V or more or overload; warranty 1 year from shipment.
// Fluke 117 per the Fluke 114/115/116/117 datasheet (2793260b) and 2020 users manual, as cited on
// /multimeters/fluke-115-vs-fluke-117: True RMS; 6,000 counts + 33-segment bar graph; DC V ±(0.5% + 2); AC V ±(1.0% + 3)
// at 45-500 Hz; 6.000 A and 10.00 A, 1 mA best resolution; capacitance 1 nF to 9,999 µF; frequency to 50 kHz; continuity
// below 20 Ω; VoltAlert, AutoVolt, LoZ about 3 kΩ; no temperature (116 only); one 9V, 400 h typical; 167 × 84 × 46 mm;
// 550 g; 3-year warranty.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 117",
  description:
    "Fluke 17B+ vs Fluke 117: temperature, frequency to 100 kHz and a 1000V range against True RMS, NCV and LoZ. Specs, charts and which Fluke suits you.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-117",
});

const link = "text-accent hover:underline";

// Log axis for the current-range ladder: 0.1 µA (1e-7 A) to 10 A (1e1 A).
const ix = (amps: number) => 70 + (Math.log10(amps) + 7) * 32.5;

const LADDER: { meter: string; range: string; lo: number; hi: number }[] = [
  { meter: "17B+", range: "400.0 µA", lo: 1e-7, hi: 4e-4 },
  { meter: "17B+", range: "4000 µA", lo: 1e-6, hi: 4e-3 },
  { meter: "17B+", range: "40.00 mA", lo: 1e-5, hi: 4e-2 },
  { meter: "17B+", range: "400.0 mA", lo: 1e-4, hi: 4e-1 },
  { meter: "17B+", range: "4.000 A", lo: 1e-3, hi: 4 },
  { meter: "17B+", range: "10.00 A", lo: 1e-2, hi: 10 },
  { meter: "117", range: "6.000 A", lo: 1e-3, hi: 6 },
  { meter: "117", range: "10.00 A", lo: 1e-2, hi: 10 },
];

/** Each current range drawn from its resolution (one count) to full scale on a log axis. */
function CurrentLadderDiagram() {
  const rowH = 17;
  const top = 28;
  return (
    <svg
      viewBox="0 0 340 225"
      className="w-full h-auto"
      role="img"
      aria-label="Current ranges on a log scale from 0.1 microamps to 10 amps. The Fluke 17B+ has six ranges starting at 400 microamps with 0.1 microamp resolution, so it covers small currents such as a 4 to 20 milliamp loop. The Fluke 117 has only 6 amp and 10 amp ranges, so its smallest step is 1 milliamp."
    >
      {[1e-7, 1e-5, 1e-3, 1e-1, 1e1].map((a, i) => (
        <g key={a}>
          <line x1={ix(a)} x2={ix(a)} y1={top - 6} y2={top + rowH * LADDER.length + 6} className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={ix(a)} y="16" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {["0.1 µA", "10 µA", "1 mA", "100 mA", "10 A"][i]}
          </text>
        </g>
      ))}
      <rect x={ix(4e-3)} y={top - 6} width={ix(2e-2) - ix(4e-3)} height={rowH * LADDER.length + 12} className="fill-accent/10" />
      {LADDER.map((r, i) => {
        const y = top + rowH * i + rowH / 2;
        const is17 = r.meter === "17B+";
        return (
          <g key={r.meter + r.range}>
            <text x="4" y={y + 3} fontSize="8.5" className={is17 ? "fill-accent" : "fill-foreground"}>
              {r.meter} {r.range}
            </text>
            <line x1={ix(r.lo)} x2={ix(r.hi)} y1={y} y2={y} strokeWidth="6" strokeLinecap="round" className={is17 ? "stroke-accent" : "stroke-foreground"} />
          </g>
        );
      })}
      <text x={(ix(4e-3) + ix(2e-2)) / 2} y={top + rowH * LADDER.length + 20} fontSize="8.5" textAnchor="middle" className="fill-muted">
        4–20 mA loop
      </text>
      <text x="170" y="220" fontSize="8.5" textAnchor="middle" className="fill-muted">Each bar runs from one count of resolution to full scale</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 117",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 17B+ vs Fluke 117 splits Fluke's line into the electronics meter and the electrician's meter. The 17B+ carries more measurement functions: temperature with an included probe, frequency to 100 kHz, duty cycle, relative mode and a 1000V range. The 117 carries the safety-and-speed features: True RMS, VoltAlert non-contact detection, AutoVolt and a low-impedance mode, on a finer 6,000-count display.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You work on electronics, appliances or HVAC and want temperature in the same meter",
      "You need µA ranges, frequency, duty cycle and relative mode",
      "You want MIN MAX recording and a hazardous-voltage warning LED",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "You do live electrical work where NCV and LoZ speed up safe checks",
      "You measure drives, LED drivers or other loads that need True RMS",
      "You want a 6,000-count display and a three-year warranty",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, 3 updates/s, backlit", b: "6,000 counts + 33-segment bar graph" },
    { label: "AC response", a: "No True RMS claim by Fluke", b: "True RMS" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 2)" },
    { label: "Current ranges", a: "400 µA to 10A AC/DC, six ranges", b: "6A and 10A AC/DC" },
    { label: "Capacitance", a: "40 nF to 1,000 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "10 Hz to 100 kHz, plus duty cycle", b: "Up to 50 kHz" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe included", b: "No (Fluke datasheet: 116 only)" },
    { label: "NCV / AutoVolt / LoZ", a: "None listed", b: "Yes / Yes / Yes" },
    { label: "Continuity", a: "Beeps below 70 Ω", b: "Beeps below 20 Ω" },
    { label: "Hazard warning", a: "LED at 30 V or more", b: "Not listed" },
    { label: "Size", a: "183 × 91 × 49.5 mm", b: "167 × 84 × 46 mm" },
    { label: "Weight", a: "455 g", b: "550 g" },
    { label: "Battery", a: "2 × AA, 500 hours minimum", b: "One 9V, about 400 hours" },
    { label: "Warranty", a: "1 year (Fluke manual)", b: "3 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke makes no True RMS claim for the 17B+.",
    "Only the 117 has VoltAlert non-contact detection, AutoVolt and a low-impedance mode.",
    "The 17B+ adds temperature with an included Type K probe, duty cycle, relative mode and µA and mA current ranges.",
    "The 17B+ reads up to 1000V and 100 kHz; the 117 stops at 600V and 50 kHz.",
    "The 117's 6,000-count display and bar graph are finer than the 17B+'s 4,000 counts.",
    "Fluke's manual gives the 17B+ a 1-year warranty against 3 years for the 117.",
    "The 17B+ Amazon listing's photo shows the newer 17B MAX, so check which model ships.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 117 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ reaches further on frequency and voltage, while the 117 shows readings with finer resolution.
          Which matters depends on whether you chase signals or confirm mains. Basic DC accuracy is nearly identical:
          ±0.5% of reading on both, with one extra count on the 17B+. On the 400 V range that count is 0.1 V; on the
          117&apos;s 600 V range a count is also 0.1 V, so in practice you will not see a difference on a battery or a
          receptacle.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum frequency: the 17B+ reads twice as high.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 100, display: "100 kHz", highlight: true },
                { label: "Fluke 117", value: 50, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Display counts: the 117 resolves 50% more steps per range.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 4000, display: "4,000 counts" },
                { label: "Fluke 117", value: 6000, display: "6,000 counts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Warranty in years: Fluke&apos;s 15B+/17B+ manual gives one year; the 117 has three.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 1, display: "1 year" },
                { label: "Fluke 117", value: 3, display: "3 years", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Continuity beep threshold in ohms. Lower is stricter: the 117 only beeps on a near-dead short.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 70, display: "< 70 Ω" },
                { label: "Fluke 117", value: 20, display: "< 20 Ω", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 6,000-count display matters more on the 117 than the number suggests. A 4,000-count meter switches from its
          40 V range to its 400 V range at 40 V, so a 48 V telecom or solar battery reads to 0.1 V on the 17B+, while the
          117 keeps it on its 60 V range with 0.01 V steps. The 17B+&apos;s 4,000 counts are fine for 12 V and 24 V
          systems, which stay on the 40 V range.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Small currents: where the 17B+ pulls ahead</h2>
        <p className="text-muted leading-7 mb-4">
          The biggest functional gap isn&apos;t temperature, it&apos;s current. The 17B+ has six current ranges from
          400.0 µA to 10 A, all at ±(1.5% + 3), through a separate µA/mA jack protected by a 440 mA, 1000 V fuse. The 117
          has only its 6 A and 10 A ranges. Its best resolution is 1 mA, so a 4-20 mA control loop reads as a handful of
          whole milliamps, and a furnace flame-sensor signal of a few microamps doesn&apos;t register.
        </p>
        <Figure caption={<>Current ranges of each meter on a log scale, per Fluke. The shaded band marks a 4-20 mA instrument loop.</>}>
          <CurrentLadderDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          On the 17B+, a 12.00 mA loop reading sits on the 40.00 mA range at 0.01 mA resolution. That is the kind of
          job the 117 was never designed for. For the method, see{" "}
          <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
            how to measure microamps with a multimeter
          </Link>{" "}
          or our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            best multimeters for 4-20 mA loop testing
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Function checklist</h2>
        <DataTable
          head={["Function", "Fluke 17B+", "Fluke 117"]}
          rows={[
            ["True RMS", "Not claimed", "Yes"],
            ["Non-contact voltage", "No", "Yes"],
            ["Low-impedance mode", "No", "Yes"],
            ["Temperature", "Yes", "No"],
            ["Duty cycle", "Yes", "Not listed"],
            ["Relative mode", "Yes", "Not listed"],
            ["MIN MAX", "Yes", "Yes (Min/Max/Average)"],
            ["Hazardous-voltage LED", "Yes, at 30 V or more", "Not listed"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Two different jobs">
            The 17B+ is the better bench and appliance meter; the 117 is the better meter for live building
            wiring. Electricians rarely need temperature, and electronics hobbyists rarely need NCV.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Temperature on the 17B+: how accurate is it?</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke specifies the 17B+&apos;s thermocouple input in three bands. From 50 °C to 400 °C it is ±(2% + 1 °C), so a
          200 °C heatsink or oven reading carries about ±5 °C (2% of 200 is 4 °C, plus 1 °C). From 0 °C to 50 °C it
          is ±2 °C, good enough for supply and return air. Below freezing the spec loosens to ±(9% + 2 °C), so a -20 °C
          freezer reads within about ±3.8 °C. Those figures cover the meter only; any thermocouple probe adds its own
          tolerance on top.
        </p>
        <DataTable
          head={["Temperature band", "17B+ accuracy", "Worked example"]}
          rows={[
            ["-55 °C to 0 °C", "±(9% + 2 °C)", "-20 °C reads within about ±3.8 °C"],
            ["0 °C to 50 °C", "±2 °C", "22 °C room air reads 20 to 24 °C"],
            ["50 °C to 400 °C", "±(2% + 1 °C)", "200 °C heatsink reads within about ±5 °C"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 117 has no temperature function at all. Fluke&apos;s datasheet puts the thermocouple input on the Fluke 116,
          the HVAC model of the 110 Series. For thermocouple checks themselves, see{" "}
          <Link href="/multimeters/how-to-check-a-thermocouple-with-a-multimeter" className={link}>
            how to check a thermocouple with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs Fluke 117: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician on live building wiring", "Fluke 117", "True RMS, VoltAlert and LoZ for daily panel work"],
            ["Electronics hobbyist or student", "Fluke 17B+", "µA ranges, frequency to 100 kHz, duty cycle and relative mode"],
            ["Appliance repair technician", "Fluke 17B+", "Temperature probe plus mA ranges for controls"],
            ["Controls technician on 4-20 mA loops", "Fluke 17B+", "40.00 mA range reads loop current to 0.01 mA"],
            ["Technician on VFDs and LED drivers", "Fluke 117", "Distorted waveforms need True RMS"],
            ["Buyer who wants the longest warranty", "Fluke 117", "Three years against one"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We have owner-tested the 117; the 17B+ assessment is desk research against Fluke&apos;s specifications. For the
          17B+ against its simpler twin, read{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+ vs Fluke 15B+
          </Link>
          ; for the full Fluke write-up, see our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: a 1000V range is not a 1000V rating for mains">
        The 17B+ measures up to 1000V, but its rating for building wiring is CAT III 600V, the same as the 117; the CAT II
        1000V rating in Fluke&apos;s datasheet covers lower-energy, plug-connected equipment. Neither meter
        belongs at the service entrance or meter base. Its hazardous-voltage LED lights at 30 V or more, but treat it as a
        reminder, not proof a circuit is dead: test live-dead-live with the leads, and call a licensed electrician for
        panel faults.
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if you do electrical work: True RMS, NCV, AutoVolt and LoZ are what matter on live circuits. Buy the Fluke 17B+ for electronics, appliance and HVAC diagnostics, where temperature, frequency, duty cycle and µA ranges earn their place, and accept that it isn't True RMS.",
  faqs: [
    {
      question: "Is the Fluke 17B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 17B+ in its datasheet, manual or product page, so don't count on it. It reads clean sine waves correctly, but on drives, dimmers and LED drivers its AC readings can drift. The Fluke 117 is True RMS, which is why electricians working on those loads usually choose it.",
    },
    {
      question: "Does the Fluke 17B+ measure temperature?",
      answer:
        "Yes. Fluke lists -55 °C to 400 °C with an included Type K bead probe, at ±(2% + 1 °C) above 50 °C and ±2 °C between 0 and 50 °C. Fluke's datasheet doesn't give the 117 a temperature function; in the 110 Series only the Fluke 116 reads a thermocouple.",
    },
    {
      question: "Which has the higher voltage range, the 17B+ or the 117?",
      answer:
        "The 17B+ measures up to 1000V AC/DC and Fluke's datasheet rates it CAT III 600V and CAT II 1000V. The 117 measures up to 600V and is rated CAT III 600V. For panels and branch circuits the two carry the same CAT III 600V rating, so the higher range doesn't make the 17B+ safer on mains.",
    },
    {
      question: "Why does the 17B+ Amazon listing show a 17B MAX?",
      answer:
        "Fluke has introduced the 17B MAX, and the listing's main photo shows it, so the listing may ship the newer model. Check the listing details and the seller's description before buying if you specifically want the 17B+. The specs on this page are for the 17B+ as Fluke publishes them.",
    },
    {
      question: "Can the Fluke 117 measure milliamps like the 17B+?",
      answer:
        "Not usefully. The 117's smallest current range is 6.000 A with 1 mA resolution, so a 4-20 mA loop shows only whole milliamps and microamp signals don't register. The 17B+ has 400.0 µA, 4000 µA, 40.00 mA and 400.0 mA ranges through a separate fused jack, which is why it suits controls and electronics work.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 117 vs Fluke 15B+", href: "/multimeters/fluke-117-vs-fluke-15b-plus" },
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 115 vs Fluke 117", href: "/multimeters/fluke-115-vs-fluke-117" },
  ],
};

export default function Fluke17BPlusVsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
