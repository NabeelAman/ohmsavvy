import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test a whole-house surge protector safely: read its status lights, spot failure signs, why a multimeter can't test it, and when to have it replaced.";

export const metadata = buildMetadata({
  title: "How to Test a Whole-House Surge Protector",
  description,
  path: "/multimeters/how-to-test-a-whole-house-surge-protector",
});

const all = getAllPicks("multimeters");
const fluke117 = all.find((p) => p.name === "Fluke 117")!;
const fluke87v = all.find((p) => p.name === "Fluke 87V")!;
const mm720 = all.find((p) => p.name === "Klein Tools MM720")!;

const link = "text-accent hover:underline";

/** Where Type 1, Type 2 and Type 3 surge protective devices sit in a home's supply. */
function SpdPlacementDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of a home's electrical supply from the utility meter to the main panel to a branch outlet, showing where Type 1, Type 2 and Type 3 surge protectors are installed">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="14" y="48" width="66" height="52" rx="4" />
        <rect x="138" y="48" width="66" height="52" rx="4" />
        <rect x="262" y="48" width="64" height="52" rx="4" />
        <line x1="80" y1="74" x2="138" y2="74" />
        <line x1="204" y1="74" x2="262" y2="74" />
      </g>
      <g className="stroke-accent" strokeWidth="2" fill="none">
        <rect x="94" y="108" width="34" height="22" rx="3" />
        <rect x="154" y="108" width="34" height="22" rx="3" />
        <rect x="277" y="108" width="34" height="22" rx="3" />
        <line x1="111" y1="74" x2="111" y2="108" strokeDasharray="3 2" />
        <line x1="171" y1="100" x2="171" y2="108" strokeDasharray="3 2" />
        <line x1="294" y1="100" x2="294" y2="108" strokeDasharray="3 2" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="47" y="71">utility</text>
        <text x="47" y="85">meter</text>
        <text x="171" y="71">main</text>
        <text x="171" y="85">panel</text>
        <text x="294" y="71">outlet</text>
        <text x="294" y="85">circuit</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="111" y="123">T1</text>
        <text x="171" y="123">T2</text>
        <text x="294" y="123">T3</text>
      </g>
      <text x="170" y="30" fontSize="9.5" textAnchor="middle" className="fill-muted">Type 1 line side · Type 2 at the panel · Type 3 at the outlet</text>
      <text x="170" y="156" fontSize="9.5" textAnchor="middle" className="fill-muted">T1 and T2 are hardwired: installed and replaced by an electrician</text>
    </svg>
  );
}

