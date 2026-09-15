"use client";

import { useState } from "react";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { BOOKINGS } from "@/data/bookings";
import type { Booking, BookingStatus } from "@/lib/types";
import { STATUS_META, cn, formatDate, formatINR } from "@/lib/utils";

const ALL_STATUSES: BookingStatus[] = [
  "pending",
  "accepted",
  "confirmed",
  "on_the_way",
  "in_progress",
  "completed",
  "cancelled",
];

export default function AdminBookings() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Booking[]>(BOOKINGS);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const setStatus = (id: string, status: BookingStatus) => {
    setRows((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setOpen(null);
    toast(`${id} marked as ${STATUS_META[status].label}`, "success");
  };

  const shown = filter === "all" ? rows : rows.filter((b) => b.status === filter);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Bookings management</h2>
        <p className="text-ink-600">View, update and manage all bookings.</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
        {(["all", ...ALL_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              filter === s ? "border-ink bg-ink text-ivory-100" : "border-ink/10 bg-white text-ink-700 hover:border-ink/25"
            )}
          >
            {s === "all" ? "All" : STATUS_META[s].label}
          </button>
        ))}
      </div>

      <AdminTable columns={["ID", "Customer", "Worker", "Service", "Location", "Date", "Status", "Actions"]}>
        {shown.map((b) => {
          const s = STATUS_META[b.status];
          return (
            <tr key={b.id} className="border-b border-ink/[0.05] last:border-0 hover:bg-ivory-50">
              <td className="px-4 py-3 font-medium text-ink">{b.id}</td>
              <td className="px-4 py-3 text-ink-700">{b.customerName}</td>
              <td className="px-4 py-3 text-ink-700">{b.workerName}</td>
              <td className="px-4 py-3 text-ink-600">{b.service}</td>
              <td className="px-4 py-3 text-ink-600">{b.city}</td>
              <td className="px-4 py-3 text-ink-600">{formatDate(b.date)}</td>
              <td className="px-4 py-3"><StatusBadge label={s.label} className={s.className} /></td>
              <td className="px-4 py-3 text-right">
                <div className="relative inline-block">
                  <button
                    onClick={() => setOpen(open === b.id ? null : b.id)}
                    className="btn-outline btn-sm"
                  >
                    Update <Icon name="chevron-down" size={14} />
                  </button>
                  {open === b.id && (
                    <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-ink/10 bg-white p-1 text-left shadow-card-hover animate-scale-in">
                      {ALL_STATUSES.map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatus(b.id, st)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-ivory-100",
                            st === b.status ? "font-semibold text-ink" : "text-ink-700"
                          )}
                        >
                          {STATUS_META[st].label}
                          {st === b.status && <Icon name="check" size={14} className="text-verified-500" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </AdminTable>

      {shown.length === 0 && (
        <p className="py-8 text-center text-sm text-ink-500">No bookings with this status.</p>
      )}

      <p className="text-xs text-ink-500">
        Total value shown:{" "}
        {formatINR(shown.reduce((sum, b) => sum + b.estimatedPrice, 0))}
      </p>
    </div>
  );
}
