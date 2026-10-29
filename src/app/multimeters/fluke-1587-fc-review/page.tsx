// Fluke 1587 FC specs per this repo's Pick (src/lib/multimeter-catalog.ts: fluke.com 1587 FC product/spec page, the
// 1587 FC/1577 technical data sheet 6005917 and the official Amazon listing B017OVC2UI, bare meter; I400, 62MAX+ and
// MDT kits are separate ASINs) and the "Specs per" notes on /multimeters/fluke-1587-fc-vs-fluke-87v,
// /multimeters/fluke-1577-vs-fluke-1587-fc and /multimeters/fluke-1587-fc-vs-fluke-289 (checked 2026-10-27/28):
// insulation test 50/100/250/500/1000 V (+20%/-0%), 0.01 MΩ to 2 GΩ (0.6-2.0 GΩ only at 1000 V); 1 mA nominal test
// current (at 50 kΩ, 100 kΩ, 250 kΩ, 500 kΩ and 1 MΩ respectively); accuracy ±(3% + 5) at 50/100 V, ±(1.5% + 5) at
// 250-1000 V, ±(10% + 3) for 0.6-2.0 GΩ; inhibits the test above 30 V on the terminals; auto discharge <0.5 s for
// 1 µF or less; max capacitive load 1 µF; PI/DAR timed ratio tests with TrendIt graphs, app memory and temperature
// compensation over Fluke Connect (2.4 GHz); remote probe. Meter: 6000-count backlit display; True RMS AC; DC V
// ±(0.09% + 2), 10 MΩ input; AC V ±(1% + 3) at 50-60 Hz, ±(2% + 3) to 5 kHz; low-pass filter; current 60 mA and
// 400 mA AC/DC only (DC ±(0.2% + 2), AC ±(1.5% + 2)), 600 mA for 2 min max overload, 0.44 A 1000 V fuse, no 10 A
// input; resistance 0.1 Ω to 50 MΩ; capacitance to 9999 µF; frequency to 99.99 kHz; temperature -40 to 537 °C
// ±(1% + 10), K-type thermocouple included; continuity below about 25 Ω; CAT IV 600V / CAT III 1000V; IP40
// (non-operating); operating -20 to 55 °C; 4 x AA, 1000 h meter use and at least 1000 insulation tests (1000 V into
// 1 MΩ, 5 s on / 25 s off); 5.0 x 10.0 x 20.3 cm; three-year warranty (extendable to five with registration within
// 45 days per the data sheet, "offer may be discontinued without notice"). Drop rating not stated.
// Conflicts stated on the page: weight 550 g (Fluke) vs 1645 g (Amazon item weight); fluke.com lists both a soft and a
// hard case. PI (10-minute / 1-minute) and DAR (60 s / 30 s) definitions and the "PI of 2.0 or more" guideline
// commonly cited from IEEE 43 are standard engineering values, hedged. The 0.1 V step on the 600 V range is our
// inference from the 6000-count display. Worked figures are arithmetic on published specs or labeled illustrative.
// Pick rating 4.6; not hands-on tested by OhmSavvy. No prices.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { localeAlternates } from "@/lib/i18n";
import { getAllPicks } from "@/lib/catalog";

const pick = getAllPicks("multimeters").find((p) => p.name === "Fluke 1587 FC")!;

export const metadata = buildMetadata({
  title: "Fluke 1587 FC Review",
  description: "Fluke 1587 FC review: 50–1000 V insulation tests to 2 GΩ, PI/DAR ratios and app logging, plus the 400 mA current ceiling to weigh first.",
  path: "/multimeters/fluke-1587-fc-review",
  languages: localeAlternates("/multimeters/fluke-1587-fc-review"),
  image: pick.image,
});

