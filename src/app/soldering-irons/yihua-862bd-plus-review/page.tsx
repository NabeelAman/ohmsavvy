import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

export const metadata = buildMetadata({
  title: "YIHUA 862BD+ Review",
  description: "A detailed look at the YIHUA 862BD+'s 2-in-1 soldering iron and hot air rework station, its real limitations, and who it's actually worth buying for.",
  path: "/soldering-irons/yihua-862bd-plus-review",
  image: picks.find((p) => p.name === "YIHUA 862BD+")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "YIHUA 862BD+")!,
  category: "soldering-irons",
  heading: "YIHUA 862BD+ Review",
  productType: "2-in-1 soldering iron and hot air rework station",
  intendedBuyer: "Hobbyists and repair techs doing SMD/BGA rework alongside general soldering",
  imageAlt: "YIHUA 862BD+ soldering iron and hot air rework station",
  considerIf: [
    "You need hot air rework (reflowing SMD parts, removing surface-mount components) in addition to a standard iron",
    "You want both tools in one box instead of buying a separate hot air station",
    "You're comfortable confirming voltage compatibility before buying",
  ],
  skipIf: [
    "You only solder through-hole components and will never touch SMD/BGA rework",
    "You specifically need ESD-safe construction — this variant doesn't have it",
    "You're outside a 220V mains region and can't confirm this unit handles your voltage",
  ],
  tradeOffs: "The 862BD+ isn't competing with dedicated single-function irons like the Weller WE1010NA on precision or build certification — its value is doing two jobs (soldering and hot air rework) in one purchase, for buyers who genuinely need both.",
  assessment: [
    {
      heading: "What the 2-in-1 design actually buys you",
      body: "A soldering iron alone can't reflow or remove surface-mount components — that needs controlled hot air. Buying the 862BD+ instead of a standalone iron plus a separate hot air station saves bench space and a second purchase, provided you'll actually use the hot air side. If your work is purely through-hole soldering, that half of the unit goes unused and a dedicated iron is the simpler buy.",
    },
    {
      heading: "Temperature range",
      body: "Per the manufacturer's spec sheet, the iron runs 200–480°C and the hot air gun 100–480°C, independently adjustable with their own LED readouts — a wide enough range to cover leaded and lead-free solder plus SMD rework temperatures. As with any budget digital display, it's worth confirming the readout against a separate thermometer on a unit this price before trusting it for a temperature-sensitive job, rather than assuming the display is lab-calibrated out of the box.",
    },
    {
      heading: "What this unit doesn't have",
      body: "The manufacturer's own spec sheet makes no ESD-safety claim for this specific variant, and the unit we visually confirmed against the official product photos shows no ESD-safe badge on its panel — unlike the separate 862BD++ variant, which does carry one. If ESD-safe construction is a requirement for your bench, this isn't the unit, and the Weller WE1010NA is the verified ESD-safe option in our lineup.",
    },
  ],
  alternatives: [
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "A dedicated, ESD-safe soldering station if you don't need hot air rework.",
    },
    {
      name: "Hakko FX888D",
      href: "/soldering-irons/hakko-fx888d-review",
      reason: "Faster heat-up and a wide genuine-tip ecosystem for general soldering work.",
    },
  ],
  faqs: [
    {
      question: "What voltage does the YIHUA 862BD+ run on?",
      answer: "The manufacturer's official spec sheet lists AC 220V ±10%, 50Hz. If you're buying for a 120V/60Hz region, confirm with the seller that the specific listing you're ordering is converted or rated for your mains voltage before buying — using a 220V-rated unit on the wrong supply can mean it simply doesn't work correctly, or worse.",
    },
    {
      question: "Is the YIHUA 862BD+ ESD-safe?",
      answer: "No — the manufacturer's spec sheet doesn't list ESD-safety for this variant, and the official product photo of this specific model shows no ESD-safe badge. A separate variant in the same family, the 862BD++, does carry that badge, so don't assume ESD-safety carries across every model with a similar name.",
    },
    {
      question: "Do I need the hot air side if I only do through-hole soldering?",
      answer: "No, and if that's genuinely all you do, a dedicated iron like the Hakko FX888D or Weller WE1010NA is the simpler, more focused purchase. The 862BD+'s value is specifically for buyers who need SMD/BGA rework capability in addition to standard soldering.",
    },
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons",
  },
  related: [
    {
      label: "Weller WE1010NA vs YIHUA 862BD+",
      href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus",
    },
    {
      label: "Soldering iron buying guide",
      href: "/soldering-irons/soldering-iron-buying-guide",
    },
  ],
};

export default function Yihua862bdPlusReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/yihua-862bd-plus-review" />
    </>
  );
}
