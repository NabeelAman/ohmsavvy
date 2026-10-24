import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, SamplingChart } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D10 coupling DC/AC/GND, 1 MOhm || 13 pF input, 2 mV/div to 10 V/div, 8M (1 ch) / 4M (2 ch) memory,
// 1 GSa/s (1 ch) / 500 MSa/s (2 ch), generator 1 ch 200 MSa/s with sine to 25 MHz and square/pulse to 10 MHz,
// triggers Edge, Pulse width, Video, Slope, Overtime, Window, Pattern, Interval, Under Amp, UART, LIN, CAN, SPI, IIC,
// math + - x / and FFT, USB host and device, AC mains < 30 W, 318 x 110 x 150 mm, 1900 g
// per https://www.hantek.com/products/detail/17182 (checked 2026-10-24).
// Hantek 6022BE input 1 MOhm / 25 pF, DC coupling, 20 mV-5 V/div, triggers Auto/Normal/Single on rising/falling edge,
// X-Y mode, math FFT + - x /, USB 2.0 bus power, 205 x 120 x 35 mm, Windows software (Win10/8/7/NT/XP/Vista listed),
// memory row ambiguous ("1M" buffer not clearly assigned to this model)
// per https://hantek.com/products/detail/31 (research file hantek-6022be.json, checked 2026-10-24).

const path = "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10";

