import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why an oscilloscope waveform looks noisy: a long probe ground lead picking up interference, ground loops, real electrical noise, or too much bandwidth.";

export const metadata = buildMetadata({
  title: "Why Does an Oscilloscope Waveform Look Noisy?",
  description,
  path: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
});

const link = "text-accent hover:underline";

export default function WhyOscilloscopeWaveformIsNoisyPage() {
  return (
    <HowToShell
      title="Why Does an Oscilloscope Waveform Look Noisy?"
      description={description}
      path="/oscilloscopes/why-oscilloscope-waveform-is-noisy"
      category="oscilloscopes"
      published="2026-10-21"
      intro={
        <>
          A noisy trace usually comes from one of two places: the measurement setup itself is picking up
          interference it shouldn&apos;t (a long ground lead, a ground loop, a miscompensated probe), or
          the circuit genuinely has electrical noise present and the scope is accurately showing it. This
          is about general waveform noise specifically — for the related but distinct question of
          measuring ripple on a DC supply rail, see our{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            ripple voltage guide
          </Link>
          .
        </>
      }
      toc={[
        { id: "setup-vs-real-noise", label: "Setup-side noise vs. real noise" },
        { id: "ground-lead-length", label: "1. The probe's ground lead is too long" },
        { id: "ground-loops", label: "2. Ground loops between equipment" },
        { id: "bandwidth-too-high", label: "3. Bandwidth capturing noise above your signal" },
        { id: "probe-compensation", label: "4. A miscompensated probe" },
        { id: "real-electrical-noise", label: "When the noise is actually real" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "What's the single most common fix for a noisy trace?",
          a: "Shortening the probe's ground connection — using the short ground spring accessory that clips directly onto the probe tip barrel, instead of the long ground lead wire with an alligator clip. The long lead acts like a small antenna on fast edges, and swapping to the short spring often cleans up a noisy trace immediately.",
        },
        {
          q: "Does using averaging mode remove noise from any signal?",
          a: "Only from repeating signals. Averaging combines multiple acquisitions of the same repeating waveform, which cancels out random noise while the consistent, repeating part of the signal stays — it does nothing useful for a one-off, non-repeating event, since there's nothing to average against.",
        },
        {
          q: "How do I know if noise is coming from my scope setup or from the circuit itself?",
          a: "Touch the probe tip to its own ground clip (shorting the input) with everything else unchanged — a clean, flat line there means your setup isn't the source, and remaining noise on an actual measurement reflects something real happening in the circuit or picked up externally. Visible noise even with the input shorted points at your probe, grounding, or nearby interference instead.",
        },
        {
          q: "Can the oscilloscope itself be the source of the noise?",
          a: "It's possible but less common than setup or circuit causes — a scope's own internal noise floor is usually well below what shows up from grounding issues or genuine circuit noise. If a careful ground check and a shorted-input test both come back clean, only then is it worth suspecting the scope's own front end.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage",
          desc: "The specific, periodic AC component on a DC rail — a related but distinct measurement.",
        },
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate an Oscilloscope Probe",
          desc: "A miscompensated probe can itself look like noise on square-edged signals.",
        },
      ]}
    >
      <section>
        <h2 id="setup-vs-real-noise" className="text-xl font-semibold mb-3">Setup-side noise vs. real noise</h2>
        <p className="text-muted leading-7 mb-5">
          Before chasing a fix, it helps to separate what you&apos;re looking at into two categories.
        </p>
        <InfoCards
          items={[
            { label: "Setup-side", desc: "Ground lead picking up interference, ground loops, a miscompensated probe." },
            { label: "Real circuit noise", desc: "Switching supplies, digital logic, motor brushes, or fluorescent/LED drivers genuinely present." },
          ]}
        />
      </section>

      <section>
        <h2 id="ground-lead-length" className="text-xl font-semibold mb-3">1. The probe&apos;s ground lead is too long</h2>
        <p className="text-muted leading-7 mb-4">
          A standard passive probe&apos;s long ground lead wire, with its alligator clip, forms a loop
          antenna that picks up high-frequency interference — the faster the edges you&apos;re probing,
          the worse this gets. Most probes include a short ground spring accessory that clips directly
          around the probe tip barrel instead, dramatically shortening this loop.
        </p>
        <Figure
          caption={
            <>
              A long ground lead (left) forms a loop that picks up interference on fast edges. The short
              ground spring (right) clips directly around the probe tip, minimizing that loop.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Comparison of a long probe ground lead versus a short ground spring accessory">
            <g>
              <line x1="30" y1="30" x2="30" y2="80" className="stroke-foreground" strokeWidth="3" />
              <path d="M30 80 Q80 100 110 60" className="fill-none stroke-accent" strokeWidth="2" strokeDasharray="4 3" />
              <circle cx="110" cy="60" r="4" className="fill-accent" />
              <text x="70" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Long ground lead: loop antenna</text>
            </g>
            <g>
              <line x1="210" y1="30" x2="210" y2="80" className="stroke-foreground" strokeWidth="3" />
              <circle cx="210" cy="55" r="12" className="fill-none stroke-accent" strokeWidth="2.5" />
              <text x="210" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">Ground spring: minimal loop</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="ground-loops" className="text-xl font-semibold mb-3">2. Ground loops between equipment</h2>
        <p className="text-muted leading-7">
          When the scope, the circuit under test, and other mains-powered equipment are all grounded
          through separate paths, small differences between those ground potentials can drive circulating
          currents that show up as noise on the trace. Powering test equipment from the same outlet or
          power strip, and minimizing the number of separate ground paths, often reduces this.
        </p>
      </section>

      <section>
        <h2 id="bandwidth-too-high" className="text-xl font-semibold mb-3">3. Bandwidth capturing noise above your signal</h2>
        <p className="text-muted leading-7">
          A wide-bandwidth scope faithfully displays high-frequency content that a lower-bandwidth
          instrument would simply never see — including real but irrelevant high-frequency noise riding
          on top of the slower signal you actually care about. Many scopes include a bandwidth-limit
          function (often a 20MHz low-pass filter) that removes this higher-frequency content from the
          display, clarifying the underlying signal without needing to fix the noise source itself.
        </p>
      </section>

      <section id="probe-compensation">
        <Callout title="4. A miscompensated probe can look exactly like noise">
          An under- or over-compensated 10x probe shows rounded or spiky overshoot on sharp edges,
          particularly square waves, which can be mistaken for genuine high-frequency noise. Check and
          adjust probe compensation, covered in our{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className="underline">
            dedicated guide
          </Link>
          , before concluding the noise is real.
        </Callout>
      </section>

      <section>
        <h2 id="real-electrical-noise" className="text-xl font-semibold mb-3">When the noise is actually real</h2>
        <p className="text-muted leading-7">
          Switching power supplies, digital logic switching states, motor brushes, and fluorescent or
          LED driver circuits all genuinely inject electrical noise into nearby circuits and wiring. If
          a shorted-input test comes back clean and the noise only appears when probing the actual
          circuit, the scope is likely showing you something real rather than a measurement artifact —
          worth investigating as a circuit or layout issue rather than a scope setup problem.
        </p>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Cause", "Fix"]}
          rows={[
            ["Long ground lead picking up interference", "Switch to the short ground spring accessory"],
            ["Ground loops between equipment", "Power equipment from a common point; minimize separate ground paths"],
            ["High-frequency noise above your signal of interest", "Enable the scope's bandwidth-limit function"],
            ["Overshoot/ringing on square edges", "Check and adjust probe compensation"],
            ["Noise persists even with input shorted", "Points at the scope itself — otherwise, it's genuinely the circuit"],
          ]}
        />
      </section>

      <KeyIdea title="Test with the input shorted first">
        Touching the probe tip to its own ground clip tells you immediately whether your setup is
        contributing noise. A clean line there means whatever noise you see on a real measurement is
        either genuinely present in the circuit or coming from somewhere external, not from the scope
        and probe setup itself.
      </KeyIdea>
    </HowToShell>
  );
}
