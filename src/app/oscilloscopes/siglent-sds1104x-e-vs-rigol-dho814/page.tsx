import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS1104X-E per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/
// (checked 2026-11-07): 100 MHz, 4 channels, 1 GSa/s, 7 Mpts/ch (14 Mpts/ch interleaved), 100,000 wfm/s normal and
// 400,000 wfm/s sequence, 7-inch 800 x 480 TFT-LCD, 500 uV/div to 10 V/div, free IIC/SPI/UART/RS232/CAN/LIN trigger and
// decode, 80,000-frame history, 1 Mpt FFT, optional 16-channel MSO, Bode plot driving an external Siglent SDG/SAG
// generator and web-browser control on 4-channel models. 500 MSa/s with all four channels on per Siglent's application
// note https://siglentna.com/application-note/differences_xe_vs_xu/ (checked 2026-11-07). 8-bit resolution and
// 100-240 V AC, 50 W max per Siglent's SDS1000X-E data sheet https://siglentna.com/download/22005/ (as cited on
// /oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e, checked 2026-10-24). Rise time not on the series page; the
// 0.35 / bandwidth estimate is labeled as an estimate.
// Rigol DHO814 per Rigol's DHO800 data sheet,
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
// (checked 2026-11-07): 100 MHz, 3.5 ns typical, 12-bit, 1.25 GSa/s / 625 MSa/s / 312.5 MSa/s, 25 / 10 / 5 Mpts,
// 30,000 wfms/s vector and 1,000,000 UltraAcquire, 500 uV/div to 10 V/div, decode Parallel/RS232-UART/I2C/SPI/CAN,
// 7-inch 1024 x 600 touchscreen, HDMI, USB-C 15 V 3 A, 1.78 kg; no digital channels or generator control.
// Amazon: SDS1104X-E B0771N1ZF9 and DHO814 B0H1HVQRBF in stock at ZIP 10001 (checked 2026-11-08).
// SDS1104X-E is owner-tested (handsOnTested); no measurements from that unit are published here.
// Quantization steps below are arithmetic (8 divisions x V/div / 2^bits), not measurements.

const path = "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814";
const sds = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho814 = picks.find((p) => p.name === "Rigol DHO814")!;

export const metadata = buildMetadata({
  title: "Siglent SDS1104X-E vs Rigol DHO814: 8 or 12-bit",
  description:
    "Siglent SDS1104X-E vs Rigol DHO814: both 100 MHz four-channel scopes, but one samples faster with all channels on and the other resolves 16 times finer steps.",
  path: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho814",
  image: sds.image,
});

const link = "text-accent hover:underline";

