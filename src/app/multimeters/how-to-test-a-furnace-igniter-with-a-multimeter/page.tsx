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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const fluke116 = all.find((p) => p.name === "Fluke 116")!;
const fluke179 = all.find((p) => p.name === "Fluke 179")!;
const ut139c = all.find((p) => p.name === "UNI-T UT139C")!;

const description =
  "Test a furnace hot surface igniter with a multimeter: cold resistance for silicon carbide and silicon nitride types, the voltage check, and when it's the board.";

export const metadata = buildMetadata({
  title: "How to Test a Furnace Igniter With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-furnace-igniter-with-a-multimeter",
  image: fluke179.image,
});

const link = "text-accent hover:underline";

/** Hot surface igniter on its two-wire plug, with the meter across the igniter side of the connector. */
function IgniterDiagram() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="A furnace hot surface igniter with its ceramic base and two wires running to a plug. The plug is disconnected from the furnace harness and the multimeter, set to ohms, measures across the two pins on the igniter side. A cracked or burned-out element reads open, shown as OL."
    >
      {/* element */}
      <path d="M40 40 H90 V60 H52 V80 H90 V100 H52 V120 H90 V140 H40 Z" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="110" y="62" fontSize="9" className="fill-muted">heating element</text>
      <text x="110" y="75" fontSize="9" className="fill-muted">(carbide or nitride)</text>
      <circle cx="74" cy="110" r="5" className="fill-accent" opacity="0.5" />
      <text x="110" y="113" fontSize="8" className="fill-accent">white spot or crack = failure point</text>
      {/* base */}
      <rect x="32" y="140" width="66" height="20" rx="3" className="fill-muted" opacity="0.6" />
      <text x="65" y="154" fontSize="8" textAnchor="middle" className="fill-foreground">ceramic base</text>
      {/* wires */}
      <path d="M50 160 V180 H200" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      <path d="M80 160 V172 H200" className="stroke-foreground" strokeWidth="1.5" fill="none" />
      {/* plug */}
      <rect x="200" y="164" width="26" height="24" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.6" />
      <text x="213" y="160" fontSize="8" textAnchor="middle" className="fill-muted">plug</text>
      <text x="270" y="196" fontSize="8" textAnchor="middle" className="fill-muted">harness unplugged</text>
      {/* meter */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M226 170 H262 V120" />
        <path d="M226 182 H300 V120" />
      </g>
      <rect x="250" y="70" width="70" height="50" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="285" y="92" fontSize="12" fontWeight="700" textAnchor="middle" className="fill-accent">Ω</text>
      <text x="285" y="108" fontSize="8" textAnchor="middle" className="fill-muted">cold resistance</text>
      <text x="200" y="24" fontSize="9" className="fill-muted">Measure only with the power off</text>
      <text x="200" y="37" fontSize="9" className="fill-muted">and the igniter at room temperature.</text>
    </svg>
  );
}

export default function HowToTestAFurnaceIgniterWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Furnace Igniter With a Multimeter"
      description={description}
      published="2026-11-22"
      path="/multimeters/how-to-test-a-furnace-igniter-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a furnace igniter with a multimeter, turn off power, unplug the hot surface igniter, and measure its
          resistance across the two pins of its plug with the meter on ohms. A good igniter reads a definite resistance,
          typically in the tens of ohms for older silicon carbide types and lower for silicon nitride types, while a
          cracked or burned-out one reads OL (open). If the resistance is fine but the igniter never glows, check for
          about 120 V AC at its plug during the ignition sequence: no voltage points upstream to the control board,
          pressure switch or limit, not to the igniter.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 True RMS multimeter for furnace igniter resistance and voltage checks",
        caption: (
          <>
            A 6,000-count meter with a backlight, such as the Fluke 179, reads igniter ohms to a tenth and handles the
            120 V check inside a dark cabinet. See our{" "}
            <Link href="/multimeters/fluke-179-review" className={link}>
              Fluke 179 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "How a hot surface igniter works" },
        { id: "sequence", label: "Where the igniter fits in the sequence" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "power-off", label: "1. Power off and find the igniter" },
        { id: "inspect", label: "2. Inspect the element" },
        { id: "ohms", label: "3. Measure cold resistance" },
        { id: "voltage", label: "4. Check voltage at the plug" },
        { id: "upstream", label: "5. No voltage? Trace upstream" },
        { id: "replace", label: "6. Replace it correctly" },
        { id: "resistance-table", label: "Igniter resistance by type" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a furnace igniter read on a multimeter?",
          a: "It depends on the igniter material. Older silicon carbide hot surface igniters commonly read somewhere around 40 to 90 ohms at room temperature, and silicon nitride igniters commonly read lower, often roughly 10 to 20 ohms. The igniter maker or furnace manual gives the exact range for your part. What matters most is a steady, finite reading; OL means the element is open and the igniter is dead.",
        },
        {
          q: "Can a furnace igniter test good but still be bad?",
          a: "Yes, occasionally. A hairline crack can close up at room temperature and open when the element heats and expands, so the igniter reads normal on the bench but glows only partly, or not at all, in use. An igniter whose resistance has drifted far above its rated range may also glow too weakly to light the gas. Watch it through the sight glass during a cycle to be sure.",
        },
        {
          q: "How do I know if my furnace igniter or control board is bad?",
          a: "Measure the igniter's cold resistance first. If it reads open, the igniter is bad. If it reads within range, check AC volts at the igniter plug when the board should be powering it, right after the inducer starts and the pressure switch closes. Around 120 V there and no glow means the igniter; no voltage at all means look upstream at the board, pressure switch and limits.",
        },
        {
          q: "How long should a furnace igniter glow before the gas comes on?",
          a: "Each control board has its own warm-up period, commonly somewhere between about 15 and 45 seconds, after which it opens the gas valve. The igniter should glow bright orange-yellow along its whole length by then. If the gas valve clicks open but the burners don't light, and the igniter looks dim or patchy, the element is weak even if its resistance looks close to normal.",
        },
        {
          q: "Why did my new furnace igniter fail so quickly?",
          a: "The usual causes are skin oil from handling the element, which creates a hot spot, a cracked element from being bumped during installation, or the wrong igniter for the board, such as a different voltage or material. High line voltage can also shorten life. Hold new igniters by the ceramic base only, use the part number the furnace maker lists, and check supply voltage if failures repeat.",
        },
        {
          q: "Is it safe to replace a furnace igniter myself?",
          a: "On most furnaces it's a two-screw, one-plug job once power and gas are off, and many homeowners do it. The risk is in handling: the element is brittle and the replacement must match. If the furnace still won't light with a good igniter and correct voltage, or you smell gas at any point, stop and call a licensed HVAC technician or your gas utility.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-flame-sensor-with-a-multimeter",
          title: "How to Test a Flame Sensor With a Multimeter",
          desc: "If the burners light and then shut off, the flame sensor is the next part to test.",
        },
        {
          href: "/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter",
          title: "How to Measure Resistance of a Heating Element",
          desc: "The general Ohm's-law method for any resistive heater, with worked wattage examples.",
        },
      ]}
    >
      <Callout title="Furnace safety before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Turn the furnace off at its service switch or breaker before unplugging or measuring the igniter. The igniter
            circuit runs at line voltage, usually 120 V AC.
          </li>
          <li>
            If you smell gas, don&apos;t operate anything electrical. Get everyone out and call the gas utility or 911
            from outside.
          </li>
          <li>
            A hot surface igniter reaches well over 1,000 °F and stays hot after the cycle ends. Let it cool before you
            touch the bracket or plug.
          </li>
          <li>
            Live voltage checks mean working inside a running appliance. If you aren&apos;t comfortable doing that with
            probes rated CAT II or better, leave step 4 to an HVAC technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">
          How a hot surface igniter works
        </h2>
        <p className="text-muted leading-7 mb-4">
          Most gas furnaces built in recent decades light the burners with a hot surface igniter instead of a standing
          pilot. It is a ceramic element, either silicon carbide (the older, flat zig-zag style, often dark gray and
          quite fragile) or silicon nitride (a newer, tougher style, often a slim rod or paddle), mounted on a ceramic
          base with two wires. When the control board applies voltage, current heats the element until it glows; the
          board then opens the gas valve and the glowing surface ignites the gas.
        </p>
        <p className="text-muted leading-7">
          Because the igniter is a simple resistor, a meter can check it the same way it checks any heater: a finite
          resistance means the current path is intact, and OL means it has broken. The catch is that the element&apos;s
          resistance changes a lot as it heats, so the number you measure cold is a pass/fail check against the
          maker&apos;s cold range, not a way to work out its running current.
        </p>
        <Figure caption={<>Where to measure: across the two pins on the igniter side of its plug, harness disconnected, power off.</>}>
          <IgniterDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="sequence" className="text-xl font-semibold mb-3">Where the igniter fits in the furnace sequence</h2>
        <p className="text-muted leading-7 mb-4">
          A typical induced-draft furnace runs the same steps every time it calls for heat. The igniter only gets power
          after the earlier steps succeed, which is why a furnace that never glows doesn&apos;t always have a bad
          igniter. Exact timings vary by board.
        </p>
        <FlowDiagram
          steps={[
            { label: "Call for heat", sub: "24 V on W" },
            { label: "Inducer starts", sub: "clears flue" },
            { label: "Pressure switch", sub: "closes" },
            { label: "Igniter warms", sub: "about 15–45 s" },
            { label: "Gas valve opens", sub: "burners light" },
            { label: "Flame proved", sub: "flame sensor" },
          ]}
        />
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Inducer runs, igniter never glows", "Open igniter element", "Cold resistance reads OL (step 3)", "Replace igniter"],
            ["Igniter good, still no glow", "No voltage from board", "AC volts at plug during trial (step 4)", "Trace pressure switch, limit, board"],
            ["Glows dim or only in patches", "Aged or cracked element", "Resistance high vs spec; watch glow", "Replace igniter"],
            ["Glows, gas valve never clicks", "Board or gas valve circuit", "Board fault code; 24 V at gas valve", "HVAC technician"],
            ["Lights, shuts off in seconds", "Flame not proved, not the igniter", "Flame sensor microamps", "Clean or replace flame sensor"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="power-off">Power off and find the igniter</StepHeading>
        <p className="text-muted leading-7">
          Turn off the furnace switch (it often looks like a light switch on or near the cabinet) and remove the front
          panels; on most furnaces the upper panel covers the burners. Many boards show a status code through a small
          window, so note any blinking pattern before you switch off and compare it with the chart on the panel. The
          igniter sits at one end of the burner row, held by a bracket with one or two screws. Follow its two wires to a
          plug, often white or black, and disconnect it. Don&apos;t remove the igniter yet if you can test it in place.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inspect">Inspect the element without touching it</StepHeading>
        <p className="text-muted leading-7">
          Use a flashlight to look at the ceramic. A visible crack, a chip, or a white or bleached spot on a silicon
          carbide element is the classic failure point; the element burns through there and goes open. Don&apos;t touch
          the element with your fingers, as skin oils create hot spots that shorten its life. If it is obviously cracked
          you can skip straight to replacement, though the resistance test still confirms it in seconds.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="ohms">Measure the igniter&apos;s cold resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to ohms and touch the leads together first; most meters read a few tenths of an ohm, which you
          subtract from small readings. Then put one probe in each pin of the igniter side of the plug. A healthy
          silicon carbide igniter commonly reads in the range of about 40 to 90 Ω and a silicon nitride igniter commonly
          reads about 10 to 20 Ω, but go by the part&apos;s label or the furnace manual. Wiggle the wires at the base as
          you watch the reading; a number that flickers to OL points to a break where the lead enters the ceramic.
        </p>
        <Figure caption={<>Illustrative cold reading from a silicon carbide igniter that is within its typical range.</>}>
          <MeterReadout value="58.4" unit="Ω" mode="Ω  across igniter plug" />
        </Figure>
        <Figure caption={<>Illustrative cold resistance of three igniters compared with typical ranges. An open element reads OL, shown here as a full bar.</>}>
          <BarChart
            items={[
              { label: "Silicon carbide, good", value: 58, display: "58 Ω" },
              { label: "Silicon nitride, good", value: 14, display: "14 Ω" },
              { label: "Carbide, aged", value: 140, display: "140 Ω", highlight: true },
              { label: "Cracked element", value: 200, display: "OL (open)", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A reading far above the rated range, like the 140 Ω example, means the element has aged and may not reach
          ignition temperature even though it isn&apos;t yet open. Ohm&apos;s law shows why: at the same 120 V, an
          element at 140 Ω instead of 58 Ω passes well under half the current when cold (120 ÷ 140 ≈ 0.86 A against
          120 ÷ 58 ≈ 2.1 A), so it heats more slowly and may never get hot enough before the board opens the gas valve.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="voltage">Check voltage at the igniter plug</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If the igniter reads within range, confirm it&apos;s getting power. Reconnect nothing yet: set the meter to AC
          volts and, with the furnace still off, put the probes into the harness side of the plug (back-probing or with
          thin probe tips). Restore power and call for heat, keeping hands clear. After the inducer starts and the
          pressure switch closes, the board should put roughly line voltage, around 120 V on most furnaces, on the
          igniter leads for its warm-up period. Some newer systems use lower-voltage igniters; the label or wiring
          diagram tells you which you have.
        </p>
        <KeyIdea title="Ohms tests the part, volts tests the system">
          A good resistance reading proves only the igniter. Voltage at the plug proves the board, pressure switch and
          limits all agreed to start ignition. You need both before buying a part.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={5} id="upstream">No voltage? Trace the problem upstream</StepHeading>
        <p className="text-muted leading-7">
          If the board never powers the igniter, it hasn&apos;t seen the conditions it needs. Read the status code first.
          Common causes are a pressure switch that won&apos;t close (blocked vent, cracked hose, wet condensate trap on
          high-efficiency furnaces), an open high limit or rollout switch, or a failed board relay. The limit and rollout
          switches are normally closed and should read near 0 Ω with power off; an open one is a safety signal, often
          caused by overheating or flame rollout, and needs a technician rather than a jumper. Low-voltage problems,
          such as no 24 V from the furnace transformer, are covered in{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            how to check a 24V transformer with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="replace">Replace the igniter correctly</StepHeading>
        <p className="text-muted leading-7">
          Buy the igniter part number listed for your furnace model, or a universal kit the maker states is compatible
          with your board&apos;s voltage and timing. Handle it by the ceramic base only, fit it in the same position so
          the element sits where the gas will reach it, and route the wires away from the burner. Then run a full cycle
          and watch the sequence through the sight glass: glow, gas, flame across all burners, and a steady burn. If the
          burners now light but drop out after a few seconds, move on to the{" "}
          <Link href="/multimeters/how-to-test-a-flame-sensor-with-a-multimeter" className={link}>
            flame sensor microamp test
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="resistance-table" className="text-xl font-semibold mb-3">
          Furnace igniter resistance by type
        </h2>
        <p className="text-muted leading-7 mb-4">
          Typical cold-resistance ranges seen on residential hot surface igniters at room temperature. Treat these as a
          guide; the rated range on your igniter&apos;s packaging or the furnace manual takes precedence.
        </p>
        <DataTable
          head={["Igniter type", "Typical look", "Typical cold resistance", "Common failure"]}
          rows={[
            ["Silicon carbide", "Flat dark-gray zig-zag, fragile", "About 40–90 Ω", "Cracks, burns open at a hot spot"],
            ["Silicon nitride", "Slim rod or paddle, tougher", "About 10–20 Ω", "Less common; open lead or crack"],
            ["Any type, failed open", "May look normal", "OL", "Replace"],
            ["Any type, aged", "Dim or patchy glow", "Well above its rated range", "Replace before winter"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4">
          The same resistance logic applies to electric heaters in other appliances; our guide to{" "}
          <Link href="/multimeters/how-to-measure-resistance-of-a-heating-element-with-a-multimeter" className={link}>
            measuring the resistance of a heating element
          </Link>{" "}
          shows how to turn a wattage rating into an expected reading.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for furnace igniter testing</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with a resistance range and a CAT II or better AC voltage rating handles the igniter itself. For
          furnace work in general, a µA range for flame sensors and a backlight are worth having, which is where the
          Fluke 116 earns its place.
        </p>
        <ProductStrip
          title="Meters for furnace igniter testing"
          items={[
            {
              name: "Fluke 116",
              image: fluke116.image,
              alt: "Fluke 116 HVAC digital multimeter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "HVAC meter with ohms, a 0.1 µA flame-sensor range, temperature and LoZ. No mA or amp ranges.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter",
              href: "/multimeters/fluke-179-review",
              note: "CAT IV 600V, 6,000-count backlit display with bar graph and a supplied thermocouple for temperature.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "Budget True RMS meter, 6,000 counts and CAT III 600V. Covers igniter ohms and the 120 V check.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
