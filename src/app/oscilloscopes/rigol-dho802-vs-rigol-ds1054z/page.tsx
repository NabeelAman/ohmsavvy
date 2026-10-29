import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// DS1054Z memory/display/decoding per https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf (DSA20100-2020-09) and https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html (checked 2026-10-24).
// The two Rigol sources conflict on memory (datasheet: 24 Mpts standard; product page: 12 Mpts standard, 24 Mpts optional) and the product page calls bus decoding an option; the page says so.
const path = "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z";

const dho802 = picks.find((p) => p.name === "Rigol DHO802")!;
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Rigol DHO802 vs DS1054Z: Key Differences",
  description:
    "Rigol DHO802 vs Rigol DS1054Z: two 12-bit channels at 70 MHz against four channels at 50 MHz. Charts, use cases and which Rigol scope fits your bench.",
  path: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z",
  image: dho802.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO802 vs Rigol DS1054Z",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO802 vs Rigol DS1054Z sets two Rigol generations against each other, and they pull in opposite directions. The DHO802 is the newer design: 70 MHz, 12-bit resolution, a 1024 × 600 touchscreen and standard serial decoding including CAN, but only two channels. The DS1054Z is the long-running beginner favorite at 50 MHz, and it has twice the inputs: four channels, which matters more than any other spec if you watch several signals at once.",
  a: {
    pick: dho802,
    imageAlt: "Rigol DHO802 two-channel 12-bit oscilloscope, front panel",
    chooseIf: [
      "Two signals at a time covers your work: clock and data, input and output, PWM and its filtered result",
      "You want 12-bit resolution for supply ripple, audio and slow sensor outputs",
      "You want UART, I2C, SPI, CAN and parallel decoding with nothing extra to buy",
      "You want HDMI, LAN and a compact unit that takes a USB-C 15 V supply",
    ],
  },
  b: {
    pick: ds1054z,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel digital oscilloscope, front panel",
    chooseIf: [
      "You need three or four signals lined up in time, such as a full SPI bus or a power-up sequence",
      "Your signals stay below roughly 10 to 17 MHz, where 50 MHz is enough",
      "You learn best from the large pool of tutorials and forum answers written around this scope",
      "You want the model in this pair that carries our Hands-on Tested badge",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "625 MSa/s per channel (2 on)", b: "250 MSa/s per channel (3 or 4 on)" },
    { label: "Display", a: "7-inch 1024 × 600 capacitive touchscreen", b: "7-inch 800 × 480 (WVGA)" },
    { label: "Vertical resolution", a: "12-bit", b: "8-bit" },
    { label: "Memory", a: "25 Mpts (1 ch); 10 Mpts (2 ch)", b: "12 Mpts standard, 24 Mpts optional (Rigol sources differ)" },
    { label: "Serial decoding", a: "Standard: parallel, UART, I2C, SPI, CAN", b: "Parallel, RS232/UART, I2C, SPI; listed as an option" },
    { label: "Power input", a: "USB-C, 15 V", b: "100–240 V AC, 50 W max" },
  ],
  differences: [
    "Channels: the DS1054Z has four inputs, the DHO802 two. This is the one area where the older scope clearly leads.",
    "Bandwidth: 70 MHz on the DHO802 against 50 MHz on the DS1054Z.",
    "Sample rate: 1.25 GSa/s on one channel and 625 MSa/s each with both on for the DHO802; 1 GSa/s on one channel and 250 MSa/s each with three or four on for the DS1054Z.",
    "Resolution: 12-bit on the DHO802 against 8-bit on the DS1054Z, per Rigol's datasheets.",
    "Memory: 25 Mpts on one DHO802 channel (10 Mpts on two). Rigol's sources differ on the DS1054Z: its DS1000Z product page says 12 Mpts standard with 24 Mpts optional, while the 2020 datasheet lists 24 Mpts (12 Mpts on two channels, 6 Mpts on three or four).",
    "Decoding: parallel, UART, I2C, SPI and CAN are standard on the DHO802. The DS1000Z datasheet lists parallel, RS232/UART, I2C and SPI decoding (no CAN), and Rigol's product page describes bus trigger and decode as an option.",
    "Both use a 7-inch screen. The DHO802's is a 1024 × 600 capacitive touchscreen with HDMI and LAN, and it runs from a USB-C 15 V supply; the DS1054Z's is 800 × 480, with LAN but no HDMI listed, and it runs from 100–240 V AC.",
    "The DS1054Z carries our Hands-on Tested badge; the DHO802 assessment is desk research from Rigol's datasheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the DHO802 wins every speed figure and the DS1054Z wins the input count. DHO802 figures come from
          our verified pick data; DS1054Z figures come from Rigol&apos;s DS1000Z datasheet and product page, which
          disagree on standard memory and whether decoding is included, so we show both.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: the DHO802 has 20 MHz, or 40%, more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802", value: 70, display: "70 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog inputs: the DS1054Z can watch twice as many signals at once.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802", value: 2, display: "2 channels" },
                { label: "Rigol DS1054Z", value: 4, display: "4 channels", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate, log scale. Each scope&apos;s best single-channel rate and its rate with every channel
                running. Rigol lists the DS1054Z at 500 MSa/s each with two channels on.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DHO802, 1 ch", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO802, 2 ch", value: 625, display: "625 MSa/s each" },
                { label: "DS1054Z, 1 ch", value: 1000, display: "1 GSa/s" },
                { label: "DS1054Z, 2 ch", value: 500, display: "500 MSa/s each" },
                { label: "DS1054Z, 3–4 ch", value: 250, display: "250 MSa/s each" },
              ]}
            />
          </Figure>
          <Figure caption={<>What else Rigol publishes for each scope.</>}>
            <DataTable
              head={["", "DHO802", "DS1054Z"]}
              rows={[
                ["Vertical resolution", "12-bit", "8-bit"],
                ["Memory depth", "25 Mpts (1 ch); 10 Mpts (2 ch)", "12 Mpts std, 24 Mpts opt. (datasheet: 24 Mpts)"],
                ["Serial decoding", "Standard: parallel, UART, I2C, SPI, CAN", "Parallel, UART, I2C, SPI (option per product page)"],
                ["Screen", "7-inch, 1024 × 600, touch", "7-inch, 800 × 480"],
                ["HDMI / LAN", "Yes / Yes", "None listed / Yes"],
                ["Power input", "USB-C, 15 V", "100–240 V AC, 50 W max"],
                ["Signal generator", "None", "None (only DS1000Z -S models)"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Start from the number of signals you need to see together, because that is the one thing you can&apos;t
          work around later. If two is always enough, almost every other line favors the DHO802. If you regularly
          need three or four, the DS1054Z is the only one of the pair that can do it.
        </p>
        <DataTable
          head={["Buyer or job", "Pick", "Reason from the data"]}
          rows={[
            ["Full SPI bus: SCK, MOSI, MISO and chip select", "Rigol DS1054Z", "Four inputs; the DHO802 can show only two of the four lines"],
            ["Power-up order of three or more supply rails", "Rigol DS1054Z", "Four channels capture every rail on one trigger"],
            ["First scope, learning from online tutorials", "Rigol DS1054Z", "Strong community support and documentation"],
            ["Arduino UART or I2C debugging", "Rigol DHO802", "Decoding is standard; Rigol's product page lists DS1054Z decoding as an option"],
            ["CAN bus on a vehicle or robot project", "Rigol DHO802", "CAN decoding is standard; the DS1054Z's decode list has no CAN"],
            ["Bench supply ripple, audio, slow sensors", "Rigol DHO802", "12-bit resolution resolves small changes"],
            ["Long single-shot captures", "Rigol DHO802", "25 Mpts against 12 Mpts standard (24 Mpts with Rigol's option)"],
            ["Clocks in the 10 to 20 MHz range", "Rigol DHO802", "70 MHz gives more margin than 50 MHz"],
            ["Showing a trace on a monitor or projector", "Rigol DHO802", "HDMI output"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each scope can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth is the sine-wave frequency at which the displayed amplitude has fallen by
          3 dB, to about 70% of the real value. The usual rule of thumb asks for three to five times the frequency of
          the signal you want to see clearly. That puts the DS1054Z&apos;s comfortable range at roughly 10 to 17 MHz
          and the DHO802&apos;s at roughly 14 to 23 MHz. An Arduino Uno&apos;s 16 MHz crystal is a useful test case:
          on the DS1054Z it sits at the very top of that band, so its frequency reads correctly but its edges look
          soft; on the DHO802 it is inside the band with a little room left. Our guide to{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          explains the roll-off in more detail.
        </p>
        <p className="text-muted leading-7 mb-4">
          Edge speed follows the same logic. A common approximation for the fastest rise time a scope can display is
          0.35 divided by its bandwidth, which works out to about 7 ns for 50 MHz and 5 ns for 70 MHz. The exact
          figure depends on the front-end design, so treat these as estimates. Either is fine for I2C, UART, PWM and
          most hobby SPI; neither is meant for RF or fast memory buses.
        </p>
        <p className="text-muted leading-7 mb-4">
          Sample rate is where channel count costs you. With all four DS1054Z channels on, each gets 250 MSa/s, or
          five samples per cycle of a 50 MHz sine. The DHO802 keeps 625 MSa/s on each of its two channels, close to
          nine samples per cycle at 70 MHz. Both stay well above the Nyquist minimum of two, but more samples per
          cycle give a cleaner-looking trace without relying on interpolation. Read{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          for how the shared sample-rate budget works.
        </p>
        <p className="text-muted leading-7 mb-4">
          Resolution matters for a different class of signal. A 12-bit converter splits the vertical range into 4,096
          steps, so a few tens of millivolts of ripple on a 12 V rail or a slowly drifting thermistor voltage stays
          smooth when you zoom in. Rigol lists the DS1054Z as 8-bit, or 256 steps, so the DHO802 resolves changes 16
          times finer. For logic signals that only ever sit high or low, extra bits change little.
        </p>
        <p className="text-muted leading-7 mb-4">
          Neither scope can make a test signal: Rigol lists no generator for the DHO802, and in the DS1000Z family
          only the -S models have the built-in 25 MHz source; the DS1054Z doesn&apos;t. To test a filter or amplifier
          you&apos;ll need a separate source with either.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration, not a capture: an I2C-style clock (CH1) and data line (CH2). Two channels show this
                pair completely. A four-wire SPI bus needs two more traces, which only the DS1054Z can add.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={6}
              amplitude={1}
              offset={1.8}
              second={{ wave: "pulse", cycles: 3, amplitude: 1, offset: -1.8, shift: 0.4, label: "CH2 data" }}
              labels={{ left: "CH1 clock", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Count your signals first">
              List the signals you most often need to line up in time. If the list never goes past two, the
              DHO802&apos;s speed, resolution and decoding are the better deal. If it often reaches three or four, no
              amount of resolution makes up for missing inputs.
            </KeyIdea>
            <Callout title="Mains and high-voltage work">
              On a typical bench scope the probe ground clip connects to earth through the power supply or other
              connected equipment, whatever the power input. Clipping it to a mains-referenced point can cause a short.
              Use a differential probe or an isolation approach meant for the job.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          If you like the DHO802 but need four inputs, the DHO804 shares its platform; see{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DHO804 vs Rigol DS1054Z
          </Link>
          . For the wider field, read the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If two channels cover what you measure, the Rigol DHO802 is the more capable scope: 70 MHz, 12-bit resolution against 8-bit, 25 Mpts of memory, standard serial decoding including CAN and a sharper 1024 × 600 touchscreen. If you need to watch three or four signals together, or want the most documented beginner scope and the one we have hands-on tested, the Rigol DS1054Z remains the practical choice.",
  chooseNeitherIf:
    "You need to feed a test signal into a filter or amplifier: Rigol lists no built-in generator for the DHO802, and in the DS1000Z family only the -S models have one, not the plain DS1054Z — either way you'll need a separate signal source.",
  faqs: [
    {
      question: "Is the Rigol DHO802 better than the DS1054Z?",
      answer:
        "On speed and features, yes: 70 MHz against 50 MHz, 1.25 GSa/s against 1 GSa/s on one channel, 12-bit resolution against 8-bit, standard decoding including CAN, and a touchscreen. It has only two channels, though, so for work that needs three or four signals at once the DS1054Z is the better tool.",
    },
    {
      question: "Are two channels enough, or do I need the DS1054Z's four?",
      answer:
        "Two cover most beginner tasks: a clock with its data line, a PWM pin with its filtered output, or a circuit's input with its output. Four become necessary for a full SPI bus with chip select, several supply rails powering up in order, or stepper and motor driver phases viewed together.",
    },
    {
      question: "Does the DS1054Z have 12-bit resolution like the DHO802?",
      answer:
        "No. Rigol's DS1000Z datasheet lists 8-bit vertical resolution for the analog channels, or 256 levels, with up to 12 bits only in its high-resolution acquisition mode. The DHO802 is specified by Rigol as 12-bit, giving 4,096 vertical levels.",
    },
    {
      question: "Which has the faster sample rate with every channel switched on?",
      answer:
        "The DHO802. With both of its channels on it samples at 625 MSa/s each, while the DS1054Z drops to 250 MSa/s each with three or four channels on. Per channel, that is two and a half times the rate, though the DS1054Z is covering twice as many signals.",
    },
    {
      question: "Should I get the DHO802 or the four-channel DHO804 instead?",
      answer:
        "If you like the DHO802's resolution and touchscreen but need four inputs, the DHO804 is the same 70 MHz, 12-bit platform with four channels, at a higher price. Its per-channel rate falls to 312.5 MSa/s with all four on. Our DHO804 vs DS1054Z comparison covers that pairing.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho802VsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
