"use client";

import { useEffect, useRef } from "react";

/**
 * The sticky site <header>. Sets data-scrolled once the page moves so children
 * can restyle with group-data-[scrolled=true]/header: utilities (slimmer
 * padding on lg+, stronger glass and shadow). Done via a data attribute rather
 * than state so scrolling never re-renders the header tree.
 */
export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      ref.current?.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      data-scrolled="false"
      className="group/header sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 data-[scrolled=true]:border-border data-[scrolled=true]:bg-background/85 data-[scrolled=true]:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
    >
      {/* category-coloured signal line */}
      <div
        aria-hidden
        className="h-[2px] w-full bg-gradient-to-r from-cat-multimeters via-cat-soldering to-cat-oscilloscopes opacity-80"
      />
      {children}
    </header>
  );
}
