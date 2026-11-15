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
  "Test a golf cart battery with a multimeter: resting volts for 6, 8 and 12 V batteries, totals for 36 and 48 V packs, and how to find the one weak battery.";

export const metadata = buildMetadata({
  title: "How to Test a Golf Cart Battery With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-golf-cart-battery-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const ut139c = picks.find((p) => p.name === "UNI-T UT139C")!;
const km200s = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Six 8 V batteries in series make a 48 V pack; the meter probes each battery across its own posts. */
function GolfCartPackDiagram() {
  const xs = [20, 75, 130, 185, 240, 295];
  return (
    <svg
      viewBox="0 0 360 190"
      className="w-full h-auto"
      role="img"
      aria-label="A 48 volt golf cart pack made of six 8 volt batteries wired positive to negative in series. The multimeter measures across each battery's own two posts, one at a time, and the six readings are compared to find the weak battery; the total across the pack ends is about 50.9 volts when full."
    >
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y="60" width="45" height="55" rx="4" className="fill-surface stroke-foreground" strokeWidth="1.8" />
          <text x={x + 22.5} y="86" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">8 V</text>
          <text x={x + 22.5} y="101" fontSize="8" textAnchor="middle" className="fill-muted">#{i + 1}</text>
          <text x={x + 8} y="54" fontSize="10" fontWeight="700" className="fill-foreground">−</text>
          <text x={x + 32} y="54" fontSize="10" fontWeight="700" className="fill-foreground">+</text>
          {i < 5 && (
            <path d={`M${x + 36} 58 V44 H${x + 64} V58`} className="stroke-foreground" strokeWidth="1.5" fill="none" />
          )}
        </g>
      ))}
      {/* meter on battery 4 */}
      <g className="stroke-accent" strokeWidth="1.4" fill="none" strokeDasharray="4 3">
        <path d="M193 115 V145 H200" />
        <path d="M222 115 V145 H215" />
      </g>
      <circle cx="207" cy="160" r="15" className="fill-surface stroke-accent" strokeWidth="2" />
      <text x="207" y="164" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-accent">V</text>
      <text x="20" y="160" fontSize="9" className="fill-muted">probe each battery</text>
      <text x="20" y="173" fontSize="9" className="fill-muted">on its own posts</text>
      <text x="20" y="22" fontSize="9" className="fill-muted">pack total: about 50.9 V full (6 × 8.49 V)</text>
    </svg>
  );
}

export default function HowToTestAGolfCartBatteryWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a Golf Cart Battery With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-golf-cart-battery-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a golf cart battery with a multimeter, charge the cart fully, let it rest, then measure each battery
          on its own posts with the meter on DC volts and compare the readings. In a healthy pack every battery reads
          within a small spread of the others; one battery that sits clearly lower at rest, or drops faster when you
          drive, is the one dragging the whole cart down. This guide gives resting voltages for 6, 8 and 12 V batteries
          and full-pack totals for 36 and 48 V carts, then shows how to confirm the weak battery under load and with a
          hydrometer.
        </>
      }
      aside={{
        image: ut139c.image,
        alt: "UNI-T UT139C True RMS multimeter for checking golf cart battery voltages",
        caption: (
          <>
            A 6,000-count meter like the UNI-T UT139C reads each battery to the hundredth of a volt, which is the
            resolution you need to compare batteries in a pack. See our{" "}
            <Link href="/multimeters/uni-t-ut139c-review" className={link}>
              UNI-T UT139C review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "how-packs-work", label: "How a golf cart pack is wired" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "charge-rest", label: "1. Charge and rest the pack" },
        { id: "pack-voltage", label: "2. Measure the whole pack" },
        { id: "each-battery", label: "3. Measure each battery" },
        { id: "drive-test", label: "4. Load test by driving" },
        { id: "hydrometer", label: "5. Confirm with a hydrometer" },
        { id: "connections", label: "6. Check cables and terminals" },
        { id: "voltage-table", label: "Voltage vs state of charge" },
        { id: "lithium", label: "Lithium golf carts" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What should a 48 volt golf cart battery pack read when fully charged?",
          a: "A rested 48 V pack of six 8 V flooded batteries typically reads about 50.9 V when full, roughly 8.49 V per battery. A pack of four 12 V batteries reads about 50.9 V too, and eight 6 V batteries about 50.9 V. Straight off the charger it reads higher because of surface charge, so let it rest several hours before judging.",
        },
        {
          q: "How do I find a bad battery in my golf cart?",
          a: "Fully charge the pack, rest it, and measure every battery on its own posts. Then drive the cart up a hill or for a few minutes and measure again with the motor pulling. The bad battery is the one that reads lowest at rest or falls furthest under load. A hydrometer then confirms which cell inside it is weak.",
        },
        {
          q: "Can one bad battery ruin the others in a golf cart?",
          a: "It can shorten their life. The charger reads the whole pack, so a weak battery that charges and empties faster pulls the pack voltage down, and the healthy batteries are overcharged or deeply cycled to compensate. Replacing the single weak battery in a young pack is often fine; in an old pack, makers usually recommend replacing the set.",
        },
        {
          q: "What voltage is too low for a 6 volt golf cart battery?",
          a: "A rested 6 V flooded battery near 6.0 V is only about a quarter to a third charged, and below about 5.85 V it is effectively flat. Regularly running batteries that low shortens their life sharply. If a 6 V battery won't rise above about 6.2 V after a full charge and rest, it has likely lost capacity or has a failed cell.",
        },
        {
          q: "Is my golf cart charger or battery the problem?",
          a: "Measure the pack before and during charging. A working charger raises the pack voltage several volts above its resting value within minutes. If the pack voltage barely moves, test the charger output and the charge receptacle. If the pack charges to a normal total but one battery reads low, the charger is fine and that battery is the problem.",
        },
        {
          q: "Should I test golf cart batteries with the cart on or off?",
          a: "Resting voltage should be taken with the key off, the charger unplugged, and the cart parked for several hours. The load test is the opposite: the cart driving, with a helper reading the meter or you reading it safely while stopped on a hill with the brake on and the motor pulling. Both readings are needed.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-test-a-12v-battery-under-load",
          title: "How to Test a 12V Battery Under Load",
          desc: "The same load principle on a single 12 V battery, with the arithmetic for judging the sag.",
        },
        {
          href: "/multimeters/how-to-check-voltage-drop-on-a-car",
          title: "How to Check Voltage Drop on a Car",
          desc: "The voltage-drop technique for finding bad cables and terminals, which works the same on a cart.",
        },
      ]}
    >
      <Callout title="Golf cart packs can hurt you">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A 36 or 48 V pack can deliver hundreds of amps. A wrench across two posts will arc and can weld or explode a
            terminal. Remove rings and watches and use insulated tools.
          </li>
          <li>
            Flooded batteries vent hydrogen, especially while charging, and contain sulfuric acid. Wear eye protection,
            keep sparks away, and test in a ventilated space.
          </li>
          <li>
            Put the cart in tow or maintenance mode, or set the run switch to off, before touching cables, and keep
            the drive wheels off the ground or the brake set during any load test.
          </li>
          <li>
            Lithium packs have their own BMS and are sealed. Don&apos;t open one; take faults to the cart dealer or the
            battery maker.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="how-packs-work" className="text-xl font-semibold mb-3">
          How a golf cart battery pack is wired
        </h2>
        <p className="text-muted leading-7 mb-4">
          Most lead-acid golf carts run a 36 V or 48 V pack made by chaining smaller deep-cycle batteries in series,
          positive of one to negative of the next. A 36 V cart typically uses six 6 V batteries. A 48 V cart uses six
          8 V batteries, four 12 V batteries, or eight 6 V batteries. Series wiring adds the voltages but keeps the
          capacity of a single battery, which is why one weak battery limits the whole cart: the pack can only deliver
          what its weakest member holds.
        </p>
        <p className="text-muted leading-7">
          Each flooded lead-acid battery is itself a stack of 2 V cells. A 6 V battery has three cells, an 8 V has
          four, and a 12 V has six. A fully charged cell rests at about 2.12 V, so a full 6 V battery reads about
          3 × 2.12 = 6.37 V, an 8 V about 4 × 2.12 = 8.49 V and a 12 V about 6 × 2.12 = 12.73 V. Those per-cell numbers
          are the key to every reading on this page.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <p className="text-muted leading-7 mb-4">
          Short range and sluggish hills are the usual reasons for testing. Several of the causes aren&apos;t battery
          capacity at all, so match the symptom first.
        </p>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Range has dropped badly", "One weak battery or aged pack", "Per-battery resting voltages (step 3)", "Replace the weak battery, or the set if old"],
            ["Slows on hills, fine on the flat", "High-resistance battery or cable", "Per-battery voltage while climbing (step 4)", "Replace battery or clean and tighten cables"],
            ["Charger won't start or clicks off", "Pack too low for the charger to detect", "Total pack voltage", "Charge a low battery individually, then the pack"],
            ["One battery always low, cells look dry", "Low electrolyte, exposed plates", "Inspect levels; hydrometer", "Top up with distilled water after charging"],
            ["Terminal hot or melted", "Loose or corroded connection", "Voltage drop across the joint", "Clean, replace lug, torque to spec"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="charge-rest">Charge the pack fully and let it rest</StepHeading>
        <p className="text-muted leading-7">
          Let the cart&apos;s charger finish a complete cycle. Then unplug it and leave the cart parked, key off, for at
          least six hours; overnight is better. A freshly charged lead-acid battery carries surface charge that inflates
          the reading by a few tenths of a volt per battery, which hides a weak one. If you can&apos;t wait, switching
          the headlights on for a few minutes removes most of the surface charge on carts that have lights. Check the
          electrolyte level before charging, and top up with distilled water after charging if the plates are exposed.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="pack-voltage">Measure the whole pack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to DC volts on a range above 60 V, or auto. Put the black probe on the main negative post, the
          one where the heavy cable leaves the pack toward the controller, and the red probe on the main positive. A
          rested, full 36 V pack of six 6 V batteries reads about 38.2 V, and a full 48 V pack about 50.9 V. A pack well
          below that after a full charge has at least one battery that won&apos;t take or hold a charge.
        </p>
        <Figure caption={<>Illustrative rested reading across a full 48 V pack of six 8 V batteries.</>}>
          <MeterReadout value="50.82" unit="V" mode="DC V  across pack" />
        </Figure>
      </section>

      <section>
        <StepHeading n={3} id="each-battery">Measure each battery on its own posts</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Now measure every battery individually, probes on that battery&apos;s own positive and negative posts, not
          on the cable lugs. Write the numbers down in order. In a healthy pack they cluster tightly. The illustrative
          readings below come from a 48 V pack with one tired battery; notice how number 4 stands out even though the
          pack total looks only a little low.
        </p>
        <Figure caption={<>Illustrative resting voltages of six 8 V batteries in one pack. Battery 4 sits about 0.2 V below the others, roughly 75% charged while the rest are full.</>}>
          <BarChart
            items={[
              { label: "Battery 1", value: 8.48, display: "8.48 V" },
              { label: "Battery 2", value: 8.47, display: "8.47 V" },
              { label: "Battery 3", value: 8.49, display: "8.49 V" },
              { label: "Battery 4", value: 8.27, display: "8.27 V", highlight: true },
              { label: "Battery 5", value: 8.46, display: "8.46 V" },
              { label: "Battery 6", value: 8.48, display: "8.48 V" },
            ]}
          />
        </Figure>
        <Figure caption={<>A 48 V cart pack: six 8 V batteries in series. Measure each battery across its own posts and compare.</>}>
          <GolfCartPackDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          A battery 0.2 V or more below its neighbors after the same full charge is the suspect. Divide by the number of
          cells to see how serious it is: battery 4 is about 0.21 V low across four cells, roughly 0.05 V per cell, which lines up
          with roughly a quarter less charge. A battery about 2 V low, for example an 8 V battery reading near 6.4 V,
          very likely has a dead or shorted cell.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="drive-test">Load test by driving the cart</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Resting voltage shows state of charge, not the ability to deliver current. To see that, load the pack. The
          simplest load is the cart itself: with a helper driving up a slope, or the brake firmly set and the motor
          pulling on a hill, read each battery in turn. Every battery sags under load; the weak one sags more. In an
          illustrative pack, five 8 V batteries might read about 7.9 V while one falls to 7.2 V. That 0.7 V difference
          under the same current is the signature of high internal resistance or lost capacity.
        </p>
        <p className="text-muted leading-7">
          Measure again after a normal round. The battery that ends a round lowest, and especially one whose voltage
          keeps sliding while the others hold steady, is the one to replace. Dedicated golf cart discharge testers do
          this more precisely by pulling a fixed current for a timed run, but a careful drive test with a meter finds
          the same culprit in most packs.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="hydrometer">Confirm with a hydrometer (flooded batteries)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A battery hydrometer reads the specific gravity of the acid in each cell, which a meter can&apos;t reach. On a
          fully charged flooded battery, expect about 1.265 to 1.280, corrected for temperature per the hydrometer&apos;s
          instructions. Battery makers commonly treat a spread of more than about 0.050 between cells in the same
          battery as a sign of a bad cell. Test only after charging, and only on flooded batteries with removable caps;
          sealed AGM and gel batteries can&apos;t be checked this way.
        </p>
        <KeyIdea title="Compare, don't just measure">
          A golf cart pack is only as strong as its weakest battery. The absolute numbers matter less than how each
          battery compares with its neighbors after the same charge and under the same load.
        </KeyIdea>
      </section>

      <section>
        <StepHeading n={6} id="connections">Check cables and terminals under load</StepHeading>
        <p className="text-muted leading-7">
          Sometimes the batteries are fine and a connection isn&apos;t. While the cart pulls on a hill, put one probe on
          a battery post and the other on the cable lug clamped to it. A clean connection reads a few hundredths of a
          volt at most; anything over about 0.1 V means corrosion or a loose nut, and that joint will run hot. Clean
          the post and lug, retorque to the battery maker&apos;s figure, and replace any lug that has discolored or
          melted. The same technique is explained in more detail in{" "}
          <Link href="/multimeters/how-to-check-voltage-drop-on-a-car" className={link}>
            how to check voltage drop on a car
          </Link>
          , and white or green crust on the posts is covered in{" "}
          <Link href="/multimeters/why-is-my-car-battery-corroding" className={link}>
            why a battery terminal corrodes
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="voltage-table" className="text-xl font-semibold mb-3">
          Golf cart battery voltage vs state of charge
        </h2>
        <p className="text-muted leading-7 mb-4">
          Approximate rested values for flooded lead-acid deep-cycle batteries at about 25 °C. Readings drift slightly
          with temperature and battery design; your battery maker&apos;s chart takes precedence.
        </p>
        <DataTable
          head={["State of charge", "Per cell", "6 V battery", "8 V battery", "12 V battery", "36 V pack (6 × 6 V)", "48 V pack (6 × 8 V)"]}
          rows={[
            ["100%", "2.12 V", "6.37 V", "8.49 V", "12.73 V", "38.2 V", "50.9 V"],
            ["75%", "2.07 V", "6.21 V", "8.28 V", "12.42 V", "37.3 V", "49.7 V"],
            ["50%", "2.03 V", "6.09 V", "8.12 V", "12.18 V", "36.5 V", "48.7 V"],
            ["25%", "1.98 V", "5.94 V", "7.92 V", "11.88 V", "35.6 V", "47.5 V"],
            ["0%", "about 1.95 V or less", "5.85 V", "7.80 V", "11.70 V", "35.1 V", "46.8 V"],
          ]}
          mono={[1, 2, 3, 4, 5, 6]}
        />
        <p className="text-muted leading-7 mt-4">
          Deep-cycle batteries last far longer when you recharge them before they fall below about 50%. Running a cart
          until it crawls home regularly takes the pack into the bottom rows, and that is a common reason packs fail
          early. If the pack won&apos;t charge at all, the problem may be the charger rather than the batteries; our
          guide to{" "}
          <Link href="/multimeters/how-to-test-a-battery-charger-with-a-multimeter" className={link}>
            testing a battery charger with a multimeter
          </Link>{" "}
          walks through the output checks.
        </p>
      </section>

      <section>
        <h2 id="lithium" className="text-xl font-semibold mb-3">Testing a lithium golf cart battery</h2>
        <p className="text-muted leading-7">
          Many newer carts use a single lithium (usually LiFePO4) pack with a built-in battery management system. A
          common 48 V class LiFePO4 pack uses 16 cells in series, about 51.2 V nominal, and reads roughly 53 to 54 V
          when full and rested; check the label or manual, as packs vary. You can only measure the pack
          terminals, not the cells, and the voltage curve is flat through most of the charge, so voltage is a poor fuel
          gauge. If the pack reads 0 V or far below nominal, the BMS has likely disconnected it to protect the cells;
          use the pack&apos;s app or display and contact the maker rather than forcing a charge. For cell-level
          diagnosis on LiFePO4, see the{" "}
          <Link href="/multimeters/how-to-test-a-48v-lifepo4-battery-for-voltage-imbalance-between-cells" className={link}>
            48 V LiFePO4 imbalance test
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use to test golf cart batteries</h2>
        <p className="text-muted leading-7 mb-6">
          You need a DC voltage range that covers the whole pack, around 60 V, and two-decimal resolution to compare
          individual batteries. A backlit display helps under a cart seat. Any of these does the job; cheaper meters are
          fine for battery voltage, which is low-energy, careful work.
        </p>
        <ProductStrip
          title="Meters for golf cart battery testing"
          items={[
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count display and auto or manual ranging. Good value for comparing battery voltages to the hundredth.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS multimeter",
              href: "/multimeters/fluke-115-review",
              note: "6,000-count backlit display and CAT III 600V in a tough Fluke body, a long-term meter for fleet or club maintenance.",
            },
            {
              name: "KAIWEETS KM200s",
              image: km200s.image,
              alt: "KAIWEETS KM200s True RMS multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS meter with a backlit display and auto-ranging. Fine for owners who check their own cart a few times a year.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
