import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// OWON VDS1022I per https://www.owon.com.hk/products_owon_vds_series_pc_oscilloscope and the VDS datasheet
// http://files.owon.com.cn/specifications/OWON_VDS_Series_PC_Oscilloscope.pdf (checked 2026-10-24): 25 MHz, 2 channels,
// 100 MSa/s, 8-bit, 5K record length, rise time 14 ns, input 1 MOhm +/-2% || 10 pF, 5 mV/div-5 V/div, USB 2.0 with
// isolation, USB bus powered (<= 2.5 W), 170 x 120 x 18 mm, 0.26 kg. Isolation voltage rating not recorded.
// Rigol DS1054Z per the DS1000Z datasheet DSA20100-2020-09: 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch),
// 8-bit, 7-inch 800x480, up to 30,000 wfm/s, 100-240 V AC 50 W max; memory 24 Mpts per the datasheet, 12M standard /
// 24M optional per Rigol's product page (conflict stated on the page).

const path = "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i";

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs OWON VDS1022I",
  description:
    "Rigol DS1054Z vs OWON VDS1022I for electronics testing: a 4-channel 50MHz bench scope against a 2-channel 25MHz USB scope that runs on your laptop.",
  path: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i",
});

const link = "text-accent hover:underline";

/** Where each scope's probe ground ends up: mains earth through the Rigol's cord, or across OWON's USB isolation barrier. */
function GroundPathDiagram() {
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of probe ground paths. Top: the Rigol DS1054Z's probe ground clip connects through the scope chassis and power cord to mains earth. Bottom: the OWON VDS1022I's probe ground connects to the scope's own circuit, which reaches the laptop through an isolation barrier in its USB link, so the probe ground is not tied to the laptop's ground."
    >
      <text x="6" y="14" fontSize="10" fontWeight="700" className="fill-foreground">Rigol DS1054Z (mains-powered bench scope)</text>
      <rect x="10" y="26" width="70" height="40" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="45" y="50" fontSize="9" textAnchor="middle" className="fill-foreground">Circuit</text>
      <rect x="130" y="22" width="90" height="48" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="175" y="44" fontSize="9" textAnchor="middle" className="fill-foreground">DS1054Z</text>
      <text x="175" y="57" fontSize="8" textAnchor="middle" className="fill-muted">chassis = earth</text>
      <path d="M80 40 H130" className="stroke-foreground" strokeWidth="1.4" fill="none" />
      <text x="105" y="35" fontSize="8" textAnchor="middle" className="fill-muted">tip</text>
      <path d="M80 56 H130" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="105" y="67" fontSize="8" textAnchor="middle" className="fill-accent">ground clip</text>
      <path d="M220 46 H280 V82" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="250" y="40" fontSize="8" textAnchor="middle" className="fill-muted">power cord</text>
      <path d="M268 82 H292 M272 88 H288 M277 94 H283" className="stroke-accent" strokeWidth="1.6" />
      <text x="262" y="92" fontSize="8.5" textAnchor="end" className="fill-accent">mains earth</text>

      <line x1="6" y1="112" x2="334" y2="112" className="stroke-border" strokeWidth="0.8" />

      <text x="6" y="130" fontSize="10" fontWeight="700" className="fill-foreground">OWON VDS1022I (USB PC scope)</text>
      <rect x="10" y="144" width="70" height="40" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="45" y="168" fontSize="9" textAnchor="middle" className="fill-foreground">Circuit</text>
      <rect x="120" y="140" width="80" height="48" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="160" y="162" fontSize="9" textAnchor="middle" className="fill-foreground">VDS1022I</text>
      <text x="160" y="175" fontSize="8" textAnchor="middle" className="fill-muted">front end</text>
      <path d="M80 158 H120" className="stroke-foreground" strokeWidth="1.4" fill="none" />
      <path d="M80 174 H120" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="100" y="196" fontSize="8" textAnchor="middle" className="fill-accent">ground clip</text>
      <line x1="216" y1="134" x2="216" y2="194" className="stroke-accent" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="222" y1="134" x2="222" y2="194" className="stroke-accent" strokeWidth="2" strokeDasharray="4 3" />
      <text x="219" y="208" fontSize="8" textAnchor="middle" className="fill-accent">USB isolation</text>
      <path d="M200 164 H216 M222 164 H252" className="stroke-foreground" strokeWidth="1.4" fill="none" />
      <rect x="252" y="146" width="78" height="36" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="291" y="168" fontSize="9" textAnchor="middle" className="fill-foreground">Laptop</text>
      <text x="291" y="200" fontSize="8" textAnchor="middle" className="fill-muted">may be earthed via charger</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs OWON VDS1022I",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DS1054Z vs OWON VDS1022I is a choice between a bench scope and a laptop scope. The Rigol is a self-contained 4-channel, 50MHz, 1 GSa/s instrument with a 7-inch display. The OWON is a 0.26 kg USB box with two channels, 25MHz and 100 MSa/s, no screen of its own and an isolated USB link: it shows waveforms through OWON's PC software.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z 4-channel digital bench oscilloscope",
    chooseIf: [
      "You want a standalone instrument with its own screen and knobs, no computer needed",
      "You need three or four channels for bus and timing work",
      "Your signals run into the 5–10MHz range, past the OWON's comfortable limit",
      "You'd rather buy the hands-on tested pick in this pairing",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "OWON VDS1022I")!,
    imageAlt: "OWON VDS1022I two-channel USB PC oscilloscope",
    chooseIf: [
      "You already work at a laptop and want a scope that fits in a laptop bag",
      "You want two channels with USB power and an isolated USB connection to your computer",
      "Your signals are audio, sensors, PWM and slower digital, comfortably below about 5MHz",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "Built-in 7-inch", b: "None: uses your computer's screen via OWON's PC software" },
    { label: "Form factor", a: "Benchtop", b: "USB PC oscilloscope, 0.26 kg" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 10–17MHz", b: "Up to roughly 5–8MHz" },
    { label: "Sample rate by channels on", a: "1 GSa/s (1 ch), 500 MSa/s (2 ch), 250 MSa/s (3–4 ch)", b: "100 MSa/s (2-channel split not stated)" },
    { label: "Record length", a: "24 Mpts (datasheet); 12M standard, 24M optional (product page)", b: "5K points" },
    { label: "Vertical resolution", a: "8-bit (12-bit high-res mode)", b: "8-bit" },
    { label: "Waveform update rate", a: "Up to 30,000 wfm/s", b: "Not stated" },
    { label: "Rise time", a: "≈7 ns (0.35 ÷ 50MHz estimate)", b: "14 ns (OWON figure)" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "USB bus power, 2.5 W max" },
    { label: "Computer link", a: "USB host/device and LAN (not needed to operate)", b: "Isolated USB 2.0 (required)" },
  ],
  differences: [
    "Form factor: the Rigol is a complete benchtop instrument with a 7-inch display; the VDS1022I has no screen and needs a computer running OWON's software.",
    "Bandwidth: 50MHz against 25MHz. By the 3–5× rule the Rigol is comfortable to roughly 10–17MHz, the OWON to roughly 5–8MHz.",
    "Sample rate: 1 GSa/s on one Rigol channel (250 MSa/s per channel with three or four on) against 100 MSa/s on the OWON.",
    "Channels: 4 against 2.",
    "The OWON is USB-powered and its USB link to the computer is isolated; OWON lists edge, pulse, video, slope and alternate triggers, math and FFT, and a 5K-point record.",
    "The Rigol carries our Hands-on Tested badge; the OWON assessment is desk research based on OWON's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The Rigol leads on every headline number, by a factor of two on bandwidth and channels and ten on
          sample rate. One caution on sources: the Amazon listing for the VDS1022I quotes figures for OWON&apos;s
          whole VDS series, which don&apos;t apply to this model. The numbers below are the ones OWON publishes for
          the VDS1022I itself: 25MHz, 100 MSa/s and 5K points.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point): the Rigol&apos;s is twice the OWON&apos;s.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 50, display: "50MHz", highlight: true },
                { label: "OWON VDS1022I", value: 25, display: "25MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale. Even with three or four channels on, the Rigol samples 2.5 times faster than the OWON.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1054Z (1 ch)", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "Rigol DS1054Z (3–4 ch)", value: 250_000_000, display: "250 MSa/s" },
                { label: "OWON VDS1022I", value: 100_000_000, display: "100 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels: four on the Rigol, two on the OWON.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4 channels", highlight: true },
                { label: "OWON VDS1022I", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle of a sine wave at each scope&apos;s bandwidth limit (sample rate ÷ bandwidth). Two is the Nyquist minimum.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z (1 ch)", value: 20, display: "20", highlight: true },
                { label: "Rigol DS1054Z (3–4 ch)", value: 5, display: "5" },
                { label: "OWON VDS1022I", value: 4, display: "4" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Four samples per cycle at 25MHz is above the Nyquist minimum, but a waveform near the OWON&apos;s limit
          is drawn from very few points, so its shape relies heavily on the software&apos;s interpolation. OWON
          doesn&apos;t state in the specs we verified whether the 100 MSa/s rate is shared when both channels run.
          For more on these figures, see{" "}
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
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1054Z vs OWON VDS1022I for electronics testing</h2>
        <p className="text-muted leading-7 mb-4">
          For electronics testing the real question isn&apos;t only bandwidth, it&apos;s how you work. A bench
          scope sits beside the circuit with its own screen and controls: you turn a knob and the trace moves,
          with nothing else to boot or connect. A PC scope like the VDS1022I turns your laptop into the display
          and control panel. That makes it small enough to carry to a project, and a laptop screen is usually
          larger than a 7-inch panel, but every session starts with plugging in, opening OWON&apos;s software and
          working through a mouse rather than dedicated knobs.
        </p>
        <h3 className="text-lg font-semibold mb-2">What the OWON VDS1022I handles</h3>
        <p className="text-muted leading-7 mb-4">
          With 25MHz the VDS1022I is comfortable to roughly 5–8MHz. That covers audio circuits, sensor outputs,
          PWM for motors and LEDs, UART at common baud rates and 100kHz or 400kHz I2C. Its two channels let you
          compare an amplifier&apos;s input with its output, or watch clock and data on an I2C bus. OWON lists
          edge, pulse, video, slope and alternate triggers plus math and FFT, so a pulse trigger is available for
          catching a short glitch. The limits are the 5K-point record, which at 100 MSa/s fills in 50 µs, and the
          fact that it can&apos;t be used without a computer.
        </p>
        <h3 className="text-lg font-semibold mb-2">What the Rigol DS1054Z adds</h3>
        <p className="text-muted leading-7 mb-4">
          At 50MHz the DS1054Z stays comfortable to roughly 10–17MHz, so faster SPI clocks, sharper logic edges
          and many switching regulators look closer to their real shape. Four channels mean you can watch chip
          select, clock, data and an output in one capture. And because it is self-contained, it is always ready
          on the bench. Its review notes that menus take some learning and that 50MHz is modest for RF; at that
          point both scopes are out of their depth.
        </p>
        <div className="mt-4">
          <KeyIdea title="Rise time sets the fastest edge you can trust">
            A common approximation puts a scope&apos;s own fastest displayable rise time at about 0.35 divided by
            its bandwidth: roughly 7 ns for the 50MHz Rigol and 14 ns for the 25MHz OWON, which matches the 14 ns
            OWON lists for the VDS1022I. If the edge you are measuring isn&apos;t several times slower than that
            figure, the screen shows the scope&apos;s rise time, not your circuit&apos;s. The twofold gap holds.
          </KeyIdea>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Record length: 50 µs against 24 ms</h3>
        <p className="text-muted leading-7 mb-4">
          Memory decides how much time one capture holds at full speed. The VDS1022I&apos;s 5K points at 100 MSa/s cover
          5,000 ÷ 100,000,000 = 50 µs. That is enough for a few cycles of a 100kHz signal, but a single 115,200-baud UART
          byte lasts about 87 µs (10 bits × 8.7 µs), so catching a whole byte means slowing the timebase and the sample
          rate with it. Rigol&apos;s datasheet gives the DS1054Z 24 Mpts, which at 1 GSa/s spans 24 ms; its product page
          lists 12M as standard, which halves that. Either figure holds an entire burst of serial traffic at a rate that
          still resolves every edge.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Where the probe ground goes</h3>
        <p className="text-muted leading-7 mb-4">
          The two designs also differ in a way the spec sheet barely mentions: what the probe&apos;s ground clip is
          connected to. On the Rigol it is the scope chassis, and through the power cord, mains earth. On the OWON it
          is the scope&apos;s own front end, which talks to your laptop across an isolation barrier in the USB link.
        </p>
        <Figure
          caption={
            <>
              Probe ground paths. The Rigol&apos;s clip is earthed through its cord; the OWON&apos;s clip stops at an isolated
              USB link, so it isn&apos;t tied to the laptop&apos;s ground.
            </>
          }
        >
          <GroundPathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          In practice the isolation helps most on battery and bench-supply circuits whose ground isn&apos;t at earth
          potential, such as a USB-powered gadget plugged into a different computer: with a non-isolated scope, the
          two grounds meet through the probe and can cause a ground loop or worse. With the Rigol, that same situation
          is handled by making sure the circuit&apos;s ground is the point you clip to, or by floating the circuit from a
          battery.
        </p>
        <div className="mt-4">
          <Callout title="Grounds, isolation and mains">
            On a mains-powered bench scope like the Rigol, the probe ground clip is normally tied to mains earth
            through the power cord, so clipping it to a live or non-earthed point creates a short. A non-isolated
            USB scope ties its probe ground to your computer&apos;s ground instead. The VDS1022I&apos;s isolated
            USB link is meant to break that path, but its isolation voltage rating isn&apos;t in our verified data,
            so don&apos;t treat it as permission to probe mains. Use a differential probe for mains work on either.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["Building a permanent home bench", "Rigol DS1054Z", "Self-contained, with its own 7-inch screen and controls"],
            ["Working from a laptop, or moving between places", "OWON VDS1022I", "0.26 kg, USB-powered, uses the laptop's screen"],
            ["Debugging SPI with chip select, clock, data and output", "Rigol DS1054Z", "Four channels; the OWON has two"],
            ["Checking audio, sensors or PWM", "Either", "Both are well above these frequencies"],
            ["Looking at signals around 5–10MHz", "Rigol DS1054Z", "Past the OWON's comfortable range of roughly 5–8MHz"],
            ["Catching a short glitch", "Either, with care", "The OWON lists a pulse trigger; check the Rigol's trigger list for your case"],
            ["Wanting the pick with the most learning resources", "Rigol DS1054Z", "Strong community support and documentation"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If a laptop scope appeals, the{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" className={link}>
            PicoScope 2204A vs Digilent Analog Discovery 3
          </Link>{" "}
          comparison covers two more USB instruments. For other bench scopes against the Rigol, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" className={link}>
            Rigol DS1054Z vs OWON SDS1102
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>
          , or read the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a home bench and general electronics testing, the Rigol DS1054Z is the stronger tool: twice the bandwidth, four channels instead of two, a much higher sample rate and its own screen, so it is ready the moment you switch it on. The OWON VDS1022I suits people who already work at a laptop and want a light, USB-powered two-channel scope with an isolated USB link for signals below about 5MHz.",
  faqs: [
    {
      question: "Does the OWON VDS1022I have a screen?",
      answer:
        "No. It is a PC oscilloscope: the box holds the two input channels and connects to your computer over isolated USB 2.0, and you view and control the waveforms in OWON's PC software. Without a computer it can't be used, which is the main practical difference from the Rigol DS1054Z.",
    },
    {
      question: "Why do the VDS1022I's specs on Amazon look different?",
      answer:
        "The Amazon listing's bullets quote figures for OWON's whole VDS series, and they don't all apply to this model. OWON's own product page and datasheet list 25MHz, 100 MSa/s and 5K points for the VDS1022I, which are the figures we use on this page.",
    },
    {
      question: "Is the OWON VDS1022I enough for Arduino projects?",
      answer:
        "For many of them, yes. At 25MHz it is comfortable to roughly 5–8MHz, which covers PWM, UART and standard I2C, and two channels let you watch clock and data together. Faster SPI clocks and sharp edges are better served by the 50MHz Rigol DS1054Z, which also adds two more channels.",
    },
    {
      question: "What does isolated USB mean on the VDS1022I?",
      answer:
        "It means the USB connection to your computer is electrically isolated, so the scope's probe ground isn't tied directly to the computer's ground. That reduces ground-loop and shorting risk on bench circuits. OWON's isolation voltage rating isn't in our verified data, so it isn't a substitute for a differential probe on mains.",
    },
    {
      question: "Which is better for a beginner, the Rigol DS1054Z or the OWON VDS1022I?",
      answer:
        "A beginner with a desk to dedicate to electronics will get more from the Rigol DS1054Z: a real front panel to learn on, four channels and 50MHz. The VDS1022I is the better fit if you don't have bench space, always work at a laptop, or want a light second scope to carry between places.",
    },
    {
      question: "How much does the OWON VDS1022I record in one capture?",
      answer:
        "OWON lists a 5K-point record length. At the full 100 MSa/s that is 50 µs of signal, a few cycles of a 100kHz waveform. Slower timebases stretch the window by lowering the sample rate. The Rigol DS1054Z's 24 Mpts per its datasheet, or 12M standard per its product page, holds milliseconds at full speed.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
  ],
};

export default function RigolDs1054zVsOwonVds1022iPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
