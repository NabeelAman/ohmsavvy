import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";
import { picks as allPicks } from "../best-multimeters/page";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Multimeter for Beginners",
  description: "Auto-ranging, straightforward displays, and forgiving controls — the multimeters that make the most sense for a first purchase.",
  path: "/multimeters/best-multimeter-for-beginners",
});

const names = guidePicks("/multimeters/best-multimeter-for-beginners");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "What should a first multimeter actually have?",
    answer:
      "Auto-ranging above all else — it picks the correct measurement range for you, so you don't need to guess roughly what voltage or resistance you're measuring before you start. True RMS and a CAT II/III 600V rating cover the vast majority of beginner electrical and electronics work.",
  },
  {
    question: "Is a more expensive multimeter worth it for a beginner?",
    answer:
      "Not usually, and often the opposite — a simpler, auto-ranging meter is easier to learn on than one with more manual modes and settings. The picks here cover real beginner needs without the learning curve or cost of a professional-grade meter.",
  },
];

export default function BestMultimeterForBeginnersPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · For Beginners"
        heading="Best Multimeter for Beginners"
        tagline="Compared honestly — no pay-for-placement."
        description="Your first multimeter should be easy to learn on, not intimidating. These are the most approachable, auto-ranging picks from our full comparison for anyone just starting out."
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
