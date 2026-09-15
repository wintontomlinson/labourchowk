import { AREA_COORDS, CITIES } from "@/data/cities";
import type { LatLng, Worker } from "./types";

const DELHI_CENTER: LatLng = { lat: 28.6139, lng: 77.209 };

/** Small deterministic offset so workers in the same area don't stack exactly. */
function jitter(seed: string): { dLat: number; dLng: number } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = ((h % 1000) / 1000 - 0.5) * 0.02; // ~±1 km
  const b = (((h >> 10) % 1000) / 1000 - 0.5) * 0.02;
  return { dLat: a, dLng: b };
}

/** Resolve a worker's map coordinates from their area, then city, then Delhi. */
export function workerCoords(worker: Pick<Worker, "id" | "area" | "city">): LatLng {
  const anchor = AREA_COORDS[worker.area] ?? cityCenter(worker.city);
  const { dLat, dLng } = jitter(worker.id);
  return { lat: anchor.lat + dLat, lng: anchor.lng + dLng };
}

/** City centre for a given city slug (falls back to Delhi). */
export function cityCenter(citySlug: string): LatLng {
  const c = CITIES.find((x) => x.slug === citySlug);
  return c?.lat != null ? { lat: c.lat, lng: c.lng! } : DELHI_CENTER;
}

export { DELHI_CENTER };
