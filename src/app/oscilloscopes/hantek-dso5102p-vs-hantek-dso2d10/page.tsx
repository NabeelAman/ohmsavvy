import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO5102P: 100 MHz, 3.5 ns rise time, 1 GS/s real-time (sample-rate range 500 MS/s to 1 GS/s; no per-channel
// split stated), 25 GS/s equivalent-time, record length 40K, 2 ns/div to 80 s/div, 8-bit, 1 MOhm || 20 pF, 300 Vrms
// max (10X), triggers Edge/Video/Pulse/Slope/Over time/Alternative, trigger sources CH1, CH2, EXT, EXT/5, AC Line,
// 6-digit trigger frequency counter, +, -, *, / and 1024-point FFT, 7-inch 64K-color 800 x 480, <30 W, 2.08 kg without
// packing, runs Linux 3.2, per http://www.hantek.com/products/detail/26 (checked 2026-11-08). Conflict: this site's
// DSO5102P Pick records 24K in Hantek's DSO5000P datasheet against 40K on the product page; the page says so.
// Hantek DSO2D10: 100 MHz, 3.5 ns, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 8 Mpts (1 ch) / 4 Mpts (2 ch), 8-bit with
// high-res mode up to 12-bit, 1 MOhm || 13 pF, 300 Vrms (10X), 2 ns/div to 100 s/div, 14 trigger types incl.
// UART/LIN/CAN/SPI/I2C, EXT trigger 0-3.3 V on generator models, RS232/UART, I2C, SPI, CAN, LIN decode, 6-digit
// hardware counter, 1-channel 25 MHz generator, 7-inch 800 x 480, <30 W, 1900 g, per
// http://www.hantek.com/products/detail/17182 (checked 2026-11-08). Both ASINs buyable on Amazon.com at ZIP 10001
// (checked 2026-11-08). Window and sample-interval figures on this page are arithmetic on these record lengths.

const path = "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10";
const d5102 = picks.find((p) => p.name === "Hantek DSO5102P")!;
const d2d10 = picks.find((p) => p.name === "Hantek DSO2D10")!;

export const metadata = buildMetadata({
  title: "Hantek DSO5102P vs DSO2D10: Memory and Decode",
  description:
    "Hantek DSO5102P vs DSO2D10: two 100 MHz Hantek benches, but 40K points against 8 Mpts. What record length does to slow captures, plus decode and generator.",
  path: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d10",
  image: d2d10.image,
});

const link = "text-accent hover:underline";

/** A 100 ms capture with a 1 microsecond glitch: sparse samples on 40K points, dense samples on 4 Mpts. */
function RecordLengthDiagram() {
  const ticksA = Array.from({ length: 21 }, (_, i) => 30 + i * 17);
  const ticksB = Array.from({ length: 85 }, (_, i) => 30 + i * 4);
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek DSO5102P vs DSO2D10 record-length diagram: over the same 100 millisecond capture window, the DSO5102P's 40K points leave a 2.5 microsecond gap between samples, so a 1 microsecond glitch can fall between two samples and vanish. The DSO2D10's 4 million points per channel with both channels on sample every 25 nanoseconds, so the glitch is recorded."
    >
      <text x="30" y="18" fontSize="10" fontWeight="700" className="fill-foreground">DSO5102P: 40K points over 100 ms</text>
      <path d="M30 70 H370" className="stroke-border" strokeWidth="1" />
      <path d="M30 70 H190 V38 H193 V70 H370" className="stroke-muted fill-none" strokeWidth="1.2" strokeDasharray="3 2" />
      {ticksA.map((x) => (
        <circle key={`a${x}`} cx={x} cy="70" r="2.4" className="fill-accent" />
      ))}
      <text x="197" y="36" fontSize="8.5" className="fill-muted">1 µs glitch</text>
      <text x="30" y="90" fontSize="8.5" className="fill-muted">one sample every 2.5 µs: the glitch falls between two dots</text>

      <text x="30" y="122" fontSize="10" fontWeight="700" className="fill-accent">DSO2D10: 4 Mpts per channel over 100 ms</text>
      <path d="M30 174 H370" className="stroke-border" strokeWidth="1" />
      <path d="M30 174 H190 V142 H193 V174 H370" className="stroke-foreground fill-none" strokeWidth="1.4" />
      {ticksB.map((x) => (
        <circle key={`b${x}`} cx={x} cy={x >= 190 && x <= 193 ? 142 : 174} r="1.3" className="fill-accent" />
      ))}
      <text x="30" y="196" fontSize="8.5" className="fill-muted">one sample every 25 ns: 40 samples land on the glitch (dots not to scale)</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO5102P vs DSO2D10",
  path,
  published: "2026-11-08",
  intro:
    "Hantek DSO5102P vs DSO2D10 pits Hantek's older 100 MHz bench scope against its newer one. On the headline row they match: two channels, 100 MHz, 1 GSa/s, a 3.5 ns rise time and a 7-inch 800 × 480 screen. The gap is underneath. The DSO2D10 records up to 8 Mpts against 40K points (or 24K, depending on which Hantek document you read), decodes five serial buses and has a 25 MHz generator. The DSO5102P has none of those, but it keeps a few trigger tricks of its own.",
  a: {
    pick: d5102,
    imageAlt: "Hantek DSO5102P two-channel 100 MHz benchtop oscilloscope",
    chooseIf: [
      "You look at repeating signals on short timebases, where a 40K record is enough",
      "You want Alternative trigger to lock two unrelated signals on one screen",
      "You trigger from the mains line or an external source through EXT or EXT/5",
      "You don't need serial decoding or a built-in signal source",
    ],
  },
  b: {
    pick: d2d10,
    imageAlt: "Hantek DSO2D10 two-channel 100 MHz oscilloscope with built-in generator",
    chooseIf: [
      "You capture long, slow events such as power-up sequences and still want fine detail",
      "You debug UART, I2C, SPI, CAN or LIN and want the bytes decoded on screen",
      "You want a 25 MHz signal source in the same box",
      "You want runt (Under Amp), window and pattern triggers for intermittent faults",
    ],
  },
  extraSpecs: [
    { label: "Record length", a: "40K (product page); 24K (datasheet)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Sample rate, both channels on", a: "Not stated (Hantek lists a 500 MS/s to 1 GS/s range)", b: "500 MSa/s" },
    { label: "Trigger types", a: "6: edge, video, pulse, slope, overtime, alternative", b: "14, incl. window, pattern, runt and 5 serial buses" },
    { label: "Trigger sources", a: "CH1, CH2, EXT, EXT/5, AC line", b: "CH1, CH2, EXT (0–3.3 V)" },
    { label: "Serial decoding", a: "None listed", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Built-in generator", a: "None", b: "1 ch, 25 MHz sine, 10 MHz square/arbitrary" },
    { label: "Input capacitance", a: "20 pF ± 3 pF", b: "13 pF ± 3 pF" },
    { label: "Slowest timebase", a: "80 s/div", b: "100 s/div" },
    { label: "Weight (no packing)", a: "2.08 kg", b: "1.9 kg" },
  ],
  differences: [
    "Record length is the big one: the DSO2D10 stores up to 8 Mpts on one channel, against 40K on the DSO5102P's product page, 200 times more. Hantek's DSO5000P datasheet gives 24K, and the two sources disagree.",
    "Decoding: the DSO2D10 triggers on and decodes UART, I2C, SPI, CAN and LIN. Hantek lists no serial decoding for the DSO5102P.",
    "Generator: the DSO2D10 has a one-channel source to 25 MHz; the DSO5102P has none.",
    "Triggering: the DSO2D10 lists 14 trigger types. The DSO5102P lists 6, but its Alternative mode, EXT/5 input and AC line source aren't on the DSO2D10's list.",
    "Same headline: both are 100 MHz, two-channel, 1 GSa/s, 8-bit, 3.5 ns rise time, 7-inch 800 × 480, mains powered under 30 W.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from Hantek's product pages.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Same front page, different engine</h2>
        <p className="text-muted leading-7 mb-4">
          A buyer skimming listings sees the same four numbers on both: 100 MHz, two channels, 1 GSa/s, 7 inches. The
          charts below show where the spec sheets split, starting with memory, which needs a log scale.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum record length, one channel, log scale. The DSO5102P bar uses the product page&apos;s 40K.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO2D10", value: 8_000_000, display: "8 Mpts", highlight: true },
                { label: "Hantek DSO5102P", value: 40_000, display: "40K (24K in datasheet)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Trigger types each maker lists, including serial-bus triggers.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 14, display: "14", highlight: true },
                { label: "Hantek DSO5102P", value: 6, display: "6" },
              ]}
            />
          </Figure>
          <Figure caption={<>Serial buses each scope decodes on screen.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D10", value: 5, display: "5 (UART, I2C, SPI, CAN, LIN)", highlight: true },
                { label: "Hantek DSO5102P", value: 0.05, display: "None listed" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input capacitance; lower loads a fast or high-impedance node less.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 20, display: "20 pF" },
                { label: "Hantek DSO2D10", value: 13, display: "13 pF", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why record length decides slow captures</h2>
        <p className="text-muted leading-7 mb-4">
          A scope can only sample as fast as its memory lets it fill the screen. The rule is simple: effective sample
          rate = record length ÷ capture time, capped at the converter&apos;s maximum. On short timebases both scopes run
          at full speed. Stretch the window and the DSO5102P has to slow down long before the DSO2D10 does.
        </p>
        <DataTable
          head={["Capture window", "DSO5102P (40K)", "DSO2D10 (4 Mpts, 2 ch)", "DSO2D10 (8 Mpts, 1 ch)"]}
          rows={[
            ["40 µs (a few UART bits)", "1 GSa/s (capped)", "500 MSa/s (capped)", "1 GSa/s (capped)"],
            ["1 ms", "40 MSa/s", "500 MSa/s (capped)", "1 GSa/s (capped)"],
            ["20 ms (one 50 Hz mains cycle)", "2 MSa/s", "200 MSa/s", "400 MSa/s"],
            ["100 ms (a supply power-up)", "400 kSa/s, 2.5 µs apart", "40 MSa/s, 25 ns apart", "80 MSa/s, 12.5 ns apart"],
            ["1 s (a relay or motor start)", "40 kSa/s, 25 µs apart", "4 MSa/s", "8 MSa/s"],
          ]}
        />
        <p className="text-muted leading-7 my-4">
          With the 24K figure from Hantek&apos;s datasheet, every DSO5102P number in that table drops by 40%. Either way
          the pattern holds: once the window passes about 40 µs, the older scope stops sampling at 1 GSa/s, and by 100
          ms it is sampling 100 times slower than the DSO2D10 with both channels on.
        </p>
        <Figure
          caption={
            <>
              The same 100 ms power-up capture with a 1 µs glitch. At 2.5 µs between samples, the DSO5102P can miss it
              entirely; the DSO2D10&apos;s 25 ns spacing records it. Peak-detect mode on both scopes is the workaround
              for spotting glitches on slow timebases, but it can&apos;t show their shape.
            </>
          }
        >
          <RecordLengthDiagram />
        </Figure>
        <KeyIdea title="Short record isn't always a problem">
          If you set the timebase so the event fills the screen, the DSO5102P&apos;s 40K points are plenty: a 1 kHz
          square wave over a 1 ms window still gets 40 MSa/s, 40,000 samples per cycle. The short record hurts when
          you want a long window and fine detail at once, or when you capture once and zoom in afterwards. That is
          what serial decoding and power-sequencing work demand, and it&apos;s why the DSO2D10 suits them.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO5102P vs DSO2D10: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Reading I2C or UART bytes from a microcontroller", "DSO2D10", "Decodes them; the DSO5102P lists no decoding"],
            ["Watching a 3.3 V rail come up with its sequencing glitches", "DSO2D10", "4 Mpts keeps 25 ns detail over 100 ms"],
            ["Comparing two unrelated signals, e.g. two separate oscillators", "DSO5102P", "Alternative trigger locks each channel on its own signal"],
            ["Syncing to mains hum in an audio amp", "DSO5102P", "AC line is a listed trigger source"],
            ["Feeding a test tone into a filter", "DSO2D10", "Built-in 25 MHz generator"],
            ["Classroom bench showing basic waveforms", "Either", "Same 100 MHz, screen and auto measurements"],
            ["Catching a rare runt pulse", "DSO2D10", "Under Amp (runt) and window triggers"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO5102P: a classic 100 MHz bench for repeating signals</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO5102P is at its best on repetitive signals that fit a screen: oscillators, audio, PWM, ripple, video
          lines (it triggers on NTSC, PAL and SECAM). Its 1024-point FFT, 6-digit trigger counter and 32 automatic
          measurements cover routine checks. Alternative trigger is a real advantage for a technician comparing two
          clocks that aren&apos;t related, since each channel gets its own stable trigger. It can&apos;t decode a bus,
          drive a circuit, or keep fine detail over long windows.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D10: the newer platform with memory to spare</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO2D10 adds what embedded work needs: deep memory for single captures you zoom into afterwards, five
          serial decoders with matching triggers, runt and pattern triggers for faults, and a generator for stimulus.
          Its lower 13 pF input capacitance also loads a circuit slightly less. It doesn&apos;t list SECAM video, an
          EXT/5 input or an AC line trigger, and its external trigger input works only on the generator models, at 0 to
          3.3 V.
        </p>
        <Callout title="Mains-powered, earth-referenced inputs">
          Both scopes run from mains with grounded probe returns, and both inputs are limited to 300 Vrms through a
          10X probe. Never clip a probe ground to a live mains conductor or the primary side of a switch-mode supply:
          the ground lead shorts it to earth. Use a differential probe or an isolation approach suited to the job, and
          call an electrician for anything on household wiring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: Hantek&apos;s two record lengths</h2>
        <p className="text-muted leading-7 mb-4">
          The DSO5102P&apos;s product page says 40K points; the DSO5000P datasheet our Pick was built from says 24K.
          We can&apos;t tell you which is right from Hantek&apos;s own documents, so this page uses 40K and flags 24K.
          It doesn&apos;t change the verdict: both figures are about 200 to 330 times shorter than the DSO2D10&apos;s 8
          Mpts. Hantek also doesn&apos;t say how the DSO5102P&apos;s 1 GS/s splits with both channels on, beyond a
          500 MS/s to 1 GS/s range, while the DSO2D10 states 500 MSa/s per channel plainly. Hantek publishes no waveform
          update rate for either model.
        </p>
        <p className="text-muted leading-7">
          For other routes from here, see{" "}
          <Link href="/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" className={link}>
            Hantek DSO5102P vs DSO2D15
          </Link>{" "}
          for the 150 MHz sibling,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" className={link}>
            Rigol DS1054Z vs Hantek DSO5102P
          </Link>{" "}
          for Arduino work,{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>{" "}
          if you&apos;re unsure about the generator, and our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explainer
          </Link>{" "}
          covers the memory arithmetic in more depth.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek DSO2D10 unless you have a specific reason not to: same 100 MHz and screen, but 8 Mpts of memory, five serial decoders, 14 trigger types and a 25 MHz generator. The Hantek DSO5102P still makes sense for repeating-signal bench work where its Alternative trigger, EXT/5 input or mains-line trigger matter more than memory or decoding.",
  chooseNeitherIf:
    "You need three or four signals at once, or 12-bit detail on small signals. Both are 8-bit, two-channel scopes; a four-channel Rigol DS1054Z or a 12-bit Rigol DHO802 fits those jobs better.",
  faqs: [
    {
      question: "Is the Hantek DSO2D10 the replacement for the DSO5102P?",
      answer:
        "Hantek doesn't describe it that way, and it still lists the DSO5000P series on its site. On paper, though, the DSO2D10 covers the same 100 MHz, two-channel, 1 GSa/s ground with far deeper memory, serial decoding and a generator. The DSO5102P keeps a few trigger options the DSO2D10 doesn't list.",
    },
    {
      question: "How much memory does the Hantek DSO5102P have?",
      answer:
        "Hantek's DSO5000P product page states a record length of 40K points, while the DSO5000P datasheet our product data comes from states 24K. The sources conflict, and we haven't been able to resolve it from Hantek's documents. Either figure is short next to the 8 Mpts of the DSO2D10.",
    },
    {
      question: "Can the DSO5102P decode I2C or UART?",
      answer:
        "Hantek lists no serial triggering or decoding for the DSO5102P. You can still read a slow UART or I2C transfer by hand from the waveform, using cursors to time the bits, but its short record makes long transfers hard. The DSO2D10 triggers on and decodes UART, I2C, SPI, CAN and LIN.",
    },
    {
      question: "What is Alternative trigger on the DSO5102P?",
      answer:
        "It lets each channel trigger on its own signal, so two waveforms that aren't synchronized can both sit still on screen. Hantek lists edge, pulse width, video and slope as the internal trigger types available per channel. It suits comparing two separate oscillators, though the timing relationship between the channels isn't meaningful in that mode.",
    },
    {
      question: "Which is lighter to move between benches?",
      answer:
        "The DSO2D10, at 1.9 kg per Hantek against 2.08 kg without packing for the DSO5102P. The difference is small; both are mains-powered bench scopes, not portable instruments. Hantek lists the DSO2D10 at 318 × 110 × 150 mm.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "Hantek DSO5102P vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" },
    { label: "Hantek DSO2D15 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1102Z-E vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "How to use segmented memory for intermittent faults", href: "/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults" },
    { label: "How to measure power supply startup time", href: "/oscilloscopes/how-to-measure-power-supply-startup-time-with-an-oscilloscope" },
  ],
};

export default function HantekDso5102pVsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
