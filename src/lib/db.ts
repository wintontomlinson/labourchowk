import { prisma, hasDatabase } from "./prisma";
import { toWorker, toBooking, toReview } from "./mappers";
import {
  applyWorkerFilters,
  recommendedScore,
  type SortKey,
  type WorkerFilters,
} from "./queries";
import type { Booking, Review, Worker } from "./types";

// Mock fallbacks (used when DATABASE_URL is not configured, e.g. a fresh deploy)
import { WORKERS } from "@/data/workers";
import { BOOKINGS, JOB_REQUESTS } from "@/data/bookings";
import { REVIEWS } from "@/data/reviews";

/**
 * Data-access layer. Every function returns a Promise and transparently uses
 * PostgreSQL (via Prisma) when DATABASE_URL is set, otherwise the bundled demo
 * data. This lets the app build and deploy with zero configuration, and become
 * fully database-backed the moment you add a connection string.
 */

export async function getWorkers(): Promise<Worker[]> {
  if (!hasDatabase) return WORKERS;
  try {
    const rows = await prisma.worker.findMany();
    return rows.length ? rows.map(toWorker) : WORKERS;
  } catch {
    return WORKERS;
  }
}

export async function getWorkerById(id: string): Promise<Worker | undefined> {
  if (!hasDatabase) return WORKERS.find((w) => w.id === id);
  try {
    const row = await prisma.worker.findUnique({ where: { id } });
    return row ? toWorker(row) : WORKERS.find((w) => w.id === id);
  } catch {
    return WORKERS.find((w) => w.id === id);
  }
}

export async function searchWorkers(
  filters: WorkerFilters,
  sort: SortKey = "recommended"
): Promise<Worker[]> {
  const all = await getWorkers();
  return applyWorkerFilters(all, filters, sort);
}

export async function getNearbyWorkers(limit = 6): Promise<Worker[]> {
  const all = await getWorkers();
  return [...all].sort((a, b) => recommendedScore(b) - recommendedScore(a)).slice(0, limit);
}

export async function getWorkersForService(
  serviceSlug: string,
  limit?: number
): Promise<Worker[]> {
  const all = await getWorkers();
  const list = all
    .filter((w) => w.serviceSlug === serviceSlug)
    .sort((a, b) => recommendedScore(b) - recommendedScore(a));
  return limit ? list.slice(0, limit) : list;
}

export async function getBookings(): Promise<Booking[]> {
  if (!hasDatabase) return BOOKINGS;
  try {
    const rows = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
    return rows.length ? rows.map(toBooking) : BOOKINGS;
  } catch {
    return BOOKINGS;
  }
}

export async function getReviewsForWorker(workerId: string): Promise<Review[]> {
  if (!hasDatabase) {
    return REVIEWS.filter((r) => r.workerId === workerId).sort(
      (a, b) => +new Date(b.date) - +new Date(a.date)
    );
  }
  try {
    const rows = await prisma.review.findMany({
      where: { workerId },
      orderBy: { createdAt: "desc" },
    });
    return rows.map(toReview);
  } catch {
    return REVIEWS.filter((r) => r.workerId === workerId);
  }
}

export async function ratingDistributionFor(
  workerId: string
): Promise<Record<number, number>> {
  const reviews = await getReviewsForWorker(workerId);
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) dist[r.rating] = (dist[r.rating] ?? 0) + 1;
  return dist;
}

/** Create a booking. Persists to the DB when configured, else returns the object. */
export async function createBooking(data: Booking): Promise<Booking> {
  if (!hasDatabase) return data;
  try {
    const row = await prisma.booking.create({
      data: {
        id: data.id,
        workerId: data.workerId,
        workerName: data.workerName,
        workerPhoto: data.workerPhoto,
        service: data.service,
        customerName: data.customerName,
        status: data.status,
        date: data.date,
        timeSlot: data.timeSlot,
        address: data.address,
        city: data.city,
        estimatedPrice: data.estimatedPrice,
        priceModel: data.priceModel,
        notes: data.notes,
      },
    });
    return toBooking(row);
  } catch {
    return data;
  }
}

export { JOB_REQUESTS };
