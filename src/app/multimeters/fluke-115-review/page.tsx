import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Fluke 115 Review",
  description: "A detailed look at the Fluke 115's True RMS accuracy, CAT III 600V rating and field-service focus, and how it stacks up against the Fluke 117.",
  path: "/multimeters/fluke-115-review",
  image: picks.find((p) => p.name === "Fluke 115")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Fluke 115")!,
  category: "multimeters",
  heading: "Fluke 115 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Field technicians and general electrical/electronics work",
  imageAlt: "Fluke 115 digital multimeter",
  considerIf: [
    "You want Fluke's reliability record without paying for electrician-specific extras",
    "You work across general electrical and electronics tasks, not exclusively panel work",
    "You don't need non-contact voltage detection or a low-impedance mode and would rather not pay for them",
  ],
  skipIf: [
    "You specifically want non-contact voltage (NCV) detection built in — that's the Fluke 117",
    "You want the AutoVolt AC/DC auto-selector or a low-impedance (LoZ) mode",
  ],
  tradeOffs: "The 115 and 117 share the same core True RMS accuracy, CAT III 600V rating, and 6,000-count display. The 117 adds NCV detection and AutoVolt/LoZ for electrician-specific work; the 115 is the more general-purpose field meter and typically costs less.",
  assessment: [
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V and True RMS put the 115 on equal footing with the 117 for household panels, fixed building wiring, and general electrical troubleshooting. Auto-ranging and a 6,000-count backlit display keep operation quick and readable.",
    },
    {
      heading: "The same core measurements, without the electrician extras",
      body: "The 115 measures everything the 117 does apart from NCV and AutoVolt: resistance, continuity, diode test, capacitance from 1 nF to 9,999 µF, frequency from 99.99 Hz to 50.00 kHz, 6 A and 10 A current ranges, and Min/Max/Avg with display hold, all on a 6,000-count display with a 33-segment bar graph. What it leaves out is the 117's VoltAlert non-contact detection and AutoVolt with its low-impedance (LoZ) input. If you work on electronics, motors and drives more than live panels, you give up little and typically pay less. Neither meter measures temperature (that's the Fluke 116) or has µA/mA ranges.",
    },
    {
      heading: "Hands-on in our lab",
      body: "Our testing team bought this unit and used it directly rather than relying only on Fluke's published specifications, which is why it carries a \"Hands-on Tested\" badge. We're not publishing specific bench measurements yet — our lab testing program is still early — but direct use didn't turn up anything that contradicts Fluke's reliability record or the 115's positioning as a general field-service meter.",
    },
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "Adds non-contact voltage detection and AutoVolt/LoZ — worth the extra cost if you specifically do electrician-focused panel work.",
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "The same CAT III 600V rating plus temperature measurement, but not True RMS, and Klein has discontinued it.",
    },
    {
      name: "KAIWEETS KM200s",
      href: "/multimeters/kaiweets-km200s-review",
      reason: "A budget True RMS meter if you don't need Fluke's reliability record or CAT III headroom.",
    },
  ],
  faqs: [
    {
      question: "What's the real difference between the Fluke 115 and Fluke 117?",
      answer: "According to Fluke's own comparison, the two are identical for voltage, current, resistance, capacitance, and frequency measurement. The 117 adds non-contact voltage (NCV) detection and an AutoVolt AC/DC auto-selector with a low-impedance (LoZ) mode; the 115 doesn't have either. Fluke markets the 117 specifically to electricians and the 115 as a more general field-service meter.",
    },
    {
      question: "Is the Fluke 115 True RMS?",
      answer: "Yes. Like the 117, it measures True RMS on AC voltage and current, so readings stay accurate on the non-sinusoidal waveforms common with variable-speed drives and modern electronics.",
    },
    {
      question: "Does the Fluke 115 measure capacitance?",
      answer: "Yes — from 1 nF to 9,999 µF, along with frequency from 99.99 Hz to 50.00 kHz and a diode test. The Fluke 117 has exactly the same capacitance and frequency ranges, so this isn't a reason to pick one over the other; the 115's case is getting those measurements without paying for the 117's NCV and AutoVolt/LoZ.",
    },
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters",
  },
  related: [
    {
      label: "Fluke 115 vs Fluke 117",
      href: "/multimeters/fluke-115-vs-fluke-117",
    },
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians",
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide",
    },
  ],
};

export default function Fluke115ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-115-review" />
    </>
  );
}
