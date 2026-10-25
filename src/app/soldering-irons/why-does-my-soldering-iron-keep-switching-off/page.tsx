import Link from "next/link";
import { Callout, DataTable, Figure, FlowDiagram, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "A soldering iron that keeps switching off is usually a sleep or auto-off timer, a weak USB-C supply, or a loose connection. How to tell which, and fix it.";

export const metadata = buildMetadata({
  title: "Why Does My Soldering Iron Keep Switching Off?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-keep-switching-off",
});

const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

/** Power path from supply to tip, with the places an iron can lose power or shut itself down. */
function PowerPathDiagram() {
  const boxes = [
    { x: 8, label: "Supply", sub: "Outlet, charger" },
    { x: 118, label: "Cable", sub: "Cord, plug" },
    { x: 228, label: "Controller", sub: "Station or MCU" },
    { x: 338, label: "Heater", sub: "Element + sensor" },
  ];
  const faults = [
    { x: 53, text: "Trip, PD reset" },
    { x: 163, text: "Broken strand" },
    { x: 273, text: "Timer, cutoff" },
    { x: 383, text: "Open sensor" },
  ];
  return (
    <svg
      viewBox="0 0 440 190"
      className="w-full h-auto"
      role="img"
      aria-label="Power path of a soldering iron: supply, cable, controller and heater in a row, with a failure point under each: a tripped power strip or USB-C negotiation reset at the supply, a broken strand in the cable, a timer or protection cutoff in the controller, and an open sensor at the heater"
    >
      <defs>
        <marker id="pp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" className="fill-foreground" />
        </marker>
      </defs>
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="30" width="90" height="56" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
          <text x={b.x + 45} y="54" fontSize="13" fontWeight="600" textAnchor="middle" className="fill-foreground">{b.label}</text>
          <text x={b.x + 45} y="72" fontSize="10" textAnchor="middle" className="fill-muted">{b.sub}</text>
        </g>
      ))}
      {[98, 208, 318].map((x) => (
        <line key={x} x1={x} y1="58" x2={x + 19} y2="58" className="stroke-foreground" strokeWidth="1.6" markerEnd="url(#pp-arrow)" />
      ))}
      {faults.map((f) => (
        <g key={f.text}>
          <line x1={f.x} y1="88" x2={f.x} y2="122" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 3" />
          <path d={`M${f.x - 9} 124 L${f.x + 9} 142 M${f.x + 9} 124 L${f.x - 9} 142`} className="stroke-accent" strokeWidth="2.4" strokeLinecap="round" />
          <text x={f.x} y="162" fontSize="10" textAnchor="middle" className="fill-foreground">{f.text}</text>
        </g>
      ))}
      <text x="220" y="16" fontSize="11" textAnchor="middle" className="fill-muted">Power flows left to right; an X marks where it can stop</text>
    </svg>
  );
}

/** Timeline of a typical idle sequence on a station or smart iron that has sleep and auto-off. */
function IdleTimelineDiagram() {
  return (
    <svg
      viewBox="0 0 440 180"
      className="w-full h-auto"
      role="img"
      aria-label="Illustrative timeline of tip temperature while an iron sits idle: it holds the working temperature, drops to a lower standby temperature after the sleep delay, then falls to room temperature when the auto-off timer ends. Picking the iron up during standby returns it to working temperature; after auto-off it must be switched on again"
    >
      <line x1="40" y1="140" x2="425" y2="140" className="stroke-foreground" strokeWidth="1.2" />
      <line x1="40" y1="20" x2="40" y2="140" className="stroke-foreground" strokeWidth="1.2" />
      <text x="425" y="158" fontSize="10" textAnchor="end" className="fill-muted">time idle</text>
      <text x="14" y="80" fontSize="10" textAnchor="middle" transform="rotate(-90 14 80)" className="fill-muted">tip temp</text>
      <path
        d="M40 40 L150 40 C165 40 170 85 185 85 L300 85 C315 85 320 135 340 136 L425 137"
        fill="none"
        className="stroke-accent"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <line x1="150" y1="30" x2="150" y2="140" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="300" y1="30" x2="300" y2="140" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x="95" y="32" fontSize="11" textAnchor="middle" className="fill-foreground">Working temp</text>
      <text x="242" y="77" fontSize="11" textAnchor="middle" className="fill-foreground">Standby (sleep)</text>
      <text x="370" y="126" fontSize="11" textAnchor="middle" className="fill-foreground">Off</text>
      <text x="150" y="156" fontSize="10" textAnchor="middle" className="fill-muted">sleep delay</text>
      <text x="300" y="156" fontSize="10" textAnchor="middle" className="fill-muted">auto-off timer</text>
      <text x="242" y="104" fontSize="10" textAnchor="middle" className="fill-muted">lift or press: reheats</text>
      <text x="370" y="104" fontSize="10" textAnchor="middle" className="fill-muted">power on again</text>
    </svg>
  );
}

