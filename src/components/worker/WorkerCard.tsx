"use client";

import Link from "next/link";
import { useState } from "react";
import type { Worker } from "@/lib/types";
import { AVAILABILITY_META, cn, priceLabel } from "@/lib/utils";
import { RatingInline } from "@/components/ui/Rating";
import { VerifiedBadge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";

export function WorkerCard({ worker }: { worker: Worker }) {
  const avail = AVAILABILITY_META[worker.availability];
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  return (
    <div className="group relative flex flex-col rounded-card border border-ink/[0.07] bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <button
        onClick={() => {
          setSaved((v) => !v);
          toast(saved ? "Removed from saved workers" : "Saved to your list", "info");
        }}
        className={cn(
          "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-white/90 backdrop-blur transition-colors",
          saved ? "border-danger-100 text-danger-500" : "border-ink/10 text-ink-500 hover:text-ink"
        )}
        aria-label="Save worker"
      >
        <Icon name="heart" size={16} strokeWidth={saved ? 0 : 1.7} className={saved ? "fill-current" : ""} />
      </button>

      <div className="flex gap-3.5">
        <Avatar name={worker.name} size={60} className="sm:!h-[68px] sm:!w-[68px]" />
        <div className="min-w-0 flex-1 pr-8">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-[16px] font-bold text-ink">{worker.name}</h3>
            {worker.verification === "verified" && (
              <Icon name="verified-badge" size={16} className="shrink-0 text-verified-500" />
            )}
          </div>
          <p className="text-sm text-ink-600">{worker.profession}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <RatingInline value={worker.rating} count={worker.reviewCount} size={13} />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-ink-600">
        <span className="inline-flex items-center gap-1">
          <Icon name="shield" size={14} className="text-ink-500" />
          {worker.experienceYears}+ yrs exp
        </span>
        <span className="inline-flex items-center gap-1">
          <Icon name="pin" size={14} className="text-ink-500" />
          {worker.distanceKm} km away
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="font-display text-[17px] font-bold text-ink">
          {priceLabel(worker.price, worker.priceModel)}
        </span>
        {worker.verification === "verified" ? (
          <VerifiedBadge status="verified" />
        ) : (
          <span className="text-xs text-ink-500">{worker.jobsDone} jobs done</span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium">
        <span className={cn("h-2 w-2 rounded-full", avail.dot)} />
        <span className={avail.text}>{avail.label}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href={`/worker/${worker.id}`} className="btn-outline btn-sm">
          View Profile
        </Link>
        <Link href={`/book/${worker.id}`} className="btn-primary btn-sm">
          Hire Now
        </Link>
      </div>
    </div>
  );
}

export function WorkerCardSkeleton() {
  return (
    <div className="rounded-card border border-ink/[0.07] bg-white p-4">
      <div className="flex gap-3.5">
        <div className="skeleton h-[68px] w-[68px] rounded-xl" />
        <div className="flex-1 space-y-2 py-1">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-4/5" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="skeleton h-9" />
        <div className="skeleton h-9" />
      </div>
    </div>
  );
}
