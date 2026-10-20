import { HeaderLogo } from "./HeaderLogo";
import { ScrollHeader } from "./ScrollHeader";
import { SiteNav } from "./SiteNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Site header: animated logo, mega-menu nav, search palette trigger, theme
 * toggle, and the mobile menu. Slims down on lg+ once the page scrolls
 * (mobile height stays fixed so the sticky "On this page" bar can sit flush
 * beneath it).
 */
export function SiteHeader() {
  return (
    <ScrollHeader>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 transition-[padding] duration-300 lg:group-data-[scrolled=true]/header:py-2.5">
        <HeaderLogo />
        <div className="flex items-center gap-2 lg:gap-4">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
    </ScrollHeader>
  );
}
