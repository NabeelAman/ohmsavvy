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
  "Car battery corrosion comes from acid vapor and electrolyte attacking the terminals. Find the cause, clean it safely and check the clamps with a multimeter.";

export const metadata = buildMetadata({
  title: "Why Is My Car Battery Corroding?",
  description,
  path: "/multimeters/why-is-my-car-battery-corroding",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke107 = picks.find((p) => p.name === "Fluke 107")!;

const link = "text-accent hover:underline";

/** Cross-section of a terminal: post, clamp, corrosion layer, and where to put the probes for a voltage-drop test. */
function TerminalDropDiagram() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a corroded car battery terminal for a voltage-drop test: a lead post rises from the battery case, the cable clamp wraps around it with a crusty corrosion layer between them, one multimeter probe touches the lead post itself and the other touches the clamp, so the meter reads only the voltage lost across the corroded joint while the engine cranks."
    >
      {/* battery top */}
      <rect x="20" y="130" width="300" height="50" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="170" y="160" fontSize="10" textAnchor="middle" className="fill-muted">battery case</text>
      {/* post */}
      <rect x="140" y="80" width="30" height="50" rx="3" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="155" y="74" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground">lead post</text>
      {/* corrosion */}
      <rect x="128" y="92" width="54" height="30" rx="3" className="fill-surface stroke-accent" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* clamp */}
      <rect x="120" y="96" width="70" height="22" rx="4" className="fill-surface stroke-foreground" strokeWidth="2" />
      <path d="M190 107 H290" className="stroke-foreground" strokeWidth="4" />
      <text x="250" y="100" fontSize="9" className="fill-foreground">cable</text>
      <text x="110" y="134" fontSize="8" textAnchor="end" className="fill-accent">corrosion layer</text>
      {/* probes */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M155 82 V40 H200" />
        <path d="M205 107 V60 H235" />
      </g>
      <circle cx="218" cy="40" r="16" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="218" y="44" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <text x="245" y="35" fontSize="8" className="fill-muted">probe 1: post top</text>
      <text x="245" y="64" fontSize="8" className="fill-muted">probe 2: clamp</text>
      <text x="20" y="20" fontSize="9" className="fill-muted">crank the engine: good joint reads only hundredths of a volt</text>
    </svg>
  );
}

