import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// DHO914S two-channel sample rate, memory by channel count, waveform rate, generator amplitude, Bode plot range, I/O and power
// per Rigol's DHO900 data sheet, https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-bea3b849-2334-4a6c-8bb3-ed67dc16b97f/1/-/-/-/-/DHO900_DataSheet_EN.pdf (checked 2026-10-24).
// SDS1104X-E memory, display, waveform rate and standard decoding per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (checked 2026-10-24).
// SDS1104X-E 8-bit resolution, AC power and MSO/USB AWG options per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (checked 2026-10-24).
const path = "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e";

const dho914s = picks.find((p) => p.name === "Rigol DHO914S")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "Rigol DHO914S vs SDS1104X-E for a Home Lab",
  description:
    "Rigol DHO914S vs Siglent SDS1104X-E for a home lab: a 12-bit scope with a 25 MHz generator and Bode plot against 100 MHz with free decoding. Charts and picks.",
  path: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e",
  image: dho914s.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO914S vs Siglent SDS1104X-E for a Home Lab",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO914S vs Siglent SDS1104X-E pits a one-box bench against an established four-channel bench scope. The DHO914S is a 125 MHz, 12-bit scope with a built-in 25 MHz signal generator, a Bode plot function, 16 digital channels (with a separately sold probe) and up to 50 Mpts. The SDS1104X-E has 100 MHz, keeps 500 MSa/s on all four channels, decodes I2C, SPI, UART, CAN and LIN for free and has a widely praised, intuitive interface.",
  a: {
    pick: dho914s,
    imageAlt: "Rigol DHO914S 125 MHz 12-bit oscilloscope with built-in signal generator, front panel",
    chooseIf: [
      "You want a signal source on the bench without buying and storing a separate generator",
      "You plan to measure filter, amplifier or speaker-crossover frequency response with Bode plot",
      "Small details such as ripple on a rail matter, and 12-bit resolution helps you see them",
      "You want 16 logic inputs available later through the PLA2216 probe",
    ],
  },
  b: {
    pick: sds1104,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel digital oscilloscope, front panel",
    chooseIf: [
      "You often watch four fast signals together and want 500 MSa/s on each",
      "You already own a function generator, or don't need one",
      "A widely praised, approachable interface matters more to you than a touchscreen",
      "You want serial decoding including LIN with no add-ons and a high normal-mode update rate",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 4 channels on", a: "312.5 MSa/s per channel", b: "500 MSa/s per channel" },
    { label: "Vertical resolution", a: "12-bit", b: "8-bit" },
    { label: "Memory depth", a: "50 Mpts (1 ch); 10 Mpts (3–4 ch)", b: "14 Mpts (interleaved); 7 Mpts per channel" },
    { label: "Built-in signal generator", a: "1 channel, 25 MHz, with Bode plot", b: "None (USB AWG module optional)" },
    { label: "Digital channels", a: "16 (PLA2216 probe sold separately)", b: "16 as a paid MSO option" },
    { label: "Standard decoding", a: "Parallel, UART, I2C, SPI, CAN, LIN", b: "I2C, SPI, UART/RS232, CAN, LIN" },
    { label: "Waveform update rate", a: "30,000 wfms/s; 1,000,000 in UltraAcquire", b: "100,000 wfm/s; 400,000 in sequence mode" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch 800 × 480 TFT-LCD" },
    { label: "Power", a: "USB-C, 15 V 3 A (45 W max)", b: "100–240 V AC, 50 W max" },
  ],
  differences: [
    "The DHO914S has a built-in single-channel 25 MHz arbitrary/function generator and a Bode plot function; Siglent sells a USB generator module for the SDS1104X-E as an option.",
    "Bandwidth: 125 MHz on the Rigol against 100 MHz on the Siglent.",
    "Per-channel sample rate with all four channels on favours the Siglent, 500 MSa/s against 312.5 MSa/s; with one channel on the Rigol leads, 1.25 GSa/s against 1 GSa/s.",
    "Resolution: 12-bit (4,096 levels) on the Rigol, 8-bit (256 levels) on the Siglent.",
    "Memory: up to 50 Mpts on the Rigol against 14 Mpts, and 10 Mpts against 7 Mpts per channel with four on.",
    "Both decode UART, I2C, SPI, CAN and LIN as standard; the Rigol also lists parallel.",
    "Siglent quotes a faster normal update rate (100,000 against 30,000 wfm/s); Rigol's UltraAcquire mode reaches 1,000,000.",
    "Rigol gives you a 1024 × 600 touchscreen and USB-C power; the Siglent is an 800 × 480 mains-powered bench scope. Our roundup scores the SDS1104X-E 4.7 and the DHO914S 4.6.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          These two trade wins row by row, so the charts split them out. Rigol figures come from our verified pick
          data and the DHO900 data sheet; Siglent figures from our pick data and Siglent&apos;s SDS1000X-E series page
          and data sheet.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated −3 dB bandwidth. The DHO914S is 25 MHz higher.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO914S", value: 125, display: "125 MHz", highlight: true },
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate in MSa/s, log scale. Rigol leads on one channel, Siglent with all four on.</>}>
            <BarChart
              log
              items={[
                { label: "DHO914S, 1 ch", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "SDS1104X-E, 1 ch", value: 1000, display: "1 GSa/s" },
                { label: "DHO914S, 4 ch", value: 312.5, display: "312.5 MSa/s each" },
                { label: "SDS1104X-E, 4 ch", value: 500, display: "500 MSa/s each", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum memory depth in Mpts, log scale. The Rigol holds more in both cases.</>}>
            <BarChart
              log
              items={[
                { label: "DHO914S, max", value: 50, display: "50 Mpts", highlight: true },
                { label: "SDS1104X-E, max", value: 14, display: "14 Mpts" },
                { label: "DHO914S, 4 ch", value: 10, display: "10 Mpts each", highlight: true },
                { label: "SDS1104X-E, 4 ch", value: 7, display: "7 Mpts each" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels the converter can resolve: 2 to the power of its bit depth.</>}>
            <BarChart
              log
              items={[
                { label: "DHO914S, 12-bit", value: 4096, display: "4,096 levels", highlight: true },
                { label: "SDS1104X-E, 8-bit", value: 256, display: "256 levels" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>The DHO914S signal generator as Rigol specifies it. The SDS1104X-E has no generator unless you add Siglent&apos;s optional USB module.</>}>
            <DataTable
              head={["Generator item", "Rigol DHO914S"]}
              rows={[
                ["Channels", "1"],
                ["Sine", "2 mHz to 25 MHz"],
                ["Square", "2 mHz to 15 MHz"],
                ["Ramp", "2 mHz to 150 kHz"],
                ["Arbitrary", "2 mHz to 10 MHz, 156 MSa/s, 14-bit"],
                ["Amplitude", "2 mV to 10 V up to 10 MHz; 2 mV to 5 V above"],
                ["Bode plot sweep", "Start 10 Hz to 24.99 MHz, stop 100 Hz to 25 MHz"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO914S vs Siglent SDS1104X-E for a Home Lab</h2>
        <p className="text-muted leading-7 mb-4">
          A home lab rarely has room or budget for every instrument at once, so the real question is what you will
          plug into the scope. A scope only observes; to test a filter, an amplifier or a sensor input you also need
          something that produces a known signal. The DHO914S includes that source. With the SDS1104X-E you either
          already own a function generator, buy Siglent&apos;s USB generator module, or use whatever your circuit
          makes on its own.
        </p>
        <p className="text-muted leading-7 mb-4">
          Bode plot is the feature that turns the DHO914S generator from handy into useful. It sweeps the generator
          across a frequency range, from as low as 10 Hz up to 25 MHz, measures input and output at each step and
          draws the gain and phase curve. That is how you check the corner frequency of an RC filter, the response of
          a guitar pedal tone stack or the roll-off of an op-amp stage without plotting dozens of points by hand.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Siglent earns its place on a different kind of bench: one where four signals move quickly at the same
          time. Holding 500 MSa/s per channel with all inputs active, it captures a clock, chip select, data line and
          interrupt together with more samples on each than the Rigol can give. Its 100,000 wfm/s normal update rate
          helps a glitch show up on screen without switching modes, and Siglent includes LIN, CAN, I2C, SPI and UART
          decoding at no charge. Its interface is also widely regarded as intuitive, which counts on a tool you
          reach for in short evening sessions.
        </p>
        <DataTable
          head={["Home-lab job", "Better fit", "Why, from the data"]}
          rows={[
            ["Plot an RC, audio or active filter's response", "Rigol DHO914S", "Built-in generator plus Bode plot"],
            ["Feed a test tone into an amplifier and watch the output", "Rigol DHO914S", "Sine to 25 MHz from the same box"],
            ["Simulate a sensor or clock signal for a microcontroller input", "Rigol DHO914S", "Square to 15 MHz, arbitrary to 10 MHz"],
            ["Four-line SPI capture at speed", "Siglent SDS1104X-E", "500 MSa/s per channel vs 312.5 MSa/s"],
            ["Hunting a rare glitch in normal acquisition", "Siglent SDS1104X-E", "100,000 vs 30,000 wfm/s in normal mode"],
            ["Ripple and noise on a 3.3 V or 5 V rail", "Rigol DHO914S", "12-bit vs 8-bit resolution"],
            ["Long single-shot capture of a power-up sequence", "Rigol DHO914S", "50 Mpts vs 14 Mpts"],
            ["You already own a bench generator", "Siglent SDS1104X-E", "You would be paying the Rigol for a source you have"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each scope can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A bandwidth rating is the frequency at which a sine reads 3 dB low, so a scope is only accurate well below
          it. Keeping signals three to five times under the rating gives the DHO914S a useful range of roughly 25 to
          42 MHz and the SDS1104X-E roughly 20 to 33 MHz. Both comfortably cover UART, I2C, PWM, audio and the
          switching frequency of small converters; the gap only shows on clocks or edges in the 30 MHz region. Read
          more in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
        <p className="text-muted leading-7 mb-4">
          That bandwidth edge reverses once you use every input. Dividing each scope&apos;s four-channel sample rate
          by its rated bandwidth, the Rigol gets 2.5 samples per cycle at 125 MHz and the Siglent 5 at 100 MHz. Both
          are above the Nyquist minimum of two, but the Siglent has more room for interpolation, so on four fast
          channels at once it draws edges more faithfully. On one or two channels the Rigol&apos;s 1.25 GSa/s and
          625 MSa/s reverse that again. The{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            GSa/s explainer
          </Link>{" "}
          covers why per-channel rate matters more than the headline.
        </p>
        <p className="text-muted leading-7 mb-4">
          Resolution decides how small a detail you can read. At 100 mV per division across eight divisions, an
          8-bit converter divides the 800 mV screen into steps of about 3.1 mV, while a 12-bit converter gets about
          0.2 mV. Real scopes add their own noise, so the practical gain is smaller than that ratio, but on a 20 mV
          ripple riding on a 5 V rail the Rigol shows a cleaner, steadier shape when you zoom in.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration, not a capture: a generator sine fed into a circuit (CH1) and the circuit&apos;s smaller,
                delayed output (CH2). Bode plot repeats this comparison at many frequencies and graphs the result.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.4}
              offset={1}
              second={{ wave: "sine", cycles: 2, amplitude: 1.2, offset: -2, shift: 0.8, label: "CH2 filter output" }}
              labels={{ left: "CH1 generator in", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Instrument count versus channel speed">
              The DHO914S replaces a scope and a basic generator; the SDS1104X-E is the stronger pure scope when all
              four inputs are busy. Decide by whether a signal source is already on your bench.
            </KeyIdea>
            <Callout title="Mains-connected circuits">
              On both scopes the probe ground is tied to the instrument&apos;s ground, which normally reaches mains
              earth through the power cord or adapter and anything else connected to it. Never clip it to a
              mains-referenced node; use a differential probe instead.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          For the same Siglent against Rigol&apos;s cheaper 70 MHz model, see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className={link}>
            Rigol DHO804 vs Siglent SDS1104X-E
          </Link>
          ; for the DHO914 without the generator, see{" "}
          <Link href="/oscilloscopes/rigol-dho914-vs-rigol-dho804" className={link}>
            Rigol DHO914 vs Rigol DHO804
          </Link>
          ; and for another scope with a built-in generator, see{" "}
          <Link href="/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1104Z-S Plus vs Siglent SDS1104X-E
          </Link>
          . Our{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" className={link}>
            home electronics lab scope guide
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          cover the wider field.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a home lab starting from scratch, the Rigol DHO914S is the more complete bench: a 125 MHz 12-bit scope, a 25 MHz generator with Bode plot, up to 50 Mpts and a path to 16 logic channels, all in one USB-C powered box. Choose the Siglent SDS1104X-E if you already own a generator or mostly watch four fast signals together, where its 500 MSa/s per channel, 100,000 wfm/s update rate and free decoding including LIN make it the stronger pure oscilloscope.",
  faqs: [
    {
      question: "Does the Siglent SDS1104X-E have a built-in signal generator like the DHO914S?",
      answer:
        "No. Siglent offers a generator for the four-channel SDS1000X-E models only as an optional USB AWG module. The DHO914S has a single-channel 25 MHz arbitrary/function generator built in, with sine to 25 MHz, square to 15 MHz and arbitrary waveforms to 10 MHz, plus a Bode plot function that uses it.",
    },
    {
      question: "What can I do with the DHO914S Bode plot in a home lab?",
      answer:
        "Measure frequency response. The scope sweeps its generator from as low as 10 Hz up to 25 MHz into your circuit and plots gain and phase at each point. That shows the cutoff of an RC or active filter, the bandwidth of an op-amp stage or the tone curve of an audio circuit without taking readings by hand.",
    },
    {
      question: "Which is better for four-channel work, the DHO914S or the SDS1104X-E?",
      answer:
        "The SDS1104X-E when all four signals are fast. It keeps 500 MSa/s per channel against the Rigol's 312.5 MSa/s, giving about 5 samples per cycle at its rated bandwidth versus 2.5. The Rigol counters with 10 Mpts per channel against 7 Mpts and 12-bit resolution, which help with slower, longer or smaller signals.",
    },
    {
      question: "Is 12-bit resolution or a faster update rate more useful?",
      answer:
        "It depends on the fault. The Rigol's 12 bits show small amplitude details such as rail ripple and sensor noise more clearly. The Siglent's 100,000 wfm/s normal update rate, against Rigol's 30,000, helps rare glitches appear sooner in normal mode, though Rigol's UltraAcquire mode reaches 1,000,000 wfm/s when you switch to it.",
    },
    {
      question: "Do both scopes decode serial buses without extra licences?",
      answer:
        "Yes. Rigol lists parallel, UART, I2C, SPI, CAN and LIN decoding as standard on the DHO914S, and Siglent lists I2C, SPI, UART/RS232, CAN and LIN as standard on the SDS1104X-E. For a home lab working with Arduino, ESP32 or automotive modules, neither scope needs a paid upgrade to read those buses.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho914sVsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
