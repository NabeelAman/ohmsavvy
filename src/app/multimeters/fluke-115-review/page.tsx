// Fluke 115 specs per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 (checked 2026-10-26):
//   DC V 600.0 mV-600.0 V ±(0.5% + 2); AC V True RMS ±(1.0% + 3) DC-500 Hz, ±(2.0% + 3) 500 Hz-1 kHz; A AC/DC 6.000 A and
//   10.00 A (DC ±(1.0% + 3), AC ±(1.5% + 3) 45-500 Hz), 20 A overload 30 s max; resistance 600.0 ohm-40.00 Mohm; continuity
//   beeper on below about 20 ohm, detects opens/shorts of 500 µs or longer; diode 2.000 V; capacitance to 9,999 µF;
//   frequency to 50.00 kHz ±(0.1% + 2); 6,000 counts at 4 updates/s, 33-segment bar graph at 32/s; Min/Max/Avg with elapsed
//   time; backlight; CAT III 600 V; 9 V alkaline battery, 400 h typical without backlight; 167 × 84 × 46 mm, 550 g;
//   operating -10 to +50 °C; 3-year warranty.
// Fluke 87V µA range (0.01 µA DC resolution) and temperature input per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
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
      heading: "What the published accuracy means on real readings",
      body: "Fluke specifies DC volts at ±(0.5% + 2 counts) and AC volts at ±(1.0% + 3 counts) from DC to 500 Hz, widening to ±(2.0% + 3) between 500 Hz and 1 kHz. Worked through on illustrative readings: a 12.00 V car battery on the 60.00 V range can be off by 0.5% of 12 V (0.06 V) plus two counts of 0.01 V (0.02 V), so the true value sits within about ±0.08 V. A 120.0 V outlet on the 600.0 V AC range allows 1.2 V plus three counts of 0.1 V, or about ±1.5 V. Both are tight enough for diagnosing batteries, chargers and branch circuits, though not for calibrating a reference.",
    },
    {
      heading: "Current: 6 A and 10 A only",
      body: "The current jack covers a 6.000 A range with 1 mA resolution and a 10.00 A range, AC or DC, and Fluke allows a 20 A overload for no more than 30 seconds. That suits motor running current, heater elements and automotive loads. What it can't do is resolve small currents well: there are no µA or mA ranges, so standby drain on a circuit board, a 4–20 mA loop or a parasitic draw in the tens of milliamps is better handled by a meter with dedicated low-current ranges or a clamp with a DC milliamp mode.",
    },
    {
      heading: "Resistance, continuity and the 500 µs catch",
      body: "Resistance runs from a 600.0 Ω range with 0.1 Ω resolution up to 40.00 MΩ. The continuity beeper turns on below about 20 Ω and Fluke states it catches opens or shorts lasting 500 µs or longer, which is what makes it useful for wiggling a harness or a cord while listening for a dropout. The diode test runs to 2.000 V, enough for ordinary silicon diodes and most LEDs, though some blue and white LEDs need more than that to light.",
    },
    {
      heading: "Display, battery and build",
      body: "The 6,000-count display updates four times a second, and the 33-segment bar graph updates 32 times a second, so it shows a drifting or fluctuating value faster than the digits do. Min/Max/Avg records with elapsed time, handy for catching a sag while a load cycles. Power comes from a single 9 V alkaline battery, rated at about 400 hours without the backlight. Fluke lists the meter at 167 × 84 × 46 mm and 550 g, an operating range of -10 to +50 °C, and a 3-year warranty.",
    },
    {
      heading: "Limitations to weigh",
      body: "Beyond the missing NCV and LoZ, the 115 tops out at CAT III 600V, so it isn't rated for service-entrance or CAT IV work, and its 1 kHz upper limit on AC volts means it isn't a tool for audio or switching-frequency voltage measurements. There's no temperature input, no low-current ranges and no data logging or Bluetooth. If temperature or microamps matter, the Fluke 87V adds both; for current without breaking the circuit, look at a clamp meter.",
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
    {
      question: "Can the Fluke 115 measure milliamps?",
      answer: "Not with useful resolution. Its current ranges are 6.000 A and 10.00 A, so the smallest step it shows is 1 mA and there are no dedicated µA or mA ranges. For Arduino projects, standby current or a car's parasitic drain, pick a meter with a microamp range, such as the Fluke 87V (0.01 µA DC resolution per Fluke), or a clamp meter that reads DC milliamps.",
    },
    {
      question: "What battery does the Fluke 115 use, and how long does it last?",
      answer: "It runs on one 9 V alkaline battery (IEC 6LR61), which ships installed. Fluke rates battery life at about 400 hours typical with the backlight off. Leaving the backlight on shortens that, so switch it off when you don't need it, and keep a spare 9 V in the case for long jobs.",
    },
    {
      question: "Is the Fluke 115 safe for household electrical panels?",
      answer: "It's rated CAT III 600V under IEC 61010, which covers fixed building wiring, distribution panels and branch circuits in a home or light-commercial building. It isn't rated CAT IV, so it shouldn't be used at the meter base or service drop. Use it with intact CAT III-rated leads, and call a licensed electrician for anything inside a panel you aren't qualified to open.",
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
      label: "Fluke 115 vs Klein MM400",
      href: "/multimeters/fluke-115-vs-klein-mm400",
    },
    {
      label: "Fluke 87V review",
      href: "/multimeters/fluke-87v-review",
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
