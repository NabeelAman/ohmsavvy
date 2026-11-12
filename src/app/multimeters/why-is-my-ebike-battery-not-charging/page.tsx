import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "Why is my ebike battery not charging? Test charger output, the pack fuse, BMS lockout, cold cells and the charge port with a multimeter, and charge safely.";

export const metadata = buildMetadata({
  title: "Why Is My Ebike Battery Not Charging? Causes",
  description,
  path: "/multimeters/why-is-my-ebike-battery-not-charging",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const mm450 = picks.find((p) => p.name === "Klein Tools MM450")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** The charge path from wall outlet to cells, with the parts that can block it and the two useful test points. */
function ChargePathDiagram() {
  const boxes = [
    { x: 6, label: "Outlet", sub: "120 V AC" },
    { x: 72, label: "Charger", sub: "CC then CV" },
    { x: 138, label: "Charge port", sub: "pins, diode" },
    { x: 204, label: "Fuse + BMS", sub: "charge FET" },
    { x: 270, label: "Cells", sub: "10S–14S" },
  ];
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Why an ebike battery is not charging: the charge path runs from the wall outlet to the charger, the charge port, the fuse and BMS charge switch, and the cells. Test point A is the charger plug with no battery attached; test point B is the pack's discharge terminals, where the voltage should rise while charging."
    >
      {boxes.map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y="45" width="60" height="44" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
          <text x={b.x + 30} y="63" fontSize="8.5" fontWeight="700" textAnchor="middle" className="fill-foreground">{b.label}</text>
          <text x={b.x + 30} y="77" fontSize="7.5" textAnchor="middle" className="fill-muted">{b.sub}</text>
          {i < boxes.length - 1 && (
            <line x1={b.x + 60} y1="67" x2={b.x + 66} y2="67" strokeWidth="2" className="stroke-accent" />
          )}
        </g>
      ))}
      {/* test point A */}
      <path d="M102 89 V118" strokeDasharray="4 3" strokeWidth="1.5" className="stroke-accent" fill="none" />
      <rect x="62" y="118" width="80" height="34" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="102" y="132" fontSize="8.5" textAnchor="middle" className="fill-accent">A: charger plug</text>
      <text x="102" y="145" fontSize="7.5" textAnchor="middle" className="fill-muted">≈ 42 / 54.6 / 58.8 V</text>
      {/* test point B */}
      <path d="M300 89 V118" strokeDasharray="4 3" strokeWidth="1.5" className="stroke-accent" fill="none" />
      <rect x="252" y="118" width="84" height="34" rx="4" className="fill-surface stroke-accent" strokeWidth="1.5" />
      <text x="294" y="132" fontSize="8.5" textAnchor="middle" className="fill-accent">B: discharge terms</text>
      <text x="294" y="145" fontSize="7.5" textAnchor="middle" className="fill-muted">rises while charging</text>
      <text x="170" y="28" fontSize="8.5" textAnchor="middle" className="fill-muted">A break anywhere in this chain stops the charge</text>
    </svg>
  );
}

