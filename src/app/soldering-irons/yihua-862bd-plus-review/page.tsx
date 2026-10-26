// YIHUA 862BD+ facts per its Pick in ../best-soldering-irons/page and the official Amazon listing B07RY5XWVG:
//   75 W iron, 500 W hot air, 720 W total, 110-127 V US plug, iron 200-480 °C, hot air 100-480 °C, independent LED readouts,
//   ESD safe per the listing; listing title says °F/°C. YIHUA's own spec sheet lists AC 220 V ±10%, 50 Hz for the model family
//   and makes no ESD claim (conflict stated on the page). Airflow, nozzle set and heat-up time: not stated in our sources.
// Weller WE1010NA per weller-tools.com (WE1010NA 120V, checked 2026-10-26): 85 W station, 70 W WEP 70 iron, 100-450 °C.
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
      heading: "Reading the power figures: 75W, 500W and 720W",
      body: "The listing splits the power three ways: 75W for the soldering iron, 500W for the hot air gun's heater and blower, and 720W for the whole station. The iron figure is comparable with dedicated bench stations; the Weller WE1010NA's iron is rated 70W, for example. The 500W is what lets the gun bring a small area of board up to reflow temperature. The 720W total matters for your outlet: on a 120V circuit it works out to 720 ÷ 120 = 6 A at full demand, which a typical 15 A household circuit handles, but avoid sharing that outlet strip with a space heater or another hot air tool.",
    },
    {
      heading: "What the hot air side is good for",
      body: "Hot air is the tool for parts whose pads sit underneath or on several sides at once: QFN and QFP chips, SOT-23 regulators, shielding cans and connectors with many pins. Heating all the joints together lets the part lift off cleanly instead of being pried pad by pad, which is how pads get torn. It's also how you reflow a suspect joint on a part a tip can't reach. The 100 to 480°C range covers that work with room to spare; as a rough, hedged guide, many leaded-solder jobs reflow with the gun set somewhere in the 300s °C, while lead-free and boards with big copper pours need more heat or more time.",
    },
    {
      heading: "BGA claims, kept in proportion",
      body: "Two-in-one stations like this are often sold for BGA rework as well as SMD, and our roundup files it under SMD/BGA work too. A hand-held hot air gun can reflow or lift small BGA packages, but large ones on thick multilayer boards usually need bottom-side preheating so the whole board warms evenly and doesn't warp. The 862BD+ has no preheater, so treat serious BGA work, such as laptop GPUs or console processors, as a job for a dedicated rework setup.",
    },
    {
      heading: "ESD and voltage: the listing and the spec sheet disagree",
      body: "The US Amazon listing we link to says this unit is ESD safe, with a tip-to-ground resistance under 2 ohms, and that it runs on 110–127V with a US plug. YIHUA's own spec sheet for the model family lists AC 220V and makes no ESD-safety claim, and the official product photo shows no ESD-safe badge, unlike the separate 862BD++ variant. Check the listing you actually order; if maker-confirmed ESD safety is a requirement for your bench, the Weller WE1010NA or Hakko FX-888DX is the safer choice.",
    },
    {
      heading: "What isn't published",
      body: "Several numbers buyers care about don't appear in our sources: airflow, the nozzle sizes in the box, the tip series, heat-up time and any temperature accuracy figure. That's typical of budget rework stations, and it's why we'd check the displayed temperature against a thermocouple before relying on it for heat-sensitive parts such as plastic connectors or LEDs. It also means comparisons with maker-documented stations like the Weller WE1010NA, which publishes ±5°C accuracy, can only go so far.",
    },
    {
      heading: "Using the hot air gun safely",
      body: "A 500W gun reaching 480°C will scorch a bench, melt nearby plastic and burn skin in an instant. Always return the handle to its holder, keep the nozzle pointed away from cables and your other hand, and shield nearby plastic parts with Kapton tape or foil. Let the station run its cool-down before switching off at the wall, and never leave it heating unattended. Work in a ventilated space, because flux fumes rise fast under hot air.",
    },
    {
      heading: "Who should buy it, and who shouldn't",
      body: "Buy it if you repair phones, game controllers, drones or other boards built mostly from surface-mount parts, and you want one box that both solders and removes them. Skip it if your work is through-hole kits, wiring and connectors, or if you need maker-documented ESD safety for a professional bench: a dedicated station such as the Weller WE1010NA or Hakko FX-888DX is the cleaner choice. And if you're outside the US, confirm the voltage of the exact listing before ordering.",
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
    {
      question: "How much power does the YIHUA 862BD+ draw?",
      answer: "The US listing rates the station at 720W in total, split between a 75W soldering iron and a 500W hot air gun. At 120V that's about 6 A at full demand (720 ÷ 120), comfortably within a standard 15 A household circuit, but it's best not to share the outlet with other high-wattage tools or heaters while both sides are running.",
    },
    {
      question: "Can the YIHUA 862BD+ show temperatures in Fahrenheit?",
      answer: "The official Amazon listing describes it as a °F/°C station, so the readouts can be switched between the two scales. The iron is listed at 200 to 480°C and the hot air at 100 to 480°C, which is roughly 390 to 900°F and 210 to 900°F. Check your manual for the exact button sequence to change units.",
    },
    {
      question: "Is the YIHUA 862BD+ good for beginners?",
      answer: "It's usable, but it's more station than most beginners need. If you're learning on through-hole kits, a simple iron is easier and cheaper. The 862BD+ makes sense once you start repairing surface-mount boards, where hot air lets you remove chips and connectors without lifting pads. Practice on scrap boards first, because hot air can blow tiny parts away.",
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
      label: "How to solder fine-pitch SMD components",
      href: "/soldering-irons/how-to-solder-fine-pitch-smd-components",
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
