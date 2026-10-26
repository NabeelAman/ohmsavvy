import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 2C53T: 250MS/s, 50M per channel ("dual channel independent 50M"), 1Kpts storage depth, ±400V maximum measured voltage,
// timebase 10ns-20s, AUTO/Normal/Single trigger on rising/falling edge, Y-T/Rolling/X-Y display, AC/DC coupling, persistence,
// math with 8 basic operations + FFT, cursors; meter DC 1000V / AC 750.0V / AC and DC current to 9.999A / resistance to 19.999MΩ /
// capacitance to 99.99mF / temperature / diode / continuity; generator 13 waveforms, 0-50KHz, 0-3V amplitude, 0-100% duty, 1Hz step;
// 2.8-inch 320*240; 3000mAh battery, 6h standby (FNIRSI: "laboratory theoretical maximum"); Type-C 5V/1A charging; 167*89*35mm; 300g;
// standard package one 10X P6100 probe, full set two; per https://www.fnirsi.com/products/2c53t (checked 2026-10-24).
// FNIRSI 1014D: 8-bit; 1-ch DDS generator, 2.5 Vpp, 14 standard signals plus 1 custom, sine to 10 MHz, other waves to 2 MHz, custom to
// 1 MHz; 12 auto parameters; FFT, X-Y, roll; max test voltage 40 V (1X probe) / 400 V (10X probe); timebase 50 s/div-10 ns/div;
// 1 GB internal storage for 1000 screenshots + 1000 waveforms; 310x145x70 mm; 5 V adapter, no battery stated;
// per https://www.fnirsi.com/products/1014d (checked 2026-10-24). Item weight 3.46 lb and kit with two 1X/10X probes plus a P4100 100X
// probe per https://www.amazon.com/dp/B097T5NRTZ (checked 2026-10-24).

const path = "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d";

const handheld = picks.find((p) => p.name === "FNIRSI 2C53T")!;
const bench = picks.find((p) => p.name === "FNIRSI 1014D")!;

