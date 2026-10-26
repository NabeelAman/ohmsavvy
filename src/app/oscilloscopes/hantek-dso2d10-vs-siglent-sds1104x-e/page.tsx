import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D10 per https://www.hantek.com/products/detail/17182 (checked 2026-10-24, research/verified-facts.md):
// 100MHz, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 8 Mpts (1 ch) / 4 Mpts (2 ch), 8-bit with 12-bit high-res
// mode, standard trigger and decode UART/RS232, I2C, SPI, CAN, LIN, 7-inch 800x480, AC power < 30 W, 1-channel
// 25 MHz generator. Waveform update rate not stated by Hantek.
// Siglent SDS1104X-E per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/
// and the SDS1000X-E data sheet https://siglentna.com/download/22005/ (checked 2026-10-24): 100MHz, 4 channels,
// 1 GSa/s (500 MSa/s per channel with all on), 7 Mpts/CH non-interleaved / 14 Mpts/CH interleaved, 100,000 wfm/s
// (400,000 in sequence mode), standard serial trigger and decode I2C, SPI, UART/RS232, CAN, LIN, 8-bit, 7-inch 800x480,
// 100-240 V AC 50 W max; MSO (16 digital ch) and USB AWG are options for the 4-channel models.

const path = "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e";

export const metadata = buildMetadata({
  title: "Hantek DSO2D10 vs Siglent SDS1104X-E",
  description:
    "Hantek DSO2D10 vs Siglent SDS1104X-E: both 100MHz and 1 GSa/s, but 2 channels plus a built-in generator against 4 channels. Which suits your bench?",
  path: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e",
});

const link = "text-accent hover:underline";

