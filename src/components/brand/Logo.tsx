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
  // Unique gradient id per render size to avoid SVG id clashes on a page.
  const gid = `lc-g-${size}`;
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[12px] ring-1 ring-black/5 shadow-[0_2px_8px_rgba(23,20,18,0.18)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="#242019" />
            <stop offset="1" stopColor="#0f0d0b" />
          </linearGradient>
          <linearGradient id={`${gid}-amber`} x1="8" y1="8" x2="32" y2="32">
            <stop offset="0" stopColor="#f0a662" />
            <stop offset="1" stopColor="#e8792b" />
          </linearGradient>
        </defs>

        {/* rounded charcoal tile with a soft top highlight */}
        <rect width="40" height="40" rx="12" fill={`url(#${gid}-bg)`} />
        <rect width="40" height="20" rx="12" fill="#ffffff" fillOpacity="0.05" />

        {/* chowk / crossroads — four roads meeting */}
        <g stroke={`url(#${gid}-amber)`} strokeLinecap="round">
          <path d="M20 6v9M20 25v9M6 20h9M25 20h9" strokeWidth="3.4" />
          <path
            d="M11 11l4 4M29 11l-4 4M11 29l4-4M29 29l-4-4"
            strokeWidth="2.2"
            strokeOpacity="0.45"
          />
        </g>

        {/* central meeting point */}
        <circle cx="20" cy="20" r="5.4" fill="#faf7f2" />
        <circle cx="20" cy="20" r="2.5" fill={`url(#${gid}-amber)`} />
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
