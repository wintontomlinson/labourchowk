import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { WORKER_NAV } from "@/components/dashboard/navs";

// Always render worker dashboard pages with fresh data from the database.
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Worker Dashboard",
  robots: { index: false },
};

export default function WorkerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      nav={WORKER_NAV}
      title="Worker Dashboard"
      role="Worker"
      user={{ name: "Rakesh Kumar", sub: "Electrician" }}
    >
      {children}
    </DashboardShell>
  );
}
