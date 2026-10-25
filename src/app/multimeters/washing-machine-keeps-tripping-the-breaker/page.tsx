import Link from "next/link";
import {
  BarChart,
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why a washing machine keeps tripping the breaker: match the trip to the cycle stage, tell leakage from overcurrent, and run safe unplugged resistance checks.";

export const metadata = buildMetadata({
  title: "Washing Machine Keeps Tripping the Breaker",
  description,
  path: "/multimeters/washing-machine-keeps-tripping-the-breaker",
});

const all = getAllPicks("multimeters");
const kaiweets = all.find((p) => p.name === "KAIWEETS KM200s")!;
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const kleinMm450 = all.find((p) => p.name === "Klein Tools MM450")!;

const link = "text-accent hover:underline";

/** Wash cycle timeline with the component most often responsible at each stage. */
function CycleTimeline() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" role="img" aria-label="Timeline of a wash cycle showing which component is most often behind a trip at plug-in, fill, heating and spin">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="60" x2="320" y2="60" />
        <circle cx="40" cy="60" r="6" className="fill-surface" />
        <circle cx="120" cy="60" r="6" className="fill-surface" />
        <circle cx="210" cy="60" r="6" className="fill-surface" />
        <circle cx="295" cy="60" r="6" className="fill-surface" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="40" y="40">Plug-in</text>
        <text x="120" y="40">Fill</text>
        <text x="210" y="40">Heat</text>
        <text x="295" y="40">Spin</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="40" y="88">filter, cord</text>
        <text x="40" y="102">wet wiring</text>
        <text x="120" y="88">inlet valve</text>
        <text x="120" y="102">leak onto parts</text>
        <text x="295" y="88">motor</text>
        <text x="295" y="102">brushes, wiring</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="210" y="88">heating element</text>
        <text x="210" y="102">leak to earth</text>
      </g>
      <text x="170" y="138" fontSize="9.5" textAnchor="middle" className="fill-muted">Stage of cycle when it trips → part to check first</text>
    </svg>
  );
}

/** How a residual-current device sees a leak: live and neutral pass through one sensor; a leak to the earthed chassis unbalances them. */
function LeakagePathDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: the live and neutral wires pass through the sensing coil of an RCD or GFCI on their way to the washer's heating element. A leak from the element to the earthed metal chassis lets some current return through the earth wire instead of the neutral, so the live and neutral currents no longer match and the device trips."
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {/* live and neutral */}
        <line x1="50" y1="50" x2="262" y2="50" />
        <line x1="50" y1="90" x2="262" y2="90" />
        <line x1="262" y1="50" x2="262" y2="56" />
        <line x1="262" y1="84" x2="262" y2="90" />
        {/* heating element */}
        <rect x="254" y="56" width="16" height="28" rx="2" className="fill-surface" />
        {/* chassis */}
        <rect x="195" y="30" width="135" height="125" rx="6" className="stroke-border" strokeDasharray="5 3" />
        {/* earth wire and symbol */}
        <line x1="230" y1="155" x2="230" y2="168" />
        <path d="M218 168 H242 M222 173 H238 M226 178 H234" />
      </g>
      {/* sensing coil */}
      <ellipse cx="90" cy="70" rx="14" ry="32" fill="none" className="stroke-accent" strokeWidth="2.2" />
      {/* leak path */}
      <path d="M270 70 H330" fill="none" className="stroke-accent" strokeWidth="1.8" strokeDasharray="4 3" />
      <path d="M330 70 V155 H230" fill="none" className="stroke-accent" strokeWidth="1.2" strokeDasharray="4 3" />
      <g fontSize="10" className="fill-foreground">
        <text x="8" y="74">Supply</text>
        <text x="130" y="44">L (live / hot)</text>
        <text x="130" y="104">N (neutral)</text>
        <text x="90" y="16" textAnchor="middle" className="fill-accent">RCD / GFCI sensor</text>
        <text x="249" y="74" textAnchor="end">element</text>
        <text x="300" y="64" textAnchor="middle" className="fill-accent" fontSize="9.5">leak</text>
      </g>
      <g fontSize="9" className="fill-muted">
        <text x="262" y="146" textAnchor="middle">washer chassis</text>
        <text x="230" y="194" textAnchor="middle">earth / ground</text>
        <text x="16" y="136">Trips when L and N</text>
        <text x="16" y="149">currents differ by about</text>
        <text x="16" y="162">4–6 mA (US GFCI) or</text>
        <text x="16" y="175">up to 30 mA (30 mA RCD)</text>
      </g>
    </svg>
  );
}

