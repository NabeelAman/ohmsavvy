// Specs per Fluke, checked 2026-10-26:
// - Fluke 17B+ product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-17b-plus
//   (ranges 400.0 mV / 4.000 / 40.00 / 400.0 / 1000 V; DC ±(0.5% + 3), AC ±(1.0% + 3); µA, mA and A current at ±(1.5% + 3);
//   440 mA and 11 A fuses; 4,000 counts updating 3/s; 2 × AA, 500 h minimum; 455 g)
// - Fluke 106 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106
//   (ranges 600.0 mV / 6.000 / 60.00 / 600.0 V; DC ±(0.5% + 3), AC ±(1.0% + 3); 4.000 A and 10.00 A only, AC 40 to 200 Hz;
//   6,000 counts updating 3/s; 600 V max to earth; 2 × AAA, 200 h minimum; 200 g)
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-17b-plus-vs-fluke-106";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 106",
  description:
    "Fluke 17B+ vs Fluke 106: a full-size meter with temperature, frequency and µA ranges against a 200 g palm-size Fluke with a finer display. Pick the right one.",
  image: picks.find((p) => p.name === "Fluke 17B+")!.image,
  path: "/multimeters/fluke-17b-plus-vs-fluke-106",
});

const link = "text-accent hover:underline";

