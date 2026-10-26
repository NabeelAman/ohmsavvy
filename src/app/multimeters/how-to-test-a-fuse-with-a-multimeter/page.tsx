import Link from "next/link";
import {
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
  "Test a removed fuse with a multimeter: continuity or ohms across the end caps, what a good and a blown reading look like, and which fuses need another method.";

export const metadata = buildMetadata({
  title: "How to Test a Fuse With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-fuse-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const uniT = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Probe placement on the two end caps of a cartridge fuse. */
function FuseProbeDiagram() {
  return (
    <svg viewBox="0 0 340 150" className="w-full h-auto" role="img" aria-label="Multimeter probes touching both metal end caps of a glass cartridge fuse">
      <g fill="none" strokeLinecap="round">
        <rect x="110" y="55" width="120" height="40" rx="6" className="stroke-foreground" strokeWidth="1.8" />
        <rect x="90" y="52" width="26" height="46" rx="4" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.5" />
        <rect x="224" y="52" width="26" height="46" rx="4" className="fill-[#b9bec4] stroke-foreground" strokeWidth="1.5" />
        <path d="M116 75 C140 62, 155 88, 170 75 S200 62, 224 75" className="stroke-foreground" strokeWidth="1.4" />
        <path d="M40 20 L95 62" stroke="#d13b3b" strokeWidth="5" />
        <path d="M300 20 L245 62" stroke="#1a1d21" strokeWidth="5" />
      </g>
      <text x="40" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">red (VΩ)</text>
      <text x="300" y="14" fontSize="11" textAnchor="middle" className="fill-foreground">black (COM)</text>
      <text x="170" y="122" fontSize="11" textAnchor="middle" className="fill-muted">fuse element inside the glass</text>
      <text x="103" y="140" fontSize="10" textAnchor="middle" className="fill-muted">end cap</text>
      <text x="237" y="140" fontSize="10" textAnchor="middle" className="fill-muted">end cap</text>
    </svg>
  );
}

export default function HowToTestAFuseWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Fuse With a Multimeter"
      description={description}
      path="/multimeters/how-to-test-a-fuse-with-a-multimeter"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          To test a fuse with a multimeter, take it out of the circuit, set the meter to continuity or the
          lowest resistance range, and touch one probe to each end of the fuse. A good fuse beeps or reads
          close to zero ohms; a blown fuse reads OL. That is the whole test, and it works on glass, ceramic,
          blade and most cartridge fuses. The details below cover the cases where the reading needs a
          second look, and the fuses that need a different method.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s digital multimeter",
        caption: (
          <>
            Any meter with a continuity beeper does this test. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "before-you-start", label: "Before you start" },
        { id: "step-remove", label: "1. Isolate and remove the fuse" },
        { id: "step-set", label: "2. Set the meter and check the leads" },
        { id: "step-probe", label: "3. Probe both ends" },
        { id: "step-read", label: "4. Read the result" },
        { id: "by-fuse-type", label: "Fuse types and where to probe" },
        { id: "misleading-readings", label: "Readings that mislead" },
      ]}
      faq={[
        {
          q: "Should I use continuity mode or resistance mode to test a fuse?",
          a: "Either works. Continuity is quicker because you only listen for the beep. Resistance mode tells you more: a healthy fuse reads a fraction of an ohm, and an unusually high value on a fuse that still beeps is worth noticing. On very small fuses, rated in milliamps, resistance mode is the better choice because their normal resistance can sit near the beep threshold.",
        },
        {
          q: "Can a fuse look fine but still be blown?",
          a: "Yes. Ceramic and sand-filled fuses hide the element completely, and a glass fuse can break right under the end cap where you cannot see it. The meter reading is what decides, not the appearance.",
        },
        {
          q: "Why does my fuse beep but the circuit still has no power?",
          a: "The fuse may be good and the fault elsewhere: a corroded or loose fuse holder, a broken wire, a tripped switch or a failed component downstream. Measure voltage on both sides of the fitted fuse with the circuit powered, as our guide to testing a fuse without removing it describes, to see where the supply stops.",
        },
        {
          q: "Can I replace a blown fuse with a higher-rated one if it keeps blowing?",
          a: "No. The rating protects the wiring and the device; a larger fuse lets a fault draw enough current to overheat cables or start a fire. A fuse that blows repeatedly is reporting a fault, such as a short or an overload, that needs finding first. Replace like for like: same current rating, voltage rating, speed (fast or slow-blow) and size.",
        },
        {
          q: "How do I read the rating printed on a fuse before replacing it?",
          a: "Glass and ceramic cartridges are usually stamped on an end cap with the current, often a letter for speed and the voltage, for example T2AL250V: T means time-delay (slow-blow), F means fast, 2A is the current, L means low breaking capacity and 250V is the maximum voltage. Blade fuses use color plus a molded number for amps. Match every part of that code.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "The live voltage-drop method, for fuses you cannot easily pull.",
        },
        {
          href: "/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter",
          title: "How to Test a 13 Amp Plug Fuse",
          desc: "The same continuity test applied to the fuse inside a UK plug.",
        },
      ]}
    >
      <section id="before-you-start">
        <h2 className="text-xl font-semibold mb-3">Before you start</h2>
        <p className="text-muted leading-7 mb-4">
          You need a digital multimeter with a continuity or low ohms range, and the fuse itself. Nothing
          else, apart from a replacement of exactly the same rating if the old one turns out to be blown.
          The four steps run in this order every time:
        </p>
        <FlowDiagram
          steps={[
            { label: "Isolate", sub: "Power off, remove the fuse" },
            { label: "Set meter", sub: "Continuity or lowest Ω" },
            { label: "Probe", sub: "One lead on each end" },
            { label: "Read", sub: "≈0 Ω good, OL blown" },
          ]}
        />
      </section>

      <section id="step-remove">
        <StepHeading n={1}>Isolate and remove the fuse</StepHeading>
        <p className="text-muted leading-7">
          Switch the device off and unplug it, or turn off the circuit at the breaker or isolator. In a
          car, turn the ignition off. Then pull the fuse with a fuse puller or insulated pliers. Testing it
          out of its holder matters: left in place, the meter can read through other parts of the circuit
          connected in parallel with the fuse and report continuity across a fuse that is actually open.
        </p>
      </section>

      <Callout title="Never resistance-test a fuse that is still in a live circuit">
        Continuity and ohms ranges are designed for unpowered parts. Probing a live fuse on those ranges
        gives meaningless readings and, at mains voltage, can damage the meter. If the fuse has to stay in
        place, use the voltage method in our{" "}
        <Link href="/multimeters/how-to-test-a-fuse-without-removing-it" className={link}>
          guide to testing a fuse without removing it
        </Link>{" "}
        instead.
      </Callout>

      <section id="step-set">
        <StepHeading n={2}>Set the meter and check the leads</StepHeading>
        <p className="text-muted leading-7">
          Plug the black lead into COM and the red lead into the VΩ jack. Turn the dial to continuity (the
          sound-wave icon) or, on a manual-ranging meter, the lowest ohms range, usually 200Ω. Touch the
          probe tips together: the meter should beep and show a fraction of an ohm. That figure is the
          resistance of your test leads; if your meter has a REL or Δ button, press it now to subtract it
          from the readings that follow. Not sure which icon is which? Our{" "}
          <Link href="/multimeters/multimeter-symbols-explained" className={link}>
            multimeter symbols guide
          </Link>{" "}
          decodes the dial.
        </p>
      </section>

      <section id="step-probe">
        <StepHeading n={3}>Probe both ends</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Hold one probe on each metal end of the fuse. Polarity does not matter. Press firmly enough to cut
          through any tarnish on the caps or blades, and keep your fingers off the metal, since on the high
          ohms ranges your body resistance can show up in the reading.
        </p>
        <Figure caption="Probe placement on a glass cartridge fuse: one lead on each metal end cap. The same idea applies to blade fuses (one lead on each blade) and ceramic cartridges.">
          <FuseProbeDiagram />
        </Figure>
      </section>

      <section id="step-read">
        <StepHeading n={4}>Read the result</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A good fuse is just a short piece of conductor, so it reads very low resistance and the meter
          beeps. A blown fuse has a gap in its element, so there is no path at all and the display shows OL.
        </p>
        <Figure caption="A good fuse (left) reads a fraction of an ohm. A blown fuse (right) reads OL, meaning an open circuit.">
          <div className="grid grid-cols-2 gap-4">
            <MeterReadout value="0.2" unit="Ω" mode="CONTINUITY" />
            <MeterReadout value="OL" unit="Ω" mode="CONTINUITY" />
          </div>
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Reading", "Meaning", "Next step"]}
            rows={[
              ["Beep, about 0–1 Ω", "Fuse is intact", "Look for the fault elsewhere: holder, wiring, switch, load"],
              ["A few ohms, small mA-rated fuse", "Usually normal for low-current fuses", "Compare with a new fuse of the same rating"],
              ["Value that jumps or flickers", "Poor contact or a cracked element", "Clean the caps, re-probe; replace if it persists"],
              ["OL", "Fuse is blown (open)", "Replace like for like, then find why it blew"],
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          OL here is the expected reading for an open circuit, not an error; our explainer on{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means on a multimeter
          </Link>{" "}
          covers how its meaning shifts in other modes.
        </p>
      </section>

      <section id="by-fuse-type">
        <h2 className="text-xl font-semibold mb-3">Fuse types and where to probe</h2>
        <DataTable
          head={["Fuse type", "Where to probe", "Notes"]}
          rows={[
            ["Glass cartridge", "Both metal end caps", "A visible break or dark smudge confirms it, but always measure"],
            ["Ceramic cartridge", "Both metal end caps", "Element is hidden; the meter is the only check"],
            ["Automotive blade", "The two exposed test points on top, or the blades", "Top test points let you check without pulling, but pull it for a clean reading"],
            ["UK 13A plug fuse", "Both end caps", "Step by step in our 13 amp plug fuse guide"],
            ["Thermal fuse (appliances)", "Both leads", "One-shot heat cut-off; see the thermal fuse guide"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Two of those have their own walkthroughs:{" "}
          <Link href="/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter" className={link}>
            testing a 13 amp plug fuse
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-thermal-fuse-with-a-multimeter" className={link}>
            testing a thermal fuse
          </Link>
          . Resettable PTC fuses and circuit breakers behave differently: a PTC rises to a high resistance
          while it is hot and recovers as it cools, so test it cold, and a breaker is checked with the
          circuit&apos;s own load, not as a removed part.
        </p>
      </section>

      <section id="misleading-readings">
        <h2 className="text-xl font-semibold mb-3">Readings that mislead</h2>
        <p className="text-muted leading-7">
          Most false results come from the setup, not the fuse. Probing a fuse still in its holder can show
          continuity through the rest of the circuit. A meter whose own battery is low may beep late or
          not at all. Dirty or corroded caps add resistance and can make a good fuse read open until you
          clean them. And if the meter shows nothing on any test, check that it isn&apos;t the meter&apos;s
          own fuse that has gone, which happens after a current measurement on the wrong jack. For a car
          circuit where one side of the fuse has power and the other doesn&apos;t, our guide to{" "}
          <Link href="/multimeters/car-fuse-power-on-one-side-only" className={link}>
            power on one side of a car fuse only
          </Link>{" "}
          works through the possibilities.
        </p>
      </section>

      <section>
        <KeyIdea title="The rule of thumb">
          Out of circuit, near zero ohms means good and OL means blown. Anything in between is a reason to
          re-probe, clean the contacts or compare against a new fuse of the same rating before you decide.
        </KeyIdea>
      </section>

      <ProductStrip
        title="Meters with a fast continuity beeper"
        items={[
          { name: kaiweets.name, image: kaiweets.image, alt: "KAIWEETS KM200s multimeter", href: "/multimeters/kaiweets-km200s-review", note: "Affordable auto-ranging meter for home fuse checks." },
          { name: uniT.name, image: uniT.image, alt: "UNI-T UT139C multimeter", href: "/multimeters/uni-t-ut139c-review", note: "Budget True RMS meter with auto and manual ranging." },
          { name: fluke117.name, image: fluke117.image, alt: "Fluke 117 multimeter", href: "/multimeters/fluke-117-review", note: "Electrician's meter for household and panel work." },
        ]}
      />
    </HowToShell>
  );
}
