import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/Badge";
import type { Booking } from "@/lib/types";
import { STATUS_META, cn, formatDate, formatINR, priceLabel } from "@/lib/utils";

export function StatCard({
  icon,
  label,
  value,
  hint,
  tone = "neutral",
}: {
  icon: IconName;
  label: string;
  value: string | number;
  hint?: string;
  tone?: "neutral" | "amber" | "green";
}) {
  const toneMap = {
    neutral: "bg-ivory-100 text-ink",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-verified-50 text-verified-600",
  };
  return (
    <div className="rounded-card border border-ink/[0.07] bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneMap[tone])}>
          <Icon name={icon} size={20} />
        </span>
        {hint && <span className="text-xs font-medium text-verified-600">{hint}</span>}
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
    </div>
  );
}

export function DashCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: { href: string; label: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-card border border-ink/[0.07] bg-white p-5 shadow-card", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-[17px] font-bold text-ink">{title}</h2>
        {action && (
          <Link href={action.href} className="text-sm font-medium text-amber-600 hover:text-amber-700">
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function BookingRow({ booking, view = "customer" }: { booking: Booking; view?: "customer" | "worker" }) {
  const status = STATUS_META[booking.status];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white p-3 transition-colors hover:border-ink/15 sm:gap-3.5 sm:p-3.5">
      <Avatar name={view === "customer" ? booking.workerName : booking.customerName} size={48} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-semibold text-ink">
            {view === "customer" ? booking.workerName : booking.customerName}
          </p>
          <StatusBadge label={status.label} className={status.className} />
        </div>
        <p className="mt-0.5 text-sm text-ink-600">
          {booking.service} · {formatDate(booking.date)} · {booking.timeSlot}
        </p>
        <p className="text-xs text-ink-500">
          {booking.id} · {booking.city}
        </p>
      </div>
      <div className="hidden shrink-0 text-right sm:block">
        <p className="font-display font-bold text-ink">{formatINR(booking.estimatedPrice)}</p>
        <p className="text-xs text-ink-500">{priceLabel(booking.estimatedPrice, booking.priceModel).split("/")[1]}</p>
      </div>
    </div>
  );
}
