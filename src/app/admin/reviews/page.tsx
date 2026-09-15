"use client";

import { useState } from "react";
import { Stars } from "@/components/ui/Rating";
import { StatusBadge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { REVIEWS } from "@/data/reviews";
import { getWorker } from "@/data/workers";
import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviews() {
  const { toast } = useToast();
  // Seed one flagged review for the demo moderation flow.
  const [rows, setRows] = useState<Review[]>(
    REVIEWS.map((r, i) => ({ ...r, status: i === 2 ? "flagged" : r.status ?? "published" }))
  );

  const setStatus = (id: string, status: Review["status"], msg: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast(msg, status === "hidden" ? "info" : "success");
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Reviews moderation</h2>
        <p className="text-ink-600">Review and moderate customer feedback.</p>
      </div>

      <div className="space-y-3">
        {rows.map((r) => {
          const worker = getWorker(r.workerId);
          return (
            <div key={r.id} className="rounded-card border border-ink/[0.07] bg-white p-4 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink">{r.customerName}</p>
                    <span className="text-sm text-ink-500">→ {worker?.name}</span>
                    {r.status === "flagged" && <StatusBadge label="Flagged" className="bg-danger-50 text-danger-600" />}
                    {r.status === "hidden" && <StatusBadge label="Hidden" className="bg-ink/10 text-ink-600" />}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars value={r.rating} size={13} />
                    <span className="text-xs text-ink-400">{formatDate(r.date)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {r.status !== "hidden" ? (
                    <button onClick={() => setStatus(r.id, "hidden", "Review hidden")} className="btn-outline btn-sm">
                      <Icon name="close" size={14} /> Hide
                    </button>
                  ) : (
                    <button onClick={() => setStatus(r.id, "published", "Review restored")} className="btn-outline btn-sm">
                      Restore
                    </button>
                  )}
                  {r.status === "flagged" && (
                    <button onClick={() => setStatus(r.id, "published", "Review approved")} className="btn-primary btn-sm">
                      Approve
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-2.5 text-[15px] text-ink-700">{r.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
