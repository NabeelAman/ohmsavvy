import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS814X HD per Siglent's SDS800X HD data sheet, https://siglentna.com/download/42432/, and
// https://siglentna.com/digital-oscilloscopes/sds800x-hd-digital-storage-oscilloscope/ (both checked 2026-11-07):
// 100 MHz, 4 channels, 12-bit ADC, ENOB 8.4-bit typical (24.99 MHz input, 20 mV/div, 50 ohm), noise floor 70 uVrms
// typical at 1 mV/div full bandwidth, 2 GSa/s one channel / 1 GSa/s two / 500 MSa/s four, 50 / 25 / 10 Mpts per
// channel, 80,000 wfm/s normal and 500,000 wfm/s sequence (70 and 100 MHz models), 3.5 ns typical rise time,
// 0.5 mV/div to 10 V/div, 7-inch 1024 x 600 capacitive touchscreen, standard I2C/SPI/UART/CAN/LIN trigger and decode,
// 2 Mpts FFT, 80,000-frame history, Bode plot, optional 16 digital channels (SLA1016), optional 25 MHz USB AWG
// (SAG1021I), 100-240 Vrms, 80 W max, 312 x 151 x 132.6 mm, 2.6 kg net, PP510 probe per channel.
// Siglent SDS1104X-E per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/
// (checked 2026-11-07): 100 MHz, 4 channels, 1 GSa/s, 7 Mpts/ch (14 Mpts/ch interleaved), 100,000 wfm/s normal and
// 400,000 sequence, 7-inch 800 x 480, 500 uV/div to 10 V/div, free IIC/SPI/UART/RS232/CAN/LIN decode, 1 Mpt FFT,
// 80,000-frame history, optional 16-channel MSO, Bode plot controlling an external SDG/SAG generator, PP510 probes.
// Channel-pair memory rules and 500 MSa/s with four channels per https://siglentna.com/application-note/differences_xe_vs_xu/
// (checked 2026-11-07). 8-bit resolution and 100-240 V AC, 50 W max per Siglent's SDS1000X-E data sheet
// https://siglentna.com/download/22005/ (as cited on /oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e).
// Amazon: SDS814X HD B0CZJSPQCB and SDS1104X-E B0771N1ZF9 in stock at ZIP 10001 (checked 2026-11-08).
// SDS1104X-E is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e";
const hd = picks.find((p) => p.name === "Siglent SDS814X HD")!;
const xe = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "Siglent SDS814X HD vs SDS1104X-E: 12 or 8-bit",
  description:
    "Siglent SDS814X HD vs SDS1104X-E: Siglent's 12-bit touchscreen model against its proven 8-bit four-channel scope. Memory, sample rate and ENOB, with a verdict.",
  path: "/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e",
  image: hd.image,
});

const link = "text-accent hover:underline";

