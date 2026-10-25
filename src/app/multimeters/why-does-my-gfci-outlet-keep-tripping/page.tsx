import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Why does my GFCI outlet keep tripping? Moisture, leaky appliances, downstream outlets, wiring faults, a safe isolation routine and when to call an electrician.";

export const metadata = buildMetadata({
  title: "Why Does My GFCI Outlet Keep Tripping?",
  description,
  path: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
});

const all = getAllPicks("multimeters");
const klein = all.find((p) => p.name === "Klein Tools MM400")!;
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const fluke323 = all.find((p) => p.name === "Fluke 323")!;

const link = "text-accent hover:underline";

/** Hot and neutral both pass through a sensing coil; leakage to ground leaves them unequal. */
function GfciSensingDiagram() {
  return (
    <svg
      viewBox="0 0 340 180"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a GFCI sensing coil around the hot and neutral wires; current leaking to ground through a faulty appliance means the current going out on hot no longer equals the current returning on neutral, so the GFCI trips"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <line x1="20" y1="55" x2="250" y2="55" />
        <line x1="20" y1="95" x2="250" y2="95" />
        <ellipse cx="110" cy="75" rx="20" ry="38" className="stroke-accent" strokeWidth="2.2" />
        <rect x="250" y="40" width="70" height="70" rx="4" />
        <line x1="285" y1="110" x2="285" y2="140" className="stroke-accent" strokeDasharray="3 2" />
        <line x1="270" y1="140" x2="300" y2="140" />
        <line x1="275" y1="146" x2="295" y2="146" />
        <line x1="280" y1="152" x2="290" y2="152" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="22" y="48">hot (out)</text>
        <text x="22" y="112">neutral (back)</text>
        <text x="285" y="79" textAnchor="middle">appliance</text>
      </g>
      <text x="110" y="28" fontSize="9.5" textAnchor="middle" className="fill-accent">sensing coil</text>
      <text x="246" y="170" fontSize="9.5" textAnchor="end" className="fill-accent">leakage to ground</text>
      <text x="110" y="135" fontSize="9.5" textAnchor="middle" className="fill-muted">out ≠ back → trip</text>
    </svg>
  );
}

/** One GFCI's LOAD terminals feed further outlets; a fault on any of them trips the GFCI. */
function DownstreamDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring diagram: the panel breaker feeds the LINE terminals of a GFCI in the kitchen, and its LOAD terminals feed a garage outlet and an outdoor outlet; water in the outdoor outlet causes leakage that trips the kitchen GFCI"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="10" y="60" width="54" height="44" rx="4" />
        <rect x="95" y="55" width="70" height="54" rx="4" className="stroke-accent" strokeWidth="2.2" />
        <rect x="200" y="20" width="62" height="40" rx="4" />
        <rect x="200" y="105" width="62" height="40" rx="4" />
        <line x1="64" y1="82" x2="95" y2="82" />
        <path d="M165 72 H182 V40 H200" />
        <path d="M165 92 H182 V125 H200" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="37" y="86">Panel</text>
        <text x="130" y="78">GFCI</text>
        <text x="231" y="44">Garage</text>
        <text x="231" y="129">Outdoor</text>
      </g>
      <g fontSize="9" className="fill-muted">
        <text x="68" y="76">LINE</text>
        <text x="130" y="96" textAnchor="middle">(kitchen)</text>
        <text x="130" y="124" textAnchor="middle">LOAD out</text>
      </g>
      <path d="M262 125 H285" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" />
      <text x="288" y="122" fontSize="9.5" className="fill-accent">water:</text>
      <text x="288" y="134" fontSize="9.5" className="fill-accent">leak</text>
      <text x="170" y="164" fontSize="9.5" textAnchor="middle" className="fill-muted">
        A fault anywhere downstream trips the GFCI you see
      </text>
    </svg>
  );
}

