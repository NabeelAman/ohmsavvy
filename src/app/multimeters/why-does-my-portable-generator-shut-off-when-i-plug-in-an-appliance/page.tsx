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
  "Portable generator shuts off when you plug in an appliance? Starting vs running watts, overload, low oil and fuel faults, and measuring draw with a clamp meter.";

export const metadata = buildMetadata({
  title: "Generator Shuts Off When I Plug In an Appliance",
  description,
  path: "/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance",
});

const all = getAllPicks("multimeters");
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;

const link = "text-accent hover:underline";

export default function GeneratorShutsOffUnderLoadPage() {
  return (
    <HowToShell
      title="Why Does My Portable Generator Shut Off When I Plug in an Appliance?"
      description={description}
      path="/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          When a portable generator shuts off the moment you plug in an appliance, the cause is usually one of
          four things: the appliance asks for more starting power than the generator can deliver for that
          instant, the total load exceeds its running rating, the engine is starved of fuel and stalls as the
          load lands, or a protection system such as low-oil shutdown kicks in. Which of these it is shows in
          how the generator stops. A clamp meter on the appliance cord then tells you what the load really
          draws, so you can match it to the generator&apos;s ratings instead of guessing.
        </>
      }
      aside={{
        image: cl445.image,
        alt: "Klein Tools CL445 HVAC clamp meter",
        caption: (
          <>
            A clamp meter with an inrush mode shows the brief startup surge that a generator has to survive.
            See our{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
              HVAC meter roundup
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-stops", label: "How it stops tells you why" },
        { id: "starting-watts", label: "Running watts vs starting watts" },
        { id: "engine-side", label: "Fuel, oil and engine causes" },
        { id: "outlet-limits", label: "Outlet and cord limits" },
        { id: "measure-draw", label: "Measure the appliance with a clamp meter" },
        { id: "check-output", label: "Check the generator's output voltage" },
        { id: "who-to-call", label: "When to get help" },
      ]}
      faq={[
        {
          q: "Why does my generator run a space heater fine but die when the refrigerator starts?",
          a: "A heater draws a steady current from the moment it switches on. A refrigerator compressor needs a short burst several times its running current to get the motor turning, and that burst, added to whatever else is running, can exceed what the generator can supply even for a second. Start the largest motor load first, with everything else unplugged.",
        },
        {
          q: "Can I plug my generator into a dryer outlet to power the house?",
          a: "No. Backfeeding through a receptacle with a double-male cord can send generator voltage out onto the utility lines, where it can kill a line worker, and it bypasses your panel's protection. The safe ways to feed house circuits are a transfer switch or a listed interlock kit installed by a licensed electrician.",
        },
        {
          q: "Why does my generator shut off on a slope even with oil in it?",
          a: "Low-oil sensors read the level at one point in the crankcase. On a tilt, or with the oil a little below full, the oil can move away from the sensor, especially as engine speed rises under load. Run the generator on level ground and keep the oil at the full mark specified in its manual.",
        },
        {
          q: "Is my inverter generator broken if the overload light comes on?",
          a: "Usually not. Inverter generators protect their electronics by cutting the output when the load exceeds their limit, then lighting an overload indicator. Unplug everything, reset as the manual describes, and reduce or stagger the load.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "Clamping one conductor, using a line splitter and reading the result.",
        },
        {
          href: "/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts",
          title: "Why Do My Lights Flicker When the Refrigerator or AC Starts?",
          desc: "The same motor startup surge, seen on your home's utility supply.",
        },
      ]}
    >
      <Callout title="Generator safety comes before diagnosis">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Carbon monoxide kills. Run a generator outdoors only, well away from doors, windows and vents, never
            in a garage, basement or porch, even with the door open. Fit battery CO alarms inside the home.
          </li>
          <li>
            Never backfeed a house through a wall outlet or dryer receptacle. Feed house circuits only through a
            transfer switch or interlock installed by a licensed electrician.
          </li>
          <li>Shut the engine off and let it cool before refueling or checking the oil.</li>
          <li>
            Use a meter rated CAT II or higher for the voltage, with intact leads, and keep the generator dry.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-stops" className="text-xl font-semibold mb-3">How it stops tells you why</h2>
        <p className="text-muted leading-7 mb-4">
          Watch closely the next time it happens. If the engine keeps running but the outlets go dead, an
          electrical protection device has acted: a breaker on the generator panel or an inverter overload
          circuit. If the engine bogs down, surges and then dies, it could not produce the torque the load
          demanded, which points to overload, a fuel problem or a choke left partly on. If the engine stops
          abruptly with a warning light, the oil sensor or another safety system shut it down.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Engine runs, outlets dead, breaker popped", "Load over the outlet or generator breaker rating", "Breaker on the generator panel; total amps on that outlet", "Homeowner: reduce load, reset breaker"],
            ["Overload light, output cut, engine still on", "Inverter overload protection", "Starting surge of the largest motor load", "Homeowner: stagger loads"],
            ["Engine bogs then stalls as a motor starts", "Starting watts exceed capacity, or weak engine", "Appliance inrush with a clamp meter", "Homeowner; small-engine shop if it bogs at light load"],
            ["Engine dies, oil light on", "Low-oil shutdown, often on a slope", "Oil level on level ground", "Homeowner"],
            ["Runs on choke only, stalls when loaded", "Stale fuel or a varnished carburetor", "Fuel age, fuel valve, choke position", "Small-engine repair shop"],
            ["Stops at the same load it handled last season", "Altitude, heat or a clogged air filter", "Air filter, manual derating notes", "Homeowner; service shop"],
          ]}
        />
      </section>

      <section>
        <h2 id="starting-watts" className="text-xl font-semibold mb-3">Running watts vs starting watts</h2>
        <p className="text-muted leading-7 mb-4">
          Generators carry two ratings. Running (or rated) watts is what the machine can supply continuously.
          Starting (surge, peak) watts is a higher figure it can deliver for a few seconds. Resistive loads such
          as a kettle, toaster or space heater draw roughly the same current from switch-on to switch-off, so
          their running figure is all that matters. Anything with a motor is different: a refrigerator or
          freezer compressor, a sump pump, a well pump, a window air conditioner or a furnace blower draws a
          surge for a fraction of a second to a few seconds while the rotor gets up to speed. That inrush is
          commonly several times the running current, and on a hard-starting compressor it can be more.
        </p>
        <p className="text-muted leading-7 mb-4">
          The trap is that the startup surge stacks on top of everything already running. A generator that
          happily carries a freezer and a heater may still trip when the freezer&apos;s compressor cycles back
          on, because for that instant it sees the heater plus the full compressor inrush. The worked example
          below uses round illustrative numbers to show the shape of the problem; use your own generator&apos;s
          rating plate and your own measured currents for real decisions.
        </p>
        <Figure caption={<>Illustrative example only, not product data: a generator rated 3,000 W running carries the steady load easily but is pushed past its limit for a moment when a compressor starts on top of it.</>}>
          <BarChart
            items={[
              { label: "Generator running rating", value: 3000, display: "3,000 W (example)" },
              { label: "Heater + fridge running", value: 2100, display: "≈2,100 W" },
              { label: "Same, at compressor start", value: 3900, display: "≈3,900 W for a moment", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="engine-side" className="text-xl font-semibold mb-3">Fuel, oil and engine causes</h2>
        <p className="text-muted leading-7 mb-4">
          An engine in poor health may idle smoothly with no load and then collapse when real power is asked of
          it. Gasoline left in the tank or carburetor for months can go stale and leave varnish in the small
          jets; the classic sign is an engine that only runs with the choke partly closed. Check that the fuel
          valve is fully open, the tank vent is not blocked, and the air filter is clean. Many manufacturers
          recommend fuel stabilizer or draining the carburetor for storage, so check your manual.
        </p>
        <p className="text-muted leading-7">
          Low-oil shutdown protects the engine, and it is triggered more easily than many owners expect. Check
          the level with the generator on flat ground and the engine off, using the oil grade in the manual.
          Running on a slope, or with the oil just under the full line, can let the sensor trip as engine speed
          rises with load. Generators also lose output at high altitude and in high heat; manuals often give a
          derating figure. If the engine still bogs at a light load after fresh fuel and a clean filter, a
          small-engine repair shop should look at the carburetor and governor.
        </p>
      </section>

      <section>
        <h2 id="outlet-limits" className="text-xl font-semibold mb-3">Outlet and cord limits</h2>
        <p className="text-muted leading-7 mb-4">
          A generator&apos;s headline wattage is rarely available from a single 120 V duplex outlet. Each
          receptacle sits behind its own breaker, commonly 20 A, and on many models the 120 V outlets are split
          across two halves of the alternator winding so that one outlet can only reach part of the total. The
          manual or the panel labels show which outlets share a breaker. Spreading big loads across separate
          outlets, or using the generator&apos;s larger twist-lock outlet through a properly rated cord set, often
          solves a trip that looked like an undersized generator.
        </p>
        <p className="text-muted leading-7">
          Long or thin extension cords add their own problem. Voltage drop along the cord means a motor at the
          far end sees a lower voltage, takes longer to start and draws its high starting current for longer.
          Use the shortest heavy-gauge outdoor cord that reaches, and feel it after use: a warm cord is
          undersized for the job. Our guide to{" "}
          <Link href="/multimeters/why-does-an-extension-cord-overheat" className={link}>
            why an extension cord overheats
          </Link>{" "}
          covers gauge and length in detail.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="measure-draw">Measure the appliance with a clamp meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A clamp meter reads current by sensing the magnetic field around one conductor, so you never open the
          circuit. Clamping a whole appliance cord reads close to zero, because the hot and neutral currents
          cancel. Plug the appliance into a line splitter, a short adapter that separates one conductor into a
          loop, and clamp the loop marked for amps (some splitters also have a ×10 loop for small loads). Do
          this on normal house power first, so the generator is not part of the test.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7 mb-4">
          <li>Read the steady running current once the appliance has settled.</li>
          <li>
            Switch to the meter&apos;s inrush mode, if it has one, and capture the startup peak as the
            appliance starts or the compressor cycles on.
          </li>
          <li>
            Multiply amps by the supply voltage for an approximate VA figure. For motors, real watts are lower
            than that because of power factor, so a power clamp that reads watts and power factor gives the most
            honest number.
          </li>
        </ul>
        <Figure caption={<>Running current (left) and the inrush peak captured at compressor start (right). The figures are an example; your appliance will differ, and the ratio is what matters.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="5.8" unit="A" mode="A~  running" />
            <MeterReadout value="27.4" unit="A" mode="A~  INRUSH" />
          </div>
        </Figure>
        <p className="text-muted leading-7">
          Add the running currents of everything you plan to run, then add the largest single inrush figure on
          top. If that sum, times voltage, exceeds the generator&apos;s starting rating, you have found the
          problem. For technique, see{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          , and for choosing one with inrush capture, our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-output">Check the generator&apos;s output voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the generator running outdoors and nothing connected, put your meter on AC volts and insert the
          probes into the slots of a 120 V outlet on the generator. Expect a reading near 120 V; conventional
          open-frame generators often run a little high with no load and settle lower as load is added, while
          inverter models tend to hold steadier. Then plug in a modest resistive load, such as a work light, and
          read again. If your meter shows frequency, a reading near 60 Hz confirms the engine speed is correct.
        </p>
        <p className="text-muted leading-7">
          A large voltage sag under a light load, or a frequency well off 60 Hz, suggests a governor, carburetor
          or alternator fault rather than an appliance problem. Never open the generator&apos;s control panel or
          alternator cover to chase it; that is for the manufacturer&apos;s service network. The same Min/Max
          technique used in{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking voltage fluctuations at home
          </Link>{" "}
          works here, too.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="When to get help, and from whom">
          A small-engine shop or the manufacturer&apos;s service center should handle an engine that surges,
          stalls at light load or will not hold speed, and any generator still under warranty. A licensed
          electrician should install a transfer switch or interlock and an inlet box before you power any house
          circuits. If a generator breaker trips with almost nothing plugged in, or you smell burning from the
          alternator, stop using it and have it serviced.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Clamp meters that capture startup current"
          items={[
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 HVAC clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "600 A AC with an inrush mode and simultaneous volts and amps display, rated CAT IV 600V.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D AC/DC clamp meter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "Budget AC/DC clamp to 1000 A with AC inrush, LoZ and NCV, rated CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 HVACR power clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "Reads watts, VA and power factor as well as inrush, so motor loads can be sized in real watts.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
