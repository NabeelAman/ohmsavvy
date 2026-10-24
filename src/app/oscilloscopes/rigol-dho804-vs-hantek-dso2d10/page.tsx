import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10";

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs Hantek DSO2D10: Which to Buy?",
  description:
    "Rigol DHO804 vs Hantek DSO2D10: four 12-bit channels at 70 MHz against two 100 MHz channels with a built-in generator. Charts and who each one suits.",
  path: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs Hantek DSO2D10",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO804 vs Hantek DSO2D10 is a choice between two different ideas of a compact scope. The Rigol puts four channels, 12-bit vertical resolution and a 1024 × 600 touchscreen into a USB-C powered body, with no signal generator. The Hantek has two channels and more bandwidth (100 MHz against 70 MHz), plus a built-in one-channel waveform generator up to 25 MHz.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO804")!,
    imageAlt: "Rigol DHO804 12-bit four-channel oscilloscope, front panel",
    chooseIf: [
      "You need to watch three or four signals at once, such as a clock, chip select and two data lines",
      "You want 12-bit resolution to look at small ripple, noise or sensor signals",
      "You want standard UART, I2C, SPI, CAN and parallel decoding, HDMI out and USB-C power",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
    chooseIf: [
      "You need a test-signal source as well as a scope, with room for only one instrument",
      "Two channels cover what you measure at the same time",
      "You want 100 MHz of bandwidth headroom over the DHO804's 70 MHz",
    ],
  },
  extraSpecs: [
    { label: "Max sample rate, all channels on", a: "312.5 MSa/s per channel (4 ch)", b: "Not stated in our data" },
    { label: "Vertical resolution", a: "12-bit", b: "Not stated in our data" },
    { label: "Display", a: "7-inch 1024 × 600 capacitive touchscreen", b: "7-inch 800 × 480" },
    { label: "Built-in generator", a: "None", b: "1 channel, up to 25 MHz" },
    { label: "Logic channels", a: "None", b: "Not stated in our data" },
  ],
  differences: [
    "Channels: the DHO804 has four, the DSO2D10 two. This is the biggest practical difference between them.",
    "Bandwidth: 100 MHz on the Hantek against 70 MHz on the Rigol, so the Hantek has more headroom for fast edges.",
    "Sample rate: the DHO804 reaches 1.25 GSa/s with one channel on against the Hantek's 1 GSa/s, but drops to 312.5 MSa/s per channel with all four on.",
    "The DHO804 is a 12-bit scope; our data for the Hantek doesn't state its vertical resolution.",
    "Only the Hantek has a built-in waveform generator (one channel, up to 25 MHz). Rigol lists no generator and no logic channels for the DHO804.",
    "The DHO804 adds a 1024 × 600 capacitive touchscreen, HDMI output, standard serial decoding and USB-C power; the Hantek's 7-inch screen is 800 × 480.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research against maker specifications.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On a spec sheet these two trade blows. The Hantek wins on bandwidth, the Rigol on single-channel sample
          rate and channel count. The figure that matters most depends on whether you spend your time on one fast
          signal or on several related ones, so the charts show both.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: the Hantek has 30 MHz more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
                { label: "Hantek DSO2D10", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate, log scale. The DHO804 leads with one channel on; with all four on it shares its budget
                down to 312.5 MSa/s each. Our data doesn&apos;t give the Hantek&apos;s two-channel figure.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DHO804, 1 channel", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO804, 4 channels", value: 312.5, display: "312.5 MSa/s per ch" },
                { label: "DSO2D10, max", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: the Rigol watches twice as many signals at once.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 4, display: "4 channels", highlight: true },
                { label: "Hantek DSO2D10", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>What else is in the box, per each pick&apos;s maker specifications.</>}>
            <DataTable
              head={["", "DHO804", "DSO2D10"]}
              rows={[
                ["Vertical resolution", "12-bit", "Not stated"],
                ["Signal generator", "None", "1 ch, to 25 MHz"],
                ["Screen", "1024 × 600 touch", "800 × 480"],
                ["Serial decoding", "UART, I2C, SPI, CAN, parallel", "Not stated"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Pick the scope that removes the bottleneck you will hit first: not enough channels, not enough vertical
          detail, or no way to generate a test signal.
        </p>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["SPI or parallel-bus timing", "Rigol DHO804", "Four channels show clock, chip select and two data lines in one capture"],
            ["Power-up sequencing of several rails", "Rigol DHO804", "Up to four rails on the same trigger"],
            ["Supply ripple, noise, small sensor signals", "Rigol DHO804", "12-bit resolution; the Hantek's figure isn't stated in our data"],
            ["Decoding UART, I2C, SPI or CAN traffic", "Rigol DHO804", "Decoding is standard on the DHO804; not stated for the Hantek"],
            ["Testing filters and amplifiers", "Hantek DSO2D10", "Built-in generator drives the circuit while the two channels show input and output"],
            ["Bench with room for one instrument and no generator", "Hantek DSO2D10", "Scope and 25 MHz generator in one unit"],
            ["Fastest edges on one or two signals", "Hantek DSO2D10", "100 MHz against 70 MHz rated bandwidth"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Four channels and 12 bits, or two channels and a generator</h2>
        <p className="text-muted leading-7 mb-4">
          Start with bandwidth, since it sets the ceiling for both. Rated bandwidth is the frequency at which a sine
          wave is shown about 3 dB low, roughly 70% of its true amplitude, so a scope is accurate only well below that
          figure. The usual 3–5x rule says the scope should have three to five times the bandwidth of the fastest
          signal you care about. That puts the DHO804 at roughly 14–23 MHz and the DSO2D10 at roughly 20–33 MHz.
          Both cover UART, I2C, most SPI, PWM, audio and the switching frequency of typical hobby supplies. Square
          waves need more margin than sines because their edges carry higher harmonics, which is where the
          Hantek&apos;s extra 30 MHz shows up: a common estimate of the fastest rise time a scope can display is
          0.35 divided by bandwidth, about 5 ns for 70 MHz and 3.5 ns for 100 MHz. Our guide to{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          explains the rule in more detail.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate tells a different story. With one channel on, the DHO804&apos;s 1.25 GSa/s is about 18 samples
          per cycle of a 70 MHz sine, and the Hantek&apos;s 1 GSa/s is 10 per cycle at 100 MHz; both are far above the
          Nyquist minimum of two. Turn on all four of the Rigol&apos;s channels and each gets 312.5 MSa/s, about four
          and a half samples per cycle at 70 MHz. That is enough to see the signal but leaves less detail on fast
          edges, so for edge work keep fewer channels on. Memory follows the same pattern: 25 Mpts with one channel,
          5 Mpts with four. If GSa/s is new to you, read{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          The real reason to choose the DHO804 is its four channels. Timing faults rarely involve just two signals. An
          SPI transaction has a clock, a chip select and two data lines; a board with several regulators has rails
          that must come up in order. The DHO804 shows all four on one trigger and decodes UART, I2C, SPI, CAN and
          parallel buses as standard. Its 12-bit converter gives 4,096 vertical levels against the 256 of an 8-bit
          design, so millivolt ripple on a supply rail or a small sensor output stays smooth when you zoom in instead
          of breaking into steps. Our data doesn&apos;t state the Hantek&apos;s resolution, so check Hantek&apos;s
          datasheet if that matters to you.
        </p>
        <p className="text-muted leading-7 mb-4">
          The real reason to choose the DSO2D10 is its generator. Testing a filter, amplifier or sensor input needs a
          known signal going in. The Hantek&apos;s single output (up to 25 MHz) drives the circuit while channel 1
          watches the input and channel 2 the output. The DHO804 can do the same measurement, with two channels spare,
          but only if you buy a separate signal source. Note that the generator doesn&apos;t add channels: once it is
          driving a circuit, both Hantek inputs are usually spoken for.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration: a fast square edge (CH1, green) and the same edge shown through too little bandwidth
                (CH2, blue), with rounded corners. The more bandwidth, the closer CH2 gets to CH1.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.4}
              offset={1.8}
              second={{ wave: "square-under", cycles: 2, amplitude: 1.4, offset: -1.8, label: "CH2 band-limited" }}
              labels={{ left: "CH1 source", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="The trade in one line">
              The DHO804 sees more signals in more vertical detail; the DSO2D10 sees faster edges on two signals and
              can make its own test signal. Neither does both.
            </KeyIdea>
            <Callout title="Mains and high-voltage circuits">
              On a mains-powered bench scope the probe ground clip is normally tied to mains earth. The DHO804 runs
              from USB-C, but its ground can still reach earth through the supply or anything plugged into it, so
              never assume it is floating. Use a differential probe for mains-referenced nodes.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          For the wider field, see the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          , our full{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>
          , and the two-channel version of this match-up,{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" className={link}>
            Rigol DHO802 vs Hantek DSO2D10
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most hobbyists who already own a signal source, or rarely need one, the Rigol DHO804 is the stronger scope: four channels, 12-bit resolution, standard serial decoding and a sharper touchscreen. The Hantek DSO2D10 is the better buy if you have room for one instrument and your work is mostly feeding a test signal into a circuit and watching what comes out, where its generator and 100 MHz bandwidth earn their place.",
  faqs: [
    {
      question: "Is the Rigol DHO804 better than the Hantek DSO2D10?",
      answer:
        "For multi-signal work, yes. The DHO804 has four channels, 12-bit resolution, standard serial decoding and a 1024 × 600 touchscreen, and rates 4.7 in our roundup against 4.3. The Hantek is better if you need a built-in generator or the extra headroom of 100 MHz on two channels.",
    },
    {
      question: "Does the Rigol DHO804 have a built-in signal generator?",
      answer:
        "No. Rigol lists no built-in generator and no logic channels for the DHO800 series. If you need to inject test signals, you would add a separate generator, or choose the Hantek DSO2D10, which has a one-channel generator up to 25 MHz built in.",
    },
    {
      question: "Is 70 MHz enough, or do I need the Hantek's 100 MHz?",
      answer:
        "By the 3-5x rule, 70 MHz covers signals up to roughly 14-23 MHz, which includes most microcontroller, serial bus, PWM and audio work. The Hantek's 100 MHz stretches that to roughly 20-33 MHz and shows faster edges more faithfully, which matters mostly for fast digital rise times.",
    },
    {
      question: "What happens to the DHO804's sample rate with all four channels on?",
      answer:
        "It shares its sample-rate budget, falling from 1.25 GSa/s with one channel to 312.5 MSa/s per channel with four, and memory drops from 25 Mpts to 5 Mpts. That is still above the Nyquist minimum at 70 MHz, but turn off unused channels when edge detail matters.",
    },
    {
      question: "What does 12-bit resolution do that an 8-bit scope can't?",
      answer:
        "A 12-bit converter divides the screen into 4,096 vertical levels against 256 for 8-bit, sixteen times finer. Small signals such as supply ripple or sensor outputs stay smooth when zoomed instead of showing steps. Our data doesn't state the Hantek's resolution, so check its datasheet before comparing directly.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Siglent SDS1104X-E vs SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function RigolDho804VsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
