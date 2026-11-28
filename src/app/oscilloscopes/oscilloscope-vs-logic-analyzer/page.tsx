// Educational page. The oscilloscope-vs-logic-analyzer distinction is a well-established instrumentation concept —
// no per-instance citation required for the general mechanism per CONTENT_STANDARDS.md §1. The one product-specific
// claim (Digilent Analog Discovery 3's hybrid channel count) is copied verbatim from its existing verified Pick.
import Link from "@/components/AppLink";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("oscilloscopes");
const ds1054z = all.find((p) => p.name === "Rigol DS1054Z")!;
const ad3 = all.find((p) => p.name === "Digilent Analog Discovery 3")!;
const pico2204a = all.find((p) => p.name === "PicoScope 2204A")!;

const description =
  "Oscilloscope vs logic analyzer: what each tool actually shows you, analog voltage detail against many-channel digital states, and when you genuinely need both.";

export const metadata = buildMetadata({
  title: "Oscilloscope vs Logic Analyzer",
  description,
  path: "/oscilloscopes/oscilloscope-vs-logic-analyzer",
  image: ad3.image,
});

const link = "text-accent hover:underline";

/** Oscilloscope trace (analog voltage) vs logic analyzer trace (digital high/low per channel). */
function TraceComparisonDiagram() {
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Comparison of trace types. An oscilloscope shows a continuous analog voltage waveform on one or a few channels, with full amplitude detail including noise, ringing and slope. A logic analyzer shows many channels at once, each a simple high or low digital state over time, with no amplitude information."
    >
      <text x="80" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Oscilloscope: 2-4 channels</text>
      <path d="M20 50 Q35 30 50 50 T80 50 T110 50 T140 50" className="stroke-accent" strokeWidth="2" fill="none" />
      <text x="80" y="70" fontSize="8.5" textAnchor="middle" className="fill-muted">Continuous analog voltage, full amplitude detail</text>
      <text x="240" y="18" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Logic analyzer: many channels</text>
      <path d="M180 95 H200 V105 H220 V95 H260 V105 H280" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <path d="M180 115 H210 V125 H240 V115 H280" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <path d="M180 135 H195 V145 H230 V135 H280" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <text x="240" y="160" fontSize="8.5" textAnchor="middle" className="fill-muted">Simple high/low state per channel, no amplitude</text>
    </svg>
  );
}

