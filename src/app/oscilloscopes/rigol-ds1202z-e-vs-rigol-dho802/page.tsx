import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1202Z-E: 200 MHz, calculated rise time 1.75 ns, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 24 Mpts (1 ch)
// / 12 Mpts (2 ch), 8-bit (high resolution 12 bits max), 500 uV/div to 10 V/div, 1 MOhm || 15 pF, CAT I 300 Vrms /
// CAT II 100 Vrms, 2 ns/div to 50 s/div, 30,000 wfms/s, recording up to 60,000 frames, decoding Parallel, RS232/UART,
// I2C, SPI (2 buses), 7-inch 800 x 480, USB/LAN/Aux, 100-240 V 50 W max, 2.9 kg, 313.1 x 160.8 x 122.4 mm, standard
// probes PVP2350 350 MHz, three-year warranty. Per Rigol's DS1000Z-E datasheet (PCX01100-2020-04),
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-f55c8579-4293-4d7f-aec4-ef7ea08ad8dc/1/-/-/-/-/DS1000Z-E%20Datasheet-EN.pdf
// (checked 2026-11-08).
// Rigol DHO802: 70 MHz, rise time 5 ns, 2 channels + EXT, 1.25 GSa/s (1 ch) / 625 MSa/s (2 ch), 25 Mpts (1 ch) /
// 10 Mpts (2 ch), 12-bit, dynamic range +/-4 div, 1 MOhm || 15 pF, CAT I 300 Vrms 400 Vpk, 5 ns/div to 500 s/div,
// 30,000 wfms/s vector mode / 1,000,000 wfms/s UltraAcquire, recording up to 500,000 frames, decoding Parallel,
// RS232/UART, I2C, SPI, CAN (4 at once), 33 auto measurements, FFT up to 1 Mpts, 7-inch 1024 x 600 capacitive
// touchscreen, HDMI, LAN, USB, power via USB Type-C DC 15 V 3 A (max 45 W), 265.35 x 161.75 x 77.38 mm, 1.78 kg,
// three-year warranty. Per Rigol's DHO800 datasheet
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// linked from https://www.rigolna.com/products/digital-oscilloscopes/dho800/ (checked 2026-11-08). Both ASINs buyable
// on Amazon.com at ZIP 10001 (checked 2026-11-08). Step sizes below are full scale / 2^bits, assuming 8 vertical
// divisions (the DHO800 datasheet states +/-4 div); the ripple example is illustrative.

const path = "/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802";
const ds1202 = picks.find((p) => p.name === "Rigol DS1202Z-E")!;
const dho802 = picks.find((p) => p.name === "Rigol DHO802")!;

export const metadata = buildMetadata({
  title: "Rigol DS1202Z-E vs Rigol DHO802: 8 vs 12 Bit",
  description:
    "Rigol DS1202Z-E vs Rigol DHO802: 200 MHz at 8 bits or 70 MHz at 12 bits. Step-size math on a real ripple job, capture rates, size, power and verdict.",
  path: "/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802",
  image: dho802.image,
});

const link = "text-accent hover:underline";

