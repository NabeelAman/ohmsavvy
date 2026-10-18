import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-multimeters/page";

export const metadata: Metadata = {
  title: "Multimeter Buying Guide",
  description:
    "What CAT rating, True RMS, resolution, and input impedance actually mean, and how to match a multimeter to your actual use case before you buy.",
  alternates: { canonical: "/multimeters/multimeter-buying-guide" },
};

const featured = ["Fluke 117", "KAIWEETS KM200s", "Fluke 87V"].map(
  (name) => picks.find((p) => p.name === name)!
);

export default function MultimeterBuyingGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>BUYING GUIDE</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Multimeter Buying Guide</h1>
      <p className="mt-5 text-lg text-muted leading-7">
        A multimeter looks like a simple tool — a dial, two probes, a screen — but the spec sheet
        behind it decides whether it keeps you safe, reads accurately, and actually fits the work
        you&apos;re doing. This guide walks through the terms that matter before you compare
        models, so the numbers on our{" "}
        <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
          Top 10 Best Multimeters
        </Link>{" "}
        comparison actually mean something to you.
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
          <h2 className="text-xl font-semibold mb-3">What a multimeter actually measures</h2>
          <p className="text-muted leading-7">
            At minimum, every digital multimeter measures voltage (AC and DC), resistance, and
            continuity. Most also measure current, and many add capacitance, frequency,
            temperature, and a diode test. The core job is the same across every price tier —
            the differences that matter are how safely it does that job, how accurately, and how
            conveniently.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">CAT safety ratings — the one spec you can&apos;t skip</h2>
          <p className="text-muted leading-7">
            CAT (Category) ratings, defined by the IEC 61010 standard, describe how much
            transient voltage spike a meter is built to survive without the probes or the meter
            itself becoming dangerous. This isn&apos;t a marketing number — it&apos;s a real
            electrical safety boundary.
          </p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              <strong className="text-foreground">CAT I</strong> — protected, low-energy
              electronic circuits (signal-level work, not mains-connected).
            </li>
            <li>
              <strong className="text-foreground">CAT II</strong> — single-phase receptacle
              outlets and plug-in equipment (lamps, small appliances).
            </li>
            <li>
              <strong className="text-foreground">CAT III</strong> — fixed building wiring:
              distribution panels, circuit breakers, hardwired equipment. This is the practical
              minimum for most home and electrical work.
            </li>
            <li>
              <strong className="text-foreground">CAT IV</strong> — the origin of the
              installation: the utility connection, outdoor overhead/underground service
              entrance, where transient energy is highest.
            </li>
          </ul>
          <p className="mt-3 text-muted leading-7">
            The number after the category (e.g. &quot;CAT III 600V&quot;) is the maximum voltage
            the meter is rated for at that category. A CAT III 600V meter is NOT automatically
            safe for CAT IV work — category and voltage both have to match the environment.
            Buying a higher CAT rating than you&apos;ll ever use isn&apos;t wasted money; buying a
            lower one than the job requires is a genuine safety risk, not just a spec mismatch.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">True RMS vs. average-responding</h2>
          <p className="text-muted leading-7">
            A True RMS (root-mean-square) meter calculates the actual effective value of an AC
            signal, including non-sinusoidal waveforms. An average-responding meter is calibrated
            assuming a clean sine wave — it&apos;s only accurate on signals that actually look
            like one.
          </p>
          <p className="mt-3 text-muted leading-7">
            This matters more than it used to. Variable-frequency drives, dimmer switches, UPS
            output, and most modern electronics all produce distorted, non-sinusoidal AC. On
            those loads, a non-True-RMS meter can read meaningfully wrong — not slightly off,
            actually wrong — while a True RMS meter stays accurate. If you work on anything beyond
            a clean wall outlet, True RMS stops being a nice-to-have.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Auto-ranging vs. manual ranging</h2>
          <p className="text-muted leading-7">
            An auto-ranging meter detects the approximate magnitude of what you&apos;re measuring
            and picks the correct range automatically. A manual-ranging meter requires you to
            select the range yourself before taking a reading. Auto-ranging is faster and more
            forgiving for most users — especially when you don&apos;t know roughly what value to
            expect. Manual ranging can be marginally faster for an experienced user doing repeated
            measurements in a known range, but it&apos;s a smaller advantage than it used to be
            now that auto-ranging response times have improved across most modern meters.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Resolution and accuracy aren&apos;t the same thing</h2>
          <p className="text-muted leading-7">
            Resolution (often advertised as a &quot;count,&quot; like 6,000-count or
            20,000-count) is how finely the display can distinguish between two close values —
            essentially how many distinct steps the screen can show. Accuracy is a separate
            published spec, usually expressed as a percentage of the reading plus a number of
            digits (e.g. ±0.5% + 2 digits). A higher count gives you a more finely-grained
            display, but it doesn&apos;t automatically mean a more accurate measurement — check
            both numbers, not just the one that&apos;s easier to market.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Input impedance: the spec that protects sensitive circuits</h2>
          <p className="text-muted leading-7">
            Input impedance describes how much the meter itself loads the circuit it&apos;s
            measuring. A low-impedance meter can noticeably skew voltage readings on
            high-impedance circuits (sensitive electronics, some control systems) simply by being
            connected. Most modern digital multimeters use a high input impedance (commonly
            10 MΩ) specifically to avoid this, but it&apos;s worth confirming on any meter you&apos;re
            considering for electronics work rather than general electrical troubleshooting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Features worth checking for your specific work</h2>
          <ul className="mt-1 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              <strong className="text-foreground">Continuity and diode test</strong> — standard on
              nearly every meter; useful for checking fuses, cables, and basic component health.
            </li>
            <li>
              <strong className="text-foreground">Capacitance and frequency measurement</strong> —
              useful for electronics work and motor/drive diagnostics.
            </li>
            <li>
              <strong className="text-foreground">Non-contact voltage (NCV) detection</strong> —
              a fast first check before you even attach probes, common on home/DIY-oriented
              meters.
            </li>
            <li>
              <strong className="text-foreground">Clamp function</strong> — measures current by
              clamping around a conductor instead of breaking the circuit open. See our{" "}
              dedicated comparison on the main article&apos;s FAQ section for whether a clamp
              meter should replace or supplement a standard multimeter for your work.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Build quality and certification marks</h2>
          <p className="text-muted leading-7">
            A CAT rating only means something if it&apos;s backed by actual third-party safety
            certification — look for a recognized listing mark (UL, CSA, or TÜV, depending on
            region) printed on the meter itself, not just claimed in the product description.
            Beyond certification, physical build quality matters more for a multimeter than most
            tools, because it&apos;s frequently used one-handed near live circuits: a textured,
            over-molded case that won&apos;t slip, a kickstand for hands-free bench use, and probe
            leads with adequate insulation thickness for the CAT rating they&apos;re sold with.
            Cheap replacement leads sold separately don&apos;t always carry the same rating as the
            meter they&apos;re plugged into — if you swap leads, match the rating, not just the
            connector size.
          </p>
          <p className="mt-3 text-muted leading-7">
            Battery type and life matter more in practice than they first appear. A meter that
            auto-powers-off after a few minutes of inactivity will outlast one that doesn&apos;t,
            and a meter using a common battery size (AA, 9V) is cheaper to keep running long-term
            than one requiring a proprietary rechargeable pack, even if the pack looks more modern
            on the spec sheet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Calibration and when a meter stops being trustworthy</h2>
          <p className="text-muted leading-7">
            Consumer and prosumer multimeters don&apos;t require routine calibration the way lab
            or industrial calibration-certified instruments do, but accuracy does drift over time
            and after physical shocks — a meter that&apos;s been dropped, had its leads crushed in
            a toolbox, or been exposed to moisture is worth cross-checking against a known-good
            reference (a wall outlet&apos;s nominal voltage, for instance) before you trust a
            reading that matters. If a meter starts reading inconsistently on a value you know
            should be stable, that&apos;s a sign to retire it, not a quirk to work around.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Matching a meter to what you actually do</h2>
          <p className="text-muted leading-7">
            The &quot;best&quot; multimeter changes depending on the work, which is why a single
            overall ranking only gets you partway there. We maintain separate, narrower
            comparisons for the most common use cases:
          </p>
          <ul className="mt-3 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              <Link href="/multimeters/best-multimeter-for-electricians" className="text-accent hover:underline">
                Best Multimeter for Electricians
              </Link>{" "}
              — CAT III/IV picks built for panel and fixed-wiring work.
            </li>
            <li>
              <Link href="/multimeters/best-multimeter-for-automotive" className="text-accent hover:underline">
                Best Multimeter for Automotive Diagnostics
              </Link>{" "}
              — RPM, dwell, and duty-cycle functions for engine and electrical system work.
            </li>
            <li>
              <Link href="/multimeters/best-multimeter-for-home-use" className="text-accent hover:underline">
                Best Multimeter for Home Use & DIY
              </Link>{" "}
              — easy, affordable picks without CAT IV-level overkill for occasional use.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Reading the display: symbols worth knowing before you buy</h2>
          <p className="text-muted leading-7">
            Most multimeter displays use a consistent set of symbols across brands, which makes
            switching between meters easier once you know them. A sine wave icon (∿) or
            &quot;ACV&quot; indicates AC voltage mode; a straight line with a dashed line beneath
            it (or &quot;DCV&quot;) indicates DC. Ω is resistance, a diode symbol activates
            continuity/diode test mode, and F indicates capacitance. A small battery icon warns of
            low internal battery — on a meter you&apos;re trusting for safety-relevant readings,
            replace the battery at the first warning rather than waiting for it to die, since
            accuracy can degrade before the meter actually shuts off.
          </p>
          <p className="mt-3 text-muted leading-7">
            One practical habit worth adopting regardless of which meter you buy: verify the meter
            is working correctly before every safety-critical measurement by first testing it on a
            known live source (a known-good outlet, for instance), confirming continuity on a
            short between the leads, then taking your actual measurement. This single habit — test,
            measure, test again — catches a dead battery or blown fuse before it gives you a false
            &quot;no voltage present&quot; reading on a circuit that&apos;s actually live.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Common mistakes buyers make</h2>
          <ul className="mt-1 space-y-2 text-muted leading-7 list-disc pl-5">
            <li>
              Buying on resolution (count) alone and ignoring the published accuracy spec.
            </li>
            <li>
              Assuming any digital multimeter is automatically True RMS — many budget meters
              still aren&apos;t, and it&apos;s stated explicitly in the spec sheet, not implied.
            </li>
            <li>
              Choosing a CAT rating based on price instead of the actual environment it&apos;ll be
              used in — this is the one place where under-spec&apos;ing is a safety issue, not
              just a convenience one.
            </li>
            <li>
              Overlooking fuse protection on the current-measurement inputs — a meter without
              properly rated internal fuses can fail unsafely if a current input is
              over-ranged or miswired.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Where to go next</h2>
          <p className="text-muted leading-7">
            With these terms in hand, the spec columns in our{" "}
            <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
              full Top 10 multimeter comparison
            </Link>{" "}
            should read less like marketing copy and more like the actual safety and accuracy
            trade-offs they represent. Every spec in that comparison is checked against the
            manufacturer&apos;s own datasheet or official listing — see{" "}
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
