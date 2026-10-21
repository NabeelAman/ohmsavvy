import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a fuse without removing it: measure voltage across its terminals live — a good fuse reads near 0V, a blown one reads the full supply voltage.";

export const metadata = buildMetadata({
  title: "How to Test a Fuse Without Removing It",
  description,
  path: "/multimeters/how-to-test-a-fuse-without-removing-it",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;

const link = "text-accent hover:underline";

export default function HowToTestAFuseWithoutRemovingItPage() {
  return (
    <HowToShell
      title="How to Test a Fuse Without Removing It"
      description={description}
      path="/multimeters/how-to-test-a-fuse-without-removing-it"
      category="multimeters"
      published="2026-10-21"
      intro={
        <>
          The standard way to test a fuse — pull it and check continuity — needs the circuit powered
          off and the fuse out of its holder. When that&apos;s inconvenient, there&apos;s a live-circuit
          alternative: measuring the voltage dropped across the fuse&apos;s own terminals while the
          circuit is energized and something downstream is trying to draw power.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            This method needs a meter&apos;s voltage mode, used on a live circuit. See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "the-underlying-principle", label: "The underlying principle" },
        { id: "what-you-need", label: "What this method requires" },
        { id: "step-by-step", label: "Testing a fuse in-circuit, step by step" },
        { id: "reading-the-result", label: "Reading the result" },
        { id: "standard-method-comparison", label: "When to use the standard method instead" },
      ]}
      faq={[
        {
          q: "Why do I need something switched on for this test to work?",
          a: "Voltage only appears across an open component (like a blown fuse) when current is trying to flow through it from both sides — if nothing downstream is attempting to draw power, you may see no meaningful voltage reading regardless of the fuse's actual condition. Make sure the circuit or device the fuse protects is switched on or actively trying to operate before testing.",
        },
        {
          q: "Is this method safe to use on household mains circuits?",
          a: "It requires working on a live circuit, which carries real risk and should only be done with a meter rated for the voltage and category involved, and with appropriate caution. For low-voltage automotive or electronics fuses this is routine and low-risk; for mains-voltage fuse boxes, many people are better served by switching off power and using the standard removed-fuse continuity test instead.",
        },
        {
          q: "Can a fuse look fine but still be blown?",
          a: "Yes — a visual check isn't always reliable. Some blown fuses show an obviously broken element, but others fail in ways that aren't visible through the fuse body, especially with darker or less transparent fuse housings. A voltage or continuity test is more definitive than a visual inspection alone.",
        },
        {
          q: "What if I read 0V across the fuse but the circuit still doesn't work?",
          a: "A near-0V reading across the fuse indicates the fuse itself is passing current normally, so the fault lies elsewhere in the circuit — a different connector, switch, ground, or component. This test only rules the fuse in or out; it doesn't diagnose the rest of the circuit.",
        },
      ]}
      next={[
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "The OL reading you'd see testing a removed, blown fuse in continuity mode.",
        },
        {
          href: "/multimeters/how-to-test-an-automotive-relay-with-a-multimeter",
          title: "How to Test an Automotive Relay",
          desc: "Another component commonly diagnosed alongside a suspect fuse.",
        },
      ]}
    >
      <Callout title="This method requires a live, energized circuit">
        Unlike a standard continuity check, this test is done with power on. Use a meter rated for the
        voltage and category of the circuit you&apos;re working on, keep fingers clear of any exposed
        conductors, and if you&apos;re not confident working on a live circuit, use the standard
        removed-fuse method instead.
      </Callout>

      <section>
        <h2 id="the-underlying-principle" className="text-xl font-semibold mb-3">The underlying principle</h2>
        <p className="text-muted leading-7">
          A good fuse has extremely low resistance, so when current flows through it, the voltage
          dropped across its two terminals is nearly zero. A blown fuse is an open circuit, so if
          something downstream is still trying to draw current, the full supply voltage appears across
          that open gap instead — the same principle used to test for a voltage drop across any switch
          or contact that should be passing current.
        </p>
        <Figure
          caption={
            <>
              A good fuse passing current drops almost no voltage across itself. A blown fuse, with
              current still trying to flow from the downstream load, shows the full supply voltage
              across its open gap instead.
            </>
          }
        >
          <svg viewBox="0 0 300 130" className="w-full h-auto" role="img" aria-label="Diagram comparing voltage measured across a good fuse versus a blown fuse in a live circuit">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="35" x2="70" y2="35" />
              <rect x="70" y="27" width="40" height="16" rx="3" />
              <line x1="110" y1="35" x2="200" y2="35" />
              <rect x="200" y="20" width="30" height="30" rx="3" />
              <line x1="230" y1="35" x2="260" y2="35" />
              <line x1="260" y1="35" x2="260" y2="80" />
              <line x1="20" y1="35" x2="20" y2="80" />
              <line x1="20" y1="80" x2="260" y2="80" />
            </g>
            <text x="90" y="24" fontSize="9" textAnchor="middle" className="fill-foreground">fuse</text>
            <text x="215" y="14" fontSize="9" textAnchor="middle" className="fill-muted">load (switched on)</text>
            <path d="M70 15 L110 15" className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="90" y="10" fontSize="9" textAnchor="middle" className="fill-accent">probes here</text>
            <text x="90" y="100" fontSize="10" textAnchor="middle" className="fill-foreground">Good fuse: ~0V</text>
            <text x="230" y="100" fontSize="10" textAnchor="middle" className="fill-muted">Blown fuse: full supply voltage</text>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="what-you-need" className="text-xl font-semibold mb-3">What this method requires</h2>
        <p className="text-muted leading-7">
          The circuit must be powered and something downstream must actually be switched on or trying
          to draw current — a fuse protecting a device that&apos;s off won&apos;t show the voltage
          difference this test relies on. You also need safe, direct access to both terminals of the
          fuse itself, which is easiest on blade-style fuses in an accessible holder or panel.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Testing a fuse in-circuit, step by step</StepHeading>
        <p className="text-muted leading-7">
          Switch on whatever the fuse protects, or confirm the circuit is actively trying to draw
          power. Set the multimeter to DC or AC voltage mode as appropriate for the circuit. Touch one
          probe to each terminal of the fuse itself (not across the whole circuit) and read the
          display.
        </p>
      </section>

      <section>
        <h2 id="reading-the-result" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["Reading", "Fuse condition"]}
          rows={[
            ["Near 0V", "Fuse is intact and passing current normally"],
            ["Full supply voltage (e.g. ~12V, ~120V, ~230V)", "Fuse is blown — open circuit, no current passing"],
            ["No meaningful reading either way", "Downstream circuit may not be drawing current — confirm the load is actually switched on"],
          ]}
        />
      </section>

      <section id="standard-method-comparison">
        <KeyIdea title="When to use the standard removed-fuse method instead">
          If working on a live circuit isn&apos;t practical or comfortable, pull the fuse, let the
          circuit de-energize, and test continuity across the fuse directly — see our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            OL reading guide
          </Link>{" "}
          for what that result means. Both methods diagnose the same thing; this page&apos;s method
          simply avoids needing to access and remove the fuse itself.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
