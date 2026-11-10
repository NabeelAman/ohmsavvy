import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS814X HD per Siglent's SDS800X HD data sheet, https://siglentna.com/download/42432/, and
// https://siglentna.com/digital-oscilloscopes/sds800x-hd-digital-storage-oscilloscope/ (both checked 2026-11-07):
// 100 MHz, 3.5 ns typical rise, 4 channels, 12-bit (ENOB 8.4-bit typical), 70 uVrms typical noise floor at 1 mV/div,
// 2 GSa/s / 1 GSa/s / 500 MSa/s (1 / 2 / 4 channels), 50 / 25 / 10 Mpts per channel, 80,000 wfm/s normal and 500,000
// sequence, 0.5 mV/div to 10 V/div, standard I2C/SPI/UART/CAN/LIN decode, Bode plot, optional SLA1016 16 digital
// channels, optional SAG1021I USB AWG (1 channel, 25 MHz, 125 MSa/s, 16 kpts, isolated output), 7-inch 1024 x 600
// touchscreen, 100-240 Vrms 80 W max, 312 x 151 x 132.6 mm, 2.6 kg, PP510 probe per channel.
// Rigol DHO924S per Rigol's DHO900 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-bea3b849-2334-4a6c-8bb3-ed67dc16b97f/1/-/-/-/-/DHO900_DataSheet_EN.pdf
// (checked 2026-11-07): 250 MHz, 1.4 ns typical rise, 4 channels, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s,
// 50 / 25 / 10 Mpts, 30,000 wfms/s vector and 1,000,000 UltraAcquire, 200 uV/div (magnified 1 mV/div) to 10 V/div,
// standard decode Parallel/RS232-UART/I2C/SPI/CAN/LIN, 16 digital inputs with the separate PLA2216, built-in AFG and
// Bode plot (footnote 7: DHO914S and DHO924S only; sine to 25 MHz, 156 MSa/s, 14-bit), 7-inch 1024 x 600 touchscreen,
// USB-C 15 V 3 A (45 W max), 265.35 x 161.75 x 77.38 mm, 1.78 kg, four 350 MHz probes. ENOB and noise floor figures
// not found in the data sheet text we used. The DHO924S Pick says the generator is unconfirmed; the data sheet confirms it.
// Amazon (ZIP 10001, checked 2026-11-08): SDS814X HD B0CZJSPQCB in stock; DHO924S B0H1HPY519 in stock, sold by Gulitech.
// Samples-per-cycle figures are arithmetic (sample rate / rated bandwidth).

const path = "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s";
const hd = picks.find((p) => p.name === "Siglent SDS814X HD")!;
const dho924s = picks.find((p) => p.name === "Rigol DHO924S")!;

export const metadata = buildMetadata({
  title: "Siglent SDS814X HD vs Rigol DHO924S Compared",
  description:
    "Siglent SDS814X HD vs Rigol DHO924S: 100 MHz at 2 GSa/s against 250 MHz at 1.25 GSa/s, both 12-bit. Why channel count decides which bandwidth you really get.",
  path: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho924s",
  image: hd.image,
});

const link = "text-accent hover:underline";

