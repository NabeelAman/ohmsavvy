import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-E Review",
  description: "Siglent SDS1104X-E review: 100MHz, 4 channels and 1 GSa/s with a well-regarded interface. Who should pay more for it over the Rigol DS1054Z, and who shouldn't.",
  path: "/oscilloscopes/siglent-sds1104x-e-review",
  image: picks.find((p) => p.name === "Siglent SDS1104X-E")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E Review",
  productType: "Oscilloscope",
  intendedBuyer: "Intermediate hobbyists who expect their projects to grow",
  imageAlt: "Siglent SDS1104X-E 4-channel digital oscilloscope",
  considerIf: [
    "You need more than 50MHz of bandwidth headroom",
    "You want four channels for multi-signal timing work",
    "You value an intuitive interface",
    "You'd rather pay once for guaranteed factory-rated bandwidth than rely on a community firmware unlock"
  ],
  skipIf: [
    "You're a complete beginner — the Rigol DS1054Z covers learning for less",
    "Budget is your deciding factor"
  ],
  tradeOffs: "It costs more than the Rigol DS1054Z. For that you get double the bandwidth and a better-regarded interface, at the same channel count and sample rate — worth it if either of those two things is a genuine priority for you.",
  assessment: [
    {
      heading: "Bandwidth",
      body: "100MHz is double the Rigol DS1054Z's 50MHz. By the 3–5× rule of thumb, it's comfortable on signals up to roughly 20–33MHz, which covers many hobby microcontroller clocks and serial buses."
    },
    {
      heading: "Channels, sample rate, and interface",
      body: "Four channels at 1 GSa/s, the same as the Rigol, plus an interface that's widely regarded as intuitive."
    },
    {
      heading: "What the interface actually gets you",
      body: "An intuitive interface isn't a cosmetic nicety on an instrument you'll reach for dozens of times a session — it's the difference between adjusting a trigger or timebase in a couple of button presses versus hunting through nested menus mid-task. For someone learning to use a scope, a layout that matches your intuition means more time spent actually reading the waveform in front of you and less time fighting the instrument to display it correctly in the first place."
    }
  ],
  alternatives: [
    {
      name: "Rigol DS1054Z",
      href: "/oscilloscopes/rigol-ds1054z-review",
      reason: "4 channels and 1 GSa/s for less, with 50MHz bandwidth."
    },
    {
      name: "Hantek DSO2D10",
      href: "/oscilloscopes/hantek-dso2d10-review",
      reason: "100MHz with a built-in waveform generator, but 2 channels."
    }
  ],
  faqs: [
    {
      question: "Siglent SDS1104X-E or Rigol DS1054Z?",
      answer: "Both have 4 channels and 1 GSa/s. The Siglent doubles bandwidth to 100MHz and is often praised for its interface; the Rigol costs less."
    },
    {
      question: "Is 100MHz overkill for a beginner?",
      answer: "For learning the basics, usually yes. It makes sense if you expect to work with faster digital signals as your projects develop."
    },
    {
      question: "What am I actually paying the premium for over the Rigol, given the specs look similar otherwise?",
      answer: "Two things: guaranteed 100MHz bandwidth straight from the factory, with no need to rely on community firmware tricks, and an interface that's consistently rated easier to pick up. Channel count and sample rate don't change between the two, so if neither of those two things matters to your work, the premium buys you comparatively little — that's exactly the calculation worth making before paying more here."
    },
    {
      question: "Does 100MHz of bandwidth translate to a specific real-world benefit for hobby projects?",
      answer: "By the 3-5x rule of thumb, 100MHz gives you comfortable, accurate readings on signals up to roughly 20-33MHz — double the Rigol's effective range. In practice that covers faster microcontroller clocks, certain serial communication buses, and digital signals that would start to look visibly distorted on a 50MHz scope. If your current projects stay well under that ceiling, the extra headroom is insurance against outgrowing the instrument rather than something you'll notice day to day."
    }
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes"
  },
  related: [
    {
      label: "Rigol DS1054Z vs Siglent SDS1104X-E",
      href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e"
    },
    {
      label: "Oscilloscope buying guide",
      href: "/oscilloscopes/oscilloscope-buying-guide"
    }
  ],
};

export default function SiglentSds1104xeReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/siglent-sds1104x-e-review" />
    </>
  );
}
