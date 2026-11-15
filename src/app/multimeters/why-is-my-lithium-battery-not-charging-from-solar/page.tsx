import Link from "@/components/AppLink";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Lithium battery not charging from solar? Check the controller's battery profile, the cold-charge lockout, a tripped BMS, low panel voltage and the PV fuse.";

export const metadata = buildMetadata({
  title: "Lithium Battery Not Charging From Solar?",
  description,
  path: "/multimeters/why-is-my-lithium-battery-not-charging-from-solar",
});

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** The chain from panel to cells, with the gate at each link that can block charging. */
function ChargeGatesDiagram() {
  const boxes = [
    { x: 8, label: "Panel", sub: "Voc, sun" },
    { x: 92, label: "PV fuse", sub: "breaker" },
    { x: 176, label: "Controller", sub: "profile" },
    { x: 260, label: "BMS", sub: "temp, volts" },
  ];
  return (
    <svg
      viewBox="0 0 350 150"
      className="w-full h-auto"
      role="img"
      aria-label="Why a lithium battery is not charging from solar: charge current must pass four gates in order, the solar panel's voltage, the PV fuse or breaker, the charge controller's battery profile and start voltage, and the battery's BMS, which blocks charging below about 0 degrees C or after a low-voltage cutoff."
    >
      {boxes.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y="40" width="74" height="50" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
          <text x={b.x + 37} y="62" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">{b.label}</text>
          <text x={b.x + 37} y="78" fontSize="9" textAnchor="middle" className="fill-muted">{b.sub}</text>
        </g>
      ))}
      <g className="stroke-accent" strokeWidth="2" fill="none">
        <path d="M82 65 H92" />
        <path d="M166 65 H176" />
        <path d="M250 65 H260" />
      </g>
      <rect x="290" y="105" width="52" height="34" rx="4" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="316" y="126" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-accent">Cells</text>
      <path d="M297 90 V105" className="stroke-accent" strokeWidth="2" />
      <text x="8" y="25" fontSize="9" className="fill-muted">Charge current must get through every gate:</text>
      <text x="8" y="125" fontSize="9" className="fill-muted">Measure DC volts on both sides of each gate</text>
      <text x="8" y="138" fontSize="9" className="fill-muted">to find the one that is closed.</text>
    </svg>
  );
}

