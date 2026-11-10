import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS1104X-U per Siglent's SDS1000X-U data sheet, https://siglentna.com/download/19383/, and
// https://siglentna.com/digital-oscilloscopes/sds1000x-u/ (both checked 2026-11-07): 100 MHz, 4 channels, 1 GSa/s /
// 500 MSa/s / 250 MSa/s (1 / 2 / 4 channels), 14 Mpts max (7 Mpts each with two to four channels per
// https://siglentna.com/application-note/differences_xe_vs_xu/), 8-bit, 1 mV/div to 10 V/div, 3.5 ns typical rise,
// 100,000 wfm/s normal and 400,000 sequence, 80,000-frame history, standard IIC/SPI/UART/CAN/LIN decode, 7-inch
// 800 x 480, 100-240 Vrms, 50 W max, 312 x 132.6 x 151 mm, 2.6 kg.
// Rigol DHO804 per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): 70 MHz, 5 ns typical rise, 4 channels, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s,
// 25 / 10 / 5 Mpts, 30,000 wfms/s vector and 1,000,000 UltraAcquire, 500,000-frame recording, 500 uV/div (magnified
// 1 mV/div) to 10 V/div, decode Parallel/RS232-UART/I2C/SPI/CAN, 7-inch 1024 x 600 touchscreen, HDMI 1.4,
// USB-C 15 V 3 A (45 W max), 265.35 x 161.75 x 77.38 mm, 1.78 kg.
// Amazon: SDS1104X-U B08PD3WKCZ and DHO804 B0CGHQHQN7 in stock at ZIP 10001 (checked 2026-11-08).
// DHO804 is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804";
const xu = picks.find((p) => p.name === "Siglent SDS1104X-U")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-U vs Rigol DHO804 for Hobbyists",
  description:
    "Siglent SDS1104X-U vs Rigol DHO804: 100 MHz 8-bit mains scope against a 70 MHz 12-bit USB-C touchscreen. Why the Rigol samples faster with four channels on.",
  path: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804",
  image: dho804.image,
});

const link = "text-accent hover:underline";

