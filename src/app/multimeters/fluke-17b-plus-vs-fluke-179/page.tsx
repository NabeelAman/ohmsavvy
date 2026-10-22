import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fluke 17B+ vs Fluke 179",
  description:
    "Fluke 17B+ vs Fluke 179: a feature-rich entry meter without True RMS against Fluke's full-featured 170-series meter. The accuracy gap is the real difference.",
  path: "/multimeters/fluke-17b-plus-vs-fluke-179",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 17B+ vs Fluke 179",
  path: "/multimeters/fluke-17b-plus-vs-fluke-179",
  published: "2026-10-22",
  intro:
    "Both meters pack in features beyond basic voltage and resistance — temperature, frequency, and more — but they sit in genuinely different Fluke tiers. The 17B+ is a feature-rich entry-level meter that Fluke doesn't describe as True RMS. The 179 is the full-featured member of the 170 series: True RMS, a higher CAT rating, wider capacitance range, and recording functions the 17B+ doesn't have. The accuracy difference between them matters more than the feature-list overlap suggests.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 17B+")!,
    reviewHref: undefined,
    imageAlt: "Fluke 17B+ digital multimeter",
    chooseIf: [
      "You're a student, hobbyist, or doing appliance repair on mostly clean sine-wave circuits",
      "You want temperature, frequency, and relative mode at a lower price than the 179",
      "True RMS accuracy on distorted AC waveforms isn't a priority for your work",
      "You've confirmed your specific unit ships as the 17B+, not the newer 17B MAX shown in some listing photos",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 179")!,
    reviewHref: undefined,
    imageAlt: "Fluke 179 True RMS digital multimeter",
    chooseIf: [
      "You need True RMS accuracy on variable-speed drives, dimmers, or other electronic loads",
      "You need CAT IV 600V protection, not just CAT II 1000V / CAT III 600V",
      "You work with larger capacitors (up to 10,000 µF) than the 17B+'s 1,000 µF range covers",
      "You want Min/Max-Average recording alongside temperature and frequency",
    ],
  },
  extraSpecs: [
    { label: "Accuracy", a: "Not stated as True RMS by Fluke", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 1000V / CAT IV 600V" },
    { label: "Display", a: "4,000 counts", b: "6,000 counts with analog bar graph" },
    { label: "Capacitance", a: "Up to 1,000 µF", b: "Up to 10,000 µF" },
    { label: "Temperature", a: "Yes, with supplied Type K probe", b: "Yes, with supplied thermocouple" },
    { label: "Frequency", a: "Up to 100 kHz", b: "Up to 100 kHz" },
    { label: "Min/Max recording", a: "MIN MAX only", b: "Min/Max-Average" },
  ],
  differences: [
    "Fluke doesn't describe the 17B+ as True RMS, while the 179 is — on clean sine-wave circuits this rarely matters, but on variable-speed drives, dimmers, and other non-sinusoidal AC loads it means the 17B+'s readings can be meaningfully off where the 179's aren't.",
    "The 179 is rated CAT IV 600V on top of CAT III 1000V; the 17B+ tops out at CAT III 600V / CAT II 1000V, a lower safety margin for work near a service entrance.",
    "The 179's capacitance range reaches 10,000 µF against the 17B+'s 1,000 µF — a 10x difference that matters for larger motor-run or power-supply capacitors.",
    "The 179's display resolves 6,000 counts with an analog bar graph; the 17B+'s display is 4,000 counts with no bar graph.",
    "Both measure temperature and frequency, so those two functions aren't a differentiator between them — the accuracy, safety rating, and capacitance range are.",
  ],
  sections: (
    <>
      <Callout title="Check which exact model your 17B+ listing ships">
        Some Amazon listings for the Fluke 17B+ show a product photo of the newer 17B MAX model instead.
        Confirm the listing title and any visible model markings match &quot;17B+&quot; specifically before
        buying, since the two are different products with different specifications.
      </Callout>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Capacitance range: a 10x gap</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters measure capacitance, but the range each covers is different enough to matter for
          real component testing, not just a spec-sheet number.
        </p>
        <Figure caption={<>Maximum capacitance, on a log scale: the 179 covers a full order of magnitude more than the 17B+.</>}>
          <BarChart
            log
            items={[
              { label: "Fluke 17B+", value: 1000, display: "1,000 µF" },
              { label: "Fluke 179", value: 10000, display: "10,000 µF", highlight: true },
            ]}
          />
        </Figure>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Which one for which buyer</h2>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["Student or hobbyist learning electronics basics", "Fluke 17B+", "Lower price, still has temperature and frequency"],
            ["Working on drives, dimmers, or electronic loads professionally", "Fluke 179", "True RMS accuracy matters on non-sinusoidal AC"],
            ["Work near a service entrance or utility connection", "Fluke 179", "CAT IV 600V rating the 17B+ doesn't have"],
            ["Testing larger motor-run or supply capacitors", "Fluke 179", "10,000 µF range vs the 17B+'s 1,000 µF"],
            ["Budget-conscious, mostly clean sine-wave circuits", "Fluke 17B+", "True RMS accuracy gap rarely matters in this use case"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="True RMS is the deciding factor more than any single feature">
            Feature-for-feature, these meters look closer than the price gap suggests — both have
            temperature and frequency. The actual decision usually comes down to whether you measure
            non-sinusoidal AC often enough to need True RMS accuracy. See our{" "}
            <Link href="/multimeters/multimeter-buying-guide" className={link}>
              multimeter buying guide
            </Link>{" "}
            for a fuller explanation of why that matters.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "These two meters share more features than their price gap implies — both measure temperature and frequency — but the 179 wins on the things that actually affect measurement reliability: True RMS accuracy, a higher CAT rating, and a far wider capacitance range. If your work only ever touches clean sine-wave circuits and a tight budget matters, the 17B+ is a reasonable, feature-rich entry meter. For anything touching variable-speed drives, dimmers, or larger capacitors, the 179's accuracy and range earn its higher price.",
  faqs: [
    {
      question: "Does the 17B+ give wrong readings, or just less accurate ones?",
      answer:
        "On clean, sinusoidal AC (most standard outlets and simple circuits), it reads accurately. The accuracy gap specifically shows up on non-sinusoidal AC loads like variable-speed drives and dimmers, where a non-True-RMS meter can read noticeably off from the actual value.",
    },
    {
      question: "Is the 17B MAX the same as the 17B+?",
      answer:
        "No — they're different products. Some Amazon listings for the 17B+ show a photo of the 17B MAX instead, so check the listing title and any visible model markings carefully before buying if this distinction matters to you.",
    },
    {
      question: "Why would anyone choose the 17B+ if the 179 is more capable overall?",
      answer:
        "Price and simplicity. For work that never touches non-sinusoidal AC loads or CAT IV environments, the 17B+'s lower cost buys genuinely sufficient capability — paying more for accuracy and range you won't use isn't a better choice just because the spec sheet is longer.",
    },
    {
      question: "Do both meters include the temperature probe, or is it sold separately?",
      answer:
        "Both include their respective temperature probe (a Type K probe for the 17B+, a thermocouple for the 179) as supplied accessories, not a separate purchase.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Multimeter Buying Guide", href: "/multimeters/multimeter-buying-guide" },
  ],
};

export default function Fluke17bPlusVsFluke179Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-17b-plus-vs-fluke-179" />
    </>
  );
}
