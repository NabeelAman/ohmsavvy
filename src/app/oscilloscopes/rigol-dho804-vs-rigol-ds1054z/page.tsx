// Specs per Rigol, checked 2026-10-26:
// - DHO800 series page: https://www.rigolna.com/products/digital-oscilloscopes/dho800/
// - DHO800 datasheet: https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-11201b15-e890-4a0d-ba67-cbbc4c525562/1/-/-/-/-/DHO800_DataSheet_EN.pdf
//   (DHO804: 70 MHz, rise time 5 ns typical; 1.25 GSa/s single, 625 MSa/s dual, 312.5 MSa/s all four; 25/10/5 Mpts;
//   12-bit; 30,000 wfms/s vector, 1,000,000 wfms/s UltraAcquire; 500,000-frame hardware recording; 1024 × 600 touchscreen;
//   vertical scale from a magnified 500 µV/div (1 mV/div setting) to 10 V/div; max input CAT I 300 Vrms, 400 Vpk;
//   standard decode Parallel, RS232/UART, I2C, SPI, CAN; HDMI 1.4; USB-C power DC 15 V, 3 A, max 45 W;
//   265.35 × 161.75 × 77.38 mm, 1.78 kg).
// - DS1000Z series page: https://www.rigolna.com/products/digital-oscilloscopes/1000z/ (12 Mpts standard; bus decode optional)
// - DS1000Z datasheet: https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf
//   (DS1054Z: DC to 50 MHz, calculated rise time 7 ns; 1 GSa/s single, 500 MSa/s dual, 250 MSa/s three/four channels;
//   analog vertical resolution 8 bits; 1 mV/div to 10 V/div; 30,000 wfms/s; up to 60,000-frame recording;
//   7.0-inch 800 × 480; USB host/device, LAN, Aux out; max input CAT I 300 Vrms; 313.1 × 160.8 × 122.4 mm, 3.2 kg).
// Quantization and record-time figures below are arithmetic on those specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z";

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs Rigol DS1054Z",
  description:
    "Rigol DHO804 vs Rigol DS1054Z: 12-bit resolution, 70 MHz and a touchscreen against the classic 50 MHz four-channel scope. Specs, charts and who should upgrade.",
  path: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z",
});

const link = "text-accent hover:underline";

