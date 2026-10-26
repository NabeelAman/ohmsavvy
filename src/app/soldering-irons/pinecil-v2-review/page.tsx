import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

// Pinecil V2 per https://pine64.org/documentation/Pinecil/Further_information/Specifications/ (checked 2026-10-26,
// as cited on pinecil-v2-vs-q-ming-60w-kit): 12-24 V, 88 W; USB-C PD 12-20 V 3 A and QC 3.0 12-20 V 3 A; DC5525 barrel
// 12-24 V, minimum 3 A; a 12 V USB-C charger heats slower than a 65 W 20 V/3 A PD charger; tentative 28 V EPR support;
// 155 mm with tip (103 mm without) x 12.8 x 16.2 mm; 28 g with tip; ST-B2 short tip included; Ralim's IronOS firmware;
// 0.69-inch 96 x 16 OLED. The ~12 s heat-up and ~60 W on 20 V PD figures come from the Pinecil V2 Pick.
// Element resistance and 12 V wattage below are derived with P = V^2 / R from the 88 W at 24 V rating and labeled approximate.
// Weller WE1010NA: 85 W station driving a 70 W iron, ~28 s from 50 to 350 C, PH 70 safety rest in the box, per
// https://www.weller-tools.com/us/en/industrial-soldering/products/soldering-stations/we1010na-120v (as cited on weller-we1010na-review). Hakko FX-888DX: 100 W station, 65 W iron (Pick).

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
    "You solder away from a bench: at a desk, on site, or while traveling",
    "You already own a USB-C PD charger or power bank that can supply 20V at 3A",
    "You want fast heat-up in a small tool",
    "You're fine budgeting separately for a stand and a few extra tips to get the portability you want"
  ],
  skipIf: [
    "You want a stand and a wide tip range out of the box",
    "You solder for hours at a dedicated bench — a station like the Hakko FX-888DX suits that better",
    "Your only charger is a low-wattage phone charger: at 12V or 5V the iron is far slower"
  ],
  tradeOffs: "The Pinecil's portability comes at the cost of extras: there's no stand included by default, and full power needs a 24V supply, so factor those add-on costs into the price before comparing it directly against a complete kit.",
  assessment: [
    {
      heading: "Power and heat-up",
      body: "Pine64 rates the V2 at up to 88W from a 24V supply. From a common 20V/3A USB-C PD charger it gets about 60W and heats in about 12 seconds; Weller quotes about 28 seconds from 50°C to 350°C for its WE1010NA station. Delivered power depends on the source, so a low-wattage charger won't supply anything like the full rating."
    },
    {
      heading: "Why the supply voltage decides the power",
      body: "A soldering element is close to a fixed resistance, so its power rises with the square of the voltage (P = V² ÷ R). Working back from 88W at 24V gives roughly 6.5 Ω. At 20V that is about 61W, which matches the ~60W figure from a 20V PD charger; at 12V it falls to roughly 22W, about a quarter of the rated maximum. These are approximate figures worked from Pine64's rating, but they explain why Pine64 notes that a 12V USB-C charger heats the iron more slowly."
    },
    {
      heading: "Three ways to power it",
      body: "Pine64 lists USB-C Power Delivery at 12–20V and 3A, Quick Charge 3.0 at the same voltages, and a DC5525 barrel jack taking 12–24V at a minimum of 3A. The barrel jack is the only way to reach the full 88W today, from a 24V laptop-style brick. Pine64 also mentions tentative support for 28V extended power range USB-C, so treat that as a possible future option rather than something to plan around."
    },
    {
      heading: "Control and portability",
      body: "Temperature is set and shown on a 0.69-inch 96 × 16 OLED display, driven by Ralim's open-source IronOS firmware. The iron is 155 mm long with its tip and weighs about 28 g, and because it runs from any suitable USB-C PD source, a power bank can stand in for a wall outlet."
    },
    {
      heading: "Tips and what the stock tip suits",
      body: "Pine64 ships the V2 with a single tip, the ST-B2 short tip, and the iron takes Pinecil short tips. One tip rarely suits everything: fine-pitch surface-mount parts want a fine point, while heavy connectors, ground planes and thick wire transfer heat far better through a broad chisel. Plan to add those two shapes if your work spans both. Our soldering iron tip types guide explains which shape suits which job."
    },
    {
      heading: "Check which Pinecil the listing shows",
      body: "Pine64's Amazon listing still describes the original Pinecil, rated 65W with a 12–21V barrel jack, rather than the V2. Read the version shown in the listing photos and title before you buy, because the 88W rating and 24V barrel input on this page apply to the V2 only."
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
      reason: "The bench station to pair it with: a 100W station, closed-loop control and Hakko's T18 tips."
    },
    {
      name: "Weller WE1010NA",
      href: "/soldering-irons/weller-we1010na-review",
      reason: "An ESD-safe bench station: an 85W station driving a 70W iron, with a safety rest in the box."
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
      answer: "A USB-C Power Delivery (PD) source, such as a PD charger or power bank, or a DC supply through its barrel jack. Pine64 rates the V2 at up to 88W from 24V; a 20V/3A USB-C PD charger gives about 60W, and lower-wattage sources deliver less power and slower heat-up."
    },
    {
      question: "Does the Pinecil V2 come with a stand?",
      answer: "Not by default. Plan to buy a stand separately so the hot iron has a safe place to rest between joints. A stand with a weighted base and a brass or sponge tip cleaner is worth the small extra cost, and it keeps a 300°C+ tip off your desk, cables and fingers."
    },
    {
      question: "Is the Pinecil V2 actually fast enough to replace a bench station for field repairs?",
      answer: "For the job it's built for, yes. A ~12-second heat-up means little waiting on a repair call, and the OLED temperature control gives station-like precision in a pocket-sized body. It doesn't match a dedicated station like the Hakko FX-888DX on heavy, repeated joints, but for occasional field repairs that gap rarely matters."
    },
    {
      question: "Can I power the Pinecil V2 from a power bank?",
      answer: "Yes, if the power bank supports USB-C Power Delivery at 20V. Pine64 lists PD from 12V to 20V at 3A. A bank that only offers 5V or 12V will heat the iron far more slowly, so check its PD output rating, which is usually printed on the case as 20V⎓3A, 60W or higher."
    },
    {
      question: "Pinecil V2 vs original Pinecil: what changed?",
      answer: "Pine64 rates the V2 at up to 88W at 24V, while its Amazon listing, which still describes the original Pinecil, gives 65W and a 12–21V barrel input. Because that listing hasn't caught up, confirm which model the photos and title show before you buy. Our Pinecil V2 vs TS101 comparison covers how it stacks up against another USB-C iron."
    }
  ],
  roundup: {
    label: "See all soldering iron picks",
    href: "/soldering-irons/best-soldering-irons"
  },
  related: [
    {
      label: "Pinecil V2 vs TS101",
      href: "/soldering-irons/pinecil-v2-vs-ts101-soldering-iron"
    },
    {
      label: "Pinecil V2 vs Q-MING 60W Kit",
      href: "/soldering-irons/pinecil-v2-vs-q-ming-60w-kit"
    },
    {
      label: "Soldering iron tip types",
      href: "/soldering-irons/soldering-iron-tip-types"
    },
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
