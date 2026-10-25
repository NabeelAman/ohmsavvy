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
    "You need ESD safety confirmed by the maker: the US listing says ESD safe, but YIHUA's own spec sheet makes no ESD claim",
    "You're buying outside the US and can't confirm your listing's voltage: YIHUA's spec sheet lists 220V for the model family",
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
      heading: "ESD and voltage: the listing and the spec sheet disagree",
      body: "The US Amazon listing we link to says this unit is ESD safe, with a tip-to-ground resistance under 2 ohms, and that it runs on 110–127V with a US plug. YIHUA's own spec sheet for the model family lists AC 220V and makes no ESD-safety claim, and the official product photo shows no ESD-safe badge, unlike the separate 862BD++ variant. Check the listing you actually order; if maker-confirmed ESD safety is a requirement for your bench, the Weller WE1010NA or Hakko FX-888DX is the safer choice.",
    },
  ],
  alternatives: [
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "A dedicated, ESD-safe soldering station if you don't need hot air rework.",
    },
    {
      name: "Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
      reason: "ESD safe, 100W and built on Hakko's T18 tip range for general soldering work; it replaces the discontinued FX888D.",
    },
  ],
  faqs: [
    {
      question: "What voltage does the YIHUA 862BD+ run on?",
      answer: "The US Amazon listing we link to states it runs on 110–127V with a US-standard plug. YIHUA's own spec sheet for the model family lists AC 220V ±10%, 50Hz, so check the voltage stated on the exact listing you order — especially outside the US. Running a unit on the wrong supply can mean it doesn't work correctly, or worse.",
    },
    {
      question: "Is the YIHUA 862BD+ ESD-safe?",
      answer: "The sources disagree. The US Amazon listing says it is ESD safe, with a tip-to-ground resistance under 2 ohms, but YIHUA's own spec sheet makes no ESD claim for this variant and the official product photo shows no ESD-safe badge, unlike the 862BD++. Treat ESD safety as unconfirmed by the maker.",
    },
    {
      question: "Do I need the hot air side if I only do through-hole soldering?",
      answer: "No, and if that's genuinely all you do, a dedicated iron like the Hakko FX-888DX or Weller WE1010NA is the simpler, more focused purchase. The 862BD+'s value is specifically for buyers who need SMD/BGA rework capability in addition to standard soldering.",
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
