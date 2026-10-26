import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to measure noise floor with an oscilloscope: test the scope's own noise, RMS vs peak-to-peak, 20MHz bandwidth limit, 1x vs 10x probes, then a power rail.";

export const metadata = buildMetadata({
  title: "How to Measure Noise Floor With an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

/** Deterministic pseudo-random Gaussian samples (sum of four uniforms), so the drawing is identical on every render. */
function gaussianSamples(n: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: n }, () => (rand() + rand() + rand() + rand() - 2) / 0.577);
}

/** Random noise on a scope screen with the ±1σ (RMS) band and the ±3σ peak-to-peak extent marked. */
function NoiseScreen({ ripple = false }: { ripple?: boolean }) {
  const W = 300;
  const H = 200;
  const cy = ripple ? 100 : 95;
  const sigma = ripple ? 6 : 13;
  const noise = gaussianSamples(300, ripple ? 7 : 42);
  const pts = noise
    .map((v, i) => {
      // Sawtooth-like ripple: slow discharge, quick recharge, three cycles across the screen.
      const ph = (i / 100) % 1;
      const r = ripple ? (ph < 0.85 ? 30 - (ph / 0.85) * 60 : -30 + ((ph - 0.85) / 0.15) * 60) : 0;
      return `${i},${(cy - r - v * sigma).toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      viewBox="-6 -6 312 232"
      className="w-full h-auto"
      role="img"
      aria-label={
        ripple
          ? "Scope screen showing a slow repeating ripple waveform with fine random noise riding on top of it"
          : "Scope screen showing random noise with the RMS band at plus and minus one sigma and the peak-to-peak extent at roughly plus and minus three sigma"
      }
    >
      <rect x="0" y="0" width={W} height="220" rx="4" className="fill-[#0f1a14]" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2={H} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 25} x2={W} y2={i * 25} stroke="#2c4a3a" strokeWidth="0.6" strokeDasharray="2 3" />
      ))}
      {!ripple && (
        <>
          <rect x="0" y={cy - sigma} width={W} height={sigma * 2} fill="#5BB3E8" fillOpacity="0.18" />
          <line x1="0" x2={W} y1={cy - 3 * sigma} y2={cy - 3 * sigma} stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 3" />
          <line x1="0" x2={W} y1={cy + 3 * sigma} y2={cy + 3 * sigma} stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 3" />
        </>
      )}
      <polyline points={pts} fill="none" stroke="#7CFC9A" strokeWidth="1.1" strokeLinejoin="round" />
      {ripple ? (
        <>
          <text x="6" y="16" fontSize="10" fill="#ffd56b">ripple: repeats at the switching rate</text>
          <text x="6" y="188" fontSize="10" fill="#5BB3E8">noise: random fuzz on top</text>
        </>
      ) : (
        <>
          <text x="294" y={cy - 3 * sigma - 5} fontSize="10" textAnchor="end" fill="#ffd56b">+3σ</text>
          <text x="294" y={cy + 3 * sigma + 13} fontSize="10" textAnchor="end" fill="#ffd56b">−3σ</text>
          <text x="6" y={cy - sigma - 4} fontSize="10" fill="#5BB3E8">±1σ = RMS</text>
        </>
      )}
      <text x="150" y="214" fontSize="9" textAnchor="middle" fill="#9fe3b4">
        {ripple ? "AC coupled, 20MHz BW limit" : "Vpp ≈ 6 × RMS as a rule of thumb"}
      </text>
    </svg>
  );
}

export default function HowToMeasureNoiseFloorWithAnOscilloscopePage() {
  return (
    <HowToShell
      title="How to Measure Noise Floor With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure noise floor with an oscilloscope, start with the scope itself: terminate or short the
          input, select the most sensitive V/div and read the RMS and peak-to-peak values. That is the
          floor below which nothing you measure is trustworthy. Then connect to the circuit with a short
          spring ground, the bandwidth limit on and the right probe ratio, and compare what you see against
          that baseline.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel 100MHz digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is our pick for growing into. Every scope
            has its own noise floor, so measure yours before trusting millivolt readings; see the{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-noise-floor-means", label: "What noise floor means" },
        { id: "measure-the-scope-first", label: "Measure the scope's own noise" },
        { id: "rms-vs-peak-to-peak", label: "RMS vs peak-to-peak" },
        { id: "bandwidth-limit", label: "Use the 20MHz bandwidth limit" },
        { id: "probe-ratio", label: "1x vs 10x probe noise" },
        { id: "spring-ground", label: "Use a spring ground tip" },
        { id: "averaging-vs-high-res", label: "Averaging vs high-res mode" },
        { id: "measure-a-power-rail", label: "Measure a power rail's noise" },
        { id: "ripple-vs-noise", label: "Ripple vs noise" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "What is a typical oscilloscope noise floor?",
          a: "It depends on the model, the V/div setting and the bandwidth, which is why measuring your own is worthwhile. Some manufacturers publish a noise figure in their datasheets, usually at the most sensitive range and full bandwidth. Expect the floor in volts to be lowest on the most sensitive settings and to rise when you switch to coarser V/div ranges.",
        },
        {
          q: "Should I measure noise in RMS or peak-to-peak?",
          a: "Record both and say which bandwidth you used. RMS is stable and repeatable, so it is the better number for comparing setups. Peak-to-peak is what matters when noise could push a signal across a logic threshold or an ADC's input, but it keeps growing the longer you watch, so note the capture length or the number of acquisitions.",
        },
        {
          q: "Why does my scope show noise with nothing connected?",
          a: "Every scope front end has amplifier noise, and its analogue-to-digital converter adds quantisation steps, so a trace is never perfectly flat at sensitive settings. An open input also picks up stray fields from the room. Fit a terminator or short the probe to its own ground; what remains is the scope's genuine floor rather than pickup.",
        },
        {
          q: "Does the bandwidth limit hide real noise?",
          a: "It removes noise above the limit, so yes, by design. For power rails feeding typical digital and analogue parts, content above 20MHz is usually filtered by the load's own decoupling, and many power supply datasheets specify noise in a 20MHz bandwidth. If your circuit is sensitive at higher frequencies, measure with the limit off as well and report both.",
        },
        {
          q: "How do I subtract the scope's noise from my measurement?",
          a: "Random noise sources add as the square root of the sum of squares, not directly. Square the RMS value you measured on the circuit, subtract the square of the scope's own RMS floor at the same settings, and take the square root. This only works for RMS values and only when the circuit's noise is not far below the scope's floor.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage with an Oscilloscope",
          desc: "The periodic part of a supply's output: AC coupling, timebase and reading ripple peak-to-peak.",
        },
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why Does an Oscilloscope Waveform Look Noisy?",
          desc: "Ground leads, ground loops and miscompensation: the setup problems that masquerade as circuit noise.",
        },
      ]}
    >
      <Callout title="Rails, grounds and mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Only measure low-voltage secondary rails this way. A probe ground clip is earthed through the
            scope, so never connect it to anything on the mains side of a power supply.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-noise-floor-means" className="text-xl font-semibold mb-3">What noise floor means on an oscilloscope</h2>
        <p className="text-muted leading-7 mb-4">
          Noise is the random, broadband variation sitting on every real signal. An oscilloscope adds its
          own: its input amplifier generates some, the analogue-to-digital converter rounds each sample to a
          finite step, and the probe and its ground lead pick up fields from nearby equipment. The noise
          floor is the smallest variation you can measure before the instrument&apos;s contribution
          dominates. If a circuit&apos;s noise reads close to the floor, the honest answer is &quot;at or
          below what this setup can see&quot;.
        </p>
        <Figure caption={<>Random noise as a scope draws it. The shaded band marks ±1σ, which equals the RMS value for zero-mean noise; almost all of the trace stays within ±3σ.</>}>
          <NoiseScreen />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="measure-the-scope-first">Measure the scope&apos;s own noise first</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>
            Disconnect the signal. Either fit a BNC terminator or shorting cap to the channel, or attach the
            probe you will use and clip its tip to its own ground with the spring tip.
          </li>
          <li>Choose DC coupling and the most sensitive V/div the channel offers.</li>
          <li>Set the same timebase and sample rate you plan to use on the circuit.</li>
          <li>Use Auto trigger mode, since there is no edge to trigger on.</li>
          <li>Add AC RMS (or RMS) and peak-to-peak measurements and turn on statistics.</li>
          <li>Repeat with the bandwidth limit on and off, and at each V/div you expect to use.</li>
        </ol>
        <p className="text-muted leading-7">
          Write the results down. The figure with the probe attached is the one that applies to real
          measurements.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="rms-vs-peak-to-peak">Peak-to-peak vs RMS noise</StepHeading>
        <p className="text-muted leading-7 mb-4">
          RMS describes the noise&apos;s typical size and settles to a steady number quickly. Peak-to-peak
          describes its worst excursions, and for random noise it keeps growing slowly as you collect more
          samples, because rarer large peaks keep arriving. For noise with a Gaussian distribution, a common
          rule of thumb is that Vpp ≈ 6 × RMS, since about 99.7% of samples fall within ±3σ.
        </p>
        <DataTable
          head={["Vpp as a multiple of RMS", "Share of Gaussian samples inside that window"]}
          rows={[
            ["4 × RMS (±2σ)", "About 95.4%"],
            ["6 × RMS (±3σ)", "About 99.7%: the usual rule of thumb"],
            ["6.6 × RMS (±3.3σ)", "About 99.9%"],
            ["8 × RMS (±4σ)", "About 99.994%"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          If your measured Vpp is far more than six times the RMS, the noise is probably not random: look
          for spikes from switching edges or bursts from a radio or motor.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="bandwidth-limit">Use the 20MHz bandwidth limit, and say so</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For broadband noise, the RMS value grows roughly with the square root of the bandwidth you
          measure over. Turning on the 20MHz limit that most bench scopes offer therefore lowers the reading
          noticeably on a 100MHz scope. The chart shows the textbook relationship for flat (white) noise; real
          noise spectra are rarely perfectly flat, so treat it as a guide.
        </p>
        <Figure caption={<>Relative RMS of flat noise measured over different bandwidths, from the square-root rule. Narrowing a 100MHz view to 20MHz cuts RMS noise to roughly 45%.</>}>
          <BarChart
            items={[
              { label: "100MHz (full)", value: 100, display: "100%" },
              { label: "50MHz", value: 70.7, display: "≈ 71%" },
              { label: "20MHz limit", value: 44.7, display: "≈ 45%", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A noise figure without its bandwidth is meaningless, so always record it. Our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth guide
          </Link>{" "}
          explains how the front end rolls off.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="probe-ratio">1x vs 10x probes: why the ratio changes the floor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The scope&apos;s channel noise is a fixed amount of voltage at the BNC connector. A 10x probe
          divides the signal by ten before it gets there, and the scope multiplies the display back up by
          ten, so the channel&apos;s own noise is multiplied by ten too when referred to the probe tip.
        </p>
        <Figure caption={<>Worked example, not a measured figure: a hypothetical scope with 0.2 mV RMS of channel noise at its input, viewed through each probe setting.</>}>
          <BarChart
            items={[
              { label: "1x probe, at the tip", value: 0.2, display: "0.2 mV RMS", highlight: true },
              { label: "10x probe, at the tip", value: 2, display: "2 mV RMS" },
            ]}
          />
        </Figure>
        <KeyIdea title="The trade-off">
          A 1x probe gives the lowest floor, but typically has much lower bandwidth and heavier capacitive
          loading than 10x. That is acceptable on a low-impedance power rail and unacceptable on a fast or
          high-impedance node.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="spring-ground">Replace the ground clip with a spring tip</StepHeading>
        <p className="text-muted leading-7">
          The standard ground lead forms a loop several centimeters across, and that loop behaves like an
          antenna for magnetic fields from switching regulators, transformers and motors. A spring ground tip shrinks the loop to almost
          nothing. To check, short the probe tip to the spring tip right next to the circuit while it runs:
          anything that still appears is pickup, and it sets your practical floor.
        </p>
      </section>

      <section>
        <h2 id="averaging-vs-high-res" className="text-xl font-semibold mb-3">Averaging vs high-res mode</h2>
        <p className="text-muted leading-7 mb-4">
          Both reduce noise on screen, in different ways, and both change what you are measuring:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <DataTable
            head={["Mode", "What it does to noise"]}
            rows={[
              ["Average", "Combines many triggered captures. Random noise averages towards zero, so it all but disappears. Useful to reveal a repeating signal; useless for measuring noise."],
              ["High-res", "Averages neighboring samples within one capture. Acts like a low-pass filter, lowering both noise and effective bandwidth."],
              ["Normal", "Raw samples. Use this for noise floor measurements."],
            ]}
          />
          <Figure caption={<>With averaging on, a terminated input looks perfectly clean. The noise has not gone away; the mode has hidden it.</>}>
            <ScopeScreen wave="flat" labels={{ left: "1 mV/div", right: "Average ×64" }} />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="measure-a-power-rail" className="text-xl font-semibold mb-3">Measure a power rail&apos;s noise with an oscilloscope</h2>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7 mb-4">
          <li>Probe across the output capacitor nearest the load, with the spring tip on its ground pad.</li>
          <li>Switch to AC coupling so you can use a sensitive V/div despite the DC level.</li>
          <li>Turn on the 20MHz limit unless you need to see higher frequencies.</li>
          <li>Read AC RMS and Vpp with statistics, over a capture long enough to include several ripple cycles.</li>
        </ol>
        <p className="text-muted leading-7">
          If the rail reading is close to the floor, subtract in quadrature: a 3 mV RMS rail reading over a
          1 mV RMS floor implies about √(3² − 1²) ≈ 2.8 mV RMS from the circuit. For DC levels and the basics
          of reading a trace in volts, see{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="ripple-vs-noise" className="text-xl font-semibold mb-3">Ripple vs noise: two different measurements</h2>
        <p className="text-muted leading-7 mb-4">
          On a supply rail the two overlap, but they are not the same thing. Ripple is periodic, locked to
          the mains or switching frequency, so you can trigger on it and it looks the same on every sweep.
          Noise is random and broadband; it never repeats and cannot be triggered on. Measure ripple with a
          timebase that shows a few cycles, and noise as RMS over a defined bandwidth. Our guide to{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            measuring ripple voltage with an oscilloscope
          </Link>{" "}
          covers the periodic part in depth.
        </p>
        <Figure caption={<>A switching supply output: a slow, repeating ripple with random noise riding on it. The ripple can be triggered on; the fuzz cannot.</>}>
          <NoiseScreen ripple />
        </Figure>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which oscilloscope you need for noise work</h2>
        <p className="text-muted leading-7 mb-6">
          A bench scope with a sensitive lowest V/div range, a 20MHz bandwidth limit and RMS measurements
          with statistics covers most rail-noise work. Check the datasheet for the lowest V/div and any
          published noise figure before buying, and compare models in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Our best overall pick for hobbyists and students.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with more bandwidth headroom than entry-level scopes.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
