import Link from "@/components/AppLink";
import { CategoryListing } from "@/components/CategoryListing";
import { ListingGuide } from "@/components/ListingGuide";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Reviews",
  description: "Oscilloscope reviews weighed on bandwidth, sample rate, and channel count against the signals you're likely to debug, not spec-sheet bragging rights.",
  path: "/oscilloscopes/reviews",
});

const link = "text-accent hover:underline";

export default function OscilloscopesReviewsPage() {
  return (
    <>
      <CategoryListing
        category="oscilloscopes"
        type="review"
        heading="Oscilloscope Reviews"
        intro="Bandwidth and channel count only matter relative to what you're actually debugging, so each review here starts from the kind of signal work a scope is realistically good for — hobby electronics, microcontroller timing, general bench use — before getting into display size and extras like a built-in waveform generator."
      >
        <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="py-1 font-medium text-accent hover:underline">
          Best beginner oscilloscopes
        </Link>
        <Link href="/oscilloscopes/comparisons" className="py-1 text-accent hover:underline">
          All oscilloscope comparisons
        </Link>
        <Link href="/oscilloscopes/oscilloscope-buying-guide" className="py-1 text-accent hover:underline">
          Oscilloscope buying guide
        </Link>
        <Link href="/oscilloscopes/guides" className="py-1 text-accent hover:underline">
          All oscilloscope guides
        </Link>
      </CategoryListing>

      <ListingGuide
        chooseTitle="How to read an oscilloscope review"
        chooseIntro={
          <>
            Scope spec sheets lead with the biggest numbers, and the headline figure is rarely the whole story. Write down the
            fastest signal you expect to look at and how many signals you need on screen together, then use these checks to
            judge whether a reviewed scope fits.
          </>
        }
        criteria={[
          {
            title: "Bandwidth against your fastest signal",
            body: (
              <>
                A rule of thumb is three to five times the highest frequency you need to see clearly, and more for sharp
                digital edges. Our{" "}
                <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
                  bandwidth explainer
                </Link>{" "}
                shows why the rated figure is a -3 dB point, not a hard limit.
              </>
            ),
          },
          {
            title: "Sample rate per channel",
            body: (
              <>
                Many scopes quote one sample rate shared across channels, so it can halve or quarter when you switch more
                channels on. Check the per-channel figure in the review; our{" "}
                <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
                  sample rate guide
                </Link>{" "}
                explains what GSa/s means in practice.
              </>
            ),
          },
          {
            title: "Memory depth at full speed",
            body: "Memory depth decides how long the scope can record before it has to lower the sample rate. It matters most for long captures, such as a serial message or a power-up sequence, where you want to zoom in afterwards.",
          },
          {
            title: "Bench, handheld or USB",
            body: "Bench scopes give the biggest screen and the most controls. Handheld units suit car and field work, and some double as a multimeter. USB scopes rely on a computer for the display and controls, which keeps them small but ties them to a laptop.",
          },
          {
            title: "What's unlocked and what's extra",
            body: "Serial decoding, a built-in waveform generator and higher bandwidth are sometimes included, sometimes paid add-ons and sometimes absent. Reviews list what the maker includes as standard so you can compare like with like.",
          },
          {
            title: "Probes and inputs",
            body: (
              <>
                Check the rated bandwidth of the included probes and the input voltage limits. A probe set to 1x can limit
                bandwidth well below the scope&apos;s own figure; see{" "}
                <Link href="/oscilloscopes/how-to-compensate-an-oscilloscope-probe" className={link}>
                  how to compensate a probe
                </Link>
                .
              </>
            ),
          },
        ]}
        processTitle="How OhmSavvy reviews oscilloscopes"
        process={[
          <>
            Every review shows which of our two levels it reached. Scopes with a Hands-on Tested badge were bought and used on our
            own bench, and only those can be rated 4.8. Spec-Verified reviews are built from the maker&apos;s datasheet, user
            manual and product page, or the official Amazon listing, plus patterns in verified-purchase owner feedback.
          </>,
          <>
            We match each scope to the work it realistically suits, such as hobby circuits, microcontroller timing or general
            bench use, and say who should skip it. Figures the maker doesn&apos;t publish appear as &quot;Not stated&quot;,
            conflicts between sources are pointed out, and we never publish a measurement or screenshot result we didn&apos;t
            capture ourselves.
          </>,
          <>
            No brand can pay for a placement or a rating; we earn a commission from Amazon when you buy through our links, at no
            extra cost to you. The full method and rating scale are on our{" "}
            <Link href="/about" className={link}>
              about page
            </Link>
            .
          </>,
        ]}
        related={[
          { href: "/oscilloscopes/oscilloscope-buying-guide", label: "Oscilloscope buying guide", note: "The full checklist for choosing your first or next scope." },
          { href: "/oscilloscopes/50mhz-vs-100mhz-oscilloscope", label: "50 MHz vs 100 MHz oscilloscope", note: "Whether the step up in bandwidth is worth it for your signals." },
          { href: "/oscilloscopes/oscilloscope-vs-multimeter", label: "Oscilloscope vs multimeter", note: "What a scope shows that a meter can't." },
          { href: "/oscilloscopes/best-oscilloscope-for-home-electronics-lab", label: "Best oscilloscope for a home electronics lab", note: "Picks for a hobby bench." },
          { href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e", label: "Rigol DS1054Z vs Siglent SDS1104X-E", note: "Two popular four-channel bench scopes side by side." },
        ]}
        faqs={[
          {
            q: "Which oscilloscope reviews are hands-on tested?",
            a: "Any review with the Hands-on Tested badge covers a scope we bought and used on our own bench, and only those can carry our 4.8 rating. The rest are Spec-Verified reviews based on the maker's published data and the official Amazon listing, and each one says so.",
          },
          {
            q: "Why don't oscilloscope reviews just rank by bandwidth?",
            a: "Because more bandwidth only helps if your signals need it. A scope with less bandwidth but four channels, deeper memory or included serial decoding can be the better buy for microcontroller and repair work. Reviews weigh the specs against the jobs the scope is likely to do.",
          },
          {
            q: "Do the reviews cover pocket and handheld oscilloscopes?",
            a: "Yes. Alongside bench scopes, we review pocket models such as the FNIRSI DSO152, which suit quick field checks, and point out where their bandwidth, channel count, memory or screen size limit them compared with a bench scope.",
          },
        ]}
      />
    </>
  );
}