export const metadata = buildMetadata({
  title: "FNIRSI 2C53T vs 1014D: Which Should You Buy?",
  description:
    "FNIRSI 2C53T vs FNIRSI 1014D: a 300 g handheld scope, meter and generator against a 100 MHz benchtop scope with a 10 MHz generator. Which one fits your work?",
  path: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d",
  image: handheld.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 2C53T vs FNIRSI 1014D",
  path,
  published: "2026-10-24",
  intro:
    "FNIRSI 2C53T vs FNIRSI 1014D is a choice between two shapes of instrument from the same maker. The 2C53T is a 300 g battery handheld that folds a 50 MHz two-channel scope, a 19,999-count True RMS multimeter and a 50 kHz generator into one box. The 1014D is a 100 MHz, 1 GSa/s two-channel benchtop with a 7-inch screen and a DDS generator reaching 10 MHz. Where you work, and on what, decides it.",
  a: {
    pick: handheld,
    imageAlt: "FNIRSI 2C53T handheld oscilloscope, multimeter and signal generator",
    chooseIf: [
      "Your work moves around: a car, an appliance on the floor, a machine on site",
      "You want a True RMS multimeter and a scope in one tool rather than two",
      "Your signals are slow: sensor outputs, audio, low-frequency PWM, battery and supply behavior",
      "Battery power and USB-C charging matter more than screen size",
    ],
  },
  b: {
    pick: bench,
    imageAlt: "FNIRSI 1014D two-channel benchtop oscilloscope with built-in signal generator",
    chooseIf: [
      "You build and debug circuits at a desk and the scope can stay plugged in",
      "You need a test signal above 50 kHz, such as a 1 MHz sine for a filter or a clock stand-in",
      "Fast digital edges and megahertz signals are part of your projects",
      "You want a 7-inch screen and a kit with a 100X high-voltage probe included",
    ],
  },
  extraSpecs: [
    { label: "Form factor", a: "Handheld, 167 × 89 × 35 mm", b: "Benchtop, 310 × 145 × 70 mm" },
    { label: "Weight", a: "300 g", b: "3.46 lb (about 1.6 kg, Amazon listing)" },
    { label: "Power", a: "Built-in 3,000 mAh battery, USB-C 5 V/1 A charging", b: "5 V adapter; no battery stated" },
    { label: "Display", a: "2.8-inch, 320 × 240", b: "7-inch, 800 × 480" },
    { label: "Record length", a: "1 Kpts", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Vertical resolution", a: "Not stated by FNIRSI", b: "8-bit" },
    { label: "Signal generator", a: "13 waveforms, up to 50 kHz, 0–3 V", b: "1-ch DDS: sine to 10 MHz, other waveforms to 2 MHz, 2.5 Vpp" },
    { label: "Multimeter", a: "19,999 counts, True RMS; 1000 V DC, 750 V AC, 9.999 A", b: "None" },
    { label: "Scope analysis", a: "FFT, 8 math operations, X-Y, roll, cursors, persistence", b: "FFT, X-Y, roll, 12 automatic parameters" },
  ],
  differences: [
    "Form factor first: the 2C53T is a 300 g handheld on a 3,000 mAh battery; the 1014D is a benchtop that runs from a 5 V adapter and weighs 3.46 lb per its Amazon listing.",
    "Bandwidth and sampling: 100 MHz and 1 GSa/s on the 1014D against 50 MHz and 250 MSa/s on the 2C53T, so the bench model has twice the bandwidth and four times the sample rate.",
    "Only the 2C53T has a multimeter: 19,999 counts, True RMS, up to 1000 V DC, 750 V AC and 9.999 A.",
    "The 1014D's generator reaches 10 MHz on sine and 2 MHz on other waveforms; the 2C53T's 13 waveforms stop at 50 kHz.",
    "Screen: 7-inch 800 × 480 on the 1014D, five times the pixels of the 2C53T's 2.8-inch 320 × 240.",
    "Record length: FNIRSI states 1 Kpts for the 2C53T; for the 1014D it gives only \"240Kbit\", which isn't directly comparable.",
    "Neither carries our Hands-on Tested badge. The 1014D rates 4.3 in our roundup and the 2C53T 4.1.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the 1014D wins every scope figure, which is what you would expect when one product spends its
          whole case on an oscilloscope and the other splits a pocket-sized box three ways. The charts show how big
          each gap is. All figures are FNIRSI&apos;s, except the 1014D&apos;s weight, which comes from its Amazon
          listing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth (−3 dB point): the benchtop is rated twice as high.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 100, display: "100 MHz", highlight: true },
                { label: "FNIRSI 2C53T", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Maximum sample rate: 1 GSa/s against 250 MSa/s. FNIRSI states neither model&apos;s per-channel rate with both channels running.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "FNIRSI 2C53T", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest generator frequency, log scale. The 1014D&apos;s sine reaches 200 times the 2C53T&apos;s 50 kHz ceiling.</>}>
            <BarChart
              log
              items={[
                { label: "1014D, sine", value: 10_000_000, display: "10 MHz", highlight: true },
                { label: "1014D, other waveforms", value: 2_000_000, display: "2 MHz" },
                { label: "2C53T, all 13 waveforms", value: 50_000, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight: the handheld is about a fifth of the benchtop&apos;s listed 3.46 lb (roughly 1,570 g).</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 1570, display: "≈1,570 g" },
                { label: "FNIRSI 2C53T", value: 300, display: "300 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Each scope pairs its converter sensibly with its front end. The 2C53T takes five samples per cycle of a
          50 MHz sine and the 1014D ten per cycle of a 100 MHz sine, both above the Nyquist minimum of two. The
          trouble for the handheld is not its peak rate but how long it can keep that rate up, which the next
          section works through. If sample rate is new to you, read{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          first.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Handheld or benchtop: what each is for</h2>
        <p className="text-muted leading-7 mb-4">
          Think about where the circuit lives. A bench scope is the right tool when the board comes to you: it sits
          on the desk beside the soldering iron, the probes stay clipped on, and a big screen lets you study a
          waveform for minutes. A handheld is right when you go to the circuit: under a dashboard, inside a washing
          machine, at a solar inverter on a wall, or at a control cabinet where there is no free socket for an
          adapter.
        </p>
        <h3 className="text-lg font-semibold mb-2">The 2C53T: a meter that can also draw waveforms</h3>
        <p className="text-muted leading-7 mb-4">
          Most field fault-finding starts with a multimeter, and that is the 2C53T&apos;s strongest section. FNIRSI
          rates it at 19,999 counts with True RMS, voltage ranges to 1000 V DC and 750 V AC, current to 9.999 A,
          resistance to 19.999 MΩ and capacitance to 99.99 mF, plus temperature, diode and continuity. When a
          reading looks odd, you switch to scope mode on the same tool to see whether a rail is noisy, a sensor
          signal drops out or a PWM drive is present at all. The 167 × 89 × 35 mm body, 3,000 mAh cell and USB-C
          charging make it something you can leave in a tool bag. FNIRSI quotes up to 6 hours, which it labels a
          laboratory theoretical maximum.
        </p>
        <h3 className="text-lg font-semibold mb-2">The 1014D: a scope that can also feed the circuit</h3>
        <p className="text-muted leading-7 mb-4">
          The 1014D gives up the meter and the battery for a better scope and a better signal source. On a desk,
          the 7-inch 800 × 480 screen shows two traces with room for measurements, and the DDS generator lets you
          inject a sine up to 10 MHz, or square and other shapes up to 2 MHz, at up to 2.5 Vpp. That is enough to
          sweep an audio or low-RF filter, stand in for a missing clock, or practice triggering on a signal whose
          frequency you already know. FNIRSI also lists 1 GB of internal storage for 1,000 screenshots and 1,000
          waveforms, which helps when you are comparing a board before and after a repair.
        </p>
        <KeyIdea title="Why 1 Kpts limits a handheld on slow timebases">
          A scope fills its record across the screen, so its real sample rate falls as you slow the timebase. If
          1 Kpts spans a 10-division screen, then at 1 ms/div (10 ms across the screen) the 2C53T samples at about
          100 kSa/s, not 250 MSa/s, which caps what it can resolve in that view at roughly 50 kHz. Zoom out to
          watch a slow event and fast detail disappears. A longer record keeps the rate up for longer; FNIRSI
          quotes the 1014D&apos;s only as &quot;240Kbit&quot;, so its advantage here can&apos;t be put in points.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Rated bandwidth is where a sine has already lost 3 dB, about 30% of its amplitude, so keep the signals you
          care about well below it. With the usual three-to-five-times margin, the 2C53T is comfortable up to roughly
          10–17 MHz and the 1014D up to roughly 20–33 MHz. Both cover the everyday list: mains-frequency signals
          through a suitable probe, audio, PWM from a motor driver, UART, 100 kHz and 400 kHz I2C, and the switching
          node of a typical small buck converter. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          covers why the margin matters.
        </p>
        <p className="text-muted leading-7 mb-4">
          The differences show at the edges. Using the common 0.35 ÷ bandwidth estimate, the fastest rise time each
          front end can show is about 7 ns on the 2C53T and 3.5 ns on the 1014D (FNIRSI lists the 1014D&apos;s as
          under 3 ns). If you are judging overshoot on a fast logic edge or a gate drive, the benchtop gives the
          more honest picture. If you only need to know that a 10 kHz PWM signal exists and what its duty cycle is,
          either will do. On the generator side the 2C53T&apos;s 50 kHz ceiling is fine for audio tests and slow
          control signals but cannot stand in for a 1 MHz clock; the 1014D can.
        </p>
        <DataTable
          head={["Task", "FNIRSI 2C53T", "FNIRSI 1014D"]}
          rows={[
            ["Comfortable signal range (3–5x rule)", "~10–17 MHz", "~20–33 MHz"],
            ["Fastest displayable rise time (0.35 ÷ BW)", "~7 ns", "~3.5 ns"],
            ["Test signal up to", "50 kHz, 13 waveforms", "10 MHz sine; 2 MHz other waveforms"],
            ["Voltage, current, resistance, capacitance", "Yes, 19,999-count True RMS meter", "No meter"],
            ["Highest scope input FNIRSI quotes", "±400 V", "40 V (1X probe); 400 V (10X probe)"],
            ["Runs away from a socket", "Yes, 3,000 mAh battery", "No battery stated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          One kit detail: FNIRSI&apos;s own store sells the 2C53T as a standard package with one 10X probe or a full
          set with two, so check what a listing includes if you want to use both channels at once. The 1014D&apos;s
          Amazon kit includes two 1X/10X probes plus a P4100 100X high-voltage probe.
        </p>
        <Callout title="Mains and high-voltage work">
          The 2C53T&apos;s meter reaches 750 V AC and its scope input is quoted at ±400 V, but FNIRSI&apos;s spec
          page gives no CAT safety rating, so treat mains measurements with the meter&apos;s rated leads and real
          caution. On either tool the probe ground clip is tied to the instrument&apos;s own ground, and on the 1014D
          that ground also connects to whatever its adapter and USB lead are plugged into. Never clip a scope ground
          lead onto a mains-referenced node such as an off-line supply&apos;s primary; use a differential probe.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Car, appliance or HVAC fault-finding on site", "FNIRSI 2C53T", "Battery handheld with a True RMS meter built in"],
            ["Desk-based electronics hobby, first scope", "FNIRSI 1014D", "100 MHz, 7-inch screen and a generator to practice on"],
            ["Testing filters and amplifiers above audio", "FNIRSI 1014D", "Sine output to 10 MHz against 50 kHz"],
            ["One tool for voltage, current and a quick waveform look", "FNIRSI 2C53T", "Meter and scope share one 300 g case"],
            ["Fast logic edges and MHz clocks", "FNIRSI 1014D", "Twice the bandwidth, four times the sample rate"],
            ["Audio and slow sensor signals in a small bag", "FNIRSI 2C53T", "50 MHz and a 50 kHz generator cover audio comfortably"],
            ["Comparing boards before and after a repair", "FNIRSI 1014D", "1 GB storage for 1,000 screenshots and 1,000 waveforms"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the handheld appeals but you want more from the scope, the{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>{" "}
          comparison weighs a stronger handheld scope against the 2C53T&apos;s better meter. If the benchtop appeals,
          see{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>{" "}
          for a decoder-equipped rival,{" "}
          <Link href="/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" className={link}>
            Rigol DHO804 vs FNIRSI 1014D
          </Link>{" "}
          for a four-channel 12-bit alternative, and{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" className={link}>
            FNIRSI 1014D vs DSO-TC3
          </Link>{" "}
          for FNIRSI&apos;s pocket tester. The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          cover the rest of the field, and{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          explains when a meter alone is enough.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Pick by where you work. The FNIRSI 2C53T is the better buy if you fault-find away from a bench and want a True RMS multimeter first, with a 50 MHz scope and a 50 kHz generator as backup, all on a battery. The FNIRSI 1014D is the better buy for desk-based electronics: twice the bandwidth, four times the sample rate, a 7-inch screen and a generator that reaches 10 MHz, at the cost of portability and a built-in meter.",
  faqs: [
    {
      question: "Is the FNIRSI 2C53T a replacement for a benchtop scope like the 1014D?",
      answer:
        "Not for bench electronics. The 2C53T has half the bandwidth, a quarter of the sample rate, a 1 Kpts record and a 2.8-inch screen. It replaces a multimeter plus a basic scope for field work. If you build and debug circuits at a desk, the 1014D's 100 MHz, 7-inch screen and 10 MHz generator suit that work better.",
    },
    {
      question: "Does the FNIRSI 1014D have a multimeter or a battery?",
      answer:
        "No to both in FNIRSI's specifications. The 1014D is an oscilloscope with a built-in DDS signal generator and runs from a 5 V adapter; FNIRSI states no battery. The 2C53T is the one with a 19,999-count True RMS multimeter and a built-in 3,000 mAh battery charged over USB-C.",
    },
    {
      question: "Which FNIRSI has the better signal generator?",
      answer:
        "The 1014D. Its single DDS channel outputs sine up to 10 MHz and other waveforms up to 2 MHz at 2.5 Vpp. The 2C53T offers 13 waveforms with adjustable amplitude to 3 V and duty cycle, but only up to 50 kHz, which suits audio and slow control signals rather than clocks or RF filters.",
    },
    {
      question: "How long does the FNIRSI 2C53T run on battery?",
      answer:
        "FNIRSI quotes a standby time of up to 6 hours from the built-in 3,000 mAh lithium battery and labels that figure a laboratory theoretical maximum, so expect less in heavy use. It charges over USB-C at 5 V and 1 A, so a power bank can top it up in the field.",
    },
    {
      question: "Can the FNIRSI 2C53T measure higher voltages than the 1014D?",
      answer:
        "FNIRSI quotes ±400 V for the 2C53T's scope input and 40 V with the 1014D's 1X probe or 400 V with its 10X probe, and the 1014D kit adds a 100X probe. The 2C53T's meter reads up to 1000 V DC and 750 V AC. No CAT rating is given on either spec page, so take great care near mains.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Oscilloscope vs multimeter", href: "/oscilloscopes/oscilloscope-vs-multimeter" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
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

export default function Fnirsi2c53tVsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
