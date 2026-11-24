// Rigol DS1202Z-E (ASIN B0H1J12LDJ) per the official Amazon listing title and bullets (manufacturer RIGOL TECHNOLOGIES
// CO., LTD.; checked 2026-10-24 and 2026-11-24): 200 MHz, 2 channels, 1 GSa/s, up to 24 Mpts, up to 30,000 wfm/s, 17.8 cm
// (7-inch) display. Per Rigol's DS1000Z-E datasheet linked from rigolna.com/products/digital-oscilloscopes/1000z/, as cited
// on /oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e (checked 2026-10-26): 24 Mpts with 1 channel / 12 Mpts with 2;
// RS232/UART, I2C and SPI triggers; parallel, RS232/UART, I2C and SPI decoding on 2 buses, standard (no option code);
// 800 × 480 display. Two-channel sample rate is not broken out in the sources we used.
// Siglent SDS1104X-E (ASIN B0771N1ZF9) per the Pick (100 MHz, 4 channels, 1 GSa/s, 500 MSa/s per channel with all on) and
// https://siglentna.com/digital-oscilloscopes/sds1000x-e-series-super-phosphor-oscilloscopes/, as cited on
// /oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e (checked 2026-10-26): 7 Mpts/ch, 14 Mpts interleaved; 100,000 wfm/s,
// 400,000 wfm/s in sequence mode; 7-inch 800 × 480; free I2C, SPI, UART/RS232, CAN, LIN trigger and decode; 80,000-frame
// history; LAN and web control; 1 Mpt FFT; optional 16-channel MSO. 8-bit per Siglent's SDS1000X-E data sheet.
// The SDS1104X-E is hands-on tested by the owner (handsOnTested: true); no measurements are published here.
// Amazon availability at ZIP 10001 with Chrome, 2026-11-24: both show #add-to-cart-button (DS1202Z-E "Only 9 left in stock").
// Rise times use the standard 0.35 / bandwidth approximation and are labeled as estimates.
import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1104x-e";
const rigol = picks.find((p) => p.name === "Rigol DS1202Z-E")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

export const metadata = buildMetadata({
  title: "Rigol DS1202Z-E vs Siglent SDS1104X-E",
  description:
    "Rigol DS1202Z-E vs Siglent SDS1104X-E: 200 MHz on two channels or 100 MHz on four? Rise time, decoding, capture rate and which scope suits your bench.",
  path: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1104x-e",
  image: siglent.image,
});

const link = "text-accent hover:underline";

/**
 * An SPI bus has four lines. The two-channel DS1202Z-E can watch any two at once; the four-channel SDS1104X-E can
 * watch all four, so chip select, clock and both data lines line up in one capture.
 */
