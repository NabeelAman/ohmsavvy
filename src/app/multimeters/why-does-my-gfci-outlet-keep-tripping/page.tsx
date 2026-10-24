import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why does my GFCI outlet keep tripping? Moisture, leaky appliances, downstream outlets, wiring faults, a safe isolation routine and when to call an electrician.";

export const metadata = buildMetadata({
  title: "Why Does My GFCI Outlet Keep Tripping?",
  description,
  path: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
});

const klein = picks.find((p) => p.name === "Klein Tools MM400")!;

const link = "text-accent hover:underline";

/** Hot and neutral both pass through a sensing coil; leakage to ground leaves them unequal. */
function GfciSensingDiagram() {
  return (
    <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Diagram of a GFCI sensing coil around the hot and neutral wires, with leakage current escaping to ground through a faulty appliance">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="55" x2="250" y2="55" />
        <line x1="20" y1="95" x2="250" y2="95" />
        <ellipse cx="110" cy="75" rx="20" ry="38" className="stroke-accent" strokeWidth="2.2" />
        <rect x="250" y="40" width="70" height="70" rx="4" />
        <line x1="285" y1="110" x2="285" y2="140" className="stroke-accent" strokeDasharray="3 2" />
        <line x1="270" y1="140" x2="300" y2="140" />
        <line x1="275" y1="146" x2="295" y2="146" />
        <line x1="280" y1="152" x2="290" y2="152" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="22" y="48">hot (out)</text>
        <text x="22" y="112">neutral (back)</text>
        <text x="285" y="79" textAnchor="middle">appliance</text>
      </g>
      <text x="110" y="28" fontSize="9.5" textAnchor="middle" className="fill-accent">sensing coil</text>
      <text x="246" y="170" fontSize="9.5" textAnchor="end" className="fill-accent">leakage to ground</text>
      <text x="110" y="135" fontSize="9.5" textAnchor="middle" className="fill-muted">out ≠ back → trip</text>
    </svg>
  );
}

