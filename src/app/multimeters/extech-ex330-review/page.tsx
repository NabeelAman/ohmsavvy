import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Extech EX330 Review",
  description: "Extech EX330 review: a pocket-sized auto-ranging meter with built-in NCV and CAT III 600V. Extech doesn't list it as True RMS: when that matters.",
  path: "/multimeters/extech-ex330-review",
  image: picks.find((p) => p.name === "Extech EX330")?.image,
});

// Extech EX330 ranges (600V AC/DC, 10A AC/DC, 40 MΩ, 200 µF, 10 MHz, 0.1–99.9% duty, Type K -20 to 750°C,
// NCV 100–600VAC), 4,000-count LCD, CAT III 600V / CAT II 1000V, 147 × 76 × 42 mm, 260 g, 2 × AAA,
// 2-year warranty, and box contents (leads, Type K probe, batteries, tilt stand, rubber holster)
// per https://www.extech.com/products/ex330/
const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Extech EX330")!,
  category: "multimeters",
  heading: "Extech EX330 Review",
  productType: "Digital multimeter",
  intendedBuyer: "Anyone who wants a meter that's always in their pocket",
  imageAlt: "Extech EX330 compact auto-ranging multimeter",
  considerIf: [
    "You want a meter small enough to carry every day",
    "You do quick checks where a non-contact voltage test comes first",
    "You want a name-brand meter at a low price",
    "You already own a True RMS meter and just want a small backup for quick checks",
    "You like having temperature, capacitance and frequency in a meter that weighs 260 g"
  ],
  skipIf: [
    "You measure AC on motor drives, dimmers, or electronics with switching supplies — Extech doesn't list it as True RMS",
    "You prefer a large, easy-to-read display",
    "You work on service entrances or outdoor feeders, where a CAT IV rating is the norm",
    "You read small voltage changes all day and want 6,000 counts or more"
  ],
  tradeOffs: "Extech labels its True RMS meters as such and doesn't list the EX330 as True RMS. On clean mains sine waves that rarely matters; on distorted waveforms, readings from a meter that isn't True RMS can be off, so know which category your typical checks fall into before relying on it.",
  assessment: [
    {
      heading: "True RMS isn't listed: what that means",
      body: "Meters that aren't True RMS are calibrated for clean sine waves, and Extech's EX330 datasheet doesn't list True RMS. On non-sinusoidal waveforms, such as those from motor drives, LED drivers, and switching power supplies, they can read inaccurately. For checking ordinary outlets it's a minor limitation."
    },
    {
      heading: "Size and NCV",
      body: "Its main strength is size: it's small enough to actually live in a pocket, with a non-contact voltage detector built in and CAT III 600V protection. Extech gives the body as 147 × 76 × 42 mm (5.7 × 2.9 × 1.6 in) and 260 g, and the NCV sensor responds to AC from 100 to 600V. That lower threshold matters: the detector is meant for mains-level conductors, so a silent NCV tip near a low-voltage control wire or a 24V thermostat circuit tells you nothing. Use it as a first warning, then confirm with the test leads."
    },
    {
      heading: "What 4,000 counts mean on the display",
      body: "A 4,000-count meter can show readings up to 3,999 before it has to move to the next range. In practice the range boundaries on meters of this class typically fall at multiples of four (400 mV, 4 V, 40 V and so on), so a 4.5V reading lands on the 40V range and loses a decimal place compared with a 6,000-count meter, which would keep it on a 6V range. For outlet, battery and continuity checks that extra digit rarely changes a decision. For tracing a few millivolts of drop across a connector or matching resistors closely, it does."
    },
    {
      heading: "More functions than its size suggests",
      body: "Extech lists twelve functions: AC and DC voltage to 600V, AC and DC current to 10A, resistance to 40 MΩ, capacitance to 200 µF, frequency to 10 MHz, duty cycle from 0.1 to 99.9%, diode test, continuity, NCV and Type K temperature from -20 to 750°C (-4 to 1,382°F) using the included bead probe. The temperature and duty-cycle functions are the useful surprises here: they let a pocket meter check a furnace flue, a heat-sink or a PWM fan signal without switching to a second tool."
    },
    {
      heading: "Safety rating in context",
      body: "Extech rates it CAT III 600V and CAT II 1000V. CAT III covers fixed building wiring such as panels, feeders and hard-wired equipment; CAT II covers circuits plugged into receptacles. The EX330 isn't rated CAT IV, so it isn't the meter for the utility side of a service entrance or an outdoor overhead feed. Treat the rating as the ceiling of the meter and its leads together, and replace damaged leads before any mains work."
    },
    {
      heading: "What it's realistically good for",
      body: "This isn't a meter you'd choose as your only tool for serious electrical work — it's the one you keep in a glovebox, junk drawer, or toolbox for the moment you unexpectedly need to check an outlet, test a battery, or confirm a wire is dead before touching it. For that role, its 4,000-count display and the lack of a listed True RMS function rarely matter, because the jobs it gets used for don't demand either."
    },
    {
      heading: "In the box and warranty",
      body: "Extech ships it with test leads, the Type K temperature probe, two AAA batteries, a tilt stand and a protective rubber holster, so there's nothing extra to buy before the first job. The warranty is two years. Extech's product page doesn't list a backlight, auto power-off or data hold, so don't count on those features unless the manual for your unit says otherwise."
    }
  ],
  alternatives: [
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "Adds True RMS and a 6,000-count display at a budget price."
    },
    {
      name: "AstroAI DM6000AR",
      href: "/multimeters/astroai-dm6000ar-review",
      reason: "True RMS and 6,000-count resolution with auto and manual ranging, though AstroAI states no CAT rating."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The step up for daily electrical work: True RMS, NCV and CAT III 600V in a field-grade body."
    },
    {
      name: "EX330 vs UNI-T UT139C",
      href: "/multimeters/extech-ex330-vs-uni-t-ut139c",
      reason: "Our side-by-side of the two pocket meters, spec by spec."
    }
  ],
  faqs: [
    {
      question: "Is the Extech EX330 True RMS?",
      answer: "Extech doesn't list it as True RMS. Its datasheet covers autoranging, NCV, Type K temperature, capacitance and frequency, while Extech's True RMS models are labeled as such, so treat its AC readings on non-sinusoidal signals with caution. Clean utility sine waves read fine; variable-speed drives and LED dimmer circuits are where an average-responding meter drifts."
    },
    {
      question: "Is the Extech EX330 safe for household electrical panels?",
      answer: "It's rated CAT III 600V, the category generally recommended for home panels and building wiring. That covers branch circuits, breakers and hard-wired appliances inside the house. It isn't rated CAT IV, so leave the meter base and the utility service drop to an electrician with a CAT IV meter, and inspect the leads for cracks before every panel job."
    },
    {
      question: "Why would I choose a meter without True RMS when True RMS meters exist at similar prices?",
      answer: "Mainly size and the built-in NCV. The EX330's value proposition is being genuinely pocket-sized with a voltage detector built in. If a similarly priced True RMS option like the UNI-T UT139C or AstroAI DM6000AR fits your budget and you don't specifically need something this small, there's little reason to give up True RMS accuracy."
    },
    {
      question: "Can the Extech EX330 measure temperature?",
      answer: "Yes. It reads Type K thermocouples from -20 to 750°C (-4 to 1,382°F), and Extech includes a bead-type probe in the box. That's enough for checking HVAC supply and return air, a water heater pipe or a hot component. For surface or immersion work you'd add a dedicated Type K probe that matches the job."
    },
    {
      question: "How much current can the Extech EX330 measure?",
      answer: "Extech lists AC and DC current up to 10A through the leads, down to 0.1 µA resolution on the lowest range. Current is measured in series, so you break the circuit and route it through the meter. For loads above 10A, or to avoid opening the circuit at all, a clamp meter such as the Milwaukee 2235-20 is the better tool."
    },
    {
      question: "What batteries does the Extech EX330 use?",
      answer: "Two AAA 1.5V cells, which Extech includes. AAA keeps the meter slim but gives less capacity than the 9V or AA packs in larger meters, so carry spares if the meter lives in a vehicle. A weak battery can make readings unreliable, so replace the cells as soon as the low-battery indicator appears."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    },
    {
      label: "Best budget True RMS multimeters",
      href: "/multimeters/best-true-rms-multimeters-under-100"
    },
    {
      label: "How to check a thermocouple",
      href: "/multimeters/how-to-check-a-thermocouple-with-a-multimeter"
    }
  ],
};

export default function ExtechEx330ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/extech-ex330-review" />
    </>
  );
}
