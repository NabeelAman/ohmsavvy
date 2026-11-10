import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1014D: 100 MHz x 2, 1 GSa/s real time, Single/Normal/Auto trigger, one-button AUTO with adaptive 25/50/75%
// trigger, 7-inch 800 x 480, cursors, Lissajous (X-Y) and FFT; DDS generator 2.5 Vpp, 1 Hz steps, 14 function signals
// plus a custom signal, up to 1000 custom signals stored; item weight 3.46 lb per https://www.amazon.com/dp/B097T5NRTZ
// (checked 2026-11-07, In Stock at ZIP 10001). 8-bit; rising/falling edge trigger; external trigger input 0-40 V;
// generator sine to 10 MHz, other waves to 2 MHz, custom to 1 MHz; timebase 50 s/div-10 ns/div; 12 auto parameters;
// 1 MOhm input; max test voltage 40 V (1X) / 400 V (10X); memory written as "240Kbit"; 1 GB storage for 1000 screenshots
// + 1000 waveforms; USB export; 310 x 145 x 70 mm; 5 V 2A/3A/4A supply per https://www.fnirsi.com/products/1014d (spec
// tables as recorded 2026-10-24; the page now renders its specs as images, so the text was not re-read on 2026-11-07).
// Amazon kit adds two 1X/10X probes plus a P4100 100X probe. Vertical sensitivity range not stated in our sources.
// OWON SDS1102: 100 MHz, 2 ch, 1 GSa/s real time, 8-bit, 7-inch 800 x 480, 10K record length, edge and video triggers,
// no generator, logic channels or serial decoding, 301 x 152 x 70 mm, about 1.1 kg per OWON's SDS1000 series product
// page and technical specification (as verified for this site's Pick, 2026-10-24). Per the Amazon listing
// https://www.amazon.com/dp/B0781CXRP5 (checked 2026-11-07, In Stock at ZIP 10001): horizontal scale 5 ns/div-1000 s/div,
// DC/AC/GND coupling, 5 mV/div-5 V/div, Auto/Normal/Single trigger modes, math + - x / invert FFT, 30 auto-measurement
// options, SCPI and LabVIEW supported, 2 A T-class 250 V fuse, item weight 2.2 lb (OWON says about 1.1 kg, 2.4 lb),
// date first available December 8, 2017. The listing's main photos show an SDS1022, not an SDS1102.

const path = "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102";
const fnirsi = picks.find((p) => p.name === "FNIRSI 1014D")!;
const owon = picks.find((p) => p.name === "OWON SDS1102")!;

export const metadata = buildMetadata({
  title: "FNIRSI 1014D vs OWON SDS1102: 100 MHz Benches",
  description:
    "FNIRSI 1014D vs OWON SDS1102: same 100 MHz, 2 channels and 7-inch screen. One adds a signal generator, the other PC control and 1000 s/div. Charts and verdict.",
  path: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102",
  image: fnirsi.image,
});

const link = "text-accent hover:underline";

