import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "KAIWEETS KM200s Review",
  description: "KAIWEETS KM200s review: True RMS, auto-ranging and NCV at under half the Fluke 117's price, and why its CAT II rating keeps it out of service panels.",
  path: "/multimeters/kaiweets-km200s-review",
  image: picks.find((p) => p.name === "KAIWEETS KM200s")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "KAIWEETS KM200s")!,
  category: "multimeters",
  heading: "KAIWEETS KM200s Review",
  productType: "Digital multimeter",
  intendedBuyer: "Beginners and homeowners buying a first meter",
  imageAlt: "KAIWEETS KM200s True RMS digital multimeter",
  considerIf: [
    "You want True RMS and auto-ranging without paying Fluke prices",
    "You'll mostly check batteries, outlets, appliances, and hobby circuits",
    "You often work in dim spaces — the display is backlit",
    "You'd rather pay less upfront and accept CAT II's narrower scope than overbuy for work you won't do"
  ],
  skipIf: [
    "You plan to work inside a breaker panel — the KM200s is rated CAT II 600V, not CAT III",
    "You need a meter built to survive daily job-site use"
  ],
  tradeOffs: "The KM200s gets the measurement fundamentals right and saves money on build quality and safety category. That's a fine trade at the outlet and on the bench, and the wrong one at the service panel.",
  assessment: [
    {
      heading: "Safety rating: the key limitation",
      body: "CAT II 600V covers equipment plugged into outlets: appliances, power tools, and similar loads. Distribution panels and fixed building wiring fall under CAT III, which is why we don't recommend the KM200s for panel work. If that's on your list, the Klein Tools MM400 and Fluke 117 are rated for it."
    },
    {
      heading: "Measurement features",
      body: "For a budget meter the feature set is complete: True RMS for accurate readings on non-sinusoidal AC, smart auto-ranging so you don't select ranges by hand, and non-contact voltage detection for a first check before the probes go on."
    }
  ],
  alternatives: [
    {
      name: "AstroAI DM6000AR",
      href: "/multimeters/astroai-dm6000ar-review",
      reason: "A similar budget tier with 6,000-count resolution and manual ranging, though AstroAI states no CAT rating."
    },
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "True RMS, a 6,000-count display, and CAT III 600V at a budget price."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The step up for real electrical work: CAT III 600V with field-grade durability."
    }
  ],
  faqs: [
    {
      question: "Can I use the KAIWEETS KM200s on a breaker panel?",
      answer: "We don't recommend it. It's rated CAT II 600V, which covers outlet-connected equipment. Breaker panels and building wiring call for at least CAT III. For panel work, look at a CAT III 600V meter such as the Klein Tools MM400 or Fluke 117."
    },
    {
      question: "Is the KAIWEETS KM200s True RMS?",
      answer: "Yes. It measures True RMS, auto-ranges, and includes non-contact voltage detection."
    },
    {
      question: "Does the backlit display make a real difference, or is it just a spec-sheet bullet point?",
      answer: "For the situations it's built for, it's a real convenience. A backlight matters most when you're reading a meter somewhere without good ambient light — behind a cluttered workbench, inside a cabinet, under a car dash, or in a garage with a single overhead bulb. For a meter that's rated for outlets and appliances rather than panel work, those low-light spots come up often enough that the backlight earns its place on the spec sheet rather than just padding it."
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

export default function KaiweetsKm200sReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/kaiweets-km200s-review" />
    </>
  );
}
