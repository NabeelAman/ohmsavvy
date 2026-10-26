import Link from "next/link";
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
  "How to test a 13 amp plug fuse with a multimeter: open the BS 1363 plug, check the BS 1362 fuse for continuity, read the result and fit the right rating.";

export const metadata = buildMetadata({
  title: "How to Test a 13 Amp Plug Fuse With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;
const extech = picks.find((p) => p.name === "Extech EX330")!;
const unit = picks.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Inside of a UK BS 1363 plug, cover removed, cable entering at the bottom. */
function PlugDiagram() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-auto max-w-sm mx-auto" role="img" aria-label="Wiring inside a UK 13 amp plug: earth at the top, live with the fuse on the right, neutral on the left">
      <rect x="30" y="20" width="240" height="250" rx="26" className="fill-surface stroke-foreground" strokeWidth="2" />
      {/* earth pin, top center */}
      <rect x="138" y="44" width="24" height="40" rx="3" className="fill-surface-raised stroke-foreground" strokeWidth="1.5" />
      {/* neutral pin, left */}
      <rect x="66" y="140" width="34" height="24" rx="3" className="fill-surface-raised stroke-foreground" strokeWidth="1.5" />
      {/* live pin, right, with fuse holder above */}
      <rect x="200" y="140" width="34" height="24" rx="3" className="fill-surface-raised stroke-foreground" strokeWidth="1.5" />
      <rect x="196" y="78" width="42" height="18" rx="9" className="fill-accent/20 stroke-accent" strokeWidth="1.5" />
      <line x1="217" y1="96" x2="217" y2="140" className="stroke-foreground" strokeWidth="1.5" />
      {/* cable grip and cable */}
      <rect x="118" y="232" width="64" height="14" rx="3" className="fill-none stroke-foreground" strokeWidth="1.5" />
      <rect x="132" y="246" width="36" height="40" className="fill-surface-raised stroke-foreground" strokeWidth="1.5" />
      {/* cores */}
      <path d="M150 232 C150 170 150 120 150 84" stroke="#3a9a3a" strokeWidth="4" fill="none" strokeDasharray="8 6" />
      <path d="M150 232 C150 170 150 120 150 84" stroke="#e8c200" strokeWidth="4" fill="none" strokeDasharray="8 6" strokeDashoffset="7" />
      <path d="M140 232 C120 200 90 190 83 164" stroke="#2f6fd6" strokeWidth="4" fill="none" />
      <path d="M160 232 C190 200 210 110 217 96" stroke="#8a5a2b" strokeWidth="4" fill="none" />
      <g fontSize="11" className="fill-foreground">
        <text x="150" y="38" textAnchor="middle">Earth (green/yellow)</text>
        <text x="83" y="115" textAnchor="middle">Neutral</text>
        <text x="83" y="131" textAnchor="middle" className="fill-muted">blue, left</text>
        <text x="217" y="181" textAnchor="middle">Live</text>
        <text x="217" y="197" textAnchor="middle" className="fill-muted">brown, right</text>
        <text x="250" y="74" textAnchor="end" className="fill-accent">BS 1362 fuse</text>
        <text x="190" y="262" textAnchor="start" className="fill-muted">cable grip</text>
      </g>
    </svg>
  );
}

