import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";

// Gates every route under /[locale]/... to the 4 pilot languages only — any
// other value 404s instead of silently rendering untranslated English
// content under a foreign-looking URL (bad for both users and hreflang).
// Only the prerendered locales exist: anything else (/favicon.ico, /apple-touch-icon.png, scanner junk) 404s
// from the static not-found page instead of running a Vercel Function for every unknown one-segment URL.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return children;
}
