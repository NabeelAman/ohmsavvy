import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, HowToShell, KeyIdea, ProductStrip, ScopeScreen, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

const description =
  "Oscilloscope channel not detecting a signal while another works? Swap probes to isolate it, compare settings, test the probe, and know when to repair.";

export const metadata = buildMetadata({
  title: "Oscilloscope Channel Not Detecting a Signal?",
  description,
  path: "/oscilloscopes/why-is-there-no-signal-on-one-oscilloscope-channel",
});

const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const sds1104 = picks.find((p) => p.name === "Siglent SDS1104X-E")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

const link = "text-accent hover:underline";

/** Multimeter checks on a passive probe: tip to BNC center pin, and ground clip to BNC shell. */
function ProbeContinuityDiagram() {
  return (
    <svg
      viewBox="0 0 440 236"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of testing a passive oscilloscope probe with a multimeter on its resistance range. Test 1 runs from the probe tip to the BNC center pin and reads about 9 megohms on a 10x probe or a low value on 1x. Test 2 runs from the ground clip to the BNC outer shell and should read close to zero ohms. OL on either test means an open circuit inside the probe."
    >
      {/* probe head */}
      <circle cx="26" cy="60" r="4" className="fill-accent" />
      <line x1="30" y1="60" x2="44" y2="60" className="stroke-foreground" strokeWidth="2" />
      <rect x="44" y="51" width="70" height="18" rx="7" className="fill-muted" />
      <text x="79" y="44" fontSize="9" textAnchor="middle" className="fill-foreground">probe head</text>
      {/* cable */}
      <path d="M114 60 C170 60 200 30 250 40 S 320 60 340 60" fill="none" className="stroke-foreground" strokeWidth="2.4" />
      <text x="230" y="26" fontSize="9" textAnchor="middle" className="fill-muted">cable (fine center wire)</text>
      {/* BNC */}
      <rect x="340" y="46" width="44" height="28" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <circle cx="396" cy="60" r="3.5" className="fill-foreground" />
      <line x1="384" y1="60" x2="393" y2="60" className="stroke-foreground" strokeWidth="1.4" />
      <text x="362" y="90" fontSize="9" textAnchor="middle" className="fill-foreground">BNC shell</text>
      <text x="408" y="48" fontSize="9" textAnchor="middle" className="fill-foreground">pin</text>
      {/* ground lead */}
      <path d="M100 69 C104 92 96 104 82 112" fill="none" className="stroke-foreground" strokeWidth="1.6" />
      <rect x="66" y="110" width="22" height="10" rx="2" className="fill-muted" />
      <text x="58" y="134" fontSize="9" className="fill-foreground">ground clip</text>
      {/* meter */}
      <rect x="176" y="120" width="88" height="64" rx="8" className="fill-surface stroke-accent" strokeWidth="1.8" />
      <rect x="186" y="128" width="68" height="24" rx="3" fill="#c9d4b8" />
      <text x="248" y="146" fontSize="13" textAnchor="end" fill="#1a1d21" fontFamily="ui-monospace, monospace">9.0 MΩ</text>
      <text x="220" y="174" fontSize="9" textAnchor="middle" className="fill-muted">meter on Ω</text>
      {/* test 1 leads */}
      <path d="M196 184 C150 210 40 200 26 66" fill="none" className="stroke-accent" strokeWidth="1.6" />
      <path d="M244 184 C300 210 400 190 396 66" fill="none" className="stroke-accent" strokeWidth="1.6" />
      {/* test 2 */}
      <path d="M88 116 C180 108 300 108 350 78" fill="none" className="stroke-foreground" strokeWidth="1.4" strokeDasharray="5 4" />
      <text x="214" y="104" fontSize="9" textAnchor="middle" className="fill-foreground">Test 2: clip to shell, near 0 Ω</text>
      <text x="220" y="228" fontSize="9.5" textAnchor="middle" className="fill-accent">
        Test 1: tip to pin. 10x ≈ 9 MΩ; 1x low; OL = broken
      </text>
    </svg>
  );
}

