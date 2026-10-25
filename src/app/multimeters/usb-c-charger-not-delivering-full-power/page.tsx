import Link from "next/link";
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
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "USB-C charger not delivering full power? How Power Delivery negotiation, cable ratings, device limits and heat cap charging, and how to test what you get.";

export const metadata = buildMetadata({
  title: "USB-C Charger Not Delivering Full Power",
  description,
  path: "/multimeters/usb-c-charger-not-delivering-full-power",
});

const all = getAllPicks("multimeters");
const kaiweets = all.find((p) => p.name === "KAIWEETS KM200s")!;
const astroai = all.find((p) => p.name === "AstroAI DM6000AR")!;
const ut139c = all.find((p) => p.name === "UNI-T UT139C")!;

const link = "text-accent hover:underline";

/** Charger, cable and device each have a ceiling; the delivered power is the lowest of the three. */
function WeakestLinkDiagram() {
  return (
    <svg
      viewBox="0 0 340 170"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of a 100 watt charger, a cable without an e-marker limited to 60 watts, and a laptop that accepts up to 65 watts; the delivered power is 60 watts, the lowest limit in the chain"
    >
      <g className="stroke-foreground" strokeWidth="1.6" fill="none">
        <rect x="10" y="30" width="90" height="56" rx="5" />
        <rect x="125" y="30" width="90" height="56" rx="5" className="stroke-accent" strokeWidth="2.2" />
        <rect x="240" y="30" width="90" height="56" rx="5" />
        <line x1="100" y1="58" x2="125" y2="58" />
        <line x1="215" y1="58" x2="240" y2="58" />
      </g>
      <g fontSize="10.5" textAnchor="middle" className="fill-foreground">
        <text x="55" y="52">Charger</text>
        <text x="170" y="52">Cable</text>
        <text x="285" y="52">Laptop</text>
      </g>
      <g fontSize="9.5" textAnchor="middle" className="fill-muted">
        <text x="55" y="70">up to 100 W</text>
        <text x="170" y="70" className="fill-accent">3 A: 60 W max</text>
        <text x="285" y="70">accepts 65 W</text>
      </g>
      <line x1="170" y1="92" x2="170" y2="118" className="stroke-accent" strokeWidth="1.4" strokeDasharray="3 2" />
      <text x="170" y="134" fontSize="10.5" textAnchor="middle" className="fill-accent">
        Delivered: 20 V × 3 A = 60 W
      </text>
      <text x="170" y="154" fontSize="9.5" textAnchor="middle" className="fill-muted">
        Illustrative: the lowest limit in the chain wins
      </text>
    </svg>
  );
}

