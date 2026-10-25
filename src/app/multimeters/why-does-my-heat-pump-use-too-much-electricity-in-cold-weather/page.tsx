import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why a heat pump uses too much electricity in cold weather: falling COP, aux strip heat, defrost, thermostat settings and how to measure real usage.";

export const metadata = buildMetadata({
  title: "Heat Pump Using Too Much Electricity in Cold?",
  description,
  path: "/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather",
});

const all = getAllPicks("multimeters");
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const ut181a = all.find((p) => p.name === "UNI-T UT181A")!;

const link = "text-accent hover:underline";

/** Two curves that cross: the home's heat loss rises as it gets colder while the heat pump's capacity falls. */
function BalancePointDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Chart showing house heat loss rising as outdoor temperature falls and heat pump capacity falling, crossing at the balance point below which auxiliary heat makes up the difference">
      <g className="stroke-foreground" strokeWidth="1.4" fill="none">
        <line x1="40" y1="20" x2="40" y2="150" />
        <line x1="40" y1="150" x2="325" y2="150" />
      </g>
      <line x1="40" y1="40" x2="320" y2="140" className="stroke-accent" strokeWidth="2.2" />
      <line x1="40" y1="120" x2="320" y2="45" className="stroke-foreground" strokeWidth="2" />
      <line x1="146" y1="20" x2="146" y2="150" className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="40" y="40" width="106" height="62" className="fill-accent" opacity="0.1" />
      <g fontSize="9.5" className="fill-muted">
        <text x="182" y="182" textAnchor="middle">Outdoor temperature (colder to the left)</text>
        <text x="42" y="164">cold</text>
        <text x="300" y="164">mild</text>
        <text x="146" y="14" textAnchor="middle">balance point</text>
      </g>
      <g fontSize="9.5">
        <text x="252" y="128" className="fill-accent">house heat loss</text>
        <text x="230" y="58" className="fill-foreground">heat pump capacity</text>
        <text x="92" y="80" textAnchor="middle" className="fill-accent">aux heat</text>
        <text x="92" y="92" textAnchor="middle" className="fill-accent">fills the gap</text>
      </g>
    </svg>
  );
}

