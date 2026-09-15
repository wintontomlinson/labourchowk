import { Suspense } from "react";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { AuthForm } from "./AuthForm";

const POINTS = [
  "Verified worker profiles",
  "Clear pricing before you book",
  "Real customer ratings & reviews",
];

export function AuthLayout({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <Image
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80"
          alt="Skilled workers"
          fill
          sizes="50vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Logo variant="light" />
          <div>
            <h2 className="max-w-sm font-display text-3xl font-extrabold leading-tight text-ivory-100">
              Har Kaam Ke Liye, Sahi Insaan.
            </h2>
            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-ivory-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                    <Icon name="check" size={14} strokeWidth={2.6} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-ivory-300/70">© 2026 Labour Chowk</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col">
        <div className="p-5 lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10">
          <Suspense fallback={<div className="h-64 w-full max-w-md skeleton" />}>
            <AuthForm mode={mode} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
