import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fluke 115 vs Fluke 117",
  description: "Fluke 115 vs Fluke 117: both True RMS and CAT III 600V. What non-contact voltage detection and AutoVolt actually add, and whether you'll use them.",
  path: "/multimeters/fluke-115-vs-fluke-117",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 115 vs Fluke 117",
  intro:
    "This is one of the most common Fluke questions: the 115 and 117 share the same True RMS accuracy, CAT III 600V rating, and 6,000-count display, so the decision comes down to two specific features the 117 adds, and whether you'll actually use them.",
  a: {
    pick: picks.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 digital multimeter",
    chooseIf: [
      "You want Fluke's reliability without paying for electrician-specific extras",
      "You work across general electrical and electronics tasks, not just panels",
      "You'd rather have explicit capacitance and frequency measurement on the spec sheet",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 digital multimeter",
    chooseIf: [
      "You want non-contact voltage (NCV) detection for a fast first check",
      "You want the AutoVolt AC/DC auto-selector and a low-impedance (LoZ) mode",
      "You specifically do electrician-focused panel and building-wiring work",
    ],
  },
  differences: [
    "The 117 has built-in non-contact voltage (NCV) detection; the 115 doesn't.",
    "The 117 has AutoVolt, an automatic AC/DC voltage selector, plus a selectable low-impedance (LoZ) mode to avoid ghost-voltage readings; the 115 has neither.",
    "Both measure True RMS, CAT III 600V, resistance, continuity, diode test, capacitance, and frequency — the core measurement capability is identical.",
    "Fluke markets the 117 specifically to electricians and the 115 as a more general field-service meter, though the underlying accuracy specs match.",
    "Both carry the same 6,000-count display, 33-segment bar graph, and 3-year warranty.",
  ],
  bottomLine:
    "If you can honestly say you'll use non-contact voltage detection or LoZ mode regularly — panel work, confirming a circuit is dead before you touch it — the 117 earns its keep. If your work is more general electrical and electronics troubleshooting without those specific needs, the 115 gives you the same core Fluke accuracy for the same price tier.",
  faqs: [
    {
      question: "Are the Fluke 115 and 117 the same meter with different features unlocked?",
      answer:
        "Functionally, yes, for the shared measurements — Fluke's own comparison confirms the 115 and 117 are identical for voltage, current, resistance, capacitance, diode test, and frequency. The 117 is a genuinely different hardware build that adds an NCV sensor and the AutoVolt/LoZ circuitry, not just a software toggle.",
    },
    {
      question: "What is AutoVolt, and is it worth paying for?",
      answer:
        "AutoVolt is Fluke's automatic AC/DC voltage selector — the meter detects whether it's reading AC or DC and switches automatically, instead of you selecting DCV or ACV manually. It's a genuine time-saver for someone switching between AC and DC checks constantly, like an electrician moving between outlets and control circuits, but it's a convenience feature, not an accuracy improvement — the 115 reads just as accurately once you've manually selected the right mode.",
    },
    {
      question: "Is non-contact voltage detection worth the price difference?",
      answer:
        "The 115 and 117 are typically priced close enough that NCV isn't really a separate line-item cost — it's bundled into the 117's electrician-focused positioning. The real question isn't price, it's whether you'll use NCV: a fast first check for live voltage before probes ever touch a circuit is a genuine safety habit for panel and building-wiring work, and far less relevant if your work is mostly bench-level electronics.",
    },
    {
      question: "Does the 115's explicit capacitance spec mean it's better for electronics work?",
      answer:
        "Both meters measure capacitance up to 9,999 µF and frequency up to 50 kHz according to their spec sheets, so neither has an advantage there. What the 115 genuinely offers for electronics work is simplicity: without AutoVolt or NCV circuitry taking up panel space and battery draw, it's a slightly more straightforward tool for someone whose work is bench electronics rather than live building wiring.",
    },
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
    href: "/multimeters/best-multimeters",
  },
  related: [
    {
      label: "Fluke 117 vs Fluke 87V",
      href: "/multimeters/fluke-117-vs-fluke-87v",
    },
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians",
    },
  ],
};

export default function Fluke115VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-115-vs-fluke-117" />
    </>
  );
}
