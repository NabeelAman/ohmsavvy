// Fluke 117 specs per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (spec tab, checked
// 2026-10-26): 6,000 counts updating 4/s; 33-segment bar graph at 32/s; CAT III 600V; DC V ±(0.5% + 2); AC V True RMS
// ±(1.0% + 3) 45-500 Hz and ±(2.0% + 3) 500 Hz-1 kHz; AutoVolt ±(2.0% + 3); 6.000 A / 10.00 A AC and DC, 20 A for 30 s;
// 40.00 MΩ; 9,999 µF; 50.00 kHz; LoZ mode; VoltAlert non-contact detection; Min/Max/Average; backlight;
// 167 × 84 × 46 mm; 550 g; one 9 V battery, about 400 h without backlight; 3-year warranty.
// The page lists no microamp range (1 mA maximum resolution per its FAQ).
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { localeAlternates } from "@/lib/i18n";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Fluke 117 Review",
  description: "A detailed look at the Fluke 117's True RMS accuracy, CAT III 600V rating, and NCV detection, and who it's actually worth buying for.",
  path: "/multimeters/fluke-117-review",
  languages: localeAlternates("/multimeters/fluke-117-review"),
  image: picks.find((p) => p.name === "Fluke 117")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Fluke 117")!,
  category: "multimeters",
  heading: "Fluke 117 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Electricians and serious hobbyists doing real electrical work",
  imageAlt: "Fluke 117 digital multimeter",
  considerIf: [
    "You work in residential panels and building wiring, where CAT III 600V is the right rating",
    "You want a non-contact voltage detector built into the meter",
    "You chase phantom readings on unused conductors and need a low-impedance (LoZ) mode to load them down",
    "You want a meter durable enough for daily field use, backed by a 3-year Fluke warranty"
  ],
  skipIf: [
    "You only need a meter a few times a year for basic home checks — the premium buys durability casual use won't exercise",
    "You want Bluetooth or app connectivity",
    "You specifically need CAT IV protection — that's what the Fluke 87V is for",
    "You measure sleep currents or sensor loops in microamps; Fluke lists no µA range on the 117"
  ],
  tradeOffs: "You pay a premium over mid-range meters like the Klein Tools MM400 for Fluke's well-documented reliability and the electrician-specific trio of VoltAlert, AutoVolt and LoZ, not for a higher safety rating or extra resolution. Its 6,000-count display and 0.5% DC accuracy are matched on paper by budget meters such as the UNI-T UT139C.",
  assessment: [
    {
      heading: "Safety rating: what CAT III 600V covers",
      body: "CAT III 600V is the rating for distribution-level work inside a building: breaker panels, feeders, fixed wiring, hard-wired motors and lighting circuits. It is the category a residential or light-commercial electrician lives in. What it doesn't cover is the origin of the installation, such as the meter base, service drop or an outdoor feed between buildings; those are CAT IV locations, and that is the line where the 87V or Fluke 179 earns its extra cost. For everyone working downstream of the main breaker, the 117's rating is the correct one rather than a compromise."
    },
    {
      heading: "Accuracy in numbers",
      body: "Fluke specifies DC volts at ±(0.5% + 2 counts) and True RMS AC volts at ±(1.0% + 3 counts) between 45 Hz and 500 Hz. As a worked example from the spec, a 120.0 V AC reading on the 600.0 V range can be off by 1.2 V plus 0.3 V, so about ±1.5 V: plenty for confirming a receptacle, a 240 V dryer circuit or a voltage drop under load. Above 500 Hz the AC figure widens to ±(2.0% + 3), and the automatic AutoVolt function is specified at ±(2.0% + 3), so switch to the dedicated V AC position when the last digit matters."
    },
    {
      heading: "VoltAlert, AutoVolt and LoZ: the electrician's trio",
      body: "These three features are why the 117 exists alongside the cheaper Fluke 115 in the same body. VoltAlert is a go/no-go non-contact detector in the tip of the meter, giving a fast first check before the probes go on. AutoVolt picks AC or DC for you, so one dial position handles a mixed job. LoZ puts a low-impedance load across the leads so capacitively coupled ghost voltage on an open or unused conductor collapses instead of reading as a misleading 40 or 80 volts. That last one saves real time when you're tracing which conductor is actually live in a crowded box."
    },
    {
      heading: "Display, ranges and what's missing",
      body: "The 6,000-count display updates four times a second, and a 33-segment analog bar graph updates 32 times a second, which makes a drifting or fluctuating value easier to follow than the digits alone. Resistance reaches 40 MΩ, capacitance 9,999 µF and frequency 50 kHz, with Min/Max/Average recording for catching a sag while you work. Current is 6 A and 10 A, AC and DC, with a 20 A overload allowed for 30 seconds. There's no microamp range and no thermocouple input on Fluke's spec tab, so electronics benches and HVAC flame-sensor checks are better served by the 87V or a meter with a µA range."
    },
    {
      heading: "Size, battery and warranty",
      body: "At 167 × 84 × 46 mm and 550 g it's a full-size meter, not a pocket one. A single 9 V battery is rated for about 400 hours without the backlight, so most owners change it once or twice a year. Fluke covers the 117 for three years, shorter than the lifetime warranty on the 87V and 179, which is one of the clearest signs of where Fluke positions each meter."
    },
    {
      heading: "Daily handling and build quality",
      body: "This unit was bought by OhmSavvy and hands-on tested, which is why it carries our \"Hands-on Tested\" badge instead of being assessed from its spec sheet alone. Detailed results from that testing aren't published on this page yet; when they are, they'll appear here alongside the method we used, so you can judge them for yourself. Until then, every spec, strength and limitation on this page is checked against Fluke's own published data, and the verdict rests on what those specs mean for the work you'll actually do with the meter."
    }
  ],
  alternatives: [
    {
      name: "Fluke 115",
      href: "/multimeters/fluke-115-review",
      reason: "The same body, 6,000 counts and CAT III 600V without VoltAlert, AutoVolt or LoZ, for field techs who don't need them."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "CAT IV 600V / CAT III 1000V and a 19,999-count high-resolution mode for industrial work."
    },
    {
      name: "Klein Tools MM400",
      href: "/multimeters/klein-mm400-review",
      reason: "The same CAT III 600V rating plus temperature measurement, but not True RMS, and Klein has discontinued it."
    },
    {
      name: "Milwaukee 2235-20",
      href: "/multimeters/milwaukee-2235-20-review",
      reason: "Add a clamp meter if you measure current often."
    }
  ],
  faqs: [
    {
      question: "Is the Fluke 117 good for home electrical work?",
      answer: "Yes. CAT III 600V covers panels and branch circuits, True RMS handles the distorted current drawn by LED drivers and electronics, and VoltAlert gives a quick live-or-dead check. If you only test a battery or an outlet a few times a year, though, a cheaper meter from our home-use guide will do the same basic jobs."
    },
    {
      question: "Fluke 117 or Fluke 87V?",
      answer: "The 117 covers residential and light commercial work and adds VoltAlert and LoZ, which the 87V lacks. The 87V adds CAT IV 600V / CAT III 1000V protection, 0.05% DC accuracy, a 19,999-count high-resolution mode, microamp resolution, temperature and peak capture for industrial and drive work. Choose by where you work, not by price."
    },
    {
      question: "What is the LoZ mode on the Fluke 117 for?",
      answer: "LoZ places a low input impedance across the test leads. A conductor that runs beside a live one can pick up a capacitively coupled voltage that a normal high-impedance meter displays as tens of volts. In LoZ that phantom voltage collapses toward zero, while a genuinely live conductor still reads its full value, so you can tell which wire is really energized."
    },
    {
      question: "Can the Fluke 117 measure microamps or temperature?",
      answer: "Fluke's spec tab lists current only on 6 A and 10 A ranges, with 1 mA as the finest resolution, so it isn't a microamp meter for flame sensors or sleep-current checks. Fluke's product page is inconsistent on temperature, listing it in a comparison table without a matching thermocouple spec, so don't buy the 117 for temperature work."
    },
    {
      question: "Is the Fluke 117 hands-on tested, or based on the spec sheet?",
      answer: "Hands-on tested. OhmSavvy bought this unit and tested it, which is why you'll see a \"Hands-on Tested\" badge on this page. We haven't published detailed test results here yet, and we won't describe findings we haven't published. The specs and assessments on this page are verified against Fluke's own data, and we'll update the review with our results when they're ready."
    },
    {
      question: "How long does the Fluke 117 battery last?",
      answer: "Fluke rates the single 9 V alkaline battery at about 400 hours of typical use with the backlight off. Heavy backlight use shortens that, and so does leaving the dial switched on between jobs, so make turning it off part of packing up. Keep a spare 9 V in the case for jobs where a dead meter means a return trip."
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
      label: "Fluke 115 vs Fluke 117",
      href: "/multimeters/fluke-115-vs-fluke-117"
    },
    {
      label: "Fluke 117 vs Klein Tools MM400",
      href: "/multimeters/fluke-117-vs-klein-mm400"
    },
    {
      label: "Fluke 117 vs Milwaukee 2235-20",
      href: "/multimeters/fluke-117-vs-milwaukee-2235-20"
    },
    {
      label: "Best multimeter for electricians",
      href: "/multimeters/best-multimeter-for-electricians"
    }
  ],
};

export default function Fluke117ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-117-review" />
    </>
  );
}
