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

// Sources for product numbers on this page:
// - Fluke 117: 9 V alkaline (IEC 6LR61), "400 hours typical, without backlight" per
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-117
// - Fluke 87V: 9 V alkaline, "~400 hours typical, without backlight" per
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
// - Fluke 115: 9 V alkaline, about 400 hours without backlight per
//   https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 (see fluke-115-review)
// - Fluke 175 (about 200 h on a 9 V), Fluke 77 IV (about 400 h on a 9 V), Fluke 87V MAX, 27 II and 28 II
//   (about 800 h on 3 x AA) and Fluke 3000 FC (250 h on 3 x AA): Picks in src/lib/multimeter-catalog.ts,
//   whose "Specs per" comments cite fluke.com.
// Battery capacities (9 V alkaline, carbon-zinc, lithium) are typical standard values, hedged in the text.

const description =
  "Multimeter battery drains quickly? Find the cause: auto power-off, backlight, dial left on, cheap cells, cold or a fault, plus rated battery life by meter.";

export const metadata = buildMetadata({
  title: "Multimeter Battery Drains Quickly? 8 Causes",
  description,
  path: "/multimeters/why-is-my-multimeter-battery-draining-so-quickly",
});

const all = getAllPicks("multimeters");
const fluke87vmax = all.find((p) => p.name === "Fluke 87V MAX")!;
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke115 = all.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Where the battery current goes inside a handheld meter, and the two switches that stop it. */
function PowerPathDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Block diagram of multimeter battery drain: the battery feeds the rotary switch, then a voltage regulator, which powers the measuring chip and display all the time the meter is on, plus the backlight, continuity beeper and flashlight only when used. An auto power-off timer can cut the regulator after a period with no button presses or dial moves. Turning the dial to OFF opens the circuit at the rotary switch."
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="10" y="95" width="56" height="50" rx="4" />
        <rect x="96" y="95" width="62" height="50" rx="4" />
        <rect x="188" y="95" width="62" height="50" rx="4" />
        <line x1="66" y1="120" x2="96" y2="120" />
        <line x1="158" y1="120" x2="188" y2="120" />
        <line x1="250" y1="120" x2="270" y2="120" />
        <line x1="270" y1="40" x2="270" y2="215" />
        <line x1="270" y1="40" x2="284" y2="40" />
        <line x1="270" y1="98" x2="284" y2="98" />
        <line x1="270" y1="156" x2="284" y2="156" />
        <line x1="270" y1="215" x2="284" y2="215" />
        <rect x="284" y="26" width="70" height="28" rx="3" />
        <rect x="284" y="84" width="70" height="28" rx="3" />
        <rect x="284" y="142" width="70" height="28" rx="3" />
        <rect x="284" y="201" width="70" height="28" rx="3" />
      </g>
      <g className="stroke-accent" strokeWidth="1.8" fill="none" strokeDasharray="4 3">
        <rect x="188" y="180" width="62" height="34" rx="4" />
        <line x1="219" y1="180" x2="219" y2="145" />
      </g>
      <g fontSize="10" className="fill-foreground" textAnchor="middle">
        <text x="38" y="117">battery</text>
        <text x="38" y="131">9 V or AA</text>
        <text x="127" y="117">rotary</text>
        <text x="127" y="131">switch</text>
        <text x="219" y="117">regulator</text>
        <text x="219" y="131">(on rail)</text>
        <text x="319" y="44">chip + LCD</text>
        <text x="319" y="102">backlight</text>
        <text x="319" y="160">beeper</text>
        <text x="319" y="219">light / NCV</text>
      </g>
      <g fontSize="9" textAnchor="middle" className="fill-accent">
        <text x="219" y="195">auto power-off</text>
        <text x="219" y="207">timer cuts rail</text>
        <text x="127" y="82">OFF opens here</text>
      </g>
      <g fontSize="9" className="fill-muted" textAnchor="middle">
        <text x="319" y="18">always on while awake</text>
        <text x="319" y="76">only when switched on</text>
        <text x="319" y="134">only while sounding</text>
        <text x="319" y="193">only when used</text>
      </g>
    </svg>
  );
}

