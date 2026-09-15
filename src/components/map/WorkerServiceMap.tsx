"use client";

import { useState } from "react";
import { Map } from "./Map";
import { Icon } from "@/components/ui/Icon";
import { distanceKm } from "@/lib/useGeolocation";
import { useToast } from "@/components/ui/Toast";
import type { LatLng } from "@/lib/types";

/**
 * Worker profile "Service Area" map. Shows the worker's location + service
 * radius, and lets the visitor drop their own location (via the on-map
 * "Locate me" control) to see how far the worker is from them.
 */
export function WorkerServiceMap({
  worker,
  center,
  areas,
}: {
  worker: { id: string; name: string; profession: string; area: string };
  center: LatLng;
  areas: string[];
}) {
  const { toast } = useToast();
  const [user, setUser] = useState<LatLng | null>(null);

  const pins = [
    {
      id: worker.id,
      lat: center.lat,
      lng: center.lng,
      title: worker.name,
      subtitle: `${worker.profession} · ${worker.area}`,
    },
    ...(user
      ? [{ id: "__you", lat: user.lat, lng: user.lng, title: "You are here", isUser: true as const }]
      : []),
  ];

  const km = user ? distanceKm(user, center) : null;

  return (
    <div className="overflow-hidden rounded-xl border border-ink/[0.07]">
      <Map
        center={user ?? center}
        zoom={13}
        radiusKm={4}
        pins={pins}
        mapClassName="h-56 sm:h-72"
        className="rounded-none border-0"
        showLocate
        onLocate={(p) => {
          setUser(p);
          toast("Location detected — showing distance to this worker", "success");
        }}
        onLocateError={(m) => toast(m, "error")}
      />
      <div className="flex flex-wrap items-center gap-2 border-t border-ink/[0.07] p-3">
        {km != null ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-verified-50 px-2.5 py-1 text-xs font-semibold text-verified-700">
            <Icon name="pin" size={13} /> Approx. {km.toFixed(1)} km from you
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-600">
            <Icon name="pin" size={13} className="text-amber-500" /> Based in {worker.area} · serves nearby areas:
          </span>
        )}
        {areas.map((area) => (
          <span key={area} className="chip bg-ivory-100 text-ink-700">
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}
