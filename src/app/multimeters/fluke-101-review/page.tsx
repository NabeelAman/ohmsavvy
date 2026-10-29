// Fluke 101 specs per this repo's Pick (src/app/multimeters/best-multimeters/page.tsx: fluke.com en-in 101 page, the
// Fluke 101 datasheet and users manual; not sold on fluke.com US, the Amazon listing B00HE6MIJY is a third-party
// import) and the "Specs per" notes on /multimeters/fluke-107-vs-fluke-101, /multimeters/fluke-106-vs-fluke-101,
// /multimeters/fluke-115-vs-fluke-101, /multimeters/fluke-17b-plus-vs-fluke-101 and /multimeters/fluke-101-vs-fluke-t5-600
// (https://www.fluke.com/en-in/product/electrical-testing/digital-multimeters/fluke-101, checked 2026-10-26/27):
// 6,000-count display; DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V 600.0 mV to 600.0 V (40-500 Hz) ±(1.0% + 3),
// 600 mV ±(3.0% + 3); no True RMS claim; resistance 400.0 Ω ±(0.5% + 3), 4 kΩ-4 MΩ ±(0.5% + 2), 40 MΩ ±(1.5% + 3);
// capacitance from 50.00 nF, accuracy not listed; frequency 10 Hz to 100 kHz, accuracy not listed; diode; continuity
// with buzzer; two input jacks; no current function; "Hold: No" on the en-in page; no backlight listed; 2 x AAA;
// 130 x 65 x 27 mm; 160 g; IP40; 1 m drop (at -10 °C); MIL-PRF-28800F Class 2 vibration; 0-40 °C operating;
// CAT III 600 V; 1-year warranty; auto shutoff.
// Conflicts stated on the page: duty cycle 0.1-99.9% (en-in product page) vs 1-99% (datasheet); top capacitance
// 1,000 µF (en-in range table) vs 100 µF (general specs / other Fluke documents).
// Comparison facts for alternatives per those same pages and the Picks: Fluke 107 adds 4 A / 10 A current, backlight
// and data hold (200 g, 2-year warranty); Fluke 115 is True RMS with 6 A / 10 A (550 g, 3-year warranty); Fluke 17B+
// has 400 µA to 10 A and temperature; Fluke T5-600 reads 100 A AC through its OpenJaw. Battery life not stated in
// our sources for the 101. Worked accuracy figures are arithmetic on the published specs, not measurements.
// Pick rating 4.1; not hands-on tested by OhmSavvy. No prices.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { localeAlternates } from "@/lib/i18n";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 101")!;

