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
  "Test a USB cable with a multimeter: pin-by-pin continuity, VBUS and ground resistance, voltage drop under load, the USB-C CC resistor and charge-only cables.";

export const metadata = buildMetadata({
  title: "How to Test a USB Cable With a Multimeter",
  description,
  path: "/multimeters/how-to-test-a-usb-cable-with-a-multimeter",
});

const fluke107 = picks.find((p) => p.name === "Fluke 107")!;
const astro = picks.find((p) => p.name === "AstroAI DM6000AR")!;
const fluke115 = picks.find((p) => p.name === "Fluke 115")!;

const link = "text-accent hover:underline";

/** Pin mapping of a USB-A to USB-C cable, with the 56 kΩ pull-up on CC. */
function UsbPinMapDiagram() {
  const rows = [
    { y: 50, a: "1  VBUS", c: "A4 B4 A9 B9  VBUS", tone: "accent" },
    { y: 80, a: "2  D−", c: "A7  D−", tone: "fg" },
    { y: 110, a: "3  D+", c: "A6  D+", tone: "fg" },
    { y: 140, a: "4  GND", c: "A1 B1 A12 B12  GND", tone: "fg" },
  ];
  return (
    <svg
      viewBox="0 0 360 210"
      className="w-full h-auto"
      role="img"
      aria-label="Wiring of a USB-A to USB-C charging cable: USB-A pin 1 VBUS connects to USB-C pins A4, B4, A9 and B9; pin 2 D minus to A7; pin 3 D plus to A6; pin 4 ground to A1, B1, A12 and B12. Inside the USB-C plug, a 56 kilohm resistor connects VBUS to the CC pin A5, which tells the device that a default USB power source is attached. A charge-only cable omits the D plus and D minus wires."
    >
      <rect x="10" y="30" width="80" height="130" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="50" y="22" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">USB-A plug</text>
      <rect x="230" y="30" width="120" height="160" rx="6" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="290" y="22" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">USB-C plug</text>
      {rows.map((r) => (
        <g key={r.a}>
          <text x="18" y={r.y + 4} fontSize="9" className="fill-foreground">{r.a}</text>
          <line
            x1="90"
            y1={r.y}
            x2="230"
            y2={r.y}
            className={r.tone === "accent" ? "stroke-accent" : "stroke-foreground"}
            strokeWidth="1.8"
            strokeDasharray={r.a.includes("D") ? "5 3" : undefined}
          />
          <text x="236" y={r.y + 4} fontSize="8.5" className="fill-foreground">{r.c}</text>
        </g>
      ))}
      {/* 56k resistor from VBUS to CC inside C plug */}
      <path d="M244 56 V160" className="stroke-accent" strokeWidth="1.4" />
      <rect x="238" y="150" width="12" height="20" rx="2" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <path d="M244 170 V178 H262" className="stroke-accent" strokeWidth="1.4" />
      <text x="266" y="181" fontSize="8.5" className="fill-accent">A5  CC</text>
      <text x="256" y="163" fontSize="8.5" className="fill-accent">56 kΩ</text>
      <text x="150" y="196" fontSize="8.5" textAnchor="middle" className="fill-muted">dashed = data pair (missing in charge-only cables)</text>
    </svg>
  );
}