export default function WashingMachineKeepsTrippingTheBreakerPage() {
  return (
    <HowToShell
      title="Why Does a Washing Machine Keep Tripping the Breaker? Electrical Fault Diagnosis"
      description={description}
      path="/multimeters/washing-machine-keeps-tripping-the-breaker"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          A washing machine keeps tripping the breaker because something inside it is either leaking current
          to earth, most often the heating element, the motor or wiring that has got wet, or drawing more
          current than the circuit allows. If an RCD, GFCI or RCBO trips, suspect leakage; if a plain breaker
          trips, suspect a short or an overloaded circuit. The stage of the cycle when it trips (plug-in, fill,
          heating or spin) then narrows the list to one or two parts, and a multimeter lets you check those
          parts safely with the machine unplugged.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter",
        caption: (
          <>
            Every check on this page is a resistance test on an unplugged machine. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "when-it-trips", label: "1. Note when it trips" },
        { id: "which-device", label: "2. RCD/GFCI trip or breaker trip?" },
        { id: "element-check", label: "3. Check the element to chassis" },
        { id: "other-parts", label: "4. Motor, filter, door lock and leaks" },
        { id: "shared-circuit", label: "5. Rule out an overloaded circuit" },
        { id: "numbers", label: "The numbers behind a trip" },
        { id: "limits", label: "What a multimeter can miss" },
        { id: "meters", label: "Meters for appliance checks" },
      ]}
      faq={[
        {
          q: "Why does my washing machine trip the electrics as soon as I plug it in?",
          a: "A trip before any program starts points to the mains side of the machine: the power cord, the plug, the interference suppressor or filter near the cord entry, the door lock, or wiring that has got wet. Nothing else is powered yet, so the fault has to be there. Leave the machine unplugged and have the cord, filter and connections inspected before you try it again.",
        },
        {
          q: "Can a washing machine trip the breaker because of a water leak?",
          a: "Yes, and it is one of the most common causes. A leaking hose, pump seal or door boot can drip onto the pump, motor connections or wiring loom and create a path to the earthed chassis. Look for water marks, rust, detergent crust or limescale trails inside the base and on connectors. Dry and clean the parts, fix the leak, and replace anything corroded.",
        },
        {
          q: "My heating element tested fine. Why does it still trip when heating?",
          a: "A multimeter checks insulation with only a few volts, so an element can read OL cold and still leak at mains voltage once it is hot and the sheath expands. An insulation resistance test, done by an appliance technician at a much higher test voltage, is the definitive check. Also inspect the element's connectors and the wiring loom near it for scorching or damp.",
        },
        {
          q: "Is it safe to keep resetting the breaker and running the wash?",
          a: "No. A trip means the protection found a fault, and an earth leakage fault can put the metal cabinet at a dangerous voltage if the earth connection is ever poor. Repeated resets also stress the breaker and the fault itself. Leave the machine unplugged until the cause is found and fixed, and call an electrician if the trips continue with the washer disconnected.",
        },
        {
          q: "Why does my washer trip the GFCI but not the regular breaker?",
          a: "Because they measure different things. A GFCI compares the current going out on the hot wire with the current coming back on the neutral and trips at a difference of roughly 4 to 6 mA. The breaker only trips on total current, typically 15 or 20 A in a US laundry circuit. A small leak to ground is thousands of times too small to trip the breaker.",
        },
        {
          q: "How many amps does a washing machine draw?",
          a: "It depends on the model and on whether it heats its own water. The rating plate inside the door or on the back states the voltage and power, and current is power divided by voltage. A 2,000 W heater on 230 V draws about 8.7 A; the same power at 120 V would need about 16.7 A. Motors draw much less than heaters, except briefly at start-up.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter",
          title: "How to Test a Washing Machine Heating Element",
          desc: "The full resistance and earth test of the element itself, with expected values.",
        },
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "How earth leakage protection works, and how to isolate the cause.",
        },
      ]}
    >
      <Callout title="Unplug before every check">
        <ul className="space-y-2 list-disc pl-5">
          <li>Pull the plug from the wall socket before removing any panel. Switching the dial off is not enough.</li>
          <li>Never run the machine with panels removed to watch for the fault, and never bypass or tape over a GFCI or RCD.</li>
          <li>
            If the breaker trips with the washer unplugged, or the socket or plug shows scorch marks, stop and call a
            licensed electrician. If you are not comfortable working inside an appliance, a qualified appliance
            technician should carry out these tests.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          Find the row that matches what you see, then follow the numbered steps below for the detail. Every
          check in the third column is done with the machine unplugged unless it says otherwise.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Trips instantly at plug-in or switch-on", "Mains cord, suppressor/EMI filter, wet wiring or door lock", "Inspect cord and filter; ohms from each mains pin to earth pin", "Replace the cord or filter; technician if the wiring is wet"],
            ["Trips during the fill", "Inlet valve coil, or water leaking onto wiring or pump", "Look for drips; ohms from valve terminals to chassis", "Fix the leak, dry the parts, replace the valve"],
            ["Trips when the water starts to heat", "Heating element leaking to earth", "Ohms from each element terminal to the earth stud (expect OL)", "Replace the element; technician for an insulation test"],
            ["Trips during tumble or spin", "Motor windings, brushes, motor wiring or drain pump", "Ohms from each motor terminal to the motor frame", "Clean carbon dust, replace brushes or motor; technician"],
            ["Plain breaker trips only with other loads running", "Overloaded or shared circuit", "Run the washer alone; add up the rating plates on the circuit", "Move loads; electrician to add a dedicated circuit"],
            ["Trips even with the washer unplugged", "Fault in the fixed wiring, outlet or the protective device", "Leave it unplugged and reset", "Licensed electrician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="when-it-trips">Note when it trips</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Run through the timing from memory of the last few failed washes, or watch one cycle from a distance
          with the panels on. Each stage of a wash switches in a different set of parts, so the moment of the
          trip is the single most useful clue you have. At plug-in only the mains filter, cord and door lock
          circuit are live. During the fill the inlet valve solenoids open. Heating brings in the largest load
          in the machine, and tumble and spin bring in the motor.
        </p>
        <Figure caption={<>Each stage of the cycle switches in different parts, so the moment of the trip points to the part to test first.</>}>
          <CycleTimeline />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A trip that happens at a random point, and only when the dryer, a kettle or a space heater is also
          running, is the odd one out: that pattern points at the circuit rather than the machine, and step 5
          covers it.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="which-device">Find out which device tripped</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Look at the panel, or the outlet, after a trip. If a GFCI outlet, an RCD or a combined RCBO has
          operated, it saw current leaking to earth, so the fault is insulation breaking down somewhere. If a
          plain circuit breaker tripped, the circuit drew more current than its rating, from a short between
          conductors, a seized motor or too many loads on one circuit. Telling these apart halves the search.
        </p>
        <Figure caption={<>A residual-current device passes live and neutral through one sensor. Normally the two currents are equal. A leak from the element to the earthed chassis sends part of the current home through the earth wire, and the imbalance trips the device.</>}>
          <LeakagePathDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The thresholds are worlds apart, which is why the distinction matters. A US Class A GFCI is designed
          to trip at a leak of roughly 4 to 6 mA. In the UK and much of Europe, the RCDs protecting socket
          circuits are commonly rated 30 mA and may trip anywhere from about half that figure up to 30 mA. A
          15 A breaker, by contrast, needs a total current of 15 A or more, sustained, before its thermal trip
          acts. For the detail of how leakage sensing works, see{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI outlet keeps tripping
          </Link>
          ; for the plain-breaker version of the problem around the house, see{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="element-check">Check the heating element to chassis</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If it trips once heating begins, the element is the first suspect. With the machine unplugged and the
          back panel off, photograph the wiring, pull the wires off the element, set the meter to its highest
          resistance range, and measure from each element terminal to the earth stud or bare metal of the
          flange. A healthy element shows OL to earth on both terminals. Any finite reading means the
          insulation inside the sheath is leaking. Our separate guide on{" "}
          <Link href="/multimeters/how-to-test-a-washing-machine-heating-element-with-a-multimeter" className={link}>
            testing a washing machine heating element
          </Link>{" "}
          covers the element itself, including the expected resistance across its terminals.
        </p>
        <Figure caption={<>Illustrative readings from an element terminal to its earth stud: OL is what you want (first reading). A finite reading, whatever its size, indicates leakage (second reading).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="OL" unit="MΩ" mode="Ω  terminal to earth" />
            <MeterReadout value="0.48" unit="MΩ" mode="Ω  leaking to earth" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          It is worth doing the arithmetic on that second, illustrative reading, because it explains a puzzle
          many people hit. Leakage current is voltage divided by insulation resistance. At 120 V, 0.48 MΩ lets
          through 120 ÷ 480,000 ≈ 0.25 mA; at 230 V it is about 0.48 mA. Both are below any trip threshold. So
          why does it trip? Because the cold, low-voltage reading is only the early warning: once the element
          is hot and full mains voltage is across the cracked insulation, its resistance can fall much further.
          To pass 5 mA at 120 V the insulation only has to drop to 120 ÷ 0.005 = 24 kΩ; to pass 30 mA at 230 V,
          about 7.7 kΩ.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="other-parts">Check the motor, filter, door lock and leaks</StepHeading>
        <p className="text-muted leading-7 mb-4">
          For a trip on tumble or spin, unplug the motor connector and measure from each motor terminal to the
          motor frame; again, anything other than OL is suspect. Brushed motors also shed carbon dust that can
          bridge to the case, so a motor that tests clean after you blow the dust out has told you something.
          The method is the same one used in{" "}
          <Link href="/multimeters/how-to-check-a-motor-winding-for-a-short-with-a-multimeter" className={link}>
            how to check a motor winding for a short
          </Link>
          . The inlet valve is a pair of small solenoid coils; their coil resistance and their insulation to the
          valve body can be checked the way our{" "}
          <Link href="/multimeters/how-to-test-a-solenoid-valve-coil-resistance-with-a-multimeter" className={link}>
            solenoid valve coil guide
          </Link>{" "}
          describes.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Suppressor or EMI filter:</span> the small block where the mains
            cord enters. Its internal capacitors connect to earth by design, and when they fail they can trip
            protection the moment the machine is plugged in.
          </li>
          <li>
            <span className="text-foreground">Door lock:</span> a mains-powered interlock that can short if
            water or detergent gets inside.
          </li>
          <li>
            <span className="text-foreground">Water damage:</span> inspect the base, the pump and every
            connector for drips, corrosion or limescale tracking. Dry and clean affected parts, and replace any
            that are corroded.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={5} id="shared-circuit">Rule out an overloaded circuit</StepHeading>
        <p className="text-muted leading-7">
          A washer that heats its own water draws a substantial current. If a dryer, dishwasher, kettle or
          heater shares the same circuit, the total can exceed the breaker rating even with every appliance
          healthy. The giveaway is a plain breaker trip, never a GFCI or RCD, that only happens when other loads
          run at the same time. Add up the wattage on each rating plate and divide by the supply voltage: a
          1,500 W space heater (12.5 A at 120 V) plus a washer heating at even 1,000 W (8.3 A) already asks
          more than 20 A of a 20 A circuit. Running the washer alone, or having an electrician check the circuit
          layout, settles it.
        </p>
        <p className="text-muted leading-7 mt-4">
          Also look at the socket and plug. Scorching, a loose fit or a plug that feels warm after a wash
          suggests a poor connection, which heats up under load. Extension cords and multi-way adapters are a
          common weak point for high-current appliances, and the machine&apos;s manual usually asks for it to
          be plugged straight into a wall outlet. A damaged outlet or plug is a job for an electrician, not
          something to keep resetting around.
        </p>
      </section>

      <section>
        <h2 id="numbers" className="text-xl font-semibold mb-3">The numbers behind a trip</h2>
        <p className="text-muted leading-7 mb-4">
          The chart puts the three kinds of protection on one scale. The values are typical design figures,
          not measurements: check the rating printed on your own device.
        </p>
        <Figure caption={<>Current needed to trip each device, on a log scale. Leakage devices act on a few milliamps of imbalance; a breaker needs thousands of times more total current.</>}>
          <BarChart
            log
            items={[
              { label: "US GFCI (Class A)", value: 5, display: "4–6 mA", highlight: true },
              { label: "UK/EU RCD", value: 30, display: "≤30 mA" },
              { label: "15 A breaker", value: 15000, display: "15 A" },
              { label: "20 A breaker", value: 20000, display: "20 A" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          The heating element is usually the biggest load in the machine, and current is simply power divided
          by voltage. The table shows the arithmetic for some common element ratings. Your machine&apos;s
          actual figure is on its rating plate; many US washers that heat internally use smaller elements than
          European machines, and some don&apos;t heat at all.
        </p>
        <DataTable
          head={["Element rating", "At 230 V", "At 120 V"]}
          mono={[1, 2]}
          rows={[
            ["1,000 W", "1,000 ÷ 230 ≈ 4.3 A", "1,000 ÷ 120 ≈ 8.3 A"],
            ["2,000 W", "2,000 ÷ 230 ≈ 8.7 A", "2,000 ÷ 120 ≈ 16.7 A"],
            ["2,400 W", "2,400 ÷ 230 ≈ 10.4 A", "2,400 ÷ 120 = 20 A"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A plain breaker trip that coincides with heating, on a circuit with nothing else running, is unusual
          for a healthy machine on a correctly sized circuit. It points to a short in the element or its wiring
          rather than a simple overload. A breaker that trips the instant you plug in, with a bang or a flash,
          is the magnetic part of the breaker reacting to a short circuit, and the machine should not be
          plugged in again until it has been repaired.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">The diagnostic order</h2>
        <FlowDiagram
          steps={[
            { label: "When?", sub: "Plug-in, fill, heat or spin" },
            { label: "Which device?", sub: "GFCI/RCD = leak; breaker = overcurrent" },
            { label: "Unplugged ohms", sub: "Each part to chassis: expect OL" },
            { label: "Run alone", sub: "Rules out a shared circuit" },
            { label: "Still trips?", sub: "Technician insulation test" },
          ]}
        />
      </section>

      <section id="limits">
        <KeyIdea title="A multimeter can pass a part that still leaks">
          The ohms range tests insulation with only a few volts. Some faults, such as a cracked element sheath
          or damp motor windings, only conduct at mains voltage or when hot. An insulation resistance tester
          applies a much higher test voltage to a de-energized part and is the proper tool for this job; many
          appliance test procedures treat about 1 MΩ as the minimum acceptable insulation resistance for an
          earthed appliance. If every multimeter check passes and the trips continue, call an appliance
          technician or electrician.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          Two other things a multimeter will not show you: the small leakage that a healthy machine&apos;s
          mains filter passes to earth by design, and the way leakage from several appliances adds up when they
          share one RCD. A board where the washer, a refrigerator and a computer all sit behind the same 30 mA
          device can trip on the sum of several small, individually normal leaks. That is a wiring layout
          question for an electrician, not a fault in the washer.
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for appliance checks</h2>
        <p className="text-muted leading-7 mb-4">
          Every test above is a resistance check on an unplugged machine, so any working digital multimeter
          will do the core job. A meter that reads into the megohms, makes it hard to leave a lead in the wrong
          jack, and carries a proper safety rating for later work at the outlet is worth having. These picks
          come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Meters suited to appliance fault-finding"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with NCV plus the AutoVolt and LoZ modes the 115 lacks. Hands-on Tested.",
            },
            {
              name: "Klein Tools MM450",
              image: kleinMm450.image,
              alt: "Klein Tools MM450 True RMS multimeter",
              href: "/multimeters/best-multimeters#klein-tools-mm450",
              note: "True RMS, CAT III 600V, with Lead-Alert lights that show where the leads belong. No LoZ or NCV.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS with auto-ranging, NCV and a backlit display. CAT II 600V, so not for panel work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
