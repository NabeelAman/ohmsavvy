import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Same 600V, different impulse rating: CAT III withstands 6,000V transients, CAT IV 8,000V. What that means for where each meter is actually safe to use.";

export const metadata = buildMetadata({
  title: "CAT III vs CAT IV Multimeter: What Differs",
  description,
  path: "/multimeters/cat-iii-vs-cat-iv-multimeter",
});

const fluke87v = picks.find((p) => p.name === "Fluke 87V")!;
const fluke117 = picks.find((p) => p.name === "Fluke 117")!;
const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

export default function CatIiiVsCatIvMultimeterPage() {
  return (
    <HowToShell
      title="CAT III vs CAT IV Multimeter: What Actually Differs"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/multimeters/cat-iii-vs-cat-iv-multimeter"
      category="multimeters"
      intro={
        <>
          At the same voltage number, a CAT IV meter is built to survive a bigger electrical transient than a
          CAT III meter. For a 600V rating specifically, Fluke&apos;s own safety reference lists a 6,000V impulse
          withstand test for CAT III 600V and 8,000V for CAT IV 600V — a third more transient energy the
          insulation, spacing, and protection circuitry have to absorb without the meter failing. CAT III covers
          fixed building wiring (panels, breakers, hardwired equipment); CAT IV adds the service entrance and
          anything on the utility side of the main disconnect, where a lightning-induced or switching transient
          arrives with the least amount of cable and impedance to dampen it first.
        </>
      }
      aside={{
        image: fluke87v.image,
        alt: "Fluke 87V digital multimeter, rated CAT III 1000V and CAT IV 600V",
        caption: (
          <>
            The Fluke 87V carries both a CAT III 1000V and a CAT IV 600V rating on the same meter. See our{" "}
            <Link href="/multimeters/fluke-87v-review" className={link}>
              Fluke 87V review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "numbers", label: "The impulse numbers, side by side" },
        { id: "why", label: "Why the service entrance is worse" },
        { id: "where", label: "Where each rating actually applies" },
        { id: "voltage-vs-category", label: "The voltage number isn't the whole rating" },
        { id: "do-i-need", label: "Do you need CAT IV?" },
        { id: "which-meter", label: "Meters that cover both" },
      ]}
      faq={[
        {
          q: "Is a CAT IV meter just a CAT III meter with a higher voltage number?",
          a: "No. CAT IV and CAT III can share the same voltage number — 600V, for example — while the CAT IV meter is built to withstand a larger impulse transient at that voltage. The category describes how close to the utility source the meter is rated to work, not just how many volts it can read.",
        },
        {
          q: "Can I use a CAT III meter on CAT IV work?",
          a: "No. A CAT III meter isn't tested to the higher impulse level CAT IV locations can produce, so using it there removes a real safety margin the rating exists to provide. Use a meter rated for the category of the location, not just its nominal voltage.",
        },
        {
          q: "Is it safe to use a CAT IV meter on CAT III or lower work?",
          a: "Yes. A higher category rating covers everything below it at the same or lower voltage, so a CAT IV 600V meter is also safe for CAT III, CAT II, and CAT I work at 600V and under. There's no safety downside to having more margin than the job strictly requires.",
        },
        {
          q: "What CAT rating do I need for a home electrical panel?",
          a: "CAT III 600V covers a typical residential distribution panel, breakers, and the fixed wiring between them. CAT IV becomes relevant only if you're working at the utility meter, the service entrance, or outdoor overhead/underground service conductors — ahead of the main disconnect.",
        },
        {
          q: "Why do some test leads have a CAT rating too?",
          a: "The leads are part of the insulation system the overall rating depends on — thin, poorly insulated leads can undermine a well-rated meter. Use leads rated for the same category and voltage as the meter, from the maker or a leads set explicitly rated to match.",
        },
        {
          q: "Does a higher CAT rating mean the meter is more accurate?",
          a: "No. CAT rating is a safety and transient-withstand specification, unrelated to accuracy, resolution, or True RMS capability. A CAT II meter can be more accurate than a CAT IV one; buy for category based on where you'll use it, and separately check accuracy and features for the work itself.",
        },
      ]}
      next={[
        {
          href: "/multimeters/multimeter-buying-guide",
          title: "Multimeter Buying Guide",
          desc: "CAT ratings alongside True RMS, resolution, and the rest of what to check before buying.",
        },
        {
          href: "/multimeters/best-multimeter-for-electricians",
          title: "Best Multimeters for Electricians",
          desc: "CAT III/IV picks built for panel and fixed-wiring work.",
        },
      ]}
    >
      <Callout title="Match the meter to the location, not just the voltage">
        <ul className="space-y-2 list-disc pl-5">
          <li>A 600V meter rated only CAT III is not an acceptable substitute for CAT IV work at 600V.</li>
          <li>Check the full rating printed on the meter — both the category letters and the voltage number — before working on any circuit.</li>
          <li>Test leads, probes, and fuses must carry a matching category and voltage rating; a weak link in any of them undermines the whole chain.</li>
        </ul>
      </Callout>

      <section id="numbers" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">The impulse numbers, side by side</h2>
        <p className="text-muted leading-7 mb-4">
          Fluke publishes the specific impulse test each category and voltage combination has to withstand, using
          a standardized test source impedance. At 600V, CAT IV requires surviving a third more peak transient
          voltage than CAT III, tested through a lower source impedance that lets more energy reach the meter
          during the test.
        </p>
        <Figure caption="Impulse withstand voltage at 600V, per Fluke's published CAT safety reference. Each category is tested through a different source impedance, noted alongside.">
          <BarChart
            items={[
              { label: "CAT II 600V (12 Ω source)", value: 4000, display: "4,000 V" },
              { label: "CAT III 600V (2 Ω source)", value: 6000, display: "6,000 V" },
              { label: "CAT IV 600V (2 Ω source)", value: 8000, display: "8,000 V", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The lower source impedance in the CAT III and CAT IV tests (2 Ω versus 12 Ω for CAT II) matters as much
          as the peak voltage: a lower source impedance lets a transient deliver more energy in the same instant,
          which is a closer match to what a meter actually faces near a utility connection than a simple voltage
          number alone would suggest.
        </p>
      </section>

      <section id="why" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why the service entrance is worse</h2>
        <p className="text-muted leading-7">
          A lightning strike on a power line, or a large load switching off somewhere on the grid, sends a
          transient down the conductors toward every connected building. Cable length, transformer windings, and
          circuit impedance all absorb and spread out some of that energy as it travels further from the source.
          Fixed wiring deep inside a building — a distribution panel several rooms from the service entrance — has
          more of that natural damping ahead of it than the service entrance itself, where the transient has
          barely traveled at all. CAT IV exists for exactly that location: the service entrance, the utility
          meter, and overhead or underground conductors ahead of the main disconnect, where the worst-case
          transient is largest and least dampened.
        </p>
      </section>

      <section id="where" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Where each rating actually applies</h2>
        <DataTable
          head={["Location", "Typical rating needed"]}
          rows={[
            ["Plug-in appliances, receptacle outlets", "CAT II"],
            ["Distribution panels, breakers, fixed branch circuit wiring", "CAT III"],
            ["Feeders and panels in industrial or commercial buildings", "CAT III (often 1000V)"],
            ["Utility meter, service entrance conductors", "CAT IV"],
            ["Overhead or underground service drop ahead of the main disconnect", "CAT IV"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Most residential and light-commercial electrical work — panels, breakers, outlets, switches, and
          hardwired equipment — falls inside CAT III. CAT IV becomes the relevant rating specifically at or
          before the point where utility power first enters the building, which is a smaller slice of jobs for
          most electricians and a rare one for hobbyists and homeowners.
        </p>
      </section>

      <section id="voltage-vs-category" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">The voltage number isn&apos;t the whole rating</h2>
        <p className="text-muted leading-7 mb-4">
          A meter&apos;s full safety rating is the category and the voltage together, such as &quot;CAT III
          600V&quot; or &quot;CAT IV 600V&quot; — neither number alone describes it. A meter can also carry two
          ratings at once, each with its own voltage, which is how a single meter covers both a higher-voltage
          CAT III job and a lower-voltage CAT IV job.
        </p>
        <DataTable
          head={["Meter", "Full rating as published"]}
          rows={[
            ["Fluke 117", "CAT III 600V"],
            ["Fluke 179", "CAT IV 600V"],
            ["Fluke 87V", "CAT III 1000V / CAT IV 600V"],
          ]}
        />
        <KeyIdea title="Check both numbers, every time">
          A CAT IV 600V meter is not automatically safe for CAT III 1000V work, and a CAT III 1000V meter is not
          automatically CAT IV-rated at any voltage. Read the full printed rating, not just whichever number is
          larger.
        </KeyIdea>
      </section>

      <section id="do-i-need" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Do you need CAT IV?</h2>
        <p className="text-muted leading-7">
          If your work stays inside the building — panels, breakers, branch circuits, outlets, and connected
          equipment — a correctly voltage-rated CAT III meter already covers it, and buying CAT IV specifically
          for that work adds margin you won&apos;t use. CAT IV earns its keep for anyone who routinely works at or
          ahead of the service entrance: some electricians, utility technicians, and anyone testing at the meter
          base or service conductors themselves. Since a CAT IV-rated meter also covers CAT III and CAT II work at
          the same voltage, buying CAT IV is never the wrong choice safety-wise — it&apos;s a question of whether the
          extra capability matches the work you actually do.
        </p>
      </section>

      <section id="which-meter" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Meters that cover both</h2>
        <p className="text-muted leading-7 mb-5">
          A dual-rated meter is the practical answer for anyone whose work crosses both categories: full CAT III
          protection at a higher voltage for panel work, plus CAT IV coverage at a lower voltage for the rarer job
          at the service entrance. For a deeper look at every spec beyond CAT rating, see the{" "}
          <Link href="/multimeters/multimeter-buying-guide" className={link}>
            multimeter buying guide
          </Link>
          .
        </p>
        <ProductStrip
          title="CAT III and CAT IV rated meters"
          items={[
            {
              name: "Fluke 87V",
              image: fluke87v.image,
              alt: "Fluke 87V industrial digital multimeter",
              href: "/multimeters/fluke-87v-review",
              note: "CAT III 1000V / CAT IV 600V, dual-rated on one meter. Hands-on tested.",
            },
            {
              name: "Fluke 179",
              image: fluke179.image,
              alt: "Fluke 179 True RMS digital multimeter with bar graph",
              href: "/multimeters/best-multimeters",
              note: "CAT IV 600V, covers service-entrance work at that voltage.",
            },
            {
              name: "Fluke 117",
              image: fluke117.image,
              alt: "Fluke 117 True RMS digital multimeter",
              href: "/multimeters/fluke-117-review",
              note: "CAT III 600V, built for panel and fixed-wiring work. Hands-on tested.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
