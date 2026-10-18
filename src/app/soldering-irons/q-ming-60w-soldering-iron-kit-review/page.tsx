import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Q-MING 60W Soldering Iron Kit Review",
  description: "Q-MING 60W soldering iron kit review: a ceramic heater, 5 tips and a stand in one low-cost box. A sensible first kit, with an analog dial that limits precision.",
  path: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
  image: picks.find((p) => p.name === "Q-MING 60W Kit")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Q-MING 60W Kit")!,
  category: "soldering-irons",
  heading: "Q-MING 60W Soldering Iron Kit Review",
  productType: "Soldering iron",
  intendedBuyer: "Beginners and occasional users",
  imageAlt: "Q-MING 60W soldering iron kit",
  considerIf: [
    "You're soldering for the first time and want everything in one box",
    "You solder occasionally: repairs, kits, the odd cable",
    "You want simple dial control with no menus"
  ],
  skipIf: [
    "You need precise, repeatable temperatures — the analog dial is less precise than a digital station",
    "You'll solder often or for long sessions"
  ],
  tradeOffs: "The kit gets a beginner soldering on day one for very little money. The dial control and light-duty build are the reasons to upgrade later.",
  assessment: [
    {
      heading: "What's in the box",
      body: "A 60W iron with a ceramic heating element, five tips, and a stand. Heat-up is about 15 seconds, the same figure as the Hakko FX888D."
    },
    {
      heading: "Temperature control",
      body: "Temperature is set with an adjustable analog dial. It's easy to use but less precise than the digital control on the Hakko and Weller stations: fine for general through-hole work, less suited to jobs that need an exact, repeatable temperature."
    }
  ],
  alternatives: [
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable USB-C iron with a digital OLED display, without a stand in the box."
    },
    {
      name: "Hakko FX888D",
      href: "/soldering-irons/hakko-fx888d-review",
      reason: "The digital bench station to upgrade to once you solder regularly."
    }
  ],
  faqs: [
    {
      question: "What comes in the Q-MING 60W kit?",
      answer: "The 60W iron with a ceramic heating element, plus 5 tips and a stand."
    },
    {
      question: "Is a 60W iron enough for beginners?",
      answer: "For typical beginner work, such as through-hole kits, wire splicing, and small repairs, yes. This one heats up in about 15 seconds."
    }
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons"
  },
  related: [
    {
      label: "Soldering iron buying guide",
      href: "/soldering-irons/soldering-iron-buying-guide"
    }
  ],
};

export default function QMing60wKitReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" />
    </>
  );
}
