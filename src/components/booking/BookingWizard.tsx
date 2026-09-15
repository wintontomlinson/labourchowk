"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Worker } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { RatingInline } from "@/components/ui/Rating";
import { VerifiedBadge } from "@/components/ui/Badge";
import { generateBookingId } from "@/data/bookings";
import { CITIES } from "@/data/cities";
import { cn, priceLabel } from "@/lib/utils";

interface BookingState {
  service: string;
  description: string;
  photos: string[]; // file names
  date: string;
  time: string;
  house: string;
  area: string;
  city: string;
}

const TIME_SLOTS = [
  "09:00 AM – 11:00 AM",
  "11:00 AM – 01:00 PM",
  "02:00 PM – 04:00 PM",
  "04:00 PM – 06:00 PM",
  "Full day (9 AM – 6 PM)",
];

const STEP_LABELS = [
  "Service",
  "Details",
  "Photos",
  "Date",
  "Time",
  "Location",
  "Review",
];

export function BookingWizard({ worker }: { worker: Worker }) {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const commonServices = useMemo(
    () => [worker.profession, ...worker.skills].slice(0, 6),
    [worker]
  );

  const [state, setState] = useState<BookingState>({
    service: worker.profession,
    description: "",
    photos: [],
    date: "",
    time: "",
    house: "",
    area: worker.serviceAreas[0] ?? "",
    city: worker.city,
  });

  const set = <K extends keyof BookingState>(k: K, v: BookingState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const stepValid = (() => {
    switch (step) {
      case 0:
        return !!state.service;
      case 1:
        return state.description.trim().length > 4;
      case 3:
        return !!state.date;
      case 4:
        return !!state.time;
      case 5:
        return state.house.trim().length > 2 && !!state.city;
      default:
        return true;
    }
  })();

  function next() {
    if (step < STEP_LABELS.length - 1) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function confirm() {
    setSubmitting(true);
    setTimeout(() => {
      setBookingId(generateBookingId());
      setConfirmed(true);
      setSubmitting(false);
    }, 1200);
  }

  const cityName = CITIES.find((c) => c.slug === state.city)?.name ?? state.city;
  const estimated = worker.price;

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg py-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-verified-50 text-verified-600 animate-check-pop">
          <Icon name="check" size={40} strokeWidth={2.6} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink">Booking request sent</h1>
        <p className="mt-2 text-ink-600">
          Your request has been sent to {worker.name}. You&apos;ll be notified once it&apos;s accepted.
        </p>

        <div className="mt-7 rounded-card border border-ink/[0.07] bg-white p-5 text-left shadow-card">
          <div className="flex items-center justify-between border-b border-ink/[0.06] pb-3">
            <span className="text-sm text-ink-500">Booking ID</span>
            <span className="font-display text-base font-bold text-ink">{bookingId}</span>
          </div>
          <dl className="mt-3 space-y-2.5 text-sm">
            <Row label="Worker" value={worker.name} />
            <Row label="Service" value={state.service} />
            <Row label="Date" value={state.date || "—"} />
            <Row label="Time" value={state.time} />
            <Row label="Location" value={`${state.house}, ${state.area}, ${cityName}`} />
            <Row label="Estimated price" value={priceLabel(estimated, worker.priceModel)} strong />
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link href="/dashboard/bookings" className="btn-primary btn-md">
            View Booking
          </Link>
          <Link href="/find-workers" className="btn-outline btn-md">
            Book another worker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href={`/worker/${worker.id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink"
      >
        <Icon name="chevron-right" size={16} className="rotate-180" />
        Back to profile
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-card sm:p-7">
          {/* Progress */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">
                Step {step + 1} of {STEP_LABELS.length}
              </span>
              <span className="text-ink-500">{STEP_LABELS[step]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.08]">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="min-h-[260px]">
            {step === 0 && (
              <StepShell title="Which service do you need?" subtitle="Select what you'd like this worker to do.">
                <div className="grid gap-2 sm:grid-cols-2">
                  {commonServices.map((s) => (
                    <button
                      key={s}
                      onClick={() => set("service", s)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                        state.service === s
                          ? "border-amber-500 bg-amber-50 text-amber-800"
                          : "border-ink/10 text-ink-700 hover:border-ink/25"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          state.service === s ? "border-amber-500 bg-amber-500 text-white" : "border-ink/25"
                        )}
                      >
                        {state.service === s && <Icon name="check" size={12} strokeWidth={3} />}
                      </span>
                      {s}
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Describe the work" subtitle="A few details help the worker come prepared.">
                <textarea
                  value={state.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={5}
                  placeholder="e.g. 2 ceiling fans install karne hain aur ek switchboard se spark aa raha hai…"
                  className="input h-auto py-3 leading-relaxed"
                />
                <p className="mt-2 text-xs text-ink-500">{state.description.length}/500 characters</p>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell title="Add photos (optional)" subtitle="Photos of the problem area help with an accurate estimate.">
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => set("photos", [...state.photos, `photo-${state.photos.length + 1}.jpg`])}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink/20 text-ink-500 hover:border-amber-400 hover:text-amber-600"
                  >
                    <Icon name="camera" size={24} />
                    <span className="text-xs">Add photo</span>
                  </button>
                  {state.photos.map((p, i) => (
                    <div key={i} className="relative flex aspect-square items-center justify-center rounded-xl bg-ivory-200 text-ink-500">
                      <Icon name="camera" size={22} />
                      <button
                        onClick={() => set("photos", state.photos.filter((_, idx) => idx !== i))}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink-600 shadow"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell title="Select a date" subtitle="When would you like the work done?">
                <input
                  type="date"
                  value={state.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("date", e.target.value)}
                  className="input"
                />
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Select a time slot" subtitle="Pick a window that works for you.">
                <div className="grid gap-2 sm:grid-cols-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => set("time", slot)}
                      className={cn(
                        "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                        state.time === slot
                          ? "border-amber-500 bg-amber-50 text-amber-800"
                          : "border-ink/10 text-ink-700 hover:border-ink/25"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Where is the work?" subtitle="Enter the address for the visit.">
                <div className="space-y-3">
                  <div>
                    <label className="label">House / Flat / Building</label>
                    <input
                      value={state.house}
                      onChange={(e) => set("house", e.target.value)}
                      placeholder="e.g. B-42, Second floor"
                      className="input"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="label">Area / Locality</label>
                      <input
                        value={state.area}
                        onChange={(e) => set("area", e.target.value)}
                        placeholder="e.g. Laxmi Nagar"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">City</label>
                      <select value={state.city} onChange={(e) => set("city", e.target.value)} className="input">
                        {CITIES.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Review your booking" subtitle="Please confirm the details below.">
                <dl className="space-y-2.5 rounded-xl bg-ivory-50 p-4 text-sm">
                  <Row label="Service" value={state.service} />
                  <Row label="Details" value={state.description || "—"} />
                  <Row label="Photos" value={state.photos.length ? `${state.photos.length} added` : "None"} />
                  <Row label="Date" value={state.date || "—"} />
                  <Row label="Time" value={state.time || "—"} />
                  <Row label="Location" value={`${state.house}, ${state.area}, ${cityName}`} />
                </dl>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <span className="text-sm font-medium text-ink">Estimated price</span>
                  <span className="font-display text-lg font-extrabold text-ink">
                    {priceLabel(estimated, worker.priceModel)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-ink-500">
                  This is an estimate. Final cost is agreed with the worker before work begins.
                </p>
              </StepShell>
            )}
          </div>

          {/* Nav buttons */}
          <div className="mt-7 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button onClick={back} className="btn-ghost btn-md">
                Back
              </button>
            ) : (
              <span />
            )}
            {step < STEP_LABELS.length - 1 ? (
              <button onClick={next} disabled={!stepValid} className="btn-primary btn-md">
                Continue
                <Icon name="arrow-right" size={17} />
              </button>
            ) : (
              <button onClick={confirm} disabled={submitting} className="btn-primary btn-md min-w-[160px]">
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Spinner /> Sending…
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Worker summary rail */}
        <aside className="order-first lg:order-last">
          <div className="rounded-card border border-ink/[0.07] bg-white p-4 shadow-card lg:sticky lg:top-20">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-ivory-200">
                <Image src={worker.photo} alt={worker.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display font-bold text-ink">{worker.name}</p>
                <p className="text-sm text-ink-600">{worker.profession}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <RatingInline value={worker.rating} count={worker.reviewCount} size={13} />
              <VerifiedBadge status={worker.verification} />
            </div>
            <div className="mt-4 space-y-1.5 border-t border-ink/[0.06] pt-3 text-sm">
              <Row label="Rate" value={priceLabel(worker.price, worker.priceModel)} />
              <Row label="Area" value={worker.area} />
              <Row label="Distance" value={`${worker.distanceKm} km`} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <p className="mb-4 mt-1 text-sm text-ink-600">{subtitle}</p>
      {children}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-ink-500">{label}</dt>
      <dd className={cn("text-right", strong ? "font-bold text-ink" : "text-ink-800")}>{value}</dd>
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}
