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
  "Smart thermostat keeps losing power? Check the 24 VAC R-to-C supply, a missing C wire, power stealing, loose terminals, batteries and the furnace fuse safely.";

export const metadata = buildMetadata({
  title: "Smart Thermostat Keeps Losing Power? How to Test",
  description,
  path: "/multimeters/how-to-test-a-smart-thermostat-that-keeps-losing-power",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke116 = all.find((p) => p.name === "Fluke 116")!;
const mm420 = all.find((p) => p.name === "Klein Tools MM420")!;

const link = "text-accent hover:underline";

/** 24 VAC control loop: transformer feeds R, C returns to it; without C the stat must borrow power through W/Y. */
function ThermostatPowerDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Diagram of a furnace control transformer feeding a smart thermostat through the R wire and back on the C wire, with a dashed path showing power stealing through the heat call wire when no C wire is present">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="18" y="45" width="78" height="96" rx="4" />
        <rect x="244" y="45" width="78" height="96" rx="6" />
        <line x1="96" y1="62" x2="244" y2="62" />
        <line x1="96" y1="124" x2="244" y2="124" className="stroke-accent" strokeWidth="2.2" />
        <line x1="96" y1="93" x2="244" y2="93" strokeDasharray="4 3" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="57" y="84">furnace</text>
        <text x="57" y="98">board</text>
        <text x="57" y="112">24 VAC</text>
        <text x="283" y="90">smart</text>
        <text x="283" y="104">thermostat</text>
      </g>
      <g fontSize="9.5" className="fill-foreground">
        <text x="104" y="56">R (24 VAC supply)</text>
        <text x="104" y="87">W / Y / G (call wires)</text>
      </g>
      <text x="104" y="118" fontSize="9.5" className="fill-accent">C (common return)</text>
      <text x="170" y="160" fontSize="9.5" textAnchor="middle" className="fill-muted">With C: steady power, R to C</text>
      <text x="170" y="176" fontSize="9.5" textAnchor="middle" className="fill-muted">Without C: trickle borrowed through the dashed call wire</text>
    </svg>
  );
}

