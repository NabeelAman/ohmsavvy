import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3";

export const metadata = buildMetadata({
  title: "FNIRSI 1014D vs DSO-TC3: Which Fits You?",
  description:
    "FNIRSI 1014D vs FNIRSI DSO-TC3: a 2-channel 100MHz benchtop scope with a generator against a 500kHz pocket 3-in-1 tester. Which fits your projects?",
  path: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1014D vs FNIRSI DSO-TC3",
  path,
  published: "2026-10-24",
  intro:
    "FNIRSI 1014D vs FNIRSI DSO-TC3 pits two FNIRSI tools that both include a signal generator against each other, but they are built for different projects. The 1014D is a two-channel, 100MHz, 1 GSa/s benchtop scope with a 7-inch screen and a DDS generator. The DSO-TC3 is a battery-powered pocket box: a 500kHz, 10 MSa/s single-channel scope, a component tester and a 6-waveform generator up to 100kHz.",
  a: {
    pick: picks.find((p) => p.name === "FNIRSI 1014D")!,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in signal generator",
    chooseIf: [
      "You debug microcontroller, logic or switching-supply circuits with signals in the megahertz",
      "You need two channels to compare input with output, or clock with data",
      "You want a generator that reaches 10MHz sine and 2MHz on other waveforms",
      "You want a 7-inch screen plus FFT, X-Y and roll modes",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI DSO-TC3")!,
    imageAlt: "FNIRSI DSO-TC3 pocket oscilloscope, component tester and signal generator",
    chooseIf: [
      "Your projects are audio-range or other slow signals, up to around 100kHz",
      "You want a component tester for transistors, MOSFETs, diodes, capacitors, resistors and inductors",
      "You want a battery-powered tool with USB-C charging to carry around",
      "One input channel is enough for what you check",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Benchtop", b: "Pocket-sized, fold-out stand" },
    { label: "Display", a: "7-inch, 800 × 480", b: "2.4-inch" },
    { label: "Signal generator", a: "1-channel DDS: sine to 10MHz, other waveforms to 2MHz, 2.5 Vpp", b: "6 waveforms, up to 100kHz" },
    { label: "Power", a: "5 V adapter", b: "Built-in rechargeable battery, USB-C charging" },
    { label: "Vertical resolution", a: "8-bit", b: "Not stated by FNIRSI" },
    { label: "Memory", a: "Quoted by FNIRSI as \"240Kbit\"", b: "Not stated by FNIRSI" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 20–33MHz", b: "Up to roughly 100–170kHz" },
  ],
  differences: [
    "Bandwidth: 100MHz on the 1014D against 500kHz on the DSO-TC3, a 200-fold gap. By the 3–5× rule the 1014D is comfortable to roughly 20–33MHz; the DSO-TC3 to roughly 100–170kHz.",
    "Sample rate: 1 GSa/s against 10 MSa/s, 100 times faster. FNIRSI doesn't state the 1014D's per-channel rate with both channels on.",
    "Channels: 2 against 1. Only the 1014D can show two signals together for timing and input-versus-output checks.",
    "Generators: the 1014D's DDS output reaches 10MHz sine and 2MHz on other waveforms at 2.5 Vpp; the DSO-TC3's 6 waveforms go up to 100kHz.",
    "Only the DSO-TC3 has a component tester; only the 1014D lists FFT, X-Y mode, roll mode and USB export, and its Amazon kit adds a 100X high-voltage probe.",
    "The DSO-TC3 runs on a built-in rechargeable battery with USB-C charging; the 1014D runs from a 5 V adapter on the bench.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The scope halves of these tools sit in different classes, so the bandwidth, sample-rate and generator
          charts use a log scale; on a linear scale the DSO-TC3&apos;s bars would be invisible. Every number comes
          from FNIRSI&apos;s published specs as recorded in our beginner roundup.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth (−3 dB point), log scale: the 1014D&apos;s is 200 times higher.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI 1014D", value: 100_000_000, display: "100MHz", highlight: true },
                { label: "FNIRSI DSO-TC3", value: 500_000, display: "500kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate, log scale: 1 GSa/s against 10 MSa/s. FNIRSI doesn&apos;t state the 1014D&apos;s rate per channel with both channels on.</>}>
            <BarChart
              log
              items={[
                { label: "FNIRSI 1014D", value: 1_000_000_000, display: "1 GSa/s", highlight: true },
                { label: "FNIRSI DSO-TC3", value: 10_000_000, display: "10 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest generator frequency, log scale. The 1014D reaches 10MHz on sine (2MHz on other waveforms); the DSO-TC3 reaches 100kHz.</>}>
            <BarChart
              log
              items={[
                { label: "1014D (sine)", value: 10_000_000, display: "10MHz", highlight: true },
                { label: "1014D (other waveforms)", value: 2_000_000, display: "2MHz" },
                { label: "DSO-TC3", value: 100_000, display: "100kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Input channels: the 1014D shows two signals at once; the DSO-TC3 shows one.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 2, display: "2 channels", highlight: true },
                { label: "FNIRSI DSO-TC3", value: 1, display: "1 channel" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both scopes pair sample rate sensibly with bandwidth on one channel: 10 samples per cycle at the
          1014D&apos;s 100MHz limit and 20 per cycle at the DSO-TC3&apos;s 500kHz, both well above the Nyquist
          minimum of two. Two specs are loosely documented. FNIRSI quotes the 1014D&apos;s memory as
          &quot;240Kbit&quot; without a per-channel point count, and states neither ADC resolution nor memory depth
          for the DSO-TC3. FNIRSI&apos;s own 1014D page also gives both 12 and 14 standard generator signals; its
          spec table and Amazon listing say 14. For background, see{" "}
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
        <h2 className="text-2xl font-semibold mb-4">Which fits your projects?</h2>
        <p className="text-muted leading-7 mb-4">
          Start from the fastest signal you expect to look at, not from the feature list. If everything you
          build runs at audio frequencies or slower, the DSO-TC3 covers it, and you gain a component tester and a
          tool that runs on its own battery. If you build anything with a microcontroller clock, a serial bus or
          a switching regulator, the 1014D is the one that can actually show those signals, and its second
          channel is what lets you see cause and effect.
        </p>
        <h3 className="text-lg font-semibold mb-2">Audio, sensors and learning: DSO-TC3</h3>
        <p className="text-muted leading-7 mb-4">
          Guitar pedals, small amplifiers, linear supplies, slow sensors and low-frequency PWM all sit inside
          the DSO-TC3&apos;s comfortable range of roughly 100–170kHz. Its generator can feed a test tone into an
          amplifier while the scope watches the output, though only one at a time on screen. The component
          tester earns its place on any bench built from salvaged or unmarked parts. Its 2.4-inch screen is small
          for detailed reading, which matters less for quick checks.
        </p>
        <h3 className="text-lg font-semibold mb-2">Microcontrollers, logic and power: 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          At 100MHz the 1014D is comfortable up to roughly 20–33MHz. That covers UART, I2C and SPI at typical
          hobby speeds, PWM motor drives and most switching-supply waveforms. Two channels let you put a clock and
          a data line, or a filter&apos;s input and output, on the same 7-inch screen. Its generator doubles as a
          test source for filters and amplifiers up to 10MHz on sine. FFT shows the frequency content of a
          signal, and roll mode suits slow-changing signals such as a battery charging.
        </p>
        <KeyIdea title="Where the 1014D falls short">
          FNIRSI&apos;s memory figure is short and loosely specified, and it doesn&apos;t say what sample rate each
          channel gets with both on. For long captures at high time resolution, or when you need guaranteed
          per-channel figures, a bench scope with documented deep memory is the safer choice; see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" className={link}>
            Rigol DS1054Z vs Hantek DSO2D10
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If your project is…", "Pick", "Why"]}
          rows={[
            ["Arduino, ESP32 or other microcontroller debugging", "FNIRSI 1014D", "100MHz and 2 channels for clocks, buses and timing"],
            ["Audio circuits and guitar pedals", "Either; DSO-TC3 if portable matters", "Both cover the audio band; the DSO-TC3 runs on battery"],
            ["Sorting and checking components", "FNIRSI DSO-TC3", "Only it has a component tester"],
            ["Testing filters or amplifiers across a wide range", "FNIRSI 1014D", "Generator to 10MHz sine and a second channel for the output"],
            ["Switching power supplies", "FNIRSI 1014D", "Switching waveforms usually exceed the DSO-TC3's comfortable range"],
            ["Field checks away from mains power", "FNIRSI DSO-TC3", "Built-in rechargeable battery with USB-C charging"],
            ["Learning scope basics on a small budget", "Either", "Both include a generator to practice on known signals"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is the frequency at which a sine wave is shown about 3 dB low, roughly 70% of its true
          amplitude. The usual rule of thumb is a scope with 3–5 times the signal&apos;s frequency, and more for
          square waves, because their edges are built from harmonics far above the fundamental. A 1MHz square wave,
          a slow SPI clock, shows the gap clearly: it is twice the DSO-TC3&apos;s bandwidth, so the DSO-TC3 will
          show something closer to a rounded wave than a square one, while for the 1014D it is a small fraction
          of its bandwidth.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A 1MHz square wave on a scope with ample bandwidth, as on the 1014D: sharp edges, true shape. Illustration, not a capture.</>}>
            <ScopeScreen wave="square" cycles={3} amplitude={2.5} labels={{ left: "100MHz scope" }} />
          </Figure>
          <Figure caption={<>The same signal beyond a scope&apos;s bandwidth, as on the DSO-TC3: edges rounded away, so shape and timing can&apos;t be trusted. Illustration, not a capture.</>}>
            <ScopeScreen wave="square-under" cycles={3} amplitude={2.5} labels={{ left: "500kHz scope" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="Rise time in numbers">
            A common approximation puts a scope&apos;s fastest displayable rise time at about 0.35 divided by its
            bandwidth: roughly 3.5 ns for the 1014D and 0.7 µs for the DSO-TC3. A 1MHz square wave spends 0.5 µs
            in each half-cycle, shorter than the DSO-TC3&apos;s own rise time. The exact figure depends on each
            front end, but the 200-fold gap doesn&apos;t.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Mains and high voltage">
            The 1014D&apos;s Amazon kit includes a 100X high-voltage probe, but a probe&apos;s ground clip still
            connects to the scope&apos;s ground, and neither scope&apos;s input or isolation rating is in our
            verified data. Don&apos;t clip a ground lead to mains or other non-earthed high-voltage points; use a
            differential probe or a proper isolation setup for that work, and keep the DSO-TC3 to low-voltage
            circuits.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Other comparisons</h2>
        <p className="text-muted leading-7">
          If you are weighing the DSO-TC3 against a cheaper scope-only pocket tool, see{" "}
          <Link href="/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" className={link}>
            FNIRSI DSO-TC3 vs FNIRSI DSO152
          </Link>
          . For other two- and four-channel bench options, see{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" className={link}>
            FNIRSI DSO152 vs Hantek DSO2D10
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" className={link}>
            Hantek DSO2D10 vs Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          or the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "If your projects involve microcontrollers, digital buses or switching supplies, the FNIRSI 1014D is the one to buy: 200 times the bandwidth, two channels, a 7-inch screen and a generator that reaches 10MHz, at an entry-level price, with loosely specified memory as the main caveat. The FNIRSI DSO-TC3 fits audio-range work, component sorting and portable checks, where its battery, component tester and pocket size matter more than speed.",
  faqs: [
    {
      question: "Is the FNIRSI 1014D or the DSO-TC3 better for Arduino projects?",
      answer:
        "The 1014D. Its 100MHz bandwidth and 1 GSa/s cover microcontroller clocks, UART, I2C and SPI at typical hobby speeds, and its two channels show clock and data together. The DSO-TC3's 500kHz and single channel limit it to slow signals such as low-frequency PWM.",
    },
    {
      question: "Which FNIRSI has the better signal generator?",
      answer:
        "The 1014D's generator reaches further: a single-channel DDS output with sine up to 10MHz and other waveforms up to 2MHz at 2.5 Vpp. The DSO-TC3 offers 6 waveforms up to 100kHz. For audio work either is enough; for testing filters and amplifiers above the audio band, the 1014D covers far more.",
    },
    {
      question: "Does the FNIRSI 1014D have a battery?",
      answer:
        "Our verified data lists the 1014D as running from a 5 V adapter, with no built-in battery stated. The DSO-TC3 is the battery-powered option, with a built-in rechargeable battery and USB-C charging, which suits checks away from a bench.",
    },
    {
      question: "Can the FNIRSI 1014D test components like the DSO-TC3?",
      answer:
        "A component tester isn't in our verified 1014D data. The DSO-TC3 has one, covering transistors, MOSFETs, diodes, capacitance, resistance and inductance. If you need both fast scope work and component checks, the 1014D plus a separate component tester is one route.",
    },
    {
      question: "What are the FNIRSI 1014D's weak points?",
      answer:
        "Memory and multichannel sampling are loosely documented. FNIRSI quotes the memory as \"240Kbit\" without a clear point count and doesn't state the per-channel sample rate with both channels on. Its own page also lists both 12 and 14 standard generator signals, while the spec table says 14.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
  ],
};

export default function Fnirsi1014dVsFnirsiDsoTc3Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
