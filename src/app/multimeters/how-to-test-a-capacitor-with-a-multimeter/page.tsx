import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How to Test a Capacitor With a Multimeter",
  description: "How to safely discharge a capacitor, then test it with resistance mode or a dedicated capacitance mode — in-circuit vs. out-of-circuit, and what the reading means.",
  path: "/multimeters/how-to-test-a-capacitor-with-a-multimeter",
});

const pick = picks.find((p) => p.name === "UNI-T UT139C")!;

function ResultCard({ label, reading, meaning, tone }: { label: string; reading: string; meaning: string; tone: "good" | "bad" }) {
  return (
    <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4">
      <p className={`font-display text-xs uppercase tracking-wide ${tone === "good" ? "text-signal" : "text-accent"}`}>
        {label}
      </p>
      <p className="mt-2 font-mono text-sm font-semibold">{reading}</p>
      <p className="mt-1 text-xs text-muted leading-5">{meaning}</p>
    </div>
  );
}

/** Numbered step heading, matching the sequence used on the "how to use a multimeter" guide. */
function StepHeading({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-semibold mb-3">
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground font-display text-sm">
        {n}
      </span>
      {children}
    </h2>
  );
}

/** Safety/warning callout, using the warm warn-bg token reserved for exactly this. */
function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-accent/30 bg-warn-bg p-5">
      <p className="flex items-center gap-2 font-display text-sm font-semibold text-accent mb-2">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 2.5l8 14.5H2L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M10 8v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10" cy="14.5" r="0.9" fill="currentColor" />
        </svg>
        {title}
      </p>
      <div className="text-muted leading-7">{children}</div>
    </div>
  );
}

