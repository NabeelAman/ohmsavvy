import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2C10 per http://www.hantek.com/products/detail/17182 (as recorded 2026-10-24 on
// /oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10): 100 MHz, 2 ch, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), rise time 3.5 ns
// typical, 8-bit with 12-bit high-res mode, 8 Mpts (1 ch) / 4 Mpts (2 ch), 7-inch 800 x 480, triggers edge, pulse, video,
// slope, overtime, window, pattern, interval, under-amplitude, UART, LIN, CAN, SPI, I2C; decode RS232/UART, I2C, SPI, CAN,
// LIN; 32 auto measurements with statistics; 2 DVMs; 6-digit hardware frequency counter; SCPI; USB host/device;
// 1 MOhm || 13 pF; 100-240 VAC, under 30 W; 318 x 110 x 150 mm; 1900 g; generator row "-" for the DSO2C10.
// Amazon https://www.amazon.com/dp/B09GY871QK (Hantek Store, "In stock, usually ships within 3 to 4 days" at ZIP 10001,
// checked 2026-11-08): 100 MHz, 1 GSa/s, 8M memory, 14 trigger modes with 5 serial protocol triggers and decodes, 32 auto
// measurements with statistics, DVM and 6-digit frequency indicator, SCPI; date first available September 23, 2021.
// Conflict: the listing says "support arbitrary waveform output", but Hantek's table shows no generator on the DSO2C10.
// Hantek DSO5102P per https://www.hantek.com/products/detail/26 (DSO5000P series, checked 2026-11-08): 100 MHz, rise time
// 3.5 ns typical, 1 GS/s real time, 25 GS/s equivalent, record length 40K, 8-bit, 7-inch 64K-color TFT 800 x 480, triggers
// edge, video, pulse, slope, overtime, alternative with sources CH1, CH2, EXT, EXT/5, AC line; 32 measurements; math
// + - x / and 1024-point FFT; 1 MOhm +/-2% || 20 pF +/-3 pF; CAT I and CAT II 300 Vrms (10X), CAT III 150 Vrms (1X);
// 2 mV/div-10 V/div; 2 ns/div-80 s/div; USB host and device; 100-120 / 120-240 VAC, under 30 W; 385 x 200 x 245 mm;
// 2.08 kg without packing. Per this site's DSO5102P Pick, Hantek's DSO5000P datasheet says 24K record length and lists
// pass/fail testing. Amazon https://www.amazon.com/dp/B071P97RLC (buy box at ZIP 10001, checked 2026-11-08): 7-inch 800 x 480,
// stores over 1000 waveforms, USB storage and remote control; item weight 4.58 lb; date first available May 18, 2017. Two of
// its bullets describe multimeter functions (resistance, diode, continuity) that Hantek doesn't list for this scope.
// Capture windows below are memory divided by sample rate, our arithmetic.

const path = "/oscilloscopes/hantek-dso2c10-vs-hantek-dso5102p";
const c10 = picks.find((p) => p.name === "Hantek DSO2C10")!;
const p5102 = picks.find((p) => p.name === "Hantek DSO5102P")!;

export const metadata = buildMetadata({
  title: "Hantek DSO2C10 vs DSO5102P: New or Old Hantek",
  description:
    "Hantek DSO2C10 vs DSO5102P: two 100 MHz Hantek benches four years apart. Memory, serial decoding, triggers and input ratings compared, with a verdict by job.",
  path: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso5102p",
  image: c10.image,
});

const link = "text-accent hover:underline";

