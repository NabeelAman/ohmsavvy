import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1202Z-E: 200MHz, 2 channels, 1 GSa/s, 24 Mpts max memory, up to 30,000 wfm/s. Per the official Amazon
// listing title/bullets (B0H1J12LDJ, manufacturer RIGOL TECHNOLOGIES CO., LTD., checked 2026-10-24), matching this
// site's existing DS1202Z-E Pick.
// Siglent SDS1202X-E: 200MHz, 2 channels, 1 GSa/s (1 ch), 500 MSa/s (2 ch), 14 Mpts (1 ch), 100,000 wfm/s (400,000
// in sequence mode), 7" 800x480, standard I2C/SPI/UART/CAN/LIN trigger and decode. Per siglentna.com (checked
// 2026-10-24), matching this site's existing SDS1202X-E Pick.
// Rigol DS1202Z-E memory 24 Mpts (1 ch) / 12 Mpts (2 ch); RS232/UART, I2C and SPI triggers; decoding types parallel,
// RS232/UART, I2C, SPI on 2 buses, all in the spec table with no option code. Per Rigol's DS1000Z-E datasheet, linked
// from rigolna.com/products/digital-oscilloscopes/1000z/ (checked 2026-10-26). SDS1202X-E 7 Mpts per channel with
// both on, per this site's SDS1202X-E Pick.

const path = "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e";

const ds1202ze = picks.find((p) => p.name === "Rigol DS1202Z-E")!;
const sds1202xe = picks.find((p) => p.name === "Siglent SDS1202X-E")!;

export const metadata = buildMetadata({
  title: "DS1202Z-E vs SDS1202X-E: Which Is Better?",
  description:
    "Rigol DS1202Z-E vs Siglent SDS1202X-E: both 200 MHz two-channel scopes, but Siglent's faster capture rate and CAN/LIN decode against Rigol's deeper memory.",
  path: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e",
  image: sds1202xe.image,
});

const link = "text-accent hover:underline";

