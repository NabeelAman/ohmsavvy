import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to measure rise time with oscilloscope cursors: find the 10% and 90% amplitude levels, place time cursors where the edge crosses each, and read the delta.";

export const metadata = buildMetadata({
  title: "How to Measure Rise Time With Scope Cursors",
  description,
  path: "/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors",
});

const scopes = getAllPicks("oscilloscopes");
const ds1054z = scopes.find((p) => p.name === "Rigol DS1054Z")!;
const dho804 = scopes.find((p) => p.name === "Rigol DHO804")!;
const sds1104 = scopes.find((p) => p.name === "Siglent SDS1104X-E")!;

export default function HowToMeasureRiseTimeWithOscilloscopeCursorsPage() {
  return (
    <HowToShell
      title="How to Measure Rise Time With Oscilloscope Cursors"
      description={description}
      path="/oscilloscopes/how-to-measure-rise-time-with-oscilloscope-cursors"
      category="oscilloscopes"
      published="2026-10-22"
      intro={
        <>
          Rise time is conventionally defined as the time a signal takes to go from 10% to 90% of its
          final amplitude on a rising edge — not the full 0% to 100% transition. Measuring it with
          cursors means finding those two specific amplitude levels, placing time cursors where the
          edge crosses each one, and reading the time difference the scope calculates between them.
        </>
      }
      toc={[
        { id: "what-rise-time-means", label: "What rise time actually measures" },
        { id: "why-zoom-in", label: "Why you'll likely need to zoom in" },
        { id: "step-by-step", label: "Measuring rise time step by step" },
        { id: "fall-time-too", label: "Fall time works the same way, in reverse" },
        { id: "scope-bandwidth-limit", label: "Your scope's own rise time sets a limit" },
        { id: "common-mistakes", label: "Common mistakes" },
        { id: "scopes-for-edge-work", label: "Scopes for edge measurements" },
      ]}
      faq={[
        {
          q: "Why 10% to 90% instead of the full 0% to 100% transition?",
          a: "The very start and end of a real edge often have a curved, less well-defined transition region that makes exact 0%/100% crossing points hard to pin down consistently. The 10%-90% convention gives a standard, repeatable measurement that's widely used across datasheets and test equipment, which is why it's the default most scopes' automatic rise-time measurement uses too.",
        },
        {
          q: "Can I just use the scope's automatic rise-time measurement instead of cursors?",
          a: "Yes, most digital scopes calculate it automatically in the Measure menu using the same 10%-90% convention. Manual cursors are useful for verifying that automatic reading, understanding exactly what's being measured, or when a specific noisy or unusual edge makes you want to confirm the measurement by eye.",
        },
        {
          q: "Does the trigger point affect where I place the cursors?",
          a: "Not directly — the trigger just needs to give you a stable, non-moving display of the edge so you can place cursors accurately. Where you place the actual cursors depends only on the 10% and 90% amplitude levels and where the waveform crosses them, independent of the trigger settings themselves.",
        },
        {
          q: "Why does my measured rise time seem slower than the signal source should produce?",
          a: "Check your probe and scope's own bandwidth and rise time specs first — a scope or probe with insufficient bandwidth rounds off fast edges, making the measured rise time look slower than the signal actually is at its source. This is covered in more depth in our oscilloscope bandwidth guide.",
        },
        {
          q: "How do I correct a measured rise time for my scope's own rise time?",
          a: "Rise times add roughly as a root sum of squares, so the signal's own value is about √(measured² − scope²). A 100 MHz scope has a system rise time near 0.35 ÷ 100 MHz = 3.5 ns. If it shows 5 ns, the edge is about √(25 − 12.25) ≈ 3.6 ns. The correction becomes unreliable once the measured value is under about twice the scope's own figure.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies",
          title: "Bandwidth for Switching Power Supplies",
          desc: "The 0.35/rise-time relationship and the margin your scope needs over the signal.",
        },
        {
          href: "/oscilloscopes/how-to-read-an-oscilloscope",
          title: "How to Read an Oscilloscope Screen",
          desc: "Turning divisions on the grid into volts and time, the basis for any cursor measurement.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge",
          title: "How to Trigger on a Falling Edge",
          desc: "Getting a stable display of the falling edge you're measuring fall time on.",
        },
      ]}
    >
      <section>
        <h2 id="what-rise-time-means" className="text-xl font-semibold mb-3">What rise time actually measures</h2>
        <p className="text-muted leading-7 mb-4">
          Rise time is the time between a rising edge crossing 10% of its final amplitude and crossing
          90% of it — a standard convention, not the full low-to-high transition.
        </p>
        <Figure
          caption={
            <>
              Rise time is the time between the edge crossing the 10% level and crossing the 90% level
              — cursor A and cursor B in this diagram — not the full span from the flat bottom to the
              flat top.
            </>
          }
        >
          <svg viewBox="0 0 300 140" className="w-full h-auto" role="img" aria-label="Diagram of a rising edge with 10 percent and 90 percent amplitude levels marked for a rise time measurement">
            <rect x="0" y="0" width="300" height="140" rx="4" className="fill-[#0f1a14]" />
            <path
              d="M20 100 L120 100 Q150 100 160 30 L280 30"
              fill="none"
              stroke="#7CFC9A"
              strokeWidth="2.2"
            />
            <line x1="20" y1="100" x2="280" y2="100" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="20" y1="30" x2="280" y2="30" stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
            <line x1="20" y1="93" x2="280" y2="93" stroke="#ffd56b" strokeWidth="1" strokeDasharray="4 3" />
            <text x="286" y="96" fontSize="9" fill="#ffd56b">90%</text>
            <line x1="20" y1="37" x2="280" y2="37" stroke="#ffd56b" strokeWidth="1" strokeDasharray="4 3" />
            <text x="286" y="40" fontSize="9" fill="#ffd56b">10%</text>
            <line x1="134" y1="20" x2="134" y2="110" stroke="#ffd56b" strokeWidth="1.4" />
            <text x="134" y="122" fontSize="9" textAnchor="middle" fill="#ffd56b">A (10%)</text>
            <line x1="156" y1="20" x2="156" y2="110" stroke="#ffd56b" strokeWidth="1.4" />
            <text x="156" y="134" fontSize="9" textAnchor="middle" fill="#ffd56b">B (90%)</text>
            <text x="145" y="14" fontSize="9" textAnchor="middle" fill="#9fe3b4">rise time = B − A</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="why-zoom-in" className="text-xl font-semibold mb-3">Why you&apos;ll likely need to zoom in</h2>
        <p className="text-muted leading-7">
          Rise time is usually a tiny fraction of a signal&apos;s overall period, especially on fast
          digital edges — at a time/div setting that shows several complete cycles, the edge itself can
          be just a sliver, too narrow to place cursors on accurately. Increase the horizontal scale (a
          faster time/div) or use a zoom/delay feature if your scope has one, so the edge itself fills a
          good portion of the screen before placing cursors.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Measuring rise time step by step</StepHeading>
        <p className="text-muted leading-7">
          Zoom in on the edge so it&apos;s clearly visible. Identify the flat levels before and after the
          transition (the 0% and 100% reference points), and calculate the 10% and 90% levels from that
          span. Place one time cursor where the edge crosses the 10% level, and the second where it
          crosses the 90% level. Read the time difference the scope displays between the two cursors —
          that&apos;s the rise time.
        </p>
      </section>

      <section>
        <h2 id="fall-time-too" className="text-xl font-semibold mb-3">Fall time works the same way, in reverse</h2>
        <p className="text-muted leading-7">
          Fall time uses the same 10%/90% convention on a falling edge, just measured from the 90%
          crossing down to the 10% crossing instead. The cursor placement technique and zoom
          considerations are identical — only which edge you&apos;re measuring changes.
        </p>
      </section>

      <section id="scope-bandwidth-limit">
        <Callout title="Your scope's own rise time sets a hard limit">
          A scope (and probe) can only display an edge as fast as its own rated rise time allows — a
          measurement faster than that limit gets rounded off and reads artificially slow. See our{" "}
          <Link href="/oscilloscopes/oscilloscope-bandwidth-for-switching-power-supplies" className="underline">
            bandwidth guide
          </Link>{" "}
          for the relationship between bandwidth and a scope&apos;s own rise time, and the margin you
          need over the signal you&apos;re measuring.
        </Callout>
      </section>

      <section>
        <h2 id="common-mistakes" className="text-xl font-semibold mb-3">Common mistakes</h2>
        <DataTable
          head={["Mistake", "Result"]}
          rows={[
            ["Placing cursors at 0%/100% instead of 10%/90%", "Measures a different, non-standard quantity than conventional rise time"],
            ["Not zoomed in enough on the edge", "Imprecise cursor placement on a sliver of screen width"],
            ["Reference levels taken from a noisy or non-flat baseline", "10%/90% calculation is off from the start"],
            ["Ignoring the scope/probe's own bandwidth limit", "Measured rise time reads slower than the signal actually is"],
          ]}
        />
      </section>

      <KeyIdea title="Cursors measure what the scope shows, not the edge itself">
        A cursor reading is only as fast as the probe, front end and sample rate let the edge appear. Set the
        10% and 90% levels from flat, settled parts of the waveform, zoom until the edge spans several
        divisions, and compare the result with the scope&apos;s own rise time before you trust it.
      </KeyIdea>

      <section id="scopes-for-edge-work">
        <h2 className="text-xl font-semibold mb-3">Scopes for edge measurements</h2>
        <p className="text-muted leading-7 mb-4">
          Using the common 0.35 ÷ bandwidth approximation, a 50 MHz scope settles at about 7 ns of its own rise
          time, 70 MHz at about 5 ns and 100 MHz at about 3.5 ns. Pick the bandwidth that keeps your scope well
          faster than the edges you need to measure.
        </p>
        <ProductStrip
          title="Bench scopes for rise-time work"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: sds1104.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "Hands-on tested. 100 MHz, 4 channels and 1 GSa/s, the fastest edge headroom of these three.",
            },
            {
              name: "Rigol DHO804",
              image: dho804.image,
              alt: "Rigol DHO804 12-bit digital oscilloscope",
              href: "/oscilloscopes/best-beginner-oscilloscopes#rigol-dho804",
              note: "Hands-on tested. 70 MHz, 4 channels, 12-bit vertical resolution and up to 1.25 GSa/s on one channel.",
            },
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "Hands-on tested. 50 MHz and 1 GSa/s on one channel, fine for edges slower than a few tens of nanoseconds.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
