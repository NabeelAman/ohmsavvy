import Link from "next/link";
import {
  BarChart,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  ResponseChart,
  ScopeScreen,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "What oscilloscope bandwidth means: the -3 dB point, why a sine reads about 29% low there, the 3-5x rule, rise time from 0.35/BW, and how much you need.";

export const metadata = buildMetadata({
  title: "What Is Oscilloscope Bandwidth?",
  description,
  path: "/oscilloscopes/what-is-oscilloscope-bandwidth",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const fnirsi = picks.find((p) => p.name === "FNIRSI DSO152")!;

const link = "text-accent hover:underline";

export default function WhatIsOscilloscopeBandwidthPage() {
  return (
    <HowToShell
      title="What Is Oscilloscope Bandwidth?"
      description={description}
      published="2026-10-20"
      path="/oscilloscopes/what-is-oscilloscope-bandwidth"
      category="oscilloscopes"
      intro={
        <>
          Oscilloscope bandwidth is the frequency at which a scope&apos;s front end has attenuated a
          sine wave to about 70.7% of its true amplitude. It is the first number printed on almost
          every scope, and it quietly sets two limits: how accurately you can measure the size of
          a fast signal, and how sharp an edge the scope can show you. This page explains where
          that 70.7% comes from, why the usual advice is to buy 3-5x more bandwidth than your
          signal, and how to turn a bandwidth figure into a rise time you can reason about.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z is a 50MHz scope. The numbers below show what that means in practice.
            See every model compared in{" "}
            <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
              our beginner picks
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "minus-3-db-definition", label: "The -3 dB definition" },
        { id: "the-3-5x-rule", label: "Why the 3-5x rule exists" },
        { id: "square-waves-and-edges", label: "Square waves and edges" },
        { id: "rise-time", label: "Rise time ≈ 0.35 / bandwidth" },
        { id: "probes-and-settings", label: "Probes and settings" },
        { id: "how-much-bandwidth", label: "How much bandwidth you need" },
        { id: "bandwidth-and-sample-rate", label: "Bandwidth and sample rate" },
      ]}
      faq={[
        {
          q: "Is a 50MHz oscilloscope enough for a beginner?",
          a: "For most hobby microcontroller, audio and power work, yes. A 50MHz scope keeps amplitude error small on sines up to roughly 10-17MHz and shows a 10MHz clock, just with softened edges. Its own rise time is about 7 ns, so it is not the right tool for timing very fast edges, but slow serial buses, PWM and audio signals sit far inside its range.",
        },
        {
          q: "What happens if a signal is above the oscilloscope's bandwidth?",
          a: "The scope does not block it. The signal keeps getting smaller as its frequency rises past the -3 dB point, so you may still see a trace at twice the rated bandwidth, only shrunken and distorted. A square wave whose harmonics fall above the bandwidth loses its sharp corners and starts to look rounded, closer to a sine than to the real waveform.",
        },
        {
          q: "Can a probe reduce oscilloscope bandwidth?",
          a: "Yes. What you measure is limited by the whole system, not just the scope. A probe rated below the scope caps the result at the probe's figure, and a passive probe in 1x mode usually has far less bandwidth than in 10x mode. A long ground lead adds ringing on fast edges, and an uncompensated probe distorts square waves whatever the bandwidth.",
        },
        {
          q: "How do you calculate oscilloscope bandwidth from rise time?",
          a: "For typical scopes below about 1GHz, bandwidth is roughly 0.35 divided by rise time, and rise time is roughly 0.35 divided by bandwidth. A 7 ns rise time corresponds to about 50MHz, and 3.5 ns to about 100MHz. To measure an edge accurately, choose a scope whose own rise time is 3-5x faster than the edge you want to see.",
        },
        {
          q: "Does more bandwidth make an oscilloscope better?",
          a: "Only if your signals need it. Extra bandwidth improves accuracy on fast sines and sharp edges, but it also lets more high-frequency noise reach the screen, which is why many scopes offer a bandwidth-limit setting. If your highest frequency of interest is already below a fifth of the rated bandwidth, more bandwidth changes very little about the readings you take.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/what-does-gsa-s-mean",
          title: "What Does GSa/s Mean?",
          desc: "Bandwidth's partner spec: sample rate, the Nyquist limit, and how memory depth caps it.",
        },
        {
          href: "/oscilloscopes/best-beginner-oscilloscopes",
          title: "Best Oscilloscopes for Beginners",
          desc: "50MHz, 100MHz and pocket-sized options compared, with specs checked against manufacturer data.",
        },
      ]}
    >
      <section>
        <h2 id="minus-3-db-definition" className="text-xl font-semibold mb-3">The -3 dB definition, in plain numbers</h2>
        <p className="text-muted leading-7">
          Every oscilloscope input behaves like a low-pass filter. Slow signals pass through at
          full size; as frequency rises, the amplifiers, input capacitance and probe start to
          attenuate them. Manufacturers define bandwidth as the frequency where a sine wave is
          reduced by 3 decibels. In voltage terms, -3 dB is a factor of 1/√2, or about 0.707.
        </p>
        <p className="mt-3 text-muted leading-7">
          So if you feed a 6 V peak-to-peak sine into a scope at exactly its rated bandwidth, the
          screen shows roughly 4.24 V peak-to-peak. That is an error of about 29%, not a small
          rounding issue. Bandwidth is not the frequency where measurements are still accurate;
          it is the frequency where they have already gone noticeably wrong.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>A 6 V peak-to-peak sine well below the scope&apos;s bandwidth: shown at full size (6 divisions at 1 V/div).</>}>
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={3}
              labels={{ left: "1 V/div" }}
              marks={[{ x1: 1.25, y1: 1, x2: 1.25, y2: 7, text: "6 Vpp" }]}
            />
          </Figure>
          <Figure caption={<>The same signal at the bandwidth frequency: about 70.7% of its true size, roughly 4.24 divisions.</>}>
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2.12}
              labels={{ left: "1 V/div" }}
              marks={[{ x1: 1.25, y1: 1.88, x2: 1.25, y2: 6.12, text: "4.24 Vpp" }]}
            />
          </Figure>
        </div>
        <p className="mt-4 text-muted leading-7">
          Signals above the bandwidth are not cut off like a wall. They keep shrinking as frequency
          rises, which is why a scope can still show something at twice its rated bandwidth, just
          too small and too distorted to trust.
        </p>
      </section>

      <section>
        <h2 id="the-3-5x-rule" className="text-xl font-semibold mb-3">Why the 3-5x rule exists</h2>
        <p className="text-muted leading-7 mb-4">
          Because the response starts rolling off well before the -3 dB point, the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            buying guide
          </Link>{" "}
          rule of thumb is to choose a bandwidth 3-5x higher than the highest frequency you care
          about. The exact error depends on the shape of each scope&apos;s frequency response, but
          for the typical gentle roll-off of a general-purpose scope the figures land roughly here:
        </p>
        <DataTable
          head={["Signal frequency vs. bandwidth", "Approximate amplitude shown", "Approximate error"]}
          rows={[
            ["Equal to bandwidth (1x)", "70.7%", "about 29% low"],
            ["Half the bandwidth (2x margin)", "89-92%", "about 8-11% low"],
            ["One-third of bandwidth (3x margin)", "95-96%", "about 4-5% low"],
            ["One-fifth of bandwidth (5x margin)", "98-99%", "about 1-2% low"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          The ranges cover two common textbook response shapes (single-pole and Gaussian); a
          real scope sits somewhere near them, so treat these as orders of magnitude rather than
          datasheet values. The pattern is the point: a 3x margin keeps amplitude error to a few
          percent, and 5x makes it small enough to ignore for most bench work.
        </p>
        <p className="mt-3 text-muted leading-7">
          The chart below plots both models. They agree exactly at 1x, where each reads 70.7%, and
          differ by only a few percent elsewhere: about 89% and 92% at half the bandwidth, 95% and
          96% at one-third, and 98% and 99% at one-fifth. Notice how early the single-pole curve
          leaves the 100% line; that early droop is the reason for the margin.
        </p>
        <div className="mt-5">
          <Figure
            caption={
              <>
                Displayed amplitude against signal frequency as a fraction of the scope&apos;s rated
                bandwidth. Both textbook curves cross 70.7% (-3 dB) at 1x; at ⅕x they are back to
                about 98-99%, which is where the 5x rule comes from.
              </>
            }
          >
            <ResponseChart />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="square-waves-and-edges" className="text-xl font-semibold mb-3">Square waves: bandwidth is really about edges</h2>
        <p className="text-muted leading-7">
          A sine wave contains a single frequency. A square wave does not: mathematically it is a
          fundamental plus odd harmonics at 3x, 5x, 7x and so on, each smaller than the last.
          Those harmonics are what make the edges sharp. A 10MHz clock has components at 30MHz,
          50MHz, 70MHz and beyond. On a 50MHz scope the 3rd harmonic is already attenuated and the
          5th is at the -3 dB point, so the square wave appears with rounded corners and sloped
          edges even though its 10MHz fundamental is comfortably inside the spec.
        </p>
        <p className="mt-3 text-muted leading-7">
          This is why the common starting point for digital signals is a bandwidth of at least 5x
          the clock frequency, which passes the fundamental, the 3rd harmonic and (at -3 dB) the
          5th. If you care about the edge itself, the better approach is to think in rise time.
        </p>
      </section>

      <section>
        <h2 id="rise-time" className="text-xl font-semibold mb-3">Rise time ≈ 0.35 / bandwidth</h2>
        <p className="text-muted leading-7 mb-4">
          A scope&apos;s own rise time (10% to 90%) is linked to its bandwidth. For most scopes
          below about 1GHz, which have a gently rolling response, the standard approximation is
          rise time ≈ 0.35 / bandwidth. Some higher-bandwidth scopes with a flatter, sharper
          roll-off use a factor nearer 0.4-0.45, so check the datasheet if you need precision.
        </p>
        <DataTable
          head={["Scope bandwidth", "Example", "Scope rise time (0.35/BW)"]}
          mono={[2]}
          rows={[
            ["200kHz", "FNIRSI DSO152", "1.75 µs"],
            ["50MHz", "Rigol DS1054Z", "7 ns"],
            ["100MHz", "Siglent SDS1104X-E, Hantek DSO2D10", "3.5 ns"],
            ["200MHz", "General example", "1.75 ns"],
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          When you measure an edge, the rise time you see is roughly the root-sum-of-squares of
          the signal&apos;s real rise time and the scope&apos;s rise time. A worked example with a
          signal whose true rise time is 10 ns:
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
          <li>
            On a 50MHz scope (7 ns): √(10² + 7²) = √149 ≈ 12.2 ns displayed, about 22% slower
            than reality.
          </li>
          <li>
            On a 100MHz scope (3.5 ns): √(10² + 3.5²) = √112.25 ≈ 10.6 ns displayed, about 6% slow.
          </li>
        </ul>
        <div className="mt-4">
          <KeyIdea title="Rule of thumb for edges">
            To measure an edge with reasonable accuracy, pick a scope whose own rise time is 3-5x
            faster than the edge. For a 10 ns edge that means a scope rise time of 2-3.3 ns, which
            works out to roughly 105-175MHz of bandwidth by the 0.35 rule.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="probes-and-settings" className="text-xl font-semibold mb-3">The rest of the chain: probes and settings</h2>
        <p className="text-muted leading-7 mb-4">
          The bandwidth on the front panel is the scope alone. What you actually get is limited by
          everything between the circuit and the screen:
        </p>
        <InfoCards
          items={[
            {
              label: "Probe bandwidth",
              desc: "Every probe has its own rating. A probe rated below the scope caps the whole system at the lower figure.",
            },
            {
              label: "1x vs 10x",
              desc: "In 1x mode a passive probe's bandwidth is usually far lower than in 10x mode. Check the probe's spec for both.",
            },
            {
              label: "Bandwidth limit",
              desc: "Many scopes have a bandwidth-limit setting (20MHz is common) to cut noise. Left on by accident, it rounds every fast edge.",
            },
            {
              label: "Long ground leads",
              desc: "A long ground clip adds inductance that causes ringing on fast edges, which can look like a signal fault.",
            },
            {
              label: "Compensation",
              desc: "An uncompensated probe distorts square waves regardless of bandwidth. Compensate it before judging edges.",
            },
            {
              label: "More is noisier",
              desc: "Extra bandwidth also lets more high-frequency noise through, one reason the limit setting exists at all.",
            },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          Probe compensation in particular is easy to miss; the steps are in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="how-much-bandwidth" className="text-xl font-semibold mb-3">How much bandwidth do you need?</h2>
        <p className="text-muted leading-7 mb-4">
          Work out the highest frequency that matters in your signal, then apply the margin. For
          sines, that is the signal frequency; for digital and square signals, start from 5x the
          clock.
        </p>
        <DataTable
          head={["Signal", "Frequency that matters", "Suggested bandwidth"]}
          rows={[
            ["Audio sine, 20kHz", "20kHz", "60-100kHz or more"],
            ["Sine, 100kHz", "100kHz", "300-500kHz"],
            ["Sine, 10MHz", "10MHz", "30-50MHz"],
            ["1MHz clock or square wave", "5MHz (to 5th harmonic)", "5MHz minimum, more for clean edges"],
            ["10MHz clock or square wave", "50MHz (to 5th harmonic)", "50MHz minimum, 100MHz for more margin"],
          ]}
        />
        <p className="mt-4 text-muted leading-7 mb-4">
          The four scopes in our comparison span a wide range. The FNIRSI DSO152&apos;s 200kHz is
          250 times lower than the Rigol DS1054Z&apos;s 50MHz, and the two 100MHz models double
          the Rigol again:
        </p>
        <Figure
          caption={
            <>
              Rated bandwidth of the four scopes in our beginner comparison, on a logarithmic
              scale. The highlighted Rigol DS1054Z (50MHz) is the example used throughout this page.
            </>
          }
        >
          <BarChart
            log
            items={[
              { label: "FNIRSI DSO152", value: 0.2, display: "200 kHz" },
              { label: "Rigol DS1054Z", value: 50, display: "50 MHz", highlight: true },
              { label: "Siglent SDS1104X-E", value: 100, display: "100 MHz" },
              { label: "Hantek DSO2D10", value: 100, display: "100 MHz" },
            ]}
          />
        </Figure>
        <p className="mt-4 text-muted leading-7">
          Applied to real models: the{" "}
          <Link href="/oscilloscopes/fnirsi-dso152-review" className={link}>
            FNIRSI DSO152
          </Link>
          &apos;s 200kHz bandwidth suits audio-range and slow control signals, but a 100kHz sine
          is already at half its bandwidth and will read noticeably low. The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z
          </Link>{" "}
          at 50MHz keeps amplitude error small on sines up to roughly 10-17MHz (the 5x and 3x margins) and shows a 10MHz clock with
          softened edges. The 100MHz{" "}
          <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
            Siglent SDS1104X-E
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
            Hantek DSO2D10
          </Link>{" "}
          double that headroom and halve the scope&apos;s own rise time. For most hobby
          microcontroller, audio and power work, 50-100MHz is enough, which is why the{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner picks
          </Link>{" "}
          cluster there.
        </p>
        <div className="mt-6">
          <ProductStrip
            title="Scopes discussed on this page"
            items={[
              {
                name: "Rigol DS1054Z",
                image: rigol.image,
                alt: "Rigol DS1054Z four-channel 50MHz digital oscilloscope, front view",
                href: "/oscilloscopes/rigol-ds1054z-review",
                note: "50MHz, 4 channels, 1 GSa/s, 7-inch display, with strong community documentation.",
              },
              {
                name: "Siglent SDS1104X-E",
                image: siglent.image,
                alt: "Siglent SDS1104X-E four-channel 100MHz digital oscilloscope",
                href: "/oscilloscopes/siglent-sds1104x-e-review",
                note: "100MHz, 4 channels, 1 GSa/s: twice the Rigol's bandwidth.",
              },
              {
                name: "FNIRSI DSO152",
                image: fnirsi.image,
                alt: "FNIRSI DSO152 pocket-sized single-channel handheld oscilloscope",
                href: "/oscilloscopes/fnirsi-dso152-review",
                note: "200kHz, 1 channel, 2.5 MSa/s, pocket-sized.",
              },
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="bandwidth-and-sample-rate" className="text-xl font-semibold mb-3">Bandwidth is half the story</h2>
        <p className="text-muted leading-7">
          A front end with plenty of bandwidth still needs enough samples to draw the waveform.
          That second limit is the sample rate, covered in{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means on an oscilloscope
          </Link>
          . If you are new to scopes altogether, start with{" "}
          <Link href="/oscilloscopes/what-is-an-oscilloscope" className={link}>
            what an oscilloscope is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read the screen
          </Link>
          , then check amplitude yourself with{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>
    </HowToShell>
  );
}
