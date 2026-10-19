import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Buying Guide",
  description: "What bandwidth, sample rate, channel count, and memory depth actually mean for a beginner, so the spec sheet makes sense before you buy.",
  path: "/oscilloscopes/oscilloscope-buying-guide",
});

const featured = ["Rigol DS1054Z", "FNIRSI DSO152", "Siglent SDS1104X-E"].map(
  (name) => picks.find((p) => p.name === name)!
);

export default function OscilloscopeBuyingGuidePage() {
  return (
    <>
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>BUYING GUIDE</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Oscilloscope Buying Guide</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        An oscilloscope&apos;s spec sheet is denser than a multimeter&apos;s or soldering iron&apos;s — bandwidth,
        sample rate, channel count, and memory depth all interact with each other, and getting one
        badly mismatched to your work means either overpaying or genuinely not being able to see
        what you need to see. This guide breaks those terms down before you compare models in our{" "}
        <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="text-accent hover:underline">
          Best Oscilloscopes for Beginners
        </Link>{" "}
        comparison.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {featured.map((p) => (
          <div key={p.name} className="rounded-lg border border-border bg-surface-raised overflow-hidden">
            <div className="h-1.5 bg-accent" />
            {p.image ? (
              <div className="h-32 flex items-center justify-center bg-surface p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full object-contain" />
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center bg-surface text-xs text-muted p-3 text-center">
                Photo pending manufacturer confirmation
              </div>
            )}
            <div className="p-3">
              <p className="text-xs text-muted uppercase tracking-wide">{p.badge}</p>
              <p className="font-medium text-sm mt-0.5">{p.name}</p>
              <Button href={p.ctaHref} className="mt-2 w-full">
                Check price →
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">Bandwidth: the most important number, and the most misunderstood</h2>
          <p className="text-muted leading-7">
            Bandwidth is the frequency at which an oscilloscope&apos;s measured amplitude starts
            rolling off — practically, the point past which the scope begins understating the true
            size of a signal. As a working rule of thumb, your scope&apos;s bandwidth should be
            roughly 3-5x the highest frequency component you actually need to see clearly, not
            just the nominal frequency of your signal — a clean-looking square wave, for instance,
            contains higher-frequency harmonics that shape its edges, and a bandwidth-limited scope
            will round those edges off even if the fundamental frequency is well within spec.
          </p>
          <p className="mt-3 text-muted leading-7">
            For general electronics, microcontroller, and audio-range work, 50-100MHz covers the
            overwhelming majority of hobbyist and most professional bench needs. RF work, high-speed
            digital signals, and fast switching power supply design push well past that and need
            dedicated higher-bandwidth instruments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Sample rate and the Nyquist problem</h2>
          <p className="text-muted leading-7">
            Sample rate (commonly shown as GSa/s — giga-samples per second) is how many discrete
            voltage measurements the scope takes per second to reconstruct the waveform on screen.
            By the Nyquist-Shannon sampling theorem, you need a sample rate of at least twice the
            highest frequency you&apos;re measuring just to detect that it exists at all — in practice,
            scope manufacturers and working engineers generally aim for 5-10x oversampling to get
            an accurately-shaped waveform, not just a technically-detected one. A high bandwidth
            paired with an inadequate sample rate is a real mismatch some budget scopes have — check
            both numbers together, not just whichever one is advertised more prominently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How many channels do you actually need?</h2>
          <p className="text-muted leading-7">
            A single-channel scope can only show you one signal at a time, which makes even basic
            comparisons (a clock line against a data line, an input against an output) impossible
            without constantly reconnecting probes. Two channels cover a meaningful amount of
            real debugging work. Four channels give genuine long-term flexibility — enough to
            watch a full set of related signals simultaneously (e.g. all four lines of an SPI bus)
            — and is worth the extra cost for anyone expecting their projects to grow in
            complexity rather than stay simple indefinitely.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Memory depth: how long a capture actually lasts</h2>
          <p className="text-muted leading-7">
            Memory depth (shown in points or Mpts) determines how long a single captured waveform
            can be at a given sample rate before the scope runs out of storage and has to either
            slow its effective sample rate or stop recording. A scope with a high sample rate but
            shallow memory depth can only sustain that high sample rate for a very short time
            window — useful for a fast, repetitive signal, but limiting if you need to capture a
            longer, less predictable event (an intermittent glitch, a slow protocol transaction) at
            full resolution. Deeper memory lets you capture longer time windows without sacrificing
            sample rate.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Triggering: the feature that makes a scope usable, not just capable</h2>
          <p className="text-muted leading-7">
            Triggering tells the scope exactly when to start capturing — without it, a repetitive
            waveform would appear to drift or smear across the screen instead of holding still.
            Basic edge triggering (start capture when a signal crosses a set voltage, rising or
            falling) covers most general work. More advanced trigger types — pulse-width, pattern,
            or protocol-specific triggers (for I2C, SPI, UART/CAN) — let you isolate a single rare
            event or a specific bus transaction out of continuous activity, which matters a great
            deal for real embedded debugging and far less for simple signal viewing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Built-in waveform/function generator: convenience, not a core spec</h2>
          <p className="text-muted leading-7">
            Some scopes include a built-in arbitrary waveform or function generator, letting a
            single unit both produce and observe a test signal — genuinely useful for bench space
            and for quick signal-injection testing without a separate instrument. It&apos;s a
            real convenience, but it&apos;s additive to the scope&apos;s core measurement
            capability, not a substitute for adequate bandwidth, sample rate, or channel count —
            don&apos;t let a built-in generator compensate for a scope that&apos;s otherwise
            under-specced for your actual signal work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Display, probes, and the parts people overlook</h2>
          <p className="text-muted leading-7">
            A larger, higher-resolution display genuinely helps when reading fine waveform detail
            or navigating menus — don&apos;t underweight this on a spec sheet that&apos;s otherwise
            dominated by bandwidth and sample rate numbers. Check what probes are actually
            included: a scope bundled with low-bandwidth or uncompensated probes effectively caps
            your real-world bandwidth below the scope&apos;s own rating, since the probe is part of
            the measurement chain, not just a cable. Compensating a probe (a quick adjustment using
            the scope&apos;s built-in calibration signal) is a basic setup step worth doing on day
            one, not an advanced technique to learn later.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Vertical resolution: the spec hiding behind bandwidth</h2>
          <p className="text-muted leading-7">
            Vertical resolution — how finely the scope divides the voltage axis, usually 8-bit on
            budget and mid-range scopes, 10-12 bit on higher-end models — determines how much
            fine detail you can actually see in a signal&apos;s amplitude, independent of
            bandwidth or sample rate. An 8-bit scope divides its vertical range into 256 discrete
            steps; a 12-bit scope divides the same range into 4,096 steps. For general digital and
            analog work this rarely matters, but for seeing small amplitude variations riding on
            top of a larger signal — ripple on a power supply rail, for instance — higher vertical
            resolution reveals detail an 8-bit scope would simply flatten out.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Portable/handheld vs. bench oscilloscopes</h2>
          <p className="text-muted leading-7">
            A bench oscilloscope assumes mains power and a fixed workspace — typically more
            capability per dollar, since the design doesn&apos;t need to budget for battery life
            or a compact enclosure. A handheld or pocket oscilloscope trades some of that capability
            for genuine portability — useful for field diagnostics, automotive work away from a
            bench, or quick checks where carrying a full bench instrument isn&apos;t practical.
            Neither is objectively better; the right choice depends entirely on whether your actual
            work happens at a fixed bench or needs to travel with you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common mistakes buyers make</h2>
          <ul className="mt-1 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              Buying based on bandwidth alone and ignoring whether the sample rate and memory
              depth actually support using that bandwidth meaningfully.
            </li>
            <li>
              Assuming 2 channels will always be enough, then immediately needing a third when
              debugging a real multi-signal problem.
            </li>
            <li>
              Treating a built-in waveform generator as a reason to accept lower core
              specs elsewhere.
            </li>
            <li>
              Never compensating the included probes, then attributing the resulting signal
              distortion to the scope itself.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Where to go next</h2>
          <p className="text-muted leading-7">
            With bandwidth, sample rate, channels, and memory depth in context, the spec columns in
            our{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="text-accent hover:underline">
              full oscilloscope comparison
            </Link>{" "}
            should read as real trade-offs rather than a wall of numbers. Every spec there is
            checked against the manufacturer&apos;s own datasheet or official listing — see{" "}
            <Link href="/about" className="text-accent hover:underline">
              how we verify products
            </Link>{" "}
            for the full methodology.
          </p>
        </section>
      </div>
    </article>
    <ContentLinks category="oscilloscopes" current="/oscilloscopes/oscilloscope-buying-guide" />
    </>
  );
}
