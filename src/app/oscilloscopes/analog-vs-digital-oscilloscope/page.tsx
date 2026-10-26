import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  SamplingChart,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Analog vs digital oscilloscopes: analog draws the signal live with no sampling or memory, while digital samples and stores it — with a real aliasing trade-off.";

export const metadata = buildMetadata({
  title: "Analog vs Digital Oscilloscopes",
  description,
  path: "/oscilloscopes/analog-vs-digital-oscilloscope",
});

const link = "text-accent hover:underline";

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

export default function AnalogVsDigitalOscilloscopePage() {
  return (
    <HowToShell
      title="Analog vs Digital Oscilloscopes"
      description={description}
      path="/oscilloscopes/analog-vs-digital-oscilloscope"
      category="oscilloscopes"
      published="2026-10-21"
      intro={
        <>
          The difference goes deeper than one being older than the other: an analog scope steers an
          electron beam directly from the input signal in real time, with no sampling step at all, while
          a digital scope converts the signal into discrete samples, stores them, and redraws the
          waveform from that stored data. That one architectural difference is behind almost every
          practical trade-off between the two.
        </>
      }
      toc={[
        { id: "how-analog-works", label: "How an analog (CRT) scope works" },
        { id: "how-digital-works", label: "How a digital scope works" },
        { id: "sample-moments", label: "Continuous beam vs. discrete sample moments" },
        { id: "the-aliasing-trade-off", label: "The aliasing trade-off, unique to digital" },
        { id: "storage-crt-history", label: "Analog's one attempt at “freezing” a capture" },
        { id: "side-by-side", label: "Side-by-side comparison" },
        { id: "where-analog-still-has-an-edge", label: "Where analog still has a genuine edge" },
        { id: "which-should-you-buy", label: "Which should you actually buy today" },
      ]}
      faq={[
        {
          q: "Can a digital scope ever fully replace what an analog scope shows?",
          a: "For the vast majority of modern work, yes — digital scopes have closed most of the practical gap, including emulating analog-style intensity grading through \"digital phosphor\" display modes. The one thing digital fundamentally can't offer is a true, zero-sampling real-time display with no aliasing risk whatsoever, though at sufficient sample rates this is rarely a practical limitation.",
        },
        {
          q: "Are analog oscilloscopes still manufactured new?",
          a: "They're now rare in new production — most current scope lineups from major manufacturers are entirely digital. Analog scopes you'll encounter today are mostly older used units, still functional and useful for certain teaching or legacy applications, but not where most buyers should look for a primary scope.",
        },
        {
          q: "What does \"digital phosphor\" mode actually do?",
          a: "It's a digital scope feature that emulates the analog CRT's intensity-grading behavior, varying trace brightness or color based on how often each point on the display is hit across many acquisitions. This recovers much of the \"frequency of occurrence\" information an analog scope's phosphor naturally shows, while keeping digital's storage and measurement advantages.",
        },
        {
          q: "Is aliasing something I need to worry about on a modern digital scope?",
          a: "Rarely, as long as the scope's sample rate is comfortably higher than the frequency content of what you're measuring — a common rule of thumb is at least 5-10x the highest frequency of interest. It becomes a real concern mainly when probing signals near or above a scope's rated sample rate, or when using overly aggressive memory-saving settings that reduce the effective sample rate.",
        },
        {
          q: "Is a cheap used analog oscilloscope a good first scope for a beginner?",
          a: "It can teach the basics of triggering and timebase, but it is usually a poor first buy. Old units often need recalibration, worn switches and tired CRTs are common, and you lose single-shot capture, cursors and automatic measurements that make learning faster. An entry-level digital bench scope does everything the analog one does for hobby signals, plus storage and screenshots.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/what-is-an-oscilloscope",
          title: "What Is an Oscilloscope?",
          desc: "The full range of oscilloscope types, including mixed-signal, handheld, and PC-based scopes.",
        },
        {
          href: "/oscilloscopes/oscilloscope-buying-guide",
          title: "Oscilloscope Buying Guide",
          desc: "Bandwidth, sample rate, and channel count explained for a modern digital scope purchase.",
        },
      ]}
    >
      <section>
        <h2 id="how-analog-works" className="text-xl font-semibold mb-3">How an analog (CRT) oscilloscope works</h2>
        <p className="text-muted leading-7">
          An analog scope steers an electron beam directly: the input signal&apos;s voltage deflects the
          beam vertically while a timebase circuit sweeps it horizontally, striking a phosphor-coated
          screen that glows briefly where the beam hits. There is no sampling, no analog-to-digital
          conversion, and no memory — what you see is the signal driving the display in true real time,
          with the phosphor&apos;s brief persistence being the only thing that makes a repeating waveform
          appear as a continuous trace rather than a single moving dot.
        </p>
      </section>

      <section>
        <h2 id="how-digital-works" className="text-xl font-semibold mb-3">How a digital storage oscilloscope works</h2>
        <p className="text-muted leading-7">
          A digital scope&apos;s front end samples the incoming signal at discrete moments in time (the
          sample rate), converts each sample to a digital value, stores a sequence of them in memory,
          and draws the waveform on an LCD by connecting those stored points. This is what enables
          freezing a capture, taking automatic measurements, exporting data, and single-shot triggering
          — all of which depend on actually having the waveform stored as data, not just displayed live.
        </p>
      </section>

      <section id="sample-moments">
        <h2 className="text-xl font-semibold mb-3">Continuous beam vs. discrete sample moments</h2>
        <p className="text-muted leading-7 mb-4">
          Visualized over time, the difference is literal: an analog beam traces every instant of the
          signal continuously, while a digital scope only knows the signal&apos;s value at the specific
          moments it samples, filling in the gaps between those moments when it redraws the trace.
        </p>
        <Figure
          caption={
            <>
              An analog beam (smooth curve) tracks the signal at every instant. A digital scope only
              captures the signal&apos;s value at discrete sample moments (dots), reconstructing the rest.
            </>
          }
        >
          <svg viewBox="0 0 300 110" className="w-full h-auto" role="img" aria-label="Diagram comparing a continuous analog trace to discrete digital sample moments">
            <polyline
              fill="none"
              className="stroke-foreground"
              strokeWidth="2"
              points={Array.from({ length: 121 }, (_, i) => `${(i * 2.5).toFixed(1)},${(30 - 20 * Math.sin((i / 120) * 4 * Math.PI)).toFixed(1)}`).join(" ")}
            />
            <text x="10" y="10" fontSize="9" className="fill-foreground">Analog: continuous beam</text>
            <polyline
              fill="none"
              className="stroke-accent"
              strokeWidth="1.5"
              strokeDasharray="3 2"
              points={Array.from({ length: 121 }, (_, i) => `${(i * 2.5).toFixed(1)},${(90 - 20 * Math.sin((i / 120) * 4 * Math.PI)).toFixed(1)}`).join(" ")}
            />
            {Array.from({ length: 13 }, (_, i) => {
              const t = (i / 12) * 300;
              const y = 90 - 20 * Math.sin((t / 300) * 4 * Math.PI);
              return <circle key={i} cx={t} cy={y} r="3" className="fill-accent" />;
            })}
            <text x="10" y="70" fontSize="9" className="fill-accent">Digital: discrete samples, line fitted between</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="the-aliasing-trade-off" className="text-xl font-semibold mb-3">The aliasing trade-off, unique to digital</h2>
        <p className="text-muted leading-7 mb-4">
          Sampling introduces a risk analog scopes simply don&apos;t have: if the sample rate isn&apos;t
          high enough relative to the signal&apos;s frequency content, the reconstructed waveform can
          show a false, lower-frequency pattern that was never actually present — a phenomenon called
          aliasing. An analog scope, with no sampling step, can&apos;t alias in this way, since the beam
          tracks the actual instantaneous signal continuously.
        </p>
        <Figure
          caption={
            <>
              Too few samples per cycle (yellow trace) can reconstruct a false, slower-looking wave than
              the real signal (faint green) actually is — a digital-only risk that a continuously-driven
              analog beam never has.
            </>
          }
        >
          <SamplingChart cycles={8} samples={9} label="Undersampled signal showing aliasing on a digital scope" />
        </Figure>
      </section>

      <section>
        <h2 id="side-by-side" className="text-xl font-semibold mb-3">Side-by-side comparison</h2>
        <DataTable
          head={["", "Analog (CRT)", "Digital (DSO)"]}
          rows={[
            ["Display method", "Electron beam driven live by the signal", "Sampled, stored, then redrawn from memory"],
            ["Freeze / single-shot capture", "Not possible on standard analog scopes", "Standard feature"],
            ["Automatic measurements, cursors", "Not available", "Standard feature"],
            ["Aliasing risk", "None — no sampling takes place", "Possible if sample rate is too low for the signal"],
            ["Intensity grading (occurrence frequency)", "Natural, built into the phosphor's behavior", "Emulated via \"digital phosphor\" display modes"],
            ["Availability new", "Rare — mostly discontinued", "Standard across all current scope lineups"],
          ]}
        />
      </section>

      <section id="storage-crt-history">
        <KeyIdea title="Analog's one attempt at &quot;freezing&quot; a capture">
          Before digital storage existed, a small number of specialized analog instruments —
          &quot;storage oscilloscopes&quot; — used a special mesh and phosphor inside the CRT that
          could hold a captured trace glowing for an extended time after the beam had moved on,
          specifically to let engineers study a one-off or slow-moving event without it vanishing
          instantly. It was a genuinely clever analog workaround for the same problem digital memory
          solves outright, though it never offered anything like exporting data or taking automatic
          measurements.
        </KeyIdea>
      </section>

      <section id="where-analog-still-has-an-edge">
        <Callout title="Where analog still has a genuine edge">
          A true analog display has zero sampling delay and zero aliasing risk by its very nature, and
          its natural intensity grading can make rare glitches or jitter visually obvious as a faint
          trace against a brighter main waveform. These are real, physics-based advantages — just
          increasingly narrow ones as digital scopes&apos; sample rates and digital phosphor emulation
          have improved.
        </Callout>
      </section>

      <section>
        <h2 id="which-should-you-buy" className="text-xl font-semibold mb-3">Which should you actually buy today?</h2>
        <p className="text-muted leading-7">
          For virtually all modern hobbyist, repair, and professional work, a digital scope is the
          practical choice — the storage, measurement, and triggering flexibility it offers outweighs
          analog&apos;s narrow advantages for nearly everyone. See our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          for what to check on a digital scope, and{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what is an oscilloscope
          </Link>{" "}
          for how the other types (mixed-signal, handheld, PC-based) fit in alongside this core
          analog-vs-digital distinction.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Digital scopes worth considering"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel digital benchtop oscilloscope with a 7-inch display",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "4 channels, 50MHz, 1 GSa/s — well above most hobby signals.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel digital benchtop oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "Bench scope: 4 channels, 100MHz, 1 GSa/s.",
              },
              {
                name: "FNIRSI DSO152",
                image: fnirsi.image,
                alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
                href: "/oscilloscopes/fnirsi-dso152-review",
                note: "Pocket-sized digital scope for quick, low-frequency checks.",
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
