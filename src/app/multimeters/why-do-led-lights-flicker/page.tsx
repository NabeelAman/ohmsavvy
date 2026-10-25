import Link from "next/link";
import { Callout, DataTable, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why LED lights flicker: check supply voltage stability, loose or corroded connections, and dimmer compatibility before suspecting the LED driver itself.";

export const metadata = buildMetadata({
  title: "Why Do LED Lights Flicker?",
  description,
  path: "/multimeters/why-do-led-lights-flicker",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;

const link = "text-accent hover:underline";

export default function WhyDoLedLightsFlickerPage() {
  return (
    <HowToShell
      title="Why Do LED Lights Flicker? How to Diagnose Electrical Problems"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-do-led-lights-flicker"
      category="multimeters"
      intro={
        <>
          LED flicker usually traces to one of three things: unstable or low supply voltage, a loose or
          corroded connection somewhere between the panel and the fixture, or a dimmer that isn&apos;t
          compatible with LED loads. A multimeter checks the first two directly; the third is usually solved
          by checking the dimmer&apos;s own compatibility list rather than by measurement. Any work inside a
          panel or on fixed wiring should go to a qualified electrician.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117 reads AC voltage stability and connection resistance cleanly. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-supply-voltage", label: "Check supply voltage" },
        { id: "check-connections", label: "Check for loose or corroded connections" },
        { id: "dimmer-compatibility", label: "Check dimmer compatibility" },
        { id: "when-to-call-an-electrician", label: "When to call an electrician" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Is all LED flicker a sign of a real electrical problem?",
          a: "Not always — some LED flicker is simply how certain drivers handle a dimmer they aren't designed for, or a very minor characteristic of how the driver converts AC to the LED's DC current, which may be imperceptible on camera but not to the eye, or vice versa. Flicker that's new, worsening, or accompanied by other symptoms (warm switches, buzzing, other devices affected) is the kind worth investigating electrically.",
        },
        {
          q: "Can one bad connection cause multiple light fixtures to flicker?",
          a: "Yes, if those fixtures share a circuit or a common connection point affected by the fault. Flickering that affects several fixtures at once, especially in a pattern that follows one circuit, points toward a shared connection or supply issue rather than a problem with any single bulb or fixture.",
        },
        {
          q: "Why do LED bulbs flicker more than incandescent bulbs did in the same fixture?",
          a: "LEDs draw much less current and respond to their driver's electronics far faster than an incandescent filament's thermal inertia ever showed. A voltage fluctuation or marginal connection that an incandescent bulb's filament would simply average out can show up as visible flicker on an LED almost instantly.",
        },
        {
          q: "What does it mean if the lights flicker only when a large appliance switches on?",
          a: "That's often a voltage sag caused by the appliance's starting surge pulling down supply voltage momentarily, more noticeable with LEDs because of how fast they respond. If it happens consistently with a specific large appliance, that's worth mentioning to an electrician as a specific clue.",
        },
        {
          q: "Can I test the fixture's wiring myself?",
          a: "Checking voltage at an easily accessible outlet or switch with power on, or checking connections with the circuit safely off, is reasonable for many homeowners comfortable with basic multimeter use. Opening a panel, working on fixed wiring you're not familiar with, or any work you're not confident is safe should go to a licensed electrician.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-led-strip-with-a-multimeter",
          title: "How to Test an LED Strip With a Multimeter",
          desc: "For testing the LED circuit itself rather than the supply feeding it.",
        },
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "A related household electrical symptom with its own specific causes.",
        },
      ]}
    >
      <Callout title="Leave panel and fixed wiring work to a qualified electrician">
        <ul className="space-y-2 list-disc pl-5">
          <li>Only check voltage at an easily accessible outlet or switch with the circuit live — never open a panel or work on fixed wiring unless you&apos;re qualified to do so.</li>
          <li>Turn off power at the breaker before inspecting or touching any connection.</li>
          <li>If in doubt about whether a check is safe for you to do, call a licensed electrician instead.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-supply-voltage">Check supply voltage</StepHeading>
        <p className="text-muted leading-7">
          With the fixture&apos;s circuit live, measure AC voltage at the nearest accessible outlet or switch
          on that circuit. A steady reading close to your region&apos;s nominal supply voltage is normal; a
          reading that wanders noticeably, or that sags when other loads switch on, points to a supply-side
          issue rather than the fixture itself.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-connections">Check for loose or corroded connections</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With power off at the breaker, inspect accessible connections — wire nuts, switch terminals,
          fixture connections — for looseness, corrosion, or discoloration from heat. A connection that looks
          fine but is marginally loose can still cause flicker under the small current an LED draws.
        </p>
        <DataTable
          head={["Observation", "Likely cause"]}
          rows={[
            ["Flicker follows a pattern with other appliances switching on", "Voltage sag from shared circuit loading"],
            ["Flicker at one specific fixture only", "Loose connection at that fixture or its switch"],
            ["Flicker across multiple fixtures on one circuit", "Shared connection point or supply issue upstream"],
            ["Flicker only with a dimmer switch in use", "Dimmer/LED driver compatibility, not a wiring fault"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={3} id="dimmer-compatibility">Check dimmer compatibility</StepHeading>
        <p className="text-muted leading-7">
          Many dimmers designed for incandescent bulbs don&apos;t work cleanly with LED loads, which draw far
          less current and respond differently to a dimmer&apos;s switching behavior. Check the dimmer
          manufacturer&apos;s LED compatibility list, and consider a dimmer specifically rated for LED loads
          if flicker only occurs while dimming.
        </p>
        <div className="mt-4">
          <KeyIdea title="Try a known-good bulb before chasing wiring">
            Swapping in a bulb you know works correctly elsewhere is a fast way to rule the bulb itself in or
            out before spending time checking voltage and connections.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="when-to-call-an-electrician" className="text-xl font-semibold mb-3">When to call an electrician</h2>
        <p className="text-muted leading-7">
          Call a licensed electrician for anything involving the panel itself, fixed wiring you&apos;re not
          confident inspecting safely, flicker accompanied by warm switches or outlets, a burning smell, or
          flicker that affects multiple circuits in the home at once — these can indicate a more serious
          electrical issue beyond a single fixture.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with stable AC voltage readings and a resistance/continuity range covers both checks. See
          the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "True RMS AC volts, CAT III 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
