import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2D15: generator 10 mV-7 Vpp into high-Z (5 mV-3.5 Vpp into 50 ohm), sine 0.1 Hz-25 MHz, square/pulse
// and arbitrary to 10 MHz, triangle to 1 MHz, burst and modulation; 2 mV/div-10 V/div; timebase 2 ns/div-100 s/div;
// 32 auto measurements with statistics; 2 DVMs and a 6-digit hardware frequency counter; pass/fail; SCPI; USB
// host/device; max input 300 Vrms with 10X probe, CAT II 300 V; mains 100-240 VAC, <30 W; weight 1900 g per
// http://www.hantek.com/products/detail/17182 (checked 2026-10-24). Weight conflict: Amazon A+ content says
// net weight 2900 g / 6.4 lb and item weight 5.5 lb (https://www.amazon.com/dp/B08MDSG839, checked 2026-10-24).
// FNIRSI 1014D: 8-bit ADC; generator 2.5 Vpp, sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz, 1 Hz
// resolution; external trigger input 0-40 V; 12 auto parameters; rise time <3 ns; max test voltage 1X 40 V / 10X
// 400 V; 5 V 2A/3A/4A supply per https://www.fnirsi.com/products/1014d (checked 2026-10-24). Item weight 3.46 lb
// per https://www.amazon.com/dp/B097T5NRTZ (checked 2026-10-24).

const path = "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d";

