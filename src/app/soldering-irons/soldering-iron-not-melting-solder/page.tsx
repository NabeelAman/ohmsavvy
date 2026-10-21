import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
const description =
  "Why a soldering iron won't melt solder, in order of likelihood: a dirty tip, too low a temperature, not enough wattage, or lead-free solder.";

export const metadata = buildMetadata({
  title: "Why Won't My Soldering Iron Melt Solder?",
  description,
  path: "/soldering-irons/soldering-iron-not-melting-solder",
});

const link = "text-accent hover:underline";

export default function SolderingIronNotMeltingSolderPage() {
  return (
    <HowToShell
      title="Why Won't My Soldering Iron Melt Solder?"
      description={description}
      path="/soldering-irons/soldering-iron-not-melting-solder"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          A soldering iron that won&apos;t melt solder is almost never actually broken. In the large
          majority of cases the cause is a dirty tip, a temperature set too low for the solder you&apos;re
          using, or an iron that simply doesn&apos;t have enough wattage for the joint you&apos;re asking
          it to heat. This guide works through the causes in the order worth checking them, from the
          quickest fix to the least likely.
        </>
      }
      toc={[
        { id: "check-order", label: "The order to check things in" },
        { id: "dirty-tip", label: "1. Oxidised or dirty tip" },
        { id: "wrong-temperature", label: "2. Temperature set too low" },
        { id: "not-enough-power", label: "3. Not enough wattage for the joint" },
        { id: "lead-free-solder", label: "4. Lead-free solder needs more heat" },
        { id: "power-fault", label: "5. A power or element fault" },
        { id: "quick-reference", label: "Quick reference table" },
      ]}
      faq={[
        {
          q: "My iron melts solder fine on the tip but not on the actual joint — what's wrong?",
          a: "This points specifically at a thermal mass problem, not the iron itself: the joint (often a ground plane, thick wire, or large connector pin) is pulling heat away faster than the iron tip can supply it. The tip alone has far less thermal mass than a real joint. Increase dwell time slightly, use a larger tip for better contact area, or move to a higher-wattage iron for that class of joint.",
        },
        {
          q: "Is it normal for solder to take a few seconds to start melting?",
          a: "A brief delay while the tip and joint come up to temperature is normal, generally under two seconds on a properly heated, clean tip touching a typical through-hole joint. If you're routinely waiting five or more seconds, something on this page's list is the cause rather than normal behaviour.",
        },
        {
          q: "Can old solder itself be the problem, not the iron?",
          a: "Yes, in two ways. Very old solder wire can have degraded, less-active flux, making it harder to get a clean melt and wet. Separately, mixing lead-free and leaded solder on the same joint raises the effective melting point of the mix, which can make an iron set for leaded solder seem suddenly underpowered.",
        },
        {
          q: "How do I know if the heating element itself has failed, not just the tip?",
          a: "If the iron no longer reaches a noticeably hot temperature at all — the tip stays close to room temperature, or barely warms after several minutes powered on, even with a known-good, freshly cleaned tip installed — that points to the heating element or its control circuit rather than tip condition. At that point the fix is repair or replacement, not cleaning.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/soldering-iron-tip-care",
          title: "Soldering Iron Tip Care",
          desc: "The full cleaning, tinning, and replacement routine behind cause #1 on this list.",
        },
        {
          href: "/soldering-irons/how-to-use-a-soldering-iron",
          title: "How to Use a Soldering Iron",
          desc: "The correct heat-the-joint-not-the-solder technique, step by step.",
        },
      ]}
    >
      <Callout title="Don't force it">
        If solder isn&apos;t melting, pressing harder or holding the tip against the joint far longer
        than usual doesn&apos;t help — it risks heat-damaging the component or lifting a PCB pad, since
        heat is being applied for much longer than a properly functioning joint requires. Work through
        the causes below instead of pushing past the normal dwell time.
      </Callout>

      <section>
        <h2 id="check-order" className="text-xl font-semibold mb-3">Check these in order</h2>
        <p className="text-muted leading-7 mb-4">
          The causes below are ordered from most common and quickest to rule out, to least common.
          Work through them in order rather than jumping straight to &quot;the iron is broken,&quot;
          which is actually the least likely explanation.
        </p>
        <Figure
          caption={
            <>
              Roughly how often each cause turns out to be the real problem, based on how commonly
              each one is reported across soldering forums and troubleshooting guides — a dirty tip
              and wrong temperature account for the large majority of cases.
            </>
          }
        >
          <svg viewBox="0 0 320 170" className="w-full h-auto" role="img" aria-label="Relative frequency of each cause of solder not melting">
            {[
              { label: "Dirty / oxidised tip", pct: 90 },
              { label: "Temperature too low", pct: 75 },
              { label: "Not enough wattage", pct: 45 },
              { label: "Lead-free solder", pct: 30 },
              { label: "Power/element fault", pct: 10 },
            ].map((d, i) => (
              <g key={d.label} transform={`translate(0, ${i * 32})`}>
                <text x="0" y="14" fontSize="11" className="fill-foreground">{d.label}</text>
                <rect x="0" y="20" width={d.pct * 2.6} height="8" rx="2" className={i < 2 ? "fill-accent" : "fill-accent/40"} />
                <text x={d.pct * 2.6 + 8} y="27" fontSize="10" className="fill-muted">{d.pct}%</text>
              </g>
            ))}
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="dirty-tip">Oxidised or dirty tip — the most common cause by far</StepHeading>
        <p className="text-muted leading-7 mb-3">
          A tip covered in oxide or old, burnt flux barely transfers heat into the joint even when the
          iron itself is at full temperature — the oxide layer insulates the actual metal from whatever
          it touches. This is the first thing to rule out, every time.
        </p>
        <p className="text-muted leading-7">
          <strong className="text-foreground">Fix:</strong> wipe the tip on a damp sponge or brass wool
          and re-tin it with fresh solder before testing again. Full details in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>tip care guide</Link>.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="wrong-temperature">Temperature set too low for your solder</StepHeading>
        <p className="text-muted leading-7">
          Leaded solders (60/40 and 63/37) fully melt in the 183–191°C range, so an iron set below
          roughly 280–300°C at the tip often struggles against normal heat loss into the joint, even
          though that&apos;s well above solder&apos;s melting point on paper. Lead-free solders typically
          need higher iron settings still — see cause 4 below. If your iron has an adjustable
          temperature dial or digital setpoint, confirm it&apos;s actually set where you think it is,
          not accidentally turned down.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="not-enough-power">Not enough wattage for the specific joint</StepHeading>
        <p className="text-muted leading-7 mb-3">
          Wattage determines how fast an iron can replace the heat a joint pulls away from the tip.
          A joint with a lot of connected copper — a ground plane, a thick gauge wire, a large connector
          pin — draws heat away faster than a small isolated pad does. A 15–30W iron that handles small
          signal joints fine can genuinely fail to bring a ground-plane joint up to melting temperature
          at all, not because anything is faulty, but because it&apos;s underpowered for that specific
          joint&apos;s thermal mass.
        </p>
        <p className="text-muted leading-7">
          <strong className="text-foreground">Fix:</strong> for general electronics work, 60–75W gives
          enough headroom for most ground-plane and larger joints — see our{" "}
          <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>buying guide</Link>{" "}
          for wattage guidance by use case.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="lead-free-solder">Lead-free solder needs more heat than you expect</StepHeading>
        <p className="text-muted leading-7">
          Common lead-free alloys (tin-silver-copper blends) melt at roughly 217–220°C — noticeably
          higher than leaded solder&apos;s 183–191°C range, and the practical iron tip temperature needed
          to work with it comfortably is correspondingly higher too. If an iron setting that always
          worked with leaded solder suddenly seems too cold, confirm you haven&apos;t switched to a
          lead-free spool without raising the temperature to match. See our{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            solder alloy comparison
          </Link>{" "}
          for the exact melting ranges.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="power-fault">A genuine power or heating-element fault</StepHeading>
        <p className="text-muted leading-7">
          Only once the four causes above are ruled out does an actual hardware fault become the likely
          explanation — a failed heating element, a damaged power cord or plug, or (on a two-part
          station) a bad connection between the base unit and the handpiece. The telltale sign is an
          iron that stays close to room temperature, or heats only slightly, no matter how long it&apos;s
          left plugged in with a known-clean tip installed.
        </p>
      </section>

      <KeyIdea title="A 2-in-1 station adds one more variable">
        On a combined soldering iron and hot air rework station such as the{" "}
        <Link href="/soldering-irons/yihua-862bd-plus-review" className={link}>YIHUA 862BD+</Link>, the
        iron and hot air gun have independent heating elements and temperature controls. If only the
        iron side won&apos;t melt solder while the hot air side works normally, that narrows the fault
        specifically to the iron handpiece or its own setpoint, not the unit as a whole.
      </KeyIdea>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Symptom", "Most likely cause", "Fix"]}
          rows={[
            ["Tip looks dull/black, solder beads up and rolls off", "Oxidised tip", "Clean on sponge/brass wool, re-tin"],
            ["Works on small joints, fails on ground planes/thick wire", "Not enough wattage for that joint's thermal mass", "Use a higher-wattage iron, or extend dwell slightly with a larger tip"],
            ["Solder melts slowly or only partially", "Temperature set too low for your solder alloy", "Raise the temperature setpoint; confirm leaded vs. lead-free setting"],
            ["Iron barely warms up at all over several minutes", "Power or heating-element fault", "Check the cord/plug; if the element itself is dead, repair or replace"],
          ]}
        />
      </section>
    </HowToShell>
  );
}
