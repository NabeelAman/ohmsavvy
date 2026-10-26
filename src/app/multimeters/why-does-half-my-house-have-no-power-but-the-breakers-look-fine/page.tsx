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
  "Half your house has no power but the breakers look fine? Check for a lost service leg, a half-tripped breaker or an upstream GFCI, and know who to call.";

export const metadata = buildMetadata({
  title: "Half My House Has No Power but Breakers Look Fine",
  description,
  path: "/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;
const ht118a = all.find((p) => p.name === "KAIWEETS HT118A")!;

const link = "text-accent hover:underline";

/** Split-phase service: two hot legs from the transformer, breakers alternating between them, one leg lost. */
function SplitPhaseDiagram() {
  return (
    <svg viewBox="0 0 340 200" className="w-full h-auto" role="img" aria-label="Diagram of a 120/240 volt split-phase service with two hot legs feeding alternating breakers, showing one leg lost so every breaker on it goes dead">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="14" y="60" width="64" height="80" rx="4" />
        <line x1="78" y1="75" x2="150" y2="75" />
        <line x1="78" y1="100" x2="300" y2="100" strokeDasharray="4 3" />
        <line x1="78" y1="125" x2="200" y2="125" />
        <line x1="150" y1="75" x2="150" y2="180" />
        <rect x="140" y="140" width="20" height="10" />
        <rect x="140" y="165" width="20" height="10" />
        <rect x="240" y="140" width="20" height="10" />
        <rect x="240" y="165" width="20" height="10" />
      </g>
      <g className="stroke-accent" strokeWidth="1.8" fill="none">
        <line x1="225" y1="125" x2="250" y2="125" strokeDasharray="3 3" />
        <line x1="250" y1="125" x2="250" y2="180" strokeDasharray="3 3" />
        <line x1="205" y1="117" x2="221" y2="133" />
        <line x1="221" y1="117" x2="205" y2="133" />
      </g>
      <g fontSize="10" className="fill-foreground">
        <text x="46" y="96" textAnchor="middle">utility</text>
        <text x="46" y="110" textAnchor="middle">transformer</text>
        <text x="100" y="70">leg L1</text>
        <text x="100" y="95">neutral</text>
        <text x="100" y="120">leg L2</text>
      </g>
      <g fontSize="9.5" className="fill-muted">
        <text x="166" y="149">live</text>
        <text x="166" y="174">live</text>
        <text x="266" y="149" className="fill-accent">dead</text>
        <text x="266" y="174" className="fill-accent">dead</text>
      </g>
      <text x="213" y="40" fontSize="9.5" textAnchor="middle" className="fill-accent">connection lost on L2</text>
      <text x="213" y="54" fontSize="9.5" textAnchor="middle" className="fill-muted">every breaker on that leg goes dark</text>
    </svg>
  );
}

export default function WhyDoesHalfMyHouseHaveNoPowerPage() {
  return (
    <HowToShell
      title="Why Does Half My House Have No Power but the Breakers Look Fine?"
      description={description}
      path="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          If half your house has no power but the breakers look fine, the pattern of what is dead tells you
          where to look. A US home is fed by two 120 V &quot;legs&quot; that together make 240 V, and the
          breakers alternate between them down the panel. Losing one leg somewhere between the utility
          transformer and your main breaker kills roughly half the circuits at once while every breaker handle
          stays in place. Smaller patches of dead outlets are more often a breaker that tripped without
          visibly moving, a GFCI in another room, or a failed connection on one branch circuit.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter",
        caption: (
          <>
            A meter at a 240 V receptacle shows in seconds whether one leg is missing. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "split-phase", label: "Two legs, one panel" },
        { id: "causes", label: "What is dead tells you why" },
        { id: "homeowner-checks", label: "Checks you can make safely" },
        { id: "meter-checks", label: "Confirm a lost leg with a meter" },
        { id: "who-to-call", label: "Utility or electrician?" },
      ]}
      faq={[
        {
          q: "Why does my dryer spin but not heat when half the house is out?",
          a: "Many electric dryers run the drum motor on 120 V from one leg and the heating element on 240 V across both. With one leg gone, the motor may still turn while the element gets nothing. A range or water heater can behave similarly. That combination is a strong sign of a lost service leg rather than a tripped breaker.",
        },
        {
          q: "Can the main breaker cause half the house to lose power?",
          a: "Yes. The main breaker is a two-pole device, and one pole can fail or develop a burnt connection while the handle still reads ON. Only a licensed electrician should test or replace it, and the utility may need to disconnect service first.",
        },
        {
          q: "My lights are getting brighter and dimmer, not just going off. Is that the same thing?",
          a: "No, and it is more urgent. Lights that brighten on some circuits while dimming on others usually mean the neutral connection has failed, which can push well above 120 V onto sensitive equipment. Switch off the main breaker if it is safe to reach and call the utility right away.",
        },
        {
          q: "Will the power company charge me to check the service?",
          a: "Policies vary by utility. Many check the transformer, service drop and meter at no charge, while repairs to equipment the homeowner owns, such as the meter base or service entrance cable on some homes, are the homeowner's responsibility. Ask when you call.",
        },
        {
          q: "Can a storm or a falling branch cause half the house to lose power?",
          a: "Yes. Wind, ice or a branch can break or loosen one conductor of the overhead service drop while the other stays connected, leaving one leg dead. Look for a sagging or damaged line between the pole and the house, but stay well clear of it. Call the utility's outage or emergency number, and never try to move or touch a downed line.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-gfci-outlet-that-wont-reset",
          title: "How to Test a GFCI Outlet That Won't Reset",
          desc: "No power, lockout, line/load miswiring and end-of-life GFCIs.",
        },
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "Min/Max readings, plug-in monitors and utility vs in-home causes.",
        },
      ]}
    >
      <Callout title="Some symptoms mean stop and call now">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Lights flaring bright on some circuits and dim on others, electronics failing, or a burning smell
            from the panel or meter: switch off the main breaker if you can do so safely and call the utility.
            For smoke or fire, leave and call 911.
          </li>
          <li>
            A service drop that is sagging, sparking or down: stay well clear and call the utility&apos;s
            emergency line.
          </li>
          <li>
            Never remove the panel cover, pull the meter or touch the service entrance. Those parts stay live
            even with the main breaker off.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="split-phase" className="text-xl font-semibold mb-3">Two legs, one panel</h2>
        <p className="text-muted leading-7 mb-4">
          The utility transformer delivers two hot conductors and a neutral. Each hot measures about 120 V to
          the neutral, and the two hots measure about 240 V to each other. Inside the panel the bus bars
          alternate, so one single-pole breaker sits on leg L1, the next on L2, and a two-pole breaker for a
          dryer or air conditioner straddles both. Nothing about a lost leg moves a breaker handle; the
          breakers simply have nothing to pass on.
        </p>
        <p className="text-muted leading-7">
          That is why the outage looks random from inside the house. The kitchen counter might be dead while
          the fridge outlet works, or the upstairs bedrooms go dark while the hallway lights carry on, purely
          because of which slot each circuit was given when the panel was wired.
        </p>
        <Figure caption={<>Each hot leg feeds alternating breakers. Lose one leg upstream of the main and about half the single-pole circuits die together, with every handle still ON.</>}>
          <SplitPhaseDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">What is dead tells you why</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Many rooms dead, 240 V appliances dead or half-working", "Lost leg: transformer fuse, service drop, meter or main", "Neighbors; a 240 V receptacle with a meter", "Utility first, then electrician"],
            ["One circuit's outlets and lights dead", "Breaker tripped but handle barely moved", "Push that breaker firmly OFF, then ON", "Homeowner; electrician if it fails"],
            ["Bathroom, garage or outdoor outlets dead", "GFCI tripped in a different room", "TEST/RESET on every GFCI you can find", "Homeowner"],
            ["A run of outlets dead, earlier ones on the circuit fine", "Failed connection at the last working outlet", "Which outlet is the last live one", "Electrician"],
            ["Lights bright and dim, appliances acting strangely", "Lost or loose neutral", "Nothing; switch off the main if safe", "Utility immediately"],
            ["Outages come and go, often in wind or heat", "Loose connection at the service or meter", "Note times and weather", "Utility, then electrician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="homeowner-checks">Checks you can make safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start outside the house. Ask a neighbor on the same street whether they have power, and look for
          partial outages on their side too, since several homes often share one transformer. Then work
          through the panel and the protective devices you can reach without tools.
        </p>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Reset every breaker the hard way.</span> A tripped breaker can
            sit only a few millimeters from ON. Push each handle firmly all the way to OFF and then back to ON;
            a tripped one will click and stay on. Some breakers also show a colored trip flag in a small
            window.
          </li>
          <li>
            <span className="text-foreground">Find the hidden GFCIs.</span> A single GFCI in a bathroom can
            feed outlets in another bathroom, the garage and outside. Press RESET on each one. A GFCI breaker
            in the panel will have its own TEST button on the handle.
          </li>
          <li>
            <span className="text-foreground">Try the 240 V appliances.</span> If the dryer tumbles without
            heat, the range has some elements working and others not, or the air conditioner hums without
            starting, a missing leg becomes very likely.
          </li>
          <li>
            <span className="text-foreground">Map the dead circuits.</span> Note which breaker numbers are
            dead. Every other slot down one side, or alternate rows, matches a leg pattern; a single numbered
            circuit does not.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="meter-checks">Confirm a lost leg with a meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A multimeter rated CAT III 600 V, with intact leads and finger guards, can confirm the diagnosis at a
          receptacle without anyone opening the panel. Wear safety glasses and keep your fingers behind the
          probe guards. First, put the probes in the hot and neutral slots of a working 120 V outlet, then in a
          dead one. A healthy outlet reads roughly 114 to 126 V, the band ANSI C84.1 treats as normal for
          120 V service. A dead outlet on a lost leg usually reads 0 V, but not always.
        </p>
        <p className="text-muted leading-7 mb-4">
          The clearer test is at a dryer or range receptacle with the appliance unplugged. Measure from each
          hot slot to neutral, then between the two hots. Normally both hot-to-neutral readings are near 120 V
          and the hot-to-hot reading is near 240 V. With one leg lost, one hot reads normally, and the hot-to-hot
          reading falls to around 120 V or less.
        </p>
        <Figure caption={<>At a 240 V receptacle: a normal hot-to-hot reading (left) and the reading you typically see with one leg lost (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="242.1" unit="V~" mode="V AC  hot to hot, normal" />
            <MeterReadout value="118.7" unit="V~" mode="V AC  hot to hot, one leg lost" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Don&apos;t be surprised by odd in-between numbers on the dead leg, such as 30 or 70 V. Any 240 V
          load left switched on, like a water heater element, connects the two legs and can feed a weak,
          useless voltage back onto the dead side. A meter with a low-impedance (LoZ) mode loads the circuit
          slightly and helps tell this kind of induced or backfed voltage from a real supply. Either way, a
          reading well below 120 V on one leg is a supply fault, not a branch-circuit problem, and you should
          switch off large 240 V loads until it is fixed. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            guide to using a multimeter
          </Link>{" "}
          covers setting up AC voltage measurement if you are new to it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">When it is only one circuit</h2>
        <p className="text-muted leading-7 mb-4">
          If the dead area is a single circuit and its breaker resets and holds, the fault is somewhere along
          that circuit. Outlets on a branch circuit are usually daisy-chained, so a failed connection at one
          outlet takes out everything after it. Older installations that used the push-in &quot;backstab&quot;
          holes on the back of receptacles are particularly prone to this. Find the last outlet that works and
          the first that doesn&apos;t; the problem is usually at one of those two boxes. Opening them and
          remaking connections is a job for an electrician, and a scorched or loose receptacle there also
          explains intermittent{" "}
          <Link href="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause" className={link}>
            AFCI trips
          </Link>
          .
        </p>
        <p className="text-muted leading-7">
          Also check for a wall switch that controls an outlet. Many living rooms have a half-switched
          receptacle for a lamp, and it is easy to mistake for a fault.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="Utility or electrician?">
          Call the utility first when neighbors are affected, when your meter check shows one leg missing at a
          240 V receptacle, when lights brighten and dim, or when the service drop looks damaged. Their crew
          checks the transformer, its fuse, the drop and usually the meter. If they find their side is fine,
          the problem is at your meter base, service entrance or main breaker, and a licensed electrician
          takes over; ownership of the meter base varies by utility, so ask. Call an electrician directly for a
          single dead circuit, a breaker that will not reset, or any warm or discolored outlet.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for checking household voltage"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Hands-on tested. True RMS, CAT III 600V, with NCV built in for a quick live check.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "LoZ mode for ghost voltages, CAT IV 600V / CAT III 1000V, True RMS.",
            },
            {
              name: "KAIWEETS HT118A",
              image: ht118a.image,
              alt: "KAIWEETS HT118A digital multimeter",
              href: "/multimeters/best-multimeter-for-beginners",
              note: "Budget True RMS meter with NCV and a Live-wire test; maker's sources disagree on maximum voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
