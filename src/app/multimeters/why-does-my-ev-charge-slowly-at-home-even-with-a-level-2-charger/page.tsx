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
  "Why your EV charges slowly at home on Level 2: the charger's pilot limit, breaker size, 208 V vs 240 V, car settings, battery temperature and load management.";

export const metadata = buildMetadata({
  title: "Why Does My EV Charge Slowly at Home?",
  description,
  path: "/multimeters/why-does-my-ev-charge-slowly-at-home-even-with-a-level-2-charger",
});

const all = getAllPicks("multimeters");
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;

const link = "text-accent hover:underline";

/** The car charges at the lowest of three ceilings: circuit, charger setting and the car's onboard charger. */
function LowestLimitDiagram() {
  return (
    <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Diagram showing three current ceilings, the circuit breaker, the charger's pilot signal and the car's onboard charger, with the actual charging rate set by the lowest of them">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="150" x2="320" y2="150" />
        <rect x="40" y="40" width="60" height="110" />
        <rect x="140" y="62" width="60" height="88" />
        <rect x="240" y="84" width="60" height="66" className="stroke-accent" strokeWidth="2.4" />
        <line x1="20" y1="84" x2="320" y2="84" className="stroke-accent" strokeDasharray="4 3" />
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-foreground">
        <text x="70" y="166">Circuit</text>
        <text x="170" y="166">Charger pilot</text>
        <text x="270" y="166">Car onboard</text>
      </g>
      <g fontSize="9" textAnchor="middle" className="fill-muted">
        <text x="70" y="32">e.g. 40 A breaker</text>
        <text x="170" y="54">e.g. set to 32 A</text>
      </g>
      <text x="270" y="76" fontSize="9" textAnchor="middle" className="fill-accent">e.g. 24 A max</text>
      <text x="170" y="16" fontSize="9.5" textAnchor="middle" className="fill-accent">actual rate = the lowest ceiling</text>
    </svg>
  );
}

