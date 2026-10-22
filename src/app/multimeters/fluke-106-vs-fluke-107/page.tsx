import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, FlowDiagram, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-106-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 106 vs Fluke 107",
  description:
    "Fluke 106 vs Fluke 107: identical palm-sized bodies, but only the 107 adds diode test, frequency and duty cycle. Which pocket Fluke to buy, with charts.",
  path: "/multimeters/fluke-106-vs-fluke-107",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 106 vs Fluke 107",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 106 vs Fluke 107 is a choice between two meters that share one body. Both are 142 × 69 × 28 mm, 200 g, CAT III 600V and 6,000-count, and Fluke documents them in a single users manual. The difference is a short list of functions the 107 adds, so the right pick depends on whether you work on electronics or only on wiring.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You mainly check outlets, batteries and fuses and never test diodes",
      "You want the simpler of the two, with fewer dial positions to learn",
      "You want the 4A and 10A current ranges Fluke lists for it",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You repair electronics and need a diode test",
      "You check fan, motor or PWM signals and want frequency and duty cycle",
      "You want a backlit display, which Fluke lists for the 107 but not clearly for the 106",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Current", a: "4A and 10A ranges, AC/DC (no mA/µA)", b: "Up to 10A AC/DC" },
    { label: "Resistance", a: "Up to 40 MΩ", b: "Yes (range not stated separately)" },
    { label: "Capacitance", a: "50 nF to 1,000 µF", b: "Yes" },
    { label: "Diode test", a: "No", b: "Yes" },
    { label: "Frequency / duty cycle", a: "No", b: "Yes" },
    { label: "Size / weight", a: "142 × 69 × 28 mm, 200 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "2 × AAA, 200 hours minimum", b: "2 × AAA" },
  ],
  differences: [
    "Fluke's 106/107 manual marks diode test, frequency and duty cycle as 107-only functions.",
    "The 107's backlight is listed by Fluke; the 106 pages don't list one and its photo shows no backlight button.",
    "Fluke lists the 106's current as 4A and 10A ranges with no milliamp or microamp ranges.",
    "Neither meter is True RMS; Fluke positions the 106 for work where True RMS accuracy isn't needed.",
    "Size, weight, CAT III 600V rating and the 6,000-count display are identical.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Function by function</h2>
        <p className="text-muted leading-7 mb-4">
          Because the two share a manual, the cleanest way to compare them is a function list. Everything the
          106 does, the 107 also does; the gap is entirely on the 107&apos;s side.
        </p>
        <DataTable
          head={["Function", "Fluke 106", "Fluke 107"]}
          rows={[
            ["AC/DC voltage to 600V", "Yes", "Yes"],
            ["AC/DC current", "4A / 10A", "To 10A"],
            ["Resistance and continuity", "Yes", "Yes"],
            ["Capacitance", "Yes", "Yes"],
            ["Data hold", "Yes", "Yes"],
            ["Diode test", "—", "Yes"],
            ["Frequency and duty cycle", "—", "Yes"],
            ["Backlight", "Not listed", "Yes"],
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">A quick way to decide</h2>
        <Figure caption={<>If any answer along the way is yes, the 107&apos;s extra functions earn their place.</>}>
          <FlowDiagram
            steps={[
              { label: "Test LEDs or diodes?", sub: "Yes: 107" },
              { label: "Read PWM or fan speed?", sub: "Yes: 107" },
              { label: "Work in dim spaces?", sub: "Yes: 107 (backlight)" },
              { label: "None of these", sub: "106 does the job" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="What the diode test is for">
            A diode test pushes a small current through a semiconductor junction and shows its forward voltage,
            which is how you check rectifier diodes, LEDs and many transistor junctions. Our guide on{" "}
            <Link href="/multimeters/how-to-test-a-diode-with-a-multimeter" className={link}>
              how to test a diode with a multimeter
            </Link>{" "}
            shows the readings to expect.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 107 if you touch electronics at all: diode test, frequency, duty cycle and a backlight cost little extra in the same 200 g body. The Fluke 106 is the right pick only as a pure electrical backup meter for voltage, current, resistance and continuity, where those extras would go unused.",
  faqs: [
    {
      question: "Are the Fluke 106 and 107 the same size?",
      answer:
        "Yes. Fluke lists both at 142 × 69 × 28 mm and 200 g, and they share one users manual. Only the function set differs.",
    },
    {
      question: "Does the Fluke 106 have a diode test?",
      answer:
        "No. Fluke's 106/107 manual marks the diode test as a 107-only function, along with frequency and duty cycle.",
    },
    {
      question: "Is either the Fluke 106 or 107 True RMS?",
      answer:
        "No. Fluke states the 107 is not a True RMS meter and positions the 106 for work where True RMS accuracy isn't needed. For variable-speed drives and electronic loads, look at a 115 or 117 instead.",
    },
    {
      question: "Can the Fluke 106 measure milliamps?",
      answer:
        "Fluke lists only 4A and 10A current ranges for the 106, with no milliamp or microamp ranges, so it isn't suited to small electronic currents or parasitic-drain checks.",
    },
    {
      question: "Which pocket Fluke is better for a car toolbox?",
      answer:
        "Either covers battery, fuse and continuity checks. The 107's frequency and duty-cycle functions help with fuel-injector and PWM fan signals, so it is the more useful of the two for automotive work.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "How to use a multimeter", href: "/multimeters/how-to-use-a-multimeter" },
  ],
};

export default function Fluke106VsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
