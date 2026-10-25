import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why your EV charger keeps tripping the breaker: the 80% continuous-load rule, GFCI breakers vs the charger's own fault protection, hot plugs and safe checks.";

export const metadata = buildMetadata({
  title: "Why Does My EV Charger Keep Tripping the Breaker?",
  description,
  path: "/multimeters/why-does-my-ev-charger-keep-tripping-the-breaker",
});

const all = getAllPicks("multimeters");
const fluke323 = all.find((p) => p.name === "Fluke 323")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;

const link = "text-accent hover:underline";

/** Where the charging current can be interrupted: panel breaker, the EVSE's own relay, or the car. */
function ProtectionChainDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of the three places an EV charging session can be stopped: the panel breaker, the charger's internal ground-fault relay, and the car's onboard charger">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="14" y="45" width="70" height="60" rx="4" />
        <rect x="135" y="45" width="70" height="60" rx="4" />
        <rect x="256" y="45" width="70" height="60" rx="4" />
        <line x1="84" y1="68" x2="135" y2="68" />
        <line x1="84" y1="82" x2="135" y2="82" />
        <line x1="205" y1="75" x2="256" y2="75" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="49" y="72">Panel</text>
        <text x="49" y="86">breaker</text>
        <text x="170" y="72">Charger</text>
        <text x="170" y="86">(EVSE)</text>
        <text x="291" y="72">Car</text>
        <text x="291" y="86">onboard</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="49" y="30">overcurrent,</text>
        <text x="49" y="40">GFCI if fitted</text>
        <text x="170" y="30">ground-fault</text>
        <text x="170" y="40">monitor + relay</text>
        <text x="291" y="30">schedule, heat,</text>
        <text x="291" y="40">charge limit</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="49" y="125">charger goes dark</text>
        <text x="170" y="125">fault light, retries</text>
        <text x="291" y="125">app shows paused</text>
      </g>
      <text x="170" y="158" fontSize="9.5" textAnchor="middle" className="fill-muted">What the charger&apos;s display does tells you which stage acted</text>
    </svg>
  );
}

