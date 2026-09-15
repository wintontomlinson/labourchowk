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

export interface LiveMetrics {
  totalWorkers: number;
  activeWorkers: number;
  pendingVerification: number;
  totalBookings: number;
  bookingsToday: number;
  completedBookings: number;
  totalReviews: number;
}

/**
 * Live platform metrics computed from the database. Falls back to counts from
 * the bundled demo data when no DB is configured.
 */
export async function getPlatformMetrics(): Promise<LiveMetrics> {
  const todayStr = new Date().toISOString().slice(0, 10);

  if (!hasDatabase) {
    return {
      totalWorkers: WORKERS.length,
      activeWorkers: WORKERS.filter((w) => w.availability !== "offline").length,
      pendingVerification: WORKERS.filter((w) => w.verification === "pending").length,
      totalBookings: BOOKINGS.length,
      bookingsToday: BOOKINGS.filter((b) => b.date === todayStr).length,
      completedBookings: BOOKINGS.filter((b) => b.status === "completed").length,
      totalReviews: REVIEWS.length,
    };
  }

  try {
    const [
      totalWorkers,
      activeWorkers,
      pendingVerification,
      totalBookings,
      bookingsToday,
      completedBookings,
      totalReviews,
    ] = await Promise.all([
      prisma.worker.count(),
      prisma.worker.count({ where: { availability: { not: "offline" } } }),
      prisma.worker.count({ where: { verification: "pending" } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { date: todayStr } }),
      prisma.booking.count({ where: { status: "completed" } }),
      prisma.review.count(),
    ]);
    return {
      totalWorkers,
      activeWorkers,
      pendingVerification,
      totalBookings,
      bookingsToday,
      completedBookings,
      totalReviews,
    };
  } catch {
    return {
      totalWorkers: WORKERS.length,
      activeWorkers: WORKERS.length,
      pendingVerification: 0,
      totalBookings: BOOKINGS.length,
      bookingsToday: 0,
      completedBookings: BOOKINGS.filter((b) => b.status === "completed").length,
      totalReviews: REVIEWS.length,
    };
  }
}

/** All reviews (newest first) — used by the admin moderation screen. */
export async function getAllReviews(limit = 100): Promise<Review[]> {
  if (!hasDatabase) return REVIEWS;
  try {
    const rows = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.length ? rows.map(toReview) : REVIEWS;
  } catch {
    return REVIEWS;
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

// ────────────────────────────────────────────────────────────────────────────
// WRITES — every mutation persists to Neon when DATABASE_URL is set. When it's
// not (e.g. a preview without a DB), functions no-op gracefully so the UI still
// works in demo mode.
// ────────────────────────────────────────────────────────────────────────────

export interface NewReviewInput {
  workerId: string;
  customerName: string;
  customerCity: string;
  rating: number;
  text: string;
  service: string;
}

/** Create a review and recompute the worker's average rating + review count. */
export async function createReview(input: NewReviewInput): Promise<Review | null> {
  if (!hasDatabase) return null;
  try {
    const created = await prisma.review.create({
      data: {
        workerId: input.workerId,
        customerName: input.customerName,
        customerCity: input.customerCity,
        rating: input.rating,
        text: input.text,
        service: input.service,
        status: "published",
      },
    });

    // Recompute aggregate rating for the worker from all published reviews.
    const agg = await prisma.review.aggregate({
      where: { workerId: input.workerId, status: "published" },
      _avg: { rating: true },
      _count: { _all: true },
    });
    await prisma.worker.update({
      where: { id: input.workerId },
      data: {
        rating: Math.round((agg._avg.rating ?? input.rating) * 10) / 10,
        reviewCount: agg._count._all,
      },
    });

    return toReview(created);
  } catch {
    return null;
  }
}

/** Update a booking's status. */
export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<boolean> {
  if (!hasDatabase) return true;
  try {
    await prisma.booking.update({ where: { id }, data: { status } });
    return true;
  } catch {
    return false;
  }
}

/** Update a worker's verification status (admin approve/reject). */
export async function updateWorkerVerification(
  id: string,
  verification: Worker["verification"]
): Promise<boolean> {
  if (!hasDatabase) return true;
  try {
    await prisma.worker.update({ where: { id }, data: { verification } });
    return true;
  } catch {
    return false;
  }
}

/** Moderate a review (publish / hide / flag). */
export async function updateReviewStatus(
  id: string,
  status: Review["status"]
): Promise<boolean> {
  if (!hasDatabase) return true;
  try {
    await prisma.review.update({ where: { id }, data: { status } });
    return true;
  } catch {
    return false;
  }
}

export interface NewWorkerInput {
  name: string;
  phone?: string;
  profession: string;
  serviceSlug: string;
  skills: string[];
  experienceYears: number;
  price: number;
  priceModel: Worker["priceModel"];
  city: string;
  area: string;
  serviceAreas: string[];
}

/** Register a new worker (from onboarding). Returns the created worker. */
export async function createWorker(input: NewWorkerInput): Promise<Worker | null> {
  if (!hasDatabase) return null;
  try {
    const row = await prisma.worker.create({
      data: {
        name: input.name,
        photo: "",
        profession: input.profession,
        serviceSlug: input.serviceSlug,
        skills: input.skills,
        about: `${input.profession} with ${input.experienceYears}+ years of experience in ${input.area}.`,
        rating: 0,
        reviewCount: 0,
        experienceYears: input.experienceYears,
        price: input.price,
        priceModel: input.priceModel,
        city: input.city,
        area: input.area,
        distanceKm: 0,
        availability: "available_today",
        verification: "pending",
        jobsDone: 0,
        workPhotos: [],
        serviceAreas: input.serviceAreas.length ? input.serviceAreas : [input.area],
        languages: ["Hindi"],
        responseTime: "New on Labour Chowk",
        joinedYear: new Date().getFullYear(),
      },
    });
    return toWorker(row);
  } catch {
    return null;
  }
}

/** Store a contact / support message. */
export async function createContactMessage(input: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}): Promise<boolean> {
  if (!hasDatabase) return true;
  try {
    await prisma.contactMessage.create({ data: input });
    return true;
  } catch {
    return false;
  }
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
