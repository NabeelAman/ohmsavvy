import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to find a broken wire with a multimeter using continuity and voltage-drop tests, and why continuity alone can miss a wire that fails only under load.";

export const metadata = buildMetadata({
  title: "How to Find a Broken Wire With a Multimeter",
  description,
  path: "/multimeters/how-to-find-a-broken-wire-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;

const link = "text-accent hover:underline";

export default function HowToFindABrokenWirePage() {
  return (
    <HowToShell
      title="How to Find a Broken Wire With a Multimeter: Continuity vs. Voltage Drop"
      description={description}
      published="2026-10-25"
      path="/multimeters/how-to-find-a-broken-wire-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          Continuity testing (circuit dead) finds a wire that&apos;s fully open. Voltage-drop testing
          (circuit live and under load) catches something continuity can miss entirely: a connection with
          just a few strands of wire still touching, enough to pass a no-current continuity check but not
          enough to carry the circuit&apos;s real current without a large voltage drop. Knowing when to use
          each one saves real time.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 handles both continuity and voltage-drop testing. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "continuity-test", label: "The continuity test" },
        { id: "voltage-drop-test", label: "The voltage-drop test" },
        { id: "when-to-use-which", label: "When to use which test" },
        { id: "narrowing-it-down", label: "Narrowing down the location" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why would a wire pass a continuity test but still cause problems?",
          a: "A continuity tester's current is tiny, often just a few milliamps, so even a few strands of a partially broken wire can pass it easily. The same connection can still produce a significant voltage drop, and real heat, once the circuit's actual operating current — which can be many times larger — tries to pass through it.",
        },
        {
          q: "Can I do a voltage-drop test on a wire with no load connected?",
          a: "No — voltage drop only appears when current is actually flowing, so the circuit needs to be switched on and doing its normal job (a light actually lit, a motor actually running) during the test. With no load, you'll read 0 V across a damaged wire exactly the same as a perfect one.",
        },
        {
          q: "Is continuity testing ever the better choice?",
          a: "Yes — for a wire you can safely de-energize and where you suspect a complete open rather than a partial one, continuity testing is faster and doesn't require operating the circuit at all. Use it as the quick first check, and move to voltage drop if continuity passes but the symptom persists.",
        },
        {
          q: "How do I find exactly where along a wire it's broken?",
          a: "Test continuity or voltage drop (whichever applies) at a midpoint connector or splice first, then repeat on whichever half still shows the fault, halving the search distance each round rather than checking every point individually from one end.",
        },
        {
          q: "Can moisture cause a wire to test fine when dry but fail when wet?",
          a: "Yes, particularly at a connector or splice with corrosion that only becomes conductive-through-corrosion-products when damp, or a break that's intermittently bridged by moisture. If the fault only shows up in wet conditions, test with the connector wet, or at least suspect this specifically and inspect for moisture ingress.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Broader coverage of opens and shorts, including automotive wiring.",
        },
        {
          href: "/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter",
          title: "How to Test a Car Ground Wire With a Multimeter",
          desc: "A worked example of the voltage-drop-under-load technique.",
        },
      ]}
    >
      <Callout title="De-energize for continuity, energize for voltage drop">
        <ul className="space-y-2 list-disc pl-5">
          <li>Never use the resistance/continuity function on a live circuit — it can give a false reading and risks damaging the meter.</li>
          <li>For a voltage-drop test, keep hands and probes clear of moving parts if the load involves a motor or fan.</li>
          <li>Set the meter to DC millivolts or a low DC volts range for voltage-drop testing; a coarse range can hide a small but real drop.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="continuity-test">The continuity test</StepHeading>
        <p className="text-muted leading-7">
          With the circuit de-energized and disconnected at both ends (or at least the load disconnected),
          set the meter to continuity and touch a probe to each end of the wire. A beep and a low resistance
          reading mean the wire is intact end to end; no beep and an open (OL) reading mean it&apos;s broken
          somewhere along its length.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="voltage-drop-test">The voltage-drop test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the circuit switched on and doing its normal job, set the meter to DC volts (millivolts if
          available) and measure across each connector or splice along the wire&apos;s length, one at a time.
        </p>
        <Figure caption="A perfect connection drops 0 V even under load — any reading here is lost across that specific point.">
          <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of a live circuit with a battery feeding a lamp through a wire and an inline connector; inside the connector only a few strands are still touching; the meter's red probe is on the wire just before the connector and the black probe just after it, and the meter shows an illustrative 1.8 volt drop while a good connection would show close to zero">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="12" y="40" width="40" height="26" rx="3" />
              <line x1="52" y1="53" x2="140" y2="53" />
              <rect x="140" y="40" width="50" height="26" rx="4" />
              <line x1="190" y1="53" x2="280" y2="53" />
              <circle cx="296" cy="53" r="14" />
              <line x1="296" y1="67" x2="296" y2="100" />
              <line x1="32" y1="66" x2="32" y2="100" />
              <line x1="32" y1="100" x2="296" y2="100" />
            </g>
            <g className="stroke-accent" strokeWidth="1.2">
              <line x1="146" y1="50" x2="162" y2="50" />
              <line x1="146" y1="56" x2="160" y2="56" />
              <line x1="184" y1="50" x2="168" y2="50" />
              <line x1="184" y1="56" x2="164" y2="54" />
            </g>
            <text x="32" y="32" fontSize="10" textAnchor="middle" className="fill-foreground">12 V</text>
            <text x="165" y="32" fontSize="10" textAnchor="middle" className="fill-accent">few strands left</text>
            <text x="296" y="57" fontSize="9" textAnchor="middle" className="fill-foreground">lamp</text>
            <circle cx="120" cy="53" r="3" className="fill-accent" />
            <circle cx="210" cy="53" r="3" className="fill-foreground" />
            <line x1="120" y1="56" x2="140" y2="124" className="stroke-accent" strokeWidth="1.4" />
            <line x1="210" y1="56" x2="190" y2="124" className="stroke-foreground" strokeWidth="1.4" />
            <rect x="130" y="124" width="70" height="22" rx="3" className="fill-surface stroke-accent" strokeWidth="1.2" />
            <text x="165" y="139" fontSize="11" textAnchor="middle" className="fill-accent">1.8 V DC</text>
            <text x="12" y="162" fontSize="9" className="fill-muted">Illustrative reading. A sound joint under load: near 0 V</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read the diagram as a series circuit. The battery&apos;s 12 V is shared between everything in the
          loop, so the voltage that appears across the damaged connector is voltage the lamp no longer gets.
          In this illustrative case, 1.8 V lost at the joint leaves roughly 10.2 V for the lamp, which is why
          it glows dim instead of going fully dark. The same joint would beep on a continuity test, because the
          meter&apos;s tiny test current passes through a few strands without any measurable loss.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="when-to-use-which">When to use which test</StepHeading>
        <DataTable
          head={["Situation", "Better test"]}
          rows={[
            ["Suspected complete open, circuit can be de-energized", "Continuity — faster, no load needed"],
            ["Symptom only shows under real operating load", "Voltage drop — catches partial/marginal connections"],
            ["Circuit can't be safely de-energized", "Voltage drop, done carefully"],
            ["Long harness, quick first pass needed", "Continuity first, voltage drop if that passes but the fault persists"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={4} id="narrowing-it-down">Narrowing down the location</StepHeading>
        <p className="text-muted leading-7">
          Whichever test applies, work from a midpoint connector outward rather than testing every inch of
          wire from one end. Once you&apos;ve confirmed which half of the run contains the fault, repeat at
          the midpoint of that half, continuing to divide the remaining distance until you&apos;ve isolated
          the exact section.
        </p>
        <div className="mt-4">
          <KeyIdea title="A break often hides right at a connector or bend">
            Most wire breaks happen at a stress point — inside a connector, at a sharp bend, or where a
            harness passes through a grommet — rather than in the middle of an open run. Check those points
            first.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with continuity beep and a DC millivolt range covers both tests. See the full{" "}
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
              note: "Continuity beep plus fine-resolution DC volts for voltage-drop work.",
            },
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "A budget-friendly option built for this kind of automotive harness chasing.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
