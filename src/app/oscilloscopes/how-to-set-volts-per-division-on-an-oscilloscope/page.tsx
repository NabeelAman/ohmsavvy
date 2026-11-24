import Link from "@/components/AppLink";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("oscilloscopes");
const ds1054z = all.find((p) => p.name === "Rigol DS1054Z")!;
const dso2d10 = all.find((p) => p.name === "Hantek DSO2D10")!;
const dso152 = all.find((p) => p.name === "FNIRSI DSO152")!;

const description =
  "How to set volts per division on an oscilloscope: pick the step that fills about 6 divisions, match the probe setting, and use fine adjust and offset well.";

export const metadata = buildMetadata({
  title: "How to Set Volts per Division on an Oscilloscope",
  description,
  path: "/oscilloscopes/how-to-set-volts-per-division-on-an-oscilloscope",
  image: ds1054z.image,
});

const link = "text-accent hover:underline";

/** The 1-2-5 V/div ladder, with a 3.3 V logic signal's height at three neighboring steps. */
function StepLadderDiagram() {
  const steps = [
    { v: "0.2 V", h: 16.5, note: "off screen" },
    { v: "0.5 V", h: 6.6, note: "fills 6.6 div" },
    { v: "1 V", h: 3.3, note: "3.3 div" },
    { v: "2 V", h: 1.65, note: "1.65 div" },
  ];
  const base = 196;
  const unit = 20;
  return (
    <svg
      viewBox="0 0 340 230"
      className="w-full h-auto"
      role="img"
      aria-label="How the volts per division setting changes the height of a 3.3 volt logic signal on an eight-division screen. At 0.2 volts per division it would need 16.5 divisions and runs off screen. At 0.5 volts per division it fills 6.6 divisions, the best choice. At 1 volt per division it is 3.3 divisions tall, and at 2 volts per division only 1.65 divisions."
    >
      <line x1="30" y1={base - 8 * unit} x2="330" y2={base - 8 * unit} className="stroke-accent" strokeWidth="1.2" strokeDasharray="5 3" />
      <text x="330" y={base - 8 * unit - 6} fontSize="11" textAnchor="end" className="fill-accent">top of 8-division screen</text>
      <line x1="30" y1={base} x2="330" y2={base} className="stroke-foreground" strokeWidth="1.4" />
      {steps.map((s, i) => {
        const x = 46 + i * 74;
        const h = Math.min(s.h, 8.6) * unit;
        return (
          <g key={s.v}>
            <rect x={x} y={base - h} width="46" height={h} rx="3" className={i === 1 ? "fill-accent" : "fill-muted"} opacity={i === 1 ? 0.85 : 0.35} />
            <text x={x + 23} y={base + 16} fontSize="12" fontWeight="700" textAnchor="middle" className="fill-foreground">{s.v}/div</text>
            <text x={x + 23} y={base + 30} fontSize="10" textAnchor="middle" className="fill-muted">{s.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function HowToSetVoltsPerDivisionPage() {
  return (
    <HowToShell
      title="How to Set Volts per Division on an Oscilloscope"
      description={description}
      published="2026-11-24"
      path="/oscilloscopes/how-to-set-volts-per-division-on-an-oscilloscope"
      category="oscilloscopes"
      intro={
        <>
          To set volts per division on an oscilloscope, turn the channel&apos;s vertical scale knob until the waveform
          fills about six of the screen&apos;s eight vertical divisions: divide the signal&apos;s peak-to-peak voltage by
          six and pick the next standard step up. Before you do, set the channel&apos;s probe setting to match the probe
          (1x or 10x), or every number on the screen will be off by a factor of ten. This guide covers how to change
          the setting on a typical digital scope, how to choose the right step for a given signal, and when to use fine
          adjustment, offset and AC coupling instead of just turning the knob.
        </>
      }
      aside={{
        image: ds1054z.image,
        alt: "Rigol DS1054Z four-channel oscilloscope with per-channel vertical scale knobs",
        caption: (
          <>
            On bench scopes like the Rigol DS1054Z, each channel shares one vertical scale knob: select the channel,
            then turn. For reading the result, see{" "}
            <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
              how to read an oscilloscope
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What V/div controls" },
        { id: "causes", label: "Common V/div problems" },
        { id: "probe", label: "1. Match the probe setting" },
        { id: "estimate", label: "2. Estimate the peak-to-peak" },
        { id: "turn", label: "3. Turn the scale knob" },
        { id: "fine", label: "4. Use fine adjust if needed" },
        { id: "position", label: "5. Center it with position or offset" },
        { id: "verify", label: "6. Verify with a measurement" },
        { id: "table", label: "Quick setting table" },
        { id: "which-scope", label: "Which scope to use" },
      ]}
      faq={[
        {
          q: "How do I change volts per division on an oscilloscope?",
          a: "Select the channel you want, usually by pressing its numbered button, then turn the vertical scale knob for that channel. Clockwise normally makes the setting more sensitive (fewer volts per division, taller trace). The current value is shown in the channel readout at the bottom or side of the screen, for example 1.00V or 500mV next to the channel number.",
        },
        {
          q: "What is the best volts per division setting?",
          a: "There's no single best setting; it depends on the signal. Aim for the waveform to fill about six of the eight vertical divisions. That uses most of the converter's resolution while leaving headroom so peaks and overshoot aren't clipped. Divide the expected peak-to-peak voltage by six and round up to the next 1-2-5 step.",
        },
        {
          q: "Why are my oscilloscope voltages ten times too small?",
          a: "Almost always the probe is switched to 10x while the scope channel is set to 1x. The probe divides the signal by ten, and the scope doesn't multiply it back. Set the channel's probe or attenuation menu to 10x, or switch the probe to 1x, so they match. The V/div readout then shows true circuit volts.",
        },
        {
          q: "What does fine adjustment of V/div do?",
          a: "Fine or vernier adjustment lets you set values between the standard 1-2-5 steps, such as 1.2 V/div, so a waveform can exactly fill the screen. On many digital scopes you enable it by pressing the vertical scale knob. It is handy for comparing amplitudes against graticule lines, but the coarse steps are easier to read in your head.",
        },
        {
          q: "Should volts per division be the same on every channel?",
          a: "Not necessarily. Each channel has its own setting so that a 5 V logic signal and a 100 mV sensor signal can both be shown at a useful size. Matching them is helpful when you compare amplitudes by eye or use math functions such as subtraction, because the traces then share one vertical scale.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-avoid-overdriving-an-oscilloscope",
          title: "How to Avoid Overdriving an Oscilloscope",
          desc: "What happens when V/div is too sensitive for the signal, and how to zoom safely.",
        },
        {
          href: "/oscilloscopes/how-to-measure-voltage-with-an-oscilloscope",
          title: "How to Measure Voltage With an Oscilloscope",
          desc: "Peak-to-peak, RMS and DC level once the scale is set correctly.",
        },
      ]}
    >
      <Callout title="Before you probe anything powered">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Start at the least sensitive setting when you don&apos;t know the signal&apos;s size, especially on power
            circuits. A V/div that&apos;s too sensitive doesn&apos;t hurt the scope; a voltage above its rated input
            can.
          </li>
          <li>
            The ground clip on a mains-powered bench scope is tied to earth. Never clip it to a mains-referenced point;
            use a differential probe or an isolated, battery-powered handheld rated for the job.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What the volts-per-division setting controls</h2>
        <p className="text-muted leading-7 mb-4">
          The screen of almost every oscilloscope is a grid of 10 horizontal by 8 vertical divisions. The vertical scale
          setting, written V/div, says how many volts each of those vertical divisions is worth. At 1 V/div a 5 V
          signal stands five divisions tall; at 2 V/div the same signal is two and a half divisions. The setting moves in
          a 1-2-5 sequence: 1 mV, 2 mV, 5 mV, 10 mV, 20 mV, 50 mV, 100 mV and so on, up to several volts per division.
        </p>
        <p className="text-muted leading-7 mb-4">
          The setting does more than scale the picture. It selects the input attenuator and amplifier gain, which
          decides how the signal is spread across the analog-to-digital converter. An 8-bit converter has 256 levels in
          total, roughly 25 to 32 per division depending on the model. A waveform two divisions tall uses only about 50
          to 64 of them, so it looks stepped and noisy; one six divisions tall uses roughly 150 to 190, giving smoother
          traces and more precise automatic measurements.
        </p>
        <p className="text-muted leading-7 mb-4">
          Accuracy follows the same logic. Scope makers usually state DC gain accuracy as a percentage of full scale,
          and entry-level instruments commonly quote a few percent; check your datasheet for the exact figure. A
          percentage of full scale is a fixed number of millivolts at a given setting, so it is a small share of a
          waveform that fills the screen and a large share of one that is only a division tall. The habit of filling
          about six divisions therefore improves both the picture and the numbers. When you need better than a few
          percent on a DC level, a multimeter is the better instrument; see{" "}
          <Link href="/oscilloscopes/why-does-an-oscilloscope-show-different-voltage-readings-from-a-multimeter" className={link}>
            why a scope and a multimeter disagree
          </Link>
          .
        </p>
        <Figure caption={<>A 3.3 V logic signal at four neighboring V/div steps. 0.5 V/div fills the screen best; one step more sensitive runs off screen.</>}>
          <StepLadderDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Common V/div problems and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Readings 10x too low or high", "Probe attenuation menu doesn't match the probe switch", "Compare the probe switch with the channel menu", "Set both to 10x (or both to 1x)"],
            ["Trace is a thin, flat line", "V/div far too coarse for the signal", "Turn the knob clockwise a few steps", "Fit about 6 divisions"],
            ["Peaks flattened at the screen edge", "V/div too sensitive", "One step coarser: do the peaks round off?", "Increase V/div"],
            ["Knob turns but nothing changes", "Different channel selected", "Check which channel button is lit", "Select the right channel first"],
            ["Odd values like 1.37 V/div", "Fine adjust switched on", "Press the scale knob to toggle", "Return to coarse 1-2-5 steps"],
            ["Small signal stuck on big DC level", "DC coupling with a large offset", "Look at the DC average", "AC coupling or vertical offset"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="probe">Match the probe setting first</StepHeading>
        <p className="text-muted leading-7">
          Look at the switch on the probe body. If it says 10x, open the channel menu and set the probe or attenuation
          to 10x as well. The scope then multiplies everything by ten, so the V/div readout and every measurement show
          true circuit volts. Skip this, and you&apos;ll set a V/div that seems right but is ten times off. Most
          general-purpose probes ship with a 1x/10x switch; use 10x for most work because it loads the circuit less
          and extends the probe&apos;s bandwidth. If the square-wave calibrator output looks rounded or peaky, compensate
          the probe before trusting any amplitude; see{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="estimate">Estimate the peak-to-peak voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          You usually know roughly what to expect: a 5 V logic line, a 12 V rail, a 1 V audio signal. Divide the
          expected peak-to-peak by six to get the ideal V/div, then round up to the next standard step. A 3.3 V logic
          signal gives 3.3 ÷ 6 = 0.55, which rounds up to 1 V/div (3.3 divisions) or, if you&apos;re happy with less
          headroom, 0.5 V/div (6.6 divisions). A 24 V peak-to-peak motor drive signal gives 4, which rounds up to 5
          V/div.
        </p>
        <p className="text-muted leading-7">
          If you don&apos;t know, press Auto or Autoscale. It picks V/div, timebase and trigger automatically. It is a
          good starting point, not a final answer: autoscale sometimes chooses a setting that hides small details or
          triggers on the wrong edge.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="turn">Turn the vertical scale knob</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Press the channel button to select it, then turn that channel&apos;s vertical scale knob. On bench scopes
          with one set of vertical knobs, it adjusts whichever channel is selected. On handhelds and small scopes such
          as the FNIRSI DSO152, the vertical scale is a menu item or an up/down button pair. Watch the readout change at
          the screen edge; it typically shows the channel number and value, such as 1 500mV.
        </p>
        <Figure caption={<>Illustrative: the same 5 V square wave at 2 V/div, only 2.5 divisions tall (blue), and at 1 V/div, 5 divisions tall (green). The taller trace uses more of the converter&apos;s levels.</>}>
          <ScopeScreen
            wave="square"
            cycles={3}
            amplitude={2.5}
            offset={1.2}
            second={{ wave: "square", cycles: 3, amplitude: 1.25, offset: -2.6, label: "2 V/div" }}
            labels={{ left: "CH1 1 V/div", right: "CH2 2 V/div" }}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="fine">Use fine adjustment when a step is too coarse</StepHeading>
        <p className="text-muted leading-7">
          Sometimes the waveform fills 3 divisions at one step and runs off screen at the next. Fine adjustment, also
          called vernier, lets you pick values between the standard steps. On many digital scopes, pressing the vertical
          scale knob toggles between coarse and fine. Use it to stretch a waveform across the screen for a better look,
          but remember that odd values like 0.73 V/div are harder to convert in your head. Automatic measurements and
          cursors still report true volts whichever mode you use.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="position">Center the trace with position or offset</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The vertical position knob moves the trace up and down so it sits where you want it. A 0 to 5 V logic signal
          at 1 V/div fills the top five divisions if its ground sits at center; moving the ground marker down two and a
          half divisions centers the whole waveform. On many scopes, pressing the position knob returns the trace to
          center.
        </p>
        <p className="text-muted leading-7">
          When a small signal sits on a big DC level, like 50 mV of ripple on a 12 V rail, position alone can&apos;t help
          at a sensitive V/div. Switch the channel to AC coupling, which removes the DC level, or use DC coupling with
          vertical offset if your scope allows enough offset at that setting. Turning V/div down to 10 mV with a 12 V
          rail on a DC-coupled input overdrives the front end; see{" "}
          <Link href="/oscilloscopes/how-to-avoid-overdriving-an-oscilloscope" className={link}>
            how to avoid overdriving an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="verify">Verify the setting with a measurement</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Count divisions and multiply by V/div, then compare with the scope&apos;s own peak-to-peak measurement. If
          the trace is 4.2 divisions tall at 1 V/div, you expect 4.2 V; if the automatic Vpp says 42 V or 0.42 V, the
          probe setting is wrong. If the measurement shows a warning symbol or a greater-than sign, part of the waveform
          is off screen and the setting is too sensitive.
        </p>
        <KeyIdea title="Six divisions, then refine">
          Fill about six divisions, match the probe setting, and check the reading against a number you can predict.
          Those three habits fix nearly every vertical-scale problem.
        </KeyIdea>
      </section>

      <section>
        <h2 id="table" className="text-xl font-semibold mb-3">Quick setting table for common signals</h2>
        <p className="text-muted leading-7 mb-4">
          Settings calculated from peak-to-peak ÷ 6, rounded to the nearest 1-2-5 step that keeps the trace on screen.
          Values assume the channel probe setting matches the probe.
        </p>
        <DataTable
          head={["Signal", "Peak-to-peak", "Suggested V/div", "Height on screen"]}
          rows={[
            ["Small audio or sensor signal", "100 mV", "20 mV/div", "5 div"],
            ["Line-level audio", "2 V", "500 mV/div", "4 div"],
            ["3.3 V logic", "3.3 V", "500 mV/div", "6.6 div"],
            ["5 V logic or PWM", "5 V", "1 V/div", "5 div"],
            ["12 V PWM motor drive", "12 V", "2 V/div", "6 div"],
            ["24 V industrial signal", "24 V", "5 V/div", "4.8 div"],
          ]}
          mono={[1, 2, 3]}
        />
        <Figure caption={<>Calculated share of an 8-bit converter&apos;s 256 levels used by a waveform of each height, assuming the converter spans the 8-division screen. Taller traces give finer vertical detail.</>}>
          <BarChart
            items={[
              { label: "1 division tall", value: 32, display: "≈ 32 levels" },
              { label: "2 divisions", value: 64, display: "≈ 64 levels" },
              { label: "4 divisions", value: 128, display: "≈ 128 levels" },
              { label: "6 divisions", value: 192, display: "≈ 192 levels", highlight: true },
              { label: "8 divisions (no headroom)", value: 256, display: "256 levels" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope to use</h2>
        <p className="text-muted leading-7 mb-6">
          Dedicated per-channel controls make vertical scaling quick on a bench scope, while handhelds put it in a
          menu. These three cover the range from a pocket scope for learning to a four-channel bench instrument. Our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          guide compares more.
        </p>
        <ProductStrip
          title="Scopes for learning vertical scaling"
          items={[
            {
              name: "Rigol DS1054Z",
              image: ds1054z.image,
              alt: "Rigol DS1054Z oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "Hands-on tested. 50 MHz, 4 channels, 1 GSa/s and a 7-inch display with clear channel readouts.",
            },
            {
              name: "Hantek DSO2D10",
              image: dso2d10.image,
              alt: "Hantek DSO2D10 oscilloscope with built-in generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100 MHz, 2 channels and a built-in 25 MHz generator to make known test signals for practice.",
            },
            {
              name: "FNIRSI DSO152",
              image: dso152.image,
              alt: "FNIRSI DSO152 handheld oscilloscope",
              href: "/oscilloscopes/fnirsi-dso152-review",
              note: "Pocket single-channel scope, 200 kHz and 2.5 MSa/s, for audio-range signals and learning the basics.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