export default function HowToTestAUsbCableWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test a USB Cable With a Multimeter"
      description={description}
      published="2026-11-15"
      path="/multimeters/how-to-test-a-usb-cable-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          To test a USB cable with a multimeter, set the meter to continuity and check each pin from one plug to the
          matching pin on the other (VBUS, D+, D− and ground), then measure the resistance or the voltage drop of
          the power wires to see whether the cable can carry charging current. A cable can pass continuity on every
          pin and still charge slowly, because thin power wires drop too much voltage under load. This guide covers
          both checks, the USB-C CC resistor that decides whether a charger turns on at all, and how to spot a
          charge-only cable.
        </>
      }
      aside={{
        image: fluke107.image,
        alt: "Fluke 107 palm-sized multimeter for USB cable continuity and resistance checks",
        caption: (
          <>
            A palm-sized meter like the Fluke 107 handles continuity and resistance on small connectors. See our{" "}
            <Link href="/multimeters/fluke-107-review" className={link}>
              Fluke 107 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "what-a-cable-has-to-do", label: "What a USB cable has to do" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "get-access", label: "1. Get access to the pins" },
        { id: "continuity", label: "2. Continuity, pin by pin" },
        { id: "shorts", label: "3. Check for shorts" },
        { id: "power-resistance", label: "4. Measure power-wire resistance" },
        { id: "voltage-drop", label: "5. Voltage drop under load" },
        { id: "cc-resistor", label: "6. Check the USB-C CC line" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can you test a USB cable with a multimeter?",
          a: "Yes. Continuity mode confirms each wire connects end to end and that no two wires are shorted. Resistance or a voltage-drop test under load shows whether the power wires are thick enough for fast charging. A multimeter can't confirm data speed or USB Power Delivery capability, which need a protocol tester or the device itself, but it finds most broken and weak cables.",
        },
        {
          q: "How do I tell if a USB cable is charge-only?",
          a: "Check continuity on the D+ and D− pins from one end to the other. A charge-only cable has VBUS and ground but no data wires, so D+ and D− show open circuit, OL on the meter. Phones often show 'charging' but never appear on a computer with these cables. They work for charging, though often only at default USB current.",
        },
        {
          q: "What resistance should a good USB cable have?",
          a: "It depends on length and wire gauge, but a good 1 m charging cable usually measures well under half an ohm for the VBUS and ground wires together, and quality cables with 20 to 24 AWG power wires measure around 0.07 to 0.2 Ω round trip. Your meter's leads add a tenth of an ohm or more, so zero them first or use the voltage-drop method.",
        },
        {
          q: "Why does my USB-C cable charge slowly when continuity is fine?",
          a: "Continuity only shows that a path exists, not how good it is. Thin power wires, a worn plug, or a missing e-marker chip can all limit charging. USB-C cables need an e-marker to carry more than 3 A, so a non-marked cable caps a 100 W charger at 60 W. A voltage drop of more than a few tenths of a volt at 2 A also slows charging.",
        },
        {
          q: "What is the 56k resistor in a USB-C cable?",
          a: "Cables with a USB-A plug on one end and USB-C on the other are required by the USB Type-C specification to include a 56 kΩ pull-up from VBUS to the CC pin. It tells the device that a default-power legacy source is attached, so it won't try to draw more current than an old USB-A port can supply. A wrong value can let devices overload old ports.",
        },
      ]}
      next={[
        {
          href: "/multimeters/usb-c-charger-not-delivering-full-power",
          title: "USB-C Charger Not Delivering Full Power",
          desc: "PD voltage profiles, e-marked cables and why fast charging drops out.",
        },
        {
          href: "/multimeters/how-to-test-continuity-with-a-multimeter",
          title: "How to Test Continuity With a Multimeter",
          desc: "Beep thresholds, lead checks and continuity on long or fine wires.",
        },
      ]}
    >
      <Callout title="Unplug the cable before resistance and continuity tests">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Continuity and resistance modes must only be used on an unpowered cable. Disconnect both ends from any
            charger, computer or device before probing.
          </li>
          <li>
            USB-C pins are 0.5 mm apart. A probe tip that bridges VBUS and an adjacent pin in a live port can damage
            the charger or device, so do live voltage checks only through a breakout board.
          </li>
          <li>
            A cable with melted plastic, a scorched plug or exposed wires should be thrown away, not tested. A
            discolored port on the charger or device needs attention too.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="what-a-cable-has-to-do" className="text-xl font-semibold mb-3">What a USB cable has to do</h2>
        <p className="text-muted leading-7 mb-4">
          A basic USB 2.0 cable has four wires: VBUS (5 V power), ground, and a data pair, D+ and D−. USB-C adds a
          configuration channel (CC) wire that lets the charger and device agree on current and voltage, plus extra
          SuperSpeed pairs in full-featured cables. For charging, three things matter: the power wires must be
          intact and thick enough, the data pair must be present if the device uses it to detect a fast charger, and
          on USB-C the CC wiring must be correct or the charger may never switch on.
        </p>
        <p className="text-muted leading-7">
          The current demands are significant. USB 2.0 ports are specified for 500 mA and USB 3.x ports for 900 mA,
          dedicated chargers under the Battery Charging 1.2 specification supply up to 1.5 A, USB-C current
          advertisement allows 1.5 or 3 A at 5 V, and USB Power Delivery reaches 3 A, or 5 A with an e-marked cable,
          at up to 20 V in its standard power range. A cable that is fine at 500 mA can drop a phone out of fast
          charging at 3 A.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Charges, but the computer never sees the device", "Charge-only cable (no data wires)", "Continuity on D+ and D− (step 2)", "Use a data cable"],
            ["Charges only at certain angles", "Broken strand near a plug", "Flex test on continuity (step 2)", "Replace the cable"],
            ["Charges slowly or drops out of fast charging", "Thin power wires or worn contacts", "Resistance and voltage drop (steps 4 and 5)", "Shorter, thicker cable"],
            ["USB-C charger gives no power at all", "Broken CC wire or wrong resistor", "CC check (step 6)", "Use a USB-IF certified cable"],
            ["Charger shuts off as soon as it's plugged in", "Short between VBUS and ground", "Short check (step 3)", "Discard the cable"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="get-access">Get access to the pins</StepHeading>
        <p className="text-muted leading-7">
          USB-A plug pins are big enough to touch with fine probe tips. USB-C, micro-USB and Lightning pins are not.
          The reliable method is a pair of breakout boards, one for each plug type, that turn every pin into a
          labeled pad or screw terminal. Plug each end of the cable into a breakout and probe the pads. Don&apos;t
          push probe tips into a USB-C plug; you&apos;ll bend the contacts and may short neighbors. If you must cut
          a cable to test it, it has already failed: cut cables can&apos;t be safely repaired for charging use.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="continuity">Check continuity, pin by pin</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to continuity, touch the probes together to confirm the beep, then probe each pin at one end
          and its partner at the other end: VBUS to VBUS, ground to ground, D+ to D+, D− to D−. On USB-A the pins are
          numbered 1 to 4 (VBUS, D−, D+, GND). On USB-C, VBUS sits on A4, B4, A9 and B9 and ground on A1, B1, A12
          and B12; any one of each is enough to probe. On micro-USB, VBUS is pin 1, D− pin 2, D+ pin 3, ID pin 4 and
          ground pin 5.
        </p>
        <Figure caption={<>How the conductors of a USB-A to USB-C charging cable map from end to end. The 56 kΩ resistor inside the USB-C plug is required in this cable type.</>}>
          <UsbPinMapDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          While the meter is beeping on VBUS, flex the cable firmly near each plug. A beep that stutters means a
          broken strand. Many meters have a MIN MAX or a fast continuity response that catches brief breaks better
          than your ear does; our{" "}
          <Link href="/multimeters/how-to-find-a-broken-wire-with-a-multimeter" className={link}>
            broken wire guide
          </Link>{" "}
          covers the technique. Open circuit (OL) on D+ and D− with VBUS and ground intact means a charge-only cable.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="shorts">Check for shorts between conductors</StepHeading>
        <p className="text-muted leading-7">
          With the far end unplugged, measure between VBUS and ground at one end. You should see OL. On a USB-A to
          USB-C cable, also expect OL from D+ to D− and from each data line to VBUS and ground. A reading of a few
          ohms or a beep between VBUS and ground is a short, which is why some chargers refuse to start or shut off
          immediately with that cable. The one deliberate exception is the CC resistor in step 6, which reads tens
          of kilohms, not a short.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="power-resistance">Measure the power-wire resistance</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Switch to the lowest ohms range and short the probes together. Note the reading, often 0.1 to 0.3 Ω, or
          press REL to zero it. Then measure VBUS end to end and ground end to end and add them: the current flows
          out through one and back through the other. For a 1 m cable, the copper alone gives roughly 0.21 Ω per
          meter for 28 AWG, 0.084 Ω for 24 AWG and 0.033 Ω for 20 AWG, so the round trip is twice that. Plug contacts
          add a little more. For more on low-ohm readings, see{" "}
          <Link href="/multimeters/how-to-measure-resistance-with-a-multimeter" className={link}>
            how to measure resistance with a multimeter
          </Link>
          .
        </p>
        <Figure caption={<>Voltage lost in the copper of a 1 m cable at 2 A, round trip, by power-wire gauge (arithmetic from standard copper resistance, ignoring contacts). Thin 28 AWG wires lose most of a volt.</>}>
          <BarChart
            items={[
              { label: "28 AWG (≈ 0.43 Ω)", value: 0.85, display: "≈ 0.85 V" },
              { label: "24 AWG (≈ 0.17 Ω)", value: 0.34, display: "≈ 0.34 V", highlight: true },
              { label: "20 AWG (≈ 0.066 Ω)", value: 0.13, display: "≈ 0.13 V" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={5} id="voltage-drop">Measure the voltage drop under load</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A resistance reading near the meter&apos;s lead resistance is hard to trust, so the more decisive test is
          voltage drop. Plug the cable into a 5 V charger through a breakout at the charger end and a breakout plus a
          load (an electronic load or a power resistor) at the far end. Measure VBUS to ground at each end while the
          load draws a known current. The difference divided by the current is the round-trip resistance. With a
          5 Ω load at about 1 A, a drop of 0.15 V means 0.15 Ω, which is a good cable.
        </p>
        <Figure caption={<>Illustrative readings at 1 A: VBUS to ground at the charger end (left) and at the device end (right). The 0.15 V difference implies about 0.15 Ω round trip.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="5.08" unit="V" mode="DC V  charger end" />
            <MeterReadout value="4.93" unit="V" mode="DC V  device end" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The USB 2.0 specification expects a port to deliver at least about 4.75 V at its connector, and many
          devices back off their charging current as their input voltage sags. A cable that loses half a volt or
          more at 2 A is the likely reason a phone charges at a crawl on one cable and quickly on another. The
          same check on a power supply&apos;s own output is covered in{" "}
          <Link href="/multimeters/how-to-test-a-dc-power-supply-with-a-multimeter" className={link}>
            how to test a DC power supply
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={6} id="cc-resistor">Check the USB-C CC line</StepHeading>
        <p className="text-muted leading-7 mb-4">
          USB-C chargers don&apos;t switch on VBUS until they detect a device through the CC pin, so the CC wiring
          matters as much as the power wires. What you should find depends on the cable type, according to the USB
          Type-C specification:
        </p>
        <DataTable
          head={["Cable type", "What to measure", "Expected reading"]}
          rows={[
            ["USB-A to USB-C", "VBUS to CC (A5) on the C plug", "About 56 kΩ (pull-up, Rp)"],
            ["USB-C to USB-C", "CC (A5) end to end", "Continuity, near 0 Ω"],
            ["USB-C to micro-B", "CC (A5) to ground on the C plug", "About 5.1 kΩ (pull-down, Rd)"],
            ["Any cable", "VBUS to ground", "Open circuit (OL)"],
          ]}
          mono={[2]}
        />
        <p className="text-muted leading-7 mt-4">
          A USB-C to USB-C cable with no CC continuity will usually charge nothing. An A-to-C cable with a low
          resistor value instead of 56 kΩ (some early cables used 10 kΩ) tells the phone it may draw up to 3 A from
          an old USB-A port that may only be designed for 500 mA to 1.5 A. A multimeter can&apos;t read the e-marker
          chip that 5 A cables need; if a 100 W charger tops out at 60 W, that is the likely reason, as our guide on a{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C charger not delivering full power
          </Link>{" "}
          explains.
        </p>
        <KeyIdea title="Continuity says connected; voltage drop says capable">
          A cable can beep on every pin and still starve a phone. Check continuity for broken and missing wires,
          then measure the voltage drop under load to see whether the power wires can actually carry charging
          current.
        </KeyIdea>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use to test a USB cable</h2>
        <p className="text-muted leading-7 mb-6">
          You need a fast continuity beep, a low ohms range you can zero, and enough resolution to see a 0.1 V
          difference. A 6,000-count meter resolves 1 mV on its 6 V range, which is plenty. If a cable checks out
          but your power bank still won&apos;t fill, see{" "}
          <Link href="/multimeters/why-is-my-power-bank-not-charging" className={link}>
            why a power bank isn&apos;t charging
          </Link>
          .
        </p>
        <ProductStrip
          title="Meters for cable testing"
          items={[
            {
              name: "Fluke 107",
              image: fluke107.image,
              alt: "Fluke 107 palm-sized digital multimeter",
              href: "/multimeters/fluke-107-review",
              note: "Palm-sized at 200 g with a 6,000-count display and diode test. Easy to hold next to a breakout board on the bench.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astro.image,
              alt: "AstroAI DM6000AR True RMS digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "6,000-count resolution with manual ranging, so you can lock the low ohms range for repeatable cable resistance readings.",
            },
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS, a backlit 6,000-count display and CAT III 600V. A meter that covers cables today and mains work later.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