export const metadata = buildMetadata({
  title: "Fluke 101 Review",
  description: "Fluke 101 review: a 160 g CAT III 600V pocket meter with frequency, duty cycle and capacitance but no current ranges. Who should buy it, who shouldn't.",
  path: "/multimeters/fluke-101-review",
  languages: localeAlternates("/multimeters/fluke-101-review"),
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 101 Review",
  productType: "Compact digital multimeter",
  intendedBuyer: "Anyone who needs a pocket voltage, continuity and diode checker and never measures current",
  imageAlt: "Fluke 101 compact digital multimeter with its rotary dial and two input jacks",
  considerIf: [
    "You want a Fluke-built meter small enough for a shirt pocket or glovebox, at 130 × 65 × 27 mm and 160 g",
    "Your checks are voltage, continuity, diodes and resistance, with occasional frequency or capacitance",
    "You'd like a second meter that rides in a tool bag without adding bulk to your main one",
    "A two-jack design appeals to you because there's no amps socket to leave a lead in by mistake"
  ],
  skipIf: [
    "You need to measure current of any size; the 101 has no current function at all",
    "You work on variable-speed drives or LED lighting and want True RMS readings, which Fluke doesn't claim for this model",
    "You work in a dim panel or crawlspace and want a backlight or a data-hold button, neither of which Fluke lists",
    "You want US-market warranty support, since the 101 isn't sold on Fluke's US site and the Amazon offer is an import"
  ],
  tradeOffs: "Choosing the 101 means trading every current range for what Fluke positions as its smallest, simplest meter. The Fluke 107 keeps a similar palm-sized format but adds 4 A and 10 A ranges, a backlight and data hold for 40 g more; the Fluke 115 adds True RMS and 10 A in a full-size 550 g case. If you want something that reads amps without wiring the meter into the circuit, the T5-600 tester does AC current to 100 A through its open jaw. The 101 makes sense only when current is genuinely off your list.",
  assessment: [
    {
      heading: "What the two-jack layout means",
      body: "Most multimeters have three or four jacks because current needs its own fused input. The 101 has two, COM and the volts/ohms input, so it can't be set up to measure amps at all. That removes a classic mistake, leaving a lead in the amps jack and then probing a live outlet, but it also means the meter can't tell you whether a fan, pump or parasitic drain is drawing what it should. Think of it as a voltage-and-continuity tester with a few electronics extras rather than a complete multimeter."
    },
    {
      heading: "Volts accuracy, worked through",
      body: "Fluke specifies DC volts at ±(0.5% + 3 counts) on 6.000, 60.00 and 600.0 V ranges. A 12.60 V car-battery reading on the 60.00 V range can be off by 0.063 V plus 0.03 V, about ±0.09 V, which is enough to separate a charged battery from a tired one. AC volts are ±(1.0% + 3) from 40 to 500 Hz, so a 240.0 V dryer receptacle reads within about ±2.7 V. The 600 mV AC range loosens to ±(3.0% + 3). Fluke doesn't describe the 101 as True RMS, and as a general engineering point, a meter without True RMS can misread distorted waveforms such as drive outputs or electronic loads."
    },
    {
      heading: "Resistance, capacitance, frequency and duty cycle",
      body: "Resistance runs from a 400.0 Ω range to 40.00 MΩ. The 4 kΩ to 4 MΩ ranges carry ±(0.5% + 2), so a 10.00 kΩ resistor reads within roughly ±0.07 kΩ; the 400 Ω range is ±(0.5% + 3) and the 40 MΩ range ±(1.5% + 3). For capacitance, frequency and duty cycle the picture is less complete. Fluke's documents disagree on the top capacitance range, 1,000 µF in the product page's range table and 100 µF elsewhere, and list no capacitance accuracy. Frequency covers 10 Hz to 100 kHz, again without a published accuracy. Duty cycle is 0.1% to 99.9% on Fluke's product page but 1% to 99% in the datasheet. Fine for a quick check, not for anything you need to document."
    },
    {
      heading: "Size, ruggedness and safety rating",
      body: "At 160 g on two AAA cells, the 101 is the lightest Fluke in our main multimeter roundup. Fluke rates it CAT III 600V, the category for branch circuits, receptacles and panels inside a building, and IP40, which keeps out solid objects but offers no water protection. It's specified for a 1 m drop, tested at −10 °C, and for MIL-PRF-28800F Class 2 vibration, with a 0–40 °C operating range. Fluke doesn't list a backlight, and its product page marks data hold as absent, so reading the display in a dark cabinet or holding a value after you pull the probes isn't possible."
    },
    {
      heading: "Buying it in the US: import and warranty",
      body: "The 101 isn't listed on Fluke's US website. The Amazon listing we link is a third-party import of the model Fluke sells in markets such as India, and the warranty is one year rather than the two years Fluke gives the 106 and 107. Before buying, check the seller's details on the listing and ask how warranty claims are handled. Fluke also doesn't publish battery life for the 101 in the sources we use, so we list it as not stated. This review is desk research against Fluke's published data; we haven't bench-tested the meter."
    }
  ],
  alternatives: [
    {
      name: "Fluke 107",
      href: "/multimeters/fluke-107-vs-fluke-101",
      reason: "A similar pocket body with 4 A / 10 A current, a backlight and data hold, at 200 g."
    },
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "A full-size True RMS field meter with 6 A and 10 A ranges and a 3-year warranty."
    },
    {
      name: "Fluke 17B+",
      href: "/multimeters/fluke-17b-plus-vs-fluke-101",
      reason: "Microamps to 10 A plus temperature, for electronics and HVAC checks the 101 can't do."
    },
    {
      name: "Fluke T5-600",
      href: "/multimeters/fluke-101-vs-fluke-t5-600",
      reason: "An electrician's tester that reads AC current to 100 A through its open jaw, no leads in the circuit."
    }
  ],
  faqs: [
    {
      question: "Can the Fluke 101 measure amps?",
      answer: "No. It has only two input jacks and no current function on the dial, so it can't measure AC or DC current at any level, including milliamps and microamps. If you need current, the Fluke 107 adds 4 A and 10 A ranges in a similar small body, and the 17B+ covers microamps to 10 A."
    },
    {
      question: "Is the Fluke 101 True RMS?",
      answer: "Fluke doesn't describe the 101 as True RMS. Its AC volts specification is ±(1.0% + 3) from 40 to 500 Hz. For clean mains voltage that's usually adequate, but on distorted waveforms from drives, dimmers or switch-mode supplies, a True RMS meter such as the Fluke 115 is the safer choice."
    },
    {
      question: "Why is the Fluke 101 hard to find in the US?",
      answer: "Fluke doesn't list it on its US website, so there's no official US distribution. The Amazon listing we link is from a third-party importer selling the model Fluke offers in other markets. Check who the seller is and how they handle warranty claims before you buy, because the 101's warranty is one year."
    },
    {
      question: "What is the largest capacitor the Fluke 101 can measure?",
      answer: "Fluke's own documents disagree. The range table on its product page goes to 1,000 µF, while other Fluke specifications give 100 µF as the top range, and no capacitance accuracy is published. If you regularly test large motor-run or power-supply capacitors, choose a meter with a clearly specified higher range."
    },
    {
      question: "Is the Fluke 101 safe for household outlets and breaker panels?",
      answer: "Fluke rates it CAT III 600V, which covers receptacles, branch circuits and distribution panels inside a building. It isn't rated for CAT IV locations such as the service entrance or meter base. Use leads rated for the same category, keep fingers behind the probe guards, and call a licensed electrician for anything you aren't trained to work on."
    },
    {
      question: "Has OhmSavvy tested the Fluke 101?",
      answer: "No. This review is desk research against Fluke's published specifications and the Amazon listing, which is why the page shows a desk-research status. The worked accuracy figures are arithmetic on Fluke's specs, not measurements we took."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Fluke 107 vs Fluke 101",
      href: "/multimeters/fluke-107-vs-fluke-101"
    },
    {
      label: "Fluke 106 vs Fluke 101",
      href: "/multimeters/fluke-106-vs-fluke-101"
    },
    {
      label: "Fluke 115 vs Fluke 101",
      href: "/multimeters/fluke-115-vs-fluke-101"
    },
    {
      label: "Fluke 117 vs Fluke 101",
      href: "/multimeters/fluke-117-vs-fluke-101"
    },
    {
      label: "Fluke 15B+ vs Fluke 101",
      href: "/multimeters/fluke-15b-plus-vs-fluke-101"
    },
    {
      label: "Fluke 17B+ vs Fluke 101",
      href: "/multimeters/fluke-17b-plus-vs-fluke-101"
    },
    {
      label: "Fluke 101 vs Fluke T5-600",
      href: "/multimeters/fluke-101-vs-fluke-t5-600"
    },
    {
      label: "Best multimeter for home use",
      href: "/multimeters/best-multimeter-for-home-use"
    }
  ],
};

export default function Fluke101ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-101-review" />
    </>
  );
}
