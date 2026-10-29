import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// OWON VDS1022I extra facts (5 mV/div–5 V/div, 1 MΩ || 10 pF input, 14 ns rise time, 170 × 120 × 18 mm, 2+1 multi-function
// trigger/pass-fail port, math + − × ÷ invert FFT; operating systems not named) per
// https://www.owon.com.hk/products_owon_vds_series_pc_oscilloscope and OWON's VDS series datasheet (checked 2026-10-24).
// Hantek 6022BE extra facts (1 MΩ / 25 pF input, DC coupling, 20 mV–5 V/div, ±3% DC accuracy, edge trigger rising/falling on
// CH1/CH2 with Auto/Normal/Single modes, X-Y, FFT and + − × ÷ math, cursors, 205 × 120 × 35 mm, Windows 10/8/7/Vista/XP;
// memory figure not clearly assigned to this model, weight not stated) per https://hantek.com/products/detail/31 (checked 2026-10-24).

const path = "/oscilloscopes/owon-vds1022i-vs-hantek-6022be";

const owon = picks.find((p) => p.name === "OWON VDS1022I")!;
const hantek = picks.find((p) => p.name === "Hantek 6022BE")!;

export const metadata = buildMetadata({
  title: "OWON VDS1022I vs Hantek 6022BE: USB Scopes",
  description:
    "OWON VDS1022I vs Hantek 6022BE: two budget USB oscilloscopes compared on bandwidth, sample rate, triggers, isolation and small-signal sensitivity.",
  path: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be",
  image: owon.image,
});

const link = "text-accent hover:underline";

/**
 * Ground path from the probe's ground clip to mains earth. Without USB isolation the clip is tied through the
 * USB shield to the computer and, via an earthed charger or desktop PSU, to earth. An isolation barrier breaks it.
 */
