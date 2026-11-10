import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1014D: 100 MHz x 2, 1 GSa/s real time (per-channel rate with both on not stated), 8-bit, 7-inch 800 x 480,
// memory written as "240Kbit", rise time <3 ns, 1 MOhm input, AC/DC coupling, timebase 50 s/div-10 ns/div, max test
// voltage 40 V (1X) / 400 V (10X), Auto/Normal/Single trigger on rising/falling edge, external trigger input 0-40 V,
// 12 auto parameters, FFT, X-Y, roll mode, cursors, 1 GB storage for 1000 screenshots + 1000 waveforms, USB export,
// DDS generator 2.5 Vpp, 14 standard signals + 1 custom, sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz,
// 310 x 145 x 70 mm, 5 V 2A/3A/4A supply per https://www.fnirsi.com/products/1014d (spec tables as recorded
// 2026-10-24 on /oscilloscopes/fnirsi-1014d-vs-owon-sds1102). Item weight 3.46 lb and kit of two 1X/10X probes plus a
// P4100 100X probe per https://www.amazon.com/dp/B097T5NRTZ (In Stock at ZIP 10001, checked 2026-11-08).
// Rigol DS1202Z-E per the DS1000Z-E datasheet linked from https://www.rigolna.com/products/digital-oscilloscopes/1000z/
// (PDF at beyondmeasure.rigoltech.com ... "DS1000Z-E Datasheet-EN.pdf", checked 2026-11-08): 200 MHz, 2 channels,
// 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 24 Mpts (1 ch) / 12 Mpts (2 ch) standard, 30,000 wfms/s, 60,000-frame recording,
// 8-bit, calculated rise time 1.75 ns, 500 uV/div-10 V/div, 1 MOhm || 15 pF, CAT I 300 Vrms / CAT II 100 Vrms, timebase
// 2 ns/div-50 s/div; triggers edge, pulse, runt, window, Nth edge, slope, video, pattern, delay, timeout, duration,
// setup/hold, RS232/UART, I2C, SPI; decode parallel, RS232/UART, I2C, SPI on 2 buses; hardware 6-digit counter; math incl.
// FFT and filters; 7.0-inch 800 x 480; USB host/device, LAN, Aux out; 100-240 V, 50 W max, fan cooled;
// 313.1 x 160.8 x 122.4 mm; 2.9 kg; two PVP2350 350 MHz probes standard; three-year warranty excluding probes.
// Conflict: the rigolna.com series page lists serial triggering/decoding as options, while the E datasheet lists them in
// the spec table with no option code. Amazon https://www.amazon.com/dp/B0H1J12LDJ (reseller GuliTech, manufacturer RIGOL,
// "Only 9 left in stock" at ZIP 10001, checked 2026-11-08) says 200 MHz, 1 GSa/s, up to 24 Mpts, 30,000 wfms/s and RS232,
// I2C and SPI triggers as standard, but its attribute table says "Battery Powered", which contradicts Rigol's mains spec,
// and its in-the-box line names only "GL-DS1202Z-E".
// Capture-window figures below are memory divided by sample rate (our arithmetic). The 1014D window assumes "240Kbit"
// means 240K points, which FNIRSI doesn't confirm.

const path = "/oscilloscopes/fnirsi-1014d-vs-rigol-ds1202z-e";
const fnirsi = picks.find((p) => p.name === "FNIRSI 1014D")!;
const rigol = picks.find((p) => p.name === "Rigol DS1202Z-E")!;

export const metadata = buildMetadata({
  title: "FNIRSI 1014D vs Rigol DS1202Z-E: Bench Value",
  description:
    "FNIRSI 1014D vs Rigol DS1202Z-E: a 100 MHz scope with a built-in generator against a 200 MHz Rigol with 24 Mpts and decoding. Charts, memory math, verdict.",
  path: "/oscilloscopes/fnirsi-1014d-vs-rigol-ds1202z-e",
  image: rigol.image,
});

const link = "text-accent hover:underline";

