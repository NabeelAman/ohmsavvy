import Link from "next/link";
import { Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why a cordless power tool keeps stopping: test the battery pack's voltage under load, check its contacts for corrosion, and test the trigger switch's continuity.";

export const metadata = buildMetadata({
  title: "Why Does a Power Tool Keep Stopping?",
  description,
  path: "/multimeters/why-does-a-power-tool-keep-stopping",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

export default function WhyDoesAPowerToolKeepStoppingPage() {
  return (
    <HowToShell
      title="Why Does a Power Tool Keep Stopping? How to Check Its Battery and Electrical Connections"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-a-power-tool-keep-stopping"
      category="multimeters"
      intro={
        <>
          A tool that cuts out under load, or stops and won&apos;t restart until you remove and reseat the
          battery, usually points to one of three things: a battery pack that sags too far under real load,
          corroded or worn contacts at the battery interface, or a failing trigger switch. Testing the pack&apos;s
          voltage while the tool is actually working narrows it down fast.
        </>
      }
      aside={{
        image: fluke117.image,
        alt: "Fluke 117 digital multimeter with test leads",
        caption: (
          <>
            The Fluke 117&apos;s min/max capture is useful for catching a brief voltage sag. See our{" "}
            <Link href="/multimeters/fluke-117-review" className={link}>
              Fluke 117 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "check-resting-voltage", label: "Check the battery's resting voltage" },
        { id: "check-voltage-under-load", label: "Check voltage while the tool is working" },
        { id: "check-the-contacts", label: "Check the battery and tool contacts" },
        { id: "check-the-trigger-switch", label: "Check the trigger switch" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What's a normal resting voltage for a cordless tool battery?",
          a: "It depends on the pack's voltage rating and cell chemistry — check the label for the nominal voltage (e.g. 18V, 20V) and compare your resting reading against what the manufacturer specifies as a charged state for that specific pack, since chemistries and cell counts vary between brands and tool platforms.",
        },
        {
          q: "Why would the battery read full voltage at rest but the tool still cuts out?",
          a: "Battery cells can hold a reasonable resting voltage while being unable to sustain the tool's real current draw, especially as packs age — the voltage simply collapses once significant current is demanded, then recovers once the load is removed. This is exactly the same under-load-vs-resting-voltage distinction used when testing a car battery.",
        },
        {
          q: "Could dirty or corroded contacts cause intermittent cutting out rather than a total failure?",
          a: "Yes — a contact that's making a poor connection can work fine under light load, then lose contact momentarily under vibration or heavier current draw, producing exactly the intermittent stop-and-restart symptom many people describe. Clean contacts with an appropriate contact cleaner and inspect for pitting or corrosion.",
        },
        {
          q: "Is it the battery or the tool if swapping batteries doesn't fix the problem?",
          a: "If a known-good battery from another pack of the same platform still produces the same cutting-out symptom, the fault has moved with the tool rather than the battery, pointing toward the tool's own trigger switch, internal wiring, or motor rather than the battery pack.",
        },
        {
          q: "Can extreme temperature cause a battery pack to cut out protectively?",
          a: "Yes — many lithium-ion tool packs include thermal protection that deliberately cuts power if the pack gets too hot or too cold, which can appear as the same symptom as a failing pack. If cutting out correlates with heavy, sustained use or very hot/cold conditions, let the pack return to a moderate temperature and retest.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-12v-battery-under-load",
          title: "How to Test a 12V Battery Under Load",
          desc: "The same resting-vs-loaded voltage principle, applied to automotive batteries.",
        },
        {
          href: "/multimeters/how-to-test-a-push-button-switch-with-a-multimeter",
          title: "How to Test a Push-Button Switch With a Multimeter",
          desc: "A related technique for testing a trigger or button-style switch.",
        },
      ]}
    >
      <Callout title="Keep clear of the tool's moving parts while testing under load">
        <ul className="space-y-2 list-disc pl-5">
          <li>Keep hands, meter leads, and clothing clear of any bit, blade, or moving part while the tool is running during a load test.</li>
          <li>Remove or secure any attachment that isn&apos;t needed for the test.</li>
          <li>Disconnect the battery before inspecting or cleaning contacts.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="check-resting-voltage">Check the battery&apos;s resting voltage</StepHeading>
        <p className="text-muted leading-7">
          With the battery removed from the tool, measure voltage across its main contacts. Compare the
          reading to what the manufacturer specifies for a charged pack at that voltage rating — this sets
          your baseline before testing under real load.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="check-voltage-under-load">Check voltage while the tool is working</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the battery installed, connect the meter across its terminals (back-probing if needed) and
          run the tool under a realistic load while watching for the lowest voltage reached, ideally using
          min/max capture since the dip can be brief.
        </p>
        <DataTable
          head={["Observation", "Likely cause"]}
          rows={[
            ["Voltage holds steady under load", "Battery is healthy — look at contacts or the switch"],
            ["Voltage sags sharply and recovers when load is removed", "Weak or aging battery cells"],
            ["Voltage drops to zero momentarily, then recovers", "Intermittent contact — check the battery/tool interface"],
            ["Voltage stays normal but the tool still cuts out", "Likely the trigger switch or internal tool wiring"],
          ]}
        />
        <div className="mt-4">
          <Figure
            caption={
              <>
                Inside the loop: the pack behaves like ideal cells in series with an internal resistance. The
                voltage the tool sees is the cell voltage minus the current times that resistance, minus any
                loss at the contacts and trigger. Example (illustrative): a pack with 0.1 Ω of internal
                resistance drawing 20 A loses 20 × 0.1 = 2 V before the motor gets anything.
              </>
            }
          >
            <svg
              viewBox="0 0 360 170"
              className="w-full h-auto"
              role="img"
              aria-label="Cordless tool circuit: battery cells with internal resistance, pack contacts, trigger switch and motor in a loop, with a voltmeter across the pack terminals showing where the voltage sags under load"
            >
              <rect x="12" y="30" width="120" height="110" rx="6" className="fill-none stroke-border" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="72" y="22" fontSize="10" textAnchor="middle" className="fill-muted">Battery pack</text>
              <line x1="40" y1="60" x2="40" y2="110" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="30" y1="78" x2="50" y2="78" className="stroke-foreground" strokeWidth="2" />
              <line x1="34" y1="86" x2="46" y2="86" className="stroke-foreground" strokeWidth="2" />
              <line x1="30" y1="94" x2="50" y2="94" className="stroke-foreground" strokeWidth="2" />
              <line x1="34" y1="102" x2="46" y2="102" className="stroke-foreground" strokeWidth="2" />
              <text x="40" y="128" fontSize="9" textAnchor="middle" className="fill-muted">Cells</text>
              <line x1="40" y1="60" x2="70" y2="60" className="stroke-foreground" strokeWidth="1.5" />
              <path d="M70 60 l5 -6 l6 12 l6 -12 l6 12 l6 -12 l5 6" className="fill-none stroke-accent" strokeWidth="1.5" />
              <text x="88" y="46" fontSize="9" textAnchor="middle" className="fill-accent">R internal</text>
              <line x1="104" y1="60" x2="132" y2="60" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="40" y1="110" x2="40" y2="120" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="40" y1="120" x2="132" y2="120" className="stroke-foreground" strokeWidth="1.5" />
              <circle cx="132" cy="60" r="4" className="fill-surface stroke-accent" strokeWidth="2" />
              <circle cx="132" cy="120" r="4" className="fill-surface stroke-accent" strokeWidth="2" />
              <text x="150" y="140" fontSize="9" textAnchor="middle" className="fill-accent">Contacts</text>
              <line x1="136" y1="60" x2="200" y2="60" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="200" y1="60" x2="226" y2="48" className="stroke-foreground" strokeWidth="1.5" />
              <circle cx="200" cy="60" r="2.5" className="fill-foreground" />
              <circle cx="230" cy="60" r="2.5" className="fill-foreground" />
              <text x="215" y="38" fontSize="9" textAnchor="middle" className="fill-muted">Trigger</text>
              <line x1="230" y1="60" x2="300" y2="60" className="stroke-foreground" strokeWidth="1.5" />
              <circle cx="300" cy="90" r="22" className="fill-surface stroke-foreground" strokeWidth="1.5" />
              <text x="300" y="94" fontSize="11" textAnchor="middle" className="fill-foreground">M</text>
              <line x1="300" y1="60" x2="300" y2="68" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="300" y1="112" x2="300" y2="120" className="stroke-foreground" strokeWidth="1.5" />
              <line x1="136" y1="120" x2="300" y2="120" className="stroke-foreground" strokeWidth="1.5" />
              <text x="330" y="94" fontSize="9" textAnchor="middle" className="fill-muted">Motor</text>
              <rect x="150" y="76" width="56" height="28" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
              <text x="178" y="94" fontSize="11" textAnchor="middle" className="fill-accent">V meter</text>
              <line x1="150" y1="84" x2="132" y2="64" className="stroke-accent" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="150" y1="98" x2="132" y2="116" className="stroke-accent" strokeWidth="1" strokeDasharray="3 2" />
              <text x="250" y="160" fontSize="10" textAnchor="middle" className="fill-foreground">V at tool = V cells − I × R internal</text>
            </svg>
          </Figure>
        </div>
      </section>

      <section>
        <StepHeading n={3} id="check-the-contacts">Check the battery and tool contacts</StepHeading>
        <p className="text-muted leading-7">
          With the battery removed, inspect both the pack&apos;s contacts and the tool&apos;s receiving
          contacts for corrosion, discoloration, or bent/worn spring tension. A contact that doesn&apos;t
          seat firmly can produce exactly the kind of intermittent cutout described above.
        </p>
        <div className="mt-4">
          <KeyIdea title="Swap a known-good battery to isolate pack vs. tool">
            If you have access to another battery of the same platform that you know works well, swapping it
            in is one of the fastest ways to confirm whether the fault follows the battery or stays with the
            tool.
          </KeyIdea>
        </div>
      </section>

      <section>
        <StepHeading n={4} id="check-the-trigger-switch">Check the trigger switch</StepHeading>
        <p className="text-muted leading-7">
          If the battery tests fine under load and the contacts look clean, check the trigger switch&apos;s
          continuity with the tool disconnected and disassembled enough to access it — a worn or dirty
          trigger switch can lose contact intermittently under vibration, mimicking a battery fault.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A meter with min/max capture makes catching a brief voltage sag much easier. See the full{" "}
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
              note: "Hands-on tested. Min/max recording catches a brief voltage sag under load.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "Hands-on tested. Same 550 g body, True RMS and CAT III 600V as the 117, without non-contact voltage detection.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
