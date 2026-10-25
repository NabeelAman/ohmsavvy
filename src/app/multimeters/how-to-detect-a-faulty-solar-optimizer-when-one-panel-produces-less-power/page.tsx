import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "One solar panel producing less power? Tell shading, soiling and mismatch from a failed optimizer using panel-level data, and know when to call the installer.";

export const metadata = buildMetadata({
  title: "How to Detect a Faulty Solar Optimizer",
  description,
  path: "/multimeters/how-to-detect-a-faulty-solar-optimizer-when-one-panel-produces-less-power",
});

const all = getAllPicks("multimeters");
const fluke393 = all.find((p) => p.name === "Fluke 393 FC")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;

const link = "text-accent hover:underline";

/** A string of optimized modules: each panel feeds its own optimizer, and the optimizer outputs are wired in series to the inverter. */
function OptimizerStringDiagram() {
  const xs = [14, 82, 150, 218];
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Diagram of four solar panels, each with its own optimizer, wired in series to an inverter. The third optimizer is marked as the suspect because its panel reports low output.">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        {xs.map((x) => (
          <rect key={`p${x}`} x={x} y="20" width="54" height="40" rx="3" />
        ))}
        {xs.map((x) => (
          <rect key={`o${x}`} x={x + 12} y="82" width="30" height="22" rx="3" className={x === 150 ? "stroke-accent" : undefined} strokeWidth={x === 150 ? 2.4 : 1.6} />
        ))}
        {xs.map((x) => (
          <line key={`l${x}`} x1={x + 27} y1="60" x2={x + 27} y2="82" />
        ))}
        <line x1="41" y1="104" x2="41" y2="130" />
        <line x1="41" y1="130" x2="300" y2="130" />
        <line x1="300" y1="130" x2="300" y2="150" />
        <rect x="270" y="150" width="60" height="30" rx="4" />
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-foreground">
        {xs.map((x, i) => (
          <text key={`t${x}`} x={x + 27} y="44">{`Panel ${i + 1}`}</text>
        ))}
        <text x="300" y="169">Inverter</text>
      </g>
      <g fontSize="9" textAnchor="middle" className="fill-muted">
        <text x="41" y="118">opt.</text>
        <text x="109" y="118">opt.</text>
        <text x="245" y="118">opt.</text>
        <text x="130" y="160">optimizer outputs in series</text>
      </g>
      <text x="177" y="118" fontSize="9" textAnchor="middle" className="fill-accent">suspect</text>
      <text x="177" y="14" fontSize="9" textAnchor="middle" className="fill-accent">low in the app</text>
    </svg>
  );
}

