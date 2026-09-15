import type {
  Worker as PWorker,
  Booking as PBooking,
  Review as PReview,
} from "@prisma/client";
import type { Worker, Booking, Review } from "./types";

/** Map Prisma rows to the app's domain types (identical shapes, kept explicit). */
export function toWorker(w: PWorker): Worker {
  return {
    id: w.id,
    name: w.name,
    photo: w.photo,
    profession: w.profession,
    serviceSlug: w.serviceSlug,
    skills: w.skills,
    about: w.about,
    rating: w.rating,
    reviewCount: w.reviewCount,
    experienceYears: w.experienceYears,
    price: w.price,
    priceModel: w.priceModel,
    city: w.city,
    area: w.area,
    distanceKm: w.distanceKm,
    availability: w.availability,
    verification: w.verification,
    jobsDone: w.jobsDone,
    workPhotos: w.workPhotos,
    serviceAreas: w.serviceAreas,
    languages: w.languages,
    responseTime: w.responseTime,
    joinedYear: w.joinedYear,
  };
}

export function toBooking(b: PBooking): Booking {
  return {
    id: b.id,
    workerId: b.workerId,
    workerName: b.workerName,
    workerPhoto: b.workerPhoto,
    service: b.service,
    customerName: b.customerName,
    status: b.status,
    date: b.date,
    timeSlot: b.timeSlot,
    address: b.address,
    city: b.city,
    estimatedPrice: b.estimatedPrice,
    priceModel: b.priceModel,
    createdAt: b.createdAt.toISOString(),
    notes: b.notes ?? undefined,
  };
}

export function toReview(r: PReview): Review {
  return {
    id: r.id,
    workerId: r.workerId,
    customerName: r.customerName,
    customerCity: r.customerCity,
    rating: r.rating,
    text: r.text,
    service: r.service,
    date: r.createdAt.toISOString(),
    status: r.status,
  };
}
