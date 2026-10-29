// Specs per Fluke, checked 2026-10-26:
// - Fluke 15B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus
//   (no True RMS claim; 4.000 to 1000 V, DC ±(0.5% + 3); 400.0 µA to 10.00 A AC/DC at ±(1.5% + 3); 40 MΩ; 1,000 µF; diode test;
//   4,000 counts, backlit; CAT III 600 V, 1000 V max to earth; 440 mA and 11 A fuses; 2 × AA, 500 h minimum; 455 g)
// - Fluke 117/323 kit page: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117-323-kit
//   (117: 6.000 A and 10.00 A, 20 A for 30 s, 6,000 counts + 33-segment bar graph, CAT III 600 V, 550 g, 3-year warranty;
//   323: 400.0 A AC True RMS, 600.0 V AC/DC, 400.0 Ω / 4000 Ω, CAT III 600 V / CAT IV 300 V, 265 g, 2-year warranty;
//   kit adds TL175 leads, TPAK hanger and soft case)
// - Fluke 117 frequency, Min/Max/Avg, VoltAlert and AutoVolt per the 110 Series datasheet cited on /multimeters/fluke-115-vs-fluke-117.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit";

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 117/323 Kit",
  description:
    "Fluke 15B+ vs the 117/323 kit: a simple, budget Fluke meter against a True RMS multimeter-and-clamp-meter bundle. A big gap in price and capability.",
  image: picks.find((p) => p.name === "Fluke 15B+")!.image,
  path: "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit",
});

const link = "text-accent hover:underline";

