import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2C10: rise time 3.5 ns typical; 7-inch 800 x 480 TFT; triggers edge, pulse, video, slope, overtime, window, pattern,
// interval, under-amplitude, UART, LIN, CAN, SPI, I2C; decode RS232/UART, I2C, SPI, CAN, LIN; 32 auto measurements with statistics;
// 2 DVMs; 6-digit hardware frequency counter; SCPI; USB host/device; 1 MOhm || 13 pF; mains 100-240 VAC, under 30 W;
// 318 x 110 x 150 mm; 1900 g; generator row "-" for DSO2C10; per http://www.hantek.com/products/detail/17182 (checked 2026-10-24).
// FNIRSI 1014D: 8-bit; Auto/Normal/Single trigger on rising/falling edge; external trigger 0-40 V; 12 auto parameters; FFT, X-Y, roll,
// cursors, USB export; 1 GB internal storage for 1000 screenshots + 1000 waveforms; rise time under 3 ns; 1 MOhm input; 5 V adapter;
// 310 x 145 x 70 mm; generator 14 standard signals + 1 custom, sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz, 2.5 Vpp,
// 1 Hz resolution; per https://www.fnirsi.com/products/1014d (checked 2026-10-24). Item weight 3.46 lb and kit with two 1X/10X probes
// plus a P4100 100X probe per https://www.amazon.com/dp/B097T5NRTZ (checked 2026-10-24).

const path = "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d";

const hantek = picks.find((p) => p.name === "Hantek DSO2C10")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI 1014D")!;

