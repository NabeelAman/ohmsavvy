import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to diagnose a power window that won't move with a multimeter: test the switch's output, voltage at the motor, and the motor's ground, in that order.";

export const metadata = buildMetadata({
  title: "Diagnosing a Power Window That Won't Move",
  description,
  path: "/multimeters/how-to-diagnose-a-car-window-that-wont-roll-up-or-down",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function CarWindowWontMovePage() {
  return (
    <HowToShell
      title="How to Diagnose a Car Window That Won't Roll Up or Down With a Multimeter"
      description={description}
      published="2026-10-25"
      path="/multimeters/how-to-diagnose-a-car-window-that-wont-roll-up-or-down"
      category="multimeters"
      intro={
        <>
          To diagnose a car window that won&apos;t roll up or down, rule out the fuse and the lockout
          button, then measure voltage at the switch output while pressing it, at the motor connector, and
          across the motor&apos;s ground: the first point where the voltage goes missing is the fault. If
          full voltage reaches a motor that only hums or clicks, the problem is mechanical, usually the
          regulator. The switch test needs no disassembly, so you can often narrow it down before the
          door panel comes off.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter",
        caption: (
          <>
            The Craftsman CMMT14171 handles this kind of automotive circuit tracing well. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              Craftsman CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-the-circuit-works", label: "How a power window circuit works" },
        { id: "listen-first", label: "Listen first: does the motor try to move?" },
        { id: "test-the-switch", label: "Test voltage at the switch output" },
        { id: "test-at-the-motor", label: "Test voltage at the motor" },
        { id: "expected-readings", label: "Readings to expect" },
        { id: "test-the-ground", label: "Test the motor's ground" },
        { id: "mechanical-vs-electrical", label: "Mechanical vs. electrical failure" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "The motor hums or strains but the window doesn't move — is that electrical?",
          a: "A motor that's getting power and trying to turn but can't move the window usually points to a mechanical problem — a broken regulator cable, a jammed track, or a stripped gear — rather than an electrical fault. Confirming the motor is receiving proper voltage first rules the electrical side in or out before you move to mechanical inspection.",
        },
        {
          q: "Could a master lockout switch cause one window to stop working?",
          a: "Yes — many vehicles have a window lockout switch, usually at the driver's door, that disables the rear or passenger windows entirely. Check that it isn't engaged before troubleshooting further; it's an easy thing to overlook.",
        },
        {
          q: "Why would a window work from one switch but not the other?",
          a: "If the master switch panel can operate the window but the individual door's own switch can't (or vice versa), that points to a fault isolated to one specific switch or its wiring, rather than the motor or the circuit shared by both.",
        },
        {
          q: "Can a blown fuse affect just one window and not others?",
          a: "It depends on the vehicle's wiring — some share one fuse across multiple windows, others fuse each window separately. Check your owner's manual's fuse diagram to see whether the affected window has its own dedicated fuse or shares one with windows that are still working.",
        },
        {
          q: "Is it safe to test the window motor with the door panel off?",
          a: "Yes, as long as you keep clear of the regulator mechanism and track while testing with power connected — a power window mechanism can move unexpectedly and has enough force to pinch fingers.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay With a Multimeter",
          desc: "If the window circuit uses a relay rather than switching the motor directly.",
        },
        {
          href: "/multimeters/how-to-find-a-broken-wire-with-a-multimeter",
          title: "How to Find a Broken Wire With a Multimeter",
          desc: "For tracing a suspected wiring fault between the switch and motor.",
        },
      ]}
    >
      <Callout title="Keep clear of the window mechanism while powered">
        <ul className="space-y-2 list-disc pl-5">
          <li>Keep fingers and tools clear of the regulator track and mechanism any time power is connected, including with the door panel removed.</li>
          <li>Disconnect the battery before doing any wiring repairs, not just testing.</li>
          <li>Check for a window lockout switch being engaged before assuming a fault.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-the-circuit-works" className="text-xl font-semibold mb-3">How a power window circuit works</h2>
        <p className="text-muted leading-7 mb-4">
          A window motor is a small permanent-magnet DC motor, and it changes direction when the polarity
          across it is reversed. The switch does that job. At rest, both motor wires are connected to
          ground through the switch. Press &quot;up&quot; and one wire is lifted from ground and connected to
          12V; press &quot;down&quot; and the other wire gets the 12V while the first returns to ground.
          That&apos;s why the switch is the first place to measure: in one direction a single wire should
          carry battery voltage while its partner stays at ground. Many newer cars replace the direct
          switch with a door control module and a one-touch relay, but the motor still sees the same
          reversing polarity at its connector.
        </p>
        <Figure
          caption={
            <>
              Simplified power window circuit. Pressing &quot;up&quot; puts 12V on wire A and ground on wire
              B; &quot;down&quot; swaps them, so the motor turns the other way. The meter reads across the
              motor connector or from either wire to ground.
            </>
          }
        >
          <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label="Power window circuit: fuse feeds a reversing switch, two wires to the window motor, meter across the motor connector">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <path d="M20 40 H60" />
              <rect x="60" y="33" width="34" height="14" rx="3" />
              <path d="M94 40 H130" />
              <rect x="130" y="25" width="80" height="100" rx="6" className="fill-surface" />
              <path d="M210 55 H270 M210 95 H270" />
              <circle cx="290" cy="75" r="22" className="fill-surface" />
              <path d="M270 55 Q280 55 284 58 M270 95 Q280 95 284 92" />
              <path d="M170 125 V150 H40 V160 M30 160 H50" />
            </g>
            <g fontSize="9" textAnchor="middle" className="fill-foreground">
              <text x="20" y="32">12V</text>
              <text x="77" y="28">fuse</text>
              <text x="170" y="62">window</text>
              <text x="170" y="74">switch</text>
              <text x="170" y="92" className="fill-muted">up / down</text>
              <text x="240" y="50">wire A</text>
              <text x="240" y="110">wire B</text>
              <text x="290" y="79" fontWeight="700">M</text>
              <text x="100" y="146" className="fill-muted">ground</text>
            </g>
            <path d="M262 55 V20 H340 V75 M262 95 V130 H340 V95" className="stroke-accent" strokeWidth="1.3" fill="none" strokeDasharray="4 3" />
            <circle cx="340" cy="85" r="11" className="fill-surface stroke-accent" strokeWidth="2" />
            <text x="340" y="89" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="listen-first">Listen first: does the motor try to move?</StepHeading>
        <p className="text-muted leading-7">
          Press the switch and listen closely. A motor that hums, clicks, or strains without the glass moving
          suggests the electrical side is at least partly working and the problem may be mechanical. Total
          silence suggests no power is reaching the motor at all — start the electrical tests from the
          switch.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="test-the-switch">Test voltage at the switch output</StepHeading>
        <p className="text-muted leading-7">
          With the ignition on, back-probe the switch&apos;s output wires while pressing it in each direction
          and measure voltage. You should see voltage present on one output wire for &quot;up&quot; and the
          other for &quot;down&quot; — a switch with no output voltage in either direction (but power present
          at its input) points to a failed switch.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="test-at-the-motor">Test voltage at the motor</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the switch shows good output voltage, move to the motor connector (door panel removal may be
          needed) and test for voltage there while operating the switch. Voltage present at the switch but
          not at the motor points to a break in the wiring between them.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Silent, no voltage at the switch's output", "Blown fuse, lockout engaged, or a failed switch", "Power at the switch input but none at its outputs", "Replace the fuse or switch; release the lockout"],
            ["Voltage at the switch, none at the motor", "Broken wire or connector between switch and motor", "Probe both ends of the wire while pressing the switch", "Repair the wire, often in the door-jamb boot"],
            ["Voltage at the motor, motor doesn't move", "Bad motor, bad ground, or a mechanical jam", "Full voltage across the motor connector, no movement", "Tap the motor; replace it if it stays dead"],
            ["Motor strains or clicks but glass doesn't move", "Mechanical fault: regulator, cable, or track", "Motor runs with the regulator unbolted", "Replace the regulator or free the track"],
            ["Works in one direction only", "Worn switch contact for that direction", "Output wire stays at 0V for one direction only", "Replace the switch"],
          ]}
        />
      </section>

      <section>
        <h2 id="expected-readings" className="text-xl font-semibold mb-3">Readings to expect</h2>
        <p className="text-muted leading-7 mb-4">
          These are general guidelines for a 12V car with the ignition on and the engine off, not values
          from a specific model. Start by measuring the battery so you have a reference; most will sit
          around 12.4–12.6V.
        </p>
        <DataTable
          head={["Measurement point", "Healthy (guideline)", "Points to a fault"]}
          rows={[
            ["Switch input to ground", "Within a few tenths of battery voltage", "0V: fuse, relay or feed wire"],
            ["Switch output, button pressed", "Close to battery voltage", "0V or several volts low: switch contacts"],
            ["Across the motor connector, button pressed", "Within about 0.5V of battery", "Much lower: wiring or connector resistance"],
            ["Motor ground side to chassis, button pressed", "Under about 0.2V", "Higher: poor ground path"],
          ]}
          mono={[1]}
        />
        <p className="text-muted leading-7 mt-4">
          An illustrative example: the battery reads 12.5V, the switch output reads 12.4V while pressed,
          but the motor connector shows only 6V. Half the voltage is being lost in the wiring between
          them, so look at the rubber boot between the door and the body, where the harness flexes every
          time the door opens and copper strands break inside intact insulation.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="test-the-ground">Test the motor&apos;s ground</StepHeading>
        <p className="text-muted leading-7">
          If voltage reaches the motor but it still doesn&apos;t run, check the motor&apos;s ground connection
          — resistance or voltage-drop testing the same way as{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            testing a car ground wire
          </Link>
          . A poor ground can starve the motor of the current it needs even with normal-looking supply
          voltage.
        </p>
      </section>

      <section>
        <h2 id="mechanical-vs-electrical" className="text-xl font-semibold mb-3">Mechanical vs. electrical failure</h2>
        <p className="text-muted leading-7">
          Good voltage and ground at a motor that still won&apos;t move the glass means the fault is
          mechanical — a broken regulator cable, worn gear, or a track obstruction — and electrical testing
          has done its job of ruling out the wiring. At that point the repair shifts from a multimeter to
          disassembling the regulator mechanism itself.
        </p>
        <p className="text-muted leading-7 mt-4">
          One electronic quirk is worth ruling out before you buy parts. On many cars with one-touch
          auto-up, the window module forgets the glass&apos;s end positions after the battery is
          disconnected or goes flat, and the auto function, sometimes the anti-pinch reverse as well,
          stops working properly until it&apos;s re-learned. The usual procedure is to run the window fully
          down, then fully up and keep holding the switch for a few seconds, but the exact steps vary, so
          check the owner&apos;s manual. If that restores normal operation, no part has failed.
        </p>
        <div className="mt-4">
          <KeyIdea title="A strained-sounding motor is a mechanical clue, not just noise">
            A motor that clearly tries hard but can&apos;t move the glass is telling you it has power — don&apos;t
            keep re-checking the electrical side once you&apos;ve heard that.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with DC volts and continuity covers this whole test sequence. See the full{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          picks.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Built for this kind of automotive circuit tracing.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. Auto-ranging DC volts and continuity, CAT III 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