export default function MultimeterBatteryDrainingPage() {
  return (
    <HowToShell
      title="Why Is My Multimeter Battery Draining So Quickly?"
      description={description}
      path="/multimeters/why-is-my-multimeter-battery-draining-so-quickly"
      category="multimeters"
      published="2026-10-29"
      intro={
        <>
          A multimeter battery drains quickly almost always because the meter spends far more hours switched
          on than you think: the dial gets left on a function, auto power-off is disabled or missing, or the
          backlight stays lit. If none of those fit, the usual suspects are cheap carbon-zinc cells, cold
          storage, corroded contacts or a worn rotary switch that never fully disconnects the battery. A
          meter like the Fluke 117 is rated for about 400 hours on one 9 V alkaline, so a cell that dies in a
          couple of weeks is telling you something specific, and this page shows how to find out what.
        </>
      }
      aside={{
        image: fluke87vmax.image,
        alt: "Fluke 87V MAX multimeter, rated for about 800 hours on three AA batteries",
        caption: (
          <>
            Fluke rates the 87V MAX at about 800 hours on three AA cells. Compare it in{" "}
            <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
              Fluke 87V vs 87V MAX
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-long", label: "How long a battery should last" },
        { id: "causes", label: "Causes at a glance" },
        { id: "worked-example", label: "Worked example: hours per day" },
        { id: "where-current-goes", label: "Where the current goes" },
        { id: "step-off", label: "1. Make OFF a habit" },
        { id: "step-apo", label: "2. Check auto power-off" },
        { id: "step-backlight", label: "3. Ration the backlight and extras" },
        { id: "step-cell", label: "4. Use the right battery chemistry" },
        { id: "step-cold", label: "5. Allow for cold" },
        { id: "step-contacts", label: "6. Inspect for leakage and corrosion" },
        { id: "step-idle-drain", label: "7. Test for drain with the meter off" },
        { id: "meters", label: "Meters with long battery life" },
      ]}
      faq={[
        {
          q: "How long should a 9V battery last in a multimeter?",
          a: "It depends on the meter's current draw, so check the manual. Fluke rates the 115, 117 and 87V at about 400 hours of on-time with a 9 V alkaline and the backlight off, and the 175 at about 200 hours. For someone using a meter an hour or two a day, that works out to several months to over a year. A cell that lasts only weeks points to time left switched on.",
        },
        {
          q: "Does a multimeter use battery when it is turned off?",
          a: "On most handheld meters, turning the rotary dial to OFF physically breaks the battery circuit, so the drain is essentially zero apart from the cell's own slow self-discharge. Meters with a push-button power switch or a soft-off position can keep a tiny standby circuit alive. If you suspect that, measure the current with a second meter as described in step 7.",
        },
        {
          q: "Can I use a lithium 9V battery in my multimeter?",
          a: "Usually yes, if the manual allows any 9 V cell rather than alkaline only. A typical lithium 9 V holds roughly twice the energy of an alkaline, works better in the cold and is far less prone to leaking. Its voltage stays flatter as it empties, so the low-battery symbol may appear later and closer to the end. Avoid rechargeable cells unless the maker approves them.",
        },
        {
          q: "Why does my multimeter show low battery with a new battery?",
          a: "A new cell that triggers the warning at once is often a carbon-zinc or old-stock battery that sags under the meter's load, or it is cold. Corroded or loose snap contacts add resistance and drop the voltage the meter sees. Measure the battery with a second meter, clean the contacts and try a fresh alkaline from a different pack before suspecting the meter.",
        },
        {
          q: "Should I take the battery out of my multimeter for storage?",
          a: "If the meter will sit unused for a few months, yes. Alkaline cells can leak as they age, especially once discharged, and the electrolyte corrodes the snap and the circuit board. Removing the cell removes that risk entirely. For a meter you use every week, leaving a good-quality cell in place and switching to OFF after each job is fine.",
        },
        {
          q: "Does the continuity beeper drain the battery faster?",
          a: "The buzzer draws noticeably more current than the display while it sounds, so long continuity sessions, or leaving the leads shorted on the continuity setting, do shorten battery life. Ordinary checks that beep for a second at a time make little difference. Leaving the dial parked on continuity or resistance with the leads clipped together is the habit to avoid.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-wont-turn-on",
          title: "Multimeter Won't Turn On?",
          desc: "When the battery has already gone flat, or something else stops the meter powering up.",
        },
        {
          href: "/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load",
          title: "How to Check a 9V Battery Under Load",
          desc: "Tell a healthy 9 V cell from one that only looks good with no load.",
        },
        {
          href: "/multimeters/why-does-my-multimeter-show-the-wrong-voltage",
          title: "Why Does My Multimeter Show the Wrong Voltage?",
          desc: "A weak battery is one of the reasons readings go wrong.",
        },
        {
          href: "/multimeters/fluke-117-review",
          title: "Fluke 117 Review",
          desc: "A 9 V meter rated for about 400 hours without the backlight.",
        },
      ]}
    >
      <Callout title="Safety: batteries and a weak meter">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Don&apos;t use a meter showing the low-battery symbol on live mains or high-energy circuits. A weak
            battery can make readings wrong, and a meter that understates voltage gives false confidence. Replace
            the cell first.
          </li>
          <li>
            Disconnect the test leads from any circuit and remove them from the jacks before opening the battery
            door. Never run the meter with the case or door open.
          </li>
          <li>
            Leaked alkaline electrolyte is caustic. Wear gloves and eye protection when cleaning it, don&apos;t
            let it touch skin, and wash your hands afterward. Never recharge, heat or short a primary
            (non-rechargeable) cell.
          </li>
          <li>
            Use only the battery type the manual names. A cell of the wrong voltage or a rechargeable the maker
            doesn&apos;t approve can upset the low-battery warning, so you lose the signal that readings may be
            off.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-long" className="text-xl font-semibold mb-3">How long a multimeter battery should last</h2>
        <p className="text-muted leading-7 mb-4">
          Battery life on a meter is quoted in hours of on-time, not calendar days. That single fact explains
          most complaints. Fluke rates the 115, 117 and 87V at about 400 hours each on a 9 V alkaline with the
          backlight off, the 175 at about 200 hours, and the 87V MAX, 27 II and 28 II at about 800 hours on
          three AA cells. Those numbers come from the maker, not from our own testing, and they assume the
          backlight and other extras stay off. Budget meters often don&apos;t publish a figure at all, which is
          itself useful information: if the maker won&apos;t state it, expect less.
        </p>
        <BarChart
          items={[
            { label: "Fluke 175 (9 V)", value: 200, display: "≈ 200 h" },
            { label: "Fluke 3000 FC (3 × AA)", value: 250, display: "250 h" },
            { label: "Fluke 115 / 117 (9 V)", value: 400, display: "≈ 400 h", highlight: true },
            { label: "Fluke 87V / 77 IV (9 V)", value: 400, display: "≈ 400 h" },
            { label: "Fluke 27 II / 28 II (3 × AA)", value: 800, display: "≈ 800 h" },
            { label: "Fluke 87V MAX (3 × AA)", value: 800, display: "≈ 800 h" },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Maker-published battery life, alkaline cells, backlight off where Fluke specifies it. Sources are
          listed in the page source; your figure depends on how you use the meter.
        </p>
        <p className="text-muted leading-7 mt-4">
          The jump to 800 hours on the AA meters is mostly about stored energy. Three AA alkaline cells in
          series typically hold several times the energy of one 9 V alkaline, because a 9 V battery is six
          tiny cells stacked in a small case. If your meter takes a 9 V and you are disappointed by its
          battery life, the figure in the manual is the benchmark to judge it against, not a friend&apos;s
          AA-powered meter.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Why a multimeter battery drains quickly: causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Battery dead after a few days or weeks; meter often found on", "Dial left on a function between jobs", "Note the dial position whenever you pick the meter up", "Turn to OFF after every job; store it with the dial on OFF"],
            ["Meter never switches itself off", "Auto power-off disabled at startup, or the model has none", "Leave it idle on V for 30 to 60 minutes and see if it sleeps", "Re-enable APO (power-cycle normally); check the manual"],
            ["Short life since you started working in dark spaces", "Backlight, flashlight or lit jacks left on", "Watch whether the backlight times out", "Use the backlight in short bursts; enable its timeout if the meter has one"],
            ["New battery shows low quickly", "Carbon-zinc (heavy duty) or old-stock cell", "Read the label; measure the cell under load", "Use a fresh alkaline or an approved lithium cell"],
            ["Low-battery symbol in winter, fine indoors", "Cold reduces usable capacity", "Warm the meter and cell, then re-check", "Keep the meter in the cab or a pocket; consider lithium"],
            ["White crust or green snap; meter flickers", "Leaked cell or corroded contacts", "Open the battery door and inspect", "Replace the cell, clean contacts, replace a ruined snap"],
            ["Battery flat even though the meter was off", "Worn rotary switch or a soft power switch with standby draw", "Measure battery current with the dial on OFF (step 7)", "Repair the switch or contact the maker; replace an old budget meter"],
            ["Dies fast after a drop, spill or wrong-jack measurement", "Internal fault drawing current", "Measure on-current and compare with a twin meter or the manual", "Send for service; don't use it on live circuits meanwhile"],
          ]}
        />
      </section>

      <section>
        <h2 id="worked-example" className="text-xl font-semibold mb-3">Worked example: turning rated hours into weeks</h2>
        <p className="text-muted leading-7 mb-4">
          Take a Fluke 117 with its 400-hour rating. Divide the rated hours by the hours the meter is actually
          switched on each day to get the days a battery should last, then divide by seven for weeks. At 1
          hour a day, 400 ÷ 1 = 400 days, about 57 weeks. At 4 hours a day, 400 ÷ 4 = 100 days, about 14
          weeks. A full 8-hour shift with the meter on the whole time gives 400 ÷ 8 = 50 days, about 7 weeks.
          Left on around the clock, as happens when auto power-off is disabled and the dial stays on volts,
          it is 400 ÷ 24 ≈ 16.7 days, under 2½ weeks.
        </p>
        <BarChart
          items={[
            { label: "1 h a day", value: 57, display: "≈ 57 weeks" },
            { label: "4 h a day", value: 14.3, display: "≈ 14 weeks" },
            { label: "8 h a day", value: 7.1, display: "≈ 7 weeks" },
            { label: "Left on 24 h", value: 2.4, display: "≈ 2.4 weeks", highlight: true },
          ]}
        />
        <p className="text-muted leading-7 mt-4 text-sm">
          Calculated from Fluke&apos;s 400-hour rating for the 117 (backlight off). Not a measurement.
        </p>
        <p className="text-muted leading-7 mt-4">
          You can also run the sum backward to estimate what the meter draws. A 9 V alkaline typically holds
          somewhere around 500 mAh at light loads (makers&apos; datasheets vary). Spread over 400 hours, that is
          an average of roughly 500 ÷ 400 ≈ 1.25 mA. That is tiny, which is exactly why a meter left on for a
          weekend can quietly use 48 to 72 hours, an eighth or more of a 400-hour battery, with nobody
          touching it. If your battery died in under three weeks and you only used the meter for a few hours,
          something was drawing current while you weren&apos;t looking, and the steps below find it.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative: a fresh 9 V alkaline measured on a second meter usually reads above 9 V.</>}>
            <MeterReadout value="9.52" unit="V DC" mode="fresh 9 V cell" />
          </Figure>
          <Figure caption={<>Illustrative: the same type of cell near the end, where many meters show the low-battery symbol.</>}>
            <MeterReadout value="7.21" unit="V DC" mode="nearly flat cell" />
          </Figure>
        </div>
      </section>

      <section>
        <h2 id="where-current-goes" className="text-xl font-semibold mb-3">Where the battery current goes</h2>
        <p className="text-muted leading-7 mb-4">
          Inside a handheld meter, the battery feeds the rotary switch, then a regulator that powers the
          measuring chip and the LCD. Those draw a small, steady current any time the meter is awake, whichever
          function you pick. Everything else is extra: the backlight, the continuity beeper, a flashlight,
          illuminated input jacks, non-contact voltage detection and wireless radios on connected meters. Each
          extra can draw more than the measuring circuit itself while it runs. Two things stop the drain: the
          dial in the OFF position opens the circuit, and the auto power-off timer shuts the regulator down
          after a period with no input.
        </p>
        <Figure
          caption={
            <>
              Simplified power path of a handheld multimeter. The chip and display draw all the time the meter is
              awake; the extras draw only while they are in use. Exact architecture varies by model.
            </>
          }
        >
          <PowerPathDiagram />
        </Figure>
      </section>

      <KeyIdea title="Count on-hours, not days">
        A meter&apos;s battery rating is a budget of switched-on hours. Every hour spent awake on a bench or in a
        tool bag, measuring nothing, is spent from the same budget. Fix the habits that keep it awake and most
        &quot;fast-draining&quot; meters return to their rated life.
      </KeyIdea>

      <section>
        <p className="text-muted leading-7 mb-4">
          Work through the steps in this order. The first three cost nothing and solve the majority of cases;
          the last two need a second meter or a screwdriver.
        </p>
        <FlowDiagram
          steps={[
            { label: "Habits", sub: "OFF, APO, backlight" },
            { label: "The cell", sub: "Chemistry and cold" },
            { label: "Contacts", sub: "Leakage, corrosion" },
            { label: "Off-drain", sub: "Measure it" },
            { label: "Service", sub: "Internal fault" },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="step-off">Make OFF a habit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          On a rotary-dial meter, every position except OFF is on. Hold and range settings, the continuity
          position and the temperature setting all keep the chip and display running. It is easy to set a meter
          down on resistance after a job and walk away, and if the auto power-off doesn&apos;t trigger, the
          meter runs until the battery is gone. Make returning the dial to OFF part of putting the leads away.
          Many tool cases are molded so the meter only fits with the dial in one position; storing it that way
          helps.
        </p>
        <p className="text-muted leading-7">
          Watch the continuity and resistance settings in particular. With the leads clipped together, or
          resting on a metal part in a tool bag, continuity mode can sound the beeper for hours. The buzzer
          draws much more than the display, so that combination flattens a cell faster than any other idle
          state. Some meters that use a soft push-button for power instead of a dial can also draw a little in
          standby, which step 7 shows how to check.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="step-apo">Check auto power-off</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Most modern meters switch themselves off, or into a sleep state, after a period with no button press
          or dial movement. Timeouts in the tens of minutes are common, but the exact figure and whether it can
          be changed are model-specific, so check the manual. The catch is that many meters let you disable
          the feature by holding a button while turning the dial from OFF. People do this for long logging
          sessions and forget, and on some meters the setting persists. Others disable it automatically in
          Min/Max or recording modes, because a meter that sleeps mid-log loses the data.
        </p>
        <p className="text-muted leading-7">
          Test it: switch to DC volts, leave the meter untouched, and come back after an hour. If it is still
          awake, either the feature is off or the model doesn&apos;t have one. Turn it OFF and back on
          normally, without holding any buttons, and test again. If it still never sleeps, look up whether the
          model offers auto power-off at all. Older and very cheap meters often don&apos;t, and for those the
          dial habit in step 1 is the only protection.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="step-backlight">Ration the backlight and extras</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Fluke qualifies the 400-hour figures on the 115, 117 and 87V with &quot;without backlight&quot; for a
          reason: an LED backlight can draw several times what the display and measuring chip need. If you
          spend a lot of time in crawl spaces, panels or attics with the light on, expect a fraction of the
          rated life. On meters where the backlight times out, leave that timeout enabled. On meters where it
          stays on until pressed again, turn it off as soon as you have the reading.
        </p>
        <p className="text-muted leading-7">
          The same applies to built-in flashlights, illuminated jacks, NCV detectors left armed, and the radio
          on Bluetooth or Fluke Connect meters. A wireless meter streaming readings to a phone app all
          afternoon is doing real work. If a meter&apos;s battery life fell sharply after you started using one
          of these features, you have probably found the cause.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="step-cell">Use the right battery chemistry</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Battery chemistry makes a large difference with a 9 V. As rough, typical figures, a carbon-zinc
          (&quot;heavy duty&quot; or &quot;general purpose&quot;) 9 V holds a few hundred mAh, an alkaline
          around 500 mAh, and a lithium 9 V roughly 1,000 mAh or more. Exact numbers vary by maker and by
          load, so treat them as ratios: lithium can roughly double alkaline life, and carbon-zinc can cut it
          substantially. Carbon-zinc cells are what often come in the box with cheap meters and in multi-packs
          of generic batteries. Check the label; if it doesn&apos;t say alkaline or lithium, assume it is
          carbon-zinc.
        </p>
        <DataTable
          head={["9 V chemistry", "Typical capacity (approx.)", "Cold performance", "Leak risk", "Notes"]}
          rows={[
            ["Carbon-zinc", "A few hundred mAh", "Poor", "Higher", "Cheapest; often bundled with budget meters"],
            ["Alkaline", "≈ 500 mAh", "Fair", "Moderate, rises with age and once flat", "What most meter ratings assume"],
            ["Lithium (primary)", "≈ 1,000+ mAh", "Good", "Low", "Flat voltage curve; check the manual allows it"],
            ["NiMH rechargeable", "Usually below alkaline", "Fair", "Low", "Lower voltage; only if the maker approves"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Lithium cells have one quirk worth knowing: their voltage stays nearly flat until close to empty and
          then falls quickly. The low-battery warning may appear late, giving you less notice. Carry a spare.
          Old stock matters too: a cell that has sat in a drawer for years has lost part of its charge to
          self-discharge before it ever reaches the meter. Our guide to{" "}
          <Link href="/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load" className={link}>
            checking a 9V battery under load
          </Link>{" "}
          shows how to tell a good spare from a tired one.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="step-cold">Allow for cold</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Cold slows the chemistry inside a battery, so the cell delivers less of its stored energy and its
          voltage sags under load. An alkaline 9 V that worked fine in the shop can trigger the low-battery
          symbol in a freezing truck or on a winter rooftop and then recover once it warms up. That isn&apos;t
          drain in the true sense; most of the charge is still there. Keep the meter in the cab or an inside
          pocket between jobs, and if you work outdoors in winter, lithium cells cope much better with low
          temperatures.
        </p>
        <p className="text-muted leading-7">
          Check the meter&apos;s operating temperature range too. The Fluke 27 II, for instance, is specified to
          work from −15 °C and allows −40 °C for 20 minutes, which is unusually tolerant. Many budget meters
          specify 0 °C as the lower limit, below which both the battery and the LCD may misbehave.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="step-contacts">Inspect for leakage and corrosion</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Open the battery door. White or bluish crust on the cell, green corrosion on the snap or springs, or a
          sticky residue means a cell has leaked. Corroded contacts add resistance, so the meter sees a lower
          voltage than the cell really has and reports low battery early, or resets when the backlight or
          beeper switches on. A leak that reached the circuit board can also create a slow current path that
          keeps draining a new cell.
        </p>
        <p className="text-muted leading-7">
          Remove the cell with gloves on. Clean light corrosion with a cotton swab dampened with a little
          white vinegar or lemon juice (to neutralize alkaline residue), followed by isopropyl alcohol, and let it
          dry fully. A snap connector that is green through or has lost its grip should be replaced; it is a
          cheap part on most meters and a factory service job on sealed ones. If residue reached the board,
          stop and have the meter serviced. Our page on a{" "}
          <Link href="/multimeters/multimeter-wont-turn-on" className={link}>
            multimeter that won&apos;t turn on
          </Link>{" "}
          covers contact cleaning in more detail if the meter is already dead.
        </p>
      </section>

      <section>
        <StepHeading n={7} id="step-idle-drain">Test for drain with the meter off</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the battery goes flat even when the meter has been stored on OFF, measure what it draws. You
          need a second meter on its microamp or milliamp range, and the method is the same idea as{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            measuring parasitic drain on a car battery
          </Link>
          , scaled down. Unclip one terminal of the battery snap, and connect the second meter in series
          between that terminal and the cell, so all the current passes through it. With the meter under test
          on OFF, a healthy rotary-switch meter should show essentially zero. A reading in the microamps on a
          meter with a soft power button may be normal standby; anything you can read on a milliamp range
          with the dial on OFF is a fault.
        </p>
        <p className="text-muted leading-7 mb-4">
          Then turn the meter on and note the on-current, which lets you check the arithmetic from the worked
          example. Divide the cell&apos;s approximate capacity by that current to estimate hours. If the result
          is far below the published figure with the backlight off, something inside is drawing more than it
          should. Typical causes are a rotary switch with worn or dirty wipers that leave a circuit partly
          connected between positions, moisture or residue on the board, or damage from a drop or from
          measuring voltage with a lead in the current jack. If you are new to series current measurements,
          start with our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            guide to using a multimeter
          </Link>
          , and keep the second meter&apos;s red lead in the correct current jack.
        </p>
        <p className="text-muted leading-7">
          A meter with an internal fault isn&apos;t one to trust on live circuits. A switch fault that drains the
          battery can also affect the function selection, and a weak supply rail can make readings drift, a
          problem covered in{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>
          . Branded meters under warranty should go back to the maker; for an old budget meter, replacement
          usually makes more sense than repair.
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters with long published battery life</h2>
        <p className="text-muted leading-7 mb-4">
          If battery life is a recurring headache, choose a meter with a published rating and a power source
          that suits your work. AA-powered meters suit people who leave a meter on for long stretches;
          9 V meters with a 400-hour rating are fine for most trade use if the dial goes back to OFF. These come
          from our verified multimeter list.
        </p>
        <ProductStrip
          title="Multimeters with long rated battery life"
          items={[
            {
              name: "Fluke 87V MAX",
              image: fluke87vmax.image,
              alt: "Fluke 87V MAX IP67 True RMS multimeter",
              href: "/multimeters/fluke-87v-vs-fluke-87v-max",
              note: "About 800 hours on three AA cells, per Fluke. IP67, 4 m drop rating, CAT IV 600V / CAT III 1000V.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's True RMS multimeter",
              href: "/multimeters/fluke-117-review",
              note: "About 400 hours on one 9 V alkaline without backlight, per Fluke. CAT III 600V, LoZ and VoltAlert. Hands-on Tested.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS field multimeter",
              href: "/multimeters/fluke-115-review",
              note: "About 400 hours on one 9 V alkaline without backlight, per Fluke. CAT III 600V general-purpose meter. Hands-on Tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
