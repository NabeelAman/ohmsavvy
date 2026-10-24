import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// SDS1104X-E memory/display/decoding per https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/ (checked 2026-10-24).
// SDS1104X-E 8-bit resolution and 100-240 V AC power per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (checked 2026-10-24).
const path = "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802";
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const rigol = picks.find((p) => p.name === "Rigol DHO802")!;

export const metadata = buildMetadata({
  title: "SDS1104X-E vs DHO802 for Arduino Projects",
  description:
    "Siglent SDS1104X-E vs Rigol DHO802 for Arduino: four 100 MHz channels against two 12-bit ones. Both decode UART, I2C and SPI as standard.",
  path: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802",
  image: siglent.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-E vs Rigol DHO802 for Arduino",
  path,
  published: "2026-10-24",
  intro:
    "For Arduino work, the Siglent SDS1104X-E vs Rigol DHO802 choice is four channels against two better-equipped ones. The Siglent gives you four 100 MHz inputs and keeps 500 MSa/s on each with all of them running. The Rigol has only two inputs at 70 MHz, but adds 12-bit resolution, 25 Mpts of memory, a 1024 × 600 touchscreen and USB-C power. Both decode UART, I2C, SPI and CAN as standard.",
  a: {
    pick: siglent,
    reviewHref: "/oscilloscopes/siglent-sds1104x-e-review",
    imageAlt: "Siglent SDS1104X-E four-channel 100 MHz digital oscilloscope, front panel",
    chooseIf: [
      "Your sketches drive SPI devices and you want SCK, MOSI, MISO and chip select on screen together",
      "You want 100 MHz of headroom for faster boards and logic edges later on",
      "You watch three or four pins at once, such as several PWM outputs or a sensor's power and signal lines",
    ],
  },
  b: {
    pick: rigol,
    imageAlt: "Rigol DHO802 two-channel 12-bit oscilloscope with touchscreen, front panel",
    chooseIf: [
      "Most of your debugging is one serial bus at a time, and two channels with deeper memory suit you",
      "You read analog sensor outputs or supply ripple where 12-bit detail helps",
      "You want a touchscreen, HDMI out to a monitor and USB-C power on a small desk",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "500 MSa/s per channel (4 ch)", b: "625 MSa/s per channel (2 ch)" },
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Memory", a: "14 Mpts (1 ch per pair); 7 Mpts (all on)", b: "25 Mpts (1 ch); 10 Mpts (2 ch)" },
    { label: "Serial decoding", a: "Standard: I2C, SPI, UART/RS232, CAN, LIN", b: "Standard: parallel, UART, I2C, SPI, CAN" },
    { label: "Display", a: "7-inch 800 × 480 TFT-LCD", b: "7-inch 1024 × 600 capacitive touchscreen" },
  ],
  differences: [
    "Channels: the SDS1104X-E has four, the DHO802 two. On Arduino projects this is the difference you notice first.",
    "Bandwidth: 100 MHz on the Siglent against 70 MHz on the Rigol. Both are far above typical Arduino signal speeds.",
    "Sample rate with every channel in use: 500 MSa/s on each of the Siglent's four, 625 MSa/s on each of the Rigol's two. With one channel on, the DHO802 reaches 1.25 GSa/s and the Siglent 1 GSa/s.",
    "Decoding is standard on both: Siglent includes I2C, SPI, UART/RS232, CAN and LIN; Rigol includes UART, I2C, SPI, CAN and parallel.",
    "Resolution and memory: the DHO802 is 12-bit and holds 25 Mpts with one channel on (10 Mpts with two). Siglent lists the SDS1104X-E as 8-bit with 14 Mpts per channel (7 Mpts with all four on).",
    "The Rigol adds a 1024 × 600 touchscreen, HDMI output and USB-C 15 V power; the Siglent has a 7-inch 800 × 480 screen, runs from 100–240 V AC and also has LAN.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research against maker specifications.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The headline numbers point in opposite directions. The Siglent has more inputs and more bandwidth; the Rigol
          samples faster on one channel and keeps a higher per-channel rate once every input is busy, because it
          only splits its budget two ways instead of four.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog input channels: the Siglent can watch twice as many Arduino pins at once.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 4, display: "4 channels", highlight: true },
                { label: "Rigol DHO802", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated analog bandwidth: 100 MHz against 70 MHz, a 30 MHz gap.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DHO802", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate per channel. With one input on the Rigol is faster; with every input on, the Siglent
                runs twice as many channels at 500 MSa/s each.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DHO802, 1 channel", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "SDS1104X-E, max", value: 1000, display: "1 GSa/s" },
                { label: "DHO802, both on", value: 625, display: "625 MSa/s per ch" },
                { label: "SDS1104X-E, all 4 on", value: 500, display: "500 MSa/s per ch" },
              ]}
            />
          </Figure>
          <Figure caption={<>Features that matter for microcontroller debugging, per each maker&apos;s published specs.</>}>
            <DataTable
              head={["", "SDS1104X-E", "DHO802"]}
              rows={[
                ["Serial decoding", "I2C, SPI, UART, CAN, LIN", "UART, I2C, SPI, CAN, parallel"],
                ["Vertical resolution", "8-bit", "12-bit"],
                ["Memory", "14 Mpts / 7 Mpts", "25 Mpts / 10 Mpts"],
                ["Screen", "800 × 480", "1024 × 600 touch"],
                ["Power", "100–240 V AC", "USB-C, 15 V"],
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Siglent&apos;s figures come from its SDS1000X-E series page and data sheet, which list serial trigger and
          decode as standard. Memory is shared per channel pair, so the SDS1104X-E has 14 Mpts on a channel when its
          partner is off and 7 Mpts each with all four running.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-E vs Rigol DHO802 for Arduino</h2>
        <p className="text-muted leading-7 mb-4">
          Arduino projects are slow by oscilloscope standards. An Uno&apos;s analogWrite PWM runs at a few hundred
          hertz to about 1 kHz, servo pulses repeat at around 50 Hz, I2C usually clocks at 100 or 400 kHz, and hardware
          SPI on a 16 MHz board tops out at 8 MHz. Either scope shows every one of those cleanly, so speed is not
          the question. The questions are how many pins you need to see together and how much help you want reading
          what is on them.
        </p>
        <p className="text-muted leading-7 mb-4">
          SPI is where the channel count bites. A full transaction has four lines: clock, chip select, MOSI and
          MISO. On the SDS1104X-E all four sit on one screen under one trigger, so you can see whether chip select
          drops before the first clock edge and which device is answering. On the DHO802 you choose two, typically
          SCK and MOSI, and repeat the capture to check the others. The same applies to driving three servos or
          comparing several PWM outputs: four inputs let you check their timing against each other directly.
        </p>
        <p className="text-muted leading-7 mb-4">
          Decoding doesn&apos;t separate them. Siglent includes I2C, SPI, UART/RS232, CAN and LIN decoding free on the
          SDS1104X-E, and Rigol lists UART, I2C, SPI, CAN and parallel as standard on the DHO802, so on either scope a
          Serial.print at 115200 baud or an I2C sensor read appears as bytes and addresses, not just square waves you
          count by hand. Two channels are enough for most of that work: UART needs one line per direction and I2C
          only SDA and SCL. Where the Rigol pulls ahead is the analog side: its 12-bit converter against the
          Siglent&apos;s 8-bit helps with a potentiometer, thermistor or microphone feeding an analog pin, or the
          ripple on a 5 V rail from a USB supply. Its 25 Mpts (against 14 Mpts) also holds a longer serial capture.
        </p>
        <DataTable
          head={["Arduino signal", "Typical speed", "Lines to watch", "Better fit"]}
          rows={[
            ["analogWrite PWM (Uno)", "About 490 Hz or 980 Hz", "1 per output", "Either; Siglent for 3–4 outputs at once"],
            ["Hobby servo control", "About 50 Hz frame", "1 per servo", "Siglent when timing several servos"],
            ["UART / Serial monitor", "9,600–115,200 baud", "TX and RX", "Either: both decode UART as standard"],
            ["I2C sensor or OLED", "100 or 400 kHz", "SDA and SCL", "Either: two channels and standard decoding"],
            ["SPI display or SD card", "Up to 8 MHz on a 16 MHz board", "SCK, CS, MOSI, MISO", "Siglent: all four lines at once"],
            ["Analog sensor output", "Slow, small changes", "1", "Rigol: 12-bit resolution"],
          ]}
        />
        <p className="text-xs text-muted leading-5 mt-3">
          Speeds are typical defaults for an Arduino Uno and common libraries; your board and code may differ.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Student following an Arduino course", "Either", "Both decode UART and I2C as standard; pick on channels or screen"],
            ["Maker building SPI displays, SD loggers or LED drivers", "Siglent SDS1104X-E", "Four channels show the whole SPI bus in one capture"],
            ["Robotics with several servos or motor drivers", "Siglent SDS1104X-E", "Compare up to four control signals on one trigger"],
            ["Sensor and analog-input projects", "Rigol DHO802", "12-bit against 8-bit resolves small voltage changes"],
            ["Plans to move on to faster boards", "Siglent SDS1104X-E", "100 MHz against 70 MHz of rated bandwidth"],
            ["Small desk, laptop-style setup", "Rigol DHO802", "USB-C power, HDMI out and a touchscreen"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is where a sine wave has already lost 3 dB of amplitude, so it is a limit, not
          a working range. The usual rule of thumb asks for three to five times your fastest signal: about 20–33 MHz
          for the 100 MHz Siglent and 14–23 MHz for the 70 MHz Rigol. Every Arduino signal in the table above fits
          inside both. The 16 MHz crystal on an Uno sits inside the Rigol&apos;s range and comfortably inside the
          Siglent&apos;s. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth explainer
          </Link>{" "}
          covers why the margin matters.
        </p>
        <p className="text-muted leading-7 mb-4">
          Where the gap does show is on edges. A digital pin switching between 0 and 5 V can change in a few
          nanoseconds, depending on the chip and load, and a rough estimate of the fastest rise time a scope can
          display is 0.35 divided by its bandwidth: about 3.5 ns on the Siglent and 5 ns on the Rigol. If you
          measure ringing or overshoot on a fast edge, the SDS1104X-E shows a little more of it. For checking
          whether a bus works, the difference rarely matters.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate is generous on both. At 500 MSa/s, each Siglent channel takes 62 samples in every period of
          an 8 MHz SPI clock; at 625 MSa/s the Rigol takes 78. Nyquist sets the floor at two samples per cycle, so
          both are far beyond it for Arduino work. The DHO802&apos;s 25 Mpts of memory (10 Mpts with both channels on)
          lets it hold a longer stretch of serial traffic at a high sample rate than the Siglent&apos;s 14 Mpts (7 Mpts
          per channel with all four on). Our guide to{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          explains how sample rate and memory trade off.
        </p>
        <p className="text-muted leading-7 mb-4">
          The limits are different for each scope. The DHO802 can&apos;t show more than two signals together and has
          no built-in generator or logic channels, so an eight-bit parallel bus needs a separate logic analyzer. The
          SDS1104X-E is 8-bit, so small analog changes resolve more coarsely, and its screen is a non-touch 800 ×
          480. Siglent sells 16 digital channels and a USB signal generator for the four-channel model only as paid
          options.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration: two channels on an SPI bus. CH1 (green) is the clock; CH2 (blue) is one data line. Chip
                select and the return data line need channels 3 and 4, which only the SDS1104X-E has.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={8}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "pulse", cycles: 3, amplitude: 1.2, offset: -1.8, shift: 0.4, label: "CH2 MOSI" }}
              labels={{ left: "CH1 SCK", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Count the pins before the megahertz">
              For Arduino debugging, list the signals that must line up in time. If that list often runs to three or
              four, the SDS1104X-E saves repeated captures. If it is usually one bus of one or two lines, both decode
              it; the DHO802 adds 12-bit detail, deeper memory and a touchscreen.
            </KeyIdea>
            <Callout title="Arduino projects that switch mains">
              Relay and dimmer projects put mains voltage on the board. A scope&apos;s probe ground connects to earth
              through its supply or attached equipment, so never clip it to the mains side. Measure only the
              low-voltage logic, or use a differential probe.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          For a wider field, see the{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-arduino-projects" className={link}>
            best oscilloscope for Arduino projects
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          , our{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>{" "}
          and the two-channel matchup in{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" className={link}>
            Rigol DHO802 vs Hantek DSO2D10
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For Arduino work that involves SPI peripherals, several servos or more than two signals at once, the Siglent SDS1104X-E is the better buy: four channels, 100 MHz and 500 MSa/s on each channel with all four running. Both decode UART, I2C and SPI as standard, so if your projects are mostly one serial bus or analog sensors at a time, the Rigol DHO802 does more with its two channels: 12-bit resolution, 25 Mpts of memory, a 1024 × 600 touchscreen and USB-C power.",
  faqs: [
    {
      question: "Is the Siglent SDS1104X-E or the Rigol DHO802 better for Arduino?",
      answer:
        "It depends on how many signals you watch at once. For SPI buses, multiple servos or several PWM outputs, the SDS1104X-E's four channels are the bigger advantage. Both decode UART, I2C and SPI as standard, so for one-bus debugging and analog sensors the DHO802's 12-bit resolution, deeper memory and touchscreen make its two channels more useful.",
    },
    {
      question: "Is 70 MHz enough bandwidth for Arduino projects?",
      answer:
        "Yes for typical Arduino signals. By the 3–5x rule, 70 MHz suits signals up to roughly 14–23 MHz, and an Uno's PWM, I2C, UART and 8 MHz maximum hardware SPI clock are all below that. The Siglent's 100 MHz mainly helps with very fast edges and faster boards later.",
    },
    {
      question: "Can I decode Arduino serial data on the Rigol DHO802?",
      answer:
        "Yes. Rigol lists parallel, UART, I2C, SPI and CAN decoding as standard on the DHO802, so Serial output and I2C transactions can be shown as decoded bytes rather than raw square waves. With two channels you can decode UART TX and RX, or I2C's SDA and SCL, together. The SDS1104X-E also decodes I2C, SPI, UART, CAN and LIN as standard.",
    },
    {
      question: "Do I need four channels to debug SPI on an Arduino?",
      answer:
        "Not always. Two channels on clock and one data line confirm that a transfer is happening. To check chip select timing and both data directions in a single capture you need four, which the SDS1104X-E has and the DHO802 doesn't. With two you repeat captures on different line pairs.",
    },
    {
      question: "Which samples faster, the SDS1104X-E or the DHO802?",
      answer:
        "With one channel on, the DHO802 at 1.25 GSa/s against the Siglent's 1 GSa/s. With both of its channels on the Rigol keeps 625 MSa/s each, while the Siglent keeps 500 MSa/s each with all four on. For Arduino signals both rates are far more than needed.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P for Arduino", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
  ],
};

export default function SiglentSds1104xeVsRigolDho802Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