export const metadata = buildMetadata({
  title: "DSO2C10 vs FNIRSI 1014D for Beginners",
  description:
    "Hantek DSO2C10 vs FNIRSI 1014D for beginners: two 100 MHz two-channel scopes, one with serial decoding and 8 Mpts, the other with a built-in signal generator.",
  path: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d",
  image: hantek.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2C10 vs FNIRSI 1014D for Beginners",
  path,
  published: "2026-10-24",
  intro:
    "Hantek DSO2C10 vs FNIRSI 1014D for beginners looks like a tie at first glance: both are two-channel, 100 MHz, 1 GSa/s benchtops with an 8-bit converter and a 7-inch 800 × 480 screen. Underneath they are built for different first projects. The Hantek adds serial decoding, 8 Mpts of documented memory and a long list of trigger types, but no signal output. The FNIRSI adds a DDS generator, with memory FNIRSI describes only loosely.",
  a: {
    pick: hantek,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz benchtop oscilloscope, front panel",
    chooseIf: [
      "Your first projects are microcontroller boards talking UART, I2C or SPI to sensors and displays",
      "You want every key spec published, including memory and the two-channel sample rate",
      "You expect to need pulse-width, runt-style or pattern triggers to catch faults",
      "You already have an Arduino, a Raspberry Pi Pico or a generator to make test signals",
    ],
  },
  b: {
    pick: fnirsi,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in signal generator",
    chooseIf: [
      "You own no other test equipment and want a signal source in the same box",
      "You are more interested in analog circuits, filters and audio than digital buses",
      "You want a kit that already includes a 100X probe for higher-voltage signals",
      "You want a scope that runs from a 5 V adapter rather than a mains cord",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, 2 channels on", a: "500 MSa/s", b: "Not stated by FNIRSI" },
    { label: "Memory", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Vertical resolution", a: "8-bit; high-res mode up to 12-bit", b: "8-bit" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Serial trigger and decode", a: "UART/RS232, I2C, SPI, CAN, LIN", b: "Not listed by FNIRSI" },
    { label: "Trigger types", a: "Edge, pulse, video, slope, overtime, window, pattern, interval, under-amplitude, serial", b: "Rising or falling edge" },
    { label: "Automatic measurements", a: "32, with statistics", b: "12" },
    { label: "Built-in signal generator", a: "None", b: "1-ch DDS: sine to 10 MHz, other waveforms to 2 MHz, 2.5 Vpp" },
    { label: "Power", a: "Mains, under 30 W", b: "5 V adapter" },
    { label: "Weight", a: "1.9 kg", b: "3.46 lb (about 1.6 kg, Amazon listing)" },
  ],
  differences: [
    "Generator: the 1014D has a one-channel DDS source (sine to 10 MHz, other waveforms to 2 MHz, 2.5 Vpp). Hantek's table shows none for the DSO2C10, even though its front panel carries WAVE GEN and GEN OUT labels.",
    "Decoding: Hantek lists UART/RS232, I2C, SPI, CAN and LIN triggering and decoding on the DSO2C10. FNIRSI lists no serial decoding for the 1014D.",
    "Memory: 8 Mpts on one channel and 4 Mpts on two for the Hantek, against a figure FNIRSI writes only as \"240Kbit\".",
    "Two-channel sampling: Hantek states 500 MSa/s with both channels on; FNIRSI gives only the 1 GSa/s maximum.",
    "Triggering and measurements: the DSO2C10 lists nine trigger types plus serial triggers and 32 automatic measurements; the 1014D lists edge triggering and 12 automatic parameters, plus FFT, X-Y and roll modes.",
    "Same 100 MHz bandwidth, same 1 GSa/s peak, same 8-bit converter and the same 7-inch 800 × 480 screen size; the Hantek adds a high-resolution mode up to 12-bit.",
    "Both rate 4.3 in our roundup; neither has our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth gives no separation here, so the charts skip it and focus on the figures that do differ. Where
          FNIRSI publishes no number, the chart says so rather than guessing one. Hantek&apos;s figures come from its
          DSO2000 series table; FNIRSI&apos;s from its 1014D specification table.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Sample rate by channels in use. Both peak at 1 GSa/s; only Hantek publishes the two-channel figure.</>}>
            <BarChart
              items={[
                { label: "DSO2C10, 1 ch", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "DSO2C10, 2 ch", value: 500, display: "500 MSa/s" },
                { label: "1014D, maximum", value: 1000, display: "1 GSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Automatic measurements listed by each maker: 32 on the Hantek, 12 on the FNIRSI.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2C10", value: 32, display: "32", highlight: true },
                { label: "FNIRSI 1014D", value: 12, display: "12" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest built-in generator frequency, log scale. The DSO2C10 has no generator.</>}>
            <BarChart
              log
              items={[
                { label: "1014D, sine", value: 10_000_000, display: "10 MHz", highlight: true },
                { label: "1014D, other waveforms", value: 2_000_000, display: "2 MHz" },
                { label: "1014D, custom waveform", value: 1_000_000, display: "1 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Capture window at full sample rate, from Hantek&apos;s memory and rate figures. FNIRSI&apos;s memory figure doesn&apos;t allow the same calculation.</>}>
            <DataTable
              head={["Channels on", "DSO2C10", "1014D"]}
              rows={[
                ["1", "8 Mpts ÷ 1 GSa/s = 8 ms", "Not calculable"],
                ["2", "4 Mpts ÷ 500 MSa/s = 8 ms", "Not calculable"],
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The last table is the practical meaning of the memory figure. Whether you use one channel or two, the
          DSO2C10 can hold about 8 ms of signal before it has to sample more slowly; at a slower timebase it keeps
          more samples per division than a short-memory scope would. That window comfortably holds a complete I2C
          transaction at 100 kHz or several UART bytes at 115,200 baud. For how the rate relates to what appears on
          screen, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO2C10 vs FNIRSI 1014D for beginners</h2>
        <p className="text-muted leading-7 mb-4">
          Most people buy a first scope because something in a project isn&apos;t working. What that project is
          decides which of these two helps more, so start by being honest about what is on your bench.
        </p>
        <h3 className="text-lg font-semibold mb-2">If your projects are digital: the DSO2C10</h3>
        <p className="text-muted leading-7 mb-4">
          A beginner&apos;s typical microcontroller fault is a sensor or display that won&apos;t answer. On a scope
          without decoding you see a burst of square edges and must count bits by hand against the protocol. With
          the DSO2C10 you set up I2C, SPI or UART decoding and read the address and data bytes printed over the
          trace, so you can see straight away whether the device acknowledged or the address was wrong. The serial
          triggers mean you can wait for one specific frame instead of scrolling through traffic. CAN and LIN are
          on the list too, which matters if a car or robot project follows.
        </p>
        <h3 className="text-lg font-semibold mb-2">If your projects are analog: the 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          Amplifiers, tone controls, RC filters and op-amp stages don&apos;t produce a signal of their own; you have
          to drive them. The 1014D&apos;s generator does that from the same box: FNIRSI lists 14 standard signals in
          its spec table (its description elsewhere says 12) plus one custom or captured waveform, with 1 Hz
          resolution. Feed the circuit, put the input on channel 1 and the output on channel 2, and you can watch
          gain, clipping and phase as you turn the frequency. With the DSO2C10 the same experiment needs a separate
          generator or a microcontroller pin, which covers square waves well and sine waves poorly.
        </p>
        <h3 className="text-lg font-semibold mb-2">Trusting what you see</h3>
        <p className="text-muted leading-7 mb-4">
          Beginners lean on automatic measurements while they learn to read a graticule. The DSO2C10 lists 32 with
          statistics, two DVM readouts and a six-digit hardware frequency counter; the 1014D lists 12 parameters plus
          cursors. Documentation matters too. Hantek publishes the two-channel sample rate and the memory depth per
          channel; FNIRSI publishes neither in a directly usable form, so a 1014D owner learning about record length
          and sample-rate trade-offs has less to go on.
        </p>
        <KeyIdea title="Edge triggering is enough at first, not forever">
          Every beginner starts with a rising or falling edge trigger, and that is all FNIRSI lists for the 1014D.
          It covers stable display of clocks, PWM and repeating waveforms. The DSO2C10&apos;s pulse, window,
          under-amplitude and pattern triggers become useful later, when you hunt a glitch that happens once in
          thousands of cycles. Our guides to{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            triggering an oscilloscope
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" className={link}>
            catching a runt pulse
          </Link>{" "}
          show the difference.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          With identical 100 MHz ratings, the measurement ceiling is the same for both: by the usual three-to-five-
          times rule, signals up to roughly 20–33 MHz display accurately. That spans every common beginner signal,
          from 50/60 Hz waveforms through audio, PWM, 400 kHz I2C and multi-megahertz SPI clocks. Rise-time estimates
          are close too: Hantek quotes 3.5 ns typical for the DSO2C10 and FNIRSI under 3 ns for the 1014D. Read our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          for why the rated figure isn&apos;t the usable one.
        </p>
        <p className="text-muted leading-7 mb-4">
          Where they part is in what happens around the measurement. With both channels running, the DSO2C10 still
          takes five samples per cycle of a 100 MHz sine at its stated 500 MSa/s; for the 1014D FNIRSI doesn&apos;t
          say. The DSO2C10 can capture a long, slow event at a fast rate thanks to its memory; the 1014D can create
          the stimulus for an experiment. Neither offers more than two analog inputs, so a four-wire SPI bus has to
          be viewed two lines at a time on either.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start mb-4">
          <Figure
            caption={
              <>
                Illustration, not a capture: an I2C-style clock (CH1) and data line (CH2). The DSO2C10 can print the
                decoded bytes over traces like these; on the 1014D you would read the bits by eye.
              </>
            }
          >
            <ScopeScreen
              wave="square"
              cycles={8}
              amplitude={1.2}
              offset={1.8}
              second={{ wave: "pulse", cycles: 3, amplitude: 1.2, offset: -1.8, label: "CH2 data" }}
              labels={{ left: "CH1 clock", right: "illustrative" }}
            />
          </Figure>
          <DataTable
            head={["Beginner task", "DSO2C10", "1014D"]}
            rows={[
              ["Read I2C, SPI or UART bytes", "Yes, decoded", "Bits by eye"],
              ["Drive a filter or amplifier", "Needs external source", "Built-in, sine to 10 MHz"],
              ["Catch a one-off glitch", "Pulse, window, pattern triggers", "Edge trigger"],
              ["Long capture at full rate", "8 ms (1 or 2 ch)", "Not calculable"],
              ["Read frequency precisely", "6-digit hardware counter", "Automatic parameters, cursors"],
            ]}
          />
        </div>
        <Callout title="Mains-powered bench, earthed ground">
          The DSO2C10 runs from mains, and the probe ground on a mains-powered bench scope is normally bonded to
          mains earth; the 1014D&apos;s ground connects through its adapter and USB lead. On either, never clip a
          ground lead onto a mains-referenced point such as the primary side of an off-line supply. The 1014D
          kit&apos;s 100X probe raises the displayable voltage but doesn&apos;t change that rule.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Arduino, ESP32 or Pico projects with sensors and displays", "Hantek DSO2C10", "UART, I2C and SPI decoding and serial triggers"],
            ["First scope, no other test gear at all", "FNIRSI 1014D", "Built-in generator supplies practice and test signals"],
            ["Audio amplifiers, guitar pedals and filters", "FNIRSI 1014D", "Sine to 10 MHz to drive the circuit under test"],
            ["Car or robot projects with CAN or LIN", "Hantek DSO2C10", "CAN and LIN trigger and decode listed"],
            ["Intermittent faults that need a specific trigger", "Hantek DSO2C10", "Nine trigger types plus serial triggers"],
            ["Learning from fully published specs", "Hantek DSO2C10", "Memory and two-channel rate both stated"],
            ["Higher-voltage signals with the probe included", "FNIRSI 1014D", "Amazon kit adds a P4100 100X probe"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want the generator and the decoding together? The{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>{" "}
          page covers the generator-equipped version of this Hantek, and our{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            DSO2D10 review
          </Link>{" "}
          goes deeper. For other 1014D match-ups, see{" "}
          <Link href="/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" className={link}>
            FNIRSI 2C53T vs 1014D
          </Link>{" "}
          (handheld against bench) and{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" className={link}>
            Rigol DHO804 vs FNIRSI 1014D
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains each spec from scratch.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For a beginner whose projects are mostly microcontroller boards, the Hantek DSO2C10 is the better first scope: the same 100 MHz and 1 GSa/s as the FNIRSI, plus serial decoding, 8 Mpts of documented memory, far more trigger types and 32 automatic measurements. The FNIRSI 1014D is the better buy for a beginner with no other test gear who leans toward analog circuits, because its built-in generator lets you drive what you measure.",
  chooseNeitherIf:
    "You need to view a full four-wire SPI bus at once: neither offers more than two analog inputs, so chip select, clock, MOSI and MISO have to be viewed two lines at a time on either one — a four-channel scope is what that job actually needs.",
  faqs: [
    {
      question: "Are the Hantek DSO2C10 and FNIRSI 1014D the same speed?",
      answer:
        "On headline figures, yes: both are rated 100 MHz with a 1 GSa/s maximum sample rate and an 8-bit converter. The difference is documentation. Hantek states 500 MSa/s per channel with both channels on, while FNIRSI gives only the 1 GSa/s maximum, so the 1014D's two-channel rate is unknown.",
    },
    {
      question: "Does the Hantek DSO2C10 have a signal generator?",
      answer:
        "No. Hantek's DSO2000 series table shows no generator for the DSO2C10; the one-channel generator is on the DSO2D10. The DSO2C10's front panel still carries WAVE GEN and GEN OUT labels shared with that model, so go by the specification, not the panel. The FNIRSI 1014D does have a built-in DDS generator.",
    },
    {
      question: "Can the FNIRSI 1014D decode I2C, SPI or UART?",
      answer:
        "FNIRSI doesn't list serial decoding or serial triggering for the 1014D; its specification lists edge triggering, FFT, X-Y and roll modes. You can still view I2C, SPI or UART signals and read the bits by hand. The DSO2C10 lists trigger and decode for UART/RS232, I2C, SPI, CAN and LIN.",
    },
    {
      question: "Which is easier for a complete beginner to learn on?",
      answer:
        "If you have nothing to measure yet, the 1014D, because its generator produces known waveforms to practice triggering and timebase settings. If you are learning while fixing an Arduino or ESP32 project, the DSO2C10 is easier day to day: decoded bytes, 32 automatic measurements and a frequency counter save a lot of manual reading.",
    },
    {
      question: "How much memory does each scope have?",
      answer:
        "Hantek lists 8 Mpts on one channel and 4 Mpts with both channels on, enough for about 8 ms at full sample rate either way. FNIRSI writes the 1014D's memory as 240Kbit without a per-channel point count, so it can't be compared directly; expect shorter captures at fast timebases.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek DSO2D10 review", href: "/oscilloscopes/hantek-dso2d10-review" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
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
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  ],
};

export default function HantekDso2c10VsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