export default function HowToTestACapacitorWithAMultimeterPage() {
  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className="grid sm:grid-cols-[1fr_260px] gap-8 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">How to Test a Capacitor With a Multimeter</h1>
            <p className="mt-5 text-lg text-muted leading-7">
              A multimeter can&apos;t give you a lab-grade capacitor measurement, but it&apos;s
              enough to answer the question that actually matters in a repair: is this capacitor
              shorted, open, or roughly behaving the way a healthy one should. Here&apos;s how to do
              it safely, in the right order.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden">
            <div className="h-1.5 bg-accent" />
            {pick.image ? (
              <div className="h-40 flex items-center justify-center bg-surface p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pick.image} alt="A digital multimeter set to resistance mode" className="h-full object-contain" />
              </div>
            ) : null}
            <p className="px-4 py-3 text-xs text-muted leading-5">
              Any auto-ranging multimeter with a resistance (Ω) mode can do the basic pass/fail
              check — see our{" "}
              <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
                full multimeter roundup
              </Link>
              . A dedicated capacitance (F) mode gives a more precise number.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-4">The process at a glance</h2>
            <div className="flex flex-wrap items-stretch gap-2">
              {[
                "Discharge safely",
                "Remove from circuit",
                "Resistance-mode check",
                "Capacitance mode (if available)",
              ].map((label, i, arr) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="rounded-lg border border-border bg-surface-raised shadow-sm px-4 py-3 flex items-center gap-2 min-w-0">
                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground font-display text-xs">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted shrink-0" aria-hidden="true">
                      <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <StepHeading n={1}>Discharge the capacitor — don&apos;t skip this</StepHeading>
            <p className="text-muted leading-7 mb-4">
              A capacitor can hold a dangerous charge long after the power to its circuit is turned
              off or unplugged, sometimes for minutes or hours on larger units. Touching a charged
              capacitor&apos;s leads, or a meter&apos;s probes to them, can deliver a real shock, and
              a large charged capacitor can also damage your meter&apos;s internal protection.
            </p>
            <div className="rounded-lg border border-border bg-surface-raised shadow-sm p-4 max-w-sm">
              <svg viewBox="0 0 160 90" className="w-full h-auto text-muted" aria-hidden="true">
                <line x1="70" y1="20" x2="70" y2="70" stroke="currentColor" strokeWidth="2.5" />
                <line x1="90" y1="20" x2="90" y2="70" stroke="currentColor" strokeWidth="2.5" />
                <line x1="70" y1="45" x2="20" y2="45" stroke="currentColor" strokeWidth="1.5" />
                <line x1="90" y1="45" x2="140" y2="45" stroke="currentColor" strokeWidth="1.5" />
                <path d="M30 20 Q 80 0 130 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="80" y="12" textAnchor="middle" fontSize="9" fill="currentColor">resistor across the leads</text>
                <text x="60" y="85" textAnchor="middle" fontSize="9" fill="currentColor">capacitor</text>
              </svg>
              <p className="mt-2 text-xs text-muted leading-5 text-center">
                Bridge the two leads with a resistor (roughly 1k–10kΩ, rated for the job) for a few
                seconds rather than a bare metal short.
              </p>
            </div>
            <div className="mt-4">
              <Callout title="Don't short it with a screwdriver">
                Shorting the leads directly with a screwdriver or bare wire is a common myth, not a
                safe method — it dumps the full stored energy almost instantly, which can spark, pit
                the capacitor&apos;s terminals, or injure you on anything beyond the smallest caps. A
                resistor bleeds the charge down safely over a second or two instead. Once
                discharged, confirm with your multimeter in DC voltage mode that the capacitor reads
                close to 0V before you touch the leads or move to the next step. Large motor-run or
                motor-start capacitors, and anything inside equipment like microwave ovens or older
                CRT displays, can store enough energy to be genuinely dangerous even discharged
                incorrectly — if you&apos;re not confident discharging a specific capacitor safely,
                have a qualified technician handle it instead.
              </Callout>
            </div>
          </section>

          <section>
            <StepHeading n={2}>Pull it out of the circuit if you can</StepHeading>
            <p className="text-muted leading-7">
              Testing a capacitor while it&apos;s still soldered into a circuit can give a misleading
              reading, because other components wired in parallel provide alternate paths for the
              meter&apos;s test current. Desoldering one leg is enough — you don&apos;t need to
              remove the whole component, just break the parallel path. If you can&apos;t
              desolder it at all, treat any in-circuit reading as a rough indicator rather than a
              confirmed result.
            </p>
          </section>

          <section>
            <StepHeading n={3}>The quick pass/fail check in resistance mode</StepHeading>
            <p className="text-muted leading-7 mb-5">
              Set your meter to resistance (Ω) mode. For a polarized electrolytic capacitor, touch
              red to the positive lead and black to negative — this uses the meter&apos;s own small
              internal test current to charge the capacitor, which is what produces the pattern
              you&apos;re actually looking for.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <ResultCard
                label="Healthy"
                reading="Climbs toward OL"
                meaning="Resistance starts low and rises steadily toward infinity (OL) as the meter charges the cap. This is the sign of a capacitor that's actually holding charge."
                tone="good"
              />
              <ResultCard
                label="Shorted"
                reading="Stays near 0Ω"
                meaning="A reading that stays low and never climbs usually means the capacitor has internally shorted and needs replacing."
                tone="bad"
              />
              <ResultCard
                label="Open / dead"
                reading="Immediate OL"
                meaning="No climb at all, just an instant open-circuit reading, points to an internally broken connection."
                tone="bad"
              />
            </div>
            <p className="mt-5 text-muted leading-7">
              This test tells you whether a capacitor is dramatically failed (shorted or open). It
              won&apos;t catch subtler failures, like a capacitor that&apos;s lost some of its rated
              capacitance or developed high internal resistance (ESR) while still technically
              holding some charge — those need a dedicated capacitance or ESR meter to diagnose with
              confidence.
            </p>
          </section>

          <section>
            <StepHeading n={4}>If your meter has a capacitance (F) mode</StepHeading>
            <p className="text-muted leading-7">
              Switch to capacitance mode, connect the leads (polarity still matters on an
              electrolytic cap), and compare the displayed value to the capacitance printed on the
              component&apos;s body. Electrolytic capacitors commonly carry a wide tolerance from the
              factory — often ±20%— so a reading well outside that range, not just slightly off, is
              what actually indicates a problem worth acting on.
            </p>
          </section>

          <Callout title="Common mistakes">
            <ul className="space-y-2 list-disc pl-5">
              <li>Testing a capacitor without discharging it first — the single most common way beginners get a real shock from a &quot;dead&quot; circuit.</li>
              <li>Shorting the leads with a screwdriver instead of a resistor to discharge a larger capacitor.</li>
              <li>Judging a capacitor by resistance mode alone when the circuit really calls for a proper capacitance reading.</li>
              <li>Testing in-circuit and treating a borderline reading as conclusive, when a parallel component could be the real cause.</li>
            </ul>
          </Callout>

          <section className="pt-2">
            <h2 className="text-xl font-semibold mb-4">Where to go next</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/multimeters/how-to-use-a-multimeter"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">How to Use a Multimeter →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  Voltage, resistance, continuity, and safe current measurement, from the basics up.
                </p>
              </Link>
              <Link
                href="/multimeters/best-multimeters"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">Full Multimeter Roundup →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  Verified meters capable of this kind of diagnostic work, across every budget.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>
      <ContentLinks category="multimeters" current="/multimeters/how-to-test-a-capacitor-with-a-multimeter" />
    </>
  );
}