export default function WhyDoesMyEvChargeSlowlyAtHomePage() {
  return (
    <HowToShell
      title="Why Does My EV Charge Slowly at Home Even With a Level 2 Charger?"
      description={description}
      path="/multimeters/why-does-my-ev-charge-slowly-at-home-even-with-a-level-2-charger"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          If your EV charges slowly at home even with a Level 2 charger, the car is almost always obeying a
          limit somewhere in the chain rather than suffering a fault. The charging rate is set by whichever is
          lowest: the current the charger advertises to the car, the current the circuit was built for, the
          maximum the car&apos;s onboard charger accepts, and any cap set in the car&apos;s menus or by a
          schedule. Supply voltage, battery temperature and home load management then shave it further. Most
          of these can be found from the charger and vehicle apps without touching any wiring.
        </>
      }
      aside={{
        image: mm720.image,
        alt: "Klein Tools MM720 digital multimeter",
        caption: (
          <>
            A CAT III meter tells you whether a plug-in charger&apos;s receptacle gets 208 V or 240 V. See{" "}
            <Link href="/multimeters/best-multimeters-for-electricians-under-100" className={link}>
              budget-friendly meters for electricians
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "power-math", label: "What Level 2 should deliver" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "pilot", label: "The pilot signal and the lowest-limit rule" },
        { id: "voltage", label: "208 V vs 240 V supply" },
        { id: "car-side", label: "Car settings, temperature and schedules" },
        { id: "homeowner-checks", label: "Checks from the apps" },
        { id: "meter-checks", label: "Meter checks at a plug-in charger" },
        { id: "who-to-call", label: "Who to call" },
      ]}
      faq={[
        {
          q: "My charger is rated 48 A. Why does the car only take 32 A?",
          a: "Either the charger was configured for a lower output at installation, usually to match a smaller breaker, or the car's onboard charger can't accept more than about 32 A. Check the configured current in the charger app and the maximum AC charging rate in your car's specifications. A 48 A unit needs a circuit sized for it and a car that can use it.",
        },
        {
          q: "Is charging at 208 V harmful to the car?",
          a: "No. Level 2 equipment and onboard chargers are designed to run on 208 V as well as 240 V. The only effect is that the same current carries less power, so a session takes longer. If your home is a single-family house that should have 240 V, a 208 V reading is worth asking an electrician or the utility about.",
        },
        {
          q: "Why is charging fast at first and slow near the end?",
          a: "As the battery approaches its target, the car's battery management reduces the charging current to protect the cells, and the last few percent can take noticeably longer. That's normal. Many owners set a daily limit below 100% for battery longevity, which also avoids most of the slow tail.",
        },
        {
          q: "Would a more expensive charger make my car charge faster?",
          a: "Only if the charger is the lowest limit today. If your car's onboard charger tops out at 32 A, or your circuit can only support a 32 A setting, a 48 A charger will still deliver 32 A. Find the bottleneck first, then decide whether any hardware change helps.",
        },
        {
          q: "Can a long wire run from the panel slow down EV charging?",
          a: "Slightly. Every foot of copper adds resistance, so a long run to a detached garage drops some voltage under a 32 A or 40 A load, and charging power falls in proportion. A 3% drop on a 240 V circuit is about 7 V, costing roughly 3% of the rate. Electricians size wire for both ampacity and voltage drop, so a properly installed run shouldn't noticeably slow charging.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-ev-charger-keep-tripping-the-breaker",
          title: "Why Does My EV Charger Keep Tripping the Breaker?",
          desc: "Continuous-load sizing, GFCI breakers and heat at the receptacle.",
        },
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "Logging supply voltage and telling utility problems from in-home ones.",
        },
      ]}
    >
      <Callout title="Leave the charger and panel closed">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Changing a wall charger&apos;s internal current setting, rewiring it or upsizing its breaker is
            installation work for a licensed electrician. The breaker size is fixed by the wire behind it.
          </li>
          <li>
            Stop charging and call an electrician if the plug, receptacle or cable feels hot, looks discolored,
            or smells of hot plastic. For smoke or fire, leave the garage and call 911.
          </li>
          <li>
            The charging cable and connector carry full current. Never use one that is cut, crushed or has a
            damaged handle, and don&apos;t use adapters or extension cords that the charger maker does not
            approve.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="power-math" className="text-xl font-semibold mb-3">What Level 2 should deliver</h2>
        <p className="text-muted leading-7 mb-4">
          Charging power is voltage times current. Level 2 in North America means 208 V or 240 V, and the
          current can be anything from about 16 A up to 48 A or more depending on the equipment. That spread
          explains why two owners with &quot;a Level 2 charger&quot; can see charging speeds that differ by a
          factor of three. In Europe the equivalent is 230 V single-phase or 400 V three-phase: a single-phase
          32 A connection gives roughly 7.4 kW, while a three-phase 16 A connection gives roughly 11 kW, but
          only if the car&apos;s onboard charger accepts three phases.
        </p>
        <Figure caption={<>Approximate AC power at common Level 2 settings (volts × amps). Real energy reaching the battery is somewhat lower because of conversion losses.</>}>
          <BarChart
            items={[
              { label: "16 A at 240 V", value: 3.84, display: "3.8 kW" },
              { label: "32 A at 208 V", value: 6.66, display: "6.7 kW" },
              { label: "32 A at 240 V", value: 7.68, display: "7.7 kW", highlight: true },
              { label: "40 A at 240 V", value: 9.6, display: "9.6 kW" },
              { label: "48 A at 240 V", value: 11.52, display: "11.5 kW" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          To translate power into range, divide by your car&apos;s consumption. As a rough guide, a car that
          drives 3 to 4 miles per kWh gains somewhere around 20 to 30 miles of range per hour at 7 kW, less in
          cold weather. If your car reports half of that or less, one of the limits below is in play.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Always charges at the same low current", "Charger configured low, or the car's onboard limit", "Charger app setting; car's max AC rate", "Owner or installer"],
            ["Power about 13% lower than expected", "208 V supply instead of 240 V", "Voltage shown in the app or at the receptacle", "Usually normal; electrician to confirm"],
            ["Current reduced only in this garage", "Current cap saved for this location in the car", "Vehicle charging menu", "Owner"],
            ["Slow on cold mornings, normal later", "Battery too cold to take full rate", "Battery temperature, preconditioning", "Owner (schedule)"],
            ["Rate drops when the dryer or AC runs", "Load management protecting the service", "Load-management or power-sharing setting", "Electrician"],
            ["Charging starts late or stops early", "Schedule, off-peak window or utility program", "Charger and car schedules", "Owner"],
            ["Rate drifts down during a session", "Heat derating in the charger or plug", "Charger temperature warnings; plug warmth", "Electrician or charger maker"],
          ]}
        />
      </section>

      <section>
        <h2 id="pilot" className="text-xl font-semibold mb-3">The pilot signal and the lowest-limit rule</h2>
        <p className="text-muted leading-7 mb-4">
          A Level 2 charger doesn&apos;t push current into the car. It sends a control pilot signal on a
          dedicated pin of the connector, and the duty cycle of that square wave tells the car the maximum
          current it may draw (this is how the SAE J1772 and IEC 61851 systems work). The car&apos;s onboard
          charger then takes up to that amount, or less if its own hardware or settings say so. That is why the
          number on the charger&apos;s box is only a ceiling.
        </p>
        <Figure caption={<>The car charges at the lowest of the limits in the chain. In this example the onboard charger is the bottleneck, so a bigger circuit or charger would change nothing.</>}>
          <LowestLimitDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The circuit sets the first ceiling. Because EV charging runs for hours, the charger&apos;s output is
          normally limited to 80% of the breaker rating, so a 40 A circuit supports a 32 A setting and a 50 A
          circuit supports 40 A. Installers set the charger to match, through an app or a setting inside the
          unit, and a charger capable of 48 A on a 40 A circuit will correctly be held at 32 A. Plug-in chargers
          on a NEMA 14-50 receptacle are commonly limited to 40 A or less for the same reason. The car sets the
          other ceiling: onboard chargers vary widely, from small units on some plug-in hybrids to 11 kW or more
          on many recent EVs, and the owner&apos;s manual lists the maximum AC rate.
        </p>
      </section>

      <section>
        <h2 id="voltage" className="text-xl font-semibold mb-3">208 V vs 240 V supply</h2>
        <p className="text-muted leading-7 mb-4">
          Most US single-family homes have split-phase 120/240 V service. Many apartments, condos and some
          townhouses are fed from a three-phase 120/208 V system, and a charger connected across two phases
          there sees about 208 V. At the same current that is about 13% less power, which is a common reason a
          charger &quot;never reaches its rated kW&quot; in a multi-unit building. Nothing is wrong, and there
          is no adapter that converts it.
        </p>
        <p className="text-muted leading-7">
          Voltage also sags slightly under load. A drop of a few volts when charging starts is normal on a
          long run. A drop of 10 V or more, or voltage that wanders while the session runs, points to an
          undersized or loose connection somewhere and is worth logging, as described in{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations at home
          </Link>
          . US nominal voltage is generally expected within about 5% under ANSI C84.1; much of Europe works to
          230 V with a tolerance of around 10%.
        </p>
      </section>

      <section>
        <h2 id="car-side" className="text-xl font-semibold mb-3">Car settings, temperature and schedules</h2>
        <p className="text-muted leading-7 mb-4">
          Many EVs let you lower the charging current from the car itself, and several remember that choice
          per location. A cap set once for a weak outlet at a relative&apos;s house can quietly follow you
          home if the car thinks it is the same place, or a lower value set at home can persist after a
          software update. Look through the charging menu for a current or amps setting and compare it with
          the charger&apos;s configured value.
        </p>
        <p className="text-muted leading-7 mb-4">
          Battery temperature is the other big factor. A cold pack cannot accept full current safely, so the
          car may charge slowly or divert some energy to warming the battery first, which can look like a
          slow session in winter. Scheduling charging to finish shortly before you leave, or using the
          car&apos;s preconditioning feature while it is plugged in, usually helps. Very high temperatures can
          trigger a reduction too. Near the charge limit, the car also tapers current as the cells fill.
        </p>
        <p className="text-muted leading-7">
          Finally, check what else is controlling the session. Time-of-use schedules, utility demand-response
          programs, solar-surplus modes that follow your rooftop output, and power sharing between two chargers
          on one circuit all reduce or pause charging by design. A dynamic load-management system watches the
          home&apos;s total draw and throttles the charger when the oven, dryer and air conditioner are running,
          so it protects the service rather than signaling a fault.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="homeowner-checks">Checks from the apps</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Record live values.</span> During a session, note the voltage,
            current and power the charger app and car app show. If they disagree, the car&apos;s figure is
            usually what reaches the battery after losses.
          </li>
          <li>
            <span className="text-foreground">Read the configured maximum.</span> The charger app or the
            installation paperwork should state the current the unit was set to. Compare it with the breaker
            rating printed on the handle, read through the panel door without removing anything.
          </li>
          <li>
            <span className="text-foreground">Look up the car&apos;s AC limit.</span> The owner&apos;s manual or
            the maker&apos;s spec sheet gives the onboard charger&apos;s maximum. If it is already the lowest
            number, you have your answer.
          </li>
          <li>
            <span className="text-foreground">Clear caps and schedules.</span> Temporarily raise the car&apos;s
            current setting to maximum, disable schedules, and start a session at midday with a battery that is
            warm and well below its limit. If the rate jumps, the setting was the cause.
          </li>
          <li>
            <span className="text-foreground">Watch for overlap.</span> If the current falls each time a big
            appliance starts, ask whether load management or power sharing was installed.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="meter-checks">Meter checks at a plug-in charger</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If your charger plugs into a 240 V receptacle, you can confirm the supply yourself. Use a meter rated
          at least CAT III for the voltage, test leads with finger guards, and safety glasses. Turn off the
          breaker, unplug the charger, turn the breaker back on, then measure between the two hot slots. Turn
          the breaker off again before plugging the charger back in. A hardwired charger can&apos;t be checked
          this way; its terminals sit inside the unit, so rely on the app&apos;s voltage reading.
        </p>
        <Figure caption={<>Hot-to-hot voltage at a NEMA 14-50 with the charger unplugged: split-phase service (left) and a three-phase 208 V building supply (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="239.6" unit="V~" mode="V AC  split-phase" />
            <MeterReadout value="207.8" unit="V~" mode="V AC  208 V supply" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading near 240 V confirms the supply isn&apos;t the bottleneck. A reading near 208 V explains a
          shortfall of roughly 13% and is normal for that type of building. A reading well below either, or a
          big difference between the two hot-to-neutral readings, goes to an electrician. Clamping the charging
          cable won&apos;t work, because current flowing out and back in one cable cancels in the jaw, as{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>{" "}
          explains. A 120 V Level 1 cord set is the exception: through a line splitter at the outlet, a clamp
          reads its draw directly.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="Who to call">
          Call a licensed electrician if the configured charger current doesn&apos;t match the breaker, if you
          want a higher rate and need to know whether the panel and wiring can support it, if voltage sags badly
          during charging, or if any connection runs hot. Contact the charger maker for derating or temperature
          warnings and pilot or communication errors, and the car maker if the vehicle accepts less than its
          published AC rate on every charger you try. Speak to the utility if your measured voltage is outside
          the normal range on every circuit, or if a demand-response program is pausing your sessions. If the
          circuit trips rather than just running slowly, see{" "}
          <Link href="/multimeters/why-does-my-ev-charger-keep-tripping-the-breaker" className={link}>
            why an EV charger keeps tripping the breaker
          </Link>
          , and if a home battery is meant to help with charging,{" "}
          <Link href="/multimeters/why-does-my-home-energy-storage-system-stop-discharging-during-peak-electricity-prices" className={link}>
            why a home battery stops discharging at peak prices
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for checking a charger supply"
          items={[
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "True RMS, CAT IV 600V / CAT III 1000V, with LoZ. Plenty of rating margin for 240 V receptacle checks.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on Tested. CAT III 1000V / CAT IV 600V, 19,999-count high-resolution mode and an analog bar graph.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "AC clamp to 600 A with inrush, rated CAT IV 600V. For a Level 1 cord set on a line splitter.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
