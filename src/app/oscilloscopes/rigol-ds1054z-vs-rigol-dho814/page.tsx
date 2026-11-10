import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1054Z per Rigol's DS1000Z data sheet,
// https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf
// (checked 2026-11-07): 50 MHz, calculated rise time 7 ns, 4 channels, 1 GSa/s single / 500 MSa/s dual / 250 MSa/s
// three-four channels, 24 / 12 / 6 Mpts standard, 8-bit, 1 mV/div to 10 V/div, 30,000 wfms/s, up to 60,000-frame
// recording, 7-inch 800 x 480, decode Parallel, RS232/UART, I2C, SPI, USB host/device, LAN, AUX,
// 313.1 x 160.8 x 122.4 mm, 3.2 kg. Conflict: https://www.rigolna.com/products/digital-oscilloscopes/1000z/ lists
// 12 Mpts standard (24 Mpts optional) and bus decode as options (as cited on /oscilloscopes/rigol-dho804-vs-rigol-ds1054z).
// Rigol DHO814 per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): 100 MHz, 3.5 ns typical, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s, 25 / 10 / 5 Mpts,
// 30,000 wfms/s vector and 1,000,000 UltraAcquire, 500,000-frame recording, 500 uV/div (magnified 1 mV/div) to
// 10 V/div, 7-inch 1024 x 600 touchscreen, decode Parallel/RS232-UART/I2C/SPI/CAN, HDMI, USB-C 15 V 3 A (45 W max),
// 265.35 x 161.75 x 77.38 mm, 1.78 kg.
// Amazon: DS1054Z B012938E76 and DHO814 B0H1HVQRBF in stock at ZIP 10001 (checked 2026-11-08).
// DS1054Z is owner-tested (handsOnTested); no measurements from that unit are published here.

const path = "/oscilloscopes/rigol-ds1054z-vs-rigol-dho814";
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const dho814 = picks.find((p) => p.name === "Rigol DHO814")!;

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs DHO814: Classic or 12-bit?",
  description:
    "Rigol DS1054Z vs DHO814: Rigol's long-running 50 MHz classic against its 100 MHz 12-bit touchscreen model. What doubles, what shrinks and who should upgrade.",
  path: "/oscilloscopes/rigol-ds1054z-vs-rigol-dho814",
  image: ds1054z.image,
});

const link = "text-accent hover:underline";

