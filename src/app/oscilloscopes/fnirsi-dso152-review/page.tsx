import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "FNIRSI DSO152 Review",
  description: "FNIRSI DSO152 review: a pocket oscilloscope with 200kHz bandwidth and 2.5 MSa/s. What it can show you, where it runs out, and when to buy a bench scope.",
  path: "/oscilloscopes/fnirsi-dso152-review",
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "FNIRSI DSO152")!,
  category: "oscilloscopes",
  heading: "FNIRSI DSO152 Review",
  productType: "Oscilloscope",
  intendedBuyer: "Beginners learning waveform basics and anyone needing quick checks",
  imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
  considerIf: [
    "You want to learn what waveforms look like for very little money",
    "You check audio-range and other low-frequency signals",
    "You want a scope that fits in a pocket"
  ],
  skipIf: [
    "You need to compare two signals at once — it's single-channel",
    "You work with digital buses, fast clocks, or RF"
  ],
  tradeOffs: "It's an entry point and a pocket diagnostic tool, not a substitute for a bench scope.",
  assessment: [
    {
      heading: "Bandwidth and sample rate",
      body: "200kHz bandwidth and 2.5 MSa/s limit it to audio-range and other slow signals. By the common rule of thumb of choosing 3–5× the signal frequency, it's comfortable on signals up to roughly 40–65kHz."
    },
    {
      heading: "Single channel",
      body: "With one channel, you can't view an input and output together or check timing between two signals, the kind of comparison the 4-channel Rigol DS1054Z handles easily."
    }
  ],
  alternatives: [
    {
      name: "Rigol DS1054Z",
      href: "/oscilloscopes/rigol-ds1054z-review",
      reason: "The default beginner bench scope: 50MHz and 4 channels."
    },
    {
      name: "Hantek DSO2D10",
      href: "/oscilloscopes/hantek-dso2d10-review",
      reason: "A compact 100MHz bench option with a built-in waveform generator."
    }
  ],
  faqs: [
    {
      question: "Can the FNIRSI DSO152 replace a bench oscilloscope?",
      answer: "No. With 200kHz bandwidth and a single channel, it covers basic diagnostics and learning, not the work a 50–100MHz multi-channel bench scope does."
    },
    {
      question: "What signals can the FNIRSI DSO152 measure?",
      answer: "Audio-range and other low-frequency signals. Its 200kHz bandwidth and 2.5 MSa/s sample rate rule out fast digital and RF work."
    }
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes"
  },
  related: [
    {
      label: "Oscilloscope buying guide",
      href: "/oscilloscopes/oscilloscope-buying-guide"
    }
  ],
};

export default function FnirsiDso152ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" />
    </>
  );
}
