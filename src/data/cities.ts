import type { City } from "@/lib/types";

export const CITIES: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", workerCount: 4820, lat: 28.6448, lng: 77.2167 },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", workerCount: 3140, lat: 28.4595, lng: 77.0266 },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", workerCount: 2760, lat: 28.5355, lng: 77.391 },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", workerCount: 1980, lat: 28.6692, lng: 77.4538 },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", workerCount: 1610, lat: 28.4089, lng: 77.3178 },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh", workerCount: 940, lat: 28.4744, lng: 77.5040 },
];

/** Approximate coordinates for known Delhi-NCR localities used in demo data. */
export const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  "Laxmi Nagar": { lat: 28.6304, lng: 77.2773 },
  "Preet Vihar": { lat: 28.6412, lng: 77.2952 },
  "Shakarpur": { lat: 28.6345, lng: 77.2782 },
  "Nirman Vihar": { lat: 28.6360, lng: 77.2900 },
  "Rohini": { lat: 28.7439, lng: 77.0728 },
  "Pitampura": { lat: 28.7030, lng: 77.1310 },
  "Dwarka": { lat: 28.5921, lng: 77.0460 },
  "Saket": { lat: 28.5245, lng: 77.2100 },
  "Mayur Vihar": { lat: 28.6090, lng: 77.2950 },
  "Vasant Kunj": { lat: 28.5200, lng: 77.1590 },
  "Sector 45": { lat: 28.4490, lng: 77.0640 },
  "DLF Phase 3": { lat: 28.4930, lng: 77.0930 },
  "Sector 56": { lat: 28.4210, lng: 77.1030 },
  "Sector 23": { lat: 28.4980, lng: 77.0490 },
  "Sector 62": { lat: 28.6270, lng: 77.3720 },
  "Sector 76": { lat: 28.5700, lng: 77.3860 },
  "Sector 50": { lat: 28.5690, lng: 77.3600 },
  "Vaishali": { lat: 28.6500, lng: 77.3390 },
  "Loni": { lat: 28.7520, lng: 77.2880 },
  "Sector 15": { lat: 28.4110, lng: 77.3130 },
};

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
