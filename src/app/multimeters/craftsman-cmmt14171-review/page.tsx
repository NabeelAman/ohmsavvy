import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Craftsman CMMT14171 Review",
  description: "Craftsman CMMT14171 review: an automotive multimeter with RPM, dwell and duty-cycle modes, True RMS and CAT III 600V. Who it suits and who should skip it.",
  path: "/multimeters/craftsman-cmmt14171-review",
  image: picks.find((p) => p.name === "Craftsman CMMT14171")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Craftsman CMMT14171")!,
  category: "multimeters",
  heading: "Craftsman CMMT14171 Review",
  productType: "Digital multimeter",
  intendedBuyer: "DIY mechanics diagnosing vehicle electrical systems",
  imageAlt: "Craftsman CMMT14171 automotive multimeter",
  considerIf: [
    "You diagnose engines and need RPM, dwell angle, or duty-cycle readings",
    "You want one garage meter that also handles household checks",
    "You prefer a familiar tool brand",
    "You'd rather own one meter that covers both the garage and the breaker panel than two specialized tools"
  ],
  skipIf: [
    "You never work on vehicles — you'd be paying for functions you won't use",
    "You need CAT IV protection for service-entrance work"
  ],
  tradeOffs: "Its value is in the automotive functions. Without them, it's a capable CAT III 600V True RMS meter, but not one that stands out from cheaper general-purpose picks — so buy this specifically because you need the vehicle diagnostics, not as a generic first meter.",
  assessment: [
    {
      heading: "Automotive functions",
      body: "RPM, dwell angle, and duty cycle are the measurements general-purpose meters usually skip. Duty cycle helps when checking pulse-width-modulated components such as fuel injectors and solenoids, while RPM and dwell apply to ignition systems."
    },
    {
      heading: "General measurement",
      body: "Underneath, it's a True RMS, auto-ranging meter rated CAT III 600V, with auto power-off to save the battery when you forget to switch it off."
    },
    {
      heading: "One meter, two toolboxes",
      body: "The practical appeal here is consolidation: rather than owning a separate automotive code reader or ignition analyzer plus a household multimeter, the CMMT14171 covers both jobs from one case. For a DIYer who splits time between the garage and the breaker panel, that's a real convenience even though it means neither role gets a dedicated, specialized instrument the way a Fluke 117 or a standalone automotive scan tool would."
    }
  ],
  alternatives: [
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "If you don't need automotive modes: True RMS and CAT III 600V for less."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "A field-grade general-purpose meter for household electrical work."
    }
  ],
  faqs: [
    {
      question: "What makes the Craftsman CMMT14171 an automotive multimeter?",
      answer: "It adds RPM, dwell angle, and duty-cycle measurement on top of standard True RMS multimeter functions."
    },
    {
      question: "Can I use the CMMT14171 for household electrical work?",
      answer: "Yes, within its CAT III 600V rating, which covers household panels and building wiring. It isn't rated CAT IV."
    },
    {
      question: "What does duty cycle actually tell you about a car part?",
      answer: "Duty cycle measures the percentage of time a pulse-width-modulated signal spends on versus off, expressed as a percentage. On a fuel injector or an idle air control solenoid, that percentage is how the engine computer controls flow without a fully analog signal — a higher duty cycle generally means the component is being told to do more work. Reading it with the CMMT14171 lets you check whether the computer's command matches what you'd expect for current conditions, which is a diagnostic step a standard multimeter without this function can't perform at all."
    }
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for automotive",
      href: "/multimeters/best-multimeter-for-automotive"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    }
  ],
};

export default function CraftsmanCmmt14171ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/craftsman-cmmt14171-review" />
    </>
  );
}
