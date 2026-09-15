/**
 * Labour Chowk — Domain model.
 *
 * These types describe the entities the platform is built around. They are
 * intentionally close to what a real relational/document backend would store,
 * so the mock data layer in `data/*` can later be swapped for API calls
 * without changing the UI layer.
 */

export type Role = "CUSTOMER" | "WORKER" | "ADMIN";

export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "confirmed"
  | "on_the_way"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Availability = "available_today" | "busy" | "available_soon" | "offline";

export type PricingModel = "day" | "hour" | "visit";

export interface ServiceCategory {
  slug: string;
  name: string;
  /** short one-liner shown on cards */
  tagline: string;
  /** longer copy for the service detail page */
  description: string;
  icon: string; // key into the icon registry
  /** typical price range for this service in INR */
  priceFrom: number;
  priceModel: PricingModel;
  popular: boolean;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  /** number of active workers — realistic demo figure */
  workerCount: number;
  /** approximate city centre for maps */
  lat?: number;
  lng?: number;
}

/** A latitude/longitude point. */
export interface LatLng {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  workerId: string;
  customerName: string;
  customerCity: string;
  rating: number; // 1..5
  text: string;
  service: string;
  date: string; // ISO
  status?: "published" | "flagged" | "hidden";
}

export interface Worker {
  id: string;
  name: string;
  photo: string;
  profession: string; // primary service name
  serviceSlug: string;
  skills: string[];
  about: string;
  rating: number; // avg
  reviewCount: number;
  experienceYears: number;
  price: number;
  priceModel: PricingModel;
  city: string; // city slug
  area: string;
  distanceKm: number;
  availability: Availability;
  verification: VerificationStatus;
  jobsDone: number;
  workPhotos: string[];
  serviceAreas: string[];
  languages: string[];
  responseTime: string; // e.g. "Usually replies in 2 hrs"
  joinedYear: number;
}

export interface Booking {
  id: string; // LC-2026-000124
  workerId: string;
  workerName: string;
  workerPhoto: string;
  service: string;
  customerName: string;
  status: BookingStatus;
  date: string; // ISO date of the job
  timeSlot: string;
  address: string;
  city: string;
  estimatedPrice: number;
  priceModel: PricingModel;
  createdAt: string;
  notes?: string;
}

export interface JobRequest {
  id: string;
  bookingId: string;
  customerName: string;
  service: string;
  area: string;
  city: string;
  date: string;
  timeSlot: string;
  estimatedAmount: number;
  distanceKm: number;
  note?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  city: string;
  service: string;
}

/** Admin-facing aggregate metrics. */
export interface PlatformMetrics {
  totalUsers: number;
  activeWorkers: number;
  bookingsToday: number;
  completedBookings: number;
  pendingVerification: number;
  revenueThisMonth: number;
}
