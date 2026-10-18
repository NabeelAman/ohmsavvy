import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Multimeter for Electricians in 2026",
  description: "The multimeters with the safety ratings and features electricians actually need — CAT III/IV protection, True RMS, and field durability compared.",
  path: "/multimeters/best-multimeter-for-electricians",
});

const names = guidePicks("/multimeters/best-multimeter-for-electricians");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "What CAT rating do I actually need as an electrician?",
    answer:
      "CAT III 600V is the standard minimum for residential/commercial panel work. If you're working on service entrances, utility connections, or anywhere closer to the transformer, look for CAT III 1000V or CAT IV 600V — both are covered in this list.",
  },
  {
    question: "Is a clamp meter a replacement for a standard multimeter?",
    answer:
      "No — a clamp meter measures current without breaking the circuit, which is faster and safer for many field checks, but you'll still want a standard multimeter for resistance, continuity, and low-current diagnostic work.",
  },
];

export default function BestMultimeterForElectriciansPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · For Electricians"
        heading="Best Multimeter for Electricians"
        tagline="Compared honestly — no pay-for-placement."
        description="Panel work demands real CAT III/IV protection, True RMS accuracy, and a meter that survives daily field use. These are the picks from our full comparison that actually hold up on the job."
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
