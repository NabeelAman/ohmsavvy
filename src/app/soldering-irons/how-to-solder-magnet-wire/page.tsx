import Link from "next/link";
import {
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "How to solder magnet wire (enamel-coated copper wire) without damaging the coating: strip it mechanically, or burn it off under heat if it's a solderable type.";

export const metadata = buildMetadata({
  title: "How to Solder Magnet Wire",
  description,
  path: "/soldering-irons/how-to-solder-magnet-wire",
});

const pinecil = picks.find((p) => p.name === "Pinecil V2")!;
const fx888dx = picks.find((p) => p.name === "Hakko FX-888DX")!;
const weller = picks.find((p) => p.name === "Weller WE1010NA")!;

const link = "text-accent hover:underline";

export default function HowToSolderMagnetWirePage() {
  return (
    <HowToShell
      title="How to Solder Magnet Wire (Enamel-Coated Copper Wire)"
      description={description}
      path="/soldering-irons/how-to-solder-magnet-wire"
      category="soldering-irons"
      published="2026-10-22"
      intro={
        <>
          Magnet wire — the fine, enamel-coated copper wire used in transformer, motor, and speaker
          windings — doesn&apos;t strip the way ordinary insulated wire does. Its thin varnish-like
          enamel coating is specifically designed to withstand winding and handling, and a standard wire
          stripper simply won&apos;t remove it. Getting solder to actually bond to the copper underneath
          means removing that coating first, by one of two routes depending on the enamel type.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable USB-C powered soldering iron",
        caption: (
          <>
            A hot, well-tinned iron is what makes the direct burn-off method work on solderable
            enamels. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              full review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "why-it-wont-strip", label: "Why magnet wire won't strip like normal wire" },
        { id: "two-enamel-types", label: "Solderable vs. non-solderable enamel" },
        { id: "method-direct-heat", label: "Method 1: Direct heat (solderable enamel)" },
        { id: "method-mechanical", label: "Method 2: Mechanical stripping (any enamel type)" },
        { id: "confirm-its-clean", label: "Confirming the coating is actually gone" },
        { id: "quick-reference", label: "Quick reference" },
        { id: "irons-for-magnet-wire", label: "Irons with heat to spare for enamel" },
      ]}
      faq={[
        {
          q: "Is \"magnet wire\" the same thing as enamel-coated copper wire?",
          a: "Yes — they're the same material, just two common names for it. \"Magnet wire\" describes its typical use (windings for transformers, motors, inductors, and electromagnets); \"enamel-coated copper wire\" describes what it physically is. Either term refers to copper wire insulated with a thin, baked-on enamel coating instead of a plastic jacket.",
        },
        {
          q: "How do I know if my magnet wire has a solderable enamel?",
          a: "There's no universal visual tell, so the practical test is simply trying the direct-heat method on a spare end first: touch a hot, fluxed, well-tinned iron to the wire end and watch whether the coating visibly bubbles away and the wire takes solder within a couple of seconds. If it doesn't clear within about 3-4 seconds, treat it as non-solderable and strip mechanically instead, rather than holding the iron there indefinitely.",
        },
        {
          q: "Can I use a lighter or match to burn off magnet wire enamel?",
          a: "It's a technique some people use — a brief pass through a flame can carbonize the enamel so it wipes off, followed by sanding any carbon residue before tinning. It's less controllable than the iron or mechanical methods on this page, risks annealing (softening) very fine wire, and isn't necessary for solderable enamel types, so it's best kept as a fallback rather than a first choice.",
        },
        {
          q: "Why won't solder stick even after I think I've removed the enamel?",
          a: "A thin, nearly invisible residue of enamel or carbon can remain even when the wire looks shiny, and that residue blocks wetting the same way any contaminated surface does. Light sanding with fine abrasive paper, followed by fresh flux, usually clears it — confirm by checking for continuity end to end once you believe it's tinned.",
        },
        {
          q: "How do I attach magnet wire to a PCB pad or a stranded lead?",
          a: "Strip and tin the magnet wire end first, tin the pad or lead separately, then press them together and reflow briefly so you aren't fighting enamel and a joint at once. Fine magnet wire breaks easily right where the solder stops, so glue or tape the wire down nearby, or leave a small loop, to keep flexing away from the joint.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/how-to-solder-wires-together",
          title: "How to Solder Wires Together",
          desc: "Standard wire splicing technique once the magnet wire end is properly stripped.",
        },
        {
          href: "/soldering-irons/why-solder-wicks-away-from-tip",
          title: "Why Does Solder Wick Away From the Tip?",
          desc: "Relevant on fine magnet wire, which readily draws solder up its strands by capillary action.",
        },
      ]}
    >
      <section>
        <h2 id="why-it-wont-strip" className="text-xl font-semibold mb-3">Why magnet wire won&apos;t strip like normal wire</h2>
        <p className="text-muted leading-7">
          Ordinary insulated wire has a plastic jacket thick enough for a stripper&apos;s blades to grip
          and pull off. Magnet wire&apos;s enamel coating is a thin, baked-on varnish layer, often only
          a few thousandths of a millimeter thick — far too thin for a mechanical stripper to catch,
          and it bonds directly to the copper surface rather than sitting as a separate removable layer.
        </p>
      </section>

      <section>
        <h2 id="two-enamel-types" className="text-xl font-semibold mb-3">Solderable vs. non-solderable enamel</h2>
        <p className="text-muted leading-7 mb-4">
          Not all magnet wire enamels behave the same way under heat, which is why there are two
          genuinely different approaches:
        </p>
        <p className="text-muted leading-7 mt-4">
          Headphone cables use the same enamel-coated strands; <Link href="/soldering-irons/how-to-solder-a-broken-headphone-wire-with-a-soldering-iron" className="text-accent hover:underline">how to solder a broken headphone wire</Link> applies these methods to a cable repair.
        </p>
        <DataTable
          head={["Enamel type", "Behavior under a hot iron", "Common use"]}
          rows={[
            ["Solderable (often polyurethane-based)", "Burns/dissolves away directly under sufficient heat and flux", "Fine-gauge wire: small transformers, inductors, speaker voice coils"],
            ["Non-solderable (polyester-imide, polyimide, heavier builds)", "Resists typical iron temperatures; doesn't clear with heat alone", "Motor windings, heavier-duty or high-temperature-rated magnet wire"],
          ]}
        />
      </section>

      <section>
        <StepHeading n={1} id="method-direct-heat">Method 1: Direct heat (solderable enamel)</StepHeading>
        <p className="text-muted leading-7 mb-4">
          Heat the iron to a high setting (around 370-400°C), apply a generous amount of fresh flux to
          the wire end, and hold the tip against it while feeding a little solder. On a solderable
          enamel, the coating visibly clears within a couple of seconds as the wire tins. If nothing
          happens within 3-4 seconds, stop and switch to mechanical stripping instead of prolonging heat
          exposure.
        </p>
        <Figure
          caption={
            <>
              On solderable enamel, heat and flux clear the coating directly, leaving bright, tinned
              copper. The method either works quickly or doesn&apos;t work at all — it&apos;s not worth
              forcing with extended heat.
            </>
          }
        >
          <svg viewBox="0 0 300 100" className="w-full h-auto" role="img" aria-label="Diagram of enamel coating clearing from magnet wire under direct heat and flux">
            <line x1="20" y1="50" x2="130" y2="50" className="stroke-muted" strokeWidth="4" />
            <line x1="130" y1="50" x2="280" y2="50" className="stroke-accent" strokeWidth="4" />
            <text x="75" y="75" fontSize="10" textAnchor="middle" className="fill-muted">enamel-coated</text>
            <text x="205" y="75" fontSize="10" textAnchor="middle" className="fill-accent">tinned, bare copper</text>
            <path d="M130 20 L130 40" className="stroke-foreground" strokeWidth="2" markerEnd="url(#arrowdownmw)" />
            <defs>
              <marker id="arrowdownmw" viewBox="0 0 10 10" refX="5" refY="8" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0L10 0L5 10z" className="fill-foreground" />
              </marker>
            </defs>
            <text x="130" y="14" fontSize="9" textAnchor="middle" className="fill-foreground">heat + flux + solder here</text>
          </svg>
        </Figure>
      </section>

      <section>
        <StepHeading n={2} id="method-mechanical">Method 2: Mechanical stripping (any enamel type)</StepHeading>
        <p className="text-muted leading-7">
          Working on a small section at a time, gently sand the wire end with fine abrasive paper, or
          carefully scrape it with a sharp blade held at a shallow angle, rotating the wire to clear the
          enamel evenly on all sides. This method works on both solderable and non-solderable enamels,
          making it the reliable fallback whenever direct heat doesn&apos;t clear the coating.
        </p>
      </section>

      <section id="confirm-its-clean">
        <Callout title="Confirming the coating is actually gone">
          A properly stripped end looks bright and shiny, not dull or still faintly colored. After
          tinning, check continuity end to end with a multimeter — a solid, low reading confirms
          solder actually bonded to the copper rather than just coating a thin remaining layer of
          enamel.
        </Callout>
      </section>

      <Callout title="Ventilate when burning off enamel">
        Burning through solderable enamel releases more smoke than ordinary flux, and the fumes from heated
        polyurethane coatings are irritating to breathe. Work with a fan or fume extractor drawing smoke away
        from your face, keep the iron in its stand between joints, and let a freshly tinned end cool before
        handling it.
      </Callout>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["Situation", "Recommended method"]}
          rows={[
            ["Fine wire, unsure of enamel type", "Try direct heat first on a spare end; fall back to mechanical if it doesn't clear quickly"],
            ["Known heavier/non-solderable enamel", "Mechanical stripping from the start"],
            ["Very fine wire where sanding risks breaking it", "Direct heat, kept brief, is gentler than aggressive scraping"],
            ["After either method", "Confirm with a continuity check before relying on the joint"],
          ]}
        />
      </section>

      <KeyIdea title="Clear the copper first, then solder normally">
        Every magnet-wire problem is a coating problem. Once the end is bright copper and takes a thin, even
        coat of solder, the joint itself is no harder than any other small-wire splice.
      </KeyIdea>

      <section id="irons-for-magnet-wire">
        <h2 className="text-xl font-semibold mb-3">Irons with heat to spare for enamel</h2>
        <p className="text-muted leading-7 mb-4">
          The direct-heat method needs an iron that holds 370–400°C at the tip while flux and enamel pull heat
          away. Any of these verified picks reaches that range with room left over.
        </p>
        <ProductStrip
          title="Irons for stripping and tinning magnet wire"
          items={[
            {
              name: "Hakko FX-888DX",
              image: fx888dx.image,
              alt: "Hakko FX-888DX soldering station with handpiece",
              href: "/soldering-irons/best-soldering-irons#hakko-fx-888dx",
              note: "Adjustable to 480°C with ±1°C idle stability and five presets, handy for switching between tinning and assembly.",
            },
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: "Heats in about 12 seconds on a 20V+ supply and runs from USB-C, convenient for coil work away from the bench.",
            },
            {
              name: "Weller WE1010NA",
              image: weller.image,
              alt: "Weller WE1010NA digital soldering station",
              href: "/soldering-irons/weller-we1010na-review",
              note: "85W digital station (70W iron) with ESD-safe construction, suited to winding and inductor repairs on a dedicated bench.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
