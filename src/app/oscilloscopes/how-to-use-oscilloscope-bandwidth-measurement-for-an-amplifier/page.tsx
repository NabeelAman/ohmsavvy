import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ResponseChart,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to use oscilloscope bandwidth measurement for an amplifier: set a midband reference, sweep a sine and find the -3 dB points where gain falls to 0.707.";

export const metadata = buildMetadata({
  title: "Oscilloscope Bandwidth Measurement for Amplifiers",
  description,
  path: "/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToUseOscilloscopeBandwidthMeasurementForAnAmplifierPage() {
  return (
    <HowToShell
      title="How to Use Oscilloscope Bandwidth Measurement for an Amplifier"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier"
      category="oscilloscopes"
      intro={
        <>
          An amplifier&apos;s bandwidth is the range of frequencies it amplifies without its gain
          dropping by more than 3 dB. To use oscilloscope bandwidth measurement for an amplifier, you
          feed it a sine wave from a signal generator, watch input and output on two channels, record
          the gain at a midband frequency, then sweep up and down until the gain falls to 0.707 of that
          value. Those two frequencies are the −3 dB points, and the gap between them is the bandwidth.
          This guide walks through the sweep, the numbers and the traps.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
        caption: (
          <>
            A frequency sweep needs a sine source and two channels. The Hantek DSO2D10 combines an
            oscilloscope and waveform generator in one unit; see our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-you-are-measuring", label: "What amplifier bandwidth means" },
        { id: "check-scope-bandwidth", label: "Check the scope and probes first" },
        { id: "connect-the-amplifier", label: "Connect generator, amplifier and load" },
        { id: "midband-reference", label: "Set a midband reference" },
        { id: "sweep-the-frequency", label: "Sweep and find the −3 dB points" },
        { id: "worked-example", label: "Worked example" },
        { id: "read-the-curve", label: "Read the shape of the curve" },
        { id: "avoid-clipping", label: "Avoid clipping and slew limiting" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Why is the -3 dB point used to define bandwidth?",
          a: "At −3 dB the output voltage is 0.707 of its midband value, which means the output power has halved. It is a convention used across amplifiers, filters and oscilloscopes, so figures from different datasheets can be compared. Some audio specs quote −1 dB or −0.5 dB limits instead, which give a narrower range, so always note which limit a figure uses.",
        },
        {
          q: "Can I measure amplifier bandwidth with a square wave?",
          a: "You can estimate it. Feed a clean square wave and measure the output's 10-90% rise time; for an amplifier that behaves like a single-pole low-pass, bandwidth is roughly 0.35 divided by rise time. A sine sweep is more direct and also shows the low-frequency cutoff, peaking or dips, which a single rise-time number cannot.",
        },
        {
          q: "Do I need a signal generator with a sweep function?",
          a: "No. A sweep function speeds things up, but stepping the frequency by hand and reading the output at each step works fine and lets you slow down near the cutoff. What matters more is a clean sine whose amplitude you can see on CH1, so any droop from the generator is visible and does not get mistaken for amplifier roll-off.",
        },
        {
          q: "How many frequency points should I measure?",
          a: "Three to five points per decade, such as 10, 20, 50 and 100 Hz, give a usable curve. Add extra points around each cutoff until you bracket the frequency where the gain crosses 0.707. On a log frequency axis the points then spread evenly, which makes the roll-off slope easy to see when you plot them.",
        },
        {
          q: "How does amplifier bandwidth relate to an op amp's gain-bandwidth product?",
          a: "For a voltage-feedback op amp, closed-loop bandwidth is roughly the gain-bandwidth product divided by the noise gain. A part rated at 1 MHz GBW set for a gain of 10 should reach about 100 kHz. That is only an estimate: layout, load and slew-rate limits often pull the real -3 dB point lower, which is why the measured sweep is the figure to trust.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope",
          title: "How to Compare Input and Output Signals",
          desc: "The two-channel setup, gain in dB, inversion and distortion at a single frequency.",
        },
        {
          href: "/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope",
          title: "How to Find Signal Clipping on an Oscilloscope",
          desc: "Tell real amplifier clipping from the scope's own display clipping before you sweep.",
        },
      ]}
    >
      <Callout title="Safety and load: protect the amplifier and the scope">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Power amplifiers should drive a resistive dummy load of the rated impedance and power, not
            a speaker, during a sweep. A sweep through high frequencies at full level can damage
            tweeters and an open output can upset some amplifiers.
          </li>
          <li>
            Many audio amplifiers use bridged (BTL) outputs where neither speaker terminal is ground.
            The scope&apos;s ground clip is tied to mains earth, so clipping it to either terminal can
            short the output. Measure each side to ground on two channels, or use a differential probe.
          </li>
          <li>
            Stay on the low-voltage signal side of mains-powered equipment and keep within the voltage
            ratings of the probes and inputs.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-you-are-measuring" className="text-xl font-semibold mb-3">What amplifier bandwidth means</h2>
        <p className="text-muted leading-7 mb-4">
          Most amplifiers have a flat midband region where gain is steady, a low-frequency roll-off
          caused by coupling capacitors, and a high-frequency roll-off caused by the transistors, the
          feedback network and stray capacitance. The lower cutoff fL and upper cutoff fH are the
          frequencies where gain is 3 dB below midband. A DC-coupled amplifier has no lower cutoff, so
          its bandwidth is simply fH.
        </p>
        <KeyIdea title="The rule for every reading">
          Gain ratio = Vout ÷ Vin. Relative gain in dB = 20 × log10(gain at f ÷ midband gain). The −3 dB
          points are where that ratio falls to 0.707. Bandwidth = fH − fL.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="check-scope-bandwidth">Check the scope and probes have far more bandwidth</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Your scope is a low-pass filter too. At its own rated bandwidth it shows a sine at about
          70.7% of its true size, so if the scope and amplifier roll off in the same region you measure
          both at once and the cutoff comes out too low. The common rule is scope and probe bandwidth of
          3 to 5 times the highest frequency you need to measure, as explained in{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth means
          </Link>
          .
        </p>
        <Figure
          caption={
            <>
              The scope&apos;s own response. At one third of its bandwidth it reads about 95–96% of the
              true amplitude, at one fifth about 98–99%, and at its rated bandwidth 70.7%. Keep the
              amplifier&apos;s cutoff well to the left of the 1× line.
            </>
          }
        >
          <ResponseChart />
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["Expected amplifier fH", "Scope bandwidth at 3x", "Scope bandwidth at 5x"]}
            rows={[
              ["20 kHz (audio)", "60 kHz", "100 kHz"],
              ["1 MHz", "3 MHz", "5 MHz"],
              ["10 MHz", "30 MHz", "50 MHz"],
              ["30 MHz", "90 MHz", "150 MHz"],
            ]}
            mono={[1, 2]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Use the probes on 10x, since many probes have much less bandwidth on 1x, and compensate them.
          Switch off the channel bandwidth limit (often 20MHz) if your sweep goes into the megahertz
          range. For audio amplifiers almost any bench scope has bandwidth to spare.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="connect-the-amplifier">Connect the generator, amplifier and load</StepHeading>
        <p className="text-muted leading-7">
          Connect the generator to the amplifier input and put CH1 on the input pin, not just the
          generator terminal, so you see the actual signal the amplifier receives. Put CH2 on the output
          across the load. Both ground clips go to the amplifier&apos;s signal ground. Trigger on CH1.
          Measuring the input directly matters because many generators droop at high frequencies or
          when loaded, and that droop would otherwise look like amplifier roll-off.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="midband-reference">Set a midband reference</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pick a frequency in the flat region, such as 1 kHz for audio. Set the input so the output is
          clearly undistorted, around half of its maximum swing, then read Vpp on both channels with
          the Measure menu or cursors. That ratio is your 0 dB reference. Write the input level down
          and keep it constant through the sweep.
        </p>
        <Figure
          caption={
            <>
              Left: midband at 1 kHz (200 µs/div). Input (green, 100 mV/div) is 0.2 Vpp; output (blue,
              500 mV/div) is 4 divisions = 2 Vpp, a gain of 10. Right: at 80 kHz (2.5 µs/div) the
              output has fallen to 2.83 divisions = 1.41 Vpp, 0.707 of midband, and lags by 0.625
              division (45°).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1}
              offset={2.5}
              second={{ wave: "sine", cycles: 2, amplitude: 2, offset: -1.5, label: "CH2 out" }}
              marks={[{ x1: 1.25, y1: 3.5, x2: 1.25, y2: 7.5, text: "2 Vpp" }]}
              labels={{ left: "CH1 100 mV · CH2 500 mV", right: "200 µs/div" }}
            />
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={1}
              offset={2.5}
              second={{ wave: "sine", cycles: 2, amplitude: 1.414, offset: -1.5, shift: 0.625, label: "CH2 out" }}
              marks={[{ x1: 1.875, y1: 4.086, x2: 1.875, y2: 6.914, text: "1.41 Vpp" }]}
              labels={{ left: "CH1 100 mV · CH2 500 mV", right: "2.5 µs/div" }}
            />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="sweep-the-frequency">Sweep the frequency and find the −3 dB points</StepHeading>
        <p className="text-muted leading-7">
          Step the generator upwards, adjusting the timebase to keep two or three cycles on screen, and
          read Vin and Vout at each step. If Vin has changed, use the ratio rather than Vout alone. When
          the ratio drops near 0.707 of midband, take smaller steps until you find where it crosses.
          That is fH. Go back to midband and repeat downwards to find fL. Averaging or the RMS
          measurement steadies small readings at the ends of the sweep. As you approach each cutoff the
          output also shifts in time relative to the input; for a simple single-pole roll-off it is
          about 45° at the −3 dB point, which you can check with our{" "}
          <Link href="/oscilloscopes/how-to-measure-phase-difference-oscilloscope" className={link}>
            phase difference guide
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">Worked example: an audio amplifier stage</h2>
        <p className="text-muted leading-7 mb-4">
          These are illustrative readings for a gain-of-10 stage with 0.2 Vpp input, chosen to show how
          the numbers fall: midband output 2 Vpp, so the −3 dB target is 2 × 0.707 ≈ 1.41 Vpp.
        </p>
        <DataTable
          head={["Frequency", "Vout (Vpp)", "Ratio to midband", "Relative gain"]}
          rows={[
            ["10 Hz", "0.89", "0.447", "−7.0 dB"],
            ["20 Hz", "1.41", "0.707", "−3.0 dB (fL)"],
            ["100 Hz", "1.96", "0.981", "−0.2 dB"],
            ["1 kHz", "2.00", "1.000", "0 dB (reference)"],
            ["10 kHz", "1.98", "0.992", "−0.1 dB"],
            ["50 kHz", "1.70", "0.848", "−1.4 dB"],
            ["80 kHz", "1.41", "0.707", "−3.0 dB (fH)"],
            ["200 kHz", "0.74", "0.371", "−8.6 dB"],
          ]}
          mono={[1, 2, 3]}
        />
        <div className="mt-5">
          <Figure
            caption={
              <>
                The same sweep as bars of output relative to midband. The highlighted bars at 20 Hz and
                80 kHz are the −3 dB points, so the bandwidth is 80 kHz − 20 Hz ≈ 80 kHz.
              </>
            }
          >
            <BarChart
              items={[
                { label: "10 Hz", value: 0.447, display: "0.447" },
                { label: "20 Hz (fL)", value: 0.707, display: "0.707", highlight: true },
                { label: "100 Hz", value: 0.981, display: "0.981" },
                { label: "1 kHz", value: 1, display: "1.000" },
                { label: "10 kHz", value: 0.992, display: "0.992" },
                { label: "50 kHz", value: 0.848, display: "0.848" },
                { label: "80 kHz (fH)", value: 0.707, display: "0.707", highlight: true },
                { label: "200 kHz", value: 0.371, display: "0.371" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Measuring this stage needs very little scope bandwidth: at 3–5x of 80 kHz, anything above
          about 400 kHz is enough, so a 50MHz or 100MHz bench scope reads it with negligible error.
        </p>
      </section>

      <section>
        <h2 id="read-the-curve" className="text-xl font-semibold mb-3">Read the shape of the curve, not just two numbers</h2>
        <p className="text-muted leading-7 mb-4">
          Plot your readings on a log frequency axis and the shape tells you more about the amplifier
          than fL and fH alone. A simple single-pole roll-off falls at about 6 dB per octave (20 dB per
          decade) once you are well past the cutoff. In the example, going from 80 kHz to 200 kHz, a
          factor of 2.5, takes the gain from −3 dB to −8.6 dB, close to what that slope predicts for a
          point just past the corner. A steeper fall suggests more than one pole, for example two stages
          that each roll off in the same region.
        </p>
        <p className="text-muted leading-7">
          A rise in gain just before the roll-off, called peaking, is a warning sign. It often goes with
          overshoot and ringing on square waves, and in feedback amplifiers it can mean the stage is
          close to oscillating. If you see it, feed in a square wave and look at the edges, as described
          in{" "}
          <Link href="/oscilloscopes/how-to-measure-signal-overshoot-and-ringing-with-an-oscilloscope" className={link}>
            how to measure overshoot and ringing
          </Link>
          . A dip in the middle of the band usually points to a fault or a deliberate tone-control or
          filter network. Measure again at a lower level as well: a real small-signal response stays the
          same when you halve the input, while clipping and slew effects change with level.
        </p>
      </section>

      <section>
        <h2 id="avoid-clipping" className="text-xl font-semibold mb-3">Avoid clipping and slew-rate limiting</h2>
        <p className="text-muted leading-7 mb-4">
          A bandwidth sweep is a small-signal measurement. If the output flattens at the tops, the gain
          reading is wrong at every frequency; reduce the input until the sine is clean, and check with{" "}
          <Link href="/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope" className={link}>
            how to find signal clipping
          </Link>
          . Also make sure the trace fits on the screen, since a waveform running off the top is
          clipped by the scope rather than the amplifier.
        </p>
        <p className="text-muted leading-7">
          At high frequencies a large output can also hit the amplifier&apos;s slew-rate limit, the
          fastest its output can change. The sine then turns into a triangle and the amplitude drops,
          which looks like roll-off but depends on level. A sine needs a slew rate of 2π × f × Vpeak:
          10 V peak at 80 kHz needs about 5 V/µs. If halving the input changes where the gain falls
          off, you were seeing slew limiting, not small-signal bandwidth.
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for amplifier bandwidth</h2>
        <p className="text-muted leading-7 mb-4">
          Two channels and a sine source are the essentials, and bandwidth headroom over the
          amplifier&apos;s fH is what keeps the result honest. Compare options in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; for projects that will get more demanding.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
