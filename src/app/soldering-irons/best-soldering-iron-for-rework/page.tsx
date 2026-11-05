import { CategoryHero } from "@/components/CategoryHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle } from "@/components/ReviewArticle";
import { guidePicks } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { picks as allPicks } from "../best-soldering-irons/page";

// Drafted with a local model from verified Pick data only, fact-checked by
// automation/ollama/article.mjs, and reviewed in preview before publishing.
export const metadata = buildMetadata({
  title: "Best Soldering Iron for Rework",
  description: "Find the best soldering iron for rework tasks with our detailed guide. Learn about the top choices for SMD and BGA rework, and general repair work.",
  path: "/soldering-irons/best-soldering-iron-for-rework",
});

const names = guidePicks("/soldering-irons/best-soldering-iron-for-rework");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "What is the best soldering iron for SMD rework?",
    answer: "The YIHUA 862BD+ is an excellent choice for SMD rework due to its dual-purpose setup with a hot air rework station. It provides a wide temperature range and precise control for both soldering and desoldering tasks. Its 75W iron and 500W hot air gun make it suitable for SMD and BGA rework alongside general soldering needs."
  },
  {
    question: "How does the Hakko FX-888DX compare for rework tasks?",
    answer: "The Hakko FX-888DX excels in rework tasks with its 100W station and precise temperature control. It offers robust features for both through-hole and surface mount work, making it a top choice for serious hobbyists and professionals. Its ESD safety and compatibility with other Hakko handpieces ensure reliable performance for complex rework tasks."
  },
  {
    question: "What are the key features to look for in a rework soldering iron?",
    answer: "Key features to look for in a rework soldering iron include high power, precise temperature control, and versatility. Models like the Hakko FX-888DX and YIHUA 862BD+ offer these features, ensuring efficient and accurate rework tasks. High power ensures quick heat-up times, precise temperature control ensures stable temperatures, and versatility ensures you can handle both through-hole and surface mount work."
  },
  {
    question: "Why is ESD safety important for rework soldering irons?",
    answer: "ESD safety is crucial in rework tasks to prevent damage to sensitive electronic components. Soldering irons like the Hakko FX-888DX, which are ESD safe, protect your equipment and ensure reliable performance. ESD safety is particularly important in professional settings where sensitive components are being worked on, ensuring that your tools do not cause damage during rework tasks."
  }
];

const fitNotes: Record<string, string> = {
  "Hakko FX-888DX": "The Hakko FX-888DX is ideal for rework tasks due to its 100W station and precise temperature control. It maintains stable temperatures and is ESD safe, making it suitable for both through-hole and surface mount work. Its compatibility with other Hakko handpieces enhances its versatility, ensuring reliable performance for complex rework tasks.",
  "YIHUA 862BD+": "The YIHUA 862BD+ is perfect for rework tasks requiring both soldering and hot air rework. Its 75W iron and 500W hot air gun provide a wide temperature range, making it suitable for SMD and BGA rework alongside general soldering needs. The dual-purpose setup ensures efficient and accurate rework tasks."
};

const advice = [
  {
    heading: "Consider Power and Temperature Control",
    body: "For rework tasks, choose a soldering iron with high power and precise temperature control. The Hakko FX-888DX, for example, has a 100W station and digital closed-loop temperature control, ensuring stable temperatures. This precision is crucial for both through-hole and surface mount work, preventing damage to sensitive components during rework. Additionally, a quick heat-up time is essential for efficient work, especially when switching between different tasks."
  },
  {
    heading: "Versatility for Different Tasks",
    body: "Choose a soldering iron that can handle both through-hole and surface mount work. The YIHUA 862BD+ offers a dual-purpose setup with a hot air rework station, providing a wide temperature range and precise control for both soldering and desoldering tasks. This versatility makes it ideal for comprehensive rework tasks, ensuring you have the right tool for every job."
  },
  {
    heading: "Safety and Compatibility",
    body: "Ensure your soldering iron is ESD safe and compatible with various handpieces. The Hakko FX-888DX, for instance, is ESD safe and works with other Hakko handpieces, enhancing its utility for professional use. This compatibility ensures you can use the iron with a variety of tools, making it a versatile choice for any rework task. Additionally, a robust build quality and reliable performance are essential for consistent results."
  }
];

export default function BestSolderingIronForReworkPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons · For SMD Rework"
        heading="Best Soldering Irons for Rework"
        tagline="Compared honestly — no pay-for-placement."
        description="This guide helps you choose the best soldering iron for rework tasks, whether you're a professional technician or a serious hobbyist."
        primaryCta={{ label: "See all soldering iron picks", href: "/soldering-irons/best-soldering-irons" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We selected the best soldering irons for rework by focusing on power, temperature control, and versatility. The Hakko FX-888DX offers robust features for serious hobbyists and professionals, while the YIHUA 862BD+ combines a soldering iron with a hot air rework station for comprehensive SMD and BGA tasks."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-rework" />
    </>
  );
}
