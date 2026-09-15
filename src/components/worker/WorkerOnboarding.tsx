"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { SERVICES } from "@/data/services";
import { CITIES } from "@/data/cities";
import { cn } from "@/lib/utils";

const STEPS = [
  "Basic details",
  "Skills",
  "Experience",
  "Location",
  "Pricing",
  "Availability",
  "Verification",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface State {
  name: string;
  phone: string;
  photo: boolean;
  skills: string[];
  experience: number;
  city: string;
  areas: string;
  priceModel: "day" | "hour" | "visit";
  price: string;
  days: string[];
  start: string;
  end: string;
  documentsAck: boolean;
}

export function WorkerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [state, setState] = useState<State>({
    name: "",
    phone: "",
    photo: false,
    skills: [],
    experience: 0,
    city: "delhi",
    areas: "",
    priceModel: "visit",
    price: "",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    start: "09:00",
    end: "19:00",
    documentsAck: false,
  });

  const set = <K extends keyof State>(k: K, v: State[K]) => setState((s) => ({ ...s, [k]: v }));
  const toggle = (arr: keyof Pick<State, "skills" | "days">, value: string) =>
    setState((s) => ({
      ...s,
      [arr]: (s[arr] as string[]).includes(value)
        ? (s[arr] as string[]).filter((x) => x !== value)
        : [...(s[arr] as string[]), value],
    }));

  const valid = (() => {
    switch (step) {
      case 0:
        return state.name.trim().length > 2 && /^\d{10}$/.test(state.phone);
      case 1:
        return state.skills.length > 0;
      case 2:
        return state.experience >= 0;
      case 3:
        return !!state.city && state.areas.trim().length > 1;
      case 4:
        return Number(state.price) > 0;
      case 5:
        return state.days.length > 0;
      case 6:
        return state.documentsAck;
      default:
        return true;
    }
  })();

  const progress = ((step + 1) / STEPS.length) * 100;

  if (done) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-ivory-100 px-5 py-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-verified-50 text-verified-600 animate-check-pop">
          <Icon name="check" size={40} strokeWidth={2.6} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-ink">
          Your profile is ready for review
        </h1>
        <p className="mt-2 max-w-md text-ink-600">
          Thanks, {state.name.split(" ")[0] || "there"}! We&apos;ll review your details and your
          verification status will be shown on your profile. You can start setting up jobs now.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/worker/dashboard" className="btn-primary btn-md">Go to Dashboard</Link>
          <Link href="/" className="btn-outline btn-md">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-ivory-100">
      <header className="flex h-16 items-center border-b border-ink/[0.07] px-5">
        <Logo />
        <Link href="/" className="ml-auto text-sm font-medium text-ink-600 hover:text-ink">
          Exit
        </Link>
      </header>

      <div className="mx-auto max-w-xl px-5 py-8 sm:py-12">
        {/* Progress */}
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">Step {step + 1} of {STEPS.length}</span>
            <span className="text-ink-500">{STEPS[step]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.08]">
            <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-card sm:p-7">
          {step === 0 && (
            <Step title="Let's start with the basics" subtitle="Tell us who you are.">
              <div className="mb-4 flex items-center gap-4">
                <button
                  onClick={() => set("photo", !state.photo)}
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed",
                    state.photo ? "border-verified-500 bg-verified-50 text-verified-600" : "border-ink/20 text-ink-500"
                  )}
                >
                  <Icon name={state.photo ? "check" : "camera"} size={24} />
                </button>
                <div>
                  <p className="text-sm font-medium text-ink">Profile photo</p>
                  <p className="text-xs text-ink-500">A clear photo builds trust with customers.</p>
                </div>
              </div>
              <Field label="Full name">
                <input value={state.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Rakesh Kumar" className="input" />
              </Field>
              <Field label="Mobile number">
                <div className="flex overflow-hidden rounded-xl border border-ink/15 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20">
                  <span className="flex items-center border-r border-ink/10 bg-ivory-50 px-3 text-sm font-medium text-ink-700">+91</span>
                  <input
                    value={state.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    inputMode="numeric"
                    placeholder="10-digit number"
                    className="h-11 flex-1 px-3 focus:outline-none"
                  />
                </div>
              </Field>
            </Step>
          )}

          {step === 1 && (
            <Step title="What work do you do?" subtitle="Select all the services you offer.">
              <div className="flex flex-wrap gap-2">
                {SERVICES.filter((s) => s.slug !== "other").map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => toggle("skills", s.name)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                      state.skills.includes(s.name)
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-ink/10 text-ink-700 hover:border-ink/25"
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="How much experience do you have?" subtitle="Years of experience in your main skill.">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={state.experience}
                  onChange={(e) => set("experience", Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <span className="w-24 rounded-xl bg-ivory-100 py-2 text-center font-display text-lg font-bold text-ink">
                  {state.experience} yrs
                </span>
              </div>
            </Step>
          )}

          {step === 3 && (
            <Step title="Where do you work?" subtitle="Set your city and the areas you serve.">
              <Field label="City">
                <select value={state.city} onChange={(e) => set("city", e.target.value)} className="input">
                  {CITIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Areas served">
                <input
                  value={state.areas}
                  onChange={(e) => set("areas", e.target.value)}
                  placeholder="e.g. Laxmi Nagar, Preet Vihar, Shakarpur"
                  className="input"
                />
              </Field>
            </Step>
          )}

          {step === 4 && (
            <Step title="Set your pricing" subtitle="You can change this anytime later.">
              <Field label="Pricing type">
                <div className="grid grid-cols-3 gap-2">
                  {(["visit", "hour", "day"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => set("priceModel", m)}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm font-medium capitalize transition-colors",
                        state.priceModel === m ? "border-amber-500 bg-amber-50 text-amber-800" : "border-ink/10 text-ink-700"
                      )}
                    >
                      Per {m}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`Your rate (₹ per ${state.priceModel})`}>
                <div className="flex overflow-hidden rounded-xl border border-ink/15 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20">
                  <span className="flex items-center border-r border-ink/10 bg-ivory-50 px-3 text-sm font-medium text-ink-700">₹</span>
                  <input
                    value={state.price}
                    onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    placeholder="e.g. 500"
                    className="h-11 flex-1 px-3 focus:outline-none"
                  />
                </div>
              </Field>
            </Step>
          )}

          {step === 5 && (
            <Step title="When are you available?" subtitle="Select your working days and hours.">
              <Field label="Working days">
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggle("days", d)}
                      className={cn(
                        "h-11 w-14 rounded-xl border text-sm font-medium transition-colors",
                        state.days.includes(d) ? "border-amber-500 bg-amber-500 text-white" : "border-ink/10 text-ink-700"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start time">
                  <input type="time" value={state.start} onChange={(e) => set("start", e.target.value)} className="input" />
                </Field>
                <Field label="End time">
                  <input type="time" value={state.end} onChange={(e) => set("end", e.target.value)} className="input" />
                </Field>
              </div>
            </Step>
          )}

          {step === 6 && (
            <Step title="Verification" subtitle="Verification helps you get more jobs and builds customer trust.">
              <div className="rounded-xl border border-ink/[0.07] bg-ivory-50 p-4">
                <p className="text-sm font-semibold text-ink">What you&apos;ll need later:</p>
                <ul className="mt-2 space-y-2 text-sm text-ink-700">
                  {["A government ID for identity check", "A recent photo of yourself", "Proof of your work address"].map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <Icon name="check" size={15} className="text-verified-500" strokeWidth={2.4} />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink-500">
                  You don&apos;t need to upload anything now. We&apos;ll ask for documents securely when
                  verification opens for your account. Your verification status is always shown clearly on your profile.
                </p>
              </div>
              <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-ink-800">
                <input
                  type="checkbox"
                  checked={state.documentsAck}
                  onChange={(e) => set("documentsAck", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-amber-500"
                />
                I understand and agree to complete verification when requested.
              </label>
            </Step>
          )}

          {/* Nav */}
          <div className="mt-7 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-ghost btn-md">Back</button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={!valid} className="btn-primary btn-md">
                Continue <Icon name="arrow-right" size={17} />
              </button>
            ) : (
              <button onClick={() => setDone(true)} disabled={!valid} className="btn-primary btn-md">
                Submit profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        <p className="mt-1 text-sm text-ink-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
