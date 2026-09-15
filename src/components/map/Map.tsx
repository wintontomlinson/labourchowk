"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import type { MapPin } from "./LeafletMap";
import type { LatLng } from "@/lib/types";

// Leaflet touches `window`, so the map must load client-side only.
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ivory-200">
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-amber-500" />
        Loading map…
      </div>
    </div>
  ),
});

export function Map({
  center,
  zoom,
  pins,
  radiusKm,
  className,
  mapClassName,
}: {
  center: LatLng;
  zoom?: number;
  pins: MapPin[];
  radiusKm?: number;
  className?: string;
  mapClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-ink/[0.07] bg-ivory-200", className)}>
      <LeafletMap center={center} zoom={zoom} pins={pins} radiusKm={radiusKm} className={mapClassName} />
    </div>
  );
}

export type { MapPin };
