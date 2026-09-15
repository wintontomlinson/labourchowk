"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { WorkerCard, WorkerCardSkeleton } from "@/components/worker/WorkerCard";
import { Icon } from "@/components/ui/Icon";
import { EmptyState, ErrorState } from "@/components/ui/States";
import { Map } from "@/components/map/Map";
import { workerCoords, cityCenter, DELHI_CENTER } from "@/lib/geo";
import { useGeolocation, distanceKm } from "@/lib/useGeolocation";
import { CITIES } from "@/data/cities";
import { SERVICES } from "@/data/services";
import {
  applyWorkerFilters,
  SORT_OPTIONS,
  type SortKey,
  type WorkerFilters,
} from "@/lib/queries";
import type { LatLng, Worker } from "@/lib/types";
import { cn, formatINR } from "@/lib/utils";

const PRICE_CAP = 900; // slider max (matches the priciest demo workers)

const DISTANCES = [2, 5, 10, 25];
const RATINGS = [4.5, 4, 3.5];
const EXPERIENCE = [2, 5, 10];

export function FindWorkersClient() {
  const params = useSearchParams();
  const maxP = PRICE_CAP;

  // Workers are loaded from the database via the API so newly-registered
  // workers show up here. Filtering/sorting then happens instantly client-side.
  const [allWorkers, setAllWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [filters, setFilters] = useState<WorkerFilters>({
    q: params.get("q") ?? undefined,
    service: params.get("service") ?? undefined,
    city: params.get("city") ?? undefined,
  });
  const [sort, setSort] = useState<SortKey>("recommended");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(maxP);
  const [view, setView] = useState<"list" | "map">("list");

  function loadWorkers() {
    setLoading(true);
    setLoadError(false);
    fetch("/api/workers")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setAllWorkers(d.workers ?? []))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadWorkers();
  }, []);

  // User location: seeded from URL (?lat&lng from the homepage) or detected here.
  const urlLat = params.get("lat");
  const urlLng = params.get("lng");
  const [userLoc, setUserLoc] = useState<LatLng | null>(
    urlLat && urlLng ? { lat: Number(urlLat), lng: Number(urlLng) } : null
  );
  const geo = useGeolocation((s) => {
    if (s.coords) {
      setUserLoc(s.coords);
      if (s.city) setFilters((f) => ({ ...f, city: s.city!.slug }));
      setView("map");
    }
  });

  const results = useMemo(() => {
    const list = applyWorkerFilters(
      allWorkers,
      { ...filters, maxPrice: maxPrice < maxP ? maxPrice : undefined },
      sort
    );
    // When we know the user's location, sort by real distance from them.
    if (userLoc) {
      return [...list].sort(
        (a, b) =>
          distanceKm(userLoc, workerCoords(a)) - distanceKm(userLoc, workerCoords(b))
      );
    }
    return list;
  }, [allWorkers, filters, sort, maxPrice, maxP, userLoc]);

  const mapCenter = userLoc ?? (filters.city ? cityCenter(filters.city) : DELHI_CENTER);
  const mapPins = [
    ...(userLoc
      ? [{ id: "__you", lat: userLoc.lat, lng: userLoc.lng, title: "You are here", isUser: true as const }]
      : []),
    ...results.map((w) => {
      const c = workerCoords(w);
      return {
        id: w.id,
        lat: c.lat,
        lng: c.lng,
        title: w.name,
        subtitle: userLoc
          ? `${w.profession} · ~${distanceKm(userLoc, c).toFixed(1)} km away`
          : `${w.profession} · ${w.area}`,
        href: `/worker/${w.id}`,
      };
    }),
  ];

  function update<K extends keyof WorkerFilters>(key: K, value: WorkerFilters[K]) {
    setFilters((f) => ({ ...f, [key]: f[key] === value ? undefined : value }));
  }

  const activeCount =
    Object.values(filters).filter((v) => v !== undefined && v !== "").length +
    (maxPrice < maxP ? 1 : 0);

  function clearAll() {
    setFilters({ q: filters.q });
    setMaxPrice(maxP);
  }

  const FilterPanel = (
    <div className="space-y-6">
      <FilterGroup title="Service">
        <div className="flex flex-wrap gap-1.5">
          {SERVICES.filter((s) => s.slug !== "other").map((s) => (
            <button
              key={s.slug}
              onClick={() => update("service", s.slug)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[13px] transition-colors",
                filters.service === s.slug
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-ink/10 text-ink-700 hover:border-ink/25"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Distance">
        <RadioRow
          options={DISTANCES.map((d) => ({ label: `Within ${d} km`, value: d }))}
          value={filters.maxDistance}
          onChange={(v) => update("maxDistance", v)}
        />
      </FilterGroup>

      <FilterGroup title="Rating">
        <RadioRow
          options={RATINGS.map((r) => ({ label: `${r}+ stars`, value: r }))}
          value={filters.minRating}
          onChange={(v) => update("minRating", v)}
        />
      </FilterGroup>

      <FilterGroup title="Experience">
        <RadioRow
          options={EXPERIENCE.map((e) => ({ label: `${e}+ years`, value: e }))}
          value={filters.minExperience}
          onChange={(v) => update("minExperience", v)}
        />
      </FilterGroup>

      <FilterGroup title={`Max price — ${formatINR(maxPrice)}`}>
        <input
          type="range"
          min={200}
          max={maxP}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-500">
          <span>{formatINR(200)}</span>
          <span>{formatINR(maxP)}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="More">
        <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-ink-800">
          <input
            type="checkbox"
            checked={!!filters.availableToday}
            onChange={(e) => setFilters((f) => ({ ...f, availableToday: e.target.checked || undefined }))}
            className="h-4 w-4 accent-amber-500"
          />
          Available today
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-ink-800">
          <input
            type="checkbox"
            checked={!!filters.verifiedOnly}
            onChange={(e) => setFilters((f) => ({ ...f, verifiedOnly: e.target.checked || undefined }))}
            className="h-4 w-4 accent-amber-500"
          />
          Verified only
        </label>
      </FilterGroup>
    </div>
  );

  return (
    <div className="container-lc py-6">
      {/* Search + location bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-3.5">
          <Icon name="search" size={19} className="text-ink-500" />
          <input
            value={filters.q ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value || undefined }))}
            placeholder="Search service or worker"
            className="h-11 w-full bg-transparent text-[15px] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-ink/10 bg-white px-3.5 sm:w-56">
          <Icon name="pin" size={19} className="text-amber-500" />
          <select
            value={filters.city ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value || undefined }))}
            className="h-11 w-full bg-transparent text-[15px] focus:outline-none"
          >
            <option value="">All of Delhi-NCR</option>
            {CITIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={geo.locate}
          disabled={geo.status === "locating"}
          className="btn-outline btn-md shrink-0 justify-center sm:w-auto"
        >
          {geo.status === "locating" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-amber-500" />
              Locating…
            </>
          ) : (
            <>
              <Icon name="pin" size={17} className="text-amber-500" />
              Use my location
            </>
          )}
        </button>
      </div>

      {/* Location status / active banner */}
      {geo.message && geo.status !== "success" && (
        <p className="mt-2 text-xs text-danger-500">{geo.message}</p>
      )}
      {userLoc && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-verified-100 bg-verified-50/60 px-3.5 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-verified-700">
            <Icon name="pin" size={15} /> Showing workers nearest to your location
          </span>
          <button
            onClick={() => {
              setUserLoc(null);
              geo.reset();
            }}
            className="text-xs font-semibold text-verified-700 underline-offset-2 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Filters</h2>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-sm font-medium text-amber-600 hover:text-amber-700">
                  Clear all
                </button>
              )}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-600">
              {loading ? (
                "Loading workers…"
              ) : (
                <>
                  <span className="font-semibold text-ink">{results.length}</span> worker
                  {results.length !== 1 ? "s" : ""} found
                </>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSheetOpen(true)}
                className="btn-outline btn-sm lg:hidden"
              >
                <Icon name="filter" size={16} />
                Filters
                {activeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              {/* List / Map toggle */}
              <div className="flex items-center rounded-lg border border-ink/10 bg-white p-0.5">
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                    view === "list" ? "bg-ink text-ivory-100" : "text-ink-600"
                  )}
                  aria-label="List view"
                >
                  <Icon name="menu" size={15} /> <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setView("map")}
                  className={cn(
                    "flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                    view === "map" ? "bg-ink text-ivory-100" : "text-ink-600"
                  )}
                  aria-label="Map view"
                >
                  <Icon name="pin" size={15} /> <span className="hidden sm:inline">Map</span>
                </button>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-ink/10 bg-white px-2">
                <span className="hidden text-xs text-ink-500 sm:inline">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 bg-transparent text-sm font-medium focus:outline-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <WorkerCardSkeleton key={i} />
              ))}
            </div>
          ) : loadError ? (
            <ErrorState
              title="Couldn't load workers"
              description="There was a problem fetching workers. Please try again."
              onRetry={loadWorkers}
            />
          ) : results.length === 0 ? (
            <EmptyState
              icon="search"
              title="No workers found"
              description="Try widening your distance, lowering the rating filter, or clearing filters to see more workers in your area."
              actionLabel="Clear filters"
              actionHref="/find-workers"
            />
          ) : view === "map" ? (
            <Map
              center={mapCenter}
              zoom={userLoc ? 13 : filters.city ? 12 : 11}
              pins={mapPins}
              mapClassName="h-[420px] sm:h-[560px]"
              showLocate
              onLocate={(p) => setUserLoc(p)}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((w) => (
                <WorkerCard key={w.id} worker={w} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 animate-fade-in"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-card-hover animate-slide-up">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink">Filters</h2>
              <button onClick={() => setSheetOpen(false)} className="text-ink-500">
                <Icon name="close" size={22} />
              </button>
            </div>
            {FilterPanel}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={clearAll} className="btn-outline btn-md">
                Clear all
              </button>
              <button onClick={() => setSheetOpen(false)} className="btn-primary btn-md">
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function RadioRow({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: number }[];
  value?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-left text-sm transition-colors",
            value === o.value ? "font-semibold text-ink" : "text-ink-700 hover:text-ink"
          )}
        >
          <span
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded-full border",
              value === o.value ? "border-amber-500" : "border-ink/25"
            )}
          >
            {value === o.value && <span className="h-2 w-2 rounded-full bg-amber-500" />}
          </span>
          {o.label}
        </button>
      ))}
    </div>
  );
}
