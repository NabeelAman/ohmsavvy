import Link from "next/link";
import { Callout, DataTable, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
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
          A power window circuit has three main links to check in order: the switch, the wiring to the
          motor, and the motor&apos;s ground. Testing voltage at the switch&apos;s output while pressing it,
          then at the motor itself, tells you which link is the weak one without needing to remove the door
          panel until you&apos;ve narrowed it down.
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
        { id: "listen-first", label: "Listen first: does the motor try to move?" },
        { id: "test-the-switch", label: "Test voltage at the switch output" },
        { id: "test-at-the-motor", label: "Test voltage at the motor" },
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
          head={["Finding", "Likely cause"]}
          rows={[
            ["No voltage at the switch's output at all", "Faulty switch, or no power reaching the switch"],
            ["Voltage at the switch, none at the motor", "Broken wire or connector between switch and motor"],
            ["Voltage at the motor, motor doesn't move", "Bad motor, bad ground, or a mechanical jam"],
            ["Motor strains or clicks but glass doesn't move", "Mechanical fault — regulator, cable, or track"],
          ]}
        />
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
              note: "Auto-ranging DC volts and continuity.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
