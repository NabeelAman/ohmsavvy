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
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Multimeter won't turn on? Work through the 7 usual causes, from a flat or reversed battery and corroded contacts to auto power-off, and know when to replace it.";

export const metadata = buildMetadata({
  title: "Multimeter Won't Turn On? 7 Causes and Fixes",
  description,
  path: "/multimeters/multimeter-wont-turn-on",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const uniT = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** The power path inside a typical handheld meter, with the usual failure points marked. */
function PowerPathDiagram() {
  return (
    <svg
      viewBox="0 0 520 210"
      className="w-full h-auto"
      role="img"
      aria-label="Power path inside a multimeter: battery, battery contacts, rotary switch, voltage regulator and display, with the common failure point at each stage marked"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* battery */}
        <rect x="14" y="60" width="70" height="44" rx="5" className="stroke-foreground" strokeWidth="1.8" />
        <rect x="30" y="52" width="12" height="8" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.2" />
        <rect x="56" y="52" width="12" height="8" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.2" />
        {/* contacts */}
        <rect x="112" y="68" width="62" height="28" rx="4" className="stroke-foreground" strokeWidth="1.6" />
        {/* rotary switch */}
        <circle cx="236" cy="82" r="26" className="stroke-foreground" strokeWidth="1.6" />
        <path d="M236 82 L254 66" className="stroke-foreground" strokeWidth="2.4" />
        {/* regulator */}
        <rect x="294" y="66" width="76" height="32" rx="4" className="stroke-foreground" strokeWidth="1.6" />
        {/* display */}
        <rect x="402" y="56" width="104" height="52" rx="5" className="stroke-foreground" strokeWidth="1.8" />
        <rect x="412" y="66" width="84" height="32" rx="2" className="fill-[#c9d8c2] stroke-foreground" strokeWidth="1" />
        {/* wires */}
        <path d="M84 82 H112" className="stroke-foreground" strokeWidth="1.6" />
        <path d="M174 82 H210" className="stroke-foreground" strokeWidth="1.6" />
        <path d="M262 82 H294" className="stroke-foreground" strokeWidth="1.6" />
        <path d="M370 82 H402" className="stroke-foreground" strokeWidth="1.6" />
        {/* failure markers */}
        <path d="M49 116 V136" stroke="#d13b3b" strokeWidth="1.6" />
        <path d="M143 104 V136" stroke="#d13b3b" strokeWidth="1.6" />
        <path d="M236 114 V136" stroke="#d13b3b" strokeWidth="1.6" />
        <path d="M332 104 V136" stroke="#d13b3b" strokeWidth="1.6" />
        <path d="M454 114 V136" stroke="#d13b3b" strokeWidth="1.6" />
      </g>
      <text x="36" y="86" fontSize="11" className="fill-foreground">+</text>
      <text x="59" y="86" fontSize="11" className="fill-foreground">−</text>
      <text x="49" y="40" fontSize="11" textAnchor="middle" className="fill-foreground">battery</text>
      <text x="143" y="58" fontSize="11" textAnchor="middle" className="fill-foreground">contacts</text>
      <text x="236" y="46" fontSize="11" textAnchor="middle" className="fill-foreground">dial</text>
      <text x="332" y="58" fontSize="11" textAnchor="middle" className="fill-foreground">regulator</text>
      <text x="454" y="46" fontSize="11" textAnchor="middle" className="fill-foreground">LCD</text>
      <text x="454" y="87" fontSize="12" textAnchor="middle" className="fill-foreground" fontFamily="monospace">0.000</text>
      <text x="49" y="152" fontSize="10" textAnchor="middle" className="fill-muted">flat or</text>
      <text x="49" y="165" fontSize="10" textAnchor="middle" className="fill-muted">reversed</text>
      <text x="143" y="152" fontSize="10" textAnchor="middle" className="fill-muted">corroded or</text>
      <text x="143" y="165" fontSize="10" textAnchor="middle" className="fill-muted">bent springs</text>
      <text x="236" y="152" fontSize="10" textAnchor="middle" className="fill-muted">between detents,</text>
      <text x="236" y="165" fontSize="10" textAnchor="middle" className="fill-muted">dirty wipers</text>
      <text x="332" y="152" fontSize="10" textAnchor="middle" className="fill-muted">internal fault</text>
      <text x="332" y="165" fontSize="10" textAnchor="middle" className="fill-muted">(water, impact)</text>
      <text x="454" y="152" fontSize="10" textAnchor="middle" className="fill-muted">cracked LCD or</text>
      <text x="454" y="165" fontSize="10" textAnchor="middle" className="fill-muted">loose ribbon</text>
      <text x="260" y="196" fontSize="10" textAnchor="middle" className="fill-muted">
        The input fuses sit on the current jacks, not on this path, on most meters
      </text>
    </svg>
  );
}

export default function MultimeterWontTurnOnPage() {
  return (
    <HowToShell
      title="Multimeter Won't Turn On? 7 Common Causes and Fixes"
      description={description}
      path="/multimeters/multimeter-wont-turn-on"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A multimeter that won&apos;t turn on almost always has a battery problem: a flat cell, a cell fitted
          backward, or green corrosion on the contacts that stops current reaching the circuit. Measure the
          battery, clean the contacts and turn the dial firmly to a function, and most dead meters come back.
          If they don&apos;t, the cause is usually auto power-off, a dial resting between positions, or damage
          inside the case. This guide traces the power path from the battery to the display so you can find
          which link has broken, and tells you when it is time to stop and replace the meter.
        </>
      }
      aside={{
        image: uniT.image,
        alt: "UNI-T UT139C digital multimeter",
        caption: (
          <>
            A dead display is rarely a dead meter. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "The 7 causes at a glance" },
        { id: "power-path", label: "How a meter powers up" },
        { id: "step-battery", label: "1. Measure the battery" },
        { id: "step-polarity", label: "2. Check polarity and the battery type" },
        { id: "step-contacts", label: "3. Clean the contacts" },
        { id: "step-dial", label: "4. Rule out the dial and auto power-off" },
        { id: "step-door", label: "5. Check the battery door and fuses" },
        { id: "step-leads", label: "6. Separate 'off' from 'on but reads nothing'" },
        { id: "step-damage", label: "7. Look for water or impact damage" },
        { id: "replace", label: "When to replace it" },
      ]}
      faq={[
        {
          q: "Why did my multimeter stop working after I measured current?",
          a: "The display usually still works; what fails is the current fuse inside the meter. A fuse protects the mA or 10A jack, so after an overload the meter powers on but reads zero or nothing on current ranges. If the screen is completely blank as well, look at the battery first, since a blown current fuse does not normally stop most meters powering up.",
        },
        {
          q: "Can a multimeter turn on with a dead battery?",
          a: "Sometimes it flickers on and off, or shows a few faint segments that fade, because a depleted battery can manage the light current the display needs but collapses when the meter draws more. Many meters show a battery symbol before that point. A weak battery is also a common cause of wrong readings, so replace it as soon as the warning appears.",
        },
        {
          q: "How do I stop my multimeter from turning itself off?",
          a: "Most handheld meters have auto power-off to save the battery, and it typically trips after a period of no button presses or dial changes. On many models you can disable it by holding a particular button while you turn the meter on; the button differs from maker to maker, so the user manual is the place to find it.",
        },
        {
          q: "Is it worth repairing a cheap multimeter that won't turn on?",
          a: "Cleaning the battery contacts or replacing the battery costs almost nothing and is always worth trying. Beyond that, a budget meter with water damage, a cracked board or a failed display usually costs less to replace than to repair. Weigh the cost against a new meter, and never put a repaired meter back into mains work unless you trust its insulation and fuses completely.",
        },
        {
          q: "Will a rechargeable 9V battery work in a multimeter?",
          a: "It often will, but many rechargeable 9V cells sit at a lower voltage than a fresh alkaline. NiMH types are commonly rated around 8.4V, and some older ones around 7.2V, which can bring up the low-battery symbol early or trip it straight away. Check the manual for the recommended battery type and expect shorter run time between charges.",
        },
        {
          q: "Why does my multimeter display come on but stay blank or show random segments?",
          a: "That pattern points at the display stage rather than the battery: a loose or dirty zebra strip between the LCD and the board, a cracked LCD after a drop, or moisture inside the case. A very weak battery can also produce faint, partial segments. Swap in a fresh battery first; if the fault stays, the meter needs a repair or a replacement.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-tell-if-multimeter-test-leads-are-bad",
          title: "How to Tell If Multimeter Test Leads Are Bad",
          desc: "The meter is on but reads nothing: test the leads next.",
        },
        {
          href: "/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load",
          title: "How to Check a 9V Battery Under Load",
          desc: "Why a 9V that reads fine unloaded can still fail in use.",
        },
      ]}
    >
      <section id="causes">
        <h2 className="text-xl font-semibold mb-3">The 7 causes at a glance</h2>
        <p className="text-muted leading-7 mb-4">
          Work down this table from the top. The order follows how often each cause turns out to be the
          culprit and how cheap it is to check, so the first two rows fix the large majority of meters that
          appear dead.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix"]}
          rows={[
            ["Completely blank, nothing at all", "Flat or weak battery", "Measure it with a second meter or a battery tester", "Fit a fresh battery of the type in the manual"],
            ["Blank right after a battery change", "Battery fitted backward", "Compare the + and − marks in the compartment", "Refit the cells the right way round"],
            ["Blank, or works only when pressed", "Corroded or bent contacts", "Look for white or green crust and flattened springs", "Clean with isopropyl alcohol; bend springs back"],
            ["Turns off by itself, or on only in some positions", "Auto power-off, or dial between detents", "Turn the dial fully to a function and wait", "Disable auto power-off per the manual; exercise the dial"],
            ["Blank with the battery door slightly open", "Door not latched, or an interlock (some models)", "Close the door fully, check the manual for an interlock", "Seat the door and screws; replace a fuse if the manual says it gates power"],
            ["On, but reads nothing or OL with probes shorted", "Bad test leads (not a power fault)", "Short the probes on ohms", "Test and replace the leads"],
            ["Blank or garbled after a drop or a soaking", "Water or impact damage inside", "Open the case and look for corrosion or cracks", "Dry it out, or replace the meter"],
          ]}
        />
      </section>

      <section id="power-path">
        <h2 className="text-xl font-semibold mb-3">How a meter powers up</h2>
        <p className="text-muted leading-7 mb-4">
          Every handheld digital meter follows the same chain. Current leaves the battery, passes through the
          spring contacts, reaches the rotary switch (which is also the on/off switch on most meters), feeds
          a small regulator that holds the measuring chip at a steady voltage, and finally lights the LCD.
          A meter that is &quot;dead&quot; has a break somewhere in that chain. Testing in order from the
          battery outward means you never take a meter apart to find a problem that a fresh battery would
          have solved.
        </p>
        <Figure caption="The power path inside a typical handheld meter. A red marker shows the failure most often found at each stage. The input fuses protect the current jacks and sit outside this path on most meters.">
          <PowerPathDiagram />
        </Figure>
        <FlowDiagram
          steps={[
            { label: "Battery", sub: "Voltage and polarity" },
            { label: "Contacts", sub: "Clean, springy, tight" },
            { label: "Dial", sub: "Seated on a function" },
            { label: "Inside", sub: "Regulator, board, LCD" },
          ]}
        />
      </section>

      <section id="step-battery">
        <StepHeading n={1}>Measure the battery</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Pull the battery and measure it on DC volts with a second meter, or use a cheap battery tester. A
          voltage reading is far better than guessing from the date on the pack, because a battery left in a
          meter with the dial on a function drains quietly for weeks. The figures below are typical for
          alkaline cells; exact thresholds vary by maker, so treat them as a guide and check the manual for
          your meter&apos;s battery warning point.
        </p>
        <Figure caption="Typical open-circuit voltages for a 9V alkaline battery. Many meters show a low-battery symbol somewhere around 7 to 7.5V; by about 6V most will be unreliable or blank. Values are typical, not a specification.">
          <BarChart
            items={[
              { label: "Fresh 9V alkaline", value: 9.5, display: "≈ 9.5 V", highlight: true },
              { label: "Nominal rating", value: 9, display: "9.0 V" },
              { label: "Low-battery symbol (many meters)", value: 7.2, display: "≈ 7–7.5 V" },
              { label: "Depleted", value: 6, display: "≈ 6 V" },
            ]}
          />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Battery", "Fresh (typical)", "Worth replacing", "Dead (typical)"]}
            rows={[
              ["9V alkaline", "9.3–9.6 V", "below about 7.5 V", "about 6 V or less"],
              ["AA or AAA alkaline (per cell)", "1.5–1.6 V", "below about 1.2 V", "about 1.0 V or less"],
              ["Two AA cells in series", "3.0–3.2 V", "below about 2.4 V", "about 2.0 V or less"],
            ]}
            mono={[1, 2, 3]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          One trap: a tired battery can read close to normal with nothing connected and then sag the moment
          a load is applied. If a battery reads borderline, replace it anyway; it costs less than the time
          spent doubting it. Our guide to{" "}
          <Link href="/multimeters/how-to-check-a-9v-battery-with-a-multimeter-under-load" className={link}>
            checking a 9V battery under load
          </Link>{" "}
          shows how to see that sag for yourself.
        </p>
        <Figure caption="Illustrative readings from a second meter: a fresh 9V cell (left) and one too flat to run most meters (right).">
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="9.52" unit="V" mode="DC" />
            <MeterReadout value="6.04" unit="V" mode="DC" />
          </div>
        </Figure>
      </section>

      <section id="step-polarity">
        <StepHeading n={2}>Check polarity and the battery type</StepHeading>
        <p className="text-muted leading-7">
          A 9V snap connector only fits one way, but meters that take AA or AAA cells are easy to load
          backward, especially in a dim workshop. One reversed cell in a pair cancels the other, so the meter
          sees close to zero volts and stays dark. Match each cell to the + and − marks molded into the
          compartment. Many meters have protection against reversed polarity, but not all, so don&apos;t leave
          a reversed battery in place to see what happens. Battery chemistry matters too: rechargeable 9V
          cells often sit well below a fresh alkaline, and a meter that sets its low-battery warning around
          7 to 7.5V may complain about them from the start. If a meter only fails with rechargeables, that
          is the reason.
        </p>
      </section>

      <section id="step-contacts">
        <StepHeading n={3}>Clean the contacts</StepHeading>
        <p className="text-muted leading-7">
          Alkaline cells left in a meter for a year or two can leak potassium hydroxide, which dries into a
          white or blue-green crust on the springs. Even a thin oxidized film is enough to stop a meter that
          draws only a few milliamps. Remove the battery, scrub the contacts with a cotton swab dampened with
          isopropyl alcohol, and scrape stubborn deposits gently with a fiberglass pen or a small flat
          screwdriver. Let everything dry. If a spring has been flattened, lift it slightly with a
          screwdriver so it presses firmly against the cell. On a 9V snap, squeeze the female socket a
          little with pliers if it slips on and off the battery without resistance. If the meter now works
          only when you press on the battery door, the contacts still need attention.
        </p>
      </section>

      <section id="step-dial">
        <StepHeading n={4}>Rule out the dial and auto power-off</StepHeading>
        <p className="text-muted leading-7">
          On most meters the rotary dial is the power switch, and the gap between two detents can be a dead
          zone. Turn the dial firmly until it clicks into a function such as DC volts. If the display comes
          on only in some positions, the wiper contacts under the dial may be dirty; turning the dial through
          all positions a dozen times with the battery out often clears it. Then think about auto power-off.
          Most handheld meters switch themselves off after a period with no button presses or dial changes,
          and some models will not come back until you turn the dial to OFF and on again. A button that is
          stuck down, or one held while you switch on, can also put some meters into a setup or test mode
          that looks wrong. Release every button, cycle the dial through OFF, and try once more. The manual
          will tell you which button disables auto power-off on your model.
        </p>
      </section>

      <section id="step-door">
        <StepHeading n={5}>Check the battery door and fuses</StepHeading>
        <p className="text-muted leading-7">
          Some meters carry the battery contacts on the door itself, so a door that isn&apos;t pushed home
          or screwed down leaves the circuit open. Seat it fully and refit any screws. Fuses are where a lot
          of advice goes wrong. On most meters the fuses sit only in the mA and 10A current inputs, where
          they protect the meter when you measure current on the wrong range. A blown fuse there shows up as
          a meter that powers on normally but reads zero or nothing on current, not as a blank screen. That
          said, designs differ, and the manuals for some models describe a fuse door or battery door
          arranged so the meter cannot be used with it open. If your meter&apos;s manual says that, replace
          the fuse with the exact type it specifies, including the voltage and breaking-capacity rating,
          since a cheap glass fuse in a meter is a real safety risk on mains.
        </p>
      </section>

      <Callout title="Fix the meter before you trust it on live circuits">
        A meter that flickers, resets or shows a low-battery symbol can display a voltage lower than the one
        that is really there, which is the worst possible error on a live circuit. Do not use it to confirm
        that mains wiring is dead until it powers up reliably on a fresh battery. Use leads with intact
        insulation and a CAT rating that matches the work: a meter or lead rated only CAT II should not be
        used in a service panel, and damaged leads should never go near mains. If a meter has been dropped
        hard or soaked, retire it from electrical work. For anything at the panel you aren&apos;t sure of,
        call a licensed electrician.
      </Callout>

      <section id="step-leads">
        <StepHeading n={6}>Separate &quot;off&quot; from &quot;on but reads nothing&quot;</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Test leads cannot stop a meter turning on, because they are not part of the power path at all. What
          bad leads do cause is a meter that lights up but reads nothing: zero volts on a known live outlet,
          or OL in ohms with the probe tips pressed together. If your display works, short the probes on the
          ohms range. A healthy pair typically reads a few tenths of an ohm. OL means the problem is in the
          leads or the jacks, not the power supply, and our guide on{" "}
          <Link href="/multimeters/how-to-tell-if-multimeter-test-leads-are-bad" className={link}>
            how to tell if multimeter test leads are bad
          </Link>{" "}
          walks through finding the break. If the leads pass and readings still look odd, see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          or{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-the-wrong-voltage" className={link}>
            why a multimeter shows the wrong voltage
          </Link>
          .
        </p>
        <Figure caption="Illustrative: a meter that is on, with probes shorted on ohms. Good leads (left) read near zero; an open lead (right) reads OL even though the meter itself is fine.">
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="0.3" unit="Ω" mode="RESISTANCE" />
            <MeterReadout value="OL" unit="Ω" mode="RESISTANCE" />
          </div>
        </Figure>
      </section>

      <section id="step-damage">
        <StepHeading n={7}>Look for water or impact damage</StepHeading>
        <p className="text-muted leading-7">
          If a fresh battery, clean contacts and a seated dial still give nothing, the fault is inside. A
          meter that has been dropped can crack its circuit board, unseat the rubbery zebra strip that
          connects the LCD to the board, or break the LCD glass, which often shows as partial or random
          segments rather than a blank screen. Water does slower damage: corrosion grows across the board
          around the regulator and the switch contacts. If you are comfortable opening the case, remove the
          battery first, look for green or white deposits and cracks, and dry a wet meter for a couple of
          days in a warm, dry place before trying it again. Don&apos;t open a meter that is still under
          warranty; the maker may refuse a claim afterward.
        </p>
      </section>

      <section id="replace">
        <h2 className="text-xl font-semibold mb-3">When to stop and replace it</h2>
        <p className="text-muted leading-7">
          Stop troubleshooting when the cheap fixes are done and the meter still won&apos;t power up
          reliably, when the case is cracked anywhere near the input jacks, or when there is corrosion on the
          board. Contact the maker if the meter is under warranty; premium brands usually offer repair or
          calibration service, which can make sense for an expensive meter. A budget meter is normally
          cheaper to replace. Whichever way you go, a meter used on household circuits should carry a CAT
          rating suited to the work, and our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            guide to using a multimeter
          </Link>{" "}
          and the{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols explained
          </Link>{" "}
          page cover what to look for on the dial once you have a working meter again. If your meter turns
          on but the numbers drift, the{" "}
          <Link href="/multimeters/unstable-multimeter-readings" className={link}>
            unstable multimeter readings
          </Link>{" "}
          guide picks up from here.
        </p>
      </section>

      <section>
        <KeyIdea title="Work from the battery outward">
          A dead meter is a broken chain: battery, contacts, dial, then the board. Check them in that order.
          Leads and input fuses sit outside that chain on most meters, so they explain a meter that is on but
          reading nothing, not one that won&apos;t turn on.
        </KeyIdea>
      </section>

      <ProductStrip
        title="If it is time for a new meter"
        items={[
          { name: uniT.name, image: uniT.image, alt: "UNI-T UT139C multimeter", href: "/multimeters/uni-t-ut139c-review", note: "True RMS, 6,000-count display, auto and manual ranging, CAT III 600V." },
          { name: kaiweets.name, image: kaiweets.image, alt: "KAIWEETS KM200s multimeter", href: "/multimeters/kaiweets-km200s-review", note: "Auto-ranging True RMS with a backlit display; CAT II 600V, so not for panel work." },
          { name: fluke117.name, image: fluke117.image, alt: "Fluke 117 multimeter", href: "/multimeters/fluke-117-review", note: "True RMS, CAT III 600V and built-in NCV, durable enough for daily field use." },
        ]}
      />
    </HowToShell>
  );
}
