import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// PicoScope 2204A per https://www.picotech.com/download/datasheets/picoscope-2000-series-data-sheet-en.pdf (as cited on
// /oscilloscopes/picoscope-2204a-vs-hantek-6022be, checked 2026-10-24): 2 channels, 10 MHz, 35 ns calculated rise time;
// 100 MS/s on one channel, 50 MS/s on two; 8-bit, enhanced to 12-bit in software; AC/DC coupling; BNC inputs; 10 mV/div to
// 4 V/div, ranges up to +/-20 V; ETS 2 GS/s; USB streaming 1 MS/s with 100 MS streaming memory in PicoScope 7; 8 kS block
// memory shared between active channels; edge, window, pulse width, dropout, interval and logic triggers; function
// generator 0.1 Hz-100 kHz, +/-2 V, with sweep; 12-bit AWG at 1.548 MS/s; serial decoding incl. CAN, I2C, LIN, SPI,
// RS232/UART; mask testing; USB 2.0 powered; 142 x 92 x 18.8 mm; under 0.2 kg; 5-year warranty; PicoScope 7 on 64-bit
// Windows, macOS and Linux.
// PicoScope 2204A Amazon https://www.amazon.com/dp/B00GZMRZ3M (Pico Technology store, In Stock at ZIP 10001, checked
// 2026-11-08): decodes 40 serial protocols as standard; kit USB 2.0 cable, two x1/x10 passive probes and quick start guide;
// 10,000-waveform circular buffer; 2000 waveforms per second; "This device is not compatible with PicoScope 7 Automotive
// Software"; item weight 5 ounces.
// Hantek 1008C per https://hantek.com/products/detail/13170 (checked 2026-11-08): 8 channels, 12-bit, 2.4 MSa/s, 4K memory,
// 1 MOhm, DC coupling, 400 V (DC + AC peak), 10 mV/div-5 V/div, 1 ns/div-20000 s/div, edge trigger on CH1-CH8, + - x / FFT
// invert, current ranges for CC65/CC650/CC1100 clamps, 8-channel LVTTL generator 0-250 kHz, USB 2.0 full speed, no external
// supply, Windows XP/7/8/10, 190 x 167 x 35 mm, 0.63 kg, one high-pressure ignition probe listed, "Over 80" / "78" automotive
// functions. 100 kHz bandwidth per the shared Hantek1008 manual (per this site's 1008C Pick). Amazon
// https://www.amazon.com/dp/B00BSR98KW (buy box at ZIP 10001, checked 2026-11-08): over 80 automotive functions, video help,
// one-key report; box: scope, CD, auto probe, 4 alligator-to-coax leads, 4 coax connectors.
// Voltage examples in the diagram are typical automotive values, labeled illustrative; ratios are our arithmetic.

const path = "/oscilloscopes/picoscope-2204a-vs-hantek-1008c";
const pico = picks.find((p) => p.name === "PicoScope 2204A")!;
const hantek = picks.find((p) => p.name === "Hantek 1008C")!;

export const metadata = buildMetadata({
  title: "PicoScope 2204A vs Hantek 1008C: Lab or Car",
  description:
    "PicoScope 2204A vs Hantek 1008C: a 10 MHz two-channel lab USB scope against an eight-channel 400 V car scope. Input ranges, speed charts and a clear verdict.",
  path: "/oscilloscopes/picoscope-2204a-vs-hantek-1008c",
  image: pico.image,
});

const link = "text-accent hover:underline";