/** 10 mV of ripple on a 5 V rail at 1 V/div, as an 8-bit and a 12-bit converter can represent it. */
function QuantizationDiagram() {
  const ripple = (x: number) => 4 * Math.sin((x / 40) * 2 * Math.PI) + 2 * Math.sin((x / 13) * 2 * Math.PI);
  let smooth = "";
  for (let x = 0; x <= 160; x += 2) smooth += `${x === 0 ? "M" : " L"}${220 + x} ${(100 - ripple(x) * 5).toFixed(1)}`;
  return (
    <svg
      viewBox="0 0 400 206"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1202Z-E vs Rigol DHO802 resolution diagram: a 5 volt rail with about 10 millivolts of ripple, viewed DC-coupled at 1 volt per division. The 8-bit DS1202Z-E's steps are about 31 millivolts, so the ripple collapses into a flat line that occasionally flickers by one step. The 12-bit DHO802's steps are about 2 millivolts, so the ripple's shape is drawn in roughly five steps."
    >
      <text x="20" y="20" fontSize="10" fontWeight="700" className="fill-muted">DS1202Z-E: 8-bit, ≈ 31 mV steps</text>
      <rect x="20" y="30" width="170" height="140" className="fill-none stroke-border" strokeWidth="1" />
      {[45, 75, 105, 135, 165].map((y) => (
        <path key={`a${y}`} d={`M20 ${y} H190`} className="stroke-border" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      <path d="M20 105 H70 V75 H74 V105 H140 V75 H143 V105 H190" className="stroke-muted fill-none" strokeWidth="1.6" />
      <text x="105" y="184" fontSize="8.5" textAnchor="middle" className="fill-muted">ripple hidden inside one step</text>

      <text x="220" y="20" fontSize="10" fontWeight="700" className="fill-accent">DHO802: 12-bit, ≈ 2 mV steps</text>
      <rect x="220" y="30" width="170" height="140" className="fill-none stroke-border" strokeWidth="1" />
      {Array.from({ length: 13 }, (_, i) => 40 + i * 10).map((y) => (
        <path key={`b${y}`} d={`M220 ${y} H390`} className="stroke-border" strokeWidth="0.4" strokeDasharray="2 3" />
      ))}
      <path d={smooth} className="stroke-accent fill-none" strokeWidth="1.6" />
      <text x="305" y="184" fontSize="8.5" textAnchor="middle" className="fill-muted">ripple shape visible</text>
      <text x="200" y="202" fontSize="8" textAnchor="middle" className="fill-muted">Illustrative, zoomed vertically; dashed lines are converter steps</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1202Z-E vs Rigol DHO802",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1202Z-E vs Rigol DHO802 sets bandwidth against resolution inside one maker's two-channel range. The DS1202Z-E is the faster scope: 200 MHz with a 1.75 ns calculated rise time, but an 8-bit converter. The DHO802 is the finer one: 12 bits, 16 times smaller steps, but 70 MHz and a 5 ns rise time. The DHO802 also brings a 1024 × 600 touchscreen, USB-C power, CAN decoding and a capture rate up to 1,000,000 waveforms per second. We work the step-size math on a real ripple job to show when 12 bits beats 200 MHz.",
  a: {
    pick: ds1202,
    imageAlt: "Rigol DS1202Z-E 200 MHz two-channel 8-bit oscilloscope",
    chooseIf: [
      "You look at clocks above 15 MHz or edges faster than about 15 ns",
      "You check signal integrity: overshoot, ringing and reflections on fast lines",
      "You want 350 MHz probes in the standard kit, per Rigol's datasheet",
      "You prefer physical knobs and a conventional mains-powered bench scope",
    ],
  },
  b: {
    pick: dho802,
    imageAlt: "Rigol DHO802 two-channel 12-bit oscilloscope with touchscreen",
    chooseIf: [
      "You measure small changes on larger signals: ripple, sensor drift, audio distortion",
      "You want CAN decoding and up to four decoders at once",
      "You want a lighter scope that runs from a USB-C 15 V supply",
      "You hunt rare glitches and value 1,000,000 wfms/s in UltraAcquire mode",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit (12-bit High Resolution mode)", b: "12-bit" },
    { label: "Step size at 1 V/div (8 div, calculated)", a: "≈ 31 mV", b: "≈ 2 mV" },
    { label: "Rise time", a: "1.75 ns (calculated)", b: "5 ns (typical)" },
    { label: "Sample rate, both channels", a: "500 MSa/s each", b: "625 MSa/s each" },
    { label: "Memory", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "25 Mpts (1 ch); 10 Mpts (2 ch)" },
    { label: "Max capture rate", a: "30,000 wfms/s", b: "1,000,000 wfms/s (UltraAcquire)" },
    { label: "Serial decoding", a: "Parallel, UART, I2C, SPI (2 buses)", b: "Parallel, UART, I2C, SPI, CAN (4 at once)" },
    { label: "Display", a: "7-inch 800 × 480", b: "7-inch 1024 × 600 capacitive touch, HDMI out" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "USB-C, DC 15 V 3 A, 45 W max" },
    { label: "Size and weight", a: "313 × 161 × 122 mm, 2.9 kg", b: "265 × 162 × 77 mm, 1.78 kg" },
  ],
  differences: [
    "Resolution: 12-bit on the DHO802 (4,096 levels) against 8-bit on the DS1202Z-E (256 levels), 16 times finer steps.",
    "Bandwidth: 200 MHz on the DS1202Z-E against 70 MHz on the DHO802; rise time 1.75 ns against 5 ns.",
    "Capture rate: up to 1,000,000 wfms/s on the DHO802 in UltraAcquire mode, against 30,000 on the DS1202Z-E. Both list 30,000 in normal display mode.",
    "Decoding: the DHO802 adds CAN and runs four decoders at once; the DS1202Z-E decodes parallel, UART, I2C and SPI on two buses.",
    "The DHO802 is 1.1 kg lighter and 45 mm shallower, runs from USB-C and adds a touchscreen and HDMI. The DS1202Z-E runs from mains.",
    "Both have two channels, 500 µV/div sensitivity, about 24 to 25 Mpts of single-channel memory and a three-year warranty.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Rigol's datasheets.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The DS1202Z-E wins the speed rows; the DHO802 wins resolution, capture rate and almost everything physical.
          Capture rate needs a log scale.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth from Rigol&apos;s datasheets.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Rigol DHO802", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Converter levels across the full screen: 2⁸ against 2¹², log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO802", value: 4096, display: "4,096 (12-bit)", highlight: true },
                { label: "Rigol DS1202Z-E", value: 256, display: "256 (8-bit)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum waveform capture rate, log scale. The DHO802 figure is in UltraAcquire mode.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO802", value: 1_000_000, display: "1,000,000 wfms/s", highlight: true },
                { label: "Rigol DS1202Z-E", value: 30_000, display: "30,000 wfms/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without packaging.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 2.9, display: "2.9 kg" },
                { label: "Rigol DHO802", value: 1.78, display: "1.78 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When 12 bits beats 200 MHz: a ripple job worked through</h2>
        <p className="text-muted leading-7 mb-4">
          Converter step size = full-scale range ÷ number of levels. On an 8-division screen at 1 V/div, full scale is 8
          V. The DS1202Z-E divides that into 256 steps of about 31 mV; the DHO802 into 4,096 steps of about 2 mV. Now
          look at a 5 V rail with 10 mV of ripple, DC-coupled so you can watch the rail come up and the ripple at the
          same setting.
        </p>
        <Figure
          caption={
            <>
              The same 10 mV of ripple on a 5 V rail at 1 V/div. On the 8-bit scope it is a third of one step and
              disappears; on the 12-bit scope it spans about five steps. Illustrative.
            </>
          }
        >
          <QuantizationDiagram />
        </Figure>
        <DataTable
          head={["Setting (8 divisions)", "DS1202Z-E step", "DHO802 step", "10 mV ripple on DS1202Z-E", "On DHO802"]}
          rows={[
            ["1 V/div, DC-coupled 5 V rail", "31 mV", "2 mV", "0.3 steps: invisible", "5 steps: visible"],
            ["100 mV/div", "3.1 mV", "0.2 mV", "3 steps: blocky", "50 steps: smooth"],
            ["5 mV/div, AC-coupled", "0.16 mV", "0.01 mV", "64 steps: fine", "1,000 steps: fine"],
          ]}
        />
        <p className="text-muted leading-7 my-4">
          The last row is the catch: if you can AC-couple and zoom to 5 mV/div, the 8-bit scope sees the ripple well.
          The 12-bit advantage is for signals where you can&apos;t zoom in that far: small detail riding on a large
          level, a startup transient and its ripple in one capture, or audio distortion a few tenths of a percent
          below a big sine.
        </p>
        <KeyIdea title="High Resolution mode isn't the same thing">
          The DS1202Z-E lists a High Resolution mode of up to 12 bits. Modes like this generally work by averaging
          neighboring samples, which trades away bandwidth and only helps on signals slow enough to average.
          The DHO802&apos;s 12 bits are native, at its full 70 MHz.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1202Z-E vs Rigol DHO802: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Supply ripple during power-up, DC-coupled", "DHO802", "2 mV steps at 1 V/div against 31 mV"],
            ["Audio amp distortion and noise", "DHO802", "12-bit shows small errors on big signals"],
            ["20 to 40 MHz clock signal integrity", "DS1202Z-E", "200 MHz keeps the 5th harmonic"],
            ["Ringing on a fast gate or logic edge", "DS1202Z-E", "1.75 ns rise time against 5 ns"],
            ["CAN bus in a vehicle module", "DHO802", "CAN decoding listed; the DS1202Z-E has none"],
            ["Rare glitch hunting", "DHO802", "1,000,000 wfms/s in UltraAcquire mode"],
            ["Bench space is tight or you work off a power bank", "DHO802", "265 × 162 × 77 mm, USB-C 15 V"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1202Z-E: the faster eye</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1202Z-E handles clocks to about 40 MHz and edges to roughly 5 to 9 ns, with 2 ns/div as its fastest
          timebase. It&apos;s the better scope for signal integrity on fast digital lines. With both channels on it has
          2.5 samples per cycle at 200 MHz, which is thin for single shots. Its 8 bits limit it whenever you need small
          detail on a big signal.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO802: the finer eye</h3>
        <p className="text-muted leading-7 mb-4">
          The DHO802 suits analog, power and audio work, sensors and mixed embedded debugging up to about 14 MHz
          clocks (70 ÷ 5). With both channels on it keeps 625 MSa/s, almost 9 samples per cycle at 70 MHz, and Rigol
          lists 33 automatic measurements and a 1 Mpt FFT. Its 5 ns rise time reads edges accurately only down to
          about 15 to 25 ns.
        </p>
        <Callout title="Neither input is isolated">
          Rigol rates the DHO802&apos;s inputs CAT I 300 Vrms, 400 Vpk, and the DS1202Z-E&apos;s CAT I 300 Vrms and
          CAT II 100 Vrms. The DHO802&apos;s USB-C supply doesn&apos;t make it a floating instrument. On mains or
          high-voltage DC, use a differential probe; call an electrician for building wiring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: whose datasheet says what</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes come from current Rigol datasheets, and on the points that decide this comparison they
          don&apos;t conflict. The weak spots are smaller: the DS1202Z-E&apos;s Amazon listing in our Pick is sold
          through a reseller, so check that it includes Rigol&apos;s standard 350 MHz probes, and the DHO802&apos;s
          million-waveform figure applies only in UltraAcquire mode, with 30,000 wfms/s in normal vector display.
        </p>
        <p className="text-muted leading-7">
          Related comparisons:{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            Rigol DHO802 vs DS1054Z
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" className={link}>
            Siglent SDS1104X-E vs Rigol DHO802
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" className={link}>
            Rigol DHO802 vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1102Z-E vs DS1202Z-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1054Z vs DS1202Z-E
          </Link>
          . For the four-channel version of the 12-bit scope, see{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho804" className={link}>
            Rigol DHO814 vs DHO804
          </Link>
          . Our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            measuring ripple voltage
          </Link>{" "}
          covers the AC-coupling method.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Pick the Rigol DHO802 for analog, power, audio and general embedded work: 12-bit resolution, CAN decoding, up to 1,000,000 wfms/s, a touchscreen and USB-C power in a 1.78 kg body. Pick the Rigol DS1202Z-E when speed matters more than fine detail, for 20 to 40 MHz clocks, fast edges and ringing, where its 200 MHz and 1.75 ns rise time see what the DHO802 smooths away.",
  chooseNeitherIf:
    "You need more than two channels. Both are two-channel scopes; the Rigol DHO804 gives four 12-bit channels and the Rigol DS1054Z four 8-bit ones.",
  faqs: [
    {
      question: "Is 12-bit better than 200 MHz?",
      answer:
        "For different jobs. 12 bits gives 16 times finer vertical steps, which shows small detail on larger signals such as ripple on a DC rail or audio distortion. 200 MHz shows fast edges and high-frequency clocks faithfully. If your signals stay under about 14 MHz, the DHO802's resolution usually helps more.",
    },
    {
      question: "Does the DS1202Z-E's High Resolution mode match the DHO802?",
      answer:
        "Not in general. Rigol lists up to 12 bits in High Resolution mode for the DS1202Z-E, but modes like this typically average neighboring samples, which lowers effective bandwidth and doesn't help single fast events. The DHO802 samples at 12 bits natively across its 70 MHz bandwidth.",
    },
    {
      question: "Can the DHO802 run from a power bank?",
      answer:
        "Rigol lists its power input as USB Type-C at DC 15 V, 3 A, with up to 45 W drawn. A power bank would need to supply 15 V over USB-C Power Delivery at that current. The DS1202Z-E needs 100 to 240 V AC mains at up to 50 W.",
    },
    {
      question: "Which one decodes CAN bus?",
      answer:
        "The DHO802. Rigol's DHO800 datasheet lists parallel, RS232/UART, I2C, SPI and CAN decoding as standard, with up to four decodes enabled at once. The DS1000Z-E datasheet lists parallel, RS232/UART, I2C and SPI decoding on two buses for the DS1202Z-E, without CAN.",
    },
    {
      question: "How much smaller is the DHO802?",
      answer:
        "Rigol lists the DHO802 at 265.35 × 161.75 × 77.38 mm and 1.78 kg without packaging, against 313.1 × 160.8 × 122.4 mm and 2.9 kg for the DS1202Z-E. The DHO802 is about 45 mm shallower and 1.1 kg lighter, which helps on a crowded bench.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DS1102Z-E vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1054Z vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "How to measure ripple voltage", href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function RigolDs1202zEVsRigolDho802Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
