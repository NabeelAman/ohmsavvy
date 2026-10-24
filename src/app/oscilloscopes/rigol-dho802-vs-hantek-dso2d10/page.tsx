import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10";

export const metadata = buildMetadata({
  title: "Rigol DHO802 vs Hantek DSO2D10 for a Home Lab",
  description:
    "Rigol DHO802 vs Hantek DSO2D10 for a home lab: two 12-bit channels and a touchscreen against two 100 MHz channels with a built-in waveform generator.",
  path: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO802 vs Hantek DSO2D10",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO802 vs Hantek DSO2D10 is a fair fight: both are compact two-channel scopes for a home bench. The difference is what each adds to those two channels. The Rigol adds 12-bit vertical resolution, a 1024 × 600 touchscreen, standard serial decoding and USB-C power. The Hantek adds 100 MHz of bandwidth (against 70 MHz) and a built-in one-channel waveform generator up to 25 MHz.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO802")!,
    imageAlt: "Rigol DHO802 12-bit two-channel oscilloscope, front panel",
    chooseIf: [
      "You look at power-supply ripple, audio or sensor signals where 12-bit detail helps",
      "You debug microcontroller projects and want UART, I2C, SPI and CAN decoding as standard",
      "You want a sharper 1024 × 600 touchscreen, HDMI out to a monitor and LAN",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Hantek DSO2D10")!,
    reviewHref: "/oscilloscopes/hantek-dso2d10-review",
    imageAlt: "Hantek DSO2D10 oscilloscope with built-in waveform generator",
    chooseIf: [
      "You don't own a signal generator and want one in the same box as the scope",
      "Your projects involve filters, amplifiers or sensor inputs you need to drive with a test signal",
      "You want 100 MHz of bandwidth on your two channels",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, both channels on", a: "625 MSa/s per channel", b: "Not stated in our data" },
    { label: "Vertical resolution", a: "12-bit", b: "Not stated in our data" },
    { label: "Display", a: "7-inch 1024 × 600 capacitive touchscreen", b: "7-inch 800 × 480" },
    { label: "Built-in generator", a: "None", b: "1 channel, up to 25 MHz" },
    { label: "Serial decoding", a: "Standard: parallel, UART, I2C, SPI, CAN", b: "Not stated in our data" },
  ],
  differences: [
    "Both have two channels, so channel count doesn't decide this one.",
    "The Hantek has a built-in waveform generator (one channel, up to 25 MHz); Rigol lists no generator and no logic channels for the DHO802.",
    "Bandwidth: 100 MHz on the Hantek against 70 MHz on the Rigol.",
    "The DHO802 is a 12-bit scope; our data for the Hantek doesn't state its vertical resolution.",
    "With one channel on the DHO802 samples at 1.25 GSa/s against the Hantek's 1 GSa/s, and it states 625 MSa/s per channel with both on.",
    "The DHO802 adds a 1024 × 600 touchscreen, HDMI out, LAN, standard serial decoding and a USB-C 15 V supply; the Hantek's 7-inch screen is 800 × 480.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research against maker specifications.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With channels tied at two, the comparison comes down to speed, detail and extras. The Hantek has the
          higher bandwidth; the Rigol has the higher single-channel sample rate, the only stated two-channel rate,
          and the higher-resolution screen.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth: the Hantek has 30 MHz more.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO802", value: 70, display: "70 MHz" },
                { label: "Hantek DSO2D10", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate. The DHO802 states 625 MSa/s per channel with both on; our data gives only the
                Hantek&apos;s 1 GSa/s maximum.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DHO802, 1 channel", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO802, 2 channels", value: 625, display: "625 MSa/s per ch" },
                { label: "DSO2D10, max", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Screen pixels on the same 7-inch size: the Rigol has about 60% more.</>}>
            <BarChart
              items={[
                { label: "DHO802 (1024 × 600)", value: 614400, display: "614,400 px", highlight: true },
                { label: "DSO2D10 (800 × 480)", value: 384000, display: "384,000 px" },
              ]}
            />
          </Figure>
          <Figure caption={<>Home-lab extras, per each pick&apos;s maker specifications.</>}>
            <DataTable
              head={["", "DHO802", "DSO2D10"]}
              rows={[
                ["Signal generator", "None", "1 ch, to 25 MHz"],
                ["Vertical resolution", "12-bit", "Not stated"],
                ["Memory", "25 Mpts (1 ch); 10 Mpts (2 ch)", "Not stated"],
                ["Video out / network", "HDMI, LAN", "Not stated"],
                ["Power", "USB-C, 15 V", "Not stated"],
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO802 vs Hantek DSO2D10 for a Home Lab</h2>
        <p className="text-muted leading-7 mb-4">
          A home lab usually means one shared bench, a limited budget and a mix of projects: an Arduino or ESP32
          sketch one weekend, a guitar pedal or a bench supply the next. That mix decides this comparison better than
          any single spec.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Hantek&apos;s case rests on one fact: it is two instruments in one enclosure. A home bench without a
          signal generator can&apos;t easily test a filter, an amplifier or an input stage, because there is nothing
          to feed in. The DSO2D10&apos;s built-in output (one channel, up to 25 MHz) fills that gap with no extra
          box, power lead or desk space. If you would otherwise buy a separate generator, that is the strongest
          reason to choose it.
        </p>
        <p className="text-muted leading-7 mb-4">
          The Rigol&apos;s case is about what you see on the screen. 12-bit resolution means 4,096 vertical levels
          against the 256 of an 8-bit scope, so the small ripple on a 5 V rail or the output of a slow sensor stays
          smooth when you zoom in. Standard decoding of UART, I2C, SPI and CAN turns microcontroller traffic into
          readable bytes, which is most of what hobby debugging involves. HDMI output lets you put the trace on a
          monitor, LAN connects it to your network, and Rigol specifies a USB-C 15 V supply. It is
          the lower-priced two-channel sibling of the four-channel DHO804.
        </p>
        <DataTable
          head={["Home-lab project", "Better fit", "Why"]}
          rows={[
            ["Arduino or ESP32 serial bus debugging", "Rigol DHO802", "UART, I2C, SPI and CAN decoding are standard"],
            ["Bench power supply or USB charger ripple", "Rigol DHO802", "12-bit resolution keeps small ripple readable"],
            ["Audio amplifiers and guitar pedals", "Hantek DSO2D10", "Built-in generator supplies the test tone; two channels show in and out"],
            ["Active and passive filter experiments", "Hantek DSO2D10", "Sweep the generator and watch the output change"],
            ["Bench with no signal generator yet", "Hantek DSO2D10", "Scope and 25 MHz generator in one unit"],
            ["Showing a trace on a monitor or to a class", "Rigol DHO802", "HDMI output and a 1024 × 600 screen"],
            ["Fast logic edges", "Hantek DSO2D10", "100 MHz against 70 MHz rated bandwidth"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Rated bandwidth is the frequency at which a sine wave is shown about 3 dB low, roughly 70% of its true
          amplitude. The common 3–5x rule says a scope should have three to five times the bandwidth of the fastest
          signal you care about, which gives the DHO802 roughly 14–23 MHz and the DSO2D10 roughly 20–33 MHz. Both
          comfortably cover hobby work: 16 MHz microcontroller clocks are near the top of the DHO802&apos;s range,
          while UART, I2C, PWM, audio and typical switching supplies sit far below it. Square waves need more margin
          than sines because their edges carry higher harmonics, so the Hantek shows sharp digital edges a little
          more faithfully. See{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          for the full explanation.
        </p>
        <p className="text-muted leading-7 mb-4">
          On sample rate the Rigol holds up well with both channels running: 625 MSa/s each is nearly nine samples
          per cycle of a 70 MHz sine, well above the Nyquist minimum of two. The Hantek reaches 1 GSa/s, ten samples
          per cycle at 100 MHz, but our data doesn&apos;t state its rate with both channels on, so check Hantek&apos;s
          datasheet if you plan to run both near full bandwidth. Our explainer on{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          covers why that figure matters.
        </p>
        <p className="text-muted leading-7 mb-4">
          Both run out at the same point: a third signal. Two channels cover input against output, a PWM signal
          against its filtered result, or a clock against one data line. For an SPI bus with chip select and two data
          lines, or several supply rails powering up in order, you need four channels, which puts the{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" className={link}>
            Rigol DHO804
          </Link>{" "}
          on the list instead. And on the Hantek, using the generator for a stimulus-response test normally takes both
          inputs, one for the signal going in and one for what comes out.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Figure
            caption={
              <>
                Illustration: a stimulus-response test. CH1 (green) is a test signal into a low-pass filter; CH2 (blue)
                is the smaller, delayed output. The Hantek makes CH1 itself; the DHO802 needs a separate source.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.4}
              offset={1.2}
              second={{ wave: "sine", cycles: 2, amplitude: 1.2, offset: -1.8, shift: 0.7, label: "CH2 filter out" }}
              labels={{ left: "CH1 generator", right: "illustrative" }}
            />
          </Figure>
          <div className="space-y-4">
            <KeyIdea title="Ask what your bench is missing">
              If you have no signal generator, the Hantek fills two gaps for the price of one instrument. If you
              already have a source, or your projects are mostly microcontroller code and power rails, the
              Rigol&apos;s resolution, decoding and screen do more for you every day.
            </KeyIdea>
            <Callout title="Mains and high-voltage circuits">
              A scope&apos;s probe ground is normally tied to earth through its supply or connected equipment, whether
              it runs from mains or USB-C. Never clip it to a mains-referenced node; use a differential probe for
              mains work.
            </Callout>
          </div>
        </div>
        <p className="text-muted leading-7 mt-4">
          For more options, see the{" "}
          <Link href="/oscilloscopes/best-oscilloscope-for-home-electronics-lab" className={link}>
            best oscilloscope for a home electronics lab
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          and our full{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a home lab that already has a signal source, or works mostly on microcontroller and power projects, the Rigol DHO802 is the better two-channel scope: 12-bit resolution, standard serial decoding, a sharper touchscreen, HDMI and LAN. If your bench has no generator and you build audio circuits, filters or amplifiers, the Hantek DSO2D10's built-in 25 MHz generator and 100 MHz bandwidth make it the more complete single purchase.",
  faqs: [
    {
      question: "Which is better for a home lab, the Rigol DHO802 or the Hantek DSO2D10?",
      answer:
        "It depends on what your bench already has. Without a signal generator, the Hantek's built-in 25 MHz output makes it the more complete single instrument. With a generator, or for mostly microcontroller and power-supply work, the DHO802's 12-bit resolution, standard decoding and 1024 × 600 touchscreen give it the edge.",
    },
    {
      question: "Can the Hantek DSO2D10's generator replace a separate function generator?",
      answer:
        "For many home-lab tasks, yes. It is a single output up to 25 MHz, enough to drive audio circuits, filters and sensor inputs while the scope watches the result. It won't give you two independent signals at once, and it doesn't add scope channels, so check Hantek's documentation for waveform options.",
    },
    {
      question: "Should I buy the DHO802 or the four-channel DHO804?",
      answer:
        "Both share 70 MHz, 12-bit resolution and the same touchscreen. The DHO802 is the lower-priced two-channel model and keeps 625 MSa/s per channel with both on. Pick the DHO804 if you expect to watch three or four signals together, such as an SPI bus or several supply rails.",
    },
    {
      question: "Is two channels enough for Arduino and ESP32 projects?",
      answer:
        "Usually. Two channels cover a clock against data on I2C, a PWM pin against its filtered output, or a trigger against a response. On the DHO802, standard UART, I2C and SPI decoding helps further. You need four when chip select and two SPI data lines must line up with the clock.",
    },
    {
      question: "Does the Rigol DHO802 need mains power?",
      answer:
        "Rigol specifies a USB-C 15 V supply for the DHO802 as its power input. Our data doesn't state battery operation for this model. Like any scope, its ground can connect to earth through the supply or connected equipment, so treat it like any bench scope around mains circuits.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Best oscilloscope for a home electronics lab", href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
  ],
};

export default function RigolDho802VsHantekDso2d10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
