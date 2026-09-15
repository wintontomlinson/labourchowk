"use client";

import { useState } from "react";
import { BookingRow } from "@/components/dashboard/widgets";
import { EmptyState } from "@/components/ui/States";
import { BOOKINGS } from "@/data/bookings";
import type { BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { key: BookingStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function CustomerBookings() {
  const [tab, setTab] = useState<BookingStatus | "all">("all");
  const filtered = tab === "all" ? BOOKINGS : BOOKINGS.filter((b) => b.status === tab);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">My bookings</h2>
        <p className="text-ink-600">Track and manage all your service bookings.</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const count = t.key === "all" ? BOOKINGS.length : BOOKINGS.filter((b) => b.status === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                tab === t.key
                  ? "border-ink bg-ink text-ivory-100"
                  : "border-ink/10 bg-white text-ink-700 hover:border-ink/25"
              )}
            >
              {t.label}
              <span className={cn("text-xs", tab === t.key ? "text-ivory-300" : "text-ink-400")}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="calendar"
          title="No bookings here"
          description="You don't have any bookings in this category yet. Find a worker to get started."
          actionLabel="Find a Worker"
          actionHref="/find-workers"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => (
            <BookingRow key={b.id} booking={b} />
          ))}
        </div>
      )}
    </div>
  );
}
