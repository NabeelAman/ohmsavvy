import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// SDS1104X-E memory/display/decoding per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (checked 2026-10-24).
// SDS1104X-E 8-bit resolution, I/O, AC power and MSO/AWG options per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (checked 2026-10-24).
const path = "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e";

const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs SDS1104X-E for a Home Lab",
  description:
    "Rigol DHO804 vs Siglent SDS1104X-E for a home lab: four 12-bit channels at 70 MHz against four channels at 100 MHz. Charts, use cases and which to buy.",
  path: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e",
  image: dho804.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs Siglent SDS1104X-E",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO804 vs Siglent SDS1104X-E is a rare even match on channels: both give you four. What separates them is the kind of headroom each buys. The Siglent has 100 MHz of bandwidth and keeps 500 MSa/s on every channel with all four running. The Rigol stops at 70 MHz but adds 12-bit resolution, 25 Mpts on one channel, a 1024 × 600 touchscreen, HDMI and USB-C power. Both include serial decoding as standard.",
  a: {
    pick: dho804,
    imageAlt: "Rigol DHO804 four-channel 12-bit oscilloscope, front panel",
    chooseIf: [
      "Your bench work is mostly microcontrollers, sensors and power rails rather than fast edges",
      "You want to see millivolt-level ripple and noise with 12-bit resolution",
      "You want parallel-bus decoding alongside UART, I2C, SPI and CAN, all included from the start",
      "Desk space is tight and you like the idea of USB-C power and an HDMI monitor output",
    ],
  },
  b: {
    pick: sds1104,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel digital oscilloscope, front panel",
    chooseIf: [
      "You expect to look at clocks and edges above roughly 15 to 20 MHz",
      "You often run all four channels and want the higher per-channel rate of 500 MSa/s",
      "A well-regarded, approachable interface matters to you as much as the spec sheet",
      "You want 100 MHz of bandwidth as sold, with room for projects to get faster",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, four channels on", a: "312.5 MSa/s per channel", b: "500 MSa/s per channel" },
    { label: "Vertical resolution", a: "12-bit", b: "8-bit" },
    { label: "Memory", a: "25 Mpts (1 ch); 5 Mpts (4 ch)", b: "14 Mpts (1 ch per pair); 7 Mpts (4 ch)" },
    { label: "Serial decoding", a: "Standard: UART, I2C, SPI, CAN, parallel", b: "Standard: I2C, SPI, UART/RS232, CAN, LIN" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch 800 × 480 TFT-LCD" },
  ],
  differences: [
    "Both have four channels, so input count doesn't separate them.",
    "Bandwidth: 100 MHz on the Siglent against 70 MHz on the Rigol, about 43% more.",
    "Single-channel sample rate favours the Rigol (1.25 GSa/s against 1 GSa/s); with all four channels on the Siglent leads (500 MSa/s each against 312.5 MSa/s).",
    "Resolution: the DHO804 is 12-bit; Siglent lists the SDS1104X-E as 8-bit.",
    "Memory: 25 Mpts on the Rigol with one channel against 14 Mpts on the Siglent, but with all four on the Siglent keeps 7 Mpts each against the Rigol's 5 Mpts.",
    "Both decode serial buses as standard: Rigol lists UART, I2C, SPI, CAN and parallel; Siglent lists I2C, SPI, UART/RS232, CAN and LIN.",
    "The Rigol has a 7-inch 1024 × 600 capacitive touchscreen, HDMI output and USB-C power; the Siglent has a 7-inch 800 × 480 screen, no HDMI in its I/O list, and runs from 100–240 V AC.",
    "The Siglent's interface is widely regarded as intuitive. Both scopes carry our Hands-on Tested badge, and both score 4.8 in our roundup.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With four channels each, the numbers that differ are bandwidth, how the sample rate and memory are shared,
          resolution and the screen. Rigol figures come from our verified pick data; Siglent&apos;s come from its
          SDS1000X-E series page and data sheet.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: the SDS1104X-E has 30 MHz more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate, log scale. The Rigol is faster on one channel; the Siglent is faster per channel once all
                four are on.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DHO804, 1 ch", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO804, 4 ch", value: 312.5, display: "312.5 MSa/s each" },
                { label: "SDS1104X-E, max", value: 1000, display: "1 GSa/s" },
                { label: "SDS1104X-E, 4 ch", value: 500, display: "500 MSa/s each", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Samples per cycle of a sine at each scope&apos;s rated bandwidth, all four channels on. Both stay
                above the Nyquist minimum of two.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DHO804 (312.5 ÷ 70)", value: 4.5, display: "≈ 4.5 samples" },
                { label: "SDS1104X-E (500 ÷ 100)", value: 5, display: "5 samples", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Other items from each maker&apos;s published specifications.</>}>
            <DataTable
              head={["", "DHO804", "SDS1104X-E"]}
              rows={[
                ["Vertical resolution", "12-bit", "8-bit"],
                ["Memory depth", "25 Mpts (1 ch); 5 Mpts (4 ch)", "14 Mpts (1 ch per pair); 7 Mpts (4 ch)"],
                ["Serial decoding", "Standard: UART, I2C, SPI, CAN, parallel", "Standard: I2C, SPI, UART, CAN, LIN"],
                ["Screen", "7-inch 1024 × 600 touchscreen", "7-inch 800 × 480"],
                ["Video out", "HDMI", "None listed (USB, LAN)"],
                ["Power", "USB-C", "100–240 V AC, 50 W max"],
                ["Signal generator / logic", "None / none", "Optional USB AWG / optional 16 ch"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs Siglent SDS1104X-E for a Home Lab</h2>
        <p className="text-muted leading-7 mb-4">
          A home lab scope lives on a desk that also holds a soldering station, a bench supply and a laptop, and it
          gets used for whatever the current project is. Since channel count is tied here, the practical questions
          are how fast your signals get, how small the details you chase are, and how much the instrument itself
          should fit around your bench.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DHO804 suits a bench built around microcontrollers and power. Its 12-bit converter gives 4,096 vertical
          steps, so the switching ripple on a buck converter&apos;s output or the slow drift of a temperature sensor
          stays legible after you zoom in, where the Siglent&apos;s 8-bit converter has 256. Decoding an ESP32&apos;s
          UART log or an I2C sensor read into bytes works on either scope, and with four inputs you can decode a bus
          while a fourth channel watches a reset or interrupt line. USB-C power and HDMI out make it easy to place: run it from a USB-C source and mirror the
          screen to the monitor you already have.
        </p>
        <p className="text-muted leading-7 mb-4">
          The SDS1104X-E suits a bench where signals keep getting faster. Its 100 MHz rating stretches the comfortable
          range to roughly 20 to 33 MHz, and it holds 500 MSa/s per channel when all four inputs are busy, which is
          the situation where the Rigol gives up the most. Siglent&apos;s interface is also widely regarded as easy
          to learn, which counts for a lot on a tool you reach for in short sessions after work. It decodes I2C,
          SPI, UART, CAN and LIN as standard and keeps 7 Mpts per channel with four on, more than the Rigol&apos;s 5
          Mpts. The trade is 8-bit resolution, a non-touch 800 × 480 screen and mains power instead of USB-C.
        </p>
        <DataTable
          head={["Home-lab task", "Better fit", "Why, from the data"]}
          rows={[
            ["Buck or boost converter ripple on a 5 V or 12 V rail", "Rigol DHO804", "12-bit resolution shows small ripple in detail"],
            ["ESP32 or Arduino UART and I2C debugging", "Either", "Both decode UART and I2C as standard"],
            ["CAN or LIN bus on a car or e-bike project", "Either; Siglent for LIN", "Both decode CAN; only Siglent lists LIN"],
            ["Long one-off captures on one channel, such as a brown-out", "Rigol DHO804", "25 Mpts against 14 Mpts"],
            ["Bench with a spare monitor and little desk room", "Rigol DHO804", "HDMI output and USB-C power"],
            ["Four signals at once near full speed", "Siglent SDS1104X-E", "500 MSa/s and 7 Mpts per channel vs 312.5 MSa/s and 5 Mpts"],
            ["Clocks and edges above about 15 MHz", "Siglent SDS1104X-E", "100 MHz vs 70 MHz rated bandwidth"],
            ["First scope, where ease of use matters most", "Siglent SDS1104X-E", "Interface is widely regarded as intuitive"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each scope can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is defined at the frequency where a sine wave reads 3 dB low, about 70% of its real amplitude.
          Applying the familiar 3 to 5 times rule, the DHO804 handles signals up to roughly 14 to 23 MHz with good
          fidelity and the SDS1104X-E up to roughly 20 to 33 MHz. In hobby terms, both cover I2C at 400 kHz, UART,
          PWM, audio and the switching frequency of most small converters many times over. The gap shows on a 25 MHz
          SPI clock or a fast logic edge: inside the Siglent&apos;s comfortable band, past the Rigol&apos;s. More
          detail is in our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          For edges, a widely used estimate puts a scope&apos;s own rise time at 0.35 divided by its bandwidth: about
          5 ns for 70 MHz and 3.5 ns for 100 MHz. That figure varies with each front end&apos;s design, so use it as a
          guide. A logic edge faster than the scope&apos;s own rise time is shown slower and rounder than it really
          is, which can hide overshoot or make timing between two lines look different from reality.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate is shared across channels on both. With one channel on, the Rigol samples faster (1.25 GSa/s
          against 1 GSa/s). With four on, the Siglent keeps 500 MSa/s each against the Rigol&apos;s 312.5 MSa/s, so a
          four-signal capture of a fast bus favours the Siglent twice: more bandwidth and more samples. Our guide to{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          explains why sample rate per channel is the figure to check.
        </p>
        <p className="text-muted leading-7 mb-4">
          Neither has a built-in generator: Rigol lists no generator or logic channels for the DHO804, and Siglent
          offers a USB 25 MHz generator module and 16 digital channels for the four-channel SDS1104X-E only as paid
          options. If you test filters and amplifiers, budget for a source whichever you choose.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration, not a capture: the same fast square wave seen with ample bandwidth (CH1) and near the
                scope&apos;s limit (CH2), where the edges are rounded and slower than the real signal.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={3}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "square-under", cycles: 3, amplitude: 1.2, offset: -1.8, label: "CH2 bandwidth-limited" }}
              labels={{ left: "CH1 ample bandwidth", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Speed or detail">
              The Siglent buys headroom for faster signals; the Rigol buys a closer look at slower ones. Ask which
              of those your next year of projects needs, not which spec sheet looks bigger.
            </KeyIdea>
            <Callout title="Mains and high-voltage circuits">
              A scope probe&apos;s ground lead is normally earthed through the instrument&apos;s supply or whatever
              else it is plugged into, and USB-C power doesn&apos;t change that by itself. Never clip it to a
              mains-referenced node; use a differential probe for that work.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          To compare the Siglent with Rigol&apos;s older four-channel model, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          ; for the two-channel Siglent with 200 MHz, see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" className={link}>
            Rigol DHO804 vs Siglent SDS1202X-E
          </Link>
          . You can also browse the{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" className={link}>
            best oscilloscopes for a home electronics lab
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner scope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and our{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a home lab centred on microcontrollers, sensors and power supplies, the Rigol DHO804 gives you more to work with: 12-bit resolution, 25 Mpts on one channel, a touchscreen, HDMI and USB-C power on four channels. Both decode serial buses as standard. If your signals are heading past 15 to 20 MHz, or you often run all four channels on fast signals, the Siglent SDS1104X-E's 100 MHz and 500 MSa/s per channel make it the better long-term scope.",
  faqs: [
    {
      question: "Is the Rigol DHO804 or the Siglent SDS1104X-E better for a home lab?",
      answer:
        "For most home benches built around Arduino, ESP32, sensors and power supplies, the DHO804: 12-bit resolution, a 1024 × 600 touchscreen, HDMI and USB-C power. Both include UART, I2C, SPI and CAN decoding. The SDS1104X-E is the better pick when fast clocks and edges are the focus, thanks to 100 MHz and 500 MSa/s per channel with four on.",
    },
    {
      question: "Is 70 MHz on the DHO804 enough, or do I need the Siglent's 100 MHz?",
      answer:
        "By the 3 to 5 times rule, 70 MHz covers signals up to roughly 14 to 23 MHz, which includes most hobby buses, PWM, audio and converter switching. You need the Siglent's 100 MHz, good to roughly 20 to 33 MHz, mainly for faster SPI clocks and for viewing sharp logic edges accurately.",
    },
    {
      question: "Which samples faster with all four channels on?",
      answer:
        "The Siglent SDS1104X-E, at 500 MSa/s per channel against the DHO804's 312.5 MSa/s. With one channel on the order flips: the Rigol reaches 1.25 GSa/s and the Siglent 1 GSa/s. So the Rigol is quicker for single-signal work and the Siglent for four-signal work.",
    },
    {
      question: "Does the Siglent SDS1104X-E have 12-bit resolution like the DHO804?",
      answer:
        "No. Siglent's SDS1000X-E data sheet lists 8-bit vertical resolution, or 256 levels. Rigol specifies the DHO804 as 12-bit, which gives 4,096 vertical levels. If small-signal detail such as ripple decides your purchase, that favours the DHO804.",
    },
    {
      question: "Can either scope generate a test signal?",
      answer:
        "Not on their own. Rigol lists no built-in generator or logic channels for the DHO804. Siglent sells an optional USB 25 MHz generator module for the four-channel SDS1104X-E, which plugs into its USB host port. For filter, amplifier or sensor-input testing, plan on a separate function generator alongside whichever scope you choose.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho804VsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
