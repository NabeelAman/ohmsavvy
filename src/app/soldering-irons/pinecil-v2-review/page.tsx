import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pinecil V2 Review",
  description: "Pinecil V2 review: a USB-C PD soldering iron rated to 88W at 24V that heats in ~12 seconds. Who it suits, what's missing, and how it compares with a station.",
  path: "/soldering-irons/pinecil-v2-review",
  image: picks.find((p) => p.name === "Pinecil V2")?.image,
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
    "You want fast heat-up in a small tool",
    "You're fine budgeting separately for a stand and a few extra tips to get the portability you want"
  ],
  skipIf: [
    "You want a stand and a wide tip range out of the box",
    "You solder for hours at a dedicated bench — a station like the Hakko FX-888DX suits that better"
  ],
  tradeOffs: "The Pinecil's portability comes at the cost of extras: there's no stand included by default, and full power needs a 24V supply, so factor those add-on costs into the price before comparing it directly against a complete kit.",
  assessment: [
    {
      heading: "Power and heat-up",
      body: "Running from a USB-C PD source, it's rated up to 65W and heats in about 12 seconds, quicker than the bench stations in our guide (about 15–20 seconds). Delivered power depends on the source: a low-wattage charger won't supply the full 65W."
    },
    {
      heading: "Control and portability",
      body: "Temperature is set and shown on an OLED display. The iron is pocket-sized, and because it runs from any USB-C PD source, a power bank can stand in for a wall outlet."
    },
    {
      heading: "Why no stand changes how you use it",
      body: "Skipping a stand is a real trade-off, not just a missing accessory. A hot iron needs somewhere safe to rest between joints, and without a dedicated stand you're improvising — propping it against something, or being extra deliberate about where you set it down. Budgeting for a basic stand as part of the purchase, rather than an optional extra, is the practical way to use this iron safely from day one."
    }
  ],
  alternatives: [
    {
      name: "Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
      reason: "The bench station to pair it with: 100W, closed-loop control and Hakko's T18 tips."
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
      answer: "A USB-C Power Delivery (PD) source, such as a PD charger or power bank, or a DC supply. Pine64 rates the V2 at up to 88W from 24V; a 20V/3A USB-C PD charger gives about 60W, and lower-wattage sources deliver less power."
    },
    {
      question: "Does the Pinecil V2 come with a stand?",
      answer: "Not by default. Plan to buy a stand separately so the hot iron has a safe place to rest between joints."
    },
    {
      question: "Is the Pinecil V2 actually fast enough to replace a bench station for field repairs?",
      answer: "For the job it's built for, yes. A ~12-second heat-up means you're not waiting around on a repair call or at a workbench away from home, and the OLED temperature control gives you the same kind of precision a bench station offers, just in a pocket-sized body. What it doesn't replace is the fast thermal recovery of a dedicated station like the Hakko FX888D on demanding, repeated joints — for occasional field repairs and portable use, that gap rarely matters."
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
      <ContentLinks category="soldering-irons" current="/soldering-irons/pinecil-v2-review" />
    </>
  );
}