/** Job map: signal frequency across, signal size down. Each scope's strong zone shaded. */
function JobMapDiagram() {
  const jobs = [
    { x: 70, y: 150, l: "1 mV supply ripple" },
    { x: 95, y: 115, l: "Audio noise" },
    { x: 170, y: 140, l: "Sensor output" },
    { x: 200, y: 60, l: "I2C / UART" },
    { x: 300, y: 55, l: "20 MHz SPI clock" },
    { x: 330, y: 85, l: "Fast edges" },
  ];
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS1104X-U vs Rigol DHO804 job map: small, slow signals such as millivolt ripple, audio noise and sensor outputs fall in the Rigol DHO804's 12-bit zone; fast, large signals such as a 20 MHz SPI clock and fast edges fall in the Siglent SDS1104X-U's 100 MHz zone; I2C and UART suit either."
    >
      <rect x="40" y="95" width="180" height="85" rx="6" className="fill-accent/15 stroke-accent" strokeWidth="1" />
      <text x="48" y="110" fontSize="8.5" className="fill-accent">DHO804 zone: 12-bit detail</text>
      <rect x="230" y="30" width="150" height="80" rx="6" className="fill-foreground/10 stroke-foreground" strokeWidth="1" />
      <text x="238" y="44" fontSize="8.5" className="fill-foreground">SDS1104X-U zone: 100 MHz</text>
      {jobs.map((j) => (
        <g key={j.l}>
          <circle cx={j.x} cy={j.y} r="3" className="fill-foreground" />
          <text x={j.x + 6} y={j.y + 3} fontSize="8" className="fill-muted">{j.l}</text>
        </g>
      ))}
      <line x1="30" y1="190" x2="385" y2="190" className="stroke-muted" strokeWidth="1" />
      <text x="385" y="204" fontSize="8.5" textAnchor="end" className="fill-muted">faster signals →</text>
      <line x1="30" y1="20" x2="30" y2="190" className="stroke-muted" strokeWidth="1" />
      <text x="34" y="200" fontSize="8.5" className="fill-muted">smaller signals ↓</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-U vs Rigol DHO804: Which Four-Channel Scope?",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS1104X-U vs Rigol DHO804 pits a 100 MHz, 8-bit mains bench scope against a 70 MHz, 12-bit USB-C touchscreen scope, both with four channels. The surprise is in the four-channel numbers: the lower-bandwidth DHO804 samples faster with all four on, 312.5 MSa/s against 250 MSa/s. The Siglent answers with 30 MHz more bandwidth, a faster normal update rate and LIN decoding.",
  a: {
    pick: xu,
    imageAlt: "Siglent SDS1104X-U four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "Your clocks and edges sit between about 15 and 30 MHz",
      "You want 100,000 wfm/s in normal mode for glitch hunting",
      "You work with LIN as well as CAN",
      "You want physical buttons and a fixed mains bench",
    ],
  },
  b: {
    pick: dho804,
    imageAlt: "Rigol DHO804 four-channel 70 MHz 12-bit touchscreen oscilloscope, front panel",
    chooseIf: [
      "You measure ripple, noise, audio and sensor signals",
      "You run all four channels often and want the faster four-channel sample rate",
      "You want a 1.78 kg scope with USB-C power and HDMI",
      "You want the model our owner has tested",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Rise time", a: "3.5 ns typical", b: "5 ns typical" },
    { label: "Sample rate, 1 / 2 / 4 channels", a: "1 GSa/s / 500 MSa/s / 250 MSa/s", b: "1.25 GSa/s / 625 MSa/s / 312.5 MSa/s" },
    { label: "Memory, 1 / 2 / 4 channels", a: "14 / 7 / 7 Mpts", b: "25 / 10 / 5 Mpts" },
    { label: "Most sensitive scale", a: "1 mV/div", b: "500 µV/div (magnified 1 mV/div)" },
    { label: "Waveform rate", a: "100,000 wfm/s; 400,000 sequence", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Standard decode", a: "I2C, SPI, UART, CAN, LIN", b: "Parallel, RS232/UART, I2C, SPI, CAN" },
    { label: "Display", a: "7-inch 800 × 480, buttons", b: "7-inch 1024 × 600 touchscreen, HDMI out" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "USB-C 15 V 3 A, 45 W max" },
    { label: "Size and weight", a: "312 × 151 × 133 mm; 2.6 kg", b: "265 × 162 × 77 mm; 1.78 kg" },
  ],
  differences: [
    "Bandwidth: 100 MHz on the SDS1104X-U against 70 MHz; typical rise times 3.5 ns against 5 ns.",
    "Resolution: 8-bit against 12-bit, 256 levels against 4,096.",
    "Sample rate: the DHO804 leads at every channel count, including 312.5 against 250 MSa/s with all four on.",
    "Memory: the DHO804 holds more with one or two channels on (25 and 10 Mpts against 14 and 7); the X-U holds more with four on (7 against 5 Mpts).",
    "Update rate: 100,000 wfm/s normal on the Siglent against 30,000 in Rigol's vector mode; Rigol's UltraAcquire mode lists 1,000,000.",
    "The DHO804 carries our Hands-on Tested badge; the SDS1104X-U assessment is desk research against Siglent's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth and update rate go to the Siglent. Resolution and sample rate go to the Rigol.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per each maker.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 312.5, display: "312.5 MSa/s", highlight: true },
                { label: "Siglent SDS1104X-U", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels across the screen, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO804", value: 4096, display: "4,096 (12-bit)", highlight: true },
                { label: "Siglent SDS1104X-U", value: 256, display: "256 (8-bit)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without packaging.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 2.6, display: "2.6 kg" },
                { label: "Rigol DHO804", value: 1.78, display: "1.78 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With four channels on, the SDS1104X-U samples a 30 MHz signal about 8 times per cycle and the DHO804 about 10.
          Both are adequate. The Siglent&apos;s extra bandwidth shows on that 30 MHz signal as more of its true amplitude,
          since 30 MHz is under a third of 100 MHz but nearly half of 70 MHz. Pick by the signals you actually measure,
          and use the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          if you aren&apos;t sure yet.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-U vs Rigol DHO804: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Bench supply or USB charger ripple", "Rigol DHO804", "12-bit steps and a 500 µV/div magnified scale"],
            ["STM32 SPI at 20 MHz", "Siglent SDS1104X-U", "100 MHz keeps the clock edges readable"],
            ["Three-phase BLDC motor driver", "Rigol DHO804", "Four channels at 312.5 MSa/s, more detail on current sense"],
            ["Intermittent glitch on a logic line", "Siglent SDS1104X-U", "100,000 wfm/s normal mode"],
            ["Car LIN bus", "Siglent SDS1104X-U", "LIN decode standard"],
            ["Small desk, shared table or field work", "Rigol DHO804", "77 mm deep, 1.78 kg, USB-C power"],
            ["Audio amplifier and headphone signals", "Rigol DHO804", "Finer steps on small signals"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-U: speed headroom on a classic layout</h3>
        <p className="text-muted leading-7 mb-4">
          The X-U is comfortable up to roughly 20 to 33 MHz by the three-to-five-times rule, and its 100,000 wfm/s normal
          update rate makes persistence displays fill quickly when you look for rare events. Siglent includes CAN and LIN
          decode as standard. Its 8-bit converter and 1 mV/div floor make millivolt signals coarse: at 10 mV/div each step
          is about 0.31 mV. Siglent&apos;s application note also confirms it has a single converter for four channels, so
          four channels share 1 GSa/s.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO804: the small-signal four-channel scope</h3>
        <p className="text-muted leading-7 mb-4">
          At 70 MHz the DHO804 is comfortable to about 14 to 23 MHz, which covers most hobby clocks and buses. Below that it
          shows more: 12-bit steps of about 0.02 mV at 10 mV/div, a magnified 500 µV/div scale, and 312.5 MSa/s per channel
          with all four on. Rigol&apos;s 500,000-frame recording helps replay intermittent events, and the 1024 × 600
          touchscreen and HDMI output make it easy to show a waveform to someone else. It runs from a 15 V USB-C supply.
        </p>
        <Figure
          caption={
            <>
              A rough job map: slow, small signals favor the DHO804&apos;s 12 bits; fast signals favor the SDS1104X-U&apos;s
              100 MHz. Placement is illustrative.
            </>
          }
        >
          <JobMapDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Count how often you'll use all four channels">
            If you plan to run four channels most of the time, the DHO804&apos;s 312.5 MSa/s per channel beats the
            Siglent&apos;s 250, and its 12 bits help on every channel. If you mostly use one or two channels on fast
            signals, the Siglent&apos;s bandwidth is the bigger asset.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="USB-C power doesn't mean isolated inputs">
            The DHO804&apos;s probe grounds share the ground of whatever powers it, and Rigol rates its inputs CAT I. The
            SDS1104X-U ties its grounds to mains earth. Neither is safe for direct mains measurement; use a differential
            probe, and get an electrician for anything inside a breaker panel.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DHO804: 70 MHz for the long run</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO804 is the scope our owner tested, and nothing here contradicts the badge; this page uses Rigol&apos;s
          published numbers only. Its long-term risk is bandwidth. 70 MHz covers today&apos;s hobby buses, but if your
          projects move toward faster microcontrollers or high-speed SPI, a 25 MHz clock sits past its comfortable range.
          The same 12-bit platform comes in 100 MHz as the DHO814 if you want both.
        </p>
        <p className="text-muted leading-7">
          See{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho804" className={link}>
            Rigol DHO814 vs DHO804
          </Link>{" "}
          for that step, and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO804 vs SDS1104X-E
          </Link>{" "}
          for the DHO804 against Siglent&apos;s two-converter model. The X-U&apos;s place in Siglent&apos;s range is on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS1104X-U vs SDS1104X-E
          </Link>
          , and the two-channel DHO is on{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-dho802" className={link}>
            Rigol DHO804 vs DHO802
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS1104X-U if your signals run between about 15 and 30 MHz, you hunt glitches with persistence, or you need LIN: it has 100 MHz, 100,000 wfm/s and CAN and LIN decode as standard. Buy the Rigol DHO804 if you measure small signals or run all four channels often: 12-bit resolution, 312.5 MSa/s per channel with four on, a touchscreen and a 1.78 kg USB-C body, and it is the one our owner has tested.",
  chooseNeitherIf:
    "You need a built-in signal generator or logic channels. Neither has them; the Rigol DHO914S adds both on Rigol's 12-bit platform.",
  faqs: [
    {
      question: "Why does the 70 MHz DHO804 sample faster than the 100 MHz SDS1104X-U?",
      answer:
        "Bandwidth and sample rate are separate specs. Rigol lists 1.25 GSa/s for the DHO804, dropping to 312.5 MSa/s with four channels on. Siglent lists 1 GSa/s for the X-U and, in its application note, one converter shared by four channels, which gives 250 MSa/s each. The Siglent's front end passes faster signals; the Rigol samples more often.",
    },
    {
      question: "Is 8-bit a problem on the SDS1104X-U?",
      answer:
        "Not for timing, logic and most general work. It shows on small signals: at 10 mV/div each step is about 0.31 mV, so a 1 mV ripple is drawn in a few levels. If supply ripple, audio noise or sensor outputs are a big part of your work, the DHO804's 12 bits help.",
    },
    {
      question: "Which one decodes more serial buses?",
      answer:
        "They overlap. Siglent lists I2C, SPI, UART, CAN and LIN as standard on the SDS1104X-U. Rigol lists parallel, RS232/UART, I2C, SPI and CAN as standard on the DHO804. Choose the Siglent for LIN and the Rigol for parallel bus decoding.",
    },
    {
      question: "Can the DHO804 run from a power bank?",
      answer:
        "Rigol lists a USB Type-C power input at 15 V and 3 A, 45 W maximum. A USB-C PD power bank that supplies a 15 V profile at 3 A can run it. Many smaller banks top out at 9 V or lower current, so check the output label first. The SDS1104X-U needs 100 to 240 V AC.",
    },
    {
      question: "Which is better for a first oscilloscope?",
      answer:
        "Both suit a first scope. The DHO804's touchscreen, 12-bit traces and small case make it easy to live with, and our owner has tested it. The SDS1104X-U is the better pick if you already know your projects involve clocks above about 15 MHz, or you prefer knobs and buttons.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-U vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-U vs Rigol DS1054Z", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DHO804 vs Rigol DHO802", href: "/oscilloscopes/rigol-dho804-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "SDS1104X-U vs DS1104Z-S Plus", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function SiglentSds1104xUVsRigolDho804Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
