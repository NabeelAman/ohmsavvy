import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z Review",
  description: "A detailed look at the Rigol DS1054Z's bandwidth, 4-channel design, and sample rate, and who it's actually worth buying for.",
  path: "/oscilloscopes/rigol-ds1054z-review",
  image: picks.find((p) => p.name === "Rigol DS1054Z")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
  category: "oscilloscopes",
  heading: "Rigol DS1054Z Review",
  productType: "Oscilloscope",
  intendedBuyer: "Hobbyists, students, and general electronics work",
  imageAlt: "Rigol DS1054Z 4-channel digital oscilloscope",
  considerIf: [
    "You want four channels for multi-signal timing work on a beginner budget",
    "Your work is microcontroller signals, audio-range work, and general digital debugging",
    "You value strong community support and documentation while you learn"
  ],
  skipIf: [
    "You work on RF or need bandwidth well beyond 50MHz",
    "You want the most intuitive menus — navigation has a learning curve"
  ],
  tradeOffs: "50MHz of bandwidth is modest. It covers most beginner and hobby work, but if your projects are heading toward faster signals, the 100MHz Siglent SDS1104X-E gives more headroom.",
  assessment: [
    {
      heading: "Channels and display",
      body: "Four channels at this price are rare, and the large 7-inch display makes it practical to view several signals at once."
    },
    {
      heading: "Bandwidth and sample rate",
      body: "50MHz and 1 GSa/s. By the 3–5× rule of thumb, that's comfortable on signals up to roughly 10–17MHz: enough for most microcontroller and audio-range work, but modest for RF. Higher bandwidth can be unlocked via firmware."
    }
  ],
  alternatives: [
    {
      name: "Siglent SDS1104X-E",
      href: "/oscilloscopes/siglent-sds1104x-e-review",
      reason: "Double the bandwidth at 100MHz, with a well-regarded interface."
    },
    {
      name: "Hantek DSO2D10",
      href: "/oscilloscopes/hantek-dso2d10-review",
      reason: "100MHz with a built-in waveform generator, but 2 channels."
    },
    {
      name: "FNIRSI DSO152",
      href: "/oscilloscopes/fnirsi-dso152-review",
      reason: "A pocket scope for basic checks and learning, at a fraction of the price."
    }
  ],
  faqs: [
    {
      question: "Is 50MHz enough for a beginner?",
      answer: "Usually. By the 3–5× rule of thumb, 50MHz handles signals up to roughly 10–17MHz, which covers most beginner projects."
    },
    {
      question: "Rigol DS1054Z or Siglent SDS1104X-E?",
      answer: "Both have 4 channels and 1 GSa/s. The Siglent doubles bandwidth to 100MHz and is praised for its interface; the Rigol costs less."
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
      label: "Rigol DS1054Z vs Hantek DSO2D10",
      href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10"
    },
    {
      label: "Oscilloscope buying guide",
      href: "/oscilloscopes/oscilloscope-buying-guide"
    }
  ],
};

export default function RigolDs1054zReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/rigol-ds1054z-review" />
    </>
  );
}
