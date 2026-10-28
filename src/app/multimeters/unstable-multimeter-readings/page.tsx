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
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Multimeter voltage reading fluctuates? Find the cause: floating inputs, noise and PWM, loose probes, a low battery, autoranging, or a supply that really varies.";

export const metadata = buildMetadata({
  title: "What Causes Unstable Multimeter Readings?",
  description,
  path: "/multimeters/unstable-multimeter-readings",
});

const link = "text-accent hover:underline";

const meters = getAllPicks("multimeters");
const fluke117 = meters.find((p) => p.name === "Fluke 117")!;
const fluke87v = meters.find((p) => p.name === "Fluke 87V")!;
const rigol = getAllPicks("oscilloscopes").find((p) => p.name === "Rigol DS1054Z")!;

/** Left: red lead floating near mains wiring picks up hum through stray capacitance. Right: both probes on a source. */
function FloatingInputDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Two panels. On the left the red test lead is connected to nothing and lies near a live mains cable; stray capacitance couples hum into the meter's 10 megohm input, so the display wanders. On the right both probes sit across a battery, which holds the input at a fixed voltage, so the display is steady"
    >
      <text x="8" y="14" fontSize="11" fontWeight="600" className="fill-foreground">Floating input</text>
      <text x="180" y="14" fontSize="11" fontWeight="600" className="fill-foreground">Both probes on a source</text>
      <line x1="170" y1="4" x2="170" y2="196" className="stroke-border" strokeWidth="1" strokeDasharray="3 3" />

      {/* left panel */}
      <line x1="10" y1="40" x2="160" y2="40" className="stroke-foreground" strokeWidth="3" />
      <text x="10" y="32" fontSize="9" className="fill-muted">mains cable, 120 V AC</text>
      <g className="stroke-accent" strokeWidth="1.6">
        <line x1="60" y1="40" x2="60" y2="58" />
        <line x1="50" y1="58" x2="70" y2="58" />
        <line x1="50" y1="64" x2="70" y2="64" />
      </g>
      <text x="74" y="64" fontSize="9" className="fill-accent">stray C</text>
      <path d="M60 64 V80 H40 V110" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <circle cx="40" cy="80" r="3" className="fill-accent" />
      <text x="8" y="76" fontSize="9" className="fill-muted">red tip in air</text>
      <rect x="25" y="110" width="110" height="46" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="80" y="131" fontSize="14" textAnchor="middle" fontFamily="ui-monospace, monospace" className="fill-accent">0.37 → 1.8</text>
      <text x="80" y="148" fontSize="9" textAnchor="middle" className="fill-muted">10 MΩ input, V~</text>
      <path d="M120 156 V176 H150" className="stroke-foreground" strokeWidth="1.6" fill="none" />
      <text x="80" y="190" fontSize="9" textAnchor="middle" className="fill-foreground">wanders with hand and lead position</text>

      {/* right panel */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="220" y1="40" x2="220" y2="62" />
        <line x1="220" y1="72" x2="220" y2="96" />
        <path d="M220 40 H300 V110" />
        <path d="M220 96 H200 V110" />
      </g>
      <line x1="208" y1="62" x2="232" y2="62" className="stroke-foreground" strokeWidth="2.4" />
      <line x1="213" y1="72" x2="227" y2="72" className="stroke-foreground" strokeWidth="2.4" />
      <text x="236" y="70" fontSize="9" className="fill-foreground">9 V battery</text>
      <rect x="195" y="110" width="120" height="46" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="255" y="131" fontSize="14" textAnchor="middle" fontFamily="ui-monospace, monospace" className="fill-accent">9.214</text>
      <text x="255" y="148" fontSize="9" textAnchor="middle" className="fill-muted">V DC</text>
      <text x="255" y="176" fontSize="9" textAnchor="middle" className="fill-foreground">source holds the input:</text>
      <text x="255" y="188" fontSize="9" textAnchor="middle" className="fill-foreground">only the last digit may flicker</text>
    </svg>
  );
}

