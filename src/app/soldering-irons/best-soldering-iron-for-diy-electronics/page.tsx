import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { FlowDiagram } from "@/components/HowTo";
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
  {
    question: "Should I budget for anything beyond the iron itself?",
    answer:
      "Yes — tips, solder, flux, and a stand/sponge are recurring costs worth planning for alongside the iron's own price. A cheap iron with no spare tips available, or one using a nonstandard tip mount, can end up costing more over time than a slightly pricier iron with a wide, affordable tip ecosystem.",
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
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-xl font-semibold mb-3">How a DIY habit typically escalates</h2>
        <p className="text-muted leading-7 mb-5">
          Buying for where your projects are headed, not just where they are today, is worth planning
          for — this is the progression most hobbyists end up following:
        </p>
        <FlowDiagram
          steps={[
            { label: "First LED/kit project", sub: "Simple through-hole, forgiving joints" },
            { label: "Perfboard builds", sub: "More joints, denser layouts" },
            { label: "Microcontroller boards", sub: "Finer pitch, more precision needed" },
            { label: "Occasional SMD rework", sub: "Benefits from a second, specialized tool" },
          ]}
        />
      </section>
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/best-soldering-iron-for-diy-electronics" />
    </>
  );
}