/** Samples per cycle at each scope's rated bandwidth, by number of channels on. Below 2 can't represent the signal. */
function SamplesPerCycleDiagram() {
  const rows = [
    { ch: "1 channel", hd: 20, dho: 5 },
    { ch: "2 channels", hd: 10, dho: 2.5 },
    { ch: "4 channels", hd: 5, dho: 1.25 },
  ];
  const w = (v: number) => Math.min(v, 20) * 7;
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS814X HD vs Rigol DHO924S samples per cycle at each scope's full bandwidth: the SDS814X HD gets 20, 10 and 5 samples per cycle of a 100 MHz signal with one, two and four channels on; the DHO924S gets 5, 2.5 and 1.25 samples per cycle of a 250 MHz signal, and 1.25 is below the 2-sample minimum."
    >
      <text x="20" y="18" fontSize="9.5" fontWeight="700" className="fill-foreground">Samples per cycle at each scope&apos;s full bandwidth</text>
      <line x1={110 + w(2)} y1="28" x2={110 + w(2)} y2="182" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x={110 + w(2) + 4} y="194" fontSize="8" className="fill-muted">2 = bare minimum</text>
      {rows.map((r, i) => {
        const y = 40 + i * 50;
        return (
          <g key={r.ch}>
            <text x="20" y={y + 14} fontSize="9" className="fill-foreground">{r.ch}</text>
            <rect x="110" y={y} width={w(r.hd)} height="14" rx="2" className="fill-accent" />
            <text x={114 + w(r.hd)} y={y + 11} fontSize="8.5" className="fill-accent">SDS814X HD: {r.hd}</text>
            <rect x="110" y={y + 18} width={w(r.dho)} height="14" rx="2" className="fill-foreground/60" />
            <text x={114 + w(r.dho)} y={y + 29} fontSize="8.5" className="fill-foreground">DHO924S: {r.dho}</text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS814X HD vs Rigol DHO924S: Sample Rate or Bandwidth?",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS814X HD vs Rigol DHO924S is two four-channel 12-bit touchscreen scopes built on opposite priorities. The SDS814X HD has 100 MHz of bandwidth and samples at up to 2 GSa/s. The DHO924S has 250 MHz but samples at up to 1.25 GSa/s, and it includes a 25 MHz signal generator and Bode plot, per Rigol's data sheet. Memory is identical: 50, 25 and 10 Mpts per channel.",
  a: {
    pick: hd,
    imageAlt: "Siglent SDS814X HD four-channel 100 MHz 12-bit touchscreen oscilloscope",
    chooseIf: [
      "You run three or four channels at once on signals up to about 30 MHz",
      "You want the faster normal-mode update rate (80,000 wfm/s)",
      "Siglent's published 70 µVrms noise floor and ENOB figures matter to you",
      "You'd add a generator only if needed, via the optional USB AWG",
    ],
  },
  b: {
    pick: dho924s,
    imageAlt: "Rigol DHO924S four-channel 250 MHz 12-bit oscilloscope with built-in generator",
    chooseIf: [
      "You look at fast edges on one or two channels",
      "You want a 25 MHz generator and Bode plot built in",
      "You want USB-C power and a 1.78 kg case",
      "You want 350 MHz probes and parallel bus decoding",
    ],
  },
  extraSpecs: [
    { label: "Rise time (typical)", a: "3.5 ns", b: "1.4 ns" },
    { label: "Sample rate, 1 / 2 / 4 channels", a: "2 GSa/s / 1 GSa/s / 500 MSa/s", b: "1.25 GSa/s / 625 MSa/s / 312.5 MSa/s" },
    { label: "Memory, 1 / 2 / 4 channels", a: "50 / 25 / 10 Mpts", b: "50 / 25 / 10 Mpts" },
    { label: "Waveform rate", a: "80,000 wfm/s; 500,000 sequence", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Noise floor / ENOB", a: "70 µVrms typical; ENOB 8.4-bit typical", b: "Not stated" },
    { label: "Signal generator", a: "Optional SAG1021I USB module, 25 MHz", b: "Built in, sine to 25 MHz, 14-bit" },
    { label: "Logic channels", a: "16 with optional SLA1016", b: "16 with separate PLA2216" },
    { label: "Standard decode", a: "I2C, SPI, UART, CAN, LIN", b: "Parallel, RS232/UART, I2C, SPI, CAN, LIN" },
    { label: "Probes in the box", a: "PP510 per channel (100 MHz model)", b: "4 × 350 MHz passive" },
    { label: "Power, size, weight", a: "100–240 V AC, 80 W max; 312 × 151 × 133 mm; 2.6 kg", b: "USB-C 15 V 3 A; 265 × 162 × 77 mm; 1.78 kg" },
  ],
  differences: [
    "Bandwidth: 250 MHz on the DHO924S against 100 MHz; typical rise times 1.4 ns against 3.5 ns.",
    "Sample rate: the SDS814X HD samples 60% faster at every channel count, 2 GSa/s against 1.25 GSa/s with one channel and 500 against 312.5 MSa/s with four.",
    "With four channels on, the DHO924S's 312.5 MSa/s is below twice its 250 MHz bandwidth, so it can't use that bandwidth fully on four channels. The HD keeps 5 samples per cycle at 100 MHz.",
    "Generator: built into the DHO924S (Rigol data sheet footnote 7); an optional USB module (SAG1021I) for the HD. Both offer Bode plot.",
    "Same memory (50 / 25 / 10 Mpts), both 12-bit, both with an optional 16-channel logic probe and a 7-inch 1024 × 600 touchscreen.",
    "Neither is owner-tested; both assessments are desk research against the makers' data sheets.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The first two charts point in opposite directions, which is the whole story of this pair.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per each maker.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO924S", value: 250, display: "250 MHz", highlight: true },
                { label: "Siglent SDS814X HD", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS814X HD", value: 500, display: "500 MSa/s", highlight: true },
                { label: "Rigol DHO924S", value: 312.5, display: "312.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical rise time. Lower is faster.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS814X HD", value: 3.5, display: "3.5 ns" },
                { label: "Rigol DHO924S", value: 1.4, display: "1.4 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Normal-mode update rate. Special modes: 500,000 (Siglent sequence) and 1,000,000 (Rigol UltraAcquire).</>}>
            <BarChart
              items={[
                { label: "Siglent SDS814X HD", value: 80000, display: "80,000 wfm/s", highlight: true },
                { label: "Rigol DHO924S", value: 30000, display: "30,000 wfms/s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Full-rate record length is close: 50 Mpts at 2 GSa/s is 25 ms on the HD and 50 Mpts at 1.25 GSa/s is 40 ms on the
          DHO924S, because the slower sampler fills the same memory more slowly. With four channels on, 10 Mpts lasts 20
          ms on the HD and 32 ms on the Rigol. Longer windows, coarser spacing. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS814X HD vs Rigol DHO924S: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Overshoot and ringing on fast logic, one probe", "Rigol DHO924S", "1.4 ns rise time with 1.25 GSa/s behind it"],
            ["Four-channel motor drive or power stage", "Siglent SDS814X HD", "500 MSa/s on all four"],
            ["Filter or op-amp frequency response", "Rigol DHO924S", "Generator and Bode plot in the box"],
            ["Low-level noise and ripple", "Siglent SDS814X HD", "Published 70 µVrms noise floor"],
            ["SPI flash at 50 MHz clock", "Rigol DHO924S", "100 MHz is only twice that clock"],
            ["Glitch hunting on a slow bus", "Siglent SDS814X HD", "80,000 wfm/s in normal mode"],
            ["Portable lab with one power cable", "Rigol DHO924S", "USB-C 15 V and 1.78 kg"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS814X HD: balanced across four channels</h3>
        <p className="text-muted leading-7 mb-4">
          The HD&apos;s sample rate stays at least five times its bandwidth at every channel count. That makes its 100 MHz
          dependable on one channel or four, comfortable up to about 20 to 33 MHz by the three-to-five-times
          rule. Siglent publishes a 70 µVrms noise floor and an ENOB of 8.4 bits typical, so you know what its 12 bits
          deliver. It needs an optional USB module for a generator, and it runs from mains.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO924S: real speed, on fewer channels</h3>
        <p className="text-muted leading-7 mb-4">
          The DHO924S&apos;s 1.4 ns rise time shows fast edges far more honestly than the HD&apos;s 3.5 ns. With one
          channel on, 1.25 GSa/s gives five samples per 250 MHz cycle. With two, 2.5. With three or four, 312.5 MSa/s
          gives 1.25 samples per cycle at 250 MHz, below the two-sample minimum, so the usable four-channel bandwidth is
          well under the rating. Its built-in generator, Bode plot to 25 MHz and parallel decode add value the HD charges
          extra for or lacks.
        </p>
        <Figure
          caption={
            <>
              Samples per cycle at each scope&apos;s rated bandwidth. The HD stays at five or more; the DHO924S falls below
              the two-sample minimum with four channels on. Arithmetic on the makers&apos; figures.
            </>
          }
        >
          <SamplesPerCycleDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="Bandwidth needs sample rate behind it">
            A rated bandwidth is only usable if the sample rate supports it. On the DHO924S, treat 250 MHz as a one-channel
            figure, about 125 MHz as a two-channel figure, and roughly 60 to 100 MHz as the useful four-channel range. On
            the HD, 100 MHz holds on all four.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Grounds, generators and mains">
            Both rate their inputs for low-voltage measurement only. Probe grounds share the scope&apos;s ground, and the
            HD&apos;s is mains earth. Never connect a generator output to a powered node, and use a differential probe
            for anything mains referenced.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DHO924S: the generator and the seller</h2>
        <p className="text-muted leading-7 mb-4">
          Our DHO924S product card flags the generator as unconfirmed because Rigol&apos;s series web page doesn&apos;t
          break it out per model. Rigol&apos;s DHO900 data sheet settles it: footnote 7 says only the DHO914S and DHO924S
          have the AFG and Bode plot, and the &quot;S&quot; in the name marks them. The Amazon listing we link to was in
          stock on 2026-11-08 and is sold by a reseller, Gulitech, not by Rigol&apos;s own store. Rigol doesn&apos;t
          publish noise floor or ENOB figures in the data sheet text we used, so the 12-bit comparison with the HD rests on
          Siglent&apos;s numbers alone.
        </p>
        <p className="text-muted leading-7">
          The HD against the 100 MHz Rigol is on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" className={link}>
            Siglent SDS814X HD vs Rigol DHO814
          </Link>
          , and against Siglent&apos;s 8-bit model on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e" className={link}>
            Siglent SDS814X HD vs SDS1104X-E
          </Link>
          . The DHO924S against its 125 MHz sibling is on{" "}
          <Link href="/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" className={link}>
            Rigol DHO914S vs DHO924S
          </Link>
          , and against a 200 MHz Siglent on{" "}
          <Link href="/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" className={link}>
            Rigol DHO924S vs Siglent SDS1202X-E
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS814X HD if you use three or four channels at once on signals up to about 30 MHz: it keeps 500 MSa/s per channel, publishes a 70 µVrms noise floor and updates faster in normal mode. Buy the Rigol DHO924S if you look at fast edges on one or two channels or want a generator and Bode plot built in: 250 MHz, a 1.4 ns rise time, 350 MHz probes and a 1.78 kg USB-C case.",
  chooseNeitherIf:
    "You need full bandwidth above 100 MHz on all four channels at once. Neither delivers it: the HD tops out at 100 MHz and the DHO924S drops to 312.5 MSa/s with four channels on.",
  faqs: [
    {
      question: "Does the Rigol DHO924S have a signal generator?",
      answer:
        "Yes, according to Rigol's DHO900 data sheet, whose footnote 7 says only the DHO914S and DHO924S have the arbitrary function generator and Bode plot. Rigol lists one channel with sine to 25 MHz at 156 MSa/s and 14 bits. The Amazon listing title also says \"with AWG\".",
    },
    {
      question: "Is 250 MHz always better than 100 MHz?",
      answer:
        "Only when the sample rate supports it. The DHO924S samples at 1.25 GSa/s with one channel, 625 MSa/s with two and 312.5 MSa/s with three or four. That last figure is below twice 250 MHz, so on four channels the extra bandwidth isn't fully usable. On one channel, 250 MHz is a real advantage.",
    },
    {
      question: "Can the SDS814X HD generate signals?",
      answer:
        "With an option. Siglent lists the SAG1021I USB AWG module for the SDS800X HD: one channel, 25 MHz, 125 MSa/s and a 16 kpts waveform length with an isolated output. With it or a separate Siglent SDG generator, the HD can run Bode plots. Without it, it has no output.",
    },
    {
      question: "Which has more memory?",
      answer:
        "Neither. Both makers list 50 Mpts with one channel on, 25 Mpts with two and 10 Mpts with four. Because the DHO924S samples more slowly, the same memory covers a longer time at full rate: 40 ms against 25 ms on one channel.",
    },
    {
      question: "Which one is quieter on small signals?",
      answer:
        "We can't say from published figures. Siglent lists a 70 µVrms typical noise floor and an ENOB of 8.4 bits for the SDS800X HD. Rigol describes the DHO900 as low noise but doesn't give a comparable figure in the data sheet text we used. Both are 12-bit, so both resolve far finer steps than 8-bit scopes.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS814X HD vs Rigol DHO814", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" },
    { label: "Siglent SDS814X HD vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO914S vs Rigol DHO924S", href: "/oscilloscopes/rigol-dho914s-vs-rigol-dho924s" },
    { label: "Rigol DHO924S vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO814 vs Rigol DHO914", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho914" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function SiglentSds814xHdVsRigolDho924sPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
