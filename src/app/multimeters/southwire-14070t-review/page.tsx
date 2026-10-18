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
    "You work in tight or dark spaces, where the magnetic strap and LED work light help"
  ],
  skipIf: [
    "You want a compact meter for a pocket or small tool bag",
    "You're outside the US — check your regional listing before buying"
  ],
  tradeOffs: "The 14070T matches the Fluke 87V's safety rating and adds weatherproofing and job-site conveniences. The cost is size: it's bulkier than a standard pocket meter.",
  assessment: [
    {
      heading: "Durability and IP67",
      body: "IP67 means fully dust-tight and protected against temporary submersion. It's the only IP67-rated meter in our guide, and the magnetic hanging strap, which frees both hands, and the built-in LED work light make it the most job-site-oriented of our picks."
    },
    {
      heading: "Safety and accuracy",
      body: "CAT IV 600V / CAT III 1000V is the same dual rating as the Fluke 87V, the highest in our multimeter guide. True RMS and auto-ranging cover the measurement side."
    }
  ],
  alternatives: [
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "The same CAT rating, plus a 19,999-count high-resolution mode and an analog bar graph."
    },
    {
      name: "Milwaukee 2235-20",
      href: "/multimeters/milwaukee-2235-20-review",
      reason: "A clamp meter for quick current checks on site."
    }
  ],
  faqs: [
    {
      question: "Is the Southwire 14070T waterproof?",
      answer: "Yes. It's IP67-rated: dust-tight and protected against temporary submersion."
    },
    {
      question: "Southwire 14070T or Fluke 87V?",
      answer: "Both carry CAT IV 600V / CAT III 1000V and True RMS. Choose the 14070T if water, dust, and drops are part of your workday. Choose the 87V if you need its 19,999-count high-resolution mode and analog bar graph."
    }
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
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
    }
  ],
};

export default function Southwire14070TReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" />
    </>
  );
}
