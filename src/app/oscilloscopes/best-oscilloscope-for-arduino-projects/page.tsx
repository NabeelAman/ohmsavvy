import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Oscilloscope for Arduino Projects",
  description: "Microcontroller signals rarely need high bandwidth — these picks cover Arduino-speed debugging without paying for headroom you won't use.",
  path: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
});

const names = ["Rigol DS1054Z", "FNIRSI DSO152"];
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

const faqs = [
  {
    question: "What bandwidth do I actually need for Arduino work?",
    answer:
      "Arduino clock speeds and most sensor/communication signals (I2C, SPI, UART, PWM) fall well within 50MHz of bandwidth — even the Rigol DS1054Z's entry-level bandwidth leaves comfortable headroom for this kind of work.",
  },
  {
    question: "Is a pocket-sized scope like the FNIRSI DSO152 enough for Arduino debugging?",
    answer:
      "For basic single-signal checks — confirming a pin is toggling, checking a PWM duty cycle — yes. Its single channel is the real limitation: once you need to compare two signals at once (a common Arduino debugging scenario, like checking a clock against data on a bus), you'll want the Rigol's 4 channels instead.",
  },
];

export default function BestOscilloscopeForArduinoProjectsPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · For Arduino Projects"
        heading="Best Oscilloscope for Arduino Projects"
        tagline="Compared honestly — no pay-for-placement."
        description="Microcontroller signals rarely demand high bandwidth — these picks from our full comparison cover Arduino-speed debugging without overpaying for headroom you won't use."
        primaryCta={{ label: "See the Full Comparison", href: "/oscilloscopes/best-beginner-oscilloscopes" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
    </>
  );
}
