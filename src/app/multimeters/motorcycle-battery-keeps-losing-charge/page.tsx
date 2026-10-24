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
  "Motorcycle battery keeps losing charge? Check resting voltage, charging voltage, the regulator-rectifier, stator output, connectors and parasitic draw.";

export const metadata = buildMetadata({
  title: "Motorcycle Battery Keeps Losing Charge? Test It",
  description,
  path: "/multimeters/motorcycle-battery-keeps-losing-charge",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function MotorcycleBatteryKeepsLosingChargePage() {
  return (
    <HowToShell
      title="Why Does My Motorcycle Battery Keep Losing Charge? How to Test the Charging System"
      description={description}
      path="/multimeters/motorcycle-battery-keeps-losing-charge"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          When a motorcycle battery keeps losing charge, one of four things is usually to blame: the
          battery can no longer hold energy, the bike isn&apos;t putting energy back while it runs,
          something drains it while parked, or a bad connection sits between them. A digital multimeter
          on DC volts, AC volts and ohms can separate those four in under an hour, and the order you test
          in matters, because a weak battery makes every later reading harder to trust.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter, front view",
        caption: (
          <>
            Every check here uses DC volts, AC volts, resistance or DC current, which any general-purpose
            meter covers. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "battery-condition", label: "Check the battery on its own" },
        { id: "charging-voltage", label: "Measure charging voltage" },
        { id: "regulator-rectifier", label: "Suspect the regulator-rectifier" },
        { id: "stator-check", label: "Quick stator checks" },
        { id: "connectors", label: "Look for burnt connectors" },
        { id: "parasitic-draw", label: "Measure draw while parked" },
        { id: "lithium-batteries", label: "A note on lithium batteries" },
      ]}
      faq={[
        {
          q: "How long should a motorcycle battery hold charge when the bike is parked?",
          a: "A healthy battery on a bike with no accessories and a normal factory standby draw should sit for a few weeks and still start the engine, though cold weather shortens that. If it goes flat in days, measure the parked current draw; if the draw is normal, the battery itself or the charging system is the likelier cause.",
        },
        {
          q: "Can a bad regulator-rectifier kill a brand-new battery?",
          a: "Yes, in either direction. A regulator that stops regulating can push charging voltage too high, which overheats and dries out the battery, while one with a failed rectifier section can undercharge it or let current leak back through it when the engine is off. Fitting a new battery without measuring charging voltage often just repeats the failure.",
        },
        {
          q: "Why does my bike charge fine at high RPM but not at idle?",
          a: "Small permanent-magnet stators make less power at low engine speed, so many bikes only break even with lights and accessories on once revs rise. Heavy accessory loads, a weakening stator or a high-resistance connection all make the idle shortfall worse. Compare your idle and raised-RPM readings with the figures in the service manual.",
        },
        {
          q: "Is it safe to disconnect the battery while the engine is running to test the charging system?",
          a: "No. That old trick removes the battery's buffering effect and can expose the regulator and electronics to voltage spikes. Measure charging voltage at the battery terminals with everything connected instead.",
        },
        {
          q: "Do heated grips or a USB charger drain the battery when the bike is off?",
          a: "Only if they are wired directly to the battery rather than through a switched or ignition-fed circuit. Indicator LEDs, USB sockets and some heated-grip controllers can draw a small current continuously, which matters on a small motorcycle battery. A parked-current measurement shows whether any of them stay powered.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-car-battery-with-a-multimeter",
          title: "How to Test a Car Battery With a Multimeter",
          desc: "The same resting, cranking and charging checks, explained in more detail for 12 V batteries.",
        },
        {
          href: "/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter",
          title: "How to Test a Bridge Rectifier",
          desc: "Diode-mode checks that also explain how the rectifier half of a regulator works.",
        },
      ]}
    >
      <Callout title="Work safely around the running engine">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Run the engine only outdoors or with good ventilation, and keep leads, fingers and clothing away
            from the chain, sprockets and hot exhaust.
          </li>
          <li>
            Shorting the battery terminals with a tool can cause severe burns. Remove rings and watches and
            work on one terminal at a time.
          </li>
          <li>
            Follow the service manual for seat, panel and battery removal, and for any test that involves
            unplugging the regulator or stator.
          </li>
        </ul>
      </Callout>

      <section>
        <Figure
          caption={
            <>
              Test in this order. A failing battery distorts the charging readings, and a charging fault
              can look like a drain if you only check the battery the next morning.
            </>
          }
        >
          <FlowDiagram
            steps={[
              { label: "Battery", sub: "Resting voltage after a full charge" },
              { label: "Charging", sub: "Volts at the battery, idle and raised RPM" },
              { label: "Regulator", sub: "Overcharge, undercharge or leakage" },
              { label: "Stator", sub: "AC output and resistance" },
              { label: "Connectors", sub: "Heat damage between them" },
              { label: "Parked draw", sub: "Current with the key off" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="battery-condition">Check the battery on its own</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Charge the battery fully with a suitable charger, disconnect it or leave the bike off for several
          hours, then read DC volts directly across the posts. A conventional lead-acid or AGM battery at
          full charge typically rests a little above 12.6 V; a reading that sags noticeably overnight with
          nothing connected points at the battery itself rather than the bike. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery with a multimeter
          </Link>{" "}
          walks through the same resting-voltage and cranking checks in more detail.
        </p>
        <p className="text-muted leading-7">
          A voltage reading alone can&apos;t prove capacity. A sulfated battery may show a respectable
          resting figure yet collapse the moment the starter engages, so watch the meter while someone
          presses the starter: a steep dip well below the manual&apos;s cranking figure suggests a worn
          battery.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="charging-voltage">Measure charging voltage at the battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the engine running and the meter on DC volts across the battery posts, take one reading at
          idle and another at the raised RPM the service manual specifies. On many 12 V bikes the figure at
          raised revs settles somewhere around 13.5 to 14.5 V, but the manual&apos;s range for your model is
          the one that counts. Switch the headlight to high beam and repeat, since a marginal system often
          passes with no load and fails with one.
        </p>
        <DataTable
          head={["Reading at raised RPM", "What it usually points to"]}
          rows={[
            ["Within the manual's range, steady", "Charging output is fine; look at the battery or parked draw"],
            ["Barely above resting voltage", "Undercharging: stator, regulator-rectifier or wiring"],
            ["Climbs well above the range as revs rise", "Overcharging: regulator no longer limiting voltage"],
            ["Jumps around or drops with lights on", "Loose or burnt connection, or a weak stator phase"],
          ]}
        />
      </section>

      <section>
        <h2 id="regulator-rectifier" className="text-xl font-semibold mb-3">Suspect the regulator-rectifier</h2>
        <p className="text-muted leading-7 mb-4">
          Most motorcycles use a permanent-magnet alternator: the stator always produces AC in proportion to
          engine speed, and a combined regulator-rectifier turns it into DC and caps the voltage. Many
          common designs regulate by shunting surplus power to ground as heat, so the unit runs hot by
          design, and heat is a leading reason they fail. Mounting spots with poor airflow, missing heat
          sink compound or corroded mounting points all add to the stress.
        </p>
        <p className="text-muted leading-7">
          A failing unit shows up as overcharging, undercharging, or a battery that drains overnight because
          a leaky rectifier diode lets current flow backward with the engine off. The diode section can be
          checked with the meter&apos;s diode mode using the same logic described in our guide to{" "}
          <Link href="/multimeters/how-to-test-a-bridge-rectifier-with-a-multimeter" className={link}>
            testing a bridge rectifier
          </Link>
          , but follow the manual&apos;s terminal table, because pin layouts differ between makers.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="stator-check">Quick stator checks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If charging voltage is low and the regulator is suspect, confirm the stator is actually producing
          power. Unplug the stator connector from the regulator, set the meter to AC volts, and measure
          between each pair of stator wires with the engine running. On a three-phase stator, all three pairs
          should read about the same and rise with RPM. With the engine off, resistance between each pair
          should be low and equal, and there should be no continuity from any stator wire to the engine case.
        </p>
        <Figure
          caption={
            <>
              A three-phase stator has three output wires. Measure AC volts and ohms across each pair (A-B,
              B-C, A-C), then from each wire to ground. One pair reading differently, or any wire showing
              continuity to the case, points to a damaged winding.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Diagram of a three-phase motorcycle stator with three output wires, showing phase-to-phase and phase-to-ground test points">
            <circle cx="70" cy="75" r="45" className="stroke-foreground" strokeWidth="1.6" fill="none" />
            <circle cx="70" cy="75" r="18" className="fill-muted" />
            <text x="70" y="79" fontSize="9" textAnchor="middle" className="fill-foreground">stator</text>
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="112" y1="60" x2="200" y2="40" />
              <line x1="115" y1="75" x2="200" y2="75" />
              <line x1="112" y1="90" x2="200" y2="110" />
            </g>
            <circle cx="203" cy="40" r="3" className="fill-accent" />
            <circle cx="203" cy="75" r="3" className="fill-accent" />
            <circle cx="203" cy="110" r="3" className="fill-accent" />
            <text x="212" y="43" fontSize="10" className="fill-foreground">A</text>
            <text x="212" y="78" fontSize="10" className="fill-foreground">B</text>
            <text x="212" y="113" fontSize="10" className="fill-foreground">C</text>
            <text x="140" y="12" fontSize="9" className="fill-accent">pairs A-B, B-C, A-C:</text>
            <text x="140" y="24" fontSize="9" className="fill-muted">equal AC volts and low ohms</text>
            <line x1="70" y1="120" x2="70" y2="138" className="stroke-foreground" strokeWidth="1.6" />
            <line x1="58" y1="138" x2="82" y2="138" className="stroke-foreground" strokeWidth="1.6" />
            <text x="92" y="141" fontSize="9" className="fill-muted">case: no continuity to A, B or C</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Stator resistance is often a fraction of an ohm, so zero out your test lead resistance first, and
          compare against the manual&apos;s specification rather than a generic number. A dedicated stator
          guide covers interpreting these readings in more depth.
        </p>
      </section>

      <section>
        <h2 id="connectors" className="text-xl font-semibold mb-3">Look for burnt connectors</h2>
        <p className="text-muted leading-7">
          The plug between the stator and the regulator-rectifier carries the full charging current, and a
          slightly loose or corroded pin heats up, which raises resistance, which creates more heat. Look for
          browned or melted plastic, discoloured pins and brittle wire insulation near the plug. A connector
          in that state can starve the battery even when the stator and regulator are both healthy. Replace
          the damaged terminals rather than cleaning them, and check the battery leads and main fuse holder
          for the same signs.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="parasitic-draw">Measure current draw while parked</StepHeading>
        <p className="text-muted leading-7">
          Motorcycle batteries are small, so a standby draw that a car would shrug off can flatten a bike in
          days. Alarms, GPS trackers, USB sockets, heated-grip controllers and some aftermarket gauges are the
          usual suspects, especially when wired straight to the battery. Connect the meter in series at the
          negative terminal, starting on the 10 A range, as described in our guide to{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic battery drain
          </Link>
          , then disconnect accessories one at a time until the reading drops.
        </p>
      </section>

      <section id="lithium-batteries">
        <KeyIdea title="A note on lithium batteries">
          Lithium iron phosphate (LiFePO4) motorcycle batteries rest at a higher voltage than lead-acid and
          have their own state-of-charge chart, so compare readings with the battery maker&apos;s figures.
          They also need a compatible charger: some lead-acid chargers use desulfation or maintenance modes
          that the battery maker warns against. Check that the bike&apos;s charging voltage falls within the
          battery&apos;s accepted range, too.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
