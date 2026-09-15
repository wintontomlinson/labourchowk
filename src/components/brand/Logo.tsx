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
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-[11px] bg-ink shadow-sm",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        {/* four roads / crossroads arms */}
        <path
          d="M16 3.5v8M16 20.5v8M3.5 16h8M20.5 16h8"
          stroke="#e8792b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* subtle diagonal connectors for a fuller 'chowk' feel */}
        <path
          d="M8.5 8.5l3.2 3.2M23.5 8.5l-3.2 3.2M8.5 23.5l3.2-3.2M23.5 23.5l-3.2-3.2"
          stroke="#e8792b"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* central meeting point */}
        <circle cx="16" cy="16" r="4.4" fill="#faf7f2" />
        <circle cx="16" cy="16" r="2" fill="#e8792b" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  variant = "dark",
  compact = false,
  size = 36,
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
