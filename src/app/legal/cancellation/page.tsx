import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader, Prose } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "How cancellations and refunds work on Labour Chowk.",
};

export default function CancellationPage() {
  return (
    <SiteShell>
      <PageHeader title="Cancellation Policy" subtitle="Last updated: 1 September 2026" />
      <Prose>
        <p>We understand plans change. Here&apos;s how cancellations work on Labour Chowk (demo).</p>
        <h2>Cancelling a booking</h2>
        <ul>
          <li>You can cancel a pending or confirmed booking free of charge from your dashboard.</li>
          <li>Cancelling after a worker is already on the way may involve a small visit charge.</li>
          <li>Workers who repeatedly cancel accepted jobs may see their ranking affected.</li>
        </ul>
        <h2>Refunds</h2>
        <p>
          Any eligible refund is processed to your original payment method. Reach out to support if
          you have a question about a specific booking.
        </p>
      </Prose>
    </SiteShell>
  );
}
