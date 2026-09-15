import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Labour Chowk",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "For Customers",
    links: [
      { label: "Find Workers", href: "/find-workers" },
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Bookings", href: "/dashboard/bookings" },
    ],
  },
  {
    title: "For Workers",
    links: [
      { label: "Join as Worker", href: "/worker/onboarding" },
      { label: "Worker Login", href: "/login?role=worker" },
      { label: "Worker Help", href: "/help" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "Contact Support", href: "/contact" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cancellation Policy", href: "/legal/cancellation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/[0.08] bg-ink text-ivory-200">
      <div className="container-lc py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="max-w-xs">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-ivory-300/80">
              Har Kaam Ke Liye, Sahi Insaan. Find trusted workers near you and get the job done right.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-ivory-100">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory-300/75 transition-colors hover:text-amber-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-ivory-300/70 sm:flex-row">
          <p>© 2026 Labour Chowk. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Made for India ·{" "}
            <Link href="/legal/privacy" className="hover:text-amber-400">Privacy</Link>
            <span className="opacity-40">·</span>
            <Link href="/legal/terms" className="hover:text-amber-400">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
