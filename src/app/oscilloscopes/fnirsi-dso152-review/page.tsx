import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DSO152: 200kHz, 1 channel, 2.5 MSa/s per the Pick. 2.8-inch 320 x 240 LCD, 1000mAh battery (about 4 hours),
// USB-C charging 5V/1A, AC/DC coupling, 10mV/div to 20V/div, 10us/div to 50s/div, Auto/Normal/Single trigger,
// 40V (x1) / 400V (x10) max input, 99 x 68.3 x 19.5 mm, 100 g per https://www.fnirsi.com/products/dso-152 (checked 2026-10-24,
// as cited on rigol-dho802-vs-fnirsi-dso152). No CAT rating is stated by FNIRSI.
// Rise-time figure uses the standard single-pole approximation (rise time ~ 0.35 / bandwidth) and is labeled approximate.

export const metadata = buildMetadata({
  title: "FNIRSI DSO152 Review",
  description: "FNIRSI DSO152 review: a pocket oscilloscope with 200kHz bandwidth and 2.5 MSa/s. What it can show you, where it runs out, and when to buy a bench scope.",
  path: "/oscilloscopes/fnirsi-dso152-review",
  image: picks.find((p) => p.name === "FNIRSI DSO152")?.image,
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
    "You want a scope that fits in a pocket and runs from its own battery",
    "You want a cheap way to find out whether you'll use a scope before buying a bench model"
  ],
  skipIf: [
    "You need to compare two signals at once — it's single-channel",
    "You work with digital buses, fast clocks, or RF",
    "You want to probe mains or anything above low voltage: FNIRSI states no CAT safety rating"
  ],
  tradeOffs: "It's an entry point and a pocket diagnostic tool, not a substitute for a bench scope. You give up channels, bandwidth and screen size in exchange for a 100 g instrument that charges from USB-C and costs a fraction of a bench model.",
  assessment: [
    {
      heading: "Bandwidth and sample rate",
      body: "200kHz bandwidth and 2.5 MSa/s limit it to audio-range and other slow signals. By the common rule of thumb of choosing 3–5× the signal frequency, it's comfortable on signals up to roughly 40–65kHz."
    },
    {
      heading: "What 200kHz does to a square wave",
      body: "A common approximation puts a scope's own rise time at about 0.35 divided by its bandwidth, which for 200kHz works out to roughly 1.75 µs. Any edge faster than that is drawn as a slope of about that length. A 1kHz PWM signal, with a 1,000 µs period, still looks crisp; a 100kHz square wave, with 5 µs high and low halves, comes out visibly rounded. That is the practical limit to remember when you look at microcontroller outputs."
    },
    {
      heading: "Single channel",
      body: "With one channel, you can't view an input and output together or check timing between two signals, the kind of comparison the 4-channel Rigol DS1054Z handles easily."
    },
    {
      heading: "Controls and ranges",
      body: "FNIRSI lists vertical settings from 10mV/div to 20V/div, timebases from 10 µs/div to 50 s/div, AC and DC coupling, and Auto, Normal and Single trigger modes. Single trigger is the useful one for beginners: it freezes a one-off event, such as a switch bounce or the moment a supply turns on, so you can study it. The 50 s/div end turns it into a slow chart recorder for a drifting sensor or a charging battery."
    },
    {
      heading: "Screen, battery and size",
      body: "The display is a 2.8-inch 320 × 240 LCD, small enough that you read one waveform at a time rather than fine detail. FNIRSI quotes a 1000mAh battery good for about 4 hours, charged over USB-C at 5V/1A, and a body of 99 × 68.3 × 19.5 mm weighing 100 g. That is genuinely pocketable and needs no outlet, which is the whole point."
    },
    {
      heading: "Input limits and safety",
      body: "FNIRSI rates the input at 40V with a ×1 probe and 400V with a ×10 probe, but states no CAT measurement category. Keep it to battery-powered and low-voltage circuits: 5V logic, 12V automotive accessories, audio lines. Never clip it onto mains wiring or the primary side of a power supply; that needs a CAT-rated instrument and an isolated or differential measurement setup."
    },
    {
      heading: "What it's genuinely good for",
      body: "This isn't a scaled-down bench scope — it's a different category of tool, and judging it against a Rigol or Siglent misses the point. A pocket scope this size is for the moment you want to actually see what a waveform looks like, rather than guess from a multimeter's single number: confirming a PWM signal is toggling, checking that an audio signal isn't clipping, or just learning what a sine wave versus a square wave looks like on a screen for the first time. For that kind of hands-on, low-stakes learning, its portability and low price matter more than its bandwidth ceiling."
    },
    {
      heading: "The step up, when you need it",
      body: "The moment you need to compare two signals against each other, work with anything faster than audio frequencies, or do real circuit debugging rather than basic learning, this tool has reached its ceiling. That's by design rather than a flaw — it's priced and built for a narrower job than a bench scope, and the right response is to add a 4-channel scope like the Rigol DS1054Z alongside it, not to expect this one to grow into that role."
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
    },
    {
      name: "FNIRSI DSO-TC3",
      href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152",
      reason: "Another handheld from FNIRSI with 500kHz bandwidth, a component tester and a basic signal generator."
    }
  ],
  faqs: [
    {
      question: "Can the FNIRSI DSO152 replace a bench oscilloscope?",
      answer: "No. With 200kHz bandwidth, 2.5 MSa/s and a single channel, it covers basic diagnostics and learning, not the work a 50–100MHz multi-channel bench scope does. It can't compare two signals, decode a serial bus, or show fast digital edges accurately, which are everyday tasks on a bench."
    },
    {
      question: "What signals can the FNIRSI DSO152 measure?",
      answer: "Audio-range and other low-frequency signals: speaker and headphone lines, slow PWM for LED dimming and motor speed, sensor outputs, and power-supply ripple at mains-related frequencies on low-voltage circuits. Its 200kHz bandwidth and 2.5 MSa/s sample rate rule out fast digital clocks, most serial buses at full speed, and RF."
    },
    {
      question: "Is this a good way to decide whether I even want to get into oscilloscopes?",
      answer: "Yes, and that's arguably its best use case. It's a low-stakes way to find out whether you'll use a scope regularly before spending several times more on a bench instrument like the Rigol DS1054Z. If you keep hitting its single-channel, low-bandwidth limits, a bench scope is worth buying; if it sits in a drawer, you've learned that cheaply."
    },
    {
      question: "Can I measure mains voltage with the FNIRSI DSO152?",
      answer: "No. FNIRSI rates the input at 40V with a ×1 probe and 400V with a ×10 probe but publishes no CAT safety category, and a pocket scope's ground clip referenced to a live conductor is a shock and short-circuit hazard. For mains work use a CAT-rated multimeter, and call an electrician for anything inside a panel."
    },
    {
      question: "How long does the FNIRSI DSO152 battery last?",
      answer: "FNIRSI quotes about 4 hours from its built-in 1000mAh battery, recharged over USB-C at 5V/1A, so a phone charger or power bank will top it up. Four hours suits a session at the bench or a repair call; for long logging runs at slow timebases, keep it plugged into USB power."
    }
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes"
  },
  related: [
    {
      label: "Rigol DS1054Z vs FNIRSI DSO152",
      href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152"
    },
    {
      label: "FNIRSI DSO152 vs Hantek DSO2D10",
      href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10"
    },
    {
      label: "What is oscilloscope bandwidth?",
      href: "/oscilloscopes/what-is-oscilloscope-bandwidth"
    },
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
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/fnirsi-dso152-review" />
    </>
  );
}
