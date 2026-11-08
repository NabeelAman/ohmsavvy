import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Differences per Siglent's application note "Comparison/Differences in SDS1000X-U and SDS1000X-E oscilloscope
// models", https://siglentna.com/application-note/differences_xe_vs_xu/ (checked 2026-11-07): 500 uV/div (X-E) vs
// 1 mV/div (X-U) minimum scale; 2 ADCs vs 1 (500 MSa/s vs 250 MSa/s with four channels on); 2 x 14 Mpt memory modules
// vs 1 (X-E 14 Mpts/ch when one of CH1/CH2 and one of CH3/CH4 are on, 7 Mpts/ch when both of a pair are on; X-U 14 Mpts
// one channel, 7 Mpts with two to four); on-screen Bode plot, external generator control, optional 16-channel MSO and
// web browser control on X-E only; 1 Mpt FFT (X-E) vs 128 kpt (X-U).
// Shared figures per https://siglentna.com/digital-oscilloscopes/sds1000x-u/ and
// https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (checked 2026-11-07):
// 100 MHz, 4 channels, 1 GSa/s, 100,000 wfm/s normal and 400,000 sequence, 80,000-frame history and segments, 7-inch
// 800 x 480, 10 one-button shortcuts, PP510 probes; decode X-U IIC/SPI/UART/CAN/LIN, X-E IIC/SPI/UART/RS232/CAN/LIN.
// SDS1104X-U 3.5 ns typical rise, 8-bit, 100-240 Vrms 50 W max, 2.6 kg per its data sheet
// https://siglentna.com/download/19383/ (checked 2026-11-07). SDS1104X-E 8-bit and 100-240 V AC 50 W max per
// https://siglentna.com/download/22005/ (as cited on /oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e).
// Amazon: SDS1104X-U B08PD3WKCZ and SDS1104X-E B0771N1ZF9 in stock at ZIP 10001 (checked 2026-11-08).
// SDS1104X-E is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e";
const xu = picks.find((p) => p.name === "Siglent SDS1104X-U")!;
const xe = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-U vs SDS1104X-E: What Changed",
  description:
    "Siglent SDS1104X-U vs SDS1104X-E: same 100 MHz four-channel platform, but the X-E has two converters, more memory, Bode plot and a logic option. Is it worth it?",
  path: "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e",
  image: xe.image,
});

const link = "text-accent hover:underline";

