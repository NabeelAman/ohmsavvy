import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152";

export const metadata = buildMetadata({
  title: "Rigol DHO802 vs FNIRSI DSO152: Bench vs Pocket",
  description:
    "Rigol DHO802 vs FNIRSI DSO152: a 70 MHz, 12-bit two-channel bench scope against a 200kHz pocket scope. Charts, use cases and which one fits your work.",
  path: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO802 vs FNIRSI DSO152",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO802 vs FNIRSI DSO152 puts a full bench instrument against a scope that fits in a pocket. The DHO802 is a two-channel, 70 MHz, 12-bit scope sampling at up to 1.25 GSa/s, with a 7-inch touchscreen and standard serial decoding. The DSO152 is a single-channel, 200kHz, 2.5 MSa/s pocket scope at an extremely low entry price. Which one you want depends on where you measure and how fast your signals move.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO802")!,
    imageAlt: "Rigol DHO802 12-bit two-channel oscilloscope, front panel",
    chooseIf: [
      "You debug microcontroller boards and want UART, I2C, SPI or CAN traffic decoded on screen",
      "You need two signals at once, such as an amplifier's input and output",
      "You look for millivolt-scale ripple or noise, where 12-bit resolution shows more detail",
      "You want to send the display to a monitor over HDMI or reach the scope over LAN",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI DSO152")!,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want a scope that rides in a pocket or tool bag for checks away from the bench",
      "Your signals stay in the audio range or slower and one channel is enough",
      "You want the cheapest possible way to learn what waveforms look like",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Bench scope, 7-inch 1024 × 600 touchscreen", b: "Pocket-sized" },
    { label: "Sample rate, all channels on", a: "625 MSa/s per channel (2 ch)", b: "2.5 MSa/s (its only channel)" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 14–23 MHz", b: "Up to roughly 40–65kHz" },
  ],
  differences: [
    "Bandwidth: 70 MHz on the Rigol against 200kHz on the FNIRSI, 350 times higher. By the 3–5× rule the DHO802 is comfortable to roughly 14–23 MHz and the DSO152 to roughly 40–65kHz.",
    "Sample rate: 1.25 GSa/s on the DHO802 with one channel on (625 MSa/s each with both) against 2.5 MSa/s, a 500-fold gap that is still 250-fold with both Rigol channels running.",
    "Channels: 2 against 1. Only the Rigol can show cause and effect on the same screen.",
    "The DHO802 is a 12-bit scope with 25 Mpts of memory on one channel (10 Mpts on both). The DSO152's vertical resolution and memory depth are not in our verified data.",
    "The Rigol decodes parallel, UART, I2C, SPI and CAN as standard and adds HDMI and LAN. It has no built-in signal generator or logic channels.",
    "The FNIRSI is pocket-sized and an extremely affordable entry point; the Rigol is a bench instrument that runs from a USB-C 15 V supply.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The headline gaps here are in the hundreds, so the bandwidth and sample-rate bars sit on a log scale.
          The fourth chart is the one worth a second look: it divides each sample rate by the scope&apos;s own
          bandwidth, which shows how many points each one draws per cycle of the fastest signal it is rated for.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point), log scale: 70 MHz is 350 times 200kHz.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO802", value: 70_000_000, display: "70 MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. With both channels on, the DHO802 still samples 250 times faster than the DSO152.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO802 (1 ch)", value: 1_250_000_000, display: "1.25 GSa/s", highlight: true },
                { label: "Rigol DHO802 (2 ch)", value: 625_000_000, display: "625 MSa/s" },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels: two signals at once on the Rigol, one on the FNIRSI.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802", value: 2, display: "2 channels", highlight: true },
                { label: "FNIRSI DSO152", value: 1, display: "1 channel" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s own bandwidth limit (sample rate ÷ bandwidth). Nyquist&apos;s floor is 2.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802 (1 ch)", value: 17.9, display: "≈17.9", highlight: true },
                { label: "FNIRSI DSO152", value: 12.5, display: "12.5" },
                { label: "Rigol DHO802 (2 ch)", value: 8.9, display: "≈8.9" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          That last chart is a reminder that the DSO152 isn&apos;t badly balanced, just small. Measured against its
          own 200kHz ceiling it samples 12.5 times per cycle, more finely than the DHO802 does at 70 MHz with both
          channels on. The difference is the ceiling itself. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          covers why the −3 dB figure sets that ceiling, and the{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            GSa/s explainer
          </Link>{" "}
          covers why sample rate has to stay well above it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bench vs pocket: where each one lives</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO802 is built to sit in front of you while you work. Its 7-inch, 1024 × 600 capacitive touchscreen
          gives room for two traces plus decoded bus data, HDMI lets you mirror it onto a bigger monitor for a
          class or a stream, and LAN puts it on the network. It runs from a USB-C 15 V supply rather than a mains
          lead, which makes it lighter on cabling than a traditional benchtop, but Rigol&apos;s data in our records
          lists no internal battery, so plan on a power source wherever you set it up.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO152 is built to go where the problem is. Being pocket-sized is its whole case: you can check a
          speaker line inside a cabinet, a sensor output on a machine across the workshop, or a PWM pin on a
          project you&apos;ve already mounted, without carrying a bench scope over. Our verified data for it
          doesn&apos;t list a battery type, screen size or maximum input voltage, so confirm those on FNIRSI&apos;s
          listing before you rely on it away from an outlet or near higher voltages.
        </p>
        <p className="text-muted leading-7">
          That makes the pairing less of a rivalry than it looks. A DHO802 owner may still want a DSO152 in the tool
          bag; a DSO152 owner who starts debugging digital circuits will want a bench scope. The question is which
          one you need first.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Pick", "Reason from the specs"]}
          rows={[
            ["Not sure you'll use a scope regularly", "FNIRSI DSO152", "Extremely affordable; little lost if it ends up as a spare"],
            ["Quick checks away from the bench", "FNIRSI DSO152", "Pocket-sized; the DHO802 needs its USB-C 15 V supply"],
            ["Checking an audio amplifier for clipping", "Either", "Audio tops out near 20kHz, inside the DSO152's comfortable range"],
            ["Reading UART, I2C or SPI on an Arduino or ESP32", "Rigol DHO802", "Standard decoding, and 70 MHz covers typical hobby bus speeds"],
            ["Comparing an input with an output", "Rigol DHO802", "Two channels; the DSO152 has one"],
            ["Looking for small ripple on a supply rail", "Rigol DHO802", "12-bit: 4,096 vertical levels"],
            ["Catching a one-off glitch in a long sequence", "Rigol DHO802", "Up to 25 Mpts of memory on one channel"],
            ["Showing waveforms to a class on a big screen", "Rigol DHO802", "HDMI output"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is the frequency at which a scope shows a sine wave about 3 dB low, roughly 70% of its real
          amplitude. The working rule is to buy 3–5 times the frequency you want to see accurately, and more for
          square waves, whose edges carry harmonics far above the fundamental. That rule draws the boundary for
          each of these scopes.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: slow signals, one at a time</h3>
        <p className="text-muted leading-7 mb-4">
          A 200kHz front end is comfortable up to roughly 40–65kHz. Inside that band it can show an audio signal
          clipping, mains-frequency ripple on a linear supply after the rectifier, a thermistor or light-sensor
          output drifting, or a servo&apos;s 50Hz control pulse. Push higher and it starts to mislead rather than
          simply fail: a 100kHz I2C clock is already beyond its comfortable range, so the edges look slower than
          they are. Bus traffic at megahertz rates and the switching node of most modern regulators are out of reach,
          and with a single input it can&apos;t line up a trigger cause with its effect.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO802: two signals, in fine detail</h3>
        <p className="text-muted leading-7 mb-4">
          At 70 MHz the DHO802 is comfortable on signals up to roughly 14–23 MHz, which takes in hobby
          microcontroller clocks, PWM motor drives, typical UART, I2C and SPI speeds, and everything the DSO152 can
          show. Its memory changes what you can capture in one shot: 25 Mpts at 1.25 GSa/s fills in about 20 ms,
          and 10 Mpts per channel at 625 MSa/s with both on fills in about 16 ms, long enough to hold a whole burst
          of serial packets at full speed and decode it afterwards. Its limits are channel count and features: two
          inputs mean SPI&apos;s clock, data and chip-select lines can&apos;t all be on screen together, and there is
          no built-in generator to drive a circuit under test.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Two channels: an input sine (CH2, blue) and the clipped output it produces (CH1), on one screen. Illustration, not a capture.</>}>
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.5}
              offset={1.5}
              second={{ wave: "sine", cycles: 2, amplitude: 1.2, offset: -2, label: "CH2 in" }}
              labels={{ left: "Cause and effect together" }}
            />
          </Figure>
          <Figure caption={<>One channel: the clipped output alone. You can see something is wrong but not what drove it. Illustration, not a capture.</>}>
            <ScopeScreen wave="square" cycles={2} amplitude={1.5} labels={{ left: "Effect only" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="What 12 bits buy you">
            An 8-bit converter splits its input range into 256 levels; a 12-bit one into 4,096. If the range spans
            8 divisions at 100 mV per division, that is roughly 3 mV per step at 8 bits against about 0.2 mV at 12
            bits. Real scopes spend some of that on noise and the exact range varies by design, but it is why a
            12-bit scope like the DHO802 shows small ripple on a large signal more cleanly. FNIRSI doesn&apos;t state
            the DSO152&apos;s resolution in our data, so we don&apos;t assign it a figure.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Grounds and high voltage">
            On a bench scope the probe ground clip is usually connected to earth, through the power supply or
            through anything plugged into it such as an HDMI monitor or LAN cable. Clipping it to a live or
            non-earthed point can short a circuit through the scope. Use a differential probe or isolation for mains
            work, and don&apos;t take the DSO152 near mains unless FNIRSI&apos;s own input rating covers it; that rating
            isn&apos;t in our verified data.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Related matchups</h2>
        <p className="text-muted leading-7">
          If you like the DHO802 but want four channels, compare the{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 and DS1054Z
          </Link>
          ; if a built-in generator matters more than 12 bits, see{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" className={link}>
            Rigol DHO802 vs Hantek DSO2D10
          </Link>
          . For the DHO802 against older bench favorites, see{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            Rigol DHO802 vs Rigol DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" className={link}>
            Siglent SDS1104X-E vs Rigol DHO802
          </Link>
          . Staying pocket-sized? The{" "}
          <Link href="/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" className={link}>
            FNIRSI DSO-TC3 vs DSO152
          </Link>{" "}
          page compares the two FNIRSI handhelds, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          walks through every spec on this page.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If you build or debug circuits at a desk, the Rigol DHO802 is the better buy: 350 times the bandwidth, two channels, 12-bit detail, deep memory and serial decoding as standard. The FNIRSI DSO152 makes sense as an extremely affordable first look at waveforms or as a pocket tool for audio-range checks away from the bench, alongside a bench scope rather than instead of one.",
  faqs: [
    {
      question: "Is the Rigol DHO802 worth it over a pocket scope like the FNIRSI DSO152?",
      answer:
        "Yes, if your work goes beyond audio-range signals. The DHO802 has 70 MHz against 200kHz, two channels against one, 12-bit resolution and standard UART, I2C, SPI and CAN decoding. If you only need to glance at slow signals in the field, or want a very cheap first scope, the DSO152 covers that.",
    },
    {
      question: "Can the FNIRSI DSO152 decode UART or I2C like the Rigol DHO802?",
      answer:
        "Decoding isn't listed for the DSO152 in our verified data, and its bandwidth rules out most bus work anyway. A 100kHz I2C clock is past its comfortable range of roughly 40–65kHz. The DHO802 decodes parallel, UART, I2C, SPI and CAN as standard.",
    },
    {
      question: "Is the Rigol DHO802 portable?",
      answer:
        "It is a bench scope with a 7-inch touchscreen that runs from a USB-C 15 V supply, so it moves between benches more easily than a mains-corded scope. Our data lists no internal battery for it, so it still needs a suitable power source. The DSO152 is the pocket-sized option of the two.",
    },
    {
      question: "Does 12-bit resolution matter for a beginner?",
      answer:
        "It matters most when you look at a small detail riding on a larger signal, such as ripple on a 5 V rail or noise on a sensor output. A 12-bit scope has 4,096 vertical levels against 256 for an 8-bit one, so those details show more cleanly. For basic waveform shapes, bandwidth and channels matter more.",
    },
    {
      question: "Which is better for checking audio circuits?",
      answer:
        "Both can show audio, which tops out around 20kHz, inside the DSO152's comfortable range. The DSO152 is enough to spot clipping on one output. The DHO802 is better for real amplifier work: it shows input and output together and its 12-bit resolution resolves low-level distortion and hum more clearly.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho802VsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
