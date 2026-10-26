import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d";

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs FNIRSI 1014D for Beginners",
  description:
    "Rigol DHO804 vs FNIRSI 1014D for beginners: four 12-bit channels and a touchscreen against 100 MHz, two channels and a built-in signal generator.",
  path: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d",
  image: "https://m.media-amazon.com/images/I/71FtRIGVfLL._SL1500_.jpg",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs FNIRSI 1014D for Beginners",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DHO804 vs FNIRSI 1014D for beginners is a question of what you want your first scope to teach you. The Rigol is a 70 MHz, four-channel, 12-bit instrument with a 1024 × 600 touchscreen, deep memory and standard serial decoding, but no signal source. The FNIRSI is a 100 MHz, two-channel, 8-bit scope with a built-in DDS generator and loosely documented memory.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO804")!,
    imageAlt: "Rigol DHO804 four-channel 12-bit oscilloscope with touchscreen, front panel",
    chooseIf: [
      "You want to learn on a scope with fully published specs, including memory and per-channel sample rate",
      "Your projects involve several signals at once, such as an SPI bus or a set of supply rails",
      "You want serial decoding of UART, I2C, SPI, CAN and parallel buses from day one",
      "Fine vertical detail matters: ripple, noise, small sensor outputs",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI 1014D")!,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in signal generator",
    chooseIf: [
      "You have no signal generator and want known test signals to practice on",
      "Two channels cover what you need to see at once",
      "You want a kit that already includes a 100X high-voltage probe alongside two 1X/10X probes",
      "You value 100 MHz of rated bandwidth over channel count and vertical resolution",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "12-bit", b: "8-bit" },
    { label: "Display", a: "7-inch 1024 × 600 capacitive touchscreen", b: "7-inch 800 × 480" },
    { label: "Memory", a: "25 Mpts (1 ch); 5 Mpts (4 ch)", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Sample rate, all channels on", a: "312.5 MSa/s per channel (4 ch)", b: "Not stated by FNIRSI" },
    { label: "Built-in signal generator", a: "None", b: "1-ch DDS: sine to 10 MHz, other waveforms to 2 MHz, 2.5 Vpp" },
    { label: "Power", a: "USB-C", b: "5 V adapter" },
  ],
  differences: [
    "Channels: four on the DHO804, two on the 1014D. For a beginner this decides whether you can watch a whole bus or just a pair of signals.",
    "Vertical resolution: 12-bit on the Rigol (4,096 levels) against 8-bit on the FNIRSI (256 levels).",
    "Bandwidth: 100 MHz on the 1014D against 70 MHz on the DHO804. Both are far above what most first projects need.",
    "Only the 1014D has a built-in generator: one DDS channel, sine to 10 MHz and other waveforms to 2 MHz at 2.5 Vpp. Rigol lists no generator for the DHO804.",
    "Memory: Rigol publishes 25 Mpts with one channel and 5 Mpts with four; FNIRSI quotes only \"240Kbit\" and doesn't state the per-channel sample rate with both channels on.",
    "The DHO804 adds a 1024 × 600 touchscreen, HDMI output, standard serial decoding and USB-C power. FNIRSI lists FFT, X-Y and roll modes and USB export for the 1014D.",
    "The DHO804 carries our Hands-on Tested badge; the FNIRSI 1014D is assessed from FNIRSI's specifications and the official Amazon listing.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Read the headline numbers alone and the FNIRSI looks like the faster scope. Read the rest of the sheet and
          the Rigol pulls ahead on channels, resolution and documented memory. The four charts below use only the
          figures each maker publishes, as recorded in our beginner roundup.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (−3 dB): the 1014D is rated 30 MHz higher.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
                { label: "FNIRSI 1014D", value: 100, display: "100 MHz", highlight: true },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate, log scale. Rigol publishes both its one-channel and four-channel figures; FNIRSI gives
                only its maximum, not the rate per channel with both on.
              </>
            }
          >
            <BarChart
              log
              items={[
                { label: "DHO804, 1 ch on", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO804, 4 ch on", value: 312.5, display: "312.5 MSa/s each" },
                { label: "1014D, maximum", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels: the DHO804 has twice as many.</>}>
            <BarChart
              items={[
                { label: "Rigol DHO804", value: 4, display: "4 channels", highlight: true },
                { label: "FNIRSI 1014D", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Vertical levels from ADC resolution, log scale: 12-bit gives 4,096 steps, 8-bit gives 256.</>}>
            <BarChart
              log
              items={[
                { label: "DHO804 (12-bit)", value: 4096, display: "4,096 levels", highlight: true },
                { label: "1014D (8-bit)", value: 256, display: "256 levels" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          On one channel the two converters are evenly matched for their bandwidths: the DHO804 takes about 18
          samples per cycle of a 70 MHz sine and the 1014D 10 per cycle of a 100 MHz sine, both well clear of the
          Nyquist minimum of two. The gap is in what happens next. Rigol tells you each of four channels gets 312.5
          MSa/s; FNIRSI doesn&apos;t say what each of its two gets. If samples per second is a new idea, start
          with{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO804 vs FNIRSI 1014D for beginners</h2>
        <p className="text-muted leading-7 mb-4">
          A first oscilloscope has two jobs. It has to show your own circuits clearly enough that you trust what
          you see, and it has to help you learn what a correct waveform looks like. These two scopes split those
          jobs between them.
        </p>
        <h3 className="text-lg font-semibold mb-2">Learning with known signals: the 1014D&apos;s advantage</h3>
        <p className="text-muted leading-7 mb-4">
          The fastest way to learn triggering, timebase and volts-per-division is to feed the scope a signal whose
          shape and frequency you already know. The 1014D makes its own: connect the generator output to channel 1,
          pick a sine, square or one of FNIRSI&apos;s standard waveforms (its spec table and Amazon listing say 14;
          another part of FNIRSI&apos;s page says 12), and practice measuring it. Run the same signal through a
          simple RC filter to channel 2 and you can see phase shift and attenuation on one screen. A DHO804 owner
          has to borrow those signals from a microcontroller pin or buy a separate generator.
        </p>
        <h3 className="text-lg font-semibold mb-2">Seeing real projects clearly: the DHO804&apos;s advantage</h3>
        <p className="text-muted leading-7 mb-4">
          Once you are debugging your own boards, the bottleneck moves. A typical beginner fault, such as a sensor
          that answers on I2C only some of the time, involves a clock, a data line and often a supply rail. Four
          channels show all of them on one trigger, and the DHO804 decodes UART, I2C, SPI, CAN and parallel traffic
          as standard, so you read bytes rather than counting edges. Our data for the 1014D doesn&apos;t list serial
          decoding. The 25 Mpt memory lets you capture a long burst at a fast timebase and zoom in afterwards; with
          the 1014D&apos;s short &quot;240Kbit&quot; figure you will more often have to choose between a long
          window and fine detail.
        </p>
        <h3 className="text-lg font-semibold mb-2">Ease of use</h3>
        <p className="text-muted leading-7 mb-4">
          Both have 7-inch screens. The Rigol&apos;s is a capacitive touchscreen at 1024 × 600, and it adds HDMI out
          for a larger monitor, which helps if you are following a course or sharing a bench. The FNIRSI&apos;s 800
          × 480 panel is the same size at lower resolution. The DHO804 runs from USB-C, so it can sit on a portable
          power source; the 1014D runs from a 5 V adapter.
        </p>
        <KeyIdea title="What 12 bits buys a beginner">
          On an 8-bit scope a signal filling one division at a sensitive setting is drawn from about 32 of the 256
          steps, so small ripple can look like a staircase. The DHO804 has sixteen times as many steps for the same
          screen height. You notice it most on power-supply ripple, audio and slow sensor signals, exactly the
          things many first projects involve.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s rated bandwidth marks where a sine input has already dropped by 3 dB, so readings are only
          trustworthy well below it. Applying the usual three-to-five-times margin, the DHO804 handles signals up to
          roughly 14–23 MHz and the 1014D up to roughly 20–33 MHz. Everything a beginner usually builds sits inside
          both ranges: Arduino and ESP32 PWM, UART at common baud rates, 100 kHz and 400 kHz I2C, hobby-speed SPI,
          audio amplifiers and the switching frequency of most small buck converters. Our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          walks through the margin in detail.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 1014D&apos;s extra bandwidth shows up on fast edges. Using the common 0.35 ÷ bandwidth estimate, the
          fastest rise time each can display is about 5 ns for the DHO804 and 3.5 ns for the 1014D. That matters
          when you are judging overshoot on a fast logic edge; it rarely matters for a 1 kHz PWM signal whose edges
          you only need to time.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration, not a capture: a generator square wave (CH1) and the same signal after an RC low-pass
                filter (CH2), the kind of first experiment the 1014D&apos;s built-in source makes easy.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.3}
              offset={1.8}
              second={{ wave: "square-under", cycles: 2, amplitude: 1.3, offset: -1.8, label: "CH2 after RC filter" }}
              labels={{ left: "CH1 generator", right: "illustrative" }}
            />
          </Figure>
          <DataTable
            head={["Limit", "DHO804", "1014D"]}
            rows={[
              ["Comfortable signal range", "~14–23 MHz", "~20–33 MHz"],
              ["Signals at once", "4", "2"],
              ["Make its own test signal", "No", "Yes, sine to 10 MHz"],
              ["Long captures at fast timebase", "25 Mpts (1 ch)", "\"240Kbit\""],
              ["Per-channel rate, all on", "312.5 MSa/s", "Not stated"],
            ]}
          />
        </div>
        <Callout title="Mains and high voltage">
          The 1014D kit&apos;s 100X probe extends the voltage you can display, but its ground clip still connects to
          the scope&apos;s ground, which on a mains-powered bench setup normally means earth. Neither scope&apos;s
          input or isolation rating is in our verified data. Never clip a ground lead onto mains or the primary side
          of a supply; use a differential probe for that work.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Complete beginner with no other test gear", "FNIRSI 1014D", "Built-in generator gives known signals to learn on"],
            ["Arduino or ESP32 projects with I2C or SPI sensors", "Rigol DHO804", "Four channels plus standard serial decoding"],
            ["Testing filters, amplifiers and audio stages", "FNIRSI 1014D", "Generator drives the input while CH2 shows the output"],
            ["Supply ripple and small sensor signals", "Rigol DHO804", "12-bit resolution, 4,096 levels against 256"],
            ["Long captures of intermittent faults", "Rigol DHO804", "25 Mpts published against a loosely quoted 240Kbit"],
            ["Fastest edges on one or two signals", "FNIRSI 1014D", "100 MHz rated against 70 MHz"],
            ["Classroom or shared bench with a monitor", "Rigol DHO804", "HDMI output and a 1024 × 600 touchscreen"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the full field, see the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          and our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          . Related match-ups:{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" className={link}>
            FNIRSI 1014D vs DSO-TC3
          </Link>{" "}
          if a pocket tool is also on your list,{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" className={link}>
            Rigol DHO804 vs Hantek DSO2D10
          </Link>{" "}
          for another generator-equipped rival, and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            DHO804 vs DS1054Z
          </Link>{" "}
          for Rigol&apos;s older four-channel model.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most beginners who will move quickly from practice signals to real projects, the Rigol DHO804 is the better first scope: four channels, 12-bit resolution, published deep memory, standard serial decoding and a sharper touchscreen. The FNIRSI 1014D is the better buy if you own no other test gear and want a built-in signal source to learn on, and two channels cover your work.",
  faqs: [
    {
      question: "Is the Rigol DHO804 or the FNIRSI 1014D better for a complete beginner?",
      answer:
        "It depends on what else you own. With no signal source at all, the 1014D's built-in generator gives you known waveforms to practice triggering and measurement on. If you already have a microcontroller or generator to supply signals, the DHO804's four channels, 12-bit resolution and serial decoding will serve you longer.",
    },
    {
      question: "Does the FNIRSI 1014D's 100 MHz make it faster than the Rigol DHO804?",
      answer:
        "Only in rated bandwidth. The 1014D is rated 100 MHz against 70 MHz, so it shows fast edges a little more faithfully. The DHO804 has the higher single-channel sample rate (1.25 GSa/s against 1 GSa/s), publishes its four-channel rate, and has far deeper documented memory.",
    },
    {
      question: "Can the Rigol DHO804 generate test signals like the FNIRSI 1014D?",
      answer:
        "No. Rigol lists no built-in signal generator or logic channels for the DHO804. The 1014D has a single-channel DDS generator with sine up to 10 MHz and other waveforms up to 2 MHz at 2.5 Vpp. DHO804 owners would add a separate generator or use a microcontroller pin.",
    },
    {
      question: "How much memory does the FNIRSI 1014D have?",
      answer:
        "FNIRSI quotes it only as 240Kbit and doesn't give a per-channel point count, so it can't be compared directly with the DHO804's published 25 Mpts on one channel and 5 Mpts with four. In practice, expect the 1014D to hold shorter captures at fast timebases.",
    },
    {
      question: "Is 8-bit resolution on the 1014D a problem for learning?",
      answer:
        "Not for learning waveform basics: square waves, PWM, clocks and audio signals look fine at 256 levels. It shows up when you zoom into small details such as millivolt ripple on a supply rail, where the DHO804's 12-bit converter draws a smoother, more readable trace.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "PicoScope 2204A vs Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function RigolDho804VsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