/** Input range against typical signal sizes: ±20 V on the Pico, 400 V on the Hantek. */
function InputRangeDiagram() {
  const scale = (v: number) => 190 - (Math.log10(v) / Math.log10(400)) * 160;
  const marks = [
    { v: 3.3, t: "3.3 V logic" },
    { v: 5, t: "5 V sensor" },
    { v: 14, t: "14 V charging" },
    { v: 60, t: "injector spike (tens of V)" },
    { v: 400, t: "400 V limit" },
  ];
  return (
    <svg
      viewBox="0 0 400 215"
      className="w-full h-auto"
      role="img"
      aria-label="PicoScope 2204A vs Hantek 1008C input range diagram on a log scale: the PicoScope's ranges stop at 20 volts, which covers 3.3 volt logic, 5 volt sensors and a 14 volt charging system, while the Hantek 1008C accepts up to 400 volts, which also covers injector turn-off spikes of tens of volts."
    >
      <text x="200" y="14" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Input headroom, log scale (illustrative signal sizes)</text>
      <path d="M150 30 V190" className="stroke-border" strokeWidth="1" />
      {marks.map((m) => (
        <g key={m.t}>
          <path d={`M146 ${scale(m.v)} H154`} className="stroke-muted" strokeWidth="1" />
          <text x="142" y={scale(m.v) + 3} fontSize="8.5" textAnchor="end" className="fill-foreground">
            {m.t}
          </text>
        </g>
      ))}
      <rect x="180" y={scale(20)} width="70" height={190 - scale(20)} rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1.2" />
      <text x="215" y={scale(20) - 6} fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">2204A: ±20 V</text>
      <rect x="290" y={scale(400)} width="70" height={190 - scale(400)} rx="3" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="325" y={scale(400) - 6} fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">1008C: 400 V</text>
      <text x="200" y="208" fontSize="8" textAnchor="middle" className="fill-muted">Bars start at 1 V. Pico: largest input range; Hantek: DC + AC peak limit.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "PicoScope 2204A vs Hantek 1008C",
  path,
  published: "2026-11-08",
  intro:
    "PicoScope 2204A vs Hantek 1008C compares two screenless USB scopes built for opposite jobs. The 2204A is an electronics tool: two channels at 10 MHz, 100 MS/s, 40 serial decoders, a generator and AWG, and software for Windows, macOS and Linux. The 1008C is a car tool: eight 12-bit channels at 2.4 MSa/s, 400 V inputs, an eight-channel crank and cam simulator and more than 80 guided automotive tests. Pico itself says the 2204A doesn't work with its automotive software, so circuit boards point to the Pico and cars point to the Hantek.",
  a: {
    pick: pico,
    imageAlt: "PicoScope 2204A two-channel USB oscilloscope",
    chooseIf: [
      "You work on microcontrollers, audio and sensors under a few MHz",
      "You want serial decoding for I2C, SPI, UART and CAN from one USB device",
      "You use a Mac or Linux laptop",
      "You want Pico's five-year warranty and ongoing software updates",
    ],
  },
  b: {
    pick: hantek,
    imageAlt: "Hantek 1008C eight-channel automotive USB oscilloscope kit",
    chooseIf: [
      "You diagnose engines and want guided tests with reference waveforms",
      "You need to watch crank, cam and several injectors at the same time",
      "Your signals swing past 20 V: injector and coil primary circuits",
      "You want to simulate crank and cam signals into an ECU on the bench",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "10 MHz (35 ns rise time)", b: "100 kHz (Hantek manual)" },
    { label: "Sample rate", a: "100 MS/s (1 ch), 50 MS/s (2 ch); ETS 2 GS/s", b: "2.4 MSa/s (split across channels not stated)" },
    { label: "Resolution", a: "8-bit, up to 12-bit enhanced in software", b: "12-bit" },
    { label: "Memory", a: "8 kS block; 100 MS streaming in PicoScope 7", b: "4K" },
    { label: "Input range", a: "Up to ±20 V; 10 mV/div to 4 V/div", b: "400 V (DC + AC peak); 10 mV/div to 5 V/div" },
    { label: "Coupling", a: "AC/DC", b: "DC" },
    { label: "Triggers", a: "Edge, window, pulse width, dropout, interval, logic", b: "Edge on any of CH1–CH8" },
    { label: "Serial decoding", a: "Yes, 40 protocols per Amazon (incl. CAN, LIN, I2C, SPI, UART)", b: "Not listed" },
    { label: "Generator", a: "0.1 Hz–100 kHz, ±2 V, sweep; 12-bit AWG", b: "8 channels, LVTTL, 0–250 kHz" },
    { label: "Software", a: "PicoScope 7 on Windows, macOS, Linux", b: "Hantek software on Windows XP/7/8/10" },
    { label: "Size and weight", a: "142 × 92 × 18.8 mm, under 0.2 kg", b: "190 × 167 × 35 mm, 0.63 kg" },
    { label: "Warranty", a: "Five years", b: "Not stated" },
  ],
  differences: [
    "Channels: two on the 2204A, eight on the 1008C.",
    "Speed: 10 MHz and 100 MS/s on the Pico against 100 kHz and 2.4 MSa/s on the Hantek, about 40 times the sample rate.",
    "Voltage: the Pico's ranges top out at ±20 V; the Hantek takes 400 V (DC + AC peak), twenty times more.",
    "Resolution: the Hantek is 12-bit in hardware; the Pico is 8-bit, enhanced to 12-bit in software.",
    "Decoding and triggers: the Pico decodes CAN, LIN, I2C, SPI and UART among 40 protocols and has six trigger types. The Hantek has edge triggering and no listed decoding.",
    "Automotive software: the Hantek ships with over 80 guided tests. Pico's listing says the 2204A isn't compatible with PicoScope 7 Automotive.",
    "Platform: PicoScope 7 runs on Windows, macOS and Linux; Hantek lists Windows only.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Every chart points the same way: the Pico is faster and smarter, the Hantek is wider and tougher. The speed
          charts use a log scale because the gaps are large.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Sample rate with one channel on, log scale.</>}>
            <BarChart
              log
              items={[
                { label: "PicoScope 2204A", value: 100_000_000, display: "100 MS/s", highlight: true },
                { label: "Hantek 1008C", value: 2_400_000, display: "2.4 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth, log scale. The Hantek figure is from its manual.</>}>
            <BarChart
              log
              items={[
                { label: "PicoScope 2204A", value: 10_000_000, display: "10 MHz", highlight: true },
                { label: "Hantek 1008C", value: 100_000, display: "100 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog channels.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008C", value: 8, display: "8", highlight: true },
                { label: "PicoScope 2204A", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Highest input voltage each maker gives.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008C", value: 400, display: "400 V (DC + AC peak)", highlight: true },
                { label: "PicoScope 2204A", value: 20, display: "±20 V range" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The Pico also holds a 10,000-waveform circular buffer and updates up to 2000 waveforms per second, per its
          listing, so you can step back through earlier captures to find a glitch. Hantek gives neither figure for the
          1008C.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">PicoScope 2204A vs Hantek 1008C on a car</h2>
        <p className="text-muted leading-7 mb-4">
          A car&apos;s 12 V system runs at about 14 V when charging, which fits inside the Pico&apos;s ±20 V. The trouble
          comes when an injector or ignition coil primary switches off: the collapsing field throws a spike well above the
          supply, commonly tens of volts on injectors and more on coil primaries. That is past the 2204A&apos;s range,
          while the Hantek&apos;s 400 V limit has room for it.
        </p>
        <Figure caption={<>Illustrative typical voltages on a log scale. Check the actual circuit before connecting.</>}>
          <InputRangeDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          The software gap is just as large. The 1008C&apos;s package walks you through tests for ignition, sensors, bus
          activity, starting and charging, with reference waveforms and video help, and produces a one-key report for the
          customer. PicoScope 7 on the 2204A is a general instrument; Pico&apos;s own listing points car technicians to its
          automotive models instead. With eight channels the Hantek can also show crank, both cams and several injectors in
          one capture, which reveals timing relationships the Pico&apos;s two channels can&apos;t.
        </p>
        <h3 className="text-lg font-semibold mb-2">The one car job the Pico does better</h3>
        <p className="text-muted leading-7 mb-4">
          Bus signals. High-speed CAN at 500 kbit/s has 2 µs bits. At 100 MS/s the Pico takes 200 samples per bit and can
          decode the frames; at 2.4 MSa/s the Hantek takes under five samples per bit through a 100 kHz front end, enough
          to see that the bus is active but not to judge edge shape or read the data. The{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-1008c" className={link}>
            Hantek 6022BE vs 1008C page
          </Link>{" "}
          works through the same CAN arithmetic against a cheaper USB scope.
        </p>
        <KeyIdea title="12-bit hardware vs 12-bit enhanced">
          The Hantek&apos;s converter resolves 4,096 levels on every sample. The Pico&apos;s 12-bit figure comes from
          software resolution enhancement on an 8-bit converter, which works by averaging neighboring samples and so trades
          away bandwidth to gain detail. On slow sensor signals both get you fine vertical detail; on fast edges only the
          Pico&apos;s speed helps.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Misfire and injector diagnosis", "Hantek 1008C", "Eight channels, 400 V inputs, guided tests"],
            ["Arduino, ESP32 or Raspberry Pi debugging", "PicoScope 2204A", "I2C, SPI and UART decoding at 100 MS/s"],
            ["Reading CAN frames on a car or a robot", "PicoScope 2204A", "Fast enough to decode 500 kbit/s CAN"],
            ["Testing an ECU input on the bench", "Hantek 1008C", "Eight-channel crank and cam simulator"],
            ["Audio filter response on a Mac", "PicoScope 2204A", "Sweep generator plus macOS support"],
            ["Producing a report for a customer's car", "Hantek 1008C", "One-key diagnostic report"],
            ["Laptop bag for an electronics student", "PicoScope 2204A", "Under 0.2 kg, five-year warranty"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          The 2204A covers signals up to about 2–3 MHz at close to true size: audio, PWM, I2C at 400 kHz, UART and slower
          SPI. Its 8 kS block memory is short, but streaming to the PC with 100 MS of buffer stretches long captures at
          lower rates. It can&apos;t take more than ±20 V on its ranges or watch more than two signals. The 1008C covers
          slow signals to about 20–30 kHz at full size: crank and cam sensors, injector pulse widths, alternator ripple and
          slow sensors over many minutes, with a timebase to 20000 s/div. It can&apos;t show fast logic, can&apos;t decode a
          bus and has only 4K points per capture.
        </p>
        <Callout title="Car electrics and laptops">
          Both scopes take their ground from the laptop&apos;s USB port. Run the laptop on battery when probing a vehicle,
          and never clip a ground lead to anything other than chassis or battery negative. Ignition secondary must be read
          through a capacitive pickup, not a direct lead. Keep cables away from fans and belts on a running engine, and
          run it outdoors or with exhaust extraction.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: software support</h2>
        <p className="text-muted leading-7 mb-4">
          Pico publishes a full datasheet, sells through its own Amazon store, offers a five-year warranty and supports
          three operating systems. Hantek&apos;s 1008C page is thinner: it repeats the automotive function count two
          different ways (&quot;over 80&quot; and &quot;78&quot;), puts the 100 kHz bandwidth only in the manual, and lists
          Windows as far back as XP without a current macOS or Linux option. If the scope will be used for years, Pico&apos;s
          paperwork is the stronger bet; if the job is cars, the Hantek is the one built for it.
        </p>
        <p className="text-muted leading-7">
          Related comparisons:{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-hantek-6022be" className={link}>
            PicoScope 2204A vs Hantek 6022BE
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" className={link}>
            PicoScope 2204A vs Analog Discovery 3
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-1008c-vs-hantek-1008b" className={link}>
            Hantek 1008C vs 1008B
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the PicoScope 2204A for electronics: 10 MHz, 100 MS/s, serial decoding, a sweep generator, macOS and Linux support and a five-year warranty. Buy the Hantek 1008C for cars: eight 12-bit channels, 400 V inputs, a crank and cam simulator and over 80 guided tests. Pico says the 2204A doesn't run its automotive software, so don't stretch it into a car scope.",
  chooseNeitherIf:
    "You want a scope with its own screen for the bench or the driveway. Both need a laptop; a benchtop or handheld scope fits that better.",
  faqs: [
    {
      question: "Can the PicoScope 2204A be used for car diagnostics?",
      answer:
        "Only in a limited way. Its ranges stop at ±20 V, so injector and coil primary spikes are out of range, and Pico's Amazon listing says it isn't compatible with PicoScope 7 Automotive software. It can still decode CAN and look at 5 V sensor signals. Pico points car technicians to its automotive models instead.",
    },
    {
      question: "Can the Hantek 1008C be used for electronics projects?",
      answer:
        "For slow signals only. Its manual gives a 100 kHz bandwidth and it samples at 2.4 MSa/s, so audio and slow sensors work, but I2C, SPI and microcontroller clocks don't. It has edge triggering and no listed serial decoding. The PicoScope 2204A, at 10 MHz and 100 MS/s, suits that work far better.",
    },
    {
      question: "Do these USB scopes work on a Mac?",
      answer:
        "The PicoScope 2204A does: Pico lists PicoScope 7 for 64-bit Windows, macOS and Linux. Hantek lists only Windows XP, 7, 8 and 10 for the 1008C, so on a Mac you would need a Windows installation, and Hantek doesn't document driver support for that setup.",
    },
    {
      question: "Which has better vertical resolution?",
      answer:
        "The Hantek 1008C is 12-bit in hardware, 4,096 levels per sample. The PicoScope 2204A is 8-bit, 256 levels, with software enhancement up to 12 bits that works by averaging and reduces effective bandwidth. For slow sensor signals both give fine detail; the Hantek gets it without trading speed.",
    },
    {
      question: "What comes in the box with each?",
      answer:
        "Pico's listing names the scope, a USB 2.0 cable, two x1/x10 passive probes and a quick start guide. The 1008C listing names the scope, an instruction CD, an auto probe, four alligator-clip-to-coax cables and four coax connectors. Hantek's page also lists an ignition probe, but the Amazon box list doesn't name one.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
    { label: "Hantek 1008C vs Hantek 1008B", href: "/oscilloscopes/hantek-1008c-vs-hantek-1008b" },
    { label: "Hantek 6022BE vs Hantek 1008C", href: "/oscilloscopes/hantek-6022be-vs-hantek-1008c" },
    { label: "Hantek 1008C vs Hantek DSO2C10", href: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "Best oscilloscope for Arduino projects", href: "/oscilloscopes/best-oscilloscope-for-arduino-projects" },
  ],
};

export default function PicoScope2204aVsHantek1008cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
