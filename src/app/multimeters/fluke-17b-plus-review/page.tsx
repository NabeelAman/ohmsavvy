// Fluke 17B+ specs per the Pick ("Specs per fluke.com (17B+ page) and the Fluke 15B+/17B+ datasheet and users manual")
// and the source notes already cited on /multimeters/fluke-17b-plus-vs-fluke-15b-plus, /multimeters/fluke-17b-plus-vs-fluke-117
// and /multimeters/fluke-17b-plus-vs-fluke-179 (fluke.com 17B+ spec tab and the 15B+/17B+/18B+ users manual, checked
// 2026-10-26/27): no True RMS claim; 4,000 counts, 3 updates/s, backlit; DC V 400.0 mV to 1000 V ±(0.5% + 3); AC V 40-500 Hz
// ±(1.0% + 3); current 400.0 µA, 4000 µA, 40.00 mA, 400.0 mA, 4.000 A, 10.00 A, all ±(1.5% + 3), AC 40-400 Hz; resistance
// 400.0 Ω to 40.00 MΩ; capacitance 40.00 nF to 1000 µF; frequency 10 Hz-100 kHz ±(0.1% + 3) (ranges 50.00 Hz to 100.0 kHz);
// duty cycle 1-99%; temperature -55 to 400 °C, 0.1 °C resolution, ±(2% + 1 °C) at 50-400 °C, ±2 °C at 0-50 °C,
// ±(9% + 2 °C) below 0 °C, Type-K probe included (model not named); diode 2.000 V; input >10 MΩ; fuses 440 mA and 11 A,
// 1000 V; 2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40. Safety: the fluke.com page gives CAT III 600V with
// 1000 V maximum terminal to earth; CAT II 1000V comes from the 15B+/17B+ datasheet (as on the Pick).
// Users manual: one-year warranty (the fluke.com page states no term); continuity beeps below 70 Ω; auto power off after
// 20 min, backlight off after 2 min; hazardous-voltage LED (17B+ only) at 30 V or more or OL; relative mode not available on
// frequency, resistance, continuity, duty cycle or diode; MIN MAX not available on resistance, capacitance, frequency,
// duty cycle or diode. Amazon listing photo shows the newer 17B MAX (per the Pick). Drop rating and surge figure: not stated
// in our sources. Worked accuracy figures below are arithmetic on these published specs, not measurements.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 17B+")!;

