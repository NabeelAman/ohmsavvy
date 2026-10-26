import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1054Z extras per the DS1000Z datasheet DSA20100-2020-09
// (https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf):
// 8-bit (12-bit high-res mode), 7-inch 800x480, up to 30,000 wfm/s, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch),
// decode Parallel, RS232/UART, I2C, SPI, USB host/device + LAN, 100-240 V AC 50 W max, no generator, no digital channels.
// Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html says 12M standard / 24M optional memory and
// lists bus triggering/decoding as options; the datasheet lists 24 Mpts and decoding with no option label (via
// research/verified-facts.md, checked 2026-10-24).
// Hantek 6022BE input 1 MOhm / 25 pF, DC coupling only, 20 mV-5 V/div, rising/falling edge trigger (Auto/Normal/Single),
// X-Y mode, FFT and + - x / math, USB 2.0 bus power, 205 x 120 x 35 mm, Windows software (Win10/8/7/NT/XP/Vista listed),
// memory row ambiguous per https://hantek.com/products/detail/31 (research file hantek-6022be.json, checked 2026-10-24).

const path = "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be";

export const metadata = buildMetadata({
  title: "DS1054Z vs Hantek 6022BE for Beginners",
  description:
    "Rigol DS1054Z vs Hantek 6022BE for beginners: a 4-channel 50MHz bench scope with its own screen against a 2-channel 20MHz USB scope for Windows PCs.",
  path: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be",
});

const link = "text-accent hover:underline";

// A 7 MHz sine (the 6022BE's ≈7MHz comfortable limit) over two periods, sampled at each scope's rate.
const SIG_HZ = 7e6;
const SPAN_S = 2 / SIG_HZ;

function SamplePanel({ y0, rate, label, perCycle }: { y0: number; rate: number; label: string; perCycle: string }) {
  const x0 = 12;
  const w = 316;
  const amp = 26;
  const mid = y0 + 44;
  const px = (t: number) => x0 + (t / SPAN_S) * w;
  const py = (t: number) => mid - amp * Math.sin(2 * Math.PI * SIG_HZ * t);
  const curve = Array.from({ length: 121 }, (_, i) => {
    const t = (SPAN_S * i) / 120;
    return `${px(t).toFixed(1)},${py(t).toFixed(1)}`;
  }).join(" ");
  const n = Math.floor(SPAN_S * rate);
  const samples = Array.from({ length: n + 1 }, (_, i) => i / rate);
  const joined = samples.map((t) => `${px(t).toFixed(1)},${py(t).toFixed(1)}`).join(" ");
  return (
    <g>
      <text x={x0} y={y0 + 10} fontSize="9.5" fontWeight="700" className="fill-foreground">
        {label}
      </text>
      <text x={x0 + w} y={y0 + 10} fontSize="9" textAnchor="end" className="fill-accent">
        {perCycle}
      </text>
      <line x1={x0} x2={x0 + w} y1={mid} y2={mid} className="stroke-border" strokeWidth="0.6" />
      <polyline points={curve} className="stroke-muted" strokeWidth="1" strokeDasharray="3 2" fill="none" />
      <polyline points={joined} className="stroke-accent" strokeWidth="1.4" fill="none" />
      {samples.map((t) => (
        <circle key={t} cx={px(t)} cy={py(t)} r="2" className="fill-accent" />
      ))}
    </g>
  );
}

