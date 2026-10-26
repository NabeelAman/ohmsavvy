import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to capture a brief voltage spike with an oscilloscope: Single or Normal trigger, a level just above the signal, peak detect mode, and honest probing.";

export const metadata = buildMetadata({
  title: "How to Capture a Brief Voltage Spike on a Scope",
  description,
  path: "/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope",
});

const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

// Rise time ≈ 0.35 ÷ bandwidth, using only the bandwidth listed on each pick.
const bw = (p: typeof siglent) => p.specs.find((s) => s.label === "Bandwidth")!.value;

const link = "text-accent hover:underline";

const sampleXs = Array.from({ length: 15 }, (_, i) => 10 + i * 20);

export default function CaptureBriefVoltageSpikePage() {
  return (
    <HowToShell
      title="How to Capture a Brief Voltage Spike With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          A spike that lasts a few hundred nanoseconds and turns up once a minute will never be seen in
          Auto mode on a slow timebase. To capture a brief voltage spike with an oscilloscope you have
          to tell the scope what to wait for, make sure its sampling cannot step over the event, and
          rule out spikes that your own probe is creating. This guide walks through the trigger
          settings, peak detect, sample rate versus time window, and measuring the result with cursors.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel digital bench oscilloscope",
        caption: (
          <>
            Narrow events reward bandwidth and sample rate; the Siglent SDS1104X-E in our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              full review
            </Link>{" "}
            lists 100MHz and 1 GSa/s.
          </>
        ),
      }}
      toc={[
        { id: "probe-setup", label: "Probe for fast, high-voltage edges" },
        { id: "vertical-headroom", label: "Leave vertical headroom" },
        { id: "trigger-above", label: "Trigger just above the normal signal" },
        { id: "glitch-trigger", label: "Pulse-width or glitch trigger" },
        { id: "peak-detect", label: "Turn on peak detect" },
        { id: "measure-spike", label: "Measure the spike with cursors" },
        { id: "bandwidth", label: "Is your bandwidth enough?" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ]}
      faq={[
        {
          q: "Why does the spike show up at one timebase and vanish at another?",
          a: "At slow time/div settings the scope spreads its memory over a longer window, so the gap between samples grows. Once that gap is wider than the spike, normal sampling can land either side of it and draw a flat line. Peak detect, or a faster timebase with the trigger set on the spike, brings it back.",
        },
        {
          q: "How do I catch a negative spike or a dropout?",
          a: "Flip the logic: set the slope to falling and put the level a little below the normal low point of the signal. The trigger then waits for the line to dip lower than it ever should. Single mode freezes the first dip; Normal mode keeps updating each time a new one happens.",
        },
        {
          q: "Will a 1x probe show the spike more accurately?",
          a: "Usually the opposite. A 1x probe typically has much lower bandwidth and loads the circuit more, so a narrow spike looks smaller and slower than it really is. A compensated 10x probe also extends the voltage range you can view, which matters when the spike is far larger than the normal signal.",
        },
        {
          q: "Can a spike be real if it only appears with the long ground lead?",
          a: "Treat it as suspect. If the spike shrinks or disappears when you swap to the short ground spring, or appears with the probe tip touched to its own ground near the circuit, it was being picked up by the ground loop. A real spike keeps roughly the same shape whichever short ground method you use.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "Why a narrow pulse is shown smaller and wider when it approaches a scope's bandwidth limit.",
        },
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why a Waveform Looks Noisy",
          desc: "Separate probe pickup and ground loops from interference that is really in the circuit.",
        },
      ]}
    >
      <section>
        <StepHeading n={1} id="probe-setup">Probe for fast edges and high peaks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Spikes are fast and often much larger than the signal they ride on: an inductive kick from a
          relay coil or motor can be many times the supply voltage. Use a 10x probe, set the channel to
          10x, and check that its voltage rating and the scope input rating cover the worst case you
          expect. Make sure the probe is{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensated
          </Link>
          , because a miscompensated probe adds overshoot to every edge. Then swap the long ground lead
          for the short ground spring.
        </p>
        <Figure
          caption={
            <>
              A clean square wave probed with a long ground lead. The ringing after each edge is the
              lead and probe resonating, and on a slow timebase it can look exactly like a burst of
              spikes that is not in the circuit at all.
            </>
          }
        >
          <ScopeScreen wave="square-ring" cycles={2} amplitude={2} labels={{ left: "CH1 1 V/div (long ground lead)", right: "1 µs/div" }} />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="vertical-headroom">Leave vertical headroom above the signal</StepHeading>
        <p className="text-muted leading-7">
          A scope digitises only what fits on screen. If the normal signal fills the display, a spike
          running above the top graticule is clipped by the converter and its real height is lost.
          Choose a V/div that puts the normal signal in the lower half of the screen, or shift it down
          with the vertical position control, so there are several divisions of room for an event you
          have not seen yet. You can tighten the scale once you know how big the spike actually is.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="trigger-above">Set the trigger level just above the normal signal</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use an edge trigger on the probed channel, rising slope, with the level a little above the
          highest point the signal normally reaches. Ordinary cycles never cross it, so only an
          excursion beyond normal can fire the trigger. Switch the mode to Normal so the screen holds
          the last spike and updates only when another arrives, or Single so the first spike freezes
          the display. Auto is no use here: it would keep drawing untriggered sweeps and wipe the
          event away. If you need a refresher on modes, see{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              Armed and waiting: a steady 5 V rail, moved 1 division below center with the position
              control for headroom, and the trigger level (T) a little over half a division above it. Nothing triggers until something pushes
              the rail through that line.
            </>
          }
        >
          <ScopeScreen wave="flat" offset={-1} triggerLevel={-0.4} labels={{ left: "CH1 5 V/div, Normal", right: "100 µs/div" }} />
        </Figure>
        <p className="mt-4 text-muted leading-7">
          If the spike is intermittent and you want to see how often and how high it reaches over
          time, a persistence display can overlay many captures; for a single clear capture, the
          trigger approach above is the starting point.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="glitch-trigger">Use a pulse-width or glitch trigger if your scope has one</StepHeading>
        <p className="text-muted leading-7">
          Some scopes offer a pulse-width trigger (sometimes listed as glitch) that fires only when a
          pulse is narrower, or wider, than a time you set. Set it to trigger on anything shorter than
          your normal pulse width and it ignores every legitimate cycle while catching the short
          interloper, even when the spike is no taller than the real signal. Availability and naming
          vary by model, so check your manual.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="peak-detect">Turn on peak detect so slow timebases cannot miss it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Memory depth is finite, so the time between samples is set by how much time is on screen.
          Spread the same memory over a long window and samples get far apart; a narrow spike can fall
          entirely between two of them. The table uses round illustrative numbers, 1 million points
          and a 1 GSa/s maximum, not any particular model. For the basics, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
        <DataTable
          head={["Time/div", "Window (10 div)", "Effective rate", "Sample spacing", "200 ns spike"]}
          mono={[0, 2, 3]}
          rows={[
            ["100 µs", "1 ms", "1 GSa/s", "1 ns", "About 200 samples"],
            ["1 ms", "10 ms", "100 MSa/s", "10 ns", "About 20 samples"],
            ["10 ms", "100 ms", "10 MSa/s", "100 ns", "About 2 samples"],
            ["100 ms", "1 s", "1 MSa/s", "1 µs", "Often missed in normal sampling"],
          ]}
        />
        <p className="mt-4 text-muted leading-7 mb-4">
          Peak detect fixes this. Instead of keeping one sample per interval, the scope samples fast
          internally and stores the minimum and maximum it saw in each interval, so even a spike
          narrower than the displayed spacing leaves a vertical line on screen.
        </p>
        <Figure
          caption={
            <>
              The same narrow spike, two acquisition modes. Normal sampling (top) takes one point per
              interval and the spike slips between them. Peak detect (bottom) keeps each interval&apos;s
              minimum and maximum, so the spike survives as a tall bar.
            </>
          }
        >
          <svg viewBox="0 0 300 200" className="w-full h-auto" role="img" aria-label="Comparison of normal sampling missing a narrow spike and peak detect mode capturing it">
            <rect x="0" y="0" width="300" height="88" rx="4" className="fill-[#0f1a14]" />
            <rect x="0" y="104" width="300" height="88" rx="4" className="fill-[#0f1a14]" />
            <path d="M0 66 H143 L146 14 L149 66 H300" fill="none" stroke="#7CFC9A" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M0 170 H143 L146 118 L149 170 H300" fill="none" stroke="#7CFC9A" strokeOpacity="0.35" strokeWidth="1.5" />
            <line x1="10" y1="66" x2="290" y2="66" stroke="#ffd56b" strokeWidth="1.6" />
            {sampleXs.map((x) => (
              <circle key={x} cx={x} cy="66" r="2.6" fill="#ffd56b" />
            ))}
            {sampleXs.map((x) => (
              <line key={`pd${x}`} x1={x} y1={x === 150 ? 118 : 168} x2={x} y2="172" stroke="#ffd56b" strokeWidth="3" />
            ))}
            <text x="6" y="14" fontSize="9" fill="#9fe3b4">Normal sampling: spike lost</text>
            <text x="6" y="118" fontSize="9" fill="#9fe3b4">Peak detect: min/max kept</text>
            <text x="150" y="99" fontSize="8" textAnchor="middle" className="fill-muted">faint green = real signal · yellow = what the scope stores</text>
          </svg>
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Peak detect does cost something: it shows extra noise as a thicker trace and is not meant for
          fine waveform detail. Use it to find the spike, then zoom in on a faster timebase in normal
          mode to look at its shape.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="measure-spike">Measure the spike with cursors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the spike is frozen, stop the acquisition and switch to a timebase where it spans a few
          divisions. Place one horizontal cursor on the normal baseline and the other on the peak: the
          difference is how far the spike rises above the signal. Add the baseline voltage if you need
          the absolute peak. Then place vertical cursors where the spike crosses half its height on the
          way up and down to read its width. Automatic measurements can do this too, but cursors let
          you check exactly which feature is being measured.
        </p>
        <Figure caption={<>Horizontal cursors give the spike height above the baseline; vertical cursors at 50% height give its width.</>}>
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Voltage spike with horizontal cursors measuring height and vertical cursors measuring width at half height">
            <rect x="0" y="0" width="300" height="150" rx="4" className="fill-[#0f1a14]" />
            <path d="M0 118 H138 L150 30 L168 118 H300" fill="none" stroke="#7CFC9A" strokeWidth="2" strokeLinejoin="round" />
            <g stroke="#5BB3E8" strokeWidth="1" strokeDasharray="4 3">
              <line x1="0" y1="30" x2="300" y2="30" />
              <line x1="0" y1="118" x2="300" y2="118" />
              <line x1="144" y1="8" x2="144" y2="140" />
              <line x1="159" y1="8" x2="159" y2="140" />
            </g>
            <line x1="236" y1="33" x2="236" y2="115" stroke="#ffd56b" strokeWidth="1.4" />
            <text x="242" y="78" fontSize="10" fill="#ffd56b">ΔV height</text>
            <line x1="144" y1="74" x2="159" y2="74" stroke="#ffd56b" strokeWidth="1.4" />
            <text x="138" y="70" fontSize="10" textAnchor="end" fill="#ffd56b">Δt width at 50%</text>
            <text x="6" y="140" fontSize="9" fill="#9fe3b4">baseline</text>
          </svg>
        </Figure>
      </section>

      <section id="bandwidth">
        <h2 className="text-xl font-semibold mb-3">Is your bandwidth enough to see it?</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s own rise time is roughly 0.35 divided by its bandwidth. A spike whose edges are
          faster than that gets displayed shorter and wider than it really is, and a very narrow one can
          shrink to a small bump. The chart applies that rule to the bandwidth listed for three scopes
          we cover; read more in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
        <BarChart
          log
          items={[
            { label: `FNIRSI DSO152 (${bw(fnirsi)})`, value: 1750, display: "≈ 1.75 µs" },
            { label: `Rigol DS1054Z (${bw(rigol)})`, value: 7, display: "≈ 7 ns" },
            { label: `Siglent SDS1104X-E (${bw(siglent)})`, value: 3.5, display: "≈ 3.5 ns", highlight: true },
          ]}
        />
        <div className="mt-5">
          <KeyIdea title="Shorter bar, faster edges">
            The bars show the approximate rise time each bandwidth allows; a shorter rise time means
            a narrower spike can be shown closer to its true shape.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting a missed or false spike</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Spike seen on a fast timebase, gone on a slow one", "Sample spacing wider than the spike", "Enable peak detect or trigger on the spike at a faster time/div"],
            ["Single never fires", "Level set above the spike's real height", "Lower the level in small steps toward the normal peak"],
            ["Triggers constantly on ordinary cycles", "Level inside the normal signal range", "Raise the level just beyond the normal maximum"],
            ["Spike flat-topped at the screen edge", "Converter range exceeded", "Use a larger V/div or move the trace down"],
            ["Spikes on every edge that vanish with a ground spring", "Long ground lead ringing", "Keep the short ground connection and re-check"],
          ]}
        />
      </section>

      <section id="safety">
        <Callout title="Spikes can exceed your probe rating">
          The whole point of this measurement is a voltage higher than normal, so plan for the worst
          case. Stay within the voltage and CAT ratings on the probe and the scope input, never clip a
          mains-earthed scope ground onto a non-isolated mains circuit, and use a differential probe or
          isolated scope when the circuit is not referenced to earth.
        </Callout>
      </section>
    </HowToShell>
  );
}