export default function WhyIsMyEbikeBatteryNotChargingPage() {
  return (
    <HowToShell
      title="Why Is My Ebike Battery Not Charging?"
      description={description}
      published="2026-11-13"
      path="/multimeters/why-is-my-ebike-battery-not-charging"
      category="multimeters"
      intro={
        <>
          An ebike battery usually stops charging for one of five reasons: the charger has no output, a fuse
          in the pack has blown, the BMS has locked the pack out after a deep discharge, the cells are too cold
          to accept charge, or the charge port has a bad contact. If you are wondering why your ebike battery
          is not charging, a multimeter can separate those in about fifteen minutes, starting with the
          charger&apos;s output voltage and the voltage at the pack&apos;s discharge terminals. The same checks
          explain a charger that blinks green or goes green the moment you plug it in.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS digital multimeter, front view",
        caption: (
          <>
            The Fluke 115 has a 6,000-count display, which resolves the small voltage changes that show whether
            charge is reaching the pack. See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-charging-works", label: "How an ebike charger works" },
        { id: "causes", label: "Causes table" },
        { id: "check-pack", label: "Measure the pack first" },
        { id: "charger-output", label: "Charger output voltage" },
        { id: "charge-port", label: "Charge port and plug" },
        { id: "fuse", label: "Pack fuse" },
        { id: "bms-lockout", label: "BMS lockout after deep discharge" },
        { id: "temperature", label: "Too cold or too hot" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Why is my ebike charger blinking green?",
          a: "It depends on the charger, so check the label or manual first. On many chargers a blinking green light means the pack is nearly full and the charger is topping it off, which can take an hour or more. On others it signals a fault or that no battery is detected. If it blinks green on a pack that measures well below full, treat it as a fault.",
        },
        {
          q: "Why does my ebike charger turn green as soon as I plug it in?",
          a: "Either the pack is already full, or the charger cannot see it. Measure the pack's discharge terminals. A reading near full voltage means there is nothing to do. A reading near zero points to a BMS lockout or a blown fuse, and a normal mid-range voltage points to the charge port, the plug or the charger itself.",
        },
        {
          q: "Can a completely dead ebike battery be revived?",
          a: "If the BMS has only shut off the output, connecting the correct charger often wakes it and charging resumes normally. If the cells themselves have sat near empty for weeks, recharging them carries a real fire risk, and a pack builder should measure each cell group before anything else is done. Don't force a charge with a bench supply or a different charger.",
        },
        {
          q: "Can I use a different charger for my ebike battery?",
          a: "Only one with the same chemistry, the same full-charge voltage and a matching connector polarity, with a charge current the pack is rated for. A 54.6 V charger suits a 13S 48 V lithium-ion pack and nothing else. Using a higher-voltage charger relies on the BMS to stop an overcharge, which is a bad bet. When in doubt, buy the maker's charger.",
        },
        {
          q: "How long should an ebike battery take to charge?",
          a: "Roughly the pack's amp-hour rating divided by the charger's amp rating, plus time at the end while the current tapers. A 14 Ah pack on a 2 A charger needs about 7 hours from empty, and a 4 A charger roughly halves that. If a nearly empty pack shows full after twenty minutes, the charger is stopping early or the pack has lost capacity.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-an-ebike-battery-with-a-multimeter",
          title: "How to Test an Ebike Battery With a Multimeter",
          desc: "Resting voltage, voltage sag and a self-discharge check for 36, 48 and 52 V packs.",
        },
        {
          href: "/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter",
          title: "How to Test a Battery Protection Circuit",
          desc: "How a lithium protection board cuts the output, and how to tell when it has tripped.",
        },
        {
          href: "/multimeters/why-is-my-laptop-charger-not-charging-the-battery",
          title: "Why Is My Laptop Charger Not Charging the Battery?",
          desc: "The same charger-versus-battery logic on barrel and USB-C laptop chargers.",
        },
      ]}
    >
      <Callout title="Lithium charging and fire safety">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Never charge a pack that is swollen, cracked, wet, dented after a crash, hot without being used, or
            smells sweet or chemical. Move it outside onto concrete, away from buildings and cars, and contact
            the dealer or a battery recycler.
          </li>
          <li>
            Charge on a hard, non-flammable surface, away from exits and bedding, and stay nearby. Don&apos;t
            charge overnight on a pack you are already troubleshooting. A working smoke alarm in that room is
            cheap insurance.
          </li>
          <li>
            If a pack smokes, hisses or catches fire, leave, close the door behind you and call 911. Don&apos;t
            try to carry a burning pack or put it out with a small extinguisher.
          </li>
          <li>
            The charger plugs into 120 V mains. Test only its low-voltage output plug; don&apos;t open the
            charger case. Look for systems and packs certified to UL 2849 or UL 2271 when buying replacements.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-charging-works" className="text-xl font-semibold mb-3">How an ebike charger and battery work together</h2>
        <p className="text-muted leading-7 mb-4">
          An ebike charger is a constant-current, constant-voltage (CC/CV) supply. It pushes a fixed current,
          often 2 to 4 A, until the pack reaches its full voltage, then holds that voltage while the current
          tapers off. When the current drops below a set point the light changes from red to green. The BMS
          inside the pack sits in the charge path and can refuse charge if a cell group is too high, too low,
          too cold or too hot. A fuse and, on many packs, a diode protect the charge port.
        </p>
        <p className="text-muted leading-7 mb-4">
          That chain is the key to diagnosis. A break or a refusal at any link stops the charge, and the
          charger&apos;s light only tells you that current isn&apos;t flowing, not why. Two meter readings, at
          the charger plug and at the pack&apos;s discharge terminals, usually show which link has failed.
        </p>
        <Figure caption={<>The charge path. Test point A checks the charger on its own; test point B shows whether charge is reaching the cells.</>}>
          <ChargePathDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Ebike battery not charging: causes, checks and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["No light on charger", "No mains, or charger dead", "Lamp in the same outlet; charger output (A)", "Different outlet, or replace charger"],
            ["Green at once, pack not full", "Charger can't see pack: port, fuse or BMS", "Pack voltage at discharge terminals (B)", "Steps 3 to 5 below"],
            ["Red light, pack voltage won't rise", "Charger output low or open", "Charger output vs label; pack V after 10 min", "Replace charger"],
            ["Pack reads 0 V at terminals", "BMS lockout or blown fuse", "Charge briefly, re-measure B", "Dealer or pack specialist if no recovery"],
            ["Won't charge in the garage in winter", "Cells below about 0 °C (32 °F)", "Pack temperature", "Warm to room temperature first"],
            ["Charges only if the plug is held", "Worn or burnt charge port pins", "Inspect pins; wiggle test while charging", "Replace port or plug"],
            ["Stops early, short range", "Weak cell group trips BMS", "Full-charge voltage below table", "Pack service or replacement"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="check-pack">Measure the pack at its discharge terminals</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Start here, because it sorts every other cause. Set the meter to DC volts and measure across the
          pack&apos;s main discharge terminals with the pack switched on and off the bike. Compare with the
          pack&apos;s range: about 30 to 42 V for a 36 V pack, 39 to 54.6 V for a 48 V pack and 42 to 58.8 V
          for a 52 V pack. Our guide to{" "}
          <Link href="/multimeters/how-to-test-an-ebike-battery-with-a-multimeter" className={link}>
            testing an ebike battery
          </Link>{" "}
          explains where those limits come from.
        </p>
        <p className="text-muted leading-7 mb-4">
          Near full voltage means the pack is already charged and the green light is honest. A normal
          mid-range voltage means the cells and BMS are fine, so the fault is upstream in the charger or port.
          Near zero means the output has been cut off inside the pack: a BMS lockout or a blown fuse.
        </p>
        <Figure caption={<>Illustrative readings at the discharge terminals of a 48 V pack: a normal part-charged pack, and a pack whose BMS has cut the output.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="46.92" unit="V DC" mode="PACK  part charged" />
            <MeterReadout value="0.03" unit="V DC" mode="PACK  output cut" />
          </div>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="charger-output">Check the charger&apos;s output voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Plug the charger into the wall with no battery attached. Find the output pinout on its label or in
          the manual (round three-pin XLR plugs and 5.5 mm barrel plugs are common), and measure DC volts
          between the positive and negative pins with the probes held carefully apart. Most ebike chargers
          read close to their rated full-charge voltage with no load: about 42 V, 54.6 V or 58.8 V.
        </p>
        <Figure caption={<>Rated output voltage for each common pack, equal to about 4.2 V per cell times the series count.</>}>
          <BarChart
            items={[
              { label: "36 V charger (10S)", value: 42, display: "≈42.0 V" },
              { label: "48 V charger (13S)", value: 54.6, display: "≈54.6 V", highlight: true },
              { label: "52 V charger (14S)", value: 58.8, display: "≈58.8 V" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4 mb-4">
          A reading well below the label, or zero with the light on, condemns the charger. One caution: some
          smart chargers show 0 V or a few volts until they detect a battery, so a zero there is not proof of
          failure. On those, use the second test: measure the pack at its discharge terminals, connect the
          charger for ten minutes, then measure again. A pack that is genuinely charging rises noticeably;
          with an illustrative 2 A charger on a half-empty 48 V pack, a rise of several tenths of a volt in
          that time is typical. No change at all means no current is reaching the cells.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="charge-port">Inspect and test the charge port</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Look into the charge port with a flashlight. Brown or melted pins, a loose socket, or a pin pushed
          back into the housing all stop the charge or make it intermittent. Charge ports are a high-wear part,
          and a poor contact gets hot every time it carries charge current. If the charge works only when you
          hold the plug at an angle, the port or the plug needs replacing.
        </p>
        <KeyIdea title="Zero volts at the charge port is often normal">
          Many packs put a blocking diode or the BMS charge switch between the charge port and the cells, so
          the port reads 0 V, or a misleadingly low voltage, even on a full pack. That is a safety feature,
          not a fault. Judge the pack only at its discharge terminals, never at the charge port.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={4} id="fuse">Test the pack fuse</StepHeading>
        <p className="text-muted leading-7">
          Many packs have a replaceable fuse, often a blade or cartridge fuse in the base, the mount or behind
          a small cover. With the pack off, pull it out and test it in continuity or ohms mode: a good fuse
          reads close to 0 Ω and an open one reads OL. Our guide to{" "}
          <Link href="/multimeters/how-to-test-a-fuse-with-a-multimeter" className={link}>
            testing a fuse with a multimeter
          </Link>{" "}
          has the details. Replace it only with the same type and rating, and ask why it blew. A fuse that
          blows again points to a short in the controller, motor or wiring, so stop and get the bike checked.
          Fuses sealed inside the pack are a job for the dealer or a pack builder.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="bms-lockout">Recover from a BMS lockout after deep discharge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          If you rode the pack to empty and left it for weeks, self-discharge can pull a cell group below the
          BMS limit, somewhere around 2.5 to 3.0 V per cell. The BMS then shuts the output and the pack reads
          near 0 V at its terminals. Some chargers also refuse to start on a pack below a minimum voltage, so
          the light goes straight to green. Connect the correct charger for a few minutes and re-measure the
          discharge terminals: if a normal voltage returns, the BMS has woken and you can charge as usual,
          watching it closely the first time.
        </p>
        <p className="text-muted leading-7">
          If nothing returns, stop. Forcing charge into cells that have sat very low for a long time can damage
          them in a way that raises the fire risk later. A pack builder can measure each cell group and tell
          you whether a rebuild is safe. The principles are the same as on a small pack, shown in{" "}
          <Link href="/multimeters/how-to-test-a-battery-protection-circuit-with-a-multimeter" className={link}>
            how to test a battery protection circuit
          </Link>
          , and our{" "}
          <Link href="/multimeters/how-to-test-an-ebike-controller-with-a-multimeter" className={link}>
            ebike controller guide
          </Link>{" "}
          covers the bike side if the pack charges but the bike still won&apos;t run.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="temperature">Check the temperature: too cold or too hot to charge</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Lithium-ion cells should not be charged below about 0 °C (32 °F), because lithium can plate onto the
          anode and damage the cell permanently. Many BMSs block charging below that point, and some also stop
          above roughly 45 °C (113 °F). A pack brought in from a winter garage or left in a hot car may sit
          with the charger showing green or a fault light until it reaches room temperature. Bring it inside,
          wait two or three hours, and try again. A meter with a Type K thermocouple taped to the case gives
          you a number rather than a guess.
        </p>
        <DataTable
          head={["Pack temperature", "Charging", "What to do"]}
          rows={[
            ["Below about 0 °C (32 °F)", "Blocked by many BMSs; harmful if forced", "Warm indoors for a few hours"],
            ["About 10–30 °C (50–86 °F)", "Normal", "Charge as usual"],
            ["Above about 45 °C (113 °F)", "Blocked by some BMSs", "Let it cool after a ride or hot car"],
          ]}
          mono={[0]}
        />
        <p className="text-muted leading-7 mt-4">
          Home storage batteries run into the same limits, as covered in{" "}
          <Link href="/multimeters/how-to-diagnose-a-solar-battery-that-stops-charging-at-80-percent" className={link}>
            diagnosing a solar battery that stops charging at 80 percent
          </Link>
          . If your pack does charge but stops short of full, see{" "}
          <Link href="/multimeters/why-is-my-lithium-battery-not-charging-to-100" className={link}>
            why a lithium battery won&apos;t charge to 100%
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use</h2>
        <p className="text-muted leading-7 mb-4">
          DC volts to 60 V and a continuity mode cover nearly every check on this page. A temperature input is
          the useful extra for winter charging problems. A 6,000-count display typically reads a 54.6 V charger on its 60
          V range with two decimal places, which helps spot the small rise that proves charge is flowing.
        </p>
        <ProductStrip
          title="Meters for ebike charging problems"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, CAT III 600V and a 6,000-count backlit display for charger and pack voltages.",
            },
            {
              name: "Klein Tools MM450",
              image: mm450.image,
              alt: "Klein Tools MM450 True RMS digital multimeter",
              href: "/multimeters/klein-mm400-vs-klein-mm450",
              note: "True RMS with temperature from −40°F to 1832°F, useful for checking a cold pack. CAT III 600V.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS, auto-ranging and backlit. CAT II 600V, fine for low-voltage ebike checks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
