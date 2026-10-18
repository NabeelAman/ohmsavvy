import type { Metadata } from "next";
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";

export const metadata: Metadata = {
  title: "Fluke 87V Review",
  description:
    "Fluke 87V review: CAT III 1000V / CAT IV 600V protection, a 19,999-count high-resolution mode, and whether the step up from the Fluke 117 is worth it.",
  alternates: { canonical: "/multimeters/fluke-87v-review" },
};

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Fluke 87V")!,
  category: "multimeters",
  heading: "Fluke 87V Review",
  productType: "Digital multimeter",
  intendedBuyer: "Industrial technicians and professionals who use a meter daily",
  imageAlt: "Fluke 87V industrial digital multimeter",
  considerIf: [
    "Your work requires a CAT IV 600V or CAT III 1000V rating",
    "You need finer readings than a 6,000-count display gives — the 19,999-count high-resolution mode covers that",
    "You watch values that change quickly and want the 32-segment analog bar graph"
  ],
  skipIf: [
    "Your work stops at outlets and residential panels — a CAT III 600V meter like the Fluke 117 covers that for less",
    "You're buying a first meter for occasional home use"
  ],
  tradeOffs: "The 87V is among the most expensive meters in our guide. What the premium buys is safety headroom and resolution. If neither is a requirement of your work, that money is better spent elsewhere.",
  assessment: [
    {
      heading: "Safety rating",
      body: "The 87V's dual rating — CAT III 1000V and CAT IV 600V — is the highest in our multimeter guide, matched only by the Southwire 14070T. CAT IV covers the origin of an installation, such as the service entrance and utility connection, which is where the Fluke 117's CAT III 600V rating stops being enough."
    },
    {
      heading: "Resolution and display",
      body: "The main display is 6,000-count, the same as several budget meters in our guide. The difference is the 19,999-count high-resolution mode, which adds precision where small changes matter, and the 32-segment analog bar graph, which shows a value trending up or down at a glance."
    }
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "CAT III 600V and True RMS for less, plus built-in non-contact voltage detection. Enough for most residential electrical work."
    },
    {
      name: "Southwire 14070T",
      href: "/multimeters/southwire-14070t-review",
      reason: "Matches the 87V's CAT III 1000V / CAT IV 600V rating and adds IP67 water and dust protection."
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "A mid-range price with CAT III 600V, True RMS, and a low-impedance mode."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 87V worth it over the Fluke 117?",
      answer: "Only if your work needs what the 87V adds: CAT IV 600V / CAT III 1000V protection, the 19,999-count high-resolution mode, and the analog bar graph. For residential electrical work, the 117's CAT III 600V rating and True RMS cover the job for less."
    },
    {
      question: "Does the Fluke 87V measure True RMS?",
      answer: "Yes. True RMS keeps AC readings accurate on non-sinusoidal waveforms, such as those produced by variable-speed drives and switching power supplies."
    }
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Fluke 117 vs Fluke 87V",
      href: "/multimeters/fluke-117-vs-fluke-87v"
    },
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

export default function Fluke87VReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" />
    </>
  );
}
