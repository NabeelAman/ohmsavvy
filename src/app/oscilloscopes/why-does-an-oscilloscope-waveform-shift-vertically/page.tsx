import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  ScopeScreen,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Why does an oscilloscope waveform shift vertically? Vertical position, AC vs DC coupling, wrong probe attenuation, ground reference and baseline wander, fixed.";

export const metadata = buildMetadata({
  title: "Why an Oscilloscope Waveform Shifts Vertically",
  description,
  path: "/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function WhyDoesAnOscilloscopeWaveformShiftVerticallyPage() {
  return (
    <HowToShell
      title="Why Does an Oscilloscope Waveform Shift Vertically?"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/why-does-an-oscilloscope-waveform-shift-vertically"
      category="oscilloscopes"
      intro={
        <>
          If you are wondering why an oscilloscope waveform shifts vertically, the answer is usually a
          setting rather than a fault: the vertical position control, the input coupling, or a probe
          ratio that doesn&apos;t match the probe. Less often, the ground connection is wrong or the
          signal itself is drifting. This guide explains each cause, shows what it looks like on screen,
          and ends with a troubleshooting table to work through in order.
        </>
      }
      aside={{
        image: hantek.image,
        alt: "Hantek DSO2D10 two-channel digital oscilloscope with built-in waveform generator",
        caption: (
          <>
            The Hantek DSO2D10 (100MHz, 2 channels, 1 GSa/s) is one of the scopes in our reviews. Every
            digital scope has the vertical controls described here, though menus differ. See our{" "}
            <Link href="/oscilloscopes/hantek-dso2d10-review" className={link}>
              DSO2D10 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "short-answer", label: "The short answer" },
        { id: "vertical-position", label: "1. Vertical position and offset" },
        { id: "dc-coupling", label: "2. DC coupling shows the DC level" },
        { id: "ac-coupling-settling", label: "3. AC coupling re-centres the trace" },
        { id: "probe-attenuation", label: "4. Probe attenuation set wrong" },
        { id: "ground-reference", label: "5. Ground reference problems" },
        { id: "autoset", label: "6. Auto/AutoSet moved things" },
        { id: "signal-drift", label: "7. The signal really is drifting" },
        { id: "troubleshooting", label: "Troubleshooting table" },
        { id: "which-scope", label: "Scopes in our reviews" },
      ]}
      faq={[
        {
          q: "Why is my DC voltage showing as 0 V on the oscilloscope?",
          a: "The channel is almost certainly AC coupled. AC coupling blocks the DC part of the signal, so a steady 5 V rail settles onto the ground line and reads about 0 V. Switch the channel's coupling to DC and the trace moves up to its true level. Also check that the probe ratio matches the probe switch.",
        },
        {
          q: "How do I reset the vertical position to zero?",
          a: "On many digital scopes, pressing the vertical position knob returns that channel's ground marker to the centre line. Others have a menu option to zero the offset. A full default setup also resets it, but that clears every other setting too. The exact method varies by model, so check your scope's manual.",
        },
        {
          q: "Why does my waveform jump when I change volts per division?",
          a: "It depends on how your scope stores the position. Some models hold the offset in divisions, so the trace stays put on screen; others hold it in volts, so the same offset needs a different number of divisions at the new V/div and the trace moves. Neither is a fault. Your manual describes how your model behaves.",
        },
        {
          q: "Can a damaged probe make the trace shift?",
          a: "Yes. A broken ground lead or a worn ground connection at the BNC leaves the probe without a proper return, so the trace can wander, pick up hum and sit at the wrong level. Touch the probe tip to its own ground clip: a good probe shows a flat line on the ground marker. Swapping in a second probe confirms it.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/why-oscilloscope-waveform-is-noisy",
          title: "Why Does an Oscilloscope Waveform Look Noisy?",
          desc: "Ground leads, ground loops, bandwidth and probe compensation, the setup-side causes of noise.",
        },
        {
          href: "/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope",
          title: "How to Measure Ripple Voltage With an Oscilloscope",
          desc: "Where AC coupling is the right choice: small ripple on top of a large DC rail.",
        },
      ]}
    >
      <Callout title="Safety first: never move the ground clip to fix a baseline">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, every probe ground clip is connected to mains earth. Moving
            the clip to a point that isn&apos;t at earth potential to &quot;fix&quot; a baseline shorts
            that point to earth and can destroy the probe, the scope or the circuit.
          </li>
          <li>
            Never float the scope by removing its earth connection. For signals that aren&apos;t
            referenced to earth, such as anything on the mains side of a power supply, use a rated
            differential probe or an isolation transformer on the device under test.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="short-answer" className="text-xl font-semibold mb-3">The short answer</h2>
        <p className="text-muted leading-7 mb-4">
          A trace sits where it does for two reasons: the signal&apos;s voltage relative to the probe
          ground, and where the scope has been told to draw 0 V. Anything that changes either one moves
          the waveform up or down. These are the usual suspects, roughly from most to least common:
        </p>
        <InfoCards
          items={[
            { label: "Vertical position", desc: "Someone turned the position knob, or the offset moved with a V/div change." },
            { label: "DC coupling", desc: "The signal has a DC component, so it sits above or below ground. Correct behaviour." },
            { label: "AC coupling", desc: "DC is removed and the trace drifts back to centre after any level change." },
            { label: "Probe ratio", desc: "Channel set to 1x with a 10x probe, or the reverse, scales every level." },
            { label: "Ground reference", desc: "Ground clip loose, missing, or on a point that isn't the circuit's 0 V." },
            { label: "Real drift", desc: "The signal's own DC level is changing: supply sag, warm-up, coupling capacitors." },
          ]}
        />
      </section>

      <section>
        <h2 id="vertical-position" className="text-xl font-semibold mb-3">1. The vertical position or offset control</h2>
        <p className="text-muted leading-7 mb-4">
          Each channel has a vertical position knob that slides the trace and its ground marker (the
          small arrow at the left edge) up or down together. It doesn&apos;t change the signal or the
          reading, because levels are measured from the marker, not from the centre line. Moving it is
          useful: dropping the ground marker 2 divisions lets a 0–5 V logic signal fill the screen at 1
          V/div. But if someone else used the scope last, or you nudged the knob, the trace can appear
          to have jumped.
        </p>
        <p className="text-muted leading-7">
          On many scopes, pressing the position knob returns the marker to the centre line. Some models
          also hold the offset in volts rather than divisions, so the trace moves when you change V/div.
          Always read levels from the marker, as explained in{" "}
          <Link href="/oscilloscopes/how-to-read-an-oscilloscope" className={link}>
            how to read an oscilloscope
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="dc-coupling" className="text-xl font-semibold mb-3">2. DC coupling shows the signal&apos;s DC level</h2>
        <p className="text-muted leading-7 mb-4">
          With DC coupling, the scope shows everything, including any steady voltage the signal sits on.
          An audio stage biased at half its supply, a sensor output with a 2.5 V midpoint, or ripple on a
          5 V rail all appear lifted off the ground line. That isn&apos;t a shift; it is the true
          voltage. Switching to AC coupling removes the DC part and centres the waveform.
        </p>
        <Figure
          caption={
            <>
              A 1 V peak-to-peak sine riding on 2.5 V DC, both at 1 V/div with ground on the centre line.
              Left, DC coupled: the trace is centred 2.5 divisions up (2.5 × 1 V = 2.5 V). Right, AC
              coupled: the 2.5 V is blocked and the 1-division (1 V p-p) swing is centred on ground.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={0.5}
              offset={2.5}
              labels={{ left: "CH1 1 V/div  DC", right: "1 ms/div" }}
              marks={[{ x1: 2.5, y1: 4, x2: 2.5, y2: 1.5, text: "2.5 div = 2.5 V" }]}
            />
            <ScopeScreen
              wave="sine"
              cycles={2}
              amplitude={0.5}
              labels={{ left: "CH1 1 V/div  AC", right: "1 ms/div" }}
              marks={[{ x1: 1.25, y1: 4.5, x2: 1.25, y2: 3.5, text: "1 V p-p" }]}
            />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          AC coupling is the right tool for small variations on a big DC level, which is exactly how{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            ripple voltage
          </Link>{" "}
          is measured. For anything else, start on DC so you see where the signal really sits.
        </p>
      </section>

      <section>
        <h2 id="ac-coupling-settling" className="text-xl font-semibold mb-3">3. AC coupling re-centres the trace, slowly</h2>
        <p className="text-muted leading-7 mb-4">
          AC coupling works by putting a capacitor in series with the input, which forms a high-pass
          filter with the input resistance. It doesn&apos;t remove DC instantly. When the signal&apos;s DC
          level steps, for example when a circuit powers up or a load switches on, the trace jumps by the
          size of the step and then drifts back towards the centre line as the capacitor charges. The
          cutoff frequency, and so the speed of that drift, varies by model; your scope&apos;s datasheet
          lists it.
        </p>
        <p className="text-muted leading-7 mb-4">
          AC coupling also centres a waveform on its average, not on its low level. A 0–5 V square wave
          at 50% duty averages 2.5 V, so it shows as ±2.5 V. Change the duty to 20% and the average drops
          to 1 V, so the same signal now shows as +4 V and −1 V: the whole trace moves up even though the
          real levels never changed.
        </p>
        <Figure
          caption={
            <>
              A 0–5 V signal, AC coupled at 2 V/div. Left, 50% duty: high at +1.25 div (+2.5 V), low at
              −1.25 div (−2.5 V). Right, 20% duty: high at +2 div (+4 V), low at −0.5 div (−1 V). The
              average of each is 0 V, so the trace moves when the duty cycle changes.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="square"
              cycles={2}
              amplitude={1.25}
              shift={1}
              labels={{ left: "50% duty  2 V/div  AC", right: "0.2 ms/div" }}
              marks={[{ x1: 2.25, y1: 4, x2: 2.25, y2: 2.75, text: "+2.5 V" }]}
            />
            <ScopeScreen
              wave="pulse"
              cycles={2}
              amplitude={1.25}
              offset={0.75}
              shift={1}
              labels={{ left: "20% duty  2 V/div  AC", right: "0.2 ms/div" }}
              marks={[{ x1: 1.5, y1: 4, x2: 1.5, y2: 2, text: "+4 V" }]}
            />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          This is why logic and PWM signals belong on DC coupling. Very slow square waves on AC coupling
          also show tilted tops, because the coupling capacitor starts to discharge within each half
          cycle. More on square-wave set-up in{" "}
          <Link href="/oscilloscopes/how-to-measure-a-square-wave-with-an-oscilloscope" className={link}>
            how to measure a square wave
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="probe-attenuation" className="text-xl font-semibold mb-3">4. The probe attenuation setting doesn&apos;t match the probe</h2>
        <p className="text-muted leading-7 mb-4">
          A 10x probe divides the signal by ten before it reaches the scope. The channel&apos;s probe
          setting tells the scope to multiply it back. If the two disagree, every level is scaled by ten,
          so a DC level appears much closer to ground, or much further from it, than it should. It looks
          like a vertical shift, but it is a scale error.
        </p>
        <Figure
          caption={
            <>
              A 5 V rail measured with a 10x probe while the channel is set to 1x. The flat trace sits 2.5
              divisions above ground at 0.2 V/div: 2.5 × 0.2 V = 0.5 V, one tenth of the 5.00 V a
              multimeter reads on the same point.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="flat"
              offset={2.5}
              labels={{ left: "CH1 0.2 V/div  probe set 1x", right: "1 ms/div" }}
              marks={[{ x1: 5, y1: 4, x2: 5, y2: 1.5, text: "2.5 div = 0.5 V" }]}
            />
            <MeterReadout value="5.00" unit="V DC" mode="DC V" />
          </div>
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["Probe switch", "Channel setting", "5 V rail reads as", "Fix"]}
            rows={[
              ["10x", "10x", "5 V", "Correct"],
              ["10x", "1x", "0.5 V", "Set the channel to 10x"],
              ["1x", "10x", "50 V", "Set the channel to 1x"],
              ["1x", "1x", "5 V", "Correct, but less bandwidth than 10x"],
            ]}
            mono={[2]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          A quick check is to measure a known voltage, such as a battery or the scope&apos;s calibration
          output, and compare. While you are there, check the probe&apos;s{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            compensation
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="ground-reference" className="text-xl font-semibold mb-3">5. Ground reference problems</h2>
        <p className="text-muted leading-7 mb-4">
          The scope measures the voltage between the probe tip and the probe&apos;s ground. If that
          ground isn&apos;t the circuit&apos;s 0 V, the baseline is wrong:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Ground clip not connected.</strong> The return current
            finds its way through mains earth and other wiring, so the trace drifts, picks up hum and
            sits at an unpredictable level.
          </li>
          <li>
            <strong className="text-foreground">Ground clip on a busy return wire.</strong> If the clip
            is on a ground wire that carries load current, that wire&apos;s voltage drop appears as an
            offset. For example, 2 A through 0.05 Ω of ground wiring is 2 × 0.05 = 0.1 V, enough to lift
            a low-voltage signal visibly. Clip to ground right next to the signal.
          </li>
          <li>
            <strong className="text-foreground">Ground loops.</strong> When the circuit is also earthed
            through another instrument, small currents between the earths can shift and wobble the
            baseline. The fixes are covered in{" "}
            <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
              why a waveform looks noisy
            </Link>
            .
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Remember that on a bench scope all channel grounds are connected together and to earth, so two
          probes clipped to two different &quot;grounds&quot; short them to each other.
        </p>
      </section>

      <section>
        <h2 id="autoset" className="text-xl font-semibold mb-3">6. Auto/AutoSet changed the settings</h2>
        <p className="text-muted leading-7">
          The Auto (or AutoSet) button picks V/div, timebase and trigger to fit whatever it finds, and on
          many scopes it also resets the vertical position. If you had carefully placed the ground marker
          or set a large offset, one press puts the trace somewhere else. Exactly what Auto changes,
          including whether it touches coupling, varies by model. After using it, check the channel
          menu before trusting the levels.
        </p>
      </section>

      <section>
        <h2 id="signal-drift" className="text-xl font-semibold mb-3">7. The signal itself is drifting</h2>
        <p className="text-muted leading-7 mb-4">
          Sometimes the shift is real. Common causes are a supply rail sagging under load, a battery
          discharging, a circuit warming up after power-on, and coupling capacitors inside the circuit
          charging after a level change, which produces the same slow drift as the scope&apos;s AC
          coupling. Mains hum mixed into a signal can also look like the baseline jumping between
          captures at slow timebases.
        </p>
        <KeyIdea title="Prove it is the signal">
          Short the probe tip to its own ground clip. If that trace sits still on the ground marker, the
          scope and probe are fine and the movement is in the circuit. Then confirm with a multimeter on
          DC volts: a real drift shows on both instruments.
        </KeyIdea>
      </section>

      <section>
        <h2 id="troubleshooting" className="text-xl font-semibold mb-3">Troubleshooting table</h2>
        <Figure caption={<>Work through the checks in this order; most shifts are solved by the first three.</>}>
          <FlowDiagram
            steps={[
              { label: "Coupling", sub: "Set DC unless you need AC" },
              { label: "Probe ratio", sub: "Match the channel to the probe switch" },
              { label: "Position", sub: "Re-zero the ground marker" },
              { label: "Ground", sub: "Short tip to clip: flat line?" },
              { label: "Signal", sub: "Confirm drift with a multimeter" },
            ]}
          />
        </Figure>
        <div className="mt-5">
          <DataTable
            head={["Symptom", "Likely cause", "Fix"]}
            rows={[
              ["Trace offset but readings from the marker are right", "Vertical position moved", "Re-zero the position; read from the ground marker"],
              ["DC level missing, trace centred on ground", "AC coupling", "Switch to DC coupling"],
              ["Trace jumps then creeps back to centre", "AC coupling settling after a level change", "Use DC coupling"],
              ["Trace moves when duty cycle changes", "AC coupling centres on the average", "Use DC coupling"],
              ["Levels 10 times too small or too large", "Probe ratio mismatch", "Match the channel setting to the probe"],
              ["Baseline wanders and hums", "Ground clip loose, missing or on a busy return", "Clip to ground next to the signal"],
              ["Shift appears after pressing Auto", "AutoSet reset the position", "Re-check the channel menu"],
              ["Same drift on scope and multimeter", "The signal is really drifting", "Investigate the circuit"],
            ]}
          />
        </div>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Scopes in our reviews</h2>
        <p className="text-muted leading-7 mb-4">
          All of these causes apply to every digital scope. If you are still choosing one, compare the
          options in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup, or start with{" "}
          <Link href="/oscilloscopes/how-to-use-an-oscilloscope" className={link}>
            how to use an oscilloscope
          </Link>
          .
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s. Suited to hobbyists, students and general electronics.",
            },
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s, for projects that will get more demanding.",
            },
            {
              name: "Hantek DSO2D10",
              image: hantek.image,
              alt: "Hantek DSO2D10 two-channel oscilloscope with built-in waveform generator",
              href: "/oscilloscopes/hantek-dso2d10-review",
              note: "100MHz, 2 channels, 1 GSa/s; an oscilloscope and waveform generator in one unit.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
