import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "AstroAI DM6000AR Review",
  description: "AstroAI DM6000AR review: True RMS, 6,000-count resolution and CAT III 600V for Arduino, Raspberry Pi and hobby electronics, and where the budget build shows.",
  path: "/multimeters/astroai-dm6000ar-review",
  image: picks.find((p) => p.name === "AstroAI DM6000AR")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "AstroAI DM6000AR")!,
  category: "multimeters",
  heading: "AstroAI DM6000AR Review",
  productType: "Digital multimeter",
  intendedBuyer: "Electronics hobbyists working with microcontrollers",
  imageAlt: "AstroAI DM6000AR True RMS digital multimeter",
  considerIf: [
    "You work on Arduino, Raspberry Pi, or other low-voltage projects",
    "You want True RMS and 6,000-count resolution on a small budget",
    "You want a compact, lightweight meter for the bench"
  ],
  skipIf: [
    "You want high-quality test leads out of the box",
    "You need calibration services or a broad accessory range"
  ],
  tradeOffs: "It's inexpensive enough not to worry about on the bench. The build and included leads reflect that price.",
  assessment: [
    {
      heading: "Resolution for electronics work",
      body: "A 6,000-count display shows more digits than a 2,000- or 4,000-count meter on the same range, which helps when checking resistor values or small voltage drops in low-voltage circuits. Manual ranging lets you lock a range when auto-ranging would keep switching."
    },
    {
      heading: "Safety and accuracy",
      body: "True RMS and a CAT III 600V rating mean it isn't limited to the bench, though its strengths lie in hobby electronics rather than panel work."
    }
  ],
  alternatives: [
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "Close on paper, with non-contact voltage detection included."
    },
    {
      name: "KAIWEETS KM200s",
      href: "/multimeters/kaiweets-km200s-review",
      reason: "A budget True RMS meter with a backlit display, rated CAT II."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The field-grade option once your work moves to building wiring."
    }
  ],
  faqs: [
    {
      question: "Is the AstroAI DM6000AR good for Arduino projects?",
      answer: "It's one of the meters most often recommended for Arduino and Raspberry Pi work, offering True RMS, 6,000-count resolution, and both auto and manual ranging at a low price."
    },
    {
      question: "Does the AstroAI DM6000AR have manual ranging?",
      answer: "Yes. It offers both auto and manual ranging."
    }
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    }
  ],
};

export default function AstroAiDm6000arReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/astroai-dm6000ar-review" />
    </>
  );
}
