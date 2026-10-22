import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-117-vs-fluke-107";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 107",
  description:
    "Fluke 117 vs Fluke 107: True RMS, NCV and LoZ against a 200 g palm-sized meter that isn't True RMS. Specs, size chart and which Fluke to carry.",
  path: "/multimeters/fluke-117-vs-fluke-107",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 107",
  path,
  published: "2026-10-22",
  intro:
    "Fluke 117 vs Fluke 107 (or Fluke 107 vs Fluke 117, as many people search it) compares Fluke's electrician's meter with its palm-sized one. Both are CAT III 600V with 6,000-count backlit displays and 10A current. The 117 is True RMS and adds VoltAlert non-contact detection, AutoVolt and a low-impedance mode; the 107 weighs 200 g, fits in a pocket, and Fluke states plainly that it is not True RMS.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter, front view",
    chooseIf: [
      "You work on circuits with drives, LED drivers or electronic loads, where True RMS matters",
      "You want NCV, AutoVolt and LoZ for fast, safe checks on live electrical work",
      "This will be your main meter, used every day",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 107")!,
    imageAlt: "Fluke 107 palm-sized digital multimeter, front view",
    chooseIf: [
      "You want a Fluke small enough for a pocket, glovebox or second toolbag",
      "You mostly check batteries, outlets, continuity and resistance",
      "You want frequency, duty cycle and diode test in a compact meter",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts + 33-segment bar graph", b: "6,000 counts, backlit" },
    { label: "Max voltage", a: "600V AC/DC", b: "600V AC/DC" },
    { label: "Max current", a: "10A AC/DC", b: "10A AC/DC" },
    { label: "Non-contact voltage", a: "VoltAlert built in", b: "Not listed" },
    { label: "AutoVolt / LoZ", a: "Yes / Yes", b: "Not listed" },
    { label: "Capacitance", a: "Up to 9,999 µF", b: "Yes" },
    { label: "Frequency / duty cycle", a: "Frequency to 50 kHz", b: "Yes / Yes" },
    { label: "Size", a: "167 × 84 × 46 mm", b: "142 × 69 × 28 mm" },
    { label: "Weight", a: "550 g", b: "200 g" },
    { label: "Battery", a: "One 9V", b: "2 × AAA" },
    { label: "Drop rating", a: "Not stated by Fluke", b: "1 m" },
  ],
  differences: [
    "The Fluke 117 is True RMS; Fluke says the 107 is not, so the 107's AC readings on distorted waveforms are less dependable.",
    "Only the 117 has VoltAlert non-contact detection, AutoVolt and a low-impedance mode for ghost voltages.",
    "The 107 weighs 200 g and measures 142 × 69 × 28 mm; the 117 is 550 g and 167 × 84 × 46 mm.",
    "The 117 adds a 33-segment bar graph for watching changing readings.",
    "The 107 lists duty cycle and a 1 m drop rating; Fluke doesn't list either for the 117.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">How much smaller is the Fluke 107?</h2>
        <p className="text-muted leading-7 mb-4">
          Size is the 107&apos;s whole argument. It is roughly a third of the 117&apos;s weight and noticeably thinner,
          which is the difference between a meter that lives in your pocket and one that lives in the van.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Weight per Fluke&apos;s specifications.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 550, display: "550 g" },
                { label: "Fluke 107", value: 200, display: "200 g", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Thickness: 46 mm for the 117 against 28 mm for the 107.</>}>
            <BarChart
              items={[
                { label: "Fluke 117", value: 46, display: "46 mm" },
                { label: "Fluke 107", value: 28, display: "28 mm", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What you give up with the 107</h2>
        <DataTable
          head={["Feature", "Fluke 117", "Fluke 107"]}
          rows={[
            ["True RMS", "Yes", "No (Fluke states this)"],
            ["Non-contact voltage", "Yes", "No"],
            ["AutoVolt AC/DC selection", "Yes", "No"],
            ["Low-impedance mode", "Yes", "No"],
            ["Bar graph", "33 segments", "No"],
            ["Duty cycle", "Not listed", "Yes"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="A second meter, not a replacement">
            The 107 works well alongside a True RMS meter, for quick checks where carrying the larger 117 is a
            nuisance. For variable-speed drives and modern lighting circuits, keep using the 117. If you want a
            True RMS Fluke without the 117&apos;s extras, see{" "}
            <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
              Fluke 115 vs Fluke 117
            </Link>
            .
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Electricians should buy the Fluke 117: True RMS, NCV, AutoVolt and LoZ make it the right main meter for live electrical work. The Fluke 107 makes sense as a compact second meter, or for anyone who mainly checks batteries, outlets and continuity and values pocket size over True RMS.",
  faqs: [
    {
      question: "Is the Fluke 107 True RMS?",
      answer:
        "No. Fluke's own answer is that the 107 is not a True RMS meter. The 117 is True RMS, so it reads distorted waveforms from drives and LED drivers correctly.",
    },
    {
      question: "Does the Fluke 107 have non-contact voltage detection?",
      answer:
        "Fluke doesn't list it for the 107. The 117's VoltAlert gives a go/no-go indication of live voltage without touching the conductor.",
    },
    {
      question: "Are the Fluke 117 and 107 rated for the same work?",
      answer:
        "Both are rated CAT III 600V, so both are suitable for panels and building wiring at that voltage. The difference is in measurement features, not the safety category.",
    },
    {
      question: "How much lighter is the Fluke 107?",
      answer:
        "Fluke lists the 107 at 200 g and the 117 at 550 g. The 107 runs on two AAA cells; the 117 uses a single 9V battery.",
    },
    {
      question: "Can the Fluke 107 measure current?",
      answer:
        "Yes, AC and DC current up to 10A, the same maximum as the 117. If you also want an open-jaw current check without leads, compare the Fluke T5-600.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 117 vs Fluke T5-600", href: "/multimeters/fluke-117-vs-fluke-t5-600" },
  ],
};

export default function Fluke117VsFluke107Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
