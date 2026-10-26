import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "What data OhmSavvy collects, the cookies used for analytics, advertising and Amazon affiliate links, and how to opt out of personalized ads.",
  path: "/privacy-policy",
});

const linkClass = "text-accent hover:underline";

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>LEGAL</Eyebrow>
      <h1 className="text-3xl sm:text-4xl leading-tight">Privacy Policy</h1>
      <p className="mt-5 text-muted leading-7">Last updated: October 26, 2026.</p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">Who we are</h2>
          <p className="text-muted leading-7">
            OhmSavvy (ohmsavvy.com) publishes reviews, comparisons and guides for multimeters, soldering irons and
            oscilloscopes. This policy explains what information is collected when you use the site, who collects it
            and the choices you have. Questions about it can be sent through our{" "}
            <Link href="/contact" className={linkClass}>
              contact page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Analytics</h2>
          <p className="text-muted leading-7">
            We use Google Analytics (GA4) to understand which pages are read and how visitors move around the site.
            It reports aggregate usage patterns to us, not your name or email address. Google Analytics sets its own
            cookies to do this; see{" "}
            <a href="https://policies.google.com/privacy" className={linkClass}>
              Google&apos;s Privacy Policy
            </a>{" "}
            for how Google handles that data. You can opt out with the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" className={linkClass}>
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Advertising</h2>
          <p className="text-muted leading-7">
            We use, or may use, Google AdSense to show ads on this site. Third-party vendors, including Google, use
            cookies to serve ads based on your prior visits to this website or other websites. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads to you based on your visits to this site
            and/or other sites on the internet.
          </p>
          <p className="mt-4 text-muted leading-7">
            You can opt out of personalized advertising in{" "}
            <a href="https://adssettings.google.com" className={linkClass}>
              Google Ads Settings
            </a>
            , or opt out of some third-party vendors&apos; use of cookies for personalized advertising at{" "}
            <a href="https://www.aboutads.info/choices" className={linkClass}>
              aboutads.info/choices
            </a>
            . See{" "}
            <a href="https://policies.google.com/technologies/partner-sites" className={linkClass}>
              how Google uses information from sites that use its services
            </a>{" "}
            for more detail. Where ads run, visitors in the European Economic Area, the UK and Switzerland are asked
            for consent through a Google-certified consent message before personalized ads are shown.
          </p>
          <p className="mt-4 text-muted leading-7">
            Advertisers have no say in what we review or how we rate it, and ads are never placed inside our rankings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Amazon affiliate links</h2>
          <p className="text-muted leading-7">
            Product links on this site go to Amazon and include an affiliate tracking tag. When you click through and
            make a qualifying purchase, OhmSavvy may earn a commission at no extra cost to you. Amazon may set its own
            cookies and collect data once you&apos;re on its site. That is governed by{" "}
            <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" className={linkClass}>
              Amazon&apos;s own Privacy Policy
            </a>
            , not this one.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Contact form</h2>
          <p className="text-muted leading-7">
            If you use our contact form, the name, email address and message you enter are sent to us through
            Formspree, a form-processing service, and delivered to our inbox. We use them only to reply to you, and
            we don&apos;t add you to any mailing list or share your details with anyone else. Formspree&apos;s handling of
            that data is covered by{" "}
            <a href="https://formspree.io/legal/privacy-policy" className={linkClass}>
              Formspree&apos;s Privacy Policy
            </a>
            . There are no user accounts or comments on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Server logs</h2>
          <p className="text-muted leading-7">
            Our hosting provider (Vercel) generates standard server logs (IP address, request time, browser user
            agent) for security and performance. We don&apos;t use these logs to identify individual visitors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Managing cookies</h2>
          <p className="text-muted leading-7">
            Most browsers let you block or delete cookies in their settings. Blocking cookies won&apos;t stop you
            reading anything on OhmSavvy. Ads may become less relevant, and affiliate commissions may not be
            credited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Children&apos;s privacy</h2>
          <p className="text-muted leading-7">
            OhmSavvy is not directed at children under 13 and we do not knowingly collect information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Changes to this policy</h2>
          <p className="text-muted leading-7">
            If what this site collects or how it operates changes, we&apos;ll update this page and the date at the
            top.
          </p>
        </section>
      </div>
    </article>
  );
}