export default function WhyDoesMyHeatPumpUseTooMuchElectricityInColdWeatherPage() {
  return (
    <HowToShell
      title="Why Does My Heat Pump Use Too Much Electricity in Cold Weather?"
      description={description}
      path="/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A heat pump using far more electricity in cold weather is partly physics and partly settings. As the
          outdoor air gets colder, the house loses heat faster while the heat pump moves heat less efficiently, so
          consumption climbs even when everything works. What turns a higher bill into a shocking one is usually
          auxiliary electric heat switching on more than it needs to, aggressive thermostat setbacks, frequent
          defrost, or an airflow or refrigerant problem. This guide separates the expected increase from the
          avoidable one and shows how to measure it without going near the outdoor unit&apos;s wiring.
        </>
      }
      aside={{
        image: sc480.image,
        alt: "Fieldpiece SC480 clamp meter",
        caption: (
          <>
            HVAC technicians measure a heat pump&apos;s current and power at the unit. Homeowners use an energy
            monitor instead. See the{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
              HVAC meter guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "cop", label: "Why efficiency falls as it gets colder" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "aux-heat", label: "Auxiliary and emergency heat" },
        { id: "defrost", label: "Defrost cycles" },
        { id: "thermostat", label: "Thermostat settings that cost money" },
        { id: "homeowner-checks", label: "Safe homeowner checks" },
        { id: "measuring", label: "Measuring what it really uses" },
        { id: "technician", label: "When to call an HVAC technician" },
      ]}
      faq={[
        {
          q: "How much more electricity should a heat pump use in very cold weather?",
          a: "It depends on the house, the climate and the equipment, but it is normal for daily use to rise steeply as temperatures fall, because heat loss rises and efficiency drops at the same time. Compare days with similar outdoor temperatures rather than comparing winter with autumn. A sudden jump at the same temperature is the sign of a fault or a settings change.",
        },
        {
          q: "Is it cheaper to turn the heat pump down at night?",
          a: "Small setbacks are usually fine. Large ones can cost more, because recovering several degrees on a cold morning often makes the thermostat call for auxiliary heat. Many heat pump thermostats offer a smart or adaptive recovery setting that avoids this; check its documentation.",
        },
        {
          q: "Why is steam coming off my outdoor unit?",
          a: "That is usually a normal defrost cycle melting frost off the outdoor coil, and it typically lasts a few minutes. Defrost that happens very often, ice that keeps building on the coil, or a unit encased in ice is a reason to call a technician.",
        },
        {
          q: "Does this apply to air-to-water heat pumps in Europe?",
          a: "The same physics applies. An air-to-water unit also loses efficiency as outdoor air cools and as the flow temperature it has to produce rises, so a high radiator flow temperature setting raises consumption. Many have a backup immersion or inline electric heater that behaves like auxiliary strip heat.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-smart-thermostat-that-keeps-losing-power",
          title: "How to Test a Smart Thermostat That Keeps Losing Power",
          desc: "24 VAC power, C wires and power-stealing problems on heat pump thermostats.",
        },
        {
          href: "/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night",
          title: "Why Does My Smart Meter Show High Usage at Night?",
          desc: "Using interval data to see when heating and other loads run.",
        },
      ]}
    >
      <Callout title="Leave the outdoor unit and air handler closed">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Heat pumps run on 240 V circuits and contain capacitors that can stay charged after power is off.
            Opening the outdoor unit, the air handler or the electric heat strips, and clamp-meter readings on their
            wiring, are jobs for a qualified HVAC technician.
          </li>
          <li>
            Refrigerant work requires certification. Never add refrigerant or open service ports yourself.
          </li>
          <li>
            A burning smell from the vents when the aux heat first runs in autumn is often dust on the strips. A
            smell that persists, smoke, or a tripped heat-strip breaker that trips again: switch the system off and
            call a technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="cop" className="text-xl font-semibold mb-3">Why efficiency falls as it gets colder</h2>
        <p className="text-muted leading-7 mb-4">
          A heat pump doesn&apos;t make heat from electricity; it uses electricity to move heat from outdoors to
          indoors. The ratio of heat delivered to electricity used is the coefficient of performance, or COP. In
          mild weather, a typical air-source unit might deliver three or more units of heat per unit of
          electricity. As the outdoor air gets colder, there is less heat to collect and the compressor works
          harder, so COP falls, often toward two or below in severe cold, depending on the model. Cold-climate
          units hold up better, but every air-source heat pump follows the same trend.
        </p>
        <Figure caption={<>Illustrative COP of an air-source heat pump at different outdoor temperatures. Your unit&apos;s published performance data gives its real figures.</>}>
          <BarChart
            items={[
              { label: "47 °F (8 °C)", value: 3.5, display: "COP ~3–4" },
              { label: "32 °F (0 °C)", value: 2.8, display: "COP ~2.5–3" },
              { label: "17 °F (-8 °C)", value: 2.2, display: "COP ~2–2.5" },
              { label: "5 °F (-15 °C)", value: 1.7, display: "COP ~1.5–2" },
              { label: "Electric strip heat", value: 1, display: "COP 1", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          At the same time, the house loses heat faster the bigger the gap between indoor and outdoor
          temperature. Double the gap and you roughly double the heat needed. Lower efficiency multiplied by
          higher demand is why a cold snap can triple or quadruple daily heating energy without anything being
          wrong. Below the balance point, where the heat pump alone can no longer keep up, supplementary heat
          covers the shortfall.
        </p>
        <Figure caption={<>Below the balance point the heat pump can&apos;t match the house&apos;s heat loss, and auxiliary heat makes up the difference.</>}>
          <BalancePointDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Usage rises steadily as temperatures drop", "Normal COP decline plus higher heat loss", "Usage vs outdoor temperature over several days", "No fix needed; insulation helps"],
            ["Big spikes every morning", "Setback recovery triggering aux heat", "Thermostat schedule and recovery setting", "Owner settings"],
            ["High usage on mild days, 'aux' or 'em heat' showing", "Emergency heat left on, or aux staged too early", "Thermostat mode and aux lockout setting", "Owner; HVAC tech"],
            ["Outdoor unit frosted solid, frequent defrost", "Airflow, sensor or refrigerant problem", "Look at the coil; note defrost frequency", "HVAC technician"],
            ["Weak, lukewarm air and long run times", "Dirty filter, blocked returns, low charge", "Filter, return grilles, supply air temperature", "Owner (filter); tech (charge)"],
            ["Usage jumped this year at the same temperatures", "Developing fault or a changed setting", "Compare with last winter's interval data", "HVAC technician"],
          ]}
        />
      </section>

      <section>
        <h2 id="aux-heat" className="text-xl font-semibold mb-3">Auxiliary and emergency heat</h2>
        <p className="text-muted leading-7 mb-4">
          Most ducted heat pumps in the US include electric resistance strips in the air handler. Resistance
          heat has a COP of 1: every kilowatt-hour in becomes one kilowatt-hour of heat. A set of strips can draw
          as much power as the heat pump several times over, so a few extra hours of aux heat per day show up
          clearly on the bill. Auxiliary heat is meant to supplement the heat pump below the balance point and
          during defrost. Emergency heat is a manual mode that runs the strips without the heat pump, intended
          for when the outdoor unit has failed.
        </p>
        <p className="text-muted leading-7">
          Check the thermostat display. If it shows emergency heat, someone switched it on, often during a cold
          snap, and it was never switched back. If aux heat comes on frequently on days well above the balance
          point, the staging may be too aggressive: many thermostats let the installer set an outdoor-temperature
          lockout or a delay before aux heat is allowed. Those installer settings are worth reviewing with your
          technician rather than changing blind.
        </p>
      </section>

      <section>
        <h2 id="defrost" className="text-xl font-semibold mb-3">Defrost cycles</h2>
        <p className="text-muted leading-7 mb-4">
          In cold, damp weather, frost builds on the outdoor coil and blocks airflow. The heat pump clears it by
          briefly reversing into cooling mode, warming the coil while the outdoor fan stops. During defrost the
          house would get cold air, so many systems bring on the aux heat to temper it. A few short defrosts an
          hour in freezing fog are normal. Defrosting far more often, or failing to clear the ice, wastes energy
          and points to a sensor, control or refrigerant fault.
        </p>
        <p className="text-muted leading-7">
          Keep the outdoor unit clear of snow drifts, leaves and anything stacked against it, and make sure
          meltwater can drain away rather than refreezing under the unit. You can look; don&apos;t chip ice off
          the coil, because the fins bend easily and the refrigerant tubing can be punctured.
        </p>
      </section>

      <section>
        <h2 id="thermostat" className="text-xl font-semibold mb-3">Thermostat settings that cost money</h2>
        <p className="text-muted leading-7">
          Heat pumps prefer steady temperatures. A deep overnight setback means the morning recovery asks for a
          large temperature rise at the coldest time of day, which is exactly the condition that calls in aux
          heat. A thermostat configured for a furnace rather than a heat pump may stage heat wrongly. Smart
          thermostats sometimes ship with recovery settings that prioritize speed over efficiency. Check the
          equipment type in the installer menu if you are comfortable doing so, try a smaller setback or none for
          a week, and compare daily usage at similar temperatures. If the thermostat keeps rebooting, our guide to{" "}
          <Link href="/multimeters/how-to-test-a-smart-thermostat-that-keeps-losing-power" className={link}>
            a smart thermostat that keeps losing power
          </Link>{" "}
          covers the wiring side.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="homeowner-checks">Safe homeowner checks</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Filter.</span> A clogged filter cuts airflow, raises run time and
            can trip the system into aux heat. Replace it on the schedule the maker recommends, more often in
            heavy-use months.
          </li>
          <li>
            <span className="text-foreground">Supply and return grilles.</span> Keep them open and unblocked by
            furniture or rugs. Closing rooms off doesn&apos;t save energy on most ducted systems.
          </li>
          <li>
            <span className="text-foreground">Supply air temperature.</span> A thermometer at a supply register
            near the air handler, compared with the return air, tells you how much the air is being heated. Log it
            with the heat pump running alone and again when aux heat engages; a technician will want both numbers.
          </li>
          <li>
            <span className="text-foreground">Outdoor unit.</span> From a step back, look for ice that never
            clears, a fan that doesn&apos;t spin when the compressor runs, or unusual noises. Note what you see and
            when.
          </li>
          <li>
            <span className="text-foreground">Breakers.</span> If the heat-strip breaker or the outdoor unit&apos;s
            breaker has tripped, reset it once. If it trips again, leave it off and call the technician.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="measuring">Measuring what it really uses</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The most useful number is daily heating energy plotted against outdoor temperature. Your smart meter&apos;s
          interval data from the utility, or a whole-home energy monitor installed by an electrician, shows
          consumption by the hour. Many monitors can track the heat pump and the strip heat circuits separately,
          which reveals immediately how much of a cold day was aux heat. A thermostat runtime report,
          showing hours of heat pump versus aux heat, gives the same insight for free on many smart thermostats.
        </p>
        <p className="text-muted leading-7 mb-4">
          Gather a couple of weeks of data and compare days with similar outdoor temperatures. A steady curve is
          healthy. Scattered high days at mild temperatures usually trace back to settings or aux staging. A whole
          winter that sits above last winter at the same temperatures suggests a developing fault, such as a slow
          refrigerant leak, that a technician should diagnose. Reading interval data is covered in our guide to{" "}
          <Link href="/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night" className={link}>
            smart meter usage at night
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Clamp-meter readings on the outdoor unit&apos;s supply, the compressor or the strips are where a
          technician confirms the picture: running current, start-up inrush, and, with a power clamp, actual watts
          and power factor. Those conductors are inside the unit and the disconnect, so leave them to the
          professional. For how clamp measurements work in general, see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>
          .
        </p>
      </section>

      <section id="technician">
        <KeyIdea title="When to call an HVAC technician">
          Call a technician if aux or emergency heat runs on mild days after you have checked the thermostat mode,
          if the outdoor coil stays iced, if supply air is barely warmer than return air with the heat pump
          running, if any breaker trips repeatedly, or if this winter&apos;s usage clearly exceeds last
          winter&apos;s at the same temperatures. Ask them to check refrigerant charge, defrost controls, airflow
          and the aux heat staging, and to share the current and temperature readings they take. If the problem
          turns out to be the house rather than the equipment, an energy audit of insulation and air leaks is the
          next step. Related:{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            lights that flicker when the AC starts
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters HVAC technicians use on heat pumps"
          items={[
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "Watts, power factor, inrush and temperature in one HVACR clamp. CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "HVAC clamp with inrush mode, temperature and a flame-sensor µA range. CAT IV 600V / CAT III 750V.",
            },
            {
              name: "UNI-T UT181A",
              image: ut181a.image,
              alt: "UNI-T UT181A logging multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair",
              note: "Measures two thermocouples at once and logs 20,000 readings, handy for supply vs return air over time.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