export default function UnstableMultimeterReadingsPage() {
  return (
    <HowToShell
      title="What Causes Unstable Multimeter Readings?"
      description={description}
      path="/multimeters/unstable-multimeter-readings"
      category="multimeters"
      published="2026-10-21"
      updated="2026-10-29"
      intro={
        <>
          A multimeter voltage reading fluctuates either because the measurement itself is unstable (a floating
          input, a loose probe, a weak meter battery, electrical noise or the meter hunting between ranges) or
          because the voltage really is changing, as it does on a PWM line, a rippling supply or a mains circuit
          under shifting load. Short the leads, then measure a steady known source: if the display settles,
          your meter is fine and the circuit is what&apos;s moving.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            A True RMS meter like the Fluke 117 handles genuinely fluctuating signals more predictably
            than a budget averaging meter. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "fluctuating-voltage", label: "Why the voltage display fluctuates" },
        { id: "two-categories", label: "Two categories of cause" },
        { id: "causes", label: "Causes at a glance" },
        { id: "floating", label: "Floating inputs and noise pickup" },
        { id: "checklist", label: "A quick elimination checklist" },
        { id: "step-zero", label: "1. Short the leads" },
        { id: "step-contact", label: "2. Check probe contact and leads" },
        { id: "step-battery", label: "3. Rule out the meter battery" },
        { id: "step-range", label: "4. Lock the range" },
        { id: "step-pwm", label: "5. Check for PWM and ripple" },
        { id: "step-real", label: "6. Confirm a real supply change" },
        { id: "meter-vs-scope-view", label: "Why a scope shows what a meter can't" },
        { id: "which-tool", label: "Tools for fluctuating signals" },
      ]}
      faq={[
        {
          q: "Why does my multimeter voltage reading fluctuate?",
          a: "Either the setup is unstable or the voltage is. A probe resting on nothing, a lead with a broken strand, a low meter battery, nearby motor drives or autoranging near a range boundary all make digits jump. PWM outputs, supply ripple and mains under changing load really do vary. Short the leads, then measure a fresh battery: a steady reading there points back at the circuit.",
        },
        {
          q: "Is it normal for household voltage to fluctuate on a multimeter?",
          a: "A small, slow drift is normal. A 120 V circuit commonly moves a volt or two as appliances cycle, and ANSI C84.1 Range A covers roughly 114 to 126 V at the service. Large swings, dips when a compressor starts, or readings outside that band are worth logging and, if they persist or lights dim sharply, reporting to your utility or an electrician.",
        },
        {
          q: "How can I tell if a reading is unstable because of a real signal versus a bad connection?",
          a: "Try a different, known-good test point with the same leads and meter — if readings are stable there, the problem is specific to the original point or circuit (likely a real fluctuating signal or a bad connection at that spot), not the meter itself. Wiggling the probes gently at the suspect connection while watching the display also reveals a loose-contact problem directly.",
        },
        {
          q: "Can a low multimeter battery actually cause wrong or unstable readings?",
          a: "Yes, particularly on resistance, continuity, diode test, and other modes that rely on the meter's own internal test current or active circuitry. A weak battery is a quick, often-overlooked thing to rule out — most meters show a low-battery indicator, but not always before accuracy is already affected.",
        },
        {
          q: "Why does my reading jump around near a round number, like hovering around 5V?",
          a: "On an auto-ranging meter, this can happen when the actual value sits right at a boundary between two measurement ranges, causing the meter to switch back and forth (\"hunt\") between them. Manually locking the range to the one you expect, if your meter supports it, usually stabilizes the display.",
        },
        {
          q: "Could nearby equipment actually be causing this?",
          a: "Yes — motors, variable-frequency drives, switching power supplies, and fluorescent or LED drivers all radiate electrical noise that test leads can pick up like small antennas, especially on sensitive, high-impedance measurements. Moving away from the equipment, shortening test leads, or testing at a different time can help confirm this as the cause.",
        },
        {
          q: "Does a True RMS meter give a steadier reading on a fluctuating AC signal?",
          a: "Not necessarily steadier, but more accurate on non-sinusoidal waveforms specifically — a True RMS meter calculates the actual effective value of a distorted AC signal (from a motor drive or dimmer, for example), where a non-True-RMS meter can show a reading that's both unstable and simply wrong. Either type will still show genuine fluctuation from a signal that's actually varying in amplitude over time.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "Logging a receptacle over time and judging the result against the normal service band.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-resistance-reading-keep-changing",
          title: "Why Does My Multimeter Resistance Reading Keep Changing?",
          desc: "Drifting ohms readings: contact pressure, temperature and charging capacitors.",
        },
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "A genuinely useful application of voltage measurement, for comparison against a suspect reading.",
        },
        {
          href: "/multimeters/how-to-use-a-multimeter",
          title: "How to Use a Multimeter",
          desc: "Every multimeter mode, from the beginning.",
        },
      ]}
    >
      <Callout title="Safety when chasing a fluctuating mains voltage">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Measure household voltage only at a receptacle, with a meter and leads rated CAT III for the voltage,
            the red lead in the V jack and fingers behind the probe guards. Don&apos;t hold probes in an outlet for
            minutes at a time; use properly rated accessories or a plug-in logger instead.
          </li>
          <li>
            Don&apos;t open panels, fixtures or meter bases to find the cause. Lights that dim sharply, flicker
            across several rooms or come with a warm or buzzing outlet point to a loose connection that needs a
            licensed electrician; call the utility for problems at the service, and 911 if anything smells hot or
            smokes.
          </li>
          <li>
            On batteries, a probe that slips and bridges terminals can cause a short. Remove rings and watches and
            keep tools clear of exposed posts.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="fluctuating-voltage" className="text-xl font-semibold mb-3">
          Why does my multimeter display fluctuating voltage?
        </h2>
        <p className="text-muted leading-7 mb-4">
          A digital meter takes a few readings per second and shows each one as it arrives, so anything that moves
          faster than you can read appears as jumping digits. The useful question is whether the movement is in
          the measurement or in the circuit. A setup problem usually shows up everywhere you measure, or only when
          you touch the leads. A real change shows up only on one circuit and often follows something you can
          see: a fan speeding up, a compressor starting, a dimmer moving.
        </p>
        <p className="text-muted leading-7 mb-4">
          The size of the movement is a clue too. On a 6,000-count meter such as the Fluke 115 or 117, the 6 V
          range shows millivolts and the 600 V range shows tenths of a volt. A flicker of one or two counts in the
          last digit is normal on any range, because the meter&apos;s converter resolves finer than the
          measurement is stable. That means a 120 V reading wandering between 120.1 and 120.3 V is a 0.2 V
          change, about 0.17% of the reading, and is nothing to chase. A reading that swings by volts, or by
          tens of percent, is.
        </p>
        <DataTable
          head={["Range on a 6,000-count meter", "One count is worth", "A 2-count flicker looks like"]}
          rows={[
            ["6 V", "0.001 V", "5.012 to 5.014 V"],
            ["60 V", "0.01 V", "12.61 to 12.63 V"],
            ["600 V", "0.1 V", "120.1 to 120.3 V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Resolution follows from the count: full scale divided by 6,000. Readings in the third column are
          illustrative.
        </p>
      </section>

      <section>
        <h2 id="two-categories" className="text-xl font-semibold mb-3">Two categories of cause</h2>
        <p className="text-muted leading-7 mb-5">
          Before chasing a fault, it helps to sort the possibilities into two groups: problems with the
          measurement setup itself, and a signal that&apos;s genuinely changing in the circuit you&apos;re
          testing.
        </p>
        <InfoCards
          items={[
            { label: "Measurement-side", desc: "Floating inputs, loose probes, worn leads, weak battery, electrical noise, autorange hunting." },
            { label: "Circuit-side (real)", desc: "A load switching, a PWM signal, a charging capacitor, ripple on a DC supply, mains under changing load." },
          ]}
        />
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Random millivolts to volts with one or both probes on nothing", "Floating input picking up hum", "Short the probes; reading should fall to zero", "Put both probes on two defined points"],
            ["Jumps when you move or flex the leads", "Loose probe contact, worn lead or broken strand", "Wiggle each lead while watching; try known-good leads", "Reseat, clean the point, replace damaged leads"],
            ["Unstable on every circuit, low-battery icon or dim display", "Weak meter battery", "Fit a fresh battery and re-measure a known source", "Replace the battery"],
            ["Flips between e.g. 5.998 and 6.00, resolution keeps changing", "Autoranging near a range boundary", "Watch the range annunciator or decimal point move", "Press RANGE to lock the higher range"],
            ["Wanders near motors, VFDs, chargers or LED drivers", "Electrical noise coupled into the leads", "Move or twist the leads; reading steadies", "Re-route leads; shorten them; measure with the noisy load off"],
            ["Odd, jittery DC reading on a motor, fan or LED control line", "PWM or another switching signal", "Measure AC volts on the same point; use a scope", "Read duty cycle on a scope, not a DC average"],
            ["DC rail reads right but moves, device resets", "Ripple or a supply sagging under load", "AC volts on the DC rail; Min/Max while it runs", "Check the supply under load; replace failing filter capacitors"],
            ["Mains reading drifts or dips when appliances start", "Real supply variation or a loose connection", "Log over time; compare outlets on other circuits", "Utility or a licensed electrician if outside normal limits"],
          ]}
        />
      </section>

      <section>
        <h2 id="floating" className="text-xl font-semibold mb-3">Floating inputs and noise pickup</h2>
        <p className="text-muted leading-7 mb-4">
          The single most common reason for a jumping voltage reading is a meter input that isn&apos;t connected
          to anything that can hold it steady. The voltage function of a typical digital meter has an input
          impedance of around 10 MΩ, which is what makes it gentle on the circuit under test. The flip side is
          that a lead hanging in the air, or a probe pressed against a wire that is itself disconnected, lets
          stray capacitance from nearby mains wiring, your hand and the room set the reading. Move your hand and
          the number moves with it.
        </p>
        <Figure
          caption={
            <>
              Simplified view, illustrative readings. A floating lead takes its voltage from stray coupling and
              wanders; a real source connected across both probes overrides that coupling and the reading settles.
            </>
          }
        >
          <FloatingInputDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The same effect at full scale is the ghost voltage people see on switched-off house wiring, which has its
          own page:{" "}
          <Link
            href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit"
            className={link}
          >
            why a multimeter shows voltage on a disconnected circuit
          </Link>
          . On electronics with no earth reference, such as a battery-powered board on the bench, the related
          problem is measuring against the wrong reference point, covered in{" "}
          <Link href="/multimeters/how-to-measure-voltage-on-a-floating-ground-circuit" className={link}>
            how to measure voltage on a floating ground circuit
          </Link>
          . Noise from motor drives, switching chargers and LED drivers is the same mechanism with a stronger
          source: the leads act as a small antenna, and the effect is worst on low ranges and high-impedance
          circuits.
        </p>
      </section>

      <section>
        <h2 id="checklist" className="text-xl font-semibold mb-3">A quick elimination checklist</h2>
        <FlowDiagram
          steps={[
            { label: "Short the leads", sub: "Should read zero" },
            { label: "Check probe contact", sub: "Wiggle leads, firm contact" },
            { label: "Check battery level", sub: "Weak battery affects active modes" },
            { label: "Lock the range", sub: "Stop autorange hunting" },
            { label: "Rule out real fluctuation", sub: "Is the circuit actually varying?" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-zero">Short the leads and measure a steady source</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set DC volts and touch the probe tips firmly together. The display should drop to zero or within a count
          or two of it. Then measure a fresh AA or 9 V battery, which is about as steady a source as you&apos;ll
          find. If both readings are stable, the meter, its battery and its leads are working, and everything that
          follows is about the circuit or the connection to it. If the reading jumps even across a battery, the
          problem travels with the meter, so go to steps 2 and 3.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-contact">Check probe contact and the leads</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A probe resting lightly on an oxidized terminal or a painted chassis makes contact through a film that
          comes and goes as you breathe. Press the tip in firmly, scrape through the oxide if it&apos;s safe to do
          so, or use a clip lead on low-voltage work so your hand isn&apos;t part of the measurement. Then flex each
          lead along its length, especially near the plugs and probe handles where strands fatigue. A reading that
          jumps or drops out as you bend one spot means a broken conductor inside the insulation; replace the lead
          set rather than trusting it on a live circuit.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-battery">Rule out the meter&apos;s own battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          As the battery runs down, the meter&apos;s reference and converter can stop behaving, and readings may
          wander or creep before the low-battery symbol appears on some models. It&apos;s the cheapest check on this
          page: fit a fresh cell and repeat step 1. If you store the meter for months between uses, take the
          battery out, since a leaking cell can corrode the contacts and produce exactly this symptom.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-range">Lock the range</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An autoranging meter moves up a range when the reading passes the top of the current one and back down
          when it falls well below it. On a 6,000-count meter the top of the 6 V range is 5.999 V, so a supply
          sitting near 6.0 V with a few millivolts of noise can make the meter switch between 5.998 on one range
          and 6.00 on the next, changing resolution each time. It looks like fluctuation, but the voltage barely
          moved. Press RANGE to step to the higher range and hold it there; the display steadies at the cost of one
          digit of resolution. The exact switching points vary by model, so the manual is the reference.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: the same 6 V rail read on the 6 V range.</>}>
            <MeterReadout value="5.998" unit="V DC" mode="auto, 6 V range" />
          </Figure>
          <Figure caption={<>Illustrative: a moment later after the meter autoranged up.</>}>
            <MeterReadout value="6.00" unit="V DC" mode="auto, 60 V range" />
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={5} id="step-pwm">Check for PWM and ripple</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many outputs that look like DC are switched on and off thousands of times per second. A fan controller,
          LED dimmer or motor driver varies the duty cycle, and a meter on DC volts shows roughly the average:
          supply voltage times duty cycle. As the controller adjusts the duty, the average moves, and if the
          meter&apos;s sampling beats against the switching frequency the digits can jitter even at a fixed duty.
          The chart shows the average you&apos;d expect on a 12 V PWM line at different duty cycles.
        </p>
        <BarChart
          items={[
            { label: "10% duty", value: 1.2, display: "1.2 V" },
            { label: "25% duty", value: 3, display: "3.0 V" },
            { label: "50% duty", value: 6, display: "6.0 V", highlight: true },
            { label: "75% duty", value: 9, display: "9.0 V" },
            { label: "90% duty", value: 10.8, display: "10.8 V" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 mb-4 text-sm">
          Calculated: average = 12 V × duty cycle, for an ideal square wave. Real meter readings depend on the
          meter&apos;s filtering and the switching frequency.
        </p>
        <p className="text-muted leading-7">
          Ripple on a DC supply behaves similarly. Switch to AC volts on the same rail as a quick screen; a large
          AC reading on a DC rail means the supply is struggling. To see what&apos;s really happening, measure the
          signal on an oscilloscope, as described in{" "}
          <Link href="/oscilloscopes/how-to-measure-pwm-duty-cycle-with-an-oscilloscope" className={link}>
            how to measure PWM duty cycle
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/how-to-measure-ripple-voltage-with-an-oscilloscope" className={link}>
            how to measure ripple voltage
          </Link>
          . If the rail looks right but the device still misbehaves, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-normal-voltage-but-circuit-doesnt-work" className={link}>
            why a multimeter shows normal voltage when the circuit doesn&apos;t work
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="step-real">Confirm a real supply change</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the meter is steady on a battery and the wobble remains on one circuit, the voltage is genuinely
          moving. Use Min/Max recording if your meter has it and leave it connected while the suspect load
          cycles. On a 120 V household circuit, ANSI C84.1 Range A puts normal service voltage at roughly 114 to
          126 V, so a reading that drifts by a volt or two inside that band as appliances switch on and off is
          ordinary. Dips well below it when a refrigerator or air conditioner starts, or a reading that differs a
          lot between outlets on different circuits, point to a weak connection or an overloaded supply.
        </p>
        <p className="text-muted leading-7">
          The full procedure for logging a home supply is in{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            how to check for voltage fluctuations in your home
          </Link>
          , and the motor-start case is covered in{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            why lights flicker when the refrigerator or AC starts
          </Link>
          . On batteries the same rule applies: a 12 V battery that steps down each time a load comes on is
          reporting its internal resistance, not a meter fault. This page deals with voltage; if it&apos;s your
          ohms reading that won&apos;t settle, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-resistance-reading-keep-changing" className={link}>
            why a multimeter resistance reading keeps changing
          </Link>
          .
        </p>
      </section>

      <KeyIdea title="Prove the meter, then believe the circuit">
        A shorted-lead zero and a steady reading on a fresh battery take thirty seconds and split the problem in
        half. If the meter passes, a fluctuating voltage is information about the circuit: something is
        switching, rippling or sagging, and the next step is finding out what.
      </KeyIdea>

      <section id="meter-vs-scope-view">
        <h2 className="text-xl font-semibold mb-3">Why a scope shows what a meter can&apos;t</h2>
        <p className="text-muted leading-7 mb-4">
          A multimeter boils a changing signal down to one number per update (often several updates a
          second), which is exactly why a genuinely fluctuating signal looks like &quot;instability&quot;
          on its display — there&apos;s no way to show the signal&apos;s actual shape in a single digit
          readout. An oscilloscope instead draws the full waveform over time, turning what looked like a
          flickering, hard-to-pin-down number into a clearly visible, explainable shape. Our{" "}
          <Link href="/oscilloscopes/oscilloscope-vs-multimeter" className={link}>
            oscilloscope vs multimeter
          </Link>{" "}
          guide covers when that switch is worth making.
        </p>
        <Figure
          caption={
            <>
              The same fluctuating signal: a multimeter can only show one changing number at a time
              (left), while an oscilloscope draws the actual waveform shape behind that number (right).
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Comparison of a multimeter's single fluctuating number versus an oscilloscope's full waveform view of the same signal">
            <g>
              <rect x="20" y="30" width="100" height="50" rx="6" className="fill-none stroke-foreground" strokeWidth="1.6" />
              <text x="70" y="60" fontSize="18" textAnchor="middle" fontFamily="ui-monospace, monospace" className="fill-accent">4.87</text>
              <text x="70" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Multimeter: one jumping number</text>
            </g>
            <g>
              <rect x="170" y="30" width="110" height="50" rx="4" className="fill-[#0f1a14]" />
              <polyline
                fill="none"
                stroke="#7CFC9A"
                strokeWidth="1.8"
                points={Array.from({ length: 61 }, (_, i) => `${(170 + i * 1.8).toFixed(1)},${(55 - 18 * Math.sin((i / 60) * 3 * Math.PI)).toFixed(1)}`).join(" ")}
              />
              <text x="225" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Oscilloscope: the actual shape</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="which-tool" className="text-xl font-semibold mb-3">Tools that make a wandering reading easier to read</h2>
        <p className="text-muted leading-7 mb-6">
          If the cause turns out to be a real, varying signal, the instrument decides how much you can learn
          from it. A True RMS meter gives a meaningful number on distorted AC, an analog bar graph lets you
          watch a drifting value without squinting at flickering digits, and a scope shows the shape behind
          the number. Compare more options in our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Picks for fluctuating signals"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, so a distorted AC waveform reads as its real effective value. Hands-on Tested.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "32-segment analog bar graph shows a drifting value at a glance. Hands-on Tested.",
            },
            {
              name: "Rigol DS1054Z",
              image: rigol.image,
              alt: "Rigol DS1054Z four-channel digital oscilloscope",
              href: "/oscilloscopes/rigol-ds1054z-review",
              note: "Draws the ripple, PWM or switching pattern a meter can only average. Hands-on Tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