/** Top-down bench footprint, drawn to one scale (1 px = 1 mm), from each data sheet's width and depth. */
function FootprintDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1054Z vs DHO814 bench footprint drawn to scale from above: the DS1054Z is 313 mm wide and 122 mm deep, the DHO814 is 265 mm wide and 77 mm deep, about 46 percent less bench area; the DS1054Z weighs 3.2 kg and the DHO814 1.78 kg."
    >
      <text x="20" y="18" fontSize="10" fontWeight="700" className="fill-foreground">Seen from above, to scale</text>
      <rect x="20" y="30" width="313" height="122" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="176" y="126" fontSize="10" textAnchor="middle" className="fill-foreground">Rigol DS1054Z</text>
      <text x="176" y="140" fontSize="8.5" textAnchor="middle" className="fill-muted">313 × 122 mm, 3.2 kg, AC mains</text>
      <rect x="20" y="30" width="265" height="77" rx="4" className="fill-accent/10 stroke-accent" strokeWidth="1.6" />
      <text x="152" y="62" fontSize="10" textAnchor="middle" className="fill-accent">Rigol DHO814</text>
      <text x="152" y="76" fontSize="8.5" textAnchor="middle" className="fill-muted">265 × 77 mm, 1.78 kg, USB-C</text>
      <line x1="20" y1="170" x2="333" y2="170" className="stroke-muted" strokeWidth="1" />
      <text x="176" y="184" fontSize="8.5" textAnchor="middle" className="fill-muted">width</text>
      <line x1="350" y1="30" x2="350" y2="152" className="stroke-muted" strokeWidth="1" />
      <text x="356" y="95" fontSize="8.5" className="fill-muted">depth</text>
      <text x="20" y="208" fontSize="9" className="fill-foreground">Footprint: 383 cm² against 205 cm², about 46% less for the DHO814</text>
      <text x="20" y="222" fontSize="8" className="fill-muted">Width × depth per Rigol&apos;s data sheets; heights are 161 mm and 162 mm</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs DHO814: Is It Time to Upgrade?",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1054Z vs DHO814 sets the scope that taught a generation of hobbyists against the Rigol most likely to replace it. Both are four-channel benchtops with a 7-inch screen. The DHO814 doubles bandwidth to 100 MHz, moves from 8-bit to 12-bit, adds a 1024 × 600 touchscreen and HDMI, and weighs 1.78 kg against 3.2 kg. The DS1054Z keeps a little more memory with all four channels on, and our owner tested one.",
  a: {
    pick: ds1054z,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50 MHz oscilloscope, front panel",
    chooseIf: [
      "Your signals stay under about 10 MHz: Arduino, audio, PWM, I2C, UART",
      "You want the scope with years of tutorials and forum guides written for it",
      "You prefer physical buttons and a fixed mains-powered bench",
      "You want the lowest entry price into a four-channel Rigol",
    ],
  },
  b: {
    pick: dho814,
    imageAlt: "Rigol DHO814 four-channel 100 MHz 12-bit touchscreen oscilloscope, front panel",
    chooseIf: [
      "You work with clocks or edges above 10 MHz",
      "You measure ripple and noise where 12-bit resolution shows real detail",
      "Bench space is tight or you want USB-C power",
      "You want HDMI out to a bigger monitor and a touchscreen",
    ],
  },
  extraSpecs: [
    { label: "Rise time", a: "7 ns (Rigol, calculated)", b: "3.5 ns (Rigol, typical)" },
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Sample rate, 4 channels on", a: "250 MSa/s", b: "312.5 MSa/s" },
    { label: "Memory, 1 / 2 / 4 channels", a: "24 / 12 / 6 Mpts (data sheet; product page says 12 Mpts standard)", b: "25 / 10 / 5 Mpts" },
    { label: "Most sensitive scale", a: "1 mV/div", b: "500 µV/div (magnified 1 mV/div)" },
    { label: "Waveform rate", a: "30,000 wfms/s", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Frame recording", a: "Up to 60,000 frames", b: "Up to 500,000 frames" },
    { label: "Display", a: "7-inch 800 × 480, buttons", b: "7-inch 1024 × 600 touchscreen, HDMI out" },
    { label: "Decode", a: "Parallel, RS232/UART, I2C, SPI (option per product page)", b: "Parallel, RS232/UART, I2C, SPI, CAN (standard)" },
    { label: "Size, weight, power", a: "313 × 161 × 122 mm; 3.2 kg; AC mains", b: "265 × 162 × 77 mm; 1.78 kg; USB-C 15 V" },
  ],
  differences: [
    "Bandwidth doubles: 50 MHz to 100 MHz, and Rigol's rise-time figure halves from 7 ns (calculated) to 3.5 ns (typical).",
    "Resolution: 8-bit (256 levels) against 12-bit (4,096 levels), 16 times finer steps on the DHO814.",
    "With four channels on, the DHO814 samples faster (312.5 against 250 MSa/s) but the DS1054Z stores slightly more per channel (6 against 5 Mpts, per Rigol's DS1000Z data sheet).",
    "Rigol's own DS1054Z sources disagree on memory (24 Mpts standard in the data sheet, 12 Mpts standard on the product page) and on whether decoding is standard; the DHO814's data sheet lists CAN decoding as standard too.",
    "The DHO814 is 45 mm shallower and 1.4 kg lighter, and runs on USB-C instead of mains.",
    "The DS1054Z carries our Hands-on Tested badge; the DHO814 assessment is desk research against Rigol's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most figures move in the DHO814&apos;s favor. The one that doesn&apos;t, four-channel memory, is a near tie.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Rigol.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO814", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels across the screen, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO814", value: 4096, display: "4,096 (12-bit)", highlight: true },
                { label: "Rigol DS1054Z", value: 256, display: "256 (8-bit)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory per channel with four channels on. The DS1054Z figure is its data sheet&apos;s; its product page lists half that as standard.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 6, display: "6 Mpts", highlight: true },
                { label: "Rigol DHO814", value: 5, display: "5 Mpts" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without packaging.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 3.2, display: "3.2 kg" },
                { label: "Rigol DHO814", value: 1.78, display: "1.78 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The four-channel record length works out close: 6 Mpts at 250 MSa/s is 24 ms, and 5 Mpts at 312.5 MSa/s is 16
          ms. The DS1054Z holds a longer window at a coarser sample spacing, 4 ns against 3.2 ns. Neither difference will
          decide a purchase. Bandwidth and resolution will.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1054Z vs DHO814: who should upgrade?</h2>
        <DataTable
          head={["Your situation", "Pick", "Why"]}
          rows={[
            ["Arduino and 16 MHz AVR projects", "Rigol DS1054Z", "50 MHz handles their clocks and buses"],
            ["ESP32 or STM32 SPI at 20 MHz and up", "Rigol DHO814", "100 MHz keeps the clock edges recognizable"],
            ["Switching supply ripple on a 12 V rail", "Rigol DHO814", "12-bit steps resolve millivolt ripple"],
            ["Following a YouTube course built on the DS1054Z", "Rigol DS1054Z", "Menus match the videos"],
            ["Small desk or shared bench", "Rigol DHO814", "About 46% less footprint"],
            ["Already own a DS1054Z, do audio and slow logic", "Keep it", "Nothing in that work needs 100 MHz or 12 bits"],
            ["CAN bus on a car or robot", "Rigol DHO814", "CAN decode listed as standard"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1054Z: dependable below 10 MHz</h3>
        <p className="text-muted leading-7 mb-4">
          Using the three-to-five-times rule, 50 MHz is comfortable up to roughly 10 to 17 MHz. That covers the classic
          hobby bench: Arduino clocks at 16 MHz with some edge rounding, UART, I2C at 100 or 400 kHz, PWM, servo signals
          and audio. Rigol&apos;s 1 mV/div most sensitive scale and 8-bit converter mean small ripple is visible but drawn
          in coarse steps. Its weak point is fast edges: Rigol calculates a 7 ns rise time, so any edge quicker than that
          is drawn at roughly the scope&apos;s own speed rather than its real one.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO814: room above 10 MHz and below 1 mV</h3>
        <p className="text-muted leading-7 mb-4">
          The DHO814 extends both ends. 100 MHz is comfortable to about 20 to 33 MHz, which covers faster SPI and most
          microcontroller clocks, and its 3.5 ns rise time halves the DS1054Z&apos;s. At the other end, the 12-bit
          converter and a 500 µV/div magnified scale show millivolt ripple as a curve instead of a staircase. Rigol also
          lists 500,000-frame waveform recording, against the DS1054Z&apos;s 60,000, for replaying intermittent events.
        </p>
        <Figure
          caption={
            <>
              Bench footprint from above, drawn to scale from Rigol&apos;s width and depth figures. Heights are almost
              equal; the DHO814 is the shallower case.
            </>
          }
        >
          <FootprintDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="The upgrade test">
            If you already own a DS1054Z, upgrade when a real signal beats it: a clock above about 15 MHz whose edges look
            like sine waves, or ripple you can&apos;t read because it spans three or four steps on screen. If neither has
            happened, the DS1054Z is still doing its job.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Both probe grounds are earth-referenced in practice">
            Rigol rates both inputs CAT I, 300 Vrms. The DS1054Z runs from mains with its probe grounds tied to earth,
            and the DHO814 shares a ground with whatever powers it. Never clip a ground lead to the live side of a
            mains circuit; use a differential probe.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DS1054Z: Rigol&apos;s own paperwork</h2>
        <p className="text-muted leading-7 mb-4">
          The DS1054Z is the scope our owner has hands-on time with, and that is why it carries the Tested badge; this page
          reports no measurements from it. Its weak spot as a buy is documentation. Rigol&apos;s data sheet lists 24 Mpts
          and serial decoding as standard, while Rigol&apos;s product page lists 12 Mpts standard and decoding as options.
          Check the current listing and what your unit shows in its options menu. The DHO814&apos;s data sheet has no such
          split.
        </p>
        <p className="text-muted leading-7">
          The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          covers the classic in depth. For the 70 MHz DHO alternative see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs DS1054Z
          </Link>
          ; for a 100 MHz four-channel scope with the same 8-bit design see{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z" className={link}>
            Siglent SDS1104X-U vs Rigol DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          . The DHO814 against other 100 MHz models is on{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" className={link}>
            Siglent SDS1104X-E vs Rigol DHO814
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DHO814 if your signals run above about 10 MHz or you measure small ripple and noise: it doubles bandwidth to 100 MHz, resolves 12 bits, and does it in a 1.78 kg USB-C case with a touchscreen. Buy, or keep, the Rigol DS1054Z if your work is Arduino-class logic, audio and PWM: 50 MHz and four channels still cover it, it has years of learning material behind it, and it is the one our owner has tested.",
  chooseNeitherIf:
    "You need logic channels or a built-in signal generator. Neither has them; the Rigol DHO914 adds 16 digital inputs and the DHO914S adds a generator.",
  faqs: [
    {
      question: "Is the Rigol DS1054Z still worth buying?",
      answer:
        "For signals under about 10 MHz, yes. It has four channels, 1 GSa/s with one channel on and a 7-inch screen, and Amazon still had it in stock when we checked. Its limits are 50 MHz, 8-bit resolution and a mains-powered 3.2 kg case. If you expect faster clocks or careful ripple work, the DHO814 is the better long-term buy.",
    },
    {
      question: "Does the DHO814 replace the DS1054Z in Rigol's lineup?",
      answer:
        "Rigol hasn't said that one replaces the other, and both were on sale on Amazon when we checked. In practice they cover the same four-channel hobby bench, and the DHO800 series is the newer platform. We describe them by their published specs, not by assumptions about Rigol's plans.",
    },
    {
      question: "How much more memory does the DS1054Z have?",
      answer:
        "Per Rigol's DS1000Z data sheet it has 24, 12 and 6 Mpts with one, two and four channels on; the DHO814 has 25, 10 and 5 Mpts. So they tie with one channel, and the DS1054Z leads slightly with two or four. Rigol's DS1054Z product page lists 12 Mpts as standard, which conflicts with its data sheet.",
    },
    {
      question: "Can I use my DS1054Z probes on the DHO814?",
      answer:
        "Both use BNC inputs with 1 MΩ input impedance per Rigol, and Rigol ships 150 MHz passive probes with the DHO814. A passive probe rated for at least 100 MHz suits the DHO814's bandwidth; check the rating printed on your old probes, since lower-rated probes limit what the newer scope can show.",
    },
    {
      question: "Is the DHO814 harder to learn than the DS1054Z?",
      answer:
        "It is different more than harder. The DHO814 adds a touchscreen for dragging cursors and zooming, while the DS1054Z is driven by buttons and knobs. The DS1054Z has far more third-party tutorials because it has been sold for years, which helps a beginner learning alone.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-U vs Rigol DS1054Z", href: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1054z" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Rigol DHO814", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814" },
    { label: "Rigol DHO814 vs Rigol DHO914", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho914" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
  ],
};

export default function RigolDs1054zVsRigolDho814Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
