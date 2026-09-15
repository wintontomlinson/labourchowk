import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { WORKERS } from "@/data/workers";

const BASE = "https://labourchowk.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/find-workers",
    "/services",
    "/how-it-works",
    "/worker",
    "/about",
    "/contact",
    "/careers",
    "/press",
    "/help",
    "/safety",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cancellation",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const workerRoutes = WORKERS.map((w) => ({
    url: `${BASE}/worker/${w.id}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workerRoutes];
}
