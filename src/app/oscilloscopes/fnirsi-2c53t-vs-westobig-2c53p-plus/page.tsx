import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 2C53T: 50MHz, 2 channels, 250 MS/s, 19,999-count True RMS multimeter (1000V DC/750V AC), generator to
// 50kHz, 1 Kpts record depth, 2.8" 320x240 screen, ±400V input limit, 300g, 3000mAh battery, vertical resolution
// not stated. Matching this site's existing 2C53T Pick (checked prior session).
// WESTOBiG 2C53P Plus: 50MHz, 2 channels, 250 MS/s, 4.5-digit 19999-count multimeter, 12-waveform DDS generator to
// 10MHz, 4.3" 480x272 IPS touchscreen, FFT/Lissajous analysis, ±400V protection, 4000mAh battery (~4hrs), bundled
// carrying case. Matching this site's existing WESTOBiG 2C53P Plus Pick, per the official Amazon listing
// (B0D3LMPQY3, manufacturer FNIRSI) (checked 2026-10-24).

const path = "/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus";

const t2c53 = picks.find((p) => p.name === "FNIRSI 2C53T")!;
const p2c53 = picks.find((p) => p.name === "WESTOBiG 2C53P Plus")!;

export const metadata = buildMetadata({
  title: "FNIRSI 2C53T vs 2C53P Plus: Features Compared",
  description:
    "FNIRSI 2C53T vs WESTOBiG 2C53P Plus: identical scope specs, but the 2C53P Plus adds a touchscreen, a far stronger generator, and a bundled case.",
  path: "/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus",
  image: p2c53.image,
});

const link = "text-accent hover:underline";