export default function WholeHouseSurgeProtectorTestPage() {
  return (
    <HowToShell
      title="How to Test a Whole-House Surge Protector: Warning Lights and Failure Signs"
      description={description}
      path="/multimeters/how-to-test-a-whole-house-surge-protector"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          To test a whole-house surge protector, a homeowner reads it rather than probes it. Hardwired surge
          protective devices (SPDs) mounted at the panel or meter report their own condition through status
          lights, and on some models an audible alarm or a remote contact. Those indicators, its supply
          breaker and a look at the outside of the enclosure are the safe checks. The internal parts, usually
          metal oxide varistors, wear out invisibly and can&apos;t be meaningfully tested with a multimeter, so
          deciding whether a unit with dark or red lights needs replacing is a job for an electrician.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 True RMS digital multimeter",
        caption: (
          <>
            A meter confirms your outlets have normal voltage after a storm; it does not test the SPD itself.
            See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-it-works", label: "What a whole-house SPD does" },
        { id: "signs", label: "Warning lights and failure signs" },
        { id: "safe-checks", label: "What you can safely inspect" },
        { id: "outlet-check", label: "Confirm outlet voltage after a surge" },
        { id: "not-a-meter-job", label: "Why internal testing isn't a meter job" },
        { id: "replacement", label: "When professional replacement is needed" },
      ]}
      faq={[
        {
          q: "What does it mean when the light on my whole-house surge protector is off?",
          a: "It depends on the model, so check its manual or label. On many units a lit green light means protection is present and a dark or red light means one or more protection modes have been used up. A dark light can also simply mean the SPD's breaker has tripped or the house has lost power to that leg.",
        },
        {
          q: "Can I test a whole-house surge protector with a multimeter?",
          a: "Not in any useful way. Its varistors only conduct above a clamping voltage far higher than mains, so an ohms reading on a healthy or a worn device looks much the same, and getting to its terminals means working inside a live panel. Rely on the status indicators and an electrician's assessment.",
        },
        {
          q: "How long does a whole-house surge protector last?",
          a: "There is no fixed lifespan. Each surge it absorbs wears the varistors a little, so a home with frequent storms or utility switching will use one up sooner. Treat it as a consumable part and check its lights a few times a year and after every major storm.",
        },
        {
          q: "Do I still need plug-in surge strips if I have a whole-house unit?",
          a: "Many electricians recommend layering protection: a Type 1 or Type 2 unit for surges arriving on the service, and point-of-use Type 3 devices for sensitive electronics, because some surges are generated inside the home by motors and switching.",
        },
        {
          q: "Will a whole-house surge protector protect against a direct lightning strike?",
          a: "No device in the panel can absorb a direct strike to the house. A whole-house SPD diverts surges that arrive on the service wires from nearby strikes and utility switching, which are far more common. Protection against direct strikes needs a dedicated lightning protection system with air terminals and grounding, designed by a specialist. Unplug sensitive electronics during severe storms.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-varistor-with-a-multimeter",
          title: "How to Test a Varistor With a Multimeter",
          desc: "What a meter can and can't tell you about a loose MOV on a circuit board.",
        },
        {
          href: "/multimeters/why-is-my-breaker-panel-buzzing",
          title: "Why Is My Breaker Panel Buzzing?",
          desc: "Panel noises, heat and smells that mean stop and call an electrician.",
        },
      ]}
    >
      <Callout title="Look, don't open">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never remove the SPD enclosure cover, the panel cover or the dead-front to test a surge protector.
            Hardwired SPDs connect directly to the bus and service conductors, which can carry very high fault
            current.
          </li>
          <li>
            A burning smell, a bulged or scorched enclosure, crackling or a hot panel means stop. If it is safe,
            switch off the main breaker and call a licensed electrician; call 911 if there is smoke or fire.
          </li>
          <li>
            A Type 1 SPD at the meter base, or anything on the utility side of your main breaker, is the
            utility&apos;s or an electrician&apos;s territory, never a homeowner&apos;s.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-it-works" className="text-xl font-semibold mb-3">What a whole-house SPD does</h2>
        <p className="text-muted leading-7 mb-4">
          A surge protective device sits in parallel with your electrical system. At normal voltage it does
          almost nothing. When a transient spikes far above normal, from lightning nearby or utility switching,
          its varistors drop sharply in resistance and divert the excess energy to ground and neutral for the
          microseconds the event lasts. Every surge it absorbs degrades those varistors slightly, and a large
          one can use a module up entirely. Many units include thermal disconnects that take a worn module out
          of circuit and change the indicator, which is why the lights matter so much.
        </p>
        <p className="text-muted leading-7 mb-4">
          Residential SPDs come in three placements, defined in the UL 1449 standard. A Type 1 unit can sit on
          the line side of the main breaker, including at the meter. A Type 2 unit connects on the load side,
          typically to a two-pole breaker in the main panel or alongside it. A Type 3 device is a plug-in strip
          or receptacle at the point of use. Recent editions of the National Electrical Code added a
          requirement for surge protection on dwelling services, though which edition applies depends on your
          jurisdiction.
        </p>
        <Figure caption={<>Type 1 and Type 2 units are hardwired at the service and panel; Type 3 devices plug in at the outlet. Only Type 3 devices are something a homeowner swaps.</>}>
          <SpdPlacementDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="signs" className="text-xl font-semibold mb-3">Warning lights and failure signs</h2>
        <p className="text-muted leading-7 mb-4">
          Indicator schemes vary between makers, so the label on the enclosure door or the installation manual
          is the authority. The table summarizes the common patterns and what each one asks of you.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["All status lights green", "Protection present on every mode", "Nothing; recheck after storms", "No action"],
            ["One light out or red, others green", "One protection mode or module used up", "Manual's indicator key", "Electrician replaces unit or module"],
            ["All lights dark", "SPD breaker tripped, power loss, or unit spent", "Its breaker position; whether the house has power", "Homeowner checks breaker; electrician if it stays dark"],
            ["SPD breaker trips again after one reset", "Failed SPD drawing fault current", "Leave the breaker off", "Electrician"],
            ["Audible alarm sounding", "Protection lost on a model with an alarm", "Manual's alarm meaning", "Electrician"],
            ["Discolored, bulged or smells burnt", "Unit overheated or failed short", "Nothing further: switch off main if safe", "Electrician, or 911 for smoke"],
            ["Electronics failing after storms, lights still green", "Surge entering via cable, phone or other paths", "Coax and phone grounding, plug-in protection", "Electrician or cable provider"],
          ]}
        />
      </section>

      <section>
        <h2 id="safe-checks" className="text-xl font-semibold mb-3">What you can safely inspect</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>
            <span className="text-foreground">Status lights:</span> look at them through the enclosure window or
            on the device face without touching anything. Photograph them now so you have a baseline to compare
            after the next storm.
          </li>
          <li>
            <span className="text-foreground">Its breaker:</span> a Type 2 unit is commonly fed by its own
            two-pole breaker, often labeled SPD or surge. Opening the panel door to see whether that handle has
            tripped is fine; the dead-front behind it stays on. Reset it once. If it trips again, leave it off.
          </li>
          <li>
            <span className="text-foreground">The outside of the enclosure:</span> check for discoloration,
            swelling, melted plastic or a sharp burnt smell, without opening anything.
          </li>
          <li>
            <span className="text-foreground">Remote indicators:</span> some units bring a status contact out to
            a remote light or a smart-home input. If yours does, confirm what it is reporting.
          </li>
          <li>
            <span className="text-foreground">Paperwork:</span> note the model, install date and any
            connected-equipment warranty, which usually needs the unit to have been installed correctly and its
            failure reported promptly to the manufacturer.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={1} id="outlet-check">Confirm outlet voltage after a surge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A multimeter has a real but limited role here: confirming that your house supply is healthy after a
          storm or an outage, which matters before you plug sensitive equipment back in. Use a CAT-rated meter
          with intact leads, set it to AC volts, and put the probes into the slots of a few ordinary 120 V
          receptacles on circuits fed from both halves of the panel. Readings should sit close to 120 V; US
          service is designed to stay within roughly ±5% of nominal under the ANSI C84.1 range A.
        </p>
        <p className="text-muted leading-7 mb-4">
          If outlets on one half of the house read normal and the other half reads low, high or zero, that is a
          service problem rather than an SPD problem: leave it to the utility or an electrician, and see{" "}
          <Link href="/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine" className={link}>
            why half a house can lose power with the breakers looking fine
          </Link>
          . Readings that wander up and down are covered in{" "}
          <Link href="/multimeters/how-to-check-for-voltage-fluctuations-in-your-home" className={link}>
            how to check for voltage fluctuations in your home
          </Link>
          .
        </p>
        <Figure caption={<>The homeowner&apos;s routine stays outside the panel: read the indicators, check the breaker once, confirm outlet voltage, then hand anything abnormal to a professional.</>}>
          <FlowDiagram
            steps={[
              { label: "Read lights", sub: "Against the manual's key" },
              { label: "Check its breaker", sub: "Reset once only" },
              { label: "Outlet voltage", sub: "Meter in receptacles" },
              { label: "Inspect enclosure", sub: "Heat, smell, swelling" },
              { label: "Electrician", sub: "Replaces spent unit" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="not-a-meter-job" className="text-xl font-semibold mb-3">Why internal testing isn&apos;t a meter job</h2>
        <p className="text-muted leading-7 mb-4">
          It is tempting to treat an SPD like any other component and put a meter across it. There are three
          problems. First, the terminals are inside a live panel or a sealed enclosure bonded to the service,
          which is exactly the work this site tells homeowners not to do. Second, a varistor is designed to look
          like an open circuit at normal voltage, so an ohms or diode test reads much the same on a fresh module
          as on one that has absorbed most of its rated energy. Third, the property that actually wears out, the
          clamping voltage and the energy it can still absorb, only shows up at hundreds of volts and surge
          currents no handheld meter can generate.
        </p>
        <p className="text-muted leading-7">
          A multimeter&apos;s Min/Max capture is also far too slow to record a lightning transient, which lasts
          microseconds, so a meter can&apos;t prove whether a surge reached your outlets either. Loose varistors
          on a circuit board are a different case, explained in{" "}
          <Link href="/multimeters/how-to-test-a-varistor-with-a-multimeter" className={link}>
            how to test a varistor with a multimeter
          </Link>
          , but on a whole-house unit the manufacturer&apos;s indicators are the test, and the unit&apos;s design
          assumes you will replace it rather than measure it.
        </p>
      </section>

      <section id="replacement">
        <KeyIdea title="When professional replacement is needed">
          Have a licensed electrician replace or re-module the SPD when any protection indicator is out or red,
          its breaker will not stay on, the alarm sounds, or the enclosure shows heat damage. Ask the electrician
          to confirm the unit&apos;s grounding and the length of its leads, since long, looped connections reduce
          how well it clamps. Contact the utility for a meter-base device it supplied, and the SPD manufacturer
          if you plan to claim on its connected-equipment warranty.
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="CAT-rated meters for outlet voltage checks"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS, CAT III 600V and non-contact voltage detection. Hands-on tested by OhmSavvy.",
            },
            {
              name: "Klein Tools MM720",
              image: mm720.image,
              alt: "Klein Tools MM720 True RMS digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "CAT IV 600V / CAT III 1000V with LoZ to rule out ghost voltages, True RMS and 6,000-count.",
            },
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial True RMS multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT III 1000V / CAT IV 600V with a 19,999-count high-resolution mode. Hands-on tested by OhmSavvy.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
