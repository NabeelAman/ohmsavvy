// Specs per Fluke, checked 2026-10-25:
// - Fluke 117 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 115 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115
// - Fluke 116 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-116
// - Fluke 114 product page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-114
// - Fluke 114/115/116/117 detailed specifications datasheet (2793260b, 08/2020):
//   https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
// - Fluke 110/113/114/115/117 Users Manual (March 2020):
//   https://media.fluke.com/5e1db354-3a6e-49cf-9edd-b10800c0e608_original%20file.pdf
// Conflicts between these sources are stated on the page (frequency top range, LoZ capacitance on the 115,
// and the product pages' comparison table listing temperature for the 115/117 and frequency for the 117 only).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea, MeterReadout } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-115-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 117 vs 115: Which Fluke Should You Buy?",
  description:
    "Fluke 117 vs 115 for electricians and home testing: same True RMS, CAT III 600V core; the 117 adds VoltAlert NCV, LoZ and AutoVolt. Specs, charts, verdict.",
  path: "/multimeters/fluke-115-vs-fluke-117",
});

const link = "text-accent hover:underline";

// Feature matrix for the 110 Series, per the Fluke 114/115/116/117 datasheet and the 2020 users manual.
const MATRIX_MODELS = ["114", "115", "116", "117"] as const;
const MATRIX_ROWS: { label: string; has: boolean[] }[] = [
  { label: "True RMS", has: [true, true, true, true] },
  { label: "CAT III 600V", has: [true, true, true, true] },
  { label: "Min/Max/Avg, hold", has: [true, true, true, true] },
  { label: "AutoVolt + LoZ", has: [true, false, true, true] },
  { label: "VoltAlert NCV", has: [false, false, false, true] },
  { label: "6A / 10A current", has: [false, true, false, true] },
  { label: "Capacitance", has: [false, true, true, true] },
  { label: "Diode test", has: [false, true, true, true] },
  { label: "Microamps (µA)", has: [false, false, true, false] },
  { label: "Temperature", has: [false, false, true, false] },
];

