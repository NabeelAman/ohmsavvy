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
  "Solar inverter showing a DC arc fault warning? What the AFCI code means, connector causes, false trips, safe owner steps and why an installer must inspect.";

export const metadata = buildMetadata({
  title: "How to Diagnose a Solar Inverter DC Arc Fault",
  description,
  path: "/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter",
});

const all = getAllPicks("multimeters");
const fluke393 = all.find((p) => p.name === "Fluke 393 FC")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;

const link = "text-accent hover:underline";

/** A PV string with its connector joints, showing where a series arc forms and where the inverter detects it. */
function SeriesArcDiagram() {
  const modules = [20, 82, 144, 206];
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Diagram of a solar string of four modules wired in series to an inverter, with a loose connector between the second and third module forming a series arc that the inverter's arc-fault detector senses as high-frequency noise on the DC current">
      <g className="stroke-foreground" strokeWidth="1.5" fill="none">
        {modules.map((x) => (
          <rect key={x} x={x} y={30} width={44} height={30} rx="2" />
        ))}
        <line x1={64} y1={45} x2={82} y2={45} />
        <line x1={126} y1={45} x2={136} y2={45} />
        <line x1={140} y1={45} x2={144} y2={45} />
        <line x1={188} y1={45} x2={206} y2={45} />
        <path d="M250 45 H300 V120 H272" />
        <path d="M20 45 H8 V120 H230" />
        <rect x={230} y={105} width={42} height={42} rx="3" />
      </g>
      <g className="stroke-accent" strokeWidth="1.6" fill="none">
        <path d="M134 36 L137 42 L133 46 L138 52" />
        <circle cx={137} cy={45} r={11} strokeDasharray="3 2" />
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-foreground">
        <text x={42} y={49}>PV</text>
        <text x={104} y={49}>PV</text>
        <text x={166} y={49}>PV</text>
        <text x={228} y={49}>PV</text>
        <text x={251} y={124}>Inverter</text>
        <text x={251} y={136}>AFCI</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x={137} y={20}>loose or cross-mated connector</text>
        <text x={137} y={82}>series arc: gap in the current path</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x={120} y={140}>arc adds broadband noise to the</text>
        <text x={120} y={152}>DC current; the inverter senses it</text>
        <text x={170} y={176}>and stops converting, which lowers string current</text>
      </g>
    </svg>
  );
}

