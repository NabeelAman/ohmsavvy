import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DHO804 and DHO802, per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): both 70 MHz, 5 ns typical rise time, 12-bit, 7-inch 1024 x 600 capacitive touchscreen,
// 30,000 wfms/s (vector) / 1,000,000 wfms/s (UltraAcquire), 500,000-frame recording, 1.6 ns peak detect,
// 500 uV/div (magnified 1 mV/div setting) to 10 V/div, CAT I 300 Vrms / 400 Vpk max input, standard decode Parallel,
// RS232/UART, I2C, SPI, CAN, USB host/device, LAN, HDMI 1.4, USB Type-C DC 15 V 3 A (45 W max),
// 265.35 x 161.75 x 77.38 mm, 1.78 kg.
// DHO802: "2 + EXT" analog channels; 1.25 GSa/s single-channel, 625 MSa/s both; 25 Mpts single, 10 Mpts both;
// two 150 MHz passive probes standard.
// DHO804: 4 analog channels, no EXT input listed; 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s (1 / 2 / 3-4 channels);
// 25 / 10 / 5 Mpts; four 150 MHz passive probes standard.
// Amazon: DHO804 B0CGHQHQN7 and DHO802 B0CGHQ2STR both in stock at ZIP 10001 (checked 2026-11-08).
// DHO804 is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/rigol-dho804-vs-rigol-dho802";
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;
const dho802 = picks.find((p) => p.name === "Rigol DHO802")!;

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs DHO802: 4 or 2 Channels?",
  description:
    "Rigol DHO804 vs DHO802: same 70 MHz 12-bit body, so the choice is four channels or two plus an external trigger. Sample-rate charts and a verdict by job.",
  path: "/oscilloscopes/rigol-dho804-vs-rigol-dho802",
  image: dho804.image,
});

const link = "text-accent hover:underline";