export default function HowToTestA13AmpPlugFuseWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a 13 Amp Plug Fuse With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a 13 amp plug fuse with a multimeter, unplug the appliance, open the plug, lift out the small
          cartridge fuse and touch one probe to each metal end cap with the meter on continuity or the lowest
          ohms range. A good fuse beeps or reads well under 1 Ω; a blown fuse shows OL. The whole job takes two
          minutes and tells you whether a dead kettle, lamp or extension lead needs a new fuse or has a fault
          further in. This guide covers the BS 1362 fuses found in every standard UK plug.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s True RMS digital multimeter, front view",
        caption: (
          <>
            The KAIWEETS KM200s, our budget pick for home use, has continuity and resistance ranges, which is all
            a fuse check needs. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-a-plug-fuse-works", label: "How a plug fuse works" },
        { id: "unplug-and-open", label: "Unplug and open the plug" },
        { id: "remove-the-fuse", label: "Remove the fuse" },
        { id: "set-the-meter", label: "Set the meter" },
        { id: "probe-the-fuse", label: "Probe the end caps" },
        { id: "read-the-result", label: "Reading the result" },
        { id: "fuse-ratings", label: "Choosing the right rating" },
        { id: "why-it-blew", label: "Why did the fuse blow?" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can you tell if a plug fuse is blown just by looking at it?",
          a: "Usually not. BS 1362 fuses have an opaque ceramic body, so you cannot see the wire inside the way you can with a glass fuse. A blackened or cracked fuse is clearly suspect, but most blown plug fuses look perfectly normal. A two-second continuity test is the only reliable check.",
        },
        {
          q: "Is it safe to put a 13 A fuse in every plug?",
          a: "Not always. The plug fuse protects the flexible cable between the plug and the appliance. A thin lamp flex can overheat well before a 13 A fuse blows, so low-power appliances with thin cables often use a 3 A fuse. Follow the appliance manufacturer's instructions; if in doubt, appliances up to about 700 W commonly use 3 A and heaters, kettles and similar loads use 13 A.",
        },
        {
          q: "Do molded plugs have a fuse you can test?",
          a: "Yes. Most molded UK plugs have a small fuse carrier on the pin face that you can prise open with a flat screwdriver to remove the fuse. Test it exactly as you would one from a rewireable plug. If the carrier is missing or broken, the plug is not safe to use.",
        },
        {
          q: "My new fuse blew straight away. What now?",
          a: "Stop replacing fuses. A fuse that blows immediately is telling you there is a fault, such as a damaged cable, a failed appliance component or water ingress. Do not fit a higher-rated fuse to get round it. Have the appliance checked or repaired, or replace it.",
        },
        {
          q: "What resistance should a good 13 A plug fuse read?",
          a: "A tiny fraction of an ohm, so most meters will show a reading close to their own lead resistance, typically somewhere around 0.1 to 0.5 Ω including the leads. Lower-rated fuses use thinner wire and can read slightly higher. Any value under about 1 Ω means the fuse is intact; the exact figure does not matter for this check.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-fuse-without-removing-it",
          title: "How to Test a Fuse Without Removing It",
          desc: "The voltage-drop method for car blade fuses and other fuses you cannot easily pull out.",
        },
        {
          href: "/multimeters/what-does-ol-mean-on-a-multimeter",
          title: "What Does OL Mean on a Multimeter?",
          desc: "Why a blown fuse shows OL, and the other situations where the display reads over limit.",
        },
      ]}
    >
      <Callout title="Unplug first, always">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Switch off at the socket and pull the plug out before you open it. Never open a plug or touch its
            fuse while it is plugged in, even if the socket switch is off.
          </li>
          <li>
            Continuity and ohms modes put their own small voltage through the part. Using them on anything live
            gives meaningless readings and can damage the meter.
          </li>
          <li>
            If the plug is cracked, scorched or the cable is damaged where it enters, replace the plug or the
            lead rather than reusing it.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-a-plug-fuse-works" className="text-xl font-semibold mb-3">How a UK plug fuse works</h2>
        <p className="text-muted leading-7 mb-4">
          Every standard UK plug (BS 1363) carries a cartridge fuse made to BS 1362, connected in the live
          conductor. Inside the ceramic body is a thin wire sized to melt if the current runs too high for too
          long. When it melts, the circuit opens and the appliance goes dead. That is why a multimeter test is so
          simple: an intact fuse is a near-perfect conductor, and a blown one is an open circuit.
        </p>
        <Figure
          caption={
            <>
              Inside a rewireable UK plug with the cover off: brown live to the fuse on the right, blue neutral to
              the left, green/yellow earth to the top pin. The fuse sits between the live pin and the brown core.
            </>
          }
        >
          <PlugDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="unplug-and-open">Unplug and open the plug</StepHeading>
        <p className="text-muted leading-7">
          Switch off and remove the plug from the socket. On a rewireable plug, undo the large central screw on
          the pin face and lift the cover off. While it is open, check that the cable grip is clamped on the
          outer sheath, the cores are firmly held under their terminals and nothing is discolored. A loose live
          terminal can overheat and mimic a fuse problem.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="remove-the-fuse">Remove the fuse</StepHeading>
        <p className="text-muted leading-7">
          Lever the fuse out of its clips with a small flat screwdriver. On a molded plug, prise open the fuse
          carrier on the pin face instead. Look at the printed rating on the body (3A, 5A or 13A are the common
          ones) and note it before testing.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="set-the-meter">Set the meter</StepHeading>
        <p className="text-muted leading-7">
          Plug the black lead into COM and the red lead into the V/Ω socket. Turn the dial to continuity (the
          speaker or sound-wave symbol) if your meter has it; otherwise use the lowest resistance range, such as
          200 Ω on a manual meter. Touch the probe tips together first: you should get a beep, or a reading of a
          few tenths of an ohm. That figure is your lead resistance.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="probe-the-fuse">Probe the end caps</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lay the fuse on a non-conductive surface and press one probe tip on each metal end cap. Hold the probes
          by their insulated grips, not the fuse, so that your fingers do not form a parallel path. Polarity does
          not matter.
        </p>
        <Figure
          caption={
            <>
              Example readings on the ohms range: an intact fuse at 0.2 Ω, essentially the same as the leads
              shorted together (left), and a blown fuse showing OL (right).
            </>
          }
        >
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.2" unit="Ω" mode="Ω  fuse intact" />
            <MeterReadout value="OL" unit="Ω" mode="Ω  fuse blown" />
          </div>
        </Figure>
        <Figure caption={<>The test start to finish. Whatever the result, refit the cover and the correct fuse before plugging back in.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug", sub: "Switch off, pull plug" },
              { label: "Open", sub: "Remove cover or carrier" },
              { label: "Pull fuse", sub: "Note the rating" },
              { label: "Probe caps", sub: "Continuity or low Ω" },
              { label: "Decide", sub: "Beep = good, OL = blown" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="read-the-result" className="text-xl font-semibold mb-3">Reading the result</h2>
        <DataTable
          head={["Meter shows", "Meaning", "Next step"]}
          rows={[
            ["Beep, or under about 1 Ω", "Fuse intact", "The fault is elsewhere: cable, switch or appliance"],
            ["OL or 1 on every range", "Fuse blown (open circuit)", "Fit a new fuse of the correct rating and retest"],
            ["Reading that flickers or jumps", "Poor contact or a damaged cap", "Clean the probe tips and caps; if it persists, discard the fuse"],
            ["Several ohms or more", "Probably a probe or range problem", "Recheck the range and lead sockets; a healthy fuse never reads this high"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If the fuse is good and the appliance is still dead, test the flex core by core for continuity. Our
          guide to{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires with a multimeter
          </Link>{" "}
          walks through it.
        </p>
      </section>

      <section>
        <h2 id="fuse-ratings" className="text-xl font-semibold mb-3">Choosing the right replacement rating</h2>
        <p className="text-muted leading-7 mb-4">
          Always replace like for like unless the appliance instructions say otherwise. Color coding helps, but
          it is a convention rather than a guarantee: many 3 A fuses are red and many 13 A fuses are brown, yet
          some makers use plain white bodies. Go by the rating printed on the fuse.
        </p>
        <Figure
          caption={
            <>
              Common BS 1362 ratings and the approximate maximum load each suits on a 230 V supply (power = 230 V
              × current). The appliance manufacturer&apos;s fuse recommendation always takes priority.
            </>
          }
        >
          <BarChart
            items={[
              { label: "3 A fuse", value: 690, display: "up to ~690 W" },
              { label: "5 A fuse", value: 1150, display: "up to ~1,150 W" },
              { label: "13 A fuse", value: 2990, display: "up to ~3,000 W", highlight: true },
            ]}
          />
        </Figure>
        <KeyIdea title="Rule of thumb">
          Lamps, chargers, TVs and computers with thin flexes usually take a 3 A fuse. Kettles, heaters, irons,
          washing machines and anything over about 700 W take 13 A. 5 A fuses are less common and should only be
          fitted where the appliance asks for them.
        </KeyIdea>
      </section>

      <section>
        <h2 id="why-it-blew" className="text-xl font-semibold mb-3">Why did the fuse blow?</h2>
        <ul className="space-y-2 list-disc pl-5 text-muted leading-7">
          <li>A fault inside the appliance, such as a failed heating element, motor or power supply.</li>
          <li>Damaged flex: crushed under furniture, chewed, or broken at the plug or appliance end.</li>
          <li>The wrong fuse fitted: a 3 A fuse in a kettle will blow at switch-on.</li>
          <li>A surge at switch-on from motors or transformers, which can eventually tire a fuse.</li>
          <li>A loose terminal inside the plug that overheated and weakened the fuse.</li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          A fuse that has blown once may just be old. One that blows again soon after replacement points to a
          real fault, and an appliance with a heating element can be checked with our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter basics guide
          </Link>{" "}
          before you decide whether to repair it.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter you need</h2>
        <p className="text-muted leading-7 mb-6">
          Any digital meter with continuity or a low ohms range will test a plug fuse. An audible continuity beep
          is the quickest way to work through a drawer of spares. For general home use, see our{" "}
          <Link href="/multimeters/best-multimeter-for-home-use" className={link}>
            best multimeter for home use
          </Link>{" "}
          guide.
        </p>
        <ProductStrip
          title="Home-use meters in our reviews"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Auto-ranging, True RMS, backlit display. A sensible first meter for home and hobby use.",
            },
            {
              name: "Extech EX330",
              image: extech.image,
              alt: "Extech EX330 compact auto-ranging multimeter",
              href: "/multimeters/extech-ex330-review",
              note: "Pocket-sized and auto-ranging with a built-in non-contact voltage detector.",
            },
            {
              name: "UNI-T UT139C",
              image: unit.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, auto and manual ranging at a budget price.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
