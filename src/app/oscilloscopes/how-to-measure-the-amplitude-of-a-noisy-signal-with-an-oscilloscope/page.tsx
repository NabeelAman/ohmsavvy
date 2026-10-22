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
  "How to measure the amplitude of a noisy signal with an oscilloscope: why Vpp reads high, Vamp vs Vpp, averaging, high-res, bandwidth limit and RMS subtraction.";

export const metadata = buildMetadata({
  title: "How to Measure the Amplitude of a Noisy Signal",
  description,
  path: "/oscilloscopes/how-to-measure-the-amplitude-of-a-noisy-signal-with-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;

const link = "text-accent hover:underline";

/** Repeatable pseudo-random values (sum of three uniforms), so the drawing is identical on every render. */
function fuzz(n: number, seed: number) {
  let s = seed;
  const r = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  return Array.from({ length: n }, () => r() + r() + r() - 1.5);
}

/** A noisy square wave with the max/min (Vpp) and top/base (Vamp) levels, plus a sideways histogram of sample levels. */
function TopBaseDiagram() {
  const top = 55;
  const base = 135;
  const noise = fuzz(220, 2026);
  const pts = noise
    .map((v, i) => {
      const high = Math.floor(i / 55) % 2 === 0;
      return `${i + 4},${((high ? top : base) + v * 14).toFixed(1)}`;
    })
    .join(" ");
  const bins = Array.from({ length: 34 }, (_, k) => 28 + k * 4);
  const hump = (y: number, c: number) => Math.exp(-(((y - c) / 7) ** 2) / 2);
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Noisy square wave with peak-to-peak measured between the noise extremes and amplitude measured between the top and base levels, next to a histogram with two peaks at those levels"
    >
      <rect x="0" y="0" width="232" height="190" rx="4" className="fill-[#0f1a14]" />
      <polyline points={pts} fill="none" stroke="#7CFC9A" strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="0" x2="232" y1="33" y2="33" stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="0" x2="232" y1="157" y2="157" stroke="#ffd56b" strokeWidth="1" strokeDasharray="5 3" />
      <line x1="0" x2="232" y1={top} y2={top} stroke="#5BB3E8" strokeWidth="1.2" />
      <line x1="0" x2="232" y1={base} y2={base} stroke="#5BB3E8" strokeWidth="1.2" />
      <text x="228" y="27" fontSize="10" textAnchor="end" fill="#ffd56b">max</text>
      <text x="228" y="170" fontSize="10" textAnchor="end" fill="#ffd56b">min</text>
      <text x="62" y={top - 4} fontSize="10" fill="#5BB3E8">top</text>
      <text x="62" y={base + 13} fontSize="10" fill="#5BB3E8">base</text>
      <text x="116" y="100" fontSize="10" textAnchor="middle" fill="#ffd56b">Vpp = max − min</text>
      <text x="116" y="113" fontSize="10" textAnchor="middle" fill="#5BB3E8">Vamp = top − base</text>
      <g>
        {bins.map((y) => {
          const w = 55 * (hump(y, top) + hump(y, base));
          return <rect key={y} x="246" y={y - 1.5} width={Math.max(w, 1)} height="3" className="fill-accent" />;
        })}
        <line x1="246" x2="246" y1="22" y2="166" className="stroke-border" strokeWidth="1" />
        <text x="278" y="184" fontSize="10" textAnchor="middle" className="fill-foreground">histogram</text>
        <text x="336" y={top + 4} fontSize="9" textAnchor="end" className="fill-muted">mode</text>
        <text x="336" y={base + 4} fontSize="9" textAnchor="end" className="fill-muted">mode</text>
      </g>
    </svg>
  );
}

export default function HowToMeasureTheAmplitudeOfANoisySignalPage() {
  return (
    <HowToShell
      title="How to Measure the Amplitude of a Noisy Signal With an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-measure-the-amplitude-of-a-noisy-signal-with-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To measure the amplitude of a noisy signal with an oscilloscope, don&apos;t trust the raw peak-to-peak
          reading: it measures from the highest noise spike to the lowest, so it always reads high. Use the
          amplitude (Vamp) measurement, which works from the most common top and base levels, or clean the
          trace first with averaging, high-res mode or the bandwidth limit. Then read the mean over many
          acquisitions rather than a single capture.
        </>
      }
      aside={{
        image: rigol.image,
        alt: "Rigol DS1054Z four-channel digital oscilloscope, front view",
        caption: (
          <>
            The Rigol DS1054Z (50MHz, 4 channels, 1 GSa/s) is our best overall beginner pick. Check any
            scope&apos;s manual for its averaging and bandwidth-limit options. See the{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-vpp-reads-high", label: "Why Vpp overstates a noisy signal" },
        { id: "use-vamp", label: "Use Vamp instead of Vpp" },
        { id: "averaging", label: "Average a repetitive signal" },
        { id: "high-res-and-bandwidth-limit", label: "High-res mode and the 20MHz limit" },
        { id: "rms-subtraction", label: "Measure RMS and subtract the noise" },
        { id: "cursors-on-averaged-trace", label: "Cursors on the averaged trace" },
        { id: "statistics", label: "Read the mean with statistics" },
        { id: "which-method", label: "Which method to use" },
      ]}
      faq={[
        {
          q: "Why is my oscilloscope Vpp reading higher than the signal really is?",
          a: "Peak-to-peak takes the single highest and lowest samples on screen. When random noise rides on the signal, those extremes are noise peaks, so the reading includes the signal plus roughly the noise's own peak-to-peak height. It also creeps up the longer you watch, because rarer spikes keep turning up. Use Vamp or an averaged trace instead.",
        },
        {
          q: "What is the difference between Vamp and Vpp on an oscilloscope?",
          a: "Vpp is maximum minus minimum, so it includes overshoot, ringing and noise peaks. Vamp is top minus base, where top and base are the most common high and low levels found from a histogram of the samples. On a clean square wave they are nearly equal; on a noisy or ringing one, Vamp is the closer estimate of the real step size.",
        },
        {
          q: "How many averages should I use?",
          a: "Random noise falls roughly with the square root of the number of averages, so 16 averages cut it to about a quarter and 64 to about an eighth. Beyond that the gains are slow and the display responds sluggishly to changes. Start at 16 or 32, increase only if the trace is still fuzzy, and keep the trigger stable throughout.",
        },
        {
          q: "Does the bandwidth limit change the amplitude I measure?",
          a: "Not for signals well below the filter's cutoff, which is why it is safe on audio, sensor and slow logic signals. Near or above the cutoff, the filter attenuates the signal itself and rounds square-wave edges, so the reading drops. Compare the reading with the limit on and off: if only the fuzz changes, the filter is not affecting your signal.",
        },
        {
          q: "Can I measure the amplitude of a noisy one-shot signal?",
          a: "Yes, but not with averaging, which needs the same waveform to repeat. For a single event, use high-res mode or the bandwidth limit to reduce noise within the one capture, then measure Vamp or place cursors through the middle of the noise band. Quote the result with an uncertainty roughly equal to the remaining noise.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope",
          title: "How to Measure Noise Floor With an Oscilloscope",
          desc: "Measure the noise itself: the scope's own floor, RMS readings and probe ratio effects.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Vertical scale, coupling, probe ratio and the full set of automatic voltage measurements.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Fix setup-side noise first. A long ground lead or a ground loop can add more fuzz than the
            circuit does; work through{" "}
            <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
              why an oscilloscope waveform looks noisy
            </Link>{" "}
            so you are measuring the signal, not your probing.
          </li>
          <li>
            On mains-derived or high-voltage circuits, keep the ground clip on a true ground reference and
            never defeat the scope&apos;s earth connection to quieten a trace.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-vpp-reads-high" className="text-xl font-semibold mb-3">Why Vpp overstates the amplitude of a noisy signal</h2>
        <p className="text-muted leading-7 mb-4">
          Automatic peak-to-peak is the simplest measurement a scope makes: the highest sample minus the
          lowest. Noise doesn&apos;t average out of that calculation; it sets both ends of it. For random noise
          the extremes sit roughly three standard deviations either side of the true level, so a 1 V square
          wave carrying 20 mV RMS of noise can read somewhere near 1.1 V. The longer the record, the more
          chances a rare spike has to land in it, which is why Vpp keeps drifting upward when you leave the
          scope running.
        </p>
        <Figure
          caption={
            <>
              Vpp (yellow) runs between the noise extremes. Vamp (blue) uses the top and base levels, found as
              the two peaks of a histogram of every sample on screen.
            </>
          }
        >
          <TopBaseDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="use-vamp">Use the Vamp (amplitude) measurement instead of Vpp</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most digital scopes offer both Vpp and Vamp (sometimes called Amplitude). For Vamp, the scope builds
          a histogram of sample voltages and picks the most populated level in the upper half as the top and
          in the lower half as the base. Noise spreads each level into a hump, but the centre of the hump
          stays put, so top minus base lands close to the real step height. The same method also ignores
          overshoot and ringing at the edges.
        </p>
        <p className="text-muted leading-7">
          Vamp works best on signals with flat levels: square waves, logic and pulses. A sine has no flat top,
          so many scopes fall back to the maximum and minimum and Vamp behaves much like Vpp. For sines, use
          averaging or the RMS method below.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="averaging">Average a repetitive signal (with a stable trigger)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Average acquisition mode adds up many triggered captures point by point and divides by the count.
          Anything that repeats identically from one trigger to the next survives; random noise, which differs
          every time, shrinks roughly with the square root of the number of captures.
        </p>
        <Figure caption={<>Residual random noise after averaging, from the square-root rule. Real results also depend on how steady the trigger is.</>}>
          <BarChart
            items={[
              { label: "1 capture", value: 100, display: "100%" },
              { label: "4 averages", value: 50, display: "50%" },
              { label: "16 averages", value: 25, display: "25%" },
              { label: "64 averages", value: 12.5, display: "12.5%", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Two conditions decide whether averaging helps. The signal must repeat, and every capture must line
          up at the same point. If noise makes the trigger fire early or late, edges smear and the averaged
          amplitude shrinks. Set the trigger level at mid-amplitude, and use HF reject or noise reject trigger
          coupling if your scope has it. Our guide on{" "}
          <Link href="/oscilloscopes/how-to-trigger-an-oscilloscope" className={link}>
            how to trigger an oscilloscope
          </Link>{" "}
          covers level and coupling in detail.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="high-res-and-bandwidth-limit">High-res mode and the 20MHz bandwidth limit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          When the signal does not repeat, or the trigger cannot be made steady, filter instead. High-res mode
          averages neighbouring samples inside one capture, and the 20MHz bandwidth limit found on many bench
          scopes removes content above that frequency. Both are low-pass filters: they quieten the trace in a
          single shot, but anything fast in your signal is filtered too.
        </p>
        <p className="text-muted leading-7">
          The safe test is to toggle the filter and watch the amplitude reading. If only the fuzz gets thinner,
          keep it on. If Vamp itself drops or edges visibly round off, the filter is cutting into the signal.
          The{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            oscilloscope bandwidth explainer
          </Link>{" "}
          shows how attenuation rises near a cutoff frequency.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="rms-subtraction">Measure RMS and subtract the noise</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Uncorrelated noise adds to a signal in quadrature, so RMS values combine as a square root of a sum of
          squares. That gives you a way to remove the noise mathematically. Measure the AC RMS of the noisy
          signal, then turn off the source (or probe the same node with the signal stopped) and measure the RMS
          of what is left. The signal&apos;s own RMS is the square root of the difference of the squares.
        </p>
        <DataTable
          head={["Step", "Worked example (illustrative values)"]}
          rows={[
            ["Total AC RMS, signal on", "150 mV"],
            ["Noise RMS, signal off", "90 mV"],
            ["Signal RMS = √(150² − 90²)", "√(22,500 − 8,100) = 120 mV"],
            ["For a sine: peak = RMS × 1.414", "≈ 170 mV peak, ≈ 339 mV peak-to-peak"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          This is most useful when noise is a large share of the reading, as in the example. When noise is
          small, the correction barely changes the answer. The noise measurement itself is the subject of{" "}
          <Link href="/oscilloscopes/how-to-measure-noise-floor-with-an-oscilloscope" className={link}>
            how to measure noise floor with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="cursors-on-averaged-trace">Place cursors on the averaged trace</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Automatic measurements can still misjudge a waveform with slow edges or a sloping top. Once averaging
          has produced a clean trace, switch on horizontal (voltage) cursors and place them on the settled
          top and base, away from the edges. The cursor delta is your amplitude, and you can see exactly which
          part of the waveform it refers to.
        </p>
        <Figure caption={<>An averaged trace with the noise gone. Horizontal cursors on the settled top and base give the step height directly.</>}>
          <ScopeScreen
            wave="square"
            cycles={2}
            amplitude={2.5}
            marks={[{ x1: 1.2, y1: 1.5, x2: 1.2, y2: 6.5, text: "ΔV" }]}
            labels={{ left: "Average ×64", right: "cursors on top and base" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="statistics">Read the mean over many acquisitions with statistics</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A single capture gives one sample of a noisy measurement. Turn on measurement statistics and the
          scope shows the current value alongside the mean, minimum, maximum and standard deviation over every
          acquisition since you reset it. Let it run for a few hundred acquisitions, then quote the mean.
        </p>
        <KeyIdea title="Mean of Vamp, not mean of Vpp">
          Averaging a biased measurement keeps the bias. The mean of Vpp stays high because every capture
          includes noise peaks. The mean of Vamp, or of a measurement taken on an averaged trace, settles on
          the real value, and the standard deviation tells you how far to trust it.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          The basics of each automatic voltage reading are covered in{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-method" className="text-xl font-semibold mb-3">Which method to use for a noisy signal amplitude</h2>
        <DataTable
          head={["Situation", "Best approach", "Watch out for"]}
          rows={[
            ["Repeating square wave or logic", "Vamp, ideally on an averaged trace", "Trigger jitter shrinking the average"],
            ["Repeating sine", "Averaging, then Vpp or cursors", "Vamp behaving like Vpp"],
            ["One-shot or non-repeating", "High-res or bandwidth limit, then Vamp", "Filtering away real fast detail"],
            ["Noise comparable to the signal", "RMS with noise subtracted", "Noise that is not random, such as switching spikes"],
            ["Any of the above", "Statistics mean over many acquisitions", "Quoting a single capture"],
          ]}
        />
        <p className="text-muted leading-7 mt-6 mb-6">
          Any digital scope with average acquisition and automatic measurements can do this. Extra bandwidth
          is no help here; a lower noise floor and good statistics are. Compare models in the{" "}
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
              alt: "Rigol DS1054Z digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Large 7-inch display and strong community documentation.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, with a well-regarded user interface.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
