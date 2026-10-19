import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Soldering Iron for Circuit Board Repair",
  description: "Precise temperature control and fast thermal recovery matter most for board-level repair work — these are the picks built for it.",
  path: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
});

const names = guidePicks("/soldering-irons/best-soldering-iron-for-circuit-board-repair");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Why does temperature control matter so much for repair work?",
    answer:
      "Repair work means touching joints that are already soldered, often near heat-sensitive components. Precise, stable temperature control lets you work hot enough to desolder and resolder cleanly without overheating nearby traces or parts — a fixed-temperature iron gives you far less margin for that.",
  },
  {
    question: "Do I need a high-wattage iron for board repair?",
    answer:
      "Not necessarily. Board-level work is usually lower thermal mass than wire harnesses or chassis grounds, so 40-70W with good temperature stability matters more than raw wattage. Both picks here cover this comfortably.",
  },
];

export default function BestSolderingIronForCircuitBoardRepairPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Circuit Board Repair"
        heading="Best Soldering Iron for Circuit Board Repair"
        tagline="Compared honestly — no pay-for-placement."
        description="Board-level repair rewards precise temperature control and fast thermal recovery over raw wattage. These are the picks from our full comparison best suited to that work."
        primaryCta={{ label: "See the Full Comparison", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-circuit-board-repair" />
    </>
  );
}
