import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Southwire 14070T Review",
  description: "Southwire 14070T TechnicianPRO review: IP67 waterproofing, CAT IV 600V / CAT III 1000V, True RMS and a built-in work light for outdoor and job-site use.",
  path: "/multimeters/southwire-14070t-review",
  image: picks.find((p) => p.name === "Southwire 14070T")?.image,
});

// Southwire 14070T: 11 measuring functions plus max/min/average, True RMS, Low Z, CAT IV 600V / CAT III 1000V,
// UL Listed, IP67, lighted controls and backlit display, LED work light, 17.01 × 6.00 × 8.01 cm, 0.41 kg,
// replacement fuses 10A (73616240) and 800mA (73616340), per
// https://www.southwire.com/tools-equipment/test-measurement/14070t-multimeter-techpro-trms/p/63018240
// Southwire's page doesn't mention a magnetic strap, so the earlier strap claims were removed.
const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Southwire 14070T")!,
  category: "multimeters",
  heading: "Southwire 14070T Review",
  productType: "Digital multimeter",
  intendedBuyer: "Technicians working outdoors or on job sites",
  imageAlt: "Southwire 14070T TechnicianPRO waterproof multimeter",
  considerIf: [
    "Your meter gets rained on, dropped, or covered in dust — it's IP67-rated",
    "You need CAT IV 600V / CAT III 1000V protection",
    "You work in dim crawl spaces, attics and basements, where the backlit display, lighted controls and LED work light help",
    "You chase ghost voltage on long, unloaded runs and want a Low Z mode",
    "You can find a new unit from a reputable seller, since Amazon currently lists it as unavailable"
  ],
  skipIf: [
    "You want a compact meter for a pocket or small tool bag",
    "You want a model you can reliably reorder on Amazon right now: the Fluke 179 is the in-stock alternative we point to",
    "You're outside the US — check your regional listing before buying"
  ],
  tradeOffs: "The 14070T matches the Fluke 87V's safety rating and adds weatherproofing and job-site conveniences. The cost is size: it's bulkier than a standard pocket meter. The other catch right now is supply: Amazon lists it as currently unavailable, so the buttons on this page point to the Fluke 179 instead.",
  assessment: [
    {
      heading: "Durability and IP67",
      body: "IP67 means fully dust-tight and protected against temporary submersion. It's the only IP67-rated meter in our guide, and the built-in LED work light makes it the most job-site-oriented of our picks. In practical terms, IP67 is tested at up to 1 m of water for 30 minutes, so a meter dropped in a flooded trench or left on a wet roof survives, while ordinary meters with open battery doors and jack openings can let water reach the circuit board."
    },
    {
      heading: "Safety and accuracy",
      body: "CAT IV 600V / CAT III 1000V is the same dual rating as the Fluke 87V, the highest in our multimeter guide, and Southwire lists the meter as UL Listed. True RMS and auto-ranging cover the measurement side. CAT IV is the category for the origin of the installation: the service drop, the meter base and outdoor feeders, where fault energy is highest. If your work stops at branch circuits inside a building, CAT III is enough."
    },
    {
      heading: "Low Z for ghost voltage",
      body: "Southwire includes a Low Z function, which places a low input impedance across the leads. On a long unconnected run sharing a conduit with live conductors, capacitive coupling can make a high-impedance meter show tens of volts on a dead wire. Low Z loads that phantom voltage down so it collapses toward zero, while a genuinely live conductor still reads its full voltage. That's the difference between a wasted callback and a correct diagnosis."
    },
    {
      heading: "Functions and readouts",
      body: "Southwire lists 11 measuring functions plus max/min and average recording, which captures the lowest and highest readings while you watch something else, such as a voltage sag when a compressor starts. Lighted controls and a backlit display sit alongside the work light. The current inputs are fused, and Southwire sells replacement 10A and 800mA fuses, which suggests a separate low-current input for milliamp work alongside the 10A one."
    },
    {
      heading: "Size and weight",
      body: "Southwire gives the meter as 17.01 × 6.00 × 8.01 cm (about 6.7 × 2.4 × 3.2 in) and 0.41 kg (0.9 lb). That's chunkier than the pocket meters in our guide and makes it a belt-pouch or tool-bag meter rather than a shirt-pocket one."
    },
    {
      heading: "Who this is overkill for",
      body: "If your meter mostly lives on a bench or in a clean indoor shop, the IP67 rating and rugged job-site features here are capability you're paying for without exercising. This meter earns its design the moment it's dropped, rained on, or buried in sawdust — in a controlled environment, a lighter, cheaper meter does the same measurement job."
    },
    {
      heading: "Availability",
      body: "Amazon currently lists the 14070T as unavailable, so we no longer rank it in our roundup. If you can find a new one from an authorized Southwire seller, everything above still applies. If you'd rather buy today, the Fluke 179 is the closest in-stock match in our guide on safety rating and True RMS, though it doesn't claim the IP67 rating or work light."
    }
  ],
  alternatives: [
    {
      name: "Fluke 179",
      href: "/multimeters/fluke-117-vs-fluke-179",
      reason: "The in-stock pick with the same CAT IV 600V / CAT III 1000V rating, plus temperature, Min/Max-Average and a bar graph."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "The same CAT rating, plus a 19,999-count high-resolution mode and an analog bar graph."
    },
    {
      name: "Milwaukee 2235-20",
      href: "/multimeters/milwaukee-2235-20-review",
      reason: "A clamp meter for quick current checks on site."
    },
    {
      name: "Fluke 87V vs Fluke 179",
      href: "/multimeters/fluke-87v-vs-fluke-179",
      reason: "How the two CAT IV Flukes differ if you're choosing a replacement."
    }
  ],
  faqs: [
    {
      question: "Is the Southwire 14070T waterproof?",
      answer: "Yes. It's IP67-rated: dust-tight and protected against temporary submersion. IP67 test conditions are typically up to 1 m of water for 30 minutes, so rain, splashes and a short drop into a puddle are covered. Dry it off and let the jacks dry before measuring again, and don't take readings with the meter or leads submerged."
    },
    {
      question: "Southwire 14070T or Fluke 87V?",
      answer: "Both carry CAT IV 600V / CAT III 1000V and True RMS. Choose the 14070T if water, dust, and drops are part of your workday. Choose the 87V if you need its 19,999-count high-resolution mode and analog bar graph. Note that Amazon currently lists the 14070T as unavailable, which may settle the choice for you."
    },
    {
      question: "Is the Southwire 14070T still available?",
      answer: "Amazon currently lists it as unavailable, so we've removed it from our ranking and send buy buttons to the Fluke 179. Southwire still shows the product page, and some electrical distributors may carry stock. If you buy elsewhere, check that it's new, sealed and from an authorized seller, since a used unit's IP67 seals may be compromised."
    },
    {
      question: "What does Low Z do on the Southwire 14070T?",
      answer: "Low Z drops the meter's input impedance so stray voltage coupled onto a dead conductor drains away instead of showing as a reading. Without it, a disconnected wire running beside live ones can display a misleading voltage. Use Low Z when checking whether a circuit is truly de-energized, and switch back to normal mode for sensitive electronics."
    },
    {
      question: "What fuses does the Southwire 14070T use?",
      answer: "Southwire lists two replacement fuses for the 14070T: a 10A fuse (part 73616240) and an 800mA fuse (part 73616340), protecting its high- and low-current ranges. Replace a blown fuse only with the exact Southwire part or an equivalent high-breaking-capacity fuse of the same rating, never a glass automotive fuse, because the fuse is part of the meter's CAT protection."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    },
    {
      label: "Fluke 117 vs Fluke 179",
      href: "/multimeters/fluke-117-vs-fluke-179"
    }
  ],
};

export default function Southwire14070TReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/southwire-14070t-review" />
    </>
  );
}
