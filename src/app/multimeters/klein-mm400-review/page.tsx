import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

// Klein MM400 per https://www.kleintools.com/catalog/multimeters/digital-multimeter-auto-ranging-600v (checked 2026-10-26,
// as cited on fluke-115-vs-klein-mm400): 2 x AAA; 4000-count; 600 V AC/DC; 10 A AC/DC; 40 Mohm; 200 uF; 1 Hz to 50 kHz;
// duty cycle; 0 to 1000 F (-18 to 538 C); CAT III 600V; 1 m drop; 232 g; replacement fuses 10 A and 500 mA;
// "This product is no longer in production", replaced by the MM420. True RMS and LoZ are MM700-only per Klein's features chart.
// Amazon B018EXZO8M: no buy box, "See All Buying Options" third-party offers (per fluke-117-vs-klein-mm400, checked 2026-10-24).
// Fluke 117: True RMS, CAT III 600V, 6,000 counts, LoZ, built-in non-contact voltage per Fluke's 114-117 datasheet (2793260b).

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
    "You want a brand with an established reputation among tradespeople",
    "You find one at a clear discount from a seller you trust, knowing it is discontinued"
  ],
  skipIf: [
    "You want a meter that fits in a pocket — the MM400 is bulkier",
    "You work on variable-speed drives or electronic loads, where True RMS matters",
    "You want a model that is still in production: Klein has replaced it with the MM420",
    "You want a non-contact voltage detector or low-impedance mode built in"
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
    },
    {
      heading: "Why True RMS matters, with numbers",
      body: "An average-responding meter like the MM400 measures the average of the rectified waveform and scales it by 1.11, the ratio that holds for a pure sine. Feed it a square wave and that ratio is wrong: the reading comes out about 11% high. The current drawn by a rectifier-input power supply, a peaky waveform, typically reads low instead, sometimes by a third or more depending on how peaky it is. On a 120 V outlet feeding a resistive heater the MM400 is fine; on the output of a variable-speed drive, treat its AC reading as approximate."
    },
    {
      heading: "What 4,000 counts means in practice",
      body: "A 4,000-count display shows up to 3,999 before it changes range. With the usual 4,000-count range steps (4 V, 40 V, 400 V), 120 V mains reads to 0.1 V, which is all a household check needs. It also means a 4.2 V reading jumps to the next range and loses a digit, so the 6,000-count Fluke 117 holds one more digit of resolution across a band of everyday voltages."
    },
    {
      heading: "Temperature and capacitance as practical extras",
      body: "The thermocouple temperature function covering 0°F to 1000°F lets you check a supply-air register, a pipe or an appliance element without a separate thermometer. The 200 µF capacitance ceiling covers most motor-run capacitors, which are usually in the single to tens of microfarads, but not larger motor-start capacitors that can run into the hundreds. Always discharge a capacitor before measuring it."
    },
    {
      heading: "Build, power and current fusing",
      body: "Klein lists a 1 m (3.3 ft) drop rating, a weight of 232 g and two AAA batteries. Its replacement-parts list includes a 10A fuse and a 500mA fuse, so the current inputs are protected, and a blown fuse is a parts job rather than a dead meter. Use fuses of the exact rating Klein specifies; a lower-rated glass fuse defeats the CAT III rating."
    },
    {
      heading: "Buying a discontinued meter",
      body: "Klein says the MM400 is no longer in production and points buyers to the MM420. Amazon still lists it, but through third-party offers rather than a standard buy box, so check the seller, the condition and the return terms. If the price is close to a current True RMS meter, the newer meter is the better buy."
    }
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The same CAT III 600V rating plus True RMS, a low-impedance mode and built-in non-contact voltage detection, at a premium."
    },
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "True RMS and CAT III 600V without the 117's electrician extras, for general field work."
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
      answer: "No. Klein's multimeter feature chart lists True RMS only for the MM700 in that range, not the MM300, MM400 or MM600. The MM400 reads ordinary sine-wave mains correctly but can misread distorted waveforms from drives, dimmers, LED drivers and other electronic loads, so it is a poor choice for HVAC inverter work."
    },
    {
      question: "Klein Tools MM400 or Fluke 117?",
      answer: "Both are CAT III 600V and auto-ranging, but only the Fluke 117 is True RMS, and it adds a low-impedance mode and built-in non-contact voltage detection. The MM400 adds temperature readings with its included thermocouple. For electrical work the 117 is the better meter; the MM400 only makes sense at a clear discount, especially now it is discontinued."
    },
    {
      question: "Why does Klein's reputation matter if it isn't a dedicated test-equipment brand?",
      answer: "Klein Tools built its name on hand tools that tradespeople carry and depend on daily, such as pliers, strippers and fish tapes. That is a different track record from a meter-specific brand like Fluke, but it shows the company knows what durability means in a tool bag. The MM400's 1 m drop rating reflects that thinking."
    },
    {
      question: "Has the Klein MM400 been discontinued?",
      answer: "Yes. Klein's product page says the MM400 is no longer in production and names the MM420 as its replacement. Amazon still offers it through third-party sellers rather than a standard buy box, so check condition, seller and return terms. A discontinued meter remains safe to use if it is genuine and its fuses and leads are in good order."
    },
    {
      question: "Can the Klein MM400 test HVAC capacitors?",
      answer: "Often, yes. Klein rates its capacitance function to 200 µF, which covers most run capacitors on air-conditioner condensers and furnace blowers. Larger start capacitors can exceed that range. Switch off power, discharge the capacitor safely, and disconnect at least one lead before measuring, or the reading and your safety both suffer."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Fluke 117 vs Klein MM400",
      href: "/multimeters/fluke-117-vs-klein-mm400"
    },
    {
      label: "Fluke 115 vs Klein MM400",
      href: "/multimeters/fluke-115-vs-klein-mm400"
    },
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