export const metadata = buildMetadata({
  title: "Hantek DSO2D15 vs FNIRSI 1014D Compared",
  description:
    "Hantek DSO2D15 vs FNIRSI 1014D: 150 MHz with 8 Mpts, serial decoding and a 25 MHz generator against a 100 MHz scope with a 10 MHz generator.",
  path: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d",
  image: "https://m.media-amazon.com/images/I/81hiRS9DwNL._SL1500_.jpg",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2D15 vs FNIRSI 1014D",
  path,
  published: "2026-10-24",
  intro:
    "Hantek DSO2D15 vs FNIRSI 1014D puts two benchtops that each carry a built-in generator side by side. Both have two channels, a 1 GSa/s peak rate, an 8-bit converter and a 7-inch 800 × 480 screen. The Hantek goes further on almost every published figure: 150 MHz against 100 MHz, 8 Mpts of memory, UART to LIN decoding, and a generator reaching 25 MHz at up to 7 Vpp.",
  a: {
    pick: picks.find((p) => p.name === "Hantek DSO2D15")!,
    imageAlt: "Hantek DSO2D15 150 MHz two-channel benchtop oscilloscope with arbitrary waveform generator",
    chooseIf: [
      "You debug UART, I2C, SPI, CAN or LIN traffic and want the bytes decoded on screen",
      "You want long captures: 8 Mpts on one channel or 4 Mpts each on two",
      "Your generator has to swing a full 5 V logic level or reach past 10 MHz",
      "You want every spec published, including the two-channel sample rate",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "FNIRSI 1014D")!,
    imageAlt: "FNIRSI 1014D 100 MHz benchtop oscilloscope with built-in DDS signal generator",
    chooseIf: [
      "Your work is analog: filters, audio and sensor stages well below 20 MHz",
      "You want a kit with two 1X/10X probes and a 100X probe already in the box",
      "You prefer a scope that runs from a 5 V adapter rather than a mains cord",
      "You want an external trigger input, listed by FNIRSI at 0 to 40 V",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "8-bit (12-bit high-resolution mode)", b: "8-bit" },
    { label: "Memory", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Display", a: "7-inch 800 × 480", b: "7-inch 800 × 480" },
    { label: "Built-in generator", a: "1 ch, sine to 25 MHz, square and arbitrary to 10 MHz, up to 7 Vpp", b: "1 ch DDS, sine to 10 MHz, other waves to 2 MHz, 2.5 Vpp" },
    { label: "Serial trigger and decode", a: "UART, I2C, SPI, CAN, LIN", b: "None listed by FNIRSI" },
    { label: "Automatic measurements", a: "32, with statistics", b: "12" },
    { label: "Rise time (maker)", a: "2.4 ns typical", b: "Under 3 ns" },
    { label: "Power", a: "Mains, 100–240 VAC, under 30 W", b: "5 V adapter" },
  ],
  differences: [
    "Bandwidth: 150 MHz on the DSO2D15 against 100 MHz on the 1014D. Hantek quotes a 2.4 ns typical rise time; FNIRSI says under 3 ns.",
    "Sample rate: both peak at 1 GSa/s. Hantek states 500 MSa/s per channel with two on; FNIRSI doesn't say what the 1014D does with both channels running.",
    "Memory: Hantek publishes 8 Mpts on one channel and 4 Mpts on two. FNIRSI writes only \"240Kbit\", with no point count.",
    "Generator: the DSO2D15's reaches 25 MHz sine and 10 MHz square or arbitrary at up to 7 Vpp into high impedance, with burst and modulation. The 1014D's gives sine to 10 MHz, other waves to 2 MHz, at 2.5 Vpp.",
    "Decoding: Hantek lists UART, I2C, SPI, CAN and LIN triggering and decoding. FNIRSI lists none for the 1014D.",
    "Measurement tools: 32 automatic measurements with statistics, two DVMs and a 6-digit hardware counter on the Hantek; 12 automatic parameters on the FNIRSI.",
    "Power and weight: the DSO2D15 runs on mains; Hantek says 1900 g, but Amazon lists 5.5 lb, a conflict we can't resolve. The 1014D runs from a 5 V adapter and Amazon lists 3.46 lb.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The two share a screen size, a converter width and a peak sample rate, so the charts below concentrate on
          the published numbers that differ. Hantek&apos;s figures come from its DSO2000 series table and
          FNIRSI&apos;s from the 1014D specification table.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (−3 dB). The DSO2D15 is rated 50% higher.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "FNIRSI 1014D", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Sample rate. Hantek publishes its two-channel rate; FNIRSI gives only the 1014D&apos;s maximum.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DSO2D15, 1 ch on", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "DSO2D15, 2 ch on", value: 500, display: "500 MSa/s each" },
                { label: "1014D, maximum", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Generator frequency ceiling, log scale: sine and square on each scope.</>}>
            <BarChart
              log
              items={[
                { label: "DSO2D15 sine", value: 25, display: "25 MHz", highlight: true },
                { label: "DSO2D15 square", value: 10, display: "10 MHz", highlight: true },
                { label: "1014D sine", value: 10, display: "10 MHz" },
                { label: "1014D square", value: 2, display: "2 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum generator amplitude. Hantek&apos;s figure is into high impedance (3.5 Vpp into 50 Ω).</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 7, display: "7 Vpp", highlight: true },
                { label: "FNIRSI 1014D", value: 2.5, display: "2.5 Vpp" },
              ]}
            />
          </Figure>
          <Figure caption={<>Automatic measurements listed by each maker.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 32, display: "32 + statistics", highlight: true },
                { label: "FNIRSI 1014D", value: 12, display: "12" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          With both channels on, the DSO2D15 still takes about three samples per cycle at its full 150 MHz rating
          and fifty per cycle of a 10 MHz clock, above the Nyquist minimum of two. We can&apos;t do the same sum for
          the 1014D because FNIRSI doesn&apos;t publish the shared rate. See{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          for why the per-channel number is the one that counts.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Memory: how long each scope can look</h2>
        <p className="text-muted leading-7 mb-4">
          Memory decides how much time fits in one capture at a fast sample rate, and it is where this pair differs
          most. At 1 GSa/s the DSO2D15&apos;s 8 Mpts holds 8 ms of signal; with both channels at 500 MSa/s, 4 Mpts
          each still covers 8 ms. That is enough to catch a complete CAN frame, a whole I2C transaction at 100 kHz,
          or several cycles of a 1 kHz PWM signal with every edge sampled at full speed.
        </p>
        <p className="text-muted leading-7 mb-4">
          FNIRSI writes the 1014D&apos;s memory as &quot;240Kbit&quot;. Read it generously as 240,000 points and the
          scope holds 0.24 ms at 1 GSa/s, about a thirtieth of the Hantek&apos;s window. If it really means bits at
          8 bits per sample, the window is shorter still. Either way, on a long timebase the 1014D must lower its
          sample rate to fit, which is when narrow glitches disappear between samples.
        </p>
        <KeyIdea title="Capture time = memory ÷ sample rate">
          8,000,000 points ÷ 1,000,000,000 samples per second = 8 ms. Halve the sample rate and the window doubles;
          halve the memory and it shrinks by half. Comparing scopes on this one division tells you more than either
          number alone.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Rated bandwidth is where a sine has already lost 3 dB, so apply a three-to-five-times margin: the
          DSO2D15 suits signals up to roughly 30 to 50 MHz and the 1014D up to roughly 20 to 33 MHz. Both clear
          Arduino and ESP32 PWM, audio, hobby SPI and most buck-converter switching. The Hantek&apos;s margin pays
          off on fast logic edges and higher-speed SPI clocks, where you want to judge edge shape rather than just
          count transitions. Our explainer on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          covers the rule.
        </p>
        <p className="text-muted leading-7 mb-4">
          Decoding is the bigger practical gap for anyone working on cars, robots or sensor boards. With CAN or LIN
          decoding, the DSO2D15 can trigger on a message and print its contents under the trace, so a body-module
          fault becomes a list of frames instead of a screen of square waves. On the 1014D you would capture the
          same bus and work out the bits by hand, within its shorter memory window.
        </p>
        <p className="text-muted leading-7 mb-4">
          The generators split along similar lines. A 7 Vpp swing lets the Hantek stand in for a 5 V logic clock or
          a sensor output when testing a microcontroller input, and burst mode can send a fixed number of pulses.
          The 1014D&apos;s 2.5 Vpp source, with 1 Hz frequency steps, is better matched to driving op-amp and
          filter inputs, where small signals are the point.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration, not a capture: a bus burst (CH1) triggered at its start, with a slower control line on
                CH2. Hantek&apos;s decoder labels the bytes; on the 1014D you read the bits yourself.
              </>
            }
          >
            <ScopeScreen
              wave="pulse"
              cycles={6}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "square", cycles: 1, amplitude: 1.2, offset: -1.8, label: "CH2 control line" }}
              labels={{ left: "CH1 bus data", right: "illustrative" }}
              triggerLevel={1.8}
            />
          </Figure>
          <DataTable
            head={["Limit", "DSO2D15", "1014D"]}
            rows={[
              ["Comfortable signal range", "~30–50 MHz", "~20–33 MHz"],
              ["Capture at full rate", "8 ms (8 Mpts)", "≤0.24 ms if 240k points"],
              ["Bus decoding", "UART, I2C, SPI, CAN, LIN", "None listed"],
              ["Generator for 5 V logic", "Yes, up to 7 Vpp", "No, 2.5 Vpp"],
              ["Automatic measurements", "32 with statistics", "12"],
            ]}
          />
        </div>
        <Callout title="Mains-powered means earth-referenced">
          The DSO2D15 plugs into the mains, and like most bench scopes its probe ground normally connects to mains
          earth. Hantek rates its input at 300 Vrms with a 10X probe and CAT II 300 V; FNIRSI lists 400 V for the
          1014D on 10X but gives no CAT rating. Neither figure allows clipping a ground lead onto a live conductor.
          Use a differential probe or an isolated setup for line-side measurements.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Car electronics and CAN or LIN networks", "Hantek DSO2D15", "Bus trigger and decode with 8 ms full-rate captures"],
            ["Microcontroller boards with I2C or SPI sensors", "Hantek DSO2D15", "Decoded bytes on screen, 32 automatic measurements"],
            ["Simulating 5 V sensor or clock signals", "Hantek DSO2D15", "Generator swings up to 7 Vpp, 10 MHz square"],
            ["Audio and filter experiments", "FNIRSI 1014D", "2.5 Vpp sine with 1 Hz steps suits small analog inputs"],
            ["High-voltage probing out of the box", "FNIRSI 1014D", "Kit adds a 100X probe to two 1X/10X probes"],
            ["Syncing to an external pulse", "FNIRSI 1014D", "FNIRSI lists a 0–40 V external trigger input"],
            ["Fast logic edges", "Hantek DSO2D15", "150 MHz and 2.4 ns rise time"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The DSO2D15 shares Hantek&apos;s DSO2000 series table with the 100 MHz DSO2D10, covered in our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10 review
          </Link>
          . For the wider field, see the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          . The 1014D also meets FNIRSI&apos;s battery tablet in{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" className={link}>
            FNIRSI 1013D Plus vs 1014D
          </Link>{" "}
          and Hantek&apos;s generator-free model in{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek DSO2D15 is the stronger instrument on published specs: 150 MHz, a stated 500 MSa/s per channel with both on, 8 Mpts of memory, five serial decoders and a 25 MHz, 7 Vpp generator. Choose it for digital, automotive and microcontroller work. The FNIRSI 1014D makes sense for analog and audio experiments below about 20 MHz, where its 2.5 Vpp source, 5 V adapter power and 100X probe kit cover what you need.",
  faqs: [
    {
      question: "Is 150 MHz on the Hantek DSO2D15 worth it over the FNIRSI 1014D's 100 MHz?",
      answer:
        "Only if you look at fast edges or signals above about 20 MHz. By the three-to-five-times rule the DSO2D15 handles signals to roughly 30 to 50 MHz and the 1014D to roughly 20 to 33 MHz. For PWM, audio and slow serial buses both are enough; the memory and decoding gaps matter more.",
    },
    {
      question: "Can the FNIRSI 1014D decode CAN or I2C like the Hantek DSO2D15?",
      answer:
        "FNIRSI lists no serial decoding for the 1014D. Hantek lists UART, I2C, SPI, CAN and LIN triggering and decoding on the DSO2D15, so it can trigger on bus traffic and show the decoded bytes. On the 1014D you would read the bits from the waveform yourself.",
    },
    {
      question: "Which has the better built-in signal generator?",
      answer:
        "The DSO2D15 on every published figure: sine to 25 MHz, square and arbitrary to 10 MHz, up to 7 Vpp into high impedance, plus burst and modulation. The 1014D gives sine to 10 MHz, other waveforms to 2 MHz and a custom wave to 1 MHz at 2.5 Vpp, with 1 Hz frequency resolution.",
    },
    {
      question: "Why does the DSO2D15's sample rate drop with two channels on?",
      answer:
        "Hantek's 1 GSa/s converter is shared, so each channel gets 500 MSa/s when both run, and memory splits from 8 Mpts to 4 Mpts each. That is common on two-channel budget scopes. FNIRSI doesn't publish the 1014D's two-channel rate, so you can't assume it keeps 1 GSa/s per channel.",
    },
    {
      question: "How much does the Hantek DSO2D15 weigh compared with the 1014D?",
      answer:
        "The sources disagree for the Hantek. Hantek's own spec table says 1900 g, while Hantek's plain DSO2D15 Amazon listing gives an item weight of 5.5 lb and a net weight of 2900 g in its product description. The 1014D's Amazon listing says 3.46 lb. Either way, both are desk instruments; the DSO2D15 needs a mains socket and the 1014D a 5 V adapter.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "MINIWARE DS213 vs FNIRSI DSO152", href: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Siglent SDS1104X-E vs SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  ],
};

export default function HantekDso2d15VsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
