import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-soldering-irons/page";
import { buildMetadata } from "@/lib/metadata";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { BarChart, DataTable, Figure } from "@/components/HowTo";

export const metadata = buildMetadata({
  title: "Soldering Iron Buying Guide",
  description: "What wattage, temperature control, tip selection, and lead-free solder compatibility actually mean, so you can pick the right iron for your work.",
  path: "/soldering-irons/soldering-iron-buying-guide",
});

const featured = ["Hakko FX-888DX", "Pinecil V2", "Weller WE1010NA"].map(
  (name) => picks.find((p) => p.name === name)!
);

const faqs = [
  {
    q: "What wattage soldering iron do I need?",
    a: "15-40W is usually plenty for small PCB work. For wire harnesses, chassis grounds, or anything with significant thermal mass, 60W or more keeps the tip from sagging mid-joint. Wattage describes how fast the iron can replace heat lost to the joint, not the temperature itself — a higher-wattage iron isn't hotter, it just recovers faster.",
  },
  {
    q: "Do I need a temperature-controlled soldering iron?",
    a: "For anything beyond occasional light use, yes. A fixed-temperature iron runs at whatever its internal element settles at, with no way to adjust for different solder types or heat-sensitive components. A temperature-controlled iron holds a set temperature regardless of how much heat the joint pulls away, which is the difference between guessing and actually knowing what's reaching the joint.",
  },
  {
    q: "What temperature should I use for lead-free solder?",
    a: "350-400°C (650-750°F) for most lead-free work, versus 315-370°C (600-700°F) for leaded 60/40 or 63/37 solder. Lead-free alloys melt at a higher point (SAC305 around 218°C versus 183°C for 63/37) and need more headroom above that to flow properly before the tip cools from touching a cold joint.",
  },
  {
    q: "How long should a soldering iron take to heat up?",
    a: "Modern ceramic-heating-element irons commonly reach working temperature in 10-15 seconds; some irons run 30-60+ seconds. A slow-heating iron discourages quick single-joint fixes — you either wait or work with an under-temperature tip, which causes the cold-joint problems a hotter tip would avoid.",
  },
  {
    q: "Do I need an ESD-safe soldering iron?",
    a: "Yes, if you work on static-sensitive components. A static discharge through an ungrounded iron tip can silently damage a component with no visible symptom until later. An ESD-safe tip and grounding strap matter as much as the iron's temperature spec for this kind of work.",
  },
];

