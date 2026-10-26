import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Hakko FX888D vs Weller WE1010NA",
  description:
    "Hakko FX888D vs Weller WE1010NA: both ESD-safe, roughly 70W digital stations. Why Hakko's discontinuation and the tip range now decide which to buy.",
  path: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
});

// Hakko facts per Hakko's FX-888D pages (ESD safe, tip-to-ground under 2 ohms, 70W station / 65W iron, T18 tips,
// discontinued and replaced by the FX-888DX). Weller facts per weller-tools.com (70W, ESD safe, ~28 s from 50 to 350°C).
const comparison: ProductComparisonContent = {
  category: "soldering-irons",
  heading: "Hakko FX888D vs Weller WE1010NA",
  intro:
    "Both are digital, ESD-safe soldering stations of about 70W with strong reputations on electronics benches, so the old \"speed versus ESD\" framing doesn't hold. The practical differences now are availability, since Hakko has discontinued the FX888D in favor of the FX-888DX, and which tip range you want to live with.",
  a: {
    pick: picks.find((p) => p.name === "Hakko FX888D")!,
    reviewHref: "/soldering-irons/hakko-fx888d-review",
    imageAlt: "Hakko FX888D soldering station",
    chooseIf: [
      "You find a genuine unit from an authorized seller at a fair price",
      "You want Hakko's T18 tip range, which its FX-888DX successor also uses",
      "You're a serious hobbyist who wants a proven, simple bench station",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Weller WE1010NA")!,
    reviewHref: "/soldering-irons/weller-we1010na-review",
    imageAlt: "Weller WE1010NA soldering station",
    chooseIf: [
      "You want a station that is still in production, with current support",
      "You're setting up a dedicated professional workbench",
      "You'd rather avoid the counterfeit FX888D units that its popularity has attracted",
    ],
  },
  differences: [
    "Hakko USA lists the FX888D as discontinued and replaced by the FX-888DX; the WE1010NA is a current Weller model.",
    "Both are ESD safe: Hakko lists the FX888D's tip-to-ground resistance under 2 ohms, and Weller lists the WE1010NA as ESD safe.",
    "Power is similar: the FX888D station is rated 70W with a 65W iron; the WE1010NA is a 70W station.",
    "Weller quotes about 28 seconds to heat from 50 to 350°C; Hakko gives no absolute heat-up time for the FX888D, so we don't compare them on speed.",
    "The FX888D uses Hakko's T18 tips, a range its FX-888DX successor shares, so tips you buy now stay useful.",
  ],
  bottomLine:
    "On safety and power these two are close: both are ESD safe and around 70W. Choose the WE1010NA if you want a station that's still in production; choose the FX888D only from an authorized seller, or look at the FX-888DX, which keeps the same T18 tips.",
  faqs: [
    {
      question: "Are the Hakko FX888D and Weller WE1010NA both ESD safe?",
      answer:
        "Yes. Hakko lists the FX888D as ESD safe, with a tip-to-ground resistance under 2 ohms, and Weller lists the WE1010NA as ESD safe. Either is suitable for static-sensitive parts such as modern ICs and microcontrollers.",
    },
    {
      question: "Is the Hakko FX888D discontinued?",
      answer:
        "Yes. Hakko USA lists it as discontinued and names the FX-888DX as its replacement. The FX-888DX uses the same T18 tips, so existing tips carry over if you buy the newer station.",
    },
    {
      question: "How do I avoid buying a counterfeit Hakko FX888D?",
      answer:
        "Because the FX888D is one of the most recommended stations in electronics communities, it's also one of the most counterfeited. Buy only from Hakko's listed authorized sellers or Hakko's own storefront — not an unfamiliar third-party listing at a price that looks too good. A counterfeit may look identical but perform and last noticeably worse.",
    },
    {
      question: "What does \"thermal recovery\" mean, and why does it matter more than heat-up time?",
      answer:
        "Heat-up time is how fast the iron reaches temperature from cold; thermal recovery is how fast it gets back to temperature after the tip loses heat into a joint — which happens on every single solder connection you make. Soldering a thin component lead barely dents the tip's temperature, but soldering to a thick ground plane, a large connector pin, or a heavy gauge wire pulls heat out fast, and a station with poor recovery will leave you waiting between joints or working with a tip that's actually cooler than its display shows. Both of these are digital, temperature-controlled stations meant for that kind of bench work, and recovery matters more day to day than a few seconds of warm-up.",
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
