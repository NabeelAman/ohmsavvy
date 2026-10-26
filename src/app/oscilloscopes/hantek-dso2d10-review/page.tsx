import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D10 per https://www.hantek.com/products/detail/17182 (checked 2026-10-24, as cited on
// rigol-ds1054z-vs-hantek-dso2d10): 100MHz, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 8 Mpts (1 ch) / 4 Mpts (2 ch),
// 8-bit with a 12-bit high-resolution mode, UART/RS232, I2C, SPI, CAN and LIN trigger and decode, 7-inch 800 x 480,
// under 30 W; generator 1 channel, 25 MHz, 200 MSa/s, 12-bit, sine/square/ramp/Exp/noise/DC plus Arb1-Arb4 (4 KSa),
// 10 mV-7 Vpp into high impedance, 5 mV-3.5 Vpp into 50 ohm, 50 ohm output impedance. Waveform update rate not stated.
// Siglent SDS1104X-E 7-inch 800 x 480 and 100,000 wfm/s per the SDS1000X-E data sheet (https://siglentna.com/download/22005/).
// Rigol DS1054Z 7-inch 800 x 480 and 250 MSa/s with 3-4 channels per the DS1000Z datasheet DSA20100-2020-09.

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
    "Two channels cover your work, such as input-versus-output or clock-versus-data checks",
    "You want UART, I2C, SPI, CAN and LIN decoding listed as standard features"
  ],
  skipIf: [
    "You need four channels, which similarly priced scopes offer",
    "You want a touchscreen or a higher-resolution display than 800 × 480",
    "You'd rather buy a scope OhmSavvy has hands-on tested: this one is assessed from Hantek's published specifications"
  ],
  tradeOffs: "The built-in generator and compact size cost you two channels compared with bench-focused scopes like the Rigol DS1054Z and Siglent SDS1104X-E. That is a reasonable trade if desk space is genuinely tight or you need a stimulus source anyway, less so if you have room for two instruments.",
  assessment: [
    {
      heading: "Two instruments in one",
      body: "The built-in waveform generator lets you inject a test signal into a circuit and watch the response on the same unit, which is handy for testing filters, amplifiers, and sensor inputs without a separate generator."
    },
    {
      heading: "Scope performance",
      body: "100MHz bandwidth and 1 GSa/s match the Siglent SDS1104X-E on paper, but with 2 channels instead of 4. Its 7-inch 800 × 480 screen is the same size and resolution as the Siglent's and the Rigol DS1054Z's, so the display is not where it gives ground."
    },
    {
      heading: "What 1 GSa/s means with both channels on",
      body: "Hantek quotes 1 GSa/s with one channel and 500 MSa/s per channel with both running. Even at 500 MSa/s you get five samples in each 10 ns period of a 100MHz signal, which is thin for a sine at the very top of the band but comfortable for the 10–30MHz digital edges most hobby boards produce. For comparison, the Rigol DS1054Z drops to 250 MSa/s per channel once three or four channels are on, so with two channels in use the Hantek keeps the higher per-channel rate."
    },
    {
      heading: "Memory depth and long captures",
      body: "Record length is 8 Mpts on one channel and 4 Mpts with two. Memory decides how long you can capture at full sample rate: at 500 MSa/s, 4 Mpts covers about 8 ms, which is enough to catch several whole UART bytes at 9,600 baud (about 1 ms each) without the scope quietly lowering its sample rate. Hantek does not publish a waveform update rate for this model, so we can't compare how quickly it redraws against the Siglent's stated 100,000 waveforms per second."
    },
    {
      heading: "The generator in numbers",
      body: "The built-in source is one channel, up to 25MHz, at 200 MSa/s and 12-bit resolution. It produces sine, square, ramp, exponential, noise and DC, plus four arbitrary waveform slots of 4 KSa each. Output reaches 7 Vpp into a high-impedance load or 3.5 Vpp into 50 ohms, from a 50-ohm output. That is plenty for driving an op-amp stage, a filter, or a logic input; it is not a replacement for a dedicated two-channel generator when you need two phase-related stimuli."
    },
    {
      heading: "Decoding and resolution modes",
      body: "UART/RS232, I2C, SPI, CAN and LIN trigger and decode are listed as standard. With only two analog channels, I2C (clock plus data) fits exactly, while full four-wire SPI does not: you can watch clock and one data line at a time. The ADC is 8-bit, with a 12-bit high-resolution mode. On most scopes that kind of mode works by averaging neighboring samples, which lowers noise on slow signals but trades away some effective bandwidth, so treat it as a tool for small, slow signals rather than fast edges."
    },
    {
      heading: "How we rate it",
      body: "We rate the DSO2D10 4.3 rather than alongside the hands-on tested Rigol DS1054Z and Siglent SDS1104X-E because we have not bench-tested it, Hantek leaves some figures unpublished (waveform update rate among them), and the two-channel limit narrows who it suits. The specifications it does publish are strong for a combined instrument."
    },
    {
      heading: "Checking the generator-and-channels interaction before you buy",
      body: "A combined scope-and-generator saves a genuine amount of desk space — one enclosure and one power cord instead of two — but it doesn't add channels. The DSO2D10's 2 scope channels are 2 scope channels whether or not the generator is running at the same time. If you route the generator into your circuit and want to see both the stimulus and the response, that uses both inputs, leaving nothing spare for a third signal."
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
      reason: "4 channels on the same 7-inch 800 × 480 screen size, at 50MHz."
    },
    {
      name: "FNIRSI DSO152",
      href: "/oscilloscopes/fnirsi-dso152-review",
      reason: "A pocket single-channel scope if you only need to see slow signals and want to spend far less."
    }
  ],
  faqs: [
    {
      question: "What does the waveform generator on the Hantek DSO2D10 do?",
      answer: "It outputs test signals you can feed into a circuit, so you can stimulate and measure with one instrument. Hantek lists one output channel up to 25MHz with sine, square, ramp, exponential, noise, DC and four arbitrary waveforms, at up to 7 Vpp into a high-impedance load."
    },
    {
      question: "How many channels does the Hantek DSO2D10 have?",
      answer: "Two analog channels. Similarly priced scopes such as the Rigol DS1054Z and Siglent SDS1104X-E offer four, which is the main trade-off for the built-in generator. Two channels still cover the most common comparisons: input against output, or a clock against one data line."
    },
    {
      question: "When does having only 2 channels actually become a real limitation?",
      answer: "When you need to compare more than two signals at the same time — a clock against two data lines, or several interacting analog stages. For single-signal checks or one input against one output, 2 channels is rarely a constraint. Multi-signal debugging is where a 4-channel scope like the Rigol DS1054Z becomes the more comfortable tool."
    },
    {
      question: "Can the Hantek DSO2D10 decode I2C and SPI?",
      answer: "Yes. Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding as standard. I2C needs only clock and data, so it fits the two channels exactly. SPI normally has clock, data out, data in and chip select, so with two inputs you decode one data direction at a time."
    },
    {
      question: "Hantek DSO2D10 or DSO2C10: what's the difference?",
      answer: "Hantek's spec table lists a one-channel generator for the DSO2D10 and none for the DSO2C10, while the scope sections share the same memory, decoding and 7-inch screen. If you already own a function generator, or never need to inject a test signal, the generator-free model does the scope job without paying for a source you won't use. Our Hantek DSO2C10 vs DSO2D10 comparison covers the details."
    }
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes"
  },
  related: [
    {
      label: "Rigol DS1054Z vs Hantek DSO2D10",
      href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10"
    },
    {
      label: "Hantek DSO2C10 vs DSO2D10",
      href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10"
    },
    {
      label: "Hantek DSO2D10 vs Siglent SDS1104X-E",
      href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e"
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
