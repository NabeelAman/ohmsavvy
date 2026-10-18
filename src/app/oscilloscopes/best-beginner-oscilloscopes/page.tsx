import { CategoryHero } from "@/components/CategoryHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Oscilloscopes for Beginners in 2026",
  description: "Bandwidth, sample rate, and channel count explained simply — an honest comparison of the best beginner-friendly oscilloscopes.",
  path: "/oscilloscopes/best-beginner-oscilloscopes",
});

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Rigol DS1054Z",
    image: "https://valuetronics.com/cdn/shop/files/rigol_ds1054z-new_grande.jpg",
    rating: 4.8,
    bottomLine: "The default beginner oscilloscope recommendation for years, and still worth it.",
    verdict:
      "The DS1054Z has been the default recommendation for beginner oscilloscopes for years, and for good reason — 4 channels and 50MHz of bandwidth (unlockable higher via firmware) at a genuinely approachable price.",
    specs: [
      { label: "Bandwidth", value: "50MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Hobbyists, students, general electronics" },
    ],
    pros: ["4 channels at this price is rare", "Large, clear 7-inch display", "Strong community support and documentation"],
    cons: ["Menu navigation has a learning curve", "Bandwidth is modest for RF work"],
    ctaHref: "https://www.amazon.com/dp/B012938E76?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best Budget",
    name: "FNIRSI DSO152",
    image: "https://e42.psgsm.net/tb.com/p/916295/480/digital-oscilloscope-fnirsi-dso152-2.jpg",
    rating: 4.1,
    bottomLine: "A genuinely pocket-sized scope for quick diagnostics — not a bench replacement.",
    verdict:
      "A genuinely pocket-sized oscilloscope for basic signal checking — not a replacement for a bench scope, but a surprisingly capable tool for quick diagnostics on the go.",
    specs: [
      { label: "Bandwidth", value: "200kHz" },
      { label: "Channels", value: "1" },
      { label: "Sample rate", value: "2.5 MSa/s" },
      { label: "Best for", value: "Basic diagnostics, learning the fundamentals" },
    ],
    pros: ["Extremely affordable entry point", "Genuinely pocket-sized", "Good for learning basic waveform concepts"],
    cons: ["Single channel limits comparison work", "Bandwidth too low for anything beyond basic/audio-range signals"],
    ctaHref: "https://www.amazon.com/dp/B0FKN1S22Y?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Growing Into",
    name: "Siglent SDS1104X-E",
    image: "https://valuetronics.com/cdn/shop/files/siglent_sds1104x-e.jpg",
    rating: 4.7,
    bottomLine: "More bandwidth and a better UI than the Rigol, for projects that will get more demanding.",
    verdict:
      "A step up in bandwidth and sample rate from the Rigol, with a well-regarded user interface. A strong pick for anyone who expects their projects to get more demanding over time.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Intermediate hobbyists, future-proofing" },
    ],
    pros: ["Higher bandwidth headroom than entry-level scopes", "Well-regarded, intuitive UI", "Strong value at the 100MHz tier"],
    cons: ["Pricier than the Rigol DS1054Z", "Overkill for pure beginners"],
    ctaHref: "https://www.amazon.com/dp/B0771N1ZF9?tag=ohmsavvy-20",
  },
  {
    badge: "Best Compact Bench Option",
    name: "Hantek DSO2D10",
    rating: 4.3,
    bottomLine: "An oscilloscope and waveform generator in one unit — practical for space-limited benches.",
    verdict:
      "Combines an oscilloscope and waveform generator in one compact unit — a practical two-in-one for hobbyists who don't have bench space for separate instruments.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Space-limited benches, combined testing" },
    ],
    pros: ["Built-in waveform generator saves bench space", "Solid 100MHz bandwidth for the price", "Compact footprint"],
    cons: ["Only 2 channels vs. 4 on similarly priced scopes", "Smaller display than bench-focused competitors"],
    ctaHref: "https://www.amazon.com/dp/B0D6B7HRMG?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "How much bandwidth do I actually need?",
    answer:
      "For general electronics, Arduino/microcontroller work, and audio circuits, 50-100MHz is plenty. You only need higher bandwidth (200MHz+) for RF work or very high-speed digital signals.",
  },
  {
    question: "Does channel count matter for a beginner?",
    answer:
      "Yes, more than people expect. Even basic debugging often benefits from comparing two signals at once (e.g., clock vs. data line), so we'd recommend at least 2 channels, with 4 giving real long-term flexibility.",
  },
];

export default function BestOscilloscopesPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes"
        heading="Which Oscilloscope Should You Actually Buy?"
        tagline="Compared honestly — no pay-for-placement."
        description="Bandwidth, sample rate, and channel count explained simply, with picks that won't overwhelm a first-time buyer — or leave you needing to upgrade in six months."
        primaryCta={{ label: "Browse All Oscilloscopes", href: "#rigol-ds1054z" }}
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
        howWeChose="We compared bandwidth, channel count, and sample rate against the signals beginners and hobbyists actually measure, from audio-range work to microcontroller debugging."
      />
      <ContentLinks category="oscilloscopes" />
    </>
  );
}