export default function WhyIsThereNoSignalOnOneOscilloscopeChannelPage() {
  return (
    <HowToShell
      title="Why Is There No Signal on One Oscilloscope Channel?"
      description={description}
      path="/oscilloscopes/why-is-there-no-signal-on-one-oscilloscope-channel"
      category="oscilloscopes"
      published="2026-10-29"
      intro={
        <>
          When one oscilloscope channel shows no signal while another works, the cause is almost always a
          setting that differs between the two channels or a faulty probe, and only occasionally a damaged input.
          Swap the probes between the working and silent channels: if the fault follows the probe, replace the
          probe; if it stays with the channel, compare that channel&apos;s settings, then test its hardware. The
          swap test takes a minute and tells you which half of the problem to chase, and the steps below take you
          from there to a fix or a clear decision to send the scope for service.
        </>
      }
      aside={{
        image: ds1054z.image,
        alt: "Rigol DS1054Z four-channel oscilloscope with four BNC channel inputs",
        caption: (
          <>
            A four-channel scope makes the swap test easy, because there are always known-good inputs to compare.
            See our{" "}
            <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
              Rigol DS1054Z review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "one-channel", label: "Why one channel is easier than none" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "step-swap", label: "1. Swap probes and channels" },
        { id: "step-on", label: "2. Check the channel is on and visible" },
        { id: "step-settings", label: "3. Compare the channel settings" },
        { id: "step-trigger", label: "4. Rule out the trigger confusion" },
        { id: "step-probe", label: "5. Test the probe with a multimeter" },
        { id: "step-front-end", label: "6. Check for a damaged input" },
        { id: "step-selfcal", label: "7. Run self-calibration" },
        { id: "step-service", label: "8. Decide whether to send it for service" },
      ]}
      faq={[
        {
          q: "Why does channel 2 on my oscilloscope not work when channel 1 does?",
          a: "Usually CH2 is switched off, set to ground coupling, at a very different volts/div or offset, or set to the wrong probe ratio, or its probe is faulty. Move CH1's probe to CH2 and probe the calibration output. If a waveform appears, the old CH2 probe is bad. If not, restore the default setup and try again before suspecting the hardware.",
        },
        {
          q: "How do I test an oscilloscope probe with a multimeter?",
          a: "Unplug the probe and set the meter to resistance. Measure from the tip to the BNC center pin: a 10x probe typically reads close to 9 MΩ, and a 1x setting reads low. Then measure from the ground clip to the BNC shell, which should be close to zero ohms. OL on either test, or a reading that jumps when you flex the cable, means a broken conductor.",
        },
        {
          q: "Can too much voltage damage just one oscilloscope channel?",
          a: "Yes. Each channel has its own attenuator, protection parts and amplifier, so an overvoltage on one input can damage that channel and leave the others working. Typical signs are a trace stuck at the top or bottom, an offset that will not zero, a much smaller calibration signal than the other channels, or one volts/div range that shows nothing while the rest work.",
        },
        {
          q: "Will self-calibration fix a dead oscilloscope channel?",
          a: "No. Self-calibration measures and corrects small gain and offset errors in working circuitry, so it can tidy a channel that reads slightly high or off-center. It cannot repair a burned resistor, a failed relay or a damaged amplifier. If a channel fails self-calibration, or still reads wrong afterward, treat that as evidence of a hardware fault and contact the maker or a repair service.",
        },
        {
          q: "Why does my second channel only update when the first one has a signal?",
          a: "The trigger is probably set to CH1 in Normal mode. The scope draws every channel only when the trigger channel produces a valid event, so with nothing on CH1, CH2 freezes or stays blank even though its own signal is fine. Set the trigger source to CH2, or switch to Auto, and the second trace will update normally.",
        },
        {
          q: "Do I need to recompensate a probe when I move it to another channel?",
          a: "Yes, ideally. Each channel's input capacitance differs slightly, and probe compensation matches the probe to one particular input. After moving a 10x probe to a different channel, connect it to the calibration output and check the square wave's corners. Adjust the trimmer if they are rounded or peaked. It takes a minute and keeps edges and amplitudes accurate on the new channel.",
        },
      ]}
      next={[
        {
          href: "/oscilloscopes/why-does-my-oscilloscope-show-a-flat-line",
          title: "Why Does My Oscilloscope Show a Flat Line?",
          desc: "When every channel is flat, not just one.",
        },
        {
          href: "/oscilloscopes/how-to-compensate-an-oscilloscope-probe",
          title: "How to Compensate an Oscilloscope Probe",
          desc: "Match a probe to its channel after swapping it.",
        },
        {
          href: "/oscilloscopes/why-is-my-oscilloscope-trigger-not-working",
          title: "Why Is My Oscilloscope Trigger Not Working?",
          desc: "When the scope sits on Wait and never captures.",
        },
        {
          href: "/oscilloscopes/why-does-my-oscilloscope-waveform-look-distorted",
          title: "Why Does My Oscilloscope Waveform Look Distorted?",
          desc: "When the signal is there but its shape is wrong.",
        },
      ]}
    >
      <section id="one-channel">
        <h2 className="text-xl font-semibold mb-3">Why one channel is easier than none</h2>
        <p className="text-muted leading-7 mb-4">
          A scope that shows nothing on every channel could be wrong in a dozen places, which is why{" "}
          <Link href="/oscilloscopes/why-does-my-oscilloscope-show-a-flat-line" className={link}>
            the all-channels flat line
          </Link>{" "}
          has its own checklist. One silent channel next to a working one is a much better position to be in. The
          working channel proves the scope powers up, acquires and displays, and that your circuit really does have
          a signal on it. The fault must be in the few things that are unique to the silent channel: its settings,
          its probe, or its own input circuitry. Comparing the good channel with the bad one, piece by piece, finds
          it quickly.
        </p>
        <Figure caption="CH1 (green) shows a 1 kHz square wave while CH2 (blue), connected to the same point, draws a flat line. Everything shared by both channels is working; the fault is in CH2's settings, probe or input. Illustrative screen.">
          <ScopeScreen
            wave="square"
            cycles={3}
            amplitude={1.5}
            offset={1.5}
            second={{ wave: "flat", offset: -2, label: "CH2" }}
            labels={{ left: "CH1 1 V/div · CH2 1 V/div", right: "200 µs/div" }}
          />
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["No CH2 trace or label at all", "Channel off or hidden", "Look for a lit channel button and the channel label", "Turn the channel on"],
            ["CH2 flat line at its marker", "Ground coupling, or volts/div far too large", "Compare coupling and V/div with CH1", "DC coupling; match CH1's V/div"],
            ["Only an edge arrow for CH2", "Offset or position pushed it off-screen", "Read the offset value in the channel menu", "Zero the offset"],
            ["CH2 ten times too small", "Probe ratio set to 1x with a 10x probe", "Compare the channel menu with the probe switch", "Match the ratio"],
            ["CH2 frozen when CH1 is idle", "Trigger source is CH1 in Normal mode", "Read the trigger readout", "Trigger on CH2, or use Auto"],
            ["Fault moves with the probe", "Broken probe tip, cable or ground", "Meter the probe: tip to pin, clip to shell", "Replace the probe"],
            ["Fault stays on the channel, any probe", "Damaged BNC or front end", "Calibration output on each channel at the same settings", "Self-calibrate, then service"],
            ["One V/div range dead, others fine", "Failed attenuator relay or path", "Step through every V/div setting on the calibration output", "Service"],
            ["Self-calibration fails on one channel", "Hardware fault in that channel", "Read the self-calibration result", "Contact the maker or a repair service"],
          ]}
        />
      </section>

      <section id="step-swap">
        <StepHeading n={1}>Swap probes and channels to isolate the fault</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Use the scope&apos;s calibration output as the signal, because it is always present and you know what it
          should look like; it is often a square wave of around 3 V at 1 kHz, with the exact values printed beside
          the terminal. Then run the four combinations below. Each takes seconds and between them they point
          clearly at either the probe or the channel.
        </p>
        <Figure caption="Decision path for a single silent channel. Stop at the first step that brings the trace back.">
          <FlowDiagram
            steps={[
              { label: "Default setup", sub: "Rules out any odd setting at once" },
              { label: "Good probe → bad channel", sub: "Trace appears? The old probe is faulty" },
              { label: "Bad probe → good channel", sub: "Still flat? Confirms the probe" },
              { label: "Good probe, still flat", sub: "Channel fault: settings, then hardware" },
              { label: "Self-cal, then service", sub: "Fails or stays dead? Send it in" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Probe A on CH1", "Probe B on CH1", "Probe A on CH2", "Probe B on CH2", "Verdict"]}
            rows={[
              ["Works", "Flat", "Works", "Flat", "Probe B is faulty"],
              ["Works", "Works", "Flat", "Flat", "CH2 settings or CH2 hardware"],
              ["Works", "Works", "Works", "Works", "Intermittent: a loose BNC or circuit connection"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Before running the swap, save your setup if it took effort to build, then use the Default Setup button.
          It returns every channel to identical settings in one press, which removes the most common cause before
          you start. If the trace returns after a default setup, the problem was a setting, and step 3 shows which
          ones to look at next time.
        </p>
      </section>

      <section id="step-on">
        <StepHeading n={2}>Check the channel is on and visible</StepHeading>
        <p className="text-muted leading-7">
          On most scopes, each channel button lights in that channel&apos;s color when it is on, and the screen shows
          a numbered marker at the left edge for each active trace. A channel that is off draws nothing at all, and
          on some models Autoset switches off channels where it finds no signal, so a probe added afterward stays
          invisible. Also check that the trace isn&apos;t hiding behind another one: two channels at the same
          position, volts/div and signal draw directly on top of each other, and only the trace drawn last is
          visible. Nudge the position of each channel apart to see both.
        </p>
      </section>

      <section id="step-settings">
        <StepHeading n={3}>Compare the silent channel&apos;s settings with the working one</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Each channel has its own vertical menu, and it is easy to change one and forget. Open both menus and go
          down them line by line. The table shows how each setting can make a perfectly good signal look absent on
          one channel only. Where your scope has a copy or apply-to-all function for channel settings, use it; if
          not, the default setup does the same job.
        </p>
        <DataTable
          head={["Setting", "Working CH1", "Silent CH2 (example)", "What it does to a 1 V signal"]}
          rows={[
            ["Volts/div", "500 mV/div", "10 V/div", "1 ÷ 10 = 0.1 div tall, looks flat"],
            ["Offset", "0 V", "+3 V at 500 mV/div", "3 ÷ 0.5 = 6 div up, past the 4-div top edge"],
            ["Coupling", "DC", "GND", "Input disconnected, flat line by design"],
            ["Probe ratio", "10x", "1x (10x probe fitted)", "Drawn as 0.1 V, ten times too small"],
            ["Bandwidth limit", "Off", "20 MHz on", "Fast edges shrink and round off"],
            ["Invert", "Off", "On", "Trace flipped upside down, not missing"],
            ["Input impedance", "1 MΩ", "50 Ω", "High-impedance source loaded to a few millivolts"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The offset row catches many people. The screen is eight divisions tall, so at 500 mV/div it shows only
          ±2 V around the center line; an offset of 3 V puts the trace six divisions up, well outside it, and all
          you see is a small arrow at the edge. The bandwidth limit does not normally make a trace vanish, but a
          single-pole 20 MHz limit passes only about 1 ÷ √(1 + 2.5²) ≈ 37% of a 50 MHz sine, which can make a fast
          clock look like a weak, rounded copy of the same clock on CH1. Invert never hides a trace; it only
          flips it, which can look like a different signal. If CH2 is set to a 50 Ω input, which not every scope
          offers, switch it back to 1 MΩ for passive probes.
        </p>
      </section>

      <section id="step-trigger">
        <StepHeading n={4}>Rule out the trigger-channel confusion</StepHeading>
        <p className="text-muted leading-7">
          The trigger source never hides a trace, but it can make one channel look dead. In Normal mode the scope
          redraws every channel only when the trigger source produces a valid event. With the source on CH1 and
          nothing connected there, CH2 freezes on an old capture or stays blank, even though its own signal is
          perfectly healthy. The reverse also happens: the trigger works and CH1 is stable, but CH2 carries an
          unrelated signal, so it drifts on screen while CH1 holds still. Set the trigger source to the channel
          you care about, or use Auto while diagnosing. If the trigger itself refuses to fire on any channel,
          the fixes are in{" "}
          <Link href="/oscilloscopes/why-is-my-oscilloscope-trigger-not-working" className={link}>
            why an oscilloscope trigger is not working
          </Link>
          .
        </p>
      </section>

      <section id="step-probe">
        <StepHeading n={5}>Test the probe with a multimeter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the fault follows the probe, confirm it with a meter before throwing the probe away. Unplug it from
          the scope and set the meter to resistance. Measure from the probe tip to the BNC center pin; a
          BNC-to-banana adapter makes the center pin easy to reach. A 10x passive probe typically reads close to
          9 MΩ, because a 9 MΩ resistor in the probe forms the 10:1 divider with the scope&apos;s 1 MΩ input. Expect a
          few percent either way, and check that your meter has a range that goes above 9 MΩ. On a switchable
          probe set to 1x, the reading should be low; many probes use a resistive center wire, so a few ohms up
          to a few hundred ohms is normal, but OL is not.
        </p>
        <Figure caption="Two meter checks on a passive probe. Readings are typical values; check the probe's own specification where the maker publishes one.">
          <ProbeContinuityDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Next, measure from the ground clip to the BNC outer shell, which should read close to zero, typically
          well under 1 Ω. Repeat both tests while gently flexing the cable near the probe head and near the BNC,
          where the fine center conductor usually breaks; a reading that jumps to OL as you flex is a broken wire.
          Also look at the tip itself, since a bent or snapped tip can leave the hook clip sliding on plastic.
        </p>
        <BarChart
          log
          items={[
            { label: "10x, tip to pin", value: 9_000_000, display: "≈ 9 MΩ", highlight: true },
            { label: "1x, tip to pin", value: 300, display: "a few Ω to a few hundred Ω" },
            { label: "Ground clip to shell", value: 0.5, display: "< 1 Ω" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The chart shows how far apart the healthy readings are, which is why the test is so decisive: a 10x
          probe reading OL, or a ground path reading thousands of ohms, cannot be mistaken for a good one. A probe
          that passes both tests but still misbehaves may only need compensating to its new channel, as described
          in{" "}
          <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
            how to compensate an oscilloscope probe
          </Link>
          . Correct connection habits are in{" "}
          <Link href="/oscilloscopes/how-to-connect-an-oscilloscope-probe-correctly" className={link}>
            how to connect an oscilloscope probe correctly
          </Link>
          .
        </p>
      </section>

      <section id="step-front-end">
        <StepHeading n={6}>Check for a damaged BNC or front end</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If a known-good probe still shows nothing on one channel at default settings, look at the hardware.
          Start with the BNC socket: a loose socket that wobbles, or a bayonet that no longer locks, can break the
          center or ground connection inside. Then think back to whether that input ever saw too much voltage.
          Each channel has its own attenuator, protection components and amplifier, so a single overvoltage event
          can kill one channel and spare the rest. Bench scope inputs are typically rated for a few hundred volts at
          1 MΩ and much less on a 50 Ω input; the exact figure is printed next to the BNC and in the manual.
          Remember that a 1x probe passes the full voltage to the input, while a 10x probe divides it by ten.
        </p>
        <p className="text-muted leading-7">
          Probe the calibration output on each channel in turn at identical settings and compare. Typical signs of
          a damaged front end are a trace stuck at the top or bottom of the screen whatever the position, an
          offset that won&apos;t return to zero, a calibration signal much smaller than the other channels show,
          a baseline far noisier than its neighbors, or one or two volts/div settings that show nothing while the
          rest work. That last one points at a failed attenuator relay; on many scopes you can hear these relays
          click as you turn the volts/div knob, and a channel that goes silent at the same settings every time
          has a fault in that path.
        </p>
      </section>

      <section id="step-selfcal">
        <StepHeading n={7}>Run self-calibration</StepHeading>
        <p className="text-muted leading-7">
          Most digital scopes have a self-calibration routine in the utility or system menu. It measures each
          channel&apos;s internal offset and gain and stores corrections, which can cure a channel that reads
          slightly off-center or slightly low after a temperature change or a firmware update. Follow the manual:
          typically you warm the scope up for around 20 to 30 minutes, disconnect everything from the inputs, and
          let the routine run for several minutes without touching anything. What self-calibration cannot do is
          repair a damaged part. If it reports a failure on one channel, or completes but the channel still shows
          no calibration signal, you have strong evidence of a hardware fault and should stop trying settings.
        </p>
      </section>

      <section id="step-service">
        <StepHeading n={8}>Decide whether to send it for service</StepHeading>
        <p className="text-muted leading-7">
          Send the scope for service when a known-good probe shows nothing on one channel after a default setup,
          when self-calibration fails on that channel, or when the front end shows the damage signs in step 6. If
          the scope is under warranty, contact the maker before opening it, since opening the case can affect
          coverage and the power supply inside holds hazardous voltages. Out of warranty, weigh the repair quote
          against the scope&apos;s value: on an entry-level model a front-end repair can approach the price of a
          new unit. On a four-channel scope you can usually keep working with the remaining inputs in the meantime;
          label the faulty one so nobody trusts its readings.
        </p>
      </section>

      <Callout title="Safety: overvoltage, mains, and shared ground clips">
        A single overvoltage event is a common way to lose one channel, so check every input&apos;s rating and the
        probe&apos;s CAT rating before connecting to anything above low-voltage electronics. On a bench scope, the
        ground clips of all channels are connected together and bonded to mains earth through the power cord.
        Clipping any of them to a mains-referenced point, such as the primary side of a non-isolated power supply,
        creates a short through the scope, and clipping CH1&apos;s and CH2&apos;s grounds to two different points
        shorts those points together. For mains or high-voltage work use a rated differential probe or an
        isolated-channel scope, never defeat the scope&apos;s earth, and call a qualified electrician for anything
        on building wiring.
      </Callout>

      <section>
        <KeyIdea title="In short">
          Default setup first, then swap probes. If the fault follows the probe, meter it: about 9 MΩ tip to pin
          on 10x and near 0 Ω clip to shell, with no OL when you flex the cable. If it stays with the channel,
          compare volts/div, offset, coupling, probe ratio and bandwidth limit with the working channel. A channel
          that fails self-calibration, or stays silent with a good probe at default settings, needs service.
        </KeyIdea>
      </section>

      <section>
        <p className="text-muted leading-7 mb-4">
          A four-channel scope gives you spare inputs for the swap test and keeps you working if one channel ever
          needs repair. All three below have four channels; compare them in our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            best beginner oscilloscopes
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Four-channel scopes in our reviews"
          items={[
            { name: ds1054z.name, image: ds1054z.image, alt: "Rigol DS1054Z four-channel 50MHz oscilloscope", href: "/oscilloscopes/rigol-ds1054z-review", note: "Hands-on tested. 50MHz, 4 channels, 1 GSa/s and a large 7-inch display." },
            { name: sds1104.name, image: sds1104.image, alt: "Siglent SDS1104X-E four-channel 100MHz oscilloscope", href: "/oscilloscopes/siglent-sds1104x-e-review", note: "Hands-on tested. 100MHz, 4 channels, 1 GSa/s, with a well-regarded UI." },
            { name: dho804.name, image: dho804.image, alt: "Rigol DHO804 four-channel 12-bit touchscreen oscilloscope", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e", note: "Hands-on tested. 70MHz, 4 channels, 12-bit, USB-C powered." },
          ]}
        />
      </section>
    </HowToShell>
  );
}