export const metadata = buildMetadata({
  title: "Fluke 17B+ Review",
  description: "Fluke 17B+ review: Type K temperature, frequency, MIN MAX and a microamp range in a CAT III 600V Fluke, and when its lack of True RMS matters.",
  path: "/multimeters/fluke-17b-plus-review",
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 17B+ Review",
  productType: "Digital multimeter",
  intendedBuyer: "Electronics hobbyists, students and appliance repair",
  imageAlt: "Fluke 17B+ digital multimeter, front view",
  considerIf: [
    "You want a Fluke-branded meter in the budget-to-entry tier that still reads temperature with the supplied Type K probe",
    "You check small currents: the lowest current range is 400.0 µA with 0.1 µA resolution",
    "You need frequency to 100 kHz and duty cycle for PWM, fans or simple control signals",
    "You like MIN MAX recording and a relative (zero-offset) mode on volts and current",
    "You want a warning LED that lights at 30 V or more as a second cue that the probes are on something dangerous"
  ],
  skipIf: [
    "You measure VFD outputs, LED drivers or other non-sinusoidal AC, where Fluke makes no True RMS claim for this meter",
    "Your work includes the service entrance or meter base, which calls for a CAT IV rating it doesn't carry",
    "You want a built-in non-contact voltage detector or a LoZ ghost-voltage mode",
    "A long warranty is part of why you buy Fluke: the users manual gives one year, not three or lifetime",
    "You only ever check outlets and batteries, where the simpler Fluke 15B+ covers the same volts, amps and ohms"
  ],
  tradeOffs: "The 17B+ trades True RMS and Fluke's longer warranties for breadth. Against the Fluke 115 and 117 you gain a microamp range, temperature, duty cycle and a 100 kHz frequency limit, but lose True RMS, the 6,000-count display, a three-year warranty and (on the 117) VoltAlert and LoZ. Against a True RMS budget meter such as the UNI-T UT139C you're mostly paying for Fluke's documented safety design and fusing rather than for better accuracy on paper.",
  assessment: [
    {
      heading: "Measurement range: wider than its price tier suggests",
      body: "Few meters in the entry tier cover this much ground. Voltage runs from a 400.0 mV range up to 1000 V. Current is split across six ranges, from 400.0 µA to 10.00 A, protected by a 440 mA fuse on the µA/mA jack and an 11 A fuse on the amps jack, both rated 1000 V. Resistance reaches 40.00 MΩ, capacitance 1,000 µF, frequency 100 kHz and duty cycle 1 to 99%. Add diode test, continuity and temperature from -55 to 400 °C, and the 17B+ handles nearly every routine check on a workbench or in an appliance, without a second meter."
    },
    {
      heading: "What 4,000 counts and ±(0.5% + 3) mean on real readings",
      body: "Fluke lists DC volts at ±(0.5% + 3 counts). A 12.00 V battery reading on the 40.00 V range can be off by 0.06 V plus 0.03 V, so about ±0.09 V: fine for judging state of charge, too coarse for millivolt drift work. AC volts are ±(1.0% + 3) from 40 to 500 Hz; a 120.0 V outlet on the 400.0 V range carries about ±1.5 V. The 4,000-count limit shows up at the top end: anything above 399.9 V moves to the 1000 V range with 1 V steps, so a 480 V reading has no decimal place. A 6,000-count Fluke 115 or 117 keeps 0.1 V resolution up to 600.0 V."
    },
    {
      heading: "Not True RMS: where that costs you",
      body: "Fluke's product page and datasheet make no True RMS claim for the 17B+. On a clean utility sine wave that rarely matters, because the meter is calibrated for that shape. It matters on waveforms that aren't sinusoidal: the output of a variable-speed drive, current drawn by switch-mode power supplies, dimmers and LED drivers, or a chopped signal from a controller. On those, a non-True-RMS meter can read noticeably high or low, and nothing on the display warns you. If you diagnose modern HVAC, drives or electronic loads, the 115, 117 or 179 are the safer choice."
    },
    {
      heading: "Temperature, frequency and microamps in practice",
      body: "The bundled Type K probe makes the 17B+ useful for supply-air and return-air checks, heat sinks and soldering-adjacent work. Fluke specifies ±2 °C between 0 and 50 °C, and ±(2% + 1 °C) from 50 to 400 °C, so a 200.0 °C reading carries about ±5 °C. Frequency is ±(0.1% + 3); 60.0 Hz on the 500.0 Hz range works out to about ±0.4 Hz. On the 400.0 µA range, a 4.0 µA reading carries 0.06 µA plus three 0.1 µA counts, about ±0.36 µA. That's adequate for a flame-sensor or sleep-current check, which is something the Fluke 115 and 117 can't do at all."
    },
    {
      heading: "MIN MAX, relative mode and the 30 V warning LED",
      body: "MIN MAX and relative are the two features that separate the 17B+ from the otherwise identical 15B+, and both have limits the users manual spells out. MIN MAX doesn't work on resistance, capacitance, frequency, duty cycle or diode. Relative mode is excluded on frequency, resistance, continuity, duty cycle and diode, so it can't null test-lead resistance for low-ohm work; use it to watch a voltage or current change against a baseline instead. The hazardous-voltage LED lights at 30 V or more, or on an overload, which is a useful extra cue when the display is in an unexpected range."
    },
    {
      heading: "Safety rating, build, battery and warranty",
      body: "Fluke's product page lists CAT III 600V with a 1000 V maximum from any terminal to earth, while the 15B+/17B+ datasheet adds a CAT II 1000V rating; both appear on our spec table, and neither is CAT IV. The case measures 183 × 91 × 49.5 mm, weighs 455 g and is rated IP40, so it isn't sealed against water. Two AA cells give at least 500 hours, helped by a 20-minute auto power off and a backlight that times out after two minutes. Fluke's US page states no warranty term; the users manual gives one year. A drop rating isn't stated in our sources. One buying note: the Amazon listing's photo shows the newer 17B MAX, so check which model the listing actually ships."
    }
  ],
  alternatives: [
    {
      name: "Fluke 15B+",
      href: "/multimeters/fluke-15b-plus-review",
      reason: "The same case, ratings and µA-to-10 A ranges without temperature, frequency, duty cycle, MIN MAX, relative or the 30 V LED."
    },
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "True RMS and 6,000 counts with Min/Max/Avg and a three-year warranty, but no microamp range and no temperature."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "True RMS plus VoltAlert non-contact detection and LoZ for electricians; current starts at 6 A with 1 mA resolution."
    },
    {
      name: "Fluke 179",
      href: "/multimeters/fluke-17b-plus-vs-fluke-179",
      reason: "True RMS, temperature and a CAT IV 600V / CAT III 1000V rating with a lifetime warranty, for industrial and HVAC work."
    },
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "A cheaper True RMS, 6,000-count, CAT III 600V meter if brand matters less than the AC measurement method."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 17B+ True RMS?",
      answer: "Fluke doesn't describe it as True RMS on its product page or datasheet, so treat it as a meter calibrated for sine waves. Utility voltage at an outlet reads normally. Distorted waveforms from drives, LED drivers or switch-mode supplies can read high or low, so pick the Fluke 115, 117 or 179 if that work is routine."
    },
    {
      question: "What does the 17B+ add over the Fluke 15B+?",
      answer: "Per the shared users manual, the 17B+ adds temperature with an included Type K probe, frequency to 100 kHz, duty cycle, MIN MAX recording, relative mode and a hazardous-voltage LED that lights at 30 V or more. Everything else, including the case, CAT ratings, 4,000-count display, current ranges and one-year warranty, is shared between the two meters."
    },
    {
      question: "Can the Fluke 17B+ measure microamps for a furnace flame sensor?",
      answer: "Yes, on paper. Its lowest current range is 400.0 µA with 0.1 µA resolution, at ±(1.5% + 3 counts). A 4.0 µA reading works out to roughly ±0.36 µA. Put the meter in series with the sensor lead through the µA/mA jack, and check the furnace maker's specified current rather than a generic number."
    },
    {
      question: "Can I use the Fluke 17B+ on a breaker panel?",
      answer: "Inside a building's distribution system, yes: it carries CAT III 600V, the category for panels, feeders and fixed wiring. It isn't rated CAT IV, so don't use it at the meter base, service drop or utility side. Wear suitable protective gear, confirm the meter on a known live source first, and call an electrician for work you aren't qualified to do."
    },
    {
      question: "What warranty does the Fluke 17B+ have?",
      answer: "One year, according to the Fluke 15B+/17B+/18B+ users manual. Fluke's US product page doesn't state a warranty term. That's shorter than the three-year coverage on the Fluke 115 and 117 and the lifetime warranty on the 87V and 179, so factor it in if you expect heavy daily use."
    },
    {
      question: "Has OhmSavvy hands-on tested the Fluke 17B+?",
      answer: "No. This review is desk research: every figure comes from Fluke's product page, datasheet or users manual, and the worked accuracy numbers are arithmetic on those published specs, not bench measurements. The rating is our editorial score from that research, and we'll update the page if the meter is bought and tested."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 17B+ vs Fluke 115", href: "/multimeters/fluke-17b-plus-vs-fluke-115" },
    { label: "Fluke 17B+ vs Fluke 117", href: "/multimeters/fluke-17b-plus-vs-fluke-117" },
    { label: "Fluke 17B+ vs Fluke 87V", href: "/multimeters/fluke-17b-plus-vs-fluke-87v" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 106", href: "/multimeters/fluke-17b-plus-vs-fluke-106" },
    { label: "Fluke 17B+ vs Fluke 107", href: "/multimeters/fluke-17b-plus-vs-fluke-107" },
    { label: "Fluke 17B+ vs Fluke 101", href: "/multimeters/fluke-17b-plus-vs-fluke-101" },
    { label: "Fluke 17B+ vs Fluke T5-600", href: "/multimeters/fluke-17b-plus-vs-fluke-t5-600" },
    { label: "Multimeter buying guide", href: "/multimeters/multimeter-buying-guide" }
  ],
};

export default function Fluke17BPlusReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-17b-plus-review" />
    </>
  );
}
