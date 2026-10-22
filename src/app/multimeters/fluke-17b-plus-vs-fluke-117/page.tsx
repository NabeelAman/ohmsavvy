import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
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

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 117",
  path,
  published: "2026-10-22",
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
    { label: "Display", a: "4,000 counts, backlit", b: "6,000 counts + 33-segment bar graph" },
    { label: "Max voltage", a: "1000V AC/DC", b: "600V AC/DC" },
    { label: "Current ranges", a: "400 µA to 10A AC/DC", b: "6A and 10A AC/DC" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 9,999 µF" },
    { label: "Frequency", a: "Up to 100 kHz, plus duty cycle", b: "Up to 50 kHz" },
    { label: "Temperature", a: "−55 °C to 400 °C, Type K probe included", b: "Not listed consistently by Fluke" },
    { label: "NCV / AutoVolt / LoZ", a: "None listed", b: "Yes / Yes / Yes" },
    { label: "Weight", a: "455 g", b: "550 g" },
    { label: "Battery", a: "2 × AA, 500 hours minimum", b: "One 9V, about 400 hours" },
    { label: "Warranty", a: "2 years", b: "3 years" },
  ],
  differences: [
    "The 117 is True RMS; Fluke makes no True RMS claim for the 17B+.",
    "Only the 117 has VoltAlert non-contact detection, AutoVolt and a low-impedance mode.",
    "The 17B+ adds temperature with an included Type K probe, duty cycle, relative mode and µA current ranges.",
    "The 17B+ reads up to 1000V and 100 kHz; the 117 stops at 600V and 50 kHz.",
    "The 117's 6,000-count display and bar graph are finer than the 17B+'s 4,000 counts.",
    "The 17B+ Amazon listing's photo shows the newer 17B MAX, so check which model ships.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Range versus resolution</h2>
        <p className="text-muted leading-7 mb-4">
          The 17B+ reaches further on frequency and voltage, while the 117 shows readings with finer resolution.
          Which matters depends on whether you chase signals or confirm mains.
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
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Function checklist</h2>
        <DataTable
          head={["Function", "Fluke 17B+", "Fluke 117"]}
          rows={[
            ["True RMS", "Not claimed", "Yes"],
            ["Non-contact voltage", "No", "Yes"],
            ["Low-impedance mode", "No", "Yes"],
            ["Temperature", "Yes", "Not claimed"],
            ["Duty cycle", "Yes", "Not listed"],
            ["Relative mode", "Yes", "Not listed"],
            ["MIN MAX", "Yes", "Yes (Min/Max/Average)"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="Two different jobs">
            The 17B+ is the better bench and appliance meter; the 117 is the better meter for live building
            wiring. Electricians rarely need temperature, and electronics hobbyists rarely need NCV.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Fluke 117 if you do electrical work: True RMS, NCV, AutoVolt and LoZ are what matter on live circuits. Buy the Fluke 17B+ for electronics, appliance and HVAC diagnostics, where temperature, frequency, duty cycle and µA ranges earn their place, and accept that it isn't True RMS.",
  faqs: [
    {
      question: "Is the Fluke 17B+ True RMS?",
      answer:
        "Fluke makes no True RMS claim for the 17B+ in its datasheet, manual or product page, so don't count on it. The Fluke 117 is True RMS.",
    },
    {
      question: "Does the Fluke 17B+ measure temperature?",
      answer:
        "Yes. Fluke lists −55 °C to 400 °C with an included Type K thermocouple probe. Fluke doesn't list temperature consistently for the 117.",
    },
    {
      question: "Which has the higher voltage range?",
      answer:
        "The 17B+ measures up to 1000V AC/DC and is rated CAT III 600V and CAT II 1000V. The 117 measures up to 600V and is rated CAT III 600V.",
    },
    {
      question: "Why does the 17B+ Amazon listing show a 17B MAX?",
      answer:
        "Fluke has introduced the 17B MAX, and the listing's main photo shows it, so the listing may ship the newer model. Check the listing details before buying if you specifically want the 17B+.",
    },
    {
      question: "Which battery lasts longer?",
      answer:
        "Fluke quotes a minimum of 500 hours on two AA cells for the 17B+, and about 400 hours typical on a 9V battery for the 117 with the backlight off.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 117 vs Fluke 15B+", href: "/multimeters/fluke-117-vs-fluke-15b-plus" },
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
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
