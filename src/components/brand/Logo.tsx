import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Labour Chowk brand mark + wordmark.
 *
 * The mark is an original "chowk" glyph: four roads meeting at a central point
 * (the neighbourhood crossroads where workers traditionally gather for work).
 * The centre dot is the meeting point; the amber arms suggest activity/energy.
 * It reads clearly at small sizes and on both light and dark backgrounds.
 */
export function LogoMark({ size = 38, className }: { size?: number; className?: string }) {
  // Unique gradient ids per size to avoid SVG id clashes when multiple render.
  const g = `lc-${size}`;
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[13px] ring-1 ring-black/5 shadow-[0_3px_10px_rgba(23,20,18,0.22)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${g}-bg`} x1="0" y1="0" x2="44" y2="44">
            <stop offset="0" stopColor="#2b2620" />
            <stop offset="1" stopColor="#100e0b" />
          </linearGradient>
          <linearGradient id={`${g}-amber`} x1="10" y1="8" x2="34" y2="38">
            <stop offset="0" stopColor="#f5b072" />
            <stop offset="0.55" stopColor="#ec8f42" />
            <stop offset="1" stopColor="#cf6318" />
          </linearGradient>
        </defs>

        {/* charcoal tile + soft top highlight */}
        <rect width="44" height="44" rx="13" fill={`url(#${g}-bg)`} />
        <rect x="0" y="0" width="44" height="22" rx="13" fill="#ffffff" fillOpacity="0.055" />

        {/*
          Mark = a location pin whose inner shape is a "chowk" (crossroads).
          Reads as: a place where workers meet for work.
        */}
        {/* pin body */}
        <path
          d="M22 7c-6.6 0-12 5.2-12 11.7 0 8 12 18.3 12 18.3s12-10.3 12-18.3C34 12.2 28.6 7 22 7Z"
          fill={`url(#${g}-amber)`}
        />
        {/* inner disc */}
        <circle cx="22" cy="18.7" r="7.6" fill="#faf7f2" />
        {/* crossroads inside the disc */}
        <g stroke="#cf6318" strokeWidth="2.1" strokeLinecap="round">
          <path d="M22 13.4v10.6M16.7 18.7h10.6" />
        </g>
        <circle cx="22" cy="18.7" r="2.15" fill="#e8792b" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  variant = "dark",
  compact = false,
  size = 38,
}: {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
  size?: number;
}) {
  const wordColor = variant === "light" ? "text-ivory-100" : "text-ink";
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="Labour Chowk home"
    >
      <LogoMark size={size} className="transition-transform duration-300 group-hover:scale-[1.04]" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[19px] font-extrabold tracking-[-0.02em]",
              wordColor
            )}
          >
            Labour<span className="text-amber-500">Chowk</span>
          </span>
          <span
            className={cn(
              "mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.18em]",
              variant === "light" ? "text-ivory-300/70" : "text-ink-500"
            )}
          >
            Sahi Kaam · Sahi Insaan
          </span>
        </span>
      )}
    </Link>
  );
}
