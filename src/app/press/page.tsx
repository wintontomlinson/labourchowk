import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader, Prose } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Press",
  description: "Press and media resources for Labour Chowk.",
};

export default function PressPage() {
  return (
    <SiteShell>
      <PageHeader title="Press & media" subtitle="Resources and contact for journalists and media." />
      <Prose>
        <p>
          For press enquiries, interviews or brand assets, please reach our communications team at{" "}
          <span className="font-medium text-ink">press@labourchowk.example</span>.
        </p>
        <h2>About Labour Chowk</h2>
        <p>
          Labour Chowk is a service marketplace connecting customers with trusted local workers —
          electricians, plumbers, carpenters, painters, masons and more — across Delhi-NCR.
        </p>
      </Prose>
    </SiteShell>
  );
}
