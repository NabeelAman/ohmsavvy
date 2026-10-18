import { CategoryHero } from "@/components/CategoryHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Soldering Irons for Electronics in 2026",
  description: "From pocket-sized portables to full bench stations — an honest comparison of the best soldering irons by heat-up time, temperature stability, and price.",
  path: "/soldering-irons/best-soldering-irons",
});

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Hakko FX888D",
    image: "https://hakkousa.com/media/catalog/product/f/x/fx888d_handpiece.jpg",
    rating: 4.8,
    bottomLine: "The bench station hobbyist and pro communities keep recommending independently of each other.",
    verdict:
      "The FX888D is the bench station most consistently recommended by hobbyist communities and professionals alike. Fast thermal recovery and genuinely stable temperature control make it a reliable long-term tool.",
    specs: [
      { label: "Power", value: "70W" },
      { label: "Heat-up time", value: "~15 seconds" },
      { label: "Temperature control", value: "Digital, adjustable" },
      { label: "Best for", value: "Serious hobbyists, repair work" },
    ],
    pros: ["Excellent thermal recovery under load", "Widely available genuine replacement tips", "Trusted reputation across electronics communities"],
    cons: ["Counterfeit units exist — buy from authorized sellers", "Bulkier than portable options"],
    ctaHref: "https://www.amazon.com/dp/B00ANZRT4M?tag=ohmsavvy-20",
  },
  {
    badge: "Best Portable",
    name: "Pinecil V2",
    image: "https://pine64.org/documentation/images/Pinecilv2-1.jpg",
    rating: 4.7,
    bottomLine: "USB-C powered and pocket-sized — the rare budget tool that doesn't feel like a compromise.",
    verdict:
      "USB-C powered, pocket-sized, and genuinely fast to heat up — the Pinecil V2 is the rare budget tool that doesn't feel like a compromise, making it a favorite for on-the-go repairs.",
    specs: [
      { label: "Power", value: "65W (USB-C PD)" },
      { label: "Heat-up time", value: "~12 seconds" },
      { label: "Temperature control", value: "OLED digital display" },
      { label: "Best for", value: "Portability, field repairs" },
    ],
    pros: ["Extremely compact and travel-friendly", "Fast heat-up for its size", "Powered by any USB-C PD source, even a power bank"],
    cons: ["No stand included by default", "Smaller tip selection than Hakko"],
    ctaHref: "https://www.amazon.com/dp/B096X6SG13?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget",
    name: "Q-MING 60W Kit",
    image: "https://m.media-amazon.com/images/I/716mcSHUCjS._AC_SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A genuinely complete starter kit — easy first purchase for anyone new to soldering.",
    verdict:
      "A genuinely complete starter kit — ceramic heating element, multiple tips, and a stand included, at a price that makes it an easy first purchase for anyone new to soldering.",
    specs: [
      { label: "Power", value: "60W" },
      { label: "Heat-up time", value: "~15 seconds" },
      { label: "Temperature control", value: "Adjustable dial" },
      { label: "Best for", value: "Beginners, occasional use" },
    ],
    pros: ["Comes with 5 tips and a stand in one box", "Very low price for a complete kit", "Simple dial control, no learning curve"],
    cons: ["Analog dial is less precise than digital stations", "Build quality suited for light, occasional use"],
    ctaHref: "https://www.amazon.com/dp/B098JD8HD3?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Professional Benches",
    name: "Weller WE1010NA",
    image: "https://www.weller-tools.com/sites/default/files/products/images/2026-08/WE_1010.jpg",
    rating: 4.6,
    bottomLine: "ESD-safe construction and tight temperature stability for a dedicated electronics bench.",
    verdict:
      "Weller's WE1010NA brings ESD-safe construction and tight temperature stability to a 70W digital station, making it a strong choice for anyone running a dedicated electronics bench.",
    specs: [
      { label: "Power", value: "70W" },
      { label: "Heat-up time", value: "~20 seconds" },
      { label: "Temperature control", value: "Digital, ESD-safe" },
      { label: "Best for", value: "Dedicated workbenches, professional use" },
    ],
    pros: ["ESD-safe design protects sensitive components", "Strong temperature stability under sustained use", "Backed by Weller's long-standing reputation"],
    cons: ["Higher price point than hobbyist kits", "Not portable — bench-only design"],
    ctaHref: "https://www.amazon.com/dp/B077JDGY1J?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "How much wattage do I actually need?",
    answer:
      "For general electronics and hobby work, 60-70W gives enough thermal headroom to solder larger joints without losing temperature. Anything below 40W can struggle to heat up ground planes or thicker wires quickly.",
  },
  {
    question: "Is a digital temperature display necessary?",
    answer:
      "Not strictly, but it removes guesswork. Digital stations let you dial in the exact temperature a specific solder type or component needs, which matters more as your projects get more sensitive (e.g., SMD work).",
  },
];

export default function BestSolderingIronsPage() {
  return (
    <>
      <CategoryHero
        category="soldering"
        label="Soldering Irons"
        heading="Find the Right Iron for Your Workbench"
        tagline="Compared honestly — no pay-for-placement."
        description="From the pocket-sized Pinecil to full bench stations like the Hakko FX888D, we compared heat-up time, temperature stability, and real owner feedback."
        primaryCta={{ label: "Browse All Soldering Irons", href: "#hakko-fx888d" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We compared power, heat-up time, temperature control, and tip availability, weighing portable irons and bench stations against how often and where you will actually solder."
      />
      <ContentLinks category="soldering-irons" />
    </>
  );
}
