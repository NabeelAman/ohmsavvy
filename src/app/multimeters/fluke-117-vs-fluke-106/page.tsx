import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-106";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 106",
  description:
    "Fluke 117 vs Fluke 106: True RMS with NCV, AutoVolt and LoZ for electricians, against Fluke's lightest budget pocket meter. Specs, charts and a verdict.",
  path: "/multimeters/fluke-117-vs-fluke-106",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 106",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke 106 pits Fluke's electrician's meter against its entry-level pocket model. Both are CAT III 600V with 6,000-count displays and similar 10A current ranges, but the 117 adds True RMS, VoltAlert non-contact detection, AutoVolt and a low-impedance mode, while the 106 trades all of that for a 200 g body.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS electrician's multimeter, front view",
    chooseIf: [
      "You work on building wiring and want NCV and LoZ to rule out live and ghost voltages",
      "You measure on drives, LED drivers or other electronic loads where True RMS matters",
      "You want frequency, a bar graph and Min/Max/Average",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 106")!,
    imageAlt: "Fluke 106 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a light, inexpensive Fluke for a drawer, van or glovebox",
      "Your checks are batteries, outlets, fuses and continuity",
      "You don't need True RMS or electrician-specific safety features",
    ],
  },
  extraSpecs: [
    { label: "True RMS", a: "Yes", b: "No" },
    { label: "VoltAlert NCV / AutoVolt / LoZ", a: "Yes / Yes / Yes", b: "No / No / No" },
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts" },
    { label: "Current ranges", a: "6A and 10A AC/DC", b: "4A and 10A AC/DC" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Up to 1,000 µF" },
    { label: "Frequency", a: "Up to 50 kHz", b: "No" },
    { label: "Min/Max", a: "Min/Max/Average", b: "Not listed" },
    { label: "Size / weight", a: "167 × 84 × 46 mm, 550 g", b: "142 × 69 × 28 mm, 200 g" },
    { label: "Battery", a: "One 9V, about 400 h typical", b: "2 × AAA, 200 h minimum" },
    { label: "Warranty", a: "3 years", b: "2 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke positions the 106 for work where True RMS accuracy isn't needed.",
    "Only the 117 has VoltAlert non-contact voltage detection, AutoVolt AC/DC selection and a low-impedance mode for ghost voltages.",
    "The 117 reads frequency to 50 kHz and capacitance to 9,999 µF; the 106 has no frequency and stops at 1,000 µF.",
    "Neither has milliamp or microamp ranges: the 117 has 6A and 10A, the 106 4A and 10A.",
    "The 106 weighs 200 g against the 117's 550 g, and is 28 mm thick rather than 46 mm.",
    "The 117 carries a 3-year warranty against the 106's 2 years.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Electrician features: what the extra money buys</h2>
        <DataTable
          head={["Feature", "What it does", "117", "106"]}
          rows={[
            ["True RMS", "Correct AC readings on distorted waveforms", "Yes", "No"],
            ["VoltAlert", "Senses a live conductor without contact", "Yes", "No"],
            ["AutoVolt", "Picks AC or DC voltage automatically", "Yes", "No"],
            ["LoZ mode", "Loads the circuit to collapse ghost voltage", "Yes", "No"],
            ["Bar graph", "Shows trends and fluctuations", "33 segments", "No"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Why LoZ matters on building wiring">
            A disconnected wire running beside a live one can show a phantom voltage on a high-impedance meter.
            The 117&apos;s LoZ mode drains that induced voltage so a dead circuit reads dead. The 106 has no such
            mode, so treat any unexpected reading with suspicion. More on this in{" "}
            <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
              how to test electrical wires
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitance range and weight compared</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum capacitance, log scale: the 117 reaches about ten times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Fluke 117", value: 9999, display: "9,999 µF", highlight: true },
                { label: "Fluke 106", value: 1000, display: "1,000 µF" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams: the 106 is well under half the 117&apos;s weight.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 106", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "If you do electrical work in buildings, the Fluke 117 is worth the step up: True RMS, NCV, AutoVolt and LoZ are safety and accuracy features the 106 simply doesn't have. The 106 is a sensible cheap second meter for batteries, outlets and continuity, not a replacement for the 117.",
  faqs: [
    {
      question: "Is the Fluke 106 True RMS?",
      answer:
        "No. Fluke's US page positions the 106 for everyday work where True RMS accuracy isn't needed. The 117 is True RMS.",
    },
    {
      question: "Does the Fluke 106 have non-contact voltage detection?",
      answer:
        "No. VoltAlert non-contact detection, AutoVolt and the low-impedance mode are 117 features; none is listed for the 106.",
    },
    {
      question: "Can either meter measure milliamps?",
      answer:
        "No. The 117 has 6A and 10A current ranges with 1 mA best resolution, and the 106 has 4A and 10A ranges. For milliamp and microamp work, look at a meter such as the Fluke 17B+ or 87V.",
    },
    {
      question: "Which battery lasts longer?",
      answer:
        "Fluke quotes about 400 hours typical for the 117's single 9V cell (without backlight) and a 200-hour minimum for the 106's two AAA cells. The figures are measured on different bases, so treat them as a rough guide.",
    },
    {
      question: "Which is better for a homeowner?",
      answer:
        "For occasional battery, outlet and fuse checks, the 106 is enough. If you plan to work on household wiring yourself, the 117's NCV and LoZ make it the safer choice.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 117 vs Fluke 101", href: "/multimeters/fluke-117-vs-fluke-101" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke117VsFluke106Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
