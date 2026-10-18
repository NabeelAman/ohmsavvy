import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pinecil V2 Review",
  description: "Pinecil V2 review: a 65W USB-C PD soldering iron that heats in ~12 seconds. Who it suits, what's missing from the box, and how it compares with a bench station.",
  path: "/soldering-irons/pinecil-v2-review",
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Pinecil V2")!,
  category: "soldering-irons",
  heading: "Pinecil V2 Review",
  productType: "Soldering iron",
  intendedBuyer: "Makers who need a portable iron for field repairs",
  imageAlt: "Pinecil V2 portable USB-C soldering iron",
  considerIf: [
    "You solder away from a bench: at a desk, on site, or while travelling",
    "You already own a USB-C PD charger or power bank",
    "You want fast heat-up in a small tool"
  ],
  skipIf: [
    "You want a stand and a wide tip range out of the box",
    "You solder for hours at a dedicated bench — a station like the Hakko FX888D suits that better"
  ],
  tradeOffs: "The Pinecil's portability comes at the cost of extras: there's no stand included by default, and the tip selection is smaller than Hakko's.",
  assessment: [
    {
      heading: "Power and heat-up",
      body: "Running from a USB-C PD source, it's rated up to 65W and heats in about 12 seconds, quicker than the bench stations in our guide (about 15–20 seconds). Delivered power depends on the source: a low-wattage charger won't supply the full 65W."
    },
    {
      heading: "Control and portability",
      body: "Temperature is set and shown on an OLED display. The iron is pocket-sized, and because it runs from any USB-C PD source, a power bank can stand in for a wall outlet."
    }
  ],
  alternatives: [
    {
      name: "Hakko FX888D",
      href: "/soldering-irons/hakko-fx888d-review",
      reason: "The bench station to pair it with, offering fast thermal recovery and widely available tips."
    },
    {
      name: "Q-MING 60W Kit",
      href: "/soldering-irons/q-ming-60w-soldering-iron-kit-review",
      reason: "A complete beginner kit, with a stand and 5 tips in the box."
    }
  ],
  faqs: [
    {
      question: "What power supply does the Pinecil V2 need?",
      answer: "A USB-C Power Delivery (PD) source, such as a PD charger or power bank. It's rated up to 65W; lower-wattage sources deliver less power."
    },
    {
      question: "Does the Pinecil V2 come with a stand?",
      answer: "Not by default. Plan to buy a stand separately so the hot iron has a safe place to rest between joints."
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

export default function PinecilV2ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" />
    </>
  );
}