function FeatureMatrix() {
  const labelW = 132;
  const colW = 52;
  const rowH = 24;
  const top = 30;
  const W = labelW + colW * MATRIX_MODELS.length + 8;
  const H = top + rowH * MATRIX_ROWS.length + 8;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto max-w-md mx-auto"
      role="img"
      aria-label="Feature matrix of the Fluke 114, 115, 116 and 117: the 117 alone has VoltAlert, the 116 alone has microamps and temperature, the 115 and 117 alone have amp ranges, and the 115 alone lacks AutoVolt and LoZ"
    >
      {[1, 3].map((i) => (
        <rect key={i} x={labelW + colW * i + 3} y="4" width={colW - 6} height={H - 8} rx="6" className="fill-accent/10" />
      ))}
      {MATRIX_MODELS.map((m, i) => (
        <text key={m} x={labelW + colW * i + colW / 2} y="21" fontSize="11" fontWeight="700" textAnchor="middle" className={i === 1 || i === 3 ? "fill-accent" : "fill-muted"}>
          {m}
        </text>
      ))}
      {MATRIX_ROWS.map((row, r) => {
        const y = top + rowH * r + rowH / 2;
        return (
          <g key={row.label}>
            <line x1="4" x2={W - 4} y1={y + rowH / 2} y2={y + rowH / 2} className="stroke-border" strokeWidth="0.6" />
            <text x="6" y={y + 4} fontSize="10.5" className="fill-foreground">
              {row.label}
            </text>
            {row.has.map((h, i) => (
              <circle
                key={i}
                cx={labelW + colW * i + colW / 2}
                cy={y}
                r="6"
                strokeWidth="1.6"
                className={h ? "fill-accent stroke-accent" : "fill-none stroke-border"}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Two conductors sharing a conduit: the energized one couples a phantom voltage onto the open one. */
function GhostVoltageDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram: an energized conductor capacitively couples voltage onto a disconnected conductor in the same conduit, which a high-impedance meter reads as a phantom voltage">
      <rect x="10" y="22" width="250" height="62" rx="10" className="fill-surface stroke-border" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="16" y="16" fontSize="9.5" className="fill-muted">Shared conduit or cable</text>
      <line x1="20" y1="40" x2="250" y2="40" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
      <text x="24" y="35" fontSize="9.5" className="fill-accent">Energized conductor (120 V AC)</text>
      <line x1="20" y1="68" x2="250" y2="68" className="stroke-foreground" strokeWidth="3" strokeLinecap="round" />
      <text x="24" y="80" fontSize="9.5" className="fill-muted">Disconnected conductor (open at both ends)</text>
      {[70, 130, 190].map((x) => (
        <g key={x} className="stroke-muted" strokeWidth="1.3">
          <line x1={x} y1="42" x2={x} y2="50" />
          <line x1={x - 7} y1="50" x2={x + 7} y2="50" />
          <line x1={x - 7} y1="56" x2={x + 7} y2="56" />
          <line x1={x} y1="56" x2={x} y2="66" />
        </g>
      ))}
      <text x="160" y="55" fontSize="8.5" className="fill-muted">stray C</text>
      <path d="M250 68 H290 V100" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <circle cx="290" cy="118" r="18" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="290" y="122" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <path d="M290 136 V155 H40" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <path d="M40 149 V161 M33 161 H47" className="stroke-foreground" strokeWidth="1.6" />
      <text x="56" y="150" fontSize="9.5" className="fill-muted">Neutral or ground reference</text>
      <text x="314" y="98" fontSize="9" textAnchor="middle" className="fill-muted">meter</text>
    </svg>
  );
}

/** VoltAlert: the sensor at the top of the 117 picks up the AC electric field around an energized conductor. */
function VoltAlertDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Diagram: the AC electric field around an insulated live conductor is sensed by the VoltAlert sensor at the top of the Fluke 117, which lights a red LED and beeps">
      {[22, 34, 46].map((r) => (
        <circle key={r} cx="90" cy="70" r={r} className="fill-none stroke-accent" strokeWidth="1" strokeDasharray="3 4" opacity={1 - r / 70} />
      ))}
      <circle cx="90" cy="70" r="13" className="fill-surface stroke-foreground" strokeWidth="2" />
      <circle cx="90" cy="70" r="6" className="fill-accent" />
      <text x="90" y="134" fontSize="9.5" textAnchor="middle" className="fill-foreground">Insulated hot conductor</text>
      <text x="90" y="147" fontSize="9" textAnchor="middle" className="fill-muted">AC field around it</text>
      <g transform="rotate(-90 220 95)">
        <rect x="160" y="60" width="120" height="74" rx="14" className="fill-[#f0b429]" />
        <rect x="174" y="72" width="52" height="50" rx="4" fill="#c9d4b8" />
        <circle cx="252" cy="97" r="14" fill="#2a2d31" />
      </g>
      <rect x="183" y="33" width="74" height="8" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1" />
      <circle cx="268" cy="44" r="5" fill="#e5484d" />
      <path d="M276 34 q6 10 0 20 M282 30 q9 14 0 28" className="fill-none stroke-muted" strokeWidth="1.3" />
      <line x1="137" y1="56" x2="181" y2="38" className="stroke-muted" strokeWidth="1" />
      <text x="220" y="22" fontSize="9.5" textAnchor="middle" className="fill-foreground">VoltAlert sensor (top of meter)</text>
      <text x="300" y="80" fontSize="9" textAnchor="middle" className="fill-muted">red LED</text>
      <text x="300" y="92" fontSize="9" textAnchor="middle" className="fill-muted">+ beeper</text>
      <text x="170" y="178" fontSize="9" textAnchor="middle" className="fill-muted">Lo: flush outlets, power strips, cords. Hi: recessed sockets; bare wire from 24 V.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 115",
  path,
  published: "2026-10-25",
  updated: "2026-10-27",
  intro:
    "The Fluke 117 and Fluke 115 have identical core specs: True RMS, CAT III 600V, a 6,000-count display with bar graph, 10A current, capacitance to 9,999 µF and frequency, all with the same accuracy. The 117 adds three features for electricians: VoltAlert non-contact voltage detection, a low-impedance (LoZ) input that suppresses ghost voltage, and AutoVolt automatic AC/DC selection. Same body, same battery, same 3-year warranty; the choice is whether you'll use those three extras.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS digital multimeter, front view",
    chooseIf: [
      "You work on building wiring, where a LoZ reading tells a ghost voltage from a live conductor",
      "You want VoltAlert non-contact detection built in instead of carrying a separate pen tester",
      "You switch between AC and DC circuits often and want AutoVolt to pick the mode for you",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service digital multimeter, front view",
    chooseIf: [
      "Your work is equipment, controls and electronics more than fixed building wiring",
      "You don't need non-contact detection or a LoZ check and would rather not pay for them",
      "You already own a non-contact voltage tester and the 115 costs less on the day you buy",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts + 33-segment bar graph" },
    { label: "AC/DC voltage", a: "600 mV to 600 V, DC ±(0.5% + 2)", b: "600 mV to 600 V, DC ±(0.5% + 2)" },
    { label: "VoltAlert non-contact voltage", a: "Yes, Lo/Hi sensitivity", b: "No" },
    { label: "LoZ ghost-voltage input", a: "Yes, about 3 kΩ (AutoVolt position)", b: "No" },
    { label: "AutoVolt AC/DC auto-select", a: "Yes, 600 V range", b: "No" },
    { label: "Current", a: "6A and 10A AC/DC; no mA or µA ranges", b: "6A and 10A AC/DC; no mA or µA ranges" },
    { label: "Capacitance", a: "1 nF to 9,999 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "To 50 kHz (manual: 99.99 kHz)", b: "To 50 kHz (manual: 99.99 kHz)" },
    { label: "Temperature", a: "No (Fluke 116 only)", b: "No (Fluke 116 only)" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Battery", a: "9V, 400 h typical (no backlight)", b: "9V, 400 h typical (no backlight)" },
    { label: "Warranty", a: "3 years", b: "3 years" },
  ],
  differences: [
    "Only the 117 has VoltAlert: a sensor in the top of the meter that lights a red LED and beeps near an energized AC conductor, with no probe contact.",
    "Only the 117 has a low-impedance input. On its AutoVolt position the input drops to about 3 kΩ, so capacitively coupled ghost voltage collapses instead of showing as a believable reading.",
    "Only the 117 has AutoVolt, which picks AC or DC from the signal itself. On the 115 you choose the AC or DC volts position yourself.",
    "Everything else matches on Fluke's datasheet: voltage and current ranges and accuracy, resistance to 40 MΩ, continuity, diode test, capacitance, frequency, Min/Max/Avg, backlight, size, weight, battery life and warranty.",
    "Neither measures temperature or has a mA or µA range; in the 110 Series those belong to the Fluke 116.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same measuring core", desc: "Identical ranges and accuracy for volts, amps, ohms, capacitance and frequency." },
            { label: "117 extra: VoltAlert", desc: "Non-contact AC detection from the top of the meter, with LED and beeper." },
            { label: "117 extra: LoZ", desc: "About 3 kΩ input on the AutoVolt position, which drains ghost voltage." },
            { label: "117 extra: AutoVolt", desc: "One dial position that reads AC or DC volts without you choosing." },
            { label: "115 strength", desc: "Every volts position stays high impedance, the right input for electronics." },
            { label: "Verdict", desc: "Electricians: 117. Equipment, controls and bench work: 115 is enough." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Both meters carry our Hands-on Tested badge and a 4.8 rating. Every spec below comes from Fluke&apos;s own
          product pages, the 114/115/116/117 datasheet and the 2020 users manual. For the full write-ups, read our{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 117 vs 115 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke publishes one accuracy table for the whole 110 Series and marks which model has which function. Read
          down the last column: of more than twenty lines, three differ, and all three are things the 117 adds.
        </p>
        <DataTable
          head={["Spec", "Fluke 117", "Fluke 115", "Same?"]}
          rows={[
            ["Display", "6,000 counts, 4 updates/s", "6,000 counts, 4 updates/s", "Same"],
            ["Bar graph", "33 segments, 32 updates/s", "33 segments, 32 updates/s", "Same"],
            ["True RMS", "AC volts and AC amps", "AC volts and AC amps", "Same"],
            ["Safety rating", "CAT III 600V (IEC 61010-2-033)", "CAT III 600V (IEC 61010-2-033)", "Same"],
            ["DC volts", "600.0 mV to 600.0 V, ±(0.5% + 2)", "600.0 mV to 600.0 V, ±(0.5% + 2)", "Same"],
            ["AC volts, 45 to 500 Hz", "600.0 mV to 600.0 V, ±(1.0% + 3)", "600.0 mV to 600.0 V, ±(1.0% + 3)", "Same"],
            ["Normal volts input", ">10 MΩ DC, >5 MΩ AC", ">10 MΩ DC, >5 MΩ AC", "Same"],
            ["AutoVolt (Auto-V LoZ)", "600.0 V, ±(2.0% + 3), about 3 kΩ input", "Not available", "117 only"],
            ["VoltAlert NCV", "Yes, Lo and Hi sensitivity", "Not available", "117 only"],
            ["LoZ ghost-voltage check", "Yes, via AutoVolt", "Not available", "117 only"],
            ["AC/DC amps", "6.000 A and 10.00 A; 20 A for 30 s", "6.000 A and 10.00 A; 20 A for 30 s", "Same"],
            ["AC amps accuracy", "±(1.5% + 3), 45 to 500 Hz", "±(1.5% + 3), 45 to 500 Hz", "Same"],
            ["mA / µA ranges", "None (1 mA resolution on 6 A)", "None (1 mA resolution on 6 A)", "Same"],
            ["Resistance", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "600.0 Ω to 40.00 MΩ, ±(0.9% + 1)", "Same"],
            ["Continuity", "Beeps below 20 Ω, 500 µs opens/shorts", "Beeps below 20 Ω, 500 µs opens/shorts", "Same"],
            ["Diode test", "2.000 V, ±(0.9% + 2)", "2.000 V, ±(0.9% + 2)", "Same"],
            ["Capacitance", "1 nF to 9,999 µF, ±(1.9% + 2)", "1 nF to 9,999 µF, ±(1.9% + 2)", "Same"],
            ["Frequency", "99.99 Hz to 50.00 kHz, ±(0.1% + 2)", "99.99 Hz to 50.00 kHz, ±(0.1% + 2)", "Same"],
            ["Min/Max/Avg, display hold", "Yes", "Yes", "Same"],
            ["Backlight", "Yes, auto-off after 40 s", "Yes, auto-off after 40 s", "Same"],
            ["Temperature", "No", "No", "Same"],
            ["Size", "167 × 84 × 46 mm", "167 × 84 × 46 mm", "Same"],
            ["Weight", "550 g", "550 g", "Same"],
            ["Battery and life", "One 9V alkaline, 400 h typical", "One 9V alkaline, 400 h typical", "Same"],
            ["Sleep mode", "After 20 min idle", "After 20 min idle", "Same"],
            ["Warranty", "3 years", "3 years", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>The 110 Series feature matrix. Filled dot = has it. The 115 and 117 columns are shaded.</>}>
            <FeatureMatrix />
          </Figure>
          <Figure
            caption={
              <>
                Volts input impedance on a log scale. The 117&apos;s AutoVolt input is roughly 1,700 to 3,300 times lower than
                either meter&apos;s normal volts input.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DC volts (both)", value: 10_000_000, display: ">10 MΩ" },
                { label: "AC volts (both)", value: 5_000_000, display: ">5 MΩ" },
                { label: "AutoVolt LoZ (117)", value: 3_000, display: "≈3 kΩ", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Size, weight and battery life give nothing to chart: Fluke lists the same 167 × 84 × 46 mm case, 550 g and
          400-hour typical battery life for both. The numbers that do differ are the input impedance above and the
          accuracy you trade for AutoVolt&apos;s convenience below.
        </p>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Basic voltage accuracy, ±% of reading (plus counts) at 45 to 500 Hz for AC. Lower is better. AutoVolt is
                quick, not precise; for a careful reading, the 117 has the same DC and AC volts positions as the 115.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DC volts (both)", value: 0.5, display: "0.5% + 2" },
                { label: "AC volts (both)", value: 1.0, display: "1.0% + 3" },
                { label: "AutoVolt (117)", value: 2.0, display: "2.0% + 3", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Where Fluke's own documents disagree">
            The comparison table on Fluke&apos;s 115 and 117 product pages lists frequency only under the 117 and gives a
            temperature range for both. The datasheet and manual list frequency on both meters and temperature on the
            116 only, so we follow those. Fluke&apos;s 2020 manual also adds a 99.99 kHz frequency range that the datasheet
            and spec tabs (50.00 kHz top range) don&apos;t show. Finally, the manual lists a low-impedance capacitance
            power-up option on the 115 and 117, while the datasheet lists it for the 114, 116 and 117, and the 115 page
            says Low Z is exclusive to the 117. None of this changes the main point: the 115 has no LoZ voltage check.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How LoZ drains ghost voltage</h2>
        <p className="text-muted leading-7 mb-4">
          A disconnected conductor running beside a live one picks up voltage through the stray capacitance between
          them. That coupling can push only a tiny current, but a meter with a 5 MΩ input barely loads it, so the
          display shows a large, believable number on a wire that can&apos;t power anything. This is the classic open
          neutral or abandoned-run trap. The 117&apos;s AutoVolt position drops the input to about 3 kΩ, which drains
          the coupled charge so a phantom reading collapses toward zero while a real supply holds up.
        </p>
        <Figure caption={<>How a phantom voltage forms: capacitive coupling from an energized conductor onto an open one.</>}>
          <GhostVoltageDiagram />
        </Figure>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Figure caption={<>Illustrative only: a high-impedance volts input on the open conductor.</>}>
            <MeterReadout value="59.0" unit="V AC" mode="V~  (>5 MΩ)" />
          </Figure>
          <Figure caption={<>Illustrative only: the 117 on AutoVolt (about 3 kΩ), same conductor.</>}>
            <MeterReadout value="0.0" unit="V AC" mode="AUTO-V  LoZ" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          These readouts are worked arithmetic, not measurements. Assume 300 pF of coupling on a 120 V, 60 Hz circuit:
          that capacitance has a reactance of about 8.8 MΩ, so a 5 MΩ input sees about 59 V, while a 3 kΩ input sees
          about 0.04 V. Real coupling varies with cable length and spacing. On a 115 you can still unmask a phantom by
          adding a load, as our guide to{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            measuring voltage on a floating circuit and spotting phantom voltage
          </Link>{" "}
          explains, but the 117 does it at the turn of the dial.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How VoltAlert spots a live conductor</h2>
        <p className="text-muted leading-7 mb-4">
          An energized AC conductor is surrounded by an alternating electric field even through its insulation. The
          117&apos;s VoltAlert sensor sits in the top of the meter; hold that edge near a cord, outlet or wire and it
          lights a red LED and beeps when it senses AC voltage. Fluke gives two sensitivity settings: Lo for flush wall
          sockets, power strips and cords, and Hi for recessed sockets, where it works on bare wire down to 24 V. The 115
          has no sensor, so you&apos;d carry a separate non-contact pen tester instead.
        </p>
        <Figure caption={<>VoltAlert senses the AC field around a live conductor without touching it. It cannot see DC.</>}>
          <VoltAlertDiagram />
        </Figure>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How AutoVolt decides AC or DC</h2>
        <p className="text-muted leading-7 mb-4">
          On the 115 you turn the dial to AC volts or DC volts. The 117 adds a third volts position that, per Fluke&apos;s
          manual, selects AC or DC from whatever is applied across the leads, and sets the input to about 3 kΩ at the
          same time. That makes it the quick position for a mixed day of receptacles, control transformers and DC
          supplies.
        </p>
        <FlowDiagram
          steps={[
            { label: "Set AutoVolt", sub: "One dial position, no AC/DC choice" },
            { label: "Probe the circuit", sub: "Input drops to about 3 kΩ (LoZ)" },
            { label: "Meter senses AC or DC", sub: "From the signal across the leads" },
            { label: "Reads volts", sub: "600.0 V range, ±(2.0% + 3)" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The trade-off: a 3 kΩ input draws current from the circuit. On mains wiring that is the point. On a sensor
          output or a logic rail it can pull the voltage down, so use the normal high-impedance V positions there, which
          the 117 also has.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the 114 and 116 fit</h2>
        <p className="text-muted leading-7 mb-4">
          The 115 and 117 belong to a family of four that share the same case, display, CAT III 600V rating and battery.
          People comparing the 115 and 117 often land on the other two, so here is how Fluke divides the line-up.
        </p>
        <InfoCards
          items={[
            { label: "Fluke 114", desc: "Voltage, resistance and continuity, with AutoVolt and LoZ. No amp ranges, no capacitance." },
            { label: "Fluke 115", desc: "The full measuring set with 6A/10A current. No VoltAlert, AutoVolt or LoZ." },
            { label: "Fluke 116", desc: "HVAC model: temperature (-40 to 400 °C) and 600.0 µA, plus LoZ. No 6A/10A ranges." },
            { label: "Fluke 117", desc: "The 115's functions plus VoltAlert NCV, AutoVolt and LoZ." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 116 is the one to look at for furnace work: its 600.0 µA range at 0.1 µA resolution covers flame-sensor
          checks, and it reads a K-type thermocouple from -40 °C to 400 °C. It gives up the A input to do it. Our{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            best multimeter for HVAC technicians
          </Link>{" "}
          guide compares it with HVAC clamp meters.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 vs Fluke 117 for electricians</h2>
        <p className="text-muted leading-7 mb-4">
          On a panel or a branch circuit, the two meters carry the same protection. Both are rated CAT III 600V, which
          covers distribution panels, feeders, fixed wiring and receptacle circuits, and neither
          carries a CAT IV rating, so neither belongs on the line side of the meter base or the service drop. What
          changes on an electrician&apos;s day is how fast each meter gets you to a trustworthy answer.
        </p>
        <p className="text-muted leading-7 mb-4">
          Three jobs show the gap. First, finding which cord, receptacle or fixture whip is still energized: the 117
          answers from its top edge with VoltAlert before the leads come out of the pouch, while the 115 owner probes
          each point or carries a separate pen. Second, a reading on a conductor that should be dead, such as a switch
          leg or an abandoned run pulled through a pipe with live circuits: on the 117, AutoVolt&apos;s roughly 3 kΩ
          input tells a coupled phantom from a real backfeed; on the 115 you have to add a load across the leads to
          find out. Third, a control cabinet that mixes 24 V AC transformer secondaries with DC sensor supplies: the
          117&apos;s AutoVolt position reads either without a dial change, while the 115 needs V AC or V DC chosen for
          each point.
        </p>
        <DataTable
          head={["Panel task", "Fluke 117", "Fluke 115"]}
          rows={[
            ["Find a live cord or box", "VoltAlert, no leads", "Leads or separate pen"],
            ["Prove dead before work", "Leads, live-dead-live", "Leads, live-dead-live"],
            ["Suspect a ghost reading", "AutoVolt LoZ, ≈3 kΩ", "Add a load yourself"],
            ["Mixed AC/DC controls", "AutoVolt picks AC or DC", "Set V AC or V DC"],
            ["Motor or heater amps", "In series, to 10 A", "In series, to 10 A"],
            ["Meter base, service drop", "No (CAT III only)", "No (CAT III only)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two rows are identical, and they matter as much as the four that differ. Neither meter&apos;s extras replace
          the live-dead-live test with the leads, and both measure current only in series through the A jack, on a top range of 10.00 A
          with 20 A allowed for 30 seconds. On feeders and larger motor circuits that means a clamp meter
          does the amps job; see our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            electrician&apos;s multimeter guide
          </Link>{" "}
          for pairings. For a journeyman or apprentice doing branch-circuit and panel work most days, the 117 is the
          better match. The 115 holds up for an electrician who already wears a pen tester and knows to load-test any
          surprise reading.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">True RMS differences explained</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters are True RMS: our Pick data lists &quot;True RMS&quot; for the Fluke 115 and the Fluke 117, and
          Fluke&apos;s datasheet applies it to AC volts and AC amps on both. True RMS means the meter computes the
          heating-equivalent value of whatever waveform is on the leads. An average-responding meter instead assumes a
          clean sine and scales the average, so it drifts when the waveform isn&apos;t one.
        </p>
        <p className="text-muted leading-7 mb-4">
          That matters on the loads electricians now meet daily. A variable-frequency drive chops its output into
          pulses. LED drivers and switch-mode supplies draw current in short, tall peaks near the top of each cycle
          rather than a smooth sine. On those circuits, the AC volts and especially the AC amps readings from either
          Fluke stay trustworthy within spec. The difference between the two meters is not True RMS; it is which dial
          position you read from.
        </p>
        <DataTable
          head={["AC function", "Fluke 117", "Fluke 115"]}
          rows={[
            ["V AC, 45 to 500 Hz", "±(1.0% + 3)", "±(1.0% + 3)"],
            ["V AC, 500 Hz to 1 kHz", "±(2.0% + 3)", "±(2.0% + 3)"],
            ["A AC, 45 to 500 Hz", "±(1.5% + 3)", "±(1.5% + 3)"],
            ["AutoVolt (LoZ)", "±(2.0% + 3)", "Not available"],
            ["Low-pass (VFD) filter", "Not listed", "Not listed"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Worked from those figures for a 277 V LED lighting circuit on the 600.0 V range, where one count is 0.1 V:
          the dedicated V AC position on either meter allows 1.0% of 277 (2.77 V) plus 3 counts (0.3 V), so about
          ±3.1 V. The 117&apos;s AutoVolt position allows 2.0% of 277 (5.54 V) plus 0.3 V, so about ±5.8 V. For a
          go/no-go check AutoVolt is fine. For a voltage-drop calculation or a drive-input reading you&apos;ll write
          down, switch the 117 to V AC, where it matches the 115 exactly.
        </p>
        <div className="mt-4">
          <Figure caption={<>Allowed error on a 277 V AC reading, per Fluke&apos;s accuracy lines. Lower is better.</>}>
            <BarChart
              items={[
                { label: "V AC, either meter", value: 3.07, display: "±3.1 V", highlight: true },
                { label: "V AC, 0.5 to 1 kHz", value: 5.84, display: "±5.8 V" },
                { label: "AutoVolt (117)", value: 5.84, display: "±5.8 V" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Two limits apply to both meters equally. The quoted bands start at 45 Hz, so a drive slowed below that runs
          outside the figures we cite. And neither meter lists a low-pass filter, which keeps a drive&apos;s switching
          edges out of the reading on the motor side; the Fluke 87V has one, which is why it leads our{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison for drive work. On the supply side of a drive, or on LED and electronic-ballast circuits, either
          True RMS Fluke is the right tool. Our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          guide covers lower-cost alternatives.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 vs 117 for home electrical testing</h2>
        <p className="text-muted leading-7 mb-4">
          Most homeowners buy a meter for five jobs: checking that a receptacle has power, confirming a breaker really
          killed a circuit, testing appliance parts such as heating elements and fuses, checking batteries, and
          chasing a nuisance trip. Both meters do the measuring part of every one of those identically. The
          difference shows up in the two moments where home wiring most often fools people.
        </p>
        <p className="text-muted leading-7 mb-4">
          The first is &quot;is it off?&quot;. After flipping a breaker, the 117 lets you sweep the receptacle or
          switch box with VoltAlert to confirm the circuit you killed is the one you&apos;re about to touch, then prove
          it with the leads. The second is the half-dead outlet that reads 30 or 40 volts: on house wiring that is
          often coupling from a neighboring cable, and the 117&apos;s LoZ position shows whether it is real. On a 115
          you can still get there, but you need a separate non-contact tester and a load-test habit.
        </p>
        <DataTable
          head={["Home task", "What it uses", "115", "117"]}
          rows={[
            ["Receptacle has power?", "V AC", "Yes", "Yes, + VoltAlert"],
            ["Breaker killed it?", "V AC, live-dead-live", "Yes", "Yes, + VoltAlert"],
            ["Odd 30–40 V reading", "LoZ check", "Load-test it", "AutoVolt LoZ"],
            ["Heater element, fuse", "Ω, continuity", "Yes", "Yes"],
            ["Run capacitor", "Capacitance", "Yes", "Yes"],
            ["AA, 9 V, car battery", "V DC", "Yes", "Yes"],
            ["1,500 W heater amps", "A in series", "Over 10 A", "Over 10 A"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The last row is worth the arithmetic. A 1,500 W space heater on 120 V draws 1,500 ÷ 120 = 12.5 A, which is
          above both meters&apos; 10.00 A range; Fluke allows 20 A for only 30 seconds. Measuring it means
          breaking the circuit and routing the full load through the meter, so a homeowner is better served by a
          clamp meter for appliance current. For tripping breakers, start with our guide to{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mt-4">
          Which is enough? If you will open receptacle and switch boxes yourself, the 117 is the one we recommend,
          because its two extras target exactly the checks that keep you safe. If your work stops at unplugged
          appliances, cords, batteries and reading outlets with the leads, and you already own a pen tester, the 115
          is plenty, and it usually costs less. Both are more meter than many homes need;
          our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide covers simpler options, and anything at the panel itself is a job for a licensed electrician.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 115 vs 117: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Electrician doing panel and branch-circuit work", "Fluke 117", "LoZ unmasks ghost voltage on shared runs; VoltAlert gives a quick first check"],
            ["HVAC technician", "Fluke 116, or 117", "Neither 115 nor 117 has µA or temperature; the 117's LoZ helps on control wiring"],
            ["Homeowner doing DIY electrical", "Fluke 117", "Built-in NCV and LoZ cut the two most common misreads on house wiring"],
            ["Electronics bench user", "Fluke 115", "Same measuring set, and every volts position is high impedance"],
            ["Automotive DC work", "Fluke 115", "AutoVolt and VoltAlert add little on 12 V DC; the 115 covers volts, amps and ohms"],
            ["Electrical apprentice", "Fluke 117", "LoZ and NCV back up the verify-before-you-touch habits you are building"],
            ["Maintenance technician on equipment", "Either", "Identical ranges; pick the 117 if you also chase wiring faults"],
            ["Budget buyer", "Whichever costs less", "Same accuracy and build; check both live prices on the day"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a wider shortlist by trade, see our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide or the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What neither meter does</h2>
        <ul className="space-y-3 text-muted leading-7">
          <li>
            <span className="text-foreground font-medium">No temperature.</span> In this family only the Fluke 116 reads a
            thermocouple. The{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-179" className={link}>
              Fluke 179
            </Link>{" "}
            also measures temperature with its supplied probe.
          </li>
          <li>
            <span className="text-foreground font-medium">No mA or µA ranges.</span> The lowest current range is 6.000 A
            with 1 mA resolution, too coarse for standby current or flame sensors. See our guides to{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={link}>
              measuring microamps
            </Link>{" "}
            and the{" "}
            <Link href="/multimeters/best-multimeters-for-measuring-microamps" className={link}>
              best meters for microamps
            </Link>
            .
          </li>
          <li>
            <span className="text-foreground font-medium">No logging or app.</span> Min/Max/Avg captures extremes on the
            display, but neither meter stores readings or connects to a phone.
          </li>
          <li>
            <span className="text-foreground font-medium">No CAT IV rating.</span> Both stop at CAT III 600V. For service
            entrances and outdoor feeds, the{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V
            </Link>{" "}
            and Fluke 179 are rated CAT IV 600V / CAT III 1000V; compare them in{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
              Fluke 117 vs Fluke 87V
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
              Fluke 87V vs Fluke 179
            </Link>
            .
          </li>
        </ul>
      </section>

      <Callout title="Safety: NCV is a first check, not proof of dead">
        Fluke&apos;s own manual warns that no VoltAlert indication does not mean no voltage: shielded cable, socket design
        and insulation thickness can all hide a live conductor, and it cannot sense DC at all. Use the beep to find live
        circuits fast, then confirm with the test leads on a known live source before and after (live-dead-live) before
        touching anything. Both meters are CAT III 600V, which covers distribution panels, feeders and branch circuits;
        don&apos;t use either at the meter base or service drop, where CAT IV applies. When checking receptacles, see our guide to{" "}
        <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
          testing a GFCI outlet that won&apos;t reset
        </Link>
        .
      </Callout>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if you work on building wiring: VoltAlert and the LoZ AutoVolt position solve real problems there, and nothing else about the meter changes. Buy the Fluke 115 if your work is equipment, controls, electronics or automotive, or if you already carry a pen tester; you get the same measuring core, case and warranty. If you need temperature or microamps, skip both and look at the Fluke 116.",
  faqs: [
    {
      question: "Is the Fluke 117 worth the extra money over the 115?",
      answer:
        "For electricians, usually yes. The extra buys VoltAlert non-contact detection, AutoVolt and a LoZ input that stops ghost voltage fooling you on shared runs. If your work is equipment repair, electronics or automotive, those features sit unused and the 115 measures everything else identically. Prices move on Amazon, so compare the live gap before deciding.",
    },
    {
      question: "Does the Fluke 115 have LoZ?",
      answer:
        "No. Fluke lists AutoVolt with its roughly 3 kΩ low-impedance input on the 114, 116 and 117, not the 115. Fluke's 2020 manual does mention a low-impedance capacitance power-up option on the 115, but that is for capacitance, not voltage. To unmask a ghost voltage on a 115, add a load across the leads.",
    },
    {
      question: "Can the Fluke 117 measure temperature?",
      answer:
        "No. Fluke's datasheet lists the K-type thermocouple function, -40 °C to 400 °C, for the Fluke 116 only. The comparison table on Fluke's product pages shows a temperature range for the 115 and 117 too, but the accuracy table and manual don't, so don't buy either for temperature work.",
    },
    {
      question: "Is the Fluke 115 good for electricians?",
      answer:
        "It is capable: True RMS, CAT III 600V, 10A current and the same accuracy as the 117. What it lacks is the LoZ check, so a disconnected conductor in a shared conduit can show a convincing phantom voltage. Pair it with a separate non-contact tester and know how to load-test a reading, or buy the 117.",
    },
    {
      question: "What is the difference between the Fluke 116 and 117?",
      answer:
        "The 116 is Fluke's HVAC model: it adds a K-type thermocouple input and a 600.0 µA range for flame sensors, but has no 6A or 10A current ranges and no VoltAlert. The 117 keeps the amp ranges and adds non-contact voltage detection. Both have AutoVolt with a LoZ input and the same CAT III 600V rating.",
    },
    {
      question: "Can the Fluke 117 measure milliamps?",
      answer:
        "Only coarsely. Fluke says the 117 has a 10 A current range for AC or DC with a maximum resolution of 1 milliamp, which comes from its 6.000 A range. There is no dedicated mA or µA input, so it can't resolve small currents like standby draw or flame-sensor signals. The 115 is the same.",
    },
    {
      question: "Are the Fluke 115 and 117 both True RMS?",
      answer:
        "Yes. Both read AC volts and AC amps as True RMS, with the same accuracy: ±(1.0% + 3) on AC volts and ±(1.5% + 3) on AC amps from 45 Hz to 500 Hz. That keeps readings trustworthy on variable-speed drives, LED drivers and other distorted waveforms where an average-responding meter drifts.",
    },
    {
      question: "Which is better for HVAC, the Fluke 115 or 117?",
      answer:
        "The 117, narrowly. Its LoZ input helps on long thermostat and control runs where ghost voltage is common, and both share the same capacitance range for run capacitors. Neither has µA or temperature, though, so many HVAC technicians are better served by the Fluke 116 or an HVAC clamp meter.",
    },
    {
      question: "Do the Fluke 115 and 117 have the same accuracy?",
      answer:
        "Yes, for every shared function. Fluke's datasheet gives one accuracy line for both: DC volts ±(0.5% + 2), resistance ±(0.9% + 1), capacitance ±(1.9% + 2) and frequency ±(0.1% + 2). The only extra line on the 117 is AutoVolt, which is looser at ±(2.0% + 3) because it trades precision for speed.",
    },
    {
      question: "Is the Fluke 117 more accurate than the 115 on VFD and LED circuits?",
      answer:
        "No. Both are True RMS with the same AC accuracy, ±(1.0% + 3) on volts and ±(1.5% + 3) on amps from 45 to 500 Hz. The only AC line that differs is the 117's AutoVolt position at ±(2.0% + 3), which is looser. Neither lists a low-pass filter for a drive's motor side; for that, look at the Fluke 87V.",
    },
    {
      question: "Can an electrician use the Fluke 115 or 117 in a panel?",
      answer:
        "Yes. Both are rated CAT III 600V, which covers distribution panels, feeders and branch circuits. Neither is rated CAT IV, so keep both off the meter base and service drop. The 117 is quicker in a panel because VoltAlert finds live conductors without the leads and its LoZ AutoVolt position separates ghost voltage from a real backfeed.",
    },
    {
      question: "Is the Fluke 115 enough for a homeowner?",
      answer:
        "For appliances, cords, batteries and reading outlets with the leads, yes: it measures everything the 117 does, with the same accuracy. If you will open switch and receptacle boxes yourself, the 117's VoltAlert and LoZ make the 'is it really off?' check faster and harder to get wrong. Either way, prove dead with the leads before touching.",
    },
    {
      question: "Can the Fluke 117 measure a space heater's current?",
      answer:
        "Not a typical 1,500 W heater on 120 V. That draws about 12.5 A, above the 117's 10.00 A range, and Fluke allows 20 A for only 30 seconds. The 115 has the same limit. Measuring in series also means opening the circuit, so a clamp meter is the safer, easier tool for appliance current at home.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 115 vs Klein MM400", href: "/multimeters/fluke-115-vs-klein-mm400" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
    { label: "Best multimeter for HVAC technicians", href: "/multimeters/best-multimeter-for-hvac-technicians" },
  ],
};

export default function Fluke115VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
