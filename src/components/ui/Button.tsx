"use client";

import Link from "next/link";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = /^https?:\/\//.test(href);
  const sharedClassName = `inline-flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        // noopener: the Amazon tab can't reach back and manipulate this tab via
        // window.opener. sponsored: Google's documented rel value for paid/
        // affiliate links — every link here earns a commission, so every one
        // gets it, not just a token few.
        rel="noopener sponsored"
        className={sharedClassName}
        onClick={() => {
          (window as GtagWindow).gtag?.("event", "affiliate_click", { destination_url: href });
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={sharedClassName}>
      {children}
    </Link>
  );
}
