import type { NavItem } from "./DashboardShell";

export const CUSTOMER_NAV: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "home" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "calendar", badge: 2 },
  { href: "/dashboard/messages", label: "Messages", icon: "chat" },
  { href: "/dashboard/saved", label: "Saved Workers", icon: "heart" },
  { href: "/dashboard/payments", label: "Payments", icon: "wallet" },
  { href: "/dashboard/reviews", label: "Reviews", icon: "star" },
  { href: "/dashboard/profile", label: "Profile", icon: "user" },
  { href: "/dashboard/help", label: "Help", icon: "shield" },
];

export const WORKER_NAV: NavItem[] = [
  { href: "/worker/dashboard", label: "Dashboard", icon: "home" },
  { href: "/worker/dashboard/requests", label: "Job Requests", icon: "bell", badge: 3 },
  { href: "/worker/dashboard/bookings", label: "My Bookings", icon: "calendar" },
  { href: "/worker/dashboard/calendar", label: "Calendar", icon: "clock" },
  { href: "/worker/dashboard/earnings", label: "Earnings", icon: "wallet" },
  { href: "/worker/dashboard/reviews", label: "Reviews", icon: "star" },
  { href: "/worker/dashboard/profile", label: "Profile", icon: "user" },
  { href: "/worker/dashboard/settings", label: "Settings", icon: "gear" },
];

export const ADMIN_NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/workers", label: "Workers", icon: "user" },
  { href: "/admin/customers", label: "Customers", icon: "user" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar" },
  { href: "/admin/services", label: "Services", icon: "grid" },
  { href: "/admin/verification", label: "Verification", icon: "verified-badge", badge: 74 },
  { href: "/admin/reviews", label: "Reviews", icon: "star" },
  { href: "/admin/complaints", label: "Complaints", icon: "bell" },
  { href: "/admin/payments", label: "Payments", icon: "wallet" },
  { href: "/admin/analytics", label: "Analytics", icon: "trend" },
  { href: "/admin/settings", label: "Settings", icon: "gear" },
];