/** What each model's inputs can be wired to on one real job (an SPI bus). */
function InputsDiagram() {
  const four = [
    { y: 50, ch: "CH1", sig: "SCLK" },
    { y: 72, ch: "CH2", sig: "MOSI" },
    { y: 94, ch: "CH3", sig: "MISO" },
    { y: 116, ch: "CH4", sig: "CS" },
  ];
  const two = [
    { y: 50, ch: "CH1", sig: "SCLK" },
    { y: 72, ch: "CH2", sig: "MOSI" },
    { y: 116, ch: "EXT", sig: "CS (trigger only)" },
  ];
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DHO804 vs DHO802 input diagram on an SPI bus: the DHO804 puts clock, MOSI, MISO and chip select on four displayed channels; the DHO802 shows clock and MOSI on its two channels and can only trigger from chip select through its EXT input, which is not displayed."
    >
      <text x="95" y="20" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Rigol DHO804</text>
      <rect x="20" y="32" width="150" height="100" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      {four.map((p) => (
        <g key={p.ch}>
          <text x="32" y={p.y + 3} fontSize="9" fontWeight="700" className="fill-foreground">{p.ch}</text>
          <path d={`M62 ${p.y} H120`} className="stroke-accent" strokeWidth="1.6" />
          <text x="124" y={p.y + 3} fontSize="8.5" className="fill-muted">{p.sig}</text>
        </g>
      ))}
      <text x="95" y="150" fontSize="8.5" textAnchor="middle" className="fill-muted">4 traces on screen,</text>
      <text x="95" y="162" fontSize="8.5" textAnchor="middle" className="fill-muted">312.5 MSa/s each</text>
      <text x="300" y="20" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Rigol DHO802</text>
      <rect x="225" y="32" width="150" height="100" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      {two.map((p) => (
        <g key={p.ch}>
          <text x="237" y={p.y + 3} fontSize="9" fontWeight="700" className="fill-foreground">{p.ch}</text>
          <path
            d={`M267 ${p.y} H${p.ch === "EXT" ? 285 : 325}`}
            className={p.ch === "EXT" ? "stroke-muted" : "stroke-accent"}
            strokeWidth="1.6"
            strokeDasharray={p.ch === "EXT" ? "4 3" : undefined}
          />
          <text x={p.ch === "EXT" ? 289 : 329} y={p.y + 3} fontSize="8.5" className="fill-muted">{p.sig}</text>
        </g>
      ))}
      <text x="300" y="150" fontSize="8.5" textAnchor="middle" className="fill-muted">2 traces on screen,</text>
      <text x="300" y="162" fontSize="8.5" textAnchor="middle" className="fill-muted">625 MSa/s each; EXT is not drawn</text>
      <text x="200" y="184" fontSize="8.5" textAnchor="middle" className="fill-muted">Channel and sample-rate figures per Rigol&apos;s DHO800 data sheet</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs DHO802: Four Channels or Two?",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DHO804 vs DHO802 is a channel-count decision and almost nothing else. Rigol's DHO800 data sheet gives both the same 70 MHz bandwidth, 12-bit resolution, 7-inch 1024 × 600 touchscreen, 1.78 kg body and USB-C power. The DHO804 has four analog inputs. The DHO802 has two plus an external trigger input, and with two channels in use both sample at 625 MSa/s into 10 Mpts.",
  a: {
    pick: dho804,
    imageAlt: "Rigol DHO804 four-channel 70 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "You debug SPI, where clock, MOSI, MISO and chip select want four traces",
      "You compare a gate drive, a switch node and a current probe at the same time",
      "You want four probes in the box rather than buying two more later",
      "You can live with 312.5 MSa/s per channel when three or four are on",
    ],
  },
  b: {
    pick: dho802,
    imageAlt: "Rigol DHO802 two-channel 70 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "Your work is input against output: amplifiers, filters, regulators",
      "You want an external trigger input to sync on a reference signal without spending a channel",
      "You never expected to look at more than two signals at once",
      "You want the 12-bit DHO800 platform at the lowest entry point",
    ],
  },
  extraSpecs: [
    { label: "Analog inputs", a: "4", b: "2 + EXT trigger input" },
    { label: "Sample rate, 2 channels on", a: "625 MSa/s", b: "625 MSa/s" },
    { label: "Sample rate, all channels on", a: "312.5 MSa/s (4 ch)", b: "625 MSa/s (2 ch)" },
    { label: "Memory, 1 / 2 / all channels", a: "25 / 10 / 5 Mpts", b: "25 / 10 / 10 Mpts" },
    { label: "Rise time (typical)", a: "5 ns", b: "5 ns" },
    { label: "Vertical range", a: "500 µV/div to 10 V/div", b: "500 µV/div to 10 V/div" },
    { label: "Waveform rate", a: "30,000 wfms/s; 1,000,000 UltraAcquire", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Standard decode", a: "Parallel, RS232/UART, I2C, SPI, CAN", b: "Parallel, RS232/UART, I2C, SPI, CAN" },
    { label: "Probes in the box", a: "4 × 150 MHz passive", b: "2 × 150 MHz passive" },
    { label: "Power, size, weight", a: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg", b: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg" },
  ],
  differences: [
    "Inputs: four analog channels on the DHO804; two analog channels plus an EXT trigger input on the DHO802. The EXT input can start a capture but isn't drawn as a trace.",
    "With exactly two channels on, Rigol lists identical numbers for both: 625 MSa/s and 10 Mpts per channel. The gap only opens when the DHO804 runs three or four channels, where it drops to 312.5 MSa/s and 5 Mpts.",
    "Probes: Rigol ships four 150 MHz passive probes with the DHO804 and two with the DHO802.",
    "Everything else on Rigol's data sheet is shared: 70 MHz, 5 ns rise time, 12-bit, the touchscreen, HDMI, LAN, USB-C power, size and weight.",
    "The DHO804 carries our Hands-on Tested badge; the DHO802 assessment is desk research against Rigol's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The charts show the one place the two models differ in performance: what happens to sample rate and memory as
          you switch channels on. Up to two channels they are the same instrument.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Per-channel sample rate with every channel switched on, per Rigol&apos;s DHO800 data sheet.</>}>
            <BarChart
              items={[
                { label: "DHO802, both channels", value: 625, display: "625 MSa/s", highlight: true },
                { label: "DHO804, all four", value: 312.5, display: "312.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with every channel on. The DHO804 splits its memory four ways.</>}>
            <BarChart
              items={[
                { label: "DHO802, both channels", value: 10, display: "10 Mpts", highlight: true },
                { label: "DHO804, all four", value: 5, display: "5 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Signals you can see at once. EXT on the DHO802 triggers but isn&apos;t displayed.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 4, display: "4 traces", highlight: true },
                { label: "Rigol DHO802", value: 2, display: "2 traces + EXT" },
              ]}
            />
          </Figure>
          <Figure caption={<>Full-rate record length with every channel on: memory divided by sample rate.</>}>
            <BarChart
              items={[
                { label: "DHO802 (10 Mpts ÷ 625 MSa/s)", value: 16, display: "16 ms" },
                { label: "DHO804 (5 Mpts ÷ 312.5 MSa/s)", value: 16, display: "16 ms" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The last chart is the quiet surprise. Halving both sample rate and memory leaves the record length unchanged, so
          the DHO804 with four channels on still holds 16 ms at full rate, the same window the DHO802 holds on two. What
          you lose is time resolution: 3.2 ns between samples instead of 1.6 ns. At 312.5 MSa/s that is still about 4.5
          samples per cycle at the full 70 MHz bandwidth, which is thin for a sine wave and fine for the 5 to 20 MHz
          signals most hobby benches see. If the terms are new, read{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explained
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs DHO802: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["SPI with chip select", "Rigol DHO804", "Clock, MOSI, MISO and CS need four traces"],
            ["Op-amp or filter input against output", "Rigol DHO802", "Two channels at 625 MSa/s cover it with nothing left unused"],
            ["Buck converter: gate, switch node, output ripple", "Rigol DHO804", "Three signals at once; the DHO802 forces two captures"],
            ["Audio amplifier clipping check", "Rigol DHO802", "Input and output are all you need"],
            ["Three-phase motor or inverter phases", "Rigol DHO804", "Three phases plus a reference fit only on four channels"],
            ["I2C or UART debugging", "Either", "Two lines each; both decode them as standard"],
            ["Video or sync-locked measurements", "Rigol DHO802", "EXT input takes the sync without using a channel"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO804: four views of one circuit</h3>
        <p className="text-muted leading-7 mb-4">
          Four channels change how you debug. On a switching regulator you can hold the PWM input, the gate, the switch node
          and the output on one screen and see the order of events directly. On an SPI bus the chip-select line frames each
          transfer, so having it on screen tells you which bytes belong to which transaction. Rigol&apos;s standard decoders
          (parallel, UART, I2C, SPI and CAN) work from analog channels, so four inputs means four lines available to them.
          The cost is that with three or four channels on, each one samples at 312.5 MSa/s and records 5 Mpts.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO802: two channels and a trigger input</h3>
        <p className="text-muted leading-7 mb-4">
          Most measurement is a comparison of two points: what goes in and what comes out. The DHO802 does that at its best
          sample rate, 625 MSa/s per channel, because it never has to split four ways. Its EXT input is the part buyers
          overlook. Rigol lists it as &quot;2 + EXT&quot;: a third connector that can start a capture from a reference such
          as a sync pulse or a microcontroller&apos;s debug pin, without spending one of the two displayed channels. It
          can&apos;t show that signal, decode it or measure it.
        </p>
        <Figure
          caption={
            <>
              The same SPI bus on both models. The DHO804 displays all four lines; the DHO802 can trigger from chip select
              but shows only two lines.
            </>
          }
        >
          <InputsDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Count your signals before you count your money">
            List the last five things you probed. If any of them needed three signals in view at once, such as a gate,
            a switch node and an output, buy the DHO804. If every one was a pair, the DHO802 gives you the same 12-bit
            screen and the same per-channel numbers for less.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains and ground clips">
            Rigol rates both inputs CAT I, 300 Vrms and 400 Vpk. Neither is meant for direct mains measurements, and every
            probe ground clip on a bench scope is tied to the same ground. Use a differential probe for anything mains
            referenced, and don&apos;t clip a ground lead to a point that isn&apos;t ground.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DHO802: will two be enough next year?</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO802 is not the weaker scope per channel; on two channels Rigol gives it the same figures as the DHO804.
          Its risk is that you can&apos;t add channels later. Hobby work tends to grow toward motor drives, power supplies
          and microcontroller buses, and those are the jobs where a third trace stops being a luxury. The DHO804 is the
          model we have hands-on experience with, which is why it carries our Tested badge; nothing on this page relies
          on bench measurements, and every number comes from Rigol&apos;s data sheet.
        </p>
        <p className="text-muted leading-7">
          For each model against older or rival scopes, see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs DS1054Z
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            Rigol DHO802 vs DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" className={link}>
            Siglent SDS1104X-E vs Rigol DHO802
          </Link>
          . If you want more bandwidth on four channels, see{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho804" className={link}>
            Rigol DHO814 vs DHO804
          </Link>
          ; if you are weighing an older two-channel Rigol, see{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-dho802" className={link}>
            Rigol DS1102Z-E vs DHO802
          </Link>
          . The full field is in the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DHO804 if any job you do needs three or four signals in view, such as SPI with chip select or a switching regulator's gate, switch node and output. Buy the Rigol DHO802 if your work is two-point comparisons: it has the same 70 MHz, 12-bit body and, per Rigol, the same 625 MSa/s and 10 Mpts per channel with two channels on, plus an external trigger input.",
  chooseNeitherIf:
    "Your signals have edges faster than about 5 ns or clocks above roughly 20 MHz. Both are 70 MHz scopes with a 5 ns typical rise time; the DHO814 or DHO914 adds bandwidth on the same platform.",
  faqs: [
    {
      question: "Is the DHO802 just a DHO804 with two channels disabled?",
      answer:
        "On paper the two share bandwidth, resolution, display, size and power, and Rigol lists identical sample rate and memory with two channels on. The differences Rigol publishes are the channel count, the DHO802's external trigger input and the number of probes in the box. Rigol's data sheet lists no option that adds channels, so buy for the channel count you expect to need.",
    },
    {
      question: "Does the DHO804 have an external trigger input?",
      answer:
        "Rigol's data sheet lists the DHO804 as four channels and the DHO802 as \"2 + EXT\", and the external-trigger specs are footnoted to the two-channel models. On the DHO804 you would trigger from one of the four analog channels instead, which is usually fine because you have more of them.",
    },
    {
      question: "Is 312.5 MSa/s enough on the DHO804 with four channels on?",
      answer:
        "For most hobby signals, yes. It gives about 31 samples per cycle at 10 MHz and 4.5 at the full 70 MHz bandwidth. Record length doesn't suffer, because memory halves with the sample rate: 16 ms at full rate either way. Switch off channels you don't need when you want 625 MSa/s or 1.25 GSa/s back.",
    },
    {
      question: "Can both scopes decode CAN and SPI?",
      answer:
        "Yes. Rigol lists parallel, RS232/UART, I2C, SPI and CAN decoding as standard on the DHO800 series, with up to four protocols decoded at once. The practical limit on the DHO802 is inputs: SPI with chip select needs three lines, and it has two displayed channels.",
    },
    {
      question: "Do they run from a USB-C power bank?",
      answer:
        "Both take power through USB Type-C at 15 V and 3 A per Rigol, with a 45 W maximum. A source has to supply 15 V at that current; a phone charger that only offers 5 V or 9 V won't run them. Check your power bank's USB-C PD output profiles before relying on it in the field.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DS1102Z-E vs Rigol DHO802", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-U vs Rigol DHO804", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-dho804" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function RigolDho804VsRigolDho802Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
