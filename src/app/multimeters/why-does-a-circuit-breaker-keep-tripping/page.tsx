import Link from "next/link";
import { Callout, DataTable, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a circuit breaker keeps tripping: measure the circuit's actual load current against the breaker's rating, and tell overload from a short or ground fault.";

export const metadata = buildMetadata({
  title: "Why Does a Circuit Breaker Keep Tripping?",
  description,
  path: "/multimeters/why-does-a-circuit-breaker-keep-tripping",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const milwaukee = picks.find((p) => p.name === "Milwaukee 2235-20")!;

const link = "text-accent hover:underline";

export default function WhyDoesACircuitBreakerKeepTrippingPage() {
  return (
    <HowToShell
      title="Why Does a Circuit Breaker Keep Tripping?"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-a-circuit-breaker-keep-tripping"
      category="multimeters"
      intro={
        <>
          A breaker trips for one of three reasons: the circuit is drawing more current than it&apos;s rated
          for (overload), a line is shorting directly to neutral or another line (short circuit), or current
          is leaking to ground (ground fault, what a GFCI specifically watches for). Measuring the
          circuit&apos;s actual load current with a clamp meter tells you whether it&apos;s a simple overload
          before you go any further. If it&apos;s specifically a GFCI outlet, see{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className="text-accent hover:underline">
            why a GFCI outlet keeps tripping
          </Link>
          ; if it&apos;s tied to one washing machine,{" "}
          <Link href="/multimeters/washing-machine-keeps-tripping-the-breaker" className="text-accent hover:underline">
            washing machine keeps tripping the breaker
          </Link>{" "}
          covers that specific case. Any work inside the panel itself should go to a licensed electrician.
        </>
      }
      aside={{
        image: milwaukee.image,
        alt: "Milwaukee 2235-20 clamp meter",
        caption: (
          <>
            A clamp meter reads the circuit&apos;s real load current without opening anything up. See our{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "three-reasons", label: "The three reasons a breaker trips" },
        { id: "measure-the-load", label: "Measure the circuit's actual load" },
        { id: "overload-vs-fault", label: "Overload vs. a short or ground fault" },
        { id: "what-you-can-check-safely", label: "What you can check safely yourself" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "How do I know if it's an overload rather than a fault?",
          a: "An overloaded breaker usually takes a while to trip — minutes, not instantly — and trips consistently once a predictable combination of devices is running. A short circuit or ground fault typically trips the breaker immediately, often the instant a device is plugged in or switched on, with no gradual buildup.",
        },
        {
          q: "Can I just add up the wattage of everything on the circuit to check for overload?",
          a: "Yes, as a useful estimate: add up the rated watts of everything on the circuit, divide by your supply voltage to get amps, and compare against the breaker's rating — but actually measuring with a clamp meter while everything is running is more reliable, since name-plate ratings don't always reflect real-world draw.",
        },
        {
          q: "Is it safe to just keep resetting the breaker and see if it holds?",
          a: "Resetting once to see if it was a one-off nuisance trip is reasonable. A breaker that trips repeatedly, especially quickly or immediately, should not be reset repeatedly — that's a sign of a real fault, and continuing to force it closed risks the condition that's causing it.",
        },
        {
          q: "Why does the breaker only trip when the weather is hot or humid?",
          a: "Heat increases resistance and current draw in many devices (especially anything with a motor, like an AC unit), and breakers themselves can trip slightly more readily when warm since their trip mechanism is often temperature-sensitive by design. A seasonal pattern can be a genuine clue pointing toward a specific appliance or the breaker's own age and condition.",
        },
        {
          q: "When should I call an electrician instead of troubleshooting further myself?",
          a: "Call an electrician for anything requiring you to open the panel, any breaker that trips immediately and repeatedly, any sign of burning smell or scorch marks, or if you're not confident identifying and safely disconnecting the load causing the problem yourself.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "The ground-fault-specific version of this problem.",
        },
        {
          href: "/multimeters/washing-machine-keeps-tripping-the-breaker",
          title: "Washing Machine Keeps Tripping the Breaker",
          desc: "A common single-appliance cause worth checking first.",
        },
      ]}
    >
      <Callout title="Leave the panel itself to a licensed electrician">
        <ul className="space-y-2 list-disc pl-5">
          <li>Measuring load current at an outlet or with a clamp meter around an accessible cord is reasonable for most people — opening the panel is not, unless you&apos;re qualified.</li>
          <li>Don&apos;t repeatedly force-reset a breaker that trips quickly or immediately; that pattern means a real fault, not a nuisance trip.</li>
          <li>Disconnect suspect devices before testing rather than leaving them running while you investigate.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="three-reasons">The three reasons a breaker trips</StepHeading>
        <DataTable
          head={["Cause", "Typical pattern"]}
          rows={[
            ["Overload", "Trips after a delay, once enough load accumulates on the circuit"],
            ["Short circuit", "Trips instantly, often the moment a specific device is plugged in or switched on"],
            ["Ground fault (GFCI-specific)", "Trips on current leaking to ground, even without an overload present"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={2} id="measure-the-load">Measure the circuit&apos;s actual load</StepHeading>
        <p className="text-muted leading-7">
          Clamp around a single accessible conductor feeding the circuit (an extension cord to a device, or
          an exposed wire at an outlet box) while everything normally run on that circuit is switched on, and
          read the current. Compare the total against the breaker&apos;s amperage rating printed on its
          switch.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="overload-vs-fault">Overload vs. a short or ground fault</StepHeading>
        <p className="text-muted leading-7">
          If measured current is close to or exceeds the breaker&apos;s rating, you&apos;ve likely found a
          genuine overload — reduce the load on that circuit or have a higher-capacity circuit installed by
          an electrician. If current measures well within the breaker&apos;s rating but it still trips,
          especially instantly, the problem is more likely a short or ground fault rather than overload, and
          needs an electrician&apos;s inspection.
        </p>
        <div className="mt-4">
          <KeyIdea title="Unplug everything, then add back one at a time">
            If you can&apos;t immediately tell what&apos;s drawing too much, unplug or switch off everything on the
            circuit, reset the breaker, then reconnect devices one at a time until it trips again — that
            identifies the specific culprit directly.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="what-you-can-check-safely" className="text-xl font-semibold mb-3">What you can check safely yourself</h2>
        <p className="text-muted leading-7">
          Measuring load current at an accessible point, checking what&apos;s plugged into the circuit, and
          inspecting cords and plugs for obvious damage are reasonable DIY checks. Opening the panel,
          testing inside it, or working on any wiring you&apos;re not confident handling safely should go to
          a licensed electrician.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A clamp meter reads the circuit&apos;s real current without opening anything up. See the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Milwaukee 2235-20",
              image: milwaukee.image,
              alt: "Milwaukee 2235-20 clamp meter",
              href: "/multimeters/milwaukee-2235-20-review",
              note: "AC clamp current up to 400A — reads a circuit's real load directly.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "For voltage checks alongside the current measurement.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
