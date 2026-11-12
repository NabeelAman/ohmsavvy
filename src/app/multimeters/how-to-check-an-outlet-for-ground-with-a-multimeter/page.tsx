import Link from "@/components/AppLink";
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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Check an outlet for ground with a multimeter: hot-to-ground about 120 V, neutral-to-ground near 0 V, plus how to spot an open or bootleg ground safely.";

export const metadata = buildMetadata({
  title: "How to Check an Outlet for Ground With a Meter",
  description,
  path: "/multimeters/how-to-check-an-outlet-for-ground-with-a-multimeter",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;
const t5 = picks.find((p) => p.name === "Fluke T5-600")!;

const link = "text-accent hover:underline";

/** Face of a US NEMA 5-15 receptacle with the three probe pairs. */
function OutletFaceDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="w-full h-auto"
      role="img"
      aria-label="How to check an outlet for ground: face of a US three-prong outlet with the narrow hot slot, the wider neutral slot and the round ground hole. Hot to neutral reads about 120 volts, hot to ground about 120 volts, and neutral to ground near 0 volts."
    >
      <rect x="40" y="20" width="120" height="180" rx="16" className="fill-surface stroke-foreground" strokeWidth="2" />
      {/* slots */}
      <rect x="70" y="70" width="9" height="34" rx="2" className="fill-foreground" />
      <rect x="118" y="66" width="13" height="40" rx="2" className="fill-foreground" />
      <path d="M90 140 a10 10 0 0 1 20 0 v10 h-20 z" className="fill-foreground" />
      <text x="74" y="60" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">H</text>
      <text x="124" y="60" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">N</text>
      <text x="100" y="170" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">G</text>
      <text x="74" y="118" fontSize="8" textAnchor="middle" className="fill-muted">narrow</text>
      <text x="124" y="118" fontSize="8" textAnchor="middle" className="fill-muted">wide</text>
      {/* readings */}
      <g fontSize="10">
        <rect x="185" y="30" width="140" height="40" rx="5" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <text x="255" y="47" textAnchor="middle" className="fill-foreground" fontWeight="700">H to N</text>
        <text x="255" y="61" textAnchor="middle" className="fill-accent">about 120 V</text>
        <rect x="185" y="88" width="140" height="40" rx="5" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <text x="255" y="105" textAnchor="middle" className="fill-foreground" fontWeight="700">H to G</text>
        <text x="255" y="119" textAnchor="middle" className="fill-accent">about 120 V</text>
        <rect x="185" y="146" width="140" height="40" rx="5" className="fill-surface stroke-accent" strokeWidth="1.5" />
        <text x="255" y="163" textAnchor="middle" className="fill-foreground" fontWeight="700">N to G</text>
        <text x="255" y="177" textAnchor="middle" className="fill-accent">near 0 V</text>
      </g>
      <g className="stroke-border" strokeWidth="1" strokeDasharray="3 3" fill="none">
        <path d="M131 86 H185" />
        <path d="M79 100 L185 108" />
        <path d="M110 145 L185 166" />
      </g>
    </svg>
  );
}

/** Correct ground vs bootleg ground inside the box. */
function BootlegDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring comparison: on the left, a correctly grounded outlet has a separate bare ground wire running back to the panel. On the right, a bootleg ground has a short jumper from the neutral screw to the green ground screw, so the ground pin is only connected to neutral."
    >
      {/* correct */}
      <text x="85" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">True ground</text>
      <rect x="45" y="30" width="80" height="90" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <circle cx="60" cy="60" r="5" className="fill-muted stroke-foreground" />
      <circle cx="110" cy="60" r="5" className="fill-muted stroke-foreground" />
      <circle cx="85" cy="105" r="5" className="fill-accent" />
      <text x="60" y="48" fontSize="8" textAnchor="middle" className="fill-muted">hot</text>
      <text x="110" y="48" fontSize="8" textAnchor="middle" className="fill-muted">neutral</text>
      <g fill="none" strokeWidth="1.6">
        <path d="M60 65 V150" className="stroke-foreground" />
        <path d="M110 65 V150" className="stroke-foreground" />
        <path d="M85 110 V150" className="stroke-accent" />
      </g>
      <text x="85" y="164" fontSize="8" textAnchor="middle" className="fill-accent">3 wires to panel</text>
      {/* bootleg */}
      <text x="255" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Bootleg ground</text>
      <rect x="215" y="30" width="80" height="90" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <circle cx="230" cy="60" r="5" className="fill-muted stroke-foreground" />
      <circle cx="280" cy="60" r="5" className="fill-muted stroke-foreground" />
      <circle cx="255" cy="105" r="5" className="fill-accent" />
      <text x="230" y="48" fontSize="8" textAnchor="middle" className="fill-muted">hot</text>
      <text x="280" y="48" fontSize="8" textAnchor="middle" className="fill-muted">neutral</text>
      <g fill="none" strokeWidth="1.6">
        <path d="M230 65 V150" className="stroke-foreground" />
        <path d="M280 65 V150" className="stroke-foreground" />
        <path d="M280 65 L258 102" className="stroke-accent" strokeDasharray="4 2" />
      </g>
      <text x="300" y="92" fontSize="8" className="fill-accent">jumper</text>
      <text x="255" y="164" fontSize="8" textAnchor="middle" className="fill-muted">2 wires to panel</text>
    </svg>
  );
}

export default function HowToCheckAnOutletForGroundWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Check an Outlet for Ground With a Multimeter"
      description={description}
      published="2026-11-13"
      path="/multimeters/how-to-check-an-outlet-for-ground-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To check an outlet for ground, set a multimeter to AC volts and measure hot to ground: a grounded US
          outlet reads about 120 V, the same as hot to neutral, while neutral to ground reads close to 0 V. If hot
          to ground reads 0 V or a weak, wandering number while hot to neutral reads 120 V, the ground is open. The
          one fault those three readings can&apos;t catch is a bootleg ground, where neutral is jumpered to the
          ground screw, so this guide adds a load test that flags it and explains when to hand the job to an
          electrician.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 electrician's multimeter, CAT III 600V",
        caption: (
          <>
            The Fluke 117 is CAT III 600V and has a low-impedance mode that collapses ghost voltage on an open
            ground. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "outlet-layout", label: "Hot, neutral and ground" },
        { id: "causes", label: "Readings and what they mean" },
        { id: "set-up-the-meter", label: "1. Set up and prove the meter" },
        { id: "hot-to-neutral", label: "2. Hot to neutral" },
        { id: "hot-to-ground", label: "3. Hot to ground" },
        { id: "neutral-to-ground", label: "4. Neutral to ground" },
        { id: "bootleg-test", label: "5. Load test for a bootleg ground" },
        { id: "prove-again", label: "6. Prove the meter again" },
        { id: "two-prong", label: "Two-prong outlets" },
        { id: "cat-rating", label: "CAT rating and meter choice" },
      ]}
      faq={[
        {
          q: "Can I check for ground with a plug-in outlet tester instead?",
          a: "A three-light plug-in tester catches an open ground and reversed polarity quickly, and it is a fine first check. It cannot detect a bootleg ground, because neutral jumpered to ground lights the tester exactly like correct wiring. It also cannot tell you how good the ground is. A multimeter with a load test gives more information, and an electrician's loop tester gives the most.",
        },
        {
          q: "Why does my meter show 40 V from hot to ground?",
          a: "That is usually ghost voltage. With the ground open, the ground pin floats, and a high-impedance digital meter picks up voltage coupled from nearby live wires. The reading is real but has no current behind it. Switch to a low-impedance (LoZ) mode, or compare with hot to neutral: if one reads 120 V and the other reads a weak, unstable figure, treat the ground as open.",
        },
        {
          q: "What should neutral to ground read on an outlet?",
          a: "Close to 0 V with nothing running on the circuit, typically well under 1 V. With a load on the circuit it rises a little, because neutral current causes voltage drop on the neutral wire back to the panel, and 1 to 2 V under a heavy load is common. A reading of several volts with light loads points to a loose neutral, which an electrician should trace.",
        },
        {
          q: "Is an ungrounded three-prong outlet illegal?",
          a: "The National Electrical Code allows a three-prong outlet on a circuit without a ground wire only when it is GFCI protected and labeled 'No Equipment Ground'. A plain three-prong outlet on two-wire cable with no GFCI does not meet code, and it misleads anyone who plugs in a surge protector or appliance that depends on the ground pin. Local rules vary, so check with your inspector.",
        },
        {
          q: "Can I fix a missing ground myself?",
          a: "Swapping a two-prong outlet for a GFCI receptacle labeled 'No Equipment Ground' is a common DIY fix where local rules allow homeowners to do their own wiring. Running a new ground wire, or correcting a bootleg ground, means tracing cable back toward the panel and is a job for a licensed electrician. Never add a jumper from neutral to the ground screw.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "Leakage, moisture and downstream outlets, the usual causes on a GFCI-protected circuit.",
        },
        {
          href: "/multimeters/cat-iii-vs-cat-iv-multimeter",
          title: "CAT III vs CAT IV Multimeter",
          desc: "What the measurement category on your meter means, and where each rating belongs.",
        },
      ]}
    >
      <Callout title="Live 120 V work">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            These tests are made on a live outlet. Hold both probes by the finger guards, keep one hand away from
            anything metal, and don&apos;t stand on a wet floor.
          </li>
          <li>
            The red lead must be in the V jack. A lead left in the A jack turns the meter into a short across 120 V
            and can blow the meter&apos;s fuse with a flash, or worse on a meter without a proper fuse.
          </li>
          <li>
            Use a meter and leads rated at least CAT III 600V with shrouded tips. Don&apos;t remove the cover plate
            or pull the receptacle; that is electrician work.
          </li>
          <li>
            If the outlet is scorched, warm, or reads anything you can&apos;t explain, switch off the breaker and call
            a licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="outlet-layout" className="text-xl font-semibold mb-3">Hot, neutral and ground on a US outlet</h2>
        <p className="text-muted leading-7 mb-4">
          On a standard US NEMA 5-15 outlet, with the round hole at the bottom, the shorter slot on the left is hot,
          the taller slot on the right is neutral, and the round hole is the equipment ground. Hot carries the
          voltage. Neutral carries the current back to the panel, where it is bonded to ground at the main
          service. Ground carries no current in normal use; its job is to give fault current an easy path so the
          breaker trips if a hot wire touches a metal case.
        </p>
        <Figure caption={<>Where the probes go and what a correctly wired, grounded outlet reads. Values are typical for a 120 V US circuit.</>}>
          <OutletFaceDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          US utilities typically deliver 120 V within about ±5% at the service, so anything from about 114 V to
          126 V at an outlet is normal. A few volts lower at the far end of a long circuit under load is also
          normal.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">What the three readings tell you</h2>
        <DataTable
          head={["Symptom (H-N / H-G / N-G)", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["120 / 120 / near 0", "Correctly grounded (or a bootleg)", "Step 5 load test", "Nothing, unless step 5 flags it"],
            ["120 / 0 to 60, unstable / 0 to 60", "Open ground: no wire, or loose", "LoZ mode, or compare readings", "GFCI + label, or electrician runs ground"],
            ["120 / 0 / 120", "Hot and neutral reversed", "Swap probes and repeat", "Electrician; often a quick fix at the outlet"],
            ["0 / 0 / 0", "No power: breaker, GFCI or open hot", "Check breaker and upstream GFCI", "Reset; see our GFCI reset guide"],
            ["120 / 120 / exactly 0 under heavy load", "Possible bootleg ground", "Step 5 load test", "Electrician; it is a shock hazard"],
            ["Well under 114 / similar / several V", "Loose neutral or overloaded circuit", "Repeat with loads off", "Electrician; loose neutrals cause heat"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="set-up-the-meter">Set up the meter and prove it on a known live outlet</StepHeading>
        <p className="text-muted leading-7">
          Black lead in COM, red lead in V. Turn the dial to AC volts (V with a wavy line), auto-range or the 600 V
          range. Measure hot to neutral on an outlet you know works and confirm about 120 V. This proves the meter,
          the leads and the range before you trust a zero anywhere else, which is the first half of the
          live-dead-live habit.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="hot-to-neutral">Measure hot to neutral</StepHeading>
        <p className="text-muted leading-7">
          Insert the red probe into the short slot and the black probe into the tall slot. Expect about 120 V. If you
          get 0 V, the outlet has no power and the ground test means nothing yet. Check the breaker and any GFCI
          upstream; our guide to{" "}
          <Link href="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset" className={link}>
            testing a GFCI outlet that won&apos;t reset
          </Link>{" "}
          covers the common dead-outlet cause in kitchens and bathrooms.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="hot-to-ground">Measure hot to ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Keep the red probe in the hot slot and move the black probe to the round ground hole. A grounded outlet
          reads within a volt or two of the hot-to-neutral figure. An open ground reads 0 V, or a weak number that
          drifts as you move the leads.
        </p>
        <Figure caption={<>Illustrative readings, hot to ground: 120.4 V on a grounded outlet (left); 38.6 V of ghost voltage on an open ground with a high-impedance meter (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="120.4" unit="V" mode="AC V  H to G, grounded" />
            <MeterReadout value="38.6" unit="V" mode="AC V  H to G, open ground" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Digital meters have an input impedance of about 10 MΩ, so they can read voltage capacitively coupled onto a
          floating wire. A meter with a low-impedance (LoZ) setting loads the circuit enough to collapse that ghost
          reading to near zero. Without LoZ, the giveaway is that the number isn&apos;t steady and isn&apos;t
          close to 120 V. For more on why it happens, see{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            why a meter shows voltage on a disconnected circuit
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={4} id="neutral-to-ground">Measure neutral to ground</StepHeading>
        <p className="text-muted leading-7">
          Red probe in the tall neutral slot, black in the ground hole. With little running on the circuit, expect
          well under 1 V. If it reads about 120 V, hot and neutral are reversed (hot to ground will have read 0 V).
          A few volts with only light loads on the circuit suggests resistance in the neutral path, often a loose
          connection, which also generates heat. Note this reading; you need it for the next step.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="bootleg-test">Load the circuit to flag a bootleg ground</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A bootleg ground is a jumper from the neutral screw to the green ground screw on a two-wire circuit. It
          makes every simple test pass, but the ground pin is really just neutral. If that neutral ever comes loose
          upstream, the metal case of anything plugged in sits at 120 V.
        </p>
        <Figure caption={<>A true ground has its own wire back to the panel. A bootleg ground borrows the neutral, so the ground pin rises with the neutral under load.</>}>
          <BootlegDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          Plug a heavy resistive load into another outlet on the same circuit, such as a 1,500 W space heater on
          high (about 12.5 A). Measure neutral to ground at the outlet you&apos;re testing again. On a true ground the
          neutral current causes a small voltage drop on the neutral wire but none on the ground wire, so the
          reading rises, often to somewhere between 0.5 V and 2 V. On a bootleg ground the two pins are the same
          conductor at the outlet, so the reading stays at 0.0 V however hard you load it.
        </p>
        <BarChart
          items={[
            { label: "True ground, no load", value: 0.2, display: "≈ 0.2 V" },
            { label: "True ground, 12.5 A load", value: 1.5, display: "≈ 1–2 V", highlight: true },
            { label: "Bootleg, 12.5 A load", value: 0.02, display: "0.0 V" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The bars are illustrative typical values; the real rise depends on wire length and gauge. A steady 0.0 V
          under a heavy load is a strong hint, not proof, because an outlet very close to the panel can also show
          almost no rise. If you get it, have an electrician open the box.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="prove-again">Prove the meter again on a known live outlet</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Finish by measuring the known good outlet again. If the meter still reads 120 V, your zeros were real.
          This catches a lead that broke or a probe that slipped out of the slot halfway through.
        </p>
        <Figure caption={<>The whole check, start to finish.</>}>
          <FlowDiagram
            steps={[
              { label: "Prove", sub: "Known live outlet" },
              { label: "H to N", sub: "About 120 V" },
              { label: "H to G", sub: "About 120 V" },
              { label: "N to G", sub: "Near 0 V" },
              { label: "Load", sub: "N to G must rise" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="two-prong" className="text-xl font-semibold mb-3">Checking a two-prong outlet for ground</h2>
        <p className="text-muted leading-7 mb-4">
          Older homes often have two-slot outlets on cable with no ground wire. Some metal boxes are still grounded
          through armored cable or metal conduit. To check, measure from the hot slot to the center cover-plate
          screw, which threads into the metal yoke and box. About 120 V means the box has a ground path; 0 V or a
          ghost reading means it doesn&apos;t. Paint on the screw can give a false zero, so scrape the probe tip on
          the screw head.
        </p>
        <KeyIdea title="Two readings must match">
          Hot to neutral and hot to ground should read the same within a volt or two. If they don&apos;t, the ground
          is missing or poor. If they match, the ground pin is connected to something, and only the load test or an
          electrician tells you whether that something is a real ground.
        </KeyIdea>
      </section>

      <section>
        <h2 id="cat-rating" className="text-xl font-semibold mb-3">CAT rating and which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          Under IEC 61010, wall outlets are CAT II locations and the panel is CAT III. Buy CAT III 600V anyway: the
          same meter ends up in the panel sooner or later, and a cheap unrated meter offers no protection from the
          voltage spikes building wiring carries. Shrouded probe tips that fit the outlet slots, a LoZ mode and
          non-contact voltage detection all help here. Our{" "}
          <Link href="/multimeters/cat-iii-vs-cat-iv-multimeter" className={link}>
            CAT III vs CAT IV guide
          </Link>{" "}
          explains the ratings. If your ground check turned up a warm outlet, read{" "}
          <Link href="/multimeters/why-is-my-outlet-hot-with-nothing-plugged-in" className={link}>
            why an outlet gets hot with nothing plugged in
          </Link>
          , and for a GFCI that trips on a newly grounded circuit,{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI keeps tripping
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for outlet checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS electrician's multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, built-in non-contact voltage detection, and the low-impedance mode that clears ghost voltage on an open ground.",
            },
            {
              name: "Fluke T5-600",
              image: t5.image,
              alt: "Fluke T5-600 electrical tester",
              href: "/multimeters/fluke-101-vs-fluke-t5-600",
              note: "An electrical tester with automatic AC/DC selection, CAT III 600V and an OpenJaw current fork. Simple and quick for outlet voltage checks.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "CAT III 1000V and CAT IV 600V with Min/Max-Average recording, useful for watching neutral-to-ground voltage while a load cycles.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
