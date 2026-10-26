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
  "Why do lights flicker when the refrigerator or AC starts? Startup current, voltage drop, shared circuits and loose neutrals, with safe checks and who to call.";

export const metadata = buildMetadata({
  title: "Why Lights Flicker When the Fridge or AC Starts",
  description,
  path: "/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts",
});

const all = getAllPicks("multimeters");
const cl445 = all.find((p) => p.name === "Klein Tools CL445")!;
const ht208d = all.find((p) => p.name === "KAIWEETS HT208D")!;
const sc480 = all.find((p) => p.name === "Fieldpiece SC480")!;

const link = "text-accent hover:underline";

/** A compressor's startup spike in current, and the matching short dip in voltage at a light. */
function StartupSpikeDiagram() {
  return (
    <svg viewBox="0 0 340 190" className="w-full h-auto" role="img" aria-label="Two stacked traces: compressor current jumps to a tall spike at startup and settles to a low running level, while the voltage at a nearby light dips for the same short moment and recovers">
      <g className="stroke-foreground" strokeWidth="1.2">
        <line x1="40" y1="20" x2="40" y2="85" />
        <line x1="40" y1="85" x2="320" y2="85" />
        <line x1="40" y1="110" x2="40" y2="170" />
        <line x1="40" y1="170" x2="320" y2="170" />
      </g>
      <polyline points="40,80 110,80 112,26 128,30 140,52 152,66 166,72 320,72" fill="none" className="stroke-accent" strokeWidth="2" />
      <polyline points="40,124 110,124 112,150 128,147 140,136 152,130 166,127 320,127" fill="none" className="stroke-accent" strokeWidth="2" />
      <g className="stroke-muted" strokeWidth="0.8" strokeDasharray="3 2">
        <line x1="111" y1="18" x2="111" y2="172" />
      </g>
      <g fontSize="9.5" className="fill-foreground">
        <text x="46" y="16">current into compressor</text>
        <text x="46" y="106">voltage at a light on the same supply</text>
      </g>
      <g fontSize="9" className="fill-muted">
        <text x="134" y="28">startup spike</text>
        <text x="200" y="66">running current</text>
        <text x="132" y="160">brief dip = visible flicker</text>
        <text x="114" y="184">compressor starts</text>
      </g>
    </svg>
  );
}

