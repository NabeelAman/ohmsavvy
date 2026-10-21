import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Soldering Iron for DIY Electronics Projects",
  description: "Versatile picks across a range of budgets for general hobby electronics, from one-off repairs to ongoing project work.",
  path: "/soldering-irons/best-soldering-iron-for-diy-electronics",
});

const names = guidePicks("/soldering-irons/best-soldering-iron-for-diy-electronics");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "How is \"DIY electronics projects\" different from \"beginner\"?",
    answer:
      "A beginner pick prioritizes the simplest possible controls for a first-ever iron. DIY project work assumes you already solder occasionally and are building or modifying things regularly — so a bit more capability (precise digital control, or genuine portability for working on different projects in different spots) earns its keep, without needing the ESD-safe, bench-dedicated features aimed at daily professional use.",
  },
  {
    question: "Should I buy based on the kits/projects I'm doing right now, or plan ahead?",
    answer:
      "Plan one step ahead rather than buying for only your current project. Hobby electronics tends to escalate: today's simple LED project often leads to microcontroller boards, then SMD components. An iron with some temperature range and tip flexibility, like the picks here, covers that progression better than the cheapest option that only suits what you're building today.",
  },
  {
    question: "Is one iron enough for most DIY electronics work?",
    answer:
      "Yes, for the large majority of hobby projects — through-hole kits, breadboard-to-perfboard builds, wire splicing, and basic repairs. You'd only need a second, more specialized tool (like a hot air rework station) once you're regularly doing SMD or BGA rework, which is a smaller, more specific slice of DIY electronics work.",
  },
];

export default function BestSolderingIronForDiyElectronicsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For DIY Electronics Projects"
        heading="Best Soldering Iron for DIY Electronics Projects"
        tagline="Compared honestly — no pay-for-placement."
        description="General hobby electronics covers a wide range of work, from one-off repairs to ongoing builds. These are the picks from our full comparison with enough versatility and headroom to grow with a DIY habit."
        primaryCta={{ label: "See the Full Comparison", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-diy-electronics" />
    </>
  );
}
