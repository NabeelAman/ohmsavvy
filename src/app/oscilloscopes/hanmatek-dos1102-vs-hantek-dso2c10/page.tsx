import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// HANMATEK DOS1102: 2 ns/div-1000 s/div, 20 mV/div-5 V/div, 1 MOhm +/-2% || 20 pF, 400 V max input (DC+AC pk-pk), edge and video triggers
// (auto/normal/single), 30 auto measurements, math + - x / and FFT, 16 stored waveforms, USB 2.0 device plus USB flash disk, DC 5 V 2 A,
// 301 x 152 x 70 mm, about 1.1 kg, per the DOS1102 user manual section 5 (linked from https://hanmatek.com/pages/manuals-center); no serial
// decoding per the FAQ on https://hanmatek.com/products/hanmatek-dos1102-110mhz-2ch-oscilloscope; the DOS1102S adds a 10 MHz signal source per
// https://hanmatek.com/ (checked 2026-10-24). That maker FAQ also carries copy-pasted figures (250 MSa/s, 12,000 pts, 3.5-inch) that contradict the
// manual and are ignored. Sample rate: Amazon title "500 MS/s x2", front badge and maker page "1GSa/s", manual 500 MS/s per channel.
// Hantek DSO2C10: rise time 3.5 ns typical, 8-bit with 12-bit high-res mode, 8 Mpts (1 ch) / 4 Mpts (2 ch), triggers edge, pulse, video, slope,
// overtime, window, pattern, interval, under-amplitude, UART, LIN, CAN, SPI, I2C; decode RS232/UART, I2C, SPI, CAN, LIN; 32 auto measurements
// with statistics; 2 DVMs; 6-digit hardware frequency counter; SCPI; USB host/device; 1 MOhm || 13 pF; mains 100-240 VAC, under 30 W;
// 318 x 110 x 150 mm; 1900 g, per http://www.hantek.com/products/detail/17182 (checked 2026-10-24). Conflict: the Amazon listing (B09GY871QK)
// mentions arbitrary waveform output, but Hantek's table shows no generator on the DSO2C10.

const path = "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10";

const dos = picks.find((p) => p.name === "HANMATEK DOS1102")!;
const c10 = picks.find((p) => p.name === "Hantek DSO2C10")!;

