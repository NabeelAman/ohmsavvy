import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Fluke 117 Review",
  description: "A detailed look at the Fluke 117's True RMS accuracy, CAT III 600V rating, and NCV detection, and who it's actually worth buying for.",
  path: "/multimeters/fluke-117-review",
  image: picks.find((p) => p.name === "Fluke 117")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Fluke 117")!,
  category: "multimeters",
  heading: "Fluke 117 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Electricians and serious hobbyists doing real electrical work",
  imageAlt: "Fluke 117 digital multimeter",
  considerIf: [
    "You work in residential panels and building wiring, where CAT III 600V is the right rating",
    "You want a non-contact voltage detector built into the meter",
    "You want a meter durable enough for daily field use"
  ],
  skipIf: [
    "You only need a meter a few times a year for basic home checks — the premium buys durability casual use won't exercise",
    "You want Bluetooth or app connectivity",
    "You specifically need CAT IV protection — that's what the Fluke 87V is for"
  ],
  tradeOffs: "You pay a premium over mid-range meters like the Klein Tools MM400 for Fluke's well-documented reliability and the built-in NCV detector, not for a higher safety rating or extra resolution.",
  assessment: [
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V covers household panels and fixed building wiring, and True RMS keeps AC readings accurate on non-sinusoidal loads. Auto-ranging keeps operation quick."
    },
    {
      heading: "Non-contact voltage detection",
      body: "The built-in NCV detector gives a fast first check for live voltage before the probes ever touch a circuit, a practical safety habit for anyone working on building wiring."
    },
    {
      heading: "Daily handling and build quality",
      body: "This unit was bought and tested in our lab rather than assessed from its spec sheet alone. In day-to-day handling it behaves exactly like its reputation suggests: solid switch and dial feel, no lag between probing a circuit and seeing a stable reading, and nothing that felt fragile or cheaply assembled. We're not publishing specific accuracy figures or stress-test numbers — our lab testing is still limited in scope — but nothing about handling the 117 directly gave us a reason to doubt the reliability record Fluke is known for."
    }
  ],
  alternatives: [
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "CAT IV 600V / CAT III 1000V and a 19,999-count high-resolution mode for industrial work."
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "The same CAT III 600V and True RMS at a mid-range price, with a low-impedance mode."
    },
    {
      name: "Milwaukee 2235-20",
      href: "/multimeters/milwaukee-2235-20-review",
      reason: "Add a clamp meter if you measure current often."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 117 good for home electrical work?",
      answer: "It's well suited, with CAT III 600V and True RMS. For occasional basic checks, a cheaper meter from our home-use guide may be enough."
    },
    {
      question: "Fluke 117 or Fluke 87V?",
      answer: "The 117 covers residential and light commercial work. The 87V adds CAT IV 600V / CAT III 1000V protection, a 19,999-count high-resolution mode, and an analog bar graph for industrial use."
    },
    {
      question: "Is the Fluke 117 hands-on tested, or based on the spec sheet?",
      answer: "Hands-on tested. Our testing team bought this unit and used it directly rather than relying only on Fluke's published specifications, which is why you'll see a \"Hands-on Tested\" badge on this page. We still don't publish specific lab measurements or bench numbers — our testing program is early and limited in scope — but the assessment above reflects actual use of this meter, not just its datasheet."
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
      label: "Fluke 117 vs Klein Tools MM400",
      href: "/multimeters/fluke-117-vs-klein-mm400"
    },
    {
      label: "Fluke 117 vs Milwaukee 2235-20",
      href: "/multimeters/fluke-117-vs-milwaukee-2235-20"
    },
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians"
    }
  ],
};

export default function Fluke117ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-117-review" />
    </>
  );
}