export default function HowToDetectAFaultySolarOptimizerPage() {
  return (
    <HowToShell
      title="How to Detect a Faulty Solar Optimizer When One Panel Produces Less Power"
      description={description}
      path="/multimeters/how-to-detect-a-faulty-solar-optimizer-when-one-panel-produces-less-power"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          A faulty solar optimizer usually shows up as one panel in your monitoring app that produces far less
          than its neighbors, drops to zero, or stops reporting altogether. The difficulty is that a perfectly
          healthy optimizer will also report a weak panel when that panel is shaded, dirty or slightly
          mismatched. The way to separate them is to read the panel-level data like a detective: compare the
          suspect against panels facing the same direction, look at how its output changes through the day, and
          check whether the gap follows the sun or stays fixed. The actual testing and any replacement happen on
          a live DC array, so they belong to your installer.
        </>
      }
      aside={{
        image: fluke393.image,
        alt: "Fluke 393 FC solar clamp meter",
        caption: (
          <>
            PV-rated clamp meters are installer tools. Homeowners diagnose from the monitoring app. See{" "}
            <Link href="/multimeters/best-multimeters-for-solar-panel-testing" className={link}>
              meters for solar panel testing
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-optimizers-work", label: "What an optimizer does, and how it fails" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "read-the-pattern", label: "Read the daily output pattern" },
        { id: "homeowner-checks", label: "Checks you can make from the ground" },
        { id: "installer-tests", label: "How an installer tests the optimizer" },
        { id: "call-installer", label: "When to call the installer" },
      ]}
      faq={[
        {
          q: "Will one bad optimizer drag down the whole string?",
          a: "Usually not by much. Optimizers exist so that one weak module doesn't set the current for the rest of the string, so the healthy panels keep producing near their normal output. You lose roughly that one panel's share. If the optimizer fails in a way that opens the series circuit, though, the whole string can drop out, and the inverter will usually raise an error.",
        },
        {
          q: "Can I swap the suspect optimizer with a neighbor's to test it?",
          a: "Not as a homeowner. It means working on a roof, disconnecting DC connectors on modules that are live whenever light falls on them, and re-registering hardware with the monitoring system. Installers do sometimes swap parts to confirm a diagnosis, under their own safety procedure and with the system shut down correctly.",
        },
        {
          q: "My panel reads zero only in the morning. Is the optimizer dead?",
          a: "Probably not. A panel that sits at zero or near zero for the first hours and then catches up with the others is almost always in shade early in the day, from a chimney, a tree, a neighboring roof or another row of panels. A failed optimizer tends to stay at zero, or stay capped, all day including at noon on a clear day.",
        },
        {
          q: "Does this work the same with microinverters?",
          a: "The detective work does. Microinverters also report per panel, and the same comparison against neighbors, at midday, on a clear day, separates shading from hardware faults. The difference is that a microinverter converts to AC on the roof, so a failure takes out that one panel's output and nothing else.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-solar-panel-with-a-multimeter",
          title: "How to Test a Solar Panel With a Multimeter",
          desc: "Open-circuit voltage and short-circuit current on a single, unconnected panel.",
        },
        {
          href: "/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter",
          title: "How to Diagnose DC Arc Fault Warnings in a Solar Inverter",
          desc: "What an arc-fault code means and why it calls for a professional inspection.",
        },
      ]}
    >
      <Callout title="Rooftop PV wiring is live whenever there is daylight">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Solar modules generate voltage as soon as light hits them. Switching off the inverter or the AC
            breaker does not make the panel wiring dead, and a string can reach several hundred volts DC.
          </li>
          <li>
            Never unplug PV connectors, open a combiner box, open the inverter, or touch rapid-shutdown or
            optimizer hardware. A DC arc does not extinguish itself the way an AC arc tends to, and
            disconnecting under load can start one.
          </li>
          <li>
            If you see scorched connectors, melted cable, smoke from the array or a burning smell, keep everyone
            away, shut the system down using the procedure on the inverter label if it is safe to reach, call
            the installer, and call 911 for any fire.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-optimizers-work" className="text-xl font-semibold mb-3">What an optimizer does, and how it fails</h2>
        <p className="text-muted leading-7 mb-4">
          An optimizer is a small DC-to-DC converter mounted behind each panel. It tracks the maximum power
          point of its own module and adjusts its output so the series string can carry a common current
          without the weakest panel dictating it. In the US, rapid-shutdown requirements in recent National
          Electrical Code editions are one reason module-level electronics are so common; in the EU and UK,
          optimizers are used mostly to deal with partial shade on complex roofs. Most optimizers also report
          per-panel data to the inverter, which is what makes your app&apos;s panel layout view possible.
        </p>
        <p className="text-muted leading-7 mb-4">
          When one fails, it tends to fail in a recognizable way. It may pass no power at all, so the panel
          reads zero while its neighbors are busy. It may limit output to a fraction of normal and stay there.
          It may lose its data link, so the app shows a gray or missing tile while the string current looks
          unaffected. Or it may cut in and out, which shows up as a jagged line where the others are smooth.
          A damaged module, a bad connector between module and optimizer, or a cracked cell string can produce
          some of the same pictures, which is why the hardware verdict needs an installer.
        </p>
        <Figure caption={<>Each panel feeds its own optimizer, and the optimizer outputs run in series to the inverter. Monitoring reports each optimizer separately, which is how one weak panel stands out.</>}>
          <OptimizerStringDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Panel low early or late, normal at midday", "Shading from a tree, chimney or vent", "Same panel across a full clear day", "Owner (trim trees); installer for layout"],
            ["Panel a few percent low every day, better after rain", "Soiling: dust, pollen, bird droppings", "Look from the ground; compare before and after rain", "Owner via a cleaning service"],
            ["Small, constant gap that never changes", "Normal module mismatch or ageing", "Gap stays within a few percent", "No action needed"],
            ["Zero all day while neighbors produce", "Failed optimizer, module or connector", "Midday reading on a clear day", "Installer (warranty claim)"],
            ["Output capped at a flat line while others curve", "Optimizer limiting or derating", "Shape of the daily curve", "Installer"],
            ["Tile gray or missing, string output normal", "Optimizer communication fault", "Inverter and gateway status", "Installer or manufacturer support"],
            ["Whole string drops, inverter shows an error", "Open string, ground or arc fault", "Error code and time", "Installer only"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The column that matters most is the second-to-last. Every shading or dirt explanation leaves the
          panel close to its neighbors at solar noon on a cloudless day, because that is when shadows are
          shortest and light is strongest. A hardware fault is indifferent to the time of day.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="read-the-pattern">Read the daily output pattern</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Open the panel-level view for a clear day, and pick the panels that share the suspect&apos;s roof
          face, tilt and orientation. Panels on a different roof plane will legitimately peak at a different
          time, so comparing an east-facing module with a south-facing one tells you nothing. Then look at
          three things: the daily energy total for each panel, the shape of each panel&apos;s curve, and the
          suspect&apos;s value at around solar noon compared with its row.
        </p>
        <Figure caption={<>Example daily energy from six panels on one roof plane. Panel 4 is near zero on a clear day while its neighbors match, which points to hardware rather than shade. Illustrative figures, not from a specific system.</>}>
          <BarChart
            items={[
              { label: "Panel 1", value: 1.62, display: "1.62 kWh" },
              { label: "Panel 2", value: 1.6, display: "1.60 kWh" },
              { label: "Panel 3", value: 1.58, display: "1.58 kWh" },
              { label: "Panel 4 (suspect)", value: 0.08, display: "0.08 kWh", highlight: true },
              { label: "Panel 5", value: 1.61, display: "1.61 kWh" },
              { label: "Panel 6", value: 1.55, display: "1.55 kWh" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          As a rough guide, panels of the same model on the same plane commonly land within a few percent of
          one another. A spread of that size is ordinary manufacturing tolerance and ageing, not a fault. A
          panel that is consistently 10 to 20% behind deserves a closer look for dirt or partial shade. A panel
          that delivers a small fraction of its neighbors, or nothing, on a bright day is the signature of a
          failed optimizer, module or connection. Repeat the comparison over several clear days before drawing
          a conclusion, since one hazy afternoon or a passing cloud can scramble a single day&apos;s numbers.
        </p>
        <p className="text-muted leading-7">
          Two more tells help. If the suspect&apos;s curve has the same smooth hump as the others but is
          shorter, something is reducing the light or the panel&apos;s capacity. If it rises normally, then
          snaps to a flat ceiling and stays there, the electronics are limiting it. Many apps let you export
          the per-panel data as a spreadsheet; a week of exports makes the installer&apos;s job much quicker.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="homeowner-checks">Checks you can make from the ground</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Walk the shadows.</span> At the times the suspect panel is low,
            go outside and look at where shadows fall. New tree growth, a satellite dish, a vent stack or a
            neighbor&apos;s extension can shade one module for a few hours without anyone noticing.
          </li>
          <li>
            <span className="text-foreground">Look, don&apos;t climb.</span> From the ground or a window,
            binoculars will show leaves, bird droppings, a cracked glass sheet or a browned patch. Leave roof
            access to the installer or a qualified cleaning service.
          </li>
          <li>
            <span className="text-foreground">Read the inverter.</span> Note any error or warning code with its
            date and time, and photograph the inverter display. Don&apos;t reset it repeatedly hoping the fault
            clears.
          </li>
          <li>
            <span className="text-foreground">Check the data link.</span> If several tiles went gray at once,
            the problem is more likely the monitoring gateway, router or the inverter&apos;s internet connection
            than a group of optimizers failing together.
          </li>
          <li>
            <span className="text-foreground">Check the layout map.</span> Installers occasionally map the
            optimizer serial numbers to the wrong positions in the app. If the &quot;weak&quot; tile sits in
            a spot that never gets shade, the physical panel it represents may be somewhere else.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={3} id="installer-tests">How an installer tests the optimizer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          You may hear the installer describe tests that sound like ordinary meter work, so it helps to know why
          they are not. With optimizers, string voltage behaves differently from a plain string: many systems
          hold each optimizer at a low safety output until the inverter signals it to start, so an open-circuit
          reading on the string does not look like the sum of the panels&apos; ratings. Interpreting it depends on
          the specific product&apos;s documentation.
        </p>
        <p className="text-muted leading-7 mb-4">
          A qualified technician will typically shut the system down by the manufacturer&apos;s procedure,
          confirm the rapid-shutdown state, and then work at the suspect position. Checks can include the
          panel&apos;s own open-circuit voltage at its leads with the optimizer bypassed, the optimizer&apos;s
          output in its safety state, a thermal camera scan for hot cells or connectors, and an IV-curve tracer,
          a dedicated PV tester that sweeps the module from short circuit to open circuit and shows whether its
          curve matches the datasheet. A DC clamp meter rated for PV voltages confirms string current under
          production without breaking the circuit. These are tools rated CAT III 1000 V or higher for DC, used
          with insulated gloves and eye protection, and they are why a homeowner&apos;s general multimeter has
          no part in this. The panel-level background is in{" "}
          <Link href="/multimeters/how-to-test-a-solar-panel-with-a-multimeter" className={link}>
            testing a single solar panel with a multimeter
          </Link>
          , which applies to an unconnected module on the ground, not a live roof array.
        </p>
        <p className="text-muted leading-7">
          If the module tests healthy and the optimizer doesn&apos;t, the optimizer is replaced and the new
          serial number is registered in the monitoring system. If the module itself is damaged, the warranty
          question shifts to the panel maker. Either way, ask for the before-and-after readings in writing.
        </p>
      </section>

      <section id="call-installer">
        <KeyIdea title="When to call the installer">
          Call the installer when a panel sits at or near zero at midday on clear days, when its output is
          capped flat while neighbors curve normally, when the inverter logs an error, or when monitoring shows
          a missing tile that a gateway restart doesn&apos;t restore. Have your exported panel data, the
          inverter&apos;s error codes and dates, and photos from the ground ready. Optimizers commonly carry long
          manufacturer warranties, and installers usually handle the claim, though labor terms vary, so read
          your installation contract. If the installer has gone out of business, the optimizer maker&apos;s
          support line can normally refer you to a certified installer. Contact your utility only if the whole
          system has stopped exporting and the inverter reports a grid fault. For other PV warning codes, see{" "}
          <Link href="/multimeters/how-to-diagnose-dc-arc-fault-warnings-in-a-solar-inverter" className={link}>
            DC arc fault warnings in a solar inverter
          </Link>
          , and if you have a battery as well,{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            a solar battery that stops charging at 80%
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters installers use on PV strings"
          items={[
            {
              name: "Fluke 393 FC",
              image: fluke393.image,
              alt: "Fluke 393 FC solar clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "CAT III 1500V, 1500 V DC, DC clamp to 999.9 A, DC power and an audio polarity alarm. Built for PV work.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D AC/DC clamp meter",
              href: "/multimeters/best-multimeters-for-solar-panel-testing",
              note: "Budget AC/DC clamp to 1000 A with 1000 V DC, rated CAT IV 600V / CAT III 1000V. No PV-specific functions.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "True RMS multimeter to 1000 V AC/DC, rated CAT IV 600V / CAT III 1000V, for checks on a panel off the roof.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
