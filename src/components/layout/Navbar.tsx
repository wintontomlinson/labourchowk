"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { CITIES } from "@/data/cities";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState("Delhi");
  const [locOpen, setLocOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLocOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink/[0.07] bg-ivory-100/85 backdrop-blur-md"
          : "border-b border-transparent bg-ivory-100"
      )}
    >
      <div className="container-lc flex h-[68px] items-center gap-3">
        {/* Left: logo */}
        <Logo />

        {/* Center: nav (desktop) — flex-1 keeps it centred without overlap */}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors",
                isActive(link.href)
                  ? "text-ink"
                  : "text-ink-600 hover:text-ink hover:bg-ink/[0.04]"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3.5 -bottom-[3px] h-0.5 rounded-full bg-amber-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
          {/* Location selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLocOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-ink/10 px-2.5 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-ink/20 hover:bg-ink/[0.03]"
            >
              <Icon name="pin" size={16} className="text-amber-500" />
              {city}
              <Icon name="chevron-down" size={14} className="text-ink-500" />
            </button>
            {locOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-ink/10 bg-white p-1.5 shadow-card-hover animate-scale-in">
                {CITIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setCity(c.name);
                      setLocOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-ivory-100",
                      c.name === city ? "font-semibold text-ink" : "text-ink-700"
                    )}
                  >
                    {c.name}
                    {c.name === city && <Icon name="check" size={15} className="text-verified-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/worker"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink/[0.04] lg:inline-flex"
          >
            For Workers
          </Link>
          <span className="mx-0.5 hidden h-5 w-px bg-ink/10 lg:block" />
          <Link
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink/[0.04] sm:inline-flex"
          >
            Login
          </Link>
          <Link href="/find-workers" className="btn-primary btn-sm hidden shadow-sm sm:inline-flex">
            Hire a Worker
          </Link>

          {/* Mobile location + menu */}
          <button
            onClick={() => setLocOpen((v) => !v)}
            className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-ink-700 md:hidden"
          >
            <Icon name="pin" size={18} className="text-amber-500" />
            <span className="max-w-[70px] truncate">{city}</span>
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/[0.05] lg:hidden"
            aria-label="Open menu"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-ink/[0.07] bg-ivory-100 lg:hidden animate-fade-in">
          <div className="container-lc flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-[15px] font-medium",
                  isActive(link.href) ? "bg-ink/[0.05] text-ink" : "text-ink-700"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1 h-px bg-ink/[0.07]" />
            <Link href="/worker" className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-700">
              For Workers
            </Link>
            <Link href="/login" className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink-700">
              Login
            </Link>
            <Link href="/find-workers" className="btn-primary btn-md mt-1">
              Hire a Worker
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