export default function WhyIsMyLithiumBatteryNotChargingFromSolarPage() {
  return (
    <HowToShell
      title="Why Is My Lithium Battery Not Charging From Solar?"
      description={description}
      published="2026-11-15"
      path="/multimeters/why-is-my-lithium-battery-not-charging-from-solar"
      category="multimeters"
      intro={
        <>
          A lithium battery that won&apos;t charge from solar is usually being blocked on purpose: by its own BMS
          (because the cells are below freezing or it tripped on low voltage), by a charge controller set to the
          wrong battery type, or by a panel voltage too low for the controller to start. Less often the cause is a
          blown PV fuse, a loose connector or a failed controller. With a multimeter on DC volts you can find which
          one it is in about 15 minutes, by checking the voltage on each side of every link between the panel and
          the cells. This page covers small 12, 24 and 48 V off-grid systems with a separate charge controller and a
          LiFePO4 or other lithium battery.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 multimeter with temperature function for checking a lithium battery's charge temperature",
        caption: (
          <>
            The Fluke 179 adds a temperature reading, useful when a LiFePO4 battery may be too cold to accept
            charge. See our{" "}
            <Link href="/multimeters/fluke-179-review" className={link}>
              Fluke 179 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-lithium-is-different", label: "Why lithium refuses charge" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "check-temperature", label: "1. Check the battery temperature" },
        { id: "check-battery-terminals", label: "2. Read the battery terminals" },
        { id: "check-controller-profile", label: "3. Check the controller profile" },
        { id: "check-pv-voltage", label: "4. Check the PV voltage" },
        { id: "check-fuses", label: "5. Check fuses and connectors" },
        { id: "check-charge-reaches-cells", label: "6. Confirm charge reaches the cells" },
        { id: "setpoints", label: "Typical LiFePO4 setpoints" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why won't my LiFePO4 battery charge in cold weather?",
          a: "Charging lithium cells below freezing can plate lithium metal on the anode, which permanently damages them. Most LiFePO4 makers specify a charging range starting at about 0 °C (32 °F), and their BMS blocks charge current below that. The battery still discharges normally, so it seems fine but won't take solar. Self-heating batteries warm the cells first using charge power.",
        },
        {
          q: "Can I use a lead-acid setting on a solar controller for lithium?",
          a: "It's not a good idea. Lead-acid profiles often include temperature compensation, a high equalization voltage and a float stage that lithium batteries don't need. Equalization can push a 12 V battery toward 15 V or more, enough to trip the BMS. Use the controller's lithium or user profile and enter the battery maker's charge voltages.",
        },
        {
          q: "Why does my solar controller say charging but the battery doesn't go up?",
          a: "The controller may be charging into its own terminals while the BMS has disconnected the cells, or the current may be going straight to a running load. Measure the voltage at the battery posts while charging and compare it with the controller's battery screws. Then turn off loads and see whether the battery voltage rises over 15 to 30 minutes.",
        },
        {
          q: "Will a solar controller charge a lithium battery from 0 volts?",
          a: "Often not. Many controllers need to see battery voltage to power up and detect the system voltage, and a lithium battery whose BMS has cut off may show 0 V at its terminals. Some controllers and many lithium batteries have a wake-up or reactivation feature. Check both manuals; otherwise use a lithium-capable AC charger with a wake function to bring it back.",
        },
        {
          q: "How many volts does a solar panel need to charge a 12V lithium battery?",
          a: "Enough to exceed the battery's charge voltage with margin. A 12 V LiFePO4 battery charges to about 14.2–14.6 V, so the panel's working voltage must be higher. A 12 V-class panel with a Vmp around 17–19 V works with a PWM or MPPT controller. Many MPPT controllers also need the panel several volts above the battery before they start.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-solar-charge-controller-with-a-multimeter",
          title: "How to Test a Solar Charge Controller",
          desc: "PV input, battery output and load terminal readings for PWM and MPPT controllers.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "When a lithium pack reads 0 V or cuts out early, check the BMS first.",
        },
      ]}
    >
      <Callout title="Lithium batteries and solar wiring">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never try to force charge into a battery whose BMS has blocked it, for example by bypassing the BMS or
            charging cells directly. The BMS is protecting cells from fire and permanent damage.
          </li>
          <li>
            Don&apos;t charge a swollen, leaking, hot or damaged lithium battery. Isolate it and contact the maker or a
            battery recycler.
          </li>
          <li>
            Panels make voltage in daylight and can&apos;t be switched off. Open the PV breaker before touching PV
            conductors; strings over about 50 V DC are a shock hazard.
          </li>
          <li>
            A short across battery terminals can release hundreds of amps. Remove jewelry, use insulated tools, and
            call a solar installer for roof or grid-tied systems.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-lithium-is-different" className="text-xl font-semibold mb-3">
          Why a lithium battery refuses solar charge
        </h2>
        <p className="text-muted leading-7 mb-4">
          A lead-acid battery has no electronics: whatever voltage the controller applies, it takes some current.
          A lithium battery has a battery management system (BMS) between its terminals and its cells, and the BMS
          has a switch that can open the charge path while leaving the discharge path working. It opens that switch
          for several reasons: cells too cold, a cell too high, a cell too low, too much current, or an internal
          fault. So &quot;not charging&quot; in a lithium system is often a decision, not a failure.
        </p>
        <p className="text-muted leading-7">
          The charge controller adds its own decisions. It must recognize the battery voltage, it must have a
          working voltage from the panel, and it must be told what voltages the battery wants. If any link in that
          chain says no, the battery sits still in full sun. The fix is to find which link, which is a job of
          measuring volts on both sides of each one. If your battery charges but stops short of full, see{" "}
          <Link href="/multimeters/why-is-my-lithium-battery-not-charging-to-100" className={link}>
            why a lithium battery won&apos;t charge to 100%
          </Link>
          ; this page is about batteries that take no solar charge at all.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Stopped charging on a cold morning", "BMS low-temperature charge lockout", "Battery temperature; app or manual", "Wait for it to warm, insulate it, or use a self-heating battery"],
            ["Battery terminals read 0 V or very low", "BMS tripped on low voltage", "DC volts at the battery posts", "Wake it with a lithium charger; see the maker's manual"],
            ["Controller shows full voltage, battery doesn't rise", "BMS charge switch open (high cell or fault)", "Controller screws vs battery posts", "Check cell voltages in the app; contact the maker"],
            ["Controller says charging, very low current", "Wrong profile or low absorption setpoint", "Battery type and setpoints in the menu", "Set a lithium or user profile to the maker's figures"],
            ["No charging until late morning", "PV voltage too low for the MPPT to start", "PV voltage at the controller", "Reduce shade; add panels in series within limits"],
            ["Nothing at the controller's PV input", "Blown fuse, tripped breaker, loose MC4", "Volts across fuse and at each connector", "Replace the fuse with the same rating; remake the joint"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="check-temperature">Check the battery temperature</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start here in cold weather because it&apos;s the most common cause and needs no tools beyond a thermometer.
          LiFePO4 makers commonly specify charging between about 0 °C and 45–55 °C (32 °F to 113–131 °F) while allowing
          discharge well below freezing. Below the lower limit the BMS blocks charge current entirely. Above the
          upper limit it may do the same.
        </p>
        <p className="text-muted leading-7">
          The cell temperature is what counts, not the air. A battery in an uninsulated compartment can stay below
          0 °C for hours after a cold night, even once the air warms up. If your battery has a Bluetooth app, it usually
          shows cell temperature and a charge-protection flag. Otherwise use a meter with a temperature probe taped to
          the case. If cold is the cause, charging resumes on its own once the cells warm up; nothing is broken.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-battery-terminals">Read the battery terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts and read directly on the battery posts with the PV disconnected. A 12 V LiFePO4
          battery at a normal state of charge rests around 13.0–13.4 V. Three readings point to the BMS. Close to
          0 V, or a few volts, usually means the BMS has disconnected the output after a deep discharge. A normal
          voltage that never rises when the sun is up suggests the charge switch is open. A reading that jumps
          straight up to the controller&apos;s output voltage the moment PV is connected, with no current flowing,
          suggests the same.
        </p>
        <Figure caption={<>Illustrative readings at midday with PV connected: the controller is at its charge voltage, but the battery posts behind an open BMS charge switch haven&apos;t moved.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="14.31" unit="V" mode="DC V  controller BAT" />
            <MeterReadout value="13.12" unit="V" mode="DC V  battery posts" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A battery that has tripped on low voltage needs to be woken. Many lithium batteries reactivate when a
          charger applies voltage to the terminals, but many solar controllers can&apos;t start without seeing battery
          voltage first. A lithium-capable AC charger with a wake or activation mode is usually the answer. Our guide
          on{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            testing a battery protection circuit
          </Link>{" "}
          explains how to tell a tripped BMS from a dead one.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="check-controller-profile">Check the controller&apos;s battery profile</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Open the controller&apos;s menu or app and confirm the battery type. Lead-acid profiles cause three kinds of
          trouble on lithium. Temperature compensation raises the charge voltage when it&apos;s cold, which can push a
          lithium battery into high-voltage cutoff. Equalization can run a 12 V system to about 15 V or beyond. And a
          lead-acid float stage holds the battery at a voltage that may not suit it. Any of these can make the BMS
          disconnect the charge path, after which the battery appears to refuse charge.
        </p>
        <p className="text-muted leading-7">
          The opposite mistake causes trouble too. An absorption setpoint of 13.8 V, entered by mistake as the
          &quot;charge&quot; voltage, barely charges a LiFePO4 battery whose resting voltage is already 13.2–13.3 V. The
          difference of about half a volt drives very little current. Enter the battery maker&apos;s figures, not a
          generic chart&apos;s, and turn off temperature compensation unless the battery maker asks for it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="check-pv-voltage">Check the PV voltage at the controller</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Read DC volts across the controller&apos;s PV terminals. For charging to start, the panel voltage must be
          comfortably above the battery voltage. A PWM controller can charge once PV exceeds the battery, but an MPPT
          controller often waits until PV is several volts higher, and then needs it to stay above. On a 24 V lithium
          bank (about 26.4–28.8 V while charging), a single 12 V-class panel with a Vmp around 18 V can never charge,
          however sunny it is.
        </p>
        <p className="text-muted leading-7">
          Heat lowers panel voltage. Crystalline silicon panels typically lose roughly 0.3–0.4% of their voltage
          for every degree Celsius above 25 °C cell temperature, and cells on a summer roof run far above 25 °C. A
          string with little headroom at 25 °C can drop below the controller&apos;s start threshold on a hot afternoon.
          Partial shade on one panel of a series string can drag the whole string down too. If the PV reading is low
          even in clear sun, test each panel separately with the{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            solar panel multimeter test
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={5} id="check-fuses">Check fuses, breakers and connectors</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With everything connected and the sun up, read across each fuse or breaker in the PV line and in the
          battery line. A closed, healthy fuse shows nearly 0 V across it. An open one shows almost the whole source
          voltage. Do the same across each MC4 joint and each battery lug while the system is charging. A reading of
          more than a few tenths of a volt across a single joint means a bad connection, which also gets hot.
        </p>
        <p className="text-muted leading-7">
          Replace a blown fuse only with the same type and rating, and find out why it blew: a reversed battery
          connection, a short, or an inrush current from a large inverter can all do it. If the controller&apos;s
          battery fuse keeps blowing, have the wiring checked before you try again.
        </p>
        <Figure caption={<>Each gate can stop charging on its own. Measure volts on both sides of each to find the one that is open.</>}>
          <ChargeGatesDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="check-charge-reaches-cells">Confirm the charge reaches the cells</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the earlier checks pass, turn off every DC load and the inverter, then watch the battery post voltage
          for 15 to 30 minutes in steady sun. A LiFePO4 battery in the middle of its range rises slowly, perhaps a few
          hundredths of a volt in that time, because its voltage curve is so flat. Near the top it rises faster. A
          battery app or shunt monitor that shows positive current is the clearest proof.
        </p>
        <p className="text-muted leading-7">
          If the voltage doesn&apos;t move and no current is shown, but the controller reports output, the energy is
          going somewhere else, or the controller&apos;s reading is wrong. Measure the controller&apos;s output and the
          battery posts at the same time. If they match and the battery still won&apos;t rise, contact the battery maker:
          a BMS that won&apos;t close its charge switch under normal conditions needs their diagnosis.
        </p>
        <Figure caption={<>Diagnose in this order: the free checks first, then the wiring.</>}>
          <FlowDiagram
            steps={[
              { label: "Temp", sub: "Above 0 °C?" },
              { label: "Posts", sub: "Volts at battery" },
              { label: "Profile", sub: "Lithium setpoints" },
              { label: "PV", sub: "Above start volts?" },
              { label: "Fuses", sub: "0 V across each" },
            ]}
          />
        </Figure>
        <KeyIdea title="A lithium battery can say no">
          Unlike lead-acid, a lithium battery has its own switch. Before blaming the panel or controller, ask whether
          the BMS has a reason to refuse: cold, a tripped low-voltage cutoff or a high cell.
        </KeyIdea>
      </section>

      <section>
        <h2 id="setpoints" className="text-xl font-semibold mb-3">Typical LiFePO4 solar setpoints by system voltage</h2>
        <p className="text-muted leading-7 mb-4">
          These ranges are typical of LiFePO4 maker manuals and match 3.55–3.65 V per cell for charging. Your battery
          maker&apos;s figures take priority. Multiply by the number of cells in series: 4 for 12 V, 8 for 24 V, 16 for
          48 V.
        </p>
        <DataTable
          head={["Setting", "12 V (4S)", "24 V (8S)", "48 V (16S)"]}
          rows={[
            ["Nominal voltage", "12.8 V", "25.6 V", "51.2 V"],
            ["Absorption / bulk", "14.2–14.6 V", "28.4–29.2 V", "56.8–58.4 V"],
            ["Float (if used)", "13.5–13.6 V", "27.0–27.2 V", "54.0–54.4 V"],
            ["Equalization", "Off", "Off", "Off"],
            ["Temperature compensation", "Off", "Off", "Off"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          On larger 48 V home systems, a battery that charges but stops early is a different problem; see{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            a solar battery that stops charging at 80%
          </Link>
          , and if one cell is ending the charge, the{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            48 V LiFePO4 imbalance test
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for lithium solar faults</h2>
        <p className="text-muted leading-7 mb-6">
          Lithium charging problems hide in small voltage differences, so pick a meter that resolves 0.01 V on the
          20–60 V range. A temperature function saves a separate thermometer on cold mornings. A CAT rating matters if
          the same meter also goes near mains or high-voltage PV strings.
        </p>
        <ProductStrip
          title="Meters for solar and lithium checks"
          items={[
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS multimeter",
              href: "/multimeters/fluke-179-review",
              note: "True RMS, CAT IV 600V, and a temperature function for checking whether the battery is too cold to charge.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS multimeter",
              href: "/multimeters/fluke-115-review",
              note: "A backlit 6,000-count display for reading controller and battery post voltages side by side.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with auto and manual ranging. An affordable second meter for simultaneous readings.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
