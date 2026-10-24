import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// SDS1104X-E memory/display/decoding per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (checked 2026-10-24).
// SDS1104X-E math/FFT, 38 measurements, pass/fail, triggers and 8-bit resolution per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (checked 2026-10-24).
const path = "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p";

export const metadata = buildMetadata({
  title: "SDS1104X-E vs DSO5102P: Is the Upgrade Worth It?",
  description:
    "Siglent SDS1104X-E vs Hantek DSO5102P: same 100 MHz and 1 GSa/s peak, but four channels against two. Charts, use cases and when the step up pays off.",
  path: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E vs Hantek DSO5102P",
  path,
  published: "2026-10-24",
  intro:
    "Siglent SDS1104X-E vs Hantek DSO5102P is an unusual matchup because the two headline numbers are identical: both are 100 MHz bench scopes with a 1 GSa/s peak sample rate. What the Siglent adds is two more channels, a stated 500 MSa/s per channel with all four running, 14 Mpts of memory where the Hantek has tens of thousands of points, and standard serial decoding. Whether that upgrade is worth it depends almost entirely on how many signals you need to watch at once.",
  a: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E 4-channel digital oscilloscope",
    chooseIf: [
      "You need three or four signals on screen, such as SPI clock, data and chip select, or three motor phases",
      "You want a stated per-channel sample rate (500 MSa/s) with every channel in use",
      "You want I2C, SPI, UART, CAN and LIN decoded on screen, which Siglent includes as standard",
      "Long single captures matter: 14 Mpts per channel (7 Mpts with all four on)",
      "You own a two-channel scope and keep running out of inputs",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO5102P")!,
    imageAlt: "Hantek DSO5102P two-channel 100MHz digital storage oscilloscope, front panel",
    chooseIf: [
      "Two channels cover your work: input against output, or a UART's TX and RX",
      "You want math, FFT, automatic measurements and pass/fail testing on two channels for less",
      "You mostly view repetitive signals, where its short record length matters less",
    ],
  },
  extraSpecs: [
    { label: "Samples per cycle at 100 MHz (peak rate)", a: "10", b: "10" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 20–33 MHz", b: "Up to roughly 20–33 MHz" },
    { label: "Record length", a: "14 Mpts (1 ch per pair); 7 Mpts (4 ch)", b: "24K (datasheet) or 40K (product page)" },
    { label: "Serial decoding", a: "Standard: I2C, SPI, UART/RS232, CAN, LIN", b: "None listed" },
  ],
  differences: [
    "Bandwidth is the same: 100 MHz on both. Moving from the DSO5102P to the SDS1104X-E buys no extra headroom for faster signals.",
    "Peak sample rate is also the same, 1 GSa/s. Siglent states 500 MSa/s per channel with all four on; our Hantek data gives only the 1 GSa/s real-time figure, with no per-channel breakdown.",
    "Channels: 4 on the Siglent against 2 on the Hantek. This is the real upgrade.",
    "Both have a 7-inch 800 × 480 display and run from mains power. The Siglent's interface is widely regarded as intuitive.",
    "Both list math, FFT and pass/fail testing. Hantek lists 32 automatic measurements and edge, pulse-width, video, slope and overtime triggers; Siglent lists 38 measurements, a 1 Mpts FFT, hardware pass/fail and edge, slope, pulse-width, window, runt, interval, dropout, pattern and video triggers.",
    "Memory: Siglent lists 14 Mpts per channel (7 Mpts with all four on). Hantek's record length is short and its own sources disagree on it: 24K in the datasheet, 40K on the product page.",
    "Siglent includes I2C, SPI, UART/RS232, CAN and LIN trigger and decode as standard. Hantek lists no serial decoding, generator or logic channels.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most scope comparisons show one bar towering over another. Here the first two charts are deliberately
          flat, because on bandwidth and peak sample rate these scopes tie. The differences appear once you count
          inputs and ask what happens to sample rate when they are all in use.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point): a tie at 100 MHz.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz", highlight: true },
                { label: "Hantek DSO5102P", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Peak sample rate: also a tie. Siglent adds a stated 500 MSa/s per channel with all four on; Hantek&apos;s per-channel figure isn&apos;t in our data.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E (peak)", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "Siglent SDS1104X-E (4 ch on)", value: 500, display: "500 MSa/s per ch" },
                { label: "Hantek DSO5102P (real-time)", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels: the one headline spec where the two differ.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 4, display: "4 channels", highlight: true },
                { label: "Hantek DSO5102P", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Total signal samples per second with every channel in use. Siglent: 4 × 500 MSa/s. Hantek: shown at its 1 GSa/s real-time figure, the most our data supports.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E (4 ch)", value: 2000, display: "2 GSa/s total", highlight: true },
                { label: "Hantek DSO5102P (2 ch)", value: 1000, display: "≤1 GSa/s stated" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          At 1 GSa/s each scope draws 10 points per cycle of a 100 MHz sine, five times the Nyquist minimum. With
          all four channels on, the Siglent still draws 5 per cycle at 100 MHz. Our{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            guide to GSa/s
          </Link>{" "}
          explains why points per cycle, not the raw number, is what shapes a fast edge, and the{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth guide
          </Link>{" "}
          explains the −3 dB rating both scopes share.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Is the Upgrade Worth It?</h2>
        <p className="text-muted leading-7 mb-4">
          We don&apos;t quote prices because Amazon&apos;s change; the buttons above show today&apos;s. The useful
          question is what the extra spend on the SDS1104X-E actually gets you, and the answer is narrower than with
          most upgrades. It does not get you faster signals: the 3–5× rule puts both scopes&apos; comfortable range
          at roughly 20–33 MHz, and a rise-time estimate of 0.35 ÷ bandwidth gives both about 3.5 ns. If you own a
          DSO5102P and its edges look too rounded, the Siglent won&apos;t fix that.
        </p>
        <p className="text-muted leading-7 mb-4">
          What it gets you is width. Four inputs let you trigger on one signal and watch three others react, which
          is how timing problems are actually found. Siglent also states its sample rate with all four channels on,
          500 MSa/s each, so you know what you&apos;re getting in that mode; Hantek&apos;s published 1 GSa/s
          doesn&apos;t say how it splits across two. It also gets you depth: 14 Mpts of memory against the
          Hantek&apos;s 24K–40K, and I2C, SPI, UART, CAN and LIN decoding as standard where Hantek lists none.
        </p>
        <p className="text-muted leading-7">
          So the upgrade is worth it if your work regularly needs a third signal, decoded buses or long single
          captures. A two-channel user checking amplifiers or power rails on repetitive signals gets the same
          bandwidth from the Hantek, with FFT, math and pass/fail tools that the Siglent also has.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Grounded in"]}
          rows={[
            ["Amplifier input against output", "Either", "Two channels and 100 MHz on both"],
            ["UART TX and RX, or I2C SDA and SCL", "Siglent SDS1104X-E", "Both have two inputs for it, but only Siglent decodes the bytes"],
            ["SPI with clock, MOSI, MISO and chip select", "Siglent SDS1104X-E", "Four lines need four channels"],
            ["Three-phase or brushless motor drive", "Siglent SDS1104X-E", "Three phases plus a reference need more than two inputs"],
            ["Power-up sequencing of several rails", "Siglent SDS1104X-E", "Watch up to four rails come up in order"],
            ["Spectrum view of noise or a hum source", "Either", "Both list FFT; Siglent's runs on 1 Mpts"],
            ["Simple go/no-go checks on a repeated signal", "Either", "Both list pass/fail testing"],
            ["Signals faster than about 33 MHz", "Neither", "Both are 100 MHz scopes; look at higher-bandwidth models"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth is where a sine wave is shown about 3 dB down, close to 70% of its amplitude.
          Buying 3–5 times your highest signal frequency keeps that roll-off out of the picture, and square waves
          need more, since their edges are made of odd harmonics. Because both scopes share 100 MHz, the frequency
          limits below apply to both; the differences are in how many signals and how much time each can hold.
        </p>
        <h3 className="text-lg font-semibold mb-2">Within reach of both</h3>
        <p className="text-muted leading-7 mb-4">
          Up to roughly 20–33 MHz, either scope shows a signal&apos;s shape faithfully: Arduino and most hobby
          microcontroller clocks, PWM, audio, switching-regulator nodes in the hundreds of kilohertz, and I2C or UART
          at ordinary speeds. Fast clock edges above that range will look softer than they are on both.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where the Hantek runs short</h3>
        <p className="text-muted leading-7 mb-4">
          Memory is the DSO5102P&apos;s tightest limit. At 1 GSa/s, 24K points fill in 24 µs and 40K in 40 µs, so on
          slower timebases a short-memory scope must sample more slowly to fill the screen, and a long single event
          (a full serial packet, a power-up sequence) is captured with less time detail. Hantek lists no serial
          decoding, so bus traffic is read by eye. Siglent lists 14 Mpts per channel (7 Mpts with all four on), so
          at 500 MSa/s the SDS1104X-E holds about 14 ms on every channel, and it decodes I2C, SPI, UART, CAN and LIN
          as standard.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where four channels change the job</h3>
        <p className="text-muted leading-7 mb-4">
          With two inputs, a timing fault between three signals takes repeated captures and guesswork about which
          ran first. With four, they sit on one screen against a single trigger, as the illustration below shows for
          a clock and a delayed response.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A trigger signal (CH1) and a delayed response (CH2, blue) on one timebase: the delay is read straight off the screen. Illustration, not a capture.</>}>
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "square", cycles: 2, amplitude: 1.2, offset: -1.8, shift: 0.8, label: "CH2" }}
              marks={[{ x1: 0, y1: 1.6, x2: 0.8, y2: 1.6, text: "delay" }]}
              triggerLevel={1.8}
            />
          </Figure>
          <KeyIdea title="Same bandwidth, different question">
            Bandwidth answers how fast a signal you can see. Channel count answers how many things you can see
            happen together. The SDS1104X-E and DSO5102P give the same answer to the first and different answers
            to the second, which is why this upgrade only pays off for multi-signal work.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains-earthed grounds">
            The DSO5102P runs from mains, and on a mains bench scope the probe ground clip is normally bonded to
            earth through the power cord. Clipping it to a live or non-earthed node creates a short through the
            scope. The same applies to any bench scope earthed this way. Use a differential probe or proper
            isolation for mains work.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other matchups for these two</h2>
        <p className="text-muted leading-7">
          The SDS1104X-E against its most common rival is covered in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          , and against its two-channel sibling in{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" className={link}>
            SDS1104X-E vs SDS1202X-E
          </Link>
          . For the Hantek against a 12-bit four-channel scope, see{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" className={link}>
            Hantek DSO5102P vs Rigol DHO804
          </Link>
          , or for microcontroller work,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" className={link}>
            Rigol DS1054Z vs Hantek DSO5102P for Arduino
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains memory depth, triggers and the other specs that separate scopes with equal bandwidth.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Upgrade from the Hantek DSO5102P to the Siglent SDS1104X-E for channels, not speed: both are 100 MHz, 1 GSa/s scopes, so the Siglent's case rests on four inputs, a stated 500 MSa/s per channel with all on, 14 Mpts of memory and standard I2C, SPI, UART, CAN and LIN decoding. If two channels and repetitive signals cover your work, the DSO5102P gives the same bandwidth with math, FFT and pass/fail, though its 24K–40K record length is short and it lists no decoding.",
  faqs: [
    {
      question: "Is the Siglent SDS1104X-E faster than the Hantek DSO5102P?",
      answer:
        "Not in bandwidth or peak sample rate. Both are rated 100 MHz and 1 GSa/s, so both are comfortable on signals up to roughly 20–33 MHz. The Siglent states 500 MSa/s per channel with all four channels on; Hantek's data gives a single 1 GSa/s real-time figure without a per-channel breakdown.",
    },
    {
      question: "Should I upgrade from a Hantek DSO5102P to a Siglent SDS1104X-E?",
      answer:
        "Only if you need more than two channels, decoded serial buses or long single captures. The upgrade adds no bandwidth, so it won't help with signals that are too fast for the Hantek. It helps with SPI buses, motor phases, multi-rail power sequencing and other jobs where three or four signals must share one trigger.",
    },
    {
      question: "How much memory does the Hantek DSO5102P have compared with the Siglent?",
      answer:
        "Hantek's own sources disagree: 24K points in the datasheet, 40K on the product page. At 1 GSa/s that fills in 24 to 40 microseconds. Siglent lists 14 Mpts per channel for the SDS1104X-E (7 Mpts with all four on), several hundred times more, which holds about 14 milliseconds at 1 GSa/s.",
    },
    {
      question: "Does the Hantek DSO5102P have FFT and math functions?",
      answer:
        "Yes, Hantek lists math and FFT, along with 32 automatic measurements, pass/fail testing and edge, pulse-width, video, slope and overtime triggers. It lists no serial decoding, signal generator or logic channels. The SDS1104X-E matches it on analysis: Siglent lists math with a 1 Mpts FFT, 38 automatic measurements and hardware pass/fail, plus standard serial decoding.",
    },
    {
      question: "Are two channels enough for a beginner?",
      answer:
        "Often, yes. Two channels cover the most common checks: a circuit's input against its output, a UART's TX and RX, or I2C's two lines. Beginners outgrow two channels when they debug SPI, motor drivers or power sequencing, which is the point where the four-channel SDS1104X-E justifies its cost.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function SiglentSds1104xEVsHantekDso5102pPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