/** Two bench setups: the Hantek drives the circuit from its own generator; the Siglent probes four bus lines. */
function SetupDiagram() {
  const lines = ["CS", "SCK", "MOSI", "MISO"];
  return (
    <svg
      viewBox="0 0 340 250"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of two bench setups. Top: the Hantek DSO2D10's generator output drives a filter under test, with channel 1 on the filter input and channel 2 on its output, using both channels. Bottom: the Siglent SDS1104X-E has its four channels on the chip select, clock, MOSI and MISO lines of an SPI bus between a microcontroller and a sensor."
    >
      <text x="6" y="14" fontSize="10" fontWeight="700" className="fill-foreground">
        Hantek DSO2D10: stimulus and response
      </text>
      <rect x="8" y="26" width="84" height="56" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="50" y="44" fontSize="9" textAnchor="middle" className="fill-foreground">DSO2D10</text>
      <text x="50" y="58" fontSize="8.5" textAnchor="middle" className="fill-accent">GEN OUT</text>
      <text x="50" y="70" fontSize="8" textAnchor="middle" className="fill-muted">CH1  CH2</text>
      <rect x="170" y="34" width="70" height="40" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="205" y="58" fontSize="9" textAnchor="middle" className="fill-foreground">Filter</text>
      <path d="M92 52 H170" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="130" y="47" fontSize="8" textAnchor="middle" className="fill-accent">25 MHz max</text>
      <path d="M150 52 V96 H38 V82" className="stroke-muted" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
      <text x="96" y="107" fontSize="8" textAnchor="middle" className="fill-muted">CH1 probe: input</text>
      <path d="M240 54 H290 V118 H62 V82" className="stroke-muted" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
      <text x="292" y="48" fontSize="8" textAnchor="middle" className="fill-muted">output</text>
      <text x="200" y="129" fontSize="8" textAnchor="middle" className="fill-muted">CH2 probe: output (both channels now in use)</text>

      <line x1="6" y1="140" x2="334" y2="140" className="stroke-border" strokeWidth="0.8" />

      <text x="6" y="157" fontSize="10" fontWeight="700" className="fill-foreground">
        Siglent SDS1104X-E: four lines on one trigger
      </text>
      <rect x="8" y="168" width="70" height="64" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="43" y="204" fontSize="9" textAnchor="middle" className="fill-foreground">MCU</text>
      <rect x="262" y="168" width="70" height="64" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="297" y="204" fontSize="9" textAnchor="middle" className="fill-foreground">Sensor</text>
      {lines.map((l, i) => {
        const y = 177 + i * 15;
        const px = 120 + i * 32;
        return (
          <g key={l}>
            <line x1="78" y1={y} x2="262" y2={y} className="stroke-foreground" strokeWidth="1.3" />
            <text x="84" y={y - 2.5} fontSize="7.5" className="fill-muted">{l}</text>
            <circle cx={px} cy={y} r="3" className="fill-accent" />
            <line x1={px} y1={y} x2={px} y2="246" className="stroke-accent" strokeWidth="0.9" strokeDasharray="2 2" />
          </g>
        );
      })}
      <text x="226" y="245" fontSize="8" className="fill-accent">← probes CH1–CH4</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2D10 vs Siglent SDS1104X-E",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "The Hantek DSO2D10 vs Siglent SDS1104X-E choice is unusual because the headline numbers match: both are 100MHz bench scopes with a 1 GSa/s maximum sample rate, a 7-inch 800 × 480 screen and standard serial decoding. What differs is what surrounds that front end. The Hantek has two channels and a built-in one-channel waveform generator (to 25 MHz); the Siglent has four channels, keeps 500 MSa/s per channel with all of them on, and has deeper memory per channel.",
  a: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
    chooseIf: [
      "You need a signal source as well as a scope and have room for only one instrument",
      "Your work is stimulus-and-response testing: filters, amplifiers and sensor inputs",
      "Two channels cover what you measure at the same time",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1104X-E")!,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E 4-channel digital oscilloscope",
    chooseIf: [
      "You need to watch three or four signals at once, such as a clock against several data lines",
      "You already own a signal source, or rarely need one",
      "You want the Hands-on Tested pick with a well-regarded, intuitive interface",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "500 MSa/s per channel (2 ch)", b: "500 MSa/s per channel (4 ch)" },
    { label: "Memory depth", a: "8 Mpts (1 ch), 4 Mpts (2 ch)", b: "14 Mpts/ch interleaved, 7 Mpts/ch non-interleaved" },
    { label: "Waveform update rate", a: "Not stated by Hantek", b: "100,000 wfm/s (400,000 in sequence mode)" },
    { label: "Vertical resolution", a: "8-bit, 12-bit high-res mode", b: "8-bit" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Serial trigger and decode", a: "UART/RS232, I2C, SPI, CAN, LIN (standard)", b: "I2C, SPI, UART/RS232, CAN, LIN (standard)" },
    { label: "Signal generator", a: "Built in: 1 channel, to 25 MHz", b: "None built in (USB AWG is a Siglent option)" },
    { label: "Digital channels", a: "None", b: "16 with the MSO option" },
    { label: "Power", a: "AC, under 30 W", b: "100–240 V AC, 50 W max" },
    { label: "Hands-on tested by OhmSavvy", a: "No", b: "Yes" },
  ],
  differences: [
    "Bandwidth is identical: both are rated at 100MHz, so neither shows a fast edge more faithfully than the other on paper.",
    "Both peak at 1 GSa/s and both give 500 MSa/s per channel with every channel on: two channels on the Hantek, four on the Siglent.",
    "Channels: 2 on the Hantek against 4 on the Siglent, the biggest practical difference between them.",
    "The Hantek has a built-in waveform generator (one channel, to 25 MHz); the Siglent has none built in, though Siglent sells a USB AWG option for its four-channel models.",
    "Memory: with two channels on, the Hantek has 4 Mpts each; the Siglent keeps 7 Mpts per channel even with all four on. Siglent also states 100,000 wfm/s; Hantek doesn't state an update rate.",
    "The SDS1104X-E carries our Hands-on Tested badge and a 4.8 rating; the Hantek DSO2D10 (4.3) assessment is desk research against Hantek's specifications.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most scope comparisons are decided by bandwidth. This one isn&apos;t. Both scopes are rated at 100MHz and both
          peak at 1 GSa/s, so on a single channel they are evenly matched. The charts below show where they part ways:
          how many signals you can watch together, how long each channel can record, and whether you also get a signal
          source. The Rigol DS1054Z appears in the bandwidth chart as a familiar 50MHz reference point.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth: a tie at 100MHz, double the 50MHz Rigol DS1054Z.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 100, display: "100MHz", highlight: true },
                { label: "Siglent SDS1104X-E", value: 100, display: "100MHz", highlight: true },
                { label: "Rigol DS1054Z (reference)", value: 50, display: "50MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: the Siglent watches twice as many signals at once.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 2, display: "2 channels" },
                { label: "Siglent SDS1104X-E", value: 4, display: "4 channels", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Memory per channel with every channel on, per the makers. The Siglent keeps more per channel while running
                twice as many.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Hantek, 2 ch on", value: 4, display: "4 Mpts" },
                { label: "Siglent, 4 ch on", value: 7, display: "7 Mpts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Record length at 500 MSa/s with every channel on (memory ÷ sample rate). Longer is better for slow events.</>}>
            <BarChart
              items={[
                { label: "Hantek, 2 ch on", value: 8, display: "8 ms" },
                { label: "Siglent, 4 ch on", value: 14, display: "14 ms", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <DataTable
            head={["Spec", "Hantek DSO2D10", "Siglent SDS1104X-E", "Same?"]}
            rows={[
              ["Bandwidth", "100MHz", "100MHz", "Same"],
              ["Peak sample rate", "1 GSa/s", "1 GSa/s", "Same"],
              ["Per channel, all on", "500 MSa/s × 2", "500 MSa/s × 4", "Siglent runs more"],
              ["Memory, all channels on", "4 Mpts each", "7 Mpts each", "Siglent"],
              ["Update rate", "Not stated", "100,000 wfm/s", "Unknown"],
              ["Screen", "7-inch, 800 × 480", "7-inch, 800 × 480", "Same"],
              ["Decoding", "UART, I2C, SPI, CAN, LIN", "I2C, SPI, UART, CAN, LIN", "Same"],
              ["Generator", "1 ch, to 25 MHz", "None built in", "Hantek"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          The record-length chart is simple arithmetic: 4 million points at 500 MSa/s fill in 8 ms, and 7 million fill in
          14 ms. That matters when you want one capture to hold a whole event, such as a burst of serial packets or a
          power-up sequence, and still zoom into individual edges afterwards. Both are generous for a hobby bench; the
          Siglent simply holds a longer window per channel while running twice as many.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two ways to use 100MHz: a test loop or a full bus</h2>
        <p className="text-muted leading-7 mb-4">
          The diagram shows the job each scope is shaped for. The Hantek can feed its own circuit: the generator output
          drives a filter or amplifier, channel 1 watches the input and channel 2 the output. The Siglent can&apos;t make a
          signal, but it can put a probe on every line of a four-wire bus, such as SPI&apos;s chip select, clock, MOSI and
          MISO, and capture them all on one trigger.
        </p>
        <Figure caption={<>Top: the DSO2D10&apos;s generator loop uses both of its channels. Bottom: the SDS1104X-E covers all four SPI lines at once.</>}>
          <SetupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Notice what the top setup costs: once the Hantek&apos;s generator is driving a circuit, both of its inputs are spoken
          for by input and output, so there is no spare channel for a third node such as a supply rail. The bottom setup
          shows the opposite limit: the Siglent can see the whole bus, but if the circuit needs an external stimulus you
          must bring one, either a separate generator or Siglent&apos;s optional USB AWG.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Start with what they share. Rated bandwidth is the frequency at which a sine wave is shown about 3 dB low,
          roughly 70% of its true amplitude, so a scope reads a signal accurately only well below that figure. The common
          3–5x rule says the scope&apos;s bandwidth should be three to five times the highest frequency you care about. At
          100MHz, both are comfortable on signals up to roughly 20–33MHz: microcontroller clocks, PWM, UART, I2C and most
          SPI, audio, and the switching frequency of typical hobby power supplies. Square waves need more margin than
          sines because their edges carry harmonics well above the fundamental, so treat the lower end of that range as
          the safe limit for clean edges. Our guide to{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          explains the rule in more depth.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate is closer than it first looks. Both reach 1 GSa/s on one channel, which is ten samples per cycle of a
          100MHz sine, and both drop to 500 MSa/s per channel with every input running: Hantek states this for its two
          channels, Siglent for its four. Five samples per cycle at 100MHz is still well above the Nyquist minimum of two.
          For what the GSa/s figure means in practice, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          The real dividing line is signal count. The Hantek can watch two things at once. That covers a lot: input against
          output of an amplifier, a PWM signal against its filtered result, a trigger pulse against a delayed response. It
          runs out when the problem involves three or more related signals, such as an SPI transaction or several supply
          rails coming up in sequence. Both scopes decode SPI, but the Hantek can only decode what its two probes reach,
          so a full four-wire transaction with chip select needs the Siglent.
        </p>
        <p className="text-muted leading-7 mb-4">
          The generator turns that around for analog work. To check a filter or amplifier you need a known input signal.
          With the Hantek, the built-in output (one channel, to 25 MHz) drives the circuit while the two channels compare
          input with output. A worked example: an RC low-pass with 1 kΩ and 10 nF has its corner at about 16 kHz (1 ÷
          2πRC). Step the generator from 1 kHz to 100 kHz and the output on channel 2 falls to about 70% of the input near
          16 kHz, then keeps dropping. With the Siglent you would need a separate source to run the same test.
        </p>
        <p className="text-muted leading-7 mb-4">
          Waveform update rate is the one figure only one maker publishes. Siglent states up to 100,000 waveforms per
          second (400,000 in sequence mode), which helps a rare glitch show up on screen instead of falling into the dead
          time between captures. Hantek doesn&apos;t state an update rate for the DSO2D10, so we can&apos;t compare the two
          on intermittent-fault hunting.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration: a stimulus-response test. CH1 is the generator&apos;s signal into a filter; CH2 is the smaller,
                delayed output. On the Hantek this uses both of its channels.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.5}
              offset={1.2}
              second={{ wave: "sine", cycles: 2, amplitude: 1.3, offset: -1.8, shift: 0.8, label: "CH2 out" }}
              labels={{ left: "CH1 in", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Same bandwidth, different bottleneck">
              Because both are rated at 100MHz, neither scope will show a fast edge more faithfully than the other. Choose
              on the constraint you will hit first: running out of channels (Siglent) or lacking a signal source (Hantek).
            </KeyIdea>
            <Callout title="Mains and high-voltage circuits">
              On a mains-powered bench scope the probe ground clip is normally tied to mains earth. Never clip it to a
              mains-referenced node; use a differential probe or an isolation transformer set up by someone who knows the
              hazards, and call a licensed electrician for building wiring.
            </Callout>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Since the two front ends match, match the scope to how many signals you handle at once and whether you need to
          make one of them yourself.
        </p>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Testing filters, amplifiers and sensor inputs", "Hantek DSO2D10", "Built-in generator supplies the test signal; two channels show input and output"],
            ["Small bench, no separate signal source", "Hantek DSO2D10", "Scope and 25 MHz generator in one compact unit"],
            ["SPI or parallel-bus timing (clock plus several lines)", "Siglent SDS1104X-E", "Four channels show the clock and up to three other lines together"],
            ["Multi-rail power-up sequencing", "Siglent SDS1104X-E", "Four channels capture four rails in one acquisition"],
            ["Hunting rare glitches", "Siglent SDS1104X-E", "Stated 100,000 wfm/s; Hantek doesn't state a figure"],
            ["First scope, learning the controls", "Siglent SDS1104X-E", "Well-regarded interface and the higher rating (4.8 vs 4.3)"],
            ["Single-signal checks under about 20MHz", "Either", "Same 100MHz bandwidth and 1 GSa/s peak sample rate"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the wider field, see the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          , and our full{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          . If you like the Hantek but don&apos;t need the generator, the{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>{" "}
          comparison covers the same scope without it.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "With bandwidth, peak sample rate, screen and decoding tied, this comes down to channels against a built-in generator. For most buyers the Siglent SDS1104X-E is the safer pick: four channels for timing and multi-signal debugging, more memory per channel, a stated 100,000 wfm/s and our Hands-on Tested badge. The Hantek DSO2D10 is the better fit if your bench has room for only one instrument and your work is mostly feeding a test signal into a circuit and watching what comes out.",
  faqs: [
    {
      question: "Is the Hantek DSO2D10 as fast as the Siglent SDS1104X-E?",
      answer:
        "On paper, yes. Both are rated at 100MHz bandwidth with a 1 GSa/s maximum sample rate, and both drop to 500 MSa/s per channel with every channel on: two channels on the Hantek, four on the Siglent. Siglent also states a 100,000 wfm/s update rate, which Hantek doesn't publish for the DSO2D10.",
    },
    {
      question: "Are two channels enough, or do I need the Siglent's four?",
      answer:
        "Two channels cover input-versus-output checks, a PWM signal against its result, or one signal against a trigger. You need four when three or more related signals must line up in time, such as an SPI bus with clock, chip select and two data lines, or several supply rails powering up in sequence.",
    },
    {
      question: "Can the Hantek DSO2D10's generator replace a separate function generator?",
      answer:
        "For many hobby tasks, yes. It is a single output up to 25 MHz, enough to drive audio filters, amplifiers and sensor inputs while the scope watches the result. It won't help if you need two independent test signals at once, and it doesn't add scope channels, so check Hantek's documentation for waveform options.",
    },
    {
      question: "What signals can a 100MHz oscilloscope measure accurately?",
      answer:
        "By the 3-5x rule of thumb, roughly 20-33MHz and below. That covers most microcontroller clocks, UART, I2C, much SPI, PWM, audio and typical switching supplies. Square waves need more headroom than sines because their edges contain higher harmonics, so stay toward the lower end for clean edges.",
    },
    {
      question: "Which is better for a beginner, the Hantek DSO2D10 or the Siglent SDS1104X-E?",
      answer:
        "Usually the Siglent. Its interface is widely regarded as intuitive, its four channels leave room to grow into timing work, and it rates higher in our roundup. The Hantek suits a beginner who mainly wants to inject test signals into circuits and has no space or budget for a separate generator.",
    },
    {
      question: "Do both scopes decode I2C and SPI as standard?",
      answer:
        "Yes. Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding as standard on the DSO2D10, and Siglent lists the same five protocols as standard on the SDS1104X-E. The practical difference is channel count: the Hantek can only decode lines its two probes reach, so four-wire SPI needs the Siglent.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function HantekDso2d10VsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
