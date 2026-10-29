// Fluke 289 specs per the Fluke 289 Pick in src/lib/multimeter-catalog.ts ("Specs per fluke.com (Fluke 289 page), the
// 289 datasheet and the 287/289 Users Manual spec tables") and the manual-sourced "Specs per" comment on
// /multimeters/fluke-289-vs-fluke-287 (Fluke "287/289 True-rms Digital Multimeters Users Manual", Rev. 2, 3/09, as
// hosted by RS Components, checked 2026-10-27). No new sources on this page.
// True RMS AC; 50,000-count ranges (50.000 mV ... 1000.0 V); DC V ±(0.025% + 2) on 500 mV to 50 V, ±(0.03% + 2) on
// 500 V and 1000 V; AC V ±(0.3% + 25) at 45-65 Hz; 500 µA range at 0.01 µA, DC ±(0.075% + 20); 5000 µA at 0.1 µA;
// 50 mA at 0.001 mA; 400 mA; 5 A; 10 A; burden 102 µV/µA, 1.8 mV/mA, 0.04 V/A; resistance 500 Ω (0.01 Ω) to 500 MΩ;
// 289 only: 50 Ω low-ohm range at 0.001 Ω, ±(0.15% + 20), up to 10 mA test current, two-terminal, REL to zero the leads;
// LoZ AC volts with 3.2 kΩ input in the spec table (the manual's caution text says about 3 kΩ); AC low-pass filter
// that blocks above 1 kHz, manual ranging only. Capacitance 1 nF to 100 mF; frequency 0.5 Hz to 999.99 kHz
// ±(0.005% + 5); temperature −200 to +1350 °C ±(1% + 10) excluding probe; Peak 250 µs; MIN MAX; TrendCapture
// on-screen graphs; recording up to 10,000 sample intervals, events up to 15,000 minus intervals; real-time clock;
// IR link to FlukeView Forms; 6 AA, 100 h minimum, 200 h in logging mode; 22.2 × 10.2 × 6.0 cm; 871 g;
// CAT III 1000V / CAT IV 600V; lifetime limited warranty (280 Series).
// Not stated in our sources: probe in the box, IP rating, drop height, logging interval settings, built-in wireless.
// Conflict: /multimeters/fluke-87v-vs-fluke-289 (built from the Pick only) lists weight, battery and warranty as
// "Not stated"; the manual states them and we use the manual. Not hands-on tested: desk research against Fluke's data.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { localeAlternates } from "@/lib/i18n";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 289")!;

