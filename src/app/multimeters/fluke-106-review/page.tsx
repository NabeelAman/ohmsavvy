// Fluke 106 specs per the Fluke 106 Pick (src/app/multimeters/best-multimeters/page.tsx) and the sources already cited
// on fluke-106-vs-fluke-107, fluke-106-vs-fluke-101, fluke-117-vs-fluke-106 and fluke-106-vs-fluke-114 (checked 2026-10-26/27):
// - Fluke 106 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-106
//   DC V 6.000/60.00/600.0 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3), AC specified from 1% to 100% of range; AC mV
//   600.0 mV ±(3.0% + 3); volts input >10 MΩ, <100 pF, AC mV >1 MΩ; DC and AC (40-200 Hz) current 4.000 A / 10.00 A
//   ±(1.5% + 3), no mA or µA ranges; resistance 400.0 Ω to 40.00 MΩ, ±(0.5% + 2) on 4 kΩ to 4 MΩ; capacitance 50.00 nF
//   to 1,000 µF, ±(2% + 5) nF ranges, ±(5% + 5) µF ranges; 6,000 counts, 3 updates/s; one 11 A 1000 V fast fuse;
//   2 × AAA, 200 h minimum; 142 × 69 × 28 mm; 200 g; IP40; CAT III 600 V; TL75 leads and 2 AAA in the box (no lanyard
//   listed); hold, backlight and auto-off not mentioned on the page; positioned for "everyday applications, where
//   true-rms accuracy isn't needed".
// - Fluke 106 datasheet (2-year warranty): https://media.fluke.com/715a70ff-286c-4b33-bc8c-b38b0159a2c1_original%20file.pdf
// - Fluke 106/107 Users Manual: https://media.fluke.com/8eaf269b-51d3-435f-9e69-b10800c0e4df_original%20file.pdf
//   (three jacks: 10 A, COM, V/Ω; diode, frequency and duty cycle are 107 only; continuity beeps below 70 Ω; auto power
//   off after 20 min; capacitance readings can take up to 18 s to settle).
// Conflicts stated on the page: the Pick verdict mentions data hold, but Fluke's 106 page doesn't list hold (treated as
// unconfirmed); the 106 page states no warranty while Fluke's 106/107 documentation gives 2 years; a drop rating is
// cited for the 107 only.
// Alternatives per their Picks and the comparison pages above: Fluke 107, Fluke 101 (no current, 160 g, 1-year
// warranty, third-party US import), Fluke 15B+ (400.0 µA to 10 A, 4,000 counts, 455 g, 2 × AA), Fluke 117 (True RMS,
// VoltAlert, LoZ, 3-year warranty). Worked tolerances are arithmetic on the published specs, not measurements.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 106")!;

