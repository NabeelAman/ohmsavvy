// Siglent SDS1104X-E specs per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/
//   (checked 2026-10-24): 7 Mpts/ch, 14 Mpts interleaved; 7-inch TFT-LCD 800 × 480; 100,000 wfm/s normal, 400,000 wfm/s in
//   sequence mode; serial trigger and decode for I2C, SPI, UART/RS232, CAN and LIN as standard.
// SDS1000X-E data sheet https://siglentna.com/download/22005/: 8-bit vertical resolution; 100-240 V AC, 50 W max (4-ch
//   models); math incl. 1 Mpts FFT; 38 automatic measurements; hardware pass/fail; 16-channel MSO and USB AWG are options for
//   the 4-channel models only; no HDMI listed.
// Rigol DS1054Z per the DS1000Z data sheet (DSA20100-2020-09,
//   https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf): up to
//   30,000 wfm/s; decode Parallel, RS232/UART, I2C, SPI (no CAN/LIN). Rigol's product page lists memory as 12 Mpts standard
//   (24 Mpts optional) and decode as options, while the data sheet lists 24 Mpts and decode without an option label.
// Bandwidth, channels and sample rate per the Pick in ../best-beginner-oscilloscopes/page.
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
    "You debug I2C, SPI, UART, CAN or LIN buses and want decoding included rather than sold as an option",
    "You chase rare glitches, where a fast waveform capture rate raises the odds of seeing them",
  ],
  skipIf: [
    "You're a complete beginner: the Rigol DS1054Z covers learning for less",
    "Budget is your deciding factor",
    "You need more than 8-bit vertical resolution for small signals riding on large ones, such as power-rail ripple measured in detail",
  ],
  tradeOffs: "It costs more than the Rigol DS1054Z. For that you get double the bandwidth and a better-regarded interface, at the same channel count and maximum sample rate (with a higher per-channel rate when three or four channels are on), plus standard serial decoding that includes CAN and LIN. That's worth it if any of those things is a genuine priority for you.",
  assessment: [
    {
      heading: "Bandwidth",
      body: "100MHz is double the Rigol DS1054Z's 50MHz. By the 3–5× rule of thumb, it's comfortable on signals up to roughly 20–33MHz, which covers many hobby microcontroller clocks and serial buses.",
    },
    {
      heading: "Channels, sample rate, and interface",
      body: "Four channels at a 1 GSa/s maximum, the same peak as the Rigol, but 500 MSa/s per channel with all four on versus the Rigol's 250 MSa/s, plus an interface that's widely regarded as intuitive.",
    },
    {
      heading: "What the interface actually gets you",
      body: "An intuitive interface isn't a cosmetic nicety on an instrument you'll reach for dozens of times a session. It's the difference between adjusting a trigger or timebase in a couple of button presses versus hunting through nested menus mid-task. For someone learning to use a scope, a layout that matches your intuition means more time spent actually reading the waveform in front of you and less time fighting the instrument to display it correctly in the first place.",
    },
    {
      heading: "Memory depth: how long a capture really lasts",
      body: "Siglent lists 7 Mpts per channel, or 14 Mpts when channels are interleaved. Memory sets how long the scope can record before it has to lower its sample rate. The arithmetic is simple: 14 million points at 1 GSa/s fills in 14 ms, and 7 million points at 500 MSa/s also covers 14 ms. That's long enough to hold several complete UART bytes or a burst of SPI traffic at full resolution, then zoom in on one edge. Rigol's own sources disagree on the DS1054Z (12 Mpts standard on its product page, 24 Mpts in the data sheet), so on memory alone the Rigol is the deeper scope.",
    },
    {
      heading: "Waveform capture rate and glitch hunting",
      body: "Siglent quotes 100,000 waveforms per second in normal mode and 400,000 in sequence mode, against up to 30,000 in Rigol's DS1000Z data sheet. Every scope spends time between captures processing and drawing, and anything that happens in that gap is missed. A faster capture rate shrinks the blind time, so an intermittent runt pulse or a once-in-a-thousand glitch is more likely to land on screen, especially with persistence turned on.",
    },
    {
      heading: "Serial decoding included",
      body: "I2C, SPI, UART/RS232, CAN and LIN triggering and decoding come as standard, according to Siglent. For Arduino and embedded work that means you can trigger on a specific I2C address or UART byte and read the decoded values under the waveform without buying a license. CAN and LIN make it relevant to automotive and industrial bus work too, which the Rigol's decode list (Parallel, RS232/UART, I2C and SPI) doesn't cover.",
    },
    {
      heading: "Screen, analysis and expansion",
      body: "The 7-inch, 800 × 480 display is the same size and resolution as the Rigol's. Siglent's data sheet lists 38 automatic measurements, a 1 Mpts FFT and hardware pass/fail testing. On the four-channel models, a 16-channel logic analyzer (MSO) and a USB waveform generator are available as options, so the scope can grow into mixed-signal work later. There's no HDMI output listed, and the instrument draws up to 50 W from a 100–240 V AC supply.",
    },
    {
      heading: "Hands-on, and what we haven't published",
      body: "Our owner bought and uses this scope, which is why it carries the Hands-on Tested badge. We haven't published bench measurements from it yet, so every number on this page comes from Siglent's or Rigol's own published specifications rather than our measurements. When we add test results, they'll appear here with the method used.",
    },
    {
      heading: "Limitations",
      body: "Its ADC is 8-bit, so it resolves 256 vertical levels across the screen, the same as most scopes in this class. Small ripple riding on a large DC rail needs AC coupling or a higher-resolution scope to see clearly. Rigol lists more memory for the DS1054Z, the logic channels and generator cost extra, and 100MHz still isn't enough for fast edges on modern high-speed digital designs.",
    },
  ],
  alternatives: [
    {
      name: "Rigol DS1054Z",
      href: "/oscilloscopes/rigol-ds1054z-review",
      reason: "4 channels and 1 GSa/s for less, with 50MHz bandwidth.",
    },
    {
      name: "Rigol DHO804",
      href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
      reason: "A newer four-channel Rigol with 12-bit resolution and a touchscreen: less bandwidth (70MHz), but cleaner small-signal detail.",
    },
    {
      name: "Hantek DSO2D10",
      href: "/oscilloscopes/hantek-dso2d10-review",
      reason: "100MHz with a built-in waveform generator, but 2 channels.",
    },
  ],
  faqs: [
    {
      question: "Siglent SDS1104X-E or Rigol DS1054Z?",
      answer: "Both have 4 channels and 1 GSa/s. The Siglent doubles bandwidth to 100MHz, includes CAN and LIN decoding as standard and is often praised for its interface; the Rigol costs less and lists more memory. If your signals stay well under 10MHz and you don't need bus decoding, the Rigol is the sensible saving.",
    },
    {
      question: "Is 100MHz overkill for a beginner?",
      answer: "For learning the basics, usually yes. It makes sense if you expect to work with faster digital signals as your projects develop.",
    },
    {
      question: "What am I actually paying the premium for over the Rigol, given the specs look similar otherwise?",
      answer: "Mainly two things: 100MHz bandwidth rated from the factory, double the Rigol's 50MHz, and an interface that's consistently rated easier to pick up. Standard CAN and LIN decoding and a faster capture rate come with it. Channel count and maximum sample rate are the same, so if none of that matters to your work, the premium buys you comparatively little.",
    },
    {
      question: "Does 100MHz of bandwidth translate to a specific real-world benefit for hobby projects?",
      answer: "By the 3-5x rule of thumb, 100MHz gives you comfortable, accurate readings on signals up to roughly 20-33MHz, double the Rigol's effective range. In practice that covers faster microcontroller clocks, certain serial communication buses, and digital signals that would start to look visibly distorted on a 50MHz scope. If your current projects stay well under that ceiling, the extra headroom is insurance against outgrowing the instrument rather than something you'll notice day to day.",
    },
    {
      question: "Does the Siglent SDS1104X-E decode CAN bus?",
      answer: "Yes. Siglent lists I2C, SPI, UART/RS232, CAN and LIN serial triggering and decoding as standard on the SDS1000X-E series, so there's no license to buy. That makes it useful for checking automotive or industrial CAN traffic on a bench, though for long captures of busy networks a dedicated CAN adapter and software is often the easier tool.",
    },
    {
      question: "Can the SDS1104X-E work as a logic analyzer?",
      answer: "Only with an option. Siglent offers a 16-channel MSO add-on for the four-channel SDS1000X-E models, which adds digital inputs alongside the four analog channels. Out of the box it has four analog channels only, which is still enough to decode an I2C or SPI bus directly from the analog inputs using the standard decode feature.",
    },
  ],
  roundup: {
    label: "See all beginner oscilloscope picks",
    href: "/oscilloscopes/best-beginner-oscilloscopes",
  },
  related: [
    {
      label: "Rigol DS1054Z vs Siglent SDS1104X-E",
      href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e",
    },
    {
      label: "Rigol DHO804 vs Siglent SDS1104X-E",
      href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
    },
    {
      label: "What is oscilloscope bandwidth?",
      href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
    },
    {
      label: "Oscilloscope buying guide",
      href: "/oscilloscopes/oscilloscope-buying-guide",
    },
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
