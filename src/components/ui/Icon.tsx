import type { SVGProps } from "react";

/**
 * Lightweight line-icon set drawn as inline SVG paths — no icon library
 * dependency, so the bundle stays small and icons match the brand stroke.
 */
export type IconName =
  | "bolt"
  | "droplet"
  | "hammer"
  | "roller"
  | "brick"
  | "snow"
  | "sparkle"
  | "helmet"
  | "hand"
  | "wheel"
  | "leaf"
  | "gear"
  | "spark"
  | "grid"
  | "dots"
  | "search"
  | "pin"
  | "star"
  | "check"
  | "shield"
  | "clock"
  | "wallet"
  | "chat"
  | "user"
  | "calendar"
  | "home"
  | "menu"
  | "close"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "filter"
  | "phone"
  | "bell"
  | "heart"
  | "camera"
  | "logout"
  | "plus"
  | "verified-badge"
  | "trend";

const PATHS: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" />,
  droplet: <path d="M12 2.5S5.5 9 5.5 14a6.5 6.5 0 0 0 13 0C18.5 9 12 2.5 12 2.5Z" />,
  hammer: (
    <>
      <path d="m14 6 4 4-8 8-4-4 8-8Z" />
      <path d="M14 6 18 2l4 4-4 4" />
    </>
  ),
  roller: (
    <>
      <rect x="3" y="4" width="12" height="5" rx="1" />
      <path d="M15 6h4v4h-7v3" />
      <rect x="9" y="13" width="6" height="8" rx="1" />
    </>
  ),
  brick: (
    <>
      <path d="M3 8h18M3 16h18M3 4v16M21 4v16M9 4v4M15 8v4M9 12v4M15 16v4" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 15l.9 2.1 2.1.9-2.1.9L19 21l-.9-2.1-2.1-.9 2.1-.9L19 15Z" />
  ),
  helmet: (
    <>
      <path d="M3 16a9 9 0 0 1 18 0" />
      <path d="M2 16h20v3H2zM9 7V4h6v3" />
    </>
  ),
  hand: (
    <path d="M8 11V5a1.5 1.5 0 0 1 3 0v5m0 0V4a1.5 1.5 0 0 1 3 0v6m0 0V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L5 15a1.6 1.6 0 0 1 2.6-1.8L8 14" />
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </>
  ),
  leaf: (
    <path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16a6 6 0 0 1-2-2ZM8 16c3-3 6-4 9-5" />
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2v6M12 16v6M6 12H2M22 12h-4" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14h2" />
    </>
  ),
  chat: (
    <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  home: <path d="M4 11 12 4l8 7M6 10v9h12v-9M10 19v-5h4v5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  phone: (
    <path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  ),
  bell: <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6M9.5 19a2.5 2.5 0 0 0 5 0" />,
  heart: (
    <path d="M12 20s-7-4.6-9.2-9A4.5 4.5 0 0 1 12 6.5 4.5 4.5 0 0 1 21.2 11C19 15.4 12 20 12 20Z" />
  ),
  camera: (
    <>
      <path d="M4 8h3l2-2h6l2 2h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  logout: <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 12H3m0 0 4-4m-4 4 4 4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  "verified-badge": (
    <>
      <path d="m12 2 2.3 1.7 2.8-.3 1 2.7 2.4 1.5-.6 2.8 1.4 2.5-1.7 2.2.3 2.8-2.7 1-1.2 2.6-2.8-.5L12 22l-2.2-1.7-2.8.5-1.2-2.6-2.7-1 .3-2.8L2 12.2l1.4-2.5-.6-2.8 2.4-1.5 1-2.7 2.8.3L12 2Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.7, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
