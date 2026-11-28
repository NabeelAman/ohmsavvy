// Educational page. Memory depth is a well-established oscilloscope engineering concept — no per-instance citation
// required for the general mechanism per CONTENT_STANDARDS.md §1. Every product-specific memory-depth figure below
// is copied verbatim from an existing verified Pick's own verdict text in src/app/oscilloscopes/*/page.tsx.
import Link from "@/components/AppLink";
import {
  BarChart,
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
const ds1102ze = all.find((p) => p.name === "Rigol DS1102Z-E")!;
const sds1202xe = all.find((p) => p.name === "Siglent SDS1202X-E")!;

const description =
  "What oscilloscope memory depth (Mpts) means, how it trades off with sample rate, and real Mpts figures from verified scopes.";

export const metadata = buildMetadata({
  title: "Oscilloscope Memory Depth Explained",
  description,
  path: "/oscilloscopes/oscilloscope-memory-depth-explained",
  image: ds1102ze.image,
});

const link = "text-accent hover:underline";

/** Memory depth sets how long you can capture at full sample rate before it drops. */
function MemoryDiagram() {
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      role="img"
      aria-label="Memory depth diagram. A scope's acquisition memory fills up as it records samples. A longer time base spreads the same memory across a longer capture window, which forces the effective sample rate down once the memory is full, unless the memory itself is deep enough to keep sampling at full speed."
    >
      <rect x="20" y="40" width="280" height="30" rx="3" className="fill-accent/20 stroke-accent" strokeWidth="1.6" />
      <text x="160" y="60" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Acquisition memory (fixed size)</text>
      <path d="M20 90 H120" className="stroke-foreground" strokeWidth="2" />
      <text x="70" y="85" fontSize="8.5" textAnchor="middle" className="fill-muted">Short window</text>
      <text x="70" y="105" fontSize="8.5" textAnchor="middle" className="fill-accent">Full sample rate</text>
      <path d="M150 90 H300" className="stroke-foreground" strokeWidth="2" />
      <text x="225" y="85" fontSize="8.5" textAnchor="middle" className="fill-muted">Long window</text>
      <text x="225" y="105" fontSize="8.5" textAnchor="middle" className="fill-foreground">Sample rate must drop to fit</text>
      <text x="160" y="135" fontSize="9.5" textAnchor="middle" className="fill-muted">Deeper memory keeps sample rate high over a longer window</text>
    </svg>
  );
}

