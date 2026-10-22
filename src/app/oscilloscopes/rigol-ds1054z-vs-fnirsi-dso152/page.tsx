import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs FNIRSI DSO152: Which to Buy?",
  description:
    "Rigol DS1054Z vs FNIRSI DSO152: a 4-channel 50MHz bench scope against a 1-channel 200kHz pocket scope. Charts, use cases and which first scope to buy.",
  path: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs FNIRSI DSO152",
  path,
  published: "2026-10-22",
  intro:
    "Rigol DS1054Z vs FNIRSI DSO152 is really a question about what kind of first oscilloscope you need. The Rigol is a 4-channel, 50MHz, 1 GSa/s bench scope with a 7-inch display. The FNIRSI is a pocket-sized, single-channel scope with 200kHz of bandwidth and 2.5 MSa/s. They are not rivals at the same job: one is a full bench instrument, the other a low-cost way to see slow waveforms.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z 4-channel digital bench oscilloscope",
    chooseIf: [
      "You want one scope that covers microcontroller, digital and audio work for years",
      "You need to compare signals: input against output, or clock against data",
      "Your signals run above a few tens of kilohertz, such as I2C, SPI or switching supplies",
      "You'd rather buy the hands-on tested pick in this pairing",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI DSO152")!,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want to find out cheaply whether you'll use a scope at all",
      "Your signals are audio-range or slower and one channel is enough",
      "You want a scope small enough to carry in a pocket or tool bag",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Benchtop", b: "Pocket-sized" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 10–17MHz", b: "Up to roughly 40–65kHz" },
  ],
  differences: [
    "Bandwidth: 50MHz on the Rigol against 200kHz on the FNIRSI, a 250-fold gap. By the 3–5× rule the Rigol is comfortable to about 10–17MHz; the FNIRSI to about 40–65kHz.",
    "Sample rate: 1 GSa/s on the Rigol with one channel (250 MSa/s per channel with three or four on) against 2.5 MSa/s on the FNIRSI. Even with all four Rigol channels running, that is 100 times faster.",
    "Channels: 4 against 1. The FNIRSI cannot show two signals together, so timing between signals and input-versus-output checks are out.",
    "Form factor: the Rigol is a benchtop instrument with a 7-inch display; the FNIRSI is pocket-sized.",
    "The Rigol carries our Hands-on Tested badge; the FNIRSI assessment is desk research based on its published specs.",
    "The FNIRSI is the far cheaper way in; the Rigol costs several times more but is the scope most beginners grow into rather than out of.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most comparisons between scopes argue over a factor of two. Here the gaps are measured in hundreds,
          so the bandwidth and sample rate charts use a log scale; on a linear scale the FNIRSI&apos;s bar
          would be too thin to see. Every number comes from each maker&apos;s published specs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point), log scale: the Rigol&apos;s is 250 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1054Z", value: 50_000_000, display: "50MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. The Rigol drops to 250 MSa/s per channel with three or four channels on, still 100 times the FNIRSI.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1054Z (1 ch)", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "Rigol DS1054Z (3–4 ch)", value: 250_000_000, display: "250 MSa/s" },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels: the Rigol can show four signals at once; the FNIRSI shows one.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4 channels", highlight: true },
                { label: "FNIRSI DSO152", value: 1, display: "1 channel" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest signal frequency each is comfortable on, using the 5× end of the 3–5× rule (bandwidth ÷ 5), log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1054Z", value: 10_000_000, display: "≈10MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 40_000, display: "≈40kHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Sample rate and bandwidth line up sensibly on both. At its 200kHz limit the FNIRSI still takes 12.5
          samples per cycle (2.5 MSa/s ÷ 200kHz), and the Rigol takes 20 per cycle at 50MHz on one channel, or
          5 with all four channels on. Both stay well clear of the Nyquist minimum of two samples per cycle. For
          what these figures mean, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["Curious whether you'll use a scope at all", "FNIRSI DSO152", "The cheapest way to see a waveform; low stakes if it sits in a drawer"],
            ["Learning sine, square and audio waveforms", "FNIRSI DSO152", "200kHz covers the audio band with room to spare"],
            ["Debugging Arduino or microcontroller projects", "Rigol DS1054Z", "I2C, SPI and fast edges need far more than 200kHz"],
            ["Comparing input and output, or clock and data", "Rigol DS1054Z", "4 channels; the FNIRSI has only 1"],
            ["Checking switching power supplies", "Rigol DS1054Z", "Switching frequencies often sit beyond the FNIRSI's comfortable range"],
            ["A student or hobbyist buying one scope for years", "Rigol DS1054Z", "50MHz and 4 channels cover most beginner and intermediate work"],
            ["Wanting a grab-and-go scope beside a bench scope", "FNIRSI DSO152", "Pocket-sized, for quick checks away from the bench"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth is the frequency at which a sine wave is shown about 3 dB low, roughly 70% of
          its true amplitude. To see a signal&apos;s shape accurately, the usual rule of thumb is a scope with 3–5
          times the signal&apos;s frequency, and more for square waves, because their sharp edges are built from
          harmonics well above the fundamental. Applied to these two scopes, that rule draws very different
          boundaries.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: audio and slower</h3>
        <p className="text-muted leading-7 mb-4">
          With 200kHz of bandwidth, the DSO152 is comfortable up to roughly 40–65kHz. That covers the whole audio
          band (up to about 20kHz), so you can check whether an amplifier output is clipping, see the ripple on a
          linear supply at mains-related frequencies, watch a slow sensor output change, or confirm a low-frequency
          PWM pin is actually toggling. Its limits arrive quickly after that. A 100kHz I2C clock is already past
          its comfortable range and its edges will look rounded; SPI clocks in the megahertz and most switching
          regulators are out of reach. And with one channel, it can&apos;t show cause and effect side by side,
          which is how much real debugging gets done.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1054Z: general electronics</h3>
        <p className="text-muted leading-7 mb-4">
          At 50MHz the DS1054Z is comfortable on signals up to roughly 10–17MHz. That takes in microcontroller
          GPIO, UART, I2C and SPI at typical hobby speeds, PWM motor drives, most switching supplies and everything
          the FNIRSI can show. Four channels let you watch a clock, data line, chip select and output together.
          Where it runs short is RF and very fast digital edges, the cases its own review flags as modest; for
          those, a 100MHz scope such as the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          gives more headroom.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A fast square wave on a scope with ample bandwidth: sharp edges, true shape. Illustration, not a capture.</>}>
            <ScopeScreen wave="square" cycles={3} amplitude={2.5} labels={{ left: "Plenty of bandwidth" }} />
          </Figure>
          <Figure caption={<>The same signal near a scope&apos;s bandwidth limit: edges rounded off, so rise time and overshoot can&apos;t be trusted. Illustration, not a capture.</>}>
            <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} labels={{ left: "Too little bandwidth" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Why a slow scope rounds a fast edge">
            A common approximation puts a scope&apos;s own fastest displayable rise time at about 0.35 divided by its
            bandwidth. For the FNIRSI that is roughly 1.75 µs; for the Rigol, roughly 7 ns. A 50kHz square wave has a
            20 µs period, so on the FNIRSI each edge takes up a visible slice of the cycle, while on the Rigol it looks
            essentially vertical. The exact figure depends on the front end&apos;s response, but the 250-fold gap
            doesn&apos;t.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains and high voltage">
            On a mains-powered bench scope like the Rigol, the probe ground clip is normally tied to mains earth
            through the power cord. Clipping it to a live or non-earthed point creates a short through the scope.
            Use a differential probe or proper isolation for mains work, and don&apos;t use the FNIRSI on mains
            unless its input rating covers it; that rating isn&apos;t in our verified data.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buying both, or one after the other</h2>
        <p className="text-muted leading-7">
          These two don&apos;t replace each other, so owning both is sensible. A common path is to start with the
          FNIRSI, learn what a waveform looks like and how timebase and volts-per-division work, and step up to a
          bench scope once you run into its single channel or 200kHz ceiling. If you already know you&apos;ll be
          debugging microcontroller projects, skipping straight to the Rigol avoids buying a tool you&apos;ll
          outgrow within weeks. For other bench options, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" className={link}>
            FNIRSI DSO152 vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" className={link}>
            FNIRSI DSO152 vs Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>
          , or the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most people buying a first oscilloscope to build and debug circuits, the Rigol DS1054Z is the better buy: 250 times the bandwidth, four channels instead of one, and enough headroom for microcontroller and power-supply work for years. The FNIRSI DSO152 earns its place as a pocket-sized, very cheap way to learn what waveforms look like and check audio-range signals, or as a grab-and-go companion to a bench scope, not as a substitute for one.",
  faqs: [
    {
      question: "Is the FNIRSI DSO152 good enough as a first oscilloscope?",
      answer:
        "For learning waveform basics, yes. Its 200kHz bandwidth and 2.5 MSa/s handle audio-range and other slow signals, and the low price makes it a cheap way to find out whether you will use a scope. If you plan to debug microcontroller or digital circuits, its single channel and bandwidth limit will stop you quickly, and the Rigol DS1054Z is the better first buy.",
    },
    {
      question: "Can the FNIRSI DSO152 check Arduino signals?",
      answer:
        "Only the slow ones. It can confirm a low-frequency PWM output or a slow sensor signal is present. A 100kHz I2C clock is past its comfortable range of roughly 40–65kHz, SPI clocks are far beyond it, and with one channel it cannot show clock and data together. For Arduino debugging, the 50MHz, 4-channel Rigol DS1054Z is the practical tool.",
    },
    {
      question: "How much faster is the Rigol DS1054Z than the FNIRSI DSO152?",
      answer:
        "Its bandwidth is 250 times higher: 50MHz against 200kHz. Its sample rate is 400 times higher with one channel on, 1 GSa/s against 2.5 MSa/s, and still 100 times higher at 250 MSa/s per channel with three or four channels running. It also has four input channels to the FNIRSI's one.",
    },
    {
      question: "Should I buy the FNIRSI DSO152 first and upgrade to the Rigol later?",
      answer:
        "It is a reasonable path if you are unsure you will use a scope; the FNIRSI costs little and teaches the basics. If you already know you will work on microcontroller, digital or power-supply projects, buy the Rigol DS1054Z directly. You would hit the FNIRSI's single channel and 200kHz limit almost immediately, and it would end up as a backup tool.",
    },
    {
      question: "Does the Rigol DS1054Z lose sample rate with four channels on?",
      answer:
        "Yes. Rigol's datasheet gives 1 GSa/s with a single channel and 250 MSa/s per channel with three or four channels on. That is still 5 samples per cycle at the 50MHz bandwidth limit, comfortably above the Nyquist minimum, and 100 times the FNIRSI DSO152's 2.5 MSa/s.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
  ],
};

export default function RigolDs1054zVsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