/** How long each scope can record at full speed: memory depth divided by sample rate. */
function CaptureWindowDiagram() {
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI 1014D vs Rigol DS1202Z-E capture window diagram: at 1 GSa/s the Rigol's 24 Mpts record 24 ms, enough for a whole 9600-baud UART byte of about 1.04 ms many times over, while 240K points on the FNIRSI would record 0.24 ms, a quarter of one byte, unless the scope slows its sample rate."
    >
      <text x="200" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        Time recorded at 1 GSa/s (illustrative, linear scale)
      </text>
      <text x="12" y="44" fontSize="9" className="fill-muted">One 9600-baud UART byte (10 bits)</text>
      <rect x="12" y="50" width="16" height="14" rx="2" className="fill-accent/30 stroke-accent" strokeWidth="1" />
      <text x="34" y="61" fontSize="9" className="fill-foreground">about 1.04 ms</text>
      <text x="12" y="92" fontSize="9" className="fill-muted">FNIRSI 1014D, if 240K points</text>
      <rect x="12" y="98" width="4" height="18" className="fill-foreground" />
      <text x="22" y="111" fontSize="9" className="fill-foreground">0.24 ms: a quarter of the byte</text>
      <text x="12" y="142" fontSize="9" className="fill-muted">Rigol DS1202Z-E, 24 Mpts on one channel</text>
      <rect x="12" y="148" width="376" height="18" rx="2" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <text x="200" y="161" fontSize="9" textAnchor="middle" className="fill-foreground">24 ms: about 23 whole bytes</text>
      <path d="M12 180 H388" className="stroke-border" strokeWidth="1" />
      {[0, 6, 12, 18, 24].map((ms) => (
        <g key={ms}>
          <path d={`M${12 + (ms / 24) * 376} 177 V183`} className="stroke-muted" strokeWidth="1" />
          <text x={12 + (ms / 24) * 376} y="196" fontSize="8" textAnchor="middle" className="fill-muted">
            {ms} ms
          </text>
        </g>
      ))}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1014D vs Rigol DS1202Z-E",
  path,
  published: "2026-11-08",
  intro:
    "FNIRSI 1014D vs Rigol DS1202Z-E is a choice between two kinds of value. The 1014D is a two-channel 100 MHz scope with a signal generator built in, a 5 V power brick and a 100X probe in the kit. The DS1202Z-E has no generator but doubles the bandwidth to 200 MHz, records up to 24 Mpts, triggers on and decodes UART, I2C and SPI, and carries Rigol's three-year warranty. The short answer: buy the FNIRSI for analog and audio work where a test signal matters; buy the Rigol for digital debugging and long captures.",
  a: {
    pick: fnirsi,
    imageAlt: "FNIRSI 1014D two-channel oscilloscope with built-in signal generator",
    chooseIf: [
      "You need a test signal source and don't own a function generator yet",
      "Most of your work is audio, power supplies, sensors and filters under a few MHz",
      "You want a 100X probe in the box for higher-voltage measurements",
      "A light scope on a 5 V adapter suits your bench better than a fan-cooled mains unit",
    ],
  },
  b: {
    pick: rigol,
    imageAlt: "Rigol DS1202Z-E 200 MHz two-channel bench oscilloscope",
    chooseIf: [
      "You debug microcontrollers and want UART, I2C and SPI triggers and decoding",
      "You need long single-shot captures at full sample rate (24 Mpts on one channel)",
      "Your signals have fast edges that a 100 MHz scope rounds off",
      "A three-year maker warranty and a full published datasheet matter to you",
    ],
  },
  extraSpecs: [
    { label: "Memory depth", a: "\"240Kbit\" (FNIRSI's wording; per-channel points not stated)", b: "24 Mpts (1 ch), 12 Mpts (2 ch)" },
    { label: "Rise time", a: "Under 3 ns", b: "1.75 ns (calculated)" },
    { label: "Two-channel sample rate", a: "Not stated", b: "500 MSa/s per channel" },
    { label: "Signal generator", a: "DDS, 2.5 Vpp; sine to 10 MHz, other waves to 2 MHz", b: "None" },
    { label: "Triggers", a: "Rising/falling edge; Auto, Normal, Single; external input", b: "Edge, pulse, runt, window, Nth edge, slope, video, pattern, delay, timeout, duration, setup/hold, UART, I2C, SPI" },
    { label: "Serial decoding", a: "Not listed", b: "Parallel, RS232/UART, I2C, SPI (2 buses)" },
    { label: "Vertical range", a: "Not stated in our sources", b: "500 µV/div to 10 V/div" },
    { label: "Input rating", a: "40 V (1X), 400 V (10X); no CAT rating listed", b: "CAT I 300 Vrms, CAT II 100 Vrms" },
    { label: "Power", a: "5 V adapter (2A/3A/4A)", b: "100–240 V mains, 50 W max, fan cooled" },
    { label: "Size and weight", a: "310 × 145 × 70 mm, 3.46 lb (Amazon)", b: "313.1 × 160.8 × 122.4 mm, 2.9 kg" },
    { label: "Probes in the kit", a: "Two 1X/10X plus a P4100 100X (Amazon kit)", b: "Two PVP2350 350 MHz (Rigol standard accessories)" },
    { label: "Warranty", a: "Not stated in our sources", b: "Three years, excluding probes and accessories" },
  ],
  differences: [
    "Bandwidth: 200 MHz on the DS1202Z-E against 100 MHz on the 1014D. Rigol's 1.75 ns calculated rise time is the clearer figure; FNIRSI says under 3 ns.",
    "Memory: Rigol lists 24 Mpts on one channel and 12 Mpts on two. FNIRSI writes \"240Kbit\" without saying how many points each channel gets. Even read generously as 240K points, that is one hundredth of the Rigol's figure.",
    "Generator: the 1014D has a DDS output (sine to 10 MHz, other shapes to 2 MHz, 2.5 Vpp). The DS1202Z-E has none.",
    "Digital debugging: the DS1202Z-E triggers on and decodes RS232/UART, I2C and SPI and also has runt, window, setup/hold and pattern triggers. The 1014D lists edge triggering only.",
    "Sample rate: both reach 1 GSa/s on one channel. Rigol states 500 MSa/s per channel with both on; FNIRSI doesn't state the split.",
    "Power and build: the 1014D runs from a 5 V adapter; the DS1202Z-E takes 100–240 V mains, draws up to 50 W and has a fan.",
    "Paperwork: Rigol publishes a full datasheet with a three-year warranty. The DS1202Z-E Amazon listing is run by a reseller and its attribute table wrongly says battery powered.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The bandwidth chart shows the Rigol at twice the FNIRSI. The memory chart is the one that changes how the scopes
          feel in use, and it needs a log scale because the gap is a factor of one hundred.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth from each maker.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 200, display: "200 MHz", highlight: true },
                { label: "FNIRSI 1014D", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory depth on one channel, log scale. The FNIRSI bar reads &quot;240Kbit&quot; as 240K points, the most generous reading.</>}>
            <BarChart
              log
              items={[
                { label: "Rigol DS1202Z-E", value: 24_000_000, display: "24 Mpts", highlight: true },
                { label: "FNIRSI 1014D", value: 240_000, display: "240K (best case)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rise time: lower is faster. FNIRSI gives an upper limit, Rigol a calculated value.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 3, display: "under 3 ns" },
                { label: "Rigol DS1202Z-E", value: 1.75, display: "1.75 ns", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight. The FNIRSI figure is Amazon&apos;s item weight (3.46 lb, about 1.57 kg).</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 2.9, display: "2.9 kg" },
                { label: "FNIRSI 1014D", value: 1.57, display: "about 1.57 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both screens are 7 inches at 800 × 480 and both scopes are 8-bit, so the displays themselves are a draw. Rigol adds
          intensity-graded color and 30,000 waveforms per second, which means rare glitches show up as faint traces instead
          of vanishing between updates. FNIRSI doesn&apos;t publish an update rate for the 1014D. For background on how
          bandwidth and sampling interact, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            sample rate explained
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 1014D vs Rigol DS1202Z-E: where the money goes</h2>
        <p className="text-muted leading-7 mb-4">
          The FNIRSI puts its budget into a second instrument. The Rigol puts it into a better scope. That is the whole
          decision, and the rest of this page is about which of those matters for your bench.
        </p>
        <h3 className="text-lg font-semibold mb-2">Memory decides what one capture can hold</h3>
        <p className="text-muted leading-7 mb-4">
          A scope can only record as much time as its memory allows at a given sample rate. Divide memory by sample rate
          and you get the window. At 1 GSa/s the DS1202Z-E&apos;s 24 Mpts hold 24 ms. With both channels on, Rigol halves
          both numbers (12 Mpts at 500 MSa/s), so the window stays 24 ms. If the 1014D&apos;s &quot;240Kbit&quot; means
          240K points, it holds 0.24 ms at 1 GSa/s. To show a longer window it has to drop the sample rate: a 10 ms window
          on 240K points means no more than 24 MSa/s.
        </p>
        <Figure
          caption={
            <>
              Illustrative arithmetic, not measurements: memory divided by sample rate. One 9600-baud UART byte (start bit,
              8 data bits, stop bit) lasts about 1.04 ms.
            </>
          }
        >
          <CaptureWindowDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Why that matters in practice: catch a UART burst, a power-up sequence or a motor start in one shot, then zoom in
          on the edge that went wrong. On the Rigol the zoomed edge still has 1 ns between samples. On a short-memory scope
          the zoom reveals the coarse sampling it had to use to fit the window. For repetitive signals such as a 1 kHz
          square wave or 50 kHz PWM, short memory hardly matters because every sweep redraws the same shape.
        </p>
        <h3 className="text-lg font-semibold mb-2">The generator saves you a second box</h3>
        <p className="text-muted leading-7 mb-4">
          The 1014D&apos;s DDS output gives 14 standard waveforms plus a custom one, sine to 10 MHz and the other shapes to 2
          MHz, at 2.5 Vpp. That covers driving an audio amplifier, injecting a clock into a counter chip, or checking an RC
          filter&apos;s corner frequency with nothing else on the bench. The DS1202Z-E needs a separate generator for those
          jobs. If you would buy one anyway, that cost sits on the Rigol side of the ledger. If your work is mostly reading
          signals that a circuit already makes, such as microcontroller pins, supply rails and sensor outputs, you will
          rarely miss it.
        </p>
        <h3 className="text-lg font-semibold mb-2">Decoding turns waveforms into bytes</h3>
        <p className="text-muted leading-7">
          On the 1014D a UART line is a square-ish trace you count bits on by hand. The DS1202Z-E can trigger on a specific
          UART data value or an I2C address and print the decoded bytes under the trace, on up to two buses at once. Rigol&apos;s
          own sources disagree on whether that costs extra: the E-series datasheet lists the triggers and decoders in the
          spec table with no option code, while the rigolna.com series page lists serial decoding as an option. Check the
          seller&apos;s configuration before you rely on it. The{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" className={link}>
            DS1202Z-E vs SDS1202X-E comparison
          </Link>{" "}
          covers its decoding against a rival that adds CAN and LIN.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Audio amplifier and filter work", "FNIRSI 1014D", "The built-in sine source drives the circuit while CH1 and CH2 show in and out"],
            ["Arduino or ESP32 serial debugging", "Rigol DS1202Z-E", "UART, I2C and SPI trigger and decode"],
            ["Catching one bad power-up sequence", "Rigol DS1202Z-E", "24 ms at full sample rate in one shot"],
            ["First scope, no other instruments yet", "FNIRSI 1014D", "Scope plus signal source in one box"],
            ["Fast logic edges or 50 MHz clocks", "Rigol DS1202Z-E", "200 MHz and a 1.75 ns calculated rise time"],
            ["Higher-voltage checks with the right probe", "FNIRSI 1014D", "The Amazon kit includes a P4100 100X probe"],
            ["A scope you expect to keep for years", "Rigol DS1202Z-E", "Three-year warranty and a full maker datasheet"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">FNIRSI 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          With the usual three-to-five-times rule, 100 MHz shows signals up to roughly 20–30 MHz at close to true size. That
          covers audio, switch-mode supply ripple and switching nodes in the hundreds of kHz, PWM, I2C at 400 kHz and SPI
          clocks of a few MHz as shapes. It can&apos;t decode those buses, its edge trigger can&apos;t isolate one rare
          event in a stream, and FNIRSI doesn&apos;t say how the 1 GSa/s divides when both channels run.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1202Z-E</h3>
        <p className="text-muted leading-7 mb-4">
          200 MHz stretches the comfortable range to roughly 40–65 MHz, so 25 MHz SPI clocks and fast logic edges keep
          their shape. The runt trigger catches a pulse that never reached full height, the setup/hold trigger flags a data
          line that changed too close to its clock, and 60,000-frame recording lets you scroll back through earlier
          triggers. It can&apos;t make a signal, it has two channels only, and at 2.9 kg with a fan it is a bench fixture,
          not a carry-around tool.
        </p>
        <KeyIdea title="The 1014D's memory figure is the soft spot">
          &quot;240Kbit&quot; is a unit you rarely see on a scope datasheet. Points per channel is the useful number, and
          FNIRSI doesn&apos;t give it. We charted the most generous reading. If the real per-channel depth is lower, the
          capture-window gap in the diagram grows.
        </KeyIdea>
        <div className="mt-4">
          <Callout title="Both are earth-referenced bench scopes">
            The DS1202Z-E&apos;s mains lead grounds every probe&apos;s clip to earth, and the 1014D&apos;s adapter can do the
            same through anything else connected to it. Clip a ground lead onto a live mains point and you create a short
            circuit. Rigol rates the inputs CAT I 300 Vrms and CAT II 100 Vrms; FNIRSI&apos;s 400 V (10X) is an input range,
            not a safety category. For mains-side work use a differential probe, and if you are not sure, call an
            electrician.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: two kinds of paperwork gap</h2>
        <p className="text-muted leading-7 mb-4">
          Rigol publishes a seven-page datasheet for the DS1202Z-E with every trigger type, input rating and accessory, but
          the Amazon listing we link is run by a reseller (GuliTech). Its attribute table says &quot;Battery Powered&quot;,
          which contradicts Rigol&apos;s 100–240 V mains specification, and its in-the-box line names only the scope. Rigol
          lists two PVP2350 350 MHz probes as standard; confirm with the seller that they ship. The 1014D listing comes from
          FNIRSI&apos;s own store and itemizes three probes, but the maker&apos;s spec sheet leaves memory per channel and the
          two-channel sample rate unstated.
        </p>
        <p className="text-muted leading-7">
          For more on the 1014D, see{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" className={link}>
            FNIRSI 1014D vs OWON SDS1102
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" className={link}>
            FNIRSI DPOS350P vs 1014D
          </Link>
          . For the Rigol&apos;s four-channel cousins, see{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>
          , or start from the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI 1014D if you want a scope and a signal source in one light box for analog, audio and power work under a few MHz. Buy the Rigol DS1202Z-E if you debug digital circuits: 200 MHz, 24 Mpts, UART/I2C/SPI decoding and a three-year warranty, but no generator, and check that the reseller ships Rigol's probes.",
  chooseNeitherIf:
    "You need four channels to watch a full SPI bus or a three-phase signal at once, or you need CAN and LIN decoding. Both scopes have two channels and neither lists CAN.",
  faqs: [
    {
      question: "Is the Rigol DS1202Z-E worth it over the FNIRSI 1014D?",
      answer:
        "For digital work, yes. It has twice the bandwidth, about one hundred times the stated memory and serial triggering and decoding the 1014D lacks, plus a three-year warranty. For analog bench work where you need a test signal, the 1014D's built-in generator can be worth more than the Rigol's extra speed, because the Rigol needs a separate generator.",
    },
    {
      question: "Does the Rigol DS1202Z-E have a signal generator?",
      answer:
        "No. Rigol's DS1000Z-E datasheet lists no source output; the DS1202Z-E has two analog inputs, an external trigger input and an Aux output for trigger out or pass/fail. The FNIRSI 1014D has a DDS generator with sine to 10 MHz and other waveforms to 2 MHz at 2.5 Vpp.",
    },
    {
      question: "How much memory does the FNIRSI 1014D have?",
      answer:
        "FNIRSI writes it as \"240Kbit\" and doesn't say how many points each channel gets or how memory splits with both channels on. The Rigol DS1202Z-E has 24 Mpts on one channel and 12 Mpts on two, per Rigol's datasheet. Even at 240K points, the FNIRSI has about one hundredth of the Rigol's memory.",
    },
    {
      question: "Can the FNIRSI 1014D decode I2C or UART?",
      answer:
        "FNIRSI doesn't list serial triggering or decoding for the 1014D; its trigger is a rising or falling edge with Auto, Normal and Single modes. You can see I2C or UART as waveforms and read the bits by hand. The DS1202Z-E triggers on and decodes RS232/UART, I2C and SPI, plus parallel buses.",
    },
    {
      question: "Which is easier to move around the bench?",
      answer:
        "The FNIRSI 1014D. Amazon lists it at 3.46 lb, about 1.57 kg, and it is 70 mm deep and runs from a 5 V adapter. The DS1202Z-E weighs 2.9 kg, is 122.4 mm deep, needs a mains outlet and has a cooling fan. Both have 7-inch 800 × 480 screens.",
    },
    {
      question: "Are the probes included with the DS1202Z-E?",
      answer:
        "Rigol's datasheet lists two PVP2350 350 MHz passive probes as standard accessories for the DS1202Z-E. The Amazon listing we link is sold by a reseller and its in-the-box line names only the scope, so confirm with the seller before ordering. The FNIRSI 1014D listing itemizes two 1X/10X probes plus a P4100 100X probe.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "FNIRSI 1014D vs OWON SDS1102", href: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI DPOS350P vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" },
    { label: "FNIRSI 1014D vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-1014d-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function Fnirsi1014dVsRigolDs1202zePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
