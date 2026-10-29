// Fluke 179 specs per the Fluke 179 Pick in src/app/multimeters/best-multimeters/page.tsx ("Specs per fluke.com (Fluke
// 179 product page) and the Fluke 170 Series datasheet") and the Fluke-sourced "Specs per" comments already in this
// repo: /multimeters/fluke-177-vs-fluke-179 and /multimeters/fluke-117-vs-fluke-179 (fluke.com 179 page and spec tab,
// checked 2026-10-26/27), /multimeters/fluke-87v-vs-fluke-179 and /multimeters/fluke-175-vs-fluke-179 (170 Series
// detailed specifications, Fluke Pub 10824-eng). No new sources on this page.
// True RMS; 6,000 counts with a 33-segment analog bar graph; backlight; DC V ±(0.09% + 2); AC V ±(1.0% + 3);
// DC A ±(1.0% + 3); AC A ±(1.5% + 3); 10 A max, 0.01 mA best resolution, no µA range; 50 MΩ ±(0.9% + 1);
// 1 nF to 10,000 µF ±(1.2% + 2); 100 kHz ±(0.1% + 1); temperature −40 to 400 °C ±(1.0% + 10), 0.1 °C resolution,
// 80BK probe in the box; Hold, Auto Hold, Min/Max-Average; auto-ranging with manual override; CAT III 1000V /
// CAT IV 600V; one 9 V, about 200 h; 43 × 90 × 185 mm; 420 g; lifetime warranty. No LoZ, NCV or low-pass filter listed.
// Conflicts on Fluke's own 179 page: its comparison table says 9,999 µF, "−40 °C to 400 °F" and lists µA, while the
// spec table gives 10,000 µF, −40 to 400 °C and 0.01 mA best resolution; we follow the spec table.
// 80BK probe range: /multimeters/fluke-87v-vs-fluke-179 gives −40 to 260 °C; the 179 page itself doesn't state it.
// IP rating and drop height: not stated in our sources. Not hands-on tested: desk research against Fluke's specs.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { localeAlternates } from "@/lib/i18n";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 179")!;

