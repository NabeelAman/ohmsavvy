import Link from "next/link";
import {
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
  "How to trigger an oscilloscope on a runt pulse: set the two thresholds at the logic levels, use edge and persistence workarounds, then trace the cause.";

export const metadata = buildMetadata({
  title: "How to Trigger an Oscilloscope on a Runt Pulse",
  description,
  path: "/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse",
});

const rigol = picks.find((p) => p.name === "Rigol DS1054Z")!;
const siglent = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const hantek = picks.find((p) => p.name === "Hantek DSO2D10")!;

const link = "text-accent hover:underline";

export default function HowToTriggerAnOscilloscopeOnARuntPulsePage() {
  return (
    <HowToShell
      title="How to Trigger an Oscilloscope on a Runt Pulse"
      description={description}
      published="2026-10-22"
      path="/oscilloscopes/how-to-trigger-an-oscilloscope-on-a-runt-pulse"
      category="oscilloscopes"
      intro={
        <>
          A runt is a pulse that starts to switch but never finishes: it crosses the receiver&apos;s low
          threshold and falls back before it reaches the high one. Runts are rare and easy to miss, and an
          ordinary edge trigger cannot single them out. This guide shows how to trigger an oscilloscope on
          a runt pulse with a dedicated runt trigger, what to do if your scope does not have one, and how
          to work out what is producing the runts in the first place.
        </>
      }
      aside={{
        image: siglent.image,
        alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope, front view",
        caption: (
          <>
            The Siglent SDS1104X-E (100MHz, 4 channels, 1 GSa/s) is one of the bench scopes in our
            reviews. Check any scope&apos;s manual for the exact trigger types it offers. See our{" "}
            <Link href="/oscilloscopes/siglent-sds1104x-e-review" className={link}>
              SDS1104X-E review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-is-a-runt", label: "What a runt pulse is" },
        { id: "check-trigger-types", label: "Check which triggers you have" },
        { id: "set-thresholds", label: "Set the two thresholds" },
        { id: "polarity-and-width", label: "Choose polarity and width" },
        { id: "single-capture", label: "Arm Normal or Single mode" },
        { id: "measure-the-runt", label: "Measure the runt" },
        { id: "edge-workarounds", label: "Workarounds without a runt trigger" },
        { id: "runt-causes", label: "What causes runt pulses" },
        { id: "which-scope", label: "Which scope you need" },
      ]}
      faq={[
        {
          q: "What is the difference between a runt pulse and a glitch?",
          a: "A glitch is usually defined by time: a pulse narrower than the circuit should ever produce, often at full amplitude. A runt is defined by amplitude: it crosses one logic threshold but not the other, whatever its width. One fault can be both, a narrow pulse that never reaches full height, so either trigger may catch it.",
        },
        {
          q: "Can a runt pulse cause a microcontroller to malfunction?",
          a: "Yes. Because a runt sits between the logic thresholds, one input may read it as a high and another as a low, or a flip-flop clocked by it can be left in an undefined state for a while. The result is an extra or missing count, a corrupted bit, or a fault that only appears on some boards.",
        },
        {
          q: "Why does my runt trigger fire on every pulse?",
          a: "Usually the upper threshold is set above the normal high level, so every pulse fails to reach it and counts as a runt. Measure the normal pulse top first and set the upper threshold comfortably below it. Also check the probe attenuation setting, because a wrong 1x or 10x setting scales every threshold you enter.",
        },
        {
          q: "Does probe bandwidth matter when hunting runts?",
          a: "It can. A narrow runt passed through a 1x probe or a scope near its bandwidth limit is rounded off and reads lower than it really is, so a short full-height glitch can look like a runt. Use a compensated 10x probe with a short ground and keep the bandwidth limit off while you hunt.",
        },
        {
          q: "Can a logic analyzer catch runt pulses?",
          a: "Not reliably. A logic analyzer compares each input against a single threshold and records only high or low, so a runt either looks like a normal pulse or vanishes, depending on which side of that threshold it peaks. It is still useful for finding when the fault happens and what the bus was doing at the time; then use the scope's runt trigger to see the real amplitude.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches",
          title: "How to Use Oscilloscope Persistence to Find Intermittent Glitches",
          desc: "Find a rare fault first with infinite persistence, then isolate it with a dedicated trigger.",
        },
        {
          href: "/oscilloscopes/how-to-trigger-an-oscilloscope",
          title: "How to Trigger an Oscilloscope",
          desc: "Edge level, slope, holdoff and the Auto, Normal and Single modes this guide relies on.",
        },
      ]}
    >
      <Callout title="Safety: know where the ground clip goes">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            On a mains-powered bench scope, the probe ground clip is connected to mains earth. Clip it only
            to the circuit&apos;s ground; touching it to any other voltage shorts that point to earth.
          </li>
          <li>
            Runts often show up on gate-drive and control signals inside switching supplies and motor
            drives, where the local ground may sit at mains potential. Use a rated differential probe or
            an isolation transformer on the device under test, and never float the scope.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-is-a-runt" className="text-xl font-semibold mb-3">What a runt pulse is</h2>
        <p className="text-muted leading-7 mb-4">
          A digital input sees three regions: below its low threshold it reads 0, above its high threshold
          it reads 1, and in between the result is not guaranteed. A healthy pulse crosses both thresholds
          quickly. A runt crosses the first threshold and turns back before reaching the second, so it
          spends its whole life in the undefined band. One gate may count it and another may ignore it.
        </p>
        <p className="text-muted leading-7 mb-4">
          That inconsistency is what makes runts so troublesome. A clock line with an occasional runt can
          advance one counter and not another, so two parts of a system disagree about what time it is. The
          symptom is often a rare crash, a corrupted byte or a board that fails only when warm, with nothing
          obviously wrong when you look at the signal with a normal edge trigger.
        </p>
        <Figure
          caption={
            <>
              Illustration at 1 V/div and 1 µs/div, ground 2.5 divisions below center, with an upper
              threshold of 3.5 V and a lower one of 1.5 V. Left: a normal 0–5 V pulse, 2 µs wide, crosses
              both. Right: a runt that peaks at 2.5 V crosses 1.5 V but never reaches 3.5 V.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <ScopeScreen
              wave="pulse"
              cycles={1}
              amplitude={2.5}
              shift={4}
              labels={{ left: "Normal pulse", right: "1 µs/div" }}
              marks={[
                { x1: 0.2, y1: 3, x2: 3.6, y2: 3, text: "upper 3.5 V" },
                { x1: 0.2, y1: 5, x2: 3.6, y2: 5, text: "lower 1.5 V" },
              ]}
            />
            <ScopeScreen
              wave="pulse"
              cycles={1}
              amplitude={1.25}
              offset={-1.25}
              shift={4}
              labels={{ left: "Runt", right: "1 µs/div" }}
              marks={[
                { x1: 0.2, y1: 3, x2: 3.6, y2: 3, text: "upper 3.5 V" },
                { x1: 0.2, y1: 5, x2: 3.6, y2: 5, text: "lower 1.5 V" },
              ]}
            />
          </div>
        </Figure>
        <KeyIdea title="The rule a runt trigger applies">
          Fire when the signal crosses the lower threshold and returns across it without having crossed
          the upper threshold (for a positive runt). A normal pulse crosses both, so it is ignored.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={1} id="check-trigger-types">Check which trigger types your scope has</StepHeading>
        <p className="text-muted leading-7">
          Open the trigger menu and look through the type list. Many digital scopes include a runt trigger,
          sometimes alongside a window trigger or a pulse-width (glitch) trigger, but availability varies
          by model, firmware and installed options. Our product data for the scopes we review does not
          confirm which of them offer a runt trigger, so check your own manual rather than assuming. If you
          have one, carry on with steps 2 to 4. If not, skip to the{" "}
          <a href="#edge-workarounds" className={link}>
            workarounds
          </a>
          . Before any of it, compensate the 10x probe and use a short ground; see{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="set-thresholds">Set the upper and lower thresholds at the logic levels</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The two thresholds define what counts as a runt, so they should match what the receiving chip
          treats as a valid low and high. Its datasheet lists them as V<sub>IL</sub> (maximum input low)
          and V<sub>IH</sub> (minimum input high). Set the lower threshold at or just above V<sub>IL</sub>{" "}
          and the upper one at or just below V<sub>IH</sub>. Measure the normal high and low levels first
          so you know both thresholds sit well inside the real swing.
        </p>
        <DataTable
          head={["Logic family (typical)", "Supply", "Lower threshold (VIL)", "Upper threshold (VIH)"]}
          rows={[
            ["5 V CMOS, e.g. 74HC", "5 V", "1.5 V", "3.5 V"],
            ["5 V TTL, e.g. 74LS / 74HCT inputs", "5 V", "0.8 V", "2.0 V"],
            ["3.3 V LVTTL-compatible", "3.3 V", "0.8 V", "2.0 V"],
          ]}
          mono={[2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          These are common textbook values; individual parts differ, so take the real numbers from the
          receiving chip&apos;s datasheet. If you are unsure, a starting point of roughly 30% and 70% of the
          supply catches most runts on a CMOS signal. Make sure the probe attenuation set on the channel
          matches the probe, or every threshold will be off by a factor of ten.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="polarity-and-width">Choose polarity and, if offered, a width limit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A positive runt rises from low and fails to reach the upper threshold; a negative runt falls from
          high and fails to reach the lower one. Choose the polarity that matches the fault, or
          &quot;either&quot; if your scope offers it and you do not know yet. A normally-low clock or chip
          select line usually shows positive runts; a normally-high reset or active-low line usually shows
          negative ones.
        </p>
        <p className="text-muted leading-7">
          Some runt triggers also let you qualify the runt by width, such as narrower or wider than a set
          time. Leave that off at first so you catch everything, then use it to separate two different kinds
          of runt once you have seen them.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="single-capture">Arm Normal or Single mode and wait</StepHeading>
        <p className="text-muted leading-7 mb-4">
          In Auto mode the scope sweeps on its own when no trigger arrives, which would overwrite the rare
          runt within moments. Use Normal mode to see every runt as it happens, or Single to freeze the first
          one. Place the trigger point near the center of the screen so you can see what led up to the runt
          as well as what followed it, then run the circuit through whatever conditions bring the fault on.
        </p>
        <p className="text-muted leading-7">
          When it fires, measure the runt&apos;s peak, width and timing relative to neighboring edges with
          cursors. If you have a spare channel, put the clock, the supply rail or the driving signal on it,
          because the relationship between the runt and those signals is usually what reveals the cause.
        </p>
      </section>

      <section>
        <h2 id="measure-the-runt" className="text-xl font-semibold mb-3">Measure the runt once you have it</h2>
        <p className="text-muted leading-7 mb-4">
          A single frozen capture is evidence, but a few numbers make it useful to whoever has to fix the
          circuit. Record these for each runt you catch:
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>
            <strong className="text-foreground">Peak level.</strong> How far it got towards the upper
            threshold. A runt that just misses V<sub>IH</sub> behaves very differently from one that barely
            leaves ground.
          </li>
          <li>
            <strong className="text-foreground">Width at the lower threshold.</strong> Use time cursors where
            the runt crosses the lower threshold going up and coming down. Compare it with the narrowest
            legitimate pulse.
          </li>
          <li>
            <strong className="text-foreground">Position relative to the clock.</strong> A runt that always
            sits a fixed time after a clock edge has a timing cause; one that floats at random usually comes
            from noise, crosstalk or an asynchronous input.
          </li>
          <li>
            <strong className="text-foreground">Rate.</strong> Count how many appear per second or per
            operation with the scope in Normal mode. A rate that changes with temperature, supply voltage or
            load is a strong clue.
          </li>
        </ul>
        <p className="text-muted leading-7">
          Keep the thresholds identical while you change one thing at a time in the circuit. If the runt rate
          drops to zero after a change, you have probably found the cause. For width measurements in general,
          see{" "}
          <Link href="/oscilloscopes/how-to-measure-pulse-width-with-an-oscilloscope" className={link}>
            how to measure pulse width
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="edge-workarounds" className="text-xl font-semibold mb-3">Workarounds if your scope has no runt trigger</h2>
        <p className="text-muted leading-7 mb-4">
          A plain edge trigger cannot isolate a runt on its own. Set the level below the runt&apos;s peak
          and both the runt and every normal pulse cross it; set it above the peak and only normal pulses
          fire. You can still find and measure runts with a combination of tools:
        </p>
        <Figure
          caption={
            <>
              The problem with edge triggering. A 0–5 V pulse train at 1 V/div with the trigger level (T) at
              1.5 V: every pulse crosses it, so a runt that also reaches 1.5 V is just one more trigger among
              thousands.
            </>
          }
        >
          <ScopeScreen
            wave="pulse"
            cycles={3}
            amplitude={2.5}
            triggerLevel={-1}
            labels={{ left: "CH1 1 V/div  edge, rising", right: "Normal" }}
          />
        </Figure>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mt-4 mb-4">
          <li>
            <strong className="text-foreground">Edge trigger plus infinite persistence.</strong> Trigger on
            the normal rising edge in Normal mode, turn on infinite persistence and leave it running. A runt
            appears as a faint pulse that stops short of the bright band of normal ones. Our{" "}
            <Link href="/oscilloscopes/how-to-use-oscilloscope-persistence-to-find-intermittent-glitches" className={link}>
              persistence guide
            </Link>{" "}
            covers this method in detail.
          </li>
          <li>
            <strong className="text-foreground">Pulse-width trigger.</strong> Many runts are also narrower
            than normal pulses. A trigger set for pulses shorter than the shortest legitimate width often
            catches them.
          </li>
          <li>
            <strong className="text-foreground">Trigger on what causes it.</strong> If you suspect a
            particular event, such as a relay closing or a bus changing direction, trigger on that signal and
            watch the line with the runt on another channel.
          </li>
          <li>
            <strong className="text-foreground">Long capture and zoom.</strong> Capture a long record in
            Single mode and scroll or zoom through it looking for short pulses. This works best when runts
            are frequent.
          </li>
        </ul>
        <Figure caption={<>The full workflow, with or without a dedicated runt trigger.</>}>
          <FlowDiagram
            steps={[
              { label: "Probe set up", sub: "10x, compensated, short ground" },
              { label: "Measure levels", sub: "Normal high and low" },
              { label: "Thresholds", sub: "At VIL and VIH" },
              { label: "Arm", sub: "Normal or Single mode" },
              { label: "Correlate", sub: "Clock, rail or source on CH2" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="runt-causes" className="text-xl font-semibold mb-3">What causes runt pulses</h2>
        <p className="text-muted leading-7 mb-4">
          A runt says that something tried to switch the line and either stopped or was overpowered. The
          timing of the runt against other signals points to which:
        </p>
        <DataTable
          head={["Likely cause", "Typical clue on the scope", "What to check"]}
          rows={[
            ["Logic race or hazard", "Runt lines up with another input changing", "Gate logic, add a register or synchronise"],
            ["Metastable flip-flop", "Runt or late edge after an asynchronous input", "Synchronizer stages on the input"],
            ["Bus contention", "Runt when two drivers are enabled at once", "Enable timing, direction control"],
            ["Weak driver or heavy load", "Slow edges that sometimes do not finish", "Load capacitance, pull-up value"],
            ["Supply droop or ground bounce", "Runts coincide with dips on the rail (CH2)", "Decoupling, ground path"],
            ["Crosstalk", "Runt aligns with edges on a neighboring line", "Routing, spacing, edge rates"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Before chasing the circuit, rule out the measurement: a long ground lead or a 1x probe can turn a
          clean narrow pulse into something that looks short and low. If the runt changes when you change
          the probe setup, it was never real. Signals that look grainy rather than short may need{" "}
          <Link href="/oscilloscopes/why-oscilloscope-waveform-is-noisy" className={link}>
            the noisy waveform checks
          </Link>{" "}
          instead, and a single tall spike rather than a short pulse is covered in{" "}
          <Link href="/oscilloscopes/how-to-capture-a-brief-voltage-spike-with-an-oscilloscope" className={link}>
            how to capture a brief voltage spike
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-scope" className="text-xl font-semibold mb-3">Which scope you need for runt hunting</h2>
        <p className="text-muted leading-7 mb-4">
          A narrow runt only looks like a runt if the scope has the bandwidth and sample rate to show its true
          height; too little and a short full-height glitch is rounded down into a fake runt. A second channel
          for the clock or supply rail makes finding the cause much faster. For this kind of digital debugging
          a bench scope is the right tool, and our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup compares them. Check each model&apos;s manual for its trigger list before buying.
        </p>
        <ProductStrip
          title="Bench scopes in our reviews"
          items={[
            {
              name: "Siglent SDS1104X-E",
              image: siglent.image,
              alt: "Siglent SDS1104X-E four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/siglent-sds1104x-e-review",
              note: "100MHz, 4 channels, 1 GSa/s; more bandwidth than the Rigol, for projects that will get more demanding.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel benchtop digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "50MHz, 4 channels, 1 GSa/s; the default beginner recommendation for years.",
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
