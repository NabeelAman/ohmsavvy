import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// MINIWARE DS213 extra facts (2 analog channels CH_A/CH_B plus 2 digital CH_C/CH_D; 100 MSa/s real time, per-channel
// split not stated; 8-bit; 4K points per channel; 8 MB built-in USB disk for BMP/BUF/CSV files; generator with square
// 10 Hz to 8 MHz in 20 steps and sine/triangle/sawtooth 10 Hz to 20 MHz in 11 steps at 3 Vpp; 1000 mAh battery with USB
// charging; 10 mV to 10 V/div with a x1 probe; max input 40 Vpp (x1) / 400 Vpp (x10); DC/AC coupling; edge, pulse and
// logic triggers; Auto/Normal/Single/Slow; 99.5 x 58.5 x 13.5 mm; 129 g with battery; open-source app layer) per
// Miniware's DS213 page, archived at
// http://web.archive.org/web/20230528203520/https://www.miniware.com.cn/product/ds213-mini-oscilloscope/ (the live
// site is offline). Bandwidth (15 MHz) and display (3-inch 320 x 240) appear only on the Amazon listing
// https://www.amazon.com/dp/B09XXBBRPF (checked 2026-10-24); Miniware's page omits both.
// FNIRSI DSO152: 2.8-inch 320 x 240 LCD, 1000mAh battery (about 4 hours), USB-C charging 5V/1A, AC/DC coupling,
// 10mV/div to 20V/div, 10us/div to 50s/div, Auto/Normal/Single trigger, 40V (x1) / 400V (x10) max input,
// 99 x 68.3 x 19.5 mm, 100 g per https://www.fnirsi.com/products/dso-152 (checked 2026-10-24).

const path = "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152";
const ds213 = picks.find((p) => p.name === "MINIWARE DS213")!;
const dso152 = picks.find((p) => p.name === "FNIRSI DSO152")!;

export const metadata = buildMetadata({
  title: "MINIWARE DS213 vs DSO152: Portable Scopes",
  description:
    "MINIWARE DS213 vs FNIRSI DSO152: a pocket mixed-signal scope with logic inputs and a generator against a single-channel 200kHz scope. Charts and verdict.",
  path: "/oscilloscopes/miniware-ds213-vs-fnirsi-dso152",
  image: ds213.image,
});

const link = "text-accent hover:underline";

