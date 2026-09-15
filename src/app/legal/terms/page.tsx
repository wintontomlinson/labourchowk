import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader, Prose } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Labour Chowk.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <PageHeader title="Terms of Service" subtitle="Last updated: 1 September 2026" />
      <Prose>
        <p>These demo terms describe how the Labour Chowk platform is intended to be used.</p>
        <h2>Using the platform</h2>
        <p>
          Labour Chowk connects customers with independent workers. We provide the platform; the
          work itself is performed by the workers you choose.
        </p>
        <h2>Bookings and pricing</h2>
        <p>
          Prices shown are set by workers and may be refined before work begins. Every booking has a
          unique reference ID for your records.
        </p>
        <h2>Conduct</h2>
        <ul>
          <li>Treat workers and customers with respect.</li>
          <li>Provide accurate information when booking or creating a profile.</li>
          <li>Do not misuse the platform or submit fake reviews.</li>
        </ul>
      </Prose>
    </SiteShell>
  );
}