export default function WhyDoesMyGfciOutletKeepTrippingPage() {
  return (
    <HowToShell
      title="Why Does My GFCI Outlet Keep Tripping? Causes and Safe Troubleshooting"
      description={description}
      path="/multimeters/why-does-my-gfci-outlet-keep-tripping"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          A GFCI outlet keeps tripping because it is detecting current that leaves on the hot wire but doesn&apos;t
          come back on the neutral, usually about 4 to 6 milliamps or more escaping to ground. The common
          culprits are water in an outdoor or bathroom box, an appliance with leaky insulation, a fault on an
          outlet wired downstream of the GFCI, a wiring mistake, or a worn-out GFCI. Unplugging everything and
          adding loads back one at a time finds an appliance fault safely; a GFCI that trips with nothing
          connected points to wiring and a licensed electrician. In the UK and Europe the equivalent device is an
          RCD, and the same logic applies.
        </>
      }
      aside={{
        image: klein.image,
        alt: "Klein Tools MM400 digital multimeter",
        caption: (
          <>
            A multimeter confirms whether an outlet is live, but it cannot measure milliamp leakage. Klein has
            discontinued the MM400 (the MM420 replaces it). See our{" "}
            <Link href="/multimeters/klein-mm400-review" className={link}>
              Klein Tools MM400 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "how-it-senses", label: "How a GFCI decides to trip" },
        { id: "numbers", label: "The numbers: milliamps and ohms" },
        { id: "test-the-gfci", label: "Test the GFCI itself" },
        { id: "isolate", label: "Unplug and add back one by one" },
        { id: "downstream", label: "Find the downstream outlets" },
        { id: "moisture", label: "Check for moisture" },
        { id: "measuring-leakage", label: "Why a multimeter can't measure the leak" },
        { id: "electrician", label: "When to call an electrician" },
        { id: "meters", label: "Testers for the job" },
      ]}
      faq={[
        {
          q: "Why does my GFCI trip when it rains?",
          a: "Water getting into an outdoor receptacle, a buried cable splice or an exterior light fixture creates a small path to ground. Once it dries the GFCI resets fine, which is why the problem comes and goes with the weather. Check covers, gaskets and boxes for gaps, and have a damaged outdoor box replaced with an in-use (bubble) cover rated for wet locations.",
        },
        {
          q: "Why does a GFCI trip with nothing plugged into it?",
          a: "Either an outlet or fixture wired to its LOAD terminals has a fault, the line and load connections are swapped, a neutral is shared with another circuit, moisture has reached a box, or the GFCI itself has failed. All of those need boxes opened and wiring tested, which is work for a licensed electrician if you are not qualified to do it safely.",
        },
        {
          q: "Can a refrigerator or freezer trip a GFCI?",
          a: "Yes. Motors and compressors can leak a little current through ageing insulation, and defrost heaters can leak more as they age. Check your local code and the appliance manual before moving a fridge off GFCI protection, since many locations now require it in kitchens, garages and basements. A refrigerator that trips a new GFCI repeatedly needs an appliance repair check.",
        },
        {
          q: "How often should I test a GFCI outlet?",
          a: "Manufacturers commonly recommend pressing the TEST button monthly. It should click, cut power to the outlet and anything downstream, and RESET should restore it. A plug-in tester confirms the power is actually off. If the GFCI doesn't trip on TEST, or won't reset afterward, replace it, because it may no longer protect anyone from a shock.",
        },
        {
          q: "Is it safe to keep resetting a GFCI that trips?",
          a: "Repeated resetting doesn't fix anything. The device is reporting current going somewhere it shouldn't, which could be through damp wiring, an appliance case or a person. Reset once to see whether it holds, then find the cause before relying on that outlet again. If it trips immediately with nothing plugged in, leave it off and call an electrician.",
        },
        {
          q: "Can a bad GFCI trip for no reason?",
          a: "Yes. GFCIs wear out, and internal electronics damaged by surges or age can cause nuisance tripping or the opposite, a device that no longer trips at all. If it trips randomly with nothing connected and no moisture anywhere downstream, or fails its monthly test, replacing the GFCI is the usual fix. Have an electrician do it if you're not qualified.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "Clamping a single conductor safely, and why it differs from a leakage measurement.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Continuity and insulation checks on de-energized cable runs.",
        },
      ]}
    >
      <Callout title="A GFCI trip is a protective device doing its job">
        <ul className="space-y-2 list-disc pl-5">
          <li>Never bypass, tape down or replace a GFCI with a standard outlet to stop the tripping.</li>
          <li>Turn the breaker off and confirm the outlet is dead with a tester before removing a cover plate.</li>
          <li>
            Opening boxes, rewiring or replacing a GFCI is electrical work. If you are not qualified, or local rules
            require a licensed electrician, hire one.
          </li>
          <li>
            If an outlet is scorched, smoking or hot, switch off its breaker and keep it off. If there is fire, get
            out and call 911.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Trips after rain, dew or hosing down", "Moisture in an outdoor box or receptacle", "Inspect covers and gaskets when dry", "Wet-location in-use cover; electrician to repair boxes"],
            ["Trips when one item is plugged in or switched on", "Appliance with leaky insulation", "Unplug-and-add-back routine", "Repair or retire the appliance"],
            ["Trips at start-up of a pump, fridge or tool", "Motor or compressor leakage", "Try the item on its own", "Appliance repair; don't move it off GFCI without checking code"],
            ["Trips with nothing in the GFCI itself", "Fault on a downstream LOAD-side outlet", "Find what goes dead when it trips", "Electrician"],
            ["Will not reset, or outlet stays dead after reset", "Line and load swapped, or no power", "Plug-in tester; check the breaker", "Electrician; see the won't-reset guide"],
            ["Trips when an unrelated circuit is used", "Shared neutral with another circuit", "Note which circuit triggers it", "Electrician"],
            ["Random trips, or fails its monthly TEST", "Worn-out GFCI", "Press TEST; check RESET", "Replace the device"],
          ]}
        />
      </section>

      <section>
        <h2 id="how-it-senses" className="text-xl font-semibold mb-3">How a GFCI decides to trip</h2>
        <p className="text-muted leading-7 mb-4">
          Both the hot and neutral conductors pass through a small current transformer inside the GFCI. When all
          current returns on the neutral, the two magnetic fields cancel. If some current takes another route to
          ground, through damp insulation, an appliance case or a person, the imbalance induces a signal and the
          device opens the circuit. Class A GFCIs listed to UL 943 must trip at a ground-fault current of 6 mA
          and must not trip below 4 mA, so the threshold sits in the range of roughly 4 to 6 mA, far below what a
          standard breaker reacts to. The larger the leakage, the faster the device is required to open.
        </p>
        <Figure caption={<>Normally the current going out on hot equals the current returning on neutral. Any difference, here leaking to ground through an appliance, trips the GFCI.</>}>
          <GfciSensingDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="numbers" className="text-xl font-semibold mb-3">The numbers: milliamps and ohms</h2>
        <p className="text-muted leading-7 mb-4">
          Ohm&apos;s law shows how small a fault has to be. On a 120 V circuit, a leakage path to ground of R ohms
          carries I = V ÷ R. To pass the 6 mA trip level, the path needs R = 120 ÷ 0.006 = 20,000 Ω or less; at the 4 mA
          lower bound it is 120 ÷ 0.004 = 30,000 Ω. A film of rainwater across a receptacle, or the damp insulation of
          an old heating element, can easily fall into that range, while healthy insulation measures in the
          megohms. A 15 A breaker, by contrast, ignores everything below its rating, which is 15,000 mA, thousands of
          times more than the GFCI threshold.
        </p>
        <Figure caption={<>Trip levels on a log scale. GFCI Class A per UL 943; 30 mA is the common RCD rating in the UK and Europe; a breaker responds to overload, not leakage.</>}>
          <BarChart
            log
            items={[
              { label: "GFCI Class A (US)", value: 5, display: "4–6 mA", highlight: true },
              { label: "Typical RCD (UK/EU)", value: 30, display: "30 mA" },
              { label: "15 A breaker", value: 15000, display: "15 A" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Leakage also adds up. Every appliance on the protected circuit leaks a little through its insulation and
          filter capacitors. As an illustrative example, three items leaking 1.5 mA, 1.5 mA and 2 mA total 1.5 + 1.5 + 2 =
          5 mA, right at the trip threshold, even though none of them is faulty on its own. That is why a GFCI may
          hold with any two items plugged in but trip with all three.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="test-the-gfci">Test the GFCI itself</StepHeading>
        <p className="text-muted leading-7">
          Press TEST: the GFCI should click and cut power, which you can confirm with a lamp or a plug-in tester.
          Press RESET firmly and power should return. If it won&apos;t trip on TEST, won&apos;t reset, or the
          indicator light shows an end-of-life fault, the device is the problem and should be replaced. If it
          resets but trips again on its own, carry on with the isolation steps. If it won&apos;t reset at all,
          our guide to{" "}
          <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
            testing a GFCI outlet that won&apos;t reset
          </Link>{" "}
          covers that separate problem. GFCIs made since about 2015 also monitor themselves and, depending on the
          model, either refuse to reset or show a warning light when their protection has failed, so read the
          indicator legend printed on the face before assuming a nuisance trip.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="isolate">Unplug everything and add back one by one</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug everything from the GFCI and from every outlet it protects, then press RESET. If it now holds,
          plug items back in one at a time, waiting through a normal operating cycle for each: a fridge needs to
          start its compressor, a washer needs to heat and spin. The item that brings the trip back is leaking and
          should be repaired or retired. If the trip only returns with several items together, you are seeing
          cumulative leakage; spread those loads across circuits. If the GFCI trips with nothing connected, the
          fault is in the fixed wiring, a downstream outlet, a wet box or the GFCI itself.
        </p>
        <Figure caption={<>Unplug everything first. If the trip comes back with one appliance, that appliance is the suspect; if it trips with nothing connected, the wiring needs an electrician.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug all", sub: "GFCI and downstream outlets" },
              { label: "Reset", sub: "Does it hold?" },
              { label: "Add back one by one", sub: "Watch for the trip" },
              { label: "Still trips empty", sub: "Wiring or GFCI fault" },
              { label: "Electrician", sub: "Opens boxes, tests wiring" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="downstream">Find the downstream outlets</StepHeading>
        <p className="text-muted leading-7 mb-4">
          One GFCI often protects several outlets further along the circuit, including some in other rooms, a
          garage or outdoors. Many are marked with a small &quot;GFCI protected&quot; sticker, but not all. Press
          TEST on the GFCI and walk the house with a lamp or plug-in tester: every outlet that goes dead is
          downstream, and any of them can be the source of the trip. Unplug items from those outlets too before you
          start adding loads back.
        </p>
        <Figure caption={<>Illustrative layout: a fault at the outdoor outlet trips the kitchen GFCI because the outdoor outlet is wired to its LOAD terminals.</>}>
          <DownstreamDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="moisture">Check for moisture</StepHeading>
        <p className="text-muted leading-7">
          If trips cluster after rain, heavy dew, lawn watering or a steamy shower, moisture is the prime suspect.
          With the circuit switched off at the breaker, look at outdoor covers for cracked gaskets, missing plugs
          in unused openings, and boxes that collect water. Exterior light fixtures, pond pumps, holiday lighting
          and buried splices are frequent sources. Outdoor receptacles should have an in-use (bubble) cover that
          stays weatherproof with a plug inserted. Drying a wet box may stop the trips for a while, but corrosion
          left behind keeps leaking, so have a damaged box or receptacle replaced.
        </p>
      </section>

      <section>
        <h2 id="measuring-leakage" className="text-xl font-semibold mb-3">Why a multimeter can&apos;t measure the leak</h2>
        <p className="text-muted leading-7 mb-4">
          The leakage that trips a GFCI is a few milliamps flowing between conductors that are live at mains
          voltage. Measuring it with a multimeter&apos;s current range would mean breaking into the live circuit and
          putting the meter in series, which is hazardous and still would not show the hot-minus-neutral difference
          the GFCI responds to. A standard clamp meter around one wire reads load current in amps and lacks the
          resolution for a few milliamps; clamping hot and neutral together cancels the load current but leaves too
          small a residual for most general-purpose clamps to show clearly.
        </p>
        <p className="text-muted leading-7">
          The tools made for this are a leakage current clamp meter, which resolves milliamps with both conductors
          in the jaw, and an insulation resistance tester, which checks a de-energized cable or appliance at a raised
          test voltage. Our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          explains how leakage clamps differ from general-purpose ones, and{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            how to measure AC current with a clamp meter
          </Link>{" "}
          covers the normal use. A multimeter is still useful for confirming a circuit is dead before work and for
          continuity checks on disconnected cable, as in{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            how to test electrical wires with a multimeter
          </Link>
          . If it is a breaker rather than a GFCI outlet that keeps tripping, see{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>{" "}
          or{" "}
          <Link href="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause" className={link}>
            why an AFCI breaker trips with no obvious cause
          </Link>
          .
        </p>
      </section>

      <section id="electrician">
        <KeyIdea title="When to call a licensed electrician">
          Call one if the GFCI trips with nothing plugged in, will not reset, trips when another circuit is used,
          shows scorch marks or warmth at the outlet, or if water has got into a box. The same applies if you would
          need to open a box to go further. An electrician can trace downstream wiring, verify the line and load
          connections, and test insulation properly with an insulation resistance tester.
        </KeyIdea>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Testers for the job</h2>
        <p className="text-muted leading-7 mb-4">
          None of these measures GFCI leakage directly; that takes a dedicated leakage clamp. They cover the
          safe-work side: proving a circuit dead, confirming voltage, and reading appliance load current. These picks
          come from our verified multimeter and clamp meter list.
        </p>
        <ProductStrip
          title="Meters for proving dead and checking loads"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, with AutoVolt AC/DC selection, LoZ and NCV. Hands-on Tested.",
            },
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 True RMS clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#klein-tools-cl445",
              note: "AC clamp to 600 A with inrush mode and NCV in the jaw, CAT IV 600V. Klein lists no milliamp leakage range.",
            },
            {
              name: "Fluke 323",
              image: fluke323.image,
              alt: "Fluke 323 True RMS clamp meter",
              href: "/multimeters/best-multimeters#fluke-323",
              note: "True RMS AC clamp to 400 A, CAT III 600V / CAT IV 300V, 265 g. AC current only, with no milliamp leakage range listed.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
