import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Siglent SDS1104X-U: 100MHz, 4 channels, 1 GSa/s, up to 14 Mpts, 100,000 wfm/s (400,000 sequence mode), 7"
// 800x480, standard I2C/SPI/UART/CAN/LIN decode. Per siglentna.com/digital-oscilloscopes/sds1000x-u (checked
// 2026-10-25), matching this site's SDS1104X-U Pick.
// Rigol DS1104Z-S Plus: 100MHz, 4 channels, 1 GSa/s (1 ch)/250 MSa/s (4 ch), 8-bit, built-in 2-channel 25MHz/200
// MSa/s/14-bit generator, 7" 800x480, up to 30,000 wfm/s, memory/decode details conflict between Rigol's own
// sources. Matching this site's existing DS1104Z-S Plus Pick.

const path = "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus";

const sds1104xu = picks.find((p) => p.name === "Siglent SDS1104X-U")!;
const ds1104zsPlus = picks.find((p) => p.name === "Rigol DS1104Z-S Plus")!;

export const metadata = buildMetadata({
  title: "SDS1104X-U vs DS1104Z-S Plus: Differences",
  description:
    "Siglent SDS1104X-U vs Rigol DS1104Z-S Plus: a faster, better-documented capture rate against a built-in two-channel signal generator.",
  path: "/oscilloscopes/siglent-sds1104x-u-vs-rigol-ds1104z-s-plus",
  image: sds1104xu.image,
});

const link = "text-accent hover:underline";

/**
 * Acquisition windows versus dead time (not to scale): a faster capture rate leaves shorter gaps, so a rare
 * glitch is more likely to land inside a capture.
 */
