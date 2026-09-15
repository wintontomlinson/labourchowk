"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/find-workers", label: "Search", icon: "search" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "calendar" },
  { href: "/dashboard", label: "Profile", icon: "user" },
];

/** Mobile bottom navigation — larger tap targets, fixed. */
export function MobileNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/[0.08] bg-white/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-amber-600" : "text-ink-500"
              )}
            >
              <Icon name={item.icon} size={22} strokeWidth={active ? 2 : 1.7} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
