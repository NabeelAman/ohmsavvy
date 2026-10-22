import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure mains frequency with an oscilloscope safely: use a low-voltage AC adaptor, set 5 ms/div, read the 20 ms period of a 50 Hz waveform and check it.";

export const metadata = buildMetadata({
  title: "Measure Mains Frequency With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

/** Safe vs unsafe hookup: probe straight onto a socket (crossed out) and probe on a step-down adaptor's output. */
function HookupDiagram() {
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Diagram comparing an unsafe direct mains connection with a safe low-voltage adaptor connection">
      <g fontSize="10" className="fill-foreground">
        <text x="85" y="14" textAnchor="middle" className="fill-accent">Never</text>
        <text x="255" y="14" textAnchor="middle">Safe method</text>
      </g>
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        {/* unsafe: socket straight to scope */}
        <rect x="20" y="40" width="44" height="54" rx="6" className="fill-surface" />
        <rect x="30" y="54" width="6" height="12" />
        <rect x="48" y="54" width="6" height="12" />
        <rect x="39" y="74" width="6" height="12" />
        <path d="M64 60 H118 V70" />
        <path d="M64 80 H100 V110 H118" strokeDasharray="4 3" />
        <rect x="118" y="60" width="30" height="60" rx="4" className="fill-surface" />
        {/* adaptor path */}
        <rect x="190" y="40" width="44" height="54" rx="6" className="fill-surface" />
        <rect x="200" y="54" width="6" height="12" />
        <rect x="218" y="54" width="6" height="12" />
        <rect x="209" y="74" width="6" height="12" />
        <rect x="244" y="44" width="36" height="46" rx="5" className="fill-surface-raised" />
        <path d="M234 67 H244" />
        <path d="M280 60 H300 V70 M280 78 H292 V110 H300" />
        <rect x="300" y="60" width="30" height="60" rx="4" className="fill-surface" />
      </g>
      <g className="stroke-accent" strokeWidth="3" strokeLinecap="round">
        <line x1="14" y1="34" x2="156" y2="130" />
        <line x1="156" y1="34" x2="14" y2="130" />
      </g>
      <g fontSize="9" className="fill-muted" textAnchor="middle">
        <text x="42" y="108">230 V socket</text>
        <text x="133" y="134">Scope</text>
        <text x="85" y="150">Earthed ground clip on live or</text>
        <text x="85" y="162">neutral = short circuit</text>
        <text x="212" y="108">230 V socket</text>
        <text x="262" y="102">AC adaptor</text>
        <text x="315" y="134">Scope</text>
        <text x="262" y="150">Probe on the low-voltage</text>
        <text x="262" y="162">AC output, isolated from mains</text>
      </g>
      <text x="170" y="192" fontSize="9" textAnchor="middle" className="fill-muted">The adaptor&apos;s output follows mains frequency exactly, at a safe voltage</text>
    </svg>
  );
}

/** A mains-style sine with flattened peaks, as caused by rectifier loads drawing current only at the crest. */
function FlatTopChart() {
  const W = 300;
  const H = 150;
  const cy = H / 2;
  const pts = (clip: number) =>
    Array.from({ length: 301 }, (_, i) => {
      const t = i / 300;
      const v = Math.max(-clip, Math.min(clip, Math.sin(2 * Math.PI * 2 * t)));
      return `${(t * W).toFixed(1)},${(cy - v * 55).toFixed(1)}`;
    }).join(" ");
  return (
    <svg viewBox={`-6 -6 ${W + 12} ${H + 12}`} className="w-full h-auto" role="img" aria-label="Clean sine wave compared with a flat-topped mains waveform">
      <rect x="0" y="0" width={W} height={H} rx="4" className="fill-[#0f1a14]" />
      <line x1="0" y1={cy} x2={W} y2={cy} stroke="#2c4a3a" strokeWidth="1" />
      <polyline points={pts(1)} fill="none" stroke="#7CFC9A" strokeOpacity="0.35" strokeWidth="1.5" />
      <polyline points={pts(0.9)} fill="none" stroke="#ffd56b" strokeWidth="2" />
      <text x="6" y={H - 8} fontSize="10" fill="#9fe3b4">ideal sine (faint) · typical flat-topped mains (yellow)</text>
    </svg>
  );
}

export default function HowToMeasureMainsFrequencyWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Mains Frequency With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-mains-frequency-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure mains frequency with an oscilloscope, never probe the socket directly. Plug in a
          low-voltage AC adaptor or step-down transformer, connect the probe to its output, set the timebase
          to 5 ms/div and read the period: a UK 50 Hz supply repeats every 20 ms, or four divisions. This
          guide covers the safe hookup, the settings, how to turn the trace into a frequency figure, and what a
          real mains waveform looks like.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            A bench scope such as the 50MHz, 4-channel Rigol DS1054Z has far more bandwidth than a 50 Hz
            signal needs; the hookup is what matters. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-not-direct", label: "Why you can't probe the socket" },
        { id: "safe-signal", label: "Get a safe copy of the mains" },
        { id: "scope-settings", label: "Set the probe and scope" },
        { id: "measure-50hz-waveform", label: "Measure a 50 Hz waveform" },
        { id: "check-the-reading", label: "Check with the scope's counter" },
        { id: "what-is-normal", label: "What reading is normal?" },
        { id: "waveform-shape", label: "Why mains isn't a perfect sine" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "Can I measure mains frequency with a normal oscilloscope probe?",
          a: "Not directly on the mains. A bench scope's probe ground clip is connected to mains earth through the power cord, so clipping it to live or neutral creates a short circuit through the scope. Measure the low-voltage side of an isolating adaptor or transformer instead, or use a differential probe rated for mains voltage and the correct measurement category.",
        },
        {
          q: "Does a step-down transformer change the frequency?",
          a: "No. A transformer changes voltage, not frequency, so the AC on its secondary repeats at exactly the same rate as the mains feeding it. That is why a plain AC-output adaptor is such a convenient, safe way to watch mains frequency. A DC adaptor will not work, because it rectifies and smooths the output.",
        },
        {
          q: "What time per division should I use for 50 Hz?",
          a: "5 ms/div is a good starting point: the screen spans 50 ms, which shows two and a half cycles of a 20 ms period. Use 2 ms/div to make one cycle fill most of the screen for a closer period reading, or 10 ms/div to see five cycles for an averaged measurement.",
        },
        {
          q: "Why does my scope show 49.98 Hz instead of exactly 50 Hz?",
          a: "Because the grid really does drift. Supply frequency rises slightly when generation exceeds demand and falls when demand exceeds generation, and system operators continuously correct it. A reading a few hundredths of a hertz either side of 50 is normal, within the resolution and timebase accuracy of a hobby scope.",
        },
        {
          q: "What is the line trigger on an oscilloscope?",
          a: "Many bench scopes offer AC line as a trigger source, taken internally from the scope's own power input. It locks the display to mains frequency without any probe on the mains, which is useful for spotting hum or interference that is synchronised to 50 Hz in the circuit you are actually measuring.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope",
          title: "How to Measure Frequency With an Oscilloscope",
          desc: "The general f = 1/T method, cursors and auto measurements for any signal.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge, level and source settings that make a repeating trace stand still.",
        },
      ]}
    >
      <Callout title="Mains can kill: read this before you connect anything">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Do not connect a standard oscilloscope probe to a mains socket, plug or wiring. The probe&apos;s
            ground clip is bonded to earth through the scope&apos;s power lead, so touching it to live (or even
            neutral) can short the supply, destroy the probe and scope, and cause burns.
          </li>
          <li>
            Never defeat the scope&apos;s earth to &quot;float&quot; it. That puts mains voltage on the metal
            parts you touch.
          </li>
          <li>
            Use one of the safe methods below. If you are not sure a piece of equipment is rated for the
            voltage, do not use it.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-not-direct" className="text-xl font-semibold mb-3">Why you can&apos;t probe the socket directly</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter is floating: neither lead is tied to earth. A mains-powered bench oscilloscope is
          different. Every channel&apos;s ground shares the chassis, and the chassis is earthed for your
          safety. In UK wiring the neutral is also tied to earth back at the supply, so a ground clip on live
          shorts live to earth, and even a clip on neutral can carry fault current. Standard 10x probes are
          also not designed or rated for direct mains work.
        </p>
        <Figure caption={<>Left: the mistake that destroys probes. Right: an AC adaptor gives you an isolated, low-voltage copy of the mains waveform.</>}>
          <HookupDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="safe-signal">Get a safe copy of the mains</StepHeading>
        <p className="text-muted leading-7 mb-4">There are three sensible ways to see mains frequency on a scope:</p>
        <DataTable
          head={["Method", "How it works", "Best for"]}
          rows={[
            ["AC-output adaptor or step-down transformer", "Isolated secondary gives roughly 9 to 12 V AC at mains frequency", "Hobby benches: cheap and safe"],
            ["Differential probe rated for mains", "Measures between two points without using the scope ground", "Seeing the real waveform shape at full voltage"],
            ["AC line trigger", "Scope triggers internally from its own supply", "Syncing to 50 Hz without measuring mains at all"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The adaptor method is the one to use for a frequency check. Look for an adaptor whose label says
          AC output (often marked &quot;AC 12V&quot; with a sine symbol), not DC. Plug it in, then attach the
          probe tip to one output wire and the ground clip to the other.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="scope-settings">Set the probe and scope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch the probe to 10x and set the channel attenuation to match. A 12 V AC adaptor can reach about
          17 V peak, or higher with no load, so start at 5 V/div. Choose DC coupling, trigger on a rising edge
          of the same channel with the level near 0 V, and set the timebase to 5 ms/div.
        </p>
        <Figure caption={<>How many 50 Hz cycles fit on a ten-division screen at each timebase setting. 5 ms/div is the comfortable middle.</>}>
          <BarChart
            items={[
              { label: "2 ms/div", value: 1, display: "1 cycle" },
              { label: "5 ms/div", value: 2.5, display: "2.5 cycles", highlight: true },
              { label: "10 ms/div", value: 5, display: "5 cycles" },
              { label: "20 ms/div", value: 10, display: "10 cycles" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="measure-50hz-waveform">How to measure a 50 Hz waveform on an oscilloscope</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a stable trace, pick two matching points one cycle apart, such as two rising zero crossings or
          two positive peaks, and count the horizontal divisions between them. At 5 ms/div a 50 Hz waveform
          spans four divisions per cycle.
        </p>
        <Figure caption={<>A 50 Hz sine at 5 ms/div: one period spans 4 divisions, so T = 4 × 5 ms = 20 ms and f = 1 ÷ 0.020 s = 50 Hz.</>}>
          <ScopeScreen
            wave="sine"
            cycles={2.5}
            amplitude={3}
            triggerLevel={0}
            marks={[{ x1: 1, y1: 0.6, x2: 5, y2: 0.6, text: "T = 4 div = 20 ms" }]}
            labels={{ left: "CH1 5 V/div", right: "5 ms/div" }}
          />
        </Figure>
        <FlowDiagram
          steps={[
            { label: "Count", sub: "4 divisions per cycle" },
            { label: "× time/div", sub: "4 × 5 ms = 20 ms" },
            { label: "f = 1 / T", sub: "1 ÷ 0.020 = 50 Hz" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a finer reading, measure across several cycles at 10 ms/div and divide: five cycles spanning the
          full 100 ms screen still gives 20 ms each, but a small counting error is shared across all five.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="check-the-reading">Check with the scope&apos;s counter or cursors</StepHeading>
        <p className="text-muted leading-7">
          Open the measure menu and add frequency and period for the channel. Most digital scopes calculate
          these from the captured trace and update them live, and some also have a separate hardware
          frequency counter with more digits. Vertical time cursors are the third check: place one on each
          rising zero crossing and read Δt and 1/Δt. If the three methods agree within a fraction of a hertz,
          you can trust the result. If the auto value jumps around, the trigger is probably unstable; our{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            triggering guide
          </Link>{" "}
          covers the fix.
        </p>
      </section>

      <section>
        <h2 id="what-is-normal" className="text-xl font-semibold mb-3">What reading is normal?</h2>
        <DataTable
          head={["Supply", "Nominal frequency", "Period", "Divisions per cycle at 5 ms/div"]}
          rows={[
            ["UK and most of Europe", "50 Hz", "20 ms", "4"],
            ["North America", "60 Hz", "16.7 ms", "3.3"],
            ["Japan", "50 Hz east, 60 Hz west", "20 or 16.7 ms", "4 or 3.3"],
          ]}
          mono={[1, 2]}
        />
        <KeyIdea title="The GB grid moves, a little">
          The GB grid is normally held within ±1% of 50 Hz, so anything from 49.5 Hz to 50.5 Hz is within
          normal operating limits, and day-to-day readings usually sit much closer than that. A hobby scope&apos;s
          timebase is accurate enough to see that the frequency is right, but not to track those small
          movements precisely.
        </KeyIdea>
      </section>

      <section>
        <h2 id="waveform-shape" className="text-xl font-semibold mb-3">Why mains isn&apos;t a perfect sine</h2>
        <p className="text-muted leading-7 mb-4">
          Do not be surprised if the peaks look slightly flattened. Many appliances and chargers use a
          rectifier and capacitor, which draw current only near the top of each cycle. Across millions of
          such loads that trims the crests and adds harmonics at 150 Hz, 250 Hz and above. The frequency is
          unaffected, so the period reading stays the same; only the shape changes.
        </p>
        <Figure caption={<>Flat-topping is common on real supplies and is passed through an adaptor too. It does not change the 20 ms period.</>}>
          <FlatTopChart />
        </Figure>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any working digital scope can resolve 50 Hz: bandwidth and sample rate are not the limit here. What
          helps is a measure menu with a frequency readout and, for interference hunting, an AC line trigger
          source. The general method for other signals is in{" "}
          <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
            how to measure frequency with an oscilloscope
          </Link>
          , and the full roundup is in{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>
          .
        </p>
        <ProductStrip
          title="Scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel 50MHz digital bench oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels: plenty of headroom for mains and audio work.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel 100MHz digital bench oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, with a well-regarded interface.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel 100MHz oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels and a built-in waveform generator.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
