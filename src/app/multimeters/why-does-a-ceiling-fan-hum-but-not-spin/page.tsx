import Link from "next/link";
import { Callout, DataTable, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a ceiling fan hums but won't spin: check that it's receiving power, then test the run capacitor, the most common cause of this symptom.";

export const metadata = buildMetadata({
  title: "Why Does a Ceiling Fan Hum but Not Spin?",
  description,
  path: "/multimeters/why-does-a-ceiling-fan-hum-but-not-spin",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoesACeilingFanHumButNotSpinPage() {
  return (
    <HowToShell
      title="Why Does a Ceiling Fan Hum but Not Spin? Electrical Faults to Check"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-a-ceiling-fan-hum-but-not-spin"
      category="multimeters"
      intro={
        <>
          A motor that hums with the power on but doesn&apos;t turn is almost always receiving power but
          failing to start, and a weak or failed run capacitor is by far the most common reason. This page
          covers the safe checks you can do; the full capacitor test itself is covered in{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className="text-accent hover:underline">
            how to test a fan motor capacitor
          </Link>
          , and a winding-specific check in{" "}
          <Link href="/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter" className="text-accent hover:underline">
            how to test a 4-wire fan motor
          </Link>
          . Any work inside the fan&apos;s wiring or the switch housing should go to a qualified electrician
          if you&apos;re not comfortable with it.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 has a capacitance range for testing the fan&apos;s capacitor directly. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "confirm-power-is-reaching-it", label: "Confirm power is reaching the motor" },
        { id: "the-capacitor-is-the-usual-suspect", label: "The capacitor is the usual suspect" },
        { id: "check-for-a-physical-obstruction", label: "Check for a physical obstruction" },
        { id: "winding-faults", label: "When it's the motor winding instead" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why does a bad capacitor cause humming instead of just no response at all?",
          a: "The capacitor provides the phase shift needed to start the motor spinning in the right direction; without it (or with a weak one), the motor's windings are still energized and trying to create a magnetic field, which produces the hum, but there isn't enough starting torque to actually get the blades moving from a standstill.",
        },
        {
          q: "If I give the blades a push by hand and they start spinning, does that confirm a capacitor fault?",
          a: "It's a strong supporting clue, though not an absolute proof — a motor that runs fine once manually started but can't start on its own is a classic capacitor symptom, since the motor's running winding works but the starting assist doesn't. Still confirm with an actual capacitance measurement rather than relying on this alone.",
        },
        {
          q: "Is it dangerous to spin the blades by hand to test this?",
          a: "Turn off power at the wall switch and ideally at the breaker before touching the blades for any reason beyond a very brief, careful nudge with power on to observe the behavior — and even then, keep clear of the motor housing and any exposed wiring.",
        },
        {
          q: "Could the pull-chain switch be the problem instead of the capacitor?",
          a: "Yes, particularly on fans where the pull-chain switches between speeds by selecting different capacitor taps — a worn or dirty switch contact can fail to make a good connection, with symptoms very similar to a failed capacitor itself. If available, try other speed settings to see if any of them start the fan.",
        },
        {
          q: "When should I stop troubleshooting and call an electrician?",
          a: "Call an electrician if the fault seems to be in the house wiring or switch box itself rather than the fan unit, if you're not comfortable safely accessing the fan's internal wiring, or if you see any signs of burning, melted insulation, or scorching.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter",
          title: "How to Test a Fan Motor Capacitor With a Multimeter",
          desc: "The full capacitance test for this most likely cause.",
        },
        {
          href: "/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter",
          title: "How to Test a 4-Wire Fan Motor With a Multimeter",
          desc: "If the capacitor tests fine and you need to check the windings directly.",
        },
      ]}
    >
      <Callout title="Turn off power before touching the motor or wiring">
        <ul className="space-y-2 list-disc pl-5">
          <li>Turn off power at the wall switch and, for any work beyond a brief observation, at the breaker as well.</li>
          <li>Let the motor and capacitor cool before handling if the fan has been humming for a while.</li>
          <li>A capacitor can hold a charge after power is removed — discharge it safely before testing, per the capacitor-testing guide.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="confirm-power-is-reaching-it">Confirm power is reaching the motor</StepHeading>
        <p className="text-muted leading-7">
          With power off, check the wall switch and any inline connections for voltage when switched on,
          confirming power genuinely reaches the fan&apos;s own wiring. Humming itself is usually a strong
          sign power is present, but confirming it rules out a marginal connection as a contributing factor.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="the-capacitor-is-the-usual-suspect">The capacitor is the usual suspect</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With power off, locate the fan&apos;s capacitor (often in a small housing near the motor or in the
          switch housing) and test its capacitance against its rated value, following{" "}
          <Link href="/multimeters/how-to-test-a-fan-motor-capacitor-with-a-multimeter" className={link}>
            how to test a fan motor capacitor
          </Link>
          .
        </p>
        <DataTable
          head={["Finding", "Likely cause"]}
          rows={[
            ["Capacitance well below rated value", "Weak capacitor — replace it"],
            ["Capacitance reads zero or open", "Failed capacitor — replace it"],
            ["Capacitance reads correctly", "Capacitor is fine — check the motor windings and for obstructions instead"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="check-for-a-physical-obstruction">Check for a physical obstruction</StepHeading>
        <p className="text-muted leading-7">
          With power off, spin the blades by hand and feel for binding, grinding, or resistance. A bearing
          that&apos;s seized or heavily worn, or debris caught in the motor housing, can also prevent
          starting even with a perfectly good capacitor and motor winding.
        </p>
        <div className="mt-4">
          <KeyIdea title="A capacitor failure is far more common than a winding failure">
            Start with the capacitor test before assuming a motor winding fault — it&apos;s both the more likely
            cause and the simpler, cheaper part to replace.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="winding-faults" className="text-xl font-semibold mb-3">When it&apos;s the motor winding instead</h2>
        <p className="text-muted leading-7">
          If the capacitor tests correctly and there&apos;s no physical obstruction, the motor&apos;s own
          windings may have an internal fault. See{" "}
          <Link href="/multimeters/how-to-test-a-4-wire-fan-motor-with-a-multimeter" className={link}>
            how to test a 4-wire fan motor
          </Link>{" "}
          for resistance checks between the winding terminals.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with a capacitance range is essential for testing the capacitor directly. See the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Includes a capacitance range for direct capacitor testing.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
