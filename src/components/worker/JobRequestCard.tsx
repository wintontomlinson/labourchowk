"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import type { JobRequest } from "@/lib/types";
import { formatDate, formatINR } from "@/lib/utils";

export function JobRequestCard({ request }: { request: JobRequest }) {
  const { toast } = useToast();
  const [state, setState] = useState<"idle" | "accepted" | "declined">("idle");

  if (state === "accepted") {
    return (
      <div className="rounded-xl border border-verified-100 bg-verified-50/60 p-4 text-sm text-verified-700 animate-fade-in">
        <div className="flex items-center gap-2 font-semibold">
          <Icon name="check" size={16} strokeWidth={2.4} /> Job accepted
        </div>
        <p className="mt-1 text-verified-700/80">
          {request.customerName} · {request.service} · {request.bookingId}
        </p>
      </div>
    );
  }
  if (state === "declined") {
    return (
      <div className="rounded-xl border border-ink/[0.07] bg-ivory-50 p-4 text-sm text-ink-500 animate-fade-in">
        You declined this request ({request.bookingId}).
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ink/[0.07] bg-white p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-ink">{request.customerName}</p>
          <p className="text-sm text-ink-600">{request.service}</p>
        </div>
        <span className="font-display text-lg font-extrabold text-ink">{formatINR(request.estimatedAmount)}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink-600">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="pin" size={15} className="text-ink-500" /> {request.area} · {request.distanceKm} km
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" size={15} className="text-ink-500" /> {formatDate(request.date)}
        </span>
        <span className="col-span-2 inline-flex items-center gap-1.5">
          <Icon name="clock" size={15} className="text-ink-500" /> {request.timeSlot}
        </span>
      </div>
      {request.note && (
        <p className="mt-2 rounded-lg bg-ivory-50 px-3 py-2 text-sm text-ink-700">{request.note}</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            setState("declined");
            toast("Request declined", "info");
          }}
          className="btn-outline btn-sm"
        >
          Decline
        </button>
        <button
          onClick={() => {
            setState("accepted");
            toast(`You accepted ${request.customerName}'s job`, "success");
          }}
          className="btn-primary btn-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