export default function UsbCChargerNotDeliveringFullPowerPage() {
  return (
    <HowToShell
      title="Why Is My USB-C Charger Not Delivering Full Power? Testing and Diagnosis"
      description={description}
      path="/multimeters/usb-c-charger-not-delivering-full-power"
      category="multimeters"
      published="2026-10-24"
      updated="2026-10-25"
      intro={
        <>
          A USB-C charger usually isn&apos;t delivering full power because something else in the chain has
          a lower limit: the cable (most are rated 3 A, which caps a 20 V link at 60 W), the device&apos;s
          own maximum input, a second device sharing the charger, heat, or a battery that is nearly full.
          The wattage on the label is a ceiling that the charger, cable and device negotiate down from each
          time you plug in, and the lowest limit wins. To find which link is holding you back, swap the
          cable first, then read the real voltage and current with an inline USB-C power meter, because a
          multimeter on a bare port can&apos;t take part in that negotiation.
        </>
      }
      aside={{
        image: kaiweets.image,
        alt: "KAIWEETS KM200s digital multimeter",
        caption: (
          <>
            A multimeter is useful for continuity and for checking a repaired port on the bench, but it
            can&apos;t take part in a Power Delivery negotiation. See our{" "}
            <Link href="/multimeters/kaiweets-km200s-review" className={link}>
              KAIWEETS KM200s review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "causes", label: "Causes at a glance" },
        { id: "pd-negotiation", label: "How USB-C negotiates power" },
        { id: "power-math", label: "The power math: volts × amps" },
        { id: "cable-limits", label: "Cable ratings and e-markers" },
        { id: "device-limits", label: "Check the device's own limit" },
        { id: "inline-meter", label: "Measure with an inline USB-C meter" },
        { id: "sharing-and-heat", label: "Rule out port sharing and heat" },
        { id: "why-multimeter-shows-5v", label: "Why a multimeter shows 5 V or nothing" },
        { id: "swap-and-inspect", label: "Swap parts and inspect the port" },
        { id: "meters", label: "Meters for the bench side" },
      ]}
      faq={[
        {
          q: "Why does my laptop say it's charging slowly with a phone charger?",
          a: "The laptop asks for a voltage and current the phone charger may not offer. If the charger's highest profile is 9 V at 2.22 A (about 20 W) and the laptop wants 20 V at 3 A, the laptop either charges slowly, only holds its level while in use, or refuses to charge, depending on its design. The charger is fine; it is simply smaller than the laptop needs.",
        },
        {
          q: "Can a USB-C cable reduce charging speed even if it fits?",
          a: "Yes. Every USB-C cable has the same plug, but cables without an electronic marker chip are limited to 3 A, which is 60 W at 20 V. Going beyond that needs a 5 A e-marked cable. Very thin, long or damaged cables also lose voltage along their length, and a charger or device that notices the drop may lower the current to stay safe.",
        },
        {
          q: "Does a 100 W charger damage a phone that only needs 20 W?",
          a: "No. A Power Delivery charger only supplies the voltage and current the phone requests, so a larger charger simply has spare capacity it never uses. The phone stays in charge of what it draws, and it will pick a profile within its own limits. That is why one high-wattage charger can safely serve a phone, a tablet and a laptop in turn.",
        },
        {
          q: "Why does charging speed drop when the battery is nearly full?",
          a: "Lithium-ion charging deliberately tapers. Once the battery approaches full, the device switches from a high constant current to a constant voltage and lets the current fall away, often from somewhere around 80% charge, depending on the maker. A power meter showing a few watts near 100% is normal behavior, not a charger fault, so always test from a lower charge level.",
        },
        {
          q: "Can lint in the port really stop fast charging?",
          a: "It can. Packed lint stops the plug from seating fully, so some contacts touch poorly or not at all. Poor contact on the configuration (CC) pins can disrupt negotiation and leave the device on basic 5 V charging, and high resistance on the power pins can cause heating. Clean it gently with a non-metallic tool, with the device switched off, and retest.",
        },
        {
          q: "How do I know if my USB-C cable supports 100 W?",
          a: "Look for a 5 A or 100 W rating printed on the plug, the cable or its packaging, or the USB-IF certified logo with a wattage. Without a marking, the only reliable check is a PD tester or inline meter that reads the cable's e-marker. If a 100 W charger and a laptop that accepts 100 W still settle at about 3 A, the cable is the likely limit.",
        },
      ]}
      next={[
        {
          href: "/multimeters/how-to-measure-standby-current-in-an-electronic-device",
          title: "How to Measure Standby Current",
          desc: "Measuring the small currents a device draws when it is supposed to be idle.",
        },
        {
          href: "/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board",
          title: "How to Solder a Replacement USB Connector",
          desc: "When the port itself is damaged, the repair that follows diagnosis.",
        },
      ]}
    >
      <Callout title="Batteries and heat: stop using damaged chargers and cables">
        <ul className="space-y-2 list-disc pl-5">
          <li>
            A charger, cable or port that is discolored, smells of burning or is too hot to hold should be taken
            out of use rather than tested further. Heat at a connector means resistance and wasted power
            concentrated in a small spot.
          </li>
          <li>
            A swollen phone or laptop battery is a fire risk. Stop charging it, keep it away from flammable
            material and have it replaced by the maker or a qualified repair shop.
          </li>
          <li>The charger&apos;s mains side is not user-serviceable. Don&apos;t open a wall charger to test it.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Causes at a glance</h2>
        <DataTable
          head={["Symptom", "Likely cause", "How to check", "Fix or who to call"]}
          rows={[
            ["Laptop says slow charger; power meter shows about 60 W", "Cable without a 5 A e-marker", "Inline meter shows 20 V but current stuck near 3 A", "Use a 5 A e-marked cable rated 100 W or more"],
            ["Only 5 V on the meter with a PD-capable device", "No PD negotiation: adapter, hub or port contact", "Remove adapters and hubs; try another cable and port", "Connect directly; clean the port; replace a damaged port"],
            ["Correct voltage, low current", "Device limit, heat throttling or battery nearly full", "Test from a low charge with the device cool", "Normal behavior; check the device's rated input"],
            ["Power drops when a second device is plugged in", "Multi-port charger splitting its budget", "Compare one-device and two-device readings", "Use one port for the laptop, or a larger charger"],
            ["Voltage sags well below the profile under load", "Cable or connector resistance", "Compare readings at the charger and device ends", "Shorter, thicker cable; inspect both plugs"],
            ["Charging stops and restarts", "Loose plug, damaged CC contact or overheating", "Wiggle test with the meter connected; feel for heat", "Replace the cable; repair the port; ventilate"],
            ["Charger hot, smells, or cuts out", "Charger fault or overload", "Visual check; try a known-good charger", "Stop using it and replace it"],
          ]}
        />
      </section>

      <section>
        <h2 id="pd-negotiation" className="text-xl font-semibold mb-3">How USB-C negotiates power</h2>
        <p className="text-muted leading-7 mb-4">
          A USB-C port starts conservatively. Once a device is detected on the configuration channel (CC)
          line, the charger supplies 5 V. If both ends support USB Power Delivery (PD), the charger then sends
          a list of the voltage and current combinations it offers, the device picks one, and only after the
          charger confirms does the voltage step up. The standard fixed levels are 5, 9, 15 and 20 V. The PD
          3.1 extended power range (EPR) adds 28, 36 and 48 V for chargers, cables and devices that all support
          it. Programmable Power Supply (PPS) lets a compatible device request voltage in small steps, which
          some phones use for their fastest modes.
        </p>
        <Figure
          caption={
            <>
              Power is only raised after the charger advertises its profiles and the device requests one. If
              either side lacks PD, or the device asks for less, the link stays at a lower level.
            </>
          }
        >
          <svg
            viewBox="0 0 300 150"
            className="w-full h-auto"
            role="img"
            aria-label="Sequence diagram of USB Power Delivery negotiation: the charger turns on 5 volts, offers 5, 9, 15 and 20 volt profiles, the device requests one, and the charger accepts and switches voltage"
          >
            <rect x="10" y="10" width="70" height="26" rx="4" className="stroke-foreground" strokeWidth="1.6" fill="none" />
            <rect x="220" y="10" width="70" height="26" rx="4" className="stroke-foreground" strokeWidth="1.6" fill="none" />
            <text x="45" y="27" fontSize="10" textAnchor="middle" className="fill-foreground">Charger</text>
            <text x="255" y="27" fontSize="10" textAnchor="middle" className="fill-foreground">Device</text>
            <g className="stroke-muted" strokeWidth="1" strokeDasharray="3 3">
              <line x1="45" y1="36" x2="45" y2="145" />
              <line x1="255" y1="36" x2="255" y2="145" />
            </g>
            <g className="stroke-accent" strokeWidth="1.5" fill="none">
              <line x1="45" y1="55" x2="250" y2="55" />
              <line x1="45" y1="80" x2="250" y2="80" />
              <line x1="255" y1="105" x2="50" y2="105" />
              <line x1="45" y1="130" x2="250" y2="130" />
            </g>
            <text x="150" y="50" fontSize="9" textAnchor="middle" className="fill-foreground">1. Device detected: 5 V on</text>
            <text x="150" y="75" fontSize="9" textAnchor="middle" className="fill-foreground">2. Offers: 5 / 9 / 15 / 20 V</text>
            <text x="150" y="100" fontSize="9" textAnchor="middle" className="fill-foreground">3. Request: one profile</text>
            <text x="150" y="125" fontSize="9" textAnchor="middle" className="fill-foreground">4. Accept, switch voltage</text>
          </svg>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Before PD, or with a device that doesn&apos;t speak it, USB-C falls back to its basic current levels:
          5 V at up to 1.5 A or 3 A, as advertised by the charger on the CC line. That is 5 V × 1.5 A = 7.5 W or
          5 V × 3 A = 15 W, which is why a laptop on a non-PD connection often charges at a crawl or not at all.
        </p>
      </section>

      <section>
        <h2 id="power-math" className="text-xl font-semibold mb-3">The power math: volts × amps</h2>
        <p className="text-muted leading-7 mb-4">
          Power is voltage times current, P = V × I, so the same 3 A limit gives very different wattages at
          each PD level. 9 V × 3 A = 27 W, 15 V × 3 A = 45 W and 20 V × 3 A = 60 W. The 100 W tier needs 20 V × 5 A,
          and only a cable that identifies itself as 5 A capable is allowed to carry it. The extended range
          tops out at 48 V × 5 A = 240 W. The chart shows the maximum each combination can deliver; real
          chargers advertise their own subset, often with slightly lower currents at the top voltage (a 65 W
          charger, for example, usually offers 20 V at 3.25 A, since 20 × 3.25 = 65).
        </p>
        <Figure caption={<>Maximum power at each standard USB PD voltage, from P = V × I. Labels show voltage and current.</>}>
          <BarChart
            items={[
              { label: "5 V × 3 A", value: 15, display: "15 W" },
              { label: "9 V × 3 A", value: 27, display: "27 W" },
              { label: "15 V × 3 A", value: 45, display: "45 W" },
              { label: "20 V × 3 A", value: 60, display: "60 W", highlight: true },
              { label: "20 V × 5 A", value: 100, display: "100 W" },
              { label: "48 V × 5 A (EPR)", value: 240, display: "240 W" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <h2 id="cable-limits" className="text-xl font-semibold mb-3">Cable ratings and e-markers</h2>
        <p className="text-muted leading-7 mb-4">
          The cable is a silent participant. A USB-C cable without an electronic marker chip is treated as a
          3 A cable, which caps it at 60 W on a 20 V profile. To go beyond 3 A, the charger reads the
          cable&apos;s e-marker to confirm it is rated for 5 A; if no marker answers, the charger holds back
          regardless of what it and the device could do. Extended-range power above 20 V needs cables rated for
          EPR as well.
        </p>
        <DataTable
          head={["Cable", "Current limit", "Max at 20 V", "Max with EPR"]}
          rows={[
            ["No e-marker", "3 A", "60 W", "Not supported"],
            ["E-marked 5 A", "5 A", "100 W", "Only if EPR-rated"],
            ["E-marked 240 W (EPR)", "5 A", "100 W", "240 W at 48 V"],
          ]}
          mono={[1, 2, 3]}
        />
        <p className="text-muted leading-7 mt-4">
          Resistance matters too. Current flows out on the power wire and back on ground, so the cable&apos;s
          round-trip resistance drops voltage in proportion to current: V = I × R. Take an illustrative cable
          with 0.2 Ω round trip carrying 3 A. It drops 3 × 0.2 = 0.6 V, so a 20 V charger delivers about 19.4 V at
          the device, and the cable itself turns I²R = 3² × 0.2 = 1.8 W into heat. At 5 V the same 0.6 V drop is a
          12% loss, which is why cheap, long cables hurt slow 5 V charging most. A charger or device that sees
          the sag may lower the current to stay within its limits.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="device-limits">Check the device&apos;s own limit</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Before buying anything, look up the device&apos;s maximum input in its manual or spec sheet. A phone
          rated for a modest input will never draw a laptop charger&apos;s full output, and that is correct
          behavior. A laptop that ships with a 65 W adapter will normally settle at 65 W or less on a 100 W
          charger. Note also whether the maker requires a particular PD profile: some laptops refuse to charge
          below a set wattage, and some phones only reach their fastest rate through PPS.
        </p>
        <p className="text-muted leading-7">
          Battery state and temperature come next. Charging power tapers as the battery approaches full, so
          test from a low charge level, ideally below 50%, with the device cool and not under heavy use. A busy
          laptop can consume most of the incoming power itself, leaving little to charge the battery even when
          the charger delivers its full rating. For a deeper look at laptop-specific faults, see{" "}
          <Link href="/multimeters/why-is-my-laptop-charger-not-charging-the-battery" className={link}>
            why a laptop charger isn&apos;t charging the battery
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inline-meter">Measure with an inline USB-C power meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An inline USB-C power meter plugs between the charger and the cable (or cable and device) and passes
          the negotiation through while displaying live voltage, current and watts. Some models, often sold as
          PD testers, also show the profiles the charger advertised and which one was selected, and a few can
          act as a device themselves to request each profile in turn. Check the meter&apos;s own current rating
          before trusting it on a 5 A link, and remember that it adds two more connections to the path.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <Figure caption={<>Illustrative reading: the 20 V profile is active, so PD negotiation worked.</>}>
            <MeterReadout value="20.04" unit="V" mode="USB-C inline: VBUS" />
          </Figure>
          <Figure caption={<>Illustrative reading: current pinned just under 3 A points to a cable without a 5 A e-marker.</>}>
            <MeterReadout value="2.96" unit="A" mode="USB-C inline: current" />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Read the result against the power math. 20.04 V × 2.96 A ≈ 59.3 W: the charger and device agreed on 20 V,
          but the current stopped at the 3 A cable ceiling. If you saw 5 V instead, negotiation never happened.
          If you saw 20 V with 1.5 A, the device is asking for only about 30 W, which is a device or battery-state
          limit rather than a charger fault.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="sharing-and-heat">Rule out port sharing and heat</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Multi-port chargers share one total budget. Plugging in a second device often makes the charger
          renegotiate and lower what each port offers, and the split differs between models. A charger labeled
          100 W total might give a single port the full 100 W but drop it to something like 65 W plus 30 W when two
          devices are attached; the label or manual lists the real split for your model. Measure with only the
          device under test connected, then add the second device and watch the inline meter change.
        </p>
        <p className="text-muted leading-7">
          Chargers and devices both reduce power when warm. A charger under a pillow, in a closed drawer or in
          direct sun, or a phone in a thick case while gaming, may throttle to protect itself. Move the charger
          into open air, let both ends cool, and repeat the measurement. If full power returns when cool, the
          fix is ventilation, not a new charger.
        </p>
      </section>

      <section>
        <h2 id="why-multimeter-shows-5v" className="text-xl font-semibold mb-3">Why a multimeter shows 5 V or nothing</h2>
        <p className="text-muted leading-7">
          Probing a USB-C charger&apos;s port directly tells you very little. A compliant USB-C source keeps
          its power pins off until it detects a device through the CC pins, so an empty port often reads 0 V.
          Through a simple breakout board or adapter that presents itself as a device, you will typically see
          5 V, because a meter cannot request a PD profile. Neither reading proves the charger can or can&apos;t
          deliver 20 V. A multimeter is still handy for continuity checks on a cable or a repaired connector,
          and our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          covers series current measurement on low-voltage circuits you build yourself.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="swap-and-inspect">Swap parts and inspect the port</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Swap one thing at a time: a cable known to be rated for the power you expect, then a different
          charger, then a different device. Whichever change restores full power identifies the weak link. If
          only one device is affected with every charger and cable, inspect its port with a flashlight. Lint
          packed at the bottom stops the plug seating fully, and bent or burnt contacts cause intermittent
          negotiation. Power the device off and remove lint with a wooden or plastic pick, never a metal pin.
        </p>
        <p className="text-muted leading-7 mb-4">
          On a bench, a multimeter&apos;s continuity mode can confirm a suspect cable end to end through a pair
          of USB-C breakout boards: VBUS to VBUS, ground to ground, and CC through to CC. An open CC conductor
          is a classic cause of a cable that charges slowly but never fast. A cable that fails any of these
          checks belongs in the bin.
        </p>
        <Figure caption={<>Charger, cable and device each set a ceiling; the delivered power is the lowest one. Illustrative values.</>}>
          <WeakestLinkDiagram />
        </Figure>
      </section>

      <KeyIdea title="The lowest limit wins">
        Delivered power is the smallest of four numbers: what the charger offers on that port, what the cable
        is rated to carry, what the device asks for, and what heat and battery state allow at that moment.
        Change one at a time and measure, and the culprit identifies itself. When the port itself is loose,
        scorched or broken, see{" "}
        <Link href="/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board" className={link}>
          how to solder a replacement USB connector onto a circuit board
        </Link>{" "}
        and the tools in{" "}
        <Link href="/soldering-irons/soldering-iron-for-usb-port-repair" className={link}>
          soldering irons for USB port repair
        </Link>
        .
      </KeyIdea>

      <section>
        <h2 id="meters" className="text-xl font-semibold mb-3">Meters for the bench side</h2>
        <p className="text-muted leading-7 mb-4">
          An inline USB-C meter answers the negotiation question. A general-purpose multimeter covers
          everything around it: continuity through a cable, the 5 V rail on a repaired board, and series
          current on circuits you build. These picks come from our verified multimeter list.
        </p>
        <ProductStrip
          title="Multimeters for cable and port checks"
          items={[
            {
              name: "KAIWEETS KM200s",
              image: kaiweets.image,
              alt: "KAIWEETS KM200s True RMS digital multimeter",
              href: "/multimeters/kaiweets-km200s-review",
              note: "True RMS and auto-ranging with NCV and a backlit display. CAT II 600V, so it suits home and bench work.",
            },
            {
              name: "AstroAI DM6000AR",
              image: astroai.image,
              alt: "AstroAI DM6000AR digital multimeter",
              href: "/multimeters/astroai-dm6000ar-review",
              note: "True RMS, 6,000-count, with auto and manual ranging. AstroAI states no CAT rating, so keep it to low-voltage electronics.",
            },
            {
              name: "UNI-T UT139C",
              image: ut139c.image,
              alt: "UNI-T UT139C True RMS digital multimeter",
              href: "/multimeters/uni-t-ut139c-review",
              note: "True RMS, 6,000-count, auto and manual ranging with NCV, rated CAT III 600V.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