/** Current coverage on a log axis: finest step to highest reading for each tool, and how each connects. */
function CurrentCoverageDiagram() {
  const x = (amps: number) => 20 + (Math.log10(amps) + 7) * 32; // 0.1 µA (1e-7 A) .. 1000 A across 320 px
  const bars = [
    { name: "15B+ (in series)", from: 1e-7, to: 10, y: 34, accent: false, note: "0.1 µA steps to 10 A" },
    { name: "117 (in series)", from: 1e-3, to: 10, y: 74, accent: false, note: "1 mA steps to 10 A" },
    { name: "323 (clamp, AC only)", from: 0.1, to: 400, y: 114, accent: true, note: "0.1 A steps to 400 A" },
  ];
  const ticks: [number, string][] = [
    [1e-6, "1 µA"],
    [1e-3, "1 mA"],
    [1, "1 A"],
    [10, "10 A"],
    [400, "400 A"],
  ];
  return (
    <svg
      viewBox="0 0 360 175"
      className="w-full h-auto"
      role="img"
      aria-label="Current coverage on a log scale. The Fluke 15B+ reads from 0.1 microamp steps up to 10 amps wired in series. The Fluke 117 reads in 1 milliamp steps up to 10 amps in series. The Fluke 323 clamp reads AC current in 0.1 amp steps up to 400 amps without breaking the circuit."
    >
      {bars.map((b) => (
        <g key={b.name}>
          <text x={x(b.from)} y={b.y - 6} fontSize="9.5" fontWeight="700" className="fill-foreground">
            {b.name}
          </text>
          <rect x={x(b.from)} y={b.y} width={x(b.to) - x(b.from)} height="14" rx="7" className={b.accent ? "fill-accent" : "fill-foreground"} opacity={b.accent ? 1 : 0.7} />
          <text x={x(b.from) - 4} y={b.y + 26} fontSize="8.5" className="fill-muted">
            {b.note}
          </text>
        </g>
      ))}
      {ticks.map(([v, l]) => (
        <g key={l}>
          <line x1={x(v)} x2={x(v)} y1="138" y2="144" className="stroke-muted" strokeWidth="1" />
          <text x={x(v)} y="156" fontSize="8.5" textAnchor="middle" className="fill-muted">
            {l}
          </text>
        </g>
      ))}
      <line x1={x(1e-7)} x2={x(1000)} y1="141" y2="141" className="stroke-border" strokeWidth="1" />
      <text x="180" y="171" fontSize="8.5" textAnchor="middle" className="fill-muted">Log scale. Finest step is the resolution of each tool&apos;s lowest range.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 117/323 Kit",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "These sit at opposite ends of what Fluke sells. The 15B+ is a straightforward, budget-tier meter: no True RMS claim, no frequency or temperature, just voltage, current from microamps to 10A, resistance, capacitance, diode and continuity in a tough case. The 117/323 kit is two True RMS tools in one purchase: an electrician's multimeter with VoltAlert and LoZ, plus a 400A AC clamp meter. The price gap is real, and so is the capability gap behind it.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 15B+")!,
    reviewHref: undefined,
    imageAlt: "Fluke 15B+ digital multimeter",
    chooseIf: [
      "Your needs are basic: voltage, current, resistance, capacitance and continuity",
      "You mostly measure ordinary sine-wave AC, not variable-speed drives or electronic loads",
      "You need µA and mA ranges for electronics, which the 117 doesn't have",
      "You want the lowest-cost full-size Fluke and don't need clamp current",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117/323 Kit")!,
    reviewHref: undefined,
    imageAlt: "Fluke 117/323 multimeter and clamp meter combo kit",
    chooseIf: [
      "You need True RMS accuracy for electronic loads, drives, or dimmers",
      "You want both a general multimeter and a clamp meter from the start",
      "You read load currents above 10A, which the 323 handles up to 400A AC",
      "You want VoltAlert non-contact detection and a LoZ input for building wiring",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Not stated as True RMS by Fluke", b: "True RMS (both tools in the kit)" },
    { label: "Display", a: "4,000 counts, backlit", b: "117: 6,000 counts + 33-segment bar graph" },
    { label: "Series current", a: "400 µA to 10A AC/DC", b: "117: 6A and 10A AC/DC; no mA or µA ranges" },
    { label: "Clamp AC current", a: "No", b: "Yes, up to 400A AC via the included 323" },
    { label: "Frequency", a: "No (17B+ only)", b: "117: yes, to 50 kHz; 323: no" },
    { label: "Min/Max recording", a: "No", b: "117: Min/Max/Avg" },
    { label: "Temperature", a: "No", b: "No (neither tool)" },
    { label: "Non-contact voltage / LoZ", a: "No", b: "117: VoltAlert and AutoVolt LoZ" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 600V (117) / CAT III 600V + CAT IV 300V (323)" },
    { label: "Max voltage", a: "1000V", b: "600V (both tools)" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "117: 9V, about 400 h typical" },
  ],
  differences: [
    "Fluke doesn't describe the 15B+ as True RMS; both tools in the 117/323 kit are True RMS, which matters on variable-speed drives, dimmers and other non-sinusoidal AC loads.",
    "The kit includes clamp-based AC current measurement to 400A via the 323, a capability the 15B+ doesn't have at all.",
    "The 15B+ has µA and mA ranges that neither tool in the kit offers, so for small electronics currents the cheaper meter is actually better equipped.",
    "The 117 adds VoltAlert non-contact detection, a LoZ input for ghost voltage, frequency and Min/Max/Avg, none of which the 15B+ has.",
    "The 15B+ is a single, simple tool; the kit is two purpose-built tools plus leads, a TPAK hanger and a carrying case.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 15B+ vs 117/323 kit spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          This isn&apos;t two competing options at similar price points; it&apos;s a budget-versus-capability
          choice. The surprise is that it isn&apos;t one-sided: the 15B+ reads lower currents and higher voltages
          than anything in the kit, while the kit wins on high current, AC accuracy on distorted loads and
          electrician features.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Highest current each tool reads, on a log scale. Only the 323 goes past 10A.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 15B+", value: 10, display: "10 A" },
                { label: "Fluke 117", value: 10, display: "10 A" },
                { label: "Fluke 323 (clamp)", value: 400, display: "400 A", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Display counts. The 117&apos;s 6,000 counts keep an extra digit between 4 and 6 V, 40 and 60 V, 400 and 600 V.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 4000, display: "4,000 counts" },
                { label: "Fluke 117", value: 6000, display: "6,000 counts", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who covers which currents</h2>
        <p className="text-muted leading-7 mb-4">
          Current is where the two options split most clearly. The 15B+ has four current ranges below 4A, fed through
          a separate 440 mA fused input, so it can read a microcontroller&apos;s sleep current or a 4-20 mA sensor
          loop. The 117 starts at a 6.000 A range with 1 mA resolution. The 323 clamp starts at 400.0 A with 0.1 A
          resolution and reads AC only, but it never needs the circuit opened.
        </p>
        <Figure caption={<>Current coverage of each tool, finest step to highest reading, on a log scale.</>}>
          <CurrentCoverageDiagram />
        </Figure>
        <DataTable
          head={["Current to read", "15B+", "117", "323 clamp"]}
          rows={[
            ["50 µA flame-rod or sleep current", "Yes, 400.0 µA range", "No", "No"],
            ["20 mA sensor loop", "Yes, 40.00 mA range", "Reads 0.020 A at best", "No"],
            ["2 A appliance draw", "Yes, in series", "Yes, in series", "Yes, but coarse at 0.1 A steps"],
            ["15 A space heater circuit", "No (10A limit)", "No (10A; 20A for 30 s only)", "Yes, clamp one conductor"],
            ["80 A feeder or motor start", "No", "No", "Yes, up to 400A AC"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The 2 A row is worth a moment. The 323 can read it, but on a 400.0 A range Fluke&apos;s ±(2% + 5 digits)
          allows ±(0.04 + 0.5) A, which is about ±0.54 A on a 2 A load. That&apos;s arithmetic from the spec, not
          a test. For small loads, series measurement with a multimeter is the more precise route; the clamp is
          for big currents and for speed. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps
          </Link>{" "}
          walks through the series method.
        </p>
        <div className="mt-4">
          <Callout title="Fuses and categories protect you only within their limits">
            Never connect any meter&apos;s current input across a voltage source; that&apos;s how fuses blow and
            meters fail. Keep series measurements within each meter&apos;s 10A rating, and use the clamp for anything
            larger. Inside a live panel, the 15B+ and 117 are rated CAT III 600V; if you aren&apos;t trained for
            energized work, call a licensed electrician.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better choice", "Why"]}
          rows={[
            ["Basic home electrical checks, no electronics work", "Fluke 15B+", "Covers the essentials at the lowest full-size Fluke price"],
            ["Variable-speed drives, dimmers, or other electronic loads", "117/323 Kit", "True RMS reads these correctly; Fluke makes no such claim for the 15B+"],
            ["Need current measurement without disconnecting circuits", "117/323 Kit", "Only the kit includes clamp current via the 323"],
            ["Electronics hobby: sleep currents, sensor loops", "Fluke 15B+", "µA and mA ranges the kit doesn't have"],
            ["Remodel or service work in older buildings", "117/323 Kit", "VoltAlert and LoZ separate live wires from ghost voltage"],
            ["Tight budget, simple needs, occasional use", "Fluke 15B+", "No reason to pay for capability you won't use"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Consider the middle ground too">
            If the 15B+ feels too basic but the full kit feels like overkill, see our{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-117-323-kit" className={link}>
              Fluke 117 vs 117/323 kit comparison
            </Link>
            : the 117 on its own sits between these two options on both price and capability. And if small currents
            matter as much as True RMS, the{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-15b-plus" className={link}>
              Fluke 117 vs 15B+
            </Link>{" "}
            page weighs exactly that trade.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Don't compare these as if they're close alternatives; they serve different budgets and needs. The 15B+ is a sensible choice for straightforward electrical and electronics checks, and its µA and mA ranges beat anything in the kit for small currents. The 117/323 kit is for anyone who needs True RMS on electronic loads, electrician features like VoltAlert and LoZ, and clamp current to 400A from the start. If neither extreme fits, the 117 alone is worth a look as a middle option.",
  chooseNeitherIf:
    "The 15B+'s basic checks are too little but the 117/323 kit's clamp-meter bundle is more than you need — the Fluke 117 alone is the middle option neither extreme covers.",
  faqs: [
    {
      question: "Is the Fluke 15B+ a \"real\" Fluke, or a budget knockoff?",
      answer:
        "It's a genuine Fluke, positioned at the simple, affordable end of the lineup. It carries a CAT III 600V rating, 1000V-rated fuses on both current inputs and IP40 protection, the same CAT III 600V level as the 117. What it lacks is a True RMS claim and the extra functions of Fluke's pricier meters.",
    },
    {
      question: "Will the 15B+ give wrong readings on normal household circuits?",
      answer:
        "No. On ordinary sine-wave AC such as standard outlets and resistive loads, a meter without True RMS reads within its spec. The error shows up on non-sinusoidal loads like variable-speed drives, dimmers, LED drivers and some electronic equipment, where an average-responding reading can be well off.",
    },
    {
      question: "Can I upgrade later if the 15B+ turns out to be too basic?",
      answer:
        "Yes, there's no lock-in. You can add a True RMS meter or a clamp meter later as your work grows, and the 15B+ remains useful as a µA and mA meter or a spare. Just weigh that against buying the tool you'll need once, rather than paying twice.",
    },
    {
      question: "Does the 117/323 kit include everything needed to start using both tools immediately?",
      answer:
        "Yes. Fluke lists the 117 with its test leads and holster, the 323 with its own leads and soft case, a spare TL175 test lead set, a TPAK magnetic hanger and a carrying case. When it arrives, check the contents against Fluke's list so you know every piece is there.",
    },
    {
      question: "Can the Fluke 15B+ measure current above 10 amps?",
      answer:
        "No. Its highest range is 10.00 A, protected by an 11 A fuse, and current must flow through the meter in series. For a 15A or 20A circuit you need a clamp meter like the 323 in the kit, which reads AC current up to 400A by closing its jaw around one conductor.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 117/323 Kit", href: "/multimeters/fluke-117-vs-fluke-117-323-kit" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Best multimeter for home & DIY", href: "/multimeters/best-multimeter-for-home-use" },
  ],
};

export default function Fluke15bPlusVsFluke117323KitPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