export default function OscilloscopeMemoryDepthExplainedPage() {
  return (
    <HowToShell
      title="Oscilloscope Memory Depth Explained"
      description={description}
      published="2026-11-28"
      path="/oscilloscopes/oscilloscope-memory-depth-explained"
      category="oscilloscopes"
      intro={
        <>
          Memory depth, usually stated in megapoints (Mpts), is how many samples an oscilloscope can store in one
          acquisition. It matters because a scope&apos;s sample rate and capture time trade off against each other: at a
          fixed memory depth, a longer time base forces the effective sample rate down, since the same number of
          points has to cover a wider window. A deeper memory lets the scope keep sampling fast even when you&apos;re
          capturing a long event, which is exactly when you need the detail most.
        </>
      }
      aside={{
        image: ds1102ze.image,
        alt: "Rigol DS1102Z-E oscilloscope with 24 Mpts of memory",
        caption: (
          <>
            24 Mpts, like the Rigol DS1102Z-E carries, lets the scope hold full sample rate over a much longer
            capture window than an 8 kS USB scope. See{" "}
            <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
              what sample rate (GSa/s) means
            </Link>{" "}
            for the other half of this relationship.
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What memory depth actually is" },
        { id: "math", label: "The math: memory, sample rate and capture time" },
        { id: "real", label: "Real memory depth figures" },
        { id: "when", label: "When memory depth actually matters" },
        { id: "causes", label: "Symptoms and fixes" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "What is a good memory depth for an oscilloscope?",
          a:
            "For general electronics and hobby work, a few megapoints is plenty. 24 Mpts, like the Rigol DS1102Z-E carries, gives real headroom for longer captures at full sample rate. A basic USB scope's 8 kS capture memory is fine for short, simple waveforms but limits how long a window you can capture at full speed.",
        },
        {
          q: "How is memory depth different from sample rate?",
          a:
            "Sample rate is how fast the scope takes samples; memory depth is how many samples it can store from one acquisition. They're linked: capture time at full sample rate equals memory depth divided by sample rate. A scope can have a high sample rate spec but still run out of memory quickly on a long time base.",
        },
        {
          q: "Why does my scope's sample rate drop when I use a longer time base?",
          a:
            "Because memory depth is fixed. Once the acquisition window is longer than what the memory can hold at full sample rate, the scope has to reduce its sample rate to still cover the full window with the points it has. This is normal behavior, not a fault, and it's exactly what deeper memory postpones.",
        },
        {
          q: "Does memory depth affect bandwidth?",
          a:
            "No, they're unrelated specs. Bandwidth is about how fast a signal the scope's front end can faithfully pass through; memory depth is about how long an acquisition it can store. A scope can have high bandwidth and shallow memory, or the reverse.",
        },
        {
          q: "Is more memory depth always better?",
          a:
            "For capturing long events without losing sample rate, yes. It does slow down waveform update rate and processing on some scopes, since more data has to be moved and rendered. For everyday repetitive-signal work, a moderate memory depth is usually the practical sweet spot rather than the absolute maximum available.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/oscilloscope-sample-rate-explained",
          title: "What Does GSa/s Mean?",
          desc: "The other half of the memory-depth-and-capture-time relationship.",
        },
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "A separate, unrelated spec worth understanding alongside memory depth.",
        },
      ]}
    >
      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What memory depth actually is</h2>
        <p className="text-muted leading-7 mb-4">
          Every time an oscilloscope captures a waveform, it stores a fixed number of sample points in its
          acquisition memory before processing and displaying them. Memory depth is simply how many points that
          memory can hold in one go, commonly stated in megapoints (Mpts), with 1 Mpt equal to roughly a million
          samples.
        </p>
      </section>

      <section>
        <h2 id="math" className="text-xl font-semibold mb-3">The math: memory, sample rate and capture time</h2>
        <p className="text-muted leading-7 mb-4">
          The relationship is straightforward: capture time at full sample rate = memory depth ÷ sample rate. A scope
          with 24 Mpts of memory running at 1 GSa/s can hold 24,000,000 ÷ 1,000,000,000 = 0.024 seconds, 24
          milliseconds, of full-speed capture. Ask for a longer window than that, and the scope has to lower its
          sample rate to stretch the same memory across more time.
        </p>
        <Figure caption={<>Same acquisition memory, spread across a short window (full sample rate) versus a long window (sample rate must drop).</>}>
          <MemoryDiagram />
        </Figure>
        <KeyIdea title="Deeper memory buys you a longer full-speed window">
          Doubling the memory depth roughly doubles how long a capture window you can hold at full sample rate. This
          matters most when you&apos;re chasing an intermittent fault or a slow process with fast edges buried inside it.
        </KeyIdea>
      </section>

      <section>
        <h2 id="real" className="text-xl font-semibold mb-3">Real memory depth figures</h2>
        <p className="text-muted leading-7 mb-4">
          These are the actual published memory figures for three already-verified picks on this site, spanning a
          huge real-world range:
        </p>
        <Figure caption={<>Published memory depth, log scale. The Rigol DS1102Z-E has 3,000 times the PicoScope 2204A&apos;s base capture memory.</>}>
          <BarChart
            log
            items={[
              { label: "Rigol DS1102Z-E", value: 24_000_000, display: "24 Mpts", highlight: true },
              { label: "Siglent SDS1202X-E", value: 14_000_000, display: "14 Mpts (one channel)" },
              { label: "PicoScope 2204A", value: 8_000, display: "8 kS (streams to 100 MS over USB)" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The PicoScope 2204A&apos;s 8 kS figure is its onboard capture memory, but it can also stream up to 100 MS over
          USB at a lower effective rate, a different mechanism from a bench scope&apos;s deep acquisition memory. Don&apos;t
          directly compare a streaming figure to a bench scope&apos;s Mpts spec without checking which mode applies to
          your use case.
        </p>
      </section>

      <section>
        <h2 id="when" className="text-xl font-semibold mb-3">When memory depth actually matters</h2>
        <DataTable
          head={["Situation", "Does memory depth matter?", "Why"]}
          rows={[
            ["Repetitive signal, short time base", "Not much", "Capture window is already short enough to stay at full sample rate"],
            ["Chasing an intermittent fault over a long window", "Yes, a lot", "Need full sample rate across a long capture to not miss the event"],
            ["Zooming into one edge after a long capture", "Yes", "Deep memory means more real samples to zoom into, not interpolated ones"],
            ["Simple audio-frequency signal", "Rarely", "Low frequency content doesn't need a long, fast capture"],
          ]}
        />
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Sample rate drops when you widen the time base", "Memory depth limit reached at the shorter time base", "Expected behavior; use a scope with deeper memory for longer full-speed captures"],
            ["Waveform looks fine at a glance but a fast edge seems smoothed", "Effective sample rate dropped on a long time base", "Zoom into a shorter window, or check the scope's actual sample rate at that time base"],
            ["Scope feels sluggish after a long capture", "Deep memory takes longer to process and render", "Normal trade-off; close math/zoom operations you don't need"],
          ]}
        />
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope to use</h2>
        <p className="text-muted leading-7 mb-6">
          For general hobby and electronics work, a few megapoints is comfortable. If you regularly chase
          intermittent faults over long windows, prioritize a scope with deeper published memory.
        </p>
        <ProductStrip
          title="Scopes by memory depth"
          items={[
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z 4-channel oscilloscope",
              href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
              note: "The default beginner bench scope, 4 channels and 50 MHz bandwidth at an approachable price.",
            },
            {
              name: "Rigol DS1102Z-E",
              image: ds1102ze.image,
              alt: "Rigol DS1102Z-E oscilloscope",
              href: "/oscilloscopes/best-beginner-oscilloscopes",
              note: "24 Mpts of memory per Rigol's datasheet, with 100 MHz bandwidth and 1 GSa/s on one channel.",
            },
            {
              name: "Siglent SDS1202X-E",
              image: sds1202xe.image,
              alt: "Siglent SDS1202X-E oscilloscope",
              href: "/oscilloscopes/best-oscilloscopes-for-electronics-repair",
              note: "14 Mpts of memory on one channel, 200 MHz bandwidth and a 100,000 wfm/s update rate.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
