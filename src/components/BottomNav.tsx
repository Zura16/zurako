"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bookmark, GraduationCap, Layers, UserRound } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Learn", icon: GraduationCap },
  { href: "/feed/", label: "Feed", icon: Layers },
  { href: "/progress/", label: "Progress", icon: BarChart3 },
  { href: "/saved/", label: "Saved", icon: Bookmark },
  { href: "/account/", label: "Me", icon: UserRound },
];

export function BottomNav() {
  const path = usePathname() ?? "/";
  const current = (href: string) => (href === "/" ? path === "/" || path.startsWith("/learn") : path.startsWith(href.replace(/\/$/, "")));
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/85 pb-[var(--safe-bottom)] backdrop-blur-lg">
      <ul className="mx-auto flex max-w-xl justify-around">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const on = current(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={on ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 px-3 py-2.5 sm:px-5 text-[11px] font-medium transition-colors ${on ? "text-accent" : "text-faint hover:text-muted"}`}
              >
                <Icon size={21} strokeWidth={on ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
