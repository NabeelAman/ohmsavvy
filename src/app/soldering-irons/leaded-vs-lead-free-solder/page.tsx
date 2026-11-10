import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Leaded solder melts at 183C and flows easily; common lead-free alloys melt around 217-220C and need more heat and flux. What that gap means for your iron.";

export const metadata = buildMetadata({
  title: "Leaded vs. Lead-Free Solder",
  description,
  path: "/soldering-irons/leaded-vs-lead-free-solder",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const spec = (name: string, label: string) => pick(name).specs.find((s) => s.label === label)?.value ?? "Not stated";
const hakko888dx = pick("Hakko FX-888DX");
const weller = pick("Weller WE1010NA");

const link = "text-accent hover:underline";

export default function LeadedVsLeadFreeSolderPage() {
  return (
    <HowToShell
      title="Leaded vs. Lead-Free Solder"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/soldering-irons/leaded-vs-lead-free-solder"
      category="soldering-irons"
      intro={
        <>
          Leaded tin-lead solder melts at a single sharp point around 183°C and flows easily, wetting joints
          with little effort. Lead-free alloys, most commonly tin-silver-copper blends like SAC305, melt roughly
          34–37°C higher, around 217–220°C, and tend to need more flux and a hotter iron to wet a joint as
          cleanly. Leaded solder remains legal and common for hobby and repair work; lead-free is required by
          regulation for most new commercially sold consumer electronics in several major markets, which is why
          it dominates factory-made boards even though hobbyists are generally still free to use either.
        </>
      }
      aside={{
        image: hakko888dx.image,
        alt: "Hakko FX-888DX soldering station with adjustable temperature control",
        caption: (
          <>
            A station with real temperature control, like the Hakko FX-888DX, makes switching between leaded and
            lead-free solder straightforward. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              Hakko FX-888DX review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "melting-point", label: "The melting-point gap" },
        { id: "why-it-matters", label: "Why the gap matters at the iron tip" },
        { id: "regulation", label: "Why lead-free became standard" },
        { id: "which-to-use", label: "Which one should you actually use?" },
        { id: "mixing", label: "Mixing leaded and lead-free" },
        { id: "irons", label: "Irons that handle both" },
      ]}
      faq={[
        {
          q: "Is leaded solder illegal to use?",
          a: "For hobby, repair, and most non-commercial use, no — restrictions on leaded solder generally target new commercially manufactured consumer products, not individual repair or hobby work. Still, handle any leaded solder with basic precautions: wash your hands after use, solder in a ventilated area, and avoid eating or drinking while working with it.",
        },
        {
          q: "Why does lead-free solder look duller or grainier than leaded joints?",
          a: "Common lead-free alloys solidify differently than eutectic tin-lead solder, often producing a slightly duller, more matte or grainy-looking joint even when it's perfectly sound. This is a known visual characteristic of the alloy, not necessarily a sign of a bad joint — judge a lead-free joint by its shape and coverage, not by comparing its shine to a leaded one.",
        },
        {
          q: "Can I use leaded solder on a board that was originally soldered with lead-free?",
          a: "Yes, for repair work this is common practice and generally fine electrically. The two alloys can mix at the joint; some assemblers avoid mixing on products that must stay certified lead-free for regulatory reasons, which matters for manufacturers more than for individual repairs.",
        },
        {
          q: "Does lead-free solder need a different soldering iron?",
          a: "Not a different iron, but a hotter one if yours can't reach the higher range lead-free solder needs — a temperature-controlled iron that only goes up to roughly 350°C may struggle with a 217-220°C-melting alloy once you account for real-world heat loss at the joint. Stations rated well above that, like the Hakko FX-888DX's full range, cover both alloy types comfortably.",
        },
        {
          q: "Why does lead-free solder sometimes form a spiky or crystalline point?",
          a: "This is sometimes called a disturbed joint or a cold-joint-like effect, and it happens when the joint is moved while the alloy is still solidifying — lead-free alloys can be more prone to this visually. Let the joint sit undisturbed until it has fully cooled and solidified, and reflow it if the surface looks irregular rather than smooth.",
        },
        {
          q: "Is lead-free solder more prone to tin whiskers?",
          a: "Tin whiskers — tiny metallic filaments that can grow from pure or near-pure tin finishes over time — are a recognized concern specifically with some lead-free finishes, which is why reliability-critical and aerospace applications often require leaded solder by exception even where lead-free is otherwise standard. For typical hobby and repair work, this is a minor consideration rather than a practical problem.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/60-40-vs-63-37-solder",
          title: "60/40 vs 63/37 Solder",
          desc: "Two leaded alloys compared: eutectic vs. a pasty transition range.",
        },
        {
          href: "/soldering-irons/what-wattage-soldering-iron-do-i-need",
          title: "What Wattage Soldering Iron Do I Need?",
          desc: "More reserve matters more with a hotter-melting lead-free alloy.",
        },
      ]}
    >
      <Callout title="Lead safety, briefly">
        <ul className="space-y-2 list-disc pl-5">
          <li>Solder in a ventilated area and avoid breathing flux fumes directly, regardless of alloy.</li>
          <li>Wash your hands after handling leaded solder, and don&apos;t eat or drink while working with it.</li>
          <li>Store leaded solder out of reach of children, and keep it separate from food-contact items.</li>
        </ul>
      </Callout>

      <section id="melting-point" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">The melting-point gap</h2>
        <p className="text-muted leading-7 mb-4">
          63/37 tin-lead solder is the eutectic ratio for that alloy system, meaning it transitions directly from
          solid to liquid at one specific temperature with no soft in-between phase: about 183°C. Lead-free
          alloys swap out the lead for other metals — most commonly silver and copper in SAC305 (roughly 96.5%
          tin, 3% silver, 0.5% copper) — which raises the melting point substantially, to roughly 217–220°C
          depending on the exact alloy and source.
        </p>
        <Figure caption="Melting point comparison. Lead-free figures vary somewhat by exact alloy; SAC305 is the most common lead-free blend for hand soldering.">
          <BarChart
            items={[
              { label: "63/37 tin-lead (eutectic)", value: 183, display: "183°C" },
              { label: "SAC305 lead-free", value: 218, display: "≈217–220°C", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          That roughly 35°C gap is the source of nearly every practical difference between the two: how hot the
          iron needs to be set, how long a joint takes to flow, and how much margin there is before you&apos;re
          working right at the edge of what a lower-wattage or poorly calibrated iron can sustain.
        </p>
      </section>

      <section id="why-it-matters" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why the gap matters at the iron tip</h2>
        <p className="text-muted leading-7">
          An iron set to melt lead-free solder is working closer to its own maximum output on many consumer
          irons, which leaves less thermal reserve if the joint pulls heat away quickly — the same recovery
          problem covered in{" "}
          <Link href="/soldering-irons/what-wattage-soldering-iron-do-i-need" className={link}>
            what wattage soldering iron do I need
          </Link>
          . Lead-free alloys are also generally reported to wet less readily and oxidize a tip faster at
          sustained high temperature, which is why lead-free work tends to use more flux and benefits from more
          frequent tip cleaning. None of this makes lead-free solder harder to use well, but it does mean a
          setpoint and technique tuned for 183°C leaded solder usually needs adjusting, not just reusing as-is.
        </p>
      </section>

      <section id="regulation" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why lead-free became standard</h2>
        <p className="text-muted leading-7">
          Lead-free solder became the default in mass-produced consumer electronics largely because of
          environmental and health regulations restricting lead in new commercial products sold in several major
          markets, which pushed manufacturers toward lead-free assembly at scale. Those regulations generally
          target new products placed on the commercial market, not individual hobbyists, repair technicians, or
          existing equipment — which is why leaded solder remains widely available and commonly used for repair
          and hobby work even as factory-made boards have shifted to lead-free.
        </p>
      </section>

      <section id="which-to-use" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Which one should you actually use?</h2>
        <DataTable
          head={["Situation", "Reasonable choice", "Why"]}
          rows={[
            ["General hobby electronics, personal repairs", "Leaded (63/37)", "Lower temperature, easier wetting, more forgiving for learning"],
            ["Repairing an existing lead-free assembled board", "Either", "Both alloys can be used for repair; match the existing joint if staying consistent matters to you"],
            ["Building something for commercial sale as new", "Lead-free", "Required by regulation in several major markets for new consumer products"],
            ["Teaching beginners", "Leaded (63/37)", "Lower melting point and eutectic behavior make for more consistent first joints"],
          ]}
        />
        <KeyIdea title="Neither alloy is wrong for hobby work">
          Where regulation doesn&apos;t dictate the choice, leaded solder&apos;s lower temperature and easier
          wetting make it a reasonable default for learning and repair, while lead-free is the right call for
          anything built to be sold as new.
        </KeyIdea>
      </section>

      <section id="mixing" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Mixing leaded and lead-free</h2>
        <p className="text-muted leading-7">
          For repair work, adding leaded solder to an existing lead-free joint, or the reverse, is common practice
          and generally not a problem electrically or mechanically for typical hobby and repair applications.
          Where it does matter is certification: a board or assembly that must stay officially lead-free compliant
          for regulatory reasons shouldn&apos;t have leaded solder introduced into it, which is a consideration for
          manufacturers and certified repair shops rather than individual hobbyists reworking their own projects.
        </p>
      </section>

      <section id="irons" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Irons that handle both</h2>
        <p className="text-muted leading-7 mb-5">
          Any iron with a wide enough adjustable temperature range and enough wattage in reserve handles both
          alloy types without issue — the key spec to check is the top of its temperature range relative to
          lead-free&apos;s higher melting point, with margin left over for real joints.
        </p>
        <DataTable
          head={["Iron", "Temperature range"]}
          rows={[
            ["Hakko FX-888DX", spec("Hakko FX-888DX", "Temperature control")],
            ["Weller WE1010NA", spec("Weller WE1010NA", "Temperature control")],
          ]}
        />
        <div className="mt-6">
          <ProductStrip
            title="Irons with range to spare for lead-free work"
            items={[
              {
                name: "Hakko FX-888DX",
                image: hakko888dx.image,
                alt: "Hakko FX-888DX soldering station",
                href: "/soldering-irons/hakko-fx888d-review",
                note: `${spec("Hakko FX-888DX", "Temperature control")}, comfortable margin above lead-free's melting point.`,
              },
              {
                name: "Weller WE1010NA",
                image: weller.image,
                alt: "Weller WE1010NA soldering station",
                href: "/soldering-irons/weller-we1010na-review",
                note: `${spec("Weller WE1010NA", "Temperature control")}, ESD-safe station with room for either alloy.`,
              },
            ]}
          />
        </div>
      </section>
    </HowToShell>
  );
}
