// Weller WE1010NA specs per https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v
//   (checked 2026-10-26: 85 W station, 70 W WEP 70 iron, 100-450 °C / 200-850 °F, 28 s from 50 to 350 °C, accuracy ±5 °C,
//   stability ±6 °C, ESD safe, ET tips, standby mode and auto setback, password-protected settings, 1.40 kg,
//   150 × 120 × 98 mm, power unit + WEP 70 iron + PH 70 safety rest in the box; warranty not listed on that page).
// Correction 2026-10-26: this page previously called the WE1010NA a 70W station; Weller rates the station 85W and the iron 70W.
// Comparison figures for the Hakko FX-888DX and Pinecil V2 come from their Picks in ../best-soldering-irons/page.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Weller WE1010NA Review",
  description: "Weller WE1010NA review: an 85W ESD-safe digital station with a 70W iron and a 28-second heat-up. Who it suits, and how it compares with the Hakko FX-888DX.",
  path: "/soldering-irons/weller-we1010na-review",
  image: picks.find((p) => p.name === "Weller WE1010NA")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Weller WE1010NA")!,
  category: "soldering-irons",
  heading: "Weller WE1010NA Review",
  productType: "Soldering station",
  intendedBuyer: "Professionals and hobbyists with a dedicated electronics bench",
  imageAlt: "Weller WE1010NA digital soldering station with WEP 70 iron and safety rest",
  considerIf: [
    "You work on static-sensitive components and want ESD-safe construction",
    "You solder for long sessions and want published accuracy and stability figures rather than vague claims",
    "You have a permanent bench and like an iron that drops into standby by itself when you set it down",
    "You share the bench with others and want to password-lock the temperature settings",
  ],
  skipIf: [
    "You need to take your iron on the road: it's a 1.4 kg bench station that runs from a 120V outlet",
    "You solder occasionally and want to keep costs down",
    "You already own a drawer of Hakko T18 tips: the WE1010NA uses Weller's ET series, so they won't carry over",
  ],
  tradeOffs: "Weller quotes about 28 seconds to heat from 50 to 350°C, so it isn't the quickest iron to pick up and use, and its 450°C ceiling is lower than some rivals. In return you get a current, ESD-safe bench station from a long-established brand with documented accuracy, standby and a settings lock, at a higher price than hobby kits.",
  assessment: [
    {
      heading: "85W station, 70W iron: what the two numbers mean",
      body: "Weller rates the power unit at 85W and the WEP 70 handpiece at 70W, and listings often quote only the iron figure, which is why you'll see this station described as 70W. The number that heats the tip is the iron's 70W. That's in the same class as the 65W irons on Hakko's FX-888D and FX-888DX and a little under the 75W iron in the YIHUA 862BD+, so the WE1010NA isn't underpowered for through-hole and general board work. Very heavy joints, such as thick ground planes or large battery tabs, are where a bigger tip matters more than a few extra watts.",
    },
    {
      heading: "Temperature range and accuracy",
      body: "The dial covers 100 to 450°C (200 to 850°F). Leaded solder is usually worked somewhere around 300 to 350°C and lead-free a little higher, so the useful band sits comfortably inside that range with room for heavier joints. Weller publishes an accuracy of ±5°C and a stability of ±6°C. Those figures are useful because many budget irons publish nothing at all; they tell you the readout and the tip should stay within a few degrees of each other, which is what keeps joints repeatable from the first board to the fiftieth.",
    },
    {
      heading: "ESD safety",
      body: "Weller lists the station as ESD safe, which keeps static discharge from the iron away from sensitive parts such as MOSFETs and microcontrollers. That's a meaningful benefit on a dedicated electronics bench, especially if you pair it with a grounded mat and wrist strap.",
    },
    {
      heading: "Why ESD safety is a build-wide feature, not an add-on part",
      body: "ESD-safe construction isn't a single component you can bolt onto any iron afterward. It runs through the handle, tip assembly, and grounding path as a design choice from the start. That's why it's worth checking on any station you buy (both this and the Hakko FX-888DX are listed as ESD safe): a non-ESD-safe iron used carelessly around modern ICs can discharge static through the tip with no visible symptom until the component fails later, sometimes well after the repair is finished and hard to trace back to the cause.",
    },
    {
      heading: "Standby, auto setback and the settings lock",
      body: "Two features separate this station from cheaper digital irons. Standby with auto setback lowers the tip temperature when the iron sits idle, which Weller says conserves energy and protects the equipment; in practice an idling tip oxidizes more slowly at a lower temperature, so tips tend to last longer. The password lock stops anyone else at a shared bench, or a student in a classroom, from cranking the set point up and cooking a tip. Weller's page doesn't give the setback temperature or delay, so we don't quote one.",
    },
    {
      heading: "What a 28-second heat-up costs you in practice",
      body: "About half a minute per power-up barely registers if you're setting up once for a long bench session, which is exactly how this station is meant to be used. It matters more for someone who's constantly switching the iron on and off throughout the day; in that pattern a portable iron such as the Pinecil V2, which heats in about 12 seconds on a 20V or higher supply, is the better fit.",
    },
    {
      heading: "Size, tips and what's in the box",
      body: "Weller lists the power unit at 150 × 120 × 98 mm and 1.40 kg, and the box contains the power unit, the WEP 70 iron and a PH 70 safety rest, so you have a holder from day one. The iron takes Weller's ET tips and the page notes a toolless tip change. The ET range is Weller's own, so budget for its tips rather than assuming parts from another brand will fit. Weller's product page doesn't list the warranty term; check it with the seller before you buy.",
    },
    {
      heading: "Limitations to weigh",
      body: "It's bench only, and the 450°C ceiling is below the Hakko FX-888DX's 480°C if you regularly fight very heavy joints. There's no hot air, so surface-mount removal needs a separate tool or a 2-in-1 like the YIHUA 862BD+. Weller doesn't publish a recovery-time figure, so claims about how fast the tip bounces back after a big joint can't be checked against a maker number. We haven't bench-tested this unit; the assessment above is desk research against Weller's own specifications.",
    },
  ],
  alternatives: [
    {
      name: "Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
      reason: "Hakko's replacement for the discontinued FX888D: a 100W ESD-safe station with a 65W iron on T18 tips, 50–480°C and five presets.",
    },
    {
      name: "YIHUA 862BD+",
      href: "/soldering-irons/weller-we1010na-vs-yihua-862bd-plus",
      reason: "Adds a 500W hot air gun beside a 75W iron, for buyers who also need to remove or reflow surface-mount parts.",
    },
    {
      name: "Pinecil V2",
      href: "/soldering-irons/pinecil-v2-review",
      reason: "A portable USB-C iron for work away from the bench.",
    },
  ],
  faqs: [
    {
      question: "Weller WE1010NA or Hakko FX888D?",
      answer: "Both are digital and ESD safe with irons in the same class: the FX888D station is rated 70W with a 65W iron, the WE1010NA station 85W with a 70W iron. Hakko has discontinued the FX888D and Amazon lists it as unavailable, while the WE1010NA is still in production. Hakko's replacement, the FX-888DX, takes the same T18 tips.",
    },
    {
      question: "Is the Weller WE1010NA ESD-safe?",
      answer: "Yes. Weller lists the WE1010NA as ESD safe, which is one of its main selling points for electronics benches. For full protection, use it with a grounded mat and a wrist strap, because the iron alone can't stop static you carry on your body from reaching a sensitive part.",
    },
    {
      question: "Do I need ESD-safe construction if I'm just doing hobby repairs?",
      answer: "It depends on what you're repairing. Soldering on older through-hole boards or simple wiring carries little static risk. Modern boards packed with ICs and microcontrollers are a different story: a discharge that damages a component often shows no immediate symptom, so you can finish a repair, reassemble everything, and only discover the failure later.",
    },
    {
      question: "What tips does the Weller WE1010NA use?",
      answer: "It uses Weller's ET tip series on the WEP 70 iron, with a toolless tip change according to Weller. Hakko T18 tips and generic tips made for other handpieces won't fit. A general-purpose chisel or screwdriver tip covers most through-hole work, with a fine conical tip for small surface-mount pads.",
    },
    {
      question: "How hot does the Weller WE1010NA get?",
      answer: "Weller specifies a range of 100 to 450°C, or 200 to 850°F. That covers leaded and lead-free solder with margin to spare. If you regularly solder very heavy cable lugs or thick copper, a station with a higher ceiling or a larger tip may suit you better than simply turning this one up to its maximum.",
    },
    {
      question: "Does the Weller WE1010NA have a sleep or standby mode?",
      answer: "Yes. Weller lists a standby mode with auto setback, which lowers the tip temperature when the iron isn't being used to save energy and protect the equipment. Weller's page doesn't publish the setback temperature or the delay before it kicks in, so check the manual if you need those exact values.",
    },
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons",
  },
  related: [
    {
      label: "Hakko FX888D vs Weller WE1010NA",
      href: "/soldering-irons/hakko-fx888d-vs-weller-we1010na",
    },
    {
      label: "Weller WE1010 vs Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
    },
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

export default function WellerWe1010naReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="soldering-irons" current="/soldering-irons/weller-we1010na-review" />
    </>
  );
}
