import Link from "next/link";
import { Callout, DataTable, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a car radio powers on but has no sound: check power and ground at the unit, then speaker wiring, to tell a head-unit fault from a wiring problem.";

export const metadata = buildMetadata({
  title: "Car Radio Has No Sound: Electrical Tests to Try",
  description,
  path: "/multimeters/why-does-my-car-radio-turn-on-but-produce-no-sound",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function CarRadioNoSoundPage() {
  return (
    <HowToShell
      title="Why Does My Car Radio Turn On but Produce No Sound?"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-my-car-radio-turn-on-but-produce-no-sound"
      category="multimeters"
      intro={
        <>
          The display lighting up proves the unit has power and ground for its logic circuit, but that
          doesn&apos;t guarantee the separate, higher-current power path to the amplifier section is intact.
          Checking power and ground directly at the head unit&apos;s connector, then continuity through the
          speaker wiring, separates a head-unit fault from a wiring or speaker problem.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 handles both the voltage and continuity checks this needs. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-power-and-ground", label: "Check power and ground at the head unit" },
        { id: "check-the-fuse", label: "Check the radio's own fuse" },
        { id: "speaker-wiring-continuity", label: "Test speaker wiring continuity" },
        { id: "isolate-the-amplifier", label: "If there's a separate amplifier" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why would the display work but no sound come out?",
          a: "Many head units split power into a small constant-power feed for memory and the display's logic circuit, and a separate switched, higher-current feed for the amplifier section. A problem isolated to that second feed — a blown internal fuse, a bad connection, or a failed amplifier stage — leaves the display working normally while sound fails completely.",
        },
        {
          q: "Could a bad ground connection cause no sound but a working display?",
          a: "Yes, particularly if the unit has separate ground points for its logic and amplifier sections, or if the amplifier ground specifically has failed while the main ground (serving the display) remains intact. Check the ground connection at the unit's chassis mount as well as any ground wire in the harness.",
        },
        {
          q: "How do I test speaker wiring without pulling the door panel apart?",
          a: "Start at the head unit's connector: with the connector unplugged, check continuity from each speaker-output pin, through the harness, to the speaker's own connector if it's reachable without disassembly. If you need to go further, and can access the speaker directly, check continuity at the speaker terminals themselves.",
        },
        {
          q: "Could the issue be the source (phone/Bluetooth/aux) rather than the radio itself?",
          a: "Yes — always confirm the unit shows a healthy, connected source and try a different input (radio tuner vs. aux vs. Bluetooth) before assuming an electrical fault, since a no-sound symptom limited to just one input source points to that input, not the whole unit.",
        },
        {
          q: "What if power, ground, and speaker wiring all test fine?",
          a: "That points to an internal fault in the head unit itself, most likely its amplifier section specifically, since the external power delivery and speaker wiring have been ruled out. At that point, repair or replacement of the unit is usually the next step.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "The general continuity technique used for speaker wiring here.",
        },
        {
          href: "/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter",
          title: "How to Test a Car Ground Wire With a Multimeter",
          desc: "If a ground connection is the suspected cause.",
        },
      ]}
    >
      <Callout title="Disconnect the battery before pulling the head unit">
        <ul className="space-y-2 list-disc pl-5">
          <li>Disconnect the battery negative terminal before removing or reconnecting the head unit&apos;s connector, to avoid a short while handling live pins.</li>
          <li>Note any security/radio codes the unit might need after a power interruption.</li>
          <li>For continuity testing, make sure the circuit is fully de-energized first.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-power-and-ground">Check power and ground at the head unit</StepHeading>
        <p className="text-muted leading-7">
          With the connector plugged in and the unit powered on, back-probe the main power (often labeled
          constant 12V and switched/accessory 12V) and ground pins and measure voltage between each power
          pin and ground. Both should read close to battery voltage with the ignition on.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-the-fuse">Check the radio&apos;s own fuse</StepHeading>
        <p className="text-muted leading-7">
          Many head units have their own small inline fuse, separate from the vehicle&apos;s main fuse box,
          often built into the wiring harness connector itself. Check continuity across it; a blown internal
          fuse specifically cuts the amplifier power while often leaving the display&apos;s lower-current
          supply unaffected.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="speaker-wiring-continuity">Test speaker wiring continuity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the head unit&apos;s connector unplugged and the circuit dead, check continuity from each
          speaker-output pin through to its corresponding speaker connector. No continuity on one or more
          channels points to a break in that specific speaker&apos;s wiring.
        </p>
        <DataTable
          head={["Finding", "Likely cause"]}
          rows={[
            ["Power and ground good, no sound on all channels", "Internal head-unit amplifier fault"],
            ["Power and ground good, no continuity on one channel", "Broken wire or connector for that specific speaker"],
            ["No power at the head unit's amplifier feed", "Blown internal fuse or a wiring fault upstream"],
            ["Everything tests fine electrically", "Check the source/input selection on the unit itself"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="isolate-the-amplifier">If there&apos;s a separate amplifier</StepHeading>
        <p className="text-muted leading-7">
          On systems with an external amplifier, check power, ground, and the remote turn-on wire at the
          amplifier itself in the same way, since a fault there produces the identical symptom at the head
          unit — a working display with the real failure point located elsewhere in the system.
        </p>
        <div className="mt-4">
          <KeyIdea title="Confirm the input source first">
            Before any wiring checks, make sure the unit is actually set to the source you expect and try at
            least one alternate input — it&apos;s the fastest possible explanation to rule out.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with DC volts and continuity covers this entire test. See the full{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          picks.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Continuity beep and DC volts for power/ground checks.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Built for this kind of automotive wiring diagnosis.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
