import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  InfoCards,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to remove solder from a small PCB via: opening tented vias, flux and fine wick, heating from the far side, a stainless needle, and when to leave it filled.";

export const metadata = buildMetadata({
  title: "How to Remove Solder from a Small PCB Via",
  description,
  path: "/soldering-irons/how-to-remove-solder-from-a-small-pcb-via",
});

const hakko = picks.find((p) => p.name === "Hakko FX888D")!;
const pinecil = picks.find((p) => p.name === "Pinecil V2")!;

const link = "text-accent hover:underline";

/** Cross-section of a solder-filled via: iron on the bottom ring, needle entering from the top. */
function ViaClearingDiagram() {
  return (
    <svg
      viewBox="0 0 340 210"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of a small plated via filled with solder, solder mask covering the board either side, an iron tip touching the bottom annular ring and a fine stainless needle entering the via from the top to push through the molten solder"
    >
      {/* board */}
      <rect x="20" y="90" width="130" height="30" className="fill-muted/30 stroke-border" strokeWidth="1" />
      <rect x="190" y="90" width="130" height="30" className="fill-muted/30 stroke-border" strokeWidth="1" />
      {/* inner layer hint */}
      <line x1="20" y1="105" x2="150" y2="105" className="stroke-accent" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="190" y1="105" x2="320" y2="105" className="stroke-accent" strokeWidth="1" strokeDasharray="4 3" />
      {/* rings and barrel */}
      <rect x="132" y="86" width="18" height="4" className="fill-accent" />
      <rect x="190" y="86" width="18" height="4" className="fill-accent" />
      <rect x="132" y="120" width="18" height="4" className="fill-accent" />
      <rect x="190" y="120" width="18" height="4" className="fill-accent" />
      <rect x="148" y="90" width="2" height="30" className="fill-accent" />
      <rect x="190" y="90" width="2" height="30" className="fill-accent" />
      {/* solder plug */}
      <rect x="150" y="88" width="40" height="34" className="fill-accent/40" />
      {/* solder mask */}
      <rect x="20" y="84" width="112" height="3" className="fill-foreground/40" />
      <rect x="208" y="84" width="112" height="3" className="fill-foreground/40" />
      {/* needle */}
      <path d="M170 20 L170 84 L168 92 L172 92 Z" className="fill-muted stroke-foreground" strokeWidth="1" />
      <text x="180" y="40" fontSize="9" className="fill-foreground">stainless needle</text>
      {/* iron tip from below */}
      <path d="M150 128 L190 128 L220 190 L180 190 Z" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="228" y="172" fontSize="9" className="fill-foreground">tip on far-side ring</text>
      <text x="24" y="78" fontSize="9" className="fill-muted">solder mask (tenting)</text>
      <text x="24" y="140" fontSize="9" className="fill-muted">inner plane</text>
      <text x="230" y="140" fontSize="9" className="fill-muted">barrel</text>
      <line x1="228" y1="137" x2="194" y2="112" className="stroke-foreground" strokeWidth="0.8" />
      <text x="88" y="200" fontSize="9" className="fill-muted">hole often 0.2-0.4 mm</text>
    </svg>
  );
}