export default function OscilloscopeVsLogicAnalyzerPage() {
  return (
    <HowToShell
      title="Oscilloscope vs Logic Analyzer"
      description={description}
      published="2026-11-28"
      path="/oscilloscopes/oscilloscope-vs-logic-analyzer"
      category="oscilloscopes"
      intro={
        <>
          An oscilloscope shows you a continuous analog voltage waveform on a small number of channels, capturing
          amplitude, noise, ringing and slope in full detail. A logic analyzer instead captures many digital channels
          at once, often 8 to 32 or more, but reduces each one to a simple high or low state with no amplitude
          information at all. Neither tool replaces the other: a scope tells you how a signal actually looks, and a
          logic analyzer tells you what a whole digital bus is doing at once.
        </>
      }
      aside={{
        image: ad3.image,
        alt: "Digilent Analog Discovery 3, a combined oscilloscope and 16-channel logic analyzer",
        caption: (
          <>
            Some instruments combine both in one box. The Digilent Analog Discovery 3 pairs a 2-channel oscilloscope
            with a 16-channel logic analyzer, which illustrates the trade-off directly: few analog channels with full
            detail, many digital channels with none.
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What each tool actually captures" },
        { id: "when-scope", label: "When you need an oscilloscope" },
        { id: "when-la", label: "When you need a logic analyzer" },
        { id: "mso", label: "Mixed-signal: a middle ground" },
        { id: "causes", label: "Picking wrong: symptoms and fixes" },
        { id: "which", label: "Which to buy first" },
      ]}
      faq={[
        {
          q: "Can an oscilloscope replace a logic analyzer?",
          a:
            "Only partially. A standard oscilloscope's 2 to 4 channels can show you a few digital signals as voltage waveforms, which works for simple buses. Once you need to see 8 or more lines at once, like a wide parallel bus or several serial lines together, you need the channel count a dedicated logic analyzer or a mixed-signal oscilloscope (MSO) provides.",
        },
        {
          q: "Can a logic analyzer replace an oscilloscope?",
          a:
            "No. A logic analyzer only tells you whether a signal is above or below a threshold, not its actual voltage, shape, noise or ringing. If you need to see signal integrity, analog sensor output or anything that isn't purely digital, you need an oscilloscope.",
        },
        {
          q: "What is a mixed-signal oscilloscope (MSO)?",
          a:
            "An MSO adds a handful of digital-only channels to a standard oscilloscope, letting you see a few analog signals in full detail alongside several digital lines as simple logic states, all on one timebase. It's a middle ground between a pure oscilloscope and a dedicated many-channel logic analyzer.",
        },
        {
          q: "Do I need a logic analyzer for Arduino or ESP32 projects?",
          a:
            "Usually not at first. Most microcontroller debugging (I2C, SPI, UART, PWM) only involves a handful of lines, well within a standard oscilloscope's channel count. A dedicated logic analyzer becomes worth it once you're debugging a wide parallel bus or need to correlate many digital lines simultaneously.",
        },
        {
          q: "Is a combined scope-and-logic-analyzer instrument a good compromise?",
          a:
            "For hobbyist and student budgets, yes — a device like the Digilent Analog Discovery 3 gives you both in one USB instrument. It won't match a dedicated bench scope's bandwidth or a dedicated logic analyzer's channel depth, but it covers a wide range of everyday debugging without buying two separate instruments.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/analog-vs-digital-oscilloscope",
          title: "Analog vs Digital Oscilloscope",
          desc: "A related but different distinction, inside the oscilloscope category itself.",
        },
        {
          href: "/oscilloscopes/oscilloscope-memory-depth-explained",
          title: "Oscilloscope Memory Depth Explained",
          desc: "A spec that matters for both plain scopes and the scope half of a mixed-signal instrument.",
        },
      ]}
    >
      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What each tool actually captures</h2>
        <p className="text-muted leading-7 mb-4">
          An oscilloscope digitizes a continuous analog voltage and plots it against time, keeping full amplitude
          detail: how high a pulse actually reaches, how fast its edges rise, whether it overshoots or rings. A logic
          analyzer samples many channels at once but reduces each to a single bit per sample, above or below a fixed
          threshold voltage. That trade means a logic analyzer can watch far more lines simultaneously, at the cost
          of throwing away everything except timing and logic level.
        </p>
        <Figure caption={<>Few channels with full amplitude detail (oscilloscope) against many channels with simple logic states only (logic analyzer).</>}>
          <TraceComparisonDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="when-scope" className="text-xl font-semibold mb-3">When you need an oscilloscope</h2>
        <p className="text-muted leading-7">
          Reach for an oscilloscope whenever the actual shape of a signal matters: checking for ringing, overshoot or
          noise on a digital edge, measuring a sensor&apos;s analog output, debugging a power supply rail, or verifying
          signal integrity on a single line. Anything where &quot;is it a clean signal&quot; is the real question
          needs an oscilloscope, not a logic analyzer.
        </p>
      </section>

      <section>
        <h2 id="when-la" className="text-xl font-semibold mb-3">When you need a logic analyzer</h2>
        <p className="text-muted leading-7 mb-4">
          Reach for a logic analyzer when the question is about timing and sequence across many digital lines at
          once: decoding a wide parallel data bus, correlating several serial lines against each other, or verifying
          a state machine&apos;s outputs change in the right order. The channel count is the whole point — a logic
          analyzer that watches 16 or 32 lines simultaneously does something a 4-channel scope simply can&apos;t.
        </p>
        <KeyIdea title="Logic analyzers don't care about voltage level, only timing">
          Once a logic analyzer has sampled whether a line is high or low, the actual voltage is gone from the data.
          That&apos;s the trade that buys the extra channels, and it&apos;s also why a logic analyzer can&apos;t tell you a signal
          is marginal, only that it crossed the threshold at a given time.
        </KeyIdea>
      </section>

      <section>
        <h2 id="mso" className="text-xl font-semibold mb-3">Mixed-signal: a middle ground</h2>
        <p className="text-muted leading-7 mb-4">
          A mixed-signal oscilloscope (MSO) adds a set of digital-only channels alongside the scope&apos;s regular analog
          channels, sharing one timebase. You get full analog detail on a couple of key signals and simple logic
          states on several more, which covers a lot of real debugging without needing two separate instruments.
        </p>
        <Callout title="A combined instrument example">
          The{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3" className={link}>
            Digilent Analog Discovery 3
          </Link>{" "}
          is a real, verified example of this trade-off taken further: a 2-channel, 14-bit oscilloscope paired with a
          16-channel logic analyzer in one USB device, plus a waveform generator and power supplies. It won&apos;t
          match a dedicated bench scope&apos;s bandwidth, but it covers oscilloscope and logic-analyzer work in one
          box for students and embedded developers.
        </Callout>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Picking the wrong tool: symptoms and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Can't tell if a bus line is actually clean, only that it's logic-high or low", "Using a logic analyzer alone", "Add an oscilloscope channel on the one line you're worried about"],
            ["Running out of oscilloscope channels on a wide bus", "Using a 2-4 channel scope for many digital lines", "Use a logic analyzer or MSO with enough digital channels"],
            ["Logic analyzer shows a transition but the circuit still misbehaves", "Threshold-level sampling misses marginal signal quality", "Check the specific line's actual voltage on a scope"],
          ]}
        />
      </section>

      <section>
        <h2 id="which" className="text-xl font-semibold mb-3">Which to buy first</h2>
        <p className="text-muted leading-7 mb-6">
          Start with an oscilloscope. Most hobbyist and student debugging involves a handful of signals where analog
          detail matters, and a 4-channel bench scope covers far more ground day to day than a dedicated logic
          analyzer. Add a logic analyzer, or step up to a combined instrument, once you&apos;re regularly debugging wide
          digital buses.
        </p>
        <ProductStrip
          title="Where to start"
          items={[
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z 4-channel oscilloscope",
              href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
              note: "4 analog channels and 50 MHz bandwidth, the default first bench oscilloscope.",
            },
            {
              name: "Digilent Analog Discovery 3",
              image: ad3.image,
              alt: "Digilent Analog Discovery 3 combined instrument",
              href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3",
              note: "2-channel scope plus a 16-channel logic analyzer, generator and power supplies in one USB box.",
            },
            {
              name: "PicoScope 2204A",
              image: pico2204a.image,
              alt: "PicoScope 2204A USB oscilloscope",
              href: "/oscilloscopes/picoscope-2204a-vs-digilent-analog-discovery-3",
              note: "A 2-channel USB scope for computer-based waveform work, without a logic-analyzer function.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