/** Illustrative dead-time timeline: 2 µs windows every ~33 µs (30,000 wfm/s) vs every 10 µs (100,000 wfm/s). */
function DeadTimeDiagram() {
  const W = 340;
  const L = 102;
  const pw = W - L - 10;
  const x = (us: number) => L + (us / 100) * pw;
  const win = 2;
  const glitch = 41;
  const rows = [
    { label: "Rigol, 30k wfm/s", y: 44, starts: [0, 100 / 3, 200 / 3], accent: false },
    { label: "Siglent, 100k wfm/s", y: 86, starts: Array.from({ length: 10 }, (_, i) => i * 10), accent: true },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} 150`}
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative 100 microsecond timeline. The Rigol DS1202Z-E captures a 2 microsecond window about every 33 microseconds, three windows in total; the Siglent SDS1202X-E captures one every 10 microseconds, ten windows. A glitch at about 41 microseconds falls inside a Siglent window but in the Rigol's dead time"
    >
      {rows.map((r) => (
        <g key={r.label}>
          <text x="4" y={r.y + 4} fontSize="9.5" className="fill-foreground">{r.label}</text>
          <rect x={x(0)} y={r.y - 8} width={pw} height="16" rx="2" className="fill-muted/15" />
          {r.starts.map((s) => (
            <rect key={s} x={x(s)} y={r.y - 8} width={x(s + win) - x(s)} height="16" className={r.accent ? "fill-accent" : "fill-foreground"} />
          ))}
        </g>
      ))}
      <line x1={x(glitch)} x2={x(glitch)} y1="22" y2="104" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" />
      <text x={x(glitch) + 4} y="20" fontSize="9" className="fill-accent">rare glitch</text>
      <text x={x(glitch) + 4} y="62" fontSize="8.5" className="fill-muted">missed: dead time</text>
      <text x={x(glitch) + 4} y="104" fontSize="8.5" className="fill-accent">caught</text>
      {[0, 25, 50, 75, 100].map((t, i) => (
        <text key={t} x={x(t)} y="122" fontSize="9" textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} className="fill-muted">
          {t} µs
        </text>
      ))}
      <text x="4" y="142" fontSize="8.5" className="fill-muted">Solid: capturing (2 µs, illustrative) · shaded: processing, blind</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1202Z-E vs Siglent SDS1202X-E: Which Is Better?",
  path,
  published: "2026-10-25",
  intro:
    "Both of these are 200 MHz, two-channel scopes at 1 GSa/s, which puts them head-to-head on headline bandwidth. The real differences show up underneath: Siglent documents a far faster waveform capture rate and adds CAN and LIN to its standard serial trigger and decode, while Rigol's datasheet gives deeper memory on one channel or two.",
  a: {
    pick: ds1202ze,
    imageAlt: "Rigol DS1202Z-E two-channel 200 MHz oscilloscope, front panel",
    chooseIf: [
      "You want the deepest documented single-channel memory for long captures",
      "You already know Rigol's DS1000Z menu system from another model",
      "Your captures are mostly single, longer events rather than rapid glitch-hunting",
      "You want the widest range of DS1000Z accessories and community guides",
    ],
  },
  b: {
    pick: sds1202xe,
    imageAlt: "Siglent SDS1202X-E two-channel 200 MHz oscilloscope, front panel",
    chooseIf: [
      "You need CAN or LIN trigger and decode, not just I2C, SPI and UART",
      "You're hunting infrequent or intermittent glitches that need a fast capture rate",
      "You want Siglent's well-regarded user interface",
      "You want the option to grow into a four-channel X-E model later with a familiar UI",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "200MHz", b: "200MHz" },
    { label: "Channels", a: "2", b: "2" },
    { label: "Sample rate, 1 channel", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Sample rate, 2 channels", a: "Not broken out in this Pick's sourcing", b: "500 MSa/s" },
    { label: "Memory depth", a: "24 Mpts (1 ch); 12 Mpts (2 ch)", b: "14 Mpts (1 ch); 7 Mpts per channel (2 ch)" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfm/s", b: "100,000 wfm/s (400,000 in sequence mode)" },
    { label: "Serial trigger", a: "RS232/UART, I2C, SPI", b: "I2C, SPI, UART, CAN, LIN (standard)" },
    { label: "Serial decode", a: "Parallel, RS232/UART, I2C, SPI (2 buses)", b: "I2C, SPI, UART, CAN, LIN (standard)" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Expandability", a: "Shares DS1000Z-E platform with the 100MHz DS1102Z-E", b: "MSO/AWG/Bode/Wi-Fi options on 4-channel X-E models only" },
  ],
  differences: [
    "Waveform capture rate: Siglent documents 100,000 wfm/s (400,000 in sequence mode) against Rigol's up to 30,000 wfm/s — more than a 3x difference, which matters for catching infrequent glitches.",
    "Serial decode: both decode UART, I2C and SPI out of the box. Siglent adds CAN and LIN trigger and decode; Rigol's datasheet adds parallel-bus decode instead.",
    "Memory depth: Rigol's datasheet gives 24 Mpts on one channel and 12 Mpts with both on, against Siglent's 14 Mpts and 7 Mpts per channel — an advantage for long single captures.",
    "Both are rated 200 MHz with 1 GSa/s single-channel sampling and a 7-inch 800 × 480 display.",
    "Siglent's four-channel X-E siblings add MSO, AWG, Bode plot and Wi-Fi options; those options don't extend to either two-channel model compared here.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With identical headline bandwidth and single-channel sample rate, the meaningful differences are capture
          rate, memory and serial decode — not the numbers that show up first on a spec sheet.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Waveform capture rate: Siglent&apos;s is more than 3x faster in normal mode.</>}>
            <BarChart
              items={[
                { label: "SDS1202X-E, sequence mode", value: 400_000, display: "400,000 wfm/s", highlight: true },
                { label: "SDS1202X-E, normal", value: 100_000, display: "100,000 wfm/s" },
                { label: "DS1202Z-E", value: 30_000, display: "30,000 wfm/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Documented memory depth: Rigol&apos;s datasheet figure is higher.</>}>
            <BarChart
              items={[
                { label: "DS1202Z-E", value: 24, display: "24 Mpts", highlight: true },
                { label: "SDS1202X-E", value: 14, display: "14 Mpts" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A faster capture rate means fewer &quot;dead time&quot; gaps between acquisitions, which raises the odds of
          actually seeing a rare glitch the first time it happens, rather than needing to get lucky on a later
          trigger. Deeper memory instead buys a longer single window at full sample rate for one capture. Which
          matters more depends on whether your problem is &quot;catch the rare event&quot; or &quot;see the whole event once
          triggered.&quot;
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Dead time: why capture rate decides who sees the glitch</h2>
        <p className="text-muted leading-7 mb-4">
          A digital scope doesn&apos;t watch continuously. It records a window, then spends time processing and drawing
          it before it can arm again, and anything that happens during that gap is simply never seen. The maximum
          capture rate tells you how short the whole cycle can get: 30,000 wfm/s works out to one acquisition every
          33 µs or so on the Rigol, and 100,000 wfm/s to one every 10 µs on the Siglent.
        </p>
        <Figure
          caption={
            <>
              Illustrative 100 µs timeline, assuming a 2 µs capture window and each scope at its maximum rated capture
              rate. The glitch at about 41 µs lands inside a Siglent window and in the Rigol&apos;s dead time. Real
              rates depend on timebase and settings.
            </>
          }
        >
          <DeadTimeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          With that assumed 2 µs window, the Rigol is live for about 2 ÷ 33 ≈ 6% of the time and the Siglent for
          about 2 ÷ 10 = 20%, so a glitch that comes and goes at random is roughly three times as likely to land in a
          Siglent capture on any given cycle. Sequence mode pushes the Siglent to 400,000 wfm/s by recording many
          short segments back to back and drawing them later. Neither number turns a scope into a gap-free recorder,
          which is why techniques such as{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            persistence
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults" className={link}>
            segmented memory
          </Link>{" "}
          matter as much as the headline rate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1202Z-E vs Siglent SDS1202X-E: which is better?</h2>
        <p className="text-muted leading-7 mb-4">
          With bandwidth tied, the decision comes down to what kind of signal problem you&apos;re usually chasing and
          whether serial decode matters to your work.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you work with CAN or LIN, or a wider mix of buses: the SDS1202X-E</h3>
        <p className="text-muted leading-7 mb-4">
          Both scopes trigger on and decode UART, I2C and SPI as standard, so a sensor or display project is covered
          either way. Siglent goes further with CAN and LIN trigger and decode, which matters if you work on vehicle
          modules, industrial controllers or anything else that talks over those buses. Rigol&apos;s extra is
          parallel-bus decode, handy for older parallel interfaces such as character LCDs.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you capture long single events: the DS1202Z-E</h3>
        <p className="text-muted leading-7 mb-4">
          Rigol&apos;s datasheet documents 24 Mpts on one channel against Siglent&apos;s 14 Mpts, and 12 Mpts against 7 Mpts per channel with both on. For a single long capture at full sample
          rate — say, an extended analog event rather than a burst of digital traffic — that extra memory lets you
          zoom into detail later without having to recapture at a slower timebase.
        </p>
        <KeyIdea title="Capture rate and memory solve different problems">
          A fast waveform capture rate helps you find a rare, unpredictable glitch faster, because the scope spends
          less time &quot;blind&quot; between triggers. Deep memory helps you examine a single known event in more detail
          once you&apos;ve triggered on it. If you don&apos;t yet know which one of these problems you&apos;ll run into more
          often, lean toward whichever feature — decode or capture rate — matches the kind of debugging you expect
          to do most.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Debugging CAN or LIN buses", "Siglent SDS1202X-E", "CAN and LIN trigger and decode are standard"],
            ["Debugging UART, I2C or SPI only", "Either", "Both list these as standard; decide on capture rate vs memory"],
            ["Hunting rare or intermittent glitches", "Siglent SDS1202X-E", "100,000-400,000 wfm/s capture rate"],
            ["Long single captures at full sample rate", "Rigol DS1202Z-E", "24 Mpts documented memory depth"],
            ["Already invested in Rigol's ecosystem", "Rigol DS1202Z-E", "Shares DS1000Z-E platform and accessories"],
            ["Want room to grow into 4-channel, MSO or AWG later", "Siglent SDS1202X-E", "Shares a platform with Siglent's upgraded X-E models"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the 100 MHz version of this Rigol instead? See{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both scopes, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Both are 200 MHz — bandwidth isn't the deciding factor here">
          Unlike most comparisons on this site, these two scopes tie on bandwidth. Don&apos;t let the headline number
          decide this one; look at capture rate and serial decode instead, since those are where they actually
          differ.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "Both the Rigol DS1202Z-E and Siglent SDS1202X-E are 200 MHz, two-channel, 1 GSa/s scopes, so bandwidth won't decide this one. Choose the Siglent if you need CAN or LIN decode or a fast capture rate for catching rare glitches; choose the Rigol if you want the deepest documented memory for long single captures or you're already in Rigol's ecosystem.",
  faqs: [
    {
      question: "Are the Rigol DS1202Z-E and Siglent SDS1202X-E the same bandwidth?",
      answer:
        "Yes — both are rated 200 MHz with a 1 GSa/s single-channel sample rate. The meaningful differences are waveform capture rate (Siglent is faster) and documented memory depth (Rigol is deeper), not bandwidth.",
    },
    {
      question: "Does the Rigol DS1202Z-E have serial decode?",
      answer:
        "Yes. Rigol's DS1000Z-E datasheet lists parallel, RS232/UART, I2C and SPI decoding on up to two buses, with RS232/UART, I2C and SPI triggers, and gives no option code for them. What it lacks next to the Siglent SDS1202X-E is CAN and LIN, so for vehicle or industrial bus work the Siglent is the better fit.",
    },
    {
      question: "Which has the faster waveform capture rate?",
      answer:
        "The Siglent SDS1202X-E, by a wide margin: up to 100,000 waveforms per second in normal mode and 400,000 in sequence mode, against the Rigol DS1202Z-E's documented 30,000 wfm/s.",
    },
    {
      question: "Can either of these grow into a four-channel scope later?",
      answer:
        "Not directly — both are fixed two-channel models. Siglent's four-channel X-E siblings add MSO, AWG, Bode plot and Wi-Fi options that aren't available on either two-channel model here, so growing into those features means a separate purchase either way.",
    },
    {
      question: "What is waveform capture rate and why does it matter?",
      answer:
        "It is how many acquisitions a scope can record and display per second. Between acquisitions the scope is blind, so a higher rate means less dead time and a better chance of catching a rare glitch. The Siglent SDS1202X-E is rated 100,000 wfm/s (400,000 in sequence mode) and the Rigol DS1202Z-E 30,000 wfm/s, both as maximums that vary with timebase.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
  ],
};

export default function RigolDs1202zEVsSiglentSds1202xEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
