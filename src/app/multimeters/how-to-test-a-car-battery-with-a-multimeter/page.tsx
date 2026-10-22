import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a car battery with a multimeter: resting voltage, a state-of-charge table, the cranking test and the charging check, written for UK drivers.";

export const metadata = buildMetadata({
  title: "How to Test a Car Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-car-battery-with-a-multimeter",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const fluke = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function HowToTestACarBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Car Battery With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-car-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a car battery with a multimeter, set the dial to DC volts, put the red probe on the positive
          terminal and the black on the negative, and read the voltage after the car has stood for a few hours. A
          healthy, fully charged 12 V battery rests at about 12.6 V or a little above. Then repeat the reading while
          someone starts the engine, and again with it running, to check the battery under load and the
          alternator&apos;s charging. Three readings, five minutes, and you will know whether the battery, the
          charging system or something else is behind a slow start on a cold British morning.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter, front view",
        caption: (
          <>
            The Craftsman CMMT14171 is the automotive pick in our roundup, with RPM, dwell and duty-cycle
            functions on top of the usual ranges. Any meter with a DC volts range will run this test, though. Read
            our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-you-need", label: "What you need" },
        { id: "remove-surface-charge", label: "Remove the surface charge" },
        { id: "resting-voltage", label: "Measure the resting voltage" },
        { id: "state-of-charge", label: "Voltage vs state of charge" },
        { id: "cranking-test", label: "Do the cranking test" },
        { id: "charging-test", label: "Check the charging voltage" },
        { id: "reading-results", label: "What your readings mean" },
        { id: "stop-start-batteries", label: "AGM and EFB stop-start batteries" },
        { id: "when-a-meter-is-not-enough", label: "When a meter is not enough" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What voltage should a car battery be in the UK?",
          a: "The same as anywhere else: a standard 12 V lead-acid car battery should rest at roughly 12.6 V to 12.8 V when fully charged and left to stand. Around 12.4 V is about three-quarters charged, and anything near 12.0 V is close to flat. UK winters matter only because cold reduces the power a battery can deliver, so a marginal battery tends to show itself first in December and January.",
        },
        {
          q: "Can I test a car battery without disconnecting it?",
          a: "Yes. All three tests in this guide are done with the battery connected and in the car. Just make sure the ignition is off and nothing is drawing current for the resting test, and keep hands, leads and loose clothing clear of the fan and belts when the engine is running.",
        },
        {
          q: "Will a battery that reads 12.6 V still fail to start the car?",
          a: "It can. Voltage shows state of charge, not capacity. An ageing battery can reach a normal resting voltage yet collapse when the starter motor draws a heavy current. That is why the cranking test matters: if the voltage drops well below about 9.6 V while cranking, the battery is likely worn out even though it looked fine at rest.",
        },
        {
          q: "Is the MOT battery check the same as this test?",
          a: "No. An MOT tester checks that the battery is secure and not leaking, but it is not a capacity or charging test. A garage battery test uses a dedicated tester that measures cold cranking performance. A multimeter check at home is a good first step and catches most flat-battery and charging faults.",
        },
        {
          q: "Why does my battery keep going flat overnight?",
          a: "If the battery reads well when fully charged but is low after the car stands, something may be drawing current with the ignition off, such as a boot light, an aftermarket alarm or a module that will not go to sleep. Our guide to measuring parasitic battery drain shows how to find it with the meter on the current range.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-parasitic-battery-drain",
          title: "How to Measure Parasitic Battery Drain",
          desc: "Find what is flattening the battery while the car is parked, using the meter's current range.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "Track down corroded earth straps and tired cables that starve the starter even with a good battery.",
        },
      ]}
    >
      <Callout title="Stay safe around a car battery">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A 12 V battery will not give you a shock through dry skin, but it can deliver hundreds of amps. A
            spanner or watch strap bridging the terminals can weld, burn and crack the case.
          </li>
          <li>
            Lead-acid batteries can give off hydrogen, especially while charging. Keep sparks and flames away and
            work in a ventilated space.
          </li>
          <li>
            For the running tests, keep probes, leads and hands well away from the fan, drive belt and exhaust
            manifold, and make sure the car is in neutral or park with the handbrake on.
          </li>
          <li>Wear eye protection if the battery is old, swollen or shows any sign of leaking.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-you-need" className="text-xl font-semibold mb-3">What you need</h2>
        <p className="text-muted leading-7 mb-4">
          The kit list is short. Every one of these readings uses the DC volts range, so even a basic meter will do,
          although two decimal places on the display makes the state-of-charge table far easier to use.
        </p>
        <InfoCards
          items={[
            { label: "Digital multimeter", desc: "Set to DC volts (V with a straight line), 20 V range on a manual meter." },
            { label: "A helper", desc: "Someone to turn the key while you watch the display during cranking." },
            { label: "Clean terminals", desc: "A wire brush if the posts are white or green with corrosion." },
            { label: "Rest time", desc: "Ideally the car has not run for at least a few hours, overnight is best." },
            { label: "Eye protection", desc: "Sensible with any older battery or one that is swollen or damp." },
            { label: "Notepad", desc: "Write down all three readings: it is the pattern that tells the story." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="remove-surface-charge">Remove the surface charge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Straight after a drive or a session on a charger, a battery shows a temporarily inflated voltage known as
          surface charge. It can make a half-charged battery look full. The simplest cure is time: leave the car
          for four hours or overnight. If you cannot wait, switch the headlights on for about a minute with the
          engine off, then turn them off and wait a few minutes before measuring.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="resting-voltage">Measure the resting voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the ignition off, doors shut and nothing switched on, plug the black lead into COM and the red lead
          into the V socket. Turn the dial to DC volts. Touch the red probe firmly to the positive (+) terminal post
          and the black probe to the negative (−) post. Measure on the lead posts themselves rather than on the
          clamps or bolts so that a corroded clamp does not hide a fault.
        </p>
        <p className="text-muted leading-7 mb-4">
          If you see a minus sign in front of the number, the probes are reversed. The value is still correct;
          swap them for a cleaner reading.
        </p>
        <Figure
          caption={
            <>
              Example resting readings: a healthy, fully charged battery at 12.68 V (left) and a battery that is
              roughly half charged at 12.21 V (right). Both look &quot;about 12 volts&quot; but tell very different
              stories.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="12.68" unit="V DC" mode="V⎓  resting, full" />
            <MeterReadout value="12.21" unit="V DC" mode="V⎓  resting, ~50%" />
          </div>
        </Figure>
      </section>

      <section>
        <h2 id="state-of-charge" className="text-xl font-semibold mb-3">Car battery voltage vs state of charge</h2>
        <p className="text-muted leading-7 mb-4">
          A flooded lead-acid battery&apos;s open-circuit voltage tracks its state of charge closely, which is why
          a meter is so useful here. The figures below are approximate values at around 20 to 25 °C; a cold
          battery reads slightly lower, and battery makers publish their own tables.
        </p>
        <DataTable
          head={["Resting voltage", "Approximate charge", "What to do"]}
          rows={[
            ["12.65 V or more", "100%", "Fully charged, nothing to do"],
            ["12.45 V", "About 75%", "Fine for daily use; a long drive tops it up"],
            ["12.24 V", "About 50%", "Charge it soon; repeated time here shortens battery life"],
            ["12.06 V", "About 25%", "Charge it now with a proper charger"],
            ["11.9 V or less", "Flat", "Charge, then retest; may be sulphated or have a dead cell"],
          ]}
          mono={[0]}
        />
        <Figure
          caption={
            <>
              The same approximate table as a chart. The whole usable range spans less than one volt, so a reading
              of 12.2 V is not &quot;nearly full&quot;: it is about half.
            </>
          }
        >
          <BarChart
            items={[
              { label: "100% charged", value: 12.65, display: "12.65 V", highlight: true },
              { label: "75%", value: 12.45, display: "12.45 V" },
              { label: "50%", value: 12.24, display: "12.24 V" },
              { label: "25%", value: 12.06, display: "12.06 V" },
              { label: "Flat", value: 11.9, display: "≤ 11.9 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A battery that reads well below 12 V even after a full charge, or that drops back quickly overnight,
          often has a failed cell. One dead cell typically pulls the resting figure down to around 10.5 V.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="cranking-test">Do the cranking test</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Keep the probes on the battery posts and ask your helper to start the engine while you watch the
          display. The voltage will dip sharply as the starter motor draws its heavy current, then recover as the
          engine fires. Note the lowest figure you see. A charged, healthy battery normally stays above about
          9.6 to 10 V while cranking. If it plunges lower, the battery is struggling to deliver current even if its
          resting voltage looked fine.
        </p>
        <KeyIdea title="Catching a quick dip">
          If the car fires instantly, the dip may be too brief to read. Some meters have a MIN/MAX function that
          captures the lowest value for you. Without one, watch closely or repeat the start a couple of times,
          leaving a minute between attempts so the starter does not overheat.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="charging-test">Check the charging voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the engine idling, measure across the battery again. Now you are reading the alternator&apos;s
          output, not the battery itself. On most cars it should sit somewhere around 13.7 to 14.7 V. Switch on
          the headlights, heated rear window and blower: the figure may dip briefly but should settle back within
          that band. Some modern cars with smart charging vary the voltage deliberately and may read lower at
          times, so check the handbook if a newer car seems to sit near 12.5 V.
        </p>
        <Figure caption={<>The full test sequence. The battery tests come first; the charging test checks the alternator and regulator.</>}>
          <FlowDiagram
            steps={[
              { label: "Rest", sub: "Car off for a few hours" },
              { label: "Resting volts", sub: "12.6 V+ = full" },
              { label: "Crank", sub: "Stays above ~9.6–10 V" },
              { label: "Idle", sub: "13.7–14.7 V typical" },
              { label: "Load", sub: "Lights on, still in band" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="reading-results" className="text-xl font-semibold mb-3">What your readings mean</h2>
        <DataTable
          head={["Pattern", "Likely cause"]}
          rows={[
            ["Resting 12.6 V, cranking above 10 V, running 14 V", "Battery and charging system healthy; look elsewhere (starter, cables)"],
            ["Resting low, recovers after a full charge and holds", "Battery was simply discharged: short trips, lights left on, or a parasitic drain"],
            ["Resting fine, cranking collapses below 9.6 V", "Battery has lost capacity and is near the end of its life"],
            ["Running voltage stays near the resting figure", "Alternator not charging: belt, wiring, fuse or alternator fault"],
            ["Running voltage above about 15 V", "Overcharging, often a regulator fault; can boil a flooded battery"],
            ["Resting around 10.5 V after charging", "Likely a shorted cell; replace the battery"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the battery and alternator both pass but the car still cranks slowly, the problem is often in the
          heavy cables and earth straps between them.{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            Checking voltage drop
          </Link>{" "}
          across each connection will find a corroded joint quickly.
        </p>
      </section>

      <section>
        <h2 id="stop-start-batteries" className="text-xl font-semibold mb-3">AGM and EFB stop-start batteries</h2>
        <p className="text-muted leading-7">
          Many cars sold in the UK over the last decade have stop-start, which uses an AGM (absorbent glass mat)
          or EFB (enhanced flooded battery). The meter test is the same, but AGM batteries usually rest slightly
          higher than flooded ones when full, often around 12.8 V. These cars frequently have a battery
          monitoring sensor on the negative terminal: measure on the battery post itself, not on the sensor, and
          note that many need the new battery registering with a diagnostic tool when you replace it.
        </p>
      </section>

      <section>
        <h2 id="when-a-meter-is-not-enough" className="text-xl font-semibold mb-3">When a multimeter is not enough</h2>
        <p className="text-muted leading-7">
          A multimeter measures voltage, which tells you state of charge and gives a rough feel for health under
          cranking. It cannot measure cold cranking amps (CCA) directly. If your readings are borderline, a
          dedicated battery tester or a free test at a motor factor or garage will give a clearer verdict on
          capacity before you spend money on a replacement.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use for car battery testing</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with a DC volts range works. A MIN/MAX hold helps catch the cranking dip, and if you
          plan to go further into car diagnostics, an automotive meter adds functions such as RPM and duty cycle.
          See our{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          guide for the full comparison.
        </p>
        <ProductStrip
          title="Meters from our reviews"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "True RMS, CAT III 600V, with RPM, dwell and duty-cycle functions for automotive diagnostics.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging, True RMS and backlit. Our budget pick for home and hobby use.",
            },
            {
              name: "Fluke 117",
              image: fluke.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V, non-contact voltage detection. Our best overall pick.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