/** Quantization at 10 mV/div: 80 mV full scale over 256 levels (8-bit) against 4,096 levels (12-bit). */
function StepDiagram() {
  const coarse = [0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, -1, -1, 0, 0];
  const pts = (scale: number, yBase: number, arr: number[]) =>
    `M40 ${yBase - arr[0] * scale} ` +
    arr.map((v, i) => `V${yBase - v * scale} H${40 + (i + 1) * 18}`).join(" ");
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="Siglent SDS1104X-E vs Rigol DHO814 resolution diagram: a 1 mV ripple at 10 mV/div spans about three 0.31 mV steps on an 8-bit scope, drawn as a staircase, and about fifty 0.02 mV steps on a 12-bit scope, drawn as a smooth curve."
    >
      <text x="40" y="20" fontSize="10" fontWeight="700" className="fill-foreground">8-bit (SDS1104X-E): 80 mV ÷ 256 = 0.31 mV per step</text>
      <path d={pts(18, 90, coarse)} className="fill-none stroke-muted" strokeWidth="1.8" />
      <path d="M40 90 q40 -40 80 -36 t80 0 t80 36 t80 0" className="fill-none stroke-foreground" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="40" y="118" fontSize="10" fontWeight="700" className="fill-foreground">12-bit (DHO814): 80 mV ÷ 4,096 = 0.02 mV per step</text>
      <path d="M40 195 q40 -40 80 -36 t80 0 t80 36 t80 0" className="fill-none stroke-accent" strokeWidth="1.8" />
      <text x="370" y="60" fontSize="8.5" textAnchor="end" className="fill-muted">3 steps tall</text>
      <text x="370" y="165" fontSize="8.5" textAnchor="end" className="fill-accent">about 50 steps tall</text>
      <text x="200" y="214" fontSize="8.5" textAnchor="middle" className="fill-muted">Illustrative 1 mV ripple at 10 mV/div; arithmetic, not a capture</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E vs Rigol DHO814: Speed or Resolution?",
  path,
  published: "2026-11-08",
  intro:
    "Siglent SDS1104X-E vs Rigol DHO814 matches two 100 MHz, four-channel bench scopes that split along one line. The SDS1104X-E keeps 500 MSa/s per channel with all four on and updates at up to 100,000 waveforms a second; the DHO814 drops to 312.5 MSa/s but quantizes in 12 bits instead of 8, on a 1024 × 600 touchscreen. Fast edges favor the Siglent; small signals favor the Rigol.",
  a: {
    pick: sds,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You routinely run all four channels on fast digital signals",
      "You want the optional 16-channel MSO upgrade path",
      "You want Bode plots driven from a Siglent generator",
      "You prefer physical buttons to a touchscreen",
    ],
  },
  b: {
    pick: dho814,
    imageAlt: "Rigol DHO814 four-channel 100 MHz 12-bit touchscreen oscilloscope, front panel",
    chooseIf: [
      "You measure ripple, noise or small signals riding on large ones",
      "You want a 1024 × 600 touchscreen and HDMI output",
      "You want a 1.78 kg scope that runs on USB-C power",
      "You want deeper memory: 25 Mpts against 14 Mpts at best",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Sample rate, all 4 channels on", a: "500 MSa/s", b: "312.5 MSa/s" },
    { label: "Memory", a: "7 Mpts/ch; 14 Mpts/ch interleaved", b: "25 / 10 / 5 Mpts (1 / 2 / 4 ch)" },
    { label: "Waveform rate", a: "100,000 wfm/s; 400,000 sequence", b: "30,000 wfms/s; 1,000,000 UltraAcquire" },
    { label: "Rise time", a: "About 3.5 ns (0.35 ÷ BW estimate)", b: "3.5 ns typical (Rigol)" },
    { label: "Display", a: "7-inch 800 × 480, buttons", b: "7-inch 1024 × 600 touchscreen" },
    { label: "Standard decode", a: "I2C, SPI, UART, RS232, CAN, LIN", b: "Parallel, RS232/UART, I2C, SPI, CAN" },
    { label: "Logic channels", a: "16-channel MSO option", b: "None" },
    { label: "Bode plot", a: "Yes, with an external Siglent generator", b: "Not listed" },
    { label: "Power", a: "100–240 V AC, 50 W max", b: "USB-C 15 V 3 A, 45 W max" },
  ],
  differences: [
    "Resolution: 8-bit on the SDS1104X-E, 12-bit on the DHO814, so 256 levels against 4,096 across the screen.",
    "Four-channel sample rate: 500 MSa/s on the Siglent against 312.5 MSa/s on the Rigol. With one channel on, the Rigol leads, 1.25 GSa/s against 1 GSa/s.",
    "Memory: the DHO814 holds up to 25 Mpts; the SDS1104X-E holds 7 Mpts per channel, or 14 Mpts when channels are interleaved.",
    "Update rate: 100,000 wfm/s normal on the Siglent against Rigol's 30,000 wfms/s vector mode; Rigol's UltraAcquire mode lists 1,000,000.",
    "Expansion: the SDS1104X-E has an optional 16-channel logic upgrade and Bode plot control of an external generator; the DHO814 has neither.",
    "Same bandwidth (100 MHz), same 500 µV/div most sensitive scale, both with standard serial decode and four channels.",
    "The SDS1104X-E carries our Hands-on Tested badge; the DHO814 assessment is desk research against Rigol's data sheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The charts trade off against each other on purpose. The Siglent wins the speed figures with all channels on;
          the Rigol wins detail and memory.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 500, display: "500 MSa/s", highlight: true },
                { label: "Rigol DHO814", value: 312.5, display: "312.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels across the screen, log scale: 2⁸ against 2¹².</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DHO814", value: 4096, display: "4,096 levels", highlight: true },
                { label: "Siglent SDS1104X-E", value: 256, display: "256 levels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum memory per channel from each maker.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO814", value: 25, display: "25 Mpts", highlight: true },
                { label: "Siglent SDS1104X-E", value: 14, display: "14 Mpts (interleaved)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Normal-mode waveform update rate, log scale. Special modes: 400,000 (Siglent) and 1,000,000 (Rigol).</>}>
            <BarChart
              log
              items={[
                { label: "Siglent SDS1104X-E", value: 100000, display: "100,000 wfm/s", highlight: true },
                { label: "Rigol DHO814", value: 30000, display: "30,000 wfms/s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With four channels on, 500 MSa/s gives 5 samples per cycle at the full 100 MHz bandwidth, and 312.5 MSa/s gives
          about 3. Both reconstruct sine waves with interpolation, but on a 20 MHz clock that is 25 samples per period
          against about 16, and the edges of a fast square wave show the difference first. See{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explained
          </Link>{" "}
          for why the ratio matters.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-E vs Rigol DHO814: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Output ripple on a 5 V or 12 V supply", "Rigol DHO814", "12-bit steps show millivolt ripple without staircasing"],
            ["Four fast logic lines at once", "Siglent SDS1104X-E", "500 MSa/s per channel against 312.5"],
            ["Rare glitch hunting", "Siglent SDS1104X-E", "100,000 wfm/s in normal mode plus 80,000-frame history"],
            ["Audio distortion and noise floor", "Rigol DHO814", "Finer quantization at sensitive scales"],
            ["Filter frequency response", "Siglent SDS1104X-E", "On-screen Bode plot with a Siglent generator"],
            ["Field or portable bench", "Rigol DHO814", "USB-C power and 1.78 kg"],
            ["A parallel bus or many GPIO lines", "Siglent SDS1104X-E", "Only one with a 16-channel logic option"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Siglent SDS1104X-E: speed across four channels</h3>
        <p className="text-muted leading-7 mb-4">
          Siglent&apos;s own application note explains why the SDS1104X-E keeps 500 MSa/s with all four channels on: it
          uses two analog-to-digital converters, one per channel pair. That makes it the better four-channel scope for
          digital timing work. Its weak point is small signals. At 10 mV/div the 8-bit converter steps in about 0.31 mV,
          so a 1 mV ripple is drawn as three or four levels and noise looks blocky. It is also the one with an upgrade path:
          a 16-channel logic option and Bode plot control of an external Siglent generator.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO814: detail on a slower four-channel clock</h3>
        <p className="text-muted leading-7 mb-4">
          The same 10 mV/div range on the DHO814&apos;s 12-bit converter steps in about 0.02 mV, so the 1 mV ripple has
          around fifty levels to draw with. That matters for supply ripple, sensor outputs and audio, where the signal you
          care about is small. Its 25 Mpts memory also holds longer captures with one channel on. What it gives up is
          four-channel sample rate, logic inputs and Bode plot. Rigol lists no logic option for the DHO800 series.
        </p>
        <Figure
          caption={
            <>
              The same 1 mV ripple at 10 mV/div. On 8 bits it spans about three steps; on 12 bits about fifty. Arithmetic
              on each converter&apos;s resolution, not a screen capture.
            </>
          }
        >
          <StepDiagram />
        </Figure>
        <div className="mt-4">
          <KeyIdea title="12 bits helps most when you can't zoom in">
            If the small signal sits alone, both scopes can switch to a sensitive range and AC-couple it, and 8 bits is
            fine. The 12-bit advantage shows when the small detail rides on something large you also need to see, such as
            ringing on a 12 V switching edge. Then the scale is set by the big signal and the extra bits carry the detail.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains-powered scope, earthed probes">
            The SDS1104X-E runs from mains and its probe grounds connect to earth. Clipping a ground lead to a
            non-ground point in a mains-powered circuit causes a short through the scope. Use a differential probe for
            anything mains referenced, on either model.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The question with the DHO814: does 12-bit hold up with four channels on?</h2>
        <p className="text-muted leading-7 mb-4">
          The DHO814&apos;s resolution doesn&apos;t change with channel count, but its sample rate and memory do: 312.5
          MSa/s and 5 Mpts each with three or four on. That is still a 16 ms full-rate window, close to the 14 ms
          the SDS1104X-E&apos;s 7 Mpts per channel at 500 MSa/s gives. For most hobby work the DHO814 stays the stronger analog
          instrument. The SDS1104X-E is the scope with our Hands-on Tested badge; this page doesn&apos;t quote bench
          measurements from it, only Siglent&apos;s and Rigol&apos;s published figures.
        </p>
        <p className="text-muted leading-7">
          Read the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>{" "}
          for the full picture, and see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO804 vs SDS1104X-E
          </Link>{" "}
          for the 70 MHz Rigol against the same Siglent. The DHO814 against Siglent&apos;s own 12-bit model is on{" "}
          <Link href="/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" className={link}>
            Siglent SDS814X HD vs Rigol DHO814
          </Link>
          , and the DHO814 against Rigol&apos;s logic-capable step up is on{" "}
          <Link href="/oscilloscopes/rigol-dho814-vs-rigol-dho914" className={link}>
            Rigol DHO814 vs DHO914
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Siglent SDS1104X-E if you run all four channels on fast digital signals, hunt rare glitches or want a logic and Bode plot upgrade path: it keeps 500 MSa/s per channel and updates at 100,000 wfm/s. Buy the Rigol DHO814 if your signals are small, such as supply ripple, sensor outputs or audio: its 12-bit converter resolves 16 times finer steps, with 25 Mpts of memory, a touchscreen and USB-C power.",
  chooseNeitherIf:
    "You need more than 100 MHz. Both top out there; for faster clocks and edges look at a 200 MHz or 250 MHz model such as the Rigol DHO924S.",
  faqs: [
    {
      question: "Is 12-bit worth it over 8-bit on a hobby scope?",
      answer:
        "It is when small details sit on large signals, such as ripple on a supply or ringing on a switching edge. At 10 mV/div an 8-bit scope steps in about 0.31 mV and a 12-bit scope in about 0.02 mV. For logic timing, serial decoding and most digital work, 8 bits shows everything you need.",
    },
    {
      question: "Why does the SDS1104X-E keep 500 MSa/s with four channels on?",
      answer:
        "Siglent's application note says the four-channel SDS1000X-E models use two analog-to-digital converters, each shared by a channel pair, so all four channels can run at 500 MSa/s. Rigol's data sheet lists 312.5 MSa/s per channel for the DHO814 with three or four channels on.",
    },
    {
      question: "Does the DHO814 have a touchscreen and the SDS1104X-E not?",
      answer:
        "Yes. Rigol lists a 7-inch 1024 × 600 capacitive multi-touch screen on the DHO814. Siglent lists a 7-inch 800 × 480 TFT-LCD on the SDS1104X-E, operated through buttons and knobs, with 10 one-button shortcuts. Some people prefer knobs at the bench; touch helps when dragging cursors and zooming.",
    },
    {
      question: "Which one decodes more serial buses?",
      answer:
        "Close to a tie. Siglent lists I2C, SPI, UART, RS232, CAN and LIN as free on the SDS1104X-E. Rigol lists parallel, RS232/UART, I2C, SPI and CAN as standard on the DHO814. LIN is the Siglent's extra; parallel is the Rigol's. Both decode common microcontroller buses out of the box.",
    },
    {
      question: "Can either scope run without mains power?",
      answer:
        "The DHO814 takes power through USB Type-C at 15 V and 3 A (45 W max), so a USB-C PD source that offers 15 V at that current can run it. The SDS1104X-E takes 100 to 240 V AC per Siglent's data sheet and needs mains or an inverter.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS814X HD vs Rigol DHO814", href: "/oscilloscopes/siglent-sds814x-hd-vs-rigol-dho814" },
    { label: "Rigol DHO814 vs Rigol DHO914", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho914" },
    { label: "Siglent SDS814X HD vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds814x-hd-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-U vs Siglent SDS1104X-E", href: "/oscilloscopes/siglent-sds1104x-u-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Rigol DHO814", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-dho814" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function SiglentSds1104xEVsRigolDho814Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
