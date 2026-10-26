import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DSO-510: 10MHz, 1 channel, 48 MS/s, 2.8" 320x240, ±400V (10X probe) input, built-in DDS generator
// (0-50kHz, 13 waveforms, 0.1-3.0V), 1000mAh battery (~4hrs), USB-C. Per fnirsi.com/products/dso-510 and the
// official Amazon listing (B0DKK5VB79), matching this site's existing DSO-510 Pick (checked 2026-10-24). Naming
// caution carried over from that Pick: the listing's own "How to Choose?" graphic names this column "DSO-153".
// FNIRSI DSO152: 200kHz, 1 channel, 2.5 MSa/s. Matching this site's existing DSO152 Pick (checked prior session).

const path = "/oscilloscopes/fnirsi-dso-510-vs-fnirsi-dso152";

const dso510 = picks.find((p) => p.name === "FNIRSI DSO-510")!;
const dso152 = picks.find((p) => p.name === "FNIRSI DSO152")!;

export const metadata = buildMetadata({
  title: "FNIRSI DSO-510 vs DSO152: Pocket Scopes Compared",
  description:
    "FNIRSI DSO-510 vs DSO152: both single-channel pocket oscilloscopes, but the DSO-510's 10 MHz and built-in generator against the DSO152's rock-bottom price.",
  path: "/oscilloscopes/fnirsi-dso-510-vs-fnirsi-dso152",
  image: dso510.image,
});

const link = "text-accent hover:underline";

