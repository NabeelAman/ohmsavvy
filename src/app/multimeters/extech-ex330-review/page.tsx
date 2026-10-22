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
    "You already own a True RMS meter and just want a small backup for quick checks"
  ],
  skipIf: [
    "You measure AC on motor drives, dimmers, or electronics with switching supplies — Extech doesn't list it as True RMS",
    "You prefer a large, easy-to-read display"
  ],
  tradeOffs: "Extech labels its True RMS meters as such and doesn't list the EX330 as True RMS. On clean mains sine waves that rarely matters; on distorted waveforms, readings from a meter that isn't True RMS can be off, so know which category your typical checks fall into before relying on it.",
  assessment: [
    {
      heading: "True RMS isn't listed: what that means",
      body: "Meters that aren't True RMS are calibrated for clean sine waves, and Extech's EX330 datasheet doesn't list True RMS. On non-sinusoidal waveforms, such as those from motor drives, LED drivers, and switching power supplies, they can read inaccurately. For checking ordinary outlets it's a minor limitation."
    },
    {
      heading: "Size and NCV",
      body: "Its main strength is size: it's small enough to actually live in a pocket, with a non-contact voltage detector built in and CAT III 600V protection."
    },
    {
      heading: "What it's realistically good for",
      body: "This isn't a meter you'd choose as your only tool for serious electrical work — it's the one you keep in a glovebox, junk drawer, or toolbox for the moment you unexpectedly need to check an outlet, test a battery, or confirm a wire is dead before touching it. For that role, its 4,000-count display and the lack of a listed True RMS function rarely matter, because the jobs it gets used for don't demand either."
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
    }
  ],
  faqs: [
    {
      question: "Is the Extech EX330 True RMS?",
      answer: "Extech doesn't list it as True RMS. Its datasheet covers autoranging, NCV, Type K temperature, capacitance and frequency, while Extech's True RMS models are labelled as such, so treat its AC readings on non-sinusoidal signals with caution."
    },
    {
      question: "Is the Extech EX330 safe for household electrical panels?",
      answer: "It's rated CAT III 600V, the category generally recommended for home panels and building wiring."
    },
    {
      question: "Why would I choose a meter without True RMS when True RMS meters exist at similar prices?",
      answer: "Mainly size and the built-in NCV. The EX330's value proposition is being genuinely pocket-sized with a voltage detector built in. If a similarly priced True RMS option like the UNI-T UT139C or AstroAI DM6000AR fits your budget and you don't specifically need something this small, there's little reason to give up True RMS accuracy. The EX330 earns its place specifically for buyers who value carry size above all else."
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
