import { cn } from "@/lib/utils";

export function Stars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-ink/15" fill />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star size={size} className="text-amber-500" fill />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function Star({ size, className, fill }: { size: number; className?: string; fill?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill={fill ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={fill ? 0 : 1.5}
        d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"
      />
    </svg>
  );
}

export function RatingInline({
  value,
  count,
  size = 14,
}: {
  value: number;
  count?: number;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <Stars value={value} size={size} />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count != null && <span className="text-ink-500">({count})</span>}
    </span>
  );
}
