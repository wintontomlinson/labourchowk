import { WORKERS } from "@/data/workers";
import type { Worker } from "./types";

export interface WorkerFilters {
  q?: string; // free-text / service name
  service?: string; // service slug
  city?: string; // city slug
  maxDistance?: number;
  minRating?: number;
  minExperience?: number;
  maxPrice?: number;
  availableToday?: boolean;
  verifiedOnly?: boolean;
}

export type SortKey =
  | "recommended"
  | "rating"
  | "price_low"
  | "nearest"
  | "experienced";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Rating" },
  { key: "price_low", label: "Price: Low to High" },
  { key: "nearest", label: "Nearest" },
  { key: "experienced", label: "Most Experienced" },
];

/**
 * Recommended score blends rating, verification, availability and proximity —
 * the kind of ranking a real marketplace would apply.
 */
function recommendedScore(w: Worker): number {
  let s = w.rating * 10;
  if (w.verification === "verified") s += 6;
  if (w.availability === "available_today") s += 4;
  s += Math.min(w.reviewCount, 150) / 30;
  s -= w.distanceKm * 0.3;
  return s;
}

export function filterWorkers(
  filters: WorkerFilters,
  sort: SortKey = "recommended"
): Worker[] {
  let results = WORKERS.filter((w) => {
    if (filters.service && w.serviceSlug !== filters.service) return false;
    if (filters.city && w.city !== filters.city) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase().trim();
      const hay = [
        w.name,
        w.profession,
        ...w.skills,
        w.area,
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filters.maxDistance != null && w.distanceKm > filters.maxDistance) return false;
    if (filters.minRating != null && w.rating < filters.minRating) return false;
    if (filters.minExperience != null && w.experienceYears < filters.minExperience)
      return false;
    if (filters.maxPrice != null && w.price > filters.maxPrice) return false;
    if (filters.availableToday && w.availability !== "available_today") return false;
    if (filters.verifiedOnly && w.verification !== "verified") return false;
    return true;
  });

  switch (sort) {
    case "rating":
      results = results.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "price_low":
      results = results.sort((a, b) => a.price - b.price);
      break;
    case "nearest":
      results = results.sort((a, b) => a.distanceKm - b.distanceKm);
      break;
    case "experienced":
      results = results.sort((a, b) => b.experienceYears - a.experienceYears);
      break;
    default:
      results = results.sort((a, b) => recommendedScore(b) - recommendedScore(a));
  }

  return results;
}

export function nearbyWorkers(limit = 6): Worker[] {
  return [...WORKERS]
    .sort((a, b) => recommendedScore(b) - recommendedScore(a))
    .slice(0, limit);
}

export function workersForService(serviceSlug: string, limit?: number): Worker[] {
  const list = WORKERS.filter((w) => w.serviceSlug === serviceSlug).sort(
    (a, b) => recommendedScore(b) - recommendedScore(a)
  );
  return limit ? list.slice(0, limit) : list;
}

export function priceRange(): { min: number; max: number } {
  const prices = WORKERS.map((w) => w.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