export default function HowToRemoveSolderFromASmallPcbViaPage() {
  return (
    <HowToShell
      title="How to Remove Solder from a Small PCB Via"
      description={description}
      published="2026-10-22"
      path="/soldering-irons/how-to-remove-solder-from-a-small-pcb-via"
      category="soldering-irons"
      intro={
        <>
          To remove solder from a small PCB via, flux it and draw the surface solder off with fine wick, then
          heat the via from the opposite side and push a stainless steel needle through the molten plug to
          reopen the hole. Vias are far smaller than component holes, so a solder sucker rarely clears one.
          Keep each heat cycle short to protect the thin plated barrel, and if you only need to solder a wire
          to the via, consider leaving it filled.
        </>
      }
      aside={{
        image: hakko.image,
        alt: "Hakko FX888D soldering station handpiece",
        caption: (
          <>
            Vias tied into ground planes soak up heat. The Hakko FX888D is a 70W digital station noted for
            thermal recovery under load. See our{" "}
            <Link href="/soldering-irons/hakko-fx888d-review" className={link}>
              Hakko FX888D review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "vias-vs-component-holes", label: "Vias vs component holes" },
        { id: "why-clear-a-via", label: "Why you might clear a via" },
        { id: "open-a-tented-via", label: "Open a tented via" },
        { id: "flux-and-wick", label: "Flux and fine wick" },
        { id: "heat-the-far-side", label: "Heat from the far side" },
        { id: "use-a-fine-needle", label: "Push a fine needle through" },
        { id: "solder-sucker-limits", label: "Solder sucker limits" },
        { id: "protect-the-barrel", label: "Don't overheat the barrel" },
        { id: "leave-it-filled", label: "When to leave a via filled" },
      ]}
      faq={[
        {
          q: "Can I use a solder sucker on a via?",
          a: "Sometimes, but it is the least reliable method. A typical via holds very little solder and its hole is smaller than the pump nozzle, so the suction mostly pulls air from around the tip. Adding fresh solder and pumping from the opposite side to the iron occasionally works on larger vias. Wick and a needle are usually more effective.",
        },
        {
          q: "Is it safe to drill out a blocked via?",
          a: "Generally no. The hole is lined with a thin layer of plated copper that connects the layers, and a drill bit removes it, breaking the connection. On a multilayer board it can also cut an inner trace. If the via is filled with factory epoxy or copper rather than solder, leave it and solder to the surface ring instead.",
        },
        {
          q: "What needle size clears a PCB via?",
          a: "Choose stainless steel thinner than the finished hole, which for many vias means well under 0.3 mm. Fine stainless wire or a very thin sewing or acupuncture-type needle can work; hollow desoldering needles are mostly sized for component holes. Stainless matters because solder does not wet it, so it slides out once the solder cools.",
        },
        {
          q: "How do I know if I damaged a via?",
          a: "Measure continuity from the top ring to the bottom ring, or between the traces it joins. A healthy via reads near zero ohms. An open reading means the barrel has cracked or separated, which can happen after repeated heating or forcing a needle. The usual fix is a fine wire passed through the via and soldered at both ends.",
        },
        {
          q: "Why is solder in a via so hard to remove?",
          a: "Surface tension holds molten solder firmly in a narrow hole, and the via's connection to copper pours or planes pulls heat away, so the plug may not melt all the way through. Fresh solder and flux help heat travel down the barrel, and heating from the far side while working from the near side gives the best chance.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-remove-solder-from-a-plated-through-hole",
          title: "How to Remove Solder from a Plated Through Hole",
          desc: "Clearing larger component holes with a pump, wick and needle.",
        },
        {
          href: "/soldering-irons/how-to-repair-a-pcb-trace-using-solder-and-jumper-wire",
          title: "Repair a PCB Trace With Solder and Jumper Wire",
          desc: "Using a via or pad as a landing point for a jumper wire.",
        },
      ]}
    >
      <Callout title="Heat, fumes and sharp points">
        <ul className="space-y-2 list-disc pl-5">
          <li>Work on an unpowered board, with batteries removed and capacitors discharged.</li>
          <li>Needles and wire ends puncture skin easily; hold them in pliers or tweezers, not fingers.</li>
          <li>Ventilate flux fumes, park the iron between attempts and wash your hands after handling leaded solder.</li>
        </ul>
      </Callout>

      <section>
        <h2 id="vias-vs-component-holes" className="text-xl font-semibold mb-3">PCB vias vs component holes</h2>
        <p className="text-muted leading-7 mb-4">
          A via is a small plated hole that carries a signal or power connection from one copper layer to
          another. It is not meant to take a lead, so it is drilled much smaller than a component hole and has
          only a narrow copper ring around it. Many vias are tented, covered with solder mask, so solder never
          reaches them in normal assembly; others are left open and fill up during soldering or rework.
        </p>
        <Figure caption={<>Typical finished hole sizes, in mm. Vias are a fraction of a component hole, which is why tools sized for leads struggle.</>}>
          <BarChart
            items={[
              { label: "Small via", value: 0.2, display: "≈ 0.2 mm" },
              { label: "Common via", value: 0.3, display: "≈ 0.3 mm", highlight: true },
              { label: "Larger via", value: 0.4, display: "≈ 0.4 mm" },
              { label: "30 AWG wire (for scale)", value: 0.25, display: "0.25 mm" },
              { label: "Small component hole", value: 0.8, display: "≈ 0.8 mm" },
              { label: "Header pin hole", value: 1.0, display: "≈ 1.0 mm" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          For holes that held a component lead, the methods in{" "}
          <Link href="/soldering-irons/how-to-remove-solder-from-a-plated-through-hole" className={link}>
            how to remove solder from a plated through hole
          </Link>{" "}
          apply. A blob on a connector pin is another job again, covered in{" "}
          <Link href="/soldering-irons/how-to-remove-excess-solder-from-a-small-connector-pin" className={link}>
            removing excess solder from a small connector pin
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="why-clear-a-via" className="text-xl font-semibold mb-3">Why you might want to clear a via</h2>
        <InfoCards
          items={[
            { label: "Jumper wire", desc: "A fine wire passed through a via makes a neat, strong link between layers or to a repair." },
            { label: "Modifications", desc: "Vias are handy access points to a signal for a mod, a test lead or a bodge." },
            { label: "Rework spill", desc: "Solder flowed into nearby vias during rework and you want the board back as it was." },
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="open-a-tented-via">Open a tented via</StepHeading>
        <p className="text-muted leading-7">
          If the via is covered with mask, expose the ring first. Scratch the mask gently with a fibreglass pen
          or the tip of a scalpel held almost flat until copper shows around the hole. The ring is often only
          about 0.1 mm to 0.15 mm wide, so stop as soon as it shines; cutting through it breaks the connection.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="flux-and-wick">Flux and fine wick</StepHeading>
        <p className="text-muted leading-7">
          Add liquid or paste flux, lay the narrowest wick you have, ideally 1.5 mm or less, across the via and
          press it with the tip for two to three seconds. Lift wick and iron together. This takes the surface
          solder and sometimes empties a larger via. Often a plug stays in the barrel, held by surface tension.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="heat-the-far-side">Heat from the far side</StepHeading>
        <p className="text-muted leading-7">
          Mount the board on its edge in a holder so both faces are reachable. Add a touch of fresh solder to
          the far-side ring if it is dry, as fresh solder carries heat into the barrel. Hold the tip there for a
          couple of seconds so the whole plug melts. A typical setpoint is 330 °C to 360 °C for leaded solder;
          vias in a ground plane may need more, as the{" "}
          <Link href="/soldering-irons/soldering-iron-temperature-by-metal" className={link}>
            temperature guide
          </Link>{" "}
          explains.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="use-a-fine-needle">Push a fine stainless needle through</StepHeading>
        <p className="text-muted leading-7 mb-4">
          With the plug molten, push a stainless needle or fine stainless wire into the via from the near side,
          then lift the iron and hold the needle still until the solder sets. Twist it out; solder does not wet
          stainless, so it slides free and leaves a clean hole. A wooden toothpick works on larger vias.
        </p>
        <p className="text-muted leading-7 mb-4">
          If the needle stops partway, the plug has not melted through. Do not push harder. Lift off, add a
          little fresh solder and flux to the far side, let the board cool for a moment and try again with the
          tip held slightly longer. Forcing a needle into half-frozen solder is how barrels crack.
        </p>
        <Figure
          caption={
            <>
              Iron on the far-side ring, needle from the near side. The dashed line shows an inner plane that
              pulls heat away from the barrel.
            </>
          }
        >
          <ViaClearingDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="solder-sucker-limits" className="text-xl font-semibold mb-3">The limits of a solder sucker on small holes</h2>
        <DataTable
          head={["Method", "On a via", "Notes"]}
          rows={[
            ["Fine wick + flux", "Good for surface solder", "Often leaves the barrel plugged"],
            ["Heat far side + needle", "Most reliable", "Needle must be thinner than the hole"],
            ["Spring solder sucker", "Unreliable", "Nozzle wider than the via; recoil can jar the tip"],
            ["Hot air + needle", "Useful on plane vias", "Shield nearby parts; keep it brief"],
          ]}
        />
      </section>

      <section>
        <h2 id="protect-the-barrel" className="text-xl font-semibold mb-3">Don&apos;t overheat the via barrel</h2>
        <p className="text-muted leading-7">
          The barrel is a thin copper lining, and the ring around it is tiny. Long dwell times, repeated attempts
          and forcing a needle can crack the plating or separate the ring from the board. Give each attempt a
          few seconds, let the board cool between tries, and stop after two or three. Afterwards, check
          continuity from ring to ring. If a ring has lifted, see{" "}
          <Link href="/soldering-irons/how-to-repair-lifted-pcb-pads-after-desoldering" className={link}>
            repairing lifted PCB pads
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 id="leave-it-filled" className="text-xl font-semibold mb-3">When to leave a via filled</h2>
        <p className="text-muted leading-7 mb-6">
          A filled via still conducts perfectly well. If you only need a connection, tin a fine wire and lap it
          onto the ring or the solder surface instead. Leave alone vias that are factory-plugged with epoxy or
          copper, vias inside a pad, and vias in thermal arrays under chips: clearing them gains nothing and
          risks the board.
        </p>
        <KeyIdea title="Fine wire, short heat">
          Clearing a via is mostly about a hot, clean, small tip applied briefly. A big tip on a tiny ring
          overheats the area without melting the plug any faster.
        </KeyIdea>
        <ProductStrip
          title="Irons from our soldering reviews"
          items={[
            {
              name: "Hakko FX888D",
              image: hakko.image,
              alt: "Hakko FX888D soldering station handpiece",
              href: "/soldering-irons/hakko-fx888d-review",
              note: "70W digital station with strong thermal recovery and widely available genuine tips.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "USB-C PD powered with an OLED display; compact for small-board rework.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