/** Log-frequency map: each generator's stated upper limit against common signal bands and the shared 50 MHz scope bandwidth. */
function GeneratorReachDiagram() {
  // 10 Hz at x=30 to 100 MHz at x=320: seven decades.
  const fx = (hz: number) => 30 + (290 / 7) * Math.log10(hz / 10);
  const decades = [
    { hz: 10, label: "10 Hz" },
    { hz: 1e3, label: "1 kHz" },
    { hz: 1e5, label: "100 kHz" },
    { hz: 1e7, label: "10 MHz" },
  ];
  return (
    <svg
      viewBox="0 0 340 176"
      className="w-full h-auto"
      role="img"
      aria-label="Log-scale frequency map: the FNIRSI 2C53T generator reaches 50 kHz, which covers the 20 Hz to 20 kHz audio band, while the 2C53P Plus generator reaches 10 MHz, past a 400 kHz I2C clock; both scopes share a 50 MHz bandwidth"
    >
      <rect x={fx(20)} y="16" width={fx(20_000) - fx(20)} height="12" rx="3" className="fill-surface stroke-border" strokeWidth="1" />
      <text x={(fx(20) + fx(20_000)) / 2} y="25" fontSize="8.5" textAnchor="middle" className="fill-muted">audio band 20 Hz-20 kHz</text>
      <line x1={fx(400_000)} y1="12" x2={fx(400_000)} y2="106" className="stroke-muted" strokeWidth="1" strokeDasharray="2 3" />
      <text x={fx(400_000)} y="10" fontSize="8.5" textAnchor="middle" className="fill-muted">I2C 400 kHz</text>
      <text x="30" y="50" fontSize="9" className="fill-foreground">2C53T generator: up to 50 kHz</text>
      <rect x="30" y="55" width={fx(50_000) - 30} height="12" rx="3" className="fill-muted" />
      <text x="30" y="86" fontSize="9" className="fill-accent">2C53P Plus generator: up to 10 MHz</text>
      <rect x="30" y="91" width={fx(1e7) - 30} height="12" rx="3" className="fill-accent" />
      <line x1={fx(5e7)} y1="40" x2={fx(5e7)} y2="118" className="stroke-foreground" strokeWidth="1.4" />
      <text x={fx(5e7) - 4} y="114" fontSize="8.5" textAnchor="end" className="fill-foreground">50 MHz scope (both)</text>
      <line x1="30" y1="126" x2="320" y2="126" className="stroke-muted" strokeWidth="1" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={30 + (290 / 7) * i} y1="122" x2={30 + (290 / 7) * i} y2="130" className="stroke-muted" strokeWidth="1" />
      ))}
      {decades.map((d) => (
        <text key={d.hz} x={fx(d.hz)} y="142" fontSize="8.5" textAnchor="middle" className="fill-muted">
          {d.label}
        </text>
      ))}
      <text x="170" y="166" fontSize="8.5" textAnchor="middle" className="fill-muted">
        Bars show stated upper limits; lower limits not stated.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 2C53T vs 2C53P Plus: Features and Differences",
  path,
  published: "2026-10-25",
  intro:
    "These two 3-in-1 handhelds share identical oscilloscope headline specs — 50 MHz, two channels, 250 MS/s — and a similar true-RMS multimeter. What separates them is everything around that core: screen type and size, generator capability, battery size, and what's in the box.",
  a: {
    pick: t2c53,
    imageAlt: "FNIRSI 2C53T handheld oscilloscope, multimeter and signal generator, front view",
    chooseIf: [
      "You want the lighter, smaller device (300 g) with physical button controls",
      "A basic generator up to 50 kHz is all you need",
      "You don't need a touchscreen or a bundled carrying case",
      "You want the documented 1 Kpts record depth figure upfront",
    ],
  },
  b: {
    pick: p2c53,
    imageAlt: "WESTOBiG 2C53P Plus handheld oscilloscope, multimeter and signal generator with carrying case, front view",
    chooseIf: [
      "You want a touchscreen rather than physical buttons",
      "You need a generator with real reach: 10 MHz against the 2C53T's 50 kHz",
      "You want FFT and Lissajous analysis built in",
      "You want a carrying case included and a larger 4000 mAh battery",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "50MHz", b: "50MHz" },
    { label: "Channels", a: "2", b: "2" },
    { label: "Sample rate", a: "250 MS/s", b: "250 MS/s" },
    { label: "Screen", a: "2.8-inch, 320 × 240, button controls", b: "4.3-inch, 480 × 272, IPS touchscreen" },
    { label: "Signal generator", a: "Up to 50 kHz", b: "12 waveforms, up to 10 MHz" },
    { label: "Multimeter", a: "19,999-count True RMS, 1000V DC / 750V AC", b: "4.5-digit, 19999-count" },
    { label: "Analysis features", a: "Not called out in this Pick's sourcing", b: "FFT, Lissajous" },
    { label: "Record depth", a: "1 Kpts (documented)", b: "Not stated in this Pick's sourcing" },
    { label: "Battery", a: "3,000 mAh", b: "4,000 mAh (~4 hrs)" },
    { label: "Weight", a: "300 g (documented)", b: "Not stated in this Pick's sourcing" },
    { label: "In the box", a: "Standard accessories", b: "Includes a carrying case" },
  ],
  differences: [
    "Generator: the 2C53P Plus reaches 10 MHz across 12 waveforms; the 2C53T tops out at 50 kHz — a 200x difference that matters if you need to drive anything beyond very slow signals.",
    "Screen: the 2C53P Plus has a larger 4.3-inch 480 × 272 IPS touchscreen; the 2C53T has a smaller 2.8-inch 320 × 240 screen operated with physical buttons.",
    "Analysis: only the 2C53P Plus's sourcing calls out FFT and Lissajous analysis modes.",
    "Battery: 4,000 mAh on the 2C53P Plus against 3,000 mAh on the 2C53T.",
    "Included accessories: the 2C53P Plus bundles a carrying case; the 2C53T's listing doesn't.",
    "The oscilloscope core — bandwidth, channel count, sample rate — and the basic multimeter count are effectively identical between them.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Because the scope hardware is a tie, the chart below focuses on the generator — the single biggest
          functional gap between these two devices.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Signal generator maximum frequency, log scale: the 2C53P Plus reaches 200x higher.</>}>
            <BarChart
              log
              items={[
                { label: "2C53P Plus", value: 10_000_000, display: "10 MHz", highlight: true },
                { label: "2C53T", value: 50_000, display: "50 kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Battery capacity: the 2C53P Plus has roughly 33% more.</>}>
            <BarChart
              items={[
                { label: "2C53P Plus", value: 4000, display: "4,000 mAh", highlight: true },
                { label: "2C53T", value: 3000, display: "3,000 mAh" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A 50 kHz ceiling still clears the audio band, so the 2C53T can feed a test tone into an amplifier or a
          speaker crossover, but it stops well short of clock-rate signals and higher-speed digital test points. The
          2C53P Plus&apos;s 10 MHz generator opens up a much wider range of real test and diagnostic signals from the
          same handheld.
        </p>
        <div className="mt-6">
          <Figure caption={<>Log frequency scale. Common signal bands are standard reference values, not product specs.</>}>
            <GeneratorReachDiagram />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Plotted on a log axis, the gap is easier to judge than a raw 200x ratio. Both generators cover audio work:
          checking an amplifier&apos;s frequency response, a tone-control stage or a passive filter tuned to a few
          kilohertz. Past 50 kHz only the 2C53P Plus continues, through ultrasonic sensor frequencies, the 100 kHz
          and 400 kHz clock rates used by standard and fast-mode I2C, and on to 10 MHz, where you can inject a stand-in
          clock or test a switching stage&apos;s input. Neither generator gets close to the 50 MHz bandwidth both scopes
          share, which is normal for handhelds in this class: the scope can see faster signals than the built-in
          source can create. Also keep in mind that a generator&apos;s rated top frequency usually applies to sine
          output, and square edges near the limit look rounder than the label implies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 2C53T vs 2C53P Plus: features and differences</h2>
        <p className="text-muted leading-7 mb-4">
          With the scope section tied, this decision is really about the surrounding feature set — generator
          reach, screen type, and what&apos;s included.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need a real test-signal source: the 2C53P Plus</h3>
        <p className="text-muted leading-7 mb-4">
          Being able to generate a useful waveform up to 10 MHz, with FFT and Lissajous analysis on top, makes the
          2C53P Plus a considerably more complete field-diagnostic tool — you can both measure a signal and create
          one to test a circuit, from the same device.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you want the lighter, simpler device: the 2C53T</h3>
        <p className="text-muted leading-7 mb-4">
          At 300 g with physical buttons, the 2C53T is the more compact, simpler-to-operate option when you mainly
          need the scope and multimeter functions and don&apos;t have a specific need for a built-in signal source
          beyond very basic test tones.
        </p>
        <KeyIdea title="Same scope, different accessory tier">
          When two devices share identical core scope specs, the decision usually comes down to the surrounding
          feature set rather than the measurement itself. Here that means: do you need to generate signals above 50
          kHz, do you prefer a touchscreen to buttons, and does a bundled carrying case matter to you?
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Need to generate test signals above 50 kHz", "WESTOBiG 2C53P Plus", "10 MHz generator vs. 50 kHz"],
            ["Want FFT or Lissajous analysis", "WESTOBiG 2C53P Plus", "Only this Pick's sourcing lists these modes"],
            ["Prefer physical buttons over a touchscreen", "FNIRSI 2C53T", "2.8-inch button-controlled display"],
            ["Want the lightest device", "FNIRSI 2C53T", "Documented 300 g weight"],
            ["Want a carrying case included", "WESTOBiG 2C53P Plus", "Bundled with this listing"],
            ["Just need scope + multimeter, nothing else", "FNIRSI 2C53T", "Simpler device for the core job"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want a small benchtop alternative to these handhelds? See{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both handhelds, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Both are field tools, not bench replacements">
          With a 2.8-4.3 inch screen, 1 Kpts-class record depth and no serial decoding, neither of these replaces a
          benchtop scope for serious digital debugging — they&apos;re built for quick field checks where portability
          matters more than depth.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The FNIRSI 2C53T and WESTOBiG 2C53P Plus share an identical 50 MHz, 250 MS/s oscilloscope core and a similar multimeter, so the decision comes down to everything around it. Choose the 2C53P Plus for its far stronger 10 MHz generator, touchscreen, FFT/Lissajous analysis and bundled case; choose the 2C53T if you want the lighter, simpler, button-controlled device and don't need more than a basic 50 kHz test signal.",
  faqs: [
    {
      question: "Is the WESTOBiG 2C53P Plus just an upgraded FNIRSI 2C53T?",
      answer:
        "Functionally, yes — both are FNIRSI-made 3-in-1 scope/multimeter/generator handhelds with an identical 50 MHz, 250 MS/s scope core. The 2C53P Plus adds a much stronger generator (10 MHz vs 50 kHz), a larger IPS touchscreen, FFT/Lissajous analysis, a bigger battery, and a bundled carrying case.",
    },
    {
      question: "Why is the generator frequency so different between these two?",
      answer:
        "This site's sourcing documents the FNIRSI 2C53T's generator at up to 50 kHz and the WESTOBiG 2C53P Plus's at up to 10 MHz across 12 waveforms — a 200x difference per the official listings for each device. If a stronger signal source matters to your work, this is the deciding spec.",
    },
    {
      question: "Does either of these have serial decoding?",
      answer:
        "No — neither this site's 2C53T nor 2C53P Plus sourcing lists serial trigger or decode support. For that, look at a benchtop model like the Hantek DSO2C10 instead.",
    },
    {
      question: "Which is lighter and more portable?",
      answer:
        "The FNIRSI 2C53T is documented at 300 g with a smaller 2.8-inch screen and physical buttons, making it the more compact of the two. The 2C53P Plus's weight isn't stated in this Pick's sourcing, but its larger 4.3-inch touchscreen suggests a bigger device overall.",
    },
    {
      question: "Can the FNIRSI 2C53T's 50 kHz generator test audio circuits?",
      answer:
        "Yes. Its stated 50 kHz upper limit sits above the 20 Hz to 20 kHz audio band, so it can supply test tones for amplifiers, filters and crossovers. It runs out for anything faster, such as I2C-rate clocks or switching stages. This site's sourcing doesn't list its lowest frequency or amplitude range, so check those on the device before planning precise response measurements.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "FNIRSI DSO-510 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-510-vs-fnirsi-dso152" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
  ],
};

export default function Fnirsi2c53tVsWestobig2c53pPlusPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
