import Link from "next/link";

export function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </Link>
  );
}
