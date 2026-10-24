import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804";

export const metadata = buildMetadata({
  title: "Hantek DSO5102P vs Rigol DHO804: Value",
  description:
    "Hantek DSO5102P vs Rigol DHO804: 100 MHz and 2 channels against 70 MHz, 4 channels and 12 bits. Charts, use cases and which scope offers better value.",
  path: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO5102P vs Rigol DHO804",
  path,
  published: "2026-10-24",
  intro:
    "Hantek DSO5102P vs Rigol DHO804 is a question of value: what you get for your money, not just which number is bigger. The Hantek is a plain two-channel, 100 MHz, 8-bit mains benchtop. The Rigol is a four-channel, 70 MHz, 12-bit scope with a touchscreen, standard serial decoding and memory measured in millions of points. The Hantek wins on one headline spec; the Rigol wins on almost everything else.",
  a: {
    pick: picks.find((p) => p.name === "Hantek DSO5102P")!,
    imageAlt: "Hantek DSO5102P two-channel 100MHz digital storage oscilloscope, front panel",
    chooseIf: [
      "Bandwidth is the spec you care about most and 100 MHz matters more to you than 70 MHz",
      "Two channels cover your work and you mostly look at repetitive signals",
      "You want built-in math, FFT, 32 automatic measurements and pass/fail testing on a conventional mains benchtop",
      "You can buy it for clearly less than the DHO804 at the time you shop",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Rigol DHO804")!,
    imageAlt: "Rigol DHO804 12-bit four-channel oscilloscope, front panel",
    chooseIf: [
      "You debug microcontroller projects and want UART, I2C, SPI or CAN decoding included",
      "You need three or four signals on screen at once",
      "You want deep memory to capture long or one-off events at a high sample rate",
      "You look at small signals, ripple or noise where 12-bit resolution shows more detail",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit", b: "12-bit" },
    { label: "Record length", a: "24K (datasheet) or 40K (product page); Hantek's sources disagree", b: "25 Mpts (1 ch); 5 Mpts (4 ch)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 1024 × 600 capacitive touchscreen" },
    { label: "Serial decoding", a: "None listed", b: "Standard: UART, I2C, SPI, CAN, parallel" },
    { label: "Power", a: "Mains", b: "USB-C" },
    { label: "Generator / logic channels", a: "None listed", b: "None" },
  ],
  differences: [
    "Bandwidth: 100 MHz on the Hantek against 70 MHz on the Rigol. This is the one headline spec where the DSO5102P leads.",
    "Channels: the DHO804 has 4; the DSO5102P has 2.",
    "Memory: the DHO804 records up to 25 Mpts with one channel on (5 Mpts with four). Hantek lists 24K in its datasheet and 40K on its product page, roughly 600 to 1,000 times less than the Rigol's single-channel figure.",
    "Resolution: 12-bit (4,096 levels) on the Rigol against 8-bit (256 levels) on the Hantek.",
    "Serial decoding of UART, I2C, SPI, CAN and parallel buses is standard on the DHO804; Hantek lists no serial decoding for the DSO5102P.",
    "The Hantek lists math, FFT, 32 automatic measurements and pass/fail testing; our verified DHO804 data doesn't cover those functions, so we don't compare them here.",
    "The Rigol has a 1024 × 600 capacitive touchscreen, HDMI output and USB-C power; the Hantek has an 800 × 480 display and runs from mains.",
    "Neither is hands-on tested by OhmSavvy; both assessments are desk research from the makers' published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On a spec sheet&apos;s front line these two look close: about the same peak sample rate, and bandwidth
          that favours the Hantek. The gaps open up further down, in channel count, memory and vertical
          resolution. Every number below comes from each maker&apos;s published specs; the memory chart uses a log
          scale because the difference runs to three orders of magnitude.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point): the Hantek&apos;s is about 43% higher.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 100, display: "100 MHz", highlight: true },
                { label: "Rigol DHO804", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate. Hantek quotes 1 GSa/s real-time without a per-channel breakdown in our data; Rigol quotes 1.25 GSa/s with one channel and 312.5 MSa/s per channel with four.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 1000, display: "1 GSa/s" },
                { label: "Rigol DHO804 (1 ch)", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "Rigol DHO804 (4 ch)", value: 312.5, display: "312.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Record length, log scale. Hantek&apos;s two sources give 24K and 40K points; the Rigol records 25 Mpts on one channel and 5 Mpts with all four on.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO5102P (datasheet)", value: 24_000, display: "24K pts" },
                { label: "Hantek DSO5102P (product page)", value: 40_000, display: "40K pts" },
                { label: "Rigol DHO804 (4 ch)", value: 5_000_000, display: "5 Mpts" },
                { label: "Rigol DHO804 (1 ch)", value: 25_000_000, display: "25 Mpts", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels, and vertical levels per the ADC resolution (8-bit = 256, 12-bit = 4,096).</>}>
            <BarChart
              items={[
                { label: "Hantek DSO5102P", value: 2, display: "2 channels" },
                { label: "Rigol DHO804", value: 4, display: "4 channels", highlight: true },
              ]}
            />
            <div className="mt-4">
              <BarChart
                log
                items={[
                  { label: "Hantek DSO5102P (8-bit)", value: 256, display: "256 levels" },
                  { label: "Rigol DHO804 (12-bit)", value: 4096, display: "4,096 levels", highlight: true },
                ]}
              />
            </div>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both scopes sample comfortably fast for their bandwidth. At its 100 MHz limit the Hantek takes 10
          samples per cycle at 1 GSa/s. The Rigol takes about 18 per cycle at 70 MHz with one channel on, and
          about 4.5 with all four running, still above the Nyquist minimum of two, though fewer points make fast
          edges look coarser. For what these figures mean, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which Offers Better Value?</h2>
        <p className="text-muted leading-7 mb-4">
          We don&apos;t quote prices here because Amazon prices move; use the links above to see today&apos;s.
          Value is what each scope lets you do for what it costs, so the useful question is what the DHO804&apos;s
          extras are worth to you, and whether the Hantek&apos;s extra bandwidth is.
        </p>
        <p className="text-muted leading-7 mb-4">
          The case for the Hantek rests on one number: 100 MHz against 70 MHz. By the 3–5× rule, that moves the
          comfortable signal ceiling from roughly 14–23 MHz on the Rigol to roughly 20–33 MHz on the Hantek. That
          matters if you work on fast clocks or sharp digital edges, and it doesn&apos;t if your signals are
          microcontroller buses at hobby speeds, audio or most switching supplies, which sit well inside both
          scopes&apos; range. The Hantek also lists math, FFT, 32 automatic measurements and pass/fail testing, a
          useful basic toolkit.
        </p>
        <p className="text-muted leading-7 mb-4">
          The case for the Rigol is breadth. Twice the channels lets you watch clock, data, chip select and an
          output together. Standard serial decoding turns an I2C or UART trace into readable bytes, which on the
          Hantek you&apos;d have to work out by eye from the waveform. Sixteen times as many vertical levels shows
          ripple and noise riding on a larger signal without the trace breaking into steps. And a record length
          hundreds of times longer is what lets a scope keep its sample rate high on slow timebases.
        </p>
        <p className="text-muted leading-7 mb-4">
          On paper, then, the DHO804 delivers more capability per unit of spend unless the Hantek is offered at a
          clear discount to it. Our roundup describes the DHO804 as bringing 12-bit resolution to a beginner
          budget, and it carries the higher OhmSavvy rating (4.7 against 4.2). The DSO5102P is better value only
          for a narrow buyer: someone who needs the extra bandwidth on two channels, doesn&apos;t need decoding or
          deep memory, and finds it noticeably cheaper on the day.
        </p>
        <DataTable
          head={["If you are…", "Pick", "Why"]}
          rows={[
            ["Debugging Arduino or other microcontroller projects", "Rigol DHO804", "UART, I2C, SPI and CAN decoding standard; 4 channels"],
            ["Watching clock, data and chip select together", "Rigol DHO804", "4 channels against 2"],
            ["Catching a one-off glitch or a slow power-up", "Rigol DHO804", "25 Mpts against 24K–40K points of memory"],
            ["Looking at supply ripple or small sensor signals", "Rigol DHO804", "12-bit: 4,096 vertical levels against 256"],
            ["Measuring fast edges or clocks in the 20–30 MHz range", "Hantek DSO5102P", "100 MHz bandwidth against 70 MHz"],
            ["Doing basic two-channel bench checks at the lowest cost", "Hantek DSO5102P", "Only if it is clearly cheaper when you buy"],
            ["Wanting a scope that can run from a portable power source", "Rigol DHO804", "USB-C powered; the Hantek runs from mains"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s bandwidth is the frequency at which a sine wave is shown about 3 dB low, roughly 70% of
          its true amplitude. The usual rule of thumb is 3–5 times the signal frequency for an accurate shape, and
          more for square waves, whose edges contain harmonics well above the fundamental. Bandwidth, though, is
          only one limit. How long a scope can record at full speed, and how many channels it has, decide what
          you can actually capture.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO5102P: fast, repetitive, two-channel</h3>
        <p className="text-muted leading-7 mb-4">
          With 100 MHz the DSO5102P is comfortable on signals up to roughly 20–33 MHz, and a common approximation
          (rise time ≈ 0.35 ÷ bandwidth) puts its own rise time near 3.5 ns. It suits repetitive signals you can
          trigger on cleanly: clocks, PWM, oscillator outputs, input-versus-output on an amplifier. Its weak point
          is memory. At 1 GSa/s, 24K points fill in about 24 µs (40 µs at 40K), so on longer timebases it has to
          drop its sample rate, and a single long capture such as a power-up sequence or a burst of serial data
          will be recorded coarsely. With two channels and no listed decoding, bus debugging means reading bits by
          eye.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DHO804: general electronics with depth</h3>
        <p className="text-muted leading-7 mb-4">
          At 70 MHz the DHO804 is comfortable up to roughly 14–23 MHz, with a rise time near 5 ns by the same
          approximation. That covers UART, I2C and SPI at typical hobby speeds, PWM motor drives and most switching
          supplies. In principle, 25 Mpts at 1.25 GSa/s holds about 20 ms of signal at full rate, and 5 Mpts at
          312.5 MSa/s holds about 16 ms with four channels on: hundreds of times longer than the Hantek&apos;s
          window. Real scopes manage this trade automatically, but the gap is large either way. Where it runs short
          is the fastest edges and clocks above its comfortable range, and it has no generator or logic channels.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A fast square wave on a scope with ample bandwidth: sharp edges, true shape. Illustration, not a capture.</>}>
            <ScopeScreen wave="square" cycles={3} amplitude={2.5} labels={{ left: "Plenty of bandwidth" }} />
          </Figure>
          <Figure caption={<>The same signal near a scope&apos;s bandwidth limit: rounded edges, so rise time and overshoot can&apos;t be trusted. Illustration, not a capture.</>}>
            <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} labels={{ left: "Too little bandwidth" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Bandwidth versus memory">
            The Hantek&apos;s extra 30 MHz shows up only on fast edges near the top of the Rigol&apos;s range. The
            Rigol&apos;s memory advantage shows up every time you widen the timebase to see a whole event, which for
            most hobby and student work happens far more often. Our{" "}
            <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
              oscilloscope buying guide
            </Link>{" "}
            explains how to weigh the two.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains and high voltage">
            On a mains-powered benchtop like the DSO5102P, the probe ground clip is normally tied to mains earth
            through the power cord, so clipping it to a live or non-earthed point creates a short through the scope.
            The DHO804 runs from USB-C, but don&apos;t assume its ground floats: that depends on the power source.
            Use a differential probe or proper isolation for any mains work.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other comparisons</h2>
        <p className="text-muted leading-7">
          Neither scope has a full OhmSavvy review yet; both are covered in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . If the DHO804 appeals, see how it compares with the{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" className={link}>
            Hantek DSO2D10
          </Link>
          , or its two-channel sibling in{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" className={link}>
            Rigol DHO802 vs Hantek DSO2D10
          </Link>
          . Other bench matchups:{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" className={link}>
            Rigol DS1054Z vs OWON SDS1102
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" className={link}>
            Rigol DS1054Z vs OWON VDS1022I
          </Link>
          . For handheld and pocket options, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" className={link}>
            FNIRSI DSO152 vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" className={link}>
            FNIRSI DSO152 vs Siglent SDS1104X-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" className={link}>
            FNIRSI DSO-TC3 vs FNIRSI DSO152
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" className={link}>
            FNIRSI 1014D vs FNIRSI DSO-TC3
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For most hobbyists and students, the Rigol DHO804 offers better value: four channels, 12-bit resolution, standard serial decoding, a touchscreen and memory hundreds of times deeper, for the cost of 30 MHz of bandwidth. The Hantek DSO5102P makes sense when 100 MHz on two channels is what you need, basic math, FFT and automatic measurements are enough, and it is clearly cheaper than the Rigol when you buy.",
  faqs: [
    {
      question: "Is the Hantek DSO5102P or the Rigol DHO804 better value?",
      answer:
        "For most buyers, the Rigol DHO804. It adds two more channels, 12-bit resolution, standard UART, I2C, SPI and CAN decoding, and up to 25 Mpts of memory against the Hantek's 24K to 40K points. The Hantek's advantage is 100 MHz of bandwidth against 70 MHz, which matters only for fast edges and clocks above roughly 14 to 23 MHz.",
    },
    {
      question: "Does 100 MHz on the Hantek beat 70 MHz on the Rigol?",
      answer:
        "Only on fast signals. By the 3 to 5 times rule the Hantek is comfortable to roughly 20 to 33 MHz and the Rigol to roughly 14 to 23 MHz. Microcontroller buses at hobby speeds, audio and most switching supplies sit well inside both ranges, so the extra bandwidth rarely decides everyday hobby work.",
    },
    {
      question: "How much memory does the Hantek DSO5102P have?",
      answer:
        "Hantek's own sources disagree: its datasheet lists a 24K record length, while its product page and launch notice say 40K. Either figure is far below the Rigol DHO804's 25 Mpts with one channel on, or 5 Mpts with all four, which limits how long the Hantek can record at full sample rate.",
    },
    {
      question: "Can the Hantek DSO5102P decode I2C or UART?",
      answer:
        "Hantek lists no serial decoding for the DSO5102P, so you would read bus traffic bit by bit from the waveform. The Rigol DHO804 includes UART, I2C, SPI, CAN and parallel decoding as standard, which is one of the main reasons it offers more for microcontroller work.",
    },
    {
      question: "Do either of these scopes have a signal generator?",
      answer:
        "No. Rigol lists no built-in generator or logic channels for the DHO800 series, and Hantek lists neither for the DSO5102P. If you need a generator, budget for a separate one or look at a scope that includes it; our beginner roundup notes which picks do.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
  ],
};

export default function HantekDso5102pVsRigolDho804Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
