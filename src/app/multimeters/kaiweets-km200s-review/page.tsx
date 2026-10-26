// KAIWEETS KM200s specs per the Pick and the official Amazon listing https://www.amazon.com/dp/B0FCMBZ5TW (title and
// "About this item", as cited on /multimeters/kaiweets-km200s-vs-uni-t-ut139c, checked 2026-10-26): 4000 counts, True RMS,
// smart auto-ranging that switches between AC/DC volts, resistance and continuity; capacitance; NCV with visual and audible
// alerts; CAT II 600V; backlit LCD; flashlight; auto power-off; 2 × AAA batteries; 3-year warranty; 4.33 × 2.36 × 1.06 in.
// kaiweets.com returned HTTP 429 on 2026-10-26; current ranges, frequency, temperature and accuracy figures are not on the
// listing, so the page says "not stated" for them.
import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "KAIWEETS KM200s Review",
  description: "KAIWEETS KM200s review: True RMS, auto-ranging and NCV at under half the Fluke 117's price, and why its CAT II rating keeps it out of service panels.",
  path: "/multimeters/kaiweets-km200s-review",
  image: picks.find((p) => p.name === "KAIWEETS KM200s")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "KAIWEETS KM200s")!,
  category: "multimeters",
  heading: "KAIWEETS KM200s Review",
  productType: "Digital multimeter",
  intendedBuyer: "Beginners and homeowners buying a first meter",
  imageAlt: "KAIWEETS KM200s True RMS digital multimeter",
  considerIf: [
    "You want True RMS and auto-ranging without paying Fluke prices",
    "You'll mostly check batteries, outlets, appliances, and hobby circuits",
    "You often work in dim spaces — the display is backlit and there's a built-in flashlight",
    "You want a small meter (about 4.3 × 2.4 × 1.1 in) that fits a kitchen drawer or glovebox",
    "You'd rather pay less upfront and accept CAT II's narrower scope than overbuy for work you won't do"
  ],
  skipIf: [
    "You plan to work inside a breaker panel — the KM200s is rated CAT II 600V, not CAT III",
    "You need a meter built to survive daily job-site use",
    "You need published current ranges, temperature or frequency; the listing doesn't state them",
    "You want to lock a range by hand; the listing describes only automatic ranging"
  ],
  tradeOffs: "The KM200s gets the measurement fundamentals right and saves money on build quality, display resolution and safety category. That's a fine trade at the outlet and on the bench, and the wrong one at the service panel.",
  assessment: [
    {
      heading: "Safety rating: the key limitation",
      body: "CAT II 600V covers equipment plugged into outlets: appliances, power tools, and similar loads. Distribution panels and fixed building wiring fall under CAT III, which is why we don't recommend the KM200s for panel work. If that's on your list, the UNI-T UT139C, Klein Tools MM400 and Fluke 117 are rated for it. The difference isn't the voltage number, which reads 600V on all of them; it's the size of transient spike the meter is designed to survive. Closer to the service entrance, the energy available in a surge rises sharply, and the category is what tells you the meter was built for that."
    },
    {
      heading: "Measurement features",
      body: "For a budget meter the feature set is complete: True RMS for accurate readings on non-sinusoidal AC, smart auto-ranging so you don't select ranges by hand, and non-contact voltage detection with both a visual and an audible alert for a first check before the probes go on. KAIWEETS's listing also names capacitance, resistance and continuity among the functions the smart mode handles."
    },
    {
      heading: "Smart mode: helpful, with a catch",
      body: "The listing describes a smart mode that decides between AC volts, DC volts, resistance and continuity from what the probes touch. For a beginner that removes the most common mistake, which is reading an AC outlet on a DC setting and seeing nonsense. The catch is that you hand the decision to the meter. When you're learning, it's still worth switching to the explicit function now and then so you understand what you're measuring, and so you notice if the meter's guess doesn't match what you expected to find."
    },
    {
      heading: "Display resolution: 4,000 counts",
      body: "The KM200s shows up to 4,000 counts, against 6,000 on the UNI-T UT139C and the Fluke 117. In practice that changes where the meter switches ranges: a 4,000-count display shows 3.999 V before jumping to the next range, where a 6,000-count one keeps three decimal places up to 5.999 V. For a 5 V USB rail or a 4.2 V lithium cell, that's the difference between reading 5.02 and 5.021. It rarely matters at an outlet; it matters more on electronics benches."
    },
    {
      heading: "Power, size and warranty",
      body: "Two AAA cells power the meter, there's an automatic power-off, and KAIWEETS lists a three-year warranty, the same length Fluke gives the 117. At about 4.33 × 2.36 × 1.06 inches it's noticeably smaller than full-size meters, which makes it easy to keep in a kitchen drawer, glovebox or tackle box. What the listing doesn't publish are current ranges, temperature, frequency or accuracy figures, so we treat those as not stated rather than assume them."
    }
  ],
  alternatives: [
    {
      name: "UNI-T UT139C",
      href: "/multimeters/uni-t-ut139c-review",
      reason: "True RMS, a 6,000-count display, manual ranging and CAT III 600V at a budget price."
    },
    {
      name: "AstroAI DM6000AR",
      href: "/multimeters/astroai-dm6000ar-review",
      reason: "A similar budget tier with 6,000-count resolution and manual ranging, though AstroAI states no CAT rating."
    },
    {
      name: "Fluke 117",
      href: "/multimeters/fluke-117-review",
      reason: "The step up for real electrical work: CAT III 600V with field-grade durability."
    }
  ],
  faqs: [
    {
      question: "Can I use the KAIWEETS KM200s on a breaker panel?",
      answer: "We don't recommend it. It's rated CAT II 600V, which covers outlet-connected equipment. Breaker panels and building wiring call for at least CAT III, because the transient spikes there can be larger. For panel work, look at a CAT III 600V meter such as the UNI-T UT139C, Klein Tools MM400 or Fluke 117."
    },
    {
      question: "Is the KAIWEETS KM200s True RMS?",
      answer: "Yes. The listing describes it as True RMS, with smart auto-ranging and non-contact voltage detection. True RMS keeps readings honest on the distorted AC drawn by LED drivers, phone chargers and variable-speed appliances, where a cheaper average-responding meter can read noticeably off. KAIWEETS doesn't publish an AC bandwidth on the listing."
    },
    {
      question: "Does the backlit display make a real difference, or is it just a spec-sheet bullet point?",
      answer: "It's a real convenience in the places this meter gets used: behind a cluttered workbench, inside a cabinet, under a car dash, or in a garage with a single overhead bulb. The KM200s pairs it with a small built-in flashlight, so you can light the test point and read the display without holding a separate torch."
    },
    {
      question: "Can the KAIWEETS KM200s test a car battery?",
      answer: "Yes, for a resting-voltage check. Set it to DC volts, or let smart mode choose, and put the red probe on the positive post and the black on negative. As a rough, commonly used guide, about 12.6 V suggests a fully charged lead-acid battery and about 12.2 V roughly half charge. A voltage check won't show cranking capacity; that needs a load test."
    },
    {
      question: "What batteries and warranty does the KM200s have?",
      answer: "The listing says it runs on two AAA batteries and has an automatic power-off to save them when you forget to switch it off. KAIWEETS lists a three-year warranty, which is long for a budget meter and matches the Fluke 117's term. Keep your Amazon order details somewhere safe, because you'll need proof of purchase if you ever make a claim."
    }
  ],
  roundup: {
    label: "See the full multimeter roundup",
    href: "/multimeters/best-multimeters"
  },
  related: [
    {
      label: "KAIWEETS KM200s vs UNI-T UT139C",
      href: "/multimeters/kaiweets-km200s-vs-uni-t-ut139c"
    },
    {
      label: "Best multimeter for beginners",
      href: "/multimeters/best-multimeter-for-beginners"
    },
    {
      label: "Best multimeter for home & DIY",
      href: "/multimeters/best-multimeter-for-home-use"
    },
    {
      label: "How to test a car battery with a multimeter",
      href: "/multimeters/how-to-test-a-car-battery-with-a-multimeter"
    },
    {
      label: "Multimeter buying guide",
      href: "/multimeters/multimeter-buying-guide"
    }
  ],
};

export default function KaiweetsKm200sReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="multimeters" current="/multimeters/kaiweets-km200s-review" />
    </>
  );
}
