import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader, Prose } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Labour Chowk collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageHeader title="Privacy Policy" subtitle="Last updated: 1 September 2026" />
      <Prose>
        <p>
          This is a demo privacy policy for the Labour Chowk product. It explains, in plain terms,
          how we would handle your information in a production deployment.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Account details such as your name, phone number and city.</li>
          <li>Booking information needed to connect you with a worker.</li>
          <li>Reviews and ratings you choose to submit.</li>
        </ul>
        <h2>How we use it</h2>
        <p>
          We use your information to operate the service — matching you with workers, managing
          bookings, and keeping the platform safe. We never sell your personal information.
        </p>
        <h2>Your choices</h2>
        <p>
          You can update or delete your account details at any time from your dashboard. Contact
          support if you need help.
        </p>
      </Prose>
    </SiteShell>
  );
}