export default function WhyDoesMyEvChargerKeepTrippingTheBreakerPage() {
  return (
    <HowToShell
      title="Why Does My EV Charger Keep Tripping the Breaker?"
      description={description}
      path="/multimeters/why-does-my-ev-charger-keep-tripping-the-breaker"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          When an EV charger keeps tripping the breaker, the cause is usually one of four things: a circuit
          sized too close to the charger&apos;s output for a load that runs for hours, a GFCI breaker arguing
          with the charger&apos;s own ground-fault protection, a connection that heats up under sustained
          current, or a real fault in the cable, charger or car. Before blaming the breaker, confirm it actually
          tripped. Plenty of &quot;the charger keeps cutting out&quot; complaints turn out to be the charger or
          the car pausing the session, with the breaker never moving.
        </>
      }
      aside={{
        image: fluke323.image,
        alt: "Fluke 323 True RMS clamp meter",
        caption: (
          <>
            A clamp meter reads current without opening a circuit, but on a charger only an electrician should
            clamp the feeder conductors. See{" "}
            <Link href="/multimeters/fluke-117-vs-fluke-323" className={link}>
              Fluke 117 vs Fluke 323
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "breaker-or-charger", label: "Did the breaker trip, or did charging stop?" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "continuous-load", label: "The 80% continuous-load rule" },
        { id: "gfci-stacking", label: "GFCI breakers and built-in charger protection" },
        { id: "homeowner-checks", label: "Safe checks you can make" },
        { id: "meter-checks", label: "Meter checks at a plug-in charger" },
        { id: "electrician", label: "When an electrician should investigate" },
      ]}
      faq={[
        {
          q: "Can I just put a bigger breaker on my EV charger circuit?",
          a: "No. The breaker protects the wire, so its size is set by the conductor gauge, the receptacle rating and the charger's instructions. A larger breaker on the same wire lets that wire overheat before anything trips. If the charger needs more capacity, an electrician has to check the wiring and the panel's spare capacity first.",
        },
        {
          q: "Why does my charger trip only on hot days or late in a long session?",
          a: "Heat builds at any weak connection the longer full current flows, and a breaker's thermal element reacts to its own temperature too. A trip that arrives an hour or more into charging points to sustained loading or a warm termination rather than a sudden fault. Have the receptacle, plug and breaker connections checked.",
        },
        {
          q: "My Level 1 charger trips the garage outlet. Is that normal?",
          a: "A Level 1 cord set commonly draws around 12 A, which leaves little room on a 15 A circuit already feeding a freezer, lights or a garage door opener. Try it on a circuit with nothing else running, and read the cord set's manual for its current setting. If it still trips with the circuit to itself, have the outlet and circuit inspected.",
        },
        {
          q: "Should I reset the breaker and try again tonight?",
          a: "One reset to see whether the trip repeats is reasonable if there is no heat, smell or damage at the plug, receptacle or charger. If it trips again, or anything looks or smells scorched, leave it off and book an electrician.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-a-circuit-breaker-keep-tripping",
          title: "Why Does a Circuit Breaker Keep Tripping?",
          desc: "Overload, short circuit and ground fault trips on ordinary household circuits.",
        },
        {
          href: "/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause",
          title: "Why Does My AFCI Breaker Keep Tripping?",
          desc: "Arc-fault trips, damaged cords, loose terminations and shared neutrals.",
        },
      ]}
    >
      <Callout title="Stop and call an electrician if you notice any of these">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A burning or hot-plastic smell, discolored or melted plastic on the plug or receptacle, or a plug
            too hot to hold after charging.
          </li>
          <li>
            Crackling or buzzing from the receptacle, charger or panel. If it is safe to reach, switch off the
            main breaker. For smoke or fire, get out and call 911.
          </li>
          <li>
            Never open the charger, the panel or its cover. Charger internals, breaker terminations and the
            feeder wiring are work for a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="breaker-or-charger" className="text-xl font-semibold mb-3">Did the breaker trip, or did charging stop?</h2>
        <p className="text-muted leading-7 mb-4">
          Three separate things can end a charging session, and each leaves a different trace. If the panel
          breaker opened, the charger loses power completely: its lights go out, its app reports it offline,
          and the breaker handle sits in the tripped (middle) or OFF position. If the charger&apos;s own
          ground-fault monitor or self-test acted, the unit stays powered but shows a fault light or error
          code, and many units retry after a delay. If the car ended the session, the charger looks normal and
          the vehicle app typically says charging is paused, scheduled or complete.
        </p>
        <p className="text-muted leading-7 mb-4">
          Write down what you saw before you reset anything. A dark charger, a blinking red status light and a
          car showing &quot;charge scheduled&quot; are three different problems, and only the first is the
          breaker. Time-of-use schedules, a lowered charge limit, utility demand-response programs and battery
          temperature management can all stop a session without any electrical fault at all.
        </p>
        <Figure caption={<>An EV charging session can be ended by the panel breaker, the charger&apos;s internal protection, or the car. Whether the charger stays lit tells you which.</>}>
          <ProtectionChainDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Breaker trips after 30+ minutes at full rate", "Circuit loaded past its continuous rating, or a warm connection", "Charger current setting vs breaker size; plug warmth", "Electrician"],
            ["Breaker trips within seconds of plugging in", "GFCI breaker reacting to the charger, or a cable/charger fault", "Breaker type (TEST button?); charger error code", "Electrician; charger maker"],
            ["Trips only when dryer, range or AC also runs", "Panel or service near its capacity", "Which large loads overlap with charging", "Electrician (load calculation)"],
            ["Charger shows a fault light, breaker still on", "Charger's ground-fault or self-test tripped", "Error code in the manual or app", "Charger manufacturer"],
            ["Charging pauses, charger and breaker normal", "Car schedule, charge limit, utility program", "Vehicle and charger app settings", "Owner settings"],
            ["Plug or receptacle discolored or hot", "Loose or worn receptacle terminal", "Look only; do not keep charging", "Electrician"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The timing is the most useful clue you have. An instant trip suggests something that sees a fault
          immediately, such as a ground-fault device or a damaged cable. A trip that builds up over time points
          to heat, which means either too much current for too long or resistance at a connection.
        </p>
      </section>

      <section>
        <h2 id="continuous-load" className="text-xl font-semibold mb-3">The 80% continuous-load rule</h2>
        <p className="text-muted leading-7 mb-4">
          EV charging is treated as a continuous load because it can run at full output for three hours or
          more. Under the US National Electrical Code, branch circuits for continuous loads are generally sized
          so the load is no more than 80% of the breaker rating, which is the same as sizing the circuit at
          125% of the load. In practice that is why a charger delivering 48 A sits on a 60 A circuit, and why a
          charger set to 40 A on a 40 A breaker is a mismatch even if it works for a while. Exact requirements
          depend on the code edition your area has adopted and on the charger&apos;s installation manual, so
          treat the figures below as typical examples rather than a design table.
        </p>
        <Figure caption={<>Typical maximum continuous charger current for common breaker sizes (80% of the rating). Your installation manual and local code govern the actual setting.</>}>
          <BarChart
            items={[
              { label: "20 A breaker (120 V L1)", value: 16, display: "16 A max" },
              { label: "40 A breaker", value: 32, display: "32 A max" },
              { label: "50 A breaker", value: 40, display: "40 A max", highlight: true },
              { label: "60 A breaker", value: 48, display: "48 A max" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Many wall chargers can be configured for a lower output, through an app, a setup screen or settings
          inside the unit. Read the configured value in the app if it is shown. If the charger is set higher
          than 80% of its breaker, or nobody recorded what it was set to, that is the first thing to raise with
          the electrician. Changing internal switches or wiring is part of the installation, not a homeowner
          task. Lowering the output in the app, where the maker allows it, is a reasonable stopgap while you
          wait.
        </p>
      </section>

      <section>
        <h2 id="gfci-stacking" className="text-xl font-semibold mb-3">GFCI breakers and built-in charger protection</h2>
        <p className="text-muted leading-7 mb-4">
          EV chargers include their own personnel protection: a ground-fault monitor that opens the
          charger&apos;s internal relay if current leaks to ground, plus a check that the ground connection is
          present. Separately, recent code editions require GFCI protection for many 240 V receptacles in
          garages and outdoors, so a plug-in charger on a NEMA 14-50 receptacle is often fed through a GFCI
          breaker. The GFCI breaker typically trips at a much lower leakage level than the charger&apos;s own
          monitor, and the charger&apos;s filtering and self-test can register as leakage to it. The result is a
          breaker that trips right as charging begins, with no damage anywhere.
        </p>
        <p className="text-muted leading-7">
          This combination is common enough that several charger makers address it in their installation
          guides. Possible fixes, such as a different receptacle setup or a hardwired installation where your
          code allows it, are design decisions for a licensed electrician and the local inspector. Never swap a
          GFCI breaker for a standard one yourself to stop the tripping. For how the leakage sensing works, see{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI outlet keeps tripping
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={1} id="homeowner-checks">Safe checks you can make</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Read the breaker face.</span> Through the panel door, without
            removing anything, note the breaker&apos;s amp rating and whether it has a TEST button (GFCI or
            dual-function) or a trip indicator window.
          </li>
          <li>
            <span className="text-foreground">Read the charger.</span> Record any status light pattern or error
            code and look it up in the manual or the maker&apos;s app before power-cycling it.
          </li>
          <li>
            <span className="text-foreground">Look at the plug and receptacle.</span> After a session, with the
            charger switched off at the breaker, check for browning, warping or a loose fit. Don&apos;t keep
            unplugging and replugging a 50 A plug as a test; receptacle contacts wear.
          </li>
          <li>
            <span className="text-foreground">Note overlapping loads.</span> If trips line up with the dryer,
            oven, water heater or air conditioner, the panel may be near its limit. Scheduling charging
            overnight, when those loads are idle, is a sensible interim step.
          </li>
          <li>
            <span className="text-foreground">Inspect the cable.</span> A crushed, cut or kinked charging
            cable or connector is a reason to stop using the charger and contact the manufacturer.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="meter-checks">Meter checks at a plug-in charger</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With a plug-in charger, you can confirm the receptacle has a healthy supply. Use a meter rated CAT III
          for the voltage, intact test leads with finger guards, safety glasses, and keep one hand away from
          the box. Switch the breaker off, unplug the charger, switch the breaker back on, and place the probes
          in the receptacle slots. On a NEMA 14-50, expect roughly 240 V between the two hot slots, roughly
          120 V from each hot to the neutral (the slot diagram in the charger manual shows which is which),
          and close to 0 V from neutral to the ground pin. US nominal service is 120/240 V, and readings within
          about 5% are normal under ANSI C84.1.
        </p>
        <Figure caption={<>Healthy NEMA 14-50 readings with the charger unplugged: about 240 V hot to hot (left) and near zero neutral to ground (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="241.3" unit="V~" mode="V AC  hot to hot" />
            <MeterReadout value="0.4" unit="V~" mode="V AC  neutral to ground" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A missing hot, a neutral-to-ground voltage of more than a few volts, or a big imbalance between the
          two hot-to-neutral readings is a wiring problem for the electrician. Note that many chargers do not
          use the neutral at all, so a fault there may not explain the trip, but it is still worth reporting.
        </p>
        <p className="text-muted leading-7 mt-4">
          What you shouldn&apos;t do is measure current on a Level 2 charger yourself. The individual
          conductors are only reachable inside the panel or the charger, and clamping a whole cable reads zero
          because the currents cancel, as explained in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          . The charger or car app usually reports the actual charging current, which is enough to compare
          against the breaker. A Level 1 cord set is different: plugged through a line splitter, it can be
          clamped safely at the 120 V outlet, and that reading tells you how much of a 15 A or 20 A circuit it
          takes.
        </p>
      </section>

      <section id="electrician">
        <KeyIdea title="When an electrician should investigate">
          Book a licensed electrician if the breaker trips more than once, if the charger is set above 80% of
          the breaker, if you find any heat damage at the plug or receptacle, if a GFCI breaker trips at the
          start of every session, or if you can&apos;t tell how the circuit was sized. They can verify the
          conductor size, torque the terminations, check the panel&apos;s load calculation and talk through
          load-management options. Contact the charger manufacturer for repeated internal fault codes, and the
          utility if voltage at the receptacle is outside the normal range on every circuit. Related reading:{" "}
          <Link href="/multimeters/why-is-my-breaker-panel-buzzing" className={link}>
            why a breaker panel buzzes
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations at home
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for checking a charger circuit"
          items={[
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "True RMS, CAT IV 600V / CAT III 1000V, with LoZ mode. Enough rating margin for 240 V receptacle checks.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 clamp meter",
              href: "/multimeters/fluke-117-vs-fluke-323",
              note: "True RMS AC clamp to 400A, CAT III 600V / CAT IV 300V. For Level 1 cord sets on a line splitter.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "Budget AC/DC clamp with inrush, LoZ and NCV, rated CAT IV 600V / CAT III 1000V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
