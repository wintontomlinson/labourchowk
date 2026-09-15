import type { PlatformMetrics, Testimonial } from "@/lib/types";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "Found an electrician within minutes. The profile, rating and pricing made it easy to choose. He fixed everything in one visit.",
    name: "Amit Verma",
    city: "Delhi",
    service: "Electrician",
  },
  {
    id: "t-2",
    quote:
      "Ghar ki painting ke liye 3 workers compare kiye aur experience ke hisaab se choose kiya. Rate pehle se pata tha, koi tension nahi.",
    name: "Deepika Rao",
    city: "Noida",
    service: "Painter",
  },
  {
    id: "t-3",
    quote:
      "Booking history aur reviews dekh kar bharosa ho gaya. Plumber time par aaya aur kaam saaf tha. Ab har kaam yahin se karvaungi.",
    name: "Priya Singh",
    city: "Gurugram",
    service: "Plumber",
  },
  {
    id: "t-4",
    quote:
      "As a carpenter, I get local job requests directly on my phone. Availability apne hisaab se set karta hoon aur earnings track hoti rehti hai.",
    name: "Sunil Kumar",
    city: "Delhi",
    service: "Carpenter",
  },
];

export const PLATFORM_METRICS: PlatformMetrics = {
  totalUsers: 48210,
  activeWorkers: 12640,
  bookingsToday: 386,
  completedBookings: 29840,
  pendingVerification: 74,
  revenueThisMonth: 1842000,
};

/** Last 7 days of bookings for the admin chart (realistic, restrained). */
export const BOOKINGS_TREND: { day: string; bookings: number }[] = [
  { day: "Mon", bookings: 312 },
  { day: "Tue", bookings: 358 },
  { day: "Wed", bookings: 341 },
  { day: "Thu", bookings: 402 },
  { day: "Fri", bookings: 468 },
  { day: "Sat", bookings: 521 },
  { day: "Sun", bookings: 386 },
];