export const metadata = buildMetadata({
  title: "Fluke 106 Review",
  description:
    "Fluke 106 review: Fluke's simplest palm-sized meter for volts, ohms, capacitance and 10A current. What it skips versus the 107, and who it's right for.",
  path: "/multimeters/fluke-106-review",
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 106 Review",
  productType: "Pocket digital multimeter",
  intendedBuyer: "Homeowners and tradespeople wanting a small, basic backup meter",
  imageAlt: "Fluke 106 compact digital multimeter, front view with rotary dial",
  considerIf: [
    "Your checks are mains voltage, fuses, heater elements and batteries, and nothing involving semiconductors",
    "You want the Fluke name and a CAT III 600V rating in a 200 g body that runs on two AAA cells",
    "You need appliance current up to 10 A in a meter small enough for a kitchen drawer",
    "You want the plainest dial in Fluke's pocket line, with fewer modes to learn"
  ],
  skipIf: [
    "You test LEDs, diodes or rectifiers: the 106 has no diode range",
    "You read PWM, fan or sensor frequencies; frequency and duty cycle are 107-only functions",
    "You often work in poor light, since Fluke lists no backlight for the 106",
    "You measure drives or electronic loads where True RMS matters, or need mA and µA resolution"
  ],
  tradeOffs:
    "The 106 is the 107 with the electronics functions removed. You keep the identical body, CAT III 600V rating and every shared accuracy figure, and lose diode test, frequency, duty cycle, a listed backlight and the magnetic strap. Next to the Fluke 101 it adds the 4 A and 10 A current ranges the 101 lacks entirely. Next to the 15B+ it is less than half the weight but gives up µA and mA ranges and a 1000V CAT II rating. Next to the 117 it is a basic tool, not an electrician's daily meter.",
  assessment: [
    {
      heading: "What the 106 measures, and how well",
      body: "Fluke prints one spec table for the 106 and 107, and every function the 106 has matches the 107 to the count. DC volts carry ±(0.5% + 3): a 9 V battery reading 9.20 V on the 60.00 V range is good to about ±0.08 V, enough to separate a fresh battery from a spent one. AC volts between 40 Hz and 500 Hz carry ±(1.0% + 3), so a 240.0 V dryer circuit on the 600.0 V range reads within roughly ±2.7 V. Resistance from 4 kΩ to 4 MΩ is ±(0.5% + 2), and continuity beeps below 70 Ω. One footnote matters: AC accuracy is specified only from 1% to 100% of range, so readings under 0.06 V on the 6.000 V AC range fall outside the published spec."
    },
    {
      heading: "Current ranges and the three-jack layout",
      body: "The 106 has three input jacks, 10 A, COM and V/Ω, and current ranges of 4.000 A and 10.00 A, AC and DC, at ±(1.5% + 3), with AC current specified from 40 Hz to 200 Hz. The finest resolution is 1 mA. That covers a space heater, a pump or a 5 A appliance comfortably: a 5.00 A load on the 10.00 A range reads within about ±0.11 A. It doesn't cover small currents. A 20 mA LED string reads only as 0.020 A, with about ±3 mA of tolerance, and there's no mA or µA range for sensor loops or standby drain. A single 11 A, 1000 V fast fuse protects the current input."
    },
    {
      heading: "Fluke says it isn't for True RMS work",
      body: "Fluke positions the 106 for everyday applications where True RMS accuracy isn't needed, and its spec gives average-responding AC. That's accurate on ordinary utility power. Average-responding meters scale by the sine-wave form factor of about 1.11, a standard textbook figure, so a non-sinusoidal waveform throws the reading off by an amount set by its shape. Variable-speed drives, dimmers and the current drawn by switching power supplies are the common cases. A homeowner checking receptacles rarely meets them; an electrician or HVAC tech meets them weekly, which is why the Fluke 115 and 117 exist."
    },
    {
      heading: "What Fluke doesn't list for the 106",
      body: "Several conveniences people assume are present aren't on Fluke's 106 product page. There is no backlight listed, and Fluke's photo shows no backlight button. Data hold isn't listed either: the verdict above mentions hold, but Fluke's 106 page doesn't, so treat hold as unconfirmed until you see it on the meter. The box contents are TL75 leads and two AAA cells, without the SmartStrap the 107 includes. Fluke cites a 1 m drop rating for the 107 but not for the 106, so its drop rating is Not stated. The 106 page also states no warranty, while Fluke's 106/107 documentation and datasheet give 2 years."
    },
    {
      heading: "Capacitance, battery and size",
      body: "Capacitance runs from 50 nF to 1,000 µF, at ±(2% + 5) on the nanofarad ranges and ±(5% + 5) from 5 µF up. A 100.0 µF motor-run or audio capacitor on the 500.0 µF range reads within about ±5.5 µF, and Fluke's manual warns large values can take up to 18 seconds to settle, so wait before writing the number down. Two AAA cells are rated for at least 200 hours, and the meter powers off after 20 idle minutes. At 142 × 69 × 28 mm and 200 g it is 255 g lighter than a 15B+ and 350 g lighter than a 115, which is the whole case for owning one."
    }
  ],
  alternatives: [
    {
      name: "Fluke 107",
      href: "/multimeters/fluke-107-review",
      reason: "Same body and accuracy plus diode test, frequency, duty cycle, a backlight and listed data hold."
    },
    {
      name: "Fluke 101",
      href: "/multimeters/fluke-106-vs-fluke-101",
      reason: "Lighter at 160 g with diode and frequency, but it can't measure current and has a 1-year warranty."
    },
    {
      name: "Fluke 15B+",
      href: "/multimeters/fluke-15b-plus-vs-fluke-106",
      reason: "µA to 10 A current ranges and diode test in a full-size 455 g case, with a 4,000-count display."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "True RMS, VoltAlert non-contact detection and LoZ mode for electricians who need more than a backup."
    }
  ],
  faqs: [
    {
      question: "Does the Fluke 106 have a diode test?",
      answer: "No. Fluke's 106/107 users manual marks diode test, frequency and duty cycle as 107-only functions. A resistance reading across a diode isn't a reliable substitute, because Fluke doesn't publish the ohms test voltage. If you check LEDs, rectifiers or alternator diodes, buy the Fluke 107 instead."
    },
    {
      question: "Does the Fluke 106 have a backlight or data hold?",
      answer: "Fluke's 106 product page lists neither, and its product photo shows no backlight button. Our verdict on this page mentions data hold, but because Fluke's own 106 page doesn't list it, we treat hold as unconfirmed. Fluke lists both a backlit display and data hold for the 107."
    },
    {
      question: "What warranty does the Fluke 106 come with?",
      answer: "Fluke's 106/107 documentation and the 106 datasheet give a 2-year warranty, the same as the 107. The current US product page for the 106 doesn't state a warranty term at all, so check the paperwork in the box. The full-size Fluke 115 and 117 carry three years."
    },
    {
      question: "Can the Fluke 106 measure amps?",
      answer: "Yes, AC and DC, on 4.000 A and 10.00 A ranges through a separate 10 A jack, at ±(1.5% + 3). The finest resolution is 1 mA and there are no milliamp or microamp ranges, so it suits appliance and heater loads rather than electronics or sensor current."
    },
    {
      question: "Is the Fluke 106 good enough for home electrical checks?",
      answer: "For receptacle voltage, fuses, batteries and appliance continuity, yes: it carries CAT III 600V and the same accuracy as the 107. It isn't True RMS and has no non-contact detector, so for panel troubleshooting or dimmer and LED-driver circuits, a Fluke 117 is the better tool."
    },
    {
      question: "Has OhmSavvy tested the Fluke 106?",
      answer: "No. This page is desk research against Fluke's 106 product page, datasheet and the 106/107 users manual, and the summary box marks it as not bench-tested. The tolerances quoted here are arithmetic on Fluke's published specs, not readings we took."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 106 vs Fluke 107", href: "/multimeters/fluke-106-vs-fluke-107" },
    { label: "Fluke 106 vs Fluke 101", href: "/multimeters/fluke-106-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke 106", href: "/multimeters/fluke-117-vs-fluke-106" },
    { label: "Fluke 15B+ vs Fluke 106", href: "/multimeters/fluke-15b-plus-vs-fluke-106" },
    { label: "Fluke 17B+ vs Fluke 106", href: "/multimeters/fluke-17b-plus-vs-fluke-106" },
    { label: "Fluke 106 vs Fluke 114", href: "/multimeters/fluke-106-vs-fluke-114" },
    { label: "Fluke 106 vs Fluke T5-600", href: "/multimeters/fluke-106-vs-fluke-t5-600" },
    { label: "Best multimeter for home use", href: "/multimeters/best-multimeter-for-home-use" }
  ],
};

export default function Fluke106ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-106-review" />
    </>
  );
}