function SpiChannelsDiagram() {
  const lines = [
    { name: "CS", y: 44, d: "M110 44 H130 V58 H330 V44 H360" },
    { name: "SCLK", y: 82, d: "M110 96 H140 V82 H160 V96 H180 V82 H200 V96 H220 V82 H240 V96 H260 V82 H280 V96 H300 V82 H320 V96 H360" },
    { name: "MOSI", y: 120, d: "M110 134 H140 V120 H180 V134 H220 V120 H260 V134 H300 V120 H320 V134 H360" },
    { name: "MISO", y: 158, d: "M110 172 H160 V158 H200 V172 H240 V158 H280 V172 H360" },
  ];
  return (
    <svg
      viewBox="0 0 400 205"
      className="w-full h-auto"
      role="img"
      aria-label="SPI bus timing with four lines: chip select, clock, MOSI and MISO. The Rigol DS1202Z-E's two channels can show any two of them, for example the clock and MOSI. The Siglent SDS1104X-E's four channels can show all four at once, so a whole transaction, including the reply on MISO, appears in one capture."
    >
      {lines.map((l, i) => (
        <g key={l.name}>
          <text x="10" y={l.y + 11} fontSize="9.5" fontWeight="700" className="fill-foreground">{l.name}</text>
          <path d={l.d} className={`fill-none ${i === 1 || i === 2 ? "stroke-accent" : "stroke-muted"}`} strokeWidth="1.6" />
          <rect x="58" y={l.y + 1} width="22" height="13" rx="2" className="fill-accent/30 stroke-accent" strokeWidth="1" />
          <text x="69" y={l.y + 11} fontSize="8" textAnchor="middle" className="fill-foreground">S{i + 1}</text>
          {(i === 1 || i === 2) && (
            <>
              <rect x="84" y={l.y + 1} width="22" height="13" rx="2" className="fill-surface stroke-foreground" strokeWidth="1" />
              <text x="95" y={l.y + 11} fontSize="8" textAnchor="middle" className="fill-foreground">R{i}</text>
            </>
          )}
        </g>
      ))}
      <text x="200" y="198" fontSize="8.5" textAnchor="middle" className="fill-muted">S = Siglent channel (4), R = Rigol channel (2)</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1202Z-E vs Siglent SDS1104X-E",
  path,
  published: "2026-11-24",
  intro:
    "Rigol DS1202Z-E vs Siglent SDS1104X-E comes down to one trade: bandwidth or channels. The Rigol gives you 200 MHz on two channels with 24 Mpts of memory. The Siglent gives you 100 MHz on four channels, a 100,000 wfm/s capture rate and free CAN and LIN decoding alongside I2C, SPI and UART. Both sample at 1 GSa/s on one channel and use a 7-inch 800 × 480 screen. The SDS1104X-E carries our Hands-on Tested badge; the DS1202Z-E is desk research.",
  a: {
    pick: rigol,
    imageAlt: "Rigol DS1202Z-E two-channel 200 MHz digital oscilloscope",
    chooseIf: [
      "Your work involves fast edges, RF-adjacent signals or clocks in the tens of MHz",
      "Two channels cover your measurements, such as input against output",
      "You want long records: 24 Mpts on one channel, 12 Mpts on two",
      "You decode parallel buses as well as UART, I2C and SPI",
    ],
  },
  b: {
    pick: siglent,
    imageAlt: "Siglent SDS1104X-E four-channel 100 MHz digital oscilloscope",
    chooseIf: [
      "You debug buses with three or four lines, such as SPI, or three-phase and multi-rail power",
      "You want CAN and LIN decoding included for automotive work",
      "You hunt rare glitches and want 100,000 wfm/s plus an 80,000-frame history",
      "You want LAN and browser control, and a path to an optional 16-channel MSO",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "Not broken out in our sources", b: "500 MSa/s per channel" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "14 Mpts interleaved; 7 Mpts per channel" },
    { label: "Capture rate", a: "Up to 30,000 wfm/s", b: "100,000 wfm/s; 400,000 in sequence mode" },
    { label: "Decode, included", a: "Parallel, UART/RS232, I2C, SPI", b: "I2C, SPI, UART/RS232, CAN, LIN" },
    { label: "Estimated rise time (0.35 / BW)", a: "About 1.75 ns", b: "About 3.5 ns" },
    { label: "History frames", a: "Not stated in our sources", b: "Up to 80,000" },
    { label: "Remote control", a: "Not stated in our sources", b: "LAN, web browser" },
    { label: "Logic channels", a: "None", b: "Optional 16-channel MSO" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
  ],
  differences: [
    "Bandwidth: 200 MHz on the Rigol against 100 MHz on the Siglent, which halves the estimated rise time the scope adds to fast edges.",
    "Channels: two on the Rigol, four on the Siglent.",
    "Capture rate: Siglent lists 100,000 wfm/s, or 400,000 in sequence mode; Rigol lists up to 30,000 wfm/s.",
    "Decoding: both include UART, I2C and SPI. Siglent adds CAN and LIN; Rigol adds parallel-bus decode.",
    "Memory: Rigol lists 24 Mpts on one channel and 12 Mpts on two; Siglent lists 14 Mpts interleaved and 7 Mpts per channel.",
    "Testing: the SDS1104X-E is owner-tested at OhmSavvy; the DS1202Z-E assessment comes from Rigol's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bandwidth against channels, in numbers</h2>
        <p className="text-muted leading-7 mb-4">
          Each scope doubles the other on one headline figure. The Rigol has twice the bandwidth; the Siglent has twice
          the channels and more than three times the capture rate. Memory goes to the Rigol on a single channel.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog input channels.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 4, display: "4", highlight: true },
                { label: "Rigol DS1202Z-E", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Waveform capture rate, normal mode. Siglent also lists 400,000 wfm/s in sequence mode.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1104X-E", value: 100_000, display: "100,000/s", highlight: true },
                { label: "Rigol DS1202Z-E", value: 30_000, display: "30,000/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Deepest memory on one channel.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 24, display: "24 Mpts", highlight: true },
                { label: "Siglent SDS1104X-E", value: 14, display: "14 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Bandwidth sets how fast an edge the scope can show. Using the common 0.35 ÷ bandwidth estimate, the Rigol
          adds roughly 1.75 ns of rise time and the Siglent roughly 3.5 ns. On a 10 MHz clock, whose period is 100 ns,
          both draw a clean square wave. On a 50 MHz clock, the third harmonic sits at 150 MHz, inside the Rigol&apos;s
          passband and outside the Siglent&apos;s, so the Siglent shows it closer to a sine wave. See{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors" className={link}>
            how to measure rise time with cursors
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When two channels run out</h2>
        <p className="text-muted leading-7 mb-4">
          A lot of bench work fits in two channels: input and output of an amplifier, a PWM signal and the current it
          drives, a trigger and its response. But serial buses and power stages often have more lines than that. An SPI
          transaction uses chip select, clock and two data lines, and the bug is often in how they line up.
        </p>
        <Figure
          caption={
            <>
              One SPI transfer. The DS1202Z-E can watch two of the four lines at once; the SDS1104X-E can watch all four,
              including the reply on MISO.
            </>
          }
        >
          <SpiChannelsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          With two channels you can still watch SPI: capture clock and MOSI, then
          move a probe to MISO and repeat the transfer. It works, but you lose the single picture of
          a whole exchange. For three-phase motor drives or a board with three supply rails, the same problem shows up:
          four channels let you see them start up together.
        </p>
        <KeyIdea title="Capture rate is the hidden spec">
          Between triggers a scope is blind while it processes the last capture. At 100,000 wfm/s the Siglent spends far
          less time blind than the Rigol at 30,000 wfm/s, so a glitch that happens once every few thousand cycles is more
          likely to land on screen. Siglent&apos;s 80,000-frame history adds a way to scroll back through past triggers
          and find the odd one out.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Pick by project</h2>
        <DataTable
          head={["Project", "Better fit", "Why"]}
          rows={[
            ["Checking a 25 MHz or 50 MHz MCU clock's edges", "Rigol DS1202Z-E", "200 MHz keeps the harmonics that shape the edges"],
            ["Debugging an SPI display or SD card", "Siglent SDS1104X-E", "All four bus lines in one capture"],
            ["Reading CAN traffic on a car or robot", "Siglent SDS1104X-E", "CAN and LIN decode included"],
            ["Capturing a long, slow event at high resolution", "Rigol DS1202Z-E", "24 Mpts on one channel"],
            ["Finding an intermittent glitch on a power rail", "Siglent SDS1104X-E", "100,000 wfm/s and history frames"],
            ["Amplifier input against output", "Either", "Two channels are enough"],
          ]}
        />
        <div className="mt-4">
          <Callout title="Bench scopes and mains">
            Both are mains-powered bench scopes whose probe ground clips connect to earth through the power cord. Clipping
            a ground lead to a live, non-isolated point, such as the primary side of an offline power supply, shorts it
            to earth and can destroy the probe or the circuit. Use an isolation transformer on the device under test or a
            differential probe, and never defeat the scope&apos;s earth connection.
          </Callout>
        </div>
        <p className="text-muted leading-7 mt-4">
          For neighbors, read{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" className={link}>
            Rigol DS1202Z-E vs Siglent SDS1202X-E
          </Link>{" "}
          for a two-channel 200 MHz pair,{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            Rigol DS1054Z vs Siglent SDS1104X-E
          </Link>{" "}
          for a four-channel pair, or the{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E review
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1202Z-E if speed is your bottleneck: 200 MHz and 24 Mpts on two channels suit fast clocks, edges and long single captures. Buy the Siglent SDS1104X-E if you need to see more than two signals at once or decode CAN and LIN: four channels, 100,000 wfm/s and free decoding cover more of a typical embedded or automotive bench, and it is the one we have tested hands-on.",
  chooseNeitherIf:
    "You need 200 MHz and four channels in one instrument. Neither scope offers both, so budget for a four-channel 200 MHz model, a clear step up in price from either.",
  faqs: [
    {
      question: "Is 200 MHz worth more than four channels?",
      answer:
        "Only if your signals are fast. If you work with clocks above about 20 to 30 MHz, or need to see sharp edges accurately, the Rigol's 200 MHz helps. For Arduino, Raspberry Pi, audio, power supplies and most serial buses, 100 MHz is ample, and the Siglent's extra two channels will get used far more often.",
    },
    {
      question: "Does the Rigol DS1202Z-E include serial decoding?",
      answer:
        "Yes. Rigol's DS1000Z-E datasheet lists RS232/UART, I2C and SPI triggering and parallel, RS232/UART, I2C and SPI decoding on two buses with no option code. The Siglent SDS1104X-E includes I2C, SPI, UART/RS232, CAN and LIN. If you need CAN or LIN, only the Siglent covers it out of the box.",
    },
    {
      question: "Which has more memory, the DS1202Z-E or SDS1104X-E?",
      answer:
        "The Rigol: 24 Mpts with one channel on and 12 Mpts with both on. The Siglent lists 14 Mpts interleaved and 7 Mpts per channel. More memory keeps the sample rate high over long time spans, which helps when you capture a slow event but still want to zoom into fast detail afterwards.",
    },
    {
      question: "Has OhmSavvy tested these scopes?",
      answer:
        "The Siglent SDS1104X-E is one of the products the site owner has bought and tested hands-on, which is why it carries our Hands-on Tested badge. The Rigol DS1202Z-E has not been tested by us; everything on this page about it comes from Rigol's datasheet and its official Amazon listing.",
    },
    {
      question: "Can either scope be upgraded later?",
      answer:
        "Siglent lists an optional 16-channel MSO add-on for the SDS1104X-E, which adds logic channels to its four analog ones. Neither maker lists a bandwidth upgrade for these models in the sources we used. The DS1202Z-E shares its platform with the 100 MHz DS1102Z-E, but that is a separate model, not an upgrade path.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Siglent SDS1104X-E review", href: "/oscilloscopes/siglent-sds1104x-e-review" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e" },
    { label: "FNIRSI 1014D vs Rigol DS1202Z-E", href: "/oscilloscopes/fnirsi-1014d-vs-rigol-ds1202z-e" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "50MHz vs 100MHz oscilloscope", href: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
  ],
};

export default function RigolDs1202zeVsSiglentSds1104xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
