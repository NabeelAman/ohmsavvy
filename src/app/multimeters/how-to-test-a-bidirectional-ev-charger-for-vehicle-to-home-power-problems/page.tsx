import Link from "next/link";
import {
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
  "Test a bidirectional EV charger when vehicle-to-home power fails: app and indicator checks, outlet voltage and frequency, logging and installer escalation.";

export const metadata = buildMetadata({
  title: "Testing a Bidirectional EV Charger for V2H",
  description,
  path: "/multimeters/how-to-test-a-bidirectional-ev-charger-for-vehicle-to-home-power-problems",
});

const all = getAllPicks("multimeters");
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const ut181a = all.find((p) => p.name === "UNI-T UT181A")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;

const link = "text-accent hover:underline";

/** The four links in a vehicle-to-home chain, and what each one has to agree on. */
function V2hChainDiagram() {
  return (
    <svg viewBox="0 0 360 180" className="w-full h-auto" role="img" aria-label="Diagram of a vehicle-to-home chain: the car battery, the bidirectional charger, the transfer or islanding equipment, and the backed-up home circuits, with the grid disconnected during an outage">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="8" y="60" width="66" height="54" rx="4" />
        <rect x="100" y="60" width="72" height="54" rx="4" />
        <rect x="198" y="60" width="72" height="54" rx="4" />
        <rect x="292" y="60" width="60" height="54" rx="4" />
        <line x1="74" y1="87" x2="100" y2="87" />
        <line x1="172" y1="87" x2="198" y2="87" />
        <line x1="270" y1="87" x2="292" y2="87" />
        <line x1="234" y1="60" x2="234" y2="30" strokeDasharray="4 3" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="41" y="84">Car</text>
        <text x="41" y="97">battery</text>
        <text x="136" y="84">Bidirectional</text>
        <text x="136" y="97">charger</text>
        <text x="234" y="84">Transfer /</text>
        <text x="234" y="97">islanding</text>
        <text x="322" y="84">Backed-up</text>
        <text x="322" y="97">circuits</text>
        <text x="234" y="22">Grid (opened in an outage)</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="41" y="132">V2H enabled,</text>
        <text x="41" y="144">SoC above floor</text>
        <text x="136" y="132">firmware, comms,</text>
        <text x="136" y="144">output limit</text>
        <text x="234" y="132">senses outage,</text>
        <text x="234" y="144">isolates home</text>
        <text x="322" y="132">load within</text>
        <text x="322" y="144">backup rating</text>
      </g>
      <text x="180" y="170" fontSize="9.5" textAnchor="middle" className="fill-muted">Backup power fails if any single link refuses to proceed</text>
    </svg>
  );
}

export default function HowToTestABidirectionalEvChargerPage() {
  return (
    <HowToShell
      title="How to Test a Bidirectional EV Charger for Vehicle-to-Home Power Problems"
      description={description}
      path="/multimeters/how-to-test-a-bidirectional-ev-charger-for-vehicle-to-home-power-problems"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A bidirectional EV charger that won&apos;t power the house during an outage is rarely broken in the way
          people first assume. Vehicle-to-home (V2H) only works when three separate systems agree: a car that is
          permitted to export power, a bidirectional charger configured for backup, and transfer or islanding
          equipment that cuts the home off from the grid before the car starts feeding it. This guide shows how to
          test each link from the outside, using the apps, the indicator lights and a meter at an ordinary outlet,
          and where the job has to pass to the installer.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter",
        caption: (
          <>
            A CAT-rated meter at a backed-up outlet tells you what the house is actually receiving during V2H. See
            the{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-v2h-needs", label: "What vehicle-to-home needs to work" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "app-checks", label: "App and indicator checks" },
        { id: "outlet-checks", label: "Voltage and frequency at a home outlet" },
        { id: "load-checks", label: "Finding the load that drops V2H" },
        { id: "specialist-tools", label: "What installers test with" },
        { id: "installer", label: "When to call the installer" },
      ]}
      faq={[
        {
          q: "Can I use any EV with a bidirectional charger for home backup?",
          a: "No. The vehicle has to be approved by its maker for power export, usually for that specific charger, and some models need a software setting or a dealer update before they will discharge. A car that charges normally on the same unit can still refuse to export. Check both the vehicle maker's and the charger maker's compatibility lists.",
        },
        {
          q: "Why does V2H stop with plenty of charge left in the car?",
          a: "Most systems keep a discharge floor so the car is left with enough range to drive. If the floor is set high, export ends well before the battery looks empty. Overload, overheating and a grid-return signal from the transfer equipment can also end a session early; the charger's event log usually says which one happened.",
        },
        {
          q: "Is it safe to test V2H by switching off my main breaker?",
          a: "Only if your installer's commissioning instructions say that is how to simulate an outage on your system. Some setups use a test switch on the transfer equipment instead. Never pull the meter, open the transfer equipment or bypass the gateway to force islanding; that is how backfeed onto utility lines happens.",
        },
        {
          q: "Does V2H work the same way in Europe?",
          a: "The principle is the same, but the home runs at 230 V and 50 Hz, wiring is usually single-phase or three-phase rather than 120/240 V split-phase, and grid-connection rules for bidirectional chargers vary by country and network operator. Expect different approved equipment lists and commissioning steps.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-ev-charger-keep-tripping-the-breaker",
          title: "Why Does My EV Charger Keep Tripping the Breaker?",
          desc: "Continuous-load sizing, GFCI breakers and hot connections on the charging circuit.",
        },
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "Logging supply voltage at outlets and telling utility problems from in-home ones.",
        },
      ]}
    >
      <Callout title="High-voltage equipment: look, log and leave the covers on">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A bidirectional charger handles the car&apos;s high-voltage DC pack. Never open the charger, the
            transfer switch, the backup gateway or the panel, and never unplug the vehicle connector while a session
            is active unless the manual tells you to.
          </li>
          <li>
            Never connect the car&apos;s output to the house through an improvised cord or adapter. Without
            approved transfer equipment, exported power can backfeed the grid and endanger line crews.
          </li>
          <li>
            Burning smell, heat at the connector, crackling or a scorched outlet: stop the session from the app,
            switch off the charger&apos;s breaker if you can do so safely, and call the installer. For smoke or fire,
            leave and call 911.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-v2h-needs" className="text-xl font-semibold mb-3">What vehicle-to-home needs to work</h2>
        <p className="text-muted leading-7 mb-4">
          Ordinary charging is a one-way handshake: the charger offers current and the car decides how much to
          take. V2H reverses the flow, so every component needs permission to run backwards. The car must support
          export for that charger model and have export enabled. The charger must be a bidirectional unit, either a
          DC design that does the conversion itself or an AC design that relies on the car&apos;s onboard
          electronics, and it must be commissioned for backup rather than charging only. The third piece is the
          transfer or islanding equipment, often a gateway or automatic transfer switch, which detects the outage,
          opens the connection to the utility and only then lets the charger energize the home.
        </p>
        <p className="text-muted leading-7 mb-4">
          That isolation step is not optional. Grid-tied equipment is designed to stop exporting when the grid
          disappears, and a V2H system can only form its own little island once it is certain it is physically
          separated from the street. If the gateway can&apos;t confirm separation, the whole chain stays off, which
          looks like a dead charger but is actually the safety logic doing its job.
        </p>
        <Figure caption={<>Vehicle-to-home depends on four links. The fault is usually in whichever link last reported a status change.</>}>
          <V2hChainDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Outage arrives, house stays dark, car still charging-capable", "Export not enabled, or car not on the approved list", "Vehicle app export setting; compatibility list", "Owner; vehicle maker"],
            ["Charger shows a communication or handshake error", "Firmware mismatch or connector communication fault", "Firmware versions in both apps; error code", "Charger maker; installer"],
            ["Backup starts, then drops after a few seconds", "Transfer equipment not confirming grid isolation", "Gateway status in the app; event log", "Installer"],
            ["Backup drops when the well pump, AC or microwave starts", "Startup current beyond the backup output rating", "Which load was switching on; output limit", "Installer (load shedding)"],
            ["V2H ends with a lot of range left", "Discharge floor set high", "Minimum state-of-charge setting", "Owner settings"],
            ["Lights dim or flicker on backup, appliances misbehave", "Voltage or frequency outside tolerance under load", "Outlet voltage and frequency, logged", "Installer; charger maker"],
            ["Charger hot, fan loud, session derates", "Thermal limit in the charger or the car", "Ambient temperature, airflow, derate messages", "Installer"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Pay attention to when the failure happens. Nothing at all at the moment of the outage points to the
          permission chain: settings, compatibility or isolation. A start followed by a collapse points to load or
          power quality. A slow fade toward the end of an outage usually comes down to the discharge floor or
          heat.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="app-checks">App and indicator checks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start with everything that reports without being touched. Most V2H systems involve two or three apps,
          one for the car, one for the charger and sometimes one for the gateway, and each keeps its own event
          history. Line the logs up by time. The first component to report an error is usually the one that
          stopped the chain; the others often just record that their neighbor went away.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Vehicle side.</span> Confirm the export or power-supply feature is
            switched on, the car is awake and not in a transport or service mode, and the discharge floor is where
            you expect it. Many vehicles also block export while a software update is pending.
          </li>
          <li>
            <span className="text-foreground">Charger side.</span> Note the status light pattern and any code, and
            check whether the unit is set to backup or charging-only operation. Record the firmware version.
          </li>
          <li>
            <span className="text-foreground">Gateway or transfer switch.</span> Most show whether the home is on
            grid or islanded. If the app still says on grid during an outage, the outage is not being detected and
            the charger will never be told to export.
          </li>
          <li>
            <span className="text-foreground">Backed-up circuits.</span> Find out which circuits the installer put
            on backup. A dark kitchen on an un-backed circuit is expected behavior, not a fault.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          Power-cycling the charger once, through its breaker and per the manual, is a reasonable step after a
          firmware update or a communication error. Repeated cycling to clear a fault code that keeps coming back
          hides evidence the installer needs.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="outlet-checks">Voltage and frequency at a home outlet</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once V2H is running, an ordinary 120 V receptacle on a backed-up circuit is the safest place to see what
          the home is getting. Use a meter rated at least CAT III for the voltage, leads in good condition with
          finger guards, and safety glasses. Place the probes in the receptacle slots only; nothing needs to be
          opened. A plug-in voltage monitor does the same job hands-free and is easier to leave in place.
        </p>
        <p className="text-muted leading-7 mb-4">
          In a US home, expect roughly 120 V from hot to neutral and 60 Hz. ANSI C84.1 range A puts normal
          utility service within about 5% of 120 V, which is roughly 114 to 126 V. Backup inverters are designed
          to hold voltage and frequency close to nominal, so a reading that sags sharply when a load switches on,
          or a frequency that wanders noticeably, is worth recording. Check one outlet on each leg if the
          installer has backed up 240 V loads, because an imbalance between the two legs points to the output
          stage or the transfer wiring. In Europe the same check reads about 230 V and 50 Hz.
        </p>
        <Figure caption={<>Illustrative readings at a backed-up 120 V outlet during V2H: voltage near nominal and frequency close to 60 Hz.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="119.6" unit="V~" mode="V AC  hot to neutral" />
            <MeterReadout value="60.0" unit="Hz" mode="Hz  same outlet" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A single snapshot misses the moment of failure. A meter with Min/Max recording or on-board logging
          captures the lowest voltage reached while you cycle loads on and off, and a logging meter left on the
          outlet for an evening shows whether the dips line up with the dropouts in the charger log. For general
          technique, see{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations at home
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="load-checks">Finding the load that drops V2H</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A backup source has a continuous output rating and a short surge allowance, and both are usually far
          below what the utility can supply. Motors and compressors briefly draw several times their running
          current when they start, which is why a well pump or air conditioner is the classic V2H killer. You can
          measure a plug-in appliance&apos;s draw without opening anything: plug it into a line splitter, clamp the
          splitter&apos;s loop with an AC clamp meter, and use the meter&apos;s inrush mode to catch the start-up
          peak.
        </p>
        <p className="text-muted leading-7">
          Compare that figure with the backup output rating in the charger&apos;s documentation. Hardwired loads,
          such as a central AC condenser or a well pump, can only be measured at their disconnect or in the panel,
          which is installer territory. The practical fixes, such as moving a large load off the backup panel,
          adding a soft starter or setting up load shedding, are design changes for the installer. Our page on{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            lights flickering when the AC starts
          </Link>{" "}
          explains the startup-current effect in more detail.
        </p>
      </section>

      <section>
        <h2 id="specialist-tools" className="text-xl font-semibold mb-3">What installers test with</h2>
        <p className="text-muted leading-7 mb-4">
          Two specialist instruments come up in V2H diagnosis, and both stay with the professional. An EVSE tester
          plugs between the charger and a simulated vehicle and checks the pilot signal, the ground path and the
          protective trip functions; some models also exercise the communication used for bidirectional sessions.
          A power-quality analyzer records voltage, current, frequency, harmonics and events over hours or days,
          which is how an installer proves whether a transfer took too long or the output distorted under a
          particular load.
        </p>
        <p className="text-muted leading-7">
          Your notes make that visit faster. Bring the event logs from each app, the outlet readings with times,
          photos of the indicator lights, and a list of what was running when the system dropped. If you have a
          home solar battery too, mention it: two sources trying to form the same island need careful
          coordination, and our guide to{" "}
          <Link href="/multimeters/why-does-my-home-energy-storage-system-stop-discharging-during-peak-electricity-prices" className={link}>
            a home battery that stops discharging
          </Link>{" "}
          covers how operating modes and reserves interact.
        </p>
      </section>

      <section id="installer">
        <KeyIdea title="When to call the installer, the charger maker or the utility">
          Call the installer if the gateway never reports an outage, if the system drops within seconds of
          islanding, if one leg reads differently from the other, or if any connector, cable or outlet shows heat.
          Contact the charger maker for handshake errors that survive one power cycle and a firmware check, and the
          vehicle maker if the car refuses export while the charger reports ready. Talk to the utility before
          changing anything about how the system connects to the grid, because many require an interconnection
          agreement for bidirectional equipment. Related reading:{" "}
          <Link href="/multimeters/why-does-my-ev-charge-slowly-at-home-even-with-a-level-2-charger" className={link}>
            why an EV charges slowly at home
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance" className={link}>
            why a generator shuts off under load
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for checking backup power at the outlet"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on Tested. CAT III 1000V / CAT IV 600V with a 19,999-count high-resolution mode for outlet readings.",
            },
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 logging multimeter",
              href: "/multimeters/best-multimeters-for-measuring-low-resistance",
              note: "TrendCapture logs and graphs readings on the meter, useful for catching backup dropouts over an evening.",
            },
            {
              name: "UNI-T UT181A",
              image: ut181a.image,
              alt: "UNI-T UT181A logging multimeter",
              href: "/multimeters/best-multimeters-for-car-battery-testing",
              note: "Color-screen logger that stores 20,000 readings with a trend graph. CAT III 1000V / CAT IV 600V.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "AC clamp with inrush mode for start-up current on a line splitter. CAT IV 600V / CAT III 750V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
