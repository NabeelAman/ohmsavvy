import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// OWON SDS1102: 100 MHz, 2 ch, 1 GSa/s real time, 8-bit, 7-inch 800 x 480, 10K record length, edge and video triggers,
// no generator, logic channels or serial decoding, 301 x 152 x 70 mm, about 1.1 kg per OWON's SDS1000 series product page
// and technical specification (as verified for this site's Pick, 2026-10-24). Amazon https://www.amazon.com/dp/B0781CXRP5
// (In Stock at ZIP 10001, checked 2026-11-08; listing details as recorded 2026-11-07 on
// /oscilloscopes/fnirsi-1014d-vs-owon-sds1102): 5 ns/div-1000 s/div, DC/AC/GND coupling, 5 mV/div-5 V/div,
// Auto/Normal/Single trigger modes, math + - x / invert FFT, 30 auto-measurement options, SCPI and LabVIEW, 2 A T-class
// 250 V fuse (mains), item weight 2.2 lb, first available December 8, 2017. Main listing photos show an SDS1022.
// Hantek DSO2C10 per http://www.hantek.com/products/detail/17182 (as recorded 2026-10-24 on
// /oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10): 100 MHz, 2 ch, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), rise time 3.5 ns
// typical, 8-bit with 12-bit high-res mode, 8 Mpts (1 ch) / 4 Mpts (2 ch), 7-inch 800 x 480, triggers edge, pulse, video,
// slope, overtime, window, pattern, interval, under-amplitude, UART, LIN, CAN, SPI, I2C; decode RS232/UART, I2C, SPI, CAN,
// LIN; 32 auto measurements with statistics; 2 DVMs; 6-digit hardware frequency counter; SCPI; USB host/device;
// 1 MOhm || 13 pF; 100-240 VAC, under 30 W; 318 x 110 x 150 mm; 1900 g; no generator. Amazon
// https://www.amazon.com/dp/B09GY871QK (Hantek Store, in stock at ZIP 10001, checked 2026-11-08): 14 trigger modes incl. 5
// serial protocol triggers and decodes, 32 measurements with statistics; first available September 23, 2021; mentions
// arbitrary waveform output, which conflicts with Hantek's table.
// OWON doesn't state a two-channel sample-rate split; Hantek's DSO2C10 vertical range isn't in the sources above.
// The runt diagram is illustrative.

const path = "/oscilloscopes/owon-sds1102-vs-hantek-dso2c10";
const owon = picks.find((p) => p.name === "OWON SDS1102")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2C10")!;

export const metadata = buildMetadata({
  title: "OWON SDS1102 vs Hantek DSO2C10: Slim or Smart",
  description:
    "OWON SDS1102 vs Hantek DSO2C10: a slim 1.1 kg 100 MHz bench against a 100 MHz Hantek with 14 trigger types, 8 Mpts and decoding. Charts, runt diagram, verdict.",
  path: "/oscilloscopes/owon-sds1102-vs-hantek-dso2c10",
  image: hantek.image,
});

const link = "text-accent hover:underline";