function GroundPathDiagram() {
  const box = "fill-surface stroke-border";
  const rows = [
    { y: 18, title: "Hantek 6022BE: no isolation listed", isolated: false },
    { y: 102, title: "OWON VDS1022I: isolated USB 2.0 link", isolated: true },
  ];
  return (
    <svg
      viewBox="0 0 340 186"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: on the Hantek 6022BE the probe ground clip connects through the scope and USB cable to the computer and on to mains earth; on the OWON VDS1022I an isolation barrier inside the scope breaks that path"
    >
      {rows.map((r) => (
        <g key={r.title}>
          <text x="6" y={r.y} fontSize="10" fontWeight="600" className={r.isolated ? "fill-accent" : "fill-foreground"}>
            {r.title}
          </text>
          <rect x="6" y={r.y + 12} width="62" height="34" rx="6" className={box} strokeWidth="1.2" />
          <text x="37" y={r.y + 27} fontSize="9" textAnchor="middle" className="fill-foreground">Probe</text>
          <text x="37" y={r.y + 39} fontSize="8.5" textAnchor="middle" className="fill-muted">ground clip</text>
          <rect x="92" y={r.y + 12} width="70" height="34" rx="6" className={box} strokeWidth="1.2" />
          <text x="127" y={r.y + 33} fontSize="9" textAnchor="middle" className="fill-foreground">USB scope</text>
          <rect x="186" y={r.y + 12} width="66" height="34" rx="6" className={box} strokeWidth="1.2" />
          <text x="219" y={r.y + 27} fontSize="9" textAnchor="middle" className="fill-foreground">Laptop / PC</text>
          <text x="219" y={r.y + 39} fontSize="8.5" textAnchor="middle" className="fill-muted">USB shield</text>
          <rect x="274" y={r.y + 12} width="60" height="34" rx="6" className={box} strokeWidth="1.2" />
          <text x="304" y={r.y + 27} fontSize="9" textAnchor="middle" className="fill-foreground">Mains earth</text>
          <text x="304" y={r.y + 39} fontSize="8.5" textAnchor="middle" className="fill-muted">via PSU</text>
          <line x1="68" x2="92" y1={r.y + 29} y2={r.y + 29} className="stroke-foreground" strokeWidth="2" />
          {r.isolated ? (
            <>
              <line x1="162" x2="171" y1={r.y + 29} y2={r.y + 29} className="stroke-foreground" strokeWidth="2" />
              <line x1="175" x2="175" y1={r.y + 16} y2={r.y + 42} className="stroke-accent" strokeWidth="2.5" />
              <line x1="180" x2="180" y1={r.y + 16} y2={r.y + 42} className="stroke-accent" strokeWidth="2.5" />
              <line x1="184" x2="186" y1={r.y + 29} y2={r.y + 29} className="stroke-foreground" strokeWidth="2" />
              <text x="177" y={r.y + 58} fontSize="8.5" textAnchor="middle" className="fill-accent">isolation barrier: path broken</text>
            </>
          ) : (
            <>
              <line x1="162" x2="186" y1={r.y + 29} y2={r.y + 29} className="stroke-foreground" strokeWidth="2" />
              <text x="170" y={r.y + 58} fontSize="8.5" textAnchor="middle" className="fill-muted">continuous ground path to earth</text>
            </>
          )}
          <line x1="252" x2="274" y1={r.y + 29} y2={r.y + 29} className="stroke-foreground" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "OWON VDS1022I vs Hantek 6022BE",
  path,
  published: "2026-10-24",
  intro:
    "OWON VDS1022I vs Hantek 6022BE is the cheapest end of the PC oscilloscope market: two screenless USB boxes, each with two 8-bit channels and no power supply beyond the USB cable. The OWON offers 25 MHz, 100 MSa/s, five trigger types and an isolated USB link. The Hantek is the lower-cost option at 20 MHz and 48 MS/s, with an edge trigger, DC coupling only and Windows software.",
  a: {
    pick: owon,
    imageAlt: "OWON VDS1022I two-channel USB PC oscilloscope with probes",
    chooseIf: [
      "You want pulse, slope, video or alternate triggering, not just a rising or falling edge",
      "You measure small signals: its most sensitive range is 5 mV/div against the Hantek's 20 mV/div",
      "You want the USB link to your laptop isolated from the probe ground",
      "You want roughly twice the sample rate for cleaner traces near 5 MHz",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek 6022BE USB PC oscilloscope",
    chooseIf: [
      "Spending as little as possible matters more than features",
      "You use a Windows PC and mainly want to learn what a scope shows",
      "Your signals are audio, timers, servo pulses and slow PWM, well under a few MHz",
      "An edge trigger, X-Y mode and FFT cover what you plan to do",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "None: shown in OWON's PC software", b: "None: shown in Hantek's Windows software" },
    { label: "Vertical resolution", a: "8-bit", b: "8-bit" },
    { label: "Vertical range", a: "5 mV/div to 5 V/div", b: "20 mV/div to 5 V/div" },
    { label: "Input impedance", a: "1 MΩ ±2% || 10 pF", b: "1 MΩ || 25 pF" },
    { label: "Trigger types", a: "Edge, pulse, video, slope, alternate", b: "Edge (rising or falling)" },
    { label: "Math", a: "+, −, ×, ÷, invert, FFT", b: "+, −, ×, ÷, FFT" },
    { label: "Record length", a: "5K points", b: "Not clearly stated by Hantek" },
    { label: "USB link", a: "USB 2.0, isolated", b: "USB 2.0 (no isolation listed)" },
    { label: "Software OS", a: "Not stated by OWON", b: "Windows (10, 8, 7, Vista, XP listed)" },
    { label: "Size", a: "170 × 120 × 18 mm", b: "205 × 120 × 35 mm" },
    { label: "Weight", a: "0.26 kg", b: "Not stated by Hantek" },
  ],
  differences: [
    "Sample rate is the biggest gap: OWON lists 100 MSa/s, Hantek 48 MS/s, so the OWON draws about twice as many points across every edge.",
    "Bandwidth is close: 25 MHz on the OWON against 20 MHz on the Hantek, a 25% difference.",
    "Triggering: OWON lists edge, pulse, video, slope and alternate triggers; Hantek lists only a rising or falling edge trigger.",
    "Sensitivity: the OWON's most sensitive range is 5 mV/div, four times finer than the Hantek's 20 mV/div.",
    "Isolation: OWON specifies an isolated USB 2.0 link; Hantek's spec table lists none, so treat the 6022BE's probe ground as your computer's ground.",
    "The Hantek is DC-coupled only and Hantek lists Windows software; OWON doesn't name the operating systems its software supports on the product page.",
    "Memory: OWON states 5K points; Hantek's table doesn't clearly assign a memory figure to the 6022BE, so we don't compare the two on depth.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper these two look almost the same: two channels, 8 bits, USB power, no screen. The numbers that
          separate them are sample rate and sensitivity rather than bandwidth. All figures below come from
          OWON&apos;s VDS series page and datasheet and Hantek&apos;s 6022BE spec table; where a maker publishes
          no figure we leave it out of the charts.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB): 25 MHz against 20 MHz, the smallest gap on the sheet.</>}>
            <BarChart
              items={[
                { label: "OWON VDS1022I", value: 25, display: "25 MHz", highlight: true },
                { label: "Hantek 6022BE", value: 20, display: "20 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate: the OWON samples a little over twice as fast. Neither maker states the rate with both channels running.</>}>
            <BarChart
              items={[
                { label: "OWON VDS1022I", value: 100, display: "100 MSa/s", highlight: true },
                { label: "Hantek 6022BE", value: 48, display: "48 MS/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Points per cycle when a sine sits right at each scope&apos;s bandwidth limit (sample rate ÷ bandwidth). Two is the bare Nyquist minimum.</>}>
            <BarChart
              items={[
                { label: "OWON VDS1022I", value: 4, display: "4 points", highlight: true },
                { label: "Hantek 6022BE", value: 2.4, display: "2.4 points" },
              ]}
            />
          </Figure>
          <Figure caption={<>Most sensitive vertical setting, in mV per division (lower is better for small signals).</>}>
            <BarChart
              items={[
                { label: "OWON VDS1022I", value: 5, display: "5 mV/div", highlight: true },
                { label: "Hantek 6022BE", value: 20, display: "20 mV/div" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The third chart is the one to dwell on. At 48 MS/s, a 20 MHz sine gets only 2.4 samples per cycle on
          the Hantek: enough in theory to tell you a frequency is there, far too few to show its shape without
          heavy interpolation. In practice the 6022BE&apos;s sample rate, not its 20 MHz front end, sets the
          useful ceiling. A common working target is ten or more samples per cycle, which puts that ceiling near
          5 MHz on the Hantek and near 10 MHz on the OWON for sine waves, and lower again for square waves,
          whose edges contain higher harmonics. Background on both figures:{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each USB scope can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          By the usual 3–5× bandwidth rule, a 25 MHz scope shows signals up to about 5–8 MHz with reasonable
          fidelity and a 20 MHz scope up to about 4–7 MHz. Combine that with the sample-rate limit above and the
          realistic territory for both is the low-megahertz range and below. That still covers a lot of hobby
          electronics.
        </p>
        <h3 className="text-lg font-semibold mb-2">Comfortable on both</h3>
        <p className="text-muted leading-7 mb-4">
          Audio amplifiers and filters, 555 timer outputs, hobby servo pulses (1–2 ms wide at 50 Hz), LED and
          motor PWM in the kilohertz range, sensor outputs, and UART at 9600 or 115200 baud all sit far below
          either scope&apos;s limit. With two channels you can put an op-amp&apos;s input and output side by side
          or watch a clock against its data line. Neither maker lists serial decoding, so you read UART or I2C
          bits by eye and with cursors rather than as decoded text.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where the OWON pulls ahead</h3>
        <p className="text-muted leading-7 mb-4">
          Small signals are the clearest case. Ripple of a few tens of millivolts, a microphone preamp output or
          a thermocouple amplifier stage fills only a sliver of the screen at 20 mV/div, while 5 mV/div gives
          four times the vertical detail from the same 8-bit converter. The trigger list matters too: a pulse
          trigger can catch a single pulse narrower than expected, a slope trigger can fire on a slow ramp, and
          a video trigger locks onto composite video lines. On the Hantek, an edge trigger is the only tool, so
          a rare glitch has to be found by watching repeated sweeps.
        </p>
        <h3 className="text-lg font-semibold mb-2">What the Hantek&apos;s DC-only input means</h3>
        <p className="text-muted leading-7 mb-4">
          Hantek lists DC coupling only. AC coupling normally strips a steady DC level so you can zoom in on what
          rides on it, such as ripple on a 12 V rail. On the 6022BE that 12 V stays in the picture, and at
          20 mV/div a 12 V offset is far off screen, so ripple checks on a supply rail need a workaround such as
          an external DC-blocking capacitor in series with the probe tip. For logic levels, PWM and audio
          centred near ground, DC coupling is no handicap.
        </p>
        <div className="mt-4">
          <KeyIdea title="Neither scope is fast enough for the edges of modern logic">
            Using the common 0.35 ÷ bandwidth approximation, a 20 MHz front end has a rise time of about 17.5 ns;
            OWON quotes 14 ns for the VDS1022I. Logic edges from fast microcontroller pins can be quicker than
            either, so both will show those edges slower and rounder than they really are. If you need to judge
            ringing or edge timing on SPI or fast GPIO, a 50 MHz or faster scope is the better tool.
          </KeyIdea>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Where the ground clip really connects</h3>
        <p className="text-muted leading-7 mb-4">
          The isolation line on OWON&apos;s spec sheet is easy to skip, but it changes what the ground clip is tied
          to. On a non-isolated USB scope the clip, the BNC shells, the USB cable shield and the computer&apos;s
          chassis are one conductor. If the circuit under test is also referenced to earth, through a bench supply
          or a mains-powered device, clipping ground to anything other than that circuit&apos;s own 0 V creates a
          short through the scope and the USB cable. A smaller version of the same loop shows up as hum and noise
          on low-level signals, which is where the OWON&apos;s 5 mV/div range and its isolated link work together.
        </p>
        <Figure
          caption={
            <>
              The ground path on each scope. Schematic, not to scale: Hantek lists no isolation, so its clip shares
              the computer&apos;s ground; OWON specifies an isolated USB link but we haven&apos;t verified its voltage
              rating.
            </>
          }
        >
          <GroundPathDiagram />
        </Figure>
        <div className="mt-4">
          <Callout title="USB scopes, grounds and mains">
            A USB scope&apos;s probe ground connects to the computer unless the link is isolated. Hantek lists no
            isolation for the 6022BE, so its ground clip should be treated as your laptop&apos;s ground, and on a
            desktop PC that is usually mains earth. OWON specifies an isolated USB link on the VDS1022I, which
            helps with ground loops, but its isolation voltage rating isn&apos;t in the data we verified. Don&apos;t
            clip either ground lead to mains or other high-voltage circuits; use a rated differential probe.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["A student who wants to see a waveform for the first time", "Hantek 6022BE", "Lowest cost; two channels and FFT are enough to learn on"],
            ["Debugging intermittent pulses", "OWON VDS1022I", "Pulse and slope triggers; the Hantek has edge only"],
            ["Looking at small audio or sensor signals", "OWON VDS1022I", "5 mV/div against 20 mV/div"],
            ["Checking signals around 3–5 MHz", "OWON VDS1022I", "100 MSa/s keeps more points per cycle than 48 MS/s"],
            ["Probing circuits powered from a laptop or bench supply", "OWON VDS1022I", "Isolated USB link (rating not verified)"],
            ["Using a Mac or Linux laptop", "Neither confirmed", "Hantek lists Windows only; OWON names no OS on its page"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If neither screenless box feels like enough, two directions are covered elsewhere. For a deeper,
          better-supported USB scope, see{" "}
          <Link href="/oscilloscopes/picoscope-2206b-vs-hantek-6022be" className={link}>
            PicoScope 2206B vs Hantek 6022BE
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" className={link}>
            PicoScope 2204A vs Digilent Analog Discovery 3
          </Link>
          . For a bench scope with its own screen, compare{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" className={link}>
            Rigol DS1054Z vs OWON VDS1022I
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" className={link}>
            Rigol DS1054Z vs Hantek 6022BE for beginners
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" className={link}>
            Hantek 6022BE vs Hantek DSO2D10
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          cover the rest of the field.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The OWON VDS1022I is the better instrument: twice the sample rate, a 5 mV/div range for small signals, five trigger types and an isolated USB link, in a smaller box. The Hantek 6022BE earns its place only on price. If you want the cheapest way to learn on a Windows PC with slow signals and an edge trigger is enough, it does that job; for anything you need to trigger on or measure precisely, spend the extra on the OWON.",
  chooseNeitherIf:
    "You need to judge ringing or edge timing on fast SPI or GPIO signals: by the usual rise-time approximation, a 20 MHz front end rounds edges faster than many microcontroller pins actually switch, so both show those edges slower and rounder than they really are — a 50 MHz or faster scope is the better tool for that.",
  faqs: [
    {
      question: "Is the OWON VDS1022I better than the Hantek 6022BE?",
      answer:
        "For most uses, yes. OWON lists 100 MSa/s against Hantek's 48 MS/s, 25 MHz against 20 MHz, pulse, slope, video and alternate triggers on top of edge, a 5 mV/div range and an isolated USB link. The Hantek's one clear advantage is its very low price.",
    },
    {
      question: "Does the Hantek 6022BE work on a Mac?",
      answer:
        "Hantek lists only Windows versions (10, 8, 7, Vista and XP) for the 6022BE software, so plan on a Windows PC. OWON's VDS product page offers PC software for the VDS1022I but doesn't name the operating systems it supports, so check the download page for your system before buying either.",
    },
    {
      question: "Can the Hantek 6022BE measure ripple on a power supply?",
      answer:
        "Not easily. Hantek lists DC coupling only, so a supply's DC level stays on screen along with the ripple, and the most sensitive setting is 20 mV/div. Small ripple on a 5 V or 12 V rail needs an external DC-blocking capacitor in series with the probe. The OWON reaches 5 mV/div, though OWON doesn't state its coupling options on the page we checked.",
    },
    {
      question: "How much memory does the Hantek 6022BE have?",
      answer:
        "Hantek's spec table doesn't clearly assign a memory figure to the 6022BE, so we don't quote one. The OWON VDS1022I's record length is stated: 5K points, which at 100 MSa/s fills in 50 microseconds. Slower timebases spread those points over a longer window at a lower effective sample rate.",
    },
    {
      question: "Which USB scope is safer to use with a laptop?",
      answer:
        "The OWON, because OWON specifies an isolated USB 2.0 link, which keeps the probe ground off the laptop's ground. Hantek lists no isolation for the 6022BE. Neither isolation feature makes a scope suitable for mains: OWON's isolation voltage rating isn't in our verified data, so use a differential probe for high-voltage work.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "All oscilloscope comparisons", href: "/oscilloscopes/comparisons" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
  ],
};

export default function OwonVds1022iVsHantek6022bePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
