import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-multimeters/page";

export const metadata: Metadata = {
  title: "Best Multimeter for Automotive Diagnostics in 2026",
  description:
    "Multimeters with the RPM, dwell, and duty-cycle functions automotive diagnostics actually needs — compared on accuracy and real-world usability.",
};

const names = ["Craftsman CMMT14171", "AstroAI DM6000AR", "Klein Tools MM400", "KAIWEETS KM200s"];
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Do I need a multimeter with automotive-specific functions?",
    answer:
      "For basic checks (battery voltage, continuity, fuses) any decent multimeter works. For engine diagnostics — RPM, dwell angle, duty cycle on fuel injectors — you want a meter built with those functions, like the Craftsman CMMT14171 in this list.",
  },
  {
    question: "What voltage range matters for car electrical systems?",
    answer:
      "Most automotive work is low-voltage DC (12V/24V systems), so CAT III 600V is more than sufficient — none of these picks are underrated for car work.",
  },
];

export default function BestMultimeterForAutomotivePage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · For Automotive"
        heading="Best Multimeter for Automotive Diagnostics"
        tagline="Compared honestly — no pay-for-placement."
        description="From basic battery/fuse checks to RPM, dwell, and duty-cycle diagnostics — these are the picks from our full comparison best suited to working on cars."
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