/** What plugs into each unit: the DS213 can drive and watch a circuit; the DSO152 watches one signal. */
function HookupDiagram() {
  const ports = [
    { y: 52, tag: "GEN", note: "generator out" },
    { y: 74, tag: "A", note: "analog, filter input" },
    { y: 96, tag: "B", note: "analog, filter output" },
    { y: 128, tag: "C", note: "digital" },
    { y: 146, tag: "D", note: "digital" },
  ];
  return (
    <svg
      viewBox="0 0 400 205"
      className="w-full h-auto"
      role="img"
      aria-label="Hookup diagram: the MINIWARE DS213's generator output drives a filter under test while analog channel A probes the filter input, analog channel B probes its output, and digital channels C and D watch two logic lines. The FNIRSI DSO152 has one analog input and no output, so it can watch only one signal."
    >
      <rect x="10" y="30" width="110" height="135" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="65" y="22" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">MINIWARE DS213</text>
      <rect x="18" y="40" width="64" height="44" rx="3" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <path d="M22 70 q8 -18 16 0 t16 0 t16 0" className="fill-none stroke-accent" strokeWidth="1.4" />
      <path d="M22 64 q8 -8 16 0 t16 0 t16 0" className="fill-none stroke-muted" strokeWidth="1.2" />
      {ports.map((p) => (
        <g key={p.tag}>
          <text x="114" y={p.y + 3} fontSize="8.5" fontWeight="700" textAnchor="end" className="fill-foreground">
            {p.tag}
          </text>
          <circle cx="120" cy={p.y} r="2.6" className="fill-accent" />
        </g>
      ))}
      <rect x="185" y="38" width="70" height="66" rx="6" className="fill-surface stroke-accent" strokeWidth="1.4" />
      <text x="220" y="66" fontSize="9" textAnchor="middle" className="fill-foreground">Filter or</text>
      <text x="220" y="78" fontSize="9" textAnchor="middle" className="fill-foreground">amp under test</text>
      <path d="M120 52 H185" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M120 74 H160 V52" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <circle cx="160" cy="52" r="2.6" className="fill-foreground" />
      <path d="M120 96 H150 V116 H268 V71 H255" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <circle cx="255" cy="71" r="2.6" className="fill-foreground" />
      <path d="M120 128 H180 M120 146 H180" className="stroke-muted fill-none" strokeWidth="1.3" strokeDasharray="4 3" />
      <text x="184" y="134" fontSize="8" className="fill-muted">two logic lines,</text>
      <text x="184" y="146" fontSize="8" className="fill-muted">e.g. chip select + data</text>
      <text x="65" y="182" fontSize="8.5" textAnchor="middle" className="fill-muted">2 analog + 2 digital + output</text>
      <rect x="295" y="30" width="95" height="135" rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="342" y="22" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">FNIRSI DSO152</text>
      <rect x="305" y="42" width="75" height="48" rx="3" className="fill-accent/10 stroke-border" strokeWidth="1" />
      <path d="M310 72 q8 -16 16 0 t16 0 t16 0 t16 0" className="fill-none stroke-accent" strokeWidth="1.4" />
      <circle cx="342" cy="165" r="2.6" className="fill-accent" />
      <path d="M342 165 V178" className="stroke-foreground" strokeWidth="1.3" />
      <text x="342" y="192" fontSize="8.5" textAnchor="middle" className="fill-muted">1 analog input, no output</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "MINIWARE DS213 vs FNIRSI DSO152",
  path,
  published: "2026-10-24",
  intro:
    "MINIWARE DS213 vs FNIRSI DSO152 compares two battery scopes that each fit in a shirt pocket but sit in different classes. The DS213 is a small mixed-signal instrument: two analog channels, two digital channels, 100 MSa/s and a built-in signal generator, with a 15 MHz bandwidth that only its Amazon listing states. The DSO152 is a single-channel 200kHz scope at 2.5 MSa/s, built to be the simplest way to see a waveform.",
  a: {
    pick: ds213,
    imageAlt: "MINIWARE DS213 pocket mixed-signal oscilloscope",
    chooseIf: [
      "You want to compare two analog signals, such as a filter's input and output, on a pocket instrument",
      "You need to watch logic lines alongside an analog trace, using the two digital channels",
      "You want a signal source in the same case to drive the circuit you are measuring",
      "Your signals reach into the hundreds of kHz or low MHz",
    ],
  },
  b: {
    pick: dso152,
    reviewHref: "/oscilloscopes/fnirsi-dso152-review",
    imageAlt: "FNIRSI DSO152 pocket digital oscilloscope",
    chooseIf: [
      "You want the most basic, lowest-cost way to see what a signal looks like",
      "One channel is enough and your signals stay in the audio range or slower",
      "You prefer specs you can check on the maker's live product page",
      "You want USB-C charging and a battery FNIRSI rates for about 4 hours",
    ],
  },
  extraSpecs: [
    { label: "Display", a: "3-inch, 320 × 240 (per Amazon listing)", b: "2.8-inch, 320 × 240" },
    { label: "Signal generator", a: "Square to 8 MHz; sine, triangle, sawtooth to 20 MHz; 3 Vpp", b: "None" },
    { label: "Triggers", a: "Edge, pulse, logic; Auto, Normal, Single, Slow", b: "Auto, Normal, Single" },
    { label: "Input coupling", a: "AC/DC", b: "AC/DC" },
    { label: "Vertical range (x1 probe)", a: "10 mV/div to 10 V/div", b: "10mV/div to 20V/div" },
    { label: "Maximum input", a: "40 Vpp (x1), 400 Vpp (x10)", b: "40V (x1), 400V (x10)" },
    { label: "Battery", a: "1000 mAh; runtime not stated by Miniware", b: "1000mAh, about 4 hours; USB-C charging" },
    { label: "Size and weight", a: "99.5 × 58.5 × 13.5 mm, 129 g", b: "99 × 68.3 × 19.5 mm, 100 g" },
    { label: "Comfortable signal range (3–5× rule)", a: "Up to roughly 3–5 MHz", b: "Up to roughly 40–65kHz" },
  ],
  differences: [
    "Inputs: the DS213 has two analog and two digital channels; the DSO152 has one analog channel.",
    "Bandwidth: 15 MHz on the DS213 against 200kHz on the DSO152, 75 times higher. Miniware's own page doesn't state the DS213's bandwidth; the figure comes from its Amazon listing.",
    "Sample rate: 100 MSa/s on the DS213 against 2.5 MSa/s, 40 times faster. Miniware doesn't say how the rate divides with several channels on.",
    "Generator: the DS213 can output square waves to 8 MHz and sine, triangle and sawtooth waves to 20 MHz, in fixed steps; the DSO152 has no output.",
    "Triggering: Miniware lists edge, pulse and logic triggers for the DS213; FNIRSI lists Auto, Normal and Single trigger modes for the DSO152.",
    "Size: the DS213 is thinner (13.5 mm against 19.5 mm) and narrower, but at 129 g it weighs more than the 100 g DSO152.",
    "Sources: Miniware's website is offline, so the DS213's specs come from an archived copy of its product page plus its Amazon listing. FNIRSI publishes the DSO152's specs on a live page.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          On paper the DS213 is the more capable instrument by a wide margin, so the speed charts use a log scale. The
          physical charts are closer, and they don&apos;t all favor the same unit: the DS213 is slimmer, the DSO152 is
          lighter.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth, log scale. The DS213&apos;s 15 MHz is from its Amazon listing; Miniware&apos;s archived page gives none.</>}>
            <BarChart
              log
              items={[
                { label: "MINIWARE DS213", value: 15_000_000, display: "15 MHz", highlight: true },
                { label: "FNIRSI DSO152", value: 200_000, display: "200kHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Real-time sample rate, log scale: 100 MSa/s is 40 times 2.5 MSa/s.</>}>
            <BarChart
              log
              items={[
                { label: "MINIWARE DS213", value: 100_000_000, display: "100 MSa/s", highlight: true },
                { label: "FNIRSI DSO152", value: 2_500_000, display: "2.5 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Total inputs. The DS213&apos;s four are two analog plus two digital (logic-level) channels.</>}>
            <BarChart
              items={[
                { label: "MINIWARE DS213", value: 4, display: "2 analog + 2 digital", highlight: true },
                { label: "FNIRSI DSO152", value: 1, display: "1 analog" },
              ]}
            />
          </Figure>
          <Figure caption={<>Thickness per each maker. The DS213 is 6 mm slimmer, though 29 g heavier.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DSO152", value: 19.5, display: "19.5 mm, 100 g" },
                { label: "MINIWARE DS213", value: 13.5, display: "13.5 mm, 129 g", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The sample-rate-to-bandwidth ratio is healthy on both: about 6.7 samples per cycle at the DS213&apos;s 15 MHz
          and 12.5 at the DSO152&apos;s 200kHz. In practice the DS213 draws a clean shape on signals up to a few MHz,
          and the DSO152 on signals up to a few tens of kHz. If you are unsure how the two specs relate, read{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "One-line reason"]}
          rows={[
            ["Testing an RC filter or small amplifier away from the bench", "MINIWARE DS213", "Its generator drives the circuit while CH A and CH B show input and output"],
            ["First look at waveforms for a student", "FNIRSI DSO152", "One channel, three trigger modes and a short menu to learn"],
            ["Checking that a UART TX line toggles while watching a supply rail", "MINIWARE DS213", "A digital channel for the logic line, an analog channel for the rail"],
            ["Watching a slow sensor output over minutes", "FNIRSI DSO152", "FNIRSI lists a timebase up to 50s/div"],
            ["Looking at a 1 MHz clock or an SPI clock line", "MINIWARE DS213", "Inside its range; five times past the DSO152's bandwidth"],
            ["Checking audio for clipping or a speaker line for hum", "Either", "Both cover audio; the DSO152 is the simpler tool for it"],
            ["Saving captures to a computer for a report", "MINIWARE DS213", "8 MB built-in USB disk stores BMP, BUF and CSV files"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Rated bandwidth is the frequency at which a sine wave shows about 30% smaller than it is. To see a waveform at
          close to its true size, buy three to five times its frequency, and more for square waves, whose shape depends on
          harmonics well above the fundamental.
        </p>
        <h3 className="text-lg font-semibold mb-2">MINIWARE DS213: a small mixed-signal kit</h3>
        <p className="text-muted leading-7 mb-4">
          Taking the listed 15 MHz at face value, the DS213 suits signals up to about 3–5 MHz: microcontroller clocks at
          the low end, PWM, UART, I2C at 100kHz or 400kHz, audio and most hobby sensor outputs. Two analog channels let you
          measure delay or gain between two points, and the two digital channels add logic lines without spending an
          analog input, which suits a chip-select line against a data line. Logic triggering helps isolate one state of
          those lines; Miniware doesn&apos;t list protocol decoding, so you read the bits yourself. The limits are its
          3-inch screen for four traces, 4K points per channel, which keeps long captures coarse, and specs you can&apos;t
          check on a live maker page.
        </p>
        <h3 className="text-lg font-semibold mb-2">FNIRSI DSO152: one slow channel, kept simple</h3>
        <p className="text-muted leading-7 mb-4">
          At 200kHz, the DSO152 is comfortable up to roughly 40–65kHz. That covers sound, mains-derived signals on a
          transformer secondary, servo pulses, slow PWM and the ripple on a linear supply, which AC coupling and 10mV/div
          make easy to enlarge. Its 20V/div top range, twice the DS213&apos;s 10 V/div with a x1 probe, fits a large signal
          on screen at a glance, and its slowest timebase of 50s/div lets a drifting sensor crawl across the display. It
          can&apos;t compare two signals, has no logic inputs or output, and a 100kHz I2C clock is already past its
          comfortable range.
        </p>
        <Figure
          caption={
            <>
              A self-contained filter check on the DS213: its own output drives the circuit, channels A and B compare
              input and output, and C and D stay free for logic. The DSO152 can watch one point at a time.
            </>
          }
        >
          <HookupDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          That hookup is the clearest way to see the gap between the two. With the DS213, set the generator to one of
          its fixed sine steps, read the amplitude on A and B, then step to the next frequency; the ratio of the two
          traces is the filter&apos;s gain at that point. The DSO152 can only show one of those nodes, and it needs an
          outside source to drive the circuit in the first place.
        </p>
        <div className="mt-4">
          <KeyIdea title="A generator faster than its own scope">
            Miniware lists sine, triangle and sawtooth output up to 20 MHz, above the 15 MHz bandwidth on the DS213&apos;s
            Amazon listing, so its own inputs will show the top generator settings smaller than they are. The output also
            comes in fixed steps (20 for square, 11 for the other shapes) at a listed 3 Vpp, rather than any frequency you
            type in. That is fine for checking a filter at a handful of points or feeding a clock into a circuit, but it
            isn&apos;t a sweep generator for plotting a full frequency response.
          </KeyIdea>
        </div>
        <div className="mt-4">
          <Callout title="Battery scopes and high voltage">
            Running on battery with the charging cable unplugged, neither scope is tied to mains earth, which makes them
            safer than a bench scope for some floating measurements. But the 400 V figures that both makers give with a
            x10 probe are input ranges, not safety ratings, and neither lists a CAT rating. For mains wiring, use a
            differential probe or a properly rated instrument, and don&apos;t charge either unit from a computer while
            probing, since that ties its ground to the computer&apos;s.
          </Callout>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question with the DS213</h2>
        <p className="text-muted leading-7 mb-4">
          The DS213 is the stronger instrument on every figure Miniware publishes, but you buy it with less paperwork
          behind it. Miniware&apos;s site is offline, so its specs come from an archived copy of the official product page,
          and the two numbers most buyers look at first, bandwidth and screen size, appear only on the Amazon listing. The
          DSO152&apos;s numbers are all on FNIRSI&apos;s live page. If you need the DS213&apos;s extra channels and
          generator, that gap is a reasonable trade; if you only need to see one slow waveform, the DSO152 does that with
          every figure on its maker&apos;s page.
        </p>
        <p className="text-muted leading-7">
          The DSO152 has more rivals compared on{" "}
          <Link href="/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" className={link}>
            FNIRSI DSO-TC3 vs FNIRSI DSO152
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" className={link}>
            OWON HDS2202S vs FNIRSI DSO152
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" className={link}>
            FNIRSI DSO152 vs Hantek 6022BE
          </Link>
          . For handhelds with bigger screens, see{" "}
          <Link href="/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" className={link}>
            HANMATEK HO52 vs OWON HDS272S
          </Link>
          ; for the step to a bench scope, see{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" className={link}>
            Rigol DS1054Z vs FNIRSI DSO152
          </Link>
          , the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope picks
          </Link>{" "}
          and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The MINIWARE DS213 is the better pocket instrument if you need more than one trace: two analog and two digital channels, 100 MSa/s and a built-in generator, though its 15 MHz bandwidth and screen size are stated only on Amazon. The FNIRSI DSO152 is the better pick for a first, simple look at slow signals: one channel, 200kHz, specs published on FNIRSI's live page and USB-C charging.",
  chooseNeitherIf:
    "You need to probe mains or another earth-referenced point: both run on battery with no CAT rating listed by either maker, and the 400 V x10-probe figures are input ranges, not safety ratings — use a differential probe or a properly rated instrument instead.",
  faqs: [
    {
      question: "Is the MINIWARE DS213 a logic analyzer?",
      answer:
        "Partly. Besides its two analog channels it has two digital channels and Miniware lists a logic trigger, so you can watch two logic lines next to analog traces. That is far fewer lines than a dedicated logic analyzer, and Miniware doesn't list protocol decoding, so you read serial data from the waveform yourself. The FNIRSI DSO152 has no digital inputs.",
    },
    {
      question: "What bandwidth does the MINIWARE DS213 have?",
      answer:
        "Its Amazon listing gives 15 MHz. Miniware's own product page, now available only as an archived copy because the maker's site is offline, lists 100 MSa/s sampling but no bandwidth figure. Treat 15 MHz as the seller's stated figure. Even with some margin, it is many times the FNIRSI DSO152's 200kHz.",
    },
    {
      question: "Can the DS213's signal generator test its own inputs?",
      answer:
        "Yes, within limits. You can feed its output into CH A to see a known square or sine wave, a useful check that probes and settings are right. But Miniware lists sine output up to 20 MHz, above the 15 MHz bandwidth on the Amazon listing, so the highest settings will display smaller than they are. Frequencies come in fixed steps at 3 Vpp.",
    },
    {
      question: "Which pocket scope is better for a complete beginner?",
      answer:
        "The FNIRSI DSO152, if you mainly want to learn what waveforms look like. One channel and three trigger modes keep the menus short, and slow signals are where beginners usually start. Pick the DS213 if you already know you will compare two signals or look at logic lines, since the DSO152 can't grow into those jobs.",
    },
    {
      question: "Which one is smaller to carry?",
      answer:
        "They are almost the same length, about 99 mm. The DS213 is narrower and slimmer at 58.5 mm wide and 13.5 mm thick, against 68.3 mm and 19.5 mm for the DSO152. The DSO152 is lighter, 100 g against 129 g. Both fit a shirt pocket, so choose on channels and speed rather than size.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI DSO152 review", href: "/oscilloscopes/fnirsi-dso152-review" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "HANMATEK HO52 vs OWON HDS272S", href: "/oscilloscopes/hanmatek-ho52-vs-owon-hds272s" },
    { label: "HANMATEK DOS1102 vs Hantek DSO2C10", href: "/oscilloscopes/hanmatek-dos1102-vs-hantek-dso2c10" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "OWON HDS2202S vs FNIRSI DSO152", href: "/oscilloscopes/owon-hds2202s-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO-TC3 vs FNIRSI DSO152", href: "/oscilloscopes/fnirsi-dso-tc3-vs-fnirsi-dso152" },
    { label: "FNIRSI DSO152 vs Hantek DSO2D10", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Siglent SDS1104X-E", href: "/oscilloscopes/fnirsi-dso152-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs FNIRSI DSO152", href: "/oscilloscopes/rigol-ds1054z-vs-fnirsi-dso152" },
    { label: "Rigol DHO802 vs FNIRSI DSO152", href: "/oscilloscopes/rigol-dho802-vs-fnirsi-dso152" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "PicoScope 2206B vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2206b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek 6022BE", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-6022be" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Rigol DHO914S vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho914s-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1104Z-S Plus vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1104z-s-plus-vs-siglent-sds1104x-e" },
    { label: "Hantek DSO2C10 vs Hantek DSO2D10", href: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d10" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI 1014D vs FNIRSI DSO-TC3", href: "/oscilloscopes/fnirsi-1014d-vs-fnirsi-dso-tc3" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Rigol DS1054Z vs OWON VDS1022I", href: "/oscilloscopes/rigol-ds1054z-vs-owon-vds1022i" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs Hantek DSO5102P", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso5102p" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO802 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho802-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Rigol DHO802", href: "/oscilloscopes/siglent-sds1104x-e-vs-rigol-dho802" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO804 vs Hantek DSO2D10", href: "/oscilloscopes/rigol-dho804-vs-hantek-dso2d10" },
    { label: "Rigol DHO804 vs FNIRSI 1014D", href: "/oscilloscopes/rigol-dho804-vs-fnirsi-1014d" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
    { label: "Hantek DSO2D10 vs Siglent SDS1104X-E", href: "/oscilloscopes/hantek-dso2d10-vs-siglent-sds1104x-e" },
    { label: "Siglent SDS1202X-E vs Hantek DSO2D10", href: "/oscilloscopes/siglent-sds1202x-e-vs-hantek-dso2d10" },
    { label: "Siglent SDS1104X-E vs Hantek DSO5102P", href: "/oscilloscopes/siglent-sds1104x-e-vs-hantek-dso5102p" },
    { label: "Siglent SDS1104X-E vs Siglent SDS1202X-E", href: "/oscilloscopes/siglent-sds1104x-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "PicoScope 2204A vs Digilent Analog Discovery 3", href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" },
  ],
};

export default function MiniwareDs213VsFnirsiDso152Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
