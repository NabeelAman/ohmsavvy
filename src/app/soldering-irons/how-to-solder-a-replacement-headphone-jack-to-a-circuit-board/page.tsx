import Link from "next/link";
import {
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
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder a replacement headphone jack to a circuit board: identify TRS and TRRS pins, match the footprint, swap the jack and test each contact.";

export const metadata = buildMetadata({
  title: "How to Solder a Replacement Headphone Jack",
  description,
  path: "/soldering-irons/how-to-solder-a-replacement-headphone-jack-to-a-circuit-board",
});

const weller = picks.find((p) => p.name === "Weller WE1010NA")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const yihua = picks.find((p) => p.name === "YIHUA 862BD+")!;

const link = "text-accent hover:underline";

/** A 3.5 mm TRRS plug with each contact labeled, CTIA wiring shown underneath. */
function TrrsPlugDiagram() {
  const segs = [
    { x: 40, w: 46, label: "Tip", sig: "Left" },
    { x: 92, w: 40, label: "Ring 1", sig: "Right" },
    { x: 138, w: 40, label: "Ring 2", sig: "Ground*" },
    { x: 184, w: 56, label: "Sleeve", sig: "Mic*" },
  ];
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a 3.5 mm TRRS headphone plug showing the tip, ring 1, ring 2 and sleeve contacts separated by insulating bands, with left, right, ground and microphone signals labeled for the CTIA standard"
    >
      {/* plug body */}
      <path d="M40 60 Q24 72 40 84 Z" className="fill-muted stroke-foreground" strokeWidth="1" />
      {segs.map((s) => (
        <rect key={s.label} x={s.x} y="60" width={s.w} height="24" className="fill-muted stroke-foreground" strokeWidth="1" />
      ))}
      {/* insulating bands */}
      {[86, 132, 178].map((x) => (
        <rect key={x} x={x} y="60" width="6" height="24" className="fill-foreground" />
      ))}
      {/* handle */}
      <rect x="240" y="50" width="62" height="44" rx="6" className="fill-surface stroke-border" strokeWidth="1.5" />
      <text x="271" y="76" fontSize="9" textAnchor="middle" className="fill-muted">handle</text>
      {segs.map((s) => (
        <g key={`l-${s.label}`}>
          <line x1={s.x + s.w / 2} y1="86" x2={s.x + s.w / 2} y2="104" className="stroke-border" strokeWidth="1" />
          <text x={s.x + s.w / 2} y="117" fontSize="10" textAnchor="middle" className="fill-foreground">{s.label}</text>
          <text x={s.x + s.w / 2} y="131" fontSize="9" textAnchor="middle" className="fill-accent">{s.sig}</text>
        </g>
      ))}
      <text x="20" y="30" fontSize="10" className="fill-foreground">3.5 mm TRRS plug (CTIA wiring)</text>
      <text x="20" y="44" fontSize="9" className="fill-muted">insulating bands separate each contact</text>
      <text x="20" y="156" fontSize="9" className="fill-muted">* OMTP swaps ground and mic. A TRS plug has no ring 2.</text>
    </svg>
  );
}

