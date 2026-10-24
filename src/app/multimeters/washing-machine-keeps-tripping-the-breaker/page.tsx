import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a washing machine keeps tripping the breaker: match the trip to the cycle stage, tell leakage from overcurrent, and run safe unplugged resistance checks.";

export const metadata = buildMetadata({
  title: "Washing Machine Keeps Tripping the Breaker",
  description,
  path: "/multimeters/washing-machine-keeps-tripping-the-breaker",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Wash cycle timeline with the component most often responsible at each stage. */
function CycleTimeline() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" role="img" aria-label="Timeline of a wash cycle showing which component is most often behind a trip at plug-in, fill, heating and spin">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="60" x2="320" y2="60" />
        <circle cx="40" cy="60" r="6" className="fill-surface" />
        <circle cx="120" cy="60" r="6" className="fill-surface" />
        <circle cx="210" cy="60" r="6" className="fill-surface" />
        <circle cx="295" cy="60" r="6" className="fill-surface" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="40" y="40">Plug-in</text>
        <text x="120" y="40">Fill</text>
        <text x="210" y="40">Heat</text>
        <text x="295" y="40">Spin</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="40" y="88">filter, cord</text>
        <text x="40" y="102">wet wiring</text>
        <text x="120" y="88">inlet valve</text>
        <text x="120" y="102">leak onto parts</text>
        <text x="295" y="88">motor</text>
        <text x="295" y="102">brushes, wiring</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="210" y="88">heating element</text>
        <text x="210" y="102">leak to earth</text>
      </g>
      <text x="170" y="138" fontSize="9.5" textAnchor="middle" className="fill-muted">Stage of cycle when it trips → part to check first</text>
    </svg>
  );
}