export const metadata = buildMetadata({
  title: "Fluke 289 Review",
  description: "Fluke 289 review: 50,000 counts, a 50 Ω range at 1 mΩ, 0.01 µA resolution and TrendCapture logging on the meter, and who doesn't need any of it.",
  path: "/multimeters/fluke-289-review",
  languages: localeAlternates("/multimeters/fluke-289-review"),
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 289 Review",
  productType: "Logging digital multimeter",
  intendedBuyer: "Engineers and senior techs who log, chase microamps or measure milliohms",
  imageAlt: "Fluke 289 True RMS logging multimeter showing the LoΩ 50 Ω dial position",
  considerIf: [
    "You need to watch a supply, sensor or line voltage for hours and see the graph on the meter afterward",
    "You check shunts, contacts or PCB traces and want 1 mΩ resolution without a separate milliohm meter",
    "You measure sleep current or other microamp loads and care about burden voltage",
    "You want 50,000 counts and 0.025% basic DC accuracy in a CAT IV 600V meter",
    "You'd use LoZ and a drive low-pass filter on electrical jobs as well as bench work"
  ],
  skipIf: [
    "You want a light meter for daily panel work: at 871 g on six AA cells it's heavy to carry all day",
    "You only need snapshot readings; the logging and graphing are most of what you're paying for",
    "You need true four-wire Kelvin resistance; the 50 Ω range is two-terminal",
    "You want a phone app or wireless link; our sources list only an IR link to FlukeView Forms"
  ],
  tradeOffs: "The Fluke 287 has the same display, µA range, logging and CAT rating for less, and only lacks the 50 Ω range, LoZ and the low-pass filter. The Fluke 87V is lighter and does the electrician's jobs with peak capture and a filter, but it can't graph or store long recordings. Buy the 289 only if you need both the milliohm range and the on-meter logging.",
  assessment: [
    {
      heading: "What 50,000 counts buys in practice",
      body: "The ranges run 50.000 mV, 500.00 mV, 5.0000 V, 50.000 V, 500.00 V and 1000.0 V. On a 5.0000 V rail the DC spec of ±(0.025% + 2) allows 1.25 mV plus 0.2 mV, about ±1.5 mV. A 6,000-count meter with ±(0.09% + 2), such as the Fluke 179, reads the same rail on its 6.000 V range to about ±6.5 mV. That four-to-one difference matters when you're setting a reference, checking a regulator's tolerance or comparing two supplies; for checking whether a circuit is live, it doesn't."
    },
    {
      heading: "The 50 Ω range: resolution vs accuracy",
      body: "The 289's low-ohm range resolves 0.001 Ω and sources up to 10 mA, and REL subtracts the test-lead resistance. The accuracy is ±(0.15% + 20), so the 20-count term dominates small readings: a 0.100 Ω shunt is allowed about ±0.020 Ω, and a 1.000 Ω trace about ±0.022 Ω. That's ideal for spotting a bad crimp, a cracked trace or a contact that reads 0.150 Ω instead of 0.020 Ω, but it isn't a calibration-grade milliohm meter. Because it's two-terminal, the probe-to-pad contact is in the measurement, so press consistently and zero with REL first."
    },
    {
      heading: "Microamps and burden voltage",
      body: "The 500 µA range reads to 0.01 µA with DC accuracy of ±(0.075% + 20); at 2.00 µA that's roughly ±0.20 µA. Fluke publishes the burden: 102 µV per µA on that range. A 100 µA sleep current therefore drops about 10.2 mV across the meter, and a full-scale 500 µA drops about 51 mV, which a 3.3 V microcontroller usually tolerates. Higher currents move to the 5000 µA, 50 mA, 400 mA, 5 A and 10 A ranges; Fluke lists 1.8 mV per mA for the milliamp inputs and 0.04 V per A for the amp inputs, so pick the lowest range that covers the current."
    },
    {
      heading: "TrendCapture logging: how far 10,000 intervals go",
      body: "Recording memory holds up to 10,000 sample intervals, with events filling the rest of a 15,000-record total. The interval settings aren't stated in our sources, so these are illustrative: at one sample per second, 10,000 intervals is about 2.8 hours; at one per minute it's about 6.9 days. The battery is rated for 200 hours in logging mode, a little over eight days, so for longer runs plan a battery change. TrendCapture plots the recording on the meter's own screen, and the real-time clock timestamps it; the IR link exports it to FlukeView Forms on a PC."
    },
    {
      heading: "Electrical-work features and the rest of the spec",
      body: "LoZ puts a 3.2 kΩ input across the leads (the manual's caution text rounds it to about 3 kΩ) to collapse ghost voltage, and the low-pass filter blocks content above 1 kHz for reading a drive's output, in manual ranging only. AC volts are ±(0.3% + 25) at 45–65 Hz, so 120.00 V reads within about ±0.61 V. Frequency runs from 0.5 Hz to 999.99 kHz, capacitance from 1 nF to 100 mF, temperature from −200 to 1350 °C excluding the probe, and Peak catches events as short as 250 µs. The rating is CAT III 1000V / CAT IV 600V."
    },
    {
      heading: "Size, power and how we assessed it",
      body: "At 22.2 × 10.2 × 6.0 cm and 871 g, the 289 is a large meter, and six AA cells give at least 100 hours of normal use. Fluke covers the 280 Series with a lifetime limited warranty. The Amazon listing we link is sold by a third-party seller, so check the seller before you buy. OhmSavvy hasn't bench-tested the 289; this review is desk research against Fluke's manual and product data, and none of the figures above are our own measurements."
    }
  ],
  alternatives: [
    {
      name: "Fluke 287",
      href: "/multimeters/fluke-289-vs-fluke-287",
      reason: "The same 50,000 counts, 0.01 µA range and TrendCapture logging without the 50 Ω range, LoZ or low-pass filter."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "A lighter field meter with 0.01 µA resolution, peak capture and a drive filter, but no on-meter logging."
    },
    {
      name: "Fluke 179",
      href: "/multimeters/fluke-179-review",
      reason: "Same CAT IV 600V rating in a 420 g, 6,000-count meter with temperature, if you don't need µA, milliohms or logging."
    },
    {
      name: "EEVblog Brymen BM786",
      href: "/multimeters/best-multimeters-for-measuring-microamps",
      reason: "60,000 counts with 0.01 µA and 0.01 Ω resolution and CAT IV 600V, for considerably less than a Fluke 287."
    }
  ],
  faqs: [
    {
      question: "What's the difference between the Fluke 287 and 289?",
      answer: "Fluke's manual marks three features as Model 289 only: the 50 Ω low-ohm range at 0.001 Ω, LoZ AC volts and the AC low-pass filter. Everything else, including 50,000 counts, the 500 µA range, 100 mF capacitance, TrendCapture logging, CAT IV 600V and the lifetime limited warranty, is shared."
    },
    {
      question: "Can the Fluke 289 replace a milliohm meter?",
      answer: "For finding bad joints, contacts and traces, often yes: it resolves 1 mΩ with REL lead zeroing. It's a two-terminal measurement with ±(0.15% + 20) accuracy, though, so a 0.100 Ω reading carries about ±0.020 Ω. For calibrated low-resistance work, a four-wire Kelvin instrument is still the right tool."
    },
    {
      question: "How long can the Fluke 289 log for?",
      answer: "Memory holds up to 10,000 sample intervals, and the battery is rated for 200 hours in logging mode. How long a recording lasts depends on the interval you choose, which our sources don't list. As an illustration, one sample per minute would fill memory in about 6.9 days, inside the battery rating."
    },
    {
      question: "Does the Fluke 289 have Bluetooth?",
      answer: "Our sources, including Fluke's 287/289 manual, list no built-in wireless. The 289 exports recordings through an infrared link to FlukeView Forms on a PC. If you want readings on a phone, Fluke's FC models such as the 3000 FC use Fluke Connect, but the 3000 FC lists no logging memory in the meter itself."
    },
    {
      question: "Is the Fluke 289 good for electricians?",
      answer: "It can do the job: CAT IV 600V / CAT III 1000V, LoZ, a low-pass filter and 10 A current. For daily panel work, though, its 871 g weight and logging-focused price are hard to justify. Electricians who need to record a sag or nuisance trip over a shift get the most from it."
    },
    {
      question: "What batteries does the Fluke 289 use?",
      answer: "Six AA cells. Fluke rates them for at least 100 hours of normal use and 200 hours in logging mode. Keep a fresh set with the meter before starting a multi-day recording, since a flat battery ends the log, and check the battery indicator before you leave the meter unattended."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 289 vs Fluke 287", href: "/multimeters/fluke-289-vs-fluke-287" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 115", href: "/multimeters/fluke-289-vs-fluke-115" },
    { label: "Fluke 1587 FC vs Fluke 289", href: "/multimeters/fluke-1587-fc-vs-fluke-289" },
    { label: "Fluke 3000 FC vs Fluke 289", href: "/multimeters/fluke-3000-fc-vs-fluke-289" },
    { label: "Fluke 283 FC vs Fluke 289", href: "/multimeters/fluke-283-fc-vs-fluke-289" },
    { label: "Best multimeters for measuring low resistance", href: "/multimeters/best-multimeters-for-measuring-low-resistance" },
    { label: "Best multimeters for measuring microamps", href: "/multimeters/best-multimeters-for-measuring-microamps" }
  ],
};

export default function Fluke289ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-289-review" />
    </>
  );
}
