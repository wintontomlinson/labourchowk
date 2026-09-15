import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader, Prose } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Labour Chowk connects customers with trusted local workers across India. Learn about our mission.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        title="Bringing India's local workforce online"
        subtitle="Labour Chowk is built to give skilled workers more work and give customers a trusted, straightforward way to hire them."
      />
      <Prose>
        <p>
          For generations, the labour chowk — the neighbourhood corner where workers gather looking
          for the day&apos;s work — has connected people who need a job done with the people who can
          do it. We&apos;re bringing that idea online, with the trust and clarity a modern platform
          can add.
        </p>
        <h2>What we believe</h2>
        <p>
          Skilled work deserves respect and fair opportunity. Customers deserve to know who they&apos;re
          hiring, what it will cost, and that the person will actually turn up. We keep things human,
          local and practical — no jargon, no hidden charges.
        </p>
        <h2>How we&apos;re different</h2>
        <ul>
          <li>Verification status is shown clearly on every worker profile.</li>
          <li>Pricing is visible before you book — no surprises.</li>
          <li>Real ratings and reviews from real bookings.</li>
          <li>Designed to be easy for workers with limited technical experience.</li>
        </ul>
      </Prose>
    </SiteShell>
  );
}
