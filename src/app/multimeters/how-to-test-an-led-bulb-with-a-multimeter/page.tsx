import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  FlowDiagram,
  HowToShell,
  KeyIdea,
  MeterReadout,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

const description =
  "A household LED bulb can't be diode-tested through its base. Test the socket voltage, switch and dimmer with a multimeter, then judge the bulb itself.";

export const metadata = buildMetadata({
  title: "How to Test an LED Bulb With a Multimeter",
  description,
  path: "/multimeters/how-to-test-an-led-bulb-with-a-multimeter",
});

const fluke115 = picks.find((p) => p.name === "Fluke 115")!;
const fluke15 = picks.find((p) => p.name === "Fluke 15B+")!;
const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

/** Cut-away of a screw-base LED bulb: base contacts, driver board, LED board. */
function LedBulbCutawayDiagram() {
  return (
    <svg
      viewBox="0 0 360 230"
      className="w-full h-auto"
      role="img"
      aria-label="Cut-away of a screw-base LED bulb. Mains from the center contact and the threaded shell goes first into a driver board with a rectifier and capacitor, and only the driver's DC output reaches the board of LEDs under the dome. A multimeter on the base contacts sees the driver's input, not the LEDs."
    >
      {/* dome */}
      <path d="M110 110 C 110 30, 250 30, 250 110 Z" className="fill-surface stroke-foreground" strokeWidth="2" />
      {/* led board */}
      <rect x="125" y="100" width="110" height="10" rx="2" className="fill-muted" opacity="0.5" />
      {[140, 160, 180, 200, 220].map((x) => (
        <rect key={x} x={x - 5} y="92" width="10" height="8" rx="1" className="fill-accent" />
      ))}
      <text x="180" y="78" fontSize="10" textAnchor="middle" className="fill-foreground">LED board</text>
      {/* housing + driver */}
      <path d="M125 110 L 135 160 H 225 L 235 110 Z" className="fill-surface stroke-foreground" strokeWidth="2" />
      <rect x="148" y="118" width="64" height="32" rx="3" className="fill-surface stroke-accent" strokeWidth="1.6" />
      <text x="180" y="132" fontSize="9" textAnchor="middle" className="fill-accent" fontWeight="700">driver</text>
      <text x="180" y="144" fontSize="8" textAnchor="middle" className="fill-muted">rectifier + capacitor</text>
      {/* base */}
      <rect x="150" y="160" width="60" height="38" rx="3" className="fill-surface stroke-foreground" strokeWidth="2" />
      {[168, 178, 188].map((y) => (
        <line key={y} x1="150" y1={y} x2="210" y2={y + 4} className="stroke-muted" strokeWidth="1.2" />
      ))}
      <rect x="172" y="198" width="16" height="8" rx="2" className="fill-foreground" />
      {/* labels */}
      <g fontSize="9" className="fill-muted">
        <text x="20" y="182">threaded shell</text>
        <text x="20" y="193">(neutral)</text>
        <line x1="84" y1="182" x2="148" y2="178" className="stroke-muted" strokeWidth="1" />
        <text x="232" y="214">center contact (hot)</text>
        <line x1="230" y1="211" x2="190" y2="204" className="stroke-muted" strokeWidth="1" />
        <text x="250" y="128">mains in,</text>
        <text x="250" y="139">low-voltage DC out</text>
        <line x1="248" y1="132" x2="214" y2="132" className="stroke-muted" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function HowToTestAnLedBulbWithAMultimeterPage() {
  return (
    <HowToShell
      title="How to Test an LED Bulb With a Multimeter"
      description={description}
      published="2026-11-18"
      path="/multimeters/how-to-test-an-led-bulb-with-a-multimeter"
      category="multimeters"
      intro={
        <>
          You can&apos;t test a household LED bulb the way you test a single LED, because a driver circuit sits
          between the screw base and the LEDs, so a resistance or diode reading across the base tells you almost
          nothing. Instead, use the multimeter to prove the fixture: about 120 V AC at the socket, a switch that
          closes, and no dimmer the bulb can&apos;t handle. If the socket checks out and a known-good bulb lights,
          the LED bulb is bad. This guide covers standard A19 and BR30 screw-in bulbs and 12 V MR16 spotlights, with
          the readings to expect at each step.
        </>
      }
      aside={{
        image: fluke115.image,
        alt: "Fluke 115 True RMS multimeter for checking 120 V at a light socket",
        caption: (
          <>
            A CAT III 600V meter such as the Fluke 115 is the right class of tool for probing a live light socket.
            See our{" "}
            <Link href="/multimeters/fluke-115-review" className={link}>
              Fluke 115 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-not-the-base", label: "Why the base reading is useless" },
        { id: "causes", label: "Symptoms and likely causes" },
        { id: "swap-test", label: "1. Swap with a known-good bulb" },
        { id: "inspect-socket", label: "2. Inspect the socket" },
        { id: "socket-voltage", label: "3. Measure socket voltage" },
        { id: "switch-dimmer", label: "4. Check the switch and dimmer" },
        { id: "mr16", label: "5. Testing 12 V MR16 bulbs" },
        { id: "judge-bulb", label: "6. Judge the bulb" },
        { id: "power-math", label: "LED bulb power and current" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "Can you test an LED bulb with a multimeter?",
          a: "Not directly through the base. The bulb's driver circuit sits between the base contacts and the LEDs, so ohms or diode mode across the base gives an open or drifting reading even on a good bulb. Use the meter to confirm the socket has about 120 V AC and the switch works, then try the bulb in a socket you know is good.",
        },
        {
          q: "Why does my LED bulb not work but an old incandescent does?",
          a: "Usually a dimmer or switch that wasn't designed for LED loads. Old dimmers and some lighted or smart switches leak a small current or chop the waveform in a way an LED driver can't use, while an incandescent filament just glows. Check the bulb's packaging for dimmer compatibility, or replace the dimmer with an LED-rated model.",
        },
        {
          q: "What voltage should a light socket have?",
          a: "In the US, about 120 V AC between the center contact and the threaded shell, with the switch on. ANSI C84.1 treats 114 to 126 V at the service entrance as the normal band, so 115 to 125 V at a socket is ordinary. With the switch off you should read close to 0 V, apart from a little phantom voltage on a high-impedance meter.",
        },
        {
          q: "How do I know if my LED bulb is burned out?",
          a: "If the bulb stays dark in a socket that reads about 120 V and lights another bulb, it has failed. Flickering, a dim glow when switched off, buzzing or one dark section in a filament-style bulb are also signs. Most failures are in the driver, not the LEDs, and the bulb isn't designed to be repaired, so replace it.",
        },
        {
          q: "Why does my LED bulb glow faintly when the switch is off?",
          a: "A small current is still reaching it. Common causes are a lighted or smart switch that passes a trickle to power itself, a switch wired in the neutral instead of the hot, or induced voltage on long cable runs. An incandescent bulb hides it, but an LED driver can store that trickle and glow. Have an electrician check the switch wiring.",
        },
      ]}
      next={[
        {
          href: "/multimeters/why-do-led-lights-flicker",
          title: "Why Do LED Lights Flicker?",
          desc: "Dimmer mismatch, loose neutrals and voltage dips behind flickering LED lighting.",
        },
        {
          href: "/multimeters/how-to-test-an-led-driver-with-a-multimeter",
          title: "How to Test an LED Driver",
          desc: "Input and output checks for the separate drivers used by panels and strips.",
        },
      ]}
    >
      <Callout title="Light sockets are live at 120 V">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            Turn the switch off before changing a bulb or touching the socket tab. For anything beyond a voltage check,
            switch off the breaker and confirm the socket is dead with your meter.
          </li>
          <li>
            Use a meter rated CAT III 600V for home wiring, with shrouded probes, and keep your fingers
            behind the probe guards.
          </li>
          <li>
            Don&apos;t open an LED bulb while it is connected, and treat a just-removed bulb with care: the driver&apos;s
            capacitor can stay charged for a short time, and the housing can be hot.
          </li>
          <li>
            Scorch marks, a melted socket, a burning smell or a breaker that trips mean a wiring fault. Stop and call a
            licensed electrician.
          </li>
        </ul>
      </Callout>

      <section>
        <h2 id="why-not-the-base" className="text-xl font-semibold mb-3">
          Why a reading across the bulb base is useless
        </h2>
        <p className="text-muted leading-7 mb-4">
          An incandescent bulb is a single filament between the two base contacts, so a resistance check gives a
          clear answer: a few ohms when cold means good, OL means the filament broke. An LED bulb is different. The
          center contact and the threaded shell feed a small power supply called the driver, which rectifies the
          120 V AC, smooths it with a capacitor and feeds a controlled current to the LEDs under the dome.
        </p>
        <Figure caption={<>Inside a screw-base LED bulb: the multimeter on the base contacts sees the driver&apos;s input circuit, not the LEDs.</>}>
          <LedBulbCutawayDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Put a meter on Ω across that base and you are measuring the driver&apos;s input: a rectifier, a capacitor
          and often a fuse resistor. A good bulb may read OL, a high value, or a number that climbs as the meter&apos;s
          small test current charges the capacitor. A dead bulb can read exactly the same. Diode mode is no better,
          because the LEDs inside are wired in series strings whose combined forward voltage is far above the roughly
          2 V a typical diode test supplies. That is why the useful multimeter work is on the fixture, and the bulb
          itself is judged by substitution. Single 5 mm LEDs are a different story; for those, see{" "}
          <Link href="/multimeters/how-to-check-led-polarity-with-a-multimeter" className={link}>
            how to check LED polarity with a multimeter
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and likely causes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Bulb dark, other bulbs fine in that socket", "Failed driver or LED string", "Swap test (step 1)", "Replace the bulb"],
            ["Every bulb dark in one fixture", "No voltage: switch, breaker or wiring", "Socket voltage (step 3)", "Reset breaker; electrician for wiring"],
            ["Flickers or strobes when dimmed", "Dimmer not LED-compatible, or bulb non-dimmable", "Read the bulb label; bypass test", "LED-rated dimmer or dimmable bulb"],
            ["Glows faintly when off", "Lighted/smart switch trickle or switched neutral", "Socket voltage with switch off", "Electrician to check switch wiring"],
            ["Dies early in a closed globe", "Heat in an enclosed fixture", "Bulb label: enclosed-rated?", "Use a bulb rated for enclosed fixtures"],
            ["MR16 flickers or won't start", "12 V transformer mismatch", "AC volts at the pins (step 5)", "LED-compatible transformer"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="swap-test">Swap with a known-good bulb</StepHeading>
        <p className="text-muted leading-7">
          The fastest test needs no meter. Move the suspect bulb to a lamp you know works, and put a bulb you know
          works into the suspect fixture. If the suspect bulb stays dark in the good lamp, it has failed. If the good
          bulb stays dark in the suspect fixture, the problem is the fixture, the switch or the circuit, and the meter
          steps below find which. Test on a plain on/off switch where you can, so a fussy dimmer doesn&apos;t mislead you.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inspect-socket">Inspect the socket with the power off</StepHeading>
        <p className="text-muted leading-7">
          With the switch and breaker off, look into the socket. The brass tab at the bottom is the center contact.
          It should spring up slightly; years of tight bulbs can flatten it so a new bulb no longer touches it. With
          power confirmed off, you can lift it slightly with a wooden stick or insulated tool.
          Look for darkened plastic, corrosion on outdoor fixtures, or a cracked socket shell. The National Electrical
          Code (NEC 410.50) requires the threaded shell to be connected to the grounded conductor, the neutral, so the
          tab is the hot connection and the part to treat with most respect.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="socket-voltage">Measure the socket voltage</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Set the meter to AC volts (V~) with the red lead in the V jack. Restore power and turn the switch on. Touch
          one probe tip to the center tab and the other to the inside of the threaded shell, without letting either
          probe bridge both. A healthy US circuit reads about 120 V. ANSI C84.1, the US voltage standard, treats 114
          to 126 V at the service entrance as the normal range, so 115 to 125 V at a socket is unremarkable.
        </p>
        <Figure caption={<>Illustrative socket readings: 120.4 V AC with the switch on, and a few volts of phantom reading with it off on a high-impedance meter.</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="120.4" unit="V" mode="AC V  switch on" />
            <MeterReadout value="3.6" unit="V" mode="AC V  switch off" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Read 0 V with the switch on? Check the breaker, then the switch (step 4). A reading well below 110 V
          suggests a loose connection somewhere upstream that drops voltage under load, worth a call to an
          electrician. With the switch off you should see close to 0 V; a digital meter&apos;s high input impedance
          can show a few volts of induced &quot;ghost&quot; voltage that disappears under any load. If you see 50 V or
          more with the switch off, the switch may be in the neutral leg, which is a wiring fault.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="switch-dimmer">Check the switch and dimmer</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the breaker off and the switch cover removed, you can check a plain toggle switch for continuity:
          disconnect it and read ohms across its terminals. It should beep or read near 0 Ω when on and OL when off.
          Our{" "}
          <Link href="/multimeters/how-to-test-continuity-with-a-multimeter" className={link}>
            continuity testing guide
          </Link>{" "}
          covers the method. If you are not comfortable working in a switch box, stop at the socket voltage test and
          call an electrician.
        </p>
        <p className="text-muted leading-7">
          Dimmers are the most common reason a good LED bulb misbehaves. Older dimmers were designed for incandescent
          loads, and many list a minimum load that a few LED bulbs drawing 8 to 10 W each can fall below. The result is flicker, buzzing, a dim glow when off, or a bulb that never turns on. The bulb&apos;s
          box says whether it is dimmable; a non-dimmable LED bulb on a dimmer can fail early. A meter can&apos;t
          judge dimmer compatibility directly, but a steady 120 V with the dimmer at full and a bulb that still
          flickers point squarely at the dimmer. Our guide on{" "}
          <Link href="/multimeters/why-do-led-lights-flicker" className={link}>
            why LED lights flicker
          </Link>{" "}
          goes further.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="mr16">Testing 12 V MR16 LED bulbs</StepHeading>
        <p className="text-muted leading-7">
          Two-pin MR16 spotlights run on 12 V from a transformer, so they are safer to probe at the pins. Set the
          meter to AC volts and measure across the two socket contacts with the light on. A magnetic transformer
          gives a steady reading near 12 V AC. Electronic transformers output a high-frequency waveform that many
          meters read poorly, and many print a minimum load sized for halogen lamps; a low-wattage LED replacement can sit
          below that minimum and make the transformer cycle on and off, which shows up as flicker. A True RMS
          meter reads these outputs more sensibly than an average-responding one, but the lasting fix is a
          transformer or driver the LED bulb&apos;s maker lists as compatible. If the socket reads 0 V, test the
          transformer&apos;s 120 V input before blaming the bulbs.
        </p>
      </section>

      <section>
        <StepHeading n={6} id="judge-bulb">Judge the bulb</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Once the socket reads about 120 V and lights a known-good bulb, any LED bulb that stays dark, flickers or
          glows dimly in it is faulty. Most LED bulb failures are in the driver, especially its electrolytic
          capacitor, which ages faster with heat. That is why LED bulbs in enclosed globes and recessed cans without
          an enclosed-fixture rating fail early. Screw-in LED bulbs are not designed to be repaired; replace it, and
          if it was still young, check whether it was rated for the fixture it was in.
        </p>
        <Figure caption={<>The LED bulb test: prove the fixture, then judge the bulb by substitution.</>}>
          <FlowDiagram
            steps={[
              { label: "Swap", sub: "Known-good bulb" },
              { label: "Inspect", sub: "Tab and socket, power off" },
              { label: "Measure", sub: "About 120 V AC" },
              { label: "Switch", sub: "Continuity, dimmer type" },
              { label: "Verdict", sub: "Bulb or fixture" },
            ]}
          />
        </Figure>
        <KeyIdea title="Test the fixture, judge the bulb">
          The meter&apos;s job is to prove the socket, switch and dimmer. A bulb that stays dark in a socket proven at
          120 V, which lights another bulb, has failed, whatever its base reads on the ohms range.
        </KeyIdea>
      </section>

      <section>
        <h2 id="power-math" className="text-xl font-semibold mb-3">LED bulb power and current: the numbers</h2>
        <p className="text-muted leading-7 mb-4">
          ENERGY STAR equates an 800-lumen bulb with a traditional 60 W incandescent. LED bulbs that give 800 lumens
          typically draw around 8 to 10 W, printed on the box as the actual wattage. That gap explains the dimmer
          problem. Current is power divided by voltage: 60 W ÷ 120 V = 0.5 A for the incandescent, and 9 W ÷ 120 V
          ≈ 0.075 A for a 9 W LED, before allowing for the driver&apos;s power factor, which makes the real RMS
          current somewhat higher.
        </p>
        <Figure caption={<>Approximate current at 120 V for an 800-lumen bulb (I = P ÷ V). The LED&apos;s small, non-sinusoidal draw is what trips up old dimmers and lighted switches.</>}>
          <BarChart
            items={[
              { label: "60 W incandescent", value: 0.5, display: "0.50 A" },
              { label: "9 W LED", value: 0.075, display: "≈0.075 A", highlight: true },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          You can confirm a bulb&apos;s draw with a clamp meter on a line splitter, but at under 0.1 A most clamp
          meters are near the bottom of their range, and a plug-in watt meter is easier. For bulbs on separate drivers,
          such as LED panels, under-cabinet lights and tape, the driver output is measurable with a meter; see{" "}
          <Link href="/multimeters/how-to-test-an-led-driver-with-a-multimeter" className={link}>
            how to test an LED driver
          </Link>{" "}
          and{" "}
          <Link href="/multimeters/how-to-test-an-led-strip-with-a-multimeter" className={link}>
            how to test an LED strip
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which multimeter to use on light fixtures</h2>
        <p className="text-muted leading-7 mb-6">
          Any meter with AC volts and continuity works, but for mains fixtures choose one with a CAT III 600V rating
          and shrouded leads. True RMS helps with electronic transformers and dimmed circuits, where the waveform is
          not a clean sine wave.
        </p>
        <ProductStrip
          title="Meters for checking light sockets"
          items={[
            {
              name: "Fluke 115",
              image: fluke115.image,
              alt: "Fluke 115 True RMS digital multimeter",
              href: "/multimeters/fluke-115-review",
              note: "True RMS AC volts, CAT III 600V and a continuity beeper. Reads dimmed and electronic-transformer circuits more sensibly.",
            },
            {
              name: "Fluke 15B+",
              image: fluke15.image,
              alt: "Fluke 15B+ digital multimeter",
              href: "/multimeters/fluke-15b-plus-review",
              note: "CAT III 600V with simple controls for socket voltage and switch continuity. Not True RMS, fine on clean 120 V circuits.",
            },
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "Budget True RMS meter with non-contact voltage detection. Rated CAT II 600V, so keep it to sockets and appliances.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
