import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-107-vs-fluke-101";

export const metadata = buildMetadata({
  title: "Fluke 107 vs Fluke 101",
  description:
    "Fluke 107 vs Fluke 101: both read frequency and test diodes, but only the 107 measures current, and only its specs list a backlight. Which to buy.",
  path: "/multimeters/fluke-107-vs-fluke-101",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 107 vs Fluke 101",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 107 vs Fluke 101 pits the two most capable pocket Flukes for electronics against each other. They share a 6,000-count display, CAT III 600V, frequency, duty cycle and diode test. What separates them is current measurement and a backlight, both listed only for the 107, against the 101's smaller, lighter body.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized multimeter, front view",
    chooseIf: [
      "You want one small meter that also reads current up to 10A",
      "You work under dashboards, in cabinets or other dim spaces and want a backlight",
      "You want a model Fluke lists on its US site",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 101")!,
    imageAlt: "Fluke 101 compact multimeter, front view",
    chooseIf: [
      "You never measure current and want the lightest Fluke",
      "You want a 1 m drop rating stated by Fluke",
      "You mainly read voltages, PWM signals and diodes on hobby projects",
    ],
  },
  extraSpecs: [
    { label: "Current", a: "Up to 10A AC/DC", b: "None" },
    { label: "Backlight", a: "Yes", b: "Not listed by Fluke" },
    { label: "Frequency / duty cycle", a: "Yes", b: "To 100 kHz; duty cycle 1–99%" },
    { label: "Diode test", a: "Yes", b: "Yes" },
    { label: "Capacitance", a: "Yes", b: "Fluke's sources conflict: 100 µF or 1,000 µF" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Size", a: "142 × 69 × 28 mm", b: "130 × 65 × 27 mm" },
    { label: "Weight", a: "200 g", b: "160 g" },
    { label: "Drop rating", a: "1 m", b: "1 m" },
    { label: "Battery", a: "2 × AAA", b: "2 × AAA, 200 hours minimum" },
  ],
  differences: [
    "The 107 measures AC and DC current up to 10A; the 101 has no current jack at all.",
    "Fluke lists a backlight for the 107; no Fluke document mentions one for the 101.",
    "The 101 weighs 160 g to the 107's 200 g and is 12 mm shorter.",
    "Both have frequency, duty cycle, diode and continuity, so for signal work they are closely matched.",
    "The 107 is on Fluke's US site; the 101 is sold in Asia and reaches the US through import listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each meter covers</h2>
        <InfoCards
          items={[
            { label: "Both", desc: "600V AC/DC, resistance, continuity, capacitance, frequency, duty cycle, diode test, CAT III 600V." },
            { label: "107 only", desc: "AC/DC current to 10A and a backlit display." },
            { label: "101 only", desc: "A smaller 130 × 65 × 27 mm body at 160 g." },
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">How much smaller is the 101?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Length in millimeters, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 142, display: "142 mm" },
                { label: "Fluke 101", value: 130, display: "130 mm", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight in grams, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 107", value: 200, display: "200 g" },
                { label: "Fluke 101", value: 160, display: "160 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Is current worth 40 grams?">
            For most owners, yes. Current readings answer questions a voltmeter can&apos;t, such as whether a
            device draws power when it should be off. Our guide to{" "}
            <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
              measuring parasitic battery drain
            </Link>{" "}
            shows one common use.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 107 is the better all-rounder: it does everything the 101 does, adds 10A current and a listed backlight, and is a current US model. The Fluke 101 is worth choosing only if you never measure current and want the lightest Fluke you can carry.",
  faqs: [
    {
      question: "Do the Fluke 107 and 101 both test diodes?",
      answer: "Yes. Both have a diode test and continuity, plus frequency and duty cycle, per Fluke's documents.",
    },
    {
      question: "Does the Fluke 101 have a backlight?",
      answer:
        "None of Fluke's 101 documents mention one and its photo shows no backlight button. Fluke does list a backlight for the 107.",
    },
    {
      question: "How heavy are the Fluke 107 and 101?",
      answer: "Fluke lists the 107 at 200 g and the 101 at 160 g.",
    },
    {
      question: "Are the Fluke 107 and 101 True RMS?",
      answer:
        "No. Fluke states the 107 is not True RMS and makes no True RMS claim for the 101, so neither suits distorted waveforms from drives or LED drivers.",
    },
    {
      question: "Which is better for Arduino and hobby electronics?",
      answer:
        "The 107, because it can read a project's supply current, though Fluke doesn't list separate milliamp ranges, so very small currents need a meter that has them. If you only probe voltages and signals, the 101 covers that in a smaller body.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "How to measure milliamps with a multimeter", href: "/multimeters/how-to-measure-milliamps-with-a-multimeter" },
  ],
};

export default function Fluke107VsFluke101Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
