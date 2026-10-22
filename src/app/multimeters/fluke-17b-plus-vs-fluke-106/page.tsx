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
  path: "/multimeters/fluke-17b-plus-vs-fluke-106",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 106",
  path,
  published: "2026-10-22",
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
    { label: "Display", a: "4,000 counts", b: "6,000 counts" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Current ranges", a: "400 µA to 10A AC/DC", b: "4A and 10A AC/DC only (no mA/µA)" },
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
        <h2 className="text-2xl font-semibold mb-4">Size and weight: full-size against pocket-size</h2>
        <p className="text-muted leading-7 mb-4">
          The most visible gap is physical. The 106 shares the 107&apos;s compact case, while the 17B+ is a
          conventional full-size handheld with room for its extra jacks and buttons.
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
        </div>
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
        <div className="mt-4">
          <KeyIdea title="What the 106's limit means in practice">
            With a smallest current range of 4A, the 106 can&apos;t resolve the tens of milliamps a gadget draws on
            standby. If small currents are part of your work, the 17B+ is the right tool; for occasional
            appliance-current checks the 106 is fine.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the 17B+ for electronics, appliance and HVAC work where microamps, temperature and frequency come up. Choose the 106 as a light, inexpensive pocket meter for voltage and continuity, with a finer 6,000-count display but no small-current ranges.",
  faqs: [
    {
      question: "Can the Fluke 106 measure milliamps?",
      answer:
        "No. Fluke's 106/107 manual lists only 4A and 10A current ranges for the 106, so it can't read milliamp or microamp currents. The 17B+ covers 400 µA up to 10A.",
    },
    {
      question: "Which has the better display, the 17B+ or the 106?",
      answer:
        "The 106 has 6,000 counts against the 17B+'s 4,000, so it shows a reading such as 5.999 V on one range where the 17B+ steps up a range sooner. The 17B+ is backlit; Fluke's 106 documents don't clearly state a backlight.",
    },
    {
      question: "Is the Fluke 106 rated for 1000V?",
      answer:
        "No. The 106 is rated CAT III 600V with a 600V maximum. The 17B+ reads up to 1000V and adds a CAT II 1000V rating alongside CAT III 600V.",
    },
    {
      question: "Does either meter read temperature?",
      answer:
        "Only the 17B+, using the supplied Type K probe from −55 °C to 400 °C. The 106 has no temperature function.",
    },
    {
      question: "Which is better as a car glovebox meter?",
      answer:
        "The 106, for size: 142 × 69 × 28 mm and 200 g, on two AAA cells. It handles battery voltage and fuse continuity; for parasitic-drain checks in milliamps you'd need the 17B+.",
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