export const metadata = buildMetadata({
  title: "DOS1102 vs DSO2C10: Which Bench Scope?",
  description:
    "HANMATEK DOS1102 vs Hantek DSO2C10: a light 110 MHz bench scope with 10K memory against a 100 MHz scope with 8 Mpts and UART, I2C, SPI and CAN decoding.",
  path: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10",
  image: dos.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "HANMATEK DOS1102 vs Hantek DSO2C10",
  path,
  published: "2026-10-24",
  intro:
    "On bandwidth the HANMATEK DOS1102 vs Hantek DSO2C10 match-up looks even: 110 MHz against 100 MHz, two channels each, a 7-inch 800 × 480 screen on both. The real gap is behind the screen. The DOS1102 keeps 10K points per capture and triggers on edges and video only; the DSO2C10 keeps up to 8 Mpts, adds pulse, slope and pattern triggers, and decodes UART, I2C, SPI, CAN and LIN. That makes this a choice between a simple, light first scope and a deeper debugging tool.",
  a: {
    pick: dos,
    imageAlt: "HANMATEK DOS1102 two-channel 110 MHz benchtop oscilloscope, front view",
    chooseIf: [
      "You want a first bench scope for repetitive analog signals: audio, PWM, ripple, oscillators",
      "A 1.1 kg scope that runs from a 5 V 2 A adapter suits a small desk or a mobile setup",
      "You will learn on edge triggering and basic measurements before needing anything fancier",
    ],
  },
  b: {
    pick: c10,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz digital storage oscilloscope, front view",
    chooseIf: [
      "You debug microcontroller projects and want I2C, SPI, UART, CAN or LIN decoded on screen",
      "You need to capture a long event, such as a whole serial message or a power-up, at high sample rate",
      "You want pulse-width, runt (under-amplitude) or pattern triggers to catch faults that edges miss",
    ],
  },
  extraSpecs: [
    { label: "Record length", a: "10K points", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Rise time", a: "3 ns or less (typical)", b: "3.5 ns (typical)" },
    { label: "Vertical resolution", a: "Not stated by HANMATEK", b: "8-bit; high-res mode up to 12-bit" },
    { label: "Trigger types", a: "Edge, video", b: "Edge, pulse, video, slope, overtime, window, pattern, interval, under-amplitude, serial" },
    { label: "Serial decoding", a: "None (per HANMATEK's FAQ)", b: "UART/RS232, I2C, SPI, CAN, LIN" },
    { label: "Automatic measurements", a: "30", b: "32, with statistics" },
    { label: "Signal generator", a: "None (the DOS1102S has one)", b: "None (despite WAVE GEN labels on the panel)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Input", a: "1 MΩ ‖ 20 pF", b: "1 MΩ ‖ 13 pF" },
    { label: "Power", a: "DC 5 V 2 A adapter", b: "Mains AC, under 30 W" },
    { label: "Size; weight", a: "301 × 152 × 70 mm; about 1.1 kg", b: "318 × 110 × 150 mm; 1.9 kg" },
  ],
  differences: [
    "Memory is the headline gap: 10K points on the DOS1102 against 8 Mpts on one channel (4 Mpts on two) for the DSO2C10, hundreds of times deeper.",
    "With both channels on, the two sample at the same 500 MS/s per channel. With one channel the DSO2C10 doubles to 1 GSa/s; HANMATEK's manual gives 500 MS/s per channel regardless, though its badge says 1 GSa/s.",
    "The DSO2C10 decodes UART/RS232, I2C, SPI, CAN and LIN and triggers on them; HANMATEK lists no decoding and only edge and video triggers.",
    "On the analog side the DOS1102 has a slight edge on paper: 110 MHz and 3 ns or less rise time against 100 MHz and 3.5 ns.",
    "The DOS1102 is lighter (about 1.1 kg against 1.9 kg) and runs from a 5 V 2 A adapter; the DSO2C10 runs on mains.",
    "Neither has a signal generator, and neither carries our Hands-on Tested badge. The DSO2C10 is rated 4.3 in our roundup, the DOS1102 4.1.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The first two charts are close calls. The third is not: on a log scale, the record-length bars are three
          orders of magnitude apart, and that one number drives most of the practical differences below.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (−3 dB). A 10% gap that few beginner jobs will notice.</>}>
            <BarChart
              items={[
                { label: "HANMATEK DOS1102", value: 110, display: "110 MHz", highlight: true },
                { label: "Hantek DSO2C10", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate per channel. With both channels running, they are equal.</>}>
            <BarChart
              items={[
                { label: "DOS1102, any channel", value: 500, display: "500 MS/s" },
                { label: "DSO2C10, 1 channel", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "DSO2C10, 2 channels", value: 500, display: "500 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum record length, log scale. The DSO2C10 holds 400 times more points even with both channels on.</>}>
            <BarChart
              log
              items={[
                { label: "DOS1102", value: 10_000, display: "10K" },
                { label: "DSO2C10, 2 channels", value: 4_000_000, display: "4 Mpts" },
                { label: "DSO2C10, 1 channel", value: 8_000_000, display: "8 Mpts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Longest window captured at 500 MS/s per channel (record length divided by sample rate).</>}>
            <DataTable
              head={["Setup", "Window at full rate"]}
              rows={[
                ["DOS1102, 10K at 500 MS/s", "20 µs"],
                ["DSO2C10, 4 Mpts at 500 MSa/s", "8 ms"],
                ["DSO2C10, 8 Mpts at 1 GSa/s (1 ch)", "8 ms"],
              ]}
            />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          A note on the DOS1102&apos;s sample rate: the Amazon title says 500 MS/s ×2, the front badge and HANMATEK&apos;s
          shop page say 1 GSa/s, and the manual explains that each channel samples at 500 MS/s, adding up to 1 GS/s
          with both on. We use the manual&apos;s per-channel figure. HANMATEK doesn&apos;t publish the DOS1102&apos;s
          converter resolution.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Student learning to read waveforms", "HANMATEK DOS1102", "Edge trigger, 30 measurements and FFT cover the basics"],
            ["Arduino or ESP32 project talking I2C or SPI", "Hantek DSO2C10", "Decodes the bytes instead of leaving you to count bits"],
            ["Car or robot CAN bus", "Hantek DSO2C10", "CAN trigger and decode are listed; the DOS1102 has neither"],
            ["Audio amplifier and filter work", "HANMATEK DOS1102", "Repetitive signals don't need deep memory"],
            ["Catching a one-off glitch or a supply power-up", "Hantek DSO2C10", "8 Mpts keeps the sample rate high over a long window"],
            ["Small desk or a scope that travels", "HANMATEK DOS1102", "About 1.1 kg on a 5 V 2 A adapter"],
            ["Composite video signal checks", "Either", "Both list a video trigger"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What 10K points can and can&apos;t do</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth sets which frequencies you can see; with the usual 3–5x rule, both scopes handle signals up to
          roughly 20–35 MHz with their shape intact, which covers almost every hobby clock and bus. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth guide
          </Link>{" "}
          explains the rule. Memory sets how long you can look while still sampling fast, and that is where these two
          part ways.
        </p>
        <p className="text-muted leading-7 mb-4">
          Every scope fits a capture into its record: sample rate equals points divided by the time on screen. At
          500 MS/s, the DOS1102&apos;s 10K points last 20 µs. Take a 9600-baud UART message of 20 characters, which
          runs a little over 20 ms. Set the timebase to show it all and the DOS1102 has to drop to roughly 500 kS/s,
          about 50 samples per bit. You will see the bits, but zoom in on one edge and there is nothing left to
          resolve. The DSO2C10 spreads 4 Mpts over the same message at up to roughly 200 MSa/s, so you can capture the whole
          message once and then zoom into any edge, while the decoder prints the characters underneath. For the
          relationship between sample rate and detail, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration: a short spike riding on a supply rail. A deep record catches it at full sample rate
                even on a slow timebase; a short record sampled slowly can step right over it.
              </>
            }
          >
            <ScopeScreen wave="spike" cycles={1} amplitude={2.5} offset={-1} shift={4} labels={{ left: "CH1 rail", right: "illustrative" }} />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Repetitive signals forgive short memory">
              A steady sine, a PWM output or a ripple waveform repeats every cycle, so the scope can simply retrigger
              and redraw. For that kind of work the DOS1102&apos;s 10K record, FFT and math (add, subtract, multiply,
              divide) are enough.
            </KeyIdea>
            <KeyIdea title="Triggers are the other half">
              Deep memory helps you keep an event; the trigger helps you find it. The DSO2C10&apos;s pulse-width,
              under-amplitude and serial triggers stop the display on a specific fault. The DOS1102 can only wait for
              an edge or a video line.
            </KeyIdea>
          </div>
        </div>
        <p className="text-muted leading-7">
          Where the DOS1102 pays you back is simplicity and size. A slim, light scope on a 5 V adapter is easy to
          set up on a crowded bench, and edge triggering plus 30 automatic measurements is a manageable set of tools to learn first. Its 110 MHz front end and 3 ns rise
          time are slightly ahead on paper, though with both channels sampling at 500 MS/s on either scope, you are
          unlikely to see that difference on screen.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Power, grounding and the missing generator</h2>
        <p className="text-muted leading-7 mb-4">
          The DSO2C10 is a conventional mains bench scope. The DOS1102 runs from a DC 5 V 2 A adapter, though HANMATEK doesn&apos;t describe how its probe ground relates to the
          adapter&apos;s earth. Neither scope has a signal generator. The DSO2C10 shares a front panel with the
          DSO2D10, so it still shows WAVE GEN and GEN OUT markings, and its Amazon listing mentions waveform output,
          but Hantek&apos;s spec table lists none. On HANMATEK&apos;s side, a source is only on the separate DOS1102S.
          If you need one, compare the{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>
          .
        </p>
        <Callout title="Probe grounds are not floating">
          Treat both scopes&apos; probe ground clips as connected to each other and, on the mains-powered DSO2C10, to
          mains earth. Don&apos;t assume the adapter-powered DOS1102 is isolated either. Never clip a ground lead onto
          a mains-referenced node such as the primary side of an off-line supply. HANMATEK rates the DOS1102&apos;s inputs at
          400 V (DC plus AC peak-to-peak); for line-voltage work on either scope, use a differential probe.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Related reading</h2>
        <p className="text-muted leading-7">
          Neither model has a standalone review yet; both appear in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . To see the DSO2C10 against a scope with a built-in generator, read{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          . If a bench scope is more than you need, the handheld pair in{" "}
          <Link href="/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" className={link}>
            HANMATEK HO52 vs OWON HDS272S
          </Link>{" "}
          adds a multimeter, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          walks through every spec on this page.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If your projects involve microcontrollers, buses or one-off events, the Hantek DSO2C10 is the better buy: 8 Mpts of memory, serial decoding and a long list of triggers do far more than the DOS1102's extra 10 MHz. Choose the HANMATEK DOS1102 if you want a light, simple two-channel scope for repetitive analog signals and learning the basics, and will not miss decoding or deep memory.",
  faqs: [
    {
      question: "Is 110 MHz on the DOS1102 better than 100 MHz on the DSO2C10?",
      answer:
        "Only slightly, and only on paper. Both clear the 3-5x rule for signals up to roughly 20 MHz, and with two channels on both sample at 500 MS/s per channel. In practice the DSO2C10's 8 Mpts of memory and serial decoding matter far more for most projects than 10 MHz of extra bandwidth.",
    },
    {
      question: "Can the HANMATEK DOS1102 decode I2C or UART?",
      answer:
        "No. HANMATEK's FAQ says the DOS1102 has no serial protocol decoding, and its manual lists only edge and video triggers. You can still view I2C or UART lines and read the bits by hand, but the Hantek DSO2C10 triggers on and decodes UART, I2C, SPI, CAN and LIN directly.",
    },
    {
      question: "Is the DOS1102 sample rate 1 GSa/s or 500 MS/s?",
      answer:
        "Both figures appear. The front badge and HANMATEK's shop page say 1 GSa/s, the Amazon title says 500 MS/s x2, and the manual explains that each channel samples at 500 MS/s, adding to 1 GS/s with both channels enabled. Plan around 500 MS/s per channel.",
    },
    {
      question: "Why does record length matter so much on a bench scope?",
      answer:
        "A scope's sample rate is its record length divided by the time on screen. With 10K points, the DOS1102 can only hold 20 microseconds at full speed, so long captures force a low sample rate. The DSO2C10's 4 to 8 Mpts keep sampling fast across milliseconds, which is what lets you zoom into detail afterwards.",
    },
    {
      question: "Does either scope have a built-in signal generator?",
      answer:
        "No. The generator versions are separate models: the HANMATEK DOS1102S and the Hantek DSO2D10. The DSO2C10's panel still carries WAVE GEN markings, and its Amazon listing mentions waveform output, but Hantek's own specification table shows no generator for this model.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  ],
};

export default function HanmatekDos1102VsHantekDso2c10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