export default function WhyDoesMyGfciOutletKeepTrippingPage() {
  return (
    <HowToShell
      title="Why Does My GFCI Outlet Keep Tripping? Causes and Safe Troubleshooting"
      description={description}
      path="/multimeters/why-does-my-gfci-outlet-keep-tripping"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          If your GFCI outlet keeps tripping, it is detecting current that leaves on the hot wire but does not
          come back on the neutral. The usual reasons are water in an outdoor box, an appliance with leaky
          insulation, a fault on an outlet wired downstream of the GFCI, or a wiring mistake. Less often the
          GFCI itself is worn out. Working through them in order, with the power handled safely, usually
          narrows it down. In the UK and Europe the equivalent device is an RCD, and the same logic applies.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            A multimeter confirms whether an outlet is live, but it cannot measure milliamp leakage. See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-senses", label: "How a GFCI decides to trip" },
        { id: "causes", label: "Common causes of repeated tripping" },
        { id: "isolate", label: "Isolate the cause safely" },
        { id: "measuring-leakage", label: "Why a multimeter can't measure the leak" },
        { id: "electrician", label: "When to call an electrician" },
      ]}
      faq={[
        {
          q: "Why does my GFCI trip when it rains?",
          a: "Water getting into an outdoor receptacle, a buried cable splice or an exterior light fitting creates a small path to ground. Once it dries the GFCI resets fine, which is why the problem comes and goes with the weather. Check covers, gaskets and boxes for gaps, and have a damaged outdoor box replaced with one rated for wet locations.",
        },
        {
          q: "Why does a GFCI trip with nothing plugged into it?",
          a: "Either an outlet or fixture wired to its LOAD terminals has a fault, the line and load connections are swapped, a neutral is shared with another circuit, or the GFCI itself has failed. Those all need the box opened, which is work for a licensed electrician if you are not qualified.",
        },
        {
          q: "Can a refrigerator or freezer trip a GFCI?",
          a: "Yes. Motors and compressors can leak a little current through ageing insulation and can upset the sensing as they start. Check your local code and the appliance manual before moving a fridge off GFCI protection, since many locations now require it.",
        },
        {
          q: "How often should I test a GFCI outlet?",
          a: "Manufacturers commonly recommend pressing the TEST button monthly. It should trip and cut power, and RESET should restore it. If it does not trip, or will not reset, replace it.",
        },
        {
          q: "Is it safe to keep resetting a GFCI that trips?",
          a: "Repeated resetting does not fix anything; the device is reporting current going somewhere it should not, which could be through a person. Find the cause before relying on that outlet again.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "Clamping a single conductor safely, and why it differs from a leakage measurement.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Continuity and insulation checks on de-energized cable runs.",
        },
      ]}
    >
      <Callout title="A GFCI trip is a protective device doing its job">
        <ul className="space-y-2 list-disc pl-5">
          <li>Never bypass, tape down or replace a GFCI with a standard outlet to stop the tripping.</li>
          <li>
            Turn the breaker off and confirm the outlet is dead with a tester before removing a cover plate.
          </li>
          <li>
            Opening boxes, rewiring or replacing a GFCI is electrical work. If you are not qualified, or local
            rules require a licensed electrician, hire one.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-senses" className="text-xl font-semibold mb-3">How a GFCI decides to trip</h2>
        <p className="text-muted leading-7 mb-4">
          Both the hot and neutral conductors pass through a small current transformer inside the GFCI. When
          all current returns on the neutral, the two magnetic fields cancel. If some current takes another
          route to ground, through damp insulation, an appliance case or a person, the imbalance induces a
          signal and the device opens the circuit. Class A GFCIs listed to UL 943 are designed to trip at an
          imbalance in the range of roughly 4 to 6 milliamps, well below what a standard breaker reacts to.
        </p>
        <Figure caption={<>Normally the current going out on hot equals the current returning on neutral. Any difference, here leaking to ground through an appliance, trips the GFCI.</>}>
          <GfciSensingDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Common causes of repeated tripping</h2>
        <DataTable
          head={["Cause", "Typical pattern", "Who can check it"]}
          rows={[
            ["Moisture in an outdoor box or receptacle", "Trips after rain, dew or hosing down", "Homeowner can inspect covers; repairs by electrician"],
            ["Appliance with leaky insulation", "Trips when one item is plugged in or switched on", "Homeowner, by unplugging test"],
            ["Fault on a downstream LOAD-side outlet", "Trips with nothing in the GFCI itself", "Electrician"],
            ["Line and load terminals swapped", "Will not reset, or outlet stays dead after reset", "Electrician"],
            ["Shared neutral with another circuit", "Trips when an unrelated circuit is in use", "Electrician"],
            ["Motors and compressors", "Trips at start-up of a pump, fridge or power tool", "Homeowner can identify; appliance repair"],
            ["Worn-out GFCI", "Random tripping, or fails its monthly TEST", "Replace the device"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Remember that one GFCI often protects several outlets further along the circuit, including some in
          other rooms, a garage or outdoors. A fault on any of them trips the GFCI you see.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="isolate">Isolate the cause safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug everything from the GFCI and from every outlet it protects, then press RESET. If it now holds,
          plug items back in one at a time, waiting through a normal operating cycle for each. The item that
          brings the trip back is leaking and should be repaired or retired. If the GFCI trips with nothing
          connected, the fault is in the fixed wiring, a downstream outlet, a wet box or the GFCI itself.
        </p>
        <Figure caption={<>Unplug everything first. If the trip comes back with one appliance, that appliance is the suspect; if it trips with nothing connected, the wiring needs an electrician.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug all", sub: "GFCI and downstream outlets" },
              { label: "Reset", sub: "Does it hold?" },
              { label: "Add back one by one", sub: "Watch for the trip" },
              { label: "Still trips empty", sub: "Wiring or GFCI fault" },
              { label: "Electrician", sub: "Opens boxes, tests wiring" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="measuring-leakage" className="text-xl font-semibold mb-3">Why a multimeter can&apos;t measure the leak</h2>
        <p className="text-muted leading-7 mb-4">
          The leakage that trips a GFCI is a few milliamps flowing between conductors that are live at mains
          voltage. Measuring it with a multimeter&apos;s current range would mean breaking into the live circuit
          and putting the meter in series, which is hazardous and still would not show the hot-minus-neutral
          difference the GFCI responds to. A standard clamp meter around one wire reads load current in amps
          and lacks the resolution for a few milliamps; clamping hot and neutral together cancels the load
          current but leaves too small a residual for most general-purpose clamps to show clearly.
        </p>
        <p className="text-muted leading-7">
          The tools made for this are a leakage current clamp meter, which resolves milliamps with both
          conductors in the jaw, and an insulation resistance tester, which checks a de-energized cable or
          appliance at a raised test voltage. Our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          explains how leakage clamps differ from general-purpose ones, and{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>{" "}
          covers the normal use. A multimeter is still useful for confirming a circuit is dead before work and
          for continuity checks on disconnected cable, as in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires with a multimeter
          </Link>
          .
        </p>
      </section>

      <section id="electrician">
        <KeyIdea title="When to call a licensed electrician">
          Call one if the GFCI trips with nothing plugged in, will not reset, trips when another circuit is
          used, shows scorch marks or warmth at the outlet, or if water has got into a box. The same applies
          if you would need to open a box to go further. An electrician can trace downstream wiring, verify
          the line and load connections, and test insulation properly.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
