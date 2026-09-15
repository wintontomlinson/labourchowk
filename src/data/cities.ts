import type { City } from "@/lib/types";

export const CITIES: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", workerCount: 4820 },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", workerCount: 3140 },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", workerCount: 2760 },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", workerCount: 1980 },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", workerCount: 1610 },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh", workerCount: 940 },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
