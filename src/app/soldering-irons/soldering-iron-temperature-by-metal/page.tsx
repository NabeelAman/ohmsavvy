import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";

const description =
  "How to set soldering iron temperature for different metals and solder alloys, from fine copper wire to thick ground planes, and why hotter isn't always better.";

export const metadata = buildMetadata({
  title: "Soldering Iron Temperature by Metal",
  description,
  path: "/soldering-irons/soldering-iron-temperature-by-metal",
});

const link = "text-accent hover:underline";

export default function SolderingIronTemperatureByMetalPage() {
  return (
    <HowToShell
      title="Soldering Iron Temperature by Metal"
      description={description}
      path="/soldering-irons/soldering-iron-temperature-by-metal"
      category="soldering-irons"
      published="2026-10-21"
      intro={
        <>
          The right iron temperature depends on two things at once: the solder alloy you&apos;re using
          and how much metal mass the joint has to heat. The same 300°C setting that works perfectly on
          a small signal wire can genuinely struggle on a thick ground connection, not because the
          temperature is wrong, but because more mass pulls heat away faster than the iron can replace
          it at that setting.
        </>
      }
      toc={[
        { id: "the-two-variables", label: "The two variables: alloy and thermal mass" },
        { id: "by-solder-alloy", label: "Setpoint by solder alloy" },
        { id: "by-joint-type", label: "Setpoint by joint / metal type" },
        { id: "heat-flow-diagram", label: "Why thermal mass changes the picture" },
        { id: "why-hotter-isnt-better", label: "Why hotter isn't simply better" },
        { id: "signs-to-adjust", label: "Signs you should adjust" },
        { id: "preheating-tip", label: "Preheating for extreme thermal mass" },
        { id: "quick-reference", label: "Quick reference table" },
      ]}
      faq={[
        {
          q: "What temperature should I start at if I'm not sure?",
          a: "Around 315-345°C (600-650°F) for leaded solder on typical through-hole electronics work is a reasonable, widely-used starting point. Adjust upward if solder is melting slowly or joints are taking more than two to three seconds to wet, and downward if you're seeing scorched flux or damaged components.",
        },
        {
          q: "Does wire gauge affect the right temperature setting?",
          a: "It affects how long you need to hold the joint at temperature more than the setpoint itself. Thicker wire has more thermal mass and pulls heat away from the tip faster, so it benefits from either a slightly higher setpoint, a larger tip for better contact area, or simply a touch more dwell time — not a fundamentally different temperature range.",
        },
        {
          q: "Can I just leave my iron at one temperature for everything?",
          a: "For a lot of general hobby work, yes — many hobbyists pick one setpoint in the 300-350°C range for leaded solder and rarely change it. Where it matters is at the extremes: very fine SMD work benefits from a slightly lower, more controlled setting, and large ground-plane joints benefit from going higher or switching to a bigger tip rather than fighting a joint that won't heat through.",
        },
        {
          q: "Is it true that a lower temperature is always gentler on components?",
          a: "Not quite — a temperature too low for the joint often means holding the iron there much longer to compensate, and that extended dwell time can do more heat damage to a component than a correctly higher setting applied briefly. Matching temperature to the joint, rather than always running cool, usually protects components better.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/60-40-vs-63-37-solder",
          title: "60/40 vs 63/37 Solder",
          desc: "The exact melting ranges behind the leaded-solder setpoints on this page.",
        },
        {
          href: "/soldering-irons/soldering-iron-not-melting-solder",
          title: "Why Won't My Soldering Iron Melt Solder?",
          desc: "A temperature set too low for the joint is one of the most common causes.",
        },
      ]}
    >
      <section>
        <h2 id="the-two-variables" className="text-xl font-semibold mb-3">The two variables: solder alloy and thermal mass</h2>
        <p className="text-muted leading-7">
          &quot;What temperature should my iron be?&quot; actually depends on two separate things. First,
          the solder alloy itself has a melting point the tip needs to clear with some margin — leaded
          solders melt lower than lead-free ones. Second, the joint&apos;s thermal mass (how much
          surrounding metal is pulling heat away) determines how much hotter than the melting point the
          tip needs to run, and how long you need to hold it there, to actually bring the joint itself
          up to temperature rather than just the solder touching the tip.
        </p>
      </section>

      <section>
        <h2 id="by-solder-alloy" className="text-xl font-semibold mb-3">Setpoint by solder alloy</h2>
        <p className="text-muted leading-7 mb-4">
          Iron temperature needs to clear the solder&apos;s melting point with enough margin to melt it
          quickly rather than slowly — running only a few degrees above the melting point means weak,
          slow heat transfer into the joint.
        </p>
        <BarChart
          items={[
            { label: "60/40 leaded (melts 183–191°C)", value: 320, display: "~300–330°C typical setpoint" },
            { label: "63/37 leaded (melts 183°C)", value: 310, display: "~300–330°C typical setpoint", highlight: true },
            { label: "Lead-free Sn-Ag-Cu (melts ~217–220°C)", value: 350, display: "~340–370°C typical setpoint" },
          ]}
        />
        <p className="mt-4 text-muted leading-7">
          See our{" "}
          <Link href="/soldering-irons/60-40-vs-63-37-solder" className={link}>
            60/40 vs 63/37 comparison
          </Link>{" "}
          for the exact melting ranges behind the leaded-solder figures above.
        </p>
      </section>

      <section>
        <h2 id="by-joint-type" className="text-xl font-semibold mb-3">Setpoint by joint or metal type</h2>
        <DataTable
          head={["Joint / metal type", "Typical adjustment", "Why"]}
          rows={[
            ["Fine SMD pads, thin signal wire", "Lower end of range, smaller tip", "Low thermal mass; too much heat risks lifting a pad or damaging the part"],
            ["Standard through-hole components", "Middle of range", "Balances reliable melting with component safety margin"],
            ["Ground planes, large copper pours", "Higher end of range, or larger tip", "High thermal mass draws heat away quickly; needs more heat supplied, faster"],
            ["Thick wire, chassis grounds, connectors", "Higher end of range, larger tip, longer dwell", "Large metal mass needs sustained heat delivery to come up to temperature"],
          ]}
        />
      </section>

      <section>
        <h2 id="heat-flow-diagram" className="text-xl font-semibold mb-3">Why thermal mass changes the picture</h2>
        <p className="text-muted leading-7 mb-4">
          The same tip, at the same setpoint, delivers heat into very different surroundings depending
          on the joint. A small, isolated pad has almost nowhere for that heat to escape to, so it comes
          up to temperature quickly. A pad connected to a wide copper pour or ground plane has a huge
          amount of surrounding metal pulling heat away in every direction, so the same tip at the same
          temperature takes noticeably longer to bring that specific joint up to melting point.
        </p>
        <Figure
          caption={
            <>
              Heat from the tip spreads into whatever metal it touches. A small, isolated pad (left)
              heats quickly since there&apos;s little surrounding copper to absorb the energy. A pad tied
              into a ground plane (right) loses heat outward in every direction, so the same tip setting
              takes longer to bring that joint up to temperature.
            </>
          }
        >
          <svg viewBox="0 0 300 120" className="w-full h-auto" role="img" aria-label="Diagram comparing heat spreading from a soldering iron tip into an isolated pad versus a ground-plane pad">
            <g>
              <circle cx="70" cy="60" r="18" className="fill-accent/70 stroke-accent" strokeWidth="1.5" />
              <line x1="70" y1="25" x2="70" y2="42" className="stroke-foreground" strokeWidth="3" />
              <text x="70" y="104" fontSize="10" textAnchor="middle" className="fill-foreground">Isolated pad: heats fast</text>
            </g>
            <g>
              <rect x="180" y="20" width="100" height="80" className="fill-accent/15 stroke-border" strokeWidth="1" />
              <circle cx="230" cy="60" r="14" className="fill-accent/70 stroke-accent" strokeWidth="1.5" />
              <line x1="230" y1="25" x2="230" y2="46" className="stroke-foreground" strokeWidth="3" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1={230 + 15 * Math.cos((deg * Math.PI) / 180)}
                  y1={60 + 15 * Math.sin((deg * Math.PI) / 180)}
                  x2={230 + 36 * Math.cos((deg * Math.PI) / 180)}
                  y2={60 + 36 * Math.sin((deg * Math.PI) / 180)}
                  className="stroke-muted"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />
              ))}
              <text x="230" y="104" fontSize="10" textAnchor="middle" className="fill-foreground">Ground-plane pad: heat escapes outward</text>
            </g>
          </svg>
        </Figure>
      </section>

      <section id="why-hotter-isnt-better">
        <Callout title="Why hotter isn't simply better">
          Running the iron hotter than a joint needs doesn&apos;t make soldering faster or easier — it
          accelerates tip oxidation (see our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className="underline">
            tip care guide
          </Link>
          ), increases the risk of heat damage to components and board traces, and can scorch flux
          before it has a chance to do its job cleaning the joint. Match the setting to the joint
          instead of defaulting to the highest setting &quot;to be safe.&quot;
        </Callout>
      </section>

      <section>
        <h2 id="signs-to-adjust" className="text-xl font-semibold mb-3">Signs your temperature setting needs adjusting</h2>
        <p className="text-muted leading-7 mb-4">
          Rather than guessing a number, watch for these signs during normal soldering:
        </p>
        <DataTable
          head={["What you're seeing", "Likely adjustment"]}
          rows={[
            ["Solder takes 3+ seconds to melt on a normal joint", "Raise the temperature, or check for a dirty tip first"],
            ["Flux is smoking heavily or scorching dark before solder flows", "Lower the temperature"],
            ["Joints cool and solidify oddly slowly after the iron is removed", "Temperature may be too high; excess heat soaked into the board"],
            ["Large joints never fully melt despite a high setting", "Switch to a larger tip or higher-wattage iron rather than raising temperature further"],
          ]}
        />
      </section>

      <section id="preheating-tip">
        <KeyIdea title="Preheating for extreme thermal mass">
          For a board with many large ground-plane joints, or dense rework where several big pads sit
          close together, some people preheat the whole board with an external heat source — a hot
          plate, or hot air held well back and moved continuously — before touching it with the iron.
          Bringing the board partway up to temperature first means the iron only has to supply the last
          stretch of heat at each joint, rather than fighting the full thermal mass of the board from
          room temperature alone. This is a step beyond what a single joint usually needs, worth
          reaching for only when the quick reference below genuinely isn&apos;t enough.
        </KeyIdea>
      </section>

      <section id="quick-reference">
        <KeyIdea title="Quick reference: where to start">
          <ul className="space-y-1 list-disc pl-5">
            <li>General through-hole electronics, leaded solder: 300–330°C</li>
            <li>Fine SMD work, leaded solder: 280–310°C with a fine tip</li>
            <li>Lead-free solder, general work: 340–370°C</li>
            <li>Large ground planes or thick wire: upper end of range, plus a larger tip and longer dwell</li>
          </ul>
          <p className="mt-3 text-xs">
            These are reasonable starting points, not fixed rules — adjust based on what you actually
            see at the joint, as covered above.
          </p>
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
