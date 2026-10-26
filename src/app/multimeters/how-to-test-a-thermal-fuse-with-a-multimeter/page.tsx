import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
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
  "How to test a thermal fuse with a multimeter in a dryer or coffee maker: unplug, read continuity, tell a one-shot fuse from a thermostat and find the cause.";

export const metadata = buildMetadata({
  title: "How to Test a Thermal Fuse With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function HowToTestAThermalFuseWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Thermal Fuse With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter"
      category="multimeters"
      published="2026-10-22"
      intro={
        <>
          A thermal fuse is a one-time temperature switch that cuts power when an appliance overheats. When a
          dryer stops heating, a coffee maker won&apos;t warm up, or a fan heater stays dead, it&apos;s one of
          the first parts to check. Testing a thermal fuse with a multimeter takes a minute: unplug, isolate it,
          and read resistance across it. A good one reads near zero ohms; a blown one reads open. The harder
          part is working out why it blew.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter",
        caption: (
          <>
            Any meter with continuity or a low-ohms range will test a thermal fuse. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "safety", label: "Unplug before you start" },
        { id: "fuse-vs-thermostat", label: "Thermal fuse vs thermal cutoff" },
        { id: "locate", label: "1. Locate and isolate it" },
        { id: "measure", label: "2. Measure resistance" },
        { id: "check-thermostats", label: "3. Check the thermostats too" },
        { id: "diagnosis", label: "Reading the results" },
        { id: "root-cause", label: "Why it blew" },
      ]}
      faq={[
        {
          q: "Can a thermal fuse be reset?",
          a: "No. A true thermal fuse is a one-shot device: once it reaches its rated temperature, an internal pellet or alloy melts and the circuit stays open permanently. Parts that close again on their own when they cool, or that have a reset button, are thermostats or thermal cutoffs, which are a different component even though they may look similar.",
        },
        {
          q: "What temperature rating should a replacement thermal fuse have?",
          a: "Exactly the same as the original, which is printed on the body or listed in the appliance's parts list, along with the same current and voltage rating. A higher-temperature fuse can let the appliance get hot enough to damage parts or start a fire before it acts. For appliances, use the manufacturer's replacement part where one exists.",
        },
        {
          q: "Why does my dryer thermal fuse keep blowing?",
          a: "The most common cause is restricted airflow: a lint-clogged exhaust vent, a crushed duct, or a blocked lint screen housing, which lets heat build up in the drum. A cycling thermostat stuck closed or a heating element shorting to the cabinet can also do it. Clear and check the full vent run and test the thermostats before fitting another fuse.",
        },
        {
          q: "Can I test a thermal fuse without removing it?",
          a: "Often you can, if the appliance is unplugged and you pull one wire off the fuse's terminals so nothing else is measured in parallel. With both wires attached, the meter can read through other parts of the circuit and show a misleading value. Removing one connector is quicker than removing the whole fuse and just as reliable.",
        },
        {
          q: "Can I solder a new thermal fuse in place?",
          a: "Be careful. The heat from soldering close to the body can trip a new thermal fuse before it's ever used. Crimp connections are the usual method for appliance fuses; if you must solder, keep the joint well away from the body, heat-sink the lead between the joint and the fuse, and work quickly. Test it again with the meter after fitting.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "The same open-or-closed logic for ordinary current fuses, tested in place.",
        },
        {
          href: "/multimeters/how-to-test-a-thermistor-with-a-multimeter",
          title: "How to Test a Thermistor With a Multimeter",
          desc: "The temperature sensors that sit near thermal fuses in many appliances.",
        },
      ]}
    >
      <section id="safety">
        <Callout title="Unplug the appliance first">
          Thermal fuses sit in the mains-powered heater circuit. Unplug the appliance, or for a hard-wired or
          240V dryer, switch it off at the breaker, before removing any panel. Let heating elements cool, and
          never test a thermal fuse for continuity on a powered appliance.
        </Callout>
      </section>

      <section>
        <h2 id="fuse-vs-thermostat" className="text-xl font-semibold mb-3">Thermal fuse vs thermostat and thermal cutoff</h2>
        <p className="text-muted leading-7 mb-4">
          Appliances often carry several temperature-protection parts in the same circuit, and they behave
          differently on a meter. Knowing which one you have stops you condemning a part that is simply doing
          its job.
        </p>
        <InfoCards
          items={[
            { label: "Thermal fuse (one-shot)", desc: "Closed until it reaches its rated temperature, then open forever. Must be replaced." },
            { label: "Auto-reset thermostat", desc: "A bimetal disc that opens when hot and closes again as it cools. Reads closed at room temperature." },
            { label: "Manual-reset cutoff", desc: "Opens when overheated and stays open until you press its reset button." },
            { label: "Cycling thermostat", desc: "Switches the heater on and off in normal use to hold the working temperature." },
          ]}
        />
        <Figure
          caption={
            <>
              A typical heater circuit. The thermal fuse sits in series with the element and the thermostats,
              so any one of them opening kills the heat. This is why each part is tested on its own.
            </>
          }
        >
          <svg viewBox="0 0 320 130" className="w-full h-auto" role="img" aria-label="Schematic of an appliance heater circuit with a thermal fuse, high-limit thermostat and cycling thermostat in series with the heating element">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <line x1="20" y1="40" x2="60" y2="40" />
              <rect x="60" y="32" width="44" height="16" rx="8" className="stroke-accent" strokeWidth="2" />
              <line x1="104" y1="40" x2="135" y2="40" />
              <line x1="135" y1="40" x2="160" y2="30" />
              <line x1="160" y1="40" x2="190" y2="40" />
              <line x1="190" y1="40" x2="215" y2="30" />
              <line x1="215" y1="40" x2="245" y2="40" />
              <path d="M245 40 l6 -8 l6 16 l6 -16 l6 16 l6 -16 l6 8" />
              <line x1="281" y1="40" x2="300" y2="40" />
              <line x1="300" y1="40" x2="300" y2="100" />
              <line x1="300" y1="100" x2="20" y2="100" />
            </g>
            <text x="82" y="66" fontSize="9" textAnchor="middle" className="fill-accent">thermal fuse</text>
            <text x="147" y="66" fontSize="9" textAnchor="middle" className="fill-muted">high limit</text>
            <text x="202" y="66" fontSize="9" textAnchor="middle" className="fill-muted">cycling</text>
            <text x="263" y="66" fontSize="9" textAnchor="middle" className="fill-muted">element</text>
            <text x="20" y="32" fontSize="9" className="fill-foreground">L</text>
            <text x="20" y="116" fontSize="9" className="fill-foreground">N / L2</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="locate">Locate and isolate the fuse</StepHeading>
        <p className="text-muted leading-7">
          In dryers the thermal fuse is usually on the blower housing or the heater duct, behind the rear or
          lower front panel; in coffee makers and kettles it is typically clipped against the heating plate
          under the base. The service manual or wiring diagram, often taped inside the cabinet, shows the
          location. Photograph the wiring, then pull one wire off the fuse so the meter only sees the fuse.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure">Measure resistance across it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity or the lowest ohms range and touch one probe to each terminal. Polarity
          doesn&apos;t matter. A good thermal fuse reads essentially the same as the shorted test leads, a
          fraction of an ohm. A blown fuse reads OL. There is rarely anything in between: a fuse showing a
          high but finite value should be treated as faulty.
        </p>
        <Figure
          caption={
            <>
              An intact thermal fuse reading 0.2 Ω, the same as the leads alone, next to a blown fuse
              reading OL, an open circuit.
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="Ω" mode="Ω  good fuse" />
            <MeterReadout value="OL" unit="MΩ" mode="Ω  blown fuse" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="check-thermostats">Check the thermostats too</StepHeading>
        <p className="text-muted leading-7">
          Test the high-limit and cycling thermostats the same way at room temperature: each should read
          closed. A thermostat that reads open while cold has failed. One that reads closed is not proven good,
          because the classic failure is a cycling thermostat that sticks closed and never opens, letting the
          temperature climb until the fuse blows.
        </p>
      </section>

      <section>
        <h2 id="diagnosis" className="text-xl font-semibold mb-3">Reading the results</h2>
        <DataTable
          head={["Part", "Reading at room temperature", "Meaning"]}
          rows={[
            ["Thermal fuse", "Near 0 Ω", "Intact; look elsewhere for the fault"],
            ["Thermal fuse", "OL", "Blown; replace it and find the cause"],
            ["Auto-reset thermostat", "Near 0 Ω", "Closed as expected (may still stick closed when hot)"],
            ["Auto-reset thermostat", "OL when fully cool", "Failed open; replace"],
            ["Manual-reset cutoff", "OL", "Tripped; press reset and retest, then find why it tripped"],
          ]}
        />
      </section>

      <section id="root-cause">
        <KeyIdea title="A blown thermal fuse is a symptom, never the fault">
          The fuse opened because something got too hot. Swapping it without fixing the cause means the next
          one blows too, or worse, the appliance overheats. In dryers, check the whole exhaust vent run for
          lint and crushed ducting, and test the thermostats and the element&apos;s resistance to the cabinet.
          Never bridge a thermal fuse with a wire, even briefly, to see whether the appliance works: it is the
          last line of defense against a fire.
        </KeyIdea>
        <p className="text-muted leading-7 mt-4">
          If you&apos;re new to reading an open circuit, our{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            guide to what OL means
          </Link>{" "}
          explains why that reading confirms a blown fuse rather than a meter problem.
        </p>
      </section>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for appliance fuse checks</h2>
        <p className="text-muted leading-7 mb-6">
          The fuse test itself is an unpowered continuity check, but the same meter usually ends up confirming
          the outlet, the cord and the heating element afterwards. A backlit display helps inside a dark
          dryer cabinet, and a CAT rating matters once you move on to live checks at the outlet.
        </p>
        <ProductStrip
          title="Meters for dryer and appliance repair"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V, 6,000-count backlit display, plus capacitance for motor start capacitors. Hands-on Tested.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 electrician's digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Adds NCV and a LoZ mode to the 115's feature set, useful for confirming an appliance circuit is dead. Hands-on Tested.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s budget True RMS multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS with auto-ranging, NCV and a backlight. CAT II 600V, so keep it to appliance and outlet work.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
