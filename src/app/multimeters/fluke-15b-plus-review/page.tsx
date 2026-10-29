// Fluke 15B+ specs per the Pick ("Specs per fluke.com (15B+ page) and the Fluke 15B+/17B+ datasheet and users manual
// (frequency, temperature, MIN MAX and relative are 17B+ only)") and the source notes already cited on
// /multimeters/fluke-17b-plus-vs-fluke-15b-plus, /multimeters/fluke-15b-plus-vs-fluke-115 and
// /multimeters/fluke-15b-plus-vs-fluke-t5-600 (fluke.com 15B+ spec tab and the 15B+/17B+/18B+ users manual, checked
// 2026-10-26/27): no True RMS claim; 4,000 counts, 3 updates/s, white backlight; DC/AC V 400.0 mV to 1000 V, DC ±(0.5% + 3),
// AC 40-500 Hz ±(1.0% + 3); current 400.0 µA (0.1 µA resolution), 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all
// ±(1.5% + 3), AC 40-400 Hz; resistance 400.0 Ω to 40.00 MΩ, ±(0.5% + 2) on the middle ranges; capacitance 40.00 nF to
// 1000 µF, ±(2% + 5) to ±(5% + 5); diode 2.000 V; continuity beeps below 70 Ω; input >10 MΩ, <100 pF; data hold and range
// buttons; fuses 440 mA and 11 A, 1000 V; 2 × AA, 500 h minimum; auto power off after 20 min, backlight off after 2 min;
// 183 × 91 × 49.5 mm; 455 g; IP40. Safety: the fluke.com page gives CAT III 600V with 1000 V maximum terminal to earth;
// CAT II 1000V comes from the 15B+/17B+ datasheet (as on the Pick). In the box: TL75 leads, 2 AA.
// Users manual: one-year warranty (the fluke.com page states no term); frequency, duty cycle, temperature, MIN MAX, relative
// and the hazardous-voltage LED are 17B+ only. Drop rating: not stated in our sources.
// Worked accuracy figures below are arithmetic on these published specs, not measurements.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 15B+")!;

