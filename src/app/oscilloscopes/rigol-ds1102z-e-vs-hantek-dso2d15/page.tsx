import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E: 100 MHz, 3.5 ns calculated rise time, 2 channels, 1 GSa/s / 500 MSa/s, 24 Mpts (1 ch) / 12 Mpts
// (2 ch), 500 uV/div to 10 V/div, 30,000 wfms/s, recording up to 60,000 frames. Serial triggers: RS232/UART (2400 bps
// to 921600 bps, 1 Mbps and user-defined), I2C, SPI (trigger condition Timeout or CS, timeout 100 ns to 1 s, 4 to 32
// bits). Decoding: Parallel, RS232/UART, I2C, SPI, 2 buses. USB Host/Device, LAN (LXI), Aux out. External trigger
// input. 2.9 kg. Three-year warranty. Per Rigol's DS1000Z-E datasheet (PCX01100-2020-04),
// https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-f55c8579-4293-4d7f-aec4-ef7ea08ad8dc/1/-/-/-/-/DS1000Z-E%20Datasheet-EN.pdf
// linked from https://www.rigolna.com/products/digital-oscilloscopes/1000z/ (checked 2026-11-08). Conflict: Rigol's
// series page says 12M standard memory, per this site's DS1102Z-E Pick.
// Hantek DSO2D15: 150 MHz, 2.4 ns, 1 GSa/s / 500 MSa/s, 8 Mpts / 4 Mpts, 2 mV/div to 10 V/div. Serial triggers and
// decode: RS232/UART, I2C, SPI, CAN, LIN. UART trigger baud presets 110 to 460400 bit/s, user-defined 300 to 334000
// bit/s; LIN same; CAN presets up to 1 Mbit/s, user-defined 5 kbit/s to 1 Mbit/s; SPI 4 to 32 bits; sources CH1-CH2.
// Generator 25 MHz sine, 10 MHz square/arbitrary. USB Host/Device only. 1900 g. Waveform update rate not stated.
// Per http://www.hantek.com/products/detail/17182 (checked 2026-11-08). Hantek's warranty isn't stated in our sources.
// Both ASINs buyable on Amazon.com at ZIP 10001 (checked 2026-11-08).

const path = "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15";
const ds1102 = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const d15 = picks.find((p) => p.name === "Hantek DSO2D15")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs Hantek DSO2D15: Bus Work",
  description:
    "Rigol DS1102Z-E vs Hantek DSO2D15: which serial buses each one triggers on and decodes, the UART speed limits, and where 150 MHz and a generator help.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso2d15",
  image: ds1102.image,
});

const link = "text-accent hover:underline";

