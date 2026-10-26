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

// Milwaukee 2235-20: 400A AC, 600V AC/DC, True RMS, CAT III 600V, 1.0 in jaw, backlit black-on-white display,
// LED work light, hold, audible continuity, resistance listed as 400 Ω, 2 × AAA, 5-year warranty, test lead set
// included, per https://www.milwaukeetool.com/products/details/400-a-clamp-meter/2235-20 (spec table).
// The 2235-20NST kit page (same meter plus NIST certificate) says "resistance measurement to 4000 ohms" and a jaw
// that fits up to 350 MCM: https://www.milwaukeetool.com/products/details/400-amp-clamp-meter-kit-nist/2235-20NST
const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Milwaukee 2235-20")!,
  category: "multimeters",
  heading: "Milwaukee 2235-20 Clamp Meter Review",
  productType: "Clamp meter",
  intendedBuyer: "Electricians and technicians who check current draw often",
  imageAlt: "Milwaukee 2235-20 clamp meter",
  considerIf: [
    "You measure current often and don't want to open the circuit to do it",
    "Your conductors fit a 1-inch jaw, as most residential and commercial wiring does",
    "You want one tool that also covers voltage, basic resistance and a continuity beep",
    "You work in dim panels and basements, where the LED work light and backlight help",
    "You already use Milwaukee tools"
  ],
  skipIf: [
    "You need DC amps for solar, battery banks or automotive work — it clamps AC current only",
    "Resistance work is a big part of your day: Milwaukee lists a limited resistance range, so a standard multimeter does it better",
    "You want something pocket-sized"
  ],
  tradeOffs: "A clamp meter is a specialist. It makes AC current measurement faster and safer, and its voltage, resistance and continuity functions cover quick checks, but its limited resistance range and lack of DC amps mean it complements a standard multimeter rather than replacing one. Budget for both if current checks are a regular part of your work.",
  assessment: [
    {
      heading: "Measuring current without opening the circuit",
      body: "With a standard multimeter, measuring current means breaking the circuit and putting the meter in series. The 2235-20 clamps around a single conductor and reads up to 400A AC, which is quicker and keeps your hands away from exposed connections. Clamp one conductor only: around a whole cable, the hot and neutral currents cancel and the display reads close to zero."
    },
    {
      heading: "Jaw size and what fits",
      body: "The jaw opens to 1.0 inch and has a thin profile meant for reaching individual wires in a crowded panel or a bundle. Milwaukee's NIST-kit listing for the same meter says the jaw takes cable up to 350 MCM. That covers branch circuits, most residential service conductors and typical commercial feeders; larger parallel feeders or bus bars need a flexible current probe or a bigger jaw."
    },
    {
      heading: "Safety and accuracy",
      body: "CAT III 600V and True RMS match what we look for in a good general-purpose meter, so readings on non-sinusoidal loads stay trustworthy. That matters on a clamp more than most meters, because the loads you clamp, such as variable-speed HVAC blowers, LED lighting circuits and computer power supplies, draw current that's far from a clean sine wave."
    },
    {
      heading: "Resistance and continuity: yes, but limited",
      body: "Unlike some current-only clamps, the 2235-20 does measure resistance and has an audible continuity test through the included test leads. Milwaukee's own pages disagree on the range: the 2235-20 spec table lists resistance as 400 Ω, while the NIST-kit page says resistance measurement to 4,000 ohms. Either way it's a short range, fine for a fuse, a switch, a heating element or a motor winding, but not for checking high-value resistors, insulation or sensor circuits in the kilohm-to-megohm range."
    },
    {
      heading: "What it won't do",
      body: "The 2235-20 is an AC-only clamp: Milwaukee lists 400A AC and no DC current range, so solar arrays, battery systems, or anything running on direct current need a different, typically pricier, DC-capable clamp. Its voltage functions do read both AC and DC up to 600V. Milwaukee doesn't publish capacitance, frequency, temperature or inrush functions on the product page, so don't buy it expecting HVAC capacitor tests."
    },
    {
      heading: "Job-site details",
      body: "The over-molded body is built for being dropped into a tool bag, the black-on-white display has a backlight, and a built-in LED work light helps in dark panels and crawl spaces. It runs on two AAA batteries (included), comes with a test lead set, and carries Milwaukee's five-year tool warranty, which is longer than many meter makers offer."
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
    },
    {
      name: "Fluke 117 vs Milwaukee 2235-20",
      href: "/multimeters/fluke-117-vs-milwaukee-2235-20",
      reason: "Multimeter or clamp meter: our head-to-head on which to buy first."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "For full-range resistance, capacitance and frequency on industrial gear, alongside the clamp."
    }
  ],
  faqs: [
    {
      question: "Can the Milwaukee 2235-20 replace a regular multimeter?",
      answer: "For many electrical calls, mostly. It reads AC current, AC and DC voltage, resistance and continuity. Milwaukee lists only a short resistance range and no DC amps or capacitance, though, so for electronics, sensor or capacitor work pair it with a standard meter such as the Klein Tools MM400 or Fluke 117."
    },
    {
      question: "Does the Milwaukee 2235-20 measure resistance and continuity?",
      answer: "Yes. Milwaukee lists resistance and an audible continuity test, measured through the included test leads rather than the jaw. Its pages disagree on the top of the resistance range: the spec table says 400 Ω and the NIST-kit page says 4,000 ohms. That's enough for fuses, switches and windings, not for high-value resistors."
    },
    {
      question: "What size wire does the Milwaukee 2235-20 fit?",
      answer: "Its jaw opens to 1 inch, which fits most residential and commercial wiring, and Milwaukee's NIST-kit page says it accepts cable up to 350 MCM. It reads up to 400A AC. Clamp a single conductor, not a cable with hot and neutral together, or the opposing currents cancel and the display reads near zero."
    },
    {
      question: "Can the Milwaukee 2235-20 measure DC current?",
      answer: "No. Milwaukee rates the clamp for 400A AC only, and the pick lists no DC amps. AC-only clamps typically use a current-transformer jaw, which can't sense steady direct current. For car batteries, solar strings or DC motors you need a Hall-effect AC/DC clamp, or a multimeter wired in series for small currents within its fused range."
    },
    {
      question: "Is the Milwaukee 2235-20 True RMS?",
      answer: "Yes, Milwaukee lists True RMS. That's the right choice for clamp work because many loads you'll measure, such as variable-speed motors, electronic ballasts, LED drivers and switching power supplies, draw distorted current. An average-responding clamp can under-read those loads, which can hide an overloaded circuit."
    },
    {
      question: "Does being part of Milwaukee's tool ecosystem matter for a meter?",
      answer: "Less than it would for a power tool, since the 2235-20 runs on two AAA cells and doesn't share batteries or chargers with Milwaukee's cordless lineup. What carries over is the five-year tool warranty and a body built for job-site abuse, which matters for a meter that lives in a van or tool bag."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians"
    },
    {
      label: "Clamp meter buying guide",
      href: "/multimeters/clamp-meter-buying-guide"
    },
    {
      label: "How to measure AC current with a clamp meter",
      href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter"
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