/** How each scope's memory per channel depends on which channels are on. */
function MemoryMapDiagram() {
  const rows = [
    { y: 60, label: "CH1 only", xe: "14 Mpts", hd: "50 Mpts" },
    { y: 88, label: "CH1 + CH3", xe: "14 Mpts each", hd: "25 Mpts each" },
    { y: 116, label: "CH1 + CH2", xe: "7 Mpts each", hd: "25 Mpts each" },
    { y: 144, label: "All four", xe: "7 Mpts each", hd: "10 Mpts each" },
  ];
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS814X HD vs SDS1104X-E memory map: the SDS1104X-E has two memory modules, one per channel pair, so CH1 plus CH3 keeps 14 Mpts each while CH1 plus CH2 drops to 7 Mpts each; the SDS814X HD simply gives 50, 25 or 10 Mpts per channel with one, two or four channels on."
    >
      <text x="20" y="22" fontSize="9.5" fontWeight="700" className="fill-foreground">Channels on</text>
      <text x="200" y="22" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">SDS1104X-E</text>
      <text x="325" y="22" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-accent">SDS814X HD</text>
      <text x="200" y="36" fontSize="8" textAnchor="middle" className="fill-muted">pairs: CH1/CH2 and CH3/CH4</text>
      {rows.map((r) => (
        <g key={r.label}>
          <rect x="15" y={r.y - 14} width="370" height="22" rx="3" className="fill-surface stroke-border" strokeWidth="1" />
          <text x="22" y={r.y + 1} fontSize="9" className="fill-foreground">{r.label}</text>
          <text x="200" y={r.y + 1} fontSize="9" textAnchor="middle" className="fill-foreground">{r.xe}</text>
          <text x="325" y={r.y + 1} fontSize="9" textAnchor="middle" className="fill-accent">{r.hd}</text>
        </g>
      ))}
      <text x="200" y="178" fontSize="8.5" textAnchor="middle" className="fill-muted">Spread probes across pairs on the SDS1104X-E to keep 14 Mpts</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS814X HD vs SDS1104X-E: Is 12-bit Worth the Step?",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS814X HD vs SDS1104X-E is Siglent against Siglent: two 100 MHz, four-channel bench scopes with the same probes, the same 80,000-frame history and the same 500 MSa/s per channel with all four on. The SDS814X HD adds a 12-bit converter, 2 GSa/s on one channel, up to 50 Mpts of memory and a 1024 × 600 touchscreen. The SDS1104X-E answers with a faster normal-mode update rate and years on the bench, including our owner's.",
  a: {
    pick: hd,
    imageAlt: "Siglent SDS814X HD four-channel 100 MHz 12-bit touchscreen oscilloscope",
    chooseIf: [
      "You measure small signals on large ones: ripple, noise, sensor outputs",
      "You want long captures, with up to 50 Mpts on one channel",
      "You want a touchscreen and a 2 Mpts FFT",
      "You might add the SLA1016 logic probe or the SAG1021I USB generator later",
    ],
  },
  b: {
    pick: xe,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "Your work is timing and digital, where 8 bits shows everything",
      "You want the faster normal-mode update rate (100,000 wfm/s)",
      "You prefer a button-and-knob interface",
      "You want the scope our owner has hands-on time with",
    ],
  },
  extraSpecs: [
    { label: "Converter resolution", a: "12-bit (ENOB 8.4-bit typical)", b: "8-bit" },
    { label: "Sample rate, 1 / 2 / 4 channels", a: "2 GSa/s / 1 GSa/s / 500 MSa/s", b: "1 GSa/s max; 500 MSa/s with all four on" },
    { label: "Memory per channel", a: "50 / 25 / 10 Mpts (1 / 2 / 4 ch)", b: "14 Mpts (one per pair) or 7 Mpts" },
    { label: "Waveform rate", a: "80,000 wfm/s; 500,000 sequence", b: "100,000 wfm/s; 400,000 sequence" },
    { label: "Most sensitive scale", a: "0.5 mV/div", b: "500 µV/div" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch 800 × 480, buttons" },
    { label: "FFT", a: "2 Mpts", b: "1 Mpt" },
    { label: "Standard decode", a: "I2C, SPI, UART, CAN, LIN", b: "I2C, SPI, UART, RS232, CAN, LIN" },
    { label: "Options", a: "16-ch logic (SLA1016), USB AWG (SAG1021I), power analysis", b: "16-ch MSO, Bode with Siglent SDG/SAG generator" },
    { label: "Power", a: "100–240 V AC, 80 W max; 2.6 kg", b: "100–240 V AC, 50 W max" },
  ],
  differences: [
    "Resolution: 12-bit on the SDS814X HD against 8-bit. Siglent publishes an ENOB of 8.4 bits typical for the HD at a 24.99 MHz test signal, the honest measure of how much of the 12 bits is usable at full bandwidth.",
    "Single-channel sample rate doubles to 2 GSa/s on the HD. With four channels on, both run at 500 MSa/s per channel.",
    "Memory: up to 50 Mpts on one channel and 10 Mpts each with four on, against 14 Mpts and 7 Mpts on the SDS1104X-E.",
    "Normal-mode update rate favors the SDS1104X-E: 100,000 wfm/s against 80,000. In sequence mode the HD leads, 500,000 against 400,000.",
    "Both offer a 16-channel logic option, Bode plot, 80,000-frame history and standard serial decode; Siglent lists RS232 separately only for the X-E.",
    "The SDS1104X-E carries our Hands-on Tested badge; the SDS814X HD assessment is desk research against Siglent's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The HD leads on detail and depth; the X-E holds its own on four-channel speed and update rate.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Vertical levels, log scale, plus Siglent&apos;s typical ENOB for the HD.</>}>
            <BarChart
              log
              items={[
                { label: "SDS814X HD (12-bit)", value: 4096, display: "4,096 levels; ENOB 8.4", highlight: true },
                { label: "SDS1104X-E (8-bit)", value: 256, display: "256 levels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with all four channels on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS814X HD", value: 10, display: "10 Mpts", highlight: true },
                { label: "Siglent SDS1104X-E", value: 7, display: "7 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Single-channel sample rate.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS814X HD", value: 2, display: "2 GSa/s", highlight: true },
                { label: "Siglent SDS1104X-E", value: 1, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Normal-mode waveform update rate.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 100000, display: "100,000 wfm/s", highlight: true },
                { label: "Siglent SDS814X HD", value: 80000, display: "80,000 wfm/s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With all four on, full-rate record length is 20 ms on the HD (10 Mpts at 500 MSa/s) and 14 ms on the X-E (7 Mpts
          at 500 MSa/s). On one channel it is 25 ms on the HD (50 Mpts at 2 GSa/s) and 14 ms on the X-E. The HD is ahead
          everywhere on depth, but not by an order of magnitude.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS814X HD vs SDS1104X-E: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Ripple on a 12 V or 24 V rail", "Siglent SDS814X HD", "12-bit converter and 70 µVrms noise floor"],
            ["Four-channel logic timing", "Siglent SDS1104X-E", "Same 500 MSa/s, faster normal update rate"],
            ["Long startup or brownout capture", "Siglent SDS814X HD", "50 Mpts on one channel"],
            ["Audio distortion via FFT", "Siglent SDS814X HD", "2 Mpts FFT and finer vertical steps"],
            ["Learning on a well-documented bench scope", "Siglent SDS1104X-E", "Long-sold model with established guides"],
            ["Filter Bode plots", "Either", "Both drive a Siglent generator for Bode plots"],
            ["Glitch hunting with persistence", "Siglent SDS1104X-E", "100,000 wfm/s in normal mode"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS814X HD: small signals and long records</h3>
        <p className="text-muted leading-7 mb-4">
          Siglent lists a 70 µVrms noise floor at 1 mV/div and full bandwidth, and a 12-bit converter. Together those make
          the HD the one for millivolt ripple, sensor noise and the shape of small signals sitting on large ones. Its 50
          Mpts on a single channel suits slow events captured at a high rate, such as a power-up sequence. It is also the
          more modern interface: a capacitive touchscreen, mouse and keyboard support, and web control over LAN.
        </p>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-E: fast, proven, 8 bits</h3>
        <p className="text-muted leading-7 mb-4">
          Siglent&apos;s application note explains the X-E&apos;s architecture: two converters and two 14 Mpt memory
          modules, one per channel pair. That is how it keeps 500 MSa/s on all four channels. It also means memory depends
          on which channels you use. Put your two probes on CH1 and CH3 and each keeps 14 Mpts; put them on CH1 and CH2
          and each gets 7 Mpts. On small signals its 8-bit converter steps in about 0.31 mV at 10 mV/div, so ripple is
          visible but coarse.
        </p>
        <Figure
          caption={
            <>
              Memory per channel by which channels are on. The X-E rewards spreading probes across its two channel pairs;
              the HD only cares how many are on.
            </>
          }
        >
          <MemoryMapDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Use CH1 and CH3 on the SDS1104X-E">
            For two-channel work on the X-E, pick one channel from each pair. You keep 14 Mpts per channel instead of 7,
            at no cost. It is the single most useful habit for getting the X-E&apos;s full memory, and it comes straight
            from Siglent&apos;s own application note.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Earthed probe grounds on both">
            Both run from mains with probe grounds tied to earth. Clipping a ground lead to anything other than circuit
            ground on a mains-powered device causes a short through the scope. Use a differential probe for mains
            work, and stop if you are unsure which side of a circuit is earth referenced.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the SDS814X HD: what &quot;12-bit&quot; delivers</h2>
        <p className="text-muted leading-7 mb-4">
          Siglent deserves credit for publishing an ENOB figure at all: 8.4 bits typical, measured with a 24.99 MHz signal
          at 20 mV/div. Effective bits fall at higher frequencies and with noise, so a 12-bit converter rarely delivers 12
          bits on a fast signal. At low frequencies and with bandwidth limiting, the HD&apos;s detail advantage over an
          8-bit scope is real; on a 25 MHz signal it is smaller than the label suggests. Siglent doesn&apos;t publish an
          ENOB for the SDS1104X-E in the sources we checked, so the two can&apos;t be compared on that line. The X-E is
          the scope our owner tested; this page uses Siglent&apos;s figures only.
        </p>
        <p className="text-muted leading-7">
          The SDS814X HD against Rigol&apos;s 12-bit models is on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" className={link}>
            Siglent SDS814X HD vs Rigol DHO814
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s" className={link}>
            Siglent SDS814X HD vs Rigol DHO924S
          </Link>
          . The SDS1104X-E against its cheaper Siglent sibling is on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS1104X-U vs SDS1104X-E
          </Link>
          , and against its two-channel 200 MHz sibling on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" className={link}>
            Siglent SDS1104X-E vs SDS1202X-E
          </Link>
          . The full picture is in the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS814X HD if you measure small signals, ripple or noise, or capture long events: 12 bits, a 70 µVrms noise floor, up to 50 Mpts and 2 GSa/s on one channel, on a touchscreen. Buy the Siglent SDS1104X-E if your work is mostly digital timing and four-channel debugging: it matches the HD's 500 MSa/s with four channels on, updates faster in normal mode, and it is the one our owner has tested.",
  chooseNeitherIf:
    "You need more than 100 MHz. Siglent's SDS824X HD and the SDS1204X-E are the 200 MHz models in each line; neither is compared here.",
  faqs: [
    {
      question: "Is the SDS814X HD a replacement for the SDS1104X-E?",
      answer:
        "Siglent sells both, and the SDS1104X-E was still in stock on Amazon when we checked. The HD is the newer design with 12 bits, deeper memory and a touchscreen. Siglent doesn't describe it as a replacement on the pages we used, so treat them as two current options at different price points.",
    },
    {
      question: "What does ENOB 8.4 bits mean for the SDS814X HD?",
      answer:
        "Effective number of bits measures how much real resolution survives noise and distortion. Siglent lists 8.4 bits typical with a 24.99 MHz input at 20 mV/div. At lower frequencies and with the 20 MHz bandwidth limit on, more of the 12 bits are usable, which is where the HD's detail advantage shows most.",
    },
    {
      question: "Do both use the same probes?",
      answer:
        "Yes. Siglent lists PP510 passive probes for the 100 MHz SDS800X HD models and for the 100 MHz SDS1000X-E models. That also means probes move between the two without losing bandwidth if you own one and add the other.",
    },
    {
      question: "Can both add logic channels?",
      answer:
        "Yes, both as options. The SDS814X HD takes the SLA1016 16-channel logic probe, which Siglent lists at up to 1 GSa/s and 10 Mpts. The four-channel SDS1104X-E takes Siglent's 16-channel mixed-signal option. Neither includes logic channels in the box.",
    },
    {
      question: "Which one is better for a beginner?",
      answer:
        "Both are reasonable. The SDS1104X-E has more third-party learning material and a straightforward button layout. The SDS814X HD's touchscreen and larger memory are easier to grow into. If budget allows and you expect to measure supplies and sensors, the HD's 12 bits will matter sooner than you think.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Siglent SDS814X HD vs Rigol DHO814", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" },
    { label: "Siglent SDS814X HD vs Rigol DHO924S", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s" },
    { label: "Siglent SDS1104X-U vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO814", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
  ],
};

export default function SiglentSds814xHdVsSiglentSds1104xEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