export default function SmartThermostatLosingPowerPage() {
  return (
    <HowToShell
      title="How to Test a Smart Thermostat That Keeps Losing Power"
      description={description}
      path="/multimeters/how-to-test-a-smart-thermostat-that-keeps-losing-power"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A smart thermostat that keeps losing power, rebooting, dropping Wi-Fi or blanking its screen is
          nearly always short of the small 24 VAC supply it borrows from your heating and cooling system. The
          usual culprits are a missing or disconnected C (common) wire, a thermostat that relies on power
          stealing, a loose conductor at a terminal, a flat backup battery, or a blown low-voltage fuse at the
          furnace or air handler. Every check below is on the low-voltage side except the fuse, and that one
          is done with the equipment switched off.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter",
        caption: (
          <>
            An AC volts reading between R and C is the single most useful number here. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "symptoms", label: "Symptoms and likely causes" },
        { id: "how-powered", label: "How a smart thermostat gets its power" },
        { id: "homeowner-checks", label: "Quick checks before the meter" },
        { id: "r-to-c", label: "Measure R to C at the wall plate" },
        { id: "furnace-fuse", label: "Transformer and fuse at the furnace" },
        { id: "install-mistakes", label: "Common installation issues" },
        { id: "who-to-call", label: "When to call an HVAC technician" },
      ]}
      faq={[
        {
          q: "Why does my smart thermostat go blank only when the heat or AC turns on?",
          a: "That timing points to power stealing or a weak supply. Without a C wire the thermostat charges itself through a call wire while the system is idle, and when the call closes that trickle disappears. A sagging transformer or a poor connection on R or C can cause the same dip as the system load comes on.",
        },
        {
          q: "Can I use the G (fan) wire as a C wire?",
          a: "Some installers repurpose the G conductor as a common, but you lose independent fan control, and some heat pump or multi-stage setups need G. Check the thermostat maker's wiring guide for your system type before moving anything, or have a technician pull a new cable or fit an adapter kit the thermostat maker approves.",
        },
        {
          q: "What voltage should I see between R and C?",
          a: "Residential control transformers are nominally 24 VAC, and a reading somewhere in the mid-20s is common. A lightly loaded transformer often reads a few volts high. A reading far below 24, one that jumps around, or zero means the supply, wiring or fuse needs attention.",
        },
        {
          q: "My thermostat uses AA batteries and still loses power. Why?",
          a: "Battery-only models usually just need fresh alkaline cells, but some thermostats use the batteries only as backup for the clock and settings while the 24 VAC supply runs the display and radio. If fresh cells don't help, measure R to C to see whether the main supply is reaching the thermostat at all.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-a-24v-transformer-with-a-multimeter",
          title: "How to Check a 24V Transformer With a Multimeter",
          desc: "Primary and secondary checks on the control transformer, with expected readings.",
        },
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "When the trouble starts upstream of the furnace, on the 120 V supply itself.",
        },
      ]}
    >
      <Callout title="Stay on the low-voltage side">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            The wires at the thermostat carry about 24 VAC, which is low risk, but the furnace or air handler
            they come from also has 120 V or 240 V inside. Switch the equipment off at its service switch or
            breaker before opening any furnace or air-handler door.
          </li>
          <li>
            Never defeat a door safety switch to watch the board run. Live testing inside the equipment is a
            job for an HVAC technician.
          </li>
          <li>
            A burning smell, a melted connector or a scorched board means stop: keep the power off and call a
            professional.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="symptoms" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Note what the thermostat does and when. A screen that dies at the moment the furnace or compressor
          kicks on tells a different story from one that slowly fades over a week, and both differ from a
          thermostat that has been dead since the day it was mounted.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Reboots or blanks when heating or cooling starts", "Power stealing with no C wire, or weak supply", "R-to-C voltage; is a C wire connected at both ends?", "Homeowner checks; technician adds a C wire"],
            ["Low-battery or low-power warning that keeps returning", "Battery not charging from 24 VAC, or worn cells", "Battery type, charging status, R-to-C reading", "Homeowner"],
            ["Completely dead, system also does nothing", "Blown low-voltage fuse, tripped furnace switch or breaker", "Furnace service switch, breaker, fuse with power off", "Homeowner for switch and fuse; technician if fuse blows again"],
            ["Comes and goes, worse when the wall plate is touched", "Loose conductor or broken strand at a terminal", "Each wire seated in its terminal, no nicked copper", "Homeowner (low-voltage side only)"],
            ["Dead after a condensate overflow or float switch trip", "Safety switch opening the R or Y circuit", "Water in the drain pan, float switch position", "Homeowner can clear a clog; technician for repairs"],
            ["Fan runs on its own or clicks after install", "Wire on the wrong terminal, or G used as C", "Wiring against the label you made at removal", "Homeowner or technician"],
          ]}
        />
      </section>

      <section>
        <h2 id="how-powered" className="text-xl font-semibold mb-3">How a smart thermostat gets its power</h2>
        <p className="text-muted leading-7 mb-4">
          A traditional mechanical thermostat needed no power at all; it was just a switch. A connected
          thermostat runs a screen, a processor and a radio around the clock, so it has to draw current
          continuously. In most forced-air systems that current comes from a step-down control transformer
          in the furnace or air handler. One side of the transformer secondary is the R terminal, the other is
          C. With a C wire in place, the thermostat simply connects across R and C and has a steady supply.
        </p>
        <p className="text-muted leading-7 mb-4">
          Older houses often have only two to four conductors in the thermostat cable, with no C. Many smart
          thermostats cope by power stealing: they trickle a small current through the heat or cool call wire
          while that circuit is idle, low enough that the relay or gas valve at the other end stays put. Some
          systems tolerate this well. Others react with a furnace that short cycles, a fan that hums, or a
          thermostat whose internal battery slowly drains because the trickle cannot keep up with the Wi-Fi
          radio.
        </p>
        <Figure caption={<>The C wire closes the loop back to the transformer. Without it, the thermostat has to borrow power through a call wire, and that borrowed supply vanishes whenever the call is active.</>}>
          <ThermostatPowerDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="homeowner-checks" className="text-xl font-semibold mb-3">Quick checks before the meter</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Furnace switch and breaker:</span> the light-switch style service
            switch near the furnace is easy to knock off. Confirm it is on and the furnace breaker has not
            tripped. Reset a tripped breaker once; if it trips again, leave it off and call for service.
          </li>
          <li>
            <span className="text-foreground">Batteries:</span> if your model takes replaceable cells, fit a
            fresh set of the type its manual specifies. If it has a built-in rechargeable cell, the settings
            menu usually shows battery level or charging state.
          </li>
          <li>
            <span className="text-foreground">Condensate safety switch:</span> many air handlers and
            high-efficiency furnaces have a float switch that interrupts the low-voltage circuit when the drain
            backs up. A full pan or a tripped float is a common reason for a dead thermostat in summer.
          </li>
          <li>
            <span className="text-foreground">Wall plate:</span> pull the thermostat off its base and look at
            each wire. Every conductor should be stripped clean, fully inserted and locked, with no copper
            strands touching a neighbor.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={1} id="r-to-c">Measure R to C at the wall plate</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Leave the system powered, remove the thermostat from its base so the terminals are exposed, and set
          your meter to AC volts. Touch one probe to the R (or Rh/Rc) terminal and the other to C. A healthy
          residential control circuit is nominally 24 VAC, and readings in the mid-20s are typical; a
          transformer with little load on it often reads a little higher. Then take the same reading while
          someone raises the setpoint so the heat calls, or lowers it for cooling. A drop of a volt or so is
          normal as the gas valve or contactor pulls in. A collapse to single digits suggests a failing
          transformer, an overloaded secondary or a poor connection somewhere in the R or C path.
        </p>
        <Figure caption={<>Left: a steady R-to-C supply with the system idle. Right: the same terminals collapsing during a heat call, which points to the transformer, a loose connection or an overloaded circuit.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="26.1" unit="V" mode="V~  R to C, idle" />
            <MeterReadout value="8.4" unit="V" mode="V~  R to C, heat call" />
          </div>
        </Figure>
        <p className="text-muted leading-7">
          If there is no C terminal in use, measure from R to the W or Y terminal with the system idle. You
          should see roughly the full control voltage across the open call circuit, because the relay coil or
          gas valve at the far end completes the path. That confirms R is live, but it also confirms you have
          no dedicated return, which is the root problem for most smart thermostats. A meter with Min/Max
          recording, such as the{" "}
          <Link href="/multimeters/best-multimeter-for-hvac-technicians" className={link}>
            HVAC meters in our roundup
          </Link>
          , helps catch a dip that only lasts a second or two while the blower ramps up. For the meter basics,
          see{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            how to use a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="furnace-fuse">Check the transformer and fuse at the furnace</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If R to C reads zero, follow the cable back. Turn the furnace or air handler off at its service switch
          and at the breaker before removing the access door. Many control boards carry a small automotive-style
          blade fuse on the 24 V side, often rated around 3 A or 5 A; the exact value is printed on the board
          or in the wiring diagram inside the door. Pull it and check it with your meter on continuity or ohms.
          A good fuse reads close to zero ohms; an open one reads OL. Replace it only with the same rating.
        </p>
        <p className="text-muted leading-7 mb-4">
          A fuse that blows means something on the low-voltage circuit shorted: a staple through the thermostat
          cable, a nicked wire touching the metal cabinet at the outdoor unit, or R and C touching during the
          install. A new fuse that blows straight away is a technician job, because finding that short means
          tracing wiring through walls and the outdoor unit.
        </p>
        <p className="text-muted leading-7">
          Checking the transformer itself, primary and secondary, is covered in{" "}
          <Link href="/multimeters/how-to-check-a-24v-transformer-with-a-multimeter" className={link}>
            how to check a 24V transformer with a multimeter
          </Link>
          . Measuring its live 120 V primary inside the cabinet is best left to a technician. A transformer that
          is undersized for the added draw of a smart thermostat, a zone panel or a humidifier will often read
          normal at idle and sag only under load, which is why the heat-call reading in Step 1 matters. A fuse
          you can check without pulling it is explained in{" "}
          <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
            how to test a fuse without removing it
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="install-mistakes" className="text-xl font-semibold mb-3">Common installation issues</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">C connected at the thermostat but not at the furnace:</span> a
            spare conductor in the cable does nothing until it is landed on the board&apos;s C terminal too.
            Installers often find it folded back behind the cable jacket.
          </li>
          <li>
            <span className="text-foreground">Rc and Rh jumper:</span> systems with one transformer usually need
            Rc and Rh joined, either by a jumper or the thermostat&apos;s own setting. Separate heating and
            cooling transformers need them kept apart. Follow the thermostat maker&apos;s wiring guide.
          </li>
          <li>
            <span className="text-foreground">Heat pump O/B and auxiliary wires:</span> landing these on the
            wrong terminal makes the system behave oddly, and a wrongly configured thermostat may try to steal
            power through a circuit that won&apos;t tolerate it.
          </li>
          <li>
            <span className="text-foreground">Short strip or overlong strip:</span> too little bare copper gives
            a high-resistance contact that warms and loosens; too much risks touching an adjacent terminal and
            blowing the fuse.
          </li>
          <li>
            <span className="text-foreground">Boilers, millivolt systems and line-voltage heat:</span> many
            hot-water boilers, gas fireplaces and baseboard heaters don&apos;t use a standard 24 VAC thermostat
            circuit at all. Line-voltage baseboard thermostats switch 120 V or 240 V and need a thermostat made for
            them. Check compatibility before blaming the power supply.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          When a C wire is missing, the fixes are a new multi-conductor cable, using an unused spare conductor,
          or an add-a-wire adapter kit approved by the thermostat maker. Each of those involves the furnace
          board and is a reasonable job to hand to an HVAC technician.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="When to call an HVAC technician or electrician">
          Call an HVAC technician if the low-voltage fuse blows again, the transformer reads low under load,
          there is no C wire to use, or the system short cycles after the smart thermostat went in. Call an
          electrician if the furnace breaker keeps tripping or the furnace&apos;s 120 V supply itself is missing.
          Contact the thermostat maker if R to C reads a steady, normal voltage and the unit still reboots,
          since that points to the thermostat itself.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for low-voltage HVAC checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V and non-contact voltage detection. Hands-on tested by OhmSavvy.",
            },
            {
              name: "Fluke 116",
              image: fluke116.image,
              alt: "Fluke 116 True RMS HVAC multimeter",
              href: "/multimeters/best-multimeter-for-hvac-technicians",
              note: "Fluke's HVAC meter: True RMS, Min/Max/Average, temperature, capacitance and LoZ, CAT III 600V.",
            },
            {
              name: "Klein Tools MM420",
              image: mm420.image,
              alt: "Klein Tools MM420 True RMS auto-ranging multimeter",
              href: "/multimeters/best-true-rms-multimeters-under-100",
              note: "True RMS and auto-ranging with Min/Max and a backlight, rated CAT III 600V. No LoZ or NCV.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
