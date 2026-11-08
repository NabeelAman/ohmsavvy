import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E per Rigol's DS1000Z-E data sheet,
// https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z-E_DataSheet_EN.pdf
// (checked 2026-11-07): 100 MHz, 2 analog channels plus an external trigger input, 1 GSa/s single / 500 MSa/s dual,
// 24 Mpts single / 12 Mpts dual standard, 8-bit, 1 mV/div to 10 V/div, 30,000 wfms/s, up to 60,000-frame recording,
// 7-inch 800 x 480, decode Parallel, RS232/UART, I2C, SPI, USB host/device, LAN, AUX, 100-240 V AC 50 W max,
// 313.1 x 160.8 x 122.4 mm, 2.9 kg. Rise time not in the extracted data sheet text; 0.35 / BW estimate labeled.
// The site's DS1102Z-E Pick notes Rigol's series page says 12M standard memory, conflicting with the data sheet.
// Rigol DHO802 per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): 70 MHz, 5 ns typical, "2 + EXT" channels, 12-bit, 1.25 GSa/s single / 625 MSa/s both,
// 25 / 10 Mpts, 30,000 wfms/s vector and 1,000,000 UltraAcquire, 500,000-frame recording, 500 uV/div (magnified
// 1 mV/div) to 10 V/div, decode Parallel/RS232-UART/I2C/SPI/CAN, 7-inch 1024 x 600 touchscreen, HDMI, USB-C 15 V 3 A,
// 265.35 x 161.75 x 77.38 mm, 1.78 kg.
// Amazon: DS1102Z-E B08J3SDBDT and DHO802 B0CGHQ2STR in stock at ZIP 10001 (checked 2026-11-08).

const path = "/oscilloscopes/rigol-ds1102z-e-vs-rigol-dho802";
const ds1102ze = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const dho802 = picks.find((p) => p.name === "Rigol DHO802")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs DHO802: Two-Channel Pick",
  description:
    "Rigol DS1102Z-E vs DHO802: two Rigol two-channel scopes: one with 100 MHz at 8 bits and one with 70 MHz at 12 bits. Where the bandwidth gap matters.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-dho802",
  image: ds1102ze.image,
});

const link = "text-accent hover:underline";

