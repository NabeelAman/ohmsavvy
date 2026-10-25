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
  "Why a home battery loses charge overnight when nothing seems on: always-on loads, inverter self-use, settings, CT clamp errors and measuring a baseline.";

export const metadata = buildMetadata({
  title: "Why Does My Home Battery Lose Charge Overnight?",
  description,
  path: "/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running",
});

const all = getAllPicks("multimeters");
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const fluke179 = all.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

/** Where a "quiet house" battery drain actually goes, as a stacked overnight budget. */
function OvernightDrainDiagram() {
  return (
    <svg viewBox="0 0 340 160" className="w-full h-auto" role="img" aria-label="Diagram of an overnight battery budget: a full bar of stored energy split into always-on house loads, inverter and system self-use, conversion losses and timed loads, with the remainder left by morning">
      <g className="stroke-foreground" strokeWidth="1.4">
        <rect x="20" y="50" width="300" height="34" rx="3" fill="none" />
        <line x1="110" y1="50" x2="110" y2="84" />
        <line x1="150" y1="50" x2="150" y2="84" />
        <line x1="175" y1="50" x2="175" y2="84" />
        <line x1="215" y1="50" x2="215" y2="84" />
      </g>
      <rect x="20" y="50" width="90" height="34" className="fill-accent" opacity="0.35" />
      <rect x="110" y="50" width="40" height="34" className="fill-accent" opacity="0.22" />
      <rect x="150" y="50" width="25" height="34" className="fill-accent" opacity="0.14" />
      <rect x="175" y="50" width="40" height="34" className="fill-accent" opacity="0.28" />
      <g fontSize="9.5" textAnchor="middle" className="fill-foreground">
        <text x="65" y="40">always-on loads</text>
        <text x="130" y="30">system</text>
        <text x="130" y="40">self-use</text>
        <text x="162" y="104">losses</text>
        <text x="195" y="40">timed loads</text>
        <text x="268" y="40">left by morning</text>
      </g>
      <text x="170" y="130" fontSize="9.5" textAnchor="middle" className="fill-muted">Proportions are illustrative; your monitoring data sets the real split</text>
      <text x="170" y="146" fontSize="9.5" textAnchor="middle" className="fill-muted">Evening (full) at left, sunrise at right</text>
    </svg>
  );
}

