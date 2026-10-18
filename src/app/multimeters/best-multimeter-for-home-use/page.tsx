import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Multimeter for Home Use & DIY in 2026",
  description: "The multimeters that make the most sense for home electrical checks and DIY projects — easy to use, accurate, and not overpriced for occasional work.",
  path: "/multimeters/best-multimeter-for-home-use",
});

const names = guidePicks("/multimeters/best-multimeter-for-home-use");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Do I need a professional-grade meter for occasional home use?",
    answer:
      "Not usually. A CAT II/III 600V meter with True RMS and auto-ranging — like the picks in this list — covers outlet checks, appliance troubleshooting, and basic DIY wiring without paying for features a weekend user won't use.",
  },
  {
    question: "What's the single most useful feature for a first-time buyer?",
    answer:
      "Auto-ranging. It picks the correct measurement range for you, so you don't need to know in advance roughly what voltage or resistance you're measuring — every pick here has it.",
  },
];

export default function BestMultimeterForHomeUsePage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · For Home & DIY"
        heading="Best Multimeter for Home Use & DIY"
        tagline="Compared honestly — no pay-for-placement."
        description="You don't need an industrial-grade meter to check an outlet or troubleshoot an appliance. These are the easiest, most approachable picks from our full comparison for home and DIY work."
        primaryCta={{ label: "See the Full Top 10", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
    </>
  );
}
