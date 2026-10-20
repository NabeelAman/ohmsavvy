import { ContentLinks } from "@/components/ContentLinks";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { picks } from "../best-multimeters/page";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "How to Test Electrical Wires With a Multimeter",
  description: "How to find an open or shorted wire with continuity mode, test automotive wiring safely, and the resistance-measurement principle that makes both possible.",
  path: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
  image: picks.find((p) => p.name === "Klein Tools MM400")?.image,
});

const pick = picks.find((p) => p.name === "Klein Tools MM400")!;

/** Numbered step heading, matching the other how-to guides. */
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

export default function HowToTestElectricalWiresWithAMultimeterPage() {
  return (
    <>
      <article className="mx-auto max-w-4xl px-6 py-16">
        <Eyebrow>HOW-TO GUIDE</Eyebrow>
        <div className="grid sm:grid-cols-[1fr_260px] gap-8 items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl leading-tight">How to Test Electrical Wires With a Multimeter</h1>
            <p className="mt-5 text-lg text-muted leading-7">
              Most wire problems come down to one of two faults: an open (a break somewhere along
              the run) or a short (an unintended connection to another wire or ground). A multimeter
              finds both, and the same continuity-mode technique works whether you&apos;re tracing a
              wire in household wiring or troubleshooting a digital multimeter on a car.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-raised shadow-sm overflow-hidden">
            <div className="h-1.5 bg-accent" />
            {pick.image ? (
              <div className="h-40 flex items-center justify-center bg-surface p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pick.image} alt="A digital multimeter used for continuity testing" className="h-full object-contain" />
              </div>
            ) : null}
            <p className="px-4 py-3 text-xs text-muted leading-5">
              Any meter with a continuity or resistance mode can do this — see our{" "}
              <Link href="/multimeters/best-multimeters" className="text-accent hover:underline">
                Top 10 comparison
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          <Callout title="De-energize the circuit before you test">
            Continuity and resistance mode send the meter&apos;s own small test current through the
            probes, and that only gives a meaningful reading — or a safe one — on a circuit with no
            external power applied. Switch off the breaker or disconnect the battery before testing
            a wire this way, and confirm with a voltage check first if there&apos;s any doubt.
            Testing building wiring also means your meter needs the right CAT rating for the
            circuit you&apos;re working on — see our{" "}
            <Link href="/multimeters/multimeter-buying-guide" className="text-accent hover:underline">
              buying guide
            </Link>{" "}
            if you&apos;re not sure what that means for your meter.
          </Callout>

          <section>
            <StepHeading n={1}>Finding an open wire with continuity mode</StepHeading>
            <p className="text-muted leading-7">
              With the circuit de-energized, set the dial to continuity mode and touch one probe to
              each end of the wire you&apos;re testing. A beep (and a near-zero reading) means the
              wire is intact end to end. No beep means there&apos;s a break somewhere along its
              length — a corroded connector, a pinched or cut section, or a failed splice. If you
              can access the wire at a midpoint, testing from each end to that midpoint narrows down
              which half of the run actually has the break.
            </p>
          </section>

          <section>
            <StepHeading n={2}>Finding a short to another wire or to ground</StepHeading>
            <p className="text-muted leading-7">
              A short shows up the opposite way: continuity (a beep) where you don&apos;t expect any.
              With the circuit still de-energized and the suspect wire disconnected at both ends,
              touch one probe to the wire and the other to the chassis, ground, or the neighboring
              wire you suspect it&apos;s shorting to. A beep here means they&apos;re connected when
              they shouldn&apos;t be — the fault is somewhere in the insulation between those two
              points.
            </p>
          </section>

          <section>
            <StepHeading n={3}>How resistance measurement actually makes this work</StepHeading>
            <p className="text-muted leading-7">
              Continuity mode is really just resistance mode with a beeper threshold built in, and
              the underlying multimeter resistance measurement principle is the same either way: the
              meter applies a small, known current from its own internal battery through the probes
              and measures the resulting voltage drop, then calculates resistance using Ohm&apos;s
              law (R = V ÷ I). That&apos;s why it only works on a de-energized circuit — an external
              voltage source would overwhelm the meter&apos;s own tiny test current and produce a
              meaningless or dangerous reading. A healthy wire has a resistance low enough that the
              meter reads it as near-zero; a break shows up as near-infinite resistance (no current
              can complete the loop at all).
            </p>
          </section>

          <section>
            <StepHeading n={4}>Testing a digital multimeter on a car</StepHeading>
            <p className="text-muted leading-7 mb-4">
              Automotive electrical systems are 12V DC nominal, which is far less dangerous than
              household mains, but the same continuity principle applies, with a few things specific
              to cars:
            </p>
            <ul className="space-y-2 text-muted leading-7 list-disc pl-5">
              <li>
                <strong className="text-foreground">Testing a fuse</strong> — pull it and run a
                continuity check across the two legs. A beep means it&apos;s good; no beep means it&apos;s
                blown. Never test a fuse for continuity while it&apos;s still in the circuit and the
                circuit is live.
              </li>
              <li>
                <strong className="text-foreground">Checking the charging system</strong> — with the
                engine running, DC voltage at the battery terminals should read noticeably higher
                than the battery&apos;s resting voltage (typically in the 13.5–14.5V range for a
                healthy alternator); a reading at or below resting battery voltage with the engine
                running points to a charging problem.
              </li>
              <li>
                <strong className="text-foreground">Tracing a wire in a harness</strong> — the same
                continuity technique from Step 1 works, but disconnect the wire from both the battery
                and any module it connects to first, since most of a car&apos;s wiring uses the
                chassis itself as the ground return path, which can create unexpected continuity
                paths if you don&apos;t isolate the wire you&apos;re actually testing.
              </li>
            </ul>
          </section>

          <Callout title="Automotive-specific cautions">
            Keep the multimeter leads clear of moving parts — belts, fans, pulleys — whenever the
            engine could start or is running. Disconnect the battery&apos;s negative terminal before
            working on wiring you&apos;ll be touching with bare hands or metal tools, since a
            dropped wrench across the battery terminals or chassis can cause a direct short with
            enough current to cause burns or start a fire, even at only 12V. If a wiring problem is
            inside an airbag, ABS, or other safety-critical module&apos;s harness, that&apos;s worth
            leaving to a qualified technician rather than troubleshooting it yourself.
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
                href="/multimeters/best-multimeter-for-automotive"
                className="group rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors"
              >
                <p className="font-medium group-hover:text-accent transition-colors">Best Multimeter for Automotive →</p>
                <p className="mt-1 text-sm text-muted leading-6">
                  Verified picks with the RPM, dwell, and duty-cycle modes automotive diagnostics
                  actually use.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>
      <ContentLinks category="multimeters" current="/multimeters/how-to-test-electrical-wires-with-a-multimeter" />
    </>
  );
}
