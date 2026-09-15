import type { Availability, BookingStatus, PricingModel } from "./types";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format INR with the ₹ symbol and Indian digit grouping. */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export function priceLabel(price: number, model: PricingModel): string {
  const unit = model === "day" ? "/day" : model === "hour" ? "/hr" : "/visit";
  return `${formatINR(price)}${unit}`;
}

export function priceModelWord(model: PricingModel): string {
  return model === "day" ? "per day" : model === "hour" ? "per hour" : "per visit";
}

export const AVAILABILITY_META: Record<
  Availability,
  { label: string; dot: string; text: string }
> = {
  available_today: { label: "Available today", dot: "bg-verified-500", text: "text-verified-700" },
  available_soon: { label: "Available soon", dot: "bg-amber-500", text: "text-amber-700" },
  busy: { label: "Busy this week", dot: "bg-ink-500", text: "text-ink-600" },
  offline: { label: "Offline", dot: "bg-ink-500/50", text: "text-ink-500" },
};

export const STATUS_META: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  accepted: { label: "Accepted", className: "bg-verified-100 text-verified-700" },
  confirmed: { label: "Confirmed", className: "bg-verified-100 text-verified-700" },
  on_the_way: { label: "On the way", className: "bg-blue-100 text-blue-800" },
  in_progress: { label: "In Progress", className: "bg-amber-100 text-amber-800" },
  completed: { label: "Completed", className: "bg-ink/10 text-ink-800" },
  cancelled: { label: "Cancelled", className: "bg-danger-50 text-danger-600" },
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - +new Date(iso);
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