/** A pulse train with one runt: an edge trigger fires on every pulse, an under-amplitude trigger only on the bad one. */
function RuntTriggerDiagram() {
  const hi = 52;
  const lo = 112;
  const runt = 86;
  const pulses = [
    { x: 40, top: hi },
    { x: 100, top: hi },
    { x: 160, top: runt },
    { x: 220, top: hi },
    { x: 280, top: hi },
  ];
  let d = `M20 ${lo}`;
  pulses.forEach((p) => {
    d += ` H${p.x} V${p.top} H${p.x + 30} V${lo}`;
  });
  d += " H380";
  return (
    <svg
      viewBox="0 0 400 210"
      className="w-full h-auto"
      role="img"
      aria-label="OWON SDS1102 vs Hantek DSO2C10 trigger diagram: a train of five logic pulses where the third only reaches about half height. The SDS1102's edge trigger crosses its level on every full pulse and may also cross on the short one depending on the level set, so the bad pulse is hard to isolate; the DSO2C10's under-amplitude trigger, set between the two thresholds, fires only on the short pulse."
    >
      <text x="200" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">One runt pulse in a logic stream (illustrative)</text>
      <path d="M20 66 H380" className="stroke-muted" strokeWidth="1" strokeDasharray="4 3" />
      <text x="382" y="64" fontSize="7.5" className="fill-muted">high</text>
      <path d="M20 98 H380" className="stroke-muted" strokeWidth="1" strokeDasharray="4 3" />
      <text x="382" y="96" fontSize="7.5" className="fill-muted">low</text>
      <path d={d} className="fill-none stroke-accent" strokeWidth="1.8" />
      <text x="175" y="80" fontSize="8" textAnchor="middle" className="fill-foreground">runt</text>
      {pulses.map((p, i) => (
        <text key={i} x={p.x + 15} y="132" fontSize="9" textAnchor="middle" className="fill-muted">
          ✓
        </text>
      ))}
      <text x="20" y="148" fontSize="8.5" className="fill-foreground">SDS1102 edge trigger: fires on every rising edge it sees cross the level</text>
      <path d="M175 160 V170" className="stroke-accent" strokeWidth="2" />
      <text x="175" y="182" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">fires here only</text>
      <text x="20" y="200" fontSize="8.5" className="fill-foreground">DSO2C10 under-amplitude trigger: crosses low threshold but not high</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "OWON SDS1102 vs Hantek DSO2C10",
  path,
  published: "2026-11-08",
  intro:
    "OWON SDS1102 vs Hantek DSO2C10 is a question of what you need the trigger to do. Both are two-channel 100 MHz benches at 1 GSa/s with 7-inch 800 × 480 screens. The OWON is slim and light, about 1.1 kg and 70 mm deep, with 10K points and edge and video triggers. The Hantek weighs 1.9 kg but brings 14 trigger types, including runt, window and five serial buses, plus 8 Mpts of memory and decoding. If you hunt intermittent faults or debug digital buses, buy the Hantek; if you mainly view steady waveforms on a cramped bench, the OWON is enough.",
  a: {
    pick: owon,
    imageAlt: "OWON SDS1000-series slim two-channel bench oscilloscope",
    chooseIf: [
      "Bench space is tight: OWON lists 301 × 152 × 70 mm and about 1.1 kg",
      "You mostly view steady, repeating waveforms that an edge trigger locks easily",
      "You want a 5 mV/div bottom range, stated on its Amazon listing",
      "You don't need serial decoding or long captures",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz oscilloscope with serial decoding",
    chooseIf: [
      "You chase intermittent faults: runt, window, interval and pattern triggers",
      "You debug UART, I2C, SPI, CAN or LIN and want triggers and decoding",
      "You need long single-shot captures: 8 Mpts on one channel",
      "You want measurement statistics, two DVMs and a 6-digit counter",
    ],
  },
  extraSpecs: [
    { label: "Memory", a: "10K points", b: "8 Mpts (1 ch), 4 Mpts (2 ch)" },
    { label: "Two-channel sample rate", a: "Not stated", b: "500 MSa/s per channel" },
    { label: "Trigger types", a: "Edge, video", b: "Edge, pulse, video, slope, overtime, window, pattern, interval, under-amplitude, UART, LIN, CAN, SPI, I2C" },
    { label: "Serial decoding", a: "None", b: "RS232/UART, I2C, SPI, CAN, LIN" },
    { label: "Resolution", a: "8-bit", b: "8-bit, 12-bit high-res mode" },
    { label: "Measurements", a: "30 options (Amazon)", b: "32 with statistics, 2 DVMs, 6-digit counter" },
    { label: "Vertical range", a: "5 mV/div to 5 V/div (Amazon)", b: "Not stated in our sources" },
    { label: "Timebase", a: "5 ns/div to 1000 s/div (Amazon)", b: "Not stated in our sources" },
    { label: "Coupling", a: "DC, AC, GND (Amazon)", b: "Not stated in our sources" },
    { label: "PC control", a: "SCPI, LabVIEW (Amazon)", b: "SCPI, USB host and device" },
    { label: "Size and weight", a: "301 × 152 × 70 mm, about 1.1 kg", b: "318 × 110 × 150 mm, 1.9 kg" },
    { label: "Power", a: "Mains (2 A, 250 V fuse per Amazon)", b: "100–240 VAC, under 30 W" },
  ],
  differences: [
    "Triggers: the SDS1102 has edge and video. The DSO2C10 lists 14 types, including under-amplitude (runt), window, pattern, interval and five serial-bus triggers.",
    "Memory: 10K points against 8 Mpts, an 800-fold gap. At 1 GSa/s that is 10 µs against 8 ms.",
    "Decoding: the DSO2C10 decodes UART, I2C, SPI, CAN and LIN; the SDS1102 decodes nothing.",
    "Size: about 1.1 kg and 70 mm deep for the OWON against 1.9 kg for the Hantek.",
    "Sensitivity: the OWON listing gives 5 mV/div; the DSO2C10's range isn't in our sources, though it adds a 12-bit high-res mode.",
    "Shared: 100 MHz, 1 GSa/s headline, 8-bit converter, 7-inch 800 × 480, mains power, SCPI control, no generator.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth, headline sample rate and screen are ties. The charts cover the four places they differ, and only one
          of them favors the OWON.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Memory on one channel, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek DSO2C10", value: 8_000_000, display: "8 Mpts", highlight: true },
                { label: "OWON SDS1102", value: 10_000, display: "10K" },
              ]}
            />
          </Figure>
          <Figure caption={<>Trigger types each maker lists.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2C10", value: 14, display: "14", highlight: true },
                { label: "OWON SDS1102", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Serial protocols decoded.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2C10", value: 5, display: "5", highlight: true },
                { label: "OWON SDS1102", value: 0, display: "none" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight per each maker. Lower is easier to move.</>}>
            <BarChart
              items={[
                { label: "Hantek DSO2C10", value: 1.9, display: "1.9 kg" },
                { label: "OWON SDS1102", value: 1.1, display: "about 1.1 kg", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Memory and decoding against the same short-memory chassis are covered on{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" className={link}>
            HANMATEK DOS1102 vs Hantek DSO2C10
          </Link>
          , whose HANMATEK publishes the same dimensions, weight and 10K record length as this OWON. This page looks at the
          other half of the gap: triggering.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">OWON SDS1102 vs Hantek DSO2C10 on an intermittent fault</h2>
        <p className="text-muted leading-7 mb-4">
          A scope finds intermittent faults through its trigger, not its screen. An edge trigger fires every time the signal
          crosses a level in one direction. On a clean 1 kHz square wave that is perfect. On a data line where one pulse in
          ten thousand only reaches half height, the edge trigger fires on the good pulses too, and the bad one flashes past
          between screen updates.
        </p>
        <Figure caption={<>Illustrative: a runt pulse in a logic stream. Only a trigger with two thresholds can pick it out.</>}>
          <RuntTriggerDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The DSO2C10&apos;s under-amplitude trigger sets two thresholds and fires only on a pulse that crosses the lower
          one but not the upper. Set it, walk away, and the scope stops on the first runt. Its other triggers work the same
          way for other faults. Window fires when a signal leaves a voltage band, which suits a supply rail that sags under
          load. Interval and overtime catch a clock that stretches or a gap that runs too long. Pattern fires when both
          channels match a logic state. The SDS1102 can only approach these problems by watching many sweeps, and with
          10K points per sweep it can&apos;t record long stretches at full speed while it waits.
        </p>
        <h3 className="text-lg font-semibold mb-2">Serial triggers close the loop</h3>
        <p className="text-muted leading-7 mb-4">
          For buses, the DSO2C10 can trigger on a specific UART value, I2C address or CAN frame and decode it on screen.
          That turns &quot;the sensor sometimes reads wrong&quot; into a capture of the exact wrong reply. The OWON can show
          the bus as edges, but it can&apos;t tell one byte from another.
        </p>
        <KeyIdea title="Where the OWON still wins">
          Size and sensitivity. At about 1.1 kg and 70 mm deep, the SDS1102 fits a shelf or a crowded repair bench where
          a 1.9 kg scope won&apos;t. Its listing gives a 5 mV/div bottom range and a GND coupling position for quick zero
          checks, useful on ripple and audio. If your signals are steady and your bench is small, those count for more than
          triggers you won&apos;t use.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["A board that resets once an hour", "Hantek DSO2C10", "Window trigger on the supply rail, 8 Mpts to see what led up to it"],
            ["Glitchy I2C sensor readings", "Hantek DSO2C10", "Trigger on the address, decode the reply"],
            ["Clock that occasionally stretches", "Hantek DSO2C10", "Interval and overtime triggers"],
            ["Audio amplifier repair on a small bench", "OWON SDS1102", "Slim, 5 mV/div, steady signals"],
            ["Checking PWM and supply waveforms", "Either", "Edge triggering locks steady signals on both"],
            ["Shelf-mounted scope in a tight workshop", "OWON SDS1102", "About 1.1 kg and 70 mm deep"],
            ["Car CAN or LIN diagnostics", "Hantek DSO2C10", "CAN and LIN trigger and decode"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          With the three-to-five-times rule, both show signals up to about 20–35 MHz at close to true size. Neither has a
          signal generator: OWON lists none, and Hantek&apos;s table shows none for the DSO2C10 despite its Amazon listing
          mentioning waveform output. For a generator on this Hantek platform, see{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" className={link}>
            Hantek DSO2C10 vs DSO2D10
          </Link>
          . Neither has logic channels, and both are 8-bit at their core, so very small signals on top of large ones stay
          coarse unless the DSO2C10&apos;s high-res mode is on.
        </p>
        <Callout title="Mains bench scopes share earth">
          Both plug into mains, which ties every probe ground clip to earth. Clipping a ground lead to a live mains point
          or the hot side of an off-line supply shorts it through the scope. Neither listing gives a CAT rating for these
          models. Use a differential probe or an isolation transformer on the circuit under test, never on the scope, and
          call an electrician for building wiring.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: listing photos and claims</h2>
        <p className="text-muted leading-7 mb-4">
          The SDS1102 listing&apos;s main photos show an SDS1022, a different OWON model, so judge it by OWON&apos;s spec
          pages and check the model badge on delivery. The DSO2C10 listing claims arbitrary waveform output, which
          Hantek&apos;s table contradicts. Both makers publish full spec pages, and on the specs that matter here
          (triggers, memory, decoding) the two sources agree with each other.
        </p>
        <p className="text-muted leading-7">
          More on each:{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" className={link}>
            Rigol DS1054Z vs OWON SDS1102
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" className={link}>
            FNIRSI 1014D vs OWON SDS1102
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hanmatek-dos1102-vs-owon-sds1102" className={link}>
            HANMATEK DOS1102 vs OWON SDS1102
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-hantek-dso5102p" className={link}>
            Hantek DSO2C10 vs DSO5102P
          </Link>{" "}
          and our guide to{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" className={link}>
            triggering on a runt pulse
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Hantek DSO2C10 if you debug digital circuits or hunt intermittent faults: 14 trigger types including runt and window, five serial decoders and 8 Mpts of memory. Buy the OWON SDS1102 if your bench is small and your signals are steady: about 1.1 kg, 70 mm deep and a 5 mV/div range, with edge and video triggers and 10K points.",
  chooseNeitherIf:
    "You need a built-in signal generator or four channels. Neither has a generator, and both have two channels.",
  faqs: [
    {
      question: "Does the OWON SDS1102 have serial decoding?",
      answer:
        "No. OWON lists edge and video triggers only and no protocol decoding for the SDS1102. You can see a UART or I2C line as edges and read bits by hand. The Hantek DSO2C10 triggers on and decodes RS232/UART, I2C, SPI, CAN and LIN.",
    },
    {
      question: "What is an under-amplitude (runt) trigger?",
      answer:
        "It uses two voltage thresholds and fires only when a pulse crosses the lower one but fails to reach the upper. That isolates pulses that didn't reach a valid logic level, often caused by bus contention or a weak driver. The Hantek DSO2C10 lists it; the OWON SDS1102 doesn't.",
    },
    {
      question: "Which has more memory?",
      answer:
        "The Hantek DSO2C10, with 8 Mpts on one channel and 4 Mpts on two, against 10K points on the OWON SDS1102. At 1 GSa/s that is 8 ms against 10 µs of recorded time, which decides whether a single slow event can be captured at full detail.",
    },
    {
      question: "Is the OWON SDS1102 lighter than the DSO2C10?",
      answer:
        "Yes. OWON lists about 1.1 kg and 301 × 152 × 70 mm; Hantek lists 1.9 kg and 318 × 110 × 150 mm for the DSO2C10. Amazon's item weight for the SDS1102 is 2.2 lb, close to OWON's figure. Both run from mains.",
    },
    {
      question: "Do both scopes support PC control?",
      answer:
        "Yes. The SDS1102 Amazon listing mentions SCPI and LabVIEW support. Hantek lists SCPI and USB host and device ports for the DSO2C10. Either can be scripted to pull measurements or screenshots for logging, though you will need each maker's drivers and command set.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "HANMATEK DOS1102 vs OWON SDS1102", href: "/oscilloscopes/hanmatek-dos1102-vs-owon-sds1102" },
    { label: "Hantek DSO2C10 vs Hantek DSO5102P", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso5102p" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "FNIRSI 1014D vs OWON SDS1102", href: "/oscilloscopes/fnirsi-1014d-vs-owon-sds1102" },
    { label: "How to trigger on a runt pulse", href: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse" },
  ],
};

export default function OwonSds1102VsHantekDso2c10Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