/** Frequency ruler: the comfortable range of each scope by the 3–5× rule, with common hobby signals placed on it. */
function RangeDiagram() {
  const x = (mhz: number) => 30 + mhz * 10;
  const signals = [
    { f: 8, l: "8 MHz SPI" },
    { f: 16, l: "16 MHz AVR clock" },
    { f: 25, l: "25 MHz Ethernet ref" },
  ];
  return (
    <svg
      viewBox="0 0 400 190"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1102Z-E vs DHO802 frequency ruler: by the three-to-five-times rule the 70 MHz DHO802 is comfortable up to about 14 to 23 megahertz and the 100 MHz DS1102Z-E up to about 20 to 33 megahertz; an 8 MHz SPI clock and a 16 MHz microcontroller clock sit inside both ranges and a 25 MHz clock sits inside only the DS1102Z-E's."
    >
      <line x1="30" y1="150" x2="370" y2="150" className="stroke-muted" strokeWidth="1" />
      {[0, 5, 10, 15, 20, 25, 30].map((m) => (
        <g key={m}>
          <line x1={x(m)} y1="146" x2={x(m)} y2="154" className="stroke-muted" strokeWidth="1" />
          <text x={x(m)} y="168" fontSize="8.5" textAnchor="middle" className="fill-muted">{m}</text>
        </g>
      ))}
      <text x="370" y="168" fontSize="8.5" textAnchor="end" className="fill-muted">MHz</text>
      <rect x={x(0)} y="40" width={x(14) - x(0)} height="18" rx="3" className="fill-accent" />
      <rect x={x(14)} y="40" width={x(23.3) - x(14)} height="18" rx="3" className="fill-accent/40" />
      <text x={x(0) + 4} y="34" fontSize="9" className="fill-foreground">DHO802 (70 MHz): clean to ~14 MHz, usable to ~23 MHz</text>
      <rect x={x(0)} y="82" width={x(20) - x(0)} height="18" rx="3" className="fill-foreground" />
      <rect x={x(20)} y="82" width={x(33.3) - x(20)} height="18" rx="3" className="fill-foreground/40" />
      <text x={x(0) + 4} y="76" fontSize="9" className="fill-foreground">DS1102Z-E (100 MHz): clean to ~20 MHz, usable to ~33 MHz</text>
      {signals.map((s) => (
        <g key={s.l}>
          <line x1={x(s.f)} y1="110" x2={x(s.f)} y2="146" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x={x(s.f)} y="124" fontSize="8" textAnchor="middle" className="fill-muted">{s.l}</text>
        </g>
      ))}
      <text x="200" y="186" fontSize="8.5" textAnchor="middle" className="fill-muted">Ranges are the 3–5× rule of thumb applied to each rated bandwidth</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs DHO802: Bandwidth or Bits?",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1102Z-E vs DHO802 is Rigol's own two-channel trade-off. Both have two analog channels and an external trigger input. The DS1102Z-E gives you 100 MHz with an 8-bit converter in a 2.9 kg mains-powered case. The DHO802 gives you 70 MHz with a 12-bit converter, a touchscreen and USB-C power in a 1.78 kg case. Fast signals point to the first, small ones to the second.",
  a: {
    pick: ds1102ze,
    imageAlt: "Rigol DS1102Z-E two-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "Your clocks reach 20 to 30 MHz",
      "You want more memory with both channels on (12 against 10 Mpts)",
      "You prefer buttons and a mains-powered bench scope",
      "You follow course material built around the DS1000Z family",
    ],
  },
  b: {
    pick: dho802,
    imageAlt: "Rigol DHO802 two-channel 70 MHz 12-bit oscilloscope, front panel",
    chooseIf: [
      "You measure ripple, noise, audio or sensor signals",
      "You want CAN decoding included",
      "You want a lighter, shallower scope with USB-C power and HDMI",
      "Your fastest clocks stay under about 15 MHz",
    ],
  },
  extraSpecs: [
    { label: "Inputs", a: "2 + external trigger", b: "2 + external trigger" },
    { label: "Rise time", a: "About 3.5 ns (0.35 ÷ BW estimate)", b: "5 ns typical (Rigol)" },
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Memory, 1 / 2 channels", a: "24 / 12 Mpts (data sheet)", b: "25 / 10 Mpts" },
    { label: "Most sensitive scale", a: "1 mV/div", b: "500 µV/div (magnified 1 mV/div)" },
    { label: "Waveform rate", a: "30,000 wfms/s", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Frame recording", a: "Up to 60,000 frames", b: "Up to 500,000 frames" },
    { label: "Decode", a: "Parallel, RS232/UART, I2C, SPI", b: "Parallel, RS232/UART, I2C, SPI, CAN" },
    { label: "Display", a: "7-inch 800 × 480, buttons", b: "7-inch 1024 × 600 touchscreen, HDMI" },
    { label: "Size, weight, power", a: "313 × 161 × 122 mm; 2.9 kg; 100–240 V AC", b: "265 × 162 × 77 mm; 1.78 kg; USB-C 15 V" },
  ],
  differences: [
    "Bandwidth: 100 MHz on the DS1102Z-E against 70 MHz on the DHO802, about 43% more.",
    "Resolution: 8-bit against 12-bit, so the DHO802 has 16 times finer vertical steps.",
    "Sample rate with both channels on: 625 MSa/s on the DHO802 against 500 MSa/s; with one channel, 1.25 GSa/s against 1 GSa/s.",
    "Memory with both channels on: 12 Mpts on the DS1102Z-E (per its data sheet) against 10 Mpts. Rigol's series page lists 12 Mpts standard for the DS1102Z-E, half its data sheet's 24 Mpts single-channel figure.",
    "Decode: both cover parallel, UART, I2C and SPI; only the DHO802 adds CAN.",
    "Both have two channels plus an external trigger input. Neither is owner-tested; both assessments are desk research.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Each scope wins two of these four charts. That is the honest summary of the pair.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Rigol.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DHO802", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels across the screen, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO802", value: 4096, display: "4,096 (12-bit)", highlight: true },
                { label: "Rigol DS1102Z-E", value: 256, display: "256 (8-bit)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with both channels on.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802", value: 625, display: "625 MSa/s", highlight: true },
                { label: "Rigol DS1102Z-E", value: 500, display: "500 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with both channels on (DS1102Z-E per its data sheet).</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 12, display: "12 Mpts", highlight: true },
                { label: "Rigol DHO802", value: 10, display: "10 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The DHO802 has the faster sample rate despite the lower bandwidth, so at 70 MHz it has about 8.9 samples per
          cycle with both channels on against 5 for the DS1102Z-E at 100 MHz. Bandwidth decides how fast a signal can be
          before the scope shrinks it; sample rate decides how finely it is drawn. Both matter, in different jobs. See{" "}
          <Link href="/oscilloscopes/50mhz-vs-100mhz-oscilloscope" className={link}>
            50 MHz vs 100 MHz oscilloscopes
          </Link>{" "}
          for the bandwidth side.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs DHO802: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["25 MHz clock or reference oscillator", "Rigol DS1102Z-E", "Inside its comfortable range, past the DHO802's"],
            ["Buck converter output ripple", "Rigol DHO802", "12-bit steps show millivolt ripple cleanly"],
            ["Op-amp input against output", "Rigol DHO802", "Small signals, two channels, 625 MSa/s"],
            ["SPI at 10 to 20 MHz", "Rigol DS1102Z-E", "Sharper clock edges with 100 MHz"],
            ["CAN bus on a vehicle or robot", "Rigol DHO802", "CAN decode standard"],
            ["Arduino UART and I2C", "Either", "Both decode them; neither is stretched"],
            ["Portable or field use", "Rigol DHO802", "1.78 kg and USB-C power"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1102Z-E: two fast channels on the older platform</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1102Z-E is the DS1000Z platform with two channels and 100 MHz. That bandwidth is comfortable to roughly 20
          to 33 MHz, which takes in a 25 MHz crystal and SPI clocks most two-channel buyers will meet. Rigol lists 1 mV/div
          as its most sensitive scale and an 8-bit converter, so at 10 mV/div each step is about 0.31 mV. Ripple of a
          millivolt or two is visible but drawn in a handful of levels. It runs from mains and weighs 2.9 kg.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO802: slower ceiling, finer floor</h3>
        <p className="text-muted leading-7 mb-4">
          At 70 MHz the DHO802 is comfortable to about 14 to 23 MHz. A 16 MHz microcontroller clock fits with its
          harmonics softened; a 25 MHz one is past the comfortable range. Below that ceiling it is the better instrument:
          12-bit steps of about 0.02 mV at 10 mV/div, a faster two-channel sample rate, 500,000-frame recording and CAN
          decoding. The touchscreen and HDMI output help when you share a screen with a class or a client.
        </p>
        <Figure
          caption={
            <>
              Where common clocks land against each scope&apos;s comfortable range. Only the 25 MHz reference falls in
              the DS1102Z-E&apos;s range alone.
            </>
          }
        >
          <RangeDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="The 70 to 100 MHz gap is narrower than it looks">
            The bandwidth difference only decides cases where your fastest signal sits between about 14 and 33 MHz. Below
            that, both scopes show the shape; the DHO802 shows it with more detail. Above that, both struggle and a 200 MHz
            scope is the real answer.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Grounding on a mains-powered scope">
            The DS1102Z-E&apos;s probe grounds connect to mains earth through its power cord. Connecting a probe ground
            to a live or neutral conductor causes a fault through the scope. For anything mains referenced, use a
            differential probe on either model.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DS1102Z-E: how much memory you get</h2>
        <p className="text-muted leading-7 mb-4">
          Rigol&apos;s DS1000Z-E data sheet lists 24 Mpts with one channel and 12 Mpts with two as standard. Rigol&apos;s
          series web page lists 12 Mpts as standard. We use the data sheet figures in the charts and flag the conflict
          here; if deep memory is the reason you are buying, check what the unit shows in its acquisition menu on arrival.
          Rigol publishes one set of DHO802 memory figures, so there is nothing to reconcile on that side.
        </p>
        <p className="text-muted leading-7">
          The DS1102Z-E against its four-channel sibling is on{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>
          , and against a Siglent two-channel scope on{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" className={link}>
            Rigol DS1102Z-E vs Siglent SDS1102CML+
          </Link>
          . The DHO802 against its four-channel sibling is on{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-dho802" className={link}>
            Rigol DHO804 vs DHO802
          </Link>
          , and against the classic four-channel Rigol on{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            Rigol DHO802 vs DS1054Z
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1102Z-E if your fastest signals sit between about 15 and 30 MHz, such as a 25 MHz reference clock or fast SPI: its 100 MHz bandwidth shows those edges more faithfully. Buy the Rigol DHO802 if your work is ripple, audio, sensors or buses under about 15 MHz: its 12-bit converter, faster two-channel sample rate, CAN decoding, touchscreen and 1.78 kg USB-C case make it the better everyday two-channel scope.",
  chooseNeitherIf:
    "You need three or four signals at once. Both are two-channel scopes with an external trigger input; the Rigol DHO804 or DS1054Z gives you four channels.",
  faqs: [
    {
      question: "Is 70 MHz enough for Arduino work?",
      answer:
        "Yes. A 16 MHz AVR clock sits inside the DHO802's comfortable range by the three-to-five-times rule, and UART, I2C, PWM and servo signals are far slower. The edges of the clock will look a little rounded, which is true on most hobby scopes.",
    },
    {
      question: "Do both scopes have an external trigger input?",
      answer:
        "Yes. Rigol lists the DS1102Z-E with two analog channels and an external trigger input channel, and the DHO802 as \"2 + EXT\". On both, EXT can start a capture from a third signal, such as a sync pulse, but isn't drawn on screen or decoded.",
    },
    {
      question: "Which one decodes more protocols?",
      answer:
        "The DHO802. Rigol lists parallel, RS232/UART, I2C, SPI and CAN decoding as standard on the DHO800 series. The DS1000Z-E data sheet lists parallel, RS232/UART, I2C and SPI. If you work on CAN, the DHO802 is the only one of the two that decodes it.",
    },
    {
      question: "Is the DS1102Z-E's 8-bit converter a problem?",
      answer:
        "For timing, logic and most general work, no. It shows up on small signals: at 10 mV/div each step is about 0.31 mV, so millivolt ripple is drawn in a few levels. Rigol lists a High Resolution acquisition mode for the DS1000Z-E that reaches up to 12 bits; it is an acquisition mode, not the native converter resolution.",
    },
    {
      question: "Which scope is easier to carry between home and a lab?",
      answer:
        "The DHO802. Rigol lists it at 1.78 kg and 77 mm deep, powered by a USB-C 15 V supply, against 2.9 kg and 122 mm deep with a mains cord for the DS1102Z-E. Heights and widths are close. Both still need a bench and a power source; neither is a handheld.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DHO804 vs Rigol DHO802", href: "/oscilloscopes/rigol-dho804-vs-rigol-dho802" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "50 MHz vs 100 MHz oscilloscope", href: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope" },
  ],
};

export default function RigolDs1102zEVsRigolDho802Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
