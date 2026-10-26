import { ContentLinks } from "@/components/ContentLinks";
import { ProductReview, type ProductReviewContent } from "@/components/ProductReview";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

// Rigol DS1054Z extras per the DS1000Z datasheet DSA20100-2020-09
// (https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf):
// 8-bit (12-bit high-res mode), 7-inch 800x480, up to 30,000 wfm/s, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch),
// decode Parallel, RS232/UART, I2C, SPI, USB host/device + LAN, 100-240 V AC 50 W max, no generator (-S models only).
// Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html says 12M standard / 24M optional memory and
// lists bus triggering/decoding as options; the datasheet lists 24 Mpts and decoding with no option label (checked 2026-10-24).
// Siglent SDS1104X-E 100,000 wfm/s and 500 MSa/s per channel with all on per https://siglentna.com/download/22005/.

export const metadata = buildMetadata({
  title: "Rigol DS1054Z Review",
  description: "Rigol DS1054Z review: 50MHz, four channels and 1 GSa/s on a 7-inch screen. What each spec means in practice, where 50MHz runs out, and who should buy it.",
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
    "You value strong community support and documentation while you learn",
    "You'd rather buy the hands-on tested pick in this category than one assessed from its spec sheet alone"
  ],
  skipIf: [
    "You work on RF or need bandwidth well beyond 50MHz",
    "You want the most intuitive menus — navigation has a learning curve",
    "You need a built-in signal generator: on this family that is only on the -S models"
  ],
  tradeOffs: "50MHz of bandwidth is modest. It covers most beginner and hobby work, but if your projects are heading toward faster signals, the 100MHz Siglent SDS1104X-E gives more headroom from the factory.",
  assessment: [
    {
      heading: "Channels and display",
      body: "Four channels at this price are rare, and the 7-inch 800 × 480 display makes it practical to view several signals at once. Four inputs let you watch an SPI bus whole (clock, chip select, and both data lines) or follow a signal through three stages of an amplifier alongside its input."
    },
    {
      heading: "Bandwidth and sample rate",
      body: "50MHz and 1 GSa/s. By the 3–5× rule of thumb, that's comfortable on signals up to roughly 10–17MHz: enough for most microcontroller and audio-range work, but modest for RF. The 1 GSa/s figure is for a single channel; Rigol's datasheet gives 500 MSa/s per channel with two on and 250 MSa/s per channel with three or four on."
    },
    {
      heading: "What 250 MSa/s with four channels means",
      body: "With every input active, each channel gets one sample every 4 ns. A 50MHz signal has a 20 ns period, so that is five samples per cycle at the very top of the band: enough to show the frequency, too few to judge the shape of a sine accurately. For typical four-channel jobs, such as a 1MHz SPI clock beside its chip select and data lines, it is ample. If you need full speed, turn off the channels you aren't using and the per-channel rate climbs back to 500 MSa/s or 1 GSa/s."
    },
    {
      heading: "Memory depth: Rigol's two sources disagree",
      body: "The DS1000Z datasheet lists 24 Mpts of record length, while Rigol's current product page lists 12 Mpts standard with 24 Mpts as an option. Either figure is generous at this level. Taking them as maximum record lengths, 12 Mpts at the full 1 GSa/s covers 12 ms of capture and 24 Mpts covers 24 ms, long enough to record a burst of serial traffic and zoom into individual bits afterward. Check the listing for the memory option before you buy if long captures matter to you."
    },
    {
      heading: "Update rate and finding glitches",
      body: "Rigol quotes up to 30,000 waveforms per second. A faster update rate means less dead time between captures, so a rare glitch is more likely to land on screen. The Siglent SDS1104X-E is rated at 100,000 waveforms per second, which is one concrete reason to pay more for it if you hunt intermittent faults."
    },
    {
      heading: "Decoding, connectivity and resolution",
      body: "The datasheet lists parallel, RS232/UART, I2C and SPI decoding, plus USB host and device ports and LAN for saving screenshots and remote control. Rigol's product page presents bus triggering and decoding as options, so confirm what the unit you buy includes. The ADC is 8-bit, with a 12-bit high-resolution mode for small, slow signals."
    },
    {
      heading: "Hands-on in our lab",
      body: "Our testing team bought this unit and tested it in our lab, which is why it carries our \"Hands-on Tested\" badge rather than an assessment from the spec sheet alone. Detailed results from that testing aren't published on this page yet; when they are, they'll appear here with the method we used. Until then, the bandwidth, channel count, sample rate and display details on this page are verified against Rigol's own published data, and the verdict rests on what those specs mean for beginner and hobby work.",
    },
    {
      heading: "Buy the bandwidth you need",
      body: "Rigol sells and specifies the DS1054Z as a 50MHz oscilloscope and documents no bandwidth upgrade for it. If your signals need more than 50MHz, buy a scope rated for it from the factory, like the 100MHz Siglent SDS1104X-E, rather than counting on anything beyond the published spec."
    }
  ],
  alternatives: [
    {
      name: "Siglent SDS1104X-E",
      href: "/oscilloscopes/siglent-sds1104x-e-review",
      reason: "Double the bandwidth at 100MHz, a faster update rate, and a well-regarded interface."
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
      answer: "Usually. By the 3–5× rule of thumb, 50MHz handles signals up to roughly 10–17MHz, which covers Arduino and ESP32 projects, audio circuits, PWM, and common serial buses like UART, I2C and slower SPI. It runs short on fast edges, high-speed SPI, and anything radio-frequency."
    },
    {
      question: "Rigol DS1054Z or Siglent SDS1104X-E?",
      answer: "Both have 4 channels and 1 GSa/s. The Siglent doubles bandwidth to 100MHz, keeps 500 MSa/s per channel with all four on against the Rigol's 250 MSa/s, and quotes a faster update rate. The Rigol costs less and remains plenty for most hobby work. Both are hands-on tested picks."
    },
    {
      question: "Is the menu navigation learning curve a dealbreaker?",
      answer: "No, but it's real. Expect to spend some time early on finding where common settings live, since several adjustments take more button presses than on scopes with a more streamlined interface. The friction fades with repetition, and for most beginners it's outweighed by the four channels and large display at this price."
    },
    {
      question: "Does the Rigol DS1054Z have a built-in signal generator?",
      answer: "No. Rigol's datasheet puts the built-in signal source only on the -S models of the DS1000Z family, which cost more. If you need a test signal, pair the DS1054Z with a separate function generator, or look at the Hantek DSO2D10, which builds a one-channel 25MHz generator into a two-channel scope."
    },
    {
      question: "How much memory does the Rigol DS1054Z have?",
      answer: "Rigol's own sources differ. The DS1000Z datasheet lists 24 Mpts, while the current product page lists 12 Mpts standard with 24 Mpts as an option. Either way it is deep memory for a beginner scope, enough to keep the sample rate high over captures lasting several milliseconds or more, which matters when you record serial bursts and zoom in later."
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
      label: "Rigol DHO804 vs DS1054Z",
      href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z"
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

export default function RigolDs1054zReviewPage() {
  return (
    <>
      <ProductReview review={review} />
      <ContentLinks category="oscilloscopes" current="/oscilloscopes/rigol-ds1054z-review" />
    </>
  );
}