/** Converter layout per Siglent's application note: X-E has one ADC and memory module per channel pair; X-U shares one. */
function ConverterDiagram() {
  const chans = ["CH1", "CH2", "CH3", "CH4"];
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS1104X-U vs SDS1104X-E converter diagram: in the SDS1104X-E, CH1 and CH2 share one converter and memory module and CH3 and CH4 share a second, giving 500 MSa/s each with all four on; in the SDS1104X-U all four channels share one converter and one memory module, giving 250 MSa/s each."
    >
      <text x="100" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">SDS1104X-E</text>
      {chans.map((c, i) => (
        <g key={`e${c}`}>
          <text x="20" y={45 + i * 30} fontSize="9" className="fill-foreground">{c}</text>
          <path d={`M48 ${42 + i * 30} H100`} className="stroke-foreground" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="100" y="30" width="70" height="44" rx="5" className="fill-accent/15 stroke-accent" strokeWidth="1.3" />
      <text x="135" y="50" fontSize="8.5" textAnchor="middle" className="fill-foreground">ADC 1</text>
      <text x="135" y="62" fontSize="8" textAnchor="middle" className="fill-muted">14 Mpts</text>
      <rect x="100" y="90" width="70" height="44" rx="5" className="fill-accent/15 stroke-accent" strokeWidth="1.3" />
      <text x="135" y="110" fontSize="8.5" textAnchor="middle" className="fill-foreground">ADC 2</text>
      <text x="135" y="122" fontSize="8" textAnchor="middle" className="fill-muted">14 Mpts</text>
      <text x="100" y="158" fontSize="8.5" textAnchor="middle" className="fill-accent">4 ch on: 500 MSa/s each</text>
      <text x="300" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">SDS1104X-U</text>
      {chans.map((c, i) => (
        <g key={`u${c}`}>
          <text x="220" y={45 + i * 30} fontSize="9" className="fill-foreground">{c}</text>
          <path d={`M248 ${42 + i * 30} H300`} className="stroke-foreground" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="300" y="30" width="70" height="104" rx="5" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="335" y="80" fontSize="8.5" textAnchor="middle" className="fill-foreground">ADC</text>
      <text x="335" y="92" fontSize="8" textAnchor="middle" className="fill-muted">14 Mpts</text>
      <text x="300" y="158" fontSize="8.5" textAnchor="middle" className="fill-muted">4 ch on: 250 MSa/s each</text>
      <text x="200" y="188" fontSize="8.5" textAnchor="middle" className="fill-muted">Per Siglent&apos;s X-E vs X-U application note; simplified block view</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-U vs SDS1104X-E: What the Cheaper Model Drops",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS1104X-U vs SDS1104X-E is the rare comparison the maker has written up itself. Siglent's application note says both four-channel scopes share a similar platform: 100 MHz, 1 GSa/s, 100,000 wfm/s and a 7-inch 800 × 480 screen. The X-U drops the second converter and memory module, which halves its four-channel sample rate, and loses Bode plot, the logic option, web control and the 500 µV/div scale.",
  a: {
    pick: xu,
    imageAlt: "Siglent SDS1104X-U four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You mostly use one or two channels",
      "You won't add logic channels or plot filter responses",
      "Budget matters more than the X-E's extras",
      "You still want standard I2C, SPI, UART, CAN and LIN decode",
    ],
  },
  b: {
    pick: xe,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You run all four channels on fast signals",
      "You want Bode plots with a Siglent generator",
      "You may add the 16-channel logic option later",
      "You want the scope our owner has tested",
    ],
  },
  extraSpecs: [
    { label: "Converters", a: "1 for four channels", b: "2, one per channel pair" },
    { label: "Sample rate, all 4 channels on", a: "250 MSa/s", b: "500 MSa/s" },
    { label: "Memory per channel", a: "14 Mpts (1 ch); 7 Mpts (2–4 ch)", b: "14 Mpts (one per pair); 7 Mpts (both of a pair)" },
    { label: "Most sensitive scale", a: "1 mV/div", b: "500 µV/div" },
    { label: "FFT length", a: "128 kpts", b: "1 Mpt" },
    { label: "Bode plot", a: "None", b: "On screen, controlling a Siglent SDG or SAG generator" },
    { label: "Logic option", a: "None", b: "16-channel MSO option" },
    { label: "Web browser control", a: "None", b: "Yes" },
    { label: "Standard decode", a: "I2C, SPI, UART, CAN, LIN", b: "I2C, SPI, UART, RS232, CAN, LIN" },
    { label: "Shared", a: "100 MHz; 100,000 wfm/s; 7-inch 800 × 480; PP510 probes", b: "100 MHz; 100,000 wfm/s; 7-inch 800 × 480; PP510 probes" },
  ],
  differences: [
    "Converters: two on the X-E, one on the X-U, so with four channels on the X-E samples at 500 MSa/s per channel and the X-U at 250 MSa/s.",
    "Memory: both reach 14 Mpts. The X-E keeps 14 Mpts per channel on two channels if they come from different pairs; the X-U drops to 7 Mpts as soon as a second channel is on.",
    "Sensitivity: 500 µV/div on the X-E against 1 mV/div on the X-U.",
    "Features only on the X-E: on-screen Bode plot, external generator control, an optional 16-channel logic upgrade, web browser control and a 1 Mpt FFT (128 kpts on the X-U).",
    "Shared: 100 MHz, 1 GSa/s maximum, 100,000 wfm/s normal and 400,000 sequence, 80,000-frame history, the display and the probes.",
    "The SDS1104X-E carries our Hands-on Tested badge; the SDS1104X-U assessment is desk research against Siglent's documents.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Every chart here is a number Siglent itself put in its X-E against X-U application note.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 500, display: "500 MSa/s", highlight: true },
                { label: "Siglent SDS1104X-U", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with CH1 and CH3 on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 14, display: "14 Mpts", highlight: true },
                { label: "Siglent SDS1104X-U", value: 7, display: "7 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>FFT length, log scale. More points means finer frequency resolution.</>}>
            <BarChart
              log
              items={[
                { label: "Siglent SDS1104X-E", value: 1000000, display: "1 Mpt", highlight: true },
                { label: "Siglent SDS1104X-U", value: 128000, display: "128 kpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Most sensitive vertical scale. Lower is more sensitive.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-U", value: 1, display: "1 mV/div" },
                { label: "Siglent SDS1104X-E", value: 0.5, display: "500 µV/div", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With one channel on, the two are effectively the same scope: 1 GSa/s and 14 Mpts each. The gap opens with the
          second channel on the X-U and with the third and fourth on both. At 250 MSa/s the X-U gets 2.5 samples per cycle
          at its 100 MHz bandwidth with four channels on; the X-E gets 5.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-U vs SDS1104X-E: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Single-channel debugging and measurement", "Siglent SDS1104X-U", "Identical numbers with one channel on"],
            ["Four-channel SPI or motor phases", "Siglent SDS1104X-E", "500 MSa/s per channel against 250"],
            ["Filter or amplifier frequency response", "Siglent SDS1104X-E", "On-screen Bode plot with a Siglent generator"],
            ["Parallel bus or many GPIO lines", "Siglent SDS1104X-E", "Only it has a 16-channel logic option"],
            ["Remote viewing over the network", "Siglent SDS1104X-E", "Web browser control"],
            ["UART, I2C, CAN, LIN decoding", "Either", "Both decode them as standard"],
            ["Student on a strict budget", "Siglent SDS1104X-U", "Same screen, decode and update rate for less"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-U: the same scope for one channel</h3>
        <p className="text-muted leading-7 mb-4">
          Most of the time on a hobby bench is spent on one or two channels, and with one channel on the X-U matches the
          X-E. It keeps the 100,000 wfm/s update rate, the 80,000-frame history, a 3.5 ns typical rise time and standard
          decode of I2C, SPI, UART, CAN and LIN. What it can&apos;t do is grow: there is no logic option, no Bode plot and
          no web control, and its 128 kpts FFT gives coarser spectra than the X-E&apos;s 1 Mpt.
        </p>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-E: the version with room to expand</h3>
        <p className="text-muted leading-7 mb-4">
          The X-E&apos;s second converter is what keeps 500 MSa/s per channel with four channels on, and its second memory
          module keeps 14 Mpts per channel on two channels from different pairs. Siglent lists an on-screen Bode plot that
          drives an external Siglent SDG or SAG generator, an optional 16-channel logic upgrade and web browser control.
          Its 500 µV/div scale helps a little with small signals, though both are 8-bit scopes.
        </p>
        <Figure
          caption={
            <>
              Simplified block view from Siglent&apos;s application note: the X-E gives each channel pair its own
              converter and memory; the X-U shares one across all four.
            </>
          }
        >
          <ConverterDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Buy the X-U only if you're sure about the extras">
            The X-U saves money by removing things you can&apos;t add later: a converter, a memory module, the logic
            option and Bode plot. If there is a reasonable chance you&apos;ll want a logic analyzer or frequency-response
            plots within a couple of years, the X-E is the cheaper path in the end.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Earthed probes on both">
            Both are mains-powered with probe grounds tied to earth. A ground clip on a live conductor causes a short
            through the scope and the probe. Use a differential probe for mains circuits, and an electrician for building
            wiring.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the SDS1104X-U: the second channel</h2>
        <p className="text-muted leading-7 mb-4">
          The X-U&apos;s quietest limit is memory, not sample rate. As soon as a second channel is on, it drops to 7 Mpts
          per channel, while the X-E keeps 14 Mpts if the two channels sit in different pairs. For input-against-output
          work on long timebases, that halves the X-U&apos;s full-rate record. The X-E is the scope our owner tested; this
          comparison uses Siglent&apos;s published figures only.
        </p>
        <p className="text-muted leading-7">
          Read the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>{" "}
          for the X-E on its own. The X-U against Rigol&apos;s four-channel models is on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z" className={link}>
            Siglent SDS1104X-U vs Rigol DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804" className={link}>
            Siglent SDS1104X-U vs Rigol DHO804
          </Link>
          . The X-E against Siglent&apos;s 12-bit model is on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS814X HD vs SDS1104X-E
          </Link>
          , and against the 200 MHz two-channel X-E on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" className={link}>
            Siglent SDS1104X-E vs SDS1202X-E
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS1104X-E if you will run four channels on fast signals, want Bode plots or may add logic channels: two converters keep 500 MSa/s per channel with four on, and it is the one our owner has tested. Buy the Siglent SDS1104X-U if you mostly use one or two channels and won't need those extras: with one channel on it matches the X-E, with the same 100 MHz, update rate, screen and standard decode.",
  chooseNeitherIf:
    "You need fine detail on small signals. Both are 8-bit; Siglent's SDS814X HD is the 12-bit, 100 MHz four-channel option.",
  faqs: [
    {
      question: "What is the difference between Siglent's X-U and X-E?",
      answer:
        "Per Siglent's own application note: the X-E has two converters and two 14 Mpt memory modules against one of each, 500 µV/div against 1 mV/div sensitivity, an on-screen Bode plot, external generator control, an optional 16-channel logic upgrade, web control and a 1 Mpt FFT against 128 kpts. Bandwidth, update rate and screen are shared.",
    },
    {
      question: "Can I add logic channels to the SDS1104X-U?",
      answer:
        "No. Siglent's application note lists the optional 16-channel logic upgrade for the four-channel X-E models and none for the X-U. If you think you'll need a logic analyzer, buy the X-E or plan on a separate USB logic analyzer alongside the X-U.",
    },
    {
      question: "Is the SDS1104X-U's 250 MSa/s with four channels a problem?",
      answer:
        "Only for fast signals. At 250 MSa/s a 10 MHz clock still gets 25 samples per cycle, plenty for a clean trace. At 50 MHz it gets 5 and at 100 MHz only 2.5. If your four-channel work involves signals above about 25 MHz, the X-E's 500 MSa/s is worth paying for.",
    },
    {
      question: "Do both include serial decoding?",
      answer:
        "Yes, as standard. Siglent lists I2C, SPI, UART, CAN and LIN trigger and decode on the SDS1104X-U, and I2C, SPI, UART, RS232, CAN and LIN on the SDS1104X-E. RS232 is the same UART framing at RS232 levels, so in practice the decode sets match.",
    },
    {
      question: "How do I get full memory on the SDS1104X-E with two channels?",
      answer:
        "Use one channel from each pair, such as CH1 and CH3 or CH2 and CH4. Siglent's application note says that keeps 14 Mpts per channel; using both channels of one pair, such as CH1 and CH2, drops each to 7 Mpts. The X-U gives 7 Mpts with any two channels.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Siglent SDS1104X-U vs Rigol DS1054Z", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-U vs Rigol DHO804", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804" },
    { label: "SDS1104X-U vs DS1104Z-S Plus", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus" },
    { label: "Siglent SDS814X HD vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO814", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" },
  ],
};

export default function SiglentSds1104xUVsSiglentSds1104xEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