export default function WhyDoesMySolderingIronKeepSwitchingOffPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Keep Switching Off?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-keep-switching-off"
      category="soldering-irons"
      published="2026-10-25"
      intro={
        <>
          A soldering iron that keeps switching off is most often doing it on purpose: a sleep or auto-off
          timer has decided the iron is idle, or a smart iron lying still in its stand has put itself to
          sleep. If it shuts off or resets while you are actually using it, the usual causes are a USB-C
          charger or power bank that can&apos;t hold the power the iron asks for, a protection cutoff, or a
          loose cable or connector breaking the circuit. This guide shows how to tell a deliberate shutdown
          from a fault, and what to do about each one.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 USB-C smart soldering iron",
        caption: (
          <>
            A USB-C iron depends on what the charger negotiates. Our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>{" "}
            covers its power requirements.
          </>
        ),
      }}
      toc={[
        { id: "deliberate-or-fault", label: "Deliberate shutdown or a fault?" },
        { id: "causes", label: "Causes, checks and fixes" },
        { id: "timing", label: "When it switches off tells you why" },
        { id: "step-timers", label: "1. Check the sleep and auto-off settings" },
        { id: "step-motion", label: "2. Rule out motion-sensor sleep" },
        { id: "step-supply", label: "3. Test a USB-C iron on a known-good supply" },
        { id: "step-mains", label: "4. Check the outlet and power strip" },
        { id: "step-cable", label: "5. Flex-test the cable and connector" },
        { id: "step-error", label: "6. Read the error code" },
        { id: "no-controller", label: "Cheap irons with no controller" },
      ]}
      faq={[
        {
          q: "Is it normal for a soldering station to turn itself off?",
          a: "Yes, if it has an auto-off feature. Many stations first drop to a lower standby temperature when idle, then switch the heater off completely after a longer period, to save the tip and reduce fire risk. The manual lists the delays and usually explains how to change or disable them. A station that shuts off while you are actively soldering is a different matter and points to a fault.",
        },
        {
          q: "Why does my USB-C soldering iron turn off when I plug it into a power bank?",
          a: "Most likely the power bank cannot supply the voltage or current the iron requests. When the iron starts heating it draws a burst of power, and a bank that can't deliver it may cut its output or renegotiate, which reboots the iron. Some banks also switch off when the draw drops low, as it does once the tip reaches temperature. Try a charger that offers 20 V USB-C PD.",
        },
        {
          q: "Why does my soldering iron go to sleep while I am using it?",
          a: "A motion-sensing smart iron decides it is idle when it stops detecting movement, and holding it very still on a long joint can be enough to trigger sleep. A station without motion sensing may be timing from the last button press or from when the handle was lifted from the stand. Lengthen the sleep delay in the settings, or adjust the motion sensitivity if the iron offers it.",
        },
        {
          q: "Can a bad soldering iron cable cause it to switch off?",
          a: "Yes. The handpiece cable flexes thousands of times and its conductors can crack inside the insulation, usually near the handle or the plug. The break opens and closes as the cable moves, so the iron cuts out or shows a sensor error only in certain positions. A cracked or melted cable is a reason to stop using the iron and replace the handpiece or cable, not to keep working around it.",
        },
        {
          q: "Why does my soldering iron trip the breaker or power strip?",
          a: "A heating element that shorts to the metal barrel, or a damaged cord, can trip a GFCI outlet or a breaker. An overloaded power strip with several heaters on it can trip its own breaker too. Plug the station straight into a wall outlet on its own. If it still trips, stop using it and have it repaired or replaced, because that points to an insulation fault.",
        },
        {
          q: "How do I stop my soldering iron going into standby?",
          a: "Check the settings menu or manual for a sleep, standby or auto-off option. Many stations and smart irons let you lengthen the delay, and some allow it to be disabled entirely. Disabling it is rarely a good idea, because a tip held at full temperature with nothing to do oxidizes quickly. A longer delay usually solves the annoyance while keeping the protection in place.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
          title: "Why Does My Soldering Iron Temperature Keep Dropping?",
          desc: "When the iron stays on but the tip can't hold its heat.",
        },
        {
          href: "/soldering-irons/how-to-test-a-soldering-iron",
          title: "How to Test a Soldering Iron",
          desc: "Element and sensor resistance checks with a multimeter.",
        },
        {
          href: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
          title: "Why Does My Soldering Iron Take Too Long to Heat Up?",
          desc: "Slow heat-up causes, from weak supplies to worn tips.",
        },
      ]}
    >
      <section id="deliberate-or-fault">
        <h2 className="text-xl font-semibold mb-3">Deliberate shutdown or a fault?</h2>
        <p className="text-muted leading-7 mb-4">
          The first question is whether the iron is choosing to switch off or being forced to. A deliberate
          shutdown is tidy: the display usually says something like sleep, standby or off, the iron wakes when
          you lift it or press a button, and it happens after the iron has been left alone. A forced shutdown is
          messy: the display goes blank or the iron reboots to its startup screen, it happens while you are
          working, and it often depends on what the iron is plugged into or how the cable is lying.
        </p>
        <p className="text-muted leading-7 mb-4">
          If what you are seeing is the tip temperature sagging during work while the iron stays on, that is a
          heat-delivery problem rather than a shutdown, and it has its own guide:{" "}
          <Link href="/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping" className={link}>
            why a soldering iron&apos;s temperature keeps dropping
          </Link>
          . That page also covers the temperature dip you see while the iron is idling in the stand. This page
          is about the iron actually turning off, rebooting, or refusing to heat until you intervene.
        </p>
        <Figure caption="Every iron has the same power path. A deliberate shutdown comes from the controller; a fault can stop power at any stage.">
          <PowerPathDiagram />
        </Figure>
      </section>

      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">Causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Display shows sleep or standby; tip cools when idle", "Sleep timer", "Pick the iron up or press a button; it should reheat", "Lengthen the sleep delay in the settings"],
            ["Iron fully off after a long idle spell", "Auto-off timer", "Look for an auto-off setting in the menu or manual", "Lengthen the timer; switch on again to resume"],
            ["Smart iron sleeps in the stand or on long joints", "Motion-sensor sleep", "Nudge the iron; it should wake within seconds", "Raise motion sensitivity or the sleep delay"],
            ["USB-C iron reboots when it starts heating", "Charger or power bank can't hold the requested power", "Try a known-good 20 V PD charger and cable", "Use a supply that offers the iron's voltage and enough watts"],
            ["Iron off with a low-voltage warning", "Undervoltage cutoff", "Check the input voltage the iron reports, if it does", "Use a stronger supply; charge the battery"],
            ["Station cuts out after long, heavy use", "Thermal or overcurrent protection", "Feel for a hot case; check vents are clear", "Let it cool, clear vents, work at a lower setpoint"],
            ["Cuts out when the cable moves", "Broken conductor or loose handpiece plug", "Flex the cable gently near each end while watching the display", "Reseat the plug; replace a damaged cable or handpiece"],
            ["Error code, heater won't run", "Open heater or sensor", "Note the code; measure the element with the iron unplugged", "Replace the tip, cartridge or element"],
            ["Iron and everything on the strip go dead", "Tripped power strip, breaker or GFCI", "Plug something else into the same outlet", "Reset; plug the station directly into the wall"],
            ["Plain plug-in iron goes cold for good", "Failed element or cord, no controller to report it", "Check the cord and element resistance", "Replace the iron"],
          ]}
        />
      </section>

      <section id="timing">
        <h2 className="text-xl font-semibold mb-3">When it switches off tells you why</h2>
        <p className="text-muted leading-7 mb-4">
          Timing is the fastest clue. A shutdown that always arrives after the same period of idleness is a
          timer. A shutdown the instant the heater starts drawing power is a supply problem. One that only
          happens after a long session points to heat building up inside the station. One that is random is
          almost always a connection. The figures in the table are typical patterns, not settings for any
          particular iron: many stations sleep after several minutes idle, but the exact delays vary by model,
          so check the manual for yours.
        </p>
        <DataTable
          head={["Cause", "Typical timing", "Repeatable?"]}
          rows={[
            ["Sleep or standby timer", "After several minutes with no use (set by the maker or user)", "Yes, same delay every time"],
            ["Auto-off timer", "Longer than the sleep delay, often tens of minutes", "Yes"],
            ["Motion-sensor sleep", "Seconds to minutes after the iron stops moving", "Yes, tied to stillness"],
            ["USB-C PD negotiation failure", "Within a second or two of heating starting, or at plug-in", "Yes, on that supply only"],
            ["Weak power bank or battery", "As the battery drains, or when the iron draws most power", "Gets worse with charge level"],
            ["Thermal protection", "After long, heavy use, especially with blocked vents", "Yes, after a cool-down it works again"],
            ["Cable or connector fault", "Random; when the cable is moved", "No, depends on position"],
            ["Heater or sensor failure", "At power-on or during heat-up, with an error", "Yes, every time once failed"],
          ]}
        />
      </section>

      <section id="step-timers">
        <StepHeading n={1}>Check the sleep and auto-off settings</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many soldering stations and smart irons have two separate idle behaviors. Sleep, or standby, drops the
          tip to a lower temperature after a delay with no activity; lifting the handle or pressing a button
          brings it back to working temperature in seconds. Auto-off goes further: after a longer delay the
          heater turns off completely and the iron stays cold until you switch it on or press a button. Both
          exist to slow tip oxidation and to avoid an iron cooking away on a bench that someone has walked away
          from.
        </p>
        <Figure caption="Illustrative idle sequence for an iron with both features. The delays differ by model and are often adjustable.">
          <IdleTimelineDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Open the settings menu, or the manual if the station has no menu, and find the sleep and auto-off
          entries. If the delays are short, lengthen them rather than disabling them. Not every station has
          either feature: Hakko lists no stated sleep or standby mode for the FX-888DX, for example, so a station
          like that shutting down on its own is not a timer and should be investigated as a fault.
        </p>
      </section>

      <section id="step-motion">
        <StepHeading n={2}>Rule out motion-sensor sleep</StepHeading>
        <p className="text-muted leading-7">
          Many smart USB-C irons do not use a stand switch; they use an accelerometer in the handle and treat
          stillness as idleness. That works well until the iron lies motionless on the bench instead of in a
          stand, or you hold it very steady through a long joint on a ground plane, and it drops into sleep in the
          middle of the job. The sign is that a small nudge wakes it immediately. Where the firmware allows it,
          raise the motion sensitivity or lengthen the sleep delay, and rest the iron in a stand between joints so
          its idle behavior is predictable.
        </p>
      </section>

      <section id="step-supply">
        <StepHeading n={3}>Test a USB-C iron on a known-good supply</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A USB-C iron does not simply draw power; it asks the charger for a voltage through USB Power Delivery,
          and the charger agrees or refuses. If the charger agrees to a voltage it then can&apos;t hold when the
          heater switches on, its protection may cut the output and the iron reboots, often right as the tip
          starts to heat. Power banks add two more ways to fail: they may not offer the higher PD voltages at all,
          and some switch their output off when the current drops low, which happens once the tip reaches
          temperature and the heater only pulses. Many smart irons also have an undervoltage cutoff that turns
          the heater off rather than run on a sagging input.
        </p>
        <p className="text-muted leading-7">
          Pine64 specifies the Pinecil V2 at up to 88W at 24V DC and about 60W from 20V USB-C PD, and notes it
          needs a USB-C PD or DC supply. The quickest test is to swap in a charger that offers 20 V PD and a cable
          rated for the current, and see whether the resets stop. If they do, the original supply was the cause.
          The arithmetic of how much power each PD voltage leaves for heating, and how to check what a charger is
          really delivering, is in{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C chargers that don&apos;t deliver full power
          </Link>
          .
        </p>
      </section>

      <section id="step-mains">
        <StepHeading n={4}>Check the outlet and power strip</StepHeading>
        <p className="text-muted leading-7">
          If the station&apos;s display goes completely dark and anything else on the same power strip dies with
          it, the iron is not the problem: the strip, breaker or GFCI outlet has tripped. A strip shared with a
          hot air station, heat gun or space heater can overload. Plug the station straight into a wall outlet on
          its own and try again. If it trips a GFCI or breaker on its own, that suggests current leaking from the
          heater or cord to ground, which needs a repair or replacement, not a different outlet. A station that
          shuts down after a long session and works again once cool is more likely its own thermal protection;
          keep its vents clear and don&apos;t bury it under clutter.
        </p>
      </section>

      <section id="step-cable">
        <StepHeading n={5}>Flex-test the cable and connector</StepHeading>
        <p className="text-muted leading-7">
          Random cut-outs that don&apos;t follow a timer are usually a connection. The cable between station and
          handpiece carries both heater current and the tiny sensor signal, so a cracked conductor can either cut
          power or make the controller think the sensor has failed. With the station on and the tip in the stand,
          gently flex the cable close to the handle and then close to the plug, watching the display. If it
          flickers, errors or resets at one spot, the cable or handpiece needs replacing. Before that, switch off,
          unplug the handpiece connector and reseat it firmly; a plug that has worked partly loose causes the same
          symptoms. On a USB-C iron, try a different cable first, since a worn connector can drop the PD contract
          when it moves.
        </p>
      </section>

      <section id="step-error">
        <StepHeading n={6}>Read the error code</StepHeading>
        <p className="text-muted leading-7">
          A controlled station or smart iron that detects an open heater or sensor usually stops heating and shows
          an error code or message instead of carrying on blindly. Write the code down and look it up in the
          manual, because codes differ by maker. On cartridge irons the heater and sensor are often part of the
          tip, so trying a known-good tip is a cheap first test. On irons with a separate element, measure its
          resistance with the iron unplugged and cool and compare it with the figure in the manual; the method is
          in{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            how to test a soldering iron
          </Link>
          . An open-circuit reading means the element or sensor has failed.
        </p>
      </section>

      <Callout title="Heat, fumes and mains power">
        Treat a cutting-out iron as live and hot until proven otherwise: the tip can stay hot enough to burn for
        minutes after the display goes dark. Unplug the station before reseating connectors or opening anything,
        and never probe inside a mains-powered station while it is plugged in. A melted cord, exposed conductor or
        a station that keeps tripping a GFCI is a reason to stop using it and contact the maker&apos;s service
        center. Keep working with ventilation or fume extraction while you troubleshoot.
      </Callout>

      <section id="no-controller">
        <h2 className="text-xl font-semibold mb-3">Cheap irons with no controller</h2>
        <p className="text-muted leading-7 mb-4">
          A basic plug-in iron with no electronics has no timers, no protection and no way to report a fault.
          When it stops heating, either the cord or plug has broken, or the element has failed. If it heats
          intermittently, the cord is the likely culprit, usually where it enters the handle. There is rarely
          anything worth repairing; by the time an inexpensive iron&apos;s element has gone, a replacement with a
          real temperature controller costs little more and solves several other problems at once.
        </p>
        <FlowDiagram
          steps={[
            { label: "Wakes on lift?", sub: "Timer or motion sleep" },
            { label: "Resets on heat-up?", sub: "Supply or PD" },
            { label: "Cuts out on flex?", sub: "Cable or plug" },
            { label: "Error code?", sub: "Heater or sensor" },
          ]}
        />
      </section>

      <section>
        <KeyIdea title="In short">
          If the iron wakes when you touch it, it was sleeping, and a longer delay fixes it. If it reboots the
          moment it starts heating, change the charger or power bank. If it cuts out when the cable moves, replace
          the cable or handpiece. If it shows an error, test the tip or element. If it trips the outlet, stop
          using it.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Irons and stations worth considering"
        items={[
          { name: pinecil.name, image: pinecil.image, alt: "Pinecil V2 smart soldering iron", href: "/soldering-irons/pinecil-v2-review", note: "Runs from any USB-C PD source; up to 88W at 24V DC, about 60W from 20V PD." },
          { name: weller.name, image: weller.image, alt: "Weller WE1010NA soldering station", href: "/soldering-irons/weller-we1010na-review", note: "70W ESD-safe digital bench station; about 28 seconds from 50 to 350°C." },
          { name: fx888dx.name, image: fx888dx.image, alt: "Hakko FX-888DX soldering station", href: "/soldering-irons/weller-we1010-vs-hakko-fx-888dx", note: "100W station with five presets and a parameter lock; no stated sleep mode." },
        ]}
      />
    </HowToShell>
  );
}
