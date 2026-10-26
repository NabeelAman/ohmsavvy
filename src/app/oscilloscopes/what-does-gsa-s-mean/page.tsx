import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  SamplingChart,
  ScopeScreen,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "What GSa/s means on an oscilloscope: sample rate explained, the Nyquist 2x minimum, practical oversampling, shared channels, and how memory depth limits it.";

export const metadata = buildMetadata({
  title: "What Does GSa/s Mean on an Oscilloscope?",
  description,
  path: "/oscilloscopes/what-does-gsa-s-mean",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

export default function WhatDoesGsaSMeanPage() {
  return (
    <HowToShell
      title="What Does GSa/s Mean on an Oscilloscope?"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/what-does-gsa-s-mean"
      category="oscilloscopes"
      intro={
        <>
          GSa/s on an oscilloscope means giga-samples per second: billions of individual voltage
          measurements the scope can take each second. It is the sample rate, and together with{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth
          </Link>{" "}
          it decides whether the waveform on screen is a faithful picture of your signal. This page
          covers what the number means, the Nyquist minimum, how much oversampling is sensible,
          and the two things that quietly reduce the headline figure: shared channels and memory
          depth.
        </>
      }
      aside={{
        image: fnirsi.image,
        alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
        caption: (
          <>
            The{" "}
            <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
              FNIRSI DSO152
            </Link>{" "}
            samples at 2.5 MSa/s, one sample every 400 ns, against 1 GSa/s for the bench scopes.
            Compare sample rates across models in{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
              our beginner picks
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "reading-the-unit", label: "Reading the unit" },
        { id: "nyquist-minimum", label: "The Nyquist minimum" },
        { id: "why-2x-is-not-enough", label: "Why 2x is not enough" },
        { id: "shared-channels", label: "Sample rate shared across channels" },
        { id: "memory-depth", label: "Memory depth and slow time/div" },
        { id: "one-shot-events", label: "One-shot events" },
        { id: "spec-sheet-checklist", label: "Spec sheet checklist" },
      ]}
      faq={[
        {
          q: "What is the difference between sample rate and bandwidth?",
          a: "Bandwidth describes the analog front end: the frequency at which a sine is reduced to about 70.7% of its true size before it is ever digitised. Sample rate describes how often the converter then measures that filtered signal. You need both: a fast sample rate cannot restore detail the front end has already removed, and a wide front end is wasted if too few samples are taken.",
        },
        {
          q: "What does MSa/s mean on an oscilloscope?",
          a: "MSa/s means mega-samples per second, or millions of voltage measurements each second. It is a thousand times slower than GSa/s. A 2.5 MSa/s scope such as the FNIRSI DSO152 takes one sample every 400 ns, so its Nyquist frequency is 1.25MHz, which is why scopes at that rate are suited to audio-range and slow control signals rather than fast digital work.",
        },
        {
          q: "Is a higher sample rate always better on an oscilloscope?",
          a: "Up to a point. A higher rate puts more samples on each cycle and makes short glitches harder to miss, but beyond about 4-5x the bandwidth the extra samples add less, because the front end has already filtered out faster content. Memory depth matters too: a high rate with shallow memory has to slow down on long time/div settings, which can cancel out the headline figure.",
        },
        {
          q: "How many samples per cycle do you need to see a waveform?",
          a: "More than two samples per cycle is the theoretical minimum to identify a frequency, but that is not enough to see its shape. At 2.5 samples per cycle peaks are often missed, while 10 or more samples per cycle give a recognizable sine even with straight-line interpolation. Sin(x)/x interpolation can rebuild smooth curves from fewer points, which is why it is offered on many scopes.",
        },
        {
          q: "Does turning off channels increase the sample rate?",
          a: "On many multi-channel scopes, yes. The analog-to-digital converters are shared, so the headline rate often applies to one channel and is divided when more channels are switched on. The exact split depends on the model, so check the datasheet for the per-channel figure. If you need the fastest sampling on one signal, switch off the channels you are not using.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/what-is-oscilloscope-bandwidth",
          title: "What Is Oscilloscope Bandwidth?",
          desc: "The -3 dB point, the 3-5x rule and rise time: the other half of the speed question.",
        },
        {
          href: "/oscilloscopes/oscilloscope-buying-guide",
          title: "Oscilloscope Buying Guide",
          desc: "How sample rate, bandwidth, channels and memory depth trade off when you choose a scope.",
        },
      ]}
    >
      <section>
        <h2 id="reading-the-unit" className="text-xl font-semibold mb-3">Reading the unit</h2>
        <p className="text-muted leading-7 mb-4">
          A digital oscilloscope does not record a continuous line. Its analog-to-digital
          converter measures the input voltage at regular instants, and the scope joins those
          points up on screen. &quot;Sa&quot; stands for samples, not seconds or bits, and the prefix
          tells you the scale. The time between samples is simply 1 divided by the sample rate.
        </p>
        <Figure
          caption={
            <>
              Where sample rate sits in a digital scope: the front end shapes the signal, the ADC
              takes the samples, memory holds them and the display draws them. Sample rate is set
              at step 2; memory depth at step 3 decides how long it can be kept up.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Probe & front end", sub: "Scales the signal; bandwidth filters it" },
              { label: "ADC sampling", sub: "Measures voltage every 1 / sample rate" },
              { label: "Memory", sub: "Stores samples; depth sets capture length" },
              { label: "Display", sub: "Joins or interpolates the dots on screen" },
            ]}
          />
        </Figure>
        <p className="mt-4 text-muted leading-7 mb-4">
          Converting the prefixes for the scopes in our comparison gives these figures:
        </p>
        <DataTable
          head={["Written as", "Samples per second", "Time between samples", "Example"]}
          mono={[2]}
          rows={[
            ["1 GSa/s", "1,000,000,000", "1 ns", "Rigol DS1054Z, Siglent SDS1104X-E, Hantek DSO2D10"],
            ["2.5 MSa/s", "2,500,000", "400 ns", "FNIRSI DSO152"],
            ["100 MSa/s", "100,000,000", "10 ns", "General example"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          You will also see GS/s or GSPS; they mean the same thing. Sample rate is not the same as
          vertical resolution (usually 8 bits on budget scopes), which is how finely each sample
          is measured; the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          covers that separately.
        </p>
        <p className="mt-3 text-muted leading-7 mb-4">
          On a chart the gap between a pocket scope and a bench scope is easier to see. The
          FNIRSI DSO152&apos;s 2.5 MSa/s is 400 times lower than the 1 GSa/s of the other three
          models:
        </p>
        <Figure
          caption={
            <>
              Headline sample rates on a logarithmic scale. 1 GSa/s is 400x 2.5 MSa/s, so the
              other three scopes take 400 samples in the time the FNIRSI DSO152 takes one.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "FNIRSI DSO152", value: 2.5, display: "2.5 MSa/s", highlight: true },
              { label: "Rigol DS1054Z", value: 1000, display: "1 GSa/s" },
              { label: "Siglent SDS1104X-E", value: 1000, display: "1 GSa/s" },
              { label: "Hantek DSO2D10", value: 1000, display: "1 GSa/s" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="nyquist-minimum" className="text-xl font-semibold mb-3">The Nyquist minimum: more than 2x</h2>
        <p className="text-muted leading-7">
          The Nyquist-Shannon sampling theorem says that to represent a signal without ambiguity,
          you must sample at more than twice its highest frequency component. Half the sample rate
          is called the Nyquist frequency: 500MHz for a 1 GSa/s scope, 1.25MHz for a 2.5 MSa/s one.
        </p>
        <p className="mt-3 text-muted leading-7">
          Break that rule and the scope does not show an error. It shows a wrong waveform that
          looks perfectly plausible, called an alias. A sine above the Nyquist frequency folds
          back down to a lower apparent frequency. For example, a 900kHz sine sampled at 1 MSa/s
          produces samples that fit a 100kHz sine (1MHz minus 900kHz), and that is what the scope
          draws.
        </p>
        <p className="mt-3 text-muted leading-7">
          The pair below shows the mechanism. On the left, 20 samples land on every cycle and the
          joined dots trace the real wave closely. On the right, the signal completes 9 cycles
          while only 10 samples are taken, about 1.1 samples per cycle. Each dot is genuinely on
          the real waveform, yet joining them draws one slow cycle that does not exist.
        </p>
        <div className="mt-5">
          <Figure
            caption={
              <>
                Left: 2 cycles, 40 samples (20 per cycle), a faithful trace. Right: 9 cycles, 10
                samples (about 1.1 per cycle), well under the Nyquist minimum; the yellow trace
                shows a single false cycle across the screen.
              </>
            }
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="mb-2 text-xs font-medium text-center">20 samples per cycle</p>
                <SamplingChart cycles={2} samples={40} label="Sine sampled 20 times per cycle; the joined samples match the signal" />
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-center">1.1 samples per cycle: aliasing</p>
                <SamplingChart cycles={9} samples={10} label="Sine sampled 1.1 times per cycle; the joined samples form one false slow cycle" />
              </div>
            </div>
          </Figure>
        </div>
        <div className="mt-5">
          <Figure
            caption={
              <>
                An alias: a 900kHz sine sampled at 1 MSa/s can be drawn as a clean 100kHz sine. Each
                cycle spans 2 divisions at 5 µs/div, a 10 µs period, so the scope&apos;s frequency
                readout would say 100kHz.
              </>
            }
          >
            <ScopeScreen
              wave="sine"
              cycles={5}
              amplitude={2.5}
              labels={{ left: "1 V/div", right: "5 µs/div" }}
              marks={[{ x1: 0, y1: 7.3, x2: 2, y2: 7.3, text: "10 µs" }]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Callout title="How to catch an alias">
            If a reading looks suspicious, change the time/div setting. A real waveform keeps the
            same frequency when you zoom; an alias often jumps to a different apparent frequency
            as the scope changes its sample rate. Checking the frequency with a different
            instrument, or simply knowing roughly what to expect, also helps. See{" "}
            <Link href="/oscilloscopes/how-to-measure-frequency-with-an-oscilloscope" className={link}>
              how to measure frequency with an oscilloscope
            </Link>{" "}
            for the full method.
          </Callout>
        </div>
      </section>

      <section>
        <h2 id="why-2x-is-not-enough" className="text-xl font-semibold mb-3">Why 2x is not enough in practice</h2>
        <p className="text-muted leading-7 mb-4">
          Nyquist tells you the minimum needed to identify a frequency, not to see its shape.
          At just over 2 samples per cycle, the peaks can fall between samples, and edges get
          only one or two points. A more useful way to think about sample rate is samples per
          cycle of your signal:
        </p>
        <DataTable
          head={["Sample rate", "Signal", "Samples per cycle"]}
          mono={[2]}
          rows={[
            ["1 GSa/s", "10MHz", "100"],
            ["1 GSa/s", "50MHz", "20"],
            ["1 GSa/s", "100MHz", "10"],
            ["2.5 MSa/s", "200kHz", "12.5"],
            ["2.5 MSa/s", "1MHz", "2.5"],
          ]}
        />
        <p className="mt-4 text-muted leading-7 mb-4">
          The last row is legal by Nyquist but not pretty. At 2.5 samples per cycle the frequency
          survives, yet the dots never land exactly on the peaks, so straight lines between them give a
          jagged wave whose height varies from cycle to cycle:
        </p>
        <Figure
          caption={
            <>
              4 cycles, 10 samples: 2.5 samples per cycle, just above the Nyquist minimum. The
              count of cycles is right, but the joined dots never hit the true peaks and the shape is lost.
            </>
          }
        >
          <div className="mx-auto max-w-md">
            <SamplingChart cycles={4} samples={10} label="Sine sampled 2.5 times per cycle; the frequency is kept but the shape is not" />
          </div>
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Scopes help by interpolating between samples. Many offer a choice between linear (straight
          lines between dots) and sin(x)/x interpolation, which reconstructs smooth curves from
          fewer points; check your model&apos;s manual for what it uses. Even so, a common guideline
          is a sample rate at least 4-5x the scope&apos;s bandwidth, and more is better. The four
          scopes in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner comparison
          </Link>{" "}
          all clear that at their headline rate:
        </p>
        <DataTable
          head={["Model", "Bandwidth", "Headline sample rate", "Ratio"]}
          mono={[3]}
          rows={[
            ["Rigol DS1054Z", "50MHz", "1 GSa/s", "20x"],
            ["Siglent SDS1104X-E", "100MHz", "1 GSa/s", "10x"],
            ["Hantek DSO2D10", "100MHz", "1 GSa/s", "10x"],
            ["FNIRSI DSO152", "200kHz", "2.5 MSa/s", "12.5x"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          The catch is the word headline. Two common design choices mean you will not always get it.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Sample rates in our reviews"
            items={[
              {
                name: "FNIRSI DSO152",
                image: fnirsi.image,
                alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
                href: "/oscilloscopes/fnirsi-dso152-review",
                note: "2.5 MSa/s on 1 channel, 200kHz bandwidth, pocket-sized.",
              },
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel digital oscilloscope with a 1 GSa/s sample rate",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "1 GSa/s, 4 channels, 50MHz, 7-inch display, strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel 100MHz digital oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "1 GSa/s, 4 channels, 100MHz.",
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="shared-channels" className="text-xl font-semibold mb-3">Catch 1: sample rate is often shared across channels</h2>
        <p className="text-muted leading-7">
          On many multi-channel scopes, the maximum sample rate is quoted for one channel (or one
          channel per converter). The converters are shared, so turning on more channels divides
          the available rate between them. A scope advertised at 1 GSa/s may sample each channel
          at a fraction of that with all channels active. How it splits varies by model, so check
          your model&apos;s datasheet for the per-channel figure with two, three and four channels
          on. In practice, switch off channels you are not using when you need the fastest
          sampling on the ones you are.
        </p>
      </section>

      <section>
        <h2 id="memory-depth" className="text-xl font-semibold mb-3">Catch 2: memory depth caps the rate at slow time/div</h2>
        <p className="text-muted leading-7 mb-4">
          Every sample has to be stored. Memory depth (record length, in points) and sample rate
          set how long one capture lasts:
        </p>
        <KeyIdea title="The relationship">
          Capture time = memory depth / sample rate. Turned around: sample rate = memory depth /
          capture time. With 1 Mpts at 1 GSa/s, a capture lasts 1 ms.
        </KeyIdea>
        <p className="mt-4 text-muted leading-7 mb-4">
          On most scopes the screen spans 10 horizontal divisions, so the capture time is roughly
          10 x the time/div setting. When the window gets long, a scope with limited memory has to
          drop its sample rate to fit. Here is a generic scope with 1 Mpts of memory and a 1 GSa/s
          maximum:
        </p>
        <DataTable
          head={["Time/div", "Screen window", "Points needed at 1 GSa/s", "Rate with 1 Mpts"]}
          mono={[3]}
          rows={[
            ["100 ns/div", "1 µs", "1,000", "1 GSa/s"],
            ["10 µs/div", "100 µs", "100,000", "1 GSa/s"],
            ["1 ms/div", "10 ms", "10,000,000", "100 MSa/s"],
            ["100 ms/div", "1 s", "1,000,000,000", "1 MSa/s"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Exact behavior varies: some scopes capture more than the visible window, step the rate
          in fixed increments, or let you choose the memory depth manually. Many show the actual
          sample rate in use on screen, which is worth glancing at. The practical lesson is that
          deeper memory is what lets a scope keep a high sample rate on long captures, such as
          catching a short glitch inside a slow serial transaction.
        </p>
      </section>

      <section>
        <h2 id="one-shot-events" className="text-xl font-semibold mb-3">When sample rate matters most: one-shot events</h2>
        <p className="text-muted leading-7">
          On a steady, repeating waveform, the scope captures cycle after cycle and the picture
          builds up from many acquisitions, so a modest sample rate is often forgiving. A one-off
          event is different: a single glitch, a power-up sequence or one serial packet happens
          once, and the scope gets exactly one chance to sample it. If a 5 ns spike lands between
          two samples taken 10 ns apart, it can be missed entirely. For single-shot captures,
          the real-time sample rate in use at that moment, after channel sharing and memory
          limits, is the number that decides what you see. Set up the capture with{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            a Single trigger
          </Link>
          , use only the channels you need, and keep the time/div no longer than the event
          requires.
        </p>
      </section>

      <section>
        <h2 id="spec-sheet-checklist" className="text-xl font-semibold mb-3">Checklist: sample rate on a spec sheet</h2>
        <InfoCards
          items={[
            { label: "Check the ratio", desc: "Sample rate should be at least 4-5x the bandwidth, ideally more." },
            { label: "Read the footnote", desc: "Find the rate with all channels on, not just the headline single-channel figure." },
            { label: "Look at memory", desc: "Deep memory protects the sample rate at slow time/div settings." },
            { label: "Watch the readout", desc: "Many scopes display the live sample rate; it can be far below the maximum." },
            { label: "Suspect aliases", desc: "If frequency changes when you change time/div, sampling is too slow." },
            { label: "Pair with bandwidth", desc: "A fast sample rate cannot recover detail the front end already filtered out." },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          New to the instrument? Start with{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use one
          </Link>
          , or read the{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          to see these specs in the context of a real scope.
        </p>
      </section>
    </HowToShell>
  );
}
