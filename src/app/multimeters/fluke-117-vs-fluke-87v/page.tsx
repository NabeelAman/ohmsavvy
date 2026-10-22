import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fluke 117 vs Fluke 87V",
  description:
    "Fluke 117 vs Fluke 87V: both True RMS and CAT III rated. How CAT IV protection, display resolution, and price decide which Fluke tier to buy.",
  path: "/multimeters/fluke-117-vs-fluke-87v",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 117 vs Fluke 87V",
  intro:
    "Both are True RMS, CAT III-rated Fluke meters built on the same reputation for reliability. The difference is how much safety margin and resolution you actually need, and whether you'll use the 87V's extra capability often enough to justify its premium over the 117.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You want Fluke's reliability and accuracy at a lower price point",
      "You're primarily working CAT III 600V environments — standard panels and branch circuits",
      "You don't need the 87V's higher-resolution display mode or CAT IV rating",
      "You want both meters' core True RMS accuracy without paying for the industrial headroom",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V digital multimeter",
    chooseIf: [
      "You need the CAT IV 600V rating for service-entrance or utility-adjacent work",
      "You want the 19,999-count high-resolution mode for finer readings",
      "You're tracking fast-changing signals where the analog bar graph genuinely helps",
      "You work daily as an industrial technician and want the widest safety margin available in this tier",
    ],
  },
  differences: [
    "The 87V adds a CAT IV 600V rating on top of CAT III 1000V, for work closer to the utility connection than the 117's CAT III 600V covers.",
    "The 87V's high-resolution mode reaches 19,999 counts, finer than the 117's standard display.",
    "The 87V includes a 32-segment analog bar graph for watching fast-changing signals in real time; the 117 doesn't.",
    "The 117 is Fluke's more accessible price point; the 87V carries a clear premium for the added range and resolution.",
    "Both are hands-on tested by OhmSavvy, so this comparison is based on direct use of both meters, not spec-sheet reading alone.",
  ],
  bottomLine:
    "Both meters share the same core True RMS accuracy and Fluke build quality — the 87V's extra cost buys a higher CAT rating and finer resolution, not a fundamentally different measurement experience. If your work genuinely touches CAT IV environments or you need that resolution, the 87V earns its price. Otherwise, the 117 is the more practical buy for the vast majority of electrical and electronics work. Neither choice is a downgrade — you're picking the right amount of headroom for the work you actually do, not settling for a lesser tool.",
  faqs: [
    {
      question: "Is the Fluke 87V just a more expensive version of the 117?",
      answer:
        "Mostly, yes — both are True RMS and share Fluke's core reliability, but the 87V adds a CAT IV 600V rating, a higher-resolution display mode, and an analog bar graph the 117 doesn't have. The price gap reflects those added capabilities, not a different build tier.",
    },
    {
      question: "Do I need CAT IV protection for home or light commercial work?",
      answer:
        "Usually not. CAT III 600V (the 117's rating) covers standard panels and branch circuits, which is the large majority of residential and light commercial electrical work. CAT IV specifically matters for work at or near the service entrance and utility connection.",
    },
    {
      question: "What's the analog bar graph on the 87V actually for?",
      answer:
        "It's a 32-segment display that updates much faster than the digital numeric readout, so you can see a signal rising, falling, or fluctuating in real time rather than watching numbers blur. That matters for tasks like adjusting a variable resistor while watching the change happen, or spotting an intermittent fault that a digital-only display would just show as a flickering number. The 117 has no equivalent — its numeric display is fast enough for standard troubleshooting but not built for watching continuous signal movement.",
    },
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters",
  },
  related: [
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians",
    },
    {
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use",
    },
  ],
};

export default function Fluke117VsFluke87VPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-117-vs-fluke-87v" />
    </>
  );
}
