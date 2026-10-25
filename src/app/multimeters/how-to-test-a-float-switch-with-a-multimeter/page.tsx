import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  InfoCards,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "How to test a float switch with a multimeter: NO vs NC types, lifting and lowering the float on continuity, reed vs mechanical, piggyback plugs and cleaning.";

export const metadata = buildMetadata({
  title: "How to Test a Float Switch With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-float-switch-with-a-multimeter",
});

const fluke179 = picks.find((p) => p.name === "Fluke 179")!;

const link = "text-accent hover:underline";

function ReedFloatDiagram() {
  const panels = [
    { dx: 0, floatY: 112, water: 128, closed: false, title: "Float down (low water)" },
    { dx: 160, floatY: 58, water: 74, closed: true, title: "Float up (high water)" },
  ];
  return (
    <svg
      viewBox="0 0 320 200"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of a vertical reed float switch: with the float down the reed contacts are open, with the float raised the magnet closes them"
    >
      {panels.map((p) => (
        <g key={p.dx} transform={`translate(${p.dx},0)`}>
          {/* tank */}
          <path d="M20 30 V160 H140 V30" className="stroke-border" strokeWidth="1.6" fill="none" />
          {/* water */}
          <rect x="21" y={p.water} width="118" height={160 - p.water} className="fill-accent" opacity="0.15" />
          <line x1="21" y1={p.water} x2="139" y2={p.water} className="stroke-accent" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* stem */}
          <rect x="74" y="24" width="12" height="130" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.4" />
          {/* reed capsule inside stem, fixed height */}
          <rect x="77" y="56" width="6" height="34" rx="2" className="fill-muted" />
          <g className="stroke-foreground" strokeWidth="1.4">
            <line x1="80" y1="58" x2="80" y2="72" />
            <line x1={p.closed ? 80 : 82} y1="74" x2="80" y2="88" />
          </g>
          {/* float with ring magnet */}
          <rect x="58" y={p.floatY} width="44" height="30" rx="6" className="fill-surface stroke-accent" strokeWidth="2" />
          <rect x="66" y={p.floatY + 11} width="6" height="8" className="fill-accent" />
          <rect x="88" y={p.floatY + 11} width="6" height="8" className="fill-accent" />
          {/* lead */}
          <path d="M80 24 V14 H130" className="stroke-foreground" strokeWidth="1.4" fill="none" />
          <text x="80" y="176" fontSize="10" textAnchor="middle" className="fill-foreground">{p.title}</text>
          <text x="80" y="191" fontSize="9" textAnchor="middle" className={p.closed ? "fill-accent" : "fill-muted"}>
            {p.closed ? "NO type: reed closed, beep" : "NO type: reed open, OL"}
          </text>
          <text x="104" y="52" fontSize="9" className="fill-muted">reed</text>
        </g>
      ))}
    </svg>
  );
}

export default function HowToTestAFloatSwitchWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Float Switch With a Multimeter"
      description={description}
      published="2026-10-22"
      path="/multimeters/how-to-test-a-float-switch-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a float switch with a multimeter, disconnect it from power, set the meter to continuity and
          probe its two leads while you slowly lift the float and let it drop. A working switch changes state
          at a consistent point, beeping at one end of travel and reading OL at the other. If it never changes,
          or flickers, it needs cleaning or replacing. This works for sump pumps, condensate pumps, tanks and
          aquarium top-off systems.
        </>
      }
      aside={{
        image: fluke179.image,
        alt: "Fluke 179 True RMS digital multimeter",
        caption: (
          <>
            The Fluke 179 has continuity, an analog bar graph that shows a flickering contact, and CAT IV 600V /
            CAT III 1000V with True RMS for the pump circuit. See our{" "}
            <Link href="/multimeters/fluke-87v-vs-fluke-179" className={link}>
              Fluke 87V vs Fluke 179 comparison
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "types", label: "Mechanical vs reed float switches" },
        { id: "no-vs-nc", label: "Normally open vs normally closed" },
        { id: "disconnect", label: "Disconnect it safely" },
        { id: "lift-and-lower", label: "Lift and lower the float" },
        { id: "applications", label: "Sump, condensate and aquarium notes" },
        { id: "results", label: "Reading the results" },
        { id: "cleaning", label: "Cleaning a float switch" },
      ]}
      faq={[
        {
          q: "How do I know if my sump pump float switch is bad?",
          a: "Signs include a pump that never starts as water rises, one that runs continuously, or one that cycles erratically. Unplug the pump, isolate the float switch and check continuity while raising and lowering the float. If the reading never changes, changes at random points, or the float is stuck or waterlogged, replace the switch.",
        },
        {
          q: "Can I test a float switch without removing it from the tank?",
          a: "Often you can. With power isolated, disconnect its leads at the plug, terminal block or controller, then lift the float by hand or with a tool while someone watches the meter. For a submerged reed type on a fixed stem, raising the float by hand is the test. Remove it only if you need to clean it or it cannot move freely.",
        },
        {
          q: "Why does my float switch read closed in both positions?",
          a: "Either its contacts have welded, often after switching a motor's start current for years, or you are still measuring through the pump or other wiring. Disconnect the switch fully and recheck. A reed float switch can also stick closed after a current surge. If it still reads closed at both ends of travel once isolated, replace it.",
        },
        {
          q: "Can I turn a normally open float switch into a normally closed one?",
          a: "Many vertical reed float switches can be converted by removing the retaining clip, turning the float upside down on its stem and refitting it, which moves the magnet relative to the reed. The instructions usually say whether this is supported. Tethered and mechanical types generally cannot be reversed, so buy the correct action for filling or emptying.",
        },
        {
          q: "What resistance should a float switch have when closed?",
          a: "Close to zero, typically well under an ohm for a reed or mechanical switch measured at its leads, plus the resistance of a long cable. A closed reading of several ohms or more, or one that drifts as you move the float, suggests worn or contaminated contacts, or a damaged cable where it enters the float.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-reed-switch-using-a-multimeter",
          title: "How to Test a Reed Switch Using a Multimeter",
          desc: "The magnet test, pull-in and drop-out, and why reed capsules are fragile.",
        },
        {
          href: "/multimeters/how-to-test-electrical-wires-with-a-multimeter",
          title: "How to Test Electrical Wires With a Multimeter",
          desc: "Find a broken lead or damaged cable to the switch with continuity checks.",
        },
      ]}
    >
      <Callout title="Water and mains don't mix: isolate before you touch anything">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Most sump and condensate pumps run on mains: 230 V in the UK and Europe, 120 V in North America.
            Unplug the pump, or switch off and lock off its fused spur or breaker, before putting hands near the
            water or the switch. Prove it dead with a voltage tester if it is wired in.
          </li>
          <li>Keep the meter and your hands dry, and never stand in water while probing a live connection.</li>
          <li>
            Sump and condensate water can be dirty or contaminated. Wear gloves and wash up afterwards.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="types" className="text-xl font-semibold mb-3">Mechanical vs reed float switches</h2>
        <p className="text-muted leading-7 mb-4">
          Float switches all do the same job, opening or closing a contact as liquid rises, but the inside
          differs, and that affects how you test them.
        </p>
        <InfoCards
          items={[
            { label: "Tethered (tilt)", desc: "A float on a cable that tips as water rises; a ball or weight inside flips a mechanical switch. Common on sump pumps." },
            { label: "Vertical mechanical", desc: "A float slides up a rod or arm and presses a microswitch. Often fitted to sump and condensate pumps." },
            { label: "Reed float", desc: "A magnet in the float passes a sealed reed switch in the stem. Typical for aquariums, tanks and low-current controls." },
            { label: "Electronic", desc: "Pressure, capacitive or optical sensors with no contacts. These need power and cannot be checked with continuity." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          A reed float is really a reed switch in a waterproof housing, so the checks in{" "}
          <Link href="/multimeters/how-to-test-a-reed-switch-using-a-multimeter" className={link}>
            how to test a reed switch
          </Link>{" "}
          apply. Reed contacts are usually rated for small signal or relay currents only, so they rarely switch
          a pump motor directly.
        </p>
      </section>

      <section>
        <h2 id="no-vs-nc" className="text-xl font-semibold mb-3">Normally open vs normally closed float switches</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Normal&quot; refers to the float resting at the bottom. A normally open (NO) switch is open when
          the float is down and closes as it rises: the action used to start a pump that empties a sump. A
          normally closed (NC) switch is closed when down and opens as it rises, which suits filling a tank or
          a top-off reservoir. Some tethered switches have three wires (COM, NO and NC) so they can do either.
        </p>
        <Figure
          caption={
            <>
              A vertical reed float switch. The reed capsule sits at a fixed height inside the stem; when the
              float&apos;s magnet reaches it, the contacts pull together. Flipping the float on the stem swaps
              the action on many models.
            </>
          }
        >
          <ReedFloatDiagram />
        </Figure>
      </section>

      <section>
        <StepHeading n={1} id="disconnect">Disconnect the float switch from power</StepHeading>
        <p className="text-muted leading-7 mb-4">
          How you isolate the switch depends on how it is wired.
        </p>
        <ul className="space-y-3 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Plug-in piggyback type</strong> (common on North American sump
            pumps): the pump plugs into the back of the float switch&apos;s plug. Unplug both from the wall and
            separate them. Then test from one pin of the switch&apos;s wall plug to the matching socket slot on
            its back; the other pin passes straight through.
          </li>
          <li>
            <strong className="text-foreground">Wired-in type</strong> (more usual in UK installations): isolate
            at the spur or breaker, prove dead, then disconnect the float leads at the pump&apos;s terminal block
            or control box. Testing with the pump still connected adds the motor winding in parallel.
          </li>
          <li>
            <strong className="text-foreground">Low-voltage controls</strong> (aquarium top-off units, condensate
            alarm contacts): unplug the controller and pull the float&apos;s connector.
          </li>
        </ul>
      </section>

      <section>
        <StepHeading n={2} id="lift-and-lower">Lift and lower the float while reading continuity</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity and clip or hold the probes on the two switch leads. Start with the float
          hanging at its lowest point, then raise it slowly by hand to the top of its travel, and lower it
          again. Watch where the reading changes. Repeat three or four times: the trip point should be the same
          each time. Then switch to the ohms range and note the closed reading.
        </p>
        <DataTable
          head={["Switch action", "Float down", "Float up"]}
          rows={[
            ["Normally open (emptying, pump-up)", "OL", "Beep, near 0 Ω"],
            ["Normally closed (filling, top-off)", "Beep, near 0 Ω", "OL"],
            ["Three-wire, COM to NO", "OL", "Beep"],
            ["Three-wire, COM to NC", "Beep", "OL"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          On a tethered switch, the float has to tip past horizontal before it flips, and it switches back at a
          lower angle, so there is a gap between the on and off levels. That gap is by design: it stops the pump
          from short-cycling. OL is just the meter showing an open contact; see{" "}
          <Link href="/multimeters/what-does-ol-mean-on-a-multimeter" className={link}>
            what OL means
          </Link>{" "}
          if the display is unfamiliar.
        </p>
        <Figure caption={<>The full float switch test, from isolation to confirming a repeatable trip point.</>}>
          <FlowDiagram
            steps={[
              { label: "Isolate", sub: "Unplug or lock off" },
              { label: "Disconnect", sub: "Free the switch leads" },
              { label: "Float down", sub: "Note beep or OL" },
              { label: "Float up", sub: "State should swap" },
              { label: "Repeat", sub: "Same trip point" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="applications" className="text-xl font-semibold mb-3">Sump pump, condensate pump and aquarium notes</h2>
        <ul className="space-y-3 list-disc pl-5 text-muted leading-7">
          <li>
            <strong className="text-foreground">Sump pumps:</strong> a tethered float can catch on the pit wall
            or the discharge pipe and fail to rise even though it tests fine. Check the tether length and
            clearance as well as the switch.
          </li>
          <li>
            <strong className="text-foreground">Condensate pumps:</strong> many have two switches, one that runs
            the pump and a high-level safety switch, often with NC contacts that open to stop the boiler or air
            conditioner if the reservoir overfills. Test both.
          </li>
          <li>
            <strong className="text-foreground">Aquariums and tanks:</strong> top-off floats are usually reed
            types on a low-voltage controller. Salt creep and algae can stop the float sliding, so test it out of
            the water after cleaning.
          </li>
        </ul>
        <p className="text-muted leading-7 mt-4">
          If a plug-in pump has stopped completely, check its plug fuse before condemning the switch; our guide
          to{" "}
          <Link href="/multimeters/how-to-test-a-13-amp-plug-fuse-with-a-multimeter" className={link}>
            testing a 13 amp plug fuse
          </Link>{" "}
          covers UK plugs.
        </p>
      </section>

      <section>
        <h2 id="results" className="text-xl font-semibold mb-3">Reading the float switch results</h2>
        <DataTable
          head={["What you find", "Likely cause"]}
          rows={[
            ["Clean swap at the same point, under an ohm closed", "Switch is good; look at the pump, wiring or controller"],
            ["Never changes from OL", "Open contact, broken reed, or a cable broken inside its sheath"],
            ["Closed at both ends of travel", "Welded contacts or a reed stuck closed"],
            ["Trip point changes each time", "Float rubbing, debris on the stem, or a worn mechanism"],
            ["Reading flickers when the cable is flexed", "Damaged lead, often where it enters the float"],
            ["Float sits low and feels heavy", "Waterlogged float; replace it"],
          ]}
        />
      </section>

      <section>
        <h2 id="cleaning" className="text-xl font-semibold mb-3">Cleaning a float switch before you replace it</h2>
        <p className="text-muted leading-7 mb-4">
          Many float switch failures are mechanical, not electrical. Silt, grease, limescale, biofilm and algae
          stop a float sliding or tipping freely. With power isolated, wash the float and stem in warm soapy
          water with a soft brush, and use a mild descaler for limescale if the maker allows it. Avoid harsh
          solvents that can attack the plastic or the cable seal, and never open a sealed float.
        </p>
        <KeyIdea title="Retest after cleaning">
          Clean, dry and retest the switch. If it now trips crisply at the same point every time, refit it
          and run a water test with the pump connected: fill the pit or tank slowly and confirm the pump starts
          and stops where it should.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