export default function WhyDoesMyHomeBatteryLoseChargeOvernightPage() {
  return (
    <HowToShell
      title="Why Does My Home Battery Lose Charge Overnight Even When Nothing Is Running?"
      description={description}
      path="/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          If your home battery loses charge overnight while the house seems asleep, the energy is almost always
          going somewhere real: dozens of small always-on devices, the inverter and battery system powering
          themselves, a setting that lets the battery cover loads or export you didn&apos;t expect, or a
          monitoring error that misreports where the power went. A genuinely faulty battery is the least common
          answer. The way to find out is to put numbers on the night: how many kilowatt-hours left the battery,
          and where the monitoring says they went.
        </>
      }
      aside={{
        image: sc480.image,
        alt: "Fieldpiece SC480 clamp meter",
        caption: (
          <>
            A clamp meter that reads watts helps size individual plug-in loads on a line splitter. See the{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
              HVAC meter guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "do-the-math", label: "Put a number on the overnight loss" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "standby", label: "Always-on loads add up" },
        { id: "system-self-use", label: "Inverter and battery self-consumption" },
        { id: "settings", label: "Settings that empty the battery on purpose" },
        { id: "monitoring", label: "When the monitoring is wrong" },
        { id: "baseline", label: "How to measure your baseline" },
        { id: "when-to-call", label: "When to call the installer" },
      ]}
      faq={[
        {
          q: "How much charge should a home battery lose overnight with nothing on?",
          a: "There is no universal figure, because 'nothing on' still includes refrigerators, networking, standby electronics and the system's own consumption. Multiply your monitored overnight base load by the hours the battery covered it and compare that with the drop in stored energy. If the two roughly match, the battery is doing its job.",
        },
        {
          q: "Does a lithium home battery self-discharge much?",
          a: "Lithium-ion cells themselves lose very little charge sitting idle over one night. The noticeable overnight drop on a home system comes from the electronics around them: the inverter, the battery management system, communications and any heating or cooling, plus the house loads the battery is covering.",
        },
        {
          q: "Why did my battery percentage jump in the morning?",
          a: "State of charge is an estimate. Many systems recalibrate it when the battery reaches full or a set low point, so a sudden step up or down after sunrise can be a correction rather than real energy gained or lost. Repeated large jumps are worth reporting to the installer.",
        },
        {
          q: "Is this different for European systems?",
          a: "The causes are the same. European homes run at 230 V, so the same wattage draws roughly half the current of a US 120 V load, and many monitors report energy per phase on three-phase supplies. Read the per-phase figures when hunting for a base load.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night",
          title: "Why Does My Smart Meter Show High Usage at Night?",
          desc: "Reading interval data and finding the load that runs while you sleep.",
        },
        {
          href: "/multimeters/how-to-measure-standby-current-in-an-electronic-device",
          title: "How to Measure Standby Current in an Electronic Device",
          desc: "Measuring the small currents that devices draw when they look switched off.",
        },
      ]}
    >
      <Callout title="Battery systems store a lot of energy: keep the covers on">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never open the battery enclosure, the inverter or any combiner or disconnect box, and don&apos;t try to
            measure current on the battery cables. The DC side can deliver very high fault current and its arcs
            don&apos;t extinguish themselves.
          </li>
          <li>
            Swelling, hissing, a sweet or acrid smell, heat you can feel from a distance, or smoke: leave the area,
            call 911, and tell the dispatcher it is a lithium battery system.
          </li>
          <li>
            Everything below uses the app, the display, plug-in meters, breaker handles and clamp readings on
            appliance cords through a line splitter. Anything inside the equipment or panel is installer work.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="do-the-math" className="text-xl font-semibold mb-3">Put a number on the overnight loss</h2>
        <p className="text-muted leading-7 mb-4">
          Percentages hide the scale. Convert the drop into energy: a battery with 13.5 kWh of usable capacity
          that falls from 90% to 70% has supplied about 2.7 kWh. Over a ten-hour night that is an average of
          about 270 W, which is an entirely ordinary base load for a house with a refrigerator, a freezer,
          networking gear, a few chargers and a gas furnace&apos;s blower control or a heat pump&apos;s crankcase
          heater. The same arithmetic in reverse tells you what to expect: base load in watts multiplied by hours
          of darkness, plus the system&apos;s own use, is roughly what the battery should lose.
        </p>
        <p className="text-muted leading-7">
          So the question is not &quot;why did it drop?&quot; but &quot;does the drop match the load?&quot; If the
          monitoring shows 250 W of house load all night and the battery lost 2.5 kWh, there is no fault, just a
          bigger base load than you thought. If the monitoring shows 50 W and the battery still lost 2.5 kWh, the
          energy went somewhere the monitor isn&apos;t seeing, and that is worth chasing.
        </p>
        <Figure caption={<>Where an overnight battery budget typically goes. The split varies widely from home to home.</>}>
          <OvernightDrainDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Steady drop all night, app shows matching house load", "Always-on loads", "Overnight base load in the app; plug-in meter survey", "Owner"],
            ["Drop larger than the house load the app reports", "System self-use, or a CT clamp misreading", "Battery output vs house load at the same time", "Installer"],
            ["Battery exports to the grid overnight", "Operating mode or time-of-use export setting", "Mode, schedule and export settings", "Owner; installer"],
            ["Big step drop at one time each night", "Timed load: water heater, pool pump, EV, dishwasher delay", "Interval graph for the time of the step", "Owner"],
            ["App shows house load negative or impossible values", "CT clamp reversed or on the wrong conductor", "Daytime solar vs house load sanity check", "Installer"],
            ["Loss worse in cold or hot weather", "Battery heating or cooling, inverter fans", "Battery temperature in the app", "Installer if extreme"],
            ["Percentage jumps at dawn or after a full charge", "State-of-charge recalibration", "Whether energy figures agree with the jump", "Installer if large and repeated"],
          ]}
        />
      </section>

      <section>
        <h2 id="standby" className="text-xl font-semibold mb-3">Always-on loads add up</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Nothing is running&quot; usually means nothing you can see. A modern home keeps a surprising
          number of devices awake: the router and mesh nodes, smart speakers, game consoles in instant-on mode,
          cable or satellite boxes, TV standby, security cameras and their recorder, doorbell transformers,
          irrigation controllers, smoke and CO alarms on hardwired circuits, and the control boards of the washer,
          dryer, range and microwave. Individually they are a few watts each; together they are often 50 to
          150 W before the fridge compressor cycles.
        </p>
        <Figure caption={<>Illustrative overnight draws for common always-on loads. Measure your own; these vary widely by model and age.</>}>
          <BarChart
            items={[
              { label: "Refrigerator (averaged over cycles)", value: 50, display: "30–70 W avg" },
              { label: "Router, modem and mesh nodes", value: 25, display: "15–40 W" },
              { label: "Cameras and recorder", value: 30, display: "15–50 W" },
              { label: "TV, console and box standby", value: 15, display: "5–30 W" },
              { label: "Heat pump crankcase heater (cold nights)", value: 60, display: "can exceed 50 W", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The highlighted item catches people out. Many heat pumps and air conditioners heat their compressor
          crankcase in cold weather to keep refrigerant from settling in the oil, and that draw continues all night
          even when no heating is called for. Our{" "}
          <Link href="/multimeters/why-does-my-heat-pump-use-too-much-electricity-in-cold-weather" className={link}>
            heat pump cold-weather guide
          </Link>{" "}
          explains the other winter loads to look for.
        </p>
      </section>

      <section>
        <h2 id="system-self-use" className="text-xl font-semibold mb-3">Inverter and battery self-consumption</h2>
        <p className="text-muted leading-7 mb-4">
          The equipment that runs the battery uses power too. A hybrid inverter that stays on overnight to cover
          house loads draws its own idle power, the battery management system and communications run
          continuously, and some batteries heat or cool their cells when the temperature leaves a comfortable band.
          Converting stored DC back to AC also loses a few percent of whatever passes through. Makers publish
          idle or standby consumption in their datasheets, often in the tens of watts; read your system&apos;s
          figure rather than assuming one.
        </p>
        <p className="text-muted leading-7">
          This self-use is often invisible in the household load graph, because the CT clamps that measure house
          load sit downstream of the inverter. You see it only as a gap between what the battery reports supplying
          and what the house reports using. A gap of a few tens of watts is normal. A gap of several hundred watts
          deserves an installer visit.
        </p>
      </section>

      <section>
        <h2 id="settings" className="text-xl font-semibold mb-3">Settings that empty the battery on purpose</h2>
        <p className="text-muted leading-7 mb-4">
          Many overnight losses are the system doing exactly what it was told. Most systems let you choose a mode
          that prioritizes self-consumption, backup or time-of-use savings, set a backup reserve, and allow or
          block grid export from the battery. A self-consumption mode will happily run the house from the battery
          all night, down to the reserve. A time-of-use or virtual power plant program may export to the grid in
          the evening peak, which shows up as a steep early-evening drop that the house load can&apos;t explain.
        </p>
        <p className="text-muted leading-7">
          Read the current mode, reserve and export settings in the app, and check whether you have enrolled in a
          utility or aggregator program that can dispatch the battery. If settings changed after a firmware
          update, note the date for the installer. Our guide to{" "}
          <Link href="/multimeters/why-does-my-home-energy-storage-system-stop-discharging-during-peak-electricity-prices" className={link}>
            storage systems that stop discharging at peak times
          </Link>{" "}
          covers these modes from the other direction.
        </p>
      </section>

      <section>
        <h2 id="monitoring" className="text-xl font-semibold mb-3">When the monitoring is wrong</h2>
        <p className="text-muted leading-7 mb-4">
          The system learns about house load and grid flow from current transformers, the CT clamps an installer
          puts around conductors in the panel. A clamp installed facing the wrong way, placed on the wrong
          conductor, or not fully closed can make the app report import as export, show negative house load, or
          miss a whole circuit. The battery then responds to a picture of the house that isn&apos;t true, for
          example discharging to &quot;cover&quot; load that is really solar going out to the grid.
        </p>
        <p className="text-muted leading-7">
          A daytime sanity check catches most of these. On a sunny afternoon with the house quiet, solar
          production should roughly equal house load plus battery charging plus export. If the numbers
          don&apos;t add up, or the utility meter disagrees with what the app says you imported overnight,
          photograph the screens and send them to the installer. Re-seating or reorienting CT clamps happens inside
          the panel, so it is their job.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="baseline">How to measure your baseline</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Read the utility meter.</span> Note the import register at bedtime
            and at dawn on a night when the battery is set to backup-only. That night&apos;s grid import is your
            true base load without the battery in the picture.
          </li>
          <li>
            <span className="text-foreground">Survey plug-in loads.</span> A plug-in energy meter between the
            outlet and each always-on device gives watts and accumulated kWh. Leave it on the fridge for a full
            day to get an honest average.
          </li>
          <li>
            <span className="text-foreground">Clamp cord-connected appliances.</span> Through a line splitter, an
            AC clamp meter reads the current of a single appliance cord without opening anything. A clamp that
            reads watts saves you the voltage-times-current conversion and accounts for power factor.
          </li>
          <li>
            <span className="text-foreground">Switch circuits off one at a time.</span> Using breaker handles
            only, turn off one non-essential circuit for twenty minutes and watch the base load in the app. Skip
            the refrigerator, freezer, medical equipment and anything that resets awkwardly.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Use a CAT III rated meter and safety glasses for any measurement on a live outlet, and see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>{" "}
          for why you clamp one conductor, not the whole cord.
        </p>
      </section>

      <section id="when-to-call">
        <KeyIdea title="When to call the installer or the battery maker">
          Call the installer if the battery loses noticeably more energy than the house load plus the published
          self-consumption, if the app shows negative or impossible house load, if the system exports when it is
          set not to, or if the battery heats or cools constantly in mild weather. Contact the battery maker
          through the installer for repeated state-of-charge jumps or a capacity figure that keeps falling. Never
          try to reset, rebalance or recalibrate a battery by disconnecting it yourself. If the loss turns out to
          be ordinary standby load, our guide to{" "}
          <Link href="/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night" className={link}>
            high smart meter readings at night
          </Link>{" "}
          helps you trim it.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for sizing overnight loads"
          items={[
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "Measures watts, VA and power factor on a single cord through a line splitter. CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "AC clamp to 600 A with inrush and simultaneous volts and amps display. CAT IV 600V / CAT III 750V.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 digital multimeter",
              href: "/multimeters/fluke-87v-vs-fluke-179",
              note: "True RMS, CAT III 1000V / CAT IV 600V, with Min/Max-Average recording for outlet voltage checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
