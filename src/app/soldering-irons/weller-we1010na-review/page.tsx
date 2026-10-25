import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Weller WE1010NA Review",
  description: "Weller WE1010NA review: a 70W ESD-safe digital soldering station that heats in about 28 seconds. Who it suits, and how it compares with the Hakko FX888D.",
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
    "You have a permanent bench",
    "You'd rather pay a bit more upfront than risk a static-discharge failure on a sensitive component"
  ],
  skipIf: [
    "You need to take your iron on the road — it's a bench-only design",
    "You solder occasionally and want to keep costs down"
  ],
  tradeOffs: "Weller quotes about 28 seconds to heat from 50 to 350°C, so it isn't the quickest iron to pick up and use. Its case is a current, ESD-safe bench station from a long-established brand, at a higher price than hobby kits.",
  assessment: [
    {
      heading: "ESD safety",
      body: "An ESD-safe design keeps static discharge from the iron away from sensitive parts such as MOSFETs and microcontrollers, a meaningful benefit on a dedicated electronics bench."
    },
    {
      heading: "Power and stability",
      body: "It's a 70W station with digital temperature control and strong temperature stability under sustained use, which is what matters most when working through many joints in a row."
    },
    {
      heading: "Why ESD safety is a build-wide feature, not an add-on part",
      body: "ESD-safe construction isn't a single component you can bolt onto any iron afterward — it runs through the handle, tip assembly, and grounding path as a design choice from the start. That's why it's worth checking on any station you buy (both this and the Hakko FX888D are listed as ESD safe): a non-ESD-safe iron used carelessly around modern ICs can discharge static through the tip with no visible symptom until the component fails later, sometimes well after the repair is finished and hard to trace back to the cause.",
    },
    {
      heading: "What a 28-second heat-up costs you in practice",
      body: "About half a minute per power-up barely registers if you're setting up once for a long bench session, which is exactly how this station is meant to be used. It matters more for someone who's constantly switching the iron on and off throughout the day; in that pattern a portable iron such as the Pinecil V2 is the better fit."
    }
  ],
  alternatives: [
    {
      name: "Hakko FX-888DX",
      href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx",
      reason: "Hakko's replacement for the discontinued FX888D: a 100W ESD-safe station on the same T18 tips, with five presets."
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
      answer: "Both are 70W, digital and ESD safe. The FX888D has widely available genuine T18 tips but Hakko has discontinued it; the WE1010NA is still in production. Hakko's replacement, the FX-888DX, takes the same T18 tips."
    },
    {
      question: "Is the Weller WE1010NA ESD-safe?",
      answer: "Yes. Its ESD-safe design is one of its main selling points for electronics benches."
    },
    {
      question: "Do I need ESD-safe construction if I'm just doing hobby repairs?",
      answer: "It depends on what you're repairing. Soldering on older through-hole boards or simple wiring carries little static risk. Modern boards packed with ICs and microcontrollers are a different story — a discharge that damages a component often shows no immediate symptom, so you can finish a repair, reassemble everything, and only discover the failure later. If your hobby work regularly touches that kind of modern electronics, ESD-safe construction is a real precaution, not an upsell."
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
      <ContentLinks category="soldering-irons" current="/soldering-irons/weller-we1010na-review" />
    </>
  );
}
