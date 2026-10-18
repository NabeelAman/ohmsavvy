import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Extech EX330 vs UNI-T UT139C",
  description: "Extech EX330 vs UNI-T UT139C: a pocket-sized meter without True RMS against a budget True RMS meter with a 6,000-count display. Which one should you buy?",
  path: "/multimeters/extech-ex330-vs-uni-t-ut139c",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Extech EX330 vs UNI-T UT139C",
  intro: "Both are affordable CAT III 600V meters with non-contact voltage detection. The Extech wins on size; the UNI-T adds True RMS, a 6,000-count display, and manual ranging.",
  a: {
    pick: picks.find((p) => p.name === "Extech EX330")!,
    reviewHref: "/multimeters/extech-ex330-review",
    imageAlt: "Extech EX330 compact multimeter",
    chooseIf: [
      "You want a meter small enough to live in a pocket",
      "You mostly check outlets and simple circuits, where True RMS rarely matters"
    ]
  },
  b: {
    pick: picks.find((p) => p.name === "UNI-T UT139C")!,
    reviewHref: "/multimeters/uni-t-ut139c-review",
    imageAlt: "UNI-T UT139C True RMS multimeter",
    chooseIf: [
      "You measure AC on motor drives, LED drivers, or switching power supplies, where True RMS matters",
      "You want a 6,000-count display and the option to range manually"
    ]
  },
  differences: [
    "Accuracy: the UT139C is True RMS; the EX330 is not.",
    "The UT139C has a 6,000-count display and both auto and manual ranging.",
    "The EX330 is genuinely pocket-sized, though its display is smaller than a full-size meter's.",
    "Both are CAT III 600V with built-in non-contact voltage detection."
  ],
  bottomLine: "Unless pocket size is the deciding factor, the UT139C gives you more measurement capability at a budget price. The EX330 makes sense as an everyday-carry meter for quick checks.",
  faqs: [
    {
      question: "Is the Extech EX330 True RMS?",
      answer: "No. It's auto-ranging but not True RMS, so readings on non-sinusoidal AC can be inaccurate. The UNI-T UT139C is True RMS."
    },
    {
      question: "Do both meters have non-contact voltage detection?",
      answer: "Yes. Both include a built-in NCV detector, and both are rated CAT III 600V."
    }
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    }
  ],
};

export default function ExtechEx330VsUniTUt139cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current="/multimeters/extech-ex330-vs-uni-t-ut139c" />
    </>
  );
}
