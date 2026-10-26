import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why car headlights keep burning out: check charging voltage for overcharging, inspect connectors for moisture and corrosion, and test for a poor ground.";

export const metadata = buildMetadata({
  title: "Why Do Car Headlights Keep Burning Out?",
  description,
  path: "/multimeters/why-do-car-headlights-keep-burning-out",
});

const craftsman = picks.find((p) => p.name === "Craftsman CMMT14171")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoCarHeadlightsKeepBurningOutPage() {
  return (
    <HowToShell
      title="Why Do Car Headlights Keep Burning Out?"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-do-car-headlights-keep-burning-out"
      category="multimeters"
      intro={
        <>
          Repeated headlight failures almost always come down to one of three things: the charging system
          overcharging and feeding the bulbs too much voltage, moisture or corrosion at the connector causing
          localized overheating, or a poor ground forcing excess current through the filament. Checking
          charging voltage and the headlight circuit&apos;s own connections tells you which.
        </>
      }
      aside={{
        image: craftsman.image,
        alt: "Craftsman CMMT14171 automotive digital multimeter",
        caption: (
          <>
            The Craftsman CMMT14171 handles charging-voltage and ground checks well. See our{" "}
            <Link href="/multimeters/craftsman-cmmt14171-review" className={link}>
              Craftsman CMMT14171 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-charging-voltage", label: "Check for overcharging" },
        { id: "inspect-the-connector", label: "Inspect the connector for moisture and corrosion" },
        { id: "check-the-ground", label: "Check the headlight's ground connection" },
        { id: "where-voltage-goes", label: "Where the headlight circuit goes wrong" },
        { id: "bulb-handling", label: "Bulb handling matters too" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What charging voltage would cause headlights to burn out repeatedly?",
          a: "A charging system significantly above the normal range (often cited around 13.8-14.4 V for many 12V systems, check your service manual) feeds every bulb more voltage and current than it was designed for, measurably shortening filament life. If you measure charging voltage noticeably high, have the voltage regulator checked.",
        },
        {
          q: "Can touching a halogen bulb's glass with bare fingers really cause it to fail early?",
          a: "Yes — skin oil left on the glass creates a hot spot when the bulb heats up, which can cause the quartz glass to weaken or even shatter, and can shorten the bulb's life substantially. Always handle halogen bulbs with a clean cloth or gloves, holding only the base.",
        },
        {
          q: "Why would only one headlight keep failing while the other is fine?",
          a: "That points toward something specific to that one side — a bad connector, a poor ground only on that side, or moisture getting into just that housing — rather than a charging-system issue, which would typically affect both sides more evenly.",
        },
        {
          q: "Could a bad ground really burn out a bulb instead of just making it dim?",
          a: "A poor ground raises the resistance in the circuit, and depending on exactly where the resistance is and how the circuit responds, it's possible for the bulb to run dim most of the time but see brief voltage spikes when the connection intermittently improves — which can appear as random early failures rather than a simple dim strip.",
        },
        {
          q: "Does bulb brand or quality actually matter for longevity?",
          a: "Yes, to some extent — reputable brands generally have tighter manufacturing tolerances, but a genuinely electrical cause (overcharging, bad ground, moisture) will shorten the life of any brand. If a specific position keeps killing bulbs regardless of brand, the fault is in the vehicle's circuit, not the bulbs.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-alternator-with-a-multimeter",
          title: "How to Test an Alternator With a Multimeter",
          desc: "The full charging-voltage test if overcharging is suspected.",
        },
        {
          href: "/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter",
          title: "How to Test a Car Ground Wire With a Multimeter",
          desc: "The voltage-drop test for a suspected poor ground.",
        },
      ]}
    >
      <Callout title="Let bulbs cool, and never touch halogen glass bare-handed">
        <ul className="space-y-2 list-disc pl-5">
          <li>Let headlight bulbs cool fully before handling them.</li>
          <li>Handle halogen bulbs by the base only, using a clean cloth or gloves — never touch the glass with bare skin.</li>
          <li>Keep hands and tools clear of the fan and belts when testing with the engine running.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-charging-voltage">Check for overcharging</StepHeading>
        <p className="text-muted leading-7">
          With the engine running, measure voltage across the battery terminals. Voltage noticeably above
          your vehicle&apos;s specified charging range feeds every bulb more than it was designed for and
          will shorten the life of headlights specifically, since they&apos;re among the highest-current,
          most heat-stressed bulbs on the car. See{" "}
          <Link href="/multimeters/how-to-test-an-alternator-with-a-multimeter" className={link}>
            how to test an alternator
          </Link>{" "}
          for the full procedure.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inspect-the-connector">Inspect the connector for moisture and corrosion</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With power off, unplug the headlight connector and look for corrosion, discoloration from heat, or
          signs of moisture intrusion. A connector with slightly loose or corroded pins concentrates
          resistance at that point, heating up and sometimes damaging the bulb&apos;s base or socket over
          repeated cycles.
        </p>
        <DataTable
          head={["Observation", "Likely cause"]}
          rows={[
            ["Connector pins discolored or melted-looking", "Resistance heating from a poor connection — repair the connector"],
            ["Moisture visible inside the housing", "Failed seal or gasket letting water in — repair the seal"],
            ["Connector looks clean and tight", "Check charging voltage and ground instead"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="check-the-ground">Check the headlight&apos;s ground connection</StepHeading>
        <p className="text-muted leading-7">
          With the headlight on, measure voltage drop between the bulb&apos;s ground connection and a
          known-good chassis ground (battery negative). A meaningful drop here means the ground path is
          adding resistance, which can cause both dimming and premature failure — the same technique
          covered in{" "}
          <Link href="/multimeters/how-to-test-a-car-ground-wire-with-a-multimeter" className={link}>
            testing a car ground wire
          </Link>
          .
        </p>
        <div className="mt-4">
          <KeyIdea title="Compare both sides when only one fails repeatedly">
            If one headlight keeps failing and the other doesn&apos;t, directly compare voltage, connector
            condition, and ground drop between the two sides — the difference usually points straight at the
            cause.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="where-voltage-goes" className="text-xl font-semibold mb-3">Where the headlight circuit goes wrong</h2>
        <p className="text-muted leading-7">
          A headlight circuit is a single loop: battery positive, fuse, relay or switch, the connector at the
          bulb, the filament, then the ground wire back to the body and battery negative. Every joint in that
          loop is a place where resistance can build. Resistance on the feed side starves the bulb and cooks
          the connector; resistance on the ground side does the same from the other end. Measuring the two
          halves separately, with the lamp switched on, tells you which half is at fault.
        </p>
        <div className="mt-4">
          <Figure
            caption={
              <>
                The headlight loop and the two voltage-drop checks. V1 reads the loss along the feed side, V2
                the loss along the ground side; on a healthy circuit each is a small fraction of a volt. The
                connector and ground strap (highlighted) are where heat and corrosion usually start.
              </>
            }
          >
            <svg
              viewBox="0 0 360 180"
              className="w-full h-auto"
              role="img"
              aria-label="Headlight circuit diagram from battery positive through fuse, relay and connector to the bulb, then through the ground strap back to battery negative, with voltmeter V1 across the feed side and V2 across the ground side"
            >
              <rect x="10" y="60" width="44" height="60" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="32" y="86" fontSize="10" textAnchor="middle" className="fill-foreground">+</text>
              <text x="32" y="112" fontSize="10" textAnchor="middle" className="fill-foreground">−</text>
              <text x="32" y="134" fontSize="9" textAnchor="middle" className="fill-muted">Battery</text>
              <line x1="54" y1="80" x2="84" y2="80" className="stroke-foreground" strokeWidth="1.5" />
              <rect x="84" y="72" width="34" height="16" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="101" y="68" fontSize="9" textAnchor="middle" className="fill-muted">Fuse</text>
              <line x1="118" y1="80" x2="146" y2="80" className="stroke-foreground" strokeWidth="1.5" />
              <rect x="146" y="70" width="40" height="20" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="166" y="66" fontSize="9" textAnchor="middle" className="fill-muted">Relay</text>
              <line x1="186" y1="80" x2="222" y2="80" className="stroke-foreground" strokeWidth="1.5" />
              <rect x="222" y="70" width="30" height="20" rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
              <text x="237" y="66" fontSize="9" textAnchor="middle" className="fill-accent">Connector</text>
              <line x1="252" y1="80" x2="284" y2="80" className="stroke-foreground" strokeWidth="1.5" />
              <circle cx="300" cy="80" r="16" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <path d="M290 84 q5 -10 10 0 q5 10 10 0" className="fill-none stroke-accent" strokeWidth="1.5" />
              <text x="300" y="56" fontSize="9" textAnchor="middle" className="fill-muted">Bulb</text>
              <line x1="300" y1="96" x2="300" y2="140" className="stroke-foreground" strokeWidth="1.5" />
              <rect x="280" y="134" width="40" height="12" rx="3" className="fill-surface stroke-accent" strokeWidth="2" />
              <text x="336" y="132" fontSize="9" textAnchor="middle" className="fill-accent">Ground</text>
              <text x="336" y="143" fontSize="9" textAnchor="middle" className="fill-accent">strap</text>
              <line x1="280" y1="140" x2="32" y2="140" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="32" y1="140" x2="32" y2="120" className="stroke-foreground" strokeWidth="1.5" />
              <text x="160" y="155" fontSize="9" textAnchor="middle" className="fill-muted">Body / chassis return</text>
              <path d="M54 76 Q170 20 284 76" className="fill-none stroke-accent" strokeWidth="1" strokeDasharray="4 3" />
              <text x="170" y="34" fontSize="10" textAnchor="middle" className="fill-accent">V1: feed-side drop</text>
              <path d="M54 116 Q170 178 300 152" className="fill-none stroke-accent" strokeWidth="1" strokeDasharray="4 3" />
              <text x="170" y="174" fontSize="10" textAnchor="middle" className="fill-accent">V2: ground-side drop</text>
            </svg>
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Why does a few percent of extra voltage matter so much? A widely quoted lamp-engineering rule of
          thumb says incandescent and halogen filament life varies roughly with the inverse twelfth power of
          the applied voltage, so treat the figures here as approximate. A bulb run 5% above its design voltage
          lasts about 1 ÷ 1.05¹² ≈ 0.56 of its rated life, a little over half. At 10% over, 1 ÷ 1.10¹² ≈ 0.32,
          roughly a third. That is why a regulator that lets the system climb well past its normal charging
          range kills headlights long before it harms anything else, and why a measurement on the battery
          with the engine running is the first check worth making.
        </p>
      </section>

      <section>
        <h2 id="bulb-handling" className="text-xl font-semibold mb-3">Bulb handling matters too</h2>
        <p className="text-muted leading-7">
          Beyond electrical causes, skin oil on a halogen bulb&apos;s quartz glass creates a hot spot that can
          shorten its life or cause early failure, independent of any wiring issue. Rule this out by
          confirming whoever last replaced the bulb handled it correctly.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with DC volts and a fine millivolt range for ground-drop checks covers this test. See the
          full{" "}
          <Link href="/multimeters/best-multimeter-for-automotive" className={link}>
            best multimeter for automotive
          </Link>{" "}
          picks.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Craftsman CMMT14171",
              image: craftsman.image,
              alt: "Craftsman CMMT14171 automotive digital multimeter",
              href: "/multimeters/craftsman-cmmt14171-review",
              note: "Built for automotive charging and ground diagnosis.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "Auto-ranging DC volts resolves small ground-drop readings cleanly.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
