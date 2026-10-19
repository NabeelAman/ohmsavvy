import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Fluke 115 Review",
  description: "A detailed look at the Fluke 115's True RMS accuracy, CAT III 600V rating, and compact field-service design, and how it stacks up against the Fluke 117.",
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
    "You'd rather have capacitance and frequency measurement than non-contact voltage detection",
  ],
  skipIf: [
    "You specifically want non-contact voltage (NCV) detection built in — that's the Fluke 117",
    "You want the AutoVolt AC/DC auto-selector or a low-impedance (LoZ) mode",
  ],
  tradeOffs: "The 115 and 117 share the same core True RMS accuracy, CAT III 600V rating, and 6,000-count display. The 117 adds NCV detection and AutoVolt/LoZ for electrician-specific work; the 115 is the more general-purpose field meter at a similar price.",
  assessment: [
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V and True RMS put the 115 on equal footing with the 117 for household panels, fixed building wiring, and general electrical troubleshooting. Auto-ranging and a 6,000-count backlit display keep operation quick and readable.",
    },
    {
      heading: "What it adds over the 117: capacitance and frequency",
      body: "Both meters measure resistance, continuity, and diode test, but the 115's spec sheet explicitly lists capacitance (up to 9,999 µF) and frequency (up to 50 kHz) measurement — useful for electronics and motor/drive diagnostic work beyond pure electrical panels, where the 117's electrician-focused feature set doesn't add as much.",
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
      reason: "Adds non-contact voltage detection and AutoVolt/LoZ — worth the same price if you specifically do electrician-focused panel work.",
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "The same CAT III 600V and True RMS at a mid-range price, with a low-impedance mode.",
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
      answer: "Yes — up to 9,999 µF, along with frequency up to 50 kHz and a diode test. This is one area where the 115's spec sheet is actually more explicit than the 117's about electronics-oriented measurement, even though both share the same core voltage/current/resistance accuracy.",
    },
  ],
  roundup: {
    label: "See the full Top 10 multimeter comparison",
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
