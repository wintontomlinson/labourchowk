import type { Booking, JobRequest } from "@/lib/types";

/**
 * Generate a Labour Chowk booking ID like LC-2026-000124.
 * In a real backend this would be a DB sequence; here it's deterministic
 * enough for the demo while still feeling authentic.
 */
export function generateBookingId(seq?: number): string {
  const year = new Date().getFullYear();
  const n = seq ?? Math.floor(100 + Math.random() * 899900);
  return `LC-${year}-${String(n).padStart(6, "0")}`;
}

export const BOOKINGS: Booking[] = [
  {
    id: "LC-2026-000124",
    workerId: "w-rakesh-kumar",
    workerName: "Rakesh Kumar",
    workerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    service: "Electrician",
    customerName: "Amit Verma",
    status: "confirmed",
    date: "2026-09-18",
    timeSlot: "10:00 AM – 12:00 PM",
    address: "B-42, Laxmi Nagar",
    city: "Delhi",
    estimatedPrice: 350,
    priceModel: "visit",
    createdAt: "2026-09-14T09:20:00Z",
    notes: "2 fans install karne hain aur ek switchboard repair.",
  },
  {
    id: "LC-2026-000119",
    workerId: "w-imran-khan",
    workerName: "Imran Khan",
    workerPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    service: "AC Technician",
    customerName: "Amit Verma",
    status: "in_progress",
    date: "2026-09-15",
    timeSlot: "02:00 PM – 04:00 PM",
    address: "B-42, Laxmi Nagar",
    city: "Delhi",
    estimatedPrice: 499,
    priceModel: "visit",
    createdAt: "2026-09-13T14:00:00Z",
    notes: "Split AC service aur gas check.",
  },
  {
    id: "LC-2026-000098",
    workerId: "w-sunil-kumar",
    workerName: "Sunil Kumar",
    workerPhoto: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200&q=80",
    service: "Carpenter",
    customerName: "Amit Verma",
    status: "completed",
    date: "2026-09-02",
    timeSlot: "11:00 AM – 01:00 PM",
    address: "B-42, Laxmi Nagar",
    city: "Delhi",
    estimatedPrice: 450,
    priceModel: "visit",
    createdAt: "2026-08-30T10:00:00Z",
    notes: "Almirah ke darwaze theek karne hain.",
  },
  {
    id: "LC-2026-000071",
    workerId: "w-mohit-sharma",
    workerName: "Mohit Sharma",
    workerPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    service: "Painter",
    customerName: "Amit Verma",
    status: "pending",
    date: "2026-09-22",
    timeSlot: "09:00 AM – 06:00 PM",
    address: "B-42, Laxmi Nagar",
    city: "Delhi",
    estimatedPrice: 1300,
    priceModel: "day",
    createdAt: "2026-09-14T18:30:00Z",
    notes: "Do bedroom paint karwane hain.",
  },
  {
    id: "LC-2026-000045",
    workerId: "w-amit-yadav",
    workerName: "Amit Yadav",
    workerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    service: "Plumber",
    customerName: "Amit Verma",
    status: "cancelled",
    date: "2026-08-19",
    timeSlot: "04:00 PM – 06:00 PM",
    address: "B-42, Laxmi Nagar",
    city: "Delhi",
    estimatedPrice: 300,
    priceModel: "visit",
    createdAt: "2026-08-17T11:00:00Z",
    notes: "Customer ne reschedule kiya.",
  },
];

/** Incoming job requests shown on the worker dashboard (for Rakesh Kumar). */
export const JOB_REQUESTS: JobRequest[] = [
  {
    id: "jr-1",
    bookingId: "LC-2026-000131",
    customerName: "Neha Sharma",
    service: "Fan & light installation",
    area: "Preet Vihar",
    city: "Delhi",
    date: "2026-09-16",
    timeSlot: "10:00 AM – 12:00 PM",
    estimatedAmount: 350,
    distanceKm: 1.8,
    note: "3 ceiling fan aur 4 LED light lagwane hain.",
  },
  {
    id: "jr-2",
    bookingId: "LC-2026-000133",
    customerName: "Rohit Malhotra",
    service: "Switchboard repair",
    area: "Shakarpur",
    city: "Delhi",
    date: "2026-09-16",
    timeSlot: "03:00 PM – 04:00 PM",
    estimatedAmount: 250,
    distanceKm: 2.6,
    note: "Ek switchboard se spark aa raha hai.",
  },
  {
    id: "jr-3",
    bookingId: "LC-2026-000140",
    customerName: "Kavita Rani",
    service: "Full house wiring check",
    area: "Nirman Vihar",
    city: "Delhi",
    date: "2026-09-17",
    timeSlot: "11:00 AM – 02:00 PM",
    estimatedAmount: 700,
    distanceKm: 3.1,
  },
];

export function getBooking(id: string): Booking | undefined {
  return BOOKINGS.find((b) => b.id === id);
}
