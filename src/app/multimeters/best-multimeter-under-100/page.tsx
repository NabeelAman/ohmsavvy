import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";
import { picks as allPicks } from "../best-multimeters/page";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Multimeter Under $100",
  description: "Budget-tier multimeters that don't cut corners on auto-ranging, True RMS, or CAT safety ratings — compared from our full lineup.",
  path: "/multimeters/best-multimeter-under-100",
});

const names = guidePicks("/multimeters/best-multimeter-under-100");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "What do you give up at the budget tier?",
    answer:
      "Typically resolution (fewer display counts), a narrower feature set (no capacitance or frequency measurement on some models), and sometimes a lower CAT rating ceiling. None of that means inaccurate or unsafe — it means fewer extras, not lower-quality core measurement.",
  },
  {
    question: "Should I check the current price before buying?",
    answer:
      "Yes — Amazon pricing fluctuates, and a budget-tier pick today isn't guaranteed to stay at the same price tomorrow. Use the badge and specs here to judge fit, then check the live price on the product page before deciding.",
  },
];

export default function BestMultimeterUnder100Page() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Budget Tier"
        heading="Best Multimeter Under $100"
        tagline="Compared honestly — no pay-for-placement."
        description="Budget doesn't have to mean compromised — these picks from our full comparison keep auto-ranging, True RMS, and real CAT safety ratings without the premium-brand price tag."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeter-under-100" />
    </>
  );
}
