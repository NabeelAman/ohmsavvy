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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to test a GFCI outlet that won't reset: confirm it has power, clear downstream faults, spot line/load miswiring and recognize an end-of-life device.";

export const metadata = buildMetadata({
  title: "How to Test a GFCI Outlet That Won't Reset",
  description,
  path: "/multimeters/how-to-test-a-gfci-outlet-that-wont-reset",
});

const all = getAllPicks("multimeters");
const fluke115 = all.find((p) => p.name === "Fluke 115")!;
const mm420 = all.find((p) => p.name === "Klein Tools MM420")!;
const ht118a = all.find((p) => p.name === "KAIWEETS HT118A")!;

const link = "text-accent hover:underline";

/** LINE terminals take power from the panel; LOAD terminals feed outlets downstream. */
function LineLoadDiagram() {
  return (
    <svg viewBox="0 0 340 170" className="w-full h-auto" role="img" aria-label="Diagram of a GFCI receptacle with LINE terminals fed from the panel and LOAD terminals feeding downstream outlets, and a note that reversing them stops the device resetting">
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="18" y="55" width="52" height="60" rx="4" />
        <rect x="130" y="35" width="80" height="100" rx="6" />
        <rect x="270" y="55" width="52" height="60" rx="4" />
        <line x1="70" y1="85" x2="130" y2="85" />
        <line x1="210" y1="85" x2="270" y2="85" />
        <line x1="138" y1="60" x2="202" y2="60" />
        <line x1="138" y1="110" x2="202" y2="110" />
      </g>
      <g fontSize="10" textAnchor="middle" className="fill-foreground">
        <text x="44" y="82">Panel</text>
        <text x="44" y="96">breaker</text>
        <text x="170" y="82">GFCI</text>
        <text x="296" y="82">Next</text>
        <text x="296" y="96">outlets</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-accent">
        <text x="100" y="77">LINE</text>
        <text x="240" y="77">LOAD</text>
      </g>
      <g fontSize="9" textAnchor="middle" className="fill-muted">
        <text x="170" y="54">TEST</text>
        <text x="170" y="124">RESET</text>
      </g>
      <text x="170" y="158" fontSize="9.5" textAnchor="middle" className="fill-muted">Feed on LOAD instead of LINE: most newer GFCIs refuse to reset</text>
    </svg>
  );
}

