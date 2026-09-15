"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  badge?: number;
}

export function DashboardShell({
  nav,
  title,
  role,
  user,
  children,
}: {
  nav: NavItem[];
  title: string;
  role: "Customer" | "Worker" | "Admin";
  user: { name: string; sub: string };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === pathname || (href !== "/dashboard" && href !== "/worker/dashboard" && href !== "/admin" && pathname.startsWith(href));

  const accent =
    role === "Admin" ? "text-danger-500" : role === "Worker" ? "text-verified-600" : "text-amber-600";

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Logo variant="light" />
      </div>
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold text-ivory-100">
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ivory-100">{user.name}</p>
            <p className={cn("text-xs font-medium", accent)}>{role} · {user.sub}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-white/10 text-ivory-100" : "text-ivory-300/75 hover:bg-white/5 hover:text-ivory-100"
              )}
            >
              <Icon name={item.icon} size={19} strokeWidth={active ? 2 : 1.7} />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ivory-300/75 hover:bg-white/5 hover:text-ivory-100"
        >
          <Icon name="logout" size={19} />
          Back to site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-ivory-100 lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh bg-ink lg:block">{SidebarInner}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/50 animate-fade-in" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-ink animate-slide-up">{SidebarInner}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-ink/[0.07] bg-ivory-100/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              <Icon name="menu" size={22} />
            </button>
            <h1 className="font-display text-lg font-bold text-ink sm:text-xl">{title}</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 hover:bg-ink/5">
              <Icon name="bell" size={20} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-500" />
            </button>
            <span className="hidden h-9 items-center gap-2 rounded-full border border-ink/10 bg-white pl-1 pr-3 sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ivory-200 text-sm font-semibold text-ink">
                {user.name.charAt(0)}
              </span>
              <span className="text-sm font-medium text-ink">{user.name.split(" ")[0]}</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 sm:p-6 lg:pb-6">{children}</main>
      </div>
    </div>
  );
}
