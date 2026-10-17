"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const GA_MEASUREMENT_ID = "G-VBC5FBYD7D";

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

// Loaded only after the visitor's first real interaction, not on page
// load. gtag.js's own execution (not just its download) costs real Total
// Blocking Time — deferring until after interaction keeps that cost out
// of both the Lighthouse measurement window and the visitor's perceived
// load time. Tradeoff: a visitor who leaves without ever interacting
// isn't counted — accepted deliberately for the performance win.
let gaLoaded = false;

function loadGA4() {
  if (gaLoaded) return;
  gaLoaded = true;

  const win = window as GtagWindow;
  win.dataLayer = win.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    win.dataLayer!.push(args);
  };
  win.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

const INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

export default function GoogleAnalyticsLoader() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onInteraction = () => {
      loadGA4();
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, onInteraction));
    };
    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, onInteraction, { once: true, passive: true })
    );
    return () => {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, onInteraction));
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      // GA4 sends its own first pageview via the dataLayer config call
      // once (and if) it loads — nothing to send here on first render.
      isFirstRender.current = false;
      return;
    }
    (window as GtagWindow).gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}
