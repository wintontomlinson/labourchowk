import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { CUSTOMER_NAV } from "@/components/dashboard/navs";

export const metadata: Metadata = {
  title: "My Dashboard",
  robots: { index: false },
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      nav={CUSTOMER_NAV}
      title="Dashboard"
      role="Customer"
      user={{ name: "Amit Verma", sub: "Delhi" }}
    >
      {children}
    </DashboardShell>
  );
}