export default function SolderingIronBuyingGuidePage() {
  return (
    <>
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
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
              <div className="relative h-32">
                <PhotoPlaceholder category="soldering-irons" size="sm" />
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
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-raised border-b border-border text-left">
                  <th className="py-2.5 px-4 font-display text-xs text-muted uppercase">Solder type</th>
                  <th className="py-2.5 px-4 font-display text-xs text-muted uppercase">Typical tip temperature</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Leaded (60/40, 63/37)", "315–370°C (600–700°F)"],
                  ["Lead-free", "350–400°C (650–750°F)"],
                  ["Heat-sensitive components", "Lower temp, longer dwell time — check the datasheet"],
                ].map(([type, temp]) => (
                  <tr key={type} className="border-b border-border last:border-0">
                    <td className="py-2.5 px-4 font-medium">{type}</td>
                    <td className="py-2.5 px-4 text-muted font-mono">{temp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-muted leading-7 mb-4">
            Why so far above the melting point? Eutectic 63/37 tin-lead melts at 183°C and the
            common lead-free alloy SAC305 at about 217–220°C, yet the recommended tip settings sit
            roughly 130–180°C higher. The tip loses heat the instant it touches a cold pad and
            component lead, and the joint itself has to rise above the melting point quickly
            enough that the flux is still active when the solder flows. The diagram shows that
            gap for both alloys.
          </p>
          <Figure caption="Melting point versus typical tip setting for leaded and lead-free solder. Melting points are standard alloy values; tip ranges are the typical settings from the table above.">
            <svg
              viewBox="0 0 360 150"
              className="w-full h-auto"
              role="img"
              aria-label="Temperature scale from 150 to 450 degrees Celsius. For 63/37 leaded solder, a marker at the 183 degree melting point and a shaded working band from 315 to 370 degrees. For SAC305 lead-free solder, a marker at about 218 degrees and a shaded band from 350 to 400 degrees. The gap between each melting point and its band is the headroom the tip needs to recover heat lost to the joint."
            >
              <line x1="20" y1="120" x2="340" y2="120" className="stroke-foreground" strokeWidth="1.4" />
              {[150, 200, 250, 300, 350, 400, 450].map((t) => {
                const x = 20 + ((t - 150) / 300) * 320;
                return (
                  <g key={t}>
                    <line x1={x} y1="116" x2={x} y2="124" className="stroke-foreground" strokeWidth="1" />
                    <text x={x} y="138" fontSize="9" textAnchor="middle" className="fill-muted">
                      {t}°C
                    </text>
                  </g>
                );
              })}
              <text x="20" y="28" fontSize="10" className="fill-foreground">63/37 leaded</text>
              <rect x="196" y="36" width="58.7" height="16" rx="3" className="fill-accent" opacity="0.35" />
              <line x1="55.2" y1="34" x2="55.2" y2="54" className="stroke-accent" strokeWidth="2" />
              <text x="59" y="64" fontSize="9" className="fill-accent">melts 183°C</text>
              <text x="196" y="64" fontSize="9" className="fill-muted">tip 315–370°C</text>
              <text x="20" y="80" fontSize="10" className="fill-foreground">SAC305 lead-free</text>
              <rect x="233.3" y="86" width="53.3" height="16" rx="3" className="fill-accent" opacity="0.35" />
              <line x1="92.5" y1="84" x2="92.5" y2="104" className="stroke-accent" strokeWidth="2" />
              <text x="96" y="112" fontSize="9" className="fill-accent">melts ~218°C</text>
              <text x="233" y="112" fontSize="9" className="fill-muted">tip 350–400°C</text>
            </svg>
          </Figure>
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
          <div className="mt-4 grid grid-cols-3 gap-3 max-w-md">
            <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-3 flex flex-col items-center text-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent" aria-hidden="true">
                <path d="M16 4v16l6 8h-12l6-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-medium">Conical</p>
              <p className="text-xs text-muted leading-4">General-purpose work</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-3 flex flex-col items-center text-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent" aria-hidden="true">
                <path d="M16 4v18l10 6H6l10-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-medium">Chisel</p>
              <p className="text-xs text-muted leading-4">Faster heat transfer, larger joints</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-3 flex flex-col items-center text-center gap-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent" aria-hidden="true">
                <path d="M16 4v20l2 4h-4l2-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-medium">Fine-point</p>
              <p className="text-xs text-muted leading-4">Dense, closely-spaced SMD work</p>
            </div>
          </div>
          <p className="mt-3 text-muted leading-7">
            Tip life depends heavily on maintenance, not just the tip&apos;s material quality.
            Tinning the tip (coating it in a thin layer of fresh solder) before storage, wiping it
            on a damp sponge or brass wool between joints rather than scraping it bare, and never
            leaving an iron at full temperature unused for long stretches all meaningfully extend
            a tip&apos;s working life.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">How the irons we cover compare on paper</h2>
          <p className="text-muted leading-7 mb-4">
            The table pulls the power, temperature control and heat-up figures for five irons in
            our roundup, as each maker or official listing states them. &quot;Not stated&quot;
            means the maker doesn&apos;t publish the number, not that the iron is slow.
          </p>
          <DataTable
            head={["Iron", "Type", "Iron power", "Temperature control", "Heat-up"]}
            rows={[
              ["Hakko FX-888DX", "Station", "65W iron (100W station)", "Digital, closed-loop, 50–480°C", "Not stated"],
              ["Weller WE1010NA", "Station", "70W iron (85W station)", "Digital, ESD-safe", "~28 s (50–350°C)"],
              ["X-Tronic 3020-XTS", "Station", "60W iron (75W station)", "PID, 200–480°C", "Under 30 s (listing)"],
              ["Pinecil V2", "Portable USB-C", "Up to 88W at 24V; ~60W on 20V PD", "OLED digital", "~12 s (20V+ supply)"],
              ["Q-MING 60W Kit", "Plug-in pen iron", "60W", "Dial, 200–450°C", "~15 s"],
            ]}
          />
          <div className="mt-5">
            <Figure caption="Rated iron power for the same five irons. The Pinecil V2 bar is its 24V maximum; on a 20V USB-C PD charger it is closer to 60W.">
              <BarChart
                items={[
                  { label: "Pinecil V2 (24V)", value: 88, display: "88W" },
                  { label: "Weller WE1010NA", value: 70, display: "70W iron" },
                  { label: "Hakko FX-888DX iron", value: 65, display: "65W", highlight: true },
                  { label: "X-Tronic 3020-XTS iron", value: 60, display: "60W" },
                  { label: "Q-MING 60W Kit", value: 60, display: "60W" },
                ]}
              />
            </Figure>
          </div>
          <p className="mt-4 text-muted leading-7">
            Read the chart with the wattage section above in mind: all five clear the 15–40W that
            small PCB work needs, so for most benches the deciding factors are temperature control
            and tip choice rather than the last few watts. Where the numbers do separate them is
            the portable option. The Pinecil&apos;s rating depends on its power source, so a weak
            USB-C charger turns an 88W iron into a much smaller one. See the details in our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className="text-accent hover:underline">
              Weller WE1010NA review
            </Link>{" "}
            and{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className="text-accent hover:underline">
              Pinecil V2 review
            </Link>
            .
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

        <section className="scroll-mt-28" id="faq">
          <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
          <div className="divide-y divide-border rounded-lg border border-border">
            {faqs.map((f) => (
              <div key={f.q} className="p-5">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-muted leading-7">{f.a}</p>
              </div>
            ))}
          </div>
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
    <ContentLinks category="soldering-irons" current="/soldering-irons/soldering-iron-buying-guide" />
    </>
  );
}
