import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// DS1054Z memory/display/decoding per https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf (DSA20100-2020-09) and https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html (checked 2026-10-24).
// The two Rigol sources conflict on memory (datasheet: 24 Mpts standard; product page: 12 Mpts standard, 24 Mpts optional) and the product page calls bus decoding an option; the page says so.
const path = "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p";

export const metadata = buildMetadata({
  title: "DS1054Z vs DSO5102P for Arduino Projects",
  description:
    "Rigol DS1054Z vs Hantek DSO5102P for Arduino: four inputs at 50 MHz or two at 100 MHz. SPI, I2C, UART and PWM examples, charts and which scope to buy.",
  path: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p",
});

const link = "text-accent hover:underline";

const moreComparisons: { label: string; href: string }[] = [
  { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
  { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
  { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
  { label: "Siglent SDS1104X-E vs Rigol DHO802 for Arduino", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
  { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
  { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
  { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
  { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
  { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
  { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
  { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
  { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
  { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
  { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
  { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
  { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
  { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
  { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
  { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
  { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
  { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
  { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
  { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
  { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
  { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
  { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
];

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Hantek DSO5102P for Arduino",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DS1054Z vs Hantek DSO5102P for Arduino work comes down to how many pins you need to watch at once. The Rigol has four inputs at 50 MHz; the Hantek has two at 100 MHz, with built-in math, FFT, 32 automatic measurements and a pulse-width trigger, but a short record length. Arduino signals are slow enough for either scope's bandwidth, so inputs and memory decide this one more than megahertz.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel oscilloscope, front panel",
    chooseIf: [
      "Your sketches use SPI, or you want to see a sensor's clock, data and chip-select pins in one capture",
      "You debug timing between several pins, such as a stepper driver's step, direction and enable lines",
      "You want the pick in this pair that carries our Hands-on Tested badge",
      "You'd like strong community support and documentation to lean on while you learn",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO5102P")!,
    imageAlt: "Hantek DSO5102P two-channel 100 MHz digital storage oscilloscope, front panel",
    chooseIf: [
      "Two pins at a time covers you: I2C's SDA and SCL, a UART's TX and RX, or one PWM output and its load",
      "You want automatic measurements for PWM frequency and duty cycle, plus math and FFT",
      "You move on to faster 32-bit boards and want bandwidth headroom for their clocks",
      "You buy it clearly cheaper than the DS1054Z on the day",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "250 MSa/s per channel (3–4 channels)", b: "Per-channel figure not stated in our data" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Record length", a: "12 Mpts standard, 24 Mpts optional (Rigol sources differ)", b: "24K (datasheet) or 40K (product page)" },
    { label: "Serial decoding", a: "Parallel, RS232/UART, I2C, SPI; listed as an option", b: "None listed" },
    { label: "OhmSavvy assessment", a: "Hands-on Tested badge", b: "Desk research from Hantek's specs" },
  ],
  differences: [
    "Inputs: four on the DS1054Z, two on the DSO5102P. For SPI and multi-pin timing, this is the deciding spec.",
    "Bandwidth: 100 MHz on the Hantek against 50 MHz on the Rigol. Both are far above what a 16 MHz Arduino Uno produces.",
    "Both quote 1 GSa/s. Rigol's figure is for one channel and falls to 250 MSa/s per channel with three or four on; Hantek quotes 1 GSa/s real-time without a per-channel breakdown in our data.",
    "Hantek lists a record length of 24K points in its datasheet and 40K on its product page; the sources disagree, and either is short for long bus captures. Rigol lists millions of points for the DS1054Z, though its own sources differ too: 12 Mpts standard with 24 Mpts optional on the product page, 24 Mpts in the 2020 datasheet.",
    "Rigol's DS1000Z datasheet lists parallel, RS232/UART, I2C and SPI decoding, and its product page describes bus trigger and decode as an option for the series.",
    "Hantek lists edge, pulse-width, video, slope and overtime triggers, math, FFT, 32 automatic measurements and pass/fail testing, but no serial decoding, generator or logic channels.",
    "The DS1054Z carries our Hands-on Tested badge and a 4.8 OhmSavvy rating; the DSO5102P is rated 4.2 from desk research.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Each maker&apos;s published figures, charted. Where a figure is missing from one side, it is left out
          rather than estimated.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth at the −3 dB point: the DSO5102P doubles the DS1054Z.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog inputs, against the number of wires on common Arduino buses.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4 inputs", highlight: true },
                { label: "Hantek DSO5102P", value: 2, display: "2 inputs" },
                { label: "SPI bus (SCK, MOSI, MISO, CS)", value: 4, display: "4 wires" },
                { label: "I2C bus (SDA, SCL)", value: 2, display: "2 wires" },
              ]}
            />
          </Figure>
          <Figure caption={<>Peak sample rate. Rigol gives 1 GSa/s for one channel and 250 MSa/s each with three or four; Hantek quotes 1 GSa/s real-time.</>}>
            <BarChart
              items={[
                { label: "DS1054Z, 1 channel", value: 1000, display: "1 GSa/s" },
                { label: "DS1054Z, 3–4 channels", value: 250, display: "250 MSa/s" },
                { label: "DSO5102P", value: 1000, display: "1 GSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Log scale, in microseconds: how long the DSO5102P&apos;s record lasts at 1 GSa/s, against the length of one Arduino byte on common buses.</>}>
            <BarChart
              log
              items={[
                { label: "DSO5102P, 24K pts at 1 GSa/s", value: 24, display: "24 µs" },
                { label: "DSO5102P, 40K pts at 1 GSa/s", value: 40, display: "40 µs" },
                { label: "One I2C byte + ACK at 400 kHz", value: 22.5, display: "22.5 µs" },
                { label: "One UART byte at 9600 baud", value: 1042, display: "1,042 µs", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The last chart explains why record length matters more on an Arduino bench than the bandwidth headline. To
          show a whole 9600-baud UART byte, the Hantek has to slow its sampling well below 1 GSa/s, and to show a
          20-byte message (about 21 ms) its 24K to 40K points work out to roughly 1.1 to 1.9 MSa/s. That is still
          over a hundred samples per UART bit, so slow serial is fine; the squeeze comes with long bursts of fast SPI.
          Rigol lists 12 Mpts standard for the DS1054Z on its product page (24 Mpts as an option; the 2020 datasheet
          says 24 Mpts), hundreds of times the Hantek&apos;s record, so it can hold that 21 ms message at well over
          100 MSa/s. Background on these figures:{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">For Arduino projects: which pins each scope can show you</h2>
        <p className="text-muted leading-7 mb-4">
          A classic Arduino Uno runs from a 16 MHz clock, and the signals on its header are slower still. By the
          usual rule of buying three to five times the signal frequency, the DS1054Z is comfortable up to roughly 10
          to 17 MHz and the DSO5102P up to roughly 20 to 33 MHz. Square-wave edges carry harmonics well above the
          fundamental, so faster is never wasted, but typical Arduino buses fit inside both scopes&apos; range:
        </p>
        <DataTable
          head={["Arduino signal", "Typical speed", "DS1054Z", "DSO5102P"]}
          rows={[
            ["analogWrite PWM on an Uno", "about 490 Hz (980 Hz on pins 5 and 6)", "Yes; up to 4 outputs at once", "Yes; 2 at once, with automatic duty-cycle readings"],
            ["UART / Serial", "9600 to 115200 baud", "TX, RX and a trigger pin together", "TX and RX together"],
            ["I2C sensors and displays", "100 kHz or 400 kHz", "SDA, SCL plus an interrupt pin", "SDA and SCL: exactly two inputs"],
            ["SPI (SD cards, TFTs, radios)", "Up to 8 MHz on an Uno", "All four lines in one capture", "Two lines per capture"],
            ["Faster 32-bit boards", "Clocks and SPI can reach tens of MHz", "Near or past its comfortable ceiling", "More headroom at 100 MHz"],
          ]}
        />
        <h3 className="text-lg font-semibold mt-6 mb-2">Rigol DS1054Z: the multi-pin view</h3>
        <p className="text-muted leading-7 mb-4">
          Most Arduino bugs are timing bugs between pins: a chip select that rises one clock too early, a stepper
          driver that misses steps because direction changes too close to a step pulse, an interrupt that fires before
          the sensor has finished its I2C reply. Seeing those means seeing three or four pins in one capture, and that
          is what the DS1054Z is for. With all four inputs on it still samples each at 250 MSa/s, which is over 30
          samples per cycle of an 8 MHz SPI clock. Its limits for Arduino work are the menus, which take time to learn,
          and the 50 MHz ceiling, which only starts to matter if you move to much faster boards. More in our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            DS1054Z review
          </Link>
          .
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO5102P: two pins, measured for you</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO5102P suits sketches where two pins tell the whole story. I2C needs exactly two inputs, and a UART
          link needs at most two. Its 32 automatic measurements save cursor work when you are tuning PWM frequency and
          duty cycle, the pulse-width trigger can wait for a pulse shorter or longer than you expect (a handy way to
          catch a missed servo pulse), and FFT shows noise from a motor or a switching regulator on an analog input.
          What it can&apos;t do is show SPI&apos;s four lines together, decode any bus into bytes, or keep a high
          sample rate across a long transaction, given its 24K to 40K point record.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Two inputs on an I2C bus: SCL as a steady clock (green), SDA changing between clock pulses (blue). A sketch of the idea, not a capture.</>}>
            <ScopeScreen
              wave="square"
              cycles={8}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "pulse", cycles: 3, amplitude: 1.2, offset: -1.8, label: "SDA" }}
              labels={{ left: "SCL / SDA" }}
            />
          </Figure>
          <Figure caption={<>A short glitch on a PWM line: the kind of event a pulse-width trigger is built to catch. A sketch of the idea, not a capture.</>}>
            <ScopeScreen wave="spike" cycles={1} amplitude={2.5} offset={-1.5} shift={4} triggerLevel={0} labels={{ left: "Glitch on a PWM pin" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Count wires before megahertz">
            For Arduino work, write down the bus or pins you&apos;ll probe most. If the answer is SPI, several
            stepper or motor-driver lines, or anything plus a trigger pin, four inputs win. If it is I2C, serial or a
            single PWM output, two inputs are enough and the Hantek&apos;s measurements earn their keep. Our{" "}
            <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
              Arduino oscilloscope guide
            </Link>{" "}
            covers other options.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Relay modules and mains">
            The DSO5102P runs from mains, and on any earthed bench scope the probe ground clip is normally connected to
            mains earth. That is harmless on a USB-powered Arduino, but never clip it onto the AC side of a relay module
            or a non-isolated power supply. Use a differential probe or isolation rated for mains if you must measure
            there.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your Arduino work", "Pick", "Why, from the specs"]}
          rows={[
            ["SD cards, TFT screens or radios over SPI", "Rigol DS1054Z", "Four inputs cover SCK, MOSI, MISO and CS"],
            ["Stepper and motor-driver timing", "Rigol DS1054Z", "Step, direction and enable on one screen"],
            ["I2C sensors and OLED displays", "Either", "Both cover SDA and SCL; only Rigol lists I2C decoding (an option per its product page)"],
            ["Tuning PWM for LEDs, servos or motors", "Hantek DSO5102P", "Automatic measurements and a pulse-width trigger"],
            ["Long serial or SPI transactions at a high sample rate", "Rigol DS1054Z", "Hantek's record is only 24K–40K points"],
            ["Learning to use a scope for the first time", "Rigol DS1054Z", "Hands-on Tested badge and a large user community"],
            ["Moving to fast 32-bit boards", "Hantek DSO5102P", "100 MHz leaves more headroom than 50 MHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The DSO5102P has no full OhmSavvy review yet; it sits in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . If you are still deciding what matters, start with the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">More scope comparisons</h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {moreComparisons.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={link}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  ),
  bottomLine:
    "For most Arduino benches the Rigol DS1054Z is the better buy: four inputs show SPI and multi-pin timing in one capture, 50 MHz is ample for an Uno, and it carries our Hands-on Tested badge. The Hantek DSO5102P makes sense if your projects are mostly I2C, serial and PWM on two pins, you value its automatic measurements and pulse-width trigger, and it costs clearly less when you buy.",
  faqs: [
    {
      question: "Is 50 MHz enough for Arduino, or do I need the Hantek's 100 MHz?",
      answer:
        "50 MHz is enough for a classic Arduino. An Uno runs at 16 MHz and its SPI clock tops out at 8 MHz, inside the DS1054Z's comfortable range of roughly 10 to 17 MHz. The DSO5102P's 100 MHz becomes useful on faster 32-bit boards whose clocks and SPI buses run at tens of megahertz.",
    },
    {
      question: "Can either scope decode Arduino serial, I2C or SPI?",
      answer:
        "Hantek lists no serial decoding for the DSO5102P, so you would read bits from the waveform by eye. Rigol's DS1000Z datasheet lists parallel, RS232/UART, I2C and SPI decoding for the DS1054Z, but its product page describes bus trigger and decode as an option, so check what is enabled on the unit you buy. Either way, both scopes show the raw signals, which is enough to spot wrong timing or missing pulses.",
    },
    {
      question: "How many channels do I need to debug SPI on an Arduino?",
      answer:
        "Four to see the whole bus: clock, MOSI, MISO and chip select. The DS1054Z can show all four in one capture. On the two-input DSO5102P you would probe two lines at a time, typically clock with one data line, and repeat the capture for the others.",
    },
    {
      question: "Is the DSO5102P's short memory a problem for Arduino work?",
      answer:
        "Sometimes. Hantek lists 24K points in its datasheet and 40K on its product page. That holds 24 to 40 microseconds at 1 GSa/s, so longer captures force a lower sample rate. Slow UART and PWM still look fine, but long bursts of fast SPI or I2C traffic may be under-sampled.",
    },
    {
      question: "Which one is hands-on tested?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge. The Hantek DSO5102P assessment is desk research from Hantek's datasheet and product page, which disagree on record length, and it has no full OhmSavvy review yet. Treat its verdict here as a spec-sheet comparison.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function RigolDs1054zVsHantekDso5102pPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