/** A small sine quantized coarsely (8-bit-like) and finely (12-bit-like): the same signal, different step sizes. */
function QuantizationDiagram() {
  const W = 340;
  const mid = 70;
  const amp = 40;
  const pts = Array.from({ length: 121 }, (_, i) => {
    const x = 20 + (i / 120) * (W - 40);
    const y = Math.sin((i / 120) * Math.PI * 2) * amp;
    return { x, y };
  });
  const coarse = 13; // px per step: exaggerated to show the staircase
  const fine = coarse / 16;
  const stair = (step: number, off: number) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${(off - Math.round(p.y / step) * step).toFixed(1)}`).join(" ");
  return (
    <svg
      viewBox={`0 0 ${W} 250`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the same small sine wave drawn with coarse 8-bit steps, which look like a staircase, and with 12-bit steps, which are 16 times finer and follow the curve smoothly"
    >
      <text x="20" y="16" fontSize="10.5" fontWeight="700" className="fill-muted">8-bit: 256 levels across the screen</text>
      <line x1="20" x2={W - 20} y1={mid} y2={mid} className="stroke-border" strokeWidth="0.6" />
      <path d={stair(coarse, mid)} className="stroke-foreground fill-none" strokeWidth="1.8" />
      <text x="20" y="140" fontSize="10.5" fontWeight="700" className="fill-accent">12-bit: 4,096 levels, 16× finer steps</text>
      <line x1="20" x2={W - 20} y1={mid + 125} y2={mid + 125} className="stroke-border" strokeWidth="0.6" />
      <path d={stair(fine, mid + 125)} className="stroke-accent fill-none" strokeWidth="1.8" />
      <text x={W / 2} y="244" fontSize="9" textAnchor="middle" className="fill-muted">
        Steps exaggerated for clarity; the real ratio is 16:1.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs Rigol DS1054Z",
  path,
  published: "2026-10-22",
  updated: "2026-10-26",
  intro:
    "Rigol DHO804 vs Rigol DS1054Z is old favorite against new generation. Both are four-channel Rigol scopes for hobbyists and students. The DHO804 moves to 12-bit vertical resolution, 70 MHz, a 1024 × 600 touchscreen and USB-C power; the DS1054Z keeps the familiar 8-bit, 50 MHz platform with optional serial decoding and a large community behind it.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO804")!,
    imageAlt: "Rigol DHO804 12-bit four-channel oscilloscope, front panel",
    chooseIf: [
      "You want 12-bit resolution to see small signals riding on larger ones",
      "You want a touchscreen, HDMI output and serial decoding included",
      "You want a compact scope that can run from a USB-C power source",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel digital oscilloscope",
    chooseIf: [
      "You want the scope most tutorials and forums are written around",
      "50 MHz is enough for your microcontroller and audio work",
      "You prefer physical knobs and menus to a touchscreen",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "12-bit", b: "8-bit (DS1000Z datasheet)" },
    { label: "Rise time", a: "5 ns typical", b: "7 ns calculated" },
    { label: "Sample rate, 1 / 2 / 4 channels", a: "1.25 GSa/s / 625 MSa/s / 312.5 MSa/s", b: "1 GSa/s / 500 MSa/s / 250 MSa/s" },
    { label: "Memory depth", a: "25 Mpts (1 ch); 5 Mpts (4 ch)", b: "12 Mpts standard; 24 Mpts optional" },
    { label: "Waveform rate", a: "30,000 wfms/s; 1,000,000 in UltraAcquire", b: "30,000 wfms/s" },
    { label: "Hardware recording", a: "Up to 500,000 frames", b: "Up to 60,000 frames" },
    { label: "Vertical scale", a: "500 µV/div (magnified) to 10 V/div", b: "1 mV/div to 10 V/div" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch 800 × 480" },
    { label: "Serial decoding", a: "Standard: UART, I2C, SPI, CAN, parallel", b: "Optional: RS232/UART, I2C, SPI" },
    { label: "Video out / power", a: "HDMI; USB-C, 15 V 3 A", b: "No HDMI; mains powered" },
    { label: "Size / weight", a: "265 × 162 × 77 mm, 1.78 kg", b: "313 × 161 × 122 mm, 3.2 kg" },
    { label: "Max input (1 MΩ)", a: "CAT I 300 Vrms", b: "CAT I 300 Vrms" },
    { label: "Generator / logic", a: "None", b: "None" },
  ],
  differences: [
    "The DHO804 is a 12-bit scope; Rigol's DS1000Z datasheet lists 8 bits for the DS1054Z's analog channels, so the DHO804 has 16 times as many vertical levels.",
    "The DHO804 has 70 MHz of bandwidth and a 5 ns rise time against the DS1054Z's 50 MHz and 7 ns.",
    "With all four channels running, the DHO804 samples at 312.5 MSa/s per channel against 250 MSa/s.",
    "Serial decoding is standard on the DHO804 and optional on the DS1000Z series.",
    "The DHO804 adds a capacitive touchscreen, HDMI output and USB-C power, and weighs 1.78 kg against the DS1054Z's 3.2 kg.",
    "Both list 30,000 waveforms per second in normal mode; the DHO804's UltraAcquire mode raises that to 1,000,000.",
    "Both scopes carry our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">At a glance</h2>
        <InfoCards
          items={[
            { label: "Same channel count", desc: "Four analog channels on both, no logic channels, no generator." },
            { label: "DHO804 extra: 12 bits", desc: "4,096 vertical levels against 256 on the DS1054Z." },
            { label: "DHO804 extra: speed", desc: "70 MHz, 5 ns rise time, 312.5 MSa/s with four channels on." },
            { label: "DHO804 extra: decoding", desc: "UART, I2C, SPI, CAN and parallel included." },
            { label: "DS1054Z strength", desc: "Physical controls and years of tutorials written around it." },
            { label: "Verdict", desc: "New buyers: DHO804. Following a course built on it: DS1054Z." },
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs DS1054Z spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes share one sample-rate budget across their channels, so the figure that matters for
          four-channel work is the per-channel rate with everything switched on. Rigol&apos;s datasheets put the
          DHO804 ahead on every axis it publishes, from bandwidth to recording depth, with the normal-mode waveform
          rate the one tie.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Rigol.</>}>
            <BarChart
              items={[
                { label: "DHO804", value: 70, display: "70 MHz", highlight: true },
                { label: "DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "DHO804", value: 312.5, display: "312.5 MSa/s", highlight: true },
                { label: "DS1054Z", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Hardware recording depth in frames, log scale, per Rigol&apos;s datasheets.</>}>
            <BarChart
              log
              items={[
                { label: "DHO804", value: 500000, display: "500,000", highlight: true },
                { label: "DS1054Z", value: 60000, display: "60,000" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight without packaging, in kilograms.</>}>
            <BarChart
              items={[
                { label: "DHO804", value: 1.78, display: "1.78 kg", highlight: true },
                { label: "DS1054Z", value: 3.2, display: "3.2 kg" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Record time follows from memory divided by sample rate. With one channel on, the DHO804 holds 25 Mpts at
          1.25 GSa/s, which is 20 ms of signal at full speed; a standard DS1054Z holds 12 Mpts at 1 GSa/s, or 12 ms.
          With all four channels on, the DHO804 keeps 5 Mpts at 312.5 MSa/s, which is 16 ms per channel.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What 12 bits buys you</h2>
        <p className="text-muted leading-7 mb-4">
          An oscilloscope&apos;s converter splits the screen&apos;s vertical span into equal steps. Eight bits gives
          256 steps, twelve gives 4,096. At 10 mV/div across eight divisions, the screen spans 80 mV, so the DS1054Z
          resolves about 0.31 mV per step and the DHO804 about 0.02 mV. That is the arithmetic; real noise sets the
          floor you can actually see.
        </p>
        <Figure caption={<>The same signal digitized at two resolutions. The DHO804&apos;s steps are 16 times smaller.</>}>
          <QuantizationDiagram />
        </Figure>
        <DataTable
          head={["ADC resolution", "Vertical levels", "Step at 10 mV/div (80 mV span)", "Step at 1 V/div (8 V span)"]}
          rows={[
            ["8-bit (DS1054Z)", "256", "≈ 0.31 mV", "≈ 31 mV"],
            ["12-bit (DHO804)", "4,096", "≈ 0.02 mV", "≈ 2 mV"],
          ]}
          mono={[1, 2, 3]}
        />
        <div className="mt-4">
          <KeyIdea title="When the extra bits help">
            Sixteen times as many levels means you can zoom into ripple, noise or a small sensor signal without
            the trace breaking into visible steps. For square-wave logic work the difference is far smaller. Read{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
              what oscilloscope bandwidth means
            </Link>{" "}
            for the other half of the picture, and{" "}
            <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
              measuring ripple voltage
            </Link>{" "}
            for the job where 12 bits show most.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs DS1054Z: which should you buy?</h2>
        <DataTable
          head={["You are…", "Better fit", "Why"]}
          rows={[
            ["Buying a first scope today", "Rigol DHO804", "More bandwidth, 12 bits and decoding included"],
            ["Debugging I2C, SPI or CAN", "Rigol DHO804", "Decoding is standard; it's an option on the DS1000Z"],
            ["Checking power-supply ripple", "Rigol DHO804", "16× finer vertical steps on small AC signals"],
            ["Following a course built on the DS1054Z", "Rigol DS1054Z", "Menus and screenshots match what you'll see"],
            ["Prefer knobs to a touchscreen", "Rigol DS1054Z", "Conventional front panel"],
            ["Teaching or presenting", "Rigol DHO804", "HDMI out to a monitor or projector"],
            ["Portable bench or field work", "Rigol DHO804", "1.78 kg and runs from USB-C power"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use cases in practice</h2>
        <p className="text-muted leading-7 mb-4">
          For Arduino and Raspberry Pi work, the deciding factor is usually serial decoding. Watching a UART or I2C
          bus as text rather than counting edges saves time, and on the DHO804 it costs nothing extra. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem" className={link}>
            diagnosing a UART problem with an oscilloscope
          </Link>{" "}
          shows the workflow.
        </p>
        <p className="text-muted leading-7 mb-4">
          For audio and analog circuits, 12 bits and the extra rise-time margin make the DHO804 the cleaner tool. A
          5 ns rise time against 7 ns matters little on audio itself, but helps on the switching edges of class-D
          amplifiers and buck converters. The DS1054Z still does the job; it just draws a coarser trace when you zoom
          in.
        </p>
        <p className="text-muted leading-7">
          The DS1054Z&apos;s real advantage is familiarity. Its menus, screenshots and quirks fill a decade of forum
          threads and course notes, which helps if you learn by following along. Read our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          for the full picture, or compare the two-channel{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            DHO802 against the DS1054Z
          </Link>
          .
        </p>
      </section>

      <Callout title="Safety: neither scope is for direct mains measurement">
        Both datasheets give a maximum input of CAT I 300 Vrms on the 1 MΩ input, which rules out probing mains wiring
        directly. The probe&apos;s ground clip is tied to earth through the power cord on the DS1054Z, so clipping it to
        a live point creates a short. Use a rated differential probe for mains or switch-mode primaries, and leave
        panel work to a licensed electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "For a new purchase, the DHO804 is the stronger scope: 12-bit resolution, more bandwidth, a faster four-channel sample rate, standard decoding and a modern touchscreen in a lighter body. The DS1054Z still makes sense if you want the most documented beginner scope and 50 MHz covers your work.",
  chooseNeitherIf:
    "You need to probe mains wiring directly: both datasheets cap the input at CAT I 300 Vrms, which rules out mains, and the DS1054Z's probe ground ties to earth through its power cord, so clipping it to a live point shorts it — use a rated differential probe for mains or switch-mode primaries, and leave panel work to a licensed electrician.",
  faqs: [
    {
      question: "Is the DHO804 a replacement for the DS1054Z?",
      answer:
        "Rigol sells both. The DHO804 is a newer platform with 12-bit resolution, a 1024 × 600 touchscreen and standard decoding, while the DS1054Z remains in stock on Rigol's North American site. Treat the DHO804 as the modern alternative rather than a direct successor; the DS1054Z is still a capable four-channel scope.",
    },
    {
      question: "Does the DHO804 have a built-in signal generator?",
      answer:
        "No. Rigol's DHO800 specifications list no built-in generator or digital channels, and neither does the DS1054Z. If you need a generator in the same box, look at a model with one, or pair either scope with a separate function generator for filter and amplifier testing.",
    },
    {
      question: "Which has more memory, the DHO804 or the DS1054Z?",
      answer:
        "With one channel on, the DHO804 reaches 25 Mpts against the DS1054Z's 12 Mpts standard (24 Mpts optional). With all four channels on, the DHO804 drops to 5 Mpts, which still holds 16 ms at its 312.5 MSa/s four-channel rate. Rigol's 1000Z page doesn't break down the standard memory per channel count.",
    },
    {
      question: "Can the DHO804 run from a battery?",
      answer:
        "Rigol says it takes USB-C power at 15 V and 3 A, with a 45 W maximum, so it can run from a portable power source that supplies that profile. The DS1054Z is a conventional mains-powered benchtop. Check that a power bank supports 15 V output before relying on it in the field.",
    },
    {
      question: "Is the DS1054Z 8-bit or 12-bit?",
      answer:
        "8-bit. Rigol's DS1000Z datasheet lists 8 bits of vertical resolution for the analog channels, and a High Resolution acquisition mode that averages samples to reach up to 12 bits on repetitive signals. The DHO804 is 12-bit natively, which helps on single-shot captures and small signals where averaging isn't possible.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function RigolDho804VsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