/** The same UART byte on each scope: decoded on the DSO2C10, counted by hand on the DSO5102P. */
function DecodeDiagram() {
  // 0x48 'H', 8N1, LSB first: start 0, then 0,0,0,1,0,0,1,0, stop 1. Idle high.
  const bits = [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1];
  const w = 28;
  const trace = (x0: number, yHi: number, yLo: number) => {
    let d = "";
    bits.forEach((b, i) => {
      const y = b ? yHi : yLo;
      d += i === 0 ? `M${x0} ${y}` : ` V${y}`;
      d += ` H${x0 + (i + 1) * w}`;
    });
    return d;
  };
  const labels = ["idle", "S", "0", "1", "2", "3", "4", "5", "6", "7", "P", "idle"];
  return (
    <svg
      viewBox="0 0 400 220"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek DSO2C10 vs DSO5102P decoding diagram: the same UART byte, hex 48 or the letter H, appears on the DSO2C10 with a decoded label under the trace, while on the DSO5102P you count the start bit, eight data bits least significant first and the stop bit by hand to read 0 0 0 1 0 0 1 0."
    >
      <text x="10" y="16" fontSize="10" fontWeight="700" className="fill-foreground">Hantek DSO2C10 with UART decode on</text>
      <path d={trace(30, 30, 60)} className="fill-none stroke-accent" strokeWidth="1.6" />
      <rect x="58" y="70" width="252" height="18" rx="9" className="fill-accent/15 stroke-accent" strokeWidth="1" />
      <text x="184" y="83" fontSize="9" textAnchor="middle" className="fill-foreground">0x48 &apos;H&apos;</text>
      <text x="10" y="120" fontSize="10" fontWeight="700" className="fill-foreground">Hantek DSO5102P, no decoder</text>
      <path d={trace(30, 134, 164)} className="fill-none stroke-foreground" strokeWidth="1.6" />
      {labels.map((t, i) => (
        <text key={i} x={30 + i * w + w / 2} y="180" fontSize="7.5" textAnchor="middle" className="fill-muted">
          {t}
        </text>
      ))}
      <text x="10" y="200" fontSize="8.5" className="fill-muted">Read bits 0 to 7 (LSB first): 0 0 0 1 0 0 1 0, reverse to 01001000 = 0x48.</text>
      <text x="10" y="213" fontSize="8.5" className="fill-muted">Illustrative 8N1 frame. S = start bit, P = stop bit.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2C10 vs DSO5102P",
  path,
  published: "2026-11-08",
  intro:
    "Hantek DSO2C10 vs DSO5102P compares two Hantek benches with the same headline numbers: two channels, 100 MHz, 1 GSa/s, 8-bit, a 7-inch 800 × 480 screen and a 3.5 ns rise time. Amazon first listed the DSO5102P in May 2017 and the DSO2C10 in September 2021, and the four years show. The DSO2C10 has 8 Mpts of memory against 40K, serial triggering and decoding, a high-resolution mode and a frequency counter. The DSO5102P keeps an external trigger input, an AC line trigger and published CAT ratings. For most buyers the newer DSO2C10 is the better scope.",
  a: {
    pick: c10,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz bench oscilloscope",
    chooseIf: [
      "You debug UART, I2C, SPI, CAN or LIN and want the bytes decoded on screen",
      "You capture one-off events and need deep memory (8 Mpts on one channel)",
      "You want a 12-bit high-resolution mode for small signals on slow timebases",
      "You want a 6-digit frequency counter and two DVM readouts",
    ],
  },
  b: {
    pick: p5102,
    imageAlt: "Hantek DSO5102P 100 MHz two-channel bench oscilloscope",
    chooseIf: [
      "You need an external trigger input, or triggering from the AC line",
      "You want published CAT ratings on the inputs",
      "You view repetitive signals and like equivalent-time sampling (25 GS/s)",
      "You want 2 mV/div sensitivity, which Hantek lists for this model",
    ],
  },
  extraSpecs: [
    { label: "Memory", a: "8 Mpts (1 ch), 4 Mpts (2 ch)", b: "40K (product page); 24K (datasheet)" },
    { label: "Two-channel sample rate", a: "500 MSa/s per channel", b: "Not stated (1 GS/s real time)" },
    { label: "Equivalent-time sampling", a: "Not listed", b: "25 GS/s" },
    { label: "Resolution", a: "8-bit, 12-bit high-res mode", b: "8-bit" },
    { label: "Triggers", a: "Edge, pulse, video, slope, overtime, window, pattern, interval, under-amplitude, UART, LIN, CAN, SPI, I2C", b: "Edge, video, pulse, slope, overtime, alternative; EXT, EXT/5 and AC line sources" },
    { label: "Serial decoding", a: "RS232/UART, I2C, SPI, CAN, LIN", b: "None listed" },
    { label: "Measurements", a: "32 with statistics, 2 DVMs, 6-digit counter", b: "32" },
    { label: "Vertical range", a: "Not stated in our sources", b: "2 mV/div to 10 V/div" },
    { label: "Timebase", a: "Not stated in our sources", b: "2 ns/div to 80 s/div" },
    { label: "Input", a: "1 MΩ ‖ 13 pF", b: "1 MΩ ‖ 20 pF; CAT I/II 300 Vrms (10X)" },
    { label: "Size and weight", a: "318 × 110 × 150 mm, 1.9 kg", b: "385 × 200 × 245 mm, 2.08 kg (Hantek)" },
    { label: "First on Amazon", a: "September 23, 2021", b: "May 18, 2017" },
  ],
  differences: [
    "Memory: 8 Mpts against 40K is a factor of 200. Against the 24K in the DSO5102P datasheet, it is about 333.",
    "Serial work: the DSO2C10 triggers on and decodes UART, I2C, SPI, CAN and LIN. The DSO5102P lists no serial triggers or decoding.",
    "Triggers: the DSO2C10 adds window, pattern, interval and under-amplitude triggers. The DSO5102P adds an external trigger input (EXT and EXT/5) and an AC line source.",
    "Resolution: the DSO2C10 has a high-resolution mode up to 12-bit; the DSO5102P is 8-bit.",
    "Shared: 100 MHz, 1 GSa/s, 3.5 ns rise time, 7-inch 800 × 480, 32 automatic measurements, mains power under 30 W.",
    "Paperwork: Hantek's DSO5102P figures conflict (40K vs 24K), and its Amazon bullets describe multimeter functions it doesn't have. The DSO2C10 listing claims waveform output that Hantek's table doesn't show.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth, sample rate and rise time are identical, so we leave them off the charts. These are the numbers that
          separate the two.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Memory on one channel, log scale. The DSO5102P bar uses Hantek&apos;s higher product-page figure.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO2C10", value: 8_000_000, display: "8 Mpts", highlight: true },
                { label: "Hantek DSO5102P", value: 40_000, display: "40K (24K per datasheet)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Time held at 1 GSa/s: memory divided by sample rate.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO2C10", value: 8000, display: "8 ms", highlight: true },
                { label: "Hantek DSO5102P", value: 40, display: "40 µs" },
              ]}
            />
          </Figure>
          <Figure caption={<>Trigger types each maker lists (the DSO2C10 count includes five serial triggers).</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2C10", value: 14, display: "14", highlight: true },
                { label: "Hantek DSO5102P", value: 6, display: "6" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight per Hantek, without packing.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 2.08, display: "2.08 kg" },
                { label: "Hantek DSO2C10", value: 1.9, display: "1.9 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With both channels on, the DSO2C10 holds 4 Mpts at 500 MSa/s, still 8 ms. Hantek doesn&apos;t give the
          DSO5102P&apos;s two-channel split. For how memory and sample rate trade off, see{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explained
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO2C10 vs DSO5102P on a serial bus</h2>
        <p className="text-muted leading-7 mb-4">
          On analog signals such as audio, ripple and PWM, these two draw much the same picture. The gap opens on digital
          buses. Feed a 9600-baud UART line into each and the DSO2C10, with decode on, prints the byte under the trace. The
          DSO5102P shows the same edges, and you count bits.
        </p>
        <Figure caption={<>Illustrative: one UART byte on each scope. Reading it by hand takes a minute; reading a 20-byte message takes much longer.</>}>
          <DecodeDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Serial triggering matters as much as decoding. The DSO2C10 can wait for one I2C address or one UART value and
          ignore everything else, so a sensor that answers wrong once in a hundred reads gets caught on the first bad
          reply. The DSO5102P&apos;s pulse and slope triggers can catch a malformed pulse, but not a particular byte.
        </p>
        <h3 className="text-lg font-semibold mb-2">Memory turns one capture into many measurements</h3>
        <p className="text-muted leading-7 mb-4">
          At 1 GSa/s, 40K points hold 40 µs. A 9600-baud byte lasts about 1.04 ms, so to fit a 20-byte message (about 21
          ms) the DSO5102P must slow to under 2 MSa/s. That still decodes by eye, but zooming in on one edge reveals
          about 500 ns between samples. The DSO2C10&apos;s 8 Mpts fit the same 21 ms at roughly 380 MSa/s, so each edge
          keeps samples only a few nanoseconds apart.
        </p>
        <KeyIdea title="What the older DSO5102P still does better">
          It has an external trigger input with EXT and EXT/5 ranges, so a sync pulse from another instrument can start
          the capture without using a channel. Its AC line trigger locks the display to mains frequency, handy when hunting
          hum. Hantek also publishes CAT I/II 300 Vrms (10X) for it, and a 2 mV/div bottom range.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Arduino, ESP32 or STM32 serial debugging", "Hantek DSO2C10", "UART, I2C and SPI trigger and decode"],
            ["Car or robot CAN and LIN work", "Hantek DSO2C10", "CAN and LIN decode listed"],
            ["Catching one bad power-up event", "Hantek DSO2C10", "8 Mpts at full sample rate"],
            ["Syncing to another instrument's trigger output", "Hantek DSO5102P", "EXT and EXT/5 trigger inputs"],
            ["Hum and mains-related noise in audio gear", "Hantek DSO5102P", "AC line trigger source"],
            ["Small-signal work under 5 mV/div", "Hantek DSO5102P", "2 mV/div listed; the DSO2C10 range isn't in our sources"],
            ["First 100 MHz bench scope for general use", "Hantek DSO2C10", "Deeper memory and more triggers for similar money"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          At 100 MHz both show signals up to about 20–35 MHz at close to true size, and their 3.5 ns rise time resolves
          edges down to roughly 10 ns. Neither has a generator per Hantek&apos;s specs; for that, Hantek sells the
          DSO2D10, compared on{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>
          . Neither has logic channels. The DSO5102P&apos;s 25 GS/s equivalent-time mode only works on repeating signals;
          it doesn&apos;t raise the 1 GSa/s real-time rate for single events.
        </p>
        <Callout title="Mains bench scopes and earth">
          Both plug into mains, which ties every probe ground clip to earth. Clip one to a live mains point and you cause a
          short through the scope. Hantek&apos;s CAT I/II 300 Vrms figure for the DSO5102P applies with a 10X probe and
          isn&apos;t a license to probe mains with a ground clip. Use a differential probe for line-side measurements, and
          call an electrician for building wiring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: Hantek&apos;s own numbers</h2>
        <p className="text-muted leading-7 mb-4">
          Both listings carry errors, so lean on Hantek&apos;s product pages. The DSO5102P product page says 40K and its
          datasheet 24K, and its Amazon bullets borrow multimeter copy (resistance, diode, continuity) from a different
          product. The DSO2C10 listing mentions arbitrary waveform output, but Hantek&apos;s table shows no generator on
          that model, and the shared front panel carries generator labels it doesn&apos;t use. Buy the DSO2C10 expecting
          no generator.
        </p>
        <p className="text-muted leading-7">
          The DSO5102P against bigger names:{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" className={link}>
            Rigol DS1054Z vs DSO5102P
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" className={link}>
            Siglent SDS1104X-E vs DSO5102P
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" className={link}>
            DSO5102P vs Rigol DHO804
          </Link>
          . The DSO2C10 against budget rivals:{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" className={link}>
            HANMATEK DOS1102 vs DSO2C10
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/owon-sds1102-vs-hantek-dso2c10" className={link}>
            OWON SDS1102 vs DSO2C10
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek DSO2C10 is the better buy for most benches: same 100 MHz and 1 GSa/s as the DSO5102P, but 8 Mpts of memory instead of 40K, serial triggering and decoding for UART, I2C, SPI, CAN and LIN, and a 12-bit high-res mode. Choose the older DSO5102P only if you need its external trigger input, AC line trigger or published CAT ratings.",
  chooseNeitherIf:
    "You need a built-in signal generator or more than two channels. Neither has a generator per Hantek's tables; look at the DSO2D10 or a four-channel scope instead.",
  faqs: [
    {
      question: "Is the Hantek DSO2C10 newer than the DSO5102P?",
      answer:
        "Yes. Amazon lists the DSO5102P as first available on May 18, 2017 and the DSO2C10 on September 23, 2021. The newer model keeps the same 100 MHz, 1 GSa/s and 7-inch screen, but adds 8 Mpts of memory, serial decoding, more trigger types and a high-resolution mode.",
    },
    {
      question: "Does the Hantek DSO5102P decode I2C or UART?",
      answer:
        "Hantek doesn't list serial decoding or serial triggers for the DSO5102P. Its triggers are edge, video, pulse, slope, overtime and alternative. You can see a serial line and read the bits by hand. The DSO2C10 decodes RS232/UART, I2C, SPI, CAN and LIN and can trigger on specific values.",
    },
    {
      question: "How much memory does the DSO5102P have?",
      answer:
        "Hantek's own sources disagree. The DSO5000P product page says 40K, the datasheet 24K. Either way it is far less than the DSO2C10's 8 Mpts on one channel and 4 Mpts on two. At 1 GSa/s, 40K points hold 40 µs; 8 Mpts hold 8 ms.",
    },
    {
      question: "Does the Hantek DSO2C10 have a signal generator?",
      answer:
        "No, per Hantek's DSO2000 spec table, which shows no generator for the DSO2C10. Its Amazon listing mentions arbitrary waveform output and the front panel shares generator labels with the DSO2D10, which does have one. If you need a generator, buy the DSO2D10.",
    },
    {
      question: "Which one is lighter?",
      answer:
        "The DSO2C10, at 1.9 kg per Hantek against 2.08 kg for the DSO5102P without packing. Hantek lists the DSO2C10 at 318 × 110 × 150 mm and the DSO5102P at 385 × 200 × 245 mm. Both run from mains and draw under 30 W.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "OWON SDS1102 vs Hantek DSO2C10", href: "/oscilloscopes/owon-sds1102-vs-hantek-dso2c10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
  ],
};

export default function HantekDso2c10VsHantekDso5102pPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