export const metadata = buildMetadata({
  title: "Fluke 179 Review",
  description: "Fluke 179 review: True RMS, CAT IV 600V, a 6,000-count backlit display and a thermocouple input, and when the 117, 87V or 289 is the better buy.",
  path: "/multimeters/fluke-179-review",
  languages: localeAlternates("/multimeters/fluke-179-review"),
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 179 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Maintenance techs, HVAC and electronics users who want temperature in a CAT IV meter",
  imageAlt: "Fluke 179 True RMS digital multimeter with backlit display and rotary dial",
  considerIf: [
    "You work at or near the service entrance, where Fluke's CAT IV 600V rating applies",
    "You want temperature readings from the same meter, using the 80BK thermocouple Fluke ships with it",
    "You read 4–20 mA loops or other milliamp signals and 0.01 mA resolution is enough",
    "You like a backlit 6,000-count display with an analog bar graph for watching a value move",
    "You want a meter you buy once, covered by Fluke's lifetime warranty"
  ],
  skipIf: [
    "You need microamps for flame sensors or sleep current: the finest step is 0.01 mA, and there's no µA range",
    "You want a built-in non-contact voltage detector or a LoZ mode for ghost voltage; the Fluke 117 has both",
    "You troubleshoot variable-speed drives and want a low-pass filter or peak capture, which point to the 87V",
    "You want to log readings over hours or days on the meter itself"
  ],
  tradeOffs: "Compared with the Fluke 117, you give up VoltAlert and LoZ and gain CAT IV 600V, a mA range, temperature and a lifetime warranty. Compared with the 87V, you give up the 19,999-count mode, µA resolution, peak capture and the drive filter. Fluke's own 177 is the same meter without the thermocouple input, so the 179 only makes sense if you'll actually use temperature.",
  assessment: [
    {
      heading: "Where the 179 sits in Fluke's 170 series",
      body: "The 175, 177 and 179 share one 43 × 90 × 185 mm, 420 g body, the same 6,000-count display with a 33-segment bar graph, and the same CAT III 1000V / CAT IV 600V rating. The 175 has no backlight and a looser DC volts spec of ±(0.15% + 2). The 177 tightens that to ±(0.09% + 2) and adds the backlight. The 179 keeps everything the 177 has and adds a temperature function with the 80BK thermocouple in the box. That makes the buying question simple: if you'd otherwise carry a separate thermometer, the 179 is worth it; if not, the 177 is the same instrument."
    },
    {
      heading: "Accuracy, worked through",
      body: "On a 12.00 V DC reading the spec allows 0.09% of reading plus 2 counts: about 0.011 V plus 0.02 V, so roughly ±0.03 V, which is tight enough for battery state-of-charge and control-voltage checks. On 120.0 V AC the ±(1.0% + 3) figure gives 1.2 V plus 0.3 V, about ±1.5 V. A 20.00 mA loop signal is allowed ±(1.0% + 3), or 0.20 mA plus 0.03 mA, about ±0.23 mA, roughly 1.4% of a 16 mA span. These use Fluke's best-accuracy lines, so treat them as best-case figures rather than per-range guarantees."
    },
    {
      heading: "Temperature: what the probe changes",
      body: "Fluke rates the meter's temperature function from −40 to 400 °C at ±(1.0% + 10) with 0.1 °C resolution. At 60.0 °C that's 0.6 °C plus 1.0 °C, so about ±1.6 °C, before anything the probe adds. The included 80BK is a bead thermocouple, and its own range isn't stated on the 179 page; another Fluke figure cited on our site puts it at −40 to 260 °C, so check the probe before measuring anything near the meter's 400 °C limit. Fluke's comparison table also prints the upper limit as \"400 °F\"; the spec table says 400 °C, and that's the figure we use."
    },
    {
      heading: "Current: milliamps yes, microamps no",
      body: "The 179 measures up to 10 A, with 0.01 mA as its finest current step. That's enough for 4–20 mA loops and relay coil current, but it is 10 µA per digit. A flame-rectification signal of a few microamps would display as 0.00 or 0.01 mA, which tells you almost nothing. Fluke's comparison table lists µA as an extra function, but the spec table does not support that, so don't buy the 179 for microamp work; the 87V and 289 both resolve 0.01 µA."
    },
    {
      heading: "Display, ranges and recording",
      body: "Six thousand counts means 6.000 V, 60.00 V and 600.0 V ranges, so a 230 V reading shows one decimal place. The bar graph is the useful part for tuning or watching a fluctuating value, and the backlight helps in panels and crawl spaces. Resistance reaches 50 MΩ at ±(0.9% + 1), capacitance runs from 1 nF to 10,000 µF at ±(1.2% + 2) (Fluke's comparison table says 9,999 µF), and frequency reaches 100 kHz at ±(0.1% + 1). Min/Max-Average records the extremes while you work, and you can override auto-ranging when it hunts."
    },
    {
      heading: "Battery, size and warranty",
      body: "One 9 V battery is rated for about 200 hours without the backlight, half the 117's figure, so keep a spare in the case. At 420 g the 179 is lighter than the 117's 550 g. Fluke covers it for life, compared with three years on the 117. Fluke's pages don't state an IP rating or drop height for the 179, so we can't compare its ruggedness on paper. We haven't bench-tested this unit; everything above is desk research against Fluke's published specifications."
    }
  ],
  alternatives: [
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "For residential electricians: VoltAlert, AutoVolt and LoZ, but CAT III 600V only and no mA range or temperature."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "Same CAT IV 600V rating, plus 0.01 µA resolution, peak capture, a low-pass filter and a 19,999-count mode."
    },
    {
      name: "Fluke 177",
      href: "/multimeters/fluke-177-vs-fluke-179",
      reason: "The 179 without temperature: same display, accuracy, ranges and lifetime warranty."
    },
    {
      name: "Fluke 289",
      href: "/multimeters/fluke-289-review",
      reason: "50,000 counts, µA and milliohm ranges and on-meter logging, at a much higher price and 871 g."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 179 still worth buying?",
      answer: "Yes, if you'll use what separates it from cheaper meters: CAT IV 600V, a mA range and the thermocouple input. If you only do house wiring, the Fluke 117's LoZ and non-contact detector are more useful day to day."
    },
    {
      question: "Does the Fluke 179 measure microamps?",
      answer: "No. Fluke's spec table gives 0.01 mA as the finest current resolution, which is 10 µA per digit. The comparison table on the same Fluke page lists µA, but that conflicts with the spec table. For HVAC flame sensors or battery sleep current, choose a meter with a real µA range such as the 87V."
    },
    {
      question: "What temperature probe comes with the Fluke 179?",
      answer: "Fluke ships the 80BK bead thermocouple with the 179, along with test leads, a 9 V battery and a quick reference guide. The meter reads −40 to 400 °C, but the probe has its own rating, which the 179 page doesn't state. Another Fluke figure we cite puts the 80BK at −40 to 260 °C."
    },
    {
      question: "What's the difference between the Fluke 177 and 179?",
      answer: "Only temperature. Both have the same body, 6,000-count backlit display with bar graph, DC accuracy of ±(0.09% + 2), 10 A and 0.01 mA current, 50 MΩ, 10,000 µF, 100 kHz, CAT IV 600V and a lifetime warranty. The 179 adds the thermocouple function and the 80BK probe."
    },
    {
      question: "Can the Fluke 179 be used on a service entrance?",
      answer: "It's rated CAT IV 600V, the category for the origin of an installation such as the meter base and service conductors, and CAT III 1000V for distribution work. The rating covers the meter; your test leads must carry a matching rating, and the usual PPE and live-work rules still apply."
    },
    {
      question: "How long does the Fluke 179 battery last?",
      answer: "Fluke rates the single 9 V battery at about 200 hours without the backlight. Heavy backlight use cuts that, so a meter that lives in a dark panel or attic will need batteries more often. The 117 is rated for about 400 hours, if long runtime matters more than the 179's extra functions."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    { label: "Fluke 117 vs Fluke 179", href: "/multimeters/fluke-117-vs-fluke-179" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Fluke 177 vs Fluke 179", href: "/multimeters/fluke-177-vs-fluke-179" },
    { label: "Fluke 175 vs Fluke 179", href: "/multimeters/fluke-175-vs-fluke-179" },
    { label: "Fluke 289 vs Fluke 179", href: "/multimeters/fluke-289-vs-fluke-179" },
    { label: "Fluke 287 vs Fluke 179", href: "/multimeters/fluke-287-vs-fluke-179" },
    { label: "Fluke 88V vs Fluke 179", href: "/multimeters/fluke-88v-vs-fluke-179" },
    { label: "Fluke 116 vs Fluke 179 for HVAC", href: "/multimeters/fluke-116-vs-fluke-179" },
    { label: "Fluke 113 vs Fluke 179", href: "/multimeters/fluke-113-vs-fluke-179" },
    { label: "Fluke 17B+ vs Fluke 179", href: "/multimeters/fluke-17b-plus-vs-fluke-179" },
    { label: "Fluke 27 II vs Fluke 179", href: "/multimeters/fluke-27-ii-vs-fluke-179" },
    { label: "Fluke 77 IV vs Fluke 179", href: "/multimeters/fluke-77-iv-vs-fluke-179" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" }
  ],
};

export default function Fluke179ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-179-review" />
    </>
  );
}