export default function WhyIsMyCarBatteryCorrodingPage() {
  return (
    <HowToShell
      title="Why Is My Car Battery Corroding?"
      description={description}
      published="2026-11-15"
      path="/multimeters/why-is-my-car-battery-corroding"
      category="multimeters"
      intro={
        <>
          A car battery corrodes because sulfuric acid, as vapor or small amounts of liquid escaping around the posts
          and vents, reacts with the lead posts and the metal clamps to form crusty sulfate deposits. A little at the
          terminals over the years is normal; fast or heavy corrosion usually means the battery is gassing more than it
          should, from overcharging, high heat or an aging battery, or that acid is seeping past a damaged post seal.
          This guide explains what the white and blue-green deposits are, which cause fits your car, how to clean them
          safely, and how to use a multimeter to check whether the corrosion is already costing you starting power.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive multimeter for checking battery terminal voltage drop",
        caption: (
          <>
            A voltage-drop test across the terminal clamp shows whether corrosion is hurting the connection. The
            Craftsman CMMT14171 is made for automotive checks like this. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              Craftsman CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-it-is", label: "What battery corrosion is" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "inspect", label: "1. Inspect where it grows" },
        { id: "charging", label: "2. Check charging voltage" },
        { id: "resting", label: "3. Check resting voltage" },
        { id: "clean", label: "4. Clean the terminals" },
        { id: "drop-test", label: "5. Voltage-drop test the clamps" },
        { id: "prevent", label: "6. Prevent it coming back" },
        { id: "positive-negative", label: "Positive vs negative side" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Is it normal for a car battery to corrode?",
          a: "Some corrosion over several years is normal, because flooded lead-acid batteries vent small amounts of acid vapor while charging. A thin film you clean off once or twice a year isn't a fault. Heavy crust that returns within weeks, wet acid on the case, or corrosion on a sealed AGM battery points to overcharging, heat, a leak or a damaged post seal.",
        },
        {
          q: "Does corrosion on the positive terminal mean overcharging?",
          a: "It's a common rule of thumb that positive-side corrosion follows overcharging and gassing, and negative-side corrosion follows undercharging, but it isn't a reliable diagnosis on its own. Clamp metal, battery position and vent design all change where deposits form. Measure the charging voltage with the engine running; anything steadily above about 15 V supports the overcharging explanation.",
        },
        {
          q: "Can battery corrosion stop a car from starting?",
          a: "Yes. Corrosion between the post and clamp adds resistance, and the starter draws hundreds of amps, so even a small resistance drops significant voltage. The battery may read a healthy 12.6 V at rest yet the car only clicks. A voltage-drop test across the clamp while cranking shows it; more than a few tenths of a volt there is too much.",
        },
        {
          q: "What is the best way to clean battery corrosion?",
          a: "Disconnect the negative cable first, then the positive. Brush on a solution of baking soda and water, about a tablespoon per cup, and let it fizz as it neutralizes the acid. Scrub the posts and clamps with a terminal brush, rinse with a little clean water, dry, reconnect positive then negative, and coat with terminal protector.",
        },
        {
          q: "What does blue or green battery corrosion mean?",
          a: "Blue-green deposits are usually copper sulfate, formed where acid reaches copper in the cable or a copper-alloy clamp. White or gray powder is mostly lead sulfate from the posts. Blue-green crust that has crept up into the cable insulation means acid has wicked into the copper strands, and that cable end may need replacing rather than just cleaning.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-is-my-alternator-overcharging",
          title: "Why Is My Alternator Overcharging?",
          desc: "If corrosion keeps returning and charging voltage is high, the regulator or its sensing is the next stop.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "The full voltage-drop method for starter, ground and charging cables, not just the battery clamps.",
        },
      ]}
    >
      <Callout title="Battery acid and gas safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The white or blue-green crust contains acid residue. Wear eye protection and gloves, and don&apos;t brush it
            toward your face or onto paint.
          </li>
          <li>
            Batteries give off hydrogen. Keep flames, cigarettes and sparks away, and disconnect the negative cable
            first so a slipping wrench on the positive can&apos;t short to the body.
          </li>
          <li>
            A battery that is cracked, leaking liquid, swollen or hissing needs replacing, not cleaning. Have a parts
            store or mechanic handle it.
          </li>
          <li>
            If acid gets in your eyes, rinse with clean water for at least 15 minutes and get medical help. For skin,
            rinse well with water.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-it-is" className="text-xl font-semibold mb-3">What battery corrosion actually is</h2>
        <p className="text-muted leading-7 mb-4">
          A flooded lead-acid car battery holds plates in dilute sulfuric acid. While it charges, especially near the
          end of charge, some water splits into hydrogen and oxygen gas, and that gas carries a fine acid mist out
          through the vents. When the mist settles on the posts and clamps, the acid reacts with the metal. Lead posts
          form lead sulfate, a white or gray powder. Copper in the cable or a brass or copper-alloy clamp forms copper
          sulfate, the blue-green crystals that look alarming. Moisture and road grime help the reaction along.
        </p>
        <p className="text-muted leading-7">
          The other route is seepage. The posts pass through the battery lid with a seal around each one, and if that
          seal is cracked, by an overtightened clamp, a lever-on removal or simply age, electrolyte can creep up the
          post by capillary action. That kind of corrosion grows from the base of the post upward and comes back
          quickly however often you clean it.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Where the deposits form and how fast they return are the best clues. Combine them with two voltage readings,
          and the cause usually becomes clear.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Crust returns within weeks, battery warm", "Overcharging and heavy gassing", "Running voltage above about 15 V", "Fix the charging fault; see overcharging guide"],
            ["Corrosion grows from the post base up", "Cracked or leaking post seal", "Inspect for wet acid at the lid", "Replace the battery"],
            ["Light white film after a few years", "Normal venting from an aging battery", "Voltages normal", "Clean and protect; nothing else"],
            ["Wet top, acid around caps", "Overfilled cells or loose vent caps", "Check level and caps", "Correct level, seat caps, clean"],
            ["Blue-green crust in cable insulation", "Acid wicked into copper strands", "Voltage drop across cable end", "Replace the cable end or cable"],
            ["Car clicks, battery reads 12.6 V", "Resistance from corroded clamp", "Clamp voltage drop while cranking", "Clean, tighten or replace clamp"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="inspect">Inspect where the corrosion grows</StepHeading>
        <p className="text-muted leading-7">
          Before cleaning, look closely. Note which terminal is worse, whether the deposits start at the base of the
          post where it leaves the lid or on the outside of the clamp, and whether the top of the battery is damp. Check
          the vent caps on a flooded battery and the electrolyte level if they come off. A battery mounted in the trunk
          or under a seat normally has a vent tube that carries gas outside; a disconnected or missing tube causes
          corrosion and is a safety issue. Also check the date code on the battery; deposits on a battery past about
          four or five years old are often simply age.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="charging">Check the charging voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Overcharging is the cause you most need to rule out, because it also ruins the battery. Start the engine,
          leave accessories off, and measure across the battery posts with the meter on DC volts. Most charging
          systems hold roughly 13.5 to 14.7 V once warm; your vehicle maker&apos;s figure is the authority. A reading
          that sits above about 15 V, or rises as you hold the engine at 2,000 rpm, means the battery is being pushed
          into gassing. The{" "}
          <Link href="/multimeters/why-is-my-alternator-overcharging" className={link}>
            alternator overcharging guide
          </Link>{" "}
          tracks down why.
        </p>
        <Figure caption={<>Illustrative reading from a car whose battery corrodes quickly: 15.6 V at the posts with the engine running points to overcharging.</>}>
          <MeterReadout value="15.6" unit="V" mode="DC V  engine running" />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="resting">Check the resting voltage</StepHeading>
        <p className="text-muted leading-7">
          After the car has sat for a few hours, measure the battery again with the engine off. A healthy, charged
          battery reads about 12.6 to 12.7 V. A battery that sits low, around 12.2 V or under, is chronically
          undercharged, which is common on cars used for short trips. Undercharging doesn&apos;t cause much gassing, but
          it sulfates the plates and shortens battery life. A reading near 10.5 V suggests a shorted cell, which can
          also make the battery boil and corrode under normal charging. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-with-a-multimeter" className={link}>
            testing a car battery with a multimeter
          </Link>{" "}
          covers the full battery check.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="clean">Clean the terminals safely</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Note your radio code or any settings that need it, then turn off the ignition. Loosen and remove the negative
          clamp first, then the positive. Mix about a tablespoon of baking soda into a cup of warm water and brush it
          onto the posts, clamps and battery top. It fizzes as it neutralizes the acid; keep adding until the fizzing
          stops. Scrub the posts and the inside of the clamps with a battery terminal brush until you see bright metal.
          Wipe off the residue with a damp cloth, keeping the solution out of the vent caps, then dry everything.
        </p>
        <p className="text-muted leading-7">
          Inspect the clamps once clean. A clamp that is eaten thin, cracked or no longer tightens fully needs replacing,
          and so does a cable whose copper strands are green inside the insulation. Reconnect the positive clamp first
          and the negative last, tightened firmly but not enough to distort the post.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="drop-test">Voltage-drop test the clamp connections</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Corrosion matters because it adds resistance where the starter draws hundreds of amps. A voltage-drop test
          measures that loss directly. Set the meter to DC volts on a low range. Put one probe on the top of the lead
          post itself and the other on the clamp, then have a helper crank the engine for a few seconds (disable fuel
          or ignition per the service manual if you don&apos;t want it to start). The meter reads only the voltage lost
          across that joint.
        </p>
        <Figure caption={<>Probe the lead post and the clamp separately: the reading during cranking is the voltage lost across the corroded joint.</>}>
          <TerminalDropDiagram />
        </Figure>
        <DataTable
          head={["Drop across one clamp while cranking", "Verdict", "Arithmetic at 150 A starter draw (illustrative)"]}
          rows={[
            ["Under about 0.05 V", "Clean, tight connection", "0.05 ÷ 150 ≈ 0.3 mΩ"],
            ["About 0.1–0.2 V", "Marginal; clean and retighten", "0.2 ÷ 150 ≈ 1.3 mΩ"],
            ["0.5 V or more", "Bad; costs real cranking voltage", "0.5 ÷ 150 ≈ 3.3 mΩ, about 75 W lost as heat"],
          ]}
          mono={[0, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          The numbers show why tiny resistances matter: a few thousandths of an ohm at starter current steals half a
          volt or more, and that can turn a crank into a click. Repeat on the other terminal, and if the clamps pass
          but the car still cranks slowly, extend the test along the cables with{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            the car ground wire test
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="prevent">Prevent the corrosion coming back</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the cause fixed, protection keeps the terminals clean. Coat the reconnected posts and clamps with a
          battery terminal protector spray or dielectric grease, which keeps acid mist and moisture off the metal.
          Felt anti-corrosion washers treated with an inhibitor sit under the clamp and help on flooded batteries. Keep
          the battery hold-down tight, because a battery that moves can crack its post seals. If a flooded battery keeps
          gassing heavily even with normal charging voltage, it&apos;s near the end of its life.
        </p>
        <Figure caption={<>From crust to cause: the order that fixes battery corrosion for good.</>}>
          <FlowDiagram
            steps={[
              { label: "Inspect", sub: "Where and how fast" },
              { label: "Charging V", sub: "Above ~15 V?" },
              { label: "Resting V", sub: "12.6 V or low?" },
              { label: "Clean", sub: "Baking soda, brush" },
              { label: "Drop test", sub: "Under ~0.1 V" },
            ]}
          />
        </Figure>
        <KeyIdea title="Corrosion is a symptom first">
          Cleaning removes the crust, but fast-returning corrosion is the battery telling you it&apos;s gassing or
          leaking. Two voltage readings, running and resting, separate a charging fault from a tired battery.
        </KeyIdea>
      </section>

      <section>
        <h2 id="positive-negative" className="text-xl font-semibold mb-3">
          Corrosion on the positive vs the negative terminal
        </h2>
        <p className="text-muted leading-7 mb-4">
          You will often read that positive-terminal corrosion means overcharging and negative-terminal corrosion means
          undercharging. It&apos;s a widely repeated rule of thumb with some logic behind it, since heavy gassing during
          overcharge happens while the battery is charging hard, but where deposits gather also depends on the clamp
          metals, which way the vents face, airflow under the hood and which seal is leaking. Use it as a hint and let
          the meter decide.
        </p>
        <DataTable
          head={["What you see", "Common explanation", "Confirm with"]}
          rows={[
            ["Mostly on the positive post", "Gassing from overcharge, or heat", "Running voltage above about 15 V"],
            ["Mostly on the negative post", "Often linked to undercharging or short trips", "Resting voltage around 12.2 V or lower"],
            ["Both posts, slow build-up", "Normal venting with age", "Normal readings; check battery age"],
            ["Wet acid at one post base", "Failed post seal", "Visual; replace battery"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the battery tests low every morning, look for a drain before blaming the alternator; the{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            parasitic drain test
          </Link>{" "}
          finds circuits that stay awake after the car is locked. A battery that reads 12 V yet won&apos;t crank after
          cleaning is covered in{" "}
          <Link href="/multimeters/how-to-test-a-car-battery-that-reads-12-volts-but-wont-start" className={link}>
            battery reads 12 volts but won&apos;t start
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for battery terminal checks</h2>
        <p className="text-muted leading-7 mb-6">
          Charging and resting voltage need two decimal places; the voltage-drop test needs a meter that reads small
          voltages clearly and a display that settles quickly enough to catch a short crank.
        </p>
        <ProductStrip
          title="Meters for battery and terminal tests"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Automotive True RMS meter with RPM, dwell and duty cycle, CAT III 600V. A good fit for charging and cranking tests.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "6,000-count True RMS display with auto and manual ranging, so you can lock a low range for clamp voltage drops.",
            },
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized 200 g Fluke with a 6,000-count display and CAT III 600V. Small enough to live in the glovebox.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
