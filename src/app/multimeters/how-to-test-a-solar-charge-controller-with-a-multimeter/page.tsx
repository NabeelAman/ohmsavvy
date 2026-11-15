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
  BarChart,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Test a solar charge controller with a multimeter: compare PV input and battery output voltage, check load terminals and current, and spot PWM vs MPPT faults.";

export const metadata = buildMetadata({
  title: "How to Test a Solar Charge Controller",
  description,
  path: "/multimeters/how-to-test-a-solar-charge-controller-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Panel, controller and battery with the three measurement points: PV in, battery out, load out. */
function ControllerTestPointsDiagram() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Solar charge controller test points: a voltmeter reads the PV input terminals from the panel, a second reading is taken at the controller's battery terminals and again at the battery posts to find wiring loss, and a third reading is taken at the load terminals."
    >
      {/* panel */}
      <rect x="12" y="20" width="80" height="54" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <g className="stroke-muted" strokeWidth="1">
        <line x1="38" y1="20" x2="38" y2="74" />
        <line x1="65" y1="20" x2="65" y2="74" />
        <line x1="12" y1="47" x2="92" y2="47" />
      </g>
      <text x="52" y="90" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Solar panel</text>
      {/* controller */}
      <rect x="135" y="60" width="96" height="80" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="183" y="96" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">Charge</text>
      <text x="183" y="110" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">controller</text>
      <text x="141" y="74" fontSize="8" className="fill-muted">PV</text>
      <text x="141" y="134" fontSize="8" className="fill-muted">BAT</text>
      <text x="205" y="134" fontSize="8" className="fill-muted">LOAD</text>
      {/* battery */}
      <rect x="135" y="165" width="96" height="36" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="183" y="188" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">12 V battery</text>
      {/* load */}
      <rect x="282" y="150" width="62" height="36" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="313" y="172" fontSize="10" textAnchor="middle" className="fill-foreground">DC load</text>
      {/* wires */}
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <path d="M92 40 H118 V70 H135" />
        <path d="M160 140 V165" />
        <path d="M215 140 V150 H282" />
      </g>
      {/* meter points */}
      <circle cx="113" cy="100" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="113" y="104" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">V1</text>
      <circle cx="105" cy="160" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="105" y="164" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">V2</text>
      <circle cx="270" cy="115" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="270" y="119" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">V3</text>
      <g className="stroke-accent" strokeWidth="1.2" fill="none" strokeDasharray="4 3">
        <path d="M118 86 L128 72" />
        <path d="M120 160 H155" />
        <path d="M262 128 L250 150" />
      </g>
      <text x="8" y="125" fontSize="8" className="fill-muted">V1: PV in</text>
      <text x="8" y="195" fontSize="8" className="fill-muted">V2: BAT out</text>
      <text x="252" y="98" fontSize="8" className="fill-muted">V3: LOAD out</text>
    </svg>
  );
}

export default function HowToTestASolarChargeControllerWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Solar Charge Controller With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-solar-charge-controller-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a solar charge controller with a multimeter, measure DC volts at three places in sunlight: the
          PV input terminals, the battery terminals and the load terminals. A working controller shows panel
          voltage at the input, a battery voltage that rises toward its charge setpoint (around 14.4 V for many 12 V
          batteries) at the output, and the load output switching on and off as its settings say. This page shows
          what those readings should look like for PWM and MPPT controllers, how to tell a dead controller from a
          weak panel or a bad connection, and how to check the charge current without overloading your meter.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter for checking solar charge controller voltages",
        caption: (
          <>
            Any meter with a clean DC volts range does most of this test. A backlit display like the Fluke 115&apos;s
            helps in a dim battery locker. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-a-controller-behaves", label: "What a healthy controller does" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "read-the-label", label: "1. Read the controller and panel labels" },
        { id: "measure-pv-input", label: "2. Measure the PV input" },
        { id: "measure-battery-output", label: "3. Measure the battery output" },
        { id: "check-wiring-loss", label: "4. Check for wiring loss" },
        { id: "check-load-terminals", label: "5. Test the load terminals" },
        { id: "check-current", label: "6. Check the charge current" },
        { id: "pwm-vs-mppt", label: "PWM vs MPPT readings" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if my solar charge controller is bad?",
          a: "Measure the PV terminals and the battery terminals in full sun with the battery below full. If the panel voltage is present at the controller, the battery is connected and correctly set, and the battery voltage still doesn't rise over 15 to 30 minutes, the controller isn't charging. Confirm the fuse, the settings and the battery type before you replace it.",
        },
        {
          q: "What voltage should a solar charge controller output?",
          a: "It depends on the charge stage and battery type. For a 12 V lead-acid or AGM battery, bulk and absorption usually reach about 14.2 to 14.7 V, then float drops to about 13.5 to 13.8 V. A 12 V LiFePO4 profile commonly charges to 14.2 to 14.6 V. The controller's manual lists the exact setpoints for each battery type it supports.",
        },
        {
          q: "Why does my PV voltage drop when the controller is connected?",
          a: "That's normal. A PWM controller connects the panel almost directly to the battery, so the panel voltage falls close to battery voltage while it charges. An MPPT controller loads the panel near its maximum-power voltage, often around 17 to 18 V for a typical 12 V-class panel. Only open-circuit voltage, measured with the panel disconnected, should match the label's Voc.",
        },
        {
          q: "Can I test a charge controller without a panel or in the dark?",
          a: "You can check that it powers up from the battery, shows the right battery voltage and switches the load output. You can't test charging without a PV source. Some people use a bench power supply on the PV input, but only within the controller's limits and with current limiting set; most makers don't document that as a test method.",
        },
        {
          q: "Should I connect the battery or the solar panel first?",
          a: "Most charge controller manuals say connect the battery first so the controller can detect the system voltage, then the panel. Disconnect in the reverse order: panel first, then battery. Connecting the panel with no battery can confuse 12/24 V auto-detection or, on some models, expose the battery terminals to panel voltage. Follow your own manual if it says otherwise.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter",
          title: "How to Test a Solar Panel With a Multimeter",
          desc: "Open-circuit voltage and short-circuit current checks against the panel's rating label.",
        },
        {
          href: "/multimeters/why-is-my-lithium-battery-not-charging-from-solar",
          title: "Why Is My Lithium Battery Not Charging From Solar?",
          desc: "Battery profiles, cold-charge lockouts and BMS cutoffs that stop solar charging.",
        },
      ]}
    >
      <Callout title="Battery and PV wiring can hurt you">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A 12 V battery can deliver hundreds of amps into a short. Remove rings and watches, and never let a
            probe or wrench bridge the battery terminals or the controller&apos;s battery screws.
          </li>
          <li>
            Panels make voltage whenever light hits them, and you can&apos;t switch them off. Series strings on larger
            systems can exceed 100 V DC, which is a shock hazard. Cover the panels or open the PV breaker before you
            touch any PV conductor.
          </li>
          <li>
            Never move the red lead to the amps jack and then probe across the battery or the panel; that shorts
            the source through the meter. Keep the meter on DC volts for every step except step 6.
          </li>
          <li>
            Roof-mounted or grid-tied systems belong to a licensed solar installer. This guide is for small off-grid
            12/24 V systems on RVs, boats, sheds and cabins.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-a-controller-behaves" className="text-xl font-semibold mb-3">
          What a healthy charge controller does
        </h2>
        <p className="text-muted leading-7 mb-4">
          A charge controller sits between the panel and the battery and does one job: it lets as much solar
          current through as the battery can safely take, and no more. Early in the day, with a partly empty
          battery, it runs in bulk and passes all the current the panel can make. When the battery reaches its
          absorption voltage it holds that voltage and lets the current taper. When the battery is full it drops to
          a lower float voltage, or for some lithium profiles stops charging altogether. Many controllers also have
          a load output that switches DC loads off when the battery gets too low.
        </p>
        <p className="text-muted leading-7">
          A multimeter can check every part of that behavior, because each stage shows up as a voltage at a
          terminal. The trick is to measure at the right moment. A controller tested at dusk, or with a full
          battery at noon, looks broken when it&apos;s doing exactly what it should. Test with sun on the panel and
          some room in the battery: run a load for an hour first if the battery is already full.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Most &quot;bad controller&quot; calls turn out to be a panel, a fuse or a setting. Use the table to decide
          which test below answers your question first.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Display blank, nothing works", "No battery voltage at the controller", "V2 at the controller's battery screws", "Check the battery fuse or breaker and connections"],
            ["Display on, no charging in sun", "No PV at the input, or PV below start voltage", "V1 at the PV screws, panel connected", "Trace the PV wiring; test the panel on its own"],
            ["PV voltage present, battery not rising", "Controller fault or wrong battery setting", "V1 and V2 over 15–30 minutes", "Correct the profile; replace if it still won't charge"],
            ["Battery reads full but runs down fast", "Absorption setpoint too low", "Peak V2 against the battery maker's figure", "Raise the setpoint to the battery spec"],
            ["Charging stops early in hot weather", "Controller overtemperature derating", "Feel the heatsink; check ventilation", "Move it to a cooler, ventilated spot"],
            ["Load output dead", "Low-voltage disconnect active or load mode off", "V3 at the load screws", "Recharge the battery; check the load mode menu"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="read-the-label">Read the controller and panel labels first</StepHeading>
        <p className="text-muted leading-7">
          Write down four numbers before you measure anything. From the panel label: open-circuit voltage (Voc),
          maximum-power voltage (Vmp) and maximum-power current (Imp). From the controller: its maximum PV input
          voltage and its rated charge current. A typical 100 W panel sold for 12 V systems lists a Voc of about
          21–23 V and a Vmp of about 17–19 V, with Imp around 5–6 A, but check yours. Then check which battery type
          is selected in the controller&apos;s menu or DIP switches. A lithium battery on a flooded lead-acid profile, or
          the other way round, gives readings that look like a fault and aren&apos;t. If the panel itself is in doubt,
          run the{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            solar panel Voc and Isc test
          </Link>{" "}
          first.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-pv-input">Measure the PV input (V1)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts. Put the black probe on the controller&apos;s PV negative screw and the red probe on
          PV positive, with everything connected and the sun on the panel. You&apos;re reading the panel voltage while
          the controller loads it. Then open the PV breaker or unplug the panel connector and read again at the
          panel side: that open-circuit figure should be close to the label&apos;s Voc, adjusted for temperature (cold
          panels read higher, hot panels lower).
        </p>
        <p className="text-muted leading-7 mb-4">
          What the connected reading should be depends on the controller type. A PWM controller ties the panel to the
          battery through a switch, so while it charges, V1 sits only a little above battery voltage, perhaps 13–14 V
          on a 12 V system. An MPPT controller works the panel near its Vmp, so V1 stays well above the battery,
          often in the 17–18 V range for a 12 V-class panel. If V1 equals the full Voc while the battery is clearly
          not full, the controller isn&apos;t drawing any power from the panel.
        </p>
        <Figure caption={<>Illustrative V1 readings for one 12 V-class panel (Voc about 22 V): open circuit, on an MPPT controller in bulk, and on a PWM controller in bulk.</>}>
          <BarChart
            items={[
              { label: "Open circuit (disconnected)", value: 22, display: "about 22 V" },
              { label: "MPPT, charging", value: 17.5, display: "about 17.5 V", highlight: true },
              { label: "PWM, charging", value: 13.6, display: "about 13.6 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          No voltage at all at the controller, but a normal Voc at the panel, means an open in between: a blown PV
          fuse, a tripped breaker, an MC4 connector that isn&apos;t latched, or a cable chewed through on the roof. Read
          across the fuse or breaker with both sides connected; a healthy one shows nearly 0 V across it, while an
          open one shows the full panel voltage.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="measure-battery-output">Measure the battery output (V2)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Probe the controller&apos;s battery positive and negative screws. Note the reading, then watch it for 15 to
          30 minutes in steady sun. A battery that is charging rises. A 12 V lead-acid battery climbs from its resting
          12.2–12.6 V toward its absorption setpoint; a 12 V LiFePO4 rises slowly through the 13.2–13.4 V plateau and
          then quickly near the top. When it reaches absorption, the voltage should hold steady at the setpoint, not
          keep climbing. A reading that climbs above about 15 V on a 12 V system, outside an equalization cycle you
          started, means the controller isn&apos;t regulating, and you should disconnect the PV.
        </p>
        <Figure caption={<>Illustrative readings on a 12 V system with an MPPT controller in bulk: panel side and battery side at the same moment.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="17.62" unit="V" mode="DC V  PV input" />
            <MeterReadout value="13.48" unit="V" mode="DC V  BAT output" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Compare the peak reading against the battery maker&apos;s figures, not a generic chart. Many 12 V AGM
          batteries want about 14.4–14.7 V absorption and 13.5–13.8 V float; many 12 V LiFePO4 batteries want
          14.2–14.6 V and either no float or a low one. A controller that never gets past 13.8 V on a LiFePO4 bank is
          leaving capacity unused, which is one reason a{" "}
          <Link href="/multimeters/why-is-my-lithium-battery-not-charging-to-100" className={link}>
            lithium battery won&apos;t charge to 100%
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="check-wiring-loss">Check for wiring loss between controller and battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          While it charges, read V2 at the controller&apos;s screws and then directly on the battery posts. The
          difference is lost in cables, fuses and lugs. The controller regulates the voltage at its own terminals, so
          if 0.4 V disappears in the wiring, a battery that should see 14.4 V only gets 14.0 V and never finishes its
          absorption stage.
        </p>
        <p className="text-muted leading-7 mb-4">
          Ohm&apos;s law gives a quick sense of scale. At 20 A, a round trip of cable, fuse and connections totaling
          0.02 Ω drops 20 × 0.02 = 0.4 V. Keep the drop under a few tenths of a volt at full charge current; less is
          better. If it&apos;s high, read across each joint in turn. A warm lug or a fuse holder with a large drop
          across it is the culprit, and the{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop method
          </Link>{" "}
          used on car wiring works the same way here.
        </p>
        <Figure caption={<>The three measurement points: V1 at the PV input, V2 at the controller&apos;s battery screws (then repeated at the battery posts), and V3 at the load output.</>}>
          <ControllerTestPointsDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="check-load-terminals">Test the load terminals (V3)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If your controller has a load output, read across its screws. With the load mode set to &quot;always on&quot;
          and a battery above the reconnect voltage, V3 should be within a few tenths of a volt of battery voltage.
          If it reads zero, check three things in order: the load mode (many controllers ship with dusk-to-dawn or
          timer modes that turn the output off in daylight), the low-voltage disconnect, and any load fuse.
        </p>
        <p className="text-muted leading-7">
          The low-voltage disconnect is a feature, not a fault. On many controllers it switches the load off around
          11–11.5 V for lead-acid profiles and reconnects once the battery recovers to a higher voltage; lithium
          profiles use different thresholds. If V3 drops out at a battery voltage well above the manual&apos;s
          disconnect figure, the controller&apos;s load switch or its voltage sensing is suspect. Note that load outputs
          are usually rated for much less current than the charge side. Wiring an inverter to them is a common way to
          kill a controller.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="check-current">Check the charge current without overloading the meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Voltage alone proves the controller is regulating; current proves how much energy actually reaches the
          battery. Most handheld meters have a 10 A range rated for limited periods, so they can only measure current
          on small systems. On a single 100 W panel, current is low enough: open the PV breaker, insert the meter in
          series in the PV positive lead with the red lead in the 10 A jack, close the breaker and read. Then put
          everything back and return the red lead to the V jack straight away.
        </p>
        <p className="text-muted leading-7 mb-4">
          For bigger arrays, use the controller&apos;s own display or a battery monitor shunt, and use the meter to
          confirm the voltages those readings imply. You can also cross-check power: an MPPT controller converts high
          panel voltage into more battery current. If the panel delivers 17.5 V × 5.4 A ≈ 94.5 W, and the battery sits
          at 13.5 V, an MPPT controller at about 95% efficiency should push roughly 94.5 × 0.95 ÷ 13.5 ≈ 6.6 A into the
          battery. A PWM controller can&apos;t do that conversion: battery current is about the same as panel current.
        </p>
        <Figure caption={<>The order of tests: rule out the panel and the wiring before blaming the controller.</>}>
          <FlowDiagram
            steps={[
              { label: "Labels", sub: "Voc, Vmp, max PV V" },
              { label: "V1", sub: "PV at controller" },
              { label: "V2", sub: "Battery rising?" },
              { label: "Drop", sub: "Controller vs posts" },
              { label: "V3", sub: "Load output" },
            ]}
          />
        </Figure>
        <KeyIdea title="Measure both sides at once">
          A charge controller is a converter, so the evidence is always a comparison: panel voltage in, battery voltage
          out, at the same moment and in the same sun. One reading on its own rarely proves anything.
        </KeyIdea>
      </section>

      <section>
        <h2 id="pwm-vs-mppt" className="text-xl font-semibold mb-3">PWM vs MPPT: what the readings should look like</h2>
        <p className="text-muted leading-7 mb-4">
          The two controller types behave so differently that readings from one would look like a fault on the
          other. Use this table to set expectations before you decide anything is wrong.
        </p>
        <DataTable
          head={["Reading", "PWM controller", "MPPT controller"]}
          rows={[
            ["PV voltage while charging (V1)", "Near battery voltage, a little above", "Near the panel's Vmp, well above the battery"],
            ["PV voltage when battery is full", "Rises toward Voc as the switch opens", "Rises toward Voc as it draws less power"],
            ["Battery current vs panel current", "About the same", "Higher than panel current at low battery voltage"],
            ["Start-up in weak light", "Starts once PV exceeds battery", "Often needs PV a few volts above battery first"],
            ["Effect of a 24 V-class panel on a 12 V battery", "Wastes much of the panel's power", "Converts the extra voltage into current"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The start-up row explains a common morning complaint. Many MPPT controllers wait until the PV voltage is
          several volts above the battery before they begin tracking, so on a dull morning V1 can show 15 V at the
          input while nothing reaches the battery. That isn&apos;t a fault. If it still won&apos;t start by midday in clear
          sun, the panel&apos;s Voc may be too close to the battery voltage for that controller, which happens when a
          heavily shaded panel or a single 12 V-class panel feeds a 24 V bank.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on a charge controller</h2>
        <p className="text-muted leading-7 mb-6">
          You need a stable DC volts range with enough resolution to see 0.01 V, because absorption setpoints and
          wiring losses live in the second decimal place. Any 4,000- or 6,000-count meter does that. A 10 A range is
          handy for small panels, and a CAT rating matters if the same meter goes near mains or high-voltage PV
          strings. For more meters suited to this job, see our{" "}
          <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
            best multimeters for solar panel testing
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for solar charge controller checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a backlit 6,000-count display for reading V1, V2 and V3 in a dim locker.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "µA to 10A current ranges for the in-line current check on a small single-panel system, in a tough Fluke case.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with auto and manual ranging at a budget price. A good second meter to watch the battery side.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
