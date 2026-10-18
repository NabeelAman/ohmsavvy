import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "UNI-T UT139C Review",
  description: "UNI-T UT139C review: True RMS, a 6,000-count display, auto and manual ranging and NCV on a budget. Where it matches pricier meters, and where it doesn't.",
  path: "/multimeters/uni-t-ut139c-review",
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "UNI-T UT139C")!,
  category: "multimeters",
  heading: "UNI-T UT139C Review",
  productType: "Digital multimeter",
  intendedBuyer: "Budget-conscious buyers who still want True RMS",
  imageAlt: "UNI-T UT139C True RMS digital multimeter",
  considerIf: [
    "You want True RMS and CAT III 600V without spending much",
    "You like the option to lock a range manually",
    "You want non-contact voltage detection included"
  ],
  skipIf: [
    "Brand reputation and a long service record matter to you",
    "The meter will take heavy job-site punishment"
  ],
  tradeOffs: "The UT139C covers features found on meters a tier or two up. The savings show in build ruggedness and brand recognition.",
  assessment: [
    {
      heading: "Features for the price",
      body: "True RMS, a 6,000-count display, auto and manual ranging, and non-contact voltage detection, with CAT III 600V protection. On paper, that's a feature set comparable to the AstroAI DM6000AR."
    },
    {
      heading: "Build",
      body: "Build quality is adequate rather than rugged. For home and bench use that's fine; for a meter that lives in a work truck, the Klein Tools MM400 or Fluke 117 has a stronger durability reputation."
    }
  ],
  alternatives: [
    {
      name: "AstroAI DM6000AR",
      href: "/multimeters/astroai-dm6000ar-review",
      reason: "Close on paper: True RMS, 6,000-count, auto and manual ranging, CAT III 600V."
    },
    {
      name: "KAIWEETS KM200s",
      href: "/multimeters/kaiweets-km200s-review",
      reason: "Budget True RMS with a backlit display, though rated CAT II only."
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "A step up in durability, with a low-impedance mode."
    }
  ],
  faqs: [
    {
      question: "Is the UNI-T UT139C True RMS?",
      answer: "Yes. It's True RMS, with a 6,000-count display, auto and manual ranging, and non-contact voltage detection."
    },
    {
      question: "UNI-T UT139C or AstroAI DM6000AR?",
      answer: "On paper they're close: both are True RMS, 6,000-count, auto and manual ranging, and CAT III 600V. The UT139C includes non-contact voltage detection, while the DM6000AR is notably compact and lightweight. Compare current prices and pick the form factor you prefer."
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

export default function UniTUt139cReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" />
    </>
  );
}
