import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Hantek DSO2D10 Review",
  description: "Hantek DSO2D10 review: a 100MHz, 2-channel oscilloscope with a built-in waveform generator. Who the two-in-one design suits, and the trade-offs to know.",
  path: "/oscilloscopes/hantek-dso2d10-review",
  image: picks.find((p) => p.name === "Hantek DSO2D10")?.image,
});

const review: ProductReviewContent = {
  pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
  category: "oscilloscopes",
  heading: "Hantek DSO2D10 Review",
  productType: "Oscilloscope",
  intendedBuyer: "Hobbyists with limited bench space",
  imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
  considerIf: [
    "You need a signal source and a scope but only have room for one instrument",
    "You want 100MHz bandwidth in a compact footprint",
    "Two channels cover your work",
    "You're willing to try a newer, less established brand to get this feature combination at this price"
  ],
  skipIf: [
    "You need four channels, which similarly priced scopes offer",
    "You want a large display"
  ],
  tradeOffs: "The built-in generator and compact size cost you channels and screen size compared with bench-focused scopes — a reasonable trade if desk space is genuinely tight, less so if you have room to spare.",
  assessment: [
    {
      heading: "Two instruments in one",
      body: "The built-in waveform generator lets you inject a test signal into a circuit and watch the response on the same unit, which is handy for testing filters, amplifiers, and sensor inputs without a separate generator."
    },
    {
      heading: "Scope performance",
      body: "100MHz bandwidth and 1 GSa/s match the Siglent SDS1104X-E on paper, but with 2 channels instead of 4 and a smaller display."
    },
    {
      heading: "A newer name in this category",
      body: "Hantek doesn't carry the same multi-decade track record as Rigol or Siglent in the beginner-scope space, and this specific model's user base and documentation are smaller as a result. That's reflected in its rating compared with the Rigol DS1054Z — still a solidly reviewed instrument, just without the years of accumulated community troubleshooting guides and tutorials that come with a longer-established default recommendation."
    },
    {
      heading: "Checking the generator-and-channels interaction before you buy",
      body: "A combined scope-and-generator saves a genuine amount of desk space — one enclosure and one power cord instead of two — but it doesn't add channels. The DSO2D10's 2 scope channels are 2 scope channels whether or not the generator is running at the same time. If your projects need to feed a test signal in while simultaneously watching a response on two other channels, check Hantek's own documentation for exactly how the generator and channels interact on this model before assuming it behaves identically to running two separate instruments side by side."
    }
  ],
  alternatives: [
    {
      name: "Siglent SDS1104X-E",
      href: "/oscilloscopes/siglent-sds1104x-e-review",
      reason: "The same 100MHz and 1 GSa/s with 4 channels, but no built-in generator."
    },
    {
      name: "Rigol DS1054Z",
      href: "/oscilloscopes/rigol-ds1054z-review",
      reason: "4 channels and a large 7-inch display at 50MHz."
    }
  ],
  faqs: [
    {
      question: "What does the waveform generator on the Hantek DSO2D10 do?",
      answer: "It outputs test signals you can feed into a circuit, so you can stimulate and measure with one instrument."
    },
    {
      question: "How many channels does the Hantek DSO2D10 have?",
      answer: "Two. Similarly priced scopes often offer four, which is the main trade-off for the built-in generator."
    },
    {
      question: "When does having only 2 channels actually become a real limitation?",
      answer: "It shows up the moment you need to compare more than two signals against each other at the same time — checking a clock line against two different data lines on a bus, for instance, or debugging a circuit with several interacting analog stages. For single-signal checks, confirming a sensor output, watching one waveform at a time, 2 channels is rarely a constraint. It's specifically multi-signal, comparative debugging where a 4-channel scope like the Rigol DS1054Z becomes the more comfortable tool."
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

export default function HantekDso2d10ReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/hantek-dso2d10-review" />
    </>
  );
}