export default function HowToDiagnoseDcArcFaultWarningsInASolarInverterPage() {
  return (
    <HowToShell
      title="How to Diagnose DC Arc Fault Warnings in a Solar Inverter"
      description={description}
      path="/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A DC arc fault warning in a solar inverter means the inverter&apos;s arc-fault circuit interrupter (AFCI)
          detected a current signature that looks like an electrical arc somewhere on the DC side of the system,
          and it shut down production to stop it. Sometimes that is a nuisance trip. Often it is a real arc at a
          loose, corroded or mismatched connector, or a damaged cable on the roof. Diagnosing it properly needs
          specialist equipment and someone trained to work on energized PV wiring, so the owner&apos;s part is
          narrower than with most household faults: record what happened, look from a safe distance, reset once
          if the manual allows, and get the installer out. This guide explains what each of those steps tells you.
        </>
      }
      aside={{
        image: fluke393.image,
        alt: "Fluke 393 FC solar clamp meter",
        caption: (
          <>
            Installers compare string currents with a DC clamp rated for PV voltages, never by unplugging
            connectors. See{" "}
            <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
              meters for solar panel testing
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-it-means", label: "What the arc fault code means" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "real-or-false", label: "Real arcs vs false trips" },
        { id: "owner-steps", label: "What the owner can do" },
        { id: "installer-tests", label: "What the installer tests" },
        { id: "call", label: "Why it needs a professional inspection" },
      ]}
      faq={[
        {
          q: "Can I turn off arc-fault detection to stop the nuisance trips?",
          a: "No. Arc-fault protection on rooftop PV is a code requirement in the US for most systems, and it is the main safeguard against a DC arc starting a roof fire. Disabling it can also void the inverter warranty and the installation's approval. If the trips are false, the installer and inverter maker can investigate the cause, update firmware or adjust settings within what the manufacturer permits.",
        },
        {
          q: "How many times can I reset the inverter after an arc fault?",
          a: "Follow the inverter manual, and as a rule reset once. If the fault comes back, the inverter is telling you the condition is still there, and each restart re-energizes whatever arced. Leave the system off and call the installer. Some inverters retry on their own a limited number of times before locking out; that lockout is deliberate.",
        },
        {
          q: "Do microinverter systems get DC arc faults?",
          a: "Much less often. With microinverters, each panel's DC wiring is a short run at module voltage, and the roof wiring carries AC. Systems with a high-voltage DC string, including those with power optimizers, are the ones where DC arc detection matters most. Your installation paperwork or the inverter label shows which type you have.",
        },
        {
          q: "Is the system safe to leave in daylight while I wait for the installer?",
          a: "Shutting the inverter down stops the current that sustains an arc, which is why AFCI works. The panels and DC wiring are still energized whenever light falls on them, so keep people and pets away from any damaged cable, and if your system has a rapid-shutdown initiator, its label explains how to use it. Any smoke, smell or sparking means 911.",
        },
        {
          q: "Does an arc fault mean my solar panels need replacing?",
          a: "Usually not. Most arcs happen at a connector, splice or terminal, and the repair is often a pair of correctly crimped, matched connectors or a new section of cable. A panel is replaced only when the arc is inside its junction box or the module itself is cracked or burned. The installer's inspection, not the error code alone, decides which parts have to go.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-detect-a-faulty-solar-optimizer-when-one-panel-produces-less-power",
          title: "How to Detect a Faulty Solar Optimizer",
          desc: "Panel-level monitoring, shading and mismatch vs a failed optimizer.",
        },
        {
          href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter",
          title: "How to Test a Solar Panel With a Multimeter",
          desc: "Open-circuit voltage and short-circuit current on a single, isolated module.",
        },
      ]}
    >
      <Callout title="DC arcs are a fire risk: do not touch the array or its wiring">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Solar panels generate voltage whenever light reaches them, and a residential string can be several
            hundred volts DC. Switching off the inverter or the AC breaker does not make the roof wiring dead.
          </li>
          <li>
            Unlike AC, a DC arc has no zero crossing to put it out, so a connector pulled apart under load can draw
            a sustained arc. Never unplug PV connectors, and never open the inverter&apos;s DC compartment,
            combiner boxes, junction boxes or rapid-shutdown devices.
          </li>
          <li>
            Smoke, a burning smell, sparking or scorch marks on the roof, conduit or inverter: get everyone out,
            call 911 and tell the dispatcher the building has solar panels.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-it-means" className="text-xl font-semibold mb-3">What the arc fault code means</h2>
        <p className="text-muted leading-7 mb-4">
          The US National Electrical Code requires DC arc-fault protection for PV systems on or in buildings that
          operate at 80 V DC or more, which covers almost every string-inverter installation. The protection is
          usually built into the inverter. It watches the DC input current for the irregular, broadband
          high-frequency noise that an arc produces, and when the signature crosses its threshold it stops power
          conversion. With no load drawing current, a series arc loses the energy that keeps it burning.
        </p>
        <p className="text-muted leading-7 mb-4">
          Most inverters then latch the fault: the display, LED pattern or monitoring app shows an arc fault code,
          often with the input or MPPT channel it was seen on, and production stays off until someone resets it.
          European installations follow different rules; dedicated arc detection is not required everywhere in the
          EU, but many inverters sold there include it and test to the IEC 63027 standard for PV arc detection.
          Where your inverter has it, the behavior is the same.
        </p>
        <p className="text-muted leading-7 mb-4">
          Note that the inverter only knows the arc is somewhere on that input. It can&apos;t say which connector
          or which module, so the code starts the search rather than ending it. Don&apos;t confuse it with the AC
          arc-fault breakers in your house panel, which protect branch circuits and trip for different reasons,
          as covered in{" "}
          <Link href="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause" className={link}>
            why an AFCI breaker keeps tripping
          </Link>
          .
        </p>
        <Figure caption={<>A series arc forms where the current path is interrupted by a small gap, typically at a connector. The inverter senses its noise on the DC input but cannot tell which joint is at fault.</>}>
          <SeriesArcDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Arc fault returns after every reset, same input", "Real series arc at a connector, splice or terminal", "Which MPPT input the app names; production history", "Installer"],
            ["Trips in the morning or after rain", "Moisture in a connector or junction box; damaged insulation", "Weather and time stamps on each event", "Installer"],
            ["Trips on hot afternoons", "Thermal expansion opening a loose joint", "Event times vs temperature and peak output", "Installer"],
            ["Fault after roof work, storm or pest activity", "Crushed, chewed or abraded cable, displaced connector", "Look from the ground for hanging wires or debris", "Installer; roofer only with installer present"],
            ["Occasional trip, no pattern, nothing found", "Nuisance detection from electrical noise", "Firmware version; nearby new equipment", "Installer with inverter maker"],
            ["Arc code plus burn smell or marks", "Arc has already damaged equipment", "Nothing: evacuate if needed, call 911", "Fire service, then installer"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Connectors are the classic weak point. A PV plug that wasn&apos;t pushed fully home, was crimped poorly,
          or was mated with a different brand of &quot;compatible&quot; connector can develop resistance, heat and
          eventually a gap. Module junction boxes, field splices and terminals inside combiners and the inverter
          itself are the other usual sites.
        </p>
      </section>

      <section>
        <h2 id="real-or-false" className="text-xl font-semibold mb-3">Real arcs vs false trips</h2>
        <p className="text-muted leading-7 mb-4">
          Arc detectors work by recognizing noise, and other things make noise. Long DC cable runs can pick up
          interference, some detectors react to switching from nearby inverters or communications equipment, and
          early firmware on some models was more sensitive than later releases. A single trip that never repeats
          after a reset, with no weather link and nothing visible, leans toward a nuisance event. Even then, record
          it, because a slowly degrading connector can trip occasionally for months before it fails outright.
        </p>
        <p className="text-muted leading-7">
          A pattern is far more telling than one event. Trips that cluster at the same time of day, the same
          weather, or the same input channel point to a physical cause that changes with temperature or moisture.
          A trip after a hailstorm, a re-roof or a squirrel problem points squarely at damaged wiring. Treat every
          repeat as real until a qualified person has proved otherwise.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="owner-steps">What the owner can do</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Record the event.</span> Photograph the inverter display or save a
            screenshot of the app: fault code, date, time, input channel and how much the system was producing
            just before the trip. Note the weather.
          </li>
          <li>
            <span className="text-foreground">Check the history.</span> Most monitoring apps keep an event log. A
            list of previous arc faults, with timestamps, is the most useful thing you can hand the installer.
          </li>
          <li>
            <span className="text-foreground">Look, from a safe distance.</span> From the ground, with binoculars if
            needed, check for cables hanging under the array, debris, nesting material, or dark marks. At the
            inverter, look for discoloration, melted plastic or a smell, without opening any cover. Don&apos;t climb
            onto the roof.
          </li>
          <li>
            <span className="text-foreground">Reset once, by the manual.</span> If nothing looks or smells wrong,
            follow the manufacturer&apos;s reset procedure, which may be a button, a menu step or an AC/DC switch
            sequence on the outside of the unit. If the fault returns, leave the system off and stop resetting.
          </li>
          <li>
            <span className="text-foreground">Contact the installer.</span> Send the photos and event log, and ask
            whether the inverter maker&apos;s support team should review the data remotely. Many inverters upload
            detailed logs the installer can read before visiting.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="installer-tests">What the installer tests</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A qualified technician shuts the system down by the documented procedure, then works through the string
          methodically with tools rated for PV voltages. Typical steps include comparing each string&apos;s
          current with a DC clamp while the system runs, checking open-circuit voltage at isolated points, testing
          insulation resistance from the conductors to ground, and scanning connectors and junction boxes with a
          thermal camera, since a high-resistance joint runs hotter than its neighbors. Many also run an IV-curve
          tracer, which plots each string&apos;s current against voltage and reveals resistance, mismatch and
          damaged modules that a single number can hide.
        </p>
        <Figure caption={<>Example installer readings with a DC clamp: two strings on the same inverter in identical sun. A string carrying noticeably less current than its twin is the one to inspect first.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="9.84" unit="A DC" mode="String 1" />
            <MeterReadout value="7.12" unit="A DC" mode="String 2" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          These checks involve energized DC conductors at voltages that can exceed what general-purpose meters are
          rated for, so the meter needs a CAT rating and DC voltage range above the system&apos;s maximum. The
          repair itself is usually replacing a connector pair with matching parts from one manufacturer, re-making a
          crimp with the specified tool, or replacing a damaged cable or module. For background on reading a single
          panel safely, see{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            how to test a solar panel with a multimeter
          </Link>
          .
        </p>
      </section>

      <section id="call">
        <KeyIdea title="Why an arc fault needs a professional inspection">
          An arc fault is one of the few solar errors where the safe answer is always the same: the installer or a
          qualified PV technician inspects before the system runs normally again. The fault sits on wiring that
          can&apos;t be switched off in daylight, the likely locations are on the roof or behind covers, and the
          proof of repair needs PV-rated test equipment. Call sooner rather than later if the fault repeats, if you
          see damage, or if the trips follow storms or pests. Call the inverter maker for firmware questions, your
          insurer if storm damage is involved, and 911 for any smoke or fire. For uneven panel output without an
          arc code, see{" "}
          <Link href="/multimeters/how-to-detect-a-faulty-solar-optimizer-when-one-panel-produces-less-power" className={link}>
            detecting a faulty optimizer
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="PV-rated meters installers use for string checks"
          items={[
            {
              name: "Fluke 393 FC",
              image: fluke393.image,
              alt: "Fluke 393 FC solar clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing#fluke-393-fc",
              note: "CAT III 1500V solar clamp: 1500 V DC, DC current to 999.9 A, DC power and a polarity alarm.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D AC/DC clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing#kaiweets-ht208d",
              note: "Budget AC/DC clamp to 1000 A with 1000 V DC, CAT III 1000V. For smaller residential strings.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "Hands-on Tested. CAT III 1000V / CAT IV 600V True RMS meter for open-circuit voltage checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
