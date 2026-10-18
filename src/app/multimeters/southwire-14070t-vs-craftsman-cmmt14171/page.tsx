import { ContentLinks } from "@/components/ContentLinks";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Southwire 14070T vs Craftsman CMMT14171",
  description: "Southwire 14070T vs Craftsman CMMT14171: an IP67 job-site meter against an automotive meter with RPM, dwell and duty cycle. Which fits the work you do?",
  path: "/multimeters/southwire-14070t-vs-craftsman-cmmt14171",
});

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Southwire 14070T vs Craftsman CMMT14171",
  intro: "Both are True RMS, auto-ranging meters, but they're built for different jobs. The Southwire is a rugged job-site meter with IP67 protection and a CAT IV 600V / CAT III 1000V rating; the Craftsman adds RPM, dwell, and duty-cycle functions for diagnosing vehicles.",
  a: {
    pick: picks.find((p) => p.name === "Southwire 14070T")!,
    reviewHref: "/multimeters/southwire-14070t-review",
    imageAlt: "Southwire 14070T TechnicianPRO multimeter",
    chooseIf: [
      "You work outdoors or on job sites where water, dust, and drops are a risk",
      "You need CAT IV 600V / CAT III 1000V protection"
    ]
  },
  b: {
    pick: picks.find((p) => p.name === "Craftsman CMMT14171")!,
    reviewHref: "/multimeters/craftsman-cmmt14171-review",
    imageAlt: "Craftsman CMMT14171 automotive multimeter",
    chooseIf: [
      "You diagnose cars and need RPM, dwell angle, or duty-cycle readings",
      "Your electrical work stays within a CAT III 600V rating"
    ]
  },
  differences: [
    "Safety rating: CAT IV 600V / CAT III 1000V on the Southwire vs. CAT III 600V on the Craftsman.",
    "The Southwire is IP67-rated and adds a magnetic hanging strap and an LED work light.",
    "The Craftsman adds RPM, dwell angle, and duty-cycle measurement for automotive diagnostics, plus auto power-off.",
    "Both are True RMS and auto-ranging."
  ],
  bottomLine: "Pick by the work, not the spec sheet. For vehicles, the Craftsman is the one with dedicated RPM, dwell, and duty-cycle modes. For outdoor electrical work, or anything that needs CAT IV protection, the Southwire is the one built for it.",
  faqs: [
    {
      question: "Which meter has the higher safety rating?",
      answer: "The Southwire 14070T, rated CAT IV 600V / CAT III 1000V. The Craftsman CMMT14171 is rated CAT III 600V, which covers household panels and building wiring but not service-entrance work."
    },
    {
      question: "What do RPM, dwell, and duty-cycle modes do?",
      answer: "They're automotive diagnostic measurements. RPM and dwell apply to ignition systems, while duty cycle helps check pulse-width-modulated parts such as fuel injectors and solenoids. The Craftsman CMMT14171 has all three built in."
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
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians"
    }
  ],
};

export default function Southwire14070TVsCraftsmanCmmt14171Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" />
    </>
  );
}
