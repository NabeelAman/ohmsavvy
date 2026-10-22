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
  "How to check a 12V power supply under load: an unloaded voltage reading can look perfectly fine even on a weak supply — only a loaded measurement reveals real sag.";

export const metadata = buildMetadata({
  title: "How to Check a 12V Power Supply Under Load",
  description,
  path: "/multimeters/how-to-check-a-12v-power-supply-under-load",
});

const astroai = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

export default function HowToCheckA12vPowerSupplyUnderLoadPage() {
  return (
    <HowToShell
      title="How to Check a 12V Power Supply Under Load"
      description={description}
      path="/multimeters/how-to-check-a-12v-power-supply-under-load"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          An open-circuit voltage reading — meter only, nothing else connected — tells you very little
          about whether a 12V supply can actually do its job. A weak battery, an undersized adapter, or
          a supply with excessive internal resistance can all show a perfectly normal 12.6V with nothing
          drawing current, then sag noticeably the moment something real asks it for power.
        </>
      }
      aside={{
        image: astroai.image,
        alt: "AstroAI DM6000AR digital multimeter",
        caption: (
          <>
            Any multimeter&apos;s DC voltage mode works — the technique is in how you load the supply.
            See our{" "}
            <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
              automotive multimeter picks
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-unloaded-voltage-lies", label: "Why an unloaded reading can be misleading" },
        { id: "what-you-need", label: "What you need to load it properly" },
        { id: "step-by-step", label: "Checking a 12V supply under load" },
        { id: "how-much-sag-is-normal", label: "How much sag is actually normal" },
        { id: "interpreting-results", label: "Interpreting the results" },
      ]}
      faq={[
        {
          q: "Can I just use the device I'm troubleshooting as the load?",
          a: "Yes, often that's the most realistic test — it draws exactly the current the real application needs. A dedicated load resistor is useful mainly when you want a precisely known, repeatable current for comparing multiple supplies or batteries against each other.",
        },
        {
          q: "What resistor value should I use as a test load?",
          a: "Pick a resistor using Ohm's law for the current you want to test at: R = V ÷ I. For example, testing at roughly 1A on a 12V supply calls for about a 12Ω resistor, rated for at least the resulting 12W (ideally with headroom above that) so it can dissipate the heat safely.",
        },
        {
          q: "Is sag always a sign the supply is bad?",
          a: "Not always — some sag under load is completely normal and expected, especially on batteries, which have inherent internal resistance that increases somewhat as they discharge or age. The question is whether the sag is small and proportional, or large enough that the voltage drops below what the connected device actually needs to function.",
        },
        {
          q: "Does this same technique apply to testing a car battery?",
          a: "Yes, the same core idea applies, though automotive testing often uses the engine's starter motor itself as a very heavy, brief load (a \"load test\"), or a dedicated battery load tester, rather than a simple resistor — the current demand during cranking is much higher than most bench loads can safely provide.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-voltage-across-a-resistor",
          title: "How to Measure Voltage Across a Resistor",
          desc: "The Ohm's law relationship behind sizing a test-load resistor.",
        },
        {
          href: "/multimeters/unstable-multimeter-readings",
          title: "What Causes Unstable Multimeter Readings?",
          desc: "A supply that sags or fluctuates under varying load can look like a meter problem.",
        },
      ]}
    >
      <section>
        <h2 id="why-unloaded-voltage-lies" className="text-xl font-semibold mb-3">Why an unloaded reading can be misleading</h2>
        <p className="text-muted leading-7">
          With nothing connected but the meter, almost any 12V source can show a voltage that looks
          completely normal — a multimeter draws essentially no current itself, so it doesn&apos;t
          expose weaknesses in the supply&apos;s ability to deliver real current. A supply only reveals
          a problem once something actually asks it to source current, which is exactly what an
          unloaded reading never tests.
        </p>
        <Figure
          caption={
            <>
              The same supply measured two ways: unloaded, the meter alone draws negligible current and
              the reading looks healthy. Loaded, real current flow exposes internal resistance as a
              voltage drop.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram comparing an unloaded voltage reading to a loaded voltage reading on the same 12V supply">
            <g>
              <text x="75" y="20" fontSize="10" textAnchor="middle" className="fill-foreground">Unloaded</text>
              <rect x="30" y="35" width="90" height="30" rx="4" className="fill-none stroke-foreground" strokeWidth="1.5" />
              <text x="75" y="54" fontSize="11" textAnchor="middle" className="fill-foreground">12V supply</text>
              <line x1="120" y1="50" x2="150" y2="50" className="stroke-accent" strokeWidth="2" />
              <text x="75" y="90" fontSize="11" textAnchor="middle" className="fill-accent">Reads: 12.6V</text>
            </g>
            <g>
              <text x="225" y="20" fontSize="10" textAnchor="middle" className="fill-foreground">Loaded</text>
              <rect x="180" y="35" width="90" height="30" rx="4" className="fill-none stroke-foreground" strokeWidth="1.5" />
              <text x="225" y="54" fontSize="11" textAnchor="middle" className="fill-foreground">12V supply</text>
              <rect x="270" y="38" width="22" height="24" className="fill-none stroke-accent" strokeWidth="1.5" />
              <text x="281" y="54" fontSize="8" textAnchor="middle" className="fill-accent">load</text>
              <text x="225" y="90" fontSize="11" textAnchor="middle" className="fill-accent">Reads: 10.8V (sagged)</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section>
        <h2 id="what-you-need" className="text-xl font-semibold mb-3">What you need to load it properly</h2>
        <p className="text-muted leading-7">
          A multimeter with DC voltage mode, and a load that actually draws meaningful current — the
          real device the supply is meant to power, a purpose-built electronic load, or a simple power
          resistor sized with Ohm&apos;s law for the test current you want.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="step-by-step">Checking a 12V supply under load</StepHeading>
        <p className="text-muted leading-7">
          Measure and record the open-circuit voltage with nothing connected but the meter. Connect the
          load, let it draw current for a moment, and measure the voltage again while the load is still
          connected and drawing current. Compare the two readings — the difference is how much the
          supply actually sags under that specific current demand.
        </p>
      </section>

      <section>
        <h2 id="how-much-sag-is-normal" className="text-xl font-semibold mb-3">How much sag is actually normal</h2>
        <DataTable
          head={["Supply type", "Typical acceptable sag", "Notes"]}
          rows={[
            ["Regulated bench/wall supply", "Small, often well under 5% at rated current", "Larger sag suggests an undersized or failing supply"],
            ["Healthy battery, light load", "Small and proportional to current drawn", "Internal resistance naturally rises somewhat with age/discharge"],
            ["Aging or damaged battery", "Noticeably larger, sometimes dramatic", "High internal resistance is a classic sign of a battery nearing end of life"],
          ]}
        />
      </section>

      <Callout title="Match the test current to the real use case">
        A supply that holds up fine at a light test load can still fail under the actual current the
        real application draws. Load-test at a current reasonably close to what the device genuinely
        needs, not an arbitrarily light load that doesn&apos;t represent real conditions.
      </Callout>

      <section>
        <h2 id="interpreting-results" className="text-xl font-semibold mb-3">Interpreting the results</h2>
        <p className="text-muted leading-7">
          Small, proportional sag under a realistic load is normal and expected. Large sag — especially
          voltage dropping well below what the connected device needs to operate correctly — points at
          a genuinely weak supply, a tired battery, or excessive resistance somewhere in the supply
          path (a corroded connector, undersized wiring, or a failing component), worth investigating
          further with a{" "}
          <Link href="/multimeters/how-to-measure-voltage-across-a-resistor" className={link}>
            voltage-drop check
          </Link>{" "}
          along the supply path itself.
        </p>
      </section>

      <KeyIdea title="The core idea">
        An unloaded voltage reading only confirms a supply can produce the right voltage with nothing
        drawing from it — which is the one condition that never actually matters in real use. Testing
        under a realistic load is what actually tells you whether the supply can do its job.
      </KeyIdea>
    </HowToShell>
  );
}