const review: ProductReviewContent = {
  pick,
  category: "multimeters",
  heading: "Fluke 1587 FC Review",
  productType: "Insulation multimeter",
  intendedBuyer: "Maintenance electricians and motor techs who prove insulation as well as measure volts",
  imageAlt: "Fluke 1587 FC insulation multimeter with its insulation test button and rotary dial",
  considerIf: [
    "You megger motors, cables or switchgear and want the insulation tester and the DMM in one 4 × AA body",
    "You need test voltages below 500 V, such as 50 V or 100 V for low-voltage control wiring and sensitive equipment",
    "You trend winding insulation over time and want PI and DAR results saved to a phone through Fluke Connect",
    "You check drive outputs and want a low-pass filter plus a K-type thermocouple input on the same meter"
  ],
  skipIf: [
    "You measure motor or branch-circuit current through the leads: there is no 10 A jack, and the top range is 400 mA",
    "You never perform insulation-resistance tests; a general meter like the Fluke 87V fits that work better",
    "Your site is wet or dusty, since the case is rated only IP40 (non-operating)",
    "You only ever test at 500 V or 1000 V and readings past 600 MΩ don't matter to you, which is the Fluke 1577's territory"
  ],
  tradeOffs: "The 1587 FC swaps the high-current input and lifetime warranty of a general meter like the Fluke 87V for a built-in megohmmeter with five test voltages and app-based PI/DAR records. Against its sibling, the Fluke 1577, you get 50, 100 and 250 V settings, a 2 GΩ ceiling instead of 600 MΩ, tighter DC volts accuracy and capacitance, temperature and frequency functions. The cost of that combination is a meter that can't read more than 400 mA, so most owners pair it with a clamp meter.",
  assessment: [
    {
      heading: "Insulation testing: voltages, ranges and accuracy",
      body: "Fluke lists five test voltages (50, 100, 250, 500 and 1000 V) with a +20% / −0% tolerance, so the applied voltage is never below the setting. Each range has its own ceiling: 50 MΩ at 50 V, 100 MΩ at 100 V, 250 MΩ at 250 V, 500 MΩ at 500 V, and 600 MΩ at 1000 V, extending to 2 GΩ at 1000 V only. Accuracy is ±(1.5% + 5 counts) at 250 V and above, so a 200 MΩ result at 500 V carries about ±3 MΩ plus five counts. Above 600 MΩ the band widens to ±(10% + 3): a 1.50 GΩ reading means roughly 1.35 to 1.65 GΩ. That's fine for pass/fail and for trending, but treat the gigohm figures as indicative rather than precise. Nominal test current is 1 mA."
    },
    {
      heading: "Safety first: how to run an insulation test",
      body: "An insulation test puts up to 1000 V (plus the 20% tolerance) on the conductor, so it belongs only on equipment that is de-energized, locked out and tagged out, and only in the hands of a qualified person trained for the task. Verify absence of voltage with a rated meter first. The 1587 FC refuses to start if it sees more than 30 V on its terminals, but that interlock is a backstop, not a substitute for lockout/tagout. Disconnect drives, surge protection and electronics that the test voltage could damage, keep hands off the leads and the circuit while the test runs, and let the circuit discharge afterward. Fluke specifies automatic discharge in under 0.5 s for 1 µF or less, with 1 µF as the maximum capacitive load, so long cable runs may hold charge longer: confirm zero volts before touching anything. If you aren't trained for this work, hire a licensed electrician."
    },
    {
      heading: "PI, DAR and Fluke Connect records",
      body: "A single megohm reading tells you about one moment; the polarization index (the 10-minute reading divided by the 1-minute reading) and the dielectric absorption ratio (60 s over 30 s) show whether insulation keeps improving as it charges. As an illustrative example, 400 MΩ at one minute and 1,000 MΩ at ten minutes gives a PI of 2.5, above the 2.0 figure commonly cited from IEEE 43 for most motor insulation classes. The meter runs these timed tests itself, and over Fluke Connect the app stores results, plots them with TrendIt graphs and applies temperature compensation, which matters because insulation resistance falls as windings warm. On-meter logging memory isn't stated in our sources, so plan on using the phone app for records."
    },
    {
      heading: "The multimeter side, in numbers",
      body: "As a meter it's a 6000-count True RMS unit with ±(0.09% + 2) DC volts. On the 600 V range that resolves 0.1 V, so a 480.0 V DC reading is good to about ±0.63 V (0.432 V plus two counts). AC volts are ±(1% + 3) at 50–60 Hz, widening to ±(2% + 3) up to 5 kHz, and a low-pass filter helps on variable-frequency drive outputs. Resistance runs from 0.1 Ω to 50 MΩ, capacitance to 9999 µF, frequency to 99.99 kHz and temperature from −40 to 537 °C at ±(1% + 10) with the included K-type probe. The safety rating is CAT IV 600V / CAT III 1000V."
    },
    {
      heading: "The current limit and other gaps",
      body: "Current is the weak point. Fluke lists only 60 mA and 400 mA ranges, AC and DC, protected by a 0.44 A fuse and allowed a 600 mA overload for two minutes at most. That covers control circuits and 4–20 mA loops, but a fractional-horsepower motor drawing 1.5 A is already almost four times the top range, so running current needs a clamp meter. Kits that add the I400, 62MAX+ or MDT accessories have their own Amazon listings; the one we link is the bare meter. The case is IP40 in non-operating conditions, the drop rating isn't stated, and the warranty is three years, extendable to five with registration within 45 days according to the data sheet, an offer Fluke says may end without notice."
    },
    {
      heading: "Battery life, size and spec conflicts",
      body: "Four AA cells are rated for 1000 hours of meter use and at least 1000 insulation tests, which Fluke defines as 1000 V into 1 MΩ, 5 seconds on and 25 off. The body measures 5.0 × 10.0 × 20.3 cm. Two published details disagree: Fluke gives the weight as 550 g while Amazon's item weight says 1645 g (we use Fluke's figure), and fluke.com describes the included case as soft in one place and hard in another, so check the box contents before relying on either. We haven't bench-tested this meter; everything here comes from Fluke's published data and the Amazon listing."
    }
  ],
  alternatives: [
    {
      name: "Fluke 1577",
      href: "/multimeters/fluke-1577-vs-fluke-1587-fc",
      reason: "The basic insulation multimeter: 500 V and 1000 V only, a 600 MΩ ceiling and no app, for routine megger checks."
    },
    {
      name: "Fluke 87V",
      href: "/multimeters/fluke-87v-review",
      reason: "No insulation test, but a 10 A input, higher DC accuracy and a lifetime warranty for general troubleshooting."
    },
    {
      name: "Fluke 87V MAX",
      href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max",
      reason: "IP67 and a 4 m drop rating for wet, rough sites where insulation testing isn't part of the job."
    },
    {
      name: "Fluke 289",
      href: "/multimeters/fluke-1587-fc-vs-fluke-289",
      reason: "Logs live faults on the meter itself with 50,000 counts, for intermittent problems rather than insulation proof."
    }
  ],
  faqs: [
    {
      question: "Can the Fluke 1587 FC replace a dedicated megohmmeter?",
      answer: "For low-voltage motors, cables and switchgear tested at up to 1000 V, it covers what many maintenance electricians need, including PI and DAR. It doesn't offer test voltages above 1000 V, and its readings beyond 600 MΩ carry a ±(10% + 3) tolerance, so medium-voltage equipment and high-resolution gigohm work call for a dedicated insulation tester."
    },
    {
      question: "Does the Fluke 1587 FC measure amps?",
      answer: "Only small currents. Fluke lists 60 mA and 400 mA ranges, AC and DC, behind a 0.44 A fuse, with no 10 A input. That handles control circuits and 4–20 mA signals. For motor or circuit load current, use a clamp meter. The 1587 FC kits sold on Amazon are separate listings from the bare meter we link."
    },
    {
      question: "Which test voltage should I use for a 480 V motor?",
      answer: "Follow the motor maker's documentation first. As a general reference, 500 V DC is commonly cited from IEEE 43 for windings rated below 1000 V, and the 1587 FC offers that setting. Never test a motor that is still connected to a drive or energized, and have the work done by qualified personnel under lockout/tagout."
    },
    {
      question: "Do I need the Fluke Connect app to run PI or DAR tests?",
      answer: "Fluke lists the PI and DAR timed ratio tests as meter functions, and the app adds memory storage, TrendIt graphs and temperature compensation. Our sources don't state on-meter logging memory, so if you need a saved history of insulation readings for each motor, plan on recording through the app on a phone with the 2.4 GHz radio link."
    },
    {
      question: "How much does the Fluke 1587 FC weigh?",
      answer: "Fluke's data sheet says 550 g, while the Amazon listing gives an item weight of 1645 g. The two figures conflict; we use Fluke's. Either way, at 5.0 × 10.0 × 20.3 cm it's a full-size meter that rides in a case or bag rather than a pocket."
    },
    {
      question: "Is the Fluke 1587 FC hands-on tested by OhmSavvy?",
      answer: "No. This review is desk research against Fluke's published specifications and the official Amazon listing, which is why the page shows a desk-research status rather than a tested badge. The worked numbers above are arithmetic on Fluke's specs, and the PI example is illustrative, not a measurement we made."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Fluke 1577 vs Fluke 1587 FC",
      href: "/multimeters/fluke-1577-vs-fluke-1587-fc"
    },
    {
      label: "Fluke 1587 FC vs Fluke 87V",
      href: "/multimeters/fluke-1587-fc-vs-fluke-87v"
    },
    {
      label: "Fluke 1587 FC vs Fluke 87V MAX",
      href: "/multimeters/fluke-1587-fc-vs-fluke-87v-max"
    },
    {
      label: "Fluke 1587 FC vs Fluke 289",
      href: "/multimeters/fluke-1587-fc-vs-fluke-289"
    },
    {
      label: "Fluke 1587 FC vs Fluke 287",
      href: "/multimeters/fluke-1587-fc-vs-fluke-287"
    },
    {
      label: "Fluke 283 FC vs Fluke 1587 FC",
      href: "/multimeters/fluke-283-fc-vs-fluke-1587-fc"
    },
    {
      label: "Fluke 789 vs Fluke 1587 FC",
      href: "/multimeters/fluke-789-vs-fluke-1587-fc"
    },
    {
      label: "How to check a motor winding for a short",
      href: "/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter"
    }
  ],
};

export default function Fluke1587FcReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/fluke-1587-fc-review" />
    </>
  );
}
