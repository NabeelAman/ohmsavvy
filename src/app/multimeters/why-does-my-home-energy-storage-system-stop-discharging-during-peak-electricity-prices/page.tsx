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
  "Home energy storage system not discharging during peak prices? Check backup reserve, operating mode, TOU schedule, export limits and temperature or SOC limits.";

export const metadata = buildMetadata({
  title: "Home Battery Not Discharging at Peak Prices?",
  description,
  path: "/multimeters/why-does-my-home-energy-storage-system-stop-discharging-during-peak-electricity-prices",
});

const all = getAllPicks("multimeters");
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;
const fluke393 = all.find((p) => p.name === "Fluke 393 FC")!;
const ut181a = all.find((p) => p.name === "UNI-T UT181A")!;

const link = "text-accent hover:underline";

/** Power-flow view at the peak hour: where the home's demand is coming from, and the limits that cap the battery. */
function PeakPowerFlowDiagram() {
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Power-flow diagram of a home at the peak-price hour: the battery feeds the home through the inverter up to its power limit and above its reserve floor, the grid supplies the rest, and export to the grid may be blocked by the interconnection agreement">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="18" y="20" width="84" height="46" rx="4" />
        <rect x="128" y="77" width="84" height="46" rx="4" />
        <rect x="238" y="20" width="84" height="46" rx="4" />
        <rect x="18" y="134" width="84" height="46" rx="4" />
        <line x1="102" y1="43" x2="128" y2="88" />
        <line x1="212" y1="88" x2="238" y2="43" />
        <line x1="102" y1="157" x2="128" y2="112" />
      </g>
      <line x1="212" y1="112" x2="238" y2="150" className="stroke-accent" strokeWidth="1.6" strokeDasharray="4 3" />
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="60" y="41">Battery</text>
        <text x="60" y="54">above reserve</text>
        <text x="170" y="98">Inverter</text>
        <text x="170" y="111">kW limit</text>
        <text x="280" y="41">Home load</text>
        <text x="280" y="54">at 6 p.m.</text>
        <text x="60" y="155">Grid</text>
        <text x="60" y="168">supplies rest</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="280" y="150">export</text>
        <text x="280" y="162">may be blocked</text>
      </g>
      <text x="170" y="194" fontSize="9.5" textAnchor="middle" className="fill-muted">The battery only covers what the settings, the inverter and the home load allow</text>
    </svg>
  );
}