export default function WashingMachineKeepsTrippingTheBreakerPage() {
  return (
    <HowToShell
      title="Why Does a Washing Machine Keep Tripping the Breaker? Electrical Fault Diagnosis"
      description={description}
      path="/multimeters/washing-machine-keeps-tripping-the-breaker"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          A washing machine that keeps tripping the breaker almost always has a fault that shows up at a
          particular stage of the cycle. Noting exactly when it trips, at plug-in, during the fill, once
          heating starts or on the spin, narrows the list to one or two parts. The next clue is which device
          trips: an RCD or GFCI points to leakage to earth, while a standard breaker points to too much
          current. A multimeter then lets you check the likely parts with the machine unplugged.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            Every check on this page is a resistance test on an unplugged machine. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "when-it-trips", label: "When it trips: a diagnostic map" },
        { id: "which-device", label: "RCD/GFCI trip or breaker trip?" },
        { id: "element-check", label: "Check the element to chassis" },
        { id: "other-parts", label: "Motor, filter, door lock and leaks" },
        { id: "shared-circuit", label: "Rule out an overloaded circuit" },
        { id: "limits", label: "What a multimeter can miss" },
      ]}
      faq={[
        {
          q: "Why does my washing machine trip the electrics as soon as I plug it in?",
          a: "A trip before any program starts points to the mains side: the power cord, the plug, the interference suppressor or filter near the cord entry, or wiring that has got wet. Leave the machine unplugged and have it inspected before trying again.",
        },
        {
          q: "Can a washing machine trip the breaker because of a water leak?",
          a: "Yes. A leaking hose, pump seal or door seal can drip onto the pump, motor connections or wiring loom and create a path to the earthed chassis. Look for water marks, rust or limescale trails inside the base and on connectors.",
        },
        {
          q: "My heating element tested fine. Why does it still trip when heating?",
          a: "A multimeter checks insulation at only a few volts, so an element can pass cold and still leak at mains voltage when hot. An insulation resistance test by a technician is the definitive check. The wiring and connector to the element are also worth inspecting.",
        },
        {
          q: "Is it safe to keep resetting the breaker and running the wash?",
          a: "No. A trip means the protection found a fault, and an earth leakage fault can put the metal cabinet at a dangerous voltage. Leave the machine unplugged until the cause is found and fixed.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter",
          title: "How to Test a Washing Machine Heating Element",
          desc: "The full resistance and earth test of the element itself, with expected values.",
        },
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "How earth leakage protection works, and how to isolate the cause.",
        },
      ]}
    >
      <Callout title="Unplug before every check">
        <ul className="space-y-2 list-disc pl-5">
          <li>Pull the plug from the wall socket before removing any panel. Switching the dial off is not enough.</li>
          <li>Never run the machine with panels removed to watch for the fault.</li>
          <li>
            If you are not comfortable working inside an appliance, a qualified appliance technician should
            carry out these tests.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="when-it-trips" className="text-xl font-semibold mb-3">When it trips: a diagnostic map</h2>
        <p className="text-muted leading-7 mb-4">
          Run through the timing in your head, or from memory of the last few failed washes, and match it
          against the table. The stage where the trip happens is the single most useful clue you have.
        </p>
        <DataTable
          head={["When it trips", "Most likely suspects"]}
          rows={[
            ["Instantly at plug-in or switch-on", "Mains cord, suppressor/EMI filter, wet wiring, door lock"],
            ["During the fill", "Inlet valve coil, water leaking onto wiring or pump"],
            ["When water starts to heat", "Heating element leaking to earth, element wiring"],
            ["During wash tumble or spin", "Motor windings, brushes, motor wiring, drain pump"],
            ["Randomly, often with other appliances on", "Overloaded or shared circuit"],
          ]}
        />
        <Figure caption={<>Each stage of the cycle switches in different parts, so the moment of the trip points to the part to test first.</>}>
          <CycleTimeline />
        </Figure>
      </section>

      <section>
        <h2 id="which-device" className="text-xl font-semibold mb-3">RCD/GFCI trip or breaker trip?</h2>
        <p className="text-muted leading-7">
          Look at the panel after a trip. If an RCD, GFCI or combined RCBO has operated, it saw current leaking
          to earth, so the fault is insulation breaking down somewhere. If a plain circuit breaker tripped, the
          circuit drew more current than its rating, from a short between conductors, a seized motor or too
          many loads on one circuit. Telling these apart halves the search. For how leakage sensing works, see{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI outlet keeps tripping
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="element-check">Check the heating element to chassis</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If it trips once heating begins, the element is the first suspect. With the machine unplugged and the
          back panel off, pull the wires off the element, set the meter to its highest resistance range, and
          measure from each element terminal to the earth stud or bare metal of the flange. A healthy element
          shows OL to earth on both terminals. Any resistance reading means the insulation inside the sheath is
          leaking. Our separate guide on{" "}
          <Link href="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter" className={link}>
            testing a washing machine heating element
          </Link>{" "}
          covers the element itself, including the expected resistance across its terminals.
        </p>
        <Figure caption={<>From an element terminal to its earth stud: OL is what you want (first reading). A finite reading, whatever its size, indicates leakage (second reading).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="MΩ" mode="Ω  terminal to earth" />
            <MeterReadout value="0.48" unit="MΩ" mode="Ω  leaking to earth" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="other-parts">Check the motor, filter, door lock and leaks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For a trip on tumble or spin, unplug the motor connector and measure from each motor terminal to the
          motor frame; again, anything other than OL is suspect. Brushed motors also shed carbon dust that can
          bridge to the case. The method is the same one used in{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            how to check a motor winding for a short
          </Link>
          .
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Suppressor or EMI filter:</span> the small block where the mains
            cord enters. Its internal capacitors connect to earth by design, and when they fail they can trip
            protection the moment the machine is plugged in.
          </li>
          <li>
            <span className="text-foreground">Door lock:</span> a mains-powered interlock that can short if
            water or detergent gets inside.
          </li>
          <li>
            <span className="text-foreground">Water damage:</span> inspect the base, the pump and every
            connector for drips, corrosion or limescale tracking. Dry and clean affected parts, and replace any
            that are corroded.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="shared-circuit" className="text-xl font-semibold mb-3">Rule out an overloaded circuit</h2>
        <p className="text-muted leading-7">
          A washer with a heating element draws a substantial current. If a dryer, dishwasher, kettle or heater
          shares the same circuit, the total can exceed the breaker rating even with every appliance healthy.
          The giveaway is a plain breaker trip that only happens when other loads run at the same time. Running
          the washer alone, or having an electrician check the circuit layout, settles it.
        </p>
        <p className="text-muted leading-7 mt-4">
          Also look at the socket and plug. Scorching, a loose fit or a plug that feels warm after a wash
          suggests a poor connection, which heats up under load. Extension leads and multi-way adaptors are a
          common weak point for high-current appliances, and the machine&apos;s manual usually asks for it to
          be plugged straight into a wall socket. A damaged socket or plug is a job for an electrician, not
          something to keep resetting around.
        </p>
      </section>

      <section id="limits">
        <KeyIdea title="A multimeter can pass a part that still leaks">
          The ohms range tests insulation with only a few volts. Some faults, such as a cracked element sheath
          or damp motor windings, only conduct at mains voltage or when hot. An insulation resistance tester
          applies a much higher test voltage to a de-energized part and is the proper tool for this job. If
          every multimeter check passes and the trips continue, call an appliance technician or electrician.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