function DeadTimeDiagram() {
  const fast = Array.from({ length: 13 }, (_, i) => 20 + 24 * i);
  const slow = Array.from({ length: 7 }, (_, i) => 20 + 48 * i);
  const glitchX = 147;
  return (
    <svg
      viewBox="0 0 340 168"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative timeline: the SDS1104X-U captures waveforms with short dead-time gaps between them and catches a brief glitch, while the DS1104Z-S Plus leaves longer gaps and the same glitch falls into dead time and is missed"
    >
      <text x="20" y="18" fontSize="9.5" className="fill-accent">SDS1104X-U: up to 100,000 captures per second</text>
      {fast.map((x) => (
        <rect key={x} x={x} y="26" width="14" height="22" rx="2" className="fill-accent" />
      ))}
      <line x1="20" y1="48" x2="320" y2="48" className="stroke-border" strokeWidth="1" />
      <text x="20" y="80" fontSize="9.5" className="fill-foreground">DS1104Z-S Plus: up to 30,000 captures per second</text>
      {slow.map((x) => (
        <rect key={x} x={x} y="88" width="14" height="22" rx="2" className="fill-muted" />
      ))}
      <line x1="20" y1="110" x2="320" y2="110" className="stroke-border" strokeWidth="1" />
      <line x1={glitchX} y1="22" x2={glitchX} y2="118" stroke="#e5484d" strokeWidth="2" strokeDasharray="3 2" />
      <text x={glitchX + 6} y="60" fontSize="8.5" fill="#e5484d">caught</text>
      <text x={glitchX + 6} y="122" fontSize="8.5" fill="#e5484d">missed: fell in dead time</text>
      <rect x="20" y="138" width="10" height="10" rx="2" className="fill-accent" />
      <text x="35" y="147" fontSize="8.5" className="fill-muted">capture window</text>
      <rect x="120" y="138" width="10" height="10" rx="2" className="fill-none stroke-border" />
      <text x="135" y="147" fontSize="8.5" className="fill-muted">gap = dead time</text>
      <line x1="230" y1="138" x2="230" y2="150" stroke="#e5484d" strokeWidth="2" strokeDasharray="3 2" />
      <text x="236" y="147" fontSize="8.5" className="fill-muted">one-off glitch</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Siglent SDS1104X-U vs Rigol DS1104Z-S Plus: Key Differences",
  path,
  published: "2026-10-25",
  intro:
    "Both are four-channel, 100 MHz scopes with 1 GSa/s single-channel sampling, but they diverge sharply in what else they offer: the SDS1104X-U documents a fast, clear waveform capture rate and standard serial decode, while the DS1104Z-S Plus bundles a genuinely useful two-channel signal generator — at the cost of some conflicting documentation from Rigol itself.",
  a: {
    pick: sds1104xu,
    imageAlt: "Siglent SDS1104X-U four-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You want confirmed standard serial trigger/decode",
      "You're chasing intermittent faults and want a fast, clearly documented capture rate",
      "You don't need a built-in signal generator",
      "You want cleaner, less conflicting spec documentation",
    ],
  },
  b: {
    pick: ds1104zsPlus,
    imageAlt: "Rigol DS1104Z-S Plus four-channel 100 MHz oscilloscope with built-in signal generator, front panel",
    chooseIf: [
      "You want a built-in two-channel 25 MHz generator in the same box",
      "You want the option to add a 16-channel logic analyzer later (RPL1116 kit)",
      "You're testing circuits that need two independent test signals",
      "You're comfortable verifying some specs yourself given Rigol's internal documentation conflicts",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "100MHz", b: "100MHz" },
    { label: "Channels", a: "4", b: "4" },
    { label: "Sample rate, 1 channel", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Sample rate, 4 channels", a: "Not stated in this Pick's sourcing", b: "250 MSa/s" },
    { label: "Memory depth", a: "Up to 14 Mpts", b: "24 Mpts or 12 Mpts (Rigol's sources conflict)" },
    { label: "Waveform capture rate", a: "100,000 wfm/s (400,000 sequence mode)", b: "Up to 30,000 wfm/s" },
    { label: "Built-in signal generator", a: "None", b: "2-channel, 25MHz, 200 MSa/s, 14-bit" },
    { label: "Serial decode", a: "I2C, SPI, UART, CAN, LIN (standard)", b: "Listed as optional on Rigol's series page" },
    { label: "Logic analyzer option", a: "Not applicable", b: "16-channel with separate RPL1116 kit" },
  ],
  differences: [
    "Signal generator: the DS1104Z-S Plus has a built-in two-channel 25 MHz generator; the SDS1104X-U has none.",
    "Capture rate: the SDS1104X-U documents 100,000-400,000 wfm/s against the DS1104Z-S Plus's up to 30,000 wfm/s.",
    "Serial decode: confirmed standard on the SDS1104X-U; Rigol's own series page lists it as optional for the DS1104Z-S Plus.",
    "Documentation quality: Rigol's own sources disagree on the DS1104Z-S Plus's memory depth (24 Mpts vs 12 Mpts standard); Siglent's SDS1104X-U sourcing doesn't carry the same conflict.",
    "Logic analysis: only the DS1104Z-S Plus can be upgraded to 16 logic channels, with a separately sold RPL1116 kit.",
    "Both share 100 MHz bandwidth, 4 channels, 1 GSa/s single-channel sampling and an 8-bit-class scope core.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          With bandwidth and channel count tied, this comparison comes down to capture rate and documentation
          clarity on one side, against a built-in generator on the other.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Waveform capture rate: the SDS1104X-U is documented more than 3x faster.</>}>
            <BarChart
              items={[
                { label: "SDS1104X-U, sequence", value: 400_000, display: "400,000 wfm/s", highlight: true },
                { label: "SDS1104X-U, normal", value: 100_000, display: "100,000 wfm/s" },
                { label: "DS1104Z-S Plus", value: 30_000, display: "30,000 wfm/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Built-in generator output: only the DS1104Z-S Plus has one.</>}>
            <BarChart
              items={[
                { label: "DS1104Z-S Plus", value: 25, display: "25 MHz", highlight: true },
                { label: "SDS1104X-U", value: 0, display: "None" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A built-in dual-channel generator is a meaningful capability the SDS1104X-U simply doesn&apos;t have —
          there&apos;s no substitute for it if your work needs to drive two independent test signals. But the
          SDS1104X-U&apos;s faster, clearly documented capture rate and standard serial decode are real advantages of
          their own, especially for digital-bus debugging.
        </p>
        <div className="mt-6">
          <Figure caption={<>Illustrative, not to scale: capture windows and the dead time between them. Fewer captures per second means longer blind gaps.</>}>
            <DeadTimeDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Why does a capture-rate number matter? After each acquisition a digital scope spends time processing and
          drawing before it can trigger again, and anything that happens during that gap never reaches the screen. A
          glitch that appears once every few seconds can sit in a gap many times before it finally lands inside a
          window. With up to 100,000 waveforms per second the Siglent re-arms more than three times as often as the
          Rigol&apos;s 30,000, so on the same time-base setting the blind gaps are shorter and an intermittent fault
          tends to show up sooner. The exact share of time each scope sees depends on the time base and the features
          switched on, so treat the published figures as maxima rather than everyday numbers.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Siglent SDS1104X-U vs Rigol DS1104Z-S Plus: key differences</h2>
        <p className="text-muted leading-7 mb-4">
          These two serve overlapping but distinct needs despite matching on bandwidth and channel count.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need to drive two test signals: the DS1104Z-S Plus</h3>
        <p className="text-muted leading-7 mb-4">
          Testing a circuit with two independent inputs — a differential pair, a mixer, a dual-channel filter — is
          far easier with two built-in generator channels than with a separate instrument or none at all. The
          optional logic-analyzer upgrade path is a bonus if your needs grow later.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you want clean documentation and fast capture: the SDS1104X-U</h3>
        <p className="text-muted leading-7 mb-4">
          Standard serial decode and a capture rate more than 3x faster make the SDS1104X-U the stronger choice for
          digital-bus debugging and intermittent-fault hunting, without the internal documentation conflicts that
          surround some of the DS1104Z-S Plus&apos;s specs.
        </p>
        <KeyIdea title="Check Rigol's current documentation before relying on a spec">
          Rigol&apos;s own datasheet and series page disagree on the DS1104Z-S Plus&apos;s standard memory depth, and the
          series page lists serial decoding as an option rather than standard. If either of these matters to your
          purchase decision, verify directly against Rigol&apos;s current documentation rather than assuming either
          figure.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Need to drive two independent test signals", "Rigol DS1104Z-S Plus", "Built-in 2-channel 25 MHz generator"],
            ["Digital-bus debugging with serial decode", "Siglent SDS1104X-U", "Standard I2C/SPI/UART/CAN/LIN confirmed"],
            ["Hunting intermittent or rare glitches", "Siglent SDS1104X-U", "100,000-400,000 wfm/s vs. 30,000"],
            ["Want room to add a logic analyzer later", "Rigol DS1104Z-S Plus", "RPL1116 kit upgrade path"],
            ["Want cleaner, less conflicting documentation", "Siglent SDS1104X-U", "No internal spec disagreements in this Pick's sourcing"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see two of Rigol&apos;s other Z-series scopes side by side? See{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Neither carries our Hands-on Tested badge">
          Both of these Picks are rated on published specifications rather than in-house testing. If owner-verified,
          hands-on results matter to you, check current ratings on the roundup page before buying.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Siglent SDS1104X-U and Rigol DS1104Z-S Plus tie on bandwidth and channel count but diverge sharply elsewhere: the DS1104Z-S Plus's built-in two-channel generator is a real capability the SDS1104X-U lacks, while the SDS1104X-U counters with a far faster documented capture rate, confirmed standard serial decode, and cleaner documentation overall.",
  faqs: [
    {
      question: "Does the Siglent SDS1104X-U have a built-in signal generator?",
      answer:
        "No — this site's sourcing lists no built-in generator for the SDS1104X-U. For a built-in generator in this bandwidth/channel class, the Rigol DS1104Z-S Plus (two channels, 25 MHz) is the better fit.",
    },
    {
      question: "Why does Rigol's documentation conflict on the DS1104Z-S Plus?",
      answer:
        "Rigol's own datasheet states 24 Mpts of standard memory, while its series page lists 12 Mpts standard with 24 Mpts as an option. The series page also lists serial decoding as optional rather than standard. Verify current documentation directly if these specifics matter to your purchase.",
    },
    {
      question: "Which has the faster waveform capture rate?",
      answer:
        "The Siglent SDS1104X-U, by a wide margin: up to 100,000 wfm/s in normal mode and 400,000 in sequence mode, against the Rigol DS1104Z-S Plus's documented 30,000 wfm/s.",
    },
    {
      question: "Can the DS1104Z-S Plus be upgraded with a logic analyzer?",
      answer:
        "Yes — Rigol offers the separately sold RPL1116 kit to add 16 logic channels. The SDS1104X-U has no equivalent logic-analyzer upgrade path in this site's sourcing.",
    },
    {
      question: "What does waveform capture rate mean on an oscilloscope?",
      answer:
        "It's how many separate acquisitions the scope can trigger, process and display each second. Between acquisitions there is dead time in which the scope is blind. A higher rate, such as the SDS1104X-U's 100,000 wfm/s against 30,000 on the DS1104Z-S Plus, shortens those blind gaps, which raises the odds of catching a rare glitch or runt pulse.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Rigol DHO924S vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho924s-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
  ],
};

export default function SiglentSds1104xUVsRigolDs1104zSPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
