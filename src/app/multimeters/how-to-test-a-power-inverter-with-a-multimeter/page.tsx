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
  "Test a power inverter with a multimeter: DC input under load, cable voltage drop, 120 V AC output, and why modified sine output needs a True RMS meter.";

export const metadata = buildMetadata({
  title: "How to Test a Power Inverter With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-power-inverter-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const fluke87 = picks.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** Modified sine (stepped) waveform overlaid on a true sine with the same RMS value. */
function ModifiedSineDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Waveform comparison for testing a power inverter with a multimeter: a smooth pure sine wave and a stepped modified sine wave with the same 120 volt RMS value but a different shape, which is why an average-responding meter misreads modified sine inverter output."
    >
      <line x1="20" y1="85" x2="330" y2="85" className="stroke-muted" strokeWidth="1" />
      <line x1="20" y1="15" x2="20" y2="155" className="stroke-muted" strokeWidth="1" />
      {/* pure sine */}
      <path
        d="M20 85 C 45 20, 75 20, 95 85 S 145 150, 170 85 S 220 20, 245 85 S 295 150, 320 85"
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
      />
      {/* modified sine */}
      <path
        d="M20 85 H35 V35 H80 V85 H110 V135 H155 V85 H185 V35 H230 V85 H260 V135 H305 V85 H320"
        className="stroke-foreground"
        strokeWidth="1.8"
        fill="none"
        strokeDasharray="5 3"
      />
      <text x="26" y="28" fontSize="9" className="fill-muted">peak</text>
      <text x="200" y="160" fontSize="9" className="fill-muted">dead time at 0 V between pulses</text>
      <rect x="230" y="10" width="10" height="3" className="fill-accent" />
      <text x="244" y="14" fontSize="9" className="fill-foreground">pure sine</text>
      <rect x="230" y="22" width="10" height="3" className="fill-foreground" />
      <text x="244" y="26" fontSize="9" className="fill-foreground">modified sine</text>
    </svg>
  );
}

export default function HowToTestAPowerInverterWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Power Inverter With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-power-inverter-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a power inverter with a multimeter, measure the DC voltage at the inverter&apos;s input terminals
          with a load running, then measure the AC voltage at its outlet. A healthy 12 V inverter keeps its input
          above its low-voltage alarm (often around 10.5–11 V) while it works, and a 120 V model reads close to 120 V
          AC at the outlet on a True RMS meter. Most &quot;dead inverter&quot; problems are really battery or cable
          problems on the DC side, so this guide tests the input first, shows how to find voltage lost in the
          cables, and explains why a cheap meter can read 100 V on a modified sine inverter that is working fine.
        </>
      }
      aside={{
        image: ut139c.image,
        alt: "UNI-T UT139C True RMS multimeter for reading inverter AC output",
        caption: (
          <>
            A True RMS meter such as the UNI-T UT139C reads modified sine output correctly; an averaging meter
            doesn&apos;t. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "dc-side-first", label: "Why the DC side fails first" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "resting-input", label: "1. Check the battery at rest" },
        { id: "input-under-load", label: "2. Measure the input under load" },
        { id: "cable-drop", label: "3. Find voltage lost in the cables" },
        { id: "ac-output", label: "4. Measure the AC output" },
        { id: "no-load-draw", label: "5. Check the no-load draw" },
        { id: "grounding", label: "6. Check ground and GFCI behavior" },
        { id: "modified-sine", label: "Modified sine and your meter" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if my power inverter is bad?",
          a: "Run a modest load and measure DC volts at the inverter's own input terminals. If the input stays well above the low-voltage cutoff, the fuses are intact, and the outlet still reads 0 V AC or the inverter shows a fault, the inverter is the problem. If the input sags near the cutoff, the battery or cables are at fault, not the inverter.",
        },
        {
          q: "Why does my multimeter read 100 V on a 120 V inverter?",
          a: "Your inverter is probably a modified sine type and your meter is average-responding. Those meters assume a sine wave and multiply the average by 1.11. A stepped wave has a different ratio, so the meter reads low. A True RMS meter reads the actual RMS voltage. Pure sine inverters read correctly on both kinds of meter.",
        },
        {
          q: "What voltage should a 12 V inverter shut off at?",
          a: "Many 12 V inverters sound a low-battery alarm around 10.5–11 V and shut down a little below that, but the figures vary by model and some let you set them. Lithium battery users often raise the cutoff. Check the manual's specification table, then measure at the inverter's terminals, not at the battery, because cable drop makes the inverter see less.",
        },
        {
          q: "How much current does an inverter draw from the battery?",
          a: "Divide the AC load by the battery voltage and the inverter's efficiency. A 600 W load on a 12 V battery through an inverter about 90% efficient draws roughly 600 ÷ (12 × 0.9) ≈ 56 A. That's far beyond a multimeter's 10 A range, so use a DC clamp meter or a battery monitor shunt for current.",
        },
        {
          q: "Is it safe to measure inverter AC output with a multimeter?",
          a: "Yes, if you treat it like a wall outlet. Inverter output can kill. Use a CAT-rated meter with leads in good condition, set it to AC volts before probing, keep your fingers behind the probe guards, and probe the outlet slots one hand at a time if you can. Never open the inverter case while it is connected to a battery.",
        },
      ]}
      next={[
        {
          href: "/multimeters/do-i-need-true-rms-multimeter",
          title: "Do I Need a True RMS Multimeter?",
          desc: "When average-responding meters misread motor drives, dimmers and inverter output.",
        },
        {
          href: "/multimeters/how-to-test-a-12v-battery-under-load",
          title: "How to Test a 12V Battery Under Load",
          desc: "The go/no-go check for the battery feeding your inverter.",
        },
      ]}
    >
      <Callout title="Inverter output is as dangerous as mains">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A running inverter makes 120 V AC, which can kill. Treat its outlets and any hardwired output exactly like
            a household circuit, and use a meter rated at least CAT II, ideally CAT III.
          </li>
          <li>
            The DC side carries very high current. A dropped wrench across the battery or inverter terminals can weld
            itself in place. Remove jewelry and use insulated tools.
          </li>
          <li>
            Inverters hold charge in their input capacitors after you disconnect the battery. Never open the case;
            there are no user-serviceable parts inside on most models.
          </li>
          <li>
            Inverters wired into an RV, boat or home panel, or with a transfer switch, should be serviced by a
            qualified electrician or RV/marine technician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="dc-side-first" className="text-xl font-semibold mb-3">Why the DC side fails before the inverter</h2>
        <p className="text-muted leading-7 mb-4">
          An inverter turns low-voltage, high-current DC into high-voltage, low-current AC. Power in has to equal
          power out plus losses, so a 12 V inverter running a 1,000 W load pulls about 1,000 ÷ (12 × 0.9) ≈ 93 A from
          the battery, assuming roughly 90% efficiency. Pure sine inverter makers commonly quote efficiencies in the
          mid-80s to low-90s percent; check your own model&apos;s spec sheet. Currents that large expose every weak link:
          a tired battery, a thin cable, a corroded lug. Each one drops voltage, and the inverter measures its input
          voltage to decide when to alarm and shut down.
        </p>
        <p className="text-muted leading-7">
          That&apos;s why an inverter that beeps and shuts off when the coffee maker starts is usually telling the truth
          about its input, not failing. The meter&apos;s job is to show where the voltage went. Only once the input stays
          healthy under load does it make sense to blame the inverter itself.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Low-voltage alarm as soon as a load starts", "Weak battery or undersized cables", "Input volts at the inverter under load (step 2)", "Charge or replace the battery; heavier cable"],
            ["Shuts off with big loads only", "Overload or surge beyond rating", "Compare load watts with the continuous rating", "Use a larger inverter or a smaller load"],
            ["Power light on, 0 V at the outlet", "Output fault, tripped output breaker or GFCI", "AC volts at each outlet; press reset", "Reset; replace or repair if it persists"],
            ["Outlet reads about 100 V", "Modified sine read on an averaging meter", "Repeat with a True RMS meter", "Nothing wrong if True RMS reads near 120 V"],
            ["Battery flat overnight with nothing plugged in", "Inverter idle draw", "No-load current (step 5)", "Switch it off when not in use"],
            ["Hot cables or terminals", "Loose or corroded connection", "Voltage drop across each joint", "Clean and torque the lugs; replace damaged cable"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="resting-input">Check the battery at rest</StepHeading>
        <p className="text-muted leading-7">
          Switch the inverter off and read DC volts across the battery posts. A charged 12 V lead-acid battery rests
          at about 12.6–12.8 V; a LiFePO4 battery rests around 13.2–13.4 V for most of its range. If the battery is
          already low at rest, charge it before going further, because every later reading depends on it. The{" "}
          <Link href="/multimeters/how-to-check-a-12v-leisure-battery-with-a-multimeter" className={link}>
            12 V leisure battery check
          </Link>{" "}
          gives full state-of-charge tables for both chemistries.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="input-under-load">Measure the inverter input under load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Turn the inverter on and plug in a steady load of known wattage: a heat gun on low, an incandescent work
          light or a kettle, sized well inside the inverter&apos;s continuous rating. Put the meter probes directly on
          the inverter&apos;s own DC input studs, not on the battery. This is the voltage the inverter sees and judges.
          It should sag a little and then hold steady. If it falls toward the low-voltage alarm figure in the
          manual, the inverter is reacting correctly to a weak supply.
        </p>
        <Figure caption={<>Illustrative readings with a 600 W load on a 12 V system: 12.12 V at the battery posts but only 11.38 V at the inverter studs.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.12" unit="V" mode="DC V  battery posts" />
            <MeterReadout value="11.38" unit="V" mode="DC V  inverter studs" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="cable-drop">Find the voltage lost in the cables</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The difference between the battery posts and the inverter studs is cable loss. In the illustrative example
          above it is 12.12 − 11.38 = 0.74 V, and at about 56 A that means the positive and negative runs together
          have roughly 0.74 ÷ 56 ≈ 0.013 Ω of resistance. That sounds tiny, but it wastes 0.74 × 56 ≈ 41 W as heat and
          pushes the inverter 0.74 V closer to its cutoff. Aim for a few tenths of a volt or less at full load.
        </p>
        <p className="text-muted leading-7 mb-4">
          To find the bad section, keep the load on and measure across each part separately: the positive cable end
          to end, the fuse or breaker, the negative cable, and each lug-to-post joint. A clean crimped lug drops
          almost nothing; a loose or corroded one can drop more than the whole cable. Follow the inverter
          manual&apos;s cable size for your run length, and keep the cables as short as practical. Marine and RV wiring
          standards also require a fuse close to the battery on the positive cable. The{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            voltage drop guide
          </Link>{" "}
          covers the probing technique in more detail.
        </p>
        <Figure caption={<>Illustrative voltage lost at each point of a 12 V inverter feed at 56 A. The loose negative lug is the single biggest loss.</>}>
          <BarChart
            items={[
              { label: "Positive cable", value: 0.18, display: "0.18 V" },
              { label: "Fuse and holder", value: 0.09, display: "0.09 V" },
              { label: "Negative cable", value: 0.17, display: "0.17 V" },
              { label: "Loose negative lug", value: 0.3, display: "0.30 V", highlight: true },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="ac-output">Measure the AC output</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Move the dial to AC volts. With the inverter on, insert the probes into the outlet&apos;s two flat slots, hot
          (the narrower slot) and neutral. A 120 V inverter should read close to 120 V on a True RMS meter; many
          makers specify an output tolerance of a few percent either side. Read with no load, then with your test load
          running. A pure sine inverter should hold steady; a large drop under a load well within its rating
          points to an inverter that can&apos;t deliver its rated power.
        </p>
        <p className="text-muted leading-7">
          If your meter has a frequency function, check it too: 60 Hz for North American models, 50 Hz for most of
          the rest of the world. An inverter set to the wrong frequency runs some clocks and motors badly. If the
          outlet reads 0 V but the inverter&apos;s display shows output, look for a tripped output breaker or a GFCI outlet
          on the inverter that needs resetting.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="no-load-draw">Check the no-load draw</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Every inverter uses power just to stay on, even with nothing plugged in. Makers list it as no-load current
          or idle consumption. Small inverters often draw well under 1 A at 12 V; larger ones can draw a few amps,
          which is a few tens of watts. Multiply by the hours it sits idle: 2 A for 12 hours overnight is 24 Ah, a
          quarter of a 100 Ah battery&apos;s capacity, for nothing.
        </p>
        <p className="text-muted leading-7">
          A meter on its 10 A range can measure this only on small inverters, and only if nothing is plugged in,
          because a single load or the start-up surge can blow the meter&apos;s fuse. Insert it in series in the
          negative lead with the inverter off, then switch on. If the reading is far above the spec sheet figure,
          suspect a fault or a power-saving mode that is disabled. The{" "}
          <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={link}>
            parasitic drain method
          </Link>{" "}
          explains series current measurement safely.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="grounding">Check ground and GFCI behavior</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Some inverters bond the AC neutral to the chassis ground at the output; others leave the output floating.
          On a floating output you may see odd readings from hot to ground, such as half the output voltage, because
          the meter is measuring capacitive leakage. That isn&apos;t necessarily a fault; the manual says which design
          you have. It matters because a GFCI outlet plugged into a floating inverter may not trip as expected, and
          an inverter installed in an RV or boat must have its neutral-ground bonding set up to match the rest of the
          wiring. Leave that to an RV or marine electrician.
        </p>
        <Figure caption={<>The test order: the inverter is only the suspect once the DC supply is proven.</>}>
          <FlowDiagram
            steps={[
              { label: "Battery", sub: "Resting volts" },
              { label: "Input", sub: "Under load" },
              { label: "Cables", sub: "Drop per joint" },
              { label: "Output", sub: "AC volts, Hz" },
              { label: "Idle", sub: "No-load draw" },
            ]}
          />
        </Figure>
        <KeyIdea title="Measure at the inverter, not just the battery">
          The inverter decides when to shut down based on the voltage at its own studs. A healthy battery behind a
          poor cable still looks like a flat battery to the inverter.
        </KeyIdea>
      </section>

      <section>
        <h2 id="modified-sine" className="text-xl font-semibold mb-3">Modified sine output and why your meter reads low</h2>
        <p className="text-muted leading-7 mb-4">
          Cheaper inverters make a stepped &quot;modified sine&quot; wave: a positive pulse, a gap at 0 V, a negative
          pulse, another gap. An average-responding meter measures the average of the rectified wave and multiplies
          by 1.11, the ratio that is correct only for a pure sine. On a stepped wave that ratio is wrong.
        </p>
        <Figure caption={<>A pure sine and a modified sine with the same RMS voltage. The stepped wave has a higher peak and gaps at zero, so its average is different.</>}>
          <ModifiedSineDiagram />
        </Figure>
        <p className="text-muted leading-7 my-4">
          Here is the arithmetic for one illustrative design. Suppose the pulses peak at 160 V and are on for 56% of
          each cycle. The RMS value is 160 × √0.56 ≈ 120 V, which is correct. The average is 160 × 0.56 ≈ 90 V, and an
          averaging meter shows 90 × 1.11 ≈ 100 V. Nothing is wrong with that inverter; the meter is.
        </p>
        <DataTable
          head={["Inverter output", "Average-responding meter", "True RMS meter"]}
          rows={[
            ["Pure sine, 120 V", "About 120 V", "About 120 V"],
            ["Modified sine, 120 V RMS (example above)", "About 100 V (reads low)", "About 120 V"],
            ["Output collapsing under overload", "Low", "Low"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          Our guide to{" "}
          <Link href="/multimeters/do-i-need-true-rms-multimeter" className={link}>
            whether you need a True RMS multimeter
          </Link>{" "}
          covers the other places this error shows up, such as motor drives and dimmers.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on an inverter</h2>
        <p className="text-muted leading-7 mb-6">
          Pick a True RMS meter so modified sine output reads correctly, with a CAT rating appropriate for 120 V
          work and good resolution on DC volts for the cable-drop checks. For inverter input current, add a DC clamp
          meter or rely on a battery monitor, because inverter currents are well past any handheld meter&apos;s 10 A
          range.
        </p>
        <ProductStrip
          title="True RMS meters for inverter testing"
          items={[
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C True RMS multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS with a 6,000-count display and NCV at a budget price. Reads modified sine output correctly.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a backlit 6,000-count display, with frequency for checking 60 Hz output.",
            },
            {
              name: "Fluke 87V",
              image: fluke87.image,
              alt: "Fluke 87V industrial multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT IV 600V / CAT III 1000V and a 19,999-count high-resolution mode for fine cable-drop readings on large systems.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
