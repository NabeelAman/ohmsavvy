import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10";

const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

export const metadata = buildMetadata({
  title: "FNIRSI DSO152 vs Hantek DSO2D10: Which to Buy?",
  description:
    "FNIRSI DSO152 vs Hantek DSO2D10: a 200kHz single-channel pocket scope against a 100MHz two-channel bench scope with a generator. Which fits your work?",
  path: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10",
  image: fnirsi.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DSO152 vs Hantek DSO2D10",
  path,
  published: "2026-10-22",
  intro:
    "The FNIRSI DSO152 vs Hantek DSO2D10 choice is less a contest than a question of which job you have. The FNIRSI is a pocket-sized, one-channel scope with 200kHz of bandwidth for quick checks and learning. The Hantek is a compact two-channel bench scope with 100MHz of bandwidth, 1 GSa/s and a built-in waveform generator. One shows you slow signals cheaply; the other can debug real digital circuits.",
  a: {
    pick: fnirsi,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want the lowest-cost way to see what waveforms look like before committing to a bench scope",
      "Your signals are audio-range or slower: PWM, sensor outputs, audio clipping checks",
      "You want a scope that fits in a pocket or a toolbag",
    ],
  },
  b: {
    pick: hantek,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
    chooseIf: [
      "You debug microcontroller, digital bus or switching circuits with edges well above audio frequencies",
      "You need two channels to compare an input against an output, or a clock against data",
      "You want a signal source and a scope in one compact unit on a small bench",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Pocket-sized handheld", b: "Compact benchtop" },
    { label: "Comfortable signal ceiling (3–5x rule)", a: "About 40–67kHz", b: "About 20–33MHz" },
  ],
  differences: [
    "Bandwidth: 200kHz on the FNIRSI against 100MHz on the Hantek, a 500-fold gap that decides which signals each can show accurately.",
    "Sample rate: 2.5 MSa/s against 1 GSa/s, 400 times more samples per second on the Hantek.",
    "Channels: one on the FNIRSI, two on the Hantek, so only the Hantek can show an input and output, or a clock and data line, at the same time.",
    "The Hantek includes a single-channel waveform generator (to 25 MHz); the FNIRSI DSO152's listed specs include no signal source.",
    "The FNIRSI is genuinely pocket-sized; the Hantek is a compact bench instrument meant to stay on a desk.",
    "The FNIRSI is the low-cost entry point of the two; check the live Amazon prices, as both move often.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper these two are separated by more than two orders of magnitude on the specs that matter most.
          The bars below use a logarithmic scale, because on a linear one the FNIRSI&apos;s bar would be too thin
          to see. Bandwidth decides how fast a signal can be before the scope starts to shrink and round it off;
          sample rate decides how many points the scope captures to draw it. Our explainers on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          cover both in more depth.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth, log scale: the Hantek&apos;s 100MHz is 500 times the FNIRSI&apos;s 200kHz.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
                { label: "Hantek DSO2D10", value: 100_000_000, display: "100MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate, log scale: 1 GSa/s is 400 times 2.5 MSa/s.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
                { label: "Hantek DSO2D10", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: the Hantek can show two signals against each other.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO152", value: 1, display: "1 channel" },
                { label: "Hantek DSO2D10", value: 2, display: "2 channels", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest signal each shows comfortably, by the 3–5x rule (upper end of each range, log scale).</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI DSO152", value: 66_667, display: "≈ 40–67kHz" },
                { label: "Hantek DSO2D10", value: 33_333_333, display: "≈ 20–33MHz", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The sample rate gap matters less than it looks inside each scope&apos;s own bandwidth. At 2.5 MSa/s the
          FNIRSI still takes about 125 samples per cycle of a 20kHz audio tone, which is plenty to draw it cleanly.
          The problem only appears when you point it at something faster than it was built for: a 1MHz clock would
          get just 2.5 samples per cycle, barely above the Nyquist minimum of two, and the trace would no longer
          resemble the real waveform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is the frequency at which a sine wave is already shown about 3 dB low, at
          roughly 70.7% of its true amplitude. That is why the common rule of thumb is to buy 3 to 5 times more
          bandwidth than the fastest signal you care about. Applied to these two, the FNIRSI DSO152 is comfortable
          up to roughly 40–67kHz and the Hantek DSO2D10 up to roughly 20–33MHz. For square waves and digital
          signals the bar is higher still, because a clean edge contains harmonics many times its basic frequency;
          exactly how much bandwidth an edge needs depends on its rise time, not just its repetition rate.
        </p>
        <p className="text-muted leading-7 mb-4">
          That puts the FNIRSI squarely in audio-range work: checking that an amplifier output isn&apos;t clipping,
          watching a slow PWM signal drive an LED or motor, seeing a sensor output change, or simply learning the
          difference between a sine, a square and a triangle wave on a real screen. It can&apos;t meaningfully show
          a microcontroller clock, an SPI bus, the switching node of most modern switch-mode supplies, or ringing on
          a fast edge, and with one channel it can&apos;t compare two signals in time at all.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Hantek covers that whole audio range with huge headroom and then keeps going: UART, I2C and SPI
          signals at typical hobby speeds, PWM edges, switching-supply waveforms and microcontroller clocks in the
          tens of megahertz are all inside its 3–5x window. Its second channel is what turns it into a debugging
          tool rather than a viewer: trigger on a clock and watch data, or put channel 1 on a filter&apos;s input
          and channel 2 on its output. The built-in generator can supply that input, so you can test a filter or
          amplifier with nothing else on the bench. Note that it is a single-channel generator, and the
          scope&apos;s two channels stay two channels whether the generator is running or not.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Figure caption={<>A 10kHz square wave on a scope with plenty of bandwidth: sharp edges, a true picture.</>}>
            <ScopeScreen wave="square" cycles={3} amplitude={2.5} labels={{ left: "Fast enough scope" }} />
          </Figure>
          <Figure caption={<>The same idea pushed past a scope&apos;s bandwidth: edges round off and the shape is wrong.</>}>
            <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} labels={{ left: "Too slow a scope" }} />
          </Figure>
        </div>
        <KeyIdea title="Why a slow scope lies about fast edges">
          A scope can&apos;t show detail faster than its front end passes. Feed a square wave much faster than a few
          tens of kilohertz into a 200kHz scope and its corners round off, its amplitude drops, and overshoot or
          ringing that is really there disappears. The trace looks calm when the circuit isn&apos;t. On the Hantek
          the same signal sits far below its 100MHz limit, so what you see is much closer to what is actually on
          the wire.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["Curious about scopes, unsure you will use one", "FNIRSI DSO152", "Cheap way to learn waveform basics; little lost if it ends up in a drawer"],
            ["Checking audio amps, guitar pedals or speaker signals", "FNIRSI DSO152", "Audio sits inside its 200kHz bandwidth with room to spare"],
            ["Carrying a scope in a toolbag for quick checks", "FNIRSI DSO152", "Pocket-sized; the Hantek is a bench instrument"],
            ["Debugging Arduino, ESP32 or Raspberry Pi projects", "Hantek DSO2D10", "100MHz and 1 GSa/s reach digital clocks and buses"],
            ["Comparing an input to an output, or clock to data", "Hantek DSO2D10", "Two channels; the FNIRSI has one"],
            ["Testing filters, amplifiers or sensor inputs", "Hantek DSO2D10", "Built-in generator (one channel, to 25 MHz) supplies the test signal"],
            ["Working on switch-mode power supplies", "Hantek DSO2D10", "Switching edges are far beyond 200kHz"],
            ["Short on bench space but need a scope and a signal source", "Hantek DSO2D10", "Two instruments in one compact unit"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If two channels are not enough for you either, the four-channel benches are compared in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>
          . For the full field, see our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
        <div className="mt-4">
          <Callout title="Mains and high voltage">
            Neither pick&apos;s listed specs give an input voltage rating, so check the maker&apos;s manual before
            probing anything above low-voltage electronics. On a mains-powered bench scope the probe&apos;s ground
            clip is normally tied to mains earth: clipping it to a live or non-earth-referenced point can short the
            circuit through the scope. Use a differential probe or an isolated setup for mains work.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI DSO152 if you want to see slow signals for very little money, carry a scope in your pocket, or find out whether you will use a scope at all. Buy the Hantek DSO2D10 if you already know you will debug digital, switching or multi-signal circuits: its 100MHz, 1 GSa/s, second channel and built-in generator do work the FNIRSI cannot attempt. The two also pair well: a pocket scope for quick checks away from the bench, a bench scope for real debugging.",
  faqs: [
    {
      question: "Is the FNIRSI DSO152 good enough for Arduino projects?",
      answer:
        "Only for the slow parts. It can show default PWM outputs, which run at a few hundred hertz to around 1kHz on common boards, and slow sensor signals. Its 200kHz bandwidth and single channel rule out viewing the board's clock, SPI traffic or fast I2C properly. For real Arduino debugging the Hantek DSO2D10's 100MHz and two channels are the better fit.",
    },
    {
      question: "Can the Hantek DSO2D10 replace a separate function generator?",
      answer:
        "For many hobby jobs, yes. Its built-in generator is single-channel and reaches 25 MHz, enough to drive filters, amplifiers and sensor inputs while you watch the response on the scope channels. If you need two independent outputs at once, a separate two-channel generator is still the better choice.",
    },
    {
      question: "Why does the Hantek have a 400 times higher sample rate?",
      answer:
        "Because it is built for 500 times more bandwidth. A scope needs comfortably more than two samples per cycle of the fastest signal it shows, and real scopes aim well above that minimum. The FNIRSI's 2.5 MSa/s suits its 200kHz bandwidth; the Hantek's 1 GSa/s suits 100MHz. Neither number helps much on its own without the other.",
    },
    {
      question: "Should I buy the FNIRSI DSO152 first and upgrade later?",
      answer:
        "It is a sensible path if you are unsure a scope will earn its place. The FNIRSI costs little and teaches waveform basics. If you soon hit its limits, wanting a second channel or faster signals, that tells you a bench scope like the Hantek is worth buying, and the pocket scope stays useful for quick checks.",
    },
    {
      question: "Is one channel enough for a beginner?",
      answer:
        "For learning what waveforms look like and checking a single signal, yes. Most real debugging soon involves comparing two signals in time: a clock against data, or an amplifier's input against its output. That needs at least two channels, which the Hantek DSO2D10 has and the FNIRSI DSO152 does not.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
  ],
};

export default function FnirsiDso152VsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
