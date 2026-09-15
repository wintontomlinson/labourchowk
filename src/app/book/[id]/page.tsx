import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { WORKERS } from "@/data/workers";
import { getWorkerById } from "@/lib/db";

export function generateStaticParams() {
  return WORKERS.map((w) => ({ id: w.id }));
}

export const metadata: Metadata = {
  title: "Book a Worker",
  description: "Book a trusted worker in a few simple steps on Labour Chowk.",
  robots: { index: false },
};

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const worker = await getWorkerById(id);
  if (!worker) notFound();

  return (
    <SiteShell>
      <div className="container-lc py-8">
        <BookingWizard worker={worker} />
      </div>
    </SiteShell>
  );
}