/** The same filter test on each bench: the 1014D drives the circuit itself; the SDS1102 needs a separate generator. */
function BenchSetupDiagram() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI 1014D vs OWON SDS1102 bench setup for testing a filter. Top: the FNIRSI 1014D's own generator output drives the filter, CH1 probes the filter input and CH2 its output, with no other instrument. Bottom: the OWON SDS1102 needs a separate function generator to drive the filter, CH1 and CH2 probe input and output, and a USB cable to a PC carries SCPI or LabVIEW commands."
    >
      <text x="4" y="14" fontSize="10" fontWeight="700" className="fill-foreground">FNIRSI 1014D: one box</text>
      <rect x="10" y="24" width="120" height="78" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="70" y="44" fontSize="9" textAnchor="middle" className="fill-foreground">scope + generator</text>
      {[
        { y: 62, t: "GEN" },
        { y: 78, t: "CH1" },
        { y: 94, t: "CH2" },
      ].map((p) => (
        <g key={p.t}>
          <text x="122" y={p.y + 3} fontSize="8" textAnchor="end" className="fill-foreground">{p.t}</text>
          <circle cx="130" cy={p.y} r="2.6" className="fill-accent" />
        </g>
      ))}
      <rect x="215" y="46" width="80" height="46" rx="5" className="fill-surface stroke-accent" strokeWidth="1.3" />
      <text x="255" y="73" fontSize="9" textAnchor="middle" className="fill-foreground">filter</text>
      <path d="M130 62 H215" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M130 78 H180 V62" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="180" cy="62" r="2.4" className="fill-foreground" />
      <path d="M130 94 H170 V108 H310 V69 H295" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <text x="320" y="62" fontSize="8.5" className="fill-muted">no extra</text>
      <text x="320" y="74" fontSize="8.5" className="fill-muted">instrument</text>

      <text x="4" y="140" fontSize="10" fontWeight="700" className="fill-foreground">OWON SDS1102: scope + separate source</text>
      <rect x="10" y="150" width="120" height="62" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="70" y="172" fontSize="9" textAnchor="middle" className="fill-foreground">scope only</text>
      {[
        { y: 188, t: "CH1" },
        { y: 204, t: "CH2" },
      ].map((p) => (
        <g key={p.t}>
          <text x="122" y={p.y + 3} fontSize="8" textAnchor="end" className="fill-foreground">{p.t}</text>
          <circle cx="130" cy={p.y} r="2.6" className="fill-accent" />
        </g>
      ))}
      <rect x="150" y="148" width="62" height="28" rx="4" className="fill-surface stroke-muted" strokeWidth="1.2" strokeDasharray="4 3" />
      <text x="181" y="160" fontSize="8" textAnchor="middle" className="fill-foreground">function</text>
      <text x="181" y="170" fontSize="8" textAnchor="middle" className="fill-foreground">generator</text>
      <rect x="235" y="160" width="80" height="46" rx="5" className="fill-surface stroke-accent" strokeWidth="1.3" />
      <text x="275" y="187" fontSize="9" textAnchor="middle" className="fill-foreground">filter</text>
      <path d="M212 168 H235" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M130 188 H224 V168" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <circle cx="224" cy="168" r="2.4" className="fill-foreground" />
      <path d="M130 204 H226 V214 H328 V183 H315" className="stroke-foreground fill-none" strokeWidth="1.2" />
      <path d="M70 212 V232 H150" className="stroke-muted fill-none" strokeWidth="1.2" strokeDasharray="3 2" />
      <rect x="150" y="224" width="62" height="18" rx="3" className="fill-surface stroke-muted" strokeWidth="1" />
      <text x="181" y="236" fontSize="8" textAnchor="middle" className="fill-foreground">PC</text>
      <text x="220" y="236" fontSize="8" className="fill-muted">USB: SCPI, LabVIEW</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1014D vs OWON SDS1102",
  path,
  published: "2026-11-07",
  intro:
    "FNIRSI 1014D vs OWON SDS1102 pits two 100 MHz, two-channel benchtops with the same 7-inch 800 × 480 screen and 1 GSa/s headline rate. They even take up nearly the same bench space, about 30 × 15 cm and 70 mm deep. The difference is what comes with the scope. The FNIRSI adds a signal generator. The OWON adds SCPI and LabVIEW control from a PC, a timebase that slows to 1000 s/div, and a stated 10K-point record.",
  a: {
    pick: fnirsi,
    imageAlt: "FNIRSI 1014D 100 MHz benchtop oscilloscope with built-in generator",
    chooseIf: [
      "You don't own a function generator and want one in the same box",
      "You'll test filters, amplifiers or sensors that need a known input signal",
      "You want a 100X high-voltage probe included (the Amazon kit has one)",
      "You'd rather run the scope from a 5 V adapter than a mains cord",
    ],
  },
  b: {
    pick: owon,
    imageAlt: "OWON SDS1102 slim two-channel 100 MHz benchtop oscilloscope",
    chooseIf: [
      "You already have a signal source, or only look at signals that are already there",
      "You want to control the scope or pull data from a PC with SCPI or LabVIEW",
      "You watch slow events: the timebase stretches to 1000 s/div",
      "You want math beyond FFT: add, subtract, multiply, divide and invert",
    ],
  },
  extraSpecs: [
    { label: "Signal generator", a: "1 ch DDS: sine to 10 MHz, others to 2 MHz, 2.5 Vpp", b: "None" },
    { label: "Record length", a: "\"240Kbit\" (FNIRSI's wording)", b: "10K points" },
    { label: "Timebase", a: "10 ns/div to 50 s/div", b: "5 ns/div to 1000 s/div (per Amazon listing)" },
    { label: "Triggers", a: "Rising/falling edge; Auto, Normal, Single; external input", b: "Edge and video; Auto, Normal, Single" },
    { label: "Math", a: "FFT, X-Y", b: "+, −, ×, ÷, invert, FFT (per Amazon listing)" },
    { label: "Auto measurements", a: "12", b: "30 (per Amazon listing)" },
    { label: "PC control", a: "USB export of screenshots and waveforms", b: "SCPI and LabVIEW (per Amazon listing)" },
    { label: "Power", a: "5 V adapter (2 A/3 A/4 A)", b: "Mains" },
    { label: "Size and weight", a: "310 × 145 × 70 mm; 3.46 lb per Amazon", b: "301 × 152 × 70 mm; about 1.1 kg per OWON" },
  ],
  differences: [
    "Generator: the 1014D has a one-channel DDS generator, sine to 10 MHz, other waves to 2 MHz, 2.5 Vpp. The SDS1102 has none.",
    "Timebase: the OWON's Amazon listing gives 5 ns/div to 1000 s/div. FNIRSI lists 10 ns/div to 50 s/div, so the OWON's slowest setting is 20 times slower.",
    "PC control: the SDS1102 supports SCPI commands and LabVIEW. The 1014D exports screenshots and waveform files over USB, with no remote control listed.",
    "Record length: OWON states 10K points. FNIRSI writes \"240Kbit\" and doesn't convert it to points.",
    "Math and measurements: the OWON lists add, subtract, multiply, divide, invert and FFT with 30 automatic measurements. The FNIRSI lists FFT, X-Y and 12 measurements.",
    "Triggers: both are basic. FNIRSI lists edge plus an external trigger input; OWON lists edge and video.",
    "Neither has our Hands-on Tested badge. This is desk research from FNIRSI's and OWON's specs and the two Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the generator saves you</h2>
        <p className="text-muted leading-7 mb-4">
          A scope only shows a signal that already exists. To test a filter, an amplifier stage or a sensor
          interface, something has to drive it. With the 1014D that&apos;s the built-in generator. With the
          SDS1102 it&apos;s a second instrument on the bench, plus a BNC lead and a power socket for it.
        </p>
        <Figure
          caption={
            <>
              The same two-channel filter test on each scope. The FNIRSI does it alone; the OWON needs a separate
              generator, and can hand control to a PC over USB.
            </>
          }
        >
          <BenchSetupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          FNIRSI&apos;s generator isn&apos;t a lab instrument: one fixed 2.5 Vpp level, sine to 10 MHz and other shapes
          to 2 MHz. That covers audio, filter corners up to a few MHz and slow PWM, which is most of what a hobby bench
          sees. If you already own a standalone generator, the OWON gives you nothing to miss on that front.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 1014D vs OWON SDS1102: where the OWON pulls ahead</h2>
        <p className="text-muted leading-7 mb-4">
          Three things favor the OWON, and none of them is on the front panel. First, the timebase. At 1000 s/div,
          each division is almost 17 minutes (1000 ÷ 60), so a slow battery discharge or a thermostat cycling over an
          afternoon fits on one screen. The 1014D&apos;s slowest 50 s/div is under a minute per division.
        </p>
        <p className="text-muted leading-7 mb-4">
          Second, PC control. SCPI is the standard command set test software uses to set up a scope and read
          measurements back. That&apos;s how you get a scope to record one value every few seconds for hours without
          anyone pressing buttons. The 1014D saves up to 1,000 screenshots and 1,000 waveforms to its 1 GB of storage and
          exports them over USB, which is fine for a report but not for automation.
        </p>
        <p className="text-muted leading-7 mb-4">
          Third, the numbers are on the record. OWON states a 10K-point record. FNIRSI gives &quot;240Kbit&quot;, a unit
          scopes don&apos;t normally use. At 8 bits a sample that would be about 30,000 samples, but FNIRSI never says
          so, or whether it&apos;s per channel.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Slowest timebase, log scale. The OWON&apos;s figure is from its Amazon listing.</>}>
            <BarChart
              log
              items={[
                { label: "OWON SDS1102", value: 1000, display: "1000 s/div", highlight: true },
                { label: "FNIRSI 1014D", value: 50, display: "50 s/div" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest timebase. 5 ns/div shows edges at twice the spread of 10 ns/div.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 10, display: "10 ns/div" },
                { label: "OWON SDS1102", value: 5, display: "5 ns/div", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Automatic measurements each lists. OWON&apos;s 30 is from its Amazon listing.</>}>
            <BarChart
              items={[
                { label: "OWON SDS1102", value: 30, display: "30", highlight: true },
                { label: "FNIRSI 1014D", value: 12, display: "12" },
              ]}
            />
          </Figure>
          <Figure caption={<>Built-in instruments: scope only, or scope plus a one-channel generator.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1014D", value: 2, display: "Scope + generator", highlight: true },
                { label: "OWON SDS1102", value: 1, display: "Scope only" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="10K points is short, and it shapes the slow end">
            Sample rate falls as you slow the timebase, because the record has to stretch across the whole screen. Spread
            10K points over a 10-division screen at 1000 s/div and you get one sample per second. That&apos;s fine for a
            battery voltage, not for a glitch. The FNIRSI&apos;s record size is too vaguely stated to do the same sum.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["First bench scope, no generator on the shelf", "FNIRSI 1014D", "Gives you a test signal source in the same box"],
            ["Audio amp, filter or op-amp experiments", "FNIRSI 1014D", "Drive the circuit and watch input and output on CH1 and CH2"],
            ["Logging a slow event over hours", "OWON SDS1102", "1000 s/div timebase and SCPI control from a PC"],
            ["School or lab bench run from test software", "OWON SDS1102", "SCPI and LabVIEW support are listed; FNIRSI lists none"],
            ["Car work or a few hundred volts on a power stage", "FNIRSI 1014D", "Amazon kit adds a P4100 100X probe"],
            ["You already own a good function generator", "OWON SDS1102", "You'd pay for a generator you won't use with the FNIRSI"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Check the listing photos and the paperwork</h2>
        <p className="text-muted leading-7 mb-4">
          The OWON listing has been up since December 2017, and most of its photos show an SDS1022, a different model in
          the same series, not an SDS1102. The title, part number and spec block all say SDS1102, so the product is right,
          but the pictures aren&apos;t a guide to the badge on the front. Its listed item weight of 2.2 lb also sits
          slightly under OWON&apos;s own figure of about 1.1 kg (2.4 lb).
        </p>
        <p className="text-muted leading-7 mb-4">
          On the FNIRSI side the gaps are in the spec sheet: no per-channel sample rate with both channels on, no
          vertical sensitivity range in the sources we checked, and the &quot;240Kbit&quot; memory. OWON&apos;s Amazon
          listing gives 5 mV/div to 5 V/div for the SDS1102. If you work with small signals like sensor outputs or
          ripple, that 5 mV/div figure is a known quantity; on the FNIRSI it isn&apos;t.
        </p>
        <Callout title="Benchtop scopes and mains">
          The OWON plugs straight into mains, so its probe grounds connect to earth through the power cord. Clip a
          ground lead to a live conductor and you create a short through the scope. FNIRSI rates the 1014D to 400 V
          with a 10X probe but gives no CAT rating, and neither listing gives one for the SDS1102. For mains or
          off-line power supply work, use a differential probe or an isolation setup, and leave building wiring to an
          electrician.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          Want the FNIRSI against a scope with a stronger generator? See{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-hantek-dso2d10" className={link}>
            FNIRSI 1014D vs Hantek DSO2D10
          </Link>
          . The OWON is set against a four-channel scope on{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" className={link}>
            Rigol DS1054Z vs OWON SDS1102
          </Link>
          , and the FNIRSI against its own handheld on{" "}
          <Link href="/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" className={link}>
            FNIRSI 2C53T vs FNIRSI 1014D
          </Link>
          . For record length and sample rate basics, read{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            oscilloscope sample rate explained
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI 1014D if you don't own a function generator: it gives you a scope and a test signal source for one bench footprint, with a 100X probe in the Amazon kit. Buy the OWON SDS1102 if you already have a source, or want SCPI and LabVIEW control, a 1000 s/div timebase and a clearly stated 10K-point record.",
  chooseNeitherIf:
    "You need to decode I2C, SPI or UART. Neither lists protocol decoding; the Hantek DSO2D10 adds it along with a 25 MHz generator.",
  faqs: [
    {
      question: "Does the OWON SDS1102 have a signal generator?",
      answer:
        "No. OWON lists no generator, logic channels or serial decoding for the SDS1102. You'd need a separate function generator to drive a circuit under test. The FNIRSI 1014D has a one-channel DDS generator built in, with sine to 10 MHz, other waves to 2 MHz and a 2.5 Vpp output.",
    },
    {
      question: "Can the FNIRSI 1014D be controlled from a PC?",
      answer:
        "FNIRSI lists USB export of screenshots and waveform files, stored on 1 GB of internal memory, but no SCPI or remote-control support. The OWON SDS1102's Amazon listing states SCPI and LabVIEW support, which is what you need to automate measurements or log data from software.",
    },
    {
      question: "Which has the longer record length?",
      answer:
        "OWON states 10K points for the SDS1102. FNIRSI quotes the 1014D's memory as \"240Kbit\" without converting it to points or saying whether it's per channel. At 8 bits per sample that would be about 30,000 samples, but that's our arithmetic, not FNIRSI's. Neither is long next to scopes with megapoints of memory.",
    },
    {
      question: "Are the two scopes the same size?",
      answer:
        "Close. FNIRSI lists 310 × 145 × 70 mm for the 1014D; OWON lists 301 × 152 × 70 mm for the SDS1102. OWON gives about 1.1 kg, and the 1014D's Amazon listing gives 3.46 lb, about 1.57 kg. Both take roughly the same patch of bench.",
    },
    {
      question: "Why do the OWON SDS1102 photos show a different model?",
      answer:
        "Most photos on the Amazon listing show an SDS1022, a sibling in the same case. The listing title, part number and specifications all name the SDS1102 with 100 MHz and two channels. The product is correct; the photos just weren't updated, so don't judge the model from them.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI 1014D vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-1014d-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function Fnirsi1014dVsOwonSds1102Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
