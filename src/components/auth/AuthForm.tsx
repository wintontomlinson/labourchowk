"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

type Role = "customer" | "worker";
type Method = "phone" | "email";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();

  const [role, setRole] = useState<Role>((params.get("role") as Role) || "customer");
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const phoneValid = /^\d{10}$/.test(phone);
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  function sendOtp() {
    if (!phoneValid) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast("OTP sent to +91 " + phone, "info");
    }, 900);
  }

  function verify() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast(mode === "signup" ? "Account created" : "Welcome back!", "success");
      router.push(role === "worker" ? "/worker/dashboard" : "/dashboard");
    }, 900);
  }

  function submitEmail() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast(mode === "signup" ? "Account created" : "Signed in", "success");
      router.push(role === "worker" ? "/worker/dashboard" : "/dashboard");
    }, 900);
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="font-display text-[28px] font-extrabold text-ink">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-1.5 text-ink-600">
        {mode === "login"
          ? "Sign in to manage your bookings and profile."
          : "Join Labour Chowk in less than a minute."}
      </p>

      {/* Role toggle */}
      <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-ivory-200 p-1">
        {(["customer", "worker"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={cn(
              "rounded-lg py-2 text-sm font-semibold capitalize transition-colors",
              role === r ? "bg-white text-ink shadow-sm" : "text-ink-600"
            )}
          >
            {r === "customer" ? "I need work done" : "I'm a worker"}
          </button>
        ))}
      </div>

      {/* Method tabs */}
      <div className="mt-5 flex gap-4 border-b border-ink/[0.08]">
        {(["phone", "email"] as Method[]).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMethod(m);
              setOtpSent(false);
            }}
            className={cn(
              "-mb-px border-b-2 px-1 pb-2.5 text-sm font-semibold capitalize transition-colors",
              method === m ? "border-amber-500 text-ink" : "border-transparent text-ink-500"
            )}
          >
            {m === "phone" ? "Phone / OTP" : "Email"}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        {mode === "signup" && (
          <div>
            <label className="label">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Amit Verma" className="input" />
          </div>
        )}

        {method === "phone" ? (
          <>
            <div>
              <label className="label">Mobile number</label>
              <div className="flex items-center gap-0 overflow-hidden rounded-xl border border-ink/15 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20">
                <span className="flex h-11 items-center border-r border-ink/10 bg-ivory-50 px-3 text-sm font-medium text-ink-700">
                  +91
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  inputMode="numeric"
                  placeholder="10-digit number"
                  className="h-11 flex-1 bg-white px-3 text-[15px] focus:outline-none"
                  disabled={otpSent}
                />
              </div>
              {phone && !phoneValid && (
                <p className="mt-1 text-xs text-danger-500">Enter a valid 10-digit mobile number.</p>
              )}
            </div>

            {otpSent && (
              <div className="animate-fade-in">
                <label className="label">Enter OTP</label>
                <div className="flex gap-2.5">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      value={d}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(-1);
                        setOtp((prev) => prev.map((x, idx) => (idx === i ? v : x)));
                        if (v && i < 3) {
                          const nextEl = document.getElementById(`otp-${i + 1}`);
                          nextEl?.focus();
                        }
                      }}
                      id={`otp-${i}`}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-12 w-12 rounded-xl border border-ink/15 text-center text-lg font-bold focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  ))}
                </div>
                <button onClick={sendOtp} className="mt-2 text-xs font-medium text-amber-600 hover:text-amber-700">
                  Resend OTP
                </button>
              </div>
            )}

            {!otpSent ? (
              <button onClick={sendOtp} disabled={!phoneValid || loading} className="btn-primary btn-lg w-full">
                {loading ? "Sending…" : "Send OTP"}
              </button>
            ) : (
              <button
                onClick={verify}
                disabled={otp.some((d) => !d) || loading}
                className="btn-primary btn-lg w-full"
              >
                {loading ? "Verifying…" : mode === "login" ? "Verify & Sign in" : "Verify & Create account"}
              </button>
            )}
          </>
        ) : (
          <>
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
              />
              {email && !emailValid && (
                <p className="mt-1 text-xs text-danger-500">Enter a valid email address.</p>
              )}
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" placeholder="••••••••" className="input" />
            </div>
            <button onClick={submitEmail} disabled={!emailValid || loading} className="btn-primary btn-lg w-full">
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-ink-600">
        {mode === "login" ? (
          <>
            New to Labour Chowk?{" "}
            <Link href="/signup" className="font-semibold text-amber-600 hover:text-amber-700">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700">
              Sign in
            </Link>
          </>
        )}
      </p>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-500">
        <Icon name="shield" size={14} className="text-verified-500" />
        Your information is kept private and secure.
      </p>
    </div>
  );
}
