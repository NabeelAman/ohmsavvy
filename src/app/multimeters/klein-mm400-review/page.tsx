import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Klein Tools MM400 Review",
  description: "Klein Tools MM400 review: an auto-ranging CAT III 600V meter with temperature and capacitance, but not True RMS and now discontinued. Who it still suits.",
  path: "/multimeters/klein-mm400-review",
  image: picks.find((p) => p.name === "Klein Tools MM400")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Klein Tools MM400")!,
  category: "multimeters",
  heading: "Klein Tools MM400 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Tradespeople and homeowners doing their own electrical work",
  imageAlt: "Klein Tools MM400 auto-ranging digital multimeter",
  considerIf: [
    "You need CAT III 600V for panel and building-wiring work but don't want to pay Fluke prices",
    "You want temperature, capacitance and frequency in one auto-ranging meter",
    "You want a brand with an established reputation among tradespeople"
  ],
  skipIf: [
    "You want a meter that fits in a pocket — the MM400 is bulkier",
    "You work on variable-speed drives or electronic loads, where True RMS matters",
    "You want a model that is still in production: Klein has replaced it with the MM420"
  ],
  tradeOffs: "The MM400 shares the Fluke 117's CAT III 600V rating but not its True RMS measurement, low-impedance mode or NCV. Klein's own feature chart reserves True RMS and low impedance for the MM700. It is a capable general-purpose meter for sinusoidal mains work, but it is discontinued, so it only makes sense at a clear discount.",
  assessment: [
    {
      heading: "Measurement range",
      body: "Klein rates it to 600V AC/DC, 10A AC/DC and 40 MΩ, with temperature from 0°F to 1000°F, capacitance to 200 µF and frequency/duty cycle from 1 Hz to 50 kHz on a 4,000-count backlit display. That covers most household electrical and appliance checks."
    },
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V suits household panels and building wiring. It is not True RMS, so on distorted waveforms from variable-speed drives, LED drivers and other electronic loads its AC readings can be off; on ordinary sinusoidal mains it reads correctly."
    }
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The same CAT III 600V rating plus True RMS, a low-impedance mode and built-in non-contact voltage detection, at a premium."
    },
    {
      name: "Milwaukee 2235-20",
      href: "/multimeters/milwaukee-2235-20-review",
      reason: "If most of your checks are current draw, a clamp meter avoids opening the circuit."
    },
    {
      name: "KAIWEETS KM200s",
      href: "/multimeters/kaiweets-km200s-review",
      reason: "Cheaper, but rated CAT II only: fine for outlets, not panels."
    }
  ],
  faqs: [
    {
      question: "Is the Klein MM400 True RMS?",
      answer: "No. Klein's multimeter feature chart lists True RMS only for the MM700 in that range, not the MM300, MM400 or MM600. The MM400 reads ordinary sine-wave mains correctly but can misread distorted waveforms from drives and electronic loads."
    },
    {
      question: "Klein Tools MM400 or Fluke 117?",
      answer: "Both are CAT III 600V and auto-ranging, but only the Fluke 117 is True RMS, and it adds a low-impedance mode and built-in non-contact voltage detection. The MM400 adds temperature measurement the 117 lacks. For electrical work the 117 is the better meter; the MM400 only makes sense at a clear discount, especially now it is discontinued."
    },
    {
      question: "Why does Klein's reputation matter if it isn't a dedicated test-equipment brand?",
      answer: "Klein Tools built its name on hand tools and equipment that tradespeople carry and depend on every day — pliers, strippers, fish tapes — which is a different kind of track record than a meter-specific brand like Fluke, but not a lesser one. It signals that the company understands what durability actually looks like in a tool bag or a work truck, not just on paper. The MM400 benefits from that same design philosophy: it's built to be picked up and used daily, not babied."
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
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    }
  ],
};

export default function KleinMm400ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/klein-mm400-review" />
    </>
  );
}
