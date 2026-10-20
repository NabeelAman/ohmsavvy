"use client";

import { usePathname } from "next/navigation";
import { FLAGS, isLocale, LOCALE_LABELS, LOCALES, TRANSLATED_PATHS } from "@/lib/i18n";

/**
 * Globe icon + flag/native-name dropdown, matching the pattern on
 * nabeelaman.com's LanguageSwitcher — rebuilt with this project's own inline
 * SVG icon style instead of adding lucide-react as a new dependency. Renders
 * nothing on any page outside TRANSLATED_PATHS, since showing a language
 * picker that leads nowhere is worse than not showing one at all.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";

  const match = pathname.match(/^\/(de|fr|it|es)(\/.*)?$/);
  const currentLocale = match && isLocale(match[1]) ? match[1] : "en";
  const basePath = match ? match[2] || "/" : pathname;

  if (!TRANSLATED_PATHS.includes(basePath)) return null;

  const options: { locale: "en" | (typeof LOCALES)[number]; label: string; href: string }[] = [
    { locale: "en", label: "English", href: basePath },
    ...LOCALES.map((locale) => ({
      locale,
      label: LOCALE_LABELS[locale],
      href: `/${locale}${basePath === "/" ? "" : basePath}`,
    })),
  ];

  return (
    <details className="group relative">
      <summary className="flex items-center justify-center gap-1 w-9 h-9 rounded-full text-muted hover:text-foreground hover:bg-surface-raised transition-colors cursor-pointer list-none">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2.5 10h15M10 2.5c2 2.2 3 5 3 7.5s-1 5.3-3 7.5c-2-2.2-3-5-3-7.5s1-5.3 3-7.5Z" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-surface py-1.5 shadow-lg">
        {options.map((o) => (
          <a
            key={o.locale}
            href={o.href}
            className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-surface-raised ${
              o.locale === currentLocale ? "text-accent font-medium" : "text-foreground"
            }`}
          >
            <span aria-hidden="true">{FLAGS[o.locale]}</span>
            <span className="flex-1">{o.label}</span>
            {o.locale === currentLocale && (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </a>
        ))}
      </div>
    </details>
  );
}
