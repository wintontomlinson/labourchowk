import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ADMIN_NAV } from "@/components/dashboard/navs";

// Always render admin pages with fresh data from the database.
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      nav={ADMIN_NAV}
      title="Admin Panel"
      role="Admin"
      user={{ name: "Admin", sub: "Platform" }}
    >
      {children}
    </DashboardShell>
  );
}