/** Same 7 MHz sine, sampled at 48 MS/s (Hantek maximum) and 250 MSa/s (Rigol with all four channels on). */
function SamplingDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: two cycles of a 7 MHz sine wave. Sampled at the Hantek 6022BE's 48 MS/s, only about 7 points land on each cycle and joining them gives a jagged outline. Sampled at the Rigol DS1054Z's 250 MSa/s with four channels on, about 36 points per cycle trace the sine closely."
    >
      <SamplePanel y0={2} rate={48e6} label="Hantek 6022BE, 48 MS/s" perCycle="≈6.9 samples per cycle" />
      <SamplePanel y0={102} rate={250e6} label="Rigol DS1054Z, 250 MSa/s (4 ch on)" perCycle="≈36 samples per cycle" />
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Hantek 6022BE for Beginners",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DS1054Z vs Hantek 6022BE is the classic first-scope dilemma: spend more on a real bench instrument, or start with a cheap USB box. The Rigol has four channels, 50MHz, 1 GSa/s and a 7-inch screen, and carries our Hands-on Tested badge. The Hantek is a two-channel, 20MHz, 48 MS/s PC oscilloscope with no screen, powered by USB and run from Hantek's Windows software.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel digital bench oscilloscope",
    chooseIf: [
      "You are setting up a permanent electronics bench and want a scope that switches on and works",
      "You expect to move past Arduino basics into SPI, motor drivers or switching regulators",
      "You want four channels so a whole bus fits in one capture",
      "You want the pick in this pairing that carries our Hands-on Tested badge",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek 6022BE")!,
    imageAlt: "Hantek 6022BE two-channel USB oscilloscope for Windows PCs",
    chooseIf: [
      "You want to find out whether you enjoy scope work before spending bench-scope money",
      "You already have a Windows laptop and no spare desk space",
      "Your projects are audio, hobby PWM, servo pulses and slow serial links",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "Built-in 7-inch, 800 × 480", b: "None: uses Hantek's Windows software" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "USB 2.0 bus power" },
    { label: "Sample rate, 2 channels on", a: "500 MSa/s", b: "Not stated by Hantek" },
    { label: "ADC resolution", a: "8-bit (12-bit high-resolution mode)", b: "8-bit" },
    { label: "Memory depth", a: "Rigol conflicts: 12M standard / 24M optional (product page), 24 Mpts (datasheet)", b: "1M buffer listed, not clearly assigned to this model" },
    { label: "Serial decoding", a: "Parallel, UART/RS232, I2C, SPI (option per product page; no option label in datasheet)", b: "Not stated by Hantek" },
    { label: "Signal generator", a: "None", b: "None" },
    { label: "Computer connection", a: "USB host/device and LAN", b: "USB 2.0 (required to operate)" },
  ],
  differences: [
    "The DS1054Z is a standalone instrument with a 7-inch screen and front-panel controls; the 6022BE has neither and only works while connected to a Windows PC running Hantek's software.",
    "Channels: four on the Rigol against two on the Hantek, so a chip select, clock and two data lines fit on one Rigol screen.",
    "Bandwidth is 50MHz against 20MHz, and the Rigol samples at 1 GSa/s on one channel (250 MSa/s with all four on) against the Hantek's 48 MS/s maximum.",
    "Rigol's datasheet lists UART, I2C, SPI and parallel decoding (its product page calls bus decoding an option); Hantek doesn't state any decoding for the 6022BE.",
    "The Hantek runs from USB bus power and fits in a drawer at 205 × 120 × 35 mm; the Rigol is a mains-powered benchtop unit drawing up to 50 W.",
    "Neither has a built-in signal generator, so you'll need your circuit, a microcontroller or a separate generator as the signal source.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On every headline figure the Rigol leads: 2.5 times the bandwidth, twice the channels, and a sample rate
          that stays well ahead even when all four of its channels share it. Hantek publishes only a single
          maximum sample rate for the 6022BE, so the chart below can&apos;t show what it drops to with both
          channels active.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: 50MHz on the Rigol against 20MHz on the Hantek.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 50, display: "50MHz", highlight: true },
                { label: "Hantek 6022BE", value: 20, display: "20MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate by number of channels in use, log scale. The Rigol with four channels on still samples over five times faster than the 6022BE&apos;s best case.</>}>
            <BarChart
              log
              items={[
                { label: "DS1054Z, 1 channel", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "DS1054Z, 2 channels", value: 500_000_000, display: "500 MSa/s" },
                { label: "DS1054Z, 3–4 channels", value: 250_000_000, display: "250 MSa/s" },
                { label: "6022BE, maximum", value: 48_000_000, display: "48 MS/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels you can view at the same moment.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4", highlight: true },
                { label: "Hantek 6022BE", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Upper end of the comfortable signal range by the 3–5x rule (bandwidth ÷ 3). Treat it as a guide, not a hard limit.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 17, display: "≈17MHz", highlight: true },
                { label: "Hantek 6022BE", value: 7, display: "≈7MHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The 6022BE&apos;s real ceiling is lower than its bandwidth suggests: at 48 MS/s a 7MHz signal gets fewer
          than seven samples per cycle, so its shape is mostly guesswork by the software. Our explainers on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            sample rate in GSa/s
          </Link>{" "}
          walk through why both numbers matter.
        </p>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Two cycles of a 7 MHz sine (dashed) and the points each scope actually captures. The solid line joins the
                samples; real scope software interpolates more smoothly, but it can only work with the points it has.
              </>
            }
          >
            <SamplingDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The arithmetic behind the diagram: one cycle of 7 MHz lasts about 143 ns. At 48 MS/s the Hantek takes a sample
          every 20.8 ns, so roughly 6.9 samples fall on each cycle, and they land at different points of the wave on each
          cycle. At 250 MSa/s the Rigol samples every 4 ns, about 36 times per cycle, and that is its worst case with all
          four channels running. Sine interpolation can rebuild a clean sine from a handful of points, but a square wave
          or a ringing edge has detail between those points that no software can recover.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1054Z vs Hantek 6022BE for beginners</h2>
        <p className="text-muted leading-7 mb-4">
          A beginner&apos;s first months with a scope are about a few core skills: setting volts per division and
          time per division, getting a stable trigger, and reading frequency, period and amplitude off the screen.
          Both of these scopes can teach that. The difference is how it feels. On the DS1054Z every one of those
          settings has a physical control, so turning the timebase knob and watching the trace stretch builds an
          intuition that carries over to most bench scopes in college labs and workplaces. On the 6022BE
          the same settings live in drop-down menus in Hantek&apos;s software, which works but puts a mouse between
          you and the signal.
        </p>
        <p className="text-muted leading-7 mb-4">
          Money is the case for the Hantek. It is a very low-cost scope, and since it borrows
          your laptop&apos;s screen and USB power there is nothing else to buy. If you are not yet sure electronics
          will stick as a hobby, that is a reasonable way to find out. The catch is that beginners tend to outgrow
          it quickly: the first time you want to watch SPI chip select, clock and data together, or look at the
          switching edge of a buck converter, two channels and 48 MS/s run out.
        </p>
        <p className="text-muted leading-7 mb-4">
          The DS1054Z costs more but is the pick beginners are least likely to replace. Its four channels, 50MHz
          and 7-inch screen cover nearly everything in a hobby workshop short of RF, and it has strong community
          support and documentation. Our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            DS1054Z review
          </Link>{" "}
          notes the menus take some learning; that is the price of its feature set, and a learning curve you only
          climb once.
        </p>
        <KeyIdea title="Check your computer before buying the 6022BE">
          Hantek&apos;s product page lists its software for Windows (versions up to Windows 10) and nothing else,
          so Mac, Linux and Chromebook users should look elsewhere. The scope also depends on the laptop staying
          connected: close the lid or unplug the cable and the instrument is gone. The DS1054Z needs no computer at
          all, though its USB and LAN ports let you save captures to one.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each scope can measure in a beginner&apos;s projects</h2>
        <DataTable
          head={["Beginner task", "Hantek 6022BE", "Rigol DS1054Z"]}
          rows={[
            ["Arduino PWM on an LED or motor pin (around 490 Hz to 1 kHz)", "Yes, with room to spare", "Yes"],
            ["Servo control pulses (50 Hz, 1–2 ms wide)", "Yes", "Yes"],
            ["UART at 115,200 baud", "Yes; read bits by eye", "Yes; decoding listed by Rigol (option status conflicts)"],
            ["I2C at 100 or 400 kHz, clock and data together", "Yes, two channels is exactly enough", "Yes, with two channels spare"],
            ["SPI at several MHz with chip select, clock, MOSI, MISO", "Two lines at a time, coarse edges", "All four lines in one capture"],
            ["Ringing on a fast logic edge", "No: 20MHz and 48 MS/s smear edges faster than about 20 ns", "Edges down to roughly 7 ns (0.35 ÷ 50MHz, an approximation)"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pattern is clear. For signals in the audio and low-kHz range the 6022BE does the job, and
          two channels let you compare an input with an output or a clock with its data. Once signals reach the
          MHz range or you need more than two at once, the Rigol is the one that keeps up. By the 3–5x rule the
          DS1054Z is comfortable to roughly 10–17MHz, which covers most microcontroller buses and many small
          switching regulators. For hands-on practice, try{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            measuring PWM duty cycle
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            setting up a trigger
          </Link>{" "}
          on whichever scope you choose.
        </p>
        <div className="mt-4">
          <Callout title="Keep both scopes off mains wiring">
            The DS1054Z plugs into the mains, and its probe ground clips connect to mains earth through the power
            cord. Clip one onto a live conductor or the primary side of a power supply and you create a short
            through the scope. Hantek doesn&apos;t list USB isolation for the 6022BE, so its probe ground should be
            treated as your laptop&apos;s ground, which may itself be earthed through the charger. Beginners should
            stick to battery, USB and low-voltage bench supply circuits, and use a differential probe if mains ever
            needs measuring.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Pick", "Reason"]}
          rows={[
            ["Student or hobbyist with a dedicated desk", "Rigol DS1054Z", "Self-contained, four channels, physical controls to learn on"],
            ["Curious first-timer on the smallest budget", "Hantek 6022BE", "Very low cost; your Windows laptop does the rest"],
            ["Mac or Chromebook owner", "Rigol DS1054Z", "Hantek lists only Windows software for the 6022BE"],
            ["Learning serial buses beyond basic UART", "Rigol DS1054Z", "Four channels, 50MHz and listed I2C/SPI decoding"],
            ["Needs a scope that packs into a laptop bag", "Hantek 6022BE", "205 × 120 × 35 mm and powered over USB"],
            ["Wants to avoid upgrading within a year", "Rigol DS1054Z", "2.5x the bandwidth, twice the channels"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Other first-scope matchups worth reading: the Rigol against another PC scope in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" className={link}>
            Rigol DS1054Z vs OWON VDS1022I
          </Link>
          , against a pocket scope in{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>
          , and the 6022BE against a bench Hantek in{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" className={link}>
            Hantek 6022BE vs Hantek DSO2D10
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          put both in wider context.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most beginners the Rigol DS1054Z is the better first oscilloscope: four channels, 50MHz, a sample rate many times higher and a screen and knobs of its own, so it grows with you from blinking LEDs to SPI buses. The Hantek 6022BE is a sensible toe in the water only if budget comes first, you work on a Windows laptop and your signals stay in the audio-to-low-MHz range.",
  faqs: [
    {
      question: "Is the Hantek 6022BE good enough for a complete beginner?",
      answer:
        "For learning the basics, yes. It shows two channels at up to 20MHz and lets you practice timebase, volts per division and edge triggering on Arduino PWM, servo pulses and UART. Its limits appear as soon as projects involve MHz signals, more than two lines at once, or small ripple on a DC rail.",
    },
    {
      question: "Does the Rigol DS1054Z need a computer to work?",
      answer:
        "No. It is a complete benchtop instrument with a 7-inch 800 × 480 display and its own controls, powered from the mains. Its USB and LAN ports are there for saving screenshots or remote control, not for basic use. The Hantek 6022BE, by contrast, can't do anything without a Windows PC.",
    },
    {
      question: "Can the Hantek 6022BE run on a Mac?",
      answer:
        "Hantek's product page lists its software for Windows versions only, the newest being Windows 10, so a Mac isn't a supported option. If you don't own a Windows computer, a standalone scope such as the Rigol DS1054Z avoids the problem entirely.",
    },
    {
      question: "Does the DS1054Z decode I2C and SPI as standard?",
      answer:
        "Rigol's own sources disagree. The DS1000Z datasheet lists parallel, UART/RS232, I2C and SPI decoding without marking it optional, while Rigol's product page describes bus triggering and decoding as options. Check the listing or unit you buy. Hantek doesn't state any protocol decoding for the 6022BE.",
    },
    {
      question: "Has OhmSavvy tested either scope?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge. The Hantek 6022BE assessment is desk research based on Hantek's published specifications, so everything said about it on this page comes from those figures rather than our own measurements.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
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

export default function RigolDs1054zVsHantek6022bePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
