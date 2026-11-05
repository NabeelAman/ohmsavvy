import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  SamplingChart,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Sample rate is how many snapshots per second the scope takes of a signal. Too few per cycle and the trace shows a false, slower wave instead of the real one.";

export const metadata = buildMetadata({
  title: "Oscilloscope Sample Rate Explained",
  description,
  path: "/oscilloscopes/oscilloscope-sample-rate-explained",
});

const scopes = getAllPicks("oscilloscopes");
const rigol1054z = scopes.find((p) => p.name === "Rigol DS1054Z")!;

const link = "text-accent hover:underline";

export default function OscilloscopeSampleRateExplainedPage() {
  return (
    <HowToShell
      title="Oscilloscope Sample Rate Explained"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/oscilloscopes/oscilloscope-sample-rate-explained"
      category="oscilloscopes"
      intro={
        <>
          Sample rate is how many voltage measurements per second a digital oscilloscope takes while it captures
          a signal, usually stated in samples per second (Sa/s) or mega/giga-samples per second (MSa/s, GSa/s).
          Too few samples across each cycle of a fast signal and the scope&apos;s trace can show a false, slower
          wave instead of the real one — a distortion called aliasing. As a rough guideline, scope makers&apos;
          own application notes generally put the useful sample rate somewhere around 2.5 to 5 times a signal&apos;s
          bandwidth, with roughly 4 times a commonly cited target for a trustworthy reconstruction.
        </>
      }
      aside={{
        image: rigol1054z.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope",
        caption: (
          <>
            The Rigol DS1054Z samples at up to 1 GSa/s. See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              Rigol DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-it-is", label: "What sample rate actually measures" },
        { id: "aliasing", label: "Too few samples: aliasing" },
        { id: "rule-of-thumb", label: "How much sample rate is enough" },
        { id: "real-time-channels", label: "Sample rate shared across channels" },
        { id: "memory-depth", label: "Sample rate, memory depth, and capture time" },
        { id: "scopes", label: "Sample rates across our picks" },
      ]}
      faq={[
        {
          q: "What's the difference between sample rate and bandwidth?",
          a: "Bandwidth describes the highest frequency the scope's analog front end can measure at all before attenuating the signal; sample rate describes how often the scope's analog-to-digital converter takes a reading once the signal reaches it. Both need to be adequate for an accurate capture — enough bandwidth to let the signal through, and enough sample rate to represent it faithfully once it's there.",
        },
        {
          q: "What does GSa/s mean on an oscilloscope spec sheet?",
          a: "GSa/s stands for giga-samples per second — one billion samples per second. A scope rated at 1 GSa/s takes one billion voltage readings every second when running at its maximum sample rate, typically on a single channel; using multiple channels at once often splits that total rate between them.",
        },
        {
          q: "Why does my scope's sample rate drop when I use more channels?",
          a: "Many digital scopes share a fixed total sampling capacity across their analog-to-digital converters. Using two channels at once can mean each gets half the single-channel maximum rate, and four channels can mean a quarter, depending on the scope's internal design — check the per-channel-count sample rate in the datasheet rather than assuming the headline figure always applies.",
        },
        {
          q: "Can a higher sample rate fix a scope with low bandwidth?",
          a: "No. Sample rate and bandwidth solve different problems — a high sample rate can't make the analog front end pass a frequency its bandwidth doesn't support in the first place. You need both a bandwidth high enough to let the signal through and a sample rate high enough to represent it once it does.",
        },
        {
          q: "Is 1 GSa/s enough for general hobby and repair work?",
          a: "For most hobby electronics, digital logic debugging, and repair work well under a scope's rated bandwidth, 1 GSa/s is comfortably more than enough. It becomes a real constraint only as you approach the scope's bandwidth limit or need to resolve very fast edges precisely.",
        },
        {
          q: "What is equivalent-time sampling?",
          a: "Some scopes offer an equivalent-time sampling mode that builds up a picture of a repetitive signal from many separate trigger events over time, rather than one single real-time capture — it can show a much higher effective sample rate for a steady, repeating waveform, but it doesn't work for one-off or non-repeating events. Real-time sample rate is the number that matters for anything that doesn't repeat identically.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-read-an-oscilloscope-screen",
          title: "How to Read an Oscilloscope Screen",
          desc: "The graticule, volts/div, and time/div controls that sample rate feeds into.",
        },
        {
          href: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope",
          title: "50MHz vs 100MHz Oscilloscope",
          desc: "Bandwidth compared directly, the other half of capturing a signal accurately.",
        },
      ]}
    >
      <section id="what-it-is" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">What sample rate actually measures</h2>
        <p className="text-muted leading-7">
          A digital oscilloscope doesn&apos;t see a continuous waveform the way an analog scope&apos;s electron
          beam traces one directly — it takes a series of discrete voltage snapshots at a fixed rate, then joins
          the dots to draw the trace you see on screen. Sample rate is simply how many of those snapshots happen
          per second. More samples across a given cycle of the signal means more detail about its actual shape;
          fewer samples means the scope has to guess more about what happened between readings.
        </p>
      </section>

      <section id="aliasing" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Too few samples: aliasing</h2>
        <p className="text-muted leading-7 mb-4">
          The Nyquist-Shannon sampling theorem sets the absolute floor: a signal must be sampled at more than
          twice its highest frequency component just to be captured at all without ambiguity. Sample at less than
          that, and the scope&apos;s display can show a completely different, usually slower, false wave in
          place of the real one — a distortion called aliasing. The chart below shows the same real signal
          sampled adequately versus sampled too sparsely.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption="Sampled well above the signal rate: the joined-up trace (yellow) closely follows the real signal (faint green).">
            <SamplingChart cycles={8} samples={60} label="Adequately sampled sine wave, no aliasing" />
          </Figure>
          <Figure caption="Sampled too sparsely: the same signal's samples join into a false, much slower wave than what's really there.">
            <SamplingChart cycles={8} samples={9} label="Undersampled sine wave showing aliasing as a false slow wave" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Aliasing is especially deceptive because the resulting false wave still looks like a perfectly normal,
          clean signal on screen — nothing about the display tells you it&apos;s wrong unless you already have a
          reason to suspect the real frequency is higher than what you&apos;re seeing.
        </p>
      </section>

      <section id="rule-of-thumb" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">How much sample rate is enough</h2>
        <p className="text-muted leading-7 mb-4">
          Scope makers&apos; own guidance on this varies somewhat by source, but generally lands in a similar
          range: application notes on evaluating scope sample rates commonly suggest a sample-rate-to-bandwidth
          ratio of roughly 4:1 for stable, accurate digital measurements, while other manufacturer guidance puts
          the useful range anywhere from about 2.5:1 to 5:1 depending on what you&apos;re measuring and how
          precisely. The Nyquist minimum of just over 2:1 is a mathematical floor for capturing a signal at all,
          not a comfortable margin for trusting the fine detail of its shape.
        </p>
        <DataTable
          head={["Sample-rate-to-bandwidth ratio", "What it generally gets you"]}
          rows={[
            ["~2:1 (Nyquist minimum)", "Captures the signal's existence, but shape and amplitude detail are unreliable"],
            ["~2.5:1 to 4:1", "Common manufacturer guidance range for workable digital measurements"],
            ["~4:1 and above", "Commonly cited as a comfortable target for stable, accurate capture"],
          ]}
        />
        <KeyIdea title="More margin costs nothing once you have it">
          A scope with a sample rate well above the 4:1 guideline for the signals you actually work with gives
          you headroom you&apos;ll rarely think about — the ratio only becomes a real design decision when you&apos;re
          choosing a scope for a specific, demanding signal.
        </KeyIdea>
      </section>

      <section id="real-time-channels" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Sample rate shared across channels</h2>
        <p className="text-muted leading-7 mb-4">
          Many scopes publish a single-channel maximum sample rate that drops when more channels are active at
          once, because the scope&apos;s analog-to-digital conversion capacity is a shared, finite resource. The
          Rigol DS1102Z-E is a clear example of this in its own published figures:
        </p>
        <DataTable
          head={["Scope", "Sample rate (1 channel)", "Sample rate (2 channels)"]}
          rows={[["Rigol DS1102Z-E", "1 GSa/s", "500 MSa/s"]]}
        />
        <p className="text-muted leading-7 mt-4">
          Always check the per-channel-count figure in the datasheet for the number of channels you actually plan
          to use at once, rather than assuming the single largest headline number applies regardless of how many
          channels are active.
        </p>
      </section>

      <section id="memory-depth" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Sample rate, memory depth, and capture time</h2>
        <p className="text-muted leading-7">
          Sample rate and memory depth together set how long a scope can capture at full speed: capture time
          equals memory depth divided by sample rate. A scope with 1 GSa/s and 12 million points of memory can
          hold that full sample rate for 12,000,000 ÷ 1,000,000,000 = 0.012 seconds (12 ms) before it has to
          either slow its effective sample rate or stop capturing. Once you need to see more time on screen at
          once, the scope automatically reduces its sample rate to fit the same memory into a longer window,
          which is worth knowing before assuming the headline sample rate always applies at every timebase
          setting.
        </p>
      </section>

      <section id="scopes" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Sample rates across our picks</h2>
        <p className="text-muted leading-7 mb-4">
          Sample rate varies by nearly two orders of magnitude across budget-to-midrange scopes, which is why
          it&apos;s worth checking directly rather than assuming. These figures are each scope&apos;s single-channel
          maximum as stated by the maker or official listing.
        </p>
        <Figure caption="Maximum stated sample rate (log scale), single channel, for a sample of scopes in our comparison.">
          <BarChart
            log
            items={[
              { label: "Hantek 6022BE", value: 48, display: "48 MS/s" },
              { label: "PicoScope 2204A", value: 100, display: "100 MS/s" },
              { label: "Rigol DS1054Z", value: 1000, display: "1 GSa/s" },
              { label: "Siglent SDS1104X-E", value: 1000, display: "1 GSa/s" },
              { label: "Rigol DHO804", value: 1250, display: "1.25 GSa/s", highlight: true },
              { label: "Siglent SDS814X HD", value: 2000, display: "2 GSa/s" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The Rigol DS1054Z and Siglent SDS1104X-E share the same 1 GSa/s maximum sample rate despite different
          bandwidth ratings, which makes them a useful direct comparison for isolating what bandwidth alone
          changes — covered in{" "}
          <Link href="/oscilloscopes/50mhz-vs-100mhz-oscilloscope" className={link}>
            50MHz vs 100MHz oscilloscope
          </Link>
          .
        </p>
      </section>

      <Callout title="Check both numbers before buying">
        A high sample rate with low bandwidth, or high bandwidth with a low sample rate relative to it, both
        leave you worse off than a balanced pair. Compare bandwidth and sample rate together against the signals
        you actually plan to measure, not either spec in isolation.
      </Callout>
    </HowToShell>
  );
}
