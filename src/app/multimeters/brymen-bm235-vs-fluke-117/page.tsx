import { ContentLinks } from "@/components/ContentLinks";
import { DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/brymen-bm235-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Brymen BM235 vs Fluke 117",
  description:
    "Brymen BM235 vs Fluke 117: both True RMS with LoZ and NCV, but the BM235 adds VFD mode and temperature. Safety ratings, features and which to buy.",
  path: "/multimeters/brymen-bm235-vs-fluke-117",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Brymen BM235 vs Fluke 117",
  path,
  published: "2026-10-22",
  intro:
    "Brymen BM235 vs Fluke 117 is the enthusiast's favourite against the electrician's standard. On the core electrician features they match: True RMS, 6,000 counts, a low-impedance voltage mode and non-contact voltage detection. The BM235 piles on a VFD mode, Type-K temperature, relative zero and µA/mA ranges; the 117 answers with a bar graph, a three-year warranty and Fluke's US support network.",
  a: {
    pick: picks.find((p) => p.name === "Brymen BM235")!,
    imageAlt: "Brymen BM235 True RMS digital multimeter, front view",
    chooseIf: [
      "You service variable-frequency drives and want a dedicated VFD voltage and frequency mode",
      "You want temperature, relative zero and µA/mA ranges in the same meter",
      "You value features per dollar over brand and US support",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 True RMS multimeter, front view",
    chooseIf: [
      "You want the meter most electricians and employers already know and accept",
      "You prefer a clear CAT III 600V rating stated consistently by the maker",
      "You want a 33-segment bar graph and Fluke's three-year warranty",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "6,000 counts, white backlight", b: "6,000 counts + 33-segment bar graph" },
    { label: "Low-impedance mode", a: "AutoV LoZ (automatic)", b: "Selectable LoZ + AutoVolt" },
    { label: "Non-contact voltage", a: "Yes (Hi/Lo EF detection)", b: "Yes (VoltAlert)" },
    { label: "VFD mode", a: "Yes (V and Hz)", b: "Not listed" },
    { label: "Temperature", a: "Type-K, °C/°F", b: "Not listed consistently by Fluke" },
    { label: "Current ranges", a: "µA, mA and 10A", b: "6A and 10A AC/DC" },
    { label: "Recording", a: "Max/Min/Avg, relative zero", b: "Min/Max/Average" },
    { label: "Max voltage", a: "Brymen sources differ (600V–1000V)", b: "600V AC/DC" },
    { label: "Ingress protection", a: "IP40", b: "Not stated" },
    { label: "Warranty", a: "Not stated in our sources", b: "3 years" },
  ],
  differences: [
    "Both are True RMS with a low-impedance mode and non-contact voltage detection, so the core electrician toolkit is shared.",
    "The BM235 adds a VFD voltage and frequency mode, Type-K temperature, relative zero and µA/mA current ranges.",
    "The Fluke 117 adds a 33-segment bar graph and comes with a stated three-year warranty.",
    "Brymen's own documents disagree on the BM235's ratings: its catalog and the meter's markings give CAT III 600V and CAT IV 300V, while its web page lists CAT II 1kV and a 1000V range.",
    "The BM235's US Amazon listing is the EEVblog edition, and support runs through Brymen's distributors rather than a large US brand.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feature-by-feature</h2>
        <DataTable
          head={["Feature", "Brymen BM235", "Fluke 117"]}
          rows={[
            ["True RMS", "Yes", "Yes"],
            ["Low-impedance voltage", "Yes", "Yes"],
            ["Non-contact voltage", "Yes", "Yes"],
            ["Automatic AC/DC selection", "Yes (AutoV)", "Yes (AutoVolt)"],
            ["VFD mode", "Yes", "No"],
            ["Temperature", "Yes", "Not claimed"],
            ["Relative zero", "Yes", "Not listed"],
            ["Bar graph", "Not listed", "Yes"],
          ]}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Reading the BM235&apos;s safety rating</h2>
        <Figure caption={<>Ratings as published by each maker. Brymen&apos;s web page and catalog PDF disagree, so we use the catalog and the meter&apos;s markings.</>}>
          <InfoCards
            items={[
              { label: "BM235, catalog and meter", desc: "CAT III 600V and CAT IV 300V" },
              { label: "BM235, web page", desc: "CAT II 1kV and CAT III 600V" },
              { label: "Fluke 117", desc: "CAT III 600V, stated consistently" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Practical meaning">
            For household panels and building wiring, both meters carry the CAT III 600V rating you need. The
            BM235&apos;s extra CAT IV 300V rating suits low-voltage service points; neither is a CAT IV 600V meter.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Brymen BM235 if you want the most features for the money, especially a VFD mode and temperature, and you're comfortable buying the EEVblog edition with distributor support. Choose the Fluke 117 if you want a consistently documented rating, a three-year warranty and the meter employers and inspectors already trust.",
  faqs: [
    {
      question: "Do both the Brymen BM235 and Fluke 117 have LoZ and NCV?",
      answer:
        "Yes. Brymen lists AutoV LoZ and Hi/Lo EF non-contact detection for the BM235; Fluke lists a selectable LoZ mode, AutoVolt and VoltAlert NCV for the 117.",
    },
    {
      question: "What is the Brymen BM235's CAT rating?",
      answer:
        "Brymen's catalog and the meter's own markings give CAT III 600V and CAT IV 300V; its web page lists CAT II 1kV and CAT III 600V. Either way it covers CAT III 600V household work, like the Fluke 117.",
    },
    {
      question: "Why is the BM235 sold as an EEVblog meter?",
      answer:
        "The US Amazon listing we link is titled 'EEVblog Brymen BM235'. It is the Brymen meter sold through that channel, so check the seller and contents on the listing before you buy.",
    },
    {
      question: "Which is better for VFD work?",
      answer:
        "The BM235, which has a dedicated VFD voltage and frequency mode. Fluke doesn't list a VFD mode for the 117, though its True RMS reading is still useful on drive circuits.",
    },
    {
      question: "Which meter has temperature?",
      answer:
        "The BM235 reads Type-K temperature in °C or °F. Fluke doesn't list temperature consistently for the 117, so don't buy it for that.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function BrymenBm235VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
