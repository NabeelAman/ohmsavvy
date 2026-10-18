import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-soldering-irons/page";

export const metadata: Metadata = {
  title: "Soldering Iron Buying Guide",
  description:
    "What wattage, temperature control, tip selection, and lead-free solder compatibility actually mean, so you can pick the right iron for your work.",
  alternates: { canonical: "/soldering-irons/soldering-iron-buying-guide" },
};

const featured = ["Hakko FX888D", "Pinecil V2", "Weller WE1010NA"].map(
  (name) => picks.find((p) => p.name === name)!
);

export default function SolderingIronBuyingGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>BUYING GUIDE</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Soldering Iron Buying Guide</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        A soldering iron&apos;s spec sheet looks simple — a wattage number, a temperature range,
        maybe a tip count — but those numbers decide whether you get a clean joint on the first
        try or spend ten minutes fighting a cold tip. This guide covers what actually matters
        before you compare models in our{" "}
        <Link href="/soldering-irons/best-soldering-irons" className="text-accent hover:underline">
          Best Soldering Irons
        </Link>{" "}
        comparison.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {featured.map((p) => (
          <div key={p.name} className="rounded-lg border border-border bg-surface-raised overflow-hidden">
            <div className="h-1.5 bg-accent" />
            {p.image ? (
              <div className="h-32 flex items-center justify-center bg-surface p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full object-contain" />
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center bg-surface text-xs text-muted p-3 text-center">
                Photo pending manufacturer confirmation
              </div>
            )}
            <div className="p-3">
              <p className="text-xs text-muted uppercase tracking-wide">{p.badge}</p>
              <p className="font-medium text-sm mt-0.5">{p.name}</p>
              <Button href={p.ctaHref} className="mt-2 w-full">
                Check price →
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-3">Wattage: power, not temperature</h2>
          <p className="text-muted leading-7">
            Wattage describes how much heat energy an iron can deliver and, critically, how
            quickly it can recover that heat after touching a joint — it isn&apos;t the
            temperature itself. A higher-wattage iron can hold a stable tip temperature on a
            larger joint (thick wire, a ground plane, a connector shell) that would otherwise pull
            heat away faster than a lower-wattage iron can replace it. For small PCB work, 15-40W
            is usually plenty. For wire harnesses, chassis grounds, or anything with significant
            thermal mass, 60W or more keeps the tip from sagging mid-joint.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Fixed-temperature vs. temperature-controlled</h2>
          <p className="text-muted leading-7">
            A fixed-temperature iron runs at whatever temperature its internal element settles
            at — simple, cheap, and fine for occasional light use. A temperature-controlled iron
            uses a sensor and feedback loop to hold a set temperature regardless of how much heat
            the joint is pulling away, and lets you dial in a specific temperature for the solder
            and components you&apos;re working with. For anything beyond occasional hobby use,
            temperature control is worth paying for — it&apos;s the difference between guessing
            and actually knowing what temperature is reaching the joint.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">What temperature should you actually use?</h2>
          <p className="text-muted leading-7">
            For leaded solder (the common 60/40 or 63/37 tin-lead alloys), 315-370°C (600-700°F)
            covers most general electronics work. Lead-free solder has a higher melting point and
            typically needs 350-400°C (650-750°F) to flow properly. Heat-sensitive components
            (some connectors, certain ICs) may call for lower temperatures with longer dwell
            times instead of cranking the heat up — check the component&apos;s datasheet rather
            than assuming hotter is always better. Running consistently hotter than necessary
            shortens tip life and increases the risk of lifting pads on thin PCB traces.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Tip selection and tip life</h2>
          <p className="text-muted leading-7">
            The tip shape matters more than most buyers expect. A conical tip is the most
            general-purpose option; a chisel tip transfers heat faster for larger joints; a
            fine-point tip suits dense, closely-spaced SMD work. Most quality irons use
            interchangeable tips on a common base, so check tip availability and price for a
            specific iron before buying — a cheap iron with expensive, hard-to-find tips can cost
            more over time than a slightly pricier iron with a wide, affordable tip ecosystem.
          </p>
          <p className="mt-3 text-muted leading-7">
            Tip life depends heavily on maintenance, not just the tip&apos;s material quality.
            Tinning the tip (coating it in a thin layer of fresh solder) before storage, wiping it
            on a damp sponge or brass wool between joints rather than scraping it bare, and never
            leaving an iron at full temperature unused for long stretches all meaningfully extend
            a tip&apos;s working life.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Soldering station vs. standalone iron vs. portable/cordless</h2>
          <p className="text-muted leading-7">
            A soldering station pairs the iron with a base unit holding the power supply,
            temperature controls, and often a stand and sponge — the standard setup for a
            dedicated home or hobby bench. A standalone iron (no base unit) is cheaper and more
            compact but usually sacrifices fine temperature control. Portable/cordless irons —
            commonly USB-C powered now — trade some raw power and sustained thermal mass for the
            ability to work anywhere, including from a power bank, which matters for field repair
            or travel use but is a real trade-off for sustained, high-thermal-mass work.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Lead-free vs. leaded solder — and why it affects your iron choice</h2>
          <p className="text-muted leading-7">
            Leaded solder is generally easier to work with (lower melting point, better flow,
            more forgiving joints) but is restricted or banned in consumer electronics in many
            regions under RoHS-style regulations; it remains legal and common for hobbyist and
            repair use in most places, but check local rules if you&apos;re unsure. Lead-free
            solder requires higher temperatures and a slightly different technique (often a bit
            more dwell time on the joint), which is one more reason a basic fixed-temperature iron
            can struggle — if you need to switch between the two, a controllable iron with
            adequate wattage headroom makes the transition far less frustrating.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Flux, ventilation, and ESD — the parts of the kit people forget</h2>
          <p className="text-muted leading-7">
            Flux isn&apos;t optional for clean joints — it removes oxidation and lets solder flow
            properly, and most solder wire already contains a flux core, but additional liquid or
            paste flux helps on oxidized or reworked joints. Soldering produces fumes that
            genuinely shouldn&apos;t be breathed directly — a small fume extractor or at minimum
            working in a ventilated space is worth the modest cost. If you work on
            static-sensitive components, an ESD-safe iron tip and grounding strap matter as much
            as the iron&apos;s temperature spec, since a static discharge through an ungrounded
            iron tip can silently damage a component with no visible symptom until later.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Heat-up time and why it matters more than it sounds</h2>
          <p className="text-muted leading-7">
            Heat-up time — how long an iron takes to reach working temperature from cold —
            matters more in practice than it looks on a spec sheet. An iron that takes 60+ seconds
            to warm up discourages quick single-joint fixes (you either wait or work with an
            under-temperature tip, which causes exactly the cold-joint problems a hotter tip would
            avoid). Modern ceramic-heating-element irons commonly reach working temperature in
            10-15 seconds, which changes how you actually use the tool day to day — it turns a
            soldering iron from something you plan around into something you just pick up and use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Desoldering: the other half of the job</h2>
          <p className="text-muted leading-7">
            Every soldering purchase decision should also account for desoldering, since rework
            and mistakes are inevitable. A solder sucker (manual vacuum pump) is cheap and works
            for simple through-hole removal. Desoldering braid (wick) is better for cleaning up
            excess solder or lifting a component with closely-spaced pins. For frequent rework —
            especially multi-pin components — a dedicated desoldering iron or hot air rework
            station does the job far more cleanly than either, but represents a separate purchase
            and a different skill curve from basic soldering. None of these substitute for a
            properly-temperature-matched soldering iron in the first place; good initial technique
            reduces how often you need to desolder at all.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common mistakes buyers make</h2>
          <ul className="mt-1 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              Buying the highest wattage available &quot;to be safe&quot; — more wattage than you need
              mainly just risks overheating delicate work, it doesn&apos;t make joints better.
            </li>
            <li>
              Ignoring tip ecosystem cost and availability until after buying the iron.
            </li>
            <li>
              Assuming a cheap fixed-temperature iron can handle both delicate SMD work and heavy
              wire gauge work equally well — it&apos;s a genuine trade-off, not a marketing
              exaggeration.
            </li>
            <li>
              Skipping tip maintenance (tinning before storage, gentle cleaning) and then blaming
              the iron when a tip oxidizes and stops transferring heat well.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Stand, sleep mode, and everyday safety details</h2>
          <p className="text-muted leading-7">
            A proper stand with a built-in sponge or brass-wool cleaner isn&apos;t a minor
            accessory — setting a hot iron down on a bare bench is how irons scorch surfaces and,
            occasionally, start small fires. Many temperature-controlled irons include an
            auto-sleep or auto-off function that drops the tip temperature after a period of
            inactivity and wakes back up when picked up — genuinely useful for safety and tip life
            alike, since it prevents a forgotten iron from sitting at full temperature
            indefinitely. If you&apos;re buying for a shared workspace or for a less experienced
            user, prioritizing this feature is worth more than chasing a slightly faster heat-up
            time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Where to go next</h2>
          <p className="text-muted leading-7">
            With these trade-offs in mind, the specs in our{" "}
            <Link href="/soldering-irons/best-soldering-irons" className="text-accent hover:underline">
              full soldering iron comparison
            </Link>{" "}
            should map directly onto the kind of work you actually do. Every spec there is
            checked against the manufacturer&apos;s own datasheet or official listing — see{" "}
            <Link href="/about" className="text-accent hover:underline">
              how we verify products
            </Link>{" "}
            for the full methodology.
          </p>
        </section>
      </div>
    </article>
  );
}
