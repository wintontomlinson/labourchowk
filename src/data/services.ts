import type { ServiceCategory } from "@/lib/types";

/**
 * Service catalogue. Prices are realistic starting points for the Delhi-NCR
 * market and are shown as "from" figures — the real cost is set per worker.
 */
export const SERVICES: ServiceCategory[] = [
  {
    slug: "electrician",
    name: "Electrician",
    tagline: "Repairs, wiring & installation",
    description:
      "Licensed electricians for fan and light installation, wiring, switchboard repair, MCB and inverter work, and general electrical troubleshooting for homes and shops.",
    icon: "bolt",
    priceFrom: 250,
    priceModel: "visit",
    popular: true,
  },
  {
    slug: "plumber",
    name: "Plumber",
    tagline: "Leaks, fittings & drainage",
    description:
      "Experienced plumbers for tap and pipe repairs, bathroom fittings, motor and tank installation, blockage clearing and full bathroom plumbing work.",
    icon: "droplet",
    priceFrom: 250,
    priceModel: "visit",
    popular: true,
  },
  {
    slug: "carpenter",
    name: "Carpenter",
    tagline: "Furniture, doors & repairs",
    description:
      "Skilled carpenters for furniture making and repair, door and window fitting, modular kitchen work, bed and almirah assembly, and custom woodwork.",
    icon: "hammer",
    priceFrom: 350,
    priceModel: "visit",
    popular: true,
  },
  {
    slug: "painter",
    name: "Painter",
    tagline: "Walls, texture & polishing",
    description:
      "Professional painters for interior and exterior painting, texture and putty work, waterproofing, wood polishing and full home repainting.",
    icon: "roller",
    priceFrom: 600,
    priceModel: "day",
    popular: true,
  },
  {
    slug: "mason",
    name: "Mason",
    tagline: "Brickwork, plaster & tiling",
    description:
      "Reliable masons (raj mistri) for brickwork, plastering, concrete work, flooring, boundary walls and small construction and repair jobs.",
    icon: "brick",
    priceFrom: 700,
    priceModel: "day",
    popular: true,
  },
  {
    slug: "ac-technician",
    name: "AC Technician",
    tagline: "Service, repair & installation",
    description:
      "AC technicians for split and window AC servicing, gas refilling, installation and uninstallation, and repair of cooling and drainage issues.",
    icon: "snow",
    priceFrom: 450,
    priceModel: "visit",
    popular: true,
  },
  {
    slug: "cleaning",
    name: "Cleaning",
    tagline: "Home, kitchen & bathroom",
    description:
      "Deep cleaning helpers for full home, kitchen, bathroom and sofa cleaning, along with move-in and move-out cleaning services.",
    icon: "sparkle",
    priceFrom: 500,
    priceModel: "visit",
    popular: true,
  },
  {
    slug: "construction-labour",
    name: "Construction Labour",
    tagline: "Daily wage skilled labour",
    description:
      "Hardworking construction labourers (mazdoor) for site work, material loading, digging, demolition support and general daily-wage construction help.",
    icon: "helmet",
    priceFrom: 550,
    priceModel: "day",
    popular: false,
  },
  {
    slug: "helper",
    name: "Helper",
    tagline: "General daily-wage help",
    description:
      "General-purpose helpers for shifting, lifting, cleaning support and assisting skilled workers on any job.",
    icon: "hand",
    priceFrom: 500,
    priceModel: "day",
    popular: false,
  },
  {
    slug: "driver",
    name: "Driver",
    tagline: "Local & outstation driving",
    description:
      "Verified drivers for local city driving, outstation trips, monthly hire and one-time requirements. Both manual and automatic experience.",
    icon: "wheel",
    priceFrom: 800,
    priceModel: "day",
    popular: false,
  },
  {
    slug: "gardener",
    name: "Gardener",
    tagline: "Planting & maintenance",
    description:
      "Gardeners (maali) for lawn maintenance, planting, hedge trimming, garden setup and regular upkeep for homes and societies.",
    icon: "leaf",
    priceFrom: 400,
    priceModel: "visit",
    popular: false,
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    tagline: "Washing machine, fridge & more",
    description:
      "Technicians for washing machine, refrigerator, microwave, geyser and RO water purifier repair and servicing at home.",
    icon: "gear",
    priceFrom: 300,
    priceModel: "visit",
    popular: false,
  },
  {
    slug: "welder",
    name: "Welder",
    tagline: "Grills, gates & fabrication",
    description:
      "Welders for gate and grill fabrication, railing work, repair of metal furniture and on-site welding jobs.",
    icon: "spark",
    priceFrom: 650,
    priceModel: "day",
    popular: false,
  },
  {
    slug: "tile-worker",
    name: "Tile Worker",
    tagline: "Flooring & wall tiling",
    description:
      "Tile workers for floor and wall tiling, marble and granite fitting, bathroom tiling and grouting with a clean, level finish.",
    icon: "grid",
    priceFrom: 700,
    priceModel: "day",
    popular: false,
  },
  {
    slug: "other",
    name: "Other",
    tagline: "Describe your custom job",
    description:
      "Have a job that doesn't fit the usual categories? Post your requirement and we'll help you find the right worker for it.",
    icon: "dots",
    priceFrom: 0,
    priceModel: "visit",
    popular: false,
  },
];

export const POPULAR_SERVICES = SERVICES.filter((s) => s.popular);

export function getService(slug: string): ServiceCategory | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceByName(name: string): ServiceCategory | undefined {
  return SERVICES.find((s) => s.name.toLowerCase() === name.toLowerCase());
}
