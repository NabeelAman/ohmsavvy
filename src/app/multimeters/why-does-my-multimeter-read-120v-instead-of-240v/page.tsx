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

// Product facts on this page:
// - Fluke 117: CAT III 600V, True RMS, LoZ, VoltAlert NCV, per the Pick in src/app/multimeters/best-multimeters/page.tsx
//   and https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117 (see fluke-117-review).
// - Klein Tools MM720: CAT IV 600V / CAT III 1000V, LoZ, True RMS, per the Pick in src/lib/multimeter-catalog.ts
//   (Specs per kleintools.com).
// - Fluke 87V: CAT IV 600V / CAT III 1000V, True RMS, per
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v (see fluke-87v-review).
// Service voltages: nominal 120/240 V split-phase and 120/208 V three-phase wye are standard North American
// systems; ANSI C84.1 Range A service limits (114-126 V and 228-252 V) are hedged in the text.

const description =
  "Multimeter reads 120 volts instead of 240? See how split-phase power works, which probe points give 120 V, and how to spot a lost leg or loose neutral safely.";

export const metadata = buildMetadata({
  title: "Multimeter Reads 120V Instead of 240V? Why",
  description,
  path: "/multimeters/why-does-my-multimeter-read-120v-instead-of-240v",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Center-tapped utility transformer secondary with the three readings a meter can take. */
function SplitPhaseReadingsDiagram() {
  return (
    <svg
      viewBox="0 0 360 260"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a 120/240 volt split-phase service. The utility transformer's secondary winding is tapped in the middle; the center tap is the neutral, bonded to ground at the service. The two ends are hot legs L1 and L2. A meter from L1 to neutral reads about 120 volts, from L2 to neutral about 120 volts, and from L1 to L2 about 240 volts, because the two legs are 180 degrees apart and their voltages add."
    >
      {/* secondary winding drawn as coils */}
      <g className="stroke-foreground" strokeWidth="1.8" fill="none">
        <path d="M60 40 q14 10 0 20 q14 10 0 20 q14 10 0 20 q14 10 0 20" />
        <path d="M60 130 q14 10 0 20 q14 10 0 20 q14 10 0 20 q14 10 0 20" />
        <line x1="60" y1="40" x2="200" y2="40" />
        <line x1="60" y1="130" x2="200" y2="130" />
        <line x1="60" y1="210" x2="200" y2="210" />
        <line x1="60" y1="120" x2="60" y2="130" />
        <line x1="130" y1="130" x2="130" y2="160" />
        <line x1="118" y1="160" x2="142" y2="160" />
        <line x1="122" y1="165" x2="138" y2="165" />
        <line x1="126" y1="170" x2="134" y2="170" />
      </g>
      <g className="fill-foreground">
        <circle cx="200" cy="40" r="3" />
        <circle cx="200" cy="130" r="3" />
        <circle cx="200" cy="210" r="3" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="206" y="44" fontWeight="600">L1 (hot)</text>
        <text x="206" y="134" fontWeight="600">N (neutral)</text>
        <text x="206" y="214" fontWeight="600">L2 (hot)</text>
        <text x="20" y="28">transformer</text>
        <text x="20" y="250">secondary</text>
        <text x="144" y="175" className="fill-muted">bonded to ground</text>
      </g>
      {/* meter brackets */}
      <g className="stroke-accent" strokeWidth="1.6" fill="none" strokeDasharray="4 3">
        <path d="M268 40 H282 V130 H268" />
        <path d="M268 130 H282 V210 H268" />
        <path d="M300 40 H330 V210 H300" />
      </g>
      <g fontSize="10" className="fill-accent" fontWeight="700">
        <text x="286" y="88">120</text>
        <text x="286" y="174">120</text>
        <text x="334" y="129">240</text>
      </g>
      <g fontSize="9" className="fill-muted">
        <text x="20" y="94">half</text>
        <text x="20" y="106">winding</text>
        <text x="20" y="184">half</text>
        <text x="20" y="196">winding</text>
      </g>
    </svg>
  );
}

export default function MultimeterReads120Instead240Page() {
  return (
    <HowToShell
      title="Why Does My Multimeter Read 120V Instead of 240V?"
      description={description}
      path="/multimeters/why-does-my-multimeter-read-120v-instead-of-240v"
      category="multimeters"
      published="2026-10-29"
      intro={
        <>
          Your multimeter reads 120 volts instead of 240 most often because one probe is on a hot leg and the
          other is on neutral or ground, which only spans half of a US split-phase supply. You read 240 V only
          between the two hot legs; if you are already hot-to-hot and still see about 120 V, one leg has been
          lost at a breaker, a connection or the utility, and that is a job for an electrician or the power
          company. Meter setup mistakes rarely produce a clean 120, so a steady 120 V reading is usually telling
          you something real about where you probed or what the supply is doing.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 multimeter for checking 120 and 240 volt household circuits",
        caption: (
          <>
            A CAT III 600V meter suits receptacle and appliance checks in a home. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "split-phase", label: "How 120 and 240 share one supply" },
        { id: "causes", label: "Causes at a glance" },
        { id: "reading-map", label: "What each reading means" },
        { id: "step-probes", label: "1. Check where the probes are" },
        { id: "step-meter", label: "2. Rule out the meter" },
        { id: "step-each-leg", label: "3. Measure each leg to neutral" },
        { id: "step-208", label: "4. Is it 208, not 120?" },
        { id: "step-appliance", label: "5. Understand the appliance" },
        { id: "step-escalate", label: "6. Lost leg or neutral: call for help" },
        { id: "meters", label: "Meters for 240 V work" },
      ]}
      faq={[
        {
          q: "Why do I get 120 volts from a 240 volt outlet to ground?",
          a: "Because each hot terminal of a 240 V outlet is one leg of the split-phase supply, and each leg sits about 120 V away from ground and neutral. That reading is normal and expected. The 240 V only appears when you measure between the two hot terminals. Measuring each hot to ground is still a useful check, since both should read close to 120 V.",
        },
        {
          q: "Is 120 volts on each leg the same as 240 volts?",
          a: "On a split-phase service, yes, provided the two legs come from opposite ends of the transformer winding. Their voltages are opposite in polarity at every instant, so measured end to end they add to about 240 V. If both of your measured hots came from the same leg, they would be in step and you would read roughly zero between them instead.",
        },
        {
          q: "What does it mean if hot to hot reads 0 volts?",
          a: "A near-zero hot-to-hot reading with both hots at about 120 V to neutral means both conductors are fed from the same leg. That can happen when a 240 V circuit is wired to two single-pole breakers that land on the same bus, in some tandem breaker arrangements, or on a generator switched to 120 V only. A licensed electrician should correct it.",
        },
        {
          q: "Can a bad double-pole breaker give 120 volts instead of 240?",
          a: "Yes. A double-pole breaker has one contact for each leg. If one contact fails or its bus connection is burnt, one hot still reads about 120 V to neutral while the other reads near zero, and hot to hot falls to around 120 V or less. Replacing a breaker means working inside a live panel, so leave it to an electrician.",
        },
        {
          q: "Why does my dryer run but not heat?",
          a: "In many electric dryers the motor, timer and light run on 120 V between one hot and neutral, while the heating element needs the full 240 V across both hots. If one leg is missing, the drum can turn while the element stays cold. Measure the receptacle with the dryer unplugged; if hot to hot reads about 120 V, the supply is at fault, not the dryer.",
        },
        {
          q: "My apartment reads 208 volts, not 240. Is something wrong?",
          a: "Probably not. Many apartment buildings and commercial spaces are fed from a three-phase 120/208 V system. Each hot is still about 120 V to neutral, but two hots are 120 degrees apart rather than 180, so they combine to about 208 V. Appliances sold for those buildings are rated for 208 V or 208/240 V. Check the appliance's nameplate.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine",
          title: "Why Does Half My House Have No Power?",
          desc: "What to do when a whole service leg is missing.",
        },
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations at Home",
          desc: "Readings that wander up and down, and what they point to.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit",
          title: "Voltage on a Disconnected Circuit?",
          desc: "Ghost voltage and why LoZ mode helps tell it apart.",
        },
        {
          href: "/multimeters/best-multimeter-for-electricians",
          title: "Best Multimeter for Electricians",
          desc: "Meters with the CAT ratings that suit 240 V work.",
        },
      ]}
    >
      <Callout title="Safety: 240 V circuits can kill">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A 240 V circuit delivers twice the voltage of an ordinary outlet, and the circuits that use it (dryers,
            ranges, water heaters, EV chargers, air conditioners) are fed by large breakers that can sustain a
            serious arc. Treat every terminal as live until proven otherwise.
          </li>
          <li>
            Use a meter and leads rated at least CAT III 600V, with intact insulation and finger guards. Keep your
            fingers behind the guards, wear safety glasses, and keep one hand away from grounded metal where you
            can.
          </li>
          <li>
            Only measure at receptacles you can reach without removing covers. Opening a breaker panel, removing
            a dead front or working on a meter base is for licensed electricians and the utility, not homeowners.
          </li>
          <li>
            If one leg is missing, lights brighten and dim, anything smells hot or a breaker or receptacle is
            discolored, switch off large appliances, and call an electrician. Call the utility first if the whole
            house is affected or a service wire is down, and 911 if there is smoke, fire or a person in contact
            with a live conductor.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="split-phase" className="text-xl font-semibold mb-3">How 120 V and 240 V share one supply</h2>
        <p className="text-muted leading-7 mb-4">
          Most US homes get a single-phase, three-wire service usually called split-phase. The utility
          transformer&apos;s secondary winding has a tap at its midpoint. That center tap becomes the neutral and
          is bonded to ground at the service. The two ends of the winding become the hot legs, often called L1
          and L2. Each half of the winding produces a nominal 120 V, and because the two ends swing in opposite
          directions at every instant, the full winding produces a nominal 240 V from end to end.
        </p>
        <p className="text-muted leading-7 mb-4">
          That gives three meaningful readings at any 240 V point: L1 to neutral, L2 to neutral and L1 to L2.
          The first two are about 120 V; the third is about 240 V. A reading of 120 V is therefore only
          &quot;wrong&quot; if you took it between L1 and L2. Ordinary outlets use one leg and neutral, so they
          read 120 V. Large appliances connect across both legs, and some also use the neutral to run 120 V
          controls.
        </p>
        <Figure
          caption={
            <>
              A split-phase service: each hot leg is about 120 V from the center-tapped neutral, and the two legs
              together give about 240 V. Nominal values; real readings vary.
            </>
          }
        >
          <SplitPhaseReadingsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Real voltages vary with load and the utility&apos;s regulation. ANSI C84.1, the standard US utilities
          generally follow, gives a normal service range of roughly 114 to 126 V for a 120 V service and 228 to
          252 V for a 240 V one, so readings like 118 V and 237 V are both healthy. If you are new to AC
          readings, our explainer on{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs DC voltage
          </Link>{" "}
          covers what the meter is showing.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Why a multimeter reads 120 volts instead of 240: causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["About 120 V, one probe on a slot that isn't a hot", "Measuring hot to neutral or hot to ground", "Identify the two hot terminals on the receptacle and re-probe hot to hot", "Nothing to fix; the supply is normal"],
            ["240 V receptacle reads about 120 V hot to hot; one hot near 0 V to neutral", "Lost leg: failed breaker pole, burnt bus or connection, or a utility fault", "Measure each hot to neutral (step 3); check whether half the house is out", "Electrician for breaker or wiring; utility if many circuits are affected"],
            ["One hot reads normally, the other shows 20 to 90 V", "Lost leg with backfeed through a 240 V load left on", "Switch off large 240 V loads and re-measure", "Same as a lost leg; leave large loads off until repaired"],
            ["About 208 V hot to hot", "Three-phase 120/208 V building supply", "Check the building type and the appliance nameplate", "Normal; use appliances rated for 208 V"],
            ["Hot-to-neutral readings unequal (e.g. 95 V and 145 V) but hot to hot normal", "Loose or failing neutral", "Compare both legs to neutral with some loads on", "Urgent: switch off sensitive equipment and call the utility or an electrician"],
            ["Near 0 V hot to hot, both hots about 120 V to neutral", "Both hots fed from the same leg", "Check whether the circuit uses two single-pole breakers", "Electrician to rewire to a proper double-pole breaker"],
            ["Generator outlet reads 120 V or 0 V between hots", "Generator voltage selector on 120 V only", "Check the selector switch and the manual", "Switch to 120/240 V mode with loads disconnected"],
            ["Reading jumps, shows OL or a figure unrelated to 120 or 240", "Meter on the wrong function, range or jack, or a weak battery", "Re-check the dial, the leads and the battery on a known outlet", "Correct the setup; replace a weak battery"],
          ]}
        />
      </section>

      <section>
        <h2 id="reading-map" className="text-xl font-semibold mb-3">What each reading at a 240 V receptacle means</h2>
        <p className="text-muted leading-7 mb-4">
          The three-reading test turns a confusing number into a diagnosis. Take all three, write them down, and
          compare them with the patterns below. The chart shows illustrative values for a healthy supply and the
          two common faults; your numbers will differ by a few volts.
        </p>
        <BarChart
          items={[
            { label: "Healthy: L1 to N", value: 120, display: "≈ 120 V" },
            { label: "Healthy: L2 to N", value: 120, display: "≈ 120 V" },
            { label: "Healthy: L1 to L2", value: 240, display: "≈ 240 V" },
            { label: "Lost L2: L1 to L2", value: 120, display: "≈ 120 V or less", highlight: true },
            { label: "208 V building: L1 to L2", value: 208, display: "≈ 208 V" },
            { label: "Same leg twice: L1 to L1", value: 0, display: "≈ 0 V" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Illustrative nominal values, not measurements. A lost-leg reading can be well below 120 V when large
          loads backfeed the dead side.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: one hot to neutral at a healthy dryer receptacle.</>}>
            <MeterReadout value="119.6" unit="V AC" mode="hot to neutral" />
          </Figure>
          <Figure caption={<>Illustrative: hot to hot at the same receptacle.</>}>
            <MeterReadout value="239.3" unit="V AC" mode="hot to hot" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The math behind 208 V is worth knowing because it trips up many people who move between houses and
          apartments. In a three-phase wye system each hot is about 120 V from neutral, but the phases are 120
          degrees apart rather than 180. Two of them combine to 120 × √3 ≈ 208 V. It is the angle between the
          legs, not a fault, that gives the lower number.
        </p>
      </section>

      <KeyIdea title="Two numbers to neutral, one between the hots">
        Never judge a 240 V supply from a single reading. Measure each hot to neutral, then hot to hot. Two
        healthy legs and a hot-to-hot near 240 V mean the supply is fine; one weak leg means it isn&apos;t, wherever
        the 120 V reading came from.
      </KeyIdea>

      <section>
        <p className="text-muted leading-7 mb-4">
          Work through the steps in this order. The first two clear up most cases in a minute; the rest tell you
          whether the problem is normal, the appliance, or a supply fault that needs help.
        </p>
        <FlowDiagram
          steps={[
            { label: "Probes", sub: "Hot to hot?" },
            { label: "Meter", sub: "Known outlet" },
            { label: "Each leg", sub: "To neutral" },
            { label: "208 or 240", sub: "Building type" },
            { label: "Escalate", sub: "Electrician / utility" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-probes">Check where the probes are</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a 240 V receptacle, the two hot slots are the ones that match each other. On a four-prong dryer
          (NEMA 14-30) or range (NEMA 14-50) receptacle, the two angled or straight blade slots at the sides are
          the hots, the L-shaped or center slot is neutral, and the round or U-shaped slot is ground. Older
          three-prong dryer and range receptacles (10-30, 10-50) have two hots and a neutral but no separate
          ground. A 240 V-only receptacle, like a NEMA 6-series used for some air conditioners and welders, has
          two hots and a ground and no neutral at all.
        </p>
        <p className="text-muted leading-7">
          With the appliance unplugged, put one probe in each hot slot. If you were previously on a hot and the
          neutral or ground slot, 120 V was the correct answer to the question you asked the meter. On a
          hard-wired appliance such as a water heater, don&apos;t remove covers to probe terminals; that is
          electrician territory, because the terminals are live and close together.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-meter">Rule out the meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to AC volts, put the black lead in COM and the red lead in V, and measure a known-good
          120 V outlet. You should see something in the 114 to 126 V band. A manual-ranging meter needs a range
          above 240, such as 600 V or 750 V; on a 200 V range a 240 V input shows an overload indication, not
          120. On DC volts, an AC supply reads near zero or bounces around. A meter with its red lead in an amps
          jack is dangerous across a supply and can blow its fuse, as explained in{" "}
          <Link href="/multimeters/why-does-a-multimeter-fuse-blow-when-measuring-current" className={link}>
            why a multimeter fuse blows when measuring current
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          The point is that setup errors give you obviously odd readings, not a clean, steady 120. A weak
          battery can skew readings too, covered in{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>
          . If the meter reads a normal outlet correctly, trust its 120 V reading at the 240 V receptacle and
          move on.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-each-leg">Measure each leg to neutral</StepHeading>
        <p className="text-muted leading-7 mb-4">
          At a four-wire receptacle, measure from the first hot to neutral, then from the second hot to neutral.
          On a three-wire 240 V-only receptacle, use the ground slot instead. Both legs should read near 120 V.
          If one reads near 120 V and the other near zero, one leg is missing upstream of that receptacle. If
          both read near 120 V but hot to hot reads close to zero, both hots are on the same leg, which is a
          wiring fault rather than a supply loss.
        </p>
        <p className="text-muted leading-7 mb-4">
          A missing leg can be local or service-wide. If only this one 240 V circuit is affected, the likely
          culprit is its double-pole breaker or a connection on that circuit. If roughly half the lights and
          outlets in the house are also dead, the leg is missing at the main breaker, the meter base or the
          utility side, which our page on{" "}
          <Link href="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine" className={link}>
            half the house having no power with the breakers looking fine
          </Link>{" "}
          walks through. Odd in-between values on the dead leg, such as 30 or 70 V, usually come from a 240 V load
          feeding voltage back across from the live leg, or from coupling on a disconnected wire. A meter with a
          low-impedance (LoZ) mode helps separate that from a real supply; see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          The opposite pattern, where hot to hot is normal but the two legs read unequal values to neutral, such
          as 100 V and 140 V, points to a failing neutral. Each leg&apos;s share of 240 V then depends on how
          loads are balanced, and equipment on the high side can be damaged. That is urgent; see step 6, and our
          page on{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            checking for voltage fluctuations at home
          </Link>{" "}
          for the dimming-and-brightening pattern that often goes with it.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-208">Is it 208, not 120?</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If your hot-to-hot reading is close to 208 V rather than 120 V, the building is likely on a three-phase
          120/208 V service, common in apartment blocks, condos and commercial units. Nothing is wrong. A water
          heater or range element rated at 240 V produces less heat on 208 V, because heating power scales with
          the square of voltage: (208 ÷ 240)² ≈ 0.75, so roughly three-quarters of its rated output. That can
          explain an appliance that seems slow without any fault at all.
        </p>
        <p className="text-muted leading-7">
          Many appliances list both values on the nameplate (for example, a rating at 240 V and a lower one at
          208 V). For EV chargers, the same effect lowers charging power; if that&apos;s your concern, our page
          on{" "}
          <Link href="/multimeters/why-does-my-ev-charge-slowly-at-home-even-with-a-level-2-charger" className={link}>
            slow Level 2 EV charging at home
          </Link>{" "}
          covers the rest.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="step-appliance">Understand the appliance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Many 240 V appliances are really 120/240 V appliances. In a typical electric dryer the drum motor,
          timer and light run on one leg to neutral, while the heating element sits across both legs. A range
          works the same way: the clock, oven light and controls often use 120 V, the burners and bake element
          240 V. Measuring between a hot and neutral inside such an appliance, or at its terminal block, will
          show 120 V and be completely correct.
        </p>
        <p className="text-muted leading-7">
          That split also explains the classic symptom pattern of a lost leg: the dryer tumbles but stays cold,
          the oven light and clock work but nothing heats, or a heat pump&apos;s controls power up but the
          compressor won&apos;t run. If an appliance shows that pattern and the receptacle measures about 120 V hot
          to hot, the appliance is fine and the supply is not. If the receptacle reads a healthy 240 V, the fault
          is inside the appliance, often a heating element or thermal fuse, and a service technician is the
          right call for anything that means removing panels.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="step-escalate">Lost leg or neutral: call for help</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the readings show a missing leg or a floating neutral, stop measuring and get the right people
          involved. A homeowner can safely do three things: switch off large 240 V loads so they don&apos;t
          backfeed or overheat, check whether a double-pole breaker has tripped (switch it fully off, then on),
          and note which circuits are dead. If the breaker trips again, or resetting doesn&apos;t restore the
          missing leg, stop there.
        </p>
        <p className="text-muted leading-7">
          Call the utility first if half the house is out, the neighbors have similar problems, or lights
          brighten and dim; they are responsible for the transformer and the service drop and often check them
          without charge. Call a licensed electrician for a failed breaker, burnt bus stab, loose lug or wiring
          fault inside the house. Never open the panel or the meter base yourself. A breaker that keeps tripping
          once restored is a different problem, covered in{" "}
          <Link href="/multimeters/why-does-a-circuit-breaker-keep-tripping" className={link}>
            why a circuit breaker keeps tripping
          </Link>
          , and a panel that hums or buzzes is covered in{" "}
          <Link href="/multimeters/why-is-my-breaker-panel-buzzing" className={link}>
            why a breaker panel buzzes
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters suited to 240 V checks</h2>
        <p className="text-muted leading-7 mb-4">
          Household 240 V receptacles sit in CAT III territory, so pick a meter and leads rated at least CAT III
          600V. LoZ mode is useful for separating backfed or coupled voltage on a dead leg from a real supply.
          These come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Multimeters for 120/240 V household checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's multimeter with LoZ",
              href: "/multimeters/fluke-117-review",
              note: "CAT III 600V, True RMS, LoZ for ghost voltage and built-in VoltAlert non-contact detection. Hands-on Tested.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 CAT IV multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#klein-tools-mm720",
              note: "CAT IV 600V / CAT III 1000V, True RMS and LoZ at a budget price.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT IV 600V / CAT III 1000V, True RMS and an analog bar graph. No LoZ. Hands-on Tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
