import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea, ScopeScreen } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// DS1054Z memory/display/decoding per https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf (DSA20100-2020-09) and https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html (checked 2026-10-24).
// The two Rigol sources conflict on memory (datasheet: 24 Mpts standard; product page: 12 Mpts standard, 24 Mpts optional) and the product page calls bus decoding an option; the page says so.
// SDS1202X-E 8-bit resolution and four-channel-only MSO option per Siglent's SDS1000X-E data sheet, https://siglentna.com/download/22005/ (checked 2026-10-24).
const path = "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e";

export const metadata = buildMetadata({
  title: "DS1054Z vs SDS1202X-E: Channels or Bandwidth?",
  description:
    "Rigol DS1054Z vs Siglent SDS1202X-E: four channels at 50 MHz or two at 200 MHz. Sample rate, decoding, charts and which bench scope suits your projects.",
  path: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e",
});

const link = "text-accent hover:underline";

const moreComparisons: { label: string; href: string }[] = [
  { label: "Rigol DS1054Z vs Hantek DSO5102P for Arduino", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
  { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
  { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
  { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
  { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
  { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
  { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
  { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
  { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
  { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
  { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
  { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
  { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
  { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
  { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
  { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
  { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
  { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
  { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
  { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
  { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
  { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
  { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
  { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
  { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
  { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
  { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
];

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs Siglent SDS1202X-E",
  path,
  published: "2026-10-24",
  intro:
    "Rigol DS1054Z vs Siglent SDS1202X-E is the cleanest channels-or-bandwidth decision in the beginner bench market. The Rigol gives you four inputs at 50 MHz; the Siglent gives you two inputs at 200 MHz, four times the bandwidth, plus standard serial decoding and 100,000 waveforms per second against the Rigol's 30,000. Both peak at 1 GSa/s and both have a 7-inch screen, so the choice rests on how many signals you watch at once and how fast they are.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50 MHz digital oscilloscope, front panel",
    chooseIf: [
      "You routinely need three or four traces together, such as several supply rails during power-up",
      "Your signals sit comfortably below about 10 MHz: hobby microcontroller buses, audio, PWM and slow logic",
      "You want the pick in this pair that carries our Hands-on Tested badge",
      "You value a large community and plenty of documentation while you learn the menus",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Siglent SDS1202X-E")!,
    imageAlt: "Siglent SDS1202X-E two-channel 200 MHz digital oscilloscope, front panel",
    chooseIf: [
      "You look at fast edges, ringing or overshoot, for example in switching supplies or gate drives",
      "Two traces at a time are enough: input against output, or clock against data",
      "You want I2C, SPI, UART, CAN and LIN trigger and decode without buying options",
      "You hunt intermittent glitches and want a fast 100,000 wfm/s update rate",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "250 MSa/s per channel (3–4 channels)", b: "500 MSa/s per channel (2 channels)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Memory", a: "12 Mpts standard, 24 Mpts optional (Rigol sources differ)", b: "14 Mpts (1 ch); 7 Mpts (2 ch)" },
    { label: "Serial decoding", a: "Parallel, RS232/UART, I2C, SPI; listed as an option", b: "Standard: I2C, SPI, UART, CAN, LIN" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfm/s", b: "100,000 wfm/s (400,000 sequence)" },
    { label: "Vertical resolution", a: "8-bit", b: "8-bit" },
    { label: "OhmSavvy assessment", a: "Hands-on Tested badge", b: "Desk research from Siglent's specs" },
  ],
  differences: [
    "Bandwidth: 200 MHz on the SDS1202X-E against 50 MHz on the DS1054Z, a four-to-one gap.",
    "Channels: the DS1054Z has four analog inputs; the SDS1202X-E has two.",
    "Both peak at 1 GSa/s with one channel. With every channel on, the Rigol runs each at 250 MSa/s and the Siglent each at 500 MSa/s.",
    "Update rate: Siglent lists 100,000 wfm/s (400,000 in sequence mode) against Rigol's 30,000 wfm/s for the DS1054Z.",
    "Decoding: standard I2C, SPI, UART, CAN and LIN on the Siglent. Rigol's DS1000Z datasheet lists parallel, RS232/UART, I2C and SPI decoding (no CAN or LIN), and its product page describes bus trigger and decode as an option.",
    "Memory: Siglent lists 14 Mpts (7 Mpts per channel with both on). Rigol's sources differ on the DS1054Z: the product page says 12 Mpts standard with 24 Mpts optional, the 2020 datasheet 24 Mpts (6 Mpts per channel with three or four on).",
    "The SDS1202X-E can't take the MSO, AWG, Bode-plot or Wi-Fi options; Siglent reserves those for its four-channel X-E models.",
    "The DS1054Z carries our Hands-on Tested badge and the higher OhmSavvy rating (4.8 against 4.5); the SDS1202X-E is assessed from Siglent's published data.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two side by side and they pull in opposite directions. The Siglent wins every speed figure, the
          Rigol wins on inputs. These charts use only the bandwidth, sample-rate and channel figures from each
          maker&apos;s published specs.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated analog bandwidth (the −3 dB point). The SDS1202X-E has four times the DS1054Z&apos;s figure.</>}>
            <BarChart
              items={[
                { label: "Siglent SDS1202X-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog inputs. Siglent offers no logic-channel option on the two-channel model.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4 channels", highlight: true },
                { label: "Siglent SDS1202X-E", value: 2, display: "2 channels" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate per channel. Both reach 1 GSa/s on one channel; the Rigol drops to 250 MSa/s with three or four on, the Siglent to 500 MSa/s with both on.</>}>
            <BarChart
              items={[
                { label: "DS1054Z, 1 channel", value: 1000, display: "1 GSa/s" },
                { label: "DS1054Z, 3–4 channels", value: 250, display: "250 MSa/s" },
                { label: "SDS1202X-E, 1 channel", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "SDS1202X-E, 2 channels", value: 500, display: "500 MSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle of a sine wave at each scope&apos;s rated bandwidth, every channel on (sample rate ÷ bandwidth). Nyquist needs more than 2.</>}>
            <BarChart
              items={[
                { label: "DS1054Z (250 MSa/s at 50 MHz)", value: 5, display: "5 samples", highlight: true },
                { label: "SDS1202X-E (500 MSa/s at 200 MHz)", value: 2.5, display: "2.5 samples" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The last chart is the trade nobody prints on the box. Run the Siglent with both inputs on and look at a
          signal right at 200 MHz, and you get two and a half points per cycle, just over the theoretical minimum;
          scopes usually fill the gaps with sin(x)/x interpolation, which works for clean sine waves and less well for
          anything else. With one channel on it has five points per cycle. The Rigol, slower in absolute terms, never
          has fewer than five points per cycle at its own 50 MHz limit. In practice that means the Siglent&apos;s
          extra bandwidth is most trustworthy on a single channel or on signals well below 200 MHz. The explainers on{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>{" "}
          cover the theory behind these numbers.
        </p>
        <div className="mt-4">
          <DataTable
            head={["Derived from the specs", "Rigol DS1054Z", "Siglent SDS1202X-E"]}
            rows={[
              ["Comfortable signal ceiling (bandwidth ÷ 5 to ÷ 3)", "about 10–17 MHz", "about 40–67 MHz"],
              ["Approximate scope rise time (0.35 ÷ bandwidth)", "about 7 ns", "about 1.75 ns"],
              ["Inputs you can view at once", "4", "2"],
              ["Lowest per-channel sample rate with every input on", "250 MSa/s", "500 MSa/s"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Channels or bandwidth? Matching the scope to the signal</h2>
        <p className="text-muted leading-7 mb-4">
          Bandwidth is the frequency where a sine wave is displayed about 3 dB low, around 70% of its real height.
          The usual guidance is to buy three to five times the highest frequency you care about, and more for square
          waves, because a sharp edge is built from harmonics far above the repetition rate. That last point is what
          catches people out: a 5 MHz clock from a fast logic chip can have edges of a few nanoseconds, and those
          edges, not the 5 MHz, decide what you need.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where four inputs at 50 MHz win</h3>
        <p className="text-muted leading-7 mb-4">
          Plenty of real debugging is about timing between several slow signals rather than the detail of one fast
          one. Checking that a 3.3 V rail comes up before a 5 V rail and that a reset line releases after both is a
          three-trace job at millisecond speeds, which the DS1054Z handles easily and a two-input scope can only do in
          pieces. The same goes for watching an SPI clock, data and chip select together, comparing a motor driver&apos;s
          PWM inputs against its outputs, or lining up audio left, right and a reference. Every one of those signals
          sits well under the Rigol&apos;s comfortable ceiling of roughly 10 to 17 MHz, and with three or four inputs
          active it still samples each at 250 MSa/s. Our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            DS1054Z review
          </Link>{" "}
          covers its limits, including the menu learning curve.
        </p>
        <h3 className="text-lg font-semibold mb-2">Where two inputs at 200 MHz win</h3>
        <p className="text-muted leading-7 mb-4">
          Edges are where the SDS1202X-E earns its place. A scope&apos;s own rise time adds to the signal&apos;s
          roughly as the root of the sum of squares, so a 5 ns edge viewed on a 50 MHz scope (about 7 ns) shows up
          near 8.6 ns, while the 200 MHz Siglent (about 1.75 ns) shows it near 5.3 ns. Those are approximations, but
          the direction is reliable: on MOSFET gate drives, switch nodes, fast logic and clock ringing, the Siglent
          shows overshoot and ringing that the Rigol smooths away. Its standard I2C, SPI, UART, CAN and LIN decoding
          and its 100,000 wfm/s update rate (against the DS1054Z&apos;s 30,000) also suit two-wire bus work and glitch
          hunting, and 14 Mpts of memory on
          one channel lets it hold a long capture at speed. What it cannot do is show a third signal: there are no
          more inputs, and Siglent offers its 16-channel MSO option only on the four-channel X-E models.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A fast edge with ringing, as a wide-bandwidth scope can show it. Drawn for illustration, not captured.</>}>
            <ScopeScreen wave="square-ring" cycles={2} amplitude={2.5} labels={{ left: "200 MHz view" }} />
          </Figure>
          <Figure caption={<>The same edge through a narrower front end: the ringing is filtered out and the edge looks slower. Drawn for illustration.</>}>
            <ScopeScreen wave="square-under" cycles={2} amplitude={2.5} labels={{ left: "50 MHz view" }} />
          </Figure>
        </div>
        <div className="mt-4">
          <KeyIdea title="A quick way to decide">
            List the signals you expect to probe in the next year. If any of them need more than two traces at once,
            the extra inputs matter every session. If any have edges faster than about 10 ns, or frequencies above
            about 10 MHz, the extra bandwidth matters. If both are true, neither of these scopes covers everything,
            and a four-channel 100 MHz model such as the one in our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
              DS1054Z vs SDS1104X-E
            </Link>{" "}
            comparison is the compromise.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Switching supplies and mains">
            A bench scope plugged into an earthed outlet normally ties every probe ground clip to mains earth. On
            low-voltage, battery or USB-powered boards that is harmless, but on a mains-input switching supply the
            ground clip can short a live node through the scope. Use a differential probe or an isolation method rated
            for the job.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["If you mainly…", "Pick", "Reason from the specs"]}
          rows={[
            ["Sequence several power rails and resets", "Rigol DS1054Z", "Four inputs show every rail in one capture"],
            ["Probe gate drives and switch nodes", "Siglent SDS1202X-E", "200 MHz keeps edge ringing visible"],
            ["Decode I2C or UART on two wires", "Siglent SDS1202X-E", "Decoding is standard; Rigol's product page lists DS1054Z decoding as an option"],
            ["Watch SPI clock, data and chip select together", "Rigol DS1054Z", "Needs three inputs or more"],
            ["Learn electronics at school or at home", "Rigol DS1054Z", "Four inputs, wide documentation, Hands-on Tested badge"],
            ["Check clocks or oscillators above 10 MHz", "Siglent SDS1202X-E", "Comfortable to roughly 40–67 MHz"],
            ["Plan to add logic channels later", "Neither", "DS1054Z has no digital inputs (Rigol's logic probe is for DS1000Z Plus models); Siglent's MSO option is four-channel only"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The SDS1202X-E has no full OhmSavvy review yet; it is covered in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>
          . For the questions to ask before spending, see the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">More scope comparisons</h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {moreComparisons.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={link}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  ),
  bottomLine:
    "Buy the Rigol DS1054Z if you need to see three or four signals together and they stay below about 10 MHz; that describes most student and hobby benches, and it is the pick here with our Hands-on Tested badge. Buy the Siglent SDS1202X-E if your problems live in fast edges, ringing or two-wire buses, and you are certain two inputs will always be enough.",
  faqs: [
    {
      question: "Is the Siglent SDS1202X-E's 200 MHz worth giving up two channels?",
      answer:
        "Only if your signals are fast. By the 3 to 5 times rule the SDS1202X-E is comfortable up to roughly 40 to 67 MHz and the DS1054Z up to roughly 10 to 17 MHz. If you mostly watch microcontroller buses, audio or power rails at hobby speeds, four inputs will help you more often than the extra bandwidth.",
    },
    {
      question: "Does the Siglent SDS1202X-E decode I2C, SPI and UART?",
      answer:
        "Yes. Siglent lists I2C, SPI, UART, CAN and LIN trigger and decode as standard on the SDS1202X-E. With two analog inputs you can probe two lines at a time, which suits I2C's clock and data pair or a UART link better than a full SPI bus with a separate chip select.",
    },
    {
      question: "Why does the DS1054Z's sample rate drop with more channels on?",
      answer:
        "Rigol rates the DS1054Z at 1 GSa/s with one channel and 250 MSa/s per channel with three or four channels on, because the active inputs share the sampling capacity. At its 50 MHz limit, 250 MSa/s still gives five samples per cycle, comfortably above the Nyquist minimum of two.",
    },
    {
      question: "Which is better for switching power supply work?",
      answer:
        "The SDS1202X-E. Switching edges are far faster than the switching frequency suggests, and its 200 MHz bandwidth implies a scope rise time near 1.75 ns against about 7 ns for the DS1054Z, so ringing and overshoot are shown more faithfully. Two inputs cover a gate drive and a switch node; use a differential probe on mains-referenced circuits.",
    },
    {
      question: "Is either of these scopes hands-on tested by OhmSavvy?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge. Our assessment of the Siglent SDS1202X-E is desk research based on Siglent's published specifications, and it has no full OhmSavvy review yet, so read its verdict as a spec-sheet comparison rather than a bench result.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
  ],
};

export default function RigolDs1054zVsSiglentSds1202xePage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
