import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a car keeps blowing fuses: check if the replacement is the right rating, then test the circuit's resistance to ground to find the short causing repeat failures.";

export const metadata = buildMetadata({
  title: "Why Does My Car Keep Blowing Fuses?",
  description,
  path: "/multimeters/why-does-my-car-keep-blowing-fuses",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoesMyCarKeepBlowingFusesPage() {
  return (
    <HowToShell
      title="Why Does My Car Keep Blowing Fuses?"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-my-car-keep-blowing-fuses"
      category="multimeters"
      intro={
        <>
          A fuse that blows repeatedly, not just once, usually means there&apos;s an actual short or
          overload somewhere in that circuit rather than a one-off fault. Before anything else, confirm the
          replacement fuse is the correct rating, then test the dead circuit&apos;s resistance to ground to
          confirm and locate a short. If only one circuit on a shared fuse loses power, see{" "}
          <Link href="/multimeters/car-fuse-power-on-one-side-only" className="text-accent hover:underline">
            why a fuse has power on one side only
          </Link>{" "}
          instead.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter",
        caption: (
          <>
            The Craftsman CMMT14171 works well for this kind of chassis and continuity work. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              Craftsman CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "confirm-the-rating", label: "Confirm the fuse rating is correct" },
        { id: "test-dead", label: "Test the circuit with it dead" },
        { id: "isolate-the-load", label: "Isolate the load from the wiring" },
        { id: "common-causes", label: "Common causes of repeat blown fuses" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can using a higher-rated fuse 'fix' the problem?",
          a: "No — a higher-rated fuse just lets more current flow before it opens, which can let a genuine short or overload keep drawing current and risk melting wiring or a component before the fuse ever reacts. Always use the exact rating specified for that circuit.",
        },
        {
          q: "Why did the fuse blow only once, then never again?",
          a: "A one-time surge — a momentary short during a repair, a jump-start done incorrectly, or a static/voltage spike — can blow a fuse without there being an ongoing fault. If the replacement fuse has held since, the circuit may simply have had a one-off event rather than a persistent short.",
        },
        {
          q: "The fuse blows the instant I turn the key, before I do anything else — what does that mean?",
          a: "That points to a short that's present with the circuit essentially unloaded, often a chafed wire touching ground somewhere along its length, rather than a fault that only shows up once a component actually starts drawing current. Go straight to a dead-circuit resistance test rather than trying to reproduce a specific action first.",
        },
        {
          q: "Could an aftermarket accessory be the cause even though it's on its own fuse?",
          a: "Yes, if it shares a fuse with factory circuits, or if its own wiring was tapped into a factory circuit incorrectly during installation. Check exactly what's wired to that fuse slot using the owner's manual's fuse box diagram, not just what you assume is on it.",
        },
        {
          q: "Is it ever normal for a fuse to blow occasionally with no real fault?",
          a: "It can happen with a genuinely borderline-rated circuit running right at the edge of its fuse's rating under peak load (a strong blower motor on its highest setting in extreme heat, for example), but this should be rare, not a repeating pattern. Repeated failures under normal conditions mean something has actually changed or failed.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-find-a-short-circuit-in-a-car-with-a-multimeter",
          title: "How to Find a Short Circuit in a Car With a Multimeter",
          desc: "The full dead-circuit resistance test and narrowing-down procedure.",
        },
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "A faster first check before you start pulling fuses.",
        },
      ]}
    >
      <Callout title="Never upsize a fuse to make it stop blowing">
        <ul className="space-y-2 list-disc pl-5">
          <li>Always replace with the exact amperage rating specified for that circuit, never a higher one.</li>
          <li>Disconnect the battery or pull the fuse before testing resistance on a dead circuit.</li>
          <li>Don&apos;t keep testing with repeated fuses once you&apos;ve confirmed the circuit is actually shorted — move to the resistance test instead.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="confirm-the-rating">Confirm the fuse rating is correct</StepHeading>
        <p className="text-muted leading-7">
          Check the number printed on the blown fuse against the rating shown in the owner&apos;s manual or
          on the fuse box cover for that specific slot. A previous repair using the wrong rating is an easy
          thing to overlook and a common, simple explanation before assuming a wiring fault.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="test-dead" >Test the circuit with it dead</StepHeading>
        <p className="text-muted leading-7">
          With the fuse out, set the meter to resistance or continuity and measure from the load side of the
          fuse socket to a chassis ground point. A healthy circuit reads open (OL); a low reading confirms a
          short. The full procedure, including narrowing it down by unplugging connectors, is covered in{" "}
          <Link href="/multimeters/how-to-find-a-short-circuit-in-a-car-with-a-multimeter" className={link}>
            how to find a short circuit in a car
          </Link>
          .
        </p>
        <div className="mt-6">
          <Figure
            caption={
              <>
                Why the fuse keeps blowing: a chafed wire touching the body gives current a path to ground that
                bypasses the load. With the fuse pulled, the meter between the load-side terminal and chassis
                sees that path as a low resistance instead of OL.
              </>
            }
          >
            <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Diagram of a car circuit: battery feeds a fuse socket, a wire runs to a lamp load that is grounded to the chassis, and partway along the wire the insulation is chafed and touching the body, creating a short to ground; a meter connected from the load side of the empty fuse socket to chassis ground reads a low resistance">
              <g className="stroke-foreground" strokeWidth="1.6" fill="none">
                <rect x="14" y="30" width="44" height="26" rx="3" />
                <line x1="58" y1="43" x2="90" y2="43" />
                <rect x="90" y="33" width="44" height="20" rx="3" strokeDasharray="4 3" />
                <line x1="134" y1="43" x2="300" y2="43" />
                <circle cx="300" cy="62" r="14" />
                <line x1="300" y1="76" x2="300" y2="120" />
                <line x1="10" y1="120" x2="330" y2="120" strokeWidth="2.4" />
              </g>
              <g className="stroke-accent" strokeWidth="2" fill="none">
                <path d="M210 43 L 216 70 L 206 92 L 214 120" />
              </g>
              <text x="36" y="24" fontSize="10" textAnchor="middle" className="fill-foreground">battery</text>
              <text x="112" y="24" fontSize="10" textAnchor="middle" className="fill-muted">fuse removed</text>
              <text x="300" y="66" fontSize="9" textAnchor="middle" className="fill-foreground">load</text>
              <text x="222" y="84" fontSize="10" className="fill-accent">chafed wire to body</text>
              <text x="170" y="136" fontSize="10" textAnchor="middle" className="fill-muted">chassis ground</text>
              <circle cx="134" cy="43" r="3" className="fill-accent" />
              <line x1="134" y1="46" x2="134" y2="100" className="stroke-accent" strokeWidth="1.4" strokeDasharray="2 2" />
              <rect x="104" y="100" width="60" height="16" rx="3" className="fill-surface stroke-accent" strokeWidth="1.2" />
              <text x="134" y="112" fontSize="9" textAnchor="middle" className="fill-accent">meter: 0.3 Ω</text>
              <text x="14" y="164" fontSize="9" className="fill-muted">Illustrative value. Load unplugged + healthy wiring = OL</text>
            </svg>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          A useful rule of thumb when reading that number: an incandescent bulb or small motor in the circuit
          usually measures somewhere from a fraction of an ohm to a few tens of ohms, so first unplug the load
          and then measure. With the load disconnected, anything other than OL from the fuse&apos;s load
          terminal to ground means copper is touching metal somewhere along the run.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="isolate-the-load">Isolate the load from the wiring</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the resistance test shows a short, unplug the component the circuit feeds and test again. If
          the short disappears once the component is unplugged, the fault is inside that component rather
          than the wiring between it and the fuse box.
        </p>
        <DataTable
          head={["Where the short is found", "Next step"]}
          rows={[
            ["In the wiring harness", "Inspect for chafing at bends, grommets, and pinch points"],
            ["Inside the component itself", "Repair or replace the component"],
            ["Only with the component plugged in and running", "Suspect an internal short that only shows under load"],
          ]}
        />
      </section>

      <section>
        <h2 id="common-causes" className="text-xl font-semibold mb-3">Common causes of repeat blown fuses</h2>
        <p className="text-muted leading-7 mb-4">
          Aftermarket wiring run without proper grommets or loom, a harness pinched during a recent repair or
          panel removal, rodent damage to insulation, and a failing component that has developed an internal
          short are the usual suspects.
        </p>
        <div className="mt-4">
          <KeyIdea title="Check recent work first">
            If the fuse started blowing shortly after a repair, accessory install, or panel work, start your
            inspection at whatever was touched most recently — it&apos;s a far more common cause than a
            spontaneous wiring failure.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with continuity and resistance ranges handles this test. See the full{" "}
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
              note: "Built for automotive circuit diagnosis.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Auto-ranging resistance and continuity.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
