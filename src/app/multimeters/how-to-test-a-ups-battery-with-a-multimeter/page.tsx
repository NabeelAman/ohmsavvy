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
  "Test a UPS battery with a multimeter: resting voltage vs charge, the float voltage, each block in a 24 or 48 V string, and a load check with the self-test.";

export const metadata = buildMetadata({
  title: "How to Test a UPS Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-ups-battery-with-a-multimeter",
});

const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;

const link = "text-accent hover:underline";

/** Two 12 V blocks in series in a 24 V UPS, with where to put the probes for each block and the string. */
function UpsStringDiagram() {
  return (
    <svg
      viewBox="0 0 340 190"
      className="w-full h-auto"
      role="img"
      aria-label="How to test a UPS battery string with a multimeter: two 12 volt sealed lead-acid blocks are wired in series to make 24 volts. Measure each block across its own two terminals, then measure the whole string from the first block's negative to the second block's positive, and compare the two block readings."
    >
      {/* block A */}
      <rect x="30" y="70" width="110" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="85" y="102" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Block A</text>
      <text x="85" y="118" fontSize="9" textAnchor="middle" className="fill-muted">12 V SLA</text>
      <rect x="42" y="60" width="18" height="10" className="fill-muted" />
      <rect x="110" y="60" width="18" height="10" className="fill-accent" />
      <text x="51" y="56" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">−</text>
      <text x="119" y="56" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">+</text>
      {/* block B */}
      <rect x="200" y="70" width="110" height="70" rx="6" className="fill-surface stroke-foreground" strokeWidth="2" />
      <text x="255" y="102" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Block B</text>
      <text x="255" y="118" fontSize="9" textAnchor="middle" className="fill-muted">12 V SLA</text>
      <rect x="212" y="60" width="18" height="10" className="fill-muted" />
      <rect x="280" y="60" width="18" height="10" className="fill-accent" />
      <text x="221" y="56" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">−</text>
      <text x="289" y="56" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">+</text>
      {/* series link */}
      <path d="M119 60 V40 H221 V60" className="stroke-foreground" strokeWidth="2" fill="none" />
      <text x="170" y="34" fontSize="9" textAnchor="middle" className="fill-muted">series link</text>
      {/* measurements */}
      <g className="stroke-accent" strokeWidth="1.3" fill="none" strokeDasharray="4 3">
        <path d="M51 150 V160 H119 V150" />
        <path d="M221 150 V160 H289 V150" />
        <path d="M51 166 V178 H289 V166" />
      </g>
      <text x="85" y="157" fontSize="8" textAnchor="middle" className="fill-accent">V(A) ≈ 12.8</text>
      <text x="255" y="157" fontSize="8" textAnchor="middle" className="fill-accent">V(B) ≈ 12.8</text>
      <text x="170" y="175" fontSize="8" textAnchor="middle" className="fill-accent">string ≈ 25.6 V</text>
    </svg>
  );
}

