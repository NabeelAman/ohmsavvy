// Fluke 107 specs per the Fluke 107 Pick (src/app/multimeters/best-multimeters/page.tsx) and the sources already cited
// on fluke-107-vs-fluke-101, fluke-107-vs-fluke-115 and fluke-106-vs-fluke-107 (checked 2026-10-26/27):
// - Fluke 107 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-107
//   DC V 6.000/60.00/600.0 V ±(0.5% + 3), no DC mV range listed; AC V 40-500 Hz ±(1.0% + 3); AC mV 600.0 mV ±(3.0% + 3);
//   volts input >10 MΩ, <100 pF; DC and AC (40-200 Hz) current 4.000 A / 10.00 A ±(1.5% + 3), 0.001 A best resolution,
//   no mA/µA ranges; resistance 400.0 Ω ±(0.5% + 3), 4.000 kΩ-4.000 MΩ ±(0.5% + 2), 40.00 MΩ ±(1.5% + 3); capacitance
//   50.00 nF and 500.0 nF ±(2% + 5), 5.000 µF to 1,000 µF ±(5% + 5); frequency 10 Hz-100 kHz ±(0.1% + 3); duty cycle
//   1-99%; diode 2.000 V, 10% accuracy; 6,000 counts, 3 updates/s; backlit display; data hold; 2 × AAA, 200 h minimum;
//   142 × 69 × 28 mm; 200 g; 11 A 1000 V fast fuse; IP40; 1 m drop; CAT III 600 V; 2-year warranty; TL75 leads,
//   SmartStrap magnetic lanyard and 2 AAA in the box; no calibration certificate (page FAQ); "not a true-RMS" (page FAQ);
//   auto-ranging not stated on the page (the Pick notes the Auto indicator on Fluke's display photo).
// - Fluke 106/107 Users Manual: https://media.fluke.com/8eaf269b-51d3-435f-9e69-b10800c0e4df_original%20file.pdf
//   (diode, frequency and duty cycle are 107 only; continuity beeps below 70 Ω; auto power-off after 20 min; backlight
//   auto-off after 2 min; capacitance readings can take up to 18 s to settle; diode test about 2.0 V open circuit, <0.6 mA).
// Alternatives per their Picks and the comparison pages above: Fluke 106 (same body, no diode/Hz/duty, backlight and hold
// not listed), Fluke 101 (no current, 160 g, 1-year warranty, third-party US import), Fluke 15B+ (400.0 µA to 10 A,
// 4,000 counts, 455 g, no frequency), Fluke 115 (True RMS, 550 g, 3-year warranty).
// Worked tolerances are arithmetic on the published specs; the 1.11 sine form factor is a standard textbook value.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 107")!;

