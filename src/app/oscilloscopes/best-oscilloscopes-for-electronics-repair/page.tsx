import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { picks as allPicks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

const path = "/oscilloscopes/best-oscilloscopes-for-electronics-repair";

export const metadata = buildMetadata({
  title: "10 Best Oscilloscopes for Electronics Repair",
  description:
    "Top 10 best oscilloscopes for electronics repair, ranked for tracing faults on power rails, logic boards and audio gear, from 4-channel benches to handhelds.",
  path: "/oscilloscopes/best-oscilloscopes-for-electronics-repair",
  image: "https://valuetronics.com/cdn/shop/files/siglent_sds1104x-e.jpg",
});

const names = guidePicks("/oscilloscopes/best-oscilloscopes-for-electronics-repair");
const picks = names.map((n) => allPicks.find((p) => p.name === n)!).filter(Boolean);

// Facts below come from the Picks in best-beginner-oscilloscopes/page.tsx and the maker-sourced
// research notes (verified-facts.md: Siglent SDS1000X-E series page and datasheet, Rigol DS1000Z
// datasheet, hantek.com DSO2000 page; owon-hds2202s.json; fnirsi-1013d-plus.json).

// Record length on one channel, in points. DS1054Z / DS1102Z-E: 24 Mpts per Rigol's datasheet
// (Rigol's product page says 12 Mpts standard). FNIRSI 1013D Plus is left out: FNIRSI only gives
// "240 Kbit" storage depth, which doesn't convert cleanly to points.
const memoryItems = [
  { label: "Rigol DHO804", value: 25e6, display: "25 Mpts" },
  { label: "Rigol DS1054Z", value: 24e6, display: "24 Mpts*" },
  { label: "Rigol DS1102Z-E", value: 24e6, display: "24 Mpts*" },
  { label: "Siglent SDS1104X-E", value: 14e6, display: "14 Mpts", highlight: true },
  { label: "Siglent SDS1202X-E", value: 14e6, display: "14 Mpts" },
  { label: "Hantek DSO2D10", value: 8e6, display: "8 Mpts" },
  { label: "OWON HDS2202S", value: 8e3, display: "8K" },
  { label: "Hantek 2D72", value: 6e3, display: "6K" },
  { label: "FNIRSI 2C53T", value: 1e3, display: "1K" },
];

const bandwidthItems = [
  { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz", highlight: true },
  { label: "Rigol DHO804", value: 70, display: "70 MHz" },
  { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
  { label: "Siglent SDS1202X-E", value: 200, display: "200 MHz" },
  { label: "Hantek DSO2D10", value: 100, display: "100 MHz" },
  { label: "Rigol DS1102Z-E", value: 100, display: "100 MHz" },
  { label: "OWON HDS2202S", value: 200, display: "200 MHz" },
  { label: "Hantek 2D72", value: 70, display: "70 MHz" },
  { label: "FNIRSI 1013D Plus", value: 100, display: "100 MHz" },
  { label: "FNIRSI 2C53T", value: 50, display: "50 MHz" },
];

const fitNotes: Record<string, string> = {
  "Siglent SDS1104X-E":
    "Ranked first because it covers the widest spread of repair jobs: four channels for following a signal through several stages, 100 MHz, a 100,000 wfm/s update rate that makes rare glitches show up, and a 400,000 wfm/s sequence mode for capturing intermittent events. It is mains powered and 8-bit, so it stays on the bench.",
  "Rigol DHO804":
    "Second for its 12-bit vertical resolution, which shows small ripple and noise on a supply rail in finer steps than any 8-bit scope here, plus four channels and up to 25 Mpts. Its 70 MHz bandwidth and the drop to 312.5 MSa/s with all four channels on keep it just behind the Siglent.",
  "Rigol DS1054Z":
    "A proven four-channel bench scope with deep memory (24 Mpts on Rigol's datasheet, 12 Mpts on its product page) that handles most power, audio and microcontroller faults. It sits third because its 50 MHz bandwidth and 250 MSa/s per channel with three or four channels on leave less margin for fast edges.",
  "Siglent SDS1202X-E":
    "The fastest bench scope in this list at 200 MHz, with the same 100,000 wfm/s update rate as its four-channel sibling, so it suits repairs on faster digital boards. Two channels is the reason it ranks fourth: comparing a clock, a reset line and a data line at once is not possible.",
  "Hantek DSO2D10":
    "Its built-in 25 MHz signal generator lets you inject a test signal into a dead audio or RF stage and watch where it disappears, which is why it ranks above the other two-channel bench models for repair. Expect 8 Mpts on one channel and 4 Mpts with both on, less than the Rigol and Siglent benches.",
  "Rigol DS1102Z-E":
    "A solid two-channel choice when bandwidth matters more than channel count: 100 MHz, 24 Mpts per Rigol's datasheet and standard UART, I2C, SPI and parallel decoding. It has no generator and only two inputs, so it trails the Hantek for signal-tracing repairs.",
  "OWON HDS2202S":
    "The best fit here for on-site repair, combining a 200 MHz two-channel scope, a 20,000-count multimeter and a generator with sine output to 25 MHz in one battery handheld. The 8K record length and 3.5-inch screen make long captures and close inspection harder than on any bench model above it.",
  "Hantek 2D72":
    "A lighter three-in-one handheld (624 g) for service calls, with a 70 MHz scope, a 4,000-count meter and a sine generator to 25 MHz. It ranks below the OWON on bandwidth and on record length: 6K samples on one channel and 3K per channel with two.",
  "FNIRSI 1013D Plus":
    "The 7-inch touchscreen and the bundled 100X probe make it a useful portable scope for looking at higher-voltage nodes, with about 4 hours of battery and use while charging. It has no generator or multimeter, and FNIRSI does not publish its ADC resolution, so it sits near the bottom.",
  "FNIRSI 2C53T":
    "Worth carrying for its 19,999-count True RMS multimeter with a scope attached, at 300 g. The scope side is the most limited in this list, with a 1 Kpts record and a 50 kHz generator ceiling, so it suits quick checks rather than serious fault-finding on a board.",
};

const advice = [
  {
    heading: "Decide where the repairs happen",
    body: "If broken equipment comes to your bench, a mains-powered four-channel scope such as the Siglent SDS1104X-E, Rigol DHO804 or Rigol DS1054Z gives you the large screen, deep memory and extra inputs that make fault-finding faster. If you repair things where they are installed, such as arcade machines, studio racks or industrial controls, a battery handheld like the OWON HDS2202S or Hantek 2D72 saves carrying a separate meter and signal source. Many repair techs end up owning one of each.",
  },
  {
    heading: "Memory depth matters more than you expect",
    body: "Repair faults are often slow or intermittent: a supply that drops out once a minute, a board that resets when it warms up. Capturing that at a useful time resolution needs a deep record, and this is where the bench models pull far ahead. The Rigol and Siglent benches hold 14 to 25 million points on one channel, while the handhelds hold between 1,000 and 8,000. A short record forces you to choose between seeing the whole event and seeing its detail.",
  },
  {
    heading: "Count the signals you need to compare",
    body: "Many faults only make sense when you see cause and effect together: an enable pin against a regulator output, a clock against a reset line, an input against an output across an amplifier stage. Two channels cover simple before-and-after checks. Four channels let you watch a whole power-up sequence or a bus with its control lines, which is why the top three picks all have four inputs.",
  },
  {
    heading: "A signal source speeds up dead-stage hunting",
    body: "When an amplifier or receiver is silent, feeding a known signal in at the front and following it with the probe stage by stage is one of the quickest ways to find the failed part. The Hantek DSO2D10, OWON HDS2202S and Hantek 2D72 have generators built in. The FNIRSI 2C53T has one too, but it tops out at 50 kHz, which limits it to audio-range work.",
  },
];

const faqs = [
  {
    question: "What oscilloscope bandwidth do I need for electronics repair?",
    answer:
      "For most repair work, 50 to 100 MHz is enough. Power supplies, audio amplifiers, motor drives and typical microcontroller boards all run well inside that range. A common rule of thumb is to choose bandwidth three to five times the highest frequency you need to see clearly. Faster digital boards with quick edges benefit from 200 MHz, which the Siglent SDS1202X-E and OWON HDS2202S offer.",
  },
  {
    question: "Do I need a four-channel oscilloscope for repair work?",
    answer:
      "Not always, but it helps more than extra bandwidth for many faults. Two channels let you compare an input with an output. Four channels let you watch a power-up sequence across several rails, or a clock, reset and data line together, which is often where a fault becomes obvious. The Siglent SDS1104X-E, Rigol DHO804 and Rigol DS1054Z all have four.",
  },
  {
    question: "Is it safe to use an oscilloscope on mains-powered equipment?",
    answer:
      "Only with care. On a mains-powered bench scope the probe ground clip connects to protective earth, so clipping it onto the primary side of a power supply can short the circuit through the scope and destroy parts. Use an isolation transformer for the device under test or a differential probe, and never remove the scope's earth connection. Stay within the probe and input voltage ratings.",
  },
  {
    question: "Is a handheld oscilloscope good enough for electronics repair?",
    answer:
      "For field service and quick checks, yes. The OWON HDS2202S and Hantek 2D72 combine a scope, a multimeter and a signal generator in one battery unit. Their limits are small screens and short record lengths, 8K and 6K points respectively, so slow or intermittent faults are harder to capture than on a bench scope with millions of points of memory.",
  },
  {
    question: "Should I buy an oscilloscope or a better multimeter first for repair?",
    answer:
      "Most repairers start with a multimeter, because many faults are dead shorts, open fuses or missing voltages that a meter finds quickly. An oscilloscope becomes essential once the voltage looks right on the meter but the circuit still misbehaves: excessive ripple, a missing clock, ringing or noise. Those problems are invisible to a meter's averaged reading, so the two tools complement each other.",
  },
  {
    question: "How does an oscilloscope help find intermittent faults?",
    answer:
      "Set a trigger on the condition you suspect, such as a rail dipping below a threshold, then use Single or Normal mode so the scope waits and freezes the event when it happens. Deep memory lets you see what led up to it. A fast update rate, like the 100,000 wfm/s of the Siglent X-E models, and persistence display make rare glitches visible on screen.",
  },
];

export default function BestOscilloscopesForElectronicsRepairPage() {
  return (
    <>
      <CategoryHero
        category="oscilloscopes"
        label="Oscilloscopes · For Electronics Repair"
        heading="Top 10 Best Oscilloscopes for Electronics Repair"
        tagline="Ranked for fault-finding, not for spec-sheet length."
        description="Repairing electronics means chasing ripple, missing clocks and faults that come and go. We ranked ten oscilloscopes for repair work, from four-channel bench scopes to battery handhelds with a built-in multimeter."
        primaryCta={{ label: "See the Full Comparison", href: "/oscilloscopes/best-beginner-oscilloscopes" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4 text-muted leading-7">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">What repair work asks of a scope</h2>
          <p>
            A multimeter tells you whether a voltage is there. An oscilloscope tells you what that voltage is doing,
            and in repair work that difference is usually where the fault hides. A switch-mode supply can read the right
            DC level on a meter while its output carries enough ripple to crash the logic downstream. A
            microcontroller can have power and still sit dead because its crystal never starts. Seeing{" "}
            <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className="text-accent hover:underline">
              ripple on a rail
            </Link>{" "}
            or{" "}
            <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator" className="text-accent hover:underline">
              checking a crystal oscillator
            </Link>{" "}
            takes seconds with a scope and is impossible with a meter alone. Our{" "}
            <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className="text-accent hover:underline">
              oscilloscope vs multimeter explainer
            </Link>{" "}
            covers where each tool fits.
          </p>
          <p>
            Repair also rewards different specs from design work. Raw bandwidth matters less than channel count, memory
            depth and how quickly the scope redraws the screen, because faults are often intermittent and only make
            sense when several signals are compared. We ranked these ten with that in mind: bench scopes with four
            channels and deep memory first, then two-channel bench models, then battery handhelds for field repairs.
            For hunting faults that come and go, see our guides to{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className="text-accent hover:underline">
              persistence mode
            </Link>{" "}
            and{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-segmented-memory-for-intermittent-faults" className="text-accent hover:underline">
              segmented memory
            </Link>
            , and if you are choosing between the top two, read the{" "}
            <Link href="/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" className="text-accent hover:underline">
              Rigol DHO804 vs Siglent SDS1104X-E
            </Link>{" "}
            comparison.
          </p>
        </div>

        <Callout title="Mains-powered equipment: read this first">
          A bench oscilloscope&apos;s probe ground is tied to protective earth. Clipping it to the primary side of a
          mains supply, or to any node that isn&apos;t at earth potential, creates a short through the scope that can
          destroy the device, the probe and the scope&apos;s input. Power the unit under test through an isolation
          transformer or use a differential probe, never defeat the scope&apos;s earth, and respect the input limits:
          OWON lists 400 V maximum input for the HDS2202S, FNIRSI gives ±400 V for the 2C53T and 400 V with a 10X
          probe for the 1013D Plus. Discharge large capacitors before
          you touch a board. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className="text-accent hover:underline">
            connecting a probe correctly
          </Link>{" "}
          walks through grounding.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Model", "Inputs / bandwidth", "Record length", "Repair extras", "Best for"]}
            mono={[2, 3]}
            rows={[
              ["1", "Siglent SDS1104X-E", "4 ch / 100 MHz", "14 Mpts", "100k wfm/s, sequence mode, serial decode", "All-round bench repair"],
              ["2", "Rigol DHO804", "4 ch / 70 MHz", "25 Mpts", "12-bit ADC, touchscreen, USB-C power", "Ripple and noise on supply rails"],
              ["3", "Rigol DS1054Z", "4 ch / 50 MHz", "24 Mpts*", "30k wfm/s, high-res mode", "Budget four-channel bench"],
              ["4", "Siglent SDS1202X-E", "2 ch / 200 MHz", "14 Mpts", "100k wfm/s, CAN and LIN decode", "Faster digital boards"],
              ["5", "Hantek DSO2D10", "2 ch / 100 MHz", "8 Mpts", "25 MHz signal generator", "Signal injection and tracing"],
              ["6", "Rigol DS1102Z-E", "2 ch / 100 MHz", "24 Mpts*", "Deep memory, serial decode", "Two-channel bench on a budget"],
              ["7", "OWON HDS2202S", "2 ch / 200 MHz", "8K", "20,000-count meter, 25 MHz generator", "On-site repair calls"],
              ["8", "Hantek 2D72", "2 ch / 70 MHz", "6K", "4,000-count meter, 25 MHz generator", "Light field-service kit"],
              ["9", "FNIRSI 1013D Plus", "2 ch / 100 MHz", "240 Kbit (maker's wording)", "7-inch touchscreen, 100X probe", "Portable checks on higher-voltage nodes"],
              ["10", "FNIRSI 2C53T", "2 ch / 50 MHz", "1K", "19,999-count True RMS meter", "Meter-first quick checks"],
            ]}
          />
          <p className="text-xs text-muted leading-5">
            Record length is on one channel. *Rigol&apos;s DS1000Z datasheet lists 24 Mpts; its product page says 12
            Mpts standard.
          </p>
        </div>

        <Figure caption="Maximum record length on one channel, from each maker's published specs. The FNIRSI 1013D Plus is omitted because FNIRSI gives its memory only as 240 Kbit. *Rigol's product page says 12 Mpts standard.">
          <BarChart items={memoryItems} log />
        </Figure>

        <Figure caption="Analog bandwidth of each pick, in ranked order. Every model here clears the 50 MHz that covers most power, audio and microcontroller repairs.">
          <BarChart items={bandwidthItems} log />
        </Figure>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a repair oscilloscope</h2>
          <DataTable
            head={["Feature", "Why it matters for repair", "Sensible target"]}
            rows={[
              ["Channels", "Lets you see cause and effect together: an enable pin and a regulator output, or a clock and a reset line.", "Four on the bench; two is workable"],
              ["Record length", "Keeps detail while capturing slow or intermittent faults such as dropouts and resets.", "Millions of points, not thousands"],
              ["Update rate", "A scope that redraws faster shows rare glitches you would otherwise miss.", "Tens of thousands of wfm/s or more"],
              ["Vertical resolution", "Finer steps make millivolt ripple on a rail easier to read without zooming in.", "12-bit if rails are your main job"],
              ["Signal generator", "Injecting a known signal and following it reveals which stage has failed.", "Built-in, or a separate unit"],
              ["Power source", "Battery power suits site visits; mains power suits a fixed bench.", "Match it to where you work"],
            ]}
          />
          <KeyIdea title="Rule of thumb">
            Buy channels and memory before bandwidth. Most repair faults sit well below 50 MHz, but a two-channel scope
            with a short record will leave you guessing far more often than a four-channel scope at 50 MHz. See our{" "}
            <Link href="/oscilloscopes/oscilloscope-buying-guide" className="text-accent hover:underline">
              oscilloscope buying guide
            </Link>{" "}
            for the specs in more depth.
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        fitNotes={fitNotes}
        advice={advice}
        howWeChose="We ranked these ten for repair rather than for overall score, weighing channel count, record length, update rate and repair aids such as a built-in generator or multimeter above headline bandwidth. Specs come from desk research against each maker's site, datasheet or official Amazon listing; only the Siglent SDS1104X-E, Rigol DHO804 and Rigol DS1054Z carry our Hands-on Tested badge."
      />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