export default function HowToTestAUpsBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a UPS Battery With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-ups-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a UPS battery with a multimeter, take the battery out (or shut the UPS down), let it rest, and read
          DC volts across each 12 V block: a healthy, fully charged sealed lead-acid block reads about 12.8–13.0 V, and
          anything below about 12.4 V after a full recharge points to a worn battery. Voltage alone can&apos;t prove the
          battery will carry a load, so the second half of the test is a load check: watch the voltage during the
          UPS&apos;s own self-test or a short runtime test. This guide covers both, plus the float voltage the UPS should
          hold and how to find the one weak block in a 24 V or 48 V string.
        </>
      }
      aside={{
        image: fluke107.image,
        alt: "Fluke 107 palm-sized multimeter for checking UPS battery block voltage",
        caption: (
          <>
            A palm-sized meter like the Fluke 107 fits behind a desk or in a rack for quick block-by-block readings.
            See our{" "}
            <Link href="/multimeters/fluke-107-review" className={link}>
              Fluke 107 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-ups-batteries-fail", label: "How UPS batteries fail" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "shut-down-and-remove", label: "1. Shut down and remove the battery" },
        { id: "resting-voltage", label: "2. Measure the resting voltage" },
        { id: "each-block", label: "3. Test each block in a string" },
        { id: "float-voltage", label: "4. Check the float (charging) voltage" },
        { id: "load-test", label: "5. Run a load check" },
        { id: "decide", label: "6. Decide: recharge or replace" },
        { id: "service-life", label: "Service life and temperature" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a 12V UPS battery read?",
          a: "A fully charged 12 V sealed lead-acid UPS battery at rest typically reads about 12.8–13.0 V. Around 12.4 V is roughly half charged, and below 12.0 V is close to empty. Read it after it has rested off charge for several hours. A battery that won't reach about 12.6 V even after a full recharge in the UPS is losing capacity.",
        },
        {
          q: "Can a UPS battery read 12 volts and still be bad?",
          a: "Yes, and it's common. Voltage shows the state of charge, not how much current the battery can still deliver. A sulfated or dried-out block can show a normal resting voltage, then collapse within seconds when the UPS switches to battery. That's why the load check during a self-test, watching for the voltage dropping sharply, is the more useful part of the test.",
        },
        {
          q: "How long do UPS batteries last?",
          a: "Small UPS units usually use valve-regulated lead-acid batteries with a design life of about 3 to 5 years at room temperature, and UPS makers commonly advise replacement in that window. Heat shortens it sharply: a UPS in a hot closet or next to a server rack may need new batteries much sooner. Frequent power outages that cycle the battery also wear it faster.",
        },
        {
          q: "Should I replace all UPS batteries at once?",
          a: "Yes, for any UPS with two or more blocks in series. The blocks share the same current, so a new block paired with an old one ends up overcharged or undercharged, and the older block limits runtime anyway. UPS makers sell replacement cartridges with matched blocks for this reason. Replace every block in the string with the same type and rating.",
        },
        {
          q: "Why does my UPS say replace battery when the voltage is fine?",
          a: "The UPS measures how the battery behaves under load during its self-test, not just its resting voltage. If the voltage drops too far or too fast when the load transfers, it flags the battery even though the open-circuit reading looks healthy. Recharge for at least the time the manual specifies, run the self-test again, and replace the battery if the warning returns.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-12v-battery-under-load",
          title: "How to Test a 12V Battery Under Load",
          desc: "A simple load check for any 12 V block when you don't have a UPS self-test.",
        },
        {
          href: "/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter",
          title: "Check a 12V Leisure Battery With a Multimeter",
          desc: "Full lead-acid and AGM state-of-charge tables and resting-voltage method.",
        },
      ]}
    >
      <Callout title="Work on UPS batteries safely">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A UPS makes mains voltage from its battery, even when unplugged. Switch it off and unplug it before
            opening any battery door, and never open the main case.
          </li>
          <li>
            Only remove batteries through the user-accessible battery door or cartridge the maker designed for it. If
            the batteries are inside the main enclosure, have the UPS serviced.
          </li>
          <li>
            Series strings in larger UPS units reach 48 V DC or more, and any block can deliver hundreds of amps into
            a short. Remove jewelry, use insulated tools and keep the terminal covers on.
          </li>
          <li>
            A swollen, cracked, hot or leaking battery, or a UPS that smells of rotten eggs, needs to be shut down
            now. Recycle the battery; lead-acid batteries must not go in household trash.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-ups-batteries-fail" className="text-xl font-semibold mb-3">How UPS batteries fail</h2>
        <p className="text-muted leading-7 mb-4">
          Most desktop and small rack UPS units use 12 V valve-regulated lead-acid (VRLA) batteries, also called
          sealed lead-acid (SLA) or AGM. They spend nearly all their life on float charge, sitting at a steady voltage
          while the UPS waits for an outage. They rarely fail by running flat; they fail by drying out and
          corroding internally, which raises their internal resistance. The battery still reads a normal voltage at
          rest, but when the UPS asks for tens of amps during an outage the voltage collapses and the UPS shuts
          down within seconds.
        </p>
        <p className="text-muted leading-7">
          That failure mode shapes the test. The resting voltage tells you whether the battery is charged and whether
          the UPS is charging it. The behavior under load tells you whether it can still do its job. A good test uses
          both, and on units with two or more blocks it compares the blocks, because one weak block drags the whole
          string down.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Replace-battery light or alarm", "High internal resistance from age", "Load check during self-test (step 5)", "Replace with the maker's cartridge or same spec"],
            ["UPS shuts off seconds into an outage", "Worn battery collapses under load", "Block voltages during the load check", "Replace all blocks in the string"],
            ["Battery reads low even after a day on charge", "Charger fault or battery won't accept charge", "Float voltage (step 4) and resting voltage", "If float is normal, replace the battery"],
            ["One block reads lower than the other", "Weak or failed block in the string", "Each block separately (step 3)", "Replace every block in the string together"],
            ["Swollen or hot battery case", "Overcharge, heat or internal short", "Visual only; no test", "Shut down; recycle; check the charger"],
            ["Runtime much shorter than the label", "Lost capacity or added load", "Load in watts vs runtime chart", "Reduce load or replace the battery"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="shut-down-and-remove">Shut down the UPS and remove the battery</StepHeading>
        <p className="text-muted leading-7">
          Shut down whatever the UPS protects, switch the UPS off, and unplug it. Open the battery door or slide out
          the battery cartridge as the manual describes; many units have a front or bottom door with a single screw.
          Note how the blocks are connected and photograph the wiring. Leave the battery to rest for a few hours,
          ideally overnight, before reading it, because the surface charge from float charging makes a battery read
          higher than its real state of charge for a while.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resting-voltage">Measure the resting voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts and read across the battery&apos;s terminals, red on positive. Compare with the
          table. The figures are typical for 12 V VRLA batteries at about 25 °C and vary a little by maker, so treat
          them as approximate.
        </p>
        <DataTable
          head={["Resting voltage (12 V block)", "Approximate state of charge", "What to do"]}
          rows={[
            ["12.8–13.0 V", "Full", "Go on to the load check"],
            ["12.6 V", "About 75–90%", "Recharge, then retest"],
            ["12.4 V", "About 50–60%", "Recharge; repeat if it falls back"],
            ["12.2 V", "About 25–40%", "Recharge promptly to limit sulfation"],
            ["Below 12.0 V", "Near empty", "Recharge; replace if it won't recover"],
            ["Below about 10.5 V", "Deeply discharged or a dead cell", "Likely needs replacing"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          A block reading about 2 V lower than expected, around 10.5–10.8 V when it should be near 12.8 V, usually has
          a shorted cell: a 12 V block is six cells of about 2.1 V each, and one dead cell takes roughly 2 V out. That
          block is finished.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="each-block">Test each block in a 24 V or 48 V string</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Larger UPS units wire 12 V blocks in series: two for 24 V, four for 48 V, and more in big rack units. Read
          the whole string first, then each block across its own two terminals. The blocks should be close to each
          other. A spread of more than a couple of tenths of a volt between blocks at rest is a warning sign, and a
          block a full volt or more below the others is failing.
        </p>
        <Figure caption={<>A 24 V UPS string: measure each 12 V block across its own terminals, then the whole string. Values shown are illustrative for a fully charged pair.</>}>
          <UpsStringDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The weak block is easy to miss on the string reading alone. Two blocks at 12.9 V and 12.1 V add up to 25.0 V,
          which looks fine for a 24 V string at a glance, but the 12.1 V block will give out first and end the UPS&apos;s
          runtime. Replace all blocks together, because a fresh block in an aged string gets unequal charge.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="float-voltage">Check the float (charging) voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the battery tests low after days on the UPS, check whether the UPS is charging it. Some UPS designs let
          you read the charger output at the battery connector with the battery removed; on others the voltage is
          only present with a battery connected. Only measure where the manual says it is safe to, and never inside
          the main case. VRLA battery makers commonly specify a float voltage of about 2.25–2.30 V per cell at 20–25
          °C, which is about 13.5–13.8 V per 12 V block, or about 27–27.6 V for a 24 V string.
        </p>
        <Figure caption={<>Illustrative readings on a 12 V block: at rest after removal, and on float in a UPS that is charging correctly.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.86" unit="V" mode="DC V  at rest" />
            <MeterReadout value="13.62" unit="V" mode="DC V  on float" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A float voltage well below that range means the battery never gets fully charged; well above it, the battery
          is being overcharged and will dry out and may swell. Either points to a UPS charger fault, which is a job for
          the maker&apos;s service center, not a new battery.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="load-test">Run a load check</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Reinstall the charged battery, plug in the UPS and let it charge fully as the manual specifies. Then connect
          a modest load, such as the computer it normally protects, and run the UPS self-test or briefly unplug the
          UPS from the wall. If the battery terminals are reachable safely through the battery door, watch the voltage
          as the load transfers. A healthy 12 V block drops a little and then declines slowly. A worn one drops
          sharply, often below 11 V within seconds, and the UPS may shut down or flag the battery.
        </p>
        <p className="text-muted leading-7 mb-4">
          If you can&apos;t reach the terminals safely, use runtime instead. Compare how long the UPS runs your load with
          the runtime chart in its manual. As an example of the arithmetic: a 12 V, 9 Ah block holds about 108 Wh; a
          UPS running a 60 W load at around 80% inverter efficiency draws about 60 ÷ 0.8 = 75 W from the battery, so
          a new battery might give somewhat over an hour in theory. Real runtime at higher loads is well below this,
          because lead-acid capacity falls at high discharge rates. Use the maker&apos;s chart, not the arithmetic, as
          the target; if you get half of it or less, the battery is worn.
        </p>
        <Figure caption={<>The test order: charge state first, then the blocks, then the charger, then a real load.</>}>
          <FlowDiagram
            steps={[
              { label: "Rest", sub: "Off charge, hours" },
              { label: "Volts", sub: "Each 12 V block" },
              { label: "Compare", sub: "Blocks in string" },
              { label: "Float", sub: "13.5–13.8 V/block" },
              { label: "Load", sub: "Self-test, runtime" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={6} id="decide">Decide: recharge or replace</StepHeading>
        <p className="text-muted leading-7">
          Replace the battery if any block reads more than about 1 V below the others, if a block won&apos;t reach 12.6 V
          after a full recharge, if it collapses under the self-test, or if it is swollen. Also replace it if it&apos;s
          past its design life and the UPS guards anything important; at that point a failure during an outage
          costs more than a battery. Use the UPS maker&apos;s replacement cartridge or blocks with the same voltage, Ah
          rating, size and terminal type. If you want to measure capacity more precisely, the{" "}
          <Link href="/multimeters/how-to-test-lithium-battery-capacity-with-a-multimeter" className={link}>
            timed discharge method
          </Link>{" "}
          works on lead-acid blocks too, with a 10.5 V cutoff for a 12 V block.
        </p>
        <KeyIdea title="Voltage shows charge, the load shows health">
          A UPS battery can show a perfect 12.8 V and still fail the moment the power goes out. Use the resting
          voltage to check charge and compare blocks, and use a load check to prove it can still carry the load.
        </KeyIdea>
      </section>

      <section>
        <h2 id="service-life" className="text-xl font-semibold mb-3">UPS battery service life and temperature</h2>
        <p className="text-muted leading-7 mb-4">
          VRLA batteries in small UPS units typically have a design life of 3 to 5 years at about 25 °C. Heat is the
          biggest enemy: a widely cited rule of thumb in lead-acid battery literature is that life roughly halves for
          every 8–10 °C of sustained temperature above 25 °C. The chart applies that rule to a 5-year design life,
          using the 8 °C figure. The numbers are illustrative, not a prediction for your battery.
        </p>
        <Figure caption={<>Illustrative expected life of a 5-year VRLA UPS battery at different sustained room temperatures, halving every 8 °C above 25 °C.</>}>
          <BarChart
            items={[
              { label: "25 °C (77 °F)", value: 5, display: "about 5 years", highlight: true },
              { label: "33 °C (91 °F)", value: 2.5, display: "about 2.5 years" },
              { label: "41 °C (106 °F)", value: 1.25, display: "about 1.25 years" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Keep the UPS out of enclosed cabinets and away from equipment exhaust, and give it a few inches of space for
          air. A UPS that sees frequent short outages also wears its battery faster, because each outage is a
          discharge cycle.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on UPS batteries</h2>
        <p className="text-muted leading-7 mb-6">
          You only need accurate DC volts to two decimal places, which any 4,000- or 6,000-count meter provides. A
          compact body helps behind desks and in racks, and a CAT rating matters because the same meter is likely to
          be used near the mains outlets the UPS plugs into.
        </p>
        <ProductStrip
          title="Meters for UPS battery checks"
          items={[
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized at 200 g with a 6,000-count display and CAT III 600V. Easy to use behind a desk or in a rack.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s True RMS multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS, backlit and auto-ranging with NCV at a budget price. Fine for home and office UPS checks; CAT II 600V.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution for comparing blocks to the hundredth of a volt, with auto and manual ranging.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
