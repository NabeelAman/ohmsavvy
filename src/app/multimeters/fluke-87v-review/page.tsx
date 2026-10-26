// Fluke 87V specs per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (spec tab, checked
// 2026-10-26): 6,000 counts (4/s), 19,999-count high-resolution mode; 32-segment bar graph at 40/s; CAT III 1000V /
// CAT IV 600V; DC V ±(0.05% + 1) to 1000 V, 10 µV max resolution; AC V True RMS ±(0.7% + 2), low-pass filter (3 dB at
// 1 kHz) for drive measurements; DC A 10 A (20 A for 30 s) ±(0.2% + 2), 0.01 µA resolution; 50 MΩ ±(0.2% + 1);
// 9,999 µF; 200 kHz ±(0.005% + 1); duty cycle to 99.9%; temperature -200 to 1090 °C excluding probe (80BK probe in the
// box, rated -40 to 260 °C); Peak Capture 250 µs; 355 g (624 g in holster); about 400 h battery; lifetime warranty.
// No LoZ or non-contact voltage detection is listed for the 87V.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Fluke 87V Review",
  description: "Fluke 87V review: CAT III 1000V / CAT IV 600V protection, a 19,999-count high-resolution mode, and whether the step up from the Fluke 117 is worth it.",
  path: "/multimeters/fluke-87v-review",
  image: picks.find((p) => p.name === "Fluke 87V")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Fluke 87V")!,
  category: "multimeters",
  heading: "Fluke 87V Review",
  productType: "Digital multimeter",
  intendedBuyer: "Industrial technicians and professionals who use a meter daily",
  imageAlt: "Fluke 87V industrial digital multimeter",
  considerIf: [
    "Your work requires a CAT IV 600V or CAT III 1000V rating",
    "You need finer readings than a 6,000-count display gives — the 19,999-count high-resolution mode covers that",
    "You watch values that change quickly and want the 32-segment analog bar graph",
    "You troubleshoot variable-frequency drives and need the low-pass filter to read the motor-side voltage",
    "You measure flame-sensor or sensor-loop currents where 0.01 µA DC resolution matters"
  ],
  skipIf: [
    "Your work stops at outlets and residential panels — a CAT III 600V meter like the Fluke 117 covers that for less",
    "You're buying a first meter for occasional home use",
    "You rely on a built-in non-contact detector or LoZ ghost-voltage mode; Fluke lists neither on the 87V"
  ],
  tradeOffs: "The 87V is among the most expensive meters in our guide. What the premium buys is safety headroom, resolution and a lifetime warranty. If neither the CAT IV rating nor the precision is a requirement of your work, that money is better spent elsewhere, and the cheaper 117 actually has two electrician features the 87V lacks.",
  assessment: [
    {
      heading: "Safety rating",
      body: "The 87V's dual rating — CAT III 1000V and CAT IV 600V — is the highest in our multimeter guide, matched only by the Fluke 179. CAT IV covers the origin of an installation, such as the service entrance and utility connection, which is where the Fluke 117's CAT III 600V rating stops being enough. The 1000V side matters for a different crowd: 480 V three-phase plant, DC bus voltages inside drives, and string-level solar work all sit closer to the old 600V ceiling than most people expect."
    },
    {
      heading: "Resolution and display",
      body: "The main display is 6,000-count, the same as several budget meters in our guide. The difference is the 19,999-count high-resolution mode, which adds precision where small changes matter, and the 32-segment analog bar graph, which updates 40 times a second and shows a value trending up or down at a glance, faster than the digits refresh."
    },
    {
      heading: "Accuracy in numbers",
      body: "Fluke specifies DC volts at ±(0.05% + 1 count), ten times tighter in its percentage term than the 117's ±(0.5% + 2). Worked from the spec: a 24.00 V control-circuit reading on the 87V can be off by about 0.012 V plus 0.01 V, roughly ±0.02 V, against roughly ±0.14 V on the 117. AC volts are ±(0.7% + 2) True RMS, resistance ±(0.2% + 1) to 50 MΩ, and frequency ±(0.005% + 1) to 200 kHz. For calibrating 4-20 mA transmitters or verifying a reference voltage, that gap is the reason to buy it."
    },
    {
      heading: "Drive and industrial features",
      body: "Three functions are aimed squarely at plant floors. The low-pass filter strips the switching edges from a variable-frequency drive's output so you read the voltage the motor actually responds to instead of an inflated, jumpy number. Peak Capture records intermittent events as short as 250 µs, useful when a contactor drops out for a moment and the fault is gone by the time you look. And DC current resolves to 0.01 µA on a meter that also carries 10 A continuously (20 A for 30 seconds), so one tool covers a flame rod and a motor feeder."
    },
    {
      heading: "Temperature, weight and warranty",
      body: "The 87V reads temperature from -200 °C to 1090 °C, excluding the probe; the 80BK probe in the box is rated -40 °C to 260 °C, so very hot or cryogenic work needs a different probe. The meter weighs 355 g, or 624 g in its holster, and Fluke rates the battery at about 400 hours. The lifetime warranty is the longest of any meter in our guide alongside the 179."
    },
    {
      heading: "Our testing status",
      body: "OhmSavvy bought this unit and hands-on tested it, which is why it carries our badge. We haven't published detailed findings from that testing on this page, so the analysis above rests on Fluke's published specifications and the kind of work they suit. We won't describe results we haven't published."
    }
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "CAT III 600V and True RMS for less, plus built-in non-contact voltage detection and LoZ. Enough for most residential electrical work."
    },
    {
      name: "Fluke 179",
      href: "/multimeters/fluke-87v-vs-fluke-179",
      reason: "Matches the 87V's CAT III 1000V / CAT IV 600V rating with True RMS, temperature and a 6,000-count display with bar graph, for less."
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "A cheaper CAT III 600V meter with temperature and capacitance, but not True RMS and now discontinued."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 87V worth it over the Fluke 117?",
      answer: "Only if your work needs what the 87V adds: CAT IV 600V / CAT III 1000V protection, 0.05% DC accuracy, the 19,999-count high-resolution mode, microamp resolution and the drive filter. For residential electrical work, the 117's CAT III 600V rating, True RMS, VoltAlert and LoZ cover the job for less money."
    },
    {
      question: "Does the Fluke 87V measure True RMS?",
      answer: "Yes. True RMS keeps AC readings accurate on non-sinusoidal waveforms, such as those produced by variable-speed drives and switching power supplies. Fluke specifies AC volts at ±(0.7% + 2), and the separate low-pass filter mode lets you read the fundamental at a drive's output instead of a figure inflated by switching noise."
    },
    {
      question: "Does the Fluke 87V have non-contact voltage detection?",
      answer: "No. Fluke's spec tab doesn't list VoltAlert or a LoZ mode for the 87V. Many industrial electricians carry a separate pen-style voltage detector alongside it. If a built-in detector and ghost-voltage rejection matter more to you than CAT IV and resolution, the Fluke 117 is the better fit for your work."
    },
    {
      question: "Can the Fluke 87V test HVAC flame sensors?",
      answer: "Yes, on the specs. Flame-rectification currents are typically a few microamps DC, and the 87V resolves DC current to 0.01 µA. Put the meter in series with the flame rod lead on the µA range, then compare the reading with the furnace maker's minimum in the installation manual. Treat any typical value as a guide, not a pass mark."
    },
    {
      question: "What warranty does the Fluke 87V have?",
      answer: "Fluke lists a lifetime warranty for the 87V, compared with three years on the Fluke 117. Fluke's own warranty terms define what lifetime means and what's excluded, so read them before you rely on the coverage and keep your proof of purchase. For a tool that rides in a work bag every day, that long coverage is a real part of what the premium pays for."
    },
    {
      question: "Does hands-on testing change the assessment of this meter at all?",
      answer: "Not so far. OhmSavvy bought this unit and tested it hands-on, which is why it carries the badge, but we haven't published detailed findings from that testing on this page yet. The assessment above rests on Fluke's published specifications and the work those specs suit. If our testing ever changes the verdict, we'll update this review and say so clearly."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Fluke 117 vs Fluke 87V",
      href: "/multimeters/fluke-117-vs-fluke-87v"
    },
    {
      label: "Fluke 87V vs Fluke 179",
      href: "/multimeters/fluke-87v-vs-fluke-179"
    },
    {
      label: "Best multimeters for 4-20 mA loop testing",
      href: "/multimeters/best-multimeters-for-4-20ma-loop-testing"
    },
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

export default function Fluke87VReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-87v-review" />
    </>
  );
}