export default function HowToSolderAReplacementHeadphoneJackToACircuitBoardPage() {
  return (
    <HowToShell
      title="How to Solder a Replacement Headphone Jack to a Circuit Board"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-solder-a-replacement-headphone-jack-to-a-circuit-board"
      category="soldering-irons"
      intro={
        <>
          To solder a replacement headphone jack to a circuit board, map which pin is tip, ring, sleeve and
          switch, buy a jack with the same footprint, then desolder the old one, clear its holes, seat the new
          jack flat and solder the large anchor tabs before the signal pins. Finish by checking each contact
          for continuity with a plug inserted and confirming no two pins are shorted. Work unpowered, on an
          ESD-safe surface, with short, controlled heat on the plastic body.
        </>
      }
      aside={{
        image: weller.image,
        alt: "Weller WE1010NA ESD-safe digital soldering station",
        caption: (
          <>
            Audio boards often carry static-sensitive codec chips. The Weller WE1010NA is an 85W digital
            station with an ESD-safe design. See our{" "}
            <Link href="/soldering-irons/weller-we1010na-review" className={link}>
              WE1010NA review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "identify-the-pins", label: "Identify TRS and TRRS pins" },
        { id: "match-the-footprint", label: "Match the replacement footprint" },
        { id: "remove-the-old-jack", label: "Desolder the old jack" },
        { id: "clean-the-holes", label: "Clean the holes and pads" },
        { id: "fit-and-solder", label: "Fit and solder the new jack" },
        { id: "inspect-the-joints", label: "Inspect the joints" },
        { id: "test-continuity", label: "Test continuity per contact" },
        { id: "tools", label: "Irons for jack replacement" },
      ]}
      faq={[
        {
          q: "How do I know if my headphone jack is TRS or TRRS?",
          a: "Count the contacts on the jack or the plug it was designed for. A TRS jack has three signal contacts, tip, ring and sleeve, for stereo audio. A TRRS jack has four, adding a second ring for a microphone, which is common on phones, laptops and headsets. Extra pins beyond these are usually detect switches.",
        },
        {
          q: "What are the extra pins on a headphone jack?",
          a: "Usually switch contacts. Many jacks include a spring that touches a fixed pin when no plug is inserted and lifts away when one is. The device reads this to mute its speaker or to detect headphones. If you leave a switch pin unsoldered or wire it wrongly, audio may stay on the speaker or never reach the headphones.",
        },
        {
          q: "Can I replace a headphone jack with a different model?",
          a: "Yes, if it matches electrically and physically: the same contact count and switch arrangement, the same pin spacing, and the same height and opening position so the plug lines up with the case. A jack that sits a millimeter too high can stop the case closing.",
        },
        {
          q: "Why do I only hear audio in one ear after replacing the jack?",
          a: "Typically a tip or ring pin is unsoldered, cracked or bridged to ground, or the plug is not fully seating. Check continuity from each plug segment to its pin with the plug inserted. Also confirm the jack is the right type: a TRRS device fed a TRS plug, or the reverse, can lose a channel or ground.",
        },
        {
          q: "Is it worth replacing a headphone jack or using Bluetooth instead?",
          a: "If the board is otherwise healthy, a jack swap is a modest repair with an inexpensive part that keeps wired audio working. It is less practical when the jack sits on a tiny flex assembly or fragile pads, where a USB or Bluetooth adapter may be the more sensible fix.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-prevent-solder-bridges",
          title: "How to Prevent Solder Bridges on Fine-Pitch Pins",
          desc: "Closely spaced jack pins bridge easily; here is how to stop and clear them.",
        },
        {
          href: "/soldering-irons/how-to-remove-solder-from-circuit-board",
          title: "How to Remove Solder from a Circuit Board",
          desc: "Wick, pumps and hot air for getting the old jack off cleanly.",
        },
      ]}
    >
      <Callout title="Power off, battery out, and guard against static">
        <ul className="space-y-2 list-disc pl-5">
          <li>Unplug the device and disconnect the battery. Never cut or puncture a lithium cell to reach the board.</li>
          <li>Wear a grounded wrist strap or work on an ESD mat: the audio codec next to the jack can be static sensitive.</li>
          <li>Ventilate the bench, park the iron in its stand, and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <StepHeading n={1} id="identify-the-pins">Identify the TRS and TRRS pins on the jack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          A 3.5 mm plug carries signals on separate metal bands. TRS plugs have three (tip, ring, sleeve) for
          stereo; TRRS plugs add a second ring for a microphone. On the board, the jack usually has one pin per
          contact plus one or more switch pins that change state when a plug goes in.
        </p>
        <p className="text-muted leading-7 mb-4">
          Check that the fault really is the jack first: if sound cuts out when you flex the headphone cable
          rather than the plug, the break is in the lead, and{" "}
          <Link href="/soldering-irons/how-to-solder-a-broken-headphone-wire-with-a-soldering-iron" className={link}>
            how to solder a broken headphone wire
          </Link>{" "}
          is the repair you need.
        </p>
        <Figure
          caption={
            <>
              The four contacts of a TRRS plug. Most phones and laptops sold today follow CTIA, with ground on
              ring 2; older OMTP devices put the microphone there instead.
            </>
          }
        >
          <TrrsPlugDiagram />
        </Figure>
        <DataTable
          head={["Contact", "TRS (stereo)", "TRRS, CTIA", "TRRS, OMTP"]}
          rows={[
            ["Tip", "Left", "Left", "Left"],
            ["Ring 1", "Right", "Right", "Right"],
            ["Ring 2", "(not present)", "Ground", "Microphone"],
            ["Sleeve", "Ground", "Microphone", "Ground"],
            ["Switch pins", "Plug detect, speaker mute", "Plug detect", "Plug detect"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Before removing anything, insert a plug, set a multimeter to continuity, and find which pin beeps to
          each plug band. Sketch the map next to a photo of the board; it shows how this board is really wired.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="match-the-footprint">Match the replacement footprint</StepHeading>
        <p className="text-muted leading-7">
          Generic jacks look alike but differ in detail. Compare pin count and spacing, through-hole versus
          surface-mount legs, locating pegs, body height, where the opening sits relative to the board edge, and
          whether the switch contacts are normally closed. A peg or height mismatch often shows only when the case
          will not close, so measure now.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="remove-the-old-jack">Desolder the old jack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          The old jack is scrap, which makes it easier to remove. Its large metal anchor tabs often join a ground
          pour and soak up heat, so add fresh solder and flux to every joint first. On a through-hole jack, you can
          snip the plastic body away with flush cutters and lift each pin out separately. A surface-mount jack
          comes off best with hot air, keeping nearby plastic connectors shielded with heat-resistant tape.
        </p>
        <Figure caption={<>The full swap in order. Mapping the pins before removal saves guesswork later.</>}>
          <FlowDiagram
            steps={[
              { label: "Map pins", sub: "Continuity with a plug in" },
              { label: "Remove jack", sub: "Flux, fresh solder, lift" },
              { label: "Clean holes", sub: "Wick, then check by light" },
              { label: "Fit + tack", sub: "Anchor tabs first" },
              { label: "Test", sub: "Each contact, no shorts" },
            ]}
          />
        </Figure>
      </section>

      <section>
        <StepHeading n={4} id="clean-the-holes">Clean the holes and pads</StepHeading>
        <p className="text-muted leading-7">
          Clear every hole so the new pins drop in without force. Wick both faces with fresh, fluxed braid, then
          hold the board to a light to confirm each hole is open. The general methods are covered in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-circuit-board" className={link}>
            how to remove solder from a circuit board
          </Link>
          . Wipe off flux with isopropyl alcohol and check for torn traces near the anchor tabs.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="fit-and-solder">Fit and solder the new jack</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Push the jack fully home so its pegs and body sit flat. Solder one anchor tab first and check from
          the side that the jack has not tilted; reheat that one tab to adjust if it has. Then solder the other
          anchor tabs, which carry most of the plug-insertion force and need the most heat. Do the signal pins
          last with a smaller tip and a short dwell, typically two to three seconds each, so the plastic around
          the contact springs does not soften and let them shift.
        </p>
        <KeyIdea title="Why anchor tabs come first">
          Every plug insertion pushes on the jack. Soldered mounting tabs take that load; signal pins are thin and
          crack if they become the only thing holding the jack down.
        </KeyIdea>
      </section>

      <section>
        <h2 id="inspect-the-joints" className="text-xl font-semibold mb-3">Inspect the headphone jack joints</h2>
        <p className="text-muted leading-7">
          Under magnification, every joint should be smooth and concave, wetting both pin and pad. Look hardest
          between neighboring signal pins, where a thin bridge is easy to miss. If you find one, fresh flux and a
          clean tip drawn away from the gap usually clear it; our guide to{" "}
          <Link href="/soldering-irons/how-to-prevent-solder-bridges" className={link}>
            preventing solder bridges
          </Link>{" "}
          has more.
        </p>
      </section>

      <section>
        <h2 id="test-continuity" className="text-xl font-semibold mb-3">Test continuity for each contact</h2>
        <p className="text-muted leading-7 mb-4">
          With the board still unpowered, insert a plug and repeat your earlier map: each plug band should beep
          to its pin and read close to zero ohms. Then check the opposite case. Tip to ring, tip to ground and
          ring to ground should all read open. Pull the plug and confirm the switch pins change state. Our{" "}
          <Link href="/multimeters/how-to-use-a-multimeter" className={link}>
            multimeter guide
          </Link>{" "}
          explains continuity and resistance modes if you need a refresher.
        </p>
        <Figure caption={<>Typical results with a plug inserted: a fraction of an ohm from a plug band to its own pin (left), and over range between two different contacts (right).</>}>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <MeterReadout value="0.3" unit="Ω" mode="tip band to tip pin" />
            <MeterReadout value="OL" unit="Ω" mode="tip pin to ground pin" />
          </div>
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Only then reconnect the battery and try headphones at a low volume, checking both channels, the
          microphone if fitted, and that the speaker mutes when the plug goes in.
        </p>
      </section>

      <section>
        <h2 id="tools" className="text-xl font-semibold mb-3">Soldering irons for headphone jack replacement</h2>
        <p className="text-muted leading-7 mb-6">
          A temperature-controlled iron with a small chisel tip suits both anchor tabs and signal pins; see{" "}
          <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
            tip types
          </Link>{" "}
          for sizes. Surface-mount jacks are easier with hot air.
        </p>
        <ProductStrip
          title="Options from our soldering reviews"
          items={[
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W digital station (70W iron) with ESD-safe construction for sensitive boards.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered with an OLED display. Compact for small repairs.",
            },
            {
              name: "YIHUA 862BD+",
              image: yihua.image,
              alt: "YIHUA 862BD+ soldering and hot air rework station",
              href: "/soldering-irons/yihua-862bd-plus-review",
              note: "Soldering iron and hot air gun in one station, for surface-mount jacks.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
