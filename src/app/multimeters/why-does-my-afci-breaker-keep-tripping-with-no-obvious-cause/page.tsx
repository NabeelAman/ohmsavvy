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
  "Why an AFCI breaker keeps tripping with no obvious cause: series and parallel arcs, damaged cords, backstabbed outlets, shared neutrals and appliance trips.";

export const metadata = buildMetadata({
  title: "Why Does My AFCI Breaker Keep Tripping?",
  description,
  path: "/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke323 = all.find((p) => p.name === "Fluke 323")!;
const mm420 = all.find((p) => p.name === "Klein Tools MM420")!;

const link = "text-accent hover:underline";

/** Series arc (loose terminal in one conductor) vs parallel arc (hot to neutral through damaged insulation). */
function ArcTypesDiagram() {
  return (
    <svg viewBox="0 0 340 180" className="w-full h-auto" role="img" aria-label="Diagram comparing a series arc at a loose terminal in one conductor with a parallel arc between hot and neutral through damaged insulation">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="45" x2="70" y2="45" />
        <line x1="82" y1="45" x2="150" y2="45" />
        <line x1="20" y1="75" x2="150" y2="75" />
        <line x1="190" y1="45" x2="320" y2="45" />
        <line x1="190" y1="75" x2="320" y2="75" />
      </g>
      <g className="stroke-accent" strokeWidth="1.8" fill="none">
        <polyline points="70,45 73,39 76,51 79,39 82,45" />
        <polyline points="255,45 249,52 261,58 249,64 255,75" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="20" y="38">hot</text>
        <text x="20" y="92">neutral</text>
        <text x="190" y="38">hot</text>
        <text x="190" y="92">neutral</text>
      </g>
      <g fontSize="10.5" textAnchor="middle" className="fill-foreground">
        <text x="85" y="18">Series arc</text>
        <text x="255" y="18">Parallel arc</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="85" y="120">loose or backstabbed</text>
        <text x="85" y="134">terminal, broken strand</text>
        <text x="255" y="120">crushed cord, nail or</text>
        <text x="255" y="134">screw through cable</text>
      </g>
      <text x="170" y="166" fontSize="9.5" textAnchor="middle" className="fill-accent">AFCIs watch the current waveform for both signatures</text>
    </svg>
  );
}

export default function WhyDoesMyAfciBreakerKeepTrippingPage() {
  return (
    <HowToShell
      title="Why Does My AFCI Breaker Keep Tripping With No Obvious Cause?"
      description={description}
      path="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          An AFCI breaker that keeps tripping with no obvious cause is usually reacting to something real but
          hard to see: a cord crushed behind furniture, a receptacle whose wire has worked loose from a push-in
          backstab connection, a neutral shared or crossed between circuits, or an appliance whose motor or
          power supply produces noise that looks like arcing. Unlike an ordinary breaker, an AFCI doesn&apos;t
          wait for too much current. It watches the shape of the current for the jagged signature of an arc,
          which means it can trip on a lightly loaded circuit. Finding the cause is a matter of narrowing down
          when it trips and what is connected.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            A meter can&apos;t see an arc, but it can find the sagging voltage of a poor connection. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-afci-works", label: "What an AFCI is looking for" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "trip-indicator", label: "Read the trip indicator first" },
        { id: "isolate", label: "Isolate cords and appliances" },
        { id: "meter-checks", label: "Meter checks for a poor connection" },
        { id: "shared-neutral", label: "Shared and crossed neutrals" },
        { id: "electrician", label: "When to call an electrician" },
      ]}
      faq={[
        {
          q: "Can a vacuum cleaner trip an AFCI breaker?",
          a: "Yes, it is one of the most common examples. Brushed motors spark at the commutator as a normal part of running, and a worn motor or a damaged vacuum cord adds more. If a trip follows the vacuum from room to room, the vacuum or its cord is the likely cause.",
        },
        {
          q: "Why did my AFCI start tripping after I hung pictures?",
          a: "A nail or screw can nick or pierce a cable inside the wall, creating a path between conductors that arcs intermittently. Note where you drilled or nailed and tell the electrician; that wall is the first place to look.",
        },
        {
          q: "Can I replace an AFCI breaker with a standard breaker to stop the trips?",
          a: "No. Where code requires arc-fault protection it is there to catch a fire risk, and swapping the breaker removes that protection and is usually not permitted. Breaker work inside the panel is also a job for a licensed electrician.",
        },
        {
          q: "Do AFCI breakers wear out or get nuisance trips with age?",
          a: "Breakers can fail like any device, and some manufacturers have released updated versions of earlier AFCI designs to reduce nuisance tripping. An electrician can check whether yours is affected, but rule out the wiring and loads first; a trip is more often right than wrong.",
        },
        {
          q: "Does an AFCI breaker also trip on overloads like a normal breaker?",
          a: "Yes. An AFCI breaker still contains standard overcurrent protection, so a space heater and a hair dryer on the same circuit can trip it exactly as they would a plain breaker. If the trips line up with heavy loads and the circuit draws more than its rating, that is an overload, not an arc. Some models show which kind of trip occurred.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-a-circuit-breaker-keep-tripping",
          title: "Why Does a Circuit Breaker Keep Tripping?",
          desc: "Overload, short circuit and ground-fault trips on standard breakers.",
        },
        {
          href: "/multimeters/why-does-an-extension-cord-overheat",
          title: "Why Does an Extension Cord Overheat?",
          desc: "Undersized cords, coiled cords and worn plugs under load.",
        },
      ]}
    >
      <Callout title="Signs of a dangerous connection: stop and call">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A burning smell, crackling or sizzling from an outlet, switch or wall, scorch marks on a cover
            plate, or a plate that is warm to touch: switch off that breaker, or the main if the source is
            unclear, and call an electrician. For smoke or fire, leave and call 911.
          </li>
          <li>Don&apos;t keep resetting a breaker that trips again immediately.</li>
          <li>
            Never remove the panel cover or open outlet boxes to look for the fault. Every check below is done
            from the outside of the outlet, switch and breaker.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-afci-works" className="text-xl font-semibold mb-3">What an AFCI is looking for</h2>
        <p className="text-muted leading-7 mb-4">
          An arc is current jumping a gap: across a loose terminal, a broken strand or damaged insulation. It
          produces erratic, high-frequency changes in the current that a normal load doesn&apos;t, and
          it can start a fire at currents far below a breaker&apos;s rating. A combination AFCI, the type
          required in many US living areas, looks for two patterns. A series arc happens in one conductor,
          typically at a loose connection, and carries no more than the load current. A parallel arc jumps
          between hot and neutral, or hot and ground, through damaged insulation. Many AFCI breakers also
          sense a modest ground fault, which matters later for shared neutrals.
        </p>
        <Figure caption={<>A series arc sits in one conductor at a bad joint; a parallel arc jumps between conductors through damaged insulation. Both create the irregular current an AFCI is built to detect.</>}>
          <ArcTypesDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Trips when one appliance runs", "Brushed motor, worn cord or noisy power supply", "Try the appliance on another AFCI circuit", "Homeowner; appliance repair"],
            ["Trips when furniture is moved or a door shuts", "Damaged or pinched cord or power strip", "Cords behind beds, sofas and desks", "Homeowner (replace the cord)"],
            ["Trips with nothing plugged in", "Damaged cable in a wall, loose device terminal", "Recent nails, screws or remodeling", "Electrician"],
            ["Trips randomly, worse with heavy loads", "Loose or backstabbed receptacle connection", "Warm plates, voltage drop under load", "Electrician"],
            ["Trips when a different circuit is used", "Shared or crossed neutral", "Which other circuit sets it off", "Electrician"],
            ["Trips at once on reset, every time", "Hard fault in the wiring or the breaker", "Trip indicator, if fitted", "Electrician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="trip-indicator">Read the trip indicator first</StepHeading>
        <p className="text-muted leading-7">
          Many recent AFCI and dual-function breakers record why they last tripped, shown as an LED pattern or
          a code when you follow the maker&apos;s procedure, often involving the TEST button. The method and
          the meaning differ by brand, so check the label inside the panel door or the manufacturer&apos;s
          instructions. Reading it only involves the breaker face, visible through the opening in the panel
          cover. Knowing whether the breaker saw a series arc, a parallel arc or a ground fault cuts the search
          considerably, and it is information worth passing to the electrician.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="isolate">Isolate cords and appliances</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn off and unplug everything on the circuit, including lamps, chargers and power strips, then reset
          the breaker. If it holds overnight, add loads back one at a time, running each through its normal
          use. Vacuum cleaners, treadmills, hair dryers, older dimmer switches and some space heaters and laser
          printers are frequent suspects, because brushed motors and fast-switching electronics create current
          spikes that resemble arcing.
        </p>
        <p className="text-muted leading-7">
          While everything is unplugged, inspect each cord along its full length. Look for flattened sections
          where a chair leg or bed frame has rested, kinks at the plug, cracked insulation and plugs that sit
          loosely in the outlet. A cord damaged on the inside can look fine and still arc when flexed, so retire
          any cord that is visibly crushed. Daisy-chained power strips and undersized extension cords are worth
          removing too; see{" "}
          <Link href="/multimeters/why-does-an-extension-cord-overheat" className={link}>
            why extension cords overheat
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="meter-checks">Meter checks for a poor connection</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A multimeter can&apos;t detect an arc, which lasts microseconds and lives in high frequencies. What it
          can find is the resistance of a loose connection, because that shows up as extra voltage drop under
          load. Use a meter rated at least CAT III 600 V, with safety glasses and your fingers behind the probe
          guards. Measure hot to neutral at an outlet with the circuit lightly loaded, then again while a
          steady load such as a hair dryer on high runs from another outlet on the same circuit.
        </p>
        <Figure caption={<>The same outlet unloaded (left) and with a hair dryer running on the circuit (right). A drop this large points to a poor connection somewhere upstream.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="121.4" unit="V~" mode="V AC  circuit unloaded" />
            <MeterReadout value="109.6" unit="V~" mode="V AC  1500 W load running" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A few volts of drop on a long run is normal. A drop approaching 10% of the unloaded voltage, or a
          reading that flickers while the load runs, suggests a connection heating up somewhere between the
          panel and that outlet. Repeating the test at several outlets along the run can show which box it
          starts at, which saves the electrician time. A clamp meter used with a plug-in line splitter tells
          you how much current an appliance actually draws, as explained in{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>
          , which is useful for ruling out a simple overload. For trips that come and go, the method in{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            finding an intermittent electrical fault
          </Link>{" "}
          also applies.
        </p>
      </section>

      <section>
        <h2 id="shared-neutral" className="text-xl font-semibold mb-3">Shared and crossed neutrals</h2>
        <p className="text-muted leading-7 mb-4">
          Some homes use multiwire branch circuits, where two hots share one neutral. That is legitimate when
          wired with a two-pole breaker or a handle tie, but a single-pole AFCI on each hot sees current
          returning on a neutral it doesn&apos;t monitor and trips. The same thing happens when a neutral from
          one circuit was connected to another during a remodel or when outlets were added.
        </p>
        <p className="text-muted leading-7">
          The giveaway is a trip that only happens when something on a different breaker switches on. Write
          down which circuit sets it off and tell the electrician; correcting it means work inside the panel
          and junction boxes. If you are also seeing lights dim or brighten across the house, read{" "}
          <Link href="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine" className={link}>
            what a lost leg or neutral looks like
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts" className={link}>
            why lights flicker when large appliances start
          </Link>
          .
        </p>
      </section>

      <section id="electrician">
        <KeyIdea title="When to call an electrician">
          Call a licensed electrician if the breaker trips with nothing plugged in, trips again straight after a
          reset, trips when an unrelated circuit is used, or if any outlet or switch on the circuit is warm,
          discolored or crackles. The same goes for a large voltage drop under load, or a nail or screw that
          may have hit a cable. They can open the boxes, find backstabbed or loose terminations, check
          neutrals in the panel and test the breaker. Bring your notes on timing, loads and any trip-indicator
          code. If one appliance is the trigger on every AFCI circuit, take it to the manufacturer or a repair
          shop instead.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for tracing a nuisance trip"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, CAT III 600V, with NCV for a fast live check.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 clamp meter",
              href: "/multimeters/fluke-117-vs-fluke-323",
              note: "True RMS AC clamp to 400A for appliance current through a line splitter. AC current only.",
            },
            {
              name: "Klein Tools MM420",
              image: mm420.image,
              alt: "Klein Tools MM420 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "True RMS, CAT III 600V with Min/Max, a budget option for loaded and unloaded voltage checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
