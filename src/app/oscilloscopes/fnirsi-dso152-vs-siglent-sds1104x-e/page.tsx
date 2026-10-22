import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e";

export const metadata = buildMetadata({
  title: "FNIRSI DSO152 vs Siglent SDS1104X-E",
  description:
    "FNIRSI DSO152 vs Siglent SDS1104X-E: a 200kHz single-channel pocket scope against a 100MHz 4-channel bench scope. Specs, charts and who needs which.",
  path: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DSO152 vs Siglent SDS1104X-E",
  path,
  published: "2026-10-22",
  intro:
    "FNIRSI DSO152 vs Siglent SDS1104X-E is not a close contest on specs: the Siglent has 500 times the bandwidth, 400 times the sample rate and four channels to the FNIRSI's one. The real question is which job you have. The DSO152 is a very cheap pocket scope for audio-range checks and learning; the SDS1104X-E is a 100MHz bench scope for microcontroller, digital and multi-signal debugging that you can grow into.",
  a: {
    pick: picks.find((p) => p.name === "FNIRSI DSO152")!,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want to see your first waveforms for very little money before committing to a bench scope",
      "Your signals are audio-range or slower, comfortably under roughly 40 to 65kHz",
      "You want a scope that fits in a pocket for quick checks away from the bench",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E 4-channel digital oscilloscope",
    chooseIf: [
      "You debug microcontrollers, clocks, serial buses or fast PWM edges",
      "You need to compare two or more signals at once, such as input against output or clock against data",
      "You want one bench scope you won't outgrow as your projects get more demanding",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "2.5 MSa/s (single channel)", b: "500 MSa/s per channel (4 channels)" },
  ],
  differences: [
    "Bandwidth: the Siglent is rated at 100MHz, the FNIRSI at 200kHz, a factor of 500.",
    "Channels: the Siglent has four, the FNIRSI one, so only the Siglent can show two signals against each other.",
    "Sample rate: 1 GSa/s on the Siglent (500 MSa/s per channel with all four on) against 2.5 MSa/s on the FNIRSI.",
    "Form and price: the DSO152 is pocket-sized and an extremely affordable entry point; the SDS1104X-E is a bench instrument that costs more than even the Rigol DS1054Z.",
    "Fit: the DSO152 suits basic diagnostics and learning the fundamentals; the Siglent suits intermediate hobbyists and buyers who want headroom, and it is overkill for someone who only needs a first look at a waveform.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The gaps here are so large that linear bars would show the FNIRSI as an invisible sliver, so the
          bandwidth and sample rate charts use a log scale. Every number comes from the two products&apos;
          verified specs in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth on a log scale: 100MHz against 200kHz, a 500x difference.</>}>
            <BarChart
              log
              items={[
                { label: "Siglent SDS1104X-E", value: 100_000_000, display: "100MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate on a log scale: 1 GSa/s against 2.5 MSa/s, a 400x difference.</>}>
            <BarChart
              log
              items={[
                { label: "Siglent SDS1104X-E", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Channels: four on the Siglent, one on the FNIRSI.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 4, display: "4 channels", highlight: true },
                { label: "FNIRSI DSO152", value: 1, display: "1 channel" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Comfortable signal frequency by the 3-5x bandwidth rule (upper end, divide by 3), log scale: about
                33MHz against about 65kHz.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "Siglent SDS1104X-E", value: 33_000_000, display: "~20-33MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 65_000, display: "~40-65kHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Even with all four channels running, the Siglent still samples each one at 500 MSa/s, 200 times the
          FNIRSI&apos;s single-channel rate. The last chart is derived, not a maker spec: it applies the common
          rule of choosing a scope with three to five times the bandwidth of the signal you want to measure
          accurately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Curious beginner who wants a first look at waveforms", "FNIRSI DSO152", "Extremely affordable; enough to learn what sine, square and PWM look like"],
            ["Audio-range checks, such as clipping on an amplifier", "FNIRSI DSO152", "200kHz covers the audio band with room to spare"],
            ["Quick checks away from the bench", "FNIRSI DSO152", "Pocket-sized; the Siglent is a bench instrument"],
            ["Microcontroller clocks, SPI and fast logic edges", "Siglent SDS1104X-E", "100MHz bandwidth, comfortable to roughly 20-33MHz"],
            ["Comparing input to output, or clock to data", "Siglent SDS1104X-E", "Four channels against one"],
            ["Switching power supply edges and ringing", "Siglent SDS1104X-E", "Fast edges carry content far above 200kHz"],
            ["One scope to grow into over several years", "Siglent SDS1104X-E", "100MHz and 4 channels leave headroom; the DSO152 is a starter tool"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If your budget sits between these two, they are not your only options. The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>{" "}
          comparison covers a cheaper four-channel bench scope at 50MHz, and our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          walks through how to size bandwidth, channels and sample rate to your projects.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          An oscilloscope&apos;s rated bandwidth is the frequency at which a sine wave is shown about 3 dB low,
          roughly 70% of its true amplitude. That is why the usual advice is to buy three to five times the
          bandwidth of your signal. Applied to the DSO152&apos;s 200kHz, that gives comfortable, accurate readings
          up to roughly 40 to 65kHz. That range includes the whole audio band, mains-frequency waveforms on the
          low-voltage side of a transformer, slow sensor outputs, and PWM in the low tens of kilohertz. It
          excludes almost everything else in modern digital electronics. Our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          covers the rule in more detail.
        </p>
        <p className="text-muted leading-7 mb-4">
          Square waves are where the gap becomes obvious. A digital edge is built from the fundamental plus many
          odd harmonics, so a scope needs far more bandwidth than the clock frequency to show a crisp edge. On a
          200kHz scope, a 100kHz square wave keeps its period but loses its sharp corners, and anything in the
          megahertz range, such as a typical microcontroller clock or an SPI bus, is beyond what it can show
          meaningfully. The Siglent&apos;s 100MHz, by the same rule, is comfortable on signals up to roughly 20 to
          33MHz, which covers many hobby microcontroller clocks and serial buses with headroom left over.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Figure caption={<>Illustration: a 100kHz square wave on a scope with plenty of bandwidth keeps its sharp edges.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={2.5} labels={{ left: "100kHz square", right: "2 µs/div" }} />
          </Figure>
          <Figure caption={<>Illustration: the same signal through a front end with too little bandwidth shows rounded, slowed edges.</>}>
            <ScopeScreen wave="square-under" cycles={2} amplitude={2.5} labels={{ left: "100kHz square", right: "2 µs/div" }} />
          </Figure>
        </div>
        <p className="text-muted leading-7 mb-4">
          Sample rate sets a second limit. Nyquist says you need more than two samples per cycle to capture a
          frequency at all, and in practice a scope needs several times that to draw a waveform&apos;s shape
          faithfully. At 2.5 MSa/s the DSO152 takes about 125 samples per cycle of a 20kHz tone, which is plenty,
          but only 25 per cycle at 100kHz. The Siglent&apos;s 1 GSa/s, or 500 MSa/s per channel with all four on,
          is matched to its 100MHz front end. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          for how sample rate and bandwidth work together.
        </p>
        <p className="text-muted leading-7 mb-4">
          Channel count decides what kind of question you can ask. With one channel, the DSO152 can tell you
          whether a signal is present and roughly what shape it is. It cannot tell you whether an amplifier&apos;s
          output is distorted relative to its input, how much a signal is delayed through a circuit, or whether
          data changes at the right point on a clock edge, because each of those needs two traces on the same
          time base. The Siglent shows up to four at once.
        </p>
        <KeyIdea title="Two different tools, not a good and bad version of one">
          The DSO152 is best treated as a pocket diagnostic and a cheap way to learn, and its own review makes
          the same point: it is not a scaled-down bench scope. The SDS1104X-E is a bench scope with headroom,
          and its main drawback for a pure beginner is that it is more instrument, and more money, than a first
          look at a waveform needs. Many people end up owning a pocket scope and a bench scope for exactly that
          reason.
        </KeyIdea>
        <div className="mt-4">
          <Callout title="Mains and high-voltage measurements">
            On a mains-powered bench scope such as the Siglent, the probe ground clip is connected to mains earth
            through the power cord. Clipping it onto a mains-referenced point in a circuit can create a short
            circuit through the scope. Measure mains-powered circuits through an isolation transformer or with a
            differential probe, and check the input voltage rating of whichever scope and probe you use before
            connecting to anything above low-voltage electronics.
          </Callout>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI DSO152 if you want to see audio-range and other slow signals, or just learn what a scope does, for as little money as possible, and you accept a single channel and a 200kHz ceiling. Buy the Siglent SDS1104X-E if you work with microcontrollers, digital signals or anything that needs two signals compared: its 100MHz, four channels and 1 GSa/s cover far more work, and it is the one of the two you won't outgrow.",
  faqs: [
    {
      question: "Can the FNIRSI DSO152 replace a Siglent SDS1104X-E?",
      answer:
        "No. The DSO152 has one channel and 200kHz of bandwidth, against four channels and 100MHz on the Siglent. It suits audio-range checks and learning the basics, while the Siglent handles microcontroller clocks, serial buses and multi-signal timing work the pocket scope cannot show.",
    },
    {
      question: "Can the FNIRSI DSO152 show Arduino or SPI signals?",
      answer:
        "Only the slowest ones, and only roughly. By the 3-5x bandwidth rule its 200kHz is comfortable up to about 40-65kHz, so a typical microcontroller clock in the megahertz range, or a fast SPI bus, is far beyond it. Slow PWM and low-rate serial lines will appear, but with rounded edges.",
    },
    {
      question: "Is the Siglent SDS1104X-E too much scope for a beginner?",
      answer:
        "For learning the basics, often yes, and it costs more than the Rigol DS1054Z. It makes sense if you already know your projects involve faster digital signals or multi-signal debugging, because 100MHz and four channels leave room to grow rather than forcing an upgrade later.",
    },
    {
      question: "Does the sample rate gap between 2.5 MSa/s and 1 GSa/s matter?",
      answer:
        "Yes, for anything beyond slow signals. A scope needs several samples per cycle to draw a waveform's shape. At 2.5 MSa/s the DSO152 gets about 125 samples per cycle of a 20kHz tone but only 25 at 100kHz. The Siglent's 1 GSa/s, or 500 MSa/s per channel with four on, matches its 100MHz bandwidth.",
    },
    {
      question: "Is it worth buying a pocket scope before a bench scope?",
      answer:
        "It can be. The DSO152 is a low-cost way to find out whether you will use a scope often. If you keep reaching for it and hitting its single-channel, 200kHz limits, that is a clear sign a bench scope such as the SDS1104X-E is worth the money. If it sits in a drawer, you learned that cheaply.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
  ],
};

export default function FnirsiDso152VsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
