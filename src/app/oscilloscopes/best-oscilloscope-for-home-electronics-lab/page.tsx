import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Best Oscilloscope for a Home Electronics Lab",
  description: "4-channel, general-purpose scopes with enough bandwidth and sample rate to cover most home-lab electronics work without overpaying for headroom you won't use.",
  path: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab",
});

const names = guidePicks("/oscilloscopes/best-oscilloscope-for-home-electronics-lab");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "Is a 4-channel scope worth it for a home lab, or is 2 enough?",
    answer:
      "For a home lab specifically, 4 channels pays off more than in a single-focus workspace — you're more likely to be debugging varied projects where comparing multiple signals at once (a clock vs. data line, input vs. output) comes up regularly.",
  },
  {
    question: "Should I buy the higher-bandwidth option now or upgrade later?",
    answer:
      "If your projects are general electronics, microcontrollers, and audio-range work today but you expect to take on more demanding projects over time, buying the bandwidth headroom now avoids a second purchase later. If you're not sure, the lower-bandwidth option still covers the large majority of home-lab work.",
  },
];

export default function BestOscilloscopeForHomeElectronicsLabPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · For a Home Electronics Lab"
        heading="Best Oscilloscope for a Home Electronics Lab"
        tagline="Compared honestly — no pay-for-placement."
        description="A home lab benefits from general-purpose capability over specialization — these 4-channel picks from our full comparison cover the widest range of home-lab electronics work."
        primaryCta={{ label: "See the Full Comparison", href: "/oscilloscopes/best-beginner-oscilloscopes" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" />
    </>
  );
}