export const metadata = buildMetadata({
  title: "Fluke 107 Review",
  description:
    "Fluke 107 review: a 200 g, CAT III 600V pocket meter with diode test, frequency and duty cycle but no True RMS. Who it suits, who should skip it, and why.",
  path: "/multimeters/fluke-107-review",
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 107 Review",
  productType: "Pocket digital multimeter",
  intendedBuyer: "Hobbyists, DIY car owners and pros who want a small second meter",
  imageAlt: "Fluke 107 palm-sized digital multimeter with yellow holster, front view",
  considerIf: [
    "You want a genuine Fluke that fits a glovebox or a jacket pocket: 142 × 69 × 28 mm and 200 g",
    "You check LEDs, rectifiers or alternator diodes and need a proper diode range",
    "You look at PWM fans, dimmers or injector signals and want frequency and duty cycle readings",
    "You work in dim attics, crawl spaces or footwells, where the backlit display helps"
  ],
  skipIf: [
    "You measure VFD outputs, LED drivers or other distorted AC, where Fluke itself says the 107 is not True RMS",
    "You need milliamp or microamp resolution for sensor loops, flame rods or sleep current",
    "You want temperature, a low-impedance mode or non-contact voltage detection",
    "You do panel work every day and want a full-size meter with Min/Max recording"
  ],
  tradeOffs:
    "The 107 trades accuracy features for size. Against the Fluke 115 you give up True RMS, Min/Max/Average, a bar graph and a third year of warranty, and in return carry a meter that weighs 350 g less. Against the 15B+ you lose the µA and mA current ranges but gain frequency, duty cycle and a 6,000-count display. Against the cheaper 106 in the same body, the 107's extra cost buys diode test, Hz, duty cycle, a backlight, a listed data hold and a magnetic strap.",
  assessment: [
    {
      heading: "Where a pocket meter beats a full-size one",
      body: "Most meter checks are quick: is this outlet live, is this fuse open, is this battery flat. A 550 g meter with a 9 V battery often stays in the truck for those jobs; a 200 g meter on two AAA cells stays in your pocket. The 107 keeps the parts of a full-size Fluke that matter for that role: CAT III 600V, an 11 A 1000 V fast fuse on the current input, IP40 and a 1 m drop rating. Two AAA cells are rated for at least 200 hours, the meter switches itself off after 20 minutes idle, and the backlight drops out after 2 minutes, so a forgotten meter doesn't come back dead."
    },
    {
      heading: "Accuracy, with the arithmetic",
      body: "DC volts are specified at ±(0.5% + 3 counts). A car battery reading 12.60 V on the 60.00 V range can be off by 0.063 V plus 0.03 V, about ±0.09 V: enough to tell a rested 12.6 V battery from a tired 12.2 V one. AC volts between 40 Hz and 500 Hz carry ±(1.0% + 3), so a 120.0 V receptacle reading on the 600.0 V range sits within roughly ±1.5 V. Resistance on the middle ranges is ±(0.5% + 2): a 10.00 kΩ resistor reads within about ±0.07 kΩ. These are the same figures Fluke prints for the 106, and they're close to what a full-size entry meter offers on clean sine-wave mains."
    },
    {
      heading: "The True RMS gap in practice",
      body: "Fluke's own FAQ says the 107 is not a True RMS meter. An average-responding meter scales its reading by the sine-wave form factor of about 1.11, a standard textbook value, so it's correct on clean utility power and wrong by an amount that depends on wave shape everywhere else. On an ideal square wave, for example, the form factor is 1.0 and such a meter reads about 11% high. Variable-speed drive outputs, dimmer circuits and the current drawn by LED drivers and switching power supplies are exactly where that error shows up. If those loads are routine for you, the Fluke 115 or 117 is the right tool and the 107 becomes the backup."
    },
    {
      heading: "Diode, frequency and duty cycle: why the 107 exists",
      body: "These three functions are what separate the 107 from the 106. The diode range runs to 2.000 V with about 2.0 V open-circuit and under 0.6 mA, enough to read a silicon junction near 0.6 V (a typical textbook value), though an LED whose forward voltage is above about 2 V, as most blue and white ones are, will read as open. Frequency covers 10 Hz to 100 kHz at ±(0.1% + 3): a 25 kHz PC-fan PWM signal sits well inside that range, with a tolerance of about 25 Hz plus three counts. Duty cycle reads 1% to 99%, so you can see whether a controller is commanding 30% or 80% instead of guessing from an averaged DC voltage. For car electrical work and hobby electronics, that is the reason to pay for the 107."
    },
    {
      heading: "Current: two ranges, no fine resolution",
      body: "The 107 has only 4.000 A and 10.00 A current ranges, AC and DC, at ±(1.5% + 3), with AC current specified from 40 Hz to 200 Hz. The best resolution is 1 mA. A 2.500 A appliance draw reads within about ±0.04 A, which is fine. A 35 mA parasitic drain on a parked car shows as 0.035 A with a tolerance of roughly ±4 mA, which is usable for a pass/fail check against a typical limit but coarse for tracking down a few milliamps. A 4–20 mA loop or a 1 µA flame-sensor signal is out of reach entirely; the 15B+ has the µA and mA ranges the 107 lacks."
    },
    {
      heading: "Capacitance, extras and what's in the box",
      body: "Capacitance runs from 50 nF to 1,000 µF, at ±(2% + 5) on the nanofarad ranges and ±(5% + 5) from 5 µF up. A 470.0 µF capacitor on the 500.0 µF range therefore reads within about ±24 µF, adequate for spotting a dried-out electrolytic but not for matching parts; Fluke's manual notes large values can take up to 18 seconds to settle. Continuity beeps below 70 Ω, a looser threshold than the 20 Ω on the 115. Fluke lists data hold and a backlit display, and the box holds TL75 leads, a SmartStrap magnetic lanyard and two AAA cells. Fluke states a 2-year warranty and, per its FAQ, no calibration certificate. Auto-ranging isn't stated on the product page; our spec table reflects the Auto indicator shown on the display in Fluke's photo."
    }
  ],
  alternatives: [
    {
      name: "Fluke 106",
      href: "/multimeters/fluke-106-review",
      reason: "The same body and accuracy without diode test, frequency, duty cycle or a listed backlight, for wiring-only checks."
    },
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "True RMS, Min/Max/Average and a 3-year warranty in a full-size 550 g body."
    },
    {
      name: "Fluke 15B+",
      href: "/multimeters/fluke-15b-plus-vs-fluke-107",
      reason: "µA and mA current ranges for sensor and drain work, but no frequency and a larger 455 g case."
    },
    {
      name: "Fluke 101",
      href: "/multimeters/fluke-107-vs-fluke-101",
      reason: "Smaller still at 160 g with diode and frequency, but no current measurement and a 1-year warranty."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 107 a True RMS multimeter?",
      answer: "No. Fluke's product page FAQ states that the 107 is not a True RMS meter. It reads clean sine-wave mains correctly within its ±(1.0% + 3) AC spec, but on distorted waveforms from drives, dimmers or LED drivers its AC readings can be off. For that work, look at the Fluke 115 or 117."
    },
    {
      question: "Can the Fluke 107 check a car's parasitic battery drain?",
      answer: "Roughly. Its finest current resolution is 1 mA on the 4 A range, so a 35 mA drain reads as 0.035 A with about ±4 mA of tolerance. That answers whether a drain is near a typical limit, but there's no milliamp range for chasing small loads. Connect it in series only after the car's modules have gone to sleep."
    },
    {
      question: "Fluke 106 or Fluke 107: which should I buy?",
      answer: "Both share the same body, safety rating and accuracy figures. Buy the 107 if you test diodes or LEDs, read PWM or sensor frequencies, or work in poor light, since Fluke lists a backlight only for the 107. If you only check outlets, fuses and batteries, the 106 measures those to the same tolerance."
    },
    {
      question: "What warranty does the Fluke 107 have?",
      answer: "Fluke states a 2-year warranty for the 107. That's shorter than the 3 years on the full-size 115 and 117, and Fluke's FAQ notes the meter ships without a calibration certificate. The Fluke 101, sold in the US only as a third-party import, carries one year."
    },
    {
      question: "How long do the Fluke 107's batteries last?",
      answer: "Fluke rates its two AAA cells for at least 200 hours. The manual adds an automatic power-off after 20 minutes without use and a backlight that switches itself off after 2 minutes, so the rating holds up even if you forget to turn the dial back to off."
    },
    {
      question: "Has OhmSavvy tested the Fluke 107?",
      answer: "No. This review is desk research checked against Fluke's product page, spec tab and the 106/107 users manual, which is why the summary box says it isn't bench-tested. The worked tolerances on this page are arithmetic on Fluke's published specs, not our measurements."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 101", href: "/multimeters/fluke-107-vs-fluke-101" },
    { label: "Fluke 107 vs Fluke 115", href: "/multimeters/fluke-107-vs-fluke-115" },
    { label: "Fluke 117 vs Fluke 107", href: "/multimeters/fluke-117-vs-fluke-107" },
    { label: "Fluke 15B+ vs Fluke 107", href: "/multimeters/fluke-15b-plus-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "Fluke 107 vs Fluke 113", href: "/multimeters/fluke-107-vs-fluke-113" },
    { label: "Fluke 107 vs Fluke T5-600", href: "/multimeters/fluke-107-vs-fluke-t5-600" },
    { label: "Best multimeter for beginners", href: "/multimeters/best-multimeter-for-beginners" }
  ],
};

export default function Fluke107ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-107-review" />
    </>
  );
}
