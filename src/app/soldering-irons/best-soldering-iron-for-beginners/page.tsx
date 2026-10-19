import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Soldering Iron for Beginners",
  description: "Simple controls, forgiving temperature range, and a low cost of entry — the soldering irons that make the most sense for a first purchase.",
  path: "/soldering-irons/best-soldering-iron-for-beginners",
});

const names = guidePicks("/soldering-irons/best-soldering-iron-for-beginners");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Do I need a digital temperature-controlled station as a beginner?",
    answer:
      "Not for your first iron. A simple adjustable dial, like the Q-MING kit uses, is genuinely easier to learn on and costs much less — you can step up to digital control once you know what temperature range your projects actually need.",
  },
  {
    question: "What should actually come in a beginner's first kit?",
    answer:
      "At minimum: the iron itself, a stand to rest it safely, and a few interchangeable tips. A complete kit avoids the common first-timer mistake of buying just the iron and discovering you need accessories separately before you can use it.",
  },
];

export default function BestSolderingIronForBeginnersPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Beginners"
        heading="Best Soldering Iron for Beginners"
        tagline="Compared honestly — no pay-for-placement."
        description="Your first soldering iron doesn't need digital precision or high wattage — it needs to be simple, safe, and not intimidating. These are the easiest picks from our full comparison to actually learn on."
        primaryCta={{ label: "See the Full Comparison", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-beginners" />
    </>
  );
}
