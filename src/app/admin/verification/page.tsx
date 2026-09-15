"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { EmptyState } from "@/components/ui/States";
import { WORKERS } from "@/data/workers";
import { CITIES } from "@/data/cities";

export default function AdminVerification() {
  const { toast } = useToast();
  const pendingInitial = WORKERS.filter((w) => w.verification === "pending" || w.verification === "unverified");
  const [queue, setQueue] = useState(pendingInitial);

  const act = (id: string, approved: boolean) => {
    setQueue((prev) => prev.filter((w) => w.id !== id));
    toast(approved ? "Worker verified" : "Verification rejected", approved ? "success" : "info");
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-extrabold text-ink">Verification queue</h2>
        <p className="text-ink-600">Review workers awaiting verification. Status is shown publicly on profiles.</p>
      </div>

      {queue.length === 0 ? (
        <EmptyState icon="verified-badge" title="All caught up" description="There are no workers awaiting verification right now." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {queue.map((w) => {
            const city = CITIES.find((c) => c.slug === w.city)?.name ?? w.city;
            return (
              <div key={w.id} className="rounded-card border border-ink/[0.07] bg-white p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-ivory-200">
                    <Image src={w.photo} alt={w.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{w.name}</p>
                    <p className="text-sm text-ink-500">{w.profession} · {city}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  {["ID proof", "Photo", "Address"].map((doc) => (
                    <div key={doc} className="rounded-lg bg-ivory-50 px-2 py-2 text-ink-600">
                      <Icon name="check" size={14} className="mx-auto mb-1 text-verified-500" />
                      {doc}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={() => act(w.id, false)} className="btn-outline btn-sm">Reject</button>
                  <button onClick={() => act(w.id, true)} className="btn-primary btn-sm">Approve</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