/** Log-frequency map: each scope's rated bandwidth, the rule-of-thumb accurate zone, and the DSO-510's generator span. */
function PocketRangeDiagram() {
  const W = 340;
  const L = 78;
  const pw = W - L - 14;
  const x = (f: number) => L + ((Math.log10(f) - 3) / 5) * pw;
  const ticks = [
    { f: 1e3, t: "1 kHz" },
    { f: 1e4, t: "10 kHz" },
    { f: 1e5, t: "100 kHz" },
    { f: 1e6, t: "1 MHz" },
    { f: 1e7, t: "10 MHz" },
    { f: 1e8, t: "100 MHz" },
  ];
  const rows = [
    { label: "DSO152 input", y: 50, accurate: 200_000 / 5, rated: 200_000, note: "200 kHz" },
    { label: "DSO-510 input", y: 86, accurate: 10_000_000 / 5, rated: 10_000_000, note: "10 MHz" },
  ];
  return (
    <svg
      viewBox={`0 0 ${W} 176`}
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale frequency map from 1 kHz to 100 MHz: the DSO152's input is rated to 200 kHz and reads accurately to roughly 40 kHz, the DSO-510's input is rated to 10 MHz and reads accurately to roughly 2 MHz, and the DSO-510's generator covers up to 50 kHz"
    >
      <rect x={x(1e3)} y="26" width={x(2e4) - x(1e3)} height="118" className="fill-accent/10" />
      <text x={x(1e3) + 3} y="20" fontSize="9" className="fill-muted">audio band (to 20 kHz)</text>
      {ticks.map((t, i) => (
        <g key={t.f}>
          <line x1={x(t.f)} x2={x(t.f)} y1="26" y2="144" className="stroke-border" strokeWidth="0.6" strokeDasharray="2 3" />
          <text x={x(t.f)} y="158" fontSize="8.5" textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"} className="fill-muted">
            {t.t}
          </text>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.label}>
          <text x="4" y={r.y + 4} fontSize="10" className="fill-foreground">{r.label}</text>
          <rect x={x(1e3)} y={r.y - 6} width={x(r.accurate) - x(1e3)} height="12" rx="2" className="fill-accent" />
          <rect x={x(r.accurate)} y={r.y - 6} width={x(r.rated) - x(r.accurate)} height="12" rx="2" className="fill-accent/30" />
          <text x={x(r.rated) + 4} y={r.y + 4} fontSize="9.5" className="fill-foreground">{r.note}</text>
        </g>
      ))}
      <text x="4" y="126" fontSize="10" className="fill-foreground">DSO-510 gen.</text>
      <rect x={x(1e3)} y="116" width={x(5e4) - x(1e3)} height="12" rx="2" className="fill-muted/60" />
      <text x={x(5e4) + 4} y="126" fontSize="9.5" className="fill-foreground">50 kHz</text>
      <text x="4" y="172" fontSize="8.5" className="fill-muted">Dark: about 1/5 of rated bandwidth (rule of thumb) · pale: up to the rated figure</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DSO-510 vs DSO152: Portable Oscilloscopes Compared",
  path,
  published: "2026-10-25",
  intro:
    "Both of these are single-channel, pocket-sized FNIRSI scopes aimed at quick diagnostics rather than bench work. The DSO-510 is the more capable of the two — 50 times the bandwidth and a built-in signal generator — while the DSO152 undercuts it on price for the most basic checks.",
  a: {
    pick: dso510,
    imageAlt: "FNIRSI DSO-510 single-channel pocket oscilloscope with signal generator, front view",
    chooseIf: [
      "You want to check signals well above basic audio range",
      "You want a built-in signal generator in the same pocket device",
      "You're doing automotive or general electronics diagnostics, not just toy projects",
      "You want USB-C charging and a lithium battery rated for about 4 hours",
    ],
  },
  b: {
    pick: dso152,
    imageAlt: "FNIRSI DSO152 single-channel pocket oscilloscope, front view",
    chooseIf: [
      "Your signals are strictly low-frequency: audio, basic control logic",
      "Price is the only thing that matters for an occasional-use tool",
      "You want the smallest possible footprint and don't need a generator",
      "You're learning basic waveform concepts for the first time, not diagnosing a specific fault",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "10MHz", b: "200kHz" },
    { label: "Channels", a: "1", b: "1" },
    { label: "Sample rate", a: "48 MS/s", b: "2.5 MSa/s" },
    { label: "Display", a: "2.8-inch, 320 × 240", b: "Not stated at the same detail in this Pick's sourcing" },
    { label: "Built-in signal generator", a: "0-50kHz DDS, 13 waveforms", b: "None" },
    { label: "Input range", a: "±400V with included 10X probe", b: "Not stated in this Pick's sourcing" },
    { label: "Power", a: "1000mAh battery (~4 hrs), USB-C", b: "Not stated in this Pick's sourcing" },
    { label: "Model-name caution", a: "Listing's own graphic disputes \"DSO-510\" vs \"DSO-153\"", b: "None noted" },
  ],
  differences: [
    "Bandwidth: the DSO-510 is rated 10 MHz, 50 times the DSO152's 200 kHz — a large practical gap, not a marginal one.",
    "Sample rate: 48 MS/s on the DSO-510 against 2.5 MSa/s on the DSO152, keeping pace with the bandwidth difference.",
    "Signal generator: only the DSO-510 has one built in (0-50 kHz DDS, 13 waveforms); the DSO152 has none.",
    "Documentation: this Pick's DSO-510 sourcing (FNIRSI's own product page) is considerably more detailed than what's available for the DSO152, which is documented mainly through its own listing.",
    "Naming: the DSO-510's own listing carries an internal naming inconsistency (a marketing graphic calls it \"DSO-153\"); the DSO152 has no equivalent caution.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          These aren&apos;t close on the numbers that matter most for a pocket scope: bandwidth and sample rate.
          The DSO-510 isn&apos;t a modest step up from the DSO152 — it&apos;s a different class of tool entirely.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth, log scale: the DSO-510 is rated 50x higher than the DSO152.</>}>
            <BarChart
              log
              items={[
                { label: "DSO-510", value: 10_000_000, display: "10 MHz", highlight: true },
                { label: "DSO152", value: 200_000, display: "200 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate, log scale: the DSO-510 samples roughly 19x faster.</>}>
            <BarChart
              log
              items={[
                { label: "DSO-510", value: 48, display: "48 MS/s", highlight: true },
                { label: "DSO152", value: 2.5, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          At 200 kHz, the DSO152 is really only suited to audio-range and basic low-speed logic signals. The
          DSO-510&apos;s 10 MHz opens up a much wider range of general electronics and automotive diagnostic work,
          and its built-in generator adds a capability the DSO152 simply doesn&apos;t have at any frequency.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where each pocket scope runs out of road</h2>
        <p className="text-muted leading-7 mb-4">
          A rated bandwidth is the frequency where a sine wave already displays about 30% short of its true height
          (the −3 dB point), so it marks the edge of the usable range rather than its middle. A common rule of thumb
          is to keep your signal at or below roughly a fifth to a third of that figure if you want amplitudes to read
          within a few percent. The map below plots both inputs on one log-frequency axis with that rule applied.
        </p>
        <Figure
          caption={
            <>
              Rule-of-thumb accurate zone (dark) and rated bandwidth (pale) for each FNIRSI, plus the DSO-510&apos;s
              0–50 kHz generator. Log scale; the zones are a guideline, not a measured response.
            </>
          }
        >
          <PocketRangeDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read that way, the DSO152 is comfortable up to roughly 40–67 kHz: fine for the audio band, slow PWM and
          sensor outputs, but square waves lose their sharp corners well before that, because a clean edge needs
          several odd harmonics above the fundamental. The DSO-510&apos;s comfortable zone reaches roughly 2–3 MHz,
          enough to show the edges of a few-hundred-kilohertz PWM drive or a slow serial line with recognizable
          shape. The sample rates follow the same pattern: at 2.5 MSa/s the DSO152 gets about 25 points across one
          cycle of a 100 kHz signal, while the DSO-510&apos;s 48 MS/s gets 480.
        </p>
        <p className="text-muted leading-7">
          Notice too where the DSO-510&apos;s generator sits: it covers the audio band and a little beyond, which is
          the right range for injecting a test tone into an amplifier stage or a filter and watching the result on
          the same screen. It isn&apos;t meant for clock or RF work. For more on how bandwidth and sample rate relate,
          see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI DSO-510 vs DSO152: portable scopes compared</h2>
        <p className="text-muted leading-7 mb-4">
          Despite both being marketed as pocket oscilloscopes, these serve different purposes once you look past the
          form factor.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need a genuinely useful diagnostic tool: the DSO-510</h3>
        <p className="text-muted leading-7 mb-4">
          10 MHz bandwidth and a built-in generator make the DSO-510 workable for real diagnostic tasks — checking a
          sensor signal, a PWM line, or a basic automotive waveform — in a device that still fits in a pocket. The
          generator doubles as a way to inject a known test signal without separate equipment.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you just want the cheapest possible single-channel scope: the DSO152</h3>
        <p className="text-muted leading-7 mb-4">
          For strictly audio-range or very slow signals — and only when price is the deciding factor — the DSO152
          still does the basic job of showing a waveform on a screen. It&apos;s a learning tool more than a
          diagnostic one at 200 kHz.
        </p>
        <KeyIdea title="Check the actual model name before buying the DSO-510">
          Because the DSO-510&apos;s own listing contains a naming inconsistency — a seller comparison graphic calls
          the matching spec column &quot;DSO-153&quot; rather than &quot;DSO-510&quot; — it&apos;s worth a quick look at
          the current listing yourself before ordering, even though FNIRSI&apos;s site and the listing title agree
          on &quot;DSO-510&quot;.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Real diagnostic work: sensors, PWM, automotive signals", "FNIRSI DSO-510", "10 MHz and 48 MS/s actually resolve these signals"],
            ["Need a signal source in the same device", "FNIRSI DSO-510", "Built-in 0-50 kHz DDS generator"],
            ["Strictly audio-range signals on the tightest budget", "FNIRSI DSO152", "Lower price for a job that doesn't need more bandwidth"],
            ["First exposure to what an oscilloscope even shows", "FNIRSI DSO152", "Simpler, cheaper tool for learning the basics"],
            ["Want the better-documented of the two", "FNIRSI DSO-510", "FNIRSI's own product page gives detailed specs"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want a pocket scope with more bandwidth still? The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both of these alongside bench-style options, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Neither replaces a bench scope">
          Both of these are pocket tools for quick checks, not replacements for a benchtop oscilloscope. If you need
          multiple channels, deep memory or serial decoding, look at a benchtop model like the Rigol DS1054Z instead.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The FNIRSI DSO-510 and DSO152 both fit in a pocket, but they're not really competing for the same job. The DSO-510's 10 MHz bandwidth, faster sampling and built-in generator make it the far more useful diagnostic tool; the DSO152 only makes sense if price is the only consideration and your signals are strictly low-frequency.",
  faqs: [
    {
      question: "Is the FNIRSI DSO-510 much better than the DSO152?",
      answer:
        "Yes, substantially — 10 MHz bandwidth against 200 kHz (50x), and 48 MS/s against 2.5 MSa/s (about 19x), plus a built-in signal generator the DSO152 doesn't have. The DSO152 only makes sense when price is the deciding factor and your signals are strictly low-frequency.",
    },
    {
      question: "Does the FNIRSI DSO152 have a signal generator?",
      answer:
        "No. Only the DSO-510 includes one in this site's sourcing — a basic DDS generator covering 0-50 kHz across 13 waveform types.",
    },
    {
      question: "Why does the DSO-510 have a naming caution on this site?",
      answer:
        "The DSO-510's own Amazon listing includes a seller-made comparison graphic that labels the matching spec column \"DSO-153\" rather than \"DSO-510\", even though the listing title and FNIRSI's current product page both call it \"DSO-510\" with identical specs. It's worth checking the current listing yourself before buying.",
    },
    {
      question: "Can either of these replace a benchtop oscilloscope?",
      answer:
        "No — both are single-channel pocket tools meant for quick checks, not a substitute for a multi-channel benchtop scope with deep memory and serial decoding, such as the Rigol DS1054Z.",
    },
    {
      question: "Is 200 kHz of bandwidth enough to see a square wave?",
      answer:
        "Only a slow one. A square wave's sharp edges are built from odd harmonics well above its fundamental, so a 200 kHz scope like the DSO152 visibly rounds the corners once the fundamental climbs into the tens of kilohertz. The DSO-510's 10 MHz keeps edges recognizable into the hundreds of kilohertz, which is why it suits PWM and slow serial lines better.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D15", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
  ],
};

export default function FnirsiDso510VsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