export default function WhyDoMyLightsFlickerWhenTheRefrigeratorOrAcStartsPage() {
  return (
    <HowToShell
      title="Why Do My Lights Flicker When the Refrigerator or AC Starts?"
      description={description}
      path="/multimeters/why-do-my-lights-flicker-when-the-refrigerator-or-ac-starts"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          Lights that flicker when the refrigerator or AC starts are reacting to a short burst of startup
          current. A compressor motor draws several times its running current for a fraction of a second as
          it gets moving, and that surge pulls the voltage down along every wire it shares with your lights.
          A quick, faint dip that is the same every time is usually just physics. A dip that is deep, lasts
          more than a moment, is getting worse, or makes some lights brighter while others dim points to an
          overloaded circuit, a struggling compressor or a loose neutral, and that needs attention.
        </>
      }
      aside={{
        image: cl445.image,
        alt: "Klein Tools CL445 True RMS HVAC clamp meter",
        caption: (
          <>
            A clamp meter with an inrush mode shows the size of the startup surge on a plug-in appliance. See
            the{" "}
            <Link href="/multimeters/best-multimeter-for-hvac-technicians#klein-tools-cl445" className={link}>
              Klein Tools CL445 in our HVAC guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "startup-current", label: "What startup current does" },
        { id: "how-much", label: "How deep a dip is normal" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "homeowner-checks", label: "Checks without tools" },
        { id: "meter-checks", label: "Measure the dip and the surge" },
        { id: "neutral", label: "When it is a loose neutral" },
        { id: "who-to-call", label: "Who to call" },
      ]}
      faq={[
        {
          q: "Is it normal for lights to dim when the AC kicks on?",
          a: "A brief, slight dim across the house as a central air conditioner starts is common, because its compressor draws a large surge through the service wires and the utility transformer. It becomes a concern when the dip is deep, lasts longer than a blink, has recently got worse, or comes with breakers tripping or the compressor struggling to start.",
        },
        {
          q: "Why do only the kitchen lights flicker when the fridge starts?",
          a: "The refrigerator and those lights probably share a branch circuit, so the fridge's startup surge flows through the same wire and connections that feed the lights. A long run, a heavily loaded circuit or a loose terminal on that circuit makes the dip bigger. An electrician can confirm what is on the circuit.",
        },
        {
          q: "Can a hard-start kit stop the flicker from my air conditioner?",
          a: "On some systems an HVAC technician may fit a hard-start or soft-start device to shorten or soften the compressor's startup. Whether it suits your unit depends on the equipment and the manufacturer's guidance, so ask the technician rather than adding one yourself.",
        },
        {
          q: "Could the flicker damage my appliances?",
          a: "Short, shallow startup dips are something appliances are designed to ride through. Repeated deep sags, or a neutral fault that pushes some circuits well above normal voltage, can stress motors and electronics. That second pattern is the one to act on quickly.",
        },
        {
          q: "Do LED bulbs flicker more than incandescent bulbs when a motor starts?",
          a: "They can behave differently. An incandescent filament dims smoothly during a sag because it holds heat. An LED bulb's driver may ride through a small dip with no visible change, or, in cheaper bulbs and some dimmer combinations, show a sharp blink or flutter. Swapping bulbs can change how noticeable the flicker is, but it does not change the voltage dip itself.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-check-for-voltage-fluctuations-in-your-home",
          title: "How to Check for Voltage Fluctuations in Your Home",
          desc: "Logging, Min/Max and plug-in monitors for dips that come and go.",
        },
        {
          href: "/multimeters/washing-machine-keeps-tripping-the-breaker",
          title: "Washing Machine Keeps Tripping the Breaker",
          desc: "Another appliance whose fault shows up at a particular moment.",
        },
        {
          href: "/multimeters/why-does-my-portable-generator-shut-off-when-i-plug-in-an-appliance",
          title: "Why Does My Portable Generator Shut Off?",
          desc: "Starting watts versus running watts when the supply is small.",
        },
      ]}
    >
      <Callout title="Warning signs that skip the troubleshooting">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Burning smell, a warm or discolored receptacle or switch, buzzing or crackling at the panel: switch
            off the appliance, kill power at the main if you can do so safely, and call a licensed electrician.
            Call 911 for smoke or fire.
          </li>
          <li>
            Lights going noticeably brighter, or one part of the house brightening while another dims: unplug
            sensitive electronics and call the utility or an electrician the same day.
          </li>
          <li>
            Never open the panel, the meter base, or the air conditioner&apos;s outdoor disconnect or service
            panels to investigate.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="startup-current" className="text-xl font-semibold mb-3">What startup current does</h2>
        <p className="text-muted leading-7 mb-4">
          A motor at rest has very little opposing it electrically, so when power is first applied it draws a
          large current until it spins up. Compressors are harder still, because they start against the
          pressure in the refrigerant system. This surge is called inrush or locked-rotor current, and for a
          compressor it commonly runs to several times the steady running figure, though only for a small
          fraction of a second to roughly a second.
        </p>
        <p className="text-muted leading-7 mb-4">
          Every wire, terminal and transformer between the utility and the compressor has some resistance.
          Current through resistance produces a voltage drop, so during the surge, the voltage left for
          everything else on the same path falls. The lights are simply the most visible load on that path.
          When the compressor reaches speed, the current settles and the voltage recovers, which is why the
          flicker is a single blink rather than a steady dimming.
        </p>
        <Figure caption={<>The current spike and the voltage dip happen together. A bigger spike, or more resistance in the shared wiring, means a deeper dip.</>}>
          <StartupSpikeDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="how-much" className="text-xl font-semibold mb-3">How deep a dip is normal</h2>
        <p className="text-muted leading-7 mb-4">
          The size of the dip depends on how much wire the surge shares with the lights. A refrigerator plugged
          into the same branch circuit as the kitchen lights shares the whole run back to the panel, out and
          back. A central AC on its own 240 V circuit shares only the service conductors and the utility
          transformer with the lights, so the whole house dips, but by less.
        </p>
        <p className="text-muted leading-7 mb-4">
          As a rough illustration, 12 AWG copper has a resistance of about 1.6 ohms per 1,000 feet. If a
          compressor briefly draws an assumed 30 A, the extra drop on a shared circuit grows with the length of
          the run:
        </p>
        <Figure caption={<>Illustrative arithmetic only: an assumed 30 A startup draw through 12 AWG copper, counting the wire out and back. Real dips also include the service and transformer and depend on the appliance.</>}>
          <BarChart
            items={[
              { label: "25 ft run", value: 2.4, display: "about 2.4 V" },
              { label: "50 ft run", value: 4.8, display: "about 4.8 V" },
              { label: "75 ft run", value: 7.2, display: "about 7.2 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A couple of volts for an instant is hard to notice. Seven or eight volts on a 120 V circuit is
          clearly visible. A loose terminal adds its own resistance on top, so a circuit that used to be fine
          and now flickers hard may have a connection that is starting to fail.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["Faint whole-house blink as AC starts", "Normal compressor inrush on the service", "Whether it is getting worse", "No action if stable"],
            ["Deep dip, AC hums or clicks before starting", "Weak start capacitor or hard-starting compressor", "Time from click to running", "HVAC technician"],
            ["Kitchen lights dip when the fridge cycles", "Fridge and lights on one branch circuit", "What else is on that circuit", "Electrician to split or check the circuit"],
            ["Dip worse than it used to be, warm outlet", "Loose terminal or splice on the circuit", "Stop using the outlet", "Electrician"],
            ["Some lights brighten while others dim", "Loose or failing neutral", "Readings on several circuits", "Utility or electrician, same day"],
            ["Neighbors see dips too, worse at peak times", "Undersized or overloaded utility transformer", "Ask neighbors; keep a log", "Electric utility"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="homeowner-checks">Make the checks you can do without tools</StepHeading>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Match the blink to the machine.</span> Stand where you can hear
            the fridge or the outdoor unit and watch a light. If the flicker lines up with the compressor
            starting every time, you have found the trigger.
          </li>
          <li>
            <span className="text-foreground">Note the reach.</span> One room only suggests a shared branch
            circuit; every room suggests the service or the AC&apos;s own startup.
          </li>
          <li>
            <span className="text-foreground">Listen to the start.</span> A compressor that hums, clicks off
            and retries, or takes several seconds to settle is drawing its surge for longer than it should.
          </li>
          <li>
            <span className="text-foreground">Read the panel directory.</span> If the fridge and lights are
            labeled on the same breaker, that explains a local dip. Resetting or switching breakers is fine;
            opening the cover is not.
          </li>
          <li>
            <span className="text-foreground">Remove extension cords.</span> A refrigerator on a light-duty
            cord or power strip adds resistance; plug it directly into a wall receptacle as its manual usually
            asks.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="meter-checks">Measure the dip and the surge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Two measurements turn the flicker into numbers. Use a meter rated CAT III 600V or higher, inspect the
          leads, and wear safety glasses.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">The voltage dip.</span> Put the meter&apos;s probes in a receptacle
          on the same circuit as the flickering lights, set AC volts, and start Min/Max. Wait for the fridge or
          AC to start, then read the minimum. Bear in mind that a general-purpose meter may not register the
          full depth of a very short dip. Compare with the idle reading and with the same test on a receptacle
          in another room.
        </p>
        <p className="text-muted leading-7 mb-4">
          <span className="text-foreground">The startup current.</span> For a plug-in refrigerator, put a line
          splitter between its plug and the wall and clamp the meter on the splitter&apos;s single-conductor
          loop, never around the whole cord. With an inrush mode selected, the clamp captures the surge when the
          compressor starts. Comparing that figure with the running current, and with the circuit&apos;s
          breaker rating, shows how much the appliance is asking of the circuit. Our guide to{" "}
          <Link href="/multimeters/how-to-measure-ac-current-with-a-clamp-meter" className={link}>
            measuring AC current with a clamp meter
          </Link>{" "}
          covers the technique, and the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          explains what inrush modes do.
        </p>
        <p className="text-muted leading-7">
          A central AC is hardwired at 240 V, and clamping its supply means opening the outdoor disconnect or
          an equipment panel. Leave that to an HVAC technician or electrician, who can measure its starting
          current against the nameplate locked-rotor figure.
        </p>
      </section>

      <section>
        <h2 id="neutral" className="text-xl font-semibold mb-3">When it is a loose neutral</h2>
        <p className="text-muted leading-7 mb-4">
          A US home gets two 120 V legs and a shared neutral. While the neutral is solid, a surge on one leg
          only lowers voltage a little. If the neutral connection loosens, at a splice, at the panel or out at
          the service, the two legs stop being held at their proper values. A large 120 V load on one side then
          drags that side down while the other side rises, sometimes well above normal. The giveaway is lights
          on some circuits brightening as others dim, often when the fridge, microwave or a hair dryer runs.
        </p>
        <p className="text-muted leading-7">
          This is not a flicker to live with. It can overheat connections and damage electronics on the high
          side. Unplug sensitive equipment, and call the utility, who will check their side of the meter, and
          an electrician for the house side. Our page on{" "}
          <Link href="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine" className={link}>
            half the house losing power
          </Link>{" "}
          covers the related case where one leg drops out completely.
        </p>
      </section>

      <section id="who-to-call">
        <KeyIdea title="Who to call">
          Call an HVAC technician when the air conditioner hums, clicks or labors before starting, since a weak
          start capacitor or failing compressor stretches the surge out. Call a licensed electrician when one
          circuit dips hard, a receptacle runs warm, breakers trip with the dips, or a fridge needs its own
          circuit. Call the electric utility when neighbors see it too, the whole house sags at peak times, or
          lights brighten and dim on different circuits. Call the appliance manufacturer or its service network
          if a refrigerator under warranty keeps short-cycling its compressor.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Clamp meters with an inrush mode"
          items={[
            {
              name: "Klein Tools CL445",
              image: cl445.image,
              alt: "Klein Tools CL445 True RMS HVAC clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#klein-tools-cl445",
              note: "600 A AC with inrush mode and simultaneous V + A display, CAT IV 600V. No DC amps.",
            },
            {
              name: "KAIWEETS HT208D",
              image: ht208d.image,
              alt: "KAIWEETS HT208D AC/DC clamp meter",
              href: "/multimeters/best-multimeters-for-electricians-under-100#kaiweets-ht208d",
              note: "Budget AC/DC clamp to 1000 A with AC inrush, LoZ and NCV. Resolution not published.",
            },
            {
              name: "Fieldpiece SC480",
              image: sc480.image,
              alt: "Fieldpiece SC480 HVACR power clamp meter",
              href: "/multimeters/best-multimeter-for-hvac-technicians#fieldpiece-sc480",
              note: "Inrush plus watts, VA and power factor, CAT IV 600V / CAT III 1000V. One-year warranty.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