export default function WhyDoesMyHomeEnergyStorageSystemStopDischargingDuringPeakElectricityPricesPage() {
  return (
    <HowToShell
      title="Why Does My Home Energy Storage System Stop Discharging During Peak Electricity Prices?"
      description={description}
      path="/multimeters/why-does-my-home-energy-storage-system-stop-discharging-during-peak-electricity-prices"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          When a home energy storage system stops discharging during peak electricity prices, the cause is far
          more often a setting or a built-in limit than a broken battery. The usual reasons are a backup reserve
          that the battery has already reached, an operating mode that isn&apos;t built around time-of-use rates,
          a schedule entered with the wrong hours or season, an export rule that keeps the battery from sending
          power to the grid, or a state-of-charge or temperature limit set by the battery management system.
          Nearly all of it can be checked from the system&apos;s app and your utility account, without going
          near the hardware. This guide walks through those checks in the order that finds the answer fastest.
        </>
      }
      aside={{
        image: sc480.image,
        alt: "Fieldpiece SC480 clamp meter that measures watts",
        caption: (
          <>
            Your installer can confirm what the battery and grid are really doing with power-measuring tools; the
            owner&apos;s best instrument is the app plus the utility&apos;s interval data. Related:{" "}
            <Link href="/multimeters/why-does-my-smart-electricity-meter-show-high-usage-at-night" className={link}>
              reading smart meter data
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "is-it-stopping", label: "Is it stopping, or just not covering everything?" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "settings", label: "Reserve, modes and schedules" },
        { id: "limits", label: "Export, power and temperature limits" },
        { id: "app-checks", label: "Checks in the app and utility data" },
        { id: "measurements", label: "Measurements and their limits" },
        { id: "installer", label: "When to call the installer" },
      ]}
      faq={[
        {
          q: "Why does my battery sit at 20% or 30% and refuse to go lower?",
          a: "That is almost certainly the backup reserve, the share of capacity the system holds back for outages. Once the battery reaches it, normal discharge stops and the grid supplies the house. Most systems let the owner lower the reserve in the app, though utility programs, installers or warranty terms sometimes set a minimum.",
        },
        {
          q: "My battery was full at noon but empty before the peak started. Why?",
          a: "In a self-consumption mode, the battery covers the house whenever solar falls short, so cloudy afternoons, cooking and air conditioning can drain it before the expensive window arrives. A time-based mode that saves energy for the peak hours, or a later start time on the schedule, keeps the charge for when it is worth the most.",
        },
        {
          q: "Can I make the battery export to the grid during peak prices?",
          a: "Only if your interconnection agreement and tariff allow battery export and the system is configured for it. Many installations are permitted to export solar but not stored energy, or are limited to zero export. Ask your installer and utility what your permission covers before changing anything; exporting without approval can breach the agreement.",
        },
        {
          q: "Does cold weather stop a home battery from discharging?",
          a: "Cold mainly limits charging, but the battery management system can also reduce discharge power at low or high cell temperatures, and many systems run heaters or fans that use some of the stored energy. Batteries in unheated garages or outdoors show this most. The app often reports a temperature-related derate as a warning or reduced power figure.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent",
          title: "How to Diagnose a Solar Battery That Stops Charging at 80%",
          desc: "Charge limits, BMS settings, temperature and cell balancing on the charging side.",
        },
        {
          href: "/multimeters/why-does-my-home-battery-lose-charge-overnight-even-when-nothing-is-running",
          title: "Why Does My Home Battery Lose Charge Overnight?",
          desc: "Standby loads, inverter self-consumption and monitoring errors.",
        },
      ]}
    >
      <Callout title="Settings are yours to check; the hardware is not">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Home batteries store a large amount of energy at high DC voltage, and the inverter holds dangerous
            voltage even when it looks idle. Never open the battery enclosure, the inverter cover, the gateway or
            any disconnect, and never try to reset a battery by unplugging cables.
          </li>
          <li>
            Swelling, hissing, a chemical or burning smell, smoke, or a fault light paired with heat: leave the
            area, call 911, and tell the dispatcher there is a home battery. Contact the installer afterwards.
          </li>
          <li>
            Change only the options the app presents to the owner. Anything locked behind an installer login,
            such as export limits or grid-code settings, should be changed by the installer.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="is-it-stopping" className="text-xl font-semibold mb-3">Is it stopping, or just not covering everything?</h2>
        <p className="text-muted leading-7 mb-4">
          Open the app&apos;s power-flow or history view for a recent peak period and look at three lines: battery
          power, home consumption and grid import. If the battery shows zero output while the house is pulling
          from the grid, it has genuinely stopped. If the battery is discharging at a steady figure but the grid
          is still supplying part of the load, it is working at its power limit, and the home is simply asking for
          more than the inverter can deliver. That second case is common when an oven, electric dryer, EV charger
          and air conditioner overlap with the peak hours.
        </p>
        <p className="text-muted leading-7 mb-4">
          Also check the state of charge at the moment discharge ended. A battery that stops at a round number such
          as 20% or 30% is meeting a reserve setting. One that stops near empty ran out of energy earlier than you
          expected. One that stops partway with plenty of charge left, at a precise clock time, is following a
          schedule.
        </p>
        <Figure caption={<>Illustrative state of charge through a day in self-consumption mode: the battery fills from solar, then morning and late-afternoon loads drain it to a 20% reserve before a 4 to 9 p.m. peak begins.</>}>
          <BarChart
            items={[
              { label: "7 a.m.", value: 35, display: "35%" },
              { label: "1 p.m.", value: 100, display: "100%" },
              { label: "3 p.m.", value: 62, display: "62%" },
              { label: "4 p.m. (peak starts)", value: 20, display: "20% reserve", highlight: true },
              { label: "9 p.m. (peak ends)", value: 20, display: "20% reserve" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Stops at a fixed percentage", "Backup reserve reached", "Reserve setting in the app", "Owner"],
            ["Empty before the peak window", "Self-consumption mode used the energy earlier", "Mode and SOC history", "Owner"],
            ["Idle during part of the peak", "Schedule hours, weekday/weekend or season wrong", "TOU schedule vs current tariff", "Owner"],
            ["Grid import while battery discharges", "Home load above inverter output limit", "Battery kW vs home kW at peak", "Owner (shift loads); installer for sizing"],
            ["Never discharges past home load", "Zero-export or no-battery-export permission", "Interconnection terms, export setting", "Installer and utility"],
            ["Reduced or no output in cold or heat", "BMS temperature derate", "Battery temperature or warning in app", "Installer if persistent"],
            ["Holds full charge on a calm day", "Storm or outage-preparation mode, or a utility program event", "App notifications, program enrolment", "Owner; utility program"],
            ["Home load reads negative or nonsense", "Current sensor reversed or misplaced", "Home load with solar off at night", "Installer"],
          ]}
        />
      </section>

      <section>
        <h2 id="settings" className="text-xl font-semibold mb-3">Reserve, modes and schedules</h2>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Backup reserve.</span> Most systems let you set a backup reserve, the
          share of capacity kept for an outage. The higher it is, the less energy is available for peak shaving. A
          reserve set to 100% turns the battery into a pure backup device that will not discharge at all while the
          grid is up. Raising it before a forecast storm and forgetting to lower it afterwards is a frequent cause
          of a battery that suddenly stops helping with the bill.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Operating mode.</span> Systems generally offer some version of three
          modes: backup only, self-consumption (store surplus solar and use it whenever the house needs it), and a
          time-based or cost-saving mode that tries to discharge when import prices are highest. Only the third is
          designed around time-of-use pricing. Exact names differ by manufacturer, so read the description in your
          own app rather than going by the label.
        </p>
        <p className="text-muted leading-7">
          <span className="text-foreground">Time-of-use schedule.</span> A time-based mode is only as good as the
          rate plan it was given. Check the peak start and end times, the weekday and weekend split, summer and
          winter seasons, holidays and the time zone. Utilities revise rate plans, and a schedule entered at
          installation may not match the plan you are on now. Some apps let you pick the tariff from a list; if
          yours does, confirm it matches the plan name on your latest bill.
        </p>
      </section>

      <section>
        <h2 id="limits" className="text-xl font-semibold mb-3">Export, power and temperature limits</h2>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Grid-export rules.</span> Many interconnection agreements allow solar
          export but not battery export, and some installations are set to zero export. In those cases the battery
          only discharges to match the home&apos;s own consumption. On a mild evening when the house uses little,
          the battery may barely move during an expensive peak, which looks like a fault but is the system obeying
          its permission. Rules vary between US utilities and across European grid operators, which may impose
          their own feed-in limits, so the installer and utility are the authority here.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">Inverter and backup limits.</span> Every battery inverter has a
          continuous discharge rating. When the home load exceeds it, the grid makes up the difference. Some
          backup configurations also feed only a protected-loads subpanel, so large appliances on the main panel
          draw from the grid no matter how full the battery is.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">State-of-charge and temperature limits.</span> The battery management
          system protects the cells with lower state-of-charge cutoffs that sit beneath your reserve, and it
          reduces charge or discharge power when cell temperature is outside its preferred range. Lithium iron
          phosphate packs in particular restrict charging near freezing. A battery that didn&apos;t fully charge
          the day before because of cold or a{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            charge limit around 80%
          </Link>{" "}
          will naturally run short during the peak.
        </p>
        <Figure caption={<>At the peak hour the battery serves the house up to the inverter&apos;s limit and down to the reserve; the grid supplies anything beyond that, and export may not be allowed.</>}>
          <PeakPowerFlowDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="app-checks">Checks in the app and utility data</StepHeading>
        <ol className="space-y-2 list-decimal pl-5 text-muted leading-7">
          <li>
            Note the current mode, backup reserve and any active storm, outage or program event. Look for firmware
            update notices, since an update can reset settings.
          </li>
          <li>
            Compare the schedule&apos;s peak window with the rate plan on your bill, including season and weekend
            rules.
          </li>
          <li>
            Pull up the history for a day with the problem. Record state of charge at the start of the peak, the
            time discharge stopped and the battery&apos;s maximum output during the window.
          </li>
          <li>
            Download the utility&apos;s interval data for the same day and confirm grid import during the peak
            matches what the app claims. A big disagreement suggests a monitoring or sensor problem.
          </li>
          <li>
            Late at night, with solar producing nothing, check that the app&apos;s home consumption is a sensible
            positive number. Negative or wildly varying values point to a current-sensor installation issue.
          </li>
        </ol>
      </section>

      <section>
        <StepHeading n={2} id="measurements">Measurements and their limits</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unlike a tripping breaker or a dead outlet, this problem rarely needs a meter in the owner&apos;s hands.
          The current sensors and DC wiring that would answer it sit inside the panel, the gateway or the battery
          cabinet. What you can measure safely is individual plug-in appliances, with a plug-in energy monitor or
          a clamp meter on a line splitter, to see which loads push the house past the inverter&apos;s output
          during the peak. Shifting one of those, such as a dryer cycle or EV charging session, often fixes
          &quot;the battery isn&apos;t covering the peak&quot; outright.
        </p>
        <p className="text-muted leading-7">
          When the app and the utility data disagree, the installer can verify actual power flows with a clamp that
          measures watts on the AC side, a DC clamp on the battery conductors, or a logging meter left in place
          across a peak window. Those measurements happen inside equipment that only qualified people should open.
          For safe clamp technique on accessible cords, see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          ; for cell-level health questions, see{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            testing a 48V LiFePO4 battery for cell imbalance
          </Link>
          .
        </p>
      </section>

      <section id="installer">
        <KeyIdea title="When to call the installer, the utility or the manufacturer">
          Call the installer if the app shows faults or temperature warnings that persist, if home consumption
          reads negative, if export settings need to change, if settings you need are locked, or if the battery
          stops well above its reserve with no schedule to explain it. Call the utility to confirm your rate plan,
          export permission and any demand-response program that may control the battery. Contact the
          manufacturer, usually through the installer, for firmware problems or a battery that loses usable
          capacity quickly. Anything involving heat, smell or swelling is an emergency, not a settings question.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Instruments installers use to verify power flows"
          items={[
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#fieldpiece-sc480",
              note: "AC clamp that measures active power (W), VA and power factor. Also useful on appliance cords via a line splitter.",
            },
            {
              name: "Fluke 393 FC",
              image: fluke393.image,
              alt: "Fluke 393 FC solar clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing#fluke-393-fc",
              note: "DC clamp to 999.9 A with DC power and a CAT III 1500V rating, for qualified DC-side work.",
            },
            {
              name: "UNI-T UT181A",
              image: ut181a.image,
              alt: "UNI-T UT181A logging multimeter",
              href: "/multimeters/best-multimeters-for-electronics-repair#uni-t-ut181a",
              note: "Logs 20,000 readings with a real-time clock and trend graph. CAT III 1000V / CAT IV 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