export const metadata = buildMetadata({
  title: "Fluke 15B+ Review",
  description: "Fluke 15B+ review: a no-frills CAT III 600V Fluke with microamp-to-10 A current ranges and 1,000 µF capacitance, plus what it gives up to the 17B+.",
  path: "/multimeters/fluke-15b-plus-review",
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 15B+ Review",
  productType: "Digital multimeter",
  intendedBuyer: "Basic electrical and electronics checks",
  imageAlt: "Fluke 15B+ digital multimeter, front view",
  considerIf: [
    "You want a Fluke at the entry tier for volts, amps, ohms, continuity, diode and capacitance, and nothing more",
    "You prefer a dial with few buttons: HOLD and RANGE are the only extra controls",
    "You need current on separate fused jacks, from a 400.0 µA range up to 10.00 A",
    "You want long battery life from common AA cells, at least 500 hours per Fluke",
    "You work inside a home or building on circuits covered by CAT III 600V"
  ],
  skipIf: [
    "You'll measure AC on drives, LED drivers or electronic loads, since Fluke makes no True RMS claim for the 15B+",
    "You need temperature, frequency, duty cycle or MIN MAX: those are reserved for the Fluke 17B+",
    "You want non-contact voltage detection or a low-impedance mode for ghost voltages",
    "You expect a multi-year warranty; the users manual gives one year",
    "Your work reaches the service entrance or other CAT IV locations"
  ],
  tradeOffs: "The 15B+ is the 17B+ with the extra functions removed, so the real decision is between those two Flukes and a True RMS meter. The step up to the 17B+ buys temperature, frequency, duty cycle, MIN MAX, relative mode and a 30 V warning LED in an identical case. Moving to the Fluke 115 buys True RMS, 6,000 counts and a three-year warranty, but gives up the microamp and milliamp ranges. A budget True RMS meter such as the KAIWEETS KM200s adds NCV and auto AC/DC, at the cost of a lower CAT II 600V rating.",
  assessment: [
    {
      heading: "A short function list, done properly",
      body: "The dial covers AC and DC volts from a 400.0 mV range to 1000 V, AC and DC current, resistance to 40.00 MΩ, capacitance from 40.00 nF to 1,000 µF, a 2.000 V diode test and a continuity beeper that sounds below 70 Ω. The only buttons are HOLD and RANGE. There's no shift menu to learn and no mode that changes what the display means, which makes the 15B+ easy to hand to an apprentice, a student or a family member. The trade is obvious: no frequency, duty cycle, temperature, MIN MAX or relative mode at all."
    },
    {
      heading: "Six current ranges and two fuses",
      body: "Current is where the 15B+ outclasses many electrician-focused meters. It has six ranges: 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A and 10.00 A, each specified at ±(1.5% + 3 counts), with AC current rated from 40 to 400 Hz. Small currents go through the µA/mA jack behind a 440 mA fuse; large ones through the A jack behind an 11 A fuse, both rated 1000 V. As a worked example, 20.00 mA on the 40.00 mA range carries 0.30 mA plus 0.03 mA, about ±0.33 mA. The Fluke 115 and 117 start at 6 A with 1 mA as their finest resolution, so they can't do this."
    },
    {
      heading: "Accuracy and display resolution in numbers",
      body: "DC volts are ±(0.5% + 3); a 9.00 V battery on the 40.00 V range reads within about ±0.08 V (0.045 V plus 0.03 V). AC volts from 40 to 500 Hz are ±(1.0% + 3), so a 240.0 V circuit on the 400.0 V range carries about ±2.7 V. The middle resistance ranges are ±(0.5% + 2). The 4,000-count display updates three times a second and works well below 400 V; above that it switches to the 1000 V range and shows whole volts only. Capacitance is the loosest spec, between ±(2% + 5) and ±(5% + 5) depending on range, adequate for a pass/fail check on a motor-run or filter capacitor."
    },
    {
      heading: "No True RMS claim: what to check it on",
      body: "Fluke doesn't call the 15B+ True RMS. That's fine for utility voltage at an outlet, a battery, a DC power supply or a heater element's resistance, which covers most of what buyers at this tier do. It's a poor fit for AC current through switch-mode chargers, LED lighting, dimmers or variable-speed motors, where distorted waveforms can push the reading off with no warning on screen. If that describes a regular job, spend the difference on a True RMS meter instead of relying on the 15B+ there."
    },
    {
      heading: "Ratings, case, battery and warranty",
      body: "Fluke's product page gives CAT III 600V and 1000 V maximum between any terminal and earth; the 15B+/17B+ datasheet also lists CAT II 1000V. Neither is a CAT IV rating, so keep it off meter bases and service drops. The case is 183 × 91 × 49.5 mm and 455 g, rated IP40 (not water-resistant), and it ships with TL75 leads and two AA cells. Battery life is at least 500 hours, extended by a 20-minute auto power off and a two-minute backlight timeout. Fluke's US page doesn't state a warranty term; the users manual gives one year. A drop rating isn't stated in our sources."
    }
  ],
  alternatives: [
    {
      name: "Fluke 17B+",
      href: "/multimeters/fluke-17b-plus-review",
      reason: "The identical case and ratings, plus temperature, frequency, duty cycle, MIN MAX, relative mode and a 30 V warning LED."
    },
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "True RMS, 6,000 counts, a bar graph and a three-year warranty for field service; no µA or mA ranges."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "Adds VoltAlert non-contact detection and LoZ to True RMS, for electricians tracing live conductors."
    },
    {
      name: "KAIWEETS KM200s",
      href: "/multimeters/kaiweets-km200s-review",
      reason: "A cheaper True RMS meter with NCV and smart auto-ranging, rated CAT II 600V rather than CAT III."
    },
    {
      name: "Fluke 107",
      href: "/multimeters/fluke-15b-plus-vs-fluke-107",
      reason: "A palm-sized 200 g Fluke with 6,000 counts and frequency, but only 4 A and 10 A current ranges."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 15B+ a True RMS multimeter?",
      answer: "Fluke makes no True RMS claim for it, so assume it's calibrated for clean sine waves. Readings at a household outlet or on DC are unaffected. AC readings on dimmers, LED drivers, chargers or variable-speed motors can be wrong, so choose a True RMS meter such as the Fluke 115 or 117 if that's regular work."
    },
    {
      question: "Fluke 15B+ or Fluke 17B+: which should I buy?",
      answer: "Pick the 15B+ if volts, current, resistance, continuity, diode and capacitance cover your work. Pick the 17B+ if you want temperature with the included Type K probe, frequency to 100 kHz, duty cycle, MIN MAX or relative mode. Both share the same case, CAT ratings, 4,000-count display, current ranges and one-year warranty."
    },
    {
      question: "Can the Fluke 15B+ measure milliamps for a 4-20 mA loop?",
      answer: "Yes. It has 40.00 mA and 400.0 mA ranges on the fused µA/mA jack, at ±(1.5% + 3 counts). A 20.00 mA loop reading on the 40.00 mA range works out to about ±0.33 mA. Break the loop and put the meter in series; the meter can't source loop current, so the transmitter's supply has to stay in circuit."
    },
    {
      question: "Is the Fluke 15B+ safe for household electrical work?",
      answer: "It carries CAT III 600V, the category for panels, branch circuits and outlets inside a building, and its current jacks are fused at 440 mA and 11 A, 1000 V. It isn't CAT IV, so it's not for the meter base or service drop. Test it on a known live outlet first, and call an electrician for anything beyond simple checks."
    },
    {
      question: "How long do the batteries last in the Fluke 15B+?",
      answer: "Fluke specifies at least 500 hours from two AA cells. The meter turns itself off after 20 minutes without use and the backlight switches off after two minutes, both of which help. Because it takes common AA batteries rather than a 9 V, spares are easy to find in any store or toolbox."
    },
    {
      question: "Did OhmSavvy test the Fluke 15B+ in person?",
      answer: "No. This is a desk-research review built from Fluke's product page, datasheet and users manual. The accuracy examples are calculations from Fluke's published tolerances, not bench readings, and the score is our editorial rating from that research. If we buy and test one, the page will say so and show the results."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 15B+ vs Fluke 115", href: "/multimeters/fluke-15b-plus-vs-fluke-115" },
    { label: "Fluke 117 vs Fluke 15B+", href: "/multimeters/fluke-117-vs-fluke-15b-plus" },
    { label: "Fluke 15B+ vs Fluke 117/323 Kit", href: "/multimeters/fluke-15b-plus-vs-fluke-117-323-kit" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Fluke 15B+ vs Fluke 101", href: "/multimeters/fluke-15b-plus-vs-fluke-101" },
    { label: "Fluke 15B+ vs Fluke T5-600", href: "/multimeters/fluke-15b-plus-vs-fluke-t5-600" },
    { label: "Multimeter buying guide", href: "/multimeters/multimeter-buying-guide" }
  ],
};

export default function Fluke15BPlusReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-15b-plus-review" />
    </>
  );
}