export const metadata = buildMetadata({
  title: "Hantek 6022BE vs DSO2D10: PC or Bench?",
  description:
    "Hantek 6022BE vs Hantek DSO2D10: a 20MHz USB scope that runs on a Windows PC against a 100MHz bench scope with its own screen and a 25MHz generator.",
  path: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 6022BE vs Hantek DSO2D10",
  path,
  published: "2026-10-24",
  intro:
    "Hantek 6022BE vs Hantek DSO2D10 is two ends of one brand's range. The 6022BE is a screenless USB box: two channels, 20MHz and 48 MS/s, powered and displayed by a Windows PC. The DSO2D10 is a mains-powered bench scope with a 7-inch 800 × 480 screen, two channels at 100MHz and 1 GSa/s, serial decoding and a built-in 25MHz signal generator.",
  a: {
    pick: picks.find((p) => p.name === "Hantek 6022BE")!,
    imageAlt: "Hantek 6022BE two-channel USB PC oscilloscope",
    chooseIf: [
      "You want the lowest-cost way to see real waveforms and already own a Windows laptop",
      "Your signals are audio, slow PWM, UART and standard-mode I2C, well under a few MHz",
      "You need something that lives in a drawer and powers itself from a USB port",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 bench oscilloscope with built-in waveform generator",
    chooseIf: [
      "You want a standalone instrument with knobs and a screen, with no computer to boot",
      "You work with SPI, CAN or fast logic edges that need 100MHz and 1 GSa/s",
      "You want to inject test signals into filters and amplifiers from the same box",
      "You need AC coupling or 2 mV/div sensitivity for small signals riding on DC",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "None: shown in Hantek's Windows software", b: "7-inch TFT, 800 × 480" },
    { label: "Power", a: "USB 2.0 bus power", b: "AC mains, under 30 W" },
    { label: "Sample rate, both channels on", a: "Not stated by Hantek", b: "500 MSa/s" },
    { label: "Memory depth", a: "1M buffer listed, not clearly assigned to this model", b: "8M (1 channel), 4M (2 channels)" },
    { label: "ADC resolution", a: "8-bit", b: "8-bit, with a 12-bit high-resolution mode" },
    { label: "Input coupling", a: "DC only", b: "DC, AC, GND" },
    { label: "Vertical range", a: "20 mV to 5 V/div", b: "2 mV to 10 V/div" },
    { label: "Input impedance", a: "1 MΩ / 25 pF", b: "1 MΩ / 13 pF" },
    { label: "Triggers", a: "Rising or falling edge; Auto, Normal, Single", b: "Edge, pulse width, slope, window, pattern, video and more, plus UART, I2C, SPI, CAN, LIN" },
    { label: "Serial decoding", a: "Not stated by Hantek", b: "UART/RS232, I2C, SPI, CAN, LIN (standard)" },
    { label: "Signal generator", a: "None", b: "1 channel: sine to 25 MHz, square/pulse to 10 MHz, arbitrary" },
    { label: "Math", a: "FFT, add, subtract, multiply, divide; X-Y mode", b: "FFT, add, subtract, multiply, divide" },
    { label: "Size", a: "205 × 120 × 35 mm", b: "318 × 110 × 150 mm" },
    { label: "Weight", a: "Not stated by Hantek", b: "1,900 g" },
  ],
  differences: [
    "Bandwidth is five times higher on the DSO2D10 (100MHz against 20MHz), and its sample rate is about 21 times higher with one channel on (1 GSa/s against 48 MS/s).",
    "The 6022BE has no screen or controls of its own; every capture happens in Hantek's Windows software. The DSO2D10 is self-contained with a 7-inch display.",
    "The DSO2D10 adds a single-channel generator (sine to 25MHz, square to 10MHz, arbitrary waveforms) that the 6022BE lacks entirely.",
    "Hantek lists standard UART, I2C, SPI, CAN and LIN triggering and decoding for the DSO2D10; the 6022BE's trigger list is rising or falling edge only.",
    "The 6022BE is DC-coupled only with a 20 mV/div floor; the DSO2D10 offers AC coupling and goes down to 2 mV/div, which matters for ripple and small sensor signals.",
    "The 6022BE draws its power from USB and measures 205 × 120 × 35 mm; the DSO2D10 runs from mains and weighs 1.9 kg.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both are two-channel, 8-bit Hantek scopes, so on paper the gap looks like a simple step up. In practice
          the sample rate gap is the bigger one. The 6022BE&apos;s 48 MS/s is a low ceiling for a 20MHz front end:
          it leaves fewer than three samples per cycle at the rated bandwidth. The DSO2D10 keeps ten samples per
          cycle at 100MHz with one channel on, and five with both.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB), log scale: 100MHz on the DSO2D10, 20MHz on the 6022BE.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO2D10", value: 100, display: "100MHz", highlight: true },
                { label: "Hantek 6022BE", value: 20, display: "20MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. Hantek doesn&apos;t state the 6022BE&apos;s rate with both channels running.</>}>
            <BarChart
              log
              items={[
                { label: "DSO2D10 (1 channel)", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "DSO2D10 (2 channels)", value: 500_000_000, display: "500 MSa/s" },
                { label: "6022BE (max)", value: 48_000_000, display: "48 MS/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Gap between samples (1 ÷ sample rate), log scale. Shorter is better: it sets how precisely an edge can be placed in time.</>}>
            <BarChart
              log
              items={[
                { label: "6022BE (max rate)", value: 20.8, display: "≈20.8 ns" },
                { label: "DSO2D10 (2 channels)", value: 2, display: "2 ns" },
                { label: "DSO2D10 (1 channel)", value: 1, display: "1 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Most sensitive vertical setting, in mV/div. The DSO2D10 reaches a setting ten times finer.</>}>
            <BarChart
              items={[
                { label: "Hantek 6022BE", value: 20, display: "20 mV/div" },
                { label: "Hantek DSO2D10", value: 2, display: "2 mV/div", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A shorter bar wins in the last two charts. Memory is the one figure we can&apos;t chart fairly: Hantek
          gives the DSO2D10 8M points on one channel and 4M on two, but the 6022BE&apos;s product table shows a 1M
          buffer without making clear which model it belongs to. For the theory behind these numbers, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PC or bench: how each one fits your desk</h2>
        <p className="text-muted leading-7 mb-4">
          The 6022BE turns a laptop into the scope. Plug it into a USB 2.0 port and it takes its power from there,
          with the waveform, the timebase and the trigger all set with a mouse in Hantek&apos;s software. That
          makes it tiny to store and cheap to own, and a laptop screen can be bigger than a 7-inch panel. The cost
          is that the scope only exists while the computer is running the software, and Hantek&apos;s list of
          supported systems names Windows versions only (up to Windows 10 on its product page). Mac and Chromebook
          owners should treat it as unsupported.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DSO2D10 is the opposite: a 1.9 kg, 318 mm deep instrument that needs a mains socket and a permanent
          spot on the bench, but is ready to probe as soon as it boots. Dedicated knobs for volts per division and
          timebase make it quicker to hunt for a signal than clicking through menus, and its USB host and device
          ports cover saving captures. The built-in generator is the other half of the bench argument: one box
          both drives a circuit and watches what comes out.
        </p>
        <KeyIdea title="Why the 6022BE runs out of samples before it runs out of bandwidth">
          A scope needs more than two samples per cycle to draw a recognisable sine, and around ten to show its
          shape cleanly. At 48 MS/s the 6022BE reaches ten samples per cycle at about 4.8MHz, well below its 20MHz
          rating. Above that, the trace is a handful of dots joined by straight lines. The DSO2D10 still has ten
          samples per cycle at its full 100MHz on one channel.
        </KeyIdea>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>A 20MHz sine on the 6022BE at 48 MS/s: about 2.4 samples per cycle, so the joined dots barely resemble the signal.</>}>
            <SamplingChart cycles={5} samples={12} label="Five cycles sampled with twelve points, as on the 6022BE at 20MHz" />
          </Figure>
          <Figure caption={<>The same five cycles with ten samples each, as on the DSO2D10 at 100MHz with one channel on.</>}>
            <SamplingChart cycles={5} samples={50} label="Five cycles sampled with fifty points, as on the DSO2D10 at 100MHz" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Where the 6022BE is enough</h3>
        <p className="text-muted leading-7 mb-4">
          By the 3–5x rule of thumb, a 20MHz scope is comfortable on signals up to roughly 4–7MHz, and the sample
          rate argument above points to the low end of that range. That still covers a lot of hobby work: a 555
          timer, the PWM driving a fan or LED strip, a 9,600 or 115,200 baud UART line, 100kHz I2C, audio through an
          amplifier, or the output of a slow sensor. Two channels let you put a clock and its data line, or an
          input and an output, on screen together, and Hantek lists FFT and X-Y mode for frequency and phase work.
        </p>
        <p className="text-muted leading-7 mb-4">
          Its weak spots are specific. The inputs are DC-coupled only, and the most sensitive setting is 20 mV/div,
          so 50 mV of ripple on a 12V rail is hard to see: Hantek lists no AC coupling to strip the 12V away first.
          Triggering is rising or falling edge only, so catching one short glitch in a stream of normal pulses is
          a matter of luck. And with no decoding listed, reading an I2C address means counting bits by eye.
        </p>
        <h3 className="text-lg font-semibold mb-2">What the DSO2D10 adds</h3>
        <p className="text-muted leading-7 mb-4">
          At 100MHz the DSO2D10 is comfortable to roughly 20–33MHz, which takes in multi-MHz SPI clocks, the
          ringing on a fast logic edge and the switching node of many small DC-DC converters. AC coupling and
          2 mV/div make the ripple job straightforward (see{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage
          </Link>
          ). Pulse-width, under-amplitude and pattern triggers isolate faults, and the serial triggers
          and decoders turn UART, I2C, SPI, CAN and LIN traffic into readable values. The generator lets you sweep
          a sine into an RC filter on one channel while watching the output on the other, without a second
          instrument. The trade-offs our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            DSO2D10 review
          </Link>{" "}
          raises still apply: two channels only, and a smaller user community than Rigol or Siglent.
        </p>
        <Callout title="Grounding on both scopes">
          The DSO2D10&apos;s probe ground is normally tied to mains earth through its power cord, so clipping it to
          a point that isn&apos;t at earth potential, such as anywhere on the primary side of a mains supply, causes
          a short. Hantek doesn&apos;t list USB isolation for the 6022BE, so assume its probe ground is joined to
          your laptop&apos;s ground and, through a charger, possibly to earth as well. Keep both on low-voltage
          circuits and use a differential probe for mains.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you…", "Pick", "Why"]}
          rows={[
            ["Want to learn what a waveform looks like for the least money", "Hantek 6022BE", "Very low cost; your laptop supplies screen and power"],
            ["Use a Mac or Chromebook", "Hantek DSO2D10", "Hantek lists only Windows software for the 6022BE"],
            ["Debug SPI clocks of several MHz", "Hantek DSO2D10", "1 GSa/s and 100MHz against 48 MS/s and 20MHz"],
            ["Need to read CAN or LIN frames", "Hantek DSO2D10", "Hantek lists CAN and LIN decoding as standard"],
            ["Check ripple on a 5V or 12V rail", "Hantek DSO2D10", "AC coupling and 2 mV/div; the 6022BE is DC-only"],
            ["Test filters or amplifiers with a known input", "Hantek DSO2D10", "Built-in generator, sine up to 25MHz"],
            ["Watch Arduino PWM or a UART line at a desk", "Either", "Both are far above these frequencies"],
            ["Store the scope in a drawer between projects", "Hantek 6022BE", "205 × 120 × 35 mm and USB-powered"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the DSO2D10 is on your shortlist, compare it with four-channel options in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>
          , or with its generator-free sibling in{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs Hantek DSO2D10
          </Link>
          . For other USB scopes against the 6022BE, see{" "}
          <Link href="/oscilloscopes/owon-vds1022i-vs-hantek-6022be" className={link}>
            OWON VDS1022I vs Hantek 6022BE
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/picoscope-2206b-vs-hantek-6022be" className={link}>
            PicoScope 2206B vs Hantek 6022BE
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          cover the wider field.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek 6022BE only if cost is the deciding factor, you already have a Windows laptop and your signals stay below a few MHz: it shows real waveforms on two channels for very little money. For anything beyond that, the DSO2D10 is the far more capable scope, with five times the bandwidth, about 21 times the sample rate, AC coupling, serial decoding and a generator, in a box that works without a computer.",
  faqs: [
    {
      question: "Is the Hantek DSO2D10 worth it over the 6022BE?",
      answer:
        "If your work goes past slow hobby signals, yes. The DSO2D10 has 100MHz against 20MHz, 1 GSa/s against 48 MS/s, AC coupling, a 2 mV/div setting, serial decoding and a 25MHz generator. The 6022BE makes sense when the budget is very tight and a Windows laptop is already on your desk.",
    },
    {
      question: "Can the Hantek 6022BE be used without a computer?",
      answer:
        "No. It has no screen, buttons or power supply of its own: it takes power over USB 2.0 and displays everything in Hantek's software, which Hantek lists for Windows only. The DSO2D10 is a complete instrument with a 7-inch screen and front-panel controls.",
    },
    {
      question: "Can the 6022BE measure power supply ripple?",
      answer:
        "Only coarsely. Hantek lists DC coupling only and a most sensitive setting of 20 mV/div, so a small ripple sitting on a 5V or 12V rail is hard to separate from the DC level. The DSO2D10 offers AC coupling and 2 mV/div, which suits ripple checks far better.",
    },
    {
      question: "Does either Hantek decode I2C or UART?",
      answer:
        "Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding as standard on the DSO2D10. The 6022BE's published trigger options are rising and falling edge, and Hantek doesn't state protocol decoding for it, so plan on reading bits by eye if you buy the USB model.",
    },
    {
      question: "Why is the 6022BE's sample rate a bigger limit than its bandwidth?",
      answer:
        "At 48 MS/s it gets only about 2.4 samples per cycle of a 20MHz signal, too few to show a waveform's shape. Around ten samples per cycle is a comfortable minimum, which puts its practical limit nearer 5MHz. The DSO2D10 keeps ten samples per cycle at 100MHz with one channel on.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Hantek 6022BE for Beginners", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
  ],
};

export default function Hantek6022beVsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
