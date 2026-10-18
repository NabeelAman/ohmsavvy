import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

export const metadata = buildMetadata({
  title: "Hakko FX888D Review",
  description: "A detailed look at the Hakko FX888D's thermal recovery, temperature stability, and tip ecosystem, and who it's actually worth buying for.",
  path: "/soldering-irons/hakko-fx888d-review",
  image: picks.find((p) => p.name === "Hakko FX888D")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Hakko FX888D")!,
  category: "soldering-irons",
  heading: "Hakko FX888D Review",
  productType: "Soldering station",
  intendedBuyer: "Serious hobbyists and repair technicians",
  imageAlt: "Hakko FX888D digital soldering station",
  considerIf: [
    "You solder regularly and want a dedicated bench station",
    "You work on thicker joints or repeated repairs, where fast thermal recovery matters",
    "You want easy access to genuine replacement tips"
  ],
  skipIf: [
    "You need a portable iron — this is a bulkier bench station",
    "ESD-safe construction is a stated requirement — the Weller WE1010NA lists it as a core feature"
  ],
  tradeOffs: "The FX888D's thermal performance depends on buying a genuine unit. Counterfeits exist on third-party marketplaces, so buy from Hakko's authorized sellers or a listing that clearly states it.",
  assessment: [
    {
      heading: "Power and heat-up",
      body: "70W with digital, adjustable temperature control and a heat-up time of about 15 seconds, faster than the Weller WE1010NA's roughly 20."
    },
    {
      heading: "Thermal recovery",
      body: "Fast thermal recovery means the tip returns to temperature quickly after each joint, which matters most on thicker joints and long sessions of repeated repairs."
    }
  ],
  alternatives: [
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "Also 70W and digital, with ESD-safe construction for a professional bench."
    },
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable 65W USB-C iron for work away from the bench."
    },
    {
      name: "Q-MING 60W Kit",
      href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
      reason: "A low-cost starter kit with a stand and 5 tips in the box."
    }
  ],
  faqs: [
    {
      question: "How do I avoid a counterfeit Hakko FX888D?",
      answer: "Buy from Hakko's authorized sellers or a listing that clearly states it. Counterfeit units can look identical but won't match the genuine station's thermal performance."
    },
    {
      question: "Hakko FX888D or Weller WE1010NA?",
      answer: "Both are 70W digital stations. The FX888D heats faster (about 15 seconds vs. about 20) and has widely available genuine tips, while the WE1010NA adds ESD-safe construction."
    }
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons"
  },
  related: [
    {
      label: "Hakko FX888D vs Weller WE1010NA",
      href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na"
    },
    {
      label: "Soldering iron buying guide",
      href: "/soldering-irons/soldering-iron-buying-guide"
    }
  ],
};

export default function HakkoFx888dReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/hakko-fx888d-review" />
    </>
  );
}
