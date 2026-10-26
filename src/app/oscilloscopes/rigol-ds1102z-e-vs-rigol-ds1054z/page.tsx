import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E: 100MHz, 2 channels, 1 GSa/s (1 ch), 500 MSa/s (2 ch), 24 Mpts memory per Rigol's datasheet (the
// series page says 12M standard), 7-inch 800x480 display, up to 30,000 wfm/s, standard UART/I2C/SPI/parallel decode,
// no generator, no digital channels. Per rigolna.com and the DS1000Z-E datasheet (checked 2026-10-24), matching this
// site's existing DS1102Z-E Pick.
// Rigol DS1054Z: per the DS1000Z datasheet DSA20100-2020-09
// (https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf):
// 50MHz, 4 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch), 8-bit (12-bit high-res mode), 7-inch
// 800x480, up to 30,000 wfm/s, decode Parallel, RS232/UART, I2C, SPI, USB host/device + LAN, 100-240 V AC 50 W max,
// no generator, no digital channels. Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html says
// 12M standard / 24M optional memory and lists bus triggering/decoding as options; the datasheet lists 24 Mpts and
// decoding with no option label (research/verified-facts.md, checked 2026-10-24).
// Rise times below are the standard 0.35 / bandwidth approximation, labeled as such on the page.

const path = "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z";

const ds1102ze = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs DS1054Z: Which Fits Your Lab?",
  description:
    "Rigol DS1102Z-E vs DS1054Z: 100 MHz on two channels against 50 MHz on four, on the same DS1000Z platform. Sample-rate sharing, decoding and which to buy.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z",
  image: ds1102ze.image,
});

const link = "text-accent hover:underline";

type ShareRow = { label: string; segs: number; seg: string; perCycle: string };

const SHARE_ROWS: ShareRow[] = [
  { label: "DS1102Z-E, 1 ch on", segs: 1, seg: "1 GSa/s", perCycle: "10" },
  { label: "DS1102Z-E, 2 ch on", segs: 2, seg: "500M", perCycle: "5" },
  { label: "DS1054Z, 1 ch on", segs: 1, seg: "1 GSa/s", perCycle: "20" },
  { label: "DS1054Z, 2 ch on", segs: 2, seg: "500M", perCycle: "10" },
  { label: "DS1054Z, 3–4 ch on", segs: 4, seg: "250M", perCycle: "5" },
];

