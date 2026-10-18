import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Hakko FX888D vs Weller WE1010NA",
  description:
    "Hakko FX888D vs Weller WE1010NA: both 70W digital stations. How heat-up speed and ESD-safe construction decide which fits your bench.",
  path: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
});

const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Hakko FX888D vs Weller WE1010NA",
  intro:
    "Both are 70W digital soldering stations with strong reputations in electronics communities — the real difference is heat-up speed versus ESD-safe construction, and which one matters more for your bench.",
  a: {
    pick: picks.find((p) => p.name === "Hakko FX888D")!,
    reviewHref: "/soldering-irons/hakko-fx888d-review",
    imageAlt: "Hakko FX888D soldering station",
    chooseIf: [
      "You want the fastest heat-up time of the two (~15 seconds vs ~20)",
      "You want a station with an especially wide third-party tip ecosystem",
      "You're a serious hobbyist rather than running a dedicated professional bench",
      "You're comfortable buying only from Hakko's authorized sellers to avoid counterfeit units",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Weller WE1010NA")!,
    reviewHref: "/soldering-irons/weller-we1010na-review",
    imageAlt: "Weller WE1010NA soldering station",
    chooseIf: [
      "You're working with static-sensitive components regularly and want ESD-safe construction built in",
      "You're setting up a dedicated professional workbench",
      "The slightly longer heat-up time is a non-issue for how you work",
      "You'd rather not deal with the counterfeit-unit risk that comes with the FX888D's popularity",
    ],
  },
  differences: [
    "The FX888D heats up faster: roughly 15 seconds versus the WE1010NA's roughly 20 seconds.",
    "The WE1010NA is ESD-safe by design; the FX888D's temperature control is digital and adjustable but not specifically ESD-rated.",
    "The FX888D has a notably wide genuine-tip ecosystem through Hakko's authorized sellers.",
    "The WE1010NA carries a higher price point, reflecting its professional-bench positioning.",
    "The FX888D's popularity has drawn counterfeit units into the market; the WE1010NA doesn't carry that same risk.",
  ],
  bottomLine:
    "Both stations deliver genuinely stable temperature control at the same 70W power level — this comes down to ESD safety needs and heat-up speed preference more than one being objectively better. If you don't specifically need ESD-safe construction, the FX888D's faster heat-up and wider tip availability make it the slightly easier day-to-day tool.",
  faqs: [
    {
      question: "Do I actually need ESD-safe construction for hobby electronics?",
      answer:
        "If you're working with modern ICs, microcontrollers, or any static-sensitive components, ESD-safe tools reduce a real risk — static discharge through an iron tip can damage a component with no visible symptom until later. If you're mostly doing through-hole work with less sensitive parts, it matters less.",
    },
    {
      question: "Is a 5-second heat-up difference actually noticeable?",
      answer:
        "In practice, yes, for anyone doing frequent short sessions — a station you can pick up and use in 15 seconds feels meaningfully different day-to-day than one that takes 20, even though both are fast compared to older irons.",
    },
    {
      question: "How do I avoid buying a counterfeit Hakko FX888D?",
      answer:
        "Because the FX888D is one of the most recommended stations in electronics communities, it's also one of the most counterfeited. Buy only from Hakko's listed authorized sellers or Hakko's own storefront — not an unfamiliar third-party listing at a price that looks too good. A genuine unit comes with Hakko's documented thermal performance and tip compatibility; a counterfeit may look identical but perform and last noticeably worse. The Weller WE1010NA doesn't carry this same counterfeiting risk.",
    },
    {
      question: "What does \"thermal recovery\" mean, and why does it matter more than heat-up time?",
      answer:
        "Heat-up time is how fast the iron reaches temperature from cold; thermal recovery is how fast it gets back to temperature after the tip loses heat into a joint — which happens on every single solder connection you make. Soldering a thin component lead barely dents the tip's temperature, but soldering to a thick ground plane, a large connector pin, or a heavy gauge wire pulls heat out fast, and a station with poor recovery will leave you waiting between joints or working with a tip that's actually cooler than its display shows. The FX888D is specifically noted for excellent thermal recovery under load, and the WE1010NA for strong temperature stability under sustained use — both are built to handle demanding joints well, which is a bigger practical factor for most real soldering work than the heat-up time difference the chooseIf lists above focus on.",
    },
  ],
  roundup: {
    label: "See the full soldering iron comparison",
    href: "/soldering-irons/best-soldering-irons",
  },
  related: [
    {
      label: "Best soldering iron for circuit board repair",
      href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
    },
    {
      label: "Best soldering iron for beginners",
      href: "/soldering-irons/best-soldering-iron-for-beginners",
    },
  ],
};

export default function HakkoVsWellerPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/hakko-fx888d-vs-weller-we1010na" />
    </>
  );
}
