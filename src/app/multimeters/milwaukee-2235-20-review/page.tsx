import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Milwaukee 2235-20 Clamp Meter Review",
  description: "Milwaukee 2235-20 clamp meter review: 400A AC, a 1-inch jaw, True RMS and CAT III 600V. When a clamp meter beats a standard multimeter, and when it doesn't.",
  path: "/multimeters/milwaukee-2235-20-review",
  image: picks.find((p) => p.name === "Milwaukee 2235-20")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Milwaukee 2235-20")!,
  category: "multimeters",
  heading: "Milwaukee 2235-20 Clamp Meter Review",
  productType: "Digital multimeter",
  intendedBuyer: "Electricians and technicians who check current draw often",
  imageAlt: "Milwaukee 2235-20 clamp meter",
  considerIf: [
    "You measure current often and don't want to open the circuit to do it",
    "Your conductors fit a 1-inch jaw, as most residential and commercial wiring does",
    "You already use Milwaukee tools"
  ],
  skipIf: [
    "Most of your work is resistance and continuity — you'll still want a standard multimeter",
    "You want something pocket-sized"
  ],
  tradeOffs: "A clamp meter is a specialist. It makes current measurement faster and safer, and it complements a standard multimeter rather than replacing one — budget for both if current checks are a regular part of your work.",
  assessment: [
    {
      heading: "Measuring current without opening the circuit",
      body: "With a standard multimeter, measuring current means breaking the circuit and putting the meter in series. The 2235-20 clamps around a single conductor and reads up to 400A AC, which is quicker and keeps your hands away from exposed connections."
    },
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V and True RMS match what we look for in a good general-purpose meter, so readings on non-sinusoidal loads stay trustworthy."
    },
    {
      heading: "What it won't do",
      body: "The 2235-20 is an AC-only clamp — it's not built to read DC current, so solar arrays, battery systems, or anything running on direct current need a different, typically pricier, DC-capable clamp. It's also not a substitute for a standard meter on resistance or continuity work; those measurements aren't something a clamp meter does at all, by design."
    }
  ],
  alternatives: [
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "A standard CAT III 600V meter for voltage, resistance and continuity work, with temperature and capacitance."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "A standard True RMS meter with built-in non-contact voltage detection."
    }
  ],
  faqs: [
    {
      question: "Can the Milwaukee 2235-20 replace a regular multimeter?",
      answer: "Not for everything. It's built around clamp current measurement. For resistance- and continuity-heavy work, pair it with a standard meter such as the Klein Tools MM400 or Fluke 117."
    },
    {
      question: "What size wire does the Milwaukee 2235-20 fit?",
      answer: "Its jaw opens to 1 inch, which fits most residential and commercial wiring. It reads up to 400A AC."
    },
    {
      question: "Does being part of Milwaukee's tool ecosystem matter for a meter?",
      answer: "Less than it would for a power tool, since the 2235-20 doesn't share batteries or chargers with Milwaukee's cordless lineup — it's a standalone instrument. What carries over is Milwaukee's broader reputation for job-site durability, which matters for a tool that's going to live in a van or tool bag alongside everything else rather than sit on a bench."
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

export default function Milwaukee223520ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/milwaukee-2235-20-review" />
    </>
  );
}
