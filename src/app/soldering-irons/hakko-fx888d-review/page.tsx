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
    "You want easy access to genuine replacement tips",
    "You'd rather buy the hands-on tested pick in this category than one assessed from its spec sheet alone"
  ],
  skipIf: [
    "You need a portable iron — this is a bulkier bench station",
    "You want a model that's still in production: Hakko has replaced it with the FX-888DX, which uses the same T18 tips"
  ],
  tradeOffs: "The FX888D's thermal performance depends on buying a genuine unit. Counterfeits exist on third-party marketplaces, so buy from Hakko's authorized sellers or a listing that clearly states it.",
  assessment: [
    {
      heading: "Power and ESD safety",
      body: "Hakko rates the station at 70W with a 65W iron and digital, adjustable temperature control, and lists it as ESD safe with a tip-to-ground resistance under 2 ohms. Hakko gives no absolute heat-up time, so we don't quote one."
    },
    {
      heading: "Thermal recovery",
      body: "Fast thermal recovery means the tip returns to temperature quickly after each joint, which matters most on thicker joints and long sessions of repeated repairs."
    },
    {
      heading: "Hands-on in our lab",
      body: "Our testing team bought this unit and tested it in our lab, which is why it carries our \"Hands-on Tested\" badge rather than an assessment from the spec sheet alone. Detailed results from that testing aren't published here yet; when they are, they'll sit in this section with the method we used. Until then, the power, ESD and temperature-control details on this page are verified against Hakko's own published data, and the verdict rests on what they mean for regular electronics and repair work.",
    },
    {
      heading: "The genuine-tip ecosystem",
      body: "A wide range of genuine replacement tip shapes and sizes are available through Hakko's authorized sellers, which matters more than it sounds: a worn or wrong-shaped tip is one of the most common reasons a soldering job goes badly. The flip side is the counterfeiting risk noted above, which makes buying from a trusted source as important as the tip selection itself."
    }
  ],
  alternatives: [
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "Also 70W, digital and ESD safe, and still in production."
    },
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable USB-C iron (about 60W from a 20V USB-C PD charger, up to 88W at 24V) for work away from the bench."
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
      answer: "Both are 70W, digital and ESD safe. The FX888D has widely available genuine T18 tips but is discontinued (replaced by the FX-888DX); the WE1010NA is a current model."
    },
    {
      question: "Is the Hakko FX888D hands-on tested, or based on the spec sheet?",
      answer: "Hands-on tested. Our testing team bought this unit and tested it in our lab, which is why it carries a \"Hands-on Tested\" badge on this page. We haven't published detailed test results here yet, so the power, ESD and temperature-control details above come from Hakko's own published specifications. We'll add our results to this review when they're ready.",
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
