import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  ScopeScreen,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "How to find signal clipping on an oscilloscope: spot flattened peaks, tell real circuit clipping from off-screen display clipping, and work out headroom.";

export const metadata = buildMetadata({
  title: "How to Find Signal Clipping on an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToFindSignalClippingPage() {
  return (
    <HowToShell
      title="How to Find Signal Clipping on an Oscilloscope"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-find-signal-clipping-on-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          Clipping happens when a signal asks for more voltage than a stage can deliver, so the peaks
          are sliced off flat. To find signal clipping on an oscilloscope, you look for flattened tops
          and bottoms on a waveform that should be smooth, then prove whether the circuit did it or the
          scope did. That second step matters, because a trace that runs off the screen is clipped by
          the scope itself and looks almost the same. Here is how to tell them apart, where the clip
          level sits, and how much headroom a stage has left.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            Comparing input and output on two channels makes clipping obvious. The Siglent SDS1104X-E
            (100MHz, 4 channels, 1 GSa/s) is one of the bench scopes we cover; see the{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-clipping-looks-like", label: "What clipping looks like" },
        { id: "circuit-or-scope", label: "Circuit clipping vs scope clipping" },
        { id: "set-up-channels", label: "Set up both channels" },
        { id: "fit-the-waveform", label: "Fit the whole waveform on screen" },
        { id: "raise-the-level", label: "Raise the level until it flattens" },
        { id: "change-volts-per-div", label: "Change V/div to confirm" },
        { id: "headroom-example", label: "Worked headroom example" },
        { id: "other-places", label: "Other places clipping hides" },
        { id: "fixes", label: "How to fix clipping" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "Can a signal clip on only one side?",
          a: "Yes, and it is a useful clue. One-sided clipping usually means the stage is not biased at the middle of its available swing, so one peak reaches its limit first. Single-supply amplifiers with a drifting bias point and stages with unequal rails do this. Check the DC level at the output with no signal and compare it to the midpoint between the rails.",
        },
        {
          q: "Is clipping the same as distortion?",
          a: "Clipping is one kind of distortion, and usually the most severe. Other kinds, such as crossover distortion in a class B output stage or the gentle bending from a transistor's curve, change the shape without flattening it. Clipping is easy to see on a scope; low-level distortion often needs a spectrum view or a distortion analyzer.",
        },
        {
          q: "Can clipping damage speakers?",
          a: "It can. A clipped output carries much more high-frequency energy than a clean sine, and a heavily clipped waveform delivers more average power than a clean sine with the same peak level. Tweeters are especially exposed. That is why amplifier testing is usually done into a resistive dummy load, with the level turned down as soon as the tops flatten.",
        },
        {
          q: "Why does my scope show a flat line at the top of the screen?",
          a: "Usually the vertical scale is too sensitive and the waveform runs past the top of the display, so the scope captures only the part inside its range. Turn the V/div knob to a larger value or use AUTO, and check the channel's probe setting matches the probe. If the flat top is still there with the whole waveform on screen, the circuit is clipping.",
        },
        {
          q: "Can I use the oscilloscope's FFT to detect clipping?",
          a: "Yes, and it often shows clipping before the flat tops are obvious. A clean sine puts nearly all its energy at one frequency. As clipping starts, harmonics climb quickly: symmetrical clipping adds mostly odd harmonics such as the 3rd and 5th, while one-sided clipping adds even harmonics too. Feed a sine, open the FFT math function and watch the harmonics as you raise the level.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier",
          title: "How to Use Oscilloscope Bandwidth Measurement for an Amplifier",
          desc: "Sweep a clean, unclipped sine to find an amplifier's −3 dB points.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Read peak, peak-to-peak and DC levels so you can place the clip level exactly.",
        },
      ]}
    >
      <Callout title="Safety: amplifiers, speakers and the scope ground">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The ground clip of a bench scope probe is connected to mains earth. Clip it only to the
            circuit&apos;s ground. Bridged (BTL) amplifier outputs have no grounded speaker terminal, so
            measure each side to ground or use a differential probe.
          </li>
          <li>
            Drive power amplifiers into a resistive dummy load when you push them into clipping, and
            keep the level low for as short a time as possible. Clipped output can damage speakers.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-clipping-looks-like" className="text-xl font-semibold mb-3">What clipping looks like</h2>
        <p className="text-muted leading-7 mb-4">
          A clean sine has rounded peaks. When a stage clips, the peaks stop at a fixed voltage and run
          flat until the signal comes back down, leaving sharp corners where the flat part starts and
          ends. Hard clipping, typical of op-amps and transistor stages hitting their supply rails,
          gives crisp corners. Soft clipping, from stages that saturate gradually, rounds the corners
          but still squashes the peaks. The flat part always sits at the same voltage however hard you
          drive the input, and that voltage is the clip level.
        </p>
        <KeyIdea title="The giveaway">
          Turn the input up by a known amount. A healthy stage&apos;s output grows in proportion. A
          clipping stage&apos;s peaks stay where they are and only the flat sections get wider.
        </KeyIdea>
      </section>

      <section>
        <h2 id="circuit-or-scope" className="text-xl font-semibold mb-3">Real circuit clipping vs the scope&apos;s own clipping</h2>
        <p className="text-muted leading-7 mb-4">
          On most digital scopes the analogue-to-digital converter covers only the visible screen height
          plus a small margin. If the V/div setting is too sensitive, the waveform runs past the top and
          bottom of that range and the captured data is clipped by the scope, even though the circuit is
          fine. Automatic measurements such as Vpp and RMS are then wrong; many scopes flag an
          over-range reading, but how they show it varies, so check your manual.
        </p>
        <Figure
          caption={
            <>
              The same clean 10 V peak sine. Left at 5 V/div it is 4 divisions tall (20 Vpp) and fits.
              Right at 2 V/div it would need 10 divisions on an 8-division screen, so the peaks run off
              the display: the scope, not the circuit, is clipping.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={2}
              marks={[{ x1: 1.25, y1: 2, x2: 1.25, y2: 6, text: "20 Vpp" }]}
              labels={{ left: "CH1 5 V/div", right: "200 µs/div" }}
            />
            <ScopeScreen wave="sine" cycles={2} amplitude={5} labels={{ left: "CH1 2 V/div", right: "200 µs/div" }} />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="set-up-channels">Set up both channels on DC coupling</StepHeading>
        <p className="text-muted leading-7">
          Put the stage&apos;s input on CH1 and its output on CH2, both grounds on the circuit ground,
          and trigger on CH1. The input is your reference for what the output should look like. Use DC
          coupling so you can see where the flat tops sit relative to the supply rails; AC coupling
          hides the absolute level. Use 10x probes with the channel attenuation set to match. For the
          full two-channel setup, see{" "}
          <Link href="/oscilloscopes/how-to-compare-input-and-output-signals-on-an-oscilloscope" className={link}>
            how to compare input and output signals
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="fit-the-waveform">Fit the whole waveform on screen</StepHeading>
        <p className="text-muted leading-7">
          Adjust V/div until the output fills roughly six of the eight vertical divisions, with space
          above and below. Use vertical position if a DC level pushes it off center, as explained in{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically" className={link}>
            why a waveform shifts vertically
          </Link>
          . Never judge clipping from a trace that touches the top or bottom edge.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="raise-the-level">Raise the input level until the peaks flatten</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a sine from a signal generator, increase the amplitude in small steps while watching CH2.
          The first sign is a slight flattening at the very tips, often on one side first. Note the
          output voltage where it begins: that is the clip level for this supply and load. If the input
          on CH1 flattens too, the clipping is happening before the stage, in the generator or an
          earlier stage.
        </p>
        <Figure
          caption={
            <>
              Illustration of severe circuit clipping. The input (green) is a clean sine; the output
              (blue) is driven so far past its limits that it spends most of each cycle stuck at the
              rails and approaches a square wave. Mild clipping only flattens the tips.
            </>
          }
        >
          <ScopeScreen
            wave="sine"
            cycles={2}
            amplitude={1.5}
            offset={2}
            second={{ wave: "square", cycles: 2, amplitude: 1.5, offset: -2, label: "CH2 out (clipped)" }}
            labels={{ left: "CH1 in · CH2 out", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="change-volts-per-div">Change V/div to confirm it is real</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the output channel to the next larger V/div setting so the waveform shrinks. Real
          clipping keeps its flat tops at the same voltage at any scale. Display clipping disappears and
          the peaks come back rounded. Then measure the flat level with a cursor and compare it to the
          supply rails.
        </p>
        <Figure caption={<>The check sequence. Flat tops that survive step 2 are in the circuit.</>}>
          <FlowDiagram
            steps={[
              { label: "Fit on screen", sub: "About 6 of 8 divisions tall" },
              { label: "Larger V/div", sub: "Do the flat tops survive?" },
              { label: "Check CH1", sub: "Is the input already flat?" },
              { label: "Measure level", sub: "Cursor on the flat, compare to rails" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="headroom-example" className="text-xl font-semibold mb-3">Worked example: headroom in an op-amp stage</h2>
        <p className="text-muted leading-7 mb-4">
          Take a non-inverting op-amp stage with a gain of 10 on ±12 V rails. Many op-amps cannot swing
          all the way to their rails; say the datasheet gives an output swing of about ±10.5 V into
          your load. That is the clip level, so the largest clean input is 10.5 ÷ 10 = 1.05 V peak.
          Rail-to-rail output op-amps get closer to the rails, so always check the datasheet.
        </p>
        <DataTable
          head={["Input (V peak)", "Output needed", "Output on the scope", "Result"]}
          rows={[
            ["0.3", "3 V peak", "3 V peak", "Clean, 10.9 dB headroom"],
            ["0.5", "5 V peak", "5 V peak", "Clean, 6.4 dB headroom"],
            ["1.05", "10.5 V peak", "10.5 V peak", "At the clip level"],
            ["1.5", "15 V peak", "Flat at 10.5 V", "Clipped"],
            ["2.0", "20 V peak", "Flat at 10.5 V", "Clipped, flat about 65% of each cycle"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4 mb-4">
          Headroom in dB is 20 × log10(clip level ÷ normal level). With a normal output of 3 V peak,
          that is 20 × log10(10.5 ÷ 3) ≈ 10.9 dB before clipping.
        </p>
        <Figure
          caption={
            <>
              Normal output 3 V peak, clip level 10.5 V peak, and the 15 V peak a 1.5 V input would
              demand. Anything above the clip level is sliced off.
            </>
          }
        >
          <BarChart
            items={[
              { label: "Normal output", value: 3, display: "3 V pk" },
              { label: "Clip level", value: 10.5, display: "10.5 V pk", highlight: true },
              { label: "Demanded at 1.5 V in", value: 15, display: "15 V pk" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="other-places" className="text-xl font-semibold mb-3">Other places clipping hides</h2>
        <p className="text-muted leading-7 mb-4">
          Amplifier stages are the classic case, but the same flat-topped shape turns up elsewhere, and
          the same checks find it.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Analogue-to-digital converters.</strong> An ADC input
            driven beyond its full-scale range returns its maximum code, so the reconstructed signal is
            flat at full scale. Probe the analogue input to the ADC and compare its peaks with the
            reference or full-scale voltage in the datasheet.
          </li>
          <li>
            <strong className="text-foreground">Protection clamps.</strong> Diodes on an input clamp the
            signal about one diode drop beyond the supply rails. The flat tops then sit slightly above
            the positive rail and slightly below ground or the negative rail, rather than inside them.
          </li>
          <li>
            <strong className="text-foreground">Supply sag.</strong> If the flat level moves down as the
            signal gets bigger, the supply itself may be drooping under load. Put a second channel on
            the supply rail and watch whether it dips at each peak.
          </li>
          <li>
            <strong className="text-foreground">Deliberate clipping.</strong> Guitar distortion pedals and
            some limiter circuits clip on purpose, often softly through diodes. There the question is
            whether the clip level matches the design, not whether clipping exists.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          In every case, the V/div check from step 4 still applies first: confirm the flat tops are in
          the signal before you go looking for a cause.
        </p>
      </section>

      <section>
        <h2 id="fixes" className="text-xl font-semibold mb-3">How to fix clipping</h2>
        <DataTable
          head={["What you see", "Likely cause", "Fix"]}
          rows={[
            ["Both peaks flat at the same level", "Input too large for the gain and rails", "Lower the input or the gain"],
            ["Only one peak flat", "Bias point off center, or unequal rails", "Check the no-signal DC level against mid-supply"],
            ["Flat tops at the screen edge only", "V/div too sensitive", "Use a larger V/div setting"],
            ["Input on CH1 already flat", "Clipping in the source or an earlier stage", "Move the probe back stage by stage"],
            ["Clips well below the rails", "Load too heavy for the output", "Check the load against the datasheet"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Other fixes depend on the design: higher supply rails within the parts&apos; ratings, a
          rail-to-rail op-amp, or attenuating the signal before the stage. When clipping is gone, you
          can measure frequency response with a clean signal using{" "}
          <Link href="/oscilloscopes/how-to-use-oscilloscope-bandwidth-measurement-for-an-amplifier" className={link}>
            oscilloscope bandwidth measurement for an amplifier
          </Link>
          , and read exact levels with{" "}
          <Link href="/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope" className={link}>
            how to measure voltage with an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need to find clipping</h2>
        <p className="text-muted leading-7 mb-4">
          Two channels let you compare input and output directly, and a built-in generator supplies the
          test sine. Bandwidth is rarely the limit for audio work. Compare options in our{" "}
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
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; for projects that will get more demanding.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
