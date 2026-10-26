import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to compare clock jitter using an oscilloscope: persistence edge spread, period statistics, two-clock and before/after tests, and the scope's own floor.";

export const metadata = buildMetadata({
  title: "Compare Clock Jitter Using an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-compare-clock-jitter-using-an-oscilloscope",
});

const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

const link = "text-accent hover:underline";

// Edge offsets (px) for overlaid sweeps of the edge one period after the
// trigger: a persistence display stacks them into a band.
const SPREAD = [0, -6, 3, -2, 7, -8, 2, -4, 9, -3, 5, -7, 1, 4, -1, 6, -5];
const minEdge = 160 + Math.min(...SPREAD);
const maxEdge = 160 + Math.max(...SPREAD);

// Ideal vs real clock edges for the definitions figure (x positions, px).
const IDEAL = [30, 90, 150, 210, 270];
const REAL = [30, 96, 148, 218, 266];

export default function CompareClockJitterPage() {
  return (
    <HowToShell
      title="How to Compare Clock Jitter Using an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-compare-clock-jitter-using-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Swapped a crystal, changed a PLL setting or added filtering to a clock&apos;s supply, and want
          to know whether it helped? You can compare clock jitter using an oscilloscope without a
          dedicated timing analyzer, as long as you measure both cases the same way and know where the
          scope&apos;s own limits begin. Jitter is the small, restless variation in when each edge
          arrives. This guide explains the three common ways to describe it, then shows a persistence
          method and a statistics method for side-by-side comparisons.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel digital oscilloscope",
        caption: (
          <>
            Comparing two clocks at once needs two channels; the Hantek DSO2D10 in our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              full review
            </Link>{" "}
            lists 2 channels, 100MHz and 1 GSa/s.
          </>
        ),
      }}
      toc={[
        { id: "jitter-types", label: "Period, cycle-to-cycle and TIE" },
        { id: "probe", label: "Probe the clock cleanly" },
        { id: "persistence", label: "Trigger and watch a later edge" },
        { id: "cursor-spread", label: "Measure the edge spread" },
        { id: "statistics", label: "Use period statistics" },
        { id: "compare", label: "Compare two clocks fairly" },
        { id: "floor", label: "The scope's own jitter floor" },
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "scopes", label: "Scopes for jitter comparisons" },
      ]}
      faq={[
        {
          q: "Why does my peak-to-peak jitter keep growing the longer I leave persistence on?",
          a: "Random jitter has no hard upper limit; rare, larger deviations keep turning up as the number of edges grows. Peak-to-peak readings therefore depend on how long you collected. For a fair comparison, use the same number of cycles or the same collection time for both clocks, or compare standard deviation, which settles to a stable value.",
        },
        {
          q: "Is the standard deviation of the period the same as RMS jitter?",
          a: "It is the RMS period jitter: the spread of individual period measurements around their mean. It is not the same as RMS time interval error or phase jitter, which are measured against an ideal reference clock and usually need a jitter analysis option or a phase noise analyzer.",
        },
        {
          q: "Can a 50 MHz or 100 MHz scope measure jitter on a 25 MHz clock?",
          a: "It can show gross jitter and let you compare two setups, but its rise time rounds the edges and its own trigger and timebase jitter set a floor. If the two cases you are comparing both read close to that floor, the scope cannot tell them apart, and you need a better instrument or the two-channel floor check described below.",
        },
        {
          q: "Should I measure jitter on the rising or the falling edge?",
          a: "Pick one and use it for every measurement in the comparison. Rising and falling edges can have different slew rates and thresholds, and a clock with uneven duty cycle can show different numbers on each. Most datasheets specify rising-edge jitter, so that is a sensible default.",
        },
        {
          q: "Does clock jitter matter for UART, I2C or SPI?",
          a: "Rarely at hobby speeds. These buses sample each bit in the middle of a period lasting microseconds, so jitter of a few nanoseconds is a tiny fraction of the timing margin. Jitter starts to matter for high-speed links, audio converters, radio and precise timing. If a slow bus fails, check baud-rate mismatch, edge quality and ground first, and suspect jitter last.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator",
          title: "Check a Crystal Oscillator",
          desc: "Confirm a crystal is running, at the right frequency and amplitude, before judging its jitter.",
        },
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches",
          title: "Use Persistence to Find Glitches",
          desc: "Variable and infinite persistence explained, the display mode behind the edge-spread method.",
        },
      ]}
    >
      <section id="jitter-types">
        <h2 className="text-xl font-semibold mb-3">Period jitter, cycle-to-cycle jitter and TIE</h2>
        <p className="text-muted leading-7 mb-4">
          All three describe the same wobble from a different angle. Period jitter is how much each
          individual period differs from the average period. Cycle-to-cycle jitter is the change from one
          period to the very next. Time interval error (TIE) compares each edge with where a perfect clock
          at the same average frequency would have put it, so slow drifts accumulate in TIE even when
          neighboring periods look almost identical. A basic scope measures period jitter directly; TIE
          usually needs a jitter analysis feature.
        </p>
        <Figure
          caption={
            <>
              Ideal edges (dashed blue) at a fixed spacing, and the real clock&apos;s edges (green). Each
              real period differs a little from the ideal one; TIE is the offset of each real edge from
              its ideal position.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Timeline comparing ideal clock edges with real jittered edges, labeling period, cycle-to-cycle difference and time interval error">
            <rect x="0" y="0" width="300" height="150" rx="4" className="fill-[#0f1a14]" />
            {IDEAL.map((x) => (
              <line key={`i${x}`} x1={x} y1="20" x2={x} y2="120" stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3" />
            ))}
            {REAL.map((x) => (
              <line key={`r${x}`} x1={x} y1="36" x2={x} y2="104" stroke="#7CFC9A" strokeWidth="2.2" />
            ))}
            <line x1={REAL[0]} y1="60" x2={REAL[1]} y2="60" stroke="#ffd56b" strokeWidth="1.2" />
            <text x={(REAL[0] + REAL[1]) / 2} y="55" fontSize="9" textAnchor="middle" fill="#ffd56b">T1</text>
            <line x1={REAL[1]} y1="76" x2={REAL[2]} y2="76" stroke="#ffd56b" strokeWidth="1.2" />
            <text x={(REAL[1] + REAL[2]) / 2} y="71" fontSize="9" textAnchor="middle" fill="#ffd56b">T2</text>
            <line x1={IDEAL[3]} y1="112" x2={REAL[3]} y2="112" stroke="#ffd56b" strokeWidth="2" />
            <text x={REAL[3] + 4} y="128" fontSize="9" fill="#ffd56b">TIE</text>
            <text x="6" y="14" fontSize="9" fill="#5BB3E8">ideal</text>
            <text x="40" y="14" fontSize="9" fill="#7CFC9A">real</text>
            <text x="150" y="144" fontSize="9" textAnchor="middle" fill="#9fe3b4">period jitter: T1, T2 vs mean · cycle-to-cycle: T2 − T1</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="probe">Probe the clock cleanly</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Timing jitter you add with the probe is indistinguishable from jitter in the clock. Use a 10x
          probe with the short ground spring right next to the clock pin; a long ground lead rings on
          fast edges and picks up noise, and both move the threshold crossing. Probe the clock at its
          load, or at a test pad close to it, and keep the same probe point for every measurement in a
          comparison. If you are checking a crystal circuit, probe the buffered output, since the
          crystal pins themselves are easily disturbed by probe capacitance.
        </p>
        <Figure
          caption={
            <>
              Two clocks probed at once for a direct comparison: each probe has a short ground spring to
              the ground pad next to its clock pin. The same hookup works for a before/after test on one
              clock, using CH1 only.
            </>
          }
        >
          <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Setup diagram with two clock sources on a board, CH1 and CH2 probes on their outputs with short ground springs to nearby ground pads">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="40" width="320" height="100" rx="6" className="fill-surface" />
              <rect x="40" y="70" width="60" height="40" rx="3" />
              <rect x="200" y="70" width="60" height="40" rx="3" />
              <path d="M100 85 H150 M260 85 H310" />
            </g>
            <g className="stroke-accent" strokeWidth="2" fill="none">
              <line x1="130" y1="85" x2="130" y2="18" />
              <line x1="290" y1="85" x2="290" y2="18" />
              <path d="M130 100 q6 6 0 12" strokeWidth="1.6" />
              <path d="M290 100 q6 6 0 12" strokeWidth="1.6" />
            </g>
            <circle cx="130" cy="85" r="4" className="fill-accent" />
            <circle cx="290" cy="85" r="4" className="fill-accent" />
            <rect x="124" y="112" width="12" height="8" className="fill-muted" />
            <rect x="284" y="112" width="12" height="8" className="fill-muted" />
            <g fontSize="10" textAnchor="middle" className="fill-foreground">
              <text x="70" y="88">Clock A</text>
              <text x="70" y="101" fontSize="9">(old crystal)</text>
              <text x="230" y="88">Clock B</text>
              <text x="230" y="101" fontSize="9">(new PLL)</text>
              <text x="130" y="12" className="fill-accent">CH1</text>
              <text x="290" y="12" className="fill-accent">CH2</text>
              <text x="170" y="160" fontSize="9" className="fill-muted">ground spring to the GND pad beside each clock pin</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="persistence">Trigger on one edge and watch a later one</StepHeading>
        <p className="text-muted leading-7">
          Set an edge trigger on the clock&apos;s rising edge with the level at mid-swing. The edge at the
          trigger point always lands in the same place, by definition, so it tells you nothing about
          jitter. Move the horizontal position so the next rising edge, one period later, sits in the
          middle of the screen, then zoom the timebase until that single edge fills several divisions.
          Turn on persistence: each sweep&apos;s edge lands slightly earlier or later, and they pile up
          into a band. A quick primer on persistence modes is in our{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
            persistence guide
          </Link>
          . Looking several periods after the trigger instead shows how jitter accumulates over N
          cycles, which is often more revealing for a PLL.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="cursor-spread">Measure the width of the edge band</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Leave infinite persistence running for a fixed time, then place one vertical time cursor on
          the earliest edge in the band and the other on the latest, both at the trigger level. The Δt
          readout is the peak-to-peak period jitter collected during that time, plus the scope&apos;s
          own contribution. Write down how long you collected; a longer run catches rarer outliers and
          reads wider.
        </p>
        <Figure
          caption={
            <>
              The edge one period after the trigger, with infinite persistence. Seventeen sweeps stack
              into a band; cursors at its outer edges give the peak-to-peak spread.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Persistence display of many overlaid clock edges forming a band, with two time cursors marking its earliest and latest edges">
            <rect x="0" y="0" width="320" height="170" rx="4" className="fill-[#0f1a14]" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <line key={i} x1={i * 32} y1="0" x2={i * 32} y2="145" stroke="#2c4a3a" strokeWidth={i === 5 ? 1.2 : 0.6} strokeDasharray={i === 5 ? "" : "2 3"} />
            ))}
            <line x1="0" y1="80" x2="320" y2="80" stroke="#f0b429" strokeWidth="0.8" strokeDasharray="5 4" />
            {SPREAD.map((j, k) => (
              <path
                key={k}
                d={`M0 125 H${150 + j} L${170 + j} 35 H320`}
                fill="none"
                stroke="#7CFC9A"
                strokeOpacity="0.28"
                strokeWidth="1.5"
              />
            ))}
            <g stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3">
              <line x1={minEdge} y1="10" x2={minEdge} y2="145" />
              <line x1={maxEdge} y1="10" x2={maxEdge} y2="145" />
            </g>
            <line x1={minEdge} y1="20" x2={maxEdge} y2="20" stroke="#ffd56b" strokeWidth="1.4" />
            <text x={maxEdge + 6} y="24" fontSize="10" fill="#ffd56b">Δt = pk-pk spread</text>
            <text x="316" y="76" fontSize="9" textAnchor="end" fill="#f0b429">trigger level</text>
            <text x="6" y="162" fontSize="9" fill="#9fe3b4">edge one period after trigger, infinite persistence</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="statistics">Use the period measurement with statistics</StepHeading>
        <p className="text-muted leading-7">
          Persistence gives a picture; statistics give numbers you can compare. Add a period (or
          frequency) measurement on the clock channel and switch on measurement statistics, which many
          scopes provide. The readout then tracks the mean, minimum, maximum and standard deviation over
          a growing count of measurements. Standard deviation is the RMS period jitter and is the most
          stable figure for comparisons. Max minus min is the peak-to-peak period jitter for that count.
          Some scopes measure one period per acquisition, others every period in the record; either way,
          let the count reach the same value, a few thousand is a reasonable target, before you write
          the result down.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="compare">Compare two clocks, or one clock before and after</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For two clocks running at the same time, put one on each channel with identical probes,
          settings and measurements, and read both sets of statistics together. For a before/after test
          on one clock, such as a different crystal, a new PLL configuration or added supply filtering,
          keep everything else fixed: same probe point, timebase, trigger level and count. Clear the
          statistics after the change, not before, so the old readings do not mix in.
        </p>
        <DataTable
          head={["Keep identical", "Why it matters"]}
          rows={[
            ["Probe type and ground method", "A long ground lead adds ringing that shifts edge timing"],
            ["Trigger level and edge", "Rising and falling edges can carry different jitter"],
            ["Timebase and sample rate", "Coarser sampling and interpolation change the timing resolution"],
            ["Number of measurements", "Peak-to-peak grows with count; standard deviation settles"],
            ["Board temperature and supply load", "Both shift oscillator behavior during a test"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          If the clock comes from a crystal, confirm it is running correctly before chasing jitter; our
          guide to{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope-to-check-a-crystal-oscillator" className={link}>
            checking a crystal oscillator
          </Link>{" "}
          covers frequency, amplitude and start-up.
        </p>
      </section>

      <section id="floor">
        <h2 className="text-xl font-semibold mb-3">The scope&apos;s own jitter floor</h2>
        <p className="text-muted leading-7 mb-4">
          Every scope adds a little timing uncertainty of its own: trigger jitter, timebase jitter, and
          the limits of its sample interval and interpolation. Vertical noise also turns into timing
          error, because noise moves the moment a slope crosses the threshold. The timing error is
          roughly the noise voltage divided by the edge&apos;s slew rate, so slow edges are much more
          sensitive. The chart applies that to 10 mV of noise on a 3.3 V clock edge, using a 10% to 90%
          slew estimate.
        </p>
        <BarChart
          log
          items={[
            { label: "1 ns rise time", value: 3.8, display: "≈ 3.8 ps", highlight: true },
            { label: "10 ns rise time", value: 38, display: "≈ 38 ps" },
            { label: "100 ns rise time", value: 380, display: "≈ 380 ps" },
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Measure the floor with a split signal">
            Feed the same clock into CH1 and CH2 through matched probes, trigger on CH1 and measure the
            CH1-to-CH2 delay with statistics. The clock&apos;s own jitter appears identically on both
            channels and cancels, so the spread left over is roughly what the scope and probes add. If
            the difference between your two clocks is not clearly larger than that, the comparison is
            inconclusive.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting jitter comparisons</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Edge band looks wide on both clocks equally", "Measurement at the scope's floor", "Run the split-signal floor check; use faster edges or a better instrument"],
            ["Peak-to-peak differs run to run", "Different collection times", "Compare standard deviation, or fix the count"],
            ["Jitter changes when you move the probe ground", "Ground-lead pickup and ringing", "Use the short ground spring at the clock pin"],
            ["Band has two distinct clusters", "Deterministic jitter, such as supply ripple or a nearby clock", "Check the clock supply and look for coupling from other signals"],
            ["Crystal stops or shifts when probed", "Probe capacitance loading the oscillator", "Probe a buffered output instead of the crystal pins"],
          ]}
        />
      </section>

      <section id="safety">
        <Callout title="Keep probing safe on powered boards">
          Clock pins sit among closely spaced pins, and a slipping probe can short a supply to ground.
          Use a probe hook or a soldered test point, and never connect a mains-earthed scope ground to a
          non-isolated mains circuit.
        </Callout>
      </section>

      <section id="scopes">
        <h2 className="text-xl font-semibold mb-3">Scopes for jitter comparisons</h2>
        <p className="text-muted leading-7 mb-4">
          Jitter work rewards a high sample rate and bandwidth well above the clock frequency, because both set how precisely the scope can place each edge in time. The scope&apos;s own timebase stability caps how small a jitter difference you can resolve.
        </p>
        <ProductStrip
          title="Scopes for timing and jitter work"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 1 GSa/s and 4 channels: enough to compare two clocks side by side with headroom on edges.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz and 1 GSa/s in a compact two-channel body, enough for one reference clock and one under test.",
            },
            {
              name: "Rigol DHO804",
              image: dho804.image,
              alt: "Rigol DHO804 12-bit four-channel oscilloscope with touchscreen",
              href: "/oscilloscopes/best-beginner-oscilloscopes#rigol-dho804",
              note: "70MHz, up to 1.25 GSa/s with one channel on, plus a 7-inch touchscreen for dragging cursors.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