/** Which buses each scope can trigger on and decode, plus the UART trigger speed ceiling. */
function BusCoverageDiagram() {
  const rows = [
    { bus: "UART / RS232", r: "yes", h: "yes" },
    { bus: "I2C", r: "yes", h: "yes" },
    { bus: "SPI", r: "yes", h: "yes" },
    { bus: "CAN", r: "no", h: "yes" },
    { bus: "LIN", r: "no", h: "yes" },
    { bus: "Parallel", r: "decode", h: "no" },
  ];
  const mark = (v: string, x: number, y: number) =>
    v === "yes" ? (
      <path d={`M${x - 6} ${y} l4 5 l9 -10`} className="stroke-accent fill-none" strokeWidth="2" />
    ) : v === "decode" ? (
      <text x={x} y={y + 4} fontSize="8.5" textAnchor="middle" className="fill-foreground">decode only</text>
    ) : (
      <path d={`M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10`} className="stroke-muted" strokeWidth="1.6" />
    );
  return (
    <svg
      viewBox="0 0 400 250"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1102Z-E vs Hantek DSO2D15 bus coverage chart: both trigger on and decode UART, I2C and SPI. Only the Hantek handles CAN and LIN. Only the Rigol decodes a parallel bus. Below the table, UART trigger speed: the Hantek's user-defined baud rate tops out at 334 kbit/s, while the Rigol lists presets up to 1 Mbit/s."
    >
      <text x="150" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">DS1102Z-E</text>
      <text x="270" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">DSO2D15</text>
      {rows.map((row, i) => {
        const y = 40 + i * 22;
        return (
          <g key={row.bus}>
            <path d={`M10 ${y + 11} H330`} className="stroke-border" strokeWidth="0.6" />
            <text x="12" y={y + 4} fontSize="9.5" className="fill-foreground">{row.bus}</text>
            {mark(row.r, 150, y)}
            {mark(row.h, 270, y)}
          </g>
        );
      })}
      <text x="12" y="186" fontSize="9.5" fontWeight="700" className="fill-foreground">UART trigger ceiling</text>
      <rect x="12" y="194" width="300" height="12" rx="2" className="fill-accent" />
      <text x="316" y="204" fontSize="8.5" className="fill-foreground">Rigol: 1 Mbps preset</text>
      <rect x="12" y="214" width="100" height="12" rx="2" className="fill-accent/40" />
      <text x="116" y="224" fontSize="8.5" className="fill-foreground">Hantek: 334 kbit/s user max (460.4k preset)</text>
      <text x="12" y="244" fontSize="8" className="fill-muted">Bar lengths to scale against 1 Mbps</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs Hantek DSO2D15",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1102Z-E vs Hantek DSO2D15 is a choice between two well-equipped two-channel benches, and for anyone debugging a microcontroller the serial-bus support decides it. Both trigger on and decode UART, I2C and SPI. The DSO2D15 adds CAN and LIN, plus 150 MHz and a built-in 25 MHz generator. The DS1102Z-E adds parallel decoding, UART triggering up to 1 Mbps, 24 Mpts of memory and a 500 µV/div range. This page maps which bus work each one handles.",
  a: {
    pick: ds1102,
    imageAlt: "Rigol DS1102Z-E 100 MHz two-channel oscilloscope",
    chooseIf: [
      "You debug fast UARTs at 921,600 baud or 1 Mbps",
      "You want long captures of bus traffic: up to 24 Mpts per Rigol's datasheet",
      "You want LAN remote control and a three-year warranty from the maker",
      "You measure millivolt ripple as well as logic, with a 500 µV/div floor",
    ],
  },
  b: {
    pick: d15,
    imageAlt: "Hantek DSO2D15 150 MHz two-channel oscilloscope with generator",
    chooseIf: [
      "You work on automotive or industrial CAN and LIN networks",
      "You want a built-in generator to feed test signals into a circuit",
      "You need 150 MHz and a 2.4 ns rise time for fast edges",
      "Your UARTs run at standard rates up to 115,200 or 230,400 baud",
    ],
  },
  extraSpecs: [
    { label: "Serial triggers", a: "RS232/UART, I2C, SPI", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Serial decoding", a: "Parallel, UART, I2C, SPI (2 buses)", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "UART trigger speed", a: "Presets to 921,600 bps and 1 Mbps, plus user", b: "Presets to 460,400 bit/s; user 300 to 334,000 bit/s" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch), datasheet", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfms/s", b: "Not stated" },
    { label: "Built-in generator", a: "None", b: "1 ch, 25 MHz sine, 10 MHz square/arbitrary" },
    { label: "Most sensitive range (1X)", a: "500 µV/div", b: "2 mV/div" },
    { label: "Rise time", a: "3.5 ns (calculated)", b: "2.4 ns (typical)" },
    { label: "Interfaces", a: "USB Host/Device, LAN (LXI), Aux out", b: "USB Host/Device" },
    { label: "Weight", a: "2.9 kg", b: "1.9 kg" },
  ],
  differences: [
    "Buses: both handle UART, I2C and SPI. The DSO2D15 adds CAN and LIN triggering and decoding; the DS1102Z-E adds parallel decoding.",
    "UART speed: Rigol lists UART trigger presets up to 1 Mbps. Hantek's presets stop at 460,400 bit/s and its user-defined rate at 334,000 bit/s.",
    "Bandwidth: 150 MHz on the Hantek against 100 MHz on the Rigol, with 2.4 ns against 3.5 ns rise time.",
    "Memory: up to 24 Mpts on the Rigol per its datasheet (its series page says 12M standard), three times the Hantek's 8 Mpts.",
    "Generator: the DSO2D15 has a 25 MHz source; the DS1102Z-E has none.",
    "Rigol publishes a 30,000 wfms/s capture rate, LAN control and a three-year warranty; Hantek publishes none of the three for the DSO2D15.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from the makers' documents.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The Hantek leads on speed and stimulus, the Rigol on memory and sensitivity. Both share 1 GSa/s, 8-bit
          sampling and a 7-inch 800 × 480 screen.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Serial buses each scope can decode.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 5, display: "5 (adds CAN, LIN)", highlight: true },
                { label: "Rigol DS1102Z-E", value: 4, display: "4 (adds parallel)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Fastest UART trigger rate each maker lists.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 1000, display: "1 Mbps", highlight: true },
                { label: "Hantek DSO2D15", value: 460.4, display: "460.4 kbit/s preset" },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth per each maker.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "Rigol DS1102Z-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Memory with both channels on. Rigol datasheet figure.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1102Z-E", value: 12, display: "12 Mpts", highlight: true },
                { label: "Hantek DSO2D15", value: 4, display: "4 Mpts" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bus by bus: what each scope can decode</h2>
        <Figure
          caption={
            <>
              Trigger and decode coverage from each maker&apos;s spec table, with the UART trigger ceiling drawn to
              scale.
            </>
          }
        >
          <BusCoverageDiagram />
        </Figure>
        <h3 className="text-lg font-semibold mt-4 mb-2">UART: the Rigol goes faster</h3>
        <p className="text-muted leading-7 mb-4">
          Most serial consoles run at 115,200 baud, which both scopes handle. Faster links, used by some bootloaders and
          debug logs, run at 921,600 baud or 1 Mbaud, and Rigol lists both as presets. Hantek&apos;s user-defined UART
          rate stops at 334,000 bit/s and its fastest preset is 460,400, so a 921,600-baud link is off its list.
        </p>
        <h3 className="text-lg font-semibold mb-2">CAN and LIN: only the Hantek</h3>
        <p className="text-muted leading-7 mb-4">
          Hantek lists CAN triggering on frame types, IDs, data and errors at up to 1 Mbit/s, and LIN triggering on
          sync, ID and data fields. Rigol&apos;s DS1000Z-E datasheet lists neither. For car modules, e-bike
          controllers or industrial sensors, that settles it.
        </p>
        <h3 className="text-lg font-semibold mb-2">SPI and parallel on two channels</h3>
        <p className="text-muted leading-7 mb-4">
          With two inputs you can probe SPI clock and one data line. Rigol lists a timeout condition for SPI, which
          frames bytes by the idle gap rather than a chip-select line; Hantek&apos;s spec table doesn&apos;t say how it
          frames SPI. Rigol&apos;s parallel decoding is real but limited here: on a two-channel scope, a parallel bus
          means two bits at most.
        </p>
        <KeyIdea title="Memory sets how much traffic you see">
          At 115,200 baud a UART byte takes about 87 µs (10 bits). To keep 20 samples per bit you need about 2.3 MSa/s.
          At that rate, 12 Mpts holds about 5.2 seconds of traffic on each of two channels and 4 Mpts about 1.7
          seconds. For long logs, the Rigol keeps three times more context around the trigger.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs Hantek DSO2D15: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Reading a debug log at 921,600 baud", "DS1102Z-E", "Rigol lists the preset; Hantek's limit is 460,400"],
            ["Diagnosing a CAN bus in a car", "DSO2D15", "CAN trigger and decode; Rigol lists none"],
            ["LIN window-lift or seat module", "DSO2D15", "LIN trigger and decode"],
            ["I2C sensor at 100 or 400 kHz", "Either", "Both trigger on addresses and decode"],
            ["Feeding a clock into a circuit under test", "DSO2D15", "Built-in 25 MHz generator"],
            ["Long capture of a UART session", "DS1102Z-E", "Up to 12 Mpts per channel with both on"],
            ["Remote logging from a PC over the network", "DS1102Z-E", "LAN (LXI) port listed"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1102Z-E: deeper and more sensitive</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1102Z-E fits general embedded work: fast UARTs, I2C, SPI, plus millivolt-level supply checks thanks to
          its 500 µV/div floor. Its 30,000 wfms/s rate and 60,000-frame recording help with intermittent faults.
          It can&apos;t read CAN or LIN, has no generator, and its 100 MHz is enough for clocks to about 20 MHz.
        </p>
        <h3 className="text-lg font-semibold mb-2">Hantek DSO2D15: wider bus list, faster front end</h3>
        <p className="text-muted leading-7 mb-4">
          The DSO2D15 covers vehicle and industrial buses, drives circuits from its own generator and shows edges down
          to roughly 7 ns with fair accuracy. It can&apos;t trigger on UARTs above 460,400 bit/s, has a third of the
          Rigol&apos;s memory and goes no finer than 2 mV/div. Hantek doesn&apos;t publish its waveform update rate.
        </p>
        <Callout title="Probing a vehicle bus safely">
          On a car, connect the scope ground to chassis ground, not to CAN_L, and keep the scope&apos;s mains lead away
          from the ignition system. Both scopes are earth-referenced through their mains plugs. Never probe ignition
          coil primaries or hybrid high-voltage systems without the right high-voltage differential probe and
          training; leave those to a qualified technician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: Hantek&apos;s missing figures</h2>
        <p className="text-muted leading-7 mb-4">
          Rigol publishes a waveform capture rate, a warranty term and a full datasheet with a revision number. Hantek&apos;s
          DSO2000 page gives a detailed spec table but no waveform update rate and, in the documents we used, no
          warranty term. None of that makes the DSO2D15 a bad scope, but it means you buy part of it on trust. Rigol&apos;s
          own weak spot is the memory conflict between its datasheet (24 Mpts) and its series page (12M standard).
        </p>
        <p className="text-muted leading-7">
          Related pairs:{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" className={link}>
            Rigol DS1102Z-E vs Hantek DSO5102P
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1102Z-E vs DS1202Z-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" className={link}>
            Hantek DSO2D15 vs Rigol DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" className={link}>
            Hantek DSO2C10 vs DSO2D15
          </Link>
          . For technique, see{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem" className={link}>
            diagnosing a UART problem
          </Link>{" "}
          and our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For microcontroller work with fast UARTs, long captures and millivolt checks, the Rigol DS1102Z-E is the better bench: 1 Mbps UART triggering, up to 24 Mpts and 500 µV/div. For automotive or industrial buses, or if you want a generator and 150 MHz in one box, the Hantek DSO2D15 is the clear pick, since it decodes CAN and LIN and the Rigol doesn't.",
  chooseNeitherIf:
    "You need to see SPI's clock, chip select and both data lines together, or decode a wide parallel bus. Two channels can't do either; a four-channel scope such as the Rigol DS1054Z is the better tool.",
  faqs: [
    {
      question: "Can the Rigol DS1102Z-E decode CAN bus?",
      answer:
        "Rigol's DS1000Z-E datasheet doesn't list CAN; its decoders are parallel, RS232/UART, I2C and SPI, with triggers for UART, I2C and SPI. You can still view CAN_H and CAN_L waveforms and check levels and timing, but you would read bits by hand. The Hantek DSO2D15 triggers on and decodes CAN and LIN.",
    },
    {
      question: "What is the fastest UART the Hantek DSO2D15 can trigger on?",
      answer:
        "Hantek's spec table lists UART baud presets from 110 to 460,400 bit/s and a user-defined range of 300 to 334,000 bit/s. That covers the common 9,600 and 115,200 baud consoles. For 921,600 baud or 1 Mbaud links, the Rigol DS1102Z-E lists presets for both.",
    },
    {
      question: "How many buses can each scope decode at once?",
      answer:
        "Rigol's datasheet gives two decode buses for the DS1102Z-E. Hantek's DSO2000 table lists its five protocols and a protocol-monitoring function but doesn't state how many buses decode at once. With only two analog channels on either scope, two simple buses is the practical limit anyway.",
    },
    {
      question: "Is 150 MHz useful for serial bus debugging?",
      answer:
        "Not for decoding. UART, I2C, CAN and LIN run far below 100 MHz, and even a 20 MHz SPI clock keeps its 5th harmonic on the Rigol. The DSO2D15's extra bandwidth helps when you look at signal integrity on fast edges, such as ringing or overshoot on a high-speed SPI line.",
    },
    {
      question: "Which one is easier to move between workbenches?",
      answer:
        "The Hantek DSO2D15, at 1900 g per Hantek against 2.9 kg for the Rigol DS1102Z-E per its datasheet. Both run from mains power. If you carry a scope to a car often, a battery handheld may suit you better than either; see our automotive picks.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1102Z-E vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1102z-e-vs-hantek-dso5102p" },
    { label: "Rigol DS1102Z-E vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Hantek DSO2D15 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2d15-vs-hantek-dso2d10" },
    { label: "Hantek DSO2D15 vs Rigol DS1054Z", href: "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" },
    { label: "Hantek DSO5102P vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso5102p-vs-hantek-dso2d15" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Diagnose a UART problem", href: "/oscilloscopes/how-to-use-an-oscilloscope-to-diagnose-a-uart-communication-problem" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
  ],
};

export default function RigolDs1102zEVsHantekDso2d15Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
