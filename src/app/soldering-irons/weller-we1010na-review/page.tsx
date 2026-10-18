import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Weller WE1010NA Review",
  description: "Weller WE1010NA review: a 70W ESD-safe digital soldering station with tight temperature stability. Who it suits, and how it compares with the Hakko FX888D.",
  path: "/soldering-irons/weller-we1010na-review",
  image: picks.find((p) => p.name === "Weller WE1010NA")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Weller WE1010NA")!,
  category: "soldering-irons",
  heading: "Weller WE1010NA Review",
  productType: "Soldering iron",
  intendedBuyer: "Professionals and hobbyists with a dedicated electronics bench",
  imageAlt: "Weller WE1010NA digital soldering station",
  considerIf: [
    "You work on static-sensitive components and want ESD-safe construction",
    "You solder for long sessions and need stable temperature",
    "You have a permanent bench"
  ],
  skipIf: [
    "You need to take your iron on the road — it's a bench-only design",
    "You solder occasionally and want to keep costs down"
  ],
  tradeOffs: "Its strengths are ESD safety and stability, not speed: heat-up is about 20 seconds, against about 15 for the Hakko FX888D.",
  assessment: [
    {
      heading: "ESD safety",
      body: "An ESD-safe design keeps static discharge from the iron away from sensitive parts such as MOSFETs and microcontrollers, a meaningful benefit on a dedicated electronics bench."
    },
    {
      heading: "Power and stability",
      body: "It's a 70W station with digital temperature control and strong temperature stability under sustained use, which is what matters most when working through many joints in a row."
    }
  ],
  alternatives: [
    {
      name: "Hakko FX888D",
      href: "/soldering-irons/hakko-fx888d-review",
      reason: "Also 70W and digital, with faster heat-up and widely available genuine tips."
    },
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable USB-C iron for work away from the bench."
    }
  ],
  faqs: [
    {
      question: "Weller WE1010NA or Hakko FX888D?",
      answer: "Both are 70W digital stations. The FX888D heats faster (about 15 seconds vs. about 20) and has widely available genuine tips, while the WE1010NA adds ESD-safe construction."
    },
    {
      question: "Is the Weller WE1010NA ESD-safe?",
      answer: "Yes. Its ESD-safe design is one of its main selling points for electronics benches."
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

export default function WellerWe1010naReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" />
    </>
  );
}