export default function HowToTestAGfciOutletThatWontResetPage() {
  return (
    <HowToShell
      title="How to Test a GFCI Outlet That Won't Reset"
      description={description}
      path="/multimeters/how-to-test-a-gfci-outlet-that-wont-reset"
      category="multimeters"
      published="2026-10-25"
      intro={
        <>
          To test a GFCI outlet that won&apos;t reset, work out which of four situations you are in: no power
          is reaching it, a ground fault is still present, it has been wired with line and load reversed, or
          it has reached the end of its life. Most GFCIs made in the last couple of decades will not latch
          unless they have power and pass an internal check, so a RESET button that won&apos;t stay in is
          often the device telling you something specific. A plug-in tester and a multimeter, used only at
          the outlet face, separate these cases without opening the box.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 digital multimeter",
        caption: (
          <>
            A meter at the outlet face, and at outlets upstream, shows whether power reaches the GFCI. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-no-reset", label: "Why a GFCI refuses to reset" },
        { id: "causes", label: "Symptoms and causes" },
        { id: "test-reset", label: "Using TEST and RESET properly" },
        { id: "power-check", label: "Check whether power reaches it" },
        { id: "outlet-testers", label: "Plug-in testers and their limits" },
        { id: "replace", label: "Replacement or professional diagnosis" },
      ]}
      faq={[
        {
          q: "Why won't my GFCI reset after a power outage?",
          a: "Some GFCIs need line power present to latch, and after an outage a different breaker or an upstream GFCI may also have tripped. Check the panel and every other GFCI first. If power is confirmed at the outlet's circuit and it still will not latch, the device may have failed its self-test.",
        },
        {
          q: "Can a GFCI go bad without tripping?",
          a: "Yes. Older GFCIs can fail in a way that leaves the outlet live but unprotected, which is why the monthly TEST matters. Many newer devices self-test and either lock out or show an end-of-life indicator instead.",
        },
        {
          q: "What does a red light on a GFCI mean?",
          a: "It depends on the maker. On many models a solid or flashing red light indicates the device has tripped or reached end of life, while others use it for a different status. The legend printed on the face or the instruction sheet tells you which.",
        },
        {
          q: "Is this the same problem as a GFCI that keeps tripping?",
          a: "Related but not the same. A GFCI that keeps tripping resets fine and then trips again, which points to leakage on the circuit. One that will not reset at all is more often missing power, miswired or worn out.",
        },
        {
          q: "Is it safe to bypass a GFCI that won't reset?",
          a: "No. Moving the feed wires to other terminals or swapping in an ordinary receptacle removes the shock protection that electrical codes require in bathrooms, kitchens, garages, outdoors and other damp locations. Leave the outlet and anything downstream unused until a new GFCI is fitted, and have a licensed electrician do that if you are not qualified.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-does-my-gfci-outlet-keep-tripping",
          title: "Why Does My GFCI Outlet Keep Tripping?",
          desc: "When it resets but trips again: moisture, leaky appliances and downstream faults.",
        },
        {
          href: "/multimeters/why-does-half-my-house-have-no-power-but-the-breakers-look-fine",
          title: "Why Does Half My House Have No Power?",
          desc: "Lost service legs, hidden tripped breakers and upstream GFCIs.",
        },
      ]}
    >
      <Callout title="Before you start">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            If the GFCI or its cover plate is warm, discolored, cracked or smells of burning, switch off its
            breaker and call an electrician instead of testing it.
          </li>
          <li>
            Every check here is done at the outlet face with the cover on. Removing the receptacle from the box,
            reconnecting wires or replacing it is electrical work for a licensed electrician if you are not
            qualified.
          </li>
          <li>Use a CAT III-rated meter with intact leads, and keep wet hands and wet floors out of it.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-no-reset" className="text-xl font-semibold mb-3">Why a GFCI refuses to reset</h2>
        <p className="text-muted leading-7 mb-4">
          A GFCI&apos;s RESET button doesn&apos;t simply close a switch. Since the UL 943 requirements were
          revised in the mid-2000s, most GFCIs have reset lockout: the contacts only latch if the device has
          line power and its electronics confirm they can detect a fault. Many newer models also self-test
          periodically and lock out permanently when that test fails. So a GFCI that won&apos;t reset is often
          behaving exactly as designed, either because it has nothing to work with or because it no longer
          trusts itself.
        </p>
        <p className="text-muted leading-7">
          The same design catches one of the most common installation mistakes. The incoming supply belongs on
          the terminals marked LINE, and outlets further along the circuit connect to LOAD. If the supply is on
          the LOAD side, the protected outlets would otherwise be powered without protection, so most current
          GFCIs simply won&apos;t latch when wired that way.
        </p>
        <Figure caption={<>Power arrives on LINE and leaves on LOAD to the rest of the circuit. Reverse them and a modern GFCI usually refuses to reset, which is deliberate.</>}>
          <LineLoadDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "What to check", "Who should fix it"]}
          rows={[
            ["RESET won't stay in, no light, nothing upstream works", "No power: breaker or upstream GFCI tripped", "Panel breakers and every other GFCI", "Homeowner"],
            ["RESET clicks in, then pops straight back out", "Ground fault still present downstream", "Unplug everything on the GFCI and its LOAD outlets", "Homeowner; electrician if it persists"],
            ["Brand-new GFCI never resets", "LINE and LOAD swapped, or no feed", "Upstream outlets live? Recent wiring work?", "Electrician"],
            ["Red or flashing indicator, won't reset", "Failed self-test, end of life", "Indicator legend on the face", "Replace (electrician if not qualified)"],
            ["Resets but outlet still dead", "Fault between GFCI and receptacle contacts, or wrong outlet", "Meter at its own slots after RESET", "Electrician"],
            ["Reset after storm or flood won't hold", "Water in a downstream box", "Outdoor and basement outlets on the circuit", "Electrician"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="test-reset">Using TEST and RESET properly</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Unplug everything from the GFCI and from any outlets it might protect. Those include outlets in other
          rooms, garages and outside walls, often marked with a small &quot;GFCI Protected Outlet&quot; sticker.
          Then press RESET firmly and squarely until it clicks; a half-press is the most common reason a good
          device seems not to reset. If it latches, press TEST: the button should pop out and the outlet should
          go dead. Press RESET again to restore it.
        </p>
        <p className="text-muted leading-7">
          If it latches with everything unplugged, plug items back in one at a time. The one that sends RESET
          out again is leaking current, and the troubleshooting in{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI outlet keeps tripping
          </Link>{" "}
          takes over from here. If it won&apos;t latch even with every outlet empty, go on to the power
          check.
        </p>
        <Figure caption={<>A short decision path for a GFCI that won&apos;t reset. Stop at the first step that explains it.</>}>
          <FlowDiagram
            steps={[
              { label: "Unplug all", sub: "Here and on LOAD outlets" },
              { label: "Press RESET firmly", sub: "Latches? Plug back one by one" },
              { label: "Check for power", sub: "Breaker, other GFCIs" },
              { label: "Read indicator", sub: "End-of-life light?" },
              { label: "Electrician", sub: "Line/load, replacement" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="power-check">Check whether power reaches it</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A tripped GFCI shows 0 V at its own slots, so measuring there tells you nothing about its supply.
          Look upstream instead. Find the breaker for the circuit and push it fully OFF and back ON. Then check
          other outlets on the same breaker that come before the GFCI. If they are live, power is very probably
          reaching the GFCI&apos;s LINE terminals. If they are dead too, the problem is upstream: another GFCI
          further back, a breaker, or a failed connection.
        </p>
        <p className="text-muted leading-7 mb-4">
          With the meter on AC volts, place the probes in the hot (shorter slot) and neutral (taller slot) of
          an upstream outlet, keeping your fingers behind the guards. Expect roughly 114 to 126 V, the normal
          range for 120 V service under ANSI C84.1. A non-contact voltage tester held at the GFCI&apos;s cover
          plate may beep if the LINE wires in the box are live, but it can&apos;t say which terminal they are
          on, so treat it as a hint rather than proof.
        </p>
        <Figure caption={<>Once the GFCI resets: about 120 V hot to neutral (left) and close to 0 V neutral to ground (right) at its own slots.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="120.8" unit="V~" mode="V AC  hot to neutral" />
            <MeterReadout value="0.2" unit="V~" mode="V AC  neutral to ground" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          When it does reset, measure at its own slots: hot to neutral and hot to ground should both read near
          120 V, and neutral to ground should be close to zero. If the outlet still reads 0 V after a firm
          reset, the problem is inside the device or its connections. Our guide to{" "}
          <Link href="/multimeters/how-to-test-electrical-wires-with-a-multimeter" className={link}>
            testing electrical wires with a multimeter
          </Link>{" "}
          explains the continuity checks an electrician will make once the circuit is de-energized.
        </p>
      </section>

      <section>
        <h2 id="outlet-testers" className="text-xl font-semibold mb-3">Plug-in testers and their limits</h2>
        <p className="text-muted leading-7 mb-4">
          A three-light plug-in receptacle tester with a GFCI test button is a handy companion here. Its lights
          flag an open ground, an open neutral, reversed polarity and some other wiring faults, and its button
          deliberately leaks a little current from hot to ground to make the GFCI trip. Use it on the GFCI
          itself and on downstream outlets to confirm they are actually protected.
        </p>
        <p className="text-muted leading-7">
          Two caveats. On a two-wire circuit without an equipment ground, which GFCIs are often used to protect
          in older homes, the tester&apos;s button has no ground path and won&apos;t trip the GFCI, even though
          the GFCI&apos;s own TEST button will. And a tester cannot detect a swapped line and load, a
          bootleg ground or several other faults. It is a quick screening tool, not a diagnosis.
        </p>
      </section>

      <section id="replace">
        <KeyIdea title="When replacement or professional diagnosis is needed">
          Replace the GFCI if it shows an end-of-life indicator, won&apos;t reset with power confirmed upstream
          and nothing connected downstream, fails to trip when TEST is pressed, or is cracked, warm or
          scorched. Call a licensed electrician if you are not qualified to replace it, if a newly installed
          GFCI has never reset (likely line/load reversal), if upstream outlets are also dead after the
          breaker is reset, or if water has reached any outlet on the circuit. If several devices act up at
          once, the cause may be bigger than one outlet; see{" "}
          <Link href="/multimeters/why-does-my-afci-breaker-keep-tripping-with-no-obvious-cause" className={link}>
            AFCI breakers that keep tripping
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-a-whole-house-surge-protector" className={link}>
            testing a whole-house surge protector
          </Link>
          .
        </KeyIdea>
      </section>

      <section>
        <ProductStrip
          title="Meters for outlet checks"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Hands-on tested. True RMS, CAT III 600V and a 6,000-count backlit display; no NCV.",
            },
            {
              name: "Klein Tools MM420",
              image: mm420.image,
              alt: "Klein Tools MM420 digital multimeter",
              href: "/multimeters/best-multimeters-for-electricians-under-100",
              note: "True RMS, CAT III 600V, with Lead-Alert jack lights. No LoZ or NCV, indoor use only per Klein.",
            },
            {
              name: "KAIWEETS HT118A",
              image: ht118a.image,
              alt: "KAIWEETS HT118A digital multimeter",
              href: "/multimeters/best-multimeter-for-beginners",
              note: "Budget True RMS meter with NCV and Min/Max; maker's page and manual disagree on maximum voltage.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
