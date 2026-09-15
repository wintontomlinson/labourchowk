"use client";

import { useCallback, useState } from "react";
import { CITIES } from "@/data/cities";
import type { City, LatLng } from "./types";

/** Great-circle distance between two points in kilometres. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Find the nearest known Delhi-NCR city to a point. */
export function nearestCity(point: LatLng): { city: City; km: number } | null {
  const withCoords = CITIES.filter((c) => c.lat != null && c.lng != null);
  if (withCoords.length === 0) return null;
  let best = withCoords[0];
  let bestKm = Infinity;
  for (const c of withCoords) {
    const km = distanceKm(point, { lat: c.lat!, lng: c.lng! });
    if (km < bestKm) {
      bestKm = km;
      best = c;
    }
  }
  return { city: best, km: bestKm };
}

export type GeoStatus = "idle" | "locating" | "success" | "denied" | "unavailable" | "error";

export interface GeoState {
  status: GeoStatus;
  coords: LatLng | null;
  city: City | null;
  /** distance to the nearest known city, km */
  cityKm: number | null;
  message: string | null;
}

const INITIAL: GeoState = {
  status: "idle",
  coords: null,
  city: null,
  cityKm: null,
  message: null,
};

/**
 * Browser Geolocation — no external API or key. Returns a `locate()` trigger
 * and the current state (loading/denied/success). On success it also resolves
 * the nearest known city so the UI can update the location field.
 */
export function useGeolocation(onLocated?: (s: GeoState) => void) {
  const [state, setState] = useState<GeoState>(INITIAL);

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setState({
        ...INITIAL,
        status: "unavailable",
        message: "Location isn't supported on this device.",
      });
      return;
    }

    setState((s) => ({ ...s, status: "locating", message: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        const near = nearestCity(coords);
        const next: GeoState = {
          status: "success",
          coords,
          city: near?.city ?? null,
          cityKm: near?.km ?? null,
          message: near
            ? `Detected near ${near.city.name}`
            : "Location detected",
        };
        setState(next);
        onLocated?.(next);
      },
      (err) => {
        const denied = err.code === err.PERMISSION_DENIED;
        setState({
          ...INITIAL,
          status: denied ? "denied" : "error",
          message: denied
            ? "Location permission denied. You can enter your city manually."
            : "Couldn't get your location. Please try again or enter it manually.",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [onLocated]);

  const reset = useCallback(() => setState(INITIAL), []);

  return { ...state, locate, reset };
}
