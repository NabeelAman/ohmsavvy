import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test an automotive relay with a multimeter: check coil resistance, confirm the resting contact state, then energize the coil and verify the contacts switch.";

export const metadata = buildMetadata({
  title: "How to Test an Automotive Relay With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;

const link = "text-accent hover:underline";

export default function HowToTestAnAutomotiveRelayWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an Automotive Relay With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-an-automotive-relay-with-a-multimeter"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          A relay is really two separate circuits sharing one case: a low-current coil that creates a
          magnetic field, and a set of switch contacts that field physically pulls open or closed. A
          full test checks both halves — the coil&apos;s resistance, and whether the contacts actually
          switch when the coil is energized — not just one or the other.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            A multimeter with resistance and continuity modes covers the passive half of this test. See
            our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "relay-pinout", label: "Standard relay pinout" },
        { id: "coil-resistance", label: "1. Test coil resistance" },
        { id: "resting-contacts", label: "2. Check the resting contact state" },
        { id: "energized-contacts", label: "3. Energize the coil and recheck" },
        { id: "interpreting-results", label: "Interpreting the results" },
      ]}
      faq={[
        {
          q: "What resistance should a healthy relay coil show?",
          a: "It varies by relay — commonly somewhere in the tens to low hundreds of ohms for typical automotive relays, but this differs by part number and manufacturer. Check the relay's datasheet or the number printed on its case for the exact figure where precision matters; what's most diagnostic is an open (infinite) reading, which clearly indicates a failed coil regardless of the exact expected value.",
        },
        {
          q: "Do I need a 12V source to fully test a relay, or can the multimeter power the coil?",
          a: "You need a separate 12V source — a multimeter's own test current is far too small to energize a relay coil. A bench supply, a car battery with fused jumper leads, or a 12V battery pack all work, as long as you observe correct polarity on relays with an internal protection diode across the coil.",
        },
        {
          q: "Why does my relay click but the circuit it controls still doesn't work?",
          a: "An audible click confirms the coil is pulling the armature, but doesn't confirm the switch contacts themselves are making good electrical contact — pitted or burnt contacts can click mechanically while failing to pass current cleanly. Test continuity through the switched contacts while the coil is energized, not just listen for the click.",
        },
        {
          q: "Can a relay fail intermittently and still pass a bench test?",
          a: "Yes — intermittent faults (contacts that work when cold but fail when hot, or a coil with a marginal winding that fails under vibration) can pass a static bench test and still cause real-world problems. If symptoms point at a relay that tests fine, consider testing it again under load or after it's warmed up in its actual operating position.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-resistance-in-a-parallel-circuit",
          title: "How to Measure Resistance in a Parallel Circuit",
          desc: "Isolating a component before testing its resistance, the same principle applied here.",
        },
        {
          href: "/multimeters/best-multimeter-for-automotive",
          title: "Best Multimeter for Automotive",
          desc: "Multimeters suited to this kind of automotive diagnostic work.",
        },
      ]}
    >
      <Callout title="Remove the relay from its circuit before testing">
        Testing a relay still plugged into its harness risks the same parallel-path problem covered in
        our resistance guide, and an energized-contact test on a live circuit can affect whatever the
        relay controls. Pull the relay from its socket and test it on the bench.
      </Callout>

      <section>
        <h2 id="relay-pinout" className="text-xl font-semibold mb-3">Standard automotive relay pinout</h2>
        <p className="text-muted leading-7 mb-4">
          Most automotive relays use a standard 5-pin layout, though some simpler relays use 4 pins
          (omitting the normally-closed contact). The numbers are usually molded into the relay case
          itself.
        </p>
        <InfoCards
          items={[
            { label: "Pins 85 / 86", desc: "The coil. Polarity matters only if the relay has an internal protection diode." },
            { label: "Pin 30", desc: "Common — the input side of the switched contacts." },
            { label: "Pin 87", desc: "Normally open (NO) — connects to 30 once the coil is energized." },
            { label: "Pin 87a", desc: "Normally closed (NC) — connects to 30 at rest, disconnects when energized (5-pin relays only)." },
          ]}
        />
        <Figure
          caption={
            <>
              Resting state: 30 connects to 87a (normally closed), 87 (normally open) is disconnected.
              Energizing the coil (85/86) pulls the armature, connecting 30 to 87 and breaking 30 from
              87a.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Diagram of a standard 5-pin automotive relay's internal coil and switch contacts">
            <g className="stroke-foreground" strokeWidth="1.5" fill="none">
              <rect x="20" y="20" width="60" height="40" rx="4" />
              <text x="50" y="45" fontSize="10" textAnchor="middle" className="fill-foreground">Coil</text>
              <line x1="20" y1="30" x2="5" y2="30" />
              <line x1="20" y1="50" x2="5" y2="50" />
              <text x="2" y="26" fontSize="9" textAnchor="start" className="fill-muted">86</text>
              <text x="2" y="62" fontSize="9" textAnchor="start" className="fill-muted">85</text>
              <line x1="110" y1="90" x2="150" y2="60" className="stroke-accent" strokeWidth="2" />
              <circle cx="110" cy="90" r="3" className="fill-foreground" />
              <line x1="90" y1="90" x2="110" y2="90" />
              <text x="80" y="94" fontSize="9" textAnchor="end" className="fill-muted">30</text>
              <circle cx="150" cy="60" r="3" className="fill-foreground" />
              <line x1="150" y1="60" x2="190" y2="60" />
              <text x="195" y="64" fontSize="9" className="fill-muted">87 (NO)</text>
              <circle cx="150" cy="120" r="3" className="fill-foreground" strokeDasharray="2 2" />
              <line x1="150" y1="120" x2="190" y2="120" strokeDasharray="3 3" />
              <text x="195" y="124" fontSize="9" className="fill-muted">87a (NC)</text>
            </g>
            <text x="150" y="20" fontSize="9" textAnchor="middle" className="fill-accent">resting position shown</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="coil-resistance">Test coil resistance</StepHeading>
        <p className="text-muted leading-7">
          Set the multimeter to resistance mode and measure across pins 85 and 86. A reading within the
          relay&apos;s typical range (check the datasheet or case marking) indicates a healthy coil
          winding. An open (OL) reading means the coil winding has failed — the relay won&apos;t energize
          no matter what controls it.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resting-contacts">Check the resting contact state</StepHeading>
        <p className="text-muted leading-7">
          With the relay unpowered, set the multimeter to continuity mode. Pin 30 should show continuity
          with pin 87a (normally closed) and no continuity with pin 87 (normally open). This confirms
          the contacts are in their correct resting position before you energize anything.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="energized-contacts">Energize the coil and recheck</StepHeading>
        <p className="text-muted leading-7">
          Using a separate 12V source (not the multimeter), apply power to pins 85 and 86, observing
          correct polarity if the relay has an internal diode. You should hear an audible click. With
          the coil still energized, recheck continuity: pin 30 should now show continuity with pin 87
          (normally open) and no longer show continuity with pin 87a.
        </p>
      </section>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results</h2>
        <DataTable
          head={["Test result", "Likely condition"]}
          rows={[
            ["Coil shows OL (open)", "Failed coil winding — relay needs replacing"],
            ["No continuity 30–87a at rest", "Contacts stuck open, or wrong pins identified — recheck the pinout"],
            ["No click when energized, coil resistance is normal", "Mechanical fault in the armature, or a wiring/polarity issue on the test leads"],
            ["Clicks, but no continuity 30–87 when energized", "Contacts pitted, burnt, or welded in the wrong position — relay needs replacing"],
          ]}
        />
      </section>

      <KeyIdea title="A clicking relay isn't automatically a working relay">
        The click only confirms the coil and armature are moving — it says nothing about whether the
        switch contacts are actually passing current cleanly. Always confirm continuity through the
        contacts in both the resting and energized states, not just listen for the click.
      </KeyIdea>
    </HowToShell>
  );
}
