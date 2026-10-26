import Link from "next/link";
import { BarChart, Callout, DataTable, Figure, HowToShell, KeyIdea, ProductStrip, StepHeading } from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why an extension cord overheats: check its load against its gauge rating, measure voltage drop under load, and inspect for damaged insulation.";

export const metadata = buildMetadata({
  title: "Why Does an Extension Cord Overheat?",
  description,
  path: "/multimeters/why-does-an-extension-cord-overheat",
});

const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const milwaukee = picks.find((p) => p.name === "Milwaukee 2235-20")!;

const link = "text-accent hover:underline";

export default function WhyDoesAnExtensionCordOverheatPage() {
  return (
    <HowToShell
      title="Why Does an Extension Cord Overheat?"
      description={description}
      published="2026-10-25"
      path="/multimeters/why-does-an-extension-cord-overheat"
      category="multimeters"
      intro={
        <>
          An extension cord overheats when it carries more current than its wire gauge and length can
          handle, or when damage or a loose connection adds resistance at one point along its length. A
          clamp meter reading of the actual load current, compared against the cord&apos;s rated ampacity,
          combined with a voltage-drop check, tells you whether the cord is simply undersized for the job or
          has developed a fault.
        </>
      }
      aside={{
        image: milwaukee.image,
        alt: "Milwaukee 2235-20 clamp meter",
        caption: (
          <>
            A clamp meter reads the cord&apos;s actual current without cutting into it. See our{" "}
            <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
              clamp meter buying guide
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "gauge-and-length", label: "Check gauge against length and load" },
        { id: "measure-actual-current", label: "Measure the actual current draw" },
        { id: "voltage-drop-along-the-cord", label: "Check voltage drop along the cord" },
        { id: "the-numbers", label: "The numbers: heat by wire gauge" },
        { id: "inspect-for-damage", label: "Inspect connectors and insulation" },
        { id: "when-to-stop-using-it", label: "When to stop using a cord" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What gauge extension cord do I need for a given load?",
          a: "It depends on both the current the device draws and the cord's length — a longer cord needs a thicker (lower-gauge-number) wire to carry the same current without excessive voltage drop or heat. Manufacturers publish gauge-vs-length-vs-amperage tables for exactly this reason; check the table for your cord's actual length rather than assuming a cord rated for short runs is fine at double the distance.",
        },
        {
          q: "Is it normal for an extension cord to feel slightly warm?",
          a: "A cord carrying a substantial load for a sustained period can feel mildly warm to the touch without being dangerous, but hot to the touch, discoloration, a melted-plastic smell, or a cord too hot to hold comfortably means it is overloaded or damaged and should be disconnected immediately.",
        },
        {
          q: "Can a coiled-up extension cord overheat even under a light load?",
          a: "Yes. A cord left coiled or spooled traps heat that would otherwise dissipate along its length, which can cause overheating even at a current draw the cord would normally handle safely when fully uncoiled. Always fully uncoil a cord before using it for any sustained or heavy load.",
        },
        {
          q: "What does a high resistance reading at a plug or connector mean?",
          a: "It usually means a loose or corroded connection inside the plug, socket, or splice. That point concentrates the circuit's resistance in a small area, so it heats up disproportionately to the rest of the cord — often enough to discolor or melt the plastic right at that spot even while the rest of the cord stays cool.",
        },
        {
          q: "Can two devices on one extension cord add up to an overload even if each is fine alone?",
          a: "Yes. The cord carries the combined current of everything plugged into it, not just one device's draw. Add up the rated amps (or watts ÷ volts) of everything connected and compare the total against the cord's ampacity rating for its length, not just the largest single device.",
        },
      ]}
      next={[
        {
          href: "/multimeters/clamp-meter-buying-guide",
          title: "Clamp Meter Buying Guide",
          desc: "Jaw size, AC vs. AC/DC, and when a clamp meter is the right tool.",
        },
        {
          href: "/multimeters/how-to-measure-ac-current-with-a-clamp-meter",
          title: "How to Measure AC Current With a Clamp Meter",
          desc: "The technique this guide's current measurement is built on.",
        },
      ]}
    >
      <Callout title="Stop using a cord that's hot, damaged, or smells like melting plastic">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug and stop using any cord that is hot to the touch, discolored, melted, or smells of burning plastic — don&apos;t wait to finish measuring it.</li>
          <li>Never clamp around both conductors of a cord together; clamp a single conductor only, or the opposing fields cancel and you&apos;ll read close to zero.</li>
          <li>Inspect plugs and connectors with the cord unplugged before handling them.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="gauge-and-length">Check gauge against length and load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Find the cord&apos;s wire gauge (printed on the jacket, e.g. 16 AWG or 12 AWG) and its length, then
          check that combination against the rated current of whatever is plugged into it. The same gauge
          cord handles less current safely the longer it runs, because resistance — and the heat it
          produces — increases with length.
        </p>
        <DataTable
          head={["Gauge (AWG)", "Typical safe ampacity (varies by length and standard)"]}
          rows={[
            ["16", "Lower current only, shorter lengths"],
            ["14", "Moderate current, moderate lengths"],
            ["12", "Higher current, or the same current over longer lengths"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Treat these as a rough starting point only — use the manufacturer&apos;s own length-vs-amperage
          chart for your specific cord rather than a general table.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="measure-actual-current">Measure the actual current draw</StepHeading>
        <p className="text-muted leading-7">
          A clamp meter has to go around a single conductor, and an extension cord keeps both inside one
          jacket, so plug the cord into an AC line splitter (an inexpensive adapter with a loop that
          separates one conductor) and clamp that loop while the device runs under its normal load. Never
          cut or split the cord&apos;s jacket to reach a wire. The nameplate on the tool or appliance gives
          its rated amps if you don&apos;t have a clamp meter. Compare that reading against the cord&apos;s
          rated ampacity for its gauge and length.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="voltage-drop-along-the-cord">Check voltage drop along the cord</StepHeading>
        <p className="text-muted leading-7">
          With the load running, measure voltage at the wall outlet, then measure voltage at the far end of
          the cord where the device plugs in. A healthy cord under a reasonable load drops only a small
          percentage of the supply voltage; a larger drop means the cord (or a connection along it) is
          undersized or damaged for the current it&apos;s carrying.
        </p>
      </section>

      <section>
        <h2 id="the-numbers" className="text-xl font-semibold mb-3">The numbers: heat by wire gauge</h2>
        <p className="text-muted leading-7 mb-4">
          A cord heats up because its copper has resistance, and the power turned into heat is the current
          squared times that resistance (P = I² × R). Current flows out on one conductor and back on the
          other, so a 50 ft cord puts 100 ft of wire in the circuit. Using standard copper resistance
          figures at room temperature (about 4.0Ω per 1,000 ft for 16 AWG, 2.5Ω for 14 AWG and 1.6Ω for
          12 AWG), here is a 50 ft cord feeding a 13A load on a 120V circuit:
        </p>
        <DataTable
          head={["Gauge", "Round-trip resistance", "Voltage drop at 13A", "Heat in the cord"]}
          rows={[
            ["16 AWG", "≈ 0.40Ω", "≈ 5.2V (4.4%)", "≈ 68W"],
            ["14 AWG", "≈ 0.25Ω", "≈ 3.3V (2.7%)", "≈ 43W"],
            ["12 AWG", "≈ 0.16Ω", "≈ 2.1V (1.7%)", "≈ 27W"],
          ]}
          mono={[1, 2, 3]}
        />
        <div className="mt-4">
          <BarChart
            items={[
              { label: "16 AWG, 50 ft, 13A", value: 68, display: "≈ 68W of heat", highlight: true },
              { label: "14 AWG, 50 ft, 13A", value: 43, display: "≈ 43W" },
              { label: "12 AWG, 50 ft, 13A", value: 27, display: "≈ 27W" },
            ]}
          />
        </div>
        <p className="text-muted leading-7 mt-4 mb-4">
          The arithmetic for the 16 AWG row: 100 ft × 4.0Ω / 1,000 ft ≈ 0.40Ω; 13A × 0.40Ω ≈ 5.2V; and
          13² × 0.40 ≈ 68W. Spread along a straight, uncoiled cord, 68W is warm but manageable. Wound on a
          reel, the same 68W is trapped in a tight bundle that can&apos;t shed it, which is why reels carry
          a lower rating when coiled. Because heat rises with the square of current, doubling the load
          quadruples the heat. A connection is a different story: a loose plug blade with even 0.1Ω of
          contact resistance turns about 17W into heat at 13A inside a space the size of a fingertip, which
          is what melts plugs.
        </p>
        <Figure
          caption={
            <>
              Both conductors of the cord act as resistors in series with the load. Heat in the wire is spread
              along its whole length; heat at a bad contact is concentrated in one small spot, so it gets hot
              far faster.
            </>
          }
        >
          <svg viewBox="0 0 360 160" className="w-full h-auto" role="img" aria-label="Extension cord circuit: outlet, two cord conductors drawn as resistances spread along their length, a hot spot at a loose plug contact, and the load">
            <g className="stroke-foreground" strokeWidth="1.6" fill="none">
              <rect x="10" y="40" width="44" height="70" rx="5" className="fill-surface" />
              <rect x="306" y="40" width="44" height="70" rx="5" className="fill-surface" />
              <path d="M54 55 H80 l6 -6 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l6 6 H306" />
              <path d="M54 95 H80 l6 -6 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l6 6 H306" />
            </g>
            <circle cx="290" cy="55" r="9" className="fill-accent/40 stroke-accent" strokeWidth="1.6" />
            <g fontSize="9" textAnchor="middle" className="fill-foreground">
              <text x="32" y="32">outlet</text>
              <text x="328" y="32">load</text>
              <text x="32" y="79" className="fill-muted">120V</text>
              <text x="328" y="79" className="fill-muted">13A</text>
              <text x="180" y="30" className="fill-muted">hot conductor: heat spread along its length</text>
              <text x="180" y="124" className="fill-muted">neutral conductor: same current, same heat</text>
              <text x="270" y="146" className="fill-accent">loose contact: heat in one spot</text>
            </g>
            <path d="M290 64 V136" className="stroke-accent" strokeWidth="1.2" strokeDasharray="3 2" />
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="inspect-for-damage">Inspect connectors and insulation</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the cord unplugged, look along its full length for cracked, nicked, or discolored insulation,
          and check both plug and any inline connectors for looseness, corrosion, or heat-discoloration.
          Flex the cord gently near the connectors while watching for any visible damage underneath the
          jacket.
        </p>
        <div className="mt-4">
          <KeyIdea title="A hot spot at one point usually means a bad connection, not a bad cord">
            If the cord runs cool along most of its length but is hot right at the plug, socket, or a
            splice, suspect a loose or corroded connection at that specific point rather than the cord being
            generally undersized.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 id="when-to-stop-using-it" className="text-xl font-semibold mb-3">When to stop using a cord</h2>
        <p className="text-muted leading-7">
          Retire or replace a cord with cracked or melted insulation, a loose or scorched plug, exposed
          conductors at any point, or one that runs noticeably hot under its rated load even when fully
          uncoiled. For a cord that&apos;s simply undersized for the job, use a heavier-gauge cord rather
          than continuing to run the load through it.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          A clamp meter measures current without cutting into the cord; a standard multimeter handles the
          voltage-drop check. See the{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          or the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
        <ProductStrip
          title="Meters in our reviews"
          items={[
            {
              name: "Milwaukee 2235-20",
              image: milwaukee.image,
              alt: "Milwaukee 2235-20 clamp meter",
              href: "/multimeters/milwaukee-2235-20-review",
              note: "AC clamp current up to 400A — reads a cord's actual load without opening it up.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "For the voltage-drop measurement at each end of the cord.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