/** Voltage range ladders on a log axis: where each meter switches range, and where the 106 keeps an extra digit. */
function RangeLadder() {
  const x = (v: number) => 24 + (Math.log10(v) + 1) * 76; // 0.1 V .. 1000 V across 304 px
  const meters = [
    { name: "17B+", y: 46, tops: [0.4, 4, 40, 400, 1000], labels: ["400 mV", "4 V", "40 V", "400 V", "1000 V"] },
    { name: "106", y: 98, tops: [0.6, 6, 60, 600], labels: ["600 mV", "6 V", "60 V", "600 V"] },
  ];
  const gains: [number, number][] = [
    [0.4, 0.6],
    [4, 6],
    [40, 60],
    [400, 600],
  ];
  return (
    <svg
      viewBox="0 0 350 170"
      className="w-full h-auto"
      role="img"
      aria-label="Voltage range ladders on a log scale. The Fluke 17B+ switches ranges at 400 mV, 4 V, 40 V and 400 V and continues to 1000 V; the Fluke 106 switches at 600 mV, 6 V and 60 V and stops at 600 V. Between 4 and 6 V, 40 and 60 V and 400 and 600 V the 106 shows one more digit."
    >
      {gains.map(([a, b]) => (
        <rect key={a} x={x(a)} y="30" width={x(b) - x(a)} height="88" className="fill-accent/15" />
      ))}
      {meters.map((m) => (
        <g key={m.name}>
          <text x="4" y={m.y - 12} fontSize="10" fontWeight="700" className="fill-foreground">
            Fluke {m.name}
          </text>
          <line x1={x(0.1)} x2={x(m.tops[m.tops.length - 1])} y1={m.y} y2={m.y} className="stroke-foreground" strokeWidth="2" />
          {m.tops.map((t, i) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={m.y - 6} y2={m.y + 6} className="stroke-accent" strokeWidth="2" />
              <text x={x(t)} y={m.y + 18} fontSize="8.5" textAnchor="middle" className="fill-muted">
                {m.labels[i]}
              </text>
            </g>
          ))}
        </g>
      ))}
      {[0.1, 1, 10, 100, 1000].map((v) => (
        <text key={v} x={x(v)} y="136" fontSize="8" textAnchor="middle" className="fill-muted">
          {v < 1 ? "0.1 V" : `${v} V`}
        </text>
      ))}
      <text x="175" y="156" fontSize="9" textAnchor="middle" className="fill-accent">
        Shaded: the 106 keeps a digit the 17B+ has lost
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 106",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Fluke 17B+ vs Fluke 106 sets a full-size, feature-heavy meter against Fluke's cheapest pocket model. The 17B+ brings temperature, frequency, duty cycle and microamp ranges; the 106 strips those away to fit a 6,000-count display into a 200 g body that slips into a shirt pocket. Neither is True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    imageAlt: "Fluke 17B+ digital multimeter, front view",
    chooseIf: [
      "You need µA or mA ranges for sensors, standby current or flame rods",
      "You want temperature and frequency in the same meter",
      "Your bench or toolbox has room for a full-size meter",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a meter that lives in a pocket, glovebox or drawer",
      "You mostly check voltage, continuity and resistance, with the odd amp reading",
      "You prefer a 6,000-count display for finer voltage steps",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "4,000 counts, 3 updates/s", b: "6,000 counts, 3 updates/s" },
    { label: "Voltage ranges", a: "400.0 mV, 4.000, 40.00, 400.0, 1000 V", b: "600.0 mV, 6.000, 60.00, 600.0 V" },
    { label: "DC / AC volts accuracy", a: "±(0.5% + 3) / ±(1.0% + 3)", b: "±(0.5% + 3) / ±(1.0% + 3)" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Current ranges", a: "400 µA to 10A AC/DC", b: "4A and 10A AC/DC only (no mA/µA)" },
    { label: "Current fuses", a: "440 mA (µA/mA) and 11 A, 1000 V", b: "Not stated on Fluke's 106 page" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Up to 40 MΩ" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 1,000 µF" },
    { label: "Frequency / duty cycle", a: "To 100 kHz; 1% to 99%", b: "No (107 only)" },
    { label: "Diode test", a: "Yes", b: "No (107 only)" },
    { label: "Temperature", a: "−55 °C to 400 °C, probe included", b: "No" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "2 × AAA, 200 h minimum" },
  ],
  differences: [
    "The 106 weighs 200 g against the 17B+'s 455 g, and is 28 mm thick rather than 49.5 mm.",
    "The 106 has a 6,000-count display; the 17B+ has 4,000 counts, so the 106 holds finer resolution before changing range.",
    "The 17B+ covers µA, mA and A current; the 106 has only 4A and 10A ranges, which rules it out for small currents.",
    "Temperature, frequency, duty cycle, diode test and MIN MAX are on the 17B+ but not the 106.",
    "The 17B+ carries a CAT II 1000V rating alongside CAT III 600V; the 106 is CAT III 600V only.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 17B+ vs 106 spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The most visible gap is physical. The 106 shares the 107&apos;s compact case, while the 17B+ is a
          conventional full-size handheld with room for its extra jacks and buttons. Less obvious is that Fluke
          quotes the same basic voltage accuracy for both: ±(0.5% + 3 digits) on DC and ±(1.0% + 3) on AC. What
          changes is the size of a digit, which depends on the range each meter is on.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight in grams, per Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 455, display: "455 g" },
                { label: "Fluke 106", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Display counts: the smaller meter has the finer display.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 4000, display: "4,000 counts" },
                { label: "Fluke 106", value: 6000, display: "6,000 counts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Minimum battery life Fluke quotes: two AA cells outlast two AAA cells by 2.5 times.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+ (2 × AA)", value: 500, display: "500 h", highlight: true },
                { label: "Fluke 106 (2 × AAA)", value: 200, display: "200 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest voltage each meter reads, per Fluke&apos;s range tables.</>}>
            <BarChart
              items={[
                { label: "Fluke 17B+", value: 1000, display: "1000 V", highlight: true },
                { label: "Fluke 106", value: 600, display: "600 V" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where 6,000 counts beats 4,000, and where it doesn&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          A 4,000-count meter tops each range at 3.999, 39.99 or 399.9; a 6,000-count meter carries on to 5.999,
          59.99 or 599.9. So the 106 only shows an extra digit when your reading falls in the band between those
          two limits. Below 4 V, 40 V or 400 V both meters sit on equivalent ranges and display the same thing.
        </p>
        <Figure caption={<>Voltage range ladders for both meters, from Fluke&apos;s range tables, on a log scale.</>}>
          <RangeLadder />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Reading", "17B+ range and display", "106 range and display", "Who resolves more"]}
            rows={[
              ["1.5 V AA cell", "4.000 V: 1.500", "6.000 V: 1.500", "Same"],
              ["5 V USB supply", "40.00 V: 5.00", "6.000 V: 5.000", "106, by one digit"],
              ["12.6 V car battery", "40.00 V: 12.60", "60.00 V: 12.60", "Same"],
              ["48 V battery bank", "400.0 V: 48.0", "60.00 V: 48.00", "106, by one digit"],
              ["120 V outlet", "400.0 V: 120.0", "600.0 V: 120.0", "Same"],
              ["480 V three-phase", "1000 V: 480", "600.0 V: 480.0", "106, but see the safety note"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          The 5 V case shows why it matters. Using Fluke&apos;s DC spec, the 17B+ on its 40.00 V range is good to
          ±(0.5% × 5 V + 3 × 0.01 V) = ±0.055 V, while the 106 on 6.000 V is good to ±(0.025 V + 0.003 V) =
          ±0.028 V. That is the arithmetic of the published spec, not a measurement. For a USB rail that must sit
          between 4.75 V and 5.25 V, either is adequate; for a 5.0 V reference you&apos;d prefer the 106&apos;s
          tighter window. At 480 V the 106 resolves more, but that is industrial three-phase territory and the
          17B+&apos;s 1000 V reach and CAT II 1000V rating are the more relevant numbers there.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current measurement is the deciding gap</h2>
        <DataTable
          head={["Current you want to read", "Fluke 17B+", "Fluke 106"]}
          rows={[
            ["Microamps (sensor bias, flame rod)", "Yes", "No"],
            ["Milliamps (LED strip, device standby)", "Yes", "No"],
            ["A few amps (small motor, heater)", "Yes", "Yes, 4A range"],
            ["Up to 10A", "Yes", "Yes, 10A range for under 7 minutes"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Fluke fits the 17B+ with a separate 440 mA fuse for its µA and mA input, so small currents go through their own
          input, and the meter can resolve 0.1 µA on the 400.0 µA range. The 106&apos;s smallest range is
          4.000 A with 1 mA resolution, which means a device drawing 25 mA reads 0.025 A at best and the
          ±(1.5% + 3 digits) spec allows ±3 mA of error on top. Fluke also limits the 106&apos;s AC current
          specification to 40 to 200 Hz, against 40 to 400 Hz on the 17B+.
        </p>
        <div className="mt-4">
          <KeyIdea title="What the 106's limit means in practice">
            With a smallest current range of 4A, the 106 can&apos;t resolve the tens of milliamps a gadget draws on
            standby. If small currents are part of your work, the 17B+ is the right tool; for occasional
            appliance-current checks the 106 is fine. Our guide to{" "}
            <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
              measuring parasitic battery drain
            </Link>{" "}
            shows the kind of job where that difference decides the meter.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Reason"]}
          rows={[
            ["Glovebox or kitchen-drawer backup meter", "Fluke 106", "200 g and 28 mm thick"],
            ["Car parasitic-drain or LED current checks", "Fluke 17B+", "mA and µA ranges with their own fuse"],
            ["HVAC duct and pipe temperatures", "Fluke 17B+", "Type K probe from −55 °C to 400 °C"],
            ["Checking 5 V and 48 V DC rails closely", "Fluke 106", "6,000 counts keep an extra digit there"],
            ["Diode and frequency checks on electronics", "Fluke 17B+", "The 106 has neither function"],
            ["Long jobs away from spare batteries", "Fluke 17B+", "500 h minimum vs 200 h"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The honest split is this. If you mainly confirm that outlets are live, batteries are charged and fuses
          are intact, the 106 does that in a meter you&apos;ll actually carry, and its display is the sharper of the
          two in several common bands. Once your work involves small currents, temperatures or signal checks, the
          17B+ is the only one of the pair that can do the job at all. If you want the pocket size plus diode test
          and frequency, compare the{" "}
          <Link href="/multimeters/fluke-106-vs-fluke-107" className={link}>
            Fluke 106 vs 107
          </Link>
          ; if you want the 17B+ body without the extras, see the{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            17B+ vs 15B+
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Choose the 17B+ for electronics, appliance and HVAC work where microamps, temperature and frequency come up. Choose the 106 as a light, inexpensive pocket meter for voltage and continuity, with a finer 6,000-count display but no small-current ranges.",
  faqs: [
    {
      question: "Can the Fluke 106 measure milliamps?",
      answer:
        "No. Fluke lists only 4A and 10A current ranges for the 106, so it can't read milliamp or microamp currents with any useful resolution: its finest step is 1 mA. The 17B+ covers 400 µA up to 10A, with a separate fused input for the small ranges.",
    },
    {
      question: "Which has the better display, the 17B+ or the 106?",
      answer:
        "The 106 has 6,000 counts against the 17B+'s 4,000, so it shows a reading such as 5.000 V on one range where the 17B+ has already stepped up to 40.00 V. Below 4 V, 40 V or 400 V they show the same digits. The 17B+ is backlit; Fluke's 106 page doesn't mention a backlight.",
    },
    {
      question: "Is the Fluke 106 rated for 1000V?",
      answer:
        "No. The 106 is rated CAT III 600V and Fluke lists 600V as the maximum between any terminal and earth. The 17B+ reads up to 1000V and adds a CAT II 1000V rating alongside CAT III 600V, though for most household work the two ratings are equivalent.",
    },
    {
      question: "Does either meter read temperature?",
      answer:
        "Only the 17B+, using the supplied Type K probe from −55 °C to 400 °C with 0.1 °C resolution. Fluke specifies ±2 °C between 0 and 50 °C. The 106 has no temperature function and no thermocouple input, so it can't be added later.",
    },
    {
      question: "Which is better as a car glovebox meter?",
      answer:
        "The 106, for size: 142 × 69 × 28 mm and 200 g, on two AAA cells. It handles battery voltage and fuse continuity well. For parasitic-drain checks in milliamps you'd need the 17B+, which is too bulky for many gloveboxes but fine in a trunk toolbag.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
  ],
};

export default function Fluke17BPlusVsFluke106Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
