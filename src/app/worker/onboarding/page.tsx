import type { Metadata } from "next";
import { WorkerOnboarding } from "@/components/worker/WorkerOnboarding";

export const metadata: Metadata = {
  title: "Become a Worker",
  description: "Create your Labour Chowk worker profile in a few simple steps.",
  robots: { index: false },
};

export default function WorkerOnboardingPage() {
  return <WorkerOnboarding />;
}
