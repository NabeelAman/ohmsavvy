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
import { picks } from "../best-multimeters/page";

const description =
  "USB-C charger not delivering full power? How Power Delivery negotiation, cable ratings, device limits and heat cap charging, and how to test what you get.";

export const metadata = buildMetadata({
  title: "USB-C Charger Not Delivering Full Power",
  description,
  path: "/multimeters/usb-c-charger-not-delivering-full-power",
});

const kaiweets = picks.find((p) => p.name === "KAIWEETS KM200s")!;

const link = "text-accent hover:underline";

export default function UsbCChargerNotDeliveringFullPowerPage() {
  return (
    <HowToShell
      title="Why Is My USB-C Charger Not Delivering Full Power? Testing and Diagnosis"
      description={description}
      path="/multimeters/usb-c-charger-not-delivering-full-power"
      category="multimeters"
      published="2026-10-24"
      intro={
        <>
          A USB-C charger&apos;s wattage label is a ceiling, not a promise. The power that actually flows
          is agreed between the charger, the cable and the device each time you plug in, and the lowest
          limit in that chain wins. So when a USB-C charger is not delivering full power, the charger is
          often working exactly as designed: the cable, the device, another port or heat is setting the
          limit. Finding out which one takes a cable swap and a USB-C power meter rather than a multimeter
          on the bare port.
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
        { id: "pd-negotiation", label: "How USB-C negotiates power" },
        { id: "cable-limits", label: "Cable ratings and e-markers" },
        { id: "device-and-charger-limits", label: "Device, port-sharing and heat limits" },
        { id: "why-multimeter-shows-5v", label: "Why a multimeter shows 5 V or nothing" },
        { id: "inline-meter", label: "Measure with an inline USB-C meter" },
        { id: "swap-and-inspect", label: "Swap the cable and inspect the port" },
      ]}
      faq={[
        {
          q: "Why does my laptop say it's charging slowly with a phone charger?",
          a: "The laptop asks for a voltage and current the phone charger may not offer. If the charger's highest profile is below what the laptop wants, the laptop either charges slowly, holds its level while in use, or refuses to charge, depending on how its maker designed it. The charger is fine; it is simply smaller than the laptop needs.",
        },
        {
          q: "Can a USB-C cable reduce charging speed even if it fits?",
          a: "Yes. Every USB-C cable has the same plug, but cables without an electronic marker are limited to 3 A, and very thin or long cables can lose voltage along the way. Some cables are built only for charging at modest power. A charger may also step back if it sees an unexpected voltage drop.",
        },
        {
          q: "Does a 100 W charger damage a phone that only needs 20 W?",
          a: "No. A Power Delivery charger only supplies the voltage and current the phone requests, so a larger charger simply has spare capacity. The device stays in charge of what it draws.",
        },
        {
          q: "Why does charging speed drop when the battery is nearly full?",
          a: "Lithium-ion charging deliberately tapers. Once the battery approaches full, the device switches from a high constant current to a constant voltage and lets the current fall away. A power meter showing a few watts near 100% is normal behaviour, not a charger fault.",
        },
        {
          q: "Can lint in the port really stop fast charging?",
          a: "It can. Packed lint can stop the plug seating fully, so some contacts touch poorly or not at all. Poor contact on the configuration pins can disrupt negotiation and leave the device on basic 5 V charging, and high resistance on the power pins can cause heating. Clean it gently with a non-metallic tool and the device switched off.",
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
      <section>
        <h2 id="pd-negotiation" className="text-xl font-semibold mb-3">How USB-C negotiates power</h2>
        <p className="text-muted leading-7 mb-4">
          A USB-C port starts conservatively. Once a device is detected on the configuration channel (CC)
          line, the charger supplies 5 V. If both ends support USB Power Delivery (PD), the charger then
          sends a list of the voltage and current combinations it offers, the device picks one, and only
          after the charger confirms does the voltage step up. The standard fixed levels are 5, 9, 15 and
          20 V, and newer extended-range chargers can add higher ones. Programmable Power Supply (PPS) lets a
          compatible device request voltage in small steps, which some phones use for their fastest modes.
        </p>
        <Figure
          caption={
            <>
              Power is only raised after the charger advertises its profiles and the device requests one.
              If either side lacks PD, or the device asks for less, the link stays at a lower level.
            </>
          }
        >
          <svg viewBox="0 0 300 150" className="w-full h-auto" role="img" aria-label="Sequence diagram of USB Power Delivery negotiation between a charger and a device">
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
      </section>

      <section>
        <h2 id="cable-limits" className="text-xl font-semibold mb-3">Cable ratings and e-markers</h2>
        <p className="text-muted leading-7 mb-4">
          The cable is a silent participant. A USB-C cable without an electronic marker chip is treated as a
          3 A cable, which caps it at 60 W on a 20 V profile. To go beyond 3 A, the charger reads the
          cable&apos;s e-marker to confirm it is rated for 5 A; if no marker answers, the charger holds back
          regardless of what it and the device could do. Higher extended-range power levels need cables
          rated for them too.
        </p>
        <DataTable
          head={["Cable", "Current limit", "Max at 20 V"]}
          rows={[
            ["No e-marker", "3 A", "60 W"],
            ["E-marked 5 A", "5 A", "100 W"],
            ["E-marked extended range", "5 A", "Higher voltages, per its rating"],
          ]}
          mono={[1, 2]}
        />
        <p className="text-muted leading-7 mt-4">
          Damaged, very long or low-quality cables add a further problem: resistance in the conductors drops
          voltage under load, and a charger or device that notices may lower the current to stay safe.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="device-and-charger-limits">Rule out device, port-sharing and heat limits</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Check the device&apos;s own maximum input in its manual or spec sheet. A phone rated for a modest
          input will never draw a laptop charger&apos;s full output, and that is correct behaviour. Then
          consider the charger:
        </p>
        <ul className="text-muted leading-7 list-disc pl-5 space-y-2">
          <li>
            Multi-port chargers share one total budget. Plugging in a second device often makes the charger
            renegotiate and lower what each port offers, and the split differs between models; the label or
            manual usually lists it.
          </li>
          <li>
            Chargers and devices both reduce power when warm. A charger under a pillow or in direct sun, or a
            phone in a thick case while gaming, may throttle to protect itself.
          </li>
          <li>
            Battery state matters. Charging power tapers as the battery approaches full, so test from a lower
            charge level.
          </li>
        </ul>
      </section>

      <section>
        <h2 id="why-multimeter-shows-5v" className="text-xl font-semibold mb-3">Why a multimeter shows 5 V or nothing</h2>
        <p className="text-muted leading-7">
          Probing a USB-C charger&apos;s port directly tells you very little. A compliant USB-C source keeps
          its power pins off until it detects a device through the CC pins, so an empty port often reads 0
          V. Through a simple breakout board or adapter that presents itself as a device, you will typically
          see 5 V, because a meter cannot request a PD profile. Neither reading proves the charger can or
          can&apos;t deliver 20 V. A multimeter is still handy for continuity checks on a cable or a
          repaired connector, and our guide to{" "}
          <Link href="/multimeters/how-to-measure-milliamps-with-a-multimeter" className={link}>
            measuring milliamps with a multimeter
          </Link>{" "}
          covers series current measurement on low-voltage circuits you build yourself.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="inline-meter">Measure with an inline USB-C power meter</StepHeading>
        <p className="text-muted leading-7 mb-4">
          An inline USB-C power meter plugs between the charger and the cable (or cable and device) and
          passes the negotiation through while displaying live voltage, current and watts. Some models, often
          sold as PD testers, also show the profiles the charger advertised and which one was selected, and a
          few can act as a device themselves to request each profile. Check the meter&apos;s own current
          rating before trusting it on a 5 A link.
        </p>
        <DataTable
          head={["Meter shows", "Points to"]}
          rows={[
            ["5 V only, with a PD-capable device", "No PD negotiation: cable, port contact or an adapter in the path"],
            ["20 V but current stuck near 3 A", "Cable without a 5 A e-marker"],
            ["Correct voltage, low current", "Device limit, heat throttling or battery nearly full"],
            ["Power falls when another port is used", "Charger splitting its total budget"],
            ["Voltage sags well below the profile under load", "Cable or connector resistance"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For a device&apos;s idle consumption rather than charging power, see{" "}
          <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={link}>
            measuring standby current in an electronic device
          </Link>
          .
        </p>
      </section>

      <section>
        <StepHeading n={3} id="swap-and-inspect">Swap the cable and inspect the port</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Swap one thing at a time: a cable known to be rated for the power you expect, then a different
          charger, then a different device. Whichever change restores full power identifies the weak link.
          If only one device is affected with every charger and cable, inspect its port with a light. Lint
          packed at the bottom stops the plug seating fully, and bent or burnt contacts cause intermittent
          negotiation.
        </p>
        <KeyIdea title="When the port itself is damaged">
          A loose, scorched or physically broken port won&apos;t recover with cleaning. On many devices the
          connector is soldered to a board and can be replaced; see{" "}
          <Link href="/soldering-irons/how-to-solder-a-replacement-usb-connector-onto-a-circuit-board" className={link}>
            how to solder a replacement USB connector onto a circuit board
          </Link>
          .
        </KeyIdea>
      </section>

      <Callout title="Stop using damaged chargers and cables">
        A charger, cable or port that is discoloured, smells of burning, or gets hot to the touch should be
        taken out of use rather than tested further. Heat at a connector means resistance and wasted power
        concentrated in a small spot.
      </Callout>
    </HowToShell>
  );
}
