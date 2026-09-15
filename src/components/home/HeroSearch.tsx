"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CITIES } from "@/data/cities";
import { POPULAR_SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";
import { useGeolocation } from "@/lib/useGeolocation";

const SUGGESTIONS = ["Electrician", "Plumber", "Carpenter", "Painter", "Mason", "Cleaning"];

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [focused, setFocused] = useState(false);

  // Real browser geolocation → fills the nearest city automatically.
  const geo = useGeolocation((s) => {
    if (s.city) setCity(s.city.name);
  });
  const detecting = geo.status === "locating";

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const match = CITIES.find((c) => c.name.toLowerCase() === city.toLowerCase());
    if (match) params.set("city", match.slug);
    // Pass detected coordinates so the results page can sort by real distance.
    if (geo.coords) {
      params.set("lat", geo.coords.lat.toFixed(5));
      params.set("lng", geo.coords.lng.toFixed(5));
    }
    router.push(`/find-workers?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-ink/[0.07] bg-white p-2.5 shadow-card-hover sm:p-3"
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-stretch">
        {/* Service */}
        <div
          className={cn(
            "flex flex-1 items-center gap-2.5 rounded-xl border px-3.5 transition-colors",
            focused ? "border-amber-400 ring-2 ring-amber-500/15" : "border-ink/10"
          )}
        >
          <Icon name="search" size={20} className="shrink-0 text-ink-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What work do you need?"
            className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-500/70 focus:outline-none"
            list="service-suggestions"
          />
          <datalist id="service-suggestions">
            {POPULAR_SERVICES.map((s) => (
              <option key={s.slug} value={s.name} />
            ))}
          </datalist>
        </div>

        {/* Location */}
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-ink/10 px-3.5 md:max-w-[280px]">
          <Icon name="pin" size={20} className="shrink-0 text-amber-500" />
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your location"
            className="h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-500/70 focus:outline-none"
            list="city-suggestions"
          />
          <datalist id="city-suggestions">
            {CITIES.map((c) => (
              <option key={c.slug} value={c.name} />
            ))}
          </datalist>
          <button
            type="button"
            onClick={geo.locate}
            disabled={detecting}
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-amber-600 hover:text-amber-700 disabled:opacity-70"
          >
            {detecting ? (
              <>
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-600" />
                Locating…
              </>
            ) : (
              <>
                <Icon name="pin" size={13} />
                Use my location
              </>
            )}
          </button>
        </div>

        <button type="submit" className="btn-primary btn-lg md:w-auto md:px-8">
          Find a Worker
        </button>
      </div>

      {/* Geolocation status */}
      {geo.message && (
        <p
          className={cn(
            "mt-2 px-1 text-xs",
            geo.status === "success" ? "text-verified-600" : "text-danger-500"
          )}
        >
          {geo.status === "success" && geo.cityKm != null
            ? `${geo.message} (~${Math.round(geo.cityKm)} km away)`
            : geo.message}
        </p>
      )}

      {/* Quick suggestions */}
      <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
        <span className="text-xs font-medium text-ink-500">Popular:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQuery(s);
              const params = new URLSearchParams({ q: s });
              router.push(`/find-workers?${params.toString()}`);
            }}
            className="rounded-full border border-ink/10 bg-ivory-50 px-3 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700"
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}
