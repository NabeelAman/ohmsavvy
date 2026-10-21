import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Soldering Iron for Automotive Electronics",
  description: "Stable temperature control for connector pins and wire harnesses, plus enough portability to work away from a bench — the picks suited to automotive work.",
  path: "/soldering-irons/best-soldering-iron-for-automotive-electronics",
});

const names = guidePicks("/soldering-irons/best-soldering-iron-for-automotive-electronics");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Do I need an ESD-safe iron for automotive electronics?",
    answer:
      "It's worth having for modern vehicles. Many late-model ECUs, body control modules, and sensors use the same static-sensitive semiconductors as any other board-level electronics, so ESD-safe construction (like the Weller WE1010NA has) reduces risk when you're working near a connector attached to a control module, not just on bare wire splices.",
  },
  {
    question: "What wattage actually matters for automotive wiring?",
    answer:
      "Automotive wiring runs from thin signal wire up to thick gauge power leads and ground straps, so 60-70W gives enough headroom for the thicker end without being overkill on signal wiring. A portable iron is genuinely useful here too, since a lot of automotive soldering happens in or near the vehicle rather than at a bench.",
  },
  {
    question: "Is crimping better than soldering for automotive connections?",
    answer:
      "Both have a place. Crimped connections are standard for serviceable, vibration-prone joints because they don't fatigue and crack the way a rigid soldered joint can under constant vibration. Soldering is common for permanent splices, sensor pigtails, and repairs where a proper crimp isn't practical — adding heat-shrink for strain relief matters more in a vehicle than almost anywhere else.",
  },
];

export default function BestSolderingIronForAutomotiveElectronicsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For Automotive Electronics"
        heading="Best Soldering Iron for Automotive Electronics"
        tagline="Compared honestly — no pay-for-placement."
        description="Automotive wiring work rewards stable temperature under load and enough portability to work in or near the vehicle, over raw wattage or a bench-only footprint. These are the picks from our full comparison best suited to that work."
        primaryCta={{ label: "See the Full Comparison", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-automotive-electronics" />
    </>
  );
}
