import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, SamplingChart } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Facts beyond the Picks:
// Siglent SDS1104X-E memory (7 Mpts/ch, 14 Mpts interleaved), 100,000 wfm/s (400,000 sequence), standard I2C/SPI/UART/CAN/LIN
// decoding, 7-inch 800 × 480, 8-bit, 100–240 V AC 50 W max, MSO and USB AWG as options, per
// https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ and https://siglentna.com/download/22005/ (checked 2026-10-24).
// Rigol DS1104Z-S Plus memory (24/12/6 Mpts), 30,000 wfm/s, generator (2 ch, 25 MHz, 200 MSa/s, 14-bit), RS232/UART, I2C and SPI
// decoding, 8-bit, 7-inch 800 × 480, 100–240 V 50 W max, per
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-0504/1/-/-/-/-/MSO1000Z_Datasheet.pdf; 12 Mpts standard / 24 Mpts optional,
// optional decoding and RPL1116 logic kit per https://www.rigolna.com/products/digital-oscilloscopes/1000z/ (checked 2026-10-24).

const path = "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e";

const rigol = picks.find((p) => p.name === "Rigol DS1104Z-S Plus")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "DS1104Z-S Plus vs SDS1104X-E Compared",
  description:
    "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E: two 100 MHz four-channel scopes, one with a two-channel generator, one with faster per-channel sampling.",
  path: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e",
  image: rigol.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E",
  path,
  published: "2026-10-24",
  intro:
    "The Rigol DS1104Z-S Plus vs Siglent SDS1104X-E decision is between two scopes with the same headline: four channels, 100 MHz and 1 GSa/s. The Rigol builds in a two-channel 25 MHz signal generator. The Siglent keeps twice the Rigol's sample rate per channel when all four inputs are on, refreshes its display faster and includes CAN and LIN decoding as standard. Which matters more depends on whether you need to create signals or catch them.",
  a: {
    pick: rigol,
    imageAlt: "Rigol DS1104Z-S Plus four-channel oscilloscope with built-in signal generator, front view",
    chooseIf: [
      "You need two test signals as well as four scope channels, and want one instrument on the bench",
      "Your tests involve driving a circuit and watching how it responds, such as filters, amplifiers or comparators",
      "You may add 16 logic channels later with Rigol's RPL1116 kit",
    ],
  },
  b: {
    pick: siglent,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel digital oscilloscope, front view",
    chooseIf: [
      "You will often run three or four channels on fast signals and want 500 MSa/s on each",
      "You debug CAN or LIN buses, which Siglent decodes as standard",
      "You already own a function generator, or rarely need one",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all 4 channels on", a: "250 MSa/s per channel", b: "500 MSa/s per channel" },
    {
      label: "Memory depth",
      a: "24 Mpts (1 ch) per Rigol datasheet; Rigol series page says 12 Mpts standard, 24 Mpts optional",
      b: "14 Mpts interleaved; 7 Mpts per channel",
    },
    { label: "Waveform update rate", a: "Up to 30,000 wfm/s", b: "100,000 wfm/s (400,000 in sequence mode)" },
    {
      label: "Serial decoding",
      a: "RS232/UART, I2C, SPI (Rigol series page lists decoding as optional)",
      b: "I2C, SPI, UART/RS232, CAN, LIN as standard",
    },
    { label: "Built-in generator", a: "2 channels, 25 MHz, 200 MSa/s, 14-bit", b: "None (USB AWG is an option)" },
    { label: "Logic channels", a: "16 with RPL1116 kit, sold separately", b: "16 with MSO option" },
    { label: "Vertical resolution", a: "8-bit", b: "8-bit" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "100–240 V AC, 50 W max" },
  ],
  differences: [
    "The Rigol has a two-channel, 25 MHz signal generator built in (200 MSa/s, 14-bit); the Siglent has no generator unless you add its optional USB AWG.",
    "With three or four channels running, the Siglent samples each at 500 MSa/s against the Rigol's 250 MSa/s.",
    "Siglent states 100,000 waveforms per second (400,000 in sequence mode); Rigol states up to 30,000.",
    "Siglent lists I2C, SPI, UART, CAN and LIN decoding as standard. Rigol lists RS232/UART, I2C and SPI, and its own series page marks decoding as optional.",
    "Rigol's sources conflict on memory: 24 Mpts standard in the datasheet, 12 Mpts standard with 24 Mpts optional on the series page. Siglent states 14 Mpts interleaved, 7 Mpts per channel.",
    "Bandwidth (100 MHz), channel count, peak sample rate (1 GSa/s), 8-bit resolution and the 7-inch 800 × 480 screen are the same on both.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two spec sheets side by side and the first lines match exactly, so the useful comparison starts
          lower down. The numbers that separate them are how the 1 GSa/s converter is shared out when you turn on
          more channels, how many waveforms per second each one draws, and how much acquisition memory sits behind
          the screen. Each chart below uses only figures published by Rigol and Siglent.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure
            caption={
              <>
                Sample rate per channel as more inputs are switched on. Both start at 1 GSa/s; with all four on, the
                Siglent keeps twice the Rigol&apos;s rate.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Rigol, 1 channel", value: 1000, display: "1 GSa/s" },
                { label: "Rigol, 2 channels", value: 500, display: "500 MSa/s" },
                { label: "Rigol, 3–4 channels", value: 250, display: "250 MSa/s" },
                { label: "Siglent, max", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "Siglent, all 4 on", value: 500, display: "500 MSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Waveform update rate, log scale. More waveforms per second means a rare glitch is more likely to reach the screen.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1104Z-S Plus", value: 30000, display: "30,000 wfm/s" },
                { label: "Siglent SDS1104X-E", value: 100000, display: "100,000 wfm/s", highlight: true },
                { label: "Siglent, sequence mode", value: 400000, display: "400,000 wfm/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Maximum memory depth. Rigol&apos;s own documents give two different standard figures, so both are
                shown.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Rigol, per datasheet", value: 24, display: "24 Mpts" },
                { label: "Rigol, series page (std)", value: 12, display: "12 Mpts" },
                { label: "Siglent, interleaved", value: 14, display: "14 Mpts", highlight: true },
                { label: "Siglent, per channel", value: 7, display: "7 Mpts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Built-in extras as each maker lists them.</>}>
            <DataTable
              head={["Feature", "Rigol", "Siglent"]}
              rows={[
                ["Signal generator", "2 ch, 25 MHz", "Optional USB AWG"],
                ["CAN / LIN decode", "Not listed", "Standard"],
                ["I2C / SPI / UART decode", "Listed; optional per series page", "Standard"],
                ["16 logic channels", "RPL1116 kit", "MSO option"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Think about the jobs you will actually do in your first year with the scope, then read across.
        </p>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Frequency response of filters and audio stages", "Rigol DS1104Z-S Plus", "Generator drives the input while two channels watch input and output"],
            ["Testing a circuit that needs two separate stimulus signals", "Rigol DS1104Z-S Plus", "Two independent 25 MHz generator channels"],
            ["SPI bus with clock, chip select and two data lines", "Siglent SDS1104X-E", "All four channels at 500 MSa/s each"],
            ["Car and industrial networks (CAN, LIN)", "Siglent SDS1104X-E", "CAN and LIN decoding listed as standard"],
            ["Hunting an intermittent glitch", "Siglent SDS1104X-E", "100,000 wfm/s against 30,000"],
            ["Long captures on one channel", "Check both", "Rigol's memory figure depends on which Rigol document you trust"],
            ["Single-signal work under about 20 MHz", "Either", "Same 100 MHz bandwidth and 1 GSa/s single-channel rate"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Generator or faster sampling: what each one can and can&apos;t do</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes are rated at 100 MHz. Bandwidth is the frequency at which a sine wave reads about 3 dB low,
          around 70% of its real amplitude, and the usual 3–5x rule says the rating should be three to five times the
          highest frequency you care about. On that basis both handle signals up to roughly 20–33 MHz with one channel
          on: microcontroller clocks, PWM, UART, I2C, most hobby SPI and the switching frequency of common converters.
          Square waves need the lower end of that range because their edges are built from harmonics. Our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          covers the rule properly.
        </p>
        <p className="text-muted leading-7 mb-4">
          The catch is that bandwidth assumes enough samples. Nyquist sets the bare minimum at two samples per cycle of
          the highest frequency present; in practice scopes want several. With all four channels on, the Rigol drops
          to 250 MSa/s per channel, which is only 2.5 samples per cycle of a 100 MHz sine. The Siglent&apos;s 500 MSa/s
          gives five. Both draw an interpolated trace between samples, so the display looks smoother than raw dots, but
          interpolation cannot recover detail between samples that were never taken. If your four-channel work stays
          below about 25 MHz the gap is unlikely to show; if you want the full 100 MHz on four inputs at once, the
          Siglent keeps more sampling margin. For more on how sample rate and bandwidth interact, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Figure caption={<>Illustration: 2.5 samples per cycle, the Rigol&apos;s four-channel rate on a 100 MHz sine, joined with straight lines.</>}>
            <SamplingChart cycles={4} samples={10} label="Four cycles of a sine sampled 2.5 times per cycle" />
          </Figure>
          <Figure caption={<>Illustration: 5 samples per cycle, the Siglent&apos;s four-channel rate on the same signal.</>}>
            <SamplingChart cycles={4} samples={20} label="Four cycles of a sine sampled 5 times per cycle" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mb-4">
          The Rigol&apos;s answer is its generator, and it is a real one. Two outputs at up to 25 MHz, 200 MSa/s and
          14-bit cover most bench stimulus jobs: sweep a sine into an active filter and watch the output fall away,
          feed a square wave into a comparator, or use the second output as a separate clock or enable signal while
          the first supplies the test waveform. You still have four scope inputs free to watch the result. Doing the
          same on the Siglent means buying either a separate function generator or Siglent&apos;s optional USB AWG.
        </p>
        <p className="text-muted leading-7 mb-4">
          On digital buses the Siglent pulls ahead. CAN and LIN decoding is listed as standard, which matters for
          automotive and industrial projects, and its 100,000 waveforms per second (400,000 in sequence mode) means less
          dead time between captures when you are waiting for a rare fault. Rigol lists RS232/UART, I2C and SPI
          decoding for the DS1000Z family, but its series page marks decoding as an option, so confirm what is enabled
          on the unit you buy before relying on it.
        </p>
        <KeyIdea title="The memory question, stated plainly">
          Rigol&apos;s datasheet lists 24 Mpts standard on one channel (12 Mpts on two, 6 Mpts on three or four). Its
          series page says 12 Mpts standard with 24 Mpts as an option. We can&apos;t settle that from Rigol&apos;s own
          material, so we don&apos;t score it either way. Siglent states 14 Mpts interleaved and 7 Mpts per channel.
          With all four channels on, the two figures are close even if the datasheet is right.
        </KeyIdea>
        <div className="mt-4">
          <Callout title="Mains and high-voltage measurements">
            Both are mains-powered bench scopes, so each probe&apos;s ground clip is normally tied to mains earth.
            Clipping it to a mains-referenced point can cause a short circuit. Use a differential probe or a properly
            set-up isolation arrangement for anything connected to the mains.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where they sit among our other picks</h2>
        <p className="text-muted leading-7">
          The Siglent rates 4.8 in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          and the Rigol 4.5; the Siglent carries our Hands-on Tested badge and the Rigol does not. If you want the Siglent&apos;s strengths
          explained in more depth, read our{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          . The 50 MHz, generator-free sibling of the Rigol is covered in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          , and a two-channel scope-plus-generator alternative in{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>
          . For a 12-bit route with a generator, see{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO914S vs Siglent SDS1104X-E
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains each spec from scratch.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If you need to generate signals as well as measure them, the Rigol DS1104Z-S Plus saves buying a second instrument: two 25 MHz outputs alongside four 100 MHz channels. If you mostly debug existing circuits, the Siglent SDS1104X-E is the stronger scope: 500 MSa/s per channel with all four on, a faster update rate, CAN and LIN decoding as standard and clear memory figures. For most buyers without a generator need, the Siglent is the better buy.",
  faqs: [
    {
      question: "Is the Rigol DS1104Z-S Plus generator good enough to replace a separate function generator?",
      answer:
        "For most hobby and education bench work, yes. It has two channels up to 25 MHz at 200 MSa/s and 14-bit, which covers sine sweeps into filters, square waves into logic and a second signal for clocks or enables. Work needing higher frequencies or more output channels still calls for a dedicated generator.",
    },
    {
      question: "Why does the Siglent SDS1104X-E sample faster with four channels on?",
      answer:
        "Siglent states 500 MSa/s per channel with all four inputs active, while Rigol gives 250 MSa/s per channel with three or four on. At 100 MHz that is five samples per cycle against 2.5, so the Siglent keeps more real detail on fast edges when every channel is in use.",
    },
    {
      question: "How much memory does the Rigol DS1104Z-S Plus have?",
      answer:
        "Rigol's documents disagree. The datasheet lists 24 Mpts standard on one channel, 12 Mpts on two and 6 Mpts on three or four. Rigol's series page says 12 Mpts standard with 24 Mpts optional. Check the configuration of the unit you are buying if long captures matter to you.",
    },
    {
      question: "Which of these scopes decodes CAN bus?",
      answer:
        "The Siglent SDS1104X-E. Siglent lists I2C, SPI, UART/RS232, CAN and LIN trigger and decode as standard. Rigol lists RS232/UART, I2C and SPI decoding for the DS1104Z-S Plus and does not list CAN or LIN, and its series page marks decoding as an option.",
    },
    {
      question: "Can either scope add logic analyzer channels?",
      answer:
        "Both can reach 16 digital channels, at extra cost. The Rigol DS1104Z-S Plus needs Rigol's RPL1116 logic probe kit, sold separately. Siglent offers 16 digital channels as an MSO option for its four-channel SDS1000X-E models. Neither includes logic channels out of the box.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDs1104zSPlusVsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
