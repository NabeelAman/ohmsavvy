// How-to page. Mechanical contact bounce is well-established, non-disputed electromechanical engineering fact
// (textbook relay/switch behavior) — no per-instance citation required per CONTENT_STANDARDS.md §1. The one
// product-specific claim (Siglent SDS1104X-E's sample rate) reuses its existing verified Pick verbatim.
import Link from "@/components/AppLink";
import {
  Callout,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("oscilloscopes");
const sds1104xe = all.find((p) => p.name === "Siglent SDS1104X-E")!;
const ds1054z = all.find((p) => p.name === "Rigol DS1054Z")!;

const description =
  "How to diagnose relay contact bounce with an oscilloscope: probe placement, time base, trigger settings, and when to add debounce logic.";

export const metadata = buildMetadata({
  title: "Relay Contact Bounce on an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-diagnose-relay-contact-bounce-with-an-oscilloscope",
  image: sds1104xe.image,
});

const link = "text-accent hover:underline";

/** Idealized contact-bounce waveform: several rapid transitions before the contact settles closed. */
function BounceDiagram() {
  return (
    <svg
      viewBox="0 0 320 150"
      className="w-full h-auto"
      role="img"
      aria-label="Idealized relay contact bounce waveform. When the contact closes, the voltage doesn't settle cleanly — it bounces between open and closed several times over a few milliseconds before finally staying closed."
    >
      <path
        d="M20 40 H70 V100 H85 V40 H100 V100 H112 V40 H122 V100 H300"
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
      />
      <text x="40" y="30" fontSize="9" textAnchor="middle" className="fill-muted">Open</text>
      <text x="40" y="115" fontSize="9" textAnchor="middle" className="fill-muted">Closed</text>
      <path d="M70 120 H122" className="stroke-foreground" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="96" y="135" fontSize="8.5" textAnchor="middle" className="fill-muted">Bounce window, typically a few ms</text>
      <text x="210" y="115" fontSize="9" textAnchor="middle" className="fill-foreground">Settled closed</text>
    </svg>
  );
}

export default function HowToDiagnoseRelayContactBounceWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="Relay Contact Bounce on an Oscilloscope"
      description={description}
      published="2026-11-28"
      path="/oscilloscopes/how-to-diagnose-relay-contact-bounce-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To diagnose contact bounce, probe directly across the relay or switch contact, set a fast time base in the
          microseconds-per-division range, and trigger on the first edge in normal or single-shot mode. Mechanical
          contacts don&apos;t switch cleanly: they physically bounce open and closed several times over a few
          milliseconds before settling, and that bounce can register as multiple false transitions to fast digital
          logic downstream. This guide walks through capturing and reading that bounce on a scope.
        </>
      }
      aside={{
        image: sds1104xe.image,
        alt: "Siglent SDS1104X-E oscilloscope, 1 GSa/s sample rate",
        caption: (
          <>
            A fast sample rate matters here: the Siglent SDS1104X-E&apos;s 1 GSa/s easily resolves a bounce train
            that plays out over a few milliseconds. See{" "}
            <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
              what GSa/s means
            </Link>{" "}
            for the full picture on sample rate.
          </>
        ),
      }}
      toc={[
        { id: "why", label: "Why contact bounce happens" },
        { id: "probe", label: "1. Probe the contact correctly" },
        { id: "range", label: "2. Set the voltage range and coupling" },
        { id: "timebase", label: "3. Set a fast time base" },
        { id: "trigger", label: "4. Set the trigger to catch one event" },
        { id: "read", label: "5. Read the bounce train" },
        { id: "fix", label: "6. When to add debounce logic" },
      ]}
      faq={[
        {
          q: "How long does contact bounce typically last?",
          a:
            "It varies by relay or switch design, contact material and mechanical wear, but a few milliseconds is a common, textbook-typical range for a mechanical relay or pushbutton. Always verify on your own component with a scope rather than assuming a figure, since bounce duration isn't tightly specified on most parts.",
        },
        {
          q: "What trigger mode should I use to catch a bounce event?",
          a:
            "Normal or single-shot trigger mode on the rising or falling edge of the contact signal, set just past the noise floor. Single-shot is especially useful since it captures exactly one closing event and holds it on screen, rather than re-triggering and potentially overwriting what you're looking at.",
        },
        {
          q: "Does contact bounce matter if my circuit is slow?",
          a:
            "Less so. Bounce is a problem specifically for fast digital logic that can register each bounce transition as a separate edge, like a microcontroller counting switch presses. A slow relay-driven load, like a motor or a lamp, generally doesn't notice a few milliseconds of bounce at all.",
        },
        {
          q: "Can I see contact bounce without an oscilloscope?",
          a:
            "Not directly. A multimeter's display updates far too slowly to show individual bounce transitions happening over milliseconds. An oscilloscope, or a logic analyzer with fine enough time resolution, is the right tool for actually seeing the bounce train.",
        },
        {
          q: "Does a solid-state relay bounce the same way?",
          a:
            "No. Solid-state relays switch electronically with no moving contacts, so they don't exhibit mechanical bounce at all. Bounce is specifically a mechanical-contact phenomenon, relevant to electromechanical relays, switches and pushbuttons.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-falling-edge",
          title: "How to Trigger an Oscilloscope on a Falling Edge",
          desc: "The trigger setup this guide uses, covered in full detail.",
        },
        {
          href: "/oscilloscopes/oscilloscope-memory-depth-explained",
          title: "Oscilloscope Memory Depth Explained",
          desc: "Relevant if you want to capture a long window around the bounce event at full sample rate.",
        },
      ]}
    >
      <section>
        <h2 id="why" className="text-xl font-semibold mb-3">Why contact bounce happens</h2>
        <p className="text-muted leading-7 mb-4">
          A mechanical relay or switch closes its contacts by physically moving a conductive element until it
          touches another. That motion rarely settles cleanly on the first touch — the contact&apos;s own momentum and
          spring-back cause it to separate and re-touch several times before finally staying closed. Electrically,
          this looks like several rapid open-closed transitions crammed into a window of typically a few
          milliseconds, rather than one clean edge.
        </p>
        <Figure caption={<>Idealized contact bounce: the signal bounces between open and closed several times before settling.</>}>
          <BounceDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="probe">Probe the contact correctly</StepHeading>
        <p className="text-muted leading-7">
          Connect the scope probe&apos;s tip directly to the switched side of the relay or switch contact, with the probe
          ground clip on a solid ground reference close to the contact. Keep the ground lead short — a long ground
          lead adds inductance that can ring and be mistaken for extra bounce, muddying exactly the measurement
          you&apos;re trying to make.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="range">Set the voltage range and coupling</StepHeading>
        <p className="text-muted leading-7">
          Use DC coupling so you see the actual logic levels, not just the transitions. Set the vertical range so the
          signal&apos;s full swing, from open to closed voltage, fills a reasonable portion of the screen — too small a
          range clips the signal, too large makes small bounce transitions hard to see clearly.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="timebase">Set a fast time base</StepHeading>
        <p className="text-muted leading-7">
          Start around 1-2 milliseconds per division across the whole screen to catch the entire bounce window, then
          zoom into individual transitions at tens of microseconds per division once you&apos;ve located them. Too slow a
          time base compresses the bounce train into what looks like one clean edge; too fast and you&apos;ll miss the
          event entirely on a single capture.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="trigger">Set the trigger to catch one event</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Trigger on the edge direction matching the contact&apos;s first transition (rising if it switches low-to-high,
          falling if the reverse), with the trigger level set partway between the open and closed voltages. Single-shot
          trigger mode is the most reliable way to capture exactly one real closing event without the display
          re-triggering and overwriting it before you&apos;ve had a chance to look.
        </p>
        <KeyIdea title="A faster sample rate resolves bounce more clearly">
          Individual bounce transitions can be very brief, well under a microsecond for the actual transition edge
          itself, even though the whole bounce window spans milliseconds. A scope with a high sample rate, like 1
          GSa/s, captures those fast edges cleanly instead of smoothing them into the surrounding noise.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="read">Read the bounce train</StepHeading>
        <p className="text-muted leading-7">
          Once captured, count the number of distinct open-closed transitions and measure the total time from the
          first transition to where the signal finally settles and stays closed. That settled duration is the figure
          that matters for debounce design: any debounce logic needs to ignore transitions for at least that long
          after the first edge.
        </p>
      </section>

      <section>
        <h2 id="fix" className="text-xl font-semibold mb-3">When to add debounce logic</h2>
        <p className="text-muted leading-7 mb-4">
          If the downstream circuit is fast digital logic, like a microcontroller counting switch presses or
          triggering on an edge, and you&apos;ve confirmed real bounce on the scope, add debounce handling: either a
          simple RC low-pass filter in hardware, or a software delay that ignores further transitions for a short
          window after the first edge (often with margin above the bounce duration you actually measured).
        </p>
        <Callout title="Measure before you fix">
          Don&apos;t guess a debounce delay from a datasheet or a forum post. Measure the actual bounce duration on your
          own relay or switch with a scope first, then build in reasonable margin — the figure genuinely varies by
          component and by how worn the contacts are.
        </Callout>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Which scope to use</h2>
        <p className="text-muted leading-7 mb-6">
          A fast sample rate and a trigger mode that reliably catches a single-shot event matter more here than
          bandwidth. Either of these covers the job well.
        </p>
        <ProductStrip
          title="Scopes for catching fast transient events"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: sds1104xe.image,
              alt: "Siglent SDS1104X-E oscilloscope",
              href: "/oscilloscopes/best-oscilloscopes-for-electronics-repair",
              note: "1 GSa/s sample rate and a well-regarded trigger interface for catching single-shot events.",
            },
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z 4-channel oscilloscope",
              href: "/oscilloscopes/best-oscilloscope-for-arduino-projects",
              note: "The default beginner bench scope, with single-shot triggering built in.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
