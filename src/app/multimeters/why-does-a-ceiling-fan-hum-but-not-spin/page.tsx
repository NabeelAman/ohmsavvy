import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
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
        { id: "causes-at-a-glance", label: "Causes at a glance" },
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
        <h2 id="causes-at-a-glance" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          Match what you see and hear to the rows below, then work through the numbered checks in order. The
          capacitor row comes first because it is the cheapest part and the most frequent failure.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Hums, starts if you push the blades", "Weak or open run capacitor", "Capacitance reading against the µF value on its case", "Replace with the same µF and an equal or higher voltage rating"],
            ["Hums on one speed, works on another", "Worn pull-chain or speed switch contact", "Continuity across each switch position with power off", "Replace the speed switch"],
            ["Hums and the blades feel stiff by hand", "Dry or seized bearing, debris", "Spin by hand with power off; listen for grinding", "Clean or replace the motor; often not worth repairing"],
            ["Hums faintly or not at all, never starts", "Loose connection or low voltage at the fan", "Voltage at the supply with the switch on", "Tighten connections; electrician for box or switch wiring"],
            ["Hums, smells hot, or the housing is scorched", "Shorted winding or burned capacitor", "Winding resistance; visual check for melted insulation", "Stop using the fan; replace it or call an electrician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="confirm-power-is-reaching-it">Confirm power is reaching the motor</StepHeading>
        <p className="text-muted leading-7">
          With the wall switch on, confirm voltage reaches the fan with a non-contact tester or a CAT-rated
          meter at an accessible point, then switch off at the breaker before opening any housing. This
          confirms power genuinely reaches the fan&apos;s own wiring. Humming itself is usually a strong
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
        <p className="text-muted leading-7 mb-4">
          Most ceiling fans use a permanent split capacitor (PSC) motor with two windings. The main winding
          connects straight across the supply, while the auxiliary winding is fed through the capacitor,
          which shifts its current ahead of the main winding&apos;s. That offset turns two pulsing fields into
          one rotating field, which is what gives the rotor its starting torque. If the capacitor loses its
          value, the auxiliary current shrinks and the two fields line up in time: the main winding still
          buzzes at line frequency, but nothing pushes the rotor in either direction.
        </p>
        <Figure caption="A PSC fan motor: the main winding runs straight from the supply, and the auxiliary winding runs through the capacitor. A weak capacitor starves the auxiliary winding, leaving a hum with no starting torque.">
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Wiring diagram of a permanent split capacitor ceiling fan motor: the AC supply feeds the main winding directly and the auxiliary winding through a run capacitor, and both windings return to neutral">
            <g className="stroke-foreground" strokeWidth="2" fill="none">
              <line x1="30" y1="30" x2="290" y2="30" />
              <line x1="30" y1="140" x2="290" y2="140" />
              <line x1="110" y1="30" x2="110" y2="60" />
              <path d="M110 60 q10 7 0 14 q10 7 0 14 q10 7 0 14 q10 7 0 14" />
              <line x1="110" y1="116" x2="110" y2="140" />
              <line x1="230" y1="30" x2="230" y2="44" />
              <line x1="216" y1="44" x2="244" y2="44" className="stroke-accent" />
              <line x1="216" y1="52" x2="244" y2="52" className="stroke-accent" />
              <line x1="230" y1="52" x2="230" y2="66" />
              <path d="M230 66 q10 6 0 12 q10 6 0 12 q10 6 0 12 q10 6 0 12" />
              <line x1="230" y1="114" x2="230" y2="140" />
            </g>
            <circle cx="30" cy="30" r="3" className="fill-foreground" />
            <circle cx="30" cy="140" r="3" className="fill-foreground" />
            <text x="30" y="20" fontSize="10" className="fill-foreground">Line (hot)</text>
            <text x="30" y="158" fontSize="10" className="fill-foreground">Neutral</text>
            <text x="126" y="92" fontSize="10" className="fill-foreground">Main winding</text>
            <text x="126" y="104" fontSize="9" className="fill-muted">fed directly</text>
            <text x="252" y="51" fontSize="10" className="fill-accent">Capacitor</text>
            <text x="246" y="92" fontSize="10" className="fill-foreground">Aux</text>
            <text x="246" y="104" fontSize="10" className="fill-foreground">winding</text>
          </svg>
        </Figure>
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
