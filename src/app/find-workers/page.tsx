import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { FindWorkersClient } from "./FindWorkersClient";
import { WorkerCardSkeleton } from "@/components/worker/WorkerCard";

export const metadata: Metadata = {
  title: "Find Workers Near You",
  description:
    "Search and compare verified electricians, plumbers, carpenters, painters and more near you. Filter by service, distance, rating, price and availability.",
};

export default function FindWorkersPage() {
  return (
    <SiteShell>
      <Suspense
        fallback={
          <div className="container-lc grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <WorkerCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FindWorkersClient />
      </Suspense>
    </SiteShell>
  );
}