/** How the shared 1 GSa/s acquisition budget is divided as channels are switched on, per Rigol's datasheets. */
function SampleShareDiagram() {
  const barX = 120;
  const barW = 150;
  const rowH = 30;
  const top = 26;
  const H = top + rowH * SHARE_ROWS.length + 8;
  return (
    <svg
      viewBox={`0 0 340 ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: both Rigols share a 1 GSa/s sample budget across active channels. The DS1102Z-E gives 1 GSa/s to one channel or 500 MSa/s each to two; the DS1054Z gives 1 GSa/s, 500 MSa/s each to two, or 250 MSa/s each to three or four. With every channel on, both land at 5 samples per cycle at their rated bandwidth."
    >
      <text x="6" y="14" fontSize="9.5" className="fill-muted">
        Channels switched on
      </text>
      <text x={barX + barW / 2} y="14" fontSize="9.5" textAnchor="middle" className="fill-muted">
        Shared 1 GSa/s, per channel
      </text>
      <text x="306" y="14" fontSize="9.5" textAnchor="middle" className="fill-muted">
        Samples/cycle
      </text>
      {SHARE_ROWS.map((row, r) => {
        const y = top + rowH * r;
        const w = barW / row.segs;
        return (
          <g key={row.label}>
            <text x="6" y={y + 17} fontSize="10" className="fill-foreground">
              {row.label}
            </text>
            {Array.from({ length: row.segs }).map((_, i) => (
              <g key={i}>
                <rect
                  x={barX + w * i + 1}
                  y={y + 4}
                  width={w - 2}
                  height="20"
                  rx="3"
                  className={r < 2 ? "fill-accent/25 stroke-accent" : "fill-surface stroke-foreground"}
                  strokeWidth="1"
                />
                <text x={barX + w * i + w / 2} y={y + 17.5} fontSize="9" textAnchor="middle" className="fill-foreground">
                  {row.seg}
                </text>
              </g>
            ))}
            <text x="306" y={y + 18} fontSize="11" fontWeight="700" textAnchor="middle" className={row.perCycle === "5" ? "fill-accent" : "fill-foreground"}>
              {row.perCycle}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs DS1054Z: Which Fits Your Lab?",
  path,
  published: "2026-10-24",
  updated: "2026-10-26",
  intro:
    "Both scopes share Rigol's DS1000Z platform, a 7-inch 800 × 480 display, the same 1 GSa/s acquisition engine and up to 30,000 waveforms per second, so the DS1102Z-E vs DS1054Z choice comes down to one trade-off: two channels at 100 MHz, or four channels at 50 MHz. There's no single right answer. It depends on whether your bench work runs out of inputs or out of headroom first.",
  a: {
    pick: ds1102ze,
    imageAlt: "Rigol DS1102Z-E two-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You rarely need more than two channels at once",
      "Your signals run faster than 10 MHz and you want real headroom above them",
      "You mostly compare an input against an output, or a clock against data",
      "You want serial decoding that Rigol lists as standard on this model",
    ],
  },
  b: {
    pick: ds1054z,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel 50 MHz oscilloscope, front panel",
    chooseIf: [
      "You regularly need three or four channels at once, e.g. multi-rail power supplies",
      "Your signals are mostly below a few megahertz: audio, control logic, low-speed buses",
      "You want the most channels for the least money as a general bench scope",
      "You want the pick in this pairing that carries our Hands-on Tested badge",
    ],
  },
  extraSpecs: [
    { label: "Channels", a: "2", b: "4" },
    { label: "Bandwidth", a: "100MHz", b: "50MHz" },
    { label: "Sample rate, 1 channel", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Sample rate, 2 channels", a: "500 MSa/s", b: "500 MSa/s" },
    { label: "Sample rate, 3–4 channels", a: "n/a (2 channels)", b: "250 MSa/s" },
    { label: "Memory depth", a: "24 Mpts (datasheet); 12M standard (series page)", b: "24 Mpts (datasheet); 12M standard, 24M optional (product page)" },
    { label: "Vertical resolution", a: "8-bit (12-bit High Resolution mode)", b: "8-bit (12-bit high-res mode)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfm/s", b: "Up to 30,000 wfm/s" },
    { label: "Serial decode", a: "UART, I2C, SPI, parallel (standard)", b: "Parallel, UART/RS232, I2C, SPI (datasheet; product page says option)" },
    { label: "Built-in generator", a: "None", b: "None" },
    { label: "Hands-on tested by OhmSavvy", a: "No", b: "Yes" },
  ],
  differences: [
    "Channel count: the DS1054Z has four analog channels against the DS1102Z-E's two, the single biggest practical difference between them.",
    "Bandwidth: the DS1102Z-E is rated 100 MHz, double the DS1054Z's 50 MHz, so it keeps more amplitude accuracy and sharper edges on faster signals.",
    "Sample rate per channel is identical with one or two channels on (1 GSa/s, then 500 MSa/s each). Only the DS1054Z can switch on a third and fourth channel, which drops each to 250 MSa/s.",
    "Memory: Rigol's datasheets give 24 Mpts for both, while its web pages list 12M standard. The conflict is the same for both models, so memory doesn't separate them.",
    "Decoding: Rigol lists UART, I2C, SPI and parallel decoding as standard on the DS1102Z-E; for the DS1054Z the datasheet lists the same decoders but the product page calls bus decoding an option.",
    "Only the DS1054Z carries OhmSavvy's Hands-on Tested badge; the DS1102Z-E assessment is desk research against Rigol's published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The two scopes trade channel count for bandwidth almost exactly: the DS1102Z-E has half the channels of the
          DS1054Z and twice the bandwidth. Display, waveform capture rate, vertical resolution and the acquisition
          engine itself are the same family hardware, so they don&apos;t move the decision.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DS1102Z-E doubles the DS1054Z&apos;s rated bandwidth.</>}>
            <BarChart
              items={[
                { label: "DS1102Z-E", value: 100, display: "100 MHz", highlight: true },
                { label: "DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Channel count: the DS1054Z doubles the DS1102Z-E&apos;s channel count.</>}>
            <BarChart
              items={[
                { label: "DS1054Z", value: 4, display: "4", highlight: true },
                { label: "DS1102Z-E", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with every channel switched on, per Rigol&apos;s datasheets.</>}>
            <BarChart
              items={[
                { label: "DS1102Z-E, both channels", value: 500, display: "500 MSa/s", highlight: true },
                { label: "DS1054Z, all four channels", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
          <Figure
            caption={
              <>
                Approximate fastest edge each front end can show, from the common 0.35 ÷ bandwidth rule. An estimate, not
                a Rigol specification.
              </>
            }
          >
            <BarChart
              items={[
                { label: "DS1102Z-E", value: 3.5, display: "≈3.5 ns", highlight: true },
                { label: "DS1054Z", value: 7, display: "≈7 ns" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Read the rise-time chart as a floor: a scope can&apos;t draw an edge faster than its own front end responds. A
          74HC logic gate switching in a few nanoseconds will look noticeably softer on the DS1054Z than on the
          DS1102Z-E, while a 1 kHz PWM edge or a UART bit looks the same on both. For what the sample-rate number buys
          you on screen, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          ; for the bandwidth rule itself, see{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How the two Rigols share their sample rate</h2>
        <p className="text-muted leading-7 mb-4">
          Neither scope has a separate converter running at full speed for every input. Rigol quotes 1 GSa/s with one
          channel on, and that budget is divided as you switch more channels on: 500 MSa/s each for two, and on the
          DS1054Z, 250 MSa/s each for three or four. The diagram lines the two models up, with the right-hand column
          showing samples per cycle of a sine at each scope&apos;s rated bandwidth (sample rate ÷ bandwidth).
        </p>
        <Figure
          caption={
            <>
              The 1 GSa/s acquisition budget split across active channels. With everything on, both scopes take 5 samples
              per cycle at their own bandwidth limit: 500 MSa/s ÷ 100 MHz and 250 MSa/s ÷ 50 MHz.
            </>
          }
        >
          <SampleShareDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The neat result is that Rigol has balanced both models the same way. Fully loaded, each one samples five
          times per cycle at its own bandwidth limit, comfortably above the Nyquist minimum of two. The difference is
          where that limit sits. On the DS1102Z-E it sits at 100 MHz across both inputs; on the DS1054Z it sits at 50
          MHz across all four. So a fully loaded DS1054Z isn&apos;t starved for samples relative to its bandwidth, and a
          DS1102Z-E with both channels on doesn&apos;t lose its speed advantage. Each scope is internally consistent, and
          you are simply choosing which axis to spend the hardware on.
        </p>
        <p className="text-muted leading-7 mt-4">
          Memory works with the sample rate to set how long a capture lasts. Taking Rigol&apos;s 24 Mpts datasheet figure,
          a single channel at 1 GSa/s fills it in 24 ms, long enough to hold a complete burst of serial traffic and still
          zoom into individual bits. If your unit is configured with the 12M standard depth the web pages mention, that
          window halves to 12 ms at the same rate. Either way, both models behave the same here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs DS1054Z: which fits your lab?</h2>
        <p className="text-muted leading-7 mb-4">
          Picking between them starts with one question: how many signals do you actually need to see at once, and how
          fast do they move?
        </p>
        <h3 className="text-lg font-semibold mb-2">If you mostly compare two signals: the DS1102Z-E</h3>
        <p className="text-muted leading-7 mb-4">
          A lot of bench work is fundamentally a two-signal comparison: an input against an output, a clock against a
          data line, a trigger against a response. For that kind of work the DS1102Z-E&apos;s extra bandwidth matters more
          than a third or fourth channel would. By the usual 3–5x rule, 100 MHz is comfortable on signals up to roughly
          20–33 MHz, which takes in fast SPI clocks, 25 MHz Ethernet reference oscillators and the switching edges of
          most hobby buck converters. The DS1054Z&apos;s comfortable range ends around 10–17 MHz, and edges in that zone
          start to look rounder than they really are.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need more inputs at once: the DS1054Z</h3>
        <p className="text-muted leading-7 mb-4">
          Multi-rail power supplies, SPI buses with chip select, clock, MOSI and MISO, or any project where you want to
          watch three or four points simultaneously make the DS1054Z the more useful tool day to day, even at half the
          bandwidth. Power-up sequencing is the clearest case: a board with 5 V, 3.3 V, 1.8 V and a reset line needs four
          traces on one trigger to show whether the rails come up in the right order, and a two-channel scope can only
          show that in pairs across several captures. Running out of channels mid-debug, and having to disconnect one
          probe to connect another, is its own kind of friction that extra bandwidth doesn&apos;t fix.
        </p>
        <KeyIdea title="Bandwidth and channel count rarely trade off evenly">
          It&apos;s tempting to treat &quot;100 MHz × 2 channels&quot; and &quot;50 MHz × 4 channels&quot; as roughly equivalent,
          but they serve different failure modes. A fast, two-signal timing problem is easier on the DS1102Z-E; a
          multi-point, slower-signal layout problem is easier on the DS1054Z. Match the choice to the kind of problem you
          hit most, not to a spec-sheet trade that looks even on paper. Our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          walks through how to weigh the two.
        </KeyIdea>
        <h3 className="text-lg font-semibold mt-6 mb-2">Serial decoding: check the listing for the DS1054Z</h3>
        <p className="text-muted leading-7 mb-4">
          Both scopes can turn a UART, I2C or SPI waveform into readable bytes, which saves counting bits by eye. On the
          DS1102Z-E, Rigol lists that decoding as standard. On the DS1054Z, Rigol&apos;s own documents disagree: the
          datasheet lists parallel, UART/RS232, I2C and SPI decoding without an option label, while the product page
          describes bus triggering and decoding as options. If decoding matters to you, confirm what the unit you are
          buying includes. Remember too that the two-channel DS1102Z-E can only decode a bus whose lines fit on two
          inputs: I2C (clock and data) fits, but full four-wire SPI does not.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Two-signal comparisons: input/output, clock/data", "Rigol DS1102Z-E", "100 MHz headroom on the signals you're actually watching"],
            ["Multi-rail power supplies or 3–4 point debugging", "Rigol DS1054Z", "Four channels on one trigger beat two, regardless of bandwidth"],
            ["Signals mostly under a few megahertz", "Rigol DS1054Z", "50 MHz is plenty of headroom at that range, with more channels"],
            ["Signals in the tens of megahertz", "Rigol DS1102Z-E", "Comfortable to roughly 20–33 MHz against roughly 10–17 MHz"],
            ["Four-wire SPI with chip select", "Rigol DS1054Z", "All four lines in one capture"],
            ["I2C or UART decoding out of the box", "Rigol DS1102Z-E", "Rigol lists decoding as standard on this model"],
            ["Want the most proven, widely documented pick", "Rigol DS1054Z", "OhmSavvy's Hands-on Tested pick, years of community support"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see where a Siglent fits against either? The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            DS1054Z vs Siglent SDS1104X-E
          </Link>{" "}
          page compares the four-channel pick against a four-channel Siglent, and{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" className={link}>
            DS1102Z-E vs Siglent SDS1102CML+
          </Link>{" "}
          covers the two-channel DS1000Z-E against a budget Siglent. The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both scopes, and our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          covers the four-channel model in depth.
        </p>
        <Callout title="Mains-powered scopes and ground clips">
          Both are mains-powered bench scopes whose probe ground clips connect to mains earth through the power cord.
          Clipping a ground lead to a live or non-earthed point, such as the primary side of an offline power supply,
          creates a short through the scope and its probe. Keep to low-voltage circuits, and use a differential probe or
          ask an experienced technician before measuring anything mains-referenced.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Rigol DS1102Z-E if your bench work is mostly two-signal comparisons at higher speed: it doubles the bandwidth, keeps 500 MSa/s on both channels and lists serial decoding as standard. Choose the Rigol DS1054Z if you regularly need three or four channels at once and your signals run at a few megahertz or below. Both share the same DS1000Z-family display, capture rate and controls, so the skills carry over either way.",
  faqs: [
    {
      question: "Is the Rigol DS1102Z-E strictly better than the DS1054Z?",
      answer:
        "No. It trades two channels for double the bandwidth. The rest of the platform is shared: the same 7-inch 800 × 480 screen, 1 GSa/s peak sample rate and up to 30,000 waveforms per second. The DS1054Z's four channels are more useful for multi-point debugging, while the DS1102Z-E's 100 MHz suits faster, fewer-channel comparisons.",
    },
    {
      question: "Can I add more channels to the DS1102Z-E later?",
      answer:
        "No, the DS1102Z-E is a fixed two-channel scope, and Rigol lists no digital channels for it. If you expect to need three or four channels at any point, the DS1054Z, or a four-channel model with more bandwidth such as the Rigol DHO814, is the safer starting point.",
    },
    {
      question: "Which one has OhmSavvy actually tested?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge: it has been bought and used in-house. The DS1102Z-E hasn't been tested hands-on yet, so its rating and everything said about it on this page come from Rigol's published specifications.",
    },
    {
      question: "Does the DS1054Z lose sample rate with all four channels on?",
      answer:
        "Yes. Rigol's datasheet gives 1 GSa/s with one channel, 500 MSa/s each with two, and 250 MSa/s each with three or four. That still works out to five samples per cycle at its 50 MHz bandwidth limit, the same ratio the DS1102Z-E reaches with both of its channels on.",
    },
    {
      question: "Is 100 MHz worth it over 50 MHz for a hobbyist?",
      answer:
        "Only if your signals reach the tens of megahertz. Arduino PWM, UART, I2C and most audio work sit far below 10 MHz, where 50 MHz is plenty. Fast SPI, crystal oscillators above about 10 MHz and sharp logic edges benefit from 100 MHz, since the approximate rise-time floor falls from about 7 ns to 3.5 ns.",
    },
    {
      question: "Which has more memory, the DS1102Z-E or the DS1054Z?",
      answer:
        "On paper they match. Rigol's datasheets list 24 Mpts for both families, while its web pages say 12 Mpts standard, with 24 Mpts optional on the DS1054Z. The conflict affects both models equally, so check the listing for the unit you buy rather than choosing between them on memory.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
  ],
};

export default function RigolDs1102zEVsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
